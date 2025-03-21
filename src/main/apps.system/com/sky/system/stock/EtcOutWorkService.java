package com.sky.system.stock;

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

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

@Service
public class EtcOutWorkService  extends DefaultServiceHandler {

//	private final Logger logger = LoggerFactory.getLogger(this.getClass());

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
			.total("select count(1) as maxsize , sum(-a.amount) as amount ")
		;
		data.param // 조회
			.query("select a.row_clos                       ")
			.query("      ,c.stor_nm                        ")
			.query("      ,a.inv_no                          ")
			.query("      ,a.inv_dt                          ")
			.query("      ,a.custom_gb                       ")
			.query("      ,a.custom_id                       ")
			.query("      ,a.custom_nm                       ")
			.query("      ,d.emp_nm as inv_usr_nm          ")
			.query("      ,a.reason_id                       ")
			.query("      ,(select bas_nm from base_mst where bas_id = a.reason_id ) as reason_nm ")
			
			.query("      ,-a.amount as amount  	         ")
			.query("      ,a.user_memo                       ")
			.query("      ,a.sts_cd                          ")
			.query("      ,a.qty                             ")
		;
		data.param // 조건
			.where("  from modi_info a                       ")
		;
		
//		String item_idcd = arg.getParamText("item_idcd");
//		if (!"".equals(item_idcd)) {
//			data.param // 조건
//				.where("       join (                            ")
//				.where("            select inv_no                ")
//				.where("              from modi_item             ")
//				.where("             where item_idcd = :item_idcd    ", arg.getParameter("item_idcd"))
//				.where("             group by inv_no             ")
//				.where("            ) b                          ")
//				.where("         on b.inv_no = a.inv_no          ")
//			;
//		}
		
		data.param // 조건
			.where("       left outer join store c           ")
			.where("         on c.stor_id = a.stor_id      ")
			.where("       left outer join usr_mst d       ")
			.where("         on d.emp_id = a.inv_usr_id    ")
			.where(" where a.inv_gb = '3'                    ") // 기타출고전표관리
			.where("   and a.row_sts = 0 				     ")
			.where("   and a.stor_grp = :stor_grp            ", arg.fixParameter("stor_grp"))
			.where("   and a.stor_id = :stor_id            ", arg.getParameter("stor_id"))
			.where("   and a.inv_dt between :fr_dt           ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt           ", arg.fixParameter("to_dt"))
			.where("   and a.row_clos = :row_clos          ", arg.getParameter("row_clos"))
			.where("   and a.inv_usr_id = :inv_usr_id      ", arg.getParameter("inv_usr_id"))
			.where("   and a.reason_id = :reason_id          ", arg.getParameter("reason_id"))
			.where("   and a.custom_gb = :custom_gb          ", arg.getParameter("custom_gb"))
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
		.query("select a.seq_dsp                   ")
		.query("      ,a.item_code                   ")
		.query("      ,a.item_name                   ")
		.query("      ,a.item_spec                   ")
		.query("      ,b.unit_name                   ")
		.query("      ,a.unt_qty                  ")
		.query("      ,-a.qty    as qty            ")
		.query("      ,a.price                     ")
		.query("      ,-a.amount as amount         ")
		.query("      ,a.user_memo                 ")
		.query("  from modi_item a                 ")
		.query("       left outer join item_unit b ")
		.query("          on b.unit_idcd = a.unit_idcd ")
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
		.query("select a.inv_no                                                                  ")
		.query("      ,a.inv_dt                                                                  ")
		.query("      ,a.inv_dept_id                                                             ")
		.query("      ,a.inv_usr_id      as inv_usr_id                                         ")
		.query("      ,isnull(b.emp_nm, '') as inv_usr_nm                                         ")
		.query("      ,a.reason_id                                                               ")
		.query("      ,(select bas_nm from base_mst where bas_id = a.reason_id ) as reason_nm ")
		.query("      ,a.custom_id                                                               ")
		.query("      ,a.custom_nm                                                               ")
		.query("      ,a.custom_gb                                                               ")
		.query("      ,a.user_memo                                                               ")
		.query("      ,a.tax_type                                                                ")
		.query("      ,a.tax_rt                                                                ")
		.query("      ,-a.tax_free        as tax_free                                            ")
		.query("      ,-a.taxation        as taxation                                            ")
		.query("      ,-a.sply_amt        as sply_amt                                            ")
		.query("      ,-a.tax             as tax                                                 ")
		.query("      ,-a.amount          as amount                                              ")
		.query("      ,-a.qty             as qty                                                 ")
		.query("  from modi_info a                                                               ")
		.query("       left outer join usr_mst b                                               ")
		.query("         on b.emp_id = a.inv_usr_id                                            ")
		.query(" where a.inv_gb = '3'                                                            ") // 기타출고전표관리
		.query("   and a.row_sts = 0 				                                             ")
		.query("   and a.inv_no = :inv_no                                                        ", arg.fixParameter("inv_no" ))
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
			//.query("      ,a.mst_itm_id                   ")
			//.query("      ,a.mst_itm_cd                   ")
			.query("      ,a.unit_idcd                   ")
			.query("      ,b.unit_name                   ")
			.query("      ,a.unt_qty                  ")
			.query("      ,a.notax_yn                  ")
			.query("      ,a.unit_price                ")
			.query("      ,-a.item_halin as item_halin ")
			.query("      ,a.price                     ")
			.query("      ,-a.qty        as qty        ")
			.query("      ,-a.tax_free   as tax_free   ")
			.query("      ,-a.taxation   as taxation   ")
			.query("      ,-a.sply_amt   as sply_amt   ")
			.query("      ,-a.tax        as tax        ")
			.query("      ,-a.amount     as amount     ")
			.query("      ,a.user_memo                 ")
			.query("  from modi_item a                 ")
			.query("       left outer join item_unit b ")
			.query("          on b.unit_idcd = a.unit_idcd ")
			.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
			.query(" order by a.seq_top, a.line_seqn     ")
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
			String flag = row.getParamText("_flag");
			
