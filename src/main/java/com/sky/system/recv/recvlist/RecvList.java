package com.sky.system.recv.recvlist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class RecvList extends DefaultControlHandler{

	@Autowired
	private RecvListService service;

	/**
	 * master 조회
	 * 
	 * @param http
	 * @param model
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/recv/recvlist/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue= "" ) String sort) throws Exception {
		
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
	@RequestMapping(value="/recv/recvlist/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	/**
	 * 상품별 현황
	 * 
	 * @param http
	 * @param model
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/recv/recvlist/get/item.do")
	public String getItem( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue= "" ) String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getItem(http.argument, page, rows, sort));
		return http.writer;
	}
}
