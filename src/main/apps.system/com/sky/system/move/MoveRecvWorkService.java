package com.sky.system.move;

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
public class MoveRecvWorkService  extends DefaultServiceHandler {
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.sply_amt) as sply_amt ")
			.total("      ,sum(a.tax)      as tax      ")
			.total("      ,sum(a.amount)   as amount   ")
		;
		data.param // 조회
			.query("select a.row_clos                  ")
			.query("      ,a.stor_id                   ")
			.query("      ,b.stor_nm                   ")
			.query("      ,c.emp_nm as inv_usr_nm       ")
			.query("      ,a.inv_no                     ")
			.query("      ,a.inv_dt                     ")
			.query("      ,a.sts_cd                     ")
			.query("      ,a.move_id                    ")
			.query("      ,(select stor_nm from stor where stor_id = a.move_id) as move_nm ")
			.query("      ,a.sply_amt                   ")
			.query("      ,a.tax                        ")
			.query("      ,a.amount                     ")
			.query("      ,a.ori_no                     ")
			.query("      ,a.qty                        ")
			.query("      ,d.biz_fax_no as fax_no       ")
			.query("      ,d.biz_email as email         ")
		;
		data.param // 조건
			.where("  from move_ist_mst a                  ")
			.where("       left outer join stor b      on b.stor_id = a.stor_id ")
			.where("       left outer join usr_mst c   on c.emp_id  = a.inv_usr_id ")
			.where("       left outer join stor d      on d.stor_id = a.move_id  ")
			.where(" where a.stor_id = :stor_id         ", arg.fixParameter("stor_id" ))
			.where("   and a.move_id  = :move_id        ", arg.getParameter("move_id"  ))
			.where("   and a.inv_dt between :fr_dt      ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt      ", arg.fixParameter("to_dt"))
			.where("   and a.inv_usr_id = :inv_usr_id   ", arg.getParameter("inv_usr_id"))
			.where("   and a.sts_cd = :sts_cd           ", arg.getParameter("sts_cd"))
			.where("   and a.row_sts = 0 				")
			.where(" order by a.inv_no desc             ")
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
		.query("select a.inv_no                             ")
		.query("      ,a.line_seqn                            ")
		.query("      ,a.seq_dsp                            ")
		.query("      ,a.item_idcd                             ")
		.query("      ,a.item_code                             ")
		.query("      ,a.item_name                             ")
		.query("      ,a.item_spec                             ")
		.query("      ,a.unit_idcd                             ")
		.query("      ,c.unit_name								")
		.query("      ,a.unt_qty							")
		.query("      ,b.org_ord_qty  as sale_base_qt		") // 요청잔여수량
		.query("      ,a.org_ord_qty  as org_ord_qty		") // 출고잔여수량
		.query("      ,a.qty                                ")
		.query("      ,a.price                              ")
		.query("      ,a.sply_amt                           ")
		.query("      ,a.tax                                ")
		.query("      ,a.amount                             ")
		.query("      ,a.user_memo                           ")
		.query("  from move_ist_dtl a                       ")
		.query("       left outer join move_ost_dtl b  on b.inv_no = a.ori_no and b.line_seqn = a.ori_seq ")
		.query("       left outer join item_unit c     on c.unit_idcd = a.unit_idcd            ")
		.query(" where a.inv_no = :recv_inv_no              ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0                   	    ")
		.query(" order by a.seq_top, a.line_seqn              ")
		;

		return data.selectForMap();
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

		// 이동 출고 번호
		String ori_no = arg.getParamText("ori_no");

		// 수정
		if (ori_no == null || "".equals(ori_no)) {

			data.param // 쿼리문  입력
            .query("select a.stor_id                        ")
            .query("      ,b.stor_nm                        ")
            .query("      ,a.inv_no                          ")
            .query("      ,a.inv_dt                          ")
            .query("      ,a.ori_no                          ")
            .query("      ,a.move_id                         ")
            .query("      ,(select stor_nm from stor where stor_id = a.move_id) as move_nm ")
            .query("      ,a.inv_dept_id                     ")
            .query("      ,a.inv_usr_id                     ")
            .query("      ,isnull(c.emp_nm, '') as inv_usr_nm ")
            .query("      ,a.sts_cd                          ")
			.query("      ,a.tax_type                        ")
			.query("      ,a.tax_rt                        ")
			.query("      ,a.tax_free                        ")
			.query("      ,a.taxation                        ")
			.query("      ,a.sply_amt                        ")
			.query("      ,a.tax                             ")
			.query("      ,a.amount                          ")
			.query("      ,a.qty                             ")
			.query("      ,a.org_ord_qty                     ")
			.query("      ,a.user_memo                        ")
            .query("  from move_ist_mst a                    ")
            .query("       join stor b                on b.stor_id = a.stor_id      ")
            .query("       left outer join usr_mst c  on c.emp_id = a.inv_usr_id    ")
            .query(" where a.inv_no = :inv_no                ", arg.fixParameter("inv_no"))
			.query("   and a.row_sts = 0 				     ")
			;

			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();

				data.param // 쿼리문  입력
				.query("select a.inv_no                                  ")
				.query("      ,a.line_seqn                                 ")
				.query("      ,a.seq_top                                 ")
				.query("      ,a.seq_dsp                                 ")
				.query("      ,a.ori_no                                  ")
				.query("      ,a.ori_seq                                 ")
				.query("      ,a.item_idcd                                 ")
				.query("      ,a.item_code                                 ")
				.query("      ,a.item_name                                 ")
				.query("      ,a.item_spec                                 ")
				.query("      ,a.mst_itm_id                             ")
				.query("      ,a.mst_itm_cd                             ")
				.query("      ,a.unit_idcd                                 ")
				.query("      ,c.unit_name                                 ")
				.query("      ,a.unt_qty                                ")
				.query("      ,a.notax_yn                                ")
				.query("      ,a.unit_price                              ")
				.query("      ,a.item_halin                              ")
				.query("      ,a.price                                   ")
				.query("      ,b.org_ord_qty               as sale_base_qty ") // 요청잔여수량
				.query("      ,a.org_ord_qty               as org_ord_qty      ") // 출고잔여수량
				.query("      ,a.qty                                     ")
				.query("      ,a.tax_free                                ")
				.query("      ,a.taxation                                ")
				.query("      ,a.sply_amt                                ")
				.query("      ,a.tax                                     ")
				.query("      ,a.amount                                  ")
				.query("      ,a.user_memo                               ")
				.query("  from move_ist_dtl a                          ")
				.query("       left outer join move_ost_dtl b on b.inv_no = a.ori_no  and b.line_seqn = a.ori_seq	")
				.query("       left outer join item_unit c    on c.unit_idcd = a.unit_idcd               				")
				.query(" where a.inv_no = :inv_no                        ", arg.fixParameter("inv_no"))
				.query("   and a.row_sts = 0                  		 ")
				.query(" order by a.seq_top, a.line_seqn                   ")
				;

				info.get(0).put("product", data.selectForMap());
			}

			return info;
		}
		// 요청입고
		else {

			data.param // 쿼리문  입력
			.query("select a.stor_id                   as move_id			")
			.query("      ,b.stor_nm                   as move_nm 			")
			.query("      ,dbo.to_char(sysdate, 'yyyymmdd') as inv_dt		")
			.query("      ,a.inv_no                     as ori_no			")
			.query("      ,a.tax_type                              			")
			.query("      ,a.tax_rt                              			")
			.query(" from move_ost_mst a                              		")
			.query("      join stor b on b.stor_id = a.stor_id              ")
			.query(" where a.inv_no = :ori_no ", arg.fixParameter("ori_no"))
			.query("   and a.row_sts = 0                   	   				")
			;
			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param // 쿼리문  입력
				.query("select a.inv_no    as ori_no									")
				.query("      ,a.line_seqn   as ori_seq									")
				.query("      ,a.line_seqn                                                ")
				.query("      ,a.seq_top                                                ")
				.query("      ,a.seq_dsp                                                ")
				.query("      ,a.mst_itm_id                                             ")
				.query("      ,a.mst_itm_cd                                             ")
				.query("      ,a.unit_idcd                                                 ")
				.query("      ,b.unit_name                                                 ")
				.query("      ,a.unt_qty                                                ")
				.query("      ,a.item_idcd                                                 ")
				.query("      ,a.item_code                                                 ")
				.query("      ,a.item_name                                                 ")
				.query("      ,a.item_spec                                                 ")
				.query("      ,a.notax_yn                                               ")
				.query("      ,a.unit_price                                             ")
				.query("      ,a.item_halin                                             ")
				.query("      ,a.price                                                  ")
				.query("      ,a.org_ord_qty                  as sale_base_qty			") // 요청잔여수량
				.query("      ,isnull(a.qty - a.ship_qty, 0)  as org_ord_qty			") // 출고잔여수량
				.query("      ,isnull(a.qty - a.ship_qty, 0)  as qty					")
				.query("  from move_ost_dtl a                                          	")
				.query("       left outer join item_unit b  on b.unit_idcd = a.unit_idcd      ")
				.query(" where a.inv_no = :ori_no   ", arg.fixParameter("ori_no"))
				.query("   and a.row_sts = 0                   						 	")
				.query(" order by a.seq_top, a.line_seqn                                  ")
				;

				info.get(0).put("product", data.selectForMap());
			}

			return info;
		}
	}

	/**
	 * invoice master 등록/수정/삭제
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

				throw new ServiceException("삭제불가");

			} else {

				// 이동입고정보 등록/수정
	        	data.param
	    			.table("move_ist_mst")
	    			.where("where inv_no = :inv_no ")
		        	//
					.insert("corp_id"    , row.getParameter("corp_id"    ))
					.insert("hq_id"    , row.getParameter("hq_id"    ))
					.insert("stor_grp"    , row.getParameter("stor_grp"    ))
					.insert("stor_id"    , row.getParameter("stor_id"    ))
					.insert("pos_no"      , row.getParameter("pos_no"      ))
					.unique("inv_no"      , row.fixParameter("inv_no"      ))
					.update("inv_dt"      , row.getParameter("inv_dt"      ))
					.insert("inv_tm"      , row.getParameter("inv_tm"      ))
					.update("inv_dept_id" , row.getParameter("inv_dept_id" ))
					.update("inv_usr_id" , row.getParameter("inv_usr_id" ))
					.insert("sts_cd"      , row.getParameter("sts_cd"      )) // 0500
					.insert("ori_no"      , row.getParameter("ori_no" ))
					.insert("move_id"     , row.getParameter("move_id"))
					.update("move_nm"     , row.getParameter("move_nm"))
					.update("tax_type"    , row.getParameter("tax_type"    ))
					.update("tax_rt"    , row.getParameter("tax_rt"    ))
					.update("tax_free"    , row.getParameter("tax_free"    ))
					.update("taxation"    , row.getParameter("taxation"    ))
					.update("sply_amt"    , row.getParameter("sply_amt"    ))
					.update("tax"         , row.getParameter("tax"         ))
					.update("amount"      , row.getParameter("amount"      ))
					.update("qty"         , row.getParameter("qty"         ))
					.insert("org_ord_qty"   , row.getParameter("org_ord_qty"   ))
					.update("user_memo"   	, row.getParameter("user_memo"   ))
					.update("upt_id"   		, row.getParameter("upt_id"   ))
					.update("upt_ip"   		, arg.remoteAddress				)
					.insert("crt_id"   		, row.getParameter("crt_id"   ))
					.insert("crt_ip"   		, arg.remoteAddress				)
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();

	        	if(row.getParameter("product", SqlResultMap.class) != null) {
	        		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
	        	}
			}

			// 이동출고정보 입고수량 변경
			data.param
			.query("update move_ost_mst a                                                             ")
			.query("   set (a.ship_qty, a.rest_qty, a.sts_cd) = (                                  ")
			.query("                                select isnull(sum(b.qty), 0)                      ")
			.query("                                      ,a.qty-isnull(sum(b.qty), 0)                ")
			.query("                                      ,case                                    ")
			.query("                                         when isnull(sum(b.qty), 0) = 0 then      ")
			.query("                                           '0300' -- 입고대기                  ")
			.query("                                         when a.qty != isnull(sum(b.qty), 0) then ")
			.query("                                           '0400' -- 부분입고                  ")
			.query("                                         else                                  ")
			.query("                                           '0500' -- 입고완료                  ")
			.query("                                       end                                     ")
			.query("                                  from move_ist_mst b                             ")
			.query("                                 where b.ori_no = a.inv_no                     ")
			.query("   								   and b.row_sts = 0                   	   ")
			.query("                                )                                              ")
			.query(" where a.inv_no = :ori_no                                                      ", row.fixParameter("ori_no"))
			.action = Action.direct;
			data.attach();

			// 이동출고상세 입고수량 변경
			data.param
			.query("update move_ost_dtl a                             ")
			.query("   set (a.ship_qty, a.rest_qty) = (                 ")
			.query("                    select isnull(sum(b.qty), 0)       ")
			.query("                          ,a.qty-isnull(sum(b.qty), 0) ")
			.query("                      from move_ist_dtl b         ")
			.query("                     where b.ori_no = a.inv_no      ")
			.query("                       and b.ori_seq = a.line_seqn    ")
			.query("   					   and b.row_sts = 0          ")
			.query("                    )                               ")
			.query(" where a.inv_no = :ori_no                           ", row.fixParameter("ori_no"))
			.action = Action.direct;
			data.attach();

			if (!invdt_old.equals(invdt_new)) {  /* 이동입고 일자가 변경된 경우 */
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
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

				// 재고(입출고 대장) 삭제
	        	data.param
        			.table("stock_ledger")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

			} else {

				// 이동입고상세 등록/수정
	        	data.param
	    			.table("move_ist_dtl")
        			.where("where inv_no = :inv_no ")
        			.where("  and line_seqn = :line_seqn    ")
		        	//
					.unique("hq_id"   , row.getParameter("hq_id"   ))
					.unique("stor_grp"   , row.getParameter("stor_grp"   ))
					.unique("stor_id"   , row.getParameter("stor_id"   ))
					.unique("inv_no"     , row.getParameter("inv_no"     ))
					.unique("line_seqn"    , row.getParameter("line_seqn"    ))
					.insert("seq_top"    , row.getParameter("seq_top"    ))
					.update("seq_dsp"    , row.getParameter("seq_dsp"    ))
					.insert("ori_no"     , row.getParameter("ori_no"     ))
					.insert("ori_seq"    , row.getParameter("ori_seq"    ))
					.insert("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
					.insert("mst_itm_cd"    , row.getParameter("mst_itm_cd"    ))
					.insert("unit_idcd"    , row.getParameter("unit_idcd"    ))
					.insert("unt_qty"   , row.getParameter("unt_qty"   ))
					.insert("item_idcd"    , row.getParameter("item_idcd"    ))
					.insert("item_code"    , row.getParameter("item_code"    ))
					.update("item_name"    , row.getParameter("item_name"    ))
					.update("item_spec"    , row.getParameter("item_spec"    ))
					.update("notax_yn"   , row.getParameter("notax_yn"   ))
					.update("unit_price" , row.getParameter("unit_price" ))
					.update("item_halin" , row.getParameter("item_halin" ))
					.update("price"      , row.getParameter("price"      ))
					.update("qty"        , row.getParameter("qty"        ))
					.insert("org_ord_qty"   , row.getParameter("org_ord_qty"   ))
					.update("tax_free"  , row.getParameter("tax_free"   ))
					.update("taxation"  , row.getParameter("taxation"   ))
					.update("sply_amt"  , row.getParameter("sply_amt"   ))
					.update("tax"       , row.getParameter("tax"        ))
					.update("amount"    , row.getParameter("amount"     ))
					.update("user_memo"  , row.getParameter("user_memo"  ))
					.update("row_sts"  	, row.getParameter("row_sts"  ))
					.update("upt_id"  	, row.getParameter("crt_id"  ))
					.update("upt_ip"  	, arg.remoteAddress			  )
					.insert("crt_id"  	, row.getParameter("crt_id"  ))
					.insert("crt_ip"  	, arg.remoteAddress			  )
					.update("upt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();

	        	String unt_qty = (String) row.getParameter("unt_qty");
	        	unt_qty = "".equals(unt_qty)? "0" : unt_qty;
	        	String qty = (String) row.getParameter("qty");
	        	qty = "".equals(qty)? "0" : qty;

				// 재고(입출고 대장) 등록/수정
	        	data.param
	    			.table("stock_ledger")
        			.where("where inv_no = :inv_no ")
        			.where("  and line_seqn = :line_seqn    ")
		        	//
					.insert("hq_id"   , row.getParameter("hq_id"   ))
					.update("stor_grp"   , row.getParameter("stor_grp"   ))
					.update("stor_id"   , row.getParameter("stor_id"   ))
					.unique("inv_no"     , row.getParameter("inv_no"     ))
					.unique("line_seqn"    , row.getParameter("line_seqn"    ))
					.update("ori_no"     , row.getParameter("ori_no"     ))
					.update("ori_seq"    , row.getParameter("ori_seq"    ))
					.insert("inv_gb"     , new SqlParamText("'1'"        )) // '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
					.insert("inv_wk"     , new SqlParamText("'2071304'"  )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
					.update("dept_id"    , mst.getParameter("inv_dept_id"))
					.update("emp_id"    , mst.getParameter("inv_usr_id"))
					.update("cust_id"    , mst.getParameter("move_id"    )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
					.update("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
					.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"    ))
					.update("unit_idcd"    , row.getParameter("unit_idcd"    ))
					.update("unt_qty"   , row.getParameter("unt_qty"   ))
					.update("item_idcd"    , row.getParameter("item_idcd"    ))
					.update("item_code"    , row.getParameter("item_code"    ))
					.update("stock"      , new SqlParamText(String.valueOf(Integer.parseInt(qty)))) // 이동입고는 플러스
					.update("eaqty"      , new SqlParamText(String.valueOf(Integer.parseInt(unt_qty) * Integer.parseInt(qty)))) // 이동입고는 플러스
					.update("qty"        , row.getParameter("qty"        ))
					.update("price"      , row.getParameter("price"      ))
					.update("amount"     , row.getParameter("amount"     ))
					.update("po_pri"   , row.getParameter("price"      )) // 매장간 거래는 매입단가 = 판매단가
					.update("po_amount"  , row.getParameter("amount"     )) // 매장간 거래는 매입금액 = 판매금액
					.update("user_memo"  , row.getParameter("user_memo"  ))
					.update("sys_memo"  , row.getParameter("sys_memo"  ))
					.update("row_ord"  , row.getParameter("row_ord"  ))
					.update("row_sts"  , row.getParameter("row_sts"  ))
					.update("upt_id"  , row.getParameter("upt_id"  ))
					.update("upt_ip"  , arg.remoteAddress			  )
					.update("upt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_id"  , row.getParameter("crt_id"  ))
					.insert("crt_ip"  , arg.remoteAddress			  )
					.insert("crt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("price_no"   , new SqlParamText("'9'"        )) // 거래처 단가 번호 [ 1~5 출하가/6:소비자가/7:포스가/8:B2C/9:구매가/10:직원가/11:B2B ]
					.update("unit_price" , row.getParameter("unit_price" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
					.update("cust_price" , row.getParameter("price"      )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
					.update("notax_yn"   , row.getParameter("notax_yn"   ))
					.update("tax_type"   , mst.getParameter("tax_type"   ))
					.update("tax_rt"   , mst.getParameter("tax_rt"   ))
					.update("sply_amt"   , row.getParameter("sply_amt"   ))
					.update("tax"        , row.getParameter("tax"        ))
					.action = rowaction;
	        	data.attach();
			}
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

		DataMessage temp = arg.newStorage("POS");
		temp.param
		 	.query("select sts_cd, qty from move_ist_mst where inv_no = :inv_no", arg.fixParameter("inv_no"))
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

		// 상태 재확인
		if ("0500".equals(work_stscd)) {
        	data.param
	    		.table("move_ist_dtl")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"   		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_id"		, arg.getParameter("upt_id"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

	    	data.param
				.table("move_ist_mst")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"   		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_id"		, arg.getParameter("upt_id"))
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


			// 이동출고정보 입고수량 변경
			data.param
			.query("update move_ost_mst a                                                             ")
			.query("   set (a.ship_qty, a.rest_qty, a.sts_cd) = (                                  ")
			.query("                                select isnull(sum(b.qty), 0)                      ")
			.query("                                      ,a.qty-isnull(sum(b.qty), 0)                ")
			.query("                                      ,case                                    ")
			.query("                                         when isnull(sum(b.qty), 0) = 0 then      ")
			.query("                                           '0300' -- 입고대기                  ")
			.query("                                         when a.qty != isnull(sum(b.qty), 0) then ")
			.query("                                           '0400' -- 부분입고                  ")
			.query("                                         else                                  ")
			.query("                                           '0500' -- 입고완료                  ")
			.query("                                       end                                     ")
			.query("                                  from move_ist_mst b                             ")
			.query("                                 where b.ori_no = a.inv_no                     ")
			.query("                                   and b.row_sts = 0                         ")
			.query("                                )                                              ")
			.query(" where a.inv_no = :ori_no                                                      ", arg.fixParameter("ori_no"))
			.action = Action.direct;
			data.attach();

			// 이동출고상세 입고수량 변경
			data.param
			.query("update move_ost_dtl a                             ")
			.query("   set (a.ship_qty, a.rest_qty) = (                 ")
			.query("                    select isnull(sum(b.qty), 0)       ")
			.query("                          ,a.qty-isnull(sum(b.qty), 0) ")
			.query("                      from move_ist_dtl b         ")
			.query("                     where b.ori_no = a.inv_no      ")
			.query("                       and b.ori_seq = a.line_seqn    ")
			.query("                       and b.row_sts = 0          ")
			.query("                    )                               ")
			.query(" where a.inv_no = :ori_no                           ", arg.fixParameter("ori_no"))
			.action = Action.direct;
			data.attach();
		}

		data.execute();
		return null;
	}

	/**
	 * dialog 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDialog(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.amount) as amount ")
		;
		data.param // 조회
			.query("select a.stor_id                      ")
			.query("      ,isnull(b.stor_nm, '') as stor_nm ")
			.query("      ,a.inv_no                        ")
			.query("      ,a.inv_dt                        ")
			.query("      ,isnull(c.emp_nm, '')  as emp_nm  ")
			.query("      ,(select stor_nm from stor where stor_id = a.move_id) as move_nm ")
			.query("      ,a.user_memo                     ")
			.query("      ,a.amount                        ")
			.query("      ,a.sts_cd                        ")
		;
		data.param // 조건
			.where("  from move_ost_mst a                     ")
			.where("       left outer join stor b     on b.stor_id = a.stor_id    ")
			.where("       left outer join usr_mst c  on c.emp_id = a.inv_usr_id  ")
			.where(" where a.sts_cd in ('0300', '0400')    ") // 0300:입고대기, 0400:부분입고
			.where("   and a.row_sts = 0 				   ")
			.where("   and a.move_id = :stor_id           ", arg.getParameter("stor_id"))
			.where("   and a.inv_dt between :fr_dt         ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt         ", arg.fixParameter("to_dt"))
			.where("   and b.stor_nm like %:stor_nm%     ", arg.getParameter("stor_nm"))
			.where(" order by a.inv_no desc                ")
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

		data.param // 쿼리문  입력
		.query("select  a.stor_grp    , a.stor_id																		")
		.query("     ,  a.mst_itm_id  , b.mst_itm_cd , b.unt_qty														")
		.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name					")
		.query("     ,  b.item_idcd      , b.item_code     , b.item_name  , b.item_ds  , b.item_spec								")
		.query("     ,  b.cst_pri     , s.stock																			")
		.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri	")
		.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm 					")
		.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm ")
		.query("     ,  b.vend_id as pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.vend_id ) as  pack_vend_nm  " )
		.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm			")
		.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm			")
		.query("	 ,  b.mfg_id       , ( select bas_nm from base_mst where bas_id = b.mfg_id )   as  mfg_nm			")
		.query("     ,  case when a.po_pri = 0 then b.po_pri else a.po_pri end as po_pri, a.po_pri_type, a.po_pri_rt	")
		.query("     ,  b.notax_yn                                      												")
		.query("from    itm_stor      a                               													")
		.query("        join itm_mst  b on b.item_idcd = a.item_idcd      													")
		.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd 					")
		.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
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
			.query("	,  c.stor_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  c.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  c.addr_1 	  	as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  c.addr_2   		as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  c.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  c.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.stor_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1 		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, a.qty 			as qty 												") /* 수량 */
			.query("	, a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
			.query("	, a.tax  			as tax 												") /* 세액 */
			.query("	, a.amount 			as amount 											") /* 계 */
			.query("	, a.user_memo 		as user_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url       as stamp_url										") /* 직인 이미지 URL */
			.query("	, d.emp_nm         as inv_usr_nm 										") /* 작업자명 */

			.query(" from move_ist_mst a															")
			.query("	  join stor b               on a.stor_id = b.stor_id								")
			.query("	  left outer join stor  c   on a.move_id = c.stor_id						")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id				")
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
				.query("	,   a.item_code   	    as item_code 												") /* 코드 */
				.query("	,   b.brcd_1   	    as barcode 												") /* 바코드 */
				.query("	,   (a.item_name+'/'+a.item_spec) as item_name 										") /* 품목 / 규격 */
				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name		") /* 단위 */
				.query("    ,   ('('+a.unt_qty+')') as unt_qty   										") /* 포장량 */
				.query("	,   a.qty 			as qty 													") /* 수량 */
				.query("	,   a.price 		as price 												") /* 단가 */
				.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
				.query("	,   a.tax 			as tax 													") /* 세액 */
				.query("	,   a.amount 		as amount 												") /* 합계 */
				.query("  from  move_ist_dtl a 															")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 						")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
				.query("   and  a.row_sts = 0                   										")
				.query("order by line_seqn		 														")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

	/**
	 */
	public SqlResultMap getPlan(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(b.org_ord_qty)  as org_ord_qty	")
			.total("      ,sum(b.qty)          as qty           ")
			.total("      ,sum(case when b.org_ord_qty-b.qty>0 then b.org_ord_qty-b.qty else 0 end) as rest_sale_qty ")
			.total("      ,sum(b.ship_qty)     as ship_qty      ")
			.total("      ,sum(b.rest_qty)     as rest_qty      ")
			.total("      ,sum(b.amount)       as amount        ")
		;
		data.param // 조회
			.query("select b.item_code                             ")
			.query("      ,b.item_name                             ")
			.query("      ,b.item_spec                             ")
			.query("      ,c.unit_name                             ")
			.query("      ,b.unt_qty                            ")
			.query("      ,b.org_ord_qty                        ")
			.query("      ,b.qty                                ")
			.query("      ,case when b.org_ord_qty-b.qty>0 then b.org_ord_qty-b.qty else 0 end as rest_sale_qty ")
			.query("      ,b.ship_qty                           ")
			.query("      ,b.rest_qty                           ")
			.query("      ,(select stor_nm from stor where stor_id = a.stor_id) as stor_nm	")
			.query("      ,a.inv_dt                                                         ")
			.query("      ,b.inv_no                                                         ")
			.query("      ,b.seq_dsp                                                        ")
			.query("      ,b.price                                                          ")
			.query("      ,b.amount                                                         ")
		;
		data.param // 조건
			.where("  from move_ost_mst a                                                   ")
			.where("       join move_ost_dtl b         on b.inv_no = a.inv_no               ")
			.where("       left outer join item_unit c on c.unit_idcd = b.unit_idcd               ")
			.where(" where a.row_clos = 0                                                   ")
			.where("   and a.row_sts = 0                                                    ")
			.where("   and a.sts_cd in ('0300', '0400')                                     ") // 0300:입고대기, 0400:부분입고
			.where("   and a.move_id = :stor_id                                             ", arg.fixParameter("stor_id"))
			.where(" order by a.inv_no desc, b.seq_top, b.line_seqn                           ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}
}
