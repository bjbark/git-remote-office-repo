 package com.sky.system.membership.memberentry;

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
public class MemberEntry  extends DefaultControlHandler{

	@Autowired
	private MemberEntryService service;

	@RequestMapping(value="/membership/memberentry/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/membership/memberentry/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/get/memo.do"  )
	public String getMemo(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMemo(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/get/crct.do"  )
	public String getCrct(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCrct(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/get/inot.do"  )
	public String getInot(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInot(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/get/mmbrCode.do"  )
	public String getMmbrCode(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMmbrCode(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/membership/memberentry/get/mmbrCodeCheck.do"  )
	public String getMmbrCodeCheck(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMmbrCodeCheck(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/membership/memberentry/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/set/record.do"  )
	public String  setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/set/memo.do"  )
	public String  setMemo(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMemo(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/set/crct.do"  )
	public String  setCrct(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCrct(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/set/inot.do"  )
	public String  setInot(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInot(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/set/inot2.do"  )
	public String  setInot2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInot2(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/membership/memberentry/set/inotok.do"  )
	public String  setInotOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInotOk(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/membership/memberentry/set/item_mngt.do"  )
	public String  setItem_Mngt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem_Mngt(http.argument));
		return http.writer;
	}
	// 이미지업로드
	@RequestMapping(value="membership/memberentry/set/fileUpload.do"  )
	public String setFileupload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFileupload(http.argument, uploadItem));
		return http.writer;
	}


	@RequestMapping(value="/membership/memberentry/get/item_mngt.do"  )
	public String getItem_Mngt(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItem_Mngt(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/membership/memberentry/get/lastSeq.do"  )
	public String getLastSeq(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLastSeq(http.argument));
		return http.writer;
	}



}
