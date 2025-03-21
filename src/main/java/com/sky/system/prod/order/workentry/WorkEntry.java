package com.sky.system.prod.order.workentry;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

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
	@RequestMapping(value="/prod/order/workentry/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/prod/order/workentry/get/list1.do")
	public String getList1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList1(http.argument, page, rows, sort));
			return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/get/list2.do")
	public String getList2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList2(http.argument, page, rows, sort));
			return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/get/list3.do")
	public String getList3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getList3(http.argument, page, rows, sort));
			return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/get/list4.do")
	public String getList4( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getList4(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/get/lookup.do")
	public String getlookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getlookup(http.argument, page, rows, sort));
			return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/set/setMaster.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/set/list1.do"  )
	public String setList1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setlist1(http.argument ));
		return http.writer;
	}


	@RequestMapping(value="/prod/order/workentry/set/list2.do"  )
	public String setList2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setlist2(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/set/list3.do"  )
	public String setList3(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setlist3(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/set/list4.do"  )
	public String setList4(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setlist4(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/prod/order/workentry/get/prod.do"  )
	public String getProd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProd(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/prod/order/workentry/get/daily.do")
	public String getDaily( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getDaily(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/prod/order/workentry/get/ivstMtrl.do"  )
	public String getIvstMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getIvstMtrl(http.argument ));
		return http.writer;
	}
}
