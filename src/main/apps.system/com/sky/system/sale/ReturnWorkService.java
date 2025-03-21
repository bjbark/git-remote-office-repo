package com.sky.system.sale;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.NumberUtil;

@Service
public class ReturnWorkService  extends DefaultServiceHandler {


	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

		String inv_po_term = arg.fixParamText("inv_po_term" );
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );

		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);

			DataMessage data = arg.newStorage("POS");
			data.param // 쿼리문  입력
				.total("select count(1) as maxsize	, sum(a.amount) as amount	 														")
			;
			data.param // 쿼리문  입력
				.query("select a.stor_grp    , a.stor_id 	  , a.wrhs_id																")
				.query("     , (select stor_nm from stor where stor_id = a.stor_id ) as stor_nm 									")
				.query("     , (select stor_nm from stor where stor_id = a.wrhs_id ) as wareh_nm 									")
				.query("     , a.inv_no      , a.inv_dt       , a.sts_cd   , a.pay_dt    , a.ori_dt   									")
				.query("     , c.cust_cd     , a.cust_id     , a.cust_nm   , a.mmb_nm   , a.cust_gb  , a.inv_usr_id   , a.inv_dept_id , a.salesman_id 	")
				.query("     , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id) as salesman_nm 	")
				.query("     , (select dept_nm from dept_mst where stor_grp = a.stor_grp and dept_id = a.inv_dept_id) as inv_dept_nm 	")
				.query("     , (select sum(qty) from order_pack where inv_no = a.inv_no and pack_gb <> 1 ) as pack_qty				    ")
				.query("     , a.req_msg     , a.amount 																				")
				.query("     , a.user_memo   , a.row_clos      																		")
				.query("     , a.inv_work_id , a.picking_yn                    															")
				;
			data.param
				.where("from   order_mst a           																					")
				.where("       join cust_stor b on a.stor_id = b.stor_id           													")
				.where("                        and a.cust_id  = b.cust_id            													")
				.where("       join cust_mst  c on a.cust_id  = c.cust_id           													")
				.where("where  ( a.stor_id  	= 	:stor_id 	  " , arg.fixParameter("stor_id" ) )
				.where("     or  a.wrhs_id  	= 	:stor_id   ) " , arg.fixParameter("stor_id" ) )
				.where("and    a.row_sts = 0                                             " )
				.where("and    a.sts_cd  >= '0200'                                             " )
				.where("and    a.ret_yn = '1'                                                  " )
				.where("and    a.inv_dt between :fr_dt       " , fr_dt , "1".equals( inv_po_term ) )  // 배송예정사작일자
				.where("                    and :to_dt       " , to_dt , "1".equals( inv_po_term ) )  // 배송예정종료일자

				.where("and    a.ori_dt between :fr_dt       " , fr_dt , "2".equals( inv_po_term ) )  // 주문사작일자
				.where("                    and :to_dt       " , to_dt , "2".equals( inv_po_term ) )  // 주문종료일자

				.where("and    a.cust_id    =   :cust_id     " , arg.getParameter("cust_id" )) // 고객코드
				.where("and    a.sts_cd     =   :sts_cd      " , arg.getParameter("sts_cd" )) // 주문상태
				.where("and    a.ret_yn     =   :ret_yn      " , arg.getParameter("ret_yn" )) // 반품여부
				.where("and    a.salesman_id = :salesman_id  " , arg.getParameter("salesman_id" )) // 영업담당
//				.where("and    a.inv_work_id = :inv_work_id  " , arg.getParameter("inv_work_id" )) // 주문작업위치
		    	.where("and    a.inv_work_id in (:inv_work_id )    " , inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */

				.where("and    a.row_clos = :row_clos      " , arg.getParameter("row_clos" )) // 마감여부  1:마감

				.where("and    b.clss_1 = :clss_1          " , arg.getParameter("clss_1" )) // 고객1차분류
				.where("and    b.clss_2 = :clss_2          " , arg.getParameter("clss_2" )) // 고객2차분류
				.where("and    b.clss_3 = :clss_3          " , arg.getParameter("clss_3" )) // 고객3차분류

				.where("and    a.inv_no   like :find_name%   " , find_name , "1".equals( search_id ) ) // 주문번호
				.where("and    a.cust_nm  like %:find_name%  " , find_name , "2".equals( search_id ) ) // 고객명
				.where("and    a.mmb_nm  like %:find_name%  " , find_name , "3".equals( search_id ) ) // 회원명

				.where("order by a.ori_dt, a.inv_no desc ")
			;

			if (page == 0 && rows == 0){
			     return data.selectForMap(sort);
			} else {
			     return data.selectForMap(page, rows, (page==1),sort);
			}
	}


/*
 * 고객 정보 조회
 */
	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
//	public SqlResultMap getCust(HttpRequestArgument arg) throws Exception {
//
//		DataMessage data = arg.newStorage("POS");
//		data.param // 쿼리문  입력
//			.query("select a.stor_id , b.cust_gb  , a.cust_id , b.cust_cd , b.cust_nm ")
//
//			.query("   ,   c.mmb_id     , c.memb_gb     ,  c.mmb_nm     ,  c.login_id    ")
//			.query("   ,   b.biz_no      , b.biz_nm      ,  b.biz_tel_no  , b.biz_fax_no   , b.biz_email ")
//			.query("   ,   b.biz_type    , b.biz_type   ,  b.biz_owner   , b.biz_tax_gb   , b.biz_yn    ")
//			.query("   ,   b.biz_zip_cd  , b.biz_state   ,  b.biz_city    , b.biz_dong     , b.biz_addr_2 ")
//			.query("   ,   b.colt_schd_type , b.colt_schd_term      ") // ,  a.acct_no , a.bank_nm      , a.acct_own_nm
//
//			.query("   ,   a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm  ")
//			.query("   ,   a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_2 ) as cls2_nm  ")
//			.query("   ,   a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_3 ) as cls3_nm  ")
//			.query("   ,   a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_4 ) as cls4_nm  ")
//			.query("   ,   a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_5 ) as cls5_nm  ")
//			.query("   ,   a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_6 ) as cls6_nm  ")
//
//			.query("   ,   c.tel_no      , c.hp_no       , c.email        , c.birth_dt     , c.birth_dt_gb ")
//			.query("   ,   c.recv_mail_yn ,c.recv_sms_yn , c.recv_dm_yn  , c.info_use_yn ")
//			.query("   ,   a.npay_amt     , a.balance_limit  ,  a.limit_control , a.price_no , (a.balance_limit - a.npay_amt) as balance_amount ")
////			.query("   ,   a.salesman_id as inv_usr_id , d.emp_nm as inv_usr_nm  , d.dept_id as inv_dept_id ")
////			.query("   ,   ( select dept_nm from dept_mst where stor_grp  =  a.stor_grp  and dept_id =  d.dept_id ) as inv_dept_nm ")
//			.query("   ,   a.user_memo as cust_usr_memo  , a.row_sts    , d.inv_no     ")
//
//			.query("from   cust_stor    a ")
//			.query("       join cust_mst  b on a.cust_id = b.cust_id  ")
//			.query("       join cust_memb  c on a.cust_id = c.cust_id  ")
//			.query("       join esti_info  d on a.cust_id = d.cust_id  ")
//			.query("                        and a.stor_id = d.stor_id ")
//			.query("where  1=1  ")
//			.query("and    a.stor_id  =  :stor_id    " , arg.fixParameter("stor_id"  ))
//			.query("and    c.mmb_id   =  :mmb_id     " , arg.fixParameter("mmb_id"   ))
//			.query("and    d.inv_no    =  :inv_no      " , arg.fixParameter("inv_no"   ))
//			.query("and    a.row_sts = 0           " )
//		    ;
//
//	    return data.selectForMap();
//	}


	/**
	 * 디테일 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 쿼리문  입력
			.query("select a.hq_id  , a.stor_grp   , a.stor_id     			")
			.query("     , a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp    ")
			.query("     , a.unit_idcd   , (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
			.query("     , a.unt_qty  , a.mst_itm_id    , a.mst_itm_cd     			")
			.query("     , a.item_idcd   , a.item_code    , a.item_name     , a.item_spec  ")
			.query("     , b.brcd_2 as item_sc 						 		")
			.query("     , a.notax_yn  , a.qty        , a.price       			") // , b.stock
			.query("     , a.org_ord_qty  , a.ship_qty   , a.rest_qty 				") // , (a.org_ord_qty - a.ship_qty) as rest_qty
			.query("     , a.po_pri  , a.po_pri_type  , a.po_pri_rt     ")
			.query("     , a.tax_free  , a.taxation   , a.sply_amt    , a.tax  , a.amount     ")
//			.query("     , (( a.amount - a.po_pri )  / ( case when a.amount = 0 then 1 else a.amount end ) * 100 ) as margin_per ")
			.query("     , a.user_memo , a.row_sts                    		")
			.query("from   order_item a                            				")
			.query("       join itm_mst b on a.item_idcd = b.item_idcd            ")
//			.query("       join itm_stock b on a.stor_id = b.stor_id         ")
//			.query("                        and a.mst_itm_id = b.mst_itm_id           ")
			.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no" 		))
			.query("and    a.row_sts = 0          						 	")
			.query("order by a.line_seqn  							        	")
		;

	    return data.selectForMap();
	}

	/*
	 * 매출 현황 검색
	 */
	public SqlResultMap getRefers(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);

		data.param // 쿼리문  입력
			.query("select a.inv_no                         ")
			.query("      ,a.inv_dt                         ")
			.query("      ,a.cust_nm                        ")
			.query("      ,a.mmb_nm                        ")
			.query("      ,a.sply_amt                       ")
			.query("      ,a.tax                            ")
			.query("      ,a.amount                         ")
			.query("      ,a.user_memo                      ")
			.query("  from sale_mst a                      ")
			.query(" where a.stor_id = :stor_id           ", arg.fixParameter("stor_id"))
			.query("   and a.inv_dt between :fr_dt          ", arg.fixParameter("fr_dt"))
			.query("                    and :to_dt          ", arg.fixParameter("to_dt"))
			.query("   and a.cust_nm like %:search_cust_nm% ", arg.getParameter("search_cust_nm"))
	    	.query("   and a.inv_work_id in (:inv_work_id)  ", inv_work_id,(inv_work_id.length > 0))
			.query("   and a.cust_id = :cust_id             ", arg.getParameter("cust_id"))
