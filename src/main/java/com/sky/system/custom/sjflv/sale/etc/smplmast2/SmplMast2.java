package com.sky.system.custom.sjflv.sale.etc.smplmast2;

import java.io.InputStream;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;

@Controller
public class SmplMast2 {

	@Autowired
	private SmplMast2Service service;

	// 조회
	@RequestMapping(value="/custom/sjflv/sale/etc/smplmast2/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/sale/etc/smplmast2/get/invc.do"  )
	public String getInvc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvc(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/sjflv/sale/etc/smplmast2/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//향료삭제
	@RequestMapping(value="/custom/sjflv/sale/etc/smplmast2/set/delete.do")
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/sjflv/sale/etc/smplmast2/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}
}
