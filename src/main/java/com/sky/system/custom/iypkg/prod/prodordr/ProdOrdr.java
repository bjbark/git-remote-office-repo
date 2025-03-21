package com.sky.system.custom.iypkg.prod.prodordr;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;
@Service("iypkg.ProdOrdr")
@Controller
public class ProdOrdr extends DefaultControlHandler{

	@Autowired
	private ProdOrdrService service;

	// 조회
	@RequestMapping(value="/custom/iypkg/prod/prodordr/get/master.do" )
	public String getMaster( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/prod/prodordr/get/master2.do" )
	public String getMaster2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/prod/prodordr/get/detail.do" )
	public String getDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/prod/prodordr/get/detail3.do" )
	public String getDetail3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail3(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/prodordr/get/write.do"  )
	public String getWrite(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWrite(http.argument, page, rows, sort ));
		return http.writer;
	}


	@RequestMapping(value="/custom/iypkg/prod/prodordr/set/write.do"  )
	public String setWrite(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWrite(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/custom/iypkg/prod/prodordr/set/write2.do"  )
	public String setWrite2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWrite2(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/custom/iypkg/prod/prodordr/get/getWkct1.do" )
	public String getWkct1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct1(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/prodordr/get/getWkct2.do" )
	public String getWkct2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct2(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/prodordr/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

}
