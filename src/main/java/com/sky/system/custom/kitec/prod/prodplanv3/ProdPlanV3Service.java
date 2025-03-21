package com.sky.system.custom.kitec.prod.prodplanv3;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service("kitec.ProdPlanV3Service")
public class ProdPlanV3Service extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.bzpl_idcd            , a.plan_yymm            , a.item_idcd            , i.item_name			")
			.query("        , a.plan_degr            , a.lyer_avrg_pdsd_qntt  , a.avrg_pdsd_qntt_6mns  , a.avrg_pdsd_qntt_3mns	")
			.query("        , a.bmon_avrg_pdsd_qntt  , a.bmon_pdsd_qntt       , a.cumn_pdsd_qntt       , a.slsd_3mnb			")
			.query("        , a.pdsd_3mnb            , a.optm_stok_3mnb       , a.emon_stok_3mnb       , a.slsd_2mnb			")
			.query("        , a.pdsd_2mnb            , a.optm_stok_2mnb       , a.emon_stok_2mnb       , a.slsd_1mnb			")
			.query("        , a.pdsd_1mnb            , a.optm_stok_1mnb       , a.emon_stok_1mnb								")
			.query("        , a.user_memo            , a.sysm_memo            , a.prnt_idcd            , a.line_levl			")
			.query("        , a.line_ordr            , a.line_stat            , a.line_clos            , a.find_name			")
			.query("        , a.updt_user_name       , a.updt_ipad            , a.updt_dttm            , a.updt_idcd			")
			.query("        , a.updt_urif            , a.crte_user_name       , a.crte_ipad            , a.crte_dttm			")
			.query("        , a.crte_idcd            , a.crte_urif																")
		;
		data.param
			.where("from prod_plan_mon a																						")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd													")
			.where("where   1=1																									")
			.where("and     i.find_name like %:find_name%	" , arg.getParamText("find_name"))
			.where("and     a.plan_yymm   = :plan_yymm		"	, arg.getParameter("plan_yymm"))
			.where("and     a.plan_degr   = :plan_degr		"	, arg.getParameter("plan_degr"))
			.where("and     a.line_stat   = :line_stat		" , arg.getParamText("line_stat"  ))
			.where("and     a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
