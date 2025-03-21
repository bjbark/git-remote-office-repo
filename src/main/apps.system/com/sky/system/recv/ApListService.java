package com.sky.system.recv;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class ApListService  extends DefaultServiceHandler {

//	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);

			DataMessage data = arg.newStorage("POS");
			data.param
				.total("select count(1) as maxsize, sum(w.payment) as payment, sum(ar_0100) as ar_0100 		")
				.total("     , sum(ar_0101) as ar_0101, sum(ar_0200) as ar_0200, sum(ar_0400) as ar_0400	")
				.total("     , sum(ar_0500) as ar_0500, sum(ar_0600) as ar_0600, sum(ar_0700) as ar_0700	")
				.total("     , sum(ar_0800) as ar_0800, sum(ar_0900) as ar_0900								")
			;
			data.param // 쿼리문  입력
				.query("select   										")
				.query("	  w.*	, t.account_no	, (select bas_nm from base_mst where bas_id = t.bank_id) account_nm	")
			;
			data.param
				.where("  from (																						")
				.where("		select x.pay_no , x.pay_dt , x.row_clos	, x.stor_grp			 						")
				.where(" 			, x.stor_nm  , x.vend_nm  ,  x.user_memo 	,  x.account_id	, x.account_um			")
				.where(" 			, x.vend_id , x.stor_id , x.pay_usr_nm												")
				.where(" 			, sum(x.payment) as payment 														")
				.where(" 			, sum(x.ar_0100) as ar_0100 , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200 ")
				.where(" 			, sum(x.ar_0400) as ar_0400 , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600 ")
				.where(" 			, sum(x.ar_0700) as ar_0700 , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900 ")
				.where(" 		from ( 																					")
				.where("			select   a.pay_no , a.pay_dt, a.payment , a.row_clos 								")
				.where("     	 		,  a.vend_id , a.stor_id , a.stor_grp	, a.account_id	, a.account_um			")
				.where("	 	 		,  ( select emp_nm from usr_mst where emp_id = a.pay_usr_id) as pay_usr_nm		")
				.where("	 	 		,  ( select stor_nm from stor where stor_id = a.stor_id) as stor_nm 			")
				.where("	 	 		,  ( select vend_nm from vend_mst where vend_id = a.vend_id) as vend_nm 		")
				.where("	 	 		,   isnull(case when a.pay_gb = '0100' then a.payment else 0 end ,'0') as ar_0100 ")
				.where("	 	 		,   isnull(case when a.pay_gb = '0101' then a.payment else 0 end ,'0') as ar_0101 ")
				.where("	 	 		,   isnull(case when a.pay_gb = '0200' then a.payment else 0 end ,'0') as ar_0200 ")
				.where("	 	 		,   isnull(case when a.pay_gb = '0400' then a.payment else 0 end ,'0') as ar_0400 ")
				.where("	  	 		,   isnull(case when a.pay_gb = '0500' then a.payment else 0 end ,'0') as ar_0500 ")
				.where("	  	 		,   isnull(case when a.pay_gb = '0600' then a.payment else 0 end ,'0') as ar_0600 ")
				.where("	  	 		,   isnull(case when a.pay_gb = '0700' then a.payment else 0 end ,'0') as ar_0700 ")
				.where(" 	  	 		,   isnull(case when a.pay_gb = '0800' then a.payment else 0 end ,'0') as ar_0800 ")
				.where("	  	 		,   isnull(case when a.pay_gb = '0900' then a.payment else 0 end ,'0') as ar_0900 ")
				.where("	  	 		,   a.user_memo  																")
				.where("   	  		 from   ist_payment a 																")
				.where("   	  		        join ist_mst b on a.stor_id = b.stor_id 									")
				.where("   	  		                        and a.inv_no = b.inv_no 									")
				.where(" 	 		where   a.stor_id 	 	= :stor_id      		" , arg.fixParameter("stor_id" 	))
				.where("      		  and   a.row_sts     = 0 				                                        ")
				.where("	   		  and   a.row_clos     = :row_clos     		" , arg.getParameter("row_clos" 	))  // 마감 여부
				.where("  	   		  and   a.pay_dt    between :fr_dt       		" , arg.getParameter("fr_dt" 		))  // 수금시작일자
				.where("                    		        and :to_dt       		" , arg.getParameter("to_dt" 		))  // 수금종료일자
				.where("	   		  and   a.pay_gb     	= :pay_gb    		 	" , arg.getParameter("pay_gb" 		))  // 결제방법
				.where("	   		  and   a.vend_id    	= :vend_id    		 	" , arg.getParameter("vend_id" 		))  // 고객
				.where("   			  and 	b.inv_work_gb 	in 	( :inv_work_id ) 	" , inv_work_id , (inv_work_id.length>0)) /* 주문 위치 */
				.where("      	) x 																					")
				.where(" 		group by x.pay_no     , x.pay_dt   , x.row_clos 										") // , x.inv_no
				.where(" 			,    x.stor_nm   , x.vend_nm  , x.user_memo , x.stor_grp  , x.account_id				")
				.where(" 			,     x.vend_id  , x.stor_id	, x.pay_usr_nm	, x.account_um						")
				.where("  ) w																							")
				.where("  left outer join stor_account t  on   t.account_id = w.account_id								") // t.stor_id = w.stor_id and
				.where("  join vend_store m     on  w.stor_grp = m.stor_grp												")
				.where("       		           and  w.vend_id  = m.vend_id												")
				.where(" where 1 = 1				 						 											")
				.where("   and m.clss_5   		= :ar_cls5_id  			" 		, arg.getParameter("ar_cls5_id" 		)) // 지급방법
				.where("   and m.clss_6   		= :ar_cls6_id  			" 		, arg.getParameter("ar_cls6_id" 		)) // 지급기일

				.where(" order by w.pay_no  						 											")	//, w.inv_no

			;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
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
			.query("select   s.inv_work_gb, s.inv_dt,  s.amount   , m.acct_no										")
			.query("	  , w.*																						")
			.query("  from (																						")
			.query("		select x.pay_no , x.inv_no , x.pay_dt , x.row_clos							 			")
			.query(" 			, x.stor_nm  , x.line_memo 															")
			.query(" 			, x.vend_id , x.stor_id 	, x.stor_grp											")
			.query(" 			, sum(x.payment) as payment 														")
			.query(" 			, sum(x.ar_0100) as ar_0100 , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200 ")
			.query(" 			, sum(x.ar_0400) as ar_0400 , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600 ")
			.query(" 			, sum(x.ar_0700) as ar_0700 , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900 ")
			.query(" 		from ( 																					")
			.query("			select   a.pay_no , a.inv_no , a.pay_dt, a.payment , a.row_clos 					")
			.query("     	 		,  a.vend_id , a.stor_id 	, a.stor_grp										")
			.query("	 	 		,  ( select stor_nm from stor where stor_id = a.stor_id) as stor_nm 			")
			.query("	 	 		,   isnull(case when pay_gb = '0100' then a.payment else 0 end ,'0') as ar_0100 ")
			.query("	 	 		,   isnull(case when pay_gb = '0101' then a.payment else 0 end ,'0') as ar_0101 ")
			.query("	 	 		,   isnull(case when pay_gb = '0200' then a.payment else 0 end ,'0') as ar_0200 ")
			.query("	 	 		,   isnull(case when pay_gb = '0400' then a.payment else 0 end ,'0') as ar_0400 ")
			.query("	  	 		,   isnull(case when pay_gb = '0500' then a.payment else 0 end ,'0') as ar_0500 ")
			.query("	  	 		,   isnull(case when pay_gb = '0600' then a.payment else 0 end ,'0') as ar_0600 ")
			.query("	  	 		,   isnull(case when pay_gb = '0700' then a.payment else 0 end ,'0') as ar_0700 ")
			.query(" 	  	 		,   isnull(case when pay_gb = '0800' then a.payment else 0 end ,'0') as ar_0800 ")
			.query("	  	 		,   isnull(case when pay_gb = '0900' then a.payment else 0 end ,'0') as ar_0900 ")
			.query("	  	 		,   a.line_memo   								")
			.query("   	  		 from   ist_payment a 																")
			.query(" 	 		where   a.stor_grp 	  = :stor_grp      " , arg.fixParameter("stor_grp" 				))
			.query(" 	 		  and   a.stor_id 	  = :stor_id      " , arg.getParameter("stor_id" 				))
			.query("	   		  and   a.pay_no     = :pay_no     		" , arg.fixParameter("pay_no" 				))
			.query("    		  and   a.row_sts = 0			                            						")
			.query("      	) x 																					")
			.query(" 		group by x.pay_no , x.inv_no   , x.pay_dt   , x.row_clos 								")
			.query(" 			, x.stor_nm  , x.line_memo , x.stor_grp												")
			.query(" 			 , x.vend_id  , x.stor_id			 												")
			.query("  ) w																							")
			.query("  left outer join recv_balance y  on y.inv_no = w.inv_no										")
			.query("  join ist_mst s on s.inv_no = w.inv_no														")
			.query("  join vend_store m on w.stor_grp = m.stor_grp													")
			.query("       		             and w.vend_id = m.vend_id												")
			.query(" order by w.pay_no  , w.inv_no 						 											")
		;

	    return data.selectForMap();
	}



	/**
	 * 지급예정리스트 - 미지급 매입사 리스트
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getApList(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {


		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize , sum(a.npay_amt) as npay_amt" )
		;
		data.param // 쿼리문  입력
			.query("select a.hq_id    , a.stor_grp    																")
			.query("     , b.owner_id    , (select stor_nm from stor     where stor_id = b.owner_id    ) as owner_nm ")
			.query("   ,   b.vend_id     , b.vend_cd     ,  b.vend_nm     , b.vend_gb     , b.vend_sts  				")
			.query("   ,   a.npay_amt     																				")
		;
		data.param
			.where("from   vend_store                    a 																")
			.where("       join            vend_mst     b on b.vend_id = a.vend_id    									")
			.where("where  a.stor_grp  = 	:stor_grp     	 	"		 ,	 arg.fixParameter("stor_grp" 				))
			.where("and    a.npay_amt  <> 0           																	")
			.where("and    a.row_sts < 2           																	")
			.where("order by b.vend_nm								            										")

			;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}



	/**
	 * 지급예정리스트 - 미지급현황 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getApListSales(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {


		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize , sum(a.amount) as amount, sum(a.npay_amt) as npay_amt" )
		;
		data.param // 쿼리문  입력
			.query("select a.inv_dt  , a.inv_no    					")
			.query(" , a.amount , a.npay_amt 				")
		;
		data.param
			.where(" from ist_mst a 												")
			.where(" where a.stor_id = 	:stor_id   " , arg.fixParameter("stor_id"))
			.where("   and a.vend_id  = 	:vend_id    " , arg.fixParameter("vend_id" ))
			.where("   and a.npay_amt <> 0				 							")
			.where("   and a.row_sts = 0 				                            ")
			.where("order by a.inv_dt , a.inv_no				 					")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}

	}

	/**
	 * 미지급예정리스트 - 미지급 현항 상세조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getApListItems(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize , sum(a.qty) as qty, sum(a.price) as price ")
			.total("   ,   sum(a.sply_amt) as sply_amt, sum(a.tax) as tax, sum(a.tax_free) as tax_free, sum(a.amount) as amount ")
		;
		data.param // 쿼리문  입력
			.query("select a.item_name , a.item_code  										")
			.query(" , a.qty , a.price , a.sply_amt , a.tax , a.tax_free , a.amount 	")
		;
		data.param
			.where("from recv_item a  													")
			.where(" where a.stor_id = 	:stor_id   " , arg.fixParameter("stor_id"	))
			.where("   and a.inv_no   = 	:inv_no    " , arg.fixParameter("inv_no" 	))
			.where("   and a.row_sts = 0 				                                ")
			.where("order by a.item_name				 									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}