			// invoice 등록/수정/삭제
			if (flag == null || "".equals(flag)) {
				
				if (rowaction == Action.delete) {
					
					throw new ServiceException("삭제불가");
					
//					// master 삭제
//		        	data.param
//	        			.table("modi_info")
//	        			.where("where inv_no = :inv_no              ")
//	        			//
//	        			.unique("inv_no" , row.fixParameter("inv_no"))
//	        			.action = rowaction;
//	        		data.attach();
//
//					// detail 삭제
//		        	data.param
//	        			.table("modi_item")
//	        			.where("where inv_no = :inv_no              ")
//	        			//
//	        			.unique("inv_no" , row.fixParameter("inv_no"))
//	        			.action = rowaction;
//		        	data.attach();
//
//					// 재고(입출고 대장) 삭제
//		        	data.param
//	        			.table("stock_ledger")
//	        			.where("where inv_no = :inv_no              ")
//	        			//
//	        			.unique("inv_no" , row.fixParameter("inv_no"))
//	        			.action = rowaction;
//		        	data.attach();

				} else {
					// master 등록/수정
		        	data.param
		    			.table("modi_info")
		    			.where("where inv_no = :inv_no ")
			        	//
						//.insert("corp_id"    , row.getParameter("corp_id"   ))
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
						.update("tax_free"    , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("tax_free")) * -1)))
						.update("taxation"    , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("taxation")) * -1)))
						.update("sply_amt"    , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("sply_amt")) * -1)))
						.update("tax"         , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("tax"))      * -1)))
						.update("amount"      , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("amount"))   * -1)))
						.update("qty"         , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("qty"))      * -1)))
						.update("user_memo"   , row.getParameter("user_memo"  ))
