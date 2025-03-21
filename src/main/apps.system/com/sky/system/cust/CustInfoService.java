package com.sky.system.cust;

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
public class CustInfoService extends DefaultServiceHandler{

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort ) throws Exception {

		String search_id = arg.fixParamText("search_id");
		String find_name = arg.getParamText("find_name");

		String dt_gb = arg.getParamText("dt_gb" ); // 날짜. 0: 전체, 1:등록일, 2.수정일
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );

		String balance_gb = arg.fixParamText("balance_gb" ); // 미수금 여부 true : 미수존재

		String[] cust_gb = arg.getParamCast("cust_gb", String[].class);

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum((select sum(npay_amt) from cust_stor where  cust_id = a.cust_id and stor_grp = a.stor_grp )) as npay_amt  ")
		;
		data.param // 쿼리문  입력
			.query(" select a.hq_id    , a.stor_grp     , a.share_gp  ")
			.query("   ,  (select stor_grp from stor where stor_id = b.owner_id ) as owner_gp ,  a.sales_gb ")
			.query("   ,   b.owner_id    , (select stor_nm from stor     where stor_id = b.owner_id    ) as owner_nm ")
			.query("   ,   a.salesman_id , (select emp_nm  from usr_mst where emp_id  = a.salesman_id ) as salesman_nm ")

			.query("   ,   b.cust_id     , b.cust_cd     ,  b.cust_nm     , b.cust_gb     , b.cust_sts   , b.sts_memo  ")
			.query("   ,   c.mmb_id     , c.login_id    ,  a.bank_nm     , a.acct_no     , a.acct_own_nm 	")
			.query("   ,   b.biz_no      , b.biz_nm      ,  b.biz_tel_no  , b.biz_hp_no  , b.biz_fax_no , b.biz_email ")
			.query("   ,   b.biz_type    , b.biz_type   ,  b.biz_owner   , b.biz_tax_gb  , b.biz_gb    ")
			.query("   ,   b.biz_zip_cd  , b.biz_state   ,  b.biz_city    , b.biz_dong    , b.biz_addr_2 ")
			.query("   ,  (b.biz_state + ' '  +  b.biz_city + ' ' + b.biz_dong + ' ' + b.biz_addr_2) as biz_addr ")
			.query("   ,   c.zip_id as recv_zip_id ,  c.zip_cd as reve_zip_cd , c.state as reve_state   ")
			.query("   ,   c.city as reve_city   , c.dong as reve_dong    , c.addr_2 as reve_addr_2 ")
			.query("   ,   b.colt_schd_type , b.colt_schd_term      ")

			.query("   ,   a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm  ")
			.query("   ,   a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_2 ) as cls2_nm  ")
			.query("   ,   a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_3 ) as cls3_nm  ")
			.query("   ,   a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_4 ) as cls4_nm  ")
			.query("   ,   a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_5 ) as cls5_nm  ")
			.query("   ,   a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_6 ) as cls6_nm  ")
			.query("   ,   c.tel_no      , c.hp_no       , c.email      , c.birth_dt     , c.birth_dt_gb ")
			.query("   ,   c.recv_mail_yn ,c.recv_sms_yn , c.recv_dm_yn  , c.person_info_use_yn ")

			.query("   ,   (select sum(npay_amt) from cust_stor where  cust_id = a.cust_id and stor_grp = a.stor_grp ) as npay_amt ")
			.query("   ,   a.balance_limit ,  a.limit_control ,  b.price_no ")
			.query("   ,   b.user_memo   , a.row_sts    ")
		;

		data.param // 조건문 입력
			.where("from   cust_stor                    a ")
			.where("       join            cust_mst     b on b.cust_id = a.cust_id    ")
			.where("       join            cust_memb     c on c.mmb_id = a.cust_id    ")
			.where("where  a.stor_id = :stor_id      " , arg.getParameter("stor_id" ))
			.where("and    a.share_gp = 1       										")
			.where("and    a.clss_1 = :clss_1        " , arg.getParameter("clss_1"  ))
			.where("and    a.clss_2 = :clss_2        " , arg.getParameter("clss_2"  ))
			.where("and    a.clss_3 = :clss_3        " , arg.getParameter("clss_3"  ))
			.where("and    a.clss_4 = :clss_4        " , arg.getParameter("clss_4"  ))
			.where("and    a.clss_5 = :clss_5        " , arg.getParameter("clss_5"  ))
			.where("and    a.clss_6 = :clss_6        " , arg.getParameter("clss_6"  ))
			.where("and    b.cust_nm like %:find_name% " , find_name , "1".equals( search_id )) // 거래처명
			.where("and    b.cust_id like %:find_name% " , find_name , "2".equals( search_id )) // 거래처코드
			.where("and    b.cust_sts  = :cust_sts     " , arg.getParameter("cust_sts" )) // 거래상태가 출하정지
			.where("and    b.owner_id  = :owner_id     " , arg.getParameter("owner_id" )) // 사업장
			.where("and    b.cust_gb in (:cust_gb )    " , cust_gb ,( cust_gb.length > 0) )// 거래처 구분
			.where("and    a.crt_dttm  between :fr_dt " , fr_dt + "000000" , "1".equals( dt_gb ) ) // 등록일
			.where("                        and :to_dt " , to_dt + "235959" , "1".equals( dt_gb ) ) // 등록일
			.where("and    a.upt_dttm  between :fr_dt " , fr_dt + "000000" , "2".equals( dt_gb ) ) // 수정일
			.where("                        and :to_dt " , to_dt + "235959" , "2".equals( dt_gb ) ) // 수정일
			.where("and    a.npay_amt  <> :npay_amt   " , 0 , "true".equals( balance_gb ) ) // 미수금 있을 경우
			.where("and    b.price_no = :price_no " ,  arg.getParameter("price_no" ) )
			.where("and    a.row_sts = :row_sts " ,  arg.getParamText("row_sts" ) ) // 사용여부
			.where("and    a.row_sts < 2           							" )
			.where("order by b.cust_nm								            " )

		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1), sort );
		}
	}





	/**
	 * 미수현황 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getBalanceSale(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(b.amount) as amount, sum(a.npay_amt) as npay_amt ")
		;
		data.param // 쿼리문  입력
			.query("select a.inv_dt , a.inv_no   									")
			.query("	 , b.amount , a.npay_amt 				  					")
			.query("	, a.stor_id , ( select stor_nm from stor where stor_id = a.stor_id) as stor_nm ")
		;
		data.param // 조건문  입력
			.where("  from sale_balance a 											")
			.where(" 	   join sale_mst b on b.inv_no = a.inv_no 					")
			.where(" where a.stor_grp = 	:stor_grp   " , arg.fixParameter("stor_grp"))
			.where("   and a.cust_id  = 	:cust_id    " , arg.fixParameter("cust_id" ))
			.where("   and a.npay_amt <> 0				 							")
			.where("   and a.row_sts = 0				 							")
			.where("order by a.inv_dt , a.inv_no				 					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows , (page==1) );
		}
	}

	/**
	 * 미수현항 상세조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getBalanceItem(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(a.qty) as qty ")
			.total("    ,    sum(a.sply_amt) as sply_amt, sum(a.tax) as tax, sum(a.amount) as amount ")
		;

		data.param // 쿼리문  입력
			.query("select a.item_name , a.item_code  										")
			.query("     , a.qty , a.price , a.sply_amt , a.tax , a.amount 	 				")
			.query("     , (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name ")
		;
		data.param // 쿼리문  입력
			.where("from sale_dtl a  													")
			.where(" where a.stor_id = 	:stor_id   " , arg.fixParameter("stor_id"	))
			.where("   and a.inv_no   = 	:inv_no    " , arg.fixParameter("inv_no" 	))
			.where("   and a.row_sts = 0				 							")
			.where("order by a.item_name				 									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows , (page==1) );
		}
	}

	/**
	 * 고객리스트 상세 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getCustMember(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param // 쿼리문  입력
			.query("select a.login_id , a.mmb_nm  , a.tel_no , a.hp_no , a.email 				")
		;
		data.param // 쿼리문  입력
			.where("  from cust_memb a 															")
			.where(" where a.cust_id  =  :cust_id   " , arg.fixParameter("cust_id"				))
			.where(" and   a.mmb_id  <>  :cust_id   " , arg.fixParameter("cust_id"				))
			.where(" and   a.row_sts = 0				 										")
			.where("order by a.mmb_nm				 											")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows , (page==1) );
		}
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
				String owner_gp = row.fixParamText("owner_gp");
				String stor_grp = row.fixParamText("stor_grp");
				String sales_gb = row.fixParamText("sales_gb");
				String old_sales_gb = row.fixParamText("_sales_gb");


				if (owner_gp.equals(stor_grp)) { /* 작업매장과 관리매장이 일치할 경우만 수정 가능 */

				   data.param
		        	.table("cust_mst")
		        	.where("where cust_id  = :cust_id  " )
		        	//
		        	.unique("hq_id"             , row.fixParameter("hq_id"        ))
		        	.update("owner_id"          , row.fixParameter("owner_id"        ))
		        	.unique("cust_id"           , row.fixParameter("cust_id"         ))
		        	.insert("cust_cd" 	        , row.fixParameter("cust_cd"         ))
		        	.update("cust_nm"           , row.getParameter("cust_nm"         ))
		        	.unique("cust_gb"           , row.fixParameter("cust_gb"         ))

		        	.update("cust_sts"          , row.getParameter("cust_sts"        ))
		        	.update("sts_memo"          , row.getParameter("sts_memo"        ))

		        	.update("price_no"          , row.getParameter("price_no"        ))

		        	.update("biz_gb"            , row.getParameter("biz_gb"          ))
		        	.update("biz_no"            , row.getParameter("biz_no"          ))
		        	.update("biz_nm"            , row.getParameter("biz_nm"          ))
		        	.update("biz_tel_no"        , row.getParameter("biz_tel_no"      ))
		        	.update("biz_hp_no"         , row.getParameter("biz_hp_no"      ))
		        	.update("biz_fax_no"        , row.getParameter("biz_fax_no"      ))
		        	.update("biz_email"         , row.getParameter("biz_email"       ))

		        	.update("biz_type"			, row.getParameter("biz_type"        ))
		        	.update("biz_type"			, row.getParameter("biz_type"       ))
		        	.update("biz_owner"			, row.getParameter("biz_owner"       ))
		        	.update("biz_tax_gb"		, row.getParameter("biz_tax_gb"      ))
		        	.update("biz_zip_cd"		, row.getParameter("biz_zip_cd"      ))
		        	.update("biz_state"	, row.getParameter("biz_state"       ))
		        	.update("biz_city"		, row.getParameter("biz_city"        ))
		        	.update("biz_dong"		, row.getParameter("biz_dong"        ))
		        	.update("biz_addr_2"		, row.getParameter("biz_addr_2"       ))
		        	.update("colt_schd_type"	, row.getParameter("colt_schd_type"     ))
		        	.update("colt_schd_term"	, row.getParameter("colt_schd_term"     ))
					.update("user_memo"			, row.getParameter("user_memo"       ))

					.update("upt_id"			, row.getParameter("upt_id"		))
					.update("upt_ip"			, new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_id"			, row.getParameter("crt_id"		))
					.insert("crt_ip"			, new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		        	.action = rowaction ;
				;data.attach();

				data.param
					.table("cust_memb")
					.where("where mmb_id  = :mmb_id  " )
					//
					.unique("hq_id"         , row.fixParameter("hq_id"        ))
					.unique("cust_id"       , row.fixParameter("cust_id"         ))
					.unique("mmb_id"        , row.fixParameter("mmb_id"         ))
					.unique("point_id"      , row.fixParameter("mmb_id"         ))
        			.update("mmb_nm" 	    , row.getParameter("cust_nm"          ) , (!"1".equals(row.fixParameter("sales_gb")))  ) /* 매출채널 코드가 1이 아닌 경우만 실행 */
        			.insert("memb_gb" 	    , row.getParameter("memb_gb"         ))
        			.update("login_id" 	    , row.getParameter("login_id"        ))

					.update("zip_id"        , row.getParameter("recv_zip_id"      ))
					.update("zip_cd"        , row.getParameter("reve_zip_cd"      ))
					.update("state"    , row.getParameter("reve_state"       ))
					.update("city"     , row.getParameter("reve_city"        ))
					.update("dong"     , row.getParameter("reve_dong"        ))
					.update("addr_1"        , row.getParameter("reve_state") + " " + row.getParameter("reve_city" ) + " " + row.getParameter("reve_dong" ) )
					.update("addr_2"        , row.getParameter("reve_addr_2"       ))

					.update("upt_id"		, row.getParameter("upt_id"		))
					.update("upt_ip"		, new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_id"		, row.getParameter("crt_id"		))
					.insert("crt_ip"   	  	, new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
        			.action = rowaction ;
				    ;data.attach();

				}

				if (rowaction == Action.insert && "1".equals(row.fixParameter("sales_gb")) ) { /* 신규 생성시 매출채널 구분값이 1인 경우  */

					data.param  /* 매출채널 기초코드를 조회하여 000 코드를 제외한 나머지 코드로 cust_memb 생성 */
						.query("insert into cust_memb t ( 																	")
						.query("       t.sales_id 																			")
						.query("     , t.hq_id , t.cust_id , t.mmb_id , t.mmb_nm , t.memb_gb , t.memb_sts 				")
						.query("     , t.point_id , t.row_ord , t.row_sts 												")
						.query("     , t.upt_id , t.upt_ip , t.upt_dttm , t.crt_id , t.crt_ip , t.crt_dttm 	")
						.query(" ) 																							")
						.query("select x.bas_id 																			")
						.query("     , y.hq_id , y.cust_id , y.mmb_id + x.bas_cd, x.bas_nm , '3' , y.memb_sts 		")
						.query("     , y.mmb_id + x.bas_cd , y.row_ord , y.row_sts 									")
						.query("     , y.upt_id , y.upt_ip , y.upt_dttm , y.crt_id , y.crt_ip , y.crt_dttm 	")
						.query("from  cust_memb y 																			")
						.query("      join base_mst x on x.prnt_id = '5105' and x.bas_id not in y.sales_id 				")
						.query("where y.mmb_id     =   :mmb_id  			" 				, row.fixParameter("mmb_id"  	))
					;data.attach(Action.direct);

					data.param		/* 매출채널 명으로 cust_memb의 mmb_nm 을 업데이트 */
						.query("update cust_memb t set  																	")
						.query("       mmb_nm = ( select bas_nm from base_mst where bas_id = t.sales_id )  				")
						.query(" where t.mmb_id = :mmb_id  			" 				, row.fixParameter("mmb_id"  		))
					;data.attach(Action.direct);
				}

				/* 수정시 매출채널 구분값이 1인 경우 & 이전 매출채널 구분값이 0인 경우 */
				if (rowaction == Action.update && "1".equals(sales_gb) && "0".equals(old_sales_gb)   ) {
					/* 매출채널구분값이 0 -> 1로 변경되는 경우  */
					data.param  /* 매출채널 기초코드를 조회하여 000 코드를 제외한 나머지 코드로 cust_memb 생성 */
						.query("insert into cust_memb t ( 																	")
						.query("       t.sales_id 																			")
						.query("     , t.hq_id , t.cust_id , t.mmb_id , t.mmb_nm , t.memb_gb , t.memb_sts 				")
						.query("     , t.point_id , t.row_ord , t.row_sts 												")
						.query("     , t.upt_id , t.upt_ip , t.upt_dttm , t.crt_id , t.crt_ip , t.crt_dttm 	")
						.query(" ) 																							")
						.query("select x.bas_id 																			")
						.query("     , y.hq_id , y.cust_id , y.mmb_id + x.bas_cd, x.bas_nm , '3' , y.memb_sts 		")
						.query("     , y.mmb_id + x.bas_cd , y.row_ord , y.row_sts 									")
						.query("     , y.upt_id , y.upt_ip , y.upt_dttm , y.crt_id , y.crt_ip , y.crt_dttm 	")
						.query("from ( select a.bas_id , a.bas_cd, a.bas_nm												")
						.query("		from  base_mst a 																	")
						.query("		where a.prnt_id = '5105' 															")
						.query("		and   a.bas_id not in ( select sales_id from cust_memb 							")
						.query("												where cust_id =  :cust_id 	)	" , row.fixParameter("cust_id" ))
						.query(") x , cust_memb y 																			")
						.query("where y.mmb_id = :mmb_id 							"		, row.fixParameter("mmb_id"  	))
					;data.attach(Action.direct);
				}

				data.param
					.table("cust_stor")
					.where("where stor_grp  = :stor_grp  " )
					.where("and   cust_id   = :cust_id   " )
					//
					.unique("hq_id"        , row.fixParameter("hq_id"        ))
					.unique("stor_grp"        , row.fixParameter("stor_grp"        ))
					.unique("stor_id"        , row.fixParameter("stor_id"        ))
					.unique("cust_id"         , row.fixParameter("cust_id"         ))

					.update("sales_gb"        , row.fixParameter("sales_gb"        ))
					.update("share_gp"        , row.fixParameter("share_gp"        ))

					.update("salesman_id"     , row.fixParameter("salesman_id"     ))

					.update("clss_1" 	      , row.getParameter("clss_1"         ))
					.update("clss_2" 	      , row.getParameter("clss_2"         ))
					.update("clss_3" 	      , row.getParameter("clss_3"         ))
					.update("clss_4" 	      , row.getParameter("clss_4"         ))
					.update("clss_5" 	      , row.getParameter("clss_5"         ))
					.update("clss_6" 	      , row.getParameter("clss_6"         ))

					.update("acct_no"       , row.getParameter("acct_no"         ))
					.update("bank_nm"       , row.getParameter("bank_nm"         ))
					.update("acct_own_nm"   , row.getParameter("acct_own_nm"         ))

					.update("balance_limit" , row.getParameter("balance_limit"   ))
					.update("limit_control" , row.getParameter("limit_control"   ))

					.update("row_sts"       , row.getParameter("row_sts"       ))
					.update("upt_id" 	    , row.getParameter("upt_id"		))
					.update("upt_ip"   	    , new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_id" 	    , row.getParameter("crt_id"		))
					.insert("crt_ip"   	    , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);


				if (rowaction == Action.insert && "1".equals(row.fixParameter("share_gp"))   ) { /* 신규 생성시 직영점 구분값이 1인 경우 */

					data.param  /* 작업 직영점을 제외한 나머지 직영점에 cust_stor 생성 */
						.query("insert into cust_stor t ( 												")
						.query("       t.stor_id , t.hq_id , t.stor_grp , t.share_gp , t.sales_gb 	")
						.query("     , t.cust_id  , t.price_no 											")
						.query("     , t.clss_1  , t.clss_2  , t.clss_3                              ")
						.query("     , t.clss_4  , t.clss_5  , t.clss_6                              ")
						.query("     , t.salesman_id , t.bank_nm  , t.acct_no  , t.acct_own_nm 				")
						.query("     , t.balance_limit  , t.limit_control  	                            ")
						.query(" ) 																		")
						.query("select x.stor_id , y.hq_id , y.stor_grp , y.share_gp , y.sales_gb 	")
						.query("     , y.cust_id  , y.price_no 											")
						.query("     , y.clss_1  , y.clss_2  , y.clss_3                              ")
						.query("     , y.clss_4  , y.clss_5  , y.clss_6                              ")
						.query("     , y.salesman_id , y.bank_nm  , y.acct_no  , y.acct_own_nm 				")
						.query("     , y.balance_limit  , y.limit_control   	                        ")
						.query("from  cust_stor y 														")
						.query("      join stor x on  x.stor_grp = :stor_grp " , row.fixParameter("stor_grp"  	))
						.query("                   and x.stor_id not in y.stor_id and x.stor_sts < '3000' and x.row_sts = 0   ")
						.query("where y.cust_id  = :cust_id                   " , row.fixParameter("cust_id"  	))
					;data.attach(Action.direct);
				}
			}

			/* 같은 그룹 서버에 연동을 하기위한 처리를 한다.  */
//			for(SqlResultRow syc:arg.getParameter("synchro", SqlResultMap.class)){
//				if (row.getParamText("hq_id").equals( syc.getParamText("hq_id"))) {
//
//					if (!"0".equals(syc.getParamText("old_sync")) ) {
//						data.param
//							.table("data_sync")
//							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner  " )
//							.where("  and pk_val = :pk_val and pk_hq = :pk_hq  " )
//							//
//							.insert("sync_id"            , CustInfoTasker.OLD_CUST_SHARE      )
//							.unique("pk_owner"           , row.fixParameter("owner_id"        ))
//							.unique("pk_val"           , row.fixParameter("cust_id"         ))
//							.unique("pk_hq"           , row.fixParameter("hq_id"        ))
//							.update("del_use_yn"          , rowaction.equals(Action.delete) ? "1"  : "0" )
//							.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//							.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//						;data.attach( Action.modify );
//					}
//
//					// 에이젼트 연동 처리
//					if (!"".equals(syc.getParamText("hq_pos_id")) ) {
//						data.param
//							.table("data_sync")
//							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner  " )
//							.where("  and pk_val = :pk_val and pk_hq = :pk_hq  " )
//							//
//							.insert("sync_id"            , CustInfoTasker.AGT_CUST_SHARE  )
//							.unique("pk_owner"           , row.fixParameter("owner_id"    ))
//							.unique("pk_val"           , row.fixParameter("cust_id"     ))
//							.unique("pk_hq"           , row.fixParameter("hq_id"    ))
//							.update("del_use_yn"          , rowaction.equals(Action.delete) ? "1"  : "0" )
//							.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//							.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//						;data.attach( Action.modify).async(CustInfoTasker.class, CustInfoTasker.AGT_CUST_SHARE ); // 에이젼트
//
//						data.param
//							.query(" insert into data_sync (                              " )
//							.query("         sync_id,   pk_owner,   pk_val,   pk_hq  " )
//							.query( " )                                                   " )
//							.query(" select :sync_id, a.stor_id, a.cust_id , a.hq_id  " )
//							.query(" from   cust_stor a                                  " )
//							.query(" where  a.stor_grp = :stor_grp                        " , row.fixParameter("stor_grp"    ))
//							.query(" and    a.cust_id  = :cust_id                         " , row.fixParameter("cust_id"     ))
//							.query(" and  ( a.stor_id , a.cust_id  ) not in (            " )
//							.query("        select pk_owner , pk_val                    " )
//							.query("        from   data_sync                              " )
//							.query("        where  sync_id  = :sync_id                    " , CustStoreTasker.AGT_CUST_STORE  )
//							.query("        and    pk_owner = a.stor_id                  " )
//							.query("      )                 " )
//							.query(" and    a.row_sts < 2 " )
//						;data.attach(Action.direct).async(CustStoreTasker.class, CustStoreTasker.AGT_CUST_STORE );
//
//
//
//					}
//				}
//			} /* 같은 그룹 서버에 연동을 하기위한 처리 종료 */

		}
		data.execute();
		return null ;
	}

}
