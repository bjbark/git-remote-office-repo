package com.sky.system.cust;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;



@Controller
public class CustArList extends DefaultControlHandler{
	
	@Autowired
	private CustArListService service;	
	
	// 조회 
	@RequestMapping(value="/cust/custarlist/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
		
		//http.response.addParam("records", service.getSearch(http.argument) ).toWrite(response);
	}
	
}
