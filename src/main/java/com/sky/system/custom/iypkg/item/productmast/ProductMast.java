package com.sky.system.custom.iypkg.item.productmast;

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
public class ProductMast extends DefaultControlHandler{

	@Autowired
	private ProductMastService service;

	// 조회
	@RequestMapping(value="/custom/iypkg/item/productmast/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	// 룩업
		@RequestMapping(value="/custom/iypkg/item/productmast/get/lookup.do"  )
		public String getLookup(
				HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows,sort));
			return http.writer;
		}

	// 공정조회
	@RequestMapping(value="/custom/iypkg/item/productmast/get/wkctsearch.do"  )
	public String getWkctSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getWkctSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	// 원단조회
	@RequestMapping(value="/custom/iypkg/item/productmast/get/fabcsearch.do"  )
	public String getFabcSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getFabcSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	// 원단조회
	@RequestMapping(value="/custom/iypkg/item/productmast/get/pricSearch.do"  )
	public String getPricSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getPricSearch(http.argument));
		return http.writer;
	}
	// 스코어계산조회
	@RequestMapping(value="/custom/iypkg/item/productmast/get/CalcSearch.do"  )
	public String getCalcSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCalcSearch(http.argument));
		return http.writer;
	}
	// 채번
	@RequestMapping(value="/custom/iypkg/item/productmast/get/ProdCode.do"  )
	public String getProdCode( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProdCode(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/productmast/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	// WKCT(bop)저장
	@RequestMapping(value="/custom/iypkg/item/productmast/set/prodwkct.do"  )
	public String setProdWkct(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setProdWkct(http.argument));
		return http.writer;
	}
	// FABC(BOM)저장
	@RequestMapping(value="/custom/iypkg/item/productmast/set/prodfabc.do"  )
	public String setProdFabc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setProdFabc(http.argument));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/custom/iypkg/item/productmast/get/cstm.do"  )
	public String getCstm( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstm(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/item/productmast/get/cstmlookup.do"  )
	public String getCstmLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstmLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/productmast/set/cstm.do"  )
	public String setCstm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCstm(http.argument));
		return http.writer;
	}
	// 단가 일괄변경
	@RequestMapping(value="/custom/iypkg/item/productmast/set/price.do"  )
	public String setPrice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPrice(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/item/productmast/get/pric.do"  )
	public String getPric( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getPric(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/item/productmast/get/priclookup.do"  )
	public String getPricLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getPricLookup(http.argument, page, rows));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/item/productmast/get/fabcCalc.do"  )
	public String getFabcCalc(
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getFabcCalc(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/productmast/set/pric.do"  )
	public String setPric(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPric(http.argument));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="/custom/iypkg/item/productmast/set/copy.do"  )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/item/productmast/excel.do")
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
					if ("A".equals(colNum)) { item.setParameter("prod_idcd"        , formattedValue.trim()); }
					if ("F".equals(colNum)) { item.setParameter("pqty_pric"        , formattedValue.trim()); }
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				System.out.println(item.getParamText("prod_idcd"));
				System.out.println(item.getParameter("pqty_pric"));
				if(!item.getParamText("prod_idcd").equals("") && item.getParameter("pqty_pric") != null){
					try {
						service.setExcel(http.argument,item);
					} catch (Exception ex) {
						throw new RuntimeException(ex);
					}
					item.clear();
				}
			}
		});
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/item/productmast/excel2.do")
	public String setExcel2(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {

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
					if ("AC".equals(colNum)) { item.setParameter("prod_idcd"        , formattedValue.trim()); }
					if ("AD".equals(colNum)) { item.setParameter("scre_spec"        , formattedValue.trim().replaceAll("[^0-9]","")); }
				}
			}

			// row가 종료될때 호출
			public void endRow() {

				if(!item.getParamText("prod_idcd").equals("") && item.getParameter("scre_spec") != null && !item.getParamText("scre_spec").equals("")
						&& item.getParamText("scre_spec")!=""){
					try {
						System.out.println(Integer.parseInt(item.getParamText("scre_spec")));

						service.setExcel2(http.argument,item);

					} catch (Exception ex) {
						throw new RuntimeException(ex);
					}
					item.clear();
				}
			}
		});
		return http.writer;
	}
	//삭제
	@RequestMapping(value="/custom/iypkg/item/productmast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

}
