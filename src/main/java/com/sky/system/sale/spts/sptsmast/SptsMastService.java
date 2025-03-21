package com.sky.system.sale.spts.sptsmast;

import java.text.DateFormat;
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
public class SptsMastService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String rsvd_ordr_spts	= arg.getParamText("rsvd_ordr_spts") ;
		if (rsvd_ordr_spts.length() == 0) {
			rsvd_ordr_spts = "0" ;
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																					")
		;
		data.param
			.where("from (																						")
			.where("select * from (																				")
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date			")
			.where("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb			")
			.where("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date			")
			.where("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate			")
			.where("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn	")
			.where("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo				")
			.where("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd	")
			.where("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl			")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name			")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd			")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm			")
			.where("		, a.crte_idcd       , a.crte_urif       , i.cstm_lott_numb							")
			.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name					")
			.where("		, w.wrhs_code       , w.wrhs_name													")
			.where("		, r1.invc_qntt as acpt_qntt															")
			.where("		, r2.trst_qntt as trst_qntt															")
			.where("		, r1.min_date as min_deli															")
			.where("		, r1.min_date as max_deli															")
			.where("from   acpt_mast a																			")
			.where("left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
			.where("left outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left outer join acpt_item      i on a.invc_numb = i.invc_numb								")
			.where("left outer join (select  invc_numb,sum(invc_qntt) as invc_qntt , min(deli_date) as min_date	")
			.where("                       , max(deli_date) as max_date 										")
			.where("                 from acpt_item group by invc_numb											")
			.where("								) r1 on a.invc_numb = r1.invc_numb							")
			.where("left outer join (select sum(trst_qntt) as trst_qntt , acpt_numb								")
			.where("                 from spts_item group by acpt_numb											")
			.where("								) r2 on a.invc_numb = r2.acpt_numb							")
			.where("where  1=1																					")
			.where("and    ((a.ordr_dvcd      != '4000')  or (:rsvd_ordr_spts1 = '1' )) " , rsvd_ordr_spts		 )
			.where("and    ((a.acpt_stat_dvcd = '0011' )  or (:rsvd_ordr_spts2 = '1' )) " , rsvd_ordr_spts		 )
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.where("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("and    i.cstm_lott_numb like %:cstm_lott_numb%	" , arg.getParamText("cstm_lott_numb"))
			.where("and    a.line_clos  <> 1																") //마감된건 제외
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a 																						")
			.where("where  ifnull(a.acpt_qntt,0)  > ifnull(a.trst_qntt,0)										")
			.where("group by a.invc_numb																		")
			.where("order by a.invc_numb	) a																	")
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
			.query("select a.*																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.*																							")
			.where("		, ifnull(a.trst_qntt1,0) as trst_qntt															")
			.where("		, ifnull(a.invc_qntt,0) - ifnull(a.trst_qntt1,0) as not_trst_qntt								")
			.where("		, ifnull(a.invc_qntt,0) - ifnull(a.trst_qntt1,0) as spts_qntt									")
			.where("		, a.sply_amnt as new_sale_amnt																	")
			.where("		, a.vatx_amnt as new_vatx_amnt																	")
			.where("		, a.invc_amnt as new_ttsm_amnt																	")
//			.where("		, ifnull(a.prod_qntt_sum,0) - ifnull(a.trst_qntt1,0) as prod_qntt								")
			.where("from (																									")
			.where("   select  a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      ,a.unit_idcd		")
			.where("         , a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      ,a.optn_psbl_yorn	")
			.where("         , a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric ,a.invc_qntt		")
			.where("         , a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      ,a.vatx_amnt		")
			.where("         , a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt ,a.stnd_unit		")
			.where("         , a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      ,a.dlvy_date		")
			.where("         , a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      ,a.dlvy_memo		")
			.where("         , a.uper_seqn      , a.disp_seqn      , a.cstm_lott_numb , a.user_memo							")
			.where("         , b.item_code      , b.item_name      , b.item_spec      , u.unit_name							")
			.where("         , (select sum(trst_qntt) from spts_item r 														")
			.where("            where  a.invc_numb = r.acpt_numb and a.line_seqn = r.acpt_seqn) as trst_qntt1				")
//			.where("         , (     select sum((ifnull(w.prod_qntt,0)-ifnull(q.poor_qntt,0))) as prod_qntt_sum				")
//			.where("                  from acpt_item d 																		")
//			.where("                  left outer join work_book w on w.pdsd_numb = d.invc_numb								")
//			.where("                  left outer join prod_plan_acpt pi on pi.acpt_numb = w.wkod_numb						")
//			.where("                  left outer join work_book_qc q on q.invc_numb = w.invc_numb							")
//			.where("                  where     d.invc_numb	= :invc_numb2", arg.getParamText("invc_numb"))
//			.where("             ) as prod_qntt_sum																			")
			.where("   from   acpt_item a																					")
			.where("          left outer join item_mast b on a.item_idcd = b.item_idcd										")
			.where("          left outer join unit_mast u on b.unit_idcd = u.unit_code										")
			.where("   where  1=1																							")
			.where("   and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("   and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																										")
			.where("where     ifnull(a.invc_qntt,0) > ifnull(a.trst_qntt1,0)												")
			.where("order by  a.invc_numb																					")
			.where(") a																										")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("      , a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("      , a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.query("      , a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate				")
			.query("      , a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn			")
			.query("      , a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("      , a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd			")
			.query("      , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("      , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("      , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("      , a.crte_idcd       , a.crte_urif															")
			.query("      , c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("      , (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.query("      , (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli	")
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
				.query("select a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      ,a.unit_idcd		")
				.query("     , a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      ,a.optn_psbl_yorn	")
				.query("     , a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric ,a.invc_qntt		")
				.query("     , a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      ,a.vatx_amnt		")
				.query("     , a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt ,a.stnd_unit		")
				.query("     , a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      ,a.dlvy_date		")
				.query("     , a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      ,a.dlvy_memo		")
				.query("     , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      ,a.prnt_idcd		")
				.query("     , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      ,a.find_name		")
				.query("     , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      ,a.updt_urif		")
				.query("     , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      ,a.crte_urif		")
				.query("     , b.item_code      , b.item_name      , b.item_spec      , u.unit_name							")
				.query("from   acpt_item a																					")
				.query("       left outer join item_mast b on a.item_idcd = b.item_idcd										")
				.query("       left outer join unit_mast u on b.unit_idcd = u.unit_code										")
				.query("where  1=1																							")
				.query("and    a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getInvoice2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb        , a.line_seqn       , a.amnd_degr        , a.item_idcd			")
			.query("        , a.unit_idcd        , a.orig_seqn       , a.orig_invc_numb   , a.orig_invc_qntt	")
			.query("        , a.optn_dvcd        , a.optn_adtn       , a.optn_psbl_yorn   , a.pric_adpt			")
			.query("        , a.norm_sale_pric   , a.sale_stnd_pric  , a.invc_qntt        , a.invc_pric			")
			.query("        , a.vatx_incl_yorn   , a.vatx_rate       , a.sply_amnt        , a.vatx_amnt			")
			.query("        , a.invc_amnt        , a.krwn_amnt       , a.krwn_vatx        , a.krwn_ttsm_amnt	")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.wrhs_idcd        , a.dlvy_cstm_idcd	")
			.query("        , a.deli_date        , a.deli_chge_dvcd  , a.deli_chge_resn   , b.pcod_numb			")
			.query("        , a.cstm_offr_date   , a.cstm_deli_date  , a.cstm_lott_numb   , a.pdsd_yorn			")
			.query("        , a.dlvy_date        , a.dlvy_hhmm       , a.remk_text        , a.stok_asgn_qntt	")
			.query("        , a.offr_asgn_qntt   , a.ostt_dvcd       , a.ostt_qntt        , a.sale_qntt			")
			.query("        , a.dsct_qntt        , a.dlvy_memo       , a.uper_seqn        , a.disp_seqn			")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , b.invc_date			")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , b.acpt_stat_dvcd	")
			.query("        , b.drtr_idcd        , b.dept_idcd       , ifnull(s.ostt_qntt,0) as trst_qntt		")
			.query("        , ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0) as unpaid								")
			.query("from acpt_item a 																			")
			.query("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.query("left outer join ( select sum(ostt_qntt) as ostt_qntt ,acpt_numb,acpt_seqn					")
			.query("                  from spts_item 															")
			.query("                  group by acpt_numb,acpt_seqn												")
			.query("                ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn				")
			.query("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.query("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
			.query("where   1=1																					")
//			.query("and     (ifnull(a.trst_qntt,0)-ifnull(a.ostt_qntt,0))!= 0									")
			.query("and     b.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.query("and     b.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.query("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.query("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.query("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
			.query("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
			.query("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
//			.query("and     b.acpt_stat_dvcd = :acpt_stat_dvcd         " , "0011")
			.query("and     b.acpt_stat_dvcd not in ('0010', '0600') ")	// 20220429 - 이강훈 - 주문서의 일부 제품  출하지시  후 다른 제품 조회되지 않는 현상 발생, 승인대기, 출고완료 건 만 제외되도록 변경
			.query("and     a.line_clos  <> 1																	") //마감된건 제외
			.query("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by b.invc_date , a.invc_numb,a.line_seqn												")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select a.*																								")
			;
			data.param
				.where("from (																									")
				.where("select    a.*																							")
				.where("		, ifnull(a.trst_qntt1,0) as trst_qntt															")
				.where("		, ifnull(a.invc_qntt,0) - ifnull(a.trst_qntt1,0) as not_trst_qntt								")
//				.where("		, ifnull(a.invc_qntt,0) - ifnull(a.trst_qntt1,0) as spts_qntt									")
				.where("from (																									")
				.where("   select  a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      ,a.unit_idcd		")
				.where("         , a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      ,a.optn_psbl_yorn	")
				.where("         , a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric ,a.invc_qntt		")
				.where("         , a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      ,a.vatx_amnt		")
				.where("         , a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt ,a.stnd_unit		")
				.where("         , a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      ,a.dlvy_date		")
				.where("         , a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      ,a.dlvy_memo		")
				.where("         , a.uper_seqn      , a.disp_seqn      , a.cstm_lott_numb , a.user_memo      ,m.pcod_numb		")
				.where("         , b.item_code      , b.item_name      , b.item_spec      , u.unit_name      ,m.acpt_stat_dvcd	")
				.where("         , m.invc_date      , m.cstm_idcd      , m.line_clos											")
				.where("         , s.trst_qntt as trst_qntt1																	")
				.where("   from   acpt_item a																					")
				.where("          left outer join acpt_mast m on a.invc_numb = m.invc_numb										")
				.where("          left outer join ( select sum(trst_qntt) as trst_qntt ,acpt_numb,acpt_seqn						")
				.where("                            from spts_item 																")
				.where("                            group by acpt_numb,acpt_seqn												")
				.where("          ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn								")
				.where("          left outer join item_mast b on a.item_idcd = b.item_idcd										")
				.where("          left outer join unit_mast u on b.unit_idcd = u.unit_code										")
				.where("   where  1=1																							")
				.where("   and     m.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
				.where("   and     m.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
				.where("   and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
				.where("   and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
				.where("   and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
				.where("   and     m.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
				.where("   and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
//				.where("   and     m.acpt_stat_dvcd = :acpt_stat_dvcd         " , "0011")
				.where("   and     m.acpt_stat_dvcd not in ('0010', '0600') ")	// 20220429 - 이강훈 - 주문서의 일부 제품  출하지시  후 다른 제품 조회되지 않는 현상 발생, 승인대기, 출고완료 건 만 제외되도록 변경
				.where("   and     a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("   and     m.line_clos  <> 1																			")
				.where(") a																										")
				.where("where     ifnull(a.invc_qntt,0) > ifnull(a.trst_qntt1,0)												")
				.where("order by  a.invc_numb																					")
				.where(") a																										")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getInsp(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select  a.cstm_idcd,  a.rprt_dvcd,  a.rprt_file_name	")
		.where("from  cstm_rprt a										")
		.where("where 1=1												")
		.where("and   a.cstm_idcd = :cstm_idcd",arg.getParameter("cstm_idcd"))
		.where("and   a.rprt_dvcd = :rprt_dvcd",arg.getParameter("rprt_dvcd"))
		.where("and   a.a.rprt_file_name = :rprt_file_name",arg.getParameter("rprt_file_name"))

		;
		return data.selectForMap();
	}

	public SqlResultMap setInvoice2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		SimpleDateFormat dateForm = new SimpleDateFormat("yyyyMMdd");
		String a = dateForm.format(new Date());

		String dlvy_cstm_idcd = "";

		for (SqlResultRow row:map) {
			dlvy_cstm_idcd = row.getParamText("dlvy_cstm_idcd");
			data.param
				.table("spts_mast												")
				.where("where invc_numb		= :invc_numb						")	//invoice번호

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))	//invoice번호

				.update("invc_date"			, a									)
				.update("ostt_schd_date"	, row.getParameter("ostt_date"		))
				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))
				.update("expt_dvcd"			, row.getParameter("expt_dvcd"		))	//거래처ID
				.update("cstm_idcd"			, row.getParameter("product", SqlResultMap.class).get(0).getParameter("cstm_idcd"))	//거래처ID
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
				.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
				.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
				.update("pcod_numb"			, row.getParameter("pcod_numb"		))	//납기일자
				.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)

				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.insert);
			data.execute();
			data.clear();
			data.param
				.table("acpt_mast												")
				.where("where invc_numb		= :invc_numb						")	//invoice번호

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))	//invoice번호

				.update("acpt_stat_dvcd"	, "0200"							)

				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.update);
			data.execute();
			data.clear();
			data.param
				.table("acpt_item												")
				.where("where invc_numb		= :invc_numb						")	//invoice번호
				.where("and   line_seqn		= :line_seqn						")	//invoice번호

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))	//invoice번호
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))	//invoice번호

				.update("acpt_stat_dvcd"	, "0200"							)

				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.update);
			data.execute();
			data.clear();


			if(row.getParameter("product", SqlResultMap.class) != null) {
				setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class),dlvy_cstm_idcd);
			}
			data.execute();
			/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
//			sequence.setBook(arg, row.getParamText("invc_numb"), 0 , "판매출고");

		}
	return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map, String dlvy_cstm_idcd  ) throws Exception {
		for(SqlResultRow row:map) {
			data.param
				.table("spts_item													")
				.where("where invc_numb = :invc_numb								")		//invoice번호
				.where("and   line_seqn = :line_seqn								")		//순번

				.unique("invc_numb"			, mst.fixParameter("new_invc_numb"		))		//invoice번호
				.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

				.update("acpt_numb"			, row.fixParameter("invc_numb"			))		//
				.update("acpt_seqn"			, row.fixParameter("line_seqn"			))		//
				.update("item_idcd"			, row.getParameter("item_idcd"))
				.update("sale_unit"			, row.getParameter("unit_name"))
				.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"))
				.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"))
				.update("sale_pric"			, row.getParameter("invc_pric"))
				.update("trst_qntt"			, row.getParameter("spts_qntt"))
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))
				.update("vatx_rate"			, row.getParameter("vatx_rate"))
//				.update("sale_amnt"			, row.getParameter("sply_amnt"))
				.update("sale_amnt"			, row.getParameter("new_sale_amnt"))
				.update("vatx_amnt"			, row.getParameter("new_vatx_amnt"))
				.update("ttsm_amnt"			, row.getParameter("new_ttsm_amnt"))
				.update("deli_date"			, row.getParameter("deli_date"))
				.update("stnd_unit"			, row.getParameter("stnd_unit"))
				.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"))
				.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"))
				.update("dlvy_cstm_idcd"	, dlvy_cstm_idcd)
				.update("dsct_yorn"			, row.getParameter("dsct_yorn"))
				.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"))
				.update("insp_dvcd"			, row.getParameter("insp_dvcd"))
				.update("insp_date"			, row.getParameter("insp_date"))
				.update("pcod_numb"			, row.getParameter("pcod_numb"))
				.update("ostt_yorn"			, "0"							)
				.update("ostt_qntt"			, 0								)
				.update("prnt_idcd"			, row.getParameter("_invc_numb"))
				.update("line_stat"			, row.getParameter("line_stat"))
				.update("user_memo"			, row.getParameter("user_memo"))
				.update("find_name"			, row.getParameter("_invc_numb")
											+ " "
											+ row.getParameter("invc_numb")
											+ "	"
											+ row.fixParameter("item_idcd"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.insert);
			data.execute();
			data.clear();


			data.param
				.table("acpt_mast												")
				.where("where invc_numb		= :invc_numb						")	//invoice번호

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))	//invoice번호

				.update("acpt_stat_dvcd"	, "0200"							)

				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("acpt_item												")
				.where("where invc_numb		= :invc_numb						")	//invoice번호
				.where("and   line_seqn		= :line_seqn						")	//invoice번호

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))	//invoice번호
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))	//invoice번호

				.update("acpt_stat_dvcd"	, "0200"							)

				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.update);
			data.execute();
			data.clear();

		}
	}



	/**
	 */
	public SqlResultMap getSearchSpts(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																			")
		;
		data.param
			.where("from(																				")
			.where("select  a.invc_numb        , a.invc_date       , a.bzpl_idcd     , a.expt_dvcd		")
			.where("      , a.cstm_idcd        , c.cstm_name       , c.cstm_code     , a.ostt_dvcd		")
			.where("      , a.drtr_idcd        , u.user_name as drtr_name            , c.boss_name		")
			.where("      , a.dept_idcd        , a.ostt_schd_date  , a.ostt_yorn     , a.ostt_date		")
			.where("      , a.trut_dvcd        , a.dlvy_cond_dvcd  , a.deli_date     , a.sale_stor_yorn	")
			.where("      , a.remk_text        , a.pcod_numb       , a.line_clos						")
			.where("      , (select min(deli_date) from spts_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.where("      , (select max(deli_date) from spts_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.where("      , (select cstm_name 															")
			.where("         from spts_item r 															")
			.where("         left outer join cstm_mast cs on r.dlvy_cstm_idcd = cs.cstm_idcd			")
			.where("         where r.invc_numb = a.invc_numb											")
			.where("         group by a.invc_numb) as dlvy_cstm_name									")
		;
		data.param
			.where("from  spts_mast a																	")
			.where("      left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd						")
			.where("      left outer join user_mast u on a.drtr_idcd = u.user_idcd						")
			.where("where  1=1																			")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.where("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_clos , a.ostt_schd_date desc limit 99999999999								")
			.where(")a																							")
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
			.query("select  a.invc_numb      , a.line_seqn       , a.acpt_numb        , a.acpt_seqn		")
			.query("      , a.item_idcd      , i.item_code       , i.item_name        , i.item_spec		")
			.query("      , a.sale_unit      , a.norm_sale_pric  , a.sale_stnd_pric   , a.sale_pric		")
			.query("      , a.trst_qntt      , a.vatx_incl_yorn  , a.vatx_rate        , a.sale_amnt		")
			.query("      , a.vatx_amnt      , a.ttsm_amnt       , a.deli_date        , a.stnd_unit		")
			.query("      , a.stnd_unit_qntt , a.wrhs_idcd       , a.dlvy_cstm_idcd   , a.dsct_yorn		")
			.query("      , a.ostt_dvcd      , a.insp_dvcd       , a.insp_date        , a.pcod_numb		")
			.query("      , a.ostt_yorn      , a.ostt_date       , a.ostt_qntt        , c.invc_date as acpt_date	")
			.query("      , a.uper_seqn      , a.disp_seqn       , a.user_memo							")
		;
		data.param
			.query("from    spts_item a 																")
			.query("		left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.query("		left outer join acpt_mast c on a.acpt_numb = c.invc_numb					")
			.query("where   1=1																			")
			.where("and     a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and     a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																")
		;
		return data.selectForMap();
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
	 *
	 */
	public SqlResultMap setStps(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage read = arg.newStorage("POS");
		SqlResultRow tmp ;
		String first = "yes";
		Integer seq = 0;

		SimpleDateFormat dateForm = new SimpleDateFormat("yyyyMMdd");
		String a = dateForm.format(new Date());

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			if(seq == 0){
				read.clear();
				read.param
					.query("select *		")
					.query("		, (select max(deli_date) from acpt_item r where r.invc_numb = m.invc_numb) as max_deli	")
					.query("from   acpt_mast m																			")
					.query("where  m.invc_numb = :invc_numb  ", row.getParameter("invc_numb"))
				;
				tmp = read.selectForRow();
				data.param
					.table("spts_mast														")
					.where("where invc_numb	= :invc_numb									")

					.unique("invc_numb"				, row.fixParameter("_invc_numb"))

					.update("invc_date"				, a										)
					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"       ))
					.update("expt_dvcd"				, row.getParameter("expt_dvcd"       ))
					.update("cstm_idcd"				, tmp.getParameter("cstm_idcd"       ))
					.update("ostt_dvcd"				, "3001"	)
					.update("ostt_yorn"				, "0"		)
					.update("drtr_idcd"				, tmp.getParameter("drtr_idcd"      ))
					.update("dept_idcd"				, tmp.getParameter("dept_idcd"       ))
					.update("ostt_schd_date"		, row.getParameter("_ostt_schd_date" ))
					.update("dlvy_cond_dvcd"		, tmp.getParameter("dlvy_cond_dvcd"  ))
					.update("deli_date"				, tmp.getParameter("max_deli"       ))
					.update("crny_dvcd"				, tmp.getParameter("crny_dvcd"       ))
					.update("excg_rate"				, tmp.getParameter("excg_rate"       ))
					.update("remk_text"				, tmp.getParameter("user_memo"       ))
					.update("pcod_numb"				, tmp.getParameter("pcod_numb"       ))
					.update("prnt_idcd"				, tmp.getParameter("invc_numb"       ))
					.update("find_name"				, tmp.getParameter("invc_numb"       ))
					.update("line_levl"				, "1"		)
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.insert);
			}
			seq = seq + 1;
			data.param
				.table("spts_item											")
				.where("where invc_numb	= :invc_numb						")
				.where("and   line_seqn	= :line_seqn						")

				.unique("invc_numb"			, row.fixParameter("_invc_numb"))
//				.unique("line_seqn"			, row.fixParameter("line_seqn"))
				.unique("line_seqn"			, seq)

				.update("acpt_numb"			, row.getParameter("invc_numb"))
				.update("acpt_seqn"			, row.getParameter("line_seqn"))
				.update("item_idcd"			, row.getParameter("item_idcd"))
				.update("sale_unit"			, row.getParameter("unit_name"))
				.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"))
				.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"))
				.update("sale_pric"			, row.getParameter("invc_pric"))
				.update("trst_qntt"			, row.getParameter("spts_qntt"))
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))
				.update("vatx_rate"			, row.getParameter("vatx_rate"))
				.update("sale_amnt"			, row.getParameter("new_sale_amnt"))
				.update("vatx_amnt"			, row.getParameter("new_vatx_amnt"))
				.update("ttsm_amnt"			, row.getParameter("new_ttsm_amnt"))
				.update("deli_date"			, row.getParameter("deli_date"))
				.update("stnd_unit"			, row.getParameter("stnd_unit"))
				.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"))
				.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"))
				.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"))
				.update("dsct_yorn"			, row.getParameter("dsct_yorn"))
				.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"))
				.update("insp_dvcd"			, row.getParameter("insp_dvcd"))
				.update("insp_date"			, row.getParameter("insp_date"))
				.update("pcod_numb"			, row.getParameter("pcod_numb"))
				.update("ostt_yorn"			, "0"							)
				.update("ostt_qntt"			, 0								)
				.update("uper_seqn"			, seq - 1)
				.update("disp_seqn"			, seq)
				.update("prnt_idcd"			, row.getParameter("_invc_numb"))
				.update("line_stat"			, row.getParameter("line_stat"))
				.update("user_memo"			, row.getParameter("user_memo"))
				.update("find_name"			, row.getParameter("_invc_numb")
											+ " "
											+ row.getParameter("invc_numb")
											+ "	"
											+ row.fixParameter("item_idcd"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.insert);
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setStpsCancle(HttpRequestArgument arg) throws Exception {
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

		//2022.04.25 - 이강훈 - 수주진행상태를 처리하기 위하여 삭제 전 출하지시에 등록된 수주번호를 가져온다.
		data.param
			.query("select group_concat(distinct acpt_numb) as acpt_numb from spts_item where invc_numb = :invc_numb", invc_numb);
		;
		SqlResultRow row =  data.selectForRow();
		data.clear();

		data.param
			.query("call auto_spts_delete (			")
			.query("   :STOR "       , stor			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		//2022.04.25 - 이강훈 - 수주진행상태를 변경한다.
		data.param
			.query("call auto_acpt_stat_dvcd (		")
			.query("  :invc_numb "  , row.getParamText("acpt_numb"))  // Invoice 번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
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
				.query("	,   a.item_code   		as item_code 								") /* 코드 */
				.query("	,   b.brcd_1   		as brcd 										") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 					") /* 품목 / 규격 */
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

	public SqlResultMap setChange(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String cstm_idcd2	= arg.getParamText("cstm_idcd2") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");

		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.param
			.query("call dlvy_cstm_change (						")
			.query("   :STOR			" , hq				)  // 본사코드
			.query(" , :invc_numb		" , invc_numb	 	)  // Invoice 번호
			.query(" , :cstm_idcd2		" , cstm_idcd2		)  // 납품처
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

}
