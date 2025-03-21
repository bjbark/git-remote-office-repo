package com.sky.system.ubi;

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
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class Ubi {


	@RequestMapping(value="/ubi/getReport.do"  )
	public ModelAndView getReport( HttpMessage http, Map<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;

		String jrf   = arg.getParamText("jrf");
		String resId = arg.getParamText("resId");
		String args = arg.getParamText("arg");
		args = args.replaceAll("[~]","#");
		args = args.replaceAll("[']","\"");
		System.out.println(args);
		ModelAndView ma = new ModelAndView();
		ma.addObject("jrf", jrf);
		ma.addObject("resId", resId);
		ma.addObject("arg", args);

		ma.setViewName("ubi/ubihtml");

		return ma;
	}
}
