package com.sky.system.project.cstoreinfo;

import net.sky.core.exception.ServiceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.text.SimpleDateFormat;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.listener.SeqListenerService;

@Service
public class CStoreInfoService {


	@Autowired
	private SeqListenerService seq;

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String index = arg.getParamText("search_id").trim();
		String value = arg.getParamText("search_nm").trim();

		String[] rqust_sts = arg.getParamCast("rqust_sts", String[].class);
		String[] hq_sts = arg.getParamCast("hq_sts", String[].class);

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select c.pjt_id      , p.pjt_url   , c.pos_ddns   , c.web_ddns  , c.own_stor_id			")
			.query("     , a.erp_id      , a.erp_pwd   														")
			.query("     , b.chnl_id     , x.mngt_chnl_nm as  distr_nm										")
			.query("     , b.agent_id    , y.mngt_chnl_nm													")
			.query("     , b.call_cntr_id, z.mngt_chnl_nm as phone_nm										")
			.query("     , b.retail_chnl_id, m.chrg_nm  , m.trns_sts  , b.bizmeka_id   , b.sys_clnt_reg_yn 	")

			.query("     , c.hq_grp      , a.hq_id   , a.stor_grp  , a.stor_id , a.stor_nm   , a.stor_gb	")
			.query("     , b.rqust_gb    , b.rqust_type														")
			.query("     , a.ctrl_id     , b.ctrl_nm , b.rqust_dt  , b.trmn_dt , b.cont_cont , b.rqust_sts 	")
			.query("     , a.warn_msg    , a.stor_fee, a.intl_fee  , a.mn_fee								")
			.query("     , c.del_yn      as del_yn															") // 매장이 삭제 안되었다면.. 본사 삭제 여부를 내린다. 1 : 이면 삭제된 정보로 간주
			.query("     , c.hq_gb    	 , c.hq_sts      , c.hq_ver											")
			.query("     , b.etax_ofr_id , b.etax_ofr_cd , b.etax_ofr_pwd 									")
			.query("     , b.sms_ofr_id  , b.sms_ofr_cd  , b.sms_ofr_pwd 									")
			.query("     , b.fax_ofr_id  , b.fax_ofr_cd  , b.fax_ofr_pwd 									")

			.query("     , a.last_sale_dt , c.last_read_dt													")

			.query("     , b.biz_no       , b.biz_nm      , b.biz_gb										")
			.query("     , b.biz_type     , b.biz_kind    , b.biz_owner  									")
			.query("     , b.biz_email    , b.biz_tel_no  , b.biz_hp_no , b.biz_fax_no   					")
			.query("     , b.biz_zip_cd   , b.biz_addr_1  , b.biz_addr_2  									")
			.query("     , b.biz_state    , b.biz_city    , b.biz_dong   									")

			.query("     , a.zip_cd  	  , a.addr_1      , a.addr_2    , a.map_url							")
			.query("     , a.state   	  , a.city        , a.dong											")
			.query("     , a.row_sts      , a.login_id    , a.login_pwd , a.erp_chain						")
		;
		data.param
			.where("from   stor a																			")
			.where("       join control_mst b on b.ctrl_id = a.ctrl_id										")
			.where("       join head_office c on c.hq_id = a.hq_id											")
			.where("       left outer join agent   x on x.agent_id  = b.chnl_id								")
			.where("       left outer join agent   y on y.agent_id  = b.agent_id							")
			.where("       left outer join agent   z on z.agent_id  = b.call_cntr_id						")
			.where("       left outer join charge  m on m.chrg_id   = b.retail_chnl_id						")
			.where("       left outer join pjt_mst p on p.pjt_id    = c.pjt_id								")
			.where("where  a.row_sts < 2																	")
		    .where("and    b.rqust_sts in  (:rqust_sts )   " , rqust_sts ,( rqust_sts.length > 0) ) /* 주문 위치 */
		    .where("and    c.hq_sts in  (:hq_sts )         " , hq_sts ,( hq_sts.length > 0) ) /* 주문 위치 */

		    .where("and    a.ctrl_id     like %:ctrl_id%   " , value , index.equals("1" ))
		    .where("and    b.ctrl_nm     like %:ctrl_nm%   " , value , index.equals("2" ))
		    .where("and    b.bizmeka_id  like %:search_nm% " , value.toLowerCase() , index.equals("3" ))
		    .where("and    b.cont_cont   like %:search_nm% " , value.toLowerCase() , index.equals("4" )) // 계약 내용
		    .where("and    b.find_nm     like %:find_nm%   " , arg.getParameter("find_nm"  ))

			.where("and    a.hq_id        = :hq_id         " , arg.getParameter("hq_id"  ))
			.where("and    c.hq_gb        = :hq_gb         " , arg.getParameter("hq_gb"  ))
			.where("and    a.stor_grp     = :stor_grp      " , arg.getParameter("stor_grp"  ))
			.where("and    b.rqust_gb     = :rqust_gb      " , arg.getParameter("rqust_gb"  ))

