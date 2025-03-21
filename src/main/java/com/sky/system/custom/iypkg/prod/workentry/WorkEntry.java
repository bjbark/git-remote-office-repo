package com.sky.system.custom.iypkg.prod.workentry;

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
@Service("iypkg.WorkEntry")
@Controller
public class WorkEntry extends DefaultControlHandler{

	@Autowired
	private WorkEntryService service;

	// 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry/get/master1.do" )
	public String getMaster1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry/get/master2.do" )
	public String getMaster2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry/get/master3.do" )
	public String getMaster3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster3(http.argument, page, rows, sort));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry/get/master4.do" )
	public String getMaster4( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster4(http.argument, page, rows, sort));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry/get/detail1.do" )
	public String getDetail1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/iypkg/prod/workentry/get/detail2.do" )
	public String getDetail2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/workentry/get/write.do"  )
	public String getWrite(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWrite(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/workentry/get/writebop.do")
	public String getWriteBom(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWriteBop(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/workentry/get/writebop2.do")
	public String getWriteBom2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWriteBop2(http.argument, page, rows, sort ));
		return http.writer;
	}


	@RequestMapping(value="/custom/iypkg/prod/workentry/set/write.do"  )
	public String setWrite(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWrite(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/prod/workentry/set/writeAll.do"  )
	public String setWriteAll(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWriteAll(http.argument ));
		return http.writer;
	}


	@RequestMapping(value="/custom/iypkg/prod/workentry/set/write2.do"  )
	public String setWrite2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWrite2(http.argument ));
		return http.writer;
	}

	//삭제
	@RequestMapping(value="/custom/iypkg/prod/workentry/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	//불량조회
		@RequestMapping(value="/custom/iypkg/prod/workentry/get/poor.do")
		public String getPoor( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getPoor(http.argument, page, rows, sort));
			return http.writer;
		}

		//유실조회
		@RequestMapping(value="/custom/iypkg/prod/workentry/get/fail.do")
		public String getFail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getFail(http.argument, page, rows, sort));
			return http.writer;
		}
}
