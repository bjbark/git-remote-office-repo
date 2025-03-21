package com.sky.system.custom.sjflv.prod.workbook;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("sjflv.WorkBook")
@Controller
public class WorkBook extends DefaultControlHandler{

	@Autowired
	private WorkBookService service;

	// 조회
	@RequestMapping(value="/custom/sjflv/prod/workbook/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 원가정산
	@RequestMapping(value="/custom/sjflv/prod/workbook/get/lott.do"  )
	public String getLottInfo(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLottInfo(http.argument ));
		return http.writer;
	}

	//제품 생산 등록 및 삭제
	@RequestMapping(value="/custom/sjflv/prod/workbook/set/setMaster.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument ));
		return http.writer;
	}

//	//원재료 출고
//	@RequestMapping(value="/custom/sjflv/prod/workbook/set/bookmtrl.do"  )
//	public String setBookMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setBookMtrl(http.argument ));
//		return http.writer;
//	}

	@RequestMapping(value="/custom/sjflv/prod/workbook/get/mtrlivst.do")
	public String getMtrlIvst(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrlIvst(http.argument));
		return http.writer;
	}
}

