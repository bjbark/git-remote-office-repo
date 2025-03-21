package com.sky.system.move.movereqlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class MoveReqListService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize												")
			.total("     , sum(a.inv_amt) as inv_amt										")
		;
		data.param // 조회
			.query("select a.inv_no															")
			.query("     , a.inv_dt															")
			.query("     , (select stor_nm from stor where stor_id = a.stor_id) as stor_nm	")
			.query("     , (select stor_nm from stor where stor_id = a.move_id) as move_nm	")
			.query("     , b.emp_nm as inv_user_nm											")
			.query("     , a.inv_amt														")
			.query("     , a.user_memo														")
			.query("     , a.sts_cd															")
		;
		data.param // 조건
			.where("  from move_req_mst a													")
			.where("       left outer join usr_mst b on b.emp_id = a.inv_usr_id				")
			.where(" where a.inv_dt between :fr_dt    ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt    ", arg.fixParameter("to_dt"))
			.where("   and a.stor_id    = :stor_id    ", arg.getParameter("stor_id"))
			.where("   and a.move_id    = :move_id    ", arg.getParameter("move_id"))
			.where("   and a.inv_usr_id = :inv_usr_id ", arg.getParameter("inv_usr_id"))
			.where("   and a.sts_cd     = :sts_cd     ", arg.getParameter("sts_cd"))
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
		.query("select a.inv_no															")
		.query("      ,a.line_seqn														")
		.query("      ,a.seq_dsp														")
		.query("      ,a.item_idcd															")
		.query("      ,a.item_code															")
		.query("      ,a.item_name															")
		.query("      ,a.item_spec															")
		.query("      ,a.unit_idcd															")
		.query("      ,c.unit_name															")
		.query("      ,a.piece_qty														")
		.query("      ,a.qty															")
		.query("      ,a.pri															")
		.query("      ,a.sply_amt														")
		.query("      ,a.tax_amt														")
		.query("      ,a.inv_amt														")
		.query("      ,isnull(a.deli_qty, 0)         as deli_qty						")
		.query("      ,isnull(a.qty - a.deli_qty, 0) as rest_qty						")
		.query("      ,isnull(b.recv_qty, 0)         as recv_qty						")
		.query("      ,(isnull(a.deli_qty, 0) - isnull(b.recv_qty, 0) ) as recv_rest_qty")
		.query("      ,a.user_memo														")
		.query("  from move_req_dtl a													")
		.query("       left outer join (												")
		.query("                       select org_inv_no								")
		.query("                            , org_inv_seq								")
		.query("                            , sum(deli_qty) as recv_qty					")
		.query("                         from move_ost_dtl								")
		.query("                        where org_inv_no = :inv_no  ", arg.fixParameter("inv_no"))
		.query("                        group by org_inv_no, org_inv_seq				")
		.query("                       ) b												")
		.query("          on b.org_inv_no = a.inv_no									")
		.query("         and b.org_inv_seq = a.line_seqn									")
		.query("       left outer join itm_unit c										")
		.query("          on c.unit_idcd = a.unit_idcd										")
		.query(" where a.inv_no = :inv_no ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0													")
		.query(" order by a.seq_top, a.line_seqn											")
		;

		return data.selectForMap();
	}
}
