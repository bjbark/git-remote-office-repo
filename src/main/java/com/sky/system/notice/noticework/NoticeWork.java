package com.sky.system.notice.noticework;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.system.notice.noticework.NoticeWorkService;

@Controller
public class NoticeWork extends DefaultControlHandler{

	@Autowired
	private NoticeWorkService service;
	// 공지사항조회
	@RequestMapping(value="/notice/noticework/get/mastersearch.do"  )
	public String getMasterSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMasterSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 열람자조회
		@RequestMapping(value="/notice/noticework/get/invoice.do"  )
		public String getInvoice( HttpMessage http, Map<String, Object> model,
				@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
				@RequestParam(value="limit", required=true, defaultValue="10") int rows,
				@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument, page, rows, sort));
			return http.writer;
		}

	//item1
	@RequestMapping(value="/notice/noticework/get/item1.do"  )
	public String getItem1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getItem1(http.argument, page, rows, sort));
		return http.writer;
	}

	//item2
	@RequestMapping(value="/notice/noticework/get/item2.do"  )
	public String getItem2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getItem2(http.argument, page, rows, sort));
		return http.writer;
	}

	// item1 저장
	@RequestMapping(value="/notice/noticework/set/item1.do"  )
	public String setItem1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem1(http.argument));
		return http.writer;
		}

	// 공지사항저장
	@RequestMapping(value="/notice/noticework/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 대상자저장
		@RequestMapping(value="/notice/noticework/listener/seq/maxid.do"  )
		public String setMaxid(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setMaxid(http.argument));
			return http.writer;
		}

	// 공지내용저장
		@RequestMapping(value="/notice/noticework/set/insp.do"  )
		public String setInsp(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setInsp(http.argument));
			return http.writer;
		}
}
