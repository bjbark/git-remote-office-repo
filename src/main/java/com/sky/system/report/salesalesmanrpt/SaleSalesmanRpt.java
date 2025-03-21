package com.sky.system.report.salesalesmanrpt;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class SaleSalesmanRpt extends DefaultControlHandler{

	@Autowired
	private SaleSalesmanRptService service;
	
	// 조회 - 사업장별
	@RequestMapping(value="/report/salesalesmanrpt/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	// 조회 - 시간대별
	@RequestMapping(value="/report/salesalesmanrpt/get/search/time.do"  )
	public String getSearchTime( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchTime(http.argument, page, rows, sort));
			return http.writer;
	}

	
	// 조회 - 요일별
	@RequestMapping(value="/report/salesalesmanrpt/get/search/week.do"  )
	public String getSearchWeek( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchWeek(http.argument, page, rows, sort));
			return http.writer;
	}
	
	// 조회 - 요일별
	@RequestMapping(value="/report/salesalesmanrpt/get/search/day.do"  )
	public String getSearchDay( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchDay(http.argument, page, rows, sort));
			return http.writer;
	}

	// 조회 - 월별
	@RequestMapping(value="/report/salesalesmanrpt/get/search/month.do"  )
	public String getSearchMonth( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchMonth(http.argument, page, rows, sort));
			return http.writer;
	}


}