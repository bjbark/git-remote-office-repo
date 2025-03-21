package com.sky.system.custom.kortc.prod.order.prodnotlist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("kortc.ProdNotList")
@Controller
public class ProdNotList  extends DefaultControlHandler{

	@Autowired
	private ProdNotListService service;

	// 거래처별 월 원단 매입 통계
	@RequestMapping(value="/custom/kortc/prod/order/prodnotlist/get/lister.do")
	public String getLister(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLister(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/prod/order/prodnotlist/get/search2.do"  )
	public String getSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}
}
