package com.sky.system.recv;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.NumberUtil;

@Service
public class ScmRecvListService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows,String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize , sum(a.amount) as amount , sum(a.org_ord_qty) as org_ord_qty ")
			.total("     , sum(a.qty) as qty, sum(a.ship_qty) as ship_qty , sum(a.rest_qty) as rest_qty ")
		;
		data.param // 조회
			.query("select a.row_clos                             ")
			.query("      ,a.inv_gb                                ")
			.query("	  ,a.stor_id 							   ")
    		.query("	  ,(select stor_nm from stor where stor_id = a.stor_id) as stor_nm ")
			.query("      ,b.stor_nm as wareh_nm                  ")
			.query("      ,a.inv_no                                ")
			.query("      ,a.inv_dt                                ")
			.query("      ,a.vend_nm                               ")
			.query("      ,c.emp_nm  as inv_usr_nm               ")
			.query("      ,a.amount                                ")
			.query("	  ,a.qty 								   ")
			.query("      ,a.user_memo                             ")
		;
		data.param // 조건
			.where("  from po_mst a                               ")
			.where("       left outer join stor b    on b.stor_id = a.wrhs_id            ")
			.where("       left outer join usr_mst c on c.emp_id = a.inv_usr_id          ")
			.where(" where a.stor_grp = :stor_grp                  ", arg.fixParameter("stor_grp"))
			.where("   and a.stor_id = :stor_id                  ", arg.getParameter("stor_id"))
			.where("   and a.inv_gb = '3'   		               ") // 1:일반발주, 2:통합발주, 3:직납발주
			.where("   and a.row_sts = 0 				           ")
			.where("   and a.sts_cd = '0200'   		               ")
			.where("   and a.inv_dt between :fr_dt                 ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt                 ", arg.fixParameter("to_dt"))
			.where("   and a.vend_id = :vend_id                    ", arg.getParameter("vend_id"))
			.where("  order by a.inv_no desc                       ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * detail 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
		.total(" select count(1) as maxsize , sum(a.qty), sum(a.amount) as amount ")
		.total("      , sum(a.sply_amt) as sply_amt, sum(a.tax) as tax, sum(a.ship_qty) as ship_qty, sum(a.rest_qty) as rest_qty ")
		;
		data.param // 쿼리문  입력
			.query("select a.inv_no                    ")
			.query("      ,a.line_seqn                   ")
			.query("      ,a.seq_dsp                   ")
			.query("      ,a.item_code                   ")
			.query("      ,a.item_name                   ")
			.query("      ,a.item_spec                   ")
			.query("      ,b.unit_name                   ")
			.query("      ,a.unt_qty                  ")
			.query("      ,a.qty                       ")
			.query("      ,a.safe_dt                   ")
			.query("      ,a.price                     ")
			.query("      ,a.sply_amt                  ")
			.query("      ,a.tax                       ")
			.query("      ,a.tax_free                  ")
			.query("      ,a.amount                    ")
			.query("      ,a.user_memo                 ")
		;
		data.param
			.where("  from po_item a                   ")
			.where("       left outer join item_unit b on b.unit_idcd = a.unit_idcd ")
			.where(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
			.where("   and a.row_sts = 0 			   ")
			.where(" order by a.seq_top, a.line_seqn     ")
		;

		return data.selectForMap();
	}


    /**
     * 매입/매출 확정 - sale_mst, ist_mst 생성
     *
     * @param arg
     * @return
     * @throws Exception
     */
    public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		DataMessage temp = arg.newStorage("POS");
		DataMessage data = arg.newStorage("POS");
		SqlResultRow info = new SqlResultRow();
		SqlResultMap item = new SqlResultMap();
		for (SqlResultRow ori:map) {
			temp.clear();
			temp.param // master 조회
				.query("select a.*			, b.tax_rt , b.tax_recv , b.cust_grp  	 ")
				.query("	 , b.cust_id	, b.cust_nm , b.mmb_id, b.mmb_nm		 ") // , b.tax_rt , b.tax_recv
				.query("     , b.inv_no as sale_ori_no								 ") // 주문번호
				.query("     , b.sply_amt									    	 ")
				.query("     , b.price_no  									   	 	 ")
				.query("     , b.biz_no 	, b.biz_nm 		, b.biz_type 			 ")
				.query("     , b.biz_type 	, b.biz_owner 	, b.biz_state			 ")
				.query("     , b.biz_city 	, b.biz_dong 	, b.biz_zip_cd			 ")
				.query("     , b.biz_addr_1 	, b.biz_addr_2 	, b.biz_email			 ")
				.query("     , b.biz_tel_no , b.biz_fax_no 	, b.reve_nm				 ")
				.query("     , b.reve_state , b.reve_city 	, b.reve_dong			 ")
				.query("     , b.reve_zip_cd, b.reve_addr_1 	, b.reve_addr_2			 ")
				.query("     , b.recv_addr3 , b.reve_email	, b.reve_tel_no			 ")
				.query("     , b.reve_fax_no, b.reve_hp_no							 ")

				.query("     , b.ctrl_id   , b.mro_no		, b.mro_id				 ") /* 계약ID, MRO주문번호, MRO ID (sale_mst) */

				.query("  from po_mst a                 			            	 ")
				.query("       join order_mst b on b.inv_no = a.pack_inv          	 ")
				.query(" where a.inv_no = :inv_no        ", ori.fixParameter("inv_no")) //row.fixParameter("inv_no"))
			;
			info = temp.selectForRow();
			temp.clear();
			temp.param // detail 조회
				.query("select a.* , b.cust_price            						 ")
				.query("     , b.po_pri, b.po_pri_type,  b.po_pri_rt		 ")
				.query("     , b.mro_no	, b.mro_seq					 				  ") /* MRO주문번호, MRO주문상세번호 */
				.query("  from po_item a                 			            	 ")
				.query("      join order_item b on  b.inv_no = a.pack_inv          	 ")
				.query("                        and b.line_seqn = a.pack_seq        	 ")
				.query(" where a.inv_no = :inv_no        ", ori.fixParameter("inv_no")) //row.fixParameter("inv_no"))
			;
			item = temp.selectForMap();

			if (info != null && item.size() > 0 ) {
				setInvoice(arg,  data, ori, info,  item );
				data.param
					.query("update  po_mst  t                                             ")
					.query("   set  t.ship_qty = t.qty , t.rest_qty = 0, sts_cd = '0500'   ")
					.query(" where t.inv_no = :inv_no  ", ori.fixParameter("inv_no"		   ))
					.action = Action.direct;
				data.attach();

				data.param
					.query("update  po_item  t                                             ")
					.query("   set  t.ship_qty = t.qty , t.rest_qty = 0  				   ")
					.query(" where t.inv_no = :inv_no  ", ori.fixParameter("inv_no"		   ))
					.action = Action.direct;
				data.attach();

				data.param
					.query("update  sale_mst  t                                         ")
					.query("   set( t.sply_amt, t.tax, t.amount,  t.tax_free, t.taxation ")
					.query("  ) = ( select sum(s.sply_amt) ,                             ")
					.query("		       sum(s.tax)      ,                             ")
					.query("	           sum(s.amount)   ,                             ")
					.query("		       sum(s.tax_free) ,                             ")
					.query("		       sum(s.taxation)                               ")
					.query("        from sale_dtl s                                     ")
					.query("        where s.inv_no = t.inv_no)                           ")
					.query(" where t.inv_no = :inv_no  ", ori.fixParameter("inv_no"		 ))
					.action = Action.direct;
				data.attach();

			} else {
				throw new ServiceException( "  " );
   			}
    	}
		data.execute();
		return null;
    }


	/**
	 * ist_mst 등록/수정/삭제
	 */
	public void setInvoice(HttpRequestArgument arg, DataMessage data,SqlResultRow ori, SqlResultRow inv, SqlResultMap map ) throws Exception {
		// 입고 등록
    	data.param
			.table("ist_mst")
			.where("where inv_no = :inv_no ")
			//
			.insert("corp_id"    , inv.getParameter("corp_id"   ))
			.insert("hq_id"    , inv.getParameter("hq_id"   ))
			.insert("stor_grp"    , inv.getParameter("stor_grp"   ))
			.insert("stor_id"    , inv.getParameter("stor_id"   ))
			.insert("pos_no"      , inv.getParameter("pos_no"     ))
			.unique("inv_no"      , (inv.getParameter("inv_no"    )) + "1" )
			.update("inv_dt"      , ori.getParameter("inv_dt"     ))
			.insert("inv_work_gb" , inv.getParameter("inv_work_gb"))
			.update("inv_dept_id" , ori.getParameter("inv_dept_id"))
			.update("inv_usr_id" , ori.getParameter("inv_usr_id"))
			.insert("sts_cd"      , "0500"       					) // 0500
			.update("ret_yn"      , inv.getParameter("ret_yn"     ))
			.update("ori_no"      , inv.getParameter("inv_no"     ))
			.update("get_no"      , inv.getParameter("get_no"     ))
			.update("tax_dt"      , inv.getParameter("tax_dt"     ))
			.update("pay_dt"      , inv.getParameter("pay_dt"     ))
			.insert("vend_id"     , inv.getParameter("vend_id"    ))
			.insert("vend_nm"     , inv.getParameter("vend_nm"    ))
			.insert("vend_gb"     , inv.getParameter("vend_gb"    ))
			.update("tax_type"    , inv.getParameter("tax_type"   ))
			.update("tax_rt"    , inv.getParameter("tax_rt"   ))
			.update("tax_free"    , inv.getParameter("tax_free"   ))
			.update("taxation"    , inv.getParameter("taxation"   ))
			.update("sply_amt"    , inv.getParameter("sply_amt"   ))
			.update("tax"         , inv.getParameter("tax"        ))
			.update("amount"      , inv.getParameter("amount"     ))
			.update("payable"     , inv.getParameter("amount"     )) // 금액(amount) + 배송비
			.update("qty"         , inv.getParameter("qty"        ))
			.insert("org_ord_qty"   , inv.getParameter("qty"        ))
			.update("user_memo"   	, inv.getParameter("user_memo"  ))
			.update("upt_nm"   		, ori.getParameter("upt_nm"  ))
			.update("upt_ip"   		, arg.remoteAddress				)
			.insert("crt_nm"   		, ori.getParameter("crt_nm"  ))
			.insert("crt_ip"   		, arg.remoteAddress				)
			.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.action = Action.insert;
    	data.attach();

    	// 매출 등록
    	data.param
			.table("sale_mst")
			.where("where inv_no = :inv_no ")
			//
			.insert("corp_id"    , inv.getParameter("corp_id"   ))
			.insert("hq_id"    , inv.getParameter("hq_id"   ))
			.insert("stor_grp"    , inv.getParameter("stor_grp"   ))
			.insert("stor_id"    , inv.getParameter("stor_id"   ))
			.insert("wrhs_id"    , inv.getParameter("wrhs_id"   ))
			.insert("ctrl_id"    , inv.getParameter("ctrl_id"   ))
			.insert("mro_id"      , inv.getParameter("mro_id"     ))
			.insert("mro_no"      , inv.getParameter("mro_no"     ))
			.insert("pos_no"      , inv.getParameter("pos_no"     ))
			.unique("inv_no"      , inv.fixParameter("inv_no"     ))
			.update("inv_dt"      , ori.getParameter("inv_dt"     ))
			.insert("inv_work_gb" , inv.getParameter("inv_work_gb"))

			.update("inv_dept_id" , ori.getParameter("inv_dept_id"))
			.update("inv_usr_id" , ori.getParameter("inv_usr_id"))
			.insert("sts_cd"      , "0500"       					) // 0500
			.update("ret_yn"      , inv.getParameter("ret_yn"     ))
			.update("ori_no"      , inv.getParameter("sale_ori_no"))
			.update("pack_no"     , inv.getParameter("pack_no"    ))
			.update("get_no"      , inv.getParameter("get_no"     ))
			.update("tax_dt"      , inv.getParameter("tax_dt"     ))
			.update("pay_dt"      , inv.getParameter("pay_dt"     ))
			.insert("cust_grp"     , inv.getParameter("cust_grp"    ))
			.insert("cust_id"     , inv.getParameter("cust_id"    ))
			.insert("cust_nm"     , inv.getParameter("cust_nm"    ))
			.insert("cust_gb"     , inv.getParameter("cust_gb"    ))
			.insert("mmb_id"     , inv.getParameter("mmb_id"    ))
			.insert("mmb_nm"     , inv.getParameter("mmb_nm"    ))
			.insert("price_no"    , inv.getParameter("price_no"   ))

			.update("biz_no"      , inv.getParameter("biz_no"     ))
			.update("biz_nm"      , inv.getParameter("biz_nm"     ))
			.update("biz_type"    , inv.getParameter("biz_type"   ))
			.update("biz_type"   , inv.getParameter("biz_type"  ))
			.update("biz_owner"   , inv.getParameter("biz_owner"  ))
			.update("biz_state"   , inv.getParameter("biz_state"  ))
			.update("biz_city"    , inv.getParameter("biz_city"   ))
			.update("biz_dong"    , inv.getParameter("biz_dong"   ))
			.update("biz_zip_cd"  , inv.getParameter("biz_zip_cd" ))
			.update("biz_addr_1"   , inv.getParameter("biz_addr_1"  ))
			.update("biz_addr_2"   , inv.getParameter("biz_addr_2"  ))
			.update("biz_email"   , inv.getParameter("biz_email"  ))
			.update("biz_tel_no"  , inv.getParameter("biz_tel_no" ))
			.update("biz_fax_no"  , inv.getParameter("biz_fax_no" ))
			.update("reve_nm"     , inv.getParameter("reve_nm"    ))

			.update("reve_state"  , inv.getParameter("reve_state" ))
			.update("reve_city"   , inv.getParameter("reve_city"  ))
			.update("reve_dong"   , inv.getParameter("reve_dong"  ))
			.update("reve_zip_cd" , inv.getParameter("reve_zip_cd"))
			.update("reve_addr_1"  , inv.getParameter("reve_addr_1" ))
			.update("reve_addr_2"  , inv.getParameter("reve_addr_2" ))
			.update("recv_addr3"  , inv.getParameter("recv_addr3" ))
			.update("reve_email"  , inv.getParameter("reve_email" ))
			.update("reve_tel_no" , inv.getParameter("reve_tel_no"))
			.update("reve_hp_no" , inv.getParameter("reve_hp_no"))
			.update("reve_fax_no" , inv.getParameter("reve_fax_no"))


			.update("tax_type"    , inv.getParameter("tax_type"   ))
			.update("tax_rt"    , inv.getParameter("tax_rt"   ))
			.update("tax_free"    , inv.getParameter("tax_free"   ))
			.update("taxation"    , inv.getParameter("taxation"   ))
			.update("sply_amt"    , inv.getParameter("sply_amt"   ))
			.update("tax"         , inv.getParameter("tax"        ))
			.update("amount"      , inv.getParameter("amount"     ))
			.update("payable"     , inv.getParameter("amount"     )) // 금액(amount) + 배송비
			.update("qty"         , inv.getParameter("qty"        ))
			.insert("org_ord_qty"   , inv.getParameter("qty"        ))
			.update("user_memo"   	, inv.getParameter("user_memo"  ))
			.update("upt_nm"   		, ori.getParameter("upt_nm"  ))
			.update("upt_ip"   		, arg.remoteAddress				)
			.insert("crt_nm"   		, ori.getParameter("crt_nm"  ))
			.insert("crt_ip"   		, arg.remoteAddress				)
			.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.action = Action.insert;
    	data.attach();


		for(SqlResultRow row:map) {
//			System.out.println(row);

			data.param
				.table("recv_item")
				.where("where inv_no = :inv_no   ")
				.where("  and line_seqn = :line_seqn ")
				//
				.unique("hq_id"   , row.getParameter("hq_id"  ))
				.unique("stor_grp"   , row.getParameter("stor_grp"  ))
				.unique("stor_id"   , row.getParameter("stor_id"  ))
				.unique("inv_no"     , (inv.getParameter("inv_no"   )) + "1" )
				.unique("line_seqn"    , row.getParameter("line_seqn"   ))
				.insert("seq_top"    , row.getParameter("seq_top"   ))
				.update("seq_dsp"    , row.getParameter("seq_dsp"   ))
				.update("ret_yn"     , row.getParameter("ret_yn"    ))
				.insert("ori_no"     , row.getParameter("inv_no"    ))
				.insert("ori_seq"    , row.getParameter("ori_seq"   ))
				.insert("mst_itm_id"    , row.getParameter("mst_itm_id"   ))
				.insert("mst_itm_cd"    , row.getParameter("mst_itm_cd"   ))
				.insert("unit_idcd"    , row.getParameter("unit_idcd"   ))
				.insert("unt_qty"   , row.getParameter("unt_qty"  ))
				.insert("item_idcd"    , row.getParameter("item_idcd"   ))
				.insert("item_code"    , row.getParameter("item_code"   ))
				.update("item_name"    , row.getParameter("item_name"   ))
				.update("item_spec"    , row.getParameter("item_spec"   ))
				.update("unit_price" , row.getParameter("unit_price"))
				.update("item_halin" , row.getParameter("item_halin"))
				.update("price"      , row.getParameter("price"     ))
				.update("qty"        , row.getParameter("qty"       ))
				.insert("org_ord_qty"   , row.getParameter("qty"  		))
				.update("notax_yn"   , row.getParameter("notax_yn"  ))
				.update("tax_free"   , row.getParameter("tax_free"  ))
				.update("taxation"   , row.getParameter("taxation"  ))
				.update("sply_amt"   , row.getParameter("sply_amt"  ))
				.update("tax"        , row.getParameter("tax"       ))
				.update("amount"     	, row.getParameter("amount"    ))
				.update("user_memo"  	, row.getParameter("user_memo" ))
				.update("row_sts"  		, row.getParameter("row_sts" ))
				.update("upt_nm"  		, ori.getParameter("upt_nm" ))
				.update("upt_ip"  		, arg.remoteAddress			 )
				.insert("crt_nm"  		, ori.getParameter("crt_nm" ))
				.insert("crt_ip"  		, arg.remoteAddress 			 )
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.action = Action.insert;
	    	data.attach();

		double  baseamt   = Double.parseDouble(row.getParamText("qty")) * Double.parseDouble(row.getParamText("cust_price"));
		SqlResultRow tax  = NumberUtil.calcSurtax(baseamt, Double.parseDouble(inv.getParamText("tax_rt")), "0".equals(inv.getParamText("tax_recv") ));


		if("0".equals(row.getParameter("notax_yn"))){
			tax.setParameter("tax_free", 0);
			tax.setParameter("taxation", baseamt);
		} else {
			tax.setParameter("tax_free", baseamt);
			tax.setParameter("taxation", 0);
		}


    	data.param
		.table("sale_dtl")
		.where("where inv_no = :inv_no   ")
		.where("  and line_seqn = :line_seqn ")
    	//
		.unique("hq_id"   , row.getParameter("hq_id"  ))
		.unique("stor_grp"   , row.getParameter("stor_grp"  ))
		.unique("stor_id"   , row.getParameter("stor_id"  ))
		.insert("ctrl_id"   , row.getParameter("ctrl_id"  ))
		.unique("inv_no"     , inv.getParameter("inv_no"    ))
		.unique("line_seqn"    , row.getParameter("line_seqn"   ))
		.insert("seq_top"    , row.getParameter("seq_top"   ))
		.update("seq_dsp"    , row.getParameter("seq_dsp"   ))
		.update("ret_yn"     , row.getParameter("ret_yn"    ))
		.insert("ori_no"     , inv.getParameter("sale_ori_no"))
		.insert("ori_seq"    , row.getParameter("ori_seq"   ))
		.insert("mro_no"     , row.getParameter("mro_no"	))
		.insert("mro_seq"    , row.getParameter("mro_seq"   ))
		.insert("mst_itm_id"    , row.getParameter("mst_itm_id"   ))
		.insert("mst_itm_cd"    , row.getParameter("mst_itm_cd"   ))
		.insert("unit_idcd"    , row.getParameter("unit_idcd"   ))
		.insert("unt_qty"   , row.getParameter("unt_qty"  ))
		.insert("item_idcd"    , row.getParameter("item_idcd"   ))
		.insert("item_code"    , row.getParameter("item_code"   ))
		.update("item_name"    , row.getParameter("item_name"   ))
		.update("item_spec"    , row.getParameter("item_spec"   ))
		.update("unit_price" , row.getParameter("unit_price"))
		.update("item_halin" , row.getParameter("item_halin"))
		.update("cust_price" , row.getParameter("price"     ))

		.update("price"      , row.getParameter("price"     )) // order_item price
		.update("qty"        , row.getParameter("qty"       ))
		.insert("org_ord_qty"   , row.getParameter("qty"       ))


		.insert("notax_yn"   , row.fixParameter("notax_yn"  ))
		.update("tax_free"   , tax.fixParameter("tax_free"  ))
		.update("taxation"   , tax.fixParameter("taxation"  ))
		.update("sply_amt"   , tax.fixParameter("sply_amt"  ))
		.update("tax"        , tax.fixParameter("tax"       ))
		.update("amount"     , tax.fixParameter("amount"    ))

		.update("po_pri"   , row.getParameter("price"      ))
		.update("po_pri_type" , row.getParameter("po_pri_type"))
		.update("po_pri_rt" , row.getParameter("po_pri_rt"))

		.update("user_memo"  , row.getParameter("user_memo" ))
		.update("upt_nm"  , ori.getParameter("upt_nm" ))
		.update("upt_ip"  , arg.remoteAddress			 )
		.insert("crt_nm"  , ori.getParameter("crt_nm" ))
		.insert("crt_ip"  , arg.remoteAddress 			 )
		.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		.action = Action.insert;
    	data.attach();




		double work_qty = Double.parseDouble(row.getParamText("qty")) ;
		double unt_qty = Double.parseDouble(row.getParamText("unt_qty")) ;

		// 입고대장 등록
    	data.param
			.table("stock_ledger")
			.where("where inv_no = :inv_no ")
			.where("  and line_seqn = :line_seqn    ")
        	//
			.insert("hq_id"   , row.getParameter("hq_id"   ))
			.update("stor_grp"   , row.getParameter("stor_grp"   ))
			.update("stor_id"   , row.getParameter("stor_id"   ))
			.unique("inv_no"     , (inv.getParameter("inv_no"    )) + "1" )
			.unique("line_seqn"    , row.getParameter("line_seqn"    ))
			.insert("inv_gb"     , new SqlParamText("2"          )) // '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
			.insert("inv_wk"     , new SqlParamText("2071302"    )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
			.update("dept_id"    , ori.getParameter("inv_dept_id"))
			.update("emp_id"    , ori.getParameter("inv_usr_id"))
			.update("cust_id"    , inv.getParameter("vend_id"    )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
			.update("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
			.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"    ))
			.update("unit_idcd"    , row.getParameter("unit_idcd"    ))
			.update("unt_qty"   , row.getParameter("unt_qty"   ))
			.update("item_idcd"    , row.getParameter("item_idcd"    ))
			.update("item_code"    , row.getParameter("item_code"    ))
			.update("stock"      , work_qty				          ) // 입고(매입)는 플러스
			.update("eaqty"      , (work_qty * unt_qty)		  ) // 환산 수량

			.update("notax_yn"   , row.getParameter("notax_yn"   ))
			.update("tax_type"   , inv.getParameter("tax_type"   ))
			.update("tax_rt"   , inv.getParameter("tax_rt"   ))
			.update("sply_amt"   , row.getParameter("sply_amt"   ))
			.update("tax"        , row.getParameter("tax"        ))

			.update("qty"        , row.getParameter("qty"        ))
			.update("price"      , row.getParameter("price"      ))
			.update("amount"     , row.getParameter("amount"     ))
			.update("po_pri"   , row.getParameter("price"      )) // 매장간 거래는 매입단가 = 판매단가
			.update("po_amount"  , row.getParameter("amount"     )) // 매장간 거래는 매입금액 = 판매금액
			.update("user_memo"  	, row.getParameter("user_memo"  ))
			.update("sys_memo"  	, row.getParameter("sys_memo"  ))
			.update("row_ord"  		, row.getParameter("row_ord"  ))
			.update("row_sts"  		, row.getParameter("row_sts"  ))
			.update("upt_nm"  		, ori.getParameter("upt_nm"  ))
			.update("upt_ip"  		, arg.remoteAddress			  )
			.insert("crt_nm"  		, ori.getParameter("crt_nm"  ))
			.insert("crt_ip"  		, arg.remoteAddress			  )
			.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("price_no"   	, new SqlParamText("'9'"        )) // 거래처 단가 번호 [ 1~5 출하가/6:소비자가/7:포스가/8:B2C/9:구매가/10:직원가/11:B2B ]
			.update("unit_price" 	, row.getParameter("unit_price" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
			.update("cust_price" 	, row.getParameter("price"      )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
			.action = Action.insert;
    	data.attach();

		// 출고대장 등록
    	data.param
			.table("stock_ledger")
			.where("where inv_no = :inv_no ")
			.where("  and line_seqn = :line_seqn    ")
        	//
			.insert("hq_id"   , row.getParameter("hq_id"   ))
			.update("stor_grp"   , row.getParameter("stor_grp"   ))
			.update("stor_id"   , row.getParameter("stor_id"   ))//row.getParameter("stor_id"   ))
			.unique("inv_no"     , inv.getParameter("inv_no"     ))
			.unique("line_seqn"    , row.getParameter("line_seqn"    ))
			.insert("inv_gb"     , new SqlParamText("1"          )) // '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
			.insert("inv_wk"     , new SqlParamText("2071301"    )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
			.update("dept_id"    , ori.getParameter("inv_dept_id"))
			.update("emp_id"    , ori.getParameter("inv_usr_id"))
			.update("cust_id"    , inv.getParameter("cust_id"   )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
			.update("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
			.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"    ))
			.update("unit_idcd"    , row.getParameter("unit_idcd"    ))
			.update("unt_qty"   , row.getParameter("unt_qty"   ))
			.update("item_idcd"    , row.getParameter("item_idcd"    ))
			.update("item_code"    , row.getParameter("item_code"    ))
			.update("stock"      , work_qty	 * -1			      ) // 출고는 마이너스
			.update("eaqty"      , (work_qty * unt_qty)* -1      ) // 환산 수량

			.update("notax_yn"   , row.getParameter("notax_yn"   ))
			.update("tax_type"   , inv.getParameter("tax_type"   ))
			.update("tax_rt"   , inv.getParameter("tax_rt"   ))
			.update("sply_amt"   , tax.getParameter("sply_amt"   ))
			.update("tax"        , tax.getParameter("tax"        ))

			.update("qty"        , row.getParameter("qty"        ))
			.update("price"      , row.getParameter("price"      ))
			.update("amount"     , row.getParameter("amount"     ))

			.update("po_pri"   , row.getParameter("po_pri"   )) // 매장간 거래는 매입단가 = 판매단가


			.update("po_amount"  , row.getParameter("amount"     )) // 매장간 거래는 매입금액 = 판매금액
			.update("user_memo"  	, row.getParameter("user_memo"  ))
			.update("sys_memo"  	, row.getParameter("sys_memo"  ))
			.update("row_ord"  		, row.getParameter("row_ord"  ))
			.update("row_sts"  		, row.getParameter("row_sts"  ))
			.update("upt_nm"  		, ori.getParameter("upt_nm"  ))
			.update("upt_ip"  		, arg.remoteAddress			  )
			.insert("crt_nm"  		, ori.getParameter("crt_nm"  ))
			.insert("crt_ip"  		, arg.remoteAddress			  )
			.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("price_no"   , new SqlParamText("'9'"        )) // 거래처 단가 번호 [ 1~5 출하가/6:소비자가/7:포스가/8:B2C/9:구매가/10:직원가/11:B2B ]
			.update("unit_price" , row.getParameter("unit_price" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
			.update("cust_price" , row.getParameter("price"      )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
			.action = Action.insert;
    	data.attach();
		}
	}


}
