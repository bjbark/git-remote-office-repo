package com.sky.system.sale.spts.sptsmast;

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
public class SptsMast extends DefaultControlHandler{

	@Autowired
	private SptsMastService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/spts/sptsmast/get/search.do")
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
	@RequestMapping(value="/sale/spts/sptsmast/get/detail.do")
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
	@RequestMapping(value="/sale/spts/sptsmast/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	//출하등록 invoice
	@RequestMapping(value="/sale/spts/sptsmast/get/invoice2.do")
	public String getInvoice2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice2(http.argument));
		return http.writer;
	}

	// 출하등록 invoice 저장
	@RequestMapping(value="/sale/spts/sptsmast/set/invoice2.do"  )
	public String setInvoice2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice2(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/sale/spts/sptsmast/set/stps.do"  )
	public String setStps(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setStps(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/spts/sptsmast/get/insp.do"  )
	public String getInsp( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getInsp(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/sale/spts/sptsmast/set/stpscancle.do"  )
	public String setStpsCancle(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setStpsCancle(http.argument ));
		return http.writer;

	}


	/**
	 * 상품검색
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/spts/saleorder2/get/product.do")
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/spts/sptsmast/get/searchspts.do")
	public String getSearchSpts( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchSpts(http.argument, page, rows, sort));
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
	@RequestMapping(value="/sale/spts/sptsmast/get/detailspts.do")
	public String getDetailSpts(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetailSpts(http.argument));
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
	@RequestMapping(value="/sale/spts/sptsmast/get/printing.do")
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

	//삼정 납품처 변경
	@RequestMapping(value="/sale/spts/sptsmast/set/change.do"  )
	public String setChange(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setChange(http.argument));
		return http.writer;
	}

}
