package com.sky.system.recv.recvledger;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class RecvLedger extends DefaultControlHandler{

//	private static final String FILE_NAME = "alpha_poData";
//	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private RecvLedgerService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/recv/recvledger/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}


//	/**
//	 * 사업장 매입처별 조회
//	 * 
//	 * @param http
//	 * @param response
//	 * @throws Exception
//	 */
//	@RequestMapping(value="/recv/recvledger/get/stor.do")
//	public String getStore(//HttpMessage http, Map<String, Object> model) throws Exception {
//		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//		HttpMessage http, Map<String, Object> model ) throws Exception {
//	
//	model.put(HttpResponseMessage.RECORDS, service.getStore(http.argument, page, rows));
//	}
//	
//	/**
//	 * 엑셀
//	 * 
//	 * @param http
//	 * @param response
//	 * @param model
//	 * @return
//	 * @throws Exception
//	 */
//	@SuppressWarnings({"unchecked", "rawtypes"})
//	@RequestMapping(value="/recv/recvledger/export/stor.do") 
//	public String getExportStore(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		
//		model.put(ExcelView.ROWS, service.getStore(http.argument, 0, 0));
//		return ExcelView.VIEW_NAME;
//	}	
	

	/**
	 * 상세거래원장조회
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/recv/recvledger/get/storedetail.do")
	public String getStoreDetail( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getStoreDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	
	/**
	 * 상세거래내역 조회
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/recv/recvledger/get/storedetailitem.do")
	public String getStoreDetailItem( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getStoreDetailItem(http.argument, page, rows, sort));
		return http.writer;
	}
	
}
