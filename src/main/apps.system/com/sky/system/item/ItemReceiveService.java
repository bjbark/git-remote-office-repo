package com.sky.system.item;

import java.util.StringTokenizer;

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
public class ItemReceiveService extends DefaultServiceHandler {


	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		String search_id = arg.getParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

		String recv_gb = arg.getParamText("recv_gb" );
		String hq_gb = arg.getParamText("hq_gb" );


		DataMessage data = arg.newStorage();
		data.param // 쿼리문  입력
			.total(" select  count(1) as maxsize  																			")
			;

		data.param // 쿼리문  입력
			.query("select    case when s.mst_itm_id is null then '0' else '1' end as use_yn   ,  a.hq_id ,  a.share_yn ")
			.query("      ,  a.owner_id  , (select stor_nm from stor where stor_id = a.owner_id ) as owner_nm       	")
			.query("      ,  a.item_sts  , a.mst_itm_id     , a.mst_itm_cd   , a.item_name    , a.item_spec 					")
			.query("      ,  a.class_id  , (select clss_desct from item_class where class_id = a.class_id ) as class_nm ")
			.query("      ,  a.mfg_id    , (select bas_nm  from base_mst  where bas_id  = a.mfg_id    ) as mfg_nm 		")
			.query("      ,  a.brand_id  , (select bas_nm  from base_mst  where bas_id  = a.brand_id  ) as brand_nm 	")
			.query("      ,  a.origin_id , (select bas_nm  from base_mst  where bas_id  = a.origin_id ) as origin_nm 	")
			.query("      ,  a.etc01_id  , (select bas_nm  from base_mst  where bas_id  = a.etc01_id ) as etc01_nm 		")
			.query("      ,  a.etc02_id  , (select bas_nm  from base_mst  where bas_id  = a.etc02_id ) as etc02_nm 		")
			.query("      ,  a.emp_id    , (select emp_nm  from usr_mst  where emp_id  = a.emp_id   ) as emp_nm 		")
			.query("      ,  a.green_item_yn  ,  a.soent_item_yn 														")
			.query("      ,  a.stk_itm_yn   ,  a.sales_id    , a.item_gb 												")
			.query("      , (select bas_nm from base_mst where bas_id = a.sales_id  ) as sales_nm 						")
			.query("      ,  a.user_memo  ,  a.row_sts 																	")
			;
		data.param
			.where(" from    itm_grp  a 																				")
			.where("         left outer join itm_stor s on s.stor_id = :stor_id " , arg.fixParameter("stor_id"  ))
			.where("         							 and s.mst_itm_id = a.mst_itm_id and s.item_idcd = a.mst_itm_id 	")
			.where(" where   a.owner_id in ( select stor_id from stor where  stor_grp = :stor_grp  )  " , arg.fixParameter("stor_grp"   ))
			.where(" and     a.row_sts 	= 0 																			")
			.where(" and     a.class_id in ( select  class_id  from item_class a start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))
			.where(" and     a.mst_itm_id in ( select mst_itm_id from scan_mst  where scan_cd like :scan_cd% ) " , find_name , "1".equals( search_id ) ) // 품목코드
			;
			if ("2".equals( search_id ) && !"".equals(find_name)){
				StringTokenizer st = new StringTokenizer(find_name," ");
				if (st.countTokens() == 1) {
					data.param.where(" and  a.find_name like %:find_name% " , st.nextToken().toLowerCase());
				} else {
					int i = 0;
					String and = "";
					data.param.where(" and  (  ");
					while(st.hasMoreTokens()){
						data.param.where( and +  " a.find_name like %:find_name" + i++ + "% " , st.nextToken().toLowerCase()  );
						and = " and ";
					}
					data.param.where(" ) ");
				}
			}

			if     ( "0".equals(recv_gb) ){ data.param.where(" and s.mst_itm_id  is null    ");	} // 0 : 상품없음
			else if( "1".equals(recv_gb) ){	data.param.where(" and s.mst_itm_id  is not null"); } // 1 : 상품있음
			if     ( "0".equals(hq_gb) )  { data.param.where(" and a.share_yn  = 0   		"); } // 0 : 매장상품
			else if( "1".equals(hq_gb) )  {	data.param.where(" and a.share_yn = 1 			"); } // 1 : 공통상품

		data.param
			.where(" order by a.mst_itm_cd		 																				")
			;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}



	/**
	 * 단위 품목 정보
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력

			.query("select  a.item_code    , a.item_idcd , a.item_name ,  a.item_spec 				")
			.query("   ,    a.unit_idcd    ,(select unit_name from item_unit where unit_idcd = a.unit_idcd ) as unit_name ")
			.query("   ,    a.unt_qty   , a.mst_itm_id 										")
			.query("   ,    a.cst_pri   , a.stad_sale_pri 									")
			.query("   ,    a.min_ost_pri, a.sale_pri_1 , a.sale_pri_2 						")
			.query("   ,    a.sale_pri_3, a.sale_pri_4  , a.sale_pri_5 						")
			.query("   ,    a.po_pri    , a.po_pri_type , a.po_pri_rt 						")
			.query("   ,    a.user_memo  , a.row_sts 										")
			.query("from     itm_mst  a 													")
			.query("where    a.mst_itm_id    = :mst_itm_id " , arg.fixParameter("mst_itm_id"  ))
			.query("and      a.row_sts = 0 													")
			.query("order by a.item_code		 												")
		;
		return data.selectForMap();
	}


	/**
	 * 기준 사업장으로 수신
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		data.param
		.query("select to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm from dual  ")
		;
		SqlResultRow date = data.selectForRow();

		String ip =  arg.remoteAddress.toString() ;
		String dt = date.fixParameter("upt_dttm").toString() ;
		data.clear();

		for(SqlResultRow row:map){
			String shareyn = row.getParamText("share_yn");

			if( "1".equals(row.getParameter("stor_grp")) || "2".equals(row.getParameter("stor_grp") )   ){ /* 본사, 직영점 : 매입처, 구매가 수신 */

