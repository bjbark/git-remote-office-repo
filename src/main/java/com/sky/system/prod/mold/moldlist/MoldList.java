package com.sky.system.prod.mold.moldlist;

import java.util.Map;
import net.sky.http.dispatch.control.DefaultControlHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class MoldList extends DefaultControlHandler{

	@Autowired
	private MoldListService service;
	// master
	@RequestMapping(value="prod/mold/moldlist/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="prod/mold/moldlist/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	//FileSearch
	@RequestMapping(value="prod/mold/moldlist/get/filesearch.do"  )
	public String getFileSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFileSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	//MoveSearch
	@RequestMapping(value="prod/mold/moldlist/get/movesearch.do"  )
	public String getMoveSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMoveSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	//ShotSearch
	@RequestMapping(value="prod/mold/moldlist/get/shotsearch.do"  )
	public String getShotSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getShotSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="prod/mold/moldlist/get/invoice.do"  )
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/mold/moldlist/get/getfileseqn.do"  )
	public String getFileSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFileSeqn(http.argument));
		return http.writer;
	}

}
