package com.sky.system.cust;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;


//import com.sky.data.SqlParamText;
//import com.sky.data.SqlParameter;
import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class MonthlyArRptService extends DefaultServiceHandler {

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String dt_gb  = arg.fixParamText("dt_gb" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		data.param // 집계문  입력
		.total("select count(1) as maxsize 	, sum(t1.npay_amt) as npay_amt						")
		.total("	     , sum(t3.npay_amt) 	as cust_balance")
		.total("	     , sum(t1.month01) as month01 ")
		.total("	     , sum(t1.month02) as month02 ")
		.total("	     , sum(t1.month03) as month03 ")
		.total("	     , sum(t1.month04) as month04 ")
		.total("	     , sum(t1.month05) as month05 ")
		.total("	     , sum(t1.month06) as month06 ")
		.total("	     , sum(t1.month07) as month07 ")
		.total("	     , sum(t1.month08) as month08 ")
		.total("	     , sum(t1.month09) as month09 ")
		.total("	     , sum(t1.month10) as month10 ")
		.total("	     , sum(t1.month11) as month11 ")
		.total("	     , sum(t1.month12) as month12 ")
		;
		data.param
		.query(" select  t2.cust_cd, t2.cust_nm , t2.biz_tel_no  , t3.npay_amt 	as cust_balance	")
		.query("	,    t1.* 																	")
		.query("	,    (select stor_nm from stor where stor_id = t1.stor_id) as stor_nm 	")
		;
		data.param
		.where("  from ( 																		")
		.where("	select t1.stor_grp, t1.stor_id, t1.cust_id, sum(t1.npay_amt) as npay_amt	 	")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '01' then t1.npay_amt else 0 end) as month01 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '02' then t1.npay_amt else 0 end) as month02 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '03' then t1.npay_amt else 0 end) as month03 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '04' then t1.npay_amt else 0 end) as month04 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '05' then t1.npay_amt else 0 end) as month05 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '06' then t1.npay_amt else 0 end) as month06 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '07' then t1.npay_amt else 0 end) as month07 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '08' then t1.npay_amt else 0 end) as month08 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '09' then t1.npay_amt else 0 end) as month09 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '10' then t1.npay_amt else 0 end) as month10 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '11' then t1.npay_amt else 0 end) as month11 ")
		.where("	     , sum(case substr(t1.inv_dt, 5, 2) when '12' then t1.npay_amt else 0 end) as month12 ")
		.where("	  from sale_balance    t1 													")
		.where("     where t1.stor_grp = :stor_grp   	 " , arg.fixParameter("stor_grp"))
		.where("       and t1.stor_id = :stor_id   	     " , arg.getParameter("stor_id"))
		.where("	   and t1.npay_amt <> 0 														")
		.where("       and t1.pay_dt between :fr_dt      " , fr_dt , "1".equals( dt_gb ))  // 수금예정사작일자
		.where("       	                and :to_dt     	 " , to_dt , "1".equals( dt_gb ))  // 수금예정종료일자

		.where("       and t1.inv_dt between :fr_dt      " , fr_dt , "2".equals( dt_gb ))  // 매출사작일자
		.where("           		        and :to_dt     	 " , to_dt , "2".equals( dt_gb ))  // 매출종료일자
		.where("       and t1.cust_id = :cust_id   	   	 " , arg.getParameter("cust_id"))
		.where("	 group by t1.stor_grp, t1.stor_id, t1.cust_id			 					")
		.where("	 ) t1 																		")
		.where("       join cust_mst  t2 on t1.cust_id = t2.cust_id 							")
		.where("       join cust_stor t3 on t1.stor_id = t3.stor_id 							")
		.where("                         and t1.cust_id = t3.cust_id 							")
		.where("  where t3.stor_id    = :stor_id   	   	 "		, arg.getParameter("stor_id"))
		.where("    and t3.row_sts   = :row_sts   	 	 "		, arg.getParameter("row_sts"))
		.where(" order by t2.cust_nm	, t1.stor_id	 										")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}



	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchGroup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String dt_gb  = arg.fixParamText("dt_gb" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		data.param // 집계문  입력
			.total("select count(1) as maxsize 	, sum(h1.npay_amt) as npay_amt ")
			.total("     , sum(h1.cust_balance) as cust_balance ")
			.total("	 , sum(h1.month01) as month01 ")
			.total("	 , sum(h1.month02) as month02 ")
			.total("	 , sum(h1.month03) as month03 ")
			.total("	 , sum(h1.month04) as month04 ")
			.total("	 , sum(h1.month05) as month05 ")
			.total("	 , sum(h1.month06) as month06 ")
			.total("	 , sum(h1.month07) as month07 ")
			.total("	 , sum(h1.month08) as month08 ")
			.total("	 , sum(h1.month09) as month09 ")
			.total("	 , sum(h1.month10) as month10 ")
			.total("	 , sum(h1.month11) as month11 ")
			.total("	 , sum(h1.month12) as month12 ")
		;

		data.param
		.query("select  h1.* 	")
		;

		data.param
		.where("from (  																					")
		.where("	select  t2.cust_cd, t2.cust_nm , t2.biz_tel_no  , sum(t3.npay_amt) 	as cust_balance 	")
		.where("		,    t1.stor_grp, t1.cust_id, sum(t1.npay_amt) as npay_amt 							")
		.where("		,    sum(t1.month01) as month01, sum(t1.month02) as month02, sum(t1.month03) as month03 ")
		.where("		,    sum(t1.month04) as month04, sum(t1.month05) as month05, sum(t1.month06) as month06 ")
		.where("		,    sum(t1.month07) as month07, sum(t1.month08) as month08, sum(t1.month09) as month09 ")
		.where("		,    sum(t1.month10) as month10, sum(t1.month11) as month11, sum(t1.month12) as month12 ")
		.where(" 	from (  																					")
		.where(" 			select t1.stor_grp, t1.stor_id, t1.cust_id, sum(t1.npay_amt) as npay_amt 		")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '01' then t1.npay_amt else 0 end) as month01 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '02' then t1.npay_amt else 0 end) as month02 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '03' then t1.npay_amt else 0 end) as month03 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '04' then t1.npay_amt else 0 end) as month04 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '05' then t1.npay_amt else 0 end) as month05 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '06' then t1.npay_amt else 0 end) as month06 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '07' then t1.npay_amt else 0 end) as month07 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '08' then t1.npay_amt else 0 end) as month08 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '09' then t1.npay_amt else 0 end) as month09 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '10' then t1.npay_amt else 0 end) as month10 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '11' then t1.npay_amt else 0 end) as month11 ")
		.where("	             , sum(case substr(t1.inv_dt, 5, 2) when '12' then t1.npay_amt else 0 end) as month12 ")
		.where(" 			  from sale_balance    t1 														")
		.where(" 		     where t1.stor_grp = :stor_grp   " , arg.fixParameter("stor_grp"))
		.where(" 			   and t1.npay_amt <> 0 															")
		.where("       		   and t1.pay_dt between :fr_dt  " , fr_dt , "1".equals( dt_gb ))  // 수금예정사작일자
		.where("       	        	  	         and :to_dt  " , to_dt , "1".equals( dt_gb ))  // 수금예정종료일자

		.where("       		   and t1.inv_dt between :fr_dt  " , fr_dt , "2".equals( dt_gb ))  // 매출사작일자
		.where("           		        		 and :to_dt  " , to_dt , "2".equals( dt_gb ))  // 매출종료일자
		.where("       		   and t1.cust_id = :cust_id   	   		 	"		, arg.getParameter("cust_id"))
		.where(" 			 group by t1.stor_grp, t1.stor_id, t1.cust_id 									")
		.where(" 	) t1 																					")
		.where(" 		join cust_mst  t2 on t1.cust_id = t2.cust_id 										")
		.where(" 		join cust_stor t3 on t1.stor_id = t3.stor_id 									")
		.where(" 		                  and t1.cust_id = t3.cust_id 										")
		.where(" 	where t3.row_sts   = :row_sts   	 	 "		, arg.getParameter("row_sts"))
		.where(" 	group by t2.cust_cd, t2.cust_nm , t2.biz_tel_no , t1.stor_grp, t1.cust_id 				")
		.where(" ) h1 																						")
		.where(" order by h1.cust_nm 																		")
		;


		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


}
