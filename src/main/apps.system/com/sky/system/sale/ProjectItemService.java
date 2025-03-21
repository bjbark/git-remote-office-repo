package com.sky.system.sale;

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
public class ProjectItemService  extends DefaultServiceHandler {

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
	 * invoice 조회
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
		.query("select a.prom_id                      ")
		.query("      ,a.dept_id                      ")
		.query("      ,b.dept_nm                      ")
		.query("      ,a.emp_id                      ")
		.query("      ,c.emp_nm                      ")
		.query("      ,a.prom_dt                      ")
		.query("      ,a.fr_dt                        ")
		.query("      ,a.to_dt                        ")
		.query("      ,a.prom_nm                      ")
		.query("      ,a.vend_id                      ")
		.query("      ,a.vend_nm                      ")
		.query("      ,a.user_memo                    ")
		.query("  from prom_info a                    ")
		.query("       left outer join dept_mst b    ")
		.query("         on b.dept_id = a.dept_id     ")
		.query("       left outer join usr_mst c    ")
		.query("         on c.emp_id = a.emp_id     ")
		.query(" where a.prom_id = :prom_id           ", arg.fixParameter("prom_id"))
		.query("   and a.row_sts = 0 				  ")
		.query("   and a.prom_gb = '6' 				  ")
		;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			
			data.param // 쿼리문  입력
			.query("select a.prom_id                   ")
			.query("      ,rownum    as line_seqn        ")
			.query("      ,rownum    as seq_top        ")
			.query("      ,rownum    as seq_dsp        ")
			.query("      ,a.item_idcd                   ")
			.query("      ,i.item_code                   ")
			.query("      ,i.item_name                   ")
			.query("      ,i.item_spec                   ")
			.query("      ,i.mst_itm_id                   ")
			.query("      ,i.mst_itm_cd                   ")
			.query("      ,i.unit_idcd                   ")
			.query("      ,u.unit_name                   ")
			.query("      ,i.unt_qty                  ")
			.query("      ,a.vend_price                ")
			.query("      ,a.recv_halin                ")
			.query("      ,a.cust_price                ")
			.query("      ,a.prom_price                ")
			.query("      ,a.prom_halin                ")
			.query("      ,a.stad_sale_pri                ")
			.query("      ,a.sale_margin               ")
			.query("      ,a.prom_margin               ")
			.query("      ,a.add_qty                   ")
			.query("      ,a.order_qty                 ")
			.query("      ,a.order_cnt                 ")
			.query("      ,a.order_amt                 ")
			.query("      ,a.prom_memo                 ")
			.query("  from prom_item a                 ")
			.query("       left outer join itm_mst i ")
			.query("         on i.item_idcd = a.item_idcd  ")
			.query("       left outer join item_unit u ")
			.query("          on u.unit_idcd = i.unit_idcd ")
			.query(" where a.prom_id = :prom_id        ", arg.fixParameter("prom_id"))
			.query("   and a.row_sts = 0 			   ")
			;

			info.get(0).put("product", data.selectForMap());
		}

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
					
