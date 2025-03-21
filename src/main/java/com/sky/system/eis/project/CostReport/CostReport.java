package com.sky.system.eis.project.CostReport;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CostReport extends DefaultControlHandler{

	@Autowired
	private CostReportService service;
	// master
	@RequestMapping(value="eis/project/costreport/get/search1.do"  )
	public String getSearch1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument));
		return http.writer;
	}
	@RequestMapping(value="eis/project/costreport/get/search2.do"  )
	public String getSearch2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument));
		return http.writer;
	}
	@RequestMapping(value="eis/project/costreport/get/search3.do"  )
	public String getSearch3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="eis/project/costreport/get/getcost.do"  )
	public String getCost(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCost(http.argument, sort));
		return http.writer;
	}
	@RequestMapping(value="eis/project/costreport/set/savePercent.do"  )
	public String setSavePercent(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setSavePercent(http.argument));
		return http.writer;
	}
}

