package com.sky.system.custom.dehansol.stock.isos.saleostt;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("dehansol.SaleOstt")
@Controller
public class SaleOstt  extends DefaultControlHandler{

	@Autowired
	private SaleOsttService service;


	@RequestMapping(value="/custom/dehansol/stock/isos/saleostt/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	//출고지시
	@RequestMapping(value="/custom/dehansol/stock/isos/saleostt/set/release.do"  )
	public String setRelease(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRelease(http.argument ));
		return http.writer;

	}

	//출고취소
	@RequestMapping(value="/custom/dehansol/stock/isos/saleostt/set/releasecancel.do"  )
	public String setReleaseCancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setReleaseCancel(http.argument ));
		return http.writer;
	}

}
