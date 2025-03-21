package com.sky.system.stock;

import java.io.InputStream;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.DataMessage;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;

@Controller
public class StockCountPartWork extends DefaultControlHandler{

	@Autowired
	private StockCountPartWorkService service;

	/**
	 * master 조회
	 * 
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartwork/get/search.do")
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
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartwork/get/detail.do")
	public String getDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	
	/**
	 * detail 수정
	 * 
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartwork/set/detail.do")
	public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}

	/**
	 * 엑셀등록
	 * 
	 * @param http
	 * @param model
	 * @param excel
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/stock/stockcountpartwork/set/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {
		
		InputStream excelInputStream = excel.getFiles()[0].getInputStream();
		
		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {0};
		
		ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {

			DataMessage data = http.argument.newStorage("POS");
			
			private int rowNum;
			private String item_code = "";
			private String work_stock = "";

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
				
				// 품목코드
				if ("A".equals(colNum)) {
					item_code = formattedValue;
				}
				// 실사수량
				if ("G".equals(colNum)) {
					work_stock = formattedValue;
				}
			}
			
			// row가 종료될때 호출
			public void endRow() {
				if (rowNum > 0) {
					try {
						service.setExcel(http.argument, data, item_code, work_stock);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		});
		
		return http.writer;
	}
}
