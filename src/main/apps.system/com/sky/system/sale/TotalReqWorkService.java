package com.sky.system.sale;

import net.sky.core.exception.ServiceException;
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
public class TotalReqWorkService  extends DefaultServiceHandler {

	/**
	 * 현황
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		String[] total_req_gubun = arg.getParamCast("total_req_gubun", String[].class);

		DataMessage data = arg.newStorage("POS");
		
		data.param // 쿼리문  입력
			.total("select count(1) as maxsize	, sum(a.bal_amt_m ) as bal_amt_m	, sum(a.inv_amt_m) as inv_amt_m ")
			.total("   ,   sum(a.pay_amt_m) as pay_amt_m , sum(a.tot_amt_m) as tot_amt_m				 ")
			.total("   ,   sum(a.dchalin_m) as dchalin_m 												 ")
			.total("   ,   sum(a.bal_amt_t) as bal_amt_t , sum(a.inv_amt_t) as inv_amt_t  			 	 ")
			.total("   ,   sum(a.pay_amt_t) as pay_amt_t , sum(a.tot_amt_t) as tot_amt_t				 ")
			.total("   ,   sum(a.dchalin_t) as dchalin_t 												 ")
			.total("   ,   sum(a.chain_bal_amt) as chain_bal_amt, sum(a.chain_mngt_amt) as chain_mngt_amt	 ")
			.total("   ,   sum(a.pos_bal_amt) as pos_bal_amt,	sum(a.pos_inv_amt) as pos_inv_amt 		 ")
			.total("   ,   sum(a.chain_pay_amt) as chain_pay_amt,	sum(a.chain_tot_amt) as chain_tot_amt ")
			.total("   ,   sum(a.pos_pay_amt) as pos_pay_amt,	sum(a.pos_tot_amt) as pos_tot_amt 		")
			.total("   ,   sum(a.van_fee) as van_fee,	sum(a.bill_amount) as bill_amount 		")
		;
		
		data.param // 쿼리문  입력
			.query("select a.stor_grp                                                                     ")
			.query("      ,c.biz_email    				                                                  ")
			.query("      ,c.biz_fax_no             				                                       ")
			.query("      ,a.lock_ym                                                                      ")
			.query("      ,a.cust_id                                                                      ")
			.query("      ,b.cust_cd                                                                      ")
			.query("      ,b.cust_nm                                                                      ")
			.query("      ,b.biz_email  as reve_email                                  	                  ")
			.query("      ,b.biz_fax_no as reve_fax_no                                    				  ")
			.query("      ,a.visit_yn                                                                     ")
			.query("      ,a.bal_amt_m                                                                    ")
			.query("      ,a.inv_amt_m                                                                    ")
			.query("      ,a.pay_amt_m                                                                    ")
			.query("      ,a.dc_rate_m                                                                    ")
			.query("      ,a.dchalin_m                                                                    ")
			.query("      ,a.dc_yn_m                                                                      ")
			.query("      ,a.tot_amt_m                                                                    ")
//			.query("      ,invoice_m                                                                      ")
			.query("      ,a.bal_amt_t                                                                    ")
			.query("      ,a.inv_amt_t                                                                    ")
			.query("      ,a.pay_amt_t                                                                    ")
			.query("      ,a.dc_rate_t                                                                    ")
			.query("      ,a.dchalin_t                                                                    ")
			.query("      ,a.dc_yn_t                                                                      ")
			.query("      ,a.tot_amt_t                                                                    ")
//			.query("      ,invoice_t                                                                    ")
			.query("      ,a.chain_bal_amt                                                                ")
			.query("      ,a.chain_mngt_amt                                                                ")
			.query("      ,a.pos_bal_amt                                                                  ")
			.query("      ,a.pos_inv_amt                                                                  ")
			.query("      ,a.chain_pay_amt                                                                ")
			.query("      ,a.chain_tot_amt                                                                ")
			.query("      ,a.pos_pay_amt                                                                  ")
			.query("      ,a.pos_tot_amt                                                                  ")
			.query("      ,a.van_fee                                                                  ")
			.query("      ,a.bill_amount		                                                            ")
			.query("      ,a.row_clos		                                                            ")
			.query("      ,b.converted		                                                            ")
//			.query("      ,tot_amt_m + tot_amt_t + chain_tot_amt + pos_tot_amt + van_fee as tot_amt ")
//			.query("      ,invoice_m + invoice_t + chain_tot_amt + pos_tot_amt + van_fee as tot_amt ")
			;
		data.param
			.where("  from bill_month  a                                                                 ")
			.where("       left outer join cust_mst b on b.cust_id = a.cust_id                         ")
			.where("       left outer join store c on c.stor_id = :stor_id  	                        ", arg.fixParameter("stor_id"))
			.where(" where trim(a.lock_ym) = :fr_dt                                                     ", arg.fixParameter("fr_dt"))
			.where("   and a.stor_grp = :stor_grp                                                       ", arg.getParameter("stor_grp"))
			.where("   and b.cust_nm  like %:cust_nm%                                                   ", arg.getParameter("cust_nm"))
		    .where("   and a.class_id in (:total_req_gubun )    					" , total_req_gubun ,( total_req_gubun.length > 0) ) /* 고객분류 */
		    ;
		
		if ( !"".equals(arg.getParamText("clss_2") ) ){
			data.param
			.where("   and a.cust_id in (select cust_id from cust_stor where stor_id  = :stor_id  ",  arg.getParameter("stor_id"))
			.where("                        and clss_2  = :clss_2  )								 ",  arg.getParameter("clss_2"))
			;
		}
		
		data.param
			.where("   and a.row_sts = 0                                                                ")
			.where(" order by a.cust_nm                                                                   ")
		;
		
		if (page == 0 && rows == 0){
		     return data.selectForMap(sort);
		} else {
		     return data.selectForMap(page, rows, (page==1),sort);
		}
		
//		return data.selectForMap();
	}
	
	/**
	 * 실적집계
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setCloseBillMonth(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		
		data.param
			.query("select count(a.cust_id)   									")
			.query("  from bill_month a   										")
			.query(" where trim(a.lock_ym)  = :base_dt ",   arg.fixParamText("base_dt"))
			.query("   and a.row_clos =  1   									") /* 확정 */
			;
//		SqlResultRow close = data.selectForRow();
		
		int close =  data.selectForInt();
//		System.out.println("select ="+data.selectForInt() );
//		System.out.println("close ="+close);
		
		if ( close == 0   ){ /* 확정수량이 0일 경우 */
			data.clear();
	        data.param
				.query("call net_package_closejob.close_bill_month                ")
				.query("     (                                                    ")
				.query("     :base_dt                                             ", arg.fixParamText("base_dt"))
//				.query("    ,:hq_id                                            ", arg.fixParamText("hq_id"))
				.query("     )                                                    ")
				.action = Action.direct;
	    	data.attach();
	    	
	    	data.execute();
			
		} else {
			throw new ServiceException("자료가 확정되어 실적집계를 진행할 수 없습니다.");
		}
		
		return null;
	}

	/**
	 * 체인회비 확정
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setConfirmBillMonth(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage data1 = arg.newStorage("POS");
		
		data1.param // 쿼리문  입력
		.query("select a.stor_grp                                                                     ")
		.query("      ,a.lock_ym                                                                      ")
		.query("      ,a.cust_id                                                                      ")
		.query("      ,a.visit_yn                                                                     ")
		.query("      ,a.bal_amt_m                                                                    ")
		.query("      ,a.inv_amt_m                                                                    ")
		.query("      ,a.pay_amt_m                                                                    ")
		.query("      ,a.dc_rate_m                                                                    ")
		.query("      ,a.dchalin_m                                                                    ")
		.query("      ,a.dc_yn_m                                                                      ")
		.query("      ,a.tot_amt_m                                                                    ")
		.query("      ,a.bal_amt_t                                                                    ")
		.query("      ,a.inv_amt_t                                                                    ")
		.query("      ,a.pay_amt_t                                                                    ")
		.query("      ,a.dc_rate_t                                                                    ")
		.query("      ,a.dchalin_t                                                                    ")
		.query("      ,a.dc_yn_t                                                                      ")
		.query("      ,a.tot_amt_t                                                                    ")
		.query("      ,a.chain_bal_amt                                                                ")
		.query("      ,a.chain_mngt_amt                                                                ")
		.query("      ,a.pos_bal_amt                                                                  ")
		.query("      ,a.pos_inv_amt                                                                  ")
		.query("      ,a.chain_pay_amt                                                                ")
		.query("      ,a.chain_tot_amt                                                                ")
		.query("      ,a.pos_pay_amt                                                                  ")
		.query("      ,a.pos_tot_amt                                                                  ")
		.query("      ,a.van_fee                                                                  ")
		.query("      ,a.bill_amount		                                                          ")
		.query("  from bill_month  a                                                                  ")
//		.query("       left outer join cust_stor b on b.stor_id =     '" +stor_id+ "'  			  ")
//		.query("                              and b.cust_id  = a.cust_id                              ")
//		.query("                              and b.clss_2  = :clss_2    " , clss_2			  	   )
		.query(" where trim(a.lock_ym) =   :base_dt ",   arg.fixParamText("base_dt"				      ))
		.query("   and a.row_clos = 0		                                                          ")
		;
		SqlResultMap bill = data1.selectForMap();
//		System.out.println("bill ="+bill);
		data1.clear();
		
		String upt_nm = arg.getParamText("upt_nm");
		String dept_id   = arg.getParamText("dept_id");
		String ip =  arg.remoteAddress.toString() ;
		
		for (SqlResultRow row:bill) {
			double chain_mngt_amt 	= Double.parseDouble(row.getParamText("chain_mngt_amt")) ; /* 청구 체인비 */
			double pos_inv_amt 	= Double.parseDouble(row.getParamText("pos_inv_amt")) ; /* 청구 포스사용료 */
			data.clear();
			
