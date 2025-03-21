package com.sky.system.plan;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

@Service
public class YearPlanListService  extends DefaultServiceHandler {

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
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select d.dept_nm as target_nm  ")
			.query("      ,s.amount  as amount  ")
			.query("      ,s.plan_id as plan_id            ")
			.query("      ,(select sum(sp.amount) from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id >= '01' and sp.month_id <= '06' and sp.row_lvl = 2) as amountfhalf    ")
			.query("      ,(select sum(sp.amount) from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id >= '07' and sp.month_id <= '12' and sp.row_lvl = 2) as amountshalf    ")
			.query("      ,(select sum(sp.amount) from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id >= '01' and sp.month_id <= '03' and sp.row_lvl = 2) as amountquarter1 ")
			.query("      ,(select sum(sp.amount) from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id >= '04' and sp.month_id <= '06' and sp.row_lvl = 2) as amountquarter2 ")
			.query("      ,(select sum(sp.amount) from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id >= '07' and sp.month_id <= '09' and sp.row_lvl = 2) as amountquarter3 ")
			.query("      ,(select sum(sp.amount) from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id >= '10' and sp.month_id <= '12' and sp.row_lvl = 2) as amountquarter4 ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '01' and sp.row_lvl = 2) as amount1            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '02' and sp.row_lvl = 2) as amount2            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '03' and sp.row_lvl = 2) as amount3            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '04' and sp.row_lvl = 2) as amount4            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '05' and sp.row_lvl = 2) as amount5            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '06' and sp.row_lvl = 2) as amount6            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '07' and sp.row_lvl = 2) as amount7            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '08' and sp.row_lvl = 2) as amount8            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '09' and sp.row_lvl = 2) as amount9            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '10' and sp.row_lvl = 2) as amount10            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '11' and sp.row_lvl = 2) as amount11            ")
			.query("      ,(select sp.amount from sale_plan sp where sp.prnt_id = s.plan_id and sp.month_id = '12' and sp.row_lvl = 2) as amount12            ")
		;
		data.param
			.where("  from sale_plan s             ")
			.where("      ,dept_mst d             ")
			.where(" where s.target_id = d.dept_id ")
			.where("   and s.year_id = :year_id    ", arg.fixParameter("year_id"  ))
			.where("   and s.row_lvl = 1         ")
			.where("   and s.row_sts = 0         ")
			.where("   and s.row_clos = 1         ")
			.where(" order by s.plan_id desc       ")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
