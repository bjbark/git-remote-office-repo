package com.sky.system.ganttchart;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Controller
public class GanttChart {

	@Autowired
	private GanttChartService service;


	@RequestMapping(value="/ganttchart/ganttChart.do"  )
	public ModelAndView ganttPage( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

//		service.testCall2();

		String api_host			= (String) arg.getParameter("api_host");
		String search_url		= (String) arg.getParameter("search_url");
		String update_url		= (String) arg.getParameter("update_url");
		String invc_numb		= (String) arg.getParameter("invc_numb");
		String schd_dvcd		= (String) arg.getParameter("schd_dvcd");
		String hq_id			= (String) arg.getParameter("hq_id");
		String work_ordr_dvcd	= (String) arg.getParameter("work_ordr_dvcd");
		String ordr_degr		= (String) arg.getParameter("ordr_degr");
		String levels			= (String) arg.getParameter("levels");
		String title			= (String) arg.getParameter("title");
		String source			= (String) arg.getParameter("source");
		String fr_dt			= (String) arg.getParameter("fr_dt");
		String to_dt			= (String) arg.getParameter("to_dt");
		String updt_idcd		= (String) arg.getParameter("updt_idcd");

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

		ma.setViewName( "gantt/ganttChart");

		return ma;
	}
	@RequestMapping(value="/ganttchart/grid.do"  )
	public ModelAndView grid( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

//		service.testCall2();

		String api_host		= (String) arg.getParameter("api_host");
		String token	= (String) arg.getParameter("token");
		String hq_id	= (String) arg.getParameter("hq_id");
		String search_url	= (String) arg.getParameter("search_url");
		String work_ordr_dvcd	= (String) arg.getParameter("work_ordr_dvcd");
		String ordr_degr	= (String) arg.getParameter("ordr_degr");

		ModelAndView ma = new ModelAndView();
		ma.addObject("api_host"		, api_host);
		ma.addObject("token"	, token);
		ma.addObject("hq_id"	, hq_id);
		ma.addObject("search_url"	, search_url);
		ma.addObject("work_ordr_dvcd"	, work_ordr_dvcd);
		ma.addObject("ordr_degr"	, ordr_degr);

		ma.setViewName( "gantt/grid");

		return ma;
	}
	@RequestMapping(value="/ganttchart/grid2.do"  )
	public ModelAndView grid2( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

//		service.testCall2();

		String api_host		= (String) arg.getParameter("api_host");
		String token	= (String) arg.getParameter("token");
		String hq_id	= (String) arg.getParameter("hq_id");
		String search_url	= (String) arg.getParameter("search_url");
		String invc_numb	= (String) arg.getParameter("invc_numb");

		ModelAndView ma = new ModelAndView();
		ma.addObject("api_host"		, api_host);
		ma.addObject("token"	, token);
		ma.addObject("hq_id"	, hq_id);
		ma.addObject("search_url"	, search_url);
		ma.addObject("invc_numb"	, invc_numb);

		ma.setViewName( "gantt/grid2");

		return ma;
	}

	@RequestMapping(value="/ganttchart/setGantt.do"  )
	public String setGantt( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setGantt(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/ganttchart/getGantt.do"  )
	public String getGantt( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getGantt(http.argument));
		model.put("assigs", service.getAssigs(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/getGanttWkct.do"  )
	public String getGanttWkct( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getGanttWkct(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/getGanttResource.do"  )
	public String getGanttResource( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getGanttResource(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/getGanttProjectDesign.do")
	public String getGanttProjectDesign( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getGanttProjectDesign(http.argument));
		model.put("assigs", service.getAssigsProjectDesign(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/setGanttProjectDesign.do")
	public String setGanttProjectDesign( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setGanttProjectDesign(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/getGanttProjectWork.do")
	public String getGanttProjectWork( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getGanttProjectWork(http.argument));
		model.put("assigs", service.getAssigsProjectWork(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/setGanttProjectWork.do")
	public String setGanttProjectWork( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setGanttProjectWork(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/getGanttProjectDesign1.do")
	public String getGanttProjectDesign1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getGanttProjectDesign1(http.argument));
		model.put("assigs", service.getAssigsProjectDesign1(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/setGanttProjectDesign1.do")
	public String setGanttProjectDesign1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setGanttProjectDesign1(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/getGanttProjectWork1.do")
	public String getGanttProjectWork1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getGanttProjectWork1(http.argument));
		model.put("assigs", service.getAssigsProjectWork1(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/setGanttProjectWork1.do")
	public String setGanttProjectWork1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setGanttProjectWork1(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/getGanttProjectWork1_2.do")
	public String getGanttProjectWork1_2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getGanttProjectWork1_2(http.argument));
		model.put("assigs", service.getAssigsProjectWork1(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/setGanttProjectWork1_2.do")
	public String setGanttProjectWork1_2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setGanttProjectWork1_2(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/gantt_query_1.do")
	public String gantt_query_1( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.gantt_query_1(http.argument));
//		model.put("assigs", service.getAssigsProjectWork1(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/ganttchart/getSeriesGantt.do"  )
	public ModelAndView getSeriesGantt( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		ModelAndView ma = new ModelAndView();

		String api_host		= (String) arg.getParameter("api_host");
		String pjod_idcd	= (String) arg.getParameter("pjod_idcd");
		String search_url	= (String) arg.getParameter("search_url");
		String hq_id		= (String) arg.getParameter("hq_id");
		String token		= (String) arg.getParameter("token");
		String work_ordr_dvcd	= (String) arg.getParameter("work_ordr_dvcd");
		String item_name	= (String) arg.getParameter("item_name");
		String deli_date	= (String) arg.getParameter("deli_date");

		ma.addObject("api_host"		, api_host);
		ma.addObject("token"		, token);
		ma.addObject("pjod_idcd"	, pjod_idcd);
		ma.addObject("search_url"	, search_url);
		ma.addObject("hq_id"		, hq_id);
		ma.addObject("work_ordr_dvcd"	, work_ordr_dvcd);
		ma.addObject("item_name"	, item_name);
		ma.addObject("deli_date"	, deli_date);
		ma.setViewName("gantt/seriesGantt");

		return ma;
	}
	@RequestMapping(value="/ganttchart/getImagePage.do"  )
	public ModelAndView getImagePage( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		String hq_id		= (String) arg.getParameter("hq_id");

		ModelAndView ma = new ModelAndView();


		ma.addObject("hq_id"		, hq_id);
		ma.setViewName("gantt/ganttImage");

		return ma;
	}
	@RequestMapping(value="/ganttchart/getImage.do"  )
	public String getImage(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}
}
