package com.sky.system.stock.etcosttwork;

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
public class EtcOsttWork extends DefaultControlHandler{

	@Autowired
	private EtcOsttWorkService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/etcosttwork/get/search.do")
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
	@RequestMapping(value="/stock/etcosttwork/get/detail.do")
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
	@RequestMapping(value="/stock/etcosttwork/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}


	//출고내역 마감/해지
	@RequestMapping(value="/stock/etcosttwork/set/close.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument));
		return http.writer;
	}

	/**
	 * invoice 등록/수정/삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/etcosttwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	/**
	 * 삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/etcosttwork/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	/**
	 * 상품검색
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/etcosttwork/get/product.do")
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
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
	@RequestMapping(value="/stock/etcosttwork/get/printing.do")
	public String getPrinting(HttpMessage http, Map jasperMainParam) throws Exception {

		SqlResultMap map = service.getPrinting(http.argument);
		boolean isReport = Boolean.valueOf(http.argument.getParamText("isReport"));

		// PDF프린트 요청이 온경우(jasper report)
		if (isReport) {
			Map  invoice = map.get(0);
			List product = (List)invoice.get("product");

			Map jasperData = new HashMap();
			jasperData.put(JasperReportView.TITLE, "기타출고 명세서");
			jasperData.put(JasperReportView.INVOICE, invoice);
			jasperData.put(JasperReportView.PRODUCT, product);
			jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url"));

			// jasper report 초기 설정
			// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
			jasperMainParam.put(JasperReportView.DATA, jasperData);
			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceMove");	// 리포트 파일명
			jasperMainParam.put(JasperReportView.FILENAME, "기타출고 명세서");				// 다운로드 시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
			return JasperReportView.VIEW_NAME;
		}
		// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
		else {
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}
	}

//	// 룩업
//		@RequestMapping(value="/stock/etcosttwork/get/lookup.do"  )
//		public String getLookup(
//				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//				HttpMessage http, Map<String, Object> model) throws Exception {
//
//			model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
//			return http.writer;
//		}

}
