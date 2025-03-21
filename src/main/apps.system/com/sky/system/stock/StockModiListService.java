package com.sky.system.stock;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

@Service
public class StockModiListService  extends DefaultServiceHandler {

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
			.query("select a.inv_no                       ")
			.query("      ,a.inv_dt                       ")
			.query("      ,isnull(b.emp_nm, '') as emp_nm  ")
			.query("      ,a.amount                       ")
			.query("      ,a.user_memo                    ")
		;
		data.param // 조건
			.where("  from modi_info a                    ")
			.where("       left outer join usr_mst b    ")
			.where("         on b.emp_id = a.inv_usr_id ")
			.where(" where a.inv_gb = '1' -- 조정         ")
			.where("   and a.stor_id = :stor_id         ", arg.getParameter("stor_id" ))
			.where("   and a.inv_dt between :fr_dt        ", arg.fixParameter("fr_dt" ))
			.where("                    and :to_dt        ", arg.fixParameter("to_dt" ))
			.where(" order by a.inv_no desc               ")
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
		.query("      ,a.qty                       ")
		.query("      ,a.price                     ")
		.query("      ,a.sply_amt                  ")
		.query("      ,a.tax                       ")
		.query("      ,a.amount                    ")
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
}
