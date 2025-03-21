package com.sky.system.cost.stndcost;


import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;

@Controller
public class StndCost extends DefaultControlHandler {

	@Autowired
	private StndCostService service;
	// 조회
	@RequestMapping(value="/cost/stndcost/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/cost/stndcost/set/record.do"  )
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
	@RequestMapping(value="/cost/stndcost/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {

		InputStream excelInputStream = excel.getFiles()[0].getInputStream();
		String  stnd_date = http.argument.getParamText("stnd_date");
		System.out.println(stnd_date);

		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {0};


//		SqlResultMap map = new SqlResultMap();
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
					item.setParameter("stnd_date", stnd_date);
					if ("B".equals(colNum)) { item.setParameter("mold_idcd"        , formattedValue.trim()); }		// 금형번호
					if ("E".equals(colNum)) { item.setParameter("used_tons"        , formattedValue.trim().replaceAll("T", "").replaceAll("전동", "")); }		// 톤수
					if ("F".equals(colNum)) { item.setParameter("mtrl_bacd"        , formattedValue.trim()); }		// 재질
					if ("H".equals(colNum)) { item.setParameter("runr_wigt"        , formattedValue.trim()); }		// 런너중량
					if ("I".equals(colNum)) { item.setParameter("prod_wigt"        , formattedValue.trim()); }		// 제품중량
					if ("M".equals(colNum)) { item.setParameter("need_mnhr"        , formattedValue.trim()); }		// 소요공수
					if ("N".equals(colNum)) { item.setParameter("mtrl_wdrw_rate"   , formattedValue.trim()); }		// 재료회수율(분쇄비율)
					if ("O".equals(colNum)) { item.setParameter("mtrl_cost"        , formattedValue.trim()); }		// 재료비
					if ("P".equals(colNum)) { item.setParameter("labo_cost"        , formattedValue.trim().replaceAll(",", "")); }	// 노무비
					if ("Q".equals(colNum)) { item.setParameter("udir_labo_nonn"   , formattedValue.trim()); }		// 임율(관리비)
					if ("R".equals(colNum)) { item.setParameter("cost_ttsm"        , formattedValue.trim()); }		// 원가합계
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				if (rowNum >=  1  && !"".equals(item.getParamText("stnd_date"))){// 제목1줄 제외
					if( item.getParameter("mold_idcd")== null) return;
					try {
						System.out.println("************item*********** : "+item);
						service.setExcel(http.argument	, data, item);
					} catch (Exception ex) {
							//throw ex ;
						throw new RuntimeException(ex);
							//e.printStackTrace();
					}
				}
				item.clear();
			}
		});
		return http.writer;
	}

}

