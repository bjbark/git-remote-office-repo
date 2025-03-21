package com.sky.system.prod.cvic.cvicmonitring;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CvicMonitring  extends DefaultControlHandler{

	@Autowired
	private CvicMonitringService service;

	@RequestMapping(value="prod/cvic/cvicmonitring/get/timeline.do"  )
	public String getTimeLine(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTimeLine(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/cvic/cvicmonitring/get/worktime.do"  )
	public String getWorkTime(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWorkTime(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/cvic/cvicmonitring/get/runnstoptime.do"  )
	public String getRunnStopTime(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRunnStopTime(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/cvic/cvicmonitring/get/runningdata.do"  )
	public String getRunningData(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRunningData(http.argument));
		return http.writer;
	}
}
