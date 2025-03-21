package com.sky.system.sale;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;


	@Controller
	public class ArWork extends DefaultControlHandler{

		
		@Autowired
		private ArWorkService service;

		// 수금현황
		@RequestMapping(value="/sale/arwork/get/search.do"  )
		public String getSearch( HttpMessage http, Map<String, Object> model, 
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
			return http.writer;
		}		

		
		// 상세 조회 
		@RequestMapping(value="/sale/arwork/get/detail.do"  )
		public String getDetail( HttpMessage http, Map<String, Object> model) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
			return http.writer;
		}		
		

		// 회원정보 조회 
		@RequestMapping(value="/sale/arwork/get/dialogmemb.do"  )
		public String getDialogMemb( HttpMessage http, Map<String, Object> model, 
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getDialogMemb(http.argument, page, rows, sort));
			return http.writer;
		}		
		
		
		
		// INV 조회
		@RequestMapping(value="/sale/arwork/get/invoice.do"  )
		public String getInvoice( HttpMessage http, Map<String, Object> model) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
			return http.writer;
		}		

		
		
		@RequestMapping(value="/sale/arwork/set/invoice.do"  )
		public String setInvoice( HttpMessage http, Map<String, Object> model) throws Exception {

			model.put(HttpResponseMessage.RECORDS, service.setInvoice(http.argument));
			return http.writer;
		}		
		
		/**
		 * 삭제
		 * 
		 * @param http
		 * @param response
		 * @throws Exception
		 */
		@RequestMapping(value="/sale/arwork/set/del_yn.do")
		public String setDeleted(HttpMessage http, Map<String, Object> model) throws Exception {
			
			model.put(HttpResponseMessage.RECORDS, service.setDeleted(http.argument));
			return http.writer;
		}
		
		// 수금예정리스트
		@RequestMapping(value="/sale/arwork/get/arlist.do"  )
		public String getArList( HttpMessage http, Map<String, Object> model, 
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getArList(http.argument, page, rows, sort));
			return http.writer;
		}		
		
		
		// 수금예정리스트 - 미수현황 조회
		@RequestMapping(value="/sale/arwork/get/arlistsales.do"  )
		public String getArListSales( HttpMessage http, Map<String, Object> model, 
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getArListSales(http.argument, page, rows, sort));
			return http.writer;
		}		
		

		// 수금예정리스트 - 미수현황 매출 상세 조회
		@RequestMapping(value="/sale/arwork/get/arlistitems.do"  )
		public String getArListItems( HttpMessage http, Map<String, Object> model, 
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getArListItems(http.argument, page, rows, sort));
			return http.writer;
		}		
		

	}
