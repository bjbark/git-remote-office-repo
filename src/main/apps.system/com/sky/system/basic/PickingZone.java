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
public class PickingZone extends DefaultControlHandler{

	@Autowired
	private PickingZoneService service;	
	// 조회 
	@RequestMapping(value="/basic/pickingzone/get/search.do"  ) 
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true , defaultValue="1" ) int    page,
			@RequestParam(value="limit", required=true , defaultValue="10") int    rows,
			@RequestParam(value="sort" , required=false, defaultValue= "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	
	@RequestMapping(value="/basic/pickingzone/get/seq.do"  ) 
	public String getSeq( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeq(http.argument, page, rows));
		return http.writer;
		
//		SqlResultMap map = service.getSeq(http.argument, page, rows);
//		http.response.addParam("records", map ).addParam("maxsize", map.maxsize ).toWrite(response);  //
		//http.response.addParam("records", service.getSeq(http.argument, page, rows) ).toWrite(response);  //
	}
	
	
	
	
	// 저장 
	@RequestMapping(value="/basic/pickingzone/set/master.do"  ) 
	public String setMaster( HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}
		
	// 기초정보 조회 
	@RequestMapping(value="/basic/pickingzone/get/dialog.do"  ) 
	public String getDialog( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDialog(http.argument, page, rows));
		return http.writer;
	}	
}
