package com.sky.system.item;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
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
				.query("      ,   b.hq_id     , b.stor_id as owner_id   ")
				
				
				.query("      ,   d.item_idcd      , d.item_code        , d.item_sc      ,  d.item_gp               ")
				.query("      ,   d.item_name      , d.item_spec        , d.item_gb      ,  d.item_sts              ")
				.query("      ,   d.class_id     , d.etc01_id       , d.etc02_id                                ")
				.query("      ,   d.origin_id    , d.mfg_id         , d.brand_id     , d.catalog_no             ")
				.query("      ,   d.cst_pri   , d.epo_pri      , d.web_price    ")
				.query("      ,   d.unit_idcd      , d.unt_qty      ")
				.query("      ,   d.stk_itm_yn     , d.stk_itm_id      , d.stk_itm_cd        ")

				.query("      ,   d.brcd_1     , d.brcd_2      , d.barcode3    , d.barcode4        ")
				.query("      ,   d.barcode5     , d.barcode6      , d.barcode7    , d.barcode8        ")
				
				
				.query("      ,   d.row_sts                                                        ")
				.query(" from     sync_mst  a                                                       ") 
				.query("          join bonsa b     on b.hq_id = a.idx_2                         ")  
				.query("          join itm_mst d on d.item_idcd  = a.idx_1                         ") 
				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" and      d.share_yn = '1'      " )
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
				.insert("owner_id"           , syc.fixParameter("owner_id"       ))
				.insert("share_yn"           , "1"                                )
				.update("item_sts"           , syc.fixParameter("item_sts"       ))
				.update("item_idcd"            , syc.getParamText("item_idcd"        ))
				.update("item_code"            , syc.fixParameter("item_code"        ))
				.update("item_name"            , syc.getParamText("item_name"        ))
				.update("item_spec"            , syc.getParamText("item_spec"        ))
				.update("item_gb"            , syc.getParameter("item_gb"        ))
				.update("item_gp"            , syc.getParameter("item_gp"        ))
				.update("item_sc"            , syc.getParamText("item_sc"        ))

				.update("unit_idcd"            , syc.getParamText("unit_idcd"        ))
				.update("unt_qty"           , syc.getParameter("unt_qty"       ))

				.update("stk_itm_yn"           , syc.getParamText("stk_itm_yn"       ))
				.update("stk_itm_id"           , syc.getParamText("stk_itm_id"       ))
				.update("stk_itm_cd"           , syc.getParamText("stk_itm_cd"       ))
				
				
				.update("cst_pri"         , syc.getParameter("cst_pri"     ))
				.update("epo_pri"          , syc.getParameter("epo_pri"      ))
				.update("web_price"          , syc.getParameter("web_price"      ))
				
				
				.update("class_id"           , syc.getParamText("class_id"       ))
				.update("etc01_id"           , syc.getParamText("etc01_id"       ))
				.update("etc02_id"           , syc.getParamText("etc02_id"       ))
				.update("origin_id"          , syc.getParamText("origin_id"      ))
				.update("mfg_id"             , syc.getParamText("mfg_id"         ))
				.update("brand_id"           , syc.getParamText("brand_id"       ))
				.update("catalog_no"         , syc.getParamText("catalog_no"     ))

				.update("brcd_1"           , syc.getParamText("brcd_1"     ))
				.update("brcd_2"           , syc.getParamText("brcd_2"     ))
				.update("barcode3"           , syc.getParamText("barcode3"     ))
				.update("barcode4"           , syc.getParamText("barcode4"     ))
				.update("barcode5"           , syc.getParamText("barcode5"     ))
				.update("barcode6"           , syc.getParamText("barcode6"     ))
				.update("barcode7"           , syc.getParamText("barcode7"     ))
				.update("barcode8"           , syc.getParamText("barcode8"     ))
				
				//.update("shelf_life"         , syc.getParamText("shelf_life"     ))
				//.update("keyword"            , syc.getParamText("keyword"        ))
				//.update("notice"             , syc.getParamText("notice"         ))
				//.update("green_item_yn"      , syc.getParamText("green_item_yn"  ))
				//.update("soent_item_yn"      , syc.getParamText("soent_item_yn"  ))
					
				.update("row_sts"          ,("1".equals(syc.getParamText("del_use_yn"))) ? '2' : syc.getParameter("row_sts"))
				.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
				.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
			;sync.attach( Action.modify , syc.fixParamText("ddn_id" ) );
			
			
			
			
//			String[] barcode = {"item_code", "brcd_1", "brcd_2", "barcode3", "barcode4", "barcode5", "barcode6", "barcode7", "barcode8" }; 
//				for(int i = 0; i < barcode.length; i++) {
//				sync.param
//					.table("scan_mst")
//					.where("where scan_id  = :scan_id   " )
//					//
//					.unique("mst_itm_id"         , row.fixParameter("mst_itm_id"       ))
//					.unique("item_idcd"         , row.fixParameter("item_idcd"       ))
//					.unique("scan_id"         , row.getParamText("item_idcd"       ) + Integer.toString(i))
//					.update("scan_cd"         , row.getParameter(barcode[i]      ))
//					.insert("crt_id" 	  , "sync" )
//					.update("upt_id"       , "sync" )
//					.update("upt_dttm"       , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//					.insert("crt_dttm"       , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//				;
//				sync.attach("".equals( row.getParamText(barcode[i]).trim()) ? Action.delete : Action.modify , syc.fixParamText("hq_id" ) + ".POS" );
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
