package com.sky.system.custom.sjflv.sale.export.blmast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("sjflv.export.blmast")

@Controller
public class BlMast  extends DefaultControlHandler{

	@Autowired
	private BlMastService service;

	@RequestMapping(value="/custom/sjflv/sale/export/blmast/get/master1.do"  )
	public String getMaster1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="200") int rows,
			@RequestParam(value="sort" , required=false,defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort));
		return http.writer;
	}

// 조회
	@RequestMapping(value="/custom/sjflv/sale/export/blmast/get/detail1.do"  )
	public String getDetail1( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort));
	return http.writer;
	}

	//Invoice 조회
	@RequestMapping(value="/custom/sjflv/sale/export/blmast/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}


//조회3
	@RequestMapping(value="/custom/sjflv/sale/export/blmast/get/workerlister.do"  )
	public String getWorkerLister( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getWorkerLister(http.argument, page, rows, sort));
	return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/blmast/get/workerdetail.do"  )
	public String getWorkerDetail( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getWorkerDetail(http.argument, page, rows, sort));
	return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/blmast/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoiceDetail(http.argument));
		return http.writer;
	}
}
