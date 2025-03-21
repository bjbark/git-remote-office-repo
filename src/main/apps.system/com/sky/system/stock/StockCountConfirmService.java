package com.sky.system.stock;

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
public class StockCountConfirmService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(b.plan_stock_qty)    as plan_stock_qty    ")
			.total("      ,sum(b.plan_stock_amount) as plan_stock_amount ")
			.total("      ,sum(b.work_stock_qty)    as work_stock_qty    ")
			.total("      ,sum(b.work_stock_amount) as work_stock_amount ")
		;
		data.param // 조회
	        .query("select a.row_clos                                            ")
	        .query("      ,a.plan_no                                              ")
	        .query("      ,a.plan_dt                                              ")
	        .query("      ,c.stor_nm                                             ")
	        .query("      ,d.emp_nm as confirm_nm                                ")
	        .query("      ,b.plan_stock_qty                                       ")
	        .query("      ,b.plan_stock_amount                                    ")
	        .query("      ,b.work_stock_qty                                       ")
	        .query("      ,b.work_stock_amount                                    ")
	        .query("      ,a.confirm_yn                                           ")
	        .query("      ,a.user_memo                                            ")
		;
		data.param // 조건
	        .where("  from adjust_plan a                                          ")
	        .where("       left outer join (                                      ")
	        .where("            select plan_no                                    ")
	        .where("                  ,sum(plan_stock)       as plan_stock_qty    ")
	        .where("                  ,sum(plan_stock*price) as plan_stock_amount ")
	        .where("                  ,sum(work_stock)       as work_stock_qty    ")
	        .where("                  ,sum(work_stock*price) as work_stock_amount ")
	        .where("              from adjust_stock                               ")
	        .where("             where row_sts = 0                              ")
	        .where("             group by plan_no                                 ")
	        .where("            ) b                                               ")
	        .where("         on b.plan_no = a.plan_no                             ")
	        .where("       left outer join store c                                ")
	        .where("         on c.stor_id = a.stor_id                           ")
	        .where("       left outer join usr_mst d                            ")
	        .where("         on d.emp_id = a.confirm_id                          ")
	        .where(" where a.stor_id = :stor_id                                 ", arg.fixParameter("stor_id" ))
	        .where("   and a.plan_dt between :fr_dt                               ", arg.fixParameter("fr_dt"))
	        .where("                     and :to_dt                               ", arg.fixParameter("to_dt"))
	        .where("   and a.confirm_yn = :confirm_yn                             ", arg.getParameter("confirm_yn"))
			.where("   and a.row_sts = 0 				                          ")
			.where("   and a.plan_gb = '0' 				                          ") // 0=재고 실사/1=부분 실사
	        .where(" order by a.plan_no desc                                      ")
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
		.query("select c.stor_nm                                                     ")
		.query("      ,d.dept_nm                                                      ")
		.query("      ,e.emp_nm                                                      ")
		.query("      ,a.work_dt                                                      ")
		.query("      ,a.work_no                                                      ")
		.query("      ,b.work_stock_qty                                               ")
		.query("      ,b.work_stock_amt                                               ")
		.query("      ,a.user_memo                                                    ")
		.query("  from adjust_info a                                                  ")
		.query("       left outer join (                                              ")
		.query("            select a.work_no                                          ")
		.query("                  ,sum(a.unt_qty*a.qty)            as work_stock_qty ")
		.query("                  ,sum(a.unt_qty*a.qty*e.po_pri) as work_stock_amt ")
		.query("              from adjust_item a                                      ")
		.query("                   left outer join itm_mst b on b.item_idcd = a.item_idcd                         ")
		.query("                   left outer join itm_stor e on a.stor_id = e.stor_id and a.item_idcd = e.item_idcd")
		.query("             where a.row_sts = 0                                    ")
		.query("             group by a.work_no                                       ")
		.query("            ) b                                                       ")
		.query("         on b.work_no = a.work_no                                     ")
		.query("       left outer join store c                                        ")
		.query("         on c.stor_id = a.stor_id                                   ")
		.query("       left outer join dept_mst d                                    ")
		.query("         on d.dept_id = a.dept_id                                     ")
		.query("       left outer join usr_mst e                                    ")
		.query("         on e.emp_id = a.emp_id                                     ")
		.query(" where a.plan_no = :plan_no                                           ", arg.fixParameter("plan_no"))
		.query("   and a.row_sts = 0 				         						  ")
		.query(" order by c.stor_nm, d.dept_nm, e.emp_nm                            ")
		;
		
		return data.selectForMap();
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
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String flag = row.getParamText("_flag");
			
			// 재고반영
			{
				if (rowaction == Action.update) {
					
		        	// 재고반영
		        	if ("3".equals(flag)) {
			        	data.param
			    			.table("adjust_plan")
			    			.where("where plan_no = :plan_no ")
				        	//
							.unique("plan_no"     , row.fixParameter("plan_no"    ))
			        		.update("confirm_yn"  , row.getParameter("confirm_yn" ))
			        		.update("confirm_id"  , row.getParameter("upt_nm"  ))
			        		.update("confirm_dt"  , new SqlParamText("to_char(sysdate, 'yyyymmdd')"))
			        		.update("row_clos"   , row.getParameter("row_clos"  ))
							.update("upt_nm"   , row.getParameter("upt_nm"  ))
							.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
							.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
							.action = rowaction;
			        	data.attach();
		    			
						// 기존 재고반영된 실사정보 삭제
			        	data.param
		        			.table("modi_info")
		        			.where("where inv_no = :plan_no               ")
		        			//
		        			.unique("plan_no" , row.fixParameter("plan_no"))
		        			.action = Action.delete;
		        		data.attach();

						// 기존 재고반영된 실사상세 삭제
			        	data.param
		        			.table("modi_item")
		        			.where("where inv_no = :plan_no               ")
		        			//
		        			.unique("plan_no" , row.fixParameter("plan_no"))
		        			.action = Action.delete;
			        	data.attach();

						// 기존 재고반영된 입출고 대장 삭제
			        	data.param
		        			.table("stock_ledger")
		        			.where("where inv_no = :plan_no               ")
		        			//
		        			.unique("plan_no" , row.fixParameter("plan_no"))
		        			.action = Action.delete;
			        	data.attach();

			        	// 1. 실사정보 등록
			        	data.param
			        	.query("insert into modi_info ( corp_id, hq_id, stor_grp, stor_id, pos_no, inv_no, inv_dt, inv_tm, inv_gb, sts_cd, inv_dept_id, inv_usr_id, reason_id, custom_gb, custom_id, custom_nm, tax_type, tax_rt, tax_free, taxation, sply_amt, tax, amount, qty, user_memo, sys_memo, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm ) ")
			        	.query("select b.corp_id                                                                                                                                                                                                                                                               ")
			        	.query("      ,a.hq_id                                                                                                                                                                                                                                                               ")
			        	.query("      ,a.stor_grp                                                                                                                                                                                                                                                               ")
			        	.query("      ,a.stor_id                                                                                                                                                                                                                                                               ")
			        	.query("      ,:pos_no                                                                                                                                                                                                                                                                  ", row.fixParameter("pos_no"))
			        	.query("      ,a.plan_no                    as inv_no                                                                                                                                                                                                                                   ")
			        	.query("      ,to_char(sysdate, 'yyyymmdd') as inv_dt                                                                                                                                                                                                                                   ")
			        	.query("      ,to_char(sysdate, 'hh24mi')   as inv_tm                                                                                                                                                                                                                                   ")
			        	.query("      ,'2'                          as inv_gb                                                                                                                                                                                                                                   ")
			        	.query("      ,'0500'                       as sts_cd                                                                                                                                                                                                                                   ")
			        	.query("      ,c.dept_id                    as inv_dept_id                                                                                                                                                                                                                              ")
			        	.query("      ,a.confirm_id                 as inv_usr_id                                                                                                                                                                                                                              ")
			        	.query("      ,'5108002'                    as reason_id                                                                                                                                                                                                                                ")
			        	.query("      ,'1'                          as custom_gb                                                                                                                                                                                                                                ")
			        	.query("      ,c.dept_id                    as custom_id                                                                                                                                                                                                                                ")
			        	.query("      ,d.dept_nm                    as custom_nm                                                                                                                                                                                                                                ")
			        	.query("      ,b.tax_type                                                                                                                                                                                                                                                               ")
			        	.query("      ,b.tax_rt                                                                                                                                                                                                                                                               ")
			        	.query("      ,b.tax_free                                                                                                                                                                                                                                                               ")
			        	.query("      ,b.taxation                                                                                                                                                                                                                                                               ")
			        	.query("      ,b.sply_amt                                                                                                                                                                                                                                                               ")
			        	.query("      ,b.tax                                                                                                                                                                                                                                                                    ")
			        	.query("      ,b.amount                                                                                                                                                                                                                                                                 ")
			        	.query("      ,b.qty                                                                                                                                                                                                                                                                    ")
			        	.query("      ,null                                 as user_memo                                                                                                                                                                                                                        ")
			        	.query("      ,null                                 as sys_memo                                                                                                                                                                                                                        ")
			        	.query("      ,:upt_nm                                                                                                                                                                                                                                                               ", row.fixParameter("upt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                                                                                                                                                                                                                                              ")
			        	.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm                                                                                                                                                                                                                        ")
			        	.query("      ,:crt_nm                                                                                                                                                                                                                                                               ", row.fixParameter("crt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                                                                                                                                                                                                                                              ")
			        	.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm                                                                                                                                                                                                                        ")
			        	.query("  from adjust_plan a                                                                                                                                                                                                                                                            ")
			        	.query("       join (                                                                                                                                                                                                                                                                   ")
			        	.query("            select a.plan_no                                                                                                                                                                                                                                                    ")
			        	.query("                  ,c.corp_id                                                                                                                                                                                                                                                   ")
//			        	.query("                  ,c.recv_tax_type as tax_type                                                                                                                                                                                                                                  ")
			        	.query("                  ,'0' as tax_type                                                                                                                                                                                                                                              ")
			        	.query("                  ,c.tax_rt                                                                                                                                                                                                                                                   ")
			        	.query("                  ,sum(a.work_stock - a.plan_stock)                                                                                                                                                                                                                 as qty      ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', 0, b.po_pri*(a.work_stock - a.plan_stock)))                                                                                                                                                                        as tax_free ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', b.po_pri*(a.work_stock - a.plan_stock), 0))                                                                                                                                                                        as taxation ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0))                                                                                                                                            as sply_amt ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', (b.po_pri*(a.work_stock - a.plan_stock))-round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0))                                                                                                 as tax      ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), b.po_pri*(a.work_stock - a.plan_stock))                                                                                                                  ")
			        	.query("                     + decode(b.notax_yn, '0', (b.po_pri*(a.work_stock - a.plan_stock))-round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                              ")
			        	.query("                     + decode(b.notax_yn, '0', 0, b.po_pri*(a.work_stock - a.plan_stock)))                                                                                                                                                                        as amount   ")
			        	.query("              from adjust_stock a                                                                                                                                                                                                                                               ")
			        	.query("                   join itm_mst b                                                                                                                                                                                                                                             ")
			        	.query("                     on b.item_idcd = a.item_idcd                                                                                                                                                                                                                                   ")
			        	.query("                   join store c                                                                                                                                                                                                                                                 ")
			        	.query("                     on c.stor_id = a.stor_id                                                                                                                                                                                                                                 ")
			        	.query("             where a.plan_no = :plan_no                                                                                                                                                                                                                                         ", row.fixParameter("plan_no"))
			        	.query("               and a.row_sts = 0                                                                                                                                                                                                                                              ")
			        	.query("               and a.work_stock - a.plan_stock <> 0                                                                                                                                                                                                                             ")
//			        	.query("             group by a.plan_no, c.corp_id, c.recv_tax_type, c.tax_rt                                                                                                                                                                                                        ")
			        	.query("             group by a.plan_no, c.corp_id, c.tax_rt                                                                                                                                                                                                                         ")
			        	.query("            ) b                                                                                                                                                                                                                                                                 ")
			        	.query("         on b.plan_no = a.plan_no                                                                                                                                                                                                                                               ")
			        	.query("       join usr_mst c                                                                                                                                                                                                                                                         ")
			        	.query("         on c.emp_id = a.confirm_id                                                                                                                                                                                                                                            ")
			        	.query("       join dept_mst d                                                                                                                                                                                                                                                         ")
			        	.query("         on d.dept_id = c.dept_id                                                                                                                                                                                                                                               ")
						.action = Action.direct;
			        	data.attach();

			        	// 2. 실사상세 등록
			        	data.param
			        	.query("insert into modi_item ( hq_id, stor_grp, stor_id, inv_no, line_seqn, seq_top, seq_dsp, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd, item_code, item_name, item_spec, notax_yn, unit_price, item_halin, price, qty, tax_free, taxation, sply_amt, tax, amount, user_memo, sys_memo, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm ) ")
			        	.query("select a.hq_id                                                                                                                                                                                                                                                  ")
			        	.query("      ,a.stor_grp                                                                                                                                                                                                                                                  ")
			        	.query("      ,a.stor_id                                                                                                                                                                                                                                                  ")
			        	.query("      ,a.plan_no                        as inv_no                                                                                                                                                                                                                  ")
			        	.query("      ,rownum                           as line_seqn                                                                                                                                                                                                                 ")
			        	.query("      ,rownum                           as seq_top                                                                                                                                                                                                                 ")
			        	.query("      ,rownum                           as seq_dsp                                                                                                                                                                                                                 ")
			        	.query("      ,b.mst_itm_id                                                                                                                                                                                                                                                   ")
			        	.query("      ,b.mst_itm_cd                                                                                                                                                                                                                                                   ")
			        	.query("      ,b.unit_idcd                                                                                                                                                                                                                                                   ")
			        	.query("      ,b.unt_qty                                                                                                                                                                                                                                                  ")
			        	.query("      ,b.item_idcd                                                                                                                                                                                                                                                   ")
			        	.query("      ,b.item_code                                                                                                                                                                                                                                                   ")
			        	.query("      ,b.item_name                                                                                                                                                                                                                                                   ")
			        	.query("      ,b.item_spec                                                                                                                                                                                                                                                   ")
			        	.query("      ,b.notax_yn                                                                                                                                                                                                                                                  ")
			        	.query("      ,b.po_pri                                            as unit_price                                                                                                                                                                                         ")
			        	.query("      ,(b.po_pri-b.po_pri)*(a.work_stock - a.plan_stock) as item_halin                                                                                                                                                                                         ")
			        	.query("      ,b.po_pri                                            as price                                                                                                                                                                                              ")
			        	.query("      ,a.work_stock - a.plan_stock                                                                                                                                                                                                                     as qty      ")
			        	.query("      ,decode(b.notax_yn, '0', 0, b.po_pri*(a.work_stock - a.plan_stock))                                                                                                                                                                            as tax_free ")
			        	.query("      ,decode(b.notax_yn, '0', b.po_pri*(a.work_stock - a.plan_stock), 0)                                                                                                                                                                            as taxation ")
			        	.query("      ,decode(b.notax_yn, '0', round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                                                                as sply_amt ")
			        	.query("      ,decode(b.notax_yn, '0', (b.po_pri*(a.work_stock - a.plan_stock))-round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                     as tax      ")
			        	.query("      ,decode(b.notax_yn, '0', round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), b.po_pri*(a.work_stock - a.plan_stock))                                                                                                                     ")
			        	.query("         + decode(b.notax_yn, '0', (b.po_pri*(a.work_stock - a.plan_stock))-round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                             ")
			        	.query("         + decode(b.notax_yn, '0', 0, b.po_pri*(a.work_stock - a.plan_stock))                                                                                                                                                                        as amount   ")
			        	.query("      ,null                                 as user_memo                                                                                                                                                                                                           ")
			        	.query("      ,null                                 as sys_memo                                                                                                                                                                                                           ")
			        	.query("      ,:upt_nm                                                                                                                                                                                                                                                  ", row.fixParameter("upt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                                                                                                                                                                                                                                 ")
			        	.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm                                                                                                                                                                                                           ")
			        	.query("      ,:crt_nm                                                                                                                                                                                                                                                  ", row.fixParameter("crt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                                                                                                                                                                                                                                 ")
			        	.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm                                                                                                                                                                                                           ")
			        	.query("  from adjust_stock a                                                                                                                                                                                                                                              ")
			        	.query("       join itm_mst b                                                                                                                                                                                                                                            ")
			        	.query("         on b.item_idcd = a.item_idcd                                                                                                                                                                                                                                  ")
			        	.query("       join store c                                                                                                                                                                                                                                                ")
			        	.query("         on c.stor_id = a.stor_id                                                                                                                                                                                                                                ")
			        	.query(" where a.plan_no = :plan_no                                                                                                                                                                                                                                        ", row.fixParameter("plan_no"))
			        	.query("   and a.row_sts = 0                                                                                                                                                                                                                                             ")
			        	.query("   and a.work_stock - a.plan_stock <> 0                                                                                                                                                                                                                            ")
			        	.query(" order by b.item_idcd                                                                                                                                                                                                                                                ")
			        	.action = Action.direct;
			        	data.attach();

			        	// 3. 입출고 대장 등록
			        	data.param
			        	.query("insert into stock_ledger ( hq_id, stor_grp, stor_id, inv_no, line_seqn, inv_gb, inv_wk, dept_id, emp_id, cust_id, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd, item_code, stock, eaqty, qty, price, amount, po_pri, po_amount, user_memo, sys_memo, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, price_no, unit_price, cust_price, notax_yn, tax_type, tax_rt, sply_amt, tax ) ")
			        	.query("select a.hq_id                                                                                                                                                                                                                                                   ")
			        	.query("      ,a.stor_grp                                                                                                                                                                                                                                                   ")
			        	.query("      ,a.stor_id                                                                                                                                                                                                                                                   ")
			        	.query("      ,a.plan_no                        as inv_no                                                                                                                                                                                                                   ")
			        	.query("      ,rownum                           as line_seqn                                                                                                                                                                                                                  ")
			        	.query("      ,'1'                              as inv_gb                                                                                                                                                                                                                   ")
			        	.query("      ,'2071305'                        as inv_wk                                                                                                                                                                                                                   ")
			        	.query("      ,e.dept_id                                                                                                                                                                                                                                                    ")
			        	.query("      ,d.confirm_id                     as emp_id                                                                                                                                                                                                                  ")
			        	.query("      ,a.stor_id                       as cust_id                                                                                                                                                                                                                  ")
			        	.query("      ,b.mst_itm_id                                                                                                                                                                                                                                                    ")
			        	.query("      ,b.mst_itm_cd                                                                                                                                                                                                                                                    ")
			        	.query("      ,b.unit_idcd                                                                                                                                                                                                                                                    ")
			        	.query("      ,b.unt_qty                                                                                                                                                                                                                                                   ")
			        	.query("      ,b.item_idcd                                                                                                                                                                                                                                                    ")
			        	.query("      ,b.item_code                                                                                                                                                                                                                                                    ")
//			        	.query("      ,b.unt_qty*(a.work_stock - a.plan_stock)              as stock                                                                                                                                                                                               ")
			        	.query("      ,a.work_stock - a.plan_stock              			 as stock                                                                                                                                                                                               ")
			        	.query("      ,b.unt_qty*(a.work_stock - a.plan_stock)              as eaqty                                                                                                                                                                                               ")
			        	.query("      ,a.work_stock - a.plan_stock                           as qty                                                                                                                                                                                                 ")
			        	.query("      ,b.po_pri                                            as price                                                                                                                                                                                               ")
			        	.query("      ,decode(b.notax_yn, '0', round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), b.po_pri*(a.work_stock - a.plan_stock))                                                                                                                      ")
			        	.query("         + decode(b.notax_yn, '0', (b.po_pri*(a.work_stock - a.plan_stock))-round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                              ")
			        	.query("         + decode(b.notax_yn, '0', 0, b.po_pri*(a.work_stock - a.plan_stock))                                                                                                                                                                        as amount    ")
			        	.query("      ,b.po_pri                                            as po_pri                                                                                                                                                                                            ")
			        	.query("      ,decode(b.notax_yn, '0', round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), b.po_pri*(a.work_stock - a.plan_stock))                                                                                                                      ")
			        	.query("         + decode(b.notax_yn, '0', (b.po_pri*(a.work_stock - a.plan_stock))-round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                              ")
			        	.query("         + decode(b.notax_yn, '0', 0, b.po_pri*(a.work_stock - a.plan_stock))                                                                                                                                                                        as po_amount ")
			        	.query("      ,null                                 as user_memo                                                                                                                                                                                                            ")
			        	.query("      ,null                                 as sys_memo                                                                                                                                                                                                            ")
			        	.query("      ,:upt_nm                                                                                                                                                                                                                                                   ", row.fixParameter("upt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                                                                                                                                                                                                                                  ")
			        	.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm                                                                                                                                                                                                            ")
			        	.query("      ,:crt_nm                                                                                                                                                                                                                                                   ", row.fixParameter("crt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                                                                                                                                                                                                                                  ")
			        	.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm                                                                                                                                                                                                            ")
			        	.query("      ,'9'                                  as price_no                                                                                                                                                                                                             ")
			        	.query("      ,b.po_pri                           as unit_price                                                                                                                                                                                                           ")
			        	.query("      ,b.po_pri                           as cust_price                                                                                                                                                                                                           ")
			        	.query("      ,b.notax_yn                                                                                                                                                                                                                                                   ")
			        	.query("      ,'0'                                  as tax_type                                                                                                                                                                                                             ")
			        	.query("      ,c.tax_rt                                                                                                                                                                                                                                                   ")
			        	.query("      ,decode(b.notax_yn, '0', round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                            as sply_amt                                                                                                      ")
			        	.query("      ,decode(b.notax_yn, '0', (b.po_pri*(a.work_stock - a.plan_stock))-round((b.po_pri*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0) as tax                                                                                                           ")
			        	.query("  from adjust_stock a                                                                                                                                                                                                                                               ")
			        	.query("       join itm_mst b                                                                                                                                                                                                                                             ")
			        	.query("         on b.item_idcd = a.item_idcd                                                                                                                                                                                                                                   ")
			        	.query("       join store c                                                                                                                                                                                                                                                 ")
			        	.query("         on c.stor_id = a.stor_id                                                                                                                                                                                                                                 ")
			        	.query("       join adjust_plan d                                                                                                                                                                                                                                           ")
			        	.query("         on d.plan_no = a.plan_no                                                                                                                                                                                                                                   ")
			        	.query("       join usr_mst e                                                                                                                                                                                                                                             ")
			        	.query("         on e.emp_id = d.confirm_id                                                                                                                                                                                                                                ")
			        	.query(" where a.plan_no = :plan_no                                                                                                                                                                                                                                         ", row.fixParameter("plan_no"))
			        	.query("   and a.row_sts = 0                                                                                                                                                                                                                                              ")
			        	.query("   and d.row_sts = 0                                                                                                                                                                                                                                              ")
			        	.query("   and a.work_stock - a.plan_stock <> 0                                                                                                                                                                                                                             ")
			        	.query(" order by b.item_idcd                                                                                                                                                                                                                                                 ")
			        	.action = Action.direct;
			        	data.attach();
		        	}
				}
			}
		}
		
		data.execute();
		return null;
	}
}
