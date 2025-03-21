package com.sky.system.sale.order.saleorder2;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.core.common.report.JasperReportView;
import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;

@Controller
public class SaleOrder2 extends DefaultControlHandler{

	@Autowired
	private SaleOrder2Service service;

	//master
	@RequestMapping(value="/sale/order/saleorder2/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	//lookup
	@RequestMapping(value="/sale/order/saleorder2/get/lookup.do")
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
			return http.writer;
	}

	//detail
	@RequestMapping(value="/sale/order/saleorder2/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	//invoice
	@RequestMapping(value="/sale/order/saleorder2/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}


	// 마감 / 해지 수정
	@RequestMapping(value="/sale/order/saleorder2/set/close.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}

	//출하지시
	@RequestMapping(value="/sale/order/saleorder2/set/stps.do"  )
	public String setStps(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setStps(http.argument ));
		return http.writer;

	}

	//수주복사
	@RequestMapping(value="/sale/order/saleorder2/set/copy.do"  )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument ));
		return http.writer;

	}

	//승인/승인해지
	@RequestMapping(value="/sale/order/saleorder2/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/order/saleorder2/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/sale/order/saleorder2/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/order/saleorder2/get/product.do")
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	//엑셀등록
	@RequestMapping(value="/sale/order/saleorder2/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {

		InputStream excelInputStream = excel.getFiles()[0].getInputStream();
		InputStream temp = excel.getFiles()[0].getInputStream();

		XSSFWorkbook workbook = new XSSFWorkbook(temp);
		int cntSheets = workbook.getNumberOfSheets();
		temp.close();						// ExcelParser에서도 사용해서 두번 사용못함 닫아줘야함
//		 0번 index에 있는 sheet 내용만 읽어온다.
		for (int i = 0; i < cntSheets; i++) {
			Object[] sheetLimit = {i};

			ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {

			//ExcelUtil.read(excelInputStream, sheetLimit, new ExcelHandler() {

				private DataMessage  data = http.argument.newStorage("POS");
				private SqlResultRow item = new SqlResultRow();

				private int rowNum;


				// row가 시작될때 호출
				public void startRow(int rowNum) {
					this.rowNum = rowNum;

				}

				// cell의 위치와 cell의 값이 전달된다.
				public void cell(String cellReference, String formattedValue) {

					Pattern pattern = Pattern.compile("[A-Z]+");
					String colNum = "";

					Matcher matcher = pattern.matcher(cellReference);
					if(matcher.find()) {
						colNum = matcher.group();
					}
					if (rowNum >= 1) {
						if ("A".equals(colNum)) { item.setParameter("invc_numb"        , formattedValue.trim()); }		// 작업지시번호
						if ("B".equals(colNum)) { item.setParameter("cstm_lott_numb"   , formattedValue.trim()); }		// LOT번호
						if ("C".equals(colNum)) { item.setParameter("item_idcd"        , formattedValue.trim()); }		// 품목코드
						if ("D".equals(colNum)) { item.setParameter("item_name"        , formattedValue.trim()); }		// 품목명
						if ("E".equals(colNum)) { item.setParameter("item_spec"        , formattedValue.trim()); }		// 품목규격
						if ("F".equals(colNum)) { item.setParameter("invc_qntt"        , formattedValue.trim().replaceAll(",", "")); }		// 발주수량
						if ("G".equals(colNum)) { item.setParameter("upid_qntt"        , formattedValue.trim().replaceAll(",", "")); }		// 미납수량
						if ("H".equals(colNum)) { item.setParameter("deli_date"        , formattedValue.trim()); }		// (협력사)변경납기일
						if ("I".equals(colNum)) { item.setParameter("cstm_offr_date"   , formattedValue.trim()); }		// 발주일자
						if ("J".equals(colNum)) { item.setParameter("cstm_deli_date"   , formattedValue.trim()); }		// 납기일자
						if ("K".equals(colNum)) { item.setParameter("cstm_drtr_name"   , formattedValue.trim()); }		// 담당자명
						if ("L".equals(colNum)) { item.setParameter("remk_text"        , formattedValue.trim()); }		// 후공정처
						if ("M".equals(colNum)) { item.setParameter("user_memo"        , formattedValue.trim()); }		// 발주품목비고
						if ("N".equals(colNum)) { item.setParameter("deli_chge_resn"   , formattedValue.trim()); }		// 협력사변경사유
						if ("O".equals(colNum)) { item.setParameter("invc_pric"        , formattedValue.trim().replaceAll(",", "")); }		// 단가
						if ("P".equals(colNum)) { item.setParameter("sply_amnt"        , formattedValue.trim().replaceAll(",", "")); }		// 금액
						if ("Q".equals(colNum)) { item.setParameter("stat"             , formattedValue.trim().replaceAll(" ", "")); }		// 발주상태
						if ("R".equals(colNum)) { item.setParameter("acpt_stat_dvcd"   , formattedValue.trim()); }		// 발주상태
						if ("S".equals(colNum)) { item.setParameter("line_clos"        , formattedValue.trim()); }		// 발주상태
					}
				}

				// row가 종료될때 호출
				public void endRow() {
					if (rowNum >=  1  && !"".equals(item.getParamText("invc_numb"))){  // 제목1줄 제외
						try {
							service.setExcel(http.argument	, data, item);
						} catch (Exception ex) {
								//throw ex ;
							throw new RuntimeException(ex);
						}
					}
					item.clear();
				}
			});
		}
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
	@RequestMapping(value="/sale/order/saleorder2/get/printing.do")
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

}
