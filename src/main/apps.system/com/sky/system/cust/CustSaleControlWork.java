package com.sky.system.cust;

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
public class CustSaleControlWork extends DefaultControlHandler{

	@Autowired
	private CustSaleControlWorkService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/cust/custsalecontrolwork/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
//			HttpMessage http, HttpServletResponse response ) throws Exception {
//		
//		http.response.addParam("records", service.getSearch(http.argument, page, rows)).toWrite(response);
	}
	
	
	// 저장
	@RequestMapping(value="/cust/custsalecontrolwork/set/master.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
		
//		http.response.addParam("records", service.setMaster(http.argument)).toWrite(response);
		
	}
	
	/**
	 * 출력
	 * 
	 * @param http
	 * @param jasperMainParam
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked", "rawtypes"})
	@RequestMapping(value="/cust/custsalecontrolwork/get/custprinting.do")
	public String getCustPrinting(HttpMessage http, Map jasperMainParam) throws Exception {
		
		SqlResultMap map = service.getCustPrinting(http.argument);
		boolean isReport = Boolean.valueOf(http.argument.getParamText("isReport"));
		
		// PDF프린트 요청이 온경우(jasper report)
		if (isReport) {
			Map invoice = map.get(0);
			List product = (List)invoice.get("product");
			
			Map jasperData = new HashMap();
			jasperData.put(JasperReportView.TITLE, "고객별 거래원장(약식)");
			jasperData.put(JasperReportView.INVOICE, invoice);
			jasperData.put(JasperReportView.PRODUCT, product);
			jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url"));
			
			// jasper report 초기 설정
			// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
			jasperMainParam.put(JasperReportView.DATA, jasperData);
			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceCustLedger"); // 리포트 파일명
			jasperMainParam.put(JasperReportView.FILENAME, "고객별 거래원장(약식)");              // 다운로드시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
			return JasperReportView.VIEW_NAME;
		}
		// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
		else {
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}
	}
	

}

