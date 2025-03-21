package com.sky.system.counsel.calllinfo;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CallInfo extends DefaultControlHandler{

	@Autowired
	private CallInfoService service;

	// 조회
	@RequestMapping(value="/counsel/callinfo/get/summary.do"  )
	public String getSummary( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSummary(http.argument, page, rows, sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/counsel/callinfo/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}


	// 저장
	@RequestMapping(value="/counsel/callinfo/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}


	// 저장
	@RequestMapping(value="/counsel/callinfo/set/custinfo.do")
	public String setCustInfo(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCustInfo(http.argument));
		return http.writer;
	}


	// 저장
	@RequestMapping(value="/counsel/callinfo/set/custmemb.do")
	public String setCustMemb(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCustMemb(http.argument));
		return http.writer;
	}


	// 주문조회
	@RequestMapping(value="/counsel/orderlist/get/search.do"  )
	public String getOrderSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderSearch(http.argument, page, rows, sort));
		return http.writer;
	}


	@RequestMapping(value="/counsel/orderlist/get/detail.do")
	public String getOrderDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderDetail(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/counsel/orderlist/get/payment.do")
	public String getOrderPayment(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderPayment(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/counsel/orderlist/get/tel.do")
	public String getOrderTel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderTel(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/counsel/orderlist/get/sale.do")
	public String getOrderSale(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderSale(http.argument));
		return http.writer;
	}


}
