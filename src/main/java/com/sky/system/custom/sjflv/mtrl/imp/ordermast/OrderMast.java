package com.sky.system.custom.sjflv.mtrl.imp.ordermast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("sjflv.imp.OrderMast")
@Controller
public class OrderMast extends DefaultControlHandler{

	@Autowired
	private OrderMastService service;

	//master
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows , sort));
		return http.writer;
	}

	//detail
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	//Invoice 조회
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	//Invoice 조회
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/get/sply.do")
	public String getSply( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSply(http.argument, page, rows , sort));
		return http.writer;
	}

	//Invoice 등록
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/set/invoicePopup.do"  )
	public String setInvoicePopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoicePopup(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/set/payment.do"  )
	public String setPayment(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPayment(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/set/confirm.do"  )
	public String setConfirm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setConfirm(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/set/date.do"  )
	public String setDate(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDate(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/set/sply.do"  )
	public String setSply(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSply(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/set/deleteMaster.do"  )
	public String setDeleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeleteMaster(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument));
		return http.writer;
	}
}

