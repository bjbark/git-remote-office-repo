package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class OrderItemClassRptService  extends DefaultServiceHandler {

	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
//		String search_id = arg.fixParamText("search_id" );
//		String find_name = arg.getParamText("find_name" );
//
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
//		String sts_gb = arg.getParamText("sts_gb" );

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t1.qty)         as qty         ")
			.total("      ,sum(t1.tax_free)    as tax_free    ")
			.total("      ,sum(t1.sply_amt)    as sply_amt    ")
			.total("      ,sum(t1.tax)         as tax         ")
			.total("      ,sum(t1.amount)      as amount      ")
		;
		data.param // 쿼리문  입력
			.query("select 	(select clss_desct from item_class where class_id = t1.class_id) as class_nm											")
			.query("    ,	t1.tax_free, 	t1.sply_amt,	 t1.tax 																			")
			.query("    ,	t1.amount 																											")
			.query("    ,	decode(sum(t1.amount) over (partition by t1.stor_grp), 0, 0 														")
			.query("    ,   round(abs(t1.amount)/sum(abs(t1.amount)) over (partition by t1.stor_grp), 3)*100) as amount_rate 					")
			.query("    ,	t1.qty 																												")
			.query("    ,	decode(sum(t1.qty) over (partition by t1.stor_grp), 0, 0 															")
			.query("    ,	round(abs(t1.qty)/sum(abs(t1.qty)) over (partition by t1.stor_grp), 3)*100) as qty_rate 							")
//			.query("    , 	t1.unit_amount 																										")
//			.query("    ,	decode(sum(t1.unit_amount) over (partition by t1.stor_grp), 0, 0 													")
//			.query("    ,	round(abs(t1.unit_amount)/sum(abs(t1.unit_amount)) over (partition by t1.stor_grp), 3)*100) as unit_rate 			")
		;
		data.param
			.where(" from ( 																													")
			.where("	select h1.stor_grp, h2.class_id  																						")
			.where("    	,  substr(h2.class_id,  0, 2) as item_cla1_id  																		")
			.where("    	,  substr(h2.class_id,  3, 2) as item_cla2_id  																		")
			.where("    	,  substr(h2.class_id,  5, 2) as item_cla3_id  																		")
			.where("    	,  substr(h2.class_id,  7, 2) as item_cla4_id  																		")
			.where("    	,  sum(h1.tax_free) as tax_free, sum(h1.sply_amt) as sply_amt  														")
			.where("    	,  sum(h1.tax) as tax , sum(h1.amount) as amount  																	")
			.where("    	,  sum(h1.qty) as qty  																								")
			.where("  	  from itm_mst h2,  																									")
//			.where("       	   item_class h3,  																									")
			.where("       	(  																													")
			.where("			select 	t1.stor_grp 	, t2.item_idcd  																			")
			.where("               ,	t2.tax_free		, t2.sply_amt  																			")
			.where("               ,	t2.tax  	    , t2.amount  																			")
			.where("               ,	t2.qty  																								")
			.where("             from 	order_mst t1, order_item t2   																			")
			.where("        	where   t1.stor_grp = :stor_grp   	         "		, arg.fixParameter("stor_grp"))
			.where("          	  and   t1.stor_id = :stor_id   	         "		, arg.getParameter("stor_id"))
			.where("          	  and   t1.inv_dt between :fr_dt     		 " 		, fr_dt , "1".equals( inv_po_term 							))  // 배송예정사작일자 
			.where("          		                  and :to_dt     		 " 		, to_dt , "1".equals( inv_po_term 							))  // 배송예정종료일자 
	
			.where("          	  and   t1.ori_dt between :fr_dt     		 " 		, fr_dt , "2".equals( inv_po_term 							))  // 주문사작일자 
			.where("            		              and :to_dt     		 " 		, to_dt , "2".equals( inv_po_term 							))  // 주문종료일자 
			.where("          	  and   t1.ret_yn       = :ret_yn      		 " 		, arg.getParameter("ret_yn"   								)) /* 반품 여부 */
			
			.where("          	  and   t1.cust_id  = :cust_id  			" 		, arg.getParameter("cust_id"  								)) /* 고객명 */
	    	.where("		 	  and   t1.inv_work_id 	in ( :inv_work_id ) 	" 	, inv_work_id ,( inv_work_id.length > 0						)) /* 주문 위치 */
			.where("			  and 	t1.sts_cd > '0100'  																					")
			.where("              and   t1.row_sts = 0 				                                                                        ")
			.where("              and  t1.inv_no      = t2.inv_no  																				")
			.where("		) h1  																												")
			.where("where h1.item_idcd = h2.item_idcd(+)  																							")
