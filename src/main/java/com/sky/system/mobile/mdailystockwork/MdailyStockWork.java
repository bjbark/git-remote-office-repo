package com.sky.system.mobile.mdailystockwork;

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
public class MdailyStockWork {

	@Autowired
	private MdailyStockWorkService service;

	@RequestMapping(value="/mobile/mdailystockwork/get/lister.do"  )
	public String getMaster(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/mobile/mdailystockwork/get/mwkct.do"  )
	public String getMWkct(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMWkct(http.argument));
		return http.writer;
	}
}
