package com.sky.system.basic;

import java.io.InputStream;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class Exchange extends DefaultControlHandler {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ExchangeService service;

	// 조회
	@RequestMapping(value="/basic/exchange/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/basic/exchange/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows ));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/basic/exchange/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
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
	@RequestMapping(value="/basic/exchange/set/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {

		InputStream excelInputStream = excel.getFiles()[0].getInputStream();

		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {0};

//		ExcelUtil.read(excelInputStream, sheetLimit, new ExcelHandler() {
		ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {

			DataMessage data = http.argument.newStorage("POS");

			private int rowNum;
			private String money_dt = "";
			private String money_cd = "";
			private String krw_rate = "";
			private String usd_rate = "";

			// row가 시작될때 호출
			public void startRow(int rowNum) {
				this.rowNum = rowNum;
			}

			// cell의 위치와 cell의 값이 전달된다.
			public void cell(String cellReference, String formattedValue) {

				//logger.debug("cellReference : " + cellReference + "                formattedValue : " + formattedValue);

				Pattern pattern = Pattern.compile("[A-Z]+");
				String colNum = "";

				Matcher matcher = pattern.matcher(cellReference);
				if(matcher.find()) {
					colNum = matcher.group();
				}

				//logger.debug("colNum : " + colNum);

				// 기준일자
				if ("A1".equals(cellReference)) {
					money_dt = formattedValue;
					money_dt = money_dt.substring(11,15)c+ money_dt.substring(16,18)+ money_dt.substring(19,21);
				}

				// 통화코드
				if ("A".equals(colNum)) {
					money_cd = formattedValue;   //'USD'
				}
				// krw_rate
				if ("I".equals(colNum)) {
					krw_rate = formattedValue.replaceAll(",", ""); //콤마제거
				}
				// usd_rate
				if ("J".equals(colNum)) {
					usd_rate = formattedValue.replaceAll(",", ""); //콤마제거
				}

			}

			// row가 종료될때 호출
			public void endRow() {
				if (rowNum >= 3 && rowNum <= 46 ) {
					try {
						logger.debug("data : " + money_cd + "," + money_dt+ "," + krw_rate+ "," + usd_rate);
						service.setExcel(http.argument, data, money_cd, money_dt, krw_rate, usd_rate);
					} catch (Exception ex) {
						//throw ex ;

						throw new RuntimeException(ex);
						//e.printStackTrace();
					}
				}
			}
		});

		return http.writer;
	}
}
