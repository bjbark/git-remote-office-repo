package com.sky.system.item.EcoMast;

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
public class EcoMastService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total("select count(1) as maxsize " )
		;
		data.param
			.query("select																											")
			.query("          a.ecod_idcd       , a.ecod_date       , a.dept_idcd       , a.drtr_idcd       , a.chge_resn_dvcd		")
			.query("        , a.strt_date       , a.endd_date       , a.chge_resn       , a.cofm_yorn       , a.mngt_docm_numb		")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_item_idcd	, a.prnt_idcd       , a.cofm_degr			")
			.query("        , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd       , a.updt_urif			")
			.query("        , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif			")
			.query("        , b.dept_name       , c.user_name       , d.item_name       , d.item_spec       , d.item_code			")
		;
		data.param
			.where("from    eco_mast a																							")
			.where("        left outer join dept_mast b on a.dept_idcd = b.dept_idcd											")
			.where("        left outer join user_mast c on a.drtr_idcd = c.user_idcd											")
			.where("        left outer join item_mast d on a.prnt_item_idcd = d.item_idcd										")
			.where("where   1=1																									")
			.where("and     a.prnt_item_idcd   = :prnt_item_idcd         " , arg.getParameter("prnt_item_idcd"					))
			.where("and     d.find_name like %:find_name%  " , arg.getParamText  ("find_name"									))
			.where("and     a.strt_date >= :fr_dt       " , arg.getParamText("fr_dt"											))
			.where("and     a.endd_date <= :ed_dt       " , arg.getParamText("ed_dt"											))
			.where("and     a.line_stat   < :line_stat	" , "2"																	)
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.ecod_idcd      , a.prnt_item_idcd , a.line_seqn												")
			.query("        , a.chge_optn_dvcd , a.befr_item_idcd , a.befr_unit_idcd , a.befr_ndqt_nmrt						")
			.query("        , a.befr_ndqt_dnmn , a.befr_lwcs_yorn , a.befr_incm_loss , a.befr_otcm_loss , a.befr_stok_plac	")
			.query("        , a.befr_aset_dvcd , a.item_idcd      , a.ivst_wkct_idcd , a.unit_idcd      , a.ndqt_nmrt		")
			.query("        , a.ndqt_dnmn      , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.strt_date		")
			.query("        , a.endd_date 	   , a.stok_plac      , a.stok_unit_idcd , a.aset_clss_dvcd , a.remk_text		")
			.query("        , a.uper_seqn      , a.disp_seqn      , a.sysm_memo      , a.prnt_idcd      , u.unit_name		")
			.query("        , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("        , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("        , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.query("        , b.item_name      , b.item_spec      , c.wkct_name      , a.user_memo							")
			.query("        , a.wkfw_idcd      , w.wkfw_name																")
		;
		data.param
			.where("from   eco_dtil a 																						")
			.where("       left outer join item_mast b on a.item_idcd      = b.item_idcd 									")
			.where("       left outer join wkct_mast c on a.ivst_wkct_idcd = c.wkct_idcd									")
			.where("       left outer join unit_mast u on a.unit_idcd      = u.unit_idcd									")
			.where("       left outer join wkfw_clss w on a.wkfw_idcd      = w.wkfw_idcd									")
			.where("where  1=1																								")
			.where("and    a.ecod_idcd= :ecod_idcd" , arg.getParamText("ecod_idcd"											))
			.where("and    a.line_stat   < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" 					)))
			.where("order by a.line_seqn																					")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select																										")
			.query("          a.ecod_idcd       , a.ecod_date       , a.dept_idcd       , a.drtr_idcd       , a.chge_resn_dvcd	")
			.query("        , a.strt_date       , a.endd_date       , a.chge_resn       , a.cofm_yorn       , a.mngt_docm_numb	")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_item_idcd	, a.prnt_idcd       , a.cofm_degr		")
			.query("        , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd       , a.updt_urif		")
			.query("        , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif		")
			.query("        , b.dept_name       , c.user_name       , d.item_name       , d.item_spec       , d.item_code		")
			.query("from    eco_mast a																							")
			.query("        left outer join dept_mast b on a.dept_idcd = b.dept_idcd											")
			.query("        left outer join user_mast c on a.drtr_idcd = c.user_idcd											")
			.query("        left outer join item_mast d on a.prnt_item_idcd = d.item_idcd										")
			.query("where   1=1																									")
			.query("and     a.ecod_idcd   = :ecod_idcd  " , arg.getParameter("ecod_idcd"										))
			.query("and     a.line_stat   < :line_stat  " , "2"																	)
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.ecod_idcd      , a.prnt_item_idcd , a.line_seqn      , b.item_code							")
				.query("        , a.chge_optn_dvcd , a.befr_item_idcd , a.befr_unit_idcd , a.befr_ndqt_nmrt						")
				.query("        , a.befr_ndqt_dnmn , a.befr_lwcs_yorn , a.befr_incm_loss , a.befr_otcm_loss , a.befr_stok_plac	")
				.query("        , a.befr_aset_dvcd , a.item_idcd      , a.ivst_wkct_idcd , a.unit_idcd      , a.ndqt_nmrt		")
				.query("        , a.ndqt_dnmn      , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.strt_date		")
				.query("        , a.endd_date 	   , a.stok_plac      , a.stok_unit_idcd , a.aset_clss_dvcd , a.remk_text		")
				.query("        , a.uper_seqn      , a.disp_seqn      , a.sysm_memo      , a.prnt_idcd      , u.unit_name		")
				.query("        , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
				.query("        , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.query("        , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.query("        , b.item_name      , b.item_spec      , c.wkct_name      , a.user_memo							")
				.query("        , a.wkfw_idcd      , w.wkfw_name																")
				.query("from    eco_dtil a 																						")
				.query("        left outer join item_mast b on a.item_idcd      = b.item_idcd 									")
				.query("        left outer join wkct_mast c on a.ivst_wkct_idcd = c.wkct_idcd									")
				.query("        left outer join unit_mast u on a.unit_idcd      = u.unit_idcd									")
				.query("        left outer join wkfw_clss w on a.wkfw_idcd      = w.wkfw_idcd									")
				.query("where   1=1																								")
				.query("and     a.ecod_idcd= :ecod_idcd      ", arg.getParamText("ecod_idcd"									))
				.query("and     a.line_stat   < :line_stat	", "2" , "".equals(arg.getParamText("line_stat" 					)))
				.query("order  by a.line_seqn																					")
				;
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}



	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// master 등록/수정
				data.param
					.table("eco_mast													")
					.where("where ecod_idcd = :ecod_idcd								")
					//
					.unique("ecod_idcd"			, row.fixParameter("ecod_idcd"			))
					//
					.update("ecod_date"			, row.getParameter("ecod_date"			))
					.update("dept_idcd"			, row.getParameter("dept_idcd"			))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))
					.update("strt_date"			, row.getParameter("strt_date"			))
					.update("endd_date"			, row.getParameter("endd_date"			))
					.update("chge_resn"			, row.getParameter("chge_resn"			))
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))
					.update("mngt_docm_numb"	, row.getParameter("mngt_docm_numb"		))
					.update("chge_resn_dvcd"	, row.getParameter("chge_resn_dvcd"		))
					.update("prnt_item_idcd"	, row.getParameter("prnt_item_idcd"		))
					.update("cofm_degr"			, row.getParameter("cofm_degr"			))


					.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ row.getParamText("ostt_wrhs_idcd"		).trim()
												+ row.getParamText("cstm_idcd"			).trim()
												+ row.getParamText("remk_text"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, row.getParameter("updt_dttm"			))  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
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
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("eco_dtil"													)
					.where("where ecod_idcd		= :ecod_idcd							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("ecod_idcd"			, row.fixParameter("ecod_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;data.attach(rowaction);

			} else {
				// detail 등록/수정
				data.param
					.table("eco_dtil"													)
					.where("where ecod_idcd       = :ecod_idcd							")  /*  INVOICE번호  */
					.where("and   prnt_item_idcd  = :prnt_item_idcd						")  /*  분모품목ID  */
					.where("and   line_seqn       = :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("ecod_idcd"			, row.fixParameter("ecod_idcd"			))
					.unique("prnt_item_idcd"	, mst.fixParameter("prnt_item_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("chge_optn_dvcd"	, row.getParameter("chge_optn_dvcd"		))
					.update("befr_item_idcd"	, row.getParameter("befr_item_idcd"		))
					.update("befr_unit_idcd"	, row.getParameter("befr_unit_idcd"		))
					.update("befr_ndqt_nmrt"	, row.getParameter("befr_ndqt_nmrt"		))
					.update("befr_ndqt_dnmn"	, row.getParameter("befr_ndqt_dnmn"		))
					.update("befr_lwcs_yorn"	, row.getParameter("befr_lwcs_yorn"		))
					.update("befr_incm_loss"	, row.getParameter("befr_incm_loss"		))
					.update("befr_otcm_loss"	, row.getParameter("befr_otcm_loss"		))
					.update("befr_stok_plac"	, row.getParameter("befr_stok_plac"		))
					.update("befr_aset_dvcd"	, row.getParameter("befr_aset_dvcd"		))
					.update("ivst_wkct_idcd"	, row.getParameter("ivst_wkct_idcd"		))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("ndqt_nmrt"			, row.getParameter("ndqt_nmrt"			))
					.update("ndqt_dnmn"			, row.getParameter("ndqt_dnmn"			))
					.update("lwcs_yorn"			, row.getParameter("lwcs_yorn"			))
					.update("incm_loss_rate"	, row.getParameter("incm_loss_rate"		))
					.update("otcm_loss_rate"	, row.getParameter("otcm_loss_rate"		))
					.update("strt_date"			, row.getParameter("strt_date"			))
					.update("endd_date"			, row.getParameter("endd_date"			))
					.update("stok_plac"			, row.getParameter("stok_plac"			))
					.update("stok_unit_idcd"	, row.getParameter("stok_unit_idcd"		))
					.update("aset_clss_dvcd"	, row.getParameter("aset_clss_dvcd"		))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))
					.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))


					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ row.getParamText("item_idcd"			).trim()
												+ row.getParamText("remk_text"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;data.attach(rowaction);
			}
		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		temp.param
			.query("select line_stat, line_clos				")
			.query("from  eco_mast							")
		 	.query("where ecod_idcd = :ecod_idcd", arg.fixParameter("ecod_idcd"))
		;
		SqlResultRow del = temp.selectForRow();

		data.param
			.table("eco_mast")
			.where("where ecod_idcd = :ecod_idcd ")
			//
			.unique("ecod_idcd"		, arg.fixParameter("ecod_idcd"))
			.update("line_stat"		, 2)
