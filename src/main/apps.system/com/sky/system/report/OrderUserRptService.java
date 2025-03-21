package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class OrderUserRptService  extends DefaultServiceHandler {

	/**
	 * 사업장별 현황조회
	 * @param arg
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
			.total("      ,sum(t2.tax_free) as tax_free ")
			.total("      ,sum(t2.sply_amt) as sply_amt ")
			.total("      ,sum(t2.tax)      as tax      ")
			.total("      ,sum(t2.amount)   as amount   ")
			.total("      ,sum(t2.charge)   as charge   ")
			.total("      ,sum(t2.payable)  as payable  ")
			.total("      ,sum(t2.payment)  as payment  ")
			.total("      ,sum(t2.npay_amt)  as npay_amt  ")
		;
		data.param // 쿼리문  입력
			
		    .query("select  t1.login_id  , t1.emp_nm 																")
			.query("	,	t2.tax_free , t2.sply_amt , t2.tax     , t2.amount				 						")
			.query("	,	t2.charge   , t2.payable  , t2.payment , t2.npay_amt 									")
			.query("	,	decode(sum(t2.payable) over (partition by t2.stor_grp), 0, 0 							")
			.query("	,	round(abs(t2.payable)/sum(abs(t2.payable)) over (partition by t2.stor_grp), 3)*100) as payable_rate ")

			.query("	,	decode(sum(t2.payment) over (partition by t2.stor_grp), 0, 0 							")
			.query("	,	round(abs(t2.payment)/sum(abs(t2.payment)) over (partition by t2.stor_grp), 3)*100) as payment_rate ")

			.query("	,	decode(sum(t2.npay_amt) over (partition by t2.stor_grp), 0, 0 							")
			.query("	,	round(abs(t2.npay_amt)/sum(abs(t2.npay_amt)) over (partition by t2.stor_grp), 3)*100) as balance_rate ")

		;
		data.param
			.where("from	( 																		")
			.where(" 			select 																		")
			.where("        			t1.stor_grp, t1.salesman_id 										")
			.where("       			,	sum(t1.tax_free) as tax_free , sum(t1.sply_amt) as sply_amt 		")
			.where("       			,	sum(t1.tax) as tax 			 , sum(t1.amount )  as amount 			")
			.where("       			,	sum(t1.payment ) as payment  , sum(t1.npay_amt ) as npay_amt 			")
			.where("       			,	sum(t1.payable ) as payable  , sum(t1.charge )  as charge 			")
			.where("   			from	order_mst t1 														")
//            .where("					join usr_mst t3 on t1.salesman_id = t3.emp_id 					")
//            .where("					                 and t1.stor_grp = t3.stor_grp 						")
			.where("          	where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 	))
			.where("          	and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 	))
			.where("          	and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자 
			.where("          	                      and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자 
	
			.where("          	and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자 
			.where("            	                  and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자 
	
			.where("          	and     t1.ret_yn     = :ret_yn   	" , arg.getParameter("ret_yn"   		)) /* 반품 여부 */
				
		    .where("		 	and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
	
			.where("          	and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  )) /* 영업담당 */
			.where("          	and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  )) /* 영업부서 */
      		.where("			and 	t3.jobcl_id  	= :inv_rank_id 	" , arg.getParameter("inv_rank_id"  )) /* 직급 */
			.where("  			and     t1.sts_cd     > '0100'  											")
			.where("            and     t1.row_sts = 0 				                                    ")
				
			.where("  			group by t1.stor_grp, t1.salesman_id										")
			.where(" 		) t2 left outer join usr_mst t1	on t1.emp_id = t2.salesman_id				")
//			.where(" where  t1.emp_id(+) = t2.salesman_id 													")
			.where(" order by t1.login_id 																	")
		;	
	
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
		
	}

	
	/**
	 * 시간대별 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchTime(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.amount) as amount ")
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
		data.param // 쿼리문  입력
		    .query("select  t1.login_id, t1.emp_nm, t2.*															")
		;
		data.param
		    .where("from    usr_mst t1, (  																		")
		    .where("                select  											  							")
		    .where("                        t1.stor_grp, t1.salesman_id												")
		    .where("                    ,   sum(t1.amount) as amount  												")
		    .where("                    ,   sum(decode(substr(t1.crt_dttm, 9, 2), '00', t1.amount, 0)) as time0  	")
		    .where("                    ,   sum(decode(substr(t1.crt_dttm, 9, 2), '01', t1.amount, 0)) as time1  	")
		    .where(" 					,   sum(decode(substr(t1.crt_dttm, 9, 2), '02', t1.amount, 0)) as time2  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '03', t1.amount, 0)) as time3  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '04', t1.amount, 0)) as time4  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '05', t1.amount, 0)) as time5  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '06', t1.amount, 0)) as time6  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '07', t1.amount, 0)) as time7  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '08', t1.amount, 0)) as time8  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '09', t1.amount, 0)) as time9  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '10', t1.amount, 0)) as time10 	")
		    .where("					,	sum(decode(substr(t1.crt_dttm, 9, 2), '11', t1.amount, 0)) as time11  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '12', t1.amount, 0)) as time12  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '13', t1.amount, 0)) as time13  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '14', t1.amount, 0)) as time14  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '15', t1.amount, 0)) as time15  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '16', t1.amount, 0)) as time16  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '17', t1.amount, 0)) as time17  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '18', t1.amount, 0)) as time18  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '19', t1.amount, 0)) as time19  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '20', t1.amount, 0)) as time20  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '21', t1.amount, 0)) as time21  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '22', t1.amount, 0)) as time22  	")
		    .where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '23', t1.amount, 0)) as time23  	")
		    .where("      		 	from    order_mst t1  															")
            .where("							join usr_mst t3 on t1.salesman_id = t3.emp_id 					")
            .where("							                 and t1.stor_grp = t3.stor_grp 						")
			.where("   		        where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
		    .where(" 		        and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))  
		    .where("          		and     t1.inv_dt between :fr_dt       " , fr_dt , "1".equals( inv_po_term 		))  // 배송예정사작일자 
		    .where("                    		          and :to_dt       " , to_dt , "1".equals( inv_po_term 		))  // 배송예정종료일자 
	
		    .where("          		and     t1.ori_dt between :fr_dt       " , fr_dt , "2".equals( inv_po_term 		))  // 주문사작일자 
		    .where("                                	  and :to_dt       " , to_dt , "2".equals( inv_po_term 		))  // 주문종료일자 
	
			.where(" 		        and     t1.ret_yn     = :ret_yn   	   " , arg.getParameter("ret_yn"            ))  /* 반품 여부 */
		    	
			.where("			    and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
	
			.where("          		and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          		and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */
      		.where("				and 	t3.jobcl_id  	= :inv_rank_id 	" , arg.getParameter("inv_rank_id"  	)) /* 직급 */
			    
			.where("  				and     t1.sts_cd     > '0100'  												")
			.where("                and     t1.row_sts = 0 				                                        ")
//		    .where("  				and     ( t1.inv_work_id  = '1'  												")
//		    .where("						 or  t1.inv_work_id  = '2'  											")
//		    .where("						 or  t1.inv_work_id  = '3'  											")
//		    .where("						 or  t1.inv_work_id  = '4'  											")
//		    .where("  						)  																		")
		    .where(" 				group by t1.stor_grp, t1.salesman_id											")
		    .where(" 				) t2  																			")
		    .where(" where    t1.emp_id(+) = t2.salesman_id														")
		    .where(" order by t1.login_id  																			")
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
	public SqlResultMap getSearchWeek(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.amount) as amount ")
			.total("      ,sum(t2.week1)  as week1  ")
			.total("      ,sum(t2.week2)  as week2  ")
			.total("      ,sum(t2.week3)  as week3  ")
			.total("      ,sum(t2.week4)  as week4  ")
			.total("      ,sum(t2.week5)  as week5  ")
			.total("      ,sum(t2.week6)  as week6  ")
			.total("      ,sum(t2.week7)  as week7  ")
		;
		data.param // 쿼리문  입력
			
	    	.query("select  t1.login_id, t1.emp_nm, t2.*  															")
		;
		data.param
	    	.where("from    usr_mst t1, (  																		")
	    	.where("                 select  											 							")
	    	.where("            			 t1.stor_grp, t1.salesman_id  											")
	    	.where("           			  ,  sum(t1.amount) as amount												")
	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '1', t1.amount, 0)) as week1  ")
	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '2', t1.amount, 0)) as week2  ")
	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '3', t1.amount, 0)) as week3  ")
	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '4', t1.amount, 0)) as week4  ")
	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '5', t1.amount, 0)) as week5  ")
	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '6', t1.amount, 0)) as week6  ")
	    	.where(" 					  ,  sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '7', t1.amount, 0)) as week7  ")
	    	.where("       			from 	order_mst t1  															")
            .where("							join usr_mst t3 on t1.salesman_id = t3.emp_id 					")
            .where("							                 and t1.stor_grp = t3.stor_grp 						")
			.where(" 		        where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
		    .where(" 		        and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))  
		    .where("          		and     t1.inv_dt between :fr_dt       " , fr_dt , "1".equals( inv_po_term 		))  // 배송예정사작일자 
		    .where("                    		          and :to_dt       " , to_dt , "1".equals( inv_po_term 		))  // 배송예정종료일자 
	
		    .where("          		and     t1.ori_dt between :fr_dt       " , fr_dt , "2".equals( inv_po_term 		))  // 주문사작일자 
		    .where("                                	  and :to_dt       " , to_dt , "2".equals( inv_po_term 		))  // 주문종료일자 
	
			.where(" 		        and     t1.ret_yn     = :ret_yn   	   " , arg.getParameter("ret_yn"            ))  /* 반품 여부 */
		    	
			.where("			    and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */

			.where("          		and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          		and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */
      		.where("				and 	t3.jobcl_id  	= :inv_rank_id 	" , arg.getParameter("inv_rank_id"  	)) /* 직급 */
	
			.where("  				and     t1.sts_cd     > '0100'  												")
			.where("                and     t1.row_sts = 0 				                                        ")
//		    .where("  				and     ( t1.inv_work_id  = '1'  												")
//		    .where("						 or  t1.inv_work_id  = '2'  											")
//		    .where("						 or  t1.inv_work_id  = '3'  											")
//		    .where("						 or  t1.inv_work_id  = '4'  											")
//		    .where("  						)  																		")
		    .where(" 				group by t1.stor_grp, t1.salesman_id											")
	    	.where("  		) t2  																					")
	    	.where(" where t1.emp_id(+) = t2.salesman_id  																")
	    	.where(" order by t1.login_id  																			")
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
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.amount) as amount ")
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
		data.param // 쿼리문  입력
    		.query("select  t1.login_id , t1.emp_nm , t2.*  														")
		;
		data.param
    		.where("from    usr_mst t1, (  																		")
    		.where("     			select  											 							")
    		.where("            			t1.stor_grp, t1.salesman_id  											")
    		.where("           			,   sum(t1.amount) as amount  												")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '01', t1.amount, 0)) as date1  		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '02', t1.amount, 0)) as date2 		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '03', t1.amount, 0)) as date3  		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '04', t1.amount, 0)) as date4  		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '05', t1.amount, 0)) as date5  		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '06', t1.amount, 0)) as date6  		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '07', t1.amount, 0)) as date7  		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '08', t1.amount, 0)) as date8  		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '09', t1.amount, 0)) as date9  		")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '10', t1.amount, 0)) as date10  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '11', t1.amount, 0)) as date11  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '12', t1.amount, 0)) as date12  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '13', t1.amount, 0)) as date13  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '14', t1.amount, 0)) as date14  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '15', t1.amount, 0)) as date15  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '16', t1.amount, 0)) as date16  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '17', t1.amount, 0)) as date17  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '18', t1.amount, 0)) as date18  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '19', t1.amount, 0)) as date19  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '20', t1.amount, 0)) as date20  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '21', t1.amount, 0)) as date21  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '22', t1.amount, 0)) as date22  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '23', t1.amount, 0)) as date23  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '24', t1.amount, 0)) as date24  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '25', t1.amount, 0)) as date25  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '26', t1.amount, 0)) as date26  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '27', t1.amount, 0)) as date27  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '28', t1.amount, 0)) as date28  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '29', t1.amount, 0)) as date29  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '30', t1.amount, 0)) as date30  	")
    		.where("					,	sum(decode(substr(t1.inv_dt, 7, 2), '31', t1.amount, 0)) as date31  	")
    		.where("       			from    order_mst t1  ")
            .where("						 	  join usr_mst t3 on t1.salesman_id = t3.emp_id 					")
            .where("							                   and t1.stor_grp = t3.stor_grp 					")
			.where("   		        where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
    		.where(" 		        and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))  
    		.where("          		and     t1.inv_dt between :fr_dt       " , fr_dt , "1".equals( inv_po_term 		))  // 배송예정사작일자 
    		.where("                    		          and :to_dt       " , to_dt , "1".equals( inv_po_term 		))  // 배송예정종료일자 
    		
    		.where("          		and     t1.ori_dt between :fr_dt       " , fr_dt , "2".equals( inv_po_term 		))  // 주문사작일자 
    		.where("                                	  and :to_dt       " , to_dt , "2".equals( inv_po_term 		))  // 주문종료일자 
    		
    		.where(" 		        and     t1.ret_yn     = :ret_yn   	   " , arg.getParameter("ret_yn"            ))  /* 반품 여부 */
    			    	
    		.where("			    and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */

			.where("          		and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          		and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */
      		.where("				and 	t3.jobcl_id  	= :inv_rank_id 	" , arg.getParameter("inv_rank_id"  	)) /* 직급 */
	
    		.where("  				and     t1.sts_cd     > '0100'  												")
			.where("                and     t1.row_sts = 0 				                                        ")
//    		.where("  				and     ( t1.inv_work_id  = '1'  												")
//    		.where("						 or  t1.inv_work_id  = '2'  											")
//    		.where("						 or  t1.inv_work_id  = '3'  											")
//    		.where("						 or  t1.inv_work_id  = '4'  											")
//    		.where("  						)  																		")
    		.where("      			group by t1.stor_grp, t1.salesman_id											")
    		.where("   			 ) t2  																				")
    		.where(" where   t1.emp_id(+) = t2.salesman_id  															")
    		.where(" order by t1.login_id  																			")
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
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.amount)  as amount  ")
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
		data.param // 쿼리문  입력
			
			.query("select  t1.login_id, t1.emp_nm , t2.*  														")
		;
		data.param
			.where("from    usr_mst t1, (  																		")
		    .where("     			select  											 							")
		    .where("            			t1.stor_grp, t1.salesman_id  											")
		    .where("           			,   sum(t1.amount) as amount  												")
		    .where("					,	sum(decode(substr(t1.inv_dt, 5, 2), '01', t1.amount, 0)) as month1  	")
		    .where("					,	sum(decode(substr(t1.inv_dt, 5, 2), '02', t1.amount, 0)) as month2  	")
		    .where("					,	sum(decode(substr(t1.inv_dt, 5, 2), '03', t1.amount, 0)) as month3  	")
		    .where("					,	sum(decode(substr(t1.inv_dt, 5, 2), '04', t1.amount, 0)) as month4  	")
		    .where("					,	sum(decode(substr(t1.inv_dt, 5, 2), '05', t1.amount, 0)) as month5  	")
		    .where("					,	sum(decode(substr(t1.inv_dt, 5, 2), '06', t1.amount, 0)) as month6  	")
		    .where("					,	sum(decode(substr(t1.inv_dt, 5, 2), '07', t1.amount, 0)) as month7  	")
		    .where("					,	sum(decode(substr(t1.inv_dt, 5, 2), '08', t1.amount, 0)) as month8  	")
		    .where(" 					,	sum(decode(substr(t1.inv_dt, 5, 2), '09', t1.amount, 0)) as month9  	")
		    .where(" 					,	sum(decode(substr(t1.inv_dt, 5, 2), '10', t1.amount, 0)) as month10  	")
		    .where(" 					,	sum(decode(substr(t1.inv_dt, 5, 2), '11', t1.amount, 0)) as month11  	")
		    .where(" 					,	sum(decode(substr(t1.inv_dt, 5, 2), '12', t1.amount, 0)) as month12  	")
		    .where("       			from 	order_mst t1  															")
            .where("						 	  join usr_mst t3 on t1.salesman_id = t3.emp_id 					")
            .where("							                   and t1.stor_grp = t3.stor_grp 					")
			.where(" 		        where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
    		.where(" 		        and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))  
    		.where("          		and     t1.inv_dt between :fr_dt       " , fr_dt , "1".equals( inv_po_term 		))  // 배송예정사작일자 
    		.where("                    		          and :to_dt       " , to_dt , "1".equals( inv_po_term 		))  // 배송예정종료일자 
    		
    		.where("          		and     t1.ori_dt between :fr_dt       " , fr_dt , "2".equals( inv_po_term 		))  // 주문사작일자 
    		.where("                                	  and :to_dt       " , to_dt , "2".equals( inv_po_term 		))  // 주문종료일자 
    		
    		.where(" 		        and     t1.ret_yn     = :ret_yn   	   " , arg.getParameter("ret_yn"            ))  /* 반품 여부 */
    			    	
    		.where("			    and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
    		
			.where("          		and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          		and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */
      		.where("				and 	t3.jobcl_id  	= :inv_rank_id 	" , arg.getParameter("inv_rank_id"  	)) /* 직급 */
	
    		.where("  				and     t1.sts_cd     > '0100'  												")
			.where("                and     t1.row_sts = 0 				                                        ")
//    		.where("  				and     ( t1.inv_work_id  = '1'  												")
//    		.where("						 or  t1.inv_work_id  = '2'  											")
//    		.where("						 or  t1.inv_work_id  = '3'  											")
//    		.where("						 or  t1.inv_work_id  = '4'  											")
//    		.where("  						)  																		")
		    .where("      			group by t1.stor_grp, t1.salesman_id  											")
		    .where("    	) t2  																					")
		    .where("where  t1.emp_id(+) = t2.salesman_id  															")
		    .where("order by t1.login_id  																			")
    	;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
		
	}			

}