					if ( !"0".equals(shareyn) ){

						data.param
							.query("	insert into  													")
							.query("		itm_stor t ( t.hq_id 									")
							.query("					, t.stor_grp 									")
							.query("					, t.stor_id 									")
							.query("					, t.mst_itm_id 									")
							.query("					, t.item_idcd 									")
							.query("					, t.vend_id 									")
							.query("					, t.upt_id 									")
							.query("					, t.upt_ip 									")
							.query("					, t.upt_dttm 									")
							.query("					, t.crt_id 									")
							.query("					, t.crt_ip 									")
							.query("					, t.crt_dttm 									")
							.query("	) 																")
							.query("	select  														")
							.query("		a.hq_id 													")
							.query("		, 	:stor_grp  	" 			, row.fixParameter("stor_grp"  	))
							.query("		, 	:stor_id  	" 			, row.fixParameter("stor_id"  	))
							.query("		, a.mst_itm_id  												")
							.query("		, a.item_idcd 												")
							.query("		, a.vend_id 												")
							.query("        , :upt_id  as upt_id      		" , row.fixParameter("upt_id" 	))
							.query("        , :upt_ip  as upt_ip      		" , ip )
							.query("        , :upt_dttm  as upt_dttm      		" , dt )
							.query("        , :upt_id  as crt_id      							")
							.query("        , :upt_ip  as crt_ip      							")
							.query("        , :upt_dttm  as crt_dttm      							")
							.query("	from  itm_mst a 												")
							.query("	where a.mst_itm_id = 	:mst_itm_id  " , row.fixParameter("mst_itm_id"  	))
							.query("	  and a.row_sts = 0											")
							.query("	  and a.item_idcd  not in (  										")
							.query("			  			select  									")
							.query("			  				distinct item_idcd  						")
							.query("			  			  from itm_stor  							")
							.query("			  			 where stor_id = :stor_id  " , row.fixParameter("stor_id" ))
							.query("			  			  and  mst_itm_id 	= :mst_itm_id   " , row.fixParameter("mst_itm_id"  ))
							.query("			  			  and  row_sts = 0						")
							.query("			  				) 										")
							;data.attach(Action.direct);
					} else {
						data.param
							.query("	insert into  													")
							.query("		itm_stor t ( t.hq_id 									")
							.query("					, t.stor_grp 									")
							.query("					, t.stor_id 									")
							.query("					, t.mst_itm_id 									")
							.query("					, t.item_idcd 									")
							.query("					, t.stad_sale_pri 									")
							.query("					, t.vend_id 									")
							.query("					, t.po_pri 									")
							.query("					, t.po_pri_type 								")
							.query("					, t.po_pri_rt 								")
							.query("					, t.upt_id 									")
							.query("					, t.upt_ip 									")
							.query("					, t.upt_dttm 									")
							.query("					, t.crt_id 									")
							.query("					, t.crt_ip 									")
							.query("					, t.crt_dttm 									")
							.query("	) 																")
							.query("	select  														")
							.query("		  a.hq_id 												")
							.query("		, a.stor_grp 												")
							.query("		, 	:stor_id  	" 			, row.fixParameter("stor_id"  	))
							.query("		, a.mst_itm_id  												")
							.query("		, a.item_idcd 												")
							.query("		, a.stad_sale_pri 												")
							.query("		, a.vend_id 												")
							.query("		, a.po_pri 												")
							.query("		, a.po_pri_type 											")
							.query("		, a.po_pri_rt 											")
							.query("        , :upt_id  as upt_id      		" , row.fixParameter("upt_id" 	))
							.query("        , :upt_ip  as upt_ip      		" , ip )
							.query("        , :upt_dttm  as upt_dttm      		" , dt )
							.query("        , :upt_id  as crt_id      							")
							.query("        , :upt_ip  as crt_ip      							")
							.query("        , :upt_dttm  as crt_dttm      							")
							.query("	from  itm_stor a 												")
							.query("	where a.stor_id = 	:owner_id  " , row.fixParameter("owner_id"  ))
							.query("	  and a.row_sts = 0											")
							.query("	  and a.mst_itm_id = 	:mst_itm_id   " , row.fixParameter("mst_itm_id"  	))
							.query("	  and a.item_idcd  not in (  										")
							.query("			  			select  									")
							.query("			  				distinct item_idcd  						")
							.query("			  			  from itm_stor  							")
							.query("			  			 where stor_id = :stor_id  " , row.fixParameter("stor_id" ))
							.query("			  			  and  row_sts = 0						")
							.query("			  			  and  mst_itm_id 	= :mst_itm_id   " , row.fixParameter("mst_itm_id"  ))
							.query("			  				) 										")
							;data.attach(Action.direct);
					}

			}

