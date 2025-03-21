package com.sky.system.stock.goodsrettwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class GoodsRettWork  extends DefaultControlHandler{

	@Autowired
	private GoodsRettWorkService service;

	@RequestMapping(value="/stock/goodsrettwork/get/master.do"  )
	public String getMaster(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/stock/goodsrettwork/get/detail.do"  )
	public String getDetail(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/stock/goodsrettwork/get/ostt.do"  )
	public String getOstt(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOstt(http.argument, page, rows, sort ));
		return http.writer;
	}


	@RequestMapping(value="/stock/goodsrettwork/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/stock/goodsrettwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/stock/goodsrettwork/set/isosPopup.do"  )
	public String setIsosPopup(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setIsosPopup(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/stock/goodsrettwork/set/deleteMaster.do"  )
	public String deleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.deleteMaster(http.argument));
		return http.writer;
	}
}
