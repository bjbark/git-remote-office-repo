package com.sky.system.recv;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ScmRecvList extends DefaultControlHandler{

	@Autowired
	private ScmRecvListService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/recv/scmrecvlist/get/search.do")
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
	@RequestMapping(value="/recv/scmrecvlist/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	
	/**
	 * master 매입/매출 확정
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/recv/scmrecvlist/set/master.do")
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}	

//	/**
//	 * iteminfo 조회
//	 * 
//	 * @param http
//	 * @param response
//	 * @throws Exception
//	 */
//	@RequestMapping(value="/recv/scmrecvlist/get/iteminfo.do")
//	public String getItemInfo(//HttpMessage http, Map<String, Object> model) throws Exception {
//		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//		HttpMessage http, Map<String, Object> model ) throws Exception {
//	
//	model.put(HttpResponseMessage.RECORDS, service.getItemInfo(http.argument, page, rows));
//	}
	
//	/**
//	 * iteminfo 엑셀
//	 * 
//	 * @param http
//	 * @param response
//	 * @param model
//	 * @return
//	 * @throws Exception
//	 */
//	@SuppressWarnings({"unchecked", "rawtypes"})
//	@RequestMapping(value="/recv/scmrecvlist/export/iteminfo.do") 
//	public String getExportItemInfo(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		
//		model.put(ExcelView.ROWS, service.getItemInfo(http.argument, 0, 0));
//		return ExcelView.VIEW_NAME;
//	}
}
