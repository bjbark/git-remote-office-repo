package com.sky.system.custom.komec.stock.isos.movemast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("komec.MoveMast")
@Controller
public class MoveMast  extends DefaultControlHandler{

	@Autowired
	private MoveMastService service;

	@RequestMapping(value="/custom/komec/stock/isos/movemast/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/stock/isos/movemast/set/records.do"  )
	public String setRecords(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecords(http.argument ));
		return http.writer;

	}

}
