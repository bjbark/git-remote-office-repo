package com.sky.system.membership.point;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;



@Controller
public class Point extends DefaultControlHandler {

	@Autowired
	private PointService service;

	// 조회
	@RequestMapping(value="/membership/point/get/searchmember.do"  )
	public String getSearchMember(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchMember(http.argument, page, rows, sort ));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/membership/point/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="/membership/point/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

}
