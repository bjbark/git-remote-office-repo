package com.sky.system.qc.insp.inspentry52;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class InspEntry52Service  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getOstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.bzpl_idcd       , a.invc_date         , a.spts_numb			")
			.query("		, a.spts_seqn       , a.spts_date       , a.spts_dept_idcd    , a.spts_drtr_idcd	")
			.query("		, a.item_idcd       , a.unit_idcd       , a.spts_qntt         , a.deli_date			")
			.query("		, a.wrhs_idcd       , a.cstm_idcd       , a.insp_drtr_idcd    , a.pass_qntt			")
			.query("		, a.poor_qntt       , a.remk_text													")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl			")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name			")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd			")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm			")
			.query("		, a.crte_idcd       , a.crte_urif       , b.wrhs_name         , c.item_name			")
			.query("		, d.cstm_name       , e.user_name       , c.item_spec								")
			.query("		, a.insp_mthd_dvcd  , a.insp_qntt       , a.judt_dvcd								")

		;
		data.param
			.where("from   ostt_insp a																			")
			.where("       left outer join wrhs_mast b on a.wrhs_idcd = b.wrhs_idcd 							")
			.where("       left outer join item_mast c on a.item_idcd = c.item_idcd 							")
			.where("       left outer join cstm_mast d on a.cstm_idcd = d.cstm_idcd 							")
			.where("       left outer join user_mast e on a.insp_drtr_idcd = e.user_idcd						")
			.where("where  1=1																					")
			.where("and    a.spts_numb = :spts_numb		" , arg.getParamText("spts_numb" 					))
			.where("and    a.spts_seqn = :spts_seqn		" , arg.getParamText("spts_seqn" 					))
		;
		return data.selectForMap();

	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      ,a.unit_idcd		")
			.query("		, a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      ,a.optn_psbl_yorn	")
			.query("		, a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric ,a.invc_qntt		")
			.query("		, a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      ,a.vatx_amnt		")
			.query("		, a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt ,a.stnd_unit		")
			.query("		, a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      ,a.dlvy_date		")
			.query("		, a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      ,a.dlvy_memo		")
			.query("		, a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      ,a.prnt_idcd		")
			.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      ,a.find_name		")
			.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      ,a.updt_urif		")
			.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      ,a.crte_urif		")
			.query("		, b.item_code      , b.item_name      , b.item_spec      , u.unit_name							")
		;
		data.param
			.where("from   acpt_item a																						")
			.where("       left outer join item_mast b on a.item_idcd = b.item_idcd											")
			.where("       left outer join unit_mast u on b.unit_idcd = u.unit_code											")
			.where("where  1=1																								")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																	")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate				")
			.query("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.query("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif														")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("		, (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.query("		, (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.query("from    acpt_mast a																				")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd							")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd							")
			.query("where   1=1																						")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      ,a.unit_idcd		")
				.query("		, a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      ,a.optn_psbl_yorn	")
				.query("		, a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric ,a.invc_qntt		")
				.query("		, a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      ,a.vatx_amnt		")
				.query("		, a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt ,a.stnd_unit		")
				.query("		, a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      ,a.dlvy_date		")
				.query("		, a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      ,a.dlvy_memo		")
				.query("		, a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      ,a.prnt_idcd		")
				.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      ,a.find_name		")
				.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      ,a.updt_urif		")
				.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      ,a.crte_urif		")
				.query("		, b.item_code      , b.item_name      , b.item_spec      , u.unit_name							")
				.query("from   acpt_item a																						")
				.query("       left outer join item_mast b on a.item_idcd = b.item_idcd											")
				.query("       left outer join unit_mast u on b.unit_idcd = u.unit_code											")
				.query("where   1=1																								")
				.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	/**
	 */
	public SqlResultMap getSearchSpts(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																			")
		;
		data.param
			.query("from (																				")
			.query("select  a.invc_numb        , a.invc_date       , a.bzpl_idcd     , a.expt_dvcd		")
			.query("      , a.cstm_idcd        , c.cstm_name       , a.ostt_dvcd     					")
			.query("      , a.drtr_idcd        , u.user_name as      drtr_name							")
			.query("      , a.dept_idcd        , a.ostt_schd_date  , a.ostt_yorn     , a.ostt_date		")
			.query("      , a.trut_dvcd        , a.dlvy_cond_dvcd  , a.deli_date     , a.sale_stor_yorn	")
			.query("      , a.remk_text        															")
		;
		data.param
			.query("from  spts_mast a																	")
			.query("	left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd						")
			.query("	left outer join user_mast u on a.drtr_idcd = u.user_idcd						")
			.query("where  1=1																			")
			.query("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.query("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.query("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.query("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.query("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.query("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.query("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.query("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.query("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("group by a.invc_numb																")
			.query("order by a.ostt_schd_date desc , a.invc_numb	limit 999999999 ) a						")
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
	public SqlResultMap getDetailSpts(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  a.invc_numb      , a.line_seqn       , a.acpt_numb      , a.acpt_seqn		")
			.query("      , a.item_idcd      , i.item_name       , i.item_spec							")
			.query("      , a.sale_unit      , a.norm_sale_pric  , a.sale_stnd_pric , a.sale_pric		")
			.query("      , a.trst_qntt      , a.vatx_incl_yorn  , a.vatx_rate      , a.sale_amnt		")
			.query("      , a.vatx_amnt      , a.deli_date      , a.stnd_unit		")
			.query("      , a.stnd_unit_qntt , a.wrhs_idcd       , a.dlvy_cstm_idcd , a.dsct_yorn		")
			.query("      , a.ostt_dvcd      , a.insp_dvcd       , a.insp_date      , a.pcod_numb		")
			.query("      , a.ostt_yorn      , a.ostt_date       , a.ostt_qntt     						")
			.query("      , a.uper_seqn      , a.disp_seqn       										")
			.query("      , o.insp_mthd_dvcd , o.insp_qntt       , o.judt_dvcd      , o.pass_qntt		")
			.query("      , o.poor_qntt      , (a.sale_amnt + a.vatx_amnt) as ttsm_amnt 				")
		;
		data.param
			.query("from    spts_item a 																")
			.query("        left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.query("        left outer join ostt_insp o on a.invc_numb = o.spts_numb					")
			.query("                                   and a.line_seqn = o.spts_seqn					")
			.query("where   1=1																			")
			.where("and     a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"				))
			.where("and     a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																")
		;
		return data.selectForMap();
	}


	public SqlResultMap setOstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			if (rowaction == Action.delete) {

			} else {
				data.param
					.table("ostt_insp")
					.where("where invc_numb  = :invc_numb")
					.where("and   line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("spts_seqn"		))

					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"))
					.update("invc_date"				, row.getParameter("invc_date"))
					.update("spts_numb"				, row.getParameter("spts_numb"))
					.update("spts_seqn"				, row.getParameter("spts_seqn"))
					.update("spts_date"				, row.getParameter("spts_date"))
					.update("spts_dept_idcd"		, row.getParameter("spts_dept_idcd"))
					.update("spts_drtr_idcd"		, row.getParameter("spts_drtr_idcd"))
					.update("item_idcd"				, row.getParameter("item_idcd"))
					.update("unit_idcd"				, row.getParameter("unit_idcd"))
					.update("spts_qntt"				, row.getParameter("spts_qntt"))
					.update("deli_date"				, row.getParameter("deli_date"))
					.update("wrhs_idcd"				, row.getParameter("wrhs_idcd"))
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"))
					.update("insp_drtr_idcd"		, row.getParameter("insp_drtr_idcd"))
					.update("pass_qntt"				, row.getParameter("pass_qntt"))
					.update("poor_qntt"				, row.getParameter("poor_qntt"))
					.update("remk_text"				, row.getParameter("remk_text"))
					.update("insp_mthd_dvcd"		, row.getParameter("insp_mthd_dvcd"))
					.update("insp_qntt"				, row.getParameter("insp_qntt"))
					.update("judt_dvcd"				, row.getParameter("judt_dvcd"))
//					.update("lott_numb"				, row.getParameter("lott_numb"))


					.update("uper_seqn"				, row.getParameter("uper_seqn"))
					.update("disp_seqn"				, row.getParameter("disp_seqn"))


					.update("find_name"				, row.getParameter("spts_numb")
							+ " "
							+ row.getParameter("spts_seqn"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}

		data.execute();
		return null ;
	}

	public SqlResultMap setPass(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String invc_date1	= arg.getParamText("invc_date") ;
		String invc_date	= invc_date1.replaceAll("-", "") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.query("call auto_inspentry5 (			")
			.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :invc_date "  , invc_date	)  // 납기일자
			.query(" ) 								")
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




	/**
	 * 출력
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.addr_1 		as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  b.addr_2   		as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_kind    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1 		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_kind   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, -a.qty 			as qty 												") /* 수량 */
			.query("	, -a.sply_amt+a.txfree_amt as sply_amt		 							") /* 공급가 */
			.query("	, -a.tax_amt  		as tax_amt 											") /* 세액 */
			.query("	, -a.inv_amt 		as inv_amt 											") /* 계 */
			.query("	, a.usr_memo 		as usr_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url       as stamp_url										") /* 직인 이미지 URL */
			.query("	, d.emp_nm         	as inv_user_nm 										") /* 작업자명 */

			.query(" from modi_info a															")
			.query("	  join stor b on a.stor_id = b.stor_id									")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id					")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query(" 		a.seq_dsp   	as seq_dsp 										") /* 항번 */
				.query("	,   b.itm_shrt_cd   as itm_shrt_cd 									") /* 단축코드 */
				.query("	,   a.item_code   		as item_code 										") /* 코드 */
				.query("	,   b.brcd_1   		as brcd 										") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 							") /* 품목 / 규격 */
				.query("	,   (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('(' + a.piece_qty + ')') as piece_qty   						") /* 포장량 */
				.query("	,   -a.qty 			as qty 											") /* 수량 */
				.query("	,   a.pri 		    as pri 											") /* 단가 */
				.query("	,   -a.sply_amt+a.txfree_amt as sply_amt 							") /* 금액 */
				.query("	,   -a.tax_amt 		as tax_amt 										") /* 세액 */
				.query("	,   -a.inv_amt 		as inv_amt 										") /* 합계 */
				.query("  from  modi_item a 													")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 			")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"    ))
				.query("   and  a.row_sts = 0                   								")
				.query("order by line_seqn		 												")

			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}
	public SqlResultMap setListerPopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("ostt_insp")
				.where("where invc_numb  = :invc_numb")
				.where("and   line_seqn  = :line_seqn")

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))

				.update("invc_date"				, row.getParameter("insp_Date"))
				.update("spts_numb"				, row.getParameter("invc_numb"))
				.update("spts_seqn"				, row.getParameter("seqn"))
				.update("spts_date"				, row.getParameter("invc_date"))
				.update("item_idcd"				, row.getParameter("item_idcd"))
				.update("unit_idcd"				, row.getParameter("unit_idcd"))
				.update("spts_qntt"				, row.getParameter("indn_qntt"))
				.update("deli_date"				, row.getParameter("deli_date"))
				.update("wrhs_idcd"				, row.getParameter("wrhs_idcd"))
				.update("cstm_idcd"				, row.getParameter("cstm_idcd"))
				.update("insp_drtr_idcd"		, row.getParameter("insp_drtr_idcd"))
				.update("pass_qntt"				, row.getParameter("pass_qntt"))
				.update("poor_qntt"				, row.getParameter("poor_qntt"))
				.update("remk_text"				, row.getParameter("remk_text"))
				.update("insp_mthd_dvcd"		, row.getParameter("insp_mthd_dvcd"))
				.update("insp_qntt"				, row.getParameter("insp_qntt"))
				.update("judt_dvcd"				, row.getParameter("judt_dvcd"))
				.update("msmt_valu"				, row.getParameter("msmt_valu"))
	//			.update("lott_numb"				, row.getParameter("lott_numb"))




				.update("find_name"				, row.getParameter("invc_numb")
						+ " "
						+ row.getParameter("line_seqn"))

				.update("line_stat"				, row.getParameter("line_stat"))
				.insert("line_levl"				, row.getParameter("line_levl"))
				.update("updt_idcd"				, row.getParameter("updt_idcd"))
				.insert("crte_idcd"				, row.getParameter("crte_idcd"))
				.update("updt_ipad"				, arg.remoteAddress )
				.insert("crte_ipad"				, arg.remoteAddress )
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.modify);
		}

		data.execute();
		return null ;
	}

	public SqlResultMap getInsp_cond(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.insp_type_idcd   , a.line_seqn        , a.insp_sbsc_name   , a.insp_cond		")
			.query("        , a.insp_levl_uppt   , a.insp_levl_midl   , a.insp_levl_lprt						")
			.query("        , a.rslt_iput_dvcd   , a.goal_levl        , a.insp_cvic_idcd						")
			.query("        , a.ctq_sbsc_yorn    , a.msmt_mthd_dvcd   , a.insp_levl        , a.lott_judt_stnd	")
			.query("        , a.insp_mthd_dvcd   , a.uppr_valu        , a.lwlt_valu								")
			.query("        , a.remk_text        , a.uper_seqn        , a.disp_seqn        , a.user_memo		")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif        , b.wkct_idcd        , w.wkct_name		")
			.query("        , b.insp_type_name   , b.insp_type_code   , d.cvic_idcd        , d.cvic_name		")

		;
		data.param
			.where("from insp_cond a																		")
			.where("       left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd			")
			.where("       left outer join cvic_mast      d on a.insp_cvic_idcd = d.cvic_idcd 				")
			.where("       left outer join wkct_mast      w on b.wkct_idcd = w.wkct_idcd 				")
			.where("where   1=1																				")
			.where("and     a.insp_type_idcd = :insp_type_idcd" ,	arg.getParameter("insp_type_idcd"		))
			.where("and     a.line_seqn = :line_seqn" ,				arg.getParameter("line_seqn"			))
			.where("and     a.line_stat   < :line_stat      " , "2"											 )
			.where("order by a.line_seqn																	")

		;
		return data.selectForMap();
	}

	public SqlResultMap getWkct_invc_numb(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select invc_numb																	")
		;
		data.param
		.where("from wkct_insp a																	")
		.where("where   1=1																			")
		.where("and     a.wkod_numb = :wkod_numb" , arg.getParameter("wkod_numb"					))

		;
		return data.selectForMap();
	}

	public SqlResultMap getWkct_Insp_Seqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(Max(line_seqn),0)+1 as seqn											")
		;
		data.param
			.where("from wkct_insp a																	")
			.where("where   1=1																			")
			.where("and     a.wkod_numb = :wkod_numb" , arg.getParameter("wkod_numb"					))
			.where("and     a.wkct_insp_dvcd = :wkct_insp_dvcd" , arg.fixParameter("wkct_insp_dvcd"		))

		;
		return data.selectForMap();
	}
}
