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
public class ZreportInfo extends DefaultControlHandler {

	@Autowired
	private ZreportInfoService service;

	@RequestMapping(value="/zreport/popup/get/spotpopup.do")
	public String getSpotPopup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows ) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getSpotPopup(http.argument, page, rows ));
			return http.writer;
	}



	@RequestMapping(value="/zreport/popup/get/classification.do")
	public String getClassificationPopup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows ) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getClassificationPopup(http.argument, page, rows ));
			return http.writer;
	}

	@RequestMapping(value="/zreport/popup/get/deptpopup.do")
	public String getDeptPopup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows ) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getDeptPopup(http.argument, page, rows ));
			return http.writer;
	}

	@RequestMapping(value="/zreport/popup/get/salemanpopup.do")
	public String getSaleManPopup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows ) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getSaleManPopup(http.argument, page, rows ));
			return http.writer;
	}




	//매출이익율보고서 - 지점별 이익율
	@RequestMapping(value="/zreport/get/saleanalyticreport1.do")
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
	@RequestMapping(value="/zreport/get/saleanalyticreport2.do")
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
	@RequestMapping(value="/zreport/get/saleanalyticreport3.do")
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
	@RequestMapping(value="/zreport/get/saleanalyticreport4.do")
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
	@RequestMapping(value="/zreport/get/saleanalyticreport5.do")
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
	@RequestMapping(value="/zreport/get/saleanalyticreport6.do")
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
	@RequestMapping(value="/zreport/get/saleanalyticreport7.do")
	public String getSaleanalyticreport7(
			HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort
			) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport7(http.argument, page, rows));
		return http.writer;
	}

	//매출이익율보고서 - test
	public String  getSaleanalyticreport8(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSaleanalyticreport8(http.argument));
		return http.writer;
	}






}