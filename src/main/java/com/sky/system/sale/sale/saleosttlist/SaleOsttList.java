package com.sky.system.sale.sale.saleosttlist;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class SaleOsttList  extends DefaultControlHandler{

	@Autowired
	private SaleOsttListService service;


	@RequestMapping(value="/sale/salelist/get/search.do")
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/sale/saleosttlist/get/itemlist.do"  )
	public String itemlist(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.itemlist(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/sale/saleosttlist/get/custgroup.do"  )
	public String custgroup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.custgroup(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/salelist/get/detail.do"  )
	public String getDetail1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/salelist/get/itemgroup.do"  )
	public String itemgroup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.itemgroup(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/sale/salelist/get/custgroupitem.do"  )
	public String custgroupitem(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.custgroupitem(http.argument, page, rows, sort ));
		return http.writer;
	}


//	@RequestMapping(value="/stock/goodsosttwork/get/master1.do"  )
//	public String getMaster1(HttpMessage http, Map<String, Object> model,
//		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort ));
//		return http.writer;
//	}
//
//	@RequestMapping(value="/stock/goodsosttwork/get/master2.do"  )
//	public String getMaster2(HttpMessage http, Map<String, Object> model,
//		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort ));
//		return http.writer;
//	}
//
//	@RequestMapping(value="/stock/goodsosttwork/get/detail2.do"  )
//	public String getDetail2(HttpMessage http, Map<String, Object> model,
//		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
//		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
//		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort ));
//		return http.writer;
//	}
//
//	@RequestMapping(value="/stock/goodsosttwork/get/invoice.do")
//	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
//		return http.writer;
//	}
//
//	// 저장
//	@RequestMapping(value="/stock/goodsosttwork/set/invoice.do"  )
//	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
//		return http.writer;
//	}
//
//	@RequestMapping(value="/stock/goodsosttwork/set/deleteMaster.do"  )
//	public String deleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
//		model.put(HttpResponseMessage.RECORDS, service.deleteMaster(http.argument));
//		return http.writer;
//	}
}
