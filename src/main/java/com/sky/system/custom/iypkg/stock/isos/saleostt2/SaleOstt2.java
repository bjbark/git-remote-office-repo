package com.sky.system.custom.iypkg.stock.isos.saleostt2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class SaleOstt2  extends DefaultControlHandler{


	@Autowired
	private SaleOstt2Service service;


	@RequestMapping(value="/custom/iypkg/stock/isos/saleostt2/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/saleostt2/get/search3.do")
	public String getSearch3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/saleostt2/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/stock/isos/saleostt2/set/modify.do")
	public String setModify(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setModify(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/saleostt2/set/updt.do")
	public String setUpdt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setUpdt(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/saleostt2/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}
}
