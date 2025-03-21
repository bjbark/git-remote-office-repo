package com.sky.system.project.phoneinfo;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class PhoneInfo extends DefaultControlHandler{

	@Autowired
	private PhoneInfoService service;

	@RequestMapping(value="/project/phoneinfo/get/lookup.do")
	public String getLookup( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true , defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true , defaultValue="20" ) int rows,
		@RequestParam(value="sort" , required=false, defaultValue=""   ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}
}
