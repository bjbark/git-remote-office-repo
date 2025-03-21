package com.sky.system.custom.iypkg.sale.order.slorlist2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service("iypkg.SlorList2Service")
public class SlorList2Service extends DefaultServiceHandler{

	@Autowired
	private SeqListenerService sequance;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ,int start) throws Exception {
		DataMessage data = arg.newStorage("POS");

		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateProcedure (arg,"fr_invc_date,to_invc_date,cstm_idcd,item_idcd,find_name,chk");
		int maxsize = 0;
		if(rows == 0){
			rows = 999999999;
		}
		data.param
			.query("call sale_order_slorlist2( :param ",param)
			.query("     , :start",start)
			.query("     , :limit",rows)
			.query(")")
		;
		SqlResultMap a = data.selectForMap();
		if(a.size() > 0){
			maxsize = Integer.parseInt( a.get(0).getParamText("maxsize"));
			a.summary = new SqlResultRow("maxsize",maxsize);
		}
		return a;
	}

//		data.param
//			.total("select count(1) as maxsize																		")
//		;
//		data.param
//			.query("select * 																						")
//		;
//		data.param
//			.where("from (																							")
//			.where("with cte as (")
//			.where("    select   a.invc_numb																		")
//			.where("           , a.invc_date as crt_date															")
//			.where("           , a.invc_date																		")
//			.where("           , a.deli_date																		")
//			.where("           , a.prod_idcd as item_idcd															")
//			.where("           , bom.item_fxqt																		")
//			.where("           , bom.item_widh																		")
//			.where("           , a.acpt_qntt																		")
//			.where("           , pm.prod_name																		")
//			.where("           , c.cstm_name																		")
//			.where("           , bom.ppln_dvcd																		")
//			.where("           , bom.item_ttln																		")
//			.where("           , bom.item_ttwd																		")
//			.where("           , bom.item_leng																		")
//			.where("           , bom.fabc_idcd																		")
//			.where("           , pm.prod_spec																		")
//			.where("           , ordr.offr_qntt																		")
//			.where("           , ifnull(ostt.ostt_qntt,0) as ostt_qntt												")
//			.where("           , ostt.invc_date as ostt_date														")
//			.where("           , ifnull(a.acpt_qntt,0)-ifnull(ostt.ostt_qntt,0) as deff_qntt						")
//			.where("           , a.cstm_idcd																		")
//			.where("           , c2.cstm_name as dely_cstm_name														")
//			.where("           , if(length(ostt.invc_numb)>0 ,'4',if(length(prod.invc_numb)>0,'3'					")
//			.where("            ,if(length(istt.invc_numb)>0 ,'2',if(length(ordr.invc_numb)>0,'1','0')))) as stat	")
//			.where("           , ordr.invc_numb as 'r'																")
//			.where("    from																						")
//			.where("   ( select   a.invc_numb,a.line_stat,a.deli_date,a.cstm_idcd,a.prod_idcd						")
//			.where("     from boxx_acpt a																			")
//			.where("     where 1=1																					")
//			.where("     and   a.line_stat < 2																		")
//			.where("     and   a.invc_date >= :fr_invc_date", arg.getParameter("fr_invc_date"))
//			.where("     and   a.invc_date <= :to_invc_date", arg.getParameter("to_invc_date"))
//			.where("     and   a.deli_date >= :fr_deli_date", arg.getParameter("fr_deli_date"))
//			.where("     and   a.deli_date <= :to_deli_date", arg.getParameter("to_deli_date"))
//			.where("     and   a.cstm_idcd  = :cstm_idcd", arg.getParameter("cstm_idcd"))
//			.where("     and   a.prod_idcd  = :item_idcd", arg.getParameter("item_idcd"))
//			.where("     and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
//			.where("    ) cbin																						")
//			.where("    left outer join boxx_acpt a on a.invc_numb = cbin.invc_numb									")
//			.where("    left outer join boxx_acpt_bom bom on bom.invc_numb = cbin.invc_numb							")
//			.where("    left outer join (select prod_idcd,pcod_numb,prod_name,prod_spec from product_mast			")
//			.where("                    ) pm   on pm.prod_idcd = a.prod_idcd										")
//			.where("    left outer join cstm_mast c       on c.cstm_idcd = a.cstm_idcd								")
//			.where("    left outer join ( select a.invc_numb														")
//			.where("                      from ( select invc_numb from boxx_acpt where invc_date >= :fr_invc_date2 ) cdin", arg.getParameter("fr_invc_date"))
//			.where("                      left outer join (select invc_numb from boxx_acpt) a on cdin.invc_numb = a.invc_numb")
//			.where("                      left outer join prod_plan_acpt ap on a.invc_numb = ap.acpt_numb			")
//			.where("                      left outer join prod_plan p on p.invc_numb = ap.invc_numb					")
//			.where("                      left outer join pror_item o on o.invc_numb = p.prod_trst_numb				")
//			.where("                      left outer join (select wkod_numb,wkod_seqn from work_book				")
//			.where("                      ) w on w.wkod_numb = o.invc_numb and w.wkod_seqn = o.line_seqn			")
//			.where("                      where o.invc_numb is not null												")
//			.where("                      group by a.invc_numb														")
//			.where("    ) prod on a.invc_numb = prod.invc_numb														")
//			.where("    left outer join (  select it.invc_numb														")
//			.where("                       from purc_istt_item a													")
//			.where("                       left outer join purc_istt_mast b on a.invc_numb = b.invc_numb			")
//			.where("                       left outer join purc_ordr_item o on a.orig_invc_numb = o.invc_numb and a.orig_seqn = o.line_seqn")
//			.where("                       left outer join boxx_acpt it on it.invc_numb = o.orig_invc_numb			")
//			.where("                       where it.invc_date >= :fr_invc_date3", arg.getParameter("fr_invc_date"))
//			.where("                       group by it.invc_numb													")
//			.where("    ) istt on a.invc_numb = istt.invc_numb														")
//			.where("    left outer join ( select a.orig_invc_numb													")
//			.where("                           , a.orig_seqn														")
//			.where("                           , a.invc_numb														")
//			.where("                           , a.line_seqn														")
//			.where("                           , sum(ifnull(a.offr_qntt,0)) as offr_qntt							")
//			.where("                           , sum(ifnull(a.offr_amnt,0)) as offr_amnt							")
//			.where("                           , b.cstm_idcd														")
//			.where("                      from (																	")
//			.where("                              select a.invc_numb ,a.line_seqn									")
//			.where("                              from purc_ordr_item a												")
//			.where("                              left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb		")
//			.where("                              where a.line_stat < 2												")
//			.where("                              and   b.invc_date >= :fr_invc_date4", arg.getParameter("fr_invc_date"))
//			.where("                              ) cdin															")
//			.where("                      left outer join 	purc_ordr_item a on a.invc_numb = cdin.invc_numb and a.line_seqn = cdin.line_seqn						 ")
//			.where("                      left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb				")
//			.where("                      where a.line_stat < 2														")
//			.where("                      group by a.orig_invc_numb													")
//			.where("    ) ordr on a.invc_numb = ordr.orig_invc_numb													")
//			.where("    left outer join ( select o.acpt_numb, sum(ifnull(o.ostt_qntt,0)) as ostt_qntt , o.invc_numb, max(om.invc_date) as invc_date")
//			.where("                      from sale_ostt_item o														")
//			.where("                      left outer join sale_ostt_mast om on om.invc_numb = o.invc_numb ")
//			.where("                      where om.line_stat < 2													")
//			.where("                      and   om.invc_date >= :fr_invc_date5", arg.getParameter("fr_invc_date"))
//			.where("                      group by o.acpt_numb														")
//			.where("    ) ostt on a.invc_numb = ostt.acpt_numb														")
//			.where("    left outer join cstm_mast c2 on c2.cstm_idcd = ordr.cstm_idcd								")
//			.where(")																								")
//			.where("select   a.invc_numb																			")
//			.where("       , a.crt_date 																			")
//			.where("       , a.invc_date																			")
//			.where("       , a.deli_date																			")
//			.where("       , a.item_idcd																			")
//			.where("       , a.item_fxqt																			")
//			.where("       , a.item_widh																			")
//			.where("       , a.acpt_qntt																			")
//			.where("       , a.prod_name																			")
//			.where("       , a.cstm_name																			")
//			.where("       , a.ppln_dvcd																			")
//			.where("       , a.item_ttln																			")
//			.where("       , a.item_ttwd																			")
//			.where("       , a.item_leng																			")
//			.where("       , a.prod_spec																			")
//			.where("       , f.fabc_name																			")
//			.where("       , f.fabc_spec																			")
//			.where("       , a.offr_qntt																			")
//			.where("       , a.ostt_qntt																			")
//			.where("       , a.ostt_date																			")
//			.where("       , a.deff_qntt																			")
//			.where("       , a.cstm_idcd																			")
//			.where("       , a.dely_cstm_name																		")
//			.where("       , a.stat																					")
//			.where("       , 1 as rnum																				")
//			.where("       , null as cnt																			")
//			.where("       , max(a.invc_numb) as crt_numb															")
//			.where("from cte a																						")
//			.where("left outer join fabc_mast f on a.fabc_idcd = f.fabc_idcd										")
//			.where("group by  a.invc_date, a.invc_numb, a.item_idcd													")
//		;
//
//		if(arg.getParamText("chk").contains("1")){
//			data.param
//				.where("union all																						")
//				.where("select   null as invc_numb																		")
//				.where("       , a.crt_date																				")
//				.where("       , a.invc_date																			")
//				.where("       , null as deli_date																		")
//				.where("       , null as item_idcd																		")
//				.where("       , null as item_fxqt																		")
//				.where("       , null as item_widh																		")
//				.where("       , sum(ifnull(a.acpt_qntt,0)) as acpt_qntt												")
//				.where("       , null as prod_name																		")
//				.where("       , concat(a.cstm_name, ' 계') as cstm_name													")
//				.where("       , null as ppln_dvcd																		")
//				.where("       , null as item_ttln																		")
//				.where("       , null as item_ttwd																		")
//				.where("       , null as item_leng																		")
//				.where("       , null as prod_spec																		")
//				.where("       , null as fabc_name																		")
//				.where("       , null as fabc_spec																		")
//				.where("       , sum(ifnull(a.offr_qntt,0)) as offr_qntt												")
//				.where("       , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt												")
//				.where("       , null as ostt_date																		")
//				.where("       , null as deff_qntt																		")
//				.where("       , max(a.cstm_idcd) as cstm_idcd															")
//				.where("       , null as dely_cstm_name																	")
//				.where("       , null as stat																			")
//				.where("       , 2 as rnum																				")
//				.where("       , count(*) as cnt																		")
//				.where("       , max(a.invc_numb) as crt_numb															")
//				.where("from cte a																						")
//				.where("group by a.invc_date, a.cstm_idcd																")
//				.where("having cnt > 1																					")
//			;
//		}
//		if(arg.getParamText("chk").contains("2")){
//			data.param
//				.where("union all																						")
//				.where("select   null as invc_numb																		")
//				.where("       , a.crt_date																				")
//				.where("       , a.invc_date																			")
//				.where("       , null as deli_date																		")
//				.where("       , null as item_idcd																		")
//				.where("       , null as item_fxqt																		")
//				.where("       , null as item_widh																		")
//				.where("       , sum(ifnull(a.acpt_qntt,0)) as acpt_qntt												")
//				.where("       , null as prod_name																		")
//				.where("       , '일계'as cstm_name																		")
//				.where("       , null as ppln_dvcd																		")
//				.where("       , null as item_ttln																		")
//				.where("       , null as item_ttwd																		")
//				.where("       , null as item_leng																		")
//				.where("       , null as prod_spec																		")
//				.where("       , null as fabc_name																		")
//				.where("       , null as fabc_spec																		")
//				.where("       , sum(ifnull(a.offr_qntt,0)) as offr_qntt												")
//				.where("       , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt												")
//				.where("       , null as ostt_date																		")
//				.where("       , null as deff_qntt																		")
//				.where("       , max(a.cstm_idcd) as cstm_idcd															")
//				.where("       , null as dely_cstm_name																	")
//				.where("       , null as stat																			")
//				.where("       , 3 as rnum																				")
//				.where("       , count(*) as cnt																		")
//				.where("       , max(a.invc_numb) as crt_numb															")
//				.where("from cte a																						")
//				.where("group by a.invc_date																			")
//			;
//		}
//		if(arg.getParamText("chk").contains("3")){
//			data.param
//				.where("union all																						")
//				.where("select   null as invc_numb																		")
//				.where("       , concat(substr(a.invc_date,1,6),'99')as crt_date										")
//				.where("       , substr(a.invc_date,1,6) as invc_date													")
//				.where("       , null as deli_date																		")
//				.where("       , null as item_idcd																		")
//				.where("       , null as item_fxqt																		")
//				.where("       , null as item_widh																		")
//				.where("       , sum(ifnull(a.acpt_qntt,0)) as acpt_qntt												")
//				.where("       , null as prod_name																		")
//				.where("       , '월계'as cstm_name																		")
//				.where("       , null as ppln_dvcd																		")
//				.where("       , null as item_ttln																		")
//				.where("       , null as item_ttwd																		")
//				.where("       , null as item_leng																		")
//				.where("       , null as prod_spec																		")
//				.where("       , null as fabc_name																		")
//				.where("       , null as fabc_spec																		")
//				.where("       , sum(ifnull(a.offr_qntt,0)) as offr_qntt												")
//				.where("       , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt												")
//				.where("       , null as ostt_date																		")
//				.where("       , null as deff_qntt																		")
//				.where("       , max(a.cstm_idcd) as cstm_idcd															")
//				.where("       , null as dely_cstm_name																	")
//				.where("       , null as stat																			")
//				.where("       , 4 as rnum																				")
//				.where("       , count(*) as cnt																		")
//				.where("       , max(a.invc_numb) as crt_numb															")
//				.where("from cte a																						")
//				.where("group by concat(substr(a.invc_date,1,6),'99')													")
//			;
//		}
//		if(arg.getParamText("chk").contains("4")){
//			data.param
//				.where("union all																						")
//				.where("select   null as invc_numb																		")
//				.where("       , '9999999' as crt_date																	")
//				.where("       , '합계'as invc_date																		")
//				.where("       , null as deli_date																		")
//				.where("       , null as item_idcd																		")
//				.where("       , null as item_fxqt																		")
//				.where("       , null as item_widh																		")
//				.where("       , sum(ifnull(a.acpt_qntt,0)) as acpt_qntt												")
//				.where("       , null as prod_name																		")
//				.where("       , null as cstm_name																		")
//				.where("       , null as ppln_dvcd																		")
//				.where("       , null as item_ttln																		")
//				.where("       , null as item_ttwd																		")
//				.where("       , null as item_leng																		")
//				.where("       , null as prod_spec																		")
//				.where("       , null as fabc_name																		")
//				.where("       , null as fabc_spec																		")
//				.where("       , sum(ifnull(a.offr_qntt,0)) as offr_qntt												")
//				.where("       , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt												")
//				.where("       , null as ostt_date																		")
//				.where("       , null as deff_qntt																		")
//				.where("       , max(a.cstm_idcd) as cstm_idcd															")
//				.where("       , null as dely_cstm_name																	")
//				.where("       , null as stat																			")
//				.where("       , 5 as rnum																				")
//				.where("       , count(*) as cnt																		")
//				.where("       , max(a.invc_numb) as crt_numb															")
//				.where("from cte a																						")
//				.where("group by '99999999'																				")
//			;
//		}
//		data.param
//			.where("order by crt_date, cstm_idcd, rnum limit 999999999												")
//			.where(") a")
//		;
//
//		SqlResultMap result = new SqlResultMap();
//		if (page == 0 && rows == 0){
//			result = data.selectForMap(sort) ;
//		} else {
//			result = data.selectForMap(page, rows, (page==1), sort );
//		}
//		data.clear();
//
//		return result;
//
//	}
}
