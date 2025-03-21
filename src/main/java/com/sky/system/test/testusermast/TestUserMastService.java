package com.sky.system.test.testusermast;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.core.thirdparty.encrypt.BCrypt;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.baroservice.api.sms.Tests;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class TestUserMastService extends DefaultServiceHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  *																")
		;
		data.param //퀴리문
			.where("from (																	")
			.where("select  date , log , dvcd												")
			.where("from	sorter_log a													")
			.where("where	dvcd = :dvcd									",arg.fixParameter("dvcd"))
			.where("and		date_format(date ,'%Y%m%d') = date_format(now() ,'%Y%m%d')		")
			.where("order by date asc) a														")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select  *																")
		;
		data.param //퀴리문
		.where("from (																	")
		.where("select    count(1) as total_cnt											")
		.where("        , count(if(INSTR(log,'NOREAD')>0,1,null)) as noread				")
		.where("        , count(if(INSTR(log,'NOREAD')>0,null,1)) as read_cnt			")
		.where("from   sorter_log a														")
		.where("where  DATE_FORMAT(date,'%Y%m%d') = DATE_FORMAT(now(),'%Y%m%d')			")
		.where("and    dvcd = '2000'													")
		.where(") a																		")
		;
		return data.selectForMap();
	}

	//팝업
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS"	);
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
			.where("where	1=1																						")
			.where("and		a.find_name	like %:find_name%"		, arg.getParameter("find_name"))
			.where("and		a.user_name	like %:user_name%"		, arg.getParameter("user_name"))
			.where("and		a.hoof_stat_dvcd = :hoof_stat_dvcd"	, arg.getParameter("hoof_stat_dvcd"))
			.where("and		a.dept_idcd	= :dept_idcd"			, arg.getParameter("dept_idcd"))
			.where("and		a.line_stat	= :line_stat1"			, arg.getParamText("line_stat"))
			.where("and		a.line_stat	< :line_stat"			, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.user_code																			")
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1)  );
	}

	// item1
	public SqlResultMap getItem1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

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
												+ row.fixParameter("user_idcd"))
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
			.query("select a.lgin_idcd				")
			.query("  from user_mast a				")
			.query(" where a.user_idcd   = :user_idcd		", arg.fixParameter("user_idcd" ))
		;
		SqlResultRow login = data.selectForRow() ;

		if ( login != null && login.size() == 1  ){
			if (BCrypt.checkpw(oldpasswd , login.getParamText("login_pwd"))) {  /* 암호화된 DB의 loginPW와 비교 */
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
	public SqlResultMap setTest1(HttpRequestArgument arg) throws Exception {
		Tests sms = new Tests();
		sms.SendMessage(arg.getParamText("key"),arg.getParamText("num"), arg.getParamText("id"), arg.getParamText("name"), arg.getParamText("from"),arg.getParamText("to"),arg.getParamText("content"));
//		Tests fax = new Tests();
//		fax.SendFaxFromFTP(arg.getParamText("key"),arg.getParamText("num"), arg.getParamText("id"), arg.getParamText("name"), arg.getParamText("from"),arg.getParamText("to"), arg.getParamText("tocorp"), arg.getParamText("toname") );
		return null ;
	}
	public SqlResultMap setTest2(HttpRequestArgument arg) throws Exception {

			Document doc = Jsoup.connect("https://sbiz.wooribank.com/biz/jcc?withyou=BZFXD0019&__ID=c008329")
					.header("Accept", "text/html, */*; q=0.01")
					.header("Accept-Encoding", "gzip, deflate, br")
					.header("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7")
					.header("Cache-Control", "no-cache")
					.header("Connection", "keep-alive")
//					.header("Content-Length", "242")
					.header("Content-Type", "application/x-www-form-urlencoded")
					.header("Cookie", "ccsession=20211222105432c0a889100100f01f0f; ccguid=20211222105432c0a889100100f01f0f; SSO_GROUP=S; JSESSIONID=FzhXV8NZbYzGjTSNSLDj54TvgAbFLNSyV8r8ImFlfgkCU4pdDtuO!-980859846; SSO_BINDADDR=s_biz.Dbiz072; SSO_REFERBINDADDR=s_svc.svc072; SSO_BINDADDRLST=OAZ; _xm_webid_1_=-815700794")
					.header("Host", "sbiz.wooribank.com")
					.header("Origin", "https://sbiz.wooribank.com")
					.header("Pragma", "no-cache")
					.header("Referer", "https://sbiz.wooribank.com/biz/Dream?withyou=BZFXD0019")
					.header("sec-ch-ua", "Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96")
					.header("sec-ch-ua-mobile", "?0")
					.header("sec-ch-ua-platform", "Windows")
					.header("Sec-Fetch-Dest", "empty")
					.header("Sec-Fetch-Mode", "cors")
					.header("Sec-Fetch-Site", "same-origin")
					.header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36")
					.header("X-Requested-With", "XMLHttpRequest")
					.data("BAS_DT",arg.fixParamText("BAS_DT"))
					.data("NTC_DIS",arg.fixParamText("NTC_DIS"))
					.data("NTC_DIS",arg.fixParamText("NTC_DIS"))
					.data("SELECT_DATE",arg.fixParamText("SELECT_DATE"))
					.data("SELECT_DATEY",arg.fixParamText("SELECT_DATEY"))
					.data("SELECT_DATEM",arg.fixParamText("SELECT_DATEM"))
					.data("SELECT_DATED",arg.fixParamText("SELECT_DATED")).post()
			;
			Elements items = doc.select("td");
			int i = 0;
			int j = 0;
			SqlResultMap map = new SqlResultMap();
			SqlResultRow row = new SqlResultRow();
			for (Element item : items) {
				String title="";
				if(item.html().indexOf("href")==3){
					i = 0;
				}else{
					i++;
				}
				if(i>0){
					switch (i) {
					case 1:
						title="nation"; //국가
						break;
					case 2:
						title="remittance"; //송금(발송)
						break;
					case 3:
						title="deposit"; //송금(입금)
						break;
					case 4:
						title="purc_pric"; //현찰(구매)
						break;
					case 5:
						title="purc_pers"; //구매스프레드율
						break;
					case 6:
						title="sale_pric"; //현찰(판매)
						break;
					case 7:
						title="sale_pers"; //판매스프레드율
						break;
					case 8:
						title="stnd_rate"; //매매기준율
						break;

					case 9:
						title="base_rate"; //기준환율
						break;

					case 10:
						title="uscv_rate"; //대미환산율
						break;

					default:
						break;
					}
					row.setParameter(title, item.html());
					if(i==10){
						map.add(row);
						j++;

						row = new SqlResultRow();
					}
				}
			}
		return map;
	}
	public SqlResultMap sendFCM(HttpRequestArgument arg) throws Exception {
		
		
		return null;
	}
}
