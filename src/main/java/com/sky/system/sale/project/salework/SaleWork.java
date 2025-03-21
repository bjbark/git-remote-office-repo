package com.sky.system.sale.project.salework;

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
public class SaleWork  extends DefaultControlHandler{

	@Autowired
	private SaleWorkService service;

	@RequestMapping(value="/sale/project/salework/get/master.do"  )
	public String getMaster( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/salework/get/detail.do"  )
	public String getDetail(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/salework/get/listerpopup.do"  )
	public String getListerPopup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getListerPopup(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/sale/project/salework/get/sale_work_tax_v1.do"  )
	public String getSale_work_tax_v1(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSale_work_tax_v1(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/sale/project/salework/get/modlpopup.do"  )
	public String getModlPopup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getModlPopup(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/salework/set/detail.do"  )
	public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/sale/project/salework/set/delete.do"  )
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument));
		return http.writer;
	}

}
