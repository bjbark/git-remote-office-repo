package com.sky.system.custom.iypkg.eis.eisreport12;

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
public class EisReport12  extends DefaultControlHandler{

	@Autowired
	private EisReport12Service service;

	// 월 외주처 및 공정 별 매입 통계
	@RequestMapping(value="/custom/iypkg/eis/eisreport12/get/search1.do")
	public String search1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search1(http.argument, page, rows, sort ));
		System.out.println("model : " + model);
		return http.writer;
	}

	// 월 외주처 및 공정 별 매입 통계 detail(월별표시)+차트
	@RequestMapping(value="/custom/iypkg/eis/eisreport12/get/detail1.do")
	public String detail1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail1(http.argument));
		System.out.println("model : " + model);
		return http.writer;
	}

	// 월 매입처 상품 매입 통계
	@RequestMapping(value="/custom/iypkg/eis/eisreport12/get/search2.do")
	public String search2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search2(http.argument, page, rows, sort));
		System.out.println("model : "+model);
		return http.writer;
	}

	// 월 매입처 상품 매입 통계  detail(월별표시)+차트
	@RequestMapping(value="/custom/iypkg/eis/eisreport12/get/detail2.do")
	public String detail2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail2(http.argument));
		System.out.println("model : " + model);
		return http.writer;
	}

}
