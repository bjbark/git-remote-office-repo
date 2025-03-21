package com.sky.system.sale.sale.salearlist2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class SaleArList2  extends DefaultControlHandler{

	@Autowired
	private SaleArList2Service service;


	@RequestMapping(value="sale/sale/salearlist2/get/list1.do")
	public String getList1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getList1(http.argument));
		return http.writer;
	}

	@RequestMapping(value="sale/sale/salearlist2/get/list2.do")
	public String getList2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getList2(http.argument, page, rows, sort ));
		return http.writer;

	}

}
