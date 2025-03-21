package com.sky.system.custom.iypkg.sale.sale.salelist;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class SaleListService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	/**
	 * 일자별 매출현황
	 */
	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select *																							")
		;
		if(arg.getParamText("ck1").equals("1")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select  b.invc_date																			")
				.where("          , a.invc_numb																			")
				.where("          , c.cstm_idcd																			")
				.where("          , c.cstm_name																			")
				.where("          , bo.invc_date as acpt_date															")
				.where("          , p.prod_name																			")
				.where("          , p.prod_spec																			")
				.where("          , a.ostt_qntt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.pcod_numb																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    where 1=1																					")
				.where("    and   b.invc_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   b.invc_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   b.drtr_idcd  = :drtr_idcd   ", arg.getParameter("drtr_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(")																								")
				.where("select  a.invc_date																				")
				.where("      , a.invc_numb																				")
				.where("      , a.cstm_idcd																				")
				.where("      , a.cstm_name																				")
				.where("      , a.acpt_date																				")
				.where("      , a.prod_name																				")
				.where("      , a.prod_spec																				")
				.where("      , a.ostt_qntt																				")
				.where("      , a.sale_pric																				")
				.where("      , a.sale_amnt																				")
				.where("      , a.acpt_numb																				")
				.where("      , a.pcod_numb																				")
				.where("      , a.invc_date as crt_date																	")
				.where("      , 1 as rnum																				")
				.where("from cte a																						")
			;

			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("union all																					")
					.where("select a.invc_date																			")
					.where("     , '' as invc_numb																		")
					.where("     , max(ifnull(a.cstm_idcd,''))															")
					.where("     , '' as cstm_name																		")
					.where("     , '일계' as acpt_date																	")
					.where("     , '' as prod_name																		")
					.where("     , '' as prod_spec																		")
					.where("     , sum(a.ostt_qntt)																		")
					.where("     , '' as sale_pric																		")
					.where("     , sum(a.sale_amnt)																		")
					.where("     , '' as acpt_numb																		")
					.where("     , '' as pcod_numb																		")
					.where("     , a.invc_date as crt_date																")
					.where("     , 2 as rnum																			")
					.where("from cte a																					")
					.where("group by a.invc_date																		")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("union all																					")
					.where("select substr(a.invc_date,1,6) as invc_date													")
					.where("     , '' as invc_numb																		")
					.where("     , max(ifnull(a.cstm_idcd,''))															")
					.where("     , '' as cstm_name																		")
					.where("     , '월계' as prod_name																	")
					.where("     , '' as acpt_date																		")
					.where("     , '' as prod_spec																		")
					.where("     , sum(a.ostt_qntt)																		")
					.where("     , '' as sale_pric																		")
					.where("     , sum(a.sale_amnt)																		")
					.where("     , '' as acpt_numb																		")
					.where("     , '' as pcod_numb																		")
					.where("     , concat(substr(a.invc_date,1,6),'99') as crt_date										")
					.where("     , 3 as rnum																			")
					.where("from cte a																					")
					.where("group by  a.cstm_idcd , concat(substr(a.invc_date,1,6), '99')												")
				;
			}
			if(arg.getParamText("chk").contains("4")){
				data.param
					.where("union all																					")
					.where("select '합계' as invc_date																	")
					.where("     , '' as invc_numb																		")
					.where("     , max(ifnull(a.cstm_idcd,''))															")
					.where("     , '' as cstm_name																		")
					.where("     , '' as prod_name																		")
					.where("     , '' as acpt_date																		")
					.where("     , '' as prod_spec																		")
					.where("     , sum(a.ostt_qntt)																		")
					.where("     , '' as sale_pric																		")
					.where("     , sum(a.sale_amnt)																		")
					.where("     , '' as acpt_numb																		")
					.where("     , '' as pcod_numb																		")
					.where("     , '9999999999' as crt_date																")
					.where("     ,  4 as rnum																			")
					.where("from cte a																					")
					.where("group by '9999999999'																		")
				;
			}
			data.param
				.where("order by cstm_idcd , crt_date,  rnum limit 9999999												")
				.where(") a																								")
			;
		}
		if(arg.getParamText("ck2").equals("2")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("   select  a.rqod_date																			")
				.where("         , a.invc_numb																			")
				.where("         , b.cstm_idcd																			")
				.where("         , c.cstm_name																			")
				.where("         , bo.invc_date as acpt_date															")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.rqod_qntt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.acpt_numb																			")
				.where("         , a.pcod_numb																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    where 1=1																					")
				.where("    and   a.rqod_invc_numb is not null															")
				.where("    and   a.rqod_date >= :fr_invc_date ", arg.getParameter("invc_date1"))
				.where("    and   a.rqod_date <= :to_invc_date ", arg.getParameter("invc_date2"))
				.where("    and   b.drtr_idcd  = :drtr_idcd    ", arg.getParameter("drtr_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd    ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(")																								")
				.where("select a.rqod_date																				")
				.where("     , a.invc_numb																				")
				.where("     , a.cstm_idcd																				")
				.where("     , a.cstm_name																				")
				.where("     , a.acpt_date																				")
				.where("     , a.prod_name																				")
				.where("     , a.prod_spec																				")
				.where("     , a.rqod_qntt																				")
				.where("     , a.sale_pric																				")
				.where("     , a.sale_amnt																				")
				.where("     , a.acpt_numb																				")
				.where("     , a.pcod_numb																				")
				.where("     , a.rqod_date as crt_date																	")
				.where("     , 1 as rnum																				")
				.where("from cte a																						")
			;

			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("union all																					")
					.where("select a.rqod_date																			")
					.where("     , '' as invc_numb																		")
					.where("     , max(ifnull(a.cstm_idcd,''))															")
					.where("     , '' as cstm_name																		")
					.where("     , '일계' as acpt_date																	")
					.where("     , '' as prod_name																		")
					.where("     , '' as prod_spec																		")
					.where("     , sum(a.rqod_qntt)																		")
					.where("     , '' as sale_pric																		")
					.where("     , sum(a.sale_amnt)																		")
					.where("     , '' as acpt_numb																		")
					.where("     , '' as pcod_numb																		")
					.where("     , a.rqod_date as crt_date																")
					.where("     , 2 as rnum																			")
					.where("from cte a																					")
					.where("group by a.rqod_date																		")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select  substr(a.rqod_date,1,6) as rqod_date											")
					.where("         , '' as invc_numb																	")
					.where("         , max(ifnull(a.cstm_idcd,''))														")
					.where("         , '' as cstm_name																	")
					.where("         , '월계' as prod_name																")
					.where("         , '' as acpt_date																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as pcod_numb																	")
					.where("         , concat(substr(a.rqod_date,1,6),'99') as crt_date									")
					.where("         , 3 as rnum																		")
					.where("    from cte a																				")
					.where("    group by concat(substr(a.rqod_date,1,6), '99')											")
				;
			}
			if(arg.getParamText("chk").contains("4")){
				data.param
					.where("    union all																				")
					.where("    select  '합계' as rqod_date																")
					.where("         , '' as invc_numb																	")
					.where("         , max(ifnull(a.cstm_idcd,''))														")
					.where("         , '' as cstm_name																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as acpt_date																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as pcod_numb																	")
					.where("         , '9999999999' as crt_date															")
					.where("         ,  4 as rnum																		")
					.where("    from cte a																				")
					.where("    group by '9999999999'																	")
				;
			}
			data.param
				.where("order by crt_date, rnum limit 9999999															")
				.where(") a																								")
			;
		}

		if(arg.getParamText("ck3").equals("2")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("   select  a.sale_date																			")
				.where("         , a.invc_numb																			")
				.where("         , c.cstm_name																			")
				.where("         , bo.invc_date as acpt_date															")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.sale_qntt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.acpt_numb																			")
				.where("         , a.pcod_numb																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    where 1=1																					")
				.where("    and   a.sale_invc_numb is not null															")
				.where("    and   a.sale_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   a.sale_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   b.drtr_idcd  = :drtr_idcd   ", arg.getParameter("drtr_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(")																								")
				.where("   select  a.sale_date																			")
				.where("         , a.invc_numb																			")
				.where("         , a.cstm_name																			")
				.where("         , a.acpt_date																			")
				.where("         , a.prod_name																			")
				.where("         , a.prod_spec																			")
				.where("         , a.sale_qntt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.acpt_numb																			")
				.where("         , a.pcod_numb																			")
				.where("         , a.sale_date as crt_date																")
				.where("         , 1 as rnum																			")
				.where("    from cte a																					")
			;

			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select a.sale_date																		")
					.where("         , '' as invc_numb																	")
					.where("         , '' as cstm_name																	")
					.where("         , '일계' as acpt_date																")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as pcod_numb																	")
					.where("         , a.sale_date as crt_date															")
					.where("         , 2 as rnum																		")
					.where("    from cte a																				")
					.where("    group by a.sale_date																	")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all")
					.where("    select  substr(a.sale_date,1,6) as sale_date											")
					.where("         , '' as invc_numb																	")
					.where("         , '' as cstm_name																	")
					.where("         , '월계' as prod_name																")
					.where("         , '' as acpt_date																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as pcod_numb																	")
					.where("         , concat(substr(a.sale_date,1,6),'99') as crt_date									")
					.where("         , 3 as rnum																		")
					.where("    from cte a																				")
					.where("    group by concat(substr(a.sale_date,1,6), '99')											")
				;
			}
			if(arg.getParamText("chk").contains("4")){
				data.param
					.where("    union all																				")
					.where("    select  '합계' as sale_date																")
					.where("         , '' as invc_numb																	")
					.where("         , '' as cstm_name																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as acpt_date																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as pcod_numb																	")
					.where("         , '9999999999' as crt_date															")
					.where("         ,  4 as rnum																		")
					.where("    from cte a																				")
					.where("    group by '9999999999'																	")
				;
			}
			data.param
				.where("order by crt_date, rnum limit 9999999															")
				.where(") a																								")
			;
		}
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 거래처별 매출현황
	 */
	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select *																							")
		;

		if(arg.getParamText("ck1").equals("1")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.rqod_invc_numb																		")
				.where("         , b.cstm_idcd																			")
				.where("         , a.rqod_date																			")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date  as invc_date															")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.ostt_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   b.invc_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   b.invc_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   p.prod_idcd  = :drtr_idcd   ", arg.getParameter("prod_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(" )																								")
				.where("    select  a.rqod_invc_numb																	")
				.where("          , a.cstm_idcd																			")
				.where("          , a.rqod_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.invc_date																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.ostt_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , a.invc_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , a.cstm_idcd																		")
					.where("         , '' as rqod_date																	")
					.where("         , concat(a.cstm_name, ' 계') as cstm_name											")
					.where("         , '' as drtr_name																	")
					.where("         , null as invc_date																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 2 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.invc_date, a.cstm_idcd														")
					.where("    having cnt > 1																			")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.cstm_idcd) as cstm_idcd													")
					.where("         , '' as rqod_date																	")
					.where("         , '일계' as cstm_name																")
					.where("         , '' as drtr_name																	")
					.where("         , a.invc_date as invc_date															")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
				;
				if(arg.getParamText("stor_grp").toUpperCase().equals("N1000DAE-A1000")){
					data.param
						.where("    group by a.cstm_idcd, crt_date														")
					;
				}else{
					data.param
						.where("    group by a.invc_date																")
					;
				}
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.cstm_idcd) as cstm_idcd													")
					.where("         , '' as rqod_date																	")
					.where("         , '월계' as cstm_name																")
					.where("         , '' as drtr_name																	")
					.where("         , substr(a.invc_date,1,6) as invc_date												")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 4 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , concat(substr(a.invc_date,1,6),'99') as crt_date									")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.cstm_idcd , substr(a.invc_date,1,6)											")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.cstm_idcd) as cstm_idcd													")
					.where("         , '' as rqod_date																	")
					.where("         , '합계' as cstm_name																")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 5 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , '99999999' as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by  '9999999999'																	")
				;
			}
			data.param
				.where("    order by cstm_idcd , crt_date, rnum limit 9999999											")
				.where(") a																								")
			;
		}

		if(arg.getParamText("ck2").equals("2")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.rqod_invc_numb																		")
				.where("         , b.cstm_idcd																			")
				.where("         , a.rqod_date																			")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date  as invc_date															")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.rqod_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   a.rqod_invc_numb is not null															")
				.where("    and   b.invc_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   b.invc_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   p.prod_idcd  = :drtr_idcd   ", arg.getParameter("prod_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(")																								")
				.where("    select  a.rqod_invc_numb																	")
				.where("          , a.cstm_idcd																			")
				.where("          , a.rqod_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.invc_date																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.rqod_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , rqod_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("		union all																			")
					.where("    select '' as rqod_invc_numb																")
					.where("         , a.cstm_idcd																		")
					.where("         , '' as rqod_date																	")
					.where("         , concat(a.cstm_name, ' 계') as cstm_name											")
					.where("         , '' as drtr_name																	")
					.where("         , null as invc_date																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 2 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.rqod_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.rqod_date, a.cstm_idcd														")
					.where("    having cnt > 1																			")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.cstm_idcd) as cstm_idcd													")
					.where("         , a.rqod_date as rqod_date															")
					.where("         , '일계' as cstm_name																")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.rqod_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.rqod_date																	")
				;
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.cstm_idcd) as cstm_idcd													")
					.where("         ,  substr(a.rqod_date,1,6) as rqod_date											")
					.where("         , '월계' as cstm_name																")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 4 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , concat(substr(a.rqod_date,1,6),'99') as crt_date									")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by substr(a.rqod_date,1,6)														")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.cstm_idcd) as cstm_idcd													")
					.where("         , substr(a.rqod_date,1,6) as rqod_date												")
					.where("         , '합계' as cstm_name																")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , '99999999' as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by  '9999999999'																	")
				;
			}
			data.param
				.where("    order by crt_date, cstm_idcd, rnum limit 9999999											")
				.where(") a																								")
			;
		}

		if(arg.getParamText("ck3").equals("2")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.rqod_invc_numb																		")
				.where("         , b.cstm_idcd																			")
				.where("         , a.rqod_date																			")
				.where("         , a.sale_date																			")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date  as invc_date															")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.sale_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   a.sale_invc_numb is not null															")
				.where("    and   b.invc_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   b.invc_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   p.prod_idcd  = :drtr_idcd   ", arg.getParameter("prod_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(" )																								")
				.where("    select  a.rqod_invc_numb																	")
				.where("          , a.cstm_idcd																			")
				.where("          , a.rqod_date																			")
				.where("          , a.sale_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.invc_date																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.sale_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , a.sale_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("          , a.cstm_idcd																		")
					.where("          , '' as rqod_date																	")
					.where("          , null as sale_date																")
					.where("          , concat(a.cstm_name, ' 계') as cstm_name											")
					.where("          , '' as drtr_name																	")
					.where("          , null as invc_date																")
					.where("          , '' as acpt_numb																	")
					.where("          , '' as prod_name																	")
					.where("          , '' as prod_spec																	")
					.where("          , sum(a.sale_qntt)																")
					.where("          , sum(a.sale_amnt)																")
					.where("          , '' as sale_pric																	")
					.where("          , '' as pcod_numb																	")
					.where("          , 2 as rnum																		")
					.where("          , count(*) as cnt																	")
					.where("          , a.sale_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.sale_date, a.cstm_idcd														")
					.where("    having cnt > 1																			")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("          , max(a.cstm_idcd) as cstm_idcd													")
					.where("          , '' as rqod_date																	")
					.where("          , a.sale_date as sale_date														")
					.where("          , '일계' as cstm_name																")
					.where("          , '' as drtr_name																	")
					.where("          , '' as invc_date																	")
					.where("          , '' as acpt_numb																	")
					.where("          , '' as prod_name																	")
					.where("          , '' as prod_spec																	")
					.where("          , sum(a.sale_qntt)																")
					.where("          , sum(a.sale_amnt)																")
					.where("          , '' as sale_pric																	")
					.where("          , '' as pcod_numb																	")
					.where("          , 3 as rnum																		")
					.where("          , count(*) as cnt																	")
					.where("          , a.sale_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.sale_date																	")
				;
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("          , max(a.cstm_idcd) as cstm_idcd													")
					.where("          , '' as rqod_date																	")
					.where("          , substr(a.sale_date,1,6) as sale_date											")
					.where("          , '월계' as cstm_name																")
					.where("          , '' as drtr_name																	")
					.where("          , '' as invc_date																	")
					.where("          , '' as acpt_numb																	")
					.where("          , '' as prod_name																	")
					.where("          , '' as prod_spec																	")
					.where("          , sum(a.sale_qntt)																")
					.where("          , sum(a.sale_amnt)																")
					.where("          , '' as sale_pric																	")
					.where("          , '' as pcod_numb																	")
					.where("          , 4 as rnum																		")
					.where("          , count(*) as cnt																	")
					.where("          , concat(substr(a.sale_date,1,6),'99') as crt_date								")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by substr(a.invc_date,1,6)														")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("          , max(a.cstm_idcd) as cstm_idcd													")
					.where("          , '' as rqod_date																	")
					.where("          , substr(a.sale_date,1,6) as sale_date											")
					.where("          , '합계' as cstm_name																")
					.where("          , '' as drtr_name																	")
					.where("          , '' as invc_date																	")
					.where("          , '' as acpt_numb																	")
					.where("          , '' as prod_name																	")
					.where("          , '' as prod_spec																	")
					.where("          , sum(a.sale_qntt)																")
					.where("          , sum(a.sale_amnt)																")
					.where("          , '' as sale_pric																	")
					.where("          , '' as pcod_numb																	")
					.where("          , 3 as rnum																		")
					.where("          , count(*) as cnt																	")
					.where("          , '99999999' as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by  '9999999999'																	")
				;
			}
			data.param
				.where("    order by crt_date, cstm_idcd, rnum limit 9999999											")
				.where(") a																								")
			;
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 담당자별 매출현황
	 */

	public SqlResultMap getList3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select *																							")
		;

		if(arg.getParamText("ck1").equals("1")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.invc_numb																			")
				.where("         , b.drtr_idcd																			")
				.where("         , b.invc_date as invc_date2															")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date																			")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.ostt_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("         , p.prod_idcd																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   b.invc_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   b.invc_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   b.drtr_idcd  = :drtr_idcd   ", arg.getParameter("drtr_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where("  )																								")
				.where("  select    a.invc_numb																			")
				.where("          , a.drtr_idcd																			")
				.where("          , a.invc_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.ostt_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , a.prod_idcd																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , a.invc_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("  union all																					")
					.where("    select '' as invc_numb																	")
					.where("         , a.drtr_idcd																		")
					.where("         , null as invc_date																")
					.where("         , '' as cstm_name																	")
					.where("         , concat(a.drtr_name,' 계') as drtr_name																")
					.where("         , '' as acpt_numb 																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , a.prod_idcd																		")
					.where("         , 2 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.invc_date, a.drtr_idcd														")
					.where("    having cnt > 1																			")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("  union all																					")
					.where("  select '' as invc_numb																	")
					.where("         , max(a.drtr_idcd) as drtr_idcd													")
					.where("         , a.invc_date as invc_date															")
					.where("         , '' as cstm_name																	")
					.where("         , '일계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , a.prod_idcd																		")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.invc_date																	")
				;
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         ,  max(a.drtr_idcd) as drtr_idcd													")
					.where("         , substr(a.invc_date,1,6) as invc_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '월계' drtr_name																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , a.prod_idcd																		")
					.where("         , 4 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , concat(substr(a.invc_date,1,6),'99') as crt_date									")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by substr(a.invc_date,1,6)														")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(drtr_idcd) as drtr_idcd														")
					.where("         , substr(a.invc_date,1,6) as invc_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '합계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , a.prod_idcd																		")
					.where("         , 5 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , '99999999' as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by  '9999999999'																	")
				;
			}
			data.param
				.where("    order by crt_date , drtr_idcd , rnum limit 9999999											")
				.where(") a																								")
			;
		}

		if(arg.getParamText("ck2").equals("2")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.invc_numb																			")
				.where("         , b.drtr_idcd																			")
				.where("         , a.rqod_date  as rqod_date2															")
				.where("         , a.rqod_date																			")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date																			")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.rqod_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   a.rqod_invc_numb is not null															")
				.where("    and   a.rqod_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   a.rqod_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   p.prod_idcd  = :prod_idcd   ", arg.getParameter("prod_idcd"))
				.where("    and   b.drtr_idcd  = :drtr_idcd   ", arg.getParameter("drtr_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where("  )																								")
				.where("  select    a.invc_numb																			")
				.where("          , a.drtr_idcd																			")
				.where("          , a.invc_date																			")
				.where("          , a.rqod_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.rqod_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , a.rqod_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , a.drtr_idcd																		")
					.where("         , '' as invc_date																	")
					.where("         , null as rqod_date																")
					.where("         , '' as cstm_name																	")
					.where("         , '소계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 2 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.rqod_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.rqod_date, a.drtr_idcd														")
					.where("    having cnt > 1																			")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("    union all")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.drtr_idcd) as drtr_idcd													")
					.where("         , '' as invc_date																	")
					.where("         , '' as rqod_date																	")
					.where("         , '' as cstm_name																	")
					.where("         , '일계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.rqod_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.rqod_date																	")
				;
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.drtr_idcd) as drtr_idcd													")
					.where("         , '' as invc_date																	")
					.where("         , substr(a.rqod_date,1,6) as rqod_date												")
					.where("         , '월계' drtr_name																	")
					.where("         , '' as cstm_name																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 4 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , concat(substr(a.rqod_date,1,6),'99') as crt_date									")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by substr(a.invc_date,1,6)														")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.drtr_idcd) as drtr_idcd													")
					.where("         , '' as invc_date																	")
					.where("         , substr(a.rqod_date,1,6) as rqod_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '합계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , '99999999' as crt_date															")
					.where("     from cte a																				")
					.where("    group by '99999999'																		")
				;
			}
			data.param
				.where("     order by crt_date , drtr_idcd , rnum limit 9999999											")
				.where(") a																								")
			;
		}

		if(arg.getParamText("ck3").equals("2")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.invc_numb																			")
				.where("         , b.drtr_idcd																			")
				.where("         , a.sale_date as sale_date2															")
				.where("         , a.sale_date																			")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date																			")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.sale_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   a.sale_invc_numb is not null															")
				.where("    and   a.sale_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   a.sale_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   p.prod_idcd  = :prod_idcd   ", arg.getParameter("prod_idcd"))
				.where("    and   b.drtr_idcd  = :drtr_idcd   ", arg.getParameter("drtr_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(")																								")
				.where("    select  a.invc_numb																			")
				.where("          , a.drtr_idcd																			")
				.where("          , a.invc_date																			")
				.where("          , a.sale_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.sale_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , a.sale_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("union all																					")
					.where("    select '' as invc_numb																	")
					.where("         , a.drtr_idcd																		")
					.where("         , null as invc_date																")
					.where("         , '' as sale_date																	")
					.where("         , '' as cstm_name																	")
					.where("         , '소계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 2 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.sale_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    GROUP BY a.invc_date , a.drtr_idcd														")
					.where("    having cnt > 1																			")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.drtr_idcd) as drtr_idcd													")
					.where("         , '' as invc_date																	")
					.where("         , a.sale_date as sale_date															")
					.where("         , '' as cstm_name																	")
					.where("         , '일계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.sale_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.invc_date																	")
				;
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.drtr_idcd) as drtr_idcd													")
					.where("         , '' as invc_date																	")
					.where("         , substr(a.sale_date,1,6) as sale_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '월계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 4 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , concat(substr(a.sale_date,1,6),'99') as crt_date									")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by substr(a.sale_date,1,6)														")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.drtr_idcd) as drtr_idcd													")
					.where("         , '' as invc_date																	")
					.where("         , substr(a.sale_date,1,6) as sale_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '합계' as drtr_name																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , '99999999' as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by '9999999999'																	")
				;
			}
			data.param
				.where("    order by crt_date , drtr_idcd , rnum limit 9999999											")
				.where(") a")
			;
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 품목별 매출현황
	 */
	public SqlResultMap getList4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select *																							")
		;

		if(arg.getParamText("ck1").equals("1")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.invc_numb																			")
				.where("         , a.item_idcd																			")
				.where("         , a.rqod_date																			")
				.where("         , b.invc_date as invc_date2															")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date																			")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.ostt_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("         , b.invc_date as crt_date																")
				.where("         , 1 as rnum																			")
				.where("         , null as cnt																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   b.invc_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   b.invc_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   p.prod_idcd  = :prod_idcd   ", arg.getParameter("prod_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where("  )																								")
				.where("    select  a.invc_numb																			")
				.where("          , a.item_idcd																			")
				.where("          , a.rqod_date																			")
				.where("          , a.invc_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.ostt_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , a.invc_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , a.item_idcd																		")
					.where("         , '' as rqod_date																	")
					.where("         , null as invc_date																")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '소계' as prod_name																")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 2 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.invc_date , a.item_idcd														")
					.where("    having cnt > 1																			")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , '' as rqod_date																	")
					.where("         , a.invc_date as invc_date															")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '일계' as prod_name																")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.invc_date																	")
				;
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , '' as rqod_date																	")
					.where("         , substr(a.invc_date,1,6) as invc_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '월계' as prod_name																")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 4 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , concat(substr(a.invc_date,1,6),'99') as crt_date									")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by substr(a.invc_date,1,6)														")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , '' as rqod_date																	")
					.where("         , substr(a.invc_date,1,6) as invc_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '합계' as prod_name																")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.ostt_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 5 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , '99999999' as crt_date															")
					.where("    from cte a																				")
					.where("     where 1=1																				")
					.where("    group by  '9999999999'																	")
				;
			}

			data.param
				.where("    order by crt_date, item_idcd, rnum limit 9999999											")
				.where(") a																								")
			;
		}

		if(arg.getParamText("ck2").equals("2")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.invc_numb																			")
				.where("         , a.item_idcd																			")
				.where("         , a.rqod_invc_numb																		")
				.where("         , a.rqod_date  as rqod_date2															")
				.where("         , a.rqod_date																			")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date																			")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.rqod_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("         , b.invc_date as crt_date																")
				.where("         , 1 as rnum																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   a.rqod_invc_numb is not null															")
				.where("    and   a.rqod_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   a.rqod_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   p.prod_idcd  = :prod_idcd   ", arg.getParameter("prod_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(")																								")
				.where("    select  a.rqod_invc_numb																	")
				.where("          , a.item_idcd																			")
				.where("          , a.rqod_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.invc_date																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.rqod_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , a.invc_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , a.item_idcd																		")
					.where("         , null as rqod_date																")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '소계' as prod_name																")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 2 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.rqod_date, a.item_idcd														")
					.where("    having cnt > 1																			")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , a.rqod_date as rqod_date															")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '일계' as prod_name																")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.rqod_date																	")
				;
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , substr(a.invc_date,1,6) as rqod_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '월계' as prod_spec																")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 4 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , concat(substr(a.invc_date,1,6),'99') as crt_date									")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by substr(a.rqod_date,1,6)														")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as rqod_invc_numb																")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , substr(a.invc_date,1,6) as rqod_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '합계' as invc_date																")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.rqod_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 5 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , '99999999' as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by '9999999999'																	")
				;
			}
			data.param
				.where("    order by crt_date , item_idcd  , rnum limit 9999999											")
				.where(") a																								")
			;
		}

		if(arg.getParamText("ck3").equals("2")){
			data.param
				.where("from (																							")
				.where("with cte as (																					")
				.where("    select a.sale_invc_numb																		")
				.where("         , a.item_idcd																			")
				.where("         , a.sale_date as sale_date2															")
				.where("         , a.sale_date																			")
				.where("         , c.cstm_name																			")
				.where("         , u.user_name  as drtr_name															")
				.where("         , b.invc_date																			")
				.where("         , a.acpt_numb																			")
				.where("         , p.prod_name																			")
				.where("         , p.prod_spec																			")
				.where("         , a.sale_qntt																			")
				.where("         , a.sale_amnt																			")
				.where("         , a.sale_pric																			")
				.where("         , a.pcod_numb																			")
				.where("         , b.invc_date as crt_date																")
				.where("         , 1 as rnum																			")
				.where("    from sale_ostt_item a																		")
				.where("    left outer join sale_ostt_mast b   on a.invc_numb = b.invc_numb								")
				.where("    left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd								")
				.where("    left outer join product_mast   p   on a.item_idcd = p.prod_idcd								")
				.where("    left outer join boxx_acpt      bo  on a.acpt_numb = bo.invc_numb							")
				.where("    left outer join user_mast      u   on b.drtr_idcd = u.user_idcd								")
				.where("    where 1=1																					")
				.where("    and   a.sale_invc_numb is not null															")
				.where("    and   a.sale_date >= :fr_invc_date", arg.getParameter("invc_date1"))
				.where("    and   a.sale_date <= :to_invc_date", arg.getParameter("invc_date2"))
				.where("    and   p.prod_idcd  = :prod_idcd   ", arg.getParameter("prod_idcd"))
				.where("    and   c.cstm_idcd  = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
				.where("    and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
				.where(")																								")
				.where("    select  a.sale_invc_numb																	")
				.where("          , a.item_idcd																			")
				.where("          , a.sale_date																			")
				.where("          , a.cstm_name																			")
				.where("          , a.drtr_name																			")
				.where("          , a.invc_date																			")
				.where("          , a.acpt_numb																			")
				.where("          , a.prod_name																			")
				.where("          , a.prod_spec																			")
				.where("          , a.sale_qntt																			")
				.where("          , a.sale_amnt																			")
				.where("          , a.sale_pric																			")
				.where("          , a.pcod_numb																			")
				.where("          , 1 as rnum																			")
				.where("          , null as cnt																			")
				.where("          , a.invc_date as crt_date																")
				.where("    from cte a																					")
			;
			if(arg.getParamText("chk").contains("0")){
				data.param
					.where("    union all																				")
					.where("    select '' as sale_invc_numb																")
					.where("         , a.item_idcd																		")
					.where("         , null as sale_date																")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '소계' as prod_name																")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 2 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.sale_date , a.item_idcd														")
				;
			}
			if(arg.getParamText("chk").contains("1")){
				data.param
					.where("    union all																				")
					.where("    select '' as sale_invc_numb																")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , a.sale_date as sale_date															")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '일계' as prod_name																")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 3 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , a.invc_date as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by a.sale_date																	")
				;
			}
			if(arg.getParamText("chk").contains("2")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , substr(a.sale_date,1,6) as sale_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '' as prod_name																	")
					.where("         , '' as invc_date																	")
					.where("         , '월계' as prod_spec																")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 4 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , concat(substr(a.invc_date,1,6),'99') as crt_date									")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by substr(a.sale_date,1,6)														")
				;
			}
			if(arg.getParamText("chk").contains("3")){
				data.param
					.where("    union all																				")
					.where("    select '' as invc_numb																	")
					.where("         , max(a.item_idcd) as item_idcd													")
					.where("         , substr(a.sale_date,1,6) as sale_date												")
					.where("         , '' as cstm_name																	")
					.where("         , '' as drtr_name																	")
					.where("         , '' as acpt_numb																	")
					.where("         , '합계' as prod_name																")
					.where("         , '' as invc_date																	")
					.where("         , '' as prod_spec																	")
					.where("         , sum(a.sale_qntt)																	")
					.where("         , sum(a.sale_amnt)																	")
					.where("         , '' as sale_pric																	")
					.where("         , '' as pcod_numb																	")
					.where("         , 5 as rnum																		")
					.where("         , count(*) as cnt																	")
					.where("         , '99999999' as crt_date															")
					.where("    from cte a																				")
					.where("    where 1=1																				")
					.where("    group by  '9999999999'																	")
				;
			}
			data.param
				.where("    order by crt_date , item_idcd , rnum limit 9999999											")
				.where(") a																								")
			;
		}


		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
