package com.sky.system.recv.recvwork;

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
import com.sky.utils.NumberUtil;


@Service
public class RecvWorkService  extends DefaultServiceHandler {
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.inv_amt) as inv_amt ")
		;
		data.param // 조회
			.query("select a.inv_no														")
			.query("      ,a.inv_dt														")
			.query("      ,a.vend_id													")
			.query("      ,d.vend_cd													")
			.query("      ,a.vend_nm													")
			.query("      ,d.biz_tel_no as vend_biz_tel_no								")
			.query("      ,b.emp_nm     as inv_user_nm									")
			.query("      ,a.inv_amt													")
			.query("      ,a.payment													")
			.query("      ,a.npay_amt													")
			.query("      ,a.org_inv_no													")
			.query("      ,a.qty														")
			.query("      ,a.user_memo													")
			.query("      ,a.sts_cd														")
			.query("      ,a.row_clos													")
			.query("      ,a.get_dt														")
			.query("      ,d.biz_email   as vend_email									")
			.query("      ,d.biz_fax_no  as vend_fax_no									")
			.query("      ,a.inv_ship_gb												")
			.query("      ,e.dept_nm     as inv_dept_nm									")
		;
		data.param // 조건
			.where("  from ist_mst a													")
			.where("       left outer join usr_mst b   on b.emp_id  = a.inv_usr_id		")
			.where("       left outer join vend_mst d  on d.vend_id = a.vend_id			")
			.where("       left outer join dept_mst e  on e.dept_id = a.inv_dept_id		")
			.where(" where a.stor_id = :stor_id    ", arg.fixParameter("stor_id" ))
			.where("   and a.row_sts = 0												")
			.where("   and a.row_clos  = :row_clos ", arg.getParameter("row_clos" 	))  // 마감 여부
			.where("   and a.inv_dt between :fr_dt ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt ", arg.fixParameter("to_dt"))
			.where("   and a.vend_id = :vend_id    ", arg.getParameter("vend_id"  ))
			.where("   and a.inv_usr_id = :inv_usr_id    ", arg.getParameter("inv_usr_id"  ))
			.where(" order by a.inv_no desc												")
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
		.query("select a.seq_dsp													")
		.query("      ,a.item_code														")
		.query("      ,a.item_name														")
		.query("      ,a.item_spec														")
		.query("      ,r.bas_nm as brand_nm											")
		.query("      ,m.bas_nm as mfg_nm 											")
		.query("      ,b.unit_name														")
		.query("      ,a.piece_qty													")
		.query("      ,a.qty														")
		.query("      ,a.pri														")
		.query("      ,a.unt_pri													")
		.query("      ,a.sply_amt													")
		.query("      ,a.tax_amt													")
		.query("      ,a.txfree_amt													")
		.query("      ,a.inv_amt													")
		.query("      ,a.org_ord_qty												")
		.query("      ,a.user_memo													")
		.query("      ,i.brcd_1      as brcd										")
		.query("      ,i.itm_shrt_cd as itm_shrt_cd									")
		.query("  from recv_item a													")
		.query("       left outer join itm_unit b  on b.unit_idcd = a.unit_idcd			")
		.query("       left outer join itm_mst i   on i.item_idcd = a.item_idcd			")
		.query("       left outer join base_mst r  on r.bas_id = i.brand_id			")
		.query("       left outer join base_mst m  on m.bas_id = i.maker_id			")
		.query(" where a.inv_no = :inv_no  ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0												")
		.query(" order by a.seq_top, a.line_seqn										")
		;

		return data.selectForMap();
	}




	/**
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		// 발주 번호
		String org_inv_no = arg.getParamText("org_inv_no");
		// 수정
		if (org_inv_no == null || "".equals(org_inv_no)) {

			data.param
				.query("select a.inv_no															")
				.query("      ,a.org_inv_no														")
				.query("      ,a.inv_dt															")
				.query("      ,a.stor_id														")
				.query("      ,b.stor_nm														")
				.query("      ,a.vend_id														")
				.query("      ,a.vend_nm														")
				.query("      ,a.vend_gb														")
				.query("      ,a.inv_dept_id  , d.dept_nm  as inv_dept_nm						")
				.query("      ,a.inv_usr_id   , c.emp_nm   as inv_user_nm						")
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
				.query("      ,a.get_no															")
				.query("      ,a.get_dt															")
				.query("      ,a.tax_dt															")
				.query("      ,a.row_clos														")
				.query("  from ist_mst a														")
				.query("       left outer join stor b     on b.stor_id = a.stor_id				")
				.query("       left outer join usr_mst c  on c.emp_id  = a.inv_usr_id			")
				.query("       left outer join dept_mst d on d.dept_id = a.inv_dept_id			")
				.query(" where a.inv_no = :inv_no  ", arg.fixParameter("inv_no" ))
				.query(" and   a.row_sts = 0													")
			;

			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {

				if( 1 == Double.parseDouble(info.get(0).getParamText( "row_clos".trim() ))) {

					throw new ServiceException("마감 자료는 수정 불가능 합니다." );

				}

				data.clear();
					data.param
					.query("select a.inv_no														")
					.query("      ,a.line_seqn													")
					.query("      ,a.seq_top													")
					.query("      ,a.seq_dsp													")
					.query("      ,a.item_idcd														")
					.query("      ,a.item_code														")
					.query("      ,a.item_name														")
					.query("      ,a.item_spec														")
					.query("      ,a.unit_idcd														")
					.query("      ,b.unit_name														")
					.query("      ,a.piece_qty													")
					.query("      ,a.stk_itm_id													")
					.query("      ,a.txfree_yn													")
					.query("      ,a.unt_pri													")
					.query("      ,a.pri														")
					.query("      ,a.qty														")
					.query("      ,a.org_ord_qty												")
					.query("      ,a.txfree_amt													")
					.query("      ,a.taxtn_amt													")
					.query("      ,a.sply_amt													")
					.query("      ,a.tax_amt													")
					.query("      ,a.inv_amt													")
					.query("      ,a.user_memo													")
					.query("      ,c.brcd_1      as brcd										")
					.query("      ,c.itm_shrt_cd as itm_shrt_cd									")
					.query("  from recv_item a													")
					.query("       left outer join itm_unit b on b.unit_idcd = a.unit_idcd			")
					.query("       left outer join itm_mst c  on c.item_idcd = a.item_idcd			")
					.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
					.query(" order by a.seq_top, a.line_seqn										")
				;
				info.get(0).put("product", data.selectForMap());
			}

			return info;
		}
		// 발주입고
		else {

			data.param
				.query(" select a.hq_id  , a.stor_grp , a.wrhs_id  , a.stor_id											")
				.query("      , a.pos_no , a.inv_no as org_inv_no  , a.inv_dt as ori_dt									")
				.query("      , a.inv_tm as ori_tm    , a.inv_gb														")
				.query("      , a.inv_work_gb																			")
				.query("      , a.pack_no, a.pack_inv , a.vend_id  , a.vend_nm, a.vend_gb								")
				.query("      , a.req_msg, a.tax_type , a.tax_rt   , a.qty												")
				.query("      , a.user_memo																				")

				.query(" from   po_mst a																				")
				.query(" where  a.inv_no   = :org_inv_no " , arg.fixParameter("org_inv_no"   ))
				.query("   and  a.row_clos = 0																			")
				.query("   and  a.row_sts  = 0																			")
		        .query("   and  a.sts_cd in ('0200', '0400')															")
				.query("   and  a.rest_qty <> 0																			")
			;
			SqlResultMap info = data.selectForMap();
			if (info.size() == 1) {
				SqlResultRow inv = info.get(0);
				data.clear();
				data.param
					.query(" select a.hq_id    , a.stor_grp  , a.stor_id  , a.wrhs_id, a.inv_no as org_inv_no			")
					.query("      , a.line_seqn  , a.line_seqn as org_inv_seq , a.seq_top, a.seq_dsp, a.retn_yn, a.pack_no	")
					.query("      , a.pack_inv , a.pack_seq  , a.safe_dt												")
					.query("      , a.unit_idcd   , a.piece_qty 															")
					.query("      , (select unit_name from itm_unit p where p.unit_idcd = a.unit_idcd ) as unit_name				")
					.query("      , a.item_idcd   , a.item_code    , a.item_name, a.item_spec, a.stk_itm_id , a.txfree_yn			")
					.query("      , b.brcd_1 as brcd  , b.itm_shrt_cd as itm_shrt_cd									")
					.query("      , a.qty - a.deli_qty as rest_qty														")
					.query("      , a.qty - a.deli_qty as org_ord_qty													")
					.query("      , a.qty - a.deli_qty as qty															")
					.query("      , a.unt_pri   , a.pri																	")
					.query("      , a.txfree_amt, a.taxtn_amt, a.sply_amt, a.tax_amt, a.inv_amt							")
					.query("      , a.user_memo																			")
					.query(" from   po_item a																			")
					.query("        join itm_mst b on b.item_idcd = a.item_idcd												")
					.query(" where  a.inv_no   =  :org_inv_no " , arg.fixParameter("org_inv_no"    ))
					.query("   and  a.rest_qty <> 0																		")
					.query("   and  a.row_sts  = 0																		")
					.query(" order by  a.seq_top, a.line_seqn																")
				;

				SqlResultMap item = data.selectForMap();

				double work_qty = 0 ;
				double work_amt = 0 ;

				for (SqlResultRow row:item) {
					work_qty = Double.parseDouble(row.getParamText("rest_qty" )) ;
					work_amt = Double.parseDouble(row.getParamText("pri"    )) * work_qty  ;
					SqlResultRow tax_amt  = NumberUtil.calcSurtax(work_amt, Double.parseDouble(inv.getParamText("tax_rt")), "0".equals(inv.getParamText("tax_type") ));
					if("0".equals(row.getParameter("txfree_yn"))){
						tax_amt.setParameter("txfree_amt", 0);
						tax_amt.setParameter("taxtn_amt", work_amt);
					} else {
						tax_amt.setParameter("txfree_amt", work_amt);
						tax_amt.setParameter("taxtn_amt", 0);
					}
					row.setParameter("txfree_amt"	, tax_amt.getParameter("txfree_amt"  ));
					row.setParameter("taxtn_amt"	, tax_amt.getParameter("taxtn_amt"  ));
					row.setParameter("sply_amt"		, tax_amt.getParameter("sply_amt"  ));
					row.setParameter("tax_amt"		, tax_amt.getParameter("tax_amt"       ));
					row.setParameter("inv_amt"		, tax_amt.getParameter("inv_amt"    ));

				info.get(0).put("product", item);
			}
			return info;
		}
	}
		return null;
	}


	/**
	 * 삭제
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage read = arg.newStorage("POS");
		read.param
		 	.query("select a.inv_no , a.org_inv_no , a.sts_cd as inv_sts, a.payment , a.row_clos ")
		 	.query("from   ist_mst a            ")
		 	.query("where  a.inv_no = :inv_no   ", arg.fixParameter("inv_no"))
		;
		SqlResultRow del = read.selectForRow();
		if (del == null) {
			throw new ServiceException( "삭제 요청 번호가 올바르지 않습니다.", -99 );
		}

		double payment = Double.parseDouble(del.getParamText("payment")) ;
		if (payment != 0 ) {
			throw new ServiceException("지급 처리된 자료는 삭제 하실수 없습니다." );
		}

		if (!"0500".equals( del.getParamText("inv_sts"))) {
			throw new ServiceException("삭제 하실수 없는 상태 입니다." );
		}

		if ( 1 == Double.parseDouble( del.getParamText( "row_clos" ))) {
			throw new ServiceException("마감 자료는 삭제 불가능 합니다." );
		}

		DataMessage data = arg.newStorage("POS");

       	data.param
       		.table("recv_item")
       		.where("where inv_no = :inv_no ")
       		//
       		.unique("inv_no"		, arg.fixParameter("inv_no"))
       		.update("row_sts"		, 2)
       		.update("upt_usr_nm"	, arg.getParameter("upt_usr_nm"))
       		.update("upt_ip"		, arg.remoteAddress)
	        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
       	;data.attach(Action.update);

       	data.param
			.table("ist_mst")
			.where("where inv_no = :inv_no ")
			//
			.unique("inv_no"		, arg.fixParameter("inv_no"))
			.update("row_sts"		, 2)
			.update("upt_usr_nm"	, arg.getParameter("upt_usr_nm"))
			.update("upt_ip"		, arg.remoteAddress)
	        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    ;data.attach(Action.update);

	    // 재고(입출고 대장) 삭제
	    data.param
	    	.table("stock_book")
        	.where("where inv_no = :inv_no ")
        	//
        	.unique("inv_no"   , arg.fixParameter("inv_no"))
	    ;data.attach(Action.delete);


		// 발주 번호
		String org_inv_no = arg.getParamText("org_inv_no").trim() ;
		if (!"".equals(org_inv_no)) {
        	// 발주상세 정보 입고수량 변경
			data.param
				.query("update po_item a													")
				.query("   set(a.deli_qty, a.rest_qty) = (									")
				.query("       select isnull(sum(b.qty),0) , a.qty-isnull(sum(b.qty),0)		")
				.query("       from   recv_item b											")
				.query("       where  b.org_inv_no  = a.inv_no								")
				.query("       and    b.org_inv_seq = a.line_seqn								")
				.query("       and    b.row_sts = 0											")
				.query("    )																")
				.query(" where a.inv_no  = :org_inv_no    ", arg.fixParameter("org_inv_no"))
				.action = Action.direct;
			data.attach();

	       	// 발주 정보 입고수량 변경
			data.param
				.query(" update po_mst a													")
				.query(" set (a.deli_qty, a.rest_qty, a.sts_cd) = (							")
				.query("	  select sum(abs(b.deli_qty)), sum(abs(b.rest_qty))				")
				.query("	       , case when sum(abs(b.deli_qty)) - sum(abs(b.qty)) >= 0    then '0500' ") // 매송완료
				.query("                  when a.qty =sum(abs(b.rest_qty)) then '0200'		") // 배송대기
				.query("	         else '0400' end										") // 부분배송
				.query("	  from  po_item    b											")
				.query("	  where b.inv_no  = a.inv_no									")
				.query("      and   b.row_sts = 0											")
				.query("	)																")
				.query(" where a.inv_no  = :inv_no  ", arg.fixParameter("org_inv_no"))
			;data.attach(Action.direct);
		}

		data.execute();
		return null;
	}


	/*
	 * 마감 / 해지 건을 수정.
	 */

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("ist_mst")
				.where("where inv_no    = :inv_no     " )
				.where("and   row_clos <> :row_clos  " )
				//
				.unique("inv_no"		, row.fixParamText("inv_no"  ))
				//
				.update("row_clos"		, row.getParameter("row_clos"))
				.update("upt_ip"		, arg.remoteAddress				  )
		        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
		}
		data.execute();
		return null;
	}


	/**
	 * invoice master 등록/수정
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가" );
			} else {
				// 입고정보 등록/수정
	        	data.param
	    			.table("ist_mst")
	    			.where("where inv_no = :inv_no ")
		        	//
					.insert("hq_id"         , row.getParameter("hq_id"   ))
					.insert("stor_grp"      , row.getParameter("stor_grp"   ))
					.insert("stor_id"       , row.getParameter("stor_id"   ))
					.insert("pos_no"        , row.getParameter("pos_no"     ))
					.unique("inv_no"        , row.fixParameter("inv_no"     ))
					.update("inv_dt"        , row.getParameter("inv_dt"     ))
					.update("inv_tm"        , row.getParameter("inv_tm"     ))
					.insert("inv_work_gb"   , row.getParameter("inv_work_gb"))
					.update("inv_dept_id"   , row.getParameter("inv_dept_id"))
					.update("inv_usr_id"    , row.getParameter("inv_usr_id"))
					.insert("sts_cd"        , row.getParameter("sts_cd"     )) // 0500
					.update("retn_yn"       , row.getParameter("retn_yn"     ))
					.update("org_inv_no"    , row.getParameter("org_inv_no"     ))
					.update("get_no"        , row.getParameter("get_no"     ))
		        	.update("get_dt"        , row.getParameter("get_dt"     ))
					.update("tax_dt"        , row.getParameter("tax_dt"     ))
					.update("pay_dt"        , row.getParameter("pay_dt"     ))
					.insert("vend_id"       , row.getParameter("vend_id"    ))
					.insert("vend_nm"       , row.getParameter("vend_nm"    ))
					.insert("vend_gb"       , row.getParameter("vend_gb"    ))
					.update("tax_type"      , row.getParameter("tax_type"   ))
					.update("tax_rt"        , row.getParameter("tax_rt"   ))
					.update("txfree_amt"    , row.getParameter("txfree_amt"   ))
					.update("taxtn_amt"     , row.getParameter("taxtn_amt"   ))
					.update("sply_amt"      , row.getParameter("sply_amt"   ))
					.update("tax_amt"       , row.getParameter("tax_amt"        ))
					.update("inv_amt"       , row.getParameter("inv_amt"     ))
					.update("colt_schd_amt" , row.getParameter("inv_amt"     ))
					.update("qty"           , row.getParameter("qty"        ))
					.insert("org_ord_qty"   , row.getParameter("org_ord_qty"   ))

					.update("user_memo"      , row.getParameter("user_memo"  ))
					.update("upt_id"        , row.getParameter("upt_id"  ))
					.update("upt_ip"        , new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_id"        , row.getParameter("crt_id"  ))
					.insert("crt_ip"        , new SqlParamText("'" + arg.remoteAddress + "'"))
			        .update("upt_dttm"      , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"      , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					//.update("inv_ship_gb" , row.getParameter("inv_ship_gb"))

	        	;data.attach(rowaction);

	        	if(row.getParameter("product", SqlResultMap.class) != null) {
	        		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
	        	}

				String org_inv_no = row.getParamText("org_inv_no").trim();
				if (!"".equals(org_inv_no)) {
		        	// 발주상세 정보 입고수량 변경
					data.param
						.query("update po_item a														")
						.query("   set(a.deli_qty, a.rest_qty) = (										")
						.query("       select isnull(sum(b.qty),0) , a.qty-isnull(sum(b.qty),0)			")
						.query("       from   recv_item b												")
						.query("       where  b.org_inv_no  = a.inv_no									")
						.query("       and    b.org_inv_seq = a.line_seqn									")
						.query("       and    b.row_sts = 0												")
						.query("    )																	")
						.query(" where a.inv_no  = :org_inv_no    ", row.fixParameter("org_inv_no"))
					;data.attach(Action.direct);

			       	// 발주 정보 입고수량 변경
					data.param
						.query(" update po_mst a														")
						.query(" set (a.deli_qty, a.rest_qty, a.sts_cd) = (								")
						.query("      select sum(abs(b.deli_qty)), sum(abs(b.rest_qty))					")
						.query("           , case when sum(abs(b.deli_qty)) - sum(abs(b.qty)) >= 0    then '0500' ") // 매송완료
						.query("                  when a.qty =sum(abs(b.rest_qty)) then '0200'			") // 배송대기
						.query("             else '0400' end											") // 부분배송
						.query("      from  po_item    b												")
						.query("      where b.inv_no  = a.inv_no										")
						.query("      and   b.row_sts = 0												")
						.query("     )																	")
						.query(" where a.inv_no  = :inv_no  ", row.fixParameter("org_inv_no"))
					;data.attach(Action.direct);
				}

				String new_dt = row.fixParamText("inv_dt");
				String old_dt = row.fixParamText("_inv_dt");
				if (!old_dt.equals(new_dt)) {  /* 입고일자가 변경된 경우 */
					data.param
						.query("  update stock_book a  ")
						.query("     set a.inv_dt  = :new_dt   ", new_dt								)
						.query("  where a.inv_no   = :inv_no   ",  row.fixParameter("inv_no" ))
					;data.attach(Action.direct);
				}
			}
		}
		data.execute();
		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow inv, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				// 입고상세 삭제
	        	data.param
        			.table("recv_item")
        			.where("where inv_no  = :inv_no			")
        			.where("  and line_seqn = :line_seqn		")
        			//
        			.unique("inv_no"  , inv.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))

        		;data.attach(rowaction);

				// 재고(입출고 대장) 삭제
	        	data.param
        			.table("stock_book")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , inv.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))

	        	;data.attach(rowaction);

			} else {

				// 입고상세 등록/수정
	        	data.param
	    			.table("recv_item")
        			.where("where inv_no  = :inv_no  ")
        			.where("  and line_seqn = :line_seqn ")
		        	//
					.unique("hq_id"       , row.getParameter("hq_id"  ))
					.unique("stor_grp"    , row.getParameter("stor_grp"  ))
					.unique("stor_id"     , row.getParameter("stor_id"  ))
					.unique("inv_no"      , inv.getParameter("inv_no"    ))
					.unique("line_seqn"     , row.getParameter("line_seqn"   ))
					.insert("seq_top"     , row.getParameter("seq_top"   ))
					.update("seq_dsp"     , row.getParameter("seq_dsp"   ))
					.update("retn_yn"     , inv.getParameter("retn_yn"    ))
					.insert("org_inv_no"  , row.getParameter("org_inv_no"    ))
					.insert("org_inv_seq" , row.getParameter("org_inv_seq"   ))
					.insert("item_idcd"      , row.getParameter("item_idcd"   ))
					.insert("item_code"      , row.getParameter("item_code"   ))
					.update("item_name"      , row.getParameter("item_name"   ))
					.update("item_spec"      , row.getParameter("item_spec"   ))
					.insert("unit_idcd"      , row.getParameter("unit_idcd"   ))
					.insert("piece_qty"   , row.getParameter("piece_qty"  ))
					.insert("stk_itm_id"  , row.getParameter("stk_itm_id"  ))
					.insert("txfree_yn"   , row.getParameter("txfree_yn"  ))
					.update("unt_pri"     , row.getParameter("unt_pri"))
					.update("pri"         , row.getParameter("pri"     ))
					.update("qty"         , row.getParameter("qty"       ))
					.insert("org_ord_qty" , row.getParameter("org_ord_qty"  ))
					.update("txfree_amt"  , row.getParameter("txfree_amt"  ))
					.update("taxtn_amt"   , row.getParameter("taxtn_amt"  ))
					.update("sply_amt"    , row.getParameter("sply_amt"  ))
					.update("tax_amt"     , row.getParameter("tax_amt"       ))
					.update("inv_amt"     , row.getParameter("inv_amt"    ))
					.update("user_memo"    , row.getParameter("user_memo" ))
					.update("row_sts"     , row.getParameter("row_sts" ))
					.update("upt_id"      , row.getParameter("upt_id" ))
					.update("upt_ip"      , arg.remoteAddress )
					.insert("crt_id"      , row.getParameter("crt_id" ))
					.insert("crt_ip"      , arg.remoteAddress )
			        .update("upt_dttm"    , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"    , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();


				double work_qty = Double.parseDouble(row.getParamText("qty")) ;

				// 재고(입출고 대장) 등록/수정
	        	data.param
	    			.table("stock_book")
        			.where("where inv_no = :inv_no ")
        			.where("  and line_seqn = :line_seqn    ")
		        	//
					.insert("hq_id"       , row.getParameter("hq_id"   ))
					.update("stor_grp"    , row.getParameter("stor_grp"   ))
					.update("stor_id"     , row.getParameter("stor_id"   ))
					.unique("inv_no"      , inv.getParameter("inv_no"     ))
					.unique("line_seqn"     , row.getParameter("line_seqn"    ))
					.update("org_inv_no"  , row.getParameter("org_inv_no"     ))
					.update("org_inv_seq" , row.getParameter("org_inv_seq"    ))
					.insert("inv_gb"      , new SqlParamText("'2'"        )) // '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
					.insert("inv_wk"      , new SqlParamText("'2071302'"  )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
					.update("dept_id"     , inv.getParameter("inv_dept_id"))
					.update("emp_id"      , inv.getParameter("inv_usr_id"))
					.update("cust_id"     , inv.getParameter("vend_id"    )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
					.insert("item_idcd"      , row.getParameter("item_idcd"    ))
					.insert("item_code"      , row.getParameter("item_code"    ))

					.insert("unit_idcd"      , row.getParameter("unit_idcd"    ))
					.insert("piece_qty"   , row.getParameter("piece_qty"   ))
					.insert("stk_itm_id"  , row.getParameter("stk_itm_id"    ))


					.update("unt_pri"     , row.getParameter("unt_pri" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
					.update("cust_pri"    , row.getParameter("pri"      )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
					.update("txfree_yn"   , row.getParameter("txfree_yn"   ))
					.update("tax_type"    , inv.getParameter("tax_type"   ))
					.update("tax_rt"      , inv.getParameter("tax_rt"   ))
					.update("sply_amt"    , row.getParameter("sply_amt"   ))
					.update("tax_amt"     , row.getParameter("tax_amt"        ))



					.update("stock"       , work_qty 			          ) //new SqlParamText(String.valueOf(Integer.parseInt(piece_qty) * Integer.parseInt(qty)))) // 입고(매입)는 플러스
					.update("qty"         , row.getParameter("qty"        ))
					.update("pri"         , row.getParameter("pri"      ))
					.update("inv_amt"     , row.getParameter("inv_amt"     ))
					.update("po_pri"      , row.getParameter("pri"      )) // 매장간 거래는 매입단가 = 판매단가
					.update("po_amount"   , row.getParameter("inv_amt"     )) // 매장간 거래는 매입금액 = 판매금액
			        .update("upt_dttm"    , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"    , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();
			}
		}
	}

	/**
	 * 발주 내역 검색
	 */
	public SqlResultMap getRefers(HttpRequestArgument arg, int page , int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
        data.param // 조회
	        .query("select a.inv_no													")
	        .query("      ,a.inv_dt													")
	        .query("      ,a.vend_nm												")
	        .query("      ,a.qty													")
	        .query("      ,a.rest_qty												")
	        .query("      ,a.inv_amt												")
	        .query("      ,a.user_memo												")
	    ;
	    data.param // 조건
	        .where("  from po_mst a													")
	        .where(" where a.row_clos = 0											") // 0:, 1:마감
			.where("   and a.row_sts = 0											")
	        .where("   and a.inv_gb in ('1', '2')									") // 1:일반발주, 2:통합발주, 3:직납발주
	        .where("   and a.sts_cd in ('0200', '0400')								") // 0010:승인대기, 0200:발주승인, 0400:일부입고, 0500:입고완료
	        .where("   and a.rest_qty <> 0											")
	        .where("   and a.stor_id =      :stor_id  ", arg.fixParameter("stor_id"))
	        .where("   and a.inv_dt between :fr_dt    ", arg.fixParameter("fr_dt"))
	        .where("                    and :to_dt    ", arg.fixParameter("to_dt"))
	        .where("   and a.vend_id =      :vend_id  ", arg.getParameter("vend_id"))
	        .where(" order by a.inv_no desc											")
	    ;

		if (page == 0 && rows == 0) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select  a.stor_grp , a.stor_id																		")
			.query("     ,  b.item_idcd   , b.item_code    , b.itm_shrt_cd  , b.item_name   , b.itm_ds  , b.item_spec , b.piece_qty	")
			.query("     ,  b.unit_idcd   ,(select unit_name from itm_unit where unit_idcd = b.unit_idcd) as unit_name					")
			.query("     ,  a.po_pri   , b.txfree_yn , b.stk_itm_id														")
			.query("     ,  b.cst_pri  , s.stock     , b.brcd_1 as brcd													")
			.query("     ,  case when a.sale_pri = 0 then b.sale_pri else a.sale_pri end as sale_pri					")
			.query("	 ,  ( select clss_desct from item_class where clss_id = b.clss_id ) as  clss_nm					") //b.clss_id     ,
			.query("	 ,  b.brand_id , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm			")
			.query("	 ,  b.maker_id , ( select bas_nm from base_mst where bas_id = b.maker_id ) as  mfg_nm			")
		;
		data.param // 조건
			.query("from    itm_stor      a																				")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd														")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd				")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd															)
			.query("and     a.row_sts  = 0																				")
		;

		return data.selectForMap();
	}


	/**
	 * 상품검색
	 */
	public SqlResultMap getProductExcel(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  a.stor_grp     , a.stor_id																			")
			.query("     ,  a.mst_itm_id   , b.mst_itm_cd , b.piece_qty															")
			.query("     ,  b.unit_idcd       ,(select unit_name from itm_unit where unit_idcd = b.unit_idcd) as unit_name						")
			.query("     ,  b.item_idcd       , b.item_code     , b.itm_shrt_cd, b.item_name  , b.itm_ds  , b.item_spec						")
			.query("     ,  b.cst_pri      , s.stock      , b.brcd_1 as brcd													")
			.query("     ,  case when a.sale_pri = 0 then b.sale_pri else a.sale_pri end as sale_pri							")
			.query("	 ,  ( select clss_desct from item_class where clss_id = b.clss_id ) as  clss_nm							") //b.clss_id     ,
			.query("	 ,  a.pack_zone_id , ( select bas_nm  from base_mst where bas_id  = a.pack_zone_id ) as  pack_zone_nm	")
			.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id  ) as  vend_nm			")
			.query("	 ,  b.sales_id     , ( select bas_nm  from base_mst where bas_id  = b.sales_id ) as  sales_nm			")
			.query("	 ,  b.brand_id     , ( select bas_nm  from base_mst where bas_id  = b.brand_id ) as  brand_nm			")
			.query("	 ,  b.maker_id     , ( select bas_nm  from base_mst where bas_id  = b.maker_id ) as  mfg_nm				")
			.query("     ,  case wehn a.po_pri = 0 then b.po_pri else a.po_pri end as po_pri, a.po_pri_type, a.po_pri_rt		")
			.query("     ,  b.txfree_yn																							")
			.query("from    itm_stor      a																						")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd																")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd						")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     b.item_idcd    in (select item_idcd from scan_mst  where scan_cd = :item_code  group by item_idcd) " , arg.fixParameter("item_code"  ))
			.query("and     a.row_sts  = 0																						")
		;

		return data.selectForMap();
	}


	/**
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  c.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  c.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  c.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  c.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  c.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  c.biz_addr_1   	as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  c.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  c.biz_kind    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  c.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.stor_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1  	 	as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_kind   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, a.qty 			as qty 												") /* 수량 */
			.query("	, a.sply_amt+a.txfree_amt as sply_amt									") /* 공급가 */
			.query("	, a.tax_amt  		as tax_amt 											") /* 세액 */
			.query("	, a.inv_amt 		as inv_amt 											") /* 계 */
			.query("	, a.user_memo 		as user_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */

			.query(" from ist_mst a																")
			.query("	  join stor b on a.stor_id = b.stor_id									")
			.query("	  left outer join vend_mst c on a.vend_id = c.vend_id					")
			.query("where a.inv_no = :inv_no " , arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query("       a.seq_dsp      as seq_dsp 										") /* 항번 */
				.query("     , b.itm_shrt_cd  as itm_shrt_cd 									") /* 단축코드 */
				.query("     , a.item_code       as item_code 										") /* 코드 */
				.query("     , b.brcd_1       as brcd 											") /* 바코드 */
				.query("     , concat(a.item_name , '/' , a.item_spec) as item_name						") /* 품목 / 규격 */
				.query("     , (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("     , concat('(' , a.piece_qty , ')')   as piece_qty					") /* 포장량 */
				.query("     , a.qty          as qty 											") /* 수량 */
				.query("     , a.pri          as pri 											") /* 단가 */
				.query("     , a.sply_amt+a.txfree_amt as sply_amt 								") /* 금액 */
				.query("     , a.tax_amt      as tax_amt 										") /* 세액 */
				.query("     , a.inv_amt      as inv_amt 										") /* 합계 */
				.query("from   recv_item a 														")
				.query("       join itm_mst b on a.item_idcd = b.item_idcd 							")
				.query("where  a.inv_no = :inv_no " ,	arg.fixParameter("inv_no"           ))
				.query("and    a.qty   <> 0														")
				.query("order  by line_seqn														")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}
}
