package com.sky.system.custom.aone.sale.order.sorderList2;
import com.sky.barobill.BaroBillService; // static key
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baroservice.api.taxinvoice.Tests;
import com.baroservice.ws.TaxInvoiceStateEX;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("aone.sale.order.SorderList2Service")
public class SorderList2Service  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence;

	public SqlResultMap getSearch0(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  																		")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select   i.invc_numb     , i.amnd_degr     , i.bzpl_idcd     , i.invc_date     , i.orig_invc_numb	")
			.where("       , i.ordr_dvcd     , i.cstm_idcd     , i.cofm_yorn     , i.cofm_dttm     , i.acpt_stat_dvcd	")
			.where("       , i.line_stat     , i.line_clos     , acpt_case_name											")
			.where("       , a.item_idcd         																		")
			.where("       , a.invc_qntt     , a.invc_pric     , a.sply_amnt     , a.vatx_amnt     , a.invc_amnt		")
			.where("       , a.deli_date     , a.line_seqn																")
			.where("       , a.ostt_qntt																				")
			.where("       , IFNULL(a.invc_qntt,0)-IFNULL(a.ostt_qntt,0) as upid_qntt									")
			.where("       , c.cstm_code     , c.cstm_name 																")
			.where("       , t.item_code     , t.item_name     , t.item_spec											")
			.where("       , @curRank:=@curRank+1 as rank          														")
			.where("from   acpt_item a																					")
			.where("left   outer join acpt_mast      i  on a.invc_numb = i.invc_numb									")
			.where("left   outer join cstm_mast      c  on i.cstm_idcd = c.cstm_idcd									")
			.where("left   outer join item_mast      t  on a.item_idcd = t.item_idcd									")
			.where(",(select @curRank:=0) r																				")
			.where("where  1 = 1																						")
			.where("and    ifnull(i.ordr_dvcd,0) != '4000'																")
			.where("and    i.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    i.invc_date  >= :invc_date1				" , arg.getParamText("invc_date1"))
			.where("and    i.invc_date  <= :invc_date2				" , arg.getParamText("invc_date2"))
			.where("and    i.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    i.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("and    i.acpt_stat_dvcd not in ('0010', '0600')														")
			.where("and    a.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("and    i.line_clos  <> 1																			") 	// 마감된건 제외
			.where("and    i.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))					//발주상태
			.where("and    i.line_stat  < :line_stat				" , "2", "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb desc, a.line_seqn																")
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select  count(1) as maxsize  															")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("with acpt as(																			")
			.where("     select i.invc_date, a.invc_qntt, a.invc_amnt, weekofyear(i.invc_date) as invc_week	")
			.where("     from   acpt_item a																	")
			.where("            left outer join acpt_mast i  on a.invc_numb = i.invc_numb					")
			.where("     where  1 = 1																		")
			.where("     and    i.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("     and    i.invc_date  >= :invc_date1				" , arg.getParamText("invc_date1"))
			.where("     and    i.invc_date  <= :invc_date2				" , arg.getParamText("invc_date2"))
			.where("     and    i.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("     and    i.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("     and    a.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("     and    i.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))				//발주상태
			.where("     and    i.line_stat  < :line_stat				" , "2", "".equals(arg.getParamText("line_stat" )))
			.where("     and    i.line_clos  <> 1															") 				//마감된건 제외
			.where("     and    ifnull(i.ordr_dvcd, 0) != '4000'											")
		//	.where("     and    i.acpt_stat_dvcd not in ('0010', '0600')									")
			.where(")																						")
			.where("select invc_date																		")
			.where("     , sum(day_qntt)   as day_qntt,   sum(day_amnt)   as day_amnt						")
			.where("     , sum(week_qntt)  as week_qntt,  sum(week_amnt)  as week_amnt						")
			.where("     , sum(month_qntt) as month_qntt, sum(month_amnt) as month_amnt						")
			.where("     , concat(substr(_utf8'일월화수목금토',DAYOFWEEK(a.invc_date),1),'요일') as week			")
			.where("from (																					")
			.where("      select invc_date																	")
			.where("           , sum(invc_qntt) as day_qntt, sum(invc_amnt) as day_amnt						")
			.where("           , 0 as week_qntt , 0 as week_amnt											")
			.where("           , 0 as month_qntt , 0 as month_amnt											")
			.where("      from acpt a																		")
			.where("      group by invc_date																")
			.where("      union all																			")
			.where("      select invc_date																	")
			.where("           , 0 as day_qntt , 0 as day_amnt												")
			.where("           , (select sum(invc_qntt) from acpt r where a.invc_week = r.invc_week and r.invc_date <=a.invc_date) as week_qntt	")
			.where("           , (select sum(invc_amnt) from acpt r where a.invc_week = r.invc_week and r.invc_date <=a.invc_date) as week_amnt	")
			.where("           , 0 as month_qntt , 0 as month_amnt											")
			.where("      from acpt a																		")
			.where("      group by invc_date																")
			.where("      union all																			")
			.where("      select invc_date																	")
			.where("           , 0 as day_qntt,  0 as day_amnt												")
			.where("           , 0 as week_qntt, 0 as week_amnt												")
			.where("           , avg(month_qntt) as month_qntt, avg(month_amnt) as month_amnt				")
			.where("      from (																			")
			.where("            select invc_date															")
			.where("                 , sum(invc_qntt) over (order by invc_date asc) as month_qntt			")
			.where("                 , sum(invc_amnt) over (order by invc_date asc) as month_amnt			")
			.where("            from acpt																	")
			.where("            order by invc_date asc														")
			.where("           ) a																			")
			.where("      group by invc_date																")
			.where(") a																						")
			.where("group by invc_date																		")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select  count(1) as maxsize  															")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("with summ as(																			")
			.where("     select a.cstm_idcd																	")
			.where("          , ifnull(sum(b.invc_qntt),0) as invc_qntt										")
			.where("          , ifnull(sum(b.invc_amnt),0) as invc_amnt								")
			.where("     from   acpt_mast a																	")
			.where("            left outer join acpt_item b  on b.invc_numb = a.invc_numb					")
			.where("     where  1 = 1																		")
			.where("     and    a.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("     and    a.invc_date  >= DATE_FORMAT(LAST_DAY(now()-interval 1 month) + interval 1 day,'%Y%m%d')")
			.where("     and    a.invc_date  <= DATE_FORMAT(LAST_DAY(now()),'%Y%m%d')						")
			.where("     and    a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("     and    a.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("     and    b.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("     and    a.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))				//발주상태
			.where("     and    a.line_stat  < :line_stat1				" , "2", "".equals(arg.getParamText("line_stat" )))
			.where("     and    a.line_clos  <> 1															") 				//마감된건 제외
			.where("     and    ifnull(a.ordr_dvcd, 0) != '4000'											")
		//	.where("     and    a.acpt_stat_dvcd not in ('0010', '0600')									")
			.where("     group by a.cstm_idcd								")
			.where("),																						")
			.where("acpt as(")
			.where("     select a.cstm_idcd	")
			.where("          , ifnull(sum(b.invc_qntt),0) as invc_qntt										")
			.where("          , ifnull(sum(b.invc_amnt),0) as invc_amnt										")
			.where("     from   acpt_mast a																	")
			.where("            left outer join acpt_item b  on b.invc_numb = a.invc_numb					")
			.where("     where  1 = 1																		")
			.where("     and    a.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("     and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc_date1"))
			.where("     and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc_date2"))
			.where("     and    a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("     and    a.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("     and    b.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("     and    a.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))				//발주상태
			.where("     and    a.line_stat  < :line_stat2				" , "2", "".equals(arg.getParamText("line_stat" )))
			.where("     and    a.line_clos  <> 1															") 				//마감된건 제외
			.where("     and    ifnull(a.ordr_dvcd, 0) != '4000'											")
		//	.where("     and    a.acpt_stat_dvcd not in ('0010', '0600')									")
			.where("     group by a.cstm_idcd								")
			.where(")								")
			.where("select a.cstm_idcd																		")
			.where("     , c.cstm_name ")
			.where("     , a.invc_qntt as invc_qntt						")
			.where("     , a.invc_amnt as invc_amnt						")
			.where("     , b.invc_qntt as month_qntt					")
			.where("     , b.invc_amnt as month_amnt				")
			.where("from acpt a ")
			.where("     left outer join summ b on b.cstm_idcd = a.cstm_idcd ")
			.where("     left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd" )
			.where("order by c.cstm_name     																		")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total("select  count(1) as maxsize  															")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("with summ as(																			")
			.where("     select b.item_idcd																	")
			.where("          , ifnull(sum(b.invc_qntt),0) as invc_qntt										")
			.where("          , ifnull(sum(b.invc_amnt),0) as invc_amnt								")
			.where("     from   acpt_mast a																	")
			.where("            left outer join acpt_item b  on b.invc_numb = a.invc_numb					")
			.where("     where  1 = 1																		")
			.where("     and    a.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("     and    a.invc_date  >= DATE_FORMAT(LAST_DAY(now()-interval 1 month) + interval 1 day,'%Y%m%d')")
			.where("     and    a.invc_date  <= DATE_FORMAT(LAST_DAY(now()),'%Y%m%d')						")
			.where("     and    a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("     and    a.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("     and    b.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("     and    a.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))				//발주상태
			.where("     and    a.line_stat  < :line_stat1				" , "2", "".equals(arg.getParamText("line_stat" )))
			.where("     and    a.line_clos  <> 1															") 				//마감된건 제외
			.where("     and    ifnull(a.ordr_dvcd, 0) != '4000'											")
		//	.where("     and    a.acpt_stat_dvcd not in ('0010', '0600')									")
			.where("     group by b.item_idcd								")
			.where("),																						")
			.where("acpt as(")
			.where("     select b.item_idcd	")
			.where("          , ifnull(sum(b.invc_qntt),0) as invc_qntt										")
			.where("          , ifnull(sum(b.invc_amnt),0) as invc_amnt										")
			.where("     from   acpt_mast a																	")
			.where("            left outer join acpt_item b  on b.invc_numb = a.invc_numb					")
			.where("     where  1 = 1																		")
			.where("     and    a.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("     and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc_date1"))
			.where("     and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc_date2"))
			.where("     and    a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("     and    a.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("     and    b.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("     and    a.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))				//발주상태
			.where("     and    a.line_stat  < :line_stat2				" , "2", "".equals(arg.getParamText("line_stat" )))
			.where("     and    a.line_clos  <> 1															") 				//마감된건 제외
			.where("     and    ifnull(a.ordr_dvcd, 0) != '4000'											")
		//	.where("     and    a.acpt_stat_dvcd not in ('0010', '0600')									")
			.where("     group by b.item_idcd								")
			.where(")								")
			.where("select a.item_idcd																		")
			.where("     , c.item_code, c.item_name, c.item_spec ")
			.where("     , a.invc_qntt as invc_qntt						")
			.where("     , a.invc_amnt as invc_amnt						")
			.where("     , b.invc_qntt as month_qntt					")
			.where("     , b.invc_amnt as month_amnt				")
			.where("from acpt a ")
			.where("     left outer join summ b on b.item_idcd = a.item_idcd ")
			.where("     left outer join item_mast c on c.item_idcd = a.item_idcd" )
			.where("order by c.item_name     																		")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  																		")
	;
	data.param
		.query("select *																							")
	;
	data.param
		.where("from (																								")
		.where("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
		.where("        , a.ostt_qntt      , a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd		")
		.where("        , a.optn_psbl_yorn , a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric	")
		.where("        , a.invc_qntt      , a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt		")
		.where("        , a.vatx_amnt      , a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt	")
		.where("        , a.stnd_unit      , a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date		")
		.where("        , a.dlvy_date      , a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt		")
		.where("        , a.dlvy_memo      , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo		")
		.where("        , a.prnt_idcd      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos		")
		.where("        , a.find_name      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd		")
		.where("        , a.updt_urif      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd		")
		.where("        , i.item_spec      , i.modl_name      , u.unit_name      , a.cstm_lott_numb						")
		.where("        , a.crte_urif      , b.invc_date      , c.cstm_name      , i.item_code      , i.item_name		")
		.where("        , IFNULL(a.invc_qntt,0)- IFNULL(a.dsct_qntt,0) - IFNULL(a.ostt_qntt,0) as qntt					")
		.where("from   acpt_item a																						")
		.where("       left outer join acpt_mast b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr			")
		.where("       left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd											")
		.where("       left outer join item_mast i on i.item_idcd = a.item_idcd											")
		.where("       left outer join unit_mast u on u.unit_code = i.unit_idcd											")
		.where("where  1 = 1																							")
		.where("and    ifnull(b.ordr_dvcd,0) != '4000'																	")
		.where("and    b.find_name	like %:find_name%			" , arg.getParamText("find_name"))
		.where("and    b.invc_date	=:invc_date					" , arg.getParamText("invc_date"))
		.where("and    b.invc_date  >= :invc_date1				" , arg.getParamText("invc_date1"))
		.where("and    b.invc_date  <= :invc_date2				" , arg.getParamText("invc_date2"))
		.where("and    b.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
		.where("and    b.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
		//.where("and    b.acpt_stat_dvcd not in ('0010', '0600')														")
		.where("and    a.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
		.where("and    b.line_clos  <> 1																			") 	// 마감된건 제외
		.where("and    b.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))					//발주상태
		.where("and    b.line_stat  < :line_stat				" , "2", "".equals(arg.getParamText("line_stat" )))
		.where("order by a.invc_numb desc, a.line_seqn																")
		.where(") a																									")
	;
	if (page == 0 && rows == 0){
		return data.selectForMap(sort);
	} else {
		return data.selectForMap(page, rows, (page==1), sort );
	}
	}
}
