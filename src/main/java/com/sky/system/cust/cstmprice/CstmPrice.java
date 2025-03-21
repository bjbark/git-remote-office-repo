package com.sky.system.cust.cstmprice;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class CstmPrice extends DefaultControlHandler{

	@Autowired
	private CstmPriceService service;

	// 조회
	@RequestMapping(value="cust/cstmprice/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/cust/cstmprice/get/detail.do"  )
	public String getDetail(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/cust/cstmprice/set/detail.do"  )
	public String  setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="cust/cstmprice/get/lookup.do"  )
	public String getLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 룩업2
	@RequestMapping(value="cust/cstmprice/get/lookup2.do"  )
	public String getLookup2(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup2(http.argument, page, rows));
		return http.writer;
	}

	// 룩업3
	@RequestMapping(value="cust/cstmprice/get/lookup3.do"  )
	public String getLookup3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup3(http.argument, page, rows, sort));
		return http.writer;
	}

	// 배송지
	@RequestMapping(value="cust/cstmprice/get/cstmdeli.do"  )
	public String getCstm_Deli(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstm_Deli(http.argument, page, rows));
		return http.writer;
	}

	//
	@RequestMapping(value="cust/cstmprice/get/buss_numb.do"  )
	public String getBuss_numb( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBuss_numb(http.argument));
		return http.writer;
	}
	@RequestMapping(value="cust/cstmprice/get/box_cstm_idcd.do"  )
	public String getbox_cstm_idcd( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getbox_cstm_idcd(http.argument));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="cust/cstmprice/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="cust/cstmprice/get/drtr.do"  )
	public String getDrtr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDrtr(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="cust/cstmprice/get/drtrlookup.do"  )
	public String getDrtrLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDrtrLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="cust/cstmprice/set/drtr.do"  )
	public String setDrtr(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDrtr(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="cust/cstmprice/get/addr.do"  )
	public String getAddr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getAddr(http.argument, page, rows, sort));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="cust/cstmprice/get/bank.do"  )
	public String getBank( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBank(http.argument, page, rows, sort));
		return http.writer;
	}
	// 룩업
	@RequestMapping(value="cust/cstmprice/get/addrlookup.do"  )
	public String getAddrLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getAddrLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="cust/cstmprice/set/addr.do"  )
	public String setAddr(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAddr(http.argument));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="cust/cstmprice/set/bank.do"  )
	public String setBank(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBank(http.argument));
		return http.writer;
	}
	//
	@RequestMapping(value="/cust/cstmprice/get/isos.do"  )
	public String getIsos(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getIsos(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/cust/cstmprice/get/rett.do"  )
	public String getRett(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRett(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/cust/cstmprice/get/order.do"  )
	public String getOrder(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrder(http.argument, page, rows, sort ));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="cust/cstmprice/get/deli.do"  )
	public String getDeli( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDeli(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="cust/cstmprice/get/delilookup.do"  )
	public String getDeliLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDeliLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="cust/cstmprice/set/deli.do"  )
	public String setDeli(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeli(http.argument));
		return http.writer;
	}


	// 계약내역조회
	@RequestMapping(value="cust/cstmprice/get/itempric.do"  )
	public String getItemPric(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemPric(http.argument, page, rows, sort ));
		return http.writer;
	}
}
