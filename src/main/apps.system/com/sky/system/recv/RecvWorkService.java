package com.sky.system.recv;

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
public class RecvWorkService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.amount) as amount ")
		;
		data.param // 조회
			.query("select a.inv_no                        ")
			.query("      ,a.inv_dt                        ")
			.query("      ,a.vend_id                       ")
			.query("      ,d.vend_cd                       ")
			.query("      ,a.vend_nm                       ")
			.query("      ,d.biz_tel_no as vend_biz_tel_no ")
			.query("      ,b.emp_nm    as inv_usr_nm     ")
			.query("      ,a.amount                        ")
			.query("      ,a.ori_no                        ")
			.query("      ,a.qty 	                       ")
			.query("      ,a.user_memo as recv_usr_memo   ")
			.query("      ,a.sts_cd                        ")
			.query("      ,a.row_clos                     ")
			.query("      ,a.get_dt                        ")
			.query("      ,d.biz_email as vend_email       ")
			.query("      ,d.biz_fax_no as vend_fax_no     ")
			.query("      ,a.inv_ship_gb                   ")
			.query("      ,e.dept_nm     as inv_dept_nm    ")
		;
		data.param // 조건
			.where("  from ist_mst a                     ")
			.where("       left outer join usr_mst b     ")
			.where("         on b.emp_id = a.inv_usr_id  ")
			.where("       left outer join vend_mst d     ")
			.where("         on d.vend_id = a.vend_id      ")
			.where("       left outer join dept_mst e     ")
			.where("         on e.dept_id = a.inv_dept_id  ")
			.where(" where a.stor_id = :stor_id          ", arg.fixParameter("stor_id" ))
			.where("   and a.row_sts = 0 				   ")
			.where("   and a.inv_dt between :fr_dt         ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt         ", arg.fixParameter("to_dt"))
			.where("   and a.vend_id = :vend_id            ", arg.getParameter("vend_id"  ))
			.where("   and a.inv_usr_id = :inv_usr_id    ", arg.getParameter("inv_usr_id"  ))
			.where(" order by a.inv_no desc                ")
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
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
		.query("select a.seq_dsp                   ")
		.query("      ,a.item_code                   ")
		.query("      ,a.item_name                   ")
		.query("      ,a.item_spec                   ")
		.query("      ,r.bas_nm as brand_nm       ")
		.query("      ,m.bas_nm as mfg_nm         ")
		.query("      ,b.unit_name                   ")
		.query("      ,a.unt_qty                  ")
		.query("      ,a.qty                       ")
		.query("      ,a.price                     ")
		.query("      ,a.unit_price                ")
		.query("      ,a.sply_amt                  ")
		.query("      ,a.tax                       ")
		.query("      ,a.tax_free                  ")
		.query("      ,a.amount                    ")
		.query("      ,a.org_ord_qty                  ")
		.query("      ,a.user_memo                 ")
		.query("      ,i.brcd_1 as barcode       ")
		.query("  from recv_item a                 ")
		.query("       left outer join item_unit b on b.unit_idcd = a.unit_idcd  ")
		.query("       left outer join itm_mst i   on i.item_idcd = a.item_idcd  ")
		.query("       left outer join base_mst r  on r.bas_id = i.brand_id ")
		.query("       left outer join base_mst m  on m.bas_id = i.mfg_id   ")
		.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 		       ")
		.query(" order by a.seq_top, a.line_seqn     ")
		;

		return data.selectForMap();
	}



	/**
	 * 삭제
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage temp = arg.newStorage("POS");
		temp.param
		 	.query("select sts_cd, qty from ist_mst where inv_no = :inv_no", arg.fixParameter("inv_no"))
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

		// 입고상태 재확인
		if ("0500".equals(work_stscd)) {
        	data.param
	    		.table("recv_item")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"   		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_nm"		, arg.getParameter("upt_nm"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

	    	data.param
				.table("ist_mst")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"   		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_nm"		, arg.getParameter("upt_nm"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

			// 재고(입출고 대장) 삭제
	        data.param
        		.table("stock_ledger")
        		.where("where inv_no = :inv_no ")
        		//
        		.unique("inv_no"   , arg.fixParameter("inv_no"))
	    	;data.attach(Action.delete);


			// 발주 번호
			String ori_no = arg.getParamText("ori_no");
			if (!"".equals(ori_no)) {

	        	// 발주상세 정보 입고수량 변경
				data.param
					.query("update po_item a                                          ")
					.query("   set(a.ship_qty, a.rest_qty) = (                        ")
					.query("       select isnull(sum(b.qty),0) , a.qty-isnull(sum(b.qty),0) ")
					.query("       from   recv_item b                                 ")
					.query("       where  b.ori_no  = a.inv_no                        ")
					.query("       and    b.ori_seq = a.line_seqn                       ")
					.query("       and    b.row_sts = 0                             ")
					.query("    )                                                     ")
					.query(" where a.inv_no  = :ori_no    ", arg.fixParameter("ori_no"))
					.action = Action.direct;
				data.attach();

		       	// 발주 정보 입고수량 변경
				data.param
					.query(" update po_mst a                                              ")
					.query(" set (a.ship_qty, a.rest_qty, a.sts_cd) = (                    ")
					.query("	  select sum(abs(b.ship_qty)), sum(abs(b.rest_qty))        ")
					.query("	       , case when sum(abs(b.ship_qty)) - sum(abs(b.qty)) >= 0    then '0500' ") // 매송완료
					.query("                  when a.qty =sum(abs(b.rest_qty)) then '0200' ") // 배송대기
					.query("	         else '0400' end                                   ") // 부분배송
					.query("	  from  po_item    b                                       ")
					.query("	  where b.inv_no  = a.inv_no                               ")
					.query("      and   b.row_sts = 0                                    ")
					.query("	)                                                          ")
					.query(" where a.inv_no  = :inv_no         ", arg.fixParameter("ori_no"))
					.action = Action.direct;
				data.attach();
			}
		}
		data.execute();
		return null;
	}

	/**
	 * invoice 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		// 발주 번호
		String ori_no = arg.getParamText("ori_no");
		// 수정
		if (ori_no == null || "".equals(ori_no)) {

			data.param // 쿼리문  입력
			.query("select a.inv_no                       ")
			.query("      ,a.ori_no                       ")
			.query("      ,a.inv_dt                       ")
			.query("      ,a.stor_id                     ")
			.query("      ,b.stor_nm                     ")
			.query("      ,a.vend_id                      ")
			.query("      ,a.vend_nm                      ")
			.query("      ,a.vend_gb                      ")
			.query("      ,a.inv_dept_id   ,d.dept_nm   as inv_dept_nm        ")
			.query("      ,a.inv_usr_id   ,c.emp_nm     as inv_usr_nm      ")
			.query("       ")
			.query("      ,a.tax_type                     ")
			.query("      ,a.tax_rt                     ")
			.query("      ,a.tax_free                     ")
			.query("      ,a.taxation                     ")
			.query("      ,a.sply_amt                     ")
			.query("      ,a.tax                          ")
			.query("      ,a.amount                       ")
			.query("      ,a.qty                          ")
			.query("      ,a.org_ord_qty                     ")
			.query("      ,a.user_memo   ")
			.query("      ,a.get_no                       ")
			.query("      ,a.get_dt                       ")
			.query("      ,a.tax_dt                       ")
			.query("  from ist_mst a                    ")
			.query("       left outer join stor b        ")
			.query("         on b.stor_id = a.stor_id   ")
			.query("       left outer join usr_mst c    ")
			.query("         on c.emp_id = a.inv_usr_id ")
			.query("       left outer join dept_mst d    ")
			.query("         on d.dept_id = a.inv_dept_id ")
			.query(" where a.inv_no = :inv_no             ", arg.fixParameter("inv_no" ))
			.query(" and   a.row_sts = 0				  ")
			;

			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param // 쿼리문  입력
				.query("select a.inv_no                    ")
				.query("      ,a.line_seqn                   ")
				.query("      ,a.seq_top                   ")
				.query("      ,a.seq_dsp                   ")
				.query("      ,a.item_idcd                   ")
				.query("      ,a.item_code                   ")
				.query("      ,a.item_name                   ")
				.query("      ,a.item_spec                   ")
				.query("      ,a.unit_idcd                   ")
				.query("      ,b.unit_name                   ")
				.query("      ,a.unt_qty                  ")
				.query("      ,a.stk_itm_id                  ")
				.query("      ,a.notax_yn                  ")
				.query("      ,a.unit_price                ")
				.query("      ,a.price                     ")
				.query("      ,a.qty                       ")
				.query("      ,a.org_ord_qty                  ")
				.query("      ,a.tax_free                  ")
				.query("      ,a.taxation                  ")
				.query("      ,a.sply_amt                  ")
				.query("      ,a.tax                       ")
				.query("      ,a.amount                    ")
				.query("      ,a.user_memo                 ")
				.query("      ,c.brcd_1 as barcode       ")
				.query("  from recv_item a                 ")
				.query("       left outer join item_unit b ")
				.query("          on b.unit_idcd = a.unit_idcd ")
				.query("       left outer join itm_mst c ")
				.query("          on c.item_idcd = a.item_idcd ")
				.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
				.query(" order by a.seq_top, a.line_seqn     ")
				;

				info.get(0).put("product", data.selectForMap());
			}

			return info;
		}
		// 발주입고
		else {

			data.param // 쿼리문  입력
				.query(" select a.hq_id, a.stor_grp, a.wrhs_id, a.stor_id            ")
				.query("      , a.pos_no, a.inv_no as ori_no, a.inv_dt as ori_dt, a.inv_tm as ori_tm, a.inv_gb            ")
				.query("      , a.inv_work_gb                ")
				.query("      , a.pack_no, a.pack_inv, a.vend_id, a.vend_nm, a.vend_gb                ")
				.query("      , a.req_msg, a.tax_type, a.tax_rt, a.qty            ")

				.query(" from   po_mst a                                                            ")
				.query(" where  a.inv_no    = :ori_no " 				, arg.fixParameter("ori_no"   ))
				.query("   and  a.row_clos = 0                                   ")
				.query("   and  a.row_sts = 0 				                  ")
		        .query("   and  a.inv_gb in ('1', '2')                         ")
		        .query("   and a.sts_cd in ('0200', '0400')                   ")
				.query("   and  a.rest_qty <> 0                                                ")
			;
			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param // 쿼리문  입력
				.query(" select a.hq_id, a.stor_grp, a.stor_id, a.wrhs_id, a.inv_no as ori_no ")
				.query("      , a.line_seqn , a.line_seqn as ori_seq, a.seq_top, a.seq_dsp, a.ret_yn, a.pack_no    ")
				.query("      , a.pack_inv, a.pack_seq, a.safe_dt          ")
				.query("      , a.unit_idcd , a.unt_qty, (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
				.query("      , a.item_idcd , a.item_code, a.item_name, a.item_spec, a.stk_itm_id , a.notax_yn , b.brcd_1 as barcode            ")
				.query("      , a.qty-a.ship_qty as rest_qty, a.qty-a.ship_qty as org_ord_qty, a.qty-a.ship_qty as qty              ")
				.query("      , a.unit_price,  a.price        ")
				.query("      , a.tax_free, a.taxation, a.sply_amt, a.tax, a.amount                ")
				.query("      , a.user_memo                                                        ")
				.query(" from   po_item a                                                    ")
				.query("        join itm_mst b on b.item_idcd = a.item_idcd					 			")
				.query(" where  a.inv_no  =  :ori_no " , arg.fixParameter("ori_no"                 ))
				.query("   and  a.rest_qty <> 0                                         ")
				.query("   and  a.row_sts = 0                                                    ")
				.query(" order by  a.seq_top, a.line_seqn                                            ")
				;

				info.get(0).put("product", data.selectForMap());
			}

			return info;
		}
	}

	/**
	 * invoice master 등록/수정
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			String invdt_new = row.fixParamText("inv_dt");
			String invdt_old = row.fixParamText("_inv_dt");

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				throw new ServiceException("삭제불가" );

			} else {

				// 입고정보 등록/수정
	        	data.param
	    			.table("ist_mst")
	    			.where("where inv_no = :inv_no ")
		        	//
					.insert("hq_id"    , row.getParameter("hq_id"   ))
					.insert("stor_grp"    , row.getParameter("stor_grp"   ))
					.insert("stor_id"    , row.getParameter("stor_id"   ))
					.insert("pos_no"      , row.getParameter("pos_no"     ))
					.unique("inv_no"      , row.fixParameter("inv_no"     ))
					.update("inv_dt"      , row.getParameter("inv_dt"     ))
					.update("inv_tm"      , row.getParameter("inv_tm"     ))
					.insert("inv_work_gb" , row.getParameter("inv_work_gb"))
					.update("inv_dept_id" , row.getParameter("inv_dept_id"))
					.update("inv_usr_id" , row.getParameter("inv_usr_id"))
					.insert("sts_cd"      , row.getParameter("sts_cd"     )) // 0500
					.update("ret_yn"      , row.getParameter("ret_yn"     ))
					.update("ori_no"      , row.getParameter("ori_no"     ))
					.update("get_no"      , row.getParameter("get_no"     ))
		        	.update("get_dt"      , row.getParameter("get_dt"     ))
					.update("tax_dt"      , row.getParameter("tax_dt"     ))
					.update("pay_dt"      , row.getParameter("pay_dt"     ))
					.insert("vend_id"     , row.getParameter("vend_id"    ))
					.insert("vend_nm"     , row.getParameter("vend_nm"    ))
					.insert("vend_gb"     , row.getParameter("vend_gb"    ))
					.update("tax_type"    , row.getParameter("tax_type"   ))
					.update("tax_rt"    , row.getParameter("tax_rt"   ))
					.update("tax_free"    , row.getParameter("tax_free"   ))
					.update("taxation"    , row.getParameter("taxation"   ))
					.update("sply_amt"    , row.getParameter("sply_amt"   ))
					.update("tax"         , row.getParameter("tax"        ))
					.update("amount"      , row.getParameter("amount"     ))
					.update("payable"     , row.getParameter("amount"     )) // 금액(amount) + 배송비
					.update("qty"         , row.getParameter("qty"        ))
					.insert("org_ord_qty"    , row.getParameter("org_ord_qty"   ))

					.update("user_memo"   	, row.getParameter("recv_usr_memo"  ))
					.update("upt_id"   		, row.getParameter("upt_id"  ))
					.update("upt_ip"   		, new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_id"   		, row.getParameter("crt_id"  ))
					.insert("crt_ip"   		, new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        	;data.attach(rowaction);

	        	if(row.getParameter("product", SqlResultMap.class) != null) {
	        		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
	        	}
			}

			// 발주 번호
			String ori_no = row.getParamText("ori_no");

			if (!"".equals(ori_no)) {
	        	// 발주상세 정보 입고수량 변경
				data.param
					.query("update po_item a                                          ")
					.query("   set(a.ship_qty, a.rest_qty) = (                        ")
					.query("       select isnull(sum(b.qty),0) , a.qty-isnull(sum(b.qty),0) ")
					.query("       from   recv_item b                                 ")
					.query("       where  b.ori_no  = a.inv_no                        ")
					.query("       and    b.ori_seq = a.line_seqn                       ")
					.query("       and    b.row_sts = 0                             ")
					.query("    )                                                     ")
					.query(" where a.inv_no  = :ori_no    ", row.fixParameter("ori_no"))
					.action = Action.direct;
				data.attach();

		       	// 발주 정보 입고수량 변경
		       	// 발주 정보 입고수량 변경
				data.param
					.query(" update po_mst a                                              ")
					.query(" set (a.ship_qty, a.rest_qty, a.sts_cd) = (                    ")
					.query("	  select sum(abs(b.ship_qty)), sum(abs(b.rest_qty))        ")
					.query("	       , case when sum(abs(b.ship_qty)) - sum(abs(b.qty)) >= 0    then '0500' ") // 매송완료
					.query("                  when a.qty =sum(abs(b.rest_qty)) then '0200' ") // 배송대기
					.query("	         else '0400' end                                   ") // 부분배송
					.query("	  from  po_item    b                                       ")
					.query("	  where b.inv_no  = a.inv_no                               ")
					.query("      and   b.row_sts = 0                                    ")
					.query("	)                                                          ")
					.query(" where a.inv_no  = :inv_no         ", row.fixParameter("ori_no"))
					.action = Action.direct;
				data.attach();
			}

			if (!invdt_old.equals(invdt_new)) {  /* 입고일자가 변경된 경우 */
				data.param
				.query("  update stock_ledger a  ")
				.query("     set a.inv_dt    = :invdt_new    			", invdt_new  											)
				.query("   where a.inv_no = :inv_no                 	",  row.fixParameter("inv_no"							))
				;data.attach(Action.direct);
			}

		}

		data.execute();
		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 *
	 * @param data
	 * @param map
	 * @throws Exception
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow inv, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				// 입고상세 삭제
	        	data.param
        			.table("recv_item")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))

        		;data.attach(rowaction);

				// 재고(입출고 대장) 삭제
	        	data.param
        			.table("stock_ledger")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))

	        	;data.attach(rowaction);

			} else {

				// 입고상세 등록/수정
	        	data.param
	    			.table("recv_item")
        			.where("where inv_no  = :inv_no  ")
        			.where("  and line_seqn = :line_seqn ")
		        	//
					.unique("hq_id"   , row.getParameter("hq_id"  ))
					.unique("stor_grp"   , row.getParameter("stor_grp"  ))
					.unique("stor_id"   , row.getParameter("stor_id"  ))
					.unique("inv_no"     , inv.getParameter("inv_no"    ))
					.unique("line_seqn"    , row.getParameter("line_seqn"   ))
					.insert("seq_top"    , row.getParameter("seq_top"   ))
					.update("seq_dsp"    , row.getParameter("seq_dsp"   ))
					.update("ret_yn"     , inv.getParameter("ret_yn"    ))
					.insert("ori_no"     , row.getParameter("ori_no"    ))
					.insert("ori_seq"    , row.getParameter("ori_seq"   ))
					.insert("item_idcd"    , row.getParameter("item_idcd"   ))
					.insert("item_code"    , row.getParameter("item_code"   ))
					.update("item_name"    , row.getParameter("item_name"   ))
					.update("item_spec"    , row.getParameter("item_spec"   ))
					.insert("unit_idcd"    , row.getParameter("unit_idcd"   ))
					.insert("unt_qty"   , row.getParameter("unt_qty"  ))
					.insert("stk_itm_id"   , row.getParameter("stk_itm_id"  ))
					.insert("notax_yn"   , row.getParameter("notax_yn"  ))
					.update("unit_price" , row.getParameter("unit_price"))
					.update("price"      , row.getParameter("price"     ))
					.update("qty"        , row.getParameter("qty"       ))
					.insert("org_ord_qty"   , row.getParameter("org_ord_qty"  ))
					.update("tax_free"   , row.getParameter("tax_free"  ))
					.update("taxation"   , row.getParameter("taxation"  ))
					.update("sply_amt"   , row.getParameter("sply_amt"  ))
					.update("tax"        , row.getParameter("tax"       ))
					.update("amount"     , row.getParameter("amount"    ))
					.update("user_memo"  , row.getParameter("user_memo" ))
					.update("row_sts"  , row.getParameter("row_sts" ))
					.update("upt_id"  , row.getParameter("upt_id" ))
					.update("upt_ip"  , arg.remoteAddress )
					.insert("crt_id"  , row.getParameter("crt_id" ))
					.insert("crt_ip"  , arg.remoteAddress )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction
				;
	        	data.attach();


				double work_qty = Double.parseDouble(row.getParamText("qty")) ;
				double unt_qty = Double.parseDouble(row.getParamText("unt_qty")) ;

				// 재고(입출고 대장) 등록/수정
	        	data.param
	    			.table("stock_ledger")
        			.where("where inv_no = :inv_no ")
        			.where("  and line_seqn = :line_seqn    ")
		        	//
					.insert("hq_id"   , row.getParameter("hq_id"   ))
					.update("stor_grp"   , row.getParameter("stor_grp"   ))
					.update("stor_id"   , row.getParameter("stor_id"   ))
					.unique("inv_no"     , inv.getParameter("inv_no"     ))
					.unique("line_seqn"    , row.getParameter("line_seqn"    ))
					.update("ori_no"     , row.getParameter("ori_no"     ))
					.update("ori_seq"    , row.getParameter("ori_seq"    ))
					.insert("inv_gb"     , new SqlParamText("'2'"        )) // '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
					.insert("inv_wk"     , new SqlParamText("'2071302'"  )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
					.update("dept_id"    , inv.getParameter("inv_dept_id"))
					.update("emp_id"    , inv.getParameter("inv_usr_id"))
					.update("cust_id"    , inv.getParameter("vend_id"    )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
					.insert("item_idcd"    , row.getParameter("item_idcd"    ))
					.insert("item_code"    , row.getParameter("item_code"    ))

					.insert("unit_idcd"    , row.getParameter("unit_idcd"    ))
					.insert("unt_qty"   , row.getParameter("unt_qty"   ))
					.insert("stk_itm_id"    , row.getParameter("stk_itm_id"    ))


					.update("unit_price" , row.getParameter("unit_price" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
					.update("cust_price" , row.getParameter("price"      )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
					.update("notax_yn"   , row.getParameter("notax_yn"   ))
					.update("tax_type"   , inv.getParameter("tax_type"   ))
					.update("tax_rt"   , inv.getParameter("tax_rt"   ))
					.update("sply_amt"   , row.getParameter("sply_amt"   ))
					.update("tax"        , row.getParameter("tax"        ))

					.update("stock"      , work_qty 			          ) //new SqlParamText(String.valueOf(Integer.parseInt(unt_qty) * Integer.parseInt(qty)))) // 입고(매입)는 플러스
					.update("qty"        , row.getParameter("qty"        ))
					.update("price"      , row.getParameter("price"      ))
					.update("amount"     , row.getParameter("amount"     ))
					.update("po_pri"   , row.getParameter("price"      )) // 매장간 거래는 매입단가 = 판매단가
					.update("po_amount"  , row.getParameter("amount"     )) // 매장간 거래는 매입금액 = 판매금액
					.action = rowaction;
	        	data.attach();
			}
		}
	}

	/**
	 * 발주 내역 검색
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getRefers(HttpRequestArgument arg, int page , int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
        data.param // 조회
	        .query("select a.inv_no                                       ")
	        .query("      ,a.inv_dt                                       ")
	        .query("      ,a.vend_nm                                      ")
	        .query("      ,a.qty                                          ")
	        .query("      ,a.rest_qty                                     ")
	        .query("      ,a.amount                                       ")
	        .query("      ,a.user_memo                                    ")
	    ;
	    data.param // 조건
	        .where("  from po_mst a                                      ")
	        .where(" where a.row_clos = 0                                ") // 0:, 1:마감
			.where("   and a.row_sts = 0 				                  ")
	        .where("   and a.inv_gb in ('1', '2')                         ") // 1:일반발주, 2:통합발주, 3:직납발주
	        .where("   and a.sts_cd in ('0200', '0400')                   ") // 0010:승인대기, 0200:발주승인, 0400:일부입고, 0500:입고완료
	        .where("   and a.rest_qty <> 0                                ")
	        .where("   and a.stor_id = :stor_id                         ", arg.fixParameter("stor_id"))
	        .where("   and a.inv_dt between :fr_dt                        ", arg.fixParameter("fr_dt"))
	        .where("                    and :to_dt                        ", arg.fixParameter("to_dt"))
	        .where("   and a.vend_id = :vend_id                           ", arg.getParameter("vend_id"))
	        .where(" order by a.inv_no desc                               ")
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
	 * @param arg
	 * @return
	 * @throws Exception
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
			.query("select  a.stor_grp     , a.stor_id ")
			.query("     ,  b.item_idcd      , b.item_code  , b.item_name     , b.item_ds  , b.item_spec , b.unt_qty    		  ")
			.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,  a.po_pri     , b.notax_yn , b.stk_itm_id  ")
			.query("     ,  b.cst_pri   , s.stock    , b.brcd_1 as barcode								")
			.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
			.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
			.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
			.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
		;
		data.param // 조건
			.query("from    itm_stor      a                               ")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("and     a.row_sts  = 0 " )
		;

		return data.selectForMap();
	}


	/**
	 * 상품검색
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getProductExcel(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select  a.stor_grp     , a.stor_id ")
			.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
			.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_ds  , b.item_spec      ")
			.query("     ,  b.cst_pri   , s.stock    , b.brcd_1 as barcode ")
			.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
			.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
			.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
			.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id ) as  vend_nm  " )
			.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
			.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
			.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
			.query("     ,  case when a.po_pri = 0 then b.po_pri else a.po_pri end as po_pri, a.po_pri_type, a.po_pri_rt " )
			.query("     ,  b.notax_yn                                      ")
			.query("from    itm_stor      a                               ")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     b.item_idcd    in (select item_idcd from scan_mst  where scan_cd = :item_code  group by item_idcd) " , arg.fixParameter("item_code"  ))
			.query("and     a.row_sts  = 0 " )
		;

		return data.selectForMap();
	}


	/**
	 * 출력
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  c.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  c.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  c.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  c.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  c.biz_owner   		as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  c.biz_addr_1   	as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  c.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  c.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  c.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.stor_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  		as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1  	 	as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, a.qty 			as qty 												") /* 수량 */
			.query("	, a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
			.query("	, a.tax  			as tax 												") /* 세액 */
			.query("	, a.amount 			as amount 											") /* 계 */
			.query("	, a.user_memo 		as user_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, dbo.today_char() as crt_dttm 											") /* 발행일자 */
			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */

			.query(" from ist_mst a															")
			.query("	  join stor b on a.stor_id = b.stor_id								")
			.query("	  left outer join vend_mst c on a.vend_id = c.vend_id					")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param // 쿼리문  입력
				.query("select 																			")
				.query(" 		a.seq_dsp   	as seq_dsp 												") /* 항번 */
				.query("	,   b.item_sc   	as item_sc 												") /* 단축코드 */
				.query("	,   a.item_code   	as item_code 												") /* 코드 */
				.query("	,   b.brcd_1   	as barcode 												") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 									") /* 품목 / 규격 */
				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('(' + a.unt_qty + ')') as unt_qty   									") /* 포장량 */
				.query("	,   a.qty 			as qty 													") /* 수량 */
				.query("	,   a.price 		as price 												") /* 단가 */
				.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
				.query("	,   a.tax 			as tax 													") /* 세액 */
				.query("	,   a.amount 		as amount 												") /* 합계 */
				.query("  from  recv_item a 															")
				.query("		join itm_mst b on a.item_idcd = b.item_idcd 								")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
				.query("   and  a.qty   <> 0	 														")
				.query("order by line_seqn		 														")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}
}
