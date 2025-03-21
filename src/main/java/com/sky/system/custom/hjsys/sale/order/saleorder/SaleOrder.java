package com.sky.system.custom.hjsys.sale.order.saleorder;

import java.io.InputStream;
import java.util.LinkedHashMap;
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
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.TreeHash;
import com.sky.utils.file.UploadItem;
@Service("hjsys.SaleOrder")
@Controller
public class SaleOrder  extends DefaultControlHandler{

	@Autowired
	private SaleOrderService service;

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/master.do"  )
	public String getMaster( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/invc.do"  )
	public String getInvc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvc(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/work.do"  )
	public String getWork( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWork(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/pror.do"  )
	public String getPror( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPror(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/item1.do"  )
	public String getItem1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItem1(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/tree.do"  )
	public String getSearch(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getSearch(http.argument);
//		TreeHash tree = new TreeHash("standard");
		TreeHash tree = new TreeHash(arg.getParamText("invc_numb"));
		String item_idcd="";
		Boolean chk = true;
		for(SqlResultRow row:map){
			if(row.getParamText("invc_numb").equals(row.getParamText("prnt_idcd"))){
				item_idcd = row.getParamText("item_idcd");
			}else{
				if(row.getParameter("prnt_idcd")!=item_idcd){
					chk = false;
				}
			}
			TreeHash item = new TreeHash(row.getParamText("item_idcd" ));
			item.parent   = row.getParamText("prnt_idcd" );
			item.leaf     = row.getParamText("has_chld").equals("0") ;
//			item.expanded = chk;
			item.expanded = true;
			item.resource = row;
			tree.add(item);
		}
		tree.clean();

		System.out.println("tree " + tree.records);
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/mtrl_bom_list_master.do"  )
	public String getMtrl_Bom_List_Master(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getMtrl_Bom_List_Master(http.argument);
		TreeHash tree = new TreeHash("standard");
		for(SqlResultRow row:map){
			TreeHash item = new TreeHash(row.getParamText("hash_set" ));
			item.parent   = row.getParamText("prnt_idcd");
			item.leaf     = row.getParamText("has_chld").equals("0") ;
			item.expanded = true;
			item.resource = row;
			tree.add(item);
		}
		tree.clean();
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/mtrl_bom_list_detail.do"  )
	public String getMtrl_Bom_List_Detail(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getMtrl_Bom_List_Detail(http.argument);
		TreeHash tree = new TreeHash("detail");
		for(SqlResultRow row:map){
			TreeHash item = new TreeHash(row.getParamText("item_idcd" ));
			item.parent   = row.getParamText("prnt_idcd" );
			item.leaf     = row.getParamText("has_chld").equals("0") ;
			item.expanded = true;
			item.resource = row;
			tree.add(item);
		}
		tree.clean();

		System.out.println("tree " + tree.records);
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/subItem.do"  )
	public String getSubItem( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSubItem(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/mainItem.do"  )
	public String getMainItem( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMainItem(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/cal.do"  )
	public String getCal( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCal(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/mtrl_seqn.do"  )
	public String getMtrl_Seqn( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrl_Seqn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/chkOrdr.do"  )
	public String getChkOrdr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getChkOrdr(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/subItem.do"  )
	public String setSubItem(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSubItem(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/subItems.do"  )
	public String setSubItems(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSubItems(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/acpt_copy.do"  )
	public String setAcpt_Copy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAcpt_Copy(http.argument ));
		return http.writer;

	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/wkfw.do"  )
	public String setWkfw(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWkfw(http.argument ));
		return http.writer;

	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/lookup2.do"  )
	public String getLookup2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup2(http.argument, page, rows));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/detail.do"  )
	public String getDetail(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/invoice.do"  )
	public String getInvoice(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/drwg.do"  )
	public String getdrwg(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getdrwg(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/SearchLister3.do"  )
	public String getSearchLister3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchLister3(http.argument, page, rows, sort));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/SearchLister4.do"  )
	public String getSearchLister4( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchLister4(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/image.do"  )
	public String getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/excel.do"  )
	public String getExcel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getExcel(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/master.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/item1.do"  )
	public String setItem1(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setItem1(http.argument));
		return http.writer;
	}
	// 마감 / 해지 수정
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/close.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/fileName.do"  )
	public String setFileName(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFileName(http.argument ));
		return http.writer;

	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;

	}

	// 견적확인 / 취소 수정
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/estiClose.do"  )
	public String setEstiClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/estiOk.do"  )
	public String setEstiOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;

	}

	// master 삭제
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/delete.do"  )
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument ));
		return http.writer;

	}
	// 파일업로드
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/fileUpload.do"  )
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}
	// 파일업로드(다중)
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/fileUpload2.do"  )
	public String upload2(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload2(http.argument, uploadItem));
		return http.writer;
	}
	//테스트
		@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/test.do"  )
		public String test(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.test(http.argument));
			return http.writer;
		}
	//
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/get/getseqn.do"  )
	public String getTreeSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTreeSeqn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/records.do"  )
	public String setRecords(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setSubItem(http.argument));
		return http.writer;
	}
	//출고지시
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/release.do"  )
	public String setRelease(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRelease(http.argument ));
		return http.writer;
	}
	//BOM삭제
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}
	//출고등록
	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/set/ostt.do")
	public String setOstt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOstt(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/sale/order/saleorder/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {

		InputStream excelInputStream = excel.getFiles()[0].getInputStream();

		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {0};

		ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {

			private SqlResultRow item = new SqlResultRow();

			SqlResultMap res = service.getTreeSeqn(http.argument);

			int line_seqn = (int) res.get(0).get("seq");
			int line_ordr = (int) res.get(0).get("ordr_seq");
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
						if ("A".equals(colNum)) { item.setParameter("invc_numb"   , formattedValue.trim()); }		// INVOICE번호
						if ("B".equals(colNum)) { item.setParameter("item_name"   , formattedValue.trim()); }		// 품목
						if ("C".equals(colNum)) { item.setParameter("acct_bacd"   , formattedValue.trim()); }		// 계정분류코드
						if ("D".equals(colNum)) { item.setParameter("drwg_numb"   , formattedValue.trim()); }		// 도면번호
						if ("E".equals(colNum)) { item.setParameter("revs_numb"   , formattedValue.trim()); }		// REV번호
						if ("F".equals(colNum)) { item.setParameter("item_widh"   , formattedValue.trim()); }		// 품목폭
						if ("G".equals(colNum)) { item.setParameter("item_leng"   , formattedValue.trim()); }		// 품목길이
						if ("H".equals(colNum)) { item.setParameter("item_tick"   , formattedValue.trim()); }		// 두께
						if ("I".equals(colNum)) { item.setParameter("pqty_ndqt"   , formattedValue.trim()); }		// 개당소요량
						if ("J".equals(colNum)) { item.setParameter("need_qntt"   , formattedValue.trim()); }		// 소요수량
						if ("K".equals(colNum)) { item.setParameter("mtrl_bacd"   , formattedValue.trim()); }		// 재질
						if ("L".equals(colNum)) { item.setParameter("prnt_idcd"   , formattedValue.trim()); }		// 상위품명
						if ("M".equals(colNum)) { item.setParameter("prnt_widh"   , formattedValue.trim()); }		// 상위폭
						if ("N".equals(colNum)) { item.setParameter("prnt_leng"   , formattedValue.trim()); }		// 상위길이
						if ("O".equals(colNum)) { item.setParameter("wkfw_idcd"   , formattedValue.trim()); }		// 공정흐름
						if ("P".equals(colNum)) { item.setParameter("file_name"   , formattedValue); 							}		// 도면파일 이름
				}
			}

			// row가 종료될때 호출
			public void endRow() {
				if ( rowNum >=  1 && item.getParamText("invc_numb") != null && !item.getParamText("invc_numb").equals("")){
					try {
						line_seqn++;
						line_ordr++;
						String bacd= service.getAcctBacd(http.argument, item.getParamText("acct_bacd") );
						String idcd= service.getItemIdcd(http.argument, item);
						String prnt_idcd= service.getFindIdcd(http.argument, item );
						service.setExcel(http.argument , item	, bacd ,  idcd ,  prnt_idcd , line_seqn , line_ordr );
					} catch (Exception ex) {
						throw new RuntimeException(ex);
					}
					item.clear();
				}
			}
		});
		return http.writer;
	}
}
