package com.sky.system.sale;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class OrderRegi  extends DefaultControlHandler{

	@Autowired
	private OrderRegiService service;	
	
	// 조회 - 고객 조회
	@RequestMapping(value="/sale/orderregi/get/master.do"  ) 
	public String getMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument));
		return http.writer;
	}
	
	/**
	 * 상품검색 - cust_price
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/orderregi/get/product.do") 
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}
	
	// 저장 - 주문 생성. ( 주문데이터 생성 )
	@RequestMapping(value="/sale/orderregi/set/invoice.do"  )
//	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument ));
//	}
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}
	
	/**
	 * 세트 옵션상품
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/orderregi/get/bunchitem1.do") 
	public String getBunchItem1(HttpMessage http, Map<String, Object> model ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getBunchItem1(http.argument));
		return http.writer;
	}
	
	/**
	 * 세트 옵션상품 + 필수상품
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/orderregi/get/bunchitem2.do") 
	public String getBunchItem2(HttpMessage http, Map<String, Object> model ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getBunchItem2(http.argument));
		return http.writer;
	}	
	
}
