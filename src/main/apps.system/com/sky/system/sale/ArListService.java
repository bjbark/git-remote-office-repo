package com.sky.system.sale;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class ArListService  extends DefaultServiceHandler {

	/**
	 * 현황조회
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );


			DataMessage data = arg.newStorage("POS");
			data.param // 집계문  입력
				.total("select count(1) as maxsize, sum(w.payment) as payment, sum(w.ar_0100) as ar_0100 		")
				.total("     , sum(w.ar_0101) as ar_0101, sum(w.ar_0200) as ar_0200, sum(w.ar_0400) as ar_0400	")
				.total("     , sum(w.ar_0500) as ar_0500, sum(w.ar_0600) as ar_0600, sum(w.ar_0700) as ar_0700	")
				.total("     , sum(w.ar_0800) as ar_0800, sum(w.ar_0900) as ar_0900								")
			;
			data.param // 쿼리문  입력
				.query("select   										")
				.query("	  w.*  , t.account_no	, (select bas_nm from base_mst where bas_id = t.bank_id) account_nm	")
			;
			data.param // 쿼리문  입력
				.where("  from (																						")
				.where("		select x.pay_no  , x.pay_dt   , x.row_clos							 					")
				.where(" 			, x.stor_nm  , x.cust_nm  ,  x.user_memo 	, x.account_id	, x.account_um   		")
				.where(" 			, x.cust_id  , x.stor_id  , x.pay_usr_nm	, x.upt_nm      , x.crt_nm				")
				.where(" 			, sum(x.payment) as payment 														")
				.where(" 			, sum(x.ar_0100) as ar_0100 , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200 ")
				.where(" 			, sum(x.ar_0400) as ar_0400 , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600 ")
				.where(" 			, sum(x.ar_0700) as ar_0700 , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900 ")
				.where(" 		from ( 																					")
				.where("			select   a.pay_no , a.pay_dt, a.payment , a.row_clos 								")
				.where("     	 		,  a.cust_id , a.stor_id , a.account_id , a.account_um							")
				.where("	 	 		,  ( select emp_nm  from usr_mst where emp_id  = a.pay_usr_id) as pay_usr_nm	")
				.where("	 	 		,  ( select stor_nm from stor    where stor_id = a.stor_id)    as stor_nm 		")
				.where("	 	 		,  ( select cust_nm from cust_mst where cust_id = a.cust_id)   as cust_nm 		")
				.where("	 	 		,   isnull(case when a.pay_gb = '0100' then a.payment else 0 end,'0') as ar_0100")
				.where("	 	 		,   isnull(case when a.pay_gb = '0101' then a.payment else 0 end,'0') as ar_0101")
				.where("	 	 		,   isnull(case when a.pay_gb = '0200' then a.payment else 0 end,'0') as ar_0200")
				.where("	 	 		,   isnull(case when a.pay_gb = '0400' then a.payment else 0 end,'0') as ar_0400")
				.where("	  	 		,   isnull(case when a.pay_gb = '0500' then a.payment else 0 end,'0') as ar_0500")
				.where("	  	 		,   isnull(case when a.pay_gb = '0600' then a.payment else 0 end,'0') as ar_0600")
				.where("	  	 		,   isnull(case when a.pay_gb = '0700' then a.payment else 0 end,'0') as ar_0700")
				.where(" 	  	 		,   isnull(case when a.pay_gb = '0800' then a.payment else 0 end,'0') as ar_0800")
				.where("	  	 		,   isnull(case when a.pay_gb = '0900' then a.payment else 0 end,'0') as ar_0900")
				.where("	  	 		,   a.user_memo   , a.upt_dttm , a.crt_dttm 									    ")
				.where("	  	 		,   (select emp_nm from usr_mst where emp_id = a.upt_nm) as upt_nm 	            ")
				.where("	  	 		,   (select emp_nm from usr_mst where emp_id = a.crt_nm) as crt_nm 	            ")
				.where("   	  		 from   sale_payment a 																")
				.where("   	  		        join sale_mst b on a.stor_id = b.stor_id 									")
				.where("   	  		                        and a.inv_no = b.inv_no 									")
				.where("   	  		        join cust_mst c on a.cust_id =  c.cust_id 									")
        		.where("			where   a.stor_grp  = :stor_grp 	  		" , arg.fixParameter("stor_grp"   	))
				.where(" 	 		  and   a.stor_id 	= :stor_id      		" , arg.getParameter("stor_id" 	))
				.where("      		  and   a.row_sts   = 0 				                                        ")
				.where("	   		  and   a.row_clos  = :row_clos     		" , arg.getParameter("row_clos" 	))  // 마감 여부
				.where("  	   		  and   a.pay_dt    between :fr_dt       		" , arg.getParameter("fr_dt" 		))  // 수금시작일자
				.where("                    		        and :to_dt       		" , arg.getParameter("to_dt" 		))  // 수금종료일자
				.where("	   		  and   a.pay_gb     	= :pay_gb    		 	" , arg.getParameter("pay_gb" 		))  // 결제방법
				.where("	   		  and   a.cust_id    	= :cust_id    		 	" , arg.getParameter("cust_id" 		))  // 고객
				.where("			  and   c.cust_nm  like %:find_name%  			" , find_name , "1".equals( search_id )) // 고객명
				.where("   			  and 	b.salesman_id   = :salesman_id  		" , arg.getParameter("salesman_id" 	)) // 영업담당
				.where("   			  and 	a.pay_usr_id   = :inv_usr_id  		" , arg.getParameter("inv_usr_id" 	)) // 작업담당
				.where("   			  and 	b.inv_work_id 	in 	( :inv_work_id ) 	" , inv_work_id , (inv_work_id.length>0)) /* 주문 위치 */
				;

			if (  !"".equals(arg.getParameter("account_no" ) ) ){

				data.param
				.where("   			  and 	a.account_id   in ( select account_id from stor_account where stor_grp = :stor_grp   	" , arg.fixParameter("stor_grp" 	)) // 계좌번호
				.where("   			                               and account_no  = :account_no   ) 								" , arg.getParameter("account_no" 	)) // 계좌번호
				;
			}
				data.param
				.where("      	) x 																					")
				.where(" 		group by x.pay_no     , x.pay_dt   , x.row_clos 										") // , x.inv_no
				.where(" 			,    x.stor_nm    , x.cust_nm  , x.user_memo , x.stor_id	   , x.account_id			")
				.where(" 			,    x.upt_nm     , x.cust_id  , x.stor_id	, x.pay_usr_nm	, x.crt_nm , x.account_um	")
				.where("  ) w																							")
				.where("  left outer join stor_account t  on  t.account_id = w.account_id								") // t.stor_id = w.stor_id and
				.where("  join cust_stor m on w.stor_id = m.stor_id														")
				.where("       		             and w.cust_id = m.cust_id												")
				.where(" where 1 = 1				 						 											")

				.where("   and m.clss_1  = :cust_cls1_id	" , arg.getParameter("cust_cls1_id" 		)) // 고객분류1
				.where("   and m.clss_2  = :cust_cls2_id  	" , arg.getParameter("cust_cls2_id" 		)) // 고객분류2
				.where("   and m.clss_3  = :cust_cls3_id  	" , arg.getParameter("cust_cls3_id" 		)) // 고객분류3
				.where("   and m.clss_5  = :ar_cls5_id  	" , arg.getParameter("ar_cls5_id" 		)) // 수금방법
				.where("   and m.clss_6  = :ar_cls6_id  	" , arg.getParameter("ar_cls6_id" 		)) // 수금방법

				.where(" order by w.pay_no  						 											")	//, w.inv_no

			;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows , (page==1),sort );
			}
	}




	/**
	 * 디테일 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 쿼리문  입력
			.query("select   s.inv_work_id, s.inv_dt,  s.amount   , m.acct_no										")
			.query("	  , w.*																						")
			.query("  from (																						")
			.query("		select x.pay_no  , x.inv_no  , x.pay_dt , x.row_clos							 		")
			.query(" 			, x.stor_nm  , x.mmb_nm  , x.line_memo 												")
			.query(" 			, x.upt_nm   , x.cust_id , x.stor_id 												")
			.query(" 			, sum(x.payment) as payment 														")
			.query(" 			, sum(x.ar_0100) as ar_0100 , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200 ")
			.query(" 			, sum(x.ar_0400) as ar_0400 , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600 ")
			.query(" 			, sum(x.ar_0700) as ar_0700 , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900 ")
			.query(" 			, max(x.upt_dttm) as upt_dttm     , max(x.crt_dttm) as crt_dttm 					")
			.query(" 		from ( 																					")
			.query("			select   a.pay_no , a.inv_no , a.pay_dt, a.payment , a.row_clos 					")
			.query("     	 		,  a.cust_id , a.stor_id 														")
			.query("	 	 		,  ( select stor_nm from stor     where stor_id = a.stor_id) as stor_nm 		")
			.query("	 	 		,  ( select mmb_nm from cust_memb where mmb_id = a.mmb_id)   as mmb_nm 			")
			.query("	 	 		,   isnull(decode(pay_gb,'0100',payment      ),'0') as ar_0100 					")
			.query("	 	 		,   isnull(decode(pay_gb,'0101',payment      ),'0') as ar_0101 					")
			.query("	 	 		,   isnull(decode(pay_gb,'0200',payment      ),'0') as ar_0200 					")
			.query("	 	 		,   isnull(decode(pay_gb,'0400',payment      ),'0') as ar_0400 					")
			.query("	  	 		,   isnull(decode(pay_gb,'0500',payment      ),'0') as ar_0500 					")
			.query("	  	 		,   isnull(decode(pay_gb,'0600',payment      ),'0') as ar_0600 					")
			.query("	  	 		,   isnull(decode(pay_gb,'0700',payment      ),'0') as ar_0700 					")
			.query(" 	  	 		,   isnull(decode(pay_gb,'0800',payment      ),'0') as ar_0800 					")
			.query("	  	 		,   isnull(decode(pay_gb,'0900',payment      ),'0') as ar_0900 					")
			.query("	  	 		,   a.line_memo   , a.upt_dttm , a.crt_dttm 									")
			.query("	  	 		,   (select emp_nm from usr_mst where emp_id = a.upt_nm) as upt_nm 	")
			.query("   	  		 from   sale_payment a 																")
			.query(" 	 		where   a.stor_grp 	  = :stor_grp     " , arg.fixParameter("stor_grp" 				))
			.query(" 	 		  and   a.stor_id 	  = :stor_id      " , arg.getParameter("stor_id" 				))
			.query("	   		  and   a.pay_no      = :pay_no       " , arg.fixParameter("pay_no" 				))
			.query("    		  and   a.row_sts = 0	                            								")
			.query("      	) x 																					")
			.query(" 		group by x.pay_no , x.inv_no   , x.pay_dt   , x.row_clos 								")
			.query(" 			, x.stor_nm   , x.mmb_nm   , x.line_memo 											")
			.query(" 			, x.upt_nm    , x.cust_id  , x.stor_id			 									")
			.query("  ) w																							")
			.query("  left outer join sale_balance y  on y.inv_no = w.inv_no										")
			.query("  join sale_mst s on s.inv_no = w.inv_no														")
			.query("  join cust_stor m on w.stor_id = m.stor_id													")
			.query("       		             and w.cust_id = m.cust_id												")
			.query(" order by w.pay_no  , w.inv_no 						 											")
		;

	    return data.selectForMap();
	}



	/**
	 * 수금예정리스트 - 미수 고객 리스트
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getArList(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {


		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(a.npay_amt) as npay_amt  ")
		;
		data.param // 쿼리문  입력
			.query("select a.hq_id       , a.stor_grp    																")
			.query("     , b.owner_id    , (select stor_nm from stor     where stor_id = b.owner_id    ) as owner_nm 	")
			.query("   ,   b.cust_id     , b.cust_cd     ,  b.cust_nm     , b.cust_gb     , b.cust_sts  				")
			.query("   ,   sum(a.npay_amt) as npay_amt, b.price_no 														")
		;
		data.param // 집계문  입력
			.where("from   cust_stor                    a 																")
			.where("       join            cust_mst     b on b.cust_id = a.cust_id    									")
        	.where("where  a.stor_grp  =    :stor_grp 	  		" 		, 	 arg.fixParameter("stor_grp"   				))
			.where("and    a.stor_id  = 	:stor_id     	 	"		,	 arg.getParameter("stor_id" 				))
			.where("and    a.cust_id   = 	:cust_id     	 	"		 ,	 arg.getParameter("cust_id" 				))
			.where("and    a.npay_amt  <> 0           																	")
			.where("and    a.row_sts < 2           																		")
			.where("group by  a.hq_id    , a.stor_grp    ,  b.owner_id  												")
			.where("	  ,   b.cust_id  , b.cust_cd     ,  b.cust_nm     , b.cust_gb     , b.cust_sts  				")
			.where("	  ,   b.price_no  																				")
			.where("order by b.cust_nm								            										")
			;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}



	/**
	 * 수금예정리스트 - 미수현황 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getArListSales(HttpRequestArgument arg, int page, int rows,String sort) throws Exception {


		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(a.amount) as amount, sum(a.npay_amt) as npay_amt  ")
		;
		data.param // 쿼리문  입력
			.query("select a.inv_dt  , a.inv_no    						")
			.query(" , a.amount , a.npay_amt  , a.mmb_nm				")
			.query(" , a.stor_id , ( select stor_nm from stor where stor_id = a.stor_id) as stor_nm ")
		;
		data.param
			.where("  from sale_mst a 												")
        	.where(" where a.stor_grp  =    :stor_grp 	" , arg.fixParameter("stor_grp"))
			.where("   and a.stor_id   = 	:stor_id   " , arg.getParameter("stor_id"))
			.where("   and a.cust_id   = 	:cust_id    " , arg.fixParameter("cust_id" ))
			.where("   and a.npay_amt <> 0				 							")
			.where("   and a.row_sts = 0 				                            ")
			.where("order by a.inv_dt , a.inv_no				 					")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}

	/**
	 * 수금예정리스트 - 미수현항 상세조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getArListItems(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(a.sply_amt) as sply_amt , sum(a.tax) as tax , sum(a.tax_free) as tax_free , sum(a.amount) as amount  ")
		;
		data.param // 쿼리문  입력
			.query("select a.item_name , a.item_code  										")
			.query(" , a.qty , a.price , a.sply_amt , a.tax , a.tax_free , a.amount 	")
			;
		data.param
			.where("from sale_dtl a  													")
			.where(" where a.stor_id  = :stor_id   " , arg.fixParameter("stor_id"	))
			.where("   and a.inv_no   = :inv_no    " , arg.fixParameter("inv_no" 	))
			.where("   and a.row_sts  = 0 				                                ")
			.where("order by a.item_name				 									")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}




}
