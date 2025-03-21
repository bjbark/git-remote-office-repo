package com.sky.system.custom.sjflv.cust.cstmmast;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
@Service("sjflv.CstmMast")
@Controller
public class CustMast extends DefaultControlHandler{

	@Autowired
	private CustMastService service;

	// 조회
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/lookup.do"  )
	public String getLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}

	// 룩업2
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/lookup2.do"  )
	public String getLookup2(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup2(http.argument, page, rows));
		return http.writer;
	}

	// 룩업3
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/lookup3.do"  )
	public String getLookup3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup3(http.argument, page, rows, sort));
		return http.writer;
	}

	// 배송지
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/cstmdeli.do"  )
	public String getCstm_Deli(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstm_Deli(http.argument, page, rows));
		return http.writer;
	}

	// 배송지 추가 등록
		@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/deliveryaddress.do"  )
		public String setDeliveryAddress (HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setDeliveryAddress(http.argument));
			return http.writer;
		}

	//
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/buss_numb.do"  )
	public String getBuss_numb( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBuss_numb(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/box_cstm_idcd.do"  )
	public String getbox_cstm_idcd( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getbox_cstm_idcd(http.argument));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/add.do"  )
	public String  setAdd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAdd(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/drtr.do"  )
	public String getDrtr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDrtr(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/drtrlookup.do"  )
	public String getDrtrLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDrtrLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/drtr.do"  )
	public String setDrtr(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDrtr(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/addr.do"  )
	public String getAddr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getAddr(http.argument, page, rows, sort));
		return http.writer;
	}
	// 조회
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/bank.do"  )
	public String getBank( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBank(http.argument, page, rows, sort));
		return http.writer;
	}
	// 룩업
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/addrlookup.do"  )
	public String getAddrLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getAddrLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/addr.do"  )
	public String setAddr(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAddr(http.argument));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/bank.do"  )
	public String setBank(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBank(http.argument));
		return http.writer;
	}
	//
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/isos.do"  )
	public String getIsos(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getIsos(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/rett.do"  )
	public String getRett(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRett(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/order.do"  )
	public String getOrder(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrder(http.argument, page, rows, sort ));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/deli.do"  )
	public String getDeli( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDeli(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/delilookup.do"  )
	public String getDeliLookup(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDeliLookup(http.argument, page, rows));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/deli.do"  )
	public String setDeli(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDeli(http.argument));
		return http.writer;
	}

	// 삭제
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	// 관리항목 조회
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/cstm_mngt.do"  )
	public String getCstm_Mngt(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstm_Mngt(http.argument, page, rows, sort ));
		return http.writer;
	}
	// 관리항목 조회
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/mngt.do"  )
	public String getMngt(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMngt(http.argument ));
		return http.writer;
	}

	// 관리항목 저장
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/set/cstm_mngt.do"  )
	public String  setCstm_Mngt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCstm_Mngt(http.argument));
		return http.writer;
	}

	// 계약내역조회
	@RequestMapping(value="/custom/sjflv/cust/cstmmast/get/itempric.do"  )
	public String getItemPric(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemPric(http.argument, page, rows, sort ));
		return http.writer;
	}
}
