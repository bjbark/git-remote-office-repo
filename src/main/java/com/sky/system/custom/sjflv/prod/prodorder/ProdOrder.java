package com.sky.system.custom.sjflv.prod.prodorder;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("sjflv.ProdOrder")
@Controller
public class ProdOrder  extends DefaultControlHandler{

	@Autowired
	private ProdOrderService service;

	@RequestMapping(value="/custom/sjflv/prod/prodorder/get/search1.do"  )
	public String getSearch1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/prod/prodorder/get/search2.do"  )
	public String getSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}
	// 룩업
	@RequestMapping(value="/custom/sjflv/prod/prodorder/get/lookup.do"  )
	public String getLookup(
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/sjflv/prod/prodorder/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/sjflv/prod/prodorder/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}
}
