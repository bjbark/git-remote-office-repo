package com.sky.system.recv;

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
public class PoRequestService  extends DefaultServiceHandler {
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.amount) as amount  ")
		;
		data.param // 조회
			.query("select a.row_clos                    	")
			.query("      ,a.inv_gb                       	")
			.query("      ,a.vend_gb                      	")
			.query("      ,a.stor_id  , b.stor_nm       	")
			.query("      ,a.inv_no                       	")
			.query("      ,a.inv_dt                       	")
			.query("      ,a.vend_id                      	")
			.query("      ,d.vend_cd                      	")
			.query("      ,a.vend_nm                      	")

			.query("      ,a.cust_id                      	")
			.query("      ,e.cust_nm                      	")

			.query("      ,d.biz_email                    	")
			.query("      ,d.biz_fax_no                   	")
			.query("      ,c.emp_nm  as inv_usr_nm      	")
			.query("      ,a.amount                       	")
			.query("      ,a.sts_cd                       	")
			.query("      ,a.user_memo                    	")
			.query("      ,a.qty 	                      	")
		;
		data.param // 조건
			.where("  from po_order a                     ")
			.where("       left outer join stor b       on b.stor_id = a.stor_id   ")
			.where("       left outer join usr_mst c   on c.emp_id = a.inv_usr_id ")
			.where("       join vend_mst d              on d.vend_id = a.vend_id     ")
			.where("       left outer join cust_mst e   on e.cust_id = a.cust_id     ")

			.where(" where a.inv_gb in ('1', '2')         ") // 1:일반발주, 2:통합발주, 3:직납발주
			.where("   and a.row_sts = 0 				  ")
			.where("   and a.stor_id = :stor_id         ", arg.fixParameter("stor_id" ))
			.where("   and a.inv_dt between :fr_dt        ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt        ", arg.fixParameter("to_dt"))
			.where("   and a.vend_id = :vend_id           ", arg.getParameter("vend_id"  ))
			.where("   and a.inv_dept_id = :inv_dept_id   ", arg.getParameter("inv_dept_id"  ))
			.where("   and a.inv_usr_id = :inv_usr_id   ", arg.getParameter("inv_usr_id"  ))
		;

		String sts_cd = arg.getParamText("sts_cd");
		if ("1".equals(sts_cd))
			data.param.where("   and a.sts_cd = '0010' ");
		else if ("2".equals(sts_cd))
			data.param.where("   and a.sts_cd in ('0200', '0400', '0500') ");

		data.param
			.where(" order by a.inv_no desc               ")
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
		data.param // 쿼리문  입력
		.query("select a.seq_dsp                   ")
		.query("      ,a.item_code                   ")
		.query("      ,a.item_name                   ")
		.query("      ,a.item_spec                   ")
		.query("      ,a.notax_yn                  ")
		.query("      ,b.unit_name                   ")
		.query("      ,a.unt_qty                  ")
		.query("      ,a.qty                       ")
		.query("      ,a.safe_dt                   ")
		.query("      ,a.price                     ")
		.query("      ,a.sply_amt                  ")
		.query("      ,a.tax                       ")
		.query("      ,a.tax_free                  ")
		.query("      ,a.amount                    ")
		.query("      ,(select bas_nm from base_mst where bas_id = c.brand_id) as brand_nm ")
		.query("      ,a.user_memo                 ")
		.query("      ,c.brcd_1 as barcode       ")
		.query("  from po_order_item a             ")
		.query("       left outer join item_unit b ")
		.query("         on b.unit_idcd = a.unit_idcd  ")
		.query("       join itm_mst c 		   ")
		.query("         on c.item_idcd = a.item_idcd  ")
		.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 			   ")
		.query(" order by a.seq_top, a.line_seqn     ")
		;

		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
		.query("select a.inv_no                       ")
		.query("      ,a.tax_type                     ")
		.query("      ,a.inv_dt                       ")
		.query("      ,a.wrhs_id                     ")
		.query("      ,a.stor_id  ,  b.stor_nm      ")
		.query("      ,a.vend_id                      ")
		.query("      ,a.vend_nm                      ")
		.query("      ,a.vend_gb                      ")
		.query("      ,a.inv_dept_id                  ")
		.query("      ,a.inv_usr_id                  ")
		.query("      ,c.emp_nm     as inv_usr_nm   ")
		.query("      ,a.ret_yn                       ")
		.query("      ,a.tax_type                     ")
		.query("      ,a.tax_rt                     ")
		.query("      ,a.tax_free                     ")
		.query("      ,a.taxation                     ")
		.query("      ,a.sply_amt                     ")
		.query("      ,a.tax                          ")
		.query("      ,a.amount                       ")
		.query("      ,a.qty                          ")
		.query("      ,a.user_memo                    ")
		.query("      ,a.biz_no                       ")
		.query("      ,a.biz_nm                       ")
		.query("      ,a.biz_type                     ")
		.query("      ,a.biz_type                    ")
		.query("      ,a.biz_owner                    ")
		.query("      ,a.biz_state                    ")
		.query("      ,a.biz_city                     ")
		.query("      ,a.biz_dong                     ")
		.query("      ,a.biz_zip_cd                   ")
		.query("      ,a.biz_addr_1                    ")
		.query("      ,a.biz_addr_2                    ")
		.query("      ,a.biz_email                    ")
		.query("      ,a.biz_hp_no                   ")
		.query("      ,a.biz_tel_no                   ")
		.query("      ,a.biz_fax_no                   ")

		.query("      ,a.cust_id                      ")
		.query("      ,e.cust_nm                      ")

		.query("      ,a.req_msg                      ")
		.query("      ,a.reve_nm                      ")
		.query("      ,a.reve_state                   ")
		.query("      ,a.reve_city                    ")
		.query("      ,a.reve_dong                    ")
		.query("      ,a.reve_zip_cd                  ")
		.query("      ,a.reve_addr_1                   ")
		.query("      ,a.reve_addr_2                   ")
		.query("      ,a.reve_email                   ")
		.query("      ,a.reve_hp_no                  ")
		.query("      ,a.reve_tel_no                  ")
		.query("      ,a.reve_fax_no                  ")
		.query("      ,d.biz_gb                       ")
		.query("  from po_order a                     ")
		.query("       left outer join stor b        on b.stor_id = a.stor_id   ")
		.query("       left outer join usr_mst c    on c.emp_id = a.inv_usr_id ")
		.query("       left outer join vend_mst d    on d.vend_id = a.vend_id     ")
		.query("       left outer join cust_mst e    on e.cust_id = a.cust_id     ")


		.query(" where a.inv_no = :inv_no             ", arg.fixParameter("inv_no" ))
		.query("   and a.row_sts = 0 				  ")
		;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();

			data.param // 쿼리문  입력
			.query("select a.inv_no                    ")
			.query("      ,a.line_seqn                   ")
			.query("      ,a.seq_top                   ")
			.query("      ,a.seq_dsp                   ")
			.query("      ,a.item_idcd                   ")
			.query("      ,a.item_code                   ")
			.query("      ,a.item_name                   ")
			.query("      ,a.item_spec                   ")
			.query("      ,a.unit_idcd                   ")
			.query("      ,b.unit_name                   ")
			.query("      ,a.unt_qty                  ")
			.query("      ,a.stk_itm_id                  ")
			.query("      ,a.notax_yn                  ")
			.query("      ,a.unit_price                ")
			.query("      ,a.ret_yn                    ")
			.query("      ,a.price                     ")
			.query("      ,a.qty                       ")
			.query("      ,a.tax_free                  ")
			.query("      ,a.taxation                  ")
			.query("      ,a.sply_amt                  ")
			.query("      ,a.tax                       ")
			.query("      ,a.amount                    ")
			.query("      ,(select bas_nm from base_mst where bas_id = c.brand_id) as brand_nm ")
			.query("      ,a.safe_dt                   ")
			.query("      ,a.user_memo                 ")
			.query("      ,c.brcd_1 as barcode       ")
			.query("  from po_order_item  a            ")
			.query("       left outer join item_unit b on b.unit_idcd = a.unit_idcd ")
			.query("       join itm_mst c 		       on c.item_idcd = a.item_idcd  ")
			.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
			.query("   and a.row_sts = 0 				  ")
			.query(" order by a.seq_top, a.line_seqn     ")
			;

			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

	/**
	 * 삭제
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage temp = arg.newStorage("POS");
		temp.param
		 	.query("select sts_cd, qty from po_order where inv_no = :inv_no", arg.fixParameter("inv_no"))
		;
		SqlResultRow del = temp.selectForRow();

		String work_stscd   = arg.getParamText("sts_cd").toString();		// 로컬 상태
		String server_stscd = del.getParamText("sts_cd").toString();		// 서버 상태

		double work_qty   = Double.parseDouble(arg.getParamText("qty"));	// 로컬 수량
		double server_qty = Double.parseDouble(del.getParamText("qty"));	// 서버 수량

		DataMessage data = arg.newStorage("POS");

		if (del != null ) {
			// 로컬과 서버의 상태가 동일할 경우
			if (work_stscd.equals(server_stscd)) {
				if (work_qty != server_qty) {
					throw new ServiceException("정상적인 삭제작업이 아닙니다. 수량 불일치");
				}
			} else {
				throw new ServiceException("정상적인 삭제작업이 아닙니다. 상태 불일치");
			}
		}

		// 상태 재확인
		if ("0010".equals(work_stscd)) {
        	data.param
	    		.table("po_order_item")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"   		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_id"		, arg.getParameter("upt_id"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

	    	data.param
				.table("po_order")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"   		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_id"		, arg.getParameter("upt_id"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);
		}

		data.execute();
		return null;
	}

	/**
	 * invoice master 등록/수정
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow inv:map) {

			Action rowaction = SqlParameter.Action.setValue(inv.getParameter("_set"));
			if (rowaction == Action.delete) {

				throw new ServiceException("삭제불가");
			} else {

				// 발주정보 등록/수정
	        	data.param
	    			.table("po_order")
	    			.where("where inv_no = :inv_no ")
		        	//
					.insert("hq_id"    , inv.getParameter("hq_id"   ))
					.insert("stor_grp"    , inv.getParameter("stor_grp"   ))
					.insert("stor_id"    , inv.getParameter("stor_id"   ))
					.update("wrhs_id"    , inv.getParameter("wrhs_id"   ))
					.insert("pos_no"      , inv.getParameter("pos_no"     ))
					.unique("inv_no"      , inv.fixParameter("inv_no"     ))
					.update("inv_dt"      , inv.getParameter("inv_dt"     ))
					.update("inv_tm"      , inv.getParameter("inv_tm"     ))
					.insert("inv_work_gb" , inv.getParameter("inv_work_gb"))
					.update("inv_dept_id" , inv.getParameter("inv_dept_id"))
					.update("inv_usr_id" , inv.getParameter("inv_usr_id"))
					.insert("sts_cd"      , inv.getParameter("sts_cd"     ))
					.update("ret_yn"      , inv.getParameter("ret_yn"     ))
					.insert("vend_id"     , inv.getParameter("vend_id"    ))
					.insert("vend_nm"     , inv.getParameter("vend_nm"    ))
					.update("vend_gb"     , inv.getParameter("vend_gb"    ))
					.update("tax_type"    , inv.getParameter("tax_type"   ))
					.update("tax_rt"    , inv.getParameter("tax_rt"   ))
					.update("tax_free"    , inv.getParameter("tax_free"   ))
					.update("taxation"    , inv.getParameter("taxation"   ))
					.update("sply_amt"    , inv.getParameter("sply_amt"   ))
					.update("tax"         , inv.getParameter("tax"        ))
					.update("amount"      , inv.getParameter("amount"     ))
					.update("qty"         , inv.getParameter("qty"        ))
					.insert("org_ord_qty"    , inv.getParameter("qty"        ))
					.update("req_msg"     , inv.getParameter("req_msg"    ))
					.update("user_memo"   , inv.getParameter("user_memo"  ))
					.update("upt_id"   , inv.getParameter("upt_id"  ))
					.update("upt_ip"   , arg.remoteAddress              )
					.insert("crt_id"   , inv.getParameter("crt_id"  ))
					.insert("crt_ip"   , arg.remoteAddress)
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					.update("biz_no"      , inv.getParameter("biz_no"     ))
					.update("biz_nm"      , inv.getParameter("biz_nm"     ))
					.update("biz_type"    , inv.getParameter("biz_type"   ))
					.update("biz_type"   , inv.getParameter("biz_type"  ))
					.update("biz_owner"   , inv.getParameter("biz_owner"  ))
					.update("biz_state"   , inv.getParameter("biz_state"  ))
					.update("biz_city"    , inv.getParameter("biz_city"   ))
					.update("biz_dong"    , inv.getParameter("biz_dong"   ))
					.update("biz_zip_cd"  , inv.getParameter("biz_zip_cd" ))
					.update("biz_addr_1"   , inv.getParameter("biz_state"  ) + " " + inv.getParameter("biz_city") + " " + inv.getParameter("biz_dong"))
					.update("biz_addr_2"   , inv.getParameter("biz_addr_2"  ))
					.update("biz_email"   , inv.getParameter("biz_email"  ))
					.update("biz_hp_no"  , inv.getParameter("biz_hp_no" ))
					.update("biz_tel_no"  , inv.getParameter("biz_tel_no" ))
					.update("biz_fax_no"  , inv.getParameter("biz_fax_no" ))

					.update("cust_id"     , inv.getParameter("cust_id"    ))

					.update("reve_nm"     , inv.getParameter("reve_nm"    ))
					.update("reve_state"  , inv.getParameter("reve_state" ))
					.update("reve_city"   , inv.getParameter("reve_city"  ))
					.update("reve_dong"   , inv.getParameter("reve_dong"  ))
					.update("reve_zip_cd" , inv.getParameter("reve_zip_cd"))
					.update("reve_addr_1"  , inv.getParameter("reve_state" ) + " " + inv.getParameter("reve_city") + " " + inv.getParameter("reve_dong"))
					.update("reve_addr_2"  , inv.getParameter("reve_addr_2" ))
					.update("reve_email"  , inv.getParameter("reve_email" ))
					.update("reve_hp_no" , inv.getParameter("reve_hp_no"))
					.update("reve_tel_no" , inv.getParameter("reve_tel_no"))
					.update("reve_fax_no" , inv.getParameter("reve_fax_no"))

					.insert("rest_qty"    , inv.getParameter("qty"), rowaction==Action.insert)
					.update("rest_qty"    , new SqlParamText(":qty-ship_qty"), rowaction==Action.update)

					.action = rowaction;
	        	data.attach();

	        	SqlResultMap product = inv.getParameter("product", SqlResultMap.class) ;
	        	if (product != null) {
	        		setInvoiceDetail(arg, data,  product, inv );
	        	}

        		/* 주문 정보를 업데이트 한다. */
    			double work_ori = Double.parseDouble(inv.getParamText("_qty")) ;
    			double work_qty = Double.parseDouble(inv.getParamText("qty")) ;

        		if (rowaction == Action.update && work_ori != work_qty ) {
    	        	// 발주요청 수량, 상태 변경
    				data.param
    					.query(" update po_order a                                          ")
    					.query(" set (a.rest_qty, a.sts_cd) = (                               ")
    					.query("	  select sum(b.rest_qty)                                  ")
    					.query("	       , case when a.sts_cd < '0200' then a.sts_cd        ") // 승인전 상태라면 이전 상태를 유지
    					.query("	         else                                             ")
    					.query("	             case when sum(b.rest_qty)   <= 0 then '0500' ") // 배송완료
    					.query("                       when a.qty=sum(b.rest_qty) then '0200' ") // 배송대기
    					.query("	                   else '0400'                            ") // 부분배송
    					.query("	             end                                          ")
    					.query("	         end                                              ")
    					.query("	  from  po_order_item b                                      ")
    					.query("	  where b.inv_no  = a.inv_no                              ")
    					.query("	)                                                         ")
    					.query(" where a.inv_no  = :inv_no   ", inv.fixParameter("inv_no"     ))
    					.action = Action.direct;
    				data.attach();
        		}
			}
		}

		data.execute();
		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 *
	 * @param data
	 * @param map
	 * @throws Exception
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultMap map ,SqlResultRow inv) throws Exception {

		for(SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				// 발주상세 삭제
	        	data.param
        			.table("po_order_item")
        			.where("where inv_no  = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

			} else {

				// 발주상세 등록/수정
	        	data.param
	    			.table("po_order_item")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
		        	//
					.unique("hq_id"   , row.getParameter("hq_id"  ))
					.unique("stor_grp"   , row.getParameter("stor_grp"  ))
					.unique("stor_id"   , row.getParameter("stor_id"  ))
					.update("wrhs_id"   , inv.getParameter("wrhs_id"  ))
					.unique("inv_no"     , row.getParameter("inv_no"    ))
					.unique("line_seqn"    , row.getParameter("line_seqn"   ))
					.insert("seq_top"    , row.getParameter("seq_top"   ))
					.update("seq_dsp"    , row.getParameter("seq_dsp"   ))
					.update("ret_yn"     , row.getParameter("ret_yn"    ))
					.update("safe_dt"    , row.getParameter("safe_dt"   ))
					.insert("item_idcd"    , row.getParameter("item_idcd"   ))
					.insert("item_code"    , row.getParameter("item_code"   ))
					.update("item_name"    , row.getParameter("item_name"   ))
					.update("item_spec"    , row.getParameter("item_spec"   ))
					.insert("unit_idcd"    , row.getParameter("unit_idcd"   ))
					.insert("unt_qty"   , row.getParameter("unt_qty"  ))
					.insert("stk_itm_id"   , row.getParameter("stk_itm_id"   ))

					.update("notax_yn"   , row.getParameter("notax_yn"  ))
					.update("unit_price" , row.getParameter("unit_price"))
					.update("price"      , row.getParameter("price"     ))
					.update("qty"        , row.getParameter("qty"       ))
					.insert("org_ord_qty"   , row.getParameter("qty"       ))
					.update("tax_free"   , row.getParameter("tax_free"  ))
					.update("taxation"   , row.getParameter("taxation"  ))
					.update("sply_amt"   , row.getParameter("sply_amt"  ))
					.update("tax"        , row.getParameter("tax"       ))
					.update("amount"     , row.getParameter("amount"    ))
					.update("user_memo"  , row.getParameter("user_memo" ))
					.update("row_sts"  , row.getParameter("row_sts" ))
					.update("upt_id"  , row.getParameter("upt_id" ))
					.update("upt_ip"  , arg.remoteAddress )
					.insert("crt_id"  , row.getParameter("crt_id" ))
					.insert("crt_ip"  , arg.remoteAddress)
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					.insert("rest_qty"   , row.getParameter("qty"), rowaction==Action.insert)
					.update("rest_qty"   , new SqlParamText(":qty-ship_qty"), rowaction==Action.update)

					.action = rowaction;
	        	data.attach();
			}
		}
	}

	/**
	 * 상품검색
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select  a.stor_grp  , a.stor_id ")
			.query("     ,  b.item_idcd    , b.item_code  , b.item_name     , b.item_ds  , b.item_spec , b.unt_qty    		  ")
			.query("     ,  b.unit_idcd    ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,  a.po_pri    , b.notax_yn , b.stk_itm_id  ")
			.query("     ,  b.cst_pri   , s.stock    , b.brcd_1 as barcode								")
			.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
			.query("	 , (select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) 
			.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
			.query("	 ,  b.mfg_id       , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
		;
		data.param // 조건
			.query("from    itm_stor      a                               ")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("and     a.row_sts  = 0 " )
		;

		return data.selectForMap();
	}


	/**
	 * 상품검색
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getProductExcel(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 쿼리문  입력
			.query("select  a.stor_grp     , a.stor_id ")
			.query("     ,  b.unit_idcd      , b.unt_qty   ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_ds  , b.item_spec      ")
			.query("     ,  b.cst_pri   , s.stock    , b.stk_itm_id , b.brcd_1 as barcode ")
			.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
			.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
			.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id ) as  vend_nm  " )
			.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
			.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
			.query("     ,  a.po_pri  , a.po_pri_type, a.po_pri_rt " )
			.query("     ,  b.notax_yn                                      ")
			.query("from    itm_stor      a                               ")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     b.item_idcd    in (select item_idcd from scan_mst  where scan_cd = :item_code  group by item_idcd) " , arg.fixParameter("item_code"  ))
			.query("and     a.row_sts  = 0 " )
		;

		return data.selectForMap();
	}

	/**
	 * 배송정보
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */


	public SqlResultMap getReceiver(HttpRequestArgument arg) throws Exception {

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String stor_id = "";
		String vend_id  = "";
		String vend_nm  = "";
		String vend_gb  = "";

		for (SqlResultRow row:map) {
			stor_id = row.getParamText("stor_id");
			vend_id  = row.getParamText("vend_id");
			vend_nm  = row.getParamText("vend_nm");
			vend_gb  = row.getParamText("vend_gb");
		}

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select '" + vend_id + "' as vend_id       ")
			.query("      ,'" + vend_nm + "' as vend_nm       ")
			.query("      ,'" + vend_gb + "' as vend_gb       ")
			.query("      ,a.stor_nm        as reve_nm       ")
			.query("      ,a.state           as reve_state    ")
			.query("      ,a.city            as reve_city     ")
			.query("      ,a.dong            as reve_dong     ")
			.query("      ,a.zip_cd          as reve_zip_cd   ")
			.query("      ,a.addr_1           as reve_addr_1    ")
			.query("      ,a.addr_2           as reve_addr_2    ")
			.query("      ,a.biz_email           as reve_email    ")
			.query("      ,a.biz_hp_no          as reve_hp_no   ")
			.query("      ,a.biz_tel_no          as reve_tel_no   ")
			.query("      ,a.biz_fax_no          as reve_fax_no   ")
			.query("      ,b.biz_no                           ")
			.query("      ,b.biz_nm                           ")
			.query("      ,b.biz_type                         ")
			.query("      ,b.biz_type                        ")
			.query("      ,b.biz_owner                        ")
			.query("      ,b.biz_state                        ")
			.query("      ,b.biz_city                         ")
			.query("      ,b.biz_dong                         ")
			.query("      ,b.biz_zip_cd                       ")
			.query("      ,b.biz_addr_1                        ")
			.query("      ,b.biz_addr_2                        ")
			.query("      ,b.biz_email                        ")
			.query("      ,b.biz_hp_no                       ")
			.query("      ,b.biz_tel_no                       ")
			.query("      ,b.biz_fax_no                       ")
			.query("      ,b.biz_gb                           ")
			.query("  from stor a                            ")
			.query("       join vend_mst b                   ")
			.query("         on b.vend_id = '" + vend_id + "' ")
			.query(" where a.stor_id = '" + stor_id + "'    ")
		;

		return data.selectForMap();
	}

	/**
	 * 출력
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  c.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  c.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  c.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  c.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  c.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  c.biz_addr_1   	as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  c.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  c.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  c.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.stor_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1   		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2   		as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  	as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, a.qty 			as qty 												") /* 수량 */
			.query("	, a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
			.query("	, a.tax  			as tax 												") /* 세액 */
			.query("	, a.amount 			as amount 											") /* 계 */
			.query("	, a.user_memo 		as user_memo  										") /* 요청메모 */
			.query("	, dbo.today_char() as print_dt 											") /* 발행일자 */
			.query("	, (substring(a.crt_dttm, 0,4) + '-' + substring(a.crt_dttm, 5,2) + '-' + substring(a.crt_dttm, 7,2) ") /* 등록일자 */
			.query("	  + ' ' + substring(a.crt_dttm, 9,2) + ':' + substring(a.crt_dttm, 11,2) + ':' + substring(a.crt_dttm, 13,2)) as crt_dttm ") /* 등록일자 */
			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */
			.query("    , (select emp_nm from usr_mst where emp_id = a.inv_usr_id) as inv_usr_nm	") /* 발주자명 */

			.query(" from po_order a															")
			.query("	  join stor b on a.stor_id = b.stor_id								")
			.query("	  left outer join vend_mst c on a.vend_id = c.vend_id					")
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
				.query("	,   b.brcd_1      as barcode	 											") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 									") /* 품목 / 규격 */
				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('(' + a.unt_qty + ')') as unt_qty   									") /* 포장량 */
				.query("	,   a.qty 			as qty 													") /* 수량 */
				.query("	,   a.price 		as price 												") /* 단가 */
				.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
				.query("	,   a.tax 			as tax 													") /* 세액 */
				.query("	,   a.amount 		as amount 												") /* 합계 */
				.query("  from  po_order_item a 														")
				.query("		join itm_mst b on a.item_idcd = b.item_idcd 								")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
				.query("   and  a.qty   <> 0	 														")
				.query("order by line_seqn		 														")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

	/**
	 * 주문상태 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getStsCd(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select sts_cd           ")
			.query("  from po_order         ")
			.query(" where inv_no = :inv_no ", arg.fixParameter("inv_no"))
		;

		return data.selectForMap();
	}
}
