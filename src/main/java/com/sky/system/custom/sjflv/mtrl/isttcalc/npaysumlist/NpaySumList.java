package com.sky.system.custom.sjflv.mtrl.isttcalc.npaysumlist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("sjung.NpaySumList")
@Controller
public class NpaySumList  extends DefaultControlHandler{

	@Autowired
	private NpaySumListService service;

	@RequestMapping(value="custom/sjflv/mtrl/isttcalc/npaysumlist/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
			return http.writer;
	}
	
	@RequestMapping(value="custom/sjflv/mtrl/isttcalc/npaysumlist/get/search2.do")
	public String getSearch2(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument));
			return http.writer;
	}
}