//						.update("sys_memo"   , row.getParameter("sys_memo"  ))
//						.update("row_clos"   , row.getParameter("row_clos"  ))
//						.update("row_ord"   , row.getParameter("row_ord"  ))
//						.update("row_sts"   , row.getParameter("row_sts"  ))
						.update("upt_id"   , row.getParameter("upt_nm"  ))
						.update("upt_ip"   , arg.remoteAddress )
						.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.insert("crt_id"   , row.getParameter("crt_id"  ))
						.insert("crt_ip"   , arg.remoteAddress )
						.insert("crt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.update("reason_id"   , row.getParameter("reason_id"))
						.update("custom_id"   , row.getParameter("custom_id"))
						.update("custom_nm"   , row.getParameter("custom_nm"))
						.update("custom_gb"   , row.getParameter("custom_gb"))
						.action = rowaction;
		        	data.attach();

		        	if(row.getParameter("product", SqlResultMap.class) != null) {
		        		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
		        	}
				}
			}
			// 마감 / 마감해지
			else {
				if (rowaction == Action.update) {
					
		        	data.param
		    			.table("modi_info")
		    			.where("where inv_no = :inv_no ")
			        	//
						.unique("inv_no"      , row.fixParameter("inv_no"     ))
		        		.update("row_clos"   , row.getParameter("row_clos"  ))
						.update("upt_id"   , row.getParameter("upt_id"  ))
						.update("upt_ip"   , arg.remoteAddress )
						.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
						.action = rowaction;
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
					//.update("mst_itm_id"    , row.getParameter("mst_itm_id"   ))
					//.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"   ))
					.update("unit_idcd"    , row.getParameter("unit_idcd"   ))
					.update("unt_qty"   , row.getParameter("unt_qty"  ))
					.update("item_idcd"    , row.getParameter("item_idcd"   ))
					.update("item_code"    , row.getParameter("item_code"   ))
					.update("item_name"    , row.getParameter("item_name"   ))
					.update("item_spec"    , row.getParameter("item_spec"   ))
					.update("notax_yn"   , row.getParameter("notax_yn"  ))
					.update("unit_price" , row.getParameter("unit_price"))
					.update("item_halin" , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("item_halin")) * -1)))
					.update("price"      , row.getParameter("price"     ))
					.update("qty"        , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("qty"))      * -1)))
					.update("tax_free"   , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("tax_free")) * -1)))
					.update("taxation"   , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("taxation")) * -1)))
					.update("sply_amt"   , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("sply_amt")) * -1)))
					.update("tax"        , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("tax"))      * -1)))
					.update("amount"     , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("amount"))   * -1)))
					.update("user_memo"  , row.getParameter("user_memo" ))
//					.update("sys_memo"  , row.getParameter("sys_memo" ))
//					.update("row_ord"  , row.getParameter("row_ord" ))
//					.update("row_sts"  , row.getParameter("row_sts" ))
					.update("upt_id"  , row.getParameter("crt_id" ))
					.update("upt_ip"  , arg.remoteAddress )
					.update("upt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_id"  , row.getParameter("crt_id" ))
					.insert("crt_ip"  , arg.remoteAddress )
					.insert("crt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.action = rowaction;
	        	data.attach();
	        	
//	        	String unt_qty = (String) row.getParameter("unt_qty");
//	        	unt_qty = "".equals(unt_qty)? "0" : unt_qty;
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
					.insert("inv_wk"     , new SqlParamText("'2071306'"  )) // '0000000':모름/'2071301':매출/'2071302':매입/'2071303':이동출고/'2071304':이동입고/'2071305':재고조정/'2071306':기타출고
					.update("dept_id"    , mst.getParameter("inv_dept_id"))
					.update("emp_id"    , mst.getParameter("inv_usr_id"))
					.update("cust_id"    , mst.getParameter("stor_id"   )) // 매출은 고객ID, 매입은 벤더ID, 이동쪽은 매장ID
//					.update("mmb_id"    , mst.getParameter("mmb_id"    )) // 매출인 경우만 맴버ID
					//.update("mst_itm_id"    , row.getParameter("mst_itm_id"    ))
					//.update("mst_itm_cd"    , row.getParameter("mst_itm_cd"    ))
					.update("unit_idcd"    , row.getParameter("unit_idcd"    ))
					.update("unt_qty"   , row.getParameter("unt_qty"   ))
					.update("item_idcd"    , row.getParameter("item_idcd"    ))
					.update("item_code"    , row.getParameter("item_code"    ))
//					.update("stock"      , new SqlParamText(String.valueOf(Integer.parseInt(unt_qty) * Integer.parseInt(qty) * -1))) // '기타 출고 전표 관리'는 마이너스
					.update("stock"      , new SqlParamText(String.valueOf(Integer.parseInt(qty) * -1))) // '기타 출고 전표 관리'는 마이너스
					//.update("eaqty"      , new SqlParamText(String.valueOf(Integer.parseInt(unt_qty) * Integer.parseInt(qty) * -1))) // '기타 출고 전표 관리'는 마이너스
					
					.update("unit_price" , row.getParameter("unit_price" )) // 거래처 판매 단가 [ 상품이 실제 판매 되어야 하는 단가(포스가), 구매/재고 등은 구매가 ]
					.update("cust_price" , row.getParameter("price"      )) // 거래처 납품 단가 [ 가격 번호에 따른 판매 되어야 하는 단가,  구매/재고 등은 구매가 ]
					.update("notax_yn"   , row.getParameter("notax_yn"   ))
					.update("tax_type"   , mst.getParameter("tax_type"   ))
					.update("tax_rt"   , mst.getParameter("tax_rt"   ))
					.update("sply_amt"   , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("sply_amt")) * -1)))
					.update("tax"        , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("tax")) * -1)))
					
					.update("qty"        , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("qty")) * -1)))
					.update("price"      , row.getParameter("price"      ))
					.update("amount"     , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("amount")) * -1)))
					.update("po_pri"   , row.getParameter("price"      )) // 매장간 거래는 매입단가 = 판매단가 
					.update("po_amount"  , new SqlParamText(String.valueOf(Integer.parseInt(row.getParamText("amount")) * -1))) // 매장간 거래는 매입금액 = 판매금액
					.update("user_memo"  , row.getParameter("user_memo"  ))
