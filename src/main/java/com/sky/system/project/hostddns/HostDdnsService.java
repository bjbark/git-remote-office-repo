package com.sky.system.project.hostddns;


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
public class HostDdnsService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		data.param // 집계문 입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문 입력
			.query("select a.site_yn																			")
			.query("   ,   a.host_id       ,(select host_cd from host_mst where host_id = a.host_id ) as host_cd")
			.query("   ,   a.host_id       , h.host_cd      as host_cd											")
			.query("   ,   h.host_ip       as host_ip       , h.dhcp_ip       as dhcp_ip						")
			.query("   ,   a.ddn_id        , a.ddn_cd       , a.ddn_nm        , a.ddn_gb						")
			.query("   ,   a.provider      , a.protocol     , a.host_conn_port, a.host_path						")
			.query("   ,   a.host_conn_acct, a.host_conn_pwd, a.pooltime      , a.maxcount						")
			.query("   ,   a.usr_memo      , a.row_sts															")
		;
		data.param // 조건문 입력
			.where("from   host_ddn a																			")
			.where("       left outer join host_mst h on a.host_id = h.host_id									")
			.where("where  a.row_sts <  2																		")
//			.where("and    a.site_yn   = '0' " )
			.where("and    a.ddns_nm like   %:ddns_nm%     " , arg.getParameter("find_nm") )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) , sort );
		}
	}



	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		for(SqlResultRow row:arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				data.param
					.table("host_ddn")
					.where("where ddn_id  = :ddn_id  " )
					//
					.unique("ddn_id"            , row.fixParameter("ddn_id"       ))

					.update("site_yn"           , row.getParameter("site_yn"       ))
					.update("host_id"           , row.getParameter("host_id"       ))
					.update("ddn_cd"            , row.getParameter("ddn_cd"       ))
					.update("ddn_nm"            , row.getParameter("ddn_nm"       ))
					.update("ddn_gb"            , row.getParameter("ddn_gb"       ))
					.update("provider"          , row.getParameter("provider"      ))
					.update("host_conn_port"    , row.getParameter("host_conn_port" ))
					.update("host_path"         , row.getParameter("host_path"      ))
					.update("host_conn_acct"    , row.getParameter("host_conn_acct" ))
					.update("host_conn_pwd"     , row.getParameter("host_conn_pwd"  ))
					.update("pooltime"          , row.getParameter("pooltime"      ))
					.update("maxcount"          , row.getParameter("maxcount"      ))
					.update("usr_memo"          , row.getParameter("usr_memo"     ))
					.update("row_sts"           , row.getParameter("row_sts"     ))
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);

//				data.param
//					.table("idc_system")
//					.where("where system_id  = :system_id  " )
//					//
//					.unique("system_id"         , row.fixParameter("ddns_id"        ))
//					.update("server_id"         , row.fixParameter("host_id"        ))
//					.update("system_cd"         , row.fixParameter("ddns_cd"        ))
//					.update("system_ow"         , row.fixParameter("site_id"        ))
//					.update("system_gb"         , row.getParameter("ddns_gb"        ))
//					.update("system_nm"         , row.fixParameter("ddns_nm"        ))
//					.update("db_provider"       , row.fixParameter("provider"      ))
//					.update("db_hostport"       , row.fixParameter("host_conn_port"      ))
//					.update("db_username"       , row.fixParamText("host_conn_acct"      ).trim() )
//					.update("db_password"       , row.fixParamText("host_conn_pwd"      ).trim() )
//					.update("db_database"       , row.fixParamText("host_path"      ).trim() )
//					.update("db_pooltime"       , row.fixParameter("pooltime"      ))
//					.update("db_maxcount"       , row.fixParameter("maxcount"      ))
//					.update("usr_memo"          , row.getParameter("usr_memo"        ))
//					.update("row_sts"           , row.getParameter("row_sts"        ))
//					.update("upt_dttm"		    , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crt_dttm"		    , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;data.attach(Action.modify);
//
//				data.param
//					.table("sync_mst")
//					.where("where sync_id = :sync_id and ddns_id = :ddns_id  " )
//					.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
//					//
//					.unique("sync_id"           , HostDdnsTasker.ASP_NET_HOST_DDNS     )
//					.unique("ddns_id"           , "NETPAYGATE" )
//					.unique("idx_1"           , row.fixParameter("ddns_id"        ))
//					.unique("idx_2"           , row.fixParameter("host_id"        ))
//					.unique("idx_3"           , row.fixParameter("site_id"        ))
//					.update("row_sts"           , row.getParameter("row_sts"      ))
//					.update("upt_dttm"		    , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crt_dttm"		    , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;data.attach(Action.modify).async(HostDdnsTasker.class, HostDdnsTasker.ASP_NET_HOST_DDNS );

			}
		}
		data.execute();
		return null ;
	}

}
