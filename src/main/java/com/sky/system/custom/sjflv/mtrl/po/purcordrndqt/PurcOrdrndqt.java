package com.sky.system.custom.sjflv.mtrl.po.purcordrndqt;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class PurcOrdrndqt extends DefaultControlHandler{

	@Autowired
	private PurcOrdrndqtService service;

	// 저장
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordrndqt/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
}
