package com.sky.system.pos;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class PaygateReportService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */

	public SqlResultMap getSearchMaster(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
//		String cash    = arg.fixParamText("cash_gb");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize, isnull(sum(payment), 0) as payment")
		;

		data.param
			.query(" select *                                                                                                   ")
		;
		data.param // 쿼리문  입력
			.where("from (                                                                                                      ")
			.where("select inv_no, inv_dt, app_no, app_dt, req_dt, payment, purchase_nm, van_id, 								")
			.where(" 	   case a.app_gb when '0100' then '승인' else '취소' end as app_gb,  									")
			.where(" 	   case a.pay_gb when '0100' then '현금영수증' when '0101' then '은행' when '0200' then '카드'  		")
			.where(" 	                 when '0300' then '휴대폰' when '0600' then 'ocb' end as pay_gb, 						")
			.where(" 	   (select stor_nm from stor where stor_id = a.stor_id) as stor_nm,								")
			.where(" 	   (select g1.bas_nm from base_mst g1 , base_mst g2 													")
			.where(" 	     where g1.bas_id = g2.prnt_id and g1.bas_nm = '벤사코드' and a.van_id = g2.bas_id ) as van_nm	")
			.where(" from log_paygate a																							")
			.where("where a.inv_dt between :fr_dt   ", arg.fixParameter("fr_dt"))
			.where("  and :to_dt        			", arg.fixParameter("to_dt"))
			.where("  and a.stor_id = :stor_id    ", arg.getParameter("stor_id"))
		;
        if ("2".equals(arg.getParamText("cash_gb").toString())) {
        		data.param
            	 	.where("and a.PAY_GB = '0100'            ")
            	 ;
             }else if ("1".equals(arg.getParamText("cash_gb").toString())) {
            	 data.param
            	 	.where("and A.PAY_GB <> '0100'          ")
            	 ;
             }
        data.param
			.where(") order by inv_no																							")
		;





		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/**
	 * 일자별 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchDay(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize ")
			.total(" 	, isnull(sum(Z.Payment), 0) as Payment")
			.total(" 	, isnull(sum(Z.D01), 0) as D01")
			.total(" 	, isnull(sum(Z.D02), 0) as D02")
			.total(" 	, isnull(sum(Z.D03), 0) as D03")
			.total(" 	, isnull(sum(Z.D04), 0) as D04")
			.total(" 	, isnull(sum(Z.D05), 0) as D05")
			.total(" 	, isnull(sum(Z.D06), 0) as D06")
			.total(" 	, isnull(sum(Z.D07), 0) as D07")
			.total(" 	, isnull(sum(Z.D08), 0) as D08")
			.total(" 	, isnull(sum(Z.D09), 0) as D09")
			.total(" 	, isnull(sum(Z.D10), 0) as D10")
			.total(" 	, isnull(sum(Z.D11), 0) as D11")
			.total(" 	, isnull(sum(Z.D12), 0) as D12")
			.total(" 	, isnull(sum(Z.D13), 0) as D13")
			.total(" 	, isnull(sum(Z.D14), 0) as D14")
			.total(" 	, isnull(sum(Z.D15), 0) as D15")
			.total(" 	, isnull(sum(Z.D16), 0) as D16")
			.total(" 	, isnull(sum(Z.D17), 0) as D17")
			.total(" 	, isnull(sum(Z.D18), 0) as D18")
			.total(" 	, isnull(sum(Z.D19), 0) as D19")
			.total(" 	, isnull(sum(Z.D20), 0) as D20")
			.total(" 	, isnull(sum(Z.D21), 0) as D21")
			.total(" 	, isnull(sum(Z.D22), 0) as D22")
			.total(" 	, isnull(sum(Z.D23), 0) as D23")
			.total(" 	, isnull(sum(Z.D24), 0) as D24")
			.total(" 	, isnull(sum(Z.D25), 0) as D25")
			.total(" 	, isnull(sum(Z.D26), 0) as D26")
			.total(" 	, isnull(sum(Z.D27), 0) as D27")
			.total(" 	, isnull(sum(Z.D28), 0) as D28")
			.total(" 	, isnull(sum(Z.D29), 0) as D29")
			.total(" 	, isnull(sum(Z.D30), 0) as D30")
			.total(" 	, isnull(sum(Z.D31), 0) as D31")
		;
		data.param // 쿼리문  입력
			.query(" Select s.stor_nm,")
			.query(" 	Case Z.Pay_Gb When '0100' Then '현금' When '0101' Then '은행' When '0200' Then '카드' When '0300' Then '휴대폰' When '0600' Then 'ocb' End As Pay_Gb,")
			.query(" 	Case Z.App_Gb When '0100' Then '승인' Else '취소' End App_Gb, ")
			.query(" 	Payment,  ")
			.query(" 	d01,d02,d03,d04,d05,d06,d07,d08,d09,d10, D11,D12,D13,D14,D15,D16,D17,D18,D19,D20,d21,d22,d23,d24,d25,d26,d27,d28,d29,d30,d31 ")
		;
		data.param
			.where(" FROM ( ")
			.where("	select y.stor_id, y.pay_gb, y.app_gb,								")
			.where("		SUM(Y.payment) AS payment, 										")
			.where("		SUM(CASE Y.inv_day WHEN 1 THEN Y.payment ELSE 0 END) AS D01, 	")
			.where("		SUM(CASE Y.inv_day WHEN 2 THEN Y.payment ELSE 0 END) AS D02, 	")
			.where("		SUM(CASE Y.inv_day WHEN 3 THEN Y.payment ELSE 0 END) AS D03, 	")
			.where("		SUM(CASE Y.inv_day WHEN 4 THEN Y.payment ELSE 0 END) AS D04, 	")
			.where("		SUM(CASE Y.inv_day WHEN 5 THEN Y.payment ELSE 0 END) AS D05, 	")
			.where("		SUM(CASE Y.inv_day WHEN 6 THEN Y.payment ELSE 0 END) AS D06, 	")
			.where("		SUM(CASE Y.inv_day WHEN 7 THEN Y.payment ELSE 0 END) AS D07, 	")
			.where("		SUM(CASE Y.inv_day WHEN 8 THEN Y.payment ELSE 0 END) AS D08, 	")
			.where("		SUM(CASE Y.inv_day WHEN 9 THEN Y.payment ELSE 0 END) AS D09, 	")
			.where("		SUM(CASE Y.inv_day WHEN 10 THEN Y.payment ELSE 0 END) AS D10, 	")
			.where("		SUM(CASE Y.inv_day WHEN 11 THEN Y.payment ELSE 0 END) AS D11, 	")
			.where("		SUM(CASE Y.inv_day WHEN 12 THEN Y.payment ELSE 0 END) AS D12, 	")
			.where("		SUM(CASE Y.inv_day WHEN 13 THEN Y.payment ELSE 0 END) AS D13, 	")
			.where("		SUM(CASE Y.inv_day WHEN 14 THEN Y.payment ELSE 0 END) AS D14, 	")
			.where("		SUM(CASE Y.inv_day WHEN 15 THEN Y.payment ELSE 0 END) AS D15, 	")
			.where("		SUM(CASE Y.inv_day WHEN 16 THEN Y.payment ELSE 0 END) AS D16, 	")
			.where("		SUM(CASE Y.inv_day WHEN 17 THEN Y.payment ELSE 0 END) AS D17, 	")
			.where("		SUM(CASE Y.inv_day WHEN 18 THEN Y.payment ELSE 0 END) AS D18, 	")
			.where("		SUM(CASE Y.inv_day WHEN 19 THEN Y.payment ELSE 0 END) AS D19, 	")
			.where("		SUM(CASE Y.inv_day WHEN 20 THEN Y.payment ELSE 0 END) AS D20, 	")
			.where("		SUM(CASE Y.inv_day WHEN 21 THEN Y.payment ELSE 0 END) AS D21, 	")
			.where("		SUM(CASE Y.inv_day WHEN 22 THEN Y.payment ELSE 0 END) AS D22, 	")
			.where("		SUM(CASE Y.inv_day WHEN 23 THEN Y.payment ELSE 0 END) AS D23, 	")
			.where("		SUM(CASE Y.inv_day WHEN 24 THEN Y.payment ELSE 0 END) AS D24, 	")
			.where("		SUM(CASE Y.inv_day WHEN 25 THEN Y.payment ELSE 0 END) AS D25, 	")
			.where("		SUM(CASE Y.inv_day WHEN 26 THEN Y.payment ELSE 0 END) AS D26, 	")
			.where("		SUM(CASE Y.inv_day WHEN 27 THEN Y.payment ELSE 0 END) AS D27, 	")
			.where("		SUM(CASE Y.inv_day WHEN 28 THEN Y.payment ELSE 0 END) AS D28, 	")
			.where("		SUM(CASE Y.inv_day WHEN 29 THEN Y.payment ELSE 0 END) AS D29, 	")
			.where("		SUM(CASE Y.inv_day WHEN 30 THEN Y.payment ELSE 0 END) AS D30, 	")
			.where("		SUM(CASE Y.inv_day WHEN 31 THEN Y.payment ELSE 0 END) AS D31  	")
			.where("	FROM ( 																										")
			.where("		select x.stor_id, x.pay_gb, x.app_gb, to_number(x.inv_day) as inv_day, sum(x.payment) as payment		")
			.where("		From (  																								")
			.where("			Select Store_Id, Pay_Gb, App_Gb, To_Char(To_Date(App_Dt,'yyyy-mm-dd hh24:mi:ss'),'dd') As inv_day,	")
			.where("				   Sum(Payment) As Payment 																		")
			.where("			from log_paygate a 																					")
			.where("			where a.inv_dt between :fr_dt   										", arg.fixParameter("fr_dt"))
			.where("  			and :to_dt        														", arg.fixParameter("to_dt"))
			.where("  			and a.stor_id = :stor_id    											", arg.getParameter("stor_id"))
			.where("			group by stor_id, app_gb, pay_gb ,to_char(to_date(app_dt, 'yyyy-mm-dd hh24:mi:ss'), 'dd') 			")
			.where("		) X 																									")
			.where("		group by x.stor_id, x.pay_gb, x.app_gb, x.inv_day														")
			.where("	) Y 																										")
			.where("	group by y.stor_id, y.pay_gb, y.app_gb 																	")
			.where(" ) Z join stor s on s.stor_id = z.stor_id 																	")
			.where(" order by stor_nm asc, z.pay_gb asc, z.app_gb asc 																")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/**
	 * 월별 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchMonth(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize ")
			.total(" 	, isnull(sum(Z.payment), 0) as payment")
			.total(" 	, isnull(sum(Z.M01), 0) as M01")
			.total(" 	, isnull(sum(Z.M02), 0) as M02")
			.total(" 	, isnull(sum(Z.M03), 0) as M03")
			.total(" 	, isnull(sum(Z.M04), 0) as M04")
			.total(" 	, isnull(sum(Z.M05), 0) as M05")
			.total(" 	, isnull(sum(Z.M06), 0) as M06")
			.total(" 	, isnull(sum(Z.M07), 0) as M07")
			.total(" 	, isnull(sum(Z.M08), 0) as M08")
			.total(" 	, isnull(sum(Z.M09), 0) as M09")
			.total(" 	, isnull(sum(Z.M10), 0) as M10")
			.total(" 	, isnull(sum(Z.M11), 0) as M11")
			.total(" 	, isnull(sum(Z.M12), 0) as M12")
		;
		data.param // 쿼리문  입력
			.query(" Select s.stor_nm,")
			.query(" 	Case Z.Pay_Gb When '0100' Then '현금' When '0101' Then '은행' When '0200' Then '카드' When '0300' Then '휴대폰' When '0600' Then 'ocb' End As Pay_Gb,")
			.query(" 	Case Z.App_Gb When '0100' Then '승인' Else '취소' End App_Gb, ")
			.query(" 	Payment,  ")
			.query(" 	m01,m02,m03,m04,m05,m06,m07,m08,m09,m10, m11,m12")
		;
		data.param
			.where(" FROM ( ")
			.where("	select y.stor_id, y.pay_gb, y.app_gb,								")
			.where("		SUM(Y.payment) AS payment, 										")
			.where("		SUM(CASE Y.inv_month WHEN 1 THEN Y.payment ELSE 0 END) AS M01, ")
			.where("		SUM(CASE Y.inv_month WHEN 2 THEN Y.payment ELSE 0 END) AS M02, ")
			.where("		SUM(CASE Y.inv_month WHEN 3 THEN Y.payment ELSE 0 END) AS M03, ")
			.where("		SUM(CASE Y.inv_month WHEN 4 THEN Y.payment ELSE 0 END) AS M04, ")
			.where("		SUM(CASE Y.inv_month WHEN 5 THEN Y.payment ELSE 0 END) AS M05, ")
			.where("		SUM(CASE Y.inv_month WHEN 6 THEN Y.payment ELSE 0 END) AS M06, ")
			.where("		SUM(CASE Y.inv_month WHEN 7 THEN Y.payment ELSE 0 END) AS M07, ")
			.where("		SUM(CASE Y.inv_month WHEN 8 THEN Y.payment ELSE 0 END) AS M08, ")
			.where("		SUM(CASE Y.inv_month WHEN 9 THEN Y.payment ELSE 0 END) AS M09, ")
			.where("		SUM(CASE Y.inv_month WHEN 10 THEN Y.payment ELSE 0 END) AS M10, ")
			.where("		SUM(CASE Y.inv_month WHEN 11 THEN Y.payment ELSE 0 END) AS M11, ")
			.where("		SUM(CASE Y.inv_month WHEN 12 THEN Y.payment ELSE 0 END) AS M12 ")
			.where("	FROM ( 																										")
			.where("		select x.stor_id, x.pay_gb, x.app_gb, to_number(x.inv_month) as inv_month, sum(x.payment) as payment	")
			.where("		From (  																								")
			.where("			Select Store_Id, Pay_Gb, App_Gb, To_Char(To_Date(App_Dt,'yyyy-mm-dd hh24:mi:ss'),'MM') As inv_month,")
			.where("				   Sum(Payment) As Payment 																		")
			.where("			from log_paygate a 																					")
			.where("			where a.inv_dt between :fr_dt   										", arg.fixParameter("fr_dt"))
			.where("  			and :to_dt        														", arg.fixParameter("to_dt"))
			.where("  			and a.stor_id = :stor_id    											", arg.getParameter("stor_id"))
			.where("			group by stor_id, app_gb, pay_gb ,to_char(to_date(app_dt, 'yyyy-mm-dd hh24:mi:ss'), 'MM') 			")
			.where("		) X 																									")
			.where("		group by x.stor_id, x.pay_gb, x.app_gb, x.inv_month													")
			.where("	) Y 																										")
			.where("	group by y.stor_id, y.pay_gb, y.app_gb 																	")
			.where(" ) Z join stor s on s.stor_id = z.stor_id 																	")
			.where(" order by stor_nm asc, z.pay_gb asc, z.app_gb asc 																")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/**
	 * 카드사별 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchCard(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
			.total(" 	, isnull(sum(x.app_cnt), 0) as app_cnt")
			.total(" 	, isnull(sum(x.app_amt), 0) as app_amt")
			.total(" 	, isnull(sum(x.ret_cnt), 0) as ret_cnt")
			.total(" 	, isnull(sum(x.ret_amt), 0) as ret_amt")
			.total(" 	, isnull(sum(x.tot_amt), 0) as tot_amt")
		;
		data.param // 쿼리문  입력
			.query(" select   																								")
			.query(" 	x.stor_id, x.stor_nm, x.purchase_cd, x.purchase_nm,												")
			.query(" 	x.app_cnt, x.app_amt, x.ret_cnt, x.ret_amt, x.tot_amt 												")
		;
		data.param
			.where(" from (	 																								")
			.where("	select t1.stor_id, t1.purchase_cd, t1.purchase_nm, 												")
			.where("		   sum(t1.app_cnt) as app_cnt, isnull(sum(t1.app_amt),0) as app_amt, sum(t1.ret_cnt) as ret_cnt,	")
			.where("		   isnull(sum(t1.ret_amt), 0) as ret_amt, isnull(sum(t1.tot_amt),0) as tot_amt,  						")
			.where("		   (select s.stor_nm from stor s where s.stor_id = t1.stor_id) as stor_nm  				")
			.where("	from ( 																								")
			.where("		select a.stor_id, a.purchase_cd, a.purchase_nm, a.app_gb, 										")
			.where("			   count( case when a.app_gb = '0100' then a.purchase_cd else null end ) as app_cnt, 		")
			.where("			   sum  ( case when a.app_gb = '0100' then a.payment     else null end ) as app_amt, 		")
			.where("			   count( case when a.app_gb = '0200' then a.purchase_cd else null end ) as ret_cnt, 		")
			.where("			   sum  ( case when a.app_gb = '0200' then a.payment     else null end ) as ret_amt, 		")
			.where("			   sum  ( a.payment) as tot_amt 															")
			.where("		  from log_paygate a																			")
			.where("	     where a.inv_dt between :fr_dt   									", arg.fixParameter("fr_dt"))
			.where("  		   and :to_dt        												", arg.fixParameter("to_dt"))
			.where("  		   and a.stor_id = :stor_id    									", arg.getParameter("stor_id"))
			.where("		group by a.stor_id, a.purchase_cd, a.purchase_nm, a.app_gb 									")
			.where("	) T1 																								")
			.where("	group by t1.stor_id, t1.purchase_cd, t1.purchase_nm 												")
			.where("	order by t1.purchase_cd asc, t1.stor_id asc  														")
			.where(" ) x 																									")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

}
