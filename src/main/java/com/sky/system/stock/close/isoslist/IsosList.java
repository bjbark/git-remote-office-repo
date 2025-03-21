package com.sky.system.stock.close.isoslist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class IsosList  extends DefaultControlHandler{

	@Autowired
	private IsosListService service;

	@RequestMapping(value="/stock/close/isoslist/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/stock/close/isoslist/get/search2.do"  )
	public String getSearch2(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument));
		return http.writer;
	}
}
