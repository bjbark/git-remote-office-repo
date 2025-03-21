package com.sky.system.basic;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class SalesAccount extends DefaultControlHandler{

	@Autowired
	private SalesAccountService service;
	
	// 조회 
	@RequestMapping(value="/basic/salesaccount/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model, 
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page ,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	
	// 저장 
	@RequestMapping(value="/basic/salesaccount/set/master.do"  ) 
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}

	
	@RequestMapping(value="/basic/salesaccount/get/sequence.do"  ) 
	public String getSequence(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSequence(http.argument));
		return http.writer;
		
		
	}
	

}

