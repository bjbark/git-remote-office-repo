package com.sky.system.stock.close.dailystockwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class DailyStockWork  extends DefaultControlHandler{

	@Autowired
	private DailyStockWorkService service;


	@RequestMapping(value="/stock/close/dailystockwork/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/stock/close/dailystockwork/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//재고현황 작성
	@RequestMapping(value="/stock/close/dailystockwork/set/write.do"  )
	public String setWrite(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWrite(http.argument ));
		return http.writer;
	}

	//재고현황 삭제
	@RequestMapping(value="/stock/close/dailystockwork/delete.do"  )
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/stock/close/dailystockwork/get/wkctsearch.do"  )
	public String getWkctSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkctSearch(http.argument ));
		return http.writer;
	}
}
