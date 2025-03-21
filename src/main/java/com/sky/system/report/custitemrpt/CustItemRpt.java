package com.sky.system.report.custitemrpt;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CustItemRpt extends DefaultControlHandler {

	@Autowired
	private CustItemRptService service;

	/**
	 * 현황
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custitemrpt/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
			
			
			
//			HttpMessage http, Map<String, Object> model) throws Exception {

//		SqlResultMap map = service.getSearch(http.argument, page, rows);
//		model.put(HttpResponseMessage.RECORDS, map).addParam("maxsize", map.maxsize);
//		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows) );
	}
	/**
	 * 엑셀출력
	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custitemrpt/export/search.do")
//	public String getExportSearch(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}

	/**
	 * 시간대별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custitemrpt/get/time.do")
	public String getTime( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getTime(http.argument, page, rows, sort));
			return http.writer;
//			HttpMessage http, Map<String, Object> model) throws Exception {

//		SqlResultMap map = service.getTime(http.argument, page, rows);
//		model.put(HttpResponseMessage.RECORDS, map).addParam("maxsize", map.maxsize);
//		model.put(HttpResponseMessage.RECORDS, service.getTime(http.argument, page, rows) );
	}
	/**
	 * 엑셀출력
	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custitemrpt/export/time.do")
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
	@RequestMapping(value="/report/custitemrpt/get/week.do")
	public String getWeek(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getWeek(http.argument, page, rows, sort));
			return http.writer;
//			HttpMessage http, Map<String, Object> model) throws Exception {

//		SqlResultMap map = service.getWeek(http.argument, page, rows);
//		model.put(HttpResponseMessage.RECORDS, map).addParam("maxsize", map.maxsize);
//		model.put(HttpResponseMessage.RECORDS, service.getWeek(http.argument, page, rows) );
	}
	/**
	 * 엑셀출력
	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custitemrpt/export/week.do")
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
	@RequestMapping(value="/report/custitemrpt/get/day.do")
	public String getDay( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getDay(http.argument, page, rows, sort));
			return http.writer;
//			HttpMessage http, Map<String, Object> model) throws Exception {

//		SqlResultMap map = service.getDay(http.argument, page, rows);
//		model.put(HttpResponseMessage.RECORDS, map).addParam("maxsize", map.maxsize);
//		model.put(HttpResponseMessage.RECORDS,  service.getDay(http.argument, page, rows));
	}
	/**
	 * 엑셀출력
	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custitemrpt/export/day.do")
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
	@RequestMapping(value="/report/custitemrpt/get/month.do")
	public String getMonth( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getMonth(http.argument, page, rows, sort));
			return http.writer;
//			HttpMessage http, Map<String, Object> model) throws Exception {

//		SqlResultMap map = service.getMonth(http.argument, page, rows);
//		model.put(HttpResponseMessage.RECORDS, map).addParam("maxsize", map.maxsize);
//		model.put(HttpResponseMessage.RECORDS, service.getMonth(http.argument, page, rows));
	}
	/**
	 * 엑셀출력
	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/report/custitemrpt/export/month.do")
//	public String getExportMonth(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getMonth(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}
	
}
