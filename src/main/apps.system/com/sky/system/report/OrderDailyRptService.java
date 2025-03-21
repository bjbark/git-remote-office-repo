package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class OrderDailyRptService  extends DefaultServiceHandler {


	/**
	 * 현황
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {


		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.sum_nor_qty)    as sum_nor_qty    ")
			.total("      ,sum(a.sum_nor_amount) as sum_nor_amount ")
			.total("      ,sum(a.sum_ret_qty)    as sum_ret_qty    ")
			.total("      ,sum(a.sum_ret_amount) as sum_ret_amount ")
			.total("      ,sum(a.sum_qty)        as sum_qty        ")
			.total("      ,sum(a.sum_amount)     as sum_amount     ")
		;
        data.param
	        .query("select a.inv_dt                                                                                                            ")
	        .query("      ,a.sum_nor_qty                                                                                                       ")
	        .query("      ,a.sum_nor_amount                                                                                                    ")
	        .query("      ,a.sum_ret_qty                                                                                                       ")
	        .query("      ,a.sum_ret_amount                                                                                                    ")
	        .query("      ,decode(sum(a.sum_ret_amount) over (partition by a.stor_grp), 0, 0                                                   ")
	        .query("        ,round(abs(a.sum_ret_amount)/sum(abs(a.sum_ret_amount)) over (partition by a.stor_grp), 3)*100) as rate_ret_amount ")
	        .query("      ,a.sum_qty                                                                                                           ")
	        .query("      ,a.sum_amount                                                                                                        ")
	    ;
	    data.param
		    .where("  from (                                                                                ")
		    .where("       select a.stor_grp                                                                ")
		    .where("             ,a.inv_dt                                                                  ")
		    .where("             ,sum(case when a.ret_yn = '0' then b.qty    else 0 end) as sum_nor_qty     ")
		    .where("             ,sum(case when a.ret_yn = '0' then b.amount else 0 end) as sum_nor_amount  ")
		    .where("             ,sum(case when a.ret_yn = '1' then b.qty    else 0 end) as sum_ret_qty     ")
		    .where("             ,sum(case when a.ret_yn = '1' then b.amount else 0 end) as sum_ret_amount  ")
		    .where("             ,sum(b.qty)      as sum_qty                                                ")
		    .where("             ,sum(b.amount)   as sum_amount                                             ")
		    .where("         from order_mst a                                                              ")
		    .where("              join order_item b     on b.inv_no = a.inv_no                              ")
		    .where("        where a.sts_cd > '0100'     	                                                ")
		    .where("          and a.row_sts = 0	     	                                                    ")
			.where("          and a.stor_grp = :stor_grp          ", arg.fixParameter("stor_grp"))
		    .where("          and a.stor_id = :stor_id            ", arg.getParameter("stor_id"))
		    .where("          and a.inv_dt between :fr_dt         ", fr_dt, "1".equals(inv_po_term))		// 배송예정 시작일자
		    .where("                           and :to_dt         ", to_dt, "1".equals(inv_po_term))		// 배송예정 종료일자
		    .where("          and a.ori_dt between :fr_dt         ", fr_dt, "2".equals(inv_po_term))		// 주문 시작일자
		    .where("                           and :to_dt         ", to_dt, "2".equals(inv_po_term))		// 주문 종료일자
		    .where("          and a.inv_work_id in (:inv_work_id) ", inv_work_id, (inv_work_id.length>0))	// 주문 위치
		    .where("        group by a.stor_grp, a.inv_dt				                                    ")
		    .where("       ) a                                                                              ")
		    .where(" order by a.inv_dt			                                                            ")
	    ;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
