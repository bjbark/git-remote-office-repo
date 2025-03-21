package com.sky.system.cust;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class CustInfo extends DefaultControlHandler {

	@Autowired
	private CustInfoService service;

	// 조회
	@RequestMapping(value="/cust/custinfo/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model, 
		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/cust/custinfo/set/record.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument ));
		return http.writer;
	}

	// 미수현황 조회
	@RequestMapping(value="/cust/custinfo/get/balancesale.do"  )
	public String getBalanceSale(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getBalanceSale(http.argument , page, rows));
		return http.writer;
	}

		
	
	// 미수현황 매출 상세 조회
	@RequestMapping(value="/cust/custinfo/get/balanceitem.do" )
	public String getBalanceItem(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBalanceItem(http.argument , page, rows));
		return http.writer;
	}	
	
	
	// 고객 리스트 상세 조회
	@RequestMapping(value="/cust/custinfo/get/custmember.do"  )
	public String getCustMember(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCustMember(http.argument , page, rows));
		return http.writer;
	}		
	
}
