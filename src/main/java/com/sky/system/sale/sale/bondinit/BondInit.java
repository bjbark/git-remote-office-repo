package com.sky.system.sale.sale.bondinit;

import java.io.InputStream;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;

@Service("sjflv.BondInit")
@Controller
public class BondInit  extends DefaultControlHandler{

	@Autowired
	private BondInitService service;

	@RequestMapping(value="sale/sale/bondinit/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}

	//저장
	@RequestMapping(value="sale/sale/bondinit/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 택배 송장번호 업로드 - 삼정
		@RequestMapping(value="sale/sale/bondinit/set/excel.do")
		public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {
			InputStream excelInputStream = excel.getFiles()[0].getInputStream();
			Object[] sheetLimit = {0};

			String invc_date = http.argument.getParamText("invc_date");

			System.out.println("%%%%%%%%%%%%%"+invc_date);

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
						item.setParameter("trns_yymm", invc_date);
						if ("A".equals(colNum)) { item.setParameter("cstm_idcd"			, formattedValue.trim().replaceAll("-", ""));  }  //사업자번
						if ("B".equals(colNum)) { item.setParameter("txbl_amnt"			, formattedValue.trim()); }      // 이월금액}
					}

				}

				// row가 종료될때 호출
				public void endRow() {
					if (rowNum >=  1) {
						try {
							String cstm= service.getCstm(http.argument, item.getParamText("cstm_idcd") );
							service.setExcelUpload(http.argument , item , cstm);
						} catch (Exception ex) {
							throw new RuntimeException(ex);
						}finally{
						}
						item.clear();
					}
				}
			});
			return http.writer;
		}
}