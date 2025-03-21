package com.sky.listener.tasker;

import net.sky.core.common.StringUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class StoreInfoTasker extends TaskExecuter {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	// 포스에서 쇼핑몰로 데이터를 넘겨줄때 
	public static String POS_WEB_STORE_INFO = "POS_WEB_STORE_INFO";
	
	// 쇼핑몰에서 포스로 데이터를 넘겨줄때 
	public static String WEB_POS_STORE_INFO = "WEB_POS_STORE_INFO";

	
	//private TaskTracking tracker = null;
	
	public StoreInfoTasker() {
	}
	
	// 웹에서 호출할 사용자  
	public StoreInfoTasker(String process, String storage, int counter ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
	}
	
	public void run() {
		if (POS_WEB_STORE_INFO.equals(this.process)){
			this.transferPOS_WEB_STORE_INFO();	
		} else 
		if (WEB_POS_STORE_INFO.equals(this.process)){
			this.transferWEB_POS_STORE_INFO();
		}
	}
	
	private void transferPOS_WEB_STORE_INFO() {
		//this.tracker = new TaskTracking(this.getClass().getName(), this.process, this.storage);
		logger.debug(this.process + " start");
		try {
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id      , a.ddn_id       , a.idx_1      , a.idx_2    , a.idx_3  ,  a.del_yn  ")
				//
				.query("      ,   d.hq_id     , d.stor_grp      , d.stor_id                    ")
				.query("      ,   d.tax_rt     , d.pri_no      , d.rnd_gb     , d.deli_day   ")  // ,   d.stor_end_tm
				.query("      ,   d.stor_st_tm     , d.stor_end_tm                                      ")
				.query("      ,   d.stor_st_tm_sat , d.stor_end_tm_sat	                               ")
				.query("      ,   d.stor_st_tm_sun , d.stor_end_tm_sun                                  ")
				.query("      ,   d.row_sts                                   				   ")
				.query(" from     sync_mst  a 													   ") 
				.query("          join stor d  on d.stor_id = a.idx_1      					   ")				
				.query(" where    a.sync_id  = :sync_id " , this.process )
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				int current = 0, maxsize = map.size() ;		// 수행 건수 로그 보기 위한 변수 		
				for(SqlResultRow row:map){
					if (logger.isDebugEnabled()){
						logger.debug("taskProcess id = " + this.process + "[ " + ++current + "/" + maxsize + "]"  + "1:" + row.getParamText("idx_1") + "2:" + row.getParamText("idx_2") + "3:" + row.getParamText("idx_3") );  // 수행중인 건수를 보는 로그
					}
					this.disposerPOS_WEB_STORE_INFO(sync, row);
//					if (maxsize == this.counter){
//						read.clear();
//						read.param.query(" select count(*) from sync_mst where sync_id = :sync_id " , this.process );
//						this.tracker.residual = read.selectForInt();
//					}
				}
				logger.debug(this.process + " end = " + map.size());
			} else {
				logger.debug(this.process + " end = nodata ");
			}
			// 연동이후 남은 건수에 대한 로그를 기록 한다.
//			try { this.tracker.logwrite(); } catch (Exception ex) { ex.printStackTrace(); }
		} catch (Exception e) {
			logger.debug(this.process + " exception ");
			e.printStackTrace();
		}
	}
	
	private void disposerPOS_WEB_STORE_INFO(DataMessage sync, SqlResultRow syc ){
		try {
			sync.clear();
			sync.param
				.table("stor")
				.where("where stor_id = :stor_id  " )
				//
				.unique("hq_id"           , syc.fixParameter("hq_id"        ))
				.unique("stor_grp"           , syc.fixParameter("stor_grp"        ))
				.unique("stor_id"           , syc.fixParameter("stor_id"        ))
				
				.update("tax_rt"           , syc.getParamText("tax_rt"        ))
				.update("pri_no"           , syc.getParamText("pri_no"        ))
				.update("rnd_gb"           , syc.getParamText("rnd_gb"        ))
				.update("deli_day"           , syc.getParamText("deli_day"        ))
				
				.update("stor_st_tm"           , syc.getParamText("stor_st_tm"        ))
				.update("stor_end_tm"           , syc.getParamText("stor_end_tm"        ))
				.update("stor_st_tm_sat"       , syc.getParamText("stor_st_tm_sat"    ))
				.update("stor_end_tm_sat"       , syc.getParamText("stor_end_tm_sat"    ))
				.update("stor_st_tm_sun"       , syc.getParamText("stor_st_tm_sun"    ))
				.update("stor_end_tm_sun"       , syc.getParamText("stor_end_tm_sun"    ))
				
//				.update("map_view"           , syc.getParamText("map_view"        ))
//				.update("map_zone"           , syc.getParamText("map_zone"        ))
//				.update("map_area"           , syc.getParamText("map_area"        ))

			;sync.attach( Action.modify , syc.fixParamText("ddn_id" ));
			if (sync.size() > 0 ) {
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
			}
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
					.update("user_memo"        , StringUtil.cutstring(e.getMessage(), 200 ))
					.update("upt_dttm"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}	
	
	
	private void transferWEB_POS_STORE_INFO() {
		//this.tracker = new TaskTracking(this.getClass().getName(), this.process, this.storage);
		logger.debug(this.process + " start");
		try {
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id      , a.ddn_id       , a.idx_1      , a.idx_2    , a.idx_3  ,  a.del_yn  ")
				.query("      ,   d.hq_id     , d.stor_grp      , d.stor_id                    ")
				.query("      ,   d.ship_day_web , d.small_end_tm                                  ")
				.query("      ,   d.map_view     , d.map_zone      , d.map_area                    ")
				.query(" from     sync_mst  a 													   ") 
				.query("          join stor d  on d.stor_id = a.idx_1      					   ")				
				.query(" where    a.sync_id  = :sync_id " , this.process )
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				int current = 0, maxsize = map.size() ;		// 수행 건수 로그 보기 위한 변수 		
				for(SqlResultRow row:map){
					if (logger.isDebugEnabled()){
						logger.debug("taskProcess id = " + this.process + "[ " + ++current + "/" + maxsize + "]"  + "1:" + row.getParamText("idx_1") + "2:" + row.getParamText("idx_2") + "3:" + row.getParamText("idx_3") );  // 수행중인 건수를 보는 로그
					}
					this.disposerWEB_POS_STORE_INFO(sync, row);
//					if (maxsize == this.counter){
//						read.clear();
//						read.param.query(" select count(*) from sync_mst where sync_id = :sync_id " , this.process );
//						this.tracker.residual = read.selectForInt();
//					}
				}
				logger.debug(this.process + " end = " + map.size());
			} else {
				logger.debug(this.process + " end = nodata ");
			}
			// 연동이후 남은 건수에 대한 로그를 기록 한다.
//			try { this.tracker.logwrite(); } catch (Exception ex) { ex.printStackTrace(); }
		} catch (Exception e) {
			logger.debug(this.process + " exception ");
			e.printStackTrace();
		}
	}	
	
	
	private void disposerWEB_POS_STORE_INFO(DataMessage sync, SqlResultRow syc ){
		try {
			sync.clear();
			sync.param
				.table("stor")
				.where("where stor_id = :stor_id  " )
				//
				.unique("hq_id"           , syc.fixParameter("hq_id"        ))
				.unique("stor_grp"           , syc.fixParameter("stor_grp"        ))
				.unique("stor_id"           , syc.fixParameter("stor_id"        ))

				.update("ship_day_web"       , syc.getParamText("ship_day_web"    ))
				.update("small_end_tm"       , syc.getParamText("small_end_tm"    ))
				.update("map_view"           , syc.getParamText("map_view"        ))
				.update("map_zone"           , syc.getParamText("map_zone"        ))
				.update("map_area"           , syc.getParamText("map_area"        ))

			;sync.attach( Action.update , syc.fixParamText("ddn_id" ));
			if (sync.size() > 0 ) {
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
			}
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
					.update("user_memo"        , StringUtil.cutstring(e.getMessage(), 200 ))
					.update("upt_dttm"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}	
	
	
}
