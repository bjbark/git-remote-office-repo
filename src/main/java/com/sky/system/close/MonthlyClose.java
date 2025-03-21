package com.sky.system.close;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class MonthlyClose extends DefaultControlHandler{

	@Autowired
	private MonthlyCloseService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/close/monthlyclose/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}
	
	
	
	@RequestMapping(value="/close/monthlyclose/set/closer.do")
	public String setCloser(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setCloser(http.argument));
		return http.writer;
	}

	
//	/**
//	 * detail 수정
//	 * 
//	 * @param http
//	 * @param response
//	 * @throws Exception
//	 */
//	@RequestMapping(value="/close/monthlyclose/set/record.do")
//	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
//		
//		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
//		return http.writer;
//	}
//	
//
//	/**
//	 * detail 조회
//	 * 
//	 * @param http
//	 * @param response
//	 * @throws Exception
//	 */
//	@RequestMapping(value="/close/monthlyclose/get/detail.do")
//	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
//		
//		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
//		return http.writer;
//	}

}
