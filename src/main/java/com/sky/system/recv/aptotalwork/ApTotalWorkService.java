package com.sky.system.recv.aptotalwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class ApTotalWorkService  extends DefaultServiceHandler {

	/**
	 * 현황조회
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");
			data.param // 집계문  입력
				.total("select count(1) as maxsize, sum(w.payment) as payment, sum(w.ar_0100) as ar_0100 				")
				.total("     , sum(w.ar_0101) as ar_0101, sum(w.ar_0200) as ar_0200, sum(w.ar_0400) as ar_0400			")
				.total("     , sum(w.ar_0500) as ar_0500, sum(w.ar_0600) as ar_0600, sum(w.ar_0700) as ar_0700			")
				.total("     , sum(w.ar_0800) as ar_0800, sum(w.ar_0900) as ar_0900										")
			;
			data.param
				.query("select   										")
				.query("	  w.*  , t.acct_no	, (select bas_nm from base_mst where bas_id = t.bank_id) account_nm		")
			;
			data.param
				.where("  from (																						")
				.where("        select x.pay_no  , x.pay_dt   , x.row_clos							 					") // , x.inv_no
				.where("             , x.stor_nm , x.vend_nm  , x.user_memo    , x.stor_grp   , x.bnkbk_id  , x.note_no	")
				.where("             , x.vend_id , x.stor_id  , x.pay_user_nm , x.upt_usr_nm , x.crt_usr_nm				")
				.where("             , sum(x.payment) as payment 														")
				.where("             , sum(x.ar_0100) as ar_0100 , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200")
				.where("             , sum(x.ar_0400) as ar_0400 , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600")
				.where("             , sum(x.ar_0700) as ar_0700 , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900")
				.where("       from ( 																					")
				.where("            select a.pay_no   , a.pay_dt  , a.payment  , a.row_clos								") // , a.inv_no
				.where("                 , a.vend_id  , a.stor_id , a.stor_grp , a.bnkbk_id	, a.note_no					")
				.where("                 , ( select emp_nm from usr_mst where emp_id = a.colt_usr_id) as pay_user_nm	")
				.where("                 , ( select stor_nm from stor where stor_id = a.stor_id) as stor_nm 			")
				.where("                 , ( select vend_nm from vend_mst where vend_id = a.vend_id) as vend_nm 		")
				.where("                 , isnull(case when a.pay_gb = '0100' then a.payment else 0 end ,'0') as ar_0100")
				.where("                 , isnull(case when a.pay_gb = '0101' then a.payment else 0 end ,'0') as ar_0101")
				.where("                 , isnull(case when a.pay_gb = '0200' then a.payment else 0 end ,'0') as ar_0200")
				.where("                 , isnull(case when a.pay_gb = '0400' then a.payment else 0 end ,'0') as ar_0400")
				.where("                 , isnull(case when a.pay_gb = '0500' then a.payment else 0 end ,'0') as ar_0500")
				.where("                 , isnull(case when a.pay_gb = '0600' then a.payment else 0 end ,'0') as ar_0600")
				.where("                 , isnull(case when a.pay_gb = '0700' then a.payment else 0 end ,'0') as ar_0700")
				.where("                 , isnull(case when a.pay_gb = '0800' then a.payment else 0 end ,'0') as ar_0800")
				.where("                 , isnull(case when a.pay_gb = '0900' then a.payment else 0 end ,'0') as ar_0900")
				.where("                 , a.user_memo   , a.upt_dttm , a.crt_dttm 										")
				.where("                 , (select emp_nm from usr_mst where emp_id = a.upt_id) as upt_usr_nm			")
				.where("                 , (select emp_nm from usr_mst where emp_id = a.crt_id) as crt_usr_nm			")
				.where("             from  ist_payment a 																")
				.where("                   join ist_mst b on a.stor_id = b.stor_id  and a.inv_no = b.inv_no				")
				.where("            where  a.row_sts   = 0 																")
				.where("              and  a.stor_grp  = :stor_grp     " , arg.fixParameter("stor_grp"))
				.where("              and  a.stor_id   = :stor_id      " , arg.getParameter("stor_id"))
				.where("              and  a.row_clos  = :row_clos     " , arg.getParameter("row_clos" 	))  // 마감 여부
				.where("              and  a.pay_dt    between :fr_dt  " , arg.getParameter("fr_dt" 		))  // 수금시작일자
				.where("                    		       and :to_dt  " , arg.getParameter("to_dt" 		))  // 수금종료일자
				.where("              and   a.pay_gb    = :pay_gb      " , arg.getParameter("pay_gb" 		))  // 결제방법
				.where("              and   a.vend_id   = :vend_id     " , arg.getParameter("vend_id" 		))  // 매입처
				.where("        ) x 																					")
				.where("       group by x.pay_no  , x.pay_dt   , x.row_clos 											") // , x.inv_no
				.where("           , x.stor_nm    , x.vend_nm  , x.user_memo , x.stor_grp	, x.bnkbk_id				")
				.where("           , x.upt_usr_nm , x.vend_id  , x.stor_id	, x.pay_user_nm	, x.crt_usr_nm , x.note_no	")
				.where("       order by x.pay_no  						 												")	//, w.inv_no
				.where("  ) w																							")
				.where("  left outer join stor_account t  on t.bnkbk_id = w.bnkbk_id									") // t.stor_id = w.stor_id and
			;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows , (page==1),sort );
			}
	}




	/**
	 * 디테일 조회
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select  s.inv_dt,  s.inv_amt																		") // s.inv_inpt_path, , m.acct_no
			.query("	  , w.*																							")
			.query("  from (																							")
			.query("        select x.pay_no      , x.inv_no  , x.pay_dt  , x.row_clos									")
			.query("             , x.stor_nm     , x.apvl_line_memo 													") // x.mmb_nm ,
			.query("             , x.upt_usr_nm  , x.vend_id , x.stor_id , x.stor_grp									")
			.query("             , sum(x.payment)  as payment 															")
			.query("             , sum(x.ar_0100)  as ar_0100  , sum(x.ar_0101) as ar_0101 , sum(x.ar_0200) as ar_0200	")
			.query("             , sum(x.ar_0400)  as ar_0400  , sum(x.ar_0500) as ar_0500 , sum(x.ar_0600) as ar_0600	")
			.query("             , sum(x.ar_0700)  as ar_0700  , sum(x.ar_0800) as ar_0800 , sum(x.ar_0900) as ar_0900	")
			.query("             , max(x.upt_dttm) as upt_dttm , max(x.crt_dttm) as crt_dttm 							")
			.query("        from ( 																						")
			.query("            select a.pay_no  , a.inv_no  , a.pay_dt, a.payment , a.row_clos 						")
			.query("                 , a.vend_id , a.stor_id , a.stor_grp												")
			.query("                 , ( select stor_nm from stor where stor_id = a.stor_id) as stor_nm 				")
			.query("                 , isnull(case when pay_gb = '0100' then payment else 0 end,'0') as ar_0100 		")
			.query("                 , isnull(case when pay_gb = '0101' then payment else 0 end,'0') as ar_0101			")
			.query("                 , isnull(case when pay_gb = '0200' then payment else 0 end,'0') as ar_0200			")
			.query("                 , isnull(case when pay_gb = '0400' then payment else 0 end,'0') as ar_0400			")
			.query("                 , isnull(case when pay_gb = '0500' then payment else 0 end,'0') as ar_0500			")
			.query("                 , isnull(case when pay_gb = '0600' then payment else 0 end,'0') as ar_0600			")
			.query("                 , isnull(case when pay_gb = '0700' then payment else 0 end,'0') as ar_0700			")
			.query("                 , isnull(case when pay_gb = '0800' then payment else 0 end,'0') as ar_0800			")
			.query("                 , isnull(case when pay_gb = '0900' then payment else 0 end,'0') as ar_0900			")
			.query("                 , a.apvl_line_memo   , a.upt_dttm , a.crt_dttm 									")
			.query("                 , (select emp_nm from usr_mst where emp_id = a.upt_id) as upt_usr_nm 				")
			.query("             from   ist_payment a 																	")
			.query("            where   a.stor_id = :stor_id " ,	arg.fixParameter("stor_id"))
			.query("              and   a.pay_no  = :pay_no  " ,	arg.fixParameter("pay_no"))
			.query("              and   a.row_sts = 0																	")
			.query("        ) x 																						")
			.query("        group by x.pay_no  , x.inv_no         , x.pay_dt   , x.row_clos 							")
			.query("            , x.stor_nm    , x.apvl_line_memo , x.stor_grp											") // x.mmb_nm  ,
			.query("            , x.upt_usr_nm , x.vend_id        , x.stor_id											")
			.query("  ) w																								")
			.query("  left outer join recv_balance y  on y.inv_no = w.inv_no											")
			.query("  join ist_mst s on s.inv_no = w.inv_no																")
			.query("  join vend_stor m on w.stor_grp = m.stor_grp and w.vend_id = m.vend_id								")
			.query(" order by w.pay_no  , w.inv_no 						 												")
		;

	    return data.selectForMap();
	}



	/**
	 */
	public SqlResultMap getDialogMemb(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize 	  ")
		;
		data.param
			.query("select a.stor_grp   , b.vend_gb    , a.vend_id , b.vend_cd , b.vend_nm 			") // , b.vend_gp
			.query("    ,  b.biz_tel_no , b.biz_fax_no , b.biz_owner 								")
			;
		data.param
			.where("from   vend_stor    a 															")
			.where("       join vend_mst  b on a.vend_id = b.vend_id  								")
			.where("where  a.stor_grp  = :stor_grp    	 " 	  , arg.fixParameter("stor_grp" 		))
			.where("and    b.vend_nm  like  %:vend_nm% 	 "    , arg.getParameter("vend_nm" 			)) // 검색어가 매입처일 경우
			.where("and    a.row_sts = 0															")
			.where("and    a.npay_amt  <> 0															")
			.where("order by b.vend_nm 																")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}


	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception{
		DataMessage data = arg.newStorage("POS");

		String pay_gubun = arg.getParamText("pay_gubun"); /* 신규여부 구분 */

		/* 기존 정보 수정  */
		if (pay_gubun == null || "".equals(pay_gubun)) {
			data.param
				.query("select  a.stor_id     , a.pay_no       , a.pay_dt  , b.npay_amt  ,	a.vend_id		")
				.query("     , (select vend_nm from vend_mst where vend_id = a.vend_id)      as vend_nm		")
				.query("     , a.colt_usr_id , a.colt_dept_id , a.bnkbk_id									")
				.query("     , (select emp_nm from usr_mst where emp_id = a.colt_usr_id)     as pay_user_nm")
				.query("     , (select dept_nm from dept_mst where dept_id = a.colt_dept_id) as pay_dept_nm")
				.query("     , c.acct_no																	")
				.query("     , (select bas_nm from base_mst where bas_id = c.bank_id) as account_nm 		")
				.query("     , a.user_memo    , a.note_no													")
				.query("from   ist_payment a 																")
				.query("       join vend_stor b on  b.stor_grp = a.stor_grp  and b.vend_id  = a.vend_id		")
				.query("       left outer join stor_account c on c.bnkbk_id = a.bnkbk_id 					")
				.query("where  a.pay_no  = :pay_no "  , arg.fixParameter("pay_no"   ))
				.query("  and  a.row_sts = 0																")
				.query("group  by a.stor_id   , a.pay_no       , a.pay_dt   , b.npay_amt  , a.vend_id		")
				.query("     , a.colt_usr_id , a.colt_dept_id , a.bnkbk_id , a.user_memo						")
				.query("     , c.acct_no     , c.bank_id      , bank_nm    , a.note_no						")
				;
			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param
				.query("select a.corp_id  , a.hq_id    , a.stor_grp       , a.stor_id					") // , a.sales_id
				.query("     , a.pay_dt   , a.pay_no   , a.pay_gb         , a.inv_no					")
				.query("     , a.payment  , b.npay_amt , a.apvl_line_memo , b.inv_dt					")
				.query("     , a.vend_id																") // , c.mmb_nm , a.mmb_id
				.query("     , (select stor_nm from stor where stor_id = a.stor_id) as stor_nm			")
				.query("from  ist_payment a																")
				.query("      join ist_mst b on b.inv_no  = a.inv_no  and b.row_sts = 0					")
				.query("where a.pay_no = 	:pay_no " , arg.fixParameter("pay_no"     ))
				;
				info.get(0).put("picking", data.selectForMap() );

			}
		    return info ;

		} else {  /*  신규 수금건 등록 신규 */
			data.param
				.query("select b.hq_id, a.stor_grp 														")
				.query("     , sum(a.npay_amt) as npay_amt 												")
				.query("     , a.vend_id	,  max(b.vend_nm) as vend_nm 								")
				.query("     , max(c.dept_id) as colt_dept_id 											")
				.query("     , max(d.dept_nm) as pay_dept_nm 											")
				.query("from   vend_stor     a 															")
				.query("       join vend_mst b on b.vend_id  = a.vend_id 								")
				.query("       left outer join usr_mst c on c.emp_id  = a.sales_man_id 					")
				.query("       left outer join dept_mst d on d.dept_id  = c.dept_id 					")
				.query("where   a.stor_grp    = :stor_grp " , arg.fixParameter("stor_grp"   ))
				.query("and     a.vend_id     = :vend_id  " , arg.fixParameter("vend_id"    ))
				.query("group by   b.hq_id, a.stor_grp  , a.vend_id										")

			;
			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param
					.query("select 	a.stor_id  , a.inv_no   , a.inv_dt									") // , a.mmb_id,  b.mmb_nm
					.query("      , (select stor_nm from stor where stor_id = a.stor_id) as stor_nm		")
					.query(" 	  , b.vend_id							  								") // , b.sales_id
					.query(" 	  , a.npay_amt , a.npay_amt as colt_schd_amt , b.user_memo				")
					.query("  from  recv_balance    a 													")
					.query("  		join ist_mst  b on b.inv_no  = a.inv_no 							")
					.query(" where  a.stor_grp  = :stor_grp " , arg.fixParameter("stor_grp"   	))
					.query("   and  a.vend_id   = :vend_id  " , arg.fixParameter("vend_id"    	))
					.query("   and  b.row_sts   = 0	 													")
					.query(" order by a.inv_dt , a.inv_no 												")
					;
				info.get(0).put("product", data.selectForMap() );

			}
		    return info ;
		}

	}



	/**
	 * 수금예정리스트 - 미수 고객 리스트
	 */
	public SqlResultMap getArList(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {


		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(h1.npay_amt) as npay_amt  ")
		;
		data.param
			.query("select h1.hq_id        , h1.stor_grp												") // , a.stor_id
			.query("     , h1.mngt_stor_id , h1.owner_nm 												")
			.query("     , h1.vend_id      , h1.vend_cd   , h1.vend_nm     , h1.vend_gb   , h1.vend_sts	")
			.query("     , h1.npay_amt																	") // , b.pri_no
		;
		data.param
			.where(" from (																				")
			.where("    select a.hq_id    , a.stor_grp  ,  b.mngt_stor_id								") // , a.stor_id
			.where("         , (select stor_nm from stor  where stor_id = b.mngt_stor_id  ) as owner_nm	")
			.where("         , b.vend_id   , b.vend_cd   ,  b.vend_nm     , b.vend_gb     , b.vend_sts	")
			.where("         , sum(a.npay_amt) as npay_amt												") // , b.pri_no
			.where("    from   vend_stor a 																")
			.where("           join vend_mst b on b.vend_id = a.vend_id    								")
			.where("    where  a.npay_amt  <> 0															")
			.where("    and    a.row_sts   < 2															")
			.where("    and    a.stor_grp  = 	:stor_grp "	 , arg.fixParameter("stor_grp"  ))
			.where("    group by  a.hq_id , b.mngt_stor_id , a.stor_grp									")
			.where("   		,   b.vend_id , b.vend_cd    , b.vend_nm   , b.vend_gb     , b.vend_sts		")
			.where("    ) h1																			")
			.where("order by h1.vend_nm																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}



	/**
	 * 수금예정리스트 - 미수현황 조회
	 */
	public SqlResultMap getArListSales(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {


		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select count(1) as maxsize												")
			.total("      , sum(b.inv_amt) as inv_amt, sum(a.npay_amt) as npay_amt			")
		;
		data.param
			.query("select a.inv_dt , a.inv_no    											")
			.query("	, b.inv_amt , a.npay_amt 			 								")
			.query("	, a.stor_id 														")
			.query("	, ( select stor_nm from stor where stor_id = a.stor_id) as stor_nm	")
		;
		data.param
			.where("  from recv_balance a 													")
			.where(" 	   join ist_mst b on b.inv_no = a.inv_no 							")
			.where(" where a.stor_grp = :stor_grp " ,	arg.fixParameter("stor_grp"))
			.where("   and a.vend_id  = :vend_id  " ,	arg.fixParameter("vend_id" ))
			.where("   and a.row_sts = 0 													")
			.where("order by a.inv_dt , a.inv_no											")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}

	/**
	 * 수금예정리스트 - 미수현항 상세조회
	 */
	public SqlResultMap getArListItems(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize , sum(a.qty) as qty, sum(a.pri) as pri			")
			.total("     , sum(a.sply_amt)   as sply_amt   , sum(a.tax_amt) as tax_amt			")
			.total("     , sum(a.txfree_amt) as txfree_amt , sum(a.inv_amt) as inv_amt			")
		;
		data.param
			.query("select a.item_name , a.item_code  												")
			.query("     , a.qty    , a.pri , a.sply_amt , a.tax_amt , a.txfree_amt , a.inv_amt	")
			.query("     , (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name		")
			.query("     , b.itm_shrt_cd 														")
		;
		data.param
			.where("from  recv_item a join itm_mst b on a.item_idcd = b.item_idcd						")
			.where("where a.stor_id = :stor_id   " , arg.fixParameter("stor_id"	))
			.where("and   a.inv_no  = :inv_no    " , arg.fixParameter("inv_no" 	))
			.where("and   a.row_sts = 0 														")
			.where("order by a.item_name				 											")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}



	/**
	 *
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));


			if (rowaction == Action.delete) {

				throw new ServiceException("삭제불가");


			} else {

	        	if(row.getParameter("product", SqlResultMap.class) != null){
	        		setProduct(arg, data , row.getParameter("product", SqlResultMap.class), row );
	        	}

			}
		}
		data.execute();
		return null ;
	}

	/**
	 * 삭제
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("update ist_mst t															")
			.query("set t.payment = ( select isnull(sum( payment ), 0) 							")
			.query("                  from   ist_payment 										")
			.query("                  where  inv_no = t.inv_no and pay_no <> :pay_no "	, arg.fixParameter("pay_no"))
			.query("                  and    row_sts = 0										")
			.query("                )															")
			.query("where t.inv_no in ( select inv_no											")
			.query("                    from   ist_payment										")
			.query("                    where  pay_no = :pay_no "	, arg.fixParameter("pay_no"))
			.query("                  )															")
		;data.attach();

    	data.param
			.table("ist_payment")
			.where("where pay_no = :pay_no ")
			//
			.unique("pay_no"   		, arg.fixParameter("pay_no"))
    		.update("row_sts"		, "2"						)
			.update("upt_usr_nm"	, arg.getParameter("upt_usr_nm"))
			.update("upt_ip"		, arg.remoteAddress				)
	        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
    	;data.attach(Action.update);

		data.execute();
		return null;
	}

	/**
	 */
	public SqlResultMap setProduct(HttpRequestArgument arg , DataMessage data, SqlResultMap map, SqlResultRow inv) throws Exception {
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {

			} else {
				if(inv.getParameter("picking", SqlResultMap.class) != null){
					setPicking(arg, data , inv.getParameter("picking", SqlResultMap.class) , row, inv );
				}

				//System.out.println("492  sale_mst npay_amt update ");
				// 매출정보 미수금 정보 변경
				data.param
					.query("update ist_mst set												")
					.query("       payment =( select isnull(sum(c.payment),0)				")
					.query("                  from   ist_payment c							")
					.query("                  where  c.inv_no = a.inv_no					")
					.query("                  and    c.row_sts = 0							")
					.query("                 )												")
					.query(" where a.inv_no   =  :inv_no "  , row.fixParameter("inv_no"		))
				;
				data.attach();


	        	data.param
        			.table("ist_payment")
	        		.where("where  pay_no  		= :pay_no   	" )
	        		.where("  and  inv_no  		= :inv_no   	" )

	        		//
	        		.unique("pay_no"   			, row.fixParameter("pay_no"))
	        		.unique("inv_no"   			, row.fixParameter("inv_no"))
	        		.update("bnkbk_id"			, inv.getParameter("bnkbk_id"))
	        		.update("apvl_line_memo"	, row.getParameter("apvl_line_memo"))
	        		;data.attach(Action.update);

			}

		}
		return null ;
	}



	/**
	 *
	 */
	public SqlResultMap setPicking(HttpRequestArgument arg , DataMessage data, SqlResultMap map, SqlResultRow pkg, SqlResultRow inv) throws Exception {

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {

				/* 수금내역 삭제 */
	        	data.param
	        		.table("ist_payment")
	        		.where("where  pay_no  		= :pay_no   	" )
	        		.where("and    pay_gb 		= :pay_gb   	" )
	        		.where("and    inv_no 		= :inv_no   	" )

	        		//
	        		.unique("pay_no"	, row.fixParameter("pay_no"))
	        		.unique("pay_gb"	, row.fixParameter("pay_gb"))
	        		.unique("inv_no"	, row.fixParameter("inv_no"))
					.update("row_sts"	, "2"                       )
					; data.attach(Action.update);

			} else {
				data.param
				.table("ist_payment")
				.where("where pay_no   = :pay_no    " )
				.where("and	  pay_gb   = :pay_gb   " )
				.where("and	  inv_no   = :inv_no   " )
				//
				.unique("corp_id"         , row.fixParameter("corp_id"     ))
				.unique("hq_id"           , row.fixParameter("hq_id"       ))
				.unique("stor_grp"        , row.fixParameter("stor_grp"    ))
				.unique("stor_id"         , row.fixParameter("stor_id"     ))
				.unique("colt_stor_id"    , row.fixParameter("colt_stor_id"))

				.unique("pay_no"           , row.fixParameter("pay_no"       ))
				.update("pay_dt"           , row.fixParameter("pay_dt"       ))
				.unique("inv_no"           , row.fixParameter("inv_no"       ))
				.unique("pay_gb"           , row.fixParameter("pay_gb"       ))
				.update("payment"          , row.fixParameter("payment"      ))

				.update("bnkbk_id"         , row.getParameter("bnkbk_id"     ))

				.update("colt_usr_id"      , row.getParameter("colt_usr_id"  ))
				.update("colt_dept_id"     , row.getParameter("colt_dept_id" ))

				.insert("vend_id"          , row.getParameter("vend_id"      ))
				.update("note_no"          , inv.getParameter("note_no"      ))
				.update("user_memo"         , row.getParameter("user_memo"     ))

				.update("row_sts"          , "0"                              )

				.update("upt_usr_nm"       , inv.getParameter("upt_usr_nm"   ))
				.update("upt_ip"           , arg.remoteAddress				  )
				.insert("crt_usr_nm"       , inv.getParameter("crt_usr_nm"	 ))
				.insert("crt_ip"           , arg.remoteAddress				  )
		        .update("upt_dttm"         , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		        .insert("crt_dttm"         , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
			}

		}
		return null ;
	}



}
