package com.sky.system.mobile.menu;

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
public class MobileMenu {

	@Autowired
	private MobileMenuService service;

	// TODO 모바일화면

	@RequestMapping(value="/mobile/mbleMain.do"  )
	public ModelAndView mbleMain( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();
		if(session.getAttribute("accepted")!=null){
			String hq_id = (String) arg.getParameter("hq_id");
			String stor_id = arg.getParamText("stor_id");
			ma.addObject("hq_id", hq_id);
			ma.addObject("stor_id", stor_id);
			ma.addObject("path", "callview/mbleMainMenu");
			ma.setViewName( "callview/mbleMainMenu");
		}else{
			ma.setViewName("callview/Login");
		}

		return ma;
	}
	@RequestMapping(value="/mobile/mbleMain2.do"  )
	public ModelAndView mbleMain2( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();
		if(session.getAttribute("accepted")!=null){
			String hq_id = (String) arg.getParameter("hq_id");
			String stor_id = arg.getParamText("stor_id");
			ma.addObject("hq_id", hq_id);
			ma.addObject("stor_id", stor_id);
			ma.addObject("path", "dowonMobile/mbleMainMenu");
			ma.setViewName( "dowonMobile/mbleMainMenu");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/mblePage5.do"  )
	public ModelAndView mblePage5( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
		ma.setViewName("callview/mblePage5");
		}else{
			ma.setViewName("callview/Login");
		}

		return ma;
	}
	@RequestMapping(value="/mobile/logout.do"  )
	public ModelAndView logout( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		session.invalidate();
		ModelAndView ma = new ModelAndView();
		ma.setViewName("callview/Login");

		return ma;
	}

	@RequestMapping(value="/mobile/get/pjod.do"  )
	public String getPjod(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPjod(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mobile/get/cvic.do"  )
	public String getCvic(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCvic(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mobile/get/user.do"  )
	public String getUser(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getUser(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/mobile/eisList.do"  )
	public ModelAndView eisList( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();
		if(session.getAttribute("accepted")!=null){
			String hq_id = (String) arg.getParameter("hq_id");
			String stor_id = arg.getParamText("stor_id");
			ma.addObject("hq_id", hq_id);
			ma.addObject("stor_id", stor_id);
			ma.addObject("path", "dowonMobile/eisList");
			ma.setViewName( "dowonMobile/eisList");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/login.do"  )
	public ModelAndView login( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		String token_id = arg.getParamText("token_id");
		String hq_id = arg.getParamText("hq_id");
		String path = arg.getParamText("path");
		ModelAndView ma = new ModelAndView();
		ma.setViewName("callview/Login");
		if(token_id != null && token_id != "" ){
			session.setAttribute("accepted",true);
			if(path != null && !"".equals(path)){
				ma.setViewName(path);
			}else{
				if(hq_id.equals("N1000DOWON")){
					ma.setViewName("dowonMobile/mbleMainMenu");
				}else{
					ma.setViewName("callview/mbleMainMenu");
				}
			}
		}else{
			ma.addObject("path",path);
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/mblePage4.do" )
	public ModelAndView mblePage4( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			String mold_code = (String) arg.getParameter("mold_code");

			ma.addObject("mold_code", mold_code);

			ma.setViewName( "callview/mblePage4");
		}else{
			ma.setViewName("callview/Login");
		}


		return ma;
	}
	@RequestMapping(value="/mobile/mblePage2.do"  )
	public ModelAndView mblePage2( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
		ma.setViewName("callview/mblePage2");
		}else{
			ma.setViewName("callview/Login");
		}

		return ma;
	}
	@RequestMapping(value="/mobile/mblePage3.do"  )
	public ModelAndView mblePage3( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
		ma.setViewName("callview/mblePage3");
		}else{
			ma.setViewName("callview/Login");
		}

		return ma;
	}
	@RequestMapping(value="/mobile/mblePage1.do"  )
	public ModelAndView mblePage1( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("callview/mblePage1");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}

	@RequestMapping(value="/mobile/mblePage6.do"  )
	public ModelAndView mblePage6( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("callview/dailystockwork");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}

	@RequestMapping(value="/mobile/prod_regi_img.do"  )
	public ModelAndView prod_regi_img( HttpMessage http, Map<String, Object> model) throws Exception {

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("dowonMobile/prod_regi_img");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/total_board1.do"  )
	public ModelAndView total_board1( HttpMessage http, Map<String, Object> model) throws Exception {

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("dowonMobile/total_board1");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/total_board2.do"  )
	public ModelAndView total_board2( HttpMessage http, Map<String, Object> model) throws Exception {

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("dowonMobile/total_board2");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/total_board3.do"  )
	public ModelAndView total_board3( HttpMessage http, Map<String, Object> model) throws Exception {

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("dowonMobile/total_board3");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/total_board4.do"  )
	public ModelAndView total_board4( HttpMessage http, Map<String, Object> model) throws Exception {

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("dowonMobile/total_board4");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/total_board5.do"  )
	public ModelAndView total_board5( HttpMessage http, Map<String, Object> model) throws Exception {

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
		ma.setViewName("dowonMobile/total_board5");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/get/eis_query1.do"  )
	public String getEis_Query1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getEis_Query1(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/mobile/get/wkct.do"  )
	public String getWkct(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mobile/get/total_board4.do"  )
	public String getTotal_Board4(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTotal_Board4(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mobile/get/total_board5.do"  )
	public String getTotal_Board5(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTotal_Board5(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/mobile/get/SeriesGantt.do"  )
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
		String hide	= (String) arg.getParameter("hide");

		ma.addObject("hide"		, hide);
		ma.addObject("api_host"		, api_host);
		ma.addObject("token"		, token);
		ma.addObject("pjod_idcd"	, pjod_idcd);
		ma.addObject("search_url"	, search_url);
		ma.addObject("hq_id"		, hq_id);
		ma.addObject("work_ordr_dvcd"	, work_ordr_dvcd);
		ma.addObject("item_name"	, item_name);
		ma.addObject("deli_date"	, deli_date);
		ma.setViewName("gantt/seriesGanttMobile");

		return ma;
	}

	@RequestMapping(value="/mobile/cvic_dmge.do"  )
	public ModelAndView cvic_dmge( HttpMessage http, Map<String, Object> model) throws Exception {

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("callview/cvic_dmge");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	//출하
	@RequestMapping(value="/mobile/goodsosttwork.do"  )
	public ModelAndView Goodsosttwork( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(true);
		ModelAndView ma = new ModelAndView();

		if(session.getAttribute("accepted")!=null){
			ma.setViewName("callview/goodsosttwork");
		}else{
			ma.setViewName("callview/Login");
		}
		return ma;
	}
	@RequestMapping(value="/mobile/gosttdir.do"  )
	public ModelAndView GoodsosttworkDirect( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		ModelAndView ma = new ModelAndView();

		String invc_numb	= (String) arg.getParameter("invc_numb");
		String line_seqn	= (String) arg.getParameter("line_seqn");

		ma.addObject("invc_numb"		, invc_numb);
		ma.addObject("line_seqn"		, line_seqn);
		ma.setViewName("callview/goodsosttworkDirect");
		return ma;
	}
	@RequestMapping(value="/mobile/isttdir.do"  )
	public ModelAndView isttworkDirect( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		service.testCall2();
		ModelAndView ma = new ModelAndView();

		String invc_numb	= (String) arg.getParameter("invc_numb");
		String line_seqn	= (String) arg.getParameter("line_seqn");

		ma.addObject("invc_numb"		, invc_numb);
		ma.addObject("line_seqn"		, line_seqn);
		ma.setViewName("callview/isttworkDirect");
		return ma;
	}
	//TODO 모바일 파일업로드
	@RequestMapping(value="/mobile/get/getfileseqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}
	// 파일업로드
	@RequestMapping(value="/mobile/set/fileUpload.do"  )
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}

	// TODO



}
