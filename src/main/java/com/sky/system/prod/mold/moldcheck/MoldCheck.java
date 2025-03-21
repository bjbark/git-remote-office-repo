package com.sky.system.prod.mold.moldcheck;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class MoldCheck extends DefaultControlHandler{

	@Autowired
	private MoldCheckService service;
	// master
	@RequestMapping(value="prod/mold/moldcheck/get/mastersearch.do"  )
	public String getMasterSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMasterSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	//detail1
	@RequestMapping(value="prod/mold/moldcheck/get/detailsearch1.do"  )
	public String getDetailSearch1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetailSearch1(http.argument, page, rows, sort));
		return http.writer;
	}

	//detail2
		@RequestMapping(value="prod/mold/moldcheck/get/detailsearch2.do"  )
		public String getDetailSearch2( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getDetailSearch2(http.argument, page, rows, sort));
			return http.writer;
		}

	// 저장
	@RequestMapping(value="prod/mold/moldcheck/set/detail1.do"  )
	public String setDetail1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail1(http.argument));
		return http.writer;
	}

	@RequestMapping(value="prod/mold/moldcheck/set/detail2.do"  )
	public String setDetail2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail2(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/prod/mold/moldcheck/get/seqn1.do"  )
	public String getSeqn1( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn1(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/prod/mold/moldcheck/get/seqn2.do"  )
	public String getSeqn2( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn2(http.argument));
		return http.writer;
	}

}