			.where("and    c.pjt_id       = :pjt_id        " , arg.getParameter("pjt_id"       ))

			.where("and    b.chnl_id      = :chnl_id       " , arg.getParameter("chnl_id"  ))
			.where("and    b.agent_id     = :agent_id      " , arg.getParameter("agent_id"  ))
			.where("and    b.call_cntr_id = :call_cntr_id  " , arg.getParameter("call_cntr_id"  ))
			.where("and    b.chrg_id      = :chrg_id       " , arg.getParameter("chrg_id" ))
		    .where("and    a.hq_id in ( select hq_id from head_office where hq_grp = :hq_grp ) " , arg.getParameter("hq_grp"  ))
		;
	    return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );


	}

	/**
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		String[] rqust_sts = arg.getParamCast("rqust_sts", String[].class);

		data.param // 집계문 입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문 입력
			.query("select c.pjt_id    , c.pos_ddns   , c.web_ddns				")
			.query("     , c.hq_nm     , c.hq_gb                   				")
			.query("     , c.hq_gb     , c.hq_sts     , c.hq_ver 				")
			.query("     , a.hq_id     , a.stor_grp   , a.stor_id   			")
			.query("     , b.ctrl_id   , b.ctrl_nm    , b.ctrl_nm    as stor_nm ")
			.query("     , b.rqust_sts , a.stor_gb    							")
		;
		data.param // 조건문 입력
			.where("from   stor  a												")
			.where("       join   control_mst b on b.ctrl_id = a.ctrl_id		")
			.where("       join   head_office c on c.hq_id   = a.hq_id  		")
			.where("where  a.row_sts   = :row_sts     " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("where  a.row_sts   <= :row_sts    " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("and    a.hq_id     = :hq_id       " , arg.getParameter("hq_id" )  )
			.where("and    a.stor_grp  = :stor_grp    " , arg.getParameter("stor_grp" ))
			.where("and    b.rqust_sts = :stor_sts    " , arg.getParameter("stor_sts" ))
			.where("and    c.hq_ver    = :hq_ver      " , arg.getParameter("hq_ver" ))
			.where("and    b.ctrl_nm like %:ctrl_nm%  " , arg.getParameter("ctrl_nm"  ))
			.where("and    b.ctrl_id like  :ctrl_id%  " , arg.getParameter("ctrl_id"  ))
			.where("and    c.pjt_id    = :pjt_id  and c.initialed ='1' " , arg.getParameter("pjt_id"   ))
		    .where("and    b.rqust_sts in  (:rqust_sts )  " , rqust_sts ,( rqust_sts.length > 0) ) /* 주문 위치 */
		    .where("and    a.hq_id in ( select hq_id from head_office where hq_grp = :hq_grp ) " , arg.getParameter("hq_grp"  ))
	    ;

		//  자신이 매장의 소유주인 경우만
	    if ("1".equals( arg.getParamText("match_yn" ))) {
			data.param // 조건문 입력
				.where("and    a.stor_grp     = a.stor_id " )
			;
	    }
	    return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}

	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		SimpleDateFormat ymdfmt = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
		String ymd    = ymdfmt.format(new Date());
		String today  = dfmt.format(new Date());

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				String cust_sts = "7";
				String cust_sts_nm = "";

				data.param
					.table("control_mst")
					.where("where ctrl_id  = :ctrl_id  " )
					.where("and   stor_id  = :stor_id  " )
					//
					.unique("stor_id"           , row.fixParameter("stor_id"        ))
					.unique("ctrl_id"           , row.fixParameter("ctrl_id"        ))
					.update("ctrl_nm"           , row.getParameter("ctrl_nm"        ))
					.update("rqust_dt"          , row.getParameter("rqust_dt"       ))
					.update("cont_cont"         , row.getParameter("cont_cont"      ))
					.update("rqust_sts"         , row.getParameter("rqust_sts"      ))


					.update("rqust_gb"          , row.getParameter("rqust_gb"      ))
					.update("rqust_type"        , row.getParameter("rqust_type"    ))

					.update("chnl_id"           , row.getParameter("chnl_id"         ))
					.update("agent_id"          , row.getParameter("agent_id"        ))
					.update("call_cntr_id"      , row.getParameter("call_cntr_id"    ))
					.update("chrg_id"          	, row.getParameter("chrg_id"       ), !row.getParamText("chrg_id" ).equals(row.getParamText("_chrg_id" )))
					.update("sys_clnt_reg_yn"   , row.getParameter("sys_clnt_reg_yn" ))
					.update("bizmeka_id"        , row.getParameter("bizmeka_id"      ))

					.update("etax_ofr_id"       , row.getParameter("etax_ofr_id"     ))
					.update("etax_ofr_cd"       , row.getParameter("etax_ofr_cd"     ))
					.update("etax_ofr_pwd"      , row.getParameter("etax_ofr_pwd"    ))

					.update("sms_ofr_id"        , row.getParameter("sms_ofr_id"      ))
					.update("sms_ofr_cd"        , row.getParameter("sms_ofr_cd"      ))
					.update("sms_ofr_pwd"       , row.getParameter("sms_ofr_pwd"     ))

					.update("fax_ofr_id"       	, row.getParameter("fax_ofr_id"      ))
					.update("fax_ofr_cd"        , row.getParameter("fax_ofr_cd"      ))
					.update("fax_ofr_pwd"       , row.getParameter("fax_ofr_pwd"     ))

					.update("biz_no"            , row.getParameter("biz_no"          ))
					.update("biz_nm"            , row.getParameter("biz_nm"          ))
					.update("biz_gb"            , row.getParameter("biz_gb"          ))
					.update("biz_type"          , row.getParameter("biz_type"        ))
					.update("biz_kind"          , row.getParameter("biz_kind"        ))
					.update("biz_owner"			, row.getParameter("biz_owner"       ))
					.update("biz_email"			, row.getParameter("biz_email"       ))
					.update("biz_tel_no"		, row.getParameter("biz_tel_no"      ))
					.update("biz_hp_no"         , row.getParameter("biz_hp_no"       ))
					.update("biz_fax_no"        , row.getParameter("biz_fax_no"      ))
					.update("biz_zip_cd"        , row.getParameter("biz_zip_cd"      ))
					.update("biz_addr_1"        , row.getParameter("biz_addr_1"      ))
					.update("biz_addr_2"        , row.getParameter("biz_addr_2"      ))
					.update("biz_state"         , row.getParameter("biz_state"       ))
					.update("biz_city"          , row.getParameter("biz_city"        ))
					.update("biz_dong"          , row.getParameter("biz_dong"        ))

					.update("zip_cd"         	, row.getParameter("zip_cd"      	 ))
					.update("state"             , row.getParameter("state"           ))
					.update("city"              , row.getParameter("city"            ))
					.update("dong"              , row.getParameter("dong"        	 ))
					.update("addr_1"          	, row.getParameter("addr_1"          ))
					.update("addr_2"          	, row.getParameter("addr_2"       	 ))

					.update("usr_memo"          , row.getParameter("usr_memo"        ))
					.update("row_sts"           , row.getParameter("row_sts"         ))
					.update("find_nm"           , row.getParamText("find_nm"         ).toLowerCase() )

					.update("upt_ui" 	 	    , row.getParameter("upt_ui"		  ))
					.insert("crt_ui" 	 	    , row.getParameter("crt_ui"		  ))
					.update("upt_id" 	 	    , row.getParameter("upt_id"		  ))
					.insert("crt_id" 	 	    , row.getParameter("crt_id"		  ))
					.update("upt_ip"   		    , arg.remoteAddress )
					.insert("crt_ip"   	 	    , arg.remoteAddress )
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */

				;data.attach(row.fixParamText("ctrl_id").equals(row.fixParamText("_ctrl_id")) ? rowaction : Action.modify  );


				// 청약 ID 가 변경 되었다면, 이전 청약은 양도 해지 처리 한다.
				if (!row.fixParamText("ctrl_id").equals(row.fixParamText("_ctrl_id")) ) {
					data.param
						.table("control_mst")
						.where("where ctrl_id  = :ctrl_id  " )
						.where("and   stor_id  = :stor_id  " )
						//
						.unique("ctrl_id"           , row.fixParameter("_ctrl_id"      )) // 양도 해지로 인한 청약 변경된 경우 이전 ID 는 해지 시킨다.
						.unique("stor_id"           , row.fixParameter("stor_id"       ))
						.update("rqust_sts"         , "5000"                           )

					    .update("trmn_dt"			, ymd )
						//
						.update("upt_ui" 	 	    , row.getParameter("upt_ui"		  ))
						.update("upt_id" 	 	  	, row.getParameter("upt_id"		  ))
						.update("upt_ip"   		 	, arg.remoteAddress )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					;data.attach(Action.update );

					data.param
						.table("control_mst")
						.where("where ctrl_id = :ctrl_id  " )
						//
						.unique("ctrl_id"           , row.fixParameter("_ctrl_id"       )) // 양도 해지로 인한 청약 변경된 경우 이전 ID 는 해지 시킨다.
						.unique("stor_id"           , row.fixParameter("stor_id"        ))
						.update("rqust_sts"         , "5000"                            )

					    .update("trmn_dt"			, ymd )
						//
						.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		  ))
						.update("upt_id" 	 	 	, row.getParameter("upt_id"		  ))
						.update("upt_ip"   		 	, arg.remoteAddress )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					;data.attach(Action.update );

					data.param
						.table("charge")
						.where("where chrg_id  = :chrg_id  " )
						//
						.unique("chrg_id"			, row.fixParameter("_ctrl_id"       ))
						.update("chrg_nm"         	, "(양도해지)" + row.getParameter("ctrl_nm"       ))

						.update("trns_sts"			, "9"  )
					    .update("trmn_dt"			, ymd )
					;data.attach(Action.update);

					data.param
						.query("update control_mst t   " )
						.query("   set chrg_id   =  :new_chrg_id "  , row.fixParameter("ctrl_id"         ))
						.query("where  chrg_id   =  :old_chrg_id "  , row.fixParameter("_ctrl_id"        )) // 이전 청약 정보
						.query("and    ctrl_id  !=  :not_ctrl_id "  , row.fixParameter("_ctrl_id"        )) // 과거 청약 ID 는 제외 한다.
						.query("and    rqust_sts not in ( '5000' ,'4000' ,'3000' ) ") // 해지 처리는 제외 한다.
					;data.attach(Action.direct );


