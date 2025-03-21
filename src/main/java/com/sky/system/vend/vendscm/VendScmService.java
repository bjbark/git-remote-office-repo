package com.sky.system.vend.vendscm;


import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.thirdparty.encrypt.BCrypt;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class VendScmService extends DefaultServiceHandler{

	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum( a.npay_amt ) as npay_amt  ")
		;
		data.param
			.query("select a.hq_id        , a.stor_grp																	")//, , d.stor_id a.stor_nm
			.query("     , b.mngt_stor_id , (select stor_nm from stor where stor_id = b.mngt_stor_id ) as owner_nm		")
			.query("     , a.sales_man_id , (select emp_nm from usr_mst where emp_id = a.sales_man_id ) as salesman_nm	")
			.query("     , b.vend_id      , b.vend_cd     ,  b.vend_nm  , b.vend_gb										")
			.query("     , b.vend_sts     , b.sts_memo																	")
			.query("     , b.login_id     , b.login_nm    , b.tel_no    , b.hp_no      , b.email						")
			.query("     , b.biz_gb       , b.biz_no      , b.biz_nm    , b.biz_tel_no , b.biz_hp_no					")
			.query("     , b.biz_fax_no   , b.biz_email   , b.biz_kind  , b.biz_type   , b.biz_owner  , b.biz_taxtn_gb	")
			.query("     , b.biz_zip_cd   , b.biz_state   , b.biz_city  , b.biz_dong   , b.biz_addr_1 , b.biz_addr_2	")
			.query("     , b.colt_schd_type , b.colt_schd_term , a.bank_id , c.bas_nm as bank_nm      , a.acct_no		")
			.query("     , a.acct_own_nm																				")
			.query("     , a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm					")
			.query("     , a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_2 ) as cls2_nm					")
			.query("     , a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_3 ) as cls3_nm					")
			.query("     , a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_4 ) as cls4_nm					")
			.query("     , a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_5 ) as cls5_nm					")
			.query("     , a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_6 ) as cls6_nm					")
			.query("     , a.user_memo    , b.user_memo as share_memo , a.row_sts, a.npay_amt								")
			.query("     , a.crt_dttm    , a.upt_dttm																	")
			.query("     , b.taekbae_add_amt , b.taekbae_fee_amt    , b.taekbae_notax_yn								")
		;
		data.param // 조건문  입력
			.where("from   vend_stor a																					")
			.where("       join vend_mst  b            on b.vend_id = a.vend_id											")
			.where("       left outer join base_mst  c on c.bas_id  = a.bank_id											")
			.where("where  a.stor_grp = :stor_grp     " , arg.fixParameter("stor_grp" ))
			.where("and    a.clss_1   = :clss_1       " , arg.getParameter("clss_1" ))
			.where("and    a.clss_2   = :clss_2       " , arg.getParameter("clss_2" ))
			.where("and    a.clss_3   = :clss_3       " , arg.getParameter("clss_3" ))
			.where("and    a.clss_4   = :clss_4       " , arg.getParameter("clss_4" ))
			.where("and    a.clss_5   = :clss_5       " , arg.getParameter("clss_5" ))
			.where("and    a.clss_6   = :clss_6       " , arg.getParameter("clss_6" ))
			.where("and    b.vend_nm like %:vend_nm%  " , arg.getParameter("vend_nm" ) ) // 거래처명
			.where("and    b.mngt_stor_id = :mngt_stor_id " , arg.getParameter("mngt_stor_id" ))

			.where("and    b.vend_gb =  '2'																				")  // 직납사만

			.where("and    b.vend_sts = :vend_sts " , arg.getParameter("vend_sts"))											// 거래상태
			.where("and    a.row_sts  = :row_sts  " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts  < :row_sts  " , "2" , "".equals(arg.getParamText("row_sts" )) )
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1), sort );
		}
	}


	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				data.param
		        	.table("vend_mst")
		        	.where("where vend_id  = :vend_id  " )
		        	//
		        	.unique("hq_id"           , row.fixParameter("hq_id"        ))
		        	.update("mngt_stor_id"    , row.fixParameter("mngt_stor_id"        ))
		        	.unique("vend_id"         , row.fixParameter("vend_id"         ))
		        	.insert("vend_cd" 	      , row.fixParameter("vend_cd"         ))
		        	.update("vend_nm"         , row.getParameter("vend_nm"         ))
		        	.unique("vend_gb"         , row.fixParameter("vend_gb"         ))

		        	.update("vend_sts"        , row.fixParameter("vend_sts"        ))
		        	.update("sts_memo"        , row.getParameter("sts_memo"        ))

		        	.update("tel_no"          , row.getParameter("tel_no"          ))
		        	.update("hp_no"           , row.getParameter("hp_no"          ))
		        	.update("email"           , row.getParameter("email"           ))

		        	.update("biz_gb"          , row.getParameter("biz_gb"          ))
		        	.update("biz_no"          , row.getParameter("biz_no"          ))
		        	.update("biz_nm"          , row.getParameter("biz_nm"          ))
		        	.update("biz_tel_no"      , row.getParameter("biz_tel_no"      ))
		        	.update("biz_hp_no"       , row.getParameter("biz_hp_no"      ))
		        	.update("biz_fax_no"      , row.getParameter("biz_fax_no"      ))
		        	.update("biz_email"       , row.getParameter("biz_email"       ))

		        	.update("biz_kind"        , row.getParameter("biz_kind"        ))

		        	.update("biz_type"        , row.getParameter("biz_type"       ))
		        	.update("biz_owner"       , row.getParameter("biz_owner"       ))
		        	.update("biz_taxtn_gb"    , row.getParameter("biz_taxtn_gb"      ))
		        	.update("biz_zip_cd"      , row.getParameter("biz_zip_cd"      ))
		        	.update("biz_state"       , row.getParameter("biz_state"       ))
		        	.update("biz_city"        , row.getParameter("biz_city"        ))
		        	.update("biz_dong"        , row.getParameter("biz_dong"        ))

		        	.update("biz_addr_1"      , row.getParameter("biz_addr_1"       ))
		        	.update("biz_addr_2"      , row.getParameter("biz_addr_2"       ))
		        	.update("colt_schd_type"  , row.getParameter("colt_schd_type"     ))
		        	.update("colt_schd_term"  , row.getParameter("colt_schd_term"     ))

		        	.update("taekbae_add_amt" , row.getParameter("taekbae_add_amt" ))
		        	.update("taekbae_fee_amt" , row.getParameter("taekbae_fee_amt" ))
		        	.update("taekbae_notax_yn", row.getParameter("taekbae_notax_yn"))

		        	.update("user_memo"        , row.getParameter("share_memo"      ))
					.update("row_sts"         , row.getParameter("row_sts"       ))


		        	.update("upt_ui"          , row.fixParameter("upt_ui"       ))
		        	.update("upt_id"          , row.fixParameter("upt_id"       ))
		        	.update("upt_ip"          , arg.remoteAddress )
		        	.update("upt_dttm"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )

		        	.insert("crt_ui"          , row.fixParameter("crt_ui"       ))
		        	.insert("crt_id"          , row.fixParameter("crt_id"       ))
		        	.insert("crt_ip"          , arg.remoteAddress )
		        	.insert("crt_dttm"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')") )
				;data.attach(rowaction);

				data.param
					.table("vend_stor")
					.where("where stor_grp  = :stor_grp  " )
					.where("and   vend_id   = :vend_id   " )
					//
					.unique("hq_id"             , row.fixParameter("hq_id"        ))
					.unique("stor_grp"          , row.fixParameter("stor_grp"        ))
					.unique("vend_id"           , row.fixParameter("vend_id"         ))

					.update("clss_1"            , row.getParameter("clss_1"         ))
					.update("clss_2"            , row.getParameter("clss_2"         ))
					.update("clss_3"            , row.getParameter("clss_3"         ))
					.update("clss_4"            , row.getParameter("clss_4"         ))
					.update("clss_5"            , row.getParameter("clss_5"         ))
					.update("clss_6"            , row.getParameter("clss_6"         ))

					.update("sales_man_id"      , row.getParameter("sales_man_id"     ))
					.update("bank_id"           , row.getParameter("bank_id"         ))
					.update("acct_no"           , row.getParameter("acct_no"      ))
					.update("acct_own_nm"       , row.getParameter("acct_own_nm"      ))


					.update("user_memo"          , row.getParameter("user_memo"       ))
					.update("row_sts"           , row.getParameter("row_sts"       ))
		        	.update("upt_ui"            , row.fixParameter("upt_ui"       ))
		        	.update("upt_id"            , row.fixParameter("upt_id"       ))
		        	.update("upt_ip"            , arg.remoteAddress )

		        	.insert("crt_ui"            , row.fixParameter("crt_ui"       ))
		        	.insert("crt_id"            , row.fixParameter("crt_id"       ))
		        	.insert("crt_ip"            , arg.remoteAddress )
			        .update("upt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

				;data.attach(rowaction);
			}

		}
		data.execute();
		return null ;
	}

	public SqlResultMap setPasswd(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		if ("login_id".equals(arg.fixParamText("chang_gb"))) {
			data.param
				.table("vend_mst")
				.where("where vend_id = :vend_id  " )
				//
				.unique("vend_id"       , arg.fixParameter("vend_id"          ))
				.update("login_id"      , arg.getParameter("login_id"         ))
				.update("upt_id"        , arg.fixParameter("upt_id"        ))
				.update("upt_ip"        , arg.remoteAddress				       )
		        .update("upt_dttm"      , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.action = Action.update ;
			;data.attach(Action.update).execute();
		} else
		if ("login_pwd".equals(arg.fixParamText("chang_gb"))) {
			data.param
				.table("vend_mst")
				.where("where vend_id = :vend_id  " )
				//
				.unique("vend_id"       , arg.fixParameter("vend_id"         ))
				.update("login_pwd"     , BCrypt.hashpw( arg.fixParamText("login_pwd" ) , BCrypt.gensalt() ))  // Encryptor.SHA(arg.fixParamText("login_pwd"     )) )
				.update("upt_id"        , arg.fixParameter("upt_id"        ))
				.update("upt_ip"        , arg.remoteAddress 					)
		        .update("upt_dttm"      , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

			;data.attach(Action.update).execute();
		}
		return null ;
	}
}

