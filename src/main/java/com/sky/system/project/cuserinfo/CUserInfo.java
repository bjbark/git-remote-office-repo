package com.sky.system.project.cuserinfo;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CUserInfo  extends DefaultControlHandler{


	@Autowired
	CUserInfoService service;

	
	// 조회
	@RequestMapping(value="/project/cuserinfo/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10" ) int rows,
		@RequestParam(value="sort" , required=false,defaultValue = "" ) String sort ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	
	
	// 팝업 
	@RequestMapping(value="/project/cuserinfo/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows ));
		return http.writer;
	}
	
	// 저장
	@RequestMapping(value="/project/cuserinfo/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/project/cuserinfo/set/login.do"  )
	public String setLogin(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setLogin(http.argument));
		return http.writer;
	}	
	
	@RequestMapping(value="/project/cuserinfo/set/passwd.do"  )
	public String setPasswd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPasswd(http.argument));
		return http.writer;
	}

	// 패스원드 변경
	@RequestMapping(value="/project/cuserinfo/set/changepasswd.do"  )
	public String setChangePasswd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setChangePasswd(http.argument));
		return http.writer;
	}

}
