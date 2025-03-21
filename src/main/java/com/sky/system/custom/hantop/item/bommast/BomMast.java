package com.sky.system.custom.hantop.item.bommast;

import java.util.LinkedHashMap;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.TreeHash;
import com.sky.utils.file.UploadItem;

@Controller
public class BomMast extends DefaultControlHandler{

	@Autowired
	private BomMastService service;
	// 조회
	@RequestMapping(value="/custom/hantop/item/bommast/get/brand.do"  )
	public String getBrand( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBrand(http.argument, page, rows, sort));
		return http.writer;
	}

	// 룩업
	@RequestMapping(value="/custom/hantop/item/bommast/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort));
		return http.writer;
	}

	// 창호그룹조회
	@RequestMapping(value="/custom/hantop/item/bommast/get/wdgrsearch.do"  )
	public String getWdgr( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getWdgr(http.argument, page, rows, sort));
		return http.writer;
	}

	// 창호형태조회
	@RequestMapping(value="/custom/hantop/item/bommast/get/wdtysearch.do"  )
	public String getWdty( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getWdty(http.argument, page, rows, sort));
		return http.writer;
	}

	// 이미지 조회
	@RequestMapping(value="/custom/hantop/item/bommast/get/image.do"  )
	public String getImage( HttpMessage http, Map<String, Object> model, String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}

	// BOM조회
	@RequestMapping(value="/custom/hantop/item/bommast/get/search.do"  )
	public String getSearch(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getSearch(http.argument);
		TreeHash tree = new TreeHash(arg.getParamText("wndw_modl_idcd"));
		for(SqlResultRow row:map){
			TreeHash item = new TreeHash(row.getParamText("item"));
			item.parent   = row.getParamText("prnt" );
			item.leaf     = row.getParamText("has_chld").equals("0");
			item.expanded = true;
			item.resource = row;
			tree.add(item);
		}
		tree.clean(); // tree 종료

		System.out.println("tree " + tree.records);
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;
	}

	// type조회
	@RequestMapping(value="/custom/hantop/item/bommast/get/getType.do"  )
	public String getType( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getType(http.argument, page, rows, sort));
		return http.writer;
	}

	// 마지막순번조회
	@RequestMapping(value="/custom/hantop/item/bommast/get/seq.do"  )
	public String getSeq(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSeq(http.argument));
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/custom/hantop/item/bommast/set/record.do")
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}

	// bom 작성
	@RequestMapping(value="/custom/hantop/item/bommast/set/write.do")
	public String setWrite(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWrite(http.argument));
		return http.writer;
	}


}
