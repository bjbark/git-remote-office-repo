package com.sky.system.item;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.task.TaskExecuter;

public class ItemBonsaExtraTasker extends TaskExecuter {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public static String 	WEB_SYNC_ITEM_EXTRA = "WEB.SYNC.ITEM_EXTRA";

	public ItemBonsaExtraTasker() {
		
	}
	
	public void run() {

		logger.debug("TaskProcess run : " + this.process);
		if (WEB_SYNC_ITEM_EXTRA.equals(this.process)){
			this.transferWEB(this.process);
		}
	}
	
	private void transferWEB(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   s.sync_id    , s.ddn_id    , s.idx_1    , s.idx_2   , s.idx_3  ,  s.del_yn  	")
				.query("  	   ,  a.hq_id ,  a.item_idcd, 	a.extra_gb, a.extra_id  									")
				.query("       ,  a.sys_memo,  a.user_memo,  a.row_sts                								")
				.query(" from     sync_mst  s 																			") 
				.query("          left outer join  item_extra a on a.item_idcd = s.idx_1 and  a.extra_id = s.idx_2  	") 
				.query(" where    s.sync_id = :sync_id " , taskProcess )
				.query(" order by s.crt_dttm desc " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					this.disposerWEB(sync, row);
				}
				logger.debug(taskProcess + " end = " + map.size());
			} else {
				logger.debug(taskProcess + " end = nodata ");
			}
		} catch (Exception e) {
			logger.debug(taskProcess + " exception ");
			e.printStackTrace();
		}		
	}		
	
	
	public void disposerWEB(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();
			if ("1".equals(syc.getParamText("del_yn")) ) {
				
				sync.param
					.table("item_extra")
					.where("where item_idcd  = :item_idcd  " )
					.where("  and extra_id = :extra_id " )
					//
	        		.unique("item_idcd"            , syc.fixParameter("item_idcd"        ))
	        		.unique("extra_id"           , syc.fixParameter("extra_id"       ))
        		
					.update("row_sts"          , "2" )
					
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
					.insert("crt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
					
				;sync.attach( Action.modify, syc.fixParamText("ddn_id" ));
				
			} else {
				
				sync.param
					.table("item_extra")
					.where("where item_idcd  = :item_idcd  " )
					.where("  and extra_id = :extra_id " )
					//
	        		.unique("item_idcd"            , syc.fixParameter("item_idcd"        ))
	        		.unique("extra_id"           , syc.fixParameter("extra_id"       ))
	        		
	        		.update("hq_id"           , syc.fixParameter("hq_id"       ))
	        		.update("extra_gb"           , syc.getParameter("extra_gb"       ))
	        		
	        		.update("user_memo"          , syc.getParameter("user_memo"      ))
	        		.update("sys_memo"          , syc.getParameter("sys_memo"      ))
	        		.update("row_ord"          , syc.getParameter("row_ord"      ))
					.update("row_sts"          , syc.getParameter("row_sts"      ))
					
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
					.insert("crt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				;sync.attach( Action.modify , syc.fixParamText("ddn_id" ));
			}
			
			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3 " )
				//
				.unique("sync_id"          , syc.fixParameter("sync_id"       ))
				.unique("ddn_id"          , syc.fixParameter("ddn_id"       ))
				.unique("idx_1"          , syc.fixParameter("idx_1"       ))
				.unique("idx_2"          , syc.fixParameter("idx_2"       ))
				.unique("idx_3"          , syc.fixParameter("idx_3"       ))
			;sync.attach(Action.delete).execute();
			
		} catch (Exception e) {
			e.printStackTrace();
			try {
				sync.clear();
				sync.param
					.table("sync_mst")
					.where("where sync_id = :sync_id and ddn_id = :ddn_id and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3 " )
					//
					.unique("sync_id"          , syc.fixParameter("sync_id"       ))
					.unique("ddn_id"          , syc.fixParameter("ddn_id"       ))
					.unique("idx_1"          , syc.fixParameter("idx_1"       ))
					.unique("idx_2"          , syc.fixParameter("idx_2"       ))
					.unique("idx_3"          , syc.fixParameter("idx_3"       ))
					.update("user_memo"        , e.getMessage().substring(1, 200).trim())
					.update("upt_dttm"        , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}	
}
