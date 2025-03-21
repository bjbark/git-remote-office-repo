package com.sky.system.prod.project.prjtprodplan2;

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
public class PrjtProdPlan2 extends DefaultControlHandler{

	@Autowired
	private PrjtProdPlan2Service service;
	// master
	@RequestMapping(value="prod/project/prjtprodplan2/get/search1.do"  )
	public String getSearch1(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getSearch1(http.argument);
//		TreeHash tree = new TreeHash("standard");
		TreeHash tree = new TreeHash(arg.getParamText("pjod_idcd"));
		for(SqlResultRow row:map){
			TreeHash item = new TreeHash(row.getParamText("item_idcd" ));
			item.parent   = row.getParamText("prnt_idcd" );
			item.leaf     = row.getParamText("has_chld").equals("0") ;
			item.expanded = true;
			item.resource = row;
			tree.add(item);
		}
		tree.clean();
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		System.out.println("tree " + tree.records);
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/search3.do"  )
	public String getSearch3( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch3(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/getOrdr_degr.do"  )
	public String getOrdr_degr( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getOrdr_degr(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/project_schd_copy.do"  )
	public String project_schd_copy( HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.project_schd_copy(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/getGrid.do"  )
	public String getGrid( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getGrid(http.argument, page, rows, sort));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/lookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/getcstm.do"  )
	public String getCstm(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstm(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/getPrint.do"  )
	public String getPrint(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getPrint(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/project/prjtprodplan2/set/search1.do"  )
	public String setSearch1(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setSearch1(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/project/prjtprodplan2/set/deleteBook.do"  )
	public String setDeleteBook(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setDeleteBook(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/project/prjtprodplan2/set/work.do"  )
	public String setWork(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWork(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/project/prjtprodplan2/set/work2.do"  )
	public String setWork2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setWork2(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/project/prjtprodplan2/get/getMaxDate.do"  )
	public String getMaxDate(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaxDate(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/set/setApprove.do"  )
	public String setApprove(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setApprove(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/getApprove.do"  )
	public String getApprove(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getApprove(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/project/prjtprodplan2/get/getImage.do"  )
	public String getImage(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}

	//TODO 이미지저장
	@RequestMapping(value="prod/project/prjtprodplan2/set/setImage.do"  )
	public String setImage(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setImage(http.argument, uploadItem));
		return http.writer;
	}
	@RequestMapping(value="/prod/project/prjtprodplan2/set/bomImage.do"  )
	public String setBomImage(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setBomImage(http.argument));
		return http.writer;
	}

	//TODO BOMPOPUP
	@RequestMapping(value="prod/project/prjtprodplan2/get/bom.do")
	public String getBom(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getBom(http.argument));
		return http.writer;
	}

}
