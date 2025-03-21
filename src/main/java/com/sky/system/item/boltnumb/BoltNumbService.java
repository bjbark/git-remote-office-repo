package com.sky.system.item.boltnumb;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class BoltNumbService extends DefaultServiceHandler {


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select																							")
			.query("         a.btno_code       , cast(a.btno_name as int) as btno_name , otsd_dimt					")
			.query("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.find_name					")
			.query("       , a.line_levl       , a.line_ordr       , a.line_stat      , a.line_clos					")
			.query("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd   , a.updt_urif	")
			.query("       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm      , a.crte_idcd   , a.crte_urif	")
			;
		data.param //퀴리문
			.where("from	bolt_numb  a  																			")
			.where("where	1=1																						")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat") , !"".equals(arg.getParamText("line_stat" )))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by btno_name")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select																							")
			.query("         a.btno_code       , cast(a.btno_name as int) as btno_name , otsd_dimt					")
			.query("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.find_name					")
			.query("       , a.line_levl       , a.line_ordr       , a.line_stat      , a.line_clos					")
			.query("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd   , a.updt_urif	")
			.query("       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm      , a.crte_idcd   , a.crte_urif	")
			;
		data.param //퀴리문
			.where("from	bolt_numb  a  																			")
			.where("where	1=1																						")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat") , !"".equals(arg.getParamText("line_stat" )))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by btno_name")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//저장
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("bolt_numb")
					.where("where btno_code	= :btno_code")

					.unique("btno_code"			, row.fixParameter("btno_code"	))
					.update("line_stat"			, 2								)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);
			} else {
				data.param
					.table("bolt_numb")
					.where("where btno_code	= :btno_code")

					.unique("btno_code"				, row.fixParameter("btno_code"))

					.update("btno_name"				, row.getParameter("btno_name"))
					.update("otsd_dimt"				, row.getParameter("otsd_dimt"))
					.update("user_memo"				, row.getParameter("user_memo"))
					.update("find_name"				, row.getParameter("btno_code")
													+ "  "
													+ row.getParameter("btno_name"))
					.update("line_stat"				, row.getParameter("line_stat"		))
					.insert("line_levl"				, row.getParameter("line_levl"		))
					.update("updt_idcd"				, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}


}