//			.where("  and h2.class_id = h3.class_id(+)  																						")
           .where("	  and h2.class_id 	in ( select  class_id  from item_class a start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))			
			.where("        group by 	h1.stor_grp, h2.class_id			  																	")
		    .where(" ) t1 																														")
		    .where("order by t1.item_cla1_id 																									")
		    .where("    ,	 t1.item_cla2_id 																									")
		    .where("    ,	 t1.item_cla3_id		 																							")	
		    .where("    ,	 t1.item_cla4_id		 																							")	
    	;			
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
		
	}

	
	/**
	 * 시간대별 현황조회 - 완료
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	
	public SqlResultMap getSearchTime(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
//		String search_id = arg.fixParamText("search_id" );
//		String find_name = arg.getParamText("find_name" );
//
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t1.amount) as amount ")
			.total("      ,sum(t1.qty)    as qty    ")
			.total("      ,sum(t1.qty0)   as qty0   ")
			.total("      ,sum(t1.qty1)   as qty1   ")
			.total("      ,sum(t1.qty2)   as qty2   ")
			.total("      ,sum(t1.qty3)   as qty3   ")
			.total("      ,sum(t1.qty4)   as qty4   ")
			.total("      ,sum(t1.qty5)   as qty5   ")
			.total("      ,sum(t1.qty6)   as qty6   ")
			.total("      ,sum(t1.qty7)   as qty7   ")
			.total("      ,sum(t1.qty8)   as qty8   ")
			.total("      ,sum(t1.qty9)   as qty9   ")
			.total("      ,sum(t1.qty10)  as qty10  ")
			.total("      ,sum(t1.qty11)  as qty11  ")
			.total("      ,sum(t1.qty12)  as qty12  ")
			.total("      ,sum(t1.qty13)  as qty13  ")
			.total("      ,sum(t1.qty14)  as qty14  ")
			.total("      ,sum(t1.qty15)  as qty15  ")
			.total("      ,sum(t1.qty16)  as qty16  ")
			.total("      ,sum(t1.qty17)  as qty17  ")
			.total("      ,sum(t1.qty18)  as qty18  ")
			.total("      ,sum(t1.qty19)  as qty19  ")
			.total("      ,sum(t1.qty20)  as qty20  ")
			.total("      ,sum(t1.qty21)  as qty21  ")
			.total("      ,sum(t1.qty22)  as qty22  ")
			.total("      ,sum(t1.qty23)  as qty23  ")
			.total("      ,sum(t1.time0)  as time0  ")
			.total("      ,sum(t1.time1)  as time1  ")
			.total("      ,sum(t1.time2)  as time2  ")
			.total("      ,sum(t1.time3)  as time3  ")
			.total("      ,sum(t1.time4)  as time4  ")
			.total("      ,sum(t1.time5)  as time5  ")
			.total("      ,sum(t1.time6)  as time6  ")
			.total("      ,sum(t1.time7)  as time7  ")
			.total("      ,sum(t1.time8)  as time8  ")
			.total("      ,sum(t1.time9)  as time9  ")
			.total("      ,sum(t1.time10) as time10 ")
			.total("      ,sum(t1.time11) as time11 ")
			.total("      ,sum(t1.time12) as time12 ")
			.total("      ,sum(t1.time13) as time13 ")
			.total("      ,sum(t1.time14) as time14 ")
			.total("      ,sum(t1.time15) as time15 ")
			.total("      ,sum(t1.time16) as time16 ")
			.total("      ,sum(t1.time17) as time17 ")
			.total("      ,sum(t1.time18) as time18 ")
			.total("      ,sum(t1.time19) as time19 ")
			.total("      ,sum(t1.time20) as time20 ")
			.total("      ,sum(t1.time21) as time21 ")
			.total("      ,sum(t1.time22) as time22 ")
			.total("      ,sum(t1.time23) as time23 ")
		;
		data.param // 쿼리문  입력
	    	.query("	select 	(select clss_desct from item_class where class_id = t1.class_id) as class_nm								")
	    	.query("	    ,	t1.*     																								")
	    ;
		data.param
	    	.where("	  from ( 																										")
			.where("	select h1.stor_grp, h2.class_id  																						")
			.where("    	,  substr(h2.class_id,  0, 2) as item_cla1_id  																		")
			.where("    	,  substr(h2.class_id,  3, 2) as item_cla2_id  																		")
			.where("    	,  substr(h2.class_id,  5, 2) as item_cla3_id  																		")
			.where("    	,  substr(h2.class_id,  7, 2) as item_cla4_id  																		")
	    	.where("		  		,	sum(decode(substr(h1.crt_dttm, 9, 2), '00', h1.qty, 0)) as qty0 								")
	    	.where("		  		,	sum(decode(substr(h1.crt_dttm, 9, 2), '00', h1.amount, 0)) as time0 							")
	    	.where("		  		,	sum(decode(substr(h1.crt_dttm, 9, 2), '01', h1.qty, 0)) as qty1 								")
	    	.where("		  		,	sum(decode(substr(h1.crt_dttm, 9, 2), '01', h1.amount, 0)) as time1 							")
	    	.where("		  		,	sum(decode(substr(h1.crt_dttm, 9, 2), '02', h1.qty, 0)) as qty2 								")
	    	.where("		  		,	sum(decode(substr(h1.crt_dttm, 9, 2), '02', h1.amount, 0)) as time2 							")
	    	.where("		  		,	sum(decode(substr(h1.crt_dttm, 9, 2), '03', h1.qty, 0)) as qty3 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '03', h1.amount, 0)) as time3 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '04', h1.qty, 0)) as qty4 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '04', h1.amount, 0)) as time4 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '05', h1.qty, 0)) as qty5 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '05', h1.amount, 0)) as time5 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '06', h1.qty, 0)) as qty6 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '06', h1.amount, 0)) as time6 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '07', h1.qty, 0)) as qty7 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '07', h1.amount, 0)) as time7 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '08', h1.qty, 0)) as qty8 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '08', h1.amount, 0)) as time8 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '09', h1.qty, 0)) as qty9 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '09', h1.amount, 0)) as time9 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '10', h1.qty, 0)) as qty10 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '10', h1.amount, 0)) as time10 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '11', h1.qty, 0)) as qty11 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '11', h1.amount, 0)) as time11 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '12', h1.qty, 0)) as qty12 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '12', h1.amount, 0)) as time12 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '13', h1.qty, 0)) as qty13 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '13', h1.amount, 0)) as time13 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '14', h1.qty, 0)) as qty14 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '14', h1.amount, 0)) as time14 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '15', h1.qty, 0)) as qty15 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '15', h1.amount, 0)) as time15 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '16', h1.qty, 0)) as qty16 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '16', h1.amount, 0)) as time16 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '17', h1.qty, 0)) as qty17 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '17', h1.amount, 0)) as time17 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '18', h1.qty, 0)) as qty18 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '18', h1.amount, 0)) as time18 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '19', h1.qty, 0)) as qty19 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '19', h1.amount, 0)) as time19 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '20', h1.qty, 0)) as qty20 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '20', h1.amount, 0)) as time20 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '21', h1.qty, 0)) as qty21 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '21', h1.amount, 0)) as time21 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '22', h1.qty, 0)) as qty22 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '22', h1.amount, 0)) as time22 							")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '23', h1.qty, 0)) as qty23 								")
	    	.where("				,	sum(decode(substr(h1.crt_dttm, 9, 2), '23', h1.amount, 0)) as time23 							")
	    	.where("				,	sum(h1.amount) as amount 																		")
	    	.where("				,	sum(h1.qty   ) as qty 																			")
			.where("  	  from itm_mst h2,  																									")
//			.where("       	   item_class h3,  																									")
			.where("       	(  																													")
			.where("			select 	t1.stor_grp 	, t2.item_idcd  	, t1.crt_dttm															")
			.where("               ,	t2.tax_free		, t2.taxation  																			")
			.where("               ,	t2.tax  	    , t2.amount  																			")
			.where("               ,	t2.qty  																								")
			.where("             from 	order_mst t1, order_item t2   																			")
			.where("        	where   t1.stor_grp = :stor_grp   	         "		, arg.fixParameter("stor_grp"))
			.where("          	  and   t1.stor_id = :stor_id   	         "		, arg.getParameter("stor_id"))
			.where("          	  and   t1.inv_dt between :fr_dt     		 " 		, fr_dt , "1".equals( inv_po_term 							))  // 배송예정사작일자 
			.where("          		                  and :to_dt     		 " 		, to_dt , "1".equals( inv_po_term 							))  // 배송예정종료일자 
	
			.where("          	  and   t1.ori_dt between :fr_dt     		 " 		, fr_dt , "2".equals( inv_po_term 							))  // 주문사작일자 
			.where("            		              and :to_dt     		 " 		, to_dt , "2".equals( inv_po_term 							))  // 주문종료일자 
			.where("          	  and   t1.ret_yn       = :ret_yn      		 " 		, arg.getParameter("ret_yn"   								)) /* 반품 여부 */
			
			.where("          	  and   t1.cust_id  = :cust_id  			" 		, arg.getParameter("cust_id"  								)) /* 고객명 */
	    	.where("		 	  and   t1.inv_work_id 	in ( :inv_work_id ) 	" 	, inv_work_id ,( inv_work_id.length > 0						)) /* 주문 위치 */
			.where("			  and 	t1.sts_cd > '0100'  																					")
			.where("              and   t1.row_sts = 0 				                                                                        ")
			.where("              and   t1.inv_no      = t2.inv_no  																			")
			.where("		) h1  																												")
			.where("where h1.item_idcd = h2.item_idcd(+)  																							")
