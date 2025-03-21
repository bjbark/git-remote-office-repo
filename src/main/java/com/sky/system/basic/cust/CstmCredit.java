package com.sky.system.basic.cust;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CstmCredit extends DefaultControlHandler{

	@Autowired
	private CstmCreditService service;


	//거래처 신용등급 조회
	@RequestMapping(value="/basic/cust/cstmcredit/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}

	//거래처 신용등급 초기화
	@RequestMapping(value="/basic/cust/cstmcredit/set/setTrnsStopInit.do")
	public String setTrnsStopInit(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTrnsStopInit(http.argument));
		return http.writer;
	}

	//거래처 신용등급 거래정지
	@RequestMapping(value="/basic/cust/cstmcredit/set/setTrnsStopAction.do")
	public String setTrnsStopAction(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTrnsStopAction(http.argument));
		return http.writer;
	}
}