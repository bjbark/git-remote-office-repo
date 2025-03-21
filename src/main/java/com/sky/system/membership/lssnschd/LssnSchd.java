 package com.sky.system.membership.lssnschd;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class LssnSchd  extends DefaultControlHandler{

	@Autowired
	private LssnSchdService service;

	@RequestMapping(value="/membership/lssnschd/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}



}
