package com.sky.system.vend.vendstore;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.core.common.excel.ExcelView;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class VendStore extends DefaultControlHandler {

	@Autowired
	private VendStoreService service;

	// 조회
	@RequestMapping(value="/vend/vendstore/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true , defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true , defaultValue="17" ) int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}	

	// 조회
	@RequestMapping(value="/vend/vendstore/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 조회
//	@RequestMapping(value="/vend/vendstore/one/lookup.do"  )
//	public String oneLookup(HttpMessage http, Map<String, Object> model ) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.oneLookup(http.argument));
//		return http.writer;
//	}
	
	
	
	// 저장
	@RequestMapping(value="/vend/vendstore/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	

	
	
	

//	@RequestMapping(value="/vend/vendstore/set/passwd.do"  )
//	public String setPasswd(HttpMessage http, Map<String, Object> model) throws Exception {
//		
//		model.put(HttpResponseMessage.RECORDS, service.setPasswd(http.argument));
//		return http.writer;
//		
//		//model.put(HttpResponseMessage.RECORDS, service.setPasswd(http.argument));
//	}
//	@RequestMapping(value="/vend/vendscm/set/passwd.do"  )
//	public String setPasswd(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setPasswd(http.argument));
//	}
//	@RequestMapping(value="/vend/vendstore/set/login.do"  )
//	public String setLogin(HttpMessage http, Map<String, Object> model) throws Exception {
//		
//		
//		model.put(HttpResponseMessage.RECORDS, service.setLogin(http.argument));
//		return http.writer;
//	}	

	/**
	 * 미지급 master 정보
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/vend/vendstore/get/sales.do") 
	public String getSales( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSales(http.argument, page, rows, sort));
		return http.writer;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/vend/vendstore/export/sales.do") 
	public String getExportSales(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getSales(http.argument,0, 0,"") );
		return ExcelView.VIEW_NAME;
	}

	
	/**
	 * 미지급 detail 정보
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/vend/vendstore/get/items.do") 
	public String getItems( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItems(http.argument, page, rows, sort));
		return http.writer;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/vend/vendstore/export/items.do") 
	public String getExportItems(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getItems(http.argument,0, 0,"") );
		return ExcelView.VIEW_NAME;
	}
	
	
	
}
