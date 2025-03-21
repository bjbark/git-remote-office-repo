package com.sky.system.prod.order.otodwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class OtodWork extends DefaultControlHandler{

	@Autowired
	private OtodWorkService service;

	/**
	 * master 조회
	 */
	@RequestMapping(value="/prod/order/otodwork/get/master.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	/**
	 * detail 조회
	 */
	@RequestMapping(value="/prod/order/otodwork/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	//외주작업지시 발주등록 서치
	@RequestMapping(value="/prod/order/otodwork/get/search.do"  )
	public String getInvoice2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice2(http.argument));
		return http.writer;
	}


	//외주작업지시 발주등록 저장
	@RequestMapping(value="/prod/order/otodwork/set/invoice2.do"  )
	public String setInvoice2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice2(http.argument));
		return http.writer;
	}


	//입고등록
	@RequestMapping(value="/prod/project/otodwork/set/istt.do"  )
	public String setIstt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setIstt(http.argument ));
		return http.writer;

	}
	//부분입고등록
	@RequestMapping(value="/prod/project/otodwork/set/istt_part.do"  )
	public String setIstt_part(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setIstt_part(http.argument ));
		return http.writer;
	}

	//출고등록
	@RequestMapping(value="/prod/project/otodwork/set/ostt.do"  )
	public String setOstt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOstt(http.argument ));
		return http.writer;

	}

	//삭제
	@RequestMapping(value="/prod/project/otodwork/set/delete.do"  )
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument ));
		return http.writer;

	}



}
