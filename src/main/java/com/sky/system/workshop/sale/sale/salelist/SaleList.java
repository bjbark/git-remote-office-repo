package com.sky.system.workshop.sale.sale.salelist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("workshop.SaleList")
@Controller
public class SaleList  extends DefaultControlHandler{

	@Autowired
	private SaleListService service;


	@RequestMapping(value="/workshop/sale/sale/salelist/get/list1.do")
	public String getList1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList1(http.argument, page, rows, sort ));
			return http.writer;
		}

	@RequestMapping(value="/workshop/sale/sale/salelist/get/list2.do")
	public String getList2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList2(http.argument, page, rows, sort ));
			return http.writer;
		}

	@RequestMapping(value="/workshop/sale/sale/salelist/get/list3.do")
	public String getList3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList3(http.argument, page, rows, sort ));
			return http.writer;
		}

	@RequestMapping(value="/workshop/sale/sale/salelist/get/list4.do")
	public String getList4(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList4(http.argument, page, rows, sort ));
			return http.writer;
		}

	@RequestMapping(value="/workshop/sale/sale/salelist/get/list5.do")
	public String getList5(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList5(http.argument, page, rows, sort ));
			return http.writer;
		}


}
