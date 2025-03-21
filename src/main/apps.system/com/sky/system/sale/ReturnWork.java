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
public class ReturnWork extends DefaultControlHandler{

	@Autowired
	private ReturnWorkService service;

	// 조회
	@RequestMapping(value="/sale/returnwork/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	
//	// 고객 정보 조회 
//	@RequestMapping(value="/sale/returnwork/get/cust.do"  )
//	public String getCust(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getCust(http.argument));
//	}	
	

	
//	// 삭제
//	@RequestMapping(value="/recv/powork/set/master.do"  )
//	public void setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument) );
//	}
	
	/**
	 * detail 조회
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/returnwork/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	
//	// 팝업
//	@RequestMapping(value="/sale/estiwork/get/dialog.do"  )
//	public String getDialog(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getDialog(http.argument));
//	}

	// 견적 내역 조회 
	@RequestMapping(value="/sale/returnwork/get/refers.do"  )
	public String getRefers(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRefers(http.argument));
		return http.writer;
	}	
	
	// INV 조회
	@RequestMapping(value="/sale/returnwork/get/invoice.do"  )
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument) );
		return http.writer;
	}

	@RequestMapping(value="/sale/returnwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument ));
		return http.writer;
	}
	
	@RequestMapping(value="/sale/returnwork/set/del_yn.do"  )
	public String setDeleted(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeleted(http.argument ));
		return http.writer;
	}
	
	
	/**
	 * 상품검색
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/returnwork/get/product.do") 
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}	
	
	// 거래명세표 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/returnwork/get/printing.do"  )
	public String getPrinting(HttpMessage http, Map jasperMainParam) throws Exception {
		
		// PDF프린트 요청이 온경우(jasper report)
		SqlResultMap map = service.getPrinting(http.argument);

		boolean isReport = Boolean.valueOf(http.argument.getParamText("isReport"));
		if(isReport) { // PDF프린트 요청이 온경우(jasper report)
			
			Map  invoice = map.get(0); // invoice
			List product = (List)invoice.get("product");  // detail의 목록 - 품목 정보
			
			Map jasperData = new HashMap();
			jasperData.put(JasperReportView.TITLE, "반품 명세서"); // 레포트의 타이틀명
			jasperData.put(JasperReportView.INVOICE, invoice);      // 일자, 등록번호, 상호, 주소와 같은 detail 정보 Map
			jasperData.put(JasperReportView.PRODUCT, product); // detail부분의 데이터 ArrayList
			jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url")); // 직인 이미지 url
			
			// jasper report 초기 설정
			// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
			jasperMainParam.put(JasperReportView.DATA, jasperData);
			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSale"); // 리포트 파일명
			jasperMainParam.put(JasperReportView.FILENAME, "반품 명세서");              // 다운로드시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
			return JasperReportView.VIEW_NAME;
			
		} else {														// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}

	}	
	
	
	// 피킹리스트 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/returnwork/get/picking.do"  )
	public String getPicking(HttpMessage http, Map jasperMainParam ) throws Exception {
		
		// report안에 들어갈 데이터 조회 - 주문정보
		SqlResultMap map = service.getPicking(http.argument);

		Map  invoice = map.get(0); // invoice
		List product = (List)invoice.get("product");  // detail의 목록 - 품목 정보
				
		Map jasperData = new HashMap();
		jasperData.put(JasperReportView.TITLE, "피킹리스트"); // 레포트의 타이틀명
		jasperData.put(JasperReportView.INVOICE, invoice);      // 일자, 등록번호, 상호, 주소와 같은 detail 정보 Map
		jasperData.put(JasperReportView.PRODUCT, product); // detail부분의 데이터 ArrayList
		jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url")); // 직인 이미지 url
		
		// jasper report 초기 설정
		// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
		jasperMainParam.put(JasperReportView.DATA, jasperData);
//		jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSale"); // 리포트 파일명
		jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoicePicking"); // 리포트 파일명
		jasperMainParam.put(JasperReportView.FILENAME, "피킹리스트");              // 다운로드시 파일명
		jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
		return JasperReportView.VIEW_NAME;
	}

	
	/**
	 * 피킹리스트 출력여부 저장
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/returnwork/set/picking.do"  )
	public String setPicking(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPicking(http.argument ));
		return http.writer;
	}
	
	/**
	 * 세트 옵션상품
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/returnwork/get/bunchitem1.do") 
	public String getBunchItem1(HttpMessage http, Map<String, Object> model ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getBunchItem1(http.argument));
		return http.writer;
	}
	
	/**
	 * 세트 옵션상품 + 필수상품
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/returnwork/get/bunchitem2.do") 
	public String getBunchItem2(HttpMessage http, Map<String, Object> model ) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getBunchItem2(http.argument));
		return http.writer;
	}
}
