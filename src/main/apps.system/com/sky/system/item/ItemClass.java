package com.sky.system.item;

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
public class ItemClass extends DefaultControlHandler{

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private ItemClassService service;	
	
	// 상품분류정보 조회 
	@RequestMapping(value="/item/itemclass/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer; 		
	}

	// 상품분류현황 조회 
	@RequestMapping(value="/item/itemclass/get/search/excel.do"  ) 
	public String getSearchExcel(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearchExcel(http.argument, page, rows, sort));
		return http.writer; 		
	}
	
	// 룩업 
	@RequestMapping(value="/item/itemclass/get/lookup.do"  ) 
	public String getLookup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument));
		return http.writer; 		
	}
	
	// 저장 
	@RequestMapping(value="/item/itemclass/set/record.do"  ) 
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer; 		
	}

//	/**
//	 * 분류 코드의 일련번호를 생성하여 리턴해준다.
//	 * @param http
//	 * @param response
//	 * @throws Exception
//	 */
//	@RequestMapping(value="/item/itemclass/get/serial.do"  ) 
//	public String getSerial(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getSerial(http.argument));
//		return http.writer; 		
//		//model.put(HttpResponseMessage.RECORDS, service.getSerial(http.argument) );
//	}
	
}
