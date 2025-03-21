package com.sky.system.project.bonsainfo;

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
public class BonsaInfo extends DefaultControlHandler{

	@Autowired
	private BonsaInfoService service;

	// 조회
	@RequestMapping(value="/project/bonsainfo/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model ,
		@RequestParam(value="page" , required=true , defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true , defaultValue="20") int rows,
		@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 팝업
	@RequestMapping(value="/project/bonsainfo/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true , defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true , defaultValue="00") int rows,
		@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/project/bonsainfo/set/record.do" )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));

		//service.setRecord(http.argument);
		return http.writer;
	}


	/**
	 * 로고 이미지 upload
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/project/bonsainfo/set/upload.do")
	public String setUpload(HttpMessage http,  Map<String, Object> model, UploadItem image) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setUpload(http.argument, image));
		return http.writer;
	}

	@RequestMapping(value="/project/bonsainfo/del/upload.do")
	public String delUpload(HttpMessage http,  Map<String, Object> model, UploadItem image) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.delUpload(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/project/bonsainfo/get/lastsales.do")
	public String getLastSales(HttpMessage http,  Map<String, Object> model, UploadItem image) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLastSales(http.argument ));
		return http.writer;
	}

}
