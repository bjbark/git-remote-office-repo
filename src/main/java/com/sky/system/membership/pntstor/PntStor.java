package com.sky.system.membership.pntstor;

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
public class PntStor extends DefaultControlHandler {

	@Autowired
	private PntStorService service;

	// 조회
	@RequestMapping(value="/membership/pntstor/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1"  ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 팝업
	@RequestMapping(value="/membership/pntstor/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/membership/pntstor/set/record.do"  )
	public String setRecord( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	/**
	 * 로고 이미지 upload
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/membership/pntstor/set/upload/stamp.do")
	public String setUploadStamp(HttpMessage http,  Map<String, Object> model, UploadItem image) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setUploadStamp(http.argument, image));
		return http.writer;
	}

	@RequestMapping(value="/membership/pntstor/del/upload/stamp.do")
	public String delUploadStamp(HttpMessage http,  Map<String, Object> model, UploadItem image) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.delUploadStamp(http.argument ));
		return http.writer;
	}

	/**
	 * 사업장 이미지 upload
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/membership/pntstor/set/upload/image")
	public String setUploadImage(HttpMessage http,  Map<String, Object> model, UploadItem image) throws Exception {
		service.setUploadImage(http.argument, image);
		return http.writer;
	}

}
