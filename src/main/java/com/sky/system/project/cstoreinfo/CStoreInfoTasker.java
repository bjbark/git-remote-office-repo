package com.sky.system.project.cstoreinfo;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.thirdparty.encrypt.BCrypt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.task.TaskExecuter;

public class CStoreInfoTasker extends TaskExecuter {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	public static String NET_SYNC_STORE = "NET.SYNC.STORE";
	public static String ASP_SYNC_STORE = "ASP.SYNC.STORE";
	public static String WEB_SYNC_STORE = "WEB.SYNC.STORE";

	public CStoreInfoTasker() {
	}

	// 웹에서 호출할 사용자
	public CStoreInfoTasker(String process, String storage, int counter ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
	}


	public void run() {
		if (NET_SYNC_STORE.equals(this.process)){
			this.transferNET(this.process);
		} else
		if (ASP_SYNC_STORE.equals(this.process)){
			this.transferASP(this.process);
		} else
		if (WEB_SYNC_STORE.equals(this.process)){
			this.transferASP_WEB(this.process);
		}
	}


	/**
	 * SYC_ITEM_BONSA
	 * @param taskCaption
	 */
	private void transferNET(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");

			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id     , a.ddn_id    , a.idx_1     , a.idx_2     , a.idx_3    , a.del_yn   ")
				.query("      ,   b.hq_grp      , d.hq_id     , d.stor_grp  , d.stor_id   , d.stor_grp   ")
				.query("      ,   c.ctrl_id     , c.rqust_sts , c.ctrl_nm   , d.erp_chain , d.warn_msg  ")
				.query("      ,   trim(replace( c.biz_no , '-', '' )) as biz_no , a.row_sts  			")
				.query(" from     sync_mst  a                                							")
				.query("          join head_office b on b.hq_id   = a.idx_1								")
				.query("          join stor        d on d.stor_id = a.idx_2								")
				.query("          join control_mst c on c.ctrl_id = d.ctrl_id							")
				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" order by a.crt_dttm desc      													")
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
				SqlResultMap net = read.selectForMap() ;
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
					.table("stor")
					.where("where stor_id = :stor_id  " )
					//
					.update("ctrl_id"           , syc.fixParamText("ctrl_id"       ))
					.update("hq_id"             , syc.fixParamText("hq_id"         ))
					.update("stor_grp"          , syc.fixParamText("stor_grp"      ))
					.unique("stor_id"           , syc.getParamText("stor_id"       ))
					.update("stor_nm"           , syc.getParamText("ctrl_nm"       ))
					.update("stor_sts"          , syc.getParamText("rqust_sts"     ))
					.update("stor_no"           , syc.getParamText("biz_no"        ))
					.update("warn_msg"          , syc.getParamText("warn_msg"      ))

