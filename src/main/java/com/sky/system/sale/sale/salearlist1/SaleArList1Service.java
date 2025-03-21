package com.sky.system.sale.sale.salearlist1;

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
public class SaleArList1Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
			.query("with sale as (																									")
			.query("   select a.invc_numb, a.invc_date, a.cstm_idcd																	")
			.query("        , b.line_seqn, b.sale_qntt, b.sale_pric, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt, b.item_idcd				")
			.query("        , c.cstm_code  , c.cstm_name 																			")
			.query("     from sale_mast a																							")
			.query("          left outer join sale_item b on b.invc_numb = a.invc_numb												")
			.query("          left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd												")
			.query("          left outer join acpt_mast d on d.invc_numb = b.acpt_numb												")
			.query("    where 1 = 1																									")
			.query("      and a.bzpl_idcd  = :bzpl_idcd"     , arg.getParamText("bzpl_idcd"))
			.query("      and b.item_idcd  = :item_idcd"     , arg.getParamText("item_idcd"))
			.query("      and d.drtr_idcd  = :drtr_idcd"     , arg.getParamText("drtr_idcd"))
			.query("      and a.invc_date >= :invc_date1"    , arg.getParamText("invc_date1"))
			.query("      and a.invc_date <= :invc_date2"    , arg.getParamText("invc_date2"))
			.query("      and a.find_name like %:find_name%" , arg.getParameter("find_name"))
			.query("      and a.line_stat  < :line_stat"     , "2" , "".equals(arg.getParamText("line_stat" )) )
			.query("), colt as (																									")
			.query("   select orig_invc_numb, b.orig_invc_seqn, max(c.iomy_date) as iomy_date, sum(b.ttsm_amnt) as colt_amnt		")
			.query("     from sale a																								")
			.query("          left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn	")
			.query("          left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb											")
			.query("    where 1 = 1																									")
			.query("      and c.iomy_dvcd = '1'																						")
			.query("      and c.line_stat < 2																						")
			.query("      group by orig_invc_numb, b.orig_invc_seqn																	")
			.query(")																												")
			.query("    select a.* 																									")
			.query("         , b.iomy_date, b.colt_amnt, ifnull(a.ttsm_amnt, 0) - ifnull(b.colt_amnt, 0) as baln					")
			.query("         , c.item_code, c.item_name, c.item_spec 																")
			.query("    from sale a																									")
			.query("         left outer join colt      b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn		")
			.query("         left outer join item_mast c on c.item_idcd = a.item_idcd												")
			.query("   where 1 = 1																									")
			.query("   order by a.invc_date, a.cstm_code, a.line_seqn;																")
		;

		return data.selectForMap();
	}
}
