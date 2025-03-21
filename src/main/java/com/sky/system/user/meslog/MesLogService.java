package com.sky.system.user.meslog;

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
public class MesLogService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																		" )
		;
		data.param
			.query("select																							")
			.query("		   a.log_idcd      , a.used_dttm       , a.user_idcd       , a.crud_dvcd				")
			.query("		, cast(replace(json_extract(a.json_data, '$.name'),'\"','') as char) as name			")
			.query("		, cast(replace(json_extract(a.json_data, '$.program name'),'\"','') as char) as program ")
			.query("		, cast(replace(json_extract(a.json_data, '$.ip address'),'\"','') as char) as address	")
			.query("		, cast(replace(json_extract(a.json_data, '$.pg_idcd'),'\"','') as char) as idcd			")
		;
		data.param //퀴리문
			.where("from	mes_log a																				")
			.where("where	1=1																						")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and     a.user_idcd   = :user_idcd	" , arg.getParamText("user_idcd" ))
			.where("and     substring(a.used_dttm,1,8)  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     substring(a.used_dttm,1,8)  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("order by a.used_dttm desc																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

}
