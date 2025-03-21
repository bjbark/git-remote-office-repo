package com.sky.system.qc.insp.inspentry51;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.core.common.report.JasperReportView;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class InspEntry51 extends DefaultControlHandler{

	@Autowired
	private InspEntry51Service service;

	/**
	 * Lister1 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry51/get/lister1.do"  )
	public String getLister1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLister1(http.argument, page, rows, sort));
		return http.writer;
	}

	/**
	 * detail 조회
	 *
	 * @param http*
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry51/get/detail.do")
	public String getDetai( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	/**
	 * detail 저장
	 *
	 * @param http*
	 * @param model
	 * @return
	 * @throws Exception
	 */
	// 저장
		@RequestMapping(value="/qc/insp/inspentry51/set/detail.do"  )
		public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
			return http.writer;
		}

	/**
	 * Lister2 조회
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry51/get/lister2.do")
	public String getLister2(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLister2(http.argument));
		return http.writer;
	}


	/**
	 * 팝업 조회
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry51/get/popup.do")
	public String getPopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPopup(http.argument));
		return http.writer;
	}

	/**
	 * 팝업 저장
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/qc/insp/inspentry51/set/popup.do")
	public String setPopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPopup(http.argument));
		return http.writer;
	}

}
