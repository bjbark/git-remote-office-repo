package com.sky.system.sale.sale.salearlist2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class SaleArList2Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

//	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
//		DataMessage data = arg.newStorage("POS");
//
//		data.param // 집계문  입력
//			.total(" select  count(1) as maxsize	")
//		;
//		data.param
//			.query("select    a.cstm_idcd        , a.cstm_name      , sum(bmon_amnt) as bmon_amnt							")
//			.query("        , sum(cumn_sale) as cumn_sale           , sum(cumn_iamt) as cumn_iamt							")
//			.query("        , sum(bmon_amnt) + sum(cumn_sale) - sum(cumn_iamt) as urcp_amnt 								")
//			.query("        , a.cstm_code													 								")
//			.query("from (																									")
//			.query("    select  a.cstm_idcd      , b.cstm_name      , txbl_amnt as bmon_amnt      , 0 as cumn_sale			")
//			.query("   	      , 0 as cumn_iamt   , b.cstm_code																")
//			.query("    from cstm_bond_init a																				")
//			.query("         left outer join cstm_mast b on b.cstm_idcd = a.cstm_idcd										")
//			.query("    where 1=1																							")
//			.query("        and   a.trns_yymm >= :trns_yymm1"    , arg.getParamText("trns_yymm1"))
//			.query("        and   a.trns_yymm <= :trns_yymm2"    , arg.getParamText("trns_yymm2"))
//			.query("        and   a.cstm_idcd  = :cstm_idcd"     , arg.getParamText("cstm_idcd"))
//			.query("        and   b.sale_drtr_idcd  = :sale_drtr_idcd"     , arg.getParamText("sale_drtr_idcd"))
//			.query("    union all																							")
//			.query("  select  a.cstm_idcd        , b.cstm_name      , sum(ttsm_amnt) as bmon_amnt							")
//			.query("          , 0 as cumn_sale   , 0 as cumn_iamt   , b.cstm_code											")
//			.query("      from txbl_mast a																					")
//			.query("          left outer join cstm_mast b on b.cstm_idcd = a.cstm_idcd										")
//			.query("    where 1=1																							")
//			.query("        and   a.bzpl_idcd  = :bzpl_idcd"     , arg.getParamText("bzpl_idcd"))
//			.query("        and   a.cstm_idcd  = :cstm_idcd"     , arg.getParamText("cstm_idcd"))
//			.query("        and   b.sale_drtr_idcd  = :sale_drtr_idcd"     , arg.getParamText("sale_drtr_idcd"))
//			.query("    group by a.cstm_idcd																				")
//			.query("    union all																							")
//			.query("  select  a.cstm_idcd        , c.cstm_name      , sum(iomy_amnt * -1) as bmon_amnt						")
//			.query("          , 0 as cumn_sale   , 0 as cumn_iamt   , c.cstm_code											")
//			.query("    from crdt_colt_mast a																				")
//			.query("        left outer join crdt_colt_item b on b.iomy_dvcd = a.iomy_dvcd and b.invc_numb = a.invc_numb		")
//			.query("        left outer join cstm_mast c      on c.cstm_idcd = a.cstm_idcd									")
//			.query("    where 1=1																							")
//			.query("        and a.iomy_dvcd = '1'																			")
//			.query("        and   a.cstm_idcd  = :cstm_idcd"     , arg.getParamText("cstm_idcd"))
//			.query("        and   b.sale_drtr_idcd  = :sale_drtr_idcd"     , arg.getParamText("sale_drtr_idcd"))
//			.query("    group by a.cstm_idcd																				")
//			.query("    union all																							")
//			.query("  select  a.cstm_idcd        , b.cstm_name      , 0 as bmon_amnt										")
//			.query("          , sum(ttsm_amnt) as cumn_sale         , 0 as cumn_iamt   , b.cstm_code						")
//			.query("    from txbl_mast a																					")
//			.query("        left outer join cstm_mast b on b.cstm_idcd = a.cstm_idcd										")
//			.query("    where 1=1																							")
//			.query("        and   a.bzpl_idcd  = :bzpl_idcd"     , arg.getParamText("bzpl_idcd"))
//			.query("        and   a.cstm_idcd  = :cstm_idcd"     , arg.getParamText("cstm_idcd"))
//			.query("        and   b.sale_drtr_idcd  = :sale_drtr_idcd"     , arg.getParamText("sale_drtr_idcd"))
//			.query("    group by a.cstm_idcd																				")
//			.query("    union all																							")
//			.query("  select  a.cstm_idcd         , c.cstm_name      , 0 as bmon_amnt										")
//			.query("        , 0 as cumn_sale      , sum(iomy_amnt) as cumn_iamt         , c.cstm_code						")
//			.query("    from crdt_colt_mast a																				")
//			.query("        left outer join crdt_colt_item b on b.iomy_dvcd = a.iomy_dvcd and b.invc_numb = a.invc_numb		")
//			.query("        left outer join cstm_mast c      on c.cstm_idcd = a.cstm_idcd									")
//			.query("    where 1=1																							")
//			.query("        and a.iomy_dvcd = '1'																			")
//			.query("        and   a.cstm_idcd  = :cstm_idcd"     , arg.getParamText("cstm_idcd"))
//			.query("        and   b.sale_drtr_idcd  = :sale_drtr_idcd"     , arg.getParamText("sale_drtr_idcd"))
//			.query("    group by a.cstm_idcd																				")
//			.query(")a																										")
//			.query(" where 1=1																								")
//			.query(" group by a.cstm_idcd , a.cstm_name																		")
//		;
//
//		return data.selectForMap();
//	}

	public SqlResultMap getList1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String find_name = arg.getParamText("find_name") ;
		if (find_name.isEmpty()) {
			find_name = "@" ;
		}

		data.param
			.query("call sale_bond_trns (				")
			.query(" :invc_date1	" , arg.getParameter("invc_date1"))
			.query(" ,:invc_date2	" , arg.getParameter("invc_date2"))
			.query(" ,:find_name	" , find_name)
			.query(" ) 									")
		;
		return data.selectForMap();
	}

	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with txbl as (")
			.query("  select a.invc_numb, b.line_seqn, a.invc_date")
			.query("       , d.cstm_idcd, d.cstm_code, d.cstm_name")
			.query("       , b.item_idcd, b.item_name, b.item_spec, b.qntt as sale_qntt, '' as sale_pric, b.sply_amnt, b.vatx_amnt, b.ttsm_amnt")
			.query("    from txbl_mast a ")
			.query("         left outer join txbl_item b on b.puch_sale_dvcd = a.puch_sale_dvcd and b.invc_numb = a.invc_numb")
			.query("         left outer join acpt_mast c on c.invc_numb = b.orig_invc_numb")
			.query("         left outer join cstm_mast d on d.cstm_idcd = a.cstm_idcd")
			.query("   where 1 = 1")
			.query("     and a.puch_sale_dvcd = '2000'")
			.query("     and a.invc_date >= :invc_date1", arg.getParamText("invc_date1"))
			.query("     and a.invc_date <= :invc_date2", arg.getParamText("invc_date2"))
			.query("     and a.bzpl_idcd = :bzpl_idcd",   arg.getParamText("bzpl_idcd"))
			.query("     and b.item_idcd = :item_idcd",   arg.getParamText("item_idcd"))
			.query("     and c.drtr_idcd = :drtr_idcd",   arg.getParamText("drtr_idcd"))
			.query("     and a.find_name like %:find_name%	" , arg.getParamText("find_name"))
			.query("     and a.line_stat < 2")
			.query(") , colt as (")
			.query("  select b.txbl_numb, b.txbl_seqn, a.cstm_idcd, b.item_idcd, max(a.iomy_date) as iomy_date, sum(b.iomy_amnt) as iomy_amnt")
			.query("    from crdt_colt_mast a")
			.query("         left outer join crdt_colt_item b on b.iomy_dvcd = a.iomy_dvcd and b.invc_numb = a.invc_numb")
			.query("       , txbl c ")
			.query("   where 1 = 1")
			.query("     and a.iomy_dvcd = '1000'")
			.query("     and b.txbl_numb = c.invc_numb")
			.query("     and b.txbl_seqn = c.line_seqn")
			.query("     and a.cstm_idcd = c.cstm_idcd")
			.query("     and b.item_idcd = c.item_idcd")
			.query("     and a.line_stat < 2")
			.query("   group by b.txbl_numb, b.txbl_seqn, a.cstm_idcd, b.item_idcd")
			.query(") select t.*")
			.query("       , t.ttsm_amnt - t.iomy_amnt as urcp_amnt")
			.query("    from (")
			.query("          select a.*")
			.query("               , b.iomy_date, ifnull(b.iomy_amnt, 0) iomy_amnt")
			.query("           from txbl a")
			.query("                left outer join colt b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn and b.cstm_idcd = a.cstm_idcd and b.item_idcd = a.item_idcd")
			.query("         ) t")
			.query("   order by t.cstm_code, t.invc_date 		")
		;

		return data.selectForMap() ;

	}
}
