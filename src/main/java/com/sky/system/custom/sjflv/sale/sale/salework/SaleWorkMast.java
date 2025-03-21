package com.sky.system.custom.sjflv.sale.sale.salework;

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
@Service("sjflv.sale.SaleWork")
public class SaleWorkMast extends DefaultControlHandler{

	@Autowired
	private SaleWorkService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/get/search2.do")
	public String getSearch2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
			return http.writer;
	}

	/**
	 * detail 조회
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/get/popup.do")
	public String getPopup(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getPopup(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/get/item.do")
	public String getItem(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getItem(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/get/detail2.do")
	public String getDetail2(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/custom/sjflv/sale/sale/salework/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/sale/salework/get/invoice2.do")
	public String getInvoice2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice2(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/sale/salework/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/sale/salework/set/invoice2.do"  )
	public String setInvoice2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice2(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/sale/salework/set/deleteMaster.do"  )
	public String setDeleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeleteMaster(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/set/taxSend.do"  )
	public String setTaxSend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTaxSend(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/set/reSendMail.do"  )
	public String reSendMail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.reSendMail(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/sale/sale/salework/set/popup.do"  )
	public String setPopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPopup(http.argument));
		return http.writer;
	}


}