//			System.out.println("ip ="+ip);
//			System.out.println("upt_nm ="+arg.fixParamText("upt_nm"));
			
			if ( chain_mngt_amt > 0 ){   /* 체인비가 0이 아닌 경우 체인비 매출 생성 */
				System.out.println("row ="+row);
				/* sale_mst 생성 */
//				data.clear();
				System.out.println("chain =");
				data.param
				.query("insert into sale_mst s1 ( 							")
				.query("       s1.corp_id 									")
				.query("     , s1.hq_id 									")
				.query("     , s1.stor_grp 									")
				.query("     , s1.stor_id 									")
				.query("     , s1.wrhs_id 									")
				.query("     , s1.pos_no 									")
				.query("     , s1.inv_no 									")
				.query("     , s1.inv_dt 									")
				.query("     , s1.inv_tm 									")
//				.query("     , s1.inv_nm 									")
				.query("     , s1.ret_yn 									")
				.query("     , s1.inv_work_id 								")
				.query("     , s1.inv_work_gb 								")
				.query("     , s1.inv_dept_id 								")
				.query("     , s1.inv_usr_id 								")
				.query("     , s1.sts_cd 									")
				.query("     , s1.pay_dt 									")
				.query("     , s1.cust_id 									")
				.query("     , s1.cust_nm 									")
				.query("     , s1.cust_gb 									")
				.query("     , s1.mmb_id 									")
				.query("     , s1.mmb_nm 									")
				.query("     , s1.sales_id 									")
				.query("     , s1.price_no 									")
				.query("     , s1.tax_type 									")
				.query("     , s1.tax_rt 									")
				.query("     , s1.tax_free 									")
				.query("     , s1.taxation 									")
				.query("     , s1.sply_amt 									")
				.query("     , s1.tax 										")
				.query("     , s1.amount 									")
				.query("     , s1.payable 									")
				.query("     , s1.payment 									")
				.query("     , s1.npay_amt 									")
				.query("     , s1.qty 										")
				.query("     , s1.org_ord_qty 									")
				.query("     , s1.ship_qty 									")
			
				.query("     , s1.biz_no 									")
				.query("     , s1.biz_nm 									")
				.query("     , s1.biz_type 									")
				.query("     , s1.biz_type 								")
				.query("     , s1.biz_owner 								")
				.query("     , s1.biz_state 								")
				.query("     , s1.biz_city 									")
				.query("     , s1.biz_dong 									")
				.query("     , s1.biz_zip_cd 								")
				.query("     , s1.biz_addr_1 								")
				.query("     , s1.biz_addr_2 								")
				.query("     , s1.biz_email 								")
				.query("     , s1.biz_tel_no 								")
				.query("     , s1.biz_hp_no 								")
				.query("     , s1.biz_fax_no 								")
				
				.query("     , s1.reve_nm 									")
				.query("     , s1.reve_state 								")
				.query("     , s1.reve_city 								")
				.query("     , s1.reve_dong 								")
				.query("     , s1.reve_zip_cd 								")
				.query("     , s1.reve_addr_1 								")
				.query("     , s1.reve_addr_2 								")
				.query("     , s1.reve_email 								")
				.query("     , s1.reve_tel_no 								")
				.query("     , s1.reve_hp_no 								")
				.query("     , s1.reve_fax_no  								")
				     
				.query("     , s1.user_memo   								")
				.query("     , s1.upt_nm      							")                   
				.query("     , s1.upt_ip 								")
				.query("     , s1.upt_dttm 								")
				.query("     , s1.crt_nm    								")                     
				.query("     , s1.crt_ip 								")
				.query("     , s1.crt_dttm 								")
				.query("     ) 												")
				.query("select  											")
				.query("   t1.hq_id                                      ")
				.query(" , t1.hq_id 										")
				.query(" , t1.stor_grp 										")
				.query(" , 'N2310ALPHA1000' 								")
				.query(" , 'N2310ALPHA1000' 								")
				.query(" , '00' as pos_no 									")
				.query(" , ('2310'||t1.lock_ym||t2.cust_cd||'5' ) as inv_no ")
//				.query(" , to_char(last_day( to_date( sysdate ) )  , 'YYYYMMDD') as inv_dt 		")
				.query(" , to_char(last_day(  to_date( t1.lock_ym, 'YYYYMM') )    , 'YYYYMMDD' ) as inv_dt 		")
				.query(" , to_char( sysdate, 'hh24mi') as inv_tm 			")
//				.query(" , '알파유통/체인운영비' as inv_nm 						")
				.query(" , '0' as ret_yn 									")
				.query(" , '1' as inv_work_id 								")
				.query(" , '5' as inv_work_gb 								")
				.query(" , '" +dept_id+ "'  as inv_dept_id 					")  
				.query(" , '" +upt_nm+ "'  as inv_usr_id 				")  
				.query(" , '0500' as sts_cd 								")
				.query(" , to_char(last_day(  to_date( t1.lock_ym, 'YYYYMM') )    , 'YYYYMMDD' ) as pay_dt ")
				.query(" , t2.cust_id 										")
				.query(" , t2.cust_nm 										")
				.query(" , t2.cust_gb 										")
				.query(" , t3.mmb_id 										")
				.query(" , t3.mmb_nm 										")
				.query(" , t3.sales_id 										")
				.query(" , 7 as price_no 									")
				.query(" , '0' as tax_type 									")
				.query(" , 10 as tax_rt 									")
				.query(" , 0 as tax_free 									")
				.query(" , t1.chain_mngt_amt as taxation 					")
				.query(" , (t1.chain_mngt_amt / 1.1) as sply_amt 			")
				.query(" , t1.chain_mngt_amt - (t1.chain_mngt_amt / 1.1) as tax ")
				.query(" , t1.chain_mngt_amt as amount 						")
				.query(" , t1.chain_mngt_amt as payable 						")
				.query(" , 0 as payment 									")
				.query(" , t1.chain_mngt_amt as npay_amt 						")
				.query(" , 1 as qty 										")
				.query(" , 1 as org_ord_qty 									")
				.query(" , 1 as ship_qty 									")

				.query(" , t2.biz_no 										")
				.query(" , t2.biz_nm 										")
				.query(" , t2.biz_type 										")
				.query(" , t2.biz_type 									")
				.query(" , t2.biz_owner 									")
				.query(" , t2.biz_state 									")
				.query(" , t2.biz_city 										")
				.query(" , t2.biz_dong 										")
				.query(" , t2.biz_zip_cd 									")
				.query(" , t2.biz_addr_1 									")
				.query(" , t2.biz_addr_2 									")
				.query(" , t2.biz_email 									")
				.query(" , t2.biz_tel_no 									")
				.query(" , t2.biz_hp_no 									")
				.query(" , t2.biz_fax_no 									")

				.query(" , t2.biz_nm   as reve_nm 							")
				.query(" , t2.biz_state  as reve_state 						")
				.query(" , t2.biz_city   as reve_city 						")
				.query(" , t2.biz_dong   as reve_dong 						")
				.query(" , t2.biz_zip_cd as reve_zip_cd 					")
				.query(" , t2.biz_addr_1  as reve_addr_1 						")
				.query(" , t2.biz_addr_2  as reve_addr_2 						")
				.query(" , t2.biz_email  as reve_email 						")
				.query(" , t2.biz_tel_no as reve_tel_no 					")
				.query(" , t2.biz_hp_no as reve_hp_no 					")
				.query(" , t2.biz_fax_no as reve_fax_no  					")
	     
				.query(" , '알파유통/체인운영비' as user_memo 					")  
				.query(" , '" +upt_nm+ "'  as upt_nm    				")                 
				.query(" , :upt_ip  as upt_ip 					" , ip )
				.query(" , to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm ")
				.query(" , '" +upt_nm+ "'  as crt_nm    				")    
				.query(" , :crt_ip  as crt_ip 					" , ip )
				.query(" , to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm ")
				.query("from bill_month t1 									")
				.query("     left outer join cust_mst t2 on t1.cust_id = t2.cust_id ")
				.query("     left outer join cust_memb t3 on t1.cust_id = t3.mmb_id and t3.sales_id = '5105000' and rownum = 1 ")
				.query("where trim(t1.lock_ym)    =  :lock_ym ",   row.fixParamText("lock_ym"))  
				.query("  and t1.cust_id		 =  :cust_id ",   row.fixParamText("cust_id"))  
				;data.attach(Action.direct);
//				data.execute();
				
				/* sale_dtl 생성 */
				data.param
				.query("insert into sale_dtl s1 ( 					")
				.query("       s1.hq_id                          ")
				.query("    ,  s1.stor_grp                          ")
				.query("    ,  s1.stor_id                          ")
				.query("    ,  s1.inv_no 							")
				.query("    ,  s1.line_seqn 							")
				.query("    ,  s1.seq_top 							")
				.query("    ,  s1.seq_dsp 							")
				.query("    ,  s1.seq_qty 							")
				.query("    ,  s1.ret_yn 							")
				.query("    ,  s1.mst_itm_id 							")
				.query("    ,  s1.mst_itm_cd 							")
				.query("    ,  s1.unit_idcd 							")
				.query("    ,  s1.unt_qty 							")
				.query("    ,  s1.item_idcd 							")
				.query("    ,  s1.item_code 							")
				.query("    ,  s1.item_name 							")
				.query("    ,  s1.notax_yn 							")
				.query("    ,  s1.cust_price 						")
				.query("    ,  s1.unit_price 						")
				.query("    ,  s1.price 							")
				.query("    ,  s1.qty 								")
				.query("    ,  s1.org_ord_qty 							")
				.query("    ,  s1.ship_qty 							")
				.query("    ,  s1.tax_free 							")
				.query("    ,  s1.taxation 							")
				.query("    ,  s1.sply_amt 							")
				.query("    ,  s1.tax 								")
				.query("    ,  s1.amount 							")
				.query("    ,  s1.upt_nm 						")
				.query("    ,  s1.upt_ip 						")
				.query("    ,  s1.upt_dttm 						")
				.query("    ,  s1.crt_nm 						")
				.query("    ,  s1.crt_ip 						")
				.query("    ,  s1.crt_dttm 						")
				.query("  )                							")
				
				.query("select 										")
				.query("       t1.hq_id 							")
				.query("    ,  t1.stor_grp 							")
				.query("    , 'N2310ALPHA1000' 						")
				.query("    ,  ('2310'||t1.lock_ym||t2.cust_cd||'5' ) as inv_no ")
				.query("    ,  1 as line_seqn 						")
				.query("    ,  1 as seq_top 						")
				.query("    ,  '1' as seq_dsp 						")
				.query("    ,  1 as seq_qty 						")
				.query("    ,  '0' as ret_yn 						")
				.query("    ,  '2904258300012' as mst_itm_id 			")
				.query("    ,  '900869' as mst_itm_cd 					")
				.query("    ,  'EA' as unit_idcd 						")
				.query("    ,  1 as unt_qty 						")
				.query("    ,  '2904258300012' as item_idcd 			")
				.query("    ,  '9008690' as item_code 				")
				.query("    ,  '알파유통/체인운영비' as item_name 			")
				.query("    ,  '0' as notax_yn 						")
				.query("    ,  t1.chain_mngt_amt as cust_price 		")
				.query("    ,  t1.chain_mngt_amt as unit_price 		")
				.query("    ,  t1.chain_mngt_amt as price 			")
				.query("    ,  1 as qty 							")
				.query("    ,  1 as org_ord_qty 						")
				.query("    ,  1 as ship_qty 						")
				.query("    ,  0 as tax_free 						")
				.query("    ,  t1.chain_mngt_amt as taxation 		")
				.query("    ,  (t1.chain_mngt_amt / 1.1) as sply_amt ")
				.query("    ,  t1.chain_mngt_amt - (t1.chain_mngt_amt / 1.1) as tax ")
				.query("    ,  t1.chain_mngt_amt as amount 			")
				.query(" 	,  '" +upt_nm+ "'  as upt_nm    	")                 
				.query(" 	,  :upt_ip  as upt_ip 					" , ip )
				.query(" 	,  to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm ")
				.query(" 	,  '" +upt_nm+ "'  as crt_nm    	")    
				.query(" 	,  :crt_ip  as crt_ip 					" , ip )
				.query(" 	,  to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm ")

				.query("  from bill_month t1 						")
				.query("       left outer join cust_mst t2 on t1.cust_id = t2.cust_id ")
				.query("where trim(t1.lock_ym)  =  :lock_ym ",   row.fixParamText("lock_ym"))  
				.query("  and t1.cust_id		=  :cust_id ",   row.fixParamText("cust_id"))  
				;data.attach(Action.direct);
//				data.execute();
				     
				}
				
			
			if ( pos_inv_amt > 0 ){   /* 포스 사용료가 0이 아닌 경우 포스 사용료 매출 생성 */
//				data.clear();
				
				/* sale_mst 생성 */
				data.param
				.query("insert into sale_mst s1 ( 							")
				.query("       s1.corp_id 									")
				.query("     , s1.hq_id 									")
				.query("     , s1.stor_grp 									")
				.query("     , s1.stor_id 									")
				.query("     , s1.wrhs_id 									")
				.query("     , s1.pos_no 									")
				.query("     , s1.inv_no 									")
				.query("     , s1.inv_dt 									")
				.query("     , s1.inv_tm 									")
//				.query("     , s1.inv_nm 									")
				.query("     , s1.ret_yn 									")
				.query("     , s1.inv_work_id 								")
				.query("     , s1.inv_work_gb 								")
				.query("     , s1.inv_dept_id 								")
				.query("     , s1.inv_usr_id 								")
				.query("     , s1.sts_cd 									")
				.query("     , s1.pay_dt 									")
				.query("     , s1.cust_id 									")
				.query("     , s1.cust_nm 									")
				.query("     , s1.cust_gb 									")
				.query("     , s1.mmb_id 									")
				.query("     , s1.mmb_nm 									")
				.query("     , s1.sales_id 									")
				.query("     , s1.price_no 									")
				.query("     , s1.tax_type 									")
				.query("     , s1.tax_rt 									")
				.query("     , s1.tax_free 									")
				.query("     , s1.taxation 									")
				.query("     , s1.sply_amt 									")
				.query("     , s1.tax 										")
				.query("     , s1.amount 									")
				.query("     , s1.payable 									")
				.query("     , s1.payment 									")
				.query("     , s1.npay_amt 									")
				.query("     , s1.qty 										")
				.query("     , s1.org_ord_qty 									")
				.query("     , s1.ship_qty 									")
			
				.query("     , s1.biz_no 									")
				.query("     , s1.biz_nm 									")
				.query("     , s1.biz_type 									")
				.query("     , s1.biz_type 								")
				.query("     , s1.biz_owner 								")
				.query("     , s1.biz_state 								")
				.query("     , s1.biz_city 									")
				.query("     , s1.biz_dong 									")
				.query("     , s1.biz_zip_cd 								")
				.query("     , s1.biz_addr_1 								")
				.query("     , s1.biz_addr_2 								")
				.query("     , s1.biz_email 								")
				.query("     , s1.biz_tel_no 								")
				.query("     , s1.biz_hp_no 								")
				.query("     , s1.biz_fax_no 								")
				
				.query("     , s1.reve_nm 									")
				.query("     , s1.reve_state 								")
				.query("     , s1.reve_city 								")
				.query("     , s1.reve_dong 								")
				.query("     , s1.reve_zip_cd 								")
				.query("     , s1.reve_addr_1 								")
				.query("     , s1.reve_addr_2 								")
				.query("     , s1.reve_email 								")
				.query("     , s1.reve_tel_no 								")
				.query("     , s1.reve_hp_no 								")
				.query("     , s1.reve_fax_no  								")
				     
				.query("     , s1.user_memo   								")
				.query("     , s1.upt_nm      							")                   
				.query("     , s1.upt_ip 								")
				.query("     , s1.upt_dttm 								")
				.query("     , s1.crt_nm    								")                     
				.query("     , s1.crt_ip 								")
				.query("     , s1.crt_dttm 								")
				.query("     ) 												")
				.query("select  											")
				.query("   t1.hq_id                                      ")
				.query(" , t1.hq_id 										")
				.query(" , t1.stor_grp 										")
				.query(" , 'N2310ALPHA1000' 								")
				.query(" , 'N2310ALPHA1000' 								")
				.query(" , '00' as pos_no 									")
				.query(" , ('2310'||t1.lock_ym||t2.cust_cd||'6' ) as inv_no ")
//				.query(" , to_char(last_day( to_date( sysdate ) )  , 'YYYYMMDD') as inv_dt 		")
				.query(" , to_char(last_day(  to_date( t1.lock_ym, 'YYYYMM')  )    , 'YYYYMMDD' ) as inv_dt 		")
				.query(" , to_char( sysdate, 'hh24mi') as inv_tm 			")
//				.query(" , '알파유통/체인운영비' as inv_nm 						")
				.query(" , '0' as ret_yn 									")
				.query(" , '1' as inv_work_id 								")
				.query(" , '6' as inv_work_gb 								")
				.query(" , '" +dept_id+ "'  as inv_dept_id 					")  
				.query(" , '" +upt_nm+ "'  as inv_usr_id 				")  
				.query(" , '0500' as sts_cd 								")
				.query(" , to_char(last_day(  to_date( t1.lock_ym, 'YYYYMM')  )    , 'YYYYMMDD' ) as pay_dt ")
				.query(" , t2.cust_id 										")
				.query(" , t2.cust_nm 										")
				.query(" , t2.cust_gb 										")
				.query(" , t3.mmb_id 										")
				.query(" , t3.mmb_nm 										")
				.query(" , t3.sales_id 										")
				.query(" , 7 as price_no 									")
				.query(" , '0' as tax_type 									")
				.query(" , 10 as tax_rt 									")
				.query(" , 0 as tax_free 									")
				.query(" , t1.chain_mngt_amt as taxation 					")
				.query(" , (t1.pos_inv_amt / 1.1) as sply_amt 				")
				.query(" , t1.pos_inv_amt - (t1.pos_inv_amt / 1.1) as tax 	")
				.query(" , t1.pos_inv_amt as amount 						")
				.query(" , t1.pos_inv_amt as payable 						")
				.query(" , 0 as payment 									")
				.query(" , t1.pos_inv_amt as npay_amt 						")
				.query(" , 1 as qty 										")
				.query(" , 1 as org_ord_qty 									")
				.query(" , 1 as ship_qty 									")

				.query(" , t2.biz_no 										")
				.query(" , t2.biz_nm 										")
				.query(" , t2.biz_type 										")
				.query(" , t2.biz_type 									")
				.query(" , t2.biz_owner 									")
				.query(" , t2.biz_state 									")
				.query(" , t2.biz_city 										")
				.query(" , t2.biz_dong 										")
				.query(" , t2.biz_zip_cd 									")
				.query(" , t2.biz_addr_1 									")
				.query(" , t2.biz_addr_2 									")
				.query(" , t2.biz_email 									")
				.query(" , t2.biz_tel_no 									")
				.query(" , t2.biz_hp_no 									")
				.query(" , t2.biz_fax_no 									")

				.query(" , t2.biz_nm   as reve_nm 							")
				.query(" , t2.biz_state  as reve_state 						")
				.query(" , t2.biz_city   as reve_city 						")
				.query(" , t2.biz_dong   as reve_dong 						")
				.query(" , t2.biz_zip_cd as reve_zip_cd 					")
				.query(" , t2.biz_addr_1  as reve_addr_1 						")
				.query(" , t2.biz_addr_2  as reve_addr_2 						")
				.query(" , t2.biz_email  as reve_email 						")
				.query(" , t2.biz_tel_no as reve_tel_no 					")
				.query(" , t2.biz_hp_no as reve_hp_no 					")
				.query(" , t2.biz_fax_no as reve_fax_no  					")
	     
				.query(" , '알파유통/포스사용료' as user_memo 					")  
				.query(" , '" +upt_nm+ "'  as upt_nm    				")                 
				.query(" , :upt_ip  as upt_ip 					" , ip )
				.query(" , to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm ")
				.query(" , '" +upt_nm+ "'  as crt_nm    				")    
				.query(" , :crt_ip  as crt_ip 					" , ip )
				.query(" , to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm ")
				.query("from bill_month t1 									")
				.query("     left outer join cust_mst t2 on t1.cust_id = t2.cust_id ")
				.query("     left outer join cust_memb t3 on t1.cust_id = t3.mmb_id and t3.sales_id = '5105000' and rownum = 1 ")
				.query("where trim(t1.lock_ym)    =  :lock_ym ",   row.fixParamText("lock_ym"))  
				.query("  and t1.cust_id		 =  :cust_id ",   row.fixParamText("cust_id"))  
				;data.attach(Action.direct);
//				data.execute();
				
				/* sale_dtl 생성 */
				data.param
				.query("insert into sale_dtl s1 ( 					")
				.query("       s1.hq_id                          ")
				.query("    ,  s1.stor_grp                          ")
				.query("    ,  s1.stor_id                          ")
				.query("    ,  s1.inv_no 							")
				.query("    ,  s1.line_seqn 							")
				.query("    ,  s1.seq_top 							")
				.query("    ,  s1.seq_dsp 							")
				.query("    ,  s1.seq_qty 							")
				.query("    ,  s1.ret_yn 							")
				.query("    ,  s1.mst_itm_id 							")
				.query("    ,  s1.mst_itm_cd 							")
				.query("    ,  s1.unit_idcd 							")
				.query("    ,  s1.unt_qty 							")
				.query("    ,  s1.item_idcd 							")
				.query("    ,  s1.item_code 							")
				.query("    ,  s1.item_name 							")
				.query("    ,  s1.notax_yn 							")
				.query("    ,  s1.cust_price 						")
				.query("    ,  s1.unit_price 						")
				.query("    ,  s1.price 							")
				.query("    ,  s1.qty 								")
				.query("    ,  s1.org_ord_qty 							")
				.query("    ,  s1.ship_qty 							")
				.query("    ,  s1.tax_free 							")
				.query("    ,  s1.taxation 							")
				.query("    ,  s1.sply_amt 							")
				.query("    ,  s1.tax 								")
				.query("    ,  s1.amount 							")
				.query("    ,  s1.upt_nm 						")
				.query("    ,  s1.upt_ip 						")
				.query("    ,  s1.upt_dttm 						")
				.query("    ,  s1.crt_nm 						")
				.query("    ,  s1.crt_ip 						")
				.query("    ,  s1.crt_dttm 						")
				.query("  )                							")
				
				.query("select 										")
				.query("       t1.hq_id 							")
				.query("    ,  t1.stor_grp 							")
				.query("    , 'N2310ALPHA1000' 						")
				.query("    , ('2310'||t1.lock_ym||t2.cust_cd||'6' ) as inv_no ")
				.query("    ,  1 as line_seqn 						")
				.query("    ,  1 as seq_top 						")
				.query("    ,  '1' as seq_dsp 						")
				.query("    ,  1 as seq_qty 						")
				.query("    ,  '0' as ret_yn 						")
				.query("    ,  '2904258300011' as mst_itm_id 			")
				.query("    ,  '900868' as mst_itm_cd 					")
				.query("    ,  'EA' as unit_idcd 						")
				.query("    ,  1 as unt_qty 						")
				.query("    ,  '2904258300011' as item_idcd 			")
				.query("    ,  '9008680' as item_code 				")
				.query("    ,  '알파유통/포스사용료' as item_name 			")
				.query("    ,  '0' as notax_yn 						")
				.query("    ,  t1.chain_mngt_amt as cust_price 		")
				.query("    ,  t1.chain_mngt_amt as unit_price 		")
				.query("    ,  t1.chain_mngt_amt as price 			")
				.query("    ,  1 as qty 							")
				.query("    ,  1 as org_ord_qty 						")
				.query("    ,  1 as ship_qty 						")
				.query("    ,  0 as tax_free 						")
				.query("    ,  t1.pos_inv_amt as taxation 		")
				.query("    ,  (t1.pos_inv_amt / 1.1) as sply_amt ")
				.query("    ,  t1.pos_inv_amt - (t1.pos_inv_amt / 1.1) as tax ")
				.query("    ,  t1.pos_inv_amt as amount 			")
				.query(" 	,  '" +upt_nm+ "'  as upt_nm    	")                 
				.query(" 	,  :upt_ip  as upt_ip 					" , ip )
				.query(" 	,  to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm ")
				.query(" 	,  '" +upt_nm+ "'  as crt_nm    	")    
				.query(" 	,  :crt_ip  as crt_ip 					" , ip )
				.query(" 	,  to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm ")

				.query("  from bill_month t1 						")
				.query("       left outer join cust_mst t2 on t1.cust_id = t2.cust_id ")
				.query("where trim(t1.lock_ym)  =  :lock_ym ",   row.fixParamText("lock_ym"))  
				.query("  and t1.cust_id		=  :cust_id ",   row.fixParamText("cust_id"))  
				;data.attach(Action.direct);
//				data.execute();
				     
				}			
