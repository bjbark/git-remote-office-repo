package com.sky.system.stock;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class SubulMonthWorkService  extends DefaultServiceHandler {

	/**
	 * 정산현황
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		String mm = StringUtils.substring(arg.fixParamText("base_dt"), 4, 6);
		
		data.param // 집계                                                                                                    
			.total("select count(1) as maxsize ")                                                   
			.total("      ,sum(s.safe_qty)                                          as safe_qty   ")
			.total("      ,sum(t.stock)                                             as stock      ")
			.total("      ,sum(decode(i.unt_qty, 0 , t.stock, t.stock/i.unt_qty)) as bind_stock ")
			.total("      ,sum(isnull(t.stock, 0)-isnull(s.safe_qty, 0))                  as lack_qty   ")
			.total("      ,sum(a.trans_qty)                                         as trans_qty  ")
			.total("      ,sum(a.trans_amt)                                         as trans_amt  ")
			.total("      ,sum(a.in_qty)                                            as in_qty     ")
			.total("      ,sum(a.in_amt)                                            as in_amt     ")
			.total("      ,sum(a.out_qty)                                           as out_qty    ")
			.total("      ,sum(a.out_amt)                                           as out_amt    ")
			.total("      ,sum(a.out_sum)                                           as out_sum    ")
			.total("      ,sum(a.out_profit)                                        as out_profit ")
		;
		data.param // 조회
			.query("select n.stor_nm                                                                                                                                                             ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 2)) as class_nm1                                                                               ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 4)) as class_nm2                                                                               ")
			.query("      ,(select class_nm from item_class where class_id = substr(i.class_id, 0, 6)) as class_nm3                                                                               ")
			.query("      ,i.item_code                                                                                                                                                              ")
			.query("      ,i.item_name                                                                                                                                                              ")
			.query("      ,i.item_spec                                                                                                                                                              ")
			.query("      ,u.unit_name                                                                                                                                                              ")
			.query("      ,m.bas_nm as mfg_nm                                                                                                                                                    ")
			.query("      ,v.vend_nm                                                                                                                                                              ")
			.query("      ,i.item_sts                                                                                                                                                             ")
			.query("      ,s.safe_qty                                                                                                                                                             ")
			.query("      ,t.stock                                                                                                                                                                ")
			.query("      ,decode(i.unt_qty, 0 , t.stock, t.stock/i.unt_qty) as bind_stock                                                                                                      ")
			.query("      ,isnull(t.stock, 0)-isnull(s.safe_qty, 0) as lack_qty                                                                                                                         ")
			.query("      ,a.trans_qty                                                                                                                                                            ")
			.query("      ,a.trans_amt                                                                                                                                                            ")
			.query("      ,a.in_qty                                                                                                                                                               ")
			.query("      ,a.in_amt                                                                                                                                                               ")
			.query("      ,a.month_ave_price                                                                                                                                                      ")
			.query("      ,a.year_ave_price                                                                                                                                                       ")
			.query("      ,a.out_qty                                                                                                                                                              ")
			.query("      ,a.out_amt                                                                                                                                                              ")
			.query("      ,a.out_sum                                                                                                                                                              ")
			.query("      ,a.out_profit                                                                                                                                                           ")
		;
		data.param // 조건
			.where("  from (                                                                                                                                                                      ")
			.where("       select stor_id                                                                                                                                                        ")
			.where("             ,item_idcd                                                                                                                                                         ")
			.where("             ,base_qty_"+mm+" as trans_qty                                                                                                                                    ")
			.where("             ,base_amt_"+mm+" as trans_amt                                                                                                                                    ")
			.where("             ,recv_qty_"+mm+" as in_qty                                                                                                                                       ")
			.where("             ,recv_amt_"+mm+" as in_amt                                                                                                                                       ")
			.where("             ,decode(last_qty_"+mm+", 0, 0, last_ave_"+mm+"/last_qty_"+mm+") as month_ave_price                                                                               ")
			.where("             ,decode((last_qty_01+last_qty_02+last_qty_03+last_qty_04+last_qty_05+last_qty_06+last_qty_07+last_qty_08+last_qty_09+last_qty_10+last_qty_11+last_qty_12), 0, 0, ")
			.where("               (last_ave_01+last_ave_02+last_ave_03+last_ave_04+last_ave_05+last_ave_06+last_ave_07+last_ave_08+last_ave_09+last_ave_10+last_ave_11+last_ave_12)              ")
			.where("               /(last_qty_01+last_qty_02+last_qty_03+last_qty_04+last_qty_05+last_qty_06+last_qty_07+last_qty_08+last_qty_09+last_qty_10+last_qty_11+last_qty_12))            ")
			.where("              as year_ave_price                                                                                                                                               ")
			.where("             ,sale_qty_"+mm+"+movs_qty_"+mm+"-movr_qty_"+mm+"+modi_qty_"+mm+" as out_qty                                                                                      ")
			.where("             ,sale_amt_"+mm+"+movs_amt_"+mm+"-movr_amt_"+mm+"+modi_amt_"+mm+" as out_amt                                                                                      ")
			.where("             ,sale_sum_"+mm+"+movs_sum_"+mm+"-movr_sum_"+mm+"+modi_sum_"+mm+" as out_sum                                                                                      ")
			.where("             ,(sale_sum_"+mm+"+movs_sum_"+mm+"-movr_sum_"+mm+"+modi_sum_"+mm+")-(sale_amt_"+mm+"+movs_amt_"+mm+"-movr_amt_"+mm+"+modi_amt_"+mm+") as out_profit               ")
			.where("         from item_month                                                                                                                                                      ")
			.where("        where stor_grp = :stor_grp                                                                                                                                            ", arg.fixParameter("stor_grp"))
			.where("          and stor_id = :stor_id                                                                                                                                            ", arg.getParameter("stor_id"))
			.where("          and lock_yy = substr(:base_dt, 1, 4)                                                                                                                                ", arg.fixParameter("base_dt"))
			.where("          and (   base_qty_"+mm+" <> 0                                                                                                                                        ")
			.where("               or sale_qty_"+mm+" <> 0                                                                                                                                        ")
			.where("               or recv_qty_"+mm+" <> 0                                                                                                                                        ")
			.where("               or movs_qty_"+mm+" <> 0                                                                                                                                        ")
			.where("               or movr_qty_"+mm+" <> 0                                                                                                                                        ")
			.where("               or modi_qty_"+mm+" <> 0                                                                                                                                        ")
			.where("               or sale_sum_"+mm+" <> 0                                                                                                                                        ")
			.where("               or recv_sum_"+mm+" <> 0                                                                                                                                        ")
			.where("               or movs_sum_"+mm+" <> 0                                                                                                                                        ")
			.where("               or movr_sum_"+mm+" <> 0                                                                                                                                        ")
			.where("               or modi_sum_"+mm+" <> 0                                                                                                                                        ")
			.where("              )                                                                                                                                                               ")             
			.where("          and row_sts = 0                                                                                                                                                   ")
			.where("       ) a                                                                                                                                                                    ")
			.where("       join store n                                                                                                                                                           ")
			.where("         on n.stor_id = a.stor_id                                                                                                                                           ")
			.where("       join itm_stor s                                                                                                                                                      ")
			.where("         on s.stor_id = a.stor_id                                                                                                                                           ")
			.where("        and s.item_idcd = a.item_idcd                                                                                                                                             ")
			.where("       left outer join itm_stock t                                                                                                                                           ")
			.where("         on t.stor_id = a.stor_id                                                                                                                                           ")
			.where("        and t.item_idcd = a.item_idcd                                                                                                                                             ")
			.where("       left outer join itm_mst i                                                                                                                                            ")
			.where("         on i.item_idcd = a.item_idcd                                                                                                                                             ")
			.where("       left outer join item_unit u                                                                                                                                            ")
			.where("         on u.unit_idcd = i.unit_idcd                                                                                                                                             ")
			.where("       left outer join base_mst m                                                                                                                                            ")
			.where("         on m.bas_id = i.mfg_id                                                                                                                                              ")
			.where("       left outer join vend_mst v                                                                                                                                            ")
			.where("         on v.vend_id = i.vend_id                                                                                                                                             ")
			.where(" order by n.stor_id, i.item_idcd                                                                                                                                               ")
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	
	/**
	 * 수불마감정보 조회
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getCloseInfo(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String mm = StringUtils.substring(arg.fixParamText("base_dt"), 4, 6);

		data.param // 쿼리문  입력
			.query("select substr(:base_dt, 1, 4) as yyyy          ", arg.fixParameter("base_dt"))  
			.query("      ,substr(:base_dt, 5, 2) as mm            ", arg.fixParameter("base_dt"))
			.query("      ,count(1) cnt                            ")
			.query("  from item_month                              ")
			.query("        where stor_grp = :stor_grp             ", arg.fixParameter("stor_grp"))
			.query("          and stor_id = :stor_id             ", arg.getParameter("stor_id"))
			.query("          and lock_yy = substr(:base_dt, 1, 4) ", arg.fixParameter("base_dt"))
			.query("          and (   base_qty_"+mm+" <> 0         ")
			.query("               or sale_qty_"+mm+" <> 0         ")
			.query("               or recv_qty_"+mm+" <> 0         ")
			.query("               or movs_qty_"+mm+" <> 0         ")
			.query("               or movr_qty_"+mm+" <> 0         ")
			.query("               or modi_qty_"+mm+" <> 0         ")
			.query("               or sale_sum_"+mm+" <> 0         ")
			.query("               or recv_sum_"+mm+" <> 0         ")
			.query("               or movs_sum_"+mm+" <> 0         ")
			.query("               or movr_sum_"+mm+" <> 0         ")
			.query("               or modi_sum_"+mm+" <> 0         ")
			.query("              )                                ")             
		;
		
	    return data.selectForMap();
	}
	
	/**
	 * 수불마감 처리
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setCloseItemMonth(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
        data.param
			.query("call net_package_closejob.close_item_month                ")
			.query("     (                                                    ")
			.query("     :base_dt                                             ", arg.fixParamText("base_dt"))
			.query("    ,:stor_id                                            ", arg.fixParamText("stor_id"))
			.query("     )                                                    ")
			.action = Action.direct;
    	data.attach();
    	
    	data.execute();
		return null;
	}
}
