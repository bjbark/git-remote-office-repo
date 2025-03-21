package com.sky.system.custom.iypkg.stock.isos.isttlist1;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class IsttList1 extends DefaultControlHandler{

	@Autowired
	private IsttList1Service service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/iypkg/stock/isos/isttlist1/get/list1.do")
	public String getList1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList1(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/isttlist1/get/list2.do")
	public String getList2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList2(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/isttlist1/get/list3.do")
	public String getList3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList3(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/isttlist1/get/list4.do")
	public String getList4( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getList4(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/isttlist1/get/list5.do")
	public String getList5( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getList5(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/isttlist1/get/list6.do")
	public String getList6( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getList6(http.argument, page, rows, sort));
		return http.writer;
	}


}