//			System.out.println(" row_clos ");	
			/* 체인회비 확정값 업데이트 */
			data.param
			.query("update bill_month a														      ")
			.query("set		a.row_clos =  1 					 								  ")	
			.query("where  trim(a.lock_ym)  = :lock_ym ",   row.fixParamText("lock_ym"				))
			.query("  and  a.cust_id		=  :cust_id ",   row.fixParamText("cust_id"))  
			;data.attach(Action.direct);
			data.execute();
//			data.execute();
			
		}
//		data.execute();
			
		return null;
			
	}
		
	
		
	
	
	/**
	 * 문구 D/C 적용
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMdcaction(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		DataMessage data1 = arg.newStorage("POS");
//		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String lock_ym          = arg.getParamText("lock_ym").toString();
		String stor_id         = arg.getParamText("stor_id").toString();
		String clss_2          = arg.getParamText("clss_2").toString();
		double m_visitdcrate    = Double.parseDouble(arg.getParamText("m_visitdcrate")) ;
		
		double m_salelimits1 	= Double.parseDouble(arg.getParamText("m_salelimits1")) ;
		double m_dcrate1 		= Double.parseDouble(arg.getParamText("m_dcrate1")) ;
		double m_salelimits2 	= Double.parseDouble(arg.getParamText("m_salelimits2")) ;
		double m_dcrate2 		= Double.parseDouble(arg.getParamText("m_dcrate2")) ;
		double m_salelimits3 	= Double.parseDouble(arg.getParamText("m_salelimits3")) ;
		double m_dcrate3 		= Double.parseDouble(arg.getParamText("m_dcrate3")) ;
		double m_salelimits4 	= Double.parseDouble(arg.getParamText("m_salelimits4")) ;
		double m_dcrate4 		= Double.parseDouble(arg.getParamText("m_dcrate4")) ;
//		System.out.println("clss_2 ="+clss_2 );
		
		data1.param // 쿼리문  입력
		.query("select a.stor_grp                                                                     ")
		.query("      ,a.lock_ym                                                                      ")
		.query("      ,a.cust_id                                                                      ")
		.query("      ,a.visit_yn                                                                     ")
		.query("      ,a.bal_amt_m                                                                    ")
		.query("      ,a.inv_amt_m                                                                    ")
		.query("      ,a.pay_amt_m                                                                    ")
		.query("      ,a.dc_rate_m                                                                    ")
		.query("      ,a.dchalin_m                                                                    ")
		.query("      ,a.dc_yn_m                                                                      ")
		.query("      ,a.tot_amt_m                                                                    ")
		.query("      ,a.bal_amt_t                                                                    ")
		.query("      ,a.inv_amt_t                                                                    ")
		.query("      ,a.pay_amt_t                                                                    ")
		.query("      ,a.dc_rate_t                                                                    ")
		.query("      ,a.dchalin_t                                                                    ")
		.query("      ,a.dc_yn_t                                                                      ")
		.query("      ,a.tot_amt_t                                                                    ")
		.query("      ,a.chain_bal_amt                                                                ")
		.query("      ,a.chain_mngt_amt                                                                ")
		.query("      ,a.pos_bal_amt                                                                  ")
		.query("      ,a.pos_inv_amt                                                                  ")
		.query("      ,a.chain_pay_amt                                                                ")
		.query("      ,a.chain_tot_amt                                                                ")
		.query("      ,a.pos_pay_amt                                                                  ")
		.query("      ,a.pos_tot_amt                                                                  ")
		.query("      ,a.van_fee                                                                  ")
		.query("      ,a.bill_amount		                                                          ")
		.query("  from bill_month  a                                                                  ")
//		.query("       left outer join cust_stor b on b.stor_id =     '" +stor_id+ "'  			  ")
//		.query("                              and b.cust_id  = a.cust_id                              ")
//		.query("                              and b.clss_2  = :clss_2    " , clss_2			  	   )
		.query(" where trim(a.lock_ym) = '" +lock_ym+ "'                                              ")
		.query("   and a.cust_id in (select cust_id from cust_stor where stor_id  = '" +stor_id+ "'  ")
		.query("                        and clss_2  = :clss_2    						" , clss_2		)
		.query("       )			                                                                  ")
		;
		SqlResultMap bill = data1.selectForMap();

//		data1.clear();
//		System.out.println("arg ="+arg );
		
		
		for (SqlResultRow row:bill) {
//			System.out.println("row ="+row.fixParameter("cust_id" 	) );
			
//			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			
//			System.out.println("start ="+arg.fixParameter("lock_ym" 	));
//			if (rowaction == Action.update) {
//			System.out.println("m_salelimits1 ="+arg.fixParameter("m_salelimits1" 	));
//			System.out.println("m_dcrate1 ="+arg.fixParameter("m_dcrate1" 	));
			String cust_id          = row.getParamText("cust_id").toString();
			String visit_yn         = row.getParamText("visit_yn").toString();
			
				data.clear();
        		data.param
        		.query("update bill_month a														      ")
        		.query("set		a.dc_rate_m  = 	(case when 		a.inv_amt_m >=  '" +m_salelimits1+ "' ")
        		.query("	  						  then 		'" +m_dcrate1+ "'   				  ")	
        		.query("                              when 		'" +m_salelimits1+ "'  > a.inv_amt_m  ")
        		.query("	  						       and 	a.inv_amt_m >=  '" +m_salelimits2+ "' ")
        		.query("	  						  then 		'" +m_dcrate2+ "' 					  ")	
        		.query("                              when 		'" +m_salelimits2+ "'  > a.inv_amt_m  ")
        		.query("	  						       and 	a.inv_amt_m >=  '" +m_salelimits3+ "' ")
        		.query("	  						  then 		'" +m_dcrate3+ "' 					  ")	
        		.query("                              when 		'" +m_salelimits3+ "'  > a.inv_amt_m  ")
        		.query("	  						       and 	a.inv_amt_m >=  '" +m_salelimits4+ "' ")
        		.query("	  						  then 		'" +m_dcrate4+ "'  					  ")	
        		.query("	  						  else '0' end ) 								  ")	
        		.query("	  	, a.dc_yn_m = '1'					 								  ")	
        		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
        		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
				;data.attach(Action.direct);
				data.execute();
//				data.clear();
//        		data.param
//        		.query("update bill_month a                                             ")
//        		.query("set		a.dc_rate_m  = 	(case when 		a.inv_amt_m >=  40000.0 ")
//        		.query("	  						  then 		15.0                    ")
//        		.query("                              when 		40000.0  > a.inv_amt_m  ")
//        		.query("	  						       and 	a.inv_amt_m >=  30000.0 ")
//        		.query("	  						  then 		14.0                    ")
//        		.query("                              when 		30000.0  > a.inv_amt_m  ")
//        		.query("	  						       and 	a.inv_amt_m >=  20000.0 ")
//        		.query("	  						  then 		12.0                    ")
//        		.query("                              when 		20000.0  > a.inv_amt_m  ")
//        		.query("	  						       and 	a.inv_amt_m >=  10000.0 ")
//        		.query("	  						  then 		10.0                    ")
//        		.query("	  						  else 0 end )                      ")
//        		.query("where a.lock_ym 	=   '201402'                                ")
//        		.query("  and a.cust_id 	=   'V2130M100020480'                       ")
//				;data.attach(Action.direct);
//				data.execute();
				
//				System.out.println("######" + m_salelimits1);
//				System.out.println("######" + m_salelimits2);
//				System.out.println("######" + m_salelimits3);
//				System.out.println("######" + m_salelimits4);
//				System.out.println("######" + m_dcrate1);
//				System.out.println("######" + m_dcrate2);
//				System.out.println("######" + m_dcrate3);
//				System.out.println("######" + m_dcrate4);
//				System.out.println("######" + lock_ym);
//				System.out.println("######" + row.fixParameter("cust_id" 	));
        		
//				System.out.println("추가할인 ="+arg.fixParameter("lock_ym" 	));
				
        		/* 문구 방문추가 할인 */
        		if ( "1".equals( visit_yn )  ){
               		data.param
            		.query("update bill_month a																			")
            		
            		.query("set		a.dc_rate_m  = 	(a.dc_rate_m + (( 100 - a.dc_rate_m) 								")
            		.query("                     *  '" +m_visitdcrate+ "'  / 100 ))    									")
//            		.query("                     *  to_number( :m_visitdcrate ) / 100 ))    " 	, 	arg.fixParameter("m_visitdcrate", 0 ))

            		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
            		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
    				;data.attach(Action.direct);		
        		}
        		data.execute();
