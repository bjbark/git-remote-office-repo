package com.sky.system.custom.kortc.qc.chge.chgemast;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class ChgeMast {

	@Autowired
	private ChgeMastService service;

	// 변경관리 리스트 조회
	@RequestMapping(value="/custom/kortc/qc/chge/chgemast/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// mrb정보조회
	/*@RequestMapping(value="/custom/kortc/qc/insp/inspentry/get/mrb.do"  )
	public String getMrb( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMrb(http.argument, page, rows, sort));
		return http.writer;
	}*/

	// 파일검색
	@RequestMapping(value="/custom/kortc/qc/chge/chgemast/get/filesearch.do"  )
	public String getFileSearch(HttpMessage http,  Map<String, Object> model,
		@RequestParam(value="page"	, required=true	, defaultValue="1") int page,
		@RequestParam(value="limit"	, required=true	, defaultValue="10") int rows,
		@RequestParam(value="sort"	, required=false, defaultValue="") String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFileSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 에디터저장
	@RequestMapping(value="/custom/kortc/qc/chge/chgemast/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/kortc/qc/chge/chgemast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

}
