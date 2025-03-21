package com.sky.system.prod.basic.prodlineroute;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ProdLineRoute extends DefaultControlHandler{

	@Autowired
	private ProdLineRouteService service;
	// 조회
	@RequestMapping(value="prod/basic/prodlineroute/get/SearchLister.do"  )
	public String getSearchLister( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearchLister(http.argument, page, rows, sort));

		return http.writer;
	}
	// 조회
	@RequestMapping(value="prod/basic/prodlineroute/get/SearchLister2.do"  )
	public String getSearchLister2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchLister2(http.argument, page, rows, sort));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="prod/basic/prodlineroute/get/SearchLister3.do"  )
	public String getSearchLister3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchLister3(http.argument, page, rows, sort));
		return http.writer;
	}
	// 조회
		@RequestMapping(value="prod/basic/prodlineroute/get/SearchLister4.do"  )
		public String getSearchLister4( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchLister4(http.argument, page, rows, sort));
			return http.writer;
		}
	// 룩업
	@RequestMapping(value="prod/basic/prodlineroute/get/lookup.do"  )
	public String getLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="prod/basic/prodlineroute/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}


}
