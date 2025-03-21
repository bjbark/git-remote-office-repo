package com.sky.listener.tasker;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class ItemBonsaTasker extends TaskExecuter{
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	public static String SYC_ITEM_BONSA = "SYC.ITEM_BONSA";
	//public static String AGT_ITEM_BONSA = "AGT.ITEM_BONSA";
	//public static String OLD_ITEM_BONSA = "OLD.ITEM_BONSA";
	
	public ItemBonsaTasker() {
	}
	
	public void run() {
		logger.debug("TaskProcess run : " + this.process);
		if (SYC_ITEM_BONSA.equals(this.process)){
			this.transferSYC(this.process);
		}
	}
	
	/**
	 * SYC_ITEM_BONSA
	 * @param taskCaption
	 */
	private void transferSYC(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id,    a.ddn_id,    a.idx_1,    a.idx_2,  a.idx_3,  a.del_yn 	")			
				//
				.query("      ,   b.hq_id     , b.stor_id as mngt_stor_id   ")
				
				
				.query("      ,   d.item_idcd      , d.item_code        , d.itm_shrt_cd      ,  d.mst_itm_grp               ")
				.query("      ,   d.item_name      , d.item_spec        , d.itm_gb      ,  d.itm_sts              ")
				.query("      ,   d.clss_id     , d.etc_clss_1       , d.etc_clss_2                                ")
				.query("      ,   d.ogin_id    , d.maker_id         , d.brand_id     , d.catalog_no             ")
				.query("      ,   d.cst_pri   , d.epo_pri      , d.web_pri    ")
				.query("      ,   d.unit_idcd      , d.piece_qty      ")
				.query("      ,   d.stk_itm_yn     , d.stk_itm_id      , d.stk_itm_cd        ")

				.query("      ,   d.brcd_1     , d.brcd_2      , d.brcd_3    , d.brcd_4        ")
				.query("      ,   d.brcd_5     , d.brcd_6      , d.brcd_7    , d.brcd_8        ")
				
				
				.query("      ,   d.row_sts                                                        ")
				.query(" from     sync_mst  a                                                       ") 
				.query("          join hq b     on b.hq_id = a.idx_2                         ")  
				.query("          join itm_mst d on d.item_idcd  = a.idx_1                         ") 
				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" and      d.shr_yn = '1'      " )
				.query(" and      rownum  < 100         " )
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					this.disposerSYC(sync, row );
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
	
	public void disposerSYC(DataMessage sync, SqlResultRow syc ){
		try {
			sync.clear();
			sync.param
				.table("itm_mst")
				.where("where item_idcd = :item_idcd " )
				//
				.unique("hq_id"           , syc.fixParameter("hq_id"       ))
				.insert("mngt_stor_id"           , syc.fixParameter("mngt_stor_id"       ))
				.insert("shr_yn"           , "1"                                )
				.update("itm_sts"           , syc.fixParameter("itm_sts"       ))
				.update("item_idcd"            , syc.getParamText("item_idcd"        ))
				.update("item_code"            , syc.fixParameter("item_code"        ))
				.update("item_name"            , syc.getParamText("item_name"        ))
				.update("item_spec"            , syc.getParamText("item_spec"        ))
				.update("itm_gb"            , syc.getParameter("itm_gb"        ))
				.update("mst_itm_grp"            , syc.getParameter("mst_itm_grp"        ))
				.update("itm_shrt_cd"            , syc.getParamText("itm_shrt_cd"        ))

				.update("unit_idcd"            , syc.getParamText("unit_idcd"        ))
				.update("piece_qty"           , syc.getParameter("piece_qty"       ))

				.update("stk_itm_yn"           , syc.getParamText("stk_itm_yn"       ))
				.update("stk_itm_id"           , syc.getParamText("stk_itm_id"       ))
				.update("stk_itm_cd"           , syc.getParamText("stk_itm_cd"       ))
				
				
				.update("cst_pri"         , syc.getParameter("cst_pri"     ))
				.update("epo_pri"          , syc.getParameter("epo_pri"      ))
				.update("web_pri"          , syc.getParameter("web_pri"      ))
				
				
				.update("clss_id"           , syc.getParamText("clss_id"       ))
				.update("etc_clss_1"           , syc.getParamText("etc_clss_1"       ))
				.update("etc_clss_2"           , syc.getParamText("etc_clss_2"       ))
				.update("ogin_id"          , syc.getParamText("ogin_id"      ))
				.update("maker_id"             , syc.getParamText("maker_id"         ))
				.update("brand_id"           , syc.getParamText("brand_id"       ))
				.update("catalog_no"         , syc.getParamText("catalog_no"     ))

				.update("brcd_1"           , syc.getParamText("brcd_1"     ))
				.update("brcd_2"           , syc.getParamText("brcd_2"     ))
				.update("brcd_3"           , syc.getParamText("brcd_3"     ))
				.update("brcd_4"           , syc.getParamText("brcd_4"     ))
				.update("brcd_5"           , syc.getParamText("brcd_5"     ))
				.update("brcd_6"           , syc.getParamText("brcd_6"     ))
				.update("brcd_7"           , syc.getParamText("brcd_7"     ))
				.update("brcd_8"           , syc.getParamText("brcd_8"     ))
				
				//.update("shelf_life"         , syc.getParamText("shelf_life"     ))
				//.update("keyword"            , syc.getParamText("keyword"        ))
				//.update("notice"             , syc.getParamText("notice"         ))
				//.update("green_itm_yn"      , syc.getParamText("green_itm_yn"  ))
				//.update("soent_itm_yn"      , syc.getParamText("soent_itm_yn"  ))
					
				.update("row_sts"          ,("1".equals(syc.getParamText("del_use_yn"))) ? '2' : syc.getParameter("row_sts"))
				.update("upt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
				.insert("crt_dttm"          , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
			;sync.attach( Action.modify , syc.fixParamText("ddn_id" ) );
			
			
			
			
//			String[] brcd = {"item_code", "brcd_1", "brcd_2", "brcd_3", "brcd_4", "brcd_5", "brcd_6", "brcd_7", "brcd_8" }; 
//				for(int i = 0; i < brcd.length; i++) {
//				sync.param
//					.table("scan_mst")
//					.where("where scan_id  = :scan_id   " )
//					//
//					.unique("mst_itm_id"         , row.fixParameter("mst_itm_id"       ))
//					.unique("item_idcd"         , row.fixParameter("item_idcd"       ))
//					.unique("scan_id"         , row.getParamText("item_idcd"       ) + Integer.toString(i))
//					.update("scan_cd"         , row.getParameter(brcd[i]      ))
//					.insert("crt_id" 	  , "sync" )
//					.update("upt_id"       , "sync" )
//					.update("upt_dttm"       , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
//					.insert("crt_dttm"       , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')"))
//				;
//				sync.attach("".equals( row.getParamText(brcd[i]).trim()) ? Action.delete : Action.modify , syc.fixParamText("hq_id" ) + ".POS" );
//			}			
			
			
			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3 " )
				//
				.unique("sync_id"          , syc.fixParameter("sync_id"       ))
				.unique("ddn_id"          , syc.fixParameter("ddn_id"       ))
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
					.where("where sync_id = :sync_id and ddn_id = :ddn_id and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3 " )
					//
					.unique("sync_id"          , syc.fixParameter("sync_id"       ))
					.unique("ddn_id"          , syc.fixParameter("ddn_id"       ))
					.unique("idx_1"          , syc.fixParameter("idx_1"       ))
					.unique("idx_2"          , syc.fixParameter("idx_2"       ))
					.unique("idx_3"          , syc.fixParameter("idx_3"       ))
					.update("user_memo"        , e.getMessage().substring(1, 200).trim())
					.update("upt_dttm"        , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))"))
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}
}
