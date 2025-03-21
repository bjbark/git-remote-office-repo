package com.sky.system.custom.symct.sale.prjtwork;

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

import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;
@Service("symct.PrjtWork")
@Controller
public class PrjtWork  extends DefaultControlHandler{

	@Autowired
	private PrjtWorkService service;

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/master.do"  )
	public String getMaster( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/symct/sale/prjtwork/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}
	@RequestMapping(value="/custom/symct/sale/prjtwork/get/sale_work_lookup.do"  )
	public String getSale_Work_Lookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSale_Work_Lookup(http.argument, page, rows));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/detail0.do"  )
	public String getDetail0(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail0(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/detail1.do"  )
	public String getDetail1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/detail2.do"  )
	public String getDetail2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/detail3.do"  )
	public String getDetail3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail3(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/detail4.do"  )
	public String getDetail4(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail4(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/invoice.do"  )
	public String getInvoice(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	// SYMCT detail저장
		@RequestMapping(value="/custom/symct/sale/prjtwork/set/record.do"  )
		public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
			return http.writer;
		}

	@RequestMapping(value="/custom/symct/sale/prjtwork/set/detail.do"  )
	public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}

	// 마감 / 해지 수정
	@RequestMapping(value="/custom/symct/sale/prjtwork/set/close.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/set/copy.do"  )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/seqn.do"  )
	public String getSeqn( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/set/consulting.do"  )
	public String setConsulting(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setConsulting(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/symct/sale/prjtwork/set/deleteMaster.do"  )
	public String deleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.deleteMaster(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/set/result.do"  )
	public String setResult(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setResult(http.argument));
		return http.writer;
	}

	// 이미지업로드
	@RequestMapping(value="/custom/symct/sale/prjtwork/set/fileUpload.do"  )
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}

	//출고지시
	@RequestMapping(value="/custom/symct/sale/prjtwork/set/release.do"  )
	public String setRelease(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRelease(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/symct/sale/prjtwork/get/numb.do"  )
	public String getNumb( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getNumb(http.argument));
		return http.writer;
	}


	/**
	 * 신양 엑셀업로드
	 *
	 * @param http
	 * @param model
	 * @param excel
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/symct/sale/prjtwork/excel.do")
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


				//pjod_mast에 들어갈 데이터
				if(rowNum < 6 && "C".equals(colNum)){
					if(rowNum==0) { item.setParameter("pjod_code"		, formattedValue.trim());}		//프로젝트 코드
					if(rowNum==1) { item.setParameter("cstm_item_code"	, formattedValue.trim());}		//PONO,고객품목코드
					if(rowNum==2) { item.setParameter("cstm_code"		, formattedValue.trim());}		//거래처ID
					if(rowNum==3) { item.setParameter("cstm_name"		, formattedValue.trim());}		//거래처명
					if(rowNum==4) { item.setParameter("regi_date"		, formattedValue.trim().replaceAll("/", ""));}		//수주일자, 등록일자
					if(rowNum==5) { item.setParameter("deli_date"		, formattedValue.trim().replaceAll("/", ""));}		//납기일자
				}

				//pjod_item에 들어갈 데이터
				if (rowNum >= 7) {
					if ("A".equals(colNum)) { item.setParameter("line_seqn"        , formattedValue.trim()); }		// item 순번
					if ("B".equals(colNum)) { item.setParameter("item_idcd"        , formattedValue.trim()); }		// 품목ID
					if ("B".equals(colNum)) { item.setParameter("item_code"        , formattedValue.trim()); }		// 품목코드
					if ("C".equals(colNum)) { item.setParameter("item_name"        , formattedValue.trim()); }		// 품목명
					if ("D".equals(colNum)) { item.setParameter("acpt_qntt"        , formattedValue.trim()); }		// 수량
				}
			}

			// row가 종료될때 호출
			public void endRow() { System.out.println(item.toString());
				//mast
				if(rowNum==6 && !"".equals(item.getParamText("pjod_code")) && !"".equals(item.getParamText("cstm_item_code"))
						&& !"".equals(item.getParamText("cstm_code")) && !"".equals(item.getParamText("cstm_name"))
						&& !"".equals(item.getParamText("regi_date")) && !"".equals(item.getParamText("deli_date"))){
					try {
						String cstm = service.getCstmIdcd(http.argument, item.getParamText("cstm_code") );
						service.setExcel(http.argument, item, cstm );
					} catch (Exception ex) {
							//throw ex ;
						throw new RuntimeException(ex);
					}
					item.clear();
				}
				//item
				if (rowNum >=  7 && !"".equals(item.getParamText("line_seqn")) && !"0".equals(item.getParamText("line_seqn") )){
						try {
							service.setExcelDetail(http.argument, item);
						} catch (Exception ex) {
								//throw ex ;
							throw new RuntimeException(ex);
						}
						item.clear();
					}
				}
		});
		return http.writer;
	}

}
