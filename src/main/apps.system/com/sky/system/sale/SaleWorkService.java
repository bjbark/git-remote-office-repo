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

@Service
public class SaleWorkService  extends DefaultServiceHandler {

	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		
		data.param // 쿼리문  입력
			.total("select count(1) as maxsize , sum(amount) as amount ")
			;
		data.param // 쿼리문  입력
			.query("select a.stor_grp    , a.stor_id	  , a.wrhs_id	 								")
			.query("     , (select stor_nm from store where stor_id = a.wrhs_id ) as wareh_nm 		")
			.query("     , a.inv_no      , a.inv_dt       , a.sts_cd  									")
			.query("     , a.cust_id     , b.cust_cd      , a.cust_nm      , a.cust_gb  , a.salesman_id   , inv_dept_id 	")
			.query("     , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id) as salesman_nm ")
			.query("     , a.amount ")
			.query("     , a.user_memo   , b.biz_fax_no        	")
			.query("     , b.cust_sts    , b.sts_memo 			")
			.query("     , b.biz_email as reve_email  , b.biz_fax_no as reve_fax_no 		")
			;
		data.param // 쿼리문  입력
			.where("from   sale_mst a           ")
			.where("       join cust_mst b on b.cust_id = a.cust_id ")
			.where("where  a.stor_id  = :stor_id   " , arg.fixParameter("stor_id" ) )
			.where("and    a.row_sts = 0           " )
			.where("and    a.inv_work_gb = '2'       " )
			.where("and    a.inv_dt between :fr_dt       " , arg.fixParameter("fr_dt" )) // 사작일자 
			.where("                    and :to_dt       " , arg.fixParameter("to_dt" )) // 종료일자 
			.where("and    a.cust_id     = :cust_id      " , arg.getParameter("cust_id" ))
			.where("and    a.inv_dept_id = :inv_dept_id  " , arg.getParameter("inv_dept_id" ))
			.where("and    a.salesman_id = :salesmanid   " , arg.getParameter("salesman_id" ))
			.where("and    a.sts_cd      = :sts_cd       " , arg.getParameter("sts_cd" ))
			.where("order by a.inv_no desc ")
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
	public SqlResultMap getCust(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
	
		data.param // 쿼리문  입력
			.query("select  a.stor_id   , b.owner_id  ")
	      	.query("    ,   b.cust_grp    , a.cust_id     , b.cust_cd     , b.cust_nm    , b.cust_gb    , b.cust_sts   , b.sts_memo  ")
	      	.query("    ,   b.biz_yn     , b.biz_no      , b.biz_nm      , b.biz_type   , b.biz_type  , a.salesman_id")
	      	.query("    ,   (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id) as salesman_nm  ")
	      	.query("    ,   b.biz_owner  , b.biz_email   , b.biz_tel_no  , b.biz_hp_no , b.biz_fax_no  ")
	      	.query("    ,   b.biz_tax_gb , b.colt_schd_type , b.colt_schd_term  ")
	      	.query("    ,   b.biz_zip_cd , b.biz_state   , b.biz_city    , b.biz_dong    , b.biz_addr_1 , b.biz_addr_2  ")
//	      	.query("    ,   b.price_no   , b.price_type  , b.price_rate  ")
	      	.query("    ,   decode(a.price_no, 0, b.price_no, a.price_no) as price_no , b.price_type  , b.price_rate  ")
	//        .query("    ,   b.point_grade , point_date_type , b.cash_point_rate , b.card_point_rate  ")
	      	.query("    ,   b.user_memo  , b.row_sts  ")
	      	.query("from   cust_stor a  ")
	      	.query("       join cust_mst b on a.cust_id = b.cust_id     ")
	      	.query("                       and a.stor_id = b.owner_id  ")
	      	.query("where a.stor_id = :stor_id  " , arg.fixParameter("stor_id"  ))
	      	.query("and   a.cust_id = :cust_id   " , arg.fixParameter("cust_id"  ))
	      	.query("and   a.row_sts < 2  ")
	      	.query("order by b.cust_nm  ")
		;
		return data.selectForMap();
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
			.query("select a.hq_id  , a.stor_grp   , a.stor_id     						")
			.query("     , a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp    		")
			.query("     , a.unit_idcd   , (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
			.query("     , a.unt_qty  , a.mst_itm_id    , a.mst_itm_cd 							")
			.query("     , a.item_idcd   , a.item_code    , a.item_name     , a.item_spec  			")
			.query("     , (select bas_nm from base_mst where bas_id = b.brand_id ) as brand_nm  ")
			.query("     , (select bas_nm from base_mst where bas_id = b.mfg_id ) as mfg_nm  	")
			.query("     , a.notax_yn  , a.qty        , a.price  							")
			.query("     , a.po_pri  , a.po_pri_type  , a.po_pri_rt        			")
			.query("     , a.tax_free  , a.taxation   , a.sply_amt    , a.tax       , a.amount     	")
			.query("     , a.user_memo , a.row_sts 										")
			.query("from   sale_dtl a														")
			.query("	   join itm_mst b on a.item_idcd = b.item_idcd						")
			.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no" 					))
			.query("and    a.row_sts = 0           										")
			.query("order by   a.line_seqn                                                    ")
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
		data.param // 쿼리문  입력
			.query("select a.hq_id     ,  a.stor_grp  , a.stor_id    , a.wrhs_id	                              ") //a.corp_id     , 
			.query("     , (select stor_nm from store p where p.stor_id = a.stor_id ) as stor_nm                  ")
			.query("     , (select stor_nm from store p where p.stor_id = a.wrhs_id ) as wareh_nm                  ")
			.query("     , a.pos_no       , a.inv_no      ,  a.inv_dt    , a.inv_tm      , a.inv_work_gb              ")
			.query("     , a.sts_cd                                                                                   ")
			.query("     , a.inv_dept_id  , (select dept_nm from dept_mst where stor_grp = a.stor_grp and stor_id = a.inv_dept_id ) as inv_dept_nm")
			.query("     , a.salesman_id  , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id ) as salesman_nm")
			.query("     , a.cust_id      , a.cust_nm     , a.cust_gb                                                 ")
			.query("     , a.mmb_id      , a.mmb_nm                                                                 ")
			.query("     , a.tax_type     , a.tax_rt                                                                ") // a.price_no
			.query("     , a.tax_free     , a.taxation    , a.sply_amt   , a.tax         , a.amount                   ")

	      	.query("     , a.biz_no       , a.biz_nm      , a.biz_type   , a.biz_type                                ")
	      	.query("     , a.biz_owner    , a.biz_email   , a.biz_tel_no , a.biz_fax_no               				  ") // , a.biz_hp_no  
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
	      	.query("     , c.biz_tax_gb   , c.colt_schd_type , c.colt_schd_term , b.user_memo as cust_usr_memo             ")
	      	.query("     , c.price_type  , c.price_rate                                              				  ")
			.query("     , case when b.price_no = 0 then c.price_no else b.price_no end as price_no           		  ")
		    .query("     , b.npay_amt      , b.balance_limit  , b.limit_control , (b.balance_limit - b.npay_amt) as balance_amount ")
	      	
			.query("     , a.user_memo    ,  a.row_clos  ,  a.row_sts                                              ")
			.query("     , c.cust_sts     , c.sts_memo                                                                ")
			.query("      ,a.sales_id        ")
			.query("      ,a.ret_yn          ")
			.query("      ,a.inv_work_id     ")
			.query("      ,a.pay_dt          ")
			.query("      ,a.ori_no          ")
			.query("      ,a.cust_grp         ")
			.query("      ,a.item_point      ")
			.query("      ,a.item_halin      ")
			.query("      ,a.charge          ")
			.query("      ,a.payable         ")
			.query("      ,a.payment         ")
			.query("      ,a.npay_amt         ")
			.query("      ,a.qty             ")
			.query("      ,a.org_ord_qty        ")
			.query("      ,a.ship_qty        ")
			.query("      ,a.point_rate_type ")
			.query("      ,a.cash_point_rate ")
			.query("      ,a.card_point_rate ")
			.query("      ,a.add_point       ")
			.query("      ,a.use_point       ")
			.query("      ,a.req_msg         ")
			.query("      ,a.recv_addr3      ")
			.query("      ,a.hdli_id      ")
			.query("      ,a.hdli_no      ")
			.query("      ,a.inv_prt_cnt   ")
			.query("      ,a.ctrl_id        ")
			.query("      ,a.mro_no          ")
			.query("      ,a.mro_id          ")
			.query("from   sale_mst a                                                                                ")
			.query("       join cust_stor b on a.stor_id = b.stor_id                                               ")
			.query("                        and a.cust_id  = b.cust_id                                                ")
			.query("       join cust_mst  c on a.cust_id  = c.cust_id                                               ")
			.query("where  a.inv_no =:inv_no " 			, arg.fixParameter("inv_no"                                  ) )
			.query("and    a.row_sts = 0                                                                           " )
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param // 쿼리문  입력
				.query("select a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp                  ")
//				.query("       a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp                  ")
				.query("     , a.mst_itm_id   , a.mst_itm_cd    , a.unt_qty    , b.brcd_1 as barcode      ")
				.query("     , a.unit_idcd   , (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
				.query("     , a.item_idcd   , a.item_code    , a.item_name     , a.item_spec                  ")
				.query("     , (select bas_nm from base_mst where bas_id = b.brand_id ) as brand_nm ")
				.query("     , (select bas_nm from base_mst where bas_id = b.mfg_id ) as mfg_nm  ")
				.query("     , a.notax_yn  , a.cust_price , a.cust_halin  , a.unit_price  , a.item_halin   ")
				.query("     , a.qty       , a.price                                                   ")
				.query("     , a.tax_free  , a.taxation   , a.sply_amt    , a.tax       , a.amount     ")
				.query("     , a.po_pri  , a.po_pri_type , a.po_pri_rt                         ")
				.query("     , a.user_memo , a.row_sts                                               ")
				.query("      ,a.ori_no     ")
				.query("      ,a.ori_seq    ")
				.query("      ,a.unit_point ")
				.query("      ,a.point_rate ")
				.query("      ,a.item_point ")
				.query("      ,a.org_ord_qty   ")
				.query("      ,a.ret_yn     ")
				.query("      ,a.mro_no     ")
				.query("      ,a.mro_seq    ")
				.query("from   sale_dtl a                                                             ")
				.query("	   join itm_mst b on a.item_idcd = b.item_idcd							   ")
				.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no"                         ))
				.query("and    a.row_sts = 0                                                         ")
				.query("order by   a.line_seqn                                                           ")
			;
			info.get(0).put("product", data.selectForMap() );
		    return info ;
		} else {

		}
	    return info ;
	}

	
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {
		//String inv_no = arg.fixParamText("inv_no" ) ; 
		//System.out.println("dddddddddddddddddddddddddddddddddddddddddddd" + inv_no );
		
		DataMessage temp = arg.newStorage("POS");
		
		temp.param
		 	.query("select sts_cd from sale_mst where inv_no = :inv_no " , arg.fixParameter("inv_no"    ))
		 	
		;
		SqlResultRow del = temp.selectForRow();
		
		String work_stscd = arg.getParamText("sts_cd").toString() ;  /* 로컬 주문 상태 */
		String server_stscd = del.getParamText("sts_cd").toString() ; /* 서버 주문 상태 */
		
		DataMessage data = arg.newStorage("POS");
		
		if (del != null ) {
//			System.out.println("null");
			if ( work_stscd.equals(server_stscd)  ){ /* 로컬과 서버의 주문상태가 동일할 경우 */
			} else {
				throw new ServiceException("정상적인 삭제작업이 아닙니다. 주문상태 불일치" );
			}
		}
		 	 
		
		if ( "0500".equals(work_stscd )  ){ /* 견적상태가 0100인 경우만 허용. 재확인 */
		
			//System.out.println("sssssssssssssssssss");
			
			
        	data.param
	    		.table("sale_dtl")
	    		.where("where  inv_no  		= :inv_no   	" )
	    		//
	    		.unique("inv_no"      , arg.fixParameter("inv_no"))
	    		.update("row_sts"   , 2 					)
				.update("upt_nm"   , arg.getParameter("upt_nm"))
				.update("upt_ip"   , arg.remoteAddress)
				.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    		;data.attach(Action.update );  

			/* 정보  삭제 */
	    	data.param
				.table("sale_mst")
				.where("where  inv_no  		= :inv_no   	" )
				//
				.unique("inv_no"      , arg.fixParameter("inv_no"))
	    		.update("row_sts"   , 2 					)
				.update("upt_nm"   , arg.getParameter("upt_nm"))
				.update("upt_ip"   , arg.remoteAddress)
				.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
    		;data.attach(Action.update );  

			// 재고(입출고 대장) 삭제
	        data.param
        		.table("stock_ledger")
        		.where("where inv_no = :inv_no ")
        		//
        		.unique("inv_no"   , arg.fixParameter("inv_no"))
	    	;data.attach(Action.delete);
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

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
        	
			if (rowaction == Action.delete) {

				throw new ServiceException("삭제불가" );
				
			} else { 
				{
		        	data.param
			        	.table("sale_mst")
			        	.where("where inv_no  = :inv_no   " )
			        	//
			        	.unique("corp_id"         , row.fixParameter("corp_id"     ))
			        	.unique("hq_id"         , row.fixParameter("hq_id"     ))
			        	.unique("stor_grp"         , row.fixParameter("stor_grp"     ))
			        	.unique("stor_id"         , row.fixParameter("stor_id"     ))
			        	.update("wrhs_id"         , row.fixParameter("wrhs_id"     ))
			        	.unique("inv_no"           , row.fixParameter("inv_no"       ))
			        	.unique("pos_no"           , row.getParameter("pos_no"       ))
			        	.update("inv_dt"           , row.fixParameter("inv_dt"       ))
			        	.insert("inv_tm"           , row.fixParameter("inv_tm"       ))
			        	.insert("inv_work_gb"      , row.getParameter("inv_work_gb"  ))
			        	.update("inv_dept_id"      , row.getParameter("inv_dept_id"  ))
			        	.update("inv_usr_id"      , row.getParameter("inv_usr_id"  ))
			        	.update("salesman_id"      , row.getParameter("salesman_id"  ))
						.update("sts_cd"           , row.getParameter("sts_cd"       ))
						.insert("cust_id"          , row.getParameter("cust_id"      ))
						.insert("cust_nm"          , row.getParameter("cust_nm"      ))
						.insert("cust_gb"          , row.getParameter("cust_gb"      ))
						.insert("mmb_id"          , row.getParameter("mmb_id"      ))
						.insert("mmb_nm"          , row.getParameter("mmb_nm"      ))
						.insert("price_no"         , row.fixParameter("price_no"     ))
						.insert("tax_type"         , row.fixParameter("tax_type"     ))
						.insert("tax_rt"         , row.fixParameter("tax_rt"     ))
						.update("tax_free"         , row.getParameter("tax_free"     ))
						.update("taxation"         , row.getParameter("taxation"     ))
						.update("sply_amt"         , row.getParameter("sply_amt"     ))
						.update("tax"              , row.getParameter("tax"          ))
						.update("amount"           , row.getParameter("amount"       ))
						
						.update("biz_no"           , row.getParameter("biz_no"       ))
						.update("biz_nm"           , row.getParameter("biz_nm"       ))
						.update("biz_type"         , row.getParameter("biz_type"     ))
						.update("biz_type"        , row.getParameter("biz_type"    ))
						.update("biz_owner"        , row.getParameter("biz_owner"    ))
						.update("biz_state"        , row.getParameter("biz_state"    ))
						.update("biz_city"         , row.getParameter("biz_city"     ))
						.update("biz_dong"         , row.getParameter("biz_dong"     ))
						.update("biz_zip_cd"       , row.getParameter("biz_zip_cd"   ))
						.update("biz_addr_1"        , row.getParameter("biz_addr_1"    ))
						.update("biz_addr_2"        , row.getParameter("biz_addr_2"    ))
						.update("biz_email"        , row.getParameter("biz_email"    ))
						.update("biz_tel_no"       , row.getParameter("biz_tel_no"   ))
						.update("biz_fax_no"       , row.getParameter("biz_fax_no"   ))
						
						.update("reve_nm"          , row.getParameter("reve_nm"      ))
						.update("reve_zip_cd"      , row.getParameter("reve_zip_cd"  ))
						.update("reve_state"       , row.getParameter("reve_state"   ))
						.update("reve_city"        , row.getParameter("reve_city"    ))
						.update("reve_dong"        , row.getParameter("reve_dong"    ))
						.update("reve_addr_1"       , row.getParameter("reve_addr_1"   ))
						.update("reve_addr_2"       , row.getParameter("reve_addr_2"   ))
						.update("reve_email"       , row.getParameter("reve_email"   ))
						.update("reve_hp_no"      , row.getParameter("reve_hp_no"  ))
						.update("reve_tel_no"      , row.getParameter("reve_tel_no"  ))
						.update("reve_fax_no"      , row.getParameter("reve_fax_no"  ))
						
						.update("user_memo"        , row.getParameter("user_memo"    ))
						.update("row_clos"        , row.getParameter("row_clos"    ))
						
						.update("upt_nm"        , row.getParameter("upt_nm"    ))
						.update("upt_ip"   	   , arg.remoteAddress				  )
						.update("upt_dttm"        , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.insert("crt_nm" 	   , row.getParameter("crt_nm"	 ))
						.insert("crt_ip"   	   , arg.remoteAddress				  )
						.insert("crt_dttm"        , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						
						.update("inv_nm"         	, row.getParameter("inv_nm"     		))
						.insert("ret_yn"         	, row.getParameter("ret_yn"     		))
						.insert("inv_work_id"       , row.getParameter("inv_work_id"     	))
						.insert("pack_no"         	, row.getParameter("pack_no"     		))
						.insert("pack_gb"         	, row.getParameter("pack_gb"     		))
						.insert("pack_vend_id"      , row.getParameter("pack_vend_id"     	))
						.insert("pack_zone_id"      , row.getParameter("pack_zone_id"     	))
						.update("pay_dt"         	, row.getParameter("pay_dt"     		))
						.insert("ori_no"         	, row.getParameter("ori_no"     		))
						.update("tax_yn"         	, row.getParameter("tax_yn"     		))
						.update("tax_no"         	, row.getParameter("tax_no"     		))
						.update("tax_dt"         	, row.getParameter("tax_dt"     		))
						.update("tax_amount"        , row.getParameter("tax_amount"     	))
						.insert("cust_grp"         	, row.getParameter("cust_grp"     		))
						.update("item_point"        , row.getParameter("item_point"     	))
						.update("item_halin"        , row.getParameter("item_halin"     	))
						.update("recv_addr3"        , row.getParameter("recv_addr3"     	))
						.update("hdli_id"        , row.getParameter("hdli_id"     	))
						.update("hdli_no"        , row.getParameter("hdli_no"     	))
						.update("inv_prt_cnt"     , row.getParameter("inv_prt_cnt"     	))
						.insert("sales_id"         	, row.getParameter("sales_id"     		))
						.update("biz_hp_no"        , row.getParameter("biz_hp_no"         ))
						.update("ctrl_id"         	, row.getParameter("ctrl_id"     		)) /* 계약 ID - 쇼핑몰 주문 */
						.insert("mro_id"         	, row.getParameter("mro_id"     		))
						.insert("mro_no"         	, row.getParameter("mro_no"     		))
						
						.update("charge"         	, row.getParameter("charge"     		))
						.update("payable"         	, row.getParameter("payable"     		))
						.update("payment"         	, row.getParameter("payment"     		))
						.update("npay_amt"         	, row.getParameter("payable"     		))
						.update("discount"         	, row.getParameter("discount"     		))
						.update("app_cash"         	, row.getParameter("app_cash"     		))
						.update("app_card"         	, row.getParameter("app_card"     		))
						.update("qty"         		, row.getParameter("qty"     			))
						.insert("org_ord_qty"         	, row.getParameter("qty"     		    ))
						.insert("ship_qty"         	, row.getParameter("ship_qty"     		))
						.update("point_rate_type"	, row.getParameter("point_rate_type"	))
						.update("cash_point_rate"	, row.getParameter("cash_point_rate"	))
						.update("card_point_rate"	, row.getParameter("card_point_rate"	))
						.update("add_point"         , row.getParameter("add_point"     		))
						.update("use_point"         , row.getParameter("use_point"     		))
						.update("req_msg"         	, row.getParameter("req_msg"     		))
						
						.action = rowaction ;
		        	;data.attach();
	
		        	if(row.getParameter("product", SqlResultMap.class) != null){
		        		setProduct(arg , data , row, row.getParameter("product", SqlResultMap.class) );
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
	public SqlResultMap setProduct(HttpRequestArgument arg, DataMessage data, SqlResultRow inv, SqlResultMap map ) throws Exception {

//		Date day =  new Date();
//		SimpleDateFormat x = new SimpleDateFormat("yyyymmdd");
//		String today =  x.format(day);

		for(SqlResultRow row:map){
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			double work_qty = Double.parseDouble(row.getParamText("qty")) ;
			double unt_qty = Double.parseDouble(row.getParamText("unt_qty")) ;
			double po_pri = Double.parseDouble(row.getParamText("po_pri")) ;

//			Action rowaction = Action.update;
			if (rowaction == Action.delete) {
				
				/* 상세 삭제 */
	        	data.param
	        		.table("sale_dtl")
	        		.where("where  inv_no  		= :inv_no   	   " )
	        		.where("and    line_seqn 		= :line_seqn   	   " )
	        		//
	        		.unique("inv_no"   , row.fixParameter("inv_no"  ))
	        		.unique("line_seqn"  , row.fixParameter("line_seqn" ))
	        		.action = rowaction 
	        	; data.attach();  
	        	
			} else {
	        	data.param
		        	.table("sale_dtl")
		        	.where("where  inv_no  		= :inv_no   	" )
		        	.where("and    line_seqn  	= :line_seqn   	" )
		        	//
		        	.unique("hq_id"          , row.fixParameter("hq_id"       ))
		        	.unique("stor_grp"          , row.fixParameter("stor_grp"       ))
		        	.unique("stor_id"          , row.fixParameter("stor_id"       ))
					.unique("inv_no"            , row.fixParameter("inv_no"         ))
					.unique("line_seqn"           , row.fixParameter("line_seqn"        ))
					.unique("seq_top"           , row.fixParameter("seq_top"        ))
					.update("seq_dsp"           , row.getParameter("seq_dsp"        ))
					.unique("mst_itm_id"           , row.fixParameter("mst_itm_id"        ))
					.unique("mst_itm_cd"           , row.fixParameter("mst_itm_cd"        ))
					.unique("unit_idcd"           , row.fixParameter("unit_idcd"        ))
					.unique("unt_qty"          , row.fixParameter("unt_qty"       ))
					.update("item_idcd"           , row.fixParameter("item_idcd"        ))
					.update("item_code"           , row.fixParameter("item_code"        ))
					.update("item_name"           , row.getParameter("item_name"        ))
					.update("item_spec"           , row.getParameter("item_spec"        ))
					.insert("notax_yn"          , row.fixParameter("notax_yn"       ))
					.update("cust_price"        , row.fixParameter("cust_price"     ))
					.update("cust_halin"        , row.fixParameter("cust_halin"     ))
					.update("unit_price"        , row.fixParameter("unit_price"     ))
					.update("item_halin"        , row.fixParameter("item_halin"     ))
					.update("price"             , row.fixParameter("price"          ))
					.update("qty"               , row.fixParameter("qty"            ))
					.update("tax_free"          , row.fixParameter("tax_free"       ))
					.update("taxation"          , row.fixParameter("taxation"       ))
					.update("sply_amt"          , row.fixParameter("sply_amt"       ))
					.update("tax"               , row.fixParameter("tax"            ))
					.update("amount"            , row.fixParameter("amount"         ))
					.update("po_pri"          , row.fixParameter("po_pri"       ))
					.update("po_pri_type"     , row.fixParameter("po_pri_type"  ))
					.update("po_pri_rt"     , row.fixParameter("po_pri_rt"  ))
					.update("user_memo" 	    , row.getParameter("user_memo"		))
					.update("upt_nm" 		, row.getParameter("upt_nm"      ))
					.update("upt_ip"   		, arg.remoteAddress                  )
					.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_nm" 		, row.getParameter("crt_nm"      ))
					.insert("crt_ip"   		, arg.remoteAddress                  )
					.insert("crt_dttm"      	, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					
					.insert("ori_no"            , row.getParameter("ori_no"         ))
					.insert("ori_seq"           , row.getParameter("ori_seq"        ))
					.update("unit_point"        , row.fixParameter("unit_point"     ))
					.update("point_rate"        , row.fixParameter("point_rate"     ))
					.update("item_point"        , row.fixParameter("item_point"     ))
					.insert("org_ord_qty"          , row.getParameter("qty"            ))
					.insert("ret_yn"         	, row.getParameter("ret_yn"     	))
					.insert("mro_no"            , row.getParameter("mro_no"         ))
					.insert("mro_seq"           , row.getParameter("mro_seq"        ))
					
					.action = rowaction ;
	        	;data.attach();		
	        	

				// 재고(입출고 대장) 등록/수정 (출고지점)
				data.param
					.table("stock_ledger")
					.where("where inv_no = :inv_no ")
					.where("  and line_seqn = :line_seqn    ")
					//
					.insert("hq_id"   , row.getParameter("hq_id"   ))
					.update("stor_grp"   , row.getParameter("stor_grp"   ))
//					.update("stor_id"   , inv.getParameter("wrhs_id"   ))
					.update("stor_id"   , inv.getParameter("stor_id"   ))
					.unique("inv_no"     , inv.getParameter("inv_no"     ))
					.unique("line_seqn"    , row.getParameter("line_seqn"    ))
					.update("ori_no"     , row.getParameter("ori_no"     ))
					.update("ori_seq"    , row.getParameter("ori_seq"    ))
					.insert("inv_dt"     , inv.getParameter("inv_dt"     ))
					.insert("inv_gb"     , new SqlParamText("'1'"        )) // '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
					.insert("inv_wk"     , new SqlParamText("'2071301'"  )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
					.update("dept_id"    , inv.getParameter("inv_dept_id"))
					.update("emp_id"    , inv.getParameter("inv_usr_id"))
					.update("cust_id"    , inv.getParameter("cust_id"    )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
					.update("mmb_id"    , inv.getParameter("mmb_id"    )) // 매출인 경우만 맴버ID
					.update("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
					.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"    ))
					.update("unit_idcd"    , row.getParameter("unit_idcd"    ))
					.update("unt_qty"   , row.getParameter("unt_qty"   ))
					.update("item_idcd"    , row.getParameter("item_idcd"    ))
					.update("item_code"    , row.getParameter("item_code"    ))
//					.update("stock"      ,(work_qty * unt_qty) * -1      ) //  new SqlParamText(String.valueOf(Integer.parseInt(unt_qty) * Integer.parseInt(qty1) * -1))) // 이동출고는 마이너스
					.update("stock"      , work_qty  * -1      			  ) //  new SqlParamText(String.valueOf(Integer.parseInt(unt_qty) * Integer.parseInt(qty1) * -1))) // 이동출고는 마이너스
					.update("eaqty"      , (work_qty * unt_qty) * -1	  ) // 환산 수량

					.update("notax_yn"   , row.getParameter("notax_yn"   ))
					.update("tax_type"   , inv.getParameter("tax_type"   ))
					.update("tax_rt"   , inv.getParameter("tax_rt"   ))
					.update("sply_amt"   , row.getParameter("sply_amt"   ))
					.update("tax"        , row.getParameter("tax"        ))

					.update("qty"        , row.getParameter("qty"        ))
					.update("price"      , row.getParameter("price"      ))
					.update("amount"     , row.getParameter("amount"     ))
					.update("po_pri"   , row.getParameter("po_pri"   )) // 매장간 거래는 매입단가 = 매입단가 
					.update("po_amount"  , ( po_pri * work_qty ) 		  ) // 매장간 거래는 매입금액 = 매입금액
					.update("user_memo"  , row.getParameter("user_memo"  ))
					.update("sys_memo"  , row.getParameter("sys_memo"  ))
					.update("row_ord"  , row.getParameter("row_ord"  ))
					.update("row_sts"  , row.getParameter("row_sts"  ))
					.update("upt_nm"  , row.getParameter("upt_nm"  ))
					.update("upt_ip"  , arg.remoteAddress              )
					.update("upt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_nm"  , row.getParameter("crt_nm"  ))
					.insert("crt_ip"  , arg.remoteAddress              )
					.insert("crt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("price_no"   , inv.getParameter("price_no"   )) // 거래처 단가 번호 [ 1~5 출하가/6:소비자가/7:포스가/8:B2C/9:구매가/10:직원가/11:B2B ]
					.update("unit_price" , row.getParameter("unit_price" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
					.update("cust_price" , row.getParameter("cust_price" )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
					.action = rowaction ;
				data.attach();
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
//		SqlResultMap ret = new SqlResultMap();
		
		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}
		Integer price_no = (int) Double.parseDouble( arg.fixParamText("price_no")) ;
		
		
//		for (SqlResultRow row:map) {
			data.clear();
			data.param // 쿼리문  입력  
				.query("select  a.stor_grp     , a.stor_id 									")
				.query("     ,  a.mst_itm_id      , b.mst_itm_cd  , b.unt_qty  	, b.brcd_1 as barcode	")
				.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
				.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_ds   , isnull(b.item_spec, '') as item_spec ")
				.query("     ,  b.cst_pri   , s.stock    , b.notax_yn , '1' as qty			")
				.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
				;

			switch (price_no) {
				case  1 : data.param.query(" , case when a.sale_pri_1 = 0 then b.sale_pri_1 else a.sale_pri_1 end as cust_price " ); break;// 출하가1
				case  2 : data.param.query(" , case when a.sale_pri_2 = 0 then b.sale_pri_2 else a.sale_pri_2 end as cust_price " ); break; // 출하가2
				case  3 : data.param.query(" , case when a.sale_pri_3 = 0 then b.sale_pri_3 else a.sale_pri_3 end as cust_price " ); break; // 출하가3 
				case  4 : data.param.query(" , case when a.sale_pri_4 = 0 then b.sale_pri_4 else a.sale_pri_4 end as cust_price " ); break; // 출하가4
				case  5 : data.param.query(" , case when a.sale_pri_5 = 0 then b.sale_pri_5 else a.sale_pri_5 end as cust_price " ); break; // 출하가5
				case  6 : data.param.query(" , b.cst_pri as cust_price " ); break; // 소비자가
				case  8 : data.param.query(" , b.b2c_pri  as cust_price " ); break; // 쇼핑몰가(B2C) 
				case  9 : data.param.query(" , case when a.po_pri = 0 then b.po_pri else a.po_pri end as cust_price " ); break; // 구매가 
				case 10 : data.param.query(" , a.usr_price as cust_price " ); break; // 직원가   
				case 11 : data.param.query(" , b.b2b_pri  as cust_price " ); break; // 기업몰가(B2B)   
				default : data.param.query(" , 0 as cust_price " ); break; // 7 포스가 
			}
			
			data.param
				.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
				.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
//				.query("     ,  b.pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.pack_vend_id ) as  pack_vend_nm  " ) 
				.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
				.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
				.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
//				.query("     ,  a.po_pri , a.po_pri_type, a.po_pri_rt   ")
				.query("     ,  case when a.po_pri = 0 then b.po_pri else a.po_pri end as po_pri ")
				.query("     ,  case when a.po_pri_type = 0 then b.po_pri_type else a.po_pri_type end as po_pri_type ")
				.query("     ,  case when a.po_pri_rt = 0 then b.po_pri_rt else a.po_pri_rt end as po_pri_rt ")
				.query("from    itm_stor      a                               ")
				.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
				.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
				.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
//				.query("and     a.item_idcd    = :item_idcd   " , row.getParameter("item_idcd"   ))
				.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
				.query("and     a.row_sts  = 0 " )
			;
		 	SqlResultMap ret = data.selectForMap();

			for(SqlResultRow row:ret){
				if (Double.parseDouble( row.getParamText("cust_price") ) == 0) {
					row.setParameter("cust_price", row.getParameter("stad_sale_pri"));
				}
			}
			return ret ;		 	
//			if (item != null) {
//				ret.add( item ); 
//			}
//		}
//		return ret ;
	}
}
