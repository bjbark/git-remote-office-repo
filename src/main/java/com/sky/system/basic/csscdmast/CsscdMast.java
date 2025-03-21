package com.sky.system.basic.csscdmast;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

// 본 기능은 Project 폴더의 sscdmast 내용을 복사하여 작성되었다.
// 시스템 코드가 관제 및 고객 DB에 존재하기 때문에 접속정보를 달리하여야 하기 때문이다.
// 본 기능은 websource/basic/sscdmast에 의하여 불리어 진다.
// 반대로 관제에서 사용할 경우  websource/project/sscdmast에 의하여 불리어 진다.
//csscdmast source를 변경할 경우 project폴더의 sscdmast 내용도 함께 변경해 주어야 한다.


@Controller
public class CsscdMast {

	@Autowired
	private CsscdMastService service;


	@RequestMapping(value="/basic/sscdmast/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/basic/sscdmast/set/master.do")
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}


	// 싱크
	@RequestMapping(value="/basic/sscdmast/set/copy.do" )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument));
		return http.writer;
	}


}
