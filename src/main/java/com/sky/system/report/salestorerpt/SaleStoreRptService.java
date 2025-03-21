package com.sky.system.report.salestorerpt;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class SaleStoreRptService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.txfree_amt) as txfree_amt ")
			.total("      ,sum(t2.taxtn_amt) as taxtn_amt ")
			.total("      ,sum(t2.tax_amt)      as tax_amt      ")
			.total("      ,sum(t2.sply_amt) as sply_amt ")
			.total("      ,sum(t2.inv_amt)   as inv_amt   ")
			.total("      ,sum(t2.fee_amt)   as fee_amt   ")
			.total("      ,sum(t2.colt_schd_amt)  as colt_schd_amt  ")
			.total("      ,sum(t2.payment)  as payment  ")
			.total("      ,sum(t2.npay_amt)  as npay_amt  ")
		;
		data.param
		    .query("select  t1.stor_id, t1.stor_nm as stor_nm   									")
		    .query("   ,    t2.txfree_amt, t2.taxtn_amt, t2.tax_amt    , t2.sply_amt , t2.inv_amt  				")
			.query("   ,    t2.fee_amt  , t2.colt_schd_amt , t2.payment, t2.npay_amt   							")
			.query("   ,    case sum(t2.colt_schd_amt) over (partition by t2.stor_grp) when 0 then 0  				")
			.query("             else round(abs(t2.colt_schd_amt)/sum(abs(t2.colt_schd_amt)) over (partition by t2.stor_grp), 3)*100 end as payable_rate   ")
			.query("   ,    case sum(t2.payment) over (partition by t2.stor_grp) when 0 then 0   				")
			.query("             else round(abs(t2.payment)/sum(abs(t2.payment)) over (partition by t2.stor_grp), 3)*100 end as payment_rate   ")
			.query("   ,    case sum(t2.npay_amt) over (partition by t2.stor_grp) when 0 then 0   				")
			.query("             else round(abs(t2.npay_amt)/sum(abs(t2.npay_amt)) over (partition by t2.stor_grp), 3)*100 end as balance_rate   ")
		;

		data.param
			.where("from    stor t1,    																")
			.where("        ( select  											   						")
			.where("                  t1.stor_grp, t1.stor_id   										")
			.where("               ,  sum(t1.txfree_amt ) as txfree_amt 									")
			.where("               ,  sum(t1.taxtn_amt ) as taxtn_amt	, sum(t1.tax_amt)       as tax_amt  		")
			.where("               ,  sum(t1.sply_amt ) as sply_amt , sum(t1.inv_amt   ) as inv_amt   	")
			.where("               ,  sum(t1.payment  ) as payment  , sum(t1.npay_amt  ) as npay_amt  	")
			.where("               ,  sum(0  ) as colt_schd_amt  , sum(0   ) as fee_amt   			")
			.where("          from    sale_mst t1												    	")
			.where("          where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 	))
			.where("          and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 	))
			.where("          and     t1.inv_dt between :fr_dt      " , fr_dt                            )  // 매출시작일자
			.where("                                and :to_dt      " , to_dt                            )  // 매출종료일자
		   	.where("		  and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0) ) /* 주문 위치 */
			.where("          and     t1.row_sts = 0    										    	")
			.where("          group by t1.stor_grp, t1.stor_id   										")
			.where("        ) t2  																		")
			.where("where   t1.stor_id = t2.stor_id   												")
			.where("order by t1.stor_id		   														")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 */
	public SqlResultMap getSearchTime(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt) as inv_amt ")
			.total("      ,sum(t2.time0)  as time0  ")
			.total("      ,sum(t2.time1)  as time1  ")
			.total("      ,sum(t2.time2)  as time2  ")
			.total("      ,sum(t2.time3)  as time3  ")
			.total("      ,sum(t2.time4)  as time4  ")
			.total("      ,sum(t2.time5)  as time5  ")
			.total("      ,sum(t2.time6)  as time6  ")
			.total("      ,sum(t2.time7)  as time7  ")
			.total("      ,sum(t2.time8)  as time8  ")
			.total("      ,sum(t2.time9)  as time9  ")
			.total("      ,sum(t2.time10) as time10 ")
			.total("      ,sum(t2.time11) as time11 ")
			.total("      ,sum(t2.time12) as time12 ")
			.total("      ,sum(t2.time13) as time13 ")
			.total("      ,sum(t2.time14) as time14 ")
			.total("      ,sum(t2.time15) as time15 ")
			.total("      ,sum(t2.time16) as time16 ")
			.total("      ,sum(t2.time17) as time17 ")
			.total("      ,sum(t2.time18) as time18 ")
			.total("      ,sum(t2.time19) as time19 ")
			.total("      ,sum(t2.time20) as time20 ")
			.total("      ,sum(t2.time21) as time21 ")
			.total("      ,sum(t2.time22) as time22 ")
			.total("      ,sum(t2.time23) as time23 ")
		;
		data.param
	        .query("select  t1.stor_nm , t2.*  																	")
		;
		data.param
			.where("from    stor t1, (  																			")
		    .where("                select  																		")
		    .where("                        t1.stor_grp, t1.stor_id  												")
		    .where("                    ,   sum(t1.inv_amt) as inv_amt  												")
		    .where("                    ,   sum(case when substring(t1.crt_dttm, 9, 2) = '00' then t1.inv_amt else 0 end ) as time0  	")
		    .where("                    ,   sum(case when substring(t1.crt_dttm, 9, 2) = '01' then t1.inv_amt else 0 end ) as time1  	")
		    .where(" 					,   sum(case when substring(t1.crt_dttm, 9, 2) = '02' then t1.inv_amt else 0 end ) as time2  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '03' then t1.inv_amt else 0 end ) as time3  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '04' then t1.inv_amt else 0 end ) as time4  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '05' then t1.inv_amt else 0 end ) as time5  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '06' then t1.inv_amt else 0 end ) as time6  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '07' then t1.inv_amt else 0 end ) as time7  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '08' then t1.inv_amt else 0 end ) as time8  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '09' then t1.inv_amt else 0 end ) as time9  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '10' then t1.inv_amt else 0 end ) as time10 	")
		    .where("					,	sum(case when substring(t1.crt_dttm, 9, 2) = '11' then t1.inv_amt else 0 end ) as time11  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '12' then t1.inv_amt else 0 end ) as time12  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '13' then t1.inv_amt else 0 end ) as time13  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '14' then t1.inv_amt else 0 end ) as time14  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '15' then t1.inv_amt else 0 end ) as time15  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '16' then t1.inv_amt else 0 end ) as time16  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '17' then t1.inv_amt else 0 end ) as time17  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '18' then t1.inv_amt else 0 end ) as time18  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '19' then t1.inv_amt else 0 end ) as time19  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '20' then t1.inv_amt else 0 end ) as time20  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '21' then t1.inv_amt else 0 end ) as time21  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '22' then t1.inv_amt else 0 end ) as time22  	")
		    .where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '23' then t1.inv_amt else 0 end ) as time23  	")
		    .where("      		 	from    sale_mst t1  															")
			.where("   		        where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 	))
		    .where(" 		        and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
		    .where("          		and     t1.inv_dt between :fr_dt       " , fr_dt                                 )  // 매출시작일자
		    .where("                    		          and :to_dt       " , to_dt                                 )  // 매출종료일자
			.where("			    and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0) ) /* 주문 위치 */
			.where("  				and     t1.row_sts     = 0    												")
		    .where(" 				group by t1.stor_grp, t1.stor_id  												")
		    .where(" 				) t2  																			")
		    .where(" where    t1.stor_id = t2.stor_id  															")
		    .where(" order by t1.stor_id  																			")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * 요일별 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchWeek(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

//		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt) as inv_amt ")
			.total("      ,sum(t2.week1)  as week1  ")
			.total("      ,sum(t2.week2)  as week2  ")
			.total("      ,sum(t2.week3)  as week3  ")
			.total("      ,sum(t2.week4)  as week4  ")
			.total("      ,sum(t2.week5)  as week5  ")
			.total("      ,sum(t2.week6)  as week6  ")
			.total("      ,sum(t2.week7)  as week7  ")
		;
		data.param
	    	.query("select  t1.stor_nm , t2.*   																	")
	    ;

		data.param
	    	.where("from    stor t1, (  																			")
	    	.where("                 select  											 							")
	    	.where("            			 t1.stor_grp, t1.stor_id  												")
	    	.where("           			  ,  sum(t1.inv_amt) as inv_amt												")
//	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '1', t1.inv_amt, 0)) as week1  ")
//	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '2', t1.inv_amt, 0)) as week2  ")
//	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '3', t1.inv_amt, 0)) as week3  ")
//	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '4', t1.inv_amt, 0)) as week4  ")
//	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '5', t1.inv_amt, 0)) as week5  ")
//	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '6', t1.inv_amt, 0)) as week6  ")
//	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '7', t1.inv_amt, 0)) as week7  ")
	    	.where(" 					  ,  sum(case when datepart(weekday,t1.inv_dt) = '1', t1.inv_amt else 0 end ) as week1  ")
	    	.where(" 					  ,  sum(case when datepart(weekday,t1.inv_dt) = '2', t1.inv_amt else 0 end ) as week2  ")
	    	.where(" 					  ,  sum(case when datepart(weekday,t1.inv_dt) = '3', t1.inv_amt else 0 end ) as week3  ")
	    	.where(" 					  ,  sum(case when datepart(weekday,t1.inv_dt) = '4', t1.inv_amt else 0 end ) as week4  ")
	    	.where(" 					  ,  sum(case when datepart(weekday,t1.inv_dt) = '5', t1.inv_amt else 0 end ) as week5  ")
	    	.where(" 					  ,  sum(case when datepart(weekday,t1.inv_dt) = '6', t1.inv_amt else 0 end ) as week6  ")
	    	.where(" 					  ,  sum(case when datepart(weekday,t1.inv_dt) = '7', t1.inv_amt else 0 end ) as week7  ")
	    	.where("       			from 	sale_mst t1  															")
			.where(" 		        where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 	))
		    .where(" 		        and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
		    .where("          		and     t1.inv_dt between :fr_dt       " , fr_dt                                 )  // 매출시작일자
		    .where("                    		          and :to_dt       " , to_dt                                 )  // 매출종료일자
			.where("			    and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0) ) /* 주문 위치 */
			.where("  				and     t1.row_sts     = 0         											")
		    .where(" 				group by t1.stor_grp, t1.stor_id  												")
	    	.where("  		) t2  																					")
	    	.where(" where t1.stor_id = t2.stor_id  																")
	    	.where(" order by t1.stor_id  																			")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 요일별 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchDay(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

//		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt) as inv_amt ")
			.total("      ,sum(t2.date1)  as date1  ")
			.total("      ,sum(t2.date2)  as date2  ")
			.total("      ,sum(t2.date3)  as date3  ")
			.total("      ,sum(t2.date4)  as date4  ")
			.total("      ,sum(t2.date5)  as date5  ")
			.total("      ,sum(t2.date6)  as date6  ")
			.total("      ,sum(t2.date7)  as date7  ")
			.total("      ,sum(t2.date8)  as date8  ")
			.total("      ,sum(t2.date9)  as date9  ")
			.total("      ,sum(t2.date10) as date10 ")
			.total("      ,sum(t2.date11) as date11 ")
			.total("      ,sum(t2.date12) as date12 ")
			.total("      ,sum(t2.date13) as date13 ")
			.total("      ,sum(t2.date14) as date14 ")
			.total("      ,sum(t2.date15) as date15 ")
			.total("      ,sum(t2.date16) as date16 ")
			.total("      ,sum(t2.date17) as date17 ")
			.total("      ,sum(t2.date18) as date18 ")
			.total("      ,sum(t2.date19) as date19 ")
			.total("      ,sum(t2.date20) as date20 ")
			.total("      ,sum(t2.date21) as date21 ")
			.total("      ,sum(t2.date22) as date22 ")
			.total("      ,sum(t2.date23) as date23 ")
			.total("      ,sum(t2.date24) as date24 ")
			.total("      ,sum(t2.date25) as date25 ")
			.total("      ,sum(t2.date26) as date26 ")
			.total("      ,sum(t2.date27) as date27 ")
			.total("      ,sum(t2.date28) as date28 ")
			.total("      ,sum(t2.date29) as date29 ")
			.total("      ,sum(t2.date30) as date30 ")
			.total("      ,sum(t2.date31) as date31 ")
		;
		data.param
    		.query("select  t1.stor_nm, t2.*  																		")
    	;

		data.param
			.where("from    stor t1, (  																			")
    		.where("     			select  											  							")
    		.where("            			t1.stor_grp, t1.stor_id  												")
    		.where("           			,   sum(t1.inv_amt) as inv_amt  												")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '01' then t1.inv_amt else 0 end) as date1                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '02' then t1.inv_amt else 0 end) as date2                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '03' then t1.inv_amt else 0 end) as date3                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '04' then t1.inv_amt else 0 end) as date4                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '05' then t1.inv_amt else 0 end) as date5                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '06' then t1.inv_amt else 0 end) as date6                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '07' then t1.inv_amt else 0 end) as date7                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '08' then t1.inv_amt else 0 end) as date8                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '09' then t1.inv_amt else 0 end) as date9                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '10' then t1.inv_amt else 0 end) as date10                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '11' then t1.inv_amt else 0 end) as date11                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '12' then t1.inv_amt else 0 end) as date12                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '13' then t1.inv_amt else 0 end) as date13                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '14' then t1.inv_amt else 0 end) as date14                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '15' then t1.inv_amt else 0 end) as date15                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '16' then t1.inv_amt else 0 end) as date16                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '17' then t1.inv_amt else 0 end) as date17                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '18' then t1.inv_amt else 0 end) as date18                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '19' then t1.inv_amt else 0 end) as date19                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '20' then t1.inv_amt else 0 end) as date20                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '21' then t1.inv_amt else 0 end) as date21                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '22' then t1.inv_amt else 0 end) as date22                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '23' then t1.inv_amt else 0 end) as date23                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '24' then t1.inv_amt else 0 end) as date24                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '25' then t1.inv_amt else 0 end) as date25                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '26' then t1.inv_amt else 0 end) as date26                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '27' then t1.inv_amt else 0 end) as date27                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '28' then t1.inv_amt else 0 end) as date28                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '29' then t1.inv_amt else 0 end) as date29                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '30' then t1.inv_amt else 0 end) as date30                 ")
			.where("             ,sum(case when substring(t1.inv_dt, 7, 2) = '31' then t1.inv_amt else 0 end) as date31                 ")
    		.where("       			from    sale_mst t1  ")
			.where("   		        where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 	))
    		.where(" 		        and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
		    .where("          		and     t1.inv_dt between :fr_dt       " , fr_dt                                 )  // 매출시작일자
		    .where("                    		          and :to_dt       " , to_dt                                 )  // 매출종료일자
    		.where("			    and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0) ) /* 주문 위치 */
    		.where("  				and     t1.row_sts = 0         												")
    		.where("      			group by t1.stor_grp, t1.stor_id  												")
    		.where("   			 ) t2  																				")
    		.where(" where   t1.stor_id = t2.stor_id  															")
    		.where(" order by t1.stor_id  																			")
    	;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 월별 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchMonth(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

//		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt)  as inv_amt  ")
			.total("      ,sum(t2.month1)  as month1  ")
			.total("      ,sum(t2.month2)  as month2  ")
			.total("      ,sum(t2.month3)  as month3  ")
			.total("      ,sum(t2.month4)  as month4  ")
			.total("      ,sum(t2.month5)  as month5  ")
			.total("      ,sum(t2.month6)  as month6  ")
			.total("      ,sum(t2.month7)  as month7  ")
			.total("      ,sum(t2.month8)  as month8  ")
			.total("      ,sum(t2.month9)  as month9  ")
			.total("      ,sum(t2.month10) as month10 ")
			.total("      ,sum(t2.month11) as month11 ")
			.total("      ,sum(t2.month12) as month12 ")
		;

		data.param
			.query("select  t1.stor_nm, t2.*  																		")
		;

		data.param
		    .where("from    stor t1, (  																			")
		    .where("     			select 												 							")
		    .where("            			t1.stor_grp, t1.stor_id  												")
		    .where("           			,   sum(t1.inv_amt) as inv_amt  												")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '01' then  t1.inv_amt else 0 end ) as month1              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '02' then  t1.inv_amt else 0 end ) as month2              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '03' then  t1.inv_amt else 0 end ) as month3              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '04' then  t1.inv_amt else 0 end ) as month4              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '05' then  t1.inv_amt else 0 end ) as month5              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '06' then  t1.inv_amt else 0 end ) as month6              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '07' then  t1.inv_amt else 0 end ) as month7              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '08' then  t1.inv_amt else 0 end ) as month8              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '09' then  t1.inv_amt else 0 end ) as month9              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '10' then  t1.inv_amt else 0 end ) as month10              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '11' then  t1.inv_amt else 0 end ) as month11              ")
			.where("             ,sum(case when substring(t1.inv_dt, 5, 2) = '12' then  t1.inv_amt else 0 end ) as month12              ")
		    .where("       			from 	sale_mst t1  															")
			.where(" 		        where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 	))
    		.where(" 		        and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
		    .where("          		and     t1.inv_dt between :fr_dt       " , fr_dt                                 )  // 매출시작일자
		    .where("                    		          and :to_dt       " , to_dt                                 )  // 매출종료일자
    		.where("			    and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0) ) /* 주문 위치 */
    		.where("  				and     t1.row_sts  = 0       												")
		    .where("      			group by t1.stor_grp, t1.stor_id  												")
		    .where("    	) t2  																					")
		    .where("where  t1.stor_id = t2.stor_id  																")
		    .where("order by t1.stor_id  																			")
    	;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}