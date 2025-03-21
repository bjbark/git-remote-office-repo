package com.sky.system.basic.unitmast;

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
public class UnitMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.unit_idcd,			a.unit_name,		a.widh_yorn,		a.leng_yorn			")
			.query("		,a.tick_yorn,			a.actv_unit_yorn,	a.evlt_unit_yorn,	a.dcml_calc_mthd	")
			.query("		,a.remk_text,			a.user_memo,		a.sysm_memo,		a.prnt_idcd			")
			.query("		,a.line_levl,			a.line_ordr,		a.line_stat,		a.line_clos			")
			.query("		,a.find_name,			a.updt_user_name,	a.updt_ipad,		a.updt_dttm			")
			.query("		,a.updt_idcd,			a.updt_urif,		a.crte_user_name,	a.crte_ipad			")
			.query("		,a.crte_dttm,			a.crte_idcd,		a.crte_urif,		a.hqof_idcd			")
			.query("		,a.unit_code																		")
			;
		data.param //퀴리문
			.where("from		unit_mast a																		")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by 	a.unit_code																		")
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
			.query("select   a.unit_idcd,			a.unit_name,			a.widh_yorn,		a.leng_yorn"	)
			.query("		,a.tick_yorn,			a.actv_unit_yorn,		a.evlt_unit_yorn,	a.dcml_calc_mthd")
			.query("		,a.remk_text,			a.user_memo,			a.sysm_memo,		a.prnt_idcd"	)
			.query("		,a.line_levl,			a.line_ordr,			a.line_stat,		a.line_clos"	)
			.query("		,a.find_name,			a.updt_user_name,		a.updt_ipad,		a.updt_dttm"	)
			.query("		,a.updt_idcd,			a.updt_urif,			a.crte_user_name,	a.crte_ipad"	)
			.query("		,a.crte_dttm,			a.crte_idcd,			a.crte_urif,		a.hqof_idcd"	)
			.query("		,a.unit_code"																		)
			;
		data.param //퀴리문
			.where("from		unit_mast a"																		)
			.where("where		1=1"																				)
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and			a.line_stat	< 2"																	)
			.where("order by	a.unit_code"																		)
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
					.table("unit_mast")
					.where("where unit_code  = :unit_code")

					.unique("unit_code"			, row.fixParameter("unit_code"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("unit_mast")
					.where("where unit_code	= :unit_code" )

					.unique("unit_code"			, row.fixParameter("unit_code"))


					.update("find_name"			, row.getParameter("unit_name")
												+ "	"
												+ row.fixParameter("unit_code"))

					.update("line_stat"			, row.getParameter("line_stat"))
					.update("unit_idcd"			, row.getParameter("unit_idcd"))
					.update("unit_name"			, row.getParameter("unit_name"))
					.update("widh_yorn"			, row.getParameter("widh_yorn"))
					.update("leng_yorn"			, row.getParameter("leng_yorn"))
					.update("tick_yorn"			, row.getParameter("tick_yorn"))
					.update("evlt_unit_yorn"	, row.getParameter("evlt_unit_yorn"))
					.update("dcml_calc_mthd"	, row.getParameter("dcml_calc_mthd"))
					.update("user_memo"			, row.getParameter("user_memo"))

					.insert("line_levl"			, row.getParameter("line_levl"))
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
