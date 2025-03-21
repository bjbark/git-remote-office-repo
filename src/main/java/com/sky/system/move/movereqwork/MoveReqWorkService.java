package com.sky.system.move.movereqwork;

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
public class MoveReqWorkService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.inv_amt) as inv_amt ")
		;
		data.param // 조회
			.query("select a.inv_no															")
			.query("     , a.inv_dt															")
			.query("     , (select stor_nm from stor where stor_id = a.move_id) as move_nm	")
			.query("     , c.emp_nm as inv_user_nm											")
			.query("     , a.inv_amt														")
			.query("     , a.deli_qty														")
			.query("     , a.user_memo														")
			.query("     , a.sts_cd															")
			.query("     , a.row_clos														")
			.query("     , b.biz_fax_no as fax_no											")
			.query("     , b.biz_email  as email											")
		;
		data.param // 조건
			.where("  from move_req_mst a													")
			.where("       left outer join stor b     on b.stor_id = a.move_id       ")
			.where("       left outer join usr_mst c  on c.emp_id = a.inv_usr_id    ")
			.where(" where a.stor_id    = :stor_id    ", arg.getParameter("stor_id"))
			.where("   and a.move_id    = :move_id    ", arg.getParameter("move_id"))
			.where("   and a.inv_dt between :fr_dt    ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt    ", arg.fixParameter("to_dt"))
			.where("   and a.sts_cd     = :sts_cd     ", arg.getParameter("sts_cd"))
			.where("   and a.inv_usr_id = :inv_usr_id ", arg.getParameter("inv_usr_id"))
			.where("   and a.row_sts    = 0													")
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
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

	DataMessage data = arg.newStorage("POS");
	data.param
		.query("select a.inv_no						")
		.query("     , a.line_seqn					")
		.query("     , a.seq_dsp					")
		.query("     , a.item_idcd						")
		.query("     , a.item_code						")
		.query("     , a.item_name						")
		.query("     , a.item_spec						")
		.query("     , a.unit_idcd						")
		.query("     , b.unit_name						")
		.query("     , a.piece_qty					")
		.query("     , a.qty						")
		.query("     , a.pri						")
		.query("     , a.sply_amt					")
		.query("     , a.tax_amt					")
		.query("     , a.inv_amt					")
		.query("     , a.rest_qty					") // 출고잔량
		.query("     , a.user_memo					")
		.query("  from move_req_dtl a				")
		.query("       left outer join itm_unit b	")
		.query("          on b.unit_idcd = a.unit_idcd    ")
		.query(" where a.inv_no = :inv_no ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0				")
		.query(" order by a.seq_top, a.line_seqn		")
	;

	return data.selectForMap();
}


	/**
	 * invoice 조회
	 *
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.stor_id														")
			.query("     , isnull(b.stor_nm, '') as stor_nm									")
			.query("     , a.inv_no															")
			.query("     , a.inv_dt															")
			.query("     , a.move_id														")
			.query("     , (select stor_nm from stor where stor_id = a.move_id) as move_nm	")
			.query("     , a.inv_dept_id													")
			.query("     , a.inv_usr_id														")
			.query("     , isnull(c.emp_nm, '') as inv_user_nm								")
			.query("     , a.user_memo														")
			.query("     , a.sts_cd															")
			.query("     , a.tax_type														")
			.query("     , a.tax_rt															")
			.query("     , a.txfree_amt														")
			.query("     , a.taxtn_amt														")
			.query("     , a.sply_amt														")
			.query("     , a.tax_amt														")
			.query("     , a.inv_amt														")
			.query("     , a.qty															")
			.query("     , a.user_memo														")
			.query("  from move_req_mst a													")
			.query("       left outer join stor b    on b.stor_id = a.stor_id				")
			.query("       left outer join usr_mst c on c.emp_id = a.inv_usr_id				")
			.query(" where a.inv_no = :inv_no  ", arg.fixParameter("inv_no" ))
			.query("   and a.row_sts = 0													")
		;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();

			data.param
			.query("select a.inv_no						")
			.query("     , a.line_seqn					")
			.query("     , a.seq_top					")
			.query("     , a.seq_dsp					")
			.query("     , a.item_idcd						")
			.query("     , a.item_code						")
			.query("     , a.item_name						")
			.query("     , a.item_spec						")
			.query("     , a.mst_itm_id					")
			.query("     , a.mst_itm_cd					")
			.query("     , a.unit_idcd						")
			.query("     , b.unit_name						")
			.query("     , a.piece_qty					")
			.query("     , a.txfree_yn					")
			.query("     , a.unt_pri					")
			.query("     , a.itm_dsnt					")
			.query("     , a.pri						")
			.query("     , a.qty						")
			.query("     , a.deli_qty					")
			.query("     , a.rest_qty					") // 출고잔량
			.query("     , a.txfree_amt					")
			.query("     , a.taxtn_amt					")
			.query("     , a.sply_amt					")
			.query("     , a.tax_amt					")
			.query("     , a.inv_amt					")
			.query("     , a.user_memo					")
			.query("  from move_req_dtl  a				")
			.query("       left outer join itm_unit b	")
			.query("          on b.unit_idcd = a.unit_idcd	")
			.query(" where a.inv_no = :inv_no ", arg.fixParameter("inv_no"))
			.query("   and a.row_sts = 0				")
			.query(" order by a.seq_top, a.line_seqn		")
			;

			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				throw new ServiceException("삭제불가");


			} else {
				// 이동요청정보 등록/수정
	        	data.param
	    			.table("move_req_mst")
	    			.where("where inv_no = :inv_no ")
		        	//
					.insert("corp_id"		, row.getParameter("corp_id"   ))
					.insert("hq_id"			, row.getParameter("hq_id"   ))
					.insert("stor_grp"		, row.getParameter("stor_grp"   ))
					.insert("stor_id"		, row.getParameter("stor_id"   ))
					.insert("pos_no"		, row.getParameter("pos_no"     ))
					.unique("inv_no"		, row.fixParameter("inv_no"     ))
					.insert("inv_dt"		, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					.insert("inv_tm"		, new SimpleDateFormat("HHmm").format(new Date()) )
					.update("inv_dept_id"	, row.getParameter("inv_dept_id"))
					.update("inv_usr_id"	, row.getParameter("inv_usr_id"))
					.insert("sts_cd"		, new SqlParamText("'0100'"     ))
					.insert("move_id"		, row.getParameter("move_id"    ))
					.update("move_nm"		, row.getParameter("move_nm"    ))
					.update("tax_type"		, row.getParameter("tax_type"   ))
					.update("tax_rt"		, row.getParameter("tax_rt"   ))
					.update("txfree_amt"	, row.getParameter("txfree_amt"   ))
					.update("taxtn_amt"		, row.getParameter("taxtn_amt"   ))
					.update("sply_amt"		, row.getParameter("sply_amt"   ))
					.update("tax_amt"		, row.getParameter("tax_amt"        ))
					.update("inv_amt"		, row.getParameter("inv_amt"     ))
					.update("qty"			, row.getParameter("qty"        ))
					.insert("org_ord_qty"	, row.getParameter("qty"        ))
					.update("user_memo"		, row.getParameter("user_memo"  ))
					.update("upt_id"		, row.getParameter("upt_id"  ))
					.update("upt_ip"		, arg.remoteAddress			   )
					.insert("crt_id"		, row.getParameter("crt_id"  ))
					.insert("crt_ip"		, arg.remoteAddress			   )
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					.insert("rest_qty"		, row.getParameter("qty"), rowaction==Action.insert)
					.update("rest_qty"		, new SqlParamText(":qty-deli_qty"), rowaction==Action.update)

					.action = rowaction;
	        	data.attach();

	        	if(row.getParameter("product", SqlResultMap.class) != null) {
	        		setInvoiceDetail(arg, data, row.getParameter("product", SqlResultMap.class));
	        	}
			}
		}

		data.execute();
		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 *
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				// 이동요청상세 삭제
	        	data.param
        			.table("move_req_dtl")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

			} else {
				// 이동요청상세 등록/수정
	        	data.param
	    			.table("move_req_dtl")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
		        	//
					.insert("hq_id"			, row.getParameter("hq_id"  ))
					.insert("stor_grp"		, row.getParameter("stor_grp"  ))
					.insert("stor_id"		, row.getParameter("stor_id"  ))
					.unique("inv_no"		, row.getParameter("inv_no"    ))
					.unique("line_seqn"		, row.getParameter("line_seqn"   ))
					.update("seq_top"		, row.getParameter("seq_top"   ))
					.update("seq_dsp"		, row.getParameter("seq_dsp"   ))
					.update("mst_itm_id"	, row.getParameter("mst_itm_id"   ))
					.update("mst_itm_cd"	, row.getParameter("mst_itm_cd"   ))
					.update("unit_idcd"		, row.getParameter("unit_idcd"   ))
					.update("piece_qty"		, row.getParameter("piece_qty"  ))
					.update("item_idcd"		, row.getParameter("item_idcd"   ))
					.update("item_code"		, row.getParameter("item_code"   ))
					.update("item_name"		, row.getParameter("item_name"   ))
					.update("item_spec"		, row.getParameter("item_spec"   ))
					.update("txfree_yn"		, row.getParameter("txfree_yn"  ))
					.update("unt_pri"		, row.getParameter("unt_pri"))
					.update("itm_dsnt"		, row.getParameter("itm_dsnt"))
					.update("pri"			, row.getParameter("pri"     ))
					.update("qty"			, row.getParameter("qty"       ))
					.insert("org_ord_qty"	, row.getParameter("qty"       ))
					.update("txfree_amt"	, row.getParameter("txfree_amt"  ))
					.update("taxtn_amt"		, row.getParameter("taxtn_amt"  ))
					.update("sply_amt"		, row.getParameter("sply_amt"  ))
					.update("tax_amt"		, row.getParameter("tax_amt"       ))
					.update("inv_amt"		, row.getParameter("inv_amt"    ))
					.insert("rest_qty"		, row.getParameter("qty"), rowaction==Action.insert)
					.update("rest_qty"		, new SqlParamText(":qty-deli_qty"), rowaction==Action.update)
					.update("user_memo"		, row.getParameter("user_memo" ))
					.update("row_sts"		, row.getParameter("row_sts" ))
					.update("upt_id"		, row.getParameter("upt_id" ))
					.update("upt_ip"		, arg.remoteAddress			 )
					.insert("crt_usr_nm"	, row.getParameter("crt_usr_nm" ))
					.insert("crt_ip"		, arg.remoteAddress			 )
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();
			}
		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage temp = arg.newStorage("POS");
		temp.param
		 	.query("select sts_cd, deli_qty from move_req_mst where inv_no = :inv_no", arg.fixParameter("inv_no"))
		;
		SqlResultRow del = temp.selectForRow();

		String work_stscd   = arg.getParamText("sts_cd").toString();		// 로컬 상태
		String server_stscd = del.getParamText("sts_cd").toString();		// 서버 상태

		double work_qty   = Double.parseDouble(arg.getParamText("deli_qty"));	// 로컬 수량
		double server_qty = Double.parseDouble(del.getParamText("deli_qty"));	// 서버 수량

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

		// 상태 재확인
		if ("0100".equals(work_stscd)) {
        	data.param
	    		.table("move_req_dtl")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"   	, arg.fixParameter("inv_no"))
	    		.update("row_sts"	, 2)
				.update("upt_id"	, arg.getParameter("upt_id"))
				.update("upt_ip"	, arg.remoteAddress)
		        .update("upt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

	    	data.param
				.table("move_req_mst")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"    , arg.fixParameter("inv_no"))
	    		.update("row_sts"	, 2)
				.update("upt_id"	, arg.getParameter("upt_id"))
				.update("upt_ip"	, arg.remoteAddress)
		        .update("upt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);
		}

		data.execute();
		return null;
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
			.query("select a.stor_grp     , a.stor_id															")
			.query("     , a.mst_itm_id   , b.mst_itm_cd          , b.piece_qty									")
			.query("     , b.unit_idcd       , (select unit_name from itm_unit where unit_idcd = b.unit_idcd) as unit_name		")
			.query("     , b.item_idcd       , b.item_code  , b.item_name  , b.itm_ds , b.item_spec							")
			.query("     , b.cst_pri      , s.stock																")
			.query("     , case when a.sale_pri = 0 then b.sale_pri else a.sale_pri end as sale_pri				")
			.query("     , ( select clss_desct from item_class where clss_id = b.clss_id ) as  clss_nm			") //b.clss_id     ,
			.query("     , a.pack_zone_id																		")
			.query("     , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm		")
			.query("     , b.vend_id as pack_vend_id															")
			.query("     , ( select vend_nm from vend_mst where vend_id = b.vend_id ) as  pack_vend_nm			")
			.query("     , b.sales_id , ( select bas_nm from base_mst where bas_id = b.sales_id ) as sales_nm	")
			.query("     , b.brand_id , ( select bas_nm from base_mst where bas_id = b.brand_id ) as brand_nm	")
			.query("     , b.maker_id , ( select bas_nm from base_mst where bas_id = b.maker_id ) as mfg_nm		")
			.query("     , case when a.po_pri = 0 then b.po_pri													")
			.query("            else a.po_pri end as po_pri, a.po_pri_type, a.po_pri_rt							")
			.query("     , b.txfree_yn																			")
			.query("from   itm_stor      a																		")
			.query("       join itm_mst  b on b.item_idcd = a.item_idcd												")
			.query("       left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd			")
			.query("where  a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and    a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("and    a.row_sts  = 0																		")
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
			.query("     , c.addr_1		   	as send_biz_addr_1 						") /* 공급자 주소 */
			.query("     , c.addr_2   		as send_biz_addr_2 						") /* 공급자 주소 상세주소 */
			.query("     , c.biz_kind    	as send_biz_cond 						") /* 공급자 업태 */
			.query("     , c.biz_type   	as send_biz_types 						") /* 공급자 종목 */

			.query("     , b.biz_no  	 	as recv_biz_no      					") /* 공급받는자 등록번호 */
			.query("     , b.biz_tel_no 	as recv_biz_tel_no 						") /* 공급받는자 전화번호 */
			.query("     , b.biz_fax_no 	as recv_biz_fax_no 						") /* 공급받는자 팩스번호 */
			.query("     , b.stor_nm     	as recv_biz_nm 							") /* 공급받는자 상호 */
			.query("     , b.biz_owner  	as recv_biz_owner 						") /* 공급받는자 성명 */
			.query("     , b.addr_1   		as recv_biz_addr_1 						") /* 공급받는자 주소 */
			.query("     , b.addr_2   		as recv_biz_addr_2 						") /* 공급받는자 주소 상세주소 */
			.query("     , b.biz_kind   	as recv_biz_cond  						") /* 공급받는자 업태 */
			.query("     , b.biz_type  		as recv_biz_types 						") /* 공급받는자 종목 */

			.query("     , a.qty 			as qty 									") /* 수량 */
			.query("     , a.sply_amt+a.txfree_amt as sply_amt		 				") /* 공급가 */
			.query("     , a.tax_amt  		as tax_amt 								") /* 세액 */
			.query("     , a.inv_amt 		as inv_amt 								") /* 계 */
			.query("     , a.user_memo 		as user_memo  							") /* 요청메모(kdarkdev수정) */
			.query("     , (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm	") /* 발행일자 */
			.query("     , b.stamp_url		as stamp_url							") /* 직인 이미지 URL */
			.query("     , d.emp_nm			as inv_user_nm 							") /* 작업자명 */

			.query(" from move_req_mst a											")
			.query("      join stor b on a.stor_id = b.stor_id						")
			.query("      left outer join stor c    on a.move_id    = c.stor_id		")
			.query("      left outer join usr_mst d on a.inv_usr_id = d.emp_id		")
			.query("where a.inv_no = :inv_no " , arg.fixParameter("inv_no"))
			.query("  and a.row_sts = 0 											")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query("       a.seq_dsp      as seq_dsp										") /* 항번 */
				.query("     , b.itm_shrt_cd  as itm_shrt_cd									") /* 단축코드 */
				.query("     , a.item_code       as item_code											") /* 코드 */
				.query("     , b.brcd_1       as brcd											") /* 바코드 */
				.query("     , concat(a.item_name , '/' , a.item_spec) as item_name						") /* 품목 / 규격 */
				.query("     , (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("     , ('(' + a.piece_qty + ')') as piece_qty							") /* 포장량 */
				.query("     , a.qty          as qty 											") /* 수량 */
				.query("     , a.pri          as pri 											") /* 단가 */
				.query("     , a.sply_amt+a.txfree_amt as sply_amt 								") /* 금액 */
				.query("     , a.tax_amt      as tax_amt 										") /* 세액 */
				.query("     , a.inv_amt      as inv_amt 										") /* 합계 */
				.query("from   move_req_dtl a 													")
				.query("       left outer join itm_mst b on a.item_idcd = b.item_idcd					")
				.query("where  a.inv_no = :inv_no " ,	arg.fixParameter("inv_no"))
				.query("and    a.row_sts = 0													")
				.query("order by line_seqn														")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}
}