//					data.param
//						.table("cust_mst")
//						.where("where cust_id  = :cust_id  " )
//						//
//						.unique("cust_id"         , row.fixParameter("_ctrl_id"         ))
//						.update("cust_nm"         , "(양도해지)" + row.getParameter("ctrl_nm"       ))
//						.update("cust_sts"        , "9"                         )
//
//					;data.attach(Action.update , "N1000BONSA.POS" );

//					data.param
//						.table("asp_contract")
//						.where("where contract_id  = :contract_id  " )
//						//
//						.unique("contract_id"        , row.getParameter("_contr_id"       ))
//						//.unique("stor_id"           , row.getParameter("stor_id"        ))
//						//.unique("contract_name"      , row.getParameter("ctrl_nm"        ))
//						.update("status_code"        , "10055000" )
//						.update("sync_yn"            , "N" )
//					;data.attach(Action.update, SqlRepository.CONFIDENCE );
				}

				data.param
					.table("stor")
					.where("where stor_id  = :stor_id  " )
					//
					.insert("ctrl_id"           , row.fixParameter("ctrl_id"     ),  row.fixParamText("ctrl_id").equals(row.fixParamText("_ctrl_id")) )
					.update("ctrl_id"           , row.fixParameter("ctrl_id"     ), !row.fixParamText("ctrl_id").equals(row.fixParamText("_ctrl_id")) )
					.unique("hq_id"           	, row.fixParameter("hq_id"      ))
					.unique("stor_grp"          , row.fixParameter("stor_grp"   ))

					.update("erp_id"           	, row.getParameter("erp_id"     ))
					.update("erp_pwd"           , row.getParameter("erp_pwd"    ))

					.unique("stor_id"           , row.fixParameter("stor_id"    ))
					.update("stor_nm"           , row.getParameter("stor_nm"    ))
					.update("stor_gb" 	 	    , row.fixParameter("stor_gb"	))
					.update("erp_chain"         , row.getParameter("erp_chain"  ))

					.update("stor_fee"          , row.getParameter("stor_fee"   ))

					.update("warn_msg"          , row.getParameter("warn_msg"   ))

					.update("zip_cd"         	, row.getParameter("zip_cd"     ))
					.update("state"		        , row.getParameter("state" ))
					.update("city"              , row.getParameter("city"  ))
					.update("dong"              , row.getParameter("dong"  ))
					.update("addr_1"          	, row.getParameter("addr_1"     ))
					.update("addr_2"          	, row.getParameter("addr_2"     ))
					.update("map_url"           , row.getParameter("map_url"    ))

					.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		))
					.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"		))
					.update("upt_id" 	 	 	, row.getParameter("upt_id"		))
					.insert("crt_id" 	 	 	, row.getParameter("crt_id"		))
					.update("upt_ip"   		 	, arg.remoteAddress )
					.insert("crt_ip"   	 	 	, arg.remoteAddress )
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.update("stor_sts"          , "1000"                             )

				;data.attach(rowaction);
				data.param
					.table("stor")
					.where("where stor_id  = :stor_id  " )
					//
					.insert("ctrl_id"           , row.fixParameter("ctrl_id"          ),  row.fixParamText("ctrl_id").equals(row.fixParamText("_ctrl_id")) )
					.unique("stor_id"           , row.fixParameter("stor_id"         ))
					.update("ctrl_id"           , row.fixParameter("ctrl_id"          ), !row.fixParamText("ctrl_id").equals(row.fixParamText("_ctrl_id")) )
					.unique("hq_id"           	, row.fixParameter("hq_id"           ))
					.unique("stor_grp"          , row.fixParameter("stor_grp"        ))
					.update("stor_nm"           , row.getParameter("stor_nm"         ))
					.update("stor_gb" 	 	    , row.fixParameter("stor_gb" 	     ))
					.update("warn_msg"          , row.getParameter("warn_msg"        ))
					.update("biz_no"            , row.getParameter("biz_no"          ))
					.update("biz_nm"            , row.getParameter("biz_nm"          ))
					.update("biz_gb"            , row.getParameter("biz_gb"          ))
					.update("biz_type"          , row.getParameter("biz_type"        ))
					.update("biz_kind"          , row.getParameter("biz_kind"        ))
					.update("biz_owner"			, row.getParameter("biz_owner"       ))
					.update("biz_email"			, row.getParameter("biz_email"       ))
					.update("biz_tel_no"		, row.getParameter("biz_tel_no"      ))
					.update("biz_hp_no"         , row.getParameter("biz_hp_no"       ))
					.update("biz_fax_no"        , row.getParameter("biz_fax_no"      ))
					.update("biz_zip_cd"        , row.getParameter("biz_zip_cd"      ))
					.update("biz_addr_1"        , row.getParameter("biz_addr_1"      ))
					.update("biz_addr_2"        , row.getParameter("biz_addr_2"      ))
					.update("biz_state"         , row.getParameter("biz_state"       ))
					.update("biz_city"          , row.getParameter("biz_city"        ))
					.update("biz_dong"          , row.getParameter("biz_dong"        ))
					.update("zip_cd"         	, row.getParameter("zip_cd"          ))
					.update("state"		        , row.getParameter("state"           ))
					.update("city"              , row.getParameter("city"            ))
					.update("dong"              , row.getParameter("dong"            ))
					.update("addr_1"          	, row.getParameter("addr_1"          ))
					.update("addr_2"          	, row.getParameter("addr_2"          ))
					.update("map_url"           , row.getParameter("map_url"         ))

					.update("erp_idx"         	, row.getParameter("erp_id"          ))
					.update("erp_chain"         , row.getParameter("erp_chain"       ))
					.update("stor_sts"          , "1000"                             )

