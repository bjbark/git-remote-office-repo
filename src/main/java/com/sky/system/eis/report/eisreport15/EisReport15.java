package com.sky.system.eis.report.eisreport15;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Controller
public class EisReport15 extends DefaultControlHandler{

	@Autowired
	private EisReport15Service service;
	// 조회
	@RequestMapping(value="/eis/report/eisreport15/get/calendar.do"  )
	public ModelAndView getCalendar( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

//		service.testCall2();
		String api_host			= arg.getParamText("api_host");
		String search_url		= arg.getParamText("search_url");
		String update_url		= arg.getParamText("update_url");
		String invc_numb		= arg.getParamText("invc_numb");
		String schd_dvcd		= arg.getParamText("schd_dvcd");
		String hq_id			= arg.getParamText("hq_id");
		String work_ordr_dvcd	= arg.getParamText("work_ordr_dvcd");
		String ordr_degr		= arg.getParamText("ordr_degr");
		String levels			= arg.getParamText("levels");
		String title			= arg.getParamText("title");
		String source			= arg.getParamText("source");
		String fr_dt			= arg.getParamText("fr_dt");
		String to_dt			= arg.getParamText("to_dt");
		String updt_idcd		= arg.getParamText("updt_idcd");

		ModelAndView ma = new ModelAndView();
		ma.addObject("api_host"		, api_host);
		ma.addObject("search_url"	, search_url);
		ma.addObject("update_url"	, update_url);
		ma.addObject("invc_numb"	, invc_numb);
		ma.addObject("schd_dvcd"	, schd_dvcd);
		ma.addObject("hq_id"		, hq_id);
		ma.addObject("work_ordr_dvcd"	, work_ordr_dvcd);
		ma.addObject("ordr_degr"	, ordr_degr);
		ma.addObject("levels"		, levels);
		ma.addObject("title"		, title);
		ma.addObject("source"		, source);
		ma.addObject("fr_dt"		, fr_dt);
		ma.addObject("to_dt"		, to_dt);
		ma.addObject("updt_idcd"	, updt_idcd);

		ma.setViewName( "calendar/full-height");

		return ma;
	}
	// 조회
	@RequestMapping(value="/eis/report/eisreport15/get/dailyreport.do"  )
	public ModelAndView getDailyreport( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		SqlResultMap a = service.getDaily_rept(http.argument);
		String user_name		= a.get(0).getParamText("user_name");		//작성자
		String prjt_name		= a.get(0).getParamText("prjt_name");		//프로젝트명
		String plan_rslt_dvcd	= a.get(0).getParamText("plan_rslt_dvcd");	//계획실적구분
		String dwup_date		= a.get(0).getParamText("dwup_date");		//근무일자(작성일자)
		String oprt_smry		= a.get(0).getParamText("oprt_smry");		//요약
		String prog_rate		= a.get(0).getParamText("prog_rate");		//진척율
		String oprt_cont		= a.get(0).getParamText("oprt_cont");		//업무내용


		ModelAndView ma = new ModelAndView();
		ma.addObject("user_name"		, user_name);
		ma.addObject("prjt_name"		, prjt_name);
		ma.addObject("plan_rslt_dvcd"	, plan_rslt_dvcd);
		ma.addObject("dwup_date"		, dwup_date);
		ma.addObject("oprt_smry"		, oprt_smry);
		ma.addObject("prog_rate"		, prog_rate);
		ma.addObject("oprt_cont"		, oprt_cont);


		ma.setViewName( "calendar/dailyreport");

		return ma;
	}

	@RequestMapping(value="/eis/report/eisreport15/get/fltx_cont.do"  )
	public String getFltx_cont( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getFltx_cont(http.argument));
		return http.writer;
	}
}
