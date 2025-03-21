package com.sky.listener.tasker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class ItemClassTasker extends TaskExecuter {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	public static String POS_POS_ITEM_CLASS = "POS_POS_ITEM_CLASS";
	public static String POS_WEB_ITEM_CLASS = "POS_WEB_ITEM_CLASS";
	      

	// 디폴트 생성자 
	public ItemClassTasker() {
	}

	// 웹에서 호출할 사용자  
	public ItemClassTasker(String process, String storage, int counter ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
	}
	
	
	public void run() {
		if (POS_POS_ITEM_CLASS.equals(this.process)){ this.transferPOS_POS_ITEM_CLASS();
		} else
		if (POS_WEB_ITEM_CLASS.equals(this.process)){ this.transferPOS_WEB_ITEM_CLASS();
		}
	}
	
	private void transferPOS_POS_ITEM_CLASS() {
		try {
			logger.debug(this.process + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id,    a.ddn_id,    a.idx_1,    a.idx_2,  a.idx_3,  a.del_yn 	")
				//
				.query("      ,   b.hq_id  , b.stor_id   as stor_grp                 " )
				.query("      ,   d.clss_id  , d.clss_cd   , d.clss_nm  , d.clss_desct  " )
				.query("      ,   d.prnt_id  , d.row_lvl , d.row_sts " )
				.query(" from     sync_mst  a " ) 
				.query("          join hq      b on b.hq_id = a.idx_2   " )  
				.query("          join item_class d on d.clss_id = a.idx_1   " ) 
				.query(" where    a.sync_id = :sync_id " , this.process )
				.query(" and      rownum <= :counter "   , this.counter , (this.counter > 0) )  // 수행 개수 지정  
				.query(" order by a.crt_dttm desc " )
			;
			//Migrator migrator = new Migrator(this.getClass().getName(), this.process, this.storage);			
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				int current = 0, maxsize = map.size();
				for(SqlResultRow row:map){
					logger.debug("taskProcess id = " + this.process + "[ " + ++current + "/" + maxsize + "]");					
					this.disposerPOS_POS_ITEM_CLASS(sync, row);
				}
				logger.debug(process + " end = " + map.size());
//				if (maxsize == this.counter){ 
//					read.clear();
//					read.param.query(" select count(*) from sync_mst where sync_id = :sync_id " , this.process );
//					migrator.residual = read.selectForInt();
//				}
			} else {
				logger.debug(process + " end = nodata ");
			}
//			try { migrator.logwrite(); } catch (Exception ex) { ex.printStackTrace(); }  // 연동이후 남은 건수에 대한 로그를 기록 한다.
		} catch (Exception e) {
			logger.debug(process + " exception ");
			e.printStackTrace();
		}		
	}		
	
	
	public void disposerPOS_POS_ITEM_CLASS(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();
			if ("1".equals(syc.getParamText("del_yn")) || "".equals(syc.getParamText("clss_id" ))) {
				sync.param
					.table("item_class")
					.where("where clss_id = :clss_id " )
					//
					.unique("clss_id"           , syc.fixParameter("clss_id"        ))
					.update("row_sts"          , "2" )
					.update("upt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					.insert("crt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					
				;sync.attach( Action.modify, syc.fixParamText("hq_id" ) + ".POS" );
			} else {
				sync.param
					.table("item_class")
					.where("where clss_id = :clss_id " )
					//
	        		.unique("hq_id"           , syc.fixParameter("hq_id"      ))
	        		.insert("stor_grp"           , syc.fixParameter("stor_grp"      ))
	        		.unique("clss_id"           , syc.fixParameter("clss_id"      ))
	        		.unique("clss_cd"           , syc.fixParameter("clss_cd"      ))
	        		//
	        		.update("clss_nm"           , syc.getParameter("clss_nm"      ))
	        		.update("clss_desct"           , syc.getParameter("clss_desct"      ))
	        		.insert("prnt_id"          , syc.fixParameter("prnt_id"     ))
	        		.insert("row_lvl"          , syc.getParameter("row_lvl"     ))
					.update("row_sts"          , syc.fixParameter("row_sts"      ))
					.update("upt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					.insert("crt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
				;sync.attach( Action.modify , syc.fixParamText("ddn_id" ) ); //+ ".POS" 
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
					.update("upt_dttm"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}	
	
	
	private void transferPOS_WEB_ITEM_CLASS() {
		try {
			logger.debug(this.process + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id     , a.ddn_id      , a.idx_1      , a.idx_2    , a.idx_3  ,  a.del_yn  ")
				
				.query("      ,   b.hq_id  , b.stor_id   as stor_grp                 									")
				.query("      ,   d.clss_id  , d.clss_cd   , d.clss_nm  , d.clss_desct  									")
				.query("      ,   d.dsnt_rt_1 , d.dsnt_rt_2, d.dsnt_rt_3, d.dsnt_rt_4, d.dsnt_rt_5 				")
				.query("      ,   d.prnt_id  , d.row_lvl , d.row_sts 													")
				.query(" from     sync_mst  a 																				") 
				.query("          join hq      b on b.hq_id = a.idx_2   " )  
				.query("          join item_class d on d.clss_id = a.idx_1   " ) 
				.query(" where    a.sync_id = :sync_id " , this.process  )
				.query(" and      rownum <= :counter "   , this.counter , (this.counter > 0) )  // 수행 개수 지정  
				.query(" order by a.upt_dttm asc " )
			;
			//Migrator migrator = new Migrator(this.getClass().getName(), this.process, this.storage);
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				int current = 0, maxsize = map.size() ;		// 수행 건수 로그 보기 위한 변수 		
				for(SqlResultRow row:map){
					logger.debug("taskProcess id = " + this.process + "[ " + ++current + "/" + maxsize + "]");  // 수행중인 건수를 보는 로그 
					this.disposerPOS_WEB_ITEM_CLASS(sync, row); 
				}
				logger.debug(this.process + " end = " + map.size());
//				if (maxsize == this.counter){ 
//					read.clear();
//					read.param.query(" select count(*) from sync_mst where sync_id = :sync_id " , this.process );
//					migrator.residual = read.selectForInt();
//				}
			} else {
				logger.debug(this.process + " end = nodata ");
			}
//			try { migrator.logwrite(); } catch (Exception ex) { ex.printStackTrace(); }  // 연동이후 남은 건수에 대한 로그를 기록 한다.
		} catch (Exception e) {
			logger.debug(this.process + " exception ");
			e.printStackTrace();
		}		
	}		
	
	
	public void disposerPOS_WEB_ITEM_CLASS(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();
			sync.param
				.table("item_class")
				.where("where clss_id = :clss_id " )
				//
        		.unique("hq_id"           , syc.fixParameter("hq_id"      ))
        		.unique("clss_id"           , syc.fixParameter("clss_id"      ))
        		.unique("clss_cd"           , syc.fixParameter("clss_cd"      ))
        		//
        		.update("clss_nm"           , syc.getParameter("clss_nm"      ))
        		.update("clss_desct"           , syc.getParameter("clss_desct"      ))
        		.insert("prnt_id"          , syc.fixParameter("prnt_id"     ))
        		
        		.update("dsnt_rt_1"        , syc.getParameter("dsnt_rt_1"   ))
        		.update("dsnt_rt_2"        , syc.getParameter("dsnt_rt_2"   ))
        		.update("dsnt_rt_3"        , syc.getParameter("dsnt_rt_3"   ))
        		.update("dsnt_rt_4"        , syc.getParameter("dsnt_rt_4"   ))
        		.update("dsnt_rt_5"        , syc.getParameter("dsnt_rt_5"   ))
        		
        		.insert("row_lvl"          , syc.getParameter("row_lvl"     ))
				.update("row_sts"          , syc.fixParameter("row_sts"      ))
				.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				.insert("crt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
			;sync.attach( Action.modify , syc.fixParamText("ddn_id" ));
			
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
					.update("upt_dttm"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}	
}
