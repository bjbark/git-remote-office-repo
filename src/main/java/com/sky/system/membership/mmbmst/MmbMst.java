package com.sky.system.membership.mmbmst;

import java.util.Map;

import net.sky.core.common.annotation.ReleaseParam;
import net.sky.core.common.annotation.ReleaseToken;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.http.HttpTokener;

import javax.servlet.http.HttpServletRequest;



@Controller
public class MmbMst extends DefaultControlHandler {

	@Autowired
	private MmbMstService service;

	// 조회
	@RequestMapping(value="/membership/mmbmst/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="/membership/mmbmst/get/test.do"  )
	public String getTest(@ReleaseToken @ReleaseParam  HttpServletRequest request, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
//		model.put("result", service.getTest(page, rows, sort ));
		    String tt = request.getParameter("find_name");
//			return http.writer;
			return tt;

		}




//	// 조회
//	@RequestMapping(value="/membership/mmbmst/get/search.do"  )
//	public String getSearch(@ReleaseToken  HttpMessage http, Map<String, Object> model,
//		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
//		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
//		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
//		HttpRequestArgument arg = http.argument;
//		System.out.println("========================================================s");
//		System.out.println("order-------------------"+arg.toString() );
//		System.out.println("========================================================s");
//
//		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
//		return http.writer;
//	}



	// 팝업
	@RequestMapping(value="/membership/mmbmst/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/membership/mmbmst/set/record.do"  )
	public String setRecord( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	/**
	 * 사용자 인증을 받는다.
	 */

	@RequestMapping(value="/membership/mmbmst/identify.do")
	public String getClient(@ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {

		HttpRequestArgument arg = http.argument;

		String login_id = arg.fixParamText("mmb_id");
		SqlResultRow row = service.getClient(arg);
		if (row == null) {
			throw new ServiceException("아이디가 올바르지 않습니다." );
		} else {
			String hq_id      = arg.fixParamText("hq_id");
				// 클라이언트에서 로그인 하기위해 전달된 암호
				String password = arg.fixParamText("passwd").trim().toLowerCase();
				// 서버에서 보관중인 클라이언트 암호
				String login_pwd = row.getParamText("passwd").toLowerCase(); row.remove("passwd" );
//				String other_pw = row.getParamText("other_pw").toLowerCase(); row.remove("other_pw" );
				try {
						if (password.length() > 1 && password.equals(login_pwd)){
//							if (password.length() > 3 && ((other_pw.length() > 3 && password.equals(other_pw)) || (login_pwd.length() > 3 && (BCrypt.checkpw(password, login_pwd))))){
						row.put("access_ip"   , arg.remoteAddress );
						row.put("cur_pnt"     , row.getParamText("cur_pnt") );
						row.put("row_sts"     , row.getParamText("row_sts") );
						row.put("token_id"    , HttpTokener.issuer(hq_id, login_id, arg));
						model.put(HttpResponseMessage.RECORDS , row);
						/* 로그인 성공 후 사용자의 IP 및 DT 기록 */
						service.setAccess(arg, row.getParamText("mmb_id"));
						return http.writer;
					} else {
//						throw new ServiceException("비밀번호가 올바르지 않습니다."+ login_pwd + password);
						throw new ServiceException("비밀번호가 올바르지 않습니다.");
					}
				} catch (ServiceException ex ) { throw ex ;
				} catch (Exception ex )        { throw new ServiceException("비밀번호 형식이 올바르지 않습니다." );
				}
		}
	}


}