//			.query("   and a.row_clos = 0                  ")
			.query("   and a.row_sts = 0                  ")
			.query("   and a.ret_yn = '0'                   ")
			.query(" order by a.inv_no desc                 ")
		;
		return data.selectForMap();
	}

	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception{
		DataMessage data = arg.newStorage("POS");

		// 수금 번호
		String ret_no = arg.getParamText("ret_no");

		// 수정
		if (ret_no == null || "".equals(ret_no)) {
			data.param // 쿼리문  입력
				.query("select a.corp_id     , a.hq_id    ,  a.stor_grp    , a.stor_id  , a.wrhs_id                 ") //a.corp_id     ,
				.query("     , (select stor_nm from stor p where p.stor_id = a.stor_id ) as stor_nm                  ")
				.query("     , (select stor_nm from stor p where p.stor_id = a.wrhs_id ) as wareh_nm                  ")
				.query("     , a.pos_no       , a.inv_no      ,  a.inv_dt    , a.inv_tm      , a.inv_work_gb              ")
				.query("     , a.ori_no       , a.sts_cd      ,  a.ret_yn    , a.ori_dt                                   ")
				.query("     , a.inv_dept_id  , (select dept_nm from dept_mst where stor_grp = a.stor_grp and stor_id = a.inv_dept_id ) as inv_dept_nm")
				.query("     , a.salesman_id  , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id ) as salesman_nm")
				.query("     , a.cust_id      , a.cust_nm     , a.cust_gb   				                              ")
				.query("     , a.mmb_id      , a.mmb_nm                                                                 ")
				.query("     , a.tax_recv     , a.tax_type     , a.tax_rt    , a.price_no                                                ") // ,
				.query("     , a.tax_free     , a.taxation    , a.sply_amt   , a.tax         , a.amount                   ")
				.query("     , a.charge       , a.payable     , a.qty        , a.ship_qty                                 ")

				.query("     , a.biz_no       , a.biz_nm      , a.biz_type   , a.biz_type                                ")
		      	.query("     , a.biz_owner    , a.biz_email   , a.biz_tel_no , a.biz_fax_no                               ") // , a.biz_hp_no
		      	.query("     , a.biz_zip_cd   , a.biz_state   , a.biz_city   , a.biz_dong    , a.biz_addr_1 , a.biz_addr_2  ")

		      	.query("     , a.reve_nm                                                                                  ")
		      	.query("     , a.reve_email   , a.reve_tel_no , a.reve_hp_no , a.reve_fax_no                              ")
		      	.query("     , a.reve_zip_cd  , a.reve_state  , a.reve_city  , a.reve_dong   , a.reve_addr_1 , a.reve_addr_2  ")

				.query("     , b.clss_1      , (select bas_nm from base_mst where prnt_id = '9120' and bas_id = b.clss_1 ) as cls1_nm ")
				.query("     , b.clss_2      , (select bas_nm from base_mst where prnt_id = '9121' and bas_id = b.clss_2 ) as cls2_nm ")
				.query("     , b.clss_3      , (select bas_nm from base_mst where prnt_id = '9122' and bas_id = b.clss_3 ) as cls3_nm ")
				.query("     , b.clss_4      , (select bas_nm from base_mst where prnt_id = '9125' and bas_id = b.clss_4 ) as cls4_nm ")
				.query("     , b.clss_5      , (select bas_nm from base_mst where prnt_id = '9124' and bas_id = b.clss_5 ) as cls5_nm ")
				.query("     , b.clss_6      , (select bas_nm from base_mst where prnt_id = '9123' and bas_id = b.clss_6 ) as cls6_nm ")
		      	.query("     , c.biz_tax_gb   , c.colt_schd_type    , c.colt_schd_term   , b.user_memo as cust_usr_memo             ")
		      	.query("     , c.price_type   , c.price_rate                                               ")
		      	.query("     , c.cust_sts     , c.sts_memo   					                                               ")
		      	.query("     , b.npay_amt      , b.balance_limit  , b.limit_control , (b.balance_limit - b.npay_amt) as balance_amount ")

		      	.query("     , a.req_msg                                                                                  ")
				.query("     , a.user_memo    , a.row_clos   ,  a.row_sts                                              ")
				.query("     , a.upt_nm    , a.crt_nm   ,  a.inv_work_id                                            ")

				.query("     , a.ret_no, a.cust_grp, a.item_point, a.item_halin, a.payment, a.point_rate_type, a.cash_point_rate, a.card_point_rate, a.add_point, a.use_point, a.recv_addr3, a.sales_gb, a.invoiceno, a.biz_hp_no, a.ctrl_id, a.mro_no, a.mro_id, a.inv_prt_cnt ")
				.query("from   order_mst a                                                                                ")
				.query("       join cust_stor b on a.stor_id = b.stor_id                                               ")
				.query("                        and a.cust_id  = b.cust_id                                                ")
				.query("       join cust_mst  c on a.cust_id  = c.cust_id                                               ")
				.query("where  a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"                              ) )
				.query("and    a.row_sts = 0                                                                           " )
			;
			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param // 쿼리문  입력
					.query("select a.corp_id     , a.hq_id     , a.stor_grp    , a.stor_id , a.wrhs_id ")
					.query("     , a.inv_no       , a.inv_dt       , a.sts_cd                                ")
					.query("     , a.pack_no      , a.pack_seq     , a.pack_gb                               ")
					.query("     , a.pack_vend_id , ( select vend_nm from vend_mst where vend_id = a.pack_vend_id ) as  pack_vend_nm  " )
					.query("     , a.pack_zone_id , a.sales_id                              ")
					//.query("     , a.pack_vend_id , ( select vend_nm from vend_mst where vend_id = a.pack_vend_id ) as  pack_vend_nm  " )
					//.query("	 , a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
					//.query("	 , a.sales_id     , ( select bas_nm from base_mst where bas_id = a.sales_nm ) as  sales_nm  " )
					.query("     , a.qty                                                    ")
					.query("     , a.tax_free     , a.taxation     , a.sply_amt    , a.tax       , a.amount  ")
					.query("from   order_pack a                                                              ")
					.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no"                           ))
					.query("and    a.row_sts = 0                                                           ")
				;
				info.get(0).put("picking", data.selectForMap() );

				data.clear();
				data.param // 쿼리문  입력
					.query("select a.hq_id  , a.stor_grp   , a.stor_id    , a.pack_no   , a.pack_gb      ")
					.query("     , a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp                    ")
					.query("     , a.mst_itm_id   , a.mst_itm_cd    , a.unt_qty                                   ")
					.query("     , a.unit_idcd   , (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
					.query("     , a.item_idcd   , a.item_code    , a.item_name     , a.item_spec   , a.price        ")
					.query("     , b.brcd_2 as item_sc        											 ")
					.query("     , a.notax_yn  , a.cust_price , a.cust_halin  , a.unit_price, a.item_halin   ")
					.query("     , a.qty       , a.org_ord_qty   , a.ship_qty    , a.rest_qty  , a.pack_gb      ")
					.query("     , a.tax_free  , a.taxation   , a.sply_amt    , a.tax       , a.amount       ")
					.query("     , a.pack_vend_id , ( select vend_nm from vend_mst where vend_id = a.pack_vend_id ) as  pack_vend_nm  " )
					.query("	 , a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
					.query("	 , a.sales_id     , ( select bas_nm from base_mst where bas_id = a.sales_id ) as  sales_nm  " )

					.query("     , a.po_pri  , a.po_pri_type , a.po_pri_rt                         	")
					.query("     , a.user_memo , a.row_sts                                               	")
					.query("     , case when (select count(1) from order_item where inv_no = a.inv_no and seq_top = a.line_seqn and seq_dsp is null) > 0 then '0' ")
					.query("            when a.seq_dsp is null then to_char(a.seq_top)                                                                          ")
					.query("            else ''                                                                                                                 ")
					.query("       end as prnt_id                                                                                                             ")
					.query("     , a.seq_qty                                                                                                                    ")

					.query("     , a.wrhs_id, a.ret_yn, a.ret_no, a.ret_seq, a.unit_point, a.point_rate, a.item_point, a.converted, a.invoiceno, a.invoicesq, a.mro_no, a.mro_seq ")
					.query("from   order_item a                                                             ")
					.query("       join itm_mst b on a.item_idcd = b.item_idcd                                ")
					.query("where  a.inv_no =:inv_no 	" 		, arg.fixParameter("inv_no"                 ))
					.query("and    a.row_sts = 0                                                          ")
					.query("order by a.line_seqn                                                          	")
				;
				info.get(0).put("product", data.selectForMap() );
			}
		    return info ;

		} else {  // 매출 정보 불러오기

			data.param
				.query("select a.corp_id                                                                                        ")
				.query("      ,a.hq_id                                                                                        ")
				.query("      ,a.stor_grp                                                                                        ")
				.query("      ,a.stor_id                                                                                        ")
				.query("      ,(select stor_nm from stor where stor_id = a.stor_id ) as stor_nm                             ")
				.query("      ,a.wrhs_id                                                                                        ")
				.query("      ,(select stor_nm from stor where stor_id = a.wrhs_id ) as wareh_nm                             ")
				.query("      ,a.inv_nm                                                                                          ")
				.query("      ,'1'      as ret_yn                                                                                ")
				.query("      ,a.inv_no as ret_no                                                                                ")
				.query("      ,a.inv_work_id                                                                                     ")
				.query("      ,a.inv_work_gb                                                                                     ")
				.query("      ,a.salesman_id                                                                                     ")
				.query("      ,(select emp_nm from usr_mst where emp_id = a.salesman_id ) as salesman_nm                     ")
				.query("      ,a.cust_grp                                                                                         ")
				.query("      ,a.cust_id                                                                                         ")
				.query("      ,a.cust_nm                                                                                         ")
				.query("      ,a.cust_gb                                                                                         ")
				.query("      ,a.mmb_id                                                                                         ")
				.query("      ,a.mmb_nm                                                                                         ")
				.query("      ,-a.item_point as item_point                                                                       ")
				.query("      ,-a.item_halin as item_halin                                                                       ")
				.query("      ,a.price_no                                                                                        ")
				.query("      ,a.tax_type                                                                                        ")
				.query("      ,a.tax_rt                                                                                        ")
				.query("      ,-a.tax_free as tax_free                                                                           ")
				.query("      ,-a.taxation as taxation                                                                           ")
				.query("      ,-a.sply_amt as sply_amt                                                                           ")
				.query("      ,-a.tax      as tax                                                                                ")
				.query("      ,-a.amount   as amount                                                                             ")
				.query("      ,-a.charge   as charge                                                                             ")
				.query("      ,-a.payable  as payable                                                                            ")
				.query("      ,-a.payment  as payment                                                                            ")
				.query("      ,-a.qty      as qty                                                                                ")
				.query("      ,-a.qty      as org_ord_qty                                                                           ")
				.query("      ,0           as ship_qty                                                                           ")
				.query("      ,a.point_rate_type                                                                                 ")
				.query("      ,a.cash_point_rate                                                                                 ")
				.query("      ,a.card_point_rate                                                                                 ")
				.query("      ,-a.add_point as add_point                                                                         ")
				.query("      ,-a.use_point as use_point                                                                         ")
				.query("      ,a.req_msg                                                                                         ")
				.query("      ,a.biz_no                                                                                          ")
				.query("      ,a.biz_nm                                                                                          ")
				.query("      ,a.biz_type                                                                                        ")
				.query("      ,a.biz_type                                                                                       ")
				.query("      ,a.biz_owner                                                                                       ")
				.query("      ,a.biz_state                                                                                       ")
				.query("      ,a.biz_city                                                                                        ")
				.query("      ,a.biz_dong                                                                                        ")
				.query("      ,a.biz_zip_cd                                                                                      ")
				.query("      ,a.biz_addr_1                                                                                       ")
				.query("      ,a.biz_addr_2                                                                                       ")
				.query("      ,a.biz_email                                                                                       ")
				.query("      ,a.biz_tel_no                                                                                      ")
				.query("      ,a.biz_fax_no                                                                                      ")
				.query("      ,a.reve_nm                                                                                         ")
				.query("      ,a.reve_state                                                                                      ")
				.query("      ,a.reve_city                                                                                       ")
				.query("      ,a.reve_dong                                                                                       ")
				.query("      ,a.reve_zip_cd                                                                                     ")
				.query("      ,a.reve_addr_1                                                                                      ")
				.query("      ,a.reve_addr_2                                                                                      ")
				.query("      ,a.recv_addr3                                                                                      ")
				.query("      ,a.reve_email                                                                                      ")
				.query("      ,a.reve_tel_no                                                                                     ")
				.query("      ,a.reve_fax_no                                                                                     ")
				.query("      ,a.reve_hp_no                                                                                     ")
				.query("      ,(select sales_gb from cust_stor where stor_id = a.stor_id and cust_id = a.cust_id) as sales_gb ")
				.query("      ,-a.qty as rest_qty                                                                                ")
				.query("      ,a.invoiceno                                                                                       ")
				.query("      ,a.biz_hp_no                                                                                      ")
				.query("      ,a.ctrl_id                                                                                        ")
				.query("      ,a.mro_no                                                                                          ")
				.query("      ,a.mro_id                                                                                          ")
				.query("      ,a.inv_prt_cnt                                                                                   ")

				.query("     , b.clss_1      , (select bas_nm from base_mst where bas_id = b.clss_1 ) as cls1_nm ")
				.query("     , b.clss_2      , (select bas_nm from base_mst where bas_id = b.clss_2 ) as cls2_nm ")
				.query("     , b.clss_3      , (select bas_nm from base_mst where bas_id = b.clss_3 ) as cls3_nm ")
				.query("     , b.clss_4      , (select bas_nm from base_mst where bas_id = b.clss_4 ) as cls4_nm ")
				.query("     , b.clss_5      , (select bas_nm from base_mst where bas_id = b.clss_5 ) as cls5_nm ")
				.query("     , b.clss_6      , (select bas_nm from base_mst where bas_id = b.clss_6 ) as cls6_nm ")
		      	.query("     , c.biz_tax_gb   , c.colt_schd_type , c.colt_schd_term , b.user_memo as cust_usr_memo         ")
		      	.query("     , c.price_type   , c.price_rate                                                          ")
		      	.query("     , b.npay_amt      , b.balance_limit , b.limit_control , (b.balance_limit - b.npay_amt) as balance_amount ")

		      	.query("  from sale_mst a                                                                                       ")
				.query("       join cust_stor b                                                                                 ")
				.query("          on b.stor_id = a.stor_id                                                                     ")
				.query("         and b.cust_id = a.cust_id                                                                       ")
				.query("       join cust_mst c                                                                                  ")
				.query("          on c.cust_id = a.cust_id                                                                       ")
				.query(" where a.inv_no = :ret_no                                                                                ",arg.fixParameter("ret_no"))
//				.query("   and a.row_clos = 0                                                                                   ")
				.query("   and a.row_sts = 0                                                                                   ")
			;
			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param
					.query("select a.hq_id                                                                                                              ")
					.query("      ,a.stor_grp                                                                                                              ")
					.query("      ,a.stor_id                                                                                                              ")
					.query("      ,(select wrhs_id from sale_mst where inv_no = a.inv_no) as wrhs_id                                                    ")
					.query("      ,a.line_seqn                                                                                                               ")
					.query("      ,a.seq_top                                                                                                               ")
					.query("      ,a.seq_dsp                                                                                                               ")
					.query("      ,'1'       as ret_yn                                                                                                     ")
					.query("      ,a.inv_no  as ret_no                                                                                                     ")
					.query("      ,a.line_seqn as ret_seq                                                                                                    ")
					.query("      ,a.mst_itm_id                                                                                                               ")
					.query("      ,a.mst_itm_cd                                                                                                               ")
					.query("      ,a.unit_idcd                                                                                                               ")
					.query("      ,(select unit_name from item_unit where unit_idcd = a.unit_idcd ) as unit_name                                                   ")
					.query("      ,a.unt_qty                                                                                                              ")
					.query("      ,a.item_idcd                                                                                                               ")
					.query("      ,a.item_code                                                                                                               ")
					.query("      ,a.item_name                                                                                                               ")
					.query("      ,a.item_spec                                                                                                               ")
					.query("      ,(select sales_id from sale_mst where inv_no = a.inv_no) as sales_id                                                    ")
					.query("      ,a.notax_yn                                                                                                              ")
					.query("      ,a.cust_price                                                                                                            ")
					.query("      ,-a.cust_halin as cust_halin                                                                                             ")
					.query("      ,a.unit_price                                                                                                            ")
					.query("      ,a.unit_point                                                                                                            ")
					.query("      ,a.point_rate                                                                                                            ")
					.query("      ,-a.item_point as item_point                                                                                             ")
					.query("      ,-a.item_halin as item_halin                                                                                             ")
					.query("      ,a.price                                                                                                                 ")
					.query("      ,-a.qty        as qty                                                                                                    ")
					.query("      ,-a.qty        as org_ord_qty                                                                                               ")
					.query("      ,0             as ship_qty                                                                                               ")
					.query("      ,-a.tax_free   as tax_free                                                                                               ")
					.query("      ,-a.taxation   as taxation                                                                                               ")
					.query("      ,-a.sply_amt   as sply_amt                                                                                               ")
					.query("      ,-a.tax        as tax                                                                                                    ")
					.query("      ,-a.amount     as amount                                                                                                 ")
					.query("      ,a.po_pri                                                                                                              ")
					.query("      ,a.po_pri_type                                                                                                         ")
					.query("      ,a.po_pri_rt                                                                                                         ")
					.query("      ,-a.qty        as rest_qty                                                                                               ")
					.query("      ,a.converted                                                                                                             ")
					.query("      ,a.seq_qty                                                                                                               ")
					.query("      ,a.invoiceno                                                                                                             ")
					.query("      ,a.invoicesq                                                                                                             ")
					.query("      ,a.mro_no                                                                                                                ")
					.query("      ,a.mro_seq                                                                                                               ")

					.query("      ,b.pack_gb                                                                                                               ")
					.query("      ,case when b.pack_gb = 1 then b.vend_id else '' end as pack_vend_id                                                      ")
					.query("      ,case when b.pack_gb = 1 then (select vend_nm from vend_mst where vend_id = b.vend_id) else '' end as pack_vend_nm      ")
					.query("      ,case when b.pack_gb = 1 then '' else b.pack_zone_id end as pack_zone_id                                                 ")
					.query("      ,case when b.pack_gb = 1 then '' else (select bas_nm from base_mst where bas_id = b.pack_zone_id) end as pack_zone_nm ")
					.query("      ,c.brcd_2 as item_sc                                                                                                   ")

					.query("     , case when (select count(1) from sale_dtl where inv_no = a.inv_no and seq_top = a.line_seqn and seq_dsp is null) > 0 then '0' ")
					.query("            when a.seq_dsp is null then to_char(a.seq_top)                                                                         ")
					.query("            else ''                                                                                                                ")
					.query("       end as prnt_id                                                                                                            ")
					.query("  from sale_dtl a                                                                                                             ")
					.query("       join itm_stor b                                                                                                       ")
					.query("          on b.stor_id = a.stor_id                                                                                           ")
					.query("         and b.item_idcd = a.item_idcd                                                                                             ")
					.query("       join itm_mst c                                                                                                        ")
					.query("          on c.item_idcd = a.item_idcd                                                                                             ")
					.query(" where a.inv_no = :ret_no                                                                                                      ",arg.fixParameter("ret_no"))
					.query("   and a.row_sts = 0                                                                                                         ")
					.query(" order by a.line_seqn                                                                                                            ")
				;
				info.get(0).put("product", data.selectForMap());
			}
		    return info ;
		}
	}

	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {
		String inv_no = arg.fixParamText("inv_no" ) ;
		System.out.println("dddddddddddddddddddddddddddddddddddddddddddd" + inv_no );

		DataMessage temp = arg.newStorage("POS");

		temp.param
		 	.query("select sts_cd, ship_qty from order_mst where inv_no = :inv_no " , arg.fixParameter("inv_no"    ))

		;
		SqlResultRow del = temp.selectForRow();

		String work_stscd = arg.getParamText("sts_cd").toString() ;  /* 로컬 주문 상태 */
		String server_stscd = del.getParamText("sts_cd").toString() ; /* 서버 주문 상태 */

		DataMessage data = arg.newStorage("POS");

		double work_shipqty = Double.parseDouble(arg.getParamText("ship_qty")) ; /* 로컬 출고 수량 */
		double server_shipqty = Double.parseDouble(del.getParamText("ship_qty")) ; /* 서버 출고 수량 */
		System.out.println("shipqty="+del.getParamText("ship_qty") );
		if (del != null ) {
//			System.out.println("null");
			if ( work_stscd.equals(server_stscd)  ){ /* 로컬과 서버의 주문상태가 동일할 경우 */
				if ( work_shipqty == server_shipqty ){ /* 로컬과 서버의 출고 수량이 동일할 경우 */
					System.out.println("success" );
				} else {
					throw new ServiceException("정상적인 삭제작업이 아닙니다. 출고수량 불일치" );
				}
			} else {
				throw new ServiceException("정상적인 삭제작업이 아닙니다. 주문상태 불일치" );
			}
		}


		if ( "0200".equals(arg.getParameter("sts_cd"))  ){ /* 주문상태가 0200인 경우만 허용. 재확인 */

			System.out.println("sssssssssssssssssss");
			/* 상세 삭제 */
			data.param
			.table("order_item")
			.where("where  inv_no  		= :inv_no   	" )
			//
			.unique("inv_no"      , arg.fixParameter("inv_no"))
    		.update("row_sts"   , 2 					)
			.update("upt_nm"   , arg.getParameter("upt_nm"))
			.update("upt_ip"   , arg.remoteAddress)
			.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    		;data.attach(Action.update );  //.action = rowaction

			/* 정보  삭제 */
			data.param
			.table("order_pack")
			.where("where  inv_no  		= :inv_no   	" )
			//
			.unique("inv_no"      , arg.fixParameter("inv_no"))
    		.update("row_sts"   , 2 					)
			.update("upt_nm"   , arg.getParameter("upt_nm"))
			.update("upt_ip"   , arg.remoteAddress)
			.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    		;data.attach(Action.update );  //.action = rowaction

			/* 정보  삭제 */
			data.param
			.table("order_mst")
			.where("where  inv_no  		= :inv_no   	" )
			//
			.unique("inv_no"  , arg.fixParameter("inv_no"))
    		.update("row_sts"   , 2 					)
			.update("upt_nm"   , arg.getParameter("upt_nm"))
			.update("upt_ip"   , arg.remoteAddress)
			.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    		;data.attach(Action.update );  //.action = rowaction

//			/* 발주 정보가 있다면 삭제 */
//			data.param
//			.table("po_order_item")
//			.where("where  pack_inv  		= :pack_inv   	" )
//			//
//			.unique("pack_inv"  , arg.fixParameter("inv_no"))
//    		.update("row_sts"   , 2 					)
//			.update("upt_nm"   , arg.getParameter("upt_nm"))
//			.update("upt_ip"   , arg.remoteAddress)
//			.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//    		;data.attach(Action.update );  //.action = rowaction
//
//
//			/* 발주 정보가 있다면 삭제 */
//			data.param
//			.table("po_order")
//			.where("where  pack_inv  		= :pack_inv   	" )
//			//
//			.unique("pack_inv"  , arg.fixParameter("inv_no"))
//    		.update("row_sts"   , 2 					)
//			.update("upt_nm"   , arg.getParameter("upt_nm"))
//			.update("upt_ip"   , arg.remoteAddress)
//			.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//    		;data.attach(Action.update );  //.action = rowaction

		}
		data.execute();
		return null;
	}


	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);

		for(SqlResultRow inv:map){
			Action rowaction = SqlParameter.Action.setValue(inv.getParameter("_set"));
			if (rowaction == Action.delete) {

				//throw new ServiceException("비정상적인 삭제 요청 입니다." );

//						/* 상세 삭제 */
//						data.param
//						.table("order_item")
//						.where("where  inv_no  		= :inv_no   	" )
//						//
//						.unique("inv_no"  , inv.fixParameter("inv_no"))
//						.action = rowaction
//						; data.attach();
//
//						/* 정보  삭제 */
//						data.param
//						.table("order_pack")
//						.where("where  inv_no  		= :inv_no   	" )
//						//
//						.unique("inv_no"  , inv.fixParameter("inv_no"))
//						.action = rowaction
//						; data.attach();
//
//						/* 정보  삭제 */
//						data.param
//						.table("order_mst")
//						.where("where  inv_no  		= :inv_no   	" )
//						//
//						.unique("inv_no"  , inv.fixParameter("inv_no"))
//						.action = rowaction
//						; data.attach();
//
//						/* 발주 정보가 있다면 삭제 */
//						data.param
//						.table("po_order_item")
//						.where("where  pack_inv  		= :pack_inv   	" )
//						//
//						.unique("pack_inv"  , inv.fixParameter("inv_no"))
//						.action = rowaction
//						; data.attach();
//
//
//						/* 발주 정보가 있다면 삭제 */
//						data.param
//						.table("po_order")
//						.where("where  pack_inv  		= :pack_inv   	" )
//						//
//						.unique("pack_inv"  , inv.fixParameter("inv_no"))
//						.action = rowaction
//						; data.attach();
//
						throw new ServiceException("삭제불가" );

//				} else {
//					throw new ServiceException("정상적인 삭제작업이 아닙니다." );
//				}

			} else {
	        	data.param
		        	.table("order_mst")
		        	.where("where inv_no  = :inv_no   " )
		        	//
		        	.unique("corp_id"         , inv.fixParameter("corp_id"     ))
		        	.unique("hq_id"         , inv.fixParameter("hq_id"     ))
		        	.unique("stor_grp"         , inv.fixParameter("stor_grp"     ))
		        	.unique("stor_id"         , inv.fixParameter("stor_id"     ))
		        	.update("wrhs_id"         , inv.getParameter("wrhs_id"     ))

		        	.unique("inv_no"           , inv.fixParameter("inv_no"       ))
		        	.unique("pos_no"           , inv.getParameter("pos_no"       ))
		        	.update("inv_dt"           , inv.fixParameter("inv_dt"       ))
		        	.update("inv_tm"           , inv.fixParameter("inv_tm"       )) //row.fixParameter("inv_tm"       ))
		        	.update("ret_yn"           , inv.fixParameter("ret_yn"       ))
		        	.update("ret_no"           , inv.getParameter("ret_no"       ))

		        	.update("sales_gb"         , inv.fixParameter("sales_gb"     )) /* 매출 계정 구분 0: 일반매출고객, 1: 매출계정고객s */

		        	.update("inv_work_id"      , inv.getParameter("inv_work_id"  )) /* 주문 작업 위치 */
		        	.update("inv_work_gb"      , inv.getParameter("inv_work_gb"  )) /* 주문서 구분 */
		        	.update("inv_dept_id"      , inv.getParameter("inv_dept_id"  ))
		        	.update("inv_usr_id"      , inv.getParameter("inv_usr_id"  ))
		        	.update("salesman_id"      , inv.getParameter("salesman_id"  ))

		        	.insert("sts_cd"           , inv.getParameter("sts_cd"  ) , ( rowaction == Action.insert ))
					//.update("sts_cd"           , new SqlParamText("case when ship_qty = 0 then '0200' when :qty != ship_qty then '0400' else '0500' end " ) ,( rowaction == Action.update ))

					.insert("ori_no"           , inv.getParameter("ori_no"       )) /* 견적 번호 */
					.insert("ori_dt"           , inv.fixParameter("ori_dt"       )) /* 주문 입력일 */
					.insert("ori_tm"           , new SqlParamText("to_char(sysdate, 'hh24mi')")) /* 주문 입력 시간 */
					.update("pay_dt"           , inv.getParameter("pay_dt"       )) /* 입금 예정일 */

					.insert("cust_grp"          , inv.getParameter("cust_grp"      ))
					.insert("cust_id"          , inv.getParameter("cust_id"      ))
					.insert("cust_nm"          , inv.getParameter("cust_nm"      ))
					.insert("cust_gb"          , inv.getParameter("cust_gb"      ))
					.insert("mmb_id"          , inv.getParameter("mmb_id"      ))
					.insert("mmb_nm"          , inv.getParameter("mmb_nm"      ))

					.insert("price_no"         , inv.fixParameter("price_no"     ))

					.update("item_point"       , inv.getParameter("item_point"   ))
					.update("item_halin"       , inv.getParameter("item_halin"   ))

					.update("tax_recv"         , inv.fixParameter("tax_recv"     ))
					.update("tax_type"         , inv.getParameter("tax_type"     ))
					.update("tax_rt"         , inv.getParameter("tax_rt"     ))
					.update("tax_free"         , inv.getParameter("tax_free"     ))
					.update("taxation"         , inv.getParameter("taxation"     ))
					.update("sply_amt"         , inv.getParameter("sply_amt"     ))
					.update("tax"              , inv.getParameter("tax"          ))
					.update("amount"           , inv.getParameter("amount"       ))
					.update("charge"           , inv.getParameter("charge"       ))
					.update("payable"          , inv.getParameter("payable"      ))
					.update("payment"          , inv.getParameter("payment"      ))
					.update("npay_amt"          , inv.getParameter("npay_amt"      ))

					.update("qty"              , inv.getParameter("qty"          ))
					.insert("org_ord_qty"         , inv.getParameter("qty"          ))
					.insert("rest_qty"         , inv.getParameter("qty"          ))

					//.update("ship_qty"         , row.getParameter("ship_qty"     ))
					.update("point_rate_type"  , inv.getParameter("point_rate_type"  ))
					.update("cash_point_rate"  , inv.getParameter("cash_point_rate"  ))
					.update("card_point_rate"  , inv.getParameter("card_point_rate"  ))
					.update("add_point"        , inv.getParameter("add_point"    ))
					.update("use_point"        , inv.getParameter("use_point"    ))

					.update("req_msg"          , inv.getParameter("req_msg"      ))
					.update("biz_no"           , inv.getParameter("biz_no"       ))
					.update("biz_nm"           , inv.getParameter("biz_nm"       ))
					.update("biz_type"         , inv.getParameter("biz_type"     ))
					.update("biz_type"        , inv.getParameter("biz_type"    ))
					.update("biz_owner"        , inv.getParameter("biz_owner"    ))
					.update("biz_state"        , inv.getParameter("biz_state"    ))
					.update("biz_city"         , inv.getParameter("biz_city"     ))
					.update("biz_dong"         , inv.getParameter("biz_dong"     ))
					.update("biz_zip_cd"       , inv.getParameter("biz_zip_cd"   ))
					.update("biz_addr_1"        , inv.getParameter("biz_state") + " " + inv.getParameter("biz_city" ) + " " + inv.getParameter("biz_dong" ) )
					.update("biz_addr_2"        , inv.getParameter("biz_addr_2"    ))
					.update("biz_email"        , inv.getParameter("biz_email"    ))
					.update("biz_tel_no"       , inv.getParameter("biz_tel_no"   ))
					.update("biz_hp_no"       , inv.getParameter("biz_hp_no"   ))
					.update("biz_fax_no"       , inv.getParameter("biz_fax_no"   ))

					.update("reve_nm"          , inv.getParameter("reve_nm"      ))
					.update("reve_zip_cd"      , inv.getParameter("reve_zip_cd"  ))
					.update("reve_state"       , inv.getParameter("reve_state"   ))
					.update("reve_city"        , inv.getParameter("reve_city"    ))
					.update("reve_dong"        , inv.getParameter("reve_dong"    ))
					.update("reve_addr_1"       , inv.getParameter("reve_state") + " " + inv.getParameter("reve_city" ) + " " + inv.getParameter("reve_dong" ) )
					.update("reve_addr_2"       , inv.getParameter("reve_addr_2"   ))
					.update("reve_email"       , inv.getParameter("reve_email"   ))
					.update("reve_hp_no"      , inv.getParameter("reve_hp_no"   ))
					.update("reve_tel_no"      , inv.getParameter("reve_tel_no"  ))
					.update("reve_fax_no"      , inv.getParameter("reve_fax_no"  ))

//					.update("perpay_yn"        , row.getParameter("perpay_yn"    ))
//					.update("ref_no"           , row.getParameter("ref_no"       ))
//					.update("ref_cust"         , row.getParameter("ref_cust"     ))
//					.update("ref_info"         , row.getParameter("ref_info"     ))
//					.update("receipt_type"     , row.getParameter("receipt_type" ))
//					.update("taxpaper_yn"      , row.getParameter("taxpaper_yn"  ))
//					.update("coupon_no"        , row.getParameter("coupon_no"    ))
//					.update("cash_rep_req_yn"  , row.getParameter("cash_rep_req_yn" ))
//					.update("cash_rep_type"    , row.getParameter("cash_rep_type"   ))
//					.update("cash_rep_e_ii"    , row.getParameter("cash_rep_e_ii"   ))

					.update("user_memo"        , inv.getParameter("user_memo"    ))
					.update("row_clos"        , inv.getParameter("row_clos"    ))
					.update("row_sts"        , inv.getParameter("row_sts"    ))

					.update("upt_nm"        , inv.getParameter("upt_nm"    ))
					.update("upt_ip"   	   , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"        , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_nm" 	   , inv.getParameter("crt_nm"	 ))
					.insert("crt_ip"   	   , new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_dttm"        , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.action = rowaction ;
	        	;data.attach();


				SqlResultMap picking = inv.getParameter("picking", SqlResultMap.class);
	        	if (picking != null){
	        		setPicking(arg, data , picking, inv );
	        	}


				SqlResultMap prduct = inv.getParameter("product", SqlResultMap.class);
	        	if (prduct != null){
	        		setProduct(arg, data, prduct , inv   );
	        	}


	        	if (picking != null){
	        		for(SqlResultRow pkg:picking){

	        			Action pkgaction = SqlParameter.Action.setValue(pkg.getParameter("_set"));
	        			double work_ori = Double.parseDouble(pkg.getParamText("_qty")) ;
	        			double work_qty = Double.parseDouble(pkg.getParamText("qty")) ;

	        			if (pkgaction == Action.update && work_ori != work_qty) {
		    		       	// 발주요청 출고수량 변경
		    				data.param
		    					.query(" update order_pack a                    ")
		    					.query(" set (a.rest_qty, a.sts_cd) = (         ")
		    					.query("	  select sum(abs(b.rest_qty))       ")
		    					.query("	     ,   case when sum(abs(b.rest_qty)) = 0  then '0500'       ") // 발주승인
		    					.query("                  when a.qty =sum(abs(b.rest_qty)) then '0200' ") // 일부납품
		    					.query("	         else '0400' end ") // 입고완료 OR 일부납품
		    					.query("	  from  order_item b                                  " )
		    					.query("	  where b.inv_no  = a.inv_no                          " )
		    					.query("	  and   b.pack_no = a.pack_no                         " )
		    					.query("      and   b.row_sts = 0                               " )
		    					.query("	)                                                    " )
		    					.query(" where a.pack_no = :pack_no  ", pkg.fixParameter("pack_no" ))
		    					.query(" and   a.inv_no  = :inv_no   ", pkg.fixParameter("inv_no"  ))
		    					.action = Action.direct;
		    				data.attach();
	        			}
//	        			if ((pkgaction != Action.delete) && "1".equals(pkg.getParamText("pack_gb"  )) && !"".equals( pkg.getParamText("pack_vend_id"   ))) {
//		    				// 발주요청 정보 입고수량 변경
//		    				data.param
//		    					.query("update  po_order  t                                                ")
//		    					.query("   set( t.sply_amt, t.tax, t.amount, t.qty, t.rest_qty , t.tax_free, t.taxation ")
//		    					.query("  ) = ( select isnull(sum(s.sply_amt) , 0),                           ")
//		    					.query("		       isnull(sum(s.tax)      , 0),                           ")
//		    					.query("	           isnull(sum(s.amount)   , 0),                           ")
//		    					.query("		       isnull(sum(s.qty)      , 0),                           ")
//		    					.query("		       isnull(sum(s.rest_qty) , 0),                           ")
//		    					.query("		       isnull(sum(s.tax_free) , 0),                           ")
//		    					.query("		       isnull(sum(s.taxation) , 0)                            ")
//		    					.query("        from po_order_item s                                       ")
//		    					.query("        where s.inv_no = t.inv_no                                  ")
//		    					.query("        and   s.row_sts = 0)                                     ")
//		    					.query(" where t.inv_no = :inv_no  ", pkg.fixParameter("pack_no"           ))
//		    					.action = Action.direct;
//		    				data.attach();
//	        			}
	        		}



	        		/* 주문 정보를 업데이트 한다. */
        			double work_ori = Double.parseDouble(inv.getParamText("_qty")) ;
        			double work_qty = Double.parseDouble(inv.getParamText("qty")) ;
	        		if (rowaction == Action.update && work_ori != work_qty ) {
	        		 	// 발주요청 출고수량 변경
	    				data.param
	    					.query(" update order_mst a                                          ")
	    					.query(" set (a.rest_qty, a.sts_cd) = (                               ")
	    					.query("	  select sum(abs(b.rest_qty))                             ")
	    					.query("	       , case when a.sts_cd < '0200' then a.sts_cd        ") // 승인전 상태라면 이전 상태를 유지
	    					.query("	         else                                             ")
	    					.query("	              case when sum(b.rest_qty)   = 0 then '0500' ") // 배송완료
	    					.query("                       when a.qty=sum(b.rest_qty) then '0200' ") // 배송대기
	    					.query("	                   else '0400'                            ") // 부분배송
	    					.query("	              end                                         ")
                            .query("	         end                                              ")
	    					.query("	  from  order_pack b                                      ")
	    					.query("	  where b.inv_no  = a.inv_no                              ")
	    					.query("      and   b.row_sts = 0                                   ")
	    					.query("	)                                                         ")
	    					.query(" where a.inv_no  = :inv_no   ", inv.fixParameter("inv_no"     ))
	    					.action = Action.direct;
	    				data.attach();
	        		}
	        	}


	    		// 수금 번호
	    		String ret_no = arg.getParamText("ret_no");

	    		if (!"".equals(ret_no)) {
		        	// 반품 매출정보 update
		        	if (rowaction == Action.insert) {
		    			data.param
							.table("sale_dtl")
							.where("where inv_no = :inv_no ")
							//
							.unique("inv_no",    inv.fixParameter("ret_no"))
				    		.update("ret_yn",    "1")
							.update("upt_nm", arg.getParameter("upt_nm"))
							.update("upt_ip", arg.remoteAddress)
							.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						;
						data.attach(Action.update);

		    			data.param
							.table("sale_mst")
							.where("where inv_no = :inv_no ")
							//
							.unique("inv_no",    inv.fixParameter("ret_no"))
				    		.update("ret_yn",    "1")
							.update("upt_nm", arg.getParameter("upt_nm"))
							.update("upt_ip", arg.remoteAddress)
							.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						;
						data.attach(Action.update);
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
	public SqlResultMap setPicking(HttpRequestArgument arg, DataMessage data, SqlResultMap map, SqlResultRow inv) throws Exception {

//		Date day =  new Date();
//		SimpleDateFormat x = new SimpleDateFormat("yyyymmdd");
//		String today =  x.format(day);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				/* 상세 삭제 */
	        	data.param
	        		.table("order_pack")
	        		.where("where  pack_no  		= :pack_no   	   " )
	        		//
	        		.unique("pack_no"   , row.fixParameter("pack_no"  ))
	        		.action = rowaction
	        	; data.attach();

	        	if (!"".equals( row.getParamText("pack_vend_id"   ))) {

//					/* 발주 삭제 */
//		        	data.param
//		        		.table("po_order_item")
//		        		.where("where  pack_no = :pack_no   	   " )
//		        		//
//		        		.unique("pack_no"   , row.fixParameter("pack_no"  ))
//		        		.action = rowaction
//		        	; data.attach();
//
//
//	        		/* 발주 삭제 */
//		        	data.param
//		        		.table("po_order")
//		        		.where("where  pack_no = :pack_no   	   " )
//		        		//
//		        		.unique("pack_no"   , row.fixParameter("pack_no"  ))
//		        		.action = rowaction
//		        	; data.attach();



	        	}
			} else {
	        	data.param
		        	.table("order_pack")
		        	.where("where  pack_no  		= :pack_no   	" )
		        	//
		        	.unique("corp_id"          , row.fixParameter("corp_id"       ))
		        	.unique("hq_id"          , row.fixParameter("hq_id"       ))
		        	.unique("stor_grp"          , row.fixParameter("stor_grp"       ))
		        	.unique("stor_id"          , row.fixParameter("stor_id"       ))
		        	.update("wrhs_id"          , row.fixParameter("wrhs_id"       ))
					.unique("inv_no"            , row.fixParameter("inv_no"         ))
					.update("inv_dt"            , row.fixParameter("inv_dt"         ))
					.unique("inv_gb"            , row.fixParameter("inv_gb"         ))

		        	.insert("sts_cd"           , row.getParameter("sts_cd"  ) , ( rowaction == Action.insert ))
					//.update("sts_cd"           , new SqlParamText("case when ship_qty = 0 then '0200' when :qty != ship_qty then '0400' else '0500' end " ) ,( rowaction == Action.update ))

					.unique("pack_no"           , row.fixParameter("pack_no"        ))
					.update("pack_seq"          , row.fixParameter("pack_seq"       ))
					.unique("pack_gb"           , row.fixParameter("pack_gb"        ))

					.insert("pack_vend_id"      , row.getParameter("pack_vend_id"   ))
					.insert("pack_zone_id"      , row.getParameter("pack_zone_id"   ))
					.unique("sales_id"          , row.getParameter("sales_id"       ))
					.insert("org_ord_qty"          , row.fixParameter("org_ord_qty"       ))
					.update("qty"               , row.fixParameter("qty"            ))

					.insert("rest_qty"          , row.fixParameter("qty"            ))



					.update("tax_free"          , row.fixParameter("tax_free"       ))
					.update("taxation"          , row.fixParameter("taxation"       ))
					.update("sply_amt"          , row.fixParameter("sply_amt"       ))
					.update("tax"               , row.fixParameter("tax"            ))
					.update("amount"            , row.fixParameter("amount"         ))

					.update("user_memo" 	    , row.getParameter("user_memo"		))
					.update("row_sts" 		, row.getParameter("row_sts"		))
					.update("upt_nm" 		, row.getParameter("upt_nm"		))
					.update("upt_ip"   		, arg.remoteAddress)
					.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					.insert("crt_nm" 		, row.getParameter("crt_nm"		))
					.insert("crt_ip"   		, arg.remoteAddress)
					.insert("crt_dttm"      	, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					.action = rowaction ;
	        	;data.attach();

	        	if ("1".equals(row.getParamText("pack_gb"  )) && !"".equals( row.getParamText("pack_vend_id"   ))) {
//		        	data.param
//		        		.table("po_order")
//		        		.where("where  inv_no = :inv_no	" )
//		        		//
//		        		.unique("corp_id"          , inv.fixParameter("corp_id"       ))
//		        		.unique("hq_id"          , inv.fixParameter("hq_id"       ))
//		        		.unique("stor_grp"          , inv.fixParameter("stor_grp"       ))
//		        		.unique("stor_id"          , inv.fixParameter("stor_id"       ))
//		        		.update("wrhs_id"          , inv.fixParameter("wrhs_id"       ))
//
//		        		// <!-->
//		        		.unique("pack_inv"          , row.fixParameter("inv_no"         ))
//		        		.unique("inv_no"            , row.fixParameter("pack_no"        ))
//		        		.unique("pack_no"           , row.fixParameter("pack_no"        ))
//		        		.update("inv_dt"            , row.fixParameter("inv_dt"         ))
//		        		.unique("inv_gb"            , "3" ) // 직납 발주로 셋팅
//		        		.insert("vend_id"           , row.getParameter("pack_vend_id"   ))
//		        		.insert("vend_nm"           , row.getParameter("pack_vend_nm"   ))
//		        		.unique("vend_gb"           , "2" ) // 직납으로 셋팅
//		        		// <!-->
//
//			        	.unique("pos_no"         	, inv.fixParameter("pos_no"     		))
//						.update("inv_tm"         	, inv.fixParameter("inv_tm"     		)) //new SqlParamText("to_char(sysdate, 'hh24mi')"))
//
////						.insert("inv_work_id"       , row.getParameter("inv_work_id"     	))
//						.insert("inv_work_gb"       , row.getParameter("inv_work_gb"     	))
//						.insert("inv_dept_id"       , row.getParameter("inv_dept_id"     	))
//						.insert("inv_usr_id"       , inv.getParameter("inv_usr_id"     	))
//
//						.insert("sts_cd"            , row.getParameter("sts_cd"  ) , ( rowaction == Action.insert ))
//						//.update("sts_cd"            , new SqlParamText("case when ship_qty = 0 then '0200' when :qty != ship_qty then '0400' else '0500' end " ) ,( rowaction == Action.update ))
//						//.update("sts_cd"         	, row.fixParameter("sts_cd"     		))
////						.update("salesman_id"       , inv.getParameter("salesman_id"     	))
////						.insert("ret_yn"         	, row.getParameter("ret_yn"     		))
////						.insert("ret_no"         	, row.getParameter("ret_no"     		))
//
//						.update("vend_id"         	, row.getParameter("vend_id"     		))
//						.update("vend_nm"         	, row.getParameter("vend_nm"     		))
//						.update("vend_gb"         	, row.getParameter("vend_gb"     		))
//
//
//						.update("tax_type"         	, inv.getParameter("tax_recv"     		))
//						.update("tax_rt"         	, inv.getParameter("tax_rt"     		))
//						.update("tax_free"         	, row.getParameter("tax_free"     		))
//						.update("taxation"         	, row.getParameter("taxation"     		))
//						.update("sply_amt"         	, row.getParameter("sply_amt"     		))
//						.update("tax"         		, row.getParameter("tax"     			))
//						.update("amount"        	, row.getParameter("amount"     		))
//
//						.update("qty"         		, row.getParameter("qty"     			))
//						.insert("rest_qty"         	, row.getParameter("qty"     		))
//						.insert("org_ord_qty"         	, row.getParameter("org_ord_qty"     		))
//
//
//						.update("req_msg"         	, inv.getParameter("req_msg"            ))
//						.update("user_memo"         , row.getParameter("user_memo"          ))
//
//						.update("biz_no"           , inv.getParameter("biz_no"              ))
//						.update("biz_nm"           , inv.getParameter("biz_nm"       ))
//						.update("biz_type"         , inv.getParameter("biz_type"     ))
//						.update("biz_type"        , inv.getParameter("biz_type"    ))
//						.update("biz_owner"        , inv.getParameter("biz_owner"    ))
//						.update("biz_state"        , inv.getParameter("biz_state"    ))
//						.update("biz_city"         , inv.getParameter("biz_city"     ))
//						.update("biz_dong"         , inv.getParameter("biz_dong"     ))
//						.update("biz_zip_cd"       , inv.getParameter("biz_zip_cd"   ))
//						.update("biz_addr_1"        , inv.getParameter("biz_addr_1"    ))
//						.update("biz_addr_2"        , inv.getParameter("biz_addr_2"    ))
//						.update("biz_email"        , inv.getParameter("biz_email"    ))
//						.update("biz_tel_no"       , inv.getParameter("biz_tel_no"   ))
//						.update("biz_hp_no"       , inv.getParameter("biz_hp_no"   ))
//						.update("biz_fax_no"       , inv.getParameter("biz_fax_no"   ))
//
//
//						.update("recv_id"         	, inv.getParameter("cust_id"     		))
//						.update("reve_nm"         	, inv.getParameter("cust_nm"     		))
//						.update("reve_state"        , inv.getParameter("reve_state"     	))
//						.update("reve_city"         , inv.getParameter("reve_city"     		))
//						.update("reve_dong"         , inv.getParameter("reve_dong"     		))
//						.update("reve_zip_cd"       , inv.getParameter("reve_zip_cd"     	))
//						.update("reve_addr_1"        , inv.getParameter("reve_addr_1"     	))
//						.update("reve_addr_2"        , inv.getParameter("reve_addr_2"     	))
//						.update("recv_addr3"        , inv.getParameter("recv_addr3"     	))
//						.update("reve_email"        , inv.getParameter("reve_email"     	))
//						.update("reve_hp_no"       , inv.getParameter("reve_hp_no"     	))
//						.update("reve_tel_no"       , inv.getParameter("reve_tel_no"     	))
//						.update("reve_fax_no"       , inv.getParameter("reve_fax_no"     	))
//						.update("hdli_id"        , inv.getParameter("hdli_id"     	))
//						.update("hdli_no"        , inv.getParameter("hdli_no"     	))
//
//						.update("upt_nm"         , row.getParameter("upt_nm"    		))
//						.update("upt_ip"   	    , arg.remoteAddress)
//						.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//						.insert("crt_nm" 	    , row.getParameter("crt_nm"	 				))
//						.insert("crt_ip"   	    , arg.remoteAddress)
//						.insert("crt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//		        		.action = rowaction ;
//		        	;data.attach();

	        	}
			}
		}
		return null ;
	}

	/**
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setProduct(HttpRequestArgument arg , DataMessage data, SqlResultMap map, SqlResultRow inv ) throws Exception {

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				/* 상세 삭제 */
	        	data.param
	        		.table("order_item")
	        		.where("where  inv_no  		= :inv_no   	   " )
	        		.where("and    line_seqn 		= :line_seqn   	   " )
	        		//
	        		.unique("inv_no"   , row.fixParameter("inv_no"  ))
	        		.unique("line_seqn"  , row.fixParameter("line_seqn" ))
	        		.action = rowaction
	        	; data.attach();

	        	if (!"".equals( row.getParamText("pack_vend_id"   ))) {
//					/* 발주 삭제 */
//		        	data.param
//		        		.table("po_order_item")
//		        		.where("where  inv_no  = :inv_no   	   " )
//		        		.where("and    line_seqn = :line_seqn   	   " )
//		        		//
//		        		.unique("inv_no"   , row.fixParameter("pack_no"  ))
//		        		.unique("line_seqn"  , row.fixParameter("line_seqn"  ))
//		        		.action = rowaction
//		        	; data.attach();
	        	}

			} else {

	        	data.param
		        	.table("order_item")
		        	.where("where  inv_no  		= :inv_no   	" )
		        	.where("and    line_seqn  	= :line_seqn   	" )
		        	//
		        	.unique("hq_id"          , row.fixParameter("hq_id"       ))
		        	.unique("stor_grp"          , row.fixParameter("stor_grp"       ))
		        	.unique("stor_id"          , row.fixParameter("stor_id"       ))
		        	.update("wrhs_id"          , row.fixParameter("wrhs_id"       ))
					.unique("pack_no"           , row.fixParameter("pack_no"        ))
					.unique("pack_gb"           , row.fixParameter("pack_gb"        ))

					.unique("inv_no"            , row.fixParameter("inv_no"         ))
					.unique("line_seqn"           , row.fixParameter("line_seqn"        ))
					.insert("seq_top"           , row.fixParameter("seq_top"        ))
					.insert("seq_dsp"           , row.getParameter("seq_dsp"        ))

					.insert("ret_yn"            , row.getParameter("ret_yn"         ))
					.update("ret_no"            , row.getParameter("ret_no"         ))
					.insert("ret_seq"           , row.getParameter("ret_seq"        ))
					.insert("ori_no"            , row.getParameter("ori_no"         ))
					.insert("ori_seq"           , row.getParameter("ori_seq"        ))
					.update("pack_vend_id"      , row.getParameter("pack_vend_id"   ))
					.update("pack_zone_id"      , row.getParameter("pack_zone_id"   ))

					.unique("mst_itm_id"           , row.fixParameter("mst_itm_id"        ))
					.unique("mst_itm_cd"           , row.fixParameter("mst_itm_cd"        ))
					.unique("unit_idcd"           , row.fixParameter("unit_idcd"        ))
					.unique("unt_qty"          , row.fixParameter("unt_qty"       ))
					.unique("item_idcd"           , row.fixParameter("item_idcd"        ))
					.unique("item_code"           , row.fixParameter("item_code"        ))
					.update("item_name"           , row.getParameter("item_name"        ))
					.update("item_spec"           , row.getParameter("item_spec"        ))

					.update("notax_yn"          , row.fixParameter("notax_yn"       ))
					.update("cust_price"        , row.fixParameter("cust_price"     ))
					.update("cust_halin"        , row.fixParameter("cust_halin"     ))


					.update("sales_id"          , row.fixParameter("sales_id"       ))
					.update("unit_price"        , row.fixParameter("unit_price"     ))
					.update("unit_point"        , row.fixParameter("unit_point"     ))
					.update("point_rate"        , row.fixParameter("point_rate"     ))
					.update("item_point"        , row.fixParameter("item_point"     ))
					.update("item_halin"        , row.getParameter("item_halin"     ))

					.update("price"             , row.fixParameter("price"          ))
					.update("qty"               , row.fixParameter("qty"            ))

					.insert("rest_qty"          , row.fixParameter("qty"            ) , rowaction == Action.insert )
					.update("rest_qty"          , new SqlParamText(":qty-ship_qty " ) , rowaction == Action.update )
					.insert("org_ord_qty"          , row.getParameter("qty"            ))
					.update("tax_free"          , row.fixParameter("tax_free"       ))
					.update("taxation"          , row.fixParameter("taxation"       ))
					.update("sply_amt"          , row.fixParameter("sply_amt"       ))
					.update("tax"               , row.fixParameter("tax"            ))
					.update("amount"            , row.fixParameter("amount"         ))

					.update("po_pri"          , row.fixParameter("po_pri"       ))
					.update("po_pri_type"     , row.fixParameter("po_pri_type"  ))
					.update("po_pri_rt"     , row.fixParameter("po_pri_rt"  ))

					.update("user_memo" 	    , row.getParameter("user_memo"		))
					.update("row_sts" 		, row.getParameter("row_sts"		))
					.update("upt_nm" 		, row.getParameter("upt_nm"		))
					.update("upt_ip"   		, arg.remoteAddress)
					.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					.insert("crt_nm" 		, row.getParameter("crt_nm"		))
					.insert("crt_ip"   		, arg.remoteAddress)
					.insert("crt_dttm"      	, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					.update("seq_qty"           , row.getParameter("seq_qty"        ))
					.action = rowaction ;
	        	;data.attach();

	        	//SqlResultRow tax = new SqlResultRow();
//	        	double  qty      = Double.parseDouble(row.getParamText("qty")) ;
//				double  price    = Double.parseDouble(row.getParamText("po_pri")) ;
				//double  tax_rt = Double.parseDouble(String.valueOf(inv.getParameter("tax_rt"))) ;
				//boolean tax_type =("0".equals(inv.getParameter("tax_recv")));
				double  baseamt   = Double.parseDouble(row.getParamText("qty")) * Double.parseDouble(row.getParamText("po_pri"));
				SqlResultRow tax  = NumberUtil.calcSurtax(baseamt, Double.parseDouble(inv.getParamText("tax_rt")), "0".equals(inv.getParamText("tax_recv") ));

				if("0".equals(row.getParameter("notax_yn"))){
					tax.setParameter("tax_free", 0);
					tax.setParameter("taxation", baseamt);
				} else {
					tax.setParameter("tax_free", baseamt);
					tax.setParameter("taxation", 0);
				}

	        	if ("1".equals(row.getParamText("pack_gb"  )) && !"".equals( row.getParamText("pack_vend_id"   ))) {
//		        	data.param
//		        		.table("po_order_item")
//		        		.where("where  inv_no  = :inv_no	" )
//		        		.where("and    line_seqn = :line_seqn	" )
//		        		//
////		        		.unique("corp_id"          , row.fixParameter("corp_id"       ))
//		        		.unique("hq_id"          , row.fixParameter("hq_id"       ))
//		        		.unique("stor_grp"          , row.fixParameter("stor_grp"       ))
//		        		.unique("stor_id"          , row.fixParameter("stor_id"       ))
//		        		.update("wrhs_id"          , row.fixParameter("wrhs_id"       ))
//		        		// <!-- >
//		        		.unique("pack_inv"          , row.fixParameter("inv_no"         ))
//		        		.unique("inv_no"            , row.fixParameter("pack_no"        ))
//		        		.unique("pack_no"           , row.fixParameter("pack_no"        ))
//
////		        		.unique("inv_no"            , row.fixParameter("pack_no"        ))
//		        		.unique("line_seqn"           , row.fixParameter("line_seqn"        ))
//		        		.unique("pack_seq"          , row.fixParameter("line_seqn"        ))
//		        		.insert("seq_top"           , row.fixParameter("seq_top"        ))
//		        		.insert("seq_dsp"           , row.getParameter("seq_dsp"        ))
////		        		.unique("ori_no"            , row.fixParameter("inv_no"         ))
////		        		.unique("ori_seq"           , row.fixParameter("line_seqn"        ))
//		        		// <!-- >
//
//		        		.update("safe_dt"           , inv.fixParameter("inv_dt"        ))
////						.insert("ret_yn"            , row.getParameter("ret_yn"         ))
////						.update("ret_no"            , row.getParameter("ret_no"         ))
////						.insert("ret_seq"           , row.getParameter("ret_seq"        ))
////						.update("pack_vend_id"      , row.getParameter("pack_vend_id"   ))
////						.update("pack_zone_id"      , row.getParameter("pack_zone_id"   ))
//
//						.unique("mst_itm_id"           , row.fixParameter("mst_itm_id"        ))
//						.unique("mst_itm_cd"           , row.fixParameter("mst_itm_cd"        ))
//						.unique("unit_idcd"           , row.fixParameter("unit_idcd"        ))
//						.unique("unt_qty"          , row.fixParameter("unt_qty"       ))
//						.unique("item_idcd"           , row.fixParameter("item_idcd"        ))
//						.unique("item_code"           , row.fixParameter("item_code"        ))
//						.unique("item_name"           , row.getParameter("item_name"        ))
//						.insert("item_spec"           , row.getParameter("item_spec"        ))
//
//
////						.update("sales_id"          , row.fixParameter("sales_id"       ))
//						.update("unit_price"        , row.fixParameter("po_pri"       ))
//						.update("cust_price"        , row.fixParameter("price"          ))
//
////						.update("unit_point"        , row.fixParameter("unit_point"     ))
////						.update("point_rate"        , row.fixParameter("point_rate"     ))
////						.update("item_point"        , row.fixParameter("item_point"     ))
////						.update("item_halin"        , row.getParameter("item_halin"     ))
//
//						.update("price"             , row.fixParameter("po_pri"       ))
//						.update("qty"               , row.fixParameter("qty"            ))
//
//						.insert("rest_qty"          , row.fixParameter("qty"            ) , rowaction == Action.insert )
//						.update("rest_qty"          , new SqlParamText(":qty-ship_qty " ) , rowaction == Action.update )
//						.insert("org_ord_qty"          , row.getParameter("qty"            ))
//
//						.insert("notax_yn"          , row.fixParameter("notax_yn"       ))
//						.update("tax_free"          , tax.fixParameter("tax_free"       ))
//						.update("taxation"          , tax.fixParameter("taxation"       ))
//						.update("sply_amt"          , tax.fixParameter("sply_amt"       ))
//						.update("tax"               , tax.fixParameter("tax"            ))
//						.update("amount"            , tax.fixParameter("amount"         ))
//
//						.update("user_memo" 	    , row.getParameter("user_memo"		))
//						.update("row_sts" 		, row.getParameter("row_sts"		))
//						.update("upt_nm" 		, row.getParameter("upt_nm"		))
//						.update("upt_ip"   		, arg.remoteAddress)
//						.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//						.insert("crt_nm" 		, row.getParameter("crt_nm"		))
//						.insert("crt_ip"   		, arg.remoteAddress)
//						.insert("crt_dttm"      	, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
//		        		.action = rowaction ;
//		        	;data.attach();

	        	}

			}
		}
		return null ;
	}


	/**
	 * 상품검색
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
	//	SqlResultMap ret = new SqlResultMap();

//		Integer price_no = (int) Double.parseDouble( arg.fixParamText("price_no")) ;

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}
		Integer price_no = (int) Double.parseDouble( arg.fixParamText("price_no")) ;

		String custgb = arg.fixParamText("cust_gb").toString();

		//for (SqlResultRow row:map) {
		data.clear();
		data.param // 쿼리문  입력
			.query("select  a.stor_grp     , a.stor_id ")
			.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
			.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_spec 	     	")
			.query("     ,  b.cst_pri   , s.stock    , a.pack_gb  , b.notax_yn			")
			.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		;

		if ( "5".equals(custgb) ){
			data.param.query(" , case when b.epo_pri = 0 then 0 else b.epo_pri end as cust_price " );
		} else {

			switch (price_no) {
			case  1 : data.param.query(" , case when a.sale_pri_1 = 0 then b.sale_pri_1 else a.sale_pri_1 end as cust_price " ); break;// 출하가1
			case  2 : data.param.query(" , case when a.sale_pri_2 = 0 then b.sale_pri_2 else a.sale_pri_2 end as cust_price " ); break; // 출하가2
			case  3 : data.param.query(" , case when a.sale_pri_3 = 0 then b.sale_pri_3 else a.sale_pri_3 end as cust_price " ); break; // 출하가3
			case  4 : data.param.query(" , case when a.sale_pri_4 = 0 then b.sale_pri_4 else a.sale_pri_4 end as cust_price " ); break; // 출하가4
			case  5 : data.param.query(" , case when a.sale_pri_5 = 0 then b.sale_pri_5 else a.sale_pri_5 end as cust_price " ); break; // 출하가5
			case  6 : data.param.query(" , b.cst_pri as cust_price " ); break; // 소비자가
			case  8 : data.param.query(" , b.b2c_pri  as cust_price " ); break; // 쇼핑몰가(B2C)
//			case  9 : data.param.query(" , a.po_pri   as cust_price " ); break; // 구매가
			case  9 : data.param.query(" , case when a.po_pri = 0 then b.po_pri else a.po_pri end as cust_price " ); break; // 구매가
			case 10 : data.param.query(" , a.usr_price as cust_price " ); break; // 직원가
			case 11 : data.param.query(" , b.b2b_pri  as cust_price " ); break; // 기업몰가(B2B)
			default : data.param.query(" , 0 as cust_price " ); break; // 7 포스가
			}
		}

//
		data.param // 쿼리문  입력
			.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
			.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
			.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id ) as  vend_nm  " )
//			.query("     ,  b.pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.pack_vend_id ) as  pack_vend_nm  " )
			.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
			.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
			.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
//			.query("     ,  a.po_pri , a.po_pri_type, a.po_pri_rt   ")
			.query("     ,  case when a.po_pri = 0 then b.po_pri else a.po_pri end as po_pri ")
			.query("     ,  case when a.po_pri_type = 0 then b.po_pri_type else a.po_pri_type end as po_pri_type ")
			.query("     ,  case when a.po_pri_rt = 0 then b.po_pri_rt else a.po_pri_rt end as po_pri_rt ")
			.query("     ,  a.bunch_gb                                      ")
			.query("     ,  decode(a.bunch_gb, '0', null, c.prnt_id) as prnt_id ")
			.query("from    itm_stor      a                               ")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
			.query("        left outer join item_bunch c on c.stor_id = a.stor_id and c.item_idcd = a.item_idcd ")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			//.query("and     a.item_idcd    = :item_idcd   " , row.getParameter("item_idcd"   ))
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
//			.query("and     a.row_sts  = 0 " )
			.query("and     a.row_sts  = :row_sts " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.query("and     a.row_sts <= :row_sts " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
		;
		 	//SqlResultRow item = data.selectForRow();

		SqlResultMap ret = data.selectForMap();
		for(SqlResultRow row:ret){
			if (Double.parseDouble( row.getParamText("cust_price") ) == 0) {
				row.setParameter("cust_price", row.getParameter("stad_sale_pri"));
			}
		}
		return ret ;

		//	if (item != null) {
		//		ret.add( item );
		//	}
		//}
		//return ret ;
	}

	/**
	 * 세트 옵션상품
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getBunchItem1(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select  a.stor_grp     , a.stor_id ")
			.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
			.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_spec 	     	")
			.query("     ,  0 as cst_pri   , s.stock    , a.pack_gb  , b.notax_yn			")
			.query("     ,  0 as stad_sale_pri ")
			.query("     ,  0 as cust_price ")
			.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
			.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
			.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id ) as  vend_nm  " )
//			.query("     ,  b.pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.pack_vend_id ) as  pack_vend_nm  " )
			.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
			.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
			.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
			.query("     ,  0 as po_pri , a.po_pri_type, a.po_pri_rt   ")
			.query("     ,  a.bunch_gb                                      ")
			.query("     ,  c.prnt_id                                     ")
			.query("     ,  c.item_qty as seq_qty                           ")
			.query("from    itm_stor      a                               ")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
			.query("        join item_bunch c on c.stor_id = a.stor_id and c.item_idcd = a.item_idcd            ")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     a.item_idcd   in (select item_idcd from item_bunch where prnt_id = :prnt_id and option_yn = '1') " , arg.fixParameter("prnt_id"  ) )
			.query("and     a.row_sts  = 0 " )
			.query("order by c.row_ord     " )
		;

		SqlResultMap ret = data.selectForMap();
		for(SqlResultRow row:ret){
			if (Double.parseDouble( row.getParamText("cust_price") ) == 0) {
				row.setParameter("cust_price", row.getParameter("stad_sale_pri"));
			}
		}
		return ret ;
	}

	/**
	 * 세트 옵션상품 + 필수상품
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getBunchItem2(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select  a.stor_grp     , a.stor_id ")
			.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
			.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_spec 	     	")
			.query("     ,  0 as cst_pri   , s.stock    , a.pack_gb  , b.notax_yn			")
			.query("     ,  0 as stad_sale_pri ")
			.query("     ,  0 as cust_price ")
			.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
			.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
			.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id ) as  vend_nm  " )
//			.query("     ,  b.pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.pack_vend_id ) as  pack_vend_nm  " )
			.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
			.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
			.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
			.query("     ,  0 as po_pri , a.po_pri_type, a.po_pri_rt   ")
			.query("     ,  a.bunch_gb                                      ")
			.query("     ,  c.prnt_id                                     ")
			.query("     ,  c.item_qty as seq_qty                           ")
			.query("from    itm_stor      a                               ")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
			.query("        join item_bunch c on c.stor_id = a.stor_id and c.item_idcd = a.item_idcd            ")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     a.item_idcd   in (select item_idcd from item_bunch where (prnt_id = :prnt_id and option_yn = '0')     " , arg.fixParameter("prnt_id"))
			.query("		                                                  or (prnt_id = :prnt_id and option_yn = '1'      " , arg.fixParameter("prnt_id"))
			.query("		                                                  		                     and item_idcd = :item_idcd)) " , arg.fixParameter("item_idcd"))
			.query("and     a.row_sts  = 0 " )
			.query("order by c.row_ord     " )
		;

		SqlResultMap ret = data.selectForMap();
		for(SqlResultRow row:ret){
			if (Double.parseDouble( row.getParamText("cust_price") ) == 0) {
				row.setParameter("cust_price", row.getParameter("stad_sale_pri"));
			}
		}
		return ret ;
	}

	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice 주문명세서 출력
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
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.biz_addr_1   	as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  b.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  a.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  a.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  a.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  a.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  a.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  a.biz_addr_1   	as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  a.biz_addr_2   	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  a.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  a.biz_type  	as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, a.charge    		as charge 											") /* 배송료 */
			.query("	, a.qty 			as qty 												") /* 수량 */
			.query("	, a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
			.query("	, a.tax  			as tax 												") /* 세액 */
			.query("	, a.amount 			as amount 											") /* 계 */
			.query("	, c.npay_amt 		as npay_amt 											") /* 현미수 */
			.query("	, c.vaccount_no 	as vaccount 										") /* 입금정보 */
			.query("	, a.req_msg 		as user_memo  										") /* 요청메모 */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
		    .query(" 	, (select emp_nm from usr_mst where emp_id = a.inv_usr_id ) as inv_usr_nm ") /* 담당 */
			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */

			.query(" from order_mst a															")
			.query("	  join stor b on a.stor_id = b.stor_id								")
			.query("	  join cust_stor c on a.stor_id = c.stor_id 							")
			.query("     	                and a.cust_id = c.cust_id 							")
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
				.query("	,   (a.item_name||'/'||a.item_spec)      as item_name 							") /* 품목 + 규격 */
//				.query("	,   a.item_name       as item_name 												") /* 품목 */
//				.query("	,   a.item_spec       as item_spec 												") /* 규격 */
				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("	,   a.qty 			as qty 													") /* 수량 */
				.query("	,   a.price 		as price 												") /* 단가 */
				.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
				.query("	,   a.tax 			as tax 													") /* 세액 */
				.query("	,   a.amount 		as amount 												") /* 합계 */
				.query("  from  order_item a 															")
				.query("		join itm_mst b on a.item_idcd = b.item_idcd 								")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
				.query("order by line_seqn		 														")
				;
				info.get(0).put("product", data.selectForMap() );
		}
		return info ;
	}

	/**
	 * 마스터/디테일 객체를 넘긴다.-- picking 피킹리스트 출력
	 * @param model
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPicking(HttpRequestArgument arg) throws Exception{

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력

			.query("select h1.inv_no , h1.inv_dt , h1.send_biz_nm    , h1.send_biz_owner , h1.send_biz_tel_no , h1.send_biz_tel_hp  ")
			.query("	,  h1.send_biz_addr_1     , h1.send_biz_addr_2 																")
//			.query("	,  h1.recv_biz_nm    , h1.recv_biz_owner  , h1.recv_biz_tel_no  											")
//			.query("	,  h1.recv_biz_tel_hp    , h1.recv_biz_addr_1 , h1.recv_biz_addr_2 , h1.biz_no 		  , h1.biz_owner 		")
			.query("	,  isnull(h1.recv_biz_nm, h1.send_biz_nm) as recv_biz_nm    , isnull(h1.recv_biz_owner, h1.send_biz_owner) as recv_biz_owner ")
			.query("	,  isnull(h1.recv_biz_tel_no, h1.send_biz_tel_no) as recv_biz_tel_no , isnull(h1.recv_biz_tel_hp, h1.send_biz_tel_hp) as  recv_biz_tel_hp ")
			.query("	,  isnull(h1.recv_biz_addr_1, h1.send_biz_addr_1) as recv_biz_addr_1   , isnull(h1.recv_biz_addr_2, h1.send_biz_addr_2) as recv_biz_addr_2 ")
			.query("	,  h1.biz_no 		  , h1.biz_owner 																		")
			.query("	,  h1.biz_type  		 , h1.biz_type 	 , h1.biz_nm 		 , h1.biz_addr 		  , h1.cls4_nm			")
			.query("	,  h1.inv_work_id 		 , h1.req_msg  		 , h1.user_memo        , h1.salesman_nm   , h1.stamp_url		")
			.query("	, (case when h1.sts_cd = '0100' then '입금대기' 																")
			.query("			when h1.sts_cd = '0200' then '배송대기' 																")
			.query("			when h1.sts_cd = '0300' then '포장처리' 																")
			.query("			when h1.sts_cd = '0400' then '부분배송' 																")
			.query("			when h1.sts_cd = '0500' then '배송처리' 																")
			.query("			when h1.sts_cd = '0600' then '배송완료' 																")
			.query("		end ) 			as sts_cd 							 													") /* 배송상태 */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 													") /* 발행일자 */
			.query("	, h1.item_qty, h1.qty, h1.amount													") /* 발행일자 */
			.query(" from (				 																							")
			.query("		select 															")
		//	.query("       			(select bas_nm from base_mst where bas_id = t1.pack_zone_id) as pack_zone_nm ")
		//	.query("  		 	,  t1.pack_no  			as pack_no 							") /* 피킹번호 (바코드) */
			.query("    		   t1.inv_no  			as inv_no 							") /* 주문번호 (바코드) */
			.query("    		,  t1.inv_dt   			as inv_dt 							") /* 주문일자           */

			.query("    		,  t2.biz_nm   			as send_biz_nm 						") /* 주문자 회사명   */
			.query("    		,  t2.biz_owner 		as send_biz_owner 					") /* 주문자 명       */
			.query("    		,  t2.biz_tel_no 		as send_biz_tel_no		 			") /* 주문자 전화번호 */
			.query("    		,  t3.hp_no   			as send_biz_tel_hp 					") /* 주문자 휴대폰   */
			.query("    		,  t2.biz_addr_1  		as send_biz_addr_1 					") /* 주문자 주소   	*/
			.query("    		,  t2.biz_addr_2  		as send_biz_addr_2 					") /* 주문자 상세주소 */

//			.query("    		,  t3.mmb_nm     		as recv_biz_nm 						") /* 수령자 부서명 	*/
			.query("    		,  '' 		    		as recv_biz_nm 						") /* 수령자 부서명 	*/
			.query("    		,  t2.reve_nm     		as recv_biz_owner 		 			") /* 수령자 명 		*/
			.query("    		,  t2.reve_tel_no 		as recv_biz_tel_no 					") /* 수령자 전화번호 */
			.query("    		,  t2.reve_hp_no 		as recv_biz_tel_hp 					") /* 수령자 휴대폰 	*/
			.query("    		,  t2.reve_addr_1  		as recv_biz_addr_1 					") /* 수령자 주소		*/
			.query("    		,  t2.reve_addr_2  		as recv_biz_addr_2 					") /* 수령자 상세주소 */

			.query("    		,  t4.biz_no      		as biz_no 							") /* 회사정보 등록번호	*/
			.query("    		,  t4.biz_owner   		as biz_owner 						") /* 회사정보 대표자명	*/
			.query("    		,  t4.biz_type    		as biz_type 						") /* 회사정보 업태		*/
			.query("    		,  t4.biz_type   		as biz_type 						") /* 회사정보 업종		*/
			.query("    		,  t4.biz_nm      		as biz_nm 							") /* 회사정보 회사명 	*/
			.query("    		,  t4.biz_addr_1||' '||t4.biz_addr_2 		as biz_addr 		") /* 회사정보 주소 		*/
			.query("    		,  (select emp_nm from usr_mst 							")
			.query("    		     where stor_grp = t2.stor_grp 							")
			.query("    		       and emp_id = t2.salesman_id) 	as salesman_nm 		") /* 회사정보 담당자	 	*/

			.query("    		,  t2.req_msg     		as req_msg 							") /* 요청메모 			*/
			.query("    		,  (case when t2.inv_work_id = 1 then '판매관리' 			")
			.query("    		         when t2.inv_work_id = 2 then '판매포스' 			")
			.query("    		         when t2.inv_work_id = 3 then '쇼핑몰' 				")
			.query("    		         when t2.inv_work_id = 4 then '기업몰' 				")
			.query("     		         when t2.inv_work_id = 5 then '수발주' 				")
			.query("     		         when t2.inv_work_id = 'A' then '오픈마켓' 			")
			.query("     		         when t2.inv_work_id = 'B' then '기업마켓' 			")
			.query("    		         end ) 			as inv_work_id 						") /* 주문위치 			*/

			.query("    		, min(t1.sts_cd) 		as sts_cd 							") /* 주문상태 */
			.query("    		, sum((select count(item_idcd) from order_item where pack_no = t1.pack_no)) as item_qty ") /* 상품수량 */
			.query("    		, sum(isnull(t1.qty,0))    as qty 								") /* 합계수량 */
			.query("    		, sum(isnull(t1.amount,0)) as amount 							") /* 합계 */
			.query("    		, t2.user_memo  		as user_memo 						") /* 메모사항 */
			.query("            , t5.stamp_url as stamp_url									") /* 직인 이미지 URL */
			.query("            , (select bas_nm from base_mst where bas_id = t6.clss_4) as cls4_nm ")

			.query("  		from order_pack t1 												")
			.query("  		     join order_mst t2 on t1.inv_no = t2.inv_no 				")
			.query("  		     join cust_memb  t3 on t2.cust_id = t3.cust_id 				")
			.query("    		                   and t2.mmb_id = t3.mmb_id 				")
			.query("    		 join cust_mst  t4 on t2.cust_id = t4.cust_id 				")
			.query("    		 join stor      t5 on t1.stor_id = t5.stor_id 			")
			.query("    		 join cust_stor t6 on t2.stor_id = t6.stor_id and t2.cust_id = t6.cust_id ")
			.query(" 		where t1.inv_no   = :inv_no 	" 	, arg.fixParameter("inv_no" ))
		//	.query(" 		where t1.pack_no   = :pack_no 	" 	, pack_no 					 ) // row.fixParameter("pack_no" )
			.query("   		and t1.pack_gb  = '0'		 									")
			.query(" 	group by t1.inv_no  , t1.inv_dt , t2.biz_nm , t2.biz_owner , t2.biz_tel_no, t3.hp_no 	")
			.query(" 		  ,  t2.biz_addr_1 , t2.biz_addr_2 , t3.mmb_nm  , t2.reve_nm  , t2.reve_tel_no 		")
			.query(" 		  ,  t2.reve_hp_no , t2.reve_addr_1 , t2.reve_addr_2 , t4.biz_no , t4.biz_owner 		")
			.query(" 		  ,  t4.biz_type  , t4.biz_type ,  t4.biz_nm ,  t4.biz_addr_1, t4.biz_addr_2 , t5.stamp_url	")
			.query(" 		  ,  t2.inv_work_id , t2.req_msg  ,  t2.user_memo , t2.stor_grp , t2.salesman_id , t6.clss_4	")
			.query(" 	) h1 																					")
			;

			SqlResultMap info = data.selectForMap();

			if (info.size() == 1) {
				data.clear();
				data.param // 쿼리문  입력
					.query("select 																			")
					.query(" 		a.seq_dsp   	as seq_dsp 												") /* 항번 		*/
					.query(" 	,	c.sale_zone   	as sale_zone 											") /* 출고위치 	*/
					.query("	,   b.item_sc   	as item_sc 												") /* 단축코드 	*/
					.query("	,   a.item_code   	as item_code 												") /* 코드 		*/
					.query("	,   b.brcd_1   	as barcode 												") /* 바코드 	*/
					.query("	,   (a.item_name||'/'||a.item_spec) 		as item_name 							") /* 품목 + 규격	*/
//					.query("	,   a.item_name 		as item_name 												") /* 품목 		*/
//					.query("	,   a.item_spec 		as item_spec 												") /* 규격 		*/
					.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 		*/
					.query("	,   a.qty 			as qty 													") /* 수량 		*/
					.query("	,   a.price 		as price 												") /* 단가 		*/
					.query("	,   a.amount 		as amount 												") /* 합계 		*/
					.query("	,   (select emp_nm from usr_mst   										")
					.query("	      where stor_grp = a.stor_grp and emp_id = c.emp_id) emp_nm 			") /* 담당자		*/
					.query("  from  order_item a 															")
					.query("		join itm_mst  b on a.item_idcd  = b.item_idcd 							")
//					.query("		join itm_stor c on a.stor_id = c.stor_id 							")
					.query("		join itm_stor c on a.wrhs_id = c.stor_id 							") /* 출고지점의 출고위치 */
					.query("						 and a.item_idcd  = c.item_idcd 							")
//					.query(" where  a.pack_no = :pack_no 		" 	, 	pack_no								 )  // row.fixParameter("pack_no"      )
					.query(" where  a.inv_no  = :inv_no 	    " 	, 	arg.fixParameter("inv_no" 			)) // row.fixParameter("pack_no"      )
					.query("   and  a.pack_gb = 0	 														")
					.query("order by c.sale_zone, a.line_seqn		 											")
					;
					info.get(0).put("product", data.selectForMap() );

			}

		return info ;

	}

	/**
	 * 피킹리스트 출력여부 저장
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setPicking(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String[] list = arg.getParameter("inv_no", String[].class);

		for (String inv:list) {
			data.param
				.table("order_mst")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"     , inv)
	    		.update("picking_yn" , "1")
			;
			data.attach(Action.update);
		}

		data.execute();
		return null;
	}
}