//					.update("erp_pwd"           , row.getParameter("erp_pwd"    ))
//					.update("stor_fee"          , row.getParameter("stor_fee"   ))

					.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		))
					.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"		))
					.update("upt_id" 	 	 	, row.getParameter("upt_id"		))
					.insert("crt_id" 	 	 	, row.getParameter("crt_id"		))
					.update("upt_ip"   		 	, arg.remoteAddress )
					.insert("crt_ip"   	 	 	, arg.remoteAddress )
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				;data.attach(rowaction , row.fixParameter("hq_id"      )+".POS" );


				if ("1000".equals(row.getParamText("rqust_sts" ))) { } else //1000 : 개통상태 # blue
				if ("2000".equals(row.getParamText("rqust_sts" ))) { cust_sts_nm = "(미납정지)"; cust_sts = "8"; } else  //2000 : 미납정지 # fuchsia
				if ("2500".equals(row.getParamText("rqust_sts" ))) { cust_sts_nm = "(일시정지)";                 } else  // 2500 : 일시정지 # fuchsia
				if ("3000".equals(row.getParamText("rqust_sts" ))) { cust_sts_nm = "(고객해지)"; cust_sts = "9"; } else  // 3000 : 고객해지 # red
				if ("4000".equals(row.getParamText("rqust_sts" ))) { cust_sts_nm = "(직권해지)"; cust_sts = "9"; } //4000 : 직권해지 # red
				if ("5000".equals(row.getParamText("rqust_sts" ))) { cust_sts_nm = "(양도해지)"; cust_sts = "9"; } //4000 : 직권해지 # red

				if (!row.fixParamText("rqust_sts").equals(row.fixParamText("_rqust_sts"))) {
					data.param
						.table("charge")
						.where("where chrg_id  = :chrg_id  "     )
						//
						.unique("chrg_id"           , cust_sts   )
						.update("upt_dttm"			, today      )
					;data.attach(Action.update);
				}

				if (!row.getParamText("chrg_id").equals(row.getParamText("_chrg_id"))) {
					data.param
						.table("charge")
						.where("where chrg_id  = :chrg_id  " )
						//
						.unique("chrg_id"           , row.fixParameter("chrg_id"     ))
						.unique("chrg_nm"           , row.getParameter("chrg_nm"     ))
						.insert("trns_sts"          , row.getParameter("trns_sts"    ))
						//.insert("trns_sts"         , "0" )
						.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		 ))
						.update("upt_id" 	 	 	, row.getParameter("upt_id"		 ))
						.update("upt_ip"   		 	, arg.remoteAddress )
						.insert("crt_ip"   	 	 	, arg.remoteAddress )
						.insert("crt_id" 	 	 	, row.getParameter("crt_id"		))
						.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"		))
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					;data.attach(Action.modify);

