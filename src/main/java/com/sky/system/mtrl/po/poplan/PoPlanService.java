package com.sky.system.mtrl.po.poplan;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service
public class PoPlanService extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb      , a.amnd_degr														")
			.where("		, a.user_memo      , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.where("		, a.line_ordr      , a.line_stat       , a.line_clos         , a.find_name				")
			.where("		, a.updt_user_name , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.where("		, a.updt_urif      , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.where("		, a.crte_idcd      , a.crte_urif														")
			.where("		, c.cstm_code      , c.cstm_name       , d.user_name as drtr_name						")
			.where("		, i.item_code      , i.item_name       , i.item_spec         , a.line_seqn				")
			.where("		, a.invc_qntt      , a.invc_amnt       , a.vatx_amnt         , a.invc_pric				")
			.where("		, a.deli_date      , a.sply_amnt       , ac.acpt_case_name  							")
			.where("		, ac.bzpl_idcd     , ac.invc_date      , ac.cstm_drtr_name   , a.item_idcd				")
			.where("from	acpt_item a																				")
			.where("left outer join ( select  ac.acpt_case_name  , ac.amnd_degr        , ac.bzpl_idcd 				")
			.where("                        , ac.invc_date       , ac.cstm_drtr_name   , ac.invc_numb				")
			.where("                        , ac.cstm_idcd       , ac.drtr_idcd        , ac.ordr_dvcd				")
			.where("                  from acpt_mast ac																")
			.where("                  group by ac.invc_numb															")
			.where("                ) ac on a.invc_numb = ac.invc_numb												")
			.where("left outer join cstm_mast c on ac.cstm_idcd = c.cstm_idcd										")
			.where("left outer join user_mast d on ac.drtr_idcd = d.user_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("where  1=1																						")
			.where("and		ifnull(ac.ordr_dvcd,0) != '4000'														")
			.where("and		a.amnd_degr = (select max(amnd_degr) from acpt_item where invc_numb = a.invc_numb ) 	")
			.where("and		a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and		ac.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and		ac.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and		ac.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and		a.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and		ac.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and		a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and		a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb desc																		")
			.where(") a																								")
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
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("with acpt as(																			")
			.query("    select  a.invc_date    , b.invc_qntt    , b.invc_amnt								")
			.query("          , weekofyear(a.invc_date) as invc_week										")
			.query("    from acpt_mast a, acpt_item b														")
			.query("    where a.invc_numb = b.invc_numb														")
			.query("    and a.acpt_stat_dvcd not in ('0010', '0600')										")
//			.query("    and substring(a.invc_date,1,6) >= substring(:invc1_date,1,6)", arg.getParamText("invc1_date"))
			.query("    and a.invc_date >= :invc1_date				" , arg.getParamText("invc1_date"))
			.query("    and a.invc_date <= :invc2_date				" , arg.getParamText("invc2_date"))
			.query("    and a.find_name like %:find_name%			" , arg.getParamText("find_name"))
			.query("    and a.drtr_idcd  = :drtr_idcd				" , arg.getParamText("drtr_idcd"))
			.query("    and a.cstm_idcd  = :cstm_idcd				" , arg.getParamText("cstm_idcd"))
			.query("    and b.item_idcd  = :item_idcd				" , arg.getParamText("item_idcd"))
			.query("    and b.cstm_lott_numb like %:cstm_lott_numb%	" , arg.getParamText("cstm_lott_numb" ))
			.query("    and a.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))		//발주상태
			.query("    and a.line_stat  < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat")))
			.query("    and a.line_clos  <> 1																")
			.query(" )																						")
			.query("select   invc_date																		")
			.query("       , sum(day_qntt)   as day_qntt,   sum(day_amnt)   as day_amnt						")
			.query("       , sum(week_qntt)  as week_qntt,  sum(week_amnt)  as week_amnt					")
			.query("       , sum(month_qntt) as month_qntt, sum(month_amnt) as month_amnt					")
			.query("       , concat(substr(_utf8'일월화수목금토',DAYOFWEEK(a.invc_date),1),'요일') as week			")
			.query("from (																					")
			.query("       select invc_date																	")
			.query("            , sum(invc_qntt) as day_qntt, sum(invc_amnt) as day_amnt					")
			.query("            , 0 as week_qntt , 0 as week_amnt											")
			.query("            , 0 as month_qntt , 0 as month_amnt											")
			.query("       from acpt a																		")
			.query("       group by invc_date																")
			.query("       union all																		")
			.query("       select invc_date																	")
			.query("            , 0 as day_qntt , 0 as day_amnt												")
			.query("            , (select sum(invc_qntt) from acpt r where a.invc_week = r.invc_week and r.invc_date <=a.invc_date) as week_qntt	")
			.query("            , (select sum(invc_amnt) from acpt r where a.invc_week = r.invc_week and r.invc_date <=a.invc_date) as week_amnt	")
			.query("            , 0 as month_qntt , 0 as month_amnt											")
			.query("       from acpt a																		")
			.query("       group by invc_date																")
			.query("       union all																		")
			.query("       select invc_date																	")
			.query("            , 0 as day_qntt,  0 as day_amnt												")
			.query("            , 0 as week_qntt, 0 as week_amnt											")
			.query("            , avg(month_qntt) as month_qntt, avg(month_amnt) as month_amnt				")
			.query("       from(																			")
			.query("             select invc_date															")
			.query("                  , sum(invc_qntt) over (order by invc_date asc) as month_qntt			")
			.query("                  , sum(invc_amnt) over (order by invc_date asc) as month_amnt			")
			.query("             from acpt																	")
			.query("             order by invc_date asc														")
			.query("       )a																				")
			.query("       group by invc_date																")
			.query(" ) a																					")
			.query("where a.invc_date >= :invc_date1", arg.getParamText("invc1_date"))
			.query("and   a.invc_date <= :invc_date2", arg.getParamText("invc2_date"))
			.query("group by invc_date																		")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateRowRec(map,"", "item_idcd,invc_qntt");

		data.param
			.query("call bom_work_kortc (				")
			.query("   :param       "  , param		)
			.query(" ) 								")
		;

		return data.selectForMap();
	}
}
