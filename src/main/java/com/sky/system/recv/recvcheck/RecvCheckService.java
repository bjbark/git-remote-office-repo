package com.sky.system.recv.recvcheck;

import java.text.SimpleDateFormat;
import java.util.Date;

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
public class RecvCheckService extends DefaultServiceHandler {

	/**
	 * 발주 내역 검색
	 */
	public SqlResultMap getRefers(HttpRequestArgument arg, int page , int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
        data.param // 조회
	        .query("select a.inv_no												")
	        .query("      ,a.inv_dt												")
	        .query("      ,a.vend_nm											")
	        .query("      ,a.qty												")
	        .query("      ,a.rest_qty											")
	        .query("      ,a.inv_amt											")
	    ;
	    data.param // 조건
	        .where("  from po_mst a												")
	        .where(" where a.row_clos = 0										") // 0:, 1:마감
			.where("   and a.row_sts = 0										")
	        .where("   and a.inv_gb in ('1', '2')								") // 1:일반발주, 2:통합발주, 3:직납발주
	        .where("   and a.sts_cd in ('0200', '0400')							") // 0010:승인대기, 0200:발주승인, 0400:일부입고, 0500:입고완료
	        .where("   and a.rest_qty <> 0										")
	        .where("   and a.stor_id = :stor_id			", arg.fixParameter("stor_id"))
	        .where("   and a.inv_dt between :fr_dt		", arg.fixParameter("fr_dt"))
	        .where("                    and :to_dt		", arg.fixParameter("to_dt"))
	        .where("   and a.vend_nm like %:vend_nm%	", arg.getParameter("vend_nm"))
	        .where(" order by a.inv_no desc                               ")
	    ;

		if (page == 0 && rows == 0) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/**
	 * 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query(" select a.hq_id      , a.stor_grp    , a.wrhs_id    , a.stor_id							")
			.query("      , a.pos_no     , a.inv_no as org_inv_no       , a.inv_dt as ori_dt				")
			.query("      , a.inv_tm     as ori_tm       , a.inv_gb											")
//			.query("      , a.inv_work_gb, a.inv_dept_id, a.inv_usr_id, a.retn_yn                 ")
			.query("      , a.inv_work_gb, a.retn_yn														")
			.query("      , a.pack_no    , a.pack_inv    , a.vend_id    , a.vend_nm    , a.vend_gb			")
			.query("      , a.req_msg    , a.tax_type    , a.tax_rt     , a.qty								")

			.query("     , a.biz_no      , a.biz_nm      , a.biz_kind   , a.biz_type						")
	      	.query("     , a.biz_owner   , a.biz_email   , a.biz_tel_no , a.biz_fax_no						")
	      	.query("     , a.biz_zip_cd  , a.biz_state   , a.biz_city   , a.biz_dong   , a.biz_addr_1		")
	      	.query("     , a.biz_addr_2																		")

			.query("      , a.reve_nm    , a.reve_state  , a.reve_city  , a.reve_dong  , a.reve_zip_cd		")
			.query("      , a.reve_addr_1, a.reve_addr_2 , a.recv_addr3 , a.reve_email , a.reve_tel_no		")
			.query("      , a.reve_fax_no, a.reve_hp_no  , a.hdli_id    , a.hdli_no    , a.user_memo			")
			.query("      , a.sys_memo   , a.recv_id														")
			.query(" from   po_mst a																		")
			.query(" where  a.inv_no   = :org_inv_no " 	, arg.fixParameter("org_inv_no"   ))
			.query("   and  a.row_clos = 0																	") // 0:, 1:마감
			.query("   and  a.row_sts  = 0																	")
	        .query("   and  a.inv_gb in ('1', '2')															")
	        .query("   and a.sts_cd in ('0200', '0400')														")
			.query("   and  a.rest_qty <> 0																	")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query(" select a.hq_id      , a.stor_grp    , a.stor_id  , a.wrhs_id  , a.inv_no as org_inv_no	")
				.query("      , a.line_seqn    , a.line_seqn as org_inv_seq   , a.seq_top  , a.seq_dsp				")
				.query("      , a.retn_yn    , a.pack_no														")
//				.query("      , a.pack_inv   , a.pack_seq    , a.safe_dt, a.mst_itm_id, a.mst_itm_cd			")
				.query("      , a.pack_inv   , a.pack_seq    , a.safe_dt										")
				.query("      , a.unit_idcd     , a.piece_qty														")
				.query("      , (select unit_name from itm_unit p where p.unit_idcd = a.unit_idcd ) as unit_name			")
				.query("      , a.item_idcd     , a.item_code      , a.item_name   , a.item_spec   , a.txfree_yn			")
				.query("      , b.brcd_1 as brcd , b.itm_shrt_cd as itm_shrt_cd									")
				.query("      , a.qty-a.deli_qty as rest_qty , a.qty-a.deli_qty as org_ord_qty, 0 as qty		")
//				.query("      , a.unt_pri    , a.itm_dsnt, a.pri        										")
				.query("      , a.unt_pri    , a.pri															")
				.query("      , a.txfree_amt , a.taxtn_amt   , 0 as tax_amt										")
				.query("      , ( (a.qty-a.deli_qty) * a.pri) as inv_amt										")
				.query("      , a.user_memo																		")
				.query(" from   po_item a																		")
				.query("        join itm_mst b on b.item_idcd = a.item_idcd											")
				.query(" where  a.inv_no  =  :org_inv_no " , arg.fixParameter("org_inv_no"  ))
				.query("   and  a.rest_qty <> 0																	")
				.query("   and  a.row_sts = 0																	")
				.query(" order by  a.line_seqn, a.item_code															")
			;
			info.get(0).put("product", data.selectForMap() );
		}
		return info ;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			double work_qty = Double.parseDouble(String.valueOf(row.getParameter("qty"))) ;
			if (work_qty != 0 ) {
				// 입고정보 등록/수정
		        data.param
		        	.table("ist_mst")
		        	.where("where inv_no = :inv_no ")
		        	//
		        	.insert("hq_id"           , row.getParameter("hq_id"   ))
		        	.insert("stor_grp"        , row.getParameter("stor_grp"   ))
		        	.insert("stor_id"         , row.getParameter("stor_id"   ))
		        	.insert("pos_no"          , row.getParameter("pos_no"     ))
		        	.unique("inv_no"          , row.fixParameter("inv_no"     ))
		        	.update("inv_dt"          , row.getParameter("inv_dt"     ))
		        	.update("inv_tm"          , row.getParameter("inv_tm"     ))
		        	.insert("inv_work_gb"     , row.getParameter("inv_work_gb"))
		        	.update("inv_dept_id"     , row.getParameter("inv_dept_id"))
		        	.update("inv_usr_id"      , row.getParameter("inv_usr_id"))
		        	.insert("sts_cd"          , row.getParameter("sts_cd"     )) // 0500
		        	.update("retn_yn"         , row.getParameter("retn_yn"     ))
		        	.update("org_inv_no"      , row.getParameter("org_inv_no"     ))
		        	.update("get_no"          , row.getParameter("get_no"     ))
		        	.update("get_dt"          , row.getParameter("get_dt"     ))
		        	.update("tax_dt"          , row.getParameter("tax_dt"     ))
		        	.update("pay_dt"          , row.getParameter("pay_dt"     ))
		        	.insert("vend_id"         , row.getParameter("vend_id"    ))
		        	.insert("vend_nm"         , row.getParameter("vend_nm"    ))
		        	.insert("vend_gb"         , row.getParameter("vend_gb"    ))
		        	.update("tax_type"        , row.getParameter("tax_type"   ))
		        	.update("tax_rt"          , row.getParameter("tax_rt"   ))
		        	.update("txfree_amt"      , row.getParameter("txfree_amt"   ))
		        	.update("taxtn_amt"       , row.getParameter("taxtn_amt"   ))
		        	.update("sply_amt"        , row.getParameter("sply_amt"   ))
		        	.update("tax_amt"         , row.getParameter("tax_amt"        ))
		        	.update("inv_amt"         , row.getParameter("inv_amt"     ))
		        	.update("colt_schd_amt"   , row.getParameter("inv_amt"     )) // 금액(inv_amt) + 배송비
		        	.update("qty"             , row.getParameter("qty"        ))
		        	.insert("org_ord_qty"     , row.getParameter("org_ord_qty"   ))

		        	.update("user_memo"        , row.getParameter("user_memo"  ))
		        	.update("upt_id"          , row.getParameter("upt_id"  ))
		        	.update("upt_ip"          , new SqlParamText("'" + arg.remoteAddress + "'"))
		        	.insert("crt_id"          , row.getParameter("crt_id"  ))
		        	.insert("crt_ip"          , new SqlParamText("'" + arg.remoteAddress + "'"))
			        .update("upt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					.update("inv_ship_gb" , row.getParameter("inv_ship_gb"))
		        	.action = Action.insert ;
		        data.attach();

		       	if(row.getParameter("product", SqlResultMap.class) != null) {
		       		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
		       	}

	        	// 주문의 출고수량 변경
				data.param
					.query("update po_item a																")
					.query("   set (a.deli_qty, a.rest_qty) = (												")
					.query("          select isnull(sum(b.qty),0) , a.qty-isnull(sum(b.qty),0)				")
					.query("          from   recv_item b													")
					.query("          where  b.org_inv_no  = a.inv_no										")
					.query("          and    b.org_inv_seq = a.line_seqn										")
					.query("          and    b.row_sts = 0													")
					.query("    )																			")
					.query(" where a.inv_no  = :org_inv_no    ", row.fixParameter("org_inv_no"))
					.action = Action.direct;
				data.attach();

		       	// 발주 변경
				data.param
					.query(" update po_mst a																")
					.query(" set (a.deli_qty, a.rest_qty, a.sts_cd) = (										")
					.query("	  select sum(abs(b.deli_qty)), sum(abs(b.rest_qty))							")
					.query("	       , case when sum(abs(b.deli_qty)) - sum(abs(b.qty)) >= 0 then '0500'	") // 매송완료
//					.query("	       , case when sum(abs(b.rest_qty)) >= 0   then '0500'					") // 매송완료
					.query("                  when a.qty =sum(abs(b.rest_qty)) then '0200'					") // 배송대기
					.query("	         else '0400' end													") // 부분배송
					.query("	  from  po_item    b														")
					.query("	  where b.inv_no  = a.inv_no												")
					.query("      and   b.row_sts = 0														")
					.query("	)																			")
					.query(" where a.inv_no  = :inv_no ", row.fixParameter("org_inv_no"))
					.action = Action.direct;
				data.attach();

			}
		}
		data.execute();
		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			double work_qty = Double.parseDouble(row.getParamText("qty")) ;
//			double piece_qty = Double.parseDouble(row.getParamText("piece_qty")) ;

			if (work_qty != 0 ) {   /* 피킹번호가 일치할 경우  */
				// 입고상세 등록/수정
	        	data.param
	    			.table("recv_item")
        			.where("where inv_no  = :inv_no  ")
        			.where("  and line_seqn = :line_seqn ")
		        	//
					.unique("hq_id"   		, row.getParameter("hq_id"  ))
					.unique("stor_grp"   	, row.getParameter("stor_grp"  ))
					.unique("stor_id"   	, row.getParameter("stor_id"  ))
					.unique("inv_no"     	, mst.getParameter("inv_no"    ))
					.unique("line_seqn"    	, row.getParameter("line_seqn"   ))
					.insert("seq_top"    	, row.getParameter("seq_top"   ))
					.update("seq_dsp"    	, row.getParameter("seq_dsp"   ))
					.update("retn_yn"     	, mst.getParameter("retn_yn"    ))
					.insert("org_inv_no"    , row.getParameter("org_inv_no"    ))
					.insert("org_inv_seq"   , row.getParameter("org_inv_seq"   ))
//					.insert("mst_itm_id"    , row.getParameter("mst_itm_id"   ))
//					.insert("mst_itm_cd"    , row.getParameter("mst_itm_cd"   ))
					.insert("unit_idcd"    	, row.getParameter("unit_idcd"   ))
					.insert("piece_qty"   	, row.getParameter("piece_qty"  ))
					.insert("item_idcd"    	, row.getParameter("item_idcd"   ))
					.insert("item_code"    	, row.getParameter("item_code"   ))
					.update("item_name"    	, row.getParameter("item_name"   ))
					.update("item_spec"    	, row.getParameter("item_spec"   ))
					.update("txfree_yn"   	, row.getParameter("txfree_yn"  ))
					.update("unt_pri" 		, row.getParameter("unt_pri"))
//					.update("itm_dsnt" 		, row.getParameter("itm_dsnt"))
					.update("pri"      		, row.getParameter("pri"     ))
					.update("qty"        	, row.getParameter("qty"       ))
					.insert("org_ord_qty"   , row.getParameter("org_ord_qty"  ))
//					.update("back_qty"   	, row.getParameter("back_qty"  ))
					.update("txfree_amt"   	, row.getParameter("txfree_amt"  ))
					.update("taxtn_amt"   	, row.getParameter("taxtn_amt"  ))
					.update("sply_amt"   	, row.getParameter("sply_amt"  ))
					.update("tax_amt"       , row.getParameter("tax_amt"       ))
					.update("inv_amt"     	, row.getParameter("inv_amt"    ))
					.update("user_memo"  	, row.getParameter("user_memo" ))
//					.update("sys_memo"  	, row.getParameter("sys_memo" ))
//					.update("row_ord"  		, row.getParameter("row_ord" ))
					.update("row_sts"  		, row.getParameter("row_sts" ))
					.update("upt_id"  		, row.getParameter("crt_id" ))
					.update("upt_ip"  		, arg.remoteAddress )
					.insert("crt_id"  		, row.getParameter("crt_id" ))
					.insert("crt_ip"  		, arg.remoteAddress )
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();

//	        	String piece_qty = (String) row.getParameter("piece_qty");
//	        	piece_qty = "".equals(piece_qty)? "0" : piece_qty;
//	        	String qty = (String) row.getParameter("qty");
//	        	qty = "".equals(qty)? "0" : qty;

				// 재고(입출고 대장) 등록/수정
	        	data.param
	    			.table("stock_book")
        			.where("where inv_no = :inv_no ")
        			.where("  and line_seqn = :line_seqn    ")
		        	//
					.insert("hq_id"			, row.getParameter("hq_id"   ))
					.update("stor_grp"		, row.getParameter("stor_grp"   ))
					.update("stor_id"		, row.getParameter("stor_id"   ))
					.unique("inv_no"		, mst.getParameter("inv_no"     ))
					.unique("line_seqn"		, row.getParameter("line_seqn"    ))
					.update("org_inv_no"	, row.getParameter("org_inv_no"     ))
					.update("org_inv_seq"	, row.getParameter("org_inv_seq"    ))
					.insert("inv_dt"		, row.getParameter("inv_dt"     ))
					.insert("inv_gb"		, new SqlParamText("'2'"        )) // '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
					.insert("inv_wk"		, new SqlParamText("'2071302'"  )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
					.update("dept_id"		, mst.getParameter("inv_dept_id"))
					.update("emp_id"		, mst.getParameter("inv_usr_id"))
					.update("cust_id"		, mst.getParameter("vend_id"    )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
//					.update("mmb_id"		, mst.getParameter("mmb_id"    )) // 매출인 경우만 맴버ID
//					.update("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
//					.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"    ))
					.update("unit_idcd"		, row.getParameter("unit_idcd"    ))
					.update("piece_qty"		, row.getParameter("piece_qty"   ))
					.update("item_idcd"		, row.getParameter("item_idcd"    ))
					.update("item_code"		, row.getParameter("item_code"    ))
					.update("stock"			, work_qty				          ) // 입고(매입)는 플러스
					.update("qty"			, row.getParameter("qty"        ))
					.update("pri"			, row.getParameter("pri"      ))
					.update("inv_amt"		, row.getParameter("inv_amt"     ))
					.update("po_pri"		, row.getParameter("pri"      )) // 매장간 거래는 매입단가 = 판매단가
					.update("po_amount"		, row.getParameter("inv_amt"     )) // 매장간 거래는 매입금액 = 판매금액
					.update("user_memo"		, row.getParameter("user_memo"  ))
					.update("sys_memo"		, row.getParameter("sys_memo"  ))
					.update("row_sts"		, row.getParameter("row_sts"  ))
					.update("unt_pri"		, row.getParameter("unt_pri" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
					.update("cust_pri"		, row.getParameter("pri"      )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
					.update("txfree_yn"		, row.getParameter("txfree_yn"   ))
					.update("tax_type"		, mst.getParameter("tax_type"   ))
					.update("tax_rt"		, mst.getParameter("tax_rt"   ))
					.update("sply_amt"		, row.getParameter("sply_amt"   ))
					.update("tax_amt"		, row.getParameter("tax_amt"        ))
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();
			}

			if ( !("".equals(row.getParamText("user_memo"))) && (row.getParamText("user_memo").length() != 0) && (work_qty == 0 ) ) { /* 상품별 메모가  있는 경우 */

				data.param
					.table("po_item")
					.where("where  inv_no  		= :inv_no   	" )
					.where("and    line_seqn  	= :line_seqn   	" )

					.unique("inv_no"		, row.fixParameter("org_inv_no"         ))
					.unique("line_seqn"		, row.fixParameter("line_seqn"        ))

					.update("user_memo" 		, row.getParameter("user_memo"		))

					.update("upt_id" 		, row.getParameter("upt_id"		))
					.update("upt_ip"   		, arg.remoteAddress                  )
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
			}

		}
	}
}
