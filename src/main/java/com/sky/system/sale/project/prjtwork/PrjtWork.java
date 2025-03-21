package com.sky.system.sale.project.prjtwork;

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
public class PrjtWork  extends DefaultControlHandler{

	@Autowired
	private PrjtWorkService service;

	@RequestMapping(value="/sale/project/prjtwork/get/master.do"  )
	public String getMaster( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/sale/project/prjtwork/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}
	@RequestMapping(value="/sale/project/prjtwork/get/sale_work_lookup.do"  )
	public String getSale_Work_Lookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSale_Work_Lookup(http.argument, page, rows));
		return http.writer;
	}
	//SYMCT detail조회
	@RequestMapping(value="/sale/project/prjtwork/get/detail0.do"  )
	public String getDetail0(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail0(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/get/detail1.do"  )
	public String getDetail1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/get/detail2.do"  )
	public String getDetail2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/get/detail3.do"  )
	public String getDetail3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail3(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/get/detail4.do"  )
	public String getDetail4(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail4(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/get/invoice.do"  )
	public String getInvoice(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	// SYMCT detail저장
		@RequestMapping(value="/sale/project/prjtwork/set/record.do"  )
		public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
			return http.writer;
		}

	@RequestMapping(value="/sale/project/prjtwork/set/detail.do"  )
	public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}

	// 마감 / 해지 수정
	@RequestMapping(value="/sale/project/prjtwork/set/close.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="/sale/project/prjtwork/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/set/copy.do"  )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/get/seqn.do"  )
	public String getSeqn( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/set/consulting.do"  )
	public String setConsulting(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setConsulting(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/sale/project/prjtwork/set/deleteMaster.do"  )
	public String deleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.deleteMaster(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/sale/project/prjtwork/set/result.do"  )
	public String setResult(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setResult(http.argument));
		return http.writer;
	}
	// 이미지업로드
	@RequestMapping(value="sale/project/prjtwork/set/fileUpload.do"  )
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}
}
