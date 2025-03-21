package com.sky.system.sale.saleplan;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class SalePlanService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select *																											")
		;
		data.param
		.where("from (																												")
		.where("select      a.line_stat      , a.drtr_idcd      , u.user_name      , a.cstm_idcd      , c.cstm_name					")
		.where("          , (@goal := ( ifnull(mn01_goal,0) + ifnull(mn02_goal,0) + ifnull(mn03_goal,0) + ifnull(mn04_goal,0)		")
		.where("             + ifnull(mn05_goal,0) + ifnull(mn06_goal,0) + ifnull(mn07_goal,0) + ifnull(mn08_goal,0)				")
		.where("             + ifnull(mn09_goal,0) + ifnull(mn10_goal,0) + ifnull(mn11_goal,0) + ifnull(mn12_goal,0))) as goal		")
		.where("          , (@rslt:=( ifnull(mn01_rslt,0) + ifnull(mn02_rslt,0) + ifnull(mn03_rslt,0) + ifnull(mn04_rslt,0)			")
		.where("             + ifnull(mn05_rslt,0) + ifnull(mn06_rslt,0) + ifnull(mn07_rslt,0) + ifnull(mn08_rslt,0)				")
		.where("             + ifnull(mn09_rslt,0) + ifnull(mn10_rslt,0) + ifnull(mn11_rslt,0) + ifnull(mn12_rslt,0)))as rslt		")
		.where("          , a.plan_year      , a.sale_plan_dvcd																		")
		.where("          , truncate(ifnull((@rslt/@goal)*100,0),2) as percent														")
		.where("from   sale_plan a																									")
		.where("       left outer join user_mast u on a.drtr_idcd = u.user_idcd														")
		.where("       left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd														")
		.where("     , (select @goal :=0 ,@rslt :=0) r 																				")
		.where("where  1=1																											")
		.where("and   a.find_name     like %:find_name%			"	, arg.getParameter("find_name"))
		.where("and   a.plan_year        = :plan_year			"	, arg.getParameter("plan_year"))
		.where("and   a.sale_plan_dvcd   = :sale_plan_dvcd		"	, arg.getParameter("sale_plan_dvcd"))
		.where("order by a.drtr_idcd																								")
		.where(")a																													")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getPlan(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select '01' as goalname, nvl(max(mn01_goal),0) as 'goal', nvl(max(mn01_rslt),0) as 'rslt'	")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year      = :plan_year1"		, arg.getParamText("plan_year"))
			.query("				and cstm_idcd      = :cstm_idcd1"		, arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd      = :drtr_idcd1"		, arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd1"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '02', nvl(max(mn02_goal),0), nvl(max(mn02_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year2" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd2" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd2" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd2"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '03', nvl(max(mn03_goal),0), nvl(max(mn03_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year3" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd3" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd3" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd3"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '04', nvl(max(mn04_goal),0), nvl(max(mn04_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year4" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd4" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd4" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd4"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '05', nvl(max(mn05_goal),0), nvl(max(mn05_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year5" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd5" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd5" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd5"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '06', nvl(max(mn06_goal),0), nvl(max(mn06_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year6" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd6" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd6" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd6"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '07', nvl(max(mn07_goal),0), nvl(max(mn07_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year7" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd7" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd7" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd7"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '08', nvl(max(mn08_goal),0), nvl(max(mn08_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year8" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd8" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd8" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd8"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '09', nvl(max(mn09_goal),0), nvl(max(mn09_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year9" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd9" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd9" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd9"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '10', nvl(max(mn10_goal),0), nvl(max(mn10_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year10" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd10" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd10" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd10"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '11', nvl(max(mn11_goal),0), nvl(max(mn11_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year11" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd11" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd11" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd11"	, arg.getParamText("sale_plan_dvcd"))
			.query("	union select '12', nvl(max(mn12_goal),0), nvl(max(mn12_rslt),0)							")
			.query("	from sale_plan																			")
			.query("	where 1=1	and plan_year = :plan_year12" , arg.getParamText("plan_year"))
			.query("				and cstm_idcd = :cstm_idcd12" , arg.getParamText("cstm_idcd"))
			.query("				and drtr_idcd = :drtr_idcd12" , arg.getParamText("drtr_idcd"))
			.query("				and sale_plan_dvcd = :sale_plan_dvcd12"	, arg.getParamText("sale_plan_dvcd"))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	//차트
	public SqlResultMap getChart(HttpRequestArgument arg) throws Exception {
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
			.query("and   b.plan_year      = :plan_year",arg.fixParameter("plan_year"))
			.query("and   b.drtr_idcd      = :drtr_idcd",arg.fixParameter("drtr_idcd"))
			.query("and   b.sale_plan_dvcd = :sale_plan_dvcd",arg.fixParameter("sale_plan_dvcd"))
			.query("limit 12															")
		;
		return data.selectForMap();
	}
	//차트
	public SqlResultMap getDrtrChk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(*) as cnt														")
		;
		data.param
			.where("from   sale_plan a															")
			.where("where  a.plan_year      = :plan_year "     , arg.fixParameter("plan_year"))
			.where("and    a.sale_plan_dvcd = :sale_plan_dvcd ", arg.fixParameter("sale_plan_dvcd"))
			.where("and    a.drtr_idcd      = :drtr_idcd "     , arg.fixParameter("drtr_idcd"))
			.where("and    a.cstm_idcd      = :cstm_idcd "     , arg.fixParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}
	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("sale_plan")
				.where("where plan_year		= :plan_year							")  /*  계획년도  */
				.where("and   cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
				.where("and   drtr_idcd		= :drtr_idcd							")  /*  담당자ID  */
				.where("and   sale_plan_dvcd= :sale_plan_dvcd						")  /*  영업계획구분코드  */

				.unique("plan_year"			, arg.fixParameter("plan_year"			))
				.unique("cstm_idcd"			, arg.fixParameter("cstm_idcd"			))
				.unique("drtr_idcd"			, arg.fixParameter("drtr_idcd"			))
				.unique("sale_plan_dvcd"	, arg.fixParameter("sale_plan_dvcd"		))
			;
			data.attach(Action.delete);
			data.execute();
		return null;
	}
	//목표-실적 등록
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("sale_plan"													)
				.where("where plan_year		= :plan_year							")  /*  계획년도  */
				.where("and   cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
				.where("and   drtr_idcd		= :drtr_idcd							")  /*  담당자ID  */
				.where("and   sale_plan_dvcd= :sale_plan_dvcd						")  /*  영업계획구분코드  */
				//
				.unique("plan_year"			, arg.fixParameter("plan_year"			))
				.unique("cstm_idcd"			, arg.fixParameter("cstm_idcd"			))
				.unique("drtr_idcd"			, arg.fixParameter("drtr_idcd"			))
				.unique("sale_plan_dvcd"	, arg.fixParameter("sale_plan_dvcd"		))
				//
				.update("mn01_goal"			, arg.getParameter("mn01_goal"			))
				.update("mn02_goal"			, arg.getParameter("mn02_goal"			))
				.update("mn03_goal"			, arg.getParameter("mn03_goal"			))
				.update("mn04_goal"			, arg.getParameter("mn04_goal"			))
				.update("mn05_goal"			, arg.getParameter("mn05_goal"			))
				.update("mn06_goal"			, arg.getParameter("mn06_goal"			))
				.update("mn07_goal"			, arg.getParameter("mn07_goal"			))
				.update("mn08_goal"			, arg.getParameter("mn08_goal"			))
				.update("mn09_goal"			, arg.getParameter("mn09_goal"			))
				.update("mn10_goal"			, arg.getParameter("mn10_goal"			))
				.update("mn11_goal"			, arg.getParameter("mn11_goal"			))
				.update("mn12_goal"			, arg.getParameter("mn12_goal"			))
				.update("find_name"			, arg.getParameter("cstm_name")
											+ "	"
											+ arg.getParameter("drtr_name"			))
				.insert("line_levl"			, arg.getParameter("line_levl"))
				.insert("line_stat"			, arg.getParameter("line_levl"))
				.update("updt_idcd"			, arg.getParameter("updt_idcd"))
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
		return null ;
	}
	//담당자 등록
	public SqlResultMap setDrtr(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("sale_plan"													)
				.where("where plan_year		= :plan_year							")  /*  계획년도  */
				.where("and   cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
				.where("and   drtr_idcd		= :drtr_idcd							")  /*  담당자ID  */
				.where("and   sale_plan_dvcd= :sale_plan_dvcd						")  /*  영업계획구분코드  */
				//
				.unique("plan_year"			, arg.fixParameter("plan_year"			))
				.unique("cstm_idcd"			, arg.fixParameter("cstm_idcd"			))
				.unique("drtr_idcd"			, arg.fixParameter("drtr_idcd"			))
				.unique("sale_plan_dvcd"	, arg.fixParameter("sale_plan_dvcd"		))

				.insert("unit_idcd"			, arg.getParameter("unit_idcd"))

				.insert("find_name"			, arg.getParameter("plan_year")
											 +" "
											 +arg.getParameter("drtr_name")
											 +" "
											 +arg.getParameter("cstm_name"))
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"))
			;
			data.attach(Action.insert);
			data.execute();
		return null ;
	}
}
