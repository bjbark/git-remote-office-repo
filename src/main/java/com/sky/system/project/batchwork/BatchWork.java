package com.sky.system.project.batchwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class BatchWork extends DefaultControlHandler{

	@Autowired
	private BatchWorkService service;


	@RequestMapping(value="/project/batchwork/set/setImages.do")
	public String getLastSales(HttpMessage http,  Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setImages(http.argument ));
		return http.writer;
	}

}
