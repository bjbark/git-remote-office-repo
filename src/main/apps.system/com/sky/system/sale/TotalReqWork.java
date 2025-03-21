package com.sky.system.sale;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.core.common.report.JasperReportView;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class TotalReqWork extends DefaultControlHandler {

	@Autowired
	private TotalReqWorkService service;

	/**
	 * 현황
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/totalreqwork/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	/**
	 * 실적집계
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/totalreqwork/set/closebillmonth.do")
	public String setCloseBillMonth(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setCloseBillMonth(http.argument));
		return http.writer;
	}
	
	/**
	 * 체인회비 확정
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/totalreqwork/set/confirmbillmonth.do")
	public String setConfirmBillMonth(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setConfirmBillMonth(http.argument));
		return http.writer;
	}
		
	/**
	 * 문구 D/C 적용
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/totalreqwork/set/mdcaction.do")
	public String setMdcaction(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setMdcaction(http.argument));
		return http.writer;
	}	
	
	/**
	 * 테크 D/C 적용
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/totalreqwork/set/tdcaction.do")
	public String setTdcaction(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setTdcaction(http.argument));
		return http.writer;
	}	
	
	/**
	 * 저장
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/totalreqwork/set/master.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception { 
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}
	
	
	// 종합청구서 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/totalreqwork/get/printing.do"  )
	public String getPrinting(HttpMessage http, Map jasperMainParam ) throws Exception {
		
		// report안에 들어갈 데이터 조회 - 주문정보
		SqlResultMap map = service.getPrinting(http.argument);

		Map  invoice = map.get(0); // invoice
		List product = (List)invoice.get("product");  // detail의 목록 - 품목 정보
				
		Map jasperData = new HashMap();
		jasperData.put(JasperReportView.TITLE, "종 합 청 구 서"); // 레포트의 타이틀명
		jasperData.put(JasperReportView.INVOICE, invoice);      // 일자, 등록번호, 상호, 주소와 같은 detail 정보 Map
		jasperData.put(JasperReportView.PRODUCT, product); // detail부분의 데이터 ArrayList
		jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url")); // 직인 이미지 url
		
		// jasper report 초기 설정
		// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
		jasperMainParam.put(JasperReportView.DATA, jasperData);
//		jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSale"); // 리포트 파일명
		jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceTotalReq"); // 리포트 파일명
		jasperMainParam.put(JasperReportView.FILENAME, "종합청구서");              // 다운로드시 파일명
		jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
		return JasperReportView.VIEW_NAME;
	}	
	
	
}
