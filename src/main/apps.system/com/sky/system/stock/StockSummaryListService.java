package com.sky.system.stock;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class StockSummaryListService  extends DefaultServiceHandler {

	/**
	 * 재고총괄표
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
			.total("      ,sum(isnull(t1.safe_qty, 0)+isnull(t2.safe_qty, 0)+isnull(t3.safe_qty, 0)+isnull(t4.safe_qty, 0)) as tot_safe_qty            ")
			.total("      ,sum(isnull(t1.stock, 0)+isnull(t2.stock, 0)+isnull(t3.stock, 0)+isnull(t4.stock, 0))             as tot_stock               ")
			.total("      ,sum(isnull(t1.lack_qty, 0)+isnull(t2.lack_qty, 0)+isnull(t3.lack_qty, 0)+isnull(t4.lack_qty, 0)) as tot_lack_qty            ")
			.total("      ,sum(t1.safe_qty)                                                                     as t1_safe_qty             ")
			.total("      ,sum(t1.stock)                                                                        as t1_stock                ")
			.total("      ,sum(t1.lack_qty)                                                                     as t1_lack_qty             ")
			.total("      ,sum(t2.safe_qty)                                                                     as t2_safe_qty             ")
			.total("      ,sum(t2.stock)                                                                        as t2_stock                ")
			.total("      ,sum(t2.lack_qty)                                                                     as t2_lack_qty             ")
			.total("      ,sum(t3.safe_qty)                                                                     as t3_safe_qty             ")
			.total("      ,sum(t3.stock)                                                                        as t3_stock                ")
			.total("      ,sum(t3.lack_qty)                                                                     as t3_lack_qty             ")
			.total("      ,sum(t4.safe_qty)                                                                     as t4_safe_qty             ")
			.total("      ,sum(t4.stock)                                                                        as t4_stock                ")
			.total("      ,sum(t4.lack_qty)                                                                     as t4_lack_qty             ")
			.total("      ,sum(a.out_qty)                                                                       as this_month_out_qty      ")
			.total("      ,sum(a1.out_qty)                                                                      as last_month_out_qty      ")
			.total("      ,sum(a2.out_qty)                                                                      as last_3_month_out_qty    ")
			.total("      ,sum(a3.out_qty)                                                                      as sum_this_year_out_qty   ")
			.total("      ,sum(a3.out_qty/a3.cnt_month)                                                         as avg_this_year_out_qty   ")
			.total("      ,sum(a4.out_qty)                                                                      as last_year_month_out_qty ")
		;
		data.param // 조회
			.query("select i.item_code                                                                                                                                     ")
			.query("      ,i.item_name                                                                                                                                     ")
			.query("      ,i.item_spec                                                                                                                                     ")
			.query("      ,u.unit_name                                                                                                                                     ")
			.query("      ,m.bas_nm as mfg_nm                                                                                                                           ")
			.query("      ,v.vend_nm                                                                                                                                     ")
			.query("      ,i.item_sts                                                                                                                                    ")
			.query("      ,decode((isnull(b.trans_qty, 0)+a.in_qty), 0, i.po_pri, round((isnull(b.trans_amt, 0)+a.in_amt)/(isnull(b.trans_qty, 0)+a.in_qty))) as standard_price ")
			.query("      ,isnull(t1.safe_qty, 0)+isnull(t2.safe_qty, 0)+isnull(t3.safe_qty, 0)+isnull(t4.safe_qty, 0) as tot_safe_qty                                               ")
			.query("      ,isnull(t1.stock, 0)+isnull(t2.stock, 0)+isnull(t3.stock, 0)+isnull(t4.stock, 0)             as tot_stock                                                  ")
			.query("      ,isnull(t1.lack_qty, 0)+isnull(t2.lack_qty, 0)+isnull(t3.lack_qty, 0)+isnull(t4.lack_qty, 0) as tot_lack_qty                                               ")
			.query("      ,t1.safe_qty as t1_safe_qty                                                                                                                    ")
			.query("      ,t1.stock    as t1_stock                                                                                                                       ")
			.query("      ,t1.lack_qty as t1_lack_qty                                                                                                                    ")
			.query("      ,t2.safe_qty as t2_safe_qty                                                                                                                    ")
			.query("      ,t2.stock    as t2_stock                                                                                                                       ")
			.query("      ,t2.lack_qty as t2_lack_qty                                                                                                                    ")
			.query("      ,t3.safe_qty as t3_safe_qty                                                                                                                    ")
			.query("      ,t3.stock    as t3_stock                                                                                                                       ")
			.query("      ,t3.lack_qty as t3_lack_qty                                                                                                                    ")
			.query("      ,t4.safe_qty as t4_safe_qty                                                                                                                    ")
			.query("      ,t4.stock    as t4_stock                                                                                                                       ")
			.query("      ,t4.lack_qty as t4_lack_qty                                                                                                                    ")
			.query("      ,a.out_qty               as this_month_out_qty                                                                                                 ")
			.query("      ,a1.out_qty              as last_month_out_qty                                                                                                 ")
			.query("      ,a2.out_qty              as last_3_month_out_qty                                                                                               ")
			.query("      ,a3.out_qty              as sum_this_year_out_qty                                                                                              ")
			.query("      ,a3.out_qty/a3.cnt_month as avg_this_year_out_qty                                                                                              ")
			.query("      ,a4.out_qty              as last_year_month_out_qty                                                                                            ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 2)) as class_nm1                                                      ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 4)) as class_nm2                                                      ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 6)) as class_nm3                                                      ")
		;
		data.param // 조건
			.where("  from (                                                                                                                                             ")
			.where("       select a.item_idcd                                                                                                                              ")
			.where("             ,sum(decode(a.inv_wk, '2071302', a.stock, 0))                as in_qty                                                                  ")
			.where("             ,sum(decode(a.inv_wk, '2071302', a.amount, 0))               as in_amt                                                                  ")
			.where("             ,sum(decode(a.inv_wk, '2071301', -a.stock, 0))               as out_qty                                                                 ")
			.where("         from stock_ledger a                                                                                                                         ")
			.where("              join itm_stor s                                                                                                                      ")
			.where("                on s.stor_id = a.stor_id                                                                                                           ")
			.where("               and s.item_idcd = a.item_idcd                                                                                                             ")
			.where("        where a.row_sts = 0                                                                                                                        ")
			.where("          and a.inv_dt between substr(:base_dt, 1, 6)||'01'                                                                                          ", arg.fixParamText("base_dt"))
			.where("                           and to_char(last_day(to_date(:base_dt, 'yyyymmdd')), 'yyyymmdd')                                                          ", arg.fixParamText("base_dt"))
			;
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("          and s.row_sts = 0                                                                                                                        ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("          and s.sale_epo = '1'                                                                                                                       ")
			;
		}
		data.param
			.where("        group by a.item_idcd                                                                                                                           ")
			.where("       ) a                                                                                                                                           ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select a.item_idcd                                                                                                              ")
			.where("                             ,sum(decode(a.inv_wk, '2071301', -a.stock, 0))               as out_qty                                                 ")
			.where("                         from stock_ledger a                                                                                                         ")
			.where("                        where a.row_sts = 0                                                                                                        ")
			.where("                          and a.inv_dt between to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'yyyymm')||'01'                                ", arg.fixParamText("base_dt"))
			.where("                                           and to_char(last_day(add_months(to_date(:base_dt, 'yyyymmdd'), -1)), 'yyyymmdd')                          ", arg.fixParamText("base_dt"))
			.where("                        group by a.item_idcd                                                                                                           ")
			.where("                       ) a1 on a1.item_idcd = a.item_idcd                                                                                                ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select a.item_idcd                                                                                                              ")
			.where("                             ,sum(decode(a.inv_wk, '2071301', -a.stock, 0))               as out_qty                                                 ")
			.where("                         from stock_ledger a                                                                                                         ")
			.where("                        where a.row_sts = 0                                                                                                        ")
			.where("                          and a.inv_dt between to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -3)+1, 'yyyymmdd')                                  ", arg.fixParamText("base_dt"))
			.where("                                           and :base_dt                                                                                              ", arg.fixParamText("base_dt"))
			.where("                        group by a.item_idcd                                                                                                           ")
			.where("                       ) a2 on a2.item_idcd = a.item_idcd                                                                                                ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select a.item_idcd                                                                                                              ")
			.where("                             ,sum(decode(a.inv_wk, '2071301', -a.stock, 0))               as out_qty                                                 ")
			.where("                             ,to_number(substr(:base_dt, 5, 2))                           as cnt_month                                               ", arg.fixParamText("base_dt"))
			.where("                         from stock_ledger a                                                                                                         ")
			.where("                        where a.row_sts = 0                                                                                                        ")
			.where("                          and a.inv_dt between substr(:base_dt, 1, 4)||'0101'                                                                        ", arg.fixParamText("base_dt"))
			.where("                                           and :base_dt                                                                                              ", arg.fixParamText("base_dt"))
			.where("                        group by a.item_idcd                                                                                                           ")
			.where("                       ) a3 on a3.item_idcd = a.item_idcd                                                                                                ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select a.item_idcd                                                                                                              ")
			.where("                             ,sum(decode(a.inv_wk, '2071301', -a.stock, 0))               as out_qty                                                 ")
			.where("                         from stock_ledger a                                                                                                         ")
			.where("                        where a.row_sts = 0                                                                                                        ")
			.where("                          and a.inv_dt between to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -12), 'yyyymm')||'01'                               ", arg.fixParamText("base_dt"))
			.where("                                           and to_char(last_day(add_months(to_date(:base_dt, 'yyyymmdd'), -12)), 'yyyymmdd')                         ", arg.fixParamText("base_dt"))
			.where("                        group by a.item_idcd                                                                                                           ")
			.where("                       ) a4 on a4.item_idcd = a.item_idcd                                                                                                ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select b.item_idcd                                                                                                              ")
			.where("                             ,decode(b.sum_month_qty, null, 0, b.sum_month_qty) as trans_qty                                                         ")
			.where("                             ,decode(b.sum_month_amt, null, 0, b.sum_month_amt) as trans_amt                                                         ")
			.where("                         from (                                                                                                                      ")
			.where("                              select a.item_idcd                                                                                                       ")
			.where("                                    ,case                                                                                                            ")
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '01' then sum(a.base_qty_01)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '02' then sum(a.base_qty_02)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '03' then sum(a.base_qty_03)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '04' then sum(a.base_qty_04)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '05' then sum(a.base_qty_05)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '06' then sum(a.base_qty_06)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '07' then sum(a.base_qty_07)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '08' then sum(a.base_qty_08)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '09' then sum(a.base_qty_09)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '10' then sum(a.base_qty_10)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '11' then sum(a.base_qty_11)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '12' then sum(a.base_qty_12)              ", arg.fixParamText("base_dt"))
			.where("                                     end as sum_month_qty                                                                                            ")
			.where("                                    ,case                                                                                                            ")
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '01' then sum(a.base_amt_01)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '02' then sum(a.base_amt_02)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '03' then sum(a.base_amt_03)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '04' then sum(a.base_amt_04)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '05' then sum(a.base_amt_05)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '06' then sum(a.base_amt_06)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '07' then sum(a.base_amt_07)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '08' then sum(a.base_amt_08)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '09' then sum(a.base_amt_09)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '10' then sum(a.base_amt_10)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '11' then sum(a.base_amt_11)              ", arg.fixParamText("base_dt"))
			.where("                                       when to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'mm') = '12' then sum(a.base_amt_12)              ", arg.fixParamText("base_dt"))
			.where("                                     end as sum_month_amt                                                                                            ")
			.where("                                from item_month a                                                                                                    ")
			.where("                               where a.lock_yy = to_char(add_months(to_date(:base_dt, 'yyyymmdd'), -1), 'yyyy')                                      ", arg.fixParamText("base_dt"))
			.where("                               group by a.item_idcd                                                                                                    ")
			.where("                              ) b                                                                                                                    ")
			.where("                       ) b on b.item_idcd = a.item_idcd                                                                                                  ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select s.item_idcd                                                                                                              ")
			.where("                             ,s.safe_qty                                                                                                             ")
			.where("                             ,t.stock                                                                                                                ")
			.where("                             ,t.stock-s.safe_qty as lack_qty                                                                                         ")
			.where("                         from itm_stor s                                                                                                           ")
			.where("                              join itm_stock t                                                                                                      ")
			.where("                                on t.stor_id = s.stor_id                                                                                           ")
			.where("                               and t.item_idcd = s.item_idcd                                                                                             ")
			.where("                        where s.stor_id = 'N2130ALPHA1090' -- 알파(주) 중앙물류                                                                     ")
			;
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("                          and s.row_sts = 0                                                                                                        ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("                          and s.sale_epo = '1'                                                                                                       ")
			;
		}
		data.param
			.where("                       ) t1 on t1.item_idcd = a.item_idcd                                                                                                ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select s.item_idcd                                                                                                              ")
			.where("                             ,s.safe_qty                                                                                                             ")
			.where("                             ,t.stock                                                                                                                ")
			.where("                             ,t.stock-s.safe_qty as lack_qty                                                                                         ")
			.where("                         from itm_stor s                                                                                                           ")
			.where("                              join itm_stock t                                                                                                      ")
			.where("                                on t.stor_id = s.stor_id                                                                                           ")
			.where("                               and t.item_idcd = s.item_idcd                                                                                             ")
			.where("                        where s.stor_id = 'N2130ALPHA1040' -- 알파(주) 중부물류                                                                     ")
			;
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("                          and s.row_sts = 0                                                                                                        ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("                          and s.sale_epo = '1'                                                                                                       ")
			;
		}
		data.param
			.where("                       ) t2 on t2.item_idcd = a.item_idcd                                                                                                ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select s.item_idcd                                                                                                              ")
			.where("                             ,s.safe_qty                                                                                                             ")
			.where("                             ,t.stock                                                                                                                ")
			.where("                             ,t.stock-s.safe_qty as lack_qty                                                                                         ")
			.where("                         from itm_stor s                                                                                                           ")
			.where("                              join itm_stock t                                                                                                      ")
			.where("                                on t.stor_id = s.stor_id                                                                                           ")
			.where("                               and t.item_idcd = s.item_idcd                                                                                             ")
			.where("                        where s.stor_id = 'N2140ALPHA1090' -- 오피스알파 중앙물류                                                                   ")
			;
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("                          and s.row_sts = 0                                                                                                        ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("                          and s.sale_epo = '1'                                                                                                       ")
			;
		}
		data.param
			.where("                       ) t3 on t3.item_idcd = a.item_idcd                                                                                                ")
			.where("       left outer join (                                                                                                                             ")
			.where("                       select s.item_idcd                                                                                                              ")
			.where("                             ,sum(s.safe_qty)         as safe_qty                                                                                    ")
			.where("                             ,sum(t.stock)            as stock                                                                                       ")
			.where("                             ,sum(t.stock-s.safe_qty) as lack_qty                                                                                    ")
			.where("                         from itm_stor s                                                                                                           ")
			.where("                              join itm_stock t                                                                                                      ")
			.where("                                on t.stor_id = s.stor_id                                                                                           ")
			.where("                               and t.item_idcd = s.item_idcd                                                                                             ")
			.where("                        where s.stor_id in ( select stor_id from store where stor_grp = '2' ) -- 1:본사/2:직영/3:가맹                              ")
			;
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("                          and s.row_sts = 0                                                                                                        ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("                          and s.sale_epo = '1'                                                                                                       ")
			;
		}
		data.param
			.where("                        group by s.item_idcd                                                                                                           ")
			.where("                       ) t4 on t4.item_idcd = a.item_idcd                                                                                                ")
			.where("       left outer join itm_mst i                                                                                                                   ")
			.where("         on i.item_idcd = a.item_idcd                                                                                                                    ")
			.where("       left outer join item_unit u                                                                                                                   ")
			.where("         on u.unit_idcd = i.unit_idcd                                                                                                                    ")
			.where("       left outer join base_mst m                                                                                                                   ")
			.where("         on m.bas_id = i.mfg_id                                                                                                                     ")
			.where("       left outer join vend_mst v                                                                                                                   ")
			.where("         on v.vend_id = i.vend_id                                                                                                                    ")
			.where(" where 1 = 1                                                                                                                                         ")
			.where("   and i.item_sts = :item_sts                                                                                                                        ", arg.getParameter("item_sts"))
			.where("   and i.vend_id = :vend_id                                                                                                                          ", arg.getParameter("vend_id"))
			.where("   and i.item_idcd = :item_idcd                                                                                                                          ", arg.getParameter("item_idcd"))
			.where("   and i.item_name like %:search_item_nm%                                                                                                              ", arg.getParameter("search_item_nm"))
			.where("   and i.class_id in ( select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id )                       ", arg.getParameter("class_id"))
			.where("   and i.mfg_id = :mfg_id                                                                                                                            ", arg.getParameter("mfg_id"))
			.where("   and i.brand_id = :brand_id                                                                                                                        ", arg.getParameter("brand_id"))
		;
		if ("true".equals(arg.getParamText("has_stock_yn"))) {
			data.param
			.where("   and isnull(t1.stock, 0)+isnull(t2.stock, 0)+isnull(t3.stock, 0)+isnull(t4.stock, 0) > 0                                                                       ")
			;
		}
		data.param
			.where(" order by i.item_idcd                                                                                                                                  ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
