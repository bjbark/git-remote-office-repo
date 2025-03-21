package com.sky.system.custom.iypkg.sale.order.dailyslorlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service("iypkg.DailySlorListService")
public class DailySlorListService extends DefaultServiceHandler{

	@Autowired
	private SeqListenerService sequance;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort , int start ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateAll(arg);
		int maxsize = 0;
		if(rows == 0){
			rows = 999999999;
		}

		data.param
			.query("call sale_order_dailyslorlist( :param ",param)
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
//			.where("with acpt as (																					")
//			.where("    select   a.invc_numb																		")
//			.where("           , a.invc_date																		")
//			.where("           , a.cstm_idcd																		")
//			.where("           , c.cstm_name																		")
//			.where("           , c.cstm_code																		")
//			.where("           , a.bxty_idcd																		")
//			.where("           , b.bxty_name																		")
//			.where("           , a.prod_idcd																		")
//			.where("           , p.prod_name																		")
//			.where("           , a.acpt_qntt																		")
//			.where("           , concat(ifnull(b.bxty_leng,0),'*'													")
//			.where("                  , ifnull(b.bxty_widh,0),'*'													")
//			.where("                  , ifnull(b.bxty_hght,0)) as prod_spec											")
//			.where("           , a.pqty_pric																		")
//			.where("           , ifnull(a.pqty_pric,1) * ifnull(a.acpt_qntt,1) as sply_amnt							")
//			.where("           , a.pcod_numb																		")
//			.where("           , a.deli_date																		")
//			.where("from ( select   a.invc_numb,a.line_stat,a.deli_date,a.cstm_idcd,a.prod_idcd						")
//			.where("       from boxx_acpt a																			")
//			.where("       where 1=1																				")
//			.where("       and   a.line_stat < 2 																	")
//			.where("       and   a.invc_date >= :fr_invc_date", arg.getParameter("fr_invc_date"))
//			.where("       and   a.invc_date <= :to_invc_date", arg.getParameter("to_invc_date"))
//			.where("       and   a.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
//			.where(") cbin																							")
//			.where("left outer join boxx_acpt a on a.invc_numb = cbin.invc_numb										")
//			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
//			.where("left outer join product_mast p on a.prod_idcd = p.prod_idcd										")
//			.where("left outer join boxtype_mast b on a.bxty_idcd = b.bxty_idcd										")
//			.where("where 1=1																						")
//			.where("and    cstm_code >= :cstm_code   ", arg.getParameter("cstm_code"))
//			.where("and    cstm_code <= :cstm_code2  ", arg.getParameter("cstm_code2"))
//			.where(")																								")
//			.where("select  a.invc_numb																				")
//			.where("      , a.invc_date																				")
//			.where("      , a.cstm_idcd																				")
//			.where("      , a.cstm_name																				")
//			.where("      , a.cstm_code																				")
//			.where("      , a.bxty_idcd																				")
//			.where("      , a.bxty_name																				")
//			.where("      , a.prod_idcd																				")
//			.where("      , a.prod_name																				")
//			.where("      , a.acpt_qntt																				")
//			.where("      , a.prod_spec																				")
//			.where("      , a.pqty_pric																				")
//			.where("      , a.sply_amnt																				")
//			.where("      , a.pcod_numb																				")
//			.where("      , a.deli_date																				")
//			.where("      , 1 as rnum																				")
//			.where("      , null as cnt																				")
//			.where("      , a.invc_date as crt_date																	")
//			.where("from acpt a																						")
//		;
//		if(arg.getParamText("chk").contains("0")){
//			data.param
//				.where("union all																					")
//				.where("select   null as invc_numb																	")
//				.where("       , null as invc_date																	")
//				.where("       , a.cstm_idcd																		")
//				.where("       , concat(a.cstm_name,' 계') as cstm_name												")
//				.where("       , a.cstm_code																		")
//				.where("       , null as bxty_idcd																	")
//				.where("       , null as bxty_name																	")
//				.where("       , null as prod_idcd																	")
//				.where("       , null as prod_name																	")
//				.where("       , sum(a.acpt_qntt) as acpt_qntt														")
//				.where("       , null as prod_spec																	")
//				.where("       , null as pqty_pric																	")
//				.where("       , sum(a.sply_amnt) as sply_amnt														")
//				.where("       , null as pcod_numb																	")
//				.where("       , null as deli_date																	")
//				.where("       , 2 as rnum																			")
//				.where("       , count(*) as cnt																	")
//				.where("       , a.invc_date as crt_date															")
//				.where("from acpt a																					")
//				.where("where 1=1																					")
//				.where("group by a.invc_date, a.cstm_idcd															")
//				.where("having cnt > 1																				")
//			;
//		}
//		if(arg.getParamText("chk").contains("1")){
//			data.param
//				.where("union all")
//				.where("select   null as invc_numb																	")
//				.where("       , a.invc_date as invc_date															")
//				.where("       , max(a.cstm_idcd) as cstm_idcd														")
//				.where("       , '일계' as cstm_name																	")
//				.where("       , max(a.cstm_code) as cstm_code														")
//				.where("       , null as bxty_idcd																	")
//				.where("       , null as bxty_name																	")
//				.where("       , null as prod_idcd																	")
//				.where("       , null as prod_name																	")
//				.where("       , sum(a.acpt_qntt) as acpt_qntt														")
//				.where("       , null as prod_spec																	")
//				.where("       , null as pqty_pric																	")
//				.where("       , sum(a.sply_amnt) as sply_amnt														")
//				.where("       , null as pcod_numb																	")
//				.where("       , null as deli_date																	")
//				.where("       , 3 as rnum																			")
//				.where("       , count(*) as cnt																	")
//				.where("       , a.invc_date as crt_date															")
//				.where("from acpt a																					")
//				.where("where 1=1																					")
//				.where("group by a.invc_date																		")
//			;
//		}
//		if(arg.getParamText("chk").contains("2")){
//			data.param
//				.where("union all")
//				.where("select   null as invc_numb																	")
//				.where("       , substr(a.invc_date,1,6) as invc_date												")
//				.where("       , max(a.cstm_idcd) as cstm_idcd														")
//				.where("       , '월계' as cstm_name																	")
//				.where("       , max(a.cstm_code) as cstm_code														")
//				.where("       , null as bxty_idcd																	")
//				.where("       , null as bxty_name																	")
//				.where("       , null as prod_idcd																	")
//				.where("       , null as prod_name																	")
//				.where("       , sum(a.acpt_qntt) as acpt_qntt														")
//				.where("       , null as prod_spec																	")
//				.where("       , null as pqty_pric																	")
//				.where("       , sum(a.sply_amnt) as sply_amnt														")
//				.where("       , null as pcod_numb																	")
//				.where("       , null as deli_date																	")
//				.where("       , 4 as rnum																			")
//				.where("       , count(*) as cnt																	")
//				.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date									")
//				.where("from acpt a																					")
//				.where("where 1=1																					")
//				.where("group by substr(a.invc_date,1,6)															")
//			;
//		}
//		if(arg.getParamText("chk").contains("3")){
//			data.param
//				.where("union all																					")
//				.where("select   null as invc_numb																	")
//				.where("       , null as invc_date																	")
//				.where("       , max(a.cstm_idcd) as cstm_idcd														")
//				.where("       , '합계' as cstm_name																	")
//				.where("       , max(a.cstm_code) as cstm_code														")
//				.where("       , null as bxty_idcd																	")
//				.where("       , null as bxty_name																	")
//				.where("       , null as prod_idcd																	")
//				.where("       , null as prod_name																	")
//				.where("       , sum(a.acpt_qntt) as acpt_qntt														")
//				.where("       , null as prod_spec																	")
//				.where("       , null as pqty_pric																	")
//				.where("       , sum(a.sply_amnt) as sply_amnt														")
//				.where("       , null as pcod_numb																	")
//				.where("       , null as deli_date																	")
//				.where("       , 5 as rnum																			")
//				.where("       , count(*) as cnt																	")
//				.where("       , '99999999' as crt_date																")
//				.where("from acpt a")
//				.where("where 1=1")
//				.where("group by '99999999'")
//			;
//		}
//
//		data.param
//			.where("order by crt_date, cstm_idcd, rnum																")
//			.where(") a																								")
//		;
//
//		if (page == 0 && rows == 0){
//			return data.selectForMap(sort) ;
//		} else {
//			return data.selectForMap(page, rows, (page==1), sort );
//		}
//
//	}
}
