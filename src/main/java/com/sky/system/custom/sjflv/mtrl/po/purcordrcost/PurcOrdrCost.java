package com.sky.system.custom.sjflv.mtrl.po.purcordrcost;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class PurcOrdrCost extends DefaultControlHandler{

	@Autowired
	private PurcOrdrCostService service;

	// 조회
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordrcost/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordrcost/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordrcost/get/detail.do"  )
	public String getDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort));
		return http.writer;
	}

	// 원가정산
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordrcost/set/cost.do"  )
	public String setCost(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCost(http.argument ));
		return http.writer;
	}

	//정산마김체크
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordrcost/get/expsInfo.do")
	public String chkcancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getExpsInfo(http.argument));
		return http.writer;


	}
}
