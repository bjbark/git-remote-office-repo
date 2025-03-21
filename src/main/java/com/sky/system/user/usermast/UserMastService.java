package com.sky.system.user.usermast;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.core.thirdparty.encrypt.BCrypt;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.axis.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class UserMastService extends DefaultServiceHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param
			.query("select *																						")
		;
		data.param // 쿼리문  입력
			.where("from ( 																							")
			.where("select																							")
			.where("        a.user_idcd      , a.lgin_idcd , a.user_name       , a.duty_dvcd   , a.lgin_pswd		")
			.where("    ,   a.pswd_cgdt      , a.user_dvcd , a.hoof_stat_dvcd  , a.join_date   , a.rtmt_date		")
			.where("    ,   a.hdph_numb      , a.brth_date , a.dept_idcd       , a.mail_addr   , a.admn_yorn		")
			.where("    ,   a.hqof_idcd      , a.user_code , a.auth_dvcd       , a.wkrn_idcd   , w.wkrn_name		")
			.where("    ,   a.user_memo      , a.sysm_memo , a.prnt_idcd       , a.line_levl   , a.cost_drtr_yorn	")
			.where("    ,   a.line_ordr      , a.line_stat , a.line_clos       , a.find_name   , a.updt_user_name	")
			.where("    ,   a.updt_ipad      , a.updt_dttm , a.updt_idcd       , a.updt_urif   , a.crte_user_name	")
			.where("    ,   a.crte_ipad      , a.crte_dttm , a.crte_idcd       , a.crte_urif   , b.dept_name		")
			.where("    ,   a.labo_rate_idcd , b.dept_code , c.labo_rate_name  , d.base_name as natn_bacd_name		")
			;
		data.param //퀴리문
			.where("from	user_mast as a																			")
			.where("		left outer join dept_mast as b on  a.dept_idcd = b.dept_idcd							")
			.where("		left outer join labo_rate as c on  a.labo_rate_idcd = c.labo_rate_idcd					")
			.where("		left outer join base_mast as d on  a.natn_bacd = d.base_code and d.prnt_idcd='1202'		")
			.where("		left outer join wkrn_mast as w on  a.wkrn_idcd = w.wkrn_idcd							")
			.where("where	1=1																						")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.user_name	like %:user_name%"	, arg.getParameter("user_name"))
			.where("and		a.hoof_stat_dvcd = :hoof_stat_dvcd"		, arg.getParameter("hoof_stat_dvcd"))
			.where("and		a.dept_idcd	= :dept_idcd"		, arg.getParameter("dept_idcd"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat") , !"".equals(arg.getParamText("line_stat" )))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.dept_name, a.wkrn_idcd, a.hoof_stat_dvcd ) a											")

		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}

	//팝업
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS"	);
		String user_idcd = arg.getParamText("user_idcd");
		data.param
			.total("select count(1) as maxsize																		")
		;
		data.param // 쿼리문  입력
			.query("select																							")
			.query("		a.user_idcd     , a.lgin_idcd  , a.user_name       , a.duty_dvcd  , a.lgin_pswd			")
			.query("	,	a.pswd_cgdt     , a.user_dvcd  , a.hoof_stat_dvcd  , a.join_date  , a.rtmt_date			")
			.query("	,	a.hdph_numb     , a.brth_date  , a.dept_idcd       , a.mail_addr  , a.admn_yorn			")
			.query("	,	a.hqof_idcd     , a.user_code  , a.auth_dvcd       , a.cost_drtr_yorn					")
			.query("	,	a.user_memo     , a.sysm_memo  , a.prnt_idcd       , a.line_levl						")
			.query("	,	a.line_ordr     , a.line_stat  , a.line_clos       , a.find_name  , a.updt_user_name	")
			.query("	,	a.updt_ipad     , a.updt_dttm  , a.updt_idcd       , a.updt_urif  , a.crte_user_name	")
			.query("	,	a.crte_ipad     , a.crte_dttm  , a.crte_idcd       , a.crte_urif  , b.dept_name			")
			.query("	,	a.labo_rate_idcd, b.dept_code  , c.labo_rate_name  , b.dept_name						")
		;
		data.param //퀴리문
			.where("from	user_mast as a																			")
			.where("		left outer join dept_mast as b   on a.dept_idcd = b.dept_idcd							")
			.where("		left outer join labo_rate as c on  a.labo_rate_idcd = c.labo_rate_idcd					")
			.where("		left outer join wkct_mans as w on  a.user_idcd = w.empy_idcd							")
			.where("where	1=1																						")
			.where("and		a.find_name	like %:find_name%"		, arg.getParameter("find_name"))
			.where("and		a.user_name	like %:user_name%"		, arg.getParameter("user_name"))
			.where("and		a.hoof_stat_dvcd = :hoof_stat_dvcd"	, arg.getParameter("hoof_stat_dvcd"))
			.where("and		a.dept_idcd	= :dept_idcd"			, arg.getParameter("dept_idcd"))
			.where("and		w.wkct_idcd	= :wkct_idcd"			, arg.getParamText("wkct_idcd"))
			.where("and		a.line_stat	= :line_stat1"			, arg.getParamText("line_stat"))
			.where("and		a.line_stat	< :line_stat"			, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and		a.hoof_stat_dvcd	<> '9'"															)
		;
		if(user_idcd.length() > 0){
			data.param
				.where("and		a.dept_idcd	= (select dept_idcd									")
				.where("                       from user_mast									")
				.where("                       where user_idcd = :user_idcd )",	user_idcd		)

			;
		}
		if(arg.getParamText("hq_id").toUpperCase().equals("N1000IYPKG")) {
			data.param
				.where("and		a.user_idcd	= :user_idcd2"			, arg.getParameter("user_idcd"))
			;
		}

		// 23.09.27 - 직무구분에 해당하는 사용자만 조회, 삼정적용
		String [] duty_dvcd = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("duty_dvcd"))) {
			duty_dvcd = ((String)arg.getParameter("duty_dvcd")).split(",");

			data.param
				.where("and		a.duty_dvcd in (:duty_dvcd)	"  , duty_dvcd)
			;
		}

		data.param
			.where("group by a.user_idcd																			")
			.where("order by a.user_code																			")
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1)  );
	}

	// item1
	public SqlResultMap getItem1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("hq_id")!=""){
			data =  new DataMessage(arg.getParamText("hq_id")+".POS");
		}

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.user_idcd      , a.auth_idcd       , a.auth_name    , b.base_code as auth_code	")
		;
		data.param //퀴리문
			.where("from  user_auth a																			")
			.where("left outer join base_mast b on a.auth_idcd = b.base_idcd									")
			.where("where 1=1																					")
			.where("and   a.user_idcd = :user_idcd        " , arg.getParameter("user_idcd"						))
			.where("and   a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat"	)))
			.where("order by b.base_code																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// item2
	public SqlResultMap getItem2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.base_idcd        , a.hqof_idcd        , a.base_code       , a.base_name		")
			.query("		, a.base_engl_name   , a.code_leng												")
		;
		data.param //퀴리문
			.where("from  base_mast a																		")
			.where("where 1=1																				")
			.where("and   a.prnt_idcd = '5000'																")
			.where("and   a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("and   a.base_idcd not in (select auth_idcd from user_auth where user_idcd = :user_idcd)", arg.getParameter("user_idcd"))
			.where("order by a.base_code																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//사용자 정보수정
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("user_mast")
					.where("where user_idcd	= :user_idcd")

					.unique("user_idcd"			, row.fixParameter("user_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);
			} else {
				data.param
					.table("user_mast"							)
					.where("where user_idcd   = :user_idcd"		)

					.unique("user_idcd"			, row.fixParameter("user_idcd"))

					.update("user_code"			, row.getParameter("user_code"))
					.update("lgin_idcd"			, row.getParameter("lgin_idcd"))
					.update("mail_addr"			, row.getParameter("mail_addr"))
					.update("lgin_pswd"			, row.getParameter("lgin_pswd"))
					.update("hdph_numb"			, row.getParameter("hdph_numb"))
					.update("duty_dvcd"			, row.getParameter("duty_dvcd"))
					.update("user_dvcd"			, row.getParameter("user_dvcd"))
					.update("user_name"			, row.getParameter("user_name"))
					.update("join_date"			, row.getParameter("join_date"))
					.update("rtmt_date"			, row.getParameter("rtmt_date"))
					.update("brth_date"			, row.getParameter("brth_date"))
					.update("dept_idcd"			, row.getParameter("dept_idcd"))
					.update("admn_yorn"			, row.getParameter("admn_yorn"))
					.update("labo_rate_idcd"	, row.getParameter("labo_rate_idcd"))
					.update("hoof_stat_dvcd"	, row.getParameter("hoof_stat_dvcd"))
					.update("natn_bacd"			, row.getParameter("natn_bacd"))
					.update("auth_dvcd"			, row.getParameter("auth_dvcd"))
					.update("hqof_idcd"			, row.getParameter("hqof_idcd"))
					.update("wkrn_idcd"			, row.getParameter("wkrn_idcd"))
					.update("cost_drtr_yorn"	, row.getParameter("cost_drtr_yorn"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("user_name")
												+ "  "
												+ row.getParameter("user_code")
												+ "  "
												+ row.fixParameter("user_idcd")
												+ "  "
												+ row.fixParameter("dept_idcd"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setItem1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("user_auth")
					.where("where user_idcd	= :user_idcd")
					.where("and   auth_idcd	= :auth_idcd")

					.unique("user_idcd"			, row.fixParameter("user_idcd"		))
					.unique("auth_idcd"			, row.fixParameter("auth_idcd"		))
					;data.attach(Action.delete);

			} else {
				data.param
					.table("user_auth")
					.where("where user_idcd	= :user_idcd" )
					.where("and   auth_idcd	= :auth_idcd" )

					.unique("user_idcd"				, row.fixParameter("user_idcd"))
					.unique("auth_idcd"				, row.fixParameter("auth_idcd"))

					.update("auth_name"				, row.getParameter("auth_name"))

					.update("find_name"				, row.getParameter("auth_idcd")
													+ " "
													+ row.fixParameter("auth_name"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public boolean loginCheck(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.query("select count(lgin_idcd)		")
				.query("from	user_mast			")
				.query("where	lgin_idcd	= :lgin_idcd	", arg.fixParamText("lgin_idcd" ).toLowerCase())
				;
		int count = data.selectForInt();
		return (count <= 0 );

	}

	public SqlResultMap setLogin(HttpRequestArgument arg ) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq+".POS");
			if ("N1000BONIF".equals(hq)		) {
				data.param
					.table("asp_security")
					.where("where lower(user_id) = :emp_id	" )

					.unique("emp_id"		, arg.fixParamText("emp_id"		).toLowerCase())
				;data.attach(Action.update );
				data.execute();
				return null ;
			} else {
				/*   이부분이 표준 로직임... (기존 시스템과 연동이 필요할 경우 위에 회사별로 지정하여야 한다.  */
				if (this.loginCheck(arg)) {
					DataMessage tmp = arg.newStorage("POS");
						tmp.param
							.table("user_mast")
							.where("where user_idcd = :user_idcd  " )
					//
							.unique("user_idcd"			, arg.fixParameter("user_idcd"			))
							.update("lgin_idcd"			, arg.getParamText("lgin_idcd"			).toLowerCase())
							.update("updt_idcd"			, arg.fixParameter("updt_idcd"			))
							.update("updt_ipad"			, arg.remoteAddress						)
							.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						;tmp.attach(Action.update );
						tmp.execute();
				} else {
					throw new ServiceException("이미 등록된 ID입니다." );
				}
				return null ;
		}
	}

	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setPasswd(HttpRequestArgument arg ) throws Exception {
		String hq = arg.getParamText("hq_id");
			DataMessage data = arg.newStorage("POS");
			data.param
				.table("user_mast")
				.where("where user_idcd = :user_idcd" )
				//
				.unique("user_idcd"		, arg.fixParameter("user_idcd"				))
	//			.update("login_pwd"		, BCrypt.hashpw( arg.fixParamText("new_pass" ) , BCrypt.gensalt() )) //Encryptor.SHA(arg.fixParamText("login_pwd" )))
				.update("lgin_pswd"		, arg.fixParamText("new_pass"				))
				//.update("etc_pwd"		, ""  )
				.update("updt_idcd"		, arg.fixParameter("updt_idcd"				))
				.update("updt_ipad"		, arg.remoteAddress							)
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;data.attach(Action.update);
			data.execute();
			return null ;
	}

	//패스워드 변경
	public SqlResultMap setChangePasswd(HttpRequestArgument arg) throws Exception {

		String oldpasswd = arg.fixParamText("old_pass");
		String newpasswd = arg.fixParamText("new_pass");
		String hq = arg.getParamText("hq_id");
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.lgin_idcd,a.lgin_pswd	")
			.query("  from user_mast a				")
			.query(" where a.user_idcd   = :user_idcd		", arg.fixParameter("user_idcd" ))
		;
		SqlResultRow login = data.selectForRow() ;
		System.out.println(login);
		System.out.println(login.size());
		if ( login != null && login.size() > 0  ){
			if (oldpasswd.equals(login.getParamText("lgin_pswd"))) {  /* 암호화된 DB의 loginPW와 비교 */
				data.clear();
				data.param
					.table("user_mast")
					.where("where	user_idcd	= :user_idcd					")
					.unique("user_idcd"	,  arg.fixParameter("user_idcd"			))
					.update("lgin_pswd"	, newpasswd								 )
					.update("updt_idcd"	, arg.fixParameter("updt_idcd"			))
					.update("updt_ipad"	, arg.remoteAddress						 )
					.update("updt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

				;data.attach(Action.update );

			} else {
				throw new ServiceException("비밀번호가 일치하지 않습니다." );
			}
		} else {
			throw new ServiceException("아이디가 올바르지 않습니다." );
		}
		data.execute();
		return null ;
	}
	//패스워드 변경
	public SqlResultMap setPwReset(HttpRequestArgument arg) throws Exception {

		String newpasswd = arg.fixParamText("new_pass");
		String hq = arg.getParamText("hq_id");
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.lgin_idcd				")
			.query("  from user_mast a				")
			.query(" where a.user_idcd   = :user_idcd		", arg.fixParameter("user_idcd" ))
		;
		SqlResultRow login = data.selectForRow() ;

		if ( login != null && login.size() == 1  ){
			data.clear();
			data.param
				.table("user_mast")
				.where("where	user_idcd	= :user_idcd					")
				.unique("user_idcd"	,  arg.fixParameter("user_idcd"			))
				.update("lgin_pswd"	, newpasswd								 )
				.update("updt_idcd"	, arg.fixParameter("updt_idcd"			))
				.update("updt_ipad"	, arg.remoteAddress						 )
				.update("updt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

			;data.attach(Action.update );
		} else {
			throw new ServiceException("아이디가 올바르지 않습니다." );
		}
		data.execute();
		return null ;
	}
}
