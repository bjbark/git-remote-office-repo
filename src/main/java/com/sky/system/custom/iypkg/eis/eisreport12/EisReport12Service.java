package com.sky.system.custom.iypkg.eis.eisreport12;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class EisReport12Service extends DefaultServiceHandler {

	// 거래처별 월 원단 매입 통계
	public SqlResultMap search1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from(																								")
			.where("  select  a.wkct_idcd        , a.wkct_name        , a.wkct_code       , a.istt_amnt					")
			.where("        , a.istt_qntt        , a.invc_date        , c.cstm_idcd       , c.cstm_name					")
			.where("  from cstm_mast c																					")
			.where("  left outer join (																					")
			.where("    select  w.wkct_idcd     , w.wkct_name     , c.cstm_idcd     , c.cstm_name						")
			.where("          , sum(a.istt_amnt) as istt_amnt     , sum(a.istt_qntt) as istt_qntt						")
			.where("          , b.invc_date     , w.wkct_code															")
			.where("    from purc_istt_item a																			")
			.where("    left outer join purc_istt_mast b on a.invc_numb = b.invc_numb									")
			.where("    left outer join boxx_acpt_bop  p on json_value(a.json_data , '$**.acpt_numb') = p.invc_numb		")
			.where("                                    and json_value(a.json_data , '$**.acpt_seqn') = p.line_seqn		")
			.where("    left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd									")
			.where("    left outer join wkct_mast      w on p.wkct_idcd = w.wkct_idcd									")
			.where("    where 1=1																						")
			.where("    and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
			.where("    group by  b.cstm_idcd, p.wkct_idcd																")
			.where("  ) a on a.cstm_idcd = c.cstm_idcd																	")
			.where("  where 1=1																							")
			.where("  and c.otod_cstm_yorn = 1																			")
			.where("  and c.find_name  like %:find_name1%			" , arg.getParamText("find_name" ))
			.where("  order by c.cstm_idcd																				")
			.where(") a																									")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	public SqlResultMap detail1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																			")
		;

		data.param
			.query("with cte as(																						")
			.query("   select  p.wkct_idcd      , w.wkct_name      , b.cstm_idcd      , c.cstm_name						")
			.query("         , sum(a.istt_amnt) as istt_amnt       , sum(a.istt_qntt) as istt_qntt						")
			.query("         , b.invc_date      , substr(b.invc_date,5,2) as invc_month									")
			.query("   from purc_istt_item a																			")
			.query("   left outer join purc_istt_mast b on a.invc_numb = b.invc_numb									")
			.query("   left outer join cstm_mast c      on b.cstm_idcd = c.cstm_idcd									")
			.query("   left outer join boxx_acpt_bop  p on json_value(a.json_data , '$**.acpt_numb') = p.invc_numb		")
			.query("                                   and json_value(a.json_data , '$**.acpt_seqn') = p.line_seqn		")
			.query("   left outer join wkct_mast      w on p.wkct_idcd = w.wkct_idcd									")
			.query("   where 1=1																						")
			.query("   and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
			.query("   and p.wkct_idcd = :wkct_idcd				" , arg.getParameter("wkct_idcd"))
			.query("   and b.cstm_idcd = :cstm_idcd				" , arg.getParameter("cstm_idcd"))
			.query("   group by p.wkct_idcd, b.cstm_idcd ,substr(b.invc_date,5,2)										")
			.query(")																									")

			.query("select 1 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '01') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '01') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 2 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '02') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '02') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 3 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '03') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '03') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 4 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '04') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '04') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 5 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '05') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '05') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 6 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '06') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '06') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 7 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '07') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '07') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 8 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '08') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '08') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 9 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '9') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '9') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 10 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '10') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '10') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 11 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '11') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '11') as istt_qntt					")
			.query("from dual																							")

			.query("union all																							")
			.query("select 12 as 'mm'																					")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '12') as istt_amnt					")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '12') as istt_qntt					")
			.query("from dual																							")
		;

		return data.selectForMap();

		}

	// 거래처별 월 매입 통계
	public SqlResultMap search2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																				")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("   select  c.cstm_idcd    , c.cstm_name    , a.invc_date    , a.istt_amnt    , a.istt_qntt				")
			.where("   from cstm_mast c																						")
			.where("   left outer join (																					")
			.where("      select  c.cstm_idcd    , c.cstm_name    , b.invc_date												")
			.where("            , sum(a.istt_amnt) as istt_amnt   , sum(a.istt_qntt) as istt_qntt							")
			.where("      from purc_istt_item a																				")
			.where("      left outer join purc_istt_mast b on a.invc_numb = b.invc_numb										")
			.where("      left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd										")
			.where("      left outer join product_mast   p on a.item_idcd = p.prod_idcd										")
			.where("      where 1=1																							")
			.where("      and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
			.where("      group by c.cstm_idcd																				")
			.where("    ) a on a.cstm_idcd = c.cstm_idcd																	")
			.where("   where 1=1																							")
			.where("   and c.puch_cstm_yorn = '1'																			")
			.where("   and c.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("   order by c.cstm_idcd																					")
			.where(") a																										")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	public SqlResultMap detail2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																					")
		;

		data.param // 집계문  입력
			.query("with cte as(																								")
			.query("   select  c.cstm_idcd    , c.cstm_name    , b.invc_date     , substr(b.invc_date,5,2) as invc_month		")
			.query("         , sum(a.istt_amnt) as istt_amnt   , sum(a.istt_qntt) as istt_qntt									")
			.query("   from purc_istt_item a																					")
			.query("   left outer join purc_istt_mast b on a.invc_numb=b.invc_numb												")
			.query("   left outer join cstm_mast c on a.cstm_idcd=c.cstm_idcd													")
			.query("   left outer join product_mast p on a.item_idcd=p.prod_idcd												")
			.query("   where 1=1																								")
			.query("   and substr(b.invc_date,1,4) = :plan_year	" , arg.getParamText("plan_year"))
			.query("   and b.cstm_idcd = :cstm_idcd				" , arg.getParameter("cstm_idcd"))
			.query("   and c.find_name  like %:find_name%		" , arg.getParamText("find_name"))
			.query("   group by substr(b.invc_date,5,2)																			")
			.query(")																											")

			.query("select 1 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '01') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '01') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 2 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '02') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '02') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 3 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '03') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '03') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 4 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '04') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '04') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 5 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '05') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '05') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 6 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '06') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '06') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 7 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '07') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '07') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 8 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '08') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '08') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 9 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '9') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '9') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 10 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '10') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '10') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 11 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '11') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '11') as istt_qntt							")
			.query("from dual																									")

			.query("union all																									")
			.query("select 12 as 'mm'																							")
			.query("	 , (select sum(a.istt_amnt) from cte a where a.invc_month = '12') as istt_amnt							")
			.query("	 , (select sum(a.istt_qntt) from cte a where a.invc_month = '12') as istt_qntt							")
			.query("from dual																									")
		;

		return data.selectForMap() ;
	}

}
