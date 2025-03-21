package com.sky.system.zreport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
//import com.sky.services.FaxHostingService;

@Service
public class ZDeliveryCloseService  extends DefaultServiceHandler {
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

//		String query_id = arg.fixParamText("query_id" );
//		String query_nm = arg.getParamText("query_nm" );

		String balance_yn  = arg.getParamText("balance_yn" );
		String taxprint_yn = arg.getParamText("taxprint_yn" );

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);


		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(a.tax_free) as tax_free , sum(a.sply_amt) as sply_amt  	")
			.total("    ,    sum(a.tax) as tax   , sum(a.amount) as amount     , sum(a.payment) as payment 		")
			.total("    ,    sum(a.npay_amt) as npay_amt , sum(a.app_card) as  app_card							")
		;
		data.param // 쿼리문  입력
			.query("select a.row_clos , a.stor_id  												")
			.query("  ,   (select stor_nm from store where stor_id = a.stor_id) as stor_nm 		")
			.query("  ,   a.inv_work_id , a.inv_dt , a.inv_no 	, a.cust_id , b.cust_cd				")
			.query("  ,   a.cust_gb     , a.cust_nm , a.mmb_id, a.mmb_nm , a.biz_no , c.login_id  ")
			.query("  ,   a.biz_tel_no, a.biz_hp_no, c.tel_no , c.hp_no, b.biz_fax_no as fax_no 	")
			.query("  ,   a.reve_nm     , a.reve_tel_no  , a.reve_hp_no  , a.reve_email 			")
			.query("  ,   a.reve_zip_cd , a.reve_addr_1   , a.reve_addr_2   , a.reve_fax_no			")
			.query("  ,   a.tax_free    , a.sply_amt     , a.tax         , a.amount     , a.npay_amt ")
			.query("  ,   a.payment 	, a.app_card	    										")
			.query("  ,   (select vend_nm from vend_mst where vend_id = a.pack_vend_id) as pack_vend_nm ")
			.query("  ,   (select bas_nm from base_mst where bas_id = a.pack_zone_id) as pack_zone_nm ")
//			.query("  ,   (select bas_nm from base_mst where bas_id = f.hdli_id) as taekbae_nm ")
			.query("  ,    a.user_memo  , a.req_msg 												") // f.hdli_no  ,
			.query("  ,   (select emp_nm from usr_mst where emp_id = a.inv_user_id) as inv_user_nm ")
			.query("  ,   (select emp_nm from usr_mst where emp_id = a.salesman_id) as salesman_nm ")
//			.query("  ,   a.tax_amount  , a.tax_dt  , a.tax_yn 										")
			.query("  ,   f.tax_dt  , f.issue_dt   , a.tax_yn , a.hdli_no  , a.hdli_id, a.inv_prt_cnt	")
			.query("  ,   (select bas_nm from base_mst where bas_id = a.hdli_id) as taekbae_nm ")
			.query("  ,   e.inv_dt as ori_dt, a.ori_no  , a.crt_dt  , a.upt_dt 				")
			.query("  ,   (e.inv_dt||e.inv_tm ) as confirm_dt 										")
			.query("  ,   (select emp_nm from usr_mst where emp_id = a.upt_nm) as upt_nm 	")
	  		.query("  ,   a.prom_yn																	")
//	  		.query("  ,   (e.qty - e.ship_qty) as no_delivery_qty									")
	 		;
		data.param // 쿼리문  입력
	  		.where(" from sale_mst a 																")
			.where("      join cust_mst b on a.cust_id = b.cust_id 								")
			.where("      join cust_memb c on a.cust_id = c.cust_id     and a.mmb_id = c.mmb_id 	")
			.where("      join cust_stor d on a.stor_id = d.stor_id 	and a.cust_id  = d.cust_id	")
//			.where("      join seq_taekbae f on a.stor_id = f.stor_id 							")
//			.where("                        and a.ori_no = f.inv_no 								")
	      	.where("	  left outer join order_mst e on a.stor_id = e.stor_id 	 and a.ori_no = e.inv_no ")
	      	.where("	  left outer join sale_taxbill f on a.stor_id = f.stor_id  and a.tax_no = f.tax_no ")
			.where("where a.stor_grp  =   :stor_grp 	  " , arg.fixParameter("stor_grp"   		))
			.where("  and a.stor_id      = :stor_id     " , arg.getParameter("stor_id" 			))
			.where("  and a.row_sts = 0                                                           ")
//			.where("  and a.inv_work_gb = '1'                                                       ")
			;
		if ( ( search_id.equals("5") || search_id.equals("6") ) &&  !"".equals(find_name)  ) {

			data.param
				.where("  and a.ori_no   = :find_name  " , find_name , "5".equals( search_id 			)) // 주문번호
				.where("  and a.inv_no   = :find_name  " , find_name , "6".equals( search_id 			)) // 매출번호
			;
		}

		if ( search_id.equals("1") || search_id.equals("2") || search_id.equals("3") || search_id.equals("4") || search_id.equals("7") || search_id.equals("8") || (( search_id.equals("5") || search_id.equals("6") ) &&  "".equals(find_name) ) ) {
			data.param // 쿼리문  입력
				.where("  and a.inv_dt between :fr_dt     " , arg.fixParameter("fr_dt"    				)) // 사작일자
				.where("                   and :to_dt     " , arg.fixParameter("to_dt"    				)) // 종료일자
				.where("  and a.inv_work_id  in (:inv_work_id )   " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */

				.where("  and a.sts_cd        = :sts_cd       " , arg.getParameter("sts_cd"    			)) // 주문상태
//				.where("  and a.row_sts     = :row_sts    " , arg.getParameter("row_sts"    		)) // 마감상태
				.where("  and a.row_clos     = :row_clos    " , arg.getParameter("row_clos"    		)) // 마감상태

				.where("  and a.inv_user_id   = :inv_user_id  " , arg.getParameter("inv_user_id"    	)) // 영업담당
				.where("  and a.salesman_id   = :salesman_id  " , arg.getParameter("salesman_id"    	)) // 작업담당
				.where("  and a.hdli_id    = :hdli_id   " , arg.getParameter("hdli_id"       	)) // 택배사

				.where("  and b.cust_gb     = :cust_gb    " , arg.getParameter("cust_gb"    			)) // 고객구분
				.where("  and d.cls1_id     = :cls1_id    " , arg.getParameter("cls1_id"    			)) // 고객분류1
				.where("  and d.cls2_id     = :cls2_id    " , arg.getParameter("cls2_id"    			)) // 고객분류2
				.where("  and d.cls3_id     = :cls3_id    " , arg.getParameter("cls3_id"    			)) // 고객분류3

				.where("  and a.cust_id     = :cust_id    " , arg.getParameter("cust_id"      		 	)) // 고객 ID
				.where("  and a.cust_nm  like %:find_name%  " , find_name , "1".equals( search_id 		)) // 고객명
				.where("  and a.mmb_nm  like %:find_name%  " , find_name , "2".equals( search_id 		)) // 회원명
				.where("  and ( a.biz_tel_no     like :find_name%  " , find_name , "3".equals( search_id )) // 전화번호
				.where("        or a.reve_tel_no like :find_name%  ) " , find_name , "3".equals( search_id )) // 전화번호

				.where("  and a.reve_hp_no like :find_name%  " , find_name , "4".equals( search_id 	)) // 휴대전화
				.where("  and a.reve_nm     like %:find_name% " , find_name , "7".equals( search_id 	)) // 수령자이름
				.where("  and a.user_memo   like %:user_memo% " , find_name , "8".equals( search_id 	)) // 작업메모

				.where("  and a.prom_yn = :prom_yn  		  " , arg.getParameter("prom_yn" ) , "0".equals( arg.getParameter("prom_yn" ) 	)) // 특가구분 : 일반
				.where("  and a.prom_yn = :prom_yn  		  " , arg.getParameter("prom_yn" ) , "1".equals( arg.getParameter("prom_yn" ) 	)) // 특가구분 : 특가

				;
				if ( balance_yn.equals("1") ) {
					data.param
					.where("  and a.npay_amt  <> 0 													") // 미수금 매출만
					;
				}

				if( taxprint_yn.equals("1") ){
					data.param
					.where("  and a.tax_yn = '0'  													") // 계산서 미발행 매출만
					;
				}

		}
		data.param
		.where("order by a.inv_no		 														")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
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

			.query("select a.seq_dsp  , a.item_code ,  a.item_name ,  a.item_spec  , a.unit_price , a.unt_qty	")
			.query("   ,  (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name 	")
			.query("   ,  a.qty  , a.price  , a.tax_free  , a.sply_amt  , a.tax  , a.amount 	")
			.query("   ,  a.po_pri ,  a.user_memo 	, b.brcd_1 as barcode					")
			.query(" from sale_dtl a 															")
			.query("      join itm_mst b on a.item_idcd = b.item_idcd 							")
			.query("where a.stor_id   = :stor_id   		" , arg.fixParameter("stor_id" 	))
			.query("  and a.row_sts  = 0	 												    ")
			.query("  and a.inv_no     = :inv_no   			" , arg.fixParameter("inv_no" 		))
			.query("order by a.line_seqn	 														")
			;

	    return data.selectForMap();
	}

	/**
	 * 미처리 현황 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getNoDelivery(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

		String balance_yn  = arg.getParamText("balance_yn" );

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);

		DataMessage data = arg.newStorage("POS");
			data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(a.tax_free) as tax_free , sum(a.taxation) as taxation  	")
			.total("    ,    sum(a.tax) as tax   , sum(a.amount) as amount     , sum(a.npay_amt) as npay_amt 		")
			;
		data.param // 쿼리문  입력
			.query("select a.row_clos , a.stor_id  												")
			.query("  ,   (select stor_nm from store where stor_id = a.stor_id) as stor_nm 		")
			.query("  ,   a.inv_work_id , a.inv_dt , a.inv_no 										")
			.query("  ,   a.cust_gb     , a.cust_nm , a.mmb_nm , a.biz_no , c.login_id , c.tel_no , c.hp_no ")
			.query("  ,   a.reve_nm     , a.reve_tel_no  , a.reve_hp_no  , a.reve_email 			")
			.query("  ,   a.reve_zip_cd , a.reve_addr_1   , a.reve_addr_2  							")
			.query("  ,   a.tax_free    , a.taxation     , a.tax         , a.amount     , a.npay_amt ")
			.query("  ,   a.user_memo   , a.req_msg 	 , a.rest_qty								")
			.query("  ,   (select emp_nm from usr_mst where emp_id = a.inv_user_id) as inv_user_nm ")
			.query("  ,   (select emp_nm from usr_mst where emp_id = a.salesman_id) as salesman_nm ")
			.query("  ,   a.crt_dt   , a.upt_dt 												")
			.query("  ,   (select emp_nm from usr_mst where emp_id = a.upt_nm) as upt_nm 	")
			;
		data.param // 쿼리문  입력
			.where(" from order_mst a 																")
			.where("  and a.row_sts = 0                                                           ")
			.where("      join cust_mst b on a.cust_id = b.cust_id 								")
			.where("      join cust_memb c on a.cust_id = c.cust_id 								")
			.where("                      and a.mmb_id = c.mmb_id 								")
			.where("      join cust_stor d on a.stor_id = d.stor_id 								")
			.where("                       and a.cust_id  = d.cust_id 								")
			.where("where a.stor_grp  =   :stor_grp 	  " , arg.fixParameter("stor_grp"   ))
			.where("  and a.stor_id      = :stor_id     " , arg.getParameter("stor_id" 			))
			;
		if ( search_id.equals("5") || search_id.equals("6")  ) {

			data.param
				.where("  and a.ori_no   = :find_name  " , find_name , "5".equals( search_id 			)) // 주문번호
				.where("  and a.ori_no   = :find_name  " , find_name , "6".equals( search_id 			)) // 매출번호
			;
		}

		if ( search_id.equals("1") || search_id.equals("2") || search_id.equals("3") || find_name.equals("4") ) {
			data.param // 쿼리문  입력
				.where("  and a.qty      <> a.ship_qty 													")
				.where("  and a.inv_dt between :fr_dt     " , arg.fixParameter("fr_dt"    				)) // 사작일자
				.where("                   and :to_dt     " , arg.fixParameter("to_dt"    				)) // 종료일자
				.where("  and a.inv_work_id  in (:inv_work_id )   " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */

				.where("  and a.sts_cd        = :sts_cd       " , arg.getParameter("sts_cd"    			)) // 주문상태
	//				.where("  and a.row_sts     = :row_sts    " , arg.getParameter("row_sts"    		)) // 마감상태
				.where("  and a.row_clos     = :row_clos    " , arg.getParameter("row_clos"    		)) // 마감상태

				.where("  and a.inv_user_id   = :inv_user_id  " , arg.getParameter("inv_user_id"    	)) // 영업담당
				.where("  and a.salesman_id   = :salesman_id  " , arg.getParameter("salesman_id"    	)) // 작업담당
	//			.where("  and a.hdli_id    = :hdli_id   " , arg.getParameter("hdli_id"       	)) // 택배사

				.where("  and b.cust_gb     = :cust_gb    " , arg.getParameter("cust_gb"    			)) // 고객구분
				.where("  and d.cls1_id     = :cls1_id    " , arg.getParameter("cls1_id"    			)) // 고객분류1
				.where("  and d.cls2_id     = :cls2_id    " , arg.getParameter("cls2_id"    			)) // 고객분류2
				.where("  and d.cls3_id     = :cls3_id    " , arg.getParameter("cls3_id"    			)) // 고객분류3

				.where("  and a.cust_nm  like %:find_name%  " , find_name , "1".equals( search_id 		)) // 고객명
				.where("  and a.mmb_nm  like %:find_name%  " , find_name , "2".equals( search_id 		)) // 회원명
				.where("  and ( a.biz_tel_no     like :find_name%  " , find_name , "3".equals( search_id )) // 전화번호
				.where("        or a.reve_tel_no like :find_name%  " , find_name , "3".equals( search_id )) // 전화번호

				.where("  and a.reve_hp_no like :find_name%  " , find_name , "4".equals( search_id 	)) // 휴대전화
				;
				if ( balance_yn.equals("1") ) {
					data.param
					.where("  and a.npay_amt  <> 0 													") // 미수금 매출만
					;
				}

		}
		data.param
		.where("order by a.inv_no		 														")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}

	/**
	 * 미처리 현황 상세 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getNoDeliveryItem(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.seq_dsp  , b.item_code ,  b.item_name ,  b.item_spec  , a.unit_price , a.unt_qty	")
			.query("   ,  (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name 	")
			.query("   ,  (a.qty - a.ship_qty) as qty										 	")
			.query("   ,  a.price  , a.tax_free  , a.taxation  , a.tax  , a.amount 				")
//  			.query("   ,  (a.qty - a.ship_qty) as no_delivery_qty								")
			.query("   ,  a.user_memo 															")
			.query(" from order_item a 															")
			.query("      join itm_mst b on a.item_idcd = b.item_idcd 							")
			.query("                      and b.row_sts = 0                                   ")
//			.query("      join order_item c on a.ori_no = c.inv_no 								")
//			.query("      				   and a.item_idcd = c.item_idcd 							")
			.where("where a.stor_grp   = :stor_grp 	  		" , arg.fixParameter("stor_grp"     ))
			.query("  and a.stor_id   = :stor_id   		" , arg.getParameter("stor_id" 	))
			.query("  and a.row_sts  = 0	 												    ")
			.query("  and a.qty       <> a.ship_qty	 											")
			.query("  and a.inv_no     = :inv_no   			" , arg.fixParameter("inv_no" 		))
			.query("order by a.line_seqn	 														")

		;

	    return data.selectForMap();
	}


	/**
	 * 상품별 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getItemList(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

		String balance_yn  = arg.getParamText("balance_yn" );
		String taxprint_yn = arg.getParamText("taxprint_yn" );

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);

			DataMessage data = arg.newStorage("POS");
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize , sum(b.qty) as qty  , sum(b.tax_free) as tax_free 	")
				.total("       , sum(b.sply_amt) as sply_amt , sum(b.tax) as tax , sum(b.amount) as amount  ")
			;
			data.param // 쿼리문  입력
				.query("select  a.cust_id, a.cust_nm, a.mmb_id, a.mmb_nm 								")
				.query("	, 	b.item_code, b.item_name, b.unit_idcd , b.unt_qty							")
				.query("	, 	i2.brcd_1 as barcode													")
				.query("	,	( select unit_name from item_unit where unit_idcd = b.unit_idcd ) as unit_name 	")
				.query("	, 	b.qty , b.unit_price, b.price, b.item_spec 								")
				.query("	, 	b.item_idcd, b.sply_amt, b.tax 	, b.tax_free							")
//				.query("	, 	b.amount, (p.qty - p.ship_qty) as no_delivery_qty 						")
				.query("	, 	b.amount 																")
				.query("	, 	(select rest_qty from order_item where  inv_no = b.ori_no  and line_seqn = b.ori_seq  ) as no_delivery_qty ")
				.query("	, 	( select bas_nm from base_mst where bas_id = a.pack_zone_id) as pack_zone_nm ")
				.query("	, 	a.inv_dt, a.stor_id, a.inv_no, a.ori_no, a.req_msg , b.user_memo		")
//				.query("	, 	(b.qty * b.unit_price) as unit_total, b.user_memo 						")
				.query("	, 	( select bas_nm from base_mst where bas_id = i2.mfg_id ) as mfg_nm 	")
				.query("	, 	( select stor_nm from store where stor_id = a.stor_id ) as stor_nm 	")
				.query("	, 	i2.stad_sale_pri as bonsa_price, i.stad_sale_pri as store_price 				")
				.query("	, 	a.prom_yn 																")
			;
			data.param // 쿼리문  입력
				.where("  from  sale_mst       a 														")
				.where("		join sale_dtl b on a.stor_id = b.stor_id and a.inv_no = b.inv_no 	")
				.where("  		join itm_stor  i  on b.stor_id = i.stor_id and b.item_idcd = i.item_idcd ")
				.where(" 	 	join itm_mst   i2 on b.item_idcd = i2.item_idcd 							")
//				.where("  		left outer join order_mst o on o.inv_no = a.ori_no 					")
//				.where("  		join order_item p on b.ori_no = p.inv_no and b.item_idcd = p.item_idcd		")
				.where("  		join cust_mst  q on a.cust_id = q.cust_id 								")
				.where("  		join cust_stor r on a.stor_id = r.stor_id 							")
				.where("  						 and a.cust_id = r.cust_id 								")
				.where("where a.stor_grp      = :stor_grp 	  " , arg.fixParameter("stor_grp"   		))
				.where("  and a.stor_id      = :stor_id     " , arg.getParameter("stor_id" 			))
				.where("  and a.row_sts = 0                                                           ")
				.where("  and b.row_sts = 0                                                           ")
				;

			if ( search_id.equals("5") || search_id.equals("6")  ) {

				data.param
					.where("  and a.ori_no   = :find_name  " , find_name , "5".equals( search_id 			)) // 주문번호
					.where("  and a.inv_no   = :find_name  " , find_name , "6".equals( search_id 			)) // 매출번호
				;
			}

			if ( search_id.equals("1") || search_id.equals("2") || search_id.equals("3") || search_id.equals("4") || search_id.equals("8") ) {
				data.param
					.where("  and a.inv_dt between :fr_dt     " , arg.fixParameter("fr_dt"    				)) // 사작일자
					.where("                   and :to_dt     " , arg.fixParameter("to_dt"    				)) // 종료일자
					.where("  and a.inv_work_id in (:inv_work_id )   " , inv_work_id ,( inv_work_id.length > 0) )  /* 주문 위치 */

					.where("  and a.sts_cd        = :sts_cd       " , arg.getParameter("sts_cd"    			)) // 주문상태
	//				.where("  and a.row_sts     = :row_sts    " , arg.getParameter("row_sts"    		)) // 마감상태
					.where("  and a.row_clos     = :row_clos    " , arg.getParameter("row_clos"    		)) // 마감상태

					.where("  and a.inv_user_id   = :inv_user_id  " , arg.getParameter("inv_user_id"    	)) // 영업담당
					.where("  and a.salesman_id   = :salesman_id  " , arg.getParameter("salesman_id"    	)) // 작업담당
					.where("  and a.hdli_id    = :hdli_id   " , arg.getParameter("hdli_id"       	)) // 택배사

					.where("  and i.item_idcd       = :item_idcd      " , arg.getParameter("item_idcd"       		)) // 품목코드

					.where("  and q.cust_gb     = :cust_gb    " , arg.getParameter("cust_gb"    			)) // 고객구분
					.where("  and r.cls1_id     = :cls1_id    " , arg.getParameter("cls1_id"    			)) // 고객분류1
					.where("  and r.cls2_id     = :cls2_id    " , arg.getParameter("cls2_id"    			)) // 고객분류2
					.where("  and r.cls3_id     = :cls3_id    " , arg.getParameter("cls3_id"    			)) // 고객분류3

					.where("  and a.cust_id     = :cust_id    " , arg.getParameter("cust_id"      		 	)) // 고객 ID
					.where("  and a.cust_nm  like %:find_name%  " , find_name , "1".equals( search_id 		)) // 고객명
					.where("  and a.mmb_nm  like %:find_name%  " , find_name , "2".equals( search_id 		)) // 회원명
					.where("  and ( a.biz_tel_no     like :find_name%  " , find_name , "3".equals( search_id )) // 전화번호
					.where("        or a.reve_tel_no like :find_name%  " , find_name , "3".equals( search_id )) // 전화번호

					.where("  and a.reve_hp_no like :find_name%  " , find_name , "4".equals( search_id 	)) // 휴대전화
					.where("  and a.user_memo   like %:user_memo% " , find_name , "8".equals( search_id 	)) // 작업메모

					.where("  and a.prom_yn = :prom_yn  		  " , arg.getParameter("prom_yn" ) , "0".equals( arg.getParameter("prom_yn" ) 	)) // 특가구분 : 일반
					.where("  and a.prom_yn = :prom_yn  		  " , arg.getParameter("prom_yn" ) , "1".equals( arg.getParameter("prom_yn" ) 	)) // 특가구분 : 특가
				;
				if ( balance_yn.equals("1") ) {
					data.param
					.where("  and a.npay_amt  <> 0 													") // 미수금 매출만
					;
				}

				if( taxprint_yn.equals("1") ){
					data.param
					.where("  and a.tax_yn = '0'  													") // 계산서 미발행 매출만
					;
				}


			}

			data.param
			.where("order by a.inv_no	, b.item_idcd													")
			;

			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows , (page==1),sort );
			}
	}



	/**
	 * 상품별 집계 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getItemGroup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

		String balance_yn  = arg.getParamText("balance_yn" );
		String taxprint_yn = arg.getParamText("taxprint_yn" );

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);


			DataMessage data = arg.newStorage("POS");
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize , sum(x.qty) as qty ")
				.total("   ,     sum(x.stock) as stock                   ")
			;
			data.param // 쿼리문  입력
				.query("select  x.item_code, x.item_name, x.unt_qty , x.item_spec	, x.barcode				")
				.query(",	x.unit_name		")
				.query(", 	x.mfg_nm		")
				.query(", 	x.vend_nm		")
				.query(",   x.qty   , x.user_memo ,  x.stock 	")
				.query(", 	x.pack_zone_nm")
			;
			data.param // 쿼리문  입력
				.where("from (																			")
				.where("select  b.item_code, b.item_name, b.unt_qty , b.item_spec							")
				.where(", 	i2.brcd_1 as barcode														")
				.where(",	( select unit_name from item_unit where unit_idcd = b.unit_idcd ) as unit_name		")
				.where(", 	( select bas_nm from base_mst where bas_id = i2.mfg_id ) as mfg_nm		")
				.where(", 	( select vend_nm from vend_mst where vend_id = i.vend_id ) as vend_nm		")
				.where(",   sum(isnull(b.qty, 0)) as qty   , b.user_memo ,  max(isnull(s.stock, 0)) as stock 	")
				.where(", 	( select bas_nm from base_mst where bas_id = a.pack_zone_id) as pack_zone_nm")
				.where("  from  sale_mst       a 														")
				.where("		join sale_dtl b on a.stor_id = b.stor_id and a.inv_no = b.inv_no 	")
				.where("  		join itm_stor  i  on b.stor_id = i.stor_id and b.item_idcd = i.item_idcd ")
				.where(" 	 	join itm_mst   i2 on b.item_idcd = i2.item_idcd 							")
//				.where("  		left outer join order_mst o on o.inv_no = a.ori_no 					")
//				.where("  		join order_item p on a.ori_no = p.inv_no 								")
				.where("  		join cust_mst  q on a.cust_id = q.cust_id 								")
				.where("  		join cust_stor r on a.stor_id = r.stor_id 							")
				.where("  						 and a.cust_id = r.cust_id 								")
        		.where("		left outer join itm_stock s on b.stor_id = s.stor_id 				")
        		.where("         				 and b.item_idcd = s.item_idcd								")

        		.where("where a.stor_grp  =   :stor_grp 	  " , arg.fixParameter("stor_grp"   		))
				.where("  and a.stor_id  =   :stor_id       " , arg.getParameter("stor_id" 			))
				.where("  and a.row_sts = 0                                                           ")
				.where("  and b.row_sts = 0                                                           ")
				;
			if ( search_id.equals("5") || search_id.equals("6")  ) {

				data.param
					.where("  and a.ori_no   = :find_name  " , find_name , "5".equals( search_id 			)) // 주문번호
					.where("  and a.inv_no   = :find_name  " , find_name , "6".equals( search_id 			)) // 매출번호
				;
			}

			if ( search_id.equals("1") || search_id.equals("2") || search_id.equals("3") || search_id.equals("4") ) {
				data.param
					.where("  and a.inv_dt between :fr_dt     " , arg.fixParameter("fr_dt"    				)) // 사작일자
					.where("                   and :to_dt     " , arg.fixParameter("to_dt"    				)) // 종료일자
					.where("  and a.inv_work_id in (:inv_work_id )    " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */

					.where("  and a.sts_cd        = :sts_cd       " , arg.getParameter("sts_cd"    			)) // 주문상태
	//				.where("  and a.row_sts     = :row_sts    " , arg.getParameter("row_sts"    		)) // 마감상태
					.where("  and a.row_clos     = :row_clos    " , arg.getParameter("row_clos"    		)) // 마감상태

					.where("  and a.inv_user_id   = :inv_user_id  " , arg.getParameter("inv_user_id"    	)) // 영업담당
					.where("  and a.salesman_id   = :salesman_id  " , arg.getParameter("salesman_id"    	)) // 작업담당
					.where("  and a.hdli_id    = :hdli_id   " , arg.getParameter("hdli_id"       	)) // 택배사

					.where("  and i.item_idcd       = :item_idcd      " , arg.getParameter("item_idcd"       		)) // 품목코드

					.where("  and q.cust_gb     = :cust_gb    " , arg.getParameter("cust_gb"    			)) // 고객구분
					.where("  and r.cls1_id     = :cls1_id    " , arg.getParameter("cls1_id"    			)) // 고객분류1
					.where("  and r.cls2_id     = :cls2_id    " , arg.getParameter("cls2_id"    			)) // 고객분류2
					.where("  and r.cls3_id     = :cls3_id    " , arg.getParameter("cls3_id"    			)) // 고객분류3

					.where("  and a.cust_id     = :cust_id    " , arg.getParameter("cust_id"      		 	)) // 고객 ID
					.where("  and a.cust_nm  like %:find_name%  " , find_name , "1".equals( search_id 		)) // 고객명
					.where("  and a.mmb_nm  like %:find_name%  " , find_name , "2".equals( search_id 		)) // 회원명
					.where("  and ( a.biz_tel_no     like :find_name%  " , find_name , "3".equals( search_id )) // 전화번호
					.where("        or a.reve_tel_no like :find_name%  " , find_name , "3".equals( search_id )) // 전화번호

					.where("  and a.reve_hp_no like :find_name%  " , find_name , "4".equals( search_id 	)) // 휴대전화
					.where("  and a.user_memo   like %:user_memo% " , find_name , "8".equals( search_id 	)) // 작업메모

					.where("  and a.prom_yn = :prom_yn  		  " , arg.getParameter("prom_yn" ) , "0".equals( arg.getParameter("prom_yn" ) 	)) // 특가구분 : 일반
					.where("  and a.prom_yn = :prom_yn  		  " , arg.getParameter("prom_yn" ) , "1".equals( arg.getParameter("prom_yn" ) 	)) // 특가구분 : 특가
			;
				if ( balance_yn.equals("1") ) {
					data.param
					.where("  and a.npay_amt  <> 0 													") // 미수금 매출만
					;
				}

				if( taxprint_yn.equals("1") ){
					data.param
					.where("  and a.tax_yn = '0'  													") // 계산서 미발행 매출만
					;
				}

			}

			data.param
				.where("group by b.item_code, b.item_name, b.unt_qty  , b.user_memo , b.item_spec			")
				.where("	  ,  b.unit_idcd  , i2.mfg_id  , i.vend_id  , a.pack_zone_id 	, i2.brcd_1	")
				.where(") x		 																		")
				.where("order by x.item_code		 														")
			;

			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows , (page==1),sort );
			}


	}



    /**
     * 매출마감 / 마감취소
     *
     * @param arg
     * @return
     * @throws Exception
     */
    public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

    		DataMessage data = arg.newStorage("POS");
    		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

    		for (SqlResultRow row:map) {

    			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

    				if (rowaction == Action.update) {

    		        	data.param
    		    			.table("sale_mst")
    		    			.where("where inv_no = :inv_no ")
    			        	//
    						.unique("inv_no"      , row.fixParameter("inv_no"     ))
    		        		.update("row_clos"   , row.getParameter("row_clos"  ))
    						.update("upt_nm"   , row.getParameter("upt_nm"  ))
    						.update("upt_ip"   , arg.remoteAddress			   )
    						.update("upt_dt"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    						.action = rowaction;
    		        	data.attach();


    				}
    		}

    		data.execute();
    		return null;
    }


    /**
     * 송장번호 입력
     *
     * @param arg
     * @return
     * @throws Exception
     */
    public SqlResultMap setTaekbae(HttpRequestArgument arg) throws Exception {

    		DataMessage data = arg.newStorage("POS");
    		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

    		for (SqlResultRow row:map) {

//    			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

    			if ( "V2130M1000엘지엠알오1010".equals( row.getParameter("cust_id") ) ){
        			data.param
    					.where("select mro_no, mro_seq 	")
    					.where("  from sale_dtl    	")
    					.where(" where inv_no = 	:inv_no    " , row.getParameter("inv_no"   ))
    					.where("   and row_sts = 0   	")
    				;SqlResultMap mro = data.selectForMap();

    				data.clear();

    				for( SqlResultRow item: mro  ){

    		        	data.param
    		    			.table("serveone_ship_info")
    		    			.where("where order_id = :order_id ")
    		    			.where("and   order_item_id = :order_item_id ")
    			        	//
    						.unique("order_id"       , item.fixParameter("mro_no"     ))
    						.unique("order_item_id"  , item.fixParameter("mro_seq"    ))

    		        		.update("car_info"       , row.getParameter("car_info"  ))
    		        		.update("drv_nm"         , row.getParameter("drv_nm"  ))
    		        		.update("drv_tel"        , row.getParameter("drv_tel"  ))
    					;data.attach(Action.update);

    				}

    			}
		        	data.param
		    			.table("sale_mst")
		    			.where("where inv_no = :inv_no ")
			        	//
						.unique("inv_no"      , row.fixParameter("inv_no"     ))
		        		.update("hdli_id"  , row.getParameter("hdli_id"  ))
		        		.update("hdli_no"  , row.getParameter("hdli_no"  ))
						.update("upt_nm"   , row.getParameter("upt_nm"  ))
						.update("upt_ip"   , arg.remoteAddress			   )
						.update("upt_dt"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					;data.attach(Action.update);


//    				}
    		}

    		data.execute();
    		return null;
    }


	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice
	 * @param model
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception{
		DataMessage data = arg.newStorage("POS");

		data.param // 쿼리문  입력
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
//			.query("	,  a.inv_dt			as inv_dt											") /* 매출일자 */
			.query("	,  a.inv_dt||'('||d.converted||')'			as inv_dt					") /* 매출일자 */
//			.query("	,  b.biz_no || ' (' || b.stor_nm || ')'     	as send_biz_no 			") /* 공급자 등록번호 */
     		.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.biz_addr_1      as send_biz_addr_1   								") /* 공급자 주소 */
			.query("	,  b.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_kind   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  a.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  a.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  a.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  a.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  case when a.biz_nm = a.cust_nm then '' else a.cust_nm end as recv_cust_nm 	") /* 공급받는자 고객명 */
			.query("	,  a.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  a.biz_addr_1	    as recv_biz_addr_1   								") /* 공급받는자 주소 */
			.query("	,  a.biz_addr_2   	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  a.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  a.biz_kind  	as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, a.charge    		as charge 											") /* 배송료 */
			.query("	, a.qty 			as qty 												") /* 수량 */
			.query("	, a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
			.query("	, a.tax  			as tax 												") /* 세액 */
			.query("	, a.amount 			as amount 											") /* 계 */
			.query("	, c.npay_amt 		as npay_amt 											") /* 현미수 */
			.query("	, c.vaccount_no 	as vaccount 										") /* 입금정보 */
			.query("	, a.req_msg 		as req_msg  										") /* 요청메모 */
			.query("	, a.user_memo 		as user_memo  										") /* 메모사항 */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dt 				") /* 발행일자 */
			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */
		    .query(" 	, d.cust_cd  as cust_id 												") /* 거래처 코드 */
		    .query(" 	, substring(a.inv_no, -6) as work_no 										") /* 전표 NO */
		    .query(" 	, a.amount 			as amount1 											") /* 합계 금액1 */
//		    .query(" 	, case when (c.npay_amt -  a.amount) >= 0 then (c.npay_amt - a.amount) else 0 end as pre_balance ") /* 전일미수 */
		    /* 전일미수 = 현미수 - 매출일자와 동일한 일자의 미수합계 */
            .query("    , ( c.npay_amt - isnull(( select sum(npay_amt) from sale_balance where stor_id = a.stor_id and cust_id = a.cust_id and inv_dt = a.inv_dt ),0)     ) as pre_balance ")
		    .query(" 	, (select emp_nm from usr_mst where emp_id = a.inv_user_id ) as inv_user_nm ") /* 담당 */
		    .query(" 	, b.stor_nm 		as stor_nm 										") /* 양식지일 경우 사업자번호 옆에 물류센터 명 표시 */
		    .query(" 	, b.store_gb 		as store_gb 										") /* 양식지일 경우 본사/직영점만 물류센터 명 표시 */

			.query(" from sale_mst a															")
			.query("	  join store b on a.stor_id = b.stor_id								")
			.query("	  join cust_stor c on a.stor_id = c.stor_id 							")
			.query("     	                and a.cust_id = c.cust_id 							")
			.query("	  join cust_mst  d on a.cust_id  = d.cust_id 							")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")

			;
			SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param // 쿼리문  입력
				.query("select 																			")
				.query(" 		a.seq_dsp   	as seq_dsp 												") /* 항번 */
				.query("	,   b.item_sc   	as item_sc 												") /* 단축코드 */
				.query("	,   a.item_code   	as item_code 												") /* 코드 */
				.query("	,   b.brcd_1   	as barcode 												") /* 바코드 */
//				.query("	,   (a.item_name||'/'||a.item_spec)      	as item_name 							") /* 품목 + 규격 */
//				.query("	,   (a.item_name||'/'||a.item_spec||'/'||c.unit_name||'('||a.unt_qty||')' )   as item_name ") /* 품목 + 규격 + 단위 + 포장량 */
		        .query("	,   (replace(a.item_name, lower('/'||a.item_spec), '')||'/'||a.item_spec||'/'||c.unit_name||'('||a.unt_qty||')' )   as item_name ")
//				.query("	,   substring((a.item_name||'/'||a.item_spec), 1, 63)      as item_name 				") /* 품목 + 규격 */
//				.query("	,   substring(a.item_name, 1, 63)      as item_name 								") /* 품목 + 규격 */
//				.query("	,   (a.item_name||'/'||a.item_spec) as item_name 						") /* 품목 / 규격 */
				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('('||a.unt_qty||')') as unt_qty   									") /* 포장량 */
				.query("	,   a.qty 			as qty 													") /* 수량 */
				.query("	,   a.price 		as price 												") /* 단가 */
				.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
				.query("	,   a.tax 			as tax 													") /* 세액 */
				.query("	,   a.amount 		as amount 												") /* 합계 */
				.query("    ,   b.cst_pri    as cst_pri 											") /* 소비자가 */
				.query("  from  sale_dtl a 															")
				.query("		join itm_mst b on a.item_idcd = b.item_idcd 								")
				.query("		left outer join item_unit c on c.unit_idcd = a.unit_idcd 					")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
				.query("   and  a.qty   <> 0		 													")
				.query("order by line_seqn		 														")
//				.query("order by seq_dsp		 														")
				;
				info.get(0).put("product", data.selectForMap() );
		}

		return info ;

	}


	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice  거래명세서 집계
	 * @param model
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPrintingGroup(HttpRequestArgument arg) throws Exception{
		DataMessage data = arg.newStorage("POS");

//		System.out.println("nano == "+System.nanoTime());

		String[] inv_no = arg.getParamCast("inv_no", String[].class);

		data.param
			.query("select stor_id        ")
			.query("  from sale_mst       ")
			.query(" where inv_no = :inv_no ",  inv_no[0] )
		;
		SqlResultRow store = data.selectForRow();

//		LOGGER.debug("stor_id ==" + store.fixParamText("stor_id") );

		data.clear();

		data.param
		.query("select                                                              ")
		.query("      max(h1.inv_no)   		as inv_no                               ")
		.query("   ,  max(h1.inv_dt)			as inv_dt                           ")
		.query("   ,  max(h1.send_biz_no)      	as send_biz_no                      ")
		.query("   ,  max(h1.send_biz_tel_no)  	as send_biz_tel_no                  ")
		.query("   ,  max(h1.send_biz_fax_no)  	as send_biz_fax_no                  ")
		.query("   ,  max(h1.send_biz_nm)      	as send_biz_nm                      ")
		.query("   ,  max(h1.send_biz_owner)   	as send_biz_owner                   ")
		.query("   ,  max(h1.send_biz_addr_1)    as send_biz_addr_1                   ")
		.query("   ,  max(h1.send_biz_addr_2)   	as send_biz_addr_2                   ")
		.query("   ,  max(h1.send_biz_cond)    	as send_biz_cond                    ")
		.query("   ,  max(h1.send_biz_types)   	as send_biz_types                   ")
		.query("   ,  max(h1.recv_biz_no)  	 	as recv_biz_no                      ")
		.query("   ,  max(h1.recv_biz_tel_no) 	as recv_biz_tel_no                  ")
		.query("   ,  max(h1.recv_biz_fax_no) 	as recv_biz_fax_no                  ")
		.query("   ,  max(h1.recv_biz_nm)     	as recv_biz_nm                      ")
		.query("   ,  max(h1.recv_cust_nm)      as recv_cust_nm                     ")
		.query("   ,  max(h1.recv_biz_owner)  	as recv_biz_owner                   ")
		.query("   ,  max(h1.recv_biz_addr_1)    as recv_biz_addr_1                   ")
		.query("   ,  max(h1.recv_biz_addr_2)   	as recv_biz_addr_2                   ")
		.query("   ,  max(h1.recv_biz_cond)   	as recv_biz_cond                    ")
		.query("   ,  max(h1.recv_biz_types)  	as recv_biz_types                   ")
		.query("   ,  sum(h1.charge)  		    as charge                           ")
		.query("   ,  sum(h1.qty) 			    as qty                              ")
		.query("   ,  sum(h1.sply_amt)          as sply_amt                         ")
		.query("   ,  sum(h1.tax)  			    as tax                              ")
		.query("   ,  sum(h1.amount) 			as amount                           ")
		.query("   ,  sum(h1.npay_amt) 		    as npay_amt                          ")
		.query("   ,  max(h1.vaccount) 	        as vaccount                         ")
		.query("   ,  max(h1.req_msg) 		    as req_msg                          ")
		.query("   ,  max(h1.user_memo) 		as user_memo                        ")
		.query("   ,  max(h1.crt_dt)         as crt_dt                        ")
		.query("   ,  max(h1.stamp_url)         as stamp_url                        ")
		.query("   ,  max(h1.cust_id)           as cust_id                          ")
		.query("   ,  max(h1.work_no)           as work_no                          ")
		.query("   ,  sum(h1.amount1) 			as amount1                          ")
		.query("   ,  max(h1.inv_dt1)           as inv_dt1                          ")
//		    /* 전일미수 = 현미수 - min(매출일자)이후 미수합계 */
//		.query("   ,  (sum(h1.npay_amt) - sum(isnull(t1.npay_amt,0))) as pre_balance     ")
		.query("   ,  (isnull(sum(t1.npay_amt),0) ) as pre_balance                      ")
		.query("   ,  max(h1.inv_user_nm)       as inv_user_nm                      ")
		.query("   ,  max(h1.stor_nm)          as stor_nm                         ")
		.query("   ,  max(h1.store_gb)          as store_gb                         ")
		.query(" from (                                                             ")
		.query("       select                                                       ")
		.query("             a.stor_id  as stor_id                                ")
		.query("          ,  a.cust_id   as sale_cust_id                            ")
		.query("          ,  max(a.inv_no)   		as inv_no                       ")
		.query("          ,  max(a.inv_dt)||'('||max(d.converted)||')'	as inv_dt   ")
		.query("          ,  max(a.inv_dt)	 		as inv_dt1                      ")
		.query("          ,  max(b.biz_no)      	as send_biz_no                  ")
		.query("          ,  max(b.biz_tel_no)  	as send_biz_tel_no              ")
		.query("          ,  max(b.biz_fax_no)  	as send_biz_fax_no              ")
		.query("          ,  max(b.biz_nm)      	as send_biz_nm                  ")
		.query("          ,  max(b.biz_owner)   	as send_biz_owner               ")
		.query("          ,  max(b.biz_addr_1)       as send_biz_addr_1               ")
		.query("          ,  max(b.biz_addr_2)   	as send_biz_addr_2               ")
		.query("          ,  max(b.biz_type)    	as send_biz_cond                ")
		.query("          ,  max(b.biz_kind)   	as send_biz_types               ")
		.query("          ,  max(a.biz_no)  	 	as recv_biz_no                  ")
		.query("          ,  max(a.biz_tel_no) 	    as recv_biz_tel_no              ")
		.query("          ,  max(a.biz_fax_no) 	    as recv_biz_fax_no              ")
		.query("          ,  max(a.biz_nm)     	    as recv_biz_nm                  ")
		.query("          ,  case when max(a.biz_nm) = max(a.cust_nm) then '' else max(a.cust_nm) end as recv_cust_nm     ")
		.query("          ,  max(a.biz_owner)  	    as recv_biz_owner               ")
		.query("          ,  max(a.biz_addr_1)	    as recv_biz_addr_1               ")
		.query("          ,  max(a.biz_addr_2)   	as recv_biz_addr_2               ")
		.query("          ,  max(a.biz_type)   	    as recv_biz_cond                ")
		.query("          ,  max(a.biz_kind)  	    as recv_biz_types               ")
		.query("          ,  sum(isnull(a.charge,0))   as charge                       ")
		.query("          ,  sum(isnull(a.qty,0)) 		as qty                          ")
		.query("          ,  sum(isnull(a.sply_amt,0))+sum(isnull(a.tax_free,0)) as sply_amt ")
		.query("          ,  sum(isnull(a.tax,0))  	as tax                          ")
		.query("          ,  sum(isnull(a.amount,0)) 	as amount                       ")
		.query("          ,  max(isnull(c.npay_amt,0)) 	as npay_amt                      ")
		.query("          ,  max(c.vaccount_no) 	as vaccount                     ")
		.query("          ,  max(a.req_msg) 		as req_msg                      ")
		.query("          ,  max(a.user_memo) 		as user_memo                    ")
		.query("          ,  (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dt ")
		.query("          ,  max(b.stamp_url)       as stamp_url                    ")
		.query("          ,  max(d.cust_cd)         as cust_id                      ")
		.query("          ,  substring(max(a.inv_no), -6) as work_no                   ")
		.query("          ,  sum(isnull(a.amount,0)) 	as amount1                      ")
		.query("          ,  (select emp_nm from usr_mst where emp_id = a.inv_user_id ) as inv_user_nm     ")
		.query(" 	      ,  max(b.stor_nm) 		as stor_nm 					") /* 양식지일 경우 사업자번호 옆에 물류센터 명 표시 */
		.query(" 	      ,  max(b.store_gb) 		as store_gb 					") /* 양식지일 경우 본사/직영점만 물류센터 명 표시 */
		.query("         from sale_mst a                                           ")
		.query("              left outer join store b on b.stor_id = :stor_id  ", store.fixParameter("stor_id"))
		.query("              join cust_stor c on a.stor_id = c.stor_id          ")
		.query(" 	                           and a.cust_id  = c.cust_id           ")
		.query("              join cust_mst  d on a.cust_id  = d.cust_id           ")
		.query("        where a.inv_no  in (:inv_no )                               " , inv_no ,( inv_no.length > 0) ) /* 매출 번호 */
		.query("          and a.row_sts = 0                                       ")
		.query("        group by a.stor_id, a.cust_id, a.inv_user_id               ")
		.query("  ) h1                                                              ")
        .query(" left outer join                                                    ")
        .query("  ( select stor_id, isnull(sum(npay_amt),0) as npay_amt                 ")
        .query("      from sale_balance                                             ")
        .query("     where stor_id  = :stor_id                                    ", store.fixParameter("stor_id"))
        .query("       and cust_id   = (select max(cust_id) from sale_mst where inv_no in ( :inv_no ))  " , inv_no ,( inv_no.length > 0) )
        .query("       and inv_dt    < (select min(inv_dt) from sale_mst where inv_no  in ( :inv_no ))  " , inv_no ,( inv_no.length > 0) )
        .query("     group by stor_id                                              ")
        .query("  ) t1  on t1.stor_id = h1.stor_id                                ")

//		.query("  left outer join sale_balance t1 on t1.stor_id = h1.stor_id      ")
//		.query("                             and t1.cust_id = h1.sale_cust_id       ")
//		.query("	                                 and t1.inv_dt = h1.inv_dt1		")
		;



//		data.param // 쿼리문  입력
//
//			.query("select 																		")
//			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
////			.query("	,  a.inv_dt			as inv_dt											") /* 매출일자 */
//			.query("	,  a.inv_dt||'('||d.converted||')'			as inv_dt					") /* 매출일자 */
//			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
//			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
//			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
//			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
//			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
//			.query("	,  b.biz_addr_1      as send_biz_addr_1   								") /* 공급자 주소 */
//			.query("	,  b.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
//			.query("	,  b.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
//			.query("	,  b.biz_kind   	as send_biz_types 									") /* 공급자 종목 */
//
//			.query("	,  a.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
//			.query("	,  a.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
//			.query("	,  a.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
//			.query("	,  a.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
//			.query("	,  case when a.biz_nm = a.cust_nm then '' else a.cust_nm end as recv_cust_nm 	") /* 공급받는자 고객명 */
//			.query("	,  a.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
//			.query("	,  a.biz_addr_1	    as recv_biz_addr_1   								") /* 공급받는자 주소 */
//			.query("	,  a.biz_addr_2   	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
//			.query("	,  a.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
//			.query("	,  a.biz_kind  	as recv_biz_types 									") /* 공급받는자 종목 */
//
//			.query("	, a.charge    		as charge 											") /* 배송료 */
//			.query("	, a.qty 			as qty 												") /* 수량 */
//			.query("	, a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
//			.query("	, a.tax  			as tax 												") /* 세액 */
//			.query("	, a.amount 			as amount 											") /* 계 */
//			.query("	, c.npay_amt 		as npay_amt 											") /* 현미수 */
//			.query("	, c.vaccount_no 	as vaccount 										") /* 입금정보 */
//			.query("	, a.req_msg 		as req_msg  										") /* 요청메모 */
//			.query("	, a.user_memo 		as user_memo  										") /* 메모사항 */
//			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dt 				") /* 발행일자 */
//			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */
//		    .query(" 	, d.cust_cd  as cust_id 												") /* 거래처 코드 */
//		    .query(" 	, substring(a.inv_no, -6) as work_no 										") /* 전표 NO */
//		    .query(" 	, a.amount 			as amount1 											") /* 합계 금액1 */
////		    .query(" 	, case when (c.npay_amt -  a.amount) >= 0 then (c.npay_amt - a.amount) else 0 end as pre_balance ") /* 전일미수 */
//		    /* 전일미수 = 현미수 - 매출일자와 동일한 일자의 미수합계 */
//            .query("    , ( c.npay_amt - isnull(( select sum(npay_amt) from sale_balance where stor_id = a.stor_id and cust_id = a.cust_id and inv_dt = a.inv_dt ),0)     ) as pre_balance ")
//		    .query(" 	, (select emp_nm from usr_mst where emp_id = a.inv_user_id ) as inv_user_nm ") /* 담당 */
//
//			.query(" from sale_mst a															")
//			.query("	  join store b on a.stor_id = b.stor_id								")
//			.query("	  join cust_stor c on a.stor_id = c.stor_id 							")
//			.query("     	                and a.cust_id = c.cust_id 							")
//			.query("	  join cust_mst  d on a.cust_id  = d.cust_id 							")
////			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
//			.query("where a.inv_no  in (:inv_no )                                               " , inv_no ,( inv_no.length > 0) ) /* 매출 번호 */
//			.query("  and a.row_sts = 0 														")
//
//			;
			SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();

			data.param
			.query(" select                                             ")
		    .query("       max(rownum)        as seq_dsp                ")
		    .query("    ,  t1.item_sc         as item_sc                ")
		    .query("    ,  t1.item_code         as item_code                ")
		    .query("    ,  t1.barcode         as barcode                ")
		    .query("    ,  t1.item_name         as item_name                ")
		    .query("    ,  t1.unit_name         as unit_name                ")
		    .query("    ,  t1.unt_qty        as unt_qty               ")
		    .query("    ,  sum(qty)           as qty                    ")
		    .query("    ,  t1.price           as price                  ")
		    .query("    ,  sum(t1.sply_amt)   as sply_amt               ")
		    .query("    ,  sum(t1.tax)        as tax                    ")
		    .query("    ,  sum(t1.amount)     as amount                 ")
		    .query("    ,  t1.cst_pri      as cst_pri             ")
//		    .query("    ,  t1.inv_dt          as inv_dt                 ")
		    .query("    ,  substring(t1.inv_dt,0,4) || '-' || substring(t1.inv_dt,5,2) || '-' || substring(t1.inv_dt,7,2) as inv_dt ")
		    .query("  from (                                            ")
		    .query("		select                                      ")
		    .query("			    b.item_sc   	as item_sc          ")
		    .query("			,   a.item_code   	as item_code          ")
		    .query("			,   b.brcd_1   	as barcode          ")
//		    .query("			,   (a.item_name||'/'||a.item_spec||'/'||c.unit_name||'('||a.unt_qty||')' )   as item_name    ")
		    .query("	        ,   (replace(a.item_name, lower('/'||a.item_spec), '')||'/'||a.item_spec||'/'||c.unit_name||'('||a.unt_qty||')' )   as item_name ")
		    .query("			,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name    ")
		    .query("		    ,   ('('||a.unt_qty||')') as unt_qty  ")
		    .query("			,   isnull(a.qty,0) 	as qty              ")
		    .query("			,   a.price 		as price            ")
		    .query("			,   isnull(a.sply_amt,0) + isnull(a.tax_free,0) as sply_amt    ")
		    .query("			,   isnull(a.tax,0) 	as tax              ")
		    .query("			,   isnull(a.amount,0) as amount           ")
		    .query("			,   b.cst_pri    as cst_pri       ")
		    .query("			,   d.inv_dt        as inv_dt           ")
		    .query("		  from  sale_dtl a                         ")
		    .query("				join itm_mst b on a.item_idcd = b.item_idcd             ")
		    .query("				left outer join item_unit c on c.unit_idcd = a.unit_idcd  ")
			.query("	    		join sale_mst d on d.inv_no = a.inv_no               ")
		    .query("		 where  a.inv_no   in (:inv_no )            " , inv_no ,( inv_no.length > 0) ) /* 매출 번호 */
		    .query("		   and  a.qty   <> 0                        ")
		    .query("		   and  a.row_sts = 0                     ")
		    .query("   ) t1                                             ")
		    .query("  group by t1.item_sc  ,  t1.item_code  ,  t1.barcode  ,  t1.item_name                ")
		    .query("        ,  t1.unit_name  ,  t1.unt_qty ,  t1.price    ,  t1.cst_pri , t1.inv_dt ")
		    .query("  having sum(qty) <> 0                              ")
		    .query("  order by t1.inv_dt, t1.item_code                    ")
		    ;


//			data.param // 쿼리문  입력
//				.query("select 																			")
//				.query(" 		a.seq_dsp   	as seq_dsp 												") /* 항번 */
//				.query("	,   b.item_sc   	as item_sc 												") /* 단축코드 */
//				.query("	,   a.item_code   	as item_code 												") /* 코드 */
//				.query("	,   b.brcd_1   	as barcode 												") /* 바코드 */
////				.query("	,   (a.item_name||'/'||a.item_spec)      	as item_name 							") /* 품목 + 규격 */
//				.query("	,   (a.item_name||'/'||a.item_spec||'/'||c.unit_name||'('||a.unt_qty||')' )   as item_name ") /* 품목 + 규격 + 단위 + 포장량 */
////				.query("	,   substring((a.item_name||'/'||a.item_spec), 1, 63)      as item_name 				") /* 품목 + 규격 */
////				.query("	,   substring(a.item_name, 1, 63)      as item_name 								") /* 품목 + 규격 */
////				.query("	,   (a.item_name||'/'||a.item_spec) as item_name 						") /* 품목 / 규격 */
//				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
//				.query("    ,   ('('||a.unt_qty||')') as unt_qty   									") /* 포장량 */
//				.query("	,   a.qty 			as qty 													") /* 수량 */
//				.query("	,   a.price 		as price 												") /* 단가 */
//				.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
//				.query("	,   a.tax 			as tax 													") /* 세액 */
//				.query("	,   a.amount 		as amount 												") /* 합계 */
//				.query("    ,   b.cst_pri    as cst_pri 											") /* 소비자가 */
//				.query("  from  sale_dtl a 															")
//				.query("		join itm_mst b on a.item_idcd = b.item_idcd 								")
//				.query("		left outer join item_unit c on c.unit_idcd = a.unit_idcd 					")
//				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
//				.query("   and  a.qty   <> 0		 													")
//				.query("order by line_seqn		 														")
////				.query("order by seq_dsp		 														")
//				;
				info.get(0).put("product", data.selectForMap() );
		}

		return info ;

	}




		/**
		 * 마스터/디테일 객체를 넘긴다.-- invoice
		 * @param model
		 * @param http
		 * @return
		 * @throws Exception
		 */
		public SqlResultMap getPrintingA5(HttpRequestArgument arg) throws Exception{
			DataMessage data = arg.newStorage("POS");

			data.param // 쿼리문  입력
				.query("select 																		")
				.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
//				.query("	,  a.inv_dt			as inv_dt											") /* 매출일자 */
				.query("	,  a.inv_dt||'('||d.converted||')'			as inv_dt					") /* 매출일자 */
//				.query("	,  b.biz_no || ' (' || b.stor_nm || ')'     	as send_biz_no 			") /* 공급자 등록번호 */
	     		.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
				.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
				.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
				.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
				.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
				.query("	,  b.biz_addr_1      as send_biz_addr_1   								") /* 공급자 주소 */
				.query("	,  b.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
				.query("	,  b.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
				.query("	,  b.biz_kind   	as send_biz_types 									") /* 공급자 종목 */

				.query("	,  a.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
				.query("	,  a.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
				.query("	,  a.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
				.query("	,  a.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
				.query("	,  case when a.biz_nm = a.cust_nm then '' else a.cust_nm end as recv_cust_nm 	") /* 공급받는자 고객명 */
				.query("	,  a.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
				.query("	,  a.biz_addr_1	    as recv_biz_addr_1   								") /* 공급받는자 주소 */
				.query("	,  a.biz_addr_2   	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
				.query("	,  a.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
				.query("	,  a.biz_kind  	as recv_biz_types 									") /* 공급받는자 종목 */

				.query("	, a.charge    		as charge 											") /* 배송료 */
				.query("	, a.qty 			as qty 												") /* 수량 */
				.query("	, a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
				.query("	, a.tax  			as tax 												") /* 세액 */
				.query("	, a.amount 			as amount 											") /* 계 */
				.query("	, c.npay_amt 		as npay_amt 											") /* 현미수 */
				.query("	, c.vaccount_no 	as vaccount 										") /* 입금정보 */
				.query("	, a.req_msg 		as req_msg  										") /* 요청메모 */
				.query("	, a.user_memo 		as user_memo  										") /* 메모사항 */
				.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dt 				") /* 발행일자 */
				.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */
			    .query(" 	, d.cust_cd  as cust_id 												") /* 거래처 코드 */
			    .query(" 	, substring(a.inv_no, -6) as work_no 										") /* 전표 NO */
			    .query(" 	, a.amount 			as amount1 											") /* 합계 금액1 */
//			    .query(" 	, case when (c.npay_amt -  a.amount) >= 0 then (c.npay_amt - a.amount) else 0 end as pre_balance ") /* 전일미수 */
			    /* 전일미수 = 현미수 - 매출일자와 동일한 일자의 미수합계 */
	            .query("    , ( c.npay_amt - isnull(( select sum(npay_amt) from sale_balance where stor_id = a.stor_id and cust_id = a.cust_id and inv_dt = a.inv_dt ),0)     ) as pre_balance ")
			    .query(" 	, (select emp_nm from usr_mst where emp_id = a.inv_user_id ) as inv_user_nm ") /* 담당 */
			    .query(" 	, b.stor_nm 		as stor_nm 										") /* 양식지일 경우 사업자번호 옆에 물류센터 명 표시 */
			    .query(" 	, b.store_gb 		as store_gb 										") /* 양식지일 경우 본사/직영점만 물류센터 명 표시 */

				.query(" from sale_mst a															")
				.query("	  join store b on a.stor_id = b.stor_id								")
				.query("	  join cust_stor c on a.stor_id = c.stor_id 							")
				.query("     	                and a.cust_id = c.cust_id 							")
				.query("	  join cust_mst  d on a.cust_id  = d.cust_id 							")
				.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
				.query("  and a.row_sts = 0 														")

				;
				SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param // 쿼리문  입력
					.query("select 																			")
					.query(" 		a.seq_dsp   	as seq_dsp 												") /* 항번 */
					.query("	,   b.item_sc   	as item_sc 												") /* 단축코드 */
					.query("	,   a.item_code   	as item_code 												") /* 코드 */
					.query("	,   b.brcd_1   	as barcode 												") /* 바코드 */
//					.query("	,   (a.item_name||'/'||a.item_spec)      	as item_name 							") /* 품목 + 규격 */
					.query("	,   (a.item_name||'/'||a.item_spec||'/'||c.unit_name||'('||a.unt_qty||')' )   as item_name ") /* 품목 + 규격 + 단위 + 포장량 */
//					.query("	,   substring((a.item_name||'/'||a.item_spec), 1, 63)      as item_name 				") /* 품목 + 규격 */
//					.query("	,   substring(a.item_name, 1, 63)      as item_name 								") /* 품목 + 규격 */
//					.query("	,   (a.item_name||'/'||a.item_spec) as item_name 						") /* 품목 / 규격 */
					.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
					.query("    ,   ('('||a.unt_qty||')') as unt_qty   									") /* 포장량 */
					.query("	,   a.qty 			as qty 													") /* 수량 */
					.query("	,   a.price 		as price 												") /* 단가 */
					.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
					.query("	,   a.tax 			as tax 													") /* 세액 */
					.query("	,   a.amount 		as amount 												") /* 합계 */
					.query("    ,   b.cst_pri    as cst_pri 											") /* 소비자가 */
					.query("  from  sale_dtl a 															")
					.query("		join itm_mst b on a.item_idcd = b.item_idcd 								")
					.query("		left outer join item_unit c on c.unit_idcd = a.unit_idcd 					")
					.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
					.query("   and  a.qty   <> 0		 													")
					.query("order by line_seqn		 														")
//					.query("order by seq_dsp		 														")
					;
					info.get(0).put("product", data.selectForMap() );
			}

			return info ;

		}



}