package com.sky.system.custom.iypkg.stock.isos.sptsmast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("dae-a.SptsMast")
@Controller
public class SptsMast extends DefaultControlHandler{

	@Autowired
	private SptsMastService service;

	@RequestMapping(value="/custom/iypkg/stock/isos/sptsmast/get/search.do"  )
	public String getSearch1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/sptsmast/get/search2.do"  )
	public String getSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/sptsmast/get/search3.do"  )
	public String getSearch3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/sptsmast/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/sptsmast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/stock/isos/sptsmast/set/updt.do")
	public String setUpdt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setUpdt(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/stock/isos/sptsmast/get/invc.do"  )
	public String getInvc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvc(http.argument, page, rows, sort));
		return http.writer;
	}

	//출하계획작성
	@RequestMapping(value="/custom/iypkg/stock/isos/set/boxx_plan_insert.do"  )
	public String setBoxx_Plan_Insert(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBoxx_Plan_Insert(http.argument ));
		return http.writer;
	}

}
