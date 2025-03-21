package com.sky.system.custom.incopack.cost.stndcostwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

@Service
public class StndCostWorkService extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	/**
	 * 조회
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																 							")
		;
		data.param //퀴리문
			.where("from(																								")
			.where("select a.line_seqn , a.mtrl_idcd , a.mtrl_item_name , a.mtrl_spec      , a.item_tick  , a.need_qntt	")
			.where("     , a.prnt_idcd , a.line_levl , a.line_stat      , a.user_memo      , a.item_leng  , a.item_widh	")
			.where("     , a.item_spgr , a.prnt_ccnt , a.stnd_pric      , a.cost_adpt_dvcd , a.find_name				")
			.where("     , a.cost_larg_bacd          , a.cost_midl_bacd , a.cost_type_bacd								")
			.where("     , r1.base_name  as cost_type_name																")
			.where("     , r2.base_name  as cost_larg_name																")
			.where("     , r3.base_name  as cost_midl_name																")
			.where("from   stnd_cost_inkop a																			")
			.where("       left outer join base_mast r1 on a.cost_type_bacd = r1.base_code and r1.prnt_idcd = '6505'	")
			.where("       left outer join base_mast r2 on a.cost_larg_bacd = r2.base_code and r2.prnt_idcd = '6501'	")
			.where("       left outer join base_mast r3 on a.cost_midl_bacd = r3.base_code and r3.prnt_idcd = '6502'	")
			.where("where  1=1																							")
			.where("and    a.find_name	like  %:find_name%		" , arg.getParamText("find_nm"))
			.where("and    a.cost_type_bacd  = :cost_type_bacd	" , arg.fixParameter("cost_type_bacd"))
			.where("and    a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.line_seqn																				")
			.where(")a																									")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 저장
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("stnd_cost_inkop")
					.where("where line_seqn  = :line_seqn")
					.where("and cost_type_bacd  = :cost_type_bacd")

					.unique("cost_type_bacd"	, row.fixParameter("cost_type_bacd"	))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.update);

			} else {
				data.param
					.table("stnd_cost_inkop")
					.where("where line_seqn		= :line_seqn" )
					.where("and cost_type_bacd	= :cost_type_bacd" )

					.unique("cost_type_bacd"	, row.fixParameter("cost_type_bacd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("mtrl_idcd"			, row.getParameter("mtrl_idcd"))
					.update("mtrl_spec"			, row.getParameter("mtrl_spec"))
					.update("item_tick"			, row.getParameter("item_tick"))
					.update("need_qntt"			, row.getParameter("need_qntt"))
					.update("item_leng"			, row.getParameter("item_leng"))
					.update("item_spgr"			, row.getParameter("item_spgr"))
					.update("item_widh"			, row.getParameter("item_widh"))
					.update("prnt_ccnt"			, row.getParameter("prnt_ccnt"))
					.update("stnd_pric"			, row.getParameter("stnd_pric"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("cost_larg_bacd"	, row.getParameter("cost_larg_bacd"))
					.update("cost_smll_bacd"	, row.getParameter("cost_smll_bacd"))
					.update("mtrl_item_name"	, row.getParameter("mtrl_item_name"))
					.update("cost_adpt_dvcd"	, row.getParameter("cost_adpt_dvcd"))
					.update("find_name"			, row.getParamText("cost_type_bacd").trim()
												+ row.getParamText("cost_larg_bacd").trim()
												+ row.getParamText("cost_smll_bacd").trim()
												+ row.getParamText("mtrl_item_name").trim()
												+ row.getParamText("mtrl_idcd").trim() )
					.update("user_memo"			, row.getParameter("user_memo"))
					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
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

	/*
	 * 순번
	 */
	public SqlResultMap getWork(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select ifnull(max(line_seqn),0) as max													")
		;
		data.param
			.where("from		stnd_cost_inkop a  															")
			.where("where		1=1																			")
			.where("and			a.cost_type_bacd = :cost_type_bacd"		 , arg.getParameter("cost_type_bacd"))
		;
		return data.selectForMap();
	}

}
