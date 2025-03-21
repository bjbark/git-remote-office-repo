package com.sky.system.prod.plan.prodplanv2;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class ProdPlanV2 extends DefaultControlHandler{

	@Autowired
	private ProdPlanV2Service service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/prod/plan/prodplanv2/get/search1.do"  )
	public String getSearch1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/prod/plan/prodplanv2/get/search2.do"  )
	public String getSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/prod/plan/prodplanv2/get/write.do"  )
	public String getWrite(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWrite(http.argument, page, rows, sort ));

		return http.writer;
	}

	@RequestMapping(value="/prod/plan/prodplanv2/get/entry.do"  )
	public String getEntry(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getEntry(http.argument, page, rows, sort ));

		return http.writer;
	}

	@RequestMapping(value="/prod/plan/prodplanv2/set/write.do"  )
	public String setWrite(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWrite(http.argument ));
		return http.writer;

	}
	@RequestMapping(value="/prod/plan/prodplanv2/set/work_order_create.do"  )
	public String work_order_create(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.work_order_create_v3(http.argument ));
		return http.writer;
	}

	// lot 번호 생성 ex)오늘날짜(210104-1)
	@RequestMapping(value="/prod/plan/prodplanv2/get/max.do"  )
	public String GetMax(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.GetMax(http.argument ));
		return http.writer;

	}

}
