package com.sky.system.report.orderitemrpt;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class OrderItemRptService  extends DefaultServiceHandler {


	/**
	 * 현황조회
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );
		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.txfree_amt)    as txfree_amt    ")
			.total("      ,sum(t2.sply_amt)    as sply_amt    ")
			.total("      ,sum(t2.tax_amt)         as tax_amt         ")
			.total("      ,sum(t2.inv_amt)      as inv_amt      ")
			.total("      ,sum(t2.qty)         as qty         ")
			.total("      ,sum(t2.unit_amount) as unit_amount ")
		;
		data.param
    		.query("select  t2.item_code   , t2.item_name, t2.itm_shrt_cd, t2.item_spec 			 								")
    		.query("	,   t2.unit_idcd  , (select unit_name from itm_unit where unit_idcd = t2.unit_idcd) as unit_name			")
    		.query("	,	t2.txfree_amt , t2.sply_amt,  t2.tax_amt   , t2.inv_amt 											")
    		.query("	,	t2.qty      , t2.unit_amount 																")
    		.query("	,	t2.maker_id   , (select bas_nm from base_mst where bas_id = t2.maker_id) as mfg_nm 			")
    		.query("	,	t2.brand_id , (select bas_nm from base_mst where bas_id = t2.brand_id) as brand_nm 		")
    		.query("	,	case sum(t2.inv_amt) over (partition by t2.stor_grp) when 0 then 0 								")
    		.query("	         else round(abs(t2.inv_amt)/sum(abs(t2.inv_amt)) over (partition by t2.stor_grp), 3)*100 end as inv_rate ")
    		.query("	,	case sum(t2.qty) over (partition by t2.stor_grp) when 0 then 0 									")
    		.query("	         else round(abs(t2.qty)/sum(abs(t2.qty)) over (partition by t2.stor_grp), 3)*100 end  as qty_rate 	")
    		.query("	,	case sum(t2.unit_amount) over (partition by t2.stor_grp) when 0 then 0						")
    		.query("	         else round(abs(t2.unit_amount)/sum(abs(t2.unit_amount)) over (partition by t2.stor_grp), 3)*100 end  as unit_rate ")
    		.query("	,	(select clss_desct from item_class where clss_id = t2.clss_id) as clss_desct 					")
		;
		data.param
			.where("from  																				")
		    .where("   		(  																							")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  	, t2.item_code							")
		    .where(" 			    ,     t5.brand_id , t5.clss_id  , t5.maker_id  , t5.unit_idcd  , t5.item_name  , t5.itm_shrt_cd  , t5.item_spec ")
		    .where("   				,	  sum(t2.txfree_amt) as txfree_amt, sum(t2.sply_amt) as sply_amt  					")
		    .where("   				,	  sum(t2.tax_amt ) as tax_amt  , sum(t2.inv_amt ) as inv_amt  							")
		    .where("   				,	  sum(t2.qty ) as qty  , sum(t2.unt_pri * t2.qty) as unit_amount  			")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_dtl t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자

	    	.where("		 	   and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0)) /* 주문 위치 */

			.where("          	   and     t1.sales_man_id  = :sales_man_id  " , arg.getParameter("sales_man_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */
			.where("  			   and  t5.clss_id  = :clss_id 			" , arg.getParameter("clss_id"  		)) /* 품목분류 */
			.where("  			   and  t5.maker_id  	= :maker_id 	" , arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.brand_id , t5.clss_id  , t5.maker_id  , t5.unit_idcd  , t5.item_name  , t5.itm_shrt_cd  , t5.item_spec	")
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

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
			.total("      ,sum(t2.inv_amt)   as inv_amt   ")
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
		data.param
	    	.query("select t2.* 											")
	    	.query("	,  (select unit_name from itm_unit where unit_idcd = t2.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  clss_id = t2.clss_id) as clss_desct  			")
		;
		data.param
			.where("from 																							")
			.where("        (   																					")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  , t2.item_code 						")
		    .where(" 			        ,   t5.item_name  , t5.itm_shrt_cd  , t5.item_spec , t5.clss_id  , t5.unit_idcd  	")
	    	.where("       				,   sum(t2.inv_amt) as inv_amt  												")
	    	.where("       				,	sum(t2.qty      ) as qty  												")
	    	.where("					,	sum(case when substring(t1.crt_dttm, 9, 2) = '00' then t2.qty     else 0 end) as qty0  		")
	    	.where("					,	sum(case when substring(t1.crt_dttm, 9, 2) = '00' then t2.inv_amt else 0 end) as amount0    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '01' then t2.qty     else 0 end) as qty1  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '01' then t2.inv_amt else 0 end) as amount1    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '02' then t2.qty     else 0 end) as qty2  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '02' then t2.inv_amt else 0 end) as amount2    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '03' then t2.qty     else 0 end) as qty3  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '03' then t2.inv_amt else 0 end) as amount3    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '04' then t2.qty     else 0 end) as qty4  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '04' then t2.inv_amt else 0 end) as amount4    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '05' then t2.qty     else 0 end) as qty5  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '05' then t2.inv_amt else 0 end) as amount5    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '06' then t2.qty     else 0 end) as qty6  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '06' then t2.inv_amt else 0 end) as amount6    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '07' then t2.qty     else 0 end) as qty7  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '07' then t2.inv_amt else 0 end) as amount7    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '08' then t2.qty     else 0 end) as qty8  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '08' then t2.inv_amt else 0 end) as amount8    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '09' then t2.qty     else 0 end) as qty9  		")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '09' then t2.inv_amt else 0 end) as amount9    ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '10' then t2.qty     else 0 end) as qty10  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '10' then t2.inv_amt else 0 end) as amount10   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '11' then t2.qty     else 0 end) as qty11  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '11' then t2.inv_amt else 0 end) as amount11   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '12' then t2.qty     else 0 end) as qty12  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '12' then t2.inv_amt else 0 end) as amount12   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '13' then t2.qty     else 0 end) as qty13  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '13' then t2.inv_amt else 0 end) as amount13   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '14' then t2.qty     else 0 end) as qty14  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '14' then t2.inv_amt else 0 end) as amount14   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '15' then t2.qty     else 0 end) as qty15  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '15' then t2.inv_amt else 0 end) as amount15   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '16' then t2.qty     else 0 end) as qty16  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '16' then t2.inv_amt else 0 end) as amount16   ")
	    	.where("					,	sum(case when substring(t1.crt_dttm, 9, 2) = '17' then t2.qty     else 0 end) as qty17  	")
	    	.where("				 	,	sum(case when substring(t1.crt_dttm, 9, 2) = '17' then t2.inv_amt else 0 end) as amount17   ")
	    	.where("	 				,	sum(case when substring(t1.crt_dttm, 9, 2) = '18' then t2.qty     else 0 end) as qty18  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '18' then t2.inv_amt else 0 end) as amount18   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '19' then t2.qty     else 0 end) as qty19  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '19' then t2.inv_amt else 0 end) as amount19   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '20' then t2.qty     else 0 end) as qty20  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '20' then t2.inv_amt else 0 end) as amount20   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '21' then t2.qty     else 0 end) as qty21  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '21' then t2.inv_amt else 0 end) as amount21   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '22' then t2.qty     else 0 end) as qty22  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '22' then t2.inv_amt else 0 end) as amount22   ")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '23' then t2.qty     else 0 end) as qty23  	")
	    	.where(" 					,	sum(case when substring(t1.crt_dttm, 9, 2) = '23' then t2.inv_amt else 0 end) as amount23   ")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_dtl t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자

	    	.where("		 	   and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0)) /* 주문 위치 */

			.where("          	   and     t1.sales_man_id  = :sales_man_id  " , arg.getParameter("sales_man_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
			.where("  			   and  t5.clss_id  = :clss_id 		" , arg.getParameter("clss_id"  		)) /* 품목분류 */
			.where("  			   and  t5.maker_id  	= :maker_id 			" , arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.item_name  , t5.itm_shrt_cd  , t5.item_spec , t5.clss_id  , t5.unit_idcd   	")
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
	public SqlResultMap getSearchWeek(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param
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
	    	.query("select t2.* 																					")
	    	.query("	,  (select unit_name from itm_unit where unit_idcd = t2.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  clss_id = t2.clss_id) as clss_desct  			")
		;
		data.param
			.where("from 				  																			")
			.where("         (   																					")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  , t2.item_code 						")
		    .where(" 			        ,   t5.item_name  , t5.itm_shrt_cd  , t5.item_spec , t5.clss_id  , t5.unit_idcd  	")
			.where("           			,	sum(t2.inv_amt) as inv_amt 																")
			.where("           			,	sum(t2.qty   ) as qty 																	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '1', t2.qty, 0)) as qty1 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '1', t2.inv_amt, 0)) as week1 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '2', t2.qty, 0)) as qty2 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '2', t2.inv_amt, 0)) as week2 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '3', t2.qty, 0)) as qty3 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '3', t2.inv_amt, 0)) as week3 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '4', t2.qty, 0)) as qty4 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '4', t2.inv_amt, 0)) as week4 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '5', t2.qty, 0)) as qty5 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '5', t2.inv_amt, 0)) as week5 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '6', t2.qty, 0)) as qty6 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '6', t2.inv_amt, 0)) as week6 	")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '7', t2.qty, 0)) as qty7 		")
//			.where(" 					,	sum(decode(to_char(to_date(t1.ori_dt, 'yyyymmdd'), 'd'), '7', t2.inv_amt, 0)) as week7 	")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '1', t2.qty     else 0 end ) as qty1		") /* 일요일 */
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '1', t2.inv_amt else 0 end ) as week1		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '2', t2.qty     else 0 end ) as qty2		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '2', t2.inv_amt else 0 end ) as week2		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '3', t2.qty     else 0 end ) as qty3		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '3', t2.inv_amt else 0 end ) as week3		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '4', t2.qty     else 0 end ) as qty4		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '4', t2.inv_amt else 0 end ) as week4		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '5', t2.qty     else 0 end ) as qty5		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '5', t2.inv_amt else 0 end ) as week5		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '6', t2.qty     else 0 end ) as qty6		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '6', t2.inv_amt else 0 end ) as week6		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '7', t2.qty     else 0 end ) as qty7		")
			.where("			 		,	sum(case when datepart(weekday,t1.ori_dt) = '7', t2.inv_amt else 0 end ) as week7		")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_dtl t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자

	    	.where("		 	   and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0)) /* 주문 위치 */

			.where("          	   and     t1.sales_man_id  = :sales_man_id  " , arg.getParameter("sales_man_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
			.where("  			   and  t5.clss_id  = :clss_id 		" , arg.getParameter("clss_id"  		)) /* 품목분류 */
			.where("  			   and  t5.maker_id    = :maker_id 			" , arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.item_name  , t5.itm_shrt_cd  , t5.item_spec , t5.clss_id  , t5.unit_idcd   	")
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

		String[] chnl = arg.getParamCast("chnl", String[].class);

		DataMessage data = arg.newStorage("POS");
		data.param
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
	    	.query("select t2.* 																					")
	    	.query("	,  (select unit_name from itm_unit where unit_idcd = t2.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  clss_id = t2.clss_id) as clss_desct  			")
		;
		data.param
			.where("from  (   																					")
		    .where(" 	select 	t1.stor_id , t2.stor_grp, t2.item_idcd  , t2.item_code 						")
		    .where(" 	        ,   t5.item_name  , t5.itm_shrt_cd  , t5.item_spec , t5.clss_id  , t5.unit_idcd  	")
			.where("     	    ,	sum(t2.inv_amt) as inv_amt 														")
			.where("            ,	sum(t2.qty   ) as qty 															")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '01' then  t2.qty     else 0 end ) as qty1 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '01' then  t2.inv_amt else 0 end ) as date1 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '02' then  t2.qty     else 0 end ) as qty2 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '02' then  t2.inv_amt else 0 end ) as date2 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '03' then  t2.qty     else 0 end ) as qty3 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '03' then  t2.inv_amt else 0 end ) as date3 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '04' then  t2.qty     else 0 end ) as qty4 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '04' then  t2.inv_amt else 0 end ) as date4 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '05' then  t2.qty     else 0 end ) as qty5 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '05' then  t2.inv_amt else 0 end ) as date5 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '06' then  t2.qty     else 0 end ) as qty6 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '06' then  t2.inv_amt else 0 end ) as date6 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '07' then  t2.qty     else 0 end ) as qty7 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '07' then  t2.inv_amt else 0 end ) as date7 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '08' then  t2.qty     else 0 end ) as qty8 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '08' then  t2.inv_amt else 0 end ) as date8 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '09' then  t2.qty     else 0 end ) as qty9 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '09' then  t2.inv_amt else 0 end ) as date9 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '10' then  t2.qty     else 0 end ) as qty10 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '10' then  t2.inv_amt else 0 end ) as date10 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '11' then  t2.qty     else 0 end ) as qty11 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '11' then  t2.inv_amt else 0 end ) as date11 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '12' then  t2.qty     else 0 end ) as qty12 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '12' then  t2.inv_amt else 0 end ) as date12 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '13' then  t2.qty     else 0 end ) as qty13 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '13' then  t2.inv_amt else 0 end ) as date13 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '14' then  t2.qty     else 0 end ) as qty14 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '14' then  t2.inv_amt else 0 end ) as date14 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '15' then  t2.qty     else 0 end ) as qty15 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '15' then  t2.inv_amt else 0 end ) as date15 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '16' then  t2.qty     else 0 end ) as qty16 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '16' then  t2.inv_amt else 0 end ) as date16 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '17' then  t2.qty     else 0 end ) as qty17 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '17' then  t2.inv_amt else 0 end ) as date17 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '18' then  t2.qty     else 0 end ) as qty18 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '18' then  t2.inv_amt else 0 end ) as date18 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '19' then  t2.qty     else 0 end ) as qty19 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '19' then  t2.inv_amt else 0 end ) as date19 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '20' then  t2.qty     else 0 end ) as qty20 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '20' then  t2.inv_amt else 0 end ) as date20 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '21' then  t2.qty     else 0 end ) as qty21 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '21' then  t2.inv_amt else 0 end ) as date21 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '22' then  t2.qty     else 0 end ) as qty22 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '22' then  t2.inv_amt else 0 end ) as date22 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '23' then  t2.qty     else 0 end ) as qty23 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '23' then  t2.inv_amt else 0 end ) as date23 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '24' then  t2.qty     else 0 end ) as qty24 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '24' then  t2.inv_amt else 0 end ) as date24 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '25' then  t2.qty     else 0 end ) as qty25 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '25' then  t2.inv_amt else 0 end ) as date25 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '26' then  t2.qty     else 0 end ) as qty26 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '26' then  t2.inv_amt else 0 end ) as date26 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '27' then  t2.qty     else 0 end ) as qty27 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '27' then  t2.inv_amt else 0 end ) as date27 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '28' then  t2.qty     else 0 end ) as qty28 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '28' then  t2.inv_amt else 0 end ) as date28 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '29' then  t2.qty     else 0 end ) as qty29 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '29' then  t2.inv_amt else 0 end ) as date29 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '30' then  t2.qty     else 0 end ) as qty30 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '30' then  t2.inv_amt else 0 end ) as date30 ")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '31' then  t2.qty     else 0 end ) as qty31 	")
			.where(" 		 	,	sum(case when substring(t1.ori_dt, 7, 2) = '31' then  t2.inv_amt else 0 end ) as date31 ")
			.where("	 from 	  order_mst t1 			  											")
		    .where("	          join order_dtl t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			  join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("     where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("     and     t1.stor_id      = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("     and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자
			.where("                       and     :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자
			.where("     and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자
			.where("                       and     :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자

	    	.where("	 and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0)) /* 주문 위치 */
			.where("     and     t1.sales_man_id  = :sales_man_id  " , arg.getParameter("sales_man_id"  	)) /* 영업담당 */
			.where("     and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */
			.where("     and     t1.cust_id    = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
			.where("     and     t4.clss_1     = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("     and     t4.clss_2     = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("     and     t4.clss_3     = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("     and     t2.item_idcd     = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */

			.where("	 and 	  t1.sts_cd    > '0100' 														")
			.where("     and      t1.row_sts   = 0 				                                            ")
			.where("  	 and      t5.clss_id   = :clss_id 		" , arg.getParameter("clss_id"  		)) /* 품목분류 */
			.where("  	 and      t5.maker_id  = :maker_id 		" , arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("  	 and      t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
    		.where("	 group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.item_name  , t5.itm_shrt_cd  , t5.item_spec , t5.clss_id  , t5.unit_idcd   	")
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

		String[] chnl = arg.getParamCast("chnl", String[].class);


		DataMessage data = arg.newStorage("POS");
		data.param
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
	    	.query("select t2.* 																					")
	    	.query("	,  (select unit_name from itm_unit where unit_idcd = t2.unit_idcd) as unit_name  					")
	    	.query("    ,  (select clss_desct from item_class where  clss_id = t2.clss_id) as clss_desct  			")
		;
		data.param
			.where("from 				  																			")
			.where("         (   																					")
		    .where(" 			select 	t1.stor_id , t2.stor_grp, t2.item_idcd  , t2.item_code 						")
		    .where(" 			        ,   t5.item_name  , t5.itm_shrt_cd  , t5.item_spec , t5.clss_id  , t5.unit_idcd  	")
			.where("               		,	sum(t2.inv_amt) as inv_amt 														")
			.where("               		,	sum(t2.qty   ) as qty 															")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '01' then  t2.qty     else 0 end ) as qty1 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '01' then  t2.inv_amt else 0 end ) as month1 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '02' then  t2.qty     else 0 end ) as qty2 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '02' then  t2.inv_amt else 0 end ) as month2 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '03' then  t2.qty     else 0 end ) as qty3 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '03' then  t2.inv_amt else 0 end ) as month3 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '04' then  t2.qty     else 0 end ) as qty4 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '04' then  t2.inv_amt else 0 end ) as month4 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '05' then  t2.qty     else 0 end ) as qty5 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '05' then  t2.inv_amt else 0 end ) as month5 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '06' then  t2.qty     else 0 end ) as qty6 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '06' then  t2.inv_amt else 0 end ) as month6 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '07' then  t2.qty     else 0 end ) as qty7 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '07' then  t2.inv_amt else 0 end ) as month7 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '08' then  t2.qty     else 0 end ) as qty8 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '08' then  t2.inv_amt else 0 end ) as month8 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '09' then  t2.qty     else 0 end ) as qty9 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '09' then  t2.inv_amt else 0 end ) as month9 ")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '10' then  t2.qty     else 0 end ) as qty10 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '10' then  t2.inv_amt else 0 end ) as month10")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '11' then  t2.qty     else 0 end ) as qty11 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '11' then  t2.inv_amt else 0 end ) as month11")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '12' then  t2.qty     else 0 end ) as qty12 	")
			.where(" 				,	sum(case when substring(t1.ori_dt, 5, 2) = '12' then  t2.inv_amt else 0 end ) as month12")
		    .where("			  from 	  order_mst t1 			  											")
		    .where("			      	  join order_dtl t2	on t1.inv_no   = t2.inv_no		  						")
		    .where("			          join cust_stor t4	on t1.stor_id = t4.stor_id		  					")
		    .where("			                    		   and t1.cust_id  = t4.cust_id			  					")
		    .where("			      	  left outer join itm_mst  t5	on t2.item_idcd  = t5.item_idcd		  				")
		    .where("             where    t1.stor_grp    = :stor_grp   	" , arg.fixParameter("stor_grp" 		))
			.where("          	   and     t1.stor_id    = :stor_id   	" , arg.getParameter("stor_id" 		))
			.where("          	   and     t1.inv_dt between :fr_dt      " , fr_dt , "1".equals( inv_po_term 	))  // 배송예정사작일자
			.where("          	                         and :to_dt      " , to_dt , "1".equals( inv_po_term 	))  // 배송예정종료일자

			.where("          	   and     t1.ori_dt between :fr_dt      " , fr_dt , "2".equals( inv_po_term 	))  // 주문사작일자
			.where("            	                     and :to_dt      " , to_dt , "2".equals( inv_po_term 	))  // 주문종료일자
	    	.where("		 	   and     t1.chnl in ( :chnl ) " , chnl ,( chnl.length > 0)) /* 주문 위치 */

			.where("          	   and     t1.sales_man_id  = :sales_man_id  " , arg.getParameter("sales_man_id"  	)) /* 영업담당 */
			.where("          	   and     t1.inv_dept_id  = :inv_dept_id  " , arg.getParameter("inv_dept_id"  	)) /* 영업부서 */

			.where("          	   and     t1.cust_id  = :cust_id  		" , arg.getParameter("cust_id"  		)) /* 고객명 */
			.where("          	   and     t4.clss_1  = :clss_1 		" , arg.getParameter("clss_1"  		)) /* 고객분류1 */
			.where("               and     t4.clss_2  = :clss_2 		" , arg.getParameter("clss_2"  		)) /* 고객분류1 */
			.where("          	   and     t4.clss_3  = :clss_3 		" , arg.getParameter("clss_3"  		)) /* 고객분류1 */

			.where("          	   and     t2.item_idcd  = :item_idcd 		" , arg.getParameter("item_idcd"  		)) /* 품목코드 */

			.where("			   and 	  t1.sts_cd > '0100' 														")
			.where("               and    t1.row_sts = 0 				                                            ")
			.where("  			   and  t5.clss_id  = :clss_id 		" , arg.getParameter("clss_id"  		)) /* 품목분류 */
			.where("  			   and  t5.maker_id  	= :maker_id 			" , arg.getParameter("maker_id"  			)) /* 제조사 */
			.where("  			   and  t5.brand_id  = :brand_id 		" , arg.getParameter("brand_id"  		)) /* 브랜드 */
    		.where("		      group by t1.stor_id, t2.stor_grp, t2.item_idcd , t2.item_code 						")
    		.where("		             , t5.item_name  , t5.itm_shrt_cd  , t5.item_spec , t5.clss_id  , t5.unit_idcd   	")
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
