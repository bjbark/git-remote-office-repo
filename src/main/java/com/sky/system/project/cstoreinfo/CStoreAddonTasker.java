package com.sky.system.project.cstoreinfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.task.TaskExecuter;

public class CStoreAddonTasker extends TaskExecuter {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	public static String ASP_POS_STORE_ADDON = "ASP_POS_STORE_ADDON";

	public CStoreAddonTasker() {
	}

	public void run() {
		if (ASP_POS_STORE_ADDON.equals(this.process)){
			this.transfeASP_POS_STORE_ADDON();
		}
	}

	private void transfeASP_POS_STORE_ADDON() {
		try {
			logger.debug(this.process + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select a.sync_id   , a.ddn_id    , a.idx_1     , a.idx_2   , a.idx_3   , a.del_yn  ")
				.query("      , d.stor_id   , d.addon_id , d.provider                                      ")
				.query("      , d.api_http  , d.api_host  , d.api_port  , d.api_usr , d.api_pwd , d.key_code")
				.query("      , d.usr_memo  , d.row_sts     												")
				.query(" from   sync_mst  a                    												")
				.query("        join stor_addon d on d.stor_id = a.idx_1 and d.addon_id = a.idx_2 and d.provider = a.idx_3  ")
				.query(" where  a.sync_id  = :sync_id " , this.process  )
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					//  효성 스마일 EDI 인경우
					if ("TAX".equals( row.getParamText("addon_id")) && "1".equals(row.getParamText("provider"))){
						// 오라클 서버에 내릴경우, 별도의 값이 없다면... 리얼 경로를 지정해 준다.
						if ("".equals(row.getParamText("api_http").trim())) {
							row.setParameter("api_http", "http://www.smileedi.com" );
						}
					}
					this.disposerASP_POS_STORE_ADDON(sync, row);
				}
				logger.debug(this.process + " end = " + map.size() );
			} else {
				logger.debug(this.process + " end = nodata ");
			}
		} catch (Exception e) {
			logger.debug(this.process + " exception");
			e.printStackTrace();
		}
	}

	// WEB.SYNC.STORE
	public void disposerASP_POS_STORE_ADDON(DataMessage sync, SqlResultRow syc ){
		try {
			sync.clear();
			sync.param
				.table("stor_addon")
				.where("where stor_id = :stor_id  " )
				.where("and   addon_id = :addon_id  " )
				//
				.unique("stor_id"       , syc.fixParameter("stor_id"     ))
				.update("addon_id"     , syc.getParamText("addon_id"     ))
				.update("provider"      , syc.getParamText("provider"     ))

				.update("api_http"      , syc.getParamText("api_http"     ))
				.update("api_host"      , syc.getParamText("api_host"     ))
				.update("api_port"      , syc.getParamText("api_port"     ))

				.update("key_code"      , syc.getParamText("key_code"     ))
				.update("api_usr"       , syc.getParamText("api_usr"     ))
				.update("api_pwd"       , syc.getParamText("api_pwd"     ))

				.update("row_sts"		, syc.getParamText("row_sts"    ))

			;sync.attach( Action.modify , syc.fixParamText("ddn_id" ));

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id " )
				.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3 " )
				//
				.unique("sync_id"        , syc.fixParameter("sync_id"          ))
				.unique("ddn_id"         , syc.fixParameter("ddn_id"          ))
				.unique("idx_1"          , syc.fixParameter("idx_1"          ))
				.unique("idx_2"          , syc.fixParameter("idx_2"          ))
				.unique("idx_3"          , syc.fixParameter("idx_3"          ))
			;sync.attach(Action.delete).execute();

		} catch (Exception e) {
			e.printStackTrace();
			try {
				sync.clear();
				sync.param
					.table("sync_mst")
					.where("where sync_id = :sync_id and ddn_id = :ddn_id " )
					.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3 " )
					//
					.unique("sync_id"          	, syc.fixParameter("sync_id"       ))
					.unique("ddn_id"          	, syc.fixParameter("ddn_id"       ))
					.unique("idx_1"          	, syc.fixParameter("idx_1"       ))
					.unique("idx_2"          	, syc.fixParameter("idx_2"       ))
					.unique("idx_3"          	, syc.fixParameter("idx_3"       ))
					.update("usr_memo"        	, e.getMessage() )
					.update("upt_dttm"          , new SqlParamText("convert(varchar(8),getdate(),112) + replace(convert(varchar(18),getdate(),108),':','')") )  /*ms sql  */
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}


}
