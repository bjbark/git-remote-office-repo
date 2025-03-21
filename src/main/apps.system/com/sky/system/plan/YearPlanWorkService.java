package com.sky.system.plan;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

@Service
public class YearPlanWorkService  extends DefaultServiceHandler {

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
		data.param
			.total("select count(1) as maxsize ")
		;
		data.param // 쿼리문  입력
			.query("select d.dept_nm as target_nm  ")
			.query("      ,d.dept_cd as target_cd  ")
			.query("      ,s.target_id             ")
			.query("      ,s.amount                ")
			.query("      ,s.plan_id               ")
			.query("      ,s.row_clos             ")
		;
		data.param
			.where("  from sale_plan s             ")
			.where("      ,dept_mst d             ")
			.where(" where s.target_id = d.dept_id ")
			.where("   and s.year_id = :year_id    ", arg.fixParameter("year_id"  ))
			.where("   and s.row_lvl = 1         ")
			.where("   and s.row_sts = 0         ")
			.where(" order by s.plan_id desc       ")
		;
		
		if (page == 0 && rows == 0){
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
		.query("select plan_id  ")
		.query("      ,month_id             ")
		.query("      ,amount               ")
		.query("      ,user_memo            ")
		.query("  from sale_plan            ")
		.query(" where prnt_id = :plan_id ", arg.fixParameter("plan_id"  ))
		.query("   and row_lvl = 2        ")
		.query("   and row_sts = 0        ")
		.query(" order by month_id          ")
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
		.query("select d.dept_nm as target_nm  ")
		.query("      ,d.dept_cd as target_cd  ")
		.query("      ,s.target_id             ")
		.query("      ,s.amount                ")
		.query("      ,s.year_id               ")
		.query("      ,s.plan_id               ")
		.query("      ,s.row_clos             ")
		.query("  from sale_plan s             ")
		.query("      ,dept_mst d             ")
		.query(" where s.target_id = d.dept_id ")
		.query("   and s.plan_id = :plan_id ", arg.fixParameter("plan_id"  ))
		.query("   and s.row_lvl = 1         ")
		.query("   and s.row_sts = 0         ")
		.query(" order by s.plan_id desc       ")
		;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			
			data.param // 쿼리문  입력
			.query("select plan_id  ")
			.query("      ,month_id             ")
			.query("      ,amount               ")
			.query("      ,user_memo            ")
			.query("  from sale_plan            ")
			.query(" where prnt_id = :plan_id ", arg.fixParameter("plan_id"  ))
			.query("   and row_lvl = 2        ")
			.query("   and row_sts = 0        ")
			.query(" order by month_id          ")
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
		
				// 발주정보 삭제
	        	data.param
        			.table("sale_plan")
        			.where("where plan_id = :plan_id              ")
        			//
        			.unique("plan_id" , row.fixParameter("plan_id"))
        			.action = rowaction;
        		data.attach();

				// 발주상세 삭제
	        	data.param
        			.table("sale_plan")
        			.where("where prnt_id = :plan_id              ")
        			//
        			.unique("plan_id" , row.fixParameter("plan_id"))
        			.action = rowaction;
	        	data.attach();

			} else {
				
				// 발주정보 등록/수정
	        	data.param
	    			.table("sale_plan")
	    			.where("where plan_id = :plan_id ")
					.insert("corp_id"    , row.getParameter("corp_id"   ))
					.insert("hq_id"    , row.getParameter("hq_id"   ))
					.insert("stor_grp"    , row.getParameter("stor_grp"   ))
					.unique("plan_id"     , row.fixParameter("plan_id"    ))
					.insert("year_id"     , row.getParameter("year_id"    ))
					.insert("month_id"    , row.getParameter("month_id"   ))
					.insert("target_id"   , row.getParameter("target_id"  ))
					.update("amount"      , row.getParameter("amount"     ))
					.update("user_memo"   , row.getParameter("user_memo"  ))
					//.update("sys_memo"   , row.getParameter("sys_memo"  ))
					.insert("prnt_id"   , row.getParameter("prnt_id"  ))
					.update("row_lvl"   , row.getParameter("row_lvl"  ))
					.update("row_clos"   , row.getParameter("row_clos"  ))
					//.update("row_ord"   , row.getParameter("row_ord"  ))
					.update("row_sts"   , row.getParameter("row_sts"  ))
					.update("upt_id"   , row.getParameter("upt_id"  ))
					.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_id"   , row.getParameter("crt_id"  ))
					.insert("crt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.action = rowaction;
	        	data.attach();
	        	
	        	if("0".equals(row.getParameter("row_clos"))){
	        		if(row.getParameter("product", SqlResultMap.class) != null) {
	        			setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
	        		}
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
				
				// 발주상세 삭제
	        	data.param
        			.table("po_item")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

			} else {

				// 발주상세 등록/수정
				data.param
    			.table("sale_plan")
    			.where("where plan_id = :plan_id ")
				.insert("corp_id"    , row.getParameter("corp_id"   ))
				.insert("hq_id"    , row.getParameter("hq_id"   ))
				.insert("stor_grp"    , row.getParameter("stor_grp"   ))
				.unique("plan_id"     , row.fixParameter("plan_id"    ))
				.insert("year_id"     , row.getParameter("year_id"    ))
				.insert("month_id"    , row.getParameter("month_id"   ))
				.insert("target_id"   , row.getParameter("target_id"  ))
				.update("amount"      , row.getParameter("amount"     ))
				.update("user_memo"   , row.getParameter("user_memo"  ))
				//.update("sys_memo"   , row.getParameter("sys_memo"  ))
				.insert("prnt_id"   , row.getParameter("prnt_id"  ))
				.update("row_lvl"   , row.getParameter("row_lvl"  ))
				.update("row_clos"   , row.getParameter("row_clos"  ))
				//.update("row_ord"   , row.getParameter("row_ord"  ))
				.update("row_sts"   , row.getParameter("row_sts"  ))
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
	}
}
