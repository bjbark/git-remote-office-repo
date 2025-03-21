package com.sky.system.user.menuauth;
 

import java.util.LinkedHashMap;
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
public class MenuAuth extends DefaultControlHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private MenuAuthService service;		

	// 조회 
	@RequestMapping(value="/user/menuauth/get/search.do"  ) 
	public String getSearch( HttpMessage http, LinkedHashMap<String, Object> model ) throws Exception {

		SqlResultMap map = service.getSearch(http.argument);
		TreeHash tree = new TreeHash(http.argument.fixParamText("pjt_id")); //
		for(SqlResultRow row:map){
			if ("0".equals(row.getParamText("hidden_yn"))) {
				TreeHash item = new TreeHash((String)row.getParameter("menu_id" ));
				item.parent   = (String)row.getParameter("prnt_id" );
				item.text     = (String)row.getParameter("menu_nm"   );
				item.leaf     =((String)row.getParameter("last_modl_yn" )).equals("1") ;
				item.expanded = true; // ((String)row.getParameter("tree_expn_yn" )).equals("1") ;
				item.resource = row;
				tree.add(item);
			}
		}
		tree.clean();
		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
		return http.writer;		
	}	
	
	
	// 조회 
	@RequestMapping(value="/user/menuauth/get/detail.do"  ) 
	public String getDetail(
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="200") int rows,	
		HttpMessage http, Map<String, Object> model) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getDetail(http.argument, page, rows));
		return http.writer;
	}
	
	// 저장
	@RequestMapping(value="/user/menuauth/set/detail.do"  )
	public String setDetail(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDetail(http.argument));
		return http.writer;
	}
	
//	@RequestMapping(value="/user/menuauth/get/detail.do"  ) 
//	public String getDetail( HttpMessage http, LinkedHashMap<String, Object> model ) throws Exception {
//
//		SqlResultMap map = service.getDetail(http.argument);
//		TreeHash tree = new TreeHash("0"); //http.argument.fixParamText("site_id")
//		for(SqlResultRow row:map){
//			if ("0".equals(row.getParamText("hidden_yn"))) {
//				TreeHash item = new TreeHash((String)row.getParameter("emp_id" ));
////				item.parent   = (String)row.getParameter("prnt_id" );
////				item.text     = (String)row.getParameter("menu_nm"   );
////				item.leaf     =((String)row.getParameter("last_modl_yn" )).equals("1") ;
//				item.expanded = true; // ((String)row.getParameter("tree_expn_yn" )).equals("1") ;
//				item.resource = row;
//				tree.add(item);
//			}
//		}
//		tree.clean();
//		model.put("records", (tree.records == null) ? new SqlResultMap() : tree.records );
//		return http.Writer;		
//		
//	}	

//	/**
//	 * 엑셀출력
//	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/user/menuauth/export/search.do") 
//	public String getExportSearch(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getSearch(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}


//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping(value="/user/menuauth/export/detail.do") 
//	public String getExportDetail(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
//		model.put(ExcelView.ROWS, service.getDetail(http.argument,0, 0) );
//		return ExcelView.VIEW_NAME;
//	}
	
	
}
