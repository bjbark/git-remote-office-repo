package com.sky.system.custom.sjflv.eis.userloglist;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class UserLogListService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																		" )
		;
		data.param
			.query("select																							")
			.query("           a.log_idcd      , a.log_time       , a.lgin_idcd       , a.menu_idcd					")
			.query("        ,  a.log_dvcd      , a.log_name       , a.json_data										")
			.query("        ,  m.menu_nm as menu_name , u.user_name													")
		;
		data.param //퀴리문
			.where("from	user_logs_hist a																		")
			.where("left outer join menu_mst    m  on a.menu_idcd = m.menu_id										")
			.where("left outer join user_mast   u  on a.lgin_idcd = u.lgin_idcd									")
			.where("where	1=1																						")
			.where("and		m.menu_nm	like %:menu_nm%"	, arg.getParameter("menu_nm"))
			.where("and     u.user_idcd   = :user_idcd	" , arg.getParamText("user_idcd" ))
			.where("and     DATE_FORMAT(a.log_time, '%Y%m%d')  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     DATE_FORMAT(a.log_time, '%Y%m%d')  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("order by a.log_idcd																				")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

}
