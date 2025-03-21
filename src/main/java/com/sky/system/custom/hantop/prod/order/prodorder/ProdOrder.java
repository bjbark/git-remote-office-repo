package com.sky.system.custom.hantop.prod.order.prodorder;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("hantop.ProdOrder")
@Controller
public class ProdOrder extends DefaultControlHandler{

	@Autowired
	private ProdOrderService service;

	//master조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	//detail조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}
	//master조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/get/cofm.do")
	public String getCofm( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getCofm(http.argument, page, rows, sort));
			return http.writer;
	}
	//cofm detail조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/get/detail3.do")
	public String getDetail3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail3(http.argument, page, rows, sort));
		return http.writer;
	}
	//cofm detail2조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/get/cofmdetail2.do")
	public String getCofmDetail2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCofmDetail2(http.argument, page, rows, sort));
		return http.writer;
	}
	//cofm detail3_2조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/get/cofmdetail3_2.do")
	public String getCofmDetail3_2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getCofmDetail3_2(http.argument, page, rows, sort));
			return http.writer;
	}
	//detail조회
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/get/maxIvst_ordr.do")
	public String getMaxIvst_ordr(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaxIvst_ordr(http.argument));
		return http.writer;
	}
	//견적복사
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/set/detail2.do")
	public String setDetail2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail2(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/set/cofmdetail3.do")
	public String setCofmDetail3(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCofmDetail3(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/set/rework.do")
	public String setRework(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRework(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/set/manual.do")
	public String setManual(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setManual(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/set/cofmcancel.do")
	public String setCofmCancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCofmCancel(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/hntop/prod/order/prodorder/set/optm.do")
	public String setOptm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOptm(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hntop/prod/order/prodorder/set/cancel.do")
	public String setCancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCancel(http.argument ));
		return http.writer;
	}
}
