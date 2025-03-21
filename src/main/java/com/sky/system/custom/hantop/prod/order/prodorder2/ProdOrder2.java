package com.sky.system.custom.hantop.prod.order.prodorder2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("hantop.ProdOrder2")
@Controller
public class ProdOrder2 extends DefaultControlHandler{

	@Autowired
	private ProdOrder2Service service;

	//master조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	//detail조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	//detail2조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/get/detail2.do")
	public String getDetail2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument));
		return http.writer;
	}

	//detail조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/get/detail3.do")
	public String getDetail3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail3(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/set/optm.do")
	public String setOptm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOptm(http.argument ));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	//확정
	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/set/cofm.do")
	public String setCofm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCofm(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/set/plan.do")
	public String setPlan(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPlan(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hntop/prod/order/prodorder2/get/cutplan2.do")
	public String getCutPlan2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCutPlan2(http.argument));
		return http.writer;
	}
}
