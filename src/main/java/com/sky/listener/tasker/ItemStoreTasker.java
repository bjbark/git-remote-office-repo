package com.sky.listener.tasker;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class ItemStoreTasker extends TaskExecuter {
	
	public static String AGT_ITEM_STORE = "AGT_ITEM_STORE";
	
	public ItemStoreTasker() {
	}
	
	public void run() {
		//System.out.println("TaskProcess run : " + this.process );
		if (AGT_ITEM_STORE.equals(this.process)){
			this.transferAGT(this.process);
		}
	}
	
	/**
	 * AGT
	 * @param taskCaption
	 */
	private void transferAGT(String taskProcess) {
		try {
			//System.out.println(taskProcess +  " start");
			
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.pk_owner  , a.pk_val   , a.pk_hq       ")
				.query("      ,   a.sync_id   , a.del_use_yn  , b.hq_pos_id       ")
				//
				.query("      ,   a.pk_owner   as stor_id   , d.mst_itm_id        ") 
				.query(" from     data_sync      a                              ")
				.query("          join hq     b on b.hq_id = a.pk_hq   ")				
				.query("          join itm_grp d on d.mst_itm_id  = a.pk_val   ")				
				.query(" where    a.sync_id  = :sync_id " , AGT_ITEM_STORE )
				.query(" and      rownum  < 1000        " )				
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					read.clear();
					read.param
						.query(" select   a.hq_id     , a.stor_grp     , a.stor_id   ")
						.query("      ,   a.wrhs_id     , a.share_gp                    ")
						.query("      ,   a.mst_itm_id      , a.item_idcd      , a.sale_sts   ")
						.query("      ,   a.emp_id      , a.vend_id      , a.bunch_gb   ")
						.query("      ,   a.sale_pri   , a.user_price   , a.sale_pri0 ,   a.sale_pri_1  ")
						.query("      ,   a.sale_pri_2  , a.sale_pri_3  , a.sale_pri_4 ,   a.sale_pri_5  ")
						.query("      ,   a.row_sts               ")
						.query(" from     itm_stor      a         ")
						.query(" where    a.stor_id = :stor_id " , row.getParameter( "stor_id" ))
						.query(" and      a.mst_itm_id  = :mst_itm_id  " , row.getParameter( "mst_itm_id"  ))
					;
					this.disposerAGT(sync, row, read.selectForMap() );					
				}
				//System.out.println(taskProcess + " end = " + map.size());
			} else {
				//System.out.println(taskProcess + " end = nodata ");
			}
		} catch (Exception e) {
			System.out.println(taskProcess + "exception ");
			e.printStackTrace();
		}
	}	
	
	public void disposerAGT(DataMessage sync, SqlResultRow syc, SqlResultMap map){
		try {
			sync.clear();
			if (!"".equals(syc.fixParamText("hq_pos_id").trim() )){
				// 매장의 거래처 정보를 넘겨준다. 
				for(SqlResultRow row:map){
					sync.param
						.table("itm_stor")
						.where("where stor_id  = :stor_id    " )
						.where("and   item_idcd   = :item_idcd     " )
						//
						.unique("hq_id"           , row.fixParameter("hq_id"             ))
						.unique("stor_grp"           , row.fixParameter("stor_grp"             ))
						.unique("stor_id"           , row.fixParameter("stor_id"             ))
						.update("share_gp"           , row.fixParameter("share_gp"             ))
						.update("wrhs_id"           , row.getParamText("wrhs_id"             ))
						.update("sale_sts"           , row.getParamText("sale_sts"             ))
						.unique("mst_itm_id"            , row.getParamText("mst_itm_id"              ))
						.unique("item_idcd"            , row.getParamText("item_idcd"              ))
						.update("emp_id"            , row.getParamText("emp_id"              ))
						.update("vend_id"            , row.getParamText("vend_id"              ))
						.update("bunch_gb"           , row.getParamText("bunch_gb"             ))
						.update("sale_pri"         , row.getParamText("sale_pri"           ))
						.update("user_price"         , row.getParamText("user_price"           ))
						.update("sale_pri0"        , row.getParamText("sale_pri0"          ))
						.update("sale_pri_1"        , row.getParamText("sale_pri_1"          ))
						.update("sale_pri_2"        , row.getParamText("sale_pri_2"          ))
						.update("sale_pri_3"        , row.getParamText("sale_pri_3"          ))
						.update("sale_pri_4"        , row.getParamText("sale_pri_4"          ))
						.update("sale_pri_5"        , row.getParamText("sale_pri_5"          ))
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
					.update("upt_dttm"         , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}
}
