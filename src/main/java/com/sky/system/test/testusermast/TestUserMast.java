package com.sky.system.test.testusermast;


import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class TestUserMast extends DefaultControlHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private TestUserMastService service;
	// 조회
	@RequestMapping(value="/test/testusermast/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10" ) int rows,
		@RequestParam(value="sort" , required=false,defaultValue = "" ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/test/testusermast/get/search2.do"  )
	public String getSearch2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10" ) int rows,
			@RequestParam(value="sort" , required=false,defaultValue = "" ) String sort ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/test/testusermast/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows ));
		return http.writer;
	}

	//item1
	@RequestMapping(value="test/testusermast/get/item1.do"  )
	public String getItem1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getItem1(http.argument, page, rows, sort));
		return http.writer;
	}

	//item2
	@RequestMapping(value="test/testusermast/get/item2.do"  )
	public String getItem2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getItem2(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/test/testusermast/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// item 저장
	@RequestMapping(value="test/testusermast/set/item1.do"  )
	public String setItem1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem1(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/test/testusermast/set/login.do"  )
	public String setLogin(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setLogin(http.argument));
		return http.writer;
	}
	// 로그인중복확인 후 등록
	@RequestMapping(value="/test/testusermast/login/check.do"  )
	public String setLoginCheck(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.loginCheck(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/test/testusermast/set/passwd.do"  )
	public String setPasswd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPasswd(http.argument));
		return http.writer;
	}

	// 패스워드 변경
	@RequestMapping(value="/test/testusermast/set/changepasswd.do"  )
	public String setChangePasswd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setChangePasswd(http.argument));
		return http.writer;
	}

	// test1
	@RequestMapping(value="/test/testusermast/set/test1.do"  )
	public String setTest1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTest1(http.argument));
		return http.writer;
	}
	// test1
	@RequestMapping(value="/test/testusermast/set/test2.do"  )
	public String setTest2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTest2(http.argument));
		return http.writer;
	}

}

