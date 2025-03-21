package com.sky.system.item;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ItemPriceRequest extends DefaultControlHandler{
	
	@Autowired
	private ItemPriceRequestService service;

	// 조회
	@RequestMapping(value="/item/itempricerequest/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}
	
	// 고객 정보 조회 
	@RequestMapping(value="/item/itempricerequest/get/cust.do"  )
	public String getCust(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCust(http.argument));
		return http.writer;
	}	
	
	
//	// 삭제
//	@RequestMapping(value="/recv/powork/set/master.do"  )
//	public void setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument) );
//	}
	
	/**
	 * detail 조회
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/item/itempricerequest/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	
//	// 팝업
//	@RequestMapping(value="/sale/estiwork/get/dialog.do"  )
//	public String getDialog(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getDialog(http.argument));
//	}

	// INV 조회
	@RequestMapping(value="/item/itempricerequest/get/invoice.do"  )
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument) );
		return http.writer;

		//SqlResultMap master =  service.getInvoice(http.argument );
		//SqlResultMap detail =  service.getSearchDetail(http);
		//master.get(0).put("product",  detail );
		//logger.debug("SqlResultMap {} ", master.get(0));
		//model.put(HttpResponseMessage.RECORDS, master);
	}

	
	@RequestMapping(value="/item/itempricerequest/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument ));
		return http.writer;
	}
	
	/*
	 * 삭제
	 */
	@RequestMapping(value="/item/itempricerequest/set/del_yn.do"  )
	public String setDeleted(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeleted(http.argument ));
		return http.writer;
	}
	
	/**
	 * 상품검색
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/item/itempricerequest/get/product.do") 
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}	
	

}

