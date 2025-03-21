package com.sky.system.project.bonsainfo;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.task.TaskExecuter;

public class BonsaInfoTasker extends TaskExecuter {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	public static String ASP_NET_SYNC_BONSA = "NET.SYNC.BONSA";
	public static String ASP_POS_SYNC_BONSA = "ASP_POS_SYNC_BONSA";
	public static String WEB_SYNC_BONSA = "WEB.SYNC.BONSA";

	public BonsaInfoTasker() {
	}

	public void run() {
		if (ASP_NET_SYNC_BONSA.equals(this.process)){
			this.transferASP_NET_SYNC_BONSA(this.process);
		} else
		if (ASP_POS_SYNC_BONSA.equals(this.process)){
			this.transferASP_POS_SYNC_BONSA(this.process);
		} else
		if (WEB_SYNC_BONSA.equals(this.process)){
			this.transferWEB(this.process);
		}
	}

	/**
	 * SYC_ITEM_BONSA
	 * @param taskCaption
	 */
	private void transferASP_NET_SYNC_BONSA(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");

			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id      , a.ddn_id      , a.idx_1    , a.idx_2     , a.idx_3    , a.del_yn   ")
				.query("      ,   d.hq_grp     , d.hq_id     , d.hq_nm   , d.hq_sts   , d.hq_ver  ")
				.query("      ,   d.pos_ddns     , d.epo_ddns     , d.web_ddns   , d.img_http   , d.yum_http     ")

				.query("      ,   d.solution     , d.dbschema            ")
				.query("      ,   d.usr_memo    , d.row_sts           ")
				.query(" from     sync_mst  a                           ")
				.query("          join head_office d on d.hq_id = a.idx_1 ")
				.query(" where    a.sync_id  = :sync_id " , taskProcess   )
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
					this.disposerASP_NET_SYNC_BONSA(sync, net, row );
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

	public void disposerASP_NET_SYNC_BONSA(DataMessage sync, SqlResultMap map, SqlResultRow syc ){
		try {
			sync.clear();
			for(SqlResultRow row:map){
				sync.param
					.table("head_office")
					.where("where hq_id = :hq_id  " )
					//
					.update("hq_grp"           , syc.fixParamText("hq_grp"       ))
					.insert("hq_id"           , syc.fixParamText("hq_id"       ))
					.update("hq_nm"           , syc.getParamText("hq_nm"       ))
					.update("hq_sts"          , syc.getParamText("hq_sts"      ))
					.update("hq_ver"          , syc.getParamText("hq_ver"      ))
					.update("pos_ddns"           , syc.getParamText("pos_ddns"       ))

					.update("web_ddns"           , syc.getParamText("web_ddns"       ))
					.update("img_http"           , syc.getParamText("img_http"       ))
					.update("yum_http"           , syc.getParamText("yum_http"       ))

					.update("solution"           , syc.getParamText("solution"       ))
					.update("dbschema"           , syc.getParamText("dbschema"       ))

					.update("row_sts"           , syc.fixParameter("row_sts"      ))
			        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach( Action.modify , row.fixParamText("ddn_id" )  );
			}

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
				.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
				//
				.unique("sync_id"          , syc.fixParameter("sync_id"        ))
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
					.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
					.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
					//
					.unique("sync_id"          , syc.fixParameter("sync_id"       ))
					.unique("ddn_id"          , syc.fixParameter("ddn_id"       ))
					.unique("idx_1"          , syc.fixParameter("idx_1"       ))
					.unique("idx_2"          , syc.fixParameter("idx_2"       ))
					.unique("idx_3"          , syc.fixParameter("idx_3"       ))
					.update("usr_memo"        , e.getMessage() )
			        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}


	/**
	 * SYC_ITEM_BONSA
	 * @param taskCaption
	 */
	private void transferASP_POS_SYNC_BONSA(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id       , a.ddn_id       , a.idx_1       , a.idx_2       , a.idx_3   , a.del_yn  ")
				.query("      ,   d.pjt_id       , d.pos_ddns      , d.epo_ddns      , d.web_ddns      , d.img_ddns   , d.img_http               ")

				.query("      ,   d.owner_id      , d.hq_grp      , d.hq_id      , d.hq_nm      ")
				.query("	  ,   d.corp_id      , d.stor_id      , d.hq_sts     , d.row_sts     ")
				.query("	  ,   d.converted     , d.srvr_inization_yn     , d.hq_gb                        ")
				.query("	  ,   d.regex_item_ds , d.regex_item_sn , d.regex_cust_sn , d.regex_vend_sn ")

				.query("      ,   d.hq_pos_id      , d.hq_sms_id	")

				.query("	  ,   d.sms_cmpn_id , d.hq_sms_cd   ")
				.query("	  ,   d.hq_fax_id , d.hq_fax_cd   ")

				.query("	  ,   case when d.epo_db_id is null or trim(d.epo_db_id) = '' then d.hq_id else d.epo_db_id end as epo_db_id ")
				.query("	  ,   case when d.hq_nts_id is null or trim(d.hq_nts_id) = '' then 'NETHOSTING.TAX' else d.hq_nts_id end as hq_nts_id ")

				.query("	  ,   d.old_inf_yn   , d.erp_inf_yn  , d.web_inf_yn  ")
				.query("	  ,   d.itm_rcpt_yn                               ")
				.query(" from     sync_mst  a                             ")
				.query("          join head_office d                             ")
				.query("               on    d.hq_id  = a.idx_1      ")
				.query("               and   d.hq_ver = 'N'             ")
				.query("               and   d.del_yn = '0'             ")
				.query(" where    a.sync_id  = :sync_id " , taskProcess  )
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					read.clear();
					read.param
						.query("  select a.hq_grp  , a.hq_id   , a.hq_nm   , a.hq_gb   " )
						.query("       , a.pos_ddns  , a.epo_ddns   , a.web_ddns   , a.img_ddns   , a.img_http ")
						.query("  from   head_office a                   " )
						.query("  where( a.hq_id  = :hq_id   " , row.fixParameter("hq_id" ))
						.query("     or  a.hq_grp  = :hq_grp ) " , row.fixParameter("hq_grp" ))

						.query("  and    a.del_yn = :del_yn  " , "0"     )
						.query("  and    a.hq_ver = :hq_ver  " , "N"     )
					;
					this.disposerASP_POS_SYNC_BONSA(sync, read.selectForMap(), row );

				}
				logger.debug(taskProcess + " end = " + map.size() );
			} else {
				logger.debug(taskProcess + " end = nodata ");
			}
		} catch (Exception e) {
			logger.debug(taskProcess + " exception");
			e.printStackTrace();
		}
	}

	//  기존 솔류션 동기화
	public void disposerASP_POS_SYNC_BONSA(DataMessage sync, SqlResultMap map,  SqlResultRow syc ){
		try {
			sync.clear();
			for(SqlResultRow row:map){
				//  회계 솔류션
				if ("2000025162".equals( syc.getParamText("pjt_id") )){
					sync.param
						.table("head_office")
						.where("where hq_id = :hq_id  " )
						//
						.update("hq_grp"           , syc.fixParameter("hq_grp"        ))
						.unique("hq_id"           , syc.fixParameter("hq_id"        ))
						.update("hq_nm"           , syc.getParamText("hq_nm"        ))
						.update("hq_gb"           , syc.getParameter("hq_gb"        ))
						.update("solution"           , syc.getParameter("pjt_id"         ))
						//
						.update("stor_id"           , syc.getParameter("stor_id"        ))
						.update("hq_sts"          , syc.getParameter("hq_sts"       ))
						.update("pos_ddns"           , syc.getParamText("pos_ddns"        ))
						.update("img_ddns"           , syc.getParamText("img_ddns"        ))
						.update("img_http"           , syc.getParamText("img_http"        ))

						.update("regex_item_ds"      , syc.getParamText("regex_item_ds"   ), !"".equals(syc.getParamText("regex_item_ds" )) && "14821".equals(syc.getParamText("pjt_id" )) )
						.update("regex_item_sn"      , syc.getParamText("regex_item_sn"   ), !"".equals(syc.getParamText("regex_item_sn" )) && "14821".equals(syc.getParamText("pjt_id" )) )
						.update("regex_cust_sn"      , syc.getParamText("regex_cust_sn"   ), !"".equals(syc.getParamText("regex_cust_sn" )) && "14821".equals(syc.getParamText("pjt_id" )) )
						.update("regex_vend_sn"      , syc.getParamText("regex_vend_sn"   ), !"".equals(syc.getParamText("regex_vend_sn" )) && "14821".equals(syc.getParamText("pjt_id" )) )

						.update("row_sts"           , syc.getParameter("row_sts"       ))
				        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach( Action.modify , row.fixParamText("pos_ddns" ) );


				} else {
					// 현재 연동되는 본사의 정보를 하위 자식 정보에 업데이트 한다.
					sync.param
						.table("head_office")
						.where("where hq_id = :hq_id  " )
						//
						.update("hq_grp"           , syc.fixParameter("hq_grp"        ))
						.unique("hq_id"           , syc.fixParameter("hq_id"        ))
						.update("hq_nm"           , syc.getParamText("hq_nm"        ))
						.update("hq_gb"           , syc.getParameter("hq_gb"        ))
						.update("solution"           , syc.getParameter("pjt_id"         ))

						.update("stor_id"           , syc.getParameter("stor_id"        ))
						.update("hq_sts"          , syc.getParameter("hq_sts"       ))

						.update("pos_ddns"           , syc.getParamText("pos_ddns"        ))
						.update("epo_ddns"           , "".equals(syc.getParamText("epo_ddns").trim()) ? syc.getParamText("pos_ddns" ) : syc.getParamText("epo_ddns" ))
						.update("web_ddns"           , syc.getParamText("web_ddns"        ))
						.update("img_ddns"           , syc.getParamText("img_ddns"        ))
						.update("img_http"           , syc.getParamText("img_http"        ))

						.update("regex_item_ds"      , syc.getParamText("regex_item_ds"   ), !"".equals(syc.getParamText("regex_item_ds" )) && "14821".equals(syc.getParamText("pjt_id" )) )
						.update("regex_item_sn"      , syc.getParamText("regex_item_sn"   ), !"".equals(syc.getParamText("regex_item_sn" )) && "14821".equals(syc.getParamText("pjt_id" )) )
						.update("regex_cust_sn"      , syc.getParamText("regex_cust_sn"   ), !"".equals(syc.getParamText("regex_cust_sn" )) && "14821".equals(syc.getParamText("pjt_id" )) )
						.update("regex_vend_sn"      , syc.getParamText("regex_vend_sn"   ), !"".equals(syc.getParamText("regex_vend_sn" )) && "14821".equals(syc.getParamText("pjt_id" )) )

						.update("corp_id"           , syc.getParameter("corp_id"        ))
						.update("owner_id"           , syc.getParameter("owner_id"        ))
						.update("row_lvl"          , syc.getParameter("row_lvl"       ))
						.update("converted"          , syc.getParamText("converted"       ))
						.update("sms_cmpn_id"       , syc.getParameter("sms_cmpn_id"    ))
						.update("hq_sms_cd"       , syc.getParameter("hq_sms_cd"    ))
						.update("hq_fax_id"       , syc.getParameter("hq_fax_id"    ))
						.update("hq_fax_cd"       , syc.getParameter("hq_fax_cd"    ))
						.update("epo_db_id"           , syc.getParamText("epo_db_id"        ))
						.update("hq_nts_id"           , syc.getParamText("hq_nts_id"        ))
						.update("hq_pos_id"           , syc.getParamText("hq_pos_id"        ))
						.update("hq_sms_id"           , syc.getParamText("hq_sms_id"        ))
						.update("old_inf_yn"           , syc.getParameter("old_inf_yn"        ))
						.update("erp_inf_yn"           , syc.getParameter("erp_inf_yn"        ))
						.update("web_inf_yn"           , syc.getParameter("web_inf_yn"        ))
						.update("itm_rcpt_yn"           , syc.getParameter("itm_rcpt_yn"        ))

						.update("row_sts"          , syc.getParameter("row_sts"       ))
				        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach( Action.modify , row.fixParamText("pos_ddns" ) );
				}
			}

			if ("0".equals(syc.fixParamText("srvr_inization_yn"))) {
				DataMessage read = new DataMessage(this.storage);

				//  회계 솔류션인 경우
				if ("2000025162".equals( syc.getParamText("pjt_id") )){


				} else {

					/* 회사 정보를 넘긴다. 알파넷인경우만 사용함  */
					read.clear();
					read.param
						.query("  select a.hq_id  , a.corp_id  , a.corp_nm   " )
						.query("       , a.usr_memo , a.row_sts                " )
						.query("  from   company a        " )
						.query("  where  a.hq_id in  " )
						.query("      (  select distinct case when prnt_id = '0' then hq_id else prnt_id end "  )
						.query("         from   head_office   "  )
						.query("         where( hq_id = :hq_id or prnt_id = :hq_id ) " , syc.getParamText("hq_id") )
						.query("       ) " )
					;
					for(SqlResultRow sub:read.selectForMap()){
						sync.param
							.table("company")
							.where("where corp_id       = :corp_id  " )
							//
							.unique("hq_id"             , sub.getParameter("hq_id"        ))
							.unique("corp_id"           , sub.getParameter("corp_id"        ))
							.update("corp_nm"           , sub.getParameter("corp_nm"        ))
							.update("usr_memo"          , sub.getParameter("usr_memo"       ))
							.update("row_sts"           , sub.getParameter("row_sts"       ))
					        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						;sync.attach(Action.modify, syc.getParamText("hq_id") + ".POS" );
					}

					/* 기초 정보를 넘긴다. */
					read.clear();
					read.param
						.query("  select a.bas_id    , a.bas_cd   , a.bas_nm    " )
						.query("	   , a.home_page  , a.img_url , a.linkup_yn , a.link_site  " )
						.query("	   , a.prnt_id  , a.row_lvl , a.row_ord , a.row_sts  " )
						.query("  from   base_mst a               " )
						.query("  where  a.site_id  = 'system'     " )
					;
					for(SqlResultRow sub:read.selectForMap()){
						sync.param
							.table("base_mst")
							.where("where bas_id  = :bas_id  " )
							//
							.unique("hq_id"          , syc.fixParameter("hq_id"        )) // 동기화 하려는 본사 ID
							.unique("stor_grp"          , syc.fixParameter("stor_id"        ))// 동기화 하려는 본사 매장 ID

							.unique("bas_id"           , sub.fixParameter("bas_id"        ))
							.unique("bas_cd"        	, sub.getParameter("bas_cd"        ))
							.insert("bas_nm"           , sub.getParameter("bas_nm"        ))

							.update("home_page"         , sub.getParameter("home_page"      ))
							.update("img_url"           , sub.getParameter("img_url"      ))
							.update("linkup_yn"         , sub.getParameter("linkup_yn"      ))
							.update("link_site"         , sub.getParameter("link_site"      ))

							.update("prnt_id"         , sub.getParameter("prnt_id"      ))
							.update("row_ord"         , sub.getParameter("row_ord"      ))
							.update("row_lvl"         , sub.getParameter("row_lvl"      ))
							.update("row_sts"         , sub.getParameter("row_sts"      ))

					        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        	;sync.attach( Action.modify , syc.getParamText("hq_id") + ".POS" );
					}
					/* 마감 정보를 넘긴다. */
					read.clear();
					read.param
						.query("  select a.clos_id    , a.clos_cd   , a.clos_nm      " )
						.query("	   , a.prnt_id  , a.row_lvl , a.row_ord , a.row_sts  " )
						.query("  from   close_mst a                                             " )
						.query("  where  a.site_id  = 'system'                                   " )
					;
					for(SqlResultRow sub:read.selectForMap()){
						sync.param
							.table("close_mst")
							.where("where clos_id  = :clos_id  " )
							//
							.unique("clos_id"           , sub.fixParameter("clos_id"        ))
							.unique("clos_cd"        	, sub.getParameter("clos_cd"        ))
							.update("clos_nm"           , sub.getParameter("clos_nm"        ))

							.update("prnt_id"         , sub.getParameter("prnt_id"      ))
							.update("row_ord"         , sub.getParameter("row_ord"      ))
							.update("row_lvl"         , sub.getParameter("row_lvl"      ))
							.insert("row_sts"         , sub.getParameter("row_sts"      ))

					        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        	;sync.attach(Action.modify, syc.getParamText("hq_id") + ".POS" );
					}


				   	/* 단위를 등록한다. */
					sync.param
						.table("item_unit")
						.where("where unit_idcd  = :unit_idcd " )
						//
						.unique("hq_id"           , syc.fixParameter("hq_id"        ))
						.unique("stor_grp"           , syc.fixParameter("stor_id"        ))
						.unique("share_yn"           , "1"      )
						.unique("unit_idcd"            , "EA" )
						.unique("unit_cd"            , "EA" )
						.unique("unit_name"            , "EA" )
						.unique("row_sts"          ,  0   )
				        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach(Action.modify, syc.fixParamText("pos_ddns" ));

				   	/* 포스 고객을 등록한다. */
					sync.param
						.table("cust_mst")
						.where("where cust_id  = :cust_id " )
						//
						.unique("hq_id"           , syc.fixParameter("hq_id"        ))
						.unique("owner_id"           , syc.fixParameter("stor_id"        ))
						.unique("cust_gb"            , "2" )
						.unique("cust_id"            , "DEFAULT-POS" )
						.unique("cust_cd"            , "DEFAULT-POS" )
						.unique("cust_nm"            , "미등록" )
						.unique("point_type"         , "0" )
						.unique("price_no"           , "7" )
						.unique("row_sts"          ,  0   )
				        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach(Action.modify, syc.getParamText("hq_id") + ".POS" );

				   	/* 포스 회원을 등록한다. */
					sync.param
						.table("cust_memb")
						.where("where cust_id  = :cust_id " )
						.where("and   mmb_id  = :mmb_id " )
						//
						.unique("hq_id"           , syc.fixParameter("hq_id"        ))
						.unique("cust_id"            , "DEFAULT-POS" )
						.unique("mmb_id"            , "DEFAULT-POS" )
						.unique("mmb_nm"            , "미등록" )
						.unique("row_sts"          ,  0   )
				        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach(Action.modify, syc.getParamText("hq_id") + ".POS" );

				   	/* 미등록 상품을 등록한다. */
					sync.param
						.table("itm_mst")
						.where("where item_idcd  = :item_idcd " )
						//
						.unique("hq_id"           , syc.fixParameter("hq_id"        ))
						.unique("owner_id"           , syc.fixParameter("stor_id"        ))
						.unique("share_yn"           , "1" )
						.unique("unit_idcd"            , "EA" )
						.unique("unt_qty"           ,  1 )
						.unique("stk_itm_id"           , "DEFAULT-POS" )
						.unique("item_idcd"            , "DEFAULT-POS" )
						.unique("item_code"            , "DEFAULT-POS" )
						.unique("stk_itm_yn"           , "0" )
						.unique("item_name"            , "미등록" )
						.unique("row_sts"          ,  0   )
				        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach(Action.modify, syc.getParamText("hq_id") + ".POS" );


					sync.param
						.table("itm_mst")
						.where("where item_idcd  = :item_idcd " )
						//
						.unique("hq_id"           , syc.fixParameter("hq_id"        ))
						.unique("owner_id"           , syc.fixParameter("stor_id"        ))
						.unique("share_yn"           , "1" )
						.unique("unit_idcd"            , "EA" )
						.unique("unt_qty"           ,  1 )
						.unique("stk_itm_id"           , "DELIVERY-FEE" )
						.unique("item_idcd"            , "DELIVERY-FEE" )
						.unique("item_code"            , "DELIVERY-FEE" )
						.unique("stk_itm_yn"           , "0" )
						.unique("item_name"            , "배송비" )
						.unique("row_sts"          ,  0   )
				        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach(Action.modify, syc.getParamText("hq_id") + ".POS" );
				}
				/* 동기화 하는 원본 데이터의 초기화 여부를 마크 한다. */
				sync.param
					.table("head_office")
					.where("where hq_id       = :hq_id  " )
					//
					.unique("hq_id"           , syc.fixParameter("hq_id") )
					.update("srvr_inization_yn"          , "1"  )
				;sync.attach(Action.modify);
			}

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
				.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
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
					.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
					.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
					//
					.unique("sync_id"          , syc.fixParameter("sync_id"        ))
					.unique("ddn_id"          , syc.fixParameter("ddn_id"       ))
					.unique("idx_1"          , syc.fixParameter("idx_1"       ))
					.unique("idx_2"          , syc.fixParameter("idx_2"       ))
					.unique("idx_3"          , syc.fixParameter("idx_3"       ))
					.update("usr_memo"        , e.getMessage() )
			        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}

	/**
	 * SYC_ITEM_BONSA
	 * @param taskCaption
	 */
	private void transferWEB(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id    , a.ddn_id   , a.idx_1   , a.idx_2   , a.idx_3  ,   a.del_yn  ")
				.query("      ,   d.pos_ddns   , d.web_ddns  , d.img_ddns  , d.img_http     ")
				.query("      ,   d.owner_id   , d.hq_grp  , d.hq_id  , d.hq_nm     ")
				.query("	  ,   d.stor_id   ")
				.query("	  ,   d.row_sts  ")
				.query(" from     sync_mst  a                             ")
				.query("          join head_office d                             ")
				.query("               on    d.hq_id  = a.idx_1       ")
				.query("               and   d.hq_ver = 'N'             ")
				.query("               and   d.del_yn = '0'             ")
				.query(" where    a.sync_id  = :sync_id " , taskProcess  )
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					this.disposerWEB(sync, row);
				}
				logger.debug(taskProcess + " end = " + map.size() );
			} else {
				logger.debug(taskProcess + " end = nodata ");
			}
		} catch (Exception e) {
			logger.debug(taskProcess + " exception");
			e.printStackTrace();
		}
	}

	public void disposerWEB(DataMessage sync, SqlResultRow syc ){
		try {
			sync.clear();
			sync.param
				.table("head_office")
				.where("where hq_id = :hq_id  " )
				//
				.update("hq_grp"           , syc.fixParameter("hq_grp"        ))
				.unique("hq_id"           , syc.fixParameter("hq_id"        ))
				.update("hq_nm"           , syc.getParamText("hq_nm"        ))
				.update("stor_id"           , syc.getParameter("stor_id"        ))
				.update("pos_ddns"           , syc.getParamText("pos_ddns"        ))
				.update("web_ddns"           , syc.getParamText("web_ddns"        ))
				.update("img_ddns"           , syc.getParamText("img_ddns"        ))
				.update("img_http"           , syc.getParamText("img_http"        ))
			;sync.attach( Action.modify , syc.fixParamText("web_ddns" ));

		   	/* 쇼핑몰 고객을 등록한다. */
			sync.param
				.table("cust_mst")
				.where("where cust_id  = :cust_id " )
				//
				.unique("hq_id"           , syc.fixParameter("hq_id"        ))
				.unique("owner_id"           , syc.fixParameter("stor_id"        ))
				.unique("cust_gb"            , "3" )
				.unique("cust_id"            , "DEFAULT-B2C" )
				.unique("cust_cd"            , "DEFAULT-B2C" )
				.unique("cust_nm"            , "쇼핑몰비회원" )
				.unique("price_no"           , "8" )
				.unique("point_type"         , "0" )
				.update("row_sts"          ,  0   )
			;sync.attach(Action.modify , syc.fixParamText("ddn_id" ));

		   	/* 쇼핑몰 회원을 등록한다. */
			sync.param
				.table("cust_memb")
				.where("where cust_id  = :cust_id " )
				.where("and   mmb_id  = :mmb_id " )
				//
				.unique("hq_id"           , syc.fixParameter("hq_id"        ))
				.unique("cust_id"            , "DEFAULT-B2C" )
				.unique("mmb_id"            , "DEFAULT-B2C" )
				.unique("mmb_nm"            , "쇼핑몰비회원" )
				.update("row_sts"          ,  0   )
			;sync.attach(Action.modify , syc.fixParamText("ddn_id" ));

			if (!"".equals(syc.getParamText("pos_ddns"))){
				sync.param
					.table("cust_mst")
					.where("where cust_id  = :cust_id " )
					//
					.unique("hq_id"           , syc.fixParameter("hq_id"        ))
					.unique("owner_id"           , syc.fixParameter("stor_id"        ))
					.unique("cust_gb"            , "3" )
					.unique("cust_id"            , "DEFAULT-B2C" )
					.unique("cust_cd"            , "DEFAULT-B2C" )
					.unique("cust_nm"            , "쇼핑몰비회원" )
					.unique("price_no"           , "8" )
					.unique("point_type"         , "0" )
					.update("row_sts"          ,  0   )
				;sync.attach(Action.modify , syc.fixParamText("pos_ddns" ));

			   	/* 쇼핑몰 회원을 등록한다. */
				sync.param
					.table("cust_memb")
					.where("where cust_id  = :cust_id " )
					.where("and   mmb_id  = :mmb_id " )
					//
					.unique("hq_id"           , syc.fixParameter("hq_id"        ))
					.unique("cust_id"            , "DEFAULT-B2C" )
					.unique("mmb_id"            , "DEFAULT-B2C" )
					.unique("mmb_nm"            , "쇼핑몰비회원" )
					.update("row_sts"          ,  0   )
				;sync.attach(Action.modify , syc.fixParamText("pos_ddns" ));
			}


		   	/* 미등록 상품을 등록한다. */
//			sync.param
//				.table("itm_mst")
//				.where("where item_idcd  = :item_idcd " )
//				//
//				.unique("hq_id"           , syc.fixParameter("hq_id"        ))
//				.unique("owner_id"           , syc.fixParameter("stor_id"        ))
//				.unique("share_yn"           , "1"  )
//				.unique("unit_idcd"            , "EA" )
//				.unique("unit_name"            , "EA" )
//				.unique("unt_qty"           ,  1   )
//				.unique("stk_itm_id"           , "DELIVERY-FEE" )
//				.unique("item_idcd"            , "DELIVERY-FEE" )
//				.unique("item_code"            , "DELIVERY-FEE" )
//				.unique("item_name"            , "배송비" )
//				.unique("stk_itm_yn"           , "0" )
//				.unique("row_sts"          ,  0   )
//				.update("upt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
//				.insert("crt_dttm"          , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
//
//			;sync.attach(Action.modify, syc.fixParamText("web_ddns") );

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
				.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
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
					.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
					.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
					//
					.unique("sync_id"          , syc.fixParameter("sync_id"        ))
					.unique("ddn_id"          , syc.fixParameter("ddn_id"       ))
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
