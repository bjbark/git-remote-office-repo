package com.sky.system.recv;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class RecvTaxList extends DefaultControlHandler{

	@Autowired
	private RecvTaxListService service;	
	
	// 조회 
	@RequestMapping(value="/recv/recvtaxlist/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument) );
		return http.writer;
	}

	/**
	 * 분류 코드의 일련번호를 생성하여 리턴해준다.
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	// 팝업 
	@RequestMapping(value="/recv/recvtaxlist/get/dialog.do"  ) 
	public String getDialog(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDialog(http.argument) );
		return http.writer;
	}
	
	// 저장 
	@RequestMapping(value="/recv/recvtaxlist/set/master.do"  ) 
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}
	
	
}
