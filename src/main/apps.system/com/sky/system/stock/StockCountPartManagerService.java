package com.sky.system.stock;

import java.util.StringTokenizer;

import net.sky.core.exception.ServiceException;
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
public class StockCountPartManagerService  extends DefaultServiceHandler {

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
			.total("      ,sum(b.plan_stock)                            as plan_stock        ")
			.total("      ,sum(b.plan_stock_amount)                     as plan_stock_amount ")
			.total("      ,sum(b.work_stock)                            as work_stock        ")
			.total("      ,sum(b.work_stock_amount)                     as work_stock_amount ")
			.total("      ,sum(b.plan_stock-b.work_stock)               as diff_stock        ")
			.total("      ,sum(b.plan_stock_amount-b.work_stock_amount) as diff_stock_amount ")
		;
		data.param // 조회
	        .query("select a.row_clos                                                  ")
	        .query("      ,a.plan_no                                                    ")
	        .query("      ,a.plan_dt                                                    ")
	        .query("      ,c.stor_nm                                                   ")
	        .query("      ,d.emp_nm as confirm_nm                                      ")
	        .query("      ,b.plan_stock                                                 ")
	        .query("      ,b.plan_stock_amount                                          ")
	        .query("      ,b.work_stock                                                 ")
	        .query("      ,b.work_stock_amount                                          ")
	        .query("      ,b.plan_stock-b.work_stock               as diff_stock        ")
	        .query("      ,b.plan_stock_amount-b.work_stock_amount as diff_stock_amount ")
	        .query("      ,a.confirm_yn                                                 ")
	        .query("      ,a.user_memo                                                  ")
		;
		data.param // 조건
	        .where("  from adjust_plan a                                                ")
	        .where("       left outer join (                                            ")
	        .where("            select plan_no                                          ")
	        .where("                  ,sum(plan_stock)       as plan_stock              ")
	        .where("                  ,sum(plan_stock*price) as plan_stock_amount       ")
	        .where("                  ,sum(work_stock)       as work_stock              ")
	        .where("                  ,sum(work_stock*price) as work_stock_amount       ")
	        .where("              from adjust_stock                                     ")
	        .where("             where row_sts = 0                                    ")
	        .where("             group by plan_no                                       ")
	        .where("            ) b                                                     ")
	        .where("         on b.plan_no = a.plan_no                                   ")
	        .where("       left outer join store c                                      ")
	        .where("         on c.stor_id = a.stor_id                                 ")
	        .where("       left outer join usr_mst d                                  ")
	        .where("         on d.emp_id = a.confirm_id                                ")
	        .where(" where a.stor_id = :stor_id                                       ", arg.fixParameter("stor_id" ))
	        .where("   and a.plan_dt between :fr_dt                                     ", arg.fixParameter("fr_dt"))
	        .where("                     and :to_dt                                     ", arg.fixParameter("to_dt"))
	        .where("   and a.confirm_yn = :confirm_yn                                   ", arg.getParameter("confirm_yn"))
			.where("   and a.row_sts = 0 				                                ")
			.where("   and a.plan_gb = '1' 				                                ") // 0=재고 실사/1=부분 실사
	        .where(" order by a.plan_no desc                                            ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * detail 조회
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(s.plan_stock)                              as plan_stock        ")
			.total("      ,sum(s.plan_stock*s.price)                      as plan_stock_amount ")
			.total("      ,sum(s.work_stock)                              as work_stock        ")
			.total("      ,sum(s.work_stock*s.price)                      as work_stock_amount ")
			.total("      ,sum(s.plan_stock-s.work_stock)                 as diff_stock        ")
			.total("      ,sum(s.plan_stock*s.price-s.work_stock*s.price) as diff_stock_amount ")
		;
		data.param // 조회
			.query("select s.plan_no                                                                                                              ")
			.query("      ,s.item_idcd                                                                                                              ")
			.query("      ,s.item_code                                                                                                              ")
			.query("      ,b.brcd_1                                                                                                             ")
			.query("      ,b.item_ds as item_name                                                                                                   ")
			.query("      ,b.item_spec                                                                                                              ")
			.query("      ,u.unit_name                                                                                                              ")
			.query("      ,s.unt_qty                                                                                                             ")
			.query("      ,s.price                                                                                                                ")
	        .query("      ,s.plan_stock                                                                                                           ")
	        .query("      ,s.plan_stock*s.price                      as plan_stock_amount                                                         ")
	        .query("      ,s.work_stock                                                                                                           ")
	        .query("      ,s.work_stock*s.price                      as work_stock_amount                                                         ")
	        .query("      ,s.plan_stock-s.work_stock                 as diff_stock                                                                ")
	        .query("      ,s.plan_stock*s.price-s.work_stock*s.price as diff_stock_amount                                                         ")
		;
		data.param // 조건
			.where("  from adjust_stock s                                                                                                         ")
			.where("       left outer join itm_stor a                                                                                           ")
			.where("         on a.stor_id = s.stor_id                                                                                           ")
			.where("        and a.item_idcd = s.item_idcd                                                                                             ")
			.where("       left outer join itm_mst b on b.item_idcd = s.item_idcd                                                                   ")
			.where("       left outer join item_unit u on u.unit_idcd = s.unit_idcd                                                                   ")
			.where("       left outer join base_mst r on r.bas_id = b.brand_id                                                                  ")
			.where("       left outer join base_mst m on m.bas_id = b.brand_id                                                                  ")
			.where(" where s.plan_no = :plan_no                                                                                                   ", arg.fixParameter("plan_no"))
			.where("   and s.row_sts = 0                                                                                                        ")
			;
		if (!"".equals( arg.getParamText("item_name"   ) )){
			StringTokenizer st = new StringTokenizer(arg.getParamText("item_name"   )," ");
			if (st.countTokens() == 1) {
				data.param.where(" and  b.find_name like %:find_name% " , st.nextToken().toLowerCase());	
			} else {
				int i = 0;
				String and = "";
				data.param.where(" and  (  ");
				while(st.hasMoreTokens()){
					data.param.where( and +  " b.find_name like %:find_name" + i++ + "% " , st.nextToken().toLowerCase()  );	
					and = " and ";
				}
				data.param.where(" ) ");	
			}
		}
		if ( "1".equals(arg.getParamText("def_yn")) ){ /* 실사 일치 품목 제외 체크인 경우 */
			data.param
			.where("    and s.plan_stock <> s.work_stock  													")
			;			
		}
		data.param
			.where("    and b.item_idcd in (select item_idcd from scan_mst where scan_cd like :scan_cd%)                                             ", arg.getParameter("barcode"))
			.where("    and b.brand_id = :brand_id                                                                                                ", arg.getParameter("brand_id"))
			.where("    and b.class_id in (select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id) ", arg.getParameter("class_id"))
			.where("    and a.vend_id = :vend_id                                                                                                  ", arg.getParameter("vend_id"))
			.where(" order by s.mst_itm_id, s.item_idcd                                                                                                ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
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
			
			// invoice 등록/수정/삭제
			if (flag == null || "".equals(flag)) {
				
				if (rowaction == Action.delete) {
					
					throw new ServiceException("삭제불가");
					
				} else {
					
					// 실사계획정보 등록/수정
		        	data.param
		    			.table("adjust_plan")
		    			.where("where plan_no = :plan_no ")
			        	//
						.insert("hq_id"    , row.getParameter("hq_id"   ))
						.insert("stor_grp"    , row.getParameter("stor_grp"   ))
						.insert("stor_id"    , row.getParameter("stor_id"   ))
						.unique("plan_no"     , row.fixParameter("plan_no"    ))
						.update("plan_dt"     , row.getParameter("plan_dt"    ))
//						.insert("confirm_yn"  , row.getParameter("confirm_yn" ))
						.update("confirm_id"  , row.getParameter("confirm_id" ))
//						.update("confirm_dt"  , row.getParameter("confirm_dt" ))
						.update("user_memo"   , row.getParameter("user_memo"  ))
//						.update("sys_memo"   , row.getParameter("sys_memo"  ))
//						.update("row_clos"   , row.getParameter("row_clos"  ))
//						.update("row_sts"   , row.getParameter("row_sts"  ))
						.update("upt_nm"   , row.getParameter("upt_nm"  ))
						.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.insert("crt_nm"   , row.getParameter("crt_nm"  ))
						.insert("crt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.insert("crt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.insert("plan_gb"     , "1")
						.action = rowaction;
		        	data.attach();
				}
			}
			// 마감 / 해지 / 장부재고수집 / 재고반영
			else {
				
				if (rowaction == Action.update) {
					
		        	// 마감&해지
		        	if ("1".equals(flag)) {
			        	data.param
			    			.table("adjust_plan")
			    			.where("where plan_no = :plan_no ")
				        	//
							.unique("plan_no"     , row.fixParameter("plan_no"    ))
							.update("row_clos"   , row.getParameter("row_clos"  ))
							.update("upt_nm"   , row.getParameter("upt_nm"  ))
							.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
							.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
							.action = rowaction;
			        	data.attach();
		        	}
		        	// 장부재고수집
		        	else if ("2".equals(flag)) {

		        		// 1. 이전 수집정보 초기화
			        	data.param
		        			.table("adjust_stock")
		        			.where("where plan_no = :plan_no ")
		        			//
		        			.unique("plan_no"    , row.fixParameter("plan_no"))
							.update("plan_stock" , "0")
		        			.action = rowaction;
		        		data.attach();

			        	// 2. 현재 재고(itm_stock)의 상품별 수량에서 실사계획일자(adjust_plan.plan_dt) 이후 등록(stock_ledger)된 상품의 수량을 뺀 값이 0이 아닌 상품을 모두 adjust_stock 에 update
		        		data.param
			        		.query("merge into adjust_stock a                                                                             ")
			        		.query("using (                                                                                               ")
			        		.query("      select a.plan_no                                                                                ")
			        		.query("            ,a.item_idcd                                                                                ")
			        		.query("            ,(isnull(s.stock, 0) - isnull(b.stock, 0)) as plan_stock                                        ")
			        		.query("        from adjust_stock a                                                                           ")
			        		.query("             left outer join itm_stock s                                                             ")
			        		.query("               on s.stor_id = a.stor_id                                                             ")
			        		.query("              and s.item_idcd = a.item_idcd                                                               ")
			        		.query("             left outer join (                                                                        ")
			        		.query("                             select stor_id                                                          ")
			        		.query("                                   ,item_idcd                                                           ")
			        		.query("                                   ,stock                                                             ")
			        		.query("                               from stock_ledger                                                      ")
			        		.query("                              where row_sts = 0                                                     ")
			        		.query("                                and inv_dt > (                                                        ")
			        		.query("                                             select plan_dt from adjust_plan where plan_no = :plan_no ", row.fixParameter("plan_no"))
			        		.query("                                             )                                                        ")
			        		.query("                             ) b                                                                      ")
			        		.query("                on b.stor_id = a.stor_id                                                            ")
			        		.query("               and b.item_idcd = a.item_idcd                                                              ")
			        		.query("       where a.plan_no = :plan_no                                                                     ", row.fixParameter("plan_no"))
			        		.query("         and a.row_sts = 0                                                                          ")
			        		.query("         and (isnull(s.stock, 0) - isnull(b.stock, 0)) <> 0                                                 ")
			        		.query("      ) b                                                                                             ")
			        		.query("   on (   a.plan_no = b.plan_no                                                                       ")
			        		.query("      and a.item_idcd = b.item_idcd                                                                       ")
			        		.query("      )                                                                                               ")
			        		.query("when matched then                                                                                     ")
			        		.query("update                                                                                                ")
			        		.query("   set a.plan_stock = b.plan_stock                                                                    ")
			        		.query("      ,a.upt_nm = :upt_nm                                                                       ", row.fixParameter("upt_nm"))
			        		.query("      ,a.upt_ip = '" + arg.remoteAddress + "'                                                      ")
			        		.query("      ,a.upt_dttm = to_char(sysdate, 'yyyymmddhh24miss')                                             ")
			        		.action = Action.direct;
			        	data.attach();
		        	}
		        	// 재고반영
		        	else if ("3".equals(flag)) {
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
			        	.query("                  ,sum(decode(b.notax_yn, '0', 0, a.price*(a.work_stock - a.plan_stock)))                                                                                                                                                                           as tax_free ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', a.price*(a.work_stock - a.plan_stock), 0))                                                                                                                                                                           as taxation ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0))                                                                                                                                               as sply_amt ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', (a.price*(a.work_stock - a.plan_stock))-round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0))                                                                                                       as tax      ")
			        	.query("                  ,sum(decode(b.notax_yn, '0', round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), a.price*(a.work_stock - a.plan_stock))                                                                                                                        ")
			        	.query("                     + decode(b.notax_yn, '0', (a.price*(a.work_stock - a.plan_stock))-round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                                    ")
			        	.query("                     + decode(b.notax_yn, '0', 0, a.price*(a.work_stock - a.plan_stock)))                                                                                                                                                                           as amount   ")
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
			        	.query("      ,a.price                                         as unit_price                                                                                                                                                                                               ")
			        	.query("      ,(a.price-a.price)*(a.work_stock - a.plan_stock) as item_halin                                                                                                                                                                                               ")
			        	.query("      ,a.price                                         as price                                                                                                                                                                                                    ")
			        	.query("      ,a.work_stock - a.plan_stock                                                                                                                                                                                                                     as qty      ")
			        	.query("      ,decode(b.notax_yn, '0', 0, a.price*(a.work_stock - a.plan_stock))                                                                                                                                                                               as tax_free ")
			        	.query("      ,decode(b.notax_yn, '0', a.price*(a.work_stock - a.plan_stock), 0)                                                                                                                                                                               as taxation ")
			        	.query("      ,decode(b.notax_yn, '0', round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                                                                   as sply_amt ")
			        	.query("      ,decode(b.notax_yn, '0', (a.price*(a.work_stock - a.plan_stock))-round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                           as tax      ")
			        	.query("      ,decode(b.notax_yn, '0', round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), a.price*(a.work_stock - a.plan_stock))                                                                                                                           ")
			        	.query("         + decode(b.notax_yn, '0', (a.price*(a.work_stock - a.plan_stock))-round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                                   ")
			        	.query("         + decode(b.notax_yn, '0', 0, a.price*(a.work_stock - a.plan_stock))                                                                                                                                                                           as amount   ")
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
			        	.query("      ,a.price                                               as price                                                                                                                                                                                               ")
			        	.query("      ,decode(b.notax_yn, '0', round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), a.price*(a.work_stock - a.plan_stock))                                                                                                                            ")
			        	.query("         + decode(b.notax_yn, '0', (a.price*(a.work_stock - a.plan_stock))-round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                                    ")
			        	.query("         + decode(b.notax_yn, '0', 0, a.price*(a.work_stock - a.plan_stock))                                                                                                                                                                           as amount    ")
			        	.query("      ,a.price                                            as po_pri                                                                                                                                                                                               ")
			        	.query("      ,decode(b.notax_yn, '0', round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), a.price*(a.work_stock - a.plan_stock))                                                                                                                            ")
			        	.query("         + decode(b.notax_yn, '0', (a.price*(a.work_stock - a.plan_stock))-round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                                                                                                    ")
			        	.query("         + decode(b.notax_yn, '0', 0, a.price*(a.work_stock - a.plan_stock))                                                                                                                                                                           as po_amount ")
			        	.query("      ,null                                 as user_memo                                                                                                                                                                                                            ")
			        	.query("      ,null                                 as sys_memo                                                                                                                                                                                                            ")
			        	.query("      ,:upt_nm                                                                                                                                                                                                                                                   ", row.fixParameter("upt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                                                                                                                                                                                                                                  ")
			        	.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm                                                                                                                                                                                                            ")
			        	.query("      ,:crt_nm                                                                                                                                                                                                                                                   ", row.fixParameter("crt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                                                                                                                                                                                                                                  ")
			        	.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm                                                                                                                                                                                                            ")
			        	.query("      ,'9'                                  as price_no                                                                                                                                                                                                             ")
			        	.query("      ,a.price                              as unit_price                                                                                                                                                                                                           ")
			        	.query("      ,a.price                              as cust_price                                                                                                                                                                                                           ")
			        	.query("      ,b.notax_yn                                                                                                                                                                                                                                                   ")
			        	.query("      ,'0'                                  as tax_type                                                                                                                                                                                                             ")
			        	.query("      ,c.tax_rt                                                                                                                                                                                                                                                   ")
			        	.query("      ,decode(b.notax_yn, '0', round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0)                                         as sply_amt                                                                                                            ")
			        	.query("      ,decode(b.notax_yn, '0', (a.price*(a.work_stock - a.plan_stock))-round((a.price*(a.work_stock - a.plan_stock))/(c.tax_rt/100+1)), 0) as tax                                                                                                                 ")
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
	
	/**
	 * detail 삭제
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {

			String flag = row.getParamText("_flag");

			if ("delete".equals(flag)) {

				// 품목 삭제
	        	data.param
        			.table("adjust_stock")
        			.where("where plan_no = :plan_no              ")
        			.where("  and item_idcd = :item_idcd              ")
        			//
        			.unique("plan_no" , row.fixParameter("plan_no"))
        			.unique("item_idcd" , row.fixParameter("item_idcd"))
        		;
        		data.attach(Action.delete);
			}
		}
		
		data.execute();
		return null;
	}
	
	/**
	 * 삭제
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		
		// 실사계획상세 삭제
    	data.param
    		.table("adjust_stock")
    		.where("where plan_no = :plan_no ")
    		//
    		.unique("plan_no"  , arg.fixParameter("plan_no"))
    		.update("row_sts", 2)
			.update("upt_nm", arg.getParameter("upt_nm"))
			.update("upt_ip", arg.remoteAddress)
			.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    	;data.attach(Action.update);
		
    	// 실사계획정보 삭제
    	data.param
			.table("adjust_plan")
			.where("where plan_no = :plan_no ")
			//
			.unique("plan_no"  , arg.fixParameter("plan_no"))
    		.update("row_sts", 2)
			.update("upt_nm", arg.getParameter("upt_nm"))
			.update("upt_ip", arg.remoteAddress)
			.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    	;data.attach(Action.update);
    	
		data.execute();
		return null;
	}

	/**
	 * 상품검색
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
		
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select :plan_no as plan_no                                                                                                     ", arg.fixParameter("plan_no"))
			.query("      ,b.item_idcd                                                                                                               ")
			.query("      ,b.mst_itm_id                                                                                                               ")
			.query("      ,b.mst_itm_cd                                                                                                               ")
			.query("      ,b.brcd_1                                                                                                              ")
			.query("      ,(select bas_nm from base_mst where bas_id = b.brand_id) as brand_nm                                                  ")
			.query("      ,b.item_name                                                                                                               ")
			.query("      ,b.item_spec                                                                                                               ")
			.query("      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd)  as unit_name                                                   ")
			.query("      ,b.unt_qty                                                                                                              ")
			.query("      ,decode(a.stad_sale_pri, 0, b.stad_sale_pri, a.stad_sale_pri)        as stad_sale_pri                                                ")
			.query("      ,(select bas_nm from base_mst where bas_id = b.mfg_id)   as mfg_nm                                                    ")
		;
		data.param // 조건
			.where("  from itm_stor a                                                                                                            ")
			.where("       join itm_mst b                                                                                                        ")
			.where("         on b.item_idcd = a.item_idcd                                                                                              ")
		;

		if ("true".equals(arg.getParamText("has_stock_yn"))) {
			// StockListService.java 참고
			data.param
			.where("       join                                                                                                                    ")
			.where("       (                                                                                                                       ")
			.where("       select t.stor_id                                                                                                       ")
			.where("             ,t.item_idcd                                                                                                        ")
			.where("             ,t.stock_qty                                                                                                      ")
			.where("             ,t.stock_amt                                                                                                      ")
			.where("             ,t.stock_qty-isnull(l.tot_qty, 0) as trans_qty                                                                       ")
			.where("             ,t.stock_amt-isnull(l.tot_amt, 0) as trans_amt                                                                       ")
			.where("         from (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.mst_itm_id as item_idcd                                                                                      ")
			.where("                    ,sum(a.stock_qty) as stock_qty                                                                             ")
			.where("                    ,sum(a.stock_amt) as stock_amt                                                                             ")
			.where("                from (                                                                                                         ")
			.where("                     select a.stor_id                                                                                         ")
			.where("                           ,a.mst_itm_id                                                                                          ")
			.where("                           ,a.item_idcd                                                                                          ")
			.where("                           ,a.stock*i.unt_qty                                            as stock_qty                         ")
			.where("                           ,decode(isnull(s.po_pri, 0), 0, i.po_pri, s.po_pri)*a.stock as stock_amt                         ")
			.where("                       from itm_stock a                                                                                       ")
			.where("                            left outer join itm_stor s                                                                       ")
			.where("                              on s.stor_id = a.stor_id                                                                       ")
			.where("                             and s.item_idcd = a.item_idcd                                                                         ")
			.where("                            left outer join itm_mst i                                                                        ")
			.where("                              on i.item_idcd = a.item_idcd                                                                         ")
			.where("                      where a.stor_grp = :stor_grp                                                                             ", arg.fixParameter("stor_grp"))
			.where("                        and a.stor_id = :stor_id                                                                             ", arg.fixParameter("stor_id"))
			.where("                        and a.row_sts = :stock_state                                                                         ", arg.getParameter("stock_state"))
			.where("                     ) a                                                                                                       ")
			.where("               group by a.stor_id, a.mst_itm_id                                                                                  ")
			.where("              ) t                                                                                                              ")
			.where("              left outer join                                                                                                  ")
			.where("              (                                                                                                                ")
			.where("              select a.stor_id                                                                                                ")
			.where("                    ,a.mst_itm_id as item_idcd                                                                                      ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', a.stock*i.unt_qty, '2071302', a.stock*i.unt_qty, '2071303', a.stock*i.unt_qty, '2071304', a.stock*i.unt_qty, '2071305', a.stock*i.unt_qty, '2071306', a.stock*i.unt_qty, 0)) as tot_qty ")
			.where("                    ,sum(decode(a.inv_wk, '2071301', -a.po_amount,       '2071302', a.po_amount,        '2071303', -a.po_amount,       '2071304', a.po_amount,        '2071305', a.po_amount,        '2071306', a.po_amount,        0)) as tot_amt ")
			.where("                from stock_ledger a                                                                                            ")
			.where("                     left outer join itm_mst i                                                                               ")
			.where("                       on i.item_idcd = a.item_idcd                                                                                ")
			.where("               where a.row_sts = 0                                                                                           ")
			.where("                 and a.stor_grp = :stor_grp                                                                                    ", arg.fixParameter("stor_grp"))
			.where("                 and a.stor_id = :stor_id                                                                                    ", arg.getParameter("stor_id"))
			.where("                 and a.inv_dt >= :fr_dt                                                                                        ", arg.fixParameter("fr_dt"))
			.where("               group by a.stor_id, a.mst_itm_id                                                                                  ")
			.where("              ) l on l.stor_id = t.stor_id                                                                                   ")
			.where("                 and l.item_idcd = t.item_idcd                                                                                     ")
			.where("       ) c on c.stor_id = a.stor_id                                                                                          ")
			.where("          and c.item_idcd = a.item_idcd                                                                                            ")
			.where("       left outer join                                                                                                         ")
			.where("       (                                                                                                                       ")
			.where("       select a.stor_id                                                                                                       ")
			.where("             ,a.mst_itm_id as item_idcd                                                                                             ")
			.where("             ,sum(decode(a.inv_wk, '2071301', a.stock*i.unt_qty, '2071302', a.stock*i.unt_qty, '2071303', a.stock*i.unt_qty, '2071304', a.stock*i.unt_qty, '2071305', a.stock*i.unt_qty, '2071306', a.stock*i.unt_qty, 0)) as tot_qty ")
			.where("             ,sum(decode(a.inv_wk, '2071301', -a.po_amount,       '2071302', a.po_amount,        '2071303', -a.po_amount,       '2071304', a.po_amount,        '2071305', a.po_amount,        '2071306', a.po_amount,        0)) as tot_amt ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.stock*i.unt_qty  else 0 end), 0)) as in_qty          ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.po_amount         else 0 end), 0)) as in_amt          ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.stock*i.unt_qty else 0 end), 0)) as inret_qty       ")
			.where("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.po_amount        else 0 end), 0)) as inret_amt       ")
			.where("             ,sum(decode(a.inv_wk, '2071304', a.stock*i.unt_qty, 0))                                       as movein_qty      ")
			.where("             ,sum(decode(a.inv_wk, '2071304', a.po_amount, 0))                                              as movein_amt      ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then -a.stock*i.unt_qty else 0 end), 0)) as out_qty         ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then a.po_amount         else 0 end), 0)) as out_amt         ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then a.stock*i.unt_qty  else 0 end), 0)) as outret_qty      ")
			.where("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then -a.po_amount        else 0 end), 0)) as outret_amt      ")
			.where("             ,sum(decode(a.inv_wk, '2071303', -a.stock*i.unt_qty, 0))                                      as moveout_qty     ")
			.where("             ,sum(decode(a.inv_wk, '2071303', a.po_amount, 0))                                              as moveout_amt     ")
			.where("             ,sum(decode(a.inv_wk, '2071306', -a.stock*i.unt_qty, 0))                                      as etcout_qty      ")
			.where("             ,sum(decode(a.inv_wk, '2071306', -a.po_amount, 0))                                             as etcout_amt      ")
			.where("             ,sum(decode(a.inv_wk, '2071305', a.stock*i.unt_qty, 0))                                       as modi_qty        ")
			.where("             ,sum(decode(a.inv_wk, '2071305', a.po_amount, 0))                                              as modi_amt        ")
			.where("         from stock_ledger a                                                                                                   ")
			.where("              left outer join itm_mst i                                                                                      ")
			.where("                on i.item_idcd = a.item_idcd                                                                                       ")
			.where("        where a.row_sts = 0                                                                                                  ")
			.where("          and a.stor_grp = :stor_grp                                                                                           ", arg.fixParameter("stor_grp"))
			.where("          and a.stor_id = :stor_id                                                                                           ", arg.getParameter("stor_id"))
			.where("          and a.inv_dt between :fr_dt                                                                                          ", arg.fixParameter("fr_dt"))
			.where("                           and :to_dt                                                                                          ", arg.fixParameter("to_dt"))
			.where("        group by a.stor_id, a.mst_itm_id                                                                                         ")
			.where("       ) d on d.stor_id = a.stor_id                                                                                          ")
			.where("          and d.item_idcd = a.item_idcd                                                                                            ")
			;
		}

		data.param
			.where(" where a.mst_itm_id = a.item_idcd                                                                                                   ")
//			.where("   and b.stk_itm_yn = '1'                                                                                                        ")
			.where("   and a.mst_itm_id not in                                                                                                        ")
			.where("       (                                                                                                                       ")
			.where("       select mst_itm_id                                                                                                          ")
			.where("         from adjust_stock                                                                                                     ")
			.where("        where plan_no = :plan_no                                                                                               ", arg.fixParameter("plan_no"))
			.where("          and row_sts = 0                                                                                                    ")
			.where("       )                                                                                                                       ")
			.where("   and a.stor_id = :stor_id                                                                                                  ", arg.fixParameter("stor_id"))
		;
		if (!"".equals( arg.getParamText("item_name"   ) )){
			StringTokenizer st = new StringTokenizer(arg.getParamText("item_name"   )," ");
			if (st.countTokens() == 1) {
				data.param.where(" and  b.find_name like %:find_name% " , st.nextToken().toLowerCase());	
			} else {
				int i = 0;
				String and = "";
				data.param.where(" and  (  ");
				while(st.hasMoreTokens()){
					data.param.where( and +  " b.find_name like %:find_name" + i++ + "% " , st.nextToken().toLowerCase()  );	
					and = " and ";
				}
				data.param.where(" ) ");	
			}
		}
		data.param
			.where("   and b.mst_itm_id in (select mst_itm_id from scan_mst where scan_cd like :scan_cd%)                                               ", arg.getParameter("barcode"))
			.where("   and b.brand_id = :brand_id                                                                                                  ", arg.getParameter("brand_id"))
			.where("   and b.class_id in (select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id)   ", arg.getParameter("class_id"))
			.where("   and a.vend_id = :vend_id                                                                                                    ", arg.getParameter("vend_id"))
		;
		if ("true".equals(arg.getParamText("has_stock_yn"))) {
			data.param
			.where("   and (                                                                                                                       ")
			.where("          ( isnull(d.in_qty, 0) <> 0 or isnull(d.inret_qty, 0) <> 0 or isnull(d.movein_qty, 0) <> 0 or isnull(d.out_qty, 0) <> 0 or isnull(d.outret_qty, 0) <> 0 or isnull(d.moveout_qty, 0) <> 0 or isnull(d.etcout_qty, 0) <> 0 or isnull(d.modi_qty, 0) <> 0 ) ") // 조회기간 실적 있는 경우 포함
			.where("       or ( c.trans_qty <> 0 )                                                                                                 ") // 이월 있는 경우 포함
			.where("       or ( c.stock_qty-c.trans_qty-isnull(d.tot_qty, 0) <> 0 )                                                                   ") // 조회기간이후 재고 증감 있는 경우 포함
			.where("       or ( c.stock_qty <> 0 )                                                                                                 ") // 재고 있는 경우 포함
			.where("       )                                                                                                                       ")
			;
		}
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.where("   and a.row_sts = 0                                                                                                         ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.where("   and a.sale_epo = '1'                                                                                                        ")
			;
		}
		data.param
			.where(" order by b.mst_itm_cd                                                                                                            ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}
	
	/**
	 * 조사대상상품 선택등록
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setItem(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			
			String flag = row.getParamText("_flag");
			
			if ("insert".equals(flag)) {
				data.param
	        		.query("insert into adjust_stock ( hq_id, stor_grp, stor_id, plan_no, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd, item_code, item_name, plan_stock, work_stock, price, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm ) ")
					.query("select a.hq_id                                             ")
					.query("      ,a.stor_grp                                             ")
					.query("      ,a.stor_id                                             ")
					.query("      ,:plan_no as plan_no                                    ", row.fixParameter("plan_no"))
					.query("      ,b.mst_itm_id                                              ")
					.query("      ,b.mst_itm_cd                                              ")
					.query("      ,b.unit_idcd                                              ")
					.query("      ,b.unt_qty                                             ")
					.query("      ,b.item_idcd                                              ")
					.query("      ,b.item_code                                              ")
					.query("      ,b.item_name                                              ")
					.query("      ,0 as plan_stock                                        ")
					.query("      ,0 as work_stock                                        ")
					.query("      ,decode(a.po_pri, 0, b.po_pri, a.po_pri) as price ")
					.query("      ,:upt_nm                                             ", row.fixParameter("upt_nm"))
					.query("      ,'" + arg.remoteAddress + "'                            ")
					.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm      ")
					.query("      ,:crt_nm                                             ", row.fixParameter("crt_nm"))
					.query("      ,'" + arg.remoteAddress + "'                            ")
					.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm      ")
					.query("  from itm_stor a                                           ")
					.query("       join itm_mst b                                       ")
					.query("         on b.item_idcd = a.item_idcd                             ")
					.query("  where a.row_sts = 0                                       ")
					.query("    and a.stor_id = :stor_id                                ", row.fixParameter("stor_id"))
					.query("    and b.mst_itm_id = :mst_itm_id                                  ", row.fixParameter("mst_itm_id"))
				;
	        	data.attach(Action.direct);
			}
		}
		
		data.execute();
		return null;
	}
	
	/**
	 * 조사대상상품 선택등록
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setAllItem(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		
		data.param
			.query("insert into adjust_stock ( hq_id, stor_grp, stor_id, plan_no, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd, item_code, item_name, plan_stock, work_stock, price, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm ) ")
			.query("select a.hq_id                                                                                                             ")
			.query("      ,a.stor_grp                                                                                                             ")
			.query("      ,a.stor_id                                                                                                             ")
			.query("      ,:plan_no as plan_no                                                                                                    ", arg.fixParameter("plan_no"))
			.query("      ,b.mst_itm_id                                                                                                              ")
			.query("      ,b.mst_itm_cd                                                                                                              ")
			.query("      ,b.unit_idcd                                                                                                              ")
			.query("      ,b.unt_qty                                                                                                             ")
			.query("      ,b.item_idcd                                                                                                              ")
			.query("      ,b.item_code                                                                                                              ")
			.query("      ,b.item_name                                                                                                              ")
			.query("      ,0 as plan_stock                                                                                                        ")
			.query("      ,0 as work_stock                                                                                                        ")
			.query("      ,decode(a.po_pri, 0, b.po_pri, a.po_pri) as price                                                                 ")
			.query("      ,:upt_nm                                                                                                             ", arg.fixParameter("upt_nm"))
			.query("      ,'" + arg.remoteAddress + "'                                                                                            ")
			.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm                                                                      ")
			.query("      ,:crt_nm                                                                                                             ", arg.fixParameter("crt_nm"))
			.query("      ,'" + arg.remoteAddress + "'                                                                                            ")
			.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm                                                                      ")
			.query("  from itm_stor a                                                                                                           ")
			.query("       join itm_mst b                                                                                                       ")
			.query("         on b.item_idcd = a.item_idcd                                                                                             ")
		;

		if ("true".equals(arg.getParamText("has_stock_yn"))) {
			// StockListService.java 참고
			data.param
			.query("       join                                                                                                                    ")
			.query("       (                                                                                                                       ")
			.query("       select t.stor_id                                                                                                       ")
			.query("             ,t.item_idcd                                                                                                        ")
			.query("             ,t.stock_qty                                                                                                      ")
			.query("             ,t.stock_amt                                                                                                      ")
			.query("             ,t.stock_qty-isnull(l.tot_qty, 0) as trans_qty                                                                       ")
			.query("             ,t.stock_amt-isnull(l.tot_amt, 0) as trans_amt                                                                       ")
			.query("         from (                                                                                                                ")
			.query("              select a.stor_id                                                                                                ")
			.query("                    ,a.mst_itm_id as item_idcd                                                                                      ")
			.query("                    ,sum(a.stock_qty) as stock_qty                                                                             ")
			.query("                    ,sum(a.stock_amt) as stock_amt                                                                             ")
			.query("                from (                                                                                                         ")
			.query("                     select a.stor_id                                                                                         ")
			.query("                           ,a.mst_itm_id                                                                                          ")
			.query("                           ,a.item_idcd                                                                                          ")
			.query("                           ,a.stock*i.unt_qty                                            as stock_qty                         ")
			.query("                           ,decode(isnull(s.po_pri, 0), 0, i.po_pri, s.po_pri)*a.stock as stock_amt                         ")
			.query("                       from itm_stock a                                                                                       ")
			.query("                            left outer join itm_stor s                                                                       ")
			.query("                              on s.stor_id = a.stor_id                                                                       ")
			.query("                             and s.item_idcd = a.item_idcd                                                                         ")
			.query("                            left outer join itm_mst i                                                                        ")
			.query("                              on i.item_idcd = a.item_idcd                                                                         ")
			.query("                      where a.stor_grp = :stor_grp                                                                             ", arg.fixParameter("stor_grp"))
			.query("                        and a.stor_id = :stor_id                                                                             ", arg.fixParameter("stor_id"))
			.query("                        and a.row_sts = :stock_state                                                                         ", arg.getParameter("stock_state"))
			.query("                     ) a                                                                                                       ")
			.query("               group by a.stor_id, a.mst_itm_id                                                                                  ")
			.query("              ) t                                                                                                              ")
			.query("              left outer join                                                                                                  ")
			.query("              (                                                                                                                ")
			.query("              select a.stor_id                                                                                                ")
			.query("                    ,a.mst_itm_id as item_idcd                                                                                      ")
			.query("                    ,sum(decode(a.inv_wk, '2071301', a.stock*i.unt_qty, '2071302', a.stock*i.unt_qty, '2071303', a.stock*i.unt_qty, '2071304', a.stock*i.unt_qty, '2071305', a.stock*i.unt_qty, '2071306', a.stock*i.unt_qty, 0)) as tot_qty ")
			.query("                    ,sum(decode(a.inv_wk, '2071301', -a.po_amount,       '2071302', a.po_amount,        '2071303', -a.po_amount,       '2071304', a.po_amount,        '2071305', a.po_amount,        '2071306', a.po_amount,        0)) as tot_amt ")
			.query("                from stock_ledger a                                                                                            ")
			.query("                     left outer join itm_mst i                                                                               ")
			.query("                       on i.item_idcd = a.item_idcd                                                                                ")
			.query("               where a.row_sts = 0                                                                                           ")
			.query("                 and a.stor_grp = :stor_grp                                                                                    ", arg.fixParameter("stor_grp"))
			.query("                 and a.stor_id = :stor_id                                                                                    ", arg.getParameter("stor_id"))
			.query("                 and a.inv_dt >= :fr_dt                                                                                        ", arg.fixParameter("fr_dt"))
			.query("               group by a.stor_id, a.mst_itm_id                                                                                  ")
			.query("              ) l on l.stor_id = t.stor_id                                                                                   ")
			.query("                 and l.item_idcd = t.item_idcd                                                                                     ")
			.query("       ) c on c.stor_id = a.stor_id                                                                                          ")
			.query("          and c.item_idcd = a.mst_itm_id                                                                                            ")
			.query("       left outer join                                                                                                         ")
			.query("       (                                                                                                                       ")
			.query("       select a.stor_id                                                                                                       ")
			.query("             ,a.mst_itm_id as item_idcd                                                                                             ")
			.query("             ,sum(decode(a.inv_wk, '2071301', a.stock*i.unt_qty, '2071302', a.stock*i.unt_qty, '2071303', a.stock*i.unt_qty, '2071304', a.stock*i.unt_qty, '2071305', a.stock*i.unt_qty, '2071306', a.stock*i.unt_qty, 0)) as tot_qty ")
			.query("             ,sum(decode(a.inv_wk, '2071301', -a.po_amount,       '2071302', a.po_amount,        '2071303', -a.po_amount,       '2071304', a.po_amount,        '2071305', a.po_amount,        '2071306', a.po_amount,        0)) as tot_amt ")
			.query("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.stock*i.unt_qty  else 0 end), 0)) as in_qty          ")
			.query("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty>=0 then a.po_amount         else 0 end), 0)) as in_amt          ")
			.query("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.stock*i.unt_qty else 0 end), 0)) as inret_qty       ")
			.query("             ,sum(decode(a.inv_wk, '2071302', (case when a.qty< 0 then -a.po_amount        else 0 end), 0)) as inret_amt       ")
			.query("             ,sum(decode(a.inv_wk, '2071304', a.stock*i.unt_qty, 0))                                       as movein_qty      ")
			.query("             ,sum(decode(a.inv_wk, '2071304', a.po_amount, 0))                                              as movein_amt      ")
			.query("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then -a.stock*i.unt_qty else 0 end), 0)) as out_qty         ")
			.query("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty>=0 then a.po_amount         else 0 end), 0)) as out_amt         ")
			.query("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then a.stock*i.unt_qty  else 0 end), 0)) as outret_qty      ")
			.query("             ,sum(decode(a.inv_wk, '2071301', (case when a.qty< 0 then -a.po_amount        else 0 end), 0)) as outret_amt      ")
			.query("             ,sum(decode(a.inv_wk, '2071303', -a.stock*i.unt_qty, 0))                                      as moveout_qty     ")
			.query("             ,sum(decode(a.inv_wk, '2071303', a.po_amount, 0))                                              as moveout_amt     ")
			.query("             ,sum(decode(a.inv_wk, '2071306', -a.stock*i.unt_qty, 0))                                      as etcout_qty      ")
			.query("             ,sum(decode(a.inv_wk, '2071306', -a.po_amount, 0))                                             as etcout_amt      ")
			.query("             ,sum(decode(a.inv_wk, '2071305', a.stock*i.unt_qty, 0))                                       as modi_qty        ")
			.query("             ,sum(decode(a.inv_wk, '2071305', a.po_amount, 0))                                              as modi_amt        ")
			.query("         from stock_ledger a                                                                                                   ")
			.query("              left outer join itm_mst i                                                                                      ")
			.query("                on i.item_idcd = a.item_idcd                                                                                       ")
			.query("        where a.row_sts = 0                                                                                                  ")
			.query("          and a.stor_grp = :stor_grp                                                                                           ", arg.fixParameter("stor_grp"))
			.query("          and a.stor_id = :stor_id                                                                                           ", arg.getParameter("stor_id"))
			.query("          and a.inv_dt between :fr_dt                                                                                          ", arg.fixParameter("fr_dt"))
			.query("                           and :to_dt                                                                                          ", arg.fixParameter("to_dt"))
			.query("        group by a.stor_id, a.mst_itm_id                                                                                         ")
			.query("       ) d on d.stor_id = a.stor_id                                                                                          ")
			.query("          and d.item_idcd = a.mst_itm_id                                                                                            ")
			;
		}
		
		data.param
			.query("  where 1 = 1                                                                                                                 ")
//			.query("    and b.stk_itm_yn = '1'                                                                                                      ")
			.query("    and a.mst_itm_id not in                                                                                                      ")
			.query("        (                                                                                                                     ")
			.query("        select mst_itm_id                                                                                                        ")
			.query("          from adjust_stock                                                                                                   ")
			.query("         where plan_no = :plan_no                                                                                             ", arg.fixParameter("plan_no"))
			.query("           and row_sts = 0                                                                                                  ")
			.query("        )                                                                                                                     ")
			.query("    and a.stor_id = :stor_id                                                                                                ", arg.fixParameter("stor_id"))
		;
		if (!"".equals( arg.getParamText("item_name"   ) )){
			StringTokenizer st = new StringTokenizer(arg.getParamText("item_name"   )," ");
			if (st.countTokens() == 1) {
				data.param.query(" and  b.find_name like %:find_name% " , st.nextToken().toLowerCase());	
			} else {
				int i = 0;
				String and = "";
				data.param.query(" and  (  ");
				while(st.hasMoreTokens()){
					data.param.query( and +  " b.find_name like %:find_name" + i++ + "% " , st.nextToken().toLowerCase()  );	
					and = " and ";
				}
				data.param.query(" ) ");	
			}
		}
		data.param
			.query("    and b.mst_itm_id in (select mst_itm_id from scan_mst where scan_cd like :scan_cd%)                                             ", arg.getParameter("barcode"))
			.query("    and b.brand_id = :brand_id                                                                                                ", arg.getParameter("brand_id"))
			.query("    and b.class_id in (select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id) ", arg.getParameter("class_id"))
			.query("    and a.vend_id = :vend_id                                                                                                  ", arg.getParameter("vend_id"))
		;
		if ("true".equals(arg.getParamText("has_stock_yn"))) {
			data.param
			.query("   and (                                                                                                                       ")
			.query("          ( isnull(d.in_qty, 0) <> 0 or isnull(d.inret_qty, 0) <> 0 or isnull(d.movein_qty, 0) <> 0 or isnull(d.out_qty, 0) <> 0 or isnull(d.outret_qty, 0) <> 0 or isnull(d.moveout_qty, 0) <> 0 or isnull(d.etcout_qty, 0) <> 0 or isnull(d.modi_qty, 0) <> 0 ) ") // 조회기간 실적 있는 경우 포함
			.query("       or ( c.trans_qty <> 0 )                                                                                                 ") // 이월 있는 경우 포함
			.query("       or ( c.stock_qty-c.trans_qty-isnull(d.tot_qty, 0) <> 0 )                                                                   ") // 조회기간이후 재고 증감 있는 경우 포함
			.query("       or ( c.stock_qty <> 0 )                                                                                                 ") // 재고 있는 경우 포함
			.query("       )                                                                                                                       ")
			;
		}
		if ("false".equals(arg.getParamText("row_state_yn"))) {
			data.param
			.query("    and a.row_sts = 0                                                                                                       ")
			;
		}
		if ("true".equals(arg.getParamText("sale_epo_yn"))) {
			data.param
			.query("    and a.sale_epo = '1'                                                                                                      ")
			;
		}
    	data.attach(Action.direct);

		data.execute();
		return null;
	}
}
