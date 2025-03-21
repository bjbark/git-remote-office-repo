package com.sky.system.custom.iypkg.eis.eisreport11;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service
public class EisReport11Service extends DefaultServiceHandler {

	// 거래처별 월 원단 매입 통계
	public SqlResultMap search1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																								")
		;
		data.param
			.query("select *																												")
		;
		data.param
			.where("from (																													")
			.where("select  a.invc_numb     , a.invc_date     , c.cstm_idcd																	")
			.where("      , c.cstm_name     , a.sw_code       , a.dw_code       , a.istt_amnt												")
			.where("from cstm_mast c																										")
			.where("left outer join (																										")
			.where("     select  a.invc_numb    , b.invc_date    , c.cstm_idcd																")
			.where("            , c.cstm_name    , sum(a.ttsm_amnt) as istt_amnt															")
			.where("            , ifnull(sum(case when f.ppkd_dvcd = '1' or f.ppkd_dvcd =  '5' then a.ttsm_amnt end),0) as 'sw_code'						")
			.where("            , ifnull(sum(case when f.ppkd_dvcd = '2' or f.ppkd_dvcd =  '3' or f.ppkd_dvcd = '4' then a.ttsm_amnt end),0) as 'dw_code'	")
			.where("     from cstm_mast c																									")
			.where("     left outer join purc_istt_item a on a.cstm_idcd=c.cstm_idcd														")
			.where("     left outer join purc_istt_mast b on a.invc_numb=b.invc_numb														")
			.where("     inner join fabc_mast f on a.item_idcd=f.fabc_idcd																	")
			.where("     where 1=1																											")
			.where("     and substr(b.invc_date,1,4) = :plan_year1	" , arg.getParamText("plan_year"))
			.where("     group by c.cstm_idcd 																								")
			.where(") a on a.cstm_idcd=c.cstm_idcd																							")
			.where("where 1=1																												")
			.where(" and c.find_name  like %:find_name1%			" , arg.getParamText("find_name" ))
			.where(" and c.puch_cstm_yorn = '1'																								")

//			.where("union all																												")
//			.where("select  '999999' as invc_numb           , null as invc_date																")
//			.where("      , '999999' as cstm_idcd           , '합계' as cstm_name																")
//			.where("      , sum(a.sw_code) as sw_code       , sum(a.dw_code) as dw_code														")
//			.where("      , sum(a.istt_amnt) as istt_amnt   , 2 as rnum																		")
//			.where("from cstm_mast c																										")
//			.where("left outer join (																										")
//			.where("				select  a.invc_numb    , b.invc_date    , c.cstm_idcd													")
//			.where("					  , c.cstm_name    , sum(a.istt_amnt) as istt_amnt													")
//			.where("					  , ifnull(sum(case when f.ppkd_dvcd = '1' and '5' then a.istt_amnt end),0) as 'sw_code'			")
//			.where("					  , ifnull(sum(case when f.ppkd_dvcd = '2' and '3' and '4' then a.istt_amnt end),0) as 'dw_code'	")
//			.where("				from cstm_mast c																						")
//			.where("				left outer join purc_istt_item a on a.cstm_idcd=c.cstm_idcd												")
//			.where("				left outer join purc_istt_mast b on a.invc_numb=b.invc_numb												")
//			.where("				inner join fabc_mast f on a.item_idcd=f.fabc_idcd														")
//			.where("				where 1=1																								")
//			.where("					and substr(b.invc_date,1,4) = :plan_year2	" , arg.getParamText("plan_year"))
//			.where("				group by c.cstm_idcd																					")
//			.where("				) a on a.cstm_idcd=c.cstm_idcd																			")
//			.where("where 1=1 																												")
//			.where("	and c.find_name  like %:find_name2%			" , arg.getParamText("find_name" ))
//			.where("group by cstm_idcd, rnum																								")
			.where("order by cstm_idcd ) a																									")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	public SqlResultMap detail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String result = "";
		ParamToJson translate = new ParamToJson();
		result = translate.TranslateProcedure(arg, "plan_year,cstm_idcd,type,sub,find_name");

		data.param // 집계문  입력
			.query("call purc_istt_stat_detail (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;

	}

