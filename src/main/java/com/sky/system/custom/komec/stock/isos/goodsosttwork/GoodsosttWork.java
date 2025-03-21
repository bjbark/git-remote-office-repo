package com.sky.system.custom.komec.stock.isos.goodsosttwork;

import java.io.InputStream;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParser;
import com.sky.sdk.core.thirdparty.microsoft.excel.ExcelParserHandler;
import com.sky.utils.file.UploadItem;
@Service("komec.GoodsosttWork")
@Controller
public class GoodsosttWork  extends DefaultControlHandler{


	@Autowired
	private GoodsosttWorkService service;


	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/get/master1.do"  )
	public String getMaster1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/get/detail1.do"  )
	public String getDetail1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail1(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/get/master2.do"  )
	public String getMaster2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaster2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/get/detail2.do"  )
	public String getDetail2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/set/deleteMaster.do"  )
	public String deleteMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.deleteMaster(http.argument));
		return http.writer;
	}

	//Mobile
	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/get/osttList.do")
	public String getOsttList(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOsttList(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/set/ostt.do")
	public String setOstt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOstt(http.argument ));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/get/dailylist.do")
	public String getDailyList(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDailyList(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/komec/stock/isos/goodsosttwork/set/dailylist.do")
	public String setDailyList(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDailyList(http.argument));
		return http.writer;
	}
}
