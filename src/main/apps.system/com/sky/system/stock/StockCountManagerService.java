package com.sky.system.stock;

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
public class StockCountManagerService  extends DefaultServiceHandler {

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
		.query("                  ,sum(a.unt_qty*a.qty) as work_stock_amt ")
		//.query("                  ,sum(a.unt_qty*a.qty*b.po_pri) as work_stock_amt ")
		.query("              from adjust_item a                                      ")
		.query("                   left outer join itm_mst b                        ")
		.query("                     on b.item_idcd = a.item_idcd                         ")
		.query("             where a.row_sts = 0                                     ")
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
		.query("   and a.row_sts = 0 				                                  ")
		.query(" order by c.stor_nm, d.dept_nm, e.emp_nm                            ")
		;
		
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
		.query("select a.stor_id                     ")
		.query("      ,b.stor_nm                     ")
		.query("      ,a.plan_no                      ")
		.query("      ,a.plan_dt                      ")
		.query("      ,a.confirm_id                   ")
		.query("      ,c.emp_nm     as confirm_nm    ")
		.query("      ,a.user_memo                    ")
		.query("  from adjust_plan a                  ")
		.query("       left outer join store b        ")
		.query("         on b.stor_id = a.stor_id   ")
		.query("       left outer join usr_mst c    ")
		.query("         on c.emp_id = a.confirm_id  ")
		.query(" where a.plan_no = :plan_no           ", arg.fixParameter("plan_no" ))
		.query("   and a.row_sts = 0 				  ")
		;

		SqlResultMap info = data.selectForMap();

