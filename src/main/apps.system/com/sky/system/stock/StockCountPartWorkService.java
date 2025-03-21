package com.sky.system.stock;

import java.util.StringTokenizer;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class StockCountPartWorkService  extends DefaultServiceHandler {

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
			.total("      ,sum(b.work_stock)        as work_stock        ")
			.total("      ,sum(b.work_stock_amount) as work_stock_amount ")
		;
		data.param // 조회
	        .query("select a.row_clos                                            ")
	        .query("      ,a.plan_no                                              ")
	        .query("      ,a.plan_dt                                              ")
	        .query("      ,c.stor_nm                                             ")
	        .query("      ,d.emp_nm as confirm_nm                                ")
	        .query("      ,b.work_stock                                           ")
	        .query("      ,b.work_stock_amount                                    ")
	        .query("      ,a.confirm_yn                                           ")
	        .query("      ,a.user_memo                                            ")
		;
		data.param // 조건
	        .where("  from adjust_plan a                                          ")
	        .where("       left outer join (                                      ")
	        .where("            select plan_no                                    ")
	        .where("                  ,sum(work_stock)       as work_stock        ")
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
			.where("   and a.plan_gb = '1' 				                          ") // 0=재고 실사/1=부분 실사
	        .where(" order by a.plan_no desc                                      ")
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
			.total("      ,sum(s.work_stock) as work_stock ")
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
			.query("      ,s.work_stock                                                                                                           ")
			.query("      ,s.price                                                                                                                ")
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
	 * detail 수정
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

			if ("update".equals(flag)) {

				// 실사수량 수정
	        	data.param
        			.table("adjust_stock")
        			.where("where plan_no = :plan_no ")
        			.where("  and item_idcd = :item_idcd ")
        			//
        			.unique("plan_no"     , row.fixParameter("plan_no"))
        			.unique("item_idcd"     , row.fixParameter("item_idcd"))
					.update("work_stock"  , row.getParameter("work_stock"))
					.update("upt_nm"   , row.getParameter("upt_nm"  ))
					.update("upt_ip"   , arg.remoteAddress)
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
        		;
        		data.attach(Action.update);
			}
		}
		
		data.execute();
		return null;
	}
	
	/**
	 * 엑셀등록
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public void setExcel(HttpRequestArgument arg, DataMessage data, String item_code, String work_stock) throws Exception {

//		DataMessage data = arg.newStorage("POS");

		// 실사수량 수정
		data.clear();
    	data.param
	    	.query("update adjust_stock                                                                                  ")
	    	.query("   set work_stock = " + work_stock + "                                                               ")
	    	.query("      ,upt_nm = :upt_nm                                                                        ", arg.getParameter("upt_nm"))
	    	.query("      ,upt_ip = '" + arg.remoteAddress + "'                                                       ")
	    	.query("      ,upt_dttm = to_char(sysdate, 'yyyymmddhh24miss')                                              ")
	    	.query(" where plan_no = :plan_no                                                                            ", arg.getParameter("plan_no"))
	    	.query("   and item_code = :item_code " , item_code )
	    	//.query("   and item_idcd in (select item_idcd from scan_mst where scan_cd = '" + item_code + "' group by item_idcd) ")
	    ;
		data.attach(Action.direct);
		
		data.execute();
	}
}
