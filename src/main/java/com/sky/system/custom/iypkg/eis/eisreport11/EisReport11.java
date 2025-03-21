package com.sky.system.custom.iypkg.eis.eisreport11;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.apache.tools.ant.types.CommandlineJava.SysProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class EisReport11  extends DefaultControlHandler{

	@Autowired
	private EisReport11Service service;

	// 거래처별 월 원단 매입 통계
	@RequestMapping(value="/custom/iypkg/eis/eisreport11/get/search1.do")
	public String search1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search1(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 거래처별 월 매입 통계 detail(월별표시)+차트
	@RequestMapping(value="/custom/iypkg/eis/eisreport11/get/detail1.do")
	public String detail1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 거래처별 월 매입 통계
	@RequestMapping(value="/custom/iypkg/eis/eisreport11/get/search2.do")
	public String search2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search2(http.argument, page, rows, sort));
		return http.writer;
	}

	// 거래처별 월 매입 통계 detail(월별표시)+차트
	@RequestMapping(value="/custom/iypkg/eis/eisreport11/get/chart2.do")
	public String chart2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.chart2(http.argument));
		return http.writer;
	}

	// 거래처별 월 원단 매입 통계
	@RequestMapping(value="/custom/iypkg/eis/eisreport11/get/search3.do")
	public String search3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search3(http.argument, page, rows, sort));
		return http.writer;
	}

	// 거래처별 월 매입 통계 detail(월별표시)
	@RequestMapping(value="/custom/iypkg/eis/eisreport11/get/detail3.do")
	public String detail3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail3(http.argument, page, rows, sort));
		return http.writer;
	}

	// 거래처별 월 매입 통계 (월별표시)차트
	@RequestMapping(value="/custom/iypkg/eis/eisreport11/get/chart3.do")
	public String chart3(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.chart3(http.argument));
		return http.writer;
	}

}
