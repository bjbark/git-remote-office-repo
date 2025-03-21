package com.sky.system.report.orderdailyrpt;

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

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.sum_qty)        as sum_qty        ")
			.total("      ,sum(a.sum_amount)     as sum_amount     ")
		;
        data.param
	        .query("select a.inv_dt                                                                                                            ")
	        .query("      ,a.sum_qty                                                                                                           ")
	        .query("      ,a.sum_amount                                                                                                        ")
	    ;
	    data.param
		    .where("  from (                                                                                                                   ")
		    .where("       select a.stor_grp                                                                                                   ")
		    .where("             ,a.ori_dt as inv_dt                                                                                                     ")
		    .where("             ,sum(b.qty)                              as sum_qty                                                           ")
		    .where("             ,sum(b.inv_amt)                           as sum_amount                                                        ")
		    .where("         from order_mst a                                                                                                 ")
		    .where("              join order_dtl b                                                                                            ")
		    .where("                on b.inv_no = a.inv_no                                                                                     ")
		    .where("        where a.sts_cd > '0100'     	                                                                                   ")
		    .where("          and a.row_sts = 0	     	                                                                                   ")
			.where("          and a.stor_grp = :stor_grp                                                                                       ", arg.fixParameter("stor_grp"))
		    .where("          and a.stor_id = :stor_id                                                                                       ", arg.getParameter("stor_id"))
		    .where("          and a.inv_dt between :fr_dt                                                                                      ", fr_dt, "1".equals(inv_po_term))		// 배송예정 시작일자
		    .where("                           and :to_dt                                                                                      ", to_dt, "1".equals(inv_po_term))		// 배송예정 종료일자
		    .where("          and a.ori_dt between :fr_dt                                                                                      ", fr_dt, "2".equals(inv_po_term))		// 주문 시작일자
		    .where("                           and :to_dt                                                                                      ", to_dt, "2".equals(inv_po_term))		// 주문 종료일자
		    .where("          and a.chnl in (:chnl)                                                                              ", chnl, (chnl.length>0))	// 주문 위치
		    .where("        group by a.stor_grp, a.ori_dt				                                                                       ")
		    .where("       ) a                                                                                                                 ")
		    .where(" order by a.inv_dt			                                                                                               ")
	    ;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
