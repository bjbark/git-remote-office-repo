package com.sky.system.mobile.mMoldmast;

import java.util.Map;

import net.sky.core.common.annotation.ReleaseToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Controller
public class MmoldMast {

	@Autowired
	private MmoldMastService service;

	@RequestMapping(value="/mobile/moldmast/get/search.do")
	public String getSearch(@ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mobile/moldmast/get/shot.do")
	public String getShot(@ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="300") int rows,
			@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getShot(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/mobile/moldmast/get/repa.do")
	public String getRepa(@ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRepa(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mobile/moldmast/get/move.do")
	public String getMove(@ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true,  defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true,  defaultValue="300") int rows,
			@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMove(http.argument, page, rows, sort));
		return http.writer;
	}

	//
	@RequestMapping(value="/moldmast/set/record.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}

	//
	@RequestMapping(value="/moldmast/set/shot.do"  )
	public String setShot(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setShot(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/moldmast/set/repa.do"  )
	public String setRepa(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRepa(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/moldmast/set/move.do"  )
	public String setMove(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMove(http.argument));
		return http.writer;
	}

}
