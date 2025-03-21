package com.sky.system.basic;

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
public class EpoCourseService extends DefaultServiceHandler{

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select a.stor_id    , (select stor_nm from stor where stor_id = a.stor_id) as stor_nm   ")
			.query("     , a.cours_id   , a.cours_nm   , a.add_offr_yn ")
			.query("     , a.row_sts   , a.user_memo   ,  a.corp_id   ")
		;
		data.param
			.where("from   epo_course  a                  ")
			.where("where  a.prnt_id = :prnt_id    " , "0" )
			.where("and    a.stor_id = :stor_id      " , arg.getParameter("stor_id"  ))
			.where("and    a.row_sts < 2           " )
			.where("order by a.corp_id, a.stor_id           " )
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}


	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 쿼리문  입력
			.query("select a.cours_id , a.scheme_id  , a.week_id     , a.ship_dy  ")
			.query("     , a.fr_tm     , a.to_tm      , a.fr_dy       , a.to_dy    ")
			.query("     , a.add_fr_tm , a.add_to_tm  , a.add_fr_dy   , a.add_to_dy   ")
		;
		data.param
			.where("from   epo_scheme a")
			.where("where  a.cours_id =:cours_id " , arg.fixParameter("cours_id" ) )
        ;

	    return data.selectForMap();
	}


	/**
	 * 지정점, 미지정점 조회
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getStore(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String storecheck = (String)arg.getParameter("stor_check");

		if ("0".equals(storecheck)) {	/* 발주점 */
			data.param
				.total("select count(1) as maxsize " )
			;
			data.param
				.query("select a.cours_id   									")
				.query("     , b.stor_id     , b.stor_nm	, b.cust_id 		")
				.query("     , b.biz_owner    , b.biz_tel_no  				 	")
				.query("     ,(b.biz_addr_1 + ' ' + b.biz_addr_2 ) as biz_addr  ")
			;
			data.param
				.where("from     epo_course a   								")
				.where("         join stor b on b.stor_id = a.stor_id   		")
				.where("where    a.prnt_id =  :prnt_id " , arg.fixParameter("prnt_id" ) )
				.where("and      b.stor_nm  like  %:search%  " , arg.getParameter("find_name" ) ) /* 조회해야할 발주점 */
				.where("and      a.row_lvl =    2  							")
				.where("order by a.stor_id 									")
			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1), sort );
			}
		} else {    /* 미등록 발주점 */
			data.param
				.total("select count(1) as maxsize " )
			;
			data.param
				.query("select a.stor_id     , a.stor_nm	, a.cust_id							")
				.query("     , a.biz_owner    , a.biz_tel_no  									")
				.query("     ,(a.biz_addr_1 + ' ' + a.biz_addr_2 ) as biz_addr  				")
			;
			data.param
				.where("from stor a															")
				.where("     join cust_mst c on a.cust_id = c.cust_id 						")
				.where("where  a.corp_id  = :corp_id 		"  , arg.fixParameter("corp_id"))
				.where("and    a.stor_sts = '1000' 											")
				.where("and    a.stor_id <> :stor_id 		"  , arg.fixParameter("stor_id")) // 수주점은 등록 불가
				.where("and    a.stor_nm like  %:find_name% "  , arg.getParameter("find_name")) // 조회할 발주점
				.where("and    a.stor_id not in  												")
				.where("       ( select  b.stor_id    											")
				.where("     	 from  epo_course b 											")
				.where("     	 where  b.prnt_id = :prnt_id "  , arg.fixParameter("prnt_id" ))
				.where("     	 and  b.row_lvl =   2        									")
				.where("  	   )  																")
				.where("order by a.stor_id 													")
			;
		}
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	/**
	 * 다이얼로그
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDialog(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize " )
		;

		data.param // 쿼리문  입력
			.query("select a.stor_id    , (select stor_nm from stor where stor_id = a.stor_id) as stor_nm ")
			.query("     , a.cours_id   , a.cours_nm    ")
			.query("     , a.add_offr_yn , a.row_sts    ")
		;
		data.param
			.where("from   epo_course  a                  ")
			.where("where  a.corp_id = :corp_id      " , arg.fixParameter("corp_id" )  )
			.where("and    a.stor_id = :stor_id      " , arg.getParameter("stor_id"  ))
			.where("and    a.cours_id = :cours_id    " , arg.getParameter("cours_id"  ))
			.where("and    a.prnt_id = :prnt_id    " , arg.getParameter("prnt_id"  ))
			.where("and    a.row_sts < 2           " )
			;
	    return data.selectForMap(page, rows , (page ==1));
	}


	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg, int page, int rows) throws Exception{
		DataMessage data = arg.newStorage("POS");

		data.param // 쿼리문  입력
		.query("select a.stor_id    , (select stor_nm from stor where stor_id = a.stor_id) as stor_nm   ")
		.query("     , a.add_offr_yn , a.corp_id ")
		.query("     , a.cours_id   , a.cours_nm    ")
		.query("     , a.row_sts    ")
		.query("from   epo_course  a                  ")
		.query("where  a.corp_id = :corp_id      " , arg.fixParameter("corp_id" ))
		.query("and    a.stor_id = :stor_id      " , arg.getParameter("stor_id"  ))
		.query("and    a.cours_id = :cours_id    " , arg.getParameter("cours_id"  ))
		.query("and    a.prnt_id = :prnt_id    " , "0"     )
	;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			SqlResultRow course = info.get(0);

			data.clear();
			data.param // 쿼리문  입력
				.query("select a.cours_id , a.scheme_id  , a.week_id     , a.ship_dy  ")
				.query("     , a.fr_tm     , a.to_tm      , a.fr_dy       , a.to_dy    ")
				.query("     , a.add_fr_tm , a.add_to_tm  , a.add_fr_dy   , a.add_to_dy   ")
				.query("from   epo_scheme a")
				.query("where  a.cours_id =:cours_id " , course.fixParameter("cours_id" ) )
				.query("order by a.week_id  " )

			;
			course.put("product", data.selectForMap() );
		    return info ;
		} else {
			return info ;
		}
	}

	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				/* 상세  삭제 */
	        	data.param
        			.table("epo_scheme")
        			.where("where  cours_id  		= :cours_id   	" )
        			//
        			.unique("cours_id"  , row.fixParameter("cours_id"))
        			.action = rowaction
        		; data.attach();

	        	/* 정보 삭제 (발주점) */
	        	data.param
	        		.table("epo_course")
	        		.where("where  prnt_id  		= :cours_id   	" )
	        		//
	        		.unique("cours_id"  , row.fixParameter("cours_id"))
	        		.action = rowaction
	        	; data.attach();

        		/* 정보 삭제 (수주점) */
	        	data.param
	        		.table("epo_course")
	        		.where("where  cours_id  		= :cours_id   	" )
	        		//
	        		.unique("cours_id"  , row.fixParameter("cours_id"))
	        		.action = rowaction
	        	; data.attach();

			} else {
				if ("0".equals(row.getParameter("prnt_id"    )) ){ // 수주점일 경우
					data.param
		        		.table("epo_course")
		        		.where("where cours_id  = :cours_id   " )
		        		//
		        		.unique("corp_id"         , row.fixParameter("corp_id"     ))
		        		.unique("stor_id"         , row.fixParameter("stor_id"     ))
		        		.unique("cours_id"        , row.fixParameter("cours_id"    ))
		        		.update("cours_nm"        , row.getParameter("cours_nm"    ))
		        		.unique("prnt_id"        , row.getParameter("prnt_id"    ))

		        		.update("add_offr_yn"      , row.getParameter("add_offr_yn"  ))
		        		.update("user_memo"        , row.getParameter("user_memo"    ))
		        		.update("row_lvl"        , row.getParameter("row_lvl"    ))
		        		.update("row_sts"        , row.getParameter("row_sts"    ))
		        		.update("upt_id"        , row.getParameter("upt_id"    ))
		        		.update("upt_ip"   	   , new SqlParamText("'" + arg.remoteAddress + "'"))
		        		.insert("crt_id" 	   , row.getParameter("crt_id"	 ))
		        		.insert("crt_ip"   	   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		        		.action = rowaction ;
					;data.attach();
		        	if(row.getParameter("product", SqlResultMap.class) != null){
		        		setProduct(arg, data , row.getParameter("product", SqlResultMap.class) );
		        	}
				}
			}
		}
		data.execute();
		return null ;
	}

	/**
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setProduct(HttpRequestArgument arg, DataMessage data, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

			} else {
	        	data.param
		        	.table("epo_scheme")
		        	.where("where  scheme_id  	= :scheme_id   	" )
		        	//
		        	.unique("scheme_id"         , row.fixParamText("cours_id") + row.fixParamText("week_id") )
		        	.unique("cours_id"         , row.fixParameter("cours_id"      ))
		        	.unique("week_id"           , row.fixParameter("week_id"        ))
		        	.update("ship_dy"           , row.getParameter("ship_dy"        ))
					.update("fr_tm"             , row.getParameter("fr_tm"          ))
					.update("to_tm"             , row.getParameter("to_tm"          ))
					.update("fr_dy"             , row.getParameter("fr_dy"          ))
					.update("to_dy"             , row.getParameter("to_dy"          ))
					.update("add_fr_tm"         , row.getParameter("add_fr_tm"      ))
					.update("add_to_tm"         , row.getParameter("add_to_tm"      ))
					.update("add_fr_dy"         , row.getParameter("add_fr_dy"      ))
					.update("add_to_dy"         , row.getParameter("add_to_dy"      ))

					.update("user_memo" 	    , row.getParameter("user_memo"		))
					.update("row_sts" 		, row.getParameter("row_sts"		))
					.update("upt_id" 		, row.getParameter("upt_id"		))
					.update("upt_ip"   	    , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("crt_id" 		, row.getParameter("crt_id"		))
					.insert("crt_ip"   	    , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction ;
	        	;data.attach();
			}
		}
		return null ;
	}


	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setStore(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_checker"));
			if (rowaction == Action.delete) {
				data.param
	        		.table("epo_course")
	        		.where("where stor_id   = :stor_id    " )
	        		.where("and   cours_id  = :cours_id   " )
	        		//
	        		.unique("cours_id"        , row.fixParameter("cours_id"    ))
	        		.unique("stor_id"         , row.fixParameter("stor_id"     ))
	        		.action = rowaction
				;data.attach();
			} else {
				data.param
				.table("epo_course")
				.where("where cours_id  = :cours_id   " )
				//
				.unique("corp_id"         , row.fixParameter("corp_id"     ))
				.unique("stor_id"         , row.fixParameter("stor_id"     ))
				.unique("cours_id"        , row.fixParamText("cours_id"    ))
				.update("cours_nm"        , row.getParameter("cours_nm"    ))
				.update("prnt_id"        , row.getParameter("prnt_id"    ))
				.update("row_lvl"        , row.getParameter("row_lvl"    ))
				.update("row_sts"        , row.getParameter("row_sts"    ))
				.update("upt_id"        , row.getParameter("upt_id"    ))
				.update("upt_ip"   	   , arg.remoteAddress 				  )
				.update("crt_id" 	   , row.getParameter("crt_id"	 ))
				.insert("crt_ip"   	   , arg.remoteAddress				  )
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.action = rowaction
				;data.attach();

				/* 수주점에 발주점의 cust_stor 정보 등록 */
				data.param
				.query("insert into cust_stor t ( 																")
				.query("       t.hq_id  , t.stor_grp  , t.share_gp  , t.stor_id  								")
				.query("     , t.cust_id   , t.price_no  														")
				.query("     , t.clss_1   , t.clss_2   , t.clss_3   , t.clss_4  								")
				.query("     , t.clss_5   , t.clss_6   , t.salesman_id  										")
				.query("     , t.bank_nm   , t.acct_no   , t.acct_own_nm  										")
				.query("     , t.user_memo , t.crt_nm , t.crt_dttm 												")
				.query(")																						")
				.query("select 																					")
				.query(" 		x.hq_id  , x.stor_grp  , x.share_gp  , y.stor_id 								")
				.query("	,   x.cust_id   , x.price_no 														")
				.query("	, 	x.clss_1   , x.clss_2   , x.clss_3   , x.clss_4 								")
				.query("	,	x.clss_5   , x.clss_6   , x.salesman_id 										")
				.query("	, 	x.bank_nm   , x.acct_no   , x.acct_own_nm 										")
				.query("	, 	x.user_memo , x.crt_nm , x.crt_dttm	 											")
				.query("from   (																				")
				.query("      select																			")
				.query("      		  b.hq_id  , b.stor_grp  , b.share_gp  										")
				.query("     		, b.cust_id   , b.price_no  												")
				.query("    	 	, b.clss_1   , b.clss_2   , b.clss_3   , b.clss_4  							")
				.query("     		, b.clss_5   , b.clss_6   , b.salesman_id  									")
				.query("     		, b.bank_nm   , b.acct_no   , b.acct_own_nm  								")
				.query("     		, '수주점 등록 자동생성' as user_memo 												")
				.query("     		, :crt_nm  as crt_nm 			"	, row.fixParameter("crt_nm"))
//				.query("     		, to_char(sysdate, 'yyyymmddhh24miss') as crt_dttm 							")
				.query("     		, dbo.to_char(getdate(), 'yyyymmddhh24miss') as crt_dttm 					")
				.query("		from  cust_mst a																")
				.query("			  join cust_stor b on b.cust_id = a.cust_id and b.stor_id = a.owner_id		")
				.query("	   where  a.cust_id = :cust_id  		" 	, row.fixParameter("cust_id"    		))
				.query("         and  a.cust_id not in ( select cust_id 										")
				.query("                		      	 from   cust_stor 										")
				.query("                		         where  stor_id = :stor_id  " , row.fixParameter("receiver_id"    ))
				.query("                		         and    cust_id  = a.cust_id  )							")
				.query("    ) x , stor y																		")
				.query("where y.stor_id  = :stor_id   " , row.fixParameter("receiver_id"  	))
				.action = Action.direct;
				;data.attach();
			}
		}
		data.execute();
		return null ;
	}
}









