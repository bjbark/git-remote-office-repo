package com.sky.system.custom.iypkg.eis.eisreport13;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service
public class EisReport13Service extends DefaultServiceHandler {

	public SqlResultMap search1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																					")
		;

		data.param
			.query("select *																									")
		;
		data.param
			.where("from(																										")
			.where("select    a.invc_numb     , m.invc_numb as acpt_numb           , b.cstm_idcd								")
			.where("        , c.cstm_name     , x.drtr_idcd      , u.user_name     , sum(a.ttsm_amnt) as ttsm_amnt				")
			.where("        , ifnull(sum(case when f.ppkd_dvcd = '1' or f.ppkd_dvcd = '5' then a.ttsm_amnt end),0) as sw_code	")
			.where("        , ifnull(sum(case when f.ppkd_dvcd = '2' or f.ppkd_dvcd ='3' or f.ppkd_dvcd = '4' then a.ttsm_amnt end),0) as dw_code")
			.where("from sale_ostt_item a																						")
			.where("left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb												")
			.where("left outer join boxx_acpt_bom  m on a.acpt_numb = m.invc_numb												")
			.where("left outer join boxx_acpt      x on m.invc_numb = x.invc_numb												")
			.where("left outer join fabc_mast      f on m.fabc_idcd = f.fabc_idcd												")
			.where("left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd												")
			.where("left outer join user_mast      u on x.drtr_idcd = u.user_idcd												")
			.where("where 1=1																									")
			.where("and date_format(b.invc_date,'%Y') = :year	" , arg.fixParameter("year"))
			.where("and c.find_name like %:find_name%			" , arg.getParamText("find_name" ))
			.where("group by x.drtr_idcd, b.cstm_idcd																			")
			.where(") a 																										")
		;


		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap detail1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String dvcd = arg.getParamText("sub");

		data.param // 집계문  입력
			.query("with recursive mon as (				")
			.query("           select 1 as mm			")
			.query("           union all				")
			.query("           select mm+1 as mm		")
			.query("           from mon					")
			.query("           where mm < 12			")
			.query(")									")
			.query("select  m.mm")
			.query("      , a.user_name as drtr_name")
			.query("      , a.cstm_name")
		;
		if(dvcd.equals("m2")){
			data.param
				.query("       , ifnull(sum(case when f.ppkd_dvcd = '1' or f.ppkd_dvcd = '5' then (a.pqty_mxm2 * a.acpt_qntt) * a.mxm2_pric end),0) as sw_code")
				.query("       , ifnull(sum(case when f.ppkd_dvcd = '2' or f.ppkd_dvcd ='3'  or f.ppkd_dvcd = '4' then (a.pqty_mxm2 * a.acpt_qntt) * a.mxm2_pric end),0) as dw_code")
				.query("	   , sum((a.pqty_mxm2 * a.acpt_qntt) * a.mxm2_pric) as total")
			;
		}else if(dvcd.equals("수량")){
			data.param
				.query("	   , ifnull(sum(case when f.ppkd_dvcd = '1' or f.ppkd_dvcd = '5' then a.ostt_qntt end),0) as sw_code				")
				.query("       , ifnull(sum(case when f.ppkd_dvcd = '2' or f.ppkd_dvcd ='3'  or f.ppkd_dvcd = '4' then a.ostt_qntt end),0)as dw_code")
				.query("       , sum(a.ostt_qntt) as total																						")
			;
		}else if(dvcd.equals("금액")){
			data.param
				.query("	   , ifnull(sum(case when f.ppkd_dvcd = '1' or f.ppkd_dvcd = '5' then a.ttsm_amnt end),0) as sw_code					")
				.query("       , ifnull(sum(case when f.ppkd_dvcd = '2' or f.ppkd_dvcd ='3'  or f.ppkd_dvcd = '4' then a.ttsm_amnt end),0) as dw_code")
				.query("       , sum(a.ttsm_amnt) as total																						")
			;
		}
		data.param
			.query("from mon m ")
			.query("left outer join ( select a.invc_numb, a.acpt_numb, a.ostt_qntt, a.ttsm_amnt, b.invc_date, b.cstm_idcd		")
			.query("                       , x.pqty_mxm2, x.mxm2_pric, x.acpt_qntt, u.user_name, c.cstm_name					")
			.query("                  from sale_ostt_item a																		")
			.query("                  left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb								")
			.query("                  left outer join boxx_acpt      x on a.acpt_numb = x.invc_numb								")
			.query("                  left outer join user_mast      u on x.drtr_idcd = u.user_idcd								")
			.query("                  left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd								")
			.query("                  where date_format(b.invc_date,'%Y') = :year"		, arg.getParameter("year"))
//			.query("                  and   drtr_idcd is null")
			.query("                  and   x.drtr_idcd = :user_idcd"		, arg.getParameter("user_idcd"))
			.query("                  and   c.cstm_idcd = :cstm_idcd"		, arg.getParameter("cstm_idcd"))
			.query("                ) a on date_format(a.invc_date,'%m') = m.mm													")
			.query("left outer join boxx_acpt_bom b on a.acpt_numb = b.invc_numb												")
			.query("left outer join fabc_mast     f on b.fabc_idcd = f.fabc_idcd												")
			.query("group by m.mm")
		;

