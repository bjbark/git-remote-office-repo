package com.sky.system.prod.order.workbookv4;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class WorkBookV4 extends DefaultControlHandler{

	@Autowired
	private WorkBookV4Service service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/prod/order/workbookv4/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workbookv4/get/searchDetail.do")
	public String getSearchDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workbookv4/get/searchDetail2.do")
	public String getSearchDetail2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail2(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workbookv4/get/searchDetail3.do")
	public String getSearchDetail3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail3(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workbookv4/get/searchDetail4.do")
	public String getSearchDetail4( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchDetail4(http.argument, page, rows, sort));
			return http.writer;
	}
	@RequestMapping(value="/prod/order/workbookv4/set/setMaster.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workbookv4/set/setWker.do"  )
	public String setWker(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWker(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workbookv4/get/getSeqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/prod/order/workbookv4/get/cvicsearch.do"  )
	public String getCvicSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCvicSearch(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workbookv4/get/midsearch.do"  )
	public String getMidSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMidSearch(http.argument ));
		return http.writer;
	}
	//일시정지 후 시작시 필요한 정보
	@RequestMapping(value="/prod/order/workbookv4/get/pause.do"  )
	public String getPause(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPause(http.argument ));
		return http.writer;
	}
	//불량순번 구하기
	@RequestMapping(value="/prod/order/workbookv4/get/poorseqn.do"  )
	public String getPoorSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoorSeqn(http.argument ));
		return http.writer;
	}

	//불량내역저장
	@RequestMapping(value="/prod/order/workbookv4/set/poor.do"  )
	public String setPoor(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoor(http.argument ));
		return http.writer;
	}

	//불량조회
	@RequestMapping(value="/prod/order/workbookv4/get/poor.do")
	public String getPoor( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoor(http.argument, page, rows, sort));
		return http.writer;
	}

	//불량내역삭제
	@RequestMapping(value="/prod/order/workbookv4/set/poordelete.do"  )
	public String setPoorDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoorDelete(http.argument ));
		return http.writer;
	}

	//유실조회
	@RequestMapping(value="/prod/order/workbookv4/get/fail.do")
	public String getFail( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFail(http.argument, page, rows, sort));
		return http.writer;
	}

	//유실순번 구하기
	@RequestMapping(value="/prod/order/workbookv4/get/failseqn.do"  )
	public String getFailSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFailSeqn(http.argument ));
		return http.writer;
	}
	//shot 구하기
	@RequestMapping(value="/prod/order/workbookv4/get/realshot.do"  )
	public String getRealShot(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRealShot(http.argument ));
		return http.writer;
	}

	//유실보고
	@RequestMapping(value="/prod/order/workbookv4/set/fail.do"  )
	public String setFail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFail(http.argument ));
		return http.writer;
	}

	//유실내역삭제
	@RequestMapping(value="/prod/order/workbookv4/set/faildelete.do"  )
	public String setFailDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFailDelete(http.argument ));
		return http.writer;
	}
	//사이클타임 저장
	@RequestMapping(value="/prod/order/workbookv4/set/cyclTime.do"  )
	public String setCycl_time(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCycl_time(http.argument ));
		return http.writer;
	}
	//
	@RequestMapping(value="/prod/order/workbookv4/set/stat_dvcd_update.do"  )
	public String setStat_dvcd_update(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setStat_dvcd_update(http.argument ));
		return http.writer;
	}
	//설비관리자 저장
	@RequestMapping(value="/prod/order/workbookv4/set/cvic_drtr.do"  )
	public String setCvic_drtr(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCvic_drtr(http.argument ));
		return http.writer;
	}
	//생산cavity 변경
	@RequestMapping(value="/prod/order/workbookv4/set/work_cavity.do"  )
	public String setWork_cavity(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWork_cavity(http.argument ));
		return http.writer;
	}

	//생산수량 변경
	@RequestMapping(value="/prod/order/workbookv4/set/prod_qntt.do"  )
	public String setProd_qntt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setProd_qntt(http.argument ));
		return http.writer;
	}
	//금형수입 변경
	@RequestMapping(value="/prod/order/workbookv4/set/mold_repa.do"  )
	public String setMold_Repa(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMold_Repa(http.argument ));
		return http.writer;
	}

	//관리자popup
	@RequestMapping(value="/prod/order/workbookv4/get/user.do"  )
	public String getUser(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getUser(http.argument, page, rows ));
		return http.writer;
	}

}
