package com.sky.system.report;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CustClassOrderRpt extends DefaultControlHandler {

	@Autowired
	private CustClassOrderRptService service;

	/**
	 * 현황
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclassorderrpt/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model, 
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;

//		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows ));
//		return http.writer;
		
	}
	

	/**
	 * 시간대별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclassorderrpt/get/time.do")
	public String getTime( HttpMessage http, Map<String, Object> model, 
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTime(http.argument, page, rows, sort));
		return http.writer;

//		model.put(HttpResponseMessage.RECORDS, service.getTime(http.argument, page, rows ));
//		return http.writer;
	}	
//
//	/**
//	 * 엑셀출력
//	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custclassorderrpt/export/time.do")
//	public String getExportTime(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getTime(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}

	/**
	 * 요일별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclassorderrpt/get/week.do")
	public String getWeek( HttpMessage http, Map<String, Object> model, 
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWeek(http.argument, page, rows, sort));
		return http.writer;

//		model.put(HttpResponseMessage.RECORDS, service.getWeek(http.argument, page, rows ));
//		return http.writer;
	}	
	

//	/**
//	 * 엑셀출력
//	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custclassorderrpt/export/week.do")
//	public String getExportWeek(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getWeek(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}

	/**
	 * 일자별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclassorderrpt/get/day.do")
	public String getDay( HttpMessage http, Map<String, Object> model, 
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDay(http.argument, page, rows, sort));
		return http.writer;

//		model.put(HttpResponseMessage.RECORDS, service.getDay(http.argument, page, rows ));
//		return http.writer;
	}		

//	/**
//	 * 엑셀출력
//	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custclassorderrpt/export/day.do")
//	public String getExportDay(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getDay(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}

	/**
	 * 월별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclassorderrpt/get/month.do")
	public String getMonth( HttpMessage http, Map<String, Object> model, 
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMonth(http.argument, page, rows, sort));
		return http.writer;

//		model.put(HttpResponseMessage.RECORDS, service.getMonth(http.argument, page, rows ));
//		return http.writer;
	}		

//	/**
//	 * 엑셀출력
//	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custclassorderrpt/export/month.do")
//	public String getExportMonth(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getMonth(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}
	
}