//					data.param
//						.table("cust_mst")
//						.where("where cust_id  = :cust_id  " )
//						//
//						.unique("cust_id"            , row.fixParameter("chrg_id"      ))
//						.update("channel"            , "Z" )
//					;data.attach(Action.update , "N1000BONSA.POS" );
				}


				if ("1".equals(row.getParamText("_login_issue_yn"))) {
					data.param
						.table("stor")
						.where("where stor_id  = :stor_id  " )
						//
						.unique("stor_id"			, row.fixParameter("stor_id"      ))
						.update("login_id"          , row.fixParameter("login_id"     ))
						.update("login_pwd"         , row.fixParameter("login_pwd"    ))
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					;data.attach(Action.update);
				}



				// 메인에 고객을 연동하는 고객인경우
				if ("1".equals(row.getParamText("sys_clnt_reg_yn")) && !"0000".equals(row.getParamText("rqust_sts" ))){

//					data.param
//						.table("cust_mst")
//						.where("where cust_id  = :cust_id  " )
//						//
//						.unique("hq_id"           , "N1000BONSA"      )
//						.update("mngt_stor_id"    , "N1000BONSA1000"  )
//						.unique("cust_id"         , row.fixParameter("ctrl_id"         ))
//						.insert("cust_cd" 	      , row.fixParameter("ctrl_id"         ))
//						.update("cust_nm"         , cust_sts_nm +  row.getParameter("ctrl_nm"         ))
//
//						.unique("cust_gb"         , "1" )
//						.update("cust_sts"        , cust_sts                            )
//						.update("biz_no"          , row.getParamText("biz_no"          ).replaceAll("-", ""))
//						.update("biz_nm"          , row.getParameter("biz_nm"          ))
//						.update("biz_gb"          , row.getParameter("biz_gb"          ))
//						.update("biz_type"        , row.getParameter("biz_type"        ))
//						.update("biz_kind"       , row.getParameter("biz_kind"       ))
//						.update("biz_owner"       , row.getParameter("biz_owner"       ))
//						.update("biz_email"       , row.getParameter("biz_email"       ))
//						.update("biz_tel_no"      , row.getParameter("biz_tel_no"      ))
//						.update("biz_hp_no"       , row.getParameter("biz_hp_no"       ))
//						.update("biz_fax_no"      , row.getParameter("biz_fax_no"      ))
//						.update("biz_zip_cd"      , row.getParameter("biz_zip_cd"      ))
//						.update("biz_addr_1"      , row.getParameter("biz_addr_1"      ))
//						.update("biz_addr_2"      , row.getParameter("biz_addr_2"      ))
//						.update("biz_state"  , row.getParameter("biz_state"  ))
//						.update("biz_city"   , row.getParameter("biz_city"   ))
//						.update("biz_dong"   , row.getParameter("biz_dong"   ))
//
//						.update("erp_index"       , row.getParameter("ctrl_id"         ))
//
//						.update("upt_id"			, row.getParameter("upt_id"		))
//						.update("upt_ip"			, arg.remoteAddress )
//						.insert("crt_id"			, row.getParameter("crt_id"		))
//						.insert("crt_ip"			, arg.remoteAddress )
//						.update("upt_dttm"			, today )
//						.insert("crt_dttm"			, today )
//					;data.attach(Action.modify , "N1000BONSA.POS" );

//					data.param
//						.table("cust_memb")
//						.where("where mmb_id  = :mmb_id  " )
//						//
//						.unique("hq_id"        		, "N1000BONSA"      )
//						.unique("cust_id"         	, row.fixParameter("ctrl_id"          ))
//						.unique("mmb_id"         	, row.fixParameter("ctrl_id"          ))
//						.unique("point_id"        	, row.fixParameter("ctrl_id"          ))
//						.update("mmb_nm" 	      	, row.getParameter("ctrl_nm"          )) /* 매출채널 코드가 1이 아닌 경우만 실행 */
//						.insert("login_id" 	      	, row.getParameter("ctrl_id"         ))
//
//						.update("zip_cd"          	, row.getParameter("zip_cd"      	))
//						.update("state"        , row.getParameter("state"       	))
//						.update("city"         , row.getParameter("city"        	))
//						.update("dong"         , row.getParameter("dong"        	))
//						.update("addr_1"			, row.getParameter("addr_1"         ))
//						.update("addr_2"			, row.getParameter("addr_2"         ))
//
//						.update("upt_id" 	  		, row.getParameter("upt_id"		))
//						.update("upt_ip"   	  		, arg.remoteAddress )
//						.insert("crt_id" 	  		, row.getParameter("crt_id"		))
//						.insert("crt_ip"   	  		, arg.remoteAddress )
//						.update("upt_dttm"			, today )
//						.insert("crt_dttm"			, today )
//					;data.attach(Action.modify , "N1000BONSA.POS" );

//					data.param
//						.table("cust_stor")
//						.where("where stor_id   = :stor_id  " )
//						.where("and   cust_id   = :cust_id   " )
//						//
//						.unique("hq_id"				, "N1000BONSA"      )
//						.unique("stor_grp"        	, "N1000BONSA1000"      )
//						.unique("stor_id"        	, "N1000BONSA1000"      )
//						.unique("cust_id"          	, row.fixParameter("ctrl_id"          ))
//
//						.update("upt_id" 	  		, row.getParameter("upt_id"		))
//						.update("upt_ip"   	  		, arg.remoteAddress )
//						.insert("crt_id" 	  		, row.getParameter("crt_id"		))
//						.insert("crt_ip"   	  		, arg.remoteAddress )
//						.update("upt_dttm"			, today )
//						.insert("crt_dttm"			, today )
//					;data.attach(Action.modify , "N1000BONSA.POS" );
				}
			} // if action
		} // for
		data.execute();
		return null ;
	}


	/**
	 *
	 */
	public SqlResultMap getTrader(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.hq_id , a.ctrl_id        , a.stor_id  , t.stor_no					")
			.query("     , b.bas_id   as trade_id     , b.bas_nm as trade_nm					")
			.query("     , t.trade_cd, t.trade_passwd , t.trade_cg , t.trade_sts , t.usr_memo	")
			.query("     , b.row_sts															")
		;
		data.param
			.where("from   stor  a 																")
			.where("       join base_mst        b on b.prnt_id = '5104'							")
			.where("       left outer join stor_trade t on t.ctrl_id = a.ctrl_id and t.trade_id = b.bas_id " )
			.where("where  a.stor_id = :stor_id " , arg.fixParameter("stor_id"   ))

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
	public SqlResultMap setTrader(HttpRequestArgument arg) throws Exception {
//		SimpleDateFormat ymdfmt = new SimpleDateFormat("yyyyMMdd");
//		SimpleDateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
//		String ymd    = ymdfmt.format(new Date());
//		String today  = dfmt.format(new Date());
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		for(SqlResultRow row:arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				data.param
					.table("stor_trade")
					.where("where ctrl_id  = :ctrl_id  " )
					.where("and   trade_id  = :trade_id  " )
					//
					.unique("hq_id"           	, row.fixParameter("hq_id"        ))
					.unique("ctrl_id"           , row.fixParameter("ctrl_id"      ))
					.unique("stor_id"           , row.fixParameter("stor_id"      ))
					.update("stor_no"           , row.getParameter("stor_no"      ))

					.unique("trade_id"          , row.fixParameter("trade_id"     ))
					.update("trade_cd"          , row.getParameter("trade_cd"     ))
					.update("trade_passwd"      , row.getParameter("trade_passwd" ))
					.update("trade_cg"          , row.getParameter("trade_cg"     ))
					.update("trade_sts"         , row.getParameter("trade_sts"    ))

					.update("usr_memo"          , row.getParameter("usr_memo"    ))
					.update("row_sts"          	, row.getParameter("row_sts"      ))
					.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		  ))
					.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"		  ))
					.update("upt_id" 	 	 	, row.getParameter("upt_id"		  ))
					.insert("crt_id" 	 	 	, row.getParameter("crt_id"		  ))
					.update("upt_ip"   		 	, arg.remoteAddress )
					.insert("crt_ip"   	 	 	, arg.remoteAddress )
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				;data.attach(Action.modify);
				//
			}
		}
		data.execute();
		return null ;
	}


	/**
	 * 연동 서비스 정보 조회
	 */
	public SqlResultMap getAddon(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.hq_id, a.ctrl_id,  a.stor_id															")
			.query("     , t.add_on_id as tax_addon_id , t.link_auth as tax_provider , t.api_usr as tax_api_user	")
			.query("     , t.api_pwd   as tax_api_pswd , t.usr_memo as tax_user_memo , t.api_http as tax_api_http	")
			.query("     , s.add_on_id as sms_addon_id , s.link_auth as sms_provider , s.api_usr as sms_api_user	")
			.query("     , s.usr_memo  as sms_user_memo																")
			.query("     , o.add_on_id as omp_addon_id , o.link_auth as omp_provider , o.api_usr as omp_api_user	")
			.query("     , o.api_pwd   as omp_api_pswd																")
			.query("     , o.api_http  as omp_api_http , o.key_code as omp_key_code  , o.usr_memo as omp_user_memo	")
			.query("     , a.sms_pri  , a.lms_pri     , a.mms_pri													")
			.query("     , c.pos_ddns , c.pjt_id      , c.del_yn													")
		;
		data.param
			.where("from   stor  a																					")
			.where("       join head_office  c on c.hq_id = a.hq_id													")
			.where("       left outer join stor_addon t on  t.stor_id = a.stor_id and t.add_on_id = 'TAX'			")
            .where("       left outer join stor_addon s on  s.stor_id = a.stor_id and s.add_on_id = 'SMS'			")
            .where("       left outer join stor_addon o on  o.stor_id = a.stor_id and o.add_on_id = 'OMP'			")

			.where("where  a.stor_id = :stor_id " , arg.fixParameter("stor_id"   ))
			.where("and    a.row_sts = 0																			")

		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) , sort );
		}
	}




	/**
	 * 연동서비스 정보 저장
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setAddon(HttpRequestArgument arg) throws Exception {
//		SimpleDateFormat ymdfmt = new SimpleDateFormat("yyyyMMdd");
//		SimpleDateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
//		String ymd    = ymdfmt.format(new Date());
//		String today  = dfmt.format(new Date());
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		for(SqlResultRow row:arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
					data.param
						.table("stor_addon")
						.where("where stor_id    = :stor_id		")
						.where("and   add_on_id  = :add_on_id		")
						//
						.unique("stor_id"           , row.fixParameter("stor_id"      ))
						.update("add_on_id"         , "TAX"                            )

						.update("link_auth"			, row.fixParameter("tax_provider" ))
						.update("api_usr"           , row.getParameter("tax_api_user" ))
						.update("api_pwd"           , row.getParameter("tax_api_pswd" ))
						.update("api_http"          , row.getParameter("tax_api_http" ))

						.update("usr_memo"          , row.getParameter("tax_user_memo"))
						.update("row_sts"			, row.getParameter("row_sts"      ))
						.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		  ))
						.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"		  ))
						.update("upt_id" 	 	 	, row.getParameter("upt_id"		  ))
						.insert("crt_id" 	 	 	, row.getParameter("crt_id"		  ))
						.update("upt_ip"   		 	, arg.remoteAddress )
						.insert("crt_ip"   	 	 	, arg.remoteAddress )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					;data.attach(Action.modify);


					data.param
						.table("stor_addon")
						.where("where stor_id    = :stor_id		")
						.where("and   add_on_id  = :add_on_id		")
						//
						.unique("stor_id"           , row.fixParameter("stor_id"       ))
						.update("add_on_id"         , "SMS"                             )

						.update("link_auth"         , row.fixParameter("sms_provider"  ))
						.update("api_usr"           , row.getParameter("sms_api_user"  ))

						.update("usr_memo"          , row.getParameter("sms_user_memo" ))
						.update("row_sts"          	, row.getParameter("row_sts"       ))
						.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		   ))
						.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"		   ))
						.update("upt_id" 	 	 	, row.getParameter("upt_id"		   ))
						.insert("crt_id" 	 	 	, row.getParameter("crt_id"		   ))
						.update("upt_ip"   		 	, arg.remoteAddress )
						.insert("crt_ip"   	 	 	, arg.remoteAddress )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					;data.attach(Action.modify);

					data.param
						.table("stor_addon")
						.where("where stor_id    = :stor_id  " )
						.where("and   add_on_id  = :add_on_id  " )
						//
						.unique("stor_id"           , row.fixParameter("stor_id"        ))
						.update("add_on_id"         , "OMP"                             )

						.update("link_auth"         , row.fixParameter("omp_provider"   ))
						.update("api_usr"           , row.getParameter("omp_api_user"   ))
						.update("api_pwd"           , row.getParameter("omp_api_pswd"   ))
						.update("api_http"          , row.getParameter("omp_api_http"   ))
						.update("key_code"          , row.getParameter("omp_key_code"   ))

						.update("usr_memo"          , row.getParameter("omp_user_memo"  ))
						.update("row_sts"          	, row.getParameter("row_sts"        ))
						.update("upt_ui" 	 	 	, row.getParameter("upt_ui"			))
						.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"			))
						.update("upt_id" 	 	 	, row.getParameter("upt_id"			))
						.insert("crt_id" 	 	 	, row.getParameter("crt_id"			))
						.update("upt_ip"   		 	, arg.remoteAddress )
						.insert("crt_ip"   	 	 	, arg.remoteAddress )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					;data.attach(Action.modify);


					data.param
						.table("stor")
						.where("where stor_id  = :stor_id  " )
						//
						.unique("stor_id"           , row.fixParameter("stor_id"      ))

						.update("sms_pri" 	 		, row.getParameter("sms_pri"		))
						.update("lms_pri" 	 		, row.getParameter("lms_pri"		))
						.update("mms_pri" 	 		, row.getParameter("mms_pri"		))

						.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		))
						.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"		))
						.update("upt_id" 	 	 	, row.getParameter("upt_id"		))
						.insert("crt_id" 	 	 	, row.getParameter("crt_id"		))
						.update("upt_ip"   		 	, arg.remoteAddress )
						.insert("crt_ip"   	 	 	, arg.remoteAddress )
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					;data.attach(Action.update);
				}
			}
			data.execute();
			return null ;
		}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSerial(HttpRequestArgument arg ) throws Exception {

		String stor = arg.fixParamText("stor_id"  ).toUpperCase();

		if (stor.length() != 14) {
			throw new ServiceException( "등록할 매장 코드가 올바르지 않습니다." );
		}
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param
			.query("select stor_id ")
			.query("from   stor a")
			.query("where  a.stor_id = :stor_id   " , stor )
		;
		SqlResultMap map = data.selectForMap();
		if (map.size() == 0 ) {
			SqlResultRow row = new SqlResultRow();
			row.setParameter("stor_id", stor );
			map.add(row);
			return map;
		} else {
			throw new ServiceException( "사용중인 코드 입니다." );
		}
	}


}
