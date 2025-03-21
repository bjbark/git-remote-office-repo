package com.sky.system.report;

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
public class MoveSaleItemRpt extends DefaultControlHandler {

//	private static final String FILE_NAME = "alpha_poData";
//	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private MoveSaleItemRptService service;

	/**
	 * 현황
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/movesaleitemrpt/get/search.do")
	public String getSearch(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows));
		return http.writer;
	}
	
	/**
	 * 현황 엑셀
	 * 
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked", "rawtypes"})
	@RequestMapping(value="/report/movesaleitemrpt/export/search.do") 
	public String getExport(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		
		model.put(ExcelView.ROWS, service.getSearch(http.argument, 0, 0));
		return ExcelView.VIEW_NAME;
	}

	/**
	 * 요일별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/movesaleitemrpt/get/week.do")
	public String getWeek(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getWeek(http.argument, page, rows));
		return http.writer;
	}
	
	/**
	 * 요일별 엑셀
	 * 
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked", "rawtypes"})
	@RequestMapping(value="/report/movesaleitemrpt/export/week.do") 
	public String getExportWeek(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		
		model.put(ExcelView.ROWS, service.getWeek(http.argument, 0, 0));
		return ExcelView.VIEW_NAME;
	}

	/**
	 * 일자별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/movesaleitemrpt/get/day.do")
	public String getDay(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDay(http.argument, page, rows));
		return http.writer;
	}
	
	/**
	 * 일자별 엑셀
	 * 
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked", "rawtypes"})
	@RequestMapping(value="/report/movesaleitemrpt/export/day.do") 
	public String getExportDay(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		
		model.put(ExcelView.ROWS, service.getDay(http.argument, 0, 0));
		return ExcelView.VIEW_NAME;
	}

	/**
	 * 월별
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/report/movesaleitemrpt/get/month.do")
	public String getMonth(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMonth(http.argument, page, rows));
		return http.writer;
	}
	
	/**
	 * 월별 엑셀
	 * 
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked", "rawtypes"})
	@RequestMapping(value="/report/movesaleitemrpt/export/month.do") 
	public String getExportMonth(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		
		model.put(ExcelView.ROWS, service.getMonth(http.argument, 0, 0));
		return ExcelView.VIEW_NAME;
	}
}
