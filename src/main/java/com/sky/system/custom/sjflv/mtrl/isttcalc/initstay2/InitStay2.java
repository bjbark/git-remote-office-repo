package com.sky.system.custom.sjflv.mtrl.isttcalc.initstay2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("sjung.InitStay2")
@Controller
public class InitStay2  extends DefaultControlHandler{

	@Autowired
	private InitStay2Service service;


	@RequestMapping(value="/custom/sjflv/mtrl/isttcalc/initstay2/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/mtrl/isttcalc/initstay2/get/search2.do")
	public String getSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/mtrl/isttcalc/initstay2/set/update.do")
	public String setUpdate(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setUpdate(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/mtrl/isttcalc/initstay2/set/del_yn.do2")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

}
