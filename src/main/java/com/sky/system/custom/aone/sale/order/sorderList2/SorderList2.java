package com.sky.system.custom.aone.sale.order.sorderList2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
@Service("aone.sale.order.SorderList2")
public class SorderList2 extends DefaultControlHandler{

	@Autowired
	private SorderList2Service service;


	@RequestMapping(value="/custom/aone/sale/order/sorderlist2/get/search0.do")
	public String getSearch0( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch0(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/aone/sale/order/sorderlist2/get/search1.do")
	public String getSearch1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/aone/sale/order/sorderlist2/get/search2.do")
	public String getSearch2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/aone/sale/order/sorderlist2/get/search3.do")
	public String getSearch3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/aone/sale/order/sorderlist2/get/detail.do")
	public String getDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort));
		return http.writer;
	}
}
