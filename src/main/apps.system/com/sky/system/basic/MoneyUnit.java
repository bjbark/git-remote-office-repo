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
public class MoneyUnit extends DefaultControlHandler{

	 
	@Autowired
	private MoneyUnitService service;	
	
	// 조회 
	@RequestMapping(value="/basic/moneyunit/get/search.do"  ) 
	public String getSearch(
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,	
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ,
		HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer; 
	}


	// 팝업 - 화폐 단위 관리
	@RequestMapping(value="/basic/moneyunit/get/lookup.do") 
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer; 
	}
		
/*
	// 저장 
	@RequestMapping(value="/basic/moneyunit/set/record.do"  ) 
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument) );
		return http.writer; 
	}
	
*/
	
}
