package com.sky.system.move.moverecvlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class MoveRecvListService  extends DefaultServiceHandler {
	/**
	 * master 조회
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize																		")
			.total("      ,sum(a.sply_amt) as sply_amt																")
			.total("      ,sum(a.tax_amt)  as tax_amt																")
			.total("      ,sum(a.inv_amt)  as inv_amt																")
		;
		data.param // 조회
			.query("select a.row_clos      as recv_row_close														")
			.query("      ,d.stor_nm       as recv_move_nm															")
			.query("      ,e.emp_nm        as inv_user_nm															")
			.query("      ,(select stor_nm from stor where stor_id = a.move_id) as sale_move_nm						")
			.query("      ,a.inv_dt        as recv_inv_dt															")
			.query("      ,a.inv_no        as recv_inv_no															")
			.query("      ,b.inv_dt        as sale_inv_dt															")
			.query("      ,b.inv_no        as sale_inv_no															")
			.query("      ,a.sply_amt																				")
			.query("      ,a.tax_amt																				")
			.query("      ,a.inv_amt																				")
			.query("      ,a.user_memo      as req_usr_memo															")
			.query("      ,to_char(to_date(a.crt_dttm, 'yyyymmddhh24miss'), 'yyyy-mm-dd hh24:mi:ss') as req_crt_dttm")
		;
		data.param // 조건
			.where("  from move_ist_mst a																			")
			.where("       left outer join move_ost_mst b on b.inv_no  = a.org_inv_no								")
			.where("       left outer join stor d         on d.stor_id = a.stor_id									")
			.where("       left outer join usr_mst e      on e.emp_id  = a.inv_usr_id								")
			.where(" where a.inv_dt between :fr_dt     ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt     ", arg.fixParameter("to_dt"))
			.where("   and a.stor_id    = :stor_id     ", arg.getParameter("stor_id"))
			.where("   and a.move_id    = :move_id     ", arg.getParameter("move_id"))
			.where("   and a.inv_usr_id = :inv_usr_id  ", arg.getParameter("inv_usr_id"))
			.where("   and a.row_clos   = :row_clos    ", arg.getParameter("row_clos" 	))  // 마감 여부
			.where("   and a.row_sts = 0 				         ")
			.where(" order by a.inv_no desc                      ")
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
		.query("select a.seq_dsp																				")
		.query("      ,a.item_code																					")
		.query("      ,a.item_name																					")
		.query("      ,a.item_spec																					")
		.query("      ,c.unit_name																					")
		.query("      ,a.piece_qty																				")
		.query("      ,b.org_ord_qty                 as sale_base_qty											") // 요청잔여수량
		.query("      ,a.org_ord_qty                 as org_ord_qty												") // 출고잔여수량
		.query("      ,a.qty                         as recv_qty												") // 입고수량
		.query("      ,isnull(b.qty - b.deli_qty, 0) as rest_qty												") // 입고잔량
		.query("      ,a.pri																					")
		.query("      ,a.sply_amt																				")
		.query("      ,a.inv_amt																				")
		.query("      ,a.user_memo																				")
		.query("  from move_ist_dtl a																			")
		.query("       left outer join move_ost_dtl b on b.inv_no = a.org_inv_no  and b.line_seqn = a.org_inv_seq	")
		.query("       left outer join itm_unit c     on c.unit_idcd = a.unit_idcd									")
		.query(" where a.inv_no = :inv_no ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0																			")
		.query(" order by a.seq_top, a.line_seqn																	")
		;

		return data.selectForMap();
	}


	/**
	 * 상품별 현황
	 */
	public SqlResultMap getItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계
			.total("select count(1)          as maxsize														")
			.total("      ,sum(b.qty)        as qty															")
			.total("      ,sum(b.sply_amt)   as sply_amt													")
			.total("      ,sum(b.tax_amt)    as tax_amt														")
			.total("      ,sum(b.txfree_amt) as txfree_amt													")
			.total("      ,sum(b.inv_amt)    as inv_amt														")
			.total("      ,sum(p.rest_qty)   as no_delivery_qty												")
		;
		data.param // 조회
			.query("select n.stor_nm																		")
			.query("	  ,(select stor_nm from stor where stor_id = a.move_id) as move_nm					")
			.query("      ,a.inv_dt																			")
			.query("      ,a.inv_no																			")
			.query("      ,b.item_code																			")
			.query("      ,i.brcd_1  as brcd																")
			.query("      ,b.item_name																			")
			.query("      ,b.item_spec																			")
			.query("      ,u.unit_name																			")
			.query("      ,b.piece_qty																		")
			.query("      ,m.bas_nm  as mfg_nm																")
			.query("      ,b.qty																			")
			.query("      ,b.pri																			")
			.query("      ,b.sply_amt																		")
			.query("      ,b.tax_amt																		")
			.query("      ,b.txfree_amt																		")
			.query("      ,b.inv_amt																		")
			.query("      ,i.sale_pri as hq_price															")
			.query("      ,s.sale_pri as stor_price															")
			.query("      ,(select vend_nm from vend_mst where vend_id = s.vend_id) as vend_nm				")
			.query("      ,p.rest_qty as no_delivery_qty													")
			.query("      ,b.user_memo																		")
			.query("	  ,(select clss_desct from item_class where clss_id = i.clss_id)  as clss_desct		")
		;
		data.param // 조건
			.where("  from move_ist_mst a																	")
			.where("       join move_ist_dtl b            on b.inv_no  = a.inv_no							")
			.where("       left outer join move_ost_dtl p on p.inv_no  = b.org_inv_no						")
			.where("                                     and p.line_seqn = b.org_inv_seq						")
			.where("       left outer join stor n         on n.stor_id = a.stor_id							")
			.where("       left outer join itm_stor s     on s.stor_id = b.stor_id  and s.item_idcd = b.item_idcd	")
			.where("       left outer join itm_mst i      on i.item_idcd  = b.item_idcd							")
			.where("       left outer join itm_unit u     on u.unit_idcd  = b.unit_idcd							")
			.where("       left outer join base_mst m     on m.bas_id  = i.maker_id							")
			.where(" where a.row_sts = 0 																	")
			.where("   and a.inv_dt between :fr_dt     ", arg.getParameter("fr_dt"))  // 입고시작일자
			.where("                    and :to_dt     ", arg.getParameter("to_dt"))  // 입고종료일자
			.where("   and a.stor_id = :stor_id        ", arg.getParameter("stor_id")) // 입고사업장
			.where("   and a.move_id = :move_id        ", arg.getParameter("move_id")) // 출고사업장
			.where("   and a.inv_usr_id = :inv_usr_id  ", arg.getParameter("inv_usr_id"))
			.where(" order by b.seq_top, b.line_seqn															")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

}
