package com.sky.system.sale.order.slorlist5;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class SlorList5Service extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param
		.query("select *																							")
		;

		data.param
			.where("from (																					")
			.where("with acpt as (																			")
			.where("    select  a.cstm_idcd , a.invc_numb													")
			.where("          , sum(acpt_cont) as acpt_cont													")
			.where("          , sum(invc_amnt) as invc_amnt													")
			.where("    from( select m.cstm_idcd , m.invc_numb												")
			.where("               , count(*) as acpt_cont													")
			.where("                , sum(ifnull(d.invc_amnt,0)) as invc_amnt								")
			.where("          from  acpt_mast m,															")
			.where("                acpt_item d																")
			.where("          where 1 = 1																	")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("          and   ifnull(json_value(m.json_data, '$.prod_trst_dvcd'),'') != '2000'				")
			;
		}
		
		data.param
			.where("          and   m.invc_numb = d.invc_numb												")
			.where("          and   m.cstm_idcd = :cstm_idcd ", arg.getParameter("cstm_idcd"				))
			.where("          and   m.invc_date >= :fr_dt ", arg.getParameter("invc1_date"					))
			.where("          and   m.invc_date <= :ed_dt ", arg.getParameter("invc2_date"					))
			.where("          and   m.drtr_idcd = :drtr_idcd", arg.getParameter("drtr_idcd"					))
			.where("          and   d.item_idcd = :item_idcd", arg.getParameter("item_idcd"					))
			.where("          and   m.line_stat < 2															")
			.where("          group by m.cstm_idcd , m.invc_numb											")
			.where("    ) a group by cstm_idcd																")
			.where("          ),																			")
			.where("     ostt as (																			")
			.where("       select a.cstm_idcd,sum(a.deli_ok) as deli_ok , a.remk_text						")
			.where("       from(																			")
			.where("          select m.cstm_idcd, a.acpt_numb , a.acpt_seqn, m.remk_text					")
			.where("               , 1  as deli_ok															")
			.where("          from   sale_ostt_mast m														")
			.where("          left outer join 																")
			.where("          (  select a.invc_numb    , a.acpt_numb    , a.acpt_seqn,   b.deli_date		")
			.where("                  , sum(a.ostt_qntt) as ostt_qntt, sum(b.invc_qntt) as invc_qntt 		")
			.where("             from sale_ostt_item a  													")
			.where("             left outer join acpt_item b  												")
			.where("             on  a.acpt_numb = b.invc_numb  											")
			.where("             and a.acpt_seqn = b.line_seqn  											")
			.where("             and a.ostt_qntt >= b.invc_qntt    											")
			.where("             group by a.acpt_numb , a.acpt_seqn 										")
			.where("          ) a on m.invc_numb = a.invc_numb 												")
			.where("          where  1=1																	")
			.where("          and    m.cstm_idcd = :cstm_idcd2 ", arg.getParameter("cstm_idcd"				))
			.where("          and    a.deli_date >= m.invc_date												")
			.where("          and   (acpt_numb, acpt_seqn) in (select d.invc_numb , d.line_seqn				")
			.where("                                           from   acpt_mast m							")
			.where("                                                , acpt_item d							")
			.where("                                           where  1 = 1									")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("                                       and    ifnull(json_value(m.json_data, '$.prod_trst_dvcd'),'') != '2000'				")
			;
		}
		
		data.param		
			.where("                                           and    m.invc_numb = d.invc_numb				")
			.where("                                           and    m.invc_date >= :fr_dt2"   , arg.getParameter("invc1_date"))
			.where("                                           and    m.invc_date <= :ed_dt2"   , arg.getParameter("invc2_date"))
			.where("                                           and    m.drtr_idcd = :drtr_idcd2", arg.getParameter("drtr_idcd"))
			.where("                                           and    d.item_idcd = :item_idcd2" , arg.getParameter("item_idcd"))
			.where("                                           and    m.line_stat < 2						")
			.where("                                          )												")
			.where("         group by m.cstm_idcd , a.acpt_numb , a.acpt_seqn								")
			.where("      ) a 	group by a.cstm_idcd		 												")
			.where(") 																						")
			.where("select a.cstm_idcd 																		")
			.where("      , (select cstm_name from cstm_mast r where a.cstm_idcd = r.cstm_idcd) as cstm_name")
			.where("      , a.acpt_cont																		")
			.where("      , a.invc_amnt																		")
			.where("      , ifnull(b.deli_ok, 0) as deli_ok													")
			.where("      , ifnull(a.acpt_cont,0)  - ifnull(b.deli_ok,0)  as deli_not						")
			.where("      , ifnull(b.deli_ok,0) / ifnull(a.acpt_cont,0) * 100 as deli_rate					")
			.where("      , b.remk_text																		")
			.where("from  acpt a																			")
			.where("      left outer join ostt b on  a.cstm_idcd = b.cstm_idcd								")
			.where("group by a.cstm_idcd																	")
			.where(" ) a																					")
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
			.query("select *																							")
		;

		data.param
			.where("from (																					")
			.where("with     acpt as (																		")
			.where("           select   a.item_idcd ,    a.invc_numb,    sum(a.acpt_cont) as acpt_cont		")
			.where("                  , sum(a.invc_amnt) as invc_amnt										")
			.where("           from(select d.item_idcd ,    m.invc_numb,    count(*) as acpt_cont			")
			.where("                       ,sum(ifnull(d.invc_amnt,0)) as invc_amnt							")
			.where("                from acpt_mast m , acpt_item d											")
			.where("                where 1 = 1																")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("                and    ifnull(json_value(m.json_data, '$.prod_trst_dvcd'),'') != '2000'		")
			;
		}
		
		data.param
			.where("                and   m.invc_numb = d.invc_numb											")
			.where("                and   m.cstm_idcd = :cstm_idcd ", arg.getParameter("cstm_idcd"			))
			.where("                and   m.invc_date >= :fr_dt ", arg.getParameter("invc1_date"			))
			.where("                and   m.invc_date <= :ed_dt ", arg.getParameter("invc2_date"			))
			.where("                and   m.drtr_idcd = :drtr_idcd", arg.getParameter("drtr_idcd"			))
			.where("                and   d.item_idcd = :item_idcd", arg.getParameter("item_idcd"			))
			.where("                and   m.line_stat < 2													")
			.where("                group by d.item_idcd, m.invc_numb										")
			.where("          )a group by a.item_idcd														")
			.where("         ),																				")
			.where("         ostt as (")
			.where("           select a.item_idcd ,    a.acpt_numb ,    a.acpt_seqn,   sum(deli_ok) as deli_ok	")
			.where("           from (select a.item_idcd ,    a.acpt_numb ,    a.acpt_seqn,    1 as deli_ok	")
			.where("                 from sale_ostt_mast m													")
			.where("                 left outer join 														")
			.where("                 (  select a.invc_numb    , a.acpt_numb    , a.acpt_seqn,   b.deli_date	")
			.where("                         , sum(a.ostt_qntt) as ostt_qntt, sum(b.invc_qntt) as invc_qntt ")
			.where("                         , a.item_idcd													")
			.where("                    from sale_ostt_item a  												")
			.where("                    left outer join acpt_item b  										")
			.where("                    on  a.acpt_numb = b.invc_numb  										")
			.where("                    and a.acpt_seqn = b.line_seqn  										")
			.where("                    and a.ostt_qntt >= b.invc_qntt  									")
			.where("                    group by a.acpt_numb , a.acpt_seqn 									")
			.where("                 ) a on m.invc_numb = a.invc_numb 										")
			.where("                 where	1= 1					 										")
			.where("                 and a.deli_date >= m.invc_date											")
			.where("                 and (acpt_numb,acpt_seqn) in (select d.invc_numb , d.line_seqn			")
			.where("                                               from acpt_mast m , acpt_item d			")
			.where("                                               where 1 = 1								")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("                                               and   ifnull(json_value(m.json_data, '$.prod_trst_dvcd'),'') != '2000'	")
			;
		}
		
		data.param		
			.where("                                               and   m.invc_numb = d.invc_numb			")
			.where("                                               and   m.invc_date >= :fr_dt2 ", arg.getParameter("invc1_date"	))
			.where("                                               and   m.invc_date <= :ed_dt2 ", arg.getParameter("invc2_date"	))
			.where("                                               and   m.drtr_idcd = :drtr_idcd2", arg.getParameter("drtr_idcd"))
			.where("                                               and   d.item_idcd = :item_idcd2", arg.getParameter("item_idcd"))
			.where("                                               and   m.line_stat < 2					")
			.where("                                               )")
			.where("                 group by a.item_idcd,a.acpt_numb,a.acpt_seqn							")
			.where("          ) a  group by item_idcd														")
			.where(")")
			.where("select a.item_idcd																		")
			.where("      , i.item_code																		")
			.where("      , i.item_name																		")
			.where("      , i.item_spec																		")
			.where("      , i.modl_name																		")
			.where("      , ifnull(a.acpt_cont,0) as acpt_cont												")
			.where("      , ifnull(a.invc_amnt,0) as invc_amnt												")
			.where("      , ifnull(b.deli_ok,0)   as deli_ok												")
			.where("      , ifnull(a.acpt_cont,0)  - ifnull(b.deli_ok,0)  as deli_not						")
			.where("      , ifnull(b.deli_ok,0) / ifnull(a.acpt_cont,0) * 100 as deli_rate					")
			.where("from acpt a																				")
			.where("     left outer join ostt b on a.item_idcd = b.item_idcd								")
			.where("     left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where(" ) a																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
