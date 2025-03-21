package com.sky.testcall;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.jcraft.jsch.Session;
import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class TestCall {

	@Autowired
	private TestCallService service;

	@RequestMapping(value="/testcall/call1.do"  )
	public String testCall1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.testCall1(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/testcall/getFileNameTest.do"  )
	public String getFileNameTest( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFileNameTest(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/testcall/getFileDat.do"  )
	public String getFileDat( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFileDat(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/testcall/call2.do"  )
	public ModelAndView testCall2( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();

		String hq_id = (String) arg.getParameter("hq_id");
		String stor_id = arg.getParamText("stor_id");

		ModelAndView ma = new ModelAndView();
		ma.addObject("hq_id", hq_id);
		ma.addObject("stor_id", stor_id);

		ma.setViewName( "testcall/TestCall");

		return ma;
	}

	@RequestMapping(value="/testcall/gantt.do"  )
	public ModelAndView gantt( HttpMessage http, Map<String, Object> model) throws Exception {

		ModelAndView ma = new ModelAndView();

		ma.setViewName( "gantt/ganttTest");

		return ma;
	}

	@RequestMapping(value="/testcall/setGantt.do"  )
	public String setGantt( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setGantt(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/testcall/getGantt.do"  )
	public String getGantt( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getGantt(http.argument));
		model.put("assigs", service.getAssigs(http.argument));
		return http.writer;
	}
	//TODO ubi report
	@RequestMapping(value="/testcall/ubitest.do"  )
	public ModelAndView ubitest( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();

		String jrf   = arg.getParamText("jrf");
		String resId = arg.getParamText("resId");
		String args = arg.getParamText("arg");

		args = args.replaceAll("[.]","#");
		System.out.println(args);
		ModelAndView ma = new ModelAndView();
		ma.addObject("jrf", jrf);
		ma.addObject("resId", resId);
		ma.addObject("arg", args);

		ma.setViewName( "ubi/ubihtml");

		return ma;
	}
	@RequestMapping(value="/testcall/call4.do"  )
	public ModelAndView testCall4( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();

		String mold_code = (String) arg.getParameter("mold_code");
		ModelAndView ma = new ModelAndView();
		ma.addObject("mold_code", mold_code);

		ma.setViewName("callview/mblePage4");

		return ma;
	}
	@RequestMapping(value="/mobile/test.do"  )
	public ModelAndView test( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();

		ModelAndView ma = new ModelAndView();

		ma.setViewName("dowonMobile/prod_regi_img");

		return ma;
	}

	//graph 테스트
	@RequestMapping(value="/testcall/graph.do"  )
	public ModelAndView graph( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		String mold_code = (String) arg.getParameter("mold_code");
		ModelAndView ma = new ModelAndView();
		ma.addObject("mold_code", mold_code);
		ma.setViewName("graph/graph");
		return ma;
	}
	//gantt 테스트
	@RequestMapping(value="/testcall/ganttTest.do"  )
	public ModelAndView ganttTest( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		ModelAndView ma = new ModelAndView();
		ma.setViewName("gantt/testGantt");
		return ma;
	}
	@RequestMapping(value="/testcall/setDXFupload.do"  )
	public String setDXFupload( HttpMessage http, Map<String, Object> model,UploadItem uploadItem) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDXFupload(http.argument,uploadItem));
		return http.writer;
	}
}
