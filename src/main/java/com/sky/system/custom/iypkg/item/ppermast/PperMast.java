package com.sky.system.custom.iypkg.item.ppermast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class PperMast extends DefaultControlHandler{

	@Autowired
	private PperMastService service;

	// 조회
	@RequestMapping(value="/custom/iypkg/item/ppermast/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/item/ppermast/get/lookup.do"  )
	public String getLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/ppermast/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/item/ppermast/get/cstm.do"  )
	public String getCstm( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstm(http.argument, page, rows, sort));
		return http.writer;
	}

	// 이전단가 조회
	@RequestMapping(value="/custom/iypkg/item/ppermast/get/cstmpric.do" )
	public String getCstmPric(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstmPric(http.argument));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/item/ppermast/get/cstmlookup.do"  )
	public String getCstmLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstmLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/ppermast/set/cstm.do"  )
	public String setCstm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCstm(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/item/ppermast/get/pric.do"  )
	public String getPric( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getPric(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/item/ppermast/get/priclookup.do"  )
	public String getPricLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getPricLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/ppermast/set/pric.do"  )
	public String setPric(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPric(http.argument));
		return http.writer;
	}

}