//			.where("  and h2.class_id = h3.class_id(+)  																						")
           .where("	  and h2.class_id 	in ( select  class_id  from item_class a start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))			
			.where("        group by 	h1.stor_grp, h2.class_id			  																	")
	    	.where("   ) t1 																											")
	    	.where("   order by t1.item_cla1_id 																						")
	    	.where("   		,	t1.item_cla2_id  ,t1.item_cla3_id   ,t1.item_cla4_id 													")		
			
		;	
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
		

	}	

	
	/**
	 * 요일별 현황조회 - 쿼리만 완료
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
			.total("      ,sum(t1.amount) as amount ")
			.total("      ,sum(t1.qty)    as qty    ")
			.total("      ,sum(t1.qty1)   as qty1   ")
			.total("      ,sum(t1.qty2)   as qty2   ")
			.total("      ,sum(t1.qty3)   as qty3   ")
			.total("      ,sum(t1.qty4)   as qty4   ")
			.total("      ,sum(t1.qty5)   as qty5   ")
			.total("      ,sum(t1.qty6)   as qty6   ")
			.total("      ,sum(t1.qty7)   as qty7   ")
			.total("      ,sum(t1.week1)  as week1  ")
			.total("      ,sum(t1.week2)  as week2  ")
			.total("      ,sum(t1.week3)  as week3  ")
			.total("      ,sum(t1.week4)  as week4  ")
			.total("      ,sum(t1.week5)  as week5  ")
			.total("      ,sum(t1.week6)  as week6  ")
			.total("      ,sum(t1.week7)  as week7  ")
		;
		data.param // 쿼리문  입력
			.query("select 	(select clss_desct from item_class where class_id = t1.class_id) as class_nm								")
			.query("    ,	t1.*																									")
	    ;
		data.param
			.where(" from (																											")
			.where("	select h1.stor_grp, h2.class_id  																						")
			.where("    	,  substr(h2.class_id,  0, 2) as item_cla1_id  																		")
			.where("    	,  substr(h2.class_id,  3, 2) as item_cla2_id  																		")
			.where("    	,  substr(h2.class_id,  5, 2) as item_cla3_id  																		")
			.where("    	,  substr(h2.class_id,  7, 2) as item_cla4_id  																		")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '1', h1.qty, 0)) as qty1				") /* 일요일 */
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '1', h1.amount, 0)) as week1			")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '2', h1.qty, 0)) as qty2				")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '2', h1.amount, 0)) as week2			")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '3', h1.qty, 0)) as qty3				")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '3', h1.amount, 0)) as week3			")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '4', h1.qty, 0)) as qty4				")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '4', h1.amount, 0)) as week4			")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '5', h1.qty, 0)) as qty5				")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '5', h1.amount, 0)) as week5			")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '6', h1.qty, 0)) as qty6				")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '6', h1.amount, 0)) as week6			")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '7', h1.qty, 0)) as qty7				")
			.where("			 ,	sum(decode(to_char(to_date(h1.ori_dt, 'yyyymmdd'), 'd'), '7', h1.amount, 0)) as week7			")
			.where("             ,	sum(h1.amount  ) as amount																		")
			.where("             ,	sum(h1.qty     ) as qty																			")
			.where("  	  from itm_mst h2,  																									")
