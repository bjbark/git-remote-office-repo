package com.sky.system.logi;

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
public class TackbaePrintList  extends DefaultControlHandler{

	@Autowired
	private TackbaePrintListService service;	
	
	// 조회 - 매장 품목 리스트
	@RequestMapping(value="/logi/tackbaeprintlist/get/master.do"  ) 
	public String getMaster(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort ));
		return http.writer;
		
	}
	
	/**
	 * 엑셀출력
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/logi/tackbaeprintlist/export/master.do" ) 
	public String getExportMaster(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getMaster(http.argument,0, 0,"") );
		return ExcelView.VIEW_NAME;
	}

	// 조회 - 매장 품목 리스트
	@RequestMapping(value="/logi/tackbaeprintlist/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
		
	}
	
	/**
	 * 엑셀출력
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/logi/tackbaeprintlist/export/search.do" ) 
	public String getExportSearch(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0,"") );
		return ExcelView.VIEW_NAME;
	}
	
	/**
	 * detail 조회
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/logi/tackbaeprintlist/get/detail.do"  ) 
	public String getDetail(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	/**
	 * 엑셀출력
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/logi/tackbaeprintlist/export/detail.do" ) 
	public String getExportDetail(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getDetail(http.argument,0, 0,"") );
		return ExcelView.VIEW_NAME;
	}
	
	// 저장 - 출고 생성. ( 매출데이터 생성 )
	@RequestMapping(value="/logi/tackbaeprintlist/set/update.do"  )
	public String setUpdate(HttpMessage http,Map<String, Object> model) throws Exception {
//			model.put(HttpResponseMessage.RECORDS, service.setTaekbae(http.argument ));
		model.put(HttpResponseMessage.RECORDS, service.setUpdate(http.argument));
		return HttpMessage.RESPONSE_WITER;
	}
	
	// 저장 - 출고 생성. ( 매출데이터 생성 )
	@RequestMapping(value="/logi/tackbaeprintlist/set/master.do"  )
	public String setMaster(HttpMessage http,Map<String, Object> model) throws Exception {
//				model.put(HttpResponseMessage.RECORDS, service.setTaekbae(http.argument ));
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return HttpMessage.RESPONSE_WITER;
	}
	
	// 저장 - 출고 생성. ( 매출데이터 생성 )
	@RequestMapping(value="/logi/tackbaeprint/set/taekbae.do"  )
	public String setTaekbae(HttpMessage http,Map<String, Object> model) throws Exception {
//			model.put(HttpResponseMessage.RECORDS, service.setTaekbae(http.argument ));
		model.put(HttpResponseMessage.RECORDS, service.setTaekbae(http.argument));
		return HttpMessage.RESPONSE_WITER;
	}

	// 저장 - 출고 생성. ( 매출데이터 생성 )
	@RequestMapping(value="/logi/tackbaeprint/set/linktaekbae.do"  )
	public String setLinkTaekbae(HttpMessage http,Map<String, Object> model) throws Exception {
//			model.put(HttpResponseMessage.RECORDS, service.setTaekbae(http.argument ));
		model.put(HttpResponseMessage.RECORDS, service.setLinkTaekbae(http.argument));
		return HttpMessage.RESPONSE_WITER;
	}
	
}

