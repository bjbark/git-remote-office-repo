package com.sky.listener.tasker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class UserInfoTasker extends TaskExecuter{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public static String POS_WEB_USER_INFO = "POS_WEB_USER_INFO";
	
	
	// http://agent.sky.com:8080/listener/tasker.do?invoker=com.sky.listener.tasker.UserInfoTasker&process=POS_WEB_USER_INFO&storage=N1003ODKMS.POS
	// http://localhost:9020/listener/tasker.do?invoker=com.sky.listener.tasker.UserInfoTasker&process=POS_WEB_USER_INFO&storage=N1003ODKMS.POS&counter=1
	
	public UserInfoTasker() {
	}
	
	// 웹에서 호출할 사용자  
	public UserInfoTasker(String process, String storage, int counter ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
	}
	
	
	
	public void run() {
		System.out.println("TaskProcess run : " + this.process );
		if (POS_WEB_USER_INFO.equals(this.process)){
			this.transferWEB(this.process);
		}
	}
	

	private void transferWEB(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query("select  s.sync_id    , s.ddn_id    , s.idx_1    , s.idx_2    , s.idx_3   , s.del_yn	  ")
				.query("   	 ,  a.hq_id   , a.stor_grp   , a.stor_id     ")
				.query("     ,  a.emp_id    , a.emp_no    , a.emp_nm    , a.login_id   , a.login_pwd  , a.login_ip  ")
				.query("     ,  a.dept_id    , a.jobcl_id 	") //,(select dept_nm  from dept_mst where dept_id = a.dept_id ) as dept_nm
				.query("     ,  a.tel_no     , a.hp_no     , a.email      								   			  ")
				.query("     ,  a.state      , a.city       , a.dong       , a.zip_cd     , a.addr_2 			  	  ")
				.query("     ,  a.sex        , a.birthday   , a.birth_dt_gb   , a.auth_gb	  				   		  ")
				.query("     ,  a.join_dt    , a.reti_dt  , a.hoof_yn	   							   			  ")
				.query("     ,  a.user_memo  , a.row_sts  , a.wk_scope   , a.converted                              ")
				.query(" from   sync_mst  s " ) 
				.query("        join  usr_mst a on a.emp_id = s.idx_1  " )
				.query(" where  s.sync_id = :sync_id " , taskProcess )
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
	//.query("     	") //,(select stor_nm from stor where stor_id = a.stor_id ) as stor_nm 
	//.query("       	") // ,(select jobcl_nm  from jobcl_mst where jobcl_id = a.jobcl_id ) as jobcl_nm 
	
	
	public void disposerWEB(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();

			//logger.debug(syc.getParamText("del_yn"));
//			
//			if ("0".equals(syc.getParamText("web_salesman_yn"))) {
//			
//				sync.param
//					.table("usr_mst")
//					.where("where emp_id = :emp_id " )
//					//
//					.unique("emp_id"           , syc.fixParameter("emp_id"        )) //emp_id
//					
//		        	.update("row_sts"         , "2"  )
//		        	.update("web_salesman_yn"   , syc.getParameter("web_salesman_yn" ))
//					.update("upt_dttm"         , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
//					
//				//;sync.attach( Action.delete, syc.fixParamText("ddn_id" ));	
//				;sync.attach( Action.modify , syc.fixParamText("ddn_id" ));
//				
//
//			
//			} else {
				sync.param
	        	.table("usr_mst")
		        	.where("where emp_id  = :emp_id   " )
		        	//
		        	.unique("emp_id"           , syc.fixParameter("emp_id"         ))
		        	
		        	.update("hq_id"          , syc.fixParameter("hq_id"        ))
		        	.update("stor_grp"          , syc.fixParameter("stor_grp"        ))
		        	.update("stor_id"          , syc.fixParameter("stor_id"        ))
		        	.update("login_id"          , syc.getParameter("login_id"        ))
		        	.update("login_pwd"          , syc.getParameter("login_pwd"        ))
		        	.update("login_ip"          , syc.getParameter("login_ip"        ))
		        	.update("emp_no"           , syc.fixParameter("emp_no"         ))
		        	.update("emp_nm"           , syc.getParameter("emp_nm"         ))
		        	.update("dept_id"           , syc.getParameter("dept_id"         ))
		        	.update("jobcl_id"           , syc.getParameter("jobcl_id"         ))
		        	.update("tel_no"      		, syc.getParameter("tel_no"      	 ))
		        	.update("hp_no"      		, syc.getParameter("hp_no"      	 ))
		        	.update("email"       		, syc.getParameter("email"       	 ))
		        	.update("wk_scope"          , syc.getParameter("wk_scope" ))
		        	.update("user_memo"     	, syc.getParameter("user_memo"       ))
		        	.update("row_sts"         , syc.getParameter("row_sts"       ))
		        	.update("converted"         , syc.getParameter("converted"       ))
					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
					.insert("crt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				;sync.attach( Action.modify , syc.fixParamText("ddn_id" ));
		
		//	}
			
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

	
//	private void transferAGT(String taskCaption) {
//	try {
//		System.out.println(taskCaption + " start");
//		
//		DataMessage read = new DataMessage(this.storage);
//		read.param
//			.query(" select   a.pk_owner  , a.pk_val   , a.pk_hq    ")
//			.query("      ,   a.sync_id   , a.del_use_yn  , b.hq_pos_id    ")
//		
//			//.query(" select   a.hq_id      , a.sync_id       , a.pk_val1  ,  a.del_use_yn   ") 
//			//.query("      ,   d.stor_grp      , d.stor_id      , b.hq_pos_id                    ")
//			
//			.query("      ,   d.hq_id      , d.stor_grp      , d.stor_id                    ")
//			.query("      ,   d.emp_id       , d.emp_no       , d.emp_nm    , d.hoof_yn    ")
//			.query("      ,   d.login_id      , d.etc_pwd      , d.local_pw                    ")
//			.query("      ,   d.row_sts                             ")
//			.query(" from     data_sync  a                            ")
//			.query("          join hq b      on b.hq_id = a.pk_hq      ")				
//			.query("          join usr_mst d  on d.emp_id  = a.pk_val      ")
//			.query(" where    a.sync_id  = :sync_id " , AGT_USER_INFO )
//			
//			.query(" order by a.crt_dttm desc      " )
//		;
//		SqlResultMap map = read.selectForMap();
//		if (map.size() > 0) {
//			DataMessage sync = new DataMessage(this.storage);
//			for(SqlResultRow row:map){
//				this.disposerAGT(sync, row);
//			}
//			System.out.println(taskCaption + " end = " + map.size());
//		} else {
//			System.out.println(taskCaption + " end = nodata ");
//		}
//	} catch (Exception e) {
//		System.out.println(taskCaption + " exception ");
//		e.printStackTrace();
//	}
//}		


//public void disposerAGT(DataMessage sync, SqlResultRow syc ){
//	try {
//		sync.clear();
//		if (!"".equals(syc.getParamText("hq_pos_id").trim() )){
//			if ("1".equals(syc.getParamText("del_use_yn"))) {
//				sync.param
//					.table("usr_mst")
//					.where("where hq_id = :hq_id  " )
//					.where("and   emp_id  = :emp_id   " )
//					//
//					.unique("hq_id"           , syc.fixParameter("hq_id"         ))
//					.unique("emp_id"            , syc.fixParameter("emp_id"          ))
//					.update("row_sts"          , "2" )
//					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
//				;sync.attach( Action.modify, syc.getParamText("hq_pos_id" ).trim() );
//				
//			} else {
//				sync.param
//					.table("usr_mst")
//					.where("where hq_id = :hq_id  " )
//					.where("and   emp_id  = :emp_id   " )
//					//
//					.unique("hq_id"           , syc.fixParameter("hq_id"       ))
//					.unique("stor_grp"           , syc.fixParameter("stor_grp"       ))
//					.update("stor_id"           , syc.fixParameter("stor_id"       ))
//					.update("login_id"           , syc.getParamText("login_id"        ))
//					.update("etc_pwd"           , syc.getParamText("etc_pwd"        ))
//					.update("local_pw"           , syc.getParamText("local_pw"        ))
//					.unique("emp_id"            , syc.fixParameter("emp_id"         ))
//					.update("emp_no"            , syc.fixParameter("emp_no"         ))
//					.update("emp_nm"            , syc.getParamText("emp_nm"         ))
//					.update("hoof_yn"          , syc.getParameter("hoof_yn"       ))
//					.update("row_sts"          , syc.getParameter("row_sts"       ))
//					.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
//				;sync.attach( Action.modify , syc.getParamText("hq_pos_id" ).trim() );
//			}
//		}
//		
//		// 싱크 데이터를 삭제 한다.
//		sync.param
//			.table("data_sync")
//			.where("where sync_id  = :sync_id  and pk_owner = :pk_owner " )
//			.where("  and pk_val = :pk_val and pk_hq = :pk_hq " )
//			//
//			.unique("sync_id"           , syc.fixParameter("sync_id"        ))
//			.unique("pk_owner"          , syc.fixParameter("pk_owner"       ))
//			.unique("pk_val"          , syc.fixParameter("pk_val"       ))
//			.unique("pk_hq"          , syc.fixParameter("pk_hq"       ))
//		;sync.attach(Action.delete).execute();			
//		
//	} catch (Exception e) {
//		e.printStackTrace();
//		try {
//			sync.clear();
//			sync.param
//				.table("data_sync")
//				.where("where sync_id  = :sync_id  and pk_owner = :pk_owner " )
//				.where("  and pk_val = :pk_val and pk_hq = :pk_hq " )
//				//
//				.unique("sync_id"           , syc.fixParameter("sync_id"        ))
//				.unique("pk_owner"          , syc.fixParameter("pk_owner"       ))
//				.unique("pk_val"          , syc.fixParameter("pk_val"       ))
//				.unique("pk_hq"          , syc.fixParameter("pk_hq"       ))					
//				.update("user_memo"    	    , e.getMessage() )
//				.update("upt_dttm"         , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
//			;
//			sync.attach(Action.update).execute();
//
//		} catch (Exception e1) {}
//	}
//}	
//

