package com.sky.system.project.bonsamenu;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.TreeHash;


@Controller
public class BonsaMenu extends DefaultControlHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private BonsaMenuService service;

	// 조회
	@RequestMapping(value="/project/bonsamenu/get/search.do"  )
	public String getSearch(
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="200") int rows,
			@RequestParam(value="sort" , required=false, defaultValue=""  ) String sort ,
			HttpMessage http, Map<String, Object> model ) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort));
		return http.writer;
	}


	// 조회
	@RequestMapping(value="/project/bonsamenu/get/detail.do"  )
	public String getDetail( HttpMessage http, Map<String, Object> model ) throws Exception {

		SqlResultMap map = service.getDetail(http.argument);
		TreeHash tree = new TreeHash("14821");

		for(SqlResultRow row:map){
			if ("0".equals(row.getParamText("hidden_yn"))) {
				TreeHash item = new TreeHash((String)row.getParameter("menu_id" ));
				item.parent   = row.getParamText("prnt_id" );
				item.text     = row.getParamText("menu_nm"   );
				item.leaf     = row.getParamText("last_modl_yn" ).equals("1") ;
				item.expanded = true;
				item.resource = row;
				tree.add(item);
			}
		}
		tree.clean();
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;
	}

	// 저장
	@RequestMapping(value="/project/bonsamenu/set/detail.do"  )
	public String setDetail(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}

	// 싱크
	@RequestMapping(value="/project/bonsamenu/set/resync.do" )
	public String setResync(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setResync(http.argument));
		return http.writer;
	}




}
