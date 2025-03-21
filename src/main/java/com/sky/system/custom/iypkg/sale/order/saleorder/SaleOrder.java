package com.sky.system.custom.iypkg.sale.order.saleorder;

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


@Service("iypkg.SaleOrder")
@Controller
public class SaleOrder extends DefaultControlHandler{

	@Autowired
	private SaleOrderService service;

	//조회
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	//원단 조회
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/fabc.do")
	public String getFabc( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFabc(http.argument, sort));
		return http.writer;
	}
	//원단 조회
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/stok.do")
	public String getStok( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getStok(http.argument, page, rows, sort));
		return http.writer;
	}
	//원단 조회
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/fabccopy.do")
	public String getFabcCopy( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFabcCopy(http.argument, sort));
		return http.writer;
	}
	//원단 조회
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/wkctcopy.do")
	public String getWkctCopy( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkctCopy(http.argument, sort));
		return http.writer;
	}
	//가공공정 조회
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/wkct.do")
	public String getWkct( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWkct(http.argument, sort));
		return http.writer;
	}
	//수주번호조회
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/invc_numb.do")
	public String getInvcNumb( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvcNumb(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/isos_load.do"  )
	public String  getIsos_Load(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getIsos_Load(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/ostt_plan_qntt.do"  )
	public String  getOstt_Plan_Qntt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOstt_Plan_Qntt(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/fabc_need_calc.do"  )
	public String  getFabc_Need_Calc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getFabc_Need_Calc(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/check_ostt.do"  )
	public String  getCheck_ostt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCheck_ostt(http.argument));
		return http.writer;
	}
	//저장
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	//저장
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/wkct.do"  )
	public String setWkct(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWkct(http.argument));
		return http.writer;
	}
	//저장
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/fabc.do"  )
	public String setFabc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFabc(http.argument));
		return http.writer;
	}
	// 이미지업로드
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/imageupload.do"  )
	public String setImageUpload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setImageUpload(http.argument, uploadItem));
		return http.writer;
	}
	//BOM복사
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/auto_bom_copy.do"  )
	public String setAuto_Bom_Copy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAuto_Bom_Copy(http.argument));
		return http.writer;
	}
	//BOP복사
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/auto_bop_copy.do"  )
	public String setAuto_Bop_Copy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAuto_Bop_Copy(http.argument));
		return http.writer;
	}
	//BOM,BOP 체크 후 삭제
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/auto_bom_bop_delete.do"  )
	public String setAuto_Bom_Bop_Delete(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAuto_Bom_Bop_Delete(http.argument));
		return http.writer;
	}
	//삭제
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/child.do"  )
	public String getChild( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getChild(http.argument));
		return http.writer;
	}

	//승인
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/ok.do"  )
	public String setOk(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setOk(http.argument ));
		return http.writer;
	}
	//출고
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/boxx_to_ostt.do"  )
	public String setBoxx_To_Ostt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBoxx_To_Ostt(http.argument ));
		return http.writer;
	}

	//주문서복사
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/set/copy.do"  )
	public String setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument ));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/iypkg/sale/order/saleorder/get/lookup.do" )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}

}
