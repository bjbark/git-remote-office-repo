package com.sky.system.zreport;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.sky.http.dispatch.control.DefaultControlHandler;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ZOnlineOrderList extends DefaultControlHandler{

	@Autowired
	private ZOnlineOrderListService service;

	// 조회
	@RequestMapping(value="/zreport/onlineorderlist/get/zsearch.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
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
	@RequestMapping(value="/zreport/onlineorderlist/get/zdetail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}


	/**
	 * 상담내역 조회
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/zreport/onlineorderlist/get/zcounsel.do")
	public String getCounsel(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCounsel(http.argument));
		return http.writer;
	}

	/**
	 * 상담내역 저장
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/zreport/onlineorderlist/set/zcounsel.do")
	public String setCounsel(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setCounsel(http.argument));
		return http.writer;
	}

	/**
	 * 상담 매출내역 조회
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/zreport/onlineorderlist/get/zcounselorder.do")
	public String getCounselOrder(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCounselOrder(http.argument));
		return http.writer;
	}

}
