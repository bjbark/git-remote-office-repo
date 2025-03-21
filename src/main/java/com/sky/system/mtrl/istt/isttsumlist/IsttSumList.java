package com.sky.system.mtrl.istt.isttsumlist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class IsttSumList  extends DefaultControlHandler{

	@Autowired
	private IsttSumListService service;

	// 거래처별 월 원단 매입 통계
	@RequestMapping(value="/mtrl/istt/isttsumlist/get/lister.do")
	public String getLister(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLister(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 거래처별 월 매입 통계 detail(월별표시)+차트
	@RequestMapping(value="/mtrl/istt/isttsumlist/get/master.do")
	public String getMaster(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort ));
		return http.writer;
	}

}
