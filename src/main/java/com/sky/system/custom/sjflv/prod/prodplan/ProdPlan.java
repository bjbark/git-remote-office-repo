 package com.sky.system.custom.sjflv.prod.prodplan;

import java.io.StringReader;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;
@Controller("sjflv.ProdPlan")
public class ProdPlan  extends DefaultControlHandler{

	@Autowired
	private ProdPlanService service;

	@RequestMapping(value="/custom/sjflv/prod/prodplan/get/search1.do")
	public String getSearch1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/get/search2.do")
	public String getSearch2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/get/item1.do")
	public String getItem1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItem1(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/set/prodplan.do")
	public String setProdPlan1(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setProdPlan1(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/set/prodplan2.do")
	public String setProdPlan2(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setProdPlan2(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/set/stokasgn.do")
	public String setStokAsgn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setStokAsgn(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/set/plandate.do")
	public String setPlanDate(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setPlanDate(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/set/addprod.do")
	public String setAddProd(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setAddProd(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/get/prodplanndqt.do")
	public String getProdPlanNdqt(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getProdPlanNdqt(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/get/prntitem.do")
	public String getPrntItem(HttpMessage http, Map<String, Object> model) throws Exception {
		
		model.put(HttpResponseMessage.RECORDS, service.getPrntItem(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/get/html/inspection.do")
	public String getCalendar( HttpMessage http, Map<String, Object> model ) throws Exception {
		
		HttpRequestArgument arg = http.argument;
		ModelAndView ma = new ModelAndView();

		//ma.setViewName( "/sjung-test");
		
		return "./sjung-test2";
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/set/html/template.do")
	public String setHtmlTemplate( HttpMessage http, Map<String, Object> model, @RequestParam("files") MultipartFile file ) throws Exception {
		
		HttpRequestArgument arg = http.argument;
		service.setHtmlTemplate(arg, file.getBytes());
		
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplan/get/html/template.do")
	public ResponseEntity<String> getHtmlTemplate( HttpMessage http, Map<String, Object> model ) throws Exception {
		
		HttpRequestArgument arg = http.argument;
		ObjectMapper objectMapper = new ObjectMapper();
		
		try {
			// 데이터베이스에서 HTML 파일 가져오기
			byte[] htmlBytes = (byte[])service.getHtmlTemplate(arg).get(0).get("template_code");
			// 맵핑 Data 조회
			System.out.println("json data = " + service.getJsonData(arg).get(0).get("data").toString());
			Map<?, ?> formData = objectMapper.readValue(service.getJsonData(arg).get(0).get("data").toString(), Map.class);
			System.out.println("mapping data = " + formData);
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
