package com.sky.system.design.dsigfile;

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
public class DsigFile extends DefaultControlHandler{

	@Autowired
	private DsigFileService service;
	// 조회
	@RequestMapping(value="/design/dsigfile/get/search.do"  )
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
		System.out.println("tree " + tree.records);
		return http.writer;
	}

	@RequestMapping(value="design/dsigfile/get/getcstm.do"  )
	public String getcstm(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getCstm(http.argument));
		return http.writer;
	}
	@RequestMapping(value="design/dsigfile/get/getseqn.do"  )
	public String getSeqn(HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSeqn(http.argument));
		return http.writer;
	}

}
