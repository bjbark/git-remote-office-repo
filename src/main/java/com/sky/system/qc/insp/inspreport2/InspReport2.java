package com.sky.system.qc.insp.inspreport2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class InspReport2 extends DefaultControlHandler{

	@Autowired
	private InspReport2Service service;

	/**
	 * lister 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspreport2/get/lister.do")
	public String getLister( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLister(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspreport2/get/lister2.do")
	public String getLister2( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLister2(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspreport2/get/lister3.do")
	public String getLister3( HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getLister3(http.argument));
			return http.writer;
	}
}
