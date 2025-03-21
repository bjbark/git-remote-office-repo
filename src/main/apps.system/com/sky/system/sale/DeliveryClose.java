
package com.sky.system.sale;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.core.common.excel.ExcelView;
import com.sky.core.common.report.JasperReportView;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class DeliveryClose extends DefaultControlHandler{

	@Autowired
	private DeliveryCloseService service;

	// 조회
	@RequestMapping(value="/sale/deliveryclose/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/deliveryclose/export/nodelivery.do") 
	public String getExportNoDelivery(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0,"") );
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
	@RequestMapping(value="/sale/deliveryclose/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	
	// 미처리 현황 상세 조회 
	@RequestMapping(value="/sale/deliveryclose/get/nodelivery.do"  )
	public String getNoDelivery( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getNoDelivery(http.argument, page, rows, sort));
		return http.writer;
	}
	
	/**
	 * 미처리 현황 상세 조회
	 * 
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/deliveryclose/get/nodeliveryitem.do")
	public String getNoDeliveryItem(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getNoDeliveryItem(http.argument));
		return http.writer;
	}
	
	// 상품별 조회
	@RequestMapping(value="/sale/deliveryclose/get/itemlist.do"  )
	public String getItemList( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemList(http.argument, page, rows, sort));
		return http.writer;
	}	
	


	
	// 상품별 집계 조회
	@RequestMapping(value="/sale/deliveryclose/get/itemgroup.do"  )
	public String getItemGroup( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemGroup(http.argument, page, rows, sort));
		return http.writer;
	}	
	
	/**
	 * 엑셀출력(db조회후 나온 row 데이터로 출력)
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/deliveryclose/export/itemgroup.do") 
	public String getExportItemGroup(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getItemGroup(http.argument,0, 0,"") );
		return ExcelView.VIEW_NAME;
	}
	
	
	// 매출마감, 마감취소 
	@RequestMapping(value="/sale/deliveryclose/set/master.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}
	
	// 송장번호 입력' 
	@RequestMapping(value="/sale/deliveryclose/set/taekbae.do"  )
	public String setTaekbae(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTaekbae(http.argument));
		return http.writer;
	}
		
	// 거래명세표 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/sale/deliveryclose/get/printing.do"  )
	public String getPrinting(HttpMessage http, Map<String, Object> model, Map jasperMainParam) throws Exception {
		
		// PDF프린트 요청이 온경우(jasper report)
		SqlResultMap map = service.getPrinting(http.argument);

		boolean isReport = Boolean.valueOf(http.argument.getParamText("isReport"));
		if(isReport) { // PDF프린트 요청이 온경우(jasper report)
			Map invoice = map.get(0); // invoice
			List product = (List)invoice.get("product");  // detail의 목록
					
			Map jasperData = new HashMap();
			jasperData.put(JasperReportView.TITLE, "거래 명세서"); // 레포트의 타이틀명
			jasperData.put(JasperReportView.INVOICE, invoice);      // 일자, 등록번호, 상호, 주소와 같은 detail 정보 Map
			jasperData.put(JasperReportView.PRODUCT, product); // detail부분의 데이터 ArrayList
			jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url")); // 직인 이미지 url
			
			// jasper report 초기 설정
			// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
			jasperMainParam.put(JasperReportView.DATA, jasperData);
			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSale"); // 리포트 파일명
			jasperMainParam.put(JasperReportView.FILENAME, "거래 명세서");              // 다운로드시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);              
			return JasperReportView.VIEW_NAME;
		} else {														// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}
	}	
}

