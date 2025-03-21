package com.sky.system.zreport;

import org.springframework.stereotype.Service;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class ZOnlineOrderListService  extends DefaultServiceHandler {

	//private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

		String inv_po_term = arg.fixParamText("inv_po_term" ); /* 날짜 구분 1:배송예정일, 2:주문일자 */
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String sts_gb = arg.getParamText("sts_gb" );

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);


			DataMessage data = arg.newStorage("POS");
			data.param // 쿼리문  입력
				.total("select count(1) as maxsize	, sum(a.amount) as amount					 	 ")
				.total("    ,  sum(a.payment) as payment	, sum(a.npay_amt) as npay_amt 				")
			;

			data.param // 쿼리문  입력
			    .query("select a.stor_id                                                          		")
				.query("   ,   (select stor_nm from store where stor_id = a.stor_id ) as stor_nm 	")
				.query("   ,   (select stor_nm from store where stor_id = a.wareh_id ) as wareh_nm 	")
				.query("   ,   (select biz_tel_no from store where stor_id = a.wareh_id ) as wareh_tel_no 	")
				.query("   ,   a.inv_no   , a.ori_dt  , a.inv_dt   , a.pay_dt 	, a.cust_id , a.mmb_id	")
				.query("   ,   c.cust_cd  , a.cust_nm  , a.mmb_nm , a.sts_cd   , a.inv_work_id   		")
				.query("   ,   a.biz_tel_no  , a.biz_hp_no , a.amount  									")
				.query("   ,   (select dept_nm from dept_mst where stor_grp = a.stor_grp and dept_id = a.inv_dept_id) as inv_dept_nm   ")
				.query("   ,   (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id) as salesman_nm   ")
				.query("   ,   (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.inv_user_id) as inv_user_nm   ")
				.query("   ,   a.reve_nm  , a.reve_tel_no  , a.reve_hp_no  , a.reve_email  , a.reve_zip_cd   ")
				.query("   ,   a.reve_addr_1  , a.reve_addr_2												")
				.query("   ,   (select trim(substring(max(hdli_no), 0 ,12)) from sale_mst where ori_no = a.inv_no ) as hdli_no")
				.query("   ,   (select bas_nm from base_mst where bas_id = (select max(hdli_id) from sale_mst where ori_no = a.inv_no) ) as taekbae_nm ")
				.query("   ,   (case when (select isnull(count(ctr_no), 0) from cust_counsel where inv_no = a.inv_no) = 0 then '0' else '1' end ) as ctr_yn 	")
				.query("   ,   a.payment  , a.npay_amt  ,a.perpay_yn										")
				.query("   ,   a.req_msg  , a.user_memo , a.row_clos									")
			;
			data.param
			    .where("from   order_mst a   															")
				.where("       join cust_stor b on a.stor_id = b.stor_id       					    ")
				.where("       	                and a.cust_id  = b.cust_id        					    ")
				.where("       join cust_mst  c on a.cust_id  = c.cust_id           													")
				.where("where  a.stor_grp     	= 	:stor_grp 	  " , arg.fixParameter("stor_grp" ) )
				.where("and    ( a.stor_id  	= 	:stor_id 	  " , arg.getParameter("stor_id" ) )
				.where("       or  a.wareh_id  	= 	:stor_id   ) " , arg.getParameter("stor_id" ) )
				.where("and    a.row_sts = 0                                             " )
				.where("and    a.inv_dt between :fr_dt       " , fr_dt , "1".equals( inv_po_term ))  // 배송예정사작일자
				.where("                    and :to_dt       " , to_dt , "1".equals( inv_po_term ))  // 배송예정종료일자
				.where("and    a.ori_dt between :fr_dt       " , fr_dt , "2".equals( inv_po_term ))  // 주문사작일자
				.where("                    and :to_dt       " , to_dt , "2".equals( inv_po_term ))  // 주문종료일자

				.where("and    a.cust_id    =   :cust_id     " , arg.getParameter("cust_id" )) // 고객코드
				.where("and    a.sts_cd     =   :sts_cd      " , arg.getParameter("sts_cd" )) // 주문상태
				.where("and    a.ret_yn     =   :ret_yn      " , arg.getParameter("ret_yn" )) // 반품여부
				.where("and    a.salesman_id = :salesman_id  " , arg.getParameter("salesman_id" )) // 영업담당
