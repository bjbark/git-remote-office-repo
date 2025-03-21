package com.sky.system.cust;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class CustSaleControlWorkService  extends DefaultServiceHandler {


	/**
	 * master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String inv_no_sale = arg.fixParameter("inv_no_sale").toString() ; /* 거래없는 거래처 제외 */


		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,  sum(h1.prev_balance) as prev_balance 											")
		.total("     , sum(h1.long_balance) as long_balance 																")
		.total("     , sum(h1.amount) as amount  ")
		.total("     , sum(h1.npay_amt)  as npay_amt  																		")
		;
		data.param
		.query("select h1.*																									")
		;

		data.param
		.where("from (  																									")
		.where("	select t1.cust_id, t1.cust_cd, t1.cust_nm  , t1.cust_sts	, t1.sts_memo								")
		.where("	       ,sum(t1.curr_balance) - isnull(sum(t2.npay_amt), 0) - isnull(sum(t2.next_balance), 0) as prev_balance")
		.where("	       ,((sum(t1.curr_balance) - isnull(sum(t2.npay_amt), 0) - isnull(sum(t2.next_balance), 0)) - isnull(sum(t2.payment), 0) ) as long_balance  	")
		.where("	       ,isnull(sum(t2.amount), 0) as amount  															")
		.where("	       ,isnull(sum(t2.cash   ), 0) as cash   , isnull(sum(t2.card   ), 0) as card  						")
		.where("	       ,isnull(sum(t2.bank   ), 0) as bank   , isnull(sum(t2.dc     ), 0) as dc  						")
		.where("	       ,isnull(sum(t2.point  ), 0) as point  , isnull(sum(t2.bill   ), 0) as bill  						")
		.where("	       ,isnull(sum(t2.gift   ), 0) as gift   , isnull(sum(t2.coupon ), 0) as coupon  					")
		.where("	       ,isnull(sum(t2.payment), 0) as payment  															")
		.where("	       ,(isnull(sum(t1.curr_balance), 0) - ( isnull(sum(t2.next_amount ), 0)  - isnull(sum(t2.next_payment ), 0)  )) as npay_amt  						")
		.where("	       ,isnull(sum(t2.next_amount   ), 0) as next_amount  													")
		.where("	       ,isnull(sum(t2.next_balance  ), 0) as next_balance  , isnull(sum(t2.next_payment  ), 0) as next_payment")
		.where("	       ,sum(t1.curr_balance) as curr_balance  															")
		.where("	 from (  																								")
		.where("	     select t1.cust_id, sum(t1.npay_amt) as curr_balance  												")
		.where("	           ,t2.cust_cd as cust_cd, t2.cust_nm  , t2.cust_sts , t2.sts_memo								")
		.where("	   	   from cust_stor t1  																				")
		.where("	            join cust_mst t2 on t1.cust_id = t2.cust_id  												")
		.where("	      where t1.stor_grp      =  :stor_grp   " , arg.fixParameter("stor_grp" 		))
		.where("	        and t1.stor_id       =  :stor_id    " , arg.getParameter("stor_id" 		))
		.where("	        and t1.cust_id       =  :cust_id    " , arg.getParameter("cust_id" 			))
		.where("	        and t1.clss_1        =  :clss_1     " , arg.getParameter("clss_1" 			)) // 1차분류
		.where("	        and t1.clss_2        =  :clss_2     " , arg.getParameter("clss_2" 			)) // 2차분류
		.where("	        and t1.clss_3        =  :clss_3     " , arg.getParameter("clss_3" 			)) // 3차분류
		.where("       		and t2.cust_sts  	 =  :cust_sts 	" , arg.getParameter("cust_sts"			)) // 거래상태
		.where("		group by   t1.cust_id ,  t2.cust_cd , t2.cust_nm  , t2.cust_sts , t2.sts_memo 						")
		.where("		order by t2.cust_nm												 									")
		.where("	    ) t1, (  																							")
		.where("	     select t1.cust_id  																				")
		.where("	           ,sum(t1.amount) as amount  																	")
		.where("	           ,sum(t1.payable) as payable, sum(t1.payment) as payment  									")
		.where("	           ,sum(t1.cash   ) as cash   , sum(t1.card   ) as card  										")
		.where("	           ,sum(t1.bank   ) as bank   , sum(t1.dc     ) as dc  											")
		.where("	           ,sum(t1.point  ) as point  , sum(t1.bill   ) as bill  										")
		.where("	           ,sum(t1.gift   ) as gift   , sum(t1.coupon ) as coupon  										")
		.where("	           ,sum(t1.next_amount   ) as next_amount   , sum(t1.next_payment  ) as next_payment  			")
		.where("	           ,sum(t1.next_payable  ) as next_payable  													")
		.where("	           ,sum(t1.amount) - sum(t1.payment) as npay_amt  												")
		.where("	           ,sum(t1.next_amount   ) - sum(t1.next_payment  ) as next_balance  							")
		.where("	       from (  																							")
		.where("	              select t1.cust_id, t1.amount  															")
		.where("	                   ,t1.payable, t1.npay_amt  															")
		.where("	                   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
		.where("	                   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
		.where("	                   ,0 as next_amount,0 as next_payable, 0 as next_balance  								")
		.where("	                   ,0 as next_payment  																	")
		.where("	                from sale_mst t1  																		")
		.where("	   			   where t1.stor_grp      = :stor_grp "	, arg.fixParameter("stor_grp" ))
		.where("   			     	 and t1.inv_dt between 	:fr_dt    "	, arg.fixParameter("fr_dt"	))
		.where("                 				   	and 	:to_dt    "	, arg.fixParameter("to_dt"	))
		.where("	       			 and t1.stor_id      = :stor_id   "	, arg.getParameter("stor_id" ))
		.where("	       			 and t1.row_sts = 0																	")

		.where("			union all  																						")
		.where("				 select t1.cust_id, 0 as amount  															")
		.where("					   ,0 as payable, 0 as npay_amt  														")
		.where("					   ,case t1.pay_gb when '0100' then t1.payment else  0 end as cash_amount  				")
		.where("					   ,case t1.pay_gb when '0200' then t1.payment else  0 end as card_amount  				")
		.where("					   ,case t1.pay_gb when '0101' then t1.payment else  0 end as bank_amount  				")
		.where("					   ,case t1.pay_gb when '0800' then t1.payment else  0 end as dc_amount  				")
		.where("					   ,case t1.pay_gb when '0600' then t1.payment else  0 end as point_amount  			")
		.where("					   ,case t1.pay_gb when '0400' then t1.payment else  0 end as bill_amount  				")
		.where("					   ,case t1.pay_gb when '0500' then t1.payment else  0 end as gift_amount  				")
		.where("					   ,case t1.pay_gb when '0700' then t1.payment else  0 end as coupon_amount  			")
		.where("					   ,t1.payment  																		")
		.where("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
		.where("					   ,0 as next_payment  																	")
		.where("				  from sale_payment t1  																	")
		.where("				 where t1.stor_grp     = 	:stor_grp  " , arg.fixParameter("stor_grp" ))
		.where("   			       and t1.pay_dt between 	:fr_dt     " , arg.fixParameter("fr_dt"	))
		.where("                 				   	 and 	:to_dt     " , arg.fixParameter("to_dt"	))
		.where("				   and t1.stor_id     = 	:stor_id   " , arg.getParameter("stor_id" ))
		.where("	       		   and t1.row_sts = 0																		")

		.where("			union all  																						")
		.where("				 select t1.cust_id, 0 as amount  															")
		.where("					   ,0 as payable, 0 as npay_amt  														")
		.where("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
		.where("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
		.where("					   ,t1.amount  as next_amount  															")
		.where("					   ,t1.payable as next_payable, t1.npay_amt as next_balance, 0 as next_payment  		")
		.where("				  from sale_mst t1  																		")
		.where("				 where 1=1																					")
		.where("				   and t1.stor_grp  = :stor_grp " , arg.fixParameter("stor_grp" ))
		.where("				   and t1.inv_dt 	> :to_dt    " , arg.fixParameter("to_dt"	))
		.where("				   and t1.stor_id   = :stor_id  " , arg.getParameter("stor_id" ))
		.where("	       		   and t1.row_sts = 0																		")

		.where("			union all  																						")
		.where("				 select t1.cust_id, 0 as amount  															")
		.where("					   ,0 as payable, 0 as npay_amt  														")
		.where("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
		.where("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
		.where("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
		.where("					   ,t1.payment as next_payment  														")
		.where("				   from sale_payment t1  																	")
		.where("				  where 1=1																					")
		.where("				    and t1.stor_grp  = 	:stor_grp   " , arg.fixParameter("stor_grp" ))
		.where("					and t1.pay_dt 	 > 	:to_dt      " , arg.fixParameter("to_dt"	))
		.where("					and t1.stor_id   = 	:stor_id    " , arg.getParameter("stor_id" ))
		.where("	       			and t1.row_sts = 0																		")
		.where("					   ) t1  																				")
		.where("				  group by  t1.cust_id  																	")
		.where("	    ) t2																								")
		;
		data.param
		.where("where t1.cust_id   = t2.cust_id(+) 																			")
		;
		if ( inv_no_sale.equals("1") ){ /* 실적없는 거래처 제외  */
			data.param
			.where("	and  ( isnull(t2.amount, 0) <> 0   or isnull(t2.payment ,0 ) <> 0  		")
			.where("	       or ( isnull(t1.curr_balance, 0) - isnull(t2.npay_amt, 0) - isnull(t2.next_balance, 0) ) <> 0  )	")
			;
		}
		data.param
		.where("	group by t1.cust_id, t1.cust_cd, t1.cust_nm  , t1.cust_sts	, t1.sts_memo								")
		.where(") h1  																										")
		.where("order by h1.cust_cd																							")
	    ;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));


				data.param
				.table("cust_mst")
				.where("where cust_id  = :cust_id  " )

				.unique("cust_id"         , row.fixParameter("cust_id"         ))

				.update("cust_sts"        , row.getParameter("cust_sts"        ))
				.update("sts_memo"        , row.getParameter("sts_memo"         ))

				.update("upt_nm" 	  , row.getParameter("upt_nm"		))
				.update("upt_ip"   	  , arg.remoteAddress					)
		        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.action = rowaction ;
				;data.attach();


		}
		data.execute();
		return null ;
	}


	/**
	 * 출력 - 고객별 거래원장(약식)
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getCustPrinting(HttpRequestArgument arg) throws Exception {

		String inv_no_sale = arg.fixParameter("inv_no_sale").toString() ; /* 거래없는 거래처 제외 */
		int stor_id    = arg.getParameter("stor_id").toString().length() ; /* 거래없는 거래처 제외 */

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select 																		")
			;
		if ( stor_id == 0 ){
			data.param
			.query("	  '전체'			as stor_nm	 										 ") /* 사업장 */
			;
		} else {
			data.param
			.query("	  max((select stor_nm from stor where stor_id = :stor_id )) as stor_nm	 " 		, arg.getParameter("stor_id"  )) /* 사업장 */
			;
		}


		data.param
			.query("    , (substr( :fr_dt , 0,4)) as fr_inv_yy		 					" 		, arg.fixParameter("fr_dt"       ))
			.query("    , (substr( :fr_dt , 5,2)) as fr_inv_mm 		 					" 		, arg.fixParameter("fr_dt"       ))
			.query("    , (substr( :fr_dt , 7,2)) as fr_inv_dd 		 					" 		, arg.fixParameter("fr_dt"       ))
			.query("    , (substr( :to_dt , 0,4)) as to_inv_yy 		 					" 		, arg.fixParameter("to_dt"       ))
			.query("    , (substr( :to_dt , 5,2)) as to_inv_mm 		 					" 		, arg.fixParameter("to_dt"       ))
			.query("    , (substr( :to_dt , 7,2)) as to_inv_dd 		 					" 		, arg.fixParameter("to_dt"       ))
			.query("    , (sum(h1.curr_balance) - isnull(sum(h1.npay_amt), 0) - isnull(sum(h1.next_balance), 0)) as prev_balance 		")
			.query("    , sum(h1.amount) as amount 		, sum(h1.payment) as payment											")
			.query("    , sum(h1.curr_balance) as npay_amt 																		")
			.query("    , (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as print_dt 												")
			.query("from (  																									")
			.query("	select t1.cust_id, t1.cust_cd, t1.cust_nm  																")
			.query("	       ,sum(t1.curr_balance) - isnull(sum(t2.npay_amt), 0) - isnull(sum(t2.next_balance), 0) as prev_balance  	")
			.query("	       ,isnull(sum(t2.amount), 0) as amount  															")
			.query("	       ,isnull(sum(t2.cash   ), 0) as cash   , isnull(sum(t2.card   ), 0) as card  						")
			.query("	       ,isnull(sum(t2.bank   ), 0) as bank   , isnull(sum(t2.dc     ), 0) as dc  						")
			.query("	       ,isnull(sum(t2.point  ), 0) as point  , isnull(sum(t2.bill   ), 0) as bill  						")
			.query("	       ,isnull(sum(t2.gift   ), 0) as gift   , isnull(sum(t2.coupon ), 0) as coupon  					")
			.query("	       ,isnull(sum(t2.npay_amt), 0) as npay_amt, isnull(sum(t2.payment), 0) as payment  				")
			.query("	       ,isnull(sum(t2.next_amount   ), 0) as next_amount  												")
			.query("	       ,isnull(sum(t2.next_balance  ), 0) as next_balance  , isnull(sum(t2.next_payment  ), 0) as next_payment")
			.query("	       ,sum(t1.curr_balance) as curr_balance  															")
			.query("	 from (  																								")
			.query("	     select t1.cust_id, sum(t1.npay_amt) as curr_balance  												")
			.query("	           ,t2.cust_cd as cust_cd, t2.cust_nm   														")
			.query("	   	   from cust_stor t1  																				")
			.query("	            join cust_mst t2 on t1.cust_id = t2.cust_id  												")
			.query("	      where 1=1																							")
			.query("	        and t1.stor_grp  =  :stor_grp "	, arg.fixParameter("stor_grp" 		))
			.query("	        and t1.stor_id   =  :stor_id  "	, arg.getParameter("stor_id" 		))
			.query("	        and t1.cust_id   =  :cust_id  "	, arg.getParameter("cust_id" 			))
			.query("	        and t1.clss_1    =  :clss_1   "	, arg.getParameter("clss_1" 			)) // 1차분류
			.query("	        and t1.clss_2    =  :clss_2   "	, arg.getParameter("clss_2" 			)) // 2차분류
			.query("	        and t1.clss_3    =  :clss_3   "	, arg.getParameter("clss_3" 			)) // 3차분류
			.query("		group by   t1.cust_id ,  t2.cust_cd , t2.cust_nm  													")
			.query("		order by t2.cust_nm												 									")
			.query("	    ) t1, (  																							")
			.query("	     select t1.cust_id  																				")
			.query("	           ,sum(t1.amount) as amount  																	")
			.query("	           ,sum(t1.payable) as payable, sum(t1.payment) as payment  									")
			.query("	           ,sum(t1.cash   ) as cash   , sum(t1.card   ) as card  										")
			.query("	           ,sum(t1.bank   ) as bank   , sum(t1.dc     ) as dc  											")
			.query("	           ,sum(t1.point  ) as point  , sum(t1.bill   ) as bill  										")
			.query("	           ,sum(t1.gift   ) as gift   , sum(t1.coupon ) as coupon  										")
			.query("	           ,sum(t1.next_amount   ) as next_amount   , sum(t1.next_payment  ) as next_payment  			")
			.query("	           ,sum(t1.next_payable  ) as next_payable  													")
			.query("	           ,sum(t1.amount) - sum(t1.payment) as npay_amt  												")
			.query("	           ,sum(t1.next_amount   ) - sum(t1.next_payment  ) as next_balance  							")
			.query("	       from (  																							")
			.query("	              select t1.cust_id, t1.amount  															")
			.query("	                   ,t1.payable, t1.npay_amt  															")
			.query("	                   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("	                   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
			.query("	                   ,0 as next_amount,0 as next_payable, 0 as next_balance  								")
			.query("	                   ,0 as next_payment  																	")
			.query("	                from sale_mst t1  																		")
			.query("	       		   where t1.row_sts = 0																		")
			.query("	   			   where t1.stor_grp      = :stor_grp "	, arg.fixParameter("stor_grp" ))
			.query("   			     	 and t1.inv_dt between 	:fr_dt    "	, arg.fixParameter("fr_dt"	))
			.query("                 				   	and 	:to_dt    "	, arg.fixParameter("to_dt"	))
			.query("	       			 and t1.stor_id       = :stor_id  "	, arg.getParameter("stor_id" ))
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,case t1.pay_gb when '0100' then t1.payment else  0 end as cash_amount  				")
			.query("					   ,case t1.pay_gb when '0200' then t1.payment else  0 end as card_amount  				")
			.query("					   ,case t1.pay_gb when '0101' then t1.payment else  0 end as bank_amount  				")
			.query("					   ,case t1.pay_gb when '0800' then t1.payment else  0 end as dc_amount  				")
			.query("					   ,case t1.pay_gb when '0600' then t1.payment else  0 end as point_amount  			")
			.query("					   ,case t1.pay_gb when '0400' then t1.payment else  0 end as bill_amount  				")
			.query("					   ,case t1.pay_gb when '0500' then t1.payment else  0 end as gift_amount  				")
			.query("					   ,case t1.pay_gb when '0700' then t1.payment else  0 end as coupon_amount  			")
			.query("					   ,t1.payment  																		")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,0 as next_payment  																	")
			.query("				  from sale_payment t1  																	")
			.query("	       		 where t1.row_sts = 0																		")
			.query("				 where t1.stor_grp     = :stor_grp  " , arg.fixParameter("stor_grp" ))
			.query("   			       and t1.pay_dt between :fr_dt     " , arg.fixParameter("fr_dt"	))
			.query("                 				   	 and :to_dt     " , arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id      = :stor_id   " , arg.getParameter("stor_id" ))
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
			.query("					   ,t1.amount  as next_amount  															")
			.query("					   ,t1.payable as next_payable, t1.npay_amt as next_balance, 0 as next_payment  		")
			.query("				  from sale_mst t1  																		")
			.query("	       		 where t1.row_sts = 0																		")
			.query("				 where t1.stor_grp  = :stor_grp " , arg.fixParameter("stor_grp" ))
			.query("				   and t1.inv_dt 	> :to_dt    " , arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id   = :stor_id  " , arg.getParameter("stor_id" ))
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,t1.payment as next_payment  														")
			.query("				   from sale_payment t1  																	")
			.query("	       		  where	t1.row_sts   = 0																	")
			.query("				    and t1.stor_grp  = :stor_grp  "	, arg.fixParameter("stor_grp" ))
			.query("					and t1.pay_dt 	 > :to_dt     "	, arg.fixParameter("to_dt"	))
			.query("					and t1.stor_id   = :stor_id   "	, arg.getParameter("stor_id" ))
			.query("					   ) t1  																				")
			.query("				  group by  t1.cust_id  																	")
			.query("	    ) t2																								")
			.query("where t1.cust_id   = t2.cust_id(+) 																			")
			;

			if ( inv_no_sale.equals("1") ){ /* 실적없는 거래처 제외  */
				data.param
				.query("	and  ( isnull(t1.curr_balance,0) <>  0 or isnull(t2.amount, 0) <> 0   or isnull(t2.payment ,0 ) <> 0  )	")
				;
			}
			data.param
			.query("	group by t1.cust_id, t1.cust_cd, t1.cust_nm  															")
			.query(") h1  																										")
			.query("order by h1.cust_cd																							")
		    ;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
			.query("select h1.cust_cd , h1.cust_nm , h1.prev_balance , h1.amount , h1.payment  , h1.curr_balance as npay_amt	")
			.query("from (  																									")
			.query("	select t1.cust_id, t1.cust_cd, t1.cust_nm  																")
			.query("	       ,sum(t1.curr_balance) - isnull(sum(t2.npay_amt), 0) - isnull(sum(t2.next_balance), 0) as prev_balance  	")
			.query("	       ,isnull(sum(t2.amount), 0) as amount  															")
			.query("	       ,isnull(sum(t2.cash   ), 0) as cash   , isnull(sum(t2.card   ), 0) as card  						")
			.query("	       ,isnull(sum(t2.bank   ), 0) as bank   , isnull(sum(t2.dc     ), 0) as dc  						")
			.query("	       ,isnull(sum(t2.point  ), 0) as point  , isnull(sum(t2.bill   ), 0) as bill  						")
			.query("	       ,isnull(sum(t2.gift   ), 0) as gift   , isnull(sum(t2.coupon ), 0) as coupon  					")
			.query("	       ,isnull(sum(t2.npay_amt), 0) as npay_amt, isnull(sum(t2.payment), 0) as payment  				")
			.query("	       ,isnull(sum(t2.next_amount   ), 0) as next_amount  												")
			.query("	       ,isnull(sum(t2.next_balance  ), 0) as next_balance  , isnull(sum(t2.next_payment  ), 0) as next_payment")
			.query("	       ,sum(t1.curr_balance) as curr_balance  															")
			.query("	 from (  																								")
			.query("	     select t1.cust_id, sum(t1.npay_amt) as curr_balance  												")
			.query("	           ,t2.cust_cd as cust_cd, t2.cust_nm   														")
			.query("	   	   from cust_stor t1  																				")
			.query("	            join cust_mst t2 on t1.cust_id = t2.cust_id  												")
			.query("	      where 1=1                                                                                         ")
			.query("	      where t1.stor_grp  = :stor_grp  "	, arg.fixParameter("stor_grp" 		))
			.query("	        and t1.stor_id   = :stor_id   "	, arg.getParameter("stor_id" 		))
			.query("	        and t1.cust_id   = :cust_id   "	, arg.getParameter("cust_id" 			))
			.query("	        and t1.clss_1    = :clss_1    "	, arg.getParameter("clss_1" 			)) // 1차분류
			.query("	        and t1.clss_2    = :clss_2    "	, arg.getParameter("clss_2" 			)) // 2차분류
			.query("	        and t1.clss_3    = :clss_3    "	, arg.getParameter("clss_3" 			)) // 3차분류
			.query("		group by   t1.cust_id ,  t2.cust_cd , t2.cust_nm  													")
			.query("		order by t2.cust_nm												 									")
			.query("	    ) t1, (  																							")
			.query("	     select t1.cust_id  																				")
			.query("	           ,sum(t1.amount) as amount  																	")
			.query("	           ,sum(t1.payable) as payable, sum(t1.payment) as payment  									")
			.query("	           ,sum(t1.cash   ) as cash   , sum(t1.card   ) as card  										")
			.query("	           ,sum(t1.bank   ) as bank   , sum(t1.dc     ) as dc  											")
			.query("	           ,sum(t1.point  ) as point  , sum(t1.bill   ) as bill  										")
			.query("	           ,sum(t1.gift   ) as gift   , sum(t1.coupon ) as coupon  										")
			.query("	           ,sum(t1.next_amount   ) as next_amount   , sum(t1.next_payment  ) as next_payment  			")
			.query("	           ,sum(t1.next_payable  ) as next_payable  													")
			.query("	           ,sum(t1.amount) - sum(t1.payment) as npay_amt  												")
			.query("	           ,sum(t1.next_amount   ) - sum(t1.next_payment  ) as next_balance  							")
			.query("	       from (  																							")
			.query("	              select t1.cust_id, t1.amount  															")
			.query("	                   ,t1.payable, t1.npay_amt  															")
			.query("	                   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("	                   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
			.query("	                   ,0 as next_amount,0 as next_payable, 0 as next_balance  								")
			.query("	                   ,0 as next_payment  																	")
			.query("	                from sale_mst t1  																		")
			.query("	       		   where t1.row_sts = 0																		")
			.query("	   			   where t1.stor_grp      = :stor_grp" , arg.fixParameter("stor_grp" ))
			.query("   			     	 and t1.inv_dt between 	:fr_dt   " , arg.fixParameter("fr_dt"	))
			.query("                 				   	and 	:to_dt   " , arg.fixParameter("to_dt"	))
			.query("	       			 and t1.stor_id       = :stor_id " , arg.getParameter("stor_id" ))

			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,case t1.pay_gb when '0100' then t1.payment else  0 end as cash_amount  				")
			.query("					   ,case t1.pay_gb when '0200' then t1.payment else  0 end as card_amount  				")
			.query("					   ,case t1.pay_gb when '0101' then t1.payment else  0 end as bank_amount  				")
			.query("					   ,case t1.pay_gb when '0800' then t1.payment else  0 end as dc_amount  				")
			.query("					   ,case t1.pay_gb when '0600' then t1.payment else  0 end as point_amount  			")
			.query("					   ,case t1.pay_gb when '0400' then t1.payment else  0 end as bill_amount  				")
			.query("					   ,case t1.pay_gb when '0500' then t1.payment else  0 end as gift_amount  				")
			.query("					   ,case t1.pay_gb when '0700' then t1.payment else  0 end as coupon_amount  			")
			.query("					   ,t1.payment  																		")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,0 as next_payment  																	")
			.query("				  from sale_payment t1  																	")
			.query("	       		 where t1.row_sts     = 0																	")
			.query("				   and t1.stor_grp    =   :stor_grp  " , arg.fixParameter("stor_grp" ))
			.query("   			       and t1.pay_dt between  :fr_dt     " , arg.fixParameter("fr_dt"	))
			.query("                 				   	 and  :to_dt     " , arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id     =   :stor_id   " , arg.getParameter("stor_id" ))

			.query("			union all  																						")
			.query("				 select t1.cust_id   , 0 as amount  														")
			.query("					   ,0 as payable , 0 as npay_amt  														")
			.query("					   ,0 as cash    , 0 as card     , 0 as bank    , 0 as dc, 0 as point  					")
			.query("					   ,0 as bill    , 0 as gift     , 0 as coupon  , 0 as payment  						")
			.query("					   ,t1.amount  as next_amount  															")
			.query("					   ,t1.payable as next_payable, t1.npay_amt as next_balance, 0 as next_payment  		")
			.query("				  from sale_mst t1  																		")
			.query("	       		 where t1.row_sts   = 0																		")
			.query("				   and t1.stor_grp  = :stor_grp " , arg.fixParameter("stor_grp" ))
			.query("				   and t1.inv_dt 	> :to_dt    " , arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id   = :stor_id  " , arg.getParameter("stor_id" ))

			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,t1.payment as next_payment  														")
			.query("				   from sale_payment t1  																	")
			.query("	       		  where t1.row_sts   = 0																	")
			.query("				    and t1.stor_grp  = :stor_grp " , arg.fixParameter("stor_grp" ))
			.query("					and t1.pay_dt 	 > :to_dt    " , arg.fixParameter("to_dt"	))
			.query("					and t1.stor_id   = :stor_id  " , arg.getParameter("stor_id" ))
			.query("					   ) t1  																				")
			.query("				  group by  t1.cust_id  																	")
			.query("	    ) t2																								")
			.query("where t1.cust_id   = t2.cust_id(+) 																			")
			;
			if ( inv_no_sale.equals("1") ){ /* 실적없는 거래처 제외  */
				data.param
				.query("	and  ( isnull(t1.curr_balance,0) <>  0 or isnull(t2.amount, 0) <> 0   or isnull(t2.payment ,0 ) <> 0  )	")
				;
			}
			data.param
			.query("	group by t1.cust_id, t1.cust_cd, t1.cust_nm  															")
			.query(") h1  																										")
			.query("order by h1.cust_cd																							")
		    ;

			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}



}
