package com.sky.system.prod.order.workbook;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class WorkBook extends DefaultControlHandler{

	@Autowired
	private WorkBookService service;

	// 조회
	@RequestMapping(value="prod/order/workbook/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 작업자 조회
	@RequestMapping(value="prod/order/workbook/get/mans.do"  )
	public String getMans( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMans(http.argument, page, rows, sort));
		return http.writer;
	}

	// 불량현황 조회
	@RequestMapping(value="prod/order/workbook/get/qc.do"  )
	public String getQc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getQc(http.argument, page, rows, sort));
		return http.writer;
	}

	// 유실공수 조회
	@RequestMapping(value="prod/order/workbook/get/loss.do"  )
	public String getLoss( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLoss(http.argument, page, rows, sort));
		return http.writer;
	}

	// 자재투입 조회
	@RequestMapping(value="prod/order/workbook/get/mtrl.do"  )
	public String getMtrl( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrl(http.argument, page, rows, sort));
		return http.writer;
	}

	// 공정검사 조회
	@RequestMapping(value="prod/order/workbook/get/wkct.do"  )
	public String getWkct( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="prod/order/workbook/set/modify.do"  )
	public String setModify(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setModify(http.argument ));
		return http.writer;
	}
}

