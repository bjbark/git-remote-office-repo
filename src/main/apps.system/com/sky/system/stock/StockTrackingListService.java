package com.sky.system.stock;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

@Service
public class StockTrackingListService  extends DefaultServiceHandler {

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
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select a.item_idcd                                                                                                               ")
			.query("      ,a.mst_itm_id                                                                                                               ")
			.query("      ,i.mst_itm_cd                                                                                                               ")
//			.query("      ,i.item_code                                                                                                               ")
			.query("      ,i.item_name                                                                                                               ")
			.query("      ,i.item_spec                                                                                                               ")
			.query("      ,u.unit_name                                                                                                               ")
			.query("      ,m.bas_nm as mfg_nm                                                                                                     ")
		;
		data.param // 조건
			.where("  from itm_stor a                                                                                                            ")
			.where("       join itm_mst i                                                                                                        ")
			.where("         on i.item_idcd = a.item_idcd                                                                                              ")
			.where("        and i.mst_itm_id = a.item_idcd                                                                                              ")
			.where("       left outer join item_unit u                                                                                             ")
			.where("         on u.unit_idcd = i.unit_idcd                                                                                              ")
			.where("       left outer join base_mst m                                                                                             ")
			.where("         on m.bas_id = i.mfg_id                                                                                               ")
			.where(" where a.row_sts < 2                                                                                                         ")
			.where("   and a.stor_grp = :stor_grp                                                                                                  ", arg.fixParameter("stor_grp"))
			.where("   and a.stor_id = :stor_id                                                                                                  ", arg.fixParameter("stor_id"))
//			.where("   and i.item_code like %:find_name%                                                                                             ", arg.getParameter("find_name"), "1".equals(arg.getParamText("search_id")))
			.where("   and i.mst_itm_id in ( select mst_itm_id  from scan_mst  where scan_cd like :find_name% )                                          ", arg.getParameter("find_name"), "1".equals(arg.getParamText("search_id")))
			.where("   and i.item_name like %:find_name%                                                                                             ", arg.getParameter("find_name"), "2".equals(arg.getParamText("search_id")))
			.where("   and (  i.mst_itm_id in ( select mst_itm_id  from scan_mst  where scan_cd like :find_name% )                                       ", arg.getParameter("find_name"), "".equals(arg.getParamText("search_id")))
			.where("       or i.item_name like %:find_name% )                                                                                        ", arg.getParameter("find_name"), "".equals(arg.getParamText("search_id")))
			.where("   and i.class_id in ( select class_id from item_class start with class_id = :class_id connect by prior class_id = prnt_id ) ", arg.getParameter("class_id"))
			.where(" order by i.mst_itm_cd                                                                                                            ")
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
			.query("select s.stor_id                           ")
			.query("      ,s.stor_nm                           ")
			.query("      ,sum(a.stock*i.unt_qty) as eaqty     ")
			.query("      ,a.mst_itm_id                            ")
			.query("  from store s                              ")
			.query("       left outer join itm_stock a         ")
			.query("         on a.stor_id = s.stor_id         ")
			.query("        and a.mst_itm_id = :mst_itm_id            ", arg.fixParameter("mst_itm_id"))
			.query("       left outer join itm_mst i          ")
			.query("         on i.item_idcd = a.item_idcd           ")
			.query(" where s.row_sts < 2                      ")
			.query("   and s.stor_grp = :stor_grp				", arg.fixParameter("stor_grp"))
			.query(" group by s.stor_id, s.stor_nm, a.mst_itm_id ")
			.query(" order by s.stor_id                        ")
		;
		
		return data.selectForMap();
	}

	/**
	 * detail2 조회
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail2(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select i.item_code                   ")
			.query("      ,i.brcd_1 as barcode       ")
			.query("      ,u.unit_name  as unit_name       ")
			.query("      ,i.unt_qty                  ")
			.query("      ,a.stock                     ")
			.query("      ,a.stock*i.unt_qty as eaqty ")
			.query("  from itm_stock a                ")
			.query("       left outer join itm_mst i ")
			.query("         on i.item_idcd = a.item_idcd  ")
			.query("       left outer join item_unit u ")
			.query("         on u.unit_idcd = i.unit_idcd  ")
			.query(" where a.mst_itm_id = :mst_itm_id 		", arg.fixParameter("mst_itm_id"))
			.query("   and a.stor_id = :stor_id 		", arg.fixParameter("stor_id"))
		;
		
		return data.selectForMap();
	}
}
