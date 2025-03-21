package com.sky.system.custom.iypkg.eis.eisreport1;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("iypkg.EisReport1")
@Controller
public class EisReport1  extends DefaultControlHandler{

	@Autowired
	private EisReport1Service service;

	// 거래처별 월 원단 매입 통계
	@RequestMapping(value="/custom/iypkg/eis/eisreport1/get/search1.do")
	public String search1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search1(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 거래처별 월 매입 통계 detail(월별표시)+차트
	@RequestMapping(value="/custom/iypkg/eis/eisreport1/get/detail1.do")
	public String detail1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail1(http.argument, page, rows, sort ));
		return http.writer;
	}


	// 거래처별 월 매입 통계 detail(월별표시)
	@RequestMapping(value="/custom/iypkg/eis/eisreport1/get/detail2.do")
	public String detail2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail2(http.argument, page, rows, sort));
		return http.writer;
	}



}
