package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class MoveInOutRptService  extends DefaultServiceHandler {

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

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(sum(decode(a.type, 0, a.nor_amt, 0)))  as recv_nor_amt ")
			.total("      ,sum(sum(decode(a.type, 0, a.ret_amt, 0)))  as recv_ret_amt ")
			.total("      ,sum(sum(decode(a.type, 0, a.tot_amt, 0)))  as recv_tot_amt ")
			.total("      ,sum(sum(decode(a.type, 1, a.nor_amt, 0)))  as sale_nor_amt ")
			.total("      ,sum(sum(decode(a.type, 1, a.ret_amt, 0)))  as sale_ret_amt ")
			.total("      ,sum(sum(decode(a.type, 1, a.tot_amt, 0)))  as sale_tot_amt ")
			.total("      ,sum(sum(decode(a.type, 0, a.tot_amt, 0))-sum(decode(a.type, 1, a.tot_amt, 0))) as stock_amt    ")
		;
		data.param // 조회
			.query("select a.stor_id                                                           ")
			.query("      ,s.stor_nm                                                           ")
			.query("      ,sum(decode(a.type, 0, a.nor_amt, 0))  as recv_nor_amt                ")
			.query("      ,sum(decode(a.type, 0, a.ret_amt, 0))  as recv_ret_amt                ")
			.query("      ,sum(decode(a.type, 0, a.tot_amt, 0))  as recv_tot_amt                ")
			.query("      ,sum(decode(a.type, 1, a.nor_amt, 0))  as sale_nor_amt                ")
			.query("      ,sum(decode(a.type, 1, a.ret_amt, 0))  as sale_ret_amt                ")
			.query("      ,sum(decode(a.type, 1, a.tot_amt, 0))  as sale_tot_amt                ")
			.query("      ,sum(decode(a.type, 0, a.tot_amt, 0))                                 ")
			.query("       -sum(decode(a.type, 1, a.tot_amt, 0)) as stock_amt                   ")
		;
		data.param // 조건
			.where("  from (                                                                    ")
			.where("       select 0 type                                                        ")
			.where("             ,stor_id                                                      ")
			.where("             ,sum(case when amount >= 0 then  amount else 0 end) as nor_amt ")
			.where("             ,sum(case when amount <  0 then -amount else 0 end) as ret_amt ")
			.where("             ,sum(amount)                                        as tot_amt ")
			.where("         from move_ist_mst                                                     ")
			.where("        where stor_grp = :stor_grp   ", arg.fixParameter("stor_grp"))
			.where("          and stor_id = :stor_id   	 ", arg.getParameter("stor_id"))
			.where("          and inv_dt between :fr_dt  ", arg.fixParamText("fr_dt"))
			.where("                         and :to_dt  ", arg.fixParamText("to_dt"))
			.where("          and row_sts = 0                                                 ")
			.where("        group by stor_id                                                   ")
			.where("       union all                                                            ")
			.where("       select 1 type                                                        ")
			.where("             ,stor_id                                                      ")
			.where("             ,sum(case when amount >= 0 then  amount else 0 end) as nor_amt ")
			.where("             ,sum(case when amount <  0 then -amount else 0 end) as ret_amt ")
			.where("             ,sum(amount)                                        as tot_amt ")
			.where("         from move_ost_mst                                                     ")
			.where("        where stor_grp = :stor_grp   ", arg.fixParameter("stor_grp"))
			.where("          and stor_id = :stor_id   	 ", arg.getParameter("stor_id"))
			.where("          and inv_dt between :fr_dt  ", arg.fixParamText("fr_dt"))
			.where("                         and :to_dt  ", arg.fixParamText("to_dt"))
			.where("          and row_sts = 0                                                 ")
			.where("        group by stor_id                                                   ")
			.where("       ) a                                                                  ")
			.where("       left outer join stor s                                              ")
			.where("         on s.stor_id = a.stor_id                                         ")
			.where(" group by a.stor_id, s.stor_nm                                            ")
			.where(" order by a.stor_id                                                        ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}
}
