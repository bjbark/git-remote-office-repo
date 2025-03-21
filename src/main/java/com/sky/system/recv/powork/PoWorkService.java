package com.sky.system.recv.powork;

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
public class PoWorkService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.inv_amt) as inv_amt  ")
		;
		data.param // 조회
			.query("select a.row_clos														")
			.query("     , a.inv_gb															")
			.query("     , a.vend_gb														")
			.query("     , a.stor_id   , b.stor_nm											")
			.query("     , a.inv_no    , a.org_inv_no										")
			.query("     , a.inv_dt															")
			.query("     , a.vend_id														")
			.query("     , d.vend_cd														")
			.query("     , a.vend_nm														")

//			.query("     , a.cust_id														")
//			.query("     , e.cust_nm														")

			.query("     , d.biz_email														")
			.query("     , d.biz_fax_no														")
			.query("     , c.emp_nm  as inv_user_nm											")
			.query("     , a.inv_amt														")
			.query("     , a.sts_cd															")
			.query("     , a.user_memo														")
			.query("     , a.qty															")
		;
		data.param // 조건
			.where("  from po_mst a															")
			.where("       left outer join stor b       on b.stor_id = a.stor_id			")
			.where("       left outer join usr_mst c    on c.emp_id = a.inv_usr_id			")
			.where("       join vend_mst d              on d.vend_id = a.vend_id			")
