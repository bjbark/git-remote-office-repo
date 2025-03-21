package com.sky.system.project.hostddns;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.thirdparty.encrypt.AES;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class HostDdnsTasker extends TaskExecuter {

	private final Logger logger = LoggerFactory.getLogger(HostDdnsTasker.class);

	public static String ASP_NET_HOST_DDNS = "ASP_NET_HOST_DDNS";

	public HostDdnsTasker() {
	}

	public void run() {
		if (ASP_NET_HOST_DDNS.equals(this.process)){
			this.transferASP_NET(this.process);
		}
	}

	/**
	 */
	private void transferASP_NET(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");

			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id       , a.ddns_id      , a.idx_1         , a.idx_2    , a.idx_3  , a.deleted   ")
				.query("      ,   d.ddn_id        as hostddns      , d.ddn_cd        , d.ddn_nm   , d.ddn_gb    ")
				.query("      ,   h.host_ip       as hostname      , h.dhcp_ip       as hostdhcp				")
				.query("      ,   d.provider      , d.protocol     , d.host_conn_port, d.host_path              ")
				.query("      ,   d.host_conn_acct, d.host_conn_pwd, d.pooltime      , d.maxcount				")
				.query("      ,   d.usr_memo    , d.row_sts														")
				.query(" from     sync_mst  a																	")
				.query("          join host_ddns d on d.ddns_id = a.idx_1   ")
				.query("          join host_mst h on h.host_id = d.host_id   ")

				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" order by a.create_dt desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				read.clear();
				read.param
					.query("  select a.ddns_id               ")
					.query("  from   host_ddns a             ")
					.query("  where  a.site_id in (:site_id) ", new String[]{"NETPAYGATE", "NETMIGRATE"}  )
					.query("  and    row_sts = 0           ")
				;
				SqlResultMap net = read.selectForMap();
				for(SqlResultRow row:map){
					this.disposerASP_NET(sync, net, row );
				}
				logger.debug(taskProcess + " end = " + map.size());
			} else {
				logger.debug(taskProcess + " end = nodata ");
			}
		} catch (Exception e) {
			logger.debug(taskProcess + " exception ");
			e.printStackTrace();
		}
	}

	// NET.SYNC.STORE
	public void disposerASP_NET(DataMessage sync, SqlResultMap map, SqlResultRow syc ){
		try {

			JSONObject json = new JSONObject();
			json.put("provider"      , syc.getParamText("provider"       ));
			json.put("protocol"      , syc.getParamText("protocol"       ));
			json.put("hostname"      , syc.getParamText("hostname"       ));
			json.put("hostdhcp"      , syc.getParamText("hostdhcp"       ));
			json.put("host_conn_port", syc.getParamText("host_conn_port" ));
			json.put("host_path"     , syc.getParamText("host_path"      ));
			json.put("host_conn_acct", syc.getParamText("host_conn_acct" ));
			json.put("host_conn_pwd" , syc.getParamText("host_conn_pwd"  ));
			json.put("pooltime"      , syc.getParamText("pooltime"       ));
			json.put("maxcount"      , syc.getParamText("maxcount"       ));

			sync.clear();
			for(SqlResultRow row:map){
				sync.param
					.table("host_ddns")
					.where("where ddns_id = :ddns_id  " )
					//
					.insert("ddns_id"       , syc.fixParamText("ddns_cd"         ))
					.update("ddns_gb"       , syc.fixParamText("ddns_gb"         ))
					.update("linkage"       , AES.random(json.toString() , AES.SCOPE.encode ))
				;sync.attach( Action.modify , row.fixParamText("ddns_id"         ));
			}

			sync.param
				.table("host_ddns")
				.where("where ddns_id = :ddns_id  " )
				//
				.unique("ddns_id"       , syc.fixParameter("hostddns"         ))
				.update("linkage"       , AES.random(json.toString() , AES.SCOPE.encode ))
			;sync.attach(Action.update);

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddns_id = :ddns_id  " )
				.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
				//
				.unique("sync_id"        , syc.fixParameter("sync_id"     ))
				.unique("ddns_id"        , syc.fixParameter("ddns_id"     ))
				.unique("idx_1"          , syc.fixParameter("idx_1"       ))
				.unique("idx_2"          , syc.fixParameter("idx_2"       ))
				.unique("idx_3"          , syc.fixParameter("idx_3"       ))
			;sync.attach(Action.delete).execute();

		} catch (Exception e) {
			e.printStackTrace();
			try {
				sync.clear();
				sync.param
					.table("sync_mst")
					.where("where sync_id = :sync_id and ddns_id = :ddns_id  " )
					.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
					//
					.unique("sync_id"       , syc.fixParameter("sync_id"       ))
					.unique("ddns_id"       , syc.fixParameter("ddns_id"       ))
					.unique("idx_1"         , syc.fixParameter("idx_1"       ))
					.unique("idx_2"         , syc.fixParameter("idx_2"       ))
					.unique("idx_3"         , syc.fixParameter("idx_3"       ))
					.update("usr_memo"      , e.getMessage() )
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}


	/**
	 * SYC_ITEM_HOSTS
	 * @param taskCaption
	 */
	private void transferASP_AGT(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");

			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id      , a.ddns_id       , a.idx_1         , a.idx_2   , a.idx_3    , a.deleted	")
				.query("      ,   d.ddns_id as hostddns            , d.ddns_cd       , d.ddns_nm   , d.ddns_gb				")
				.query("      ,   h.host_ip as hostname            , h.dhcp_ip       as hostdhcp							")
				.query("      ,   d.provider      , d.protocol     , d.host_conn_port, d.host_path							")
				.query("      ,   d.host_conn_acct, d.host_conn_pwd, d.pooltime      , d.maxcount							")

				.query("      ,   d.usr_memo      , d.row_sts                ")
				.query(" from     sync_mst  a                                ")
				.query("          join host_ddns d on d.ddns_id = a.idx_1    ")
				.query("          join host_mst h on h.host_id = d.host_id   ")

				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" order by a.create_dt desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					this.disposerASP_AGT(sync, row );
				}
				logger.debug(taskProcess + " end = " + map.size());
			} else {
				logger.debug(taskProcess + " end = nodata ");
			}
		} catch (Exception e) {
			logger.debug(taskProcess + " exception ");
			e.printStackTrace();
		}
	}

	// NET.SYNC.STORE
	public void disposerASP_AGT(DataMessage sync, SqlResultRow syc ){
		try {
			JSONObject json = new JSONObject();
			json.put("provider"      , syc.getParamText("provider"       ));
			json.put("protocol"      , syc.getParamText("protocol"       ));
			json.put("hostname"      , syc.getParamText("hostname"       ));
			json.put("hostdhcp"      , syc.getParamText("hostdhcp"       ));
			json.put("host_conn_port", syc.getParamText("host_conn_port"       ));
			json.put("host_path"     , syc.getParamText("host_path"       ));
			json.put("host_conn_acct", syc.getParamText("host_conn_acct"       ));
			json.put("host_conn_pwd" , syc.getParamText("host_conn_pwd"       ));
			json.put("pooltime"      , syc.getParamText("pooltime"       ));
			json.put("maxcount"      , syc.getParamText("maxcount"       ));
			sync.clear();

			sync.param
				.table("host_ddns")
				.where("where ddns_id = :ddns_id  " )
				//
				.insert("ddns_id"       , syc.fixParamText("ddns_cd"         ))
				.update("ddns_gb"       , syc.fixParamText("ddns_gb"         ))
				.update("linkage"       , AES.random(json.toString() , AES.SCOPE.encode ))
			;sync.attach( Action.modify , syc.fixParamText("ddns_id"         ));

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddns_id = :ddns_id  " )
				.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
				//
				.unique("sync_id"        , syc.fixParameter("sync_id"        ))
				.unique("ddns_id"        , syc.fixParameter("ddns_id"       ))
				.unique("idx_1"          , syc.fixParameter("idx_1"       ))
				.unique("idx_2"          , syc.fixParameter("idx_2"       ))
				.unique("idx_3"          , syc.fixParameter("idx_3"       ))
			;sync.attach(Action.delete).execute();

		} catch (Exception e) {
			e.printStackTrace();
			try {
				sync.clear();
				sync.param
					.table("sync_mst")
					.where("where sync_id = :sync_id and ddns_id = :ddns_id  " )
					.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
					//
					.unique("sync_id"       , syc.fixParameter("sync_id"       ))
					.unique("ddns_id"       , syc.fixParameter("ddns_id"       ))
					.unique("idx_1"         , syc.fixParameter("idx_1"       ))
					.unique("idx_2"         , syc.fixParameter("idx_2"       ))
					.unique("idx_3"         , syc.fixParameter("idx_3"       ))
					.update("usr_memo"      , e.getMessage() )
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}


}
