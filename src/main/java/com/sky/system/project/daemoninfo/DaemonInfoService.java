package com.sky.system.project.daemoninfo;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Service
public class DaemonInfoService extends DefaultServiceHandler {

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문 입력
			.total(" select  count(1) as maxsize																")
		;
		data.param // 쿼리문 입력
			.query("select a.dmn_id     , a.dmn_nm																")
			.query("     , a.host_id    ,(select host_cd from host_mst where host_id = a.host_id ) as host_cd	")
			.query("     , a.usr_memo   , a.row_sts																")
		;
		data.param // 조건문 입력
			.where("from   host_daemon a																		")
			.where("where  1 = 1																				")
			//.where("where  a.center_id = 'ARN'   " )
			.where("and    a.dmn_nm like %:dmn_nm% "  , arg.getParameter("dmn_nm" ))
		;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) , sort );
		}
	}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				data.param
					.table("host_daemon")
					.where("where dmn_id  = :dmn_id  " )

					.unique("dmn_id"        , row.getParameter("dmn_id"      ))
					.update("dmn_nm"        , row.getParameter("dmn_nm"      ))
					.update("host_id"       , row.fixParameter("host_id"        ))

					.update("usr_memo"      , row.getParameter("usr_memo"      ))
					.update("row_sts"       , row.getParameter("row_sts"      ))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