//			/* 공통 상품인 경우만 - 같은 그룹 서버에 연동을 하기위한 처리를 한다.  */
//			for(SqlResultRow syc:arg.getParameter("synchro", SqlResultMap.class)){
//
//				if (row.getParamText("hq_id").equals( syc.getParamText("hq_id"))) {
//					// 에이젼트 연동 처리
//					if (!"".equals(syc.getParamText("hq_pos_id").trim() )) {
//						data.param
//							.table("data_sync")
//							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner    " )
//							.where("  and pk_val = :pk_val and pk_hq = :pk_hq    " )
//							//
//							.insert("sync_id"            , ItemStoreTasker.AGT_ITEM_STORE    )
//							.unique("pk_owner"           , row.fixParameter("stor_id"      ))
//							.unique("pk_val"           , row.fixParameter("mst_itm_id"       ))
//							.unique("pk_hq"           , syc.fixParameter("hq_id"      ))
//							.update("del_use_yn"          , "0" )
//							.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//							.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//						;data.attach( Action.modify).async(ItemStoreTasker.class, ItemStoreTasker.AGT_ITEM_STORE);
//					}
//				} /* 같은 그룹 서버에 연동을 하기위한 처리 종료 */
//			}
		}


		data.execute();
		return null ;
	}


	/**
	 * 지점상품으로 전송
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setStoreAdd(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		data.param
//		.query("select to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm from dual  ")
			.query("select dbo.to_char(getdate(), 'yyyymmddhh24miss') as upt_dttm   ")
		;
		SqlResultRow date = data.selectForRow();

		String ip =  arg.remoteAddress.toString() ;
		String dt = date.fixParameter("upt_dttm").toString() ;
		data.clear();

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

				data.param
					.query(" insert into itm_stor t ( t.hq_id, t.stor_grp, t.stor_id, t.mst_itm_id, t.item_idcd , t.vend_id 	")
					.query("                          , t.upt_id, t.upt_ip, t.upt_dttm , t.crt_id, t.crt_ip, t.crt_dttm ) ")
					.query(" select b.hq_id, b.stor_grp, b.stor_id , a.mst_itm_id , a.item_idcd , vend_id     ")
					.query("      , :upt_id  as upt_id      " , row.fixParameter("upt_id" 	))
					.query("      , :upt_ip  as upt_ip      " , ip )
					.query("      , :upt_dttm  as upt_dttm      " , dt )
					.query("      , :upt_id  as crt_id      ")
					.query("      , :upt_ip  as crt_ip      ")
					.query("      , :upt_dttm  as crt_dttm      ")
					.query(" from itm_mst a, stor b     " )
					.query(" where a.mst_itm_id  = :mst_itm_id   " , row.fixParameter("mst_itm_id" 		 	))
					.query(" and   a.row_sts = 0													")
					.query(" and   b.stor_id = :stor_id  " , row.fixParameter("stor_id"  		))
					.query(" and   a.item_idcd not in ( select item_idcd  from itm_stor where mst_itm_id = :mst_itm_id and stor_id = :stor_id and row_sts = 0 ) " )
				;data.attach(Action.direct);

				/* 같은 그룹 서버에 연동을 하기위한 처리를 한다.  */
				for(SqlResultRow syc:arg.getParameter("synchro", SqlResultMap.class)){
					if (row.getParamText("hq_id").equals( syc.getParamText("owner_id"))) {
						if (!"0".equals(syc.fixParamText("get_item" ))) {
							data.param
								.table("data_sync")
								.where("where sync_id  = :sync_id  and pk_owner = :pk_owner  " )
								.where("  and pk_val = :pk_val and pk_hq = :pk_hq  " )
								//
								.insert("sync_id"            , ItemBonsaTasker.SYC_ITEM_BONSA     )
								.unique("pk_owner"           , row.fixParameter("stor_id"       ))
								.unique("pk_val"           , row.fixParameter("mst_itm_id"        ))
								.unique("pk_hq"           , syc.fixParameter("hq_id"       ))
								.update("del_use_yn"          , rowaction.equals(Action.delete) ? "1"  : "0" )
								.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
								.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
							;data.attach( Action.modify).async(ItemBonsaTasker.class, ItemBonsaTasker.SYC_ITEM_BONSA);
						}
					} else
					if (row.getParamText("hq_id").equals( syc.getParamText("hq_id"))) {
//						if (!"0".equals(syc.getParamText("old_sync")) ) {
//							data.param
//								.table("data_sync")
//								.where("where sync_id  = :sync_id  and pk_owner = :pk_owner  " )
//								.where("  and pk_val = :pk_val and pk_hq = :pk_hq  " )
//								//
//								.insert("sync_id"            , ItemBonsaTasker.OLD_ITEM_BONSA     )
//								.unique("pk_owner"           , row.fixParameter("owner_id"       ))
//								.unique("pk_val"           , row.fixParameter("mst_itm_id"        ))
//								.unique("pk_hq"           , syc.fixParameter("hq_id"       ))
//								.update("del_use_yn"          , rowaction.equals(Action.delete) ? "1"  : "0" )
//								.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//								.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//							;data.attach( Action.modify);
//						}
						// 에이젼트 연동 처리
						if (!"".equals(syc.getParamText("hq_pos_id").trim() )) {
//							data.param
//								.table("data_sync")
//								.where("where sync_id  = :sync_id  and pk_owner = :pk_owner  " )
//								.where("  and pk_val = :pk_val and pk_hq = :pk_hq  " )
//								//
//								.insert("sync_id"            , ItemBonsaTasker.AGT_ITEM_BONSA     )
//								.unique("pk_owner"           , row.fixParameter("stor_id"       ))
//								.unique("pk_val"           , row.fixParameter("mst_itm_id"        ))
//								.unique("pk_hq"           , syc.fixParameter("hq_id"       ))
//								.update("del_use_yn"          , rowaction.equals(Action.delete) ? "1"  : "0" )
//								.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//								.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//							;data.attach( Action.modify).async(ItemBonsaTasker.class, ItemBonsaTasker.AGT_ITEM_BONSA);

//							data.param
//								.query(" insert into data_sync (                              " )
//								.query("         sync_id,   pk_owner,   pk_val,   pk_hq  " )
//								.query( " )                                                   " )
//								.query(" select distinct :sync_id, a.stor_id, a.mst_itm_id , a.hq_id  " )
//								.query(" from   itm_stor a                                  " )
//								.query(" where  a.stor_grp = :stor_grp                        " , row.fixParameter("stor_grp"    ))
//								.query(" and    a.mst_itm_id  = :mst_itm_id                         " , row.fixParameter("mst_itm_id"     ))
//								.query(" and  ( a.stor_id , a.mst_itm_id  ) not in (            " )
//								.query("        select pk_owner , pk_val                    " )
//								.query("        from   data_sync                              " )
//								.query("        where  sync_id  = :sync_id                    " , ItemStoreTasker.AGT_ITEM_STORE  )
//								.query("        and    pk_owner = a.stor_id                  " )
//								.query("      )                 " )
//								.query(" and    a.row_sts < 2 " )
//							;data.attach(Action.direct).async(ItemStoreTasker.class, ItemStoreTasker.AGT_ITEM_STORE );
						}
					}
				} /* 같은 그룹 서버에 연동을 하기위한 처리 종료 */

		}
		data.execute();
		return null ;
	}



	/**
	 * 지점상품 조회
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getItemStore(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage();
		data.param // 쿼리문  입력
			.total(" select  count(1) as maxsize  																			")
			;

		data.param // 쿼리문  입력
			.query("select    case when s.mst_itm_id is null then '0' else '1' end as use_yn   ,  a.hq_id ,  a.share_yn 	")
			.query("      ,  a.owner_id   , (select stor_nm from stor where stor_id = a.owner_id ) as owner_nm       	")
			.query("      ,  (select stor_grp from stor where stor_id = a.owner_id ) as stor_grp					       	")
			.query("      ,  a.item_sts   , a.mst_itm_id     , a.mst_itm_cd   , a.item_name    , a.item_spec 	, c.item_code 			")
			.query("      ,  c.mfg_id     , (select bas_nm  from base_mst  where bas_id  = c.mfg_id    ) as mfg_nm 		")
			.query("      ,  c.brand_id   , (select bas_nm  from base_mst  where bas_id  = c.brand_id  ) as brand_nm 	")
			.query("      ,  a.emp_id    , (select emp_nm  from usr_mst  where emp_id  = a.emp_id   ) as emp_nm 		")
			.query("      ,  a.stk_itm_yn   ,  a.sales_id    , a.item_gb 	, c.unt_qty , 	c.unit_idcd							")
			.query("      , (select bas_nm from base_mst where bas_id = a.sales_id  ) as sales_nm 						")
			.query("      , (select unit_name from item_unit where unit_idcd = c.unit_idcd  ) as unit_name 							")
			.query("      ,  a.user_memo  ,  a.row_sts 																	")
			;
		data.param
			.where(" from    itm_grp  a 																					")
			.where("         left outer join itm_stor s on s.stor_id = :stor_id  	   " , arg.fixParameter("stor_id"  ))
			.where("         							 and s.mst_itm_id = a.mst_itm_id and s.item_idcd = a.mst_itm_id 				")
			.where("         join itm_mst c  on c.item_idcd = a.mst_itm_id														")
			.where(" where   a.owner_id in ( select stor_id from stor where  stor_grp = :stor_grp  )  " , arg.fixParameter("stor_grp"   ))
			.where(" and     a.row_sts 	=  0 																				")
			.where(" and     a.class_id in ( select  class_id  from item_class a start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))
			.where(" and     a.mst_itm_id in ( select mst_itm_id from scan_mst  where scan_cd like :scan_cd% ) " , arg.getParamText("barcode" )) // 품목코드
			.where(" and     a.find_name 	like %:find_name% " 											, arg.getParamText("item_name" )) // 품목명
			.where(" and     a.share_yn  = 0      																			")
			.where(" order by a.mst_itm_cd		 																				")
			;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}


	/**
	 * 공통상품으로 전환
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setBonsaChange(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);

		String ip =  arg.remoteAddress.toString() ;


		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if( "1".equals(row.getParameter("stor_grp")) || "2".equals(row.getParameter("stor_grp") )   ){ /* 본사, 직영점 : 매입처, 구매가 수신 */

	        		data.param
						.table("itm_grp")
						.where("where mst_itm_id  = :mst_itm_id   " )
						//
						.unique("mst_itm_id"    , row.fixParameter("mst_itm_id"        ))
						.update("share_yn"      , row.fixParameter("share_yn"       ))
						.update("upt_id"        , row.getParameter("upt_id"      ))
						.update("upt_ip"   	    , arg.remoteAddress				  )
						.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        		;data.attach(Action.update);

	        		data.param
		        		.query("update itm_mst t 																									")
		        		.query("set 																												")
		        		.query("	 (  t.share_yn , t.vend_id, t.po_pri, t.po_pri_type, t.po_pri_rt , t.stad_sale_pri, t.sale_pri_1  		")
		        		.query("	  , t.upt_id, t.upt_ip, t.upt_dttm   ) = 																")
		        		.query("	 (  select  1 as share_yn , s.vend_id, s.po_pri, s.po_pri_type, s.po_pri_rt , s.stad_sale_pri   ,  s.sale_pri_1 ")
						.query("              , :upt_id  as upt_id    " , row.fixParameter("upt_id" 	))
						.query("              , :upt_ip  as upt_ip    " , ip )
						.query("              , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as upt_dttm        ")
		        		.query("	    from itm_stor s 																							")
		        		.query("	    where s.stor_id = t.owner_id 																				")
						.query("		and   s.row_sts = 0																						")
		        		.query("	    and   s.item_idcd  = t.item_idcd 																				")
		        		.query("	 ) 																												")
		        		.query("where mst_itm_id 		=  :mst_itm_id  		" 			, 	row.fixParameter("mst_itm_id" 	))
						;



