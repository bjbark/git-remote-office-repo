package com.sky.system.project.projword;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ProjWord extends DefaultControlHandler{

	@Autowired
	private ProjWordService service;



	@RequestMapping(value="/project/projword/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
	model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
	return http.writer;
	}

	// 저당
	@RequestMapping(value="/project/projword/set/record.do")
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/project/projword/set/wordcopy.do")
	public String setWordCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWordCopy(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/project/projword/set/wordallcopy.do")
	public String setWordAllCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWordAllCopy(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/project/projword/set/wordmake.do")
	public String setWordMake(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWordMake(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/project/projword/set/wordcreate.do")
	public String setWordCreate(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWordCreate(http.argument));
		return http.writer;
	}


}
