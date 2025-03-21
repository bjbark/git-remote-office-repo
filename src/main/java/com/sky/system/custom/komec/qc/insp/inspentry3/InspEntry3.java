package com.sky.system.custom.komec.qc.insp.inspentry3;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller("komec.InspEntry3")
public class InspEntry3 extends DefaultControlHandler{

	@Autowired
	private InspEntry3Service service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/get/list1.do")
	public String getList1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getList1(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/get/insp_cond.do")
	public String getInsp_cond( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInsp_cond(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/get/wkct_insp_seqn.do")
	public String getWkct_Insp_Seqn( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct_Insp_Seqn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/get/wkct_invc_numb.do")
	public String getWkct_invc_numb( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct_invc_numb(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/set/list1.do"  )
	public String setList1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setlist1(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/set/delete.do"  )
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/set/listerpopup.do"  )
	public String setListerPopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setListerPopup(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/get/mobileInsp.do"  )
	public String getMobileInsp(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMobileInsp(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/get/mobileInspCond.do"  )
	public String getMobileInspCond(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMobileInspCond(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/set/mobileInsp.do"  )
	public String setMobileInsp(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMobileInsp(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/set/mobileInspAll.do"  )
	public String setMobileInspAll(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMobileInspAll(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/qc/insp/inspentry3/set/mobilDelete.do"  )
	public String setMobileDelete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMobileDelete(http.argument ));
		return http.writer;
	}
}
