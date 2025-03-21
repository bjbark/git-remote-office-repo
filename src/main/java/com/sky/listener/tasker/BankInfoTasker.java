package com.sky.listener.tasker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class BankInfoTasker extends TaskExecuter{
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public static String POS_WEB_BANK_INFO = "POS_WEB_BANK_INFO";
     
	//private TaskTracking tracker = null;  
	
	public BankInfoTasker() {
	}
	
	// 웹에서 호출할 사용자  
	public BankInfoTasker(String process, String storage, int counter ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
	}	
	
	
	public void run() {
		if (POS_WEB_BANK_INFO.equals(this.process)){
			this.transferPOS_WEB_BANK_INFO();
		}
	}

	private void transferPOS_WEB_BANK_INFO() {
		//this.tracker = new TaskTracking(this.getClass().getName(), this.process, this.storage);
		logger.debug(this.process + " start");		
		try {
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query("select    a.sync_id    , a.ddn_id     , a.idx_1    , a.idx_2    , a.idx_3,     a.del_yn  ")
				//
				.query("     ,    b.hq_id   , b.stor_grp    , b.stor_id   ,	b.bank_id    , v.bas_nm  as  bank_nm    ")  // (select bas_nm  from base_mst where bas_id  = b.bank_id  ) as
				.query("     ,    b.bnkbk_id , b.account_cd  , b.acct_no , b.account_nm , b.account_ow              ")
				.query("     ,    b.user_memo  , b.row_sts                               ")
				.query(" from     sync_mst  a                                             ") 
				.query("          join  stor_account       b on b.bnkbk_id = a.idx_1  ")
				.query("          left outer join base_mst v on v.bas_id    = b.bank_id  ")				
				.query(" where    a.sync_id = :sync_id " , this.process )
				.query(" and      rownum <= :counter "   , this.counter , (this.counter > 0))  
				.query(" order by a.upt_dttm asc  " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				int current = 0, maxsize = map.size(); 		
				for(SqlResultRow row:map){
					if (logger.isDebugEnabled()){
						logger.debug("taskProcess id = " + this.process + "[ " + ++current + "/" + maxsize + "]"  + "/1:" + row.getParamText("idx_1") + "/2:" + row.getParamText("idx_2") + "/3:" + row.getParamText("idx_3") );  // 수행중인 건수를 보는 로그
					}
					//logger.debug("taskProcess id = " + this.process + "[ " + ++current + "/" + maxsize + "]"); 
					this.disposerPOS_WEB_BANK_INFO(sync, row);
				}
				logger.debug(this.process + " end = " + map.size());
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
	
	
	public void disposerPOS_WEB_BANK_INFO(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();
			if ("1".equals(syc.getParamText("del_yn")) ) {
				
				sync.param
					.table("stor_account")
	        		.where("where bnkbk_id       = :bnkbk_id   ")
					//
					.unique("bnkbk_id"           , syc.fixParameter("bnkbk_id" ))
					.update("row_sts"          , "2" )
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				;sync.attach( Action.modify, syc.fixParamText("ddn_id" ));

				sync.param
					.table("shop_account")
					.where("where bnkbk_id       = :bnkbk_id   ")
					//
					.unique("bnkbk_id"         , syc.fixParameter("bnkbk_id" ))
					.update("row_sts"          , "2" )
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				;sync.attach( Action.modify, syc.fixParamText("ddn_id" ));
				
			} else {
				sync.param
					.table("stor_account")
	        		.where("where bnkbk_id       = :bnkbk_id   ")
					//
		        	.update("hq_id"           , syc.fixParameter("hq_id"        ))
		        	.update("stor_grp"           , syc.fixParameter("stor_grp"        ))
		        	.update("stor_id"           , syc.fixParameter("stor_id"        ))
		        	.update("bank_id"   	     , syc.getParameter("bank_id"   	  ))
		        	.update("bank_nm"   	     , syc.getParameter("bank_nm"   	  ))
		        	.unique("bnkbk_id"         , syc.fixParameter("bnkbk_id"      ))
		        	.update("account_cd"         , syc.fixParameter("account_cd"      ))
		        	.update("account_nm"         , syc.getParameter("account_nm"      ))
		        	.update("acct_no"         , syc.getParameter("acct_no"      ))
		        	.update("account_ow"         , syc.getParameter("account_ow"      ))
					
					.update("user_memo"          , syc.getParameter("user_memo"    ))
					.update("row_sts"          , syc.getParameter("row_sts"    ))
				
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
					.insert("crt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
					
				;sync.attach( Action.modify , syc.fixParamText("ddn_id" ));
				
				sync.param
					.table("shop_account")
					.where("where bnkbk_id       = :bnkbk_id   ")
					//
					.unique("bnkbk_id"         , syc.fixParameter("bnkbk_id"      ))
					//
					.update("hq_id"           , syc.fixParameter("hq_id"        ))
					.update("bank_id"   	     , syc.getParameter("bank_id"   	  ))
					.update("bank_nm"   	     , syc.getParameter("bank_nm"   	  ))
					.unique("bnkbk_id"         , syc.fixParameter("bnkbk_id"      ))
					.update("account_cd"         , syc.fixParameter("account_cd"      ))
	        		.update("account_nm"         , syc.getParameter("account_nm"      ))
	        		.update("acct_no"         , syc.getParameter("acct_no"      ))
	        		.update("account_ow"         , syc.getParameter("account_ow"      ))
	        		.update("user_memo"          , syc.getParameter("user_memo"    ))
					.update("row_sts"          , syc.getParameter("row_sts"    ))
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
					.insert("crt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				;sync.attach( Action.update , syc.fixParamText("ddn_id" ));
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
					.update("upt_dttm"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}	
}
