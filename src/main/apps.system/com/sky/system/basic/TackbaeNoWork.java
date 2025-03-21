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
public class TackbaeNoWork  extends DefaultControlHandler{

	@Autowired
	private TackbaeNoWorkService service;	
	
	// 조회 - 매장 품목 리스트
	@RequestMapping(value="/basic/tackbaenowork/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getTaekbae(http.argument, page, rows) );
		return http.writer;
		//http.response.addParam("records", service.getSearch(http.argument, page, rows) ).toWrite(response);
	}
	
//	/**
//	 * 엑셀출력
//	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/basic/tackbaenowork/export/search.do") 
//	public String getExportSearch(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}


	// 조회  - 팝업 
	@RequestMapping(value="/basic/tackbaenowork/get/taekbae.do"  )
	public String getTaekbae(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getTaekbae(http.argument, page, rows) );
		return http.writer;
		
		//http.response.addParam("records", service.getTaekbae(http.argument, page, rows) ).toWrite(response);
	}
	
	
	// 리스터 저장 - 매장 품목 리스트
	@RequestMapping(value="/basic/tackbaenowork/set/master.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument) );
		return http.writer;
		
		//http.response.addParam("records", service.setMaster(http.argument)).toWrite(response);
	}
	
	// 택배 서버 연결 테스트
	@RequestMapping(value="/basic/tackbaenowork/get/taekbaetest.do"  )
	public String getTaekbaeTest(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTaekbaeTest(http.argument));
		return http.writer;
	}
	
	// 저장 - 출고 생성. ( 매출데이터 생성 )
	@RequestMapping(value="/basic/tackbaenowork/set/curnoreset.do"  )
	public String setCurnoReset(HttpMessage http,Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCurnoReset(http.argument));
		return http.writer; 
	}
	

	
}
