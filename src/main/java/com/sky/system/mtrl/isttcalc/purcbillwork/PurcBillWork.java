package com.sky.system.mtrl.isttcalc.purcbillwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("sjflv.PurcBillWork")
@Controller
public class PurcBillWork  extends DefaultControlHandler{


	@Autowired
	private PurcBillWorkService service;


	@RequestMapping(value="/mtrl/isttcalc/purcbillwork/get/master1.do")
	public String getMaster1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/isttcalc/purcbillwork/get/detail1.do")
	public String getDetail1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/isttcalc/purcbillwork/get/master2.do")
	public String getMaster2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/isttcalc/purcbillwork/get/detail2.do")
	public String getDetail2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort ));
		return http.writer;
	}
}
