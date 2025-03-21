package com.sky.system.project.codeinfo;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class CodeInfo {

	@Autowired
	private CodeInfoService service;


	@RequestMapping(value="/project/codeinfo/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/project/codeinfo/set/master.do")
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}
}
