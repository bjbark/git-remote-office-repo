package com.sky.system.custom.sjflv.sale.export.exptpayment;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("sjflv.export.ExptPayment")
@Controller
public class ExptPayment extends DefaultControlHandler{

	@Autowired
	private ExptPaymentService service;

	//master
	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows , sort));
		return http.writer;
	}
	//Cost
	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/cost.do")
	public String getCost( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCost(http.argument, page, rows , sort));
		return http.writer;
	}
	//Payment
	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/payment.do")
	public String getPayment( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPayment(http.argument, page, rows , sort));
		return http.writer;
	}
	//packing list
	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/packing.do")
	public String getPacking( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPacking(http.argument, page, rows , sort));
		return http.writer;
	}
	//
	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/nego.do")
	public String getNego( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getNego(http.argument, page, rows , sort));
		return http.writer;
	}

	//Invoice 조회
	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/acpt.do")
	public String getAcpt( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getAcpt(http.argument, page, rows , sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/workerlister.do"  )
	public String getWorkerLister( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getWorkerLister(http.argument, page, rows, sort));
	return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/workerdetail.do"  )
	public String getWorkerDetail( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getWorkerDetail(http.argument, page, rows, sort));
	return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/workereditor.do"  )
	public String getWorkerEditor( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getWorkerEditor(http.argument, page, rows, sort));
	return http.writer;
	}


	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/acpt.do")
	public String setAcpt( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAcpt(http.argument, page, rows , sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	//Invoice 등록
	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/invoicePopup.do"  )
	public String setInvoicePopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoicePopup(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/invc.do"  )
	public String setInvc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvc(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/cost.do"  )
	public String setCost(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCost(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/payment.do"  )
	public String setPayment(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPayment(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/sced.do"  )
	public String setSked(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSked(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/packing.do"  )
	public String setPacking(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPacking(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/nego.do"  )
	public String setNego(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setNego(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/set/order.do"  )
	public String setOrder(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOrder(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/export/exptpayment/get/order.do")
	public String getOrder(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getOrder(http.argument));
		return http.writer;
	}

}