		return info;
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
					
//					// 실사계획정보 삭제
//		        	data.param
//	        			.table("adjust_plan")
//	        			.where("where plan_no = :plan_no              ")
//	        			//
//	        			.unique("plan_no" , row.fixParameter("plan_no"))
//	        			.action = rowaction;
//	        		data.attach();
//
//					// 실사계획상세 삭제
//		        	data.param
//	        			.table("adjust_stock")
//	        			.where("where plan_no = :plan_no              ")
//	        			//
//	        			.unique("plan_no" , row.fixParameter("plan_no"))
//	        			.action = rowaction;
//		        	data.attach();

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
						.action = rowaction;
		        	data.attach();
				}
			}
			// 마감 / 해지 / 장부재고수집
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
		        	if ("2".equals(flag)) {

		        		// 1. 이전 수집정보 삭제
			        	data.param
		        			.table("adjust_stock")
		        			.where("where plan_no = :plan_no              ")
		        			//
		        			.unique("plan_no" , row.fixParameter("plan_no"))
		        			.action = Action.delete;
		        		data.attach();

			        	// 2. 현재 재고(itm_stock)의 상품별 수량에서 실사계획일자(adjust_plan.plan_dt) 이후 등록(stock_ledger)된 상품의 수량을 뺀 값이 0이 아닌 상품을 모두 adjust_stock 에 insert
		        		data.param
		        		.query("insert into adjust_stock ( hq_id, stor_grp, stor_id, plan_no, mst_itm_id, mst_itm_cd, unit_idcd, item_idcd, item_code, item_name, plan_stock, price, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm ) ")
		        		.query("select a.hq_id                                                                                           ")
		        		.query("      ,a.stor_grp                                                                                           ")
		        		.query("      ,a.stor_id                                                                                           ")
		        		.query("      ,a.plan_no                                                                                            ")
		        		.query("      ,c.mst_itm_id                                                                                            ")
		        		.query("      ,c.mst_itm_cd                                                                                            ")
		        		.query("      ,c.unit_idcd                                                                                            ")
		        		.query("      ,c.item_idcd                                                                                            ")
		        		.query("      ,c.item_code                                                                                            ")
		        		.query("      ,c.item_name                                                                                            ")
		        		.query("      ,b.plan_stock                                                                                         ")
		        		.query("      ,c.po_pri as price                                                                                  ")
						.query("      ,:upt_nm                                                                                           ", row.fixParameter("upt_nm"))
						.query("      ,'" + arg.remoteAddress + "'                                                                          ")
						.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm                                                    ")
						.query("      ,:crt_nm                                                                                           ", row.fixParameter("crt_nm"))
						.query("      ,'" + arg.remoteAddress + "'                                                                          ")
						.query("      ,to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm                                                    ")
		        		.query("  from adjust_plan a                                                                                        ")
		        		.query("       join (                                                                                               ")
		        		.query("            select a.stor_id                                                                               ")
		        		.query("                  ,a.mst_itm_id                           as item_idcd                                           ")
		        		.query("                  ,sum(a.stock) - isnull(sum(b.stock), 0) as plan_stock                                        ")
		        		.query("              from itm_stock a                                                                             ")
		        		.query("                   left outer join (                                                                        ")
		        		.query("                                   select stor_id                                                          ")
		        		.query("                                         ,item_idcd                                                           ")
		        		.query("                                         ,stock                                                             ")
		        		.query("                                     from stock_ledger                                                      ")
		        		.query("                                    where row_sts = 0                                                     ")
		        		.query("                                      and inv_dt > (                                                        ")
		        		.query("                                                   select plan_dt from adjust_plan where plan_no = :plan_no ", row.fixParameter("plan_no"))
		        		.query("                                                   )                                                        ")
		        		.query("                                   ) b                                                                      ")
		        		.query("                      on b.stor_id = a.stor_id                                                            ")
		        		.query("                     and b.item_idcd = a.item_idcd                                                              ")
		        		.query("             where a.row_sts = 0                                                                          ")
		        		.query("            having sum(a.stock) - isnull(sum(b.stock), 0) <> 0                                                 ")
		        		.query("             group by a.stor_id, a.mst_itm_id                                                                 ")
		        		.query("            ) b                                                                                             ")
		        		.query("         on b.stor_id = a.stor_id                                                                         ")
		        		.query("       join itm_mst c                                                                                     ")
		        		.query("         on c.item_idcd = b.item_idcd                                                                           ")
		        		.query(" where a.plan_no = :plan_no                                                                                 ", row.fixParameter("plan_no"))
		        		.query("   and a.row_sts = 0                                                                                      ")
						.action = Action.direct;
			        	data.attach();

			        	// 3. adjust_item 의 item_idcd 별로 수량을 더하여 adjust_stock 에 상품이 있으면 work_stock field 에 update, 없으면 insert
		        		data.param
		        		.query("merge into adjust_stock a                                 ")
		        		.query("using (                                                   ")
		        		.query("      select a.hq_id                                   ")
		        		.query("            ,a.stor_grp                                   ")
		        		.query("            ,a.stor_id                                   ")
		        		.query("            ,a.plan_no                                    ")
		        		.query("            ,c.mst_itm_id                                    ")
		        		.query("            ,c.mst_itm_cd                                    ")
		        		.query("            ,c.unit_idcd                                    ")
		        		.query("            ,c.item_idcd                                    ")
		        		.query("            ,c.item_code                                    ")
		        		.query("            ,c.item_name                                    ")
		        		.query("            ,b.work_stock                                 ")
		        		.query("            ,c.po_pri as price                          ")
		        		.query("        from adjust_plan a                                ")
		        		.query("             join (                                       ")
		        		.query("                  select plan_no                          ")
		        		.query("                        ,mst_itm_id           as item_idcd     ")
		        		.query("                        ,sum(unt_qty*qty) as work_stock  ")
		        		.query("                    from adjust_item                      ")
		        		.query("                   where row_sts = 0                    ")
		        		.query("                   group by plan_no, mst_itm_id              ")
		        		.query("                  ) b                                     ")
		        		.query("               on b.plan_no = a.plan_no                   ")
		        		.query("             join itm_mst c                             ")
		        		.query("               on c.item_idcd = b.item_idcd                   ")
		        		.query("       where a.plan_no = :plan_no                         ", row.fixParameter("plan_no"))
		        		.query("         and a.row_sts = 0                              ")
		        		.query("      ) b                                                 ")
		        		.query("   on (      a.plan_no = b.plan_no                        ")
		        		.query("         and a.item_idcd = b.item_idcd                        ")
		        		.query("      )                                                   ")
		        		.query("when matched then                                         ")
		        		.query("update                                                    ")
		        		.query("   set a.work_stock = b.work_stock                        ")
		        		.query("      ,a.upt_nm = :upt_nm                           ", row.fixParameter("upt_nm"))
		        		.query("      ,a.upt_ip = '" + arg.remoteAddress + "'          ")
		        		.query("      ,a.upt_dttm = to_char(sysdate, 'yyyymmddhh24miss') ")
		        		.query("when not matched then                                     ")
		        		.query("insert (                                                  ")
		        		.query("       hq_id                                           ")
		        		.query("      ,stor_grp                                           ")
		        		.query("      ,stor_id                                           ")
		        		.query("      ,plan_no                                            ")
		        		.query("      ,mst_itm_id                                            ")
		        		.query("      ,mst_itm_cd                                            ")
		        		.query("      ,unit_idcd                                            ")
		        		.query("      ,item_idcd                                            ")
		        		.query("      ,item_code                                            ")
		        		.query("      ,item_name                                            ")
		        		.query("      ,work_stock                                         ")
		        		.query("      ,price                                              ")
		        		.query("      ,upt_nm                                          ")
		        		.query("      ,upt_ip                                          ")
		        		.query("      ,upt_dttm                                          ")
		        		.query("      ,crt_nm                                          ")
		        		.query("      ,crt_ip                                          ")
		        		.query("      ,crt_dttm                                          ")
		        		.query("       )                                                  ")
		        		.query("values (                                                  ")
		        		.query("       b.hq_id                                         ")
		        		.query("      ,b.stor_grp                                         ")
		        		.query("      ,b.stor_id                                         ")
		        		.query("      ,b.plan_no                                          ")
		        		.query("      ,b.mst_itm_id                                          ")
		        		.query("      ,b.mst_itm_cd                                          ")
		        		.query("      ,b.unit_idcd                                          ")
		        		.query("      ,b.item_idcd                                          ")
		        		.query("      ,b.item_code                                          ")
		        		.query("      ,b.item_name                                          ")
		        		.query("      ,b.work_stock                                       ")
		        		.query("      ,b.price                                            ")
		        		.query("      ,:upt_nm                                         ", row.fixParameter("upt_nm"))
		        		.query("      ,'" + arg.remoteAddress + "'                        ")
		        		.query("      ,to_char(sysdate, 'yyyymmddhh24miss')               ")
		        		.query("      ,:crt_nm                                         ", row.fixParameter("crt_nm"))
		        		.query("      ,'" + arg.remoteAddress + "'                        ")
		        		.query("      ,to_char(sysdate, 'yyyymmddhh24miss')               ")
		        		.query("       )                                                  ")
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
    		.unique("plan_no"   , arg.fixParameter("plan_no"))
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
			.unique("plan_no"   , arg.fixParameter("plan_no"))
    		.update("row_sts", 2)
			.update("upt_nm", arg.getParameter("upt_nm"))
			.update("upt_ip", arg.remoteAddress)
			.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    	;data.attach(Action.update);
    	
		data.execute();
		return null;
	}
}
