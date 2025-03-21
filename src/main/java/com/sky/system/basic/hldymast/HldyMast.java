package com.sky.system.basic.hldymast;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class HldyMast {

	@Autowired
	private HldyMastService service;

	// 조회
	@RequestMapping(value="/basic/hldymast/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/basic/hldymast/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//법정공휴일등록
	@RequestMapping(value="/basic/hldymast/set/holiday.do"  )
	public String setHoliday(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setHoliday(http.argument));
		return http.writer;
	}

	//주말등록
	@RequestMapping(value="/basic/hldymast/set/weekend.do"  )
	public String setWeekend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWeekend(http.argument ));
		return http.writer;

	}

}
