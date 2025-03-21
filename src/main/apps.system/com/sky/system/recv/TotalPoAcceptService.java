package com.sky.system.recv;


import java.util.ArrayList;

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
public class TotalPoAcceptService  extends DefaultServiceHandler {

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
		;
		data.param // 조회
			.query("select a.row_clos                    ")
			.query("      ,a.inv_no                       ")
			.query("      ,a.inv_dt                       ")
			.query("      ,b.dept_nm as inv_dept_nm       ")
			.query("      ,c.emp_nm as inv_usr_nm       ")
			.query("      ,a.vend_nm                      ")
			.query("      ,a.sts_cd                       ")
			.query("      ,a.user_memo                    ")
		;
		data.param // 조건
			.where("  from po_plan_mst a                      ")
			.where("       left outer join dept_mst b    ")
			.where("         on b.dept_id = a.inv_dept_id ")
			.where("       left outer join usr_mst c    ")
			.where("         on c.emp_id = a.inv_usr_id ")
			.where(" where a.hq_id = :hq_id         ", arg.fixParameter("hq_id" ))
			.where("   and a.inv_dt between :fr_dt        ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt        ", arg.fixParameter("to_dt"))
			.where("   and a.inv_dept_id = :inv_dept_id   ", arg.getParameter("inv_dept_id"  ))
			.where("   and a.inv_usr_id = :inv_usr_id   ", arg.getParameter("inv_usr_id"  ))
			.where("   and a.sts_cd = :sts_cd             ", arg.getParameter("sts_cd"))
			.where("   and a.vend_id = :vend_id           ", arg.getParameter("vend_id"))
			.where("   and a.row_clos = :row_clos       ", arg.getParameter("row_clos"))
			.where("   and a.row_sts = 0 				  ")
			.where(" order by a.inv_no desc               ")
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
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
		.query("select a.line_seqn                                          ")
		.query("      ,a.item_code                                          ")
		.query("      ,a.item_name                                          ")
		.query("      ,a.item_spec                                          ")
		.query("      ,r.bas_nm as brand_nm                              ")
		.query("      ,m.bas_nm as mfg_nm                                ")
		.query("      ,c.unit_name                                          ")
		.query("      ,a.unt_qty                                         ")
		.query("      ,a.qty                                              ")
		.query("      ,isnull(b.stor_qty, 0) as stor_qty                   ")
		.query("      ,case                                               ")
		.query("         when a.notax_yn = '0' then                       ")
		.query("           isnull(a.price * b.stor_qty * 1.1, 0)            ")
		.query("         else                                             ")
		.query("           isnull(a.price * b.stor_qty, 0)                  ")
		.query("       end as stor_amount                                ")
		.query("  from po_plan_dtl a                                     ")
		.query("       left outer join (                                  ")
		.query("                       select inv_no                      ")
		.query("                             ,line_seqn                     ")
		.query("                             ,sum(stor_qty) as stor_qty ")
		.query("                         from po_plan_store               ")
		.query("                        group by inv_no, line_seqn          ")
		.query("                       ) b                                ")
		.query("          on b.inv_no = a.inv_no                          ")
		.query("         and b.line_seqn = a.line_seqn                        ")
		.query("       left outer join item_unit c                        ")
		.query("          on c.unit_idcd = a.unit_idcd                        ")
		.query("       left outer join itm_mst i                        ")
		.query("         on i.item_idcd = a.item_idcd                         ")
		.query("       left outer join base_mst r                        ")
		.query("         on r.bas_id = i.brand_id                        ")
		.query("       left outer join base_mst m                        ")
		.query("         on m.bas_id = i.mfg_id                          ")
		.query(" where a.inv_no = :inv_no                                 ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 				                      ")
		.query(" order by a.line_seqn                                       ")
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

