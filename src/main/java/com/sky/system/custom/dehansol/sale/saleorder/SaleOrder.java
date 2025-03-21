package com.sky.system.custom.dehansol.sale.saleorder;

import java.io.InputStream;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;






import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;
@Service("dehansol.SaleOrder")
@Controller
public class SaleOrder extends DefaultControlHandler{

	@Autowired
	private SaleOrderService service;

	//master
		@RequestMapping(value="/custom/dahansol/sale/saleorder/get/search.do")
		public String getSearch( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows , sort));
			return http.writer;
		}

	//search 총합계
		@RequestMapping(value="/custom/dahansol/sale/saleorder/get/SearchSum.do")
		public String getSearchSum( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchSum(http.argument, page, rows , sort));
			return http.writer;
		}

	//검사성적서 , 라벨  , 거래명세서 레포트 파일찾기
		@RequestMapping(value="/custom/dahansol/sale/saleorder/get/insp.do")
		public String getInsp( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getInsp(http.argument, page, rows, sort));
			return http.writer;
		}
		@RequestMapping(value="/custom/dahansol/sale/saleorder/get/report_kind.do")
		public String getReport_Kind( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getReport_Kind(http.argument, page, rows, sort));
			return http.writer;
		}

	//필름수령
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/restore.do"  )
		public String setRestore(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRestore(http.argument ));
			return http.writer ;
	}

	//필름수령
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/film.do"  )
		public String setFilm(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setFilm(http.argument ));
			return http.writer ;
	}

	//필름수령취소
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/film2.do"  )
		public String setFilm2(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setFilm2(http.argument ));
			return http.writer ;
	}

	//라벨저장
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/label.do"  )
		public String setLabel(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setLabel(http.argument ));
			return http.writer ;
	}

	//출고지시
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/release.do"  )
		public String setRelease(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRelease(http.argument ));
			return http.writer;

	}

	//출고취소
			@RequestMapping(value="/custom/dahansol/sale/saleorder/set/releasecancel.do"  )
			public String setReleaseCancel(HttpMessage http, Map<String, Object> model) throws Exception {
				model.put(HttpResponseMessage.RECORDS, service.setReleaseCancel(http.argument ));
				return http.writer;

		}

	//거래명세서
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/invoice.do"  )
		public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument ));
			return http.writer;
		}

	//저장
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/record.do"  )
		public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
			return http.writer;
		}
	//
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/rpst_item.do"  )
		public String setRpst_item(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRpst_item(http.argument));
			return http.writer;
		}
	//거래명세서 발행시 출고지시번호 업데이트
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/ostt_indn_numb.do"  )
		public String setOstt_indn_numb(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setOstt_indn_numb(http.argument));
			return http.writer;
		}

	//삭제
		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/del_yn.do")
		public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
			return http.writer;
		}


		@RequestMapping(value="/custom/dahansol/sale/saleorder/set/copy.do"  )
		public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument ));
			return http.writer;

		}

	/**
	 * 엑셀업로드
	 *
	 * @param http
	 * @param model
	 * @param excel
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value="/custom/dahansol/sale/saleorder/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {

		InputStream excelInputStream = excel.getFiles()[0].getInputStream();

		String  invc_date = http.argument.getParamText("invc_date");
		String  cstm_idcd ;
		cstm_idcd = http.argument.getParamText("cstm_idcd");
		int  numb = Integer.parseInt(http.argument.getParamText("numb"))-1;
		int  chk  = Integer.parseInt(http.argument.getParamText("chk"));


		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {numb};

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
					if(chk==1) {
						item.setParameter("invc_date", invc_date);
						if ("A".equals(colNum)) { item.setParameter("deli_date"        , formattedValue.trim().replaceAll("-", "")); }	// 납기일자
						if ("B".equals(colNum)) { item.setParameter("tool_numb"        , formattedValue.trim()); }		// TOOL번호
						if ("C".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")) {item.setParameter("item_name"      , format);} }	// 품목명
						if ("D".equals(colNum)) { item.setParameter("mesh_bacd"        , formattedValue.trim()); }		// 망사분류코드
						if ("E".equals(colNum)) { item.setParameter("plmk_kind_code"   , formattedValue.trim()); }		// 제판종류
						if ("F".equals(colNum)) { item.setParameter("rpst_item_idcd"   , formattedValue.trim()); }		// 표준품목코드
						if ("G".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")) {item.setParameter("sufc_dvcd"      , format);} }	// 면
						if ("H".equals(colNum)) { item.setParameter("trst_name"        , formattedValue.trim()); }		// 의뢰자명
						if ("I".equals(colNum)) { item.setParameter("invc_qntt"        , formattedValue.trim()); }		// 입고수량
						if ("J".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")) {item.setParameter("otod_istt_cstm" , format);}  }	// 입고업체명
						if ("K".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")) {item.setParameter("base_unit"      , format);}  }	// 단위
						if ("L".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")) {item.setParameter("brcd"           , format);}  }	// 바코드
						if ("M".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")) {item.setParameter("cstm_code"      , format);}  }	// 고객코드
					}//
					if(chk==2){
						item.setParameter("invc_date", invc_date);
						if ("A".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("cstm_code"      , format);} }	// 거래처코드
						if ("B".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("item_name"      , format);} }	// 품목명
						if ("C".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("revs_numb"      , format);} }	// 리비젼번호
						if ("D".equals(colNum)) { item.setParameter("tool_numb"        , formattedValue.trim()); }		// TOOL번호
						if ("E".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("tool_revs"      , format);} }	// TOOL_REV번호
						if ("G".equals(colNum)) { item.setParameter("plmk_kind_code"        , formattedValue.trim()); }	// 제판종류코드
						if ("H".equals(colNum)) { item.setParameter("mesh_bacd"        , formattedValue.trim()); }		// 망사분류코드
						if ("I".equals(colNum)) { item.setParameter("rpst_item_idcd"   , formattedValue.trim()); }		// 표준품목코드
						if ("J".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("sufc_dvcd"      , format);} }	// 면구분코드
						if ("K".equals(colNum)) { item.setParameter("invc_qntt"        , formattedValue.trim()); }		// 입고수량
						if ("M".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("cstm_prod_numb" , format);} }	// 라벨번호
						if ("N".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("trst_name"      , format);} }	// 의뢰자명
						if ("O".equals(colNum)) { item.setParameter("deli_date"        , formattedValue.trim().replaceAll("-", "")); }	// 납기일자
					}
					if(chk==3){
						item.setParameter("invc_date", invc_date);
						if ("A".equals(colNum)) { item.setParameter("cstm_code"        , formattedValue.trim()); }		// 거래처코드
						if ("B".equals(colNum)) { item.setParameter("item_name"        , formattedValue.trim().replaceAll("\"", "'")); }		// 품목명
						if ("C".equals(colNum)) { item.setParameter("revs_numb"        , formattedValue.trim()); }		// 리비젼번호
						if ("D".equals(colNum)) { item.setParameter("tool_numb"        , formattedValue.trim()); }		// TOOL번호
						if ("E".equals(colNum)) { item.setParameter("tool_revs"        , formattedValue.trim()); }		// TOOL_REV번호
						if ("G".equals(colNum)) { item.setParameter("plmk_kind_code"   , formattedValue.trim()); }		// 제판종류
						if ("H".equals(colNum)) { item.setParameter("mesh_bacd"        , formattedValue.trim()); }		// 망사분류코드
						if ("I".equals(colNum)) { item.setParameter("rpst_item_idcd"   , formattedValue.trim()); }		// 표준품목코드
						if ("J".equals(colNum)) { item.setParameter("sufc_dvcd"        , formattedValue.trim()); }		// 면구분코드
						if ("K".equals(colNum)) { item.setParameter("invc_qntt"        , formattedValue.trim()); }		// 수량
						if ("M".equals(colNum)) { item.setParameter("trst_name"        , formattedValue.trim()); }		// 의뢰자명
						if ("N".equals(colNum)) { item.setParameter("deli_date"        , formattedValue.trim().replaceAll("-", "")); }	// 납기일자
					}
					if(chk==4){
						item.setParameter("invc_date", invc_date);
						if ("A".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("cstm_code"      , format);} }	// 거래처코드
						if ("B".equals(colNum)) { item.setParameter("item_name"        , formattedValue.trim().replaceAll("\"", "'")); }	// 품목명
						if ("C".equals(colNum)) { item.setParameter("tool_numb"        , formattedValue.trim()); }		// TOOL번호
						if ("D".equals(colNum)) { item.setParameter("plmk_kind_code"   , formattedValue.trim()); }		// 제판종류
						if ("E".equals(colNum)) { item.setParameter("mesh_bacd"        , formattedValue.trim()); }		// 망사분류코드
						if ("F".equals(colNum)) { item.setParameter("rpst_item_idcd"   , formattedValue.trim()); }		// 표준품목코드
						if ("G".equals(colNum)) { item.setParameter("sufc_dvcd"        , formattedValue.trim()); }		// 면구분코드
						if ("H".equals(colNum)) { item.setParameter("invc_qntt"        , formattedValue.trim()); }		// 수량
						if ("I".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("trst_name"      , format);} }	// 의뢰자명
						if ("J".equals(colNum)) { item.setParameter("deli_date"        , formattedValue.trim().replaceAll("-", "")); }	// 납기일자
						if ("K".equals(colNum)) { item.setParameter("kor2_brcd"        , formattedValue.trim()); }		// 바코드
					}
					if(chk==5){
						item.setParameter("invc_date", invc_date);
						if ("A".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("cstm_code"      , format);} }	// 거래처코드
						if ("B".equals(colNum)) { item.setParameter("item_name"        , formattedValue.trim().replaceAll("\"", "'")); }	// 품목명
						if ("C".equals(colNum)) { item.setParameter("tool_numb"        , formattedValue.trim()); }		// TOOL번호
						if ("D".equals(colNum)) { item.setParameter("plmk_kind_code"   , formattedValue.trim()); }		// 제판종류
						if ("E".equals(colNum)) { item.setParameter("mesh_bacd"        , formattedValue.trim()); }		// 망사분류코드
						if ("F".equals(colNum)) { item.setParameter("rpst_item_idcd"   , formattedValue.trim()); }		// 표준품목코드
						if ("G".equals(colNum)) { item.setParameter("sufc_dvcd"        , formattedValue.trim()); }		// 면구분코드
						if ("H".equals(colNum)) { item.setParameter("invc_qntt"        , formattedValue.trim()); }		// 수량
						if ("I".equals(colNum)) { String format=formattedValue.trim(); if(!format.equals("0")){item.setParameter("trst_name"      , format);} }	// 의뢰자명
						if ("J".equals(colNum)) { item.setParameter("deli_date"        , formattedValue.trim().replaceAll("-", "")); }	// 납기일자
						if ("K".equals(colNum)) { item.setParameter("kor2_brcd"        , formattedValue.trim()); }		// 바코드
					}
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				if (chk==1 && rowNum >=  1 && !"".equals(item.getParamText("tool_numb"))&& !"0".equals(item.getParamText("tool_numb")) ){
					try {
						int chk =1;
						String bacd= service.getMeshBacd(http.argument, item.getParamText("mesh_bacd") );
						String plmk= service.getPlmkKind(http.argument, item.getParamText("plmk_kind_code") );
						service.setExcel(http.argument	, item, bacd , plmk, chk);
					} catch (Exception ex) {
						throw new RuntimeException(ex);
					}
					item.clear();
				}if (chk==2 && rowNum >=  1 && !"".equals(item.getParamText("tool_numb"))&& !"0".equals(item.getParamText("tool_numb"))){
					try {
						int chk = 2;
						String bacd= service.getMeshBacd(http.argument, item.getParamText("mesh_bacd") );
						String plmk= service.getPlmkKind(http.argument, item.getParamText("plmk_kind_code") );
						service.setExcel(http.argument	, item ,bacd , plmk , chk );
					} catch (Exception ex) {
						throw new RuntimeException(ex);
					}
					item.clear();
				}if (chk==3 && rowNum >=  1 && !"".equals(item.getParamText("plmk_kind_code"))){
					try {
						int chk = 3;
						item.setParameter("cstm_idcd", cstm_idcd);
						String bacd= service.getMeshBacd(http.argument, item.getParamText("mesh_bacd") );
						String plmk= service.getPlmkKind(http.argument, item.getParamText("plmk_kind_code") );
						service.setExcel(http.argument	, item , bacd , plmk , chk );
					} catch (Exception ex) {
						throw new RuntimeException(ex);
					}
					item.clear();
				}
				if (chk==4 && rowNum >=  1 && !"".equals(item.getParamText("plmk_kind_code"))){
					try {
						int chk = 4;
						String bacd= service.getMeshBacd(http.argument, item.getParamText("mesh_bacd") );
						String plmk= service.getPlmkKind(http.argument, item.getParamText("plmk_kind_code") );
						service.setExcel(http.argument	, item , bacd , plmk , chk );
					} catch (Exception ex) {
						throw new RuntimeException(ex);
					}
					item.clear();
				}
				if (chk==5 && rowNum >=  1 && !"".equals(item.getParamText("plmk_kind_code"))){
					try {
						int chk = 5;
						String bacd= service.getMeshBacd(http.argument, item.getParamText("mesh_bacd") );
						String plmk= service.getPlmkKind(http.argument, item.getParamText("plmk_kind_code") );
						service.setExcel(http.argument	, item , bacd , plmk , chk );
					} catch (Exception ex) {
						throw new RuntimeException(ex);
					}
					item.clear();
				}
			}
		});
		return http.writer;
	}
}

