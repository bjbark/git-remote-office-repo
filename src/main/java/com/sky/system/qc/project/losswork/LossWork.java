package com.sky.system.qc.project.losswork;

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
public class LossWork extends DefaultControlHandler{

	@Autowired
	private LossWorkService service;


	@RequestMapping(value="/qc/project/losswork/get/master.do")
	public String getMaster( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/qc/project/losswork/get/detail.do")
	public String getDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/qc/project/losswork/get/image.do")
	public String getImage( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/qc/project/losswork/get/seqn.do")
	public String getSeqn( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/project/losswork/get/imgseqn.do")
	public String getImgSeqn( HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getImgSeqn(http.argument));
			return http.writer;
	}
	// 저장
	@RequestMapping(value="/qc/project/losswork/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	// detail저장
	@RequestMapping(value="/qc/project/losswork/set/detail.do"  )
	public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/project/losswork/set/image.do"  )
	public String setImage(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setImage(http.argument, uploadItem));
		return http.writer;
	}
	@RequestMapping(value="/qc/project/losswork/set/deletImage.do"  )
	public String setDeleteImage(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeleteImage(http.argument));
		return http.writer;
	}
}
