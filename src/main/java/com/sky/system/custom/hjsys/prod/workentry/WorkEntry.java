package com.sky.system.custom.hjsys.prod.workentry;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("hjsys.WorkEntry")
@Controller
public class WorkEntry  extends DefaultControlHandler{

	@Autowired
	private WorkEntryService service;

	@RequestMapping(value="/custom/hjsys/prod/workentry/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/prod/workentry/get/search2.do")
	public String getSearch2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/prod/workentry/get/search3.do")
	public String getSearch3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/prod/workentry/get/pror.do")
	public String getPror(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPror(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/prod/workentry/get/work.do")
	public String getWork(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWork(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/prod/workentry/get/maxwkfw.do")
	public String getMaxWkfw(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaxWkfw(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/prod/workentry/set/setWorkBook.do")
	public String setWorkBook(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWorkBook(http.argument ));
		return http.writer;
	}

	//불량조회
	@RequestMapping(value="/custom/hjsys/prod/workentry/get/poor.do")
	public String getPoor( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoor(http.argument, page, rows, sort));
		return http.writer;
	}

	//불량순번 구하기
	@RequestMapping(value="/custom/hjsys/prod/workentry/get/poorseqn.do"  )
	public String getPoorSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoorSeqn(http.argument ));
		return http.writer;
	}

	//불량내역저장
	@RequestMapping(value="/custom/hjsys/prod/workentry/set/poor.do"  )
	public String setPoor(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoor(http.argument ));
		return http.writer;
	}

	//불량내역삭제
	@RequestMapping(value="/custom/hjsys/prod/workentry/set/poordelete.do"  )
	public String setPoorDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoorDelete(http.argument ));
		return http.writer;
	}

	//취소시 불량내역삭제
	@RequestMapping(value="/custom/hjsys/prod/workentry/set/poordelete2.do"  )
	public String setPoorDelete2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoorDelete2(http.argument ));
		return http.writer;
	}

	//불량조회
	@RequestMapping(value="/custom/hjsys/prod/workentry/get/poor2.do")
	public String getPoor2( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoor2(http.argument, page, rows, sort));
		return http.writer;
	}

	//재고조회
	@RequestMapping(value="/custom/hjsys/prod/workentry/get/mtrlstock.do"  )
	public String getMtrlStock(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrlStock(http.argument ));
		return http.writer;
	}

	//자재투입
	@RequestMapping(value="/custom/hjsys/prod/workentry/set/isos.do"  )
	public String setIsos(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setIsos(http.argument ));
		return http.writer;
	}

	//순번
	@RequestMapping(value="/custom/hjsys/prod/workentry/get/seqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument ));
		return http.writer;
	}

}
