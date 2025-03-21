package com.sky.system.upload;

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
public class Upload  extends DefaultControlHandler{

	@Autowired
	private UploadService service;

	// 파일업로드
	@RequestMapping(value="/upload/set/fileUpload.do"  )
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}
	@RequestMapping(value="/upload/set/modifyUpload.do"  )
	public String modifyUpload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.modifyUpload(http.argument, uploadItem));
		return http.writer;
	}
	// 로컬에 파일다운로드
	@RequestMapping(value="/upload/set/fileDownload.do"  )
	public String download(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.download(http.argument));
		return http.writer;
	}
	// 로컬파일삭제
	@RequestMapping(value="/upload/set/localDelete.do"  )
	public String localDelete(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.localDelete(http.argument));
		return http.writer;
	}
	//FileSearch
	@RequestMapping(value="/upload/get/filesearch.do"  )
	public String getFileSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getFileSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	//ImageSearch
	@RequestMapping(value="/upload/get/imagesearch.do"  )
	public String getImageSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getImageSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="upload/get/getfileseqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="upload/get/fileDelete.do"  )
	public String fileDelete(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.fileDelete(http.argument));
		return http.writer;
	}
	@RequestMapping(value="upload/get/fileRename.do"  )
	public String fileRename(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.fileRename(http.argument));
		return http.writer;
	}

	@RequestMapping(value="upload/set/hometaxExcel.do"  )
	public String setHomeTaxExcel(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setHomeTaxExcel(http.argument));
		return http.writer;
	}


}
