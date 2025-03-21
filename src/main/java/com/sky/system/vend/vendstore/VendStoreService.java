package com.sky.system.vend.vendstore;

import java.text.SimpleDateFormat;
import java.util.Date;

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
public class VendStoreService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		String dt_gb = arg.getParamText("dt_gb" );
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );
//
		String balance_yn = arg.fixParamText("balance_yn" ); // 미지급금 여부 true : 미수존재

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum( a.npay_amt ) as npay_amt  ")
		;
		data.param
			.query("select a.hq_id      , a.stor_grp    															")
			.query("     , b.mngt_stor_id , (select stor_nm from stor where stor_id = b.mngt_stor_id ) as owner_nm	")
			.query("     , a.pur_emp_id , (select emp_nm from usr_mst where emp_id = a.pur_emp_id ) as salesman_nm	")
			.query("     , b.vend_id    , b.vend_cd   , b.vend_nm   , b.vend_gb										")
			.query("     , b.vend_sts   , b.sts_memo																")
			.query("     , b.login_id   , b.login_nm  , b.tel_no    , b.hp_no        , b.email						")
			.query("     , b.biz_gb     , b.biz_no    , b.biz_nm    , b.biz_tel_no   , b.biz_hp_no					")
			.query("     , b.biz_fax_no , b.biz_email 																")
			.query("     , b.biz_kind   , b.biz_type  , b.biz_owner , b.biz_taxtn_gb								")
			.query("     , b.biz_zip_cd , b.biz_state , b.biz_city  , b.biz_dong     , b.biz_addr_2					")
			.query("     , b.colt_schd_type, b.colt_schd_term,  a.bank_id , c.bas_nm as bank_nm, a.acct_no			")
			.query("     , a.acct_own_nm																			")
			.query("     , a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm				")
			.query("     , a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_2 ) as cls2_nm				")
			.query("     , a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_3 ) as cls3_nm				")
			.query("     , a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_4 ) as cls4_nm				")
			.query("     , a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_5 ) as cls5_nm				")
			.query("     , a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_6 ) as cls6_nm				")
			.query("     , a.user_memo   , b.user_memo as share_memo , a.row_sts, a.npay_amt							")
			.query("     , a.crt_dttm   , a.upt_dttm																")
		;
		data.param // 조건문  입력
			.where("from   vend_stor  a																				")
			.where("       join            vend_mst     b on b.vend_id = a.vend_id									")
			.where("       left outer join base_mst     c on c.bas_id = a.bank_id									")
			.where("where  a.stor_grp = :stor_grp     " , arg.fixParameter("stor_grp" ))
			.where("and    a.clss_1   = :clss_1       " , arg.getParameter("clss_1" ))
			.where("and    a.clss_2   = :clss_2       " , arg.getParameter("clss_2" ))
			.where("and    a.clss_3   = :clss_3       " , arg.getParameter("clss_3" ))
			.where("and    a.clss_4   = :clss_4       " , arg.getParameter("clss_4" ))
			.where("and    a.clss_5   = :clss_5       " , arg.getParameter("clss_5" ))
			.where("and    a.clss_6   = :clss_6       " , arg.getParameter("clss_6" ))
			.where("and    b.vend_nm  like %:vend_nm% " , arg.getParameter("vend_nm" ) ) // 거래처명
			.where("and    b.mngt_stor_id    = :mngt_stor_id  " , arg.getParameter("mngt_stor_id" ))

	    	.where("and    b.vend_gb   = :vend_gb   " , arg.getParameter("vend_gb" ))
			.where("and    b.vend_sts  = :vend_sts  " , arg.getParameter("vend_sts"  ) ) // 거래상태
			.where("and    a.row_sts   = :row_sts	" , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts   < :row_sts   " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where("and    a.crt_dttm  between :fr_dt " , fr_dt + "000000" , "1".equals( dt_gb ) ) // 등록일
			.where("                       and :to_dt " , to_dt + "235959" , "1".equals( dt_gb ) ) // 등록일
			.where("and    a.upt_dttm  between :fr_dt " , fr_dt + "000000" , "2".equals( dt_gb ) ) // 수정일
			.where("                       and :to_dt " , to_dt + "235959" , "2".equals( dt_gb ) ) // 수정일
			.where("and    a.npay_amt  <> :npay_amt      " , 0 , "true".equals( balance_yn ) ) // 미지급금 있을 경우
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1), sort );
		}
	}


	/**
	 * 다이얼로그
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize   ")
		;
		data.param
			.query("select a.stor_grp    , a.vend_id      , b.vend_cd     , b.vend_nm     , b.vend_gb	")
			.query("     , b.biz_owner   , b.biz_tel_no   , b.biz_fax_no  , b.biz_nm					")
		;
		data.param
			.where("from   vend_stor a																	")
			.where("       join     vend_mst  b on b.vend_id = a.vend_id								")
			.where("where  a.stor_grp    = :stor_grp   " , arg.fixParameter("stor_grp"))
			.where("and    b.vend_sts    = :vend_sts   " , arg.getParameter("vend_sts"))					// 거래상태 조건이 들어온경우
			.where("and    b.vend_gb     = :vend_gb    " , arg.getParameter("vend_gb"))						// 거래상태 조건이 들어온경우
			.where("and    b.vend_nm like %:vend_nm%   " , arg.getParameter("vend_nm"))
			.where("and    a.row_sts   = :row_sts      " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("and    a.row_sts  <= :row_sts      " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
		;
		return data.selectForMap(page, rows,  (page == 1) );
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
				// 자신이 소유주 이면서... 거래구분이 1인 경우만 공통에 업데이트 한다.
					data.param
		        		.table("vend_mst")
		        		.where("where vend_id  = :vend_id  " )
		        		//
		        		.unique("hq_id"           , row.fixParameter("hq_id"))
		        		.update("mngt_stor_id"    , row.fixParameter("mngt_stor_id"))
		        		.unique("vend_id"         , row.fixParameter("vend_id"))
		        		.insert("vend_cd" 	      , row.fixParameter("vend_cd"))
		        		.update("vend_nm"         , row.getParameter("vend_nm"))
		        		.unique("vend_gb"         , row.fixParameter("vend_gb"))

		        		.update("vend_sts"        , row.fixParameter("vend_sts"))
		        		.update("sts_memo"        , row.getParameter("sts_memo"))
		        		.update("tel_no"          , row.getParameter("tel_no"))
		        		.update("hp_no"           , row.getParameter("hp_no"))
		        		.update("email"           , row.getParameter("email"))

		        		.update("biz_gb"          , row.getParameter("biz_gb"))
		        		.update("biz_no"          , row.getParameter("biz_no"))
		        		.update("biz_nm"          , row.getParameter("biz_nm"))
		        		.update("biz_tel_no"      , row.getParameter("biz_tel_no"))
		        		.update("biz_hp_no"       , row.getParameter("biz_hp_no"))
		        		.update("biz_fax_no"      , row.getParameter("biz_fax_no"))
		        		.update("biz_email"       , row.getParameter("biz_email"))

		        		.update("biz_kind"        , row.getParameter("biz_kind"))
		        		.update("biz_type"        , row.getParameter("biz_type"))
		        		.update("biz_owner"       , row.getParameter("biz_owner"))
		        		.update("biz_taxtn_gb"    , row.getParameter("biz_taxtn_gb"))
		        		.update("biz_zip_cd"      , row.getParameter("biz_zip_cd"))
		        		.update("biz_state"       , row.getParameter("biz_state"))
		        		.update("biz_city"        , row.getParameter("biz_city"))
		        		.update("biz_dong"        , row.getParameter("biz_dong"))

		        		.update("biz_addr_1"      , row.getParameter("biz_addr_1"))
		        		.update("biz_addr_2"      , row.getParameter("biz_addr_2"))
		        		.update("colt_schd_type"  , row.getParameter("colt_schd_type"))
		        		.update("colt_schd_term"  , row.getParameter("colt_schd_term"))

		        		.update("user_memo"        , row.getParameter("share_memo"))

		        		.update("upt_id"          , row.fixParameter("upt_id"))
		        		.update("upt_ip"          , new SqlParamText("'" + arg.remoteAddress + "'"))
		        		.insert("crt_id"          , row.fixParameter("crt_id"))
		        		.insert("crt_ip"          , new SqlParamText("'" + arg.remoteAddress + "'"))
				        .update("upt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
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

						.update("pur_emp_id"        , row.getParameter("pur_emp_id"     ))
						.update("bank_id"           , row.getParameter("bank_id"         ))
						.update("acct_no"           , row.getParameter("acct_no"      ))
						.update("acct_own_nm"       , row.getParameter("acct_own_nm"      ))


						.update("user_memo"          , row.getParameter("user_memo"       ))
						.update("row_sts"           , row.getParameter("row_sts"       ))

						.update("upt_id"            , row.fixParameter("upt_id"       ))
						.update("upt_ip"            , arg.remoteAddress )
						.insert("crt_id"            , row.fixParameter("crt_id"       ))
						.insert("crt_ip"            , arg.remoteAddress )
				        .update("upt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				        .insert("crt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        ;data.attach(rowaction);
				//}
			}
		}
		data.execute();
		return null ;
	}



	/**
	 * 미지급 master 정보
	 */
	public SqlResultMap getSales(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,  sum(b.inv_amt) as inv_amt , sum(a.npay_amt) as npay_amt  ")
		;
		data.param
			.query("select b.inv_dt															")
			.query("      ,b.inv_no															")
			.query("      ,b.inv_amt														")
			.query("      ,a.npay_amt														")
			.query("	  ,a.stor_id 														")
			.query("	  ,( select stor_nm from stor where stor_id = a.stor_id) as stor_nm	")
		;
		data.param
			.where("  from recv_balance a													")
			.where("       join ist_mst b on b.inv_no = a.inv_no							")
			.where(" where 1=1																")
			.where("   and a.stor_grp = :stor_grp ", arg.fixParameter("stor_grp"))
			.where("   and a.vend_id  = :vend_id  ", arg.fixParameter("vend_id"))
			.where("   and a.row_sts  = 0													")
			.where("   and b.row_sts  = 0													")
			.where(" order by a.inv_no desc													")
	    ;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}

	/**
	 * 미지급 detail 정보
	 */
	public SqlResultMap getItems(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize												")
			.total("     , sum(a.qty)        as qty        ,  sum(a.sply_amt) as sply_amt	")
			.total("     , sum(a.tax_amt)    as tax_amt    , sum(a.inv_amt) as inv_amt		")
			.total("     , sum(a.txfree_amt) as txfree_amt									")
		;
		data.param
			.query("select a.seq_dsp														")
			.query("     , a.item_code															")
			.query("     , a.item_name															")
			.query("     , a.item_spec															")
			.query("     , r.bas_nm as brand_nm												")
			.query("     , m.bas_nm as mfg_nm												")
			.query("     , b.unit_name															")
			.query("     , a.piece_qty														")
			.query("     , a.qty															")
			.query("     , a.pri															")
			.query("     , a.sply_amt														")
			.query("     , a.tax_amt														")
			.query("     , a.txfree_amt														")
			.query("     , a.inv_amt														")
		;
		data.param
			.where("  from recv_item a														")
			.where("       left outer join itm_unit b on b.unit_idcd = a.unit_idcd				")
			.where("       left outer join itm_mst i  on i.item_idcd = a.item_idcd				")
			.where("       left outer join base_mst r on r.bas_id = i.brand_id				")
			.where("       left outer join base_mst m on m.bas_id = i.maker_id				")
			.where(" where a.inv_no = :inv_no         ", arg.fixParameter("inv_no"))
			.where("   and a.row_sts = 0													")
			.where(" order by a.seq_top, a.line_seqn											")
	    ;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}


}