//			.where("       	   item_class h3,  																									")
			.where("       	(  																													")
			.where("			select 	t1.stor_grp 	, t2.item_idcd  	, t1.ori_dt															")
			.where("               ,	t2.tax_free		, t2.taxation  																			")
			.where("               ,	t2.tax  	    , t2.amount  																			")
			.where("               ,	t2.qty  																								")
			.where("             from 	order_mst t1, order_item t2   																			")
			.where("        	where   t1.stor_grp = :stor_grp   	         "		, arg.fixParameter("stor_grp"))
			.where("          	  and   t1.stor_id = :stor_id   	         "		, arg.getParameter("stor_id"))
			.where("          	  and   t1.inv_dt between :fr_dt     		 " 		, fr_dt , "1".equals( inv_po_term 							))  // 배송예정사작일자 
			.where("          		                  and :to_dt     		 " 		, to_dt , "1".equals( inv_po_term 							))  // 배송예정종료일자 
	
			.where("          	  and   t1.ori_dt between :fr_dt     		 " 		, fr_dt , "2".equals( inv_po_term 							))  // 주문사작일자 
			.where("            		              and :to_dt     		 " 		, to_dt , "2".equals( inv_po_term 							))  // 주문종료일자 
			.where("          	  and   t1.ret_yn       = :ret_yn      		 " 		, arg.getParameter("ret_yn"   								)) /* 반품 여부 */
			
			.where("          	  and   t1.cust_id  = :cust_id  			" 		, arg.getParameter("cust_id"  								)) /* 고객명 */
	    	.where("		 	  and   t1.inv_work_id 	in ( :inv_work_id ) 	" 	, inv_work_id ,( inv_work_id.length > 0						)) /* 주문 위치 */
			.where("			  and 	t1.sts_cd > '0100'  																					")
			.where("              and   t1.row_sts = 0 				                                                                        ")
			.where("              and   t1.inv_no      = t2.inv_no  																			")
			.where("		) h1  																												")
			.where("where h1.item_idcd = h2.item_idcd(+)  																							")
