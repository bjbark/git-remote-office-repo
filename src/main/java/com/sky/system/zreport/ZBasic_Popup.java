package com.sky.system.zreport;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.sky.http.dispatch.control.DefaultControlHandler;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;



@Controller
public class ZBasic_Popup extends DefaultControlHandler {

	@Autowired
	private ZBasic_PopupService service;

	//
	@RequestMapping(value="/zreport/popup/get/basic_popup.do")
	public String getBasic_Popup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows ) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getBasic_Popup(http.argument, page, rows ));
			return http.writer;
	}





}