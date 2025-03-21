package com.sky.system.stock;

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
public class EtcOutList extends DefaultControlHandler{

//	private static final String FILE_NAME = "alpha_poData";
//	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private EtcOutListService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/etcoutlist/get/search.do")
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
	@RequestMapping(value="/stock/etcoutlist/get/detail.do")
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
	@RequestMapping(value="/stock/etcoutlist/export/detail.do") 
	public String getExportDetail(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		
		model.put(ExcelView.ROWS, service.getDetail(http.argument));
		return ExcelView.VIEW_NAME;
	}
	
	/**
	 * item 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/etcoutlist/get/item.do")
	public String getItem( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getItem(http.argument, page, rows, sort));
			return http.writer;
	}
}
