package com.sky.system.qc.insp.inspentry2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class InspEntry2 extends DefaultControlHandler{

	@Autowired
	private InspEntry2Service service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry2/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/qc/insp/inspentry2/get/list1.do")
	public String getList1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getList1(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry2/get/insp_cond.do")
	public String getInsp_cond( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInsp_cond(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry2/get/wkct_insp_seqn.do")
	public String getWkct_Insp_Seqn( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct_Insp_Seqn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry2/get/wkct_invc_numb.do")
	public String getWkct_invc_numb( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct_invc_numb(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry2/set/list1.do"  )
	public String setList1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setlist1(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry2/set/delete.do"  )
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry2/set/listerpopup.do"  )
	public String setListerPopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setListerPopup(http.argument ));
		return http.writer;
	}
}
