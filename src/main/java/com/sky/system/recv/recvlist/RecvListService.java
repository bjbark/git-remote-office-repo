package com.sky.system.recv.recvlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class RecvListService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );

		data.param // 집계
			.total("select count(1) as maxsize , sum(a.inv_amt) as inv_amt ")
		;
		data.param // 조회
			.query("select c.stor_nm													")
			.query("      ,a.inv_no														")
			.query("      ,a.inv_dt														")
			.query("      ,a.tax_dt														")
			.query("      ,a.vend_nm													")
			.query("      ,d.biz_tel_no as vend_biz_tel_no								")
			.query("      ,b.emp_nm     as inv_user_nm									")
			.query("      ,a.inv_amt													")
			.query("      ,a.org_inv_no													")
			.query("      ,a.get_dt														")
			.query("      ,a.row_clos													")
			.query("      ,a.user_memo													")
			.query("      ,a.inv_ship_gb												")
			.query("      ,f.dept_nm   as inv_dept_nm									")
		;
		data.param // 조건
			.where("  from ist_mst a													")
			.where("       left outer join usr_mst b  on b.emp_id  = a.inv_usr_id		")
			.where("       left outer join stor c     on c.stor_id = a.stor_id			")
			.where("       left outer join vend_mst d on d.vend_id = a.vend_id			")
			.where("       left outer join po_mst e   on e.inv_no  = a.org_inv_no		")
			.where("       left outer join dept_mst f on f.dept_id = a.inv_dept_id		")
			.where(" where a.row_sts = 0 				   ")
			.where("   and a.row_clos  =    :row_clos   ", arg.getParameter("row_clos" 	))  // 마감 여부
			.where("   and a.inv_dt between :fr_dt      ", fr_dt, "1".equals(inv_po_term))  // 입고시작일자
			.where("                    and :to_dt      ", to_dt, "1".equals(inv_po_term))  // 입고종료일자
			.where("   and a.get_dt between :fr_dt      ", fr_dt, "2".equals(inv_po_term))  // 전표시작일자
			.where("                    and :to_dt      ", to_dt, "2".equals(inv_po_term))  // 전표종료일자
			.where("   and a.tax_dt between :fr_dt      ", fr_dt, "3".equals(inv_po_term))  // 매입확정시작일자
			.where("                    and :to_dt      ", to_dt, "3".equals(inv_po_term))  // 매입확정종료일자
			.where("   and a.stor_id =      :stor_id    ", arg.getParameter("stor_id"))
			.where("   and d.vend_id =      :vend_id    ", arg.getParameter("vend_id"))
			.where("   and a.inv_usr_id =  :inv_usr_id  ", arg.getParameter("inv_usr_id"))
			.where("   and a.user_memo like %:user_memo%  ", arg.getParameter("user_memo"))
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
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select a.seq_dsp																	")
		.query("      ,a.item_code																		")
		.query("      ,a.item_name																		")
		.query("      ,a.item_spec																		")
		.query("      ,r.bas_nm as brand_nm															")
		.query("      ,m.bas_nm as mfg_nm															")
		.query("      ,b.unit_name																		")
		.query("      ,a.piece_qty																	")
		.query("      ,a.org_ord_qty																")
		.query("      ,case when a.org_ord_qty = 0 then 0 else a.org_ord_qty-a.qty end  as rest_qty	")
		.query("      ,a.qty																		")
		.query("      ,a.pri																		")
		.query("      ,a.sply_amt																	")
		.query("      ,a.tax_amt																	")
		.query("      ,a.txfree_amt																	")
		.query("      ,a.inv_amt																	")
		.query("      ,a.user_memo																	")
		.query("      ,i.brcd_1 as brcd																")
		.query("      ,i.itm_shrt_cd as itm_shrt_cd													")
		.query("  from recv_item a																	")
		.query("       left outer join itm_unit b    on b.unit_idcd = a.unit_idcd							")
		.query("       left outer join itm_mst i     on i.item_idcd = a.item_idcd							")
		.query("       left outer join base_mst r    on r.bas_id = i.brand_id						")
		.query("       left outer join base_mst m    on m.bas_id = i.maker_id						")
		.query(" where a.inv_no = :inv_no  ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 																")
		.query(" order by a.seq_top, a.line_seqn														")
		;

		return data.selectForMap();
	}

	/**
	 * 상품별 현황
	 */
	public SqlResultMap getItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );

		data.param // 집계
			.total("select count(1)          as maxsize													")
			.total("      ,sum(b.qty)        as qty														")
			.total("      ,sum(b.sply_amt)   as sply_amt												")
			.total("      ,sum(b.tax_amt)    as tax_amt													")
			.total("      ,sum(b.txfree_amt) as txfree_amt												")
			.total("      ,sum(b.inv_amt)    as inv_amt													")
			.total("      ,sum(p.rest_qty)   as no_delivery_qty											")
		;
		data.param // 조회
			.query("select n.stor_nm																	")
			.query("      ,a.inv_dt																		")
			.query("      ,a.inv_no																		")
			.query("      ,b.item_code																		")
			.query("      ,i.brcd_1      as brcd														")
			.query("      ,i.itm_shrt_cd as itm_shrt_cd													")
			.query("      ,b.item_name																		")
			.query("      ,b.item_spec																		")
			.query("      ,u.unit_name																		")
			.query("      ,b.piece_qty																	")
			.query("      ,m.bas_nm      as mfg_nm														")
			.query("      ,b.qty																		")
			.query("      ,b.pri																		")
			.query("      ,b.sply_amt																	")
			.query("      ,b.tax_amt																	")
			.query("      ,b.txfree_amt																	")
			.query("      ,b.inv_amt																	")
			.query("      ,i.sale_pri    as hq_price													")
			.query("      ,s.sale_pri    as stor_price													")
			.query("      ,a.vend_nm																	")
			.query("      ,p.rest_qty    as no_delivery_qty												")
			.query("      ,b.user_memo																	")
			.query("	  ,(select clss_desct from item_class where clss_id = i.clss_id)  as clss_desct	")
		;
		data.param // 조건
			.where("  from ist_mst a																	")
			.where("       join recv_item           b on b.inv_no  = a.inv_no							")
			.where("       left outer join po_item  p on p.inv_no  = b.org_inv_no and p.line_seqn = b.org_inv_seq   ")
			.where("       left outer join stor     n on n.stor_id = a.stor_id							")
			.where("       left outer join itm_stor s on s.stor_id = b.stor_id and s.item_idcd = b.item_idcd	")
			.where("       left outer join itm_mst  i on i.item_idcd  = b.item_idcd							")
			.where("       left outer join itm_unit u on u.unit_idcd  = b.unit_idcd							")
			.where("       left outer join base_mst m on m.bas_id  = i.maker_id							")
			.where(" where a.row_sts = 0																")
			.where("   and b.row_sts = 0																")
			.where("   and a.row_clos  =    :row_clos   ", arg.getParameter("row_clos" 	))  // 마감 여부
			.where("   and a.inv_dt between :fr_dt      ", fr_dt, "1".equals(inv_po_term))  // 입고시작일자
			.where("                    and :to_dt      ", to_dt, "1".equals(inv_po_term))  // 입고종료일자
			.where("   and a.get_dt between :fr_dt      ", fr_dt, "2".equals(inv_po_term))  // 전표시작일자
			.where("                    and :to_dt      ", to_dt, "2".equals(inv_po_term))  // 전표종료일자
			.where("   and a.tax_dt between :fr_dt      ", fr_dt, "3".equals(inv_po_term))  // 매입확정시작일자
			.where("                    and :to_dt      ", to_dt, "3".equals(inv_po_term))  // 매입확정종료일자
			.where("   and a.stor_id =      :stor_id    ", arg.getParameter("stor_id"))
			.where("   and a.vend_id =      :vend_id    ", arg.getParameter("vend_id"))
			.where("   and a.inv_usr_id =   :inv_usr_id ", arg.getParameter("inv_usr_id"))
			.where("   and b.user_memo like %:user_memo%  ", arg.getParameter("user_memo"))

			.where("   and i.clss_id in ( select clss_id from item_class start with clss_id = :clss_id connect by prior clss_id = prnt_id ) ", arg.getParameter("clss_id"))
			.where("   and b.item_idcd = :item_idcd  ", arg.getParameter("item_idcd"))
			.where(" order by b.seq_top, b.line_seqn       ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
