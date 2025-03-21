package com.sky.system.custom.komec.mtrl.po.purcwait;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class PurcWait  extends DefaultControlHandler{

	@Autowired
	private PurcWaitService service;

	@RequestMapping(value="/custom/komec/mtrl/po/purcwait/get/search.do"  )
	public String getSearch1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/mtrl/po/purcwait/set/records.do"  )
	public String setRecords(HttpMessage http, Map<String, Object> model ) throws Exception {		
		model.put(HttpResponseMessage.RECORDS, service.setRecords(http.argument ));
		return http.writer;
	}
}
