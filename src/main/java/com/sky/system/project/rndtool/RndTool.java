package com.sky.system.project.rndtool;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class RndTool extends DefaultControlHandler{

	@Autowired
	private RndToolService service;


	// 조회
	@RequestMapping(value="/project/rndtool/get/module.do")
	public String getModule(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getModule(http.argument, page, rows, sort ));
	return http.writer;
	}

	// 조회
	@RequestMapping(value="/project/rndtool/get/view.do")
	public String getView(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getView(http.argument, page, rows, sort ));
	return http.writer;
	}

	// 조회
	@RequestMapping(value="/project/rndtool/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
	return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/rndtool/get/lookup.do")
	public String getLookup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="/project/rndtool/set/record.do")
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/project/rndtool/set/make.do")
	public String setMake( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMake(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/project/rndtool/get/script.do")
	public String getScript( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getScript(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/project/rndtool/get/path.do")
	public String getPath( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getScript(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/project/rndtool/get/modl.do")
	public String getModl( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getScript(http.argument, page, rows, sort));
		return http.writer;
	}
}
