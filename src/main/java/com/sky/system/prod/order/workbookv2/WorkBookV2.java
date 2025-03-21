package com.sky.system.prod.order.workbookv2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class WorkBookV2 extends DefaultControlHandler{

	@Autowired
	private WorkBookV2Service service;
	// 조회
	@RequestMapping(value="prod/order/workbookv2/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="prod/order/workbookv2/get/detail1.do"  )
	public String getDetail1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="prod/order/workbookv2/get/detail2.do"  )
	public String getDetail2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="prod/order/workbookv2/set/modify.do"  )
	public String setModify(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setModify(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="prod/order/workbookv2/set/remkmodify.do"  )
	public String setRemkModify(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRemkModify(http.argument ));
		return http.writer;
	}
}

