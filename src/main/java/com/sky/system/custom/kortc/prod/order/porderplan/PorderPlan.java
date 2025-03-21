package com.sky.system.custom.kortc.prod.order.porderplan;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("kortc.PorderPlan")
@Controller
public class PorderPlan  extends DefaultControlHandler{

	@Autowired
	private PorderPlanService service;

	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/search2.do")
	public String getSearch2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/search3.do")
	public String getSearch3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/pror.do")
	public String getPror(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPror(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/detail2.do")
	public String getDetail2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/detail3.do")
	public String getDetail3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail3(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/detail4.do")
	public String getDetail4(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail4(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/prod/order/porderplan/get/prordetail.do")
	public String getProrDetail(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProrDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/prod/order/porderplan/set/pror.do"  )
	public String  setPror(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPror(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/prod/order/porderplan/set/prorDelete.do"  )
	public String  setProrDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setProrDelete(http.argument));
		return http.writer;
	}



}
