package com.sky.system.cust;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;


//import com.sky.data.SqlParamText;
//import com.sky.data.SqlParameter;
import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class LongTermArListService extends DefaultServiceHandler {

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String dt_gb = arg.fixParamText("dt_gb" ); // 날짜. 0: 전체, 1:등록일, 2.수정일

		String balance_gb = arg.fixParamText("balance_gb" ); // 현미수 여부 true : 현미수 0 제외


	 	data.param // 날짜 구하기
//		 	.query("select 																								")
//		 	.query(" 		to_char(add_months( to_date( :fr_dt , 'YYYYMM')    , 00) , 'YYYYMMDD' )  		as dt01_fr 	")
//		 	.query("	  , to_char(last_day( to_date( 	 :fr_dt , 'YYYYMM') )    , 'YYYYMMDD' )  			as dt01_to 	")
//		 	.query(" 	  ,	to_char(add_months( to_date( :fr_dt , 'YYYYMM')    , -01) , 'YYYYMMDD' )  		as dt02_fr 	")
//		 	.query(" 	  ,	to_char(add_months( last_day(to_date( :fr_dt , 'YYYYMM')) , -01) , 'YYYYMMDD' ) as dt02_to 	")
//		 	.query("	  ,	to_char(add_months( to_date( :fr_dt , 'YYYYMM')    , -02) , 'YYYYMMDD' )  		as dt03_fr 	")
//		 	.query("      ,	to_char(add_months( last_day(to_date( :fr_dt , 'YYYYMM')) , -02) , 'YYYYMMDD' ) as dt03_to 	")
//
//		 	.query("      , to_char(add_months( to_date( :fr_dt , 'YYYYMM')    , -05) , 'YYYYMMDD' )  		as dt06_fr 	")
//		 	.query("      , to_char(add_months( last_day(to_date( :fr_dt , 'YYYYMM')) , -03) , 'YYYYMMDD' ) as dt06_to 	")
//
//		 	.query("      , to_char(add_months( to_date( :fr_dt , 'YYYYMM')    , -11) , 'YYYYMMDD' )  		as dt12_fr 	")
//		 	.query("      , to_char(add_months( last_day(to_date( :fr_dt , 'YYYYMM')) , -06) , 'YYYYMMDD' ) as dt12_to 	")
//		 	.query(" from dual 																							")
		 	.query("select   convert(char(8), dateadd(mm,+0,:fr_dt),112) as dt01_fr                                                                 ")
		 	.query("       , convert(char(8),DATEADD(day, -1,DATEADD(MONTH, 1,convert(char(6), dateadd(mm,-0,:fr_dt),112) +'01')),112) as dt01_to   ")
		 	.query("       , convert(char(6), dateadd(mm,-1,:fr_dt),112) +'01'as dt02_fr                                                            ")
		 	.query("       , convert(char(8),DATEADD(day, -1,DATEADD(MONTH, 1,convert(char(6), dateadd(mm,-1,:fr_dt),112) +'01')),112) as dt02_to   ")
		 	.query("       , convert(char(6), dateadd(mm,-2,:fr_dt),112) +'01'as dt03_fr                                                            ")
		 	.query("       , convert(char(8),DATEADD(day, -1,DATEADD(MONTH, 1,convert(char(6), dateadd(mm,-2,:fr_dt),112) +'01')),112) as dt03_to   ")
		 	.query("       , convert(char(6), dateadd(mm,-5,:fr_dt),112) +'01'as dt06_fr                                                            ")
		 	.query("       , convert(char(8),DATEADD(day, -1,DATEADD(MONTH, 1,convert(char(6), dateadd(mm,-5,:fr_dt),112) +'01')),112) as dt06_to   ")
		 	.query("       , convert(char(6), dateadd(mm,-11,:fr_dt),112) +'01'as dt12_fr                                                           ")
		 	.query("       , convert(char(8),DATEADD(day, -1,DATEADD(MONTH, 1,convert(char(6), dateadd(mm,-11,:fr_dt),112) +'01')),112) as dt12_to  ")
	 		.assign("fr_dt" , arg.fixParameter("fr_dt" ) )
	 		;
	 	SqlResultRow day = data.selectForRow();

	 	data.clear();
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("       , sum(x.balance_safe) as balance_safe, sum(c.npay_amt) as balance_cust      ")
			.total("       , sum(x.balance_dt01) as balance_dt01, sum(x.balance_dt02) as balance_dt02 ")
			.total("       , sum(x.balance_dt03) as balance_dt03, sum(x.balance_dt06) as balance_dt06 ")
			.total("	   , sum(x.balance_dt12) as balance_dt12, sum(x.balance_dt13) as balance_dt13 ")
			.total("       , sum(x.balance_total) as balance_total  								  ")
		;
		data.param // 집계문  입력
			.query(" select x.balance_safe, x.balance_dt01 , x.balance_dt02 , x.balance_dt03 , x.balance_dt06 , x.balance_dt12, x.balance_dt13 ")
			.query("      , x.cust_id , y.cust_nm , y.cust_gb , c.npay_amt as balance_cust , x.balance_total 						")
			.query("      , y.biz_tel_no , z.salesman_id  																			")
			.query("      , (select emp_nm from usr_mst where stor_grp = z.stor_grp and emp_id = z.salesman_id ) as salesman_nm ")
		;
		data.param // 쿼리문  입력
			.where(" from (                  ")
			.where("      select   a.cust_id ")
		;
		if ("1".equals( dt_gb) ){
			data.param // 쿼리문  입력
				.where("           ,   sum( case when a.pay_dt       > :dt01_to then  a.npay_amt  else 0 end) as balance_safe  ")
				.where("           ,   sum( case when a.pay_dt      <= :dt01_to then  a.npay_amt  else 0 end) as balance_total  ")
				.where("           ,   sum( case when a.pay_dt between :dt01_fr and  :dt01_to   then  a.npay_amt  else 0 end) as balance_dt01 ")
				.where("           ,   sum( case when a.pay_dt between :dt02_fr and  :dt02_to    then  a.npay_amt  else 0 end) as balance_dt02 ")
				.where("           ,   sum( case when a.pay_dt between :dt03_fr and  :dt03_to    then  a.npay_amt  else 0 end) as balance_dt03 ")
				.where("           ,   sum( case when a.pay_dt between :dt06_fr and  :dt06_to  then  a.npay_amt  else 0 end) as balance_dt06 ")
				.where("           ,   sum( case when a.pay_dt between :dt12_fr and  :dt12_to  then  a.npay_amt  else 0 end) as balance_dt12 ")
				.where("           ,   sum( case when a.pay_dt      <  :dt12_fr then  a.npay_amt  else 0 end) as balance_dt13   ")
			;
		} else {
			data.param // 쿼리문  입력
				.where("           ,   sum( case when a.inv_dt       > :dt01_to then  a.npay_amt  else 0 end) as balance_safe  ")
				.where("           ,   sum( case when a.inv_dt      <= :dt01_to then  a.npay_amt  else 0 end) as balance_total  ")
				.where("           ,   sum( case when a.inv_dt between :dt01_fr and  :dt01_to   then  a.npay_amt  else 0 end) as balance_dt01 ")
				.where("           ,   sum( case when a.inv_dt between :dt02_fr and  :dt02_to    then  a.npay_amt  else 0 end) as balance_dt02 ")
				.where("           ,   sum( case when a.inv_dt between :dt03_fr and  :dt03_to    then  a.npay_amt  else 0 end) as balance_dt03 ")
				.where("           ,   sum( case when a.inv_dt between :dt06_fr and  :dt06_to  then  a.npay_amt  else 0 end) as balance_dt06 ")
				.where("           ,   sum( case when a.inv_dt between :dt12_fr and  :dt12_to  then  a.npay_amt  else 0 end) as balance_dt12 ")
				.where("           ,   sum( case when a.inv_dt      <  :dt12_fr then  a.npay_amt  else 0 end) as balance_dt13   ")
			;
		}
		data.param // 쿼리문  입력
			.where("      from     sale_balance  a  										")
			.where("      where    a.stor_grp = :stor_grp " , arg.fixParameter("stor_grp"  	))
			.where("      and      a.stor_id = :stor_id " , arg.getParameter("stor_id"  	))
			.where("      and      a.cust_id  = :cust_id  " , arg.getParameter("cust_id"    ))
			.where("      group by a.cust_id												")
			.where("  ) x  																	")
			.where("  join cust_mst y    on y.cust_id  = x.cust_id   						")
			.where("  join cust_stor z  on  z.stor_id = y.owner_id   and z.cust_id  = y.cust_id  ")
			.where("       and z.salesman_id  	= :salesman_id  " , arg.getParameter("salesman_id"))
			.where("  join (select cust_id                        							")
			.where("              ,sum(npay_amt) as npay_amt         							")
			.where("          from cust_stor                     							")
			.where("         where stor_grp =  :stor_grp " , arg.fixParameter("stor_grp"  	))
			.where("           and stor_id  =  :stor_id  " , arg.getParameter("stor_id"  	))
			.where("           and cust_id  =  :cust_id  " , arg.getParameter("cust_id"      ))
			.where("		   and npay_amt <> :npay_amt " , 0 , "true".equals( balance_gb ) ) // 미수금 있을 경우
			.where("         group by cust_id) c on c.cust_id  = x.cust_id               	")
			.where(" order by y.cust_nm                           							")

			.assign("dt01_fr", day.fixParameter("dt01_fr"))
			.assign("dt01_to", day.fixParameter("dt01_to"))
			.assign("dt02_fr", day.fixParameter("dt02_fr"))
			.assign("dt02_to", day.fixParameter("dt02_to"))
			.assign("dt03_fr", day.fixParameter("dt03_fr"))
			.assign("dt03_to", day.fixParameter("dt03_to"))
			.assign("dt06_fr", day.fixParameter("dt06_fr"))
			.assign("dt06_to", day.fixParameter("dt06_to"))
			.assign("dt12_fr", day.fixParameter("dt12_fr"))
			.assign("dt12_to", day.fixParameter("dt12_to"))
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}



	/**
	 * detail 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg, int page , int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("       , sum(a.payable) as payable, sum(a.payment) as payment, sum(a.npay_amt) as npay_amt ")
		;
		data.param // 쿼리문  입력
			.query("select  a.inv_no 						")
			.query("	, 	s.stor_nm 						")
			.query("	, 	a.inv_dt 						")
			.query("	, 	a.pay_dt 						")
			.query("	, 	a.payable 						")
			.query("	, 	a.payment 						")
			.query("	, 	a.npay_amt 						")
		;
		data.param
			.where("  from  sale_balance   a 				")
			.where("        left outer join stor s on s.stor_id = a.stor_id ")
			.where(" where  a.cust_id  = :cust_id     ", arg.fixParameter("cust_id"))
			.where("   and  a.stor_id = :stor_id    ", arg.getParameter("stor_id"))
			.where("   and  a.row_sts = 0					")
			.where(" order by a.inv_dt , a.inv_no 			")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}




}
