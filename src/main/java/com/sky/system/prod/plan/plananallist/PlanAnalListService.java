package com.sky.system.prod.plan.plananallist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class PlanAnalListService  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String DATE_DVCD	= arg.getParamText("date_dvcd");
		String FR_DT		= arg.getParamText("fr_dt");
		String TO_DT		= arg.getParamText("to_dt");
		String ORDR_NUMB	= arg.getParamText("ordr_numb");
		String ORDR_DVCD	= arg.getParamText("ordr_dvcd");
		String SEARCH_DVCD	= arg.getParamText("search_dvcd");
		String SEARCH_NAME	= arg.getParamText("search_name");
		if (DATE_DVCD.length() == 0) {
			DATE_DVCD = "" ;
		}
		if (FR_DT.length() == 0) {
			FR_DT = "" ;
		}
		if (TO_DT.length() == 0) {
			TO_DT = "" ;
		}
		if (ORDR_NUMB.length() == 0) {
			ORDR_NUMB = "" ;
		}
		if (ORDR_DVCD.length() == 0) {
			ORDR_DVCD = "" ;
		}
		if (SEARCH_DVCD.length() == 0) {
			SEARCH_DVCD = "" ;
		}
		if (SEARCH_NAME.length() == 0) {
			SEARCH_NAME = "" ;
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("with plan as (																						")
			.where("  select  a.invc_numb        , a.line_seqn        , a.lott_numb										")
			.where("        , a.wkct_idcd        , w.wkct_code        , w.wkct_name										")
			.where("        , a.cvic_idcd        , cv.cvic_code       , cv.cvic_name									")
			.where("        , a.wkct_item_idcd   , a.mold_idcd        , a.dayn_dvcd										")
			.where("        , a.prod_dept_idcd   , a.orig_invc_numb														")
			.where("        , a.cstm_idcd        , c.cstm_code        , c.cstm_name										")
			.where("        , a.item_idcd        , i.item_code        , i.item_name        , i.item_spec				")
			.where("        , a.bomt_degr        , a.unit_idcd															")
			.where("        , (si.invc_qntt) as acpt_qntt             , a.stok_used_qntt   , a.indn_qntt				")
			.where("        , a.plan_strt_dttm   , a.plan_endd_dttm   , a.work_strt_dttm   , a.work_endd_dttm			")
			.where("        , si.deli_date       , si.cstm_deli_date  , si.deli_chge_resn								")
			.where("        , sm.invc_date as acpt_date               , m.pdod_date        , sm.ordr_dvcd				")
			.where("        , si.user_memo       , sm.invc_numb	as acpt_numb               , sm.line_clos				")
			.where("        , u.user_name as drtr_name																	")
			.where("    from   pror_item a																				")
			.where("        left outer join prod_plan p  on a.invc_numb = p.prod_trst_numb								")
			.where("        left outer join prod_plan_acpt pa on p.invc_numb = pa.invc_numb								")
			.where("        left outer join pror_mast m  on a.invc_numb = m.invc_numb									")
			.where("        left outer join acpt_mast sm on pa.acpt_numb = sm.invc_numb									")
			.where("        left outer join acpt_item si on pa.acpt_numb = si.invc_numb and pa.acpt_seqn = si.line_seqn	")
			.where("        left outer join wkct_mast w  on a.wkct_idcd = w.wkct_idcd									")
			.where("        left outer join cvic_mast cv on a.cvic_idcd = cv.cvic_idcd									")
			.where("        left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd									")
			.where("        left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.where("        left outer join user_mast u  on sm.drtr_idcd = u.user_idcd									")
			.where("    where  1=1																						")
			.where("    and     a.item_idcd     = :item_idcd		"	, arg.getParamText("item_idcd"))
			.where("    and     a.find_name like %:find_name%		"	, arg.getParamText("find_name"))
			.where("    and     c.cstm_idcd    = :cstm_idcd			"	, arg.getParamText("cstm_idcd"))
			.where("    and     a.lott_numb     = :lott_numb		"	, arg.getParamText("lott_numb"))
			.where("    and    substring(a.plan_strt_dttm,1,8) >= :fr_dt1	"	, FR_DT, "4".equals(DATE_DVCD))
			.where("    and    substring(a.plan_endd_dttm,1,8) <= :to_dt1	"	, TO_DT, "4".equals(DATE_DVCD))
			.where("    and     m.pdod_date  between :fr_dt2		"	, FR_DT, "3".equals(DATE_DVCD))
			.where("                          and     :to_dt2		"	, TO_DT, "3".equals(DATE_DVCD))
			.where("    and     sm.invc_date between :fr_dt3		"	, FR_DT, "2".equals(DATE_DVCD))
			.where("                          and     :to_dt3		"	, TO_DT, "2".equals(DATE_DVCD))
			.where("    and     si.deli_date between :fr_dt4		"	, FR_DT, "1".equals(DATE_DVCD))
			.where("                          and     :to_dt4		"	, TO_DT, "1".equals(DATE_DVCD))
			.where("    and     (m.invc_numb  like %:ordr_numb1%	)"	, SEARCH_NAME, "1".equals(arg.getParamText("search_dvcd")))
			.where("    and     (c.cstm_name  like %:ordr_numb2%	)"	, SEARCH_NAME, "2".equals(arg.getParamText("search_dvcd")))
			.where("    and     (si.user_memo like %:ordr_numb3%	)"	, SEARCH_NAME, "3".equals(arg.getParamText("search_dvcd")))
			.where("    and     sm.ordr_dvcd = :ordr_dvcd 			"	, arg.getParamText("ordr_dvcd"))
			.where(") ,																									")
			.where("work_book as (																						")
			.where("   select    a.wkod_numb																			")
			.where("           , a.wkod_seqn																			")
			.where("           , ifnull(sum(a.prod_qntt),0)-ifnull(sum(b.poor_qntt),0) as work_qntt						")
			.where("           , min(a.work_strt_dttm)      as work_strt_dttm											")
			.where("           , max(a.work_endd_dttm)      as work_endd_dttm											")
			.where("   from    work_book a																				")
			.where("   left outer join work_book_qc b on a.invc_numb = b.invc_numb										")
			.where("group by a.wkod_numb ,  a.wkod_seqn																	")
			.where(")																									")
			.where("select a.acpt_numb      , a.item_code       , a.item_name       , a.item_spec						")
			.where("     , a.acpt_qntt      , a.stok_used_qntt  , a.indn_qntt       , a.invc_numb						")
			.where("     , a.plan_strt_dttm , a.plan_endd_dttm  , b.work_strt_dttm  , b.work_endd_dttm					")
			.where("     , b.work_qntt      , a.deli_date       , a.cstm_deli_date  , a.deli_chge_resn					")
			.where("     , acpt_date        , a.pdod_date       , a.line_clos       , a.line_seqn						")
			.where("     , case when to_days(a.work_strt_dttm)-to_days(a.plan_strt_dttm) <= 0 							")
			.where("     then ''																						")
			.where("     else to_days(a.work_strt_dttm)-to_days(a.plan_strt_dttm) end as dely_dcnt						")
			.where("     , a.lott_numb      , a.user_memo       , a.cstm_name       , a.ordr_dvcd						")
			.where("     , a.drtr_name																					")
			.where("from plan a																							")
			.where("    left outer join work_book b on a.invc_numb = b.wkod_numb and a.line_seqn = b.wkod_seqn			")
			.where("order by a.invc_numb    , a.plan_strt_dttm ) a														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}