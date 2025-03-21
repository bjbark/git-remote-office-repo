package com.sky.system.custom.iypkg.mtrl.purc.purcbillwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class PurcBillWork  extends DefaultControlHandler{

	@Autowired
	private PurcBillWorkService service;

	//조회
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	//저장
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//발행내역 master 조회
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/get/master.do")
	public String getSearc2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort ));
		return http.writer;
	}

	//발행내역 detail 조회
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/get/detail.do")
	public String getSearc3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort ));
		return http.writer;
	}


	//매입계산서 집계표 조회
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/get/bill.do")
	public String getBill(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBill(http.argument, page, rows, sort ));
		return http.writer;
	}


	//세금계산서 일련번호 생성
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/get/txblSeqn.do")
	public String getTxblSeqn(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTxblSeqn(http.argument));
		return http.writer;
	}

	//세금계산서 일련번호 중복체크
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/get/txblSeqnCheck.do")
	public String getTxblSeqnCheck(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTxblSeqnCheck(http.argument));
		return http.writer;
	}

	//지급
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/set/pay.do")
	public String setPay(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPay(http.argument));
		return http.writer;
	}

	//외주 조회
	@RequestMapping(value="/custom/iypkg/mtrl/purc/purcbillwork/get/otod.do")
	public String getOtod(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOtod(http.argument, page, rows, sort ));
		return http.writer;
	}


}
