package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class OrderBrandRptService  extends DefaultServiceHandler {


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
			.total("      ,sum(a.sum_qty)      as sum_qty      ")
			.total("      ,sum(a.sum_tax_free) as sum_tax_free ")
			.total("      ,sum(a.sum_subtotal) as sum_subtotal ")
			.total("      ,sum(a.sum_tax)      as sum_tax      ")
			.total("      ,sum(a.sum_amount)   as sum_amount   ")
		;
        data.param
	        .query("select a.brand_cd                                                                                                             ")
	        .query("      ,a.brand_nm                                                                                                             ")
	        .query("      ,a.sum_qty                                                                                                              ")
	        .query("      ,decode(sum(a.sum_qty) over (partition by a.stor_grp), 0, 0                                                             ")
	        .query("        ,round(abs(a.sum_qty)/sum(abs(a.sum_qty)) over (partition by a.stor_grp), 3)*100)                 as rate_qty         ")
	        .query("      ,a.sum_unit_amount                                                                                                      ")
	        .query("      ,decode(sum(a.sum_unit_amount) over (partition by a.stor_grp), 0, 0                                                     ")
	        .query("        ,round(abs(a.sum_unit_amount)/sum(abs(a.sum_unit_amount)) over (partition by a.stor_grp), 3)*100) as rate_unit_amount ")
	        .query("      ,a.sum_tax_free                                                                                                         ")
	        .query("      ,a.sum_subtotal                                                                                                         ")
	        .query("      ,a.sum_tax                                                                                                              ")
	        .query("      ,a.sum_amount                                                                                                           ")
	        .query("      ,decode(sum(a.sum_amount) over (partition by a.stor_grp), 0, 0                                                          ")
	        .query("        ,round(abs(a.sum_amount)/sum(abs(a.sum_amount)) over (partition by a.stor_grp), 3)*100)           as rate_amount      ")
	    ;
	    data.param
	        .where("  from (                                                                                                                      ")
	        .where("       select a.stor_grp                                                                                                      ")
	        .where("             ,m.bas_cd               as brand_cd                                                                             ")
	        .where("             ,m.bas_nm               as brand_nm                                                                             ")
	        .where("             ,sum(b.qty)              as sum_qty                                                                              ")
	        .where("             ,sum(b.unit_price*b.qty) as sum_unit_amount                                                                      ")
	        .where("             ,sum(b.tax_free)         as sum_tax_free                                                                         ")
	        .where("             ,sum(b.sply_amt)         as sum_subtotal                                                                         ")
	        .where("             ,sum(b.tax)              as sum_tax                                                                              ")
	        .where("             ,sum(b.amount)           as sum_amount                                                                           ")
	        .where("         from order_mst a                                                                                                    ")
	        .where("              join order_item b                                                                                               ")
	        .where("                on b.inv_no = a.inv_no                                                                                        ")
	        .where("              left outer join itm_mst i                                                                                     ")
	        .where("                on i.item_idcd = b.item_idcd                                                                                      ")
	        .where("              left outer join base_mst m                                                                                     ")
	        .where("                on m.bas_id = i.brand_id                                                                                     ")
	        .where("        where a.sts_cd > '0100'     	                                                                                      ")
			.where("          and a.row_sts = 0 				                                                                                  ")
//			.where("          and a.inv_work_id in ('1', '2', '3', '4')                                                                           ")
			.where("          and a.stor_grp = :stor_grp                                                                                          ", arg.fixParameter("stor_grp"))
	        .where("          and a.stor_id = :stor_id                                                                                          ", arg.getParameter("stor_id"))
	        .where("          and a.inv_dt between :fr_dt                                                                                         ", fr_dt, "1".equals(inv_po_term))		// 배송예정 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "1".equals(inv_po_term))		// 배송예정 종료일자 
	        .where("          and a.ori_dt between :fr_dt                                                                                         ", fr_dt, "2".equals(inv_po_term))		// 주문 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "2".equals(inv_po_term))		// 주문 종료일자 
	        .where("          and i.brand_id = :brand_id                                                                                          ", arg.getParameter("brand_id"))
	        .where("          and a.cust_id = :cust_id                                                                                            ", arg.getParameter("cust_id"))
	        .where("          and a.salesman_id = :salesman_id                                                                                    ", arg.getParameter("salesman_id"))
	        .where("          and a.ret_yn = :ret_yn                                                                                              ", arg.getParameter("ret_yn"))			// 반품 여부
	        .where("          and a.inv_work_id in (:inv_work_id)                                                                                 ", inv_work_id, (inv_work_id.length>0))	// 주문 위치
	        .where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                                                             ")
	        .where("       ) a                                                                                                                    ")
	        .where(" order by a.brand_cd                                                                                                          ")
	    ;
		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	
	/**
	 * 시간대별
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getTime(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
				
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
			.total("       , sum(a.sum_amount) as sum_amount,   sum(a.inv_tm_00) as inv_tm_00  " )
			.total("       , sum(a.inv_tm_01) as inv_tm_01,     sum(a.inv_tm_02) as inv_tm_02  " )
			.total("       , sum(a.inv_tm_03) as inv_tm_03,     sum(a.inv_tm_04) as inv_tm_04  " )
			.total("       , sum(a.inv_tm_05) as inv_tm_05,     sum(a.inv_tm_06) as inv_tm_06  " )
			.total("       , sum(a.inv_tm_07) as inv_tm_07,     sum(a.inv_tm_08) as inv_tm_08  " )
			.total("       , sum(a.inv_tm_09) as inv_tm_09,     sum(a.inv_tm_10) as inv_tm_10  " )
			.total("       , sum(a.inv_tm_11) as inv_tm_11,     sum(a.inv_tm_12) as inv_tm_12  " )
			.total("       , sum(a.inv_tm_13) as inv_tm_13,     sum(a.inv_tm_14) as inv_tm_14  " )
			.total("       , sum(a.inv_tm_15) as inv_tm_15,     sum(a.inv_tm_16) as inv_tm_16  " )
			.total("       , sum(a.inv_tm_17) as inv_tm_17,     sum(a.inv_tm_18) as inv_tm_18  " )
			.total("       , sum(a.inv_tm_19) as inv_tm_19,     sum(a.inv_tm_20) as inv_tm_20  " )
			.total("       , sum(a.inv_tm_21) as inv_tm_21,     sum(a.inv_tm_22) as inv_tm_22  " )
			.total("       , sum(a.inv_tm_23) as inv_tm_23                                     " )
		;
        data.param
	        .query("select a.*                                                                                                                    ")
	    ;
	    data.param
	        .where("  from (                                                                                                                      ")
	        .where("       select a.stor_grp                                                                                                      ")
	        .where("             ,m.bas_cd               as brand_cd                                                                             ")
	        .where("             ,m.bas_nm               as brand_nm                                                                             ")
			.where("             ,sum(b.amount)                                          as sum_amount                                            ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '00', b.amount, 0)) as inv_tm_00                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '01', b.amount, 0)) as inv_tm_01                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '02', b.amount, 0)) as inv_tm_02                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '03', b.amount, 0)) as inv_tm_03                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '04', b.amount, 0)) as inv_tm_04                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '05', b.amount, 0)) as inv_tm_05                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '06', b.amount, 0)) as inv_tm_06                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '07', b.amount, 0)) as inv_tm_07                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '08', b.amount, 0)) as inv_tm_08                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '09', b.amount, 0)) as inv_tm_09                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '10', b.amount, 0)) as inv_tm_10                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '11', b.amount, 0)) as inv_tm_11                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '12', b.amount, 0)) as inv_tm_12                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '13', b.amount, 0)) as inv_tm_13                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '14', b.amount, 0)) as inv_tm_14                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '15', b.amount, 0)) as inv_tm_15                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '16', b.amount, 0)) as inv_tm_16                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '17', b.amount, 0)) as inv_tm_17                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '18', b.amount, 0)) as inv_tm_18                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '19', b.amount, 0)) as inv_tm_19                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '20', b.amount, 0)) as inv_tm_20                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '21', b.amount, 0)) as inv_tm_21                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '22', b.amount, 0)) as inv_tm_22                                             ")
			.where("             ,sum(decode(substr(a.inv_tm, 1, 2), '23', b.amount, 0)) as inv_tm_23                                             ")
	        .where("         from order_mst a                                                                                                    ")
	        .where("              join order_item b                                                                                               ")
	        .where("                on b.inv_no = a.inv_no                                                                                        ")
	        .where("              left outer join itm_mst i                                                                                     ")
	        .where("                on i.item_idcd = b.item_idcd                                                                                      ")
	        .where("              left outer join base_mst m                                                                                     ")
	        .where("                on m.bas_id = i.brand_id                                                                                     ")
	        .where("        where a.sts_cd > '0100'     	                                                                                      ")
			.where("          and a.row_sts = 0 				                                                                                  ")
//			.where("          and a.inv_work_id in ('1', '2', '3', '4')                                                                           ")
			.where("          and a.stor_grp = :stor_grp                                                                                          ", arg.fixParameter("stor_grp"))
	        .where("          and a.stor_id = :stor_id                                                                                          ", arg.getParameter("stor_id"))
	        .where("          and a.inv_dt between :fr_dt                                                                                         ", fr_dt, "1".equals(inv_po_term))		// 배송예정 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "1".equals(inv_po_term))		// 배송예정 종료일자 
	        .where("          and a.ori_dt between :fr_dt                                                                                         ", fr_dt, "2".equals(inv_po_term))		// 주문 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "2".equals(inv_po_term))		// 주문 종료일자 
	        .where("          and i.brand_id = :brand_id                                                                                          ", arg.getParameter("brand_id"))
	        .where("          and a.cust_id = :cust_id                                                                                            ", arg.getParameter("cust_id"))
	        .where("          and a.salesman_id = :salesman_id                                                                                    ", arg.getParameter("salesman_id"))
	        .where("          and a.ret_yn = :ret_yn                                                                                              ", arg.getParameter("ret_yn"))			// 반품 여부
	        .where("          and a.inv_work_id in (:inv_work_id)                                                                                 ", inv_work_id, (inv_work_id.length>0))	// 주문 위치
	        .where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                                                             ")
	        .where("       ) a                                                                                                                    ")
	        .where(" order by a.brand_cd                                                                                                          ")
	    ;
		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}	
	
	/**
	 * 요일별
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getWeek(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
			.total("       , sum(a.sum_amount) as sum_amount                            "  )
			.total("       , sum(a.week_sun) as week_sun,   sum(a.week_mon) as week_mon "  )
			.total("       , sum(a.week_tue) as week_tue,   sum(a.week_wed) as week_wed "  )
			.total("       , sum(a.week_thu) as week_thu,   sum(a.week_fri) as week_fri "  )
			.total("       , sum(a.week_sat) as week_sat                                "  )
		;
        data.param
	        .query("select a.*                                                                                                                    ")
	    ;
	    data.param
	        .where("  from (                                                                                                                      ")
	        .where("       select a.stor_grp                                                                                                      ")
	        .where("             ,m.bas_cd               as brand_cd                                                                             ")
	        .where("             ,m.bas_nm               as brand_nm                                                                             ")
			.where("             ,sum(b.amount)                                                              as sum_amount                        ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '1', b.amount, 0)) as week_sun                          ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '2', b.amount, 0)) as week_mon                          ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '3', b.amount, 0)) as week_tue                          ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '4', b.amount, 0)) as week_wed                          ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '5', b.amount, 0)) as week_thu                          ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '6', b.amount, 0)) as week_fri                          ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '7', b.amount, 0)) as week_sat                          ")
	        .where("         from order_mst a                                                                                                    ")
	        .where("              join order_item b                                                                                               ")
	        .where("                on b.inv_no = a.inv_no                                                                                        ")
	        .where("              left outer join itm_mst i                                                                                     ")
	        .where("                on i.item_idcd = b.item_idcd                                                                                      ")
	        .where("              left outer join base_mst m                                                                                     ")
	        .where("                on m.bas_id = i.brand_id                                                                                     ")
	        .where("        where a.sts_cd > '0100'     	                                                                                      ")
			.where("          and a.row_sts = 0 				                                                                                  ")
//			.where("          and a.inv_work_id in ('1', '2', '3', '4')                                                                           ")
			.where("          and a.stor_grp = :stor_grp                                                                                          ", arg.fixParameter("stor_grp"))
	        .where("          and a.stor_id = :stor_id                                                                                          ", arg.getParameter("stor_id"))
	        .where("          and a.inv_dt between :fr_dt                                                                                         ", fr_dt, "1".equals(inv_po_term))		// 배송예정 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "1".equals(inv_po_term))		// 배송예정 종료일자 
	        .where("          and a.ori_dt between :fr_dt                                                                                         ", fr_dt, "2".equals(inv_po_term))		// 주문 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "2".equals(inv_po_term))		// 주문 종료일자 
	        .where("          and i.brand_id = :brand_id                                                                                          ", arg.getParameter("brand_id"))
	        .where("          and a.cust_id = :cust_id                                                                                            ", arg.getParameter("cust_id"))
	        .where("          and a.salesman_id = :salesman_id                                                                                    ", arg.getParameter("salesman_id"))
	        .where("          and a.ret_yn = :ret_yn                                                                                              ", arg.getParameter("ret_yn"))			// 반품 여부
	        .where("          and a.inv_work_id in (:inv_work_id)                                                                                 ", inv_work_id, (inv_work_id.length>0))	// 주문 위치
	        .where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                                                             ")
	        .where("       ) a                                                                                                                    ")
	        .where(" order by a.brand_cd                                                                                                          ")
	    ;
	    
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}	
	
	/**
	 * 일자별
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDay(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
			.total("       , sum(a.sum_amount) as sum_amount                                ")
			.total("       , sum(a.date01) as date01,    sum(a.date02) as date02            ")
			.total("       , sum(a.date02) as date02,    sum(a.date03) as date03            ")
			.total("       , sum(a.date04) as date04,    sum(a.date05) as date05            ")
			.total("       , sum(a.date06) as date06,    sum(a.date07) as date07            ")
			.total("       , sum(a.date08) as date08,    sum(a.date09) as date09            ")
			.total("       , sum(a.date10) as date10                                        ")
			.total("       , sum(a.date11) as date11,    sum(a.date12) as date12            ")
			.total("       , sum(a.date12) as date12,    sum(a.date13) as date13            ")
			.total("       , sum(a.date14) as date14,    sum(a.date15) as date15            ")
			.total("       , sum(a.date16) as date16,    sum(a.date17) as date17            ")
			.total("       , sum(a.date18) as date18,    sum(a.date19) as date19            ")
			.total("       , sum(a.date20) as date20                                        ")
			.total("       , sum(a.date21) as date21,    sum(a.date22) as date22            ")
			.total("       , sum(a.date22) as date22,    sum(a.date23) as date23            ")
			.total("       , sum(a.date24) as date24,    sum(a.date25) as date25            ")
			.total("       , sum(a.date26) as date26,    sum(a.date27) as date27            ")
			.total("       , sum(a.date28) as date28,    sum(a.date29) as date29            ")
			.total("       , sum(a.date30) as date30,    sum(a.date31) as date31            ")
		;
        data.param
	        .query("select a.*                                                                                                                    ")
	    ;
	    data.param
	        .where("  from (                                                                                                                      ")
	        .where("       select a.stor_grp                                                                                                      ")
	        .where("             ,m.bas_cd               as brand_cd                                                                             ")
	        .where("             ,m.bas_nm               as brand_nm                                                                             ")
			.where("             ,sum(b.amount)                                          as sum_amount                                            ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '01', b.amount, 0)) as date01                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '02', b.amount, 0)) as date02                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '03', b.amount, 0)) as date03                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '04', b.amount, 0)) as date04                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '05', b.amount, 0)) as date05                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '06', b.amount, 0)) as date06                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '07', b.amount, 0)) as date07                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '08', b.amount, 0)) as date08                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '09', b.amount, 0)) as date09                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '10', b.amount, 0)) as date10                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '11', b.amount, 0)) as date11                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '12', b.amount, 0)) as date12                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '13', b.amount, 0)) as date13                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '14', b.amount, 0)) as date14                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '15', b.amount, 0)) as date15                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '16', b.amount, 0)) as date16                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '17', b.amount, 0)) as date17                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '18', b.amount, 0)) as date18                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '19', b.amount, 0)) as date19                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '20', b.amount, 0)) as date20                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '21', b.amount, 0)) as date21                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '22', b.amount, 0)) as date22                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '23', b.amount, 0)) as date23                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '24', b.amount, 0)) as date24                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '25', b.amount, 0)) as date25                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '26', b.amount, 0)) as date26                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '27', b.amount, 0)) as date27                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '28', b.amount, 0)) as date28                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '29', b.amount, 0)) as date29                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '30', b.amount, 0)) as date30                                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '31', b.amount, 0)) as date31                                                ")
	        .where("         from order_mst a                                                                                                    ")
	        .where("              join order_item b                                                                                               ")
	        .where("                on b.inv_no = a.inv_no                                                                                        ")
	        .where("              left outer join itm_mst i                                                                                     ")
	        .where("                on i.item_idcd = b.item_idcd                                                                                      ")
	        .where("              left outer join base_mst m                                                                                     ")
	        .where("                on m.bas_id = i.brand_id                                                                                     ")
	        .where("        where a.sts_cd > '0100'     	                                                                                      ")
			.where("          and a.row_sts = 0 				                                                                                  ")
//			.where("          and a.inv_work_id in ('1', '2', '3', '4')                                                                           ")
			.where("          and a.stor_grp = :stor_grp                                                                                          ", arg.fixParameter("stor_grp"))
	        .where("          and a.stor_id = :stor_id                                                                                          ", arg.getParameter("stor_id"))
	        .where("          and a.inv_dt between :fr_dt                                                                                         ", fr_dt, "1".equals(inv_po_term))		// 배송예정 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "1".equals(inv_po_term))		// 배송예정 종료일자 
	        .where("          and a.ori_dt between :fr_dt                                                                                         ", fr_dt, "2".equals(inv_po_term))		// 주문 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "2".equals(inv_po_term))		// 주문 종료일자 
	        .where("          and i.brand_id = :brand_id                                                                                          ", arg.getParameter("brand_id"))
	        .where("          and a.cust_id = :cust_id                                                                                            ", arg.getParameter("cust_id"))
	        .where("          and a.salesman_id = :salesman_id                                                                                    ", arg.getParameter("salesman_id"))
	        .where("          and a.ret_yn = :ret_yn                                                                                              ", arg.getParameter("ret_yn"))			// 반품 여부
	        .where("          and a.inv_work_id in (:inv_work_id)                                                                                 ", inv_work_id, (inv_work_id.length>0))	// 주문 위치
	        .where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                                                             ")
	        .where("       ) a                                                                                                                    ")
	        .where(" order by a.brand_cd                                                                                                          ")
	    ;
		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}		
	
	/**
	 * 월별
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getMonth(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
			.total("select ,sum(a.sum_amount) as sum_amount                           " )
			.total("       ,sum(a.month01) as month01,     sum(a.month02) as month02  " )
			.total("       ,sum(a.month03) as month03,     sum(a.month04) as month04  " )
			.total("       ,sum(a.month05) as month05,     sum(a.month06) as month06  " )
			.total("       ,sum(a.month07) as month07,     sum(a.month08) as month08  " )
			.total("       ,sum(a.month09) as month09,     sum(a.month10) as month10  " )
			.total("       ,sum(a.month11) as month11,     sum(a.month12) as month12  " )
		;
        data.param
	        .query("select a.*                                                                                                                    ")
	    ;
	    data.param
	        .where("  from (                                                                                                                      ")
	        .where("       select a.stor_grp                                                                                                      ")
	        .where("             ,m.bas_cd               as brand_cd                                                                             ")
	        .where("             ,m.bas_nm               as brand_nm                                                                             ")
			.where("             ,sum(b.amount)                                          as sum_amount                                            ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '01', b.amount, 0)) as month01                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '02', b.amount, 0)) as month02                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '03', b.amount, 0)) as month03                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '04', b.amount, 0)) as month04                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '05', b.amount, 0)) as month05                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '06', b.amount, 0)) as month06                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '07', b.amount, 0)) as month07                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '08', b.amount, 0)) as month08                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '09', b.amount, 0)) as month09                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '10', b.amount, 0)) as month10                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '11', b.amount, 0)) as month11                                               ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '12', b.amount, 0)) as month12                                               ")
	        .where("         from order_mst a                                                                                                    ")
	        .where("              join order_item b                                                                                               ")
	        .where("                on b.inv_no = a.inv_no                                                                                        ")
	        .where("              left outer join itm_mst i                                                                                     ")
	        .where("                on i.item_idcd = b.item_idcd                                                                                      ")
	        .where("              left outer join base_mst m                                                                                     ")
	        .where("                on m.bas_id = i.brand_id                                                                                     ")
	        .where("        where a.sts_cd > '0100'     	                                                                                      ")
			.where("          and a.row_sts = 0 				                                                                                  ")
//			.where("          and a.inv_work_id in ('1', '2', '3', '4')                                                                           ")
			.where("          and a.stor_grp = :stor_grp                                                                                          ", arg.fixParameter("stor_grp"))
	        .where("          and a.stor_id = :stor_id                                                                                          ", arg.getParameter("stor_id"))
	        .where("          and a.inv_dt between :fr_dt                                                                                         ", fr_dt, "1".equals(inv_po_term))		// 배송예정 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "1".equals(inv_po_term))		// 배송예정 종료일자 
	        .where("          and a.ori_dt between :fr_dt                                                                                         ", fr_dt, "2".equals(inv_po_term))		// 주문 시작일자 
	        .where("                           and :to_dt                                                                                         ", to_dt, "2".equals(inv_po_term))		// 주문 종료일자 
	        .where("          and i.brand_id = :brand_id                                                                                          ", arg.getParameter("brand_id"))
	        .where("          and a.cust_id = :cust_id                                                                                            ", arg.getParameter("cust_id"))
	        .where("          and a.salesman_id = :salesman_id                                                                                    ", arg.getParameter("salesman_id"))
	        .where("          and a.ret_yn = :ret_yn                                                                                              ", arg.getParameter("ret_yn"))			// 반품 여부
	        .where("          and a.inv_work_id in (:inv_work_id)                                                                                 ", inv_work_id, (inv_work_id.length>0))	// 주문 위치
	        .where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                                                             ")
	        .where("       ) a                                                                                                                    ")
	        .where(" order by a.brand_cd                                                                                                          ")
	    ;
		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}			
}
