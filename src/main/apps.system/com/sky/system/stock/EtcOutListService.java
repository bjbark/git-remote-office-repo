package com.sky.system.stock;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

@Service
public class EtcOutListService  extends DefaultServiceHandler {

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
			.total("select count(1) as maxsize , sum(-a.amount) as amount	")
		;
		data.param // 조회
			.query("select c.stor_nm                        ")
			.query("      ,a.inv_no                          ")
			.query("      ,a.inv_dt                          ")
			.query("      ,a.custom_gb                       ")
			.query("      ,a.custom_id                       ")
			.query("      ,a.custom_nm                       ")
			.query("      ,-a.amount as amount  	         ")
			.query("      ,d.emp_nm as inv_usr_nm          ")
			.query("      ,a.reason_id                       ")
			.query("      ,(select bas_nm from base_mst where bas_id = a.reason_id ) as reason_nm ")
			.query("      ,a.user_memo                       ")
		;
		data.param // 조건
			.where("  from modi_info a                       ")
		;
		
//		String item_idcd = arg.getParamText("item_idcd");
//		if (!"".equals(item_idcd)) {
//			data.param // 조건
//				.where("       join (                            ")
//				.where("            select inv_no                ")
//				.where("              from modi_item             ")
//				.where("             where item_idcd = :item_idcd    ", arg.getParameter("item_idcd"))
//				.where("             group by inv_no             ")
//				.where("            ) b                          ")
//				.where("         on b.inv_no = a.inv_no          ")
//			;
//		}
		
		data.param // 조건
			.where("       left outer join store c           ")
			.where("         on c.stor_id = a.stor_id      ")
			.where("       left outer join usr_mst d       ")
			.where("         on d.emp_id = a.inv_usr_id    ")
			.where(" where a.inv_gb = '3'                    ") // 기타출고전표관리
			.where("   and a.row_sts = 0 				     ")
			.where("   and a.stor_grp = :stor_grp            ", arg.fixParameter("stor_grp"))
			.where("   and a.stor_id = :stor_id            ", arg.getParameter("stor_id"))
			.where("   and a.inv_dt between :fr_dt           ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt           ", arg.fixParameter("to_dt"))
			.where("   and a.row_clos = :row_clos          ", arg.getParameter("row_clos"))
			.where("   and a.inv_usr_id = :inv_usr_id      ", arg.getParameter("inv_usr_id"))
			.where("   and a.reason_id = :reason_id          ", arg.getParameter("reason_id"))
			.where("   and a.custom_gb = :custom_gb          ", arg.getParameter("custom_gb"))
			.where(" order by a.inv_no desc                  ")
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
		.query("      ,b.unit_name                   ")
		.query("      ,a.unt_qty                  ")
		.query("      ,-a.qty    as qty            ")
		.query("      ,a.price                     ")
		.query("      ,-a.amount as amount         ")
		.query("      ,a.user_memo                 ")
		.query("  from modi_item a                 ")
		.query("       left outer join item_unit b ")
		.query("          on b.unit_idcd = a.unit_idcd ")
		.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 			   ")
		.query(" order by a.seq_top, a.line_seqn     ")
		;
		
		return data.selectForMap();
	}
	
	/**
	 * item 조회
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getItem(HttpRequestArgument arg, int page, int rows,String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query(" select a.item_code, a.item_name, a.item_spec, c.unit_name, b.inv_dt,	")
			.query("	b.reason_id, -a.qty as qty, a.price, -a.amount as amount, d.stor_nm,			")
			.query("	b.custom_nm, a.inv_no										")
		;
		
		data.param // 조건
			.where(" from modi_item a, modi_info b, item_unit c, store d			")
			.where(" where a.inv_no = b.inv_no										")
			.where("  and a.unit_idcd = c.unit_idcd										")
			.where("  and a.stor_id = d.stor_id									")
			.where("  and b.inv_gb = '3'											") // 기타출고전표관리
			.where("  and a.row_sts = 0											")
			.where("  and b.row_sts = 0											")
			.where("  and a.stor_grp = :stor_grp		", arg.fixParameter("stor_grp"))
			.where("  and a.stor_id = :stor_id		", arg.getParameter("stor_id"))
			.where("  and b.inv_dt between :fr_dt		", arg.fixParameter("fr_dt"))
			.where("                   and :to_dt		", arg.fixParameter("to_dt"))
			.where("  and b.row_clos = :row_clos		", arg.getParameter("row_clos"))
			.where("  and b.inv_usr_id = :inv_usr_id	", arg.getParameter("inv_usr_id"))
			.where("  and b.reason_id = :reason_id		", arg.getParameter("reason_id"))
			.where("  and b.custom_gb = :custom_gb		", arg.getParameter("custom_gb"))
			.where("  ans a.item_idcd = :item_idcd    		", arg.getParameter("item_idcd"))
			.where(" order by a.item_name												")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
