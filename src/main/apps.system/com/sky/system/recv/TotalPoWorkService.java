package com.sky.system.recv;


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
public class TotalPoWorkService  extends DefaultServiceHandler {

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
		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );
		
		data.param // 집계
			.total("select count(1) as maxsize , sum(b.qty) as qty ")
			.total("    ,  sum(c.allot_qty) as allot_qty , sum(c.stor_qty) as stor_qty")
		;
		data.param // 조회
			.query("select a.row_clos                    ")
			.query("      ,a.sts_cd                       ")
			.query("      ,a.trmn_dt                     ")
			.query("      ,b.inv_no                       ")
			.query("      ,b.line_seqn                      ")
			.query("      ,b.item_code                      ")
			.query("      ,b.item_name                      ")
			.query("      ,b.item_spec                      ")
			.query("      ,d.unit_name                      ")
			.query("      ,b.unt_qty                     ")
			.query("      ,b.qty                          ")
			.query("      ,c.allot_qty                    ")
			.query("      ,c.stor_qty                    ")
		;
		data.param // 조건
			.where("  from po_plan_mst a                      ")
			.where("       join po_plan_dtl b            ")
			.where("          on b.inv_no = a.inv_no      ")
			.where("       join po_plan_store c           ")
			.where("          on c.inv_no = b.inv_no      ")
			.where("         and c.line_seqn = b.line_seqn    ")
			.where("       left outer join item_unit d    ")
			.where("          on d.unit_idcd = b.unit_idcd    ")
			.where(" where a.row_clos = 0                ")
			.where("   and a.row_sts = 0 				  ")
			.where("   and c.stor_id = :stor_id         ", arg.fixParameter("stor_id"))
			.where("   and a.inv_dt between :fr_dt        ", fr_dt, "1".equals(inv_po_term))
			.where("                    and :to_dt        ", to_dt, "1".equals(inv_po_term))
			.where("   and a.trmn_dt between :fr_dt      ", fr_dt, "2".equals(inv_po_term))
			.where("                      and :to_dt      ", to_dt, "2".equals(inv_po_term))
			.where("   and a.sts_cd = :sts_cd             ", arg.getParameter("sts_cd"))
			.where(" order by b.inv_no desc, b.line_seqn    ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * master 수정
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			
			if (rowaction == Action.update) {
				
				// 분배 등록/수정
	        	data.param
	    			.table("po_plan_store")
        			.where("where inv_no = :inv_no     ")
        			.where("  and line_seqn = :line_seqn   ")
        			.where("  and stor_id = :stor_id ")
        			//
        			.unique("inv_no"      , row.fixParameter("inv_no"))
        			.unique("line_seqn"     , row.fixParameter("line_seqn"))
        			.unique("stor_id"    , row.fixParameter("stor_id"))
	        		.update("stor_qty"   , row.fixParameter("stor_qty"))
					.update("upt_nm"   , row.getParameter("upt_nm"))
					.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.action = rowaction;
	        	data.attach();
			}
		}
		
		data.execute();
		return null;
	}
}