//			.where("  and h2.class_id = h3.class_id(+)  																						")
           .where("	  and h2.class_id 	in ( select  class_id  from item_class a start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))			
			.where("        group by 	h1.stor_grp, h2.class_id			  																	")
	    	.where("        ) t1																									")
	    	.where("  order by t1.item_cla1_id																						")
	    	.where("    ,t1.item_cla2_id  ,t1.item_cla3_id  ,t1.item_cla4_id														")	
		;	
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}	
	
	
	/**
	 * 일자별 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchDay(HttpRequestArgument arg, int page, int rows,String sort) throws Exception {
		
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t1.amount) as amount ")
			.total("      ,sum(t1.qty)    as qty    ")
			.total("      ,sum(t1.qty1)   as qty1   ")
			.total("      ,sum(t1.qty2)   as qty2   ")
			.total("      ,sum(t1.qty3)   as qty3   ")
			.total("      ,sum(t1.qty4)   as qty4   ")
			.total("      ,sum(t1.qty5)   as qty5   ")
			.total("      ,sum(t1.qty6)   as qty6   ")
			.total("      ,sum(t1.qty7)   as qty7   ")
			.total("      ,sum(t1.qty8)   as qty8   ")
			.total("      ,sum(t1.qty9)   as qty9   ")
			.total("      ,sum(t1.qty10)  as qty10  ")
			.total("      ,sum(t1.qty11)  as qty11  ")
			.total("      ,sum(t1.qty12)  as qty12  ")
			.total("      ,sum(t1.qty13)  as qty13  ")
			.total("      ,sum(t1.qty14)  as qty14  ")
			.total("      ,sum(t1.qty15)  as qty15  ")
			.total("      ,sum(t1.qty16)  as qty16  ")
			.total("      ,sum(t1.qty17)  as qty17  ")
			.total("      ,sum(t1.qty18)  as qty18  ")
			.total("      ,sum(t1.qty19)  as qty19  ")
			.total("      ,sum(t1.qty20)  as qty20  ")
			.total("      ,sum(t1.qty21)  as qty21  ")
			.total("      ,sum(t1.qty22)  as qty22  ")
			.total("      ,sum(t1.qty23)  as qty23  ")
			.total("      ,sum(t1.qty24)  as qty24  ")
			.total("      ,sum(t1.qty25)  as qty25  ")
			.total("      ,sum(t1.qty26)  as qty26  ")
			.total("      ,sum(t1.qty27)  as qty27  ")
			.total("      ,sum(t1.qty28)  as qty28  ")
			.total("      ,sum(t1.qty29)  as qty29  ")
			.total("      ,sum(t1.qty30)  as qty30  ")
			.total("      ,sum(t1.qty31)  as qty31  ")
			.total("      ,sum(t1.date1)  as date1  ")
			.total("      ,sum(t1.date2)  as date2  ")
			.total("      ,sum(t1.date3)  as date3  ")
			.total("      ,sum(t1.date4)  as date4  ")
			.total("      ,sum(t1.date5)  as date5  ")
			.total("      ,sum(t1.date6)  as date6  ")
			.total("      ,sum(t1.date7)  as date7  ")
			.total("      ,sum(t1.date8)  as date8  ")
			.total("      ,sum(t1.date9)  as date9  ")
			.total("      ,sum(t1.date10) as date10 ")
			.total("      ,sum(t1.date11) as date11 ")
			.total("      ,sum(t1.date12) as date12 ")
			.total("      ,sum(t1.date13) as date13 ")
			.total("      ,sum(t1.date14) as date14 ")
			.total("      ,sum(t1.date15) as date15 ")
			.total("      ,sum(t1.date16) as date16 ")
			.total("      ,sum(t1.date17) as date17 ")
			.total("      ,sum(t1.date18) as date18 ")
			.total("      ,sum(t1.date19) as date19 ")
			.total("      ,sum(t1.date20) as date20 ")
			.total("      ,sum(t1.date21) as date21 ")
			.total("      ,sum(t1.date22) as date22 ")
			.total("      ,sum(t1.date23) as date23 ")
			.total("      ,sum(t1.date24) as date24 ")
			.total("      ,sum(t1.date25) as date25 ")
			.total("      ,sum(t1.date26) as date26 ")
			.total("      ,sum(t1.date27) as date27 ")
			.total("      ,sum(t1.date28) as date28 ")
			.total("      ,sum(t1.date29) as date29 ")
			.total("      ,sum(t1.date30) as date30 ")
			.total("      ,sum(t1.date31) as date31 ")
		;
		data.param // 쿼리문  입력
			.query("select 	(select clss_desct from item_class where class_id = t1.class_id) as class_nm								")
			.query("    ,	t1.*																									")
	    ;
		data.param
			.where(" from (																											")
			.where("	select h1.stor_grp, h2.class_id  																						")
			.where("    	,  substr(h2.class_id,  0, 2) as item_cla1_id  																		")
			.where("    	,  substr(h2.class_id,  3, 2) as item_cla2_id  																		")
			.where("    	,  substr(h2.class_id,  5, 2) as item_cla3_id  																		")
			.where("    	,  substr(h2.class_id,  7, 2) as item_cla4_id  																		")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '01', h1.qty, 0)) as qty1 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '01', h1.amount, 0)) as date1 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '02', h1.qty, 0)) as qty2 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '02', h1.amount, 0)) as date2 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '03', h1.qty, 0)) as qty3 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '03', h1.amount, 0)) as date3 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '04', h1.qty, 0)) as qty4 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '04', h1.amount, 0)) as date4 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '05', h1.qty, 0)) as qty5 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '05', h1.amount, 0)) as date5 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '06', h1.qty, 0)) as qty6 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '06', h1.amount, 0)) as date6 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '07', h1.qty, 0)) as qty7 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '07', h1.amount, 0)) as date7 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '08', h1.qty, 0)) as qty8 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '08', h1.amount, 0)) as date8 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '09', h1.qty, 0)) as qty9 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '09', h1.amount, 0)) as date9 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '10', h1.qty, 0)) as qty10 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '10', h1.amount, 0)) as date10 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '11', h1.qty, 0)) as qty11 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '11', h1.amount, 0)) as date11 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '12', h1.qty, 0)) as qty12 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '12', h1.amount, 0)) as date12 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '13', h1.qty, 0)) as qty13 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '13', h1.amount, 0)) as date13 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '14', h1.qty, 0)) as qty14 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '14', h1.amount, 0)) as date14 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '15', h1.qty, 0)) as qty15 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '15', h1.amount, 0)) as date15 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '16', h1.qty, 0)) as qty16 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '16', h1.amount, 0)) as date16 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '17', h1.qty, 0)) as qty17 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '17', h1.amount, 0)) as date17 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '18', h1.qty, 0)) as qty18 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '18', h1.amount, 0)) as date18 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '19', h1.qty, 0)) as qty19 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '19', h1.amount, 0)) as date19 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '20', h1.qty, 0)) as qty20 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '20', h1.amount, 0)) as date20 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '21', h1.qty, 0)) as qty21 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '21', h1.amount, 0)) as date21 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '22', h1.qty, 0)) as qty22 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '22', h1.amount, 0)) as date22 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '23', h1.qty, 0)) as qty23 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '23', h1.amount, 0)) as date23 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '24', h1.qty, 0)) as qty24 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '24', h1.amount, 0)) as date24 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '25', h1.qty, 0)) as qty25 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '25', h1.amount, 0)) as date25 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '26', h1.qty, 0)) as qty26 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '26', h1.amount, 0)) as date26 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '27', h1.qty, 0)) as qty27 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '27', h1.amount, 0)) as date27 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '28', h1.qty, 0)) as qty28 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '28', h1.amount, 0)) as date28 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '29', h1.qty, 0)) as qty29 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '29', h1.amount, 0)) as date29 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '30', h1.qty, 0)) as qty30 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '30', h1.amount, 0)) as date30 								")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '31', h1.qty, 0)) as qty31 									")
			.where(" 		 	,	sum(decode(substr(h1.ori_dt, 7, 2), '31', h1.amount, 0)) as date31 								")
			.where(" 		               ,sum(h1.amount) as amount 																")
			.where(" 		               ,sum(h1.qty      ) as qty 																")
			.where("  	  from itm_mst h2,  																									")
//			.where("       	   item_class h3,  																									")
			.where("       	(  																													")
			.where("			select 	t1.stor_grp 	, t2.item_idcd  	, t1.ori_dt															")
			.where("               ,	t2.tax_free		, t2.taxation  																			")
			.where("               ,	t2.tax  	    , t2.amount  																			")
			.where("               ,	t2.qty  																								")
			.where("             from 	order_mst t1, order_item t2   																			")
			.where("        	where   t1.stor_grp = :stor_grp   	         "		, arg.fixParameter("stor_grp"))
			.where("          	  and   t1.stor_id = :stor_id   	         "		, arg.getParameter("stor_id"))
			.where("          	  and   t1.inv_dt between :fr_dt     		 " 		, fr_dt , "1".equals( inv_po_term 							))  // 배송예정사작일자 
			.where("          		                  and :to_dt     		 " 		, to_dt , "1".equals( inv_po_term 							))  // 배송예정종료일자 
	
			.where("          	  and   t1.ori_dt between :fr_dt     		 " 		, fr_dt , "2".equals( inv_po_term 							))  // 주문사작일자 
			.where("            		              and :to_dt     		 " 		, to_dt , "2".equals( inv_po_term 							))  // 주문종료일자 
			.where("          	  and   t1.ret_yn       = :ret_yn      		 " 		, arg.getParameter("ret_yn"   								)) /* 반품 여부 */
			
			.where("          	  and   t1.cust_id  = :cust_id  			" 		, arg.getParameter("cust_id"  								)) /* 고객명 */
	    	.where("		 	  and   t1.inv_work_id 	in ( :inv_work_id ) 	" 	, inv_work_id ,( inv_work_id.length > 0						)) /* 주문 위치 */
			.where("			  and 	t1.sts_cd > '0100'  																					")
			.where("              and   t1.row_sts = 0 				                                                                        ")
			.where("              and   t1.inv_no      = t2.inv_no  																			")
			.where("		) h1  																												")
			.where("where h1.item_idcd = h2.item_idcd(+)  																							")
