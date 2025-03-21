package com.sky.system.custom.wontc.prod.order.workbook;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service("wontc.WorkBookService")
public class WorkBookService extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;


	public SqlResultMap getSearch1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select    a.invc_numb      , a.invc_date      , a.wkct_idcd      , a.wkod_numb			")
			.where("        , a.indn_qntt      , a.prod_qntt      , a.good_qntt      , a.poor_qntt			")
			.where("        , a.item_idcd      , a.cvic_idcd      , a.prog_stat_dvcd , i.item_name			")
			.where("        , a.work_strt_dttm , a.work_endd_dttm , u.user_name   as wker_name				")
			.where("        , w.wkct_code      , w.wkct_name      , c.cvic_code      , c.cvic_name			")
			.where("        , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.crte_urif 			")
			.where("        , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name		")
			.where("        , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.where("        , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd			")
		;
		data.param //퀴리문
			.where("from work_book a																		")
			.where("left outer join wkct_mast      w  on a.wkct_idcd   = w.wkct_idcd						")
			.where("left outer join cvic_mast      c  on a.cvic_idcd   = c.cvic_idcd						")
			.where("left outer join item_mast      i  on a.item_idcd   = a.item_idcd						")
			.where("left outer join user_mast      u  on u.user_idcd   = a.wker_idcd						")
			.where("where    1=1																			")
			.where("and      a.find_name like %:find_name% " , arg.getParameter("find_name"))
			.where("and      a.invc_date  >= :invc_date1   " , arg.getParamText("invc_date1"))
			.where("and      a.invc_date  <= :invc_date2   " , arg.getParamText("invc_date2"))
			.where("and      a.line_stat   = :line_stat    " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_date ) a																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
