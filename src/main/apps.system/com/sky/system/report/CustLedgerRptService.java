package com.sky.system.report;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class CustLedgerRptService  extends DefaultServiceHandler {


	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String inv_no_sale = arg.fixParameter("inv_no_sale").toString() ; /* 거래없는 거래처 제외 */


		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,  sum(h1.prev_balance) as prev_balance 											")
		.total("     , sum(h1.amount) as amount , sum(h1.cash   ) as cash , sum(h1.card   ) as card , sum(h1.bank   ) as bank ")
		.total("     , sum(h1.dc     ) as dc , sum(h1.point  ) as point , sum(h1.bill   ) as bill , sum(h1.gift   ) as gift ")
		.total("     , sum(h1.coupon ) as coupon , sum(h1.payment) as payment ,sum(h1.next_amount ) as next_amount 			")
		.total("     , sum(h1.npay_amt)  as npay_amt  																		")
		.total("     , sum(h1.next_balance) as next_balance , sum(h1.next_payment ) as next_payment 						")
		.total("     , sum(h1.curr_balance) as curr_balance 																")
		;
		data.param
		.query("select h1.*	, (select biz_fax_no from stor where stor_id = h1.owner_id) as stor_fax_no					")
		;

		data.param
		.where("from (  																									")
		.where("	select t1.cust_id, t1.cust_cd, t1.cust_nm  	, t1.biz_email  , t1.biz_fax_no	, t1.owner_id				")
		.where("	       ,sum(t1.curr_balance) - isnull(sum(t2.npay_amt), 0) - isnull(sum(t2.next_balance), 0) as prev_balance  	")
		.where("	       ,isnull(sum(t2.amount), 0) as amount  																")
		.where("	       ,isnull(sum(t2.cash   ), 0) as cash   , isnull(sum(t2.card   ), 0) as card  							")
		.where("	       ,isnull(sum(t2.bank   ), 0) as bank   , isnull(sum(t2.dc     ), 0) as dc  								")
		.where("	       ,isnull(sum(t2.point  ), 0) as point  , isnull(sum(t2.bill   ), 0) as bill  							")
		.where("	       ,isnull(sum(t2.gift   ), 0) as gift   , isnull(sum(t2.coupon ), 0) as coupon  							")
		.where("	       ,isnull(sum(t2.payment), 0) as payment  															")
		.where("	       ,(isnull(sum(t1.curr_balance), 0) - ( isnull(sum(t2.next_amount ), 0)  - isnull(sum(t2.next_payment ), 0)  )) as npay_amt  						")
		.where("	       ,isnull(sum(t2.next_amount   ), 0) as next_amount  													")
		.where("	       ,isnull(sum(t2.next_balance  ), 0) as next_balance  , isnull(sum(t2.next_payment  ), 0) as next_payment")
		.where("	       ,sum(t1.curr_balance) as curr_balance  															")
		.where("	 from (  																								")
		.where("	     select t1.cust_id, sum(t1.npay_amt) as curr_balance , t2.owner_id 									")
		.where("	           ,t2.cust_cd as cust_cd, t2.cust_nm   , t2.biz_email  , t2.biz_fax_no							")
		.where("	   	   from cust_stor t1  																				")
		.where("	            join cust_mst t2 on t1.cust_id = t2.cust_id  												")
		.where("	      where t1.stor_grp       =  :stor_grp       	   "	, 		arg.fixParameter("stor_grp" 		))
		.where("	        and t1.stor_id       =  :stor_id       	   "	, 		arg.getParameter("stor_id" 		))
		.where("	        and t1.cust_id        =  :cust_id       	   "	, 		arg.getParameter("cust_id" 			))
		.where("	        and t1.clss_1        =  :clss_1       	   "	, 		arg.getParameter("clss_1" 			)) // 1차분류
		.where("	        and t1.clss_2        =  :clss_2       	   "	, 		arg.getParameter("clss_2" 			)) // 2차분류
		.where("	        and t1.clss_3        =  :clss_3       	   "	, 		arg.getParameter("clss_3" 			)) // 3차분류
		.where("		group by   t1.cust_id ,  t2.cust_cd , t2.cust_nm  	, t2.biz_email  , t2.biz_fax_no	, t2.owner_id 												") //, t1.salesman_id
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
		.where("	   			   where t1.stor_grp      = :stor_grp       	   "	, 		arg.fixParameter("stor_grp" ))
		.where("   			     	 and t1.inv_dt between 	:fr_dt     	    	   "	, 		arg.fixParameter("fr_dt"	))
		.where("                 				   	and 	:to_dt      	   	   "	, 		arg.fixParameter("to_dt"	))
		.where("	       			 and t1.stor_id      = :stor_id       	   "	, 		arg.getParameter("stor_id" ))
		.where("	       			 and t1.row_sts = 0																	")

		.where("			union all  																						")
		.where("				 select t1.cust_id, 0 as amount  															")
		.where("					   ,0 as payable, 0 as npay_amt  														")
		.where("					   ,decode(t1.pay_gb, '0100', t1.payment, 0) as cash_amount  							")
		.where("					   ,decode(t1.pay_gb, '0200', t1.payment, 0) as card_amount  							")
		.where("					   ,decode(t1.pay_gb, '0101', t1.payment, 0) as bank_amount  							")
		.where("					   ,decode(t1.pay_gb, '0800', t1.payment, 0) as dc_amount  								")
		.where("					   ,decode(t1.pay_gb, '0600', t1.payment, 0) as point_amount  							")
		.where("					   ,decode(t1.pay_gb, '0400', t1.payment, 0) as bill_amount  							")
		.where("					   ,decode(t1.pay_gb, '0500', t1.payment, 0) as gift_amount  							")
		.where("					   ,decode(t1.pay_gb, '0700', t1.payment, 0) as coupon_amount  							")
		.where("					   ,t1.payment  																		")
		.where("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
		.where("					   ,0 as next_payment  																	")
		.where("				  from sale_payment t1  																	")
		.where("				 where t1.stor_grp     = 	:stor_grp       	   "	, 		arg.fixParameter("stor_grp" ))
		.where("   			       and t1.pay_dt between 	:fr_dt     	    	   "	, 		arg.fixParameter("fr_dt"	))
		.where("                 				   	 and 	:to_dt      	   	   "	, 		arg.fixParameter("to_dt"	))
		.where("				   and t1.stor_id     = 	:stor_id       	   "	, 		arg.getParameter("stor_id" ))
		.where("	       		   and t1.row_sts = 0																		")

		.where("			union all  																						")
		.where("				 select t1.cust_id, 0 as amount  															")
		.where("					   ,0 as payable, 0 as npay_amt  														")
		.where("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
		.where("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
		.where("					   ,t1.amount  as next_amount  															")
		.where("					   ,t1.payable as next_payable, t1.npay_amt as next_balance, 0 as next_payment  		")
		.where("				  from sale_mst t1  																		")
		.where("				 where t1.stor_grp  = 		:stor_grp       	   "	, 		arg.fixParameter("stor_grp" ))
		.where("				   and t1.inv_dt 	> 		:to_dt      	   	   "	, 		arg.fixParameter("to_dt"	))
		.where("				   and t1.stor_id  = 		:stor_id       	   "	, 		arg.getParameter("stor_id" ))
		.where("	       		   and t1.row_sts = 0		")

		.where("			union all  																						")
		.where("				 select t1.cust_id, 0 as amount  															")
		.where("					   ,0 as payable, 0 as npay_amt  														")
		.where("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
		.where("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
		.where("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
		.where("					   ,t1.payment as next_payment  														")
		.where("				   from sale_payment t1  																	")
		.where("				  where t1.stor_grp  = 		:stor_grp       	   "	, 		arg.fixParameter("stor_grp" ))
		.where("					and t1.pay_dt 	 > 		:to_dt      	   	   "	, 		arg.fixParameter("to_dt"	))
		.where("					and t1.stor_id  = 		:stor_id       	   "	, 		arg.getParameter("stor_id" ))
		.where("	       			and t1.row_sts = 0																	")
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
		.where("	group by t1.cust_id, t1.cust_cd, t1.cust_nm , t1.biz_email  , t1.biz_fax_no	 , t1.owner_id 															") //  t1.stor_id, , t1.salesman_id, t3.login_id, t3.emp_nm
		.where(") h1  																										")
		.where("order by h1.cust_cd																						")
	    ;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	/**
	 * 상세거래원장 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getStoreDetail(HttpRequestArgument arg, int page , int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.total("select count(1) as maxsize , sum(h1.amount) as amount , sum(h1.npay_amt) as npay_amt 					")
		.total("     , sum(h1.cash   ) as cash , sum(h1.card   ) as card , sum(h1.bank   ) as bank 						")
		.total("     , sum(h1.dc     ) as dc , sum(h1.point  ) as point , sum(h1.bill   ) as bill , sum(h1.gift   ) as gift ")
		.total("     , sum(h1.coupon ) as coupon , sum(h1.etc ) as etc ,  sum(h1.payment) as payment  					")
		.total("     , sum(h1.nugae  ) as nugae	, sum(h1.cal_balance) as cal_balance									")
		;
		data.param
		.query("select h1.* , isnull( :prev_balance , 0) as  prev_balance 				"	,	arg.getParameter("prev_balance" ))
		;
		data.param
		.where(" from ( 																									")
		.where("		select rownum as row_ord, t1.work_type, t1.stor_id, t1.cust_id, t1.inv_dt, t1.inv_no, t1.amount 	")
		.where("		       ,t1.payable, t1.npay_amt 																	")
		.where("		       ,t1.cash, t1.card, t1.bank, t1.dc, t1.point 													")
		.where("		       ,t1.bill, t1.gift, t1.coupon, t1.etc,  t1.payment, t1.sale_memo 								")
		.where("				,decode(t1.work_type, '전미수금', 0, (t1.amount - t1.payment)) as cal_balance					")
		.where("				,sum(decode(t1.work_type, '전미수금', t1.npay_amt, (t1.amount - t1.payment))) 					")
		.where("		        over (order by t1.inv_dt, t1.disp_order, t1.crt_dttm) as nugae 							")
		.where("		       ,t1.stor_nm, t1.cust_cd, t1.cust_nm 														")

		.where("		   from ( 																							")
		.where("		         select t1.work_type, t1.stor_id, t1.cust_id, t1.inv_dt, t1.inv_no, t1.amount 				")
		.where("		               ,t1.payable, t1.npay_amt,  t1.crt_dttm , t1.disp_order								")
		.where("		               ,t1.cash, t1.card, t1.bank, t1.dc, t1.point 											")
		.where("		               ,t1.bill, t1.gift, t1.coupon, t1.etc,  t1.payment, t1.sale_memo 						")
		.where("		               ,t2.stor_nm, t3.cust_cd, t3.cust_nm 												")
		.where("		           from ( 																					")
		.where("						select '전미수금' as work_type, '' as stor_grp, '' as stor_id, '' as cust_id 			")
		.where("								,'/' as inv_dt, '전미수금액=>' as inv_no 										")
		.where("								,0 as amount, 0 as payable, to_number( NVL(  :prev_balance , 0) ) as npay_amt "	, arg.getParameter("prev_balance" )) /* 이월액 prev_balance */
		.where("								,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point 						")
		.where("								,0 as bill, 0 as gift, 0 as coupon, 0 as etc, 0 as payment 					")
		.where("								,'' as sale_memo, 1 as disp_order, '0000-01-01 01:01:01' as crt_dttm 		")
		.where("		                   from dual 																		")
		.where("		                 union all 																			")
		.where("						select '매출' as work_type, t1.stor_grp, t1.stor_id, t1.cust_id, t1.inv_dt 			")
		.where("		                       , t1.inv_no, t1.amount			 											")
		.where("		                       ,t1.payable, t1.npay_amt 													")
		.where("		                       ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point 						")
		.where("		                       ,0 as bill, 0 as gift, 0 as coupon, 0 as etc, 0 as payment 					")
		.where("		                       ,t1.user_memo as sale_memo, 2, t1.crt_dttm 									")
		.where("		                  from sale_mst t1 																")
		.where("						 where t1.stor_grp     = :stor_grp       		"	, 		arg.fixParameter("stor_grp" ))
		.where("						   and t1.stor_id     = :stor_id       		"	, 		arg.getParameter("stor_id" ))
		.where("   			    		   and t1.inv_dt between 	:fr_dt     	      	"	, 		arg.fixParameter("fr_dt"	))
		.where("                 							   and 	:to_dt      	  	"	, 		arg.fixParameter("to_dt"	))
		.where("						   and t1.cust_id      = :cust_id       		"	, 		arg.fixParameter("cust_id" 	))
		.where("						   and t1.row_sts = 0		")
		.where(" 																											")
		.where("		                 union all 																			")
		.where("						select '수금' as work_type, t1.stor_grp, t1.stor_id, t1.cust_id, t1.pay_dt 			")
		.where("		                       ,t1.inv_no, 0 as amount 														")
		.where("		                       ,0 as payable, 0 as npay_amt 												")
		.where("		                       ,sum(decode(t1.pay_gb, '0100', t1.payment, 0)) as cash 						")
		.where("		                       ,sum(decode(t1.pay_gb, '0200', t1.payment, 0)) as card 						")
		.where("		                       ,sum(decode(t1.pay_gb, '0101', t1.payment, 0)) as bank 						")
		.where("		                       ,sum(decode(t1.pay_gb, '0800', t1.payment, 0)) as dc 						")
		.where("		                       ,sum(decode(t1.pay_gb, '0600', t1.payment, 0)) as point 						")
		.where("		                       ,sum(decode(t1.pay_gb, '0400', t1.payment, 0)) as bill 						")
		.where("		                       ,sum(decode(t1.pay_gb, '0500', t1.payment, 0)) as gift 						")
		.where("		                       ,sum(decode(t1.pay_gb, '0700', t1.payment, 0)) as coupon 					")
		.where("		                       ,sum(decode(t1.pay_gb, '0900', t1.payment, 0)) as etc 						")
		.where("		                       ,sum(t1.payment) as payment 													")
		.where("		                       ,'' as sale_memo, 3, '1999-12-12 01:01:01' 									")
		.where("		                  from sale_payment t1												")
		.where("						 where t1.stor_grp     = :stor_grp       		"	, 		arg.fixParameter("stor_grp"))
		.where("						   and t1.stor_id     = :stor_id       		"	, 		arg.getParameter("stor_id"))
		.where("   			    		   and t1.pay_dt between 	:fr_dt     	      	"	, 		arg.fixParameter("fr_dt"	))
		.where("                 			   	    		  and 	:to_dt      	  	"	, 		arg.fixParameter("to_dt"	))
		.where("						   and t1.cust_id      = :cust_id       		"	, 		arg.fixParameter("cust_id" ))
		.where("						   and t1.row_sts = 0																")
		.where("		                  group by t1.stor_grp, t1.stor_id, t1.cust_id, t1.pay_dt, t1.inv_no 				")
		.where("		                ) t1, stor t2, cust_mst t3 														")
		.where("		          where t1.stor_id  = t2.stor_id(+) 														")
		.where("		            and t1.cust_id = t3.cust_id(+) 															")
		.where("		          order by t1.inv_dt, t1.crt_dttm 															")
		.where("		        ) t1 																						")
		.where("	) h1 																									")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}

	}


	/**
	 * 상세거래내역 조회 - 특정 매출
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getStoreDetailItem(HttpRequestArgument arg, int page , int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.total(" select count(1) as maxsize, sum(t2.qty) as qty, sum(t2.sply_amt) as sply_amt  ")
		.total("     ,  sum(t2.amount) as amount , 0 as payment  , sum(t2.tax) as tax		")
		;

		data.param
		.query("		select 	 t3.stor_id, t3.stor_nm 			 						")
		.query("		        ,t1.inv_no, t4.cust_cd , t4.cust_nm				")
		.query("		        ,t1.inv_dt, t5.item_sc, t2.item_code, t2.item_name				")
		.query("		        ,t2.unit_idcd, (select unit_name from item_unit where unit_idcd = t2.unit_idcd) as unit_name	")
		.query("		        ,t2.unit_price, t2.qty, t2.sply_amt , t2.tax				")
		.query("		        ,t2.amount, 0 as payment, '매출' as work_type					")
		.query("		        ,t2.item_spec	, t2.user_memo									")
		;
		data.param
		.where("	    from 	sale_mst t1												")
		.where("			    join sale_dtl t2 on t1.inv_no    = t2.inv_no				")
		.where("				join stor t3     on t1.stor_id  = t3.stor_id				")
		.where("				join cust_mst t4 on t1.cust_id   = t4.cust_id				")
		.where("				left outer join itm_mst t5 on t2.item_idcd   = t5.item_idcd	")
		.where("	    where   t1.inv_no = :inv_no       		"	, 		arg.fixParameter("inv_no"))
		.where("		  and   t1.row_sts = 0											")
		.where("		  and   t2.row_sts = 0											")
		.where("     order by	t1.inv_no , t2.item_code										")
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}

	}


	/**
	 * 상세거래내역 조회 - 전체
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getStoreDetailItemAll(HttpRequestArgument arg, int page , int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.total(" select count(1) as maxsize, sum(t2.qty) as qty, sum(t2.sply_amt) as sply_amt  ")
		.total("     ,  sum(t2.amount) as amount , 0 as payment  , sum(t2.tax) as tax		")
		;

		data.param
		.query("		select 	 t3.stor_id, t3.stor_nm 			 						")
		.query("		        ,t1.inv_no, t4.cust_cd , t4.cust_nm							")
		.query("		        ,t1.inv_dt, t5.item_sc, t2.item_code, t2.item_name				")
		.query("		        ,t2.unit_idcd, (select unit_name from item_unit where unit_idcd = t2.unit_idcd) as unit_name	")
		.query("		        ,t2.unit_price, t2.qty, t2.sply_amt , t2.tax				")
		.query("		        ,t2.amount, 0 as payment, '매출' as work_type					")
		.query("		        ,t2.item_spec	, t2.user_memo									")
		;
		data.param
		.where("	    from 	sale_mst t1												")
		.where("			    join sale_dtl t2 on t1.inv_no    = t2.inv_no				")
		.where("				join stor t3     on t1.stor_id  = t3.stor_id				")
		.where("				join cust_mst t4 on t1.cust_id   = t4.cust_id				")
		.where("				left outer join itm_mst t5 on t2.item_idcd   = t5.item_idcd	")
		.where("				join cust_stor t6 on t1.cust_id   = t6.cust_id	 and t1.stor_id  = t6.stor_id	")
		.where("   		where   t1.stor_grp =	:stor_grp     	"	, 		arg.fixParameter("stor_grp"	))
		.where("   		  and   t1.stor_id =	:stor_id     	"	, 		arg.getParameter("stor_id"	))
		.where("   		  and   t1.inv_dt between 	:fr_dt     	"	, 		arg.fixParameter("fr_dt"	))
		.where("                   			  and 	:to_dt      "	, 		arg.fixParameter("to_dt"	))
		.where("   		  and   t1.cust_id   =	:cust_id     	"	, 		arg.getParameter("cust_id"	))
		.where("	      and   t6.clss_1   =  :clss_1       	"	, 		arg.getParameter("clss_1" 	)) // 1차분류
		.where("	      and   t6.clss_2   =  :clss_2       	"	, 		arg.getParameter("clss_2" 	)) // 2차분류
		.where("	      and   t6.clss_3   =  :clss_3       	"	, 		arg.getParameter("clss_3" 	)) // 3차분류
		.where("		  and   t1.row_sts = 0											")
		.where("		  and   t2.row_sts = 0											")
		.where("     order by	t2.item_code  , t3.stor_nm									")
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}

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
			.query("           ,isnull(sum(t2.etc    ), 0) as etc   															")
			.query("	       ,isnull(sum(t2.npay_amt), 0) as npay_amt, isnull(sum(t2.payment), 0) as payment  				")
			.query("	       ,isnull(sum(t2.next_amount   ), 0) as next_amount  												")
			.query("	       ,isnull(sum(t2.next_balance  ), 0) as next_balance  , isnull(sum(t2.next_payment  ), 0) as next_payment")
			.query("	       ,sum(t1.curr_balance) as curr_balance  															")
			.query("	 from (  																								")
			.query("	     select t1.cust_id, sum(t1.npay_amt) as curr_balance  												")
			.query("	           ,t2.cust_cd as cust_cd, t2.cust_nm   														")
			.query("	   	   from cust_stor t1  																				")
			.query("	            join cust_mst t2 on t1.cust_id = t2.cust_id  												")
			.query("	      where t1.stor_grp       =  :stor_grp       	   "	, 		arg.fixParameter("stor_grp" 		))
			.query("	        and t1.stor_id       =  :stor_id       	   "	, 		arg.getParameter("stor_id" 		))
			.query("	        and t1.cust_id        =  :total_cust_id       	   "	, 		arg.getParameter("total_cust_id" 			))
			.query("	        and t1.clss_1        =  :clss_1       	   "	, 		arg.getParameter("clss_1" 			)) // 1차분류
			.query("	        and t1.clss_2        =  :clss_2       	   "	, 		arg.getParameter("clss_2" 			)) // 2차분류
			.query("	        and t1.clss_3        =  :clss_3       	   "	, 		arg.getParameter("clss_3" 			)) // 3차분류
			.query("		group by   t1.cust_id ,  t2.cust_cd , t2.cust_nm  													")
			.query("		order by t2.cust_nm												 									")
			.query("	    ) t1, (  																							")
			.query("	     select t1.cust_id  																				")
			.query("	           ,sum(t1.amount) as amount  																	")
			.query("	           ,sum(t1.payable) as payable, sum(t1.payment) as payment  									")
			.query("	           ,sum(t1.cash   ) as cash   , sum(t1.card   ) as card  										")
			.query("	           ,sum(t1.bank   ) as bank   , sum(t1.dc     ) as dc  											")
			.query("	           ,sum(t1.point  ) as point  , sum(t1.bill   ) as bill  										")
			.query("	           ,sum(t1.gift   ) as gift   , sum(t1.coupon ) as coupon , sum(t1.etc ) as etc  				")
			.query("	           ,sum(t1.next_amount   ) as next_amount   , sum(t1.next_payment  ) as next_payment  			")
			.query("	           ,sum(t1.next_payable  ) as next_payable  													")
			.query("	           ,sum(t1.amount) - sum(t1.payment) as npay_amt  												")
			.query("	           ,sum(t1.next_amount   ) - sum(t1.next_payment  ) as next_balance  							")
			.query("	       from (  																							")
			.query("	              select t1.cust_id, t1.amount  															")
			.query("	                   ,t1.payable, t1.npay_amt  															")
			.query("	                   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("	                   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  , 0 as etc							")
			.query("	                   ,0 as next_amount,0 as next_payable, 0 as next_balance  								")
			.query("	                   ,0 as next_payment  																	")
			.query("	                from sale_mst t1  																		")
			.query("	   			   where t1.stor_grp      = :stor_grp "	, arg.fixParameter("stor_grp" ))
			.query("   			     	 and t1.inv_dt between 	:fr_dt    "	, arg.fixParameter("fr_dt"	))
			.query("                 				   	and 	:to_dt    "	, arg.fixParameter("to_dt"	))
			.query("	       			 and t1.stor_id      = :stor_id   "	, arg.getParameter("stor_id" ))
			.query("	       			 and t1.row_sts = 0																		")
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,decode(t1.pay_gb, '0100', t1.payment, 0) as cash_amount  							")
			.query("					   ,decode(t1.pay_gb, '0200', t1.payment, 0) as card_amount  							")
			.query("					   ,decode(t1.pay_gb, '0101', t1.payment, 0) as bank_amount  							")
			.query("					   ,decode(t1.pay_gb, '0800', t1.payment, 0) as dc_amount  								")
			.query("					   ,decode(t1.pay_gb, '0600', t1.payment, 0) as point_amount  							")
			.query("					   ,decode(t1.pay_gb, '0400', t1.payment, 0) as bill_amount  							")
			.query("					   ,decode(t1.pay_gb, '0500', t1.payment, 0) as gift_amount  							")
			.query("					   ,decode(t1.pay_gb, '0700', t1.payment, 0) as coupon_amount  							")
			.query("					   ,decode(t1.pay_gb, '0900', t1.payment, 0) as etc_amount  							")
			.query("					   ,t1.payment  																		")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,0 as next_payment  																	")
			.query("				  from sale_payment t1  																	")
			.query("				 where t1.stor_grp     = 	:stor_grp "	, arg.fixParameter("stor_grp" ))
			.query("   			       and t1.pay_dt between 	:fr_dt    "	, arg.fixParameter("fr_dt"	))
			.query("                 				   	 and 	:to_dt    "	, arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id     = 	:stor_id  "	, arg.getParameter("stor_id" ))
			.query("	       		   and t1.row_sts = 0																		")
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  , 0 as etc					")
			.query("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  									")
			.query("					   ,t1.amount  as next_amount  															")
			.query("					   ,t1.payable as next_payable, t1.npay_amt as next_balance, 0 as next_payment  		")
			.query("				  from sale_mst t1  																		")
			.query("				 where t1.stor_grp  = 		:stor_grp "	, arg.fixParameter("stor_grp" ))
			.query("				   and t1.inv_dt 	> 		:to_dt    "	, arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id  = 		:stor_id  "	, arg.getParameter("stor_id" ))
			.query("	       		   and t1.row_sts = 0		")
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  , 0 as etc							")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,t1.payment as next_payment  														")
			.query("				   from sale_payment t1  																	")
			.query("				  where t1.stor_grp  = 		:stor_grp  " , arg.fixParameter("stor_grp" ))
			.query("					and t1.pay_dt 	 > 		:to_dt     " , arg.fixParameter("to_dt"	))
			.query("					and t1.stor_id  = 		:stor_id   " , arg.getParameter("stor_id" ))
			.query("	       			and t1.row_sts = 0																		")
			.query("					   ) t1  																				")
			.query("				  group by  t1.cust_id  																	")
			.query("	    ) t2																								")
			.query("where t1.cust_id   = t2.cust_id(+) 																			")
			;

			if ( inv_no_sale.equals("1") ){ /* 실적없는 거래처 제외  */
				data.param
				.query("	and  ( isnull(t1.curr_balance,0) <>  0 or isnull(t2.amount, 0) <> 0   or isnull(t2.payment ,0 ) <> 0  )		")
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
			.query("	       ,sum(t1.curr_balance) - isnull(sum(t2.npay_amt), 0) - isnull(sum(t2.next_balance), 0) as prev_balance")
			.query("	       ,isnull(sum(t2.amount), 0) as amount  															")
			.query("	       ,isnull(sum(t2.cash   ), 0) as cash   , isnull(sum(t2.card   ), 0) as card  						")
			.query("	       ,isnull(sum(t2.bank   ), 0) as bank   , isnull(sum(t2.dc     ), 0) as dc  						")
			.query("	       ,isnull(sum(t2.point  ), 0) as point  , isnull(sum(t2.bill   ), 0) as bill  						")
			.query("	       ,isnull(sum(t2.gift   ), 0) as gift   , isnull(sum(t2.coupon ), 0) as coupon  					")
			.query("           ,isnull(sum(t2.etc    ), 0) as etc    															")
			.query("	       ,isnull(sum(t2.npay_amt), 0) as npay_amt, isnull(sum(t2.payment), 0) as payment  				")
			.query("	       ,isnull(sum(t2.next_amount   ), 0) as next_amount  												")
			.query("	       ,isnull(sum(t2.next_balance  ), 0) as next_balance  , isnull(sum(t2.next_payment  ), 0) as next_payment")
			.query("	       ,sum(t1.curr_balance) as curr_balance  															")
			.query("	 from (  																								")
			.query("	     select t1.cust_id, sum(t1.npay_amt) as curr_balance  												")
			.query("	           ,t2.cust_cd as cust_cd, t2.cust_nm   														")
			.query("	   	   from cust_stor t1  																				")
			.query("	            join cust_mst t2 on t1.cust_id = t2.cust_id  												")
			.query("	      where t1.stor_grp      =  :stor_grp      " , arg.fixParameter("stor_grp" 		))
			.query("	        and t1.stor_id       =  :stor_id       " , arg.getParameter("stor_id" 		))
			.query("	        and t1.cust_id       =  :total_cust_id " , arg.getParameter("total_cust_id" 			))
			.query("	        and t1.clss_1        =  :clss_1        " , arg.getParameter("clss_1" 			)) // 1차분류
			.query("	        and t1.clss_2        =  :clss_2        " , arg.getParameter("clss_2" 			)) // 2차분류
			.query("	        and t1.clss_3        =  :clss_3        " , arg.getParameter("clss_3" 			)) // 3차분류
			.query("		group by   t1.cust_id ,  t2.cust_cd , t2.cust_nm  													")
			.query("		order by t2.cust_nm												 									")
			.query("	    ) t1, (  																							")
			.query("	     select t1.cust_id  																				")
			.query("	           ,sum(t1.amount) as amount  																	")
			.query("	           ,sum(t1.payable) as payable, sum(t1.payment) as payment  									")
			.query("	           ,sum(t1.cash   ) as cash   , sum(t1.card   ) as card  										")
			.query("	           ,sum(t1.bank   ) as bank   , sum(t1.dc     ) as dc  											")
			.query("	           ,sum(t1.point  ) as point  , sum(t1.bill   ) as bill  										")
			.query("	           ,sum(t1.gift   ) as gift   , sum(t1.coupon ) as coupon  	, sum(t1.etc ) as etc				")
			.query("	           ,sum(t1.next_amount   ) as next_amount   , sum(t1.next_payment  ) as next_payment  			")
			.query("	           ,sum(t1.next_payable  ) as next_payable  													")
			.query("	           ,sum(t1.amount) - sum(t1.payment) as npay_amt  												")
			.query("	           ,sum(t1.next_amount   ) - sum(t1.next_payment  ) as next_balance  							")
			.query("	       from (  																							")
			.query("	              select t1.cust_id, t1.amount  															")
			.query("	                   ,t1.payable, t1.npay_amt  															")
			.query("	                   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("	                   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  , 0 as etc							")
			.query("	                   ,0 as next_amount,0 as next_payable, 0 as next_balance  								")
			.query("	                   ,0 as next_payment  																	")
			.query("	                from sale_mst t1  																		")
			.query("	   			   where t1.stor_grp      = :stor_grp  " , arg.fixParameter("stor_grp" ))
			.query("   			     	 and t1.inv_dt between 	:fr_dt     " , arg.fixParameter("fr_dt"	))
			.query("                 				   	and 	:to_dt     " , arg.fixParameter("to_dt"	))
			.query("	       			 and t1.stor_id      = :stor_id    " , arg.getParameter("stor_id" ))
			.query("	       			 and t1.row_sts = 0																		")

			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,decode(t1.pay_gb, '0100', t1.payment, 0) as cash_amount  							")
			.query("					   ,decode(t1.pay_gb, '0200', t1.payment, 0) as card_amount  							")
			.query("					   ,decode(t1.pay_gb, '0101', t1.payment, 0) as bank_amount  							")
			.query("					   ,decode(t1.pay_gb, '0800', t1.payment, 0) as dc_amount  								")
			.query("					   ,decode(t1.pay_gb, '0500', t1.payment, 0) as point_amount  							")
			.query("					   ,decode(t1.pay_gb, '0400', t1.payment, 0) as bill_amount  							")
			.query("					   ,decode(t1.pay_gb, '0500', t1.payment, 0) as gift_amount  							")
			.query("					   ,decode(t1.pay_gb, '0600', t1.payment, 0) as coupon_amount  							")
			.query("					   ,decode(t1.pay_gb, '0900', t1.payment, 0) as etc_amount  							")
			.query("					   ,t1.payment  																		")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,0 as next_payment  																	")
			.query("				  from sale_payment t1  																	")
			.query("				 where t1.stor_grp     = 	:stor_grp  " , arg.fixParameter("stor_grp" ))
			.query("   			       and t1.pay_dt between 	:fr_dt     " , arg.fixParameter("fr_dt"	))
			.query("                 				   	 and 	:to_dt     " , arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id     = 	:stor_id   " , arg.getParameter("stor_id" ))
			.query("	       		   and t1.row_sts = 0																		")

			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  , 0 as etc							")
			.query("					   ,t1.amount  as next_amount  															")
			.query("					   ,t1.payable as next_payable, t1.npay_amt as next_balance, 0 as next_payment  		")
			.query("				  from sale_mst t1  																		")
			.query("				 where t1.stor_grp  = 		:stor_grp  " , arg.fixParameter("stor_grp" ))
			.query("				   and t1.inv_dt 	> 		:to_dt     " , arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id  = 		:stor_id   " , arg.getParameter("stor_id" ))
			.query("	       		   and t1.row_sts = 0		")

			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point  								")
			.query("					   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment  , 0 as etc							")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,t1.payment as next_payment  														")
			.query("				   from sale_payment t1  																	")
			.query("				  where t1.stor_grp  = 		:stor_grp   " , arg.fixParameter("stor_grp" ))
			.query("					and t1.pay_dt 	 > 		:to_dt      " , arg.fixParameter("to_dt"	))
			.query("					and t1.stor_id  = 		:stor_id    " , arg.getParameter("stor_id" ))
			.query("	       			and t1.row_sts = 0																		")
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
			.query(" group by t1.cust_id, t1.cust_cd, t1.cust_nm  																")
			.query(") h1  																										")
			.query("order by h1.cust_cd																							")
		    ;

			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}



	/**
	 * 출력 - 고객별 거래원장(약식)
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetailPrinting(HttpRequestArgument arg) throws Exception {

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
			.query("	  (select stor_nm from stor where stor_id = :stor_id  group by stor_nm) as stor_nm	 " 		, arg.getParameter("stor_id"  )) /* 사업장 */
			;
		}


		data.param
			.query("    , h1.cust_nm as cust_nm 												")
			.query("    , h1.converted as converted 												")
			.query("    , (substr( :fr_dt , 0,4)) as fr_inv_yy		 					" 		, arg.fixParameter("fr_dt"       ))
			.query("    , (substr( :fr_dt , 5,2)) as fr_inv_mm 		 					" 		, arg.fixParameter("fr_dt"       ))
			.query("    , (substr( :fr_dt , 7,2)) as fr_inv_dd 		 					" 		, arg.fixParameter("fr_dt"       ))
			.query("    , (substr( :to_dt , 0,4)) as to_inv_yy 		 					" 		, arg.fixParameter("to_dt"       ))
			.query("    , (substr( :to_dt , 5,2)) as to_inv_mm 		 					" 		, arg.fixParameter("to_dt"       ))
			.query("    , (substr( :to_dt , 7,2)) as to_inv_dd 		 					" 		, arg.fixParameter("to_dt"       ))
			.query("    , (sum(h1.curr_balance) - isnull(sum(h1.npay_amt), 0) - isnull(sum(h1.next_balance), 0)) as prev_balance 		")
			.query("    , sum(h1.amount) as tot_amount 		, sum(h1.payment) as tot_payment									")
			.query("    , sum(h1.curr_balance) as tot_balance 																	")
			.query("    , (sum(h1.curr_balance) - isnull(sum(h1.npay_amt), 0) - isnull(sum(h1.next_balance), 0)) as tot_pre_balance 	")
			.query("    , (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as print_dt 												")
			.query("from (  																									")
			.query("	select t1.cust_id, t1.cust_cd, t1.cust_nm  , t1.converted	 											")
			.query("	       ,sum(t1.curr_balance) - isnull(sum(t2.npay_amt), 0) - isnull(sum(t2.next_balance), 0) as prev_balance  	")
			.query("	       ,isnull(sum(t2.amount), 0) as amount  															")
			.query("           ,isnull(sum(t2.npay_amt), 0) as npay_amt , isnull(sum(t2.payment), 0) as payment        			")
			.query("	       ,isnull(sum(t2.next_amount   ), 0) as next_amount  												")
			.query("	       ,isnull(sum(t2.next_balance  ), 0) as next_balance  , isnull(sum(t2.next_payment  ), 0) as next_payment")
			.query("	       ,sum(t1.curr_balance) as curr_balance  															")
			.query("	 from (  																								")
			.query("	     select t1.cust_id, sum(t1.npay_amt) as curr_balance  , t2.converted								")
			.query("	           ,t2.cust_cd, t2.cust_nm 				  														")
			.query("	   	   from cust_stor t1  																				")
			.query("	            join cust_mst t2 on t1.cust_id = t2.cust_id  												")
			.query("	      where t1.stor_grp       =  :stor_grp       	   "	, 		arg.fixParameter("stor_grp" 		))
			.query("	        and t1.stor_id       =  :stor_id       	   "	, 		arg.getParameter("stor_id" 		))
			.query("	        and t1.cust_id        =  :total_cust_id        "	, 		arg.fixParameter("total_cust_id" 	))
			.query("		group by   t1.cust_id ,  t2.cust_cd , t2.cust_nm , t2.converted	 									")
			.query("		order by t2.cust_nm												 									")
			.query("	    ) t1, (  																							")
			.query("	     select t1.cust_id  																				")
			.query("	           ,sum(t1.amount) as amount  																	")
			.query("	           ,sum(t1.payable) as payable, sum(t1.payment) as payment  									")
			.query("	           ,sum(t1.next_amount   ) as next_amount   , sum(t1.next_payment  ) as next_payment  			")
			.query("	           ,sum(t1.next_payable  ) as next_payable  													")
			.query("	           ,sum(t1.amount) - sum(t1.payment) as npay_amt  												")
			.query("	           ,sum(t1.next_amount   ) - sum(t1.next_payment  ) as next_balance  							")
			.query("	       from (  																							")
			.query("	              select t1.cust_id, t1.amount  															")
			.query("	                   ,t1.payable, t1.npay_amt  															")
			.query("	                   ,0 as payment  																		")
			.query("	                   ,0 as next_amount,0 as next_payable, 0 as next_balance  								")
			.query("	                   ,0 as next_payment  																	")
			.query("	                from sale_mst t1  																		")
			.query("	   			   where t1.stor_grp      = :stor_grp   " , arg.fixParameter("stor_grp" ))
			.query("   			     	 and t1.inv_dt between 	:fr_dt     	" , arg.fixParameter("fr_dt"	))
			.query("                 				   	and 	:to_dt      " , arg.fixParameter("to_dt"	))
			.query("	       			 and t1.stor_id      = :stor_id     " , arg.getParameter("stor_id" ))
			.query("	        		 and t1.cust_id       = :total_cust_id  " , arg.fixParameter("total_cust_id" 		))
			.query("	       			 and t1.row_sts = 0																	")
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,t1.payment  																		")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,0 as next_payment  																	")
			.query("				  from sale_payment t1  																	")
			.query("				 where t1.stor_grp     = 	:stor_grp      " , arg.fixParameter("stor_grp" ))
			.query("   			       and t1.pay_dt between 	:fr_dt     	   " , arg.fixParameter("fr_dt"	))
			.query("                 				   	 and 	:to_dt         " , arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id     = 	:stor_id       " , arg.getParameter("stor_id" ))
			.query("	        	   and t1.cust_id        =  :total_cust_id " , arg.fixParameter("total_cust_id" 		))
			.query("	       		   and t1.row_sts = 0																		")
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as payment  						")
			.query("					   ,t1.amount  as next_amount  															")
			.query("					   ,t1.payable as next_payable, t1.npay_amt as next_balance, 0 as next_payment  		")
			.query("				  from sale_mst t1  																		")
			.query("				 where t1.stor_grp  = 		:stor_grp      " , arg.fixParameter("stor_grp" ))
			.query("				   and t1.inv_dt 	> 		:to_dt         " , arg.fixParameter("to_dt"	))
			.query("				   and t1.stor_id  = 		:stor_id       " , arg.getParameter("stor_id" ))
			.query("	        	   and t1.cust_id   = 	 	:total_cust_id " , arg.fixParameter("total_cust_id" ))
			.query("	       		   and t1.row_sts = 0																		")
			.query("			union all  																						")
			.query("				 select t1.cust_id, 0 as amount  															")
			.query("					   ,0 as payable, 0 as npay_amt  														")
			.query("					   ,0 as payment  																		")
			.query("					   ,0 as next_amount, 0 as next_payable, 0 as next_balance  							")
			.query("					   ,t1.payment as next_payment  														")
			.query("				   from sale_payment t1  																	")
			.query("				  where t1.stor_grp  = 		:stor_grp      " , arg.fixParameter("stor_grp" ))
			.query("					and t1.pay_dt 	 > 		:to_dt         " , arg.fixParameter("to_dt"	))
			.query("					and t1.stor_id  = 		:stor_id       " , arg.getParameter("stor_id" ))
			.query("	        	    and t1.cust_id   =  	:total_cust_id " , arg.fixParameter("total_cust_id" 		))
			.query("	       			and t1.row_sts = 0																		")
			.query("					   ) t1  																				")
			.query("				  group by  t1.cust_id  																	")
			.query("	    ) t2																								")
			.query("  where t1.cust_id   = t2.cust_id(+) 																		")
			.query("  group by t1.cust_id, t1.cust_cd, t1.cust_nm  , t1.converted												")
			.query("  ) h1  																									")
			.query(" group by h1.cust_nm, h1.converted  															")
			;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			for(SqlResultRow row:info){

				data.param
				.query("select h1.* , isnull( :prev_balance , 0) as  prev_balance 	"	,	row.getParameter("prev_balance" ))
				.query(" from ( 																								")
				.query("		select rownum as row_ord, t1.work_type, t1.stor_id, t1.cust_id, t1.inv_no, t1.amount 			")
				.query("		       ,( (substring( t1.inv_dt , 0,4)) + '-' + (substring( t1.inv_dt , 5,2)) + '-' + (substring( t1.inv_dt , 7,2)) ) as inv_dt	")
				.query("		       ,t1.payable, t1.npay_amt 	, t1.pre_balance											")
				.query("		       ,t1.cash, t1.card, t1.bank, t1.dc, t1.point 												")
				.query("		       ,t1.bill, t1.gift, t1.coupon, t1.etc,  t1.payment, t1.sale_memo 							")
				.query("				,decode(t1.work_type, '전미수금', 0, (t1.amount - t1.payment)) as cal_balance				")
				.query("				,sum(decode(t1.work_type, '전미수금', t1.npay_amt, (t1.amount - t1.payment))) 				")
				.query("		        over (order by t1.inv_dt, t1.disp_order, t1.crt_dttm) as nugae 							")
				.query("		       ,t1.stor_nm, t1.cust_cd, t1.cust_nm 														")

				.query("		   from ( 																						")
				.query("		         select t1.work_type, t1.stor_id, t1.cust_id, t1.inv_dt, t1.inv_no, t1.amount 			")
				.query("		               ,t1.payable, t1.npay_amt,  t1.crt_dttm , t1.disp_order	, t1.pre_balance		")
				.query("		               ,t1.cash, t1.card, t1.bank, t1.dc, t1.point 										")
				.query("		               ,t1.bill, t1.gift, t1.coupon, t1.etc,  t1.payment, t1.sale_memo 					")
				.query("		               ,t2.stor_nm, t3.cust_cd, t3.cust_nm 												")
				.query("		           from ( 																				")
				.query("						select '이월액' as work_type, '' as stor_grp, '' as stor_id, '' as cust_id 		")
				.query("								,'/' as inv_dt, '' as inv_no 											")
				.query("								,to_number( NVL(  :prev_balance , 0) ) as pre_balance "	, row.getParameter("prev_balance" )) /* 이월액 prev_balance */
				.query("								,0 as amount, 0 as payable, to_number( NVL(  :prev_balance , 0) ) as npay_amt "	, row.getParameter("prev_balance" )) /* 이월액 prev_balance */
				.query("								,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point 					")
				.query("								,0 as bill, 0 as gift, 0 as coupon, 0 as etc, 0 as payment 				")
				.query("								,'' as sale_memo, 1 as disp_order, '0000-01-01 01:01:01' as crt_dttm 	")
				.query("		                   from dual 																	")
				.query("		                 union all 																		")
				.query("						select '매출' as work_type, t1.stor_grp, t1.stor_id, t1.cust_id, t1.inv_dt 		")
				.query("		                       , t1.inv_no, t1.amount			 										")
				.query("		                       ,t1.payable, t1.npay_amt 	, 0 as pre_balance							")
				.query("		                       ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point 					")
				.query("		                       ,0 as bill, 0 as gift, 0 as coupon, 0 as etc, 0 as payment 				")
				.query("		                       ,t1.user_memo as sale_memo, 2, t1.crt_dttm 								")
				.query("		                  from sale_mst t1 																")
				.query("						 where t1.stor_grp     = :stor_grp      " , arg.fixParameter("stor_grp" ))
				.query("						   and t1.stor_id      = :stor_id       " , arg.getParameter("stor_id" ))
				.query("   			    		   and t1.inv_dt between 	:fr_dt     	" , arg.fixParameter("fr_dt"	))
				.query("                 							   and 	:to_dt      " , arg.fixParameter("to_dt"	))
				.query("						   and t1.cust_id      = :total_cust_id " , arg.fixParameter("total_cust_id" 	))
				.query("						   and t1.row_sts = 0		")
				.query(" 																											")
				.query("		                 union all 																			")
				.query("						select '수금' as work_type, t1.stor_grp, t1.stor_id, t1.cust_id, t1.pay_dt 			")
				.query("		                       ,t1.inv_no, 0 as amount 														")
				.query("		                       ,0 as payable, 0 as npay_amt 	, 0 as pre_balance							")
				.query("		                       ,sum(decode(t1.pay_gb, '0100', t1.payment, 0)) as cash 						")
				.query("		                       ,sum(decode(t1.pay_gb, '0200', t1.payment, 0)) as card 						")
				.query("		                       ,sum(decode(t1.pay_gb, '0101', t1.payment, 0)) as bank 						")
				.query("		                       ,sum(decode(t1.pay_gb, '0800', t1.payment, 0)) as dc 						")
				.query("		                       ,sum(decode(t1.pay_gb, '0600', t1.payment, 0)) as point 						")
				.query("		                       ,sum(decode(t1.pay_gb, '0400', t1.payment, 0)) as bill 						")
				.query("		                       ,sum(decode(t1.pay_gb, '0500', t1.payment, 0)) as gift 						")
				.query("		                       ,sum(decode(t1.pay_gb, '0700', t1.payment, 0)) as coupon 					")
				.query("		                       ,sum(decode(t1.pay_gb, '0900', t1.payment, 0)) as etc 						")
				.query("		                       ,sum(t1.payment) as payment 													")
				.query("		                       ,'' as sale_memo, 3, '1999-12-12 01:01:01' 									")
				.query("		                  from sale_payment t1																")
				.query("						 where t1.stor_grp     = :stor_grp      " , 		arg.fixParameter("stor_grp"))
				.query("						   and t1.stor_id     = :stor_id       	" , 		arg.getParameter("stor_id"))
				.query("   			    		   and t1.pay_dt between 	:fr_dt     	" , 		arg.fixParameter("fr_dt"	))
				.query("                 			   	    		  and 	:to_dt      " , 		arg.fixParameter("to_dt"	))
				.query("						   and t1.cust_id      = :total_cust_id " , 		arg.fixParameter("total_cust_id" ))
				.query("						   and t1.row_sts = 0																")
				.query("		                  group by t1.stor_grp, t1.stor_id, t1.cust_id, t1.pay_dt, t1.inv_no 				")
				.query("		                ) t1, stor t2, cust_mst t3 															")
				.query("		          where t1.stor_id  = t2.stor_id(+) 														")
				.query("		            and t1.cust_id = t3.cust_id(+) 															")
				.query("		          order by t1.inv_dt, t1.crt_dttm 															")
				.query("		        ) t1 																						")
				.query("	) h1 																									")
				;
			}


			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}


}
