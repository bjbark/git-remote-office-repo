package com.sky.system.sale;

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
public class SaleTaxList  extends DefaultControlHandler{

	@Autowired
	private SaleTaxListService service;	
	
	@RequestMapping(value="/sale/saletaxlist/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort, "ALL"));
			return http.writer;
		
	}

//	public String getSearch(
//			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//			HttpMessage http, Map<String, Object> model ) throws Exception {
//		
//		model.put(HttpResponseMessage.RECORDS,  service.getSearch(http.argument, page, rows, "ALL") );
//	}
	
	
	
	/**
	 * 엑셀출력
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/saletaxlist/export/search.do") 
	public String getExportSearch(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0,"", "ALL") );
		return ExcelView.VIEW_NAME;
	}

	/**
	 * detail 조회
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/saletaxlist/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	/**
	 * detailsub 조회
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/saletaxlist/get/detailsub.do")
	public String getDetailSub(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetailSub(http.argument));
		return http.writer;
	}
	
	// 세금계산서 메일 재발행
	@RequestMapping(value="/sale/saletaxlist/set/resendmail.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.reSendMail(http.argument ));
		return http.writer;
	}
	
	/**
	 * 세금계산서 삭제가능 체크
	 */
	@RequestMapping(value="/sale/saletaxlist/get/remotestate.do") 
	public String getRemoteState(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRemoteState(http.argument, http));
//		model.put(HttpResponseMessage.RECORDS, service.getRemoteState(http.argument, request, http, "NETHOSTING.TAX"));
		return http.writer;
	}

	/**
	 * 세금계산서 삭제(전자세금계산서)
	 */
	@RequestMapping(value="/sale/saletaxlist/get/remotecancel.do") 
	public String getRemoteCancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRemoteCancel(http.argument, http));
//		model.put(HttpResponseMessage.RECORDS, service.getRemoteCancel(http.argument, request, http, "NETHOSTING.TAX"));
		return http.writer;
	}
	
//	
//	@RequestMapping(value="/user/userinfo/set/master.do"  )
//	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
//		return http.writer;
//	}
//	

	/**
	 * 세금계산서 삭제(일반,esero)
	 */
	@RequestMapping(value="/sale/saletaxlist/set/taxcancel.do") 
	public String setTaxCancel( HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setTaxCancel(http.argument));
//		model.put(HttpResponseMessage.RECORDS, service.setTaxCancel(http.argument, request, http));
		
		return http.writer;
	}
	
	@RequestMapping(value="/sale/saletaxlist/get/search/etax.do")
	public String getSearchEtax( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort,"1"));
			return http.writer;
	}
//	@RequestMapping(value="/sale/saletaxlist/get/search/etax.do")
//	public String getSearchEtax(
//			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//			HttpMessage http, Map<String, Object> model ) throws Exception {
//		
//		model.put(HttpResponseMessage.RECORDS,  service.getSearch(http.argument, page, rows, "0") );
//	}
	
	/**
	 * 엑셀출력
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/saletaxlist/export/search/etax.do") 
	public String getExportSearchEtax(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0, "","1") );
		return ExcelView.VIEW_NAME;
	}

	@RequestMapping(value="/sale/saletaxlist/get/search/tax.do")
	public String getSearchTax( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort,"0"));
			return http.writer;
	}
//	@RequestMapping(value="/sale/saletaxlist/get/search/tax.do")
//	public String getSearchTax(
//			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//			HttpMessage http, Map<String, Object> model ) throws Exception {
//		
//		model.put(HttpResponseMessage.RECORDS,  service.getSearch(http.argument, page, rows, "1") );
//	}
	
	/**
	 * 엑셀출력
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/saletaxlist/export/search/tax.do") 
	public String getExportSearchTax(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0,"","0") );
		return ExcelView.VIEW_NAME;
	}

	@RequestMapping(value="/sale/saletaxlist/get/search/esero.do")
	public String getSearchEsero( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchEsero(http.argument, page, rows, sort,"2"));
			return http.writer;
	}
//	@RequestMapping(value="/sale/saletaxlist/get/search/esero.do")
//	public String getSearchEsero(
//			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//			HttpMessage http, Map<String, Object> model ) throws Exception {
//		model.put(HttpResponseMessage.RECORDS,  service.getSearchEsero(http.argument, page, rows, "2") );
//	}
	
	/**
	 * 엑셀출력
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/saletaxlist/export/search/esero.do") 
	public String getExportSearchEsero(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		
//		// row 수정
//		SqlResultMap list = service.getSearchEsero(http.argument,0, 0, "2");
		
		model.put(ExcelView.ROWS,  service.getSearchEsero(http.argument,0, 0,"", "2"));
		return ExcelView.VIEW_NAME;
	}

}
