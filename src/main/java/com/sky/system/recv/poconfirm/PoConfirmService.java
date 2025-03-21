package com.sky.system.recv.poconfirm;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class PoConfirmService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize, sum(a.inv_amt) as inv_amt ")
		;
		data.param // 조회
			.query("select a.row_clos												")
			.query("      ,a.inv_gb													")
			.query("      ,a.vend_gb												")
			.query("      ,b.stor_nm as wareh_nm									")
			.query("      ,a.inv_no													")
			.query("      ,a.inv_dt													")
			.query("      ,a.vend_id												")
			.query("      ,d.vend_cd												")
			.query("      ,a.vend_nm												")
			.query("      ,d.biz_email												")
			.query("      ,d.biz_fax_no												")
			.query("      ,c.emp_nm  as inv_user_nm									")
			.query("      ,a.inv_amt												")
			.query("      ,a.sts_cd													")
			.query("      ,a.user_memo												")
		;
		data.param // 조건
			.where("  from po_mst a													")
			.where("       left outer join stor b     on b.stor_id = a.stor_id		")
			.where("       left outer join usr_mst c  on c.emp_id  = a.inv_usr_id	")
			.where("       join vend_mst d on d.vend_id = a.vend_id ")
			.where(" where a.inv_gb in ('1', '2')         ") // 1:일반발주, 2:통합발주, 3:직납발주
			.where("   and a.row_sts  = 0											")
			.where("   and a.stor_grp = :stor_grp		", arg.fixParameter("stor_grp" ))
			.where("   and a.stor_id  = :stor_id		", arg.getParameter("stor_id" ))

			.where("   and a.inv_dt between :fr_dt		", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt		", arg.fixParameter("to_dt"))
			.where("   and a.vend_id     = :vend_id		", arg.getParameter("vend_id"  ))
			.where("   and a.inv_dept_id = :inv_dept_id	", arg.getParameter("inv_dept_id"  ))
			.where("   and a.inv_usr_id  = :inv_usr_id	", arg.getParameter("inv_usr_id"  ))
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

/*
	public SqlResultMap setConfirm(HttpRequestArgument arg) throws Exception {


		return null;
	}

	public SqlResultMap setCancel(HttpRequestArgument arg) throws Exception {


   		//  주문 번호를 검색 한다.
   		read.clear();
   		read.param
   			.query("select a.hq_id     , a.stor_id   ")
   			.query("     , a.small_grp      , a.small_id    ")
   			.query("     , a.inv_no       , a.sts_cd     ")
   			.query("     , a.tax_type     , a.tax_rt   ")
   			.query("     , a.pnt_type   , a.pnt_rt ")
   			.query("from   po_order   a  				     					      ")
   			.query("where  a.inv_no  = :inv_no ",   arg.fixParameter("inv_no"         ))
   			.query("and    a.row_sts = 0   			     					      ")
   		;
        SqlResultRow inv = read.selectForRow();
        if (inv == null) {
          	throw new ServiceException( "원주문 번호가 올바르지 않습니다.", -99 );
        }
        String sts_cd = inv.getParamText("sts_cd" );
        System.out.println( sts_cd );
		if (!("0200".equals(sts_cd) || "0400".equals(sts_cd) || "0500".equals(sts_cd) || "0600".equals(sts_cd) || "0700".equals(sts_cd) )) {
			throw new ServiceException( "반품 신청 가능 상태가 아닙니다." , -99 );
		}


        // 배송 수량이 존재 하는지 체크 한다.
        Double deli_qty = Double.parseDouble( inv.getParamText("deli_qty"      ))  ;
        if (deli_qty != 0) {
        	throw new ServiceException( "배송 진행중 주문서는 취소 불가능 합니다.", -99 );
        }



		and sts_cd = '0200' and deli_qty = 0

		;


		select  sts_cd , deli_qty
		from   po_order



		return null;

	}

	*/

	/**
	 * master 수정
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String flag      = row.getParamText("_flag");
        	String sts_cd    = row.getParamText("sts_cd");
        	String vend_gb   = row.getParamText("vend_gb");

			if (rowaction == Action.update) {

	        	// 발주마감&마감해지
	        	if ("1".equals(flag)) {

		        	data.param
		    			.table("po_mst")
		    			.where("where inv_no = :inv_no ")
			        	//
						.unique("inv_no"			, row.fixParameter("inv_no"     ))
		        		.update("row_clos"			, row.getParameter("row_clos"  ))
						.update("upt_id"			, row.getParameter("upt_id"  ))
						.update("upt_ip"			, arg.remoteAddress)
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.action = rowaction;
		        	data.attach();

		        	data.param
		    			.table("po_mst")
		    			.where("where inv_no = :inv_no ")
			        	//
						.unique("inv_no"			, row.fixParameter("inv_no"     ))
		        		.update("row_clos"			, row.getParameter("row_clos"  ))
						.update("upt_id"			, row.getParameter("upt_id"  ))
						.update("upt_ip"			, arg.remoteAddress)
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.action = rowaction;
		        	data.attach();
	        	}
	        	// 발주승인&승인취소
	        	else if ("2".equals(flag)) {

		        	// 발주승인
		        	if ("0200".equals(sts_cd)) {

		        		String cur_sts_cd = getStsCd(arg, row.getParamText("inv_no"));
		        		// 현재 문서가 '승인대기' 상태가 아닌 경우
		        		if (!"0010".equals(cur_sts_cd)) {
			        		throw new ServiceException("발주승인에 실패했습니다. 발주상태를 확인하시기 바랍니다.");
		        		}

		        		// 매입사 거래 형태(vend_gb)가 직납인 경우
		        		if ("2".equals(vend_gb)) {
				        	data.param
				    			.table("po_mst")
				    			.where("where inv_no = :inv_no ")
				    			//.where("  and vend_gb = '2'    ")
				    			//.where("  and sts_cd = '0010'  ")
				    			//.where("  and deli_qty = 0     ")
					        	//
								.unique("inv_no"		, row.fixParameter("inv_no"     ))
				        		.update("sts_cd"		, row.getParameter("sts_cd"     ))
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
								.action = rowaction;
				        	data.attach();
		        		}
		        		// 매입사 거래 형태(vend_gb)가 직납이 아닌 경우
		        		else {
				        	// 발주요청정보(po_order, po_order_item)를 발주정보(po_mst, po_item)에 복사
				        	data.param
					        	.query("delete po_mst ")
					        	.query(" where inv_no = :inv_no ", row.fixParameter("inv_no"))
								.action = Action.direct;
				        	data.attach();
				        	data.param
				        		.query("insert into po_mst 																			")
				        		.query("          ( hq_id      , stor_grp   , stor_id    , wrhs_id    , pos_no      , inv_no		")
				        		.query("          , inv_dt     , inv_tm     , inv_gb     , inv_work_gb, inv_dept_id					")
				        		.query("          , inv_usr_id , sts_cd     , org_inv_no , retn_yn    , pack_no     , pack_inv		")
				        		.query("          , vend_id    , vend_nm    , vend_gb    , tax_type   , tax_rt      , txfree_amt	")
				        		.query("          , taxtn_amt  , sply_amt   , tax_amt    , inv_amt    , qty         , org_ord_qty	")
				        		.query("          , deli_qty   , req_msg    , reve_nm    , reve_state , reve_city   , reve_dong		")
				        		.query("          , reve_zip_cd, reve_addr_1, reve_addr_2, recv_addr3 , reve_email  , reve_hp_no	")
				        		.query("          , reve_tel_no, reve_fax_no, hdli_id    , hdli_no    , user_memo    , sys_memo		")
				        		.query("          , row_clos   , row_sts    , upt_id     , upt_ip     , upt_dttm    , crt_id		")
				        		.query("          , crt_ip     , crt_dttm   , rest_qty   , biz_no     , biz_nm      , biz_kind		")
				        		.query("          , biz_type   , biz_owner  , biz_state  , biz_city   , biz_dong    , biz_zip_cd	")
					        	.query("          , biz_addr_1 , biz_addr_2 , biz_email  , biz_hp_no  , biz_tel_no  , biz_fax_no)	")
					        	.query("select      hq_id      , stor_grp   , stor_id    , wrhs_id    , pos_no      , inv_no		")
					        	.query("          , inv_dt     , inv_tm     , inv_gb     , inv_work_gb, inv_dept_id , inv_usr_id	")
					        	.query("          , :sts_cd as sts_cd, inv_no,retn_yn    , pack_no    , pack_inv    , vend_id		", row.fixParameter("sts_cd"))
					        	.query("          , vend_nm    , vend_gb    , tax_type   , tax_rt     , txfree_amt  , taxtn_amt		")
					        	.query("          , sply_amt   , tax_amt    , inv_amt    , qty        , org_ord_qty , deli_qty		")
					        	.query("          , req_msg    , reve_nm    , reve_state , reve_city  , reve_dong   , reve_zip_cd	")
					        	.query("          , reve_addr_1, reve_addr_2, recv_addr3 , reve_email , reve_hp_no  , reve_tel_no	")
					        	.query("          , reve_fax_no, hdli_id    , hdli_no    , user_memo   , sys_memo    , row_clos		")
					        	.query("          , row_sts    , upt_id     , upt_ip     , upt_dttm   , crt_id      , crt_ip		")
					        	.query("          , crt_dttm   , rest_qty   , biz_no     , biz_nm     , biz_kind    , biz_type		")
					        	.query("          , biz_owner  , biz_state  , biz_city   , biz_dong   , biz_zip_cd  , biz_addr_1	")
					        	.query("          , biz_addr_2 , biz_email  , biz_hp_no  , biz_tel_no , biz_fax_no					")
					        	.query("  from po_mst																				")
					        	.query(" where inv_no = :inv_no ", row.fixParameter("inv_no"))
					        	.query("   and vend_gb <> '2'																		")
								.action = Action.direct;
				        	data.attach();

				        	data.param
					        	.query("delete po_item ")
					        	.query(" where inv_no = :inv_no ", row.fixParameter("inv_no"))
								.action = Action.direct;
				        	data.attach();
				        	data.param
				        		.query("insert into po_item																			")
				        		.query("        ( hq_id        , stor_grp    , stor_id     , wrhs_id     , inv_no     , line_seqn 	")
				        		.query("        , seq_dsp      , retn_yn     , org_inv_no  , org_inv_seq , pack_no    , pack_inv	")
				        		.query("        , pack_seq     , safe_dt     , unit_idcd      , piece_qty   , item_idcd     , item_code		")
				        		.query("        , item_name       , item_spec      , stk_itm_id  , txfree_yn   , unt_pri    , pri, qty	")
				        		.query("        , org_ord_qty  , deli_qty    , txfree_amt  , taxtn_amt   , sply_amt   , tax_amt		")
				        		.query("        , inv_amt      , user_memo    , sys_memo    , row_sts     , upt_id     , upt_ip		")
					        	.query("        , upt_dttm     , crt_id      , crt_ip      , crt_dttm    , rest_qty )				")
					        	.query("select    b.hq_id      , b.stor_grp  , b.stor_id   , b.wrhs_id   , b.inv_no   , b.line_seqn	")
					        	.query("        , b.seq_dsp    , b.retn_yn   , b.inv_no    , b.line_seqn   , b.pack_no  , b.pack_inv	")
					        	.query("        , b.pack_seq   , b.safe_dt   , b.unit_idcd    , b.piece_qty , b.item_idcd   , b.item_code	")
					        	.query("        , b.item_name     , b.item_spec    , b.stk_itm_id, b.txfree_yn , b.unt_pri  , b.pri,b.qty	")
					        	.query("        , b.org_ord_qty, b.deli_qty  , b.txfree_amt, b.taxtn_amt , b.sply_amt , b.tax_amt	")
					        	.query("        , b.inv_amt    , b.user_memo  , b.sys_memo  , b.row_sts   , b.upt_id   , b.upt_ip	")
					        	.query("        , b.upt_dttm   , b.crt_id    , b.crt_ip    , b.crt_dttm  , b.rest_qty				")
					        	.query("  from po_mst a																			")
					        	.query("       join po_item b  on b.inv_no = a.inv_no											")
					        	.query(" where a.inv_no = :inv_no	", row.fixParameter("inv_no"))
					        	.query("   and a.vend_gb <> '2'																		")
					        	.action = Action.direct;
				        	data.attach();

				        	data.param
				    			.table("po_item")
				    			.where("where inv_no = :inv_no ")
				    			//.where("where inv_no =  (select inv_no from po_order where inv_no = :inv_no and vend_gb <> '2' and sts_cd = '0010' and deli_qty = 0) ")
					        	//
								.unique("inv_no"		, row.fixParameter("inv_no"     ))
				        		.update("deli_qty"		, new SqlParamText("qty"))
				        		.update("rest_qty"		, new SqlParamText("0"))
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
								.action = rowaction;
				        	data.attach();

				        	data.param
				    			.table("po_mst")
				    			.where("where inv_no = :inv_no ")
				    			//.where("  and vend_gb <> '2'   ")
				    			//.where("  and sts_cd = '0010'  ")
				    			//.where("  and deli_qty = 0     ")
					        	//
								.unique("inv_no"		, row.fixParameter("inv_no"     ))
				        		.update("sts_cd"		, row.getParameter("sts_cd"     ))
				        		.update("deli_qty"		, new SqlParamText("qty"))
				        		.update("rest_qty"		, new SqlParamText("0"))
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
								.action = rowaction;
				        	data.attach();
		        		}
		        	}
		        	// 승인취소
		        	else if ("0010".equals(sts_cd)) {

		        		String cancel_yn = getCancelYn(arg, row.getParamText("inv_no"));

		        		// 현재 문서가 승인취소 가능한 상태가 아닌 경우
		        		if (!"Y".equals(cancel_yn)) {
			        		throw new ServiceException("승인취소에 실패했습니다. 발주상태를 확인하시기 바랍니다.");
		        		}

		        		// 매입사 거래 형태(vend_gb)가 직납인 경우
		        		if ("2".equals(vend_gb)) {

				        	data.param
				    			.table("po_item")
				    			.where("where inv_no = :inv_no ")
				    			//.where("where inv_no =  (select inv_no from po_order where inv_no = :inv_no and vend_gb = '2' and sts_cd = '0200' and deli_qty = 0) ")
					        	//
								.unique("inv_no"		, row.fixParameter("inv_no"     ))
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
								.action = rowaction;
				        	data.attach();

				        	data.param
				    			.table("po_mst")
				    			.where("where inv_no = :inv_no ")
				    			//.where("where inv_no = :inv_no ")
				    			//.where("  and vend_gb = '2'    ")
				    			//.where("  and sts_cd = '0200'  ")
				    			//.where("  and deli_qty = 0     ")
					        	//
								.unique("inv_no"		, row.fixParameter("inv_no"     ))
				        		.update("sts_cd"		, row.getParameter("sts_cd"     ))
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
								.action = rowaction;
				        	data.attach();

		        		}
		        		// 매입사 거래 형태(vend_gb)가 직납이 아닌 경우
		        		else {

				        	data.param
				    			.table("po_item")
				    			.where("where inv_no = :inv_no ")
				    			//.where("where inv_no = (select inv_no from po_order where inv_no = :inv_no and vend_gb <> '2' and sts_cd = '0200' and deli_qty <> 0) ")
					        	//
								.unique("inv_no"		, row.fixParameter("inv_no"     ))
				        		.update("deli_qty"		, new SqlParamText("0"))
				        		.update("rest_qty"		, new SqlParamText("qty"))
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
								.action = rowaction;
				        	data.attach();

				        	data.param
				    			.table("po_mst")
				    			.where("where inv_no = :inv_no ")
				    			//.where("where inv_no = :inv_no ")
				    			//.where("  and vend_gb <> '2'   ")
				    			//.where("  and sts_cd = '0200'  ")
				    			//.where("  and deli_qty <> 0    ")
					        	//
								.unique("inv_no"		, row.fixParameter("inv_no"     ))
				        		.update("sts_cd"		, row.getParameter("sts_cd"     ))
				        		.update("deli_qty"		, new SqlParamText("0"))
				        		.update("rest_qty"		, new SqlParamText("qty"))
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
								.action = rowaction;
				        	data.attach();

				        	data.param
			        			.table("po_item")
				    			.where("where inv_no = :inv_no ")
			        			//.where("where inv_no = (select inv_no from po_mst where inv_no = :inv_no and vend_gb <> '2' and sts_cd = '0200' and deli_qty = 0) ")
			        			//
			        			.unique("inv_no"		, row.fixParameter("inv_no"))
			        			.update("row_sts"		, 2)
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        			.action = rowaction;
				        	data.attach();

				        	data.param
			        			.table("po_mst")
				    			.where("where inv_no = :inv_no ")
			        			//.where("where inv_no = :inv_no ")
				    			//.where("  and vend_gb <> '2'   ")
				    			//.where("  and sts_cd = '0200'  ")
			        			//.where("  and deli_qty = 0    ")
			        			//
			        			.unique("inv_no"		, row.fixParameter("inv_no"))
			        			.update("row_sts"		, 2)
								.update("upt_id"		, row.getParameter("upt_id"  ))
								.update("upt_ip"		, arg.remoteAddress)
								.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        			.action = rowaction;
			        		data.attach();
		        		}
		        	}
	        	}
			}
		}

		data.execute();
		return null;
	}

	/**
	 * detail 조회
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.seq_dsp						")
			.query("      ,a.item_code							")
			.query("      ,a.item_name							")
			.query("      ,a.item_spec							")
			.query("      ,b.unit_name							")
			.query("      ,a.piece_qty						")
			.query("      ,a.qty							")
			.query("      ,a.safe_dt						")
			.query("      ,a.pri							")
			.query("      ,a.sply_amt						")
			.query("      ,a.tax_amt						")
			.query("      ,a.txfree_amt						")
			.query("      ,a.inv_amt						")
			.query("      ,a.user_memo						")
			.query("      ,c.brcd_1 as brcd					")
			.query("      ,c.itm_shrt_cd as itm_shrt_cd		")
			.query("  from po_item a						")
			.query("       left outer join itm_unit b		")
			.query("         on b.unit_idcd = a.unit_idcd			")
			.query("       join itm_mst c					")
			.query("         on c.item_idcd = a.item_idcd			")
			.query(" where a.inv_no  = :inv_no	", arg.fixParameter("inv_no"))
			.query("   and a.row_sts = 0					")
			.query(" order by a.seq_top, a.line_seqn			")
		;

		return data.selectForMap();
	}

	/**
	 * 주문상태 조회
	 */
	public String getStsCd(HttpRequestArgument arg, String inv_no) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select sts_cd								")
			.query("  from po_mst								")
			.query(" where inv_no  = :inv_no ", inv_no)
			.query("   and row_sts = 0							")
		;

		SqlResultMap result = data.selectForMap();
		if (result.size() > 0) {
			return result.get(0).getParamText("sts_cd");
		} else {
			return "";
		}
	}

	/**
	 * 승인취소 가능여부 조회
	 */
	public String getCancelYn(HttpRequestArgument arg, String inv_no) throws Exception {

		DataMessage data = arg.newStorage("POS");
			data.param
				.query("select inv_no												")
				.query("  from po_mst												")
				.query(" where inv_no   = :inv_no1 ", inv_no)
				.query("   and vend_gb  = '2'										")
				.query("   and sts_cd   = '0200'									")
				.query("   and deli_qty = 0											")
				.query("   and row_sts  = 0											")
				.query("union all													")
				.query("select inv_no												")
				.query("  from po_mst												")
				.query(" where inv_no   = :inv_no2 ", inv_no)
				.query("   and vend_gb  <> '2'										")
				.query("   and sts_cd   = '0200'									")
				.query("   and deli_qty = 0											")
				.query("   and row_sts  = 0											")
		;

		SqlResultMap result = data.selectForMap();
		if (result.size() > 0) {
			return "Y";
		} else {
			return "N";
		}
	}
}