//
////    			System.out.println("DC할인율 계산 ="+arg.fixParameter("lock_ym" 	));
//       		
        		/* D/C 할인율 계산 */
           		data.param
        		.query("update bill_month a														")
        		.query("set		a.dchalin_m  = 	(a.inv_amt_m * a.dc_rate_m)/100  				")

           		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
        		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
				;data.attach(Action.direct);	
				data.execute();
//
////				System.out.println("청구금액 계산 ="+arg.fixParameter("lock_ym" 	));
//				
//        		/* 청구금액 계산 : 청구금액 = 전월미수+당월매출-당월수금-D/C */
           		data.param
        		.query("update bill_month a																	")
        		.query("set		a.tot_amt_m  = (	a.bal_amt_m + a.inv_amt_m - a.pay_amt_m - a.dchalin_m )	")

           		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
        		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
				;data.attach(Action.direct);	 
				data.execute();
//
////				System.out.println("당월청구금액 ="+arg.fixParameter("lock_ym" 	));
//				
        		/* 당월청구금액 = 문구청구금액+테크청구금액+체인비합계금액+포스사용료합계금액+벤사지원비 */
           		data.param
        		.query("update bill_month a																	")
        		.query("set		a.bill_amount  = (	a.tot_amt_m + a.tot_amt_t + a.chain_tot_amt					")
        		.query("                      + a.pos_tot_amt - a.van_fee )								")
        		.query("      , a.dc_rate_m    = 0  														")

           		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
        		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
				;data.attach(Action.direct);	
				data.execute();
				