			// 발주확정
			{
				if (rowaction == Action.update) {

		        	data.param
		    			.table("po_plan_mst")
		    			.where("where inv_no = :inv_no ")
			        	//
						.unique("inv_no"      , row.fixParameter("inv_no"     ))
					;

		        	// 발주확정 & 마감
		        	if ("2".equals(flag)) {
			        	data.param
		        		.update("sts_cd"      , row.getParameter("sts_cd"     ))
		        		.update("row_clos"   , row.getParameter("row_clos"  ))
		        		;
		        	}

		        	data.param
						.update("upt_nm"   , row.getParameter("upt_nm"  ))
						.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.action = rowaction;
		        	data.attach();


		        	// 통합발주 처리
		        	if ("2".equals(flag)) {
			    		ArrayList<SqlResultRow> listPoInfo = getPoInfoList(arg, row.getParamText("inv_no"));
			    		for (SqlResultRow list:listPoInfo) {

			    			String stor_id       = list.getParamText("stor_id");
			    			String inv_no         = list.getParamText("inv_no");
			    			String po_info_inv_no = list.getParamText("po_info_inv_no");

			    			// master
				        	data.param
				        	.query("insert into po_mst ( corp_id, hq_id, stor_grp, stor_id, wrhs_id, pos_no, inv_no, inv_dt, inv_tm		")
				        	.query("                   , inv_work_gb, inv_dept_id, inv_usr_id, sts_cd, ret_yn, ret_no, vend_id			")
				        	.query("                   , vend_nm, vend_gb, tax_type, tax_rt, tax_free, taxation, sply_amt, tax			")
				        	.query("                   , amount, qty, org_ord_qty, ship_qty, req_msg, user_memo, sys_memo, upt_nm		")
				        	.query("                   , upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, inv_gb, plan_no, reve_nm 			")
				        	.query("                   , reve_state, reve_city, reve_dong, reve_zip_cd, reve_addr_1		")
				        	.query("                   , reve_addr_2, recv_addr3, reve_email, reve_hp_no, reve_tel_no, reve_fax_no		")
				        	.query("                   , rest_qty ) 																	")
				        	.query("select a.corp_id                                                                                    ")
				        	.query("      ,a.hq_id                                                                                      ")
				        	.query("      ,a.stor_grp                                                                                   ")
				        	.query("      ,b.stor_id                                                                                    ")
				        	.query("      ,b.wrhs_id                                                                                    ")
				        	.query("      ,:pos_no                                                                                      ", row.fixParameter("pos_no"))
				        	.query("      ,'" + po_info_inv_no + "'                                                                     ")
				        	.query("      ,dbo.to_char(getdate(), 'yyyymmdd') as inv_dt                                                 ")
				        	.query("      ,dbo.to_char(getdate(), 'hh24mi')   as inv_tm                                                 ")
				        	.query("      ,'1'                          as inv_work_gb                                                  ")
				        	.query("      ,a.inv_dept_id                                                                                ")
				        	.query("      ,a.inv_usr_id                                                                                 ")
				        	.query("      ,'0200'                       as po_info_sts_cd                                               ")
				        	.query("      ,'0'                          as ret_yn                                                       ")
				        	.query("      ,null                         as ret_no                                                       ")
				        	.query("      ,a.vend_id                                                                                    ")
				        	.query("      ,a.vend_nm                                                                                    ")
				        	.query("      ,a.vend_gb                                                                                    ")
				        	.query("      ,b.tax_type                                                                                   ")
				        	.query("      ,b.tax_rt                                                                                     ")
				        	.query("      ,b.tax_free                                                                                   ")
				        	.query("      ,b.taxation                                                                                   ")
				        	.query("      ,b.sply_amt                                                                                   ")
				        	.query("      ,b.tax                                                                                        ")
				        	.query("      ,b.amount                                                                                     ")
				        	.query("      ,b.qty                                                                                        ")
				        	.query("      ,b.qty                                as org_ord_qty                                          ")
				        	.query("      ,0                                    as ship_qty                                             ")
				        	.query("      ,null                                 as req_msg                                              ")
				        	.query("      ,null                                 as user_memo                                             ")
				        	.query("      ,null                                 as sys_memo                                             ")
				        	.query("      ,:upt_nm                                                                                      ", row.fixParameter("upt_nm"))
				        	.query("      ,'" + arg.remoteAddress + "'                                                                  ")
				        	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss') as upt_dttm                                       ")
				        	.query("      ,:crt_nm                                                                                      ", row.fixParameter("crt_nm"))
				        	.query("      ,'" + arg.remoteAddress + "'                                                                  ")
				        	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss') as crt_dttm                                       ")
				        	.query("      ,'2'                 as inv_gb                                                                ")
				        	.query("      ,a.inv_no            as plan_no                                                               ")
							.query("      ,c.stor_nm           as reve_nm                                                               ")
//							.query("      ,c.biz_nm            as reve_nm                                                               ")
							.query("      ,c.biz_state    as reve_state                                                       ")
							.query("      ,c.biz_city     as reve_city                                                        ")
							.query("      ,c.biz_dong     as reve_dong                                                        ")
							.query("      ,c.biz_zip_cd        as reve_zip_cd                                                           ")
							.query("      ,c.biz_addr_1        as reve_addr_1                                                           ")
							.query("      ,c.biz_addr_2        as reve_addr_2                                                           ")
							.query("      ,''                  as recv_addr3                                                            ")
							.query("      ,c.biz_email         as reve_email                                                            ")
							.query("      ,c.biz_hp_no         as reve_hp_no                                                            ")
							.query("      ,c.biz_tel_no        as reve_tel_no                                                           ")
							.query("      ,c.biz_fax_no        as reve_fax_no                                                           ")
							.query("      ,b.qty               as rest_qty                                                              ")
				        	.query("  from po_plan_mst a                                                                                ")
				        	.query("       join (                                                                                       ")
				        	.query("            select a.inv_no                                                                         ")
				        	.query("                  ,a.stor_id                                                                        ")
				        	.query("                  ,a.stor_id       as wrhs_id                                                       ")
				        	.query("                  ,c.recv_tax_type  as tax_type                                                     ")
				        	.query("                  ,c.tax_rt                                                            				")
				        	.query("                  ,sum(a.stor_qty)                                                     as qty      	")
				        	.query("                  ,sum(case when b.notax_yn = '0' then 0 else b.price*a.stor_qty end)  as tax_free 	")
				        	.query("                  ,sum(case when b.notax_yn = '0' then b.price*a.stor_qty else  0 end) as taxation 	")
				        	.query("                  ,sum(case when b.notax_yn = '0' then case when c.recv_tax_type = '0' then round((b.price*a.stor_qty)/(c.tax_rt/100+1)) else b.price*a.stor_qty end else 0 end)                                            as sply_amt ")
				        	.query("                  ,sum(case when b.notax_yn = '0' then case when c.recv_tax_type = '0' then (b.price*a.stor_qty)-round((b.price*a.stor_qty)/(c.tax_rt/100+1)) else round((b.price*a.stor_qty)*c.tax_rt/100) end else 0 end) as tax      ")
				        	.query("                  ,sum(case when b.notax_yn = '0' then case when c.recv_tax_type = '0' then round((b.price*a.stor_qty)/(c.tax_rt/100+1)) else b.price*a.stor_qty end else b.price*a.stor_qty end                                        ")
				        	.query("                     + case when b.notax_yn = '0' then case when c.recv_tax_type = '0' then (b.price*a.stor_qty)-round((b.price*a.stor_qty)/(c.tax_rt/100+1)) else round((b.price*a.stor_qty)*c.tax_rt/100) end else  0 end              ")
				        	.query("                     + case when b.notax_yn = '0' then 0 else b.price*a.stor_qty end)  as amount    ")
				        	.query("              from po_plan_store a                                                                  ")
				        	.query("                   join po_plan_dtl b                                                               ")
				        	.query("                      on b.inv_no = a.inv_no                                                        ")
				        	.query("                     and b.line_seqn = a.line_seqn                                                      ")
				        	.query("                   join stor c                                                                      ")
				        	.query("                      on c.stor_id = a.stor_id                                                      ")
				        	.query("             where a.inv_no = '" + inv_no + "'                                                      ")
				        	.query("               and a.stor_id = '" + stor_id + "'                                                    ")
				        	.query("               and a.stor_qty > 0                                                                   ")
				        	.query("             group by a.inv_no, a.stor_id, c.recv_tax_type, c.tax_rt                                ")
				        	.query("            ) b                                                                                     ")
				        	.query("         on b.inv_no = a.inv_no                                                                     ")
				        	.query("       join stor c                                                                                  ")
				        	.query("         on c.stor_id = b.stor_id                                                                   ")
							.action = Action.direct;
				        	data.attach();

			    			// detail
				        	data.param
				        	.query("insert into po_item ( hq_id, stor_grp, stor_id, wrhs_id, inv_no, line_seqn, seq_top, seq_dsp, ret_yn	")
				        	.query("                    , ret_no, ret_seq, safe_dt, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd		")
				        	.query("                    , item_code, item_name, item_spec, notax_yn, unit_price, item_halin, price, qty			")
				        	.query("                    , org_ord_qty, ship_qty, tax_free, taxation, sply_amt, tax, amount, upt_nm		")
				        	.query("                    , upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, plan_no, plan_seq, rest_qty ) 	")
				        	.query("select a.hq_id                                                                                      ")
				        	.query("      ,a.stor_grp                                                                                   ")
				        	.query("      ,a.stor_id                                                                                    ")
				        	.query("      ,a.stor_id                       as wrhs_id                                                   ")
				        	.query("      ,'" + po_info_inv_no + "'                                                                     ")
				        	.query("      ,rownum                           as po_info_inv_seq                                          ")
				        	.query("      ,rownum                           as seq_top                                                  ")
				        	.query("      ,rownum                           as seq_dsp                                                  ")
				        	.query("      ,'0'                              as ret_yn                                                   ")
				        	.query("      ,null                             as ret_no                                                   ")
				        	.query("      ,rownum                           as ret_seq                                                  ")
//				        	.query("      ,to_char(sysdate + 7, 'yyyymmdd') as safe_dt                                                  ")
				        	.query("      ,dbo.to_char(dateadd(dd,+7,getdate()), 'yyyymmdd') as safe_dt                                 ")
				        	.query("      ,b.mst_itm_id                                                                                 ")
				        	.query("      ,b.mst_itm_cd                                                                                 ")
				        	.query("      ,b.unit_idcd                                                                                     ")
				        	.query("      ,b.unt_qty                                                                                    ")
				        	.query("      ,b.item_idcd                                                                                     ")
				        	.query("      ,b.item_code                                                                                     ")
				        	.query("      ,b.item_name                                                                                     ")
				        	.query("      ,b.item_spec                                                                                     ")
				        	.query("      ,b.notax_yn                                                                                   ")
				        	.query("      ,b.unit_price                                                                                 ")
				        	.query("      ,(b.unit_price-b.price)*a.stor_qty as item_halin                                              ")
				        	.query("      ,b.price                                                                                      ")
				        	.query("      ,a.stor_qty  as qty																			")
				        	.query("      ,a.stor_qty  as org_ord_qty																	")
				        	.query("      ,0           as ship_qty																		")
				        	.query("      ,case when b.notax_yn = '0' then  0 else b.price*a.stor_qty end  as tax_free 					")
				        	.query("      ,case when b.notax_yn = '0' then  b.price*a.stor_qty else  0 end as taxation 					")
				        	.query("      ,case when b.notax_yn = '0' then  case when c.recv_tax_type= '0' 								")
				        	.query("                                             then round((b.price*a.stor_qty)/(c.tax_rt/100+1)) 		")
				        	.query("                                             else b.price*a.stor_qty end else 0 end             	")
				        	.query("                                  else 0 end as sply_amt 											")
				        	.query("      ,case when b.notax_yn = '0' then case when c.recv_tax_type = '0'								")
				        	.query("                                            then (b.price*a.stor_qty)-round((b.price*a.stor_qty)/(c.tax_rt/100+1)) ")
				        	.query("                                            else round((b.price*a.stor_qty)*c.tax_rt/100) end   	")
				        	.query("                                  else  0 end as tax 	     										")
				        	.query("      ,case when b.notax_yn = '0' then case when c.recv_tax_type = '0'								")
				        	.query("                                            then round((b.price*a.stor_qty)/(c.tax_rt/100+1))		")
				        	.query("                                            else b.price*a.stor_qty end 							")
				        	.query("                                  else b.price*a.stor_qty  end                                  	")
				        	.query("         + case when b.notax_yn = '0' then case when c.recv_tax_type = '0'							")
				        	.query("                                                then (b.price*a.stor_qty)-round((b.price*a.stor_qty)/(c.tax_rt/100+1)) ")
				        	.query("                                                else round((b.price*a.stor_qty)*c.tax_rt/100) end 	")
				        	.query("                                      else 0 end 									            	")
				        	.query("         + case when b.notax_yn = '0' then 0 else  b.price*a.stor_qty end as amount   				")
				        	.query("      ,:upt_nm                                                 ", row.fixParameter("upt_nm"))
				        	.query("      ,'" + arg.remoteAddress + "'                             ")
				        	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss') as upt_dttm  ")
				        	.query("      ,:crt_nm                                                 ", row.fixParameter("crt_nm"))
				        	.query("      ,'" + arg.remoteAddress + "'                             ")
				        	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss') as crt_dttm  ")
				        	.query("      ,a.inv_no                             as plan_no         ")
				        	.query("      ,a.line_seqn                            as plan_seq        ")
				        	.query("      ,a.stor_qty                          as rest_qty         ")
				        	.query("  from po_plan_store a                                         ")
				        	.query("       join po_plan_dtl b  on b.inv_no = a.inv_no   and b.line_seqn = a.line_seqn  ")
				        	.query("       join stor c         on c.stor_id = a.stor_id            ")
				        	.query(" where a.inv_no = '" + inv_no + "'                             ")
				        	.query("   and a.stor_id = '" + stor_id + "'                           ")
				        	.query("   and a.stor_qty > 0                                          ")
				        	.query(" order by a.line_seqn                                            ")
				        	.action = Action.direct;
				        	data.attach();
			    		}
		    		}
				}
			}
		}

		data.execute();
		return null;
	}

	/**
	 * 사업장별 분배 - master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPlanMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(b.qty)                           as qty       ")
			.total("      ,sum(isnull(c.sum_allot_qty, 0))         as allot_qty ")
			.total("      ,sum(b.qty - isnull(c.sum_allot_qty, 0)) as rest_qty  ")
			.total("      ,sum(isnull(c.sum_stor_qty, 0))         as stor_qty ")
		;
		data.param // 조회
			.query("select a.trmn_dt                                            ")
			.query("      ,b.inv_no                                              ")
			.query("      ,b.line_seqn                                             ")
			.query("      ,b.item_code                                             ")
			.query("      ,b.item_name                                             ")
			.query("      ,b.item_spec                                             ")
			.query("      ,d.unit_name                                             ")
			.query("      ,b.qty                                                 ")
			.query("      ,isnull(c.sum_allot_qty, 0)         as allot_qty          ")
			.query("      ,b.qty - isnull(c.sum_allot_qty, 0) as rest_qty           ")
			.query("      ,isnull(c.sum_stor_qty, 0)         as stor_qty          ")
		;
		data.param // 조건
			.where("  from po_plan_mst a                                             ")
			.where("         left outer join po_plan_dtl b                      ")
			.where("            on b.inv_no = a.inv_no                           ")
			.where("           and b.row_sts = 0                               ")
			.where("         left outer join (                                   ")
			.where("                         select inv_no                       ")
			.where("                               ,line_seqn                      ")
			.where("                               ,sum(allot_qty) sum_allot_qty ")
			.where("                               ,sum(stor_qty) sum_stor_qty ")
			.where("                           from po_plan_store                ")
			.where("                          group by inv_no, line_seqn           ")
			.where("                         ) c                                 ")
			.where("            on c.inv_no = b.inv_no                           ")
			.where("           and c.line_seqn = b.line_seqn                         ")
			.where("         left outer join item_unit d                         ")
			.where("            on d.unit_idcd = b.unit_idcd                         ")
			.where(" where a.hq_id = :hq_id              ", arg.fixParameter("hq_id" ))
			.where("   and a.inv_no = :inv_no            ", arg.getParameter("inv_no" ))
			.where("   and a.inv_dt between :fr_dt       ", arg.getParameter("fr_dt"))
			.where("                    and :to_dt       ", arg.getParameter("to_dt"))
			.where("   and a.inv_dept_id = :inv_dept_id  ", arg.getParameter("inv_dept_id"  ))
			.where("   and a.inv_usr_id = :inv_usr_id    ", arg.getParameter("inv_usr_id"  ))
			.where("   and a.sts_cd = :sts_cd            ", arg.getParameter("sts_cd"))
			.where("   and a.row_sts = 0 			                             ")
			.where(" order by b.inv_no desc, b.line_seqn                           ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * 사업장별 분배 - detail 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPlanDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
		.query("select b.hq_id                                                                          ")
		.query("      ,b.stor_grp                                                                          ")
		.query("      ,b.inv_no                                                                            ")
		.query("      ,b.line_seqn                                                                           ")
		.query("      ,a.row_clos                                                                          ")
		.query("      ,a.sts_cd                                                                            ")
		.query("      ,c.stor_id                                                                           ")
		.query("      ,c.stor_nm                                                                           ")
		.query("      ,isnull(d.allot_qty, 0) as allot_qty                                                 ")
		.query("      ,isnull(d.stor_qty, 0) as stor_qty                                                   ")
		.query("      ,decode(b.unt_qty, 0, isnull(e.stock, 0), isnull(e.stock, 0)/isnull(b.unt_qty, 1)) as stock ")
		.query("  from po_plan_mst a                                                                       ")
		.query("       left outer join po_plan_dtl b on b.inv_no = a.inv_no                                ")
		.query("       left outer join stor c        on c.stor_grp = a.stor_grp and c.stor_sts < '3000' and c.row_sts = 0 ")
		.query("       left outer join itm_stock e   on e.stor_id  = c.stor_id  and e.item_idcd = b.item_idcd    ")
		.query("       left outer join po_plan_store d                                                     ")
		.query("          on d.stor_grp = c.stor_grp                                                       ")
		.query("         and d.stor_id = c.stor_id                                                         ")
		.query("         and d.inv_no = :inv_no                                                            ", arg.fixParameter("inv_no" ))
		.query("         and d.line_seqn = :line_seqn                                                          ", arg.fixParameter("line_seqn" ))
		.query(" where b.inv_no = :inv_no                                                                  ", arg.fixParameter("inv_no" ))
		.query("   and b.line_seqn = :line_seqn                                                                ", arg.fixParameter("line_seqn" ))
		.query("   and a.row_sts = 0 			                                                           ")
		.query("   and b.row_sts = 0 			                                                           ")
		.query(" order by c.stor_id                                                                       ")
		;

		return data.selectForMap();
	}

	/**
	 * 통합발주 대상조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPoInfoList(HttpRequestArgument arg, String inv_no) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
		.query("select b.stor_id                                                       ")
		.query("      ,b.inv_no                                                         ")
		.query("      ,b.po_info_inv_no                                                 ")
		.query("  from po_plan_mst a                                                        ")
		.query("       join (                                                           ")
		.query("            select a.inv_no                                             ")
		.query("                  ,a.stor_id                                           ")
		.query("                  ,c.recv_tax_type                                      ")
		.query("                  ,c.tax_rt                                           ")
		.query("                  ,net_package_sequence.get_sequance_invoice(           ")
		.query("                     a.stor_id                                         ")
		.query("                    ,'invoice'                                          ")
		.query("                    ,'1') as po_info_inv_no                             ")
		.query("              from po_plan_store a                                      ")
		.query("                   join po_plan_dtl b                                  ")
		.query("                      on b.inv_no = a.inv_no                            ")
		.query("                     and b.line_seqn = a.line_seqn                          ")
		.query("                   join stor c                                         ")
		.query("                      on c.stor_id = a.stor_id                        ")
		.query("             where a.inv_no = '" + inv_no + "'                          ")
		.query("               and a.stor_qty > 0                                      ")
		.query("             group by a.inv_no, a.stor_id, c.recv_tax_type, c.tax_rt ")
		.query("            ) b                                                         ")
		.query("         on b.inv_no = a.inv_no                                         ")
		.query(" where a.row_sts = 0 			                                        ")
		.query(" order by b.stor_id, b.inv_no                                          ")
		;

		return data.selectForMap();
	}
}
