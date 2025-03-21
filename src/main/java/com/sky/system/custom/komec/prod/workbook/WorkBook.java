package com.sky.system.custom.komec.prod.workbook;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("komec.WorkBook")
@Controller
public class WorkBook extends DefaultControlHandler{

	@Autowired
	private WorkBookService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/komec/prod/workbook/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/get/mainPopup.do")
	public String getSearchDetail( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearchDetail(http.argument, page, rows, sort));
		return http.writer;
	}


	@RequestMapping(value="/custom/komec/prod/workbook/get/getSeqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/prod/workbook/get/inptsearch.do"  )
	public String getInptSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInptSearch(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/prod/workbook/set/isos.do"  )
	public String setIsos(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setIsos(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/prod/workbook/set/isosdelete.do"  )
	public String delIsos(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.delIsos(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/prod/workbook/get/assy_seqn.do"  )
	public String getAssy_seqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getAssy_seqn(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/get/getCast.do"  )
	public String getCast(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCast(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/get/getBom.do"  )
	public String getBom(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBom(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/get/workmtrl.do"  )
	public String getWorkMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWorkMtrl(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/get/barcodeMtrl.do"  )
	public String getBarcodeMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBarcodeMtrl(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/get/lottCheck.do"  )
	public String getLottCheck(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLottCheck(http.argument ));
		return http.writer;
	}

	//유실조회
	@RequestMapping(value="/custom/komec/prod/workbook/get/fail.do")
	public String getFail( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFail(http.argument, page, rows, sort));
		return http.writer;
	}

	//유실순번 구하기
	@RequestMapping(value="/custom/komec/prod/workbook/get/failseqn.do"  )
	public String getFailSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFailSeqn(http.argument ));
		return http.writer;
	}

	//불량순번 구하기
	@RequestMapping(value="/custom/komec/prod/workbook/get/poorseqn.do"  )
	public String getPoorSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoorSeqn(http.argument ));
		return http.writer;
	}
	//불량순번 구하기
	@RequestMapping(value="/custom/komec/prod/workbook/get/chekrpst.do"  )
	public String getChekRpst(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getChekRpst(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/get/cvicsearch.do"  )
	public String getCvicSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCvicSearch(http.argument ));
		return http.writer;
	}

	//불량조회
	@RequestMapping(value="/custom/komec/prod/workbook/get/poor.do")
	public String getPoor( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPoor(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/get/mtrlseqn.do"  )
	public String getMtrlSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrlSeqn(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/set/setMaster.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/set/setCast.do"  )
	public String setCast(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCast(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/set/setBom.do"  )
	public String setBom(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBom(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/prod/workbook/set/Tap.do"  )
	public String setTap(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setTap(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/set/bookmtrl.do"  )
	public String setBookMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBookMtrl(http.argument ));
		return http.writer;
	}

	//불량내역저장
	@RequestMapping(value="/custom/komec/prod/workbook/set/poor.do"  )
	public String setPoor(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoor(http.argument ));
		return http.writer;
	}

	//불량내역삭제
	@RequestMapping(value="/custom/komec/prod/workbook/set/poordelete.do"  )
	public String setPoorDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPoorDelete(http.argument ));
		return http.writer;
	}

	//유실보고
	@RequestMapping(value="/custom/komec/prod/workbook/set/fail.do"  )
	public String setFail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFail(http.argument ));
		return http.writer;
	}

	//유실내역삭제
	@RequestMapping(value="/custom/komec/prod/workbook/set/faildelete.do"  )
	public String setFailDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFailDelete(http.argument ));
		return http.writer;
	}
	//
	@RequestMapping(value="/custom/komec/prod/workbook/get/lastEnd.do"  )
	public String getLastEnd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLastEnd(http.argument ));
		return http.writer;
	}
	//
	@RequestMapping(value="/custom/komec/prod/workbook/set/lastWorkBook.do"  )
	public String setLastWorkBook(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setLastWorkBook(http.argument ));
		return http.writer;
	}

	//
	@RequestMapping(value="/custom/komec/prod/workbook/set/lastDeleteBook.do"  )
	public String setLastDeleteBook(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setLastDeleteBook(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/set/lastEnd.do"  )
	public String setLastEnd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setLastEnd(http.argument ));
		return http.writer;
	}


	//온도,RPM
	@RequestMapping(value="/custom/komec/prod/workbook/get/cvicState.do"  )
	public String getCvicState(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCvicState(http.argument ));
		return http.writer;
	}
	//저울
	@RequestMapping(value="/custom/komec/prod/workbook/get/weight.do"  )
	public String getWeight(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWeight(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/prod/workbook/set/div.do"  )
	public String setDiv(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDiv(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/prod/workbook/get/bomCheck.do"  )
	public String getBomCheck(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getBomCheck(http.argument ));
		return http.writer;
	}

}