//		record.dirtyValue("tot_amt", record.get("tot_amt_m")+record.get("tot_amt_t")+record.get("chain_tot_amt")
//				+record.get("pos_tot_amt")+record.get("van_fee"))				
				
				
				
				
//				SqlResultMap picking = inv.getParameter("picking", SqlResultMap.class);
//				if (picking != null){
//					setPicking(arg, data , picking, inv );
//				}
				
//				if (record.get("inv_amt_m") >= values['m_salelimits1']) {
//				record.dirtyValue("dc_rate_m", values['m_dcrate1']);
//			} else if (values['m_salelimits1'] > record.get("inv_amt_m") && record.get("inv_amt_m") >= values['m_salelimits2']) {
//				record.dirtyValue("dc_rate_m", values['m_dcrate2']);
        		
//			} else if (values['m_salelimits2'] > record.get("inv_amt_m") && record.get("inv_amt_m") >= values['m_salelimits3']) {
//				record.dirtyValue("dc_rate_m", values['m_dcrate3']);
        		
//			} else if (values['m_salelimits3'] > record.get("inv_amt_m") && record.get("inv_amt_m") >= values['m_salelimits4']) {
//				record.dirtyValue("dc_rate_m", values['m_dcrate4']);
//			} else {
//				record.dirtyValue("dc_rate_m", 0 );
////					record.dirtyValue("dc_rate_m", "0");
//			}
//			
//			// 문구 방문추가 할인
//			if (record.get("visit_yn")) {
//				record.dirtyValue("dc_rate_m", record.get("dc_rate_m")+((100-record.get("dc_rate_m"))*values['m_visitdcrate']/100));
//			}
//			
//			record.dirtyValue("dchalin_m", record.get("inv_amt_m")*record.get("dc_rate_m")/100);
//			// 청구금액 = 전월미수+당월매출-당월수금-D/C
//			record.dirtyValue("tot_amt_m", record.get("bal_amt_m")+record.get("inv_amt_m")-record.get("pay_amt_m")-record.get("dchalin_m"));
//			
//			lister.getView().refresh();	
//			// 당월청구금액 계산
//			me.tot_amtAction(record);        		
//         	// 당월청구금액 = 문구청구금액+테크청구금액+체인비합계금액+포스사용료합계금액+벤사지원비
//			record.dirtyValue("tot_amt", record.get("tot_amt_m")+record.get("tot_amt_t")+record.get("chain_tot_amt")+record.get("pos_tot_amt")+record.get("van_fee"));
	        	
