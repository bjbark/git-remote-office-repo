package com.sky.listener.tasker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class ItemBaseTasker extends TaskExecuter {

	private final Logger logger = LoggerFactory.getLogger(ItemBaseTasker.class);
	
	public static String POS_POS_ITME_BASE = "POS_POS_ITEM_BASE"; // 체인점 연동  
	public static String POS_WEB_ITME_BASE = "POS_WEB_ITEM_BASE"; // 쇼핑몰로 연동  
	
	public ItemBaseTasker() {
	}
	
	// http://localhost:9020/listener/tasker.do?invoker=com.sky.listener.tasker.ItemBaseTasker&process=POS_WEB_ITEM_BASE&storage=N2040UNXBT.POS&counter=1
	
	
	// 웹에서 호출할 사용자  
	public ItemBaseTasker(String process, String storage, int counter ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
	}	
	
	public void run() {
		if (POS_POS_ITME_BASE.equals(this.process)){
			this.transferPOS_POS_ITME_BASE(this.process);	
		}else 
		if (POS_WEB_ITME_BASE.equals(this.process)){
			this.transferPOS_WEB_ITME_BASE(this.process);
		}
	}
	                                
	private void transferPOS_POS_ITME_BASE(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id,    a.ddn_id,    a.idx_1,    a.idx_2,  a.idx_3,  a.del_yn 	")
				//
				.query("      ,   b.hq_id  , b.stor_id   as stor_grp  , d.img_url " )
				.query("      ,   d.bas_id   , d.bas_cd   , d.bas_nm   , d.bas_nm_englh   " )
				.query("      ,   d.prnt_id , d.row_lvl , d.row_sts               " )
				.query(" from     sync_mst  a " ) 
				.query("          join hq b     on b.hq_id = a.idx_3       " )  
				.query("          join base_mst d on d.bas_id  = a.idx_1       " ) 
				.query(" where    a.sync_id = :sync_id " , taskProcess )
				.query(" order by a.crt_dttm desc " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					this.disposerPOS_POS_ITME_BASE(sync, row);
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
	
	public void disposerPOS_POS_ITME_BASE(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();
			if ("1".equals(syc.getParamText("del_yn")) || "".equals(syc.getParamText("bas_id" ))) {
				sync.param
					.table("base_mst")
					.where("where bas_id = :bas_id " )
					//
					.unique("bas_id"            , syc.fixParameter("hq_id" ))
					.update("row_sts"          , "2" )
					.update("upt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					.insert("crt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					
				;sync.attach( Action.modify, syc.fixParamText("ddn_id" )  );
			} else {
				sync.param
					.table("base_mst")
					.where("where bas_id = :bas_id " )
					//
					.unique("hq_id"           , syc.fixParameter("hq_id"        ))
					.unique("stor_grp"           , syc.fixParameter("stor_grp"        ))
					.unique("bas_id"            , syc.fixParameter("bas_id"         ))
					.update("bas_cd"            , syc.getParameter("bas_cd"         ))
					.update("bas_nm"            , syc.getParamText("bas_nm"         ))
					.update("bas_nm_englh"            , syc.getParamText("bas_nm_englh"         ))
					.update("img_url"          , syc.getParamText("img_url"       ))					
					.insert("prnt_id"          , syc.getParameter("prnt_id"       ))
					.insert("row_lvl"          , syc.getParameter("row_lvl"       ))
					.update("row_sts"          , syc.getParameter("row_sts"       ))
					
				;sync.attach( Action.modify , syc.fixParamText("ddn_id" )  );
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
					.update("upt_dttm"        , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}		
	
	
	/*
	 * 쇼핑몰 
	 */
	private void transferPOS_WEB_ITME_BASE(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id,    a.ddn_id,    a.idx_1,    a.idx_2,  a.idx_3,  a.del_yn 	")
				//
				.query("      ,   b.hq_id  , b.stor_id   as stor_grp  , d.img_url " )
				.query("      ,   d.bas_id   , d.bas_cd   , d.bas_nm   , d.bas_nm_englh   " )
				.query("      ,   d.prnt_id , d.row_lvl , d.row_sts               " )
				.query(" from     sync_mst  a " ) 
				.query("          join hq b     on b.hq_id = a.idx_3       " )  
				.query("          join base_mst d on d.bas_id  = a.idx_1       " ) 
				.query(" where    a.sync_id = :sync_id " , taskProcess )
				.query(" order by a.crt_dttm desc " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					this.disposerPOS_WEB_ITME_BASE(sync, row);
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
	
	public void disposerPOS_WEB_ITME_BASE(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();
			if ("1".equals(syc.getParamText("del_yn")) || "".equals(syc.getParamText("bas_id" ))) {
				sync.param
					.table("base_mst")
					.where("where bas_id = :bas_id " )
					//
					.unique("bas_id"            , syc.fixParameter("hq_id" ))
					.update("row_sts"          , "2" )
					.update("upt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					.insert("crt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					
				;sync.attach( Action.modify, syc.fixParamText("ddn_id" )  );
			} else {
				sync.param
					.table("base_mst")
					.where("where bas_id = :bas_id " )
					//
					.unique("hq_id"           , syc.fixParameter("hq_id"        ))
					.unique("stor_grp"           , syc.fixParameter("stor_grp"        ))
					.unique("bas_id"            , syc.fixParameter("bas_id"         ))
					.update("bas_cd"            , syc.getParameter("bas_cd"         ))
					.update("bas_nm"            , syc.getParamText("bas_nm"         ))
					.update("bas_nm_englh"            , syc.getParamText("bas_nm_englh"         ))
					.update("img_url"          , syc.getParamText("img_url"       ))					
					.insert("prnt_id"          , syc.getParameter("prnt_id"       ))
					.insert("row_lvl"          , syc.getParameter("row_lvl"       ))
					.update("row_sts"          , syc.getParameter("row_sts"       ))
					
				;sync.attach( Action.modify , syc.fixParamText("ddn_id" )  );
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
					.update("upt_dttm"        , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}	
	
}


//insert into sync_mst ( sync_id , ddn_id , idx_1, idx_2, idx_3 )
//select  'POS_WEB_ITEM_BASE' , 'N2040UNXBT.WEB' , bas_id, hq_id , hq_id
//from base_mst
//where prnt_id = 'brand'
//;

