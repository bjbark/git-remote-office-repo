package com.sky.system.prod.cvic.cvicchecktype;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CvicCheckType extends DefaultControlHandler{

	@Autowired
	private CvicCheckTypeService service;
	// 조회
	@RequestMapping(value="/prod/cvic/cvicchecktype/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/prod/cvic/cvicchecktype/get/lookup.do"  )
	public String getLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/prod/cvic/cvicchecktype/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}


}
