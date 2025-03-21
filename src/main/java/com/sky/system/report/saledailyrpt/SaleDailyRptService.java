package com.sky.system.report.saledailyrpt;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class SaleDailyRptService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		// 주문위치
		String[] chnl = arg.getParamCast("chnl", String[].class);

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
	        .query("      ,case sum(a.sum_ret_amount) over (partition by a.stor_grp) when 0 then 0                                                   ")
	        .query("            else round(abs(a.sum_ret_amount)/sum(abs(a.sum_ret_amount)) over (partition by a.stor_grp), 3)*100 end as rate_ret_amount ")
	        .query("      ,a.sum_qty                                                                                                           ")
	        .query("      ,a.sum_amount                                                                                                        ")
	    ;
	    data.param
		    .where("  from (                                                                                                                   ")
		    .where("       select a.stor_grp                                                                                                   ")
		    .where("             ,a.inv_dt                                                                                                     ")
		    .where("             ,sum(case when a.retn_yn = '0' then  1         else 0 end) as sum_nor_qty                                                       ")
		    .where("             ,sum(case when a.retn_yn = '0' then  a.inv_amt else 0 end) as sum_nor_amount                                                    ")
		    .where("             ,sum(case when a.retn_yn = '1' then  1         else 0 end) as sum_ret_qty                                                       ")
		    .where("             ,sum(case when a.retn_yn = '1' then  a.inv_amt else 0 end) as sum_ret_amount                                                    ")
		    .where("             ,count(a.inv_no)                         as sum_qty                                                           ")
		    .where("             ,sum(a.inv_amt)                           as sum_amount                                                        ")
		    .where("         from sale_mst a                                                                                                  ")
		    .where("        where a.sts_cd > '0100'     	                                                                                   ")
		    .where("          and a.row_sts = 0 	    	                                                                                   ")
			.where("          and a.stor_grp = :stor_grp    ", arg.fixParameter("stor_grp"))
		    .where("          and a.stor_id = :stor_id      ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt   ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   ", arg.fixParamText("to_dt"))
			.where("          and a.chnl in (:chnl)         ", chnl, (chnl.length>0))
			.where("          and a.row_sts = 0                                                                                ")
		    .where("        group by a.stor_grp, a.inv_dt                                                                           ")
		    .where("       ) a                                                                                                                 ")
		    .where(" order by a.inv_dt                                                                                                         ")
	    ;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
