package com.sky.system.custom.aone.prod.order.sorderworkentry;

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
@Service("aone.order.SorderWorkEntry")
@Controller
public class SorderWorkEntry extends DefaultControlHandler{

	@Autowired
	private SorderWorkEntryService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/lookup.do")
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
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
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/detail.do")
	public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
		return http.writer;
	}

	//처리 이미지 불러오기
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}

	/**
	 * invoice 조회
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */

	//워크북 데이터 불러오기
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/workBook.do"  )
	public String getWorkBook(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWorkBook(http.argument, page, rows, sort ));
		return http.writer;
	}

	//실적보고 수리내역 저장
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/set/popupMans.do"  )
	public String setPopupMans(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPopupMans(http.argument));
		return http.writer;
		}

	//실적보고 수리내역 불러오기
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/workBookMans.do"  )
	public String getWorkBookMans(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWorkBookMans(http.argument, page, rows, sort ));
		System.out.println(model);
		return http.writer;
	}
	//실적보고 자재사용내역 저장
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/set/popupMtrl.do")
	public String setPopupMtrl(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPopupMtrl(http.argument));
		return http.writer;
	}

	//실적보고 수리자재 사용내역 불러오기
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/workBookMtrl.do"  )
	public String getWorkBookMtrl(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWorkBookMtrl(http.argument, page, rows, sort ));
		return http.writer;
	}



	//워크북 에디터 데이터 저장
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/set/popupreport.do")
	public String setPopupReport(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setPopupReport(http.argument));
		return http.writer;
	}

	/**
	 * 상품검색
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/product.do")
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}


	//이미지 업로드
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/set/fileUpload.do")
	public String setFileupload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFileupload(http.argument, uploadItem));
		return http.writer;
		}

	//워크북 인보이스 생성
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/workBookInvcNumb.do")
	public String getWorkBookInvcNumb(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getWorkBookInvcNumb(http.argument));
		return http.writer;
	}

	//부품대기
	@RequestMapping(value="/custom/aone/prod/order/sorderworkentry/get/waitPats.do")
	public String setWaitPats(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWaitPats(http.argument));
		return http.writer;
	}

}
