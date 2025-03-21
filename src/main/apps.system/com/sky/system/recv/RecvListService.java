package com.sky.system.recv;

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
	 * @param arg
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );

		data.param // 집계
			.total("select count(1) as maxsize , sum(a.amount) as amount ")
		;
		data.param // 조회
			.query("select c.stor_nm                      ")
			.query("      ,a.inv_no                        ")
			.query("      ,a.inv_dt                        ")
			.query("      ,a.tax_dt                        ")
			.query("      ,a.vend_nm                       ")
			.query("      ,d.biz_tel_no as vend_biz_tel_no ")
			.query("      ,b.emp_nm    as inv_usr_nm     ")
			.query("      ,a.amount                        ")
			.query("      ,a.ori_no                        ")
			.query("      ,a.get_dt                        ")
			.query("      ,a.user_memo as recv_usr_memo   ")
			.query("      ,e.user_memo as user_memo        ")
			.query("      ,a.inv_ship_gb                   ")
			.query("      ,f.dept_nm     as inv_dept_nm    ")
		;
		data.param // 조건
			.where("  from ist_mst a                     ")
			.where("       left outer join usr_mst b     ")
			.where("         on b.emp_id = a.inv_usr_id  ")
			.where("       left outer join stor c         ")
			.where("         on c.stor_id = a.stor_id    ")
			.where("       left outer join vend_mst d     ")
			.where("         on d.vend_id = a.vend_id      ")
			.where("       left outer join po_mst e       ")
			.where("         on e.inv_no = a.ori_no        ")
			.where("       left outer join dept_mst f     ")
			.where("         on f.dept_id = a.inv_dept_id  ")
			.where(" where a.row_sts = 0 				   ")
			.where("   and a.inv_dt between :fr_dt         ", fr_dt, "1".equals(inv_po_term))  // 입고시작일자
			.where("                    and :to_dt         ", to_dt, "1".equals(inv_po_term))  // 입고종료일자
			.where("   and a.get_dt between :fr_dt         ", fr_dt, "2".equals(inv_po_term))  // 전표시작일자
			.where("                    and :to_dt         ", to_dt, "2".equals(inv_po_term))  // 전표종료일자
			.where("   and a.tax_dt between :fr_dt         ", fr_dt, "3".equals(inv_po_term))  // 매입확정시작일자
			.where("                    and :to_dt         ", to_dt, "3".equals(inv_po_term))  // 매입확정종료일자
			.where("   and a.stor_id = :stor_id          ", arg.getParameter("stor_id"))
			.where("   and d.vend_id = :vend_id            ", arg.getParameter("vend_id"))
			.where("   and a.inv_usr_id = :inv_usr_id    ", arg.getParameter("inv_usr_id"))
			.where("   and a.user_memo like %:user_memo%   ", arg.getParameter("user_memo"))
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
		.query("select a.seq_dsp                                              ")
		.query("      ,a.item_code                                              ")
		.query("      ,a.item_name                                              ")
		.query("      ,a.item_spec                                              ")
		.query("      ,r.bas_nm as brand_nm                                  ")
		.query("      ,m.bas_nm as mfg_nm                                    ")
		.query("      ,b.unit_name                                              ")
		.query("      ,a.unt_qty                                             ")
		.query("      ,a.org_ord_qty                                             ")
		.query("      ,case when a.org_ord_qty = 0 then 0 else a.org_ord_qty-a.qty end as rest_qty ")
		.query("      ,a.qty                                                  ")
		.query("      ,a.price                                                ")
		.query("      ,a.sply_amt                                             ")
		.query("      ,a.tax                                                  ")
		.query("      ,a.tax_free                                             ")
		.query("      ,a.amount                                               ")
		.query("      ,a.user_memo                                            ")
		.query("      ,i.brcd_1 as barcode                                  ")
		.query("  from recv_item a                                            ")
		.query("       left outer join item_unit b                            ")
		.query("         on b.unit_idcd = a.unit_idcd                             ")
		.query("       left outer join itm_mst i                            ")
		.query("         on i.item_idcd = a.item_idcd                             ")
		.query("       left outer join base_mst r                            ")
		.query("         on r.bas_id = i.brand_id                            ")
		.query("       left outer join base_mst m                            ")
		.query("         on m.bas_id = i.mfg_id                              ")
		.query(" where a.inv_no = :inv_no                                     ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 				  ")
		.query(" order by a.seq_top, a.line_seqn                                ")
		;

		return data.selectForMap();
	}

	/**
	 * 상품별 현황
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );

		data.param // 집계
			.total("select count(1)        as maxsize         ")
			.total("      ,sum(b.qty)      as qty             ")
			.total("      ,sum(b.sply_amt) as sply_amt        ")
			.total("      ,sum(b.tax)      as tax             ")
			.total("      ,sum(b.tax_free) as tax_free        ")
			.total("      ,sum(b.amount)   as amount          ")
			.total("      ,sum(p.rest_qty) as no_delivery_qty ")
		;
		data.param // 조회
			.query("select n.stor_nm                    ")
			.query("      ,a.inv_dt                      ")
			.query("      ,a.inv_no                      ")
			.query("      ,b.item_code                     ")
			.query("      ,i.brcd_1 as barcode         ")
			.query("      ,b.item_name                     ")
			.query("      ,b.item_spec                     ")
			.query("      ,u.unit_name                     ")
			.query("      ,b.unt_qty                    ")
			.query("      ,m.bas_nm as mfg_nm           ")
			.query("      ,b.qty                         ")
			.query("      ,b.price                       ")
			.query("      ,b.sply_amt                    ")
			.query("      ,b.tax                         ")
			.query("      ,b.tax_free                    ")
			.query("      ,b.amount                      ")
			.query("      ,i.stad_sale_pri as bonsa_price   ")
			.query("      ,s.stad_sale_pri as stor_price   ")
			.query("      ,a.vend_nm                     ")
			.query("      ,p.rest_qty as no_delivery_qty ")
			.query("      ,b.user_memo                   ")
			.query("      ,(select class_nm from item_class where class_id = substring(i.class_id, 0, 2))  as class_1 ")
			.query("	  ,(select class_nm from item_class where class_id = substring(i.class_id, 0, 4))  as class_2 ")
			.query("	  ,(select class_nm from item_class where class_id = substring(i.class_id, 0, 6))  as class_3 ")
		;
		data.param // 조건
			.where("  from ist_mst a                   ")
			.where("       join recv_item b              on b.inv_no = a.inv_no      ")
			.where("       left outer join po_item p     on p.inv_no = b.ori_no   and p.line_seqn = b.ori_seq    ")
			.where("       left outer join stor n        on n.stor_id = a.stor_id  ")
			.where("       left outer join itm_stor s    on s.stor_id = b.stor_id and s.item_idcd = b.item_idcd    ")
			.where("       left outer join itm_mst i     on i.item_idcd = b.item_idcd    ")
			.where("       left outer join item_unit u   on u.unit_idcd = b.unit_idcd    ")
			.where("       left outer join base_mst m    on m.bas_id = i.mfg_id     ")
			.where(" where a.row_sts = 0 				 ")
			.where("   and b.row_sts = 0 				 ")
			.where("   and a.inv_dt between :fr_dt       ", fr_dt, "1".equals(inv_po_term))  // 입고시작일자
			.where("                    and :to_dt       ", to_dt, "1".equals(inv_po_term))  // 입고종료일자
			.where("   and a.get_dt between :fr_dt       ", fr_dt, "2".equals(inv_po_term))  // 전표시작일자
			.where("                    and :to_dt       ", to_dt, "2".equals(inv_po_term))  // 전표종료일자
			.where("   and a.tax_dt between :fr_dt       ", fr_dt, "3".equals(inv_po_term))  // 매입확정시작일자
			.where("                    and :to_dt       ", to_dt, "3".equals(inv_po_term))  // 매입확정종료일자
			.where("   and a.stor_id = :stor_id        ", arg.getParameter("stor_id"))
			.where("   and a.vend_id = :vend_id          ", arg.getParameter("vend_id"))
			.where("   and a.inv_usr_id = :inv_usr_id  ", arg.getParameter("inv_usr_id"))
			.where("   and b.user_memo like %:user_memo% ", arg.getParameter("user_memo"))
			.where(" order by b.seq_top, b.line_seqn       ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
