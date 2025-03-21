package com.sky.system.custom.dhtec.prod.bomwork;

import java.io.InputStream;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.sql.rowset.serial.SerialBlob;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFPicture;
import org.apache.poi.xssf.usermodel.XSSFPictureData;
import org.apache.poi.xssf.usermodel.XSSFShape;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.TreeHash;
import com.sky.utils.file.UploadItem;
@Service("dhtec.BomWork")
@Controller
public class BomWork extends DefaultControlHandler{

	@Autowired
	private BomWorkService service;
	// 조회
	@RequestMapping(value="/custom/dhtec/prod/bomwork/get/search.do"  )
	public String getSearch(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getSearch(http.argument);
//		TreeHash tree = new TreeHash("standard");
		TreeHash tree = new TreeHash(arg.getParamText("pjod_idcd"));
		System.out.println(map.toString()+"<<<<<<<<<<<<");
		for(SqlResultRow row:map){
			TreeHash item = new TreeHash(row.getParamText("item_idcd" ));
			item.parent   = row.getParamText("prnt_idcd" );
			item.leaf     = row.getParamText("has_chld").equals("0") ;
			item.expanded = true;
			item.resource = row;
			tree.add(item);
		}
		tree.clean();
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		System.out.println("tree " + tree.records);
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/get/search2.do"  )
	public String getSearch2(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/prod/bomwork/set/records.do"  )
	public String setRecords(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setRecords(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/set/setBom.do"  )
	public String setBom(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setBom(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/set/delete.do"  )
	public String setdelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setdelete(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/set/setImage.do"  )
	public String setImage(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setImage(http.argument, uploadItem));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/get/excel.do")
	public String setExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {
		InputStream excelInputStream = excel.getFiles()[0].getInputStream();
		InputStream excelInputStream2 = excel.getFiles()[0].getInputStream();
		DataMessage  querys = http.argument.newStorage("POS");
		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {0};
		Workbook workBook = new XSSFWorkbook(excelInputStream);
		XSSFSheet sheet = (XSSFSheet) workBook.getSheetAt(0);
		XSSFDrawing drawing = sheet.createDrawingPatriarch();
		ArrayList<Blob> blobs = new ArrayList<Blob>();
		if(http.argument.getParameter("chek")=="true"){
			querys.param
				.query("delete from item_mast					")
				.query("where item_idcd in(select item_idcd from pjod_bom where pjod_idcd = :pjod_idcds ",http.argument.fixParameter("pjod_idcd"))
				.query("and supl_dvcd = 1000)					")
			;querys.attach(Action.direct);
			querys.execute();
			querys.clear();
			querys.param
				.query("delete from pjod_bom					")
				.query( " where pjod_idcd = :pjod_idcd1",http.argument.fixParameter("pjod_idcd"))
				.query( " and supl_dvcd  = 1000")
			;
			querys.attach(Action.direct);
			querys.execute();
			querys.clear();
			System.out.println("delete compl");
		}
		for (XSSFShape shape : drawing.getShapes()) {
            if (shape instanceof XSSFPicture) {
                XSSFPicture picture = (XSSFPicture) shape;
                XSSFPictureData xssfPictureData = picture.getPictureData();
//                ClientAnchor anchor = picture.getPreferredSize();
//                int row1 = anchor.getRow1();
//                int row2 = anchor.getRow2();
//                int col1 = anchor.getCol1();
//                int col2 = anchor.getCol2();
//                System.out.println("Row1: " + row1 + " Row2: " + row2);
//                System.out.println("Column1: " + col1 + " Column2: " + col2);
//                String ext = xssfPictureData.suggestFileExtension();
                byte[] data = xssfPictureData.getData();
                Blob blob = null;
                blob = new SerialBlob(data);
		    	blobs.add(blob);
            }
        }

		System.out.println("blob size = "+blobs.size());

		ExcelParser.read(excelInputStream2, sheetLimit, new ExcelParserHandler() {
			int line_seqn = (int) service.getSeqn(http.argument).get(0).get("seq")+1;
			String pjod_idcd = http.argument.getParamText("pjod_idcd");
		//ExcelUtil.read(excelInputStream, sheetLimit, new ExcelHandler() {


			private SqlResultRow item = new SqlResultRow();
			private SqlResultRow temp = new SqlResultRow();

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
				if (rowNum >= 5) {
					if ("A".equals(colNum)) { item.setParameter("A"        , formattedValue.trim()); }
					if ("B".equals(colNum)) { item.setParameter("B"        , formattedValue.trim()); }
					if ("C".equals(colNum)) { item.setParameter("C"        , formattedValue.trim()); }
					if ("D".equals(colNum)) { item.setParameter("D"        , formattedValue.trim()); }
					if ("E".equals(colNum)) { item.setParameter("E"        , formattedValue.trim()); }
					if ("F".equals(colNum)) { item.setParameter("F"        , formattedValue.trim()); }
					if ("G".equals(colNum)) { item.setParameter("G"        , formattedValue.trim()); }
					if ("H".equals(colNum)) { item.setParameter("H"        , formattedValue.trim()); }
					if ("I".equals(colNum)) { item.setParameter("I"        , formattedValue.trim()); }
					if ("J".equals(colNum)) { item.setParameter("J"        , formattedValue.trim()); }
					if ("K".equals(colNum)) { item.setParameter("K"        , formattedValue.trim()); }
					if ("L".equals(colNum)) { item.setParameter("L"        , formattedValue.trim()); }
					if ("M".equals(colNum)) { item.setParameter("M"        , formattedValue.trim()); }
					if ("N".equals(colNum)) { item.setParameter("N"        , formattedValue.trim()); }
					if ("O".equals(colNum)) { item.setParameter("O"        , formattedValue.trim()); }
				}
			}

			int i = 1;			// row check
			int s = 0;			// row roop
			int blobIndex = 0;	// for get blobs
			int index = 1;	// for get blobs
			int num = 5;		// exit check
			// row가 종료될때 호출
			public void endRow() {
				if (rowNum >=  5  && !"".equals(item.getParamText("A"))){	// 다섯줄 제외
					if(i!=1 && i==num){								// 초기화실행 및 저장
						try {
							if(blobs.size() >= index) {
								System.out.println("1.Blob size = "+blobs.size()+", BlobIndex = "+blobIndex);
								temp.setParameter("line_seqn1", line_seqn++);
								temp.setParameter("seqn1", service.getItemSeqn(http.argument, pjod_idcd+"-"+temp.getParamText("pn1")));
								temp.setParameter("blob1", blobs.get(blobIndex++));
								index++;
							}
							if(blobs.size() >= index) {
								System.out.println("2.Blob size = "+blobs.size()+", BlobIndex = "+blobIndex);

								temp.setParameter("line_seqn2", line_seqn++);
								temp.setParameter("seqn2", service.getItemSeqn(http.argument, pjod_idcd+"-"+temp.getParamText("pn2")));
								temp.setParameter("blob2", blobs.get(blobIndex++));
								index++;
							}
							if(blobs.size() >= index) {
								System.out.println("3.Blob size = "+blobs.size()+", BlobIndex = "+blobIndex);
								temp.setParameter("line_seqn3", line_seqn++);
								temp.setParameter("seqn3", service.getItemSeqn(http.argument, pjod_idcd+"-"+temp.getParamText("pn3")));
								temp.setParameter("blob3", blobs.get(blobIndex++));
								index++;
							}
							s=0;
							num += 4;

							if(temp.getParameter("name1")==null||temp.getParameter("name1")==""){
								return;
							}else{
								service.uploadExcel(http.argument,temp);
							}
							temp.clear();
						} catch (Exception e) {
							e.getStackTrace();
						}
					}
					switch (s) {
						case 0:
							if(item.getParameter("A") != null) temp.setParameter("no1", item.getParameter("A"));
							if(item.getParameter("F") != null) temp.setParameter("no2", item.getParameter("F"));
							if(item.getParameter("K") != null) temp.setParameter("no3", item.getParameter("K"));
							break;
						case 1:
							if(item.getParameter("B") != null)	temp.setParameter("name1", item.getParameter("B"));
							if(item.getParameter("G") != null)	temp.setParameter("name2", item.getParameter("G"));
							if(item.getParameter("L") != null)	{ temp.setParameter("name3", item.getParameter("L")); temp.setParameter("size", 3);}
							if(item.getParameter("G") == null){
								temp.setParameter("size", 1);
							}else if(item.getParameter("G") != null && item.getParameter("L") == null){
								temp.setParameter("size", 2);
							}

							if(item.getParameter("E") != null)	temp.setParameter("pn1", item.getParameter("E"));
							if(item.getParameter("J") != null)	temp.setParameter("pn2", item.getParameter("J"));
							if(item.getParameter("O") != null)	temp.setParameter("pn3", item.getParameter("O"));
							break;
						case 2:
							if(item.getParameter("B") != null) temp.setParameter("size1", item.getParameter("B"));
							if(item.getParameter("G") != null) temp.setParameter("size2", item.getParameter("G"));
							if(item.getParameter("L") != null) temp.setParameter("size3", item.getParameter("L"));

							if(item.getParameter("E") != null)	temp.setParameter("qty1", item.getParameter("E"));
							if(item.getParameter("J") != null)	temp.setParameter("qty2", item.getParameter("J"));
							if(item.getParameter("O") != null)	temp.setParameter("qty3", item.getParameter("O"));
							break;
						case 3:
							if(item.getParameter("B") != null) temp.setParameter("mat1", item.getParameter("B"));
							if(item.getParameter("G") != null) temp.setParameter("mat2", item.getParameter("G"));
							if(item.getParameter("L") != null) temp.setParameter("mat3", item.getParameter("L"));

							if(item.getParameter("D") != null)	temp.setParameter("remark1", item.getParameter("D"));
							if(item.getParameter("I") != null)	temp.setParameter("remark2", item.getParameter("I"));
							if(item.getParameter("N") != null)	temp.setParameter("remark3", item.getParameter("N"));
							break;
						default:
							break;
					}
					s++;
					i++;

				}
				item.clear();
			}
		});
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/get/getcstm.do"  )
	public String getcstm(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstm(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/get/getseqn.do"  )
	public String getseqn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/get/getImage.do"  )
	public String getImage(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/set/setApprove.do"  )
	public String setApprove(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setApprove(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/set/qntt.do"  )
	public String setQntt(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setQntt(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/bomwork/set/setBomDelete.do"  )
	public String setBomDelete(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setBomDelete(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/prod/bomwork/set/setWorkBook.do"  )
	public String setWorkBook(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setWorkBook(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/dhtec/prod/bomwork/get/product.do")
	public String getProduct(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument, page, rows, sort));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/dhtec/prod/bomwork/get/maxseqn.do")
	public String getMaxSeqn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMaxSeqn(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/dhtec/prod/bomwork/get/bommast.do")
	public String getBomMast(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBomMast(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/dhtec/prod/bomwork/set/bommast.do")
	public String setBomMast(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setBomMast(http.argument));
		return http.writer;
	}
}
