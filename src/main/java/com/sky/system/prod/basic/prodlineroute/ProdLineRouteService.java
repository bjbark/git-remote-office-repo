package com.sky.system.prod.basic.prodlineroute;

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
import com.sky.listener.ParamToJson;


@Service
public class ProdLineRouteService extends DefaultServiceHandler{

	// 조회 hLister1
	public SqlResultMap getSearchLister(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select   a.wkfw_idcd           , a.wkfw_code       , a.wkfw_name        ,a.remk_text		")
		.query("		,a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
		.query("		,a.line_levl           , a.line_ordr       , a.line_stat        ,a.line_clos		")
		.query("		,a.find_name           , a.updt_user_name  , a.updt_ipad							")
		.query("		,a.updt_dttm           , a.updt_idcd       , a.updt_urif        ,a.crte_user_name	")
		.query("		,a.crte_ipad           , a.crte_dttm       , a.crte_idcd        ,a.crte_urif		")
		;
	data.param //퀴리문
		.where("from		wkfw_clss a																		")
		.where("where		1=1																				")
		.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
		.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		.where("order by	a.wkfw_idcd"																	 )
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// 조회 Lister2
	public SqlResultMap getSearchLister2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select   a.wkfw_idcd           , a.line_seqn       , a.wkct_idcd							")
		.query("		,a.wkct_insp_yorn      , a.last_wkct_yorn  , a.aftr_wkct_ordr						")
		.query("		,a.mtrl_cost_rate      , a.labo_cost_rate  , a.expn_rate							")
		.query("		,a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
		.query("		,a.line_levl           , a.line_ordr       , a.line_stat        ,a.line_clos		")
		.query("		,a.find_name           , a.updt_user_name  , a.updt_ipad							")
		.query("		,a.updt_dttm           , a.updt_idcd       , a.updt_urif        ,a.crte_user_name	")
		.query("		,a.crte_ipad           , a.crte_dttm       , a.crte_idcd        ,a.crte_urif		")
		.query("		,b.wkfw_code           , b.wkfw_name       , b.remk_text							")
		.query("		,c.wkct_code           , c.wkct_name       , c.wkct_stnm							")
		.query("		,c.dept_idcd           , a.work_item_idcd  , i.item_name as work_item_name			")
		.query("		,i.item_code as work_item_code														")
		.query("		, cast(replace(json_extract(a.json_data, '$.temp_valu'),'\"','') as char) as temp_valu	")
		.query("		, cast(replace(json_extract(a.json_data, '$.rpm_valu'),'\"','') as char) as rpm_valu	")
		.query("		, cast(replace(json_extract(a.json_data, '$.temp_appr'),'\"','') as char) as temp_appr	")
		.query("		, cast(replace(json_extract(a.json_data, '$.rpm_appr'),'\"','') as char) as rpm_appr	")
		;
	data.param //퀴리문
		.where("from		wkfw_rout a																		")
		.where("left outer join item_mast i on a.work_item_idcd = i.item_idcd								")
		.where("           ,wkfw_clss b	,wkct_mast c														")
		.where("where		1=1			and 	a.wkfw_idcd = b.wkfw_idcd									")
		.where("and			a.wkct_idcd	= c.wkct_idcd														")
		.where("and			b.wkfw_idcd	= :wkfw_idcd	" , arg.getParameter("wkfw_idcd"					))
		.where("and			b.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		.where("order by	a.wkfw_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// 조회 Lister3
	public SqlResultMap getSearchLister3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select    a.wkfw_idcd           , a.line_seqn       , a.wkct_idcd							")
		.query("		, a.wkct_insp_yorn      , a.last_wkct_yorn  , a.aftr_wkct_ordr						")
		.query("		, a.mtrl_cost_rate      , a.labo_cost_rate  , a.expn_rate							")
		.query("		, a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
		.query("		, a.line_levl           , a.line_ordr       , a.line_stat        , a.line_clos		")
		.query("		, a.find_name           , a.updt_user_name  , a.updt_ipad							")
		.query("		, a.updt_dttm           , a.updt_idcd       , a.updt_urif        , a.crte_user_name	")
		.query("		, a.crte_ipad           , a.crte_dttm       , a.crte_idcd        , a.crte_urif		")
		.query("		, b.wkfw_code           , b.wkfw_name       , b.remk_text							")
		.query("		, c.wkct_code           , c.wkct_name       , c.wkct_stnm							")
		.query("		, c.dept_idcd           , a.work_item_idcd  , i.item_name as work_item_name			")
		.query("		, i.item_code as work_item_code														")
		.query("		, cast(replace(json_extract(a.json_data, '$.temp_valu'),'\"','') as char) as temp_valu	")
		.query("		, cast(replace(json_extract(a.json_data, '$.rpm_valu'),'\"','') as char) as rpm_valu	")
		.query("		, cast(replace(json_extract(a.json_data, '$.temp_appr'),'\"','') as char) as temp_appr	")
		.query("		, cast(replace(json_extract(a.json_data, '$.rpm_appr'),'\"','') as char) as rpm_appr	")
		;
	data.param //퀴리문
		.where("from		wkfw_rout a																		")
		.where("left outer join item_mast i on a.work_item_idcd = i.item_idcd								")
		.where("			,wkfw_clss b	,wkct_mast c													")
		.where("where		1=1			and 	a.wkfw_idcd = b.wkfw_idcd									")
		.where("and			a.wkct_idcd	= c.wkct_idcd														")
		.where("and			b.wkfw_idcd	= :wkfw_idcd	" , arg.getParameter("wkfw_idcd"					))
		.where("and			b.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		.where("order by	a.wkfw_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// 조회 Lister4
		public SqlResultMap getSearchLister4(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
			.query("select	a.wkct_idcd				, a.wkct_code				, a.wkct_name					")
			.query("		,a.wkct_stnm			, a.bzpl_idcd				, a.dept_idcd					")
			.query("		,a.user_memo			, a.sysm_memo				, a.prnt_idcd					")
			.query("		,a.line_levl			, a.line_ordr				, a.line_stat					")
			.query("		,a.find_name			, a.updt_user_name			, a.updt_ipad					")
			.query("		,a.updt_dttm			, a.updt_idcd				, a.updt_urif					")
			.query("		,a.crte_ipad			, a.crte_dttm				, a.crte_idcd					")
			.query("		,a.crte_user_name		, a.line_clos				, a.crte_urif					")
			;
		data.param //퀴리문
			.where("from		wkct_mast a																		")
			.where("where		1=1																				")
			.where("and			a.wkct_idcd not in (select b.wkct_idcd from wkfw_rout b, wkct_mast c where c.wkct_idcd = b.wkct_idcd and b.wkfw_idcd = :wkfw_idcd)", arg.getParameter("wkfw_idcd"))
			.where("and			line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.wkct_code"																	)
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

		String a = arg.getParamText("line_stat");
		System.out.println(a);

		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select    a.wkfw_idcd     , a.wkfw_name       , a.wkfw_code							")
		.query("		, a.user_memo     , a.sysm_memo       , a.prnt_idcd    , a.remk_text		")
		.query("		, a.line_levl     , a.line_ordr       , a.line_stat    , a.line_clos		")
		.query("		, a.find_name     , a.updt_user_name  , a.updt_ipad							")
		.query("		, a.updt_dttm     , a.updt_idcd       , a.updt_urif    , a.crte_user_name	")
		.query("		, a.crte_ipad     , a.crte_dttm       , a.crte_idcd    , a.crte_urif		")
		;
	data.param //퀴리문
		.where("from	wkfw_clss a																			")
		.where("where		1=1																				")
		.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
		.where("and			a.line_stat   = :line_stat    " , arg.getParamText("line_stat" ))
		.where("order by	a.wkfw_code"																	)
		;
		return data.selectForMap(page, rows, (page == 1));
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("wkfw_rout")
					.where("where wkfw_idcd  = :wkfw_idcd")
					.where("and   line_seqn = :line_seqn")

					.unique("wkfw_idcd"			, row.fixParameter("wkfw_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					;data.attach(Action.delete);

			} else {
				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "wkfw_rout_json_fields");

				data.param
					.table("wkfw_rout")
					.where("where wkfw_idcd	= :wkfw_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("wkfw_idcd"				, row.fixParameter("wkfw_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("find_name"				, row.getParameter("wkct_name")
													+ " "
													+ row.fixParameter("wkct_code"))
					.update("line_stat"				, row.getParameter("line_stat"))
					.update("wkct_idcd"				, row.getParameter("wkct_idcd"))
					.update("wkct_insp_yorn"		, row.getParameter("wkct_insp_yorn"))
					.update("last_wkct_yorn"		, row.getParameter("last_wkct_yorn"))
					.update("aftr_wkct_ordr"		, row.getParameter("aftr_wkct_ordr"))
					.update("mtrl_cost_rate"		, row.getParameter("mtrl_cost_rate"))
					.update("labo_cost_rate"		, row.getParameter("labo_cost_rate"))
					.update("work_item_idcd"		, row.getParameter("work_item_idcd"))
					.update("expn_rate"				, row.getParameter("expn_rate"))
					.update("json_data"				, json_data			)
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