//			.update("updt_idcd"		, arg.getParameter("updt_user_name"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setStps(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_spts_insert (			")
			.query("   :STOR "       , stor			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String deli_date	= arg.getParamText("deli_date");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_copy (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String ecod_idcd	= arg.getParamText("ecod_idcd") ;
		String cofm_yorn  = arg.getParamText("cofm_yorn");
		System.out.println("ecod_idcd : "+ecod_idcd);
		data = arg.newStorage("POS");
		data.param
			.table("eco_mast"														)
			.where("where ecod_idcd		= :ecod_idcd								")

			//
			.unique("ecod_idcd"			,									ecod_idcd)

			//
			.update("cofm_yorn"	, 											cofm_yorn)

		;
		data.attach(Action.update);
		data.execute();
		data.clear();


		data.param
				.query("call auto_eco_ok (			")
				.query("   :ecod_idcd  "  , ecod_idcd	 )  // Invoice 번호
				.query(" , :cofm_yorn "  , cofm_yorn 	 )  //
				.query(" )								")

		;
		data.attach(Action.direct);



		data.execute();
		return null;

	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
		.query("select a.*																								")
		.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
		.query("from (																									")
		.query("select																									")
		.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
		.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
		.query("     ,  0  as cst_pri																					")
		.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
		.query("     ,  0  as sale_pri																					")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
		.query("     ,  a.modl_name																						")
		.query("from    item_mast a																						")
		.query("where   1=1																								")
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
		.query("and     a.line_stat = 0																					")
		.query("and     a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query(") a																										")
		;

		return data.selectForMap();
	}
}
