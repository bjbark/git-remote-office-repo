package com.sky.system.custom.iypkg.eis.eisreport14;

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

@Service("iypkg.EisReport14")
@Controller
public class EisReport14  extends DefaultControlHandler{

	@Autowired
	private EisReport14Service service;

	// 담당자 및 거래처
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/search1.do")
	public String search1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search1(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 담당자 및 거래처 detail1(월별표시)
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/detail1.do")
	public String detail1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail1(http.argument));
		return http.writer;
	}

	// 담당자 목표대비 실적
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/search2.do")
	public String search2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search2(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 담당자 목표대비 실적 detail2(월별표시)+차트
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/detail2.do")
	public String chart2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail2(http.argument));
		return http.writer;
	}

//	// 담당자 및 거래처 detail1(월별표시)
//	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/chart2.do")
//	public String getChart2(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getChart2(http.argument));
//		return http.writer;
//	}

	// 월거래처 매출 및 수금 통계
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/search3.do")
	public String search3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.search3(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 월거래처 매출 및 수금 통계 detail(월별표시)
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/detail3.do")
	public String detail3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" )String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.detail3(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 거래처별 월 매출 및 수금 통계 기초이월잔액
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/cary_amnt.do")
	public String cary_amnt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.cary_amnt(http.argument));
		return http.writer;
	}

	// 거래처별 월 매출 및 수금 통계 전년잔액
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/befr_amnt.do")
	public String befr_amnt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.befr_amnt(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/chart2.do")
	public String getChart2(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getChart2(http.argument));
		return http.writer;
	}
	// 거래처별 월 매입 통계 (월별표시)차트
	@RequestMapping(value="/custom/iypkg/eis/eisreport14/get/chart3.do")
	public String chart3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" )String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.chart3(http.argument, page, rows, sort ));
		return http.writer;
	}

}
