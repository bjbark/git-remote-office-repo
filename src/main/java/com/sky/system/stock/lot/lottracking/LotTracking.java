package com.sky.system.stock.lot.lottracking;

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
public class LotTracking extends DefaultControlHandler{

	@Autowired
	private LotTrackingService service;
	// 조회
	@RequestMapping(value="stock/lot/lottracking/get/isos.do"  )
	public String getIsos( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getIsos(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="stock/lot/lottracking/get/acpt.do"  )
	public String getAcpt( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getAcpt(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="stock/lot/lottracking/get/ordr.do"  )
	public String getOrdr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getOrdr(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="stock/lot/lottracking/get/pror.do"  )
	public String getPror( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getPror(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="stock/lot/lottracking/get/istt.do"  )
	public String getIstt( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getIstt(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="stock/lot/lottracking/get/workmtrl.do"  )
	public String getWorkMtrl( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getWorkMtrl(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="stock/lot/lottracking/get/prod.do"  )
	public String getProd( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProd(http.argument, page, rows, sort));
		return http.writer;
	}
}

