package com.sky.system.pos;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class PaygateReport extends DefaultControlHandler{

	@Autowired
	private PaygateReportService service;


	// 조회
	@RequestMapping(value="/pos/paygatereport/get/master.do"  )
	public String getSearchMaster(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false,defaultValue = "") String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearchMaster(http.argument, page, rows, sort));
		return http.writer;
	}



	// 조회
	@RequestMapping(value="/pos/paygatereport/get/month.do"  )
	public String getSearchMonth(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false,defaultValue = "") String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearchMonth(http.argument, page, rows, sort));
		return http.writer;
	}



	// 조회
	@RequestMapping(value="/pos/paygatereport/get/day.do"  )
	public String getSearchDay(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false,defaultValue = "") String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearchDay(http.argument, page, rows, sort));
		return http.writer;
	}



	// 조회
	@RequestMapping(value="/pos/paygatereport/get/card.do"  )
	public String getSearchCard(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false,defaultValue = "") String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearchCard(http.argument, page, rows, sort));
		return http.writer;
	}


}
