package com.sky.system.item;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class ItemNoticeService extends DefaultServiceHandler{

	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows,String sort ) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select a.hq_id      ")
			.query("   ,   a.itm_notice_id   , a.itm_notice_cd    , a.itm_notice_nm , a.itm_notice_text ")
			.query("   ,   a.user_memo   , a.row_sts  ")
		;
		data.param // 쿼리문  입력  
			.where("from   itm_notice a")
			.where("where  a.hq_id       = :hq_id  " , arg.fixParameter("hq_id"  ))
			.where("and    a.itm_notice_nm like %:itm_notice_nm% " , arg.getParameter("itm_notice_nm" ))			
			.where("and    a.row_sts < 2" )
			.where("order by a.itm_notice_cd " )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	
	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");  
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			data.param
				.table("itm_notice")
				.where("where itm_notice_id = :itm_notice_id " )

				.unique("hq_id"           , row.fixParameter("hq_id"       ))
				.unique("itm_notice_id"          , row.fixParameter("itm_notice_id"      ))
				
				.update("itm_notice_cd"          , row.fixParameter("itm_notice_cd"      ))
				.update("itm_notice_nm"          , row.getParameter("itm_notice_nm"      ))
				.update("itm_notice_text"          , row.getParameter("itm_notice_text"      ))
				.update("user_memo"          , row.getParameter("user_memo"      ))
				.update("row_sts"          , row.getParameter("row_sts"      ))
				
				.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
				.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
				.action = rowaction ; 
			;data.attach();
		}
		data.execute();
		return null ; 
	}
	
	/**
	 * 팝업 조회
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDialog(HttpRequestArgument arg, int page, int rows ) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문 입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력  
			.query("select a.hq_id       ")
			.query("   ,   a.itm_notice_id     ,  a.itm_notice_cd    , a.itm_notice_nm , a.itm_notice_text ")
		;
		data.param // 조건문 입력  
			.where("from   itm_notice a")
			.where("where  a.hq_id       = :hq_id  " , arg.fixParameter("hq_id"  ))
			.where("and    a.itm_notice_nm like %:itm_notice_nm% " , arg.getParameter("itm_notice_nm" ))			
			.where("and    a.row_sts  = :row_sts     ", arg.getParamText("row_sts"), ( "0".equals(arg.getParamText("row_sts"))))
			.where("and    a.row_sts <= :row_sts     ", arg.getParamText("row_sts"), (!"0".equals(arg.getParamText("row_sts"))))
			.where("order by    a.itm_notice_nm  " )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}
}