//			.where("       left outer join cust_mst e   on e.cust_id = a.cust_id			")

			.where(" where a.stor_id    = :stor_id		", arg.fixParameter("stor_id" ))
			.where("   and a.inv_dt between :fr_dt		", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt		", arg.fixParameter("to_dt"))
			.where("   and a.vend_id    = :vend_id		", arg.getParameter("vend_id"  ))
			.where("   and a.inv_usr_id = :inv_usr_id	", arg.getParameter("inv_usr_id"  ))
			.where("   and a.row_sts    = 0 												")
			.where("   and a.sts_cd     = :sts_cd		", arg.getParameter("sts_cd"))
			.where("   and a.row_clos   = :row_clos		", arg.getParameter("row_clos" 	))  // 마감 여부
		;

		data.param
			.where(" order by a.inv_no desc													")
		;
		return (page == 0 && rows == 0) ? data.selectForMap(sort) : data.selectForMap(page, rows, (page==1),sort);
	}

	/**
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select a.seq_dsp															")
		.query("      ,a.item_code																")
		.query("      ,a.item_name																")
		.query("      ,a.item_spec																")
		.query("      ,a.txfree_yn															")
		.query("      ,b.unit_name																")
		.query("      ,a.piece_qty															")
		.query("      ,a.qty																")
		.query("      ,a.safe_dt															")
		.query("      ,a.pri																")
		.query("      ,a.sply_amt															")
		.query("      ,a.tax_amt															")
		.query("      ,a.txfree_amt															")
		.query("      ,a.inv_amt															")

		.query("      ,a.deli_qty															")
		.query("      ,a.rest_qty															")


		.query("      ,(select bas_nm from base_mst where bas_id = c.brand_id) as brand_nm	")
		.query("      ,a.user_memo															")
		.query("      ,c.brcd_1 as brcd														")
		.query("      ,c.itm_shrt_cd as itm_shrt_cd											")
		.query("  from po_item a															")
		.query("       left outer join itm_unit b on b.unit_idcd = a.unit_idcd					")
		.query("       join itm_mst             c on c.item_idcd = a.item_idcd					")
		.query(" where a.inv_no = :inv_no	", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 														")
		.query(" order by a.seq_top, a.line_seqn												")
		;

		return data.selectForMap();
	}

	/**
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.inv_no , a.sts_cd , a.inv_gb , a.org_inv_no  , a.row_clos	")
			.query("     , a.tax_type													")
			.query("     , a.inv_dt														")
			.query("     , a.wrhs_id													")
			.query("     , a.stor_id  ,  b.stor_nm										")
			.query("     , a.vend_id													")
			.query("     , a.vend_nm													")
			.query("     , a.vend_gb													")
			.query("     , a.inv_dept_id												")
			.query("     , a.inv_usr_id													")
			.query("     , c.emp_nm     as inv_user_nm									")
			.query("     , a.retn_yn													")
			.query("     , a.tax_type													")
			.query("     , a.tax_rt														")
			.query("     , a.txfree_amt													")
			.query("     , a.taxtn_amt													")
			.query("     , a.sply_amt													")
			.query("     , a.tax_amt													")
			.query("     , a.inv_amt													")
			.query("     , a.qty														")
			.query("     , a.user_memo													")
			.query("     , a.biz_no														")
			.query("     , a.biz_nm														")
			.query("     , a.biz_kind													")
			.query("     , a.biz_type													")
			.query("     , a.biz_owner													")
			.query("     , a.biz_state													")
			.query("     , a.biz_city													")
			.query("     , a.biz_dong													")
			.query("     , a.biz_zip_cd													")
			.query("     , a.biz_addr_1													")
			.query("     , a.biz_addr_2													")
			.query("     , a.biz_email													")
			.query("     , a.biz_hp_no													")
			.query("     , a.biz_tel_no													")
			.query("     , a.biz_fax_no													")

			.query("     , a.cust_id													")
			.query("     , e.cust_nm													")

			.query("     , a.req_msg													")
			.query("     , a.reve_nm													")
			.query("     , a.reve_state													")
			.query("     , a.reve_city													")
			.query("     , a.reve_dong													")
			.query("     , a.reve_zip_cd												")
			.query("     , a.reve_addr_1												")
			.query("     , a.reve_addr_2												")
			.query("     , a.reve_email													")
			.query("     , a.reve_hp_no 												")
			.query("     , a.reve_tel_no												")
			.query("     , a.reve_fax_no												")
			.query("     , d.biz_gb														")
			.query(" from  po_mst a														")
			.query("       left outer join stor b		on b.stor_id = a.stor_id		")
			.query("       left outer join usr_mst c	on c.emp_id  = a.inv_usr_id		")
			.query("       left outer join vend_mst d	on d.vend_id = a.vend_id		")
			.query("       left outer join cust_mst e	on e.cust_id = a.cust_id		")
			.query(" where a.inv_no = :inv_no             ", arg.fixParameter("inv_no" ))
			.query("   and a.row_sts = 0 												")
		;
		SqlResultMap info = data.selectForMap();
		if (info.size() == 1) {
			SqlResultRow inv = info.get(0);

			if (!"0200".equals(inv.getParamText("sts_cd").trim() )) {
				throw new ServiceException("입고 자료는 수정 불가능 합니다." );
			}

			if (!"1".equals(inv.getParamText("inv_gb").trim() )) {
				throw new ServiceException("직납 발주는 수정 불가능 합니다." );
			}

			if (!"".equals(inv.getParamText("org_inv_no").trim() )) {
				throw new ServiceException("요청에 의한 발주는 수정 불가능 합니다. 승인 취소후 발주 요청에서 수정하여 주시기 바랍니다." );
			}

			if ( 1 == Double.parseDouble(inv.getParamText( "row_clos".trim() ))) {
				throw new ServiceException("마감 자료는 수정 불가능 합니다." );
			}

			data.clear();
			data.param
				.query("select a.inv_no																")
				.query("      ,a.line_seqn															")
				.query("      ,a.seq_top															")
				.query("      ,a.seq_dsp															")
				.query("      ,a.item_idcd																")
				.query("      ,a.item_code																")
				.query("      ,a.item_name																")
				.query("      ,a.item_spec																")
				.query("      ,a.unit_idcd																")
				.query("      ,b.unit_name																")
				.query("      ,a.piece_qty															")
				.query("      ,a.stk_itm_id															")
				.query("      ,a.txfree_yn															")
				.query("      ,a.unt_pri															")
				.query("      ,a.retn_yn															")
				.query("      ,a.pri																")
				.query("      ,a.qty																")

				.query("      ,a.deli_qty															")
				.query("      ,a.rest_qty															")


				.query("      ,a.txfree_amt															")
				.query("      ,a.taxtn_amt															")
				.query("      ,a.sply_amt															")
				.query("      ,a.tax_amt															")
				.query("      ,a.inv_amt															")
				.query("      ,(select bas_nm from base_mst where bas_id = c.brand_id) as brand_nm	")
				.query("      ,a.safe_dt															")
				.query("      ,a.user_memo															")
				.query("      ,c.brcd_1 as brcd														")
				.query("      ,c.itm_shrt_cd as itm_shrt_cd											")
				.query("  from po_item  a															")
				.query("       left outer join itm_unit b on b.unit_idcd = a.unit_idcd					")
				.query("       join itm_mst c             on c.item_idcd = a.item_idcd					")
				.query(" where a.inv_no = :inv_no	", arg.fixParameter("inv_no"))
				.query("   and a.row_sts = 0 														")
				.query(" order by a.seq_top, a.line_seqn												")
			;
			info.get(0).put("product", data.selectForMap());
		}
		return info;
	}

	/**
	 * 삭제
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage read = arg.newStorage("POS");
		read.param
		 	.query("select a.org_inv_no , a.inv_gb ,  a.sts_cd, a.deli_qty , a.row_clos ")
		 	.query("from   po_mst a            ")
		 	.query("where  a.inv_no = :inv_no   ", arg.fixParameter("inv_no"))
		;
		SqlResultRow del = read.selectForRow();

		if (del == null) {
			throw new ServiceException( "삭제 요청 번호가 올바르지 않습니다.", -99 );
		}

		if (!"0200".equals(del.getParamText("sts_cd").trim() )) {
			throw new ServiceException("입고 자료는 삭제 불가능 합니다." );
		}

		if (!"1".equals(del.getParamText("inv_gb").trim() )) {
			throw new ServiceException("직납 발주는 삭제 불가능 합니다." );
		}

		if (!"".equals(del.getParamText("org_inv_no").trim() )) {
			throw new ServiceException("요청에 의한 발주는 삭제 불가능 합니다. 승인 취소 하여 주시기 바랍니다." );
		}

		if ( 1 == Double.parseDouble(del.getParamText( "row_clos" ))) {
			throw new ServiceException("마감 자료는 삭제 불가능 합니다." );
		}

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("po_item")
			.where("where inv_no = :inv_no ")
			//
			.unique("inv_no"		, arg.fixParameter("inv_no"))
			.update("row_sts"		, 2)
			.update("upt_id"		, arg.getParameter("upt_id"))
			.update("upt_ip"		, arg.remoteAddress)
	        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);

		data.param
			.table("po_mst")
			.where("where inv_no = :inv_no ")
				//
			.unique("inv_no"		, arg.fixParameter("inv_no"))
			.update("row_sts"		, 2)
			.update("upt_id"		, arg.getParameter("upt_id"))
			.update("upt_ip"		, arg.remoteAddress)
	        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);

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
				.table("po_mst")
				.where("where inv_no   =  :inv_no								")
				.where("and   row_clos <> :row_clos								")
				//
				.unique("inv_no"		, row.fixParamText("inv_no"  ))
				//
				.update("row_clos"		, row.getParameter("row_clos"))
				.update("upt_ip"		, arg.remoteAddress			)
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
		for (SqlResultRow inv:arg.getParameter("records", SqlResultMap.class)) {
			Action rowaction = SqlParameter.Action.setValue(inv.getParameter("_set"));
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// 발주정보 등록/수정
	        	data.param
	    			.table("po_mst")
	    			.where("where inv_no = :inv_no ")
		        	//
					.insert("hq_id"          , inv.getParameter("hq_id"   ))
					.insert("stor_grp"       , inv.getParameter("stor_grp"   ))
					.insert("stor_id"        , inv.getParameter("stor_id"   ))
					.update("wrhs_id"        , inv.getParameter("wrhs_id"   ))
					.insert("pos_no"         , inv.getParameter("pos_no"     ))
					.unique("inv_no"         , inv.fixParameter("inv_no"     ))
					.update("inv_dt"         , inv.getParameter("inv_dt"     ))
					.update("inv_tm"         , inv.getParameter("inv_tm"     ))
					.insert("inv_work_gb"    , inv.getParameter("inv_work_gb"))
					.update("inv_dept_id"    , inv.getParameter("inv_dept_id"))
					.update("inv_usr_id"     , inv.getParameter("inv_usr_id"))
					.insert("sts_cd"         , inv.getParameter("sts_cd"     ))
					.update("retn_yn"        , inv.getParameter("retn_yn"     ))
					.insert("vend_id"        , inv.getParameter("vend_id"    ))
					.insert("vend_nm"        , inv.getParameter("vend_nm"    ))
					.update("vend_gb"        , inv.getParameter("vend_gb"    ))
					.update("tax_type"       , inv.getParameter("tax_type"   ))
					.update("tax_rt"         , inv.getParameter("tax_rt"   ))
					.update("txfree_amt"     , inv.getParameter("txfree_amt"   ))
					.update("taxtn_amt"      , inv.getParameter("taxtn_amt"   ))
					.update("sply_amt"       , inv.getParameter("sply_amt"   ))
					.update("tax_amt"        , inv.getParameter("tax_amt"        ))
					.update("inv_amt"        , inv.getParameter("inv_amt"     ))
					.update("qty"            , inv.getParameter("qty"        ))
					.insert("org_ord_qty"    , inv.getParameter("qty"        ))
					.update("req_msg"        , inv.getParameter("req_msg"    ))
					.update("user_memo"       , inv.getParameter("user_memo"  ))
					.update("upt_id"         , inv.getParameter("upt_id"  ))
					.update("upt_ip"         , arg.remoteAddress              )
					.insert("crt_id"         , inv.getParameter("crt_id"  ))
					.insert("crt_ip"         , arg.remoteAddress)
			        .update("upt_dttm"       , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"       , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					.update("biz_no"         , inv.getParameter("biz_no"     ))
					.update("biz_nm"         , inv.getParameter("biz_nm"     ))
					.update("biz_kind"       , inv.getParameter("biz_kind"   ))
					.update("biz_type"       , inv.getParameter("biz_type"  ))
					.update("biz_owner"      , inv.getParameter("biz_owner"  ))
					.update("biz_state"      , inv.getParameter("biz_state"  ))
					.update("biz_city"       , inv.getParameter("biz_city"   ))
					.update("biz_dong"       , inv.getParameter("biz_dong"   ))
					.update("biz_zip_cd"     , inv.getParameter("biz_zip_cd" ))
					.update("biz_addr_1"     , inv.getParameter("biz_state"  ) + " " + inv.getParameter("biz_city") + " " + inv.getParameter("biz_dong"))
					.update("biz_addr_2"     , inv.getParameter("biz_addr_2"  ))
					.update("biz_email"      , inv.getParameter("biz_email"  ))
					.update("biz_hp_no"      , inv.getParameter("biz_hp_no" ))
					.update("biz_tel_no"     , inv.getParameter("biz_tel_no" ))
					.update("biz_fax_no"     , inv.getParameter("biz_fax_no" ))

					.update("cust_id"        , inv.getParameter("cust_id"    ))

					.update("reve_nm"        , inv.getParameter("reve_nm"    ))
					.update("reve_state"     , inv.getParameter("reve_state" ))
					.update("reve_city"      , inv.getParameter("reve_city"  ))
					.update("reve_dong"      , inv.getParameter("reve_dong"  ))
					.update("reve_zip_cd"    , inv.getParameter("reve_zip_cd"))
					.update("reve_addr_1"    , inv.getParameter("reve_state" ) + " " + inv.getParameter("reve_city") + " " + inv.getParameter("reve_dong"))
					.update("reve_addr_2"    , inv.getParameter("reve_addr_2" ))
					.update("reve_email"     , inv.getParameter("reve_email" ))
					.update("reve_hp_no"     , inv.getParameter("reve_hp_no"))
					.update("reve_tel_no"    , inv.getParameter("reve_tel_no"))
					.update("reve_fax_no"    , inv.getParameter("reve_fax_no"))

					.insert("rest_qty"       , inv.getParameter("qty"), rowaction==Action.insert)
					.update("rest_qty"       , new SqlParamText(":qty-deli_qty"), rowaction==Action.update)
				;
	        	data.attach(rowaction );

	        	SqlResultMap product = inv.getParameter("product", SqlResultMap.class) ;
	        	if (product != null) {
	        		setInvoiceDetail(arg, data,  product, inv );
	        	}

        		/* 주문 정보를 업데이트 한다. */
    			double work_ori = Double.parseDouble(inv.getParamText("_qty")) ;
    			double work_qty = Double.parseDouble(inv.getParamText("qty")) ;

        		if (rowaction == Action.update && work_ori != work_qty ) {
    	        	// 발주요청 수량, 상태 변경
    				data.param
    					.query(" update po_mst a                                              ")
    					.query(" set (a.rest_qty, a.sts_cd) = (                               ")
    					.query("	  select sum(isnull(b.rest_qty,0))                        ")
    					.query("	       , case when a.sts_cd < '0200' then a.sts_cd        ") // 승인전 상태라면 이전 상태를 유지
    					.query("	         else                                             ")
    					.query("	             case when sum(b.rest_qty)   <= 0 then '0500' ") // 배송완료
    					.query("                       when a.qty=sum(b.rest_qty) then '0200' ") // 배송대기
    					.query("	                   else '0400'                            ") // 부분배송
    					.query("	             end                                          ")
    					.query("	         end                                              ")
    					.query("	  from  po_item b                                         ")
    					.query("	  where b.inv_no  = a.inv_no                              ")
    					.query("	  and   b.row_sts = 0                                     ")
    					.query("	)                                                         ")
    					.query(" where a.inv_no  = :inv_no   ", inv.fixParameter("inv_no"     ))
    					.action = Action.direct;
    				data.attach();
        		}
			}
		}

		data.execute();
		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultMap map ,SqlResultRow inv) throws Exception {

		for(SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				// 발주상세 삭제
	        	data.param
        			.table("po_item")
        			.where("where inv_no  = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        		;
	        	data.attach(rowaction);

			} else {

				// 발주상세 등록/수정
	        	data.param
	    			.table("po_item")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
		        	//
					.unique("hq_id"         , row.getParameter("hq_id"  ))
					.unique("stor_grp"      , row.getParameter("stor_grp"  ))
					.unique("stor_id"       , row.getParameter("stor_id"  ))
					.update("wrhs_id"       , inv.getParameter("wrhs_id"  ))
					.unique("inv_no"        , row.getParameter("inv_no"    ))
					.unique("line_seqn"       , row.getParameter("line_seqn"   ))
					.insert("seq_top"       , row.getParameter("seq_top"   ))
					.update("seq_dsp"       , row.getParameter("seq_dsp"   ))
					.update("retn_yn"       , row.getParameter("retn_yn"    ))
					.update("safe_dt"       , row.getParameter("safe_dt"   ))
					.insert("item_idcd"        , row.getParameter("item_idcd"   ))
					.insert("item_code"        , row.getParameter("item_code"   ))
					.update("item_name"        , row.getParameter("item_name"   ))
					.update("item_spec"        , row.getParameter("item_spec"   ))
					.insert("unit_idcd"        , row.getParameter("unit_idcd"   ))
					.insert("piece_qty"     , row.getParameter("piece_qty"  ))
					.insert("stk_itm_id"    , row.getParameter("stk_itm_id"   ))

					.update("txfree_yn"     , row.getParameter("txfree_yn"  ))
					.update("unt_pri"       , row.getParameter("unt_pri"))
					.update("pri"           , row.getParameter("pri"     ))
					.update("qty"           , row.getParameter("qty"       ))
					.insert("org_ord_qty"   , row.getParameter("qty"       ))
					.update("txfree_amt"    , row.getParameter("txfree_amt"  ))
					.update("taxtn_amt"     , row.getParameter("taxtn_amt"  ))
					.update("sply_amt"      , row.getParameter("sply_amt"  ))
					.update("tax_amt"       , row.getParameter("tax_amt"       ))
					.update("inv_amt"       , row.getParameter("inv_amt"    ))
					.update("user_memo"      , row.getParameter("user_memo" ))
					.update("row_sts"       , row.getParameter("row_sts" ))
					.update("upt_id"        , row.getParameter("upt_id" ))
					.update("upt_ip"        , arg.remoteAddress )
					.insert("crt_id"        , row.getParameter("crt_id" ))
					.insert("crt_ip"        , arg.remoteAddress)
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					.insert("rest_qty"      , row.getParameter("qty"), rowaction==Action.insert)
					.update("rest_qty"      , new SqlParamText(":qty-deli_qty"), rowaction==Action.update)

					.action = rowaction;
	        	data.attach();
			}
		}
	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProductExcel(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  a.stor_grp  , a.stor_id																		")
			.query("     ,  b.unit_idcd    , b.piece_qty																	")
			.query("     ,  (select unit_name from itm_unit where unit_idcd = b.unit_idcd) as unit_name								")
			.query("     ,  b.item_idcd    , b.item_code   , b.item_name     , b.itm_ds  , b.item_spec								")
			.query("     ,  b.cst_pri   , s.stock    , b.stk_itm_id , b.brcd_1 as brcd , b.itm_shrt_cd as itm_shrt_cd	")
			.query("     ,  case when a.sale_pri = 0 then b.sale_pri else a.sale_pri end as sale_pri					")
			.query("	 ,  ( select clss_desct from item_class where clss_id = b.clss_id ) as  clss_nm					") //b.clss_id     ,
			.query("     ,  a.vend_id   , ( select vend_nm from vend_mst where vend_id = a.vend_id  ) as  vend_nm		")
			.query("	 ,  b.brand_id  , ( select bas_nm  from base_mst where bas_id  = b.brand_id ) as  brand_nm		")
			.query("	 ,  b.maker_id  , ( select bas_nm  from base_mst where bas_id  = b.maker_id ) as  mfg_nm		")
			.query("     ,  a.po_pri    , a.po_pri_type, a.po_pri_rt													")
			.query("     ,  b.txfree_yn																					")
			.query("from    itm_stor      a																				")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd														")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd				")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     b.item_idcd    in (select item_idcd from scan_mst  where scan_cd = :item_code  group by item_idcd) " , arg.fixParameter("item_code"  ))
			.query("and     a.row_sts  = 0																				")
		;

		return data.selectForMap();
	}

	/**
	 * 출력
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 																		")
			.query("       a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("     , a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("     , c.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("     , c.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("     , c.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("     , c.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("     , c.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("     , c.biz_addr_1   	as send_biz_addr_1 									") /* 공급자 주소 */
			.query("     , c.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("     , c.biz_kind    	as send_biz_cond 									") /* 공급자 업태 */
			.query("     , c.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("     , b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("     , b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("     , b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("     , b.stor_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("     , b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("     , b.addr_1   		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("     , b.addr_2   		as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("     , b.biz_kind   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("     , b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("     , a.qty 			as qty 												") /* 수량 */
			.query("     , a.sply_amt+a.txfree_amt as sply_amt									") /* 공급가 */
			.query("     , a.tax_amt  		as tax_amt 											") /* 세액 */
			.query("     , a.inv_amt 		as inv_amt 											") /* 계 */
			.query("     , a.user_memo 		as user_memo  										") /* 요청메모 */
			.query("     , (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as print_dt 				") /* 발행일자 */
			.query("     , concat(substring(a.crt_dttm,  0,4),'-',substring(a.crt_dttm, 5,2)		")
			.query("         ,'-',substring(a.crt_dttm,  7,2),' ',substring(a.crt_dttm, 9,2)		")
			.query("         ,':',substring(a.crt_dttm, 11,2),':',substring(a.crt_dttm, 13,2))	")
			.query("         as crt_dttm															") /* 등록일자 */
			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */
			.query("    , (select emp_nm from usr_mst where emp_id = a.inv_usr_id) as inv_user_nm	") /* 발주자명 */

			.query(" from po_mst a																")
			.query("	  join stor b on a.stor_id = b.stor_id									")
			.query("	  left outer join vend_mst c on a.vend_id = c.vend_id					")
			.query("where a.inv_no = :inv_no " ,	arg.fixParameter("inv_no"))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query(" 		a.seq_dsp       as seq_dsp 										") /* 항번 */
				.query("	,   b.itm_shrt_cd   as itm_shrt_cd									") /* 단축코드 */
				.query("	,   a.item_code        as item_code 										") /* 코드 */
				.query("	,   b.brcd_1        as brcd	 										") /* 바코드 */
				.query("	,   concat(a.item_name,'/',a.item_spec) as item_name							") /* 품목 / 규격 */
				.query("	,   (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   concat('(' , a.piece_qty , ')') as piece_qty					") /* 포장량 */
				.query("	,   a.qty           as qty 											") /* 수량 */
				.query("	,   a.pri           as pri 											") /* 단가 */
				.query("	,   a.sply_amt+a.txfree_amt as sply_amt 							") /* 금액 */
				.query("	,   a.tax_amt       as tax_amt 										") /* 세액 */
				.query("	,   a.inv_amt      as inv_amt 										") /* 합계 */
				.query("  from  po_item a 														")
				.query("		join itm_mst b on a.item_idcd = b.item_idcd 							")
				.query(" where  a.inv_no = :inv_no " ,	arg.fixParameter("inv_no"   ))
				.query("   and  a.qty   <> 0	 												")
				.query("order by line_seqn		 												")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

}
