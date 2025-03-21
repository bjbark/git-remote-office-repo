package com.sky.system.custom.hantop.cam;

import java.util.Map;

import net.sky.core.common.annotation.ReleaseToken;
import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class Cam extends DefaultControlHandler{

	@Autowired
	private CamService service;
	// 브랜드조회
	@RequestMapping(value="/custom/hantop/cam/get/brand.do"  )
	public String getBrand( @ReleaseToken HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page"  , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit" , required=true, defaultValue="400") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBrand(http.argument, page, rows));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/custom/hantop/cam/get/pfilecam.do"  )
	public String getSearch( @ReleaseToken HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page"  , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit" , required=true, defaultValue="400") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/custom/hantop/cam/get/ordersearch.do"  )
	public String getOrderSearch( @ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderSearch(http.argument));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/custom/hantop/cam/get/orderresearch.do"  )
	public String getOrderReSearch( @ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderReSearch(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/hantop/cam/get/estimastsearch.do"  )
	public String getEstimastSearch( @ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page"  , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit" , required=true, defaultValue="400") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getEstimastSearch(http.argument, page, rows));
		return http.writer;
	}
	@RequestMapping(value="/custom/hantop/cam/get/estiitemsearch.do"  )
	public String getEstiitemSearch( @ReleaseToken HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page"  , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit" , required=true, defaultValue="400") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getEstiitemSearch(http.argument, page, rows));
		return http.writer;
	}
	@RequestMapping(value="/custom/hantop/cam/set/jobfinish.do")
	public String setJobFinish(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setJobFinish(http.argument ));
		return http.writer;
	}
}
