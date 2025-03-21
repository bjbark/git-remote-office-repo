package com.sky.system.cust;

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
public class MonthlyArRpt  extends DefaultControlHandler{

	@Autowired
	private MonthlyArRptService service;	
	
	// 조회 - 매장 품목 리스트
	@RequestMapping(value="/cust/monthlyarrpt/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	// 조회 - 매장 품목 리스트
	@RequestMapping(value="/cust/monthlyarrpt/get/searchgroup.do"  ) 
	public String getSearchGroup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchGroup(http.argument, page, rows, sort ));
		return http.writer;
	}
		

	
	
	/**
	 * 엑셀출력
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/cust/monthlyarrpt/export/search.do") 
	public String getExportSearch(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0, "") );
		return ExcelView.VIEW_NAME;
	}

	
}

