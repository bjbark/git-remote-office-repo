package com.sky.system.edi;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.StringTokenizer;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.listener.SeqListenerService;
import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.NumberUtil;

@Service
public class EdiOrderWorkService  extends DefaultServiceHandler {

	@Autowired
	private SeqListenerService seqlistener;

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
//		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 집계
			.total("select count(1) as maxsize, sum(a.amount) as amount ")
		;
		data.param // 조회
			.query("select a.stor_grp    , a.stor_id     , a.wrhs_id ")
			.query("     , a.inv_no      , a.inv_dt       , a.sts_cd   , a.pay_dt ")
			.query("     , a.cust_id     , a.cust_nm      , a.cust_gb  , a.inv_usr_id   , inv_dept_id ")
			.query("     , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.inv_usr_id) as inv_usr_nm ")
			.query("     , (select dept_nm from dept_mst where stor_grp = a.stor_grp and dept_id = a.inv_dept_id) as inv_dept_nm ")
			.query("     , a.req_msg     , a.amount                 ")
			.query("     , a.user_memo   , a.row_clos              ")
			.query("      ,a.wareh_nm                               ")
			.query("      ,a.qty 	                                ")
		;
		data.param // 조건
			.where("from   edi_mst a                               ")
			.where(" where a.stor_id = :stor_id                   ", arg.fixParameter("stor_id"))
			.where("   and a.inv_dt between :fr_dt                  ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt                  ", arg.fixParameter("to_dt"))
			.where("   and a.sts_cd = :sts_cd                       ", arg.getParameter("sts_cd"))
			.where("   and a.row_sts = 0 				            ")
			.where(" order by a.inv_no desc                         ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 신규 문서번호 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public String seqInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
//		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		return seqlistener.getInvoice(data.repository, arg.fixParamText("stor_id"));
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
//		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 쿼리문  입력
		.query("select a.hq_id  , a.stor_grp   , a.stor_id                             ")
		.query("     , a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp              ")
		.query("     , a.unit_idcd                                                           ")
		.query("     , a.unt_qty  , a.mst_itm_id    , a.mst_itm_cd                              ")
		.query("     , a.item_code    , a.item_name     , a.item_spec                            ")
		.query("     , a.notax_yn  , a.qty        , a.price                                ")
		.query("     , a.org_ord_qty  , a.ship_qty                                            ")
		.query("     , a.po_pri  , a.po_pri_type  , a.po_pri_rt                    ")
		.query("     , a.tax_free  , a.taxation, a.sply_amt, a.tax, a.tax_free, a.amount   ")
		.query("     , a.user_memo , a.row_sts                                           ")
		.query("     ,b.item_idcd                                                            ")
		.query("     ,c.bas_nm as mfg_nm                                                  ")
		.query("     ,d.bas_nm as brand_nm                                                ")
		.query("     ,e.bas_nm as origin_nm                                               ")
		.query("     ,f.unit_name                                                            ")
		.query("     ,b.cst_pri                                                         ")
		.query("     ,case                                                                 ")
		.query("        when isnull(g.stad_sale_pri, 0) = 0 then                                 ")
		.query("          b.stad_sale_pri                                                     ")
		.query("        else                                                               ")
		.query("          g.stad_sale_pri                                                     ")
		.query("      end as stad_sale_pri                                                    ")
		.query("  from edi_dtl a                                                        ")
		.query("       left outer join itm_mst b    on b.item_idcd = a.item_idcd                            ")
		.query("       left outer join base_mst c   on c.bas_id = b.mfg_id                            ")
		.query("       left outer join base_mst d   on d.bas_id = b.brand_id                          ")
		.query("       left outer join base_mst e   on e.bas_id = b.origin_id                         ")
		.query("       left outer join item_unit f  on f.unit_idcd = b.unit_idcd                          ")
		.query("       left outer join itm_stor g   on g.item_idcd = a.item_idcd  and g.stor_id = a.stor_id ")
		.query(" where a.inv_no = :inv_no                                                  ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 											            ")
		.query(" order by a.seq_top, a.line_seqn                                             ")
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
			.query("select a.corp_id     , a.hq_id    ,  a.stor_grp    , a.stor_id                                 ")
			.query("     , (select stor_nm from stor p where p.stor_id = a.stor_id ) as stor_nm                  ")
			.query("     , a.wrhs_id     , a.wareh_nm         ")
			.query("     , a.pos_no       , a.inv_no      ,  a.inv_dt    , a.inv_tm      , a.inv_work_gb              ")
			.query("     , a.ori_no       , a.sts_cd      ,  a.ret_yn                                                  ")
			.query("     , a.inv_dept_id  , (select dept_nm from dept_mst where stor_grp = a.stor_grp and stor_id = a.inv_dept_id ) as inv_dept_nm")
			.query("     , a.inv_usr_id  , (select emp_nm from usr_mst where stor_id = a.stor_id and emp_id = a.inv_usr_id ) as inv_usr_nm")
			.query("     , a.salesman_id  , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id ) as salesman_nm")
			.query("     , a.cust_id      , a.cust_nm     , a.cust_gb                                                 ")
			.query("     , a.mmb_id      , a.mmb_nm                                                                 ")
			.query("     , a.tax_recv     , a.tax_type     , a.tax_rt    , a.price_no                                                ") // ,
			.query("     , a.tax_free     , a.taxation    , a.sply_amt   , a.tax         , a.amount                   ")
			.query("     , a.charge       , a.payable     , a.qty        , a.ship_qty                                 ")

	      	.query("     , a.biz_no       , a.biz_nm      , a.biz_type   , a.biz_type                                ")
	      	.query("     , a.biz_owner    , a.biz_email   , a.biz_tel_no , a.biz_fax_no                               ")
	      	.query("     , a.biz_zip_cd   , a.biz_state   , a.biz_city   , a.biz_dong    , a.biz_addr_1 , a.biz_addr_2  ")

	      	.query("     , a.reve_nm                                                                                  ")
	      	.query("     , a.reve_email   , a.reve_tel_no , a.reve_hp_no , a.reve_fax_no                              ")
	      	.query("     , a.reve_zip_cd  , a.reve_state  , a.reve_city  , a.reve_dong   , a.reve_addr_1 , a.reve_addr_2  ")

	      	.query("     , a.req_msg                                                                                  ")
			.query("     , a.user_memo    , a.row_clos   ,  a.row_sts                                              ")
			.query("     , a.upt_nm    , a.crt_nm                                                               ")
			.query("      ,a.cours_id ")
			.query("from   edi_mst a                                                                                ")
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
				.query("     , a.qty                                                    ")
				.query("     , a.tax_free     , a.taxation     , a.sply_amt    , a.tax       , a.amount  ")
				.query("from   edi_pack a                                                              ")
				.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no"                           ))
				.query("and    a.row_sts = 0                                                           ")
			;
			info.get(0).put("picking", data.selectForMap() );

			data.clear();
			data.param // 쿼리문  입력
				.query("select a.hq_id  , a.stor_grp   , a.stor_id    , a.pack_no   , a.pack_gb    ")
				.query("     , a.inv_no    , a.line_seqn    , a.seq_top     , a.seq_dsp                  ")
				.query("     , a.mst_itm_id   , a.mst_itm_cd    , a.unt_qty                                 ")
				.query("     , a.unit_idcd   , (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
				.query("     , a.item_idcd   , a.item_code    , a.item_name     , a.item_spec                  ")
				.query("     , a.notax_yn  , a.cust_price , a.cust_halin  , a.unit_price  , a.item_halin ")
				.query("     , a.qty       , a.price      , a.org_ord_qty    , a.ship_qty                   ")
				.query("     , a.tax_free  , a.taxation   , a.sply_amt    , a.tax       , a.amount     ")
				.query("     , a.pack_vend_id , ( select vend_nm from vend_mst where vend_id = a.pack_vend_id ) as  pack_vend_nm  " )
				.query("	 , a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
				.query("	 , a.sales_id     , ( select bas_nm from base_mst where bas_id = a.sales_id ) as  sales_nm  " )

				.query("     , a.po_pri  , a.po_pri_type , a.po_pri_rt                         ")
				.query("     , a.user_memo , a.row_sts                                               ")
				.query("from   edi_dtl a                                                             ")
				.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no"                        ) )
				.query("and    a.row_sts = 0                                                          ")
				.query("order by a.line_seqn                                                          	")
			;
			info.get(0).put("product", data.selectForMap() );
		}

	    return info ;
	}

	/**
	 * 거래처상태 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getCustSts(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 쿼리문  입력
			.query("select cust_sts                       ")
			.query("      ,isnull(cust_nm, ' ')  as cust_nm  ")
			.query("      ,isnull(sts_memo, ' ') as sts_memo ")
			.query("  from cust_mst a                    ")
			.query(" where cust_id = :cust_id             ", arg.fixParameter("cust_id"))
			.query("   and a.row_sts = 0 				  ")
		;

	    return data.selectForMap();
	}

	/**
	 * 발주가능여부 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getTermYn(HttpRequestArgument arg) throws Exception {

//		DataMessage data = arg.newStorage("POS");
		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 쿼리문  입력
			.query("select case add_offr_yn when '1' then greatest(norm_term, add_term) else norm_term end  as term_yn                                  ")
			.query("  from (                                                                                                                            ")
			.query("       select b.add_offr_yn -- 추가발주 가능여부                                                                                    ")
			.query("             ,case                                                                                                                  ")
//			.query("                when (to_date(to_char(sysdate + a.fr_dy, 'yyyymmdd ') || a.fr_tm, 'yyyymmdd hh24mi') <= sysdate)                    ")
//			.query("                     and (sysdate <= to_date(to_char(sysdate + a.to_dy, 'yyyymmdd ') || a.to_tm, 'yyyymmdd hh24mi')) then 1         ")
			.query("                when (dbo.to_date(dbo.to_char(getdate() + a.fr_dy, 'yyyymmdd ') + a.fr_tm, 'yyyymmdd hh24mi') <= getdate())        ")
			.query("                     and (getdate() <= dbo.to_date(dbo.to_char(getdate() + a.to_dy, 'yyyymmdd ') + a.to_tm, 'yyyymmdd hh24mi')) then 1  ")
			.query("                else 0                                                                                                              ")
			.query("              end as norm_term -- 정상발주                                                                                          ")
			.query("             ,case                                                                                                                  ")
//			.query("                when (to_date(to_char(sysdate + a.add_fr_dy, 'yyyymmdd ') || a.add_fr_tm, 'yyyymmdd hh24mi') <= sysdate)            ")
//			.query("                     and (sysdate <= to_date(to_char(sysdate + a.add_to_dy, 'yyyymmdd ') || a.add_to_tm, 'yyyymmdd hh24mi')) then 1 ")
			.query("                when (dbo.to_date(dbo.to_char(getdate() + a.add_fr_dy, 'yyyymmdd ') + a.add_fr_tm, 'yyyymmdd hh24mi') <= getdate()) ")
			.query("                     and (getdate() <= dbo.to_date(dbo.to_char(getdate() + a.add_to_dy, 'yyyymmdd ') + a.add_to_tm, 'yyyymmdd hh24mi')) then 1 ")
			.query("                else 0                                                                                                              ")
			.query("              end as add_term -- 추가발주                                                                                           ")
			.query("         from epo_scheme a                                                                                                          ")
			.query("              join epo_course b                                                                                                     ")
			.query("                on b.cours_id = a.cours_id                                                                                        ")
			.query("        where a.cours_id = :cours_id                                                                                              ", arg.fixParameter("cours_id"))
			.query("          and a.week_id = to_char(sysdate, 'd')                                                                                     ")
			.query("       )                                                                                                                            ")
		;

	    return data.selectForMap();
	}

	/**
	 * invoice master 등록/수정/삭제
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		DataMessage data = arg.newStorage("POS");
		DataMessage pos_search = arg.newStorage("POS");
		SqlResultRow srr = map.get(0);
		DataMessage epo_data   = new DataMessage(StringUtils.substring(srr.fixParamText("wrhs_id"), 0, 10) + ".POS");
		DataMessage epo_search = new DataMessage(StringUtils.substring(srr.fixParamText("wrhs_id"), 0, 10) + ".POS");
		String pos_data_trsf = arg.newStorage("POS").repository.getPoolName();

		for(SqlResultRow inv:map){

			Action rowaction = SqlParameter.Action.setValue(inv.getParameter("_set"));
			String flag = inv.getParamText("_flag");
        	String sts_cd = inv.getParamText("sts_cd");

			if (rowaction == Action.delete) {

				throw new ServiceException("삭제불가");
			} else {
				if ("2".equals(flag)) {
		        	// 발주확정
		        	if ("0020".equals(sts_cd)) {

			        	// EDI주문등록 정보(edi_mst, edi_dtl, edi_pack)를 주문정보(order_mst, order_item, order_pack)에 복사
		        		setOrder(arg, pos_search, epo_data, inv);

	        			// 발주확정 시 본사 상품이 체인점에 없는 경우 체인점에 품목 추가
		        		setChainItem(arg, pos_search, epo_search, data, inv);

			        	data.param
			    			.table("edi_dtl")
			    			.where("where inv_no = (select inv_no from edi_mst where inv_no = :inv_no and sts_cd = '0010' and ship_qty = 0) ")
				        	//
							.unique("inv_no"      , inv.fixParameter("inv_no"))
			        		.update("ship_qty"    , new SqlParamText("qty"))
			        		.update("rest_qty"    , new SqlParamText("0"))
							.update("upt_nm"   , inv.getParameter("upt_nm"))
							.update("upt_ip"   , arg.remoteAddress)
							.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
							.action = rowaction;
			        	data.attach();

			        	data.param
			    			.table("edi_pack")
			    			.where("where inv_no = (select inv_no from edi_mst where inv_no = :inv_no and sts_cd = '0010' and ship_qty = 0) ")
				        	//
							.unique("inv_no"      , inv.fixParameter("inv_no"))
			        		.update("sts_cd"      , sts_cd)
			        		.update("ship_qty"    , new SqlParamText("qty"))
			        		.update("rest_qty"    , new SqlParamText("0"))
							.update("upt_nm"   , inv.getParameter("upt_nm"))
							.update("upt_ip"   , arg.remoteAddress)
							.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
							.action = rowaction;
			        	data.attach();

			        	data.param
			    			.table("edi_mst")
			    			.where("where inv_no = :inv_no ")
			    			.where("  and sts_cd = '0010'  ")
			    			.where("  and ship_qty = 0     ")
				        	//
							.unique("inv_no"      , inv.fixParameter("inv_no"))
			        		.update("sts_cd"      , sts_cd)
			        		.update("ship_qty"    , new SqlParamText("qty"))
			        		.update("rest_qty"    , new SqlParamText("0"))
							.update("upt_nm"   , inv.getParameter("upt_nm"))
							.update("upt_ip"   , arg.remoteAddress)
							.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
							.action = rowaction;
			        	data.attach();
		        	}
				} else {
		        	data.param
			        	.table("edi_mst")
			        	.where("where inv_no  = :inv_no   " )
			        	//
			        	.unique("corp_id"         , inv.fixParameter("corp_id"     ))
			        	.unique("hq_id"         , inv.fixParameter("hq_id"     ))
			        	.unique("stor_grp"         , inv.fixParameter("stor_grp"     ))
			        	.unique("stor_id"         , inv.fixParameter("stor_id"     ))
			        	.update("wrhs_id"         , inv.getParameter("wrhs_id"     ))
			        	.update("wareh_nm"         , inv.getParameter("wareh_nm"     ))

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
						.update("biz_addr_1"        , inv.getParameter("biz_addr_1"    ))
						.update("biz_addr_2"        , inv.getParameter("biz_addr_2"    ))
						.update("biz_email"        , inv.getParameter("biz_email"    ))
						.update("biz_tel_no"       , inv.getParameter("biz_tel_no"   ))
						.update("biz_fax_no"       , inv.getParameter("biz_fax_no"   ))

						.update("reve_nm"          , inv.getParameter("reve_nm"      ))
						.update("reve_zip_cd"      , inv.getParameter("reve_zip_cd"  ))
						.update("reve_state"       , inv.getParameter("reve_state"   ))
						.update("reve_city"        , inv.getParameter("reve_city"    ))
						.update("reve_dong"        , inv.getParameter("reve_dong"    ))
						.update("reve_addr_1"       , inv.getParameter("reve_addr_1"   ))
						.update("reve_addr_2"       , inv.getParameter("reve_addr_2"   ))
						.update("reve_email"       , inv.getParameter("reve_email"   ))
						.update("reve_hp_no"      , inv.getParameter("reve_hp_no"   ))
						.update("reve_tel_no"      , inv.getParameter("reve_tel_no"  ))
						.update("reve_fax_no"      , inv.getParameter("reve_fax_no"  ))

						.update("user_memo"        , inv.getParameter("user_memo"    ))
						.update("row_clos"        , inv.getParameter("row_clos"    ))
						.update("row_sts"        , inv.getParameter("row_sts"    ))

						.update("upt_nm"        , inv.getParameter("upt_nm"    ))
						.update("upt_ip"   	   , arg.remoteAddress				  )
						.insert("crt_nm" 	   , inv.getParameter("crt_nm"	 ))
						.insert("crt_ip"   	   , arg.remoteAddress				  )
						.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

						.insert("cours_id"        , inv.getParameter("cours_id"    ))
						.action = rowaction ;
		        	;data.attach();

					SqlResultMap picking = inv.getParameter("picking", SqlResultMap.class);
		        	if (picking != null){
		        		setPicking(arg, data , picking, inv);
		        	}

					SqlResultMap prduct = inv.getParameter("product", SqlResultMap.class);
		        	if (prduct != null){
		        		setProduct(arg, pos_data_trsf, epo_data, epo_search, data, prduct, inv);
		        	}

		        	if (picking != null){
		        		for(SqlResultRow pkg:picking){

		        			Action pkgaction = SqlParameter.Action.setValue(pkg.getParameter("_set"));
		        			double work_ori = Double.parseDouble(pkg.getParamText("_qty")) ;
		        			double work_qty = Double.parseDouble(pkg.getParamText("qty")) ;

		        			if (pkgaction == Action.update && work_ori != work_qty) {
			    		       	// 발주요청 출고수량 변경
			    				data.param
			    					.query(" update edi_pack a                    ")
			    					.query(" set (a.rest_qty, a.sts_cd) = (         ")
			    					.query("	  select sum(abs(b.rest_qty))       ")
			    					.query("	     ,   case when sum(abs(b.rest_qty)) = 0  then '0500'       ") // 발주승인
			    					.query("                  when a.qty =sum(abs(b.rest_qty)) then '0200' ") // 일부납품
			    					.query("	         else '0400' end ") // 입고완료 OR 일부납품
			    					.query("	  from  edi_dtl b                                  " )
			    					.query("	  where b.inv_no  = a.inv_no                          " )
			    					.query("	  and   b.pack_no = a.pack_no                         " )
			    					.query("   	  and   b.row_sts = 0 				            ")
			    					.query("	)                                                    " )
			    					.query(" where a.pack_no = :pack_no  ", pkg.fixParameter("pack_no" ))
			    					.query(" and   a.inv_no  = :inv_no   ", pkg.fixParameter("inv_no"  ))
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
		    					.query(" update edi_mst a                                            ")
		    					.query(" set (a.rest_qty, a.sts_cd) = (                               ")
		    					.query("	  select sum(abs(b.rest_qty))                             ")
		    					.query("	       , case when a.sts_cd < '0200' then a.sts_cd        ") // 승인전 상태라면 이전 상태를 유지
		    					.query("	         else                                             ")
		    					.query("	              case when sum(abs(b.rest_qty)) = 0   then '0500' ") // 배송완료
		    					.query("                       when a.qty=sum(abs(b.rest_qty)) then '0200' ") // 배송대기
		    					.query("	                   else '0400'                            ") // 부분배송
		    					.query("	              end                                         ")
	                            .query("	         end                                              ")
		    					.query("	  from  edi_pack b                              	      ")
		    					.query("	  where b.inv_no  = a.inv_no                              ")
		    					.query("   	    and b.row_sts = 0 				  		          ")
		    					.query("	)                                                         ")
		    					.query(" where a.inv_no  = :inv_no   ", inv.fixParameter("inv_no"     ))
		    					.action = Action.direct;
		    				data.attach();
		        		}
		        	}
				}
			}
		}

		data.execute();
		epo_data.execute();
		return null ;
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
		 	.query("select sts_cd, qty from edi_mst where inv_no = :inv_no", arg.fixParameter("inv_no"))
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
	    		.table("edi_dtl")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_nm"		, arg.getParameter("upt_nm"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

        	data.param
	    		.table("edi_pack")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_nm"		, arg.getParameter("upt_nm"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

	    	data.param
				.table("edi_mst")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_nm"		, arg.getParameter("upt_nm"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);
		}

		data.execute();
		return null;
	}

	/**
	 * 발주확정
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public void setOrder(HttpRequestArgument arg, DataMessage pos_search, DataMessage epo_data, SqlResultRow inv) throws Exception {

		pos_search.clear();
		pos_search.param // 쿼리문  입력
        	.query("select corp_id, hq_id, stor_grp, stor_id, wrhs_id, pos_no, inv_no, inv_dt, inv_tm, inv_nm, ret_yn, ret_no, inv_work_id, inv_work_gb, inv_dept_id, inv_usr_id, salesman_id, :sts_cd as sts_cd, pay_dt, ori_no, ori_dt, ori_tm, cust_grp, cust_id, cust_nm, cust_gb, mmb_id, mmb_nm, item_point, item_halin, price_no, tax_type, tax_rt, tax_free, taxation, sply_amt, tax, amount, charge, payable, payment, npay_amt, perpay_yn, qty, org_ord_qty, ship_qty, point_rate_type, cash_point_rate, card_point_rate, add_point, use_point, req_msg, biz_no, biz_nm, biz_type, biz_type, biz_owner, biz_state, biz_city, biz_dong, biz_zip_cd, biz_addr_1, biz_addr_2, biz_email, biz_tel_no, biz_fax_no, reve_nm, reve_state, reve_city, reve_dong, reve_zip_cd, reve_addr_1, reve_addr_2, recv_addr3, reve_email, reve_tel_no, reve_fax_no, user_memo, sys_memo, row_clos, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, reve_hp_no, cours_id, sales_gb, tax_recv, rest_qty, converted, prom_id ", inv.fixParameter("sts_cd"))
        	.query("  from edi_mst         ")
        	.query(" where inv_no = :inv_no ", inv.fixParameter("inv_no"))
		;

		SqlResultMap list = pos_search.selectForMap();
		SqlResultRow record1 = list.get(0);
		epo_data.param
        	.query("insert into order_mst ( corp_id, hq_id, stor_grp, stor_id, wrhs_id, pos_no, inv_no, inv_dt, inv_tm, inv_nm, ret_yn, ret_no, inv_work_id, inv_work_gb, inv_dept_id, inv_usr_id, salesman_id, sts_cd, pay_dt, ori_no, ori_dt, ori_tm, cust_grp, cust_id, cust_nm, cust_gb, mmb_id, mmb_nm, item_point, item_halin, price_no, tax_type, tax_rt, tax_free, taxation, sply_amt, tax, amount, charge, payable, payment, npay_amt, perpay_yn, qty, org_ord_qty, ship_qty, point_rate_type, cash_point_rate, card_point_rate, add_point, use_point, req_msg, biz_no, biz_nm, biz_type, biz_type, biz_owner, biz_state, biz_city, biz_dong, biz_zip_cd, biz_addr_1, biz_addr_2, biz_email, biz_tel_no, biz_fax_no, reve_nm, reve_state, reve_city, reve_dong, reve_zip_cd, reve_addr_1, reve_addr_2, recv_addr3, reve_email, reve_tel_no, reve_fax_no, user_memo, sys_memo, row_clos, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, reve_hp_no, cours_id, sales_gb, tax_recv, rest_qty, converted, prom_id, invoiceno ) ")
			.query("values (                                                 ")
			.query("       '" + record1.getParamText("corp_id"       ) + "' ")
			.query("      ,'" + record1.getParamText("hq_id"       ) + "' ")
			.query("      ,'" + record1.getParamText("stor_grp"       ) + "' ")
			.query("      ,'" + record1.getParamText("wrhs_id"       ) + "' ") // stor_id
			.query("      ,'" + record1.getParamText("wrhs_id"       ) + "' ")
			.query("      ,'" + record1.getParamText("pos_no"         ) + "' ")
			.query("      ,'" + record1.getParamText("inv_no"         ) + "' ")
			.query("      ,to_char(sysdate, 'yyyymmdd')                      ") // inv_dt
			.query("      ,to_char(sysdate, 'hh24mi')                        ") // inv_tm
			.query("      ,'" + record1.getParamText("inv_nm"         ) + "' ")
			.query("      ,'" + record1.getParamText("ret_yn"         ) + "' ")
			.query("      ,'" + record1.getParamText("ret_no"         ) + "' ")
			.query("      ,'" + record1.getParamText("inv_work_id"    ) + "' ")
			.query("      ,'" + record1.getParamText("inv_work_gb"    ) + "' ")
			.query("      ,'" + record1.getParamText("inv_dept_id"    ) + "' ")
			.query("      ,'" + record1.getParamText("inv_usr_id"    ) + "' ")
			.query("      ,'" + record1.getParamText("salesman_id"    ) + "' ")
			.query("      ,'0010'                                            ") // sts_cd
			.query("      ,'" + record1.getParamText("pay_dt"         ) + "' ")
			.query("      ,'" + record1.getParamText("ori_no"         ) + "' ")
			.query("      ,'" + record1.getParamText("ori_dt"         ) + "' ")
			.query("      ,'" + record1.getParamText("ori_tm"         ) + "' ")
			.query("      ,'" + record1.getParamText("cust_grp"        ) + "' ")
			.query("      ,'" + record1.getParamText("cust_id"        ) + "' ")
			.query("      ,'" + record1.getParamText("cust_nm"        ) + "' ")
			.query("      ,'" + record1.getParamText("cust_gb"        ) + "' ")
			.query("      ,'" + record1.getParamText("mmb_id"        ) + "' ")
			.query("      ,'" + record1.getParamText("mmb_nm"        ) + "' ")
			.query("      , " + record1.getParamText("item_point"     ) + "  ")
			.query("      , " + record1.getParamText("item_halin"     ) + "  ")
			.query("      , " + record1.getParamText("price_no"       ) + "  ")
			.query("      ,'" + record1.getParamText("tax_type"       ) + "' ")
			.query("      , " + record1.getParamText("tax_rt"       ) + "  ")
			.query("      , " + record1.getParamText("tax_free"       ) + "  ")
			.query("      , " + record1.getParamText("taxation"       ) + "  ")
			.query("      , " + record1.getParamText("sply_amt"       ) + "  ")
			.query("      , " + record1.getParamText("tax"            ) + "  ")
			.query("      , " + record1.getParamText("amount"         ) + "  ")
			.query("      , " + record1.getParamText("charge"         ) + "  ")
			.query("      , " + record1.getParamText("payable"        ) + "  ")
			.query("      , " + record1.getParamText("payment"        ) + "  ")
			.query("      , " + record1.getParamText("npay_amt"        ) + "  ")
			.query("      ,'" + record1.getParamText("perpay_yn"      ) + "' ")
			.query("      , " + record1.getParamText("qty"            ) + "  ")
			.query("      , " + record1.getParamText("org_ord_qty"       ) + "  ")
			.query("      , 0                                                ") // ship_qty
			.query("      ,'" + record1.getParamText("point_rate_type") + "' ")
			.query("      , " + record1.getParamText("cash_point_rate") + "  ")
			.query("      , " + record1.getParamText("card_point_rate") + "  ")
			.query("      , " + record1.getParamText("add_point"      ) + "  ")
			.query("      , " + record1.getParamText("use_point"      ) + "  ")
			.query("      ,'" + record1.getParamText("req_msg"        ) + "' ")
			.query("      ,'" + record1.getParamText("biz_no"         ) + "' ")
			.query("      ,'" + record1.getParamText("biz_nm"         ) + "' ")
			.query("      ,'" + record1.getParamText("biz_type"       ) + "' ")
			.query("      ,'" + record1.getParamText("biz_type"      ) + "' ")
			.query("      ,'" + record1.getParamText("biz_owner"      ) + "' ")
			.query("      ,'" + record1.getParamText("biz_state"      ) + "' ")
			.query("      ,'" + record1.getParamText("biz_city"       ) + "' ")
			.query("      ,'" + record1.getParamText("biz_dong"       ) + "' ")
			.query("      ,'" + record1.getParamText("biz_zip_cd"     ) + "' ")
			.query("      ,'" + record1.getParamText("biz_addr_1"      ) + "' ")
			.query("      ,'" + record1.getParamText("biz_addr_2"      ) + "' ")
			.query("      ,'" + record1.getParamText("biz_email"      ) + "' ")
			.query("      ,'" + record1.getParamText("biz_tel_no"     ) + "' ")
			.query("      ,'" + record1.getParamText("biz_fax_no"     ) + "' ")
			.query("      ,'" + record1.getParamText("reve_nm"        ) + "' ")
			.query("      ,'" + record1.getParamText("reve_state"     ) + "' ")
			.query("      ,'" + record1.getParamText("reve_city"      ) + "' ")
			.query("      ,'" + record1.getParamText("reve_dong"      ) + "' ")
			.query("      ,'" + record1.getParamText("reve_zip_cd"    ) + "' ")
			.query("      ,'" + record1.getParamText("reve_addr_1"     ) + "' ")
			.query("      ,'" + record1.getParamText("reve_addr_2"     ) + "' ")
			.query("      ,'" + record1.getParamText("recv_addr3"     ) + "' ")
			.query("      ,'" + record1.getParamText("reve_email"     ) + "' ")
			.query("      ,'" + record1.getParamText("reve_tel_no"    ) + "' ")
			.query("      ,'" + record1.getParamText("reve_fax_no"    ) + "' ")
			.query("      ,'" + record1.getParamText("user_memo"      ) + "' ")
			.query("      ,'" + record1.getParamText("sys_memo"      ) + "' ")
			.query("      , " + record1.getParamText("row_clos"      ) + "  ")
			.query("      , " + record1.getParamText("row_ord"      ) + "  ")
			.query("      , " + record1.getParamText("row_sts"      ) + "  ")
			.query("      ,'" + inv.getParameter("upt_nm")           + "' ")
			.query("      ,'" + arg.remoteAddress                       + "' ")
			.query("      , to_char(sysdate, 'yyyymmddhh24miss')             ")
			.query("      ,'" + inv.getParameter("crt_nm")           + "' ")
			.query("      ,'" + arg.remoteAddress                       + "' ")
			.query("      , to_char(sysdate, 'yyyymmddhh24miss')             ")
			.query("      ,'" + record1.getParamText("reve_hp_no"    ) + "' ")
			.query("      ,'" + record1.getParamText("cours_id"      ) + "' ")
			.query("      ,'" + record1.getParamText("sales_gb"       ) + "' ")
			.query("      ,'" + record1.getParamText("tax_recv"       ) + "' ")
			.query("      , " + record1.getParamText("qty"            ) + "  ") // rest_qty
			.query("      ,'" + record1.getParamText("converted"      ) + "' ")
			.query("      ,'" + record1.getParamText("prom_id"        ) + "' ")
			.query("      ,'" + record1.getParamText("inv_no"         ) + "' ")
			.query("       )                                                 ")
        ;
		epo_data.attach(Action.direct);


		pos_search.clear();
		pos_search.param // 쿼리문  입력
        	.query("select hq_id, stor_grp, stor_id, wrhs_id, inv_no, line_seqn, seq_top, seq_dsp, ret_yn, ret_no, ret_seq, ori_no, ori_seq, pack_no, pack_gb, pack_vend_id, pack_zone_id, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd, item_code, item_name, item_spec, sales_id, notax_yn, cust_price, cust_halin, unit_price, unit_point, point_rate, item_point, item_halin, price, qty, org_ord_qty, ship_qty, tax_free, taxation, sply_amt, tax, amount, po_pri, po_pri_type, po_pri_rt, user_memo, sys_memo, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, rest_qty, converted, seq_qty ")
        	.query("  from edi_dtl         ")
        	.query(" where inv_no = :inv_no ", inv.fixParameter("inv_no"))
		;

		list = pos_search.selectForMap();
		for (SqlResultRow record:list) {
			epo_data.param
	        	.query("insert into order_item ( hq_id, stor_grp, stor_id, wrhs_id, inv_no, line_seqn, seq_top, seq_dsp, ret_yn, ret_no, ret_seq, ori_no, ori_seq, pack_no, pack_gb, pack_vend_id, pack_zone_id, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd, item_code, item_name, item_spec, sales_id, notax_yn, cust_price, cust_halin, unit_price, unit_point, point_rate, item_point, item_halin, price, qty, org_ord_qty, ship_qty, tax_free, taxation, sply_amt, tax, amount, po_pri, po_pri_type, po_pri_rt, user_memo, sys_memo, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, rest_qty, converted, seq_qty, invoiceno, invoicesq ) ")
				.query("values (                                              ")
				.query("       '" + record.getParamText("hq_id"     ) + "' ")
				.query("      ,'" + record.getParamText("stor_grp"     ) + "' ")
				.query("      ,'" + record.getParamText("wrhs_id"     ) + "' ")
				.query("      ,'" + record.getParamText("wrhs_id"     ) + "' ")
				.query("      ,'" + record.getParamText("inv_no"       ) + "' ")
				.query("      , " + record.getParamText("line_seqn"      ) + "  ")
				.query("      , " + record.getParamText("seq_top"      ) + "  ")
				.query("      ,'" + record.getParamText("seq_dsp"      ) + "' ")
				.query("      ,'" + record.getParamText("ret_yn"       ) + "' ")
				.query("      ,'" + record.getParamText("ret_no"       ) + "' ")
				.query("      , " + record.getParamText("ret_seq"      ) + "  ")
				.query("      ,'" + record.getParamText("ori_no"       ) + "' ")
				.query("      , " + record.getParamText("ori_seq"      ) + "  ")
				.query("      ,'" + record.getParamText("pack_no"      ) + "' ")
				.query("      ,'" + record.getParamText("pack_gb"      ) + "' ")
				.query("      ,'" + record.getParamText("pack_vend_id" ) + "' ")
				.query("      ,'" + record.getParamText("pack_zone_id" ) + "' ")
				.query("      ,'" + record.getParamText("mst_itm_id"   ) + "' ")
				.query("      ,'" + record.getParamText("mst_itm_cd"   ) + "' ")
				.query("      ,'" + record.getParamText("unit_idcd"       ) + "' ")
				.query("      , " + record.getParamText("unt_qty"      ) + "  ")
				.query("      ,'" + record.getParamText("item_idcd"       ) + "' ")
				.query("      ,'" + record.getParamText("item_code"       ) + "' ")
				.query("      ,'" + record.getParamText("item_name"       ) + "' ")
				.query("      ,'" + record.getParamText("item_spec"       ) + "' ")
				.query("      ,'" + record.getParamText("sales_id"     ) + "' ")
				.query("      ,'" + record.getParamText("notax_yn"     ) + "' ")
				.query("      , " + record.getParamText("cust_price"   ) + "  ")
				.query("      , " + record.getParamText("cust_halin"   ) + "  ")
				.query("      , " + record.getParamText("unit_price"   ) + "  ")
				.query("      , " + record.getParamText("unit_point"   ) + "  ")
				.query("      , " + record.getParamText("point_rate"   ) + "  ")
				.query("      , " + record.getParamText("item_point"   ) + "  ")
				.query("      , " + record.getParamText("item_halin"   ) + "  ")
				.query("      , " + record.getParamText("price"        ) + "  ")
				.query("      , " + record.getParamText("qty"          ) + "  ")
				.query("      , " + record.getParamText("org_ord_qty"     ) + "  ")
				.query("      , 0                                             ")
				.query("      , " + record.getParamText("tax_free"     ) + "  ")
				.query("      , " + record.getParamText("taxation"     ) + "  ")
				.query("      , " + record.getParamText("sply_amt"     ) + "  ")
				.query("      , " + record.getParamText("tax"          ) + "  ")
				.query("      , " + record.getParamText("amount"       ) + "  ")
				.query("      , " + record.getParamText("po_pri"     ) + "  ")
				.query("      ,'" + record.getParamText("po_pri_type") + "' ")
				.query("      , " + record.getParamText("po_pri_rt") + "  ")
				.query("      ,'" + record.getParamText("user_memo"    ) + "' ")
				.query("      ,'" + record.getParamText("sys_memo"    ) + "' ")
				.query("      , " + record.getParamText("row_ord"    ) + "  ")
				.query("      , " + record.getParamText("row_sts"    ) + "  ")
				.query("      ,'" + inv.getParameter("upt_nm")        + "' ")
				.query("      ,'" + arg.remoteAddress                    + "' ")
				.query("      , to_char(sysdate, 'yyyymmddhh24miss')          ")
				.query("      ,'" + inv.getParameter("crt_nm")        + "' ")
				.query("      ,'" + arg.remoteAddress                    + "' ")
				.query("      , to_char(sysdate, 'yyyymmddhh24miss')          ")
				.query("      , " + record.getParamText("qty"          ) + "  ")
				.query("      ,'" + record.getParamText("converted"    ) + "' ")
				.query("      , " + record.getParamText("seq_qty"      ) + "  ")
				.query("      ,'" + record.getParamText("inv_no"       ) + "' ")
				.query("      , " + record.getParamText("line_seqn"      ) + "  ")
				.query("       )                                              ")
	        ;
			epo_data.attach(Action.direct);
		}


		pos_search.clear();
		pos_search.param // 쿼리문  입력
	    	.query("select corp_id, hq_id, stor_grp, stor_id, wrhs_id, inv_no, inv_dt, sts_cd, pack_no, pack_gb, pack_seq, pack_vend_id, pack_zone_id, sales_id, tax_free, taxation, sply_amt, tax, amount, qty, ship_qty, user_memo, sys_memo, row_clos, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, org_ord_qty, inv_gb, rest_qty, converted ")
	    	.query("  from edi_pack         ")
	    	.query(" where inv_no = :inv_no ", inv.fixParameter("inv_no"))
		;

		list = pos_search.selectForMap();
		for (SqlResultRow record:list) {
			epo_data.param
	        	.query("insert into order_pack ( corp_id, hq_id, stor_grp, stor_id, wrhs_id, inv_no, inv_dt, sts_cd, pack_no, pack_gb, pack_seq, pack_vend_id, pack_zone_id, sales_id, tax_free, taxation, sply_amt, tax, amount, qty, ship_qty, user_memo, sys_memo, row_clos, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, org_ord_qty, inv_gb, rest_qty, converted, invoiceno ) ")
				.query("values (                                             ")
				.query("       '" + record.getParamText("corp_id"    ) + "' ")
				.query("      ,'" + record.getParamText("hq_id"    ) + "' ")
				.query("      ,'" + record.getParamText("stor_grp"    ) + "' ")
				.query("      ,'" + record.getParamText("wrhs_id"    ) + "' ")
				.query("      ,'" + record.getParamText("wrhs_id"    ) + "' ")
				.query("      ,'" + record.getParamText("inv_no"      ) + "' ")
				.query("      ,to_char(sysdate, 'yyyymmdd')                  ")
				.query("      ,'0010'                                        ")
				.query("      ,'" + record.getParamText("pack_no"     ) + "' ")
				.query("      ,'" + record.getParamText("pack_gb"     ) + "' ")
				.query("      , " + record.getParamText("pack_seq"    ) + "  ")
				.query("      ,'" + record.getParamText("pack_vend_id") + "' ")
				.query("      ,'" + record.getParamText("pack_zone_id") + "' ")
				.query("      ,'" + record.getParamText("sales_id"    ) + "' ")
				.query("      , " + record.getParamText("tax_free"    ) + "  ")
				.query("      , " + record.getParamText("taxation"    ) + "  ")
				.query("      , " + record.getParamText("sply_amt"    ) + "  ")
				.query("      , " + record.getParamText("tax"         ) + "  ")
				.query("      , " + record.getParamText("amount"      ) + "  ")
				.query("      , " + record.getParamText("qty"         ) + "  ")
				.query("      , 0                                            ")
				.query("      ,'" + record.getParamText("user_memo"   ) + "' ")
				.query("      ,'" + record.getParamText("sys_memo"   ) + "' ")
				.query("      , " + record.getParamText("row_clos"   ) + "  ")
				.query("      , " + record.getParamText("row_ord"   ) + "  ")
				.query("      , " + record.getParamText("row_sts"   ) + "  ")
				.query("      ,'" + inv.getParameter("upt_nm")       + "' ")
				.query("      ,'" + arg.remoteAddress                   + "' ")
				.query("      , to_char(sysdate, 'yyyymmddhh24miss')         ")
				.query("      ,'" + inv.getParameter("crt_nm")       + "' ")
				.query("      ,'" + arg.remoteAddress                   + "' ")
				.query("      , to_char(sysdate, 'yyyymmddhh24miss')         ")
				.query("      , " + record.getParamText("org_ord_qty"    ) + "  ")
				.query("      ,'" + record.getParamText("inv_gb"      ) + "' ")
				.query("      , " + record.getParamText("qty"         ) + "  ")
				.query("      ,'" + record.getParamText("converted"   ) + "' ")
				.query("      ,'" + record.getParamText("inv_no"      ) + "' ")
				.query("       )                                             ")
	        ;
			epo_data.attach(Action.direct);
		}
	}

	/**
	 * invoice picking 등록/수정/삭제
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setPicking(HttpRequestArgument arg, DataMessage data, SqlResultMap map, SqlResultRow inv) throws Exception {


		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				/* 상세 삭제 */
	        	data.param
	        		.table("edi_pack")
	        		.where("where  pack_no  		= :pack_no   	   " )
	        		//
	        		.unique("pack_no"   , row.fixParameter("pack_no"  ))
	        		.action = rowaction
	        	; data.attach();

			} else {
	        	data.param
		        	.table("edi_pack")
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

					.unique("pack_no"           , row.fixParameter("pack_no"         ))
					.update("pack_seq"          , row.fixParameter("pack_seq"        ))
					.unique("pack_gb"           , row.fixParameter("pack_gb"         ))

					.insert("pack_vend_id"      , row.getParameter("pack_vend_id"    ))
					.insert("pack_zone_id"      , row.getParameter("pack_zone_id"    ))
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
					.insert("crt_nm" 		, row.getParameter("crt_nm"		))
					.insert("crt_ip"   		, arg.remoteAddress)
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction ;
	        	;data.attach();

			}
		}
		return null ;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setProduct(HttpRequestArgument arg, String pos_data_trsf, DataMessage epo_data, DataMessage epo_search, DataMessage data, SqlResultMap map, SqlResultRow inv ) throws Exception {

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				/* 상세 삭제 */
	        	data.param
	        		.table("edi_dtl")
	        		.where("where  inv_no  		= :inv_no   	   " )
	        		.where("and    line_seqn 		= :line_seqn   	   " )
	        		//
	        		.unique("inv_no"   , row.fixParameter("inv_no"  ))
	        		.unique("line_seqn"  , row.fixParameter("line_seqn" ))
	        		.action = rowaction
	        	; data.attach();

			} else {
	        	data.param
		        	.table("edi_dtl")
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
					.unique("seq_top"           , row.fixParameter("seq_top"        ))
					.unique("seq_dsp"           , row.fixParameter("seq_dsp"        ))

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
					.insert("crt_nm" 		, row.getParameter("crt_nm"		))
					.insert("crt_ip"   		, arg.remoteAddress)
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction ;
	        	;data.attach();




				double  baseamt   = Double.parseDouble(row.getParamText("qty")) * Double.parseDouble(row.getParamText("po_pri"));
				SqlResultRow tax  = NumberUtil.calcSurtax(baseamt, Double.parseDouble(inv.getParamText("tax_rt")), "0".equals(inv.getParamText("tax_recv") ));

				if("0".equals(row.getParameter("notax_yn"))){
					tax.setParameter("tax_free", 0);
					tax.setParameter("taxation", baseamt);
				} else {
					tax.setParameter("tax_free", baseamt);
					tax.setParameter("taxation", 0);
				}

	        	// 주문 생성 시
	        	if (rowaction == Action.insert) {

	        		// 장바구니 삭제
	        		epo_data.param
		        		.table("epo_basket")
	        			.where("where basket_id = :basket_id ")
	        			.where("  and basket_gb = :basket_gb ")
	        			.where("  and item_idcd = :item_idcd     ")
		        		//
	        			.unique("basket_id"   , inv.fixParameter("login_stor_id"))
	        			.unique("basket_gb"   , "0")
	        			.unique("item_idcd"     , row.fixParameter("item_idcd"))
		        	;
	        		epo_data.attach(Action.delete);
	        	}
			}
		}
		return null ;
	}

	/**
	 * 체인점에 품목 추가
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public void setChainItem(HttpRequestArgument arg, DataMessage pos_search, DataMessage epo_search, DataMessage data, SqlResultRow inv) throws Exception {

		pos_search.clear();
		pos_search.param // 쿼리문  입력
        	.query("select unique mst_itm_id   ")
        	.query("  from edi_dtl         ")
        	.query(" where inv_no = :inv_no ", inv.fixParameter("inv_no"))
		;

		SqlResultMap list1 = pos_search.selectForMap();
		for (SqlResultRow record1:list1) {
			epo_search.clear();
			epo_search.param // 쿼리문  입력
		    	.query("select a.hq_id                                           ")
		    	.query("      ,a.stor_grp                                           ")
		    	.query("      ,a.stor_id                                           ")
		    	.query("      ,b.mst_itm_id                                            ")
		    	.query("      ,b.item_idcd                                            ")
		    	.query("      ,'" + inv.getParameter("upt_nm") + "' as upt_nm ")
		    	.query("      ,'" + arg.remoteAddress + "'             as upt_ip ")
		    	.query("      ,dbo.today_char()   as upt_dttm 					    ")
		    	.query("      ,'" + inv.getParameter("crt_nm") + "' as crt_nm ")
		    	.query("      ,'" + arg.remoteAddress + "'             as crt_ip       ")
		    	.query("      ,dbo.today_char()   as crt_dttm                         ")
		    	.query("  from stor a                                              ")
		    	.query("       cross join itm_mst b                               ")
		    	.query(" where a.stor_id = :stor_id                               ", inv.fixParameter("login_stor_id"))
		    	.query("   and b.mst_itm_id = :mst_itm_id                                 ", record1.getParamText("mst_itm_id"))
		    	.query("   and b.item_idcd not in ( select item_idcd                    ")
		    	.query("                            from itm_stor                 ")
		    	.query("                           where stor_id = :stor_id       ", inv.fixParameter("login_stor_id"))
		    	.query("                             and mst_itm_id = :mst_itm_id         ", record1.getParamText("mst_itm_id"))
		    	.query("                        )                                   ")
			;

			SqlResultMap list2 = epo_search.selectForMap();
			for (SqlResultRow record2:list2) {
				data.param
					.query("merge into itm_stor a                                                                                                     ")
					.query("using (                                                                                                                     ")
					.query("      select '" + record2.getParamText("stor_id")  + "' as stor_id                                                        ")
		        	.query("            ,'" + record2.getParamText("item_idcd")   + "' as item_idcd                                                         ")
					.query("        from dual                                                                                                           ")
					.query("      ) b                                                                                                                   ")
					.query("   on (      a.stor_id = b.stor_id                                                                                        ")
					.query("         and a.item_idcd = b.item_idcd                                                                                          ")
					.query("      )                                                                                                                     ")
					.query("when not matched then                                                                                                       ")
					.query("insert ( hq_id, stor_grp, stor_id, mst_itm_id, item_idcd, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm ) ")
					.query("values (                                                                                                                    ")
		        	.query("       '" + record2.getParamText("hq_id")  + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("stor_grp")  + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("stor_id")  + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("mst_itm_id")   + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("item_idcd")   + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("upt_nm") + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("upt_ip") + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("upt_dttm") + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("crt_nm") + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("crt_ip") + "'                                                                          ")
		        	.query("      ,'" + record2.getParamText("crt_dttm") + "'                                                                          ")
					.query("       )                                                                                                                    ")
		        ;
				data.attach(Action.direct);
			}
		}
	}

	/**
	 * 팝업창
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getEpoItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

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
			.where("  where  a.stor_id    = :stor_id  " , arg.fixParameter("stor_id"  ))
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
			.where("  and    b.mfg_id     = :mfg_id     " , arg.getParameter("mfg_id"   ))
			.where("  and    b.brand_id   = :brand_id   " , arg.getParameter("brand_id" ))
			.where("  and    a.vend_id    = :vend_id    " , arg.getParameter("vend_id"  ))
			.where("  and    a.row_sts  = :row_sts   " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("  and    a.row_sts <= :row_sts   " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("  and    b.share_yn   = '1'                                         ") /* 공유상품 */
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

		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param // 쿼리문  입력
			.query("select  a.stor_grp    , a.stor_id ")
			.query("     ,  a.mst_itm_id  , b.mst_itm_cd      , b.unt_qty  ")
			.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,  b.item_idcd      , b.item_code  , b.item_name  , b.item_ds  ,  b.item_spec      ")
			.query("     ,  b.cst_pri     , s.stock   , a.pack_gb  					")
			.query("     ,  b.epo_pri     , case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
			.query("     ,  b.epo_pri as cust_price ")
			.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " )
			.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
			.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id  ) as  vend_nm   " )
			.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
			.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
			.query("	 ,  b.mfg_id       , ( select bas_nm from base_mst where bas_id = b.mfg_id   ) as  mfg_nm    " )
			.query("     ,  case when a.po_pri      =  0  then  b.po_pri      else a.po_pri end       as po_pri      ")
			.query("     ,  case when a.po_pri_type = '0' then  b.po_pri_type else a.po_pri_type end  as po_pri_type ")
			.query("     ,  case when a.po_pri_rt =  0  then  b.po_pri_rt else a.po_pri_rt end  as po_pri_rt ")
			.query("     ,  b.notax_yn                                      ")
			.query("     ,  a.sale_epo                                      ")
			.query("from    itm_stor      a                               ")
			.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
			.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("and     a.row_sts  = 0 " )
		;
		SqlResultMap ret = data.selectForMap();

		// itm_stor.sale_epo 1:수주가능,2:수주불가,3:단종상태,4:매입대기
		// '수주가능' 상품만 장바구니&관심품목 등록 가능하고 불가한 경우 불가상품의 mst_itm_id = item_idcd 인 상품으로 등록
		boolean pass = true;
		String new_item_id[] = new String[ret.size()];
		int new_idx = 0;
		for (SqlResultRow row:ret) {
			if (!"1".equals(row.getParamText("sale_epo"))) {
				new_item_id[new_idx++] = row.getParamText("mst_itm_id");
				pass = false;
			} else {
				new_item_id[new_idx++] = row.getParamText("item_idcd");
			}
		}

		if (!pass) {

			data.clear();
			data.param // 쿼리문  입력
				.query("select  a.stor_grp     , a.stor_id ")
				.query("     ,  a.mst_itm_id      , b.mst_itm_cd      , b.unt_qty  ")
				.query("     ,  b.unit_idcd      ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
				.query("     ,  b.item_idcd      , b.item_code  , b.item_name  ,  b.item_ds,  b.item_spec      ")
				.query("     ,  b.cst_pri   , s.stock    , a.pack_gb  					")
				.query("     ,  b.epo_pri    , case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
				.query("     ,  b.epo_pri as cust_price ")
				.query("	 ,  ( select clss_desct from item_class where class_id = b.class_id ) as  class_nm " )
				.query("	 ,  a.pack_zone_id , ( select bas_nm from base_mst where bas_id = a.pack_zone_id ) as  pack_zone_nm  " )
				.query("     ,  a.vend_id      , ( select vend_nm from vend_mst where vend_id = a.vend_id  ) as  vend_nm   " )
				.query("	 ,  b.sales_id     , ( select bas_nm from base_mst where bas_id = b.sales_id ) as  sales_nm  " )
				.query("	 ,  b.brand_id     , ( select bas_nm from base_mst where bas_id = b.brand_id ) as  brand_nm  " )
				.query("	 ,  b.mfg_id       , ( select bas_nm from base_mst where bas_id = b.mfg_id   ) as  mfg_nm    " )
				.query("     ,  case when a.po_pri      =  0  then  b.po_pri      else a.po_pri end       as po_pri      ")
				.query("     ,  case when a.po_pri_type = '0' then  b.po_pri_type else a.po_pri_type end  as po_pri_type ")
				.query("     ,  case when a.po_pri_rt =  0  then  b.po_pri_rt else a.po_pri_rt end  as po_pri_rt ")
				.query("     ,  b.notax_yn                                      ")
				.query("     ,  a.sale_epo                                      ")
				.query("from    itm_stor      a                               ")
				.query("        join itm_mst  b on b.item_idcd = a.item_idcd      ")
				.query("        left outer join itm_stock s on s.stor_id = a.stor_id and s.item_idcd = a.item_idcd ")
				.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
				.query("and     a.item_idcd   in (:item_idcd) " , new_item_id )
				.query("and     a.row_sts  = 0 " )
			;
			ret = data.selectForMap();
		}

		return ret ;
	}

	/**
	 * 거래처 정보
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getCust(HttpRequestArgument arg) throws Exception {

//		DataMessage data = arg.newStorage("POS");
		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 쿼리문  입력
		.query(" select x.corp_id                                                                   ")
		.query("      , x.hq_id                                                                   ")
		.query("      , x.stor_grp                                                                   ")
		.query("      , x.stor_id                                                                   ")
		.query("      , x.stor_nm                                                                   ")
		.query("      , x.cours_id                                                                  ")
		.query("      , x.cours_nm                                                                  ")
		.query("   ,   b.cust_gb  , a.cust_id , b.cust_cd , b.cust_nm   , b.cust_grp					")

		.query("   ,   c.mmb_id     , c.mmb_nm     ,  c.memb_gb     , c.login_id  , a.sales_gb    ")

		.query("   ,   b.biz_no      , b.biz_nm      ,  b.biz_tel_no  , b.biz_fax_no   , b.biz_email ")
		.query("   ,   b.biz_type    , b.biz_type   ,  b.biz_owner   , b.biz_tax_gb   , b.biz_gb    ")
		.query("   ,   b.biz_zip_cd  , b.biz_state   ,  b.biz_city    , b.biz_dong     , b.biz_addr_2 ")
		.query("   ,   b.colt_schd_type , b.colt_schd_term      ")

		.query("   ,   a.salesman_id , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id ) as salesman_nm  ")
		.query("   ,   a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm  ")
		.query("   ,   a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_2 ) as cls2_nm  ")
		.query("   ,   a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_3 ) as cls3_nm  ")
		.query("   ,   a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_4 ) as cls4_nm  ")
		.query("   ,   a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_5 ) as cls5_nm  ")
		.query("   ,   a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_6 ) as cls6_nm  ")
		.query("   ,   c.tel_no       , c.hp_no       , c.email        ")
		.query("   ,   a.npay_amt      , a.balance_limit  ,  a.limit_control       ")
		.query("   ,   case when a.price_no = 0 then b.price_no else a.price_no end as price_no           ")

		.query("   ,   a.user_memo   , a.row_sts         ")
		.query("  from (                                                                                 ")
		.query("       select d.corp_id    as corp_id                                                  ")
		.query("             ,d.hq_id    as hq_id                                                  ")
		.query("             ,d.stor_grp    as stor_grp                                                  ")
		.query("             ,d.stor_id    as stor_id                                                  ")
		.query("             ,d.stor_nm    as stor_nm                                                  ")
		.query("             ,c.cust_id     as cust_id                                                   ")
		.query("             ,b.cours_id                                                                ")
		.query("             ,b.cours_nm                                                                ")
		.query("         from epo_course a                                                               ")
		.query("              join epo_course b  on b.cours_id = a.prnt_id                            ")
		.query("              join stor c       on c.stor_id  = a.stor_id                             ")
		.query("              join stor d       on d.stor_id  = b.stor_id                             ")
		.query("        where a.stor_id = :stor_id                       ", arg.fixParameter("stor_id")) // 발주처 정보로 발주가능 수주점 코스
		.query("          and b.cours_id = :cours_id                     ", arg.getParameter("cours_id")) // 장바구니&관심품목 주문등록 시 코스ID로 조회
		.query("          and a.row_lvl = 2                                                            ")
		.query("          and b.row_lvl = 1                                                            ")
		.query("       ) x                                                                               ")
		.query("       join cust_stor a   ")
		.query("		    on  a.cust_id   = x.cust_id    ") // 수주처의 거래처 ID 와 조인
		.query("		    and a.stor_id  = x.stor_id   ") // 수주처의 매장 ID 와 조인
		.query("		    and a.row_sts = 0            ") // 정상인 데이터만
		.query("       join cust_mst  b                   ")
		.query("            on  b.cust_id    = x.cust_id   ") // 고객 ID 와 조인
		.query("            and b.cust_sts  = '1'          ") // 고객의 거래 상태가 정상인 경우만
		.query("            and b.row_sts =  0           ") // 정상인 데이터만
		.query("       join cust_memb  c on c.cust_id = x.cust_id  ")
		.query("where  x.stor_nm like %:stor_nm%         ", arg.getParameter("stor_nm"))
	    ;
		return data.selectForMap();
	}

	/**
	 * 주거래처 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getMainCust(HttpRequestArgument arg) throws Exception {

//		DataMessage data = arg.newStorage("POS");
		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 쿼리문  입력
			.query("select d.stor_id    as stor_id                                                   ")
			.query("      ,d.stor_nm    as stor_nm                                                   ")
			.query("      ,c.cust_id     as cust_id                                                    ")
			.query("      ,b.cours_id                                                                 ")
			.query("      ,b.cours_nm                                                                 ")
			.query("  from epo_course a                                                                ")
			.query("       join epo_course b on b.cours_id = a.prnt_id                              ")
			.query("       join stor c      on c.stor_id  = a.stor_id                               ")
			.query("       join stor d      on d.stor_id  = b.stor_id                               ")
			.query("       join cust_mst i  on i.owner_id  = d.stor_id and i.cust_id = c.cust_id     ")
			.query(" where a.stor_id = :stor_id                                                      ", arg.fixParameter("stor_id"))
			.query("   and a.row_lvl = 2                                                             ")
			.query("   and b.row_lvl = 1                                                             ")
		;

	    return data.selectForMap();
	}

	/**
	 * 장바구니&관심품목 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getBasket(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 집계
			.total("select count(1)               as maxsize ")
			.total("      ,sum(a.qty)             as qty     ")
			.total("      ,sum(a.qty*i.epo_pri) as amount  ")
		;
		data.param // 조회
			.query("select a.basket_id                                                                      ")
			.query("      ,a.basket_gb                                                                      ")
			.query("      ,a.mst_itm_id                                                                        ")
			.query("      ,i.mst_itm_cd                                                                        ")
			.query("      ,a.item_idcd                                                                        ")
			.query("      ,i.item_code                                                                        ")
			.query("      ,r.bas_nm + '/' + i.item_name as item_name                                             ")
			.query("      ,i.item_spec                                                                        ")
			.query("      ,i.notax_yn                                                                       ")
			.query("      ,i.brand_id                                                                       ")
			.query("      ,r.bas_nm                 as brand_nm                                            ")
			.query("      ,i.mfg_id                                                                         ")
			.query("      ,m.bas_nm                 as mfg_nm                                              ")
			.query("      ,case when s.po_pri_type = '0' then i.po_pri_type else s.po_pri_type end  as po_pri_type  ")
			.query("      ,case when s.po_pri_rt =  0  then i.po_pri_rt else s.po_pri_rt) end as po_pri_rt  ")
			.query("      ,s.pack_zone_id                                                                   ")
			.query("      ,(select bas_nm from base_mst where bas_id = s.pack_zone_id) as pack_zone_nm   ")
			.query("      ,s.vend_id                                                                        ")
			.query("      ,(select vend_nm from vend_mst where vend_id = s.vend_id)      as vend_nm        ")
			.query("      ,i.sales_id                                                                       ")
			.query("      ,(select bas_nm from base_mst where bas_id = i.sales_id)     as sales_nm       ")
			.query("      ,i.unit_idcd                                                                        ")
			.query("      ,u.unit_name                                                                        ")
			.query("      ,i.unt_qty                                                                       ")
			.query("      ,a.qty                                                                            ")
			.query("      ,case when s.stad_sale_pri = 0 then i.stad_sale_pri else s.stad_sale_pri end as unit_price ")
			.query("      ,i.epo_pri                                   as price                           ")
			.query("      ,case when s.po_pri = 0   then  i.po_pri else s.po_pri end as po_pri      ")
			.query("      ,s.pack_gb                                                                        ")
			.query("      ,a.qty*i.epo_pri                             as amount                          ")
			;
		data.param // 조건
			.where("  from epo_basket a                                                                     ")
			.where("       left outer join itm_stor s                                                     ")
			.where("         on s.stor_id = :stor_id                                                      ", arg.getParameter("stor_id"))
			.where("        and s.item_idcd = a.item_idcd                                                       ")
			.where("       left outer join itm_mst i     on i.item_idcd = a.item_idcd                           ")
			.where("       left outer join item_unit u   on u.unit_idcd = i.unit_idcd                         ")
			.where("       left outer join base_mst r    on r.bas_id = i.brand_id                         ")
			.where("       left outer join base_mst m    on m.bas_id = i.mfg_id                           ")
			.where(" where a.basket_id = :basket_id                                                       ", arg.getParameter("basket_id"))
			.where("   and a.basket_gb = :basket_gb                                                       ", arg.getParameter("basket_gb"))
			.where(" order by a.crt_dttm                                                                 ")
		;

		return data.selectForMap();
	}

	/**
	 * 장바구니&관심품목 등록/수정/삭제
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setBasket(HttpRequestArgument arg) throws Exception {

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		SqlResultRow srr = map.get(0);
		DataMessage data = new DataMessage(StringUtils.substring(srr.fixParamText("stor_id"), 0, 10) + ".POS");

		for (SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				data.param
	    			.table("epo_basket")
	    			.where("where basket_id = :basket_id ")
	    			.where("  and basket_gb = :basket_gb ")
	    			.where("  and item_idcd = :item_idcd     ")
	        		//
        			.unique("basket_id"   , row.fixParameter("basket_id"))
        			.unique("basket_gb"   , row.fixParameter("basket_gb"))
        			.unique("item_idcd"     , row.fixParameter("item_idcd"))
	        		.action = rowaction;
	        	data.attach();

			} else {

				data.param
	    			.table("epo_basket")
        			.where("where basket_id = :basket_id ")
        			.where("  and basket_gb = :basket_gb ")
        			.where("  and item_idcd = :item_idcd     ")
        			//
        			.unique("basket_id"   , row.fixParameter("basket_id"))
        			.unique("basket_gb"   , row.fixParameter("basket_gb"))
        			.unique("item_idcd"     , row.fixParameter("item_idcd"))
	        		.insert("mst_itm_id"     , row.getParameter("mst_itm_id"))
	        		.update("qty"         , row.getParameter("qty"))
					.update("upt_nm"   		, row.getParameter("upt_nm"))
					.update("upt_ip"   		, arg.remoteAddress)
					.insert("crt_nm"   		, row.getParameter("crt_nm"))
					.insert("crt_ip"   		, arg.remoteAddress)
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction;
	        	data.attach();
			}
		}

		data.execute();
		return null;
	}

	/**
	 * 출력
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 쿼리문  입력
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  a.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  a.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  a.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  a.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  a.biz_owner   	    as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  a.biz_addr_1   	as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  a.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  a.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  a.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  		as recv_biz_owner 										") /* 공급받는자 성명 */
			.query("	,  b.addr_1 	  	as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2   		as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 										") /* 공급받는자 종목 */

			.query("	, a.qty 			as qty 												") /* 수량 */
			.query("	, a.sply_amt+a.tax_free as sply_amt		 								") /* 공급가 */
			.query("	, a.tax  			as tax 												") /* 세액 */
			.query("	, a.amount 			as amount 											") /* 계 */
			.query("	, a.user_memo 		as user_memo  										") /* 요청메모 */
			.query("	, (dbo.to_char(getdate(), 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 		") /* 발행일자 */
			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */

			.query(" from order_mst a															")
			.query("	  join stor b on a.stor_id = b.stor_id									")
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
				.query("	,   a.item_code   	    as item_code 												") /* 코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 									") /* 품목 / 규격 */
				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("	,   a.qty 			as qty 													") /* 수량 */
				.query("	,   a.price 		as price 												") /* 단가 */
				.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
				.query("	,   a.tax 			as tax 													") /* 세액 */
				.query("	,   a.amount 		as amount 												") /* 합계 */
				.query("  from  order_item a 															")
				.query("		join itm_mst b on a.item_idcd = b.item_idcd 								")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
				.query("   and  a.row_sts = 0 				            							")
				.query("order by line_seqn		 														")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}
}