//					.update("sys_memo"  , row.getParameter("sys_memo"  ))
//					.update("row_ord"  , row.getParameter("row_ord"  ))
//					.update("row_sts"  , row.getParameter("row_sts"  ))
					//.update("upt_nm"  , row.getParameter("upt_nm"  ))
					//.update("upt_ip"  , new SqlParamText("'" + arg.remoteAddress + "'"))
					//.update("upt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					//.insert("crt_nm"  , row.getParameter("crt_nm"  ))
					//.insert("crt_ip"  , new SqlParamText("'" + arg.remoteAddress + "'"))
					//.insert("crt_dttm"  , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					//.insert("price_no"   , new SqlParamText("'9'"        )) // 거래처 단가 번호 [ 1~5 출하가/6:소비자가/7:포스가/8:B2C/9:구매가/10:직원가/11:B2B ]
	        	;data.attach(rowaction);
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
		
		double work_qty   = Math.abs(Double.parseDouble(arg.getParamText("qty")));	// 로컬 수량
		double server_qty = Math.abs(Double.parseDouble(del.getParamText("qty")));	// 서버 수량
		
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
		.query("select  a.stor_grp     , a.stor_id ")
		.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
		.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_spec   , b.unt_qty   ")
		.query("     ,  b.cst_pri   , s.stock ")
		.query("     ,  case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " ) //b.class_id     ,
		//.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
		//.query("     ,  b.vend_id as pack_vend_id , ( select vend_nm from vend_mst where vend_id = b.vend_id ) as  pack_vend_nm  " ) 
		//.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
		.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
		.query("	 ,  b.mfg_id     , ( select bas_nm from base_mst where bas_id = b.mfg_id ) as  mfg_nm  " )
		.query("     ,  a.po_pri , a.po_pri_type, a.po_pri_rt   ")
		.query("     ,  b.notax_yn                                      ")
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
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.addr_1 		  	as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  b.addr_2   		as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1 		  	as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  	as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, -a.qty 			as qty 												") /* 수량 */
			.query("	, -a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
			.query("	, -a.tax  			as tax 												") /* 세액 */
			.query("	, -a.amount 			as amount 											") /* 계 */
//			.query("	, a.req_msg 		as reg_msg  										") /* 요청메모 */
			.query("	, a.user_memo 		as user_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url       as stamp_url										") /* 직인 이미지 URL */
			.query("	, d.emp_nm         as inv_usr_nm 										") /* 작업자명 */
			
			.query(" from modi_info a															")
			.query("	  join store b on a.stor_id = b.stor_id								")
//			.query("	  left outer join store c on a.move_id = c.stor_id						")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id				")
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
				.query("	,   (a.item_name||'/'||a.item_spec) as item_name 									") /* 품목 / 규격 */
				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('('||a.unt_qty||')') as unt_qty   									") /* 포장량 */
				.query("	,   -a.qty 			as qty 													") /* 수량 */
				.query("	,   a.price 		as price 												") /* 단가 */
				.query("	,   -a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
				.query("	,   -a.tax 			as tax 													") /* 세액 */
				.query("	,   -a.amount 		as amount 												") /* 합계 */
				.query("  from  modi_item a 															")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 					")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
				.query("   and  a.row_sts = 0                   										")
				.query("order by line_seqn		 														")	
			;
			info.get(0).put("product", data.selectForMap());
		}
		
		return info;
	}	
	
}
