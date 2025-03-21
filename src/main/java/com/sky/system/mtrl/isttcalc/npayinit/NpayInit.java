package com.sky.system.mtrl.isttcalc.npayinit;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("sjflv.NpayInit")
@Controller
public class NpayInit  extends DefaultControlHandler{

	@Autowired
	private NpayInitService service;


	@RequestMapping(value="mtrl/isttcalc/npayinit/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
			return http.writer;
		}

	//저장
	@RequestMapping(value="mtrl/isttcalc/npayinit/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
}
