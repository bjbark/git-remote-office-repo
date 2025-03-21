package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class MoveRecvstoreRptService  extends DefaultServiceHandler {

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
			.total("      ,sum(a.sum_tax_free) as sum_tax_free ")
			.total("      ,sum(a.sum_taxation) as sum_taxation ")
			.total("      ,sum(a.sum_tax)      as sum_tax      ")
			.total("      ,sum(a.sum_amount)   as sum_amount   ")
			.total("      ,sum(a.sum_qty)      as sum_qty      ")
		;
		data.param // 조회
			.query("select a.stor_id                                                                                              ")
			.query("      ,b.stor_nm                                                                                              ")
			.query("      ,a.move_id                                                                                               ")
			.query("      ,c.stor_nm as move_nm                                                                                   ")
			.query("      ,a.sum_tax_free                                                                                          ")
			.query("      ,a.sum_taxation                                                                                          ")
			.query("      ,a.sum_tax                                                                                               ")
			.query("      ,a.sum_amount                                                                                            ")
			.query("      ,decode(sum(a.sum_amount) over (partition by a.stor_grp), 0, 0                                           ")
			.query("        ,round(abs(a.sum_amount)/sum(abs(a.sum_amount)) over (partition by a.stor_grp), 3)*100) as rate_amount ")
			.query("      ,a.sum_qty                                                                                               ")
			.query("      ,decode(sum(a.sum_qty) over (partition by a.stor_grp), 0, 0                                              ")
			.query("        ,round(abs(a.sum_qty)/sum(abs(a.sum_qty)) over (partition by a.stor_grp), 3)*100)       as rate_qty    ")
		;
		data.param // 조건
			.where("  from (                                                                                                       ")
			.where("       select a.stor_grp                                                                                       ")
			.where("             ,a.stor_id                                                                                       ")
			.where("             ,a.move_id                                                                                        ")
			.where("             ,sum(a.tax_free) as sum_tax_free                                                                  ")
			.where("             ,sum(a.taxation) as sum_taxation                                                                  ")
			.where("             ,sum(a.tax)      as sum_tax                                                                       ")
			.where("             ,sum(a.amount)   as sum_amount                                                                    ")
			.where("             ,sum(a.qty)      as sum_qty                                                                       ")
			.where("         from move_ist_mst a                                                                                      ")
			.where("        where a.stor_grp = :stor_grp   ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id     ", arg.getParameter("stor_id"))
			.where("          and a.move_id = :move_id     ", arg.getParameter("move_id"))
			.where("          and a.inv_dt between :fr_dt  ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt  ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0 				                                                                   ")
			.where("        group by a.stor_grp, a.stor_id, a.move_id                                                             ")
			.where("       ) a                                                                                                     ")
			.where("       left outer join stor b                                                                                 ")
			.where("         on b.stor_id = a.stor_id                                                                            ")
			.where("       left outer join stor c                                                                                 ")
			.where("         on c.stor_id = a.move_id                                                                             ")
			.where(" order by b.stor_nm, c.stor_nm                                                                               ")
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
			.total("       , sum(a.sum_amount) as sum_amount                            "  )
			.total("       , sum(a.week_sun) as week_sun,   sum(a.week_mon) as week_mon "  )
			.total("       , sum(a.week_tue) as week_tue,   sum(a.week_wed) as week_wed "  )
			.total("       , sum(a.week_thu) as week_thu,   sum(a.week_fri) as week_fri "  )
			.total("       , sum(a.week_sat) as week_sat                                "  )
		;
		data.param // 조회
			.query("select a.*                                                                                                     ")
			.query("      ,b.stor_nm                                                                                              ")
			.query("      ,c.stor_nm as move_nm                                                                                   ")
		;
		data.param // 조건
			.where("  from (                                                                                                       ")
			.where("       select a.stor_grp                                                                                       ")
			.where("             ,a.stor_id                                                                                       ")
			.where("             ,a.move_id                                                                                        ")
			.where("             ,sum(a.amount)                                                              as sum_amount         ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '1', a.amount, 0)) as week_sun           ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '2', a.amount, 0)) as week_mon           ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '3', a.amount, 0)) as week_tue           ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '4', a.amount, 0)) as week_wed           ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '5', a.amount, 0)) as week_thu           ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '6', a.amount, 0)) as week_fri           ")
			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '7', a.amount, 0)) as week_sat           ")
			.where("         from move_ist_mst a                                                                                      ")
			.where("        where a.stor_grp = :stor_grp  ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id    ", arg.getParameter("stor_id"))
			.where("          and a.move_id = :move_id    ", arg.getParameter("move_id"))
			.where("          and a.inv_dt between :fr_dt ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0 				                                                                   ")
			.where("        group by a.stor_grp, a.stor_id, a.move_id                                                             ")
			.where("       ) a                                                                                                     ")
			.where("       left outer join stor b                                                                                 ")
			.where("         on b.stor_id = a.stor_id                                                                            ")
			.where("       left outer join stor c                                                                                 ")
			.where("         on c.stor_id = a.move_id                                                                             ")
			.where(" order by b.stor_nm, c.stor_nm                                                                               ")
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
		data.param // 조회
			.query("select a.*                                                                                                     ")
			.query("      ,b.stor_nm                                                                                              ")
			.query("      ,c.stor_nm as move_nm                                                                                   ")
		;
		data.param // 조건
			.where("  from (                                                                                                       ")
			.where("       select a.stor_grp                                                                                       ")
			.where("             ,a.stor_id                                                                                       ")
			.where("             ,a.move_id                                                                                        ")
			.where("             ,sum(a.amount)                                          as sum_amount                             ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '01', a.amount, 0)) as date01                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '02', a.amount, 0)) as date02                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '03', a.amount, 0)) as date03                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '04', a.amount, 0)) as date04                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '05', a.amount, 0)) as date05                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '06', a.amount, 0)) as date06                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '07', a.amount, 0)) as date07                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '08', a.amount, 0)) as date08                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '09', a.amount, 0)) as date09                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '10', a.amount, 0)) as date10                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '11', a.amount, 0)) as date11                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '12', a.amount, 0)) as date12                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '13', a.amount, 0)) as date13                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '14', a.amount, 0)) as date14                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '15', a.amount, 0)) as date15                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '16', a.amount, 0)) as date16                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '17', a.amount, 0)) as date17                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '18', a.amount, 0)) as date18                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '19', a.amount, 0)) as date19                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '20', a.amount, 0)) as date20                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '21', a.amount, 0)) as date21                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '22', a.amount, 0)) as date22                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '23', a.amount, 0)) as date23                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '24', a.amount, 0)) as date24                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '25', a.amount, 0)) as date25                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '26', a.amount, 0)) as date26                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '27', a.amount, 0)) as date27                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '28', a.amount, 0)) as date28                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '29', a.amount, 0)) as date29                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '30', a.amount, 0)) as date30                                 ")
			.where("             ,sum(decode(substr(a.inv_dt, 7, 2), '31', a.amount, 0)) as date31                                 ")
			.where("         from move_ist_mst a                                                                                      ")
			.where("        where a.stor_grp = :stor_grp   ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id     ", arg.getParameter("stor_id"))
			.where("          and a.move_id = :move_id     ", arg.getParameter("move_id"))
			.where("          and a.inv_dt between :fr_dt  ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt  ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0 				                                                                   ")
			.where("        group by a.stor_grp, a.stor_id, a.move_id                                                             ")
			.where("       ) a                                                                                                     ")
			.where("       left outer join stor b                                                                                 ")
			.where("         on b.stor_id = a.stor_id                                                                            ")
			.where("       left outer join stor c                                                                                 ")
			.where("         on c.stor_id = a.move_id                                                                             ")
			.where(" order by b.stor_nm, c.stor_nm                                                                               ")
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
			.total("select count(1) as maxsize, sum(a.sum_amount) as sum_amount       " )
			.total("       ,sum(a.month01) as month01,     sum(a.month02) as month02  " )
			.total("       ,sum(a.month03) as month03,     sum(a.month04) as month04  " )
			.total("       ,sum(a.month05) as month05,     sum(a.month06) as month06  " )
			.total("       ,sum(a.month07) as month07,     sum(a.month08) as month08  " )
			.total("       ,sum(a.month09) as month09,     sum(a.month10) as month10  " )
			.total("       ,sum(a.month11) as month11,     sum(a.month12) as month12  " )
		;
		data.param // 조회
			.query("select a.*                                                                                                     ")
			.query("      ,b.stor_nm                                                                                              ")
		;
		data.param // 조건
			.where("  from (                                                                                                       ")
			.where("       select a.stor_grp                                                                                       ")
			.where("             ,a.stor_id                                                                                       ")
			.where("             ,a.move_id                                                                                        ")
			.where("             ,a.move_nm                                                                                        ")
			.where("             ,sum(a.amount)                                          as sum_amount                             ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '01', a.amount, 0)) as month01                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '02', a.amount, 0)) as month02                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '03', a.amount, 0)) as month03                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '04', a.amount, 0)) as month04                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '05', a.amount, 0)) as month05                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '06', a.amount, 0)) as month06                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '07', a.amount, 0)) as month07                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '08', a.amount, 0)) as month08                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '09', a.amount, 0)) as month09                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '10', a.amount, 0)) as month10                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '11', a.amount, 0)) as month11                                ")
			.where("             ,sum(decode(substr(a.inv_dt, 5, 2), '12', a.amount, 0)) as month12                                ")
			.where("         from move_ist_mst a                                                                                      ")
			.where("        where a.stor_grp = :stor_grp  ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id    ", arg.getParameter("stor_id"))
			.where("          and a.move_id = :move_id    ", arg.getParameter("move_id"))
			.where("          and a.inv_dt between :fr_dt ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt ", arg.fixParamText("to_dt"))
			.where("          and a.row_sts = 0 				                                                                   ")
			.where("        group by a.stor_grp, a.stor_id, a.move_id, a.move_nm                                                  ")
			.where("       ) a                                                                                                     ")
			.where("       left outer join stor b                                                                                 ")
			.where("         on b.stor_id = a.stor_id                                                                            ")
			.where(" order by b.stor_nm, a.move_id                                                                                ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}
}