//			.where("  and h2.class_id = h3.class_id(+)  																						")
           .where("	  and h2.class_id 	in ( select  class_id  from item_class a start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))			
			.where("        group by 	h1.stor_grp, h2.class_id			  																	")
			.where("        ) t1																									")
			.where("  order by t1.item_cla1_id																						")
			.where("    ,t1.item_cla2_id  ,t1.item_cla3_id  ,t1.item_cla4_id														")	
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
			.total("      ,sum(t1.amount)  as amount  ")
			.total("      ,sum(t1.qty)     as qty     ")
			.total("      ,sum(t1.qty1)    as qty1    ")
			.total("      ,sum(t1.qty2)    as qty2    ")
			.total("      ,sum(t1.qty3)    as qty3    ")
			.total("      ,sum(t1.qty4)    as qty4    ")
			.total("      ,sum(t1.qty5)    as qty5    ")
			.total("      ,sum(t1.qty6)    as qty6    ")
			.total("      ,sum(t1.qty7)    as qty7    ")
			.total("      ,sum(t1.qty8)    as qty8    ")
			.total("      ,sum(t1.qty9)    as qty9    ")
			.total("      ,sum(t1.qty10)   as qty10   ")
			.total("      ,sum(t1.qty11)   as qty11   ")
			.total("      ,sum(t1.qty12)   as qty12   ")
			.total("      ,sum(t1.month1)  as month1  ")
			.total("      ,sum(t1.month2)  as month2  ")
			.total("      ,sum(t1.month3)  as month3  ")
			.total("      ,sum(t1.month4)  as month4  ")
			.total("      ,sum(t1.month5)  as month5  ")
			.total("      ,sum(t1.month6)  as month6  ")
			.total("      ,sum(t1.month7)  as month7  ")
			.total("      ,sum(t1.month8)  as month8  ")
			.total("      ,sum(t1.month9)  as month9  ")
			.total("      ,sum(t1.month10) as month10 ")
			.total("      ,sum(t1.month11) as month11 ")
			.total("      ,sum(t1.month12) as month12 ")
		;
		data.param // 쿼리문  입력
		.query("select 	(select clss_desct from item_class where class_id = t1.class_id) as class_nm									")
			.query("    ,	t1.*																									")
	    ;
		data.param
			.where("  from ( 																										")
			.where("	select h1.stor_grp, h2.class_id  																						")
			.where("    	,  substr(h2.class_id,  0, 2) as item_cla1_id  																		")
			.where("    	,  substr(h2.class_id,  3, 2) as item_cla2_id  																		")
			.where("    	,  substr(h2.class_id,  5, 2) as item_cla3_id  																		")
			.where("    	,  substr(h2.class_id,  7, 2) as item_cla4_id  																		")
			.where("         	 	,	sum(h1.qty) as qty , sum(h1.amount) as amount												")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '01', h1.qty, 0)) as qty1 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '01', h1.amount, 0)) as month1 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '02', h1.qty, 0)) as qty2 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '02', h1.amount, 0)) as month2 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '03', h1.qty, 0)) as qty3 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '03', h1.amount, 0)) as month3 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '04', h1.qty, 0)) as qty4 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '04', h1.amount, 0)) as month4 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '05', h1.qty, 0)) as qty5 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '05', h1.amount, 0)) as month5 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '06', h1.qty, 0)) as qty6 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '06', h1.amount, 0)) as month6 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '07', h1.qty, 0)) as qty7 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '07', h1.amount, 0)) as month7 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '08', h1.qty, 0)) as qty8 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '08', h1.amount, 0)) as month8 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '09', h1.qty, 0)) as qty9 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '09', h1.amount, 0)) as month9 							")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '10', h1.qty, 0)) as qty10 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '10', h1.amount, 0)) as month10 						")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '11', h1.qty, 0)) as qty11 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '11', h1.amount, 0)) as month11 						")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '12', h1.qty, 0)) as qty12 								")
			.where(" 				,	sum(decode(substr(h1.ori_dt, 5, 2), '12', h1.amount, 0)) as month12 						")
			.where("  	  from itm_mst h2,  																									")
