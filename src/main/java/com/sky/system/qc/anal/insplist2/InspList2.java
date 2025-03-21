package com.sky.system.qc.anal.insplist2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class InspList2 extends DefaultControlHandler{

	@Autowired
	private InspList2Service service;


	//불량현황 조회
	@RequestMapping(value="/qc/anal/insplist2/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	//담당자별 불량수량 조회
	@RequestMapping(value="/qc/anal/insplist2/get/lister2.do")
	public String getLister2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getLister2(http.argument, page, rows, sort));
			return http.writer;
	}

	//담당자별 불량수량 조회
		@RequestMapping(value="/qc/anal/insplist2/get/lister3.do")
		public String getLister3( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
				model.put(HttpResponseMessage.RECORDS, service.getLister3(http.argument, page, rows, sort));
				return http.writer;
		}

		//담당자별 불량수량 조회
		@RequestMapping(value="/qc/anal/insplist2/get/lister4.do")
		public String getLister4( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
				model.put(HttpResponseMessage.RECORDS, service.getLister4(http.argument, page, rows, sort));
				return http.writer;
		}
}
