package com.sky.system.gms;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class GmsSaleAnalysisService  extends DefaultServiceHandler {

	/**
	 * 사업장별
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.sum_tax_free) as sum_tax_free ")
			.total("      ,sum(a.sum_subtotal) as sum_subtotal ")
			.total("      ,sum(a.sum_tax)      as sum_tax      ")
			.total("      ,sum(a.sum_amount)   as sum_amount   ")
		;
		data.param // 조회
			.query("select decode(a.stor_id, 'N2310ALPHA10202', '동부이촌점', b.stor_nm)                as stor_nm                 ")
			.query("      ,a.sum_tax_free                                                                                             ")
			.query("      ,a.sum_subtotal                                                                                             ")
			.query("      ,a.sum_tax                                                                                                  ")
			.query("      ,a.sum_amount                                                                                               ")
			.query("      ,decode(sum(a.sum_amount) over (partition by a.stor_grp), 0, 0                                              ")
			.query("        ,round(a.sum_amount/sum(a.sum_amount) over (partition by a.stor_grp), 3)*100) as rate_amount              ")
		;
		data.param // 조건
			.where("  from (                                                                                                          ")
			.where("       select a.stor_grp                                                                                          ")
			.where("             ,decode(a.stor_id||a.inv_work_id, 'N2310ALPHA10202', 'N2310ALPHA10202', a.stor_id) as stor_id     ")
			.where("             ,sum(a.tax_free) as sum_tax_free                                                                     ")
			.where("             ,sum(a.sply_amt) as sum_subtotal                                                                     ")
			.where("             ,sum(a.tax)      as sum_tax                                                                          ")
			.where("             ,sum(a.amount)   as sum_amount                                                                       ")
			.where("         from sale_mst a                                                                                         ")
			.where("        where a.stor_grp = :stor_grp   	                                                                          ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id   	                                                                          ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt   	                                                                      ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   	                                                                      ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0                                                                                     ")
			.where("        group by a.stor_grp, decode(a.stor_id||a.inv_work_id, 'N2310ALPHA10202', 'N2310ALPHA10202', a.stor_id)  ")
			.where("       ) a                                                                                                        ")
			.where("       left outer join stor b                                                                                    ")
			.where("         on b.stor_id = a.stor_id                                                                               ")
			.where(" order by a.stor_id                                                                                              ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}
}