//			.where("       	   item_class h3,  																									")
			.where("       	(  																													")
			.where("			select 	t1.stor_grp 	, t2.item_idcd  	, t1.ori_dt															")
			.where("               ,	t2.tax_free		, t2.taxation  																			")
			.where("               ,	t2.tax  	    , t2.amount  																			")
			.where("               ,	t2.qty  																								")
			.where("             from 	order_mst t1, order_item t2   																			")
			.where("        	where   t1.stor_grp = :stor_grp   	         "		, arg.fixParameter("stor_grp"))
			.where("          	  and   t1.stor_id = :stor_id   	         "		, arg.getParameter("stor_id"))
			.where("          	  and   t1.inv_dt between :fr_dt     		 " 		, fr_dt , "1".equals( inv_po_term 							))  // 배송예정사작일자 
			.where("          		                  and :to_dt     		 " 		, to_dt , "1".equals( inv_po_term 							))  // 배송예정종료일자 
	
			.where("          	  and   t1.ori_dt between :fr_dt     		 " 		, fr_dt , "2".equals( inv_po_term 							))  // 주문사작일자 
			.where("            		              and :to_dt     		 " 		, to_dt , "2".equals( inv_po_term 							))  // 주문종료일자 
			.where("          	  and   t1.ret_yn       = :ret_yn      		 " 		, arg.getParameter("ret_yn"   								)) /* 반품 여부 */
			
			.where("          	  and   t1.cust_id  = :cust_id  			" 		, arg.getParameter("cust_id"  								)) /* 고객명 */
	    	.where("		 	  and   t1.inv_work_id 	in ( :inv_work_id ) 	" 	, inv_work_id ,( inv_work_id.length > 0						)) /* 주문 위치 */
			.where("			  and 	t1.sts_cd > '0100'  																					")
			.where("              and   t1.row_sts = 0 				                                                                        ")
			.where("              and   t1.inv_no      = t2.inv_no  																			")
			.where("		) h1  																												")
			.where("where h1.item_idcd = h2.item_idcd(+)  																							")
//			.where("  and h2.class_id = h3.class_id(+)  																						")
           .where("	  and h2.class_id 	in ( select  class_id  from item_class a start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))			
			.where("        group by 	h1.stor_grp, h2.class_id			  																	")
			.where("   ) t1 																							")
			.where("  order by t1.item_cla1_id																						")
			.where("    ,t1.item_cla2_id  ,t1.item_cla3_id  ,t1.item_cla4_id														")	
    	;
    		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}

	}			

}