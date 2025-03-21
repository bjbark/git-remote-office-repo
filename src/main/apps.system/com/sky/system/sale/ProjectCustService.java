package com.sky.system.sale;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class ProjectCustService  extends DefaultServiceHandler {

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
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select a.row_clos                    ")
			.query("      ,a.prom_dt                      ")
			.query("      ,a.fr_dt                        ")
			.query("      ,a.to_dt                        ")
			.query("      ,a.prom_id                      ")
			.query("      ,a.prom_nm                      ")
			.query("      ,b.dept_nm                      ")
			.query("      ,c.emp_nm                      ")
			.query("      ,a.vend_nm                      ")
			.query("      ,a.user_memo                    ")
		;
		data.param // 조건
			.where("  from prom_info a                    ")
			.where("       left outer join dept_mst b    ")
			.where("         on b.dept_id = a.dept_id     ")
			.where("       left outer join usr_mst c    ")
			.where("         on c.emp_id = a.emp_id     ")
			.where(" where a.hq_id = :hq_id         ", arg.fixParameter("hq_id"))
			.where("   and a.prom_dt between :fr_dt       ", arg.fixParameter("fr_dt"))
			.where("                     and :to_dt       ", arg.fixParameter("to_dt"))
			.where("   and a.dept_id = :dept_id           ", arg.getParameter("dept_id"))
			.where("   and a.emp_id = :emp_id           ", arg.getParameter("emp_id"))
			.where("   and a.row_clos = :row_clos       ", arg.getParameter("row_clos"))
			.where("   and a.row_sts = 0 				  ")
			.where("   and a.prom_gb = '6' 				  ")
			.where(" order by a.prom_id desc              ")
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
		.query("select rownum    as line_seqn        ")
		.query("      ,i.item_code                   ")
		.query("      ,i.item_name                   ")
		.query("      ,i.item_spec                   ")
		.query("      ,r.bas_nm as brand_nm       ")
		.query("      ,m.bas_nm as mfg_nm         ")
		.query("      ,u.unit_name                   ")
		.query("      ,i.unt_qty                  ")
		.query("      ,a.cust_price                ")
		.query("      ,a.prom_price                ")
		.query("      ,a.prom_halin                ")
		.query("      ,a.order_cnt                 ")
		.query("      ,a.order_qty                 ")
		.query("      ,a.order_amt                 ")
		.query("  from prom_item a                 ")
		.query("       left outer join itm_mst i ")
		.query("         on i.item_idcd = a.item_idcd  ")
		.query("       left outer join item_unit u ")
		.query("          on u.unit_idcd = i.unit_idcd ")
		.query("       left outer join base_mst r ")
		.query("         on r.bas_id = i.brand_id ")
		.query("       left outer join base_mst m ")
		.query("         on m.bas_id = i.mfg_id   ")
		.query(" where a.prom_id = :prom_id        ", arg.fixParameter("prom_id"))
		.query("   and a.row_sts = 0 			   ")
		;
		
		return data.selectForMap();
	}
	
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
	public SqlResultMap getSaleCust(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(a.npay_amt) as npay_amt ")
		;
		data.param // 조회
			.query("select a.cust_id                                                                     ")
			.query("      ,c.cust_nm                                                                     ")
			.query("      ,c.biz_tel_no                                                                  ")
			.query("      ,a.npay_amt                                                                     ")
			.query("      ,p.inv_dt                                                                      ")
			.query("      ,(select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm         ")
			.query("      ,(select bas_nm from base_mst where bas_id = a.clss_2 ) as cls2_nm         ")
			.query("      ,(select bas_nm from base_mst where bas_id = a.clss_3 ) as cls3_nm         ")
			.query("      ,p.sale_yn                                                                     ")
			.query("      ,p.sale_reason                                                                 ")
			.query("      ,(select emp_nm from usr_mst where emp_id = a.salesman_id ) as salesman_nm ")
		;
		data.param // 조건
			.where("  from cust_stor a                                                                  ")
			.where("       left outer join cust_mst c                                                   ")
			.where("         on c.cust_id = a.cust_id                                                    ")
			.where("       left outer join prom_cust p                                                   ")
			.where("         on p.cust_id = a.cust_id                                                    ")
			.where("        and p.prom_id = :prom_id                                                     ", arg.fixParameter("prom_id"))
			.where(" where a.stor_id = :stor_id                                                        ", arg.fixParameter("stor_id"))
			.where("   and a.clss_1 = 'V2130M10009120체인점(일반)'                                      ")
			.where(" order by a.cust_id                                                                  ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
