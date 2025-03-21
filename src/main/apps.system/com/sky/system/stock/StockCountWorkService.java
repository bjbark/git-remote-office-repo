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
public class StockCountWorkService  extends DefaultServiceHandler {

	/**
	 * master1 조회
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
	        .query("select a.row_clos                                            ")
	        .query("      ,a.confirm_yn                                           ")
	        .query("      ,a.plan_no                                              ")
	        .query("      ,a.plan_dt                                              ")
	        .query("      ,b.emp_nm as confirm_nm                                ")
	        .query("      ,a.user_memo                                            ")
		;
		data.param // 조건
	        .where("  from adjust_plan a                                          ")
	        .where("       left outer join usr_mst b                            ")
	        .where("         on b.emp_id = a.confirm_id                          ")
	        .where(" where a.stor_id = :stor_id                                 ", arg.fixParameter("stor_id"))
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
	 * master2 조회
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select a.work_no                   ")
			.query("      ,a.work_dt                   ")
			.query("      ,b.emp_nm                   ")
			.query("      ,a.location                  ")
			.query("      ,a.user_memo                 ")
		;
		data.param // 조건
			.where("  from adjust_info a               ")
			.where("       left outer join usr_mst b ")
			.where("         on b.emp_id = a.emp_id  ")
			.where(" where a.plan_no = :plan_no        ", arg.fixParameter("plan_no"))
			.where("   and a.row_sts = 0 			   ")
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
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
	
	DataMessage data = arg.newStorage("POS");
	data.param // 집계
		.total("select count(1) as maxsize ")
		.total("      ,sum(a.qty)            as qty    ")
		.total("      ,sum(e.po_pri*a.qty) as amount ")
	;
	data.param // 조회
		.query("select a.work_no                    ")
		.query("      ,a.work_seq                   ")
		.query("      ,a.item_code                    ")
		.query("      ,a.item_name                    ")
		.query("      ,b.item_spec                    ")
		.query("      ,d.unit_name                    ")
		.query("      ,r.bas_nm as brand_nm        ") 
		.query("      ,m.bas_nm as mfg_nm          ")
		.query("      ,a.unt_qty                   ")
		.query("      ,a.qty                        ")
		.query("      ,e.po_pri       as price    ")
		.query("      ,e.po_pri*a.qty as amount   ")
		.query("      ,a.user_memo                  ")
	;
	data.param // 조건
		.where("  from adjust_item a                ")
		.where("       left outer join item_unit d  on d.unit_idcd = a.unit_idcd   ")
		.where("       left outer join itm_mst b  on b.item_idcd = a.item_idcd   ")
		.where("       left outer join base_mst r on r.bas_id = b.brand_id   ") 
		.where("       left outer join base_mst m on m.bas_id = b.mfg_id     ")
		.where("       join store c                 on c.stor_id = a.stor_id ")
		.where("       left outer join itm_stor e on a.stor_id = e.stor_id and a.item_idcd = e.item_idcd")
		.where(" where a.work_no = :work_no         ", arg.fixParameter("work_no"))
		.where("   and a.row_sts = 0 				                          ")
		.where(" order by a.work_seq                ")
	;
    
                       

	if (page == 0 && rows == 0) {
		return data.selectForMap(sort);
	} else {
		return data.selectForMap(page, rows, (page==1),sort);
	}
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
		.query("select a.plan_no                         ")
		.query("      ,b.plan_dt                         ")
		.query("      ,a.work_no                         ")
		.query("      ,a.work_dt                         ")
		.query("      ,a.dept_id                         ")
		.query("      ,a.emp_id                         ")
		.query("      ,isnull(c.emp_nm, '') as emp_nm     ")
		.query("      ,a.location                        ")
		.query("      ,a.user_memo                       ")
		.query("  from adjust_info a                     ")
		.query("       left outer join adjust_plan b     ")
		.query("         on b.plan_no = a.plan_no        ")
		.query("       left outer join usr_mst c       ")
		.query("         on c.emp_id = a.emp_id        ")
		.query(" where a.work_no = :work_no              ", arg.fixParameter("work_no" ))
		.query("   and a.row_sts = 0 				     ")
		;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			
			data.param // 쿼리문  입력
			.query("select a.work_no                                                ")
			.query("      ,a.work_seq                                               ")
			.query("      ,a.work_seq as line_seqn                                    ")
			.query("      ,a.work_seq as seq_top                                    ")
			.query("      ,a.work_seq as seq_dsp                                    ")
			.query("      ,a.item_idcd                                                ")
			.query("      ,a.item_code                                                ")
			.query("      ,a.item_name                                                ")
			.query("      ,b.item_spec                                                ")
			.query("      ,a.stk_itm_id                                                ")
			//.query("      ,a.mst_itm_id                                                ")
			//.query("      ,a.mst_itm_cd                                                ")
			.query("      ,a.unit_idcd                                                ")
			.query("      ,d.unit_name                                                ")
			.query("      ,a.unt_qty                                               ")
			.query("      ,b.notax_yn                                               ")
			.query("      ,a.qty                                                    ")
			.query("      ,e.po_pri as price                                      ")
			.query("      ,round((e.po_pri*a.qty)/(c.tax_rt/100+1)) as sply_amt ")
			.query("      ,e.po_pri*a.qty                             as amount   ")
			.query("      ,a.location                                               ")
			.query("      ,a.user_memo                                              ")
			.query("  from adjust_item a                                            ")
			.query("       left join itm_mst b                                    ")
			.query("         on b.item_idcd = a.item_idcd                               ")
			.query("       left outer join store c                                  ")
			.query("         on c.stor_id = a.stor_id                             ")
			.query("       left outer join item_unit d                              ")
			.query("         on d.unit_idcd = a.unit_idcd                               ")
			.query("       left outer join itm_stor e on a.stor_id = e.stor_id and a.item_idcd = e.item_idcd")
			.query(" where a.work_no = :work_no                                     ", arg.fixParameter("work_no"))
			.query("   and a.row_sts = 0 				                          ")
			.query(" order by a.work_seq                                            ")
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
			if (rowaction == Action.delete) {
				
				throw new ServiceException("삭제불가");
		
//				// 실사작업정보 삭제
//	        	data.param
//        			.table("adjust_info")
//        			.where("where work_no = :work_no              ")
//        			//
//        			.unique("work_no" , row.fixParameter("work_no"))
//        			.action = rowaction;
//        		data.attach();
//
//				// 실사작업상세 삭제
//	        	data.param
//        			.table("adjust_item")
//        			.where("where work_no = :work_no              ")
//        			//
//        			.unique("work_no" , row.fixParameter("work_no"))
//        			.action = rowaction;
//	        	data.attach();

			} else {
				// 실사작업정보 등록/수정
	        	data.param
	    			.table("adjust_info")
	    			.where("where work_no = :work_no ")
		        	//
					.insert("hq_id"    , row.getParameter("hq_id"   ))
					.insert("stor_grp"    , row.getParameter("stor_grp"   ))
					.insert("stor_id"    , row.getParameter("stor_id"   ))
					.insert("plan_no"     , row.getParameter("plan_no"    ))
					.unique("work_no"     , row.fixParameter("work_no"    ))
					.insert("work_dt"     , row.getParameter("work_dt"    ))
					.update("dept_id"     , row.getParameter("dept_id"    ))
					.update("emp_id"     , row.getParameter("emp_id"    ))
					.update("location"    , row.getParameter("location"   ))
					.update("user_memo"   , row.getParameter("user_memo"  ))
//					.update("sys_memo"   , row.getParameter("sys_memo"  ))
//					.update("row_ord"   , row.getParameter("row_ord"  ))
//					.update("row_sts"   , row.getParameter("row_sts"  ))
					//.update("upt_nm"   , row.getParameter("upt_nm"  ))
					.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					//.insert("crt_nm"   , row.getParameter("crt_nm"  ))
					.insert("crt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.action = rowaction;
	        	data.attach();

	        	if(row.getParameter("product", SqlResultMap.class) != null) {
	        		setInvoiceDetail(arg, data, row.getParameter("product", SqlResultMap.class));
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
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				
				// 실사작업상세 삭제
	        	data.param
        			.table("adjust_item")
        			.where("where work_no = :work_no   ")
        			.where("  and work_seq = :work_seq ")
        			//
        			.unique("work_no"  , row.fixParameter("work_no"))
        			.unique("work_seq" , row.fixParameter("work_seq"))
        			.action = rowaction;
	        	data.attach();
        		
			} else {
				// 실사작업상세 등록/수정
	        	data.param
	    			.table("adjust_item")
        			.where("where work_no = :work_no   ")
        			.where("  and work_seq = :work_seq ")
		        	//
					.insert("hq_id"   , row.getParameter("hq_id"  ))
					.insert("stor_grp"   , row.getParameter("stor_grp"  ))
					.insert("stor_id"   , row.getParameter("stor_id"  ))
					.insert("plan_no"    , row.getParameter("plan_no"   ))
					.unique("work_no"    , row.getParameter("work_no"   ))
					.unique("work_seq"   , row.getParameter("work_seq"  ))
					.update("location"   , row.getParameter("location"  ))
					.update("stk_itm_id"    , row.getParameter("stk_itm_id"   ))
					//.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"   ))
					.update("unit_idcd"    , row.getParameter("unit_idcd"   ))
					.update("unt_qty"   , row.getParameter("unt_qty"  ))
					.update("item_idcd"    , row.getParameter("item_idcd"   ))
					.update("item_code"    , row.getParameter("item_code"   ))
					.update("item_name"    , row.getParameter("item_name"   ))
					.update("qty"        , row.getParameter("qty"       ))
					.update("user_memo"  , row.getParameter("user_memo" ))
//					.update("sys_memo"  , row.getParameter("sys_memo" ))
//					.update("row_ord"  , row.getParameter("row_ord" ))
					.update("row_sts"  , row.getParameter("row_sts" ))
					//.update("upt_nm"  , row.getParameter("upt_nm" ))
					.update("upt_ip"  , arg.remoteAddress			 )
					.update("upt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					//.insert("crt_nm"  , row.getParameter("crt_nm" ))
					.insert("crt_ip"  , arg.remoteAddress			 )
					.insert("crt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
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
		
		// 실사작업상세 삭제
    	data.param
    		.table("adjust_item")
    		.where("where work_no = :work_no ")
    		//
    		.unique("work_no"   , arg.fixParameter("work_no"))
    		.update("row_sts", 2)
			.update("upt_nm", arg.getParameter("upt_nm"))
			.update("upt_ip", arg.remoteAddress)
			.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    	;data.attach(Action.update);
		
    	// 실사작업정보 삭제
    	data.param
			.table("adjust_info")
			.where("where work_no = :work_no ")
			//
			.unique("work_no"   , arg.fixParameter("work_no"))
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
		.query("     ,  b.stk_itm_id      , b.unt_qty  ")
		//.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
		.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
		.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_spec      ")
		.query("     ,  b.cst_pri   , s.stock ")
		.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
		.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
		//.query("     ,  b.vend_id as pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.vend_id ) as  pack_vend_nm  " ) 
		.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
		.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
		.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
		.query("     ,  a.po_pri , a.po_pri_type, a.po_pri_rt   ")
		.query("     ,  b.notax_yn                                      ")
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
