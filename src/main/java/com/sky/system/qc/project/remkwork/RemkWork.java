package com.sky.system.qc.project.remkwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class RemkWork extends DefaultControlHandler{

	@Autowired
	private RemkWorkService service;


	@RequestMapping(value="/qc/project/remkwork/get/master1.do")
	public String getMaster1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/qc/project/remkwork/get/master2.do")
	public String getMaster2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/qc/project/remkwork/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/qc/project/remkwork/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/qc/project/remkwork/get/seqn.do"  )
	public String getSeqn( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}

	// 이미지업로드
	@RequestMapping(value="qc/project/remkwork/set/fileUpload.do"  )
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}
}
