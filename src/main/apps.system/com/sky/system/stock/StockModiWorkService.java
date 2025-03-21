package com.sky.system.stock;

import java.util.StringTokenizer;

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
public class StockModiWorkService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.amount) as amount ")
		;
		data.param // 조회
			.query("select a.inv_no                          ")
			.query("      ,a.inv_dt                          ")
			.query("      ,isnull(b.emp_nm, '') as inv_usr_nm ")
			.query("      ,a.amount                          ")
			.query("      ,a.user_memo                       ")
			.query("      ,a.row_clos                       ")
			.query("      ,a.sts_cd                          ")
			.query("      ,a.qty 	                         ")
		;
		data.param // 조건
			.where("  from modi_info a                       ")
			.where("       left outer join usr_mst b       ")
			.where("         on b.emp_id = a.inv_usr_id    ")
			.where(" where a.inv_gb = '1' -- 조정            ")
			.where("   and a.stor_id = :stor_id            ", arg.getParameter("stor_id"))
			.where("   and a.inv_dt between :fr_dt           ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt           ", arg.fixParameter("to_dt"))
			.where("   and a.row_sts = 0 				     ")
			.where(" order by a.inv_no desc                  ")
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
		.query("select a.inv_no                    ")
		.query("      ,a.line_seqn                   ")
		.query("      ,a.seq_dsp                   ")
		.query("      ,a.item_idcd                   ")
		.query("      ,a.item_code                   ")
		.query("      ,a.item_name                   ")
		.query("      ,a.item_spec                   ")
		.query("      ,a.unit_idcd                   ")
		.query("      ,r.bas_nm as brand_nm       ") 
		.query("      ,m.bas_nm as mfg_nm         ")
		.query("      ,b.unit_name                   ")
		.query("      ,a.unt_qty                  ")
		.query("      ,a.qty                       ")
		.query("      ,a.price                     ")
		.query("      ,a.sply_amt                  ")
		.query("      ,a.tax                       ")
		.query("      ,a.amount                    ")
		.query("      ,a.user_memo                 ")
		.query("  from modi_item a                 ")
		.query("       left outer join item_unit b ")
		.query("          on b.unit_idcd = a.unit_idcd ")
		.query("       left outer join itm_mst i ")
		.query("         on i.item_idcd = a.item_idcd  ")
		.query("       left outer join base_mst r ")
		.query("         on r.bas_id = i.brand_id ")
		.query("       left outer join base_mst m ")
		.query("         on m.bas_id = i.mfg_id   ")
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
		.query("select a.inv_no                          ")
		.query("      ,a.inv_dt                          ")
		.query("      ,a.inv_dept_id                     ")
		.query("      ,a.inv_usr_id      as inv_usr_id ")
		.query("      ,isnull(b.emp_nm, '') as inv_usr_nm ")
		.query("      ,a.user_memo                       ")
		.query("      ,a.tax_type                        ")
		.query("      ,a.tax_rt                        ")
		.query("      ,a.tax_free                        ")
		.query("      ,a.taxation                        ")
		.query("      ,a.sply_amt                        ")
		.query("      ,a.tax                             ")
		.query("      ,a.amount                          ")
		.query("      ,a.qty                             ")
		.query("  from modi_info a                       ")
		.query("       left outer join usr_mst b       ")
		.query("         on b.emp_id = a.inv_usr_id    ")
		.query(" where a.inv_gb = '1'                    ")  //-- 조정 
		.query("   and a.row_sts = 0 				     ")
		.query("   and a.inv_no = :inv_no                ", arg.fixParameter("inv_no" ))
		;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param // 쿼리문  입력
			.query("select a.inv_no                      ")
			.query("      ,a.line_seqn                     ")
			.query("      ,a.seq_top                     ")
			.query("      ,a.seq_dsp                     ")
			.query("      ,a.item_idcd                     ")
			.query("      ,a.item_code                     ")
			.query("      ,a.item_name                     ")
			.query("      ,a.item_spec                     ")
			.query("      ,a.mst_itm_id                     ")
			.query("      ,a.mst_itm_cd                     ")
			.query("      ,a.unit_idcd                     ")
			.query("      ,b.unit_name                     ")
			.query("      ,a.unt_qty                    ")
			.query("      ,a.notax_yn                    ")
			.query("      ,a.unit_price                  ")
			.query("      ,a.item_halin                  ")
			.query("      ,a.price                       ")
			.query("      ,a.qty                         ")
			.query("      ,a.tax_free                    ")
			.query("      ,a.taxation                    ")
			.query("      ,a.sply_amt                    ")
			.query("      ,a.tax                         ")
			.query("      ,a.amount                      ")
			.query("      ,a.user_memo                   ")
			.query("      ,case when (select count(1) from modi_item where inv_no = a.inv_no and seq_top = a.line_seqn and seq_dsp is null) > 0 then '0' ")
			.query("            when a.seq_dsp is null then to_char(a.seq_top)                                                                         ")
			.query("            else ''                                                                                                                ")
			.query("       end as prnt_id                                                                                                            ")
			.query("      ,a.seq_qty                                                                                                                   ")
			.query("  from modi_item a                   ")
			.query("       left outer join item_unit b   ")
			.query("          on b.unit_idcd = a.unit_idcd   ")
			.query(" where a.inv_no = :inv_no            ", arg.fixParameter("inv_no"))
			.query("   and a.row_sts = 0 				 ")
			.query(" order by a.seq_top, a.line_seqn       ")
			;

			info.get(0).put("product", data.selectForMap());

			return info;
		}

		return info;
	}
	
	/**
	 * invoice master 등록/수정/삭제
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				
				throw new ServiceException("삭제불가");
		
//				// master 삭제
//	        	data.param
//        			.table("modi_info")
//        			.where("where inv_no = :inv_no              ")
//        			//
//        			.unique("inv_no" , row.fixParameter("inv_no"))
//        			.action = rowaction;
//        		data.attach();
//
//				// detail 삭제
//	        	data.param
//        			.table("modi_item")
//        			.where("where inv_no = :inv_no              ")
//        			//
//        			.unique("inv_no" , row.fixParameter("inv_no"))
//        			.action = rowaction;
//	        	data.attach();
//
//				// 재고(입출고 대장) 삭제
//	        	data.param
//        			.table("stock_ledger")
//        			.where("where inv_no = :inv_no              ")
//        			//
//        			.unique("inv_no" , row.fixParameter("inv_no"))
//        			.action = rowaction;
//	        	data.attach();

			} else {
				// master 등록/수정
	        	data.param
	    			.table("modi_info")
	    			.where("where inv_no = :inv_no ")
		        	//
					.insert("corp_id"    , row.getParameter("corp_id"   ))
					.insert("hq_id"    , row.getParameter("hq_id"   ))
					.update("stor_grp"    , row.getParameter("stor_grp"   ))
					.update("stor_id"    , row.getParameter("stor_id"   ))
					.insert("pos_no"      , row.getParameter("pos_no"     ))
					.unique("inv_no"      , row.fixParameter("inv_no"     ))
					.update("inv_dt"      , row.getParameter("inv_dt"     ))
					.update("inv_tm"      , row.getParameter("inv_tm"     ))
					.insert("inv_gb"      , row.getParameter("inv_gb"     ))
					.update("inv_dept_id" , row.getParameter("inv_dept_id"))
					.update("inv_usr_id" , row.getParameter("inv_usr_id"))
					.update("tax_type"    , row.getParameter("tax_type"   ))
					.update("tax_rt"    , row.getParameter("tax_rt"   ))
					.update("tax_free"    , row.getParameter("tax_free"   ))
					.update("taxation"    , row.getParameter("taxation"   ))
					.update("sply_amt"    , row.getParameter("sply_amt"   ))
					.update("tax"         , row.getParameter("tax"        ))
					.update("amount"      , row.getParameter("amount"     ))
					.update("qty"         , row.getParameter("qty"        ))
					.update("user_memo"   , row.getParameter("user_memo"  ))
//					.update("sys_memo"   , row.getParameter("sys_memo"  ))
//					.update("row_clos"   , row.getParameter("row_clos"  ))
//					.update("row_ord"   , row.getParameter("row_ord"  ))
//					.update("row_sts"   , row.getParameter("row_sts"  ))
					.update("upt_nm"   , row.getParameter("upt_nm"  ))
					.update("upt_ip"   , arg.remoteAddress			   )
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_nm"   , row.getParameter("crt_nm"  ))
					.insert("crt_ip"   , arg.remoteAddress			   )
					.insert("crt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("reason_id"   , row.getParameter("reason_id"))
					.update("custom_id"   , row.getParameter("custom_id"))
					.update("custom_nm"   , row.getParameter("custom_nm"))
					.insert("custom_gb"   , row.getParameter("custom_gb"))
					.action = rowaction;
	        	data.attach();

	        	if(row.getParameter("product", SqlResultMap.class) != null) {
	        		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
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
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				
				// detail 삭제
	        	data.param
        			.table("modi_item")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();
        		
				// 재고(입출고 대장) 삭제
	        	data.param
        			.table("stock_ledger")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

			} else {
				// detail 등록/수정
	        	data.param
	    			.table("modi_item")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
		        	//
					.insert("hq_id"   , row.getParameter("hq_id"  ))
					.insert("stor_grp"   , row.getParameter("stor_grp"  ))
					.insert("stor_id"   , row.getParameter("stor_id"  ))
					.unique("inv_no"     , row.getParameter("inv_no"    ))
					.unique("line_seqn"    , row.getParameter("line_seqn"   ))
					.update("seq_top"    , row.getParameter("seq_top"   ))
					.update("seq_dsp"    , row.getParameter("seq_dsp"   ))
					.update("mst_itm_id"    , row.getParameter("mst_itm_id"   ))
					.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"   ))
					.update("unit_idcd"    , row.getParameter("unit_idcd"   ))
					.update("unt_qty"   , row.getParameter("unt_qty"  ))
					.update("item_idcd"    , row.getParameter("item_idcd"   ))
					.update("item_code"    , row.getParameter("item_code"   ))
					.update("item_name"    , row.getParameter("item_name"   ))
					.update("item_spec"    , row.getParameter("item_spec"   ))
					.update("notax_yn"   , row.getParameter("notax_yn"  ))
					.update("unit_price" , row.getParameter("unit_price"))
					.update("item_halin" , row.getParameter("item_halin"))
					.update("price"      , row.getParameter("price"     ))
					.update("qty"        , row.getParameter("qty"       ))
					.update("tax_free"   , row.getParameter("tax_free"  ))
					.update("taxation"   , row.getParameter("taxation"  ))
					.update("sply_amt"   , row.getParameter("sply_amt"  ))
					.update("tax"        , row.getParameter("tax"       ))
					.update("amount"     , row.getParameter("amount"    ))
					.update("user_memo"  , row.getParameter("user_memo" ))
//					.update("sys_memo"  , row.getParameter("sys_memo" ))
//					.update("row_ord"  , row.getParameter("row_ord" ))
//					.update("row_sts"  , row.getParameter("row_sts" ))
					.update("upt_nm"  , row.getParameter("crt_nm" ))
					.update("upt_ip"  , arg.remoteAddress			 )
					.update("upt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_nm"  , row.getParameter("crt_nm" ))
					.insert("crt_ip"  , arg.remoteAddress			 )
					.insert("crt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.update("seq_qty"    , row.getParameter("seq_qty"   ))
					.action = rowaction;
	        	data.attach();
	        	
	        	String unt_qty = (String) row.getParameter("unt_qty");
	        	unt_qty = "".equals(unt_qty)? "0" : unt_qty;
	        	String qty = (String) row.getParameter("qty");
	        	qty = "".equals(qty)? "0" : qty;
	        	
				// 재고(입출고 대장) 등록/수정
	        	data.param
	    			.table("stock_ledger")
        			.where("where inv_no = :inv_no ")
        			.where("  and line_seqn = :line_seqn    ")
		        	//
					.insert("hq_id"   , row.getParameter("hq_id"   ))
					.update("stor_grp"   , row.getParameter("stor_grp"   ))
					.update("stor_id"   , row.getParameter("stor_id"   ))
					.unique("inv_no"     , row.getParameter("inv_no"     ))
					.unique("line_seqn"    , row.getParameter("line_seqn"    ))
//					.update("ori_no"     , row.getParameter("ori_no"     ))
//					.update("ori_seq"    , row.getParameter("ori_seq"    ))
//					.insert("inv_dt"     , row.getParameter("inv_dt"     ))
					.insert("inv_gb"     , new SqlParamText("'1'"        )) // '0':모름/'1':출고(매출,이동출고,이동입고,재고조정)/'2':입고(매입)
					.insert("inv_wk"     , new SqlParamText("'2071305'"  )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정
					.update("dept_id"    , mst.getParameter("inv_dept_id"))
					.update("emp_id"    , mst.getParameter("inv_usr_id"))
					.update("cust_id"    , mst.getParameter("stor_id"   )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
//					.update("mmb_id"    , mst.getParameter("mmb_id"    )) // 매출인 경우만 맴버ID
					.update("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
					.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"    ))
					.update("unit_idcd"    , row.getParameter("unit_idcd"    ))
					.update("unt_qty"   , row.getParameter("unt_qty"   ))
					.update("item_idcd"    , row.getParameter("item_idcd"    ))
					.update("item_code"    , row.getParameter("item_code"    ))
//					.update("stock"      , new SqlParamText(String.valueOf(Integer.parseInt(unt_qty) * Integer.parseInt(qty)))) // 재고조정은 플러스
					.update("stock"      , new SqlParamText(String.valueOf(Integer.parseInt(qty)))) // 재고조정은 플러스
					.update("eaqty"      , new SqlParamText(String.valueOf(Integer.parseInt(unt_qty) * Integer.parseInt(qty)))) // 재고조정은 플러스
					.update("qty"        , row.getParameter("qty"        ))
					.update("price"      , row.getParameter("price"      ))
					.update("amount"     , row.getParameter("amount"     ))
					.update("po_pri"   , row.getParameter("price"      )) // 매장간 거래는 매입단가 = 판매단가 
					.update("po_amount"  , row.getParameter("amount"     )) // 매장간 거래는 매입금액 = 판매금액
					.update("user_memo"  , row.getParameter("user_memo"  ))
//					.update("sys_memo"  , row.getParameter("sys_memo"  ))
//					.update("row_ord"  , row.getParameter("row_ord"  ))
//					.update("row_sts"  , row.getParameter("row_sts"  ))
					.update("upt_nm"  , row.getParameter("upt_nm"  ))
					.update("upt_ip"  , arg.remoteAddress			  )
					.update("upt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_nm"  , row.getParameter("crt_nm"  ))
					.insert("crt_ip"  , arg.remoteAddress			  )
					.insert("crt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("price_no"   , new SqlParamText("'9'"        )) // 거래처 단가 번호 [ 1~5 출하가/6:소비자가/7:포스가/8:B2C/9:구매가/10:직원가/11:B2B ]
					.update("unit_price" , row.getParameter("unit_price" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
					.update("cust_price" , row.getParameter("price"      )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
					.update("notax_yn"   , row.getParameter("notax_yn"   ))
					.update("tax_type"   , mst.getParameter("tax_type"   ))
					.update("tax_rt"   , mst.getParameter("tax_rt"   ))
					.update("sply_amt"   , row.getParameter("sply_amt"   ))
					.update("tax"        , row.getParameter("tax"        ))
					.action = rowaction;
	        	data.attach();
			}
		}
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
		 	.query("select sts_cd, qty from modi_info where inv_no = :inv_no", arg.fixParameter("inv_no"))
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
		if ("0500".equals(work_stscd)) {
        	data.param
	    		.table("modi_item")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"   , arg.fixParameter("inv_no"))
	    		.update("row_sts", 2)
				.update("upt_nm", arg.getParameter("upt_nm"))
				.update("upt_ip", arg.remoteAddress)
				.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
	    	;data.attach(Action.update);
			
	    	data.param
				.table("modi_info")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"   , arg.fixParameter("inv_no"))
	    		.update("row_sts", 2)
				.update("upt_nm", arg.getParameter("upt_nm"))
				.update("upt_ip", arg.remoteAddress)
				.update("upt_dttm", new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
	    	;data.attach(Action.update);
	    	
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
	 * 상품검색
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getStockItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select  a.stor_grp     , a.stor_id                            ")
			.query("   ,    a.mst_itm_id      , b.mst_itm_cd   , b.unt_qty              ")
			.query("   ,    b.item_idcd      , b.item_code   , b.item_name  , b.item_spec  ")
			.query("   ,    b.unit_idcd      , b.mfg_id    , b.brand_id , b.notax_yn ")
			.query("   ,    (select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name   ")
			.query("   ,    (select bas_nm from base_mst where bas_id = b.mfg_id) as mfg_nm     ")
			.query("   ,    (select bas_nm from base_mst where bas_id = b.brand_id) as brand_nm ")
			.query("   ,    case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		;
		data.param // 조건
			.where("  from   itm_stor      a                           ")
			.where("         join itm_mst  b on b.item_idcd = a.item_idcd  ")
			.where("  where  a.stor_id    = :stor_id    " , arg.fixParameter("stor_id"  ))
		;

		if (!"".equals( arg.getParamText("item_name"   ) )){
			StringTokenizer st = new StringTokenizer(arg.getParamText("item_name"   )," ");
			if (st.countTokens() == 1) {
				data.param.where(" and  b.find_name like %:find_name% " , st.nextToken().toLowerCase());	
			} else {
				int i = 0;
				String and = "";
				data.param.where(" and  (  ");
				while(st.hasMoreTokens()){
					data.param.where( and +  " b.find_name like %:find_name" + i++ + "% " , st.nextToken().toLowerCase()  );	
					and = " and ";
				}
				data.param.where(" ) ");	
			}
		}
		
		data.param // 조건문 입력
			.where("  and    a.item_idcd  in ( select item_idcd  from scan_mst  where scan_cd like :scan_cd% ) " , arg.getParameter("barcode"   ))
			.where("  and    b.class_id in ( select class_id from item_class start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))
			.where("  and    b.mfg_id     = :mfg_id       " , arg.getParameter("mfg_id"   ))
			.where("  and    b.brand_id   = :brand_id     " , arg.getParameter("brand_id" ))
			.where("  and    a.vend_id    = :vend_id      " , arg.getParameter("vend_id"  ))
			.where("  and    a.row_sts  = :row_sts    " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우 
			.where("  and    a.row_sts <= :row_sts    " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우 
		;
		
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
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
		
		data.param // 쿼리문  입력
		.query("select * from ( ")
		.query("select  a.stor_grp     , a.stor_id ")
		.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
		.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
		.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_spec      ")
		.query("     ,  b.cst_pri   , s.stock ")
		.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
		.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
		.query("     ,  b.vend_id as pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.vend_id ) as  pack_vend_nm  " ) 
		.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
		.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
		.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
		.query("     ,  decode(a.po_pri, 0, b.po_pri, a.po_pri) as po_pri, a.po_pri_type, a.po_pri_rt   ")
		.query("     ,  b.notax_yn                                      ")
		.query("     ,  null as prnt_id                               ")
		.query("     ,  null as seq_qty                                 ")
		.query("     ,  null as row_ord                               ")
		.query("from    itm_stor      a                               ")
		.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
		.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.mst_itm_id = a.mst_itm_id ")
		.query("where   a.stor_id = :stor_id                                                            ", arg.fixParameter("stor_id"))
		.query("and     a.item_idcd in (:item_idcd)                                                           ", item_idcd)
		.query("and     a.bunch_gb in ('0', '2')                                                          ") // 0:일반상품/1:결합상품/2:세트구성
		.query("and     a.row_sts < 2                                                                   ")
		.query("union all                                                                                 ")
		.query("select  a.stor_grp     , a.stor_id ")
		.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
		.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
		.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_spec      ")
		.query("     ,  b.cst_pri   , s.stock ")
		.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
		.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
		.query("     ,  b.vend_id as pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.vend_id ) as  pack_vend_nm  " ) 
		.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
		.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
		.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
		.query("     ,  decode(a.po_pri, 0, b.po_pri, a.po_pri) as po_pri, a.po_pri_type, a.po_pri_rt   ")
		.query("     ,  b.notax_yn                                      ")
		.query("     ,  c.prnt_id                                     ")
		.query("     ,  c.item_qty as seq_qty                           ")
		.query("     ,  c.row_ord                                     ")
		.query("from    itm_stor      a                               ")
		.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
		.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.mst_itm_id = a.mst_itm_id ")
		.query("        join (select a.* from item_bunch a join itm_stor b on b.stor_id = a.stor_id and b.item_idcd = a.item_idcd   where b.bunch_gb = '1' ")
		.query("              union all                                                                                                                    ")
		.query("              select a.* from item_bunch a join itm_stor b on b.stor_id = a.stor_id and b.item_idcd = a.prnt_id where b.bunch_gb = '1' ")
		.query("             ) c on c.stor_id = a.stor_id and c.item_idcd = a.item_idcd                                                                      ")
		.query("where   a.stor_id = :stor_id                                                            ", arg.fixParameter("stor_id"))
		.query("and     ( a.item_idcd in (select item_idcd from item_bunch where item_idcd in (:item_idcd) and prnt_id = '0')                                                         ", item_idcd)
		.query("        or                                                                                ")
		.query("          a.item_idcd in (select item_idcd from item_bunch where prnt_id in (:item_idcd))     ", item_idcd)
		.query("        )                                                                                 ")
		.query("and     a.row_sts < 2                                                                   ")
		.query(")                                                                                         ")
		.query("order by decode(prnt_id, '0', item_idcd, prnt_id), row_ord                            ")
		;
		
		return data.selectForMap();
	}	
}
