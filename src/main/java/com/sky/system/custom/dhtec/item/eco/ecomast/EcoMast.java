package com.sky.system.custom.dhtec.item.eco.ecomast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Service("dhtec.EcoMast")
@Controller
public class EcoMast extends DefaultControlHandler{

	@Autowired
	private EcoMastService service;
	// 조회
	@RequestMapping(value="/custom/dhtec/item/eco/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/basic/item/eco/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/basic/item/eco/get/detail2.do")
	public String getDetail2(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/basic/item/eco/set/detail2.do")
	public String setDetail2(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDetail2(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/basic/item/eco/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	/**
	 * invoice 등록/수정/삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/dhtec/basic/item/eco/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/basic/item/eco/set/Copy.do"  )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument));
		return http.writer;
	}



	// 페이징없이 조회
//	@RequestMapping(value="/basic/item/eco/ecomast/get/search2.do"  )
//	public String getSearch2( HttpMessage http, Map<String, Object> model) throws Exception {
//
//		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument));
//		return http.writer;
//	}

	@RequestMapping(value="/custom/dhtec/basic/item/eco/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;

	}

	// 룩업
	@RequestMapping(value="/custom/dhtec/basic/item/eco/get/lookup.do"  )
	public String getLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/dhtec/basic/item/eco/set/record.do"  )
	public String setMaster(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setMaster(http.argument));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/dhtec/basic/item/eco/get/offelookup.do"  )
	public String getOffeLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOffeLookup(http.argument, page, rows));
		return http.writer;
	}

	/**
	 * 삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/dhtec/basic/item/eco/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/dhtec/basic/item/eco/set/upload.do")
	public String upload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.upload(http.argument, uploadItem));
		return http.writer;
	}

}
