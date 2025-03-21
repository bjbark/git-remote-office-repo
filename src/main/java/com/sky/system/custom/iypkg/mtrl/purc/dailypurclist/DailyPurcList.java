package com.sky.system.custom.iypkg.mtrl.purc.dailypurclist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class DailyPurcList  extends DefaultControlHandler{

	@Autowired
	private DailyPurcListService service;

	//원단매입일보 조회
	@RequestMapping(value="/custom/iypkg/mtrl/purc/dailypurclist/get/search1.do")
	public String getSearch1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="start", required=true, defaultValue="10") int start,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort, start ));
		return http.writer;
	}

	//외주매입일보 조회
		@RequestMapping(value="/custom/iypkg/mtrl/purc/dailypurclist/get/search2.do")
		public String getSearch2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
			return http.writer;
		}

	//상품매입일보 조회
	@RequestMapping(value="/custom/iypkg/mtrl/purc/dailypurclist/get/search3.do")
	public String getSearch3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort ));
		return http.writer;
	}

	//부자재매입일보 조회
		@RequestMapping(value="/custom/iypkg/mtrl/purc/dailypurclist/get/search4.do")
		public String getSearch4(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch4(http.argument, page, rows, sort ));
			return http.writer;
		}
}
