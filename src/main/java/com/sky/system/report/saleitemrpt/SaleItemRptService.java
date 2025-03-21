package com.sky.system.report.saleitemrpt;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class SaleItemRptService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );


		String[] inv_inpt_path = arg.getParamCast("inv_inpt_path", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.qty)      as qty      ")
			.total("      ,sum(t2.txfree_amt) as txfree_amt ")
			.total("      ,sum(t2.sply_amt) as sply_amt ")
			.total("      ,sum(t2.tax_amt)      as tax_amt      ")
			.total("      ,sum(t2.inv_amt)   as inv_amt   ")
			.total("      ,sum(t2.po_pri) as po_pri ")
			.total("      ,sum(case when (isnull(s.sale_pri_1, 0) = 0 then t1.sale_pri_1 else s.sale_pri_1 end) as sale_pri ")
		;

		data.param
    		.query("select  t1.item_code   , t1.item_name, t1.itm_shrt_cd, t1.item_spec 	, t2.vend_nm		 					")
    		.query("	,   t1.unit_idcd  , (select unit_name from itm_unit where unit_idcd = t1.unit_idcd) as unit_name			")
    		.query("	,	t2.txfree_amt , t2.sply_amt,  t2.tax_amt   , t2.inv_amt 											")
    		.query("	,	t2.qty      , t2.unit_amount 																")
    		.query("	,	t1.maker_id   , (select bas_nm from base_mst where bas_id = t1.maker_id) as mfg_nm 			")
    		.query("	,	t1.brand_id , (select bas_nm from base_mst where bas_id = t1.brand_id) as brand_nm 		")
    		.query("	,	case sum(t2.inv_amt) over (partition by t2.stor_grp) when 0 then 0 								")
    		.query("	         else round(abs(t2.inv_amt)/sum(abs(t2.inv_amt)) over (partition by t2.stor_grp), 3)*100 end as inv_rate ")
    		.query("	,	case sum(t2.qty) over (partition by t2.stor_grp) when 0 then 0									")
    		.query("			 else round(abs(t2.qty)/sum(abs(t2.qty)) over (partition by t2.stor_grp), 3)*100 end as qty_rate 	")
    		.query("	,	case sum(t2.unit_amount) over (partition by t2.stor_grp) when 0 then 0							")
    		.query("	         else round(abs(t2.unit_amount)/sum(abs(t2.unit_amount)) over (partition by t2.stor_grp), 3)*100 end as unit_rate ")
    		.query("	,	(select clss_desct from item_class where clss_id = t1.clss_id) as clss_desct 					")
    		.query("	,   case when isnull(t2.po_pri, 0)    = 0 then t2.po_pri     else t2.po_pri    end as po_pri						")
    		.query("	,   case when isnull(s.sale_pri_1, 0) = 0 then t1.sale_pri_1 else s.sale_pri_1 end as sale_pri				")
    	;

		data.param
			.where("from 	itm_mst t1,  																				")
    		.where(" 					( select  											 							")
    		.where("        					  t2.stor_grp, t2.item_idcd 												")
    		.where("       					,	  sum(t2.txfree_amt) as txfree_amt, sum(t2.sply_amt) as sply_amt 			")
    		.where("       					,	  sum(t2.tax_amt ) as tax_amt  , sum(t2.inv_amt ) as inv_amt 						")
    		.where("       					,	  sum(t2.qty ) as qty  , sum(t2.unt_pri * t2.qty) as unit_amount 	")
    		.where("       					,	  sum(t3.po_pri * t2.qty) as po_pri							 	")
    		.where("						,	  (select vend_nm from vend_mst where vend_id = t3.vend_id) as vend_nm ")
   			.where("		  			  from 	  sale_mst t1 															")
   			.where("		  	      			  join sale_dtl t2 on  t1.inv_no   = t2.inv_no 						")
   			.where("        		  			  left outer join itm_stor t3 on  t1.stor_id    = t3.stor_id 		")
   			.where("        			  	  	   					and t2.item_idcd  = t3.item_idcd 						")
   			.where("				  			  left outer join cust_stor t4 on  t1.stor_id    = t4.stor_id 		")
   			.where("              				   					and t1.cust_id  = t4.cust_id 						")
   			.where("				  			  left outer join itm_mst  t5 on  t2.item_idcd     = t5.item_idcd 		")
			.where("          			  where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          		 	  and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          			  and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자
			.where("          			                        and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자
			.where("          			  and     t1.retn_yn     = :retn_yn   	" , arg.getParameter("retn_yn"   		)) /* 반품 여부 */
	    	.where("		 			  and     t1.inv_inpt_path in ( :inv_inpt_path ) " , inv_inpt_path ,( inv_inpt_path.length > 0)) /* 주문 위치 */
			.where("          			  and     t1.inv_usr_id  = :inv_usr_id  " , arg.getParameter("inv_usr_id"  	)) /* 영업담당 */
			.where("          			  and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */
			.where("          			  and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
			.where("          			  and     t1.mmb_id  = :mmb_id 		" , arg.getParameter("mmb_id"  		)) /* 회원명 */
			.where("          			  and     t5.sales_id = :sales_id 		" , arg.getParameter("sales_id"  		)) /* 문구/테크 */
			.where("          			  and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("          			  and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          			  and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */
			.where("          			  and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */
            .where("     		  		  and     t5.clss_id in ( select  clss_id  from item_class a start with clss_id = :clss_id  connect by prior clss_id = prnt_id )" , arg.getParameter("clss_id"  ))
			.where("          			  and     t5.maker_id  = :maker_id 			" , arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("          			  and     t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
			.where("          			  and     t3.vend_id  = :vend_id 		" , arg.getParameter("vend_id"  		)) /* 매입처 */
			.where("                      and     t1.row_sts = 0 				                                       	")
    		.where("					  group by t2.stor_grp, t2.item_idcd 	, t3.vend_id								")
    		.where(" 					) t2 																			")
    		.where("        left outer join itm_stor s 																")
    		.where("          on s.stor_id = '" + arg.getParamText("stor_id") + "'									")
    		.where("         and s.item_idcd = t2.item_idcd																	")
    		.where("where  t1.item_idcd = t2.item_idcd 																		")
			.where("and    not (t2.qty = 0 and t2.inv_amt = 0)					                                       	")
    		.where("order by t1.item_code			 																		")
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

		String[] inv_inpt_path = arg.getParamCast("inv_inpt_path", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt) as inv_amt ")
			.total("      ,sum(t2.qty)    as qty    ")
			.total("      ,sum(t2.qty0)   as qty0   ")
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
	    	.query("select t1.item_code, t1.item_name, t1.item_spec, t1.unit_idcd  											")
	    	.query("	,  (select unit_name from itm_unit where unit_idcd = t1.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  clss_id = t1.clss_id) as clss_desct  			")
	    	.query("	,  t2.*  																					")
		;

		data.param
			.where("  from itm_mst t1, (  																		")
	    	.where("				select  t2.item_idcd , t5.itm_shrt_cd 															")
	    	.where("       				,   sum(t2.inv_amt) as inv_amt  												")
	    	.where("       				,	sum(t2.qty      ) as qty  												")
	    	.where("		  		,	sum(case when substring(t1.crt_dttm, 9, 2) = '00' then t2.qty     else 0 end ) as qty0 	")
	    	.where("		  		,	sum(case when substring(t1.crt_dttm, 9, 2) = '00' then t2.inv_amt else 0 end ) as time0 ")
	    	.where("		  		,	sum(case when substring(t1.crt_dttm, 9, 2) = '01' then t2.qty     else 0 end ) as qty1 	")
	    	.where("		  		,	sum(case when substring(t1.crt_dttm, 9, 2) = '01' then t2.inv_amt else 0 end ) as time1 ")
	    	.where("		  		,	sum(case when substring(t1.crt_dttm, 9, 2) = '02' then t2.qty     else 0 end ) as qty2 	")
	    	.where("		  		,	sum(case when substring(t1.crt_dttm, 9, 2) = '02' then t2.inv_amt else 0 end ) as time2 ")
	    	.where("		  		,	sum(case when substring(t1.crt_dttm, 9, 2) = '03' then t2.qty     else 0 end ) as qty3 	")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '03' then t2.inv_amt else 0 end ) as time3 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '04' then t2.qty     else 0 end ) as qty4 	")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '04' then t2.inv_amt else 0 end ) as time4 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '05' then t2.qty     else 0 end ) as qty5 	")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '05' then t2.inv_amt else 0 end ) as time5 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '06' then t2.qty     else 0 end ) as qty6 	")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '06' then t2.inv_amt else 0 end ) as time6 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '07' then t2.qty     else 0 end ) as qty7 	")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '07' then t2.inv_amt else 0 end ) as time7 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '08' then t2.qty     else 0 end ) as qty8 	")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '08' then t2.inv_amt else 0 end ) as time8 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '09' then t2.qty     else 0 end ) as qty9 	")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '09' then t2.inv_amt else 0 end ) as time9 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '10' then t2.qty     else 0 end ) as qty10 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '10' then t2.inv_amt else 0 end ) as time10")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '11' then t2.qty     else 0 end ) as qty11 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '11' then t2.inv_amt else 0 end ) as time11")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '12' then t2.qty     else 0 end ) as qty12 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '12' then t2.inv_amt else 0 end ) as time12")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '13' then t2.qty     else 0 end ) as qty13 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '13' then t2.inv_amt else 0 end ) as time13")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '14' then t2.qty     else 0 end ) as qty14 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '14' then t2.inv_amt else 0 end ) as time14")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '15' then t2.qty     else 0 end ) as qty15 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '15' then t2.inv_amt else 0 end ) as time15")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '16' then t2.qty     else 0 end ) as qty16 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '16' then t2.inv_amt else 0 end ) as time16")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '17' then t2.qty     else 0 end ) as qty17 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '17' then t2.inv_amt else 0 end ) as time17")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '18' then t2.qty     else 0 end ) as qty18 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '18' then t2.inv_amt else 0 end ) as time18")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '19' then t2.qty     else 0 end ) as qty19 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '19' then t2.inv_amt else 0 end ) as time19")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '20' then t2.qty     else 0 end ) as qty20 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '20' then t2.inv_amt else 0 end ) as time20")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '21' then t2.qty     else 0 end ) as qty21 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '21' then t2.inv_amt else 0 end ) as time21")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '22' then t2.qty     else 0 end ) as qty22 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '22' then t2.inv_amt else 0 end ) as time22")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '23' then t2.qty     else 0 end ) as qty23 ")
	    	.where("				,	sum(case when substring(t1.crt_dttm, 9, 2) = '23' then t2.inv_amt else 0 end ) as time23")
	    	.where("       			 from   sale_mst t1  															")
	    	.where("        				join sale_dtl t2 on t1.inv_no = t2.inv_no  							")
	    	.where("            			left outer join itm_stor t3 on t1.stor_id = t3.stor_id  			")
	    	.where("                          				  and t2.item_idcd  = t3.item_idcd  						")
	    	.where("            			left outer join cust_stor t4 on t1.stor_id = t4.stor_id  			")
	    	.where("                          				  and t1.cust_id  = t4.cust_id  						")
			.where("				  		left outer join itm_mst  t5 on  t2.item_idcd     = t5.item_idcd 			")
			.where(" 		        where   t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
	    	.where("	 			  and 	t1.sts_cd > '0100'  ")
			.where("                  and   t1.row_sts = 0 				                                        ")
		   	.where("          		and     t1.inv_dt between :fr_dt       " , fr_dt , "1".equals( inv_po_term 		))  // 배송예정사작일자
		   	.where("                    		          and :to_dt       " , to_dt , "1".equals( inv_po_term 		))  // 배송예정종료일자
			.where("          			  and     t1.retn_yn     = :retn_yn   	" , arg.getParameter("retn_yn"   	)) /* 반품 여부 */
		   	.where("		 			  and     t1.inv_inpt_path in ( :inv_inpt_path ) " , inv_inpt_path ,( inv_inpt_path.length > 0)) /* 주문 위치 */
			.where("          			  and     t1.inv_usr_id  = :inv_usr_id  " , arg.getParameter("inv_usr_id")) /* 영업담당 */
			.where("          			  and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id")) /* 영업부서 */
			.where("          			  and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  	)) /* 고객명 */
			.where("          			  and     t1.mmb_id  = :mmb_id 		" , arg.getParameter("mmb_id"  	)) /* 회원명 */
			.where("          			  and     t5.sales_id = :sales_id 		" , arg.getParameter("sales_id"  	)) /* 문구/테크 */
			.where("          			  and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  	)) /* 고객분류1 */
			.where("          			  and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  	)) /* 고객분류1 */
			.where("          			  and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  	)) /* 고객분류1 */
			.where("          			  and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  	)) /* 품목코드 */
			.where("          			  and     t3.vend_id  = :vend_id 		" , arg.getParameter("vend_id"  	)) /* 매입처 */
			.where("				 group by t2.item_idcd,  t5.itm_shrt_cd  															")
			.where("			) t2  																				")
			.where("  where  t1.item_idcd = t2.item_idcd  																")
			.where("    and  t2.qty       <> 0 								                                       	")
            .where("    and  t1.clss_id in ( select  clss_id  from item_class a start with clss_id = :clss_id  connect by prior clss_id = prnt_id )" , arg.getParameter("clss_id"  ))
//			.where("    and  t1.clss_id  = :clss_id 				" 	, arg.getParameter("clss_id"  				)) /* 품목분류 */
			.where("    and  t1.maker_id  = :maker_id 					" 	, arg.getParameter("maker_id"  				)) /* 제조사 */
			.where("    and  t1.brand_id  = :brand_id 				" 	, arg.getParameter("brand_id"  				)) /* 브랜드 */
			.where(" order by t1.item_code			  ")
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

		String[] inv_inpt_path = arg.getParamCast("inv_inpt_path", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt) as inv_amt ")
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

		data.param
			.query("select t1.item_code, t1.item_name, t1.unit_idcd, t1.item_spec, t2.* 													")
			.query("	,  (select unit_name from itm_unit where unit_idcd = t1.unit_idcd) as unit_name 									")
			.query("	,  (select clss_desct from item_class where clss_id = t1.clss_id) as clss_desct 								")
		;
		data.param
			.where("  from itm_mst t1, ( 																							")
			.where("     			select 	t2.item_idcd , t5.itm_shrt_cd																				")
			.where("           			,	sum(t2.inv_amt) as inv_amt 																")
			.where("           			,	sum(t2.qty   ) as qty 																	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '1', t2.qty, 0)) as qty1 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '1', t2.inv_amt, 0)) as week1 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '2', t2.qty, 0)) as qty2 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '2', t2.inv_amt, 0)) as week2 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '3', t2.qty, 0)) as qty3 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '3', t2.inv_amt, 0)) as week3 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '4', t2.qty, 0)) as qty4 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '4', t2.inv_amt, 0)) as week4 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '5', t2.qty, 0)) as qty5 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '5', t2.inv_amt, 0)) as week5 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '6', t2.qty, 0)) as qty6 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '6', t2.inv_amt, 0)) as week6 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '7', t2.qty, 0)) as qty7 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.inv_dt, 'yyyymmdd'), 'd'), '7', t2.inv_amt, 0)) as week7 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '1', t2.qty     else 0 end ) as qty1 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '1', t2.inv_amt else 0 end ) as week1 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '2', t2.qty     else 0 end ) as qty2 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '2', t2.inv_amt else 0 end ) as week2 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '3', t2.qty     else 0 end ) as qty3 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '3', t2.inv_amt else 0 end ) as week3 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '4', t2.qty     else 0 end ) as qty4 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '4', t2.inv_amt else 0 end ) as week4 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '5', t2.qty     else 0 end ) as qty5 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '5', t2.inv_amt else 0 end ) as week5 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '6', t2.qty     else 0 end ) as qty6 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '6', t2.inv_amt else 0 end ) as week6 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '7', t2.qty     else 0 end ) as qty7 	")
			.where(" 					,	sum(case when datepart(weekday,t1.inv_dt) =  '7', t2.inv_amt else 0 end ) as week7 	")
			.where("           		  from 	sale_mst t1 																			")
			.where("           		  		join sale_dtl t2 on t1.inv_no     = t2.inv_no 											")
			.where("           		  		left outer join itm_stor t3 on t1.stor_id   = t3.stor_id   							")
			.where("           		  						  and t2.item_idcd    = t3.item_idcd     									")
	    	.where("            			left outer join cust_stor t4 on t1.stor_id = t4.stor_id  							")
	    	.where("                          				  and t1.cust_id  = t4.cust_id  										")
			.where("				  		left outer join itm_mst  t5 on  t2.item_idcd     = t5.item_idcd 			")
			.where(" 		        where   t1.stor_id    = :stor_id   		" , arg.getParameter("stor_id" 					))
			.where("	 			  and 	t1.sts_cd > '0100'  																	")
			.where("                  and     t1.row_sts = 0 				                                       	                ")
			.where("          		  and     t1.inv_dt between :fr_dt       	" 	, fr_dt , "1".equals( inv_po_term 				))  // 배송예정사작일자
			.where("                    		            and :to_dt       	" 	, to_dt , "1".equals( inv_po_term 				))  // 배송예정종료일자
			.where("          		  and     t1.retn_yn     = :retn_yn   	" 		, arg.getParameter("retn_yn"   					)) /* 반품 여부 */
		  	.where("		 		  and     t1.inv_inpt_path in ( :inv_inpt_path ) " 	, inv_inpt_path ,( inv_inpt_path.length > 0			)) /* 주문 위치 */
			.where("          		  and     t1.inv_usr_id  = :inv_usr_id  " 	, arg.getParameter("inv_usr_id"				)) /* 영업담당 */
			.where("          		  and     t1.inv_dept_id  = :inv_dept_id  " 	, arg.getParameter("inv_dept_id"				)) /* 영업부서 */
			.where("          		  and     t1.cust_id  = :cust_id  		" 		, arg.getParameter("cust_id"  					)) /* 고객명 */
			.where("          		  and     t1.mmb_id  = :mmb_id 		" 		, arg.getParameter("mmb_id"  					)) /* 회원명 */
			.where("          		  and     t5.sales_id = :sales_id 		" 		, arg.getParameter("sales_id"  					)) /* 문구/테크 */
			.where("          		  and     t4.clss_1  = :clss_1 		" 		, arg.getParameter("clss_1"  					)) /* 고객분류1 */
			.where("          		  and     t4.clss_2  = :clss_2 		" 		, arg.getParameter("clss_2"  					)) /* 고객분류1 */
			.where("          		  and     t4.clss_3  = :clss_3 		" 		, arg.getParameter("clss_3"  					)) /* 고객분류1 */
			.where("          		  and     t2.item_idcd  = :item_idcd 		" 		, arg.getParameter("item_idcd"  					)) /* 품목코드 */
			.where("          		  and     t3.vend_id  = :vend_id 		" 		, arg.getParameter("vend_id"  					)) /* 매입처 */
			.where("			group by t2.item_idcd , t5.itm_shrt_cd																				")
			.where("        	) t2 																								")
			.where("  where t1.item_idcd 	= t2.item_idcd 																				")
			.where("    and t2.qty       <> 0 												                                       	")
            .where("    and t1.clss_id in ( select  clss_id  from item_class a start with clss_id = :clss_id  connect by prior clss_id = prnt_id )" , arg.getParameter("clss_id"  ))
//			.where("    and t1.clss_id = :clss_id 						" 		, arg.getParameter("clss_id"  					)) /* 품목분류 */
			.where("    and t1.maker_id  	= :maker_id 							" 		, arg.getParameter("maker_id"  					)) /* 제조사 */
			.where("    and t1.brand_id = :brand_id 						" 		, arg.getParameter("brand_id"  					)) /* 브랜드 */
			.where("  order by t1.item_code 																							")
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

		String[] inv_inpt_path = arg.getParamCast("inv_inpt_path", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt) as inv_amt ")
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

		data.param
			.query("select t1.item_code, t1.item_name, t1.unit_idcd, t1.item_spec, t2.*  											")
			.query("	,  (select unit_name from itm_unit where unit_idcd = t1.unit_idcd) as unit_name 							")
			.query("	,  (select clss_desct from item_class where clss_id = t1.clss_id) as clss_desct 						")
		;

		data.param
			.where("  from itm_mst t1, ( 																					")
			.where("     			select 	t2.item_idcd 	, t5.itm_shrt_cd																	")
			.where("               		,	sum(t2.inv_amt) as inv_amt 														")
			.where("               		,	sum(t2.qty   ) as qty 															")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '01' then  t2.qty     else 0 end ) as qty1 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '01' then  t2.inv_amt else 0 end ) as date1 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '02' then  t2.qty     else 0 end ) as qty2 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '02' then  t2.inv_amt else 0 end ) as date2 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '03' then  t2.qty     else 0 end ) as qty3 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '03' then  t2.inv_amt else 0 end ) as date3 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '04' then  t2.qty     else 0 end ) as qty4 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '04' then  t2.inv_amt else 0 end ) as date4 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '05' then  t2.qty     else 0 end ) as qty5 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '05' then  t2.inv_amt else 0 end ) as date5 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '06' then  t2.qty     else 0 end ) as qty6 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '06' then  t2.inv_amt else 0 end ) as date6 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '07' then  t2.qty     else 0 end ) as qty7 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '07' then  t2.inv_amt else 0 end ) as date7 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '08' then  t2.qty     else 0 end ) as qty8 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '08' then  t2.inv_amt else 0 end ) as date8 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '09' then  t2.qty     else 0 end ) as qty9 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '09' then  t2.inv_amt else 0 end ) as date9 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '10' then  t2.qty     else 0 end ) as qty10 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '10' then  t2.inv_amt else 0 end ) as date10 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '11' then  t2.qty     else 0 end ) as qty11 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '11' then  t2.inv_amt else 0 end ) as date11 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '12' then  t2.qty     else 0 end ) as qty12 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '12' then  t2.inv_amt else 0 end ) as date12 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '13' then  t2.qty     else 0 end ) as qty13 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '13' then  t2.inv_amt else 0 end ) as date13 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '14' then  t2.qty     else 0 end ) as qty14 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '14' then  t2.inv_amt else 0 end ) as date14 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '15' then  t2.qty     else 0 end ) as qty15 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '15' then  t2.inv_amt else 0 end ) as date15 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '16' then  t2.qty     else 0 end ) as qty16 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '16' then  t2.inv_amt else 0 end ) as date16 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '17' then  t2.qty     else 0 end ) as qty17 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '17' then  t2.inv_amt else 0 end ) as date17 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '18' then  t2.qty     else 0 end ) as qty18 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '18' then  t2.inv_amt else 0 end ) as date18 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '19' then  t2.qty     else 0 end ) as qty19 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '19' then  t2.inv_amt else 0 end ) as date19 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '20' then  t2.qty     else 0 end ) as qty20 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '20' then  t2.inv_amt else 0 end ) as date20 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '21' then  t2.qty     else 0 end ) as qty21 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '21' then  t2.inv_amt else 0 end ) as date21 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '22' then  t2.qty     else 0 end ) as qty22 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '22' then  t2.inv_amt else 0 end ) as date22 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '23' then  t2.qty     else 0 end ) as qty23 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '23' then  t2.inv_amt else 0 end ) as date23 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '24' then  t2.qty     else 0 end ) as qty24 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '24' then  t2.inv_amt else 0 end ) as date24 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '25' then  t2.qty     else 0 end ) as qty25 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '25' then  t2.inv_amt else 0 end ) as date25 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '26' then  t2.qty     else 0 end ) as qty26 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '26' then  t2.inv_amt else 0 end ) as date26 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '27' then  t2.qty     else 0 end ) as qty27 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '27' then  t2.inv_amt else 0 end ) as date27 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '28' then  t2.qty     else 0 end ) as qty28 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '28' then  t2.inv_amt else 0 end ) as date28 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '29' then  t2.qty     else 0 end ) as qty29 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '29' then  t2.inv_amt else 0 end ) as date29 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '30' then  t2.qty     else 0 end ) as qty30 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '30' then  t2.inv_amt else 0 end ) as date30 ")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '31' then  t2.qty     else 0 end ) as qty31 	")
			.where(" 		 	,	sum(case when substring(t1.inv_dt, 7, 2) = '31' then  t2.inv_amt else 0 end ) as date31 ")
			.where("	           	  from 	sale_mst t1 																	")
			.where("	                	join sale_dtl t2 on  t1.inv_no       = t2.inv_no 								")
			.where("	                	left outer join itm_stor t3 on  t1.stor_id     = t3.stor_id 				")
			.where("	                				  	   and t2.item_idcd      = t3.item_idcd 							")
	    	.where("            			left outer join cust_stor t4 on  t1.stor_id = t4.stor_id  					")
	    	.where("                          				   and t1.cust_id  = t4.cust_id  								")
			.where("				  		left outer join itm_mst  t5 on  t2.item_idcd     = t5.item_idcd 			")
			.where(" 		         where  t1.stor_id    = :stor_id   		" , arg.getParameter("stor_id" 			))
			.where("	 			   and 	t1.sts_cd > '0100'  															")
			.where("                   and  t1.row_sts = 0 				                                       	        ")
			.where("          		   and  t1.inv_dt between :fr_dt       	" 	, fr_dt , "1".equals( inv_po_term 			))  // 배송예정사작일자
			.where("                    	              and :to_dt       	" 	, to_dt , "1".equals( inv_po_term 			))  // 배송예정종료일자
			.where("          		   and  t1.retn_yn     = :retn_yn   		" 		, arg.getParameter("retn_yn"   			)) /* 반품 여부 */
		  	.where("		 		   and  t1.inv_inpt_path in ( :inv_inpt_path ) " 	, inv_inpt_path ,( inv_inpt_path.length > 0	)) /* 주문 위치 */
			.where("          		   and  t1.inv_usr_id  = :inv_usr_id  " 	, arg.getParameter("inv_usr_id"			)) /* 영업담당 */
			.where("          		   and  t1.inv_dept_id  = :inv_dept_id  " 	, arg.getParameter("inv_dept_id"			)) /* 영업부서 */
			.where("          		   and  t1.cust_id  = :cust_id  		" 		, arg.getParameter("cust_id"  			)) /* 고객명 */
			.where("          		   and  t1.mmb_id  = :mmb_id 			" 		, arg.getParameter("mmb_id"  			)) /* 회원명 */
			.where("          		   and  t5.sales_id = :sales_id 		" 		, arg.getParameter("sales_id"  			)) /* 문구/테크 */
			.where("          		   and  t4.clss_1  = :clss_1 			" 		, arg.getParameter("clss_1"  			)) /* 고객분류1 */
			.where("          		   and  t4.clss_2  = :clss_2 			" 		, arg.getParameter("clss_2"  			)) /* 고객분류1 */
			.where("          		   and  t4.clss_3  = :clss_3 			" 		, arg.getParameter("clss_3"  			)) /* 고객분류1 */
			.where("          		   and  t2.item_idcd  = :item_idcd 			" 		, arg.getParameter("item_idcd"  			)) /* 품목코드 */
			.where("          		   and  t3.vend_id  = :vend_id 		    "       , arg.getParameter("vend_id"  		    )) /* 매입처 */
			.where("	             group by t2.item_idcd , t5.itm_shrt_cd																	")
			.where("	           ) t2 																					")
			.where("  where t1.item_idcd = t2.item_idcd 																		")
			.where("    and t2.qty       <> 0 										                                       	")
            .where("    and t1.clss_id in ( select  clss_id  from item_class a start with clss_id = :clss_id  connect by prior clss_id = prnt_id )" , arg.getParameter("clss_id"  ))
			.where("    and t1.maker_id  	= :maker_id 							" 		, arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("    and t1.brand_id = :brand_id 						" 		, arg.getParameter("brand_id"  			)) /* 브랜드 */
			.where(" order by t1.item_code 																					")
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

		String[] inv_inpt_path = arg.getParamCast("inv_inpt_path", String[].class);


		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt)  as inv_amt  ")
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

		data.param
			.query("select t1.item_code, t1.item_name, t1.unit_idcd, t1.item_spec, t2.* 											")
			.query("	,  (select unit_name from itm_unit where unit_idcd = t1.unit_idcd) as unit_name 							")
			.query("	,  (select clss_desct from item_class where clss_id = t1.clss_id) as clss_desct 						")
		;

		data.param
			.where("  from itm_mst t1, ( 																					")
			.where("         		select 	t2.item_idcd 																		")
			.where("               		,	sum(t2.inv_amt) as inv_amt 														")
			.where("               		,	sum(t2.qty   ) as qty 															")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '01' then  t2.qty     else 0 end ) as qty1 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '01' then  t2.inv_amt else 0 end ) as month1 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '02' then  t2.qty     else 0 end ) as qty2 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '02' then  t2.inv_amt else 0 end ) as month2 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '03' then  t2.qty     else 0 end ) as qty3 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '03' then  t2.inv_amt else 0 end ) as month3 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '04' then  t2.qty     else 0 end ) as qty4 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '04' then  t2.inv_amt else 0 end ) as month4 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '05' then  t2.qty     else 0 end ) as qty5 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '05' then  t2.inv_amt else 0 end ) as month5 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '06' then  t2.qty     else 0 end ) as qty6 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '06' then  t2.inv_amt else 0 end ) as month6 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '07' then  t2.qty     else 0 end ) as qty7 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '07' then  t2.inv_amt else 0 end ) as month7 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '08' then  t2.qty     else 0 end ) as qty8 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '08' then  t2.inv_amt else 0 end ) as month8 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '09' then  t2.qty     else 0 end ) as qty9 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '09' then  t2.inv_amt else 0 end ) as month9 ")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '10' then  t2.qty     else 0 end ) as qty10 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '10' then  t2.inv_amt else 0 end ) as month10")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '11' then  t2.qty     else 0 end ) as qty11 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '11' then  t2.inv_amt else 0 end ) as month11")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '12' then  t2.qty     else 0 end ) as qty12 	")
			.where(" 				,	sum(case when substring(t1.inv_dt, 5, 2) = '12' then  t2.inv_amt else 0 end ) as month12")
			.where("	           	  from 	sale_mst t1 																	")
			.where("	                	join sale_dtl t2 on  t1.inv_no       = t2.inv_no 								")
			.where("	                	left outer join itm_stor t3 on  t1.stor_id     = t3.stor_id 				")
			.where("	                				  	   and t2.item_idcd      = t3.item_idcd 							")
			.where("            			left outer join cust_stor t4 on  t1.stor_id = t4.stor_id  					")
			.where("                          				   and t1.cust_id  = t4.cust_id  								")
			.where("				  		left outer join itm_mst  t5 on  t2.item_idcd     = t5.item_idcd 			")
			.where(" 		         where  t1.stor_id    = :stor_id   		" , arg.getParameter("stor_id" 			))
			.where("	 			   and 	t1.sts_cd > '0100'  															")
			.where("                   and  t1.row_sts = 0 				                                       	        ")
			.where("          		   and  t1.inv_dt between :fr_dt       	" 	, fr_dt , "1".equals( inv_po_term 			))  // 배송예정사작일자
			.where("                    	              and :to_dt       	" 	, to_dt , "1".equals( inv_po_term 			))  // 배송예정종료일자
			.where("          		   and  t1.retn_yn     = :retn_yn   		" 		, arg.getParameter("retn_yn"   			)) /* 반품 여부 */
			.where("		 		   and  t1.inv_inpt_path in ( :inv_inpt_path ) " 	, inv_inpt_path ,( inv_inpt_path.length > 0	)) /* 주문 위치 */
			.where("          		   and  t1.inv_usr_id  = :inv_usr_id  " 	, arg.getParameter("inv_usr_id"			)) /* 영업담당 */
			.where("          		   and  t1.inv_dept_id  = :inv_dept_id  " 	, arg.getParameter("inv_dept_id"			)) /* 영업부서 */
			.where("          		   and  t1.cust_id  = :cust_id  		" 		, arg.getParameter("cust_id"  			)) /* 고객명 */
			.where("          		   and  t1.mmb_id  = :mmb_id 			" 		, arg.getParameter("mmb_id"  			)) /* 회원명 */
			.where("          		   and  t5.sales_id = :sales_id 		" 		, arg.getParameter("sales_id"  			)) /* 문구/테크 */
			.where("          		   and  t4.clss_1  = :clss_1 			" 		, arg.getParameter("clss_1"  			)) /* 고객분류1 */
			.where("          		   and  t4.clss_2  = :clss_2 			" 		, arg.getParameter("clss_2"  			)) /* 고객분류1 */
			.where("          		   and  t4.clss_3  = :clss_3 			" 		, arg.getParameter("clss_3"  			)) /* 고객분류1 */
			.where("          		   and  t2.item_idcd  = :item_idcd 			" 		, arg.getParameter("item_idcd"  			)) /* 품목코드 */
			.where("          		   and  t3.vend_id  = :vend_id 		    "       , arg.getParameter("vend_id"  		    )) /* 매입처 */
			.where("            group by t2.item_idcd 																		")
			.where("        ) t2 																							")
			.where("  where t1.item_idcd = t2.item_idcd 																		")
			.where("    and t2.qty       <> 0 										                                       	")
            .where("    and t1.clss_id in ( select  clss_id  from item_class a start with clss_id = :clss_id  connect by prior clss_id = prnt_id )" , arg.getParameter("clss_id"  ))
			.where("    and t1.maker_id  	= :maker_id 							" 		, arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("    and t1.brand_id = :brand_id 						" 		, arg.getParameter("brand_id"  			)) /* 브랜드 */
			.where("  order by t1.item_code		 																			")
    	;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	/**
	 * 고객별 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchCust (HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] inv_inpt_path = arg.getParamCast("inv_inpt_path", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.qty)      as qty      ")
			.total("      ,sum(t2.txfree_amt) as txfree_amt ")
			.total("      ,sum(t2.sply_amt) as sply_amt ")
			.total("      ,sum(t2.tax_amt)      as tax_amt      ")
			.total("      ,sum(t2.inv_amt)   as inv_amt   ")
		;

		data.param
    		.query("select  t2.cust_cd   , t2.cust_nm,  t1.item_code   , t1.item_name, t1.itm_shrt_cd, t1.item_spec 			 	")
    		.query("	,   t1.unit_idcd  , (select unit_name from itm_unit where unit_idcd = t1.unit_idcd) as unit_name			")
    		.query("	,	t2.txfree_amt , t2.sply_amt,  t2.tax_amt   , t2.inv_amt 											")
    		.query("	,	t2.qty      , t2.unit_amount 	, t1.piece_qty												")
    		.query("	,	t1.maker_id   , (select bas_nm from base_mst where bas_id = t1.maker_id) as mfg_nm 			")
    		.query("	,	t1.brand_id , (select bas_nm from base_mst where bas_id = t1.brand_id) as brand_nm 		")
    		.query("	,	case sum(t2.inv_amt) over (partition by t2.stor_grp) when 0 then 0 								")
    		.query("	         else round(abs(t2.inv_amt)/sum(abs(t2.inv_amt)) over (partition by t2.stor_grp), 3)*100 end as inv_rate ")
    		.query("	,	case sum(t2.qty) over (partition by t2.stor_grp) when 0 then 0 									")
    		.query("	         else round(abs(t2.qty)/sum(abs(t2.qty)) over (partition by t2.stor_grp), 3)*100 end  as qty_rate 	")
    		.query("	,	case sum(t2.unit_amount) over (partition by t2.stor_grp) when 0 then 0 							")
    		.query("	         else round(abs(t2.unit_amount)/sum(abs(t2.unit_amount)) over (partition by t2.stor_grp), 3)*100 end as unit_rate ")
    		.query("	,	(select clss_desct from item_class where clss_id = t1.clss_id) as clss_desct 					")
    	;

		data.param
			.where("from 	itm_mst t1,  																				")
    		.where(" 					( select  											 							")
    		.where("        					  t6.cust_cd, t1.cust_nm,  t2.stor_grp, t2.item_idcd 						")
    		.where("       					,	  sum(t2.txfree_amt) as txfree_amt, sum(t2.sply_amt) as sply_amt 			")
    		.where("       					,	  sum(t2.tax_amt ) as tax_amt  , sum(t2.inv_amt ) as inv_amt 						")
    		.where("       					,	  sum(t2.qty ) as qty  , sum(t2.unt_pri * t2.qty) as unit_amount 	")
   			.where("		  			  from 	  sale_mst t1 															")
   			.where("		  	      			  join sale_dtl t2 on  t1.inv_no       = t2.inv_no 					")
   			.where("        		  			  left outer join itm_stor t3 on  t1.stor_id    = t3.stor_id 		")
   			.where("        			  	  	   					and  t2.item_idcd     = t3.item_idcd 					")
   			.where("				  			  left outer join cust_stor t4 on  t1.stor_id    = t4.stor_id 		")
   			.where("              				   					and  t1.cust_id     = t4.cust_id 					")
   			.where("				  			  left outer join itm_mst  t5 on  t2.item_idcd     = t5.item_idcd 		")
   			.where("  	  			 			  left outer join cust_mst  t6 on  t1.cust_id     = t6.cust_id 		")
			.where("          			  where   t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          		 	  and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          			  and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자
			.where("          			                        and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자
			.where("          			  and     t1.retn_yn     = :retn_yn   	" , arg.getParameter("retn_yn"   		)) /* 반품 여부 */
	    	.where("		 			  and     t1.inv_inpt_path in ( :inv_inpt_path ) " , inv_inpt_path ,( inv_inpt_path.length > 0)) /* 주문 위치 */
			.where("          			  and     t1.inv_usr_id  = :inv_usr_id  " , arg.getParameter("inv_usr_id"  	)) /* 영업담당 */
			.where("          			  and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */
			.where("          			  and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
			.where("          			  and     t1.mmb_id  = :mmb_id 		" , arg.getParameter("mmb_id"  		)) /* 회원명 */
			.where("          			  and     t5.sales_id = :sales_id 		" , arg.getParameter("sales_id"  		)) /* 문구/테크 */
			.where("          			  and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("          			  and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          			  and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */
			.where("          			  and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */
            .where("     		  		  and     t5.clss_id in ( select  clss_id  from item_class a start with clss_id = :clss_id  connect by prior clss_id = prnt_id )" , arg.getParameter("clss_id"  ))
			.where("          			  and     t5.maker_id  = :maker_id 			" , arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("          			  and     t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
			.where("					  and 	  t1.sts_cd > '0100' 													")
			.where("                      and     t1.row_sts = 0 				                                       	")
			.where("          			  and     t3.vend_id  = :vend_id 		" , arg.getParameter("vend_id"  		)) /* 매입처 */
    		.where("					  group by t6.cust_cd, t1.cust_nm,  t2.stor_grp, t2.item_idcd 					")
    		.where(" 					) t2 																			")
    		.where("where  t1.item_idcd = t2.item_idcd 																		")
			.where("  and  t2.qty       <> 0 									                                       	")
    		.where("order by t1.item_code	, t2.cust_nm																	")
    	;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


}