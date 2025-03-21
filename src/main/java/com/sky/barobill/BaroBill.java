package com.sky.barobill;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class BaroBill {

	@Autowired
	private BaroBillService service;

	@RequestMapping(value="/barobill/set/barobillJoin.do"  )
	public String setBarobillJoin( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBarobillJoin(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/barobill/get/baro_logn.do"  )
	public String getBaro_logn( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBaro_logn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/barobill/get/barobillURL.do"  )
	public String getBarobillURL( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBarobillURL(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/barobill/get/barobillInvoiceURL.do"  )
	public String getBarobillInvoiceURL( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBarobillInvoiceURL(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/barobill/set/DeleteTax.do"  )
	public String setDeleteTax( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeleteTax(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/barobill/set/procTaxInvoice.do"  )
	public String setProcTaxInvoice( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setProcTaxInvoice(http.argument));
		return http.writer;
	}
}
