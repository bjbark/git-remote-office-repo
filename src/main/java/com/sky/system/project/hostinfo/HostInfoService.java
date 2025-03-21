package com.sky.system.project.hostinfo;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Service
public class HostInfoService extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문 입력
			.total(" select  count(1) as maxsize															")
		;
		data.param // 쿼리문 입력
			.query("select a.host_grp   , a.host_id    , a.host_cd    , a.host_nm							")
			.query("     , a.host_gb    , a.host_os    , a.host_ip    , a.dhcp_ip							")
			.query("     , a.srl_no     , a.prod_model , a.pur_dt     , a.pur_info   , a.sw_memo			")
			.query("     , a.usr_id     , (select emp_nm from usr_mst where emp_id = a.usr_id ) as emp_nm	")
			.query("     , a.usr_memo   , a.row_sts    , b.host_count										")

			//a.center_id     ,

		;
		data.param // 조건문 입력
			.where("from   host_mst a																		")
			.where("       left outer join ( select   x.host_id  , count(*)  as host_count					")
    		.where("                         from     host_ddn  x											")
    		.where("                         where    x.host_id <> '0'										")
    		.where("                         group by x.host_id												")
   			.where("       )  b on b.host_id = a.host_id													")
			.where("where  1 = 1																			")
			.where("and    a.emp_id      = :emp_id    " , arg.getParameter("emp_id"   ))
			.where("and    a.host_gb     = :host_gb   " , arg.getParameter("host_gb"   )) // 운영구분
			.where("and    a.host_grp    = :host_grp  " , arg.getParameter("host_grp"   )) // 관리구분
			.where("and    a.host_nm like %:host_nm%  " , arg.getParameter("host_nm" ))
			.where("and    a.row_sts     = :row_sts   " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
		;
		return (page == 0 && rows == 0) ? data.selectForMap(sort) : data.selectForMap(page, rows, (page==1),sort);
	}


	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문 입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문 입력
			.query("select a.host_id   , a.host_cd     , a.host_nm  									")
			.query("     , a.host_os   , a.host_gb     , a.host_ip  , a.dhcp_ip							")
			.query("     , a.srl_no    , a.pur_dt      , a.pur_info 									")
			.query("     , a.usr_id    , (select emp_nm from usr_mst where emp_id = a.usr_id ) as emp_nm")
			.query("     , a.usr_memo  , a.row_sts														")

		;
		data.param // 조건문 입력
			.where("from   host_mst a																	")
			.where("where  1 = 1																		")
			.where("and    a.emp_id      = :emp_id    " , arg.getParameter("emp_id"   ))
			.where("and    a.host_gb     = :host_gb   " , arg.getParameter("host_gb"  )) // 운영구분
			.where("and    a.host_grp    = :host_grp  " , arg.getParameter("host_grp" )) // 관리구분
			.where("and    a.host_nm like %:host_nm%  " , arg.getParameter("host_nm"  ))
			.where("and    a.row_sts     = :row_sts   " , arg.getParamText("row_sts"  ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts     < :row_sts   " , "2" , "".equals(arg.getParamText("row_sts" )) )
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
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("host_mst")
					.where("where host_id  = :host_id  " )
					//
					.unique("host_id"       , row.fixParameter("host_id"        ))
				;
				data.attach(Action.delete);

			} else {
				data.param
					.table("host_mst")
					.where("where host_id  = :host_id  " )
					//
					.unique("host_id"       , row.fixParameter("host_id"        ))
					.update("host_cd"       , row.getParameter("host_cd"        ))
					.update("host_grp"      , row.getParameter("host_grp"       ))
					.update("host_nm"       , row.getParameter("host_nm"        ))
					.update("host_ip"       , row.getParameter("host_ip"        ))
					.update("dhcp_ip"       , row.getParameter("dhcp_ip"        ))
					.update("host_os"       , row.getParameter("host_os"        ))
					.update("host_gb"       , row.getParameter("host_gb"        ))
					//
					.update("usr_id"        , row.getParameter("usr_id"         ))
					//
					.update("srl_no"        , row.getParameter("srl_no"  ))
					.update("prod_model"    , row.getParameter("prod_model"  ))
					.update("pur_dt"        , row.getParameter("pur_dt"  ))
					.update("pur_info"      , row.getParameter("pur_info"      ))
					.update("sw_memo"       , row.getParameter("sw_memo"       ))
					.update("usr_memo"      , row.getParameter("usr_memo"      ))
					.update("find_nm"       , row.getParameter("find_nm"       ))
					.update("row_sts"       , row.getParameter("row_sts"       ))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);

//				data.param
//					.table("idc_server")
//					.where("where server_id  = :server_id  " )
//					.unique("server_id"           , row.fixParameter("host_id"      ))
//					.update("server_cd"           , row.getParameter("host_cd"      ))
//					.update("server_nm"           , row.getParameter("host_nm"      ))
//					.update("center_id"           , row.fixParameter("host_grp"      ))
//					.update("server_os"           , row.fixParameter("host_os"      ))
//					.update("server_gb"           , row.fixParameter("host_gb"      ))
//					.update("external_host"       , row.getParameter("host_ip"      ))
//					.update("internal_host"       , row.getParameter("dhcp_ip"      ))
//
//					.update("srl_no"        , row.getParameter("srl_no"  ))
//					.update("prod_model"    , row.getParameter("prod_model"  ))
//
//					.update("pur_dt"        , row.getParameter("pur_dt"  ))
//					.update("pur_info"      , row.getParameter("pur_info"  ))
//
//					.update("sw_memo"       , row.getParameter("sw_memo"  ))
//
//					.update("usr_id"        , row.getParameter("usr_id"        ))
//					.update("usr_memo"      , row.getParameter("usr_memo"      ))
//					.update("row_sts"       , row.getParameter("row_sts"      ))
//					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//
//				;
//				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
