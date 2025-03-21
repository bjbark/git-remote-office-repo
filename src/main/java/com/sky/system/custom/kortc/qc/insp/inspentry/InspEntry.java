package com.sky.system.custom.kortc.qc.insp.inspentry;

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
@Service("kortc.InspEntry")
public class InspEntry {

	@Autowired
	private InspEntryService service;

	// 수입검사입력조회
	@RequestMapping(value="/custom/kortc/qc/insp/inspentry/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 수입검사리스트조회
	@RequestMapping(value="/custom/kortc/qc/insp/inspentry/get/search2.do")
	public String getSearch2( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
		return http.writer;
	}

	// mrb정보조회
	@RequestMapping(value="/custom/kortc/qc/insp/inspentry/get/mrb.do"  )
	public String getMrb( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMrb(http.argument, page, rows, sort));
		return http.writer;
	}

	// 파일업로드(다중)
	@RequestMapping(value="/custom/kortc/qc/insp/inspentry/set/fileUpload.do"  )
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}

	// 에디터저장
	@RequestMapping(value="/custom/kortc/qc/insp/inspentry/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 에디터저장
	@RequestMapping(value="/custom/kortc/qc/insp/inspentry/set/mrb.do")
	public String setMrb(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMrb(http.argument));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/kortc/qc/insp/inspentry/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

}