//					data.param
//					.query("	update itm_mst t 																		")
//					.query("	set   ( t.share_yn, t.vend_id, t.po_pri, t.po_pri_type, t.po_pri_rt , t.stad_sale_pri")
//					.query("	       ,t.sale_pri_1															) = 	")
////					.query("	       ,t.sale_pri_1, t.sale_pri_2, t.sale_pri_3, t.sale_pri_4, t.sale_pri_5) = 	")
//					.query("	    (select  :share_yn   					" 			, row.fixParameter("share_yn" 	))
//					.query("	        , s.vend_id, s.po_pri, s.po_pri_type, s.po_pri_rt , s.stad_sale_pri		")
//					.query("	        ,  s.sale_pri_1															 	") /* 출하가1만 연동 */
////					.query("	        ,  s.sale_pri_1, s.sale_pri_2, s.sale_pri_3, s.sale_pri_4, s.sale_pri_5 	")
//					.query("	     from itm_stor s 																	")
//					.query("	    where s.item_idcd  = t.item_idcd 														")
//					.query("	      and s.stor_id = :owner_id  			" 			, row.fixParameter("owner_id" 	))
//					.query("	      and s.mst_itm_id  = :mst_itm_id  			" 			, row.fixParameter("mst_itm_id" 	))
//					.query("	   ) 																					")
//					.query("	where exists ( 																			")
//					.query("		select   :share_yn   					" 			, row.fixParameter("share_yn" 	))
//					.query("		        , s.vend_id, s.po_pri, s.po_pri_type, s.po_pri_rt  , s.stad_sale_pri	")
//					.query("		        ,  s.sale_pri_1															")
////					.query("		        ,  s.sale_pri_1, s.sale_pri_2, s.sale_pri_3, s.sale_pri_4, s.sale_pri_5")
//					.query("		     from itm_stor s 																")
//					.query("		    where s.item_idcd  = t.item_idcd 													")
//					.query("		      and s.stor_id = :owner_id  		" 			, row.fixParameter("owner_id" 	))
//					.query("		      and s.mst_itm_id  = :mst_itm_id  		" 			, row.fixParameter("mst_itm_id" 	))
//					.query("		)					 																")

				;data.attach(Action.direct);

