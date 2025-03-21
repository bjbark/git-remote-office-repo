package com.sky.system.custom.aone.sale.order.sorderplan;

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
@Service("aone.SorderPlan")
@Controller
public class SorderPlan extends DefaultControlHandler{

	@Autowired
	private SorderPlanService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	//전체 마스터 조회
	@RequestMapping(value="/custom/aone/sale/order/sorderplan/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/aone/sale/order/sorderplan/get/lookup.do")
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/aone/sale/order/sorderplan/get/master3.do")
	public String getMaster3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getMaster3(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/custom/aone/sale/order/sorderplan/get/master4.do")
	public String getMaster4( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getMaster4(http.argument, page, rows, sort));
			return http.writer;
	}

	/**
	 * 수리지시 견적   등록 /수정
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	// 마스터 아이템 입력
	@RequestMapping(value="/custom/aone/sale/order/sorderplan/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//지시등록(일괄)
		@RequestMapping(value="/custom/aone/sale/order/sorderplan/set/recordsall.do")
		public String setRecordsAll(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRecordsAll(http.argument));
			return http.writer;
		}


	//견적자재등록
	@RequestMapping(value="/custom/aone/sale/order/sorderplan/set/mtrl.do"  )
	public String setMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMtrl(http.argument));
		return http.writer;
	}

	//견적비 등록
	@RequestMapping(value="/custom/aone/sale/order/sorderplan/set/esti.do")
	public String setEsti(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setEsti(http.argument));
		return http.writer;
	}


	/**
	 * detail 조회
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	//견적자재 불러오기
	@RequestMapping(value="/custom/aone/sale/order/sorderplan/get/mtrl.do")
	public String getMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrl(http.argument));
		return http.writer;
	}

	/**
	 * 상품검색
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/aone/sale/order/sorderplan/get/product.do")
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	//수리전 이미지 불러오기
	@RequestMapping(value="/custom/aone/sale/order/sorderplan/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}

	//반려
	@RequestMapping(value="/custom/aone/sale/order/sorderplan/set/return.do"  )
	public String setReturn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setReturn(http.argument ));
		return http.writer;
	}
}
