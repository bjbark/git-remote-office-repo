package com.sky.system.callcenter;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Controller
public class CallCenter {

	@Autowired
	private CallCenterService service;

	@RequestMapping(value="/callcenter/call1.do"  )
	public String testCall1( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.testCall1(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/callcenter/call2.do"  )
	public ModelAndView testCall2( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		service.testCall2();

		String cvic_idcd = (String) arg.getParameter("cvic_idcd");
		String chek_name = arg.getParamText("chek_name");

		ModelAndView ma = new ModelAndView();
		ma.addObject("cvic_idcd", cvic_idcd);
		ma.addObject("chek_name", chek_name);

		ma.setViewName( "callview/CvicCheck");

		return ma;
	}
}
