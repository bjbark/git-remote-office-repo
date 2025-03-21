package com.sky.system.vend.vendscm;


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
public class VendScm extends DefaultControlHandler {

	@Autowired
	private VendScmService service;

	// 조회 
	@RequestMapping(value="/vend/vendscm/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	
	/**
	 * 엑셀출력(db조회후 나온 row 데이터로 출력)
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/vend/vendscm/export/search.do") 
	public String getExportSearch(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0,"") );
		return ExcelView.VIEW_NAME;
	}	
	

//	// 조회
//	@RequestMapping(value="/vend/vendscm/get/lookup.do"  )
//	public String getLookup(
//		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
//		HttpMessage http, Map<String, Object> model) throws Exception {
//
//		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
//		return http.writer;
//	}

	// 저장
	@RequestMapping(value="/vend/vendscm/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	
	// 로그인 암호 변경 
	@RequestMapping(value="/vend/vendscm/set/passwd.do"  )
	public String setPasswd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPasswd(http.argument));
		return http.writer;
	}
	

}