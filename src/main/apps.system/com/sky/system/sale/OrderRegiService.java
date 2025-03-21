package com.sky.system.sale;

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
public class OrderRegiService  extends DefaultServiceHandler {

//	private final Logger logger = LoggerFactory.getLogger(this.getClass());


	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getMaster(HttpRequestArgument arg) throws Exception {
		
		
//		String dt_gb = arg.getParamText("dt_gb" );
//		String fr_dt = arg.getParamText("fr_dt" );
//		String to_dt = arg.getParamText("to_dt" );
		
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.stor_id , b.cust_gb  , a.cust_id , b.cust_cd , b.cust_nm  , b.cust_grp , b.cust_sts ") // b.grop_id

			.query("   ,   c.mmb_id     , c.mmb_nm     ,  c.memb_gb     , c.login_id     , a.sales_gb  , b.cust_gb   ")
			
			.query("   ,   b.biz_no      , b.biz_nm      ,  b.biz_tel_no  , b.biz_hp_no   , b.biz_fax_no  , b.biz_email ")
			.query("   ,   b.biz_type    , b.biz_type   ,  b.biz_owner   , b.biz_tax_gb   , b.biz_gb    		")
			.query("   ,   b.biz_zip_cd  , b.biz_state   ,  b.biz_city    , b.biz_dong     , b.biz_addr_2 		")
			.query("   ,   b.colt_schd_type , b.colt_schd_term      ") // ,  a.acct_no , a.bank_nm      , a.acct_own_nm  
			
			.query("   ,   a.salesman_id , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id ) as salesman_nm  ")
			.query("   ,   a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm  ")
			.query("   ,   a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_2 ) as cls2_nm  ")
			.query("   ,   a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_3 ) as cls3_nm  ")
			.query("   ,   a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_4 ) as cls4_nm  ")
			.query("   ,   a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_5 ) as cls5_nm  ")
			.query("   ,   a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_6 ) as cls6_nm  ")
			.query("   ,   c.tel_no       , c.hp_no       , c.email        ")
			.query("   ,   a.npay_amt      , a.balance_limit  ,  a.limit_control       ") // , (a.balance_limit - a.npay_amt) as balance_amount
			.query("   ,   case when a.price_no = 0 then b.price_no else a.price_no end as price_no           ")
			.query("   ,   a.user_memo   , a.row_sts         ")
			.query("from   cust_stor    a ")
			.query("       inner join cust_mst  b on a.cust_id = b.cust_id  ")
			.query("       inner join cust_memb  c on a.cust_id = c.cust_id  ")
			.query("where  a.stor_id  =  :stor_id    " , arg.fixParameter("stor_id"  ))
			.query("and    c.mmb_id   =  :mmb_id     " , arg.fixParameter("mmb_id"   ))
			.query("and    a.row_sts = 0           " )
		 ;		
		
	    return data.selectForMap();
	}

	
	/**
	 * 상품검색 cust_price
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
			
		switch (price_no) {
			case  1 : data.param.query(" , case when a.sale_pri_1 = 0 then b.sale_pri_1 else a.sale_pri_1 end as cust_price " ); break;// 출하가1
			case  2 : data.param.query(" , case when a.sale_pri_2 = 0 then b.sale_pri_2 else a.sale_pri_2 end as cust_price " ); break; // 출하가2
			case  3 : data.param.query(" , case when a.sale_pri_3 = 0 then b.sale_pri_3 else a.sale_pri_3 end as cust_price " ); break; // 출하가3 
			case  4 : data.param.query(" , case when a.sale_pri_4 = 0 then b.sale_pri_4 else a.sale_pri_4 end as cust_price " ); break; // 출하가4
			case  5 : data.param.query(" , case when a.sale_pri_5 = 0 then b.sale_pri_5 else a.sale_pri_5 end as cust_price " ); break; // 출하가5
			case  6 : data.param.query(" , b.cst_pri as cust_price " ); break; // 소비자가
			case  8 : data.param.query(" , b.b2c_pri  as cust_price " ); break; // 쇼핑몰가(B2C) 
			case  9 : data.param.query(" , case when a.po_pri = 0 then b.po_pri else a.po_pri end  as cust_price " ); break; // 구매가 
			case 10 : data.param.query(" , a.usr_price as cust_price " ); break; // 직원가   
			case 11 : data.param.query(" , b.b2b_pri  as cust_price " ); break; // 기업몰가(B2B)   
			default : data.param.query(" , 0 as cust_price " ); break; // 7 포스가 
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
			.query("and     a.row_sts  = 0 " )
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
//					.update("biz_hp_no"       , inv.getParameter("biz_hp_no"   ))
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
	        	;data.attach(Action.insert);
	        	
	        	
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
		    					.query("	)                                                    " )
		    					.query(" where a.pack_no = :pack_no  ", pkg.fixParameter("pack_no" ))
		    					.query(" and   a.inv_no  = :inv_no   ", pkg.fixParameter("inv_no"  ))
		    					.action = Action.direct;
		    				data.attach();		
	        			}
	        			if ((pkgaction != Action.delete) && "1".equals(pkg.getParamText("pack_gb"  )) && !"".equals( pkg.getParamText("pack_vend_id"   ))) {
		    				// 발주요청 정보 입고수량 변경
		    				data.param
		    					.query("update  po_order  t                                                ")
		    					.query("   set( t.sply_amt, t.tax, t.amount, t.qty, t.rest_qty , t.tax_free, t.taxation ")
		    					.query("  ) = ( select isnull(sum(s.sply_amt) , 0),                           ")
		    					.query("		       isnull(sum(s.tax)      , 0),                           ")
		    					.query("	           isnull(sum(s.amount)   , 0),                           ")
		    					.query("		       isnull(sum(abs(s.qty )), 0),                           ")
		    					.query("		       isnull(sum(abs(s.rest_qty )), 0),                           ")
		    					.query("		       isnull(sum(s.tax_free) , 0),                           ")
		    					.query("		       isnull(sum(s.taxation) , 0)                            ")
		    					.query("        from po_order_item s                                       ")
		    					.query("        where s.inv_no = t.inv_no)                                 ")
		    					.query(" where t.inv_no = :inv_no  ", pkg.fixParameter("pack_no"           ))
		    					.action = Action.direct;
		    				data.attach();
	        			}
	        		}
	        		
	        		
	        		
	        		/* 주문 정보를 업데이트 한다. */
        			double work_ori = Double.parseDouble(inv.getParamText("_qty")) ;
        			double work_qty = Double.parseDouble(inv.getParamText("qty")) ;
	        		if (rowaction == Action.update && work_ori != work_qty ) {
	        		 	// 발주요청 출고수량 변경
	    				data.param
	    					.query(" update order_mst a                                          ")
	    					.query(" set (a.rest_qty, a.sts_cd) = (                               ")
	    					.query("	  select sum(b.rest_qty)                                  ")
	    					.query("	       , case when a.sts_cd < '0200' then a.sts_cd        ") // 승인전 상태라면 이전 상태를 유지  
	    					.query("	         else                                             ") 
	    					.query("	              case when sum(b.rest_qty)   = 0 then '0500' ") // 배송완료 
	    					.query("                       when a.qty=sum(b.rest_qty) then '0200' ") // 배송대기   
	    					.query("	                   else '0400'                            ") // 부분배송  
	    					.query("	              end                                         ")   
                            .query("	         end                                              ")
	    					.query("	  from  order_pack b                                      ")
	    					.query("	  where b.inv_no  = a.inv_no                              ")
	    					.query("	)                                                         ")
	    					.query(" where a.inv_no  = :inv_no   ", inv.fixParameter("inv_no"     ))
	    					.action = Action.direct;
	    				data.attach();			        		
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
					.unique("inv_no"            , inv.fixParameter("inv_no"         ))
					.update("inv_dt"            , row.fixParameter("inv_dt"         ))
					.unique("inv_gb"            , row.fixParameter("inv_gb"         ))

		        	.insert("sts_cd"            , row.getParameter("sts_cd"  ) , ( rowaction == Action.insert ))
					//.update("sts_cd"          , new SqlParamText("case when ship_qty = 0 then '0200' when :qty != ship_qty then '0400' else '0500' end " ) ,( rowaction == Action.update ))
					
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
		        	data.param
		        		.table("po_order")
		        		.where("where  inv_no = :inv_no	" )
		        		//
		        		.unique("corp_id"          , inv.fixParameter("corp_id"       ))
		        		.unique("hq_id"          , inv.fixParameter("hq_id"       ))
		        		.unique("stor_grp"          , inv.fixParameter("stor_grp"       ))
		        		.unique("stor_id"          , inv.fixParameter("stor_id"       ))
		        		.update("wrhs_id"          , inv.fixParameter("wrhs_id"       ))

		        		// <!-->
		        		.unique("pack_inv"          , inv.fixParameter("inv_no"         ))
		        		.unique("inv_no"            , row.fixParameter("pack_no"        ))
		        		.unique("pack_no"           , row.fixParameter("pack_no"        ))
		        		.update("inv_dt"            , row.fixParameter("inv_dt"         ))
		        		.unique("inv_gb"            , "3" ) // 직납 발주로 셋팅 
		        		.insert("vend_id"           , row.getParameter("pack_vend_id"   ))
		        		.insert("vend_nm"           , row.getParameter("pack_vend_nm"   ))
		        		.unique("vend_gb"           , "2" ) // 직납으로 셋팅 
		        		// <!-->
		        		
			        	.unique("pos_no"         	, inv.fixParameter("pos_no"     		))
						.update("inv_tm"         	, inv.fixParameter("inv_tm"     		)) //new SqlParamText("to_char(sysdate, 'hh24mi')"))

//						.insert("inv_work_id"       , row.getParameter("inv_work_id"     	))
						.insert("inv_work_gb"       , row.getParameter("inv_work_gb"     	))
						.insert("inv_dept_id"       , row.getParameter("inv_dept_id"     	))
						.insert("inv_usr_id"       , inv.getParameter("inv_usr_id"     	))
						
						.insert("sts_cd"            , row.getParameter("sts_cd"  ) , ( rowaction == Action.insert ))
						//.update("sts_cd"            , new SqlParamText("case when ship_qty = 0 then '0200' when :qty != ship_qty then '0400' else '0500' end " ) ,( rowaction == Action.update ))
						//.update("sts_cd"         	, row.fixParameter("sts_cd"     		))
//						.update("salesman_id"       , inv.getParameter("salesman_id"     	))
//						.insert("ret_yn"         	, row.getParameter("ret_yn"     		))
//						.insert("ret_no"         	, row.getParameter("ret_no"     		))
						
						.update("vend_id"         	, row.getParameter("vend_id"     		))
						.update("vend_nm"         	, row.getParameter("vend_nm"     		))
						.update("vend_gb"         	, row.getParameter("vend_gb"     		))
						
						
						.update("tax_type"         	, inv.getParameter("tax_recv"     		))
						.update("tax_rt"         	, inv.getParameter("tax_rt"     		))
						.update("tax_free"         	, row.getParameter("tax_free"     		))
						.update("taxation"         	, row.getParameter("taxation"     		))
						.update("sply_amt"         	, row.getParameter("sply_amt"     		))
						.update("tax"         		, row.getParameter("tax"     			))
						.update("amount"        	, row.getParameter("amount"     		))
						
						.update("qty"         		, row.getParameter("qty"     			))
						.insert("rest_qty"         	, row.getParameter("qty"     		))
						.insert("org_ord_qty"         	, row.getParameter("org_ord_qty"     		))
						

						.update("req_msg"         	, inv.getParameter("req_msg"            ))
						.update("user_memo"         , row.getParameter("user_memo"          ))
						
						.update("biz_no"           , inv.getParameter("biz_no"              ))
						.update("biz_nm"           , inv.getParameter("biz_nm"       ))
						.update("biz_type"         , inv.getParameter("biz_type"     ))
						.update("biz_type"        , inv.getParameter("biz_type"    ))
						.update("biz_owner"        , inv.getParameter("biz_owner"    ))
						.update("biz_state"        , inv.getParameter("biz_state"    ))
						.update("biz_city"         , inv.getParameter("biz_city"     ))
						.update("biz_dong"         , inv.getParameter("biz_dong"     ))
						.update("biz_zip_cd"       , inv.getParameter("biz_zip_cd"   ))
						.update("biz_addr_1"        , inv.getParameter("biz_addr_1"    ))
						.update("biz_addr_2"        , inv.getParameter("biz_addr_2"    ))
						.update("biz_email"        , inv.getParameter("biz_email"    ))
						.update("biz_tel_no"       , inv.getParameter("biz_tel_no"   ))
						.update("biz_fax_no"       , inv.getParameter("biz_fax_no"   ))
						
						
						.update("recv_id"         	, inv.getParameter("cust_id"     		))
						.update("reve_nm"         	, inv.getParameter("cust_nm"     		))
						.update("reve_state"        , inv.getParameter("reve_state"     	))
						.update("reve_city"         , inv.getParameter("reve_city"     		))
						.update("reve_dong"         , inv.getParameter("reve_dong"     		))
						.update("reve_zip_cd"       , inv.getParameter("reve_zip_cd"     	))
						.update("reve_addr_1"        , inv.getParameter("reve_addr_1"     	))
						.update("reve_addr_2"        , inv.getParameter("reve_addr_2"     	))
						.update("recv_addr3"        , inv.getParameter("recv_addr3"     	))
						.update("reve_email"        , inv.getParameter("reve_email"     	))
						.update("reve_hp_no"       , inv.getParameter("reve_hp_no"     	))
						.update("reve_tel_no"       , inv.getParameter("reve_tel_no"     	))
						.update("reve_fax_no"       , inv.getParameter("reve_fax_no"     	))
						.update("hdli_id"        , inv.getParameter("hdli_id"     	))
						.update("hdli_no"        , inv.getParameter("hdli_no"     	))
						
						.update("upt_nm"         , row.getParameter("upt_nm"    		))
						.update("upt_ip"   	    , arg.remoteAddress)
						.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.insert("crt_nm" 	    , row.getParameter("crt_nm"	 				))
						.insert("crt_ip"   	    , arg.remoteAddress)
						.insert("crt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
		        		.action = rowaction ;
		        	;data.attach();	
		        	
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
		        	data.param
		        		.table("po_order_item")
		        		.where("where  inv_no  = :inv_no	" )
		        		.where("and    line_seqn = :line_seqn	" )
		        		//
//		        		.unique("corp_id"          , row.fixParameter("corp_id"       ))
		        		.unique("hq_id"          , row.fixParameter("hq_id"       ))
		        		.unique("stor_grp"          , row.fixParameter("stor_grp"       ))
		        		.unique("stor_id"          , row.fixParameter("stor_id"       ))
		        		.update("wrhs_id"          , row.fixParameter("wrhs_id"       ))
		        		// <!-- >
		        		.unique("pack_inv"          , row.fixParameter("inv_no"         ))
		        		.unique("inv_no"            , row.fixParameter("pack_no"        ))
		        		.unique("pack_no"           , row.fixParameter("pack_no"        ))
		        		
//		        		.unique("inv_no"            , row.fixParameter("pack_no"        ))
		        		.unique("line_seqn"           , row.fixParameter("line_seqn"        ))
		        		.unique("pack_seq"          , row.fixParameter("line_seqn"        ))
		        		.insert("seq_top"           , row.fixParameter("seq_top"        ))
		        		.insert("seq_dsp"           , row.getParameter("seq_dsp"        ))
//		        		.unique("ori_no"            , row.fixParameter("inv_no"         ))
//		        		.unique("ori_seq"           , row.fixParameter("line_seqn"        ))
		        		// <!-- >
		        		
		        		.update("safe_dt"           , inv.fixParameter("inv_dt"        ))
//						.insert("ret_yn"            , row.getParameter("ret_yn"         ))
//						.update("ret_no"            , row.getParameter("ret_no"         ))
//						.insert("ret_seq"           , row.getParameter("ret_seq"        ))
//						.update("pack_vend_id"      , row.getParameter("pack_vend_id"   ))
//						.update("pack_zone_id"      , row.getParameter("pack_zone_id"   ))
	
						.unique("mst_itm_id"           , row.fixParameter("mst_itm_id"        ))
						.unique("mst_itm_cd"           , row.fixParameter("mst_itm_cd"        ))
						.unique("unit_idcd"           , row.fixParameter("unit_idcd"        ))
						.unique("unt_qty"          , row.fixParameter("unt_qty"       ))
						.unique("item_idcd"           , row.fixParameter("item_idcd"        ))
						.unique("item_code"           , row.fixParameter("item_code"        ))
						.unique("item_name"           , row.getParameter("item_name"        ))
						.insert("item_spec"           , row.getParameter("item_spec"        ))
	
						
//						.update("sales_id"          , row.fixParameter("sales_id"       ))
						.update("unit_price"        , row.fixParameter("po_pri"       ))
						.update("cust_price"        , row.fixParameter("price"          ))
						
//						.update("unit_point"        , row.fixParameter("unit_point"     ))
//						.update("point_rate"        , row.fixParameter("point_rate"     ))
//						.update("item_point"        , row.fixParameter("item_point"     ))
//						.update("item_halin"        , row.getParameter("item_halin"     ))
	
						.update("price"             , row.fixParameter("po_pri"       ))
						.update("qty"               , row.fixParameter("qty"            ))
						
						.insert("rest_qty"          , row.fixParameter("qty"            ) , rowaction == Action.insert )
						.update("rest_qty"          , new SqlParamText(":qty-ship_qty " ) , rowaction == Action.update )
						.insert("org_ord_qty"          , row.getParameter("qty"            ))

						.insert("notax_yn"          , row.fixParameter("notax_yn"       ))
						.update("tax_free"          , tax.fixParameter("tax_free"       ))
						.update("taxation"          , tax.fixParameter("taxation"       ))
						.update("sply_amt"          , tax.fixParameter("sply_amt"       ))
						.update("tax"               , tax.fixParameter("tax"            ))
						.update("amount"            , tax.fixParameter("amount"         ))
						
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
		        	
	        	}	        	
	        	
			}
		}
		return null ;
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
	
	
}
