package com.sky.system.mobile.eis.dailystock;

import java.util.Map;

import net.sky.core.common.annotation.ReleaseToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Controller
@Service("mobile.DailyStock")
public class DailyStock {

	@Autowired
	private DailyStockService service;

	@RequestMapping(value="/mobile/eis/dailystock/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}

}
