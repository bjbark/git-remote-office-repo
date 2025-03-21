package com.sky.system.qc.moldinspstd;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class MoldInspStd extends DefaultControlHandler{

	@Autowired
	private MoldInspStdService service;
	// master
	@RequestMapping(value="/qc/basic/moldinspstd/get/mastersearch.do"  )
	public String getMasterSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMasterSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	//detail
	@RequestMapping(value="/qc/basic/moldinspstd/get/detailsearch.do"  )
	public String getDetailSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetailSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	//item1
		@RequestMapping(value="/qc/basic/moldinspstd/get/item1.do"  )
		public String getItem1( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getItem1(http.argument, page, rows, sort));
			return http.writer;
		}

	//item2
	@RequestMapping(value="/qc/basic/moldinspstd/get/item2.do"  )
	public String getItem2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getItem2(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/qc/basic/moldinspstd/set/item1.do"  )
	public String setItem1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem1(http.argument));
		return http.writer;
	}

}
