package com.sky.system.custom.iypkg.prod.workentry2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;
@Service("iypkg.WorkEntry2")
@Controller
public class WorkEntry2 extends DefaultControlHandler{

	@Autowired
	private WorkEntry2Service service;

	// master1 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry2/get/master1.do" )
	public String getMaster1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort));
		return http.writer;
	}

	// master2 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry2/get/master2.do" )
	public String getMaster2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort));
		return http.writer;
	}

	// detail1조회
	@RequestMapping(value="/custom/iypkg/prod/workentry2/get/detail1.do" )
	public String getDetail1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort));
		return http.writer;
	}

	// detail2 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry2/get/detail2.do" )
	public String getDetail2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort));
		return http.writer;
	}

	// detail 원단 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry2/get/detailfabc.do" )
	public String getDetailFabc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetailFabc(http.argument, page, rows, sort));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/iypkg/prod/workentry2/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument ));
		return http.writer;
	}

	// 삭제
	@RequestMapping(value="/custom/iypkg/prod/workentry2/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

}
