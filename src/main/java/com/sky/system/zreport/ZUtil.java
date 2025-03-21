package com.sky.system.zreport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.sky.http.dispatch.control.DefaultControlHandler;
import com.sky.http.HttpMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;



@Controller
public class ZUtil extends DefaultControlHandler {

	@Autowired
	private ZUtilService service;

	//엑셀업로드
	@RequestMapping(value="/zreport/zutil/set/itemexcel.do")
	public String setItemExcel(final HttpMessage http, Map<String, Object> model, UploadItem excel) throws Exception {
		System.out.println("엑셀로 옴.");
		InputStream excelInputStream = excel.getFiles()[0].getInputStream();
		// 0번 index에 있는 sheet 내용만 읽어온다.
		Object[] sheetLimit = {0};



		ExcelParser.read(excelInputStream, sheetLimit, new ExcelParserHandler() {
//		ExcelUtil.read(excelInputStream, sheetLimit, new ExcelHandler() {
			ArrayList<Object> temp = new ArrayList<Object>();
			int rowNum = 0 ;
			String	order_id_item			=	new String();	// 주문번호
			String	ord_no_itm				= new String();	// 발주번호
			String	buyer_name			= new String();	// 구매담당자
			String	buyer_tel				= new String();	// 담당자연락처
			String	dlv_type					= new String();	// 배송형태명
			String	client_name			= new String();	// 사업장명
			String	client_group			= new String();	// 운영단위명
			String	product_id				= new String();	// 상품ID
			String	serveone_item_nm	= new String();	// 품목명
			float		price						= 0f;	// 단가
			float		qty						= 0f;	// 수량
			String	unit						= new String();	// 단위
			float		amount					= 0f;	// 정산금액
			String	currency					= new String();	// 통화
			float		amount_krw			= 0f;	// 정산금액(원화)
			String	currency_kwr			= new String();	// 통화(원화)
			float		exchange_rates		= 0f;	// 환율
			String	tex_type					= new String();	// 세금분류
			String	invoice_no				= new String();	// 세금계산서번호
			String	if_date					= new String();	// 발주일
			String	dlv_date					= new String();	// 배송완료일
			String	stockno					= new String();	// STOCKNO
			String	alpha_invoice_no		= new String();	// 거래명서번호
			String	prdt_item_sc			= new String();	// 대표규격
			String	dlv_memo				= new String();	// 배송메모내용
			String	recipient					= new String();	// 수령인명
			String	order_nm				= new String();	// 주문자명
			String	dept_nm					= new String();	// 부서명

			public void startRow(int rowNum) {
				temp.clear();
				this.rowNum = rowNum;
				order_id_item			= "";	// 주문번호
				ord_no_itm				= "";	// 발주번호
				buyer_name			= "";	// 구매담당자
				buyer_tel				= "";	// 담당자연락처
				dlv_type					= "";	// 배송형태명
				client_name			= "";	// 사업장명
				client_group			= "";	// 운영단위명
				product_id				= "";	// 상품ID
				serveone_item_nm	= "";	// 품목명
				price						= 0f;	// 단가
				qty						= 0f;	// 수량
				unit						= "";	// 단위
				amount					= 0f;	// 정산금액
				currency					= "";	// 통화
				amount_krw			= 0f;	// 정산금액(원화)
				currency_kwr			= "";	// 통화(원화)
				exchange_rates		= 0f;	// 환율
				tex_type					= "";	// 세금분류
				invoice_no				= "";	// 세금계산서번호
				if_date					= "";	// 발주일
				dlv_date					= "";	// 배송완료일
				stockno					= "";	// STOCKNO
				alpha_invoice_no		= "";	// 거래명서번호
				prdt_item_sc			= "";	// 대표규격
				dlv_memo				= "";	// 배송메모내용
				recipient					= "";	// 수령인명
				order_nm				= "";	// 주문자명
				dept_nm					= "";	// 부서명
			}
			public void cell(String cellReference, String formattedValue) {
				String colNum = "";
				Pattern pattern = Pattern.compile("[A-Z]+");
				Matcher matcher = pattern.matcher(cellReference);
//				String match1 = "[^\uAC00-\uD7A3xfe0-9a-zA-Z\\s]";
				String match2 = "[',]";
				if(matcher.find()) {	colNum = matcher.group();	}
				if(rowNum != 0 ){
					if ("A".equals(colNum)) { order_id_item = formattedValue.trim().replaceAll(match2, "");  }
					if ("B".equals(colNum)) { ord_no_itm = formattedValue.trim().replaceAll(match2, "");  }
					if ("C".equals(colNum)) { buyer_name = formattedValue.trim().replaceAll(match2, "");  }
					if ("D".equals(colNum)) { buyer_tel = formattedValue.trim().replaceAll(match2, "");  }
					if ("E".equals(colNum)) { dlv_type = formattedValue.trim().replaceAll(match2, "");  }
					if ("F".equals(colNum)) { client_name = formattedValue.trim().replaceAll(match2, "");  }
					if ("G".equals(colNum)) { client_group = formattedValue.trim().replaceAll(match2, "");  }
					if ("H".equals(colNum)) { product_id = formattedValue.trim().replaceAll(match2, "");  }
					if ("I".equals(colNum)) { serveone_item_nm = formattedValue.trim().replaceAll(match2, "");  }
					if ("J".equals(colNum)) { price = Float.parseFloat(  formattedValue.trim().replaceAll(match2, "") );  }
					if ("K".equals(colNum)) { qty = Float.parseFloat( formattedValue.trim().replaceAll(match2, ""));  }
					if ("L".equals(colNum)) { unit = formattedValue.trim().replaceAll(match2, "");  }
					if ("M".equals(colNum)) { amount = Float.parseFloat( formattedValue.trim().replaceAll(match2, ""));  }
					if ("N".equals(colNum)) { currency = formattedValue.trim().replaceAll(match2, "");  }
					if ("O".equals(colNum)) { amount_krw = Float.parseFloat( formattedValue.trim().replaceAll(match2, "") );  }
					if ("P".equals(colNum)) { currency_kwr = formattedValue.trim().replaceAll(match2, "");  }
					if ("Q".equals(colNum)) { exchange_rates = Float.parseFloat( formattedValue.trim().replaceAll(match2, "") );  }
					if ("R".equals(colNum)) { tex_type = formattedValue.trim().replaceAll(match2, "");  }
					if ("S".equals(colNum)) { invoice_no = formattedValue.trim().replaceAll(match2, "");  }
					if ("T".equals(colNum)) { if_date = formattedValue.trim().replaceAll(match2, "");  }
					if ("U".equals(colNum)) { dlv_date = formattedValue.trim().replaceAll(match2, "");  }
					if ("V".equals(colNum)) { stockno = formattedValue.trim().replaceAll(match2, "");  }
					if ("W".equals(colNum)) { alpha_invoice_no = formattedValue.trim().replaceAll(match2, "");  }
					if ("X".equals(colNum)) { prdt_item_sc = formattedValue.trim().replaceAll(match2, "");  }
					if ("Y".equals(colNum)) { dlv_memo = formattedValue.trim().replaceAll(match2, "");  }
					if ("Z".equals(colNum)) { recipient = formattedValue.trim().replaceAll(match2, "");  }
					if ("AA".equals(colNum)) { order_nm = formattedValue.trim().replaceAll(match2, "");  }
					if ("AB".equals(colNum)) { dept_nm = formattedValue.trim().replaceAll(match2, "");  }
				}


			}
			public void endRow() {
				if(rowNum != 0 ){
					temp.add(order_id_item);
					temp.add(ord_no_itm);
					temp.add(buyer_name);
					temp.add(buyer_tel);
					temp.add(dlv_type);
					temp.add(client_name);
					temp.add(client_group);
					temp.add(product_id);
					temp.add(serveone_item_nm);
					temp.add(price);
					temp.add(qty);
					temp.add(unit);
					temp.add(amount);
					temp.add(currency);
					temp.add(amount_krw);
					temp.add(currency_kwr);
					temp.add(exchange_rates);
					temp.add(tex_type);
					temp.add(invoice_no);
					temp.add(if_date);
					temp.add(dlv_date);
					temp.add(stockno);
					temp.add(alpha_invoice_no);
					temp.add(prdt_item_sc);
					temp.add(dlv_memo);
					temp.add(recipient);
					temp.add(order_nm);
					temp.add(dept_nm);
					//System.out.println("endRow : "+temp.toString() );
					try {
						service.setServeoneBill( http.argument ,  temp );
					}catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		});
		return http.writer;
	}




}