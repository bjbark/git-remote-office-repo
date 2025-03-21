package com.sky.system.project.projinfo;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ProjInfo extends DefaultControlHandler{

	@Autowired
	private ProjInfoService service;



	// 조회
	@RequestMapping(value="/project/projinfo/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/project/projinfo/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="/project/projinfo/set/record.do" )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

}