//			}
		}
		data.execute();
//		System.out.println("end");
		return null;
	}	
	
	
	/**
	 * 테크 D/C 적용
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setTdcaction(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		DataMessage data1 = arg.newStorage("POS");

		String lock_ym          = arg.getParamText("lock_ym").toString();
		String stor_id         = arg.getParamText("stor_id").toString();
		String clss_2          = arg.getParamText("clss_2").toString();
//		double m_visitdcrate    = Double.parseDouble(arg.getParamText("m_visitdcrate")) ;
		
		double t_salelimits1 	= Double.parseDouble(arg.getParamText("t_salelimits1")) ;
		double t_dcrate1 		= Double.parseDouble(arg.getParamText("t_dcrate1")) ;
		double t_salelimits2 	= Double.parseDouble(arg.getParamText("t_salelimits2")) ;
		double t_dcrate2 		= Double.parseDouble(arg.getParamText("t_dcrate2")) ;
		double t_salelimits3 	= Double.parseDouble(arg.getParamText("t_salelimits3")) ;
		double t_dcrate3 		= Double.parseDouble(arg.getParamText("t_dcrate3")) ;
		double t_salelimits4 	= Double.parseDouble(arg.getParamText("t_salelimits4")) ;
		double t_dcrate4 		= Double.parseDouble(arg.getParamText("t_dcrate4")) ;
//		System.out.println("clss_2 ="+clss_2 );
		
		data1.param // 쿼리문  입력
		.query("select a.stor_grp                                                                     ")
		.query("      ,a.lock_ym                                                                      ")
		.query("      ,a.cust_id                                                                      ")
		.query("      ,a.visit_yn                                                                     ")
		.query("      ,a.bal_amt_m                                                                    ")
		.query("      ,a.inv_amt_m                                                                    ")
		.query("      ,a.pay_amt_m                                                                    ")
		.query("      ,a.dc_rate_m                                                                    ")
		.query("      ,a.dchalin_m                                                                    ")
		.query("      ,a.dc_yn_m                                                                      ")
		.query("      ,a.tot_amt_m                                                                    ")
		.query("      ,a.bal_amt_t                                                                    ")
		.query("      ,a.inv_amt_t                                                                    ")
		.query("      ,a.pay_amt_t                                                                    ")
		.query("      ,a.dc_rate_t                                                                    ")
		.query("      ,a.dchalin_t                                                                    ")
		.query("      ,a.dc_yn_t                                                                      ")
		.query("      ,a.tot_amt_t                                                                    ")
		.query("      ,a.chain_bal_amt                                                                ")
		.query("      ,a.chain_mngt_amt                                                                ")
		.query("      ,a.pos_bal_amt                                                                  ")
		.query("      ,a.pos_inv_amt                                                                  ")
		.query("      ,a.chain_pay_amt                                                                ")
		.query("      ,a.chain_tot_amt                                                                ")
		.query("      ,a.pos_pay_amt                                                                  ")
		.query("      ,a.pos_tot_amt                                                                  ")
		.query("      ,a.van_fee                                                                  ")
		.query("      ,a.bill_amount		                                                          ")
		.query("  from bill_month  a                                                                  ")
//		.query("       left outer join cust_stor b on b.stor_id =     '" +stor_id+ "'  			  ")
//		.query("                              and b.cust_id  = a.cust_id                              ")
//		.query("                              and b.clss_2  = :clss_2    " , clss_2			  	   )
		.query(" where trim(a.lock_ym) = '" +lock_ym+ "'                                              ")
		.query("   and a.cust_id in (select cust_id from cust_stor where stor_id  = '" +stor_id+ "'  ")
		.query("                        and clss_2  = :clss_2    						" , clss_2		)
		.query("       )			                                                                  ")
		;
		SqlResultMap bill = data1.selectForMap();

//		data1.clear();
		
		
		for (SqlResultRow row:bill) {
			
//			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			
//			System.out.println("start ="+arg.fixParameter("lock_ym" 	));
//			if (rowaction == Action.update) {
//			System.out.println("m_salelimits1 ="+arg.fixParameter("m_salelimits1" 	));
//			System.out.println("m_dcrate1 ="+arg.fixParameter("m_dcrate1" 	));
			String cust_id          = row.getParamText("cust_id").toString();
//			String visit_yn         = row.getParamText("visit_yn").toString();
			
				data.clear();
        		data.param
        		.query("update bill_month a														      ")
        		.query("set		a.dc_rate_t  = 	(case when 		a.inv_amt_t >=  '" +t_salelimits1+ "' ")
        		.query("	  						  then 		'" +t_dcrate1+ "'   				  ")	
        		.query("                              when 		'" +t_salelimits1+ "'  > a.inv_amt_t  ")
        		.query("	  						       and 	a.inv_amt_t >=  '" +t_salelimits2+ "' ")
        		.query("	  						  then 		'" +t_dcrate2+ "' 					  ")	
        		.query("                              when 		'" +t_salelimits2+ "'  > a.inv_amt_t  ")
        		.query("	  						       and 	a.inv_amt_t >=  '" +t_salelimits3+ "' ")
        		.query("	  						  then 		'" +t_dcrate3+ "' 					  ")	
        		.query("                              when 		'" +t_salelimits3+ "'  > a.inv_amt_t  ")
        		.query("	  						       and 	a.inv_amt_t >=  '" +t_salelimits4+ "' ")
        		.query("	  						  then 		'" +t_dcrate4+ "'  					  ")	
        		.query("	  						  else '0' end ) 								  ")	
        		.query("	  	, a.dc_yn_t = '1'					 								  ")	
        		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
        		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
				;data.attach(Action.direct);
				data.execute();
				
//        		/* 문구 방문추가 할인 */
//        		if ( "1".equals( visit_yn )  ){
//               		data.param
//            		.query("update bill_month a																			")
//            		
//            		.query("set		a.dc_rate_m  = 	(a.dc_rate_m + (( 100 - a.dc_rate_m) 								")
//            		.query("                     *  '" +m_visitdcrate+ "'  / 100 ))    									")
////            		.query("                     *  to_number( :m_visitdcrate ) / 100 ))    " 	, 	arg.fixParameter("m_visitdcrate", 0 ))
//
//            		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
//            		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
//    				;data.attach(Action.direct);		
//        		}
//        		data.execute();
//
////    			System.out.println("DC할인율 계산 ="+arg.fixParameter("lock_ym" 	));
//       		
        		/* D/C 할인율 계산 */
           		data.param
        		.query("update bill_month a														")
        		.query("set		a.dchalin_t  = 	(a.inv_amt_t * a.dc_rate_t)/100  				")

           		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
        		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
				;data.attach(Action.direct);	
				data.execute();
