package com.sky.system.project.tablemanager;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class TableManager extends DefaultControlHandler{

	@Autowired
	private TableManagerService service;


	// 조회
	@RequestMapping(value="/project/tablemanager/get/master.do")
	public String getTable(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getTable(http.argument, page, rows, sort ));
	return http.writer;
	}

	// 조회
	@RequestMapping(value="/project/tablemanager/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
	return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/tablemanager/get/searchdomain.do")
	public String getSearchDomain(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchDomain(http.argument, page, rows, sort ));
	return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/tablemanager/get/searchdomainuse.do")
	public String getSearchDomainUse(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchDomainUse(http.argument, page, rows, sort ));
	return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/tablemanager/get/tablelookup.do")
	public String getTableLookup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTableLookup(http.argument));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="/project/tablemanager/get/word.do")
	public String getWord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWord(http.argument));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/tablemanager/get/wordlookup.do")
	public String getWordLookup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWordLookup(http.argument));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/tablemanager/get/domainlookup.do")
	public String getDomainLookup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDomainLookup(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/project/tablemanager/set/record.do")
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}

}
