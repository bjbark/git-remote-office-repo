package com.sky.system.zreport;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.sky.http.dispatch.control.DefaultControlHandler;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class ZSaleNotList  extends DefaultControlHandler{

	@Autowired
	private ZSaleNotListService service;

	// 조회 - 주문 매출 확정 조회
	@RequestMapping(value="/zreport/zsalenotlist/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));

		return http.writer;
	}

	// sms 전송
	@RequestMapping(value="/zreport/zsalenotlist/set/smssend.do"  )
	public String setSmssend( HttpMessage http , Map<String, Object> model) throws Exception {
		System.out.println("smssend "+http.argument);
		model.put(HttpResponseMessage.RECORDS, service.setSmssend(http.argument));
		return http.writer;
	}


	//sms전송현황 조회	리스트
	@RequestMapping(value="/zreport/zsalenotlist/get/smsinfom.do"  )
	public String getSmsinfom( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSmsinfom(http.argument, page, rows, sort));
		return http.writer;
	}


	//sms전송현황 - 조회 상세
	@RequestMapping(value="/zreport/zsalenotlist/get/smsinfod.do"  )
	public String  getSmsinfod(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSmsinfod(http.argument));
		return http.writer;
	}


	//sms전송현황 - 재전송 프로그램
	@RequestMapping(value="/zreport/zsalenotlist/set/smsinfo.do"  )
	public String  setFaxSend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFaxSend(http.argument));
		return http.writer;
	}




}
