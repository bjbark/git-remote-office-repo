package com.sky.system.custom.sjflv.stock.isos.ostttnrtmast;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;
@Service("sjflv.OsttTrntMast")
@Controller
public class OsttTrntMast  extends DefaultControlHandler{


	@Autowired
	private OsttTrntMastService service;


	@RequestMapping(value="/custom/sjflv/stock/ostttrntmast/get/master1.do"  )
	public String getMaster1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/ostttrntmast/get/detail1.do"  )
	public String getDetail1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/ostttrntmast/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 택배 송장번호 업로드 - 삼정향료
	@RequestMapping(value="/custom/sjflv/stock/ostttrntmast/set/excelSJFLV.do")
	public String setExcelSJFLV(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {
		InputStream excelInputStream = excel.getFiles()[0].getInputStream();
		Object[] sheetLimit = {0};

		String invc_date = http.argument.getParamText("invc_date");
		service.delExcelUpload(http.argument, invc_date);

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

				if (rowNum >= 3) {
					if ("D".equals(colNum)) { item.setParameter("dlvy_dinv_numb"	, formattedValue.trim()); }      // 베송송장번호
					if ("E".equals(colNum)) { item.setParameter("dlvy_rcpt_hmlf"	, formattedValue.trim()); }      // 베송수신인명
					if ("F".equals(colNum)) { item.setParameter("dlvy_tele_numb"	, formattedValue.trim()); }      // 베송전화번호
					if ("G".equals(colNum)) { item.setParameter("dlvy_hdph_numb"	, formattedValue.trim()); }      // 베송전화번호
					if ("H".equals(colNum)) { item.setParameter("dlvy_addr_1fst"	, formattedValue.trim()); }      // 배송주소1
					if ("J".equals(colNum)) { item.setParameter("dlvy_qntt"			, formattedValue.trim()); }      // 베송수량
					if ("M".equals(colNum)) { item.setParameter("dlvy_exps"			, formattedValue.trim()); }      // 베송비용
					if ("S".equals(colNum)) { item.setParameter("dlvy_brch_name"	, formattedValue.trim()); }      // 베송지점
					if ("V".equals(colNum)) { item.setParameter("hdli_dinv_qntt"	, formattedValue.trim()); }      // 택배송장수량
					if ("W".equals(colNum)) { item.setParameter("dlvy_memo"			, formattedValue.trim()); }      // 배송메모

					if ("J".equals(colNum) || "M".equals(colNum) || "V".equals(colNum)) {
						if (!formattedValue.trim().matches("[+-]?\\d*(\\.\\d+)?")) {
							throw new ServiceException("등록하신 자료의 " + colNum + "컬럼 형식에 오류가 있습니다. 숫자로 입력하세요.");
						}
					}
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				if (rowNum >=  3) {
					try {
						item.setParameter("invc_numb"		, invc_date + '-' + String.format("%04d", (rowNum - 2)));
						item.setParameter("invc_date"		, invc_date);

						service.setExcelUpload(http.argument , item);
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

	// 택배 송장번호 업로드 - 삼정
	@RequestMapping(value="/custom/sjflv/stock/ostttrntmast/set/excelSJUNG.do")
	public String setExcelSJUNG(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {
		InputStream excelInputStream = excel.getFiles()[0].getInputStream();
		Object[] sheetLimit = {0};

		String invc_date = http.argument.getParamText("invc_date");
		service.delExcelUpload(http.argument, invc_date);

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
					if ("A".equals(colNum)) { item.setParameter("dlvy_brch_name"	, formattedValue.trim()); }      // 배송지점명
					if ("G".equals(colNum)) { item.setParameter("dlvy_dinv_numb"	, formattedValue.trim()); }      // 베송송장번호
					if ("J".equals(colNum)) { item.setParameter("dlvy_tele_numb"	, formattedValue.trim()); }      // 배송전화번호
					if ("K".equals(colNum)) { item.setParameter("dlvy_hdph_numb"	, formattedValue.trim()); }      // 배송휴대폰번호
					if ("L".equals(colNum)) { item.setParameter("dlvy_rcpt_hmlf"	, formattedValue.trim()); }      // 배송수신인명
					if ("M".equals(colNum)) { item.setParameter("dlvy_addr_1fst"	, formattedValue.trim()); }      // 배송주소1
					if ("N".equals(colNum)) { item.setParameter("dlvy_addr_2snd"	, formattedValue.trim()); }      // 배송주소1
					if ("R".equals(colNum)) { item.setParameter("dlvy_memo"			, formattedValue.trim()); }      // 배송메모
					if ("S".equals(colNum)) { item.setParameter("dlvy_qntt"			, formattedValue.trim()); }      // 베송수량
					if ("T".equals(colNum)) { item.setParameter("dlvy_exps"			, formattedValue.trim()); }      // 베송비용


					if ("S".equals(colNum) || "T".equals(colNum)) {
						if (!formattedValue.trim().replaceAll(",", "").matches("[+-]?\\d*(\\.\\d+)?")) {
							throw new ServiceException("등록하신 자료의 " + colNum + "컬럼 형식에 오류가 있습니다. 숫자로 입력하세요.");
						}
					}
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				if (rowNum >=  1) {
					try {
						item.setParameter("invc_numb"		, invc_date + '-' + String.format("%04d", (rowNum - 2)));
						item.setParameter("invc_date"		, invc_date);

						service.setExcelUpload(http.argument , item);
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

	@RequestMapping(value="/custom/sjflv/stock/ostttrntmast/set/setTrntCost.do"  )
	public String setTrntCost(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTrntCost(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/ostttrntmast/set/delTrntCost.do"  )
	public String delTrntCost(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.delTrntCost(http.argument));
		return http.writer;
	}
}
