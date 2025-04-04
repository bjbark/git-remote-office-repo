package com.sky.system.custom.iypkg.mtrl.po.purcordr2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class PurcOrdr2  extends DefaultControlHandler{

	@Autowired
	private PurcOrdr2Service service;


	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/get/search2.do")
	public String getSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/get/invc.do"  )
	public String getInvc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvc(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/get/max.do"  )
	public String getMax( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMax(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/get/pric.do"  )
	public String getPric( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPric(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/get/code.do"  )
	public String getCode( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCode(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/mtrl/po/purcordr2/get/count.do"  )
	public String getCount( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCount(http.argument));
		return http.writer;
	}


}
