package com.sky.listener.tasker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class VendInfoTasker extends TaskExecuter {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	//private TaskTracking tracker = null;	
	
	public static String POS_WEB_VEND_INFO = "POS_WEB_VEND_INFO";  // source_target_식별자 
	
	// 디폴트 생성자 
	public VendInfoTasker() {
	}

	// 웹에서 호출할 사용자  
	public VendInfoTasker(String process, String storage, int counter ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
	}
	
	public void run() {
		if (POS_WEB_VEND_INFO.equals(this.process)){
			this.transferPOS_WEB_VEND_INFO();
		}
	}
	
	private void transferPOS_WEB_VEND_INFO() {
		//this.tracker = new TaskTracking(this.getClass().getName(), this.process, this.storage);
		logger.debug(this.process + " start");
		try {
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id     , a.ddn_id      , a.idx_1      , a.idx_2    , a.idx_3  ,  a.del_yn  ")
				
				.query("      ,    d.hq_id   , d.mngt_stor_id                                   								")
				.query("      ,    d.vend_id    , d.vend_cd      , d.vend_nm      , d.vend_gb    , d.vend_sts ,	d.sts_memo  ")
				.query("      ,    d.taekbae_add_amt   			 , d.taekbae_fee_amt             , d.taekbae_notax_yn 		")
				.query("      ,    d.sys_memo  , d.user_memo    , d.row_sts	  , d.converted                             ")
				
				.query(" from     sync_mst  a " ) 
				.query("          join  vend_mst d on d.vend_id = a.idx_1  " )
				
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
					if (logger.isDebugEnabled()) {
						logger.debug("taskProcess id = " + this.process + "[ " + ++current + "/" + maxsize + "]"  + "/1:" + row.getParamText("idx_1") + "/2:" + row.getParamText("idx_2") + "/3:" + row.getParamText("idx_3") );  // 수행중인 건수를 보는 로그
					}
					this.disposerPOS_WEB_VEND_INFO(sync, row); 
				}
				logger.debug(this.process + " end = " + map.size());
				//
//				if (maxsize == this.counter){
//					read.clear();
//					read.param.query(" select count(*) from sync_mst where sync_id = :sync_id " , this.process );
//					tracker.residual = read.selectForInt();
//				}
			} else {
				logger.debug(this.process + " end = nodata ");
			}
//			try { tracker.logwrite(); } catch (Exception ex) { ex.printStackTrace(); }  // 연동이후 남은 건수에 대한 로그를 기록 한다.
		} catch (Exception e) {
			logger.debug(this.process + " exception ");
			e.printStackTrace();
		}		
	}		
	
	
	public void disposerPOS_WEB_VEND_INFO(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();

			sync.param
				.table("vend_mst")
				.where("where vend_id = :vend_id " )
					
				.update("hq_id"           , syc.fixParameter("hq_id"     ))
				.update("mngt_stor_id"           , syc.fixParameter("mngt_stor_id"     ))
				.update("vend_id"            , syc.fixParameter("vend_id"      ))
				.update("vend_cd"            , syc.fixParameter("vend_cd"      ))
				.unique("vend_nm"            , syc.getParameter("vend_nm"      ))
				
				.update("vend_gb"            , syc.getParameter("vend_gb"      ))
				.update("vend_sts"           , syc.getParamText("vend_sts"     ))
				.update("sts_memo"           , syc.getParamText("sts_memo"     ))
				
				.update("taekbae_add_amt"    , syc.getParamText("taekbae_add_amt"  ))
				.update("taekbae_fee_amt"    , syc.getParamText("taekbae_fee_amt"  ))
				.update("taekbae_notax_yn"   , syc.getParamText("taekbae_notax_yn" ))
				.update("user_memo"          , syc.getParamText("user_memo"     ))
				.update("row_sts"          , syc.getParamText("row_sts"     ))
				.update("converted"          , syc.getParamText("converted"     ))
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
