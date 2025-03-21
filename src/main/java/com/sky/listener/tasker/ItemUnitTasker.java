package com.sky.listener.tasker;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class ItemUnitTasker extends TaskExecuter {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public static String POS_SYC_ITEM_UNIT = "POS_SYC_ITEM_UNIT";
	
	public ItemUnitTasker() {
	}
	
	// 웹에서 호출할 사용자  
	public ItemUnitTasker(String process, String storage, int counter ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
	}
	
	
	
	public void run() {
		if (POS_SYC_ITEM_UNIT.equals(this.process)){ this.transferPOS_SYC_ITEM_UNIT();
		} else {
		}
	}
	
	private void transferPOS_SYC_ITEM_UNIT() {
		try {
			logger.debug(this.process + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id   , a.ddn_id      , a.idx_1    , a.idx_2    , a.idx_3  ,  a.del_yn  ")
				.query("      ,   b.hq_id  , b.stor_id     as  stor_grp   , d.shr_yn                 		        ")
				.query("      ,   d.unit_idcd   , d.unt_cd      , d.unit_name    , d.row_sts         					")
				.query(" from     sync_mst  a 																			") 
				.query("          join hq      b on b.hq_id = a.idx_1  " )  
				.query("          join itm_unit  d on d.unit_idcd  = a.idx_2  " )  
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
					this.disposerPOS_SYC_ITEM_UNIT(sync, row); 
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
	
	public void disposerPOS_SYC_ITEM_UNIT(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();
//			if ("1".equals(syc.getParamText("del_use_yn")) || "".equals(syc.getParamText("unit_idcd" ))) {
//				sync.param
//					.table("itm_unit")
//					.where("where unit_idcd = :unit_idcd " )
//					//
//					.unique("unit_idcd"            , syc.fixParameter("unit_idcd"         ))
//					.update("row_sts"          , "2" )
//					.update("upt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
//					.insert("crt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
//					
//				;sync.attach( Action.update, syc.fixParamText("ddn_id" ) );
//			} else {
				sync.param
					.table("itm_unit")
					.where("where unit_idcd = :unit_idcd " )
					//
					.unique("hq_id"           , syc.fixParameter("hq_id"       ))
					.insert("stor_grp"           , syc.fixParameter("stor_grp"       ))
					.insert("shr_yn"           , syc.fixParameter("shr_yn"       ))
					.unique("unit_idcd"            , syc.getParamText("unit_idcd"        ))
					.update("unt_cd"            , syc.getParamText("unt_cd"        ))
					.update("unit_name"            , syc.getParamText("unit_name"        ))
					.update("row_sts"          , syc.fixParameter("row_sts"      ))
					.update("upt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					.insert("crt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
				;sync.attach( Action.modify , syc.fixParamText("ddn_id" ) );
			//}
			
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
			
			// 싱크 데이터를 삭제 한다.
//			sync.param
//				.table("data_sync")
//				.where("where sync_id  = :sync_id  and pk_owner = :pk_owner " )
//				.where("  and pk_val = :pk_val and pk_hq = :pk_hq " )
//				//
//				.unique("sync_id"           , syc.fixParameter("sync_id"        ))
//				.unique("pk_owner"          , syc.fixParameter("pk_owner"       ))
//				.unique("pk_val"          , syc.fixParameter("pk_val"       ))
//				.unique("pk_hq"          , syc.fixParameter("pk_hq"       ))
//			;sync.attach(Action.delete).execute();			
			
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
