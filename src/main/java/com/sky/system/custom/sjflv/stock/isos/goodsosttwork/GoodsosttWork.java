package com.sky.system.custom.sjflv.stock.isos.goodsosttwork;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;
@Service("sjflv.GoodsosttWork")
@Controller
public class GoodsosttWork  extends DefaultControlHandler{


	@Autowired
	private GoodsosttWorkService service;


	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/get/master1.do"  )
	public String getMaster1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/get/master1Test.do"  )
	public String getMaster1Test(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1Test(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/get/detail1.do"  )
	public String getDetail1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/get/detail1Test.do"  )
	public String getDetail1Test(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1Test(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/get/master2.do"  )
	public String getMaster2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/get/detail2.do"  )
	public String getDetail2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/set/deleteMaster.do"  )
	public String deleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.deleteMaster(http.argument));
		return http.writer;
	}

	//택배 송장번호 업로드
	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/set/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {
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
					if ("H".equals(colNum)) { item.setParameter("dlvy_addr_1fst"	, formattedValue.trim()); }      // 베송휴대폰번호
					if ("J".equals(colNum)) { item.setParameter("dlvy_qntt"			, formattedValue.trim()); }      // 베송수량
					if ("M".equals(colNum)) { item.setParameter("dlvy_exps"			, formattedValue.trim()); }      // 베송비용
					if ("S".equals(colNum)) { item.setParameter("dlvy_brch_name"	, formattedValue.trim()); }      // 베송지점
					if ("V".equals(colNum)) { item.setParameter("hdli_dinv_qntt"	, formattedValue.trim()); }      // 택배송장수량
					if ("W".equals(colNum)) { item.setParameter("user_memo"			, formattedValue.trim()); }      // 사용자메모
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				if (rowNum >=  3) {
					try {
						item.setParameter("invc_numb"		, invc_date + '-' + String.format("%04d", (rowNum - 2)));
						item.setParameter("invc_date"		, invc_date);
						item.setParameter("dlvy_used_yorn"	, "1");

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

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/set/setTrntCost.do"  )
	public String setTrntCost(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTrntCost(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/test/get/invoiceTest.do")
	public String getInvoiceTest(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoiceTest(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/sjflv/stock/goodsosttwork/set/invoiceTest.do"  )
	public String setInvoiceTest(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoiceTest(http.argument));
		return http.writer;
	}
}
