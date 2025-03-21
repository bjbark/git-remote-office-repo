package com.sky.system.custom.kortc.sale.order.sordermast;

import java.io.InputStream;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Date;

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
public class SorderMast extends DefaultControlHandler{

	@Autowired
	private SorderMastService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/lookup.do")
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
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/detail2.do"  )
	public String getDetail2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/detail4.do"  )
	public String getDetail4(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail4(http.argument, page, rows, sort ));
		return http.writer;
	}


	/**
	 * invoice 조회
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	// 마감 / 해지 수정
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/close.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/stps.do"  )
	public String setStps(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setStps(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/copy.do"  )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/ok.do"  )
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
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/detail4.do")
	public String setDetail4(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail4(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/fileUpload.do"  )
	public String setFileupload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFileupload(http.argument, uploadItem));
		return http.writer;
		}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}

	/**
	 * 삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/del_yn.do")
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
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/product.do")
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/seqn.do"  )
	public String getSeqn( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/consulting.do"  )
	public String setConsulting(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setConsulting(http.argument));
		return http.writer;
	}

	//Max Amend 구하기
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/get/orderInfo.do"  )
	public String getOrderInfo(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderInfo(http.argument));
		return http.writer;
	}

	/**
	 * 코르텍 엑셀업로드
	 *
	 * @param http
	 * @param model
	 * @param excel
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/kortc/sale/order/sordermast/excel.do")
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
					if ("A".equals(colNum)) { item.setParameter("item_code"        , formattedValue.trim()); }	// 품번
					if ("E".equals(colNum)) { item.setParameter("invc_qntt"        , formattedValue.trim().replaceAll(",", "").replaceAll("\\*", ""));   }	// 수량
					if ("H".equals(colNum)) { item.setParameter("deli_date2"       , formattedValue.trim().replaceAll("-", "")); }	// 납기일자
					if ("K".equals(colNum)) { item.setParameter("cstm_lott_numb"   , formattedValue.trim()); }	// 고객 LOT 번호
					if ("L".equals(colNum)) { item.setParameter("invc_pric"        , formattedValue.trim().replaceAll(",", "").replaceAll("\\*", ""));   }	// 단가
					if ("P".equals(colNum)) { item.setParameter("invc_date"        , formattedValue.trim().replaceAll("-", "")); }	// 발주일자
					if ("Q".equals(colNum)) { item.setParameter("chk"              , formattedValue.trim()); }	// ARRIV_QTY
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				System.out.println("@@@@@@@@@@@@@@@"+item.getParamText("invc_date"));
				if (rowNum >=  1 && !"".equals(item.getParamText("item_code")) && !"0".equals(item.getParamText("cstm_lott_numb")) && "0".equals(item.getParamText("chk"))){
					try {
						String item_idcd = "";
						if(!"".equals(item.getParamText("item_code")) ){
							item_idcd = service.getItemIdcd(http.argument, item.getParamText("item_idcd") );
						}else {
							item_idcd = item.getParamText("item_code");
						}
						service.setExcel(http.argument	, item , item_idcd);
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

//	@RequestMapping(value="/custom/kortc/sale/order/sordermast/set/result.do"  )
//	public String setResult(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setResult(http.argument));
//		return http.writer;
//	}

}