					.update("biz_no"            , syc.getParamText("biz_no"        ))
					.update("erp_chain"         , syc.getParamText("erp_chain"     ))
					.update("row_sts"          	, syc.fixParameter("row_sts"       ))
		        	.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach( Action.modify , row.fixParamText("ddn_id" )  );
			}

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
				.where("  and idx_1   = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
				//
				.unique("sync_id"				, syc.fixParameter("sync_id"     ))
				.unique("ddn_id"				, syc.fixParameter("ddn_id"      ))
				.unique("idx_1"					, syc.fixParameter("idx_1"       ))
				.unique("idx_2"					, syc.fixParameter("idx_2"       ))
				.unique("idx_3"					, syc.fixParameter("idx_3"       ))
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
					.unique("sync_id"			, syc.fixParameter("sync_id"       ))
					.unique("ddn_id"			, syc.fixParameter("ddn_id"       ))
					.unique("idx_1"				, syc.fixParameter("idx_1"       ))
					.unique("idx_2"				, syc.fixParameter("idx_2"       ))
					.unique("idx_3"				, syc.fixParameter("idx_3"       ))
					.update("usr_memo"			, e.getMessage() )
		        	.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}

	/**
	 * SYC_ITEM_BONSA
	 * @param taskCaption
	 */
	private void transferASP(String taskProcess) {
		try {
			logger.debug(taskProcess + " start");

			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id     , a.ddn_id     , a.idx_1      , a.idx_2   , a.idx_3    	")
				.query("      ,   a.del_yn      , b.own_stor_id, b.corp_id    , d.ctrl_id				")
				.query("      ,   b.hq_grp      , d.hq_id      , d.stor_grp   , d.stor_id , d.stor_nm	")
				.query("      ,   d.stor_grp     , c.rqust_sts  , d.erp_chain  , d.warn_msg  			")
				.query("      ,   b.pjt_id      , d.login_id   , d.login_pwd  , d.row_sts				")
				.query("      ,   trim(replace( c.biz_no , '-', '' )) as biz_no , c.biz_nm, c.biz_gb    ")
				.query("      ,   c.biz_type     , c.biz_kind   , c.biz_owner  							")
				.query("      ,   c.biz_email    , c.biz_tel_no , c.biz_hp_no  ,  c.biz_fax_no			")
				.query("      ,   c.biz_zip_cd   , c.biz_addr_1 , c.biz_addr_2							")
				.query("      ,   c.biz_state, c.biz_city    , c.biz_dong				")
				.query("      ,   d.zip_cd    	 , d.addr_1  	, d.addr_2      , d.map_url				")
				.query("      ,   d.state   , d.city  , d.dong							")
				.query("      ,   d.stor_db      , b.hq_pos_id											")
				.query("      ,   c.etax_ofr_id  , c.etax_ofr_cd, c.etax_ofr_pwd						")
				.query("      ,   c.sms_ofr_id   , c.sms_ofr_cd , c.sms_ofr_pwd							")
				.query("      ,   c.fax_ofr_id   , c.fax_ofr_cd , c.fax_ofr_pwd							")

				//.query("	  ,   case when d.corp_id is null or trim(d.corp_id) = '' then b.corp_id else d.corp_id end as corp_id ")
				//.query("      ,   case when d.del_yn = '0' then b.del_yn else d.del_yn end as del_yn ")
				//.query("      ,   case when b.hq_sts in ('0000','1000','2000','2500') then c.rqust_sts  else b.hq_sts end as rqust_sts ")

				.query(" from     sync_mst  a                                	")
				.query("          join head_office b on b.hq_id   = a.idx_1		")
				.query("          join stor        d on d.stor_id = a.idx_2		")
				.query("          join control_mst c on c.ctrl_id = d.ctrl_id	")
				.query(" where    a.sync_id  = :sync_id " , taskProcess )
				.query(" order by a.crt_dttm desc      " )
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){

					// 본사 및 직영점인경우
					//boolean ischain = "1".equals( row.getParamText("stor_grp")) || "2".equals( row.getParamText("stor_grp"))  ;

					read.clear();
					read.param
						.query("  select a.hq_id  , a.pos_ddns " )
						.query("  from   head_office a                  " )
						.query("  where  a.hq_id in(:hq_id) " , new String[] {row.fixParamText("hq_id" ) ,row.fixParamText("hq_grp" )} , "3".equals( row.getParamText("stor_grp"))) // 체인점인 경우
						.query("  where  a.hq_grp =  :hq_grp  " , row.fixParamText("hq_grp" ) , !"3".equals( row.getParamText("stor_grp" )) ) // 직영점인 경우
					;
					this.disposerASP(sync, read.selectForMap(), row );
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


	public void disposerASP(DataMessage sync, SqlResultMap map,  SqlResultRow syc ){
		try {
			sync.clear();
			String index = syc.getParamText("stor_id").substring(0,1);
			for(SqlResultRow row:map){
				//  회계 솔류션
				if ("2000025162".equals( syc.getParamText("pjt_id") )){
					sync.param
						.table("stor")
						.where("where stor_id = :stor_id  " )
						//
						.update("hq_grp"            , syc.fixParameter("hq_grp"         ))
						.unique("hq_id"				, syc.fixParameter("hq_id"          ))
						.unique("stor_grp"          , syc.fixParameter("stor_grp"       ))
						.unique("stor_id"           , syc.fixParameter("stor_id"        ))
						.unique("stor_grp"           , syc.fixParameter("stor_grp"        ))
						.update("stor_sts"          , syc.getParamText("rqust_sts"      ))
						.update("stor_nm"           , syc.getParamText("stor_nm"         ) , !"".equals(syc.getParamText("stor_nm").trim()) )
						.update("biz_gb"            , syc.getParamText("biz_gb"         ))
						.update("biz_no"            , syc.getParamText("biz_no"         ))
						.update("biz_nm"            , syc.getParamText("biz_nm"         ))
						.update("biz_type"          , syc.getParamText("biz_type"       ))
						.update("biz_kind"          , syc.getParamText("biz_kind"       ))
						.update("biz_owner"           , syc.getParamText("biz_owner"        ))
						.update("biz_zip_cd"        , syc.getParamText("biz_zip_cd"     ))
						.update("biz_state"    , syc.getParamText("biz_state" ))
						.update("biz_city"     , syc.getParamText("biz_city"  ))
						.update("biz_dong"     , syc.getParamText("biz_dong"  ))
						.update("biz_addr_1"        , syc.getParamText("biz_addr_1"     ))
						.update("biz_addr_2"        , syc.getParamText("biz_addr_2"     ))
						.update("biz_tel_no"        , syc.getParamText("biz_tel_no"     ))
						.update("biz_hp_no"         , syc.getParamText("biz_hp_no"      ))
						.update("biz_fax_no"        , syc.getParamText("biz_fax_no"     ))
						.update("biz_email"         , syc.getParamText("biz_email"      ))
			        	.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        	.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach( Action.modify , row.fixParamText("hq_id" ) + ".POS" );


					if ( !"".equals(syc.getParamText("login_id" ))) {
						sync.param
							.table("usr_mst")
							.where("where emp_id  = :emp_id  " )
							//
							.unique("hq_id"          , syc.fixParameter("hq_id"       )) // 동기화 하려는 본사 ID
							.unique("stor_grp"       , syc.fixParameter("stor_grp"       ))// 동기화 하려는 본사 매장 ID
							.unique("stor_id"        , syc.fixParameter("stor_id"       ))// 동기화 하려는 본사 매장 ID
							.unique("emp_id"         , syc.fixParameter("login_id"       ))
//							.unique("user_cd"        , syc.fixParameter("login_id"       ))
							.unique("emp_nm"         , "sky cns " )
							.unique("auth_gb"        , "9"   )
							.unique("login_id"       , syc.fixParameter("login_id"       ))
							.update("login_pwd"      , BCrypt.hashpw( syc.fixParamText("login_pwd" ) , BCrypt.gensalt() ))
							.update("login_ip"       , "" )
							.unique("admin_yn"       , "1"  )
						;sync.attach( Action.modify , syc.fixParamText("hq_id" ) + ".POS" );

						sync.param
							.table("user_menu")
							.where("where emp_id  = :emp_id  " )
							.where("and   menu_id  = :menu_id  " )
							//
							.unique("hq_id"          	, syc.fixParameter("hq_id"       )) // 동기화 하려는 본사 ID
							.unique("emp_id"            , syc.fixParameter("login_id"       ))
							.unique("menu_id"           , "2000025318" ) // 사용자 메뉴 권한 관리
							.update("select_yn"         , "1" )
							.update("inpt_use_yn"       , "1" )
							.update("upt_use_yn"        , "1" )
						;sync.attach( Action.modify , syc.fixParamText("hq_id" ) + ".POS" );
					}


				} else {

					if ("N".equals(index)){
						String biz_no = syc.getParamText("biz_no"         ) ;
						//  알파넷인경우
						if ("0000015530".equals( syc.getParamText("pjt_id" ))) {
							biz_no = (biz_no.length() < 10 ) ? biz_no : biz_no.substring(0,3) + "-" + biz_no.substring(3,5) + "-" + biz_no.substring(5,biz_no.length());
						}
						sync.param
							.table("stor")
							.where("where stor_id = :stor_id  " )
							//
							.unique("corp_id"           , syc.getParameter("corp_id"       ))
							.update("hq_grp"            , syc.fixParameter("hq_grp"       ))
							.unique("hq_id"             , syc.fixParameter("hq_id"       ))
							.update("ctrl_id"           , syc.getParameter("ctrl_id"       ))
							.unique("stor_grp"          , syc.fixParameter("stor_grp"       ))
							.unique("stor_id"           , syc.fixParameter("stor_id"       ))
							.unique("wareh_id"          , syc.fixParameter("stor_id"       ))
							.unique("stor_grp"           , syc.fixParameter("stor_grp"       ))
							.update("stor_sts"          , syc.getParamText("rqust_sts"      ))
							.update("erp_chain"         , syc.getParamText("erp_chain"      ))
							.update("warn_msg"          , syc.getParamText("warn_msg"      ))
							.update("row_sts"           , syc.fixParameter("row_sts"      ))
							.update("stor_sms_id"       , syc.getParamText("sms_ofr_id"   ))
							.update("stor_sms_cd"       , syc.getParamText("sms_ofr_cd"   ))
							.update("stor_fax_id"       , syc.getParamText("fax_ofr_id"   ))
							.update("stor_fax_cd"       , syc.getParamText("fax_ofr_cd"   ))

							.update("stor_tax_id"       , syc.getParamText("etax_ofr_id"   ))
							.update("stor_tax_cd"       , syc.getParamText("etax_ofr_cd"   ))

							.update("stor_db"           , syc.getParameter("stor_db"       ))
							.update("stor_nm"           , syc.getParamText("stor_nm"       ) , !"".equals(syc.getParamText("stor_nm").trim()) )
							.update("biz_gb"            , syc.getParamText("biz_gb"         ))
							.update("biz_no"            , biz_no                             )
							.update("biz_nm"            , syc.getParamText("biz_nm"         ))
							.update("biz_type"          , syc.getParamText("biz_type"       ))
							.update("biz_kind"          , syc.getParamText("biz_kind"      ))
							.update("biz_owner"           , syc.getParamText("biz_owner"      ))
							.update("biz_zip_cd"        , syc.getParamText("biz_zip_cd"     ))
							.update("biz_state"    , syc.getParamText("biz_state"      ))
							.update("biz_city"     , syc.getParamText("biz_city"       ))
							.update("biz_dong"     , syc.getParamText("biz_dong"       ))
							.update("biz_addr_1"        , syc.getParamText("biz_addr_1"      ))
							.update("biz_addr_2"        , syc.getParamText("biz_addr_2"      ))
							.update("biz_tel_no"        , syc.getParamText("biz_tel_no"     ))
							.update("biz_hp_no"         , syc.getParamText("biz_hp_no"     ))
							.update("biz_fax_no"        , syc.getParamText("biz_fax_no"     ))
							.update("biz_email"         , syc.getParamText("biz_email"      ))
							.update("zip_cd"            , syc.getParamText("zip_cd"         ))
							.update("state"        , syc.getParamText("state"          ))
							.update("city"         , syc.getParamText("city"           ))
							.update("dong"         , syc.getParamText("dong"           ))
							.update("addr_1"            , syc.getParamText("addr_1"          ))
							.update("addr_2"            , syc.getParamText("addr_2"          ))
							.update("map_url"           , syc.getParamText("map_url"       ))

				        	.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        	.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						;sync.attach( Action.modify , row.fixParamText("hq_id" ) + ".POS" );
					} else {
						if ("E".equals(index) && !"".equals(row.getParamText("pos_ddns" ))){

							sync.param
								.table("stor")
								.where("where stor_id = :stor_id  " )
								//
								.unique("stor_id"           , syc.fixParameter("stor_id"       ))
								.update("erp_chain"          , syc.getParamText("erp_chain"      ))

							;sync.attach( Action.update , row.fixParamText("pos_ddns" ));
						}
					}
				}
			}

			//  회계 솔류션
			if ("2000025162".equals( syc.getParamText("pjt_id") )){

			} else {
				if ("N".equals(index)){
					/* 기초 데이터를 넘긴다 */
					sync.param
						.table("base_mst")
						.where("where bas_id  = :bas_id  " )
						//
						.unique("hq_id"             , syc.fixParameter("hq_id"       )) // 동기화 하려는 본사 ID
						.unique("stor_grp"          , syc.fixParameter("stor_grp"       ))// 동기화 하려는 본사 매장 ID
						.unique("bas_id"            , "5108000" + syc.fixParameter("stor_grp"  ))
						.unique("bas_cd"        	, "0000"    )
						.insert("bas_nm"            , "기타출고" )
						.update("prnt_id"           , "5108"    )
						.update("row_lvl"           , 5         )
			        	.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        	.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;sync.attach( Action.modify , syc.getParamText("hq_id") + ".POS" );


					if ("14821".equals( syc.getParamText("pjt_id" )) ){

					   	/* 미등록 상품을 등록한다. */
						sync.param
							.table("itm_stor")
							.where("where item_idcd  = :item_idcd " )
							.where("and   stor_id = :stor_id " )
							//
							.unique("hq_id"             , syc.fixParameter("hq_id"        ))
							.unique("stor_grp"          , syc.fixParameter("stor_grp"        ))
							.unique("stor_id"           , syc.fixParameter("stor_id"        ))
							.unique("item_idcd"           , "DEFAULT-POS" )
							.unique("row_sts"           ,  0   )
				        	.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        	.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						;sync.attach(Action.modify, syc.getParamText("hq_id") + ".POS" );

					   	/* 포스 고객을 등록한다. */
						sync.param
							.table("cust_stor")
							.where("where cust_id  = :cust_id  " )
							.where("and   stor_id = :stor_id " )
							//
							.unique("hq_id"             , syc.fixParameter("hq_id"        ))
							.unique("stor_grp"          , syc.fixParameter("stor_grp"        ))
							.unique("stor_id"           , syc.fixParameter("stor_id"        ))
							.unique("cust_id"           , "DEFAULT-POS" )
							.unique("price_no"          , "7" )
							.unique("row_sts"           ,  0   )
				        	.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        	.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						;sync.attach(Action.modify, syc.getParamText("hq_id") + ".POS" );


						if ( !"".equals(syc.getParamText("login_id" ))) {
							sync.param
								.table("usr_mst")
								.where("where emp_id  = :emp_id  " )
								//
								.unique("hq_id"             , syc.fixParameter("hq_id"       )) // 동기화 하려는 본사 ID
								.unique("stor_grp"          , syc.fixParameter("stor_grp"       ))// 동기화 하려는 본사 매장 ID
								.unique("stor_id"           , syc.fixParameter("stor_id"       ))// 동기화 하려는 본사 매장 ID
								.unique("emp_id"            , syc.fixParameter("login_id"       ))
								.unique("user_cd"           , syc.fixParameter("login_id"       ))
								.unique("emp_nm"            , "sky cns " )
								.unique("auth_gb"           , "9"   )
								.unique("login_id"          , syc.fixParameter("login_id"       ))
								.update("login_pwd"        	, BCrypt.hashpw( syc.fixParamText("login_pwd" ) , BCrypt.gensalt() ))
								.update("login_ip"        	, "" ) //127.0.0.1,203.229.190.0/24
								.unique("admin_yn"          , "1"  )
							;sync.attach( Action.modify     , syc.fixParamText("hq_id" ) + ".POS" );

							sync.param
								.table("user_menu")
								.where("where emp_id  = :emp_id  " )
								.where("and   menu_id  = :menu_id  " )
								//
								.unique("hq_id"          	, syc.fixParameter("hq_id"       )) // 동기화 하려는 본사 ID
								.unique("emp_id"            , syc.fixParameter("login_id"       ))
								.unique("menu_id"           , "0000000018" ) // 사용자 메뉴 권한 관리
								.update("select_yn"         , "1" )
								.update("inpt_use_yn"       , "1" )
								.update("upt_use_yn"        , "1" )
							;sync.attach( Action.modify , syc.fixParamText("hq_id" ) + ".POS" );

						}
					}
				}

			}



			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
				.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
				//
				.unique("sync_id"           , syc.fixParameter("sync_id"       ))
				.unique("ddn_id"			, syc.fixParameter("ddn_id"       ))
				.unique("idx_1"             , syc.fixParameter("idx_1"       ))
				.unique("idx_2"             , syc.fixParameter("idx_2"       ))
				.unique("idx_3"             , syc.fixParameter("idx_3"       ))
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
					.unique("sync_id"        , syc.fixParameter("sync_id"       ))
					.unique("ddn_id"         , syc.fixParameter("ddn_id"       ))
					.unique("idx_1"          , syc.fixParameter("idx_1"       ))
					.unique("idx_2"          , syc.fixParameter("idx_2"       ))
					.unique("idx_3"          , syc.fixParameter("idx_3"       ))
					.update("usr_memo"       , e.getMessage() )
		        	.update("upt_dttm"		 , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}

	/**
	 * WEB.SYNC.STORE
	 * @param taskCaption
	 */
	private void transferASP_WEB(String taskProcess) {
		try {
			logger.debug(WEB_SYNC_STORE + " start");
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select   a.sync_id     , a.ddn_id      , a.idx_1       , a.idx_2    , a.idx_3    , a.del_yn  ")
				.query("      ,   b.hq_grp      , d.hq_id       , d.stor_grp    , d.stor_id   , d.stor_grp , d.stor_nm ")  //b.owner_id    ,
				.query("      ,   c.ctrl_nm     , c.rqust_sts   , trim(replace( c.biz_no , '-', '' ))  as biz_no    ")
				.query("      ,   c.biz_nm      , c.biz_gb      , c.biz_type    , c.biz_kind    , c.biz_owner			")
				.query("      ,   c.biz_email   , c.biz_tel_no  , c.biz_hp_no   ,  c.biz_fax_no						")
				.query("      ,   c.biz_zip_cd  , c.biz_addr_1  , c.biz_addr_2										")
				.query("      ,   c.biz_state, c.biz_city, c.biz_dong   								")
				.query("      ,   d.zip_cd    	, d.addr_1  	, d.addr_2      , d.map_url							")
				.query("      ,   d.state  , d.city   , d.dong										")
				.query(" from     sync_mst  a                                  										")
				.query("          join head_office b on b.hq_id   = a.idx_1        									")
				.query("          join stor        d on d.stor_id = a.idx_2        									")
				.query("          join control_mst c on c.ctrl_id = d.ctrl_id       								")
				.query(" where    a.sync_id  = :sync_id " , WEB_SYNC_STORE       )
				.query(" order by a.crt_dttm desc      																")
			;

			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				for(SqlResultRow row:map){
					this.disposerASP_WEB(sync, row);
				}
				logger.debug(WEB_SYNC_STORE + " end = " + map.size() );
			} else {
				logger.debug(WEB_SYNC_STORE + " end = nodata ");
			}
		} catch (Exception e) {
			logger.debug(WEB_SYNC_STORE + " exception");
			e.printStackTrace();
		}
	}

	// WEB.SYNC.STORE
	public void disposerASP_WEB(DataMessage sync, SqlResultRow syc ){
		try {
			sync.clear();
			sync.param
			.table("stor")
				.where("where stor_id = :stor_id  " )
				//
				.update("hq_grp"                , syc.fixParameter("hq_grp"       ))
				.unique("hq_id"                 , syc.fixParameter("hq_id"       ))
				.unique("stor_grp"              , syc.fixParameter("stor_grp"       ))
				.unique("stor_grp"               , syc.fixParameter("stor_grp"       ))
				.unique("stor_id"               , syc.fixParameter("stor_id"       ))
				.update("stor_nm"               , !"".equals(syc.getParamText("stor_nm"  ).trim()) ? syc.getParamText("stor_nm"  ) : syc.getParamText("ctrl_nm"  ) )
				.update("stor_sts"              , syc.getParamText("rqust_sts"      ))

				.update("biz_gb"                , syc.getParamText("biz_gb"         ))
				.update("biz_no"                , syc.getParamText("biz_no"         ))
				.update("biz_nm"                , syc.getParamText("biz_nm"         ))
				.update("biz_type"              , syc.getParamText("biz_type"       ))
				.update("biz_kind"              , syc.getParamText("biz_kind"      ))
				.update("biz_owner"               , syc.getParamText("biz_owner"      ))
				.update("biz_zip_cd"            , syc.getParamText("biz_zip_cd"     ))
				.update("biz_state"        , syc.getParamText("biz_state"      ))
				.update("biz_city"         , syc.getParamText("biz_city"       ))
				.update("biz_dong"         , syc.getParamText("biz_dong"       ))
				.update("biz_addr_1"            , syc.getParamText("biz_addr_1"      ))
				.update("biz_addr_2"            , syc.getParamText("biz_addr_2"      ))
				.update("biz_tel_no"            , syc.getParamText("biz_tel_no"     ))
				.update("biz_hp_no"             , syc.getParamText("biz_hp_no"     ))
				.update("biz_fax_no"            , syc.getParamText("biz_fax_no"     ))
				.update("biz_email"             , syc.getParamText("biz_email"      ))

				.update("zip_cd"                , syc.getParamText("zip_cd"         ))
				.update("state"            , syc.getParamText("state"          ))
				.update("city"             , syc.getParamText("city"           ))
				.update("dong"             , syc.getParamText("dong"           ))
				.update("addr_1"                , syc.getParamText("addr_1"          ))
				.update("addr_2"                , syc.getParamText("addr_2"          ))
				.update("map_url"				, syc.getParamText("map_url"       ))


			;sync.attach( Action.modify , syc.fixParamText("hq_id" ) + ".WEB" );

			// 싱크 데이터를 삭제 한다.
			sync.param
				.table("sync_mst")
				.where("where sync_id = :sync_id and ddn_id = :ddn_id  " )
				.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
				//
				.unique("sync_id"				, syc.fixParameter("sync_id"       ))
				.unique("ddn_id"				, syc.fixParameter("ddn_id"       ))
				.unique("idx_1"					, syc.fixParameter("idx_1"       ))
				.unique("idx_2"					, syc.fixParameter("idx_2"       ))
				.unique("idx_3"					, syc.fixParameter("idx_3"       ))
			;sync.attach(Action.delete).execute();


		} catch (Exception e) {
			e.printStackTrace();
			try {
				sync.clear();
				sync.param
					.table("sync_mst												")
					.where("where sync_id = :sync_id and ddn_id = :ddn_id			" )
					.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )
					//
					.unique("sync_id"          , syc.fixParameter("sync_id"       ))
					.unique("ddn_id"           , syc.fixParameter("ddn_id"        ))
					.unique("idx_1"            , syc.fixParameter("idx_1"         ))
					.unique("idx_2"            , syc.fixParameter("idx_2"         ))
					.unique("idx_3"            , syc.fixParameter("idx_3"         ))
					.update("usr_memo"         , e.getMessage() )
		        	.update("upt_dttm"		   , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;sync.attach(Action.update).execute();
			} catch (Exception e1) {}

		}
	}
}
