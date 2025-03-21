package com.sky.system.custom.iypkg.etc.trsfwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class TrsfWork extends DefaultControlHandler{

	@Autowired
	private TrsfWorkService service;

	//조회
	@RequestMapping(value="/custom/iypkg/etc/trsfwork/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	//조회2
	@RequestMapping(value="/custom/iypkg/etc/trsfwork/get/search1.do")
	public String getSearch1( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort));
	return http.writer;
	}

	//출고 조회
	@RequestMapping(value="/custom/iypkg/etc/trsfwork/get/search2.do")
	public String getSearch2( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
	return http.writer;
	}

	//출고 디테일 조회
	@RequestMapping(value="/custom/iypkg/etc/trsfwork/get/search3.do")
	public String getSearch3( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort));
	return http.writer;
	}

	//저장
	@RequestMapping(value="/custom/iypkg/etc/trsfwork/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

}
