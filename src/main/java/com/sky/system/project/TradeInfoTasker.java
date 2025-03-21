package com.sky.system.project;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.task.TaskExecuter;

public class TradeInfoTasker extends TaskExecuter {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	public static String NET_SYNC_TRADE = "NET.SYNC.TRADE";

	public TradeInfoTasker() {

	}

	public void run() {
		if (NET_SYNC_TRADE.equals(this.process)){
			this.transferNET(this.process);
		}
	}

	private void transferNET(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");

			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id      , a.idx_1      , a.idx_2    , a.idx_3    , a.del_yn   ")
				.query("      ,   d.stor_id     , d.row_sts                                                ")
				.query("      ,   d.trade_id     , d.trade_cd     , d.trade_pwd   , d.trade_sts   , d.trade_cg  ")

				.query("      ,   trim(replace( d.stor_no , '-', '' )) as stor_no  , a.row_sts  ")

				.query(" from     sync_mst  a                            ")
				.query("          join stor s on s.stor_id = a.idx_1  ")
				.query("          join contr c on c.ctrl_id = s.ctrl_id ")
				.query("          join stor_trade d on d.ctrl_id = s.ctrl_id and d.trade_id = a.idx_2 ")

				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);

				read.clear();
				read.param
					.query("  select a.ddn_id             " )
					.query("  from   host_ddn a           " )
					.query("  where  a.site_id = :site_id  " , "NETPAYGATE" )
					.query("  and    row_sts = 0         " )
				;
				SqlResultMap net = read.selectForMap();
				for(SqlResultRow row:map){
					this.disposerNET(sync, net, row );
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
	public void disposerNET(DataMessage sync, SqlResultMap map, SqlResultRow syc ){
		try {
			sync.clear();
			for(SqlResultRow row:map){
				sync.param
					.table("trade")
					.where("where stor_id = :stor_id  " )
					.where("and   trade_id = :trade_id  " )
					//
					.unique("stor_id"           , syc.fixParameter("stor_id"       ))
					.update("stor_no"           , syc.getParamText("stor_no"       ))
					.update("biz_no"             , syc.getParamText("stor_no"       ))
					.unique("trade_id"           , syc.fixParameter("trade_id"       ))
					.update("trade_cd"           , syc.getParamText("trade_cd"       ))
					.update("trade_pwd"           , syc.getParamText("trade_pwd"       ))
					.update("trade_sts"           , syc.getParamText("trade_sts"       ))
					.update("trade_cg"           , syc.getParamText("trade_cg"       ))
					.update("row_sts"          , syc.fixParameter("row_sts"      ))
			        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach( Action.modify , row.fixParamText("ddn_id" )  );
			}

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and idx_1 = :idx_1 " )
				.where("  and idx_2 = :idx_2 and idx_3 = :idx_3 " )
				//
				.unique("sync_id"          , syc.fixParameter("sync_id"        ))
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
					.where("where sync_id = :sync_id and idx_1 = :idx_1 " )
					.where("  and idx_2 = :idx_2 and idx_3 = :idx_3 " )
					//
					.unique("sync_id"          , syc.fixParameter("sync_id"        ))
					.unique("idx_1"          , syc.fixParameter("idx_1"       ))
					.unique("idx_2"          , syc.fixParameter("idx_2"       ))
					.unique("idx_3"          , syc.fixParameter("idx_3"       ))
					.update("usr_memo"        , e.getMessage() )
			        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach(Action.update).execute();

			} catch (Exception e1) {}
		}
	}

}
