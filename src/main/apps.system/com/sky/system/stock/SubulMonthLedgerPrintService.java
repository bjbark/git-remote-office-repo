package com.sky.system.stock;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class SubulMonthLedgerPrintService  extends DefaultServiceHandler {

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
			.total("      ,sum(a.in_qty)                     as in_qty    ")
			.total("      ,sum(a.in_amt)                     as in_amt    ")
			.total("      ,sum(a.out_qty+a.etc_qty)          as out_qty   ")
			.total("      ,sum(a.out_amt+a.etc_amt)          as out_amt   ")
			.total("      ,sum(a.in_qty-a.out_qty-a.etc_qty) as stock_qty ")
			.total("      ,sum(a.in_amt-a.out_amt-a.etc_amt) as stock_amt ")
		;
		data.param // 조회
			.query("select a.stor_nm                                                                                                                          ")
			.query("      ,i.item_code                                                                                                                           ")
			.query("      ,i.item_name                                                                                                                           ")
			.query("      ,i.item_spec                                                                                                                           ")
			.query("      ,u.unit_name                                                                                                                           ")
			.query("      ,a.inv_dt                                                                                                                            ")
			.query("      ,a.inv_no                                                                                                                            ")
			.query("      ,case                                                                                                                                ")
			.query("         when a.inv_wk = '2071301' then c.cust_nm                                                                                          ")
			.query("         when a.inv_wk = '2071302' then v.vend_nm                                                                                          ")
			.query("         else s.stor_nm                                                                                                                   ")
			.query("       end cust_nm                                                                                                                         ")
			.query("      ,case                                                                                                                                ")
			.query("         when a.inv_wk = '2071302' then '입고'                                                                                             ")
			.query("         else '출고'                                                                                                                       ")
			.query("       end wk_nm                                                                                                                           ")
			.query("      ,a.in_qty                                                                                                                            ")
			.query("      ,a.in_amt                                                                                                                            ")
			.query("      ,a.out_qty+a.etc_qty          as out_qty                                                                                             ")
			.query("      ,a.out_amt+a.etc_amt          as out_amt                                                                                             ")
			.query("      ,a.in_qty-a.out_qty-a.etc_qty as stock_qty                                                                                           ")
			.query("      ,a.in_amt-a.out_amt-a.etc_amt as stock_amt                                                                                           ")
		;
		data.param // 조건
			.where("  from (                                                                                                                                   ")
			.where("       select a.stor_id                                                                                                                   ")
			.where("             ,n.stor_nm                                                                                                                   ")
			.where("             ,a.inv_dt                                                                                                                     ")
			.where("             ,a.inv_no                                                                                                                     ")
			.where("             ,a.inv_wk                                                                                                                     ")
			.where("             ,a.cust_id                                                                                                                    ")
			.where("             ,a.item_idcd                                                                                                                    ")
			.where("             ,sum(decode(a.inv_wk, '2071302', a.stock, 0))                as in_qty                                                        ")
			.where("             ,sum(decode(a.inv_wk, '2071302', a.amount, 0))               as in_amt                                                        ")
			.where("             ,sum(decode(a.inv_wk, '2071301', -a.stock, 0))               as out_qty                                                       ")
			.where("             ,sum(decode(a.inv_wk, '2071301', a.amount, 0))               as out_amt                                                       ")
			.where("             ,sum(decode(a.inv_wk, '2071302', 0, '2071301', 0, '2071303', -a.stock, '2071304', -a.stock, '2071305', a.stock)) as etc_qty   ")
			.where("             ,sum(decode(a.inv_wk, '2071302', 0, '2071301', 0, '2071303', a.amount, '2071304', -a.amount, '2071305', a.amount)) as etc_amt ")
			.where("         from stock_ledger a                                                                                                               ")
			.where("              join store n                                                                                                                 ")
			.where("                on n.stor_id = a.stor_id                                                                                                 ")
			.where("              left outer join itm_mst i                                                                                                  ")
			.where("                on i.item_idcd = a.item_idcd                                                                                                   ")
			.where("        where a.stor_grp = :stor_grp                                                                                                       ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id                                                                                                       ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :base_dt||'01'                                                                                              ", arg.fixParameter("base_dt"))
			.where("                           and :base_dt||'31'                                                                                              ", arg.fixParameter("base_dt"))
			.where("          and a.row_sts = 0                                                                                                              ")
			.where("          and i.item_idcd = :item_idcd                                                                                                         ", arg.getParameter("item_idcd"))
			.where("          and i.item_name like %:search_item_nm%                                                                                             ", arg.getParameter("search_item_nm"))
			.where("          and i.class_id in ( select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id )      ", arg.getParameter("class_id"))
			.where("        group by a.stor_id, n.stor_nm, a.inv_dt, a.inv_no, a.inv_wk, a.cust_id, a.item_idcd                                                ")
			.where("       ) a                                                                                                                                 ")
			.where("       left outer join cust_mst c                                                                                                         ")
			.where("         on c.cust_id = a.cust_Id                                                                                                          ")
			.where("       left outer join vend_mst v                                                                                                         ")
			.where("         on v.vend_id = a.cust_id                                                                                                          ")
			.where("       left outer join store s                                                                                                             ")
			.where("         on s.stor_id = a.cust_id                                                                                                         ")
			.where("       left outer join itm_mst i                                                                                                         ")
			.where("         on i.item_idcd = a.item_idcd                                                                                                          ")
			.where("       left outer join item_unit u                                                                                                         ")
			.where("         on u.unit_idcd = i.unit_idcd                                                                                                          ")
			.where(" order by a.stor_id, a.inv_dt desc, a.inv_no desc                                                                                         ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
