package com.sky.system.project.domain;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class Domain extends DefaultControlHandler{

	@Autowired
	private DomainService service;



	// 조회
	@RequestMapping(value="/project/domain/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
	return http.writer;
	}


	// 조회
	@RequestMapping(value="/project/domain/get/lookup.do")
	public String getLookup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows ));
	return http.writer;
	}

	// 저장
	@RequestMapping(value="/project/domain/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/domain/get/searchword.do")
	public String getSearchWord(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchWord(http.argument, page, rows, sort ));
	return http.writer;
	}
	// 저장
	@RequestMapping(value="/project/domain/set/recordword.do")
	public String setRecordWord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecordWord(http.argument));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/domain/get/table.do")
	public String getTable(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getTable(http.argument, page, rows, sort ));
	return http.writer;
	}

	// 조회
	@RequestMapping(value="/project/domain/get/tablelookup.do")
	public String getTableLookup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getTableLookup(http.argument, page, rows ));
	return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/domain/get/searchtable.do")
	public String getSearchTable(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchTable(http.argument, page, rows, sort ));
	return http.writer;
	}
	// 저장
	@RequestMapping(value="/project/domain/set/table.do")
	public String setTable(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTable(http.argument));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="/project/domain/set/relation.do")
	public String setRelation(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRelation(http.argument));
		return http.writer;
	}
	// 삭제
	@RequestMapping(value="/project/domain/delete/relation.do")
	public String deleteRelation(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.deleteRelation(http.argument));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="/project/domain/set/tablelist.do")
	public String setTableList(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTableList(http.argument));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/project/domain/get/relation.do")
	public String getRelation(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getRelation(http.argument, page, rows, sort ));
	return http.writer;
	}
}
