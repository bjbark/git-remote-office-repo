package com.sky.system.item.itempackzone;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class ItemPackZoneService extends DefaultServiceHandler{

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wrhs_idcd       , a.zone_idcd as zone_cd    , a.zone_name as zone_nm		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd							")
			.query("		, a.line_stat       , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("		, a.updt_ipad       , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("		, a.crte_user_name  , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
		;
		data.param //퀴리문
			.where("from	wrhs_zone a																			")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.wrhs_idcd"																	)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
}
