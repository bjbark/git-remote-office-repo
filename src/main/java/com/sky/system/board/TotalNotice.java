package com.sky.system.board;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.sky.http.dispatch.control.DefaultControlHandler;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class TotalNotice extends DefaultControlHandler{

	@Autowired
	private TotalNoticeService service;
	// 조회
	@RequestMapping(value="/board/totalnotice/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
	}
	// 저장
	@RequestMapping(value="/board/totalnotice/set/master.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}

	/*
	 * board_no, board_id 리턴
	 */
	@RequestMapping(value="/board/totalnotice/get/boardno.do"  )
	public String getBoardNo(
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBoardNo(http.argument));
		return http.writer;
	}


	/**
	 * 첨부파일 upload
	 * @param http
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/board/totalnotice/set/uploadBoard.do")
	public String uploadBoard(HttpMessage http,  Map<String, Object> model, UploadItem image) throws Exception {
		service.uploadBoard(http.argument, image);
		return http.writer;
	}


}