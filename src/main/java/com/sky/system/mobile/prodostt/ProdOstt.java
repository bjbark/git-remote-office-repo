package com.sky.system.mobile.prodostt;

import java.util.Map;

import net.sky.core.common.annotation.ReleaseToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Controller
public class ProdOstt {

	@Autowired
	private ProdOsttService service;

	@RequestMapping(value="/mobile/prodostt/get/search.do")
	public String getSearch(@ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/mobile/prodostt/get/search2.do")
	public String getSearch2(@ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
		return http.writer;
	}
	// 저장 (수입검사대장 상태 변경 및 수입검사 실적을 자재입고대장에 추가 함)
	@RequestMapping(value="/mobile/prodostt/set/record.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}


}
