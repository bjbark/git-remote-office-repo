package com.sky.system.custom.iypkg.item.fabcmast;

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
public class FabcMast extends DefaultControlHandler{

	@Autowired
	private FabcMastService service;

	// 조회
	@RequestMapping(value="/custom/iypkg/item/fabcmast/get/search.do" )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/item/fabcmast/get/lookup.do" )
	public String getLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort,
			HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/fabcmast/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/item/fabcmast/get/fabcbom.do" )
	public String getFabcbom( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getFabcbom(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/fabcmast/set/fabcbom.do" )
	public String setFabcbom(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFabcbom(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/item/fabcmast/get/fabcpric.do" )
	public String getFabcpric( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFabcpric(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/fabcmast/set/fabcpric.do" )
	public String setFabcpric(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFabcpric(http.argument));
		return http.writer;
	}

	// 이미지업로드
	@RequestMapping(value="/custom/iypkg/item/fabcmast/set/fileUpload.do" )
	public String setFileupload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFileupload(http.argument, uploadItem));
		return http.writer;
	}

	// 이미지 조회
	@RequestMapping(value="/custom/iypkg/item/fabcmast/get/image.do" )
	public String getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}

	// 코드 조회
	@RequestMapping(value="/custom/iypkg/item/fabcmast/get/fabcCodeCheck.do"  )
	public String getItemCodeCheck(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFabcCodeCheck(http.argument));
		return http.writer;
	}

	// 거래처 조회
	@RequestMapping(value="/custom/iypkg/item/fabcmast/get/cstm.do" )
	public String getCstm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstm(http.argument));
		return http.writer;
	}

	// 거래처 이전단가 조회
	@RequestMapping(value="/custom/iypkg/item/fabcmast/get/cstmpric.do" )
	public String getCstmPric(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstmPric(http.argument));
		return http.writer;
	}


	//삭제
	@RequestMapping(value="/custom/iypkg/item/fabcmast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}



}
