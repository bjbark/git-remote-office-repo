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
public class TotalPoPlanService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select a.row_clos                    ")
			.query("      ,a.inv_no                       ")
			.query("      ,a.inv_dt                       ")
			.query("      ,b.dept_nm as inv_dept_nm       ")
			.query("      ,c.emp_nm as inv_usr_nm       ")
			.query("      ,a.vend_nm                      ")
			.query("      ,a.sts_cd                       ")
			.query("      ,a.user_memo                    ")
		;
		data.param // 조건
			.where("  from po_plan_mst a                      ")
			.where("       left outer join dept_mst b   on b.dept_id = a.inv_dept_id ")
			.where("       left outer join usr_mst c    on c.emp_id = a.inv_usr_id ")
			.where(" where a.hq_id = :hq_id               ", arg.fixParameter("hq_id" ))
			.where("   and a.inv_dt between :fr_dt        ", arg.fixParameter("fr_dt"))
			.where("                    and :to_dt        ", arg.fixParameter("to_dt"))
			.where("   and a.inv_dept_id = :inv_dept_id   ", arg.getParameter("inv_dept_id"  ))
			.where("   and a.inv_usr_id  = :inv_usr_id    ", arg.getParameter("inv_usr_id"  ))
			.where("   and a.sts_cd = :sts_cd             ", arg.getParameter("sts_cd"))
			.where("   and a.vend_id = :vend_id           ", arg.getParameter("vend_id"))
			.where("   and a.row_clos = :row_clos         ", arg.getParameter("row_clos"))
			.where("   and a.row_sts = 0 				  ")
			.where(" order by a.inv_no desc               ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
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
		.query("select a.line_seqn                                          ")
		.query("      ,a.item_code                                          ")
		.query("      ,a.item_name                                          ")
		.query("      ,a.item_spec                                          ")
		.query("      ,r.bas_nm as brand_nm                              ")
		.query("      ,m.bas_nm as mfg_nm                                ")
		.query("      ,c.unit_name                                          ")
		.query("      ,a.unt_qty                                         ")
		.query("      ,a.qty                                              ")
		.query("      ,a.price                                            ")
		.query("      ,a.amount                                           ")
		.query("      ,isnull(b.stor_qty, 0) as stor_qty                   ")
		.query("      ,case                                               ")
		.query("         when a.notax_yn = '0' then isnull(a.price * b.stor_qty * 1.1, 0) ")
		.query("         else isnull(a.price * b.stor_qty, 0) end as stor_amount  ")
		.query("  from po_plan_dtl a                                     ")
		.query("       left outer join (                                  ")
		.query("                       select inv_no                      ")
		.query("                             ,line_seqn                     ")
		.query("                             ,sum(stor_qty) as stor_qty ")
		.query("                         from po_plan_store               ")
		.query("                        group by inv_no, line_seqn          ")
		.query("                       ) b                                ")
		.query("          on b.inv_no = a.inv_no                          ")
		.query("         and b.line_seqn = a.line_seqn                        ")
		.query("       left outer join item_unit c on c.unit_idcd = a.unit_idcd   ")
		.query("       left outer join itm_mst i   on i.item_idcd = a.item_idcd   ")
		.query("       left outer join base_mst r  on r.bas_id = i.brand_id ")
		.query("       left outer join base_mst m  on m.bas_id = i.mfg_id   ")
		.query(" where a.inv_no = :inv_no                                 ", arg.fixParameter("inv_no"))
		.query("   and a.row_sts = 0 				                      ")
		.query(" order by a.line_seqn                                       ")
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
		.query("      ,a.inv_dt                       ")
		.query("      ,a.trmn_dt                     ")
		.query("      ,a.vend_id                      ")
		.query("      ,a.vend_nm                      ")
		.query("      ,a.vend_gb                      ")
		.query("      ,a.inv_dept_id                  ")
		.query("      ,b.dept_nm     as inv_dept_nm   ")
		.query("      ,a.inv_usr_id                  ")
		.query("      ,c.emp_nm     as inv_usr_nm   ")
		.query("      ,a.user_memo                    ")
		.query("  from po_plan_mst a                      ")
		.query("       left outer join dept_mst b     on b.dept_id = a.inv_dept_id ")
		.query("       left outer join usr_mst c      on c.emp_id  = a.inv_usr_id ")
		.query(" where a.inv_no = :inv_no             ", arg.fixParameter("inv_no" ))
		.query("   and a.row_sts = 0 				  ")
		;

		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();

			data.param // 쿼리문  입력
			.query("select a.inv_no                    ")
			.query("      ,a.line_seqn                   ")
			.query("      ,a.line_seqn as seq_top        ")
			.query("      ,a.line_seqn as seq_dsp        ")
			.query("      ,a.item_idcd                   ")
			.query("      ,a.item_code                   ")
			.query("      ,a.item_name                   ")
			.query("      ,a.item_spec                   ")
			.query("      ,a.mst_itm_id                   ")
			.query("      ,a.mst_itm_cd                   ")
			.query("      ,a.unit_idcd                   ")
			.query("      ,b.unit_name                   ")
			.query("      ,a.unt_qty                  ")
			.query("      ,a.notax_yn                  ")
			.query("      ,a.unit_price                ")
			.query("      ,a.item_halin                ")
			.query("      ,a.price                     ")
			.query("      ,a.qty                       ")
			.query("      ,a.tax_free                  ")
			.query("      ,a.taxation                  ")
			.query("      ,a.sply_amt                  ")
			.query("      ,a.tax                       ")
			.query("      ,a.amount                    ")
			.query("      ,a.user_memo                 ")
			.query("  from po_plan_dtl  a             ")
			.query("       left outer join item_unit b  on b.unit_idcd = a.unit_idcd ")
			.query(" where a.inv_no = :inv_no          ", arg.fixParameter("inv_no"))
			.query("   and a.row_sts = 0 			   ")
			.query(" order by a.line_seqn                ")
			;

			info.get(0).put("product", data.selectForMap());
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


				} else {

					// 기획정보 등록/수정
		        	data.param
		    			.table("po_plan_mst")
		    			.where("where inv_no = :inv_no ")
			        	//
						.insert("corp_id"    , row.getParameter("corp_id"   ))
						.insert("hq_id"    , row.getParameter("hq_id"   ))
						.insert("stor_grp"    , row.getParameter("stor_grp"   ))
						.unique("inv_no"      , row.fixParameter("inv_no"     ))
						.update("inv_dt"      , row.getParameter("inv_dt"     ))
						.update("trmn_dt"    , row.getParameter("trmn_dt"   ))
						.update("inv_dept_id" , row.getParameter("inv_dept_id"))
						.update("inv_usr_id" , row.getParameter("inv_usr_id"))
						.insert("sts_cd"      , row.getParameter("sts_cd"     ))
						.insert("vend_id"     , row.getParameter("vend_id"    ))
						.insert("vend_nm"     , row.getParameter("vend_nm"    ))
						.insert("vend_gb"     , row.getParameter("vend_gb"    ))
						.update("user_memo"   , row.getParameter("user_memo"  ))
						.update("upt_nm"   , row.getParameter("upt_nm"  ))
						.update("upt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.insert("crt_nm"   , row.getParameter("crt_nm"  ))
						.insert("crt_ip"   , new SqlParamText("'" + arg.remoteAddress + "'"))
						.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.action = rowaction;
		        	data.attach();

		        	if(row.getParameter("product", SqlResultMap.class) != null) {
		        		setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
		        	}
				}
			}
			// 마감 / 해지
			else {

				if (rowaction == Action.update) {

		        	data.param
		    			.table("po_plan_mst")
		    			.where("where inv_no = :inv_no ")
			        	//
						.unique("inv_no"      , row.fixParameter("inv_no"     ))
					;

		        	// 마감&해지
		        	if ("1".equals(flag)) {
			        	data.param
		        		.update("row_clos"   	, row.getParameter("row_clos"  ))
			        	;
		        	}

		        	data.param
						.update("upt_nm"   		, row.getParameter("upt_nm"  ))
						.update("upt_ip"   		, new SqlParamText("'" + arg.remoteAddress + "'"))
						.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
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

				// 기획상세 삭제
	        	data.param
        			.table("po_plan_dtl")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
        			//
        			.unique("inv_no"  , row.fixParameter("inv_no"))
        			.unique("line_seqn" , row.fixParameter("line_seqn"))
        			.action = rowaction;
	        	data.attach();

			} else {

				// 기획상세 등록/수정
	        	data.param
	    			.table("po_plan_dtl")
        			.where("where inv_no = :inv_no   ")
        			.where("  and line_seqn = :line_seqn ")
		        	//
					.unique("hq_id"   , row.getParameter("hq_id"  ))
					.unique("stor_grp"   , row.getParameter("stor_grp"  ))
					.unique("inv_no"     , row.getParameter("inv_no"    ))
					.unique("line_seqn"    , row.getParameter("line_seqn"   ))
					.insert("mst_itm_id"    , row.getParameter("mst_itm_id"   ))
					.insert("mst_itm_cd"    , row.getParameter("mst_itm_cd"   ))
					.insert("unit_idcd"    , row.getParameter("unit_idcd"   ))
					.insert("unt_qty"   , row.getParameter("unt_qty"  ))
					.insert("item_idcd"    , row.getParameter("item_idcd"   ))
					.insert("item_code"    , row.getParameter("item_code"   ))
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
					.update("row_sts"  , row.getParameter("row_sts" ))
					.update("upt_nm"  , row.getParameter("crt_nm" ))
					.update("upt_ip"  , new SqlParamText("'" + arg.remoteAddress + "'"))
					.insert("crt_nm"  , row.getParameter("crt_nm" ))
					.insert("crt_ip"  , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
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
		 	.query("select sts_cd from po_plan_mst where inv_no = :inv_no", arg.fixParameter("inv_no"))
		;
		SqlResultRow del = temp.selectForRow();

		String work_stscd   = arg.getParamText("sts_cd").toString();		// 로컬 상태
		String server_stscd = del.getParamText("sts_cd").toString();		// 서버 상태

		DataMessage data = arg.newStorage("POS");

		if (del != null ) {
			// 로컬과 서버의 상태가 동일할 경우
			if (work_stscd.equals(server_stscd)) {
			} else {
				throw new ServiceException("정상적인 삭제작업이 아닙니다. 상태 불일치");
			}
		}

		// 상태 재확인
		if ("0010".equals(work_stscd)) {
        	data.param
	    		.table("po_plan_dtl")
	    		.where("where inv_no = :inv_no ")
	    		//
	    		.unique("inv_no"   		, arg.fixParameter("inv_no"))
	    		.update("row_sts"		, 2)
				.update("upt_nm"		, arg.getParameter("upt_nm"))
				.update("upt_ip"		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    	;data.attach(Action.update);

	    	data.param
				.table("po_plan_mst")
				.where("where inv_no = :inv_no ")
				//
				.unique("inv_no"   		, arg.fixParameter("inv_no"))
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
	 * 사업장별 분배 - master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPlanMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
			.total("      ,sum(b.qty)                           as qty       ")
			.total("      ,sum(isnull(c.sum_allot_qty, 0))         as allot_qty ")
			.total("      ,sum(b.qty - isnull(c.sum_allot_qty, 0)) as rest_qty  ")
			.total("      ,sum(isnull(c.sum_stor_qty, 0))         as stor_qty ")
		;
		data.param // 조회
			.query("select a.trmn_dt                                            ")
			.query("      ,b.inv_no                                              ")
			.query("      ,b.line_seqn                                             ")
			.query("      ,b.item_code                                             ")
			.query("      ,b.item_name                                             ")
			.query("      ,b.item_spec                                             ")
			.query("      ,d.unit_name                                             ")
			.query("      ,b.qty                                                 ")
			.query("      ,isnull(c.sum_allot_qty, 0)         as allot_qty          ")
			.query("      ,b.qty - isnull(c.sum_allot_qty, 0) as rest_qty           ")
			.query("      ,isnull(c.sum_stor_qty, 0)         as stor_qty          ")
		;
		data.param // 조건
			.where("  from po_plan_mst a                                             ")
			.where("         join po_plan_dtl b                                 ")
			.where("            on b.inv_no = a.inv_no                           ")
			.where("           and b.row_sts = 0                               ")
			.where("         left outer join (                                   ")
			.where("                         select inv_no                       ")
			.where("                               ,line_seqn                      ")
			.where("                               ,sum(allot_qty) sum_allot_qty ")
			.where("                               ,sum(stor_qty) sum_stor_qty ")
			.where("                           from po_plan_store                ")
			.where("                          group by inv_no, line_seqn           ")
			.where("                         ) c                                 ")
			.where("            on c.inv_no = b.inv_no                           ")
			.where("           and c.line_seqn = b.line_seqn                         ")
			.where("         left outer join item_unit d                         ")
			.where("            on d.unit_idcd = b.unit_idcd                         ")
			.where(" where a.hq_id = :hq_id              ", arg.fixParameter("hq_id" ))
			.where("   and a.inv_no = :inv_no            ", arg.getParameter("inv_no" ))
			.where("   and a.inv_dt between :fr_dt       ", arg.getParameter("fr_dt"))
			.where("                    and :to_dt       ", arg.getParameter("to_dt"))
			.where("   and a.inv_dept_id = :inv_dept_id  ", arg.getParameter("inv_dept_id"  ))
			.where("   and a.inv_usr_id = :inv_usr_id    ", arg.getParameter("inv_usr_id"  ))
			.where("   and a.sts_cd = :sts_cd            ", arg.getParameter("sts_cd"))
			.where("   and a.row_sts = 0 			                             ")
			.where(" order by b.inv_no desc, b.line_seqn                           ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * 사업장별 분배 - detail 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getPlanDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
		.query("select b.hq_id                                                                          ")
		.query("      ,b.stor_grp                                                                          ")
		.query("      ,b.inv_no                                                                            ")
		.query("      ,b.line_seqn                                                                           ")
		.query("      ,a.row_clos                                                                         ")
		.query("      ,a.sts_cd                                                                            ")
		.query("      ,c.stor_id                                                                          ")
		.query("      ,c.stor_nm                                                                          ")
		.query("      ,isnull(d.allot_qty, 0) as allot_qty                                                    ")
		.query("      ,isnull(d.stor_qty, 0) as stor_qty                                                    ")
		.query("      ,decode(b.unt_qty, 0, isnull(e.stock, 0), isnull(e.stock, 0)/isnull(b.unt_qty, 1)) as stock ")
		.query("  from po_plan_mst a                                                                           ")
		.query("       left outer join po_plan_dtl b                                                      ")
		.query("          on b.inv_no = a.inv_no                                                           ")
		.query("       left outer join stor c                                                             ")
		.query("          on c.stor_grp = a.stor_grp                                                       ")
		.query("         and c.stor_sts < '3000'                                                          ")
		.query("         and c.row_sts = 0                                                               ")
		.query("       left outer join po_plan_store d                                                     ")
		.query("          on d.stor_grp = c.stor_grp                                                       ")
		.query("         and d.stor_id = c.stor_id                                                       ")
		.query("         and d.inv_no = :inv_no                                                            ", arg.fixParameter("inv_no" ))
		.query("         and d.line_seqn = :line_seqn                                                          ", arg.fixParameter("line_seqn" ))
		.query("       left outer join itm_stock e                                                        ")
		.query("          on e.stor_id = c.stor_id                                                       ")
		.query("         and e.item_idcd = b.item_idcd                                                         ")
		.query(" where b.inv_no = :inv_no                                                                  ", arg.fixParameter("inv_no" ))
		.query("   and b.line_seqn = :line_seqn                                                                ", arg.fixParameter("line_seqn" ))
		.query("   and a.row_sts = 0 			                                                           ")
		.query("   and b.row_sts = 0 			                                                           ")
		.query(" order by c.stor_id                                                                       ")
		;

		return data.selectForMap();
	}

	/**
	 * 사업장별 분배 - detail 수정
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setPlanDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.update) {

				String allot_qty = row.getParamText("allot_qty");

				// 분배 삭제
				if ("".equals(allot_qty) || "0".equals(allot_qty)) {

		        	data.param
	        			.table("po_plan_store")
	        			.where("where inv_no = :inv_no     ")
	        			.where("  and line_seqn = :line_seqn   ")
	        			.where("  and stor_id = :stor_id ")
	        			//
	        			.unique("inv_no"   , row.fixParameter("inv_no"))
	        			.unique("line_seqn"  , row.fixParameter("line_seqn"))
	        			.unique("stor_id" , row.fixParameter("stor_id"))
	        			.action = Action.delete;
		        	data.attach();
				}
				// 분배 등록/수정
				else {
		        	data.param
						.query("merge into po_plan_store a                                ")
						.query("using (                                                   ")
						.query("      select :inv_no                                      ", row.fixParameter("inv_no"))
						.query("                       as inv_no                          ")
						.query("            ,:line_seqn                                     ", row.fixParameter("line_seqn"))
						.query("                       as line_seqn                         ")
						.query("            ,:stor_id                                    ", row.fixParameter("stor_id"))
						.query("                       as stor_id                        ")
						.query("        from dual                                         ")
						.query("      ) b                                                 ")
						.query("   on (      a.inv_no = b.inv_no                          ")
						.query("         and a.line_seqn = b.line_seqn                        ")
						.query("         and a.stor_id = b.stor_id                      ")
						.query("      )                                                   ")
						.query("when matched then                                         ")
						.query("update                                                    ")
			        	.query("   set a.allot_qty = :allot_qty                           ", row.fixParameter("allot_qty"))
			        	.query("      ,a.upt_nm = :upt_nm                           ", row.fixParameter("upt_nm"))
			        	.query("      ,a.upt_ip = '" + arg.remoteAddress + "'          ")
			        	.query("      ,a.upt_dttm = dbo.to_char(getdate(), 'yyyymmddhh24miss') ")
						.query("when not matched then                                     ")
						.query("insert (                                                  ")
						.query("       hq_id                                           ")
						.query("      ,stor_grp                                           ")
						.query("      ,inv_no                                             ")
						.query("      ,line_seqn                                            ")
						.query("      ,stor_id                                           ")
						.query("      ,allot_qty                                          ")
						.query("      ,stor_qty                                          ")
						.query("      ,upt_nm                                          ")
						.query("      ,upt_ip                                          ")
						.query("      ,upt_dttm                                          ")
						.query("      ,crt_nm                                          ")
						.query("      ,crt_ip                                          ")
						.query("      ,crt_dttm                                          ")
						.query("       )                                                  ")
						.query("values (                                                  ")
			        	.query("       :hq_id     ", row.fixParameter("hq_id"))
			        	.query("      ,:stor_grp  ", row.fixParameter("stor_grp"))
			        	.query("      ,:inv_no    ", row.fixParameter("inv_no"))
			        	.query("      ,:line_seqn   ", row.fixParameter("line_seqn"))
			        	.query("      ,:stor_id   ", row.fixParameter("stor_id"))
			        	.query("      ,:allot_qty ", row.fixParameter("allot_qty"))
			        	.query("      ,0                                                  ")
			        	.query("      ,:upt_nm    ", row.fixParameter("upt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                        ")
			        	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss')         ")
			        	.query("      ,:crt_nm    ", row.fixParameter("crt_nm"))
			        	.query("      ,'" + arg.remoteAddress + "'                        ")
			        	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss')         ")
						.query("       )                                                  ")
						.action = Action.direct;
		        	data.attach();
				}
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

			.query("	, 0 				as qty 												") /* 수량 */
			.query("	, 0 				as sply_amt		 									") /* 공급가 */
			.query("	, 0  				as tax 												") /* 세액 */
			.query("	, 0 				as amount 											") /* 계 */
			.query("	, a.user_memo 		as user_memo  										") /* 요청메모 */
			.query("	, (dbo.to_char(getdate(), 'yyyy-mm-dd hh24:mi:ss')) as print_dt 		") /* 발행일자 */
			.query("	, (substring(a.crt_dttm, 0,4)+'-'+substring(a.crt_dttm, 5,2)+'-'+substring(a.crt_dttm, 7,2) ") /* 등록일자 */
			.query("	  +' '+substring(a.crt_dttm, 9,2)+':'+substring(a.crt_dttm, 11,2)+':'+substring(a.crt_dttm, 13,2)) as crt_dttm ") /* 등록일자 */
			.query("    , b.stamp_url as stamp_url												") /* 직인 이미지 URL */
			.query("    , (select emp_nm from usr_mst where emp_id = a.inv_usr_id) as inv_usr_nm	") /* 발주자명 */

			.query(" from po_plan_mst a															")
			.query("	  join stor b on a.stor_grp = b.stor_id									")
			.query("	  left outer join vend_mst c on a.vend_id = c.vend_id					")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param // 쿼리문  입력
				.query("select 																			")
				.query(" 		a.line_seqn   	as seq_dsp 												") /* 항번 */
				.query("	,   b.item_sc   	as item_sc 												") /* 단축코드 */
				.query("	,   a.item_code   		as item_code 												") /* 코드 */
				.query("	,   b.brcd_1      	as barcode	 											") /* 바코드 */
				.query("	,   (a.item_name+'/'+a.item_spec) as item_name 										") /* 품목 / 규격 */
				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name		") /* 단위 */
				.query("    ,   ('('+a.unt_qty+')') as unt_qty   										") /* 포장량 */
				.query("	,   a.qty 			as qty 													") /* 수량 */
				.query("	,   a.price 		as price 												") /* 단가 */
				.query("	,   a.sply_amt+a.tax_free as sply_amt 										") /* 금액 */
				.query("	,   a.tax 			as tax 													") /* 세액 */
				.query("	,   a.amount 		as amount 												") /* 합계 */
				.query("  from  po_plan_dtl a 															")
				.query("		join itm_mst b on a.item_idcd = b.item_idcd 									")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"           ))
				.query("   and  a.qty   <> 0	 														")
				.query("order by line_seqn		 														")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

}
