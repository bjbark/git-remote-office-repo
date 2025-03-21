package com.sky.system.custom.hantop.sale.estientry2;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
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

@Service("hntop.EstiEntry2")
@Controller
public class EstiEntry2 extends DefaultControlHandler{

	@Autowired
	private EstiEntry2Service service;

	//master조회
	@RequestMapping(value="/custom/hntop/sale/estientry2/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	//detail조회
	@RequestMapping(value="/custom/hntop/sale/estientry2/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	//detail조회
	@RequestMapping(value="/custom/hntop/sale/estientry2/get/detail2.do")
	public String getDetail2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument));
		return http.writer;
	}

	//detail조회
	@RequestMapping(value="/custom/hntop/sale/estientry2/get/detail3.do")
	public String getDetail3(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail3(http.argument));
		return http.writer;
	}

	//brnd 견적금액
	@RequestMapping(value="/custom/hntop/sale/estientry2/get/getBrnd.do")
	public String getBrnd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBrnd(http.argument));
		return http.writer;
	}

	//mtrl 견적금액
	@RequestMapping(value="/custom/hntop/sale/estientry2/get/getmtrl.do")
	public String getMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrl(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hntop/sale/estientry2/get/getbrnd2.do")
	public String getbrnd2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBrnd2(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hntop/sale/estientry2/get/getmtrl2.do")
	public String getMtrl2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrl2(http.argument));
		return http.writer;
	}

	//optn 조회
	@RequestMapping(value="/custom/hntop/sale/estientry2/get/option.do")
	public String getOption(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOption(http.argument));
		return http.writer;
	}

	//견적복사
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/copy.do")
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/updown.do")
	public String setUpDown(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setUpDown(http.argument ));
		return http.writer;
	}
	//Invoice 조회
	@RequestMapping(value="/custom/hntop/sale/estientry2/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	//Invoice 등록
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	//마감 ,해지
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/close.do")
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}

	//수주확정
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/cofm.do")
	public String setCofm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCofm(http.argument ));
		return http.writer;
	}

	//수주 취소
		@RequestMapping(value="/custom/hntop/sale/estientry2/set/cofmcancel.do")
		public String setCofmcancel(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setCofmcancel(http.argument ));
			return http.writer;
		}

	//절단방법변경
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/auto.do")
	public String setAuto(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAuto(http.argument ));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	//작업지시 생성
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/main.do"  )
	public String setMain(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMain(http.argument ));
		return http.writer;
	}

	//계산
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/cal.do"  )
	public String setCal(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCal(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hntop/sale/estientry2/set/wbsc.do")
	public String setWbsc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWbsc(http.argument));
		return http.writer;
	}


	//계산 품목별
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/itemCal.do"  )
	public String setItemCal(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItemCal(http.argument ));
		return http.writer;
	}

	//브랜드별 견적금액 산출
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/esti.do"  )
	public String setEsti(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setEsti(http.argument ));
		return http.writer;
	}

	//계산 품목별
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/allCal.do"  )
	public String setCalAll(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCalAll(http.argument ));
		return http.writer;
	}

	//엑셀업로드
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {


		InputStream excelInputStream = excel.getFiles()[0].getInputStream();

		int excelCount = excel.getFiles().length;

		for(int i=0; i < excelCount; i++) {
			excelInputStream = excel.getFiles()[i].getInputStream();
			String  invc_numb = (String) service.getSeqn(http.argument).get(0).get("seq");

			// 0번 index에 있는 sheet 내용만 읽어온다.
			Object[] sheetLimit = {0};

			ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {

				private SqlResultRow item = new SqlResultRow();
				int line_seqn = 0;
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
							if(colNum != ""){
							 item.setParameter(colNum.toLowerCase()+"_clm"        , formattedValue.trim());
							}
						}
					}
				// row가 종료될때 호출
				public void endRow() {
					if ( rowNum >=  1 ){
						try {
							line_seqn++;
							service.setExcel(http.argument	, item , line_seqn , invc_numb);
						} catch (Exception ex) {
							throw new RuntimeException(ex);
						}
						item.clear();
					}
				}
			});
			service.setUploadEsti(http.argument	, invc_numb);
		}
		return http.writer;
	}


	//엑셀업로드
	@RequestMapping(value="/custom/hntop/sale/estientry2/set/excel2.do")
	public String setExcel2(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {


			InputStream excelInputStream = excel.getFiles()[0].getInputStream();

			int excelCount = excel.getFiles().length;

			for(int i=0; i < excelCount; i++) {
				excelInputStream = excel.getFiles()[i].getInputStream();
				String  invc_numb = (String) service.getSeqn(http.argument).get(0).get("seq");

				// 0번 index에 있는 sheet 내용만 읽어온다.
				Object[] sheetLimit = {0};

				ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {

					private SqlResultRow item = new SqlResultRow();
					int line_seqn = 0;
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
								if(colNum != ""){
								 item.setParameter(colNum.toLowerCase()+"_clm"        , formattedValue.trim());
								}
							}
						}
					// row가 종료될때 호출
					public void endRow() {
						if ( rowNum >=  1 ){
							try {
								line_seqn++;
								service.setExcel(http.argument	, item , line_seqn , invc_numb);
							} catch (Exception ex) {
								throw new RuntimeException(ex);
							}
							item.clear();
						}
					}
				});
				service.setUploadAmount(http.argument	, invc_numb);
			}
			return http.writer;
		}
	}

