package com.sky.system.custom.iypkg.item.asmtmast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class AsmtMast extends DefaultControlHandler{

	@Autowired
	private AsmtMastService service;

	// 조회
	@RequestMapping(value="/custom/iypkg/item/asmtmast/get/search.do" )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 디테일 조회
	@RequestMapping(value="/custom/iypkg/item/asmtmast/get/asmtpric.do" )
	public String getAsmtpric( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getAsmtpric(http.argument, page, rows, sort));
		return http.writer;
	}

	// 이전단가 조회
	@RequestMapping(value="/custom/iypkg/item/asmtmast/get/cstmpric.do" )
	public String getCstmPric(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstmPric(http.argument));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/item/asmtmast/get/lookup.do" )
	public String getLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort,
			HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/item/asmtmast/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//부자재발주에서 코드등록
	@RequestMapping(value="/custom/iypkg/item/asmtmast/set/simple.do")
	public String  setSimple(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSimple(http.argument));
		return http.writer;
	}

	// 디테일 저장
	@RequestMapping(value="/custom/iypkg/item/asmtmast/set/asmtpric.do")
	public String setAsmtpric(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAsmtpric(http.argument));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/iypkg/item/asmtmast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}



}
