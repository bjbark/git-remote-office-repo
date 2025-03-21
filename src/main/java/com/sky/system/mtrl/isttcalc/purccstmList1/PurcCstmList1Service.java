package com.sky.system.mtrl.isttcalc.purccstmList1;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class PurcCstmList1Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
		    .query("select x.*																									")
		;
		data.param
			.where("from (																							")
			.where("with txbl as (																								")
			.where("   select a.invc_numb, a.invc_date, a.cstm_idcd																")
			.where("         , b.line_seqn, b.item_idcd, c.item_name, c.item_spec 												")
			.where("         , b.istt_qntt as qntt, b.istt_pric as pric, b.istt_amnt as sply_amnt, b.istt_vatx as vatx_amnt, b.ttsm_amnt ")
			.where("      from purc_istt_mast a																					")
			.where("           left outer join purc_istt_item b on b.invc_numb = a.invc_numb									")
			.where("           left outer join item_mast c on c.item_idcd = b.item_idcd											")
			.where("     where 1 = 1																							")
			.where("       and a.invc_date >= :invc_date1"    		, arg.getParamText("invc_date1"))
			.where("       and a.invc_date <= :invc_date2"    		, arg.getParamText("invc_date2"))
			.where("       and a.cstm_idcd >= :cstm_idcd1"    		, arg.getParamText("cstm_idcd1"))
			.where("       and a.cstm_idcd <= :cstm_idcd2"    		, arg.getParamText("cstm_idcd2"))
			.where("       and    a.find_name like %:find_name%"	, arg.getParameter("find_name"))
			.where("       and a.line_stat  < 2																					")
			.where("), colt as (																								")
			.where("   select b.txbl_numb, b.txbl_seqn, sum(b.iomy_amnt) as iomy_amnt											")
			.where("      from crdt_colt_mast a																					")
			.where("           left outer join crdt_colt_item b on b.iomy_dvcd = a.iomy_dvcd and b.invc_numb = a.invc_numb		")
			.where("         , txbl c																							")
			.where("      where 1 = 1																							")
			.where("        and a.iomy_dvcd = 2																					")
			.where("        and b.txbl_numb = c.invc_numb																		")
			.where("        and b.txbl_seqn = c.line_seqn																		")
			.where("        and a.line_stat < 2																					")
			.where("      group by b.txbl_numb, b.txbl_seqn																		")
			.where(")																											")
			.where("   select a.* 																								")
			.where("        , b.iomy_amnt																						")
			.where("		, ifnull(a.ttsm_amnt, 0) - ifnull(b.iomy_amnt, 0) as npay_amnt										")
			.where("        , c.cstm_name																						")
			.where("     from txbl a																							")
			.where("          left outer join colt b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn					")
			.where("          left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd											")
			.where("    where 1 = 1																								")
			.where("     ) x																									")
			.where(" order by x.cstm_name, x.invc_date desc																		")
		;

		return (page == 0 && rows == 0) ? data.selectForMap(sort) : data.selectForMap(page, rows, (page==1), sort );
	}
}
