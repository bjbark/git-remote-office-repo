package com.sky.system.stock.close.mtrlstocklist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class MtrlStockList  extends DefaultControlHandler{

	@Autowired
	private MtrlStockListService service;

	@RequestMapping(value="/stock/close/mtrlstocklist/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/stock/close/mtrlstocklist/get/searchWrhs.do"  )
	public String getSearchWrhs(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchWrhs(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/stock/close/mtrlstocklist/get/searchWrhsStock.do"  )
	public String getSearchWrhsStock(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchWrhsStock(http.argument, page, rows, sort ));
		return http.writer;
	}
}
