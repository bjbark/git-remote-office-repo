package com.sky.system.project.projmenu;

import java.util.LinkedHashMap;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.TreeHash;

@Controller
public class ProjMenu extends DefaultControlHandler {

	Logger LOGGER = LoggerFactory.getLogger(ProjMenu.class);

	@Autowired
	private ProjMenuService service;

	// 조회
	@RequestMapping(value="/project/projmenu/get/search.do"  )
	public String getSearch(HttpMessage http, LinkedHashMap<String, Object> model) throws Exception {
		SqlResultMap map = service.getSearch(http.argument);
//		TreeHash tree = new TreeHash("0");
		TreeHash tree = new TreeHash("14821");
		for(SqlResultRow row:map){
			TreeHash item = new TreeHash(row.getParamText("menu_id" ));
			item.parent   = row.getParamText("prnt_id" );
			item.leaf     = row.getParamText("last_modl_yn" ).equals("1") ;
			item.expanded = true;
			item.resource = row;
			tree.add(item);
		}
		tree.clean();
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/project/projmenu/set/record.do"  )
	public String setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
}
