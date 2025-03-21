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
	public class ArList extends DefaultControlHandler{

		
		@Autowired
		private ArListService service;

		// 수금현황
		@RequestMapping(value="/sale/arlist/get/search.do"  )
		public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
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
		@RequestMapping(value="/sale/arlist/get/detail.do")
		public String getDetail(HttpMessage http, Map<String, Object> model) throws Exception {
			
			model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument));
			return http.writer;
		}

		// 수금예정리스트
		@RequestMapping(value="/sale/arlist/get/arlist.do"  )
		public String getArList( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,	
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getArList(http.argument, page, rows, sort));
			return http.writer;
		}
		

		// 수금예정리스트 - 미수현황 조회
		@RequestMapping(value="/sale/arlist/get/arlist/sales.do"  )
		public String getArListSales( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,	
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getArListSales(http.argument, page, rows, sort));
			return http.writer;
		}
		

		// 수금예정리스트 - 미수현황 매출 상세 조회
		@RequestMapping(value="/sale/arlist/get/arlist/items.do"  )
		public String getArListItems( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,	
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.getArListItems(http.argument, page, rows, sort));
			return http.writer;
		}		

		
		
		

	}
