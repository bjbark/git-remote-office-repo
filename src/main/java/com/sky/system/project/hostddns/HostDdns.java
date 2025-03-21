package com.sky.system.project.hostddns;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class HostDdns extends DefaultControlHandler{

	@Autowired
	private HostDdnsService service;

	// 조회
	@RequestMapping(value="/project/hostddns/get/search.do"  )
	public String getSearch(
			@RequestParam(value="page" , required=true , defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true , defaultValue="20") int rows,
			@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort ,
			HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/project/hostddns/set/record.do" )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}

}
