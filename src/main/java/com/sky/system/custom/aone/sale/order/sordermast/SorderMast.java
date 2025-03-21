package com.sky.system.custom.aone.sale.order.sordermast;

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
@Service("aone.SorderMast")
@Controller
public class SorderMast extends DefaultControlHandler{

	@Autowired
	private SorderMastService service;

	/**
	 * master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception
	 */

	//전체조회
	@RequestMapping(value="/custom/aone/sale/order/sordermast/get/search.do")
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/custom/aone/sale/order/sordermast/get/lookup.do")
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
			return http.writer;
	}
	@RequestMapping(value="/custom/aone/sale/order/sordermast/get/amendCode.do")
	public String getAmendCode( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getAmendCode(http.argument, page, rows, sort));
			return http.writer;
	}

	/**
	 * 등록 / 수정
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	// 마스터 아이템 입력
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	//이미지 업로드
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/fileUpload.do"  )
	public String setFileupload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFileupload(http.argument, uploadItem));
		return http.writer;
		}

	//차수(AMEND)증가
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/amend.do"  )
	public String setAmend(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAmend(http.argument ));
		return http.writer;
	}

	//수리비 산출
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/repairCalc.do"  )
	public String setRepairCalc(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRepairCalc(http.argument ));
		return http.writer;
	}


	//입고지시
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/isttStore.do"  )
	public String setIsttStore(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setIsttStore(http.argument ));
		return http.writer;
	}

	//출고지시
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/release.do"  )
	public String setRelease(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRelease(http.argument ));
		return http.writer;
	}

	//출고취소
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/releasecancel.do"  )
	public String setReleaseCancel(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setReleaseCancel(http.argument ));
		return http.writer;
	}

	/**
	 * 삭제
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */
	//전체삭제
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/del_yn.do")
	public String setDel_yn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDel_yn(http.argument));
		return http.writer;
	}

	/**
	 * 세부검색
	 *
	 * @param http
	 * @param response
	 * @throws Exception
	 */

	//이미지 조회
	@RequestMapping(value="/custom/aone/sale/order/sordermast/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}

	//Max Amend 구하기
	@RequestMapping(value="/custom/aone/sale/order/sordermast/get/orderInfo.do"  )
	public String getOrderInfo(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOrderInfo(http.argument));
		return http.writer;
	}

	//수리비 산출 불러오기
	@RequestMapping(value="/custom/aone/sale/order/sordermast/get/repairCalc.do"  )
	public String getRepairCalc(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRepairCalc(http.argument, page, rows, sort ));
		return http.writer;
	}
	//전체삭제
	@RequestMapping(value="/custom/aone/sale/order/sordermast/set/lineClos.do")
	public String setLineClos(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setLineClos(http.argument));
		return http.writer;
	}

}

