package com.sky.system.mobile.mtrlistt;

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
public class MtrlIstt {

	@Autowired
	private MtrlIsttService service;

	@RequestMapping(value="/mobile/mtrlistt/get/search.do")										//입고처리
	public String getSearch(@ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="300") int rows,
			@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/mobile/mtrlistt/get/search2.do")									//입고내역
	public String getSearch2(@ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="300") int rows,
			@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
		return http.writer;
	}
	// 저장 (수입검사대장 상태 변경 및 수입검사 실적을 자재입고대장에 추가 함)
	@RequestMapping(value="/mobile/mtrlistt/set/record.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}


}
