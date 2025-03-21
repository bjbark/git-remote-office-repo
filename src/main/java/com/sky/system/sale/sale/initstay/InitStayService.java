package com.sky.system.sale.sale.initstay;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service
public class InitStayService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  *																								")
		;
		data.param
			.where("from (																									")
			.where("    with cte as (																						")
			.where("        select a.cstm_idcd, c.cstm_code, c.cstm_name													")
			.where("             , a.invc_numb, a.invc_date, a.deli_date													")
			.where("             , b.line_seqn, b.item_idcd, d.item_code, d.item_name										")
			.where("             , b.ostt_qntt, b.sale_pric, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt							")
			.where("             , b.lott_numb, b.user_memo																	")
			.where("             , json_value(b.json_data, '$.trns_date') as trns_date										")
			.where("             , b.acpt_numb, b.acpt_seqn 																")
			.where("             , m.acpt_dvcd, json_value(m.json_data, '$.prod_trst_dvcd') as prod_trst_dvcd				")
			.where("          from sale_ostt_mast a																			")
			.where("               left outer join sale_ostt_item b on b.invc_numb = a.invc_numb							")
			.where("               left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd									")
			.where("               left outer join item_mast d on d.item_idcd = b.item_idcd									")
			.where("               left outer join acpt_mast m on m.invc_numb = b.acpt_numb									")
			.where("         where 1 = 1																					")
			.where("           and json_value(b.json_data, '$.trns_date') is not null										")
			.where("           and json_value(b.json_data, '$.trns_date')>= :trns_date1" , arg.getParamText("trns_date1"))
			.where("           and json_value(b.json_data, '$.trns_date')<= :trns_date2" , arg.getParamText("trns_date2"))
			.where("           and a.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("           and m.acpt_dvcd  = :acpt_dvcd		" , arg.getParamText("acpt_dvcd"))
			.where("           and b.lott_numb  like %:lott_numb%	" , arg.getParamText("lott_numb"))
			.where("           and b.item_idcd  = :item_idcd		" , arg.getParamText("item_idcd"))
			.where("           and a.line_stat   < 2																		")
			.where("           and b.line_stat   < 2																		")
			.where("    )																									")
			.where("    select 0 as row_type																				")
			.where("          , a.trns_date as sort_trns_date 																")
			.where("          , a.*																							")
			.where("    from cte a																							")
		;
		// 일계
		if (arg.getParamText("row_type" ).contains("1")) {
			data.param
				.where("    union all																																			")
				.where("    select 1 as row_type																																")
				.where("         , a.trns_date as sort_trns_date																												")
				.where("         , null as cstm_idcd, null as cstm_code, '일계' as cstm_name																						")
				.where("         , null as invc_numb, null as invc_date, null as deli_date																						")
				.where("         , null as line_seqn, null as item_idcd, null as item_code, null as item_name																	")
				.where("         , sum(a.ostt_qntt) as ostt_qntt, null sale_pric, sum(a.sale_amnt) as sale_amnt, sum(a.vatx_amnt) as vatx_amnt, sum(a.ttsm_amnt) as ttsm_amnt	")
				.where("         , null as lott_numb, null as user_memo																											")
				.where("         , null as trns_date																															")
				.where("         , null as acpt_numb																															")
				.where("         , null as acpt_seqn																															")
				.where("         , null as acpt_dvcd, null as prod_trst_dvcd																									")
				.where("      from cte a																																		")
				.where("     group by a.trns_date																																")
			;
		}
		// 월계
		if (arg.getParamText("row_type" ).contains("2")){
			data.param
				.where("    union all																																			")
				.where("    select 2 as row_type																																")
				.where("         , concat(substr(a.trns_date,1,6),'31') as sort_trns_date																						")
				.where("         , null as cstm_idcd, null as cstm_code, '월계' as cstm_name																						")
				.where("         , null as invc_numb, null as invc_date, null as deli_date																						")
				.where("         , null as line_seqn, null as item_idcd, null as item_code, null as item_name																	")
				.where("         , sum(a.ostt_qntt) as ostt_qntt, null sale_pric, sum(a.sale_amnt) as sale_amnt, sum(a.vatx_amnt) as vatx_amnt, sum(a.ttsm_amnt) as ttsm_amnt	")
				.where("         , null as lott_numb, null as user_memo																											")
				.where("         , null as trns_date																															")
				.where("         , null as acpt_numb																															")
				.where("         , null as acpt_seqn																															")
				.where("         , null as acpt_dvcd, null as prod_trst_dvcd																									")
				.where("      from cte a																																		")
				.where("     group by concat(substr(a.trns_date, 1, 6), '99')																									")
			;
		}
		if (arg.getParamText("row_type" ).contains("3")){
			data.param
				.where("    union all																																			")
				.where("    select 3 as row_type																																")
				.where("         , '99999999' as sort_trns_date																													")
				.where("         , null as cstm_idcd, null as cstm_code, '합계' as cstm_name																						")
				.where("         , null as invc_numb, null as invc_date, null as deli_date																						")
				.where("         , null as line_seqn, null as item_idcd, null as item_code, null as item_name																	")
				.where("         , sum(a.ostt_qntt) as ostt_qntt, null sale_pric, sum(a.sale_amnt) as sale_amnt, sum(a.vatx_amnt) as vatx_amnt, sum(a.ttsm_amnt) as ttsm_amnt	")
				.where("         , null as lott_numb, null as user_memo																											")
				.where("         , null as trns_date																															")
				.where("         , null as acpt_numb																															")
				.where("         , null as acpt_seqn																															")
				.where("         , null as acpt_dvcd, null as prod_trst_dvcd																									")
				.where("      from cte a																																		")
				.where("     group by '9999999'																																	")
			;
		}
		data.param
			.where("    order by sort_trns_date, row_type																							")
			.where("    ) a																															")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String DATE_DVCD	= arg.getParamText("date_dvcd");
		String FR_DT		= arg.getParamText("fr_dt");
		String TO_DT		= arg.getParamText("to_dt");

		if (DATE_DVCD.length() == 0) {
			DATE_DVCD = "" ;
		}

		if (FR_DT.length() == 0) {
			FR_DT = "" ;
		}
		if (TO_DT.length() == 0) {
			TO_DT = "" ;
		}
		;
		// 삼정 - 삼정수주 -> 주문생산, 재고주문, OEM수주  -> 주문생산, 재고생산 이월가능하도록 처리
		data.param
			.where("with cte as (																									")
			.where("	select a.cstm_idcd, c.cstm_code, c.cstm_name																")
			.where("         , a.invc_numb, a.invc_date, a.deli_date																")
			.where("         , b.line_seqn, b.item_idcd, d.item_code, d.item_name 													")
			.where("         , b.ostt_qntt, b.sale_pric, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt										")
			.where("         , b.lott_numb, b.user_memo, m.acpt_dvcd, json_value(m.json_data, '$.prod_trst_dvcd') as prod_trst_dvcd	")
			.where("    from sale_ostt_mast a																						")
			.where("    left outer join sale_ostt_item b on b.invc_numb = a.invc_numb												")
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("    left outer join acpt_mast m on m.invc_numb = b.acpt_numb												")
			;
		}
		data.param
			.where("    left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd													")
			.where("    left outer join item_mast d on d.item_idcd = b.item_idcd													")
			.where("where  1=1																										")
			.where("and     a.line_stat < 2																							")
			.where("and     b.line_stat < 2																							")
			.where("and     json_value(b.json_data, '$.trns_date') is null															")
			.where("and     a.cstm_idcd  = :cstm_idcd		"	, arg.getParamText("cstm_idcd"))
			.where("and     b.item_idcd  = :item_idcd		" 	, arg.getParamText("item_idcd"))
			.where("and     b.lott_numb  like %:lott_numb%	" 	, arg.getParamText("lott_numb"))
			.where("and     m.acpt_dvcd  = :acpt_dvcd		" 	, arg.getParamText("acpt_dvcd"))
			.where("and     a.invc_date >= :fr_dt3			"	, FR_DT, "2".equals(DATE_DVCD))
			.where("and     a.invc_date <= :to_dt4			"	, TO_DT, "2".equals(DATE_DVCD))
			.where("and     a.deli_date >= :fr_dt3			"	, FR_DT, "1".equals(DATE_DVCD))
			.where("and     a.deli_date <= :to_dt4			"	, TO_DT, "1".equals(DATE_DVCD))
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and   ((m.acpt_dvcd = '1000' and json_value(m.json_data, '$.prod_trst_dvcd') <> '2000') or (m.acpt_dvcd = '2000' and json_value(m.json_data, '$.prod_trst_dvcd') <> '3000')) ")
				.where("and   not exists (																					")
				.where("                  select '1'																		")
				.where("                    from sale_item si																")
				.where("                         left outer join txbl_item ti on ti.invc_numb = si.prnt_idcd				")
				.where("                   where 1 = 1																		")
				.where("                     and ti.orig_invc_numb = a.invc_numb											")
				.where("                     and ti.orig_invc_seqn = b.line_seqn											")
				.where("                 )																					")
			;
		}

		data.param
			.where(")																										")
			.where(" select *																								")
			.where(" from cte a																								")
		;
		if ("1".equals(DATE_DVCD)) {
			data.param
				.where(" order by a.deli_date desc, a.invc_numb, a.line_seqn												")
			;
		} else {
			data.param
				.where(" order by a.invc_date desc, a.invc_numb, a.line_seqn												")
			;
		}

		return data.selectForMap();
	}

	public SqlResultMap setUpdate(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			boolean isExist = isExistCrdtItem(arg, row);
			if (isExist) {
				throw new ServiceException("수금이 등록되어있는 매출입니다.<br><br>등록을 할 수 없습니다." );
			}

			ParamToJson trans = new ParamToJson();
			String json_data = trans.TranslateRow(arg, row, "sale_ostt_item_json_fields");
			String json_data2 = trans.TranslateRow(arg, row, "sale_item_json_fields");

			// 이월시 json_data(trns_date)에 일자 반영.
			data.param
				.table ("sale_ostt_item")
				.where ("where invc_numb = :invc_numb")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"        , row.fixParameter("invc_numb"))
				.unique("line_seqn"        , row.fixParameter("line_seqn"))
				.update("json_data"        , json_data)
			;
			data.attach(Action.update);

			data.param
				.table ("sale_item")
				.where ("where orig_invc_numb = :orig_invc_numb")
				.where ("and   orig_invc_seqn = :orig_invc_seqn")

				.unique("orig_invc_numb"      , row.fixParameter("invc_numb"))
				.unique("orig_invc_seqn"      , row.fixParameter("line_seqn"))
				.update("json_data"           , json_data2)
			;
			data.attach(Action.update);
		}
		data.execute();
		return null;
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			boolean isExist = isExistCrdtItem(arg, row);
			if (isExist) {
				throw new ServiceException("수금이 등록되어있는 매출입니다.<br><br>삭제 할 수 없습니다." );
			}

			data.param
				.table ("sale_ostt_item")
				.where ("where invc_numb = :invc_numb")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"        , row.fixParameter("invc_numb"))
				.unique("line_seqn"        , row.fixParameter("line_seqn"))
				.modify("json_data", "json_data", "JSON_REMOVE(ifnull(json_data,'{}'),'$.trns_date')")
			;
			data.attach(Action.update);

			data.param
				.table ("sale_item")
				.where ("where orig_invc_numb = :orig_invc_numb")
				.where ("and   orig_invc_seqn = :orig_invc_seqn")

				.unique("orig_invc_numb"    , row.fixParameter("invc_numb"))
				.unique("orig_invc_seqn"    , row.fixParameter("line_seqn"))
				.modify("json_data", "json_data", "JSON_REMOVE(ifnull(json_data,'{}'),'$.trns_date')")
			;
			data.attach(Action.update);
		}

		data.execute();
		return null;

	}

	// 세금계선서가 발행된 품목인지 확인한다.
	public boolean isExistTxblItem(HttpRequestArgument arg, SqlResultRow row) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.where("select count(a.invc_numb) as count										")
			.where("from   sale_item a														")
			.where("       left outer join txbl_item b on b.invc_numb = a.prnt_idcd			")
			.where("where  1 = 1															")
			.where("and    b.orig_invc_numb = :invc_numb	" , row.getParamText("invc_numb"))
			.where("and    b.orig_invc_seqn = :line_seqn	" , row.getParamText("line_seqn"))
		;
		int count = Integer.parseInt(data.selectForRow().getParamText("count"));

		return (count == 0) ? false : true;
	}

	// 수금등록된 매출 품목인지 확인한다.
	public boolean isExistCrdtItem(HttpRequestArgument arg, SqlResultRow row) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.where("select count(a.invc_numb) as count										")
			.where("from   crdt_colt_item  a												")
			.where("left outer join crdt_colt_mast b on a.invc_numb = b.invc_numb and a.iomy_dvcd = b.iomy_dvcd	")
			.where("where  1 = 1															")
			.where("and b.iomy_dvcd = '2'													")
			.where("and b.line_stat < '2'													")
			.where("and exists (select '1'													")
			.where("             from sale_item b											")
			.where("             where 1 = 1												")
			.where("             and b.invc_numb = a.orig_invc_numb							")
			.where("             and b.line_seqn = a.orig_invc_seqn							")
			.where("             and b.orig_invc_numb = :invc_numb	" , row.getParamText("invc_numb"))
			.where("             and b.orig_invc_seqn = :line_seqn	" , row.getParamText("line_seqn"))
			.where("            )															")
		;
		int count = Integer.parseInt(data.selectForRow().getParamText("count"));

		return (count == 0) ? false : true;
	}
}
