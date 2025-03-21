package com.sky.system.stock.lot.lotlstocklist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jcraft.jsch.Logger;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class LotlStockList extends DefaultControlHandler{

	@Autowired
	private LotlStockListService service;
	// 조회
	@RequestMapping(value="stock/lot/lotlstocklist/get/mastersearch.do"  )
	public String getMasterSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMasterSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="stock/lot/lotlstocklist/get/detailsearch.do"  )
	public String getDetailSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetailSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="stock/lot/lotlstocklist/get/mastermobile.do"  )
	public String getMasterMobile( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMasterMobile(http.argument));
		return http.writer;
	}
	@RequestMapping(value="stock/lot/lotlstocklist/get/detailmobile.do"  )
	public String getDetailMobile( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetailMobile(http.argument));
		return http.writer;
	}
}

