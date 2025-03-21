package com.sky.system.counsel.callcustinfo;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class CallCustInfo extends DefaultControlHandler {

	@Autowired
	private CallCustInfoService service;


	// 팝업조회
	@RequestMapping(value="/callinfo/custstore/get/lookup/memb.do"  )
	public String getLookupMemb(HttpMessage http, Map<String, Object> model ,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookupMemb(http.argument, page, rows ));
		return http.writer;
	}

	// 팝업조회 - 고객 상세정보
	@RequestMapping(value="/callinfo/custstore/get/record.do"  )
	public String getRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRecord(http.argument));
		return http.writer;
	}


}
