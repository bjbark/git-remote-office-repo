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
public class ArWorkService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);


			DataMessage data = arg.newStorage("POS");
			data.param // 집계문  입력
				.total("select count(1) as maxsize, sum(w.payment) as payment, sum(w.ar_0100) as ar_0100 		")
				.total("     , sum(w.ar_0101) as ar_0101, sum(w.ar_0200) as ar_0200, sum(w.ar_0400) as ar_0400	")
				.total("     , sum(w.ar_0500) as ar_0500, sum(w.ar_0600) as ar_0600, sum(w.ar_0700) as ar_0700	")
				.total("     , sum(w.ar_0800) as ar_0800, sum(w.ar_0900) as ar_0900								")
			;
			data.param // 쿼리문  입력
				.query("select   																						")
				.query("	  w.*	, t.account_no	, (select bas_nm from base_mst where bas_id = t.bank_id) account_nm	")
			;
			data.param // 쿼리문  입력
				.where("  from (																						")
				.where("		select x.pay_no  , x.pay_dt   , x.row_clos							 					")
				.where(" 			, x.stor_nm  , x.cust_nm  ,  x.user_memo 	, x.account_id , x.account_um			")
				.where(" 			, x.cust_id  , x.stor_id  , x.pay_usr_nm	, x.upt_nm     , x.crt_nm				")
				.where(" 			, sum(x.payment) as payment 														")
				.where(" 			, sum(x.ar_0100) as ar_0100 , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200 ")
				.where(" 			, sum(x.ar_0400) as ar_0400 , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600 ")
				.where(" 			, sum(x.ar_0700) as ar_0700 , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900 ")
				.where(" 		from ( 																					")
				.where("			select   a.pay_no , a.pay_dt, a.payment , a.row_clos			 					")
				.where("     	 		,  a.cust_id , a.stor_id , a.account_id, a.account_um							")
				.where("	 	 		,  ( select emp_nm  from usr_mst  where emp_id = a.pay_usr_id) as pay_usr_nm	")
				.where("	 	 		,  ( select stor_nm from stor     where stor_id = a.stor_id) as stor_nm 		")
				.where("	 	 		,  ( select cust_nm from cust_mst where cust_id = a.cust_id) as cust_nm 		")
				.where("	 	 		,   isnull(decode(a.pay_gb,'0100',a.payment      ),'0') as ar_0100 				")
				.where("	 	 		,   isnull(decode(a.pay_gb,'0101',a.payment      ),'0') as ar_0101 				")
				.where("	 	 		,   isnull(decode(a.pay_gb,'0200',a.payment      ),'0') as ar_0200 				")
				.where("	 	 		,   isnull(decode(a.pay_gb,'0400',a.payment      ),'0') as ar_0400 				")
				.where("	  	 		,   isnull(decode(a.pay_gb,'0500',a.payment      ),'0') as ar_0500 				")
				.where("	  	 		,   isnull(decode(a.pay_gb,'0600',a.payment      ),'0') as ar_0600 				")
				.where("	  	 		,   isnull(decode(a.pay_gb,'0700',a.payment      ),'0') as ar_0700 				")
				.where(" 	  	 		,   isnull(decode(a.pay_gb,'0800',a.payment      ),'0') as ar_0800 				")
				.where("	  	 		,   isnull(decode(a.pay_gb,'0900',a.payment      ),'0') as ar_0900 				")
				.where("	  	 		,   a.user_memo   , a.upt_dttm , a.crt_dttm 										")
				.where("	  	 		,   (select emp_nm from usr_mst where emp_id = a.upt_nm) as upt_nm 				")
				.where("	  	 		,   (select emp_nm from usr_mst where emp_id = a.crt_nm) as crt_nm 				")
				.where("   	  		 from   sale_payment a 																")
				.where("   	  		        join sale_mst b on a.stor_id = b.stor_id 									")
				.where("   	  		                        and a.inv_no = b.inv_no 									")
				.where(" 	 		where   a.stor_id 	 	= :stor_id      		" , arg.fixParameter("stor_id" 	))
				.where("      		  and   a.row_sts     = 0 				                                        ")
				.where("	   		  and   a.row_clos     = :row_clos     		" , arg.getParameter("row_clos" 	))  // 마감 여부
				.where("  	   		  and   a.pay_dt    between :fr_dt       		" , arg.getParameter("fr_dt" 		))  // 수금시작일자
				.where("                    		        and :to_dt       		" , arg.getParameter("to_dt" 		))  // 수금종료일자
				.where("	   		  and   a.pay_gb     	= :pay_gb    		 	" , arg.getParameter("pay_gb" 		))  // 결제방법
				.where("	   		  and   a.cust_id    	= :cust_id    		 	" , arg.getParameter("cust_id" 		))  // 고객
				.where("   			  and 	b.salesman_id   = :salesman_id  		" , arg.getParameter("salesman_id" 	)) // 영업담당
				.where("   			  and 	a.pay_usr_id   = :inv_usr_id  		" , arg.getParameter("inv_usr_id" 	)) // 작업담당
				.where("   			  and 	b.inv_work_id 	in 	( :inv_work_id ) 	" , inv_work_id , (inv_work_id.length>0)) /* 주문 위치 */
				.where("   			  and 	a.account_id    = :account_id  			" , arg.getParameter("account_id" 	)) // 계좌번호
				.where("      	) x 																					")
				.where(" 		group by x.pay_no     , x.pay_dt   , x.row_clos 										") // , x.inv_no
				.where(" 			,    x.stor_nm   , x.cust_nm  , x.user_memo , x.stor_id	, x.account_id			")
				.where(" 			,    x.upt_nm  , x.cust_id  , x.stor_id	, x.pay_usr_nm	, x.crt_nm	, x.account_um	")
				.where("  ) w																							")
				.where("  left outer join stor_account t  on   t.account_id = w.account_id								") // t.stor_id = w.stor_id and
				.where("  join cust_stor m on w.stor_id = m.stor_id													")
				.where("       		             and w.cust_id = m.cust_id												")
				.where(" where 1 = 1				 						 											")

				.where("   and m.clss_1   		= :cust_cls1_id  		" 		, arg.getParameter("cust_cls1_id" 		)) // 고객분류1
				.where("   and m.clss_2   		= :cust_cls2_id  		" 		, arg.getParameter("cust_cls2_id" 		)) // 고객분류2
				.where("   and m.clss_3   		= :cust_cls3_id  		" 		, arg.getParameter("cust_cls3_id" 		)) // 고객분류3
				.where("   and m.clss_5   		= :ar_cls5_id  			" 		, arg.getParameter("ar_cls5_id" 		)) // 수금방법
				.where("   and m.clss_6   		= :ar_cls6_id  			" 		, arg.getParameter("ar_cls6_id" 		)) // 수금방법

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
			.query(" 			, max(x.upt_dttm) as upt_dttm , max(x.crt_dttm) as crt_dttm 						")
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
			.query("	  	 		,   (select emp_nm from usr_mst where emp_id = a.upt_nm) as upt_nm 				")
			.query("   	  		 from   sale_payment a 																")
			.query(" 	 		where   a.stor_id 	= :stor_id      " , arg.getParameter("stor_id" 				))
			.query("	   		  and   a.row_sts   = 0  															")
			.query("	   		  and   a.pay_no    = :pay_no     	" , arg.fixParameter("pay_no" 				))
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
	 * 다이얼로그 -  회원
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDialogMemb(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String search_gb = arg.getParamText("search_gb" ); // 검색어. 0: 전체, 1:매입처명, 2.사업자번호
		String find_name = arg.getParamText("find_name" );

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize 	  ")
		;
		data.param // 쿼리문  입력
			.query("select a.stor_id , b.cust_gb  , a.cust_id , b.cust_cd , b.cust_nm , b.cust_grp	")
			.query("    ,  c.mmb_id  , c.mmb_nm  , c.sales_id	, a.user_memo						")
			.query("    ,  b.biz_tel_no, (b.biz_addr_1||' '||b.biz_addr_2) as biz_addr_1				")
			;
		data.param
			.where("from   cust_stor    a 															")
			.where("       join cust_mst  b on a.cust_id = b.cust_id  								")
			.where("       join cust_memb  c on b.cust_id = c.cust_id  								")
			.where("where  a.stor_id  = :stor_id    	 " 	  , arg.fixParameter("stor_id" 		))
			.where("and    b.cust_nm  like  %:find_name% "    , find_name , "1".equals( search_gb 	)) // 검색어가 회사명일 경우
			.where("and    c.mmb_nm  like  %:find_name% "    , find_name , "2".equals( search_gb 	)) // 검색어가 고객명일 경우
			.where("and    a.cust_id  = :cust_id    	 " 	  , arg.getParameter("cust_id" 			))
			.where("and    a.row_sts = 0           												")
			.where("and    a.npay_amt  <> 0           												")
			.where("order by b.cust_nm , c.mmb_nm   												")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}


	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception{
		DataMessage data = arg.newStorage("POS");

		String ori_no = arg.getParamText("ori_no"); /* 신규여부 구분 */
		String gubun  = arg.getParamText("gubun");  /* button 구분. techAction = 문구/테크구분 수금 */

		/* 기존 정보 수정  */
		if (ori_no == null || "".equals(ori_no)) {
			data.param // 쿼리문  입력
				.query("select  a.stor_id , a.pay_no  , a.pay_dt  , b.npay_amt  					")
				.query("   	 ,	a.cust_id , (select cust_nm from cust_mst where cust_id = a.cust_id) as cust_nm ")
				.query("     ,  a.pay_usr_id   , a.pay_dept_id  , a.account_id				 					")
				.query("     ,  (select emp_nm from usr_mst where emp_id = a.pay_usr_id) as pay_usr_nm 	")
				.query("     ,  (select dept_nm from dept_mst where dept_id = a.pay_dept_id) as pay_dept_nm 	")
				.query("     ,  c.account_no																")
				.query("     ,  (select bas_nm from base_mst where bas_id = c.bank_id) as account_nm 	")
				.query("     ,  a.user_memo  , a.account_um											")
				.query("from    sale_payment a 														")
				.query("   	    join cust_stor b on  b.stor_id = a.stor_id 						")
				.query("          	             and b.cust_id  = a.cust_id 						")
				.query(" 		left outer join stor_account c on c.account_id = a.account_id 		")
				.query("where   a.pay_no  = :pay_no 	" 	 , arg.fixParameter("pay_no"   			))
				.query("  and   a.row_sts = 0 				                                    ")
				.query("group by a.stor_id  , a.pay_no , a.pay_dt  , b.npay_amt  , a.cust_id  		")
				.query("     ,   a.pay_usr_id  , a.pay_dept_id  , a.account_id  , a.user_memo      ")
				.query("     ,   c.account_no   , c.bank_id , bank_nm 	, a.account_um				")
				;
			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param // 쿼리문  입력
				.query("select  a.corp_id , a.hq_id  , a.stor_grp  , a.stor_id  , a.sales_id	")
				.query("    ,   a.pay_dt   , a.pay_no    , a.pay_gb    , a.inv_no     				")
				.query("	,   a.payment  , b.npay_amt   , a.line_memo , b.inv_dt  					")
				.query("	,   a.cust_id  , a.mmb_id   , c.mmb_nm  								")
				.query("	,   b.tax_dt   , b.tax_no  				  								")
				.query("  from  sale_payment   a                            						")
				.query("        join sale_mst b on b.inv_no  = a.inv_no  							")
				.query("        join cust_memb c on c.mmb_id = a.mmb_id 							")

				.query("  where a.pay_no = 	:pay_no 	" 			, arg.fixParameter("pay_no"     ))
				.query("    and a.row_sts = 0 													")
				;
				info.get(0).put("picking", data.selectForMap() );


			}
		    return info ;

		} else {  /*  신규 수금건 등록 신규 */

			if ( "techAction".equals(gubun) ){ /* 문구/테크 구분 수금 */

				data.param // 쿼리문  입력
				.query("select  b.hq_id, a.stor_grp, a.stor_id 			")
				.query("     ,  isnull(sum(d.npay_amt), 0) as npay_amt 					")
				.query("     ,  b.cust_grp 	, a.cust_id	,  b.cust_nm		")
				.query("from    cust_stor     a 												")
				.query("        join cust_mst b on b.cust_id  = a.cust_id 							")
				.query("        join cust_balance d on d.stor_id = a.stor_id and ( d.cust_id , d.mmb_id ) in (	")
				.query("        	 select cust_id , mmb_id from cust_memb where cust_id = a.cust_id and sales_id = :sales_id  ) "  , arg.fixParameter("sales_id" ))
				.query("where   a.stor_id    = :stor_id "  , arg.fixParameter("stor_id"   	))
				.query("and     a.cust_id     = :cust_id  "  , arg.fixParameter("cust_id"    	))
				.query("group by   b.hq_id, a.stor_grp  , b.cust_grp  , a.cust_id		 				")
				.query(" 		 , a.stor_id , b.cust_nm 	")
				;
				SqlResultMap info = data.selectForMap();

				if (info.size() == 1) {
					data.clear();
					data.param // 쿼리문  입력
					.query("select 	a.inv_no   , a.inv_dt, a.mmb_id,  b.mmb_nm 									")
					.query(" 	,	b.cust_id  , b.sales_id     								  					")
					.query(" 	,	 a.npay_amt ,  a.npay_amt as payable ,  b.user_memo 							  	")
					.query("	,   b.tax_dt   , b.tax_no  				  											")
					.query("  from  sale_balance    a 																")
					.query("  		join sale_mst  b on b.inv_no  = a.inv_no 										")
					.query(" where  a.stor_id      = :stor_id 		"  		, arg.fixParameter("stor_id"   	))
					.query("   and  a.cust_id   	= :cust_id  		"  		, arg.fixParameter("cust_id"    	))
					.query("   and  a.inv_dt between  :fr_dt            "       , arg.getParameter("fr_dt"), "1".equals(arg.getParamText("period")))  // 매출시작일자
					.query("                     and  :to_dt            "       , arg.getParameter("to_dt"), "1".equals(arg.getParamText("period")))  // 매출종료일자
					.query("   and  b.sales_id   	= :sales_id  		"  		, arg.fixParameter("sales_id"    	)) /* 문구/테크 구분에 사용 */
					.query("   and  b.row_sts     = 0  															")
					.query(" order by a.inv_dt , a.inv_no 															")
					;
					info.get(0).put("product", data.selectForMap() );

				}
				return info ;


			} else { /* 전체 수금 */

				data.param // 쿼리문  입력
				.query("select  b.hq_id, a.stor_grp, a.stor_id 			")
				.query("     ,  a.npay_amt 									")
				.query("     ,  b.cust_grp 	, a.cust_id	,  b.cust_nm		")
				.query("from    cust_stor     a 												")
				.query("        join cust_mst b on b.cust_id  = a.cust_id 							")
				.query("where   a.stor_id    = :stor_id "  , arg.fixParameter("stor_id"   	))
				.query("and     a.cust_id     = :cust_id  "  , arg.fixParameter("cust_id"    	))
				;
				SqlResultMap info = data.selectForMap();

				if (info.size() == 1) {
					data.clear();
					data.param // 쿼리문  입력
					.query("select 	a.inv_no   , a.inv_dt, a.mmb_id,  b.mmb_nm 									")
					.query(" 	,	b.cust_id  , b.sales_id     								  					")
					.query(" 	,	 a.npay_amt ,  a.npay_amt as payable ,  b.user_memo 							  	")
					.query("	,   b.tax_dt   , b.tax_no  				  											")
					.query("  from  sale_balance    a 																")
					.query("  		join sale_mst  b on b.inv_no  = a.inv_no 										")
					.query(" where  a.stor_id      = :stor_id 		"  		, arg.fixParameter("stor_id"   	))
					.query("   and  a.cust_id   	= :cust_id  		"  		, arg.fixParameter("cust_id"    	))
					.query("   and  a.inv_dt between  :fr_dt            "       , arg.getParameter("fr_dt"), "1".equals(arg.getParamText("period")))  // 매출시작일자
					.query("                     and  :to_dt            "       , arg.getParameter("to_dt"), "1".equals(arg.getParamText("period")))  // 매출종료일자
					.query("   and  b.row_sts     = 0  															")
					.query(" order by a.inv_dt , a.inv_no 															")
					;
					info.get(0).put("product", data.selectForMap() );

				}
				return info ;
			}

		}

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
			.query("select a.hq_id    , a.stor_grp    , a.stor_id 													")
			.query("     , b.owner_id    , (select stor_nm from stor     where stor_id = b.owner_id    ) as owner_nm ")

			.query("   ,   b.cust_id     , b.cust_cd     ,  b.cust_nm     , b.cust_gb     , b.cust_sts  				")
			.query("   ,   a.npay_amt     , b.price_no 																	")
		;
		data.param
			.where("from   cust_stor                    a 																")
			.where("       join            cust_mst     b on b.cust_id = a.cust_id    									")
			.where("where  a.stor_id  = 	:stor_id     	 	"		 ,	 arg.fixParameter("stor_id" 				))
			.where("and    a.cust_id   = 	:cust_id     	 	"		 ,	 arg.getParameter("cust_id" 				))
			.where("and    a.npay_amt  <> 0           																	")
			.where("and    a.row_sts < 2           																	")
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
	public SqlResultMap getArListSales(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {


		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(b.amount) as amount, sum(a.npay_amt) as npay_amt  ")
		;
		data.param // 쿼리문  입력
			.query("select a.inv_dt , a.inv_no   								")
			.query("	 , b.amount , a.npay_amt , b.mmb_nm  					")
		;
		data.param
			.where(" from sale_balance a   										")
			.where("      join sale_mst b on b.inv_no = a.inv_no 				")
			.where(" where a.stor_id = 	:stor_id   " , arg.fixParameter("stor_id"))
			.where("   and a.cust_id  = 	:cust_id    " , arg.fixParameter("cust_id" ))
			.where("   and a.row_sts = 0 				                            ")
			.where("order by a.inv_dt , a.inv_no				 					")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1), sort );
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
			.total(" select  count(1) as maxsize , sum(a.sply_amt) as sply_amt , sum(a.tax) as tax , sum(a.tax_free) as tax_free , sum(a.amount) as amount ")
		;
		data.param // 쿼리문  입력
			.query("select a.item_name , a.item_code , a.item_spec								")
			.query("     , a.qty , a.price , a.sply_amt , a.tax , a.tax_free , a.amount 	")
			.query("     , (select unit_name from item_unit where unit_idcd = a.unit_idcd)  as unit_name  ")
			.query("     , (select bas_nm from base_mst where bas_id = i.brand_id) as brand_nm ")
		;
		data.param
			.where("from sale_dtl a  													")
			.where("     left outer join itm_mst i on i.item_idcd = a.item_idcd			")
			.where(" where a.stor_id = 	:stor_id   " , arg.fixParameter("stor_id"	))
			.where("   and a.inv_no   = 	:inv_no    " , arg.fixParameter("inv_no" 	))
			.where("   and a.row_sts = 0 				                                ")
			.where("order by a.item_name				 									")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}


	/**
	 * 삭제
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

    	data.param
			.table("sale_payment")
			.where("where pay_no = :pay_no ")
			//
			.unique("pay_no"   		, arg.fixParameter("pay_no"))
    		.update("row_sts"		, "2"						)
			.update("upt_nm"		, arg.getParameter("upt_nm"))
			.update("upt_ip"		, arg.remoteAddress)
			.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
    	;data.attach(Action.update);

		data.param
			.query("update sale_mst t															")
			.query("set t.payment = ( select isnull(sum( payment ), 0) 							")
			.query("					from sale_payment 										")
			.query("				   where inv_no = t.inv_no and pay_no <> :pay_no	"  , arg.fixParameter("pay_no"))
			.query("				     and row_sts = 0                                      ")
			.query("				)															")
			.query("where t.inv_no in ( select inv_no											")
			.query("					  from sale_payment										")
			.query("					 where pay_no =  :pay_no						"  , arg.fixParameter("pay_no"))
			.query("			      )															")
		;data.attach();


		data.execute();
		return null;
	}


	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow inv:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(inv.getParameter("_set"));

			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				SqlResultMap picking = inv.getParameter("picking", SqlResultMap.class);
				if (picking != null && picking.size() > 0 ){
					setPicking(arg, data , picking , inv );
				}
				SqlResultMap product = inv.getParameter("product", SqlResultMap.class);
	        	if (product != null && product.size() > 0 ){
	        		setProduct(arg, data ,product , inv );
	        	}

	        	data.param
	        		.table("sale_payment")
	        		.where("where  pay_no  		= :pay_no   						")
	        		//
	        		.unique("pay_no"   		, inv.fixParameter("pay_no"				))
	        		.update("pay_dt"        , inv.fixParameter("pay_dt"             ))

	        		.update("account_id"    , inv.getParameter("account_id"			))
	        		.update("account_um"    , inv.getParameter("account_um"			))
	        		.update("user_memo"     	, inv.getParameter("user_memo"    		))
	        		.update("pay_dept_id"   , inv.getParameter("pay_dept_id"		))
	        		.update("pay_usr_id"   	, inv.getParameter("pay_usr_id"  		))
					.update("upt_nm"     	, inv.getParameter("upt_nm"    		))
					.update("upt_ip"   		, arg.remoteAddress 					 )
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        		.action = Action.update
	        	;
	        	data.attach();

	    		data.param
					.query("update sale_mst t															")
					.query("set t.payment = ( select isnull(sum( payment ), 0) 							")
					.query("					from sale_payment 										")
					.query("				   where inv_no = t.inv_no                                  ")
					.query("				     and row_sts = 0                                      ")
					.query("				)															")
					.query("where t.inv_no in (select inv_no from sale_payment where pay_no = :pay_no ) ", inv.fixParameter("pay_no"))
				;data.attach();

			}
		}
		data.execute();
		return null ;
	}


	/**
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setProduct(HttpRequestArgument arg , DataMessage data, SqlResultMap map, SqlResultRow inv) throws Exception {
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

			} else {
	        	data.param
        			.table("sale_payment")
	        		.where("where  pay_no  		= :pay_no   	" )
	        		.where("  and  inv_no  		= :inv_no   	" )

	        		//
	        		.unique("pay_no"   		, row.fixParameter("pay_no"))
	        		.unique("inv_no"   		, row.fixParameter("inv_no"))
	        		.update("line_memo"     , row.getParameter("line_memo"))
	        		;data.attach(Action.update);

			}

		}
		return null ;
	}



	/**
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setPicking(HttpRequestArgument arg , DataMessage data, SqlResultMap map, SqlResultRow inv) throws Exception {
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {

				/* 수금내역 삭제 */
	        	data.param
	        		.table("sale_payment")
	        		.where("where  pay_no  		= :pay_no   	" )
	        		.where("and    pay_gb 		= :pay_gb   	" )
	        		.where("and    inv_no 		= :inv_no   	" )
	        		//
	        		.unique("pay_no"      , row.fixParameter("pay_no"))
	        		.unique("pay_gb"      , row.fixParameter("pay_gb"))
	        		.unique("inv_no"      , row.fixParameter("inv_no"))
					.update("row_sts"   , "2"                       )
	        	; data.attach(Action.update);

			} else {
				data.param
					.table("sale_payment")
					.where("where pay_no   = :pay_no   " )
					.where("and	  pay_gb   = :pay_gb   " )
					.where("and	  inv_no   = :inv_no   " )
					//
					.unique("corp_id"         , row.fixParameter("corp_id"     ))
					.unique("hq_id"         , row.fixParameter("hq_id"     ))
					.unique("stor_grp"         , row.fixParameter("stor_grp"     ))
					.unique("stor_id"         , row.fixParameter("stor_id"     ))

					.unique("pay_no"           , row.fixParameter("pay_no"       ))
					.update("pay_dt"           , inv.fixParameter("pay_dt"       ))
					.unique("inv_no"           , row.fixParameter("inv_no"       ))
					.unique("pay_gb"           , row.fixParameter("pay_gb"       ))
					.update("payment"          , row.fixParameter("payment"      ))

					.insert("cust_id"       , row.getParameter("cust_id"      ))
					.insert("mmb_id"        , row.getParameter("mmb_id"      ))
					.insert("sales_id"      , row.getParameter("sales_id"     ))
					.update("row_sts"       , "0"                              )
					.insert("crt_nm" 		, inv.getParameter("crt_nm"	 		))
					.insert("crt_ip"   		, arg.remoteAddress 					 )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

				;data.attach(Action.modify);
			}
		}
		return null ;
	}
}
