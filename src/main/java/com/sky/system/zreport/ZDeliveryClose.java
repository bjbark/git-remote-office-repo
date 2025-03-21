
package com.sky.system.zreport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sky.core.common.configuration.Configure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.core.common.excel.ExcelView;
import com.sky.core.common.report.JasperReportView;

import net.sky.http.dispatch.control.DefaultControlHandler;

import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class ZDeliveryClose extends DefaultControlHandler{
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private Configure configure;

	@Autowired
	private ZDeliveryCloseService service;

	// 조회
	@RequestMapping(value="/zreport/deliveryclose/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}


	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/zreport/deliveryclose/export/nodelivery.do")
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
	@RequestMapping(value="/zreport/deliveryclose/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	// 미처리 현황 상세 조회
	@RequestMapping(value="/zreport/deliveryclose/get/nodelivery.do"  )
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
	@RequestMapping(value="/zreport/deliveryclose/get/nodeliveryitem.do")
	public String getNoDeliveryItem(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getNoDeliveryItem(http.argument));
		return http.writer;
	}

	// 상품별 조회
	@RequestMapping(value="/zreport/deliveryclose/get/itemlist.do"  )
	public String getItemList( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemList(http.argument, page, rows, sort));
		return http.writer;
	}




	// 상품별 집계 조회
	@RequestMapping(value="/zreport/deliveryclose/get/itemgroup.do"  )
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
	@RequestMapping(value="/zreport/deliveryclose/export/itemgroup.do")
	public String getExportItemGroup(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
		model.put(ExcelView.ROWS, service.getItemGroup(http.argument,0, 0,"") );
		return ExcelView.VIEW_NAME;
	}


	// 매출마감, 마감취소
	@RequestMapping(value="/zreport/deliveryclose/set/master.do"  )
	public String  setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}



	// 송장번호 입력'
	@RequestMapping(value="/zreport/deliveryclose/set/taekbae.do"  )
	public String  setTaekbae(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTaekbae(http.argument));
		return http.writer;
	}

	// 거래명세표 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/zreport/deliveryclose/get/printing.do"  )
	public String getPrinting(HttpMessage http, HttpServletResponse response, Map jasperMainParam) throws Exception {
//		System.out.println("http ===="+http.argument);
//		System.out.println("http subject ===="+http.argument.getParamText("subject") );
;		// PDF프린트 요청이 온경우(jasper report)
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
//			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSale_A3"); // 리포트 파일명 - A3 * 2
			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSale"); // 리포트 파일명
			jasperMainParam.put(JasperReportView.FILENAME, "거래 명세서");              // 다운로드시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
			return JasperReportView.VIEW_NAME;
		} else {														// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
			if ( (int)Double.parseDouble( (String)map.get(0).get("store_gb"))   < 3 ){ /* 양식지이고 본사/직영이면 공급자사업자번호에 출고사업장명 표시 */
				map.get(0).setParameter("send_biz_no", map.get(0).get("send_biz_no") + " (" + map.get(0).get("stor_nm") + ")" );
			}
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}
	}


	// 견적서 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/zreport/deliveryclose/get/printing_esti.do"  )
	public String getPrintingEsti(HttpMessage http, HttpServletResponse response, Map jasperMainParam) throws Exception {
//		System.out.println("http ===="+http.argument);
//		System.out.println("http subject ===="+http.argument.getParamText("subject") );
;		// PDF프린트 요청이 온경우(jasper report)
		SqlResultMap map = service.getPrinting(http.argument);

		boolean isReport = Boolean.valueOf(http.argument.getParamText("isReport"));
		if(isReport) { // PDF프린트 요청이 온경우(jasper report)
			Map invoice = map.get(0); // invoice
			List product = (List)invoice.get("product");  // detail의 목록

			Map jasperData = new HashMap();
			jasperData.put(JasperReportView.TITLE, "견   적   서"); // 레포트의 타이틀명
			jasperData.put(JasperReportView.INVOICE, invoice);      // 일자, 등록번호, 상호, 주소와 같은 detail 정보 Map
			jasperData.put(JasperReportView.PRODUCT, product); // detail부분의 데이터 ArrayList
			jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url")); // 직인 이미지 url

			// jasper report 초기 설정
			// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
			jasperMainParam.put(JasperReportView.DATA, jasperData);
			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSale"); // 리포트 파일명
			jasperMainParam.put(JasperReportView.FILENAME, "견   적   서");              // 다운로드시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
			return JasperReportView.VIEW_NAME;
		} else {														// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}
	}


	// 납품서 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/zreport/deliveryclose/get/printing_deli.do"  )
	public String getPrintingDeli(HttpMessage http, HttpServletResponse response, Map jasperMainParam) throws Exception {
//		System.out.println("http ===="+http.argument);
//		System.out.println("http subject ===="+http.argument.getParamText("subject") );
;		// PDF프린트 요청이 온경우(jasper report)
		SqlResultMap map = service.getPrinting(http.argument);

		boolean isReport = Boolean.valueOf(http.argument.getParamText("isReport"));
		if(isReport) { // PDF프린트 요청이 온경우(jasper report)
			Map invoice = map.get(0); // invoice
			List product = (List)invoice.get("product");  // detail의 목록

			Map jasperData = new HashMap();
			jasperData.put(JasperReportView.TITLE, "납   품   서"); // 레포트의 타이틀명
			jasperData.put(JasperReportView.INVOICE, invoice);      // 일자, 등록번호, 상호, 주소와 같은 detail 정보 Map
			jasperData.put(JasperReportView.PRODUCT, product); // detail부분의 데이터 ArrayList
			jasperData.put(JasperReportView.STAMP_URL, invoice.get("stamp_url")); // 직인 이미지 url

			// jasper report 초기 설정
			// 위에서 set했던 jasperData들을 "data"라는 이름으로 view에 전달해야 report가 생성된다.
			jasperMainParam.put(JasperReportView.DATA, jasperData);
			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSale"); // 리포트 파일명
			jasperMainParam.put(JasperReportView.FILENAME, "납   품   서");              // 다운로드시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
			return JasperReportView.VIEW_NAME;
		} else {														// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}
	}


	// 거래명세표 집계 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/zreport/deliveryclose/get/printing_group.do"  )
	public String getPrintingGroup(HttpMessage http, HttpServletResponse response, Map jasperMainParam) throws Exception {
//		System.out.println("http ===="+http.argument);
//		System.out.println("http subject ===="+http.argument.getParamText("subject") );
;		// PDF프린트 요청이 온경우(jasper report)
		SqlResultMap map = service.getPrintingGroup(http.argument);

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
			jasperMainParam.put(JasperReportView.JASPER, "jasper/invoice/InvoiceSaleGroup"); // 리포트 파일명
			jasperMainParam.put(JasperReportView.FILENAME, "거래 명세서");              // 다운로드시 파일명
			jasperMainParam.put(JasperReportView.HTTP_MESSAGE, http);
			return JasperReportView.VIEW_NAME;
		} else {
			if ( (int)Double.parseDouble( (String)map.get(0).get("store_gb"))   < 3 ){ /* 양식지이고 본사/직영이면 공급자사업자번호에 출고사업장명 표시 */
				map.get(0).setParameter("send_biz_no", map.get(0).get("send_biz_no") + " (" + map.get(0).get("stor_nm") + ")" );
			}
			// 좌표 출력을 하기위해 json으로만 데이터를 받는 경우
			jasperMainParam.put(HttpResponseMessage.RECORDS, map);
			return http.writer;
		}
	}


	// 거래명세서 * 2 출력
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/zreport/deliveryclose/get/printing_a5.do"  )
	public String getPrintingA5(HttpMessage http, HttpServletResponse response, Map jasperMainParam, HttpServletRequest request) throws Exception {

		// PDF프린트 요청이 온경우(jasper report)
		SqlResultMap map = service.getPrintingA5(http.argument);

		boolean isReport = Boolean.valueOf(http.argument.getParamText("isReport"));
		if(isReport) { // PDF프린트 요청이 온경우(jasper report)
			Map invoice = map.get(0); // invoice
			List product = (List)invoice.get("product");  // detail의 목록

			Map jasperData = new HashMap();
			jasperData.put(JasperReportView.TITLE, "거 래 명 세 서"); // 레포트의 타이틀명
			jasperData.put(JasperReportView.INVOICE, invoice);      // 일자, 등록번호, 상호, 주소와 같은 detail 정보 Map
			 // 서브레포트가 있는 디렉터리 (반드시 절대경로로 해야한다 그래야 jasper에서 인식함)
			jasperData.put(JasperReportView.SUBREPORT_DIR, request.getSession().getServletContext().getRealPath(configure.JASPER_DIR + "/jasper/invoice") );

//			// 공급가액
//			StringBuilder subtotalSb = new StringBuilder();
//			String sply_amt = StringUtil.isNullToDefault(invoice.get("sply_amt"), "");
//
//			for(int i=0, size=sply_amt.length(); i<size; i++) {
//				subtotalSb.append("  ");
//				subtotalSb.append(sply_amt.charAt(i));
//			}
//			invoice.put("sply_amt", subtotalSb.toString().replaceAll("\\..*", ""));
//
//			// 세액
//			StringBuilder taxSb = new StringBuilder();
//			String tax = StringUtil.isNullToDefault(invoice.get("tax"), "");
//
//			for(int i=0, size=tax.length(); i<size; i++) {
//				taxSb.append("  ");
//				taxSb.append(tax.charAt(i));
//			}
//			invoice.put("tax", taxSb.toString().replaceAll("\\..*", ""));

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
			jasperMainParam.put(JasperReportView.JASPER,     "jasper/invoice/InvoiceSale_A3"); // 리포트 파일명

			jasperMainParam.put(JasperReportView.FILENAME, "거래명세서");                   // 다운로드시 파일명
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

