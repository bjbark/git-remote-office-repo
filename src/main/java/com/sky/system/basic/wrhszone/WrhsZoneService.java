package com.sky.system.basic.wrhszone;

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
public class WrhsZoneService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																				")
			.query("           a.zone_idcd      , a.wrhs_idcd       , a.zone_name       , a.zone_rack	")
			.query("         , a.zone_flor      , a.zone_colm       , w.wrhs_name						")
			.query("         , a.user_memo      , a.sysm_memo       , a.prnt_idcd						")
			.query("         , a.line_levl      , a.line_ordr       , a.line_stat       , a.line_clos	")
			.query("         , a.find_name      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm	")
			.query("         , a.updt_idcd      , a.updt_urif       , a.crte_user_name  , a.crte_ipad	")
			.query("         , a.crte_dttm      , a.crte_idcd       , a.crte_urif						")
		;
		data.param //퀴리문
			.where("from	wrhs_zone a																	")
			.where("		left outer join wrhs_mast w on  a.wrhs_idcd = w.wrhs_idcd					")
			.where("where	1=1																			")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.wrhs_idcd	= :wrhs_idcd"		, arg.getParameter("wrhs_idcd"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	<= :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by wrhs_idcd,zone_rack asc, zone_flor asc, zone_colm asc						")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																				")
			.query("           a.zone_idcd      , a.wrhs_idcd       , a.zone_name       , a.zone_rack	")
			.query("         , a.zone_flor      , a.zone_colm       , w.wrhs_name						")
			.query("         , a.user_memo      , a.sysm_memo       , a.prnt_idcd						")
			.query("         , a.line_levl      , a.line_ordr       , a.line_stat       , a.line_clos	")
			.query("         , a.find_name      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm	")
			.query("         , a.updt_idcd      , a.updt_urif       , a.crte_user_name  , a.crte_ipad	")
			.query("         , a.crte_dttm      , a.crte_idcd       , a.crte_urif						")
		;
		data.param //퀴리문
			.where("from	wrhs_zone a																	")
			.where("		left outer join wrhs_mast w on  a.wrhs_idcd = w.wrhs_idcd					")
			.where("where	1=1																			")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.wrhs_idcd	= :wrhs_idcd"		, arg.getParameter("wrhs_idcd"))
			.where("and		a.line_stat	= :line_stat"		, "0" , "".equals(arg.getParamText("line_stat" )))
		;
		if(arg.getParamText("hq_id").toUpperCase().equals("N1000A-ONE")){
			data.param
				.where("and a.line_clos < 1																")
			;
		}
		data.param
			.where("order by wrhs_idcd,zone_rack asc, zone_flor asc, zone_colm asc						")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wrhs_zone")
					.where("where zone_idcd  = :zone_idcd")

					.unique("zone_idcd"			, row.fixParameter("zone_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("wrhs_zone")
					.where("where zone_idcd	= :zone_idcd" )

					.unique("zone_idcd"			, row.fixParameter("zone_idcd"))

					.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"))
					.update("zone_name"			, row.getParameter("zone_name"))
					.update("zone_rack"			, row.getParameter("zone_rack"))
					.update("zone_flor"			, row.getParameter("zone_flor"))
					.update("zone_colm"			, row.getParameter("zone_colm"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("zone_idcd")
												+ "	"
												+ row.fixParameter("zone_name"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
