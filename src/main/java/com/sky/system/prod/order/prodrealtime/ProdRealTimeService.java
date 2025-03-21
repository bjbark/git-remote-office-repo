package com.sky.system.prod.order.prodrealtime;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.StringTokenizer;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class ProdRealTimeService extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.invc_date       , a.cstm_idcd         , a.drtr_idcd		")
			.query("		, b.item_idcd       , b.offr_qntt       , b.deli_date         , c.istt_qntt		")
			.query("		, d.item_code       , d.item_name       , d.item_spec							")
			.query("		, e.cstm_name       , u.user_name												")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl		")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name		")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd		")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm		")
			.query("		, a.crte_idcd       , a.crte_urif												")
			.query("		,(IFNULL(b.offr_qntt,0)-IFNULL(c.istt_qntt,0)) as qntt							")
		;
		data.param
			.where("from    purc_ordr_mast a																")
			.where("		left outer join purc_ordr_item b on a.invc_numb = b.invc_numb					")
			.where("		left outer join purc_istt_item c on a.invc_numb = c.invc_numb					")
			.where("		left outer join item_mast d on b.item_idcd = d.item_idcd						")
			.where("		left outer join cstm_mast e on a.cstm_idcd = e.cstm_idcd						")
			.where("		left outer join user_mast u on a.drtr_idcd = u.user_idcd						")
			.where("where   1=1																				")
			.where("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
			.where("and     b.deli_date = :deli_date" , arg.getParameter("deli_date							"))
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.invc_date between :invc1_date " , arg.getParamText("invc1_date" ))
			.where("                        and :invc2_date " , arg.getParamText("invc2_date" ))
			.where("and     a.drtr_idcd   = :drtr_idcd   " , arg.getParamText("drtr_idcd" ) , !"".equals(arg.getParamText("drtr_idcd")))
			.where("and     a.cstm_idcd   = :cstm_idcd   " , arg.getParamText("cstm_idcd" ) , !"".equals(arg.getParamText("cstm_idcd")))
			.where("and     b.item_idcd   = :item_idcd   " , arg.getParamText("item_idcd" ) , !"".equals(arg.getParamText("item_idcd")))
			.where("and     a.line_clos   = :line_clos   " , arg.getParamText("line_clos" ) , !"".equals(arg.getParamText("line_clos")))
			.where("and     b.deli_date between :deli1_date " , arg.getParamText("deli1_date" ))
			.where("                        and :deli2_date " , arg.getParamText("deli2_date" ))
			.where("and     a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by d.item_name																	")
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
			.query("with work as (																				")
			.query("    select b.cstm_idcd    , a.indn_qntt														")
			.query("         , case when a.invc_date >= :invc1_date" , arg.getParamText("invc1_date"))
			.query("                 and a.invc_date <= :invc2_date" , arg.getParamText("invc2_date"))
			.query("                then a.prod_qntt else 0 end as day_qntt										")
			.query("         , case when weekofyear(a.invc_date) >= weekofyear(:invc3_date)" , arg.getParamText("invc1_date"))
			.query("                 and weekofyear(a.invc_date) <= weekofyear(:invc4_date)" , arg.getParamText("invc2_date"))
			.query("                then a.prod_qntt else 0 end as week_qntt									")
			.query("         , case when substring(a.invc_date,1,6) = substring(:invc5_date,1,6)" , arg.getParamText("invc1_date"))
			.query("                then a.prod_qntt else 0 end as month_qntt									")
			.query("    from work_book a, pror_mast b															")
			.query("    where a.wkod_numb = b.invc_numb															")
			.query("    and   substring(a.invc_date,1,6) >= substring(:invc6_date,1,6)" , arg.getParamText("invc1_date"))
			.query("    and   substring(a.invc_date,1,6) <= substring(:invc7_date,1,6)" , arg.getParamText("invc2_date"))
			.query(" )																							")
			.query("select  a.cstm_idcd    , a.indn_qntt														")
			.query("      , c.cstm_code    , c.cstm_name														")
			.query("      , sum(day_qntt)   as day_qntt															")
			.query("      , sum(week_qntt)  as week_qntt														")
			.query("      , sum(month_qntt) as month_qntt														")
			.query("      , truncate(ifnull(ifnull(sum(day_qntt),0)  /sum(a.indn_qntt),0)*100,1) as day_per		")
			.query("      , truncate(ifnull(ifnull(sum(week_qntt),0) /sum(a.indn_qntt),0)*100,1) as week_per	")
			.query("      , truncate(ifnull(ifnull(sum(month_qntt),0)/sum(a.indn_qntt),0)*100,1) as month_per	")
			.query("from work a																					")
			.query("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.query("where    1=1																				")
			.query("and      find_name	like %:find_name%  "	, arg.getParamText("find_name"))
			.query("group by cstm_idcd																			")
			.query("order by cstm_name																			")
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
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("with work as (																				")
			.query("     select a.item_idcd , a.indn_qntt														")
			.query("          , case when a.invc_date >= :invc1_date" , arg.getParamText("invc1_date"))
			.query("                  and a.invc_date <= :invc2_date" , arg.getParamText("invc2_date"))
			.query("                 then a.prod_qntt else 0 end as day_qntt									")
			.query("          , case when weekofyear(a.invc_date) >= weekofyear(:invc3_date)" , arg.getParamText("invc1_date"))
			.query("                  and weekofyear(a.invc_date) <= weekofyear(:invc4_date)" , arg.getParamText("invc2_date"))
			.query("                 then a.prod_qntt else 0 end as week_qntt									")
			.query("          , case when substring(a.invc_date,1,6) = substring(:invc5_date,1,6)" , arg.getParamText("invc1_date"))
			.query("                 then a.prod_qntt else 0 end as month_qntt									")
			.query("     from work_book a																		")
			.query("     where substring(a.invc_date,1,6) >= substring(:invc6_date,1,6)" , arg.getParamText("invc1_date"))
			.query("       and substring(a.invc_date,1,6) <= substring(:invc7_date,1,6)" , arg.getParamText("invc2_date"))
			.query(" )																							")
			.query("select   a.item_idcd    , a.indn_qntt														")
			.query("       , i.lcls_idcd    , i.mcls_idcd    , i.scls_idcd    , i.item_code    , i.item_name	")
			.query("       , sum(day_qntt)   as day_qntt														")
			.query("       , sum(week_qntt)  as week_qntt														")
			.query("       , sum(month_qntt) as month_qntt														")
			.query("       , truncate(ifnull(ifnull(sum(day_qntt),0)  /sum(a.indn_qntt),0)*100,1) as day_per	")
			.query("       , truncate(ifnull(ifnull(sum(week_qntt),0) /sum(a.indn_qntt),0)*100,1) as week_per	")
			.query("       , truncate(ifnull(ifnull(sum(month_qntt),0)/sum(a.indn_qntt),0)*100,1) as month_per	")
			.query("from work a																					")
			.query("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.query("where    1=1																				")
			.query("and      find_name	like %:find_name%  "	, arg.getParamText("find_name"))
			.query("group by item_name, lcls_idcd																")
			.query("order by item_code																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}