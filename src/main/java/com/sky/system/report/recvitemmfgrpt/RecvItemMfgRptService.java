package com.sky.system.report.recvitemmfgrpt;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class RecvItemMfgRptService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("       , sum(a.sum_tax_free) as sum_tax_free " )
			.total("       , sum(a.sum_taxation) as sum_taxation " )
			.total("       , sum(a.sum_tax)      as sum_tax      " )
			.total("       , sum(a.sum_subtotal) as sum_subtotal " )
			.total("       , sum(a.sum_amount)   as sum_amount   " )
		;
		data.param // 조회
			.query("select a.mfg_cd                                                                                                               ")
			.query("      ,a.mfg_nm                                                                                                               ")
			.query("      ,a.sum_qty                                                                                                              ")
			.query("      ,case sum(a.sum_qty) over (partition by a.stor_grp) when 0 then 0                                                             ")
			.query("            else round(abs(a.sum_qty)/sum(abs(a.sum_qty)) over (partition by a.stor_grp), 3)*100 end                 as rate_qty         ")
			.query("      ,a.sum_unit_amount                                                                                                      ")
			.query("      ,case sum(a.sum_unit_amount) over (partition by a.stor_grp) when 0 then 0                                                     ")
			.query("            else round(abs(a.sum_unit_amount)/sum(abs(a.sum_unit_amount)) over (partition by a.stor_grp), 3)*100 end as rate_unit_amount ")
			.query("      ,a.sum_tax_free                                                                                                         ")
			.query("      ,a.sum_taxation                                                                                                         ")
			.query("      ,a.sum_tax                                                                                                              ")
			.query("      ,a.sum_subtotal                                                                                                         ")
			.query("      ,a.sum_amount                                                                                                           ")
			.query("      ,case sum(a.sum_amount) over (partition by a.stor_grp) when 0 then 0                                                          ")
			.query("            else round(abs(a.sum_amount)/sum(abs(a.sum_amount)) over (partition by a.stor_grp), 3)*100 end   as rate_amount      ")
		;
		data.param // 조건
			.where("  from (                                                                                                                      ")
			.where("       select a.stor_grp                                                                                                      ")
			.where("             ,m.bas_cd               as mfg_cd                                                                               ")
			.where("             ,m.bas_nm               as mfg_nm                                                                               ")
			.where("             ,sum(b.qty)              as sum_qty                                                                              ")
			.where("             ,sum(b.unt_pri*b.qty) as sum_unit_amount                                                                      ")
			.where("             ,sum(b.txfree_amt)         as sum_tax_free                                                                         ")
			.where("             ,sum(b.taxtn_amt)         as sum_taxation                                                                         ")
			.where("             ,sum(b.tax_amt)              as sum_tax                                                                              ")
			.where("             ,sum(b.inv_amt)           as sum_amount                                                                           ")
			.where("             ,sum(b.sply_amt)         as sum_subtotal                                                                         ")
			.where("         from ist_mst a                                                                                                     ")
			.where("              join recv_item b            on b.inv_no = a.inv_no                                                                                        ")
			.where("              left outer join itm_mst i   on i.item_idcd = b.item_idcd                                                                                      ")
			.where("              left outer join base_mst m  on m.bas_id = i.maker_id                                                                                       ")
			.where("        where a.stor_grp   = :stor_grp   	  ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id    = :stor_id   	  ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt   	  ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   	  ", arg.fixParamText("to_dt"))
			.where("          and a.vend_id    = :vend_id   	  ", arg.getParameter("vend_id"))
			.where("          and i.maker_id   = :maker_id   	  ", arg.getParameter("maker_id"))
			.where("          and a.inv_usr_id = :inv_usr_id   	  ", arg.getParameter("inv_usr_id"))
			.where("          and a.row_sts = 0                                  ")
			.where("        group by a.stor_grp, m.bas_cd, m.bas_nm              ")
			.where("       ) a                                                   ")
			.where(" order by a.mfg_cd                                           ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 */
	public SqlResultMap getTime(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
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
		data.param // 조회
			.query("select a.*                                                                         ")
		;
		data.param // 조건
			.where("  from (                                                                           ")
			.where("       select a.stor_grp                                                           ")
			.where("             ,m.bas_cd                                              as mfg_cd     ")
			.where("             ,m.bas_nm                                              as mfg_nm     ")
			.where("             ,sum(b.inv_amt)                                          as sum_amount ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '00' then  b.inv_amt else 0 end ) as inv_tm_00   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '01' then  b.inv_amt else 0 end ) as inv_tm_01   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '02' then  b.inv_amt else 0 end ) as inv_tm_02   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '03' then  b.inv_amt else 0 end ) as inv_tm_03   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '04' then  b.inv_amt else 0 end ) as inv_tm_04   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '05' then  b.inv_amt else 0 end ) as inv_tm_05   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '06' then  b.inv_amt else 0 end ) as inv_tm_06   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '07' then  b.inv_amt else 0 end ) as inv_tm_07   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '08' then  b.inv_amt else 0 end ) as inv_tm_08   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '09' then  b.inv_amt else 0 end ) as inv_tm_09   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '10' then  b.inv_amt else 0 end ) as inv_tm_10   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '11' then  b.inv_amt else 0 end ) as inv_tm_11   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '12' then  b.inv_amt else 0 end ) as inv_tm_12   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '13' then  b.inv_amt else 0 end ) as inv_tm_13   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '14' then  b.inv_amt else 0 end ) as inv_tm_14   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '15' then  b.inv_amt else 0 end ) as inv_tm_15   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '16' then  b.inv_amt else 0 end ) as inv_tm_16   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '17' then  b.inv_amt else 0 end ) as inv_tm_17   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '18' then  b.inv_amt else 0 end ) as inv_tm_18   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '19' then  b.inv_amt else 0 end ) as inv_tm_19   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '20' then  b.inv_amt else 0 end ) as inv_tm_20   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '21' then  b.inv_amt else 0 end ) as inv_tm_21   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '22' then  b.inv_amt else 0 end ) as inv_tm_22   ")
			.where("             ,sum(case when substring(a.inv_tm, 1, 2) = '23' then  b.inv_amt else 0 end ) as inv_tm_23   ")
			.where("         from ist_mst a                                                          			")
			.where("              join recv_item b              on b.inv_no = a.inv_no                          ")
			.where("              left outer join itm_mst i     on i.item_idcd = b.item_idcd                          ")
			.where("              left outer join base_mst m    on m.bas_id = i.maker_id                        ")
			.where("        where a.stor_grp   = :stor_grp   	 ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id    = :stor_id   	 ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt   	 ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   	 ", arg.fixParamText("to_dt"))
			.where("          and a.vend_id    = :vend_id   	 ", arg.getParameter("vend_id"))
			.where("          and i.maker_id   = :maker_id   	 ", arg.getParameter("maker_id"))
			.where("          and a.inv_usr_id = :inv_usr_id   	 ", arg.getParameter("inv_usr_id"))
			.where("          and a.row_sts = 0                                                      ")
			.where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                  ")
			.where("       ) a                                                                         ")
			.where(" order by a.mfg_cd                                                                 ")
		;

		if (page == 0 && rows == 0) {
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
			.query("select a.*                                                                                             ")
		;
		data.param // 조건
			.where("  from (                                                                                               ")
			.where("       select a.stor_grp                                                                               ")
			.where("             ,m.bas_cd                                                                  as mfg_cd     ")
			.where("             ,m.bas_nm                                                                  as mfg_nm     ")
			.where("             ,sum(b.inv_amt)                                                              as sum_amount ")
//			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '1', b.inv_amt, 0)) as week_sun   ")
//			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '2', b.inv_amt, 0)) as week_mon   ")
//			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '3', b.inv_amt, 0)) as week_tue   ")
//			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '4', b.inv_amt, 0)) as week_wed   ")
//			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '5', b.inv_amt, 0)) as week_thu   ")
//			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '6', b.inv_amt, 0)) as week_fri   ")
//			.where("             ,sum(decode(to_char(to_date(a.inv_dt, 'yyyymmdd'), 'D'), '7', b.inv_amt, 0)) as week_sat   ")
            .where("             ,sum(case when datepart(weekday,a.inv_dt) = '1' then b.inv_amt else 0 end ) as week_sun       ")
            .where("             ,sum(case when datepart(weekday,a.inv_dt) = '2' then b.inv_amt else 0 end ) as week_mon       ")
			.where("             ,sum(case when datepart(weekday,a.inv_dt) = '3' then b.inv_amt else 0 end ) as week_tue       ")
			.where("             ,sum(case when datepart(weekday,a.inv_dt) = '4' then b.inv_amt else 0 end ) as week_wed       ")
			.where("             ,sum(case when datepart(weekday,a.inv_dt) = '5' then b.inv_amt else 0 end ) as week_thu       ")
			.where("             ,sum(case when datepart(weekday,a.inv_dt) = '6' then b.inv_amt else 0 end ) as week_fri       ")
			.where("             ,sum(case when datepart(weekday,a.inv_dt) = '7' then b.inv_amt else 0 end ) as week_sat       ")
			.where("         from ist_mst a                                                                              ")
			.where("              join recv_item b               on b.inv_no = a.inv_no                                                                 ")
			.where("              left outer join itm_mst i      on i.item_idcd = b.item_idcd                                                               ")
			.where("              left outer join base_mst m     on m.bas_id = i.maker_id                                                                ")
			.where("        where a.stor_grp = :stor_grp   	      ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id   	      ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt   	  ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   	  ", arg.fixParamText("to_dt"))
			.where("          and a.vend_id = :vend_id   	      ", arg.getParameter("vend_id"))
			.where("          and i.maker_id = :maker_id   	      ", arg.getParameter("maker_id"))
			.where("          and a.inv_usr_id = :inv_usr_id   	  ", arg.getParameter("inv_usr_id"))
			.where("          and a.row_sts = 0                                                                          ")
			.where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                                      ")
			.where("       ) a                                                                                             ")
			.where(" order by a.mfg_cd                                                                                     ")
		;

		if (page == 0 && rows == 0) {
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
			.query("select a.*                                                                         ")
		;
		data.param // 조건
			.where("  from (                                                                           ")
			.where("       select a.stor_grp                                                           ")
			.where("             ,m.bas_cd                                              as mfg_cd     ")
			.where("             ,m.bas_nm                                              as mfg_nm     ")
			.where("             ,sum(b.inv_amt)                                          as sum_amount ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '01' then b.inv_amt else 0 end) as date01                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '02' then b.inv_amt else 0 end) as date02                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '03' then b.inv_amt else 0 end) as date03                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '04' then b.inv_amt else 0 end) as date04                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '05' then b.inv_amt else 0 end) as date05                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '06' then b.inv_amt else 0 end) as date06                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '07' then b.inv_amt else 0 end) as date07                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '08' then b.inv_amt else 0 end) as date08                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '09' then b.inv_amt else 0 end) as date09                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '10' then b.inv_amt else 0 end) as date10                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '11' then b.inv_amt else 0 end) as date11                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '12' then b.inv_amt else 0 end) as date12                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '13' then b.inv_amt else 0 end) as date13                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '14' then b.inv_amt else 0 end) as date14                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '15' then b.inv_amt else 0 end) as date15                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '16' then b.inv_amt else 0 end) as date16                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '17' then b.inv_amt else 0 end) as date17                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '18' then b.inv_amt else 0 end) as date18                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '19' then b.inv_amt else 0 end) as date19                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '20' then b.inv_amt else 0 end) as date20                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '21' then b.inv_amt else 0 end) as date21                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '22' then b.inv_amt else 0 end) as date22                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '23' then b.inv_amt else 0 end) as date23                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '24' then b.inv_amt else 0 end) as date24                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '25' then b.inv_amt else 0 end) as date25                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '26' then b.inv_amt else 0 end) as date26                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '27' then b.inv_amt else 0 end) as date27                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '28' then b.inv_amt else 0 end) as date28                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '29' then b.inv_amt else 0 end) as date29                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '30' then b.inv_amt else 0 end) as date30                 ")
			.where("             ,sum(case when substring(a.inv_dt, 7, 2) = '31' then b.inv_amt else 0 end) as date31                 ")
            .where("         from ist_mst a                                                          ")
			.where("              join recv_item b            on b.inv_no = a.inv_no                                             ")
			.where("              left outer join itm_mst i   on i.item_idcd = b.item_idcd                                           ")
			.where("              left outer join base_mst m  on m.bas_id = i.maker_id                                            ")
			.where("        where a.stor_grp = :stor_grp   	  ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id   	  ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt   	", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   	", arg.fixParamText("to_dt"))
			.where("          and a.vend_id = :vend_id   	    ", arg.getParameter("vend_id"))
			.where("          and i.maker_id = :maker_id   	    ", arg.getParameter("maker_id"))
			.where("          and a.inv_usr_id = :inv_usr_id   	", arg.getParameter("inv_usr_id"))
			.where("          and a.row_sts = 0                                                      ")
			.where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                  ")
			.where("       ) a                                                                         ")
			.where(" order by a.mfg_cd                                                                 ")
		;

		if (page == 0 && rows == 0) {
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
			.query("select a.*                                                                         ")
		;
		data.param // 조건
			.where("  from (                                                                           ")
			.where("       select a.stor_grp                                                           ")
			.where("             ,m.bas_cd                                              as mfg_cd     ")
			.where("             ,m.bas_nm                                              as mfg_nm     ")
			.where("             ,sum(b.inv_amt)                                          as sum_amount ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '01' then  b.inv_amt else 0 end ) as month01              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '02' then  b.inv_amt else 0 end ) as month02              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '03' then  b.inv_amt else 0 end ) as month03              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '04' then  b.inv_amt else 0 end ) as month04              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '05' then  b.inv_amt else 0 end ) as month05              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '06' then  b.inv_amt else 0 end ) as month06              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '07' then  b.inv_amt else 0 end ) as month07              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '08' then  b.inv_amt else 0 end ) as month08              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '09' then  b.inv_amt else 0 end ) as month09              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '10' then  b.inv_amt else 0 end ) as month10              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '11' then  b.inv_amt else 0 end ) as month11              ")
			.where("             ,sum(case when substring(a.inv_dt, 5, 2) = '12' then  b.inv_amt else 0 end ) as month12              ")
			.where("         from ist_mst a                                                          ")
			.where("              join recv_item b              on b.inv_no = a.inv_no                                             ")
			.where("              left outer join itm_mst i     on i.item_idcd = b.item_idcd                                           ")
			.where("              left outer join base_mst m    on m.bas_id = i.maker_id                                            ")
			.where("        where a.stor_grp = :stor_grp   	", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id   	", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt   ", arg.fixParamText("fr_dt"))
			.where("                           and :to_dt   ", arg.fixParamText("to_dt"))
			.where("          and a.vend_id = :vend_id   	", arg.getParameter("vend_id"))
			.where("          and i.maker_id = :maker_id   	", arg.getParameter("maker_id"))
			.where("          and a.inv_usr_id = :inv_usr_id", arg.getParameter("inv_usr_id"))
			.where("          and a.row_sts = 0                                                      ")
			.where("        group by a.stor_grp, m.bas_cd, m.bas_nm                                  ")
			.where("       ) a                                                                         ")
			.where(" order by a.mfg_cd                                                                 ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
