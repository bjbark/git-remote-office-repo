package com.sky.system.custom.sjflv.haccp.docmcheck;

import java.io.StringReader;
import java.io.StringWriter;
import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Controller("sjflv.DocmCheck")
public class DocmCheck {

	@Autowired
	private DocmCheckService service;

	@RequestMapping(value="/custom/sjflv/haccp/docmcheck/get/docmmast.do")
	public String getDocmMast(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDocmMast(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/haccp/docmcheck/get/book.do")
	public String getBook(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBook(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/haccp/docmcheck/set/book.do")
	public String setBook(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setBook(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/haccp/docmcheck/get/html/template/data.do")
	public ResponseEntity<String> getHtmlTemplateWithData( HttpMessage http, Map<String, Object> model ) throws Exception {
		
		HttpRequestArgument arg = http.argument;
		ObjectMapper objectMapper = new ObjectMapper();
		
		try {
			// 데이터베이스에서 HTML 파일 가져오기
			byte[] htmlBytes = (byte[])service.getHtmlTemplate(arg).get(0).get("html_docm");
			
			// 맵핑 Data 조회
			SqlResultMap result = service.getJsonData(arg);
			Map<?, ?> formData;
			if (result.isEmpty()) {
				formData = Collections.emptyMap();
			} else {
				formData = objectMapper.readValue(result.get(0).get("json_data").toString(), Map.class);
			}
			String htmlContent = new String(htmlBytes);
			
			// Data 맵핑
			MustacheFactory mf = new DefaultMustacheFactory();
			Mustache mustache = mf.compile(new StringReader(htmlContent), "template");
			StringWriter writer = new StringWriter();
			mustache.execute(writer, formData);

			// 응답 설정
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.TEXT_HTML);
			headers.setContentType(MediaType.valueOf("text/html; charset=UTF-8"));

			// 응답 반환
			return new ResponseEntity<>(writer.toString(), headers, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
