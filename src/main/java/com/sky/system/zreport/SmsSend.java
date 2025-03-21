package com.sky.system.zreport;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.sky.http.dispatch.control.DefaultControlHandler;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;



@Controller
public class SmsSend extends DefaultControlHandler {

	@Autowired
	private SmsSendService service;

	//
	@RequestMapping(value="/zreport/get/smssend.do")
	public void getSmsSend(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page ,
			@RequestParam(value="limit", required=true, defaultValue="200") int rows ,
			HttpMessage http, HttpServletResponse response
			) throws Exception {
		System.out.println("getsmssend "+http.argument);
		//http.response.addParam("records", service.getBasic_Popup(  http.argument , page , rows )).toWrite(response);
	}

	@RequestMapping(value="/zreport/set/smssend.do")
	public String setSmsSend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSmsSend(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/zreport/get/xmlreturn.do")
	public void getxmlreturn(			HttpServletResponse response			) throws Exception {
		System.out.println("시작");
		response.setContentType("text/html; charset=utf-8");
		response.setHeader("pragma",	"no-cache");
		response.setHeader("cache-control",	"no-cache");
		response.setHeader("expires",	"0");
		PrintWriter out = response.getWriter();
		out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		out.println("<DATA>	<ORDERBINDID>100001</ORDERBINDID>	<MODIFYDATE>2015-03-13 15:41:51</MODIFYDATE>	<DELIVERYDATE>2015-03-13 15:41:51</DELIVERYDATE>	<DELIVERYNUMBER>123456</DELIVERYNUMBER>	<DELIVERYNAME>CJ GLS택배</DELIVERYNAME></DATA>");
		out.flush();
		out.close();
		System.out.println("끝");
		//System.out.println("setsmssend "+http.argument);
		//http.response.addParam("records", service.setSmsSend(  http.argument  )).toWrite(response);
	}



}