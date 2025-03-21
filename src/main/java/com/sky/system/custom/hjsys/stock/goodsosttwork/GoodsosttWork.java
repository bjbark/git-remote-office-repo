package com.sky.system.custom.hjsys.stock.goodsosttwork;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("hjsys.GoodsosttWork")
@Controller
public class GoodsosttWork  extends DefaultControlHandler{


	@Autowired
	private GoodsosttWorkService service;


	@RequestMapping(value="/custom/hjsys/stock/goodsosttwork/get/master1.do"  )
	public String getMaster1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/stock/goodsosttwork/get/detail1.do"  )
	public String getDetail1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/stock/goodsosttwork/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/hjsys/stock/goodsosttwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/hjsys/stock/goodsosttwork/set/deleteMaster.do"  )
	public String deleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.deleteMaster(http.argument));
		return http.writer;
	}
}