//
////				System.out.println("청구금액 계산 ="+arg.fixParameter("lock_ym" 	));
//				
//        		/* 청구금액 계산 : 청구금액 = 전월미수+당월매출-당월수금-D/C */
           		data.param
        		.query("update bill_month a																	")
        		.query("set		a.tot_amt_t  = (	a.bal_amt_t + a.inv_amt_t - a.pay_amt_t - a.dchalin_t )	")

           		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")
        		.query("  and a.cust_id 	=   '" +cust_id+ "'		              						")
				;data.attach(Action.direct);	 
				data.execute();
//
////				System.out.println("당월청구금액 ="+arg.fixParameter("lock_ym" 	));
//				
        		/* 당월청구금액 = 문구청구금액+테크청구금액+체인비합계금액+포스사용료합계금액+벤사지원비 */
           		data.param
        		.query("update bill_month a																	")
        		.query("set		a.bill_amount  = (	a.tot_amt_m + a.tot_amt_t + a.chain_tot_amt				")
        		.query("                      + a.pos_tot_amt - a.van_fee )								")
        		.query("      , a.dc_rate_m    = 0  														")
 
           		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							 	 	")
        		.query("  and a.cust_id 	=   '" +cust_id+ "'		              							")
				;data.attach(Action.direct);	
				data.execute();

		}
		data.execute();
		return null;
	}		
	
	
	/**
	 * 저장
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			
			if (rowaction == Action.update) {
//				double dc_rate_m 	= Double.parseDouble(row.getParamText("dc_rate_m")) ;
				double dchalin_m 	= Double.parseDouble(row.getParamText("dchalin_m")) ;
//				double dc_rate_t 	= Double.parseDouble(row.getParamText("dc_rate_t")) ;
				double dchalin_t 	= Double.parseDouble(row.getParamText("dchalin_t")) ;

	        	data.param
	    			.table("bill_month")
//        			.where("where stor_id = :stor_id ")
        			.where("where lock_ym = :lock_ym   ")
        			.where("  and cust_id = :cust_id   ")
        			//
//        			.unique("stor_id"      , row.fixParameter("stor_id"))
        			.unique("lock_ym"       , row.fixParameter("lock_ym"))
        			.unique("cust_id"       , row.fixParameter("cust_id"))
	        		.update("visit_yn"      , row.getParameter("visit_yn"))
//	        		.update("dc_rate_m"     , row.getParameter("dc_rate_m"))
	        		.update("dchalin_m"     , row.getParameter("dchalin_m"))
	        		.update("tot_amt_m"     , row.getParameter("tot_amt_m"))
//	        		.update("invoice_m"     , row.getParameter("invoice_m"))
//	        		.update("dc_rate_t"     , row.getParameter("dc_rate_t"))
	        		.update("dchalin_t"     , row.getParameter("dchalin_t"))
	        		.update("tot_amt_t"     , row.getParameter("tot_amt_t"))
//	        		.update("invoice_t"     , row.getParameter("invoice_t"))
	        		.update("chain_mngt_amt" , row.getParameter("chain_mngt_amt"))
//	        		.update("chain_new_amt" , row.getParameter("chain_new_amt"))
	        		.update("chain_tot_amt" , row.getParameter("chain_tot_amt"))
	        		.update("pos_inv_amt"   , row.getParameter("pos_inv_amt"))
//	        		.update("pos_new_amt"   , row.getParameter("pos_new_amt"))
	        		.update("pos_tot_amt"   , row.getParameter("pos_tot_amt"))
	        		.update("van_fee"   , row.getParameter("van_fee"))
	        		.update("dc_yn_m"       , dchalin_m == 0	? "0" : "1"	)
	        		.update("dc_yn_t"       , dchalin_t == 0	? "0" : "1"	)
	        		.update("bill_amount"   , row.getParameter("bill_amount"))
	        		
	        		
//	        		;
//	        	
//	        	if ( dc_rate_m == 0 && dchalin_m == 0 ){
//	        		data.param
//	        		.update("dc_yn_m"       , "0"							)
//	        		;
//	        	} else {
//	        		data.param
//	        		.update("dc_yn_m"       , "1"							)
//	        		;
//	        	}
//
//	        	if ( dc_rate_t == 0 && dchalin_t == 0 ){
//	        		data.param
//	        		.update("dc_yn_t"       , "0"							)
//	        		;
//	        	} else {
//	        		data.param
//	        		.update("dc_yn_t"       , "1"							)
//	        		;
//	        	}
//	        	
//	        	data.param
					.update("upt_nm"     , row.getParameter("upt_nm"))
					.update("upt_ip"     , arg.remoteAddress)
					.update("upt_dttm"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.action = rowaction;
	        	data.attach();
			}
		}
		
		data.execute();
		return null;
	}
	
	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice 주문명세서 출력
	 * @param model 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception{
		
		DataMessage data = arg.newStorage("POS");
		
//   		.query("where a.lock_ym 	=   '" +lock_ym+ "'  		  							  ")

		String usr_msg 	= arg.getParamText("usr_msg");
		String work_nm	    = arg.getParamText("work_nm");
		String work_phone_no = arg.getParamText("work_phone_no");
		String bank_nm		= arg.getParamText("bank_nm");
		String acct_no		= arg.getParamText("acct_no");
		String acct_own_nm		= arg.getParamText("acct_own_nm");
		String stor_id		= arg.getParamText("stor_id");
		String fr_dt		= arg.getParamText("fr_dt");
		String total_cust_id = arg.getParamText("total_cust_id");
		
		data.param // 쿼리문  입력
			.query("  select 														")
			.query("   substr(a.lock_ym, 1,4) as lock_ym_yy 						") // 타이틀 년
			.query(" , substr(a.lock_ym, 5,2) as lock_ym_mm 						") // 타이틀 월
			.query(" , b.cust_nm as recv_biz_nm 									") // 수신처
			.query(" , b.biz_tel_no as reve_tel_no 									") // 전화번호
			.query(" , b.biz_fax_no as reve_fax_no 									") // 팩스번호
			.query(" , b.converted  as cust_cd 										") // 고객코드
			.query(" , substr(a.lock_ym, 1,4) as inv_dt_fr_yy 						") // 청구기간 년 부터
			.query(" , substr(a.lock_ym, 5,2) as inv_dt_fr_mm 						") // 청구기간 월 부터
			.query(" , '01'   as inv_dt_fr_dd 										") // 청구기간 일 부터
			.query(" , substr(a.lock_ym, 1,4) as inv_dt_to_yy 						") // 청구기간 년 까지
			.query(" , substr(a.lock_ym, 5,2) as inv_dt_to_mm 						") // 청구기간 월 까지
			.query(" , to_char(last_day( to_date( a.lock_ym , 'YYYYMM') ) , 'DD' ) as inv_dt_to_dd ") // 청구기간 일 까지
	//		.query(" , to_char(last_day( to_date(  :fr_dt  , 'YYYYMM') ) , 'DD' ) as inv_dt_to_dd   " 	, arg.fixParameter("fr_dt")) // 청구기간 일 까지
	
			.query(" , a.bal_amt_m  as bal_amt_m 									") // 문구_전월미수금
			.query(" , a.inv_amt_m  as inv_amt_m 									") // 문구_당월매출액
			.query(" , a.pay_amt_m  as pay_amt_m 									") // 문구_당월수금액
			.query(" , a.dchalin_m  as dchalin_m 									") // 문구_D/C
			.query(" , a.tot_amt_m  as tot_amt_m 									") // 문구_결재액
	
			.query(" , a.bal_amt_t  as bal_amt_t 									") // 테크_전월미수금
			.query(" , a.inv_amt_t  as inv_amt_t 									") // 테크_당월매출액
			.query(" , a.pay_amt_t  as pay_amt_t 									") // 테크_당월수금액
			.query(" , a.dchalin_t  as dchalin_t 									") // 테크_D/C
			.query(" , a.tot_amt_t  as tot_amt_t 									") // 테크_결제액
	
			.query(" , (a.bal_amt_m + a.bal_amt_t) as bal_amt_tot 					") // 소계_전월미수금
			.query(" , (a.inv_amt_m + a.inv_amt_t) as inv_amt_tot 					") // 소계_당월매출액
			.query(" , (a.pay_amt_m + a.pay_amt_t) as pay_amt_tot 					") // 소계_당월수금액
			.query(" , (a.dchalin_m + a.dchalin_t)  as dc_amt_tot 					") // 소계_D/C
			.query(" , ( (a.bal_amt_m + a.bal_amt_t) + (a.inv_amt_m + a.inv_amt_t) - (a.pay_amt_m + a.pay_amt_t)  ")
			.query("		 - (a.dchalin_m + a.dchalin_t) )  as tot_amt_tot 		") // 소계 결재액
	
			.query(" , '" +usr_msg+ "'   as user_memo 	 							") // 안내문구
//			.query(" , :usr_msg   as user_memo 	" 	, arg.getParameter("usr_msg"  )) // 안내문구
	
//			.query(" , c.biz_nm as send_biz_nm 										") // 보낸사업장명
			.query(" , '" +work_phone_no+ "' as send_tel_no 						") // 보낸사업장 전화번호 
//			.query(" , c.biz_fax_no as send_fax_no 									") // 보낸사업장 팩스번호
			.query(" , '" +work_nm+ "'   as send_usr_nm   							") // 작업자
//			.query(" , :upt_nm   as send_usr_nm   " 	, arg.getParameter("upt_nm"  )) // 작업자
	
			.query(" , '" +bank_nm+ "'   as bank_nm 								") // 은행명
			.query(" , '" +acct_no+ "'   as acct_no 								") // 입금 계좌
			.query(" , '" +acct_own_nm+ "'   as acct_own_nm 								") // 입금자 명
//			.query(" , 'a' as stamp_url 											") 
			.query(" , a.pos_inv_amt as pos_amt 									") // 포스 사용료
			.query(" , a.van_fee as van_amt										") // 벤 지원비
			.query(" , (a.pos_inv_amt - a.van_fee) as pos_tot_amt 				") // 포스 청구금액
	
		    .query("from bill_month a 												")
		    .query("     join cust_mst b on a.cust_id = b.cust_id 					")
		    .query("     join store c on c.stor_id = '" +stor_id+ "' 				")
//		    .query("     join store c on c.stor_id = :stor_id " 	, arg.fixParameter("stor_id"  ))
		    .query("where a.lock_ym   = '" +fr_dt+ "' 								")
		    .query("  and a.cust_id   = '" +total_cust_id+ "' 						")
		    .query("  and a.row_sts = 0 											")
			;
			SqlResultMap info = data.selectForMap();
//			System.out.println("info = "+ info );

		if (info.size() == 1) {
//			System.out.println("product = " );
			data.clear();
			data.param // 쿼리문  입력
				.query(" select 														")
				.query(" 		a.cust_id												") /* 항번 */
//				.query(" 		to_char(sysdate,'YYYY-MM-DD HH24:MI:SS')	as date		") /* 항번 */
				.query("  from  bill_month 	a	 										")
			    .query("where a.lock_ym   = '" +fr_dt+ "' 								")
			    .query("  and a.cust_id   = '" +total_cust_id+ "' 						")
				;
				info.get(0).put("product", data.selectForMap() );
		} 
		
//		System.out.println("total info = "+ info );
		return info ;
	} 		
	
}
