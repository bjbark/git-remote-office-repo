package com.sky.system.mtrl.po.purcisttwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class PurcIsttWork  extends DefaultControlHandler{

	@Autowired
	private PurcIsttWorkService service;

	@RequestMapping(value="/mtrl/po/purcisttwork/get/master.do"  )
	public String getMaster(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/po/purcisttwork/get/detail.do"  )
	public String getDetail(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/po/purcisttwork/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	@RequestMapping(value="/mtrl/po/purcisttwork/get/filesearch.do"  )
	public String getFileSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFileSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/po/purcisttwork/get/report_kind.do")
	public String getReport_Kind( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getReport_Kind(http.argument, page, rows, sort));
		return http.writer;
	}

//	//라벨저장
//	@RequestMapping(value="/mtrl/po/purcisttwork/set/label.do"  )
//	public String setLabel(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setLabel(http.argument ));
//		return http.writer ;
//	}

	// 저장
	@RequestMapping(value="/mtrl/po/purcisttwork/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	// 삭제
	@RequestMapping(value="/mtrl/po/purcisttwork/set/delete.do"  )
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument));
		return http.writer;
	}

	// Lot 중복체크
	@RequestMapping(value="/mtrl/po/purcisttwork/get/lottNumbDupCheck.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLottNumbDupCheck(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/po/purcisttwork/get/exprmaster.do"  )
	public String getExprMaster(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getExprMaster(http.argument, page, rows, sort ));
		return http.writer;
	}

	// Exprdata 입력
	@RequestMapping(value="/mtrl/po/purcisttwork/set/exprdata.do"  )
	public String setExprData(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setExprData(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mtrl/po/purcisttwork/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mtrl/po/purcisttwork/set/mobile.do"  )
	public String setMobile(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMobile(http.argument));
		return http.writer;
	}

}