//	        		data.param
//						.table("itm_mst")
//						.where("where mst_itm_id  = :mst_itm_id   " )
//						//
//						.unique("mst_itm_id"            , row.fixParameter("mst_itm_id"        ))
//						.update("share_yn"           , row.fixParameter("share_yn"       ))
//						.update("upt_ip"   	     , arg.remoteAddress				  )
//						.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//	        		;data.attach(Action.update);

			}

			/* 공통 상품인 경우만 - 같은 그룹 서버에 연동을 하기위한 처리를 한다.  */

			for(SqlResultRow syc:arg.getParameter("synchro", SqlResultMap.class)){
				if (row.getParamText("hq_id").equals( syc.getParamText("owner_id"))) {
					if (!"0".equals(syc.fixParamText("get_item" ))) {
						data.param
							.table("data_sync")
							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner  " )
							.where("  and pk_val = :pk_val and pk_hq = :pk_hq  " )
							//
							.insert("sync_id"            , ItemBonsaTasker.SYC_ITEM_BONSA     )
							.unique("pk_owner"           , row.fixParameter("owner_id"       ))
							.unique("pk_val"           , row.fixParameter("mst_itm_id"        ))
							.unique("pk_hq"           , syc.fixParameter("hq_id"       ))
							.update("del_use_yn"          , rowaction.equals(Action.delete) ? "1"  : "0" )
							.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
							.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
						;data.attach( Action.modify).async(ItemBonsaTasker.class, ItemBonsaTasker.SYC_ITEM_BONSA);
					}
				} else
				if (row.getParamText("hq_id").equals( syc.getParamText("hq_id"))) {
//					if (!"0".equals(syc.getParamText("old_sync")) ) {
//						data.param
//							.table("data_sync")
//							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner  " )
//							.where("  and pk_val = :pk_val and pk_hq = :pk_hq  " )
//							//
//							.insert("sync_id"            , ItemBonsaTasker.OLD_ITEM_BONSA     )
//							.unique("pk_owner"           , row.fixParameter("owner_id"       ))
//							.unique("pk_val"           , row.fixParameter("mst_itm_id"        ))
//							.unique("pk_hq"           , syc.fixParameter("hq_id"       ))
//							.update("del_use_yn"          , rowaction.equals(Action.delete) ? "1"  : "0" )
//							.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//							.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//						;data.attach( Action.modify);
//					}
					// 에이젼트 연동 처리
					if (!"".equals(syc.getParamText("hq_pos_id").trim() )) {
//						data.param
//							.table("data_sync")
//							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner  " )
//							.where("  and pk_val = :pk_val and pk_hq = :pk_hq  " )
//							//
//							.insert("sync_id"            , ItemBonsaTasker.AGT_ITEM_BONSA     )
//							.unique("pk_owner"           , row.fixParameter("owner_id"       ))
//							.unique("pk_val"           , row.fixParameter("mst_itm_id"        ))
//							.unique("pk_hq"           , syc.fixParameter("hq_id"       ))
//							.update("del_use_yn"          , rowaction.equals(Action.delete) ? "1"  : "0" )
//							.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//							.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//						;data.attach( Action.modify).async(ItemBonsaTasker.class, ItemBonsaTasker.AGT_ITEM_BONSA);

//						data.param
//							.query(" insert into data_sync (                              " )
//							.query("         sync_id,   pk_owner,   pk_val,   pk_hq  " )
//							.query( " )                                                   " )
//							.query(" select distinct :sync_id, a.stor_id, a.mst_itm_id , a.hq_id  " )
//							.query(" from   itm_stor a                                  " )
//							.query(" where  a.stor_grp = :stor_grp                        " , row.fixParameter("stor_grp"    ))
//							.query(" and    a.mst_itm_id  = :mst_itm_id                         " , row.fixParameter("mst_itm_id"     ))
//							.query(" and  ( a.stor_id , a.mst_itm_id  ) not in (            " )
//							.query("        select pk_owner , pk_val                    " )
//							.query("        from   data_sync                              " )
//							.query("        where  sync_id  = :sync_id                    " , ItemStoreTasker.AGT_ITEM_STORE  )
//							.query("        and    pk_owner = a.stor_id                  " )
//							.query("      )                 " )
//							.query(" and    a.row_sts < 2 " )
//						;data.attach(Action.direct).async(ItemStoreTasker.class, ItemStoreTasker.AGT_ITEM_STORE );
					}
				}
			} /* 같은 그룹 서버에 연동을 하기위한 처리 종료 */

//			for(SqlResultRow syc:arg.getParameter("synchro", SqlResultMap.class)){
//
//				if (row.getParamText("hq_id").equals( syc.getParamText("hq_id"))) {
//					// 에이젼트 연동 처리
//					if (!"".equals(syc.getParamText("hq_pos_id").trim() )) {
//						data.param
//							.table("data_sync")
//							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner    " )
//							.where("  and pk_val = :pk_val and pk_hq = :pk_hq    " )
//							//
//							.insert("sync_id"            , ItemBonsaTasker.AGT_ITEM_BONSA    )
//							.unique("pk_owner"           , row.fixParameter("stor_id"      ))
//							.unique("pk_val"           , row.fixParameter("mst_itm_id"       ))
//							.unique("pk_hq"           , syc.fixParameter("hq_id"      ))
//							.update("del_use_yn"          , "0" )
//							.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//							.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//						;data.attach( Action.modify).async(ItemBonsaTasker.class, ItemBonsaTasker.AGT_ITEM_BONSA);
//					}
//				} /* 같은 그룹 서버에 연동을 하기위한 처리 종료 */
//			}
		}


		data.execute();
		return null ;
	}


	/**
	 * 공통상품 수신
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setItemBonsa(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);

//		data.param
//		.query("select to_char(sysdate, 'yyyymmddhh24miss') as upt_dttm from dual  ")
//		;
//		SqlResultRow date = data.selectForRow();

		String ip =  arg.remoteAddress.toString() ;
//		String dt = date.fixParameter("upt_dttm").toString() ;
//		data.clear();

		for(SqlResultRow row:map){

			if( "1".equals(row.getParameter("stor_grp")) || "2".equals(row.getParameter("stor_grp") )   ){ /* 본사, 직영점 : 매입처, 구매가 수신 */
				data.param
					.query("	insert into  													")
					.query("		itm_stor t ( t.hq_id 									")
					.query("					, t.stor_grp 									")
					.query("					, t.stor_id 									")
					.query("					, t.mst_itm_id 									")
					.query("					, t.item_idcd 									")
					.query("					, t.vend_id 									")
