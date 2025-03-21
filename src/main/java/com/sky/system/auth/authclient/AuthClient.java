package com.sky.system.auth.authclient;

import java.util.LinkedHashMap;
import java.util.Map;

import net.sky.core.common.annotation.ReleaseToken;
import net.sky.core.exception.ServiceException;
import net.sky.core.thirdparty.encrypt.TimeBasedUUID;
import net.sky.core.thirdparty.encrypt.BCrypt;
import net.sky.core.thirdparty.google.GoogleLogin;
import net.sky.core.validation.regexp.Regexp;
import net.sky.http.dispatch.control.DefaultControlHandler;
import net.sky.http.dispatch.service.AppLicenseKeyService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.http.HttpTokener;
import com.sky.utils.IpUtil;
import com.sky.utils.TreeHash;


@Controller
public class AuthClient extends DefaultControlHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private AuthClientService service;

	@Autowired
	private AppLicenseKeyService license;

	/**
	 * 사용자 인증을 받는다.
	 */

	@RequestMapping(value="/auth/identify.do")
	public String getClientMes(@ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {

		HttpRequestArgument arg = http.argument;

		String login_id		= arg.fixParamText("login_id");
		String hq_id		= arg.fixParamText("hq_id" );
		String stor_id		= arg.fixParamText("stor_id" );
		String cert_idcd	= arg.getParamText("cert_idcd" );
		String cert_code	= arg.getParamText("cert_code" );
		String accessor		= arg.getParamText("accessor" );
		String solution		= arg.getParamText("solution"  ); // 제품 ID
		String ddns_key		= hq_id.substring(0, 10)+ ".POS";
		String stor_nm		= "";
		String manager_gb	= "";
		String user_gb		= "";
		SqlResultRow r;


		if (hq_id.length() != 10 ) {
			throw new ServiceException("사업장 코드가 올바르지 않습니다." );
		} else {
			if ("pos".equals(accessor)) { // 기타 기기에서 로그인 하는경우라면 패스워드 인증을 하지 않는다... 기본적으로 인증된 상태 이므로
				String token = HttpTokener.issuer(stor_id, login_id, arg);
				SqlResultRow row = service.getClientMes(arg);
				if (row == null) {
					throw new ServiceException("아이디가 올바르지 않습니다." );
				} else {
					row.remove("login_pwd" );
					row.remove("other_pw" );
					row.put("token_id"		, token);
					row.put("access_ip"		, arg.remoteAddress );
					row.put("stor_id"		, stor_id );
					row.put("stor_nm"		, stor_nm );
					row.put("manager_gb"	, manager_gb );
					row.put("user_gb"		, user_gb );
					row.put("user_idcd"		, login_id );

					row.put("user_idcd"		, login_id );
					row.put("table_name"	, "menu_mast" );
					row.put("crud_dvcd"		, "L" );
					row.put("idcd_valu"		, "" );
					row.put("line_seqn"		, 0 );
					row.put("assi_seqn"		, 0 );
					row.put("qury_text"		, "" );
					row.put("ipad_addr"		, arg.remoteAddress );

					model.put(HttpResponseMessage.RECORDS , row);
					service.setAccess(arg, row.getParamText("login_pk") , cert_idcd,  solution,row ); /* 로그인 성공 후 사용자의 IP 및 DT 기록 */
					return http.writer;
				}
			} else {
				SqlResultRow contract = license.contract(ddns_key, hq_id, cert_idcd, cert_code, solution);

				if ((contract != null && cert_code.equals(contract.getParamText("cert_code")) && "0".equals(contract.getParamText("expired")))
					|| "0".equals(contract.getParamText("cert_chck_yorn"))  // 인증코드를 사용하지 않는 회사는 Pass
					|| "developer".equals(login_id) ){ // 개발자ID이면 설치 코드 Check Pass
					if	("1000".equals(contract.getParamText("contract")) || "0".equals(contract.getParamText("cert_chck_yorn"))){
						SqlResultRow row = service.getClientMes(arg);
						if	(row == null) {
							throw new ServiceException("아이디가 올바르지 않습니다." );
						} else {
							String acceptIp = row.getParamText("login_ip");
							String remoteIp = "0:0:0:0:0:0:0:1".equals(arg.remoteAddress)?"127.0.0.1":arg.remoteAddress;
							if	(!("".equals(acceptIp) || IpUtil.betweenIpBandwidth(acceptIp.split("\\n|,"), remoteIp))){
								throw new ServiceException("승인되지 않은 IP 대역입니다." );
							} else {
								// 클라이언트에서 로그인 하기위해 전달된 암호
								String password  = arg.fixParamText("password").trim();        // 서버에서 보관중인 클라이언트 암호
								String login_pwd = row.getParamText("login_pwd");              row.remove("login_pwd" );
								String other_pw  = row.getParamText("other_pw").toLowerCase(); row.remove("other_pw" ); //String local_pw = row.getParamText("local_pw").toLowerCase(); row.remove("local_pw" );
								try {
									if ("pos".equals(accessor)) { // 기타 기기에서 로그인 하는경우라면 패스워드 인증을 하지 않는다... 기본적으로 인증된 상태 이므로
										System.out.println("++++  " + login_id);
										row.put("token_id"    , HttpTokener.issuer(hq_id, login_id, arg));
										model.put(HttpResponseMessage.RECORDS , row);
										row.put("user_idcd"		, login_id );
										row.put("table_name"	, "menu_mast" );
										row.put("crud_dvcd"		, "L" );
										row.put("idcd_valu"		, "" );
										row.put("line_seqn"		, 0 );
										row.put("assi_seqn"		, 0 );
										row.put("qury_text"		, "" );
										row.put("ipad_addr"		, arg.remoteAddress );
										service.setAccess(arg, row.getParamText("login_pk") , cert_idcd, solution ,row ); /* 로그인 성공 후 사용자의 IP 및 DT 기록 */
										return http.writer;
									} else {
										int chk = 0;
										if (row.getParamText("pswd_levl").equals("예")){
											if(password.length() < 8 ) {
												throw new ServiceException("패스워드는 영문자, 숫자, 특수문자를 조합하여 최소 8자리 이상 입력해주시기 바랍니다." );
											}
											if(password.matches("[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝]*")) {
												throw new ServiceException("패스워드는  영문자, 숫자, 특수문자로 조합하여 입력해야합니다. (특수문자 : ! @ # $ % ^ & * /)" );
											}
											if (password.equals(login_pwd)){
												row.put("token_id"		, HttpTokener.issuer(hq_id, login_id, arg)); //DB 접속은 token 정보를 이용한다..
												row.put("used_ipad"		, arg.remoteAddress );
												row.put("access_ip"		, arg.remoteAddress );
												row.put("stor_id"		, stor_id );
												row.put("stor_nm"		, stor_nm );
												row.put("manager_gb"	, manager_gb );
												row.put("user_gb"		, user_gb );

												row.put("user_idcd"		, login_id );
												row.put("table_name"	, "menu_mast" );
												row.put("crud_dvcd"		, "L" );
												row.put("idcd_valu"		, "" );
												row.put("line_seqn"		, 0 );
												row.put("assi_seqn"		, 0 );
												row.put("qury_text"		, "" );
												row.put("ipad_addr"		, arg.remoteAddress );

												model.put(HttpResponseMessage.RECORDS , row);
												service.setAccess(arg, row.getParamText("login_pk") , cert_idcd,  solution ,row);
												return http.writer;
											}else{
												int lgin_cont = 1; // sysm_memo 에 로그인횟수 증가.
												if(!row.getParamText("lgin_cont").equals("")){
													lgin_cont = Integer.parseInt(row.getParamText("lgin_cont"))+1;
												}
												if	(lgin_cont >=  5) {
													throw new ServiceException("비밀번호 입력 오류가 5회 발생되어 계정을 차단하였습니다. 관리자에게 문의하시기 바랍니다." );
												}else{
													service.setCount(arg, row.getParamText("login_pk"), lgin_cont);
													chk=1;
												}
											}
										}else {
											if (password.length() > 1 && password.equals(login_pwd)){
												row.put("token_id"		, HttpTokener.issuer(hq_id, login_id, arg)); //DB 접속은 token 정보를 이용한다..
												row.put("used_ipad"		, arg.remoteAddress );
												row.put("access_ip"		, arg.remoteAddress );
												row.put("stor_id"		, stor_id );
												row.put("stor_nm"		, stor_nm );
												row.put("manager_gb"	, manager_gb );
												row.put("user_gb"		, user_gb );

												row.put("user_idcd"		, login_id );
												row.put("table_name"	, "menu_mast" );
												row.put("crud_dvcd"		, "L" );
												row.put("idcd_valu"		, "" );
												row.put("line_seqn"		, 0 );
												row.put("assi_seqn"		, 0 );
												row.put("qury_text"		, "" );
												row.put("ipad_addr"		, arg.remoteAddress );

												model.put(HttpResponseMessage.RECORDS , row);
												service.setAccess(arg, row.getParamText("login_pk") , cert_idcd,  solution ,row);
												return http.writer;
											}else{
												chk = 1;
											}
										}
										if(chk==1){
											throw new ServiceException("비밀번호가 올바르지 않습니다." );
										}
										return null;
									}
								} catch (ServiceException ex ) { throw ex ;
								}
							}
						}
					} else {
						throw new ServiceException("잘못된 Log In 입니다." );
					}
				} else {
					throw new ServiceException("유효하지 않은 설치 코드 입니다." );
				}
			}
		}
	}


	@RequestMapping(value="/auth/angel/identify.do")
	public String getAngelClient(@ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {

		HttpRequestArgument arg = http.argument;
		String login_id  = arg.fixParamText("login_id");
		String fcm_token = arg.getParamText("fcm_token");
		SqlResultRow row = service.getAngelClient(arg);
		if (row == null) {
			throw new ServiceException("아이디가 올바르지 않습니다." );
		} else {
			String acceptIp   = row.getParamText("login_ip");
			String stor_id    = row.getParamText("stor_id");

			String hq_id      = "N1000ANGEL";
			String stor_nm    = row.getParamText("stor_nm");
			String manager_gb = row.getParamText("manager_gb");
			String user_gb    = row.getParamText("user_gb");
			String remoteIp   = "0:0:0:0:0:0:0:1".equals(arg.remoteAddress)?"127.0.0.1":arg.remoteAddress;
			if (!("".equals(acceptIp) || IpUtil.betweenIpBandwidth(acceptIp.split("\\n|,"), remoteIp))){
				throw new ServiceException("승인되지 않은 IP 대역입니다." );
			} else {
				// 클라이언트에서 로그인 하기위해 전달된 암호
				String password = arg.fixParamText("password").trim().toLowerCase();
				// 서버에서 보관중인 클라이언트 암호
				String login_pwd = row.getParamText("login_pwd").toLowerCase();
				row.remove("login_pwd" );

				try {
					if (password.length() > 1 && password.equals(login_pwd)){
						row.put("token_id"		, HttpTokener.issuer(hq_id, login_id, arg));
						row.put("access_ip"		, arg.remoteAddress );
						row.put("stor_id"		, stor_id );
						row.put("stor_nm"		, stor_nm );
						row.put("manager_gb"	, manager_gb );
						row.put("user_gb"		, user_gb );
						model.put(HttpResponseMessage.RECORDS , row);
						/* 로그인 성공 후 사용자의 IP 및 DT 기록 */
						if (fcm_token.length() > 0 ) {
							service.setToken(arg, login_id, fcm_token);
						}
						return http.writer;
					}
					else {
//						throw new ServiceException("비밀번호가 올바르지 않습니다."+ login_pwd + password);
						throw new ServiceException("비밀번호가 올바르지 않습니다.");
					}

				} catch (ServiceException ex ) { throw ex ;
				} catch (Exception ex )        { throw new ServiceException("비밀번호 형식이 올바르지 않습니다." );
				}
			}
		}
	}



	@RequestMapping(value="/auth/licenses.do")
	public String licenses(@ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {

		HttpRequestArgument arg = http.argument;
		String hqof_idcd	= "N1000"+arg.fixParamText("stor_id").substring(0,5);
		String prdt_key		= arg.fixParamText("mst_itm_id" );
		String cert_idcd	= arg.fixParamText("setup_id");
		String cert_pswd	= arg.fixParamText("setup_pw");
		String ddns_key		= hqof_idcd+ ".POS";

		if (Regexp.email(cert_idcd)) {
			String google = GoogleLogin.getAuthToken( hqof_idcd , cert_pswd, "cl", "asp.com");
			if (google != null) {
				SqlResultRow row = license.sysuser(hqof_idcd, cert_idcd);
				if (row != null) {
					String uuid_key = TimeBasedUUID.generateId().toString();
					row = license.contract(ddns_key, hqof_idcd, cert_idcd, uuid_key, prdt_key );
					if (row != null) {
						SqlResultRow key = new SqlResultRow();
						key.setParameter("hqof_idcd"	, hqof_idcd );
						key.setParameter("cert_idcd"	, cert_idcd );
						key.setParameter("cert_code"	, uuid_key );
						model.put(HttpResponseMessage.RECORDS , key );
						return http.writer;
					} else {
						throw new ServiceException("사업장 ID가 올바르지 않습니다.");
					}
				} else {
					throw new ServiceException("승인 되지 않은 설치 계정 입니다.");
				}
			} else {
				throw new ServiceException("메일 계정 또는 비빌 번호가 올바르지 않습니다.");
			}
		} else {
			SqlResultRow row = license.identify(ddns_key, hqof_idcd, cert_idcd, prdt_key );
			if (row != null) {
				if (row.getParamText("cert_idcd").equals( cert_idcd )  ){ /* ID가 동일한 경우 */
					if (row.getParamText("cert_pswd").equals( cert_pswd ) ){ /* PW가 동일한 경우 */

						String uuid_key = TimeBasedUUID.generateId().toString();  //String uuid_key = UUID.randomUUID().toString();
						license.vitalize(ddns_key, hqof_idcd, cert_idcd, arg.remoteAddress, uuid_key);
						SqlResultRow key = new SqlResultRow();
						key.setParameter("hqof_idcd"	, hqof_idcd);
						key.setParameter("cert_idcd"	, cert_idcd);
						key.setParameter("cert_code"	, uuid_key);
						model.put(HttpResponseMessage.RECORDS , key );
						return http.writer;
					}else {
						throw new ServiceException("비밀번호가 일치하지 않습니다." );
					}
				} else {
					throw new ServiceException("설치 ID가 일치하지 않습니다." );
				}
			} else {
				throw new ServiceException("식별되지 않은 설치 ID 입니다." );
			}
		}
	}

	/**
	 * 로그인 사용자가 사용할 화면을 넘겨준다. (tree menu)
	 */
	@RequestMapping(value="/auth/screen.do")
	public String getScreen(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getScreen(arg);

		TreeHash tree = new TreeHash( "1".equals( arg.getParamText("admin_yn")) ? "0" : "14821" );

		for(SqlResultRow row:map){
			if (row.getParamText("menu_id").equals(row.getParamText("active_id")) ){
				row.setParameter("permit_no",
				    Double.parseDouble(row.getParamText("insert_no"))
				  + Double.parseDouble(row.getParamText("modify_no"))
				  + Double.parseDouble(row.getParamText("delete_no"))
				  + Double.parseDouble(row.getParamText("report_no"))
				  + Double.parseDouble(row.getParamText("export_no")));

				TreeHash item = new TreeHash((String)row.getParameter("menu_id" ));
				item.parent   = row.getParamText("prnt_id" );
				item.text     = row.getParamText("menu_nm"   );
				item.leaf     = row.getParamText("last_modl_yn" ).equals("1") ;
				item.expanded = row.getParamText("tree_expn_yn" ).equals("1") ;
				item.resource = row;
				tree.add(item);
			}
		}
		tree.clean();
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;
	}

	/**
	 * 마이메뉴 수정
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/auth/editMyMenu.do")
	public String editMyMenu(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		service.editMyMenu(arg);
		return http.writer;
	}

	/**
	 * 사용자 언어 파일을 넘겨준다.
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/auth/language.do")
	public String getLanguage (@ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {
		SqlResultMap map = service.getLanguage(http.argument);
		for(SqlResultRow row:map){
			model.put(row.getParamText("word_cd"),row.getParameter("word_nm"));
		}
		return http.writer ;
	}


	/**
	 * 리소스를 넘겨 준다.
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/auth/resource.do")
	public String getResource( HttpMessage http, Map<String, Object> model) throws Exception {
		SqlResultMap map = service.getResource(http.argument);
		for(SqlResultRow row:map){
			model.put(row.getParamText("wrd_cd"),row.getParameter("lookup_val"));
		}
		return http.writer;
	}


	/**
	 */
	@RequestMapping(value="/auth/provider.do")
	public String getProvider( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getProvider(http.argument, page, rows, sort));
	return http.writer;
	}
	/**
	 */
	@RequestMapping(value="/auth/systemoption.do")
	public String getSystemOption( HttpMessage http, Map<String, Object> model) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getSystemOption(http.argument));
	return http.writer;
	}
	/**
	 */
	@RequestMapping(value="/auth/userauth.do")
	public String getUserAuth( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getUserAuth(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/auth/connectXml.do")
	public String setConnectXml( HttpMessage http, Map<String, Object> model) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.setConnectXml(http.argument));
	return http.writer;
	}
}
