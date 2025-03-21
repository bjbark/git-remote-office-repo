package com.sky.system.prod.basic.prodlinemast;

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
public class ProdLineMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select   a.wkfw_idcd           , a.wkfw_code       , a.wkfw_name        , a.remk_text		")
		.query("		,a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
		.query("		,a.line_levl           , a.line_ordr       , a.line_stat        ,a.line_clos		")
		.query("		, a.find_name          , a.updt_user_name  , a.updt_ipad							")
		.query("		,a.updt_dttm           , a.updt_idcd       , a.updt_urif        ,a.crte_user_name	")
		.query("		,a.crte_ipad           , a.crte_dttm       , a.crte_idcd        ,a.crte_urif		")
		;
	data.param //퀴리문
		.where("from	wkfw_clss a																			")
		.where("where		1=1																				")
		.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
		.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		.where("order by	a.wkfw_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select   a.wkfw_idcd           , a.wkfw_code       , a.wkfw_name        , a.remk_text		")
		.query("		,a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
		.query("		,a.line_levl           , a.line_ordr       , a.line_stat        ,a.line_clos		")
		.query("		,a.find_name           , a.updt_user_name  , a.updt_ipad							")
		.query("		,a.updt_dttm           , a.updt_idcd       , a.updt_urif        ,a.crte_user_name	")
		.query("		,a.crte_ipad           , a.crte_dttm       , a.crte_idcd        ,a.crte_urif		")
		;
	data.param //퀴리문
		.where("from	wkfw_clss a																			")
		.where("where		1=1																				")
		.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
		.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		.where("order by	a.wkfw_idcd"																	)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wkfw_clss")
					.where("where wkfw_idcd  = :wkfw_idcd")

					.unique("wkfw_idcd"			, row.fixParameter("wkfw_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("wkfw_clss")
					.where("where wkfw_idcd	= :wkfw_idcd" )

					.unique("wkfw_idcd"				, row.fixParameter("wkfw_idcd"))
					.update("wkfw_code"				, row.getParameter("wkfw_code"))
					.update("wkfw_name"				, row.getParameter("wkfw_name"))
					.update("remk_text"				, row.getParameter("remk_text"))

					.update("find_name"				, row.getParameter("wkfw_code")
													+""
													+ row.getParameter("wkfw_name")
													+ row.fixParameter("wkfw_idcd"))
					.update("line_stat"				, row.getParameter("line_stat"))
					.update("user_memo"				, row.getParameter("user_memo"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
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
