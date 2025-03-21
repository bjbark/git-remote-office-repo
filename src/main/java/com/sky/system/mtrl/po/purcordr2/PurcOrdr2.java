package com.sky.system.mtrl.po.purcordr2;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.core.common.report.JasperReportView;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("sjflv.PurcOrdr2")
@Controller
public class PurcOrdr2 extends DefaultControlHandler{

	@Autowired
	private PurcOrdr2Service service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/mtrl/po/purcordr2/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
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
	@RequestMapping(value="/mtrl/po/purcordr2/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	/**
	 * detail 조회 혁진
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/mtrl/po/purcordr2/get/detail2.do")
	public String getDetail2(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail2(http.argument));
		return http.writer;
	}


	/**
	 * invoice 조회
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/mtrl/po/purcordr2/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/po/purcordr2/get/search2.do")
	public String getSearch2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/po/purcordr2/get/search3.do")
	public String getSearch3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument));
		return http.writer;
	}



	// 마감 / 해지 수정
	@RequestMapping(value="/mtrl/po/purcordr2/set/close.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/po/purcordr2/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;

	}


	@RequestMapping(value="/mtrl/po/purcordr2/get/itemcode.do"  )
	public String getItemCode( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemCode(http.argument));
		return http.writer;
	}


	/**
	 * invoice 등록/수정/삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/mtrl/po/purcordr2/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		return http.writer;
	}


	/**
	 * invoice 등록/수정/삭제 혁진
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/mtrl/po/purcordr2/set/invoice2.do"  )
	public String setInvoice2(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setInvoice2(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/mtrl/po/purcordr2/get/impt.do")
	public String getImpt(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getImpt(http.argument));
		return http.writer;
	}

	// impt
	@RequestMapping(value="/mtrl/po/purcordr2/set/impt.do"  )
	public String setImpt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setImpt(http.argument ));
		return http.writer;
	}

	/**
	 * 삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/mtrl/po/purcordr2/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	//디테일삭제
		@RequestMapping(value="/mtrl/po/purcordr2/set/del_yn2.do")
		public String setDel_yn2(HttpMessage http, Map<String, Object> model) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.setDel_yn2(http.argument));
			return http.writer;
		}

	@RequestMapping(value="/mtrl/po/purcordr2/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//수정체크
	@RequestMapping(value="/mtrl/po/purcordr2/chk/cancel.do")
	public String chkcancel(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.chkcancel(http.argument));
		return http.writer;
	}


	// 룩업
	@RequestMapping(value="/mtrl/po/purcordr2/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort ));
		return http.writer;
	}

	// 룩업2
	@RequestMapping(value="/mtrl/po/purcordr2/get/lookup2.do"  )
	public String getLookup2(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup2(http.argument, page, rows));
		return http.writer;
	}

	@RequestMapping(value="mtrl/po/purcordr2/set/istt.do"  )
	public String setIstt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setIstt(http.argument ));
		return http.writer;

	}

	@RequestMapping(value="mtrl/po/purcordr2/set/item.do"  )
	public String setItem(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem(http.argument ));
		return http.writer;

	}


}
