package com.sky.system.custom.sjflv.cust.userreqt;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

import net.sky.http.dispatch.control.DefaultControlHandler;

@Controller("sjflv.UserReqt")
public class UserReqt extends DefaultControlHandler {
	
	@Autowired
	private UserReqtService service;

	// 조회
	@RequestMapping(value="/custom/sjflv/cust/userreqt/get/userreqt.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/cust/userreqt/set/userreqt.do")
	public String setBook(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setUserReqt(http.argument));
		return http.writer;
	}
}
