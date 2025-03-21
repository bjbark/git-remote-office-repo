package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class MoveRecvItemRptService  extends DefaultServiceHandler {

	/**
	 * 현황
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.sum_tax_free)    as sum_tax_free    ")
			.total("      ,sum(a.sum_taxation)    as sum_taxation    ")
			.total("      ,sum(a.sum_tax)         as sum_tax         ")
			.total("      ,sum(a.sum_amount)      as sum_amount      ")
			.total("      ,sum(a.sum_unit_amount) as sum_unit_amount ")
		;
		data.param // 조회
			.query("select a.item_code                                  ")
			.query("      ,a.item_name                                  ")
			.query("      ,a.item_spec                                  ")
			.query("      ,c.unit_name                                  ")
			.query("      ,b.stor_nm                                 ")
			.query("      ,d.stor_nm as move_nm                      ")
			.query("      ,a.sum_tax_free                            ")
			.query("      ,a.sum_taxation                            ")
			.query("      ,a.sum_tax                                 ")
			.query("      ,a.sum_amount                              ")
			.query("      ,decode(sum(a.sum_amount) over (partition by a.stor_grp), 0, 0                                                          ")
			.query("        ,round(abs(a.sum_amount)/sum(abs(a.sum_amount)) over (partition by a.stor_grp), 3)*100)  as rate_amount      ")
			.query("      ,a.sum_unit_amount                                                                                                      ")
			.query("      ,decode(sum(a.sum_unit_amount) over (partition by a.stor_grp), 0, 0                                                     ")
			.query("        ,round(abs(a.sum_unit_amount)/sum(abs(a.sum_unit_amount)) over (partition by a.stor_grp), 3)*100) as rate_unit_amount ")
		;
		data.param // 조건
			.where("  from (                                                                                        ")
			.where("       select a.stor_grp                                                                        ")
			.where("             ,a.stor_id                                                                         ")
			.where("             ,a.move_id                                                                         ")
			.where("             ,b.item_idcd                                                                          ")
			.where("             ,b.item_code                                                                          ")
			.where("             ,b.item_name                                                                          ")
			.where("             ,b.item_spec                                                                          ")
			.where("             ,b.unit_idcd                                                                          ")
			.where("             ,sum(b.tax_free)         as sum_tax_free                                           ")
			.where("             ,sum(b.taxation)         as sum_taxation                                           ")
			.where("             ,sum(b.tax)              as sum_tax                                                ")
			.where("             ,sum(b.amount)           as sum_amount                                             ")
			.where("             ,sum(b.unit_price*b.qty) as sum_unit_amount                                        ")
			.where("         from move_ist_mst a                                                                    ")
			.where("              join move_ist_dtl b                                                               ")
			.where("                on b.inv_no = a.inv_no                                                          ")
			.where("        where a.stor_grp = :stor_grp   	", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id   	", arg.getParameter("stor_id"))
			.where("          and a.move_id = :move_id   	", arg.getParameter("move_id"))
			.where("          and a.inv_dt between :fr_dt   ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0 				                                                    ")
			.where("        group by a.stor_grp, a.stor_id, a.move_id, b.item_idcd, b.item_code, b.item_name, b.item_spec, b.unit_idcd")
			.where("       ) a                                                                                      ")
			.where("       left outer join stor b       on b.stor_id = a.stor_id                                    ")
			.where("       left outer join item_unit c  on c.unit_idcd = a.unit_idcd                                      ")
			.where("       left outer join stor d       on d.stor_id = a.move_id                                    ")
			.where(" order by a.item_code, a.item_name, a.item_spec, b.stor_nm, d.stor_nm                                    ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
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
	public SqlResultMap getWeek(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("       , sum(a.sum_qty)    as sum_qty    ")
			.total("       , sum(a.sum_amount) as sum_amount ")
			.total("       , sum(a.week_qty_sun) as week_qty_sun, sum(a.week_qty_mon) as week_qty_mon ")
			.total("       , sum(a.week_qty_tue) as week_qty_tue, sum(a.week_qty_wed) as week_qty_wed ")
			.total("       , sum(a.week_qty_thu) as week_qty_thu, sum(a.week_qty_fri) as week_qty_fri ")
			.total("       , sum(a.week_qty_sat) as week_qty_sat                                      ")
			.total("       , sum(a.week_amount_sun) as week_amount_sun, sum(a.week_amount_mon) as week_amount_mon ")
			.total("       , sum(a.week_amount_tue) as week_amount_tue, sum(a.week_amount_wed) as week_amount_wed ")
			.total("       , sum(a.week_amount_thu) as week_amount_thu, sum(a.week_amount_fri) as week_amount_fri ")
			.total("       , sum(a.week_amount_sat) as week_amount_sat                                            ")
		;
		data.param // 조회
			.query("select a.*                                                                                                 ")
			.query("      ,c.unit_name                                                                                            ")
			.query("      ,b.stor_nm                                                                                           ")
			.query("      ,d.stor_nm as move_nm                                                                                ")
		;
		data.param // 조건
			.where("  from (                                                                                                    ")
			.where("       select a.stor_grp                                                                                    ")
			.where("             ,a.stor_id                                                                                     ")
			.where("             ,a.move_id                                                                                     ")
			.where("             ,b.item_idcd                                                                                      ")
			.where("             ,b.item_code                                                                                      ")
			.where("             ,b.item_name                                                                                      ")
			.where("             ,b.item_spec                                                                                      ")
			.where("             ,b.unit_idcd                                                                                      ")
			.where("             ,sum(b.qty)                                                                 as sum_qty         ")
			.where("             ,sum(b.amount)                                                              as sum_amount      ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '1', b.qty, 0))    as week_qty_sun    ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '2', b.qty, 0))    as week_qty_mon    ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '3', b.qty, 0))    as week_qty_tue    ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '4', b.qty, 0))    as week_qty_wed    ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '5', b.qty, 0))    as week_qty_thu    ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '6', b.qty, 0))    as week_qty_fri    ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '7', b.qty, 0))    as week_qty_sat    ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '1', b.amount, 0)) as week_amount_sun ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '2', b.amount, 0)) as week_amount_mon ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '3', b.amount, 0)) as week_amount_tue ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '4', b.amount, 0)) as week_amount_wed ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '5', b.amount, 0)) as week_amount_thu ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '6', b.amount, 0)) as week_amount_fri ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '7', b.amount, 0)) as week_amount_sat ")
			.where("         from move_ist_mst a                                                                                ")
			.where("              join move_ist_dtl b                                                                           ")
			.where("                on b.inv_no = a.inv_no                                                                      ")
			.where("        where a.stor_grp = :stor_grp   	", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id   	", arg.getParameter("stor_id"))
			.where("          and a.move_id = :move_id   	", arg.getParameter("move_id"))
			.where("          and a.inv_dt between :fr_dt   ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0 				                                                                 ")
			.where("        group by a.stor_grp, a.stor_id, a.move_id, b.item_idcd, b.item_code, b.item_name, b.item_spec, b.unit_idcd          ")
			.where("       ) a                                                                                                   ")
			.where("       left outer join stor b                                                                                ")
			.where("         on b.stor_id = a.stor_id                                                                            ")
			.where("       left outer join item_unit c                                                                           ")
			.where("         on c.unit_idcd = a.unit_idcd                                                                              ")
			.where("       left outer join stor d                                                                                ")
			.where("         on d.stor_id = a.move_id                                                                            ")
			.where(" order by a.item_code, a.item_name, a.item_spec, b.stor_nm, d.stor_nm                                                 ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
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
	public SqlResultMap getDay(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("       , sum(a.sum_qty)        as sum_qty                                                 ")
			.total("       , sum(a.sum_amount)     as sum_amount                                              ")
			.total("       , sum(a.date_qty_01)    as date_qty_01,    sum(a.date_qty_02)    as date_qty_02    ")
			.total("       , sum(a.date_qty_03)    as date_qty_03,    sum(a.date_qty_04)    as date_qty_04    ")
			.total("       , sum(a.date_qty_05)    as date_qty_05,    sum(a.date_qty_06)    as date_qty_06    ")
			.total("       , sum(a.date_qty_07)    as date_qty_07,    sum(a.date_qty_08)    as date_qty_08    ")
			.total("       , sum(a.date_qty_09)    as date_qty_09,    sum(a.date_qty_10)    as date_qty_10    ")
			.total("       , sum(a.date_qty_11)    as date_qty_11,    sum(a.date_qty_12)    as date_qty_12    ")
			.total("       , sum(a.date_qty_13)    as date_qty_13,    sum(a.date_qty_14)    as date_qty_14    ")
			.total("       , sum(a.date_qty_15)    as date_qty_15,    sum(a.date_qty_16)    as date_qty_16    ")
			.total("       , sum(a.date_qty_17)    as date_qty_17,    sum(a.date_qty_18)    as date_qty_18    ")
			.total("       , sum(a.date_qty_19)    as date_qty_19,    sum(a.date_qty_20)    as date_qty_20    ")
			.total("       , sum(a.date_qty_21)    as date_qty_21,    sum(a.date_qty_22)    as date_qty_22    ")
			.total("       , sum(a.date_qty_23)    as date_qty_23,    sum(a.date_qty_24)    as date_qty_24    ")
			.total("       , sum(a.date_qty_25)    as date_qty_25,    sum(a.date_qty_26)    as date_qty_26    ")
			.total("       , sum(a.date_qty_27)    as date_qty_27,    sum(a.date_qty_28)    as date_qty_28    ")
			.total("       , sum(a.date_qty_29)    as date_qty_29,    sum(a.date_qty_30)    as date_qty_30    ")
			.total("       , sum(a.date_qty_31)    as date_qty_31                                             ")
			.total("       , sum(a.date_amount_01) as date_amount_01, sum(a.date_amount_02) as date_amount_02 ")
			.total("       , sum(a.date_amount_03) as date_amount_03, sum(a.date_amount_04) as date_amount_04 ")
			.total("       , sum(a.date_amount_05) as date_amount_05, sum(a.date_amount_06) as date_amount_06 ")
			.total("       , sum(a.date_amount_07) as date_amount_07, sum(a.date_amount_08) as date_amount_08 ")
			.total("       , sum(a.date_amount_09) as date_amount_09, sum(a.date_amount_10) as date_amount_10 ")
			.total("       , sum(a.date_amount_11) as date_amount_11, sum(a.date_amount_12) as date_amount_12 ")
			.total("       , sum(a.date_amount_13) as date_amount_13, sum(a.date_amount_14) as date_amount_14 ")
			.total("       , sum(a.date_amount_15) as date_amount_15, sum(a.date_amount_16) as date_amount_16 ")
			.total("       , sum(a.date_amount_17) as date_amount_17, sum(a.date_amount_18) as date_amount_18 ")
			.total("       , sum(a.date_amount_19) as date_amount_19, sum(a.date_amount_20) as date_amount_20 ")
			.total("       , sum(a.date_amount_21) as date_amount_21, sum(a.date_amount_22) as date_amount_22 ")
			.total("       , sum(a.date_amount_23) as date_amount_23, sum(a.date_amount_24) as date_amount_24 ")
			.total("       , sum(a.date_amount_25) as date_amount_25, sum(a.date_amount_26) as date_amount_26 ")
			.total("       , sum(a.date_amount_27) as date_amount_27, sum(a.date_amount_28) as date_amount_28 ")
			.total("       , sum(a.date_amount_29) as date_amount_29, sum(a.date_amount_30) as date_amount_30 ")
			.total("       , sum(a.date_amount_31) as date_amount_31                                          ")
		;
		data.param // 조회
			.query("select a.*                                                                                ")
			.query("      ,c.unit_name                                                                           ")
			.query("      ,b.stor_nm                                                                          ")
			.query("      ,d.stor_nm as move_nm                                                               ")
		;
		data.param // 조건
			.where("  from (                                                                                  ")
			.where("       select a.stor_grp                                                                  ")
			.where("             ,a.stor_id                                                                   ")
			.where("             ,a.move_id                                                                   ")
			.where("             ,b.item_idcd                                                                    ")
			.where("             ,b.item_code                                                                    ")
			.where("             ,b.item_name                                                                    ")
			.where("             ,b.item_spec                                                                    ")
			.where("             ,b.unit_idcd                                                                    ")
			.where("             ,sum(b.qty)                                             as sum_qty           ")
			.where("             ,sum(b.amount)                                          as sum_amount        ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '01', b.qty, 0))    as date_qty_01       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '02', b.qty, 0))    as date_qty_02       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '03', b.qty, 0))    as date_qty_03       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '04', b.qty, 0))    as date_qty_04       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '05', b.qty, 0))    as date_qty_05       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '06', b.qty, 0))    as date_qty_06       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '07', b.qty, 0))    as date_qty_07       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '08', b.qty, 0))    as date_qty_08       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '09', b.qty, 0))    as date_qty_09       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '10', b.qty, 0))    as date_qty_10       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '11', b.qty, 0))    as date_qty_11       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '12', b.qty, 0))    as date_qty_12       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '13', b.qty, 0))    as date_qty_13       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '14', b.qty, 0))    as date_qty_14       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '15', b.qty, 0))    as date_qty_15       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '16', b.qty, 0))    as date_qty_16       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '17', b.qty, 0))    as date_qty_17       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '18', b.qty, 0))    as date_qty_18       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '19', b.qty, 0))    as date_qty_19       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '20', b.qty, 0))    as date_qty_20       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '21', b.qty, 0))    as date_qty_21       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '22', b.qty, 0))    as date_qty_22       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '23', b.qty, 0))    as date_qty_23       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '24', b.qty, 0))    as date_qty_24       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '25', b.qty, 0))    as date_qty_25       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '26', b.qty, 0))    as date_qty_26       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '27', b.qty, 0))    as date_qty_27       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '28', b.qty, 0))    as date_qty_28       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '29', b.qty, 0))    as date_qty_29       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '30', b.qty, 0))    as date_qty_30       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '31', b.qty, 0))    as date_qty_31       ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '01', b.amount, 0)) as date_amount_01    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '02', b.amount, 0)) as date_amount_02    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '03', b.amount, 0)) as date_amount_03    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '04', b.amount, 0)) as date_amount_04    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '05', b.amount, 0)) as date_amount_05    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '06', b.amount, 0)) as date_amount_06    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '07', b.amount, 0)) as date_amount_07    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '08', b.amount, 0)) as date_amount_08    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '09', b.amount, 0)) as date_amount_09    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '10', b.amount, 0)) as date_amount_10    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '11', b.amount, 0)) as date_amount_11    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '12', b.amount, 0)) as date_amount_12    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '13', b.amount, 0)) as date_amount_13    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '14', b.amount, 0)) as date_amount_14    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '15', b.amount, 0)) as date_amount_15    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '16', b.amount, 0)) as date_amount_16    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '17', b.amount, 0)) as date_amount_17    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '18', b.amount, 0)) as date_amount_18    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '19', b.amount, 0)) as date_amount_19    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '20', b.amount, 0)) as date_amount_20    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '21', b.amount, 0)) as date_amount_21    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '22', b.amount, 0)) as date_amount_22    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '23', b.amount, 0)) as date_amount_23    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '24', b.amount, 0)) as date_amount_24    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '25', b.amount, 0)) as date_amount_25    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '26', b.amount, 0)) as date_amount_26    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '27', b.amount, 0)) as date_amount_27    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '28', b.amount, 0)) as date_amount_28    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '29', b.amount, 0)) as date_amount_29    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '30', b.amount, 0)) as date_amount_30    ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '31', b.amount, 0)) as date_amount_31    ")
			.where("         from move_ist_mst a                                                              ")
			.where("              join move_ist_dtl b                                                         ")
			.where("                on b.inv_no = a.inv_no                                                    ")
			.where("        where a.stor_grp = :stor_grp  ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id    ", arg.getParameter("stor_id"))
			.where("          and a.move_id = :move_id    ", arg.getParameter("move_id"))
			.where("          and a.inv_dt between :fr_dt ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0 				                                              ")
			.where("        group by a.stor_grp, a.stor_id, a.move_id, b.item_idcd, b.item_code, b.item_name, b.item_spec, b.unit_idcd ")
			.where("       ) a                                                                                ")
			.where("       left outer join stor b                                                             ")
			.where("         on b.stor_id = a.stor_id                                                         ")
			.where("       left outer join item_unit c                                                        ")
			.where("         on c.unit_idcd = a.unit_idcd                                                           ")
			.where("       left outer join stor d                                                             ")
			.where("         on d.stor_id = a.move_id                                                         ")
			.where(" order by a.item_code, a.item_name, a.item_spec, b.stor_nm, d.stor_nm                              ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
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
	public SqlResultMap getMonth(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("       , sum(a.sum_qty)         as sum_qty                                                    ")
			.total("       , sum(a.sum_amount)      as sum_amount                                                 ")
			.total("       , sum(a.month_qty_01)    as month_qty_01,    sum(a.month_qty_02)    as month_qty_02    ")
			.total("       , sum(a.month_qty_03)    as month_qty_03,    sum(a.month_qty_04)    as month_qty_04    ")
			.total("       , sum(a.month_qty_05)    as month_qty_05,    sum(a.month_qty_06)    as month_qty_06    ")
			.total("       , sum(a.month_qty_07)    as month_qty_07,    sum(a.month_qty_08)    as month_qty_08    ")
			.total("       , sum(a.month_qty_09)    as month_qty_09,    sum(a.month_qty_10)    as month_qty_10    ")
			.total("       , sum(a.month_qty_11)    as month_qty_11,    sum(a.month_qty_12)    as month_qty_12    ")
			.total("       , sum(a.month_amount_01) as month_amount_01, sum(a.month_amount_02) as month_amount_02 ")
			.total("       , sum(a.month_amount_03) as month_amount_03, sum(a.month_amount_04) as month_amount_04 ")
			.total("       , sum(a.month_amount_05) as month_amount_05, sum(a.month_amount_06) as month_amount_06 ")
			.total("       , sum(a.month_amount_07) as month_amount_07, sum(a.month_amount_08) as month_amount_08 ")
			.total("       , sum(a.month_amount_09) as month_amount_09, sum(a.month_amount_10) as month_amount_10 ")
			.total("       , sum(a.month_amount_11) as month_amount_11, sum(a.month_amount_12) as month_amount_12 ")
		;
		data.param // 조회
			.query("select a.*                                                                                  ")
			.query("      ,c.unit_name                                                                             ")
			.query("      ,b.stor_nm                                                                            ")
		;
		data.param // 조건
			.where("  from (                                                                                    ")
			.where("       select a.stor_grp                                                                    ")
			.where("             ,a.stor_id                                                                     ")
			.where("             ,a.move_id                                                                     ")
			.where("             ,a.move_nm                                                                     ")
			.where("             ,b.item_idcd                                                                      ")
			.where("             ,b.item_code                                                                      ")
			.where("             ,b.item_name                                                                      ")
			.where("             ,b.item_spec                                                                      ")
			.where("             ,b.unit_idcd                                                                      ")
			.where("             ,sum(b.qty)                                             as sum_qty             ")
			.where("             ,sum(b.amount)                                          as sum_amount          ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '01', b.qty, 0))    as month_qty_01        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '02', b.qty, 0))    as month_qty_02        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '03', b.qty, 0))    as month_qty_03        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '04', b.qty, 0))    as month_qty_04        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '05', b.qty, 0))    as month_qty_05        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '06', b.qty, 0))    as month_qty_06        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '07', b.qty, 0))    as month_qty_07        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '08', b.qty, 0))    as month_qty_08        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '09', b.qty, 0))    as month_qty_09        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '10', b.qty, 0))    as month_qty_10        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '11', b.qty, 0))    as month_qty_11        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '12', b.qty, 0))    as month_qty_12        ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '01', b.amount, 0)) as month_amount_01     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '02', b.amount, 0)) as month_amount_02     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '03', b.amount, 0)) as month_amount_03     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '04', b.amount, 0)) as month_amount_04     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '05', b.amount, 0)) as month_amount_05     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '06', b.amount, 0)) as month_amount_06     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '07', b.amount, 0)) as month_amount_07     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '08', b.amount, 0)) as month_amount_08     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '09', b.amount, 0)) as month_amount_09     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '10', b.amount, 0)) as month_amount_10     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '11', b.amount, 0)) as month_amount_11     ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '12', b.amount, 0)) as month_amount_12     ")
			.where("         from move_ist_mst a                                                                ")
			.where("              join move_ist_dtl b                                                           ")
			.where("                on b.inv_no = a.inv_no                                                      ")
			.where("        where a.stor_grp = :stor_grp    ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id   	", arg.getParameter("stor_id"))
			.where("          and a.move_id = :move_id   	", arg.getParameter("move_id"))
			.where("          and a.inv_dt between :fr_dt   ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0 				                                               ")
			.where("        group by a.stor_grp, a.stor_id, a.move_id, a.move_nm, b.item_idcd, b.item_code, b.item_name, b.item_spec, b.unit_idcd  ")
			.where("       ) a                                                                                 ")
			.where("       left outer join stor b                                                              ")
			.where("         on b.stor_id = a.stor_id                                                          ")
			.where("       left outer join item_unit c                                                         ")
			.where("         on c.unit_idcd = a.unit_idcd                                                            ")
			.where(" order by a.item_code, a.item_name, a.item_spec, b.stor_nm, a.move_nm                               ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}
}