//					.query("					, t.po_pri 									")
//					.query("					, t.po_pri_type 								")
//					.query("					, t.po_pri_rt 								")
					.query("					, t.upt_id 									")
					.query("					, t.upt_ip 									")
					.query("					, t.upt_dttm 									")
					.query("					, t.crt_id 									")
					.query("					, t.crt_ip 									")
					.query("					, t.crt_dttm 									")
					.query("	) 																")
					.query("	select  														")
					.query("		a.hq_id 													")
					.query("		, 	:stor_grp  	" 			, row.fixParameter("stor_grp"  	))
					.query("		, 	:stor_id  	" 			, row.fixParameter("stor_id"  	))
					.query("		, a.mst_itm_id  												")
					.query("		, a.item_idcd 												")
					.query("		, a.vend_id 												")
//					.query("		, a.po_pri 												")
//					.query("		, a.po_pri_type 											")
//					.query("		, a.po_pri_rt 											")
					.query("        , :upt_id  as upt_id      " , row.fixParameter("upt_id" 	))
					.query("        , :upt_ip  as upt_ip      " , ip )
					.query("        , to_char(sysdate, 'yyyymmddhh24miss')  as upt_dttm        ")
					.query("        , :upt_id  as crt_id      							")
					.query("        , :upt_ip  as crt_ip      							")
					.query("        , to_char(sysdate, 'yyyymmddhh24miss')  as crt_dttm        ")
					.query("	from  itm_mst a 												")
					.query("	where a.mst_itm_id = 	:mst_itm_id  " , row.fixParameter("mst_itm_id"  	))
					.query("	  and a.row_sts = 0											")
					.query("	  and a.item_idcd  not in (  										")
					.query("			  			select  									")
					.query("			  				distinct item_idcd  						")
					.query("			  			  from itm_stor  							")
					.query("			  			 where stor_id = :stor_id  " , row.fixParameter("stor_id" ))
					.query("			  			  and  row_sts = 0						")
					.query("			  			  and  mst_itm_id 	= :mst_itm_id   " , row.fixParameter("mst_itm_id"  ))
					.query("			  				) 										")
				;data.attach(Action.direct);
			} else
			if ( "3".equals(row.getParameter("stor_grp")) ){										/* 체인점 */

				data.param
					.query("	insert into  													")
					.query("		itm_stor t ( t.hq_id 									")
					.query("					, t.stor_grp 									")
					.query("					, t.stor_id 									")
					.query("					, t.mst_itm_id 									")
					.query("					, t.item_idcd 									")
					.query("					, t.upt_id 									")
					.query("					, t.upt_ip 									")
					.query("					, t.upt_dttm 									")
					.query("					, t.crt_id 									")
					.query("					, t.crt_ip 									")
					.query("					, t.crt_dttm 									")
					.query("	) 																")
					.query("	select  														")
					.query("		a.hq_id 													")
					.query("		, 	:stor_grp  	" 			, row.fixParameter("stor_grp"  	))
					.query("		, 	:stor_id  	" 			, row.fixParameter("stor_id"  	))
					.query("		, a.mst_itm_id  												")
					.query("		, a.item_idcd 												")
					.query("        , :upt_id  as upt_id      " , row.fixParameter("upt_id" 	))
					.query("        , :upt_ip  as upt_ip      " , ip )
					.query("        , to_char(sysdate, 'yyyymmddhh24miss')  as upt_dttm      	")
					.query("        , :upt_id  as crt_id      							")
					.query("        , :upt_ip  as crt_ip      							")
					.query("        , to_char(sysdate, 'yyyymmddhh24miss')  as crt_dttm      	")
					.query("	from  itm_mst a 												")
					.query("	where a.mst_itm_id = 	:mst_itm_id  " , row.fixParameter("mst_itm_id"  	))
					.query("	  and a.row_sts = 0											")
					.query("	  and a.item_idcd  not in (  										")
					.query("			  			select  									")
					.query("			  				distinct item_idcd  						")
					.query("			  			  from itm_stor  							")
					.query("			  			 where stor_id = :stor_id  " , row.fixParameter("stor_id" ))
					.query("			  			  and  row_sts = 0						")
					.query("			  			  and  mst_itm_id 	= :mst_itm_id   " , row.fixParameter("mst_itm_id"  ))
					.query("			  				) 										")
				;data.attach(Action.direct);

			}



			/* 공통 상품인 경우만 - 같은 그룹 서버에 연동을 하기위한 처리를 한다.  */
			for(SqlResultRow syc:arg.getParameter("synchro", SqlResultMap.class)){

				if (row.getParamText("hq_id").equals( syc.getParamText("hq_id"))) {
					// 에이젼트 연동 처리
					if (!"".equals(syc.getParamText("hq_pos_id").trim() )) {
						data.param
							.table("data_sync")
							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner    " )
							.where("  and pk_val = :pk_val and pk_hq = :pk_hq    " )
							//
							.insert("sync_id"            , ItemStoreTasker.AGT_ITEM_STORE    )
							.unique("pk_owner"           , row.fixParameter("stor_id"      ))
							.unique("pk_val"           , row.fixParameter("mst_itm_id"       ))
							.unique("pk_hq"           , syc.fixParameter("hq_id"      ))
							.update("del_use_yn"          , "0" )
							.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
							.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
						;data.attach( Action.modify).async(ItemStoreTasker.class, ItemStoreTasker.AGT_ITEM_STORE);
					}
				} /* 같은 그룹 서버에 연동을 하기위한 처리 종료 */
			}
		}


		data.execute();
		return null ;
	}


	/**
	 * 등록된 바코드 조회 (신규작업시 사용)
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		String search_id = arg.getParamText("search_id" );
		String barcode = arg.getParamText("barcode" );

		DataMessage data = arg.newStorage();
		data.param // 쿼리문  입력
			.total(" select  count(1) as maxsize                                                      	")
		;
		data.param
			.query("select (case when b.item_idcd is null then '0' else '1' end)  use_yn 	, a.owner_id  	")
			.query("     ,  a.share_yn , a.item_idcd, a.item_code ,  a.item_name , a.item_spec, a.unt_qty           ")
			.query("     , (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name       		")
			.query("     , (select clss_desct from item_class where class_id = a.class_id) as class_nm  ")
			.query("     , (select bas_nm from base_mst where bas_id = a.brand_id) as brand_nm     		")
			.query("     , (select stor_nm from stor where stor_id = a.owner_id) as owner_nm       		")
		;
		data.param
			.where("from itm_mst a 																						")
			.where("   left outer join itm_stor b on b.item_idcd = a.item_idcd and stor_id = :stor_id  " , arg.fixParameter("stor_id"  ))
			.where("where( a.owner_id in  ")
			.where("            ( select stor_id from stor  ")
			.where("              where  stor_grp = :stor_grp " , arg.fixParameter("stor_grp"  ))
			.where("              and    row_sts   = 0      ")
			.where("            ) or a.share_yn ='1' )		  ")
			.where("and a.item_idcd in ( select item_idcd from scan_mst where scan_cd like :barcode%  )  " , barcode, "1".equals(search_id) ) /* 바코드 */
		;
		if ("2".equals( search_id ) && !"".equals(barcode)){
			StringTokenizer st = new StringTokenizer(barcode," ");
			if (st.countTokens() == 1) {
				data.param.where(" and  a.find_name like %:find_name% " , st.nextToken().toLowerCase());
			} else {
				int i = 0;
				String and = "";
				data.param.where(" and  (  ");
				while(st.hasMoreTokens()){
					data.param.where( and +  " a.find_name like %:find_name" + i++ + "% " , st.nextToken().toLowerCase()  );
					and = " and ";
				}
				data.param.where(" ) ");
			}
		}
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}


	/**
	 * 바코드상품 수신
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setBarcodeRecv(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);
		String ip =  arg.remoteAddress.toString() ;

		for(SqlResultRow row:map){
			String shareyn = row.getParamText("share_yn");

			if( "1".equals(row.getParameter("stor_gb")) || "2".equals(row.getParameter("stor_gb") )   ){ /* 본사, 직영점 : 매입처, 구매가 수신 */
					if ( !"0".equals(shareyn) ){

						data.param
							.query("	insert into  													")
							.query("		itm_stor t ( t.hq_id 									")
							.query("					, t.stor_grp 									")
							.query("					, t.stor_id 									")
							.query("					, t.mst_itm_id 									")
							.query("					, t.item_idcd 									")
							.query("					, t.vend_id 									")
							.query("					, t.upt_id 									")
							.query("					, t.upt_ip 									")
							.query("					, t.upt_dttm 									")
							.query("					, t.crt_id 									")
							.query("					, t.crt_ip 									")
							.query("					, t.crt_dttm 									")
							.query("	) 																")
							.query("	select  														")
							.query("		a.hq_id 													")
							.query("		, 	:stor_grp  	" 			, row.fixParameter("stor_grp"  	))
							.query("		, 	:stor_id  	" 			, row.fixParameter("stor_id"  	))
							.query("		, a.mst_itm_id  												")
							.query("		, a.item_idcd 												")
							.query("		, a.vend_id 												")
							.query("        , :upt_id  as upt_id      " , row.fixParameter("upt_id" 	))
							.query("        , :upt_ip  as upt_ip      " , ip )
							.query("        , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as upt_dttm      	")
							.query("        , :upt_id  as crt_id      							")
							.query("        , :upt_ip  as crt_ip      							")
							.query("        , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as crt_dttm      	")
							.query("	from  itm_mst a 												")
							.query("	where a.mst_itm_id = 	:mst_itm_id  " , row.fixParameter("mst_itm_id"  	))
							.query("	  and a.row_sts = 0											")
							.query("	  and a.item_idcd  not in (  										")
							.query("			  			select  									")
							.query("			  				distinct item_idcd  						")
							.query("			  			  from itm_stor  							")
							.query("			  			 where stor_id = :stor_id  " , row.fixParameter("stor_id" ))
							.query("			  			  and  row_sts = 0						")
							.query("			  			  and  mst_itm_id 	= :mst_itm_id   " , row.fixParameter("mst_itm_id"  ))
							.query("			  				) 										")
							;data.attach(Action.direct);
					} else {
						data.param
							.query("	insert into  													")
							.query("		itm_stor t ( t.hq_id 									")
							.query("					, t.stor_grp 									")
							.query("					, t.stor_id 									")
							.query("					, t.mst_itm_id 									")
							.query("					, t.item_idcd 									")
							.query("					, t.stad_sale_pri 									")
							.query("					, t.vend_id 									")
							.query("					, t.po_pri 									")
							.query("					, t.po_pri_type 								")
							.query("					, t.po_pri_rt 								")
							.query("					, t.upt_id 									")
							.query("					, t.upt_ip 									")
							.query("					, t.upt_dttm 									")
							.query("					, t.crt_id 									")
							.query("					, t.crt_ip 									")
							.query("					, t.crt_dttm 									")
							.query("	) 																")
							.query("	select  														")
							.query("		  a.hq_id 												")
							.query("		, a.stor_grp 												")
							.query("		, 	:stor_id  	" 			, row.fixParameter("stor_id"  	))
							.query("		, a.mst_itm_id  												")
							.query("		, a.item_idcd 												")
							.query("		, a.stad_sale_pri 												")
							.query("		, a.vend_id 												")
							.query("		, a.po_pri 												")
							.query("		, a.po_pri_type 											")
							.query("		, a.po_pri_rt 											")
							.query("        , :upt_id  as upt_id      " , row.fixParameter("upt_id" 	))
							.query("        , :upt_ip  as upt_ip      " , ip )
							.query("        , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as upt_dttm      	")
							.query("        , :upt_id  as crt_id      							")
							.query("        , :upt_ip  as crt_ip      							")
							.query("        , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as crt_dttm      	")
							.query("	from  itm_stor a 												")
							.query("	where a.stor_id = 	:owner_id  " , row.fixParameter("owner_id"  ))
							.query("	  and a.row_sts = 0											")
							.query("	  and a.mst_itm_id = 	:mst_itm_id   " , row.fixParameter("mst_itm_id"  	))
							.query("	  and a.item_idcd  not in (  										")
							.query("			  			select  									")
							.query("			  				distinct item_idcd  						")
							.query("			  			  from itm_stor  							")
							.query("			  			 where stor_id = :stor_id  " , row.fixParameter("stor_id" ))
							.query("			  			  and  row_sts = 0						")
							.query("			  			  and  mst_itm_id 	= :mst_itm_id   " , row.fixParameter("mst_itm_id"  ))
							.query("			  				) 										")
							;data.attach(Action.direct);
					}

			} else { /* stor_grp == 3  체인점 */

				if ( !"0".equals(shareyn) ){

					data.param
						.query("	insert into  													")
						.query("		itm_stor t ( t.hq_id 									")
						.query("					, t.stor_grp 									")
						.query("					, t.stor_id 									")
						.query("					, t.mst_itm_id 									")
						.query("					, t.item_idcd 									")
						.query("					, t.upt_id 									")
						.query("					, t.upt_ip 									")
						.query("					, t.upt_dttm 									")
						.query("					, t.crt_id 									")
						.query("					, t.crt_ip 									")
						.query("					, t.crt_dttm 									")
						.query("	) 																")
						.query("	select  														")
						.query("		a.hq_id 													")
						.query("		, 	:stor_grp  	" 			, row.fixParameter("stor_grp"  	))
						.query("		, 	:stor_id  	" 			, row.fixParameter("stor_id"  	))
						.query("		, a.mst_itm_id  												")
						.query("		, a.item_idcd 												")
						.query("        , :upt_id  as upt_id      " , row.fixParameter("upt_id" 	))
						.query("        , :upt_ip  as upt_ip      " , ip )
						.query("        , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as upt_dttm      	")
						.query("        , :upt_id  as crt_id      							")
						.query("        , :upt_ip  as crt_ip      							")
						.query("        , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as crt_dttm      	")
						.query("	from  itm_mst a 												")
						.query("	where a.mst_itm_id = 	:mst_itm_id  " , row.fixParameter("mst_itm_id"  	))
						.query("	  and a.row_sts = 0											")
						.query("	  and a.item_idcd  not in (  										")
						.query("			  			select  									")
						.query("			  				distinct item_idcd  						")
						.query("			  			  from itm_stor  							")
						.query("			  			 where stor_id = :stor_id  " , row.fixParameter("stor_id" ))
						.query("			  			  and  row_sts = 0						")
						.query("			  			  and  mst_itm_id 	= :mst_itm_id   " , row.fixParameter("mst_itm_id"  ))
						.query("			  				) 										")
						;data.attach(Action.direct);
				} else {
					data.param
						.query("	insert into  													")
						.query("		itm_stor t ( t.hq_id 									")
						.query("					, t.stor_grp 									")
						.query("					, t.stor_id 									")
						.query("					, t.mst_itm_id 									")
						.query("					, t.item_idcd 									")
						.query("					, t.stad_sale_pri 									")
						.query("					, t.vend_id 									")
						.query("					, t.po_pri 									")
						.query("					, t.po_pri_type 								")
						.query("					, t.po_pri_rt 								")
						.query("					, t.upt_id 									")
						.query("					, t.upt_ip 									")
						.query("					, t.upt_dttm 									")
						.query("					, t.crt_id 									")
						.query("					, t.crt_ip 									")
						.query("					, t.crt_dttm 									")
						.query("	) 																")
						.query("	select  														")
						.query("		  a.hq_id 												")
						.query("		,   :owner_id  "			 , row.fixParameter("owner_id"  ))
						.query("		, 	:stor_id  	" 			, row.fixParameter("stor_id"  	))
						.query("		, a.mst_itm_id  												")
						.query("		, a.item_idcd 												")
						.query("		, a.stad_sale_pri 												")
						.query("		, a.vend_id 												")
						.query("		, a.po_pri 												")
						.query("		, a.po_pri_type 											")
						.query("		, a.po_pri_rt 											")
						.query("        , :upt_id  as upt_id      " , row.fixParameter("upt_id" 	))
						.query("        , :upt_ip  as upt_ip      " , ip )
						.query("        , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as upt_dttm      	")
						.query("        , :upt_id  as crt_id      							")
						.query("        , :upt_ip  as crt_ip      							")
						.query("        , dbo.to_char(getdate(), 'yyyymmddhh24miss')  as crt_dttm      	")
						.query("	from  itm_stor a 												")
						.query("	where a.stor_id = 	:owner_id  " , row.fixParameter("owner_id"  ))
						.query("	  and a.row_sts = 0											")
						.query("	  and a.mst_itm_id = 	:mst_itm_id   " , row.fixParameter("mst_itm_id"  	))
						.query("	  and a.item_idcd  not in (  										")
						.query("			  			select  									")
						.query("			  				distinct item_idcd  						")
						.query("			  			  from itm_stor  							")
						.query("			  			 where stor_id = :stor_id  " , row.fixParameter("stor_id" ))
						.query("			  			  and  row_sts = 0						")
						.query("			  			  and  mst_itm_id 	= :mst_itm_id   " , row.fixParameter("mst_itm_id"  ))
						.query("			  				) 										")
						;data.attach(Action.direct);
				}

			}

			/* 공통 상품인 경우만 - 같은 그룹 서버에 연동을 하기위한 처리를 한다.  */
			for(SqlResultRow syc:arg.getParameter("synchro", SqlResultMap.class)){

				if (row.getParamText("hq_id").equals( syc.getParamText("hq_id"))) {
					// 에이젼트 연동 처리
					if (!"".equals(syc.getParamText("hq_pos_id").trim() )) {
						data.param
							.table("data_sync")
							.where("where sync_id  = :sync_id  and pk_owner = :pk_owner    " )
							.where("  and pk_val = :pk_val and pk_hq = :pk_hq    " )
							//
							.insert("sync_id"       , ItemStoreTasker.AGT_ITEM_STORE    )
							.unique("pk_owner"      , row.fixParameter("stor_id"      ))
							.unique("pk_val"        , row.fixParameter("mst_itm_id"       ))
							.unique("pk_hq"         , syc.fixParameter("hq_id"      ))
							.update("del_use_yn"    , "0" )
							.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
							.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						;data.attach( Action.modify).async(ItemStoreTasker.class, ItemStoreTasker.AGT_ITEM_STORE);
					}
				} /* 같은 그룹 서버에 연동을 하기위한 처리 종료 */
			}
		}


		data.execute();
		return null ;
	}


}
