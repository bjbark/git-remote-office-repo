package com.sky.system.custom.kitec.prod.prodplan;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Service("kitec.ProdPlan")
@Controller
public class ProdPlan  extends DefaultControlHandler{

	@Autowired
	private ProdPlanService service;

	@RequestMapping(value="/custom/kitec/prod/prodplan/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kitec/prod/prodplan/get/search2.do")
	public String getSearch2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kitec/prod/prodplan/get/stok.do"  )
	public String getStok(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getStok(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kitec/prod/prodplan/get/unqntt.do"  )
	public String getQntt(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getQntt(http.argument, page, rows, sort ));
	return http.writer;
	}

	@RequestMapping(value="/custom/kitec/prod/prodplan/set/setProdPlan.do")
	public String  setProdPlan(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setProdPlan(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/kitec/prod/prodplan/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

}
