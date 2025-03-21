package com.sky.system.project.cuserinfo;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import net.sky.core.exception.ServiceException;
import net.sky.core.thirdparty.encrypt.BCrypt;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class CUserInfoService extends DefaultServiceHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select																					")
			.query("       a.stor_id  , (select stor_nm from store where stor_id = a.stor_id ) as stor_nm	")
			.query("     , a.emp_id   , a.emp_no    , a.emp_nm   , a.login_id  , a.login_ip					")
			.query("     , a.tel_no   , a.hp_no     , a.email												")
			.query("     , a.state    , a.city      , a.dong     , a.zip_cd    , a.addr_2 					")
			.query("     , a.sex      , a.birth_dt  , a.birth_dt_gb											")
			.query("     , a.join_dt  , a.reti_dt   , a.reti_yn  , a.admin_yn  , a.manager_gb				")
			.query("     , a.usr_memo , a.row_sts															")
		;
		data.param
			.where("from   usr_mst a																		")
			.where("where  a.admin_yn  = :admin_yn" , "0")
			.where("and    a.row_sts   = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.reti_yn   = :reti_yn " , arg.getParamText("reti_yn" ))
			.where("and    a.row_sts   < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )

		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}

	/**
	 * 다이얼로그
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select a.stor_grp																				")
			.query("     , a.stor_id  , (select stor_nm   from store where stor_id = a.stor_id )       as stor_nm	")
			.query("     , a.emp_id   , a.emp_no   , a.emp_nm  , a.login_id											")
			.query("     , a.dept_id  , (select dept_nm   from dept_mst where dept_id = a.dept_id )    as dept_nm	")
			.query("     , a.jobcl_id , (select jobcl_nm  from jobcl_mst where jobcl_id = a.jobcl_id ) as jobcl_nm	")
			.query("     , a.usr_memo , a.row_sts  , a.wk_scope														")
		;
		data.param
			.where("from   usr_mst a																				")
			.where("where  1 = 1																					")
			.where("and    a.stor_grp  = :stor_grp " , arg.getParameter("stor_grp" ) )
			.where("and    a.reti_yn   = :reti_yn  " , arg.getParamText("reti_yn") )									// 재직 상태인 사용자만  검색
			.where("and    a.emp_nm like %:emp_nm% " , arg.getParameter("emp_nm" ) )
			.where("and    a.admin_yn  = :admin_yn " , "0")
			.where("and    a.row_sts   = :row_sts  " , "0"  ,( "0".equals(arg.getParamText("row_sts")) ))				// 정상 거래처만 조회 요청한 경우
			.where("and    a.row_sts  <= :row_sts  " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) ))				// 정상 거래처가 없거나.. 다른 값인 경우
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/**
	 *  사용자 정보를 수정한다... 이 로직은 표준 로직에서만 수행된다.... 연동하는 시스템에서는 본 로직을 사용하지 않게 된다.
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
	        	data.param
	        		.table("usr_mst")
	        		.where("where emp_id  = :emp_id   " )
	        		//
		        	.unique("emp_id"        , row.fixParameter("emp_id"         ))
		        	.update("row_sts"   	, 2                                   )
		        	.update("upt_ui"   		, row.fixParameter("upt_ui"       ))
		        	.update("upt_id"   		, row.fixParameter("upt_id"       ))
		        	.update("upt_ip"   		, arg.remoteAddress                   )
		        	.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        	;data.attach(Action.update);

				//---------------------------------------------------------------------------------------------
				// 사업장 접근관리에서 삭제 한다.
				//---------------------------------------------------------------------------------------------

			} else {

	        	data.param
		        	.table("usr_mst")
		        	.where("where emp_id  = :emp_id   " )
		        	.update("stor_id"			, row.getParameter("stor_id"        ))
		        	.insert("login_id"          , row.getParameter("login_id"        ))
		        	.insert("login_pwd"			, BCrypt.hashpw( UUID.randomUUID().toString().replace("-", "").substring(0,12) , BCrypt.gensalt()))
		        	.update("login_ip"          , row.getParameter("login_ip"        ))
		        	.unique("emp_id"			, row.fixParameter("emp_id"         ))
		        	.update("emp_no"			, row.fixParameter("emp_no"         ))
		        	.update("emp_nm"			, row.getParameter("emp_nm"         ))
		        	.update("dept_id"           , row.getParameter("dept_id"         ))
		        	.update("jobcl_id"          , row.getParameter("jobcl_id"         ))

		        	.update("join_dt"           , row.fixParameter("join_dt"         ))
		        	.update("reti_dt"           , row.getParameter("reti_dt"       ))
		        	.update("reti_yn"           , row.getParameter("reti_yn"       ))

		        	.update("tel_no"      		, row.getParameter("tel_no"      	 ))
		        	.update("hp_no"      		, row.getParameter("hp_no"      	 ))
		        	.update("email"       		, row.getParameter("email"       	 ))
		        	.update("state"             , row.getParameter("state"      ))
		        	.update("city"       		, row.getParameter("city"       ))
		        	.update("dong"      		, row.getParameter("dong"       ))

		        	.update("zip_cd"      		, row.getParameter("zip_cd"      	 ))
		        	.update("addr_1"       	    , row.getParamText("state"      ).trim() + " "
		        	                            + row.getParamText("city"       ).trim() + " "
		        			                    + row.getParamText("dong"       ).trim() )

		        	.update("addr_2"       	    , row.getParameter("addr_2"       	 ))

		        	.update("sex"        		, row.getParameter("sex"        	 ))
		        	.update("birth_dt"          , row.getParameter("birth_dt"        ))
		        	.update("birth_dt_gb"       , row.getParameter("birth_dt_gb"        ))
		        	.update("manager_gb"        , row.getParameter("manager_gb"      ))
		        	.update("usr_memo"     		, row.getParameter("usr_memo"       ))
		        	.update("row_sts"         	, row.getParameter("row_sts"       ))

		        	.update("upt_ui"   			, row.fixParameter("upt_ui"       ))
		        	.update("upt_id"   			, row.fixParameter("upt_id"       ))
		        	.update("upt_ip"   			, arg.remoteAddress )

		        	.insert("crt_ui"   			, row.fixParameter("crt_ui"       ))
		        	.insert("crt_id"   			, row.fixParameter("crt_id"       ))
		        	.insert("crt_ip"   			, arg.remoteAddress )
			        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

	        	;data.attach(rowaction);


			}


		}
		data.execute();
		return null ;
	}


	public boolean loginCheck(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.query("select count(login_id)   ")
				.query("from   usr_mst         ")
				.query("where  login_id   = :login_id    ", arg.fixParamText("login_id" ).toLowerCase())
				;
		int count = data.selectForInt();
		return (count <= 0 );

	}


	public SqlResultMap setLogin(HttpRequestArgument arg ) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq+".POS");
		if ("N1000BONIF".equals(hq)   ) {
			data.param
				.table("asp_security")
				.where("where emp_id  = :emp_id  " )
				.where("and   frc_cd  = :frc_cd  " )
				.where("and   brd_cd  = :brd_cd  " )
				//
				.unique("emp_id"        , arg.fixParameter("emp_id"         ))
			;data.attach(Action.update );
	        data.execute();
			return null ;
		} else {
			/*   이부분이 표준 로직임... (기존 시스템과 연동이 필요할 경우 위에 회사별로 지정하여야 한다.  */
			if (this.loginCheck(arg)) {

				DataMessage tmp = arg.newStorage("POS");
					tmp.param
						.table("usr_mst")
						.where("where emp_id = :emp_id  " )
				//
						.unique("emp_id"         , arg.fixParameter("emp_id"           ))
						.update("login_id"       , arg.getParamText("login_id"       ).toLowerCase())
						.update("other_id"       , ""                                    )
						.update("upt_id"         , arg.fixParameter("upt_id"         ))
						.update("upt_ip"   		 , arg.remoteAddress						)
						.update("upt_dttm"       , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
					;tmp.attach(Action.update );
			data.execute();
			} else {
				throw new ServiceException("이미 등록된 ID입니다." );
			}
			return null ;
		}
	}


	/**
	 *
	 */
	public SqlResultMap setPasswd(HttpRequestArgument arg ) throws Exception {
		String hq = arg.getParamText("hq_id");
		if ("N1000BONIF".equals(hq)   ) {
			DataMessage data = new DataMessage(hq+".POS");
			data.param
				.table("asp_security")
				.where("where emp_id = :emp_id  " )
				.where("and   frc_cd  = :frc_cd  " )
				.where("and   brd_cd  = :brd_cd  " )
				.unique("emp_id"          , arg.fixParameter("emp_id" ))
				.unique("frc_cd"          , arg.fixParamText("frc_cd" ))
				.unique("brd_cd"          , arg.fixParamText("brd_cd" ))
				.update("user_smp_pwd"    , arg.fixParamText("new_pass" ))
			;data.attach(Action.update);
	        data.execute();
		} else {
			/*   이부분이 표준 로직임... (기존 시스템과 연동이 필요할 경우 위에 회사별로 지정하여야 한다.  */
			DataMessage data = arg.newStorage("POS");
			data.param
				.table("usr_mst")
				.where("where emp_id = :emp_id  " )
				//
				.unique("emp_id"        , arg.fixParameter("emp_id"                 ))
				.update("login_pwd"     , BCrypt.hashpw( arg.fixParamText("new_pass" ) , BCrypt.gensalt() ))
				.update("etc_pwd"       , ""  )
				.update("upt_id"        , arg.fixParameter("upt_id"               ))
				.update("upt_ip"   		, arg.remoteAddress					          )
				.update("upt_dttm"      , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
			;data.attach(Action.update);
	        data.execute();
		}
		return null ;

	}
	/*******************************************************************
	 * 패스워드 변경
	 *******************************************************************/
	public SqlResultMap setChangePasswd(HttpRequestArgument arg) throws Exception {

		String oldpasswd = arg.fixParamText("old_pass");
		String newpasswd = arg.fixParamText("new_pass");
		String hq = arg.getParamText("hq_id");

		if ("N1000BONIF".equals(hq)   ) {
			DataMessage data = new DataMessage(hq+".POS");
			data.param // 쿼리문  입력
				.query("select a.user_smp_pwd as passwd          ")
				.query("  from asp_security a                    ")
				.query(" where a.emp_id   = :emp_id    ", arg.fixParameter("emp_id" ))
				.query(" and   a.frc_cd   = :frc_cd    ", arg.fixParameter("frc_cd" ))
				.query(" and   a.brd_cd   = :brd_cd    ", arg.fixParameter("brd_cd" ))
	        ;
			SqlResultRow login = data.selectForRow() ;

			if ( login != null && login.size() == 1  ){
				if (oldpasswd.equals(login.getParamText("passwd")))  {  /* 암호화된 DB의 loginPW와 비교 */
					data.clear();
					data.param
				       	.table("asp_security					")
				        .where("where	 emp_id  = :emp_id		")
				        .where("and 	 frc_cd   = :frc_cd		")
				        .where("and 	 brd_cd   = :brd_cd		")

				      	.unique("emp_id"       , arg.fixParameter("emp_id"       ))
				      	.unique("frc_cd"       , arg.fixParameter("frc_cd"        ))
				      	.unique("brd_cd"       , arg.fixParameter("brd_cd"        ))

	       				.update("user_smp_pwd" , newpasswd )
					;data.attach(Action.update );

				} else {
					throw new ServiceException("비밀번호가 일치하지 않습니다." );
				}

			} else {
				throw new ServiceException("아이디가 올바르지 않습니다." );
			}
			data.execute();
		}else{
			DataMessage data = arg.newStorage("POS");
			data.param
				.query("select a.login_pwd                  ")
				.query("  from usr_mst a                    ")
				.query(" where a.emp_id   = :emp_id         ", arg.fixParameter("emp_id" ))
	        ;
			SqlResultRow login = data.selectForRow() ;

			if ( login != null && login.size() == 1  ){
				if (BCrypt.checkpw(oldpasswd , login.getParamText("login_pwd"))) {  /* 암호화된 DB의 loginPW와 비교 */
					data.clear();
					data.param
				       	.table("usr_mst")
				        .where("where	 emp_id   = :emp_id   " )
				      	.unique("emp_id"          ,  arg.fixParameter("emp_id"        ))

	       				.update("login_pwd"       , BCrypt.hashpw( newpasswd , BCrypt.gensalt() ))
						.update("upt_id"          , arg.fixParameter("upt_id"         ))
						.update("upt_ip"   		  , arg.remoteAddress						)
						.update("upt_dttm"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )

					;data.attach(Action.update );

				} else {
					throw new ServiceException("비밀번호가 일치하지 않습니다." );
				}
			} else {
				throw new ServiceException("아이디가 올바르지 않습니다." );
			}
			data.execute();
		}
		return null ;
	}
}
