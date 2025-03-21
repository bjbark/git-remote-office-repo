package com.sky.system.move.movesalelist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class MoveSaleListService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1)           as maxsize										")
			.total("     , sum(a.org_ord_qty) as org_ord_qty									")
			.total("     , sum(a.qty)         as sale_qty										")
			.total("     , sum(a.sply_amt)    as sply_amt										")
			.total("     , sum(a.tax_amt)     as tax_amt										")
			.total("     , sum(a.inv_amt)     as inv_amt										")
		;
		data.param // 조회
			.query("select a.row_clos         as sale_row_close									")
			.query("     , c.stor_nm          as sale_move_nm									")
			.query("     , d.emp_nm           as inv_user_nm									")
			.query("     , (select stor_nm from stor where stor_id = a.move_id) as recv_move_nm ")
			.query("     , a.inv_dt           as sale_inv_dt									")
			.query("     , a.inv_no           as sale_inv_no									")
			.query("     , a.org_ord_qty      as org_ord_qty									")
			.query("     , a.qty              as sale_qty										")
			.query("     , a.sply_amt															")
			.query("     , a.tax_amt															")
			.query("     , a.inv_amt															")
			.query("     , a.user_memo															")
		;
		data.param // 조건
			.where("  from move_ost_mst a														")
			.where("       left outer join stor c    on c.stor_id = a.stor_id					")
			.where("       left outer join usr_mst d on d.emp_id  = a.inv_usr_id				")
			.where(" where a.inv_dt between :fr_dt    ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt    ", arg.fixParameter("to_dt"))
			.where("   and a.stor_id = :stor_id       ", arg.getParameter("stor_id"))
			.where("   and a.move_id = :move_id       ", arg.getParameter("move_id"))
			.where("   and a.inv_usr_id = :inv_usr_id ", arg.getParameter("inv_usr_id"))
			.where("   and a.sts_cd = :sts_cd         ", arg.getParameter("sts_cd"))
			.where("   and a.row_sts = 0 														")
			.where(" order by a.inv_no desc														")
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
		.query("select a.seq_dsp																	")
		.query("     , a.item_code																		")
		.query("     , a.item_name																		")
		.query("     , a.item_spec																		")
		.query("     , c.unit_name																		")
		.query("     , a.piece_qty																	")
		.query("     , a.org_ord_qty  as org_ord_qty												")
		.query("     , case when a.org_ord_qty = 0 then 0 else a.org_ord_qty - a.qty end as rest_qty")
		.query("     , a.qty          as sale_qty													")
		.query("     , a.pri																		")
		.query("     , a.sply_amt																	")
		.query("     , a.tax_amt																	")
		.query("     , a.inv_amt																	")
		.query("     , a.user_memo																	")
		.query("     , a.deli_qty																	")
		.query("  from move_ost_dtl a																")
		.query("       left outer join itm_unit c on c.unit_idcd = a.unit_idcd							")
		.query(" where a.inv_no = :inv_no ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0																")
		.query(" order by a.seq_top, a.line_seqn														")
		;

		return data.selectForMap();
	}

	/**
	 * 출고예정 조회
	 *
	 */
	public SqlResultMap getPlan(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize																	")
			.total("      ,sum(d.inv_amt)      as req_amount													")
			.total("      ,sum(b.org_ord_qty)  as org_ord_qty													")
			.total("      ,sum(b.qty)          as qty															")
			.total("      ,sum(case when b.org_ord_qty = 0 then 0 else b.org_ord_qty - b.qty end) as rest_qty	")
			.total("      ,sum(b.inv_amt)      as inv_amt														")
		;
		data.param // 조회
			.query("select f.stor_nm      as req_stor_nm												")
			.query("      ,c.inv_no       as req_inv_no													")
			.query("      ,c.inv_dt       as req_inv_dt													")
			.query("      ,d.inv_amt      as req_amount													")
			.query("      ,d.user_memo     as req_usr_memo												")
			.query("      ,b.seq_dsp																	")
			.query("      ,b.item_code																		")
			.query("      ,b.item_name																		")
			.query("      ,b.item_spec																		")
			.query("      ,e.unit_name																		")
			.query("      ,b.piece_qty																	")
			.query("      ,b.org_ord_qty  as org_ord_qty												")
			.query("      ,b.qty																		")
			.query("      ,case when b.org_ord_qty = 0 then 0 else b.org_ord_qty - b.qty end as rest_qty")
			.query("      ,b.pri																		")
			.query("      ,b.inv_amt																	")
		;
		data.param // 조건
			.where("  from move_ost_mst a																")
			.where("       join move_ost_dtl b             on b.inv_no = a.inv_no						")
			.where("       left outer join move_req_mst c  on c.inv_no = a.org_inv_no					")
			.where("       left outer join move_req_dtl d  on d.inv_no = b.org_inv_no					")
			.where("                                      and d.line_seqn = b.org_inv_seq					")
			.where("       left outer join itm_unit e      on e.unit_idcd = b.unit_idcd						")
			.where("       left outer join stor f          on f.stor_id = c.stor_id						")
			.where(" where a.inv_dt between :fr_dt       ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt       ", arg.fixParameter("to_dt"))
			.where("   and a.stor_id = :stor_id          ", arg.getParameter("stor_id"))
			.where("   and a.move_id = :move_id          ", arg.getParameter("move_id"))
			.where("   and a.inv_usr_id = :inv_usr_id    ", arg.getParameter("inv_usr_id"))
			.where("   and a.sts_cd = :sts_cd            ", arg.getParameter("sts_cd"))
			.where("   and a.row_sts = 0 				                            ")
			.where(" order by b.inv_no desc, b.seq_top, b.line_seqn                   ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 상품별 조회
	 *
	 */
	public SqlResultMap getItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize																	")
			.total("     , sum(b.org_ord_qty)  as org_ord_qty													")
			.total("     , sum(b.qty)          as qty															")
			.total("     , sum(case when b.org_ord_qty = 0 then 0 else b.org_ord_qty - b.qty end ) as rest_qty	")
			.total("     , sum(b.inv_amt)      as inv_amt														")
		;
		data.param // 조회
			.query("select f.stor_nm																	")
			.query("     , (select stor_nm from stor where stor_id = a.move_id) as move_nm				")
			.query("     , a.inv_dt																		")
			.query("     , a.inv_no																		")
			.query("     , b.seq_dsp																	")
			.query("     , b.item_code																		")
			.query("     , b.item_name																		")
			.query("     , b.item_spec																		")
			.query("     , e.unit_name																		")
			.query("     , b.piece_qty																	")
			.query("     , b.org_ord_qty  as org_ord_qty												")
			.query("     , b.qty																		")
			.query("     , case when b.org_ord_qty = 0 then 0 else b.org_ord_qty - b.qty end as rest_qty")
			.query("     , b.pri																		")
			.query("     , b.inv_amt																	")
		;
		data.param // 조건
			.where("  from move_ost_mst a																")
			.where("       join move_ost_dtl b         on b.inv_no  = a.inv_no							")
			.where("       left outer join itm_unit e  on e.unit_idcd  = b.unit_idcd							")
			.where("       left outer join stor f      on f.stor_id = a.stor_id							")
			.where(" where a.inv_dt between :fr_dt     ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt     ", arg.fixParameter("to_dt"))
			.where("   and a.stor_id = :stor_id        ", arg.getParameter("stor_id"))
			.where("   and a.move_id = :move_id        ", arg.getParameter("move_id"))
			.where("   and a.inv_usr_id = :inv_usr_id  ", arg.getParameter("inv_usr_id"))
			.where("   and a.sts_cd = :sts_cd          ", arg.getParameter("sts_cd"))
			.where("   and a.row_sts = 0 																")
			.where(" order by b.inv_no desc, b.seq_top, b.line_seqn										")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
