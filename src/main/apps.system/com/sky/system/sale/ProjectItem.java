package com.sky.system.sale;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ProjectItem extends DefaultControlHandler{

	@Autowired
	private ProjectItemService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/projectitem/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
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
	@RequestMapping(value="/sale/projectitem/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	
	/**
	 * invoice 조회
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/projectitem/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}
	
	/**
	 * invoice 등록/수정/삭제
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/projectitem/set/invoice.do")
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}
	
	/**
	 * 삭제
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/projectitem/set/del_yn.do")
	public String setDeleted(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setDeleted(http.argument));
		return http.writer;
	}

	/**
	 * 상품검색
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/projectitem/get/product.do") 
	public String getDialog(HttpMessage http, Map<String, Object> model ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}
}