//					// 기획정보 삭제
//		        	data.param
//	        			.table("prom_info")
//	        			.where("where prom_id = :prom_id              ")
//	        			//
//	        			.unique("prom_id" , row.fixParameter("prom_id"))
//	        			.action = rowaction;
//	        		data.attach();
//
//					// 기획상세 삭제
//		        	data.param
//	        			.table("prom_item")
//	        			.where("where prom_id = :prom_id              ")
//	        			//
//	        			.unique("prom_id" , row.fixParameter("prom_id"))
//	        			.action = rowaction;
//		        	data.attach();

				} else {
					
					// 기획정보 등록/수정
		        	data.param
		    			.table("prom_info")
		    			.where("where prom_id = :prom_id ")
			        	//
						.insert("hq_id"    , row.getParameter("hq_id"   ))
						.unique("prom_id"     , row.fixParameter("prom_id"    ))
						.update("prom_nm"     , row.getParameter("prom_nm"    ))
						.update("prom_dt"     , row.getParameter("prom_dt"    ))
						.insert("prom_gb"     , row.getParameter("prom_gb"    ))
						.update("fr_dt"       , row.getParameter("fr_dt"      ))
						.update("to_dt"       , row.getParameter("to_dt"      ))
						.update("dept_id"     , row.getParameter("dept_id"    ))
						.update("emp_id"     , row.getParameter("emp_id"    ))
						.insert("vend_id"     , row.getParameter("vend_id"    ))
						.insert("vend_nm"     , row.getParameter("vend_nm"    ))
						.update("order_cnt"   , row.getParameter("order_cnt"  ))
						.update("order_amt"   , row.getParameter("order_amt"  ))
						.update("user_memo"   , row.getParameter("user_memo"  ))
//						.update("sys_memo"   , row.getParameter("sys_memo"  ))
//						.update("row_clos"   , row.getParameter("row_clos"  ))
//						.update("row_ord"   , row.getParameter("row_ord"  ))
//						.update("row_sts"   , row.getParameter("row_sts"  ))
						.update("upt_nm"   , row.getParameter("upt_nm"  ))
						.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.insert("crt_nm"   , row.getParameter("crt_nm"  ))
						.insert("crt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.insert("crt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//						.update("inv_dt"      , row.getParameter("inv_dt"     ))
						.action = rowaction;
		        	data.attach();

		        	if(row.getParameter("product", SqlResultMap.class) != null) {
		        		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
		        	}
				}
			}
			// 마감 / 해지
			else {
				
				if (rowaction == Action.update) {
					
		        	data.param
		    			.table("prom_info")
		    			.where("where prom_id = :prom_id ")
			        	//
						.unique("prom_id"     , row.fixParameter("prom_id"    ))
		        		.update("row_clos"   , row.getParameter("row_clos"  ))
						.update("upt_nm"   , row.getParameter("upt_nm"  ))
						.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.action = rowaction;
		        	data.attach();
				}
			}
		}
		
		data.execute();
		return null;
	}
	
	/**
	 * invoice detail 등록/수정/삭제
	 * 
	 * @param data
	 * @param map
	 * @throws Exception
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				
				// 기획상세 삭제
	        	data.param
        			.table("prom_item")
        			.where("where prom_id = :prom_id ")
        			.where("  and item_idcd = :item_idcd ")
        			//
        			.unique("prom_id" , row.fixParameter("prom_id"))
        			.unique("item_idcd" , row.fixParameter("item_idcd"))
        			.action = rowaction;
	        	data.attach();

			} else {

				// 기획상세 등록/수정
	        	data.param
	    			.table("prom_item")
        			.where("where prom_id = :prom_id ")
        			.where("  and item_idcd = :item_idcd ")
		        	//
					.insert("hq_id"   , row.getParameter("hq_id"   ))
					.unique("prom_id"    , row.fixParameter("prom_id"    ))
					.insert("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
					.unique("item_idcd"    , row.fixParameter("item_idcd"    ))
					.update("vend_price" , row.getParameter("vend_price" ))
					.update("recv_price" , row.getParameter("vend_price" ))
//					.update("recv_halin" , row.getParameter("recv_halin" ))
					.update("cust_price" , row.getParameter("cust_price" ))
					.update("prom_price" , row.getParameter("prom_price" ))
					.update("prom_halin" , row.getParameter("prom_halin" ))
					.update("stad_sale_pri" , row.getParameter("stad_sale_pri" ))
//					.update("sale_margin", row.getParameter("sale_margin"))
//					.update("prom_margin", row.getParameter("prom_margin"))
					.update("add_qty"    , row.getParameter("add_qty"    ))
					.insert("order_qty"  , row.getParameter("order_qty"  ))
					.insert("order_cnt"  , row.getParameter("order_cnt"  ))
					.insert("order_amt"  , row.getParameter("order_amt"  ))
					.update("prom_memo"  , row.getParameter("prom_memo"  ))
//					.update("user_memo"  , row.getParameter("user_memo"  ))
//					.update("sys_memo"  , row.getParameter("sys_memo"  ))
//					.update("row_ord"  , row.getParameter("row_ord"  ))
//					.update("row_sts"  , row.getParameter("row_sts"  ))
					.update("upt_nm"  , row.getParameter("crt_nm"  ))
					.update("upt_ip"  , arg.remoteAddress)
					.update("upt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_nm"  , row.getParameter("crt_nm"  ))
					.insert("crt_ip"  , arg.remoteAddress)
					.insert("crt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//					.update("limit_qty"  , row.getParameter("limit_qty"  ))
					.action = rowaction;
	        	data.attach();
			}
		}
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
		
		// 기획상세 삭제
    	data.param
    		.table("prom_item")
    		.where("where prom_id = :prom_id ")
    		//
    		.unique("prom_id"  , arg.fixParameter("prom_id"))
    		.update("row_sts", 2)
			.update("upt_nm", arg.getParameter("upt_nm"))
			.update("upt_ip", arg.remoteAddress)
			.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    	;data.attach(Action.update);
		
    	// 기획정보 삭제
    	data.param
			.table("prom_info")
			.where("where prom_id = :prom_id ")
			//
			.unique("prom_id"  , arg.fixParameter("prom_id"))
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
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		
		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}
		
		data.param // 쿼리문  입력  
		.query("select  a.stor_grp     , a.stor_id ")
		.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
		.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
		.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_spec      ")
		.query("     ,  b.cst_pri   , s.stock ")
		.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
		.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
		.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id )      as  vend_nm       " ) 
//		.query("     ,  b.pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.pack_vend_id ) as  pack_vend_nm  " ) 
		.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
		.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
		.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
//		.query("     ,  a.po_pri , a.po_pri_type, a.po_pri_rt   ")
		.query("     ,  case when a.po_pri = 0 then b.po_pri else a.po_pri end as po_pri ")
		.query("     ,  case when a.po_pri_type = 0 then b.po_pri_type else a.po_pri_type end as po_pri_type ")
		.query("     ,  case when a.po_pri_rt = 0 then b.po_pri_rt else a.po_pri_rt end as po_pri_rt ")
		.query("     ,  b.notax_yn                                      ")
		.query("     ,  b.epo_pri                                     ")
		.query("from    itm_stor      a                               ")
		.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
		.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
		.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )			
		.query("and     a.row_sts  = 0 " )
		;
		
		return data.selectForMap();
	}
}
