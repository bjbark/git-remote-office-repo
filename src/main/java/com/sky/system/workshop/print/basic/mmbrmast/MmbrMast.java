package com.sky.system.workshop.print.basic.mmbrmast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class MmbrMast extends DefaultControlHandler{

	@Autowired
	private MmbrMastService service;
	// 조회
	@RequestMapping(value="/workshop/print/basic/mmbrmast/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/workshop/print/basic/mmbrmast/get/search2.do"  )
	public String getSearch2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/workshop/print/basic/mmbrmast/get/search3.do"  )
	public String getSearch3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/workshop/print/basic/mmbrmast/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows,sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/workshop/print/basic/mmbrmast/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 가입승인
	@RequestMapping(value="/workshop/print/basic/mmbrmast/set/record2.do"  )
	public String setRecord2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord2(http.argument));
		return http.writer;
	}

	// 강제탈퇴
	@RequestMapping(value="/workshop/print/basic/mmbrmast/set/record3.do"  )
	public String setRecord3(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord3(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/workshop/print/basic/mmbrmast/set/address.do"  )
	public String setAddress(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAddress(http.argument));
		return http.writer;
	}


}
