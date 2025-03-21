package com.sky.system.stock;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class SubulMonthSumPrintService  extends DefaultServiceHandler {

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
		String mm = StringUtils.substring(arg.fixParamText("base_dt"), 4, 6);
		
		data.param // 집계
			.total("select count(1) as maxsize ")                                                   
			.total("      ,sum(a.trans_qty)               as trans_qty ")
			.total("      ,sum(a.trans_amt)               as trans_amt ")
			.total("      ,sum(a.in_qty)                  as in_qty    ")
			.total("      ,sum(a.in_amt)                  as in_amt    ")
			.total("      ,sum(a.out_qty)                 as out_qty   ")
			.total("      ,sum(a.out_amt)                 as out_amt   ")
			.total("      ,sum(a.etc_qty)                 as etc_qty   ")
			.total("      ,sum(a.etc_amt)                 as etc_amt   ")
			.total("      ,sum(t.stock)                   as stock_qty ")
			.total("      ,sum(t.stock*a.month_ave_price) as stock_amt ")
		;
		data.param // 조회
			.query("select n.stor_nm                                                                                                              ")
			.query("      ,i.item_code                                                                                                               ")
			.query("      ,i.item_name                                                                                                               ")
			.query("      ,i.item_spec                                                                                                               ")
			.query("      ,u.unit_name                                                                                                               ")
			.query("      ,m.bas_nm as mfg_nm                                                                                                     ")
			.query("      ,v.vend_nm                                                                                                               ")
			.query("      ,a.trans_qty                                                                                                             ")
			.query("      ,a.trans_amt                                                                                                             ")
			.query("      ,a.in_qty                                                                                                                ")
			.query("      ,a.in_amt                                                                                                                ")
			.query("      ,a.out_qty                                                                                                               ")
			.query("      ,a.out_amt                                                                                                               ")
			.query("      ,a.etc_qty                                                                                                               ")
			.query("      ,a.etc_amt                                                                                                               ")
			.query("      ,t.stock                   as stock_qty                                                                                  ")
			.query("      ,t.stock*a.month_ave_price as stock_amt                                                                                  ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 2)) as class_nm1                                ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 4)) as class_nm2                                ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 6)) as class_nm3                                ")
		;
		data.param // 조건
			.where("  from (                                                                                                                       ")
			.where("       select stor_id                                                                                                         ")
			.where("             ,item_idcd                                                                                                          ")
			.where("             ,base_qty_"+mm+" as trans_qty                                                                                     ")
			.where("             ,base_amt_"+mm+" as trans_amt                                                                                     ")
			.where("             ,recv_qty_"+mm+" as in_qty                                                                                        ")
			.where("             ,recv_amt_"+mm+" as in_amt                                                                                        ")
			.where("             ,sale_qty_"+mm+" as out_qty                                                                                       ")
			.where("             ,sale_amt_"+mm+" as out_amt                                                                                       ")
			.where("             ,movs_qty_"+mm+"-movr_qty_"+mm+"+modi_qty_"+mm+" as etc_qty                                                       ")
			.where("             ,movs_amt_"+mm+"-movr_amt_"+mm+"+modi_amt_"+mm+" as etc_amt                                                       ")
			.where("             ,decode(last_qty_"+mm+", 0, 0, last_ave_"+mm+"/last_qty_"+mm+") as month_ave_price                                ")
			.where("         from item_month                                                                                                       ")
			.where("        where stor_grp = :stor_grp                                                                                             ", arg.fixParameter("stor_grp"))
			.where("          and stor_id = :stor_id                                                                                             ", arg.getParameter("stor_id"))
			.where("          and lock_yy = substr(:base_dt, 1, 4)                                                                                 ", arg.fixParameter("base_dt"))
			.where("          and (   base_qty_"+mm+" <> 0                                                                                         ")
			.where("               or sale_qty_"+mm+" <> 0                                                                                         ")
			.where("               or recv_qty_"+mm+" <> 0                                                                                         ")
			.where("               or movs_qty_"+mm+" <> 0                                                                                         ")
			.where("               or movr_qty_"+mm+" <> 0                                                                                         ")
			.where("               or modi_qty_"+mm+" <> 0                                                                                         ")
			.where("               or sale_sum_"+mm+" <> 0                                                                                         ")
			.where("               or recv_sum_"+mm+" <> 0                                                                                         ")
			.where("               or movs_sum_"+mm+" <> 0                                                                                         ")
			.where("               or movr_sum_"+mm+" <> 0                                                                                         ")
			.where("               or modi_sum_"+mm+" <> 0                                                                                         ")
			.where("              )                                                                                                                ")
			.where("          and row_sts = 0                                                                                                    ")
			.where("       ) a                                                                                                                     ")
			.where("       join store n                                                                                                            ")
			.where("         on n.stor_id = a.stor_id                                                                                            ")
			.where("       left outer join itm_stock t                                                                                            ")
			.where("         on t.stor_id = a.stor_id                                                                                            ")
			.where("        and t.item_idcd = a.item_idcd                                                                                              ")
			.where("       left outer join itm_mst i                                                                                             ")
			.where("         on i.item_idcd = a.item_idcd                                                                                              ")
			.where("       left outer join item_unit u                                                                                             ")
			.where("         on u.unit_idcd = i.unit_idcd                                                                                              ")
			.where("       left outer join base_mst m                                                                                             ")
			.where("         on m.bas_id = i.mfg_id                                                                                               ")
			.where("       left outer join vend_mst v                                                                                             ")
			.where("         on v.vend_id = i.vend_id                                                                                              ")
			.where(" where 1 = 1                                                                                                                   ")
			.where("   and i.item_idcd = :item_idcd                                                                                                    ", arg.getParameter("item_idcd"))
			.where("   and i.item_name like %:search_item_nm%                                                                                        ", arg.getParameter("search_item_nm"))
			.where("   and i.class_id in ( select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id ) ", arg.getParameter("class_id"))
			.where(" order by n.stor_id, i.item_idcd                                                                                                ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
