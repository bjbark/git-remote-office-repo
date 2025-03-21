package com.sky.system.cust.oembmast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class OembMast extends DefaultControlHandler{

	@Autowired
	private OembMastService service;

	//OEM 조회
	@RequestMapping(value="/system/cust/oembmast/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}

	//OEM 거래처 조회
	@RequestMapping(value="/system/cust/oembmast/get/oembcstm.do")
	public String getOembCstm( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOembCstm(http.argument, page, rows, sort));
		return http.writer;
	}

	//거래처 조회
	@RequestMapping(value="/system/cust/oembmast/get/cstmmast.do")
	public String getCstmMast( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstmMast(http.argument, page, rows, sort));
		return http.writer;
	}

	//OEM 거래처 추가
	@RequestMapping(value="/system/cust/oembmast/set/oembcstm.do"  )
	public String setOembCstm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOembCstm(http.argument));
		return http.writer;
	}

	//OEM 추가
	@RequestMapping(value="/system/cust/oembmast/set/oembmast.do"  )
	public String setOembMast(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOembMast(http.argument));
		return http.writer;
	}
}
