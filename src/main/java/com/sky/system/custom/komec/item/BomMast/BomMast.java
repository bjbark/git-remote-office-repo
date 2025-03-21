 package com.sky.system.custom.komec.item.BomMast;

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

import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;
@Service("komec.BomMast")
@Controller
public class BomMast  extends DefaultControlHandler{

	@Autowired
	private BomMastService service;

	@RequestMapping(value="/custom/komec/item/bommast/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/item/bommast/get/search2.do"  )
	public String getSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/item/bommast/get/search3.do"  )
	public String getSearch3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/item/bommast/set/recordRevs.do"  )
	public String  setRecordRevs(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecordRevs(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/item/bommast/set/updateRevs.do"  )
	public String  setUpdateRevs(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setUpdateRevs(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/item/bommast/set/updown.do"  )
	public String  setUpdown(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setUpdown(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/item/bommast/set/recordBom.do"  )
	public String  setRecordBom(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecordBom(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/item/bommast/set/copyBom.do"  )
	public String  setCopyBom(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopyBom(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/item/bommast/set/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {

		InputStream excelInputStream = excel.getFiles()[0].getInputStream();
		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {0};

		ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {

			SqlResultMap res = service.getLineSeqn(http.argument);

			private SqlResultRow item = new SqlResultRow();

			String upper = "";
			int    seqn = 1;
			private int rowNum;

			// row가 시작될때 호출
			public void startRow(int rowNum) {
				this.rowNum = rowNum;
			}

			// cell의 위치와 cell의 값이 전달된다.
			public void cell(String cellReference, String formattedValue) {

				Pattern pattern = Pattern.compile("[A-Z]+");
				String colNum = "";
				String match = "[^\uAC00-\uD7A30-9a-zA-Z]";
				Matcher matcher = pattern.matcher(cellReference);
				if(matcher.find()) {
					colNum = matcher.group();
				}
				if (rowNum >= 1) {
						if ("A".equals(colNum)) { item.setParameter("accd_bacd" , formattedValue.trim()); }			// 계정구분
						if ("B".equals(colNum)) { item.setParameter("item_code" , formattedValue.trim()); }			// 배합id
						if ("C".equals(colNum)) { item.setParameter("item_name" , formattedValue.trim()); }			// 품목코드
						if ("D".equals(colNum)) { item.setParameter("item_spec" , formattedValue.trim()); }			// 품목이름
						if ("E".equals(colNum)) { item.setParameter("mixx_rate" , formattedValue.trim()); }			// 리비전번호
						if ("F".equals(colNum)) { item.setParameter("prnt_item_idcd" , formattedValue.trim()); }	// 상위ID
						if ("G".equals(colNum)) { item.setParameter("prnt_item_name" , formattedValue.trim()); }	// 상위품명
						if ("H".equals(colNum)) { item.setParameter("prnt_item_spec" , formattedValue.trim()); }	// 상위규격
						if ("I".equals(colNum)) { item.setParameter("revs_numb" , formattedValue.trim()); }			// 리비전
						if ("J".equals(colNum)) { item.setParameter("revs_dvcd" , formattedValue.trim()); }			// 생산/품목구분
						if ("K".equals(colNum)) { item.setParameter("remk_text" , formattedValue.trim()); }			// 비고
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				if (rowNum >=  1) {
					try {
						if(upper.equals(item.getParamText("prnt_item_idcd"))){
							seqn++;
						}else{
							seqn = 1;
						}

						String bacd  = "";
						String idcd  = "";
						String idcd2 = "";

						// 품목BOM
						if ("2".equals(item.getParamText("revs_dvcd"))) {
							String accd_bacd = item.getParamText("accd_bacd");

							// 배합품목코드가 없는 경우
							if ("".equals(item.getParamText("item_code")) && ("품목보고서".equals(accd_bacd) || "반제품".equals(accd_bacd))){
								// 품명, 규격으로 등록된 품목보고서, 반제품을 조회하여 없으면 생성한다.
								bacd = ("품목보고서".equals(accd_bacd)) ? "2003" : "2002";
								idcd = service.getChildItemIdcd(http.argument, item, bacd);

								if ("".equals(idcd)) {
									idcd = service.getNewItemIdcd(http.argument, item, bacd);
								}


								//bacd  = service. getAcctBacd(http.argument, item, "N" );
								//idcd = service.getItemIdcd(http.argument, item, bacd);

								//if ("".equals(idcd)) {
								//	idcd = service.getNewItemIdcd(http.argument, item, bacd);
								//}
							}


							// 상위품목코드가 없는 경우 상위품명,상위규격으로 생성된 품목의 idcd를 가져와 상위품목코드로 설정한다.
							if ("".equals(item.getParamText("prnt_item_idcd")) && ("반제품".equals(accd_bacd) || "원료".equals(accd_bacd))){
								// 품명, 규격으로 등록된 품목보고서, 반제품을 조회하여 없으면 생성한다.
								bacd = ("반제품".equals(accd_bacd)) ? "2003" : "2002";
								idcd2 = service.getParentItemIdcd(http.argument, item);

								System.out.println("===> STEP A) idcd2 : " + item.getParamText("item_code"));
								System.out.println("===> STEP A) idcd2 : " + idcd2);

								if ("".equals(idcd2)) {

									idcd2 = service.getNewItemIdcd(http.argument, item, bacd);
								}


								System.out.println("===> STEP B) idcd2 : " + idcd2);

								item.setParameter("prnt_item_idcd", idcd2);


								/*bacd  = service. getAcctBacd(http.argument , item , "Y");
								idcd2 = service.getItemIdcd2(http.argument, item , bacd);

								System.out.println("************************"+bacd);
								System.out.println("*******"+idcd2);

								if ("".equals(idcd2)) {
									idcd2 = service.getNewItemIdcd(http.argument, item, bacd);
								}

								item.setParameter("prnt_item_idcd", idcd2);*/
							}
						}

						service.setExcel(http.argument , item, upper, seqn , bacd ,idcd, idcd2 );
						upper = item.getParamText("prnt_item_idcd");
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
