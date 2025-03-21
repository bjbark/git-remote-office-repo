package com.sky.system.custom.iypkg.prod.workbookv1;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("iypkg.WorkBookV1")

@Controller
public class WorkBookV1 extends DefaultControlHandler{

	@Autowired
	private WorkBookV1Service service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/searchDetail.do")
	public String getSearchDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/searchDetail2.do")
	public String getSearchDetail2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail2(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/searchDetail3.do")
	public String getSearchDetail3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchDetail3(http.argument, page, rows, sort));
			return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/set/setMaster.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/getSeqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/plc_cnt.do"  )
	public String getPlc_Cnt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPlc_Cnt(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/book_cnt.do"  )
	public String getBook_Cnt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBook_Cnt(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/cvicsearch.do"  )
	public String getCvicSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCvicSearch(http.argument ));
		return http.writer;
	}

	//일시정지 후 시작시 필요한 정보
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/pause.do"  )
	public String getPause(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPause(http.argument ));
		return http.writer;
	}

	//불량순번 구하기
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/poorseqn.do"  )
	public String getPoorSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoorSeqn(http.argument ));
		return http.writer;
	}

	//불량내역저장
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/set/poor.do"  )
	public String setPoor(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoor(http.argument ));
		return http.writer;
	}

	//불량조회
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/poor.do")
	public String getPoor( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoor(http.argument, page, rows, sort));
		return http.writer;
	}

	//불량내역삭제
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/set/poordelete.do"  )
	public String setPoorDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoorDelete(http.argument ));
		return http.writer;
	}

	//유실조회
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/fail.do")
	public String getFail( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFail(http.argument, page, rows, sort));
		return http.writer;
	}

	//유실순번 구하기
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/failseqn.do"  )
	public String getFailSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFailSeqn(http.argument ));
		return http.writer;
	}

	//유실보고
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/set/fail.do"  )
	public String setFail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFail(http.argument ));
		return http.writer;
	}

	//유실내역삭제
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/set/faildelete.do"  )
	public String setFailDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFailDelete(http.argument ));
		return http.writer;
	}

	//마지막 작업지시 가져오기
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/workbook.do"  )
	public String getWorkBook(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWorkBook(http.argument ));
		return http.writer;
	}

	//규격 정보
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/fabc.do"  )
	public String getFabc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFabc(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/pauseSeqn.do"  )
	public String getPauseSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPauseSeqn(http.argument ));
		return http.writer;
	}

	//유실내역삭제
	@RequestMapping(value="/custom/iypkg/prod/workbookv1/set/pause.do"  )
	public String setPause(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPause(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/prod/workbookv1/get/cnt.do"  )
	public String getCnt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCnt(http.argument ));
		return http.writer;
	}
}
