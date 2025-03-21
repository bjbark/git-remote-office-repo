package com.sky.system.notice.noticeview;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class NoticeView extends DefaultControlHandler{

	@Autowired
	private NoticeViewService service;
	// 조회
	@RequestMapping(value="/notice/noticeview/get/mastersearch.do"  )
	public String getMasterSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMasterSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/notice/noticeview/get/mobilesearch.do"  )
	public String getMobileSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMobileSearch(http.argument));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/notice/noticeview/get/notification.do"  )
	public String getNotification( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getNotification(http.argument));
		return http.writer;
	}
	// 공지내용저장
	@RequestMapping(value="/notice/noticeview/set/insp.do"  )
	public String setInsp(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInsp(http.argument));
		return http.writer;
	}
}
