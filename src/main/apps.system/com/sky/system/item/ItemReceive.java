package com.sky.system.item;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class ItemReceive  extends DefaultControlHandler{

	@Autowired
	private ItemReceiveService service;	
	
	// 조회 - 매장 품목 리스트
	@RequestMapping(value="/item/itemreceive/get/search.do"  ) 
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
		
		
	}
	
	// 조회  - 단위 품목 리스트
	@RequestMapping(value="/item/itemreceive/get/detail.do"  )
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
		//model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
	}
	
	// 저장 - 기준 사업장으로 수신 (itemstore)
	@RequestMapping(value="/item/itemreceive/set/master.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
//		model.put(HttpResponseMessage.RECORDS, service.setItemBonsa(http.argument ));
	}
	
	
	/*
	 * 지점상품으로 전송
	 */
	@RequestMapping(value="/item/itemreceive/set/storeadd.do"  )
	public String  setStoreAdd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setStoreAdd(http.argument));
		return http.writer;
		//model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument ));
	}	
	
	/*
	 * 지점상품 조회
	 */
	@RequestMapping(value="/item/itemreceive/get/itemstore.do"  ) 
	public String getItemStore(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getItemStore(http.argument, page, rows, sort ));
		return http.writer; 			
	}
	
	/*
	 * 공통상품으로 등록
	 */
	@RequestMapping(value="/item/itemreceive/set/bonsachange.do"  )
	public String  setBonsaChange(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBonsaChange(http.argument));
		return http.writer;
		//model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument ));
	}	
	
	
	
	
	
		
	
	// 조회 - 품목 바코드를 조회 하는 팝업 
	@RequestMapping(value="/item/itemreceive/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort ));
		return http.writer; 			
	}	
	
	
	
	// 저장 - 공통 품목 수신 
	@RequestMapping(value="/item/itemreceive/set/itembonsa.do"  )
	public String setItemBonsa(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItemBonsa(http.argument));
		return http.writer;
	}	
	
	
	
	// 저장 - 바코드상품 수신 (itemstore)
	@RequestMapping(value="/item/itemreceive/set/barcoderecv.do"  )
	public String setBarcodeRecv(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBarcodeRecv(http.argument));
		return http.writer;
	}	
}
