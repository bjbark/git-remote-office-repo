package com.sky.system.recv;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class RecvLedgerService  extends DefaultServiceHandler {


	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows,String sort) throws Exception {

		String inv_no_sale = arg.fixParameter("inv_no_sale").toString() ; /* 거래없는 거래처 제외 */


		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize , (sum(h1.vend_npay) - isnull(sum(h1.npay_amt), 0) - isnull(sum(h1.next_balance), 0)) as prev_balance ")
		.total("     , sum(h1.amount) as amount , sum(h1.cash   ) as cash , sum(h1.card   ) as card , sum(h1.bank   ) as bank ")
		.total("     , sum(h1.dc     ) as dc , sum(h1.point  ) as point , sum(h1.bill   ) as bill , sum(h1.gift   ) as gift ")
		.total("     , sum(h1.coupon ) as coupon , sum(h1.npay_amt) as npay_amt , sum(h1.payment) as payment ,sum(h1.next_amount ) as next_amount ")
		.total("     , sum(h1.next_balance) as next_balance , sum(h1.next_payment ) as next_payment 						")
		.total("     , sum(h1.vend_npay) as vend_npay 																")
		;
		data.param
		.query("select h1.*																									")
		;
		data.param
		.where(" from ( 																									")
		.where("select t1.stor_grp, t1.vend_id, t1.vend_cd, t1.vend_nm, t3.login_id as emp_no, t3.emp_nm , t1.salesman_id ")
		.where("       ,(select emp_nm from usr_mst where emp_id = t1.salesman_id) as salesman_nm 						")
		.where("       ,sum(t1.vend_npay) - isnull(sum(t2.npay_amt), 0) - isnull(sum(t2.next_balance), 0) as prev_balance 		")
		.where("       ,isnull(sum(t2.amount), 0) as amount 																	")
		.where("       ,isnull(sum(t2.cash   ), 0) as cash   , isnull(sum(t2.card   ), 0) as card 								")
		.where("       ,isnull(sum(t2.bank   ), 0) as bank   , isnull(sum(t2.dc     ), 0) as dc 									")
		.where("       ,isnull(sum(t2.point  ), 0) as point  , isnull(sum(t2.bill   ), 0) as bill 								")
		.where("       ,isnull(sum(t2.gift   ), 0) as gift   , isnull(sum(t2.coupon ), 0) as coupon 								")
		.where("       ,isnull(sum(t2.npay_amt), 0) as npay_amt, isnull(sum(t2.payment), 0) as payment 								")
		.where("       ,isnull(sum(t2.next_amount   ), 0) as next_amount 														")
		.where("       ,isnull(sum(t2.next_balance  ), 0) as next_balance  , isnull(sum(t2.next_payment  ), 0) as next_payment 	")
		.where("       ,sum(t1.vend_npay) as vend_npay 																")
		.where(" from ( 																									")
		.where("     select t1.stor_grp, t1.vend_id, sum(isnull(t3.npay_amt,0)) as vend_npay 								")
		.where("           ,t2.vend_cd as vend_cd, t2.vend_nm , t1.salesman_id 												")
        .where("   	   from vend_store t1 																					")
        .where("            join vend_mst t2 on t1.vend_id = t2.vend_id 													")
        .where("            join vend_npay t3 on t1.stor_grp = t3.stor_grp and t1.vend_id = t3.vend_id 					")
		.where("       							and t3.stor_id = :stor_id  "	, 		arg.getParameter("stor_id" 		))
		.where("      where t1.stor_grp       = 	:stor_grp       	   "	, 		arg.fixParameter("stor_grp" 		))
		.where("        and t1.vend_id        = 	:vend_id       	   		"	, 		arg.getParameter("vend_id" 			))
		.where("        and t1.clss_5        = 	:clss_5       	   		"	, 		arg.getParameter("clss_5" 			))
		.where("        and t1.clss_6        = 	:clss_6       	   		"	, 		arg.getParameter("clss_6" 			))
		.where("	  group by  t1.stor_grp,  t1.vend_id ,  t2.vend_cd , t2.vend_nm , t1.salesman_id 						")
		.where("    ) t1, ( 																								")
		.where("     select t1.stor_grp, t1.vend_id 																		")
		.where("           ,sum(t1.amount) as amount 																		")
		.where("           ,sum(t1.payable) as payable, sum(t1.payment) as payment 											")
		.where("           ,sum(t1.cash   ) as cash   , sum(t1.card   ) as card 											")
		.where("           ,sum(t1.bank   ) as bank   , sum(t1.dc     ) as dc 												")
		.where("           ,sum(t1.point  ) as point  , sum(t1.bill   ) as bill 											")
		.where("           ,sum(t1.gift   ) as gift   , sum(t1.coupon ) as coupon 											")
		.where("           ,sum(t1.next_amount   ) as next_amount   , sum(t1.next_payment  ) as next_payment 				")
		.where("           ,sum(t1.next_payable  ) as next_payable 															")
		.where("           ,sum(t1.amount) - sum(t1.payment) as npay_amt 													")
		.where("           ,sum(t1.next_amount   ) - sum(t1.next_payment  ) as next_balance 								")
		.where("       from ( 																								")
		.where("              select t1.stor_grp, t1.vend_id, t1.amount 													")
		.where("                   ,t1.payable, t1.npay_amt 																	")
		.where("                   ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point 									")
		.where("                   ,0 as bill, 0 as gift, 0 as coupon, 0 as payment 										")
		.where("                   ,0 as next_amount,0 as next_payable, 0 as next_balance 									")
		.where("                   ,0 as next_payment 																		")
		.where("                from ist_mst t1 																			")
		.where("   			   where t1.stor_grp = 		:stor_grp     	    "	, 		arg.fixParameter("stor_grp"			))
		.where("   			     and t1.inv_dt between 	:fr_dt     	    	"	, 		arg.fixParameter("fr_dt"			))
		.where("                 				   and 	:to_dt      	   	"	, 		arg.fixParameter("to_dt"			))
		.where("       			 and t1.stor_id       = :stor_id          "	, 		arg.getParameter("stor_id" 		))
		.where("                 and t1.row_sts = 0 				                                                        ")

		.where("     union all 																								")
		.where("     select t1.stor_grp, t1.vend_id, 0 as amount 															")
		.where("           ,0 as payable, 0 as npay_amt 																		")
		.where("           ,case when t2.pay_gb = '0100' then t2.payment else 0 end  as cash_amount 										")
		.where("           ,case when t2.pay_gb = '0200' then t2.payment else 0 end  as card_amount 										")
		.where("           ,case when t2.pay_gb = '0101' then t2.payment else 0 end  as bank_amount 										")
		.where("           ,case when t2.pay_gb = '0800' then t2.payment else 0 end  as dc_amount 											")
		.where("           ,case when t2.pay_gb = '0500' then t2.payment else 0 end  as point_amount 										")
		.where("           ,case when t2.pay_gb = '0400' then t2.payment else 0 end  as bill_amount 										")
		.where("           ,case when t2.pay_gb = '0500' then t2.payment else 0 end  as gift_amount 										")
		.where("           ,case when t2.pay_gb = '0600' then t2.payment else 0 end  as coupon_amount 										")
		.where("           ,t2.payment 																					")
		.where("           ,0 as next_amount, 0 as next_payable, 0 as next_balance 											")
		.where("           ,0 as next_payment 																				")
        .where(" 	  from ist_mst t1 																					")
        .where("           join ist_payment t2 on t1.inv_no = t2.inv_no 													")
		.where("   	 where t1.stor_grp = 		:stor_grp     	   		"	, 		arg.fixParameter("stor_grp"				))
		.where("   	   and t2.pay_dt between 	:fr_dt         			"	, 		arg.fixParameter("fr_dt"				))
		.where("         				 and 	:to_dt     	    		"	, 		arg.fixParameter("to_dt"				))
		.where("       and t1.stor_id     = 	:stor_id          		"	, 		arg.getParameter("stor_id" 			))
		.where("       and t1.row_sts = 0 		          		                                                        ")
		.where(" 																											")
		.where("     union all 																								")
		.where("     select t1.stor_grp, t1.vend_id, 0 as amount 															")
		.where("           ,0 as payable, 0 as npay_amt 																		")
		.where("           ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point 											")
		.where("           ,0 as bill, 0 as gift, 0 as coupon, 0 as payment 												")
		.where("           ,t1.amount  as next_amount 																		")
		.where("           ,t1.payable as next_payable, t1.npay_amt as next_balance, 0 as next_payment 						")
		.where("      from ist_mst t1 																					")
		.where("   	 where t1.stor_grp = 		:stor_grp     	   		"	, 		arg.fixParameter("stor_grp"				))
		.where("       and t1.inv_dt 	> 		:to_dt         			"	, 		arg.fixParameter("to_dt"				))
		.where("       and t1.stor_id  = 		:stor_id          		"	, 		arg.getParameter("stor_id" 			))
		.where("       and t1.row_sts = 0 		          		                                                        ")
		.where(" 																											")
		.where("     union all 																								")
		.where("     select t1.stor_grp, t1.vend_id, 0 as amount 															")
		.where("           ,0 as payable, 0 as npay_amt 																		")
		.where("           ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point 											")
		.where("           ,0 as bill, 0 as gift, 0 as coupon, 0 as payment 												")
		.where("           ,0 as next_amount, 0 as next_payable, 0 as next_balance 											")
		.where("           ,t2.payment as next_payment 																		")
        .where("   	   from ist_mst t1 																					")
        .where("            join ist_payment t2 on t1.inv_no    = t2.inv_no 												")
		.where("      where t1.stor_grp = 		:stor_grp     	   		"	, 		arg.fixParameter("stor_grp"				))
		.where("        and t1.pay_dt 	> 		:to_dt         			"	, 		arg.fixParameter("to_dt"				))
		.where("        and t1.stor_id  = 		:stor_id         		"	, 		arg.getParameter("stor_id" 			))
		.where("        and t1.row_sts = 0 		          		                                                        ")
		.where("           ) t1 																							")
		.where("      group by t1.stor_grp, t1.vend_id 																		")
		.where("    ) t2, usr_mst t3 																						")
		.where("where t1.stor_grp  = t2.stor_grp(+) 																	")
		.where("  and t1.vend_id = t2.vend_id(+)																		")
		;
		if ( inv_no_sale.equals("1") ){ /* 실적없는 거래처 제외  */
			data.param
			.where("	and  ( isnull(t1.vend_npay,0) <>  0 or isnull(t2.amount, 0) <> 0   or isnull(t2.payment ,0 ) <> 0  )		")
			;
		}

		data.param
		.where("  and t1.salesman_id = t3.emp_id(+) 																		")
		.where("group by t1.stor_grp, t1.vend_id, t1.vend_cd, t1.vend_nm, t1.salesman_id, t3.login_id, t3.emp_nm 			")
		.where(") h1																						")
		.where("order by h1.vend_cd 																						")
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
	public SqlResultMap getStoreDetail(HttpRequestArgument arg, int page , int rows,String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");


		data.param
		.total("select count(1) as maxsize , sum(h1.amount) as amount , sum(h1.npay_amt) as npay_amt 						")
		.total("     , sum(h1.cash   ) as cash , sum(h1.card   ) as card , sum(h1.bank   ) as bank 							")
		.total("     , sum(h1.dc     ) as dc , sum(h1.point  ) as point , sum(h1.bill   ) as bill , sum(h1.gift   ) as gift ")
		.total("     , sum(h1.coupon ) as coupon ,  sum(h1.payment) as payment  											")
		;
		data.param
		.query("select h1.* , isnull( :prev_balance , 0) as  prev_balance 				"	,	arg.getParameter("prev_balance" ))
		;
		data.param
		.where(" from ( 																									")
		.where("		select rownum as row_ord, t1.work_type, t1.stor_id, t1.vend_id, t1.inv_dt, t1.inv_no, t1.amount 	")
		.where("		       ,t1.payable, t1.npay_amt 																	")
		.where("		       ,t1.cash, t1.card, t1.bank, t1.dc, t1.point 													")
		.where("		       ,t1.bill, t1.gift, t1.coupon, t1.payment, t1.recv_memo 										")
		.where("		       ,t1.stor_nm, t1.vend_cd, t1.vend_nm 															")

		.where("		   from ( 																							")
		.where("		         select t1.work_type, t1.stor_id, t1.vend_id, t1.inv_dt, t1.inv_no, t1.amount 				")
		.where("		               ,t1.payable, t1.npay_amt,  t1.crt_dttm 												")
		.where("		               ,t1.cash, t1.card, t1.bank, t1.dc, t1.point 											")
		.where("		               ,t1.bill, t1.gift, t1.coupon, t1.payment, t1.recv_memo 								")
		.where("		               ,t2.stor_nm, t3.vend_cd, t3.vend_nm 													")
		.where("		           from ( 																					")
		.where("						select '매입' as work_type, t1.stor_grp, t1.stor_id, t1.vend_id, t1.inv_dt 			")
		.where("		                       , t1.inv_no, t1.amount			 											")
		.where("		                       ,t1.payable, t1.npay_amt 													")
		.where("		                       ,0 as cash, 0 as card, 0 as bank, 0 as dc, 0 as point 						")
		.where("		                       ,0 as bill, 0 as gift, 0 as coupon, 0 as payment 							")
		.where("		                       ,t1.user_memo as recv_memo, 2, t1.crt_dttm 									")
		.where("		                  from ist_mst t1 																	")
		.where("						 where t1.stor_id      = :stor_id       		"	, 		arg.fixParameter("stor_id" ))
		.where("   			    		   and t1.inv_dt between 	:fr_dt     	      	"	, 		arg.fixParameter("fr_dt"	))
		.where("                 							   and 	:to_dt      	  	"	, 		arg.fixParameter("to_dt"	))
		.where("						   and t1.vend_id      = :vend_id       		"	, 		arg.fixParameter("vend_id" 	))
		.where("                           and t1.row_sts = 0 		          		                                    ")
		.where(" 																											")
		.where("		                 union all 																			")
		.where("						select '지급' as work_type, t1.stor_grp, t1.stor_id, t1.vend_id, t2.pay_dt 			")
		.where("		                       ,t2.inv_no, 0 as amount 														")
		.where("		                       ,0 as payable, 0 as npay_amt 												")
		.where("                               ,sum(case when t2.pay_gb = '0100' then t2.payment else 0 end)  as cash 		")
		.where("                               ,sum(case when t2.pay_gb = '0200' then t2.payment else 0 end)  as card 		")
		.where("                               ,sum(case when t2.pay_gb = '0101' then t2.payment else 0 end)  as bank 		")
		.where("                               ,sum(case when t2.pay_gb = '0800' then t2.payment else 0 end)  as dc 		")
		.where("                               ,sum(case when t2.pay_gb = '0500' then t2.payment else 0 end)  as point 		")
		.where("                               ,sum(case when t2.pay_gb = '0400' then t2.payment else 0 end)  as bill 		")
		.where("                               ,sum(case when t2.pay_gb = '0500' then t2.payment else 0 end)  as gift 		")
		.where("                               ,sum(case when t2.pay_gb = '0600' then t2.payment else 0 end)  as coupon 	")
		.where("		                       ,sum(t2.payment) as payment 													")
		.where("		                       ,'' as recv_memo, 3, '1999-12-12 01:01:01' 									")
		.where("		                  from ist_mst t1, ist_payment t2 												")
		.where("						 where t1.stor_id     = :stor_id       			", 		arg.fixParameter("stor_id"))
		.where("   			    		   and t2.pay_dt between 	:fr_dt     	      	", 		arg.fixParameter("fr_dt"	))
		.where("                 			   	    		  and 	:to_dt      	  	", 		arg.fixParameter("to_dt"	))
		.where("						   and t1.vend_id      = :vend_id       		", 		arg.fixParameter("vend_id" ))
		.where("                           and t1.row_sts = 0 		          		                                    ")
		.where("		                   and t1.inv_no       = t2.inv_no 													")
		.where("		                  group by t1.stor_grp, t1.stor_id, t1.vend_id, t2.pay_dt, t2.inv_no 				")
		.where("		                ) t1, stor t2, vend_mst t3 														")
		.where("		          where t1.stor_id  = t2.stor_id(+) 														")
		.where("		            and t1.vend_id = t3.vend_id(+) 															")
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
	 * 상세거래내역 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getStoreDetailItem(HttpRequestArgument arg, int page , int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.total(" select count(1) as maxsize, sum(t2.qty) as qty, sum(t2.sply_amt) as sply_amt  ")
		.total("     ,  sum(t2.amount) as amount , 0 as payment  , sum(t2.tax) as tax, sum(t2.tax_free) as tax_free ")
		;

		data.param
		.query("		select 	 t3.stor_id, t3.stor_nm as stor_nm 							")
		.query("		        ,t1.inv_no, t4.vend_cd as vend_cd, t4.vend_nm				")
		.query("		        ,t1.inv_dt, t5.item_sc, t2.item_code, t2.item_name				")
		.query("		        ,t2.unit_idcd, (select unit_name from item_unit where unit_idcd = t2.unit_idcd) as unit_name	")
		.query("		        ,t2.unit_price, t2.qty, t2.sply_amt ,t2.tax, t2.tax_free	")
		.query("		        ,t2.amount, 0 as payment, '매입' as work_type					")
		.query("		        ,t2.item_spec	, t2.user_memo									")
		;
		data.param
		.where("	    from 	ist_mst t1													")
		.where("			    join recv_item t2 on t1.inv_no   = t2.inv_no				")
		.where("				join stor t3      on t1.stor_id  = t3.stor_id				")
		.where("				join vend_mst t4  on t1.vend_id  = t4.vend_id				")
		.where("				left outer join itm_mst t5 on t2.item_idcd    = t5.item_idcd	")
		.where("	    where   t1.inv_no = :inv_no       		"	, 		arg.fixParameter("inv_no"))
		.where("          and   t1.row_sts = 0 		          		                    ")
		.where("     order by	t1.inv_no , t2.item_code										")
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}

	}


}
