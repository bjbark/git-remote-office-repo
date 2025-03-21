package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class OrderItemRptService  extends DefaultServiceHandler {


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
			.total("      ,sum(t2.tax_free)    as tax_free    ")
			.total("      ,sum(t2.sply_amt)    as sply_amt    ")
			.total("      ,sum(t2.tax)         as tax         ")
			.total("      ,sum(t2.amount)      as amount      ")
			.total("      ,sum(t2.qty)         as qty         ")
			.total("      ,sum(t2.unit_amount) as unit_amount ")
		;
		data.param // 쿼리문  입력
//    		.query("select  t5.item_code   , t5.item_name, t5.item_sc, t5.item_spec 			 								")
//    		.query("	,   t5.unit_idcd  , (select unit_name from item_unit where unit_idcd = t5.unit_idcd) as unit_name			")
    		.query("select  t2.item_code   , t2.item_name, t2.item_sc, t2.item_spec 			 								")
    		.query("	,   t2.unit_idcd  , (select unit_name from item_unit where unit_idcd = t2.unit_idcd) as unit_name			")
    		.query("	,	t2.tax_free , t2.sply_amt,  t2.tax   , t2.amount 											")
    		.query("	,	t2.qty      , t2.unit_amount 																")
    		.query("	,	t2.mfg_id   , (select bas_nm from base_mst where bas_id = t2.mfg_id) as mfg_nm 			")
    		.query("	,	t2.brand_id , (select bas_nm from base_mst where bas_id = t2.brand_id) as brand_nm 		")
    		.query("	,	decode(sum(t2.amount) over (partition by t2.stor_grp), 0, 0 								")
    		.query("	,	round(abs(t2.amount)/sum(abs(t2.amount)) over (partition by t2.stor_grp), 3)*100) as inv_rate ")
    		.query("	,	decode(sum(t2.qty) over (partition by t2.stor_grp), 0, 0 									")
    		.query("	,	round(abs(t2.qty)/sum(abs(t2.qty)) over (partition by t2.stor_grp), 3)*100) as qty_rate 	")
    		.query("	,	decode(sum(t2.unit_amount) over (partition by t2.stor_grp), 0, 0 							")
    		.query("	,	round(abs(t2.unit_amount)/sum(abs(t2.unit_amount)) over (partition by t2.stor_grp), 3)*100) as unit_rate ")
    		.query("	,	(select clss_desct from item_class where class_id = t2.class_id) as clss_desct 					")
		;
		data.param
			.where("from  																				")
		    .where("   		(  																							")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  	, t2.item_code							")
		    .where(" 			    ,     t5.brand_id , t5.class_id  , t5.mfg_id  , t5.unit_idcd  , t5.item_name  , t5.item_sc  , t5.item_spec ")
		    .where("   				,	  sum(t2.tax_free) as tax_free, sum(t2.sply_amt) as sply_amt  					")
		    .where("   				,	  sum(t2.tax ) as tax  , sum(t2.amount ) as amount  							")
		    .where("   				,	  sum(t2.qty ) as qty  , sum(t2.unit_price * t2.qty) as unit_amount  			")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_item t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자 
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자 

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자 
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자 

			.where("          	   and     t1.ret_yn     = :ret_yn   	" , arg.getParameter("ret_yn"   		)) /* 반품 여부 */
			
	    	.where("		 	   and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0)) /* 주문 위치 */
	
			.where("          	   and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
//			.where("          	   and     t1.mmb_id  = :mmb_id 		" , arg.getParameter("mmb_id"  		)) /* 회원명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */
			.where("  			   and  t5.class_id  = :class_id 		" , arg.getParameter("class_id"  		)) /* 품목분류 */
			.where("  			   and  t5.mfg_id  	= :mfg_id 			" , arg.getParameter("mfg_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
//    		.where("			   and 	  ( t1.inv_work_id  = '1' 													")
//    		.where("						  or  t1.inv_work_id  = '2' 											")
//    		.where("						  or  t1.inv_work_id  = '3' 											")
//    		.where("						  or  t1.inv_work_id  = '4' 											")
//    		.where("         			  ) 																		")
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.brand_id , t5.class_id  , t5.mfg_id  , t5.unit_idcd  , t5.item_name  , t5.item_sc  , t5.item_spec	")
    		.where(" 		) t2 																					")
    		.where("order by t2.item_code			 																	")
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
			.total("      ,sum(t2.amount)   as amount   ")
			.total("      ,sum(t2.qty)      as qty      ")
			.total("      ,sum(t2.qty0)     as qty0     ")
			.total("      ,sum(t2.qty1)     as qty1     ")
			.total("      ,sum(t2.qty2)     as qty2     ")
			.total("      ,sum(t2.qty3)     as qty3     ")
			.total("      ,sum(t2.qty4)     as qty4     ")
			.total("      ,sum(t2.qty5)     as qty5     ")
			.total("      ,sum(t2.qty6)     as qty6     ")
			.total("      ,sum(t2.qty7)     as qty7     ")
			.total("      ,sum(t2.qty8)     as qty8     ")
			.total("      ,sum(t2.qty9)     as qty9     ")
			.total("      ,sum(t2.qty10)    as qty10    ")
			.total("      ,sum(t2.qty11)    as qty11    ")
			.total("      ,sum(t2.qty12)    as qty12    ")
			.total("      ,sum(t2.qty13)    as qty13    ")
			.total("      ,sum(t2.qty14)    as qty14    ")
			.total("      ,sum(t2.qty15)    as qty15    ")
			.total("      ,sum(t2.qty16)    as qty16    ")
			.total("      ,sum(t2.qty17)    as qty17    ")
			.total("      ,sum(t2.qty18)    as qty18    ")
			.total("      ,sum(t2.qty19)    as qty19    ")
			.total("      ,sum(t2.qty20)    as qty20    ")
			.total("      ,sum(t2.qty21)    as qty21    ")
			.total("      ,sum(t2.qty22)    as qty22    ")
			.total("      ,sum(t2.qty23)    as qty23    ")
			.total("      ,sum(t2.amount0)  as amount0  ")
			.total("      ,sum(t2.amount1)  as amount1  ")
			.total("      ,sum(t2.amount2)  as amount2  ")
			.total("      ,sum(t2.amount3)  as amount3  ")
			.total("      ,sum(t2.amount4)  as amount4  ")
			.total("      ,sum(t2.amount5)  as amount5  ")
			.total("      ,sum(t2.amount6)  as amount6  ")
			.total("      ,sum(t2.amount7)  as amount7  ")
			.total("      ,sum(t2.amount8)  as amount8  ")
			.total("      ,sum(t2.amount9)  as amount9  ")
			.total("      ,sum(t2.amount10) as amount10 ")
			.total("      ,sum(t2.amount11) as amount11 ")
			.total("      ,sum(t2.amount12) as amount12 ")
			.total("      ,sum(t2.amount13) as amount13 ")
			.total("      ,sum(t2.amount14) as amount14 ")
			.total("      ,sum(t2.amount15) as amount15 ")
			.total("      ,sum(t2.amount16) as amount16 ")
			.total("      ,sum(t2.amount17) as amount17 ")
			.total("      ,sum(t2.amount18) as amount18 ")
			.total("      ,sum(t2.amount19) as amount19 ")
			.total("      ,sum(t2.amount20) as amount20 ")
			.total("      ,sum(t2.amount21) as amount21 ")
			.total("      ,sum(t2.amount22) as amount22 ")
			.total("      ,sum(t2.amount23) as amount23 ")
		;
		data.param // 쿼리문  입력
	    	.query("select t2.* 											")
	    	.query("	,  (select unit_name from item_unit where unit_idcd = t2.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  class_id = t2.class_id) as clss_desct  			")
		;
		data.param
			.where("from 																							")
			.where("        (   																					")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  , t2.item_code 						")
		    .where(" 			        ,   t5.item_name  , t5.item_sc  , t5.item_spec , t5.class_id  , t5.unit_idcd  	")
	    	.where("       				,   sum(t2.amount) as amount  												")
	    	.where("       				,	sum(t2.qty      ) as qty  												")
	    	.where("					,	sum(decode(substr(t1.crt_dttm, 9, 2), '00', t2.qty, 0)) as qty0  		")
	    	.where("					,	sum(decode(substr(t1.crt_dttm, 9, 2), '00', t2.amount, 0)) as amount0  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '01', t2.qty, 0)) as qty1  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '01', t2.amount, 0)) as amount1  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '02', t2.qty, 0)) as qty2  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '02', t2.amount, 0)) as amount2  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '03', t2.qty, 0)) as qty3  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '03', t2.amount, 0)) as amount3  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '04', t2.qty, 0)) as qty4  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '04', t2.amount, 0)) as amount4  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '05', t2.qty, 0)) as qty5  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '05', t2.amount, 0)) as amount5  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '06', t2.qty, 0)) as qty6  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '06', t2.amount, 0)) as amount6  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '07', t2.qty, 0)) as qty7  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '07', t2.amount, 0)) as amount7  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '08', t2.qty, 0)) as qty8  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '08', t2.amount, 0)) as amount8  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '09', t2.qty, 0)) as qty9  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '09', t2.amount, 0)) as amount9  ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '10', t2.qty, 0)) as qty10  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '10', t2.amount, 0)) as amount10 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '11', t2.qty, 0)) as qty11  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '11', t2.amount, 0)) as amount11 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '12', t2.qty, 0)) as qty12  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '12', t2.amount, 0)) as amount12 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '13', t2.qty, 0)) as qty13  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '13', t2.amount, 0)) as amount13 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '14', t2.qty, 0)) as qty14  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '14', t2.amount, 0)) as amount14 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '15', t2.qty, 0)) as qty15  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '15', t2.amount, 0)) as amount15 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '16', t2.qty, 0)) as qty16  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '16', t2.amount, 0)) as amount16 ")
	    	.where("					,	sum(decode(substr(t1.crt_dttm, 9, 2), '17', t2.qty, 0)) as qty17  		")
	    	.where("				 	,	sum(decode(substr(t1.crt_dttm, 9, 2), '17', t2.amount, 0)) as amount17 ")
	    	.where("	 				,	sum(decode(substr(t1.crt_dttm, 9, 2), '18', t2.qty, 0)) as qty18  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '18', t2.amount, 0)) as amount18 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '19', t2.qty, 0)) as qty19  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '19', t2.amount, 0)) as amount19 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '20', t2.qty, 0)) as qty20  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '20', t2.amount, 0)) as amount20 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '21', t2.qty, 0)) as qty21  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '21', t2.amount, 0)) as amount21 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '22', t2.qty, 0)) as qty22  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '22', t2.amount, 0)) as amount22 ")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '23', t2.qty, 0)) as qty23  		")
	    	.where(" 					,	sum(decode(substr(t1.crt_dttm, 9, 2), '23', t2.amount, 0)) as amount23 ")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_item t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자 
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자 

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자 
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자 

			.where("          	   and     t1.ret_yn     = :ret_yn   	" , arg.getParameter("ret_yn"   		)) /* 반품 여부 */
			
	    	.where("		 	   and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0)) /* 주문 위치 */
	
			.where("          	   and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
//			.where("          	   and     t1.mmb_id  = :mmb_id 		" , arg.getParameter("mmb_id"  		)) /* 회원명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
//    		.where("			   and 	  ( t1.inv_work_id  = '1' 													")
//    		.where("						  or  t1.inv_work_id  = '2' 											")
//    		.where("						  or  t1.inv_work_id  = '3' 											")
//    		.where("						  or  t1.inv_work_id  = '4' 											")
//    		.where("         			  ) 																		")
			.where("  			   and  t5.class_id  = :class_id 		" , arg.getParameter("class_id"  		)) /* 품목분류 */
			.where("  			   and  t5.mfg_id  	= :mfg_id 			" , arg.getParameter("mfg_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.item_name  , t5.item_sc  , t5.item_spec , t5.class_id  , t5.unit_idcd   	")
    		.where(" 		) t2 																					")
//    		.where("where  t2.item_idcd  	= t5.item_idcd(+)																")
    		.where("order by t2.item_code			 																	")
			
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
			.total("      ,sum(t2.qty)    as qty    ")
			.total("      ,sum(t2.qty1)   as qty1   ")
			.total("      ,sum(t2.qty2)   as qty2   ")
			.total("      ,sum(t2.qty3)   as qty3   ")
			.total("      ,sum(t2.qty4)   as qty4   ")
			.total("      ,sum(t2.qty5)   as qty5   ")
			.total("      ,sum(t2.qty6)   as qty6   ")
			.total("      ,sum(t2.qty7)   as qty7   ")
			.total("      ,sum(t2.week1)  as week1  ")
			.total("      ,sum(t2.week2)  as week2  ")
			.total("      ,sum(t2.week3)  as week3  ")
			.total("      ,sum(t2.week4)  as week4  ")
			.total("      ,sum(t2.week5)  as week5  ")
			.total("      ,sum(t2.week6)  as week6  ")
			.total("      ,sum(t2.week7)  as week7  ")
		;
		data.param // 쿼리문  입력
	    	.query("select t2.* 																					")
	    	.query("	,  (select unit_name from item_unit where unit_idcd = t2.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  class_id = t2.class_id) as clss_desct  			")
		;
		data.param
			.where("from 				  																			")
			.where("         (   																					")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  , t2.item_code 						")
		    .where(" 			        ,   t5.item_name  , t5.item_sc  , t5.item_spec , t5.class_id  , t5.unit_idcd  	")
			.where("           			,	sum(t2.amount) as amount 																")
			.where("           			,	sum(t2.qty   ) as qty 																	")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '1', t2.qty, 0)) as qty1 		")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '1', t2.amount, 0)) as week1 	")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '2', t2.qty, 0)) as qty2 		")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '2', t2.amount, 0)) as week2 	")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '3', t2.qty, 0)) as qty3 		")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '3', t2.amount, 0)) as week3 	")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '4', t2.qty, 0)) as qty4 		")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '4', t2.amount, 0)) as week4 	")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '5', t2.qty, 0)) as qty5 		")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '5', t2.amount, 0)) as week5 	")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '6', t2.qty, 0)) as qty6 		")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '6', t2.amount, 0)) as week6 	")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '7', t2.qty, 0)) as qty7 		")
			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '7', t2.amount, 0)) as week7 	")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_item t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자 
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자 

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자 
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자 

			.where("          	   and     t1.ret_yn     = :ret_yn   	" , arg.getParameter("ret_yn"   		)) /* 반품 여부 */
			
	    	.where("		 	   and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0)) /* 주문 위치 */
	
			.where("          	   and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
//			.where("          	   and     t1.mmb_id  = :mmb_id 		" , arg.getParameter("mmb_id"  		)) /* 회원명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
//    		.where("			   and 	  ( t1.inv_work_id  = '1' 													")
//    		.where("						  or  t1.inv_work_id  = '2' 											")
//    		.where("						  or  t1.inv_work_id  = '3' 											")
//    		.where("						  or  t1.inv_work_id  = '4' 											")
//    		.where("         			  ) 																		")
			.where("  			   and  t5.class_id  = :class_id 		" , arg.getParameter("class_id"  		)) /* 품목분류 */
			.where("  			   and  t5.mfg_id    = :mfg_id 			" , arg.getParameter("mfg_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.item_name  , t5.item_sc  , t5.item_spec , t5.class_id  , t5.unit_idcd   	")
    		.where(" 		) t2 																					")
    		.where("order by t2.item_code			 																	")
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
			.total("      ,sum(t2.qty)    as qty    ")
			.total("      ,sum(t2.qty1)   as qty1   ")
			.total("      ,sum(t2.qty2)   as qty2   ")
			.total("      ,sum(t2.qty3)   as qty3   ")
			.total("      ,sum(t2.qty4)   as qty4   ")
			.total("      ,sum(t2.qty5)   as qty5   ")
			.total("      ,sum(t2.qty6)   as qty6   ")
			.total("      ,sum(t2.qty7)   as qty7   ")
			.total("      ,sum(t2.qty8)   as qty8   ")
			.total("      ,sum(t2.qty9)   as qty9   ")
			.total("      ,sum(t2.qty10)  as qty10  ")
			.total("      ,sum(t2.qty11)  as qty11  ")
			.total("      ,sum(t2.qty12)  as qty12  ")
			.total("      ,sum(t2.qty13)  as qty13  ")
			.total("      ,sum(t2.qty14)  as qty14  ")
			.total("      ,sum(t2.qty15)  as qty15  ")
			.total("      ,sum(t2.qty16)  as qty16  ")
			.total("      ,sum(t2.qty17)  as qty17  ")
			.total("      ,sum(t2.qty18)  as qty18  ")
			.total("      ,sum(t2.qty19)  as qty19  ")
			.total("      ,sum(t2.qty20)  as qty20  ")
			.total("      ,sum(t2.qty21)  as qty21  ")
			.total("      ,sum(t2.qty22)  as qty22  ")
			.total("      ,sum(t2.qty23)  as qty23  ")
			.total("      ,sum(t2.qty24)  as qty24  ")
			.total("      ,sum(t2.qty25)  as qty25  ")
			.total("      ,sum(t2.qty26)  as qty26  ")
			.total("      ,sum(t2.qty27)  as qty27  ")
			.total("      ,sum(t2.qty28)  as qty28  ")
			.total("      ,sum(t2.qty29)  as qty29  ")
			.total("      ,sum(t2.qty30)  as qty30  ")
			.total("      ,sum(t2.qty31)  as qty31  ")
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
	    	.query("select t2.* 																					")
	    	.query("	,  (select unit_name from item_unit where unit_idcd = t2.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  class_id = t2.class_id) as clss_desct  			")
		;
		data.param
			.where("from 				 																			")
			.where("         (   																					")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  , t2.item_code 						")
		    .where(" 			        ,   t5.item_name  , t5.item_sc  , t5.item_spec , t5.class_id  , t5.unit_idcd  	")
			.where("               		,	sum(t2.amount) as amount 														")
			.where("               		,	sum(t2.qty   ) as qty 															")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '01', t2.qty, 0)) as qty1 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '01', t2.amount, 0)) as date1 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '02', t2.qty, 0)) as qty2 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '02', t2.amount, 0)) as date2 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '03', t2.qty, 0)) as qty3 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '03', t2.amount, 0)) as date3 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '04', t2.qty, 0)) as qty4 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '04', t2.amount, 0)) as date4 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '05', t2.qty, 0)) as qty5 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '05', t2.amount, 0)) as date5 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '06', t2.qty, 0)) as qty6 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '06', t2.amount, 0)) as date6 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '07', t2.qty, 0)) as qty7 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '07', t2.amount, 0)) as date7 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '08', t2.qty, 0)) as qty8 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '08', t2.amount, 0)) as date8 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '09', t2.qty, 0)) as qty9 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '09', t2.amount, 0)) as date9 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '10', t2.qty, 0)) as qty10 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '10', t2.amount, 0)) as date10 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '11', t2.qty, 0)) as qty11 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '11', t2.amount, 0)) as date11 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '12', t2.qty, 0)) as qty12 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '12', t2.amount, 0)) as date12 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '13', t2.qty, 0)) as qty13 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '13', t2.amount, 0)) as date13 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '14', t2.qty, 0)) as qty14 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '14', t2.amount, 0)) as date14 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '15', t2.qty, 0)) as qty15 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '15', t2.amount, 0)) as date15 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '16', t2.qty, 0)) as qty16 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '16', t2.amount, 0)) as date16 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '17', t2.qty, 0)) as qty17 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '17', t2.amount, 0)) as date17 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '18', t2.qty, 0)) as qty18 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '18', t2.amount, 0)) as date18 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '19', t2.qty, 0)) as qty19 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '19', t2.amount, 0)) as date19 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '20', t2.qty, 0)) as qty20 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '20', t2.amount, 0)) as date20 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '21', t2.qty, 0)) as qty21 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '21', t2.amount, 0)) as date21 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '22', t2.qty, 0)) as qty22 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '22', t2.amount, 0)) as date22 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '23', t2.qty, 0)) as qty23 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '23', t2.amount, 0)) as date23 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '24', t2.qty, 0)) as qty24 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '24', t2.amount, 0)) as date24 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '25', t2.qty, 0)) as qty25 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '25', t2.amount, 0)) as date25 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '26', t2.qty, 0)) as qty26 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '26', t2.amount, 0)) as date26 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '27', t2.qty, 0)) as qty27 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '27', t2.amount, 0)) as date27 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '28', t2.qty, 0)) as qty28 					")
			.where("					,	sum(decode(substr(t1.ori_dt, 7, 2), '28', t2.amount, 0)) as date28 				")
			.where("		 			,	sum(decode(substr(t1.ori_dt, 7, 2), '29', t2.qty, 0)) as qty29 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '29', t2.amount, 0)) as date29 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '30', t2.qty, 0)) as qty30 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 7, 2), '30', t2.amount, 0)) as date30 				")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '31', t2.qty, 0)) as qty31 					")
			.where("	 				,	sum(decode(substr(t1.ori_dt, 7, 2), '31', t2.amount, 0)) as date31 				")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_item t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자 
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자 

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자 
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자 

			.where("          	   and     t1.ret_yn     = :ret_yn   	" , arg.getParameter("ret_yn"   		)) /* 반품 여부 */
			
	    	.where("		 	   and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0)) /* 주문 위치 */
	
			.where("          	   and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
//			.where("          	   and     t1.mmb_id  = :mmb_id 		" , arg.getParameter("mmb_id"  		)) /* 회원명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
//    		.where("			   and 	  ( t1.inv_work_id  = '1' 													")
//    		.where("						  or  t1.inv_work_id  = '2' 											")
//    		.where("						  or  t1.inv_work_id  = '3' 											")
//    		.where("						  or  t1.inv_work_id  = '4' 											")
//    		.where("         			  ) 																		")
			.where("  			   and  t5.class_id  = :class_id 		" , arg.getParameter("class_id"  		)) /* 품목분류 */
			.where("  			   and  t5.mfg_id  	= :mfg_id 			" , arg.getParameter("mfg_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.item_name  , t5.item_sc  , t5.item_spec , t5.class_id  , t5.unit_idcd   	")
    		.where(" 		) t2 																					")
    		.where("order by t2.item_code			 																	")
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
			.total("      ,sum(t2.qty)     as qty     ")
			.total("      ,sum(t2.qty1)    as qty1    ")
			.total("      ,sum(t2.qty2)    as qty2    ")
			.total("      ,sum(t2.qty3)    as qty3    ")
			.total("      ,sum(t2.qty4)    as qty4    ")
			.total("      ,sum(t2.qty5)    as qty5    ")
			.total("      ,sum(t2.qty6)    as qty6    ")
			.total("      ,sum(t2.qty7)    as qty7    ")
			.total("      ,sum(t2.qty8)    as qty8    ")
			.total("      ,sum(t2.qty9)    as qty9    ")
			.total("      ,sum(t2.qty10)   as qty10   ")
			.total("      ,sum(t2.qty11)   as qty11   ")
			.total("      ,sum(t2.qty12)   as qty12   ")
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
	    	.query("select t2.* 																					")
	    	.query("	,  (select unit_name from item_unit where unit_idcd = t2.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  class_id = t2.class_id) as clss_desct  			")
		;
		data.param
			.where("from 				  																			")
			.where("         (   																					")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  , t2.item_code 						")
		    .where(" 			        ,   t5.item_name  , t5.item_sc  , t5.item_spec , t5.class_id  , t5.unit_idcd  	")
			.where("               		,	sum(t2.amount) as amount 														")
			.where("               		,	sum(t2.qty   ) as qty 															")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '01', t2.qty, 0)) as qty1 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '01', t2.amount, 0)) as month1 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '02', t2.qty, 0)) as qty2 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '02', t2.amount, 0)) as month2 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '03', t2.qty, 0)) as qty3 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '03', t2.amount, 0)) as month3 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '04', t2.qty, 0)) as qty4 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '04', t2.amount, 0)) as month4 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '05', t2.qty, 0)) as qty5 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '05', t2.amount, 0)) as month5 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '06', t2.qty, 0)) as qty6 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '06', t2.amount, 0)) as month6 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '07', t2.qty, 0)) as qty7 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '07', t2.amount, 0)) as month7 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '08', t2.qty, 0)) as qty8 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '08', t2.amount, 0)) as month8 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '09', t2.qty, 0)) as qty9 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '09', t2.amount, 0)) as month9 				")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '10', t2.qty, 0)) as qty10 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '10', t2.amount, 0)) as month10 			")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '11', t2.qty, 0)) as qty11 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '11', t2.amount, 0)) as month11 			")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '12', t2.qty, 0)) as qty12 					")
			.where(" 					,	sum(decode(substr(t1.ori_dt, 5, 2), '12', t2.amount, 0)) as month12 			")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_item t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자 
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자 

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자 
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자 

			.where("          	   and     t1.ret_yn     = :ret_yn   	" , arg.getParameter("ret_yn"   		)) /* 반품 여부 */
			
	    	.where("		 	   and     t1.inv_work_id in ( :inv_work_id ) " , inv_work_id ,( inv_work_id.length > 0)) /* 주문 위치 */
	
			.where("          	   and     t1.salesman_id  = :salesman_id  " , arg.getParameter("salesman_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
//			.where("          	   and     t1.mmb_id  = :mmb_id 		" , arg.getParameter("mmb_id"  		)) /* 회원명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
//    		.where("			   and 	  ( t1.inv_work_id  = '1' 													")
//    		.where("						  or  t1.inv_work_id  = '2' 											")
//    		.where("						  or  t1.inv_work_id  = '3' 											")
//    		.where("						  or  t1.inv_work_id  = '4' 											")
//    		.where("         			  ) 																		")
			.where("  			   and  t5.class_id  = :class_id 		" , arg.getParameter("class_id"  		)) /* 품목분류 */
			.where("  			   and  t5.mfg_id  	= :mfg_id 			" , arg.getParameter("mfg_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.item_name  , t5.item_sc  , t5.item_spec , t5.class_id  , t5.unit_idcd   	")
    		.where(" 		) t2 																					")
    		.where("order by t2.item_code			 																	")
    	;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}

	}			

}
