package com.sky.system.zreport;


import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.sky.http.dispatch.control.DefaultControlHandler;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class Zcatalog_item_manage extends DefaultControlHandler {

	@Autowired
	private Zcatalog_item_manageService service;


	//등록상품저장
	@RequestMapping(value="/zreport/get/catalog_item_manage1.do")
	public String getcatalog_item_manageLister1(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getcatalog_item_manageLister1(http.argument, page, rows));
		return http.writer;
	}

	//카다로그 등록
	@RequestMapping(value="/zreport/get/catalog_item_manage2.do")
	public String getcatalog_item_manageLister2(
			HttpMessage http, HttpServletResponse response,Map<String, Object> model
			) throws Exception {
		//http.response.addParam("records", service.getcatalog_item_manageLister2(http.argument)).toWrite(response);
		model.put(HttpResponseMessage.RECORDS, service.getcatalog_item_manageLister2(http.argument));
		return http.writer;
	}



	//백업상품조회
	@RequestMapping(value="/zreport/get/catalog_item_manage3.do")
	public String getcatalog_item_manageLister3(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getcatalog_item_manageLister3(http.argument, page, rows));
		return http.writer;
	}











}