package com.sky.system.custom.sjflv.sale.sale.salecolt;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.axis.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.SaleColtService")
public class SaleColtService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select b.invc_date, c.cstm_code, c.cstm_name, d.dept_name, e.user_name, b.plan_amnt as ttsm_amnt	")
			.query("     , b.stot_dvcd, b.stot_bass, b.paym_bank_name, b.publ_date, b.expr_date							")
			.query("     , b.invc_numb, b.remk_text																		")
			.query("     , f.iomy_date, f.iomy_amnt																		")

			.where("  from crdt_colt_mast b																				")
			.where("       left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd										")
			.where("       left outer join dept_mast d on d.dept_idcd = b.dept_idcd										")
			.where("       left outer join user_mast e on e.user_idcd = b.drtr_idcd										")
			.where("       left outer join note_iomy_mast f on f.invc_numb = b.invc_numb and f.iomy_dvcd = '1'			")
			.where("  where 1 = 1																						")
			.where("  and b.iomy_dvcd = '1'																				")
			.where("  and b.iomy_date >= :iomy_date1"   , arg.getParamText("iomy_date1")) 	// 수금일자
			.where("  and b.iomy_date <= :iomy_date2"   , arg.getParamText("iomy_date2"))
			.where("  and b.cstm_idcd  = :cstm_idcd"    , arg.getParamText("cstm_idcd"))
			.where("  and b.line_stat < 2	 																			")
			.where("order by b.invc_date desc, c.cstm_code																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");


		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																													")
		;
		data.param
			.where("from (																														")
			.where("select b.line_seqn, e.item_code, e.item_name, e.item_spec  																	")
			.where("     , d.ttsm_amnt, b.iomy_amnt																								")
			.where("     , '' as remk																											")
			.where("  from crdt_colt_mast a																							")
			.where("       left outer join crdt_colt_item b on b.invc_numb = a.invc_numb														")
			.where("       left outer join sale_mast c on c.invc_numb = b.orig_invc_numb														")
			.where("       left outer join sale_item d on d.invc_numb = c.invc_numb and d.line_seqn = b.orig_invc_seqn							")
			.where("       left outer join item_mast e on e.item_idcd = d.item_idcd																")
			.where(" where 1 = 1																												")
			.where("   and a.iomy_dvcd = '1'																									")	// 사업장
			.where("   and a.invc_numb = :invc_numb"   , arg.getParamText("invc_numb"))
			.where(") a																															")
			.where("order by a.line_seqn																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																													")
		;
		data.param
			.where("from (																														")
			.where("with sale as (																												")
			.where("   select a.invc_numb, b.line_seqn, b.sale_qntt, b.sale_pric, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt							")
			.where("     from sale_mast a																										")
			.where("          left outer join sale_item b on b.invc_numb = a.invc_numb															")
			.where("          left outer join acpt_mast c on c.invc_numb = b.acpt_numb															")
			.where("    where 1 = 1																												")
			.where("      and a.bzpl_idcd  = :bzpl_idcd"      , arg.getParamText("bzpl_idcd"))	// 사업장
			.where("      and a.invc_date >= :sale_date1"     , arg.getParamText("sale_date1")) // 매출기간
			.where("      and a.invc_date <= :sale_date2"     , arg.getParamText("sale_date2"))
			.where("      and a.cstm_idcd  = :cstm_idcd"      , arg.getParamText("cstm_idcd"))	// 거래처
			.where("      and c.drtr_idcd  = :drtr_idcd"      , arg.getParamText("drtr_idcd"))	// 영업담당자
			.where("      and b.find_name like %:find_name% " , arg.getParameter("find_name"))
			.where("      and a.line_stat  < 2																									")
			.where("), colt as (																												")
			.where("   select a.invc_numb, b.line_seqn, sum(b.iomy_amnt) as iomy_amnt 															")
			.where("     from sale a																											")
			.where("          left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn				")
			.where("          left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb														")
			.where("    where 1 = 1																												")
			.where("      and c.iomy_dvcd = '1'																									")
			.where("      and c.line_stat < 2	 																								")
			.where("    group by a.invc_numb, b.line_seqn																						")
			.where(")																															")
			.where("select b.invc_date, c.cstm_code, c.cstm_name																				")
			.where("     , a.sale_amnt, a.vatx_amnt, a.ttsm_amnt, a.iomy_amnt, (a.ttsm_amnt - a.iomy_amnt) as npay_amnt							")
			.where("     , c.tele_numb, c.buss_numb, c.mail_addr, d.dept_name, e.user_name														")
			.where("     , a.invc_numb, a.line_seqn																								")
			.where("  from (																													")
			.where("        select a.invc_numb, sum(a.sale_amnt) as sale_amnt, sum(a.vatx_amnt) as vatx_amnt, sum(a.ttsm_amnt) as ttsm_amnt 	")
			.where("             , ifnull(b.iomy_amnt, 0) as iomy_amnt 																			")
			.where("             , group_concat(a.line_seqn) as line_seqn 																		")
			.where("          from sale a																										")
			.where("               left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn							")
			.where("         where 1 = 1																										")
			.where("           and a.ttsm_amnt > ifnull(b.iomy_amnt, 0)																			")
			.where("         group by a.invc_numb 																								")
			.where("       ) a																													")
			.where("       left outer join sale_mast b on b.invc_numb = a.invc_numb																")
			.where("       left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd																")
			.where("       left outer join dept_mast d on d.dept_idcd = b.dept_idcd																")
			.where("       left outer join user_mast e on e.user_idcd = b.drtr_idcd																")
			.where(") a																															")
			.where("order by a.invc_date desc, a.cstm_code																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String [] line_seqn = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("line_seqn"))) {
			 line_seqn = ((String)arg.getParameter("line_seqn")).split(",");
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																												")
		;
		data.param
		.where("from (																														")
		.where("with sale as (																												")
		.where("   select a.invc_numb, b.line_seqn, b.item_idcd, b.sale_qntt, b.sale_pric, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt			")
		.where("        , b.acpt_numb, b.acpt_seqn																							")
		.where("     from sale_mast a																										")
		.where("          left outer join sale_item b on b.invc_numb = a.invc_numb															")
		.where("    where 1 = 1																												")
		.where("      and a.invc_numb = :invc_numb"    	, arg.getParamText("invc_numb"))	// 사업장
		.where("      and b.line_seqn in (:line_seqn)"  , line_seqn)						// 매출기간
		.where("), colt as (																												")
		.where("   select a.invc_numb, b.line_seqn, sum(b.iomy_amnt) as iomy_amnt 															")
		.where("     from sale a																											")
		.where("          left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn				")
		.where("          left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb														")
		.where("    where 1 = 1																												")
		.where("      and c.iomy_dvcd = '1'																									")
		.where("      and c.line_stat < 2	 																								")
		.where("    group by a.invc_numb, b.line_seqn																						")
		.where(")																															")
		.where("select a.line_seqn, b.item_code, b.item_name, b.item_spec																	")
		.where("     , a.sale_qntt, a.sale_pric, a.sale_amnt, a.vatx_amnt, a.ttsm_amnt, a.iomy_amnt											")
		.where("     , (a.ttsm_amnt - a.iomy_amnt) as npay_amnt																				")
		.where("     , concat(a.acpt_numb, '-', a.acpt_seqn) as remk																		")
		.where("  from (																													")
		.where("        select a.*, ifnull(b.iomy_amnt, 0) as iomy_amnt 																	")
		.where("          from sale a																										")
		.where("               left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn							")
		.where("         where 1 = 1																										")
		.where("           and a.ttsm_amnt > ifnull(b.iomy_amnt, 0)																			")
		.where("       ) a																													")
		.where("       left outer join item_mast b on b.item_idcd = a.item_idcd																")
		.where(") a																															")
		.where("order by a.line_seqn																										")
	;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		// 삼정 - 수금등록 시 업체별 웕계로 표시되도록 처리
		data.param
			.query("with cte as (																																")
			.query("  select a.cstm_idcd, a.invc_date, a.invc_numb, b.line_seqn, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt, b.invc_type								")
			.query("    from sale_mast a																														")
			.query("         left outer join sale_item b on b.invc_numb = a.invc_numb																			")
			.query("   where 1 = 1																																")
			.query("     and json_value(b.json_data, '$.trns_date') is null																						")
			.query("     and a.invc_date  >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.query("     and a.invc_date  <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.query("     and a.cstm_idcd   = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.query("     and a.line_stat < 2																													")
			.query("  union all																																	")
			.query("  select a.cstm_idcd, a.invc_date, a.invc_numb, b.line_seqn, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt, b.invc_type								")
			.query("    from sale_mast a																														")
			.query("         left outer join sale_item b on b.invc_numb = a.invc_numb																			")
			.query("   where 1 = 1																																")
			.query("     and json_value(b.json_data, '$.trns_date')  >= :invc_date3       " , arg.getParamText("invc_date1" ))
			.query("     and json_value(b.json_data, '$.trns_date')  <= :invc_date4       " , arg.getParamText("invc_date2" ))
			.query("     and a.cstm_idcd   = :cstm_idcd2        " , arg.getParamText("cstm_idcd"  ))
			.query("     and a.line_stat < 2																													")
			.query("), sale as (																																")
			.query("  select a.cstm_idcd, substr(a.invc_date, 1, 6) as invc_date																				")
			.query("       , sum(a.sale_amnt) as sale_amnt, sum(a.vatx_amnt) as vatx_amnt, sum(a.ttsm_amnt) as ttsm_amnt										")
			.query("    from cte a																																")
			.query("   where 1 = 1																																")
//			.query("     and a.invc_type = 'SALE'																												")
			.query("    group by a.cstm_idcd, substr(a.invc_date, 1, 6)																							")
			.query("), sale_colt as (																															")
			.query("  select a.cstm_idcd, substr(a.invc_date, 1, 6) as invc_date																				")
			.query("       , sum(a.iomy_amnt) as unpaid																											")
			.query("       , group_concat(distinct a.invc_numb) as sale_invc_numb																				")
			.query("    from (																																	")
			.query("          select a.invc_numb, a.line_seqn, a.cstm_idcd, a.invc_date, (a.ttsm_amnt - ifnull(sum(b.iomy_amnt), 0)) as iomy_amnt				")
			.query("            from cte a																														")
			.query("                 left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn and b.line_stat < 2	")
			.query("                 left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb																")
			.query("           where 1 = 1																														")
			.query("             and a.invc_type = 'SALE'																										")
			.query("           group by a.invc_numb ,a.line_seqn																								")
			.query("         ) a																																")
			.query("   group by a.cstm_idcd, substr(a.invc_date, 1, 6)																							")
			.query("), rett_colt as (																															")
			.query("  select a.cstm_idcd, substr(a.invc_date, 1, 6) as invc_date																				")
			.query("       , sum(a.iomy_amnt) * -1 as rett_unpaid																								")
			.query("       , group_concat(distinct a.invc_numb) as rett_invc_numb																				")
			.query("    from (																																	")
			.query("          select a.invc_numb, a.line_seqn, a.cstm_idcd, a.invc_date, (a.ttsm_amnt - ifnull(sum(b.iomy_amnt), 0)) as iomy_amnt				")
			.query("            from cte a																														")
			.query("                 left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn and b.line_stat < 2	")
			.query("                 left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb																")
			.query("           where 1 = 1																														")
			.query("             and a.invc_type = 'RETT'																										")
			.query("           group by a.invc_numb ,a.line_seqn																								")
			.query("         ) a																																")
			.query("   group by a.cstm_idcd, substr(a.invc_date, 1, 6)																							")
			.query(")																																			")
			.query("select a.cstm_idcd, a.invc_date, d.cstm_code, d.cstm_name																					")
			.query("     , a.sale_amnt, a.vatx_amnt, a.ttsm_amnt, b.unpaid, c.rett_unpaid, sale_invc_numb, rett_invc_numb										")
			.query("     , concat(substr(a.invc_date, 1, 4), '.', substr(a.invc_date, 5, 2), '월계') as remk_text													")
			.query("  from sale a																																")
			.query("       left outer join sale_colt b on b.cstm_idcd = a.cstm_idcd and b.invc_date = a.invc_date												")
			.query("       left outer join rett_colt c on c.cstm_idcd = a.cstm_idcd and c.invc_date = a.invc_date												")
			.query("       left outer join cstm_mast d on d.cstm_idcd = a.cstm_idcd																				")
			.query(" where 1 = 1																																")
			.query("   and b.unpaid > 0																															")
			.query(" order by a.cstm_idcd, a.invc_date																											")
		;

		/*
		data.param
			.query("with sale as (																						")
			.query("select a.invc_date, a.cstm_idcd, b.* 																")
			.query("  from sale_mast a 																					")
			.query("       inner join sale_item b on b.invc_numb = a.invc_numb 											")
			.query(" where 1 = 1 																						")
			.query("   and a.cstm_idcd   = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.query("   and a.invc_date  >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.query("   and a.invc_date  <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.query("   and a.line_stat < 2																				")
			.query("   and a.line_clos = 0																				")
			.query("), colt as ( ")
			.query("select a.orig_invc_numb, a.orig_invc_seqn, sum(a.iomy_amnt) as iomy_amnt 							")
			.query("  from crdt_colt_item a ")
			.query("       inner join sale b on b.invc_numb = a.orig_invc_numb and b.line_seqn = a.orig_invc_seqn 		")
			.query("  where 1 = 1 ")
			.query("    and a.iomy_dvcd = '1' ")
			.query("  group by a.orig_invc_numb, a.orig_invc_seqn ")
			.query(") ")
			.query("select min(a.invc_numb) as invc_numb	 															")
			.query("     , sum(a.sale_pric) as sale_pric, a.invc_date													")
			.query("     , sum(a.sale_amnt) as sale_amnt, sum(a.vatx_amnt) as vatx_amnt									")
			.query("     , sum(a.ttsm_amnt) as ttsm_amnt, a.user_memo, a.sale_unit										")
			.query("     , a.cstm_idcd, c.cstm_code, c.cstm_name														")
			.query("     , (ifnull(sum(a.ttsm_amnt),0) - ifnull(sum(b.iomy_amnt),0)) as unpaid							")
			.query("  from sale a																						")
			.query("       left outer join colt b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn 	")
			.query("       left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd 									")
			.query(" group by a.cstm_idcd 																				")
			.query("having unpaid > 0 																					")
			.query(" order by a.cstm_idcd																				")
		;
		*/

		/*
		data.param
			.query("select min(a.invc_numb) as invc_numb              , t.cstm_code  									")
			.query("     , sum(b.sale_pric) as sale_pric              , t.cstm_name   , a.invc_date						")
			.query("     , sum(b.sale_amnt) as sale_amnt              , sum(b.vatx_amnt) as vatx_amnt					")
			.query("     , sum(b.ttsm_amnt) as ttsm_amnt              , b.user_memo   , b.sale_unit						")
			.query("     , a.cstm_idcd																					")
			.query("     , (ifnull(sum(b.ttsm_amnt),0) - ifnull(sum(c.iomy_amnt),0)) as unpaid							")


			.where("from sale_mast  a																					")
			.where("inner join sale_item           b  on a.invc_numb = b.invc_numb										")
			.where("left outer join cstm_mast      t  on t.cstm_idcd = a.cstm_idcd										")
			.where("left outer join crdt_colt_item c  on b.invc_numb = c.orig_invc_numb and b.line_seqn = c.orig_invc_seqn and c.iomy_dvcd = '1'	")
			.where("where 1=1																							")
			.where("and a.cstm_idcd   = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.where("and a.invc_date  >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and a.invc_date  <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and a.line_stat < 2																					")
			.where("and a.line_clos = 0																					")
			.where("group by a.cstm_idcd																				")
			.where("having unpaid > 0																					")
			.where("order by a.cstm_idcd																				")
		;
		*/

		return data.selectForMap();

	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();

		String param = trans.TranslateRowRec(map,"crte_idcd,iomy_date,expr_date,publ_date,drtr_idcd,stot_dvcd,paym_bank_name,stot_bass", "cstm_idcd,iomy_amnt,sale_invc_date,remk_text,sale_invc_numb,rett_invc_numb,rett_unpaid,invc_date1,invc_date2");

		data.param
			.query("call crdt_colt_insert(")
			.query("    :param",param)
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row : map) {
			// 23.12.14 - 이강훈 - 어음수금의 경우 삭제 시 현금입금이 된 경우 삭제할 수 없도록 처리
			if ("4".equals(row.getParameter("stot_dvcd"))) {
				data.param
					.where("select count(a.invc_numb) as count			")
					.where("from   note_iomy_mast a						")
					.where("where  1=1									")
					.where("and    a.iomy_dvcd = '1'					")
					.where("and    a.invc_numb = :invc_numb1	" , row.getParamText("invc_numb"))
				;
				int count = Integer.parseInt(data.selectForRow().getParamText("count"));
				if (count != 0) {
					throw new ServiceException("어음이 입금되어  수금을 삭제를 할 수 없습니다.");
				}
			}
			data.clear();
			data.param
				.query("update sale_mast set line_clos = 0													")
				.query(" where invc_numb in ( select orig_invc_numb 										")
				.query("                        from crdt_colt_item											")
				.query("                       where invc_numb = :invc_numb2" , row.fixParameter("invc_numb") )
				.query("                         and orig_invc_numb is not null								")
				.query("                       group by orig_invc_numb )									")
			;
			data.attach(Action.direct);

			data.param
				.table("crdt_colt_mast")
				.where("where invc_numb = :invc_numb3 ")

				.unique("invc_numb3"		, row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);

			data.param
				.table("crdt_colt_item")
				.where("where invc_numb = :invc_numb4 ")

				.unique("invc_numb4"		, row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
		}

		data.execute();
		return null;
	}
}
