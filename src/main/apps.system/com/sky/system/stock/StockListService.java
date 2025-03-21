package com.sky.system.stock;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class StockListService  extends DefaultServiceHandler {

	/**
	 * 재고현황(환산)
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
			.total("      ,sum(a.trans_qty)                                                                   as trans_qty        ")
			.total("      ,sum(a.trans_amt)                                                                   as trans_amt        ")
			.total("      ,sum(a.stock_qty-a.trans_qty-isnull(b.tot_qty, 0))                                     as after_qty        ")
			.total("      ,sum(a.stock_amt-a.trans_amt-isnull(b.tot_amt, 0))                                     as after_amt        ")
			.total("      ,sum(b.in_qty)                                                                      as in_qty           ")
			.total("      ,sum(b.in_amt)                                                                      as in_amt           ")
			.total("      ,sum(b.inret_qty)                                                                   as inret_qty        ")
			.total("      ,sum(b.inret_amt)                                                                   as inret_amt        ")
			.total("      ,sum(b.movein_qty)                                                                  as movein_qty       ")
			.total("      ,sum(b.movein_amt)                                                                  as movein_amt       ")
			.total("      ,sum(b.out_qty)                                                                     as out_qty          ")
			.total("      ,sum(b.out_amt)                                                                     as out_amt          ")
			.total("      ,sum(b.outret_qty)                                                                  as outret_qty       ")
			.total("      ,sum(b.outret_amt)                                                                  as outret_amt       ")
			.total("      ,sum(b.moveout_qty)                                                                 as moveout_qty      ")
			.total("      ,sum(b.moveout_amt)                                                                 as moveout_amt      ")
			.total("      ,sum(b.etcout_qty)                                                                  as etcout_qty       ")
			.total("      ,sum(b.etcout_amt)                                                                  as etcout_amt       ")
			.total("      ,sum(b.modi_qty)                                                                    as modi_qty         ")
			.total("      ,sum(b.modi_amt)                                                                    as modi_amt         ")
			.total("      ,sum(a.stock_qty)                                                                   as stock_qty        ")
			.total("      ,sum(a.stock_amt)                                                                   as stock_amt        ")
			.total("      ,sum(s.safe_qty)                                                                    as safe_qty         ")
			.total("      ,sum(isnull(a.stock_qty, 0)-isnull(s.safe_qty, 0))                                        as lack_qty         ")
			.total("      ,sum(decode(s.po_pri, 0, i.po_pri, s.po_pri)*(isnull(a.trans_qty, 0)+b.tot_qty)) as po_amt           ")
			.total("      ,sum(c.stad_sale_pri*(isnull(a.trans_qty, 0)+b.tot_qty))                                  as compare_sale_amt ")
		;
		data.param // 조회
			.query("select n.stor_nm                                                                                                              ")
			.query("      ,i.mst_itm_cd                                                                                                               ")
			.query("      ,i.item_idcd                                                                                                               ")
			.query("      ,i.item_name                                                                                                               ")
			.query("      ,i.item_spec                                                                                                               ")
//			.query("      ,i.unt_qty                                                                                                               ")
			.query("      ,u.unit_name                                                                                                               ")
			.query("      ,m.bas_nm as mfg_nm                                                                                                     ")
			.query("      ,v.vend_nm                                                                                                               ")
			.query("      ,s.stad_sale_pri                                                                                                            ")
			.query("      ,a.trans_qty                                                                                                             ")
			.query("      ,a.trans_amt                                                                                                             ")
			.query("      ,a.stock_qty-a.trans_qty-isnull(b.tot_qty, 0) as after_qty                                                                  ")
			.query("      ,a.stock_amt-a.trans_amt-isnull(b.tot_amt, 0) as after_amt                                                                  ")
			.query("      ,b.in_qty                                                                                                                ")
			.query("      ,b.in_amt                                                                                                                ")
			.query("      ,b.inret_qty                                                                                                             ")
			.query("      ,b.inret_amt                                                                                                             ")
			.query("      ,b.movein_qty                                                                                                            ")
			.query("      ,b.movein_amt                                                                                                            ")
			.query("      ,b.out_qty                                                                                                               ")
			.query("      ,b.out_amt                                                                                                               ")
			.query("      ,b.outret_qty                                                                                                            ")
			.query("      ,b.outret_amt                                                                                                            ")
			.query("      ,b.moveout_qty                                                                                                           ")
			.query("      ,b.moveout_amt                                                                                                           ")
			.query("      ,b.etcout_qty                                                                                                            ")
			.query("      ,b.etcout_amt                                                                                                            ")
			.query("      ,b.modi_qty                                                                                                              ")
			.query("      ,b.modi_amt                                                                                                              ")
			.query("      ,a.stock_qty                                                                                                             ")
			.query("      ,a.stock_amt                                                                                                             ")
			.query("      ,decode((isnull(a.trans_qty, 0)+b.in_qty), 0, decode(s.po_pri, 0, i.po_pri, s.po_pri), round((isnull(a.trans_amt, 0)+b.in_amt)/(isnull(a.trans_qty, 0)+b.in_qty))) as standard_price ")
			.query("      ,s.safe_qty                                                                                                              ")
			.query("      ,isnull(a.stock_qty, 0)-isnull(s.safe_qty, 0) as lack_qty                                                                      ")
			.query("      ,decode(s.po_pri, 0, i.po_pri, s.po_pri)                                 as po_pri                               ")
			.query("      ,decode(s.po_pri, 0, i.po_pri, s.po_pri)*(isnull(a.trans_qty, 0)+b.tot_qty) as po_amt                                 ")
			.query("      ,s.stad_sale_pri                                 as common_sale_price                                                       ")
			.query("      ,c.stad_sale_pri                                 as compare_sale_price                                                      ")
			.query("      ,c.stad_sale_pri*(isnull(a.trans_qty, 0)+b.tot_qty) as compare_sale_amt                                                        ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 2)) as class_nm1                                ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 4)) as class_nm2                                ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 6)) as class_nm3                                ")
		;
		data.param // 조건
			.where("  from (                                                                                                                       ")
			.where("       select t.stor_id                                                                                                       ")
			.where("             ,t.item_idcd                                                                                                        ")
			.where("             ,t.stock_qty                                                                                                      ")
			.where("             ,t.stock_amt                                                                                                      ")
			.where("             ,t.stock_qty-isnull(l.tot_qty, 0) as trans_qty                                                                       ")
			.where("             ,t.stock_amt-isnull(l.tot_amt, 0) as trans_amt                                                                       ")
			.where("         from (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.mst_itm_id as item_idcd                                                                                      ")
			.where("                    ,sum(a.stock_qty) as stock_qty                                                                             ")
			.where("                    ,sum(a.stock_amt) as stock_amt                                                                             ")
			.where("                from (                                                                                                         ")
			.where("                     select a.stor_id                                                                                         ")
			.where("                           ,a.mst_itm_id                                                                                          ")
			.where("                           ,a.item_idcd                                                                                          ")
			.where("                           ,a.stock*i.unt_qty                                            as stock_qty                         ")
			.where("                           ,decode(isnull(s.po_pri, 0), 0, i.po_pri, s.po_pri)*a.stock as stock_amt                         ")
			.where("                       from itm_stock a                                                                                       ")
			.where("                            left outer join itm_stor s                                                                       ")
			.where("                              on s.stor_id = a.stor_id                                                                       ")
			.where("                             and s.item_idcd = a.item_idcd                                                                         ")
			.where("                            left outer join itm_mst i                                                                        ")
			.where("                              on i.item_idcd = a.item_idcd                                                                         ")
			.where("                      where a.stor_grp = :stor_grp                                                                             ", arg.fixParameter("stor_grp"))
			.where("                        and a.stor_id = :stor_id                                                                             ", arg.fixParameter("stor_id"))
			.where("                        and a.row_sts = :stock_state                                                                         ", arg.getParameter("stock_state"))
			.where("                     ) a                                                                                                       ")
			.where("               group by a.stor_id, a.mst_itm_id                                                                                  ")
			.where("              ) t                                                                                                              ")
			.where("              left outer join                                                                                                  ")
			.where("              (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.mst_itm_id as item_idcd                                                                                      ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', a.stock*i.unt_qty, '2071302', a.stock*i.unt_qty, '2071303', a.stock*i.unt_qty, '2071304', a.stock*i.unt_qty, '2071305', a.stock*i.unt_qty, '2071306', a.stock*i.unt_qty, 0)) as tot_qty ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', -a.po_amount,       '2071302', a.po_amount,        '2071303', -a.po_amount,       '2071304', a.po_amount,        '2071305', a.po_amount,        '2071306', a.po_amount,        0)) as tot_amt ")
			.where("                from stock_ledger a                                                                                            ")
			.where("                     left outer join itm_mst i                                                                               ")
			.where("                       on i.item_idcd = a.item_idcd                                                                                ")
			.where("               where a.row_sts = 0                                                                                           ")
			.where("                 and a.stor_grp = :stor_grp                                                                                    ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                                    ", arg.getParameter("stor_id"))
			.where("                 and a.inv_dt >= :fr_dt                                                                                        ", arg.fixParameter("fr_dt"))
			.where("               group by a.stor_id, a.mst_itm_id                                                                                  ")
			.where("              ) l on l.stor_id = t.stor_id                                                                                   ")
			.where("                 and l.item_idcd = t.item_idcd                                                                                     ")
			.where("       ) a                                                                                                                     ")
			.where("       left outer join                                                                                                         ")
			.where("       (                                                                                                                       ")
			.where("       select a.stor_id                                                                                                       ")
			.where("             ,a.mst_itm_id as item_idcd                                                                                             ")
			.where("             ,sum(decode(a.inv_wk, '2071301', a.stock*i.unt_qty, '2071302', a.stock*i.unt_qty, '2071303', a.stock*i.unt_qty, '2071304', a.stock*i.unt_qty, '2071305', a.stock*i.unt_qty, '2071306', a.stock*i.unt_qty, 0)) as tot_qty ")
			.where("             ,sum(decode(a.inv_wk, '2071301', -a.po_amount,       '2071302', a.po_amount,        '2071303', -a.po_amount,       '2071304', a.po_amount,        '2071305', a.po_amount,        '2071306', a.po_amount,        0)) as tot_amt ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.stock*i.unt_qty  else 0 end), 0)) as in_qty          ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.po_amount         else 0 end), 0)) as in_amt          ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.stock*i.unt_qty else 0 end), 0)) as inret_qty       ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.po_amount        else 0 end), 0)) as inret_amt       ")
			.where("             ,sum(decode(a.inv_wk, '2071304', a.stock*i.unt_qty, 0))                                       as movein_qty      ")
			.where("             ,sum(decode(a.inv_wk, '2071304', a.po_amount, 0))                                              as movein_amt      ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then -a.stock*i.unt_qty else 0 end), 0)) as out_qty         ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then a.po_amount         else 0 end), 0)) as out_amt         ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then a.stock*i.unt_qty  else 0 end), 0)) as outret_qty      ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then -a.po_amount        else 0 end), 0)) as outret_amt      ")
			.where("             ,sum(decode(a.inv_wk, '2071303', -a.stock*i.unt_qty, 0))                                      as moveout_qty     ")
			.where("             ,sum(decode(a.inv_wk, '2071303', a.po_amount, 0))                                              as moveout_amt     ")
			.where("             ,sum(decode(a.inv_wk, '2071306', -a.stock*i.unt_qty, 0))                                      as etcout_qty      ")
			.where("             ,sum(decode(a.inv_wk, '2071306', -a.po_amount, 0))                                             as etcout_amt      ")
			.where("             ,sum(decode(a.inv_wk, '2071305', a.stock*i.unt_qty, 0))                                       as modi_qty        ")
			.where("             ,sum(decode(a.inv_wk, '2071305', a.po_amount, 0))                                              as modi_amt        ")
			.where("         from stock_ledger a                                                                                                   ")
			.where("              left outer join itm_mst i                                                                                      ")
			.where("                on i.item_idcd = a.item_idcd                                                                                       ")
			.where("        where a.row_sts = 0                                                                                                  ")
			.where("          and a.stor_grp = :stor_grp                                                                                           ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id                                                                                           ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt                                                                                          ", arg.fixParameter("fr_dt"))
			.where("                           and :to_dt                                                                                          ", arg.fixParameter("to_dt"))
			.where("        group by a.stor_id, a.mst_itm_id                                                                                         ")
			.where("       ) b on b.stor_id = a.stor_id                                                                                          ")
			.where("          and b.item_idcd = a.item_idcd                                                                                            ")
			.where("       left outer join store n                                                                                                 ")
			.where("         on n.stor_id = a.stor_id                                                                                            ")
			.where("       join itm_stor s                                                                                                       ")
			.where("         on s.stor_id = a.stor_id                                                                                            ")
			.where("        and s.item_idcd = a.item_idcd                                                                                              ")
			.where("       left outer join itm_mst i                                                                                             ")
			.where("         on i.item_idcd = a.item_idcd                                                                                              ")
			.where("       left outer join item_unit u                                                                                             ")
			.where("         on u.unit_idcd = i.unit_idcd                                                                                              ")
			.where("       left outer join base_mst m                                                                                             ")
			.where("         on m.bas_id = i.mfg_id                                                                                               ")
			.where("       left outer join vend_mst v                                                                                             ")
			.where("         on v.vend_id = i.vend_id                                                                                              ")
			.where("       left outer join itm_stor c                                                                                            ")
			.where("         on c.stor_id = '" + arg.getParamText("compare_stor_id") + "'                                                        ")
			.where("        and c.item_idcd = a.item_idcd                                                                                              ")
			.where(" where s.mst_itm_id = s.item_idcd                                                                                                   ")
			.where("   and s.stor_id = :stor_id                                                                                                  ", arg.getParameter("stor_id"))
			.where("   and i.item_idcd = :item_idcd                                                                                                    ", arg.getParameter("item_idcd"))
			.where("   and i.item_name like %:search_item_nm%                                                                                        ", arg.getParameter("search_item_nm"))
			.where("   and i.item_sts = :item_sts                                                                                                  ", arg.getParameter("item_sts"))
			.where("   and i.vend_id = :vend_id                                                                                                    ", arg.getParameter("vend_id"))
			.where("   and i.class_id in ( select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id ) ", arg.getParameter("class_id"))
			.where("   and i.mfg_id = :mfg_id                                                                                                      ", arg.getParameter("mfg_id"))
			.where("   and i.brand_id = :brand_id                                                                                                  ", arg.getParameter("brand_id"))
		;
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("   and s.row_sts = 0                                                                                                         ")
			;
		}
		if ("true".equals(arg.getParamText("has_stock_yn"))) {
			data.param
			.where("   and (                                                                                                                       ")
			.where("          ( isnull(b.in_qty, 0) <> 0 or isnull(b.inret_qty, 0) <> 0 or isnull(b.movein_qty, 0) <> 0 or isnull(b.out_qty, 0) <> 0 or isnull(b.outret_qty, 0) <> 0 or isnull(b.moveout_qty, 0) <> 0 or isnull(b.etcout_qty, 0) <> 0 or isnull(b.modi_qty, 0) <> 0 ) ") // 조회기간 실적 있는 경우 포함
			.where("       or ( a.trans_qty <> 0 )                                                                                                 ") // 이월 있는 경우 포함
			.where("       or ( a.stock_qty-a.trans_qty-isnull(b.tot_qty, 0) <> 0 )                                                                   ") // 조회기간이후 재고 증감 있는 경우 포함
			.where("       or ( a.stock_qty <> 0 )                                                                                                 ") // 재고 있는 경우 포함
			.where("       )                                                                                                                       ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("   and s.sale_epo = '1'                                                                                                        ")
			;
		}
		data.param
			.where(" order by n.stor_id, i.mst_itm_cd                                                                                                ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * 단위별재고현황
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")                                                                                                                               
			.total("      ,sum(a.trans_qty)                                                                   as trans_qty   ")
			.total("      ,sum(a.trans_amt)                                                                   as trans_amt   ")
			.total("      ,sum(b.in_qty)                                                                      as in_qty      ")
			.total("      ,sum(b.in_amt)                                                                      as in_amt      ")
			.total("      ,sum(b.inret_qty)                                                                   as inret_qty   ")
			.total("      ,sum(b.inret_amt)                                                                   as inret_amt   ")
			.total("      ,sum(b.movein_qty)                                                                  as movein_qty  ")
			.total("      ,sum(b.movein_amt)                                                                  as movein_amt  ")
			.total("      ,sum(b.out_qty)                                                                     as out_qty     ")
			.total("      ,sum(b.out_amt)                                                                     as out_amt     ")
			.total("      ,sum(b.outret_qty)                                                                  as outret_qty  ")
			.total("      ,sum(b.outret_amt)                                                                  as outret_amt  ")
			.total("      ,sum(b.moveout_qty)                                                                 as moveout_qty ")
			.total("      ,sum(b.moveout_amt)                                                                 as moveout_amt ")
			.total("      ,sum(b.etcout_qty)                                                                  as etcout_qty  ")
			.total("      ,sum(b.etcout_amt)                                                                  as etcout_amt  ")
			.total("      ,sum(b.modi_qty)                                                                    as modi_qty    ")
			.total("      ,sum(b.modi_amt)                                                                    as modi_amt    ")
			.total("      ,sum(a.after_qty)                                                                   as after_qty   ")
			.total("      ,sum(a.after_amt)                                                                   as after_amt   ")
			.total("      ,sum(a.trans_qty+isnull(b.tot_qty, 0))                                                 as stock_qty   ")
			.total("      ,sum(a.trans_amt+isnull(b.tot_amt, 0))                                                 as stock_amt   ")
			.total("      ,sum((a.trans_qty+isnull(b.tot_qty, 0))*decode(s.po_pri, 0, i.po_pri, s.po_pri)) as po_amt      ")
		;
		data.param // 조회
			.query("select n.stor_nm                                                                                                              ")
			.query("      ,i.item_code                                                                                                               ")
			.query("      ,i.item_idcd                                                                                                               ")
			.query("      ,i.item_name                                                                                                               ")
			.query("      ,i.item_spec                                                                                                               ")
			.query("      ,i.unt_qty                                                                                                              ")
			.query("      ,u.unit_name                                                                                                               ")
			.query("      ,m.bas_nm as mfg_nm                                                                                                     ")
			.query("      ,v.vend_nm                                                                                                               ")
			.query("      ,s.stad_sale_pri                                                                                                            ")
			.query("      ,a.trans_qty                                                                                                             ")
			.query("      ,a.trans_amt                                                                                                             ")
			.query("      ,b.in_qty                                                                                                                ")
			.query("      ,b.in_amt                                                                                                                ")
			.query("      ,b.inret_qty                                                                                                             ")
			.query("      ,b.inret_amt                                                                                                             ")
			.query("      ,b.movein_qty                                                                                                            ")
			.query("      ,b.movein_amt                                                                                                            ")
			.query("      ,b.out_qty                                                                                                               ")
			.query("      ,b.out_amt                                                                                                               ")
			.query("      ,b.outret_qty                                                                                                            ")
			.query("      ,b.outret_amt                                                                                                            ")
			.query("      ,b.moveout_qty                                                                                                           ")
			.query("      ,b.moveout_amt                                                                                                           ")
			.query("      ,b.etcout_qty                                                                                                            ")
			.query("      ,b.etcout_amt                                                                                                            ")
			.query("      ,b.modi_qty                                                                                                              ")
			.query("      ,b.modi_amt                                                                                                              ")
			.query("      ,a.after_qty                                                                                                             ")
			.query("      ,a.after_amt                                                                                                             ")
			.query("      ,a.trans_qty+isnull(b.tot_qty, 0) as stock_qty                                                                              ")
			.query("      ,a.trans_amt+isnull(b.tot_amt, 0) as stock_amt                                                                              ")
			.query("      ,(a.trans_qty+isnull(b.tot_qty, 0))*decode(s.po_pri, 0, i.po_pri, s.po_pri) as po_amt                                 ")
			.query("      ,decode(s.po_pri, 0, i.po_pri, s.po_pri)                                 as po_pri                               ")
		;
		data.param // 조건
			.where("  from (                                                                                                                       ")
			.where("       select a.stor_id                                                                                                       ")
			.where("             ,a.item_idcd                                                                                                        ")
			.where("             ,a.month_qty+isnull(b.tot_qty, 0)                                              as trans_qty                          ")
			.where("             ,decode(a.month_qty+isnull(b.tot_qty, 0), 0, 0, a.month_amt+isnull(b.tot_amt, 0)) as trans_amt                          ")
			.where("             ,isnull(c.tot_qty, 0)                                                          as after_qty                          ")
			.where("             ,decode(isnull(c.tot_qty, 0), 0, 0, isnull(c.tot_amt, 0))                         as after_amt                          ")
			.where("         from (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.item_idcd                                                                                                 ")
			.where("                    ,isnull(b.last_qty, 0) as month_qty                                                                           ")
			.where("                    ,isnull(b.last_amt, 0) as month_amt                                                                           ")
			.where("                from itm_stock a                                                                                              ")
			.where("                     left outer join item_month b                                                                              ")
			.where("                       on b.stor_id = a.stor_id                                                                              ")
			.where("                      and b.item_idcd = a.item_idcd                                                                                ")
			.where("                      and b.lock_ym = to_char(add_months(to_date(:fr_dt, 'yyyymmdd'), -1), 'yyyymm')                           ")
			.where("               where a.stor_grp = :stor_grp                                                                                    ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                                    ", arg.fixParameter("stor_id"))
			.where("                 and a.row_sts = :stock_state                                                                                ", arg.getParameter("stock_state"))
			.where("              ) a                                                                                                              ")
			.where("              left outer join                                                                                                  ")
			.where("              (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.item_idcd                                                                                                 ")                                                                                                                           
			.where("                    ,sum(decode(a.inv_wk, '2071301', a.stock,      '2071302', a.stock,     '2071303', a.stock,      '2071304', a.stock,     '2071305', a.stock,     '2071306', a.stock,     0)) as tot_qty ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', -a.po_amount, '2071302', a.po_amount, '2071303', -a.po_amount, '2071304', a.po_amount, '2071305', a.po_amount, '2071306', a.po_amount, 0)) as tot_amt ")
			.where("                from stock_ledger a                                                                                            ")                                                                                                                                
			.where("               where a.row_sts = 0                                                                                           ")
			.where("                 and a.stor_grp = :stor_grp                                                                                    ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                                    ", arg.getParameter("stor_id"))
			.where("                 and a.inv_dt between substr(:fr_dt, 1, 6)||'01'                                                               ", arg.fixParameter("fr_dt"))
			.where("                                  and to_char(to_date(:fr_dt, 'yyyymmdd')-1, 'yyyymmdd')                                       ", arg.fixParameter("fr_dt"))
			.where("               group by a.stor_id, a.item_idcd                                                                                  ")
			.where("              ) b on b.stor_id = a.stor_id                                                                                   ")
			.where("                 and b.item_idcd = a.item_idcd                                                                                     ")
			.where("              left outer join                                                                                                  ")
			.where("              (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.item_idcd                                                                                                 ")                                                                                                                           
			.where("                    ,sum(decode(a.inv_wk, '2071301', a.stock,      '2071302', a.stock,     '2071303', a.stock,      '2071304', a.stock,     '2071305', a.stock,     '2071306', a.stock,     0)) as tot_qty ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', -a.po_amount, '2071302', a.po_amount, '2071303', -a.po_amount, '2071304', a.po_amount, '2071305', a.po_amount, '2071306', a.po_amount, 0)) as tot_amt ")
			.where("                from stock_ledger a                                                                                            ")                                                                                                                                
			.where("               where a.row_sts = 0                                                                                           ")
			.where("                 and a.stor_grp = :stor_grp                                                                                    ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                                    ", arg.getParameter("stor_id"))
			.where("                 and a.inv_dt > :to_dt                                                                                         ", arg.fixParameter("to_dt"))
			.where("               group by a.stor_id, a.item_idcd                                                                                  ")
			.where("              ) c on c.stor_id = a.stor_id                                                                                   ")
			.where("                 and c.item_idcd = a.item_idcd                                                                                     ")
			.where("       ) a                                                                                                                     ")
			.where("       left outer join                                                                                                         ")
			.where("       (                                                                                                                       ")
			.where("       select a.stor_id                                                                                                       ")
			.where("             ,a.item_idcd                                                                                                        ")                                                                                                                    
			.where("             ,sum(decode(a.inv_wk, '2071301', a.stock,      '2071302', a.stock,     '2071303', a.stock,      '2071304', a.stock,     '2071305', a.stock,     '2071306', a.stock,     0)) as tot_qty ")
			.where("             ,sum(decode(a.inv_wk, '2071301', -a.po_amount, '2071302', a.po_amount, '2071303', -a.po_amount, '2071304', a.po_amount, '2071305', a.po_amount, '2071306', a.po_amount, 0)) as tot_amt ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.stock      else 0 end), 0)) as in_qty                 ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.po_amount  else 0 end), 0)) as in_amt                 ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.stock     else 0 end), 0)) as inret_qty              ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.po_amount else 0 end), 0)) as inret_amt              ")
			.where("             ,sum(decode(a.inv_wk, '2071304', a.stock, 0))                                           as movein_qty             ")
			.where("             ,sum(decode(a.inv_wk, '2071304', a.po_amount, 0))                                       as movein_amt             ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then -a.stock     else 0 end), 0)) as out_qty                ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then a.po_amount  else 0 end), 0)) as out_amt                ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then a.stock      else 0 end), 0)) as outret_qty             ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then -a.po_amount else 0 end), 0)) as outret_amt             ")
			.where("             ,sum(decode(a.inv_wk, '2071303', -a.stock, 0))                                          as moveout_qty            ")
			.where("             ,sum(decode(a.inv_wk, '2071303', a.po_amount, 0))                                       as moveout_amt            ")
			.where("             ,sum(decode(a.inv_wk, '2071306', -a.stock, 0))                                          as etcout_qty             ")
			.where("             ,sum(decode(a.inv_wk, '2071306', -a.po_amount, 0))                                      as etcout_amt             ")
			.where("             ,sum(decode(a.inv_wk, '2071305', a.stock, 0))                                           as modi_qty               ")
			.where("             ,sum(decode(a.inv_wk, '2071305', a.po_amount, 0))                                       as modi_amt               ")
			.where("         from stock_ledger a                                                                                                   ")
			.where("        where a.row_sts = 0                                                                                                  ")
			.where("          and a.stor_grp = :stor_grp                                                                                           ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id                                                                                           ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt                                                                                          ", arg.fixParameter("fr_dt"))
			.where("                           and :to_dt                                                                                          ", arg.fixParameter("to_dt"))
			.where("        group by a.stor_id, a.item_idcd                                                                                         ")
			.where("       ) b on b.stor_id = a.stor_id                                                                                          ")
			.where("          and b.item_idcd = a.item_idcd                                                                                            ")
			.where("       left outer join store n                                                                                                 ")
			.where("         on n.stor_id = a.stor_id                                                                                            ")
			.where("       join itm_stor s                                                                                                       ")
			.where("         on s.stor_id = a.stor_id                                                                                            ")
			.where("        and s.item_idcd = a.item_idcd                                                                                              ")
			.where("       left outer join itm_mst i                                                                                             ")
			.where("         on i.item_idcd = a.item_idcd                                                                                              ")
			.where("       left outer join item_unit u                                                                                             ")
			.where("         on u.unit_idcd = i.unit_idcd                                                                                              ")
			.where("       left outer join base_mst m                                                                                             ")
			.where("         on m.bas_id = i.mfg_id                                                                                               ")
			.where("       left outer join vend_mst v                                                                                             ")
			.where("         on v.vend_id = i.vend_id                                                                                              ")
			.where(" where s.stor_id = :stor_id                                                                                                  ", arg.getParameter("stor_id"))
			.where("   and i.item_idcd = :item_idcd                                                                                                    ", arg.getParameter("item_idcd"))
			.where("   and i.item_name like %:search_item_nm%                                                                                        ", arg.getParameter("search_item_nm"))
			.where("   and i.item_sts = :item_sts                                                                                                  ", arg.getParameter("item_sts"))
			.where("   and i.vend_id = :vend_id                                                                                                    ", arg.getParameter("vend_id"))
			.where("   and i.class_id in ( select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id ) ", arg.getParameter("class_id"))
			.where("   and i.mfg_id = :mfg_id                                                                                                      ", arg.getParameter("mfg_id"))
			.where("   and i.brand_id = :brand_id                                                                                                  ", arg.getParameter("brand_id"))
		;
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("   and s.row_sts = 0                                                                                                         ")
			;
		}
		if ("true".equals(arg.getParamText("has_stock_yn"))) {
			data.param
			.where("   and (                                                                                                                       ")                                                                                                     
			.where("          ( isnull(b.in_qty, 0) <> 0 or isnull(b.inret_qty, 0) <> 0 or isnull(b.movein_qty, 0) <> 0 or isnull(b.out_qty, 0) <> 0 or isnull(b.outret_qty, 0) <> 0 or isnull(b.moveout_qty, 0) <> 0 or isnull(b.etcout_qty, 0) <> 0 or isnull(b.modi_qty, 0) <> 0 ) ") // 조회기간 실적 있는 경우 포함
			.where("       or ( a.trans_qty <> 0 )                                                                                                 ") // 이월 있는 경우 포함                                                                                                                           
			.where("       or ( a.trans_qty+isnull(b.tot_qty, 0) <> 0 )                                                                               ") // 조회종료일 시점 재고 있는 경우 포함
			.where("       )                                                                                                                       ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("   and s.sale_epo = '1'                                                                                                        ")
			;
		}
		data.param
			.where(" order by n.stor_id, i.item_code                                                                                                ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * 수불내역(환산)
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch2(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.in_qty)  as in_qty    ")
			.total("      ,sum(a.in_amt)  as in_amt    ")
			.total("      ,sum(a.out_qty) as out_qty   ")
			.total("      ,sum(a.out_amt) as out_amt   ")
		;
		data.param // 조회
			.query("select n.stor_nm                                                                                            ")
			.query("      ,a.inv_dt                                                                                              ")
			.query("      ,a.inv_no                                                                                              ")
			.query("      ,case                                                                                                  ")
			.query("         when a.inv_wk = '2071301' then c.cust_nm                                                            ")
			.query("         when a.inv_wk = '2071302' then v.vend_nm                                                            ")
			.query("         else r.stor_nm                                                                                     ")
			.query("       end cust_nm                                                                                           ")
			.query("      ,case                                                                                                  ")
			.query("         when a.inv_wk = '2071301' then '매출'                                                               ")
			.query("         when a.inv_wk = '2071302' then '입고'                                                               ")
			.query("         when a.inv_wk = '2071303' then '이동출고'                                                           ")
			.query("         when a.inv_wk = '2071304' then '이동입고'                                                           ")
			.query("         when a.inv_wk = '2071305' then '재고조정'                                                           ")
			.query("         when a.inv_wk = '2071306' then '기타출고'                                                           ")
			.query("       end wk_nm                                                                                             ")
			.query("      ,a.in_qty                                                                                              ")
			.query("      ,a.in_amt                                                                                              ")
			.query("      ,a.out_qty                                                                                             ")
			.query("      ,a.out_amt                                                                                             ")
			.query("      ,decode(s.po_pri, 0, i.po_pri, s.po_pri) as po_pri                                             ")
			.query("      ,a.trans_qty                                                                                           ")
			.query("      ,a.trans_amt                                                                                           ")
		;
		data.param // 조건
			.where("  from (                                                                                                     ")
			.where("       select 1          as seq                                                                              ")
			.where("             ,t.stor_id                                                                                     ")
			.where("             ,''         as inv_dt                                                                           ")
			.where("             ,'이월재고' as inv_no                                                                           ")
			.where("             ,''         as inv_wk                                                                           ")
			.where("             ,''         as cust_id                                                                          ")
			.where("             ,t.item_idcd                                                                                      ")
			.where("             ,null       as in_qty                                                                           ")
			.where("             ,0          as in_amt                                                                           ")
			.where("             ,0          as out_qty                                                                          ")
			.where("             ,0          as out_amt                                                                          ")
			.where("             ,t.stock_qty-isnull(l.tot_qty, 0) as trans_qty                                                     ")
			.where("             ,t.stock_amt-isnull(l.tot_amt, 0) as trans_amt                                                     ")
			.where("         from (                                                                                              ")
			.where("              select a.stor_id                                                                              ")
			.where("                    ,a.mst_itm_id as item_idcd                                                                    ")
			.where("                    ,sum(a.stock_qty) as stock_qty                                                           ")
			.where("                    ,sum(a.stock_amt) as stock_amt                                                           ")
			.where("                from (                                                                                       ")
			.where("                     select a.stor_id                                                                       ")
			.where("                           ,a.mst_itm_id                                                                        ")
			.where("                           ,a.item_idcd                                                                        ")
			.where("                           ,a.stock*i.unt_qty                                            as stock_qty       ")
			.where("                           ,decode(isnull(s.po_pri, 0), 0, i.po_pri, s.po_pri)*a.stock as stock_amt       ")
			.where("                       from itm_stock a                                                                     ")
			.where("                            left outer join itm_stor s                                                     ")
			.where("                              on s.stor_id = a.stor_id                                                     ")
			.where("                             and s.item_idcd = a.item_idcd                                                       ")
			.where("                            left outer join itm_mst i                                                      ")
			.where("                              on i.item_idcd = a.item_idcd                                                       ")
			.where("                      where a.stor_grp = :stor_grp                                                           ", arg.fixParameter("stor_grp"))
			.where("                        and a.stor_id = :stor_id                                                           ", arg.fixParameter("stor_id"))
			.where("                        and a.row_sts = :stock_state                                                       ", arg.getParameter("stock_state"))
			.where("                        and a.mst_itm_id = :item_idcd                                                             ", arg.fixParameter("item_idcd"))
			.where("                     ) a                                                                                     ")
			.where("               group by a.stor_id, a.mst_itm_id                                                                ")
			.where("              ) t                                                                                            ")
			.where("              left outer join                                                                                ")
			.where("              (                                                                                              ")
			.where("              select a.stor_id                                                                              ")
			.where("                    ,a.mst_itm_id as item_idcd                                                                    ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', a.stock*i.unt_qty, '2071302', a.stock*i.unt_qty, '2071303', a.stock*i.unt_qty, '2071304', a.stock*i.unt_qty, '2071305', a.stock*i.unt_qty, '2071306', a.stock*i.unt_qty, 0)) as tot_qty ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', -a.po_amount,       '2071302', a.po_amount,        '2071303', -a.po_amount,       '2071304', a.po_amount,        '2071305', a.po_amount,        '2071306', a.po_amount,        0)) as tot_amt ")
			.where("                from stock_ledger a                                                                          ")
			.where("                     left outer join itm_mst i                                                             ")
			.where("                       on i.item_idcd = a.item_idcd                                                              ")
			.where("               where a.row_sts = 0                                                                         ")
			.where("                 and a.stor_grp = :stor_grp                                                                  ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                  ", arg.fixParameter("stor_id"))
			.where("                 and a.inv_dt >= :fr_dt                                                                      ", arg.fixParameter("fr_dt"))
			.where("               group by a.stor_id, a.mst_itm_id                                                                ")
			.where("              ) l on l.stor_id = t.stor_id                                                                 ")
			.where("                 and l.item_idcd = t.item_idcd                                                                   ")
			.where("       union all                                                                                             ")
			.where("       select 2 as seq                                                                                       ")
			.where("             ,a.stor_id                                                                                     ")
			.where("             ,a.inv_dt                                                                                       ")
			.where("             ,a.inv_no                                                                                       ")
			.where("             ,a.inv_wk                                                                                       ")
			.where("             ,a.cust_id                                                                                      ")
			.where("             ,a.mst_itm_id as item_idcd                                                                           ")
			.where("             ,sum(decode(a.inv_wk, '2071302', a.stock*i.unt_qty,  '2071304', a.stock*i.unt_qty,  '2071305', a.stock*i.unt_qty,  0)) as in_qty  ")
			.where("             ,sum(decode(a.inv_wk, '2071302', a.po_amount,         '2071304', a.po_amount,         '2071305', a.po_amount,         0)) as in_amt  ")
			.where("             ,sum(decode(a.inv_wk, '2071301', -a.stock*i.unt_qty, '2071303', -a.stock*i.unt_qty, '2071306', -a.stock*i.unt_qty, 0)) as out_qty ")
			.where("             ,sum(decode(a.inv_wk, '2071301', a.po_amount,         '2071303', a.po_amount,         '2071306', -a.po_amount,        0)) as out_amt ")
			.where("             ,0 as trans_qty                                                                                 ")
			.where("             ,0 as trans_amt                                                                                 ")
			.where("         from stock_ledger a                                                                                 ")
			.where("              left outer join itm_mst i                                                                    ")
			.where("                on i.item_idcd = a.item_idcd                                                                     ")
			.where("        where a.row_sts = 0                                                                                ")
			.where("          and a.stor_grp = :stor_grp                                                                         ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id                                                                         ", arg.fixParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt                                                                        ", arg.fixParameter("fr_dt"))
			.where("                           and :to_dt                                                                        ", arg.fixParameter("to_dt"))
			.where("          and a.mst_itm_id = :item_idcd                                                                           ", arg.fixParameter("item_idcd"))
			.where("        group by a.stor_id, a.inv_dt, a.inv_no, a.inv_wk, a.cust_id, a.mst_itm_id                              ")
			.where("       ) a                                                                                                   ")
			.where("       left outer join store n                                                                               ")
			.where("         on n.stor_id = a.stor_id                                                                          ")
			.where("       left outer join itm_stor s                                                                          ")
			.where("         on s.stor_id = a.stor_id                                                                          ")
			.where("        and s.item_idcd = a.item_idcd                                                                            ")
			.where("       left outer join itm_mst i                                                                           ")
			.where("         on i.item_idcd = a.item_idcd                                                                            ")
			.where("       left outer join cust_mst c                                                                           ")
			.where("         on c.cust_id = a.cust_id                                                                            ")
			.where("       left outer join vend_mst v                                                                           ")
			.where("         on v.vend_id = a.cust_id                                                                            ")
			.where("       left outer join store r                                                                               ")
			.where("         on r.stor_id = a.cust_id                                                                           ")
			.where(" order by a.seq, a.inv_dt, a.inv_no                                                                          ")
		;
		
		return data.selectForMap();
	}

	/**
	 * 수불내역(단위)
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch4(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.in_qty)  as in_qty  ")
			.total("      ,sum(a.in_amt)  as in_amt  ")
			.total("      ,sum(a.out_qty) as out_qty ")
			.total("      ,sum(a.out_amt) as out_amt ")
		;
		data.param // 조회
			.query("select n.stor_nm                                                                                            ")
			.query("      ,a.inv_dt                                                                                              ")
			.query("      ,a.inv_no                                                                                              ")
			.query("      ,case                                                                                                  ")
			.query("         when a.inv_wk = '2071301' then c.cust_nm                                                            ")
			.query("         when a.inv_wk = '2071302' then v.vend_nm                                                            ")
			.query("         else r.stor_nm                                                                                     ")
			.query("       end cust_nm                                                                                           ")
			.query("      ,case                                                                                                  ")
			.query("         when a.inv_wk = '2071301' then '매출'                                                               ")
			.query("         when a.inv_wk = '2071302' then '입고'                                                               ")
			.query("         when a.inv_wk = '2071303' then '이동출고'                                                           ")
			.query("         when a.inv_wk = '2071304' then '이동입고'                                                           ")
			.query("         when a.inv_wk = '2071305' then '재고조정'                                                           ")
			.query("         when a.inv_wk = '2071306' then '기타출고'                                                           ")
			.query("       end wk_nm                                                                                             ")
			.query("      ,a.in_qty                                                                                              ")
			.query("      ,a.in_amt                                                                                              ")
			.query("      ,a.out_qty                                                                                             ")
			.query("      ,a.out_amt                                                                                             ")
			.query("      ,decode(s.po_pri, 0, i.po_pri, s.po_pri) as po_pri                                             ")
			.query("      ,a.trans_qty                                                                                           ")
			.query("      ,a.trans_amt                                                                                           ")
		;
		data.param // 조건
			.where("  from (                                                                                                     ")
			.where("       select 1          as seq                                                                              ")
			.where("             ,t.stor_id                                                                                     ")
			.where("             ,''         as inv_dt                                                                           ")
			.where("             ,'이월재고' as inv_no                                                                           ")
			.where("             ,''         as inv_wk                                                                           ")
			.where("             ,''         as cust_id                                                                          ")
			.where("             ,t.item_idcd                                                                                      ")
			.where("             ,null       as in_qty                                                                           ")
			.where("             ,0          as in_amt                                                                           ")
			.where("             ,0          as out_qty                                                                          ")
			.where("             ,0          as out_amt                                                                          ")
			.where("             ,t.stock_qty-isnull(l.tot_qty, 0) as trans_qty                                                     ")
			.where("             ,t.stock_amt-isnull(l.tot_amt, 0) as trans_amt                                                     ")
			.where("         from (                                                                                              ")
			.where("              select a.stor_id                                                                              ")
			.where("                    ,a.item_idcd                                                                               ")
			.where("                    ,a.stock                                                       as stock_qty              ")
			.where("                    ,decode(isnull(s.po_pri, 0), 0, i.po_pri, s.po_pri)*a.stock as stock_amt              ")
			.where("                from itm_stock a                                                                            ")
			.where("                     left outer join itm_stor s                                                            ")
			.where("                       on s.stor_id = a.stor_id                                                            ")
			.where("                      and s.item_idcd = a.item_idcd                                                              ")
			.where("                     left outer join itm_mst i                                                             ")
			.where("                       on i.item_idcd = a.item_idcd                                                              ")
			.where("               where a.stor_grp = :stor_grp                                                                  ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                  ", arg.fixParameter("stor_id"))
			.where("                 and a.row_sts = :stock_state                                                              ", arg.getParameter("stock_state"))
			.where("                 and a.item_idcd = :item_idcd                                                                    ", arg.fixParameter("item_idcd"))
			.where("              ) t                                                                                            ")
			.where("              left outer join                                                                                ")
			.where("              (                                                                                              ")
			.where("              select a.stor_id                                                                              ")
			.where("                    ,a.item_idcd                                                                               ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', a.stock,      '2071302', a.stock,     '2071303', a.stock,      '2071304', a.stock,     '2071305', a.stock,     '2071306', a.stock,     0)) as tot_qty ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', -a.po_amount, '2071302', a.po_amount, '2071303', -a.po_amount, '2071304', a.po_amount, '2071305', a.po_amount, '2071306', a.po_amount, 0)) as tot_amt ")
			.where("                from stock_ledger a                                                                          ")
			.where("               where a.row_sts = 0                                                                         ")
			.where("                 and a.stor_grp = :stor_grp                                                                  ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                  ", arg.fixParameter("stor_id"))
			.where("                 and a.inv_dt >= :fr_dt                                                                      ", arg.fixParameter("fr_dt"))
			.where("               group by a.stor_id, a.item_idcd                                                                ")
			.where("              ) l on l.stor_id = t.stor_id                                                                 ")
			.where("                 and l.item_idcd = t.item_idcd                                                                   ")
			.where("       union all                                                                                             ")
			.where("       select 2 as seq                                                                                       ")
			.where("             ,a.stor_id                                                                                     ")
			.where("             ,a.inv_dt                                                                                       ")
			.where("             ,a.inv_no                                                                                       ")
			.where("             ,a.inv_wk                                                                                       ")
			.where("             ,a.cust_id                                                                                      ")
			.where("             ,a.item_idcd                                                                                      ")
			.where("             ,sum(decode(a.inv_wk, '2071302', a.stock,     '2071304', a.stock,     '2071305', a.stock,      0)) as in_qty  ")
			.where("             ,sum(decode(a.inv_wk, '2071302', a.po_amount, '2071304', a.po_amount, '2071305', a.po_amount,  0)) as in_amt  ")
			.where("             ,sum(decode(a.inv_wk, '2071301', -a.stock,    '2071303', -a.stock,    '2071306', -a.stock,     0)) as out_qty ")
			.where("             ,sum(decode(a.inv_wk, '2071301', a.po_amount, '2071303', a.po_amount, '2071306', -a.po_amount, 0)) as out_amt ")
			.where("             ,0 as trans_qty                                                                                 ")
			.where("             ,0 as trans_amt                                                                                 ")
			.where("         from stock_ledger a                                                                                 ")
			.where("        where a.row_sts = 0                                                                                ")
			.where("          and a.stor_grp = :stor_grp                                                                         ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id                                                                         ", arg.fixParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt                                                                        ", arg.fixParameter("fr_dt"))
			.where("                           and :to_dt                                                                        ", arg.fixParameter("to_dt"))
			.where("          and a.item_idcd = :item_idcd                                                                           ", arg.fixParameter("item_idcd"))
			.where("        group by a.stor_id, a.inv_dt, a.inv_no, a.inv_wk, a.cust_id, a.item_idcd                              ")
			.where("       ) a                                                                                                   ")
			.where("       left outer join store n                                                                               ")
			.where("         on n.stor_id = a.stor_id                                                                          ")
			.where("       left outer join itm_stor s                                                                          ")
			.where("         on s.stor_id = a.stor_id                                                                          ")
			.where("        and s.item_idcd = a.item_idcd                                                                            ")
			.where("       left outer join itm_mst i                                                                           ")
			.where("         on i.item_idcd = a.item_idcd                                                                            ")
			.where("       left outer join cust_mst c                                                                           ")
			.where("         on c.cust_id = a.cust_id                                                                            ")
			.where("       left outer join vend_mst v                                                                           ")
			.where("         on v.vend_id = a.cust_id                                                                            ")
			.where("       left outer join store r                                                                               ")
			.where("         on r.stor_id = a.cust_id                                                                           ")
			.where(" order by a.seq, a.inv_dt, a.inv_no                                                                          ")
		;
		
		return data.selectForMap();
	}

	/**
	 * 재고자산평가
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch5(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(s.safe_qty)                                                                    as safe_qty         ")
			.total("      ,sum(a.stock_qty)                                                                   as stock            ")
			.total("      ,sum(decode(i.unt_qty, 0 , a.stock_qty, a.stock_qty/i.unt_qty))                   as bind_stock       ")
			.total("      ,sum(isnull(a.stock_qty, 0)-isnull(s.safe_qty, 0))                                        as lack_qty         ")
			.total("      ,sum(b.out_qty)                                                                     as out_qty          ")
			.total("      ,1                                                                                  as xxx1             ")
			.total("      ,1                                                                                  as xxx2             ")
			.total("      ,sum(decode(s.po_pri, 0, i.po_pri, s.po_pri)*(isnull(a.trans_qty, 0)+b.tot_qty)) as po_amt           ")
			.total("      ,sum(c.stad_sale_pri*(isnull(a.trans_qty, 0)+b.tot_qty))                                  as compare_sale_amt ")
		;
		data.param // 조회
			.query("select n.stor_nm                                                                                                              ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 2)) as class_nm1                                ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 4)) as class_nm2                                ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 6)) as class_nm3                                ")
			.query("      ,i.item_code                                                                                                               ")
			.query("      ,i.item_name                                                                                                               ")
			.query("      ,i.item_spec                                                                                                               ")
			.query("      ,u.unit_name                                                                                                               ")
			.query("      ,m.bas_nm as mfg_nm                                                                                                     ")
			.query("      ,v.vend_nm                                                                                                               ")
			.query("      ,i.item_sts                                                                                                              ")
			.query("      ,s.safe_qty                                                                                                              ")
			.query("      ,a.stock_qty                                                                                                             ")
			.query("      ,decode(i.unt_qty, 0 , a.stock_qty, a.stock_qty/i.unt_qty) as bind_stock                                               ")
			.query("      ,isnull(a.stock_qty, 0)-isnull(s.safe_qty, 0) as lack_qty                                                                      ")
			.query("      ,b.out_qty                                                                                                               ")
			.query("      ,'현재고'                                                                                                                ")
			.query("      ,'과부족'                                                                                                                ")
			.query("      ,decode(s.po_pri, 0, i.po_pri, s.po_pri)                                 as po_pri                               ")
			.query("      ,decode(s.po_pri, 0, i.po_pri, s.po_pri)*(isnull(a.trans_qty, 0)+b.tot_qty) as po_amt                                 ")
			.query("      ,s.stad_sale_pri                                 as common_sale_price                                                       ")
			.query("      ,c.stad_sale_pri                                 as compare_sale_price                                                      ")
			.query("      ,c.stad_sale_pri*(isnull(a.trans_qty, 0)+b.tot_qty) as compare_sale_amt                                                        ")
		;
		data.param // 조건
			.where("  from (                                                                                                                       ")
			.where("       select t.stor_id                                                                                                       ")
			.where("             ,t.item_idcd                                                                                                        ")
			.where("             ,t.stock_qty                                                                                                      ")
			.where("             ,t.stock_qty-isnull(l.tot_qty, 0) as trans_qty                                                                       ")
			.where("         from (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.item_idcd                                                                                                 ")
			.where("                    ,a.stock                                                       as stock_qty                                ")
			.where("                    ,decode(isnull(s.po_pri, 0), 0, i.po_pri, s.po_pri)*a.stock as stock_amt                                ")
			.where("                from itm_stock a                                                                                              ")
			.where("                     left outer join itm_stor s                                                                              ")
			.where("                       on s.stor_id = a.stor_id                                                                              ")
			.where("                      and s.item_idcd = a.item_idcd                                                                                ")
			.where("                     left outer join itm_mst i                                                                               ")
			.where("                       on i.item_idcd = a.item_idcd                                                                                ")
			.where("               where a.stor_grp = :stor_grp                                                                                    ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                                    ", arg.fixParameter("stor_id"))
			.where("                 and a.row_sts = :stock_state                                                                                ", arg.getParameter("stock_state"))
			.where("              ) t                                                                                                              ")
			.where("              left outer join                                                                                                  ")
			.where("              (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.item_idcd                                                                                                 ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', a.stock,      '2071302', a.stock,     '2071303', a.stock,      '2071304', a.stock,     '2071305', a.stock,     '2071306', a.stock,     0)) as tot_qty ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', -a.po_amount, '2071302', a.po_amount, '2071303', -a.po_amount, '2071304', a.po_amount, '2071305', a.po_amount, '2071306', a.po_amount, 0)) as tot_amt ")
			.where("                from stock_ledger a                                                                                            ")
			.where("               where a.row_sts = 0                                                                                           ")
			.where("                 and a.stor_grp = :stor_grp                                                                                    ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                                    ", arg.getParameter("stor_id"))
			.where("                 and a.inv_dt >= :fr_dt                                                                                        ", arg.fixParameter("fr_dt"))
			.where("               group by a.stor_id, a.item_idcd                                                                                  ")
			.where("              ) l on l.stor_id = t.stor_id                                                                                   ")
			.where("                 and l.item_idcd = t.item_idcd                                                                                     ")
			.where("       ) a                                                                                                                     ")
			.where("       left outer join                                                                                                         ")
			.where("       (                                                                                                                       ")
			.where("       select a.stor_id                                                                                                       ")
			.where("             ,a.item_idcd                                                                                                        ")
			.where("             ,sum(decode(a.inv_wk, '2071301', a.stock,      '2071302', a.stock,     '2071303', a.stock,      '2071304', a.stock,     '2071305', a.stock,     '2071306', a.stock,     0)) as tot_qty ")
			.where("             ,sum(decode(a.inv_wk, '2071301', -a.po_amount, '2071302', a.po_amount, '2071303', -a.po_amount, '2071304', a.po_amount, '2071305', a.po_amount, '2071306', a.po_amount, 0)) as tot_amt ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.stock      else 0 end), 0)) as in_qty                 ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.po_amount  else 0 end), 0)) as in_amt                 ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.stock     else 0 end), 0)) as inret_qty              ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.po_amount else 0 end), 0)) as inret_amt              ")
			.where("             ,sum(decode(a.inv_wk, '2071304', a.stock, 0))                                           as movein_qty             ")
			.where("             ,sum(decode(a.inv_wk, '2071304', a.po_amount, 0))                                       as movein_amt             ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then -a.stock     else 0 end), 0)) as out_qty                ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then a.po_amount  else 0 end), 0)) as out_amt                ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then a.stock      else 0 end), 0)) as outret_qty             ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then -a.po_amount else 0 end), 0)) as outret_amt             ")
			.where("             ,sum(decode(a.inv_wk, '2071303', -a.stock, 0))                                          as moveout_qty            ")
			.where("             ,sum(decode(a.inv_wk, '2071303', a.po_amount, 0))                                       as moveout_amt            ")
			.where("             ,sum(decode(a.inv_wk, '2071306', -a.stock, 0))                                          as etcout_qty             ")
			.where("             ,sum(decode(a.inv_wk, '2071306', -a.po_amount, 0))                                      as etcout_amt             ")
			.where("             ,sum(decode(a.inv_wk, '2071305', a.stock, 0))                                           as modi_qty               ")
			.where("             ,sum(decode(a.inv_wk, '2071305', a.po_amount, 0))                                       as modi_amt               ")
			.where("         from stock_ledger a                                                                                                   ")
			.where("        where a.row_sts = 0                                                                                                  ")
			.where("          and a.stor_grp = :stor_grp                                                                                           ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id                                                                                           ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt                                                                                          ", arg.fixParameter("fr_dt"))
			.where("                           and :to_dt                                                                                          ", arg.fixParameter("to_dt"))
			.where("        group by a.stor_id, a.item_idcd                                                                                         ")
			.where("       ) b on b.stor_id = a.stor_id                                                                                          ")
			.where("          and b.item_idcd = a.item_idcd                                                                                            ")
			.where("       left outer join store n                                                                                                 ")
			.where("         on n.stor_id = a.stor_id                                                                                            ")
			.where("       join itm_stor s                                                                                                       ")
			.where("         on s.stor_id = a.stor_id                                                                                            ")
			.where("        and s.item_idcd = a.item_idcd                                                                                              ")
			.where("       left outer join itm_mst i                                                                                             ")
			.where("         on i.item_idcd = a.item_idcd                                                                                              ")
			.where("       left outer join item_unit u                                                                                             ")
			.where("         on u.unit_idcd = i.unit_idcd                                                                                              ")
			.where("       left outer join base_mst m                                                                                             ")
			.where("         on m.bas_id = i.mfg_id                                                                                               ")
			.where("       left outer join vend_mst v                                                                                             ")
			.where("         on v.vend_id = i.vend_id                                                                                              ")
			.where("       left outer join itm_stor c                                                                                            ")
			.where("         on c.stor_id = '" + arg.getParamText("compare_stor_id") + "'                                                        ")
			.where("        and c.item_idcd = a.item_idcd                                                                                              ")
			.where(" where s.stor_id = :stor_id                                                                                                  ", arg.getParameter("stor_id"))
			.where("   and i.item_idcd = :item_idcd                                                                                                    ", arg.getParameter("item_idcd"))
			.where("   and i.item_name like %:search_item_nm%                                                                                        ", arg.getParameter("search_item_nm"))
			.where("   and i.item_sts = :item_sts                                                                                                  ", arg.getParameter("item_sts"))
			.where("   and i.vend_id = :vend_id                                                                                                    ", arg.getParameter("vend_id"))
			.where("   and i.class_id in ( select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id ) ", arg.getParameter("class_id"))
			.where("   and i.mfg_id = :mfg_id                                                                                                      ", arg.getParameter("mfg_id"))
			.where("   and i.brand_id = :brand_id                                                                                                  ", arg.getParameter("brand_id"))
		;
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("   and s.row_sts = 0                                                                                                         ")
			;
		}
		if ("true".equals(arg.getParamText("has_stock_yn"))) {
			data.param
			.where("   and (                                                                                                                       ")
			.where("          ( isnull(b.in_qty, 0) <> 0 or isnull(b.inret_qty, 0) <> 0 or isnull(b.movein_qty, 0) <> 0 or isnull(b.out_qty, 0) <> 0 or isnull(b.outret_qty, 0) <> 0 or isnull(b.moveout_qty, 0) <> 0 or isnull(b.etcout_qty, 0) <> 0 or isnull(b.modi_qty, 0) <> 0 ) ") // 조회기간 실적 있는 경우 포함
			.where("       or ( a.trans_qty <> 0 )                                                                                                 ") // 이월 있는 경우 포함
			.where("       or ( a.stock_qty-a.trans_qty-isnull(b.tot_qty, 0) <> 0 )                                                                   ") // 조회기간이후 재고 증감 있는 경우 포함
			.where("       or ( a.stock_qty <> 0 )                                                                                                 ") // 재고 있는 경우 포함
			.where("       )                                                                                                                       ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("   and s.sale_epo = '1'                                                                                                        ")
			;
		}
		data.param
			.where(" order by n.stor_id, i.item_code                                                                                                ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}
}
