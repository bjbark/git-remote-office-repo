package com.sky.system.custom.hantop.item.itemmodel;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Controller
public class ItemModel extends DefaultControlHandler{

	@Autowired
	private ItemModelService service;
	// 조회
	@RequestMapping(value="/custom/hantop/item/itemmodel/get/search.do"  )
	public String getSearch( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="/custom/hantop/item/itemmodel/get/brand.do"  )
	public String getBrand( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBrand(http.argument, page, rows, sort));
		return http.writer;
	}

	// 창호그룹조회
	@RequestMapping(value="/custom/hantop/item/itemmodel/get/wdgrsearch.do"  )
	public String getWdgr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getWdgr(http.argument, page, rows, sort));
		return http.writer;
	}
	//
	@RequestMapping(value="/custom/hantop/item/itemmodel/get/wind_item.do"  )
	public String getWind_Item( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getWind_Item(http.argument, page, rows, sort));
		return http.writer;
	}
	//
	@RequestMapping(value="/custom/hantop/item/itemmodel/get/modl_code_chek.do"  )
	public String getModl_Code_Chek( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getModl_Code_Chek(http.argument, page, rows, sort));
		return http.writer;
	}
	// 저장
	@RequestMapping(value="/custom/hantop/item/itemmodel/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// 조회
	@RequestMapping(value="/custom/hantop/item/itemmodel/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}


		@RequestMapping(value="/custom/hantop/item/itemmodel/set/item.do"  )
		public String setItem(HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setItem(http.argument));
			return http.writer;
		}

}
