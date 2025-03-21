package com.sky.system.recv;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class RecvTaxListService extends DefaultServiceHandler{

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.hq_id       , a.stor_grp    , a.stor_nm   ")
			.query("     , b.stor_id     , (select stor_nm from stor where stor_id = b.stor_id ) as stor_nm ")
			.query("   ,   b.recv_id     , b.recv_cd     ,  b.reve_nm     ,  b.recv_gb     ")
			.query("   ,   c.mmb_id      , c.memb_gb     ,  c.login_id    " )
			.query("   ,   b.biz_no      , b.biz_nm      ,  b.biz_tel_no  , b.biz_fax_no   , b.biz_email ")
			.query("   ,   b.biz_type    , b.biz_type    ,  b.biz_owner   , b.biz_tax_gb                 ")
			.query("   ,   b.biz_zip_cd  , b.biz_state   ,  b.biz_city    , b.biz_dong     , b.biz_addr_2 ")
			.query("   ,   b.colt_schd_type , b.colt_schd_term ,  a.acct_no     , a.bank_nm      , a.acct_own_nm   ")

			.query("   ,   a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 and prnt_id = '9120' ) as cls1_nm  ")
			.query("   ,   a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_1 and prnt_id = '9121' ) as cls2_nm  ")
			.query("   ,   a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_1 and prnt_id = '9122' ) as cls3_nm  ")
			.query("   ,   a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_1 and prnt_id = '9123' ) as cls4_nm  ")
			.query("   ,   a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_1 and prnt_id = '9124' ) as cls5_nm  ")
			.query("   ,   a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_1 and prnt_id = '9125' ) as cls6_nm  ")
			.query("   ,   a.user_memo   , a.row_sts  , d.npay_amt  ")
			.query("from   recv_store                    a ")
			.query("       join            ist_mst      b on b.recv_id = a.recv_id  ")
			.query("       join            recv_memb    c on c.mmb_id  = a.recv_id ")
			.query("       left outer join recv_balance d on b.recv_id = a.recv_id  and d.stor_id = :stor_id " , arg.fixParameter("stor_id"))
			.query("where  a.stor_grp = :stor_grp    " , arg.fixParameter("stor_grp" ))
			.query("and    a.reve_nm like %:reve_nm% " , arg.getParameter("reve_nm"  ))
			.query("and    a.row_sts < 2           " )
		;
	    return data.selectForMap();
	}


	/**
	 * 다이얼로그
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDialog(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.hq_id    , a.stor_grp    ")
			.query("     , b.stor_id    , (select stor_nm from stor where stor_id = b.stor_id ) as stor_nm ")
			.query("   ,   b.recv_id     , b.recv_cd     ,  b.reve_nm     ,  b.recv_gb     ")
			.query("   ,   c.mmb_id     , c.memb_gb     ,  c.login_id    " )
			.query("   ,   b.biz_no      , b.biz_nm      ,  b.biz_tel_no  , b.biz_fax_no   , b.biz_email ")
			.query("   ,   b.biz_type    , b.biz_type   ,  b.biz_owner   , b.biz_tax_gb                 ")
			.query("   ,   b.biz_zip_cd  , b.biz_state   ,  b.biz_city    , b.biz_dong     , b.biz_addr_2 ")
			.query("   ,   b.colt_schd_type , b.colt_schd_term ,  a.acct_no     , a.bank_nm      , a.acct_own_nm   ")

			.query("   ,   a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm  ")
			.query("   ,   a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls2_nm  ")
			.query("   ,   a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls3_nm  ")
			.query("   ,   a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls4_nm  ")
			.query("   ,   a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls5_nm  ")
			.query("   ,   a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls6_nm  ")
			.query("   ,   a.user_memo   , a.row_sts  , d.npay_amt  ")
			.query("from   recv_store                    a ")
			.query("       join            ist_mst     b on b.recv_id = a.recv_id  ")
			.query("       join            recv_memb     c on c.mmb_id = a.recv_id ")
			.query("       left outer join recv_balance  d on b.recv_id = a.recv_id  and d.stor_id = :stor_id " , arg.fixParameter("stor_id"))
			.query("where  a.stor_grp = :stor_grp    " , arg.fixParameter("stor_grp" ))
			.query("and    a.reve_nm like %:reve_nm% " , arg.getParameter("reve_nm"  ))
			.query("and    a.row_sts < 2           " )
		;
	    return data.selectForMap();
	}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

			} else {
				data.param
		        	.table("ist_mst")
		        	.where("where recv_id  = :recv_id  " )
		        	//
		        	.unique("hq_id"        , row.fixParameter("hq_id"        ))
		        	.update("stor_id"        , row.fixParameter("stor_id"        ))
		        	.unique("recv_id"         , row.fixParameter("recv_id"         ))
		        	.insert("recv_cd" 	      , row.fixParameter("recv_cd"         ))
		        	.update("reve_nm"         , row.getParameter("reve_nm"         ))
		        	.update("recv_gb"         , row.getParameter("recv_gb"         ))
		        	.update("biz_no"          , row.getParameter("biz_no"          ))
		        	.update("biz_nm"          , row.getParameter("biz_nm"          ))
		        	.update("biz_tel_no"      , row.getParameter("biz_tel_no"      ))
		        	.update("biz_fax_no"      , row.getParameter("biz_fax_no"      ))
		        	.update("biz_email"       , row.getParameter("biz_email"       ))

		        	.update("biz_type"        , row.getParameter("biz_type"        ))


		        	.update("biz_type"      , row.getParameter("biz_type"         ))
		        	.update("biz_owner"       , row.getParameter("biz_owner"          ))
		        	.update("biz_tax_gb"    , row.getParameter("biz_tax_gb"       ))
		        	.update("biz_zip_cd"    , row.getParameter("biz_zip_cd"       ))
		        	.update("biz_state", row.getParameter("biz_state"   ))
		        	.update("biz_city" , row.getParameter("biz_city"    ))
		        	.update("biz_dong" , row.getParameter("biz_dong"    ))
		        	.update("biz_addr_2"    , row.getParameter("biz_addr_2"       ))
		        	.update("colt_schd_type", row.getParameter("colt_schd_type"   ))
		        	.update("colt_schd_term", row.getParameter("colt_schd_term"   ))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		        	.action = rowaction ;
				;data.attach();


				data.param
					.table("recv_memb")
					.where("where mmb_id  = :mmb_id  " )
					//
					.unique("hq_id"         , row.fixParameter("hq_id"        ))
					.unique("recv_id"       , row.fixParameter("recv_id"        ))
					.unique("mmb_id"        , row.fixParameter("mmb_id"         ))
        			.update("mmb_nm" 	    , row.getParameter("reve_nm"        ))
        			.insert("memb_gb" 	    , row.getParameter("memb_gb"          , "2" ))
        			.update("login_id" 	    , row.getParameter("login_id"        ))
        			.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
        			.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
        			.action = rowaction ;
				;data.attach();

				data.param
					.table("recv_store")
					.where("where stor_grp  = :stor_grp  " )
					.where("and   recv_id   = :recv_id   " )
					//
					.unique("hq_id"           , row.fixParameter("hq_id"        ))
					.unique("stor_grp"        , row.fixParameter("stor_grp"        ))
					.unique("recv_id"         , row.fixParameter("recv_id"         ))

					.update("cls1_cd" 	      , row.getParameter("cls1_cd"         ))
					.update("cls2_cd" 	      , row.getParameter("cls2_cd"         ))
					.update("cls3_cd" 	      , row.getParameter("cls3_cd"         ))
					.update("cls4_cd" 	      , row.getParameter("cls4_cd"         ))
					.update("cls5_cd" 	      , row.getParameter("cls5_cd"         ))
					.update("cls6_cd" 	      , row.getParameter("cls6_cd"         ))

					.update("acct_no"         , row.getParameter("acct_no"         ))
					.update("bank_nm"         , row.getParameter("bank_nm"         ))
					.update("acct_own_nm"     , row.getParameter("acct_own_nm"         ))


					.update("user_memo"       , row.getParameter("user_memo"       ))
					.update("row_sts"        , row.getParameter("row_sts"       ))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction ;
				;data.attach();
			}
		}
		data.execute();
		return null ;
	}

}
