package com.sky.system.project.cstoreinfo;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CStoreInfo {

	@Autowired
	private CStoreInfoService service;

	// 조회
	@RequestMapping(value="/project/cstoreinfo/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true , defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true , defaultValue="20" ) int rows,
		@RequestParam(value="sort" , required=false, defaultValue=""   ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 팝업
	@RequestMapping(value="/project/cstoreinfo/get/lookup.do" )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true , defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true , defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort ));
		return http.writer;
	}


	// 저장
	@RequestMapping(value="/project/cstoreinfo/set/record.do" )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// (부가 서비스 정보 팝업) 제휴 서비스 정보 조회
	@RequestMapping(value="/project/cstoreinfo/get/trader.do" )
	public String getTrader(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true , defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true , defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTrader(http.argument, page, rows, sort ));
		return http.writer;
	}

	// (부가 서비스 정보 팝업) 제휴 서비스 정보 저장
	@RequestMapping(value="/project/cstoreinfo/set/trader.do" )
	public String setTrader(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTrader(http.argument));
		return http.writer;
	}


	// (부가 서비스 정보 팝업) 연동서비스 정보 조회
	@RequestMapping(value="/project/cstoreinfo/get/addon.do" )
	public String getTraderTax(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true , defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true , defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getAddon(http.argument, page, rows, sort ));
		return http.writer;
	}

	// (부가 서비스 정보 팝업) 연동서비스 정보 저장
	@RequestMapping(value="/project/cstoreinfo/set/addon.do" )
	public String setTraderTax(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAddon(http.argument));
		return http.writer;
	}

	// 체크
	@RequestMapping(value="/project/cstoreinfo/get/serial.do" )
	public String getSerial(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSerial(http.argument));
		return http.writer;
	}


}