		return data.selectForMap() ;
	}

	public SqlResultMap search2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																										")
		;
		data.param
			.query("select a.*																								")
		;
		data.param
			.where("from(																									")
			.where("select   a.plan_year     , a.cstm_idcd     , c.cstm_name     , a.drtr_idcd								")
			.where("       , u.user_name as drtr_name          , n.unit_name     , a.unit_idcd								")
			.where("       , ( ifnull(mn01_goal,0)+ifnull(mn02_goal,0)+ifnull(mn03_goal,0)+ifnull(mn04_goal,0)				")
			.where("         + ifnull(mn05_goal,0)+ifnull(mn06_goal,0)+ifnull(mn07_goal,0)+ifnull(mn08_goal,0)				")
			.where("         + ifnull(mn09_goal,0)+ifnull(mn10_goal,0)+ifnull(mn11_goal,0)+ifnull(mn12_goal,0)				")
			.where("       ) as goal																						")
			.where("       , ( ifnull(mn01_rslt,0)+ifnull(mn02_rslt,0)+ifnull(mn03_rslt,0)+ifnull(mn04_rslt,0)				")
			.where("         + ifnull(mn05_rslt,0)+ifnull(mn06_rslt,0)+ifnull(mn07_rslt,0)+ifnull(mn08_rslt,0)				")
			.where("         + ifnull(mn09_rslt,0)+ifnull(mn10_rslt,0)+ifnull(mn11_rslt,0)+ifnull(mn12_rslt,0)				")
			.where("       ) as rslt																						")
			.where("from sale_plan a																						")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd												")
			.where("left outer join unit_mast n on n.unit_idcd = a.unit_idcd												")
			.where("where plan_year = :year" ,arg.fixParameter("year"))
			.where("and sale_plan_dvcd = 2																					")
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
			.total("select count(1) as maxsize																			")
		;

		data.param
			.query("select '01' as goalname, ifnull(max(mn01_goal),0) as 'goal', ifnull(max(mn01_rslt),0) as 'rslt'		")
			.query("	, (ifnull(max(mn01_rslt),0)) / (ifnull(max(mn01_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year      = :plan_year1",arg.fixParameter("year"))
			.query("				and cstm_idcd      = :cstm_idcd1",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd      = :drtr_idcd1",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '02', ifnull(max(mn02_goal),0), ifnull(max(mn02_rslt),0)							")
			.query("	, (ifnull(max(mn02_rslt),0)) / (ifnull(max(mn02_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year2",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd2",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd2",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '03', ifnull(max(mn03_goal),0), ifnull(max(mn03_rslt),0)							")
			.query("	, (ifnull(max(mn03_rslt),0)) / (ifnull(max(mn03_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year3",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd3",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd3",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '04', ifnull(max(mn04_goal),0), ifnull(max(mn04_rslt),0)							")
			.query("	, (ifnull(max(mn04_rslt),0)) / (ifnull(max(mn04_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year4",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd4",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd4",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '05', ifnull(max(mn05_goal),0), ifnull(max(mn05_rslt),0)							")
			.query("	, (ifnull(max(mn05_rslt),0)) / (ifnull(max(mn05_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year5",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd5",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd5",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '06', ifnull(max(mn06_goal),0), ifnull(max(mn06_rslt),0)							")
			.query("	, (ifnull(max(mn06_rslt),0)) / (ifnull(max(mn06_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year6",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd6",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd6",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '07', ifnull(max(mn07_goal),0), ifnull(max(mn07_rslt),0)							")
			.query("	, (ifnull(max(mn07_rslt),0)) / (ifnull(max(mn07_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year7",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd7",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd7",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '08', ifnull(max(mn08_goal),0), ifnull(max(mn08_rslt),0)							")
			.query("	, (ifnull(max(mn08_rslt),0)) / (ifnull(max(mn08_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year8",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd8",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd8",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '09', ifnull(max(mn09_goal),0), ifnull(max(mn09_rslt),0)							")
			.query("	, (ifnull(max(mn09_rslt),0)) / (ifnull(max(mn09_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year9",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd9",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd9",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '10', ifnull(max(mn10_goal),0), ifnull(max(mn10_rslt),0)							")
			.query("	, (ifnull(max(mn10_rslt),0)) / (ifnull(max(mn10_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year10",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd10",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd10",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '11', ifnull(max(mn11_goal),0), ifnull(max(mn11_rslt),0)							")
			.query("	, (ifnull(max(mn11_rslt),0)) / (ifnull(max(mn11_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year11",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd11",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd11",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
			.query("	union select '12', ifnull(max(mn12_goal),0), ifnull(max(mn12_rslt),0)							")
			.query("	, (ifnull(max(mn12_rslt),0)) / (ifnull(max(mn12_goal),0))*100 as percent						")
			.query("	from sale_plan																					")
			.query("	where 1=1	and plan_year = :plan_year12",arg.fixParameter("year"))
			.query("				and cstm_idcd = :cstm_idcd12",arg.fixParameter("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd12",arg.fixParameter("drtr_idcd"))
			.query("				and sale_plan_dvcd = 2																")
		;
		return data.selectForMap() ;

	}

	public SqlResultMap search3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String amnt = arg.getParamText("amnt");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																										")
		;
		data.param
			.query("select *																														")
		;
		data.param
			.where("from (																															")
		;
		if(amnt.equals("거래명세서")){
			data.param // 집계문  입력
			.where(" select     a.invc_numb			, a.line_seqn			, b.cstm_idcd			, c.cstm_name								")
			.where("         , sum(ifnull(a.ttsm_amnt,0)) as ttsm_amnt		, sum(ifnull(s.colt_amnt,0)) as colt_amnt		, x.drtr_idcd		")
			.where("         , sum((ifnull(a.ttsm_amnt,0) - ifnull(s.colt_amnt,0))) as uncolt													")
			.where(" from sale_ostt_item a																										")
			.where(" left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb																")
			.where(" left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd																")
			.where(" left outer join (   select		 b.orig_invc_numb	, b.orig_seqn	, c.drtr_idcd											")
			.where("							 	, a.invc_numb		, a.line_seqn	, sum(ifnull(colt_amnt,0)) as colt_amnt					")
			.where("					from colt_item a																						")
			.where("					left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn					")
			.where("					left outer join colt_mast c on a.invc_numb=c.invc_numb													")
			.where("					where a.line_stat < 2																					")
			.where("					group by b.orig_invc_numb, b.orig_seqn																	")
			.where("					) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn											")
			.where(" left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb				")
			.where(" where 1=1											")
			.where(" and substr(b.invc_date,1,4) = :year	" , arg.getParamText("year"))
			.where(" and c.sale_cstm_yorn = '1'																									")
			.where(" and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
			.where(" group by c.cstm_idcd																										")
			.where(" order by c.cstm_idcd, x.drtr_idcd																							")
			.where(") a																															")
		;
		}else if(amnt.equals("청구서")){
			data.param // 집계문  입력
			.where("select	a.invc_numb		, a.line_seqn		, b.cstm_idcd		, c.cstm_name		, ifnull(a.rqod_qntt,0) as rqod_qntt	")
			.where("		, ifnull(a.sale_pric,0)  * ifnull(a.rqod_qntt,0) + (ifnull(a.sale_pric,0) * ifnull(a.rqod_qntt,0)) * 0.1 as ttsm_amnt")
			.where("		, ifnull(s.colt_amnt,0) as colt_amnt		, x.drtr_idcd		, ifnull(a.sale_pric,0) as sale_pric				")
			.where("		, ifnull(a.sale_pric,0)  * ifnull(a.rqod_qntt,0) + (ifnull(a.sale_pric,0) * ifnull(a.rqod_qntt,0)) * 0.1 - ifnull(s.colt_amnt,0) as uncolt	")
			.where("from sale_ostt_item a																										")
			.where(" left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb																")
			.where(" left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd																")
			.where(" left outer join (   select		 b.orig_invc_numb	, b.orig_seqn	, c.drtr_idcd											")
			.where("					, a.invc_numb		, a.line_seqn	, ifnull(colt_amnt,0) as colt_amnt									")
			.where("					from colt_item a																						")
			.where("					left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn					")
			.where("					left outer join colt_mast c on a.invc_numb=c.invc_numb													")
			.where("    where a.line_stat < 2																									")
			.where("    group by b.orig_invc_numb, b.orig_seqn																					")
			.where("     ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn															")
			.where("      left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb															")
			.where("      where 1=1																												")
			.where("     and substr(b.invc_date,1,4) = :year	" , arg.getParamText("year"))
			.where("and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
			.where("        and c.sale_cstm_yorn = '1'																							")
			.where("      group by c.cstm_idcd																									")
			.where("    order by c.cstm_idcd, x.drtr_idcd																						")
			.where(") a																															")
		;

	}else if(amnt.equals("세금계산서")){
		data.param // 집계문  입력
			.where("select	a.invc_numb		, a.line_seqn		, b.cstm_idcd		, c.cstm_name		,ifnull(a.rqod_qntt,0) as rqod_qntt		")
			.where("	, ifnull(a.sale_pric,0)  * ifnull(a.sale_qntt,0) + (ifnull(a.sale_pric,0) * ifnull(a.sale_qntt,0)) * 0.1 as ttsm_amnt	")
			.where("	, ifnull(s.colt_amnt,0) as colt_amnt	, x.drtr_idcd		,ifnull(a.sale_pric,0) as sale_pric							")
			.where("	, ifnull(a.sale_pric,0)  * ifnull(a.sale_qntt,0) + (ifnull(a.sale_pric,0) * ifnull(a.sale_qntt,0)) * 0.1 - ifnull(s.colt_amnt,0) as uncolt	")
			.where(" from sale_ostt_item a																										")
			.where(" left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb																")
			.where(" left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd																")
			.where(" left outer join (   select		 b.orig_invc_numb	, b.orig_seqn	, c.drtr_idcd											")
			.where("					, a.invc_numb		, a.line_seqn	, ifnull(colt_amnt,0) as colt_amnt									")
			.where("					from colt_item a																						")
			.where("                          left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn				")
			.where("                          left outer join colt_mast c on a.invc_numb=c.invc_numb											")
			.where("                          where a.line_stat < 2																				")
			.where("                          group by b.orig_invc_numb, b.orig_seqn															")
			.where("                      ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn										")
			.where("     left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb															")
			.where("     where 1=1																												")
			.where("     and substr(b.invc_date,1,4) = :year	" , arg.getParamText("year"))
			.where("and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
			.where("        and c.sale_cstm_yorn = '1'																							")
			.where("      group by c.cstm_idcd																									")
			.where("    order by c.cstm_idcd, x.drtr_idcd																						")
			.where(") a																															")
		;
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap detail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String amnt = arg.getParamText("amnt");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																										")
		;
		if(amnt.equals("거래명세서")){
			data.param // 집계문  입력
				.query("with recursive mon as (				")
				.query("           select 1 as mm			")
				.query("           union all				")
				.query("           select mm+1 as mm		")
				.query("           from mon					")
				.query("           where mm < 12			")
				.query(")									")
			;
			data.param
				.query("select   m.mm     , c.cstm_idcd      , c.cstm_name      , a.user_name      , sum(ifnull(a.ttsm_amnt,0)) as ttsm_amnt		")
				.query("         , ifnull(a.colt_amnt,0) as colt_amnt     , sum(ifnull( a.uncolt,0)) as uncolt      , a.drtr_idcd      , a.colt_month")
				.query("from mon m																													")
				.query("left outer join (																											")
				.query("     select a.invc_numb    , a.line_seqn    , b.cstm_idcd    , c.cstm_name													")
				.query("          , a.ttsm_amnt    , ifnull(s.colt_amnt,0) as colt_amnt    , u.user_name    , x.drtr_idcd							")
				.query("          , ifnull(a.ttsm_amnt,0) - ifnull(s.colt_amnt,0) as uncolt    , b.invc_date										")
				.query("          , if(ifnull(a.ttsm_amnt,0) - ifnull(s.colt_amnt,0) > 0 ,"
								+ "case when DATE_FORMAT(now(),'%Y%m') - SUBSTR(b.invc_date,1,6) > 3 then 3"
								+ "     when DATE_FORMAT(now(),'%Y%m') - SUBSTR(b.invc_date,1,6) = 2 then 2"
								+ "     else 0 end, 0 ) as colt_month																				")
				.query("     from sale_ostt_item a																									")
				.query("     left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb															")
				.query("     left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd															")
				.query("     left outer join (   select b.orig_invc_numb   , b.orig_seqn   , c.drtr_idcd											")
				.query("                              , a.invc_numb        , a.line_seqn   , sum(ifnull(colt_amnt,0)) as colt_amnt					")
				.query("                          from colt_item a																					")
				.query("                          left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn				")
				.query("                          left outer join colt_mast c on a.invc_numb=c.invc_numb											")
				.query("                          where a.line_stat < 2																				")
				.query("                          group by b.orig_invc_numb, b.orig_seqn															")
				.query("                      ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn										")
				.query("     left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb															")
				.query("     left outer join user_mast     u on u.user_idcd = x.drtr_idcd															")
				.query("     where date_format(b.invc_date,'%Y') = :year	" , arg.getParamText("year"))
				.query("     and c.sale_cstm_yorn = '1'																								")
				.query("     and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
				.query("     and c.cstm_idcd       =:cstm_idcd			" , arg.getParamText("cstm_idcd"))
				.query("     and x.drtr_idcd       =:user_idcd			" , arg.getParamText("user_idcd"))
				.query(") a on date_format(a.invc_date,'%m') = m.mm																					")
				.query(" left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd																	")
				.query(" group by mm																												")
			;
		}else if(amnt.equals("청구서")){
			data.param
				.query("select   a.invc_numb    , a.line_seqn    , b.cstm_idcd    , c.cstm_name														")
				.query("       , ifnull(a.sale_pric,0)  * ifnull(a.rqod_qntt,0) + (ifnull(a.sale_pric,0) * ifnull(a.rqod_qntt,0)) * 0.1 as ttsm_amnt")
				.query("       , s.colt_amnt    , u.user_name    , x.drtr_idcd    , a.rqod_date as invc_date										")
				.query("         , SUBSTR(b.invc_date,5,2) as mm																				")
				.query("       , ifnull(a.sale_pric,0)  * ifnull(a.rqod_qntt,0) + (ifnull(a.sale_pric,0) * ifnull(a.rqod_qntt,0)) * 0.1"
								+ " - ifnull(s.colt_amnt,0) as uncolt																				")
				.query("       , if(ifnull(a.sale_pric,0)  * ifnull(a.rqod_qntt,0) + (ifnull(a.sale_pric,0) * ifnull(a.rqod_qntt,0)) * 0.1"
							+ " - ifnull(s.colt_amnt,0) > 0 ,"
							+ "case when DATE_FORMAT(now(),'%Y%m') - SUBSTR(a.rqod_date,1,6) > 3 then 3"
							+ "     when DATE_FORMAT(now(),'%Y%m') - SUBSTR(a.rqod_date,1,6) = 2 then 2"
							+ "     else 0 end, 0 ) as colt_month																					")
				.query("from sale_ostt_item a																										")
				.query("left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb																")
				.query("and date_format(b.invc_date,'%Y') = :year	" , arg.getParamText("year"))
				.query("left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd																")
				.query("and c.sale_cstm_yorn  = '1'																									")
				.query("left outer join (   select b.orig_invc_numb   , b.orig_seqn   , c.drtr_idcd													")
				.query("                         , a.invc_numb        , a.line_seqn   , sum(ifnull(colt_amnt,0)) as colt_amnt						")
				.query("                     from colt_item a																						")
				.query("                     left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn					")
				.query("                     left outer join colt_mast c on a.invc_numb=c.invc_numb													")
				.query("                     where a.line_stat < 2																					")
				.query("                     group by b.orig_invc_numb, b.orig_seqn																	")
				.query("                 ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn										")
				.query("left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb																")
				.query("left outer join user_mast     u on u.user_idcd = x.drtr_idcd																")
				.query("where 1=1																													")
//				.query("and a.rqod_invc_numb is not null																							")
				.query("and x.drtr_idcd       =:user_idcd			" , arg.getParamText("user_idcd"))
				.query("and c.cstm_idcd       =:cstm_idcd			" , arg.getParamText("cstm_idcd"))
				.query("and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
				.query(" group by mm																										")
			;
		}else if(amnt.equals("세금계산서")){
			data.param
				.query("select a.invc_numb    , a.line_seqn    , b.cstm_idcd    , c.cstm_name														")
				.query("     , ifnull(a.sale_pric,0)  * ifnull(a.sale_qntt,0) + (ifnull(a.sale_pric,0) * ifnull(a.sale_qntt,0)) as ttsm_amnt		")
				.query("     , s.colt_amnt    , u.user_name    , x.drtr_idcd    , a.sale_date as invc_date											")
				.query("     , SUBSTR(b.invc_date,5,2) as mm																						")
				.query("     , ifnull(a.sale_pric,0)  * ifnull(a.sale_qntt,0) "
							+ "+ (ifnull(a.sale_pric,0) * ifnull(a.sale_qntt,0)) - ifnull(s.colt_amnt,0) as uncolt									")
				.query("     , if (ifnull(a.sale_pric,0)  * ifnull(a.sale_qntt,0)"
							+ "+ (ifnull(a.sale_pric,0) * ifnull(a.sale_qntt,0)) - ifnull(s.colt_amnt,0) > 0 ,"
							+ "case when DATE_FORMAT(now(),'%Y%m') - SUBSTR(a.sale_date,1,6) > 3 then 3"
							+ "     when DATE_FORMAT(now(),'%Y%m') - SUBSTR(a.sale_date,1,6) = 2 then 2"
							+ "     else 0 end, 0 ) as colt_month																					")
				.query("from sale_ostt_item a																										")
				.query("left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb																")
				.query("and date_format(b.invc_date,'%Y') = :year	" , arg.getParamText("year"))
				.query("left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd																")
				.query("and c.sale_cstm_yorn  = '1'																									")
				.query("left outer join (   select b.orig_invc_numb   , b.orig_seqn   , c.drtr_idcd													")
				.query("                         , a.invc_numb        , a.line_seqn   , sum(ifnull(colt_amnt,0)) as colt_amnt						")
				.query("                     from colt_item a																						")
				.query("                     left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn					")
				.query("                     left outer join colt_mast c on a.invc_numb=c.invc_numb													")
				.query("                     where a.line_stat < 2																					")
				.query("                     group by b.orig_invc_numb, b.orig_seqn																	")
				.query("                 ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn										")
				.query("left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb																")
				.query("left outer join user_mast     u on u.user_idcd = x.drtr_idcd																")
				.query("where 1=1																													")
//				.query("and a.sale_invc_numb is not null																							")
				.query("and c.cstm_idcd       =:cstm_idcd			" , arg.getParamText("cstm_idcd"))
				.query("and x.drtr_idcd       =:user_idcd			" , arg.getParamText("user_idcd"))
				.query("and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
				.query(" group by mm																										")
			;
		}

		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	public SqlResultMap cary_amnt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String result = "";
		ParamToJson translate = new ParamToJson();
		result = translate.TranslateProcedure(arg, "year,cstm_idcd,find_name,user_idcd,amnt");

		data.param // 집계문  입력
		.query("call purc_ordr_stat3_cary (	")
		.query(" :param	" , result)
		.query(" )	")
		;

		return data.selectForMap() ;
	}

	public SqlResultMap befr_amnt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String result = "";
		ParamToJson translate = new ParamToJson();
		result = translate.TranslateProcedure(arg, "year,cstm_idcd,find_name,user_idcd,amnt");

		data.param // 집계문  입력
			.query("call purc_ordr_stat3_befr (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;
	}
	public SqlResultMap getChart2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("with recursive days as (											")
			.query("   select 1 as cnt, 1 as `name`										")
			.query("   from DUAL														")
			.query("   union all														")
			.query("   select (@rank := @rank+1) as cnt,@rank as `name`					")
			.query("   from days														")
			.query("   , (select @rank := 1 ) r											")
			.query("   where @rank < 12													")
			.query(")																	")
			.query("select   CONVERT(a.`name` USING utf8) as `name`						")
			.query("       , CASE a.cnt													")
			.query("         WHEN 1 THEN ifnull(b.mn01_goal,0)							")
			.query("         WHEN 2 THEN ifnull(b.mn02_goal,0)							")
			.query("         WHEN 3 THEN ifnull(b.mn03_goal,0)							")
			.query("         WHEN 4 THEN ifnull(b.mn04_goal,0)							")
			.query("         WHEN 5 THEN ifnull(b.mn05_goal,0)							")
			.query("         WHEN 6 THEN ifnull(b.mn06_goal,0)							")
			.query("         WHEN 7 THEN ifnull(b.mn07_goal,0)							")
			.query("         WHEN 8 THEN ifnull(b.mn08_goal,0)							")
			.query("         WHEN 9 THEN ifnull(b.mn09_goal,0)							")
			.query("         WHEN 10 THEN ifnull(b.mn10_goal,0)							")
			.query("         WHEN 11 THEN ifnull(b.mn11_goal,0)							")
			.query("         WHEN 12 THEN ifnull(b.mn12_goal,0)							")
			.query("         ELSE														")
			.query("           null														")
			.query("         END														")
			.query("       as data1														")
			.query("       , CASE a.cnt													")
			.query("         WHEN 1 THEN ifnull(b.mn01_rslt,0)							")
			.query("         WHEN 2 THEN ifnull(b.mn02_rslt,0)							")
			.query("         WHEN 3 THEN ifnull(b.mn03_rslt,0)							")
			.query("         WHEN 4 THEN ifnull(b.mn04_rslt,0)							")
			.query("         WHEN 5 THEN ifnull(b.mn05_rslt,0)							")
			.query("         WHEN 6 THEN ifnull(b.mn06_rslt,0)							")
			.query("         WHEN 7 THEN ifnull(b.mn07_rslt,0)							")
			.query("         WHEN 8 THEN ifnull(b.mn08_rslt,0)							")
			.query("         WHEN 9 THEN ifnull(b.mn09_rslt,0)							")
			.query("         WHEN 10 THEN ifnull(b.mn10_rslt,0)							")
			.query("         WHEN 11 THEN ifnull(b.mn11_rslt,0)							")
			.query("         WHEN 12 THEN ifnull(b.mn12_rslt,0)							")
			.query("         ELSE														")
			.query("          null														")
			.query("         END														")
			.query("       as data2														")
			.query("from days a ,sale_plan b											")
			.query("where b.cstm_idcd      = :cstm_idcd",arg.fixParameter("cstm_idcd"))
			.query("and   b.plan_year      = :year		",arg.fixParameter("year"))
			.query("and   b.drtr_idcd      = :drtr_idcd",arg.fixParameter("drtr_idcd"))
			.query("and   b.sale_plan_dvcd = 2											")
			.query("limit 12															")
		;
		return data.selectForMap();
	}

	public SqlResultMap chart3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String amnt = arg.getParamText("amnt");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																										")
		;

		if(amnt.equals("거래명세서")){
			data.param
				.query("with cte as (																												")
				.query("select     c.cstm_idcd      , c.cstm_name      , a.user_name      , sum(a.ttsm_amnt) as ttsm_amnt							")
				.query("         , sum(a.colt_amnt) as colt_amnt       , sum(a.uncolt) as uncolt													")
				.query("         , a.drtr_idcd      , a.invc_date      , a.invc_month																")
				.query("from cstm_mast c																											")
				.query("left outer join (																											")
				.query("     select a.invc_numb    , a.line_seqn    , b.cstm_idcd    , c.cstm_name													")
				.query("          , a.ttsm_amnt    , s.colt_amnt    , u.user_name    , x.drtr_idcd													")
				.query("          , ifnull(a.ttsm_amnt,0) - ifnull(s.colt_amnt,0) as uncolt    , b.invc_date										")
				.query("          , SUBSTR(b.invc_date,5,2) as invc_month																			")
				.query("     from sale_ostt_item a																									")
				.query("     left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb															")
				.query("     left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd															")
				.query("     left outer join (   select b.orig_invc_numb   , b.orig_seqn   , c.drtr_idcd											")
				.query("                              , a.invc_numb        , a.line_seqn   , sum(ifnull(colt_amnt,0)) as colt_amnt					")
				.query("                          from colt_item a																					")
				.query("                          left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn				")
				.query("                          left outer join colt_mast c on a.invc_numb=c.invc_numb											")
				.query("                          where a.line_stat < 2																				")
				.query("                          group by b.orig_invc_numb, b.orig_seqn															")
				.query("                      ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn									")
				.query("     left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb															")
				.query("     left outer join user_mast     u on u.user_idcd = x.drtr_idcd															")
				.query("     where 1=1																												")
				.query("     and substr(b.invc_date,1,4) = :year	" , arg.getParamText("year"))
				.query(") a on c.cstm_idcd = a.cstm_idcd																							")
				.query("where 1=1																													")
				.query("and c.sale_cstm_yorn = '1'																									")
				.query("and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
				.query("and c.cstm_idcd       =:cstm_idcd			" , arg.getParamText("cstm_idcd"))
				.query("group by SUBSTR(a.invc_date,5,2)																							")
				.query("order by SUBSTR(a.invc_date,5,2)																							")
				.query(")																															")
			;
		}else if(amnt.equals("청구서")){
			data.param
			.query("with cte as (																												")
			.query("select     c.cstm_idcd      , c.cstm_name      , a.user_name      , sum(a.ttsm_amnt) as ttsm_amnt							")
			.query("         , sum(a.colt_amnt) as colt_amnt       , sum(a.uncolt) as uncolt													")
			.query("         , a.drtr_idcd      , a.invc_date      , a.invc_month																")
			.query("from cstm_mast c																											")
			.query("left outer join (																											")
			.query("     select a.invc_numb    , a.line_seqn    , b.cstm_idcd    , c.cstm_name													")
			.query("          , a.ttsm_amnt    , s.colt_amnt    , u.user_name    , x.drtr_idcd													")
			.query("          , ifnull(a.ttsm_amnt,0) - ifnull(s.colt_amnt,0) as uncolt    , b.invc_date										")
			.query("          , SUBSTR(b.invc_date,5,2) as invc_month																			")
			.query("     from sale_ostt_item a																									")
			.query("     left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb															")
			.query("     left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd															")
			.query("     left outer join (   select b.orig_invc_numb   , b.orig_seqn   , c.drtr_idcd											")
			.query("                              , a.invc_numb        , a.line_seqn   , sum(ifnull(colt_amnt,0)) as colt_amnt					")
			.query("                          from colt_item a																					")
			.query("                          left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn				")
			.query("                          left outer join colt_mast c on a.invc_numb=c.invc_numb											")
			.query("                          where a.line_stat < 2																				")
			.query("                          group by b.orig_invc_numb, b.orig_seqn															")
			.query("                      ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn									")
			.query("     left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb															")
			.query("     left outer join user_mast     u on u.user_idcd = x.drtr_idcd															")
			.query("     where 1=1																												")
			.query("     and substr(b.invc_date,1,4) = :year	" , arg.getParamText("year"))
			.query(") a on c.cstm_idcd = a.cstm_idcd																							")
			.query("where 1=1																													")
			.query("and c.sale_cstm_yorn = '1'																									")
			.query("and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
			.query("and c.cstm_idcd       =:cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.query("group by SUBSTR(a.invc_date,5,2)																							")
			.query("order by SUBSTR(a.invc_date,5,2)																							")
			.query(")																															")
		;
		}else if(amnt.equals("세금계산서")){
			data.param
			.query("with cte as (																												")
			.query("select     c.cstm_idcd      , c.cstm_name      , a.user_name      , sum(a.ttsm_amnt) as ttsm_amnt							")
			.query("         , sum(a.colt_amnt) as colt_amnt       , sum(a.uncolt) as uncolt													")
			.query("         , a.drtr_idcd      , a.invc_date      , a.invc_month																")
			.query("from cstm_mast c																											")
			.query("left outer join (																											")
			.query("     select a.invc_numb    , a.line_seqn    , b.cstm_idcd    , c.cstm_name													")
			.query("          , a.ttsm_amnt    , s.colt_amnt    , u.user_name    , x.drtr_idcd													")
			.query("          , ifnull(a.ttsm_amnt,0) - ifnull(s.colt_amnt,0) as uncolt    , b.invc_date										")
			.query("          , SUBSTR(b.invc_date,5,2) as invc_month																			")
			.query("     from sale_ostt_item a																									")
			.query("     left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb															")
			.query("     left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd															")
			.query("     left outer join (   select b.orig_invc_numb   , b.orig_seqn   , c.drtr_idcd											")
			.query("                              , a.invc_numb        , a.line_seqn   , sum(ifnull(colt_amnt,0)) as colt_amnt					")
			.query("                          from colt_item a																					")
			.query("                          left outer join sale_item b on a.sale_numb=b.invc_numb and a.sale_seqn = b.line_seqn				")
			.query("                          left outer join colt_mast c on a.invc_numb=c.invc_numb											")
			.query("                          where a.line_stat < 2																				")
			.query("                          group by b.orig_invc_numb, b.orig_seqn															")
			.query("                      ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn									")
			.query("     left outer join boxx_acpt     x on a.acpt_numb = x.invc_numb															")
			.query("     left outer join user_mast     u on u.user_idcd = x.drtr_idcd															")
			.query("     where 1=1																												")
			.query("     and substr(b.invc_date,1,4) = :year	" , arg.getParamText("year"))
			.query(") a on c.cstm_idcd = a.cstm_idcd																							")
			.query("where 1=1																													")
			.query("and c.sale_cstm_yorn = '1'																									")
			.query("and c.find_name  like %:find_name%			" , arg.getParamText("find_name"))
			.query("and c.cstm_idcd       =:cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.query("group by SUBSTR(a.invc_date,5,2)																							")
			.query("order by SUBSTR(a.invc_date,5,2)																							")
			.query(")																															")
		;
		}

		data.param
			.query("select 1 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '01'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '01'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '01'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 2 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '02'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '02'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '02'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 3 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '03'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '03'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '03'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 4 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '04'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '04'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '04'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 5 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '05'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '05'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '05'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 6 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '06'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '06'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '06'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 7 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '07'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '07'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '07'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 8 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '08'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '08'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '08'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 9 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '09'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '09'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '09'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 10 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '10'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '10'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '10'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 11 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '11'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '11'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '11'),0) as uncolt				")
			.query("from dual																							")

			.query("union all																							")
			.query("select 12 as 'mm'																					")
			.query("	 , ifnull((	select sum(a.ttsm_amnt) from cte a where a.invc_month = '12'),0) as ttsm_amnt		")
			.query("	 , ifnull((	select sum(a.colt_amnt) from cte a where a.invc_month = '12'),0) as colt_amnt		")
			.query("	 , ifnull((	select sum(a.uncolt) from cte a where a.invc_month = '12'),0) as uncolt				")
			.query("from dual																							")


		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
