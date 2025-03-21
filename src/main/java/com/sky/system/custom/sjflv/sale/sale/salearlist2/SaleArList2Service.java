package com.sky.system.custom.sjflv.sale.sale.salearlist2;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service("sjflv.SaleArList2Service")
public class SaleArList2Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String invc_date1 = arg.getParamText("invc_date1");
		String invc_date2 = arg.getParamText("invc_date2");

		if (StringUtils.isEmpty(invc_date1) || StringUtils.isEmpty(invc_date2)) {
			throw new ServiceException("기준일자를 입력 후 조회하세요.");
		}

		String cstm_idcd = arg.getParamText("cstm_idcd");
		if (cstm_idcd.isEmpty()) {
			cstm_idcd = "@" ;
		}

		String drtr_idcd = arg.getParamText("drtr_idcd");
		if (drtr_idcd.isEmpty()) {
			drtr_idcd = "@" ;
		}

		String find_name = arg.getParamText("find_name");
		if (find_name.isEmpty()) {
			find_name = "@" ;
		}

		data.param
			.query("call sale_book (				")
			.query("  :invc_date1	" , arg.getParameter("invc_date1"))
			.query(" ,:invc_date2	" , arg.getParameter("invc_date2"))
			.query(" ,:cstm_idcd	" , cstm_idcd)
			.query(" ,:drtr_idcd	" , drtr_idcd)
			.query(" ,:find_name	" , find_name)
			.query(" ) 								")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String cstm_idcd = arg.getParamText("cstm_idcd");
		if (StringUtils.isEmpty(cstm_idcd)) {
			throw new ServiceException("거래처 원장에서 거래처를 선택 후 조회하세요.");
		}

		data.param
			.query("with sale as (")
			.query("    select a.invc_numb, b.line_seqn, a.cstm_idcd, b.item_idcd, b.sale_qntt, b.sale_pric, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt	")
			.query("     , case when json_value(b.json_data, '$.trns_date') is null then a.invc_date												")
			.query("       else json_value(b.json_data, '$.trns_date')																				")
			.query("    end as invc_date																											")
			.query("    from sale_mast a																											")
			.query("    left outer join sale_item b on b.invc_numb = a.invc_numb																	")
			.query("    left outer join cstm_mast d on d.cstm_idcd = a.cstm_idcd																	")
		;
		data.param
			.query("    where 1 = 1")
			.query("    and a.cstm_idcd  = :cstm_idcd	"	,	arg.getParamText("cstm_idcd" ))
			.query("and ((json_value(b.json_data, '$.trns_date') is null ")
			.query("and a.invc_date >= :invc_date1" , arg.getParamText("invc_date1"))
			.query("and a.invc_date <= :invc_date2)" , arg.getParamText("invc_date2"))
			.query("or  (json_value(b.json_data, '$.trns_date') is not null ")
			.query("and json_value(b.json_data, '$.trns_date') >= :invc_date3" , arg.getParamText("invc_date1"))
			.query("and json_value(b.json_data, '$.trns_date') <= :invc_date4))" , arg.getParamText("invc_date2"))
			.query("    and b.item_idcd  = :item_idcd	"	,	arg.getParamText("item_idcd" ))
			.query("    and a.line_stat  < :line_stat	"	,	"2"	,	"".equals(arg.getParamText("line_stat" )))
		;
		data.param
			.query("), colt as (")
			.query("    select a.invc_numb, a.line_seqn, sum(b.iomy_amnt) as iomy_amnt											")
			.query("    from sale a 																							")
			.query("    left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn	")
			.query("    left outer join crdt_colt_mast c on c.iomy_dvcd = b.iomy_dvcd and c.invc_numb = b.invc_numb				")
		;
		data.param
			.query("     where 1 = 1																							")
			.query("     and c.iomy_dvcd = '1'																					")
			.query("     and c.line_stat < 2																					")
			.query("     group by a.invc_numb, a.line_seqn																		")
		;
		data.param
			.query(")")
			.query(" select   a.invc_date, c.item_code, c.item_name, c.item_spec, a.sale_qntt, a.sale_pric, a.sale_amnt, a.vatx_amnt, a.ttsm_amnt	")
			.query("        , ifnull(iomy_amnt, 0) as iomy_amnt																						")
			.query("        , ifnull(a.ttsm_amnt, 0) - ifnull(iomy_amnt, 0) as npay_amnt															")
		;
		data.param
			.query("  from sale a 																		")
			.query("  left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn	")
			.query("  left outer join item_mast c on c.item_idcd = a.item_idcd							")
			.query(" where 1 = 1											 							")
			.query("   and ifnull(a.ttsm_amnt, 0) - ifnull(iomy_amnt, 0) != 0 							")
			.query(" order by a.invc_date, a.invc_numb, a.line_seqn										")
		;
		return data.selectForMap();
	}
}
