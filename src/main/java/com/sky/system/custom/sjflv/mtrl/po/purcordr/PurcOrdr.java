package com.sky.system.custom.sjflv.mtrl.po.purcordr;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultMap;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Service("sjflv.PurcOrdr")
@Controller
public class PurcOrdr extends DefaultControlHandler{

	@Autowired
	private PurcOrdrService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/get/search.do")
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
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	/**
	 * invoice 조회
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/get/invoice.do")
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	// 수인오더 상태 가져오기
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/get/impt.do")
	public String getImpt(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getImpt(http.argument));
		return http.writer;
	}

	// invc_numb 마지막 번호 조회하기
	@RequestMapping(value="/custom/sjflv/prod/workbook/get/invoiceNumber.do"  )
	public String getInvoiceNumberInfo(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoiceNumberInfo(http.argument ));
		return http.writer;
	}


	// 수입오더 등록
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/set/impt.do"  )
	public String setImpt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setImpt(http.argument ));
		return http.writer;
	}

	// 승인
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;
	}

	// 승인취소 체크
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/chk/cancel.do")
	public String chkcancel(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.chkcancel(http.argument));
		return http.writer;
	}

	//납기일자 일괄변경
		@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/set/deli.do"  )
		public String setDeli(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setDeli(http.argument ));
			return http.writer ;
		}

	/**
	 * invoice 등록/수정/삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */

	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/set/invoice.do"  )
	public String setInvoice(HttpMessage http, Map<String, Object> model) throws Exception {

		String rowaction = http.argument.getParameter("records", SqlResultMap.class).get(0).getParamText("_set");
		String invc_numb = http.argument.getParameter("records", SqlResultMap.class).get(0).getParamText("invc_numb");

		// 2023.02.15 - 추가로 작성된 수주건은 수주-품목 건 별 생성 처리
		if ("insert".equals(rowaction) && invc_numb.isEmpty()) {
			model.put(HttpResponseMessage.RECORDS, service.setInvoiceInsert(http.argument));
		} else {
			model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
		}

		return http.writer;
	}


	/**
	 * 삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/set/istt2.do"  )
	public String setIstt2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setIstt2(http.argument ));
		return http.writer;
	}

	//payment 등록
	@RequestMapping(value="/custom/sjflv/mtrl/po/purcordr/set/payment.do"  )
	public String setPayment(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPayment(http.argument));
		return http.writer;
	}
}