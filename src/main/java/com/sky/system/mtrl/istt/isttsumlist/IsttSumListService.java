package com.sky.system.mtrl.istt.isttsumlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class IsttSumListService extends DefaultServiceHandler {
	//거래처별 조회
	public SqlResultMap getLister(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																								")
		;
		data.param
			.query("select a.*																												")
		;
		data.param
			.where("from (																													")
			.where("with cte as ( 																											")
			.where("   select a.cstm_idcd, sum(b.istt_amnt) as istt_amnt, sum(b.istt_vatx) as istt_vatx, sum(b.ttsm_amnt) as ttsm_amnt		")
			.where("     from purc_istt_mast a																								")
			.where("          left outer join purc_istt_item b on b.invc_numb = a.invc_numb													")
			.where("    where 1 = 1																											")
			.where("      and a.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("      and a.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("      and a.cstm_idcd = :cstm_idcd				" , arg.getParamText("cstm_idcd"))
			.where("      and b.item_idcd = :item_idcd				" , arg.getParamText("item_idcd"))
			.where("      and a.find_name like like %:find_name%	" , arg.getParamText("find_name"))
			.where("      and a.line_stat <  :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("    group by a.cstm_idcd ")
			.where(")																														")
			.where("select a.cstm_idcd ")
			.where("     , b.cstm_code, b.cstm_name, b.buss_numb, b.boss_name, b.tele_numb  												")
			.where("     , c.user_name																										")
			.where("     , a.istt_amnt, a.istt_vatx, a.ttsm_amnt																			")
			.where("  from cte a 																											")
			.where("       left outer join cstm_mast b on b.cstm_idcd = a.cstm_idcd															")
			.where("       left outer join user_mast c on c.user_idcd = b.sale_drtr_idcd													")
			.where(" order by b.cstm_code																									")
		    .where(") a																														")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//품목별조회
	public SqlResultMap getMaster(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																															")
			;
		data.param
			.query("select a.*																																			")
		;
		data.param
			.where("from (																																				")
			.where("with cte as ( 																																		")
			.where("   select b.item_idcd, sum(b.istt_qntt) as istt_qntt, sum(b.istt_amnt) as istt_amnt, sum(b.istt_vatx) as istt_vatx, sum(b.ttsm_amnt) as ttsm_amnt	")
			.where("     from purc_istt_mast a																															")
			.where("          left outer join purc_istt_item b on b.invc_numb = a.invc_numb																				")
			.where("    where 1 = 1																																		")
			.where("      and a.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("      and a.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("      and a.cstm_idcd = :cstm_idcd				" , arg.getParamText("cstm_idcd"))
			.where("      and b.item_idcd = :item_idcd				" , arg.getParamText("item_idcd"))
			.where("      and a.find_name like like %:find_name%	" , arg.getParamText("find_name"))
			.where("      and a.line_stat <  :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("    group by b.item_idcd ")
			.where(")																																					")
			.where("select a.item_idcd ")
			.where("     , b.item_code, b.item_name, b.item_spec   																										")
			.where("     , a.istt_qntt, a.istt_amnt, a.istt_vatx, a.ttsm_amnt																							")
			.where("     , round(a.ttsm_amnt / a.istt_qntt, 0) as istt_pric																								")
			.where("  from cte a 																																		")
			.where("       left outer join item_mast b on b.item_idcd = a.item_idcd																						")
			.where(" order by b.item_code																																")
		    .where(") a																																					")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