	// 거래처별 월 매입 통계
	public SqlResultMap search2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																			")
		;

		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  c.cstm_idcd     , c.cstm_name     , a.invc_date     , a.istt_amnt     , a.invc_year			")
			.where("      , a.january       , a.february      , a.march         , a.april         , a.may				")
			.where("      , a.jun           , a.july          , a.august        , a.september     , a.october			")
			.where("      , a.novemeber     , a.december 																")
			.where("from cstm_mast c																					")
			.where("left outer join (																					")
			.where("     select  a.cstm_idcd    , a.cstm_name    , a.invc_date											")
			.where("           , a.invc_year    , sum(a.istt_amnt) as istt_amnt											")
			.where("           , ifnull(sum(case invc_date when '01' then istt_amnt end),0) as 'january'				")
			.where("           , ifnull(sum(case invc_date when '02' then istt_amnt end),0) as 'february'				")
			.where("           , ifnull(sum(case invc_date when '03' then istt_amnt end),0) as 'march'					")
			.where("           , ifnull(sum(case invc_date when '04' then istt_amnt end),0) as 'april'					")
			.where("           , ifnull(sum(case invc_date when '05' then istt_amnt end),0) as 'may'					")
			.where("           , ifnull(sum(case invc_date when '06' then istt_amnt end),0) as 'jun'					")
			.where("           , ifnull(sum(case invc_date when '07' then istt_amnt end),0) as 'july'					")
			.where("           , ifnull(sum(case invc_date when '08' then istt_amnt end),0) as 'august'					")
			.where("           , ifnull(sum(case invc_date when '09' then istt_amnt end),0) as 'september'				")
			.where("           , ifnull(sum(case invc_date when '10' then istt_amnt end),0) as 'october'				")
			.where("           , ifnull(sum(case invc_date when '11' then istt_amnt end),0) as 'novemeber'				")
			.where("           , ifnull(sum(case invc_date when '12' then istt_amnt end),0) as 'december'				")
			.where("     from (																							")
			.where("       select  c.cstm_idcd    , c.cstm_name															")
			.where("             , substr(b.invc_date,1,4) as invc_year													")
			.where("             , substr(b.invc_date,5,2) as invc_date													")
			.where("             , ifnull(sum(a.ttsm_amnt),0) as istt_amnt												")
			.where("       from cstm_mast c																				")
			.where("       left outer join purc_istt_item a on a.cstm_idcd=c.cstm_idcd									")
			.where("       left outer join purc_istt_mast b on a.invc_numb=b.invc_numb									")
			.where("       left outer join purc_ordr_mast p on a.orig_invc_numb = p.invc_numb							")
			.where("       where 1=1	 																				")
			.where("       and json_value(p.json_data , '$**.offr_path_dvcd') = 1										")
			.where("       and substr(b.invc_date,1,4) = :plan_year1	" , arg.getParamText("plan_year"))
			.where("       group by c.cstm_idcd, substr(b.invc_date,5,2)	 											")
			.where("       ) a	 																						")
			.where("    where  1=1																						")
			.where("    group by a.cstm_idcd																			")
			.where(")a on a.cstm_idcd=c.cstm_idcd																		")
			.where("where 1=1																							")
			.where("and c.puch_cstm_yorn = '1'																			")
			.where("and c.find_name  like %:find_name1%			" , arg.getParamText("find_name" ))
			.where("order by cstm_idcd ) a																				")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	// 월 거래처 매입 통계 차트
	public SqlResultMap chart2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.query("call istt_amnt_chart (							")
			.query("  :plan_year	",arg.fixParameter("plan_year"	))
			.query(" ,:cstm_idcd	",arg.fixParameter("cstm_idcd"	))
			.query(" )												")
		;

