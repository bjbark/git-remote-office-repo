package com.sky.system.custom.incopack.prod.workentry;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
@Service("inkopack.WorkBook")
public class WorkEntry extends DefaultControlHandler{

	@Autowired
	private WorkEntryService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/incopack/prod/workentry/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/incopack/prod/workentry/get/searchDetail.do")
	public String getSearchDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/incopack/prod/workentry/get/searchDetail2.do")
	public String getSearchDetail2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail2(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/incopack/prod/workentry/get/searchDetail3.do")
	public String getSearchDetail3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail3(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/incopack/prod/workentry/get/searchDetail4.do")
	public String getSearchDetail4( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchDetail4(http.argument, page, rows, sort));
			return http.writer;
	}
	@RequestMapping(value="/custom/incopack/prod/workentry/set/setMaster.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/incopack/prod/workentry/get/getSeqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument ));
		return http.writer;
	}
//	@RequestMapping(value="/custom/incopack/prod/workentry/get/getWseqn.do"  )
//	public String getWseqn(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getWseqn(http.argument ));
//		return http.writer;
//	}
	@RequestMapping(value="/custom/incopack/prod/workentry/get/mansSeq.do"  )
	public String mansSeq(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.mansSeq(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/incopack/prod/workentry/get/cvicsearch.do"  )
	public String getCvicSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCvicSearch(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/incopack/prod/workentry/get/wkctsearch.do"  )
	public String getWkctSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkctSearch(http.argument ));
		return http.writer;
	}

	//일시정지 후 시작시 필요한 정보
	@RequestMapping(value="/custom/incopack/prod/workentry/get/pause.do"  )
	public String getPause(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPause(http.argument ));
		return http.writer;
	}
	//불량순번 구하기
	@RequestMapping(value="/custom/incopack/prod/workentry/get/poorseqn.do"  )
	public String getPoorSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoorSeqn(http.argument ));
		return http.writer;
	}

	//불량내역저장
	@RequestMapping(value="/custom/incopack/prod/workentry/set/poor.do"  )
	public String setPoor(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoor(http.argument ));
		return http.writer;
	}

	//불량조회
	@RequestMapping(value="/custom/incopack/prod/workentry/get/poor.do")
	public String getPoor( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoor(http.argument, page, rows, sort));
		return http.writer;
	}

	//불량내역삭제
	@RequestMapping(value="/custom/incopack/prod/workentry/set/poordelete.do"  )
	public String setPoorDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoorDelete(http.argument ));
		return http.writer;
	}

	//유실조회
	@RequestMapping(value="/custom/incopack/prod/workentry/get/fail.do")
	public String getFail( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFail(http.argument, page, rows, sort));
		return http.writer;
	}

	//유실순번 구하기
	@RequestMapping(value="/custom/incopack/prod/workentry/get/failseqn.do"  )
	public String getFailSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFailSeqn(http.argument ));
		return http.writer;
	}

	//유실보고
	@RequestMapping(value="/custom/incopack/prod/workentry/set/fail.do"  )
	public String setFail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFail(http.argument ));
		return http.writer;
	}

	//유실내역삭제
	@RequestMapping(value="/custom/incopack/prod/workentry/set/faildelete.do"  )
	public String setFailDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFailDelete(http.argument ));
		return http.writer;
	}
	//사이클타임 저장
	@RequestMapping(value="/custom/incopack/prod/workentry/set/cyclTime.do"  )
	public String setCycl_time(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCycl_time(http.argument ));
		return http.writer;
	}

	//관리자popup
	@RequestMapping(value="/custom/incopack/prod/workentry/get/user.do"  )
	public String getUser(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getUser(http.argument, page, rows ));
		return http.writer;
	}

}
