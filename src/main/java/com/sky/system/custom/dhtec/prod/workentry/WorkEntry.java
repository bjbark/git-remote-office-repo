package com.sky.system.custom.dhtec.prod.workentry;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("dhtec.WorkEntry")
@Controller
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
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/searchDetail.do")
	public String getSearchDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/searchDetail2.do")
	public String getSearchDetail2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail2(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/searchDetail3.do")
	public String getSearchDetail3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchDetail3(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/prod/workentry/get/getSeqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/prod/workentry/get/wkctsearch.do"  )
	public String getWkctSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkctSearch(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/assy_seqn.do"  )
	public String getAssy_seqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getAssy_seqn(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/getCast.do"  )
	public String getCast(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCast(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/lotisossum.do"  )
	public String getLotIsosSum(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLotIsosSum(http.argument ));
		return http.writer;
	}
	//유실조회
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/fail.do")
	public String getFail( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFail(http.argument, page, rows, sort));
		return http.writer;
	}

	//유실순번 구하기
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/failseqn.do"  )
	public String getFailSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFailSeqn(http.argument ));
		return http.writer;
	}

	//불량순번 구하기
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/poorseqn.do"  )
	public String getPoorSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoorSeqn(http.argument ));
		return http.writer;
	}
	//불량순번 구하기
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/chekrpst.do"  )
	public String getChekRpst(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getChekRpst(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/cvicsearch.do"  )
	public String getCvicSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCvicSearch(http.argument ));
		return http.writer;
	}

	//불량조회
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/poor.do")
	public String getPoor( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoor(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/get/mtrlseqn.do"  )
	public String getMtrlSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrlSeqn(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/set/setMaster.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/set/setCast.do"  )
	public String setCast(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCast(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/set/Tap.do"  )
	public String setTap(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTap(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/dhtec/prod/workentry/set/bookmtrl.do"  )
	public String setBookMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBookMtrl(http.argument ));
		return http.writer;
	}

	//불량내역저장
	@RequestMapping(value="/custom/dhtec/prod/workentry/set/poor.do"  )
	public String setPoor(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoor(http.argument ));
		return http.writer;
	}

	//불량내역삭제
	@RequestMapping(value="/custom/dhtec/prod/workentry/set/poordelete.do"  )
	public String setPoorDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoorDelete(http.argument ));
		return http.writer;
	}


	//유실보고
	@RequestMapping(value="/custom/dhtec/prod/workentry/set/fail.do"  )
	public String setFail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFail(http.argument ));
		return http.writer;
	}

	//유실내역삭제
	@RequestMapping(value="/custom/dhtec/prod/workentry/set/faildelete.do"  )
	public String setFailDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFailDelete(http.argument ));
		return http.writer;
	}
}