//				.where("and    a.inv_work_id = :inv_work_id  " , arg.getParameter("inv_work_id" )) // 주문작업위치
				;
				if ( inv_work_id.length > 0 ){
					data.param
			    	.where("and    a.inv_work_id  in (:inv_work_id )    " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 (3,4,A,B) */
					;
				} else {
					data.param
			    	.where("and    a.inv_work_id  in ( '3', '4', 'A', 'B' )  ") /* 주문 위치 */
					;
				}

				data.param
				.where("and    a.row_clos = :row_clos      " , arg.getParameter("row_clos" )) // 마감여부  1:마감

				.where("and    b.cls1_id = :cls1_id          " , arg.getParameter("cls1_id" )) // 고객1차분류
				.where("and    b.cls2_id = :cls2_id          " , arg.getParameter("cls2_id" )) // 고객2차분류
				.where("and    b.cls3_id = :cls3_id          " , arg.getParameter("cls3_id" )) // 고객3차분류

				.where("and    a.inv_no   	 like :find_name%   " , find_name , "1".equals( search_id )) // 주문번호
				.where("and    a.cust_nm     like %:find_name%  " , find_name , "2".equals( search_id )) // 고객명

				.where("and    a.biz_tel_no  like %:find_name%  " , find_name , "4".equals( search_id )) // 주문자 전화번호
				.where("and    a.biz_hp_no  like %:find_name%  " , find_name , "5".equals( search_id )) // 주문자 휴대전화
				.where("and    a.mmb_nm     like %:find_name%  " , find_name , "6".equals( search_id )) // 주문자 이름 (회원명)

				.where("and    a.reve_tel_no like %:find_name%  " , find_name , "7".equals( search_id )) // 수령자 전화번호
				.where("and    a.reve_hp_no like %:find_name%  " , find_name , "8".equals( search_id )) // 수령자 휴대전화
				.where("and    a.reve_nm     like %:find_name%  " , find_name , "9".equals( search_id )) // 수령자 이름

				.where("and    a.req_msg     like %:find_name%  " , find_name , "11".equals( search_id )) // 요청 메모
				.where("and    a.user_memo   like %:find_name%  " , find_name , "12".equals( search_id )) // 작업 메모

				.where("and    a.perpay_yn = :perpay_yn      " , arg.getParameter("perpay_yn" )) // 2번 탭 선결제 여부 0:외상거래, 1:결제완료
				.where("and    a.sts_cd  >= '0100'                                            ")

				.where("and    a.sts_cd    >= :sts_gb       " , sts_gb , "0100".equals( sts_gb )) // 1번 탭 주문상태  - 확정
				.where("and    a.sts_cd    >= '0100' and a.sts_cd  <= :sts_gb    " , sts_gb , "0400".equals( sts_gb )) // 3번 탭 주문상태  - 미처리

				.where("order by a.ori_dt ,  a.ori_tm desc 											")
				;

			if (page == 0 && rows == 0){
			     return data.selectForMap(sort);
			} else {
			     return data.selectForMap(page, rows, (page==1),sort);
			}

	}



	/**
	 * 디테일 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.hq_id  , a.stor_grp   , a.stor_id     ")
			.query("     , a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp	")
		    .query("     , (select stor_nm from store where stor_id = b.wareh_id) as wareh_nm 	")
		    .query("     , (select vend_nm from vend_mst where vend_id = b.pack_vend_id) as pack_vend_nm 	")
     	    .query("	 , (select zone_nm from itm_zone where stor_grp = a.stor_grp and zone_id = b.pack_zone_id) as pack_zone_nm ")
			.query("     , a.unit_idcd   , (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
			.query("     , a.unt_qty  , a.mst_itm_id    			       				")
			.query("     , a.item_idcd   , a.item_code    , a.item_name     , a.item_spec	")
			.query("     , d.brcd_1 as barcode                                    ")
			.query("     , a.notax_yn  , a.qty        , a.price						") // , b.stock
			.query("     , a.org_ord_qty  , a.ship_qty   , a.rest_qty  				")
//			.query("     , b.sts_cd 								 				")
//			.query("     , (case when a.rest_qty = a.qty then '0200'  				") /* 검수상태 */
//			.query("             when a.rest_qty = 0     then '0500'  				")
//			.query("             else '0400' end ) as sts_cd 		  				")
			.query("     , a.po_pri  , a.po_pri_type  , a.po_pri_rt        	")
			.query("     , a.tax_free  , a.taxation   , a.sply_amt    , a.tax       , a.amount     ")
			.query("     , (( a.amount - a.po_pri )  / ( case when a.amount = 0 then 1 else a.amount end ) * 100 ) as margin_per ")
			.query("     , a.user_memo , a.ship_memo  , a.row_sts                 ")
			.query("from   order_item a                                   		")
			.query("       left join order_pack b on a.stor_id = b.stor_id	")
			.query("                        and a.pack_no = b.pack_no         	")
			.query("       left join itm_zone c on b.stor_grp = c.stor_grp     ")
			.query(" 			            and b.pack_zone_id = c.zone_id 		")
			.query("       join itm_mst d             			            ")
			.query("          on d.item_idcd = a.item_idcd	                        ")
			.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no" 		))
			.query("and    a.row_sts = 0           							")
			.query("order by a.line_seqn		           							")
		;
	    return data.selectForMap();
	}

	/**
	 * 상담내역 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getCounsel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.hq_id  , a.stor_grp   , a.stor_id     			")
			.query("     , a.inv_no    , a.ctr_no     , a.ctr_dt   				")
			.query("     , a.cust_id   , a.mmb_id    , a.emp_id   			")
		    .query("     , (select emp_nm from usr_mst where emp_id = a.emp_id) as emp_nm 	")
		    .query("     , (select emp_nm from usr_mst where emp_id = a.upt_nm) as update_user_nm 	")
			.query("     , a.user_memo         									")
			.query("     , a.upt_nm , a.upt_dt , a.crt_nm , a.crt_dt ")
			.query("from   cust_counsel a                                   	")
			.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no" 		))
			.query("and    a.row_sts = 0           							")
			.query("order by a.ctr_no		           							")
		;
	    return data.selectForMap();
	}

	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setCounsel(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
//		DataMessage data1 = arg.newStorage("POS1");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);

		for(SqlResultRow inv:map){

//			Action rowaction = SqlParameter.Action.setValue(inv.getParameter("_set"));

//			if (rowaction == Action.delete) {
			if ( "delete".equals(inv.getParamText("del_gb")) ) {
	        	data.param
	    			.table("cust_counsel")
	    			.where("where ctr_no = :ctr_no ")
		        	//
					.unique("ctr_no"      , inv.fixParameter("ctr_no"))
					.update("row_sts"   , inv.getParameter("row_sts"))
					.update("upt_nm"   , inv.getParameter("upt_nm"))
					.update("upt_ip"   , arg.remoteAddress			)
					.update("upt_dt"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					;data.attach(Action.update);

			} else {
				String ctrno = inv.getParamText("ctr_no").toString();

				if ( ctrno.length() == 0 || ctrno == "" ){ /* 상담번호가 없으면 신규 */

					data.param // 쿼리문  입력
					.query("select a.hq_id  , a.stor_grp   , :stor_id as stor_id  " , inv.fixParameter("stor_id" ))
					.query("     , a.inv_no    , a.ctr_no     , a.ctr_dt   				")
					.query("     , a.cust_id   , a.mmb_id    , a.emp_id   			")
					.query("     , a.user_memo         									")
					.query("     , a.upt_dt , a.crt_dt  						    ")
//					.query(" 	 , a.inv_no|| (count(a.ctr_no)+1)  as new_ctr_no 		")
					.query("from   cust_counsel a                                   	")
					.query("where  a.inv_no =:inv_no " , inv.fixParameter("inv_no" 		))
					.query("and    a.row_sts = 0           							")
					.query("group by  a.hq_id  , a.stor_grp   , a.stor_id 			")
					.query("     , a.inv_no    , a.ctr_no     , a.ctr_dt 				")
					.query("     , a.cust_id   , a.mmb_id    , a.emp_id 				")
					.query("     , a.user_memo 											")
					.query("     , a.upt_dt , a.crt_dt  , a.upt_nm 			")
					.query("order by a.ctr_no		           							")
				;
				SqlResultRow row = data.selectForRow();


				String usermemo = inv.getParamText("user_memo").toString();
				String updatenm = inv.getParamText("upt_nm").toString();

				data.clear();

				if ( row != null   ) { /* 조회 결과값이 있으면 */

					data.param // 쿼리문  입력
						.query("select a.inv_no|| (count(a.ctr_no)+1)  as new_ctr_no 		")
						.query("from   cust_counsel a                                   	")
						.query("where  a.inv_no =:inv_no " , inv.fixParameter("inv_no" 		))
						.query("and    a.row_sts = 0           							")
						.query("group by  a.inv_no 											")
					;
					SqlResultRow ctr = data.selectForRow();

		        	data.param
		    			.table("cust_counsel																")
		    			.where("where ctr_no = :ctr_no 														")
		    			.where("and   inv_no = :inv_no 														")
			        	//
						.unique("hq_id"      , row.fixParameter("hq_id"								))
						.unique("stor_grp"      , row.fixParameter("stor_grp"								))
						.unique("stor_id"      , row.fixParameter("stor_id"								))

						.unique("ctr_no"        , ctr.fixParameter("new_ctr_no"								))
						.unique("inv_no"        , row.fixParameter("inv_no"									))
						.update("ctr_dt"        , new SqlParamText("to_char(sysdate, 'yyyymmdd')"			))

						.insert("cust_id"       , row.fixParameter("cust_id"								))
						.insert("mmb_id"       , row.fixParameter("mmb_id"								))
						.insert("emp_id"       , updatenm													 )

						.update("user_memo"     , usermemo													 )

						.update("row_sts"     , "0"														 )
						.update("upt_nm"     , updatenm													 )
						.update("upt_ip"     , arg.remoteAddress											)
						.update("upt_dt"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')")	)
						.insert("crt_nm"     , updatenm													 )
						.insert("crt_ip"     , arg.remoteAddress											)
						.insert("crt_dt"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"	))
						;data.attach(Action.modify);

					} else { /* 조회결과 값이 없으면 */

			        	data.param
			    			.table("cust_counsel																")
			    			.where("where ctr_no = :ctr_no 														")
			    			.where("and   inv_no = :inv_no 														")
				        	//
							.unique("hq_id"      , inv.fixParameter("hq_id"								))
							.unique("stor_grp"      , inv.fixParameter("stor_grp"								))
							.unique("stor_id"      , inv.fixParameter("stor_id"								))

							.unique("ctr_no"        , inv.fixParameter("inv_no"	) + "1"  						 )
							.unique("inv_no"        , inv.fixParameter("inv_no"									))
							.update("ctr_dt"        , new SqlParamText("to_char(sysdate, 'yyyymmdd')"			))

							.insert("cust_id"       , inv.fixParameter("cust_id"								))
							.insert("mmb_id"       , inv.fixParameter("mmb_id"								))
							.insert("emp_id"       , updatenm													 )

							.update("user_memo"     , usermemo													 )

							.update("row_sts"     , "0"														 )
							.update("upt_nm"     , updatenm													)
							.update("upt_ip"     , arg.remoteAddress											)
							.update("upt_dt"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')")	)
							.insert("crt_nm"     , updatenm													)
							.insert("crt_ip"     , arg.remoteAddress											)
							.insert("crt_dt"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"	))
							;data.attach(Action.modify);
					}

				} else { /* 상담번호가 있으면 수정 */
		        	data.param
		    			.table("cust_counsel																")
		    			.where("where ctr_no = :ctr_no 														")
			        	//
						.unique("ctr_no"        , inv.fixParameter("ctr_no"									))
//						.update("ctr_dt"        , new SqlParamText("to_char(sysdate, 'yyyymmdd')"			))

//						.insert("cust_id"       , row.fixParameter("cust_id"								))
//						.insert("mmb_id"       , row.fixParameter("mmb_id"								))
//						.insert("emp_id"       , inv.fixParameter("emp_id"								))

						.update("user_memo"     , inv.getParameter("user_memo"								))

//						.update("row_clos"     , inv.getParameter("row_clos"								))
						.update("upt_nm"     , inv.getParameter("upt_nm"								))
						.update("upt_ip"     , arg.remoteAddress											)
						.update("upt_dt"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')")	)
						;data.attach(Action.update);

				}
			}
		}

		data.execute();
		return null ;

	}



	/**
	 * 상담 매출내역 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getCounselOrder(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.hq_id  , a.stor_grp   , a.stor_id     ")
			.query("     , a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp	")
		    .query("     , (select stor_nm from store where stor_id = b.wareh_id) as wareh_nm 	")
		    .query("     , (select vend_nm from vend_mst where vend_id = b.pack_vend_id) as pack_vend_nm 	")
     	    .query("	 , (select zone_nm from itm_zone where stor_grp = a.stor_grp and zone_id = b.pack_zone_id) as pack_zone_nm ")
			.query("     , a.unit_idcd   , (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
			.query("     , a.unt_qty  , a.mst_itm_id    			       				")
			.query("     , a.item_idcd   , a.item_code    , a.item_name     , a.item_spec	")
			.query("     , d.brcd_1 as barcode                                    ")
			.query("     , a.notax_yn  , a.qty        , a.price						") // , b.stock
			.query("     , a.org_ord_qty  , a.ship_qty   , a.rest_qty  				")
//			.query("     , b.sts_cd 								 				")
//			.query("     , (case when a.rest_qty = a.qty then '0200'  				") /* 검수상태 */
//			.query("             when a.rest_qty = 0     then '0500'  				")
//			.query("             else '0400' end ) as sts_cd 		  				")
			.query("     , a.po_pri  , a.po_pri_type  , a.po_pri_rt        	")
			.query("     , a.tax_free  , a.taxation   , a.sply_amt    , a.tax       , a.amount     ")
			.query("     , (( a.amount - a.po_pri )  / ( case when a.amount = 0 then 1 else a.amount end ) * 100 ) as margin_per ")
			.query("     , a.user_memo , a.ship_memo  , a.row_sts                 ")
			.query("from   order_item a                                   		")
			.query("       left join order_pack b on a.stor_id = b.stor_id	")
			.query("                        and a.pack_no = b.pack_no         	")
			.query("       left join itm_zone c on b.stor_grp = c.stor_grp     ")
			.query(" 			            and b.pack_zone_id = c.zone_id 		")
			.query("       join itm_mst d             			            ")
			.query("          on d.item_idcd = a.item_idcd	                        ")
			.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no" 		))
			.query("and    a.row_sts = 0           							")
			.query("order by a.line_seqn		           							")
		;
	    return data.selectForMap();
	}

}
