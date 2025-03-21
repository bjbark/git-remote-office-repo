package com.sky.system.custom.sjflv.mtrl.imp.ordermast2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("sjflv.imp.OrderMast2")
@Controller
public class OrderMast2 extends DefaultControlHandler{

	@Autowired
	private OrderMast2Service service;

	//master
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows , sort));
		return http.writer;
	}

	//Invoice 조회
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	//Invoice 조회
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/get/sply.do")
	public String getSply( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSply(http.argument, page, rows , sort));
		return http.writer;
	}

	//Invoice 등록
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/invoicePopup.do"  )
	public String setInvoicePopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoicePopup(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/payment.do"  )
	public String setPayment(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPayment(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/confirm.do"  )
	public String setConfirm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setConfirm(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/confirmCancel.do"  )
	public String setConfirmCancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setConfirmCancel(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/date.do"  )
	public String setDate(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDate(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/sply.do"  )
	public String setSply(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSply(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/deleteMaster.do"  )
	public String setDeleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeleteMaster(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/mtrl/imp/ordermast2/get/paymMemo.do")
	public String getPaymMemo( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPaymMemo(http.argument));
		return http.writer;
	}
}