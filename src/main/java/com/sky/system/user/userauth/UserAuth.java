package com.sky.system.user.userauth;


import java.util.LinkedHashMap;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.TreeHash;


@Controller
public class UserAuth extends DefaultControlHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private UserAuthService service;

	// 조회
	@RequestMapping(value="/user/userauth/get/search.do"  )
	public String getSearch(
		HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false,defaultValue = "" ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows,sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/user/userauth/get/detail.do"  )
	public String getDetail( HttpMessage http, LinkedHashMap<String, Object> model ) throws Exception {

		SqlResultMap map = service.getDetail(http.argument);
		TreeHash tree = new TreeHash( "1".equals( http.argument.getParamText("admin_yn")) ? "0" : "14821"  );

		for(SqlResultRow row:map){
			if ("0".equals(row.getParamText("hidden_yn"))) {
				TreeHash item = new TreeHash((String)row.getParameter("menu_id" ));
				item.parent   = (String)row.getParameter("prnt_id" );
				item.text     = (String)row.getParameter("menu_nm"   );
				item.leaf     =((String)row.getParameter("last_modl_yn" )).equals("1") ;
				item.expanded = true; // ((String)row.getParameter("tree_expn_yn" )).equals("1") ;
				item.resource = row;
				tree.add(item);
			}
		}
		tree.clean();
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;

	}

	// 저장
	@RequestMapping(value="/user/userauth/set/detail.do"  )
	public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}

	// 사용자 조회
	@RequestMapping(value="/user/userauth/get/dialog.do"  )
	public String getDialog(
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDialog(http.argument, page, rows ));
		return HttpMessage.RESPONSE_WITER;
	}


	// 권한 복사
	@RequestMapping(value="/user/userauth/set/authcopy.do"  )
	public String setAuthCopy(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setAuthCopy(http.argument));
		return HttpMessage.RESPONSE_WITER;
	}


	// 팝업 조회
		@RequestMapping(value="/user/userauth/get/popupsearch.do"  )
		public String getPopupSearch(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="200") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getPopupSearch(http.argument, page, rows));
			return http.writer;
		}



}
