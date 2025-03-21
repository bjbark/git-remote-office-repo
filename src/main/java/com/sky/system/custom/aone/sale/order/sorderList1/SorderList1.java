package com.sky.system.custom.aone.sale.order.sorderList1;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
@Service("aone.sale.SorderList1")
public class SorderList1 extends DefaultControlHandler{

	@Autowired
	private SorderList1Service service;

	//날짜별 조회
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/get/search1.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort));
		return http.writer;
	}

	// 마스터 아이템 입력
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//이미지 조회
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}

	//Max Amend 구하기
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/get/orderInfo.do"  )
	public String getOrderInfo(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderInfo(http.argument));
		return http.writer;
	}


	//거래처별 조회
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/get/search2.do")
	public String getSearch2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
			return http.writer;
	}

	//품목별 마스트
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/get/search3.do")
	public String getSearch3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort));
			return http.writer;
	}

	//품목별 디테일
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/get/search4.do")
	public String getSearch4( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch4(http.argument, page, rows, sort));
			return http.writer;
	}

	//엔지니어별
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/get/detail.do")
	public String getDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	//실적보고 수리자재 사용내역 불러오기
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/get/workBookMtrl.do"  )
	public String getWorkBookMtrl(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWorkBookMtrl(http.argument, page, rows, sort ));
		return http.writer;
	}

	//재수리등록
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument ));
		return http.writer;
	}
	//청구내용 입력
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/set/setMemo.do"  )
	public String setMemo(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMemo(http.argument ));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/set/setTax.do"  )
	public String setTax(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTax(http.argument ));
		return http.writer;
	}
	
	//출고취소
	@RequestMapping(value="/custom/aone/sale/order/sorderlist1/set/releasecancel.do"  )
	public String setReleaseCancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setReleaseCancel(http.argument ));
		return http.writer;
	}

}
