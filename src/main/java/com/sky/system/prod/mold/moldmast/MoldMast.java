package com.sky.system.prod.mold.moldmast;

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
public class MoldMast extends DefaultControlHandler{

	@Autowired
	private MoldMastService service;
	// master
	@RequestMapping(value="prod/mold/moldmast/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="prod/mold/moldmast/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	//FileSearch
	@RequestMapping(value="prod/mold/moldmast/get/filesearch.do"  )
	public String getFileSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getFileSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	//MoveSearch
		@RequestMapping(value="prod/mold/moldmast/get/movesearch.do"  )
		public String getMoveSearch( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getMoveSearch(http.argument, page, rows, sort));
			return http.writer;
		}
	// 저장
	@RequestMapping(value="prod/mold/moldmast/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	@RequestMapping(value="prod/mold/moldmast/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}


	@RequestMapping(value="prod/mold/moldmast/get/invoice.do"  )
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/mold/moldmast/get/getfileseqn.do"  )
	public String getFileSeqn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getFileSeqn(http.argument));
		return http.writer;
	}

	// 이미지업로드
	@RequestMapping(value="prod/mold/moldmast/set/fileUpload.do"  )
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}
}
