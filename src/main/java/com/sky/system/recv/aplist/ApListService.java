package com.sky.system.recv.aplist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class ApListService  extends DefaultServiceHandler {


	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String[] inv_inpt_path = arg.getParamCast("inv_inpt_path", String[].class);

			DataMessage data = arg.newStorage("POS");
			data.param
				.total("select count(1) as maxsize, sum(w.payment) as payment, sum(ar_0100) as ar_0100 		")
				.total("     , sum(ar_0101) as ar_0101, sum(ar_0200) as ar_0200, sum(ar_0400) as ar_0400	")
				.total("     , sum(ar_0500) as ar_0500, sum(ar_0600) as ar_0600, sum(ar_0700) as ar_0700	")
				.total("     , sum(ar_0800) as ar_0800, sum(ar_0900) as ar_0900								")
			;
			data.param
				.query("select   										")
				.query("	  w.*	, t.acct_no	, (select bas_nm from base_mst where bas_id = t.bank_id) account_nm			")
			;
			data.param
				.where("  from (																							")
				.where("		select x.pay_no , x.pay_dt   , x.row_clos	 , x.stor_grp			 						")
				.where(" 			, x.stor_nm , x.vend_nm  , x.user_memo    , x.bnkbk_id	, x.note_no						")
				.where(" 			, x.vend_id , x.stor_id  , x.pay_user_nm												")
				.where(" 			, sum(x.payment) as payment 															")
				.where(" 			, sum(x.ar_0100) as ar_0100 , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200		")
				.where(" 			, sum(x.ar_0400) as ar_0400 , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600		")
				.where(" 			, sum(x.ar_0700) as ar_0700 , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900		")
				.where(" 		from ( 																						")
				.where("			select   a.pay_no , a.pay_dt  , a.payment  , a.row_clos									") // , a.inv_no
				.where("     	 		,  a.vend_id  , a.stor_id , a.stor_grp , a.bnkbk_id	, a.note_no						")
				.where("	 	 		,  ( select emp_nm  from usr_mst  where emp_id = a.colt_usr_id) as pay_user_nm		")
				.where("	 	 		,  ( select stor_nm from stor     where stor_id = a.stor_id) as stor_nm 			")
				.where("	 	 		,  ( select vend_nm from vend_mst where vend_id = a.vend_id) as vend_nm 			")
				.where("	 	 		,   isnull(case when a.pay_gb = '0100' then a.payment else 0 end ,'0') as ar_0100	")
				.where("	 	 		,   isnull(case when a.pay_gb = '0101' then a.payment else 0 end ,'0') as ar_0101	")
				.where("	 	 		,   isnull(case when a.pay_gb = '0200' then a.payment else 0 end ,'0') as ar_0200	")
				.where("	 	 		,   isnull(case when a.pay_gb = '0400' then a.payment else 0 end ,'0') as ar_0400	")
				.where("	  	 		,   isnull(case when a.pay_gb = '0500' then a.payment else 0 end ,'0') as ar_0500	")
				.where("	  	 		,   isnull(case when a.pay_gb = '0600' then a.payment else 0 end ,'0') as ar_0600	")
				.where("	  	 		,   isnull(case when a.pay_gb = '0700' then a.payment else 0 end ,'0') as ar_0700	")
				.where(" 	  	 		,   isnull(case when a.pay_gb = '0800' then a.payment else 0 end ,'0') as ar_0800	")
				.where("	  	 		,   isnull(case when a.pay_gb = '0900' then a.payment else 0 end ,'0') as ar_0900	")
				.where("	  	 		,   a.user_memo  																	")
				.where("   	  		 from   ist_payment a 																	")
				.where("   	  		        join ist_mst b on a.stor_id = b.stor_id 										")
				.where("   	  		                        and a.inv_no = b.inv_no 										")
				.where(" 	 		where   a.stor_id   = :stor_id     " , arg.fixParameter("stor_id" 	))
				.where("      		  and   a.row_sts   = 0 																")
				.where("	   		  and   a.row_clos  = :row_clos    " , arg.getParameter("row_clos" 	))  // 마감 여부
				.where("  	   		  and   a.pay_dt    between :fr_dt " , arg.getParameter("fr_dt" 	))  // 수금시작일자
				.where("                    		        and :to_dt " , arg.getParameter("to_dt" 	))  // 수금종료일자
				.where("	   		  and   a.pay_gb    = :pay_gb      " , arg.getParameter("pay_gb" 	))  // 결제방법
				.where("	   		  and   a.vend_id   = :vend_id     " , arg.getParameter("vend_id" 	))  // 고객
				.where("   			  and 	b.inv_work_gb 	in 	( :inv_inpt_path ) 	" , inv_inpt_path , (inv_inpt_path.length>0)) /* 주문 위치 */
				.where("      	) x 																						")
				.where(" 		group by x.pay_no   , x.pay_dt   , x.row_clos 												") // , x.inv_no
				.where(" 			   , x.stor_nm  , x.vend_nm  , x.user_memo     , x.stor_grp  , x.bnkbk_id				")
				.where(" 			   , x.vend_id  , x.stor_id  , x.pay_user_nm  , x.note_no								") //x.upt_usr_nm  , , x.crt_usr_nm
				.where("  ) w																								")
				.where("  left outer join stor_account t  on   t.bnkbk_id = w.bnkbk_id										") // t.stor_id = w.stor_id and
				.where("  join vend_stor m     on  w.stor_grp = m.stor_grp													")
				.where("       		           and  w.vend_id  = m.vend_id													")
				.where(" where 1 = 1				 						 												")
				.where("   and m.clss_1 = :vend_cls1_id "  , arg.getParameter("vend_cls1_id" 	)) // 고객분류1
				.where("   and m.clss_2 = :vend_cls2_id "  , arg.getParameter("vend_cls2_id" 	)) // 고객분류2
				.where("   and m.clss_3 = :vend_cls3_id "  , arg.getParameter("vend_cls3_id" 	)) // 고객분류3
				.where("   and m.clss_5 = :ar_cls5_id   "  , arg.getParameter("ar_cls5_id" 		)) // 지급방법
				.where("   and m.clss_6 = :ar_cls6_id   "  , arg.getParameter("ar_cls6_id" 		)) // 지급기일
				.where(" order by w.pay_no  						 														")	//, w.inv_no
			;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
	}




	/**
	 * 디테일 조회
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  s.inv_work_gb, s.inv_dt,  s.inv_amt   														") //, m.acct_no
			.query("	  , w.*																							")
			.query("  from (select x.pay_no   , x.inv_no     , x.pay_dt , x.row_clos									")
			.query(" 			 , x.stor_nm  , x.apvl_line_memo 														")
			.query(" 			 , x.vend_id  , x.stor_id    , x.stor_grp												")  // x.upt_usr_nm ,
			.query(" 			 , sum(x.payment) as payment 															")
			.query(" 			 , sum(x.ar_0100) as ar_0100 , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200	")
			.query(" 			 , sum(x.ar_0400) as ar_0400 , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600	")
			.query(" 			 , sum(x.ar_0700) as ar_0700 , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900	")
			.query(" 		from (select a.pay_no , a.inv_no , a.pay_dt, a.payment , a.row_clos 						")
			.query("     	 		   , a.vend_id , a.stor_id 	, a.stor_grp											")
			.query("	 	 		   , ( select stor_nm from stor where stor_id = a.stor_id) as stor_nm 				")
			.query("	 	 		   , isnull(case when pay_gb = '0100' then payment else 0 end,'0') as ar_0100		")
			.query("	 	 		   , isnull(case when pay_gb = '0101' then payment else 0 end,'0') as ar_0101		")
			.query("	 	 		   , isnull(case when pay_gb = '0200' then payment else 0 end,'0') as ar_0200		")
			.query("	 	 		   , isnull(case when pay_gb = '0400' then payment else 0 end,'0') as ar_0400		")
			.query("	  	 		   , isnull(case when pay_gb = '0500' then payment else 0 end,'0') as ar_0500		")
			.query("	  	 		   , isnull(case when pay_gb = '0600' then payment else 0 end,'0') as ar_0600		")
			.query("	  	 		   , isnull(case when pay_gb = '0700' then payment else 0 end,'0') as ar_0700		")
			.query(" 	  	 		   , isnull(case when pay_gb = '0800' then payment else 0 end,'0') as ar_0800		")
			.query("	  	 		   , isnull(case when pay_gb = '0900' then payment else 0 end,'0') as ar_0900		")
			.query("	  	 		   , a.apvl_line_memo   															")  //, a.upt_dttm , a.crt_dttm
			.query("   	  		  from ist_payment a 																	")
			.query(" 	 		 where a.stor_grp  = :stor_grp " , arg.fixParameter("stor_grp" 		))
			.query(" 	 		   and a.stor_id   = :stor_id  " , arg.getParameter("stor_id" 		))
			.query("	   		   and a.pay_no    = :pay_no   " , arg.fixParameter("pay_no" 		))
			.query("    		   and a.row_sts = 0																	")
			.query("      	) x 																						")
			.query(" 		group by x.pay_no , x.inv_no   , x.pay_dt   , x.row_clos 									")
			.query(" 			, x.stor_nm  , x.apvl_line_memo , x.stor_grp											")
			.query(" 			 , x.vend_id  , x.stor_id			 													") //, x.upt_usr_nm
			.query("  ) w																								")
			.query("  left outer join recv_balance y  on y.inv_no = w.inv_no											")
			.query("  join ist_mst s on s.inv_no = w.inv_no																")
			.query("  join vend_stor m on w.stor_grp = m.stor_grp														")
			.query("       		             and w.vend_id = m.vend_id													")
			.query(" order by w.pay_no  , w.inv_no 						 												")
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
		data.param
			.query("select a.hq_id    , a.stor_grp   , b.mngt_stor_id   									")
			.query("     , (select stor_nm from stor   where stor_id = b.mngt_stor_id    ) as owner_nm		")
			.query("     , b.vend_id  , b.vend_cd    , b.vend_nm     , b.vend_gb     , b.vend_sts  			")
			.query("     , a.npay_amt     																	")
		;
		data.param
			.where("from   vend_stor a 																		")
			.where("       join   vend_mst  b on b.vend_id = a.vend_id    									")
			.where("where  a.stor_grp  = 	:stor_grp " , arg.fixParameter("stor_grp" 	))
			.where("and    a.vend_id   = 	:vend_id  " , arg.getParameter("vend_id" 	))
			.where("and    a.npay_amt  <> 0																	")
			.where("and    a.row_sts   < 2																	")
			.where("and    a.clss_1  = :vend_cls1_id  " , arg.getParameter("vend_cls1_id" 		)) // 고객분류1
			.where("and    a.clss_2  = :vend_cls2_id  " , arg.getParameter("vend_cls2_id" 		)) // 고객분류2
			.where("and    a.clss_3  = :vend_cls3_id  " , arg.getParameter("vend_cls3_id" 		)) // 고객분류3
			.where("and    a.clss_5  = :ar_cls5_id    " , arg.getParameter("ar_cls5_id" 		)) // 지급방법
			.where("and    a.clss_6  = :ar_cls6_id    " , arg.getParameter("ar_cls6_id" 		)) // 지급기일

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
	 */
	public SqlResultMap getApListSales(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {


		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize , sum(a.inv_amt) as inv_amt, sum(a.npay_amt) as npay_amt" )
		;
		data.param
			.query("select a.inv_dt  , a.inv_no    									")
			.query("     , a.inv_amt , a.npay_amt 									")
		;
		data.param
			.where(" from ist_mst a 												")
			.where(" where a.stor_id  = :stor_id  " , arg.fixParameter("stor_id"))
			.where("   and a.vend_id  = :vend_id  " , arg.fixParameter("vend_id" ))
			.where("   and a.npay_amt <> 0											")
			.where("   and a.row_sts  = 0 											")
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
	 */
	public SqlResultMap getApListItems(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize , sum(a.qty) as qty, sum(a.pri) as pri			")
			.total("     , sum(a.sply_amt)   as sply_amt   , sum(a.tax_amt) as tax_amt			")
			.total("     , sum(a.txfree_amt) as txfree_amt , sum(a.inv_amt) as inv_amt			")
		;
		data.param
			.query("select a.item_name , a.item_code  												")
			.query("     , a.qty , a.pri , a.sply_amt , a.tax_amt , a.txfree_amt , a.inv_amt 	")
			.query("     , b.itm_shrt_cd 														")
		;
		data.param
			.where("from recv_item a join itm_mst b on a.item_idcd = b.item_idcd						")
			.where(" where a.stor_id =  :stor_id   " , arg.fixParameter("stor_id"	))
			.where("   and a.inv_no  =  :inv_no    " , arg.fixParameter("inv_no" 	))
			.where("   and a.row_sts =  0 														")
			.where("order by a.item_name															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

}