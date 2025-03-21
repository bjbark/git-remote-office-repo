package com.sky.system.zreport;


import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.sky.http.dispatch.control.DefaultControlHandler;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class ChainSalebenefitRateInfo extends DefaultControlHandler {

	@Autowired
	private ChainSalebenefitRateService service;

	//매출이익율보고서 - 지점별 이익율
	@RequestMapping(value="/zreport/chainsalebenefitrate/get/chainsalebenefitrate1.do")
	public String getSaleanalyticreport1(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport1(http.argument, page, rows));
		return http.writer;
	}

	//매출이익율보고서 - 일자별 이익율
	@RequestMapping(value="/zreport/chainsalebenefitrate/get/chainsalebenefitrate2.do")
	public String getSaleanalyticreport2(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport2(http.argument, page, rows));
			return http.writer;
	}

	//매출이익율보고서 - 제품별 이익율
	@RequestMapping(value="/zreport/chainsalebenefitrate/get/chainsalebenefitrate3.do")
	public String getSaleanalyticreport3(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport3(http.argument, page, rows));
		return http.writer;
	}

	//매출이익율보고서 - 고객별 이익율
	@RequestMapping(value="/zreport/chainsalebenefitrate/get/chainsalebenefitrate4.do")
	public String getSaleanalyticreport4(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport4(http.argument, page, rows));
		return http.writer;
	}

	//매출이익율보고서 - 담당자별 이익율
	@RequestMapping(value="/zreport/chainsalebenefitrate/get/chainsalebenefitrate5.do")
	public String getSaleanalyticreport5(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport5(http.argument, page, rows));
		return http.writer;

	}

	//매출이익율보고서 - 고객분류별 이익율
	@RequestMapping(value="/zreport/chainsalebenefitrate/get/chainsalebenefitrate6.do")
	public String getSaleanalyticreport6(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport6(http.argument, page, rows));
		return http.writer;
	}

	//매출이익율보고서 - 제품분류별 이익율
	@RequestMapping(value="/zreport/chainsalebenefitrate/get/chainsalebenefitrate7.do")
	public String getSaleanalyticreport7(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport7(http.argument, page, rows));
		return http.writer;
	}






}