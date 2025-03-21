package com.sky.system.mobile.cvicdmge;

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
public class CvicDmge {

	@Autowired
	private CvicDmgeService service;

	@RequestMapping(value="/mobile/cvicdmge/set/cvicdmge.do"  )
	public String getCvicDmge(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCvicDmge(http.argument));
		return http.writer;
	}

}
