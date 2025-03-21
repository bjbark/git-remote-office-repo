package com.sky.system.custom.dhtec.sale.etc.smplmast;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("dhtec.SmplMast")
@Controller
public class SmplMast {

	@Autowired
	private SmplMastService service;

	// 조회
	@RequestMapping(value="/custom/dhtec/sale/etc/smplmast/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/sale/etc/smplmast/get/invc.do"  )
	public String getInvc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvc(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/sale/etc/smplmast/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/dhtec/sale/etc/smplmast/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/dhtec/sale/etc/smplmast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}
}
