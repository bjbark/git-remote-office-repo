package com.sky.system.custom.sjflv.prod.prodplanlist;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

import net.sky.http.dispatch.control.DefaultControlHandler;

@Service("sjflv.ProdPlanList")
@Controller
public class ProdPlanList extends DefaultControlHandler {
	
	@Autowired
	private ProdPlanListService service;
	
	@RequestMapping(value="/custom/sjflv/prod/prodplanlist/get/search1.do")
	public String getSearch1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplanlist/get/search2.do")
	public String getSearch2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplanlist/get/calendar.do")
	public ModelAndView getCalendar( HttpMessage http, Map<String, Object> model ) throws Exception {
		
		HttpRequestArgument arg = http.argument;
		ModelAndView ma = new ModelAndView();
		
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

		ma.setViewName( "calendar/sjflv-calendar");
		
		return ma;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplanlist/get/calendar2.do")
	public ModelAndView getCalendar2( HttpMessage http, Map<String, Object> model ) throws Exception {
		
		HttpRequestArgument arg = http.argument;
		ModelAndView ma = new ModelAndView();
		
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

		ma.setViewName( "calendar/sjflv-calendar2");
		
		return ma;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplanlist/get/events.do" )
	public String getEvents( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getEvents(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplanlist/get/events2.do" )
	public String getEvents2( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getEvents2(http.argument));
		return http.writer;
	}
	
	@RequestMapping(value="/custom/sjflv/prod/prodplanlist/get/event/details.do" )
	public String getEventDetails( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getEventDetails(http.argument, page, rows, sort ));
		return http.writer;
	}
}
