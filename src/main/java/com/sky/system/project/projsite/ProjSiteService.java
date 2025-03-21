package com.sky.system.project.projsite;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.listener.SeqListenerService;

@Service
public class ProjSiteService extends DefaultServiceHandler{

	@Autowired
	private SeqListenerService seq;
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String index = arg.getParamText("search_id").trim();
		String value = arg.getParamText("find_nm").trim();

		String[] hq_sts = arg.getParamCast("hq_sts", String[].class);

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		data.param // 집계문 입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문 입력
			.query(" select a.hq_id       , a.hq_grp      , a.hq_gb        , a.hq_nm        , a.stor_id	")
			.query("      , a.hq_reg_dt   , a.hq_sts      , b.ctrl_id      , c.ctrl_nm      , a.corp_id	")
			.query("      , a.pjt_id      , h.pjt_nm													")
			.query("      , a.itm_typl_nm , a.itm_find_nm , a.clnt_find_nm , a.vndr_find_nm , a.epo_ddns")

			.query("      , p.host_id        as pos_host												")
			.query("      , (select host_cd from host_mst where host_id = p.host_id ) as pos_hostname	")
			.query("      , p.provider       as pos_provider											")
			.query("      , p.host_conn_port as pos_hostport											")
			.query("      , p.host_path      as pos_hostpath											")
			.query("      , p.host_conn_acct as pos_hostuser											")
			.query("      , p.host_conn_pwd  as pos_hostpswd											")
			.query("      , p.pooltime       as pos_pooltime											")
			.query("      , p.maxcount       as pos_maxcount											")

			.query("      , w.host_id        as web_host												")
			.query("      , (select host_cd from host_mst where host_id = w.host_id ) as web_hostname	")
			.query("      , w.provider       as web_provider											")
			.query("      , w.host_conn_port as web_hostport											")
			.query("      , w.host_path      as web_hostpath											")
			.query("      , w.host_conn_acct as web_hostuser											")
			.query("      , w.host_conn_pwd  as web_hostpswd											")
			.query("      , w.pooltime       as web_pooltime											")
			.query("      , w.maxcount       as web_maxcount											")

			.query("      , i.host_id        as img_host												")
			.query("      , (select host_cd from host_mst where host_id = i.host_id ) as img_hostname	")
			.query("      , i.provider       as img_provider											")
			.query("      , i.protocol       as img_protocol											")
			.query("      , i.host_conn_port as img_hostport											")
			.query("      , i.host_path      as img_hostpath											")
			.query("      , i.host_conn_acct as img_hostuser											")
			.query("      , i.host_conn_pwd  as img_hostpswd											")
			.query("      , a.img_http     , a.pgm_updat_path											")
			.query("      , a.usr_memo     , a.row_sts ,  a.hq_ver   , a.del_yn , a.srvr_inization_yn	")
		;

		data.param // 조건문 입력
			.where("from   head_office a																")
			.where("       left outer join stor        b on b.stor_id = a.stor_id						")
			.where("       left outer join control_mst c on c.ctrl_id = b.ctrl_id						")
			.where("       left outer join pjt_mst     h on h.pjt_id  = a.pjt_id						")
			.where("       left outer join host_ddn    p on p.ddn_id  = concat( a.hq_id , '.POS')		")
			.where("       left outer join host_ddn    w on w.ddn_id  = concat( a.hq_id , '.WEB')		")
			.where("       left outer join host_ddn    i on i.ddn_id  = concat( a.hq_id , '.IMG')		")

			.where("where  a.hq_ver <> 'G'																")
			.where("and    a.row_sts < 2																")
			.where("and    a.row_sts =  :row_sts     " , arg.getParameter("row_sts"))
			.where("and    a.hq_grp  =  :hq_grp      " , arg.getParameter("hq_grp"))
		    .where("and    a.hq_sts in (:hq_sts )    " , hq_sts ,( hq_sts.length > 0) ) /* 주문 위치 */
			.where("and    a.hq_id like :hq_id%      " , value  , index.equals("1"))
			.where("and    a.hq_nm like %:hq_nm%     " , value  , index.equals("2"))

			.where("and    a.pjt_id     = :pjt_id    " , arg.getParameter("pjt_id"       ))

