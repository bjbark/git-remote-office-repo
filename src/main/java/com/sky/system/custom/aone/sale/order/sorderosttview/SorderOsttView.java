package com.sky.system.custom.aone.sale.order.sorderosttview;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
@Service("aone.SorderOsttView")

public class SorderOsttView  extends DefaultControlHandler{

	@Autowired
	private SorderOsttViewService service;

	// 거래처별 월 원단 매입 통계
	@RequestMapping(value="/custom/aone/sale/order/sorderosttview/get/master1.do")
	public String getMaster1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 거래처별 월 매입 통계 detail(월별표시)+차트
	@RequestMapping(value="/custom/aone/sale/order/sorderosttview/get/master2.do")
	public String getMaster2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 거래처별 월 매입 통계
	@RequestMapping(value="/custom/aone/sale/order/sorderosttview/get/master3.do")
	public String getMaster3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster3(http.argument, page, rows, sort));
		return http.writer;
	}

	// 거래처별 월 매입 통계
	@RequestMapping(value="/custom/aone/sale/order/sorderosttview/get/master4.do")
	public String getMaster4(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster4(http.argument, page, rows, sort));
		return http.writer;
	}



}
