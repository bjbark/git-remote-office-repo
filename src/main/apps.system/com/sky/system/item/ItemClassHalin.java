package com.sky.system.item;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ItemClassHalin extends DefaultControlHandler{

	@Autowired
	private ItemClassHalinService service;	
	
	// 전시분류정보 조회 
	@RequestMapping(value="/item/itemclasshalin/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer; 		
	}
	
	// 저장 
	@RequestMapping(value="/item/itemclasshalin/set/record.do"  ) 
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer; 		
	}
	
}
