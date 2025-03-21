package com.sky.system.custom.sjflv.prod.prodplanmtrl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller("sjflv.ProdPlanMtrl")
public class ProdPlanMtrl {
	
	@Autowired
	private ProdPlanMtrlService service;
	
	@RequestMapping(value = "/custom/sjflv/prod/prodplanmtrl/get/search1.do")
	public String getSearch1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	@RequestMapping(value = "/custom/sjflv/prod/prodplanmtrl/set/purctrst.do")
	public String setPurcTrst(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setPurcTrst(http.argument));
		return http.writer;
	}
}
