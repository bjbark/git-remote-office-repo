package com.sky.system.basic;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class EpoCourse extends DefaultControlHandler{

	@Autowired
	private EpoCourseService service;	
	
	// 조회 
	@RequestMapping(value="/basic/epocourse/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model, 
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows ));
		return http.writer;
		
//		SqlResultMap map = service.getSearch(http.argument, page, rows);
//		http.response.addParam("records", map ).addParam("maxsize", map.maxsize ).toWrite(response);  //
//		http.response.addParam("records", service.getSearch(http.argument, page, rows) ).toWrite(response);  //
	}

	// 조회 
	@RequestMapping(value="/basic/epocourse/get/detail.do"  ) 
	public String getDetail(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows ));
		return http.writer;
		
//		SqlResultMap map = service.getDetail(http.argument, page, rows);
//		http.response.addParam("records", map ).addParam("maxsize", map.maxsize ).toWrite(response);  //
		//http.response.addParam("records", service.getDetail(http.argument, page, rows) ).toWrite(response);  //
	}

	// 지정점, 미지정점 조회 
	@RequestMapping(value="/basic/epocourse/get/store.do"  ) 
	public String getStore(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getStore(http.argument, page, rows, sort ));
		return http.writer;
//		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ,
//		HttpMessage http, HttpServletResponse response) throws Exception {
//		
////		SqlResultMap map = service.getStore(http.argument, page, rows);
////		http.response.addParam("records", map ).addParam("maxsize" , map.maxsize).toWrite(response);
//		http.response.addParam("records", service.getStore(http.argument, page, rows, sort ) ).toWrite(response);
			
	}
	
	
	
	
	// 팝업 
	@RequestMapping(value="/basic/epocourse/get/dialog.do"  ) 
	public String getDialog(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDialog(http.argument, page, rows));
		return http.writer;
	}
	
	
	
	
//	// 저장 
//	@RequestMapping(value="/basic/epocourse/set/master.do"  ) 
//	public void setMaster(HttpMessage http, HttpServletResponse response) throws Exception {
//		http.response.addParam("records", service.setMaster(http.argument)).toWrite(response);
//	}
	
	// INV 조회
	@RequestMapping(value="/basic/epocourse/get/invoice.do"  )
	public String getInvoice(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument, page, rows));
		return http.writer;
	}
	
	

	// 발주코드, 요일 저장
	@RequestMapping(value="/basic/epocourse/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}
//	
//	public void setInvoice(HttpMessage http, HttpServletResponse response) throws Exception {
//		http.response.addParam("records", service.setInvoice(http.argument )).toWrite(response);
//	}
	
	// 지정점, 미지정점 저장
	@RequestMapping(value="/basic/epocourse/set/store.do"  )
	public String setStore(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setStore(http.argument));
		return http.writer;
	}
//	
//	public void setStore(HttpMessage http, HttpServletResponse response) throws Exception {
//		http.response.addParam("records", service.setStore(http.argument )).toWrite(response);
//	}
	
	
	
}
