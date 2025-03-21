package com.sky.system.sale;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.core.common.configuration.Configure;
import com.sky.core.common.report.JasperReportView;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.StringUtil;


@Controller
public class SaleTaxWork  extends DefaultControlHandler{

	@Autowired
	private Configure configure;	
	
	@Autowired
	private SaleTaxWorkService service;	
	
	@RequestMapping(value="/sale/saletaxwork/get/search.do")
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
	@RequestMapping(value="/sale/saletaxwork/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	
	/**
	 * invoice 조회
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/saletaxwork/get/dialog.do")
	// 상세 조회 
	public String getDialog(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDialog(http.argument));
		return http.writer;
	}
	
	// 저장 - 출고 생성. ( 매출데이터 생성 )
	@RequestMapping(value="/sale/saletaxwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument ));
		return http.writer;
	}
	
//	// 저장 - 출고 생성. ( 매출데이터 생성 )
//	@RequestMapping(value="/sale/saletaxwork/set/listerinvoice.do"  )
//	public String setListerInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setListerInvoice(http.argument ));
//	}

	
	// 세금계산서 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/saletaxwork/get/printing.do"  )
	public String getPrinting(HttpMessage http, Map<String, Object> model, Map jasperMainParam, HttpServletRequest request) throws Exception {
		
		// PDF프린트 요청이 온경우(jasper report)
		SqlResultMap map = service.getPrinting(http.argument);

		boolean isReport = Boolean.valueOf(http.argument.getParamText("isReport"));
		if(isReport) { // PDF프린트 요청이 온경우(jasper report)
			Map invoice = map.get(0); // invoice
			List product = (List)invoice.get("product");  // detail의 목록
					
			Map jasperData = new HashMap();
			jasperData.put(JasperReportView.TITLE, "세 금 계 산 서"); // 레포트의 타이틀명
			jasperData.put(JasperReportView.INVOICE, invoice);      // 일자, 등록번호, 상호, 주소와 같은 detail 정보 Map
			 // 서브레포트가 있는 디렉터리 (반드시 절대경로로 해야한다 그래야 jasper에서 인식함)
			jasperData.put(JasperReportView.SUBREPORT_DIR, request.getSession().getServletContext().getRealPath(configure.JASPER_DIR + "/jasper/invoice") );
			
			// 공급가액
			StringBuilder subtotalSb = new StringBuilder();
			String sply_amt = StringUtil.isNullToDefault(invoice.get("sply_amt"), "");
			
			for(int i=0, size=sply_amt.length(); i<size; i++) {
				subtotalSb.append("  ");
				subtotalSb.append(sply_amt.charAt(i));
			}
			invoice.put("sply_amt", subtotalSb.toString().replaceAll("\\..*", ""));
			
			// 세액
			StringBuilder taxSb = new StringBuilder();
			String tax = StringUtil.isNullToDefault(invoice.get("tax"), "");
			
			for(int i=0, size=tax.length(); i<size; i++) {
				taxSb.append("  ");
				taxSb.append(tax.charAt(i));
			}
			invoice.put("tax", taxSb.toString().replaceAll("\\..*", ""));
			
			// 가짜 데이터 테스트 시작(데이터가 길어도 화면상에 문제없는지 테스트를 위해!)
//			((Map)product.get(0)).put("item_name", "(도서)생애 최고의 날은 아직 살지 않은 날들 외 5건3333뮻ㅇ");
//			((Map)product.get(0)).put("sply_amt", 9999999999l);
//			((Map)product.get(0)).put("tax", 9999999998888l);
//			invoice.put("send_biz_types", "안녕하세요좋은 업태입니다.111aaabb");
//			invoice.put("recv_biz_types", "안녕하세요좋은 업태입니다.222cccc");
//			invoice.put("pay_gb", "2");
//			invoice.put("amount", 99999999999l);
			// 가짜 데이터 테스트 끝
			
			jasperData.put("sublist", product); // subreport 데이터 ArrayList
			//jasperData.put(JasperReportView.PRODUCT, product); // detail부분의 데이터 ArrayList
			
			
			jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url")); // 직인 이미지 url
			
			// jasper report 초기 설정
			// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
			jasperMainParam.put(JasperReportView.DATA, jasperData);
			jasperMainParam.put(JasperReportView.JASPER,     "jasper/invoice/InvoiceTax"); // 리포트 파일명
			
			jasperMainParam.put(JasperReportView.FILENAME, "세금계산서");                   // 다운로드시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
			return JasperReportView.VIEW_NAME;
		} else {														// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
//          // test데이터
//			Map invoice = map.get(0); // invoice
//			invoice.put("pay_gb", "2");
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}
	}	

}
