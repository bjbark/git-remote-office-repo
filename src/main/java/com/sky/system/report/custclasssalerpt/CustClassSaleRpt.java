package com.sky.system.report.custclasssalerpt;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CustClassSaleRpt extends DefaultControlHandler {

	@Autowired
	private CustClassSaleRptService service;

	/**
	 * 현황
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclasssalerpt/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
			return http.writer;
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
	@RequestMapping(value="/report/custclasssalerpt/get/time.do")
	public String getTime(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getTime(http.argument, page, rows, sort ));
			return http.writer;
	}
	/**
	 * 요일별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclasssalerpt/get/week.do")
	public String getWeek(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getWeek(http.argument, page, rows, sort ));
			return http.writer;

	}

	/**
	 * 일자별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclasssalerpt/get/day.do")
	public String getDay(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getDay(http.argument, page, rows, sort ));
			return http.writer;

	}

	/**
	 * 월별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/custclasssalerpt/get/month.do")
	public String getMonth(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getMonth(http.argument, page, rows, sort ));
			return http.writer;

	}
	
}
