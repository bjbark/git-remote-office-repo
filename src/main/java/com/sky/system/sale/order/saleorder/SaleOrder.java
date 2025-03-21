package com.sky.system.sale.order.saleorder;

import java.io.InputStream;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;

@Controller
public class SaleOrder extends DefaultControlHandler{

	@Autowired
	private SaleOrderService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/order/saleorder/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/sale/order/saleorder/get/lookup.do")
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
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
	@RequestMapping(value="/sale/order/saleorder/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/order/saleorder/get/detail2.do"  )
	public String getDetail4(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort ));
		return http.writer;
	}


	/**
	 * invoice 조회
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/order/saleorder/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}


	// 마감 / 해지 수정
	@RequestMapping(value="/sale/order/saleorder/set/close.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/sale/order/saleorder/set/stps.do"  )
	public String setStps(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setStps(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/order/saleorder/set/copy.do"  )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/order/saleorder/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/order/saleorder/set/pror.do"  )
	public String setPror(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPror(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/order/saleorder/set/prorupdate.do"  )
	public String setProrUpdate(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.prorUpdate(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/order/saleorder/set/duplicatecheck.do"  )
	public String duplicatecheck(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.duplicatecheck(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/order/saleorder/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;

	}



	/**
	 * invoice 등록/수정/삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/order/saleorder/set/invoice.do"  )
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
	@RequestMapping(value="/sale/order/saleorder/set/del_yn.do")
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
	@RequestMapping(value="/sale/order/saleorder/get/product.do")
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/order/saleorder/get/seqn.do"  )
	public String getSeqn( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/order/saleorder/set/consulting.do"  )
	public String setConsulting(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setConsulting(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/order/saleorder/set/result.do"  )
	public String setResult(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setResult(http.argument));
		return http.writer;
	}

	/**
	 * 광일테크 엑셀업로드
	 *
	 * @param http
	 * @param model
	 * @param excel
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/sale/order/saleorder/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {

		InputStream excelInputStream = excel.getFiles()[0].getInputStream();

		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {0};

		ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {


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
					if ("A".equals(colNum)) { item.setParameter("invc_date"        , formattedValue.trim().replaceAll("-", "")); }	//  수주일자
					if ("B".equals(colNum)) { item.setParameter("cstm_idcd"        , formattedValue.trim()); }		// 거래처코드
					if ("D".equals(colNum)) { item.setParameter("item_idcd"        , formattedValue.trim()); }		// 품목코드
					if ("G".equals(colNum)) { item.setParameter("deli_date"        , formattedValue.trim().replaceAll("-", "")); }	// 납기일자
					if ("H".equals(colNum)) { item.setParameter("invc_qntt"        , formattedValue.trim().replaceAll(",", "").replaceAll("\\*", ""));   }		// 수량
					if ("I".equals(colNum)) { item.setParameter("invc_pric"        , formattedValue.trim().replaceAll(",", "").replaceAll("\\*", ""));   }		// 단가
					if ("J".equals(colNum)) { item.setParameter("cstm_lott_numb"   , formattedValue.trim()); }		// 고객 LOT 번호
					if ("K".equals(colNum)) { item.setParameter("cstm_offr_date"   , formattedValue.trim().replaceAll("-", "")); }	// 고객발주일자
					if ("L".equals(colNum)) { item.setParameter("cstm_deli_date"   , formattedValue.trim().replaceAll("-", "")); }	// 고객납기일자
					if ("M".equals(colNum)) { item.setParameter("dlvy_cstm_idcd"   , formattedValue.trim()); }		// 납품처명
					if ("N".equals(colNum)) { item.setParameter("user_memo"        , formattedValue.trim()); }		// 비고
				}
			}

			// row가 종료될때 호출
			public void endRow() { System.out.println(item.toString());
				if (rowNum >=  1 && !"".equals(item.getParamText("invc_date")) && !"0".equals(item.getParamText("invc_date") )){
					try {
						String cstm = "";
						if(!"".equals(item.getParamText("dlvy_cstm_idcd"))){
							cstm= service.getCstmIdcd(http.argument, item.getParamText("dlvy_cstm_idcd") );
						}else{
							cstm = item.getParamText("cstm_idcd");
						}
						service.setExcel(http.argument	, item , cstm );
						item.clear();
					} catch (Exception ex) {
							//throw ex ;
						ex.printStackTrace();
						throw new RuntimeException(ex);
					}
				}
			}
		});
		return http.writer;
	}

	// 배송지 추가 등록
	@RequestMapping(value="/sale/order/saleorder/set/deliveryaddress.do"  )
	public String setDeliveryAddress (HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeliveryAddress(http.argument));
		return http.writer;
	}


}
