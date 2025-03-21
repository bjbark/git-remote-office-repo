package com.sky.system.cam.datacollect;

import java.util.Map;

import net.sky.core.common.annotation.ReleaseToken;
import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


@Controller
public class CamDataCollect extends DefaultControlHandler{

	@Autowired
	private CamDataCollectService service;
	// 조회
	@RequestMapping(value="/cam/set/datain.do")
	public String setJobFinish(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDataIn(http.argument ));
		return http.writer;
	}
}
