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
public class StockList extends DefaultControlHandler {

	@Autowired
	private StockListService service;

	/**
	 * 재고현황(환산)
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stocklist/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	/**
	 * 수불내역(환산)
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stocklist/get/search2.do")
	public String getSearch2(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument));
		return http.writer;
	}
	
	/**
	 * 단위별재고현황
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stocklist/get/search3.do")
	public String getSearch3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort));
			return http.writer;
	}

	/**
	 * 수불내역(단위)
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stocklist/get/search4.do")
	public String getSearch4(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearch4(http.argument));
		return http.writer;
	}

	/**
	 * 재고자산평가
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stocklist/get/search5.do")
	public String getSearch5( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch5(http.argument, page, rows, sort));
			return http.writer;
	}
}