			.where("and    a.pos_host   = :pos_host  " , arg.getParameter("pos_host"       ) , !"0".equals( arg.getParamText("pos_host"       )))
			.where("and  ( a.pos_host is null or a.pos_host = '' or a.pos_host   = :pos_host )    " , arg.getParameter("pos_host"       ) , "0".equals( arg.getParamText("pos_host"       )))

			.where("and    a.web_host   = :web_host  " , arg.getParameter("web_host"       ))
			.where("and    a.img_host   = :img_host  " , arg.getParameter("img_host"       ))
		;

		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		data.param // 집계문 입력
			.total(" select  count(1) as maxsize						")
		;
		data.param // 쿼리문 입력
			.query("select a.pjt_id   , a.pos_ddns   , a.web_ddns		")
			.query("     , a.hq_id    , a.hq_nm							")
			.query("     , a.hq_sts   , a.hq_ver						")
		;
		data.param // 조건문 입력
			.where("from   head_office a								")
			.where("where  a.hq_ver    <> 'G'							")
			.where("and    a.hq_sts    = :hq_sts " , arg.getParameter("hq_sts" ))
			.where("and    a.hq_ver    = :hq_ver " , arg.getParameter("hq_ver" ))
			.where("and    a.hq_nm like %:hq_nm% " , arg.getParameter("hq_nm"  ))
			.where("and    a.row_sts    = :row_sts " , "0" ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("and    a.row_sts   <= :row_sts " , "1" ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

			} else {
				data.param
					.table("head_office")
					.where("where hq_id  = :hq_id  " )
					//
					.unique("pjt_id"            , row.getParameter("pjt_id"       ))
					.unique("own_stor_id"       , row.getParameter("own_stor_id"  ))
					.unique("corp_id"           , row.fixParameter("hq_id"        ))
					.unique("hq_grp"            , row.fixParameter("hq_grp"       ))
					.unique("hq_id"             , row.fixParameter("hq_id"        ))
					.update("hq_nm"             , row.getParameter("hq_nm"        ))
					.update("hq_gb"             , row.fixParameter("hq_gb"        ))


//					.insert("hq_reg_dt"       , new SqlParamText("to_char( sysdate,'yyyy-mm-dd' )"))
//					.insert("hq_reg_dt"       , new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					.insert("hq_reg_dt"         , new SqlParamText("date_format(now(),'%Y%m%d') "))

					.insert("hq_reg_year"       , new SimpleDateFormat("yyyy").format(new Date()) )
					.insert("hq_reg_mn"         , new SimpleDateFormat("MM").format(new Date()) )

					.update("pos_host"          , row.getParameter("pos_host"        ))
					.update("pos_ddns"          , "".equals( row.getParamText("pos_host" )) || "0".equals( row.getParamText("pos_host" )) ? "" : row.fixParamText("hq_id" ) + ".POS" )
					.update("web_host"          , row.getParameter("web_host"        ))
					.update("web_ddns"          , "".equals( row.getParamText("web_host" )) || "0".equals( row.getParamText("web_host" )) ? "" : row.fixParamText("hq_id" ) + ".WEB" )
					.update("img_host"          , row.getParameter("img_host"        ))
					.update("img_ddns"          , "".equals( row.getParamText("img_host" )) || "0".equals( row.getParamText("img_host" )) ? "" : row.fixParamText("hq_id" ) + ".IMG" )
					.update("img_http"          , row.getParameter("img_http"        ))
					.update("pgm_updat_path"    , row.getParameter("pgm_updat_path"        ))
					.update("ftp_host"          , row.getParameter("ftp_host"        ))
					.update("ftp_ddns"          , "".equals( row.getParamText("ftp_host" )) ? "" : row.fixParamText("hq_id" ) + ".FTP" )

					.update("epo_ddns"          , row.getParamText("epo_ddns"     ))

					.update("hq_sts"            , row.getParameter("hq_sts"       ))
					.update("hq_ver"            , row.getParameter("hq_ver"       ))
					.update("stor_id"           , row.getParameter("stor_id"      ))
					.update("pgm_solution"      , row.getParameter("pjt_id"       ))

					.update("itm_typl_nm"       , row.getParameter("itm_typl_nm"  ))
					.update("itm_find_nm"       , row.getParameter("itm_find_nm"  ))
					.update("clnt_find_nm"      , row.getParameter("clnt_find_nm" ))
					.update("vndr_find_nm"      , row.getParameter("vndr_find_nm" ))


					.update("del_yn"            , row.getParameter("del_yn"     ))
					.update("srvr_inization_yn" , "0" , "1".equals(row.fixParamText("reinitial" )))
					.update("usr_memo"          , row.getParameter("usr_memo"   ))
					.update("row_sts"           , row.getParameter("row_sts"    ))

					.update("upt_ui" 	 	    , row.getParameter("upt_ui"		))
					.insert("crt_ui" 	 	    , row.getParameter("crt_ui"		))
					.update("upt_id" 	 	    , row.getParameter("upt_id"		))
					.insert("crt_id" 	 	    , row.getParameter("crt_id"		))
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

				;data.attach(rowaction);


				if (rowaction == Action.insert) {
					data.param
						.table("stor")
						.where("where stor_id  = :stor_id  " )
						//
						.unique("hq_id"				, row.fixParameter("hq_id"         ))
						.unique("stor_grp"			, row.fixParameter("stor_grp"       ))
						.unique("stor_id"			, row.fixParameter("stor_id"       ))
						.unique("stor_nm"			, row.getParameter("hq_nm"         ))

						.unique("ctrl_id"			, row.fixParameter("ctrl_id"       ))
						.unique("login_pwd"			, UUID.randomUUID().toString().replace("-", "").substring(0,12))
						.unique("stor_gb"			, "1" )


						.update("upt_ui" 			, row.getParameter("upt_ui"		))
						.insert("crt_ui"			, row.getParameter("crt_ui"		))
						.update("upt_id"			, row.getParameter("upt_id"		))
						.insert("crt_id"			, row.getParameter("crt_id"		))
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(rowaction);

					data.param
						.table("control_mst")
						.where("where ctrl_id  = :ctrl_id  " )
						//
						.unique("stor_id"			, row.fixParameter("stor_id"    ))
						.unique("ctrl_id"			, row.fixParameter("ctrl_id"    ))
						.unique("ctrl_nm"			, row.getParameter("hq_nm"      ))
						.unique("ctrl_sts"			, "1000")
						.unique("rqust_sts"			, "1000")

						.insert("rqust_dt"			, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
						.update("upt_ui"			, row.getParameter("upt_ui"		))
						.insert("crt_ui"			, row.getParameter("crt_ui"		))
						.update("upt_id"			, row.getParameter("upt_id"		))
						.insert("crt_id"			, row.getParameter("crt_id"		))
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(rowaction);

				}

				if (!"".equals(row.getParamText("pos_host")) ) {
					data.param
						.table("host_ddn")
						.where("where ddn_id  = :ddn_id  " )
						//
						.update("site_yn"			, "1" )
						.update("host_id"			, row.getParameter("pos_host"     ))
						.unique("ddn_id"			, row.getParamText("hq_id"        ) + ".POS" )
						.unique("ddn_cd"			, row.getParamText("hq_id"        ) + ".POS" )
						.unique("ddn_nm"			, row.getParameter("hq_nm"        ))
						.unique("ddn_gb"			, "POS" )
						.update("provider"			, row.getParameter("pos_provider" ))
						.update("host_conn_port"	, row.getParameter("pos_hostport" ))
						.update("host_path"			, row.getParameter("pos_hostpath" ))
						.update("host_conn_acct"	, row.getParameter("pos_hostuser" ))
						.update("host_conn_pwd"		, row.getParameter("pos_hostpswd" ))
						.update("pooltime"			, row.getParameter("pos_pooltime" ))
						.update("maxcount"			, row.getParameter("pos_maxcount" ))
						.update("row_sts"			, !"0".equals(row.getParamText("pos_host")) ? 0 : 2 )
						.update("upt_ui"			, row.getParameter("upt_ui"       ))
						.insert("crt_ui"			, row.getParameter("crt_ui"       ))
						.update("upt_id"			, row.getParameter("upt_id"       ))
						.insert("crt_id"			, row.getParameter("crt_id"       ))
						.update("upt_ip"			, arg.remoteAddress  )
						.insert("crt_ip"			, arg.remoteAddress  )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.modify);


					data.param
						.table("idc_system")
						.where("where host_id  = :host_id  " )
						//
						.unique("host_id"           , row.getParamText("hq_id"        ))
						.unique("host_cd"           , row.getParamText("hq_id"        ) + ".POS" )
						.unique("host_owner"        , row.getParameter("hq_id"        ))
						.unique("sys_gb"            , "POS" )
						.update("srvr_id"           , row.getParameter("pos_host"     ))
						.update("provider"          , row.getParameter("pos_provider" ))
						.update("host_conn_port"    , row.getParameter("pos_hostport" ))
						.update("db_nm"             , row.getParameter("pos_hostpath" ))
						.update("host_conn_acct"    , row.getParameter("pos_hostuser" ))
						.update("host_conn_pwd"     , row.getParameter("pos_hostpswd" ))
						.update("pooltime"          , row.getParameter("pos_pooltime" ))
						.update("maxcount"          , row.getParameter("pos_maxcount" ))

						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.modify);


				} else {
				}

				if (!"".equals(row.getParamText("web_host")) ) {
					data.param
						.table("host_ddn")
						.where("where ddn_id  = :ddn_id  " )
						//
						.update("site_yn"            , "1" )
						.update("host_id"            , row.getParameter("web_host"     ))
						.unique("ddn_id"             , row.getParamText("hq_id"        ) + ".WEB" )
						.unique("ddn_cd"             , row.getParamText("hq_id"        ) + ".WEB" )
						.unique("ddn_gb"             , "WEB" )

						.update("provider"           , row.getParameter("web_provider" ))
						.update("host_conn_port"     , row.getParameter("web_hostport" ))
						.update("host_path"          , row.getParameter("web_hostpath" ))
						.update("host_conn_acct"     , row.getParameter("web_hostuser" ))
						.update("host_conn_pwd"      , row.getParameter("web_hostpswd" ))
						.update("pooltime"           , row.getParameter("web_pooltime" ))
						.update("maxcount"           , row.getParameter("web_maxcount" ))

						.update("upt_ui"             , row.getParameter("upt_ui"       ))
						.insert("crt_ui"             , row.getParameter("crt_ui"       ))
						.update("upt_id"             , row.getParameter("upt_id"       ))
						.insert("crt_id"             , row.getParameter("crt_id"       ))
						.update("upt_ip"             , arg.remoteAddress  )
						.insert("crt_ip"             , arg.remoteAddress  )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.modify);

					data.param
						.table("idc_system")
						.where("where host_id  = :host_id  " )
						//
						.unique("host_id"           , row.getParamText("hq_id"        ) + ".WEB" )
						.unique("host_cd"           , row.getParamText("hq_id"        ) + ".WEB" )
						.unique("host_owner"        , row.getParameter("hq_id"        ))
						.unique("sys_gb"            , "WEB" )
						.update("srvr_id"           , row.getParameter("web_host"     ))
						.update("provider"          , row.getParameter("web_provider" ))
						.update("host_conn_port"    , row.getParameter("web_hostport" ))
						.update("db_nm"             , row.getParameter("web_hostpath" ))
						.update("host_conn_acct"    , row.getParameter("web_hostuser" ))
						.update("host_conn_pwd"     , row.getParameter("web_hostpswd" ))
						.update("pooltime"          , row.getParameter("web_pooltime" ))
						.update("maxcount"          , row.getParameter("web_maxcount" ))

				        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.modify);
				}

				if (!"".equals(row.getParamText("img_host")) ) {
					data.param
						.table("host_ddn")
						.where("where ddn_id  = :ddn_id  " )
						//
						.update("site_yn"            , "1" )
						.update("host_id"            , row.getParameter("img_host"     ))
						.unique("ddn_id"             , row.getParamText("hq_id"        ) + ".IMG" )
						.unique("ddn_cd"             , row.getParamText("hq_id"        ) + ".IMG" )
						.unique("ddn_gb"             , "IMG" )

						.update("provider"           , row.getParameter("img_provider" ))
						.update("protocol"           , row.getParameter("img_protocol" ))

						.update("host_conn_port"     , row.getParameter("img_hostport" ))
						.update("host_path"          , row.getParameter("img_hostpath" ))
						.update("host_conn_acct"     , row.getParameter("img_hostuser" ))
						.update("host_conn_pwd"      , row.getParameter("img_hostpswd" ))

						.update("upt_ui"             , row.getParameter("upt_ui"       ))
						.insert("crt_ui"             , row.getParameter("crt_ui"       ))
						.update("upt_id"             , row.getParameter("upt_id"       ))
						.insert("crt_id"             , row.getParameter("crt_id"       ))
						.update("upt_ip"             , arg.remoteAddress  )
						.insert("crt_ip"             , arg.remoteAddress  )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.modify);

				}
			}

		}
		data.execute();
		return null ;
	}
}