		return data.selectForMap() ;
	}

	// 월 거래처 매입 및 지급 통계 detail
	public SqlResultMap search3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String amnt = arg.getParamText("amnt");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																	")
		;

		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
		;
		// 거래명세서
		if(amnt.equals("거래명세서")){
			data.param // 집계문  입력
				.where("select c.cstm_idcd, c.cstm_name															")
				.where("	 , a.invc_date, a.invc_month, a.istt_amnt, a.amnt									")
				.where("from cstm_mast c																		")
				.where("left outer join(																		")
				.where("   select   c.cstm_idcd, c.cstm_name, b.invc_date										")
				.where("          , substr(b.invc_date,1,4) as invc_month										")
				.where("          , ifnull(sum(a.ttsm_amnt),0) as istt_amnt										")
				.where("          , ifnull(sum(cb.trns_bill_amnt),0) as amnt									")
				.where("   from cstm_mast c																		")
				.where("   left outer join purc_istt_item a on a.cstm_idcd=c.cstm_idcd							")
				.where("   left outer join purc_istt_mast b on a.invc_numb=b.invc_numb							")
				.where("   left outer join cstm_bond_init cb on a.cstm_idcd=cb.cstm_idcd						")
				.where("   left outer join purc_ordr_item p on p.invc_numb = a.orig_invc_numb and p.line_seqn = a.orig_seqn	")
				.where("   left outer join purc_ordr_mast p2 on p.invc_numb = p2.invc_numb						")
				.where("   where 1=1																			")
				.where("   and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
				.where("   and json_value(p2.json_data , '$**.offr_path_dvcd') = '1'							")
				.where("   group by c.cstm_idcd																	")
				.where("   ) a on a.cstm_idcd=c.cstm_idcd														")
				.where("where 1=1																				")
				.where(" and c.puch_cstm_yorn = '1'																")
				.where(" and c.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
				.where("group by cstm_idcd) a																	")
			;

		// 세금계산서
		}else {
			data.param // 집계문  입력
				.where("select c.cstm_idcd, c.cstm_name															")
				.where("	 , a.invc_date, a.invc_month , a.istt_amnt, a.amnt									")
				.where("from cstm_mast c																		")
				.where("left outer join(																		")
				.where("   select   c.cstm_idcd, c.cstm_name, b.invc_date										")
				.where("          , substr(b.invc_date,1,4) as invc_month										")
				.where("          , ifnull(sum(a.ttsm_amnt),0) as istt_amnt										")
				.where("          , ifnull(sum(cb.txbl_amnt),0) as amnt											")
				.where("   from cstm_mast c																		")
				.where("   left outer join purc_istt_item a on a.cstm_idcd=c.cstm_idcd							")
				.where("   left outer join purc_istt_mast b on a.invc_numb=b.invc_numb							")
				.where("   left outer join cstm_bond_init cb on a.cstm_idcd=cb.cstm_idcd						")
				.where("   left outer join purc_ordr_item p on p.invc_numb = a.orig_invc_numb and p.line_seqn = a.orig_seqn	")
				.where("   left outer join purc_ordr_mast p2 on p.invc_numb = p2.invc_numb						")
				.where("   where 1=1																			")
				.where("   and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
				.where("   and json_value(p2.json_data , '$**.offr_path_dvcd') = '1'							")
				.where("				group by c.cstm_idcd													")
				.where("				) a on a.cstm_idcd=c.cstm_idcd											")
				.where("where 1=1																				")
				.where(" and c.find_name  like %:find_name3%			" , arg.getParamText("find_name" ))
				.where(" and c.puch_cstm_yorn = '1'																")
				.where("group by cstm_idcd) a																	")
			;
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	// 월 거래처 매입 및 지급 통계
	public SqlResultMap detail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String amnt = arg.getParamText("amnt");
		String cstm_name = (String) arg.get("cstm_name");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																	")
		;

		if(amnt.equals("거래명세서")){
			data.param // 집계문  입력
				.query("select     c.cstm_name     , b.invc_date												")
				.query("         , ifnull((a.ttsm_amnt),0) as istt_amnt											")
				.query("         , ifnull((cb.trns_bill_amnt),0) as amnt										")
				.query("from purc_istt_item a																	")
				.query("left outer join purc_istt_mast b  on a.invc_numb=b.invc_numb							")
				.query("left outer join purc_ordr_item p  on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn	")
				.query("left outer join purc_ordr_mast m  on p.invc_numb=m.invc_numb							")
				.query("left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd							")
				.query("left outer join cstm_bond_init cb on a.cstm_idcd=cb.cstm_idcd							")
				.query("where 1=1																				")
				.query(" and json_value(m.json_data , '$**.offr_path_dvcd') = '1'								")
				.query(" and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
				.query(" and c.find_name  like %:find_name1%		" , arg.getParamText("find_name"))
			;
				if(!cstm_name.equals("합계")){
					data.param
						.query(" and c.cstm_idcd = :cstm_idcd		" , arg.getParameter("cstm_idcd"))
					;
				}

		}else if (amnt.equals("세금계산서")){
			data.param // 집계문  입력
				.query("select c.cstm_name, b.invc_date															")
				.query("	 , ifnull((a.ttsm_amnt),0) as istt_amnt												")
				.query("	 , ifnull((cb.txbl_amnt),0) as amnt													")
				.query("from purc_istt_item a																	")
				.query("left outer join purc_istt_mast b  on a.invc_numb=b.invc_numb							")
				.query("left outer join purc_ordr_item p  on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn	")
				.query("left outer join purc_ordr_mast m  on p.invc_numb=m.invc_numb							")
				.query("left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd							")
				.query("left outer join cstm_bond_init cb on a.cstm_idcd=cb.cstm_idcd							")
				.query("where 1=1																				")
				.query(" and json_value(m.json_data , '$**.offr_path_dvcd') = '1'								")
				.query(" and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
				.query(" and c.find_name  like %:find_name2%		" , arg.getParamText("find_name" ))
			;
				if(!cstm_name.equals("합계")){
					data.param
						.query("	and c.cstm_idcd = :cstm_idcd		" , arg.getParameter("cstm_idcd"))
					;
				}
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	// 월 거래처 매입 및 지급 통계
	public SqlResultMap chart3(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String amnt = arg.getParamText("amnt");
		String cstm_name = (String) arg.get("cstm_name");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																		")
		;

		if(amnt.equals("거래명세서")){
			data.param
				.query("with cte as(																				")
				.query("			select	  ifnull(sum(a.ttsm_amnt),0) as amnt									")
//				.query("			select	  ifnull(sum(cb.txbl_amnt),0) as amnt									")
				.query("					, substr(b.invc_date,5,2) as invc_month									")
				.query("					 , c.cstm_idcd    , c.cstm_name    , b.invc_date						")
				.query("					 , sum(a.istt_amnt) as istt_amnt   , sum(a.istt_qntt) as istt_qntt		")
				.query("			from purc_istt_item a															")
				.query("			left outer join purc_istt_mast b on a.invc_numb=b.invc_numb						")
				.query("			left outer join purc_ordr_item p on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn		")
				.query("			left outer join purc_ordr_mast m on p.invc_numb = m.invc_numb					")
				.query("			left outer join cstm_bond_init cb on a.cstm_idcd=cb.cstm_idcd					")
				.query("			left outer join cstm_mast c on a.cstm_idcd=c.cstm_idcd							")
				.query("			where 1=1																		")
				.query("				and json_value(m.json_data , '$**.offr_path_dvcd') = '1'					")
				.query("				and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
				.query("				and c.find_name  like %:find_name2%			" , arg.getParamText("find_name" ))
			;
				if(!cstm_name.equals("합계")){
					data.param
						.query("	and a.cstm_idcd = :cstm_idcd					" , arg.getParameter("cstm_idcd"))
					;
				}
			data.param
				.query("			group by a.cstm_idcd															")
				.query("			)																				")

				.query("select 1 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '01'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 2 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '02'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 3 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '03'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 4 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '04'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 5 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '05'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 6 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '06'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 7 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '07'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 9 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '09'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 10 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '10'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 11 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '11'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 12 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '12'),0) as amnt										")
				.query("from dual																					")
			;
		}else{
			data.param
				.query("with cte as(																				")
				.query("			select	  ifnull(sum(a.ttsm_amnt),0) as amnt									")
				.query("					, substr(b.invc_date,5,2) as invc_month									")
				.query("			from purc_istt_item a															")
				.query("			left outer join purc_istt_mast b on a.invc_numb=b.invc_numb						")
				.query("			left outer join purc_ordr_item p on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn		")
				.query("			left outer join purc_ordr_mast m on p.invc_numb = m.invc_numb					")
				.query("			left outer join cstm_bond_init cb on a.cstm_idcd=cb.cstm_idcd					")
				.query("			left outer join cstm_mast c on a.cstm_idcd=c.cstm_idcd							")
				.query("			where 1=1																		")
				.query("				and json_value(m.json_data , '$**.offr_path_dvcd') = '1'					")
				.query("				and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
				.query("				and c.find_name  like %:find_name2%			" , arg.getParamText("find_name" ))
			;
				if(!cstm_name.equals("합계")){
					data.param
						.query("	and a.cstm_idcd = :cstm_idcd					" , arg.getParameter("cstm_idcd"))
					;
				}
			data.param
				.query("			group by a.cstm_idcd															")
				.query("			)																				")

				.query("select 1 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '01'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 2 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '02'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 3 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '03'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 4 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '04'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 5 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '05'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 6 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '06'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 7 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '07'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 9 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '09'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 10 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '10'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 11 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '11'),0) as amnt										")
				.query("from dual																					")

				.query("union all																					")

				.query("select 12 as 'mm'																			")
				.query("	 , ifnull((	select sum(a.amnt)															")
				.query("				from cte a																	")
				.query("				where a.invc_month = '12'),0) as amnt										")
				.query("from dual																					")
			;
		}

		return data.selectForMap() ;
	}
}
