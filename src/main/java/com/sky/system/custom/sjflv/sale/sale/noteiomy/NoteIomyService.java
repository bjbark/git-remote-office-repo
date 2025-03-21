package com.sky.system.custom.sjflv.sale.sale.noteiomy;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service
public class NoteIomyService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  *																														")
		;
		data.param
			.where("from (																															")
			.where("    with cte as (																												")
			.where("        select a.iomy_dvcd, a.invc_numb, a.invc_date																			")
			.where("             , a.stot_bass, a.paym_bank_name, a.publ_date, a.expr_date, a.plan_amnt												")
			.where("             , b.iomy_date, b.iomy_amnt, b.remk_text																			")
			.where("             , c.cstm_code, c.cstm_name																							")
			.where("          from crdt_colt_mast a																									")
			.where("               left outer join note_iomy_mast b on b.iomy_dvcd = a.iomy_dvcd and b.invc_numb = a.invc_numb						")
			.where("               left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd															")
			.where("         where 1 = 1																											")
			.where("           and a.iomy_dvcd = '1'																								")
			.where("           and a.stot_dvcd = '4'																								")
			.where("           and a.invc_date  >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("           and a.invc_date  <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("           and a.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("           and a.stot_bass  like %:stot_bass%	" , arg.getParamText("stot_bass"))
			.where("           and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("    )																															")
			.where("    select 0 as row_type																										")
			.where("         , a.iomy_dvcd, a.invc_numb, a.invc_date 																				")
			.where("         , a.invc_date as sort_date																								")
			.where("         , a.stot_bass, a.paym_bank_name, a.publ_date, a.expr_date, a.plan_amnt 												")
			.where("         , a.iomy_date, a.iomy_amnt, a.remk_text 																				")
			.where("         , a.cstm_code, a.cstm_name 																							")
			.where("      from cte a																												")
		;
		// 일계
		if (arg.getParamText("row_type" ).contains("1")) {
			data.param
				.where("    union all																												")
				.where("    select 1 as row_type																									")
				.where("         , null as iomy_dvcd, null as invc_numb, null as invc_date															")
				.where("         , a.invc_date as sort_date																							")
				.where("         , null as stot_bass, null as paym_bank_name, null as publ_date, null as expr_date, sum(a.plan_amnt) as plan_amnt	")
				.where("         , null as iomy_date, sum(a.iomy_amnt) as iomy_amntm, null as remk_text												")
				.where("         , null as cstm_code, '일계' as cstm_name																				")
				.where("      from cte a																											")
				.where("     group by a.invc_date																									")
			;
		}
		// 월계
		if (arg.getParamText("row_type" ).contains("2")){
			data.param
				.where("    union all																												")
				.where("    select 2 as row_type																									")
				.where("         , null as iomy_dvcd, null as invc_numb, null as invc_date															")
				.where("         , concat(substr(a.invc_date, 1, 6), '99') as sort_date																")
				.where("         , null as stot_bass, null as paym_bank_name, null as publ_date, null as expr_date, sum(a.plan_amnt) as plan_amnt	")
				.where("         , null as iomy_date, sum(a.iomy_amnt) as iomy_amnt, null as remk_text												")
				.where("         , null as cstm_code, '월계' as cstm_name																				")
				.where("      from cte a")
				.where("     group by concat(substr(a.invc_date, 1, 6), '99')																		")
			;
		}
		if (arg.getParamText("row_type" ).contains("3")){
			data.param
				.where("    union all																												")
				.where("    select 3 as row_type																									")
				.where("         , null as iomy_dvcd, null as invc_numb, null as invc_date															")
				.where("         , '99999999' as sort_date																							")
				.where("         , null as stot_bass, null as paym_bank_name, null as publ_date, null as expr_date, sum(a.plan_amnt) as plan_amnt	")
				.where("         , null as iomy_date, sum(a.iomy_amnt) as iomy_amnt, null as remk_text												")
				.where("         , null as cstm_code, '합계' as cstm_name																				")
				.where("      from cte a")
				.where("     group by '9999999'																										")
			;
		}
		data.param
			.where("    order by sort_date, row_type																								")
			.where("    ) a																															")
		;
		return data.selectForMap();
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  *																														")
		;
		data.param
			.where("from (																															")
			.where("    with cte as (																												")
			.where("        select a.iomy_dvcd, a.invc_numb, a.invc_date																			")
			.where("             , a.stot_bass, a.paym_bank_name, a.publ_date, a.expr_date, a.plan_amnt												")
			.where("             , c.cstm_code, c.cstm_name, a.cstm_idcd																							")
			.where("          from crdt_colt_mast a																									")
			.where("               left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd															")
			.where("         where 1 = 1																											")
			.where("           and a.iomy_dvcd = '1'																								")
			.where("           and a.stot_dvcd = '4'																								")
			.where("           and a.invc_date  >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("           and a.invc_date  <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("           and a.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("           and a.stot_bass  like %:stot_bass%	" , arg.getParamText("stot_bass"))
			.where("           and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("    )																															")
			.where("    select 0 as row_type																										")
			.where("              , a.cstm_idcd as sort_cstm_idcd      																				")
			.where("          , a.invc_date as sort_invc_date 																						")
			.where("           , a.iomy_dvcd, a.invc_numb, a.invc_date  																			")
			.where("          , a.stot_bass, a.paym_bank_name, a.publ_date, a.expr_date, a.plan_amnt 												")
			.where("          , a.cstm_code, a.cstm_name																							")
			.where("      from cte a																												")
			.where("    union all																													")
			.where("    select 1 as row_type																										")
			.where("         , a.cstm_idcd as sort_cstm_idcd 																						")
			.where("          , max(a.invc_date) as sort_invc_date																					")
			.where("           , null as iomy_dvcd, null as invc_numb, null as invc_date															")
			.where("          , null as stot_bass, null as paym_bank_name, null as publ_date, null as expr_date, sum(a.plan_amnt) as plan_amnt   													")
			.where("            , null as cstm_code, '소계' as cstm_name  																				")
			.where("      from cte a																												")
			.where("     group by a.cstm_idcd																										")
		;
		data.param
			.where("    order by sort_cstm_idcd, sort_invc_date, row_type																			")
			.where("    ) a																															")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  *																														")
		;
		data.param
			.where("from (																															")
			.where("    with cte as (																												")
			.where("        select a.iomy_date																										")
			.where("              , c.cstm_idcd, c.cstm_code, c.cstm_name																			")
			.where("              , b.stot_bass, a.iomy_amnt, a.remk_text																			")
			.where("          from note_iomy_mast a																									")
			.where("               left outer join crdt_colt_mast b on b.iomy_dvcd = a.iomy_dvcd and b.invc_numb = a.invc_numb						")
			.where("               left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd															")
			.where("         where 1 = 1																											")
			.where("           and a.iomy_dvcd = '1'																								")
			.where("           and a.iomy_date  >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("           and a.iomy_date  <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("           and b.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("           and b.stot_bass  like %:stot_bass%	" , arg.getParamText("stot_bass"))
			.where("           and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("    )																															")
			.where("    select 0 as row_type																										")
			.where("           , a.iomy_date as sort_iomy_date																						")
			.where("           , a.* 																												")
			.where("      from cte a																												")
			.where("    union all																													")
			.where("    select 1 as row_type																										")
			.where("         , max(a.iomy_date) as sort_iomy_date																					")
			.where("         , null as iomy_date																									")
			.where("         , a.cstm_idcd, null as cstm_code, '소계' as cstm_name																	")
			.where("         , null as stot_bass, sum(a.iomy_amnt) as iomy_amnt, null as remk_text													")

			.where("      from cte a																												")
			.where("     group by a.cstm_idcd																										")
		;
		data.param
			.where("    order by cstm_idcd, sort_iomy_date, row_type																					")
			.where("    ) a																															")
		;
		return data.selectForMap();
	}



	public SqlResultMap setUpdate(HttpRequestArgument arg) throws Exception {
		String invc_numb = arg.getParamText("invc_numb") ;
		DataMessage data = arg.newStorage("POS");

//		ParamToJson trans = new ParamToJson();
//		String json_data = trans.Translate(arg, "acpt_json_fields");
		data.param
			.table("note_iomy_mast")
			.where("where iomy_dvcd = :iomy_dvcd")
			.where("and   invc_numb = :invc_numb")

			.unique("iomy_dvcd", 1)
			.unique("invc_numb", arg.getParameter("invc_numb"))

			.update("iomy_date", arg.getParameter("iomy_date"))
			.update("cstm_idcd", arg.getParameter("cstm_idcd"))
			.update("stot_bass", arg.getParameter("stot_bass"))
			.update("iomy_amnt", arg.getParameter("iomy_amnt"))
			.update("remk_text", arg.getParameter("remk_text"))
//			.update("json_data", json_data)

			.update("crte_ipad"        , arg.remoteAddress )
			.update("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("note_iomy_mast")
			.where("where iomy_dvcd = :iomy_dvcd ")
			.where("and   invc_numb = :invc_numb ")

			.unique("iomy_dvcd"		, 1)
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

}
