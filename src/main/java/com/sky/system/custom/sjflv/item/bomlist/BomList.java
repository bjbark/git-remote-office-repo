 package com.sky.system.custom.sjflv.item.bomlist;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.TreeHash;
import com.sky.utils.file.UploadItem;
@Service("sjflv.BomList")
@Controller
public class BomList  extends DefaultControlHandler{

	@Autowired
	private BomListService service;

	@RequestMapping(value="/custom/sjflv/item/bomlist/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/search2.do"  )
	public String getSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/search3.do"  )
	public String getSearch(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getSearch3(http.argument);
		TreeHash tree = new TreeHash(arg.getParamText("prnt_item_idcd"));
		Boolean chk = true;
		for(SqlResultRow row:map){
			if(!row.getParamText("ivst_item_idcd").equals(row.getParamText("prnt_item_idcd"))){
				chk = false;
			}
			TreeHash item = new TreeHash(row.getParamText("ivst_item_idcd"));
			item.parent   = row.getParamText("prnt_item_idcd");
			item.leaf     = row.getParamText("has_chld").equals("0") ;
			item.expanded = true;
			item.resource = row;
			tree.add(item);
		}
		tree.clean();

		System.out.println("tree " + tree.records);
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/cstmSearch1.do"  )
	public String getCstmSearch1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstmSearch1(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/cstmSearch2.do"  )
	public String getCstmSearch2(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstmSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/cstmSearch3.do"  )
	public String getCstmSearch3(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstmSearch3(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/cstmSearch4.do"  )
	public String getCstmSearch4(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCstmSearch4(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/mtrlSearch1.do"  )
	public String getMtrlSearch1(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrlSearch1(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/mtrlSearch2.do"  )
	public String getMtrlSearch2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMtrlSearch2(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/sjflv/item/bomlist/get/specSearch.do"  )
	public String getSpecSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSpecSearch(http.argument, page, rows, sort ));
		return http.writer;
	}
}
