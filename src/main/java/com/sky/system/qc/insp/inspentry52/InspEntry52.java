package com.sky.system.qc.insp.inspentry52;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class InspEntry52 extends DefaultControlHandler{

	@Autowired
	private InspEntry52Service service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry52/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getOstt(http.argument));
			return http.writer;
	}

	/**
	 * detail 조회
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry52/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetailSpts(http.argument));
		return http.writer;
	}

	/**
	 * invoice 조회
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry52/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}




	@RequestMapping(value="/qc/insp/inspentry52/set/setOstt.do"  )
	public String setStps(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOstt(http.argument ));
		return http.writer;
	}


	/**
	 * 상품검색
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry52/get/product.do")
	public String getDialog(HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry52/get/searchspts.do")
	public String getSearchSpts( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearchSpts(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/qc/insp/inspentry52/set/pass.do"  )
	public String setPass(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPass(http.argument ));
		return http.writer;
	}

	/**
	 * detail 조회
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry52/get/detailspts.do")
	public String getDetailSpts(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetailSpts(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/qc/insp/inspentry52/get/insp_cond.do")
	public String getInsp_cond( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInsp_cond(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry52/get/wkct_invc_numb.do")
	public String getWkct_invc_numb( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct_invc_numb(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry52/get/wkct_insp_seqn.do")
	public String getWkct_Insp_Seqn( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct_Insp_Seqn(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/qc/insp/inspentry52/set/listerpopup.do"  )
	public String setListerPopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setListerPopup(http.argument ));
		return http.writer;
	}

}
