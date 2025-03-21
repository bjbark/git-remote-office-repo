package com.sky.system.cust;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.task.TaskExecuter;

public class CustStoreTasker extends TaskExecuter{

	public static String AGT_CUST_STORE = "AGT.CUST_STORE";
	
	public CustStoreTasker() {
	}
	
	public void run() {
		System.out.println("TaskProcess run : " + this.process );
		if (AGT_CUST_STORE.equals(this.process)){
			this.transferAGT(this.process);	
		}
	}
	
	private void transferAGT(String taskProcess) {
		try {
			System.out.println(taskProcess + " start");
			
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.pk_owner    , a.pk_val       , a.pk_hq   ")
				.query("      ,   a.sync_id     , a.del_use_yn      , b.hq_pos_id   ")
				//
				.query("      ,   d.hq_id    , d.stor_grp       , d.stor_id   , d.share_gp      ")
				.query("      ,   d.cust_id       ")
				.query("      ,   d.clss_1     , d.clss_2        , d.clss_3    ")
				.query("      ,   d.clss_4     , d.clss_5        , d.clss_6    ")
				.query("      ,   d.salesman_id , d.npay_amt        , d.balance_limit , d.limit_control  ")
				.query("      ,   d.price_no    , d.row_sts                   ")
				
				.query(" from     data_sync       a                             ")
				.query("          join bonsa      b on b.hq_id = a.pk_hq  ")				
				.query("          join cust_stor d on d.stor_id = a.pk_owner and d.cust_id = a.pk_val ")				
				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" and      rownum  < 1000        " )				
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					this.disposerAGT(sync, row );					
				}
				System.out.println(taskProcess + " end = " + map.size());
			} else {
				System.out.println(taskProcess + " end = nodata ");
			}
		} catch (Exception e) {
			System.out.println(taskProcess + " exception ");
			e.printStackTrace();
		}
	}		
	
	public void disposerAGT(DataMessage sync, SqlResultRow syc ){
		try {
			sync.clear();
			if (!"".equals(syc.fixParamText("hq_pos_id").trim() )){
				sync.param
					.table("cust_stor")
					.where("where stor_id  = :stor_id    " )
					.where("and   cust_id   = :cust_id     " )
					//
					.unique("hq_id"           , syc.fixParameter("hq_id"        ))
					.unique("stor_grp"           , syc.fixParameter("stor_grp"        ))
					.unique("stor_id"           , syc.fixParameter("stor_id"        ))
					.update("share_gp"           , syc.fixParameter("share_gp"        ))
					.update("price_no"           , syc.getParamText("price_no"        ))
					.update("cust_id"            , syc.getParamText("cust_id"         ))
					
					.update("clss_1"            , syc.getParamText("clss_1"         ))
					.update("clss_2"            , syc.getParamText("clss_2"         ))
					.update("clss_3"            , syc.getParamText("clss_3"         ))
					.update("clss_4"            , syc.getParamText("clss_4"         ))
					.update("clss_5"            , syc.getParamText("clss_5"         ))
					.update("clss_6"            , syc.getParamText("clss_6"         ))
					.update("salesman_id"        , syc.getParamText("salesman_id"     ))

					.update("npay_amt"            , syc.getParamText("npay_amt"         ))
					.update("balance_limit"      , syc.getParamText("balance_limit"   ))
					.update("limit_control"      , syc.getParamText("limit_control"   ))
					
					.update("row_sts"          ,("1".equals(syc.getParamText("del_use_yn"))) ? '2' : syc.getParameter("row_sts")) 
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
				;sync.attach( Action.modify , syc.fixParamText("hq_pos_id" ).trim() );
			}
			
			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("data_sync")
				.where("where sync_id  = :sync_id  and pk_owner = :pk_owner " )
				.where("  and pk_val = :pk_val and pk_hq = :pk_hq " )
				//
				.unique("sync_id"           , syc.fixParameter("sync_id"        ))
				.unique("pk_owner"          , syc.fixParameter("pk_owner"       ))
				.unique("pk_val"          , syc.fixParameter("pk_val"       ))
				.unique("pk_hq"          , syc.fixParameter("pk_hq"       ))
			;sync.attach(Action.delete).execute();			
			
		} catch (Exception e) {
			e.printStackTrace();
			try {
				sync.clear();
				sync.param
					.table("data_sync")
					.where("where sync_id  = :sync_id  and pk_owner = :pk_owner " )
					.where("  and pk_val = :pk_val and pk_hq = :pk_hq " )
					//
					.unique("sync_id"           , syc.fixParameter("sync_id"        ))
					.unique("pk_owner"          , syc.fixParameter("pk_owner"       ))
					.unique("pk_val"          , syc.fixParameter("pk_val"       ))
					.unique("pk_hq"          , syc.fixParameter("pk_hq"       ))					
					.update("user_memo"    	    , e.getMessage() )
					.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
				;
				sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}		
}
