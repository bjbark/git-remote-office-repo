package com.sky.system.move.moverecvwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class MoveRecvWorkService  extends DefaultServiceHandler {


	/**
	 * master 조회
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize												")
			.total("      ,sum(a.sply_amt)  as sply_amt										")
			.total("      ,sum(a.tax_amt)   as tax_amt										")
			.total("      ,sum(a.inv_amt)   as inv_amt										")
		;
		data.param // 조회
			.query("select a.row_clos														")
			.query("      ,a.stor_id														")
			.query("      ,b.stor_nm														")
			.query("      ,c.emp_nm as inv_user_nm											")
			.query("      ,a.inv_no															")
			.query("      ,a.inv_dt															")
			.query("      ,a.sts_cd															")
			.query("      ,a.move_id														")
			.query("      ,(select stor_nm from stor where stor_id = a.move_id) as move_nm	")
			.query("      ,a.sply_amt														")
			.query("      ,a.tax_amt														")
			.query("      ,a.inv_amt														")
			.query("      ,a.org_inv_no														")
			.query("      ,a.qty															")
			.query("      ,d.biz_fax_no as fax_no											")
			.query("      ,d.biz_email  as email											")
		;
		data.param // 조건
			.where("  from move_ist_mst a													")
			.where("       left outer join stor b     on b.stor_id = a.stor_id				")
			.where("       left outer join usr_mst c  on c.emp_id = a.inv_usr_id			")
			.where("       left outer join stor d     on d.stor_id = a.move_id				")
			.where(" where a.stor_id = :stor_id       ", arg.fixParameter("stor_id" ))
			.where("   and a.move_id  = :move_id      ", arg.getParameter("move_id"  ))
			.where("   and a.inv_dt between :fr_dt    ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt    ", arg.fixParameter("to_dt"))
			.where("   and a.inv_usr_id = :inv_usr_id ", arg.getParameter("inv_usr_id"))
			.where("   and a.sts_cd = :sts_cd         ", arg.getParameter("sts_cd"))
			.where("   and a.row_sts = 0 													")
			.where("   and a.row_clos  = :row_clos    ", arg.getParameter("row_clos" 	))  // 마감 여부
			.where(" order by a.inv_no desc													")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * detail 조회
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select a.inv_no														")
		.query("      ,a.line_seqn													")
		.query("      ,a.seq_dsp													")
		.query("      ,a.item_idcd														")
		.query("      ,a.item_code														")
		.query("      ,a.item_name														")
		.query("      ,a.item_spec														")
		.query("      ,a.unit_idcd														")
		.query("      ,c.unit_name														")
		.query("      ,a.piece_qty													")
		.query("      ,b.org_ord_qty   as sale_base_qty								") // 요청잔여수량
		.query("      ,a.org_ord_qty   as org_ord_qty								") // 출고잔여수량
		.query("      ,a.qty														")
		.query("      ,a.pri														")
		.query("      ,a.sply_amt													")
		.query("      ,a.tax_amt													")
		.query("      ,a.inv_amt													")
		.query("      ,a.user_memo													")
		.query("  from move_ist_dtl a												")
		.query("       left outer join move_ost_dtl b  on b.inv_no = a.org_inv_no	")
		.query("                                      and b.line_seqn = a.org_inv_seq	")
		.query("       left outer join itm_unit c      on c.unit_idcd = a.unit_idcd		")
		.query(" where a.inv_no = :recv_inv_no ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0												")
		.query(" order by a.seq_top, a.line_seqn										")
		;

		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 *
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		// 이동 출고 번호
		String org_inv_no = arg.getParamText("org_inv_no");

		// 수정
		if (org_inv_no == null || "".equals(org_inv_no)) {

			data.param
            .query("select a.stor_id														")
            .query("      ,b.stor_nm														")
            .query("      ,a.row_clos														")
            .query("      ,a.inv_no															")
            .query("      ,a.inv_dt															")
            .query("      ,a.org_inv_no														")
            .query("      ,a.move_id														")
            .query("      ,(select stor_nm from stor where stor_id = a.move_id) as move_nm	")
            .query("      ,a.inv_dept_id													")
            .query("      ,a.inv_usr_id														")
            .query("      ,isnull(c.emp_nm, '') as inv_user_nm								")
            .query("      ,a.sts_cd															")
			.query("      ,a.tax_type														")
			.query("      ,a.tax_rt															")
			.query("      ,a.txfree_amt														")
			.query("      ,a.taxtn_amt														")
			.query("      ,a.sply_amt														")
			.query("      ,a.tax_amt														")
			.query("      ,a.inv_amt														")
			.query("      ,a.qty															")
			.query("      ,a.org_ord_qty													")
			.query("      ,a.user_memo														")
            .query("  from move_ist_mst a													")
            .query("       join stor b               on b.stor_id = a.stor_id				")
            .query("       left outer join usr_mst c on c.emp_id = a.inv_usr_id				")
            .query(" where a.inv_no = :inv_no   ", arg.fixParameter("inv_no"))
			.query("   and a.row_sts = 0													")
			;

			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {

				if ( Double.parseDouble(info.get(0).getParamText( "row_clos" )) == 1) {
					throw new ServiceException("이동 입고가 마감되어 수정할 수 없습니다.");
				}

				data.clear();

				data.param
				.query("select a.inv_no							")
				.query("      ,a.line_seqn						")
				.query("      ,a.seq_top						")
				.query("      ,a.seq_dsp						")
				.query("      ,a.org_inv_no						")
				.query("      ,a.org_inv_seq					")
				.query("      ,a.item_idcd							")
				.query("      ,a.item_code							")
				.query("      ,a.item_name							")
				.query("      ,a.item_spec							")
				.query("      ,a.unit_idcd							")
				.query("      ,c.unit_name							")
				.query("      ,a.piece_qty						")
				.query("      ,a.txfree_yn						")
				.query("      ,a.unt_pri						")
				.query("      ,a.itm_dsnt						")
				.query("      ,a.pri							")
				.query("      ,b.org_ord_qty  as sale_base_qty	") // 요청잔여수량
				.query("      ,a.org_ord_qty  as org_ord_qty	") // 출고잔여수량
				.query("      ,a.qty							")
				.query("      ,a.txfree_amt						")
				.query("      ,a.taxtn_amt						")
				.query("      ,a.sply_amt						")
				.query("      ,a.tax_amt						")
				.query("      ,a.inv_amt						")
				.query("      ,a.user_memo						")
				.query("  from move_ist_dtl a					")
				.query("       left outer join move_ost_dtl b  on b.inv_no = a.org_inv_no and b.line_seqn = a.org_inv_seq	")
				.query("       left outer join itm_unit c      on c.unit_idcd = a.unit_idcd									")
				.query(" where a.inv_no = :inv_no ", arg.fixParameter("inv_no"))
				.query("   and a.row_sts = 0					")
				.query(" order by a.seq_top, a.line_seqn			")
				;

				info.get(0).put("product", data.selectForMap());
			}

			return info;
		}
		// 요청입고
		else {

			data.param
			.query("select a.stor_id    as move_id					")
			.query("      ,b.stor_nm    as move_nm					")
			.query("      ,to_char(sysdate, 'yyyymmdd') as inv_dt	")
			.query("      ,a.inv_no     as org_inv_no				")
			.query("      ,a.tax_type								")
			.query("      ,a.tax_rt									")
			.query(" from move_ost_mst a							")
			.query("      join stor b on b.stor_id = a.stor_id		")
			.query("where a.row_sts = 0								")
			.query("and   a.inv_no = :org_inv_no  ", arg.fixParameter("org_inv_no"))
			;
			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param
				.query("select a.inv_no      as org_inv_no					")
				.query("      ,a.line_seqn     as org_inv_seq					")
				.query("      ,a.line_seqn									")
				.query("      ,a.seq_top									")
				.query("      ,a.seq_dsp									")
				.query("      ,a.unit_idcd										")
				.query("      ,b.unit_name										")
				.query("      ,a.piece_qty									")
				.query("      ,a.item_idcd										")
				.query("      ,a.item_code										")
				.query("      ,a.item_name										")
				.query("      ,a.item_spec										")
				.query("      ,a.txfree_yn									")
				.query("      ,a.unt_pri									")
				.query("      ,a.itm_dsnt									")
				.query("      ,a.pri										")
				.query("      ,a.org_ord_qty  as sale_base_qty				") // 요청잔여수량
				.query("      ,isnull(a.qty - a.deli_qty, 0) as org_ord_qty	") // 출고잔여수량
				.query("      ,isnull(a.qty - a.deli_qty, 0) as qty			")
				.query("  from move_ost_dtl a								")
				.query("       left outer join itm_unit b					")
				.query("          on b.unit_idcd = a.unit_idcd					")
				.query(" where a.inv_no = :org_inv_no  ", arg.fixParameter("org_inv_no"))
				.query("   and a.row_sts = 0								")
				.query(" order by a.seq_top, a.line_seqn						")
				;

				info.get(0).put("product", data.selectForMap());
			}

			return info;
		}
	}


	/*
	 * 마감 / 해지 건을 수정.
	 */

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("move_ist_mst")
				.where("where inv_no     = :inv_no     " )
				.where("and   row_clos <> :row_clos  " )
				//
				.unique("inv_no"        , row.fixParamText("inv_no"  ))
				//
				.update("row_clos"      , row.getParameter("row_clos"))
				.update("upt_ip"   	    , arg.remoteAddress				  )
		        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
		}
		data.execute();
		return null;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			String invdt_new = row.fixParamText("inv_dt");
			String invdt_old = row.fixParamText("_inv_dt");

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				throw new ServiceException("삭제불가");

			} else {

				// 이동입고정보 등록/수정
	        	data.param
	    			.table("move_ist_mst")
	    			.where("where inv_no = :inv_no ")
		        	//
					.insert("hq_id"			, row.getParameter("hq_id"    ))
					.insert("stor_grp"		, row.getParameter("stor_grp"    ))
					.insert("stor_id"		, row.getParameter("stor_id"    ))
					.unique("inv_no"		, row.fixParameter("inv_no"      ))
					.update("inv_dt"		, row.getParameter("inv_dt"      ))
					.insert("inv_tm"		, row.getParameter("inv_tm"      ))
					.update("inv_dept_id"	, row.getParameter("inv_dept_id" ))
					.update("inv_usr_id"	, row.getParameter("inv_usr_id" ))
					.insert("sts_cd"		, row.getParameter("sts_cd"      )) // 0500
					.insert("org_inv_no"	, row.getParameter("org_inv_no" ))
					.insert("move_id"		, row.getParameter("move_id"))
					.update("move_nm"		, row.getParameter("move_nm"))
					.update("tax_type"		, row.getParameter("tax_type"    ))
					.update("tax_rt"		, row.getParameter("tax_rt"    ))
					.update("txfree_amt"	, row.getParameter("txfree_amt"    ))
					.update("taxtn_amt"		, row.getParameter("taxtn_amt"    ))
					.update("sply_amt"		, row.getParameter("sply_amt"    ))
					.update("tax_amt"		, row.getParameter("tax_amt"         ))
					.update("inv_amt"		, row.getParameter("inv_amt"      ))
					.update("qty"			, row.getParameter("qty"         ))
					.insert("org_ord_qty"	, row.getParameter("org_ord_qty"   ))
					.update("user_memo"		, row.getParameter("user_memo"   ))
					.update("upt_ip"		, arg.remoteAddress				)
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crt_id"		, row.getParameter("crt_id"   ))
//					.insert("crt_ip"		, arg.remoteAddress				)
//					.insert("crt_dttm"		, new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
					.action = rowaction;
	        	data.attach();

	        	if(row.getParameter("product", SqlResultMap.class) != null) {
	        		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
	        	}
			}

			// 이동출고정보 입고수량 변경
			data.param
			.query("update move_ost_mst a															")
			.query("   set (a.deli_qty, a.rest_qty, a.sts_cd) =										")
			.query("         (select isnull(sum(b.qty), 0)											")
			.query("               , a.qty-isnull(sum(b.qty), 0)									")
			.query("               , case when isnull(sum(b.qty), 0) = 0      then '0300' -- 입고대기	")
			.query("                      when a.qty != isnull(sum(b.qty), 0) then '0400' -- 부분입고	")
			.query("                      else                                     '0500' -- 입고완료	")
			.query("                      end														")
			.query("          from   move_ist_mst b													")
			.query("          where  b.org_inv_no = a.inv_no										")
			.query("          and    b.row_sts = 0													")
			.query("         )																		")
			.query(" where a.inv_no = :org_inv_no  ", row.fixParameter("org_inv_no"))
			.action = Action.direct;
			data.attach();

			// 이동출고상세 입고수량 변경
			data.param
			.query("update move_ost_dtl a							")
			.query("   set (a.deli_qty, a.rest_qty) =				")
			.query("        (select isnull(sum(b.qty), 0)			")
			.query("              , a.qty-isnull(sum(b.qty), 0)		")
			.query("         from   move_ist_dtl b					")
			.query("         where  b.org_inv_no  = a.inv_no		")
			.query("         and    b.org_inv_seq = a.line_seqn		")
			.query("         and    b.row_sts = 0					")
			.query("        )										")
			.query(" where a.inv_no = :org_inv_no ", row.fixParameter("org_inv_no"))
			.action = Action.direct;
			data.attach();

			if (!invdt_old.equals(invdt_new)) {  /* 이동입고 일자가 변경된 경우 */
				data.param
				.query("  update stock_book a						")
				.query("     set a.inv_dt = :invdt_new ", invdt_new	)
				.query("   where a.inv_no = :inv_no    ",  row.fixParameter("inv_no"))
				;data.attach(Action.direct);
			}
		}

		data.execute();
		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 *
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				// 이동입고상세 삭제
	        	data.param
        			.table("move_ist_dtl")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"		, row.fixParameter("inv_no"))
        			.unique("line_seqn"		, row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

				// 재고(입출고 대장) 삭제
	        	data.param
        			.table("stock_book")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"		, row.fixParameter("inv_no"))
        			.unique("line_seqn"		, row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

			} else {

				// 이동입고상세 등록/수정
	        	data.param
	    			.table("move_ist_dtl")
        			.where("where inv_no = :inv_no ")
        			.where("  and line_seqn = :line_seqn    ")
		        	//
					.unique("hq_id"			, row.getParameter("hq_id"   ))
					.unique("stor_grp"		, row.getParameter("stor_grp"   ))
					.unique("stor_id"		, row.getParameter("stor_id"   ))
					.unique("inv_no"		, row.getParameter("inv_no"     ))
					.unique("line_seqn"		, row.getParameter("line_seqn"    ))
					.insert("seq_top"		, row.getParameter("seq_top"    ))
					.update("seq_dsp"		, row.getParameter("seq_dsp"    ))
					.insert("org_inv_no"	, row.getParameter("org_inv_no"     ))
					.insert("org_inv_seq"	, row.getParameter("org_inv_seq"    ))
					.insert("unit_idcd"		, row.getParameter("unit_idcd"    ))
					.insert("piece_qty"		, row.getParameter("piece_qty"   ))
					.insert("item_idcd"		, row.getParameter("item_idcd"    ))
					.insert("item_code"		, row.getParameter("item_code"    ))
					.update("item_name"		, row.getParameter("item_name"    ))
					.update("item_spec"		, row.getParameter("item_spec"    ))
					.update("txfree_yn"		, row.getParameter("txfree_yn"   ))
					.update("unt_pri"		, row.getParameter("unt_pri" ))
					.update("itm_dsnt"		, row.getParameter("itm_dsnt" ))
					.update("pri"			, row.getParameter("pri"      ))
					.update("qty"			, row.getParameter("qty"        ))
					.insert("org_ord_qty"	, row.getParameter("org_ord_qty"   ))
					.update("txfree_amt"	, row.getParameter("txfree_amt"   ))
					.update("taxtn_amt"		, row.getParameter("taxtn_amt"   ))
					.update("sply_amt"		, row.getParameter("sply_amt"   ))
					.update("tax_amt"		, row.getParameter("tax_amt"        ))
					.update("inv_amt"		, row.getParameter("inv_amt"     ))
					.update("user_memo"		, row.getParameter("user_memo"  ))
					.update("row_sts"		, row.getParameter("row_sts"  ))
					.update("upt_ip"		, arg.remoteAddress			  )
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();

	        	String piece_qty = (String) row.getParameter("piece_qty");
	        	piece_qty = "".equals(piece_qty)? "0" : piece_qty;
	        	String qty = (String) row.getParameter("qty");
	        	qty = "".equals(qty)? "0" : qty;

				// 재고(입출고 대장) 등록/수정
	        	data.param
	    			.table("stock_book")
        			.where("where inv_no = :inv_no ")
        			.where("  and line_seqn = :line_seqn    ")
		        	//
					.insert("hq_id"			, row.getParameter("hq_id"))
					.update("stor_grp"		, row.getParameter("stor_grp"))
					.update("stor_id"		, row.getParameter("stor_id"))
					.unique("inv_no"		, row.getParameter("inv_no"))
					.unique("line_seqn"		, row.getParameter("line_seqn"))
					.update("org_inv_no"	, row.getParameter("org_inv_no"))
					.update("org_inv_seq"	, row.getParameter("org_inv_seq"))
					.insert("inv_gb"		, new SqlParamText("'1'"))						// '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
					.insert("inv_wk"		, new SqlParamText("'2071304'"))				// '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
					.update("dept_id"		, mst.getParameter("inv_dept_id"))
					.update("emp_id"		, mst.getParameter("inv_usr_id"))
					.update("cust_id"		, mst.getParameter("move_id"))					// 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
					.update("unit_idcd"		, row.getParameter("unit_idcd"))
					.update("piece_qty"		, row.getParameter("piece_qty"))
					.update("item_idcd"		, row.getParameter("item_idcd"))
					.update("item_code"		, row.getParameter("item_code"))
					.update("stock"			, new SqlParamText(String.valueOf(Integer.parseInt(qty)))) // 이동입고는 플러스
					.update("qty"			, row.getParameter("qty"))
					.update("pri"			, row.getParameter("pri"))
					.update("inv_amt"		, row.getParameter("inv_amt"))
					.update("po_pri"		, row.getParameter("pri"))						// 매장간 거래는 매입단가 = 판매단가
					.update("po_amount"		, row.getParameter("inv_amt"))					// 매장간 거래는 매입금액 = 판매금액
					.update("user_memo"		, row.getParameter("user_memo"))
					.update("sys_memo"		, row.getParameter("sys_memo"))
					.update("row_sts"		, row.getParameter("row_sts"))
					.update("unt_pri"		, row.getParameter("unt_pri"))					// 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
					.update("cust_pri"		, row.getParameter("pri"))						// 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
					.update("txfree_yn"		, row.getParameter("txfree_yn"))
					.update("tax_type"		, mst.getParameter("tax_type"))
					.update("tax_rt"		, mst.getParameter("tax_rt"))
					.update("sply_amt"		, row.getParameter("sply_amt"))
					.update("tax_amt"		, row.getParameter("tax_amt"))
					.action = rowaction;
	        	data.attach();
			}
		}
	}

	/**
	 * 삭제
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage temp = arg.newStorage("POS");
		temp.param
		 	.query("select sts_cd, qty, row_clos from move_ist_mst where inv_no = :inv_no", arg.fixParameter("inv_no"))
		;
		SqlResultRow del = temp.selectForRow();

		String work_stscd   = arg.getParamText("sts_cd").toString();		// 로컬 상태
		String server_stscd = del.getParamText("sts_cd").toString();		// 서버 상태

		double work_qty   = Double.parseDouble(arg.getParamText("qty"));	// 로컬 수량
		double server_qty = Double.parseDouble(del.getParamText("qty"));	// 서버 수량

		DataMessage data = arg.newStorage("POS");

		if (del != null ) {
			// 로컬과 서버의 상태가 동일할 경우
			if (work_stscd.equals(server_stscd)) {
				if (work_qty != server_qty) {
					throw new ServiceException("정상적인 삭제작업이 아닙니다. 수량 불일치");
				}
			} else {
				throw new ServiceException("정상적인 삭제작업이 아닙니다. 상태 불일치");
			}
		}

		if( Double.parseDouble( del.getParamText( "row_clos" )) == 1 ) {
			throw new ServiceException("이동 입고가 마감되어 삭제할 수 없습니다.");
		}

		// 상태 재확인
		if ("0500".equals(work_stscd)) {
        	data.param
	    		.table("move_ist_dtl")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"   , arg.fixParameter("inv_no"))
	    		.update("row_sts", 2)
				.update("upt_ip", arg.remoteAddress)
		        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

	    	data.param
				.table("move_ist_mst")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"   , arg.fixParameter("inv_no"))
	    		.update("row_sts", 2)
				.update("upt_ip", arg.remoteAddress)
		        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

			// 재고(입출고 대장) 삭제
	        data.param
        		.table("stock_book")
        		.where("where inv_no = :inv_no ")
        		//
        		.unique("inv_no"   , arg.fixParameter("inv_no"))
	    	;data.attach(Action.delete);


			// 이동출고정보 입고수량 변경
			data.param
			.query("update move_ost_mst a															")
			.query("   set (a.deli_qty, a.rest_qty, a.sts_cd) =										")
			.query("       (select isnull(sum(b.qty), 0)											")
			.query("             , a.qty-isnull(sum(b.qty), 0)										")
			.query("             , case when isnull(sum(b.qty), 0) = 0      then  '0300' -- 입고대기	")
			.query("                    when a.qty != isnull(sum(b.qty), 0) then  '0400' -- 부분입고	")
			.query("                    else                                      '0500' -- 입고완료	")
			.query("                    end															")
			.query("       from   move_ist_mst b													")
			.query("       where  b.org_inv_no = a.inv_no											")
			.query("       and    b.row_sts = 0														")
			.query("      )																			")
			.query(" where a.inv_no = :org_inv_no  ", arg.fixParameter("org_inv_no"))
			.action = Action.direct;
			data.attach();

			// 이동출고상세 입고수량 변경
			data.param
			.query("update move_ost_dtl a						")
			.query("   set (a.deli_qty, a.rest_qty) =			")
			.query("       (select isnull(sum(b.qty), 0)		")
			.query("             , a.qty-isnull(sum(b.qty), 0)	")
			.query("        from   move_ist_dtl b				")
			.query("        where  b.org_inv_no  = a.inv_no		")
			.query("        and    b.org_inv_seq = a.line_seqn	")
			.query("        and    b.row_sts = 0				")
			.query("       )									")
			.query(" where a.inv_no = :org_inv_no ", arg.fixParameter("org_inv_no"))
			.action = Action.direct;
			data.attach();

		}
		data.execute();
		return null;
	}

	/**
	 * dialog 조회
	 *
	 */
	public SqlResultMap getDialog(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.inv_amt) as inv_amt ")
		;
		data.param // 조회
			.query("select a.stor_id														")
			.query("      ,isnull(b.stor_nm, '') as stor_nm									")
			.query("      ,a.inv_no															")
			.query("      ,a.inv_dt															")
			.query("      ,isnull(c.emp_nm, '')  as emp_nm									")
			.query("      ,(select stor_nm from stor where stor_id = a.move_id) as move_nm	")
			.query("      ,a.user_memo														")
			.query("      ,a.inv_amt														")
			.query("      ,a.sts_cd															")
		;
		data.param // 조건
			.where("  from move_ost_mst a													")
			.where("       left outer join stor b     on b.stor_id = a.stor_id				")
			.where("       left outer join usr_mst c  on c.emp_id = a.inv_usr_id			")
			.where(" where a.sts_cd in ('0300', '0400')										") // 0300:입고대기, 0400:부분입고
			.where("   and a.row_sts = 0 													")
			.where("   and a.move_id = :stor_id      ", arg.getParameter("stor_id"))
			.where("   and a.inv_dt between :fr_dt   ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt   ", arg.fixParameter("to_dt"))
			.where("   and b.stor_nm like %:stor_nm% ", arg.getParameter("stor_nm"))
			.where(" order by a.inv_no desc													")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/**
	 * 상품검색
	 *
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
		.query("select  a.stor_grp   , a.stor_id														")
		.query("     ,  a.mst_itm_id , b.mst_itm_cd          , b.piece_qty								")
		.query("     ,  b.unit_idcd     , (select unit_name from itm_unit where unit_idcd = b.unit_idcd) as unit_name	")
		.query("     ,  b.item_idcd     , b.item_code  , b.item_name  , b.itm_ds  , b.item_spec						")
		.query("     ,  b.cst_pri    , s.stock															")
		.query("     ,  case when a.sale_pri = 0 then b.sale_pri else a.sale_pri end  as sale_pri		")
		.query("	 ,  ( select clss_desct from item_class where clss_id = b.clss_id ) as clss_nm		") //b.clss_id     ,
		.query("	 ,  a.pack_zone_id																	")
		.query("	 ,  ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm	")
		.query("     ,  b.vend_id as pack_vend_id														")
		.query("     ,  ( select vend_nm from vend_mst where vend_id = b.vend_id )    as  pack_vend_nm	")
		.query("	 ,  b.sales_id , (select bas_nm from base_mst where bas_id = b.sales_id) as sales_nm")
		.query("	 ,  b.brand_id , (select bas_nm from base_mst where bas_id = b.brand_id) as brand_nm")
		.query("	 ,  b.maker_id , (select bas_nm from base_mst where bas_id = b.maker_id) as mfg_nm	")
		.query("     ,  case when a.po_pri = 0 then b.po_pri else a.po_pri end  as po_pri				")
		.query("     ,  a.po_pri_type, a.po_pri_rt  , b.txfree_yn										")
		.query("from    itm_stor      a																	")
		.query("        join itm_mst  b on b.item_idcd = a.item_idcd											")
		.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd	")
		.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
		.query("and     a.row_sts  = 0																	")
		;

		return data.selectForMap();
	}

	/**
	 * 출력
	 *
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 															")
			.query("       a.inv_no   		as inv_no								") /* 매출번호 (바코드) */
			.query("     , a.inv_dt   		as inv_dt								") /* 매출일자 */
			.query("     , c.biz_no      	as send_biz_no 							") /* 공급자 등록번호 */
			.query("     , c.biz_tel_no  	as send_biz_tel_no 						") /* 공급자 전화번호 */
			.query("     , c.biz_fax_no  	as send_biz_fax_no 						") /* 공급자 팩스번호 */
			.query("     , c.stor_nm      	as send_biz_nm 							") /* 공급자 상호 */
			.query("     , c.biz_owner   	as send_biz_owner 						") /* 공급자 성명 */
			.query("     , c.addr_1 		as send_biz_addr_1 						") /* 공급자 주소 */
			.query("     , c.addr_2   		as send_biz_addr_2 						") /* 공급자 주소 상세주소 */
			.query("     , c.biz_kind    	as send_biz_cond 						") /* 공급자 업태 */
			.query("     , c.biz_type   	as send_biz_types 						") /* 공급자 종목 */

			.query("     , b.biz_no  	 	as recv_biz_no      					") /* 공급받는자 등록번호 */
			.query("     , b.biz_tel_no 	as recv_biz_tel_no 						") /* 공급받는자 전화번호 */
			.query("     , b.biz_fax_no 	as recv_biz_fax_no 						") /* 공급받는자 팩스번호 */
			.query("     , b.stor_nm     	as recv_biz_nm 							") /* 공급받는자 상호 */
			.query("     , b.biz_owner  	as recv_biz_owner 						") /* 공급받는자 성명 */
			.query("     , b.addr_1 		as recv_biz_addr_1 						") /* 공급받는자 주소 */
			.query("     , b.addr_2  	 	as recv_biz_addr_2 						") /* 공급받는자 주소 상세주소 */
			.query("     , b.biz_kind   	as recv_biz_cond  						") /* 공급받는자 업태 */
			.query("     , b.biz_type  		as recv_biz_types 						") /* 공급받는자 종목 */

			.query("     , a.qty 			as qty 									") /* 수량 */
			.query("     , a.sply_amt+a.txfree_amt as sply_amt		 				") /* 공급가 */
			.query("     , a.tax_amt  		as tax_amt 								") /* 세액 */
			.query("     , a.inv_amt 		as inv_amt 								") /* 계 */
			.query("     , a.user_memo 		as user_memo  							") /* 요청메모(kdarkdev수정) */
			.query("     , (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm	") /* 발행일자 */
			.query("     , b.stamp_url      as stamp_url							") /* 직인 이미지 URL */
			.query("     , d.emp_nm         as inv_user_nm 							") /* 작업자명 */

			.query(" from move_ist_mst a											")
			.query("	  join stor b on a.stor_id = b.stor_id						")
			.query("	  left outer join stor c on a.move_id = c.stor_id			")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id		")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"))
			.query("  and a.row_sts = 0 											")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query("       a.seq_dsp     as seq_dsp 										") /* 항번 */
				.query("     , b.itm_shrt_cd as itm_shrt_cd 									") /* 단축코드 */
				.query("     , a.item_code      as item_code 											") /* 코드 */
				.query("     , b.brcd_1      as brcd 											") /* 바코드 */
				.query("     , (a.item_name + '/' + a.item_spec) as item_name 							") /* 품목 / 규격 */
				.query("     , (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("     , ('(' + a.piece_qty + ')') as piece_qty   						") /* 포장량 */
				.query("     , a.qty        as qty 												") /* 수량 */
				.query("     , a.pri        as pri 												") /* 단가 */
				.query("     , a.sply_amt+a.txfree_amt as sply_amt 								") /* 금액 */
				.query("     , a.tax_amt    as tax_amt 											") /* 세액 */
				.query("     , a.inv_amt    as inv_amt 											") /* 합계 */
				.query("  from  move_ist_dtl a 													")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 				")
				.query(" where  a.inv_no = :inv_no " , arg.fixParameter("inv_no"))
				.query("   and  a.row_sts = 0													")
				.query("order by line_seqn		 												")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

	/**
	 * 입고 대기 현황 master
	 *
	 */
	public SqlResultMap getPlan(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize												")
			.total("     , sum(b.org_ord_qty)  as org_ord_qty								")
			.total("     , sum(b.qty)          as qty										")
			.total("     , sum(case when b.org_ord_qty-b.qty>0 then b.org_ord_qty-b.qty		")
			.total("                else 0 end) as rest_sale_qty							")
			.total("     , sum(b.deli_qty)     as deli_qty									")
			.total("     , sum(b.rest_qty)     as rest_qty									")
			.total("     , sum(b.inv_amt)      as inv_amt									")
		;
		data.param // 조회
			.query("select b.item_code															")
			.query("     , b.item_name															")
			.query("     , b.item_spec															")
			.query("     , c.unit_name															")
			.query("     , b.piece_qty														")
			.query("     , b.org_ord_qty													")
			.query("     , b.qty															")
			.query("     , case when b.org_ord_qty-b.qty>0 then b.org_ord_qty-b.qty			")
			.query("            else 0 end as rest_sale_qty									")
			.query("     , b.deli_qty														")
			.query("     , b.rest_qty														")
			.query("     , (select stor_nm from stor where stor_id = a.stor_id) as stor_nm	")
			.query("     , a.inv_dt															")
			.query("     , b.inv_no															")
			.query("     , b.seq_dsp														")
			.query("     , b.pri															")
			.query("     , b.inv_amt														")
		;
		data.param // 조건
			.where("  from move_ost_mst a													")
			.where("       join move_ost_dtl b        on b.inv_no = a.inv_no				")
			.where("       left outer join itm_unit c on c.unit_idcd = b.unit_idcd				")
			.where(" where a.row_clos = 0													")
			.where("   and a.row_sts = 0													")
			.where("   and a.sts_cd in ('0300', '0400')										") // 0300:입고대기, 0400:부분입고
			.where("   and a.move_id = :stor_id ", arg.fixParameter("stor_id"))
			.where(" order by a.inv_no desc, b.seq_top, b.line_seqn							")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}
}
