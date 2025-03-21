package com.sky.system.prod.basic.bopmast;

import java.util.LinkedHashMap;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.TreeHash;
@Controller
public class BopWork extends DefaultControlHandler{

	@Autowired
	private BopWorkService service;
	// 조회
	@RequestMapping(value="/prod/basic/bopwork/get/search.do"  )
	public String getSearch(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		HttpRequestArgument arg = http.argument;
		SqlResultMap map = service.getSearch(http.argument);
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
		return http.writer;
	}
	@RequestMapping(value="/prod/basic/bopwork/set/setTree.do"  )
	public String setTree(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setTree(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/basic/bopwork/set/setBop.do"  )
	public String setBop(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setBop(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/basic/bopwork/set/setBopWork.do"  )
	public String setBopWork(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.setBopWork(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/basic/bopwork/get/getcstm.do"  )
	public String getCstm(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstm(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/prod/basic/bopwork/get/getdeli_date.do"  )
	public String getDeli_date(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDeli_date(http.argument));
		return http.writer;
	}
	@RequestMapping(value="prod/basic/bopwork/get/getlookup.do"  )
	public String getLookup( HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument));
		return http.writer;
	}
}
