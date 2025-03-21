package com.sky.system.cust;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.task.TaskExecuter;

public class CustInfoTasker extends TaskExecuter {

	public static String AGT_CUST_SHARE = "AGT.CUST_SHARE";

	public static String OLD_CUST_SHARE = "OLD.CUST_SHARE";
	
	
	public CustInfoTasker() {
	}
	
	public void run() {
		System.out.println("TaskProcess run : " + this.process );
		if (AGT_CUST_SHARE.equals(this.process)){
			this.transferAGT(this.process);	
		}
	}
	
	private void transferAGT(String taskProcess) {
		try {
			System.out.println(taskProcess + " start");
			
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.pk_owner  , a.pk_val   , a.pk_hq    ")
				.query("      ,   a.sync_id   , a.del_use_yn  , b.hq_pos_id    ")
				//
				.query("      ,   b.hq_id     , d.owner_id     , d.price_no      , d.cust_grp          ")
				.query("      ,   d.cust_id      , d.cust_nm      , d.cust_sts      , d.sts_memo         ")
				.query("      ,   d.biz_gb       , d.biz_no       , d.biz_nm                         ")
				.query("      ,   d.biz_tel_no   , d.biz_hp_no   , d.biz_fax_no    , d.biz_email                      ")
				.query("      ,   d.biz_type     , d.biz_type    , d.biz_owner     , d.biz_tax_gb   ")
				.query("      ,   d.biz_zip_cd   , d.biz_state    , d.biz_city      , d.biz_dong     ")
				.query("      ,   d.biz_addr_2    , d.colt_schd_type  , d.colt_schd_term                    ")
				.query("      ,   d.row_sts    ")
				
				.query(" from     data_sync  a                                  ")
				.query("          join bonsa     b on b.hq_id = a.pk_hq   ")				
				.query("          join cust_mst d on d.cust_id  = a.pk_val   ")				
				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" and      rownum  < 1000        " )				
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					read.clear();
					read.param
						.query(" select   a.hq_id                                            ")
						.query("      ,   a.cust_id       , a.mmb_id     , a.mmb_nm           ")
						.query("      ,   a.add_point     , a.use_point   , a.cur_point         ")
						.query("      ,   a.row_sts                     ")
						.query(" from     cust_memb      a                                ")
						.query(" where    a.cust_id  = :cust_id " , row.fixParamText( "pk_val" ))
					;
					this.disposerAGT(sync, row, read.selectForMap());					
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
	
	
	public void disposerAGT(DataMessage sync, SqlResultRow syc, SqlResultMap map ){
		try {
			sync.clear();
			if (!"".equals(syc.fixParamText("hq_pos_id").trim() )){
				sync.param
					.table("cust_mst")
					.where("where hq_id  = :hq_id    " )
					.where("and   cust_id   = :cust_id     " )
					//
					.unique("hq_id"           , syc.fixParameter("hq_id"        ))
					.unique("owner_id"           , syc.fixParameter("owner_id"        ))
					.update("cust_id"            , syc.fixParameter("cust_id"         ))
					.update("cust_nm"            , syc.getParamText("cust_nm"         ))
					
					.update("cust_sts"           , syc.getParamText("cust_sts"        ))
					.update("sts_memo"           , syc.getParamText("sts_memo"        ))
					
					.update("biz_gb"         	 , syc.getParamText("biz_gb"          ))
					.update("biz_no"         	 , syc.getParamText("biz_no"          ))
					.update("biz_nm"         	 , syc.getParamText("biz_nm"          ))
					.update("biz_tel_no"     	 , syc.getParamText("biz_tel_no"      ))
					.update("biz_hp_no"     	 , syc.getParamText("biz_hp_no"      ))
					.update("biz_fax_no"     	 , syc.getParamText("biz_fax_no"      ))
					.update("biz_email"      	 , syc.getParamText("biz_email"       ))
						
					.update("biz_type"       	 , syc.getParamText("biz_type"        ))
					.update("biz_type"      	 , syc.getParamText("biz_type"       ))
					.update("biz_owner"      	 , syc.getParamText("biz_owner"       ))
					.update("biz_tax_gb"     	 , syc.getParamText("biz_tax_gb"      ))
					.update("biz_zip_cd"     	 , syc.getParamText("biz_zip_cd"      ))
					.update("biz_state"     	 , syc.getParamText("biz_state"       ))
					.update("biz_city"      	 , syc.getParamText("biz_city"        ))
					.update("biz_dong"       	 , syc.getParamText("biz_dong"        ))
					.update("biz_addr_2"      	 , syc.getParamText("biz_addr_2"       ))
					.update("colt_schd_type"     	 , syc.getParamText("colt_schd_type"     ))
					.update("colt_schd_term"     	 , syc.getParamText("colt_schd_term"     ))					
					
					.update("price_no"           , syc.getParamText("price_no"         ))
					.update("row_sts"          ,("1".equals(syc.getParamText("del_use_yn"))) ? '2' : syc.getParameter("row_sts"))
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
				;sync.attach( Action.modify , syc.fixParamText("hq_pos_id" ).trim() );
				for(SqlResultRow row:map){
					sync.param
						.table("cust_memb")
						.where("where hq_id  = :hq_id    " )
						.where("and   mmb_id   = :mmb_id     " )
						//
						.unique("hq_id"           , row.fixParameter("hq_id"        ))
						.update("cust_id"            , row.fixParameter("cust_id"         ))
						.update("mmb_id"            , row.fixParamText("mmb_id"         ))
						
						.update("add_point"          , row.fixParamText("add_point"       ))
						.update("use_point"          , row.fixParamText("use_point"       ))
						.update("cur_point"          , row.fixParamText("cur_point"       ))
						
						.update("mmb_nm"            , row.getParamText("mmb_nm"         ))
						.update("row_sts"          ,("1".equals(syc.getParamText("del_use_yn"))) ? '2' : row.getParameter("row_sts"))
						.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
					;sync.attach( Action.modify , syc.fixParamText("hq_pos_id" ).trim() );
				}
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
