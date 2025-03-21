package com.sky.system.sale;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class SaleNotListService extends DefaultServiceHandler {


	/*
	 * 매출 내역 조회	
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page , int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);

		data.param
			.total("select count(1) as maxsize , sum(b.qty) as qty , sum(b.ship_qty) as ship_qty, sum(b.rest_qty) as rest_qty   ")
			.total("    ,  sum(b.amount) as amount   ")
			;
		data.param	
			.query("select a.inv_no, a.inv_dt , a.crt_dttm , a.cust_nm , a.mmb_nm , a.inv_work_id			")
			.query("    ,  (select emp_nm from usr_mst where emp_id = a.inv_usr_id) as inv_usr_nm 	")
			.query("    ,  a.ori_dt , c.pack_gb  , a.stor_id, a.wrhs_id 									")
			.query("    ,  (select stor_nm from store where stor_id = a.stor_id) as stor_nm 			")
			.query("    ,  (select stor_nm from store where stor_id = a.wrhs_id) as wareh_nm 			")
			.query("	,  b.item_code, b.item_name, b.item_spec, b.unt_qty 										")
			.query("	,  (select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name 			")
			.query("    ,  isnull(b.qty, 0) as qty  ,  isnull(b.ship_qty, 0) as ship_qty 							")
			.query("    ,  isnull(b.rest_qty, 0) as rest_qty 													")
			.query("  	,  isnull(b.price, 0) as price   , isnull(b.amount, 0) as amount 	, b.user_memo	, b.ship_memo	")
			;
//		data.param // 쿼리문  입력
//		.query("select t.* , b.inv_dt , b.crt_dttm , b.cust_nm , b.mmb_nm 							")
//		.query("    ,  (select emp_nm from usr_mst where emp_id = b.inv_usr_id) as inv_usr_nm 	")
//		.query("    ,  b.ori_dt , c.pack_gb  , b.stor_id, b.wrhs_id										")
//		.query("    ,  (select stor_nm from store where stor_id = b.stor_id) as stor_nm				")
//		.query("    ,  (select stor_nm from store where stor_id = b.wrhs_id) as wareh_nm				")
		data.param
//			.where("  from ( 																				")
//			.where("		select a.inv_no , a.pack_no, a.item_code , a.item_name 	, a.item_spec  , a.unt_qty	")
//			.where("    		,  (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name 	")
//			.where("    		,  isnull(a.qty, 0) as qty  ,  isnull(a.ship_qty, 0) as ship_qty  				")
//			.where("  		    ,  isnull(a.price, 0) as price   , isnull(a.amount, 0) as amount					")
//			.where("  		 from order_item a 																")
//       		.where("		where a.stor_grp      =     :stor_grp 	  " , arg.fixParameter("stor_grp"   	))
//			.where("		  and( a.stor_id  	  = 	:stor_id 	  " , arg.getParameter("stor_id" 		))
//			.where("     		 or  a.wrhs_id   = 	:stor_id   ) " , arg.getParameter("stor_id" 		))
//			.where("   		  and (a.qty - a.ship_qty) <> 0 												")
//			.where("  	   ) t 																				")
//			.where("      join order_mst b on t.inv_no = b.inv_no 											")
//			.where("     join order_pack c on t.pack_no = c.pack_no	 										")	
//			.where(" where b.inv_dt between :fr_dt       			" , arg.fixParameter("fr_dt"       		))
//			.where("  				    and :to_dt       			" , arg.fixParameter("to_dt"        	))
//			.where("  and  b.row_sts = 0 														            ")
//			.where("  and  b.row_clos    = '0'  															")
//			.where("  and  b.cust_id      =  :cust_id       		" , arg.getParameter("cust_id"        	)) /* 고객 */
//			.where("  and  b.inv_usr_id  =  :inv_usr_id       	" , arg.getParameter("inv_usr_id"      )) /* 상품담당 */
//			.where("  and  c.pack_gb      =  :pack_gb       		" , arg.getParameter("pack_gb"        	)) /* 직송여부  0: 자체배송, 1: 직납배송 */
//			.where("  and  b.sts_cd       =  :sts_cd       		    " , arg.getParameter("sts_cd"        	)) /* 처리상태  */
//			.where("order by b.inv_dt , t.inv_no		 													")
			.where("from order_mst a 																		")
			.where("   	join order_item b on a.inv_no = b.inv_no 											")
			.where("   	join order_pack c on b.pack_no = c.pack_no 											")
			.where("where a.stor_grp 		= :stor_grp 	  		" , arg.fixParameter("stor_grp"   		))
			.where("  and( a.stor_id  	  	= :stor_id 	  		" , arg.getParameter("stor_id"   		))
			.where(" 	or  a.wrhs_id   	= :stor_id   ) 		" , arg.getParameter("stor_id"   		))
			.where("  and  a.ori_dt between :fr_dt       			" , arg.fixParameter("fr_dt"       		))
			.where("  				    and :to_dt       			" , arg.fixParameter("to_dt"        	))
			.where("  and  b.rest_qty 	  <> 0 													            ")
			.where("  and  a.row_sts 	  = 0 													            ")
			.where("  and  a.row_clos    = '0'  															")
			.where("  and  b.row_sts 	  = 0 													            ")
			.where("  and  a.cust_id      =  :cust_id       		" , arg.getParameter("cust_id"        	)) /* 고객 */
			.where("  and  a.inv_usr_id  =  :inv_usr_id       	" , arg.getParameter("inv_usr_id"      )) /* 상품담당 */
		    .where("  and  a.inv_work_id in (:inv_work_id )    		" , inv_work_id ,( inv_work_id.length > 0) ) /* 매출유형 (주문 위치) */
			.where("  and  c.pack_gb      =  :pack_gb       		" , arg.getParameter("pack_gb"        	)) /* 직송여부  0: 자체배송, 1: 직납배송 */
			.where("  and  a.sts_cd       =  :sts_cd       		    " , arg.getParameter("sts_cd"        	)) /* 처리상태  */
			.where("order by a.ori_dt , a.ori_tm		 													")
			
		;
		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}		
//		return data.selectPaging(page, rows, (page==1));
	}			

	

}
