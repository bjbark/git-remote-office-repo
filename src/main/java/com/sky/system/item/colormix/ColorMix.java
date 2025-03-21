package com.sky.system.item.colormix;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.system.item.colormix.ColorMixService;

@Controller
public class ColorMix extends DefaultControlHandler{

	@Autowired
	private ColorMixService service;
	// master
	@RequestMapping(value="item/colormix/get/mastersearch.do"  )
	public String getMasterSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMasterSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	//item조회
	@RequestMapping(value="item/colormix/get/item.do"  )
	public String getItem( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getItem(http.argument, page, rows, sort));
		return http.writer;
	}

	//detail
	@RequestMapping(value="item/colormix/get/detailsearch.do"  )
	public String getDetailSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetailSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="item/colormix/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="item/colormix/set/item.do"  )
	public String setItem(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem(http.argument));
		return http.writer;
	}

	@RequestMapping(value="item/colormix/get/seqn.do"  )
	public String getSeqn( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}

}
