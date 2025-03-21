package com.sky.system.stock;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class StockCountPartManager extends DefaultControlHandler{

	@Autowired
	private StockCountPartManagerService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartmanager/get/search.do")
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
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartmanager/get/detail.do")
	public String getDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	
	/**
	 * invoice 등록/수정/삭제
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartmanager/set/invoice.do")
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}
	
	/**
	 * detail 삭제
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartmanager/set/detail.do")
	public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}
	
	/**
	 * 삭제
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartmanager/set/del_yn.do")
	public String setDeleted(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setDeleted(http.argument));
		return http.writer;
	}
	
	/**
	 * 상품검색
	 * 
	 * @param http
	 * @param model
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartmanager/get/item.do") 
	public String getItem( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue= "" ) String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getItem(http.argument, page, rows, sort));
		return http.writer;
	}
	
	/**
	 * 조사대상상품 선택등록
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartmanager/set/item.do")
	public String setItem(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setItem(http.argument));
		return http.writer;
	}
	
	/**
	 * 조사대상상품 일괄등록
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartmanager/set/allitem.do")
	public String setAllItem(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setAllItem(http.argument));
		return http.writer;
	}
}
