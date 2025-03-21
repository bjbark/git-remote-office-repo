package com.sky.system.move;

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
public class MoveRecvList extends DefaultControlHandler{

	@Autowired
	private MoveRecvListService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/move/moverecvlist/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
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
	@RequestMapping(value="/move/moverecvlist/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	
	/**
	 * detail 엑셀
	 * 
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked", "rawtypes"})
	@RequestMapping(value="/move/moverecvlist/export/detail.do") 
	public String getExportDetail(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		
		model.put(ExcelView.ROWS, service.getDetail(http.argument));
		return ExcelView.VIEW_NAME;
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
	@RequestMapping(value="/move/moverecvlist/get/item.do")
	public String getItem( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue= "" ) String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getItem(http.argument, page, rows, sort));
		return http.writer;
	}	
	
}
