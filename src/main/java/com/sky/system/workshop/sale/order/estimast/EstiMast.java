package com.sky.system.workshop.sale.order.estimast;

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

@Service("workshop.EstiMast")
@Controller
public class EstiMast extends DefaultControlHandler{

	@Autowired
	private EstiMastService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/workshop/sale/order/estimast/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/tree.do")
	public String getTree( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTree(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/lookup.do")
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/clsslookup.do")
	public String getClssLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getClssLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/proclookup.do")
	public String getProcLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProcLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/sheetlookup.do")
	public String getSheetLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSheetLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/esti_pric_lookup.do")
	public String getEsti_Pric_Lookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getEsti_Pric_Lookup(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/workshop/sale/order/estimast/get/cnsl.do")
	public String getCnsl( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getCnsl(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/indx.do")
	public String getIndx( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getIndx(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/proc.do")
	public String getProc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getProc(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/shet.do")
	public String getShet( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getShet(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/shet2.do")
	public String getShet2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getShet2(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/covr.do")
	public String getCovr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getCovr(http.argument, page, rows, sort));
			return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/getseqn.do"  )
	public String getTreeSeqn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTreeSeqn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/cofm.do")
	public String setCofm(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCofm(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/cofmcancel.do")
	public String setCofmcancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCofmcancel(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/acpt.do"  )
	public String setAcpt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAcpt(http.argument ));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/prnt_cnsl.do"  )
	public String  setPrnt_cnsl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPrnt_cnsl(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/workshop/sale/order/estimast/set/records.do"  )
	public String setRecords(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecords(http.argument));
		return http.writer;
	}

	// 저장
		@RequestMapping(value="/workshop/sale/order/estimast/set/records2.do"  )
		public String setRecords2(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRecords2(http.argument));
			return http.writer;
		}

	@RequestMapping(value="/workshop/sale/order/estimast/set/item.do"  )
	public String setItem(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/get/maxid.do"  )
	public String getMaxid(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaxid(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/prnt_shet.do"  )
	public String  setPrnt_shet(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPrnt_shet(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/prnt_indx.do"  )
	public String  setPrnt_indx(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPrnt_indx(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/proc.do"  )
	public String  setProc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setProc(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/covr.do"  )
	public String setCovr(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCovr(http.argument ));
		return http.writer;

	}


	@RequestMapping(value="/workshop/sale/order/estimast/set/prnt_proc.do"  )
	public String  setPrnt_proc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPrnt_proc(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/workshop/sale/order/estimast/set/Masterdelete.do")
	public String MastersetDelete(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.MastersetDelete(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/workshop/sale/order/estimast/set/delete.do")
	public String setDelete(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDelete(http.argument));
		return http.writer;
	}

	/**
	 * 삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/workshop/sale/order/estimast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

}
