package com.sky.system.recv;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

@Service
public class PoListService  extends DefaultServiceHandler {

//	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows,String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.amount) as amount ")
		;
		data.param // 조회
			.query("select a.row_clos                             ")
			.query("      ,a.inv_gb                                ")
			.query("      ,b.stor_nm as wareh_nm                  ")
			.query("      ,a.inv_no                                ")
			.query("      ,a.inv_dt                                ")
			.query("      ,a.vend_nm                               ")
			.query("      ,c.emp_nm  as inv_usr_nm               ")
			.query("      ,a.amount                                ")
			.query("      ,a.sts_cd                                ")
			.query("      ,a.user_memo                             ")
		;
		data.param // 조건
			.where("  from po_mst a                               ")
			.where("       join stor b                 		   ")
			.where("         on b.stor_id = a.wrhs_id            ")
			.where("       left outer join usr_mst c             ")
			.where("         on c.emp_id = a.inv_usr_id          ")
			.where(" where a.stor_grp  = :stor_grp                  ", arg.fixParameter("stor_grp"))
			.where("   and a.row_sts = 0 				 		 	")
			.where("   and a.stor_id  = :stor_id                  ", arg.getParameter("stor_id"))
			.where("   and a.inv_gb in ('1', '2')                  ") // 1:일반발주, 2:통합발주, 3:직납발주
			.where("   and a.inv_dt between :fr_dt                 ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt                 ", arg.fixParameter("to_dt"))
			.where("   and a.vend_id = :vend_id                    ", arg.getParameter("vend_id"))
			.where("   and a.user_memo like %:user_memo%           ", arg.getParameter("user_memo"))
			.where("  order by a.inv_no desc                       ")
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
		.query("select a.inv_no                    ")
		.query("      ,a.line_seqn                   ")
		.query("      ,a.seq_dsp                   ")
		.query("      ,a.item_code                   ")
		.query("      ,a.item_name                   ")
		.query("      ,a.item_spec                   ")
		.query("      ,b.unit_name                   ")
		.query("      ,a.unt_qty                  ")
		.query("      ,a.qty                       ")
		.query("      ,a.safe_dt                   ")
		.query("      ,a.price                     ")
		.query("      ,a.sply_amt                  ")
		.query("      ,a.tax                       ")
		.query("      ,a.tax_free                  ")
		.query("      ,a.amount                    ")
		.query("      ,a.ship_qty                  ")
		.query("      ,a.user_memo                 ")
		.query("      ,c.brcd_1 as barcode       ")
		.query("  from po_item a                   ")
		.query("       left outer join item_unit b on b.unit_idcd = a.unit_idcd ")
		.query("       join itm_mst c 		       on c.item_idcd = a.item_idcd  ")
		.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 				  ")
		.query(" order by a.seq_top, a.line_seqn     ")
		;

		return data.selectForMap();
	}

	/**
	 * iteminfo 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getItemInfo(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(b.qty) as qty , sum(b.amount) as amount ")
			.total("   ,  sum(b.ship_qty) as ship_qty, sum(b.rest_qty) as rest_qty ")
		;
		data.param // 조회
			.query("select b.item_code                                     ")
			.query("      ,b.item_name                                     ")
			.query("      ,b.item_spec                                     ")
			.query("      ,u.unit_name                                     ")
			.query("      ,b.unt_qty                                    ")
			.query("      ,b.safe_dt                                    ")
			.query("      ,b.qty                                        ")
			.query("      ,b.price                                      ")
			.query("      ,b.amount                                     ")
			.query("      ,b.ship_qty                                   ")
			.query("      ,b.rest_qty 					                ")
			.query("      ,a.inv_dt                                     ")
			.query("      ,a.inv_no                                     ")
			.query("      ,a.vend_nm                                    ")
			.query("      ,v.biz_tel_no       as vend_biz_tel_no        ")
			.query("      ,a.vend_gb                                    ")
			.query("      ,i.brcd_1 as barcode                          ")
			;
		data.param // 조건
			.where("  from po_mst a                                     ")
			.where("       join po_item b               on b.inv_no = a.inv_no    ")
			.where("       left outer join itm_mst i    on i.item_idcd = b.item_idcd    ")
			.where("       left outer join item_unit u  on u.unit_idcd = b.unit_idcd    ")
			.where("       left outer join vend_mst v  on v.vend_id = a.vend_id  ")
			.where(" where a.stor_grp  = :stor_grp                  	", arg.fixParameter("stor_grp"))
			.where("   and a.row_sts = 0 				 				")
			.where("   and b.row_sts = 0 				 				")
			.where("   and a.stor_id  = :stor_id                  		", arg.getParameter("stor_id"))
			.where("   and a.inv_gb in ('1', '2')                  		") // 1:일반발주, 2:통합발주, 3:직납발주
			.where("   and a.inv_dt between :fr_dt                      ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt                      ", arg.fixParameter("to_dt"))
			.where("   and a.vend_id = :vend_id                         ", arg.getParameter("vend_id"))
			.where("   and i.class_id in ( select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id ) ", arg.getParameter("class_id"))
			.where("   and b.item_idcd = :item_idcd   	                    ", arg.getParameter("item_idcd"))
			.where("   and b.qty - b.ship_qty > :rest_qty_gb            ", 0, "true".equals(arg.fixParamText("rest_qty_gb")))
			.where(" order by b.inv_no desc, b.seq_top, b.line_seqn       ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
