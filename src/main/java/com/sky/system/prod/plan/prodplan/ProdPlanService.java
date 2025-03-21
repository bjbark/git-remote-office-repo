package com.sky.system.prod.plan.prodplan;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class ProdPlanService  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch1(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String add = "";
		if(arg.getParamText("add").equals("on")){
			add = "1";
		}else{
			add = "0";
		}

		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select  a.invc_numb        , a.amnd_degr          , a.line_seqn          , a.item_idcd		")
			.where("      , a.unit_idcd        , a.orig_invc_numb     , a.orig_seqn          , a.orig_invc_qntt	")
			.where("      , a.optn_dvcd        , a.optn_psbl_yorn     , a.optn_adtn          , a.pric_adpt		")
			.where("      , a.norm_sale_pric   , a.sale_stnd_pric     , a.invc_qntt          , a.invc_pric		")
			.where("      , a.vatx_incl_yorn   , a.vatx_rate          , a.sply_amnt          , a.vatx_amnt		")
			.where("      , a.invc_amnt        , a.krwn_amnt          , a.krwn_vatx          , a.krwn_ttsm_amnt	")
			.where("      , a.stnd_unit        , a.stnd_unit_qntt     , a.wrhs_idcd          , a.dlvy_cstm_idcd	")
			.where("      , a.deli_date        , a.deli_chge_dvcd     , a.deli_chge_resn     , a.pcod_numb		")
			.where("      , a.cstm_offr_date   , a.cstm_deli_date     , a.cstm_lott_numb     , a.dlvy_date		")
			.where("      , a.dlvy_hhmm        , a.remk_text          , a.ostt_dvcd          , a.ostt_qntt		")
			.where("      , a.sale_qntt        , a.dsct_qntt          , a.dlvy_memo          , a.uper_seqn		")
			.where("      , a.disp_seqn        , (ifnull(a.invc_qntt,0) - ifnull(a.ostt_qntt,0)) as qntt		")
			.where("      , b.user_memo        , a.sysm_memo          , a.prnt_idcd          , a.line_levl		")
			.where("      , a.line_ordr        , a.line_stat          , a.line_clos          , a.find_name		")
			.where("      , a.updt_user_name   , a.updt_ipad          , SUBSTRING(a.updt_dttm,1,8)  as updt_dttm")
			.where("      , a.updt_idcd       , SUBSTRING(a.crte_dttm,1,8) as crte_dttm							")
			.where("      , a.crte_idcd        , a.crte_urif													")
			.where("      , b.invc_date        , b.dept_idcd          , b.cstm_idcd								")
			.where("      , t.cstm_name        , t.tele_numb													")
			.where("      , i.item_code        , i.item_name          , i.item_spec								")
			.where("      , i.scls_idcd as item_scls_idcd             , i.mcls_idcd as item_mcls_idcd			")
			.where("      , i.lcls_idcd as item_lcls_idcd														")
			.where("      , b.cstm_drtr_name																	")
			.where("      , d.mold_idcd        , d.mtrl_bacd													")
			.where("      , m.mold_name																			")
			.where("      , (select base_name from base_mast r where m.mtrl_bacd  = r.base_code					")
			.where("                                          and   r.prnt_idcd = '3101')   as mtrl_name		")
			.where("      ,ifnull(temp.indn_qntt,0) as sum_indn_qntt											")
			.where("      ,ifnull((ifnull(a.invc_qntt,0)-ifnull(temp.indn_qntt,0)),0) as sum_indn_etc			")
			.where("      ,ifnull(temp.prod_qntt,0) as sum_prod_qntt											")
			.where("      ,ifnull((ifnull(temp.indn_qntt,0)-ifnull(temp.prod_qntt,0)),0) as sum_prod_etc		")
		;
		data.param
			.where("from  acpt_item a																			")
			.where("left  outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left  outer join cstm_mast t on b.cstm_idcd = t.cstm_idcd									")
			.where("left  outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left  outer join item_adon d on a.item_idcd = d.item_idcd									")
			.where("left  outer join mold_mast m on d.mold_idcd = m.mold_idcd									")
			.where("left outer join (select sum(w.prod_qntt) as prod_qntt ,sum(a.indn_qntt) as indn_qntt ,b.acpt_numb")
			.where("                 from pror_item a															")
			.where("                 left outer join work_book w on w.wkod_numb = a.invc_numb					")
			.where("                 left outer join pror_mast b on a.invc_numb = b.invc_numb group by acpt_numb")
			.where("                 ) temp on a.invc_numb = temp.acpt_numb										")
			.where("where  1=1																					")
			.where("and    i.find_name like %:find_name%	"	, arg.getParamText("find_name"))
			.where("and    a.deli_date >= :deli_date1" , arg.getParamText("fr_dt"), "3".equals(arg.getParamText("date")))
			.where("and    a.deli_date <= :deli_date2" , arg.getParamText("to_dt"), "3".equals(arg.getParamText("date")))
			.where("and    a.cstm_offr_date >= :invc_date1" , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("date")))
			.where("and    a.cstm_offr_date <= :invc_date2" , arg.getParamText("to_dt"), "2".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) >= :crte_dttm1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) <= :crte_dttm2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("date")))
			.where("and    a.cstm_lott_numb like %:cstm_lott_numb%" , arg.getParamText("cstm_lott_numb"))	//lot번호
			.where("and    a.item_idcd      =:item_idcd"            , arg.getParamText("item_idcd"))		//품목ID
			.where("and    b.ordr_dvcd      =:ordr_dvcd"            , arg.getParamText("ordr_dvcd"))		//주문상태
			.where("and    a.invc_numb like %:search_name1%"        , arg.getParamText("search_name"), "1".equals(arg.getParamText("search_id")))		//주문번호
			.where("and    t.cstm_name like %:search_name2%"        , arg.getParamText("search_name"), "2".equals(arg.getParamText("search_id")))		//고객명
			.where("and    t.tele_numb like %:search_name3%"        , arg.getParamText("search_name"), "3".equals(arg.getParamText("search_id")))		//고객번호
			.where("and    a.user_memo like %:search_name4%"        , arg.getParamText("search_name"), "4".equals(arg.getParamText("search_id")))		//메모
			.where("and    b.cstm_idcd      =:cstm_idcd"            , arg.getParamText("cstm_idcd"))		//고객
			.where("and    a.line_stat   < :line_stat " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    b.line_clos      = '0'   " 																)
			.where("and    a.pdsd_yorn = :add       ", add															)
//			.where("and    a.sysm_memo like '%확정%'																	")
			.where("order by a.deli_date desc limit 999999) a														")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from(																							")
			.where("select  a.invc_numb       , a.line_seqn       , a.bzpl_idcd       , a.wkfw_idcd					")
			.where("      , a.wkfw_seqn       , a.wkct_item_idcd  , a.mold_idcd										")
			.where("      , a.mtrl_bacd       , a.dayn_dvcd       , a.prod_dept_idcd  , a.orig_invc_numb			")
			.where("      , a.cstm_idcd       , a.item_idcd       , a.bomt_degr       , a.unit_idcd					")
			.where("      , a.indn_qntt       , a.work_strt_dttm  , a.work_dvcd										")
			.where("      , a.insp_wkct_yorn  , a.last_wkct_yorn  , a.cofm_yorn       , a.remk_text					")
			.where("      , a.prog_stat_dvcd  , a.pckg_cotr_bacd  , a.stok_used_qntt  , a.lott_numb					")
			.where("      , a.line_stat       , u.user_name as crte_user_name										")
			.where("      , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code						")
			.where("                                           and   r.prnt_idcd = '3101')   as mtrl_name			")
			.where("      , (select base_name from base_mast r where a.pckg_cotr_bacd  = r.base_code				")
			.where("                                           and   r.prnt_idcd = '8004')   as pckg_cotr_name		")
			.where("      , p.pdod_date       , p.acpt_numb       , p.acpt_seqn        , am.invc_date				")
			.where("      , i.item_code       , i.item_name       , i.item_spec										")
			.where("      , t.cstm_code       , t.cstm_name       , m.mold_code        , m.mold_name				")
			.where("      , a.plan_strt_dttm  , a.plan_endd_dttm													")
			.where("      , a.cvic_idcd       , c.cvic_code       , c.cvic_name	       , am.user_memo				")
			.where("      , ai.invc_qntt      , ai.deli_date      , ai.deli_chge_resn  , am.remk_text as acpt_remk_text	")
			.where("      , ifnull(w3.qntt,0)                         as prod_qntt									")
			.where("      , (ifnull(a.indn_qntt,0)-ifnull(w3.qntt,0)) as qntt										")
			.where("      , SUBSTRING(a.plan_strt_dttm,1,8) as plan_sttm1											")
			.where("      , SUBSTRING(a.plan_strt_dttm,9,4) as plan_sttm2											")
			.where("      , SUBSTRING(a.plan_endd_dttm,1,8) as plan_edtm1											")
			.where("      , SUBSTRING(a.plan_endd_dttm,9,4) as plan_edtm2											")
			.where("      , w.work_strt_dttm as prod_strt_dttm														")
			.where("      , w2.work_endd_dttm as prod_endd_dttm														")
			.where("      , @curRank:=@curRank+1 as rank															")
			.where("      , b2.sum_indn_qntt  , ifnull(ai.cstm_offr_date,'') as cstm_offr_date						")
		;
		data.param
			.where("from pror_item a																				")
			.where("left outer join pror_mast      p on a.invc_numb = p.invc_numb									")
			.where("left outer join user_mast      u on a.crte_idcd = u.user_idcd									")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd									")
			.where("left outer join cstm_mast      t on a.cstm_idcd = t.cstm_idcd									")
			.where("left outer join mold_mast      m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join cvic_mast      c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join acpt_item     ai on p.acpt_numb = ai.invc_numb and p.acpt_seqn = ai.line_seqn	")
			.where("left outer join acpt_mast     am on ai.invc_numb = am.invc_numb									")
			.where("left outer join ( with recursive count_table as (												")
			.where("                  		 select 1 cnt															")
			.where("                  		 union all																")
			.where("                  		 select cnt + 1 														")
			.where("                  	   from   count_table 														")
			.where("                  	   where  cnt + 1 <= 5														")
			.where("                  )																				")
			.where("                  select substring_index(substring_index(substring_index(sysm_memo,'|',c.cnt),'|',-1),'=',1) as `code`,")
			.where("                          substring_index(substring_index(substring_index(sysm_memo,'|',c.cnt),'|',-1),'=',-1)as `name`")
			.where("                  from sscd_mast   a ,															")
			.where("                       count_table c 															")
			.where("                  where sscd_code = 'prog_stat_dvcd'											")
			.where("               ) s on a.prog_stat_dvcd = s.code													")
			.where("left outer join (select sum(ifnull(a.indn_qntt,0)) as sum_indn_qntt,b.acpt_numb 				")
			.where("                 from pror_mast b																")
			.where("                 left outer join pror_item a  on a.invc_numb = b.invc_numb						")
			.where("                 where a.line_stat < 2															")
			.where("                 group by acpt_numb) b2 on p.acpt_numb = b2.acpt_numb							")
			.where("left outer join (select b.wkod_numb, b.wkod_seqn, min(b.work_strt_dttm) as work_strt_dttm		")
			.where("                      , max(b.work_endd_dttm) as work_endd_dttm  , sum(b.prod_qntt) as qntt		")
			.where("                 from work_book b																")
			.where("                 group by b.wkod_numb,b.wkod_seqn												")
			.where("                ) w on a.invc_numb = w.wkod_numb and a.line_seqn = w.wkod_seqn					")
			.where("left outer join (select b.wkod_numb, b.wkod_seqn, max(b.work_endd_dttm) as work_endd_dttm,b.cvic_idcd	")
			.where("                 from work_book b																")
			.where("                 where prog_stat_dvcd in (3,4)													")
			.where("                 group by b.wkod_numb,b.wkod_seqn,b.cvic_idcd												")
			.where("                ) w2 on a.invc_numb = w2.wkod_numb and a.line_seqn = w2.wkod_seqn and a.cvic_idcd = w2.cvic_idcd	")
			.where("left outer join (select b.wkod_numb, b.wkod_seqn, min(b.work_strt_dttm) as work_strt_dttm		")
			.where("                      , max(b.work_endd_dttm) as work_endd_dttm  , sum(b.prod_qntt) as qntt		")
			.where("                 from work_book b																")
			.where("                 where prog_stat_dvcd != 1														")
			.where("                 group by b.wkod_numb,b.wkod_seqn												")
			.where("                ) w3 on a.invc_numb = w3.wkod_numb and a.line_seqn = w3.wkod_seqn				")

			.where(",(select @curRank:=0) r																			")
			.where("where  1=1																						")
			.where("and    i.find_name like %:find_name%	"  , arg.getParamText("find_name"))
			.where("and    a.item_idcd      =:item_idcd"       , arg.getParamText("item_idcd"))			//품목ID
			.where("and    p.acpt_numb like %:search_name1%"   , arg.getParamText("search_name"), "1".equals(arg.getParamText("search_id")))		//주문번호
			.where("and    t.cstm_name like %:search_name2%"   , arg.getParamText("search_name"), "2".equals(arg.getParamText("search_id")))		//고객명
			.where("and    t.tele_numb like %:search_name3%"   , arg.getParamText("search_name"), "3".equals(arg.getParamText("search_id")))		//고객번호
			.where("and    a.user_memo like %:search_name4%"   , arg.getParamText("search_name"), "4".equals(arg.getParamText("search_id")))		//메모
			.where("and    a.lott_numb like %:lott_numb%"      , arg.getParamText("cstm_lott_numb"))	//lot번호
			.where("and    a.cvic_idcd      =:cvic_idcd"       , arg.getParamText("cvic_idcd"))			//설비
			.where("and    am.cstm_idcd      =:cstm_idcd"      , arg.getParamText("cstm_idcd"))			//고객
			.where("and    a.prog_stat_dvcd =:prog_stat_dvcd"  , arg.getParamText("prog_stat_dvcd"))		//진행상태구분
			.where("and    ai.deli_date >= :deli_date1"        , arg.getParamText("fr_dt"), "3".equals(arg.getParamText("date")))
			.where("and    ai.deli_date <= :deli_date2"        , arg.getParamText("to_dt"), "3".equals(arg.getParamText("date")))
			.where("and    ai.cstm_offr_date >= :invc_date1"   , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("date")))
			.where("and    ai.cstm_offr_date <= :invc_date2"   , arg.getParamText("to_dt"), "2".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) >= :crte_dttm1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) <= :crte_dttm2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("date")))
			.where("and    ifnull(date_format((select max(b.work_endd_dttm) from work_book b								")
			.where("                                          where a.invc_numb = b.wkod_numb										")
			.where("                                          and a.line_seqn = b.wkod_seqn											")
			.where("                                          and b.prog_stat_dvcd = 3												")
			.where("        ),'%Y%m%d'),date_format(now(),'%Y%m%d')) >= CURRENT_DATE()								")		//종료일시 다음날삭제
			.where("and    a.line_stat   < :line_stat " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by   a.cvic_idcd asc,a.line_stat desc ,s.name desc , a.plan_strt_dttm							")
			.where(")a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from(																							")
			.where("select  a.invc_numb       , a.line_seqn       , a.bzpl_idcd       , a.wkfw_idcd					")
			.where("      , a.wkfw_seqn       , a.wkct_item_idcd  , a.mold_idcd										")
			.where("      , a.mtrl_bacd       , a.dayn_dvcd       , a.prod_dept_idcd  , a.orig_invc_numb			")
			.where("      , a.cstm_idcd       , a.item_idcd       , a.bomt_degr       , a.unit_idcd					")
			.where("      , a.indn_qntt       , a.work_strt_dttm  , a.work_dvcd										")
			.where("      , a.insp_wkct_yorn  , a.last_wkct_yorn  , a.cofm_yorn       , a.remk_text					")
			.where("      , a.prog_stat_dvcd  , a.pckg_cotr_bacd  , a.stok_used_qntt  , a.lott_numb					")
			.where("      , a.line_stat       , am.user_memo      , u.user_name as crte_user_name					")
			.where("      , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code						")
			.where("                                           and   r.prnt_idcd = '3101')   as mtrl_name			")
			.where("      , (select base_name from base_mast r where a.pckg_cotr_bacd  = r.base_code				")
			.where("                                           and   r.prnt_idcd = '8004')   as pckg_cotr_name		")
			.where("      , p.pdod_date       , p.acpt_numb       , p.acpt_seqn        , am.invc_date				")
			.where("      , i.item_code       , i.item_name       , i.item_spec										")
			.where("      , t.cstm_code       , t.cstm_name       , m.mold_code        , m.mold_name				")
			.where("      , a.cvic_idcd       , c.cvic_code       , c.cvic_name										")
			.where("      , ai.invc_qntt      , ai.deli_date      , ai.deli_chge_resn  , am.remk_text as acpt_remk_text	")
			.where("      , w.qntt as prod_qntt																		")
			.where("      , (ifnull(a.indn_qntt,0)-ifnull(w.qntt,0)) as qntt										")
			.where("      , SUBSTRING(a.plan_strt_dttm,1,8) as plan_sttm1											")
			.where("      , SUBSTRING(a.plan_strt_dttm,9,4) as plan_sttm2											")
			.where("      , SUBSTRING(a.plan_endd_dttm,1,8) as plan_edtm1											")
			.where("      , SUBSTRING(a.plan_endd_dttm,9,4) as plan_edtm2											")
			.where("      , a.plan_strt_dttm  , a.plan_endd_dttm													")
			.where("      , w.work_strt_dttm as prod_strt_dttm														")
			.where("      , w.work_endd_dttm as prod_endd_dttm														")
			.where("      , @curRank:=@curRank+1 as rank															")
			.where("      , b2.sum_indn_qntt  , ifnull(ai.cstm_offr_date,'') as cstm_offr_date						")
		;
		data.param
			.where("from pror_item a																				")
			.where("left outer join pror_mast      p on a.invc_numb = p.invc_numb									")
			.where("left outer join user_mast      u on a.crte_idcd = u.user_idcd									")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd									")
			.where("left outer join cstm_mast      t on a.cstm_idcd = t.cstm_idcd									")
			.where("left outer join mold_mast      m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join cvic_mast      c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join acpt_item     ai on p.acpt_numb = ai.invc_numb and p.acpt_seqn = ai.line_seqn	")
			.where("left outer join acpt_mast     am on ai.invc_numb = am.invc_numb									")
			.where("left outer join (select sum(ifnull(a.indn_qntt,0)) as sum_indn_qntt,b.acpt_numb 				")
			.where("                 from pror_mast b																")
			.where("                 left outer join pror_item a  on a.invc_numb = b.invc_numb						")
			.where("                 where a.line_stat < 2															")
			.where("                 group by acpt_numb) b2 on p.acpt_numb = b2.acpt_numb							")
			.where("left outer join (select b.wkod_numb, b.wkod_seqn, min(b.work_strt_dttm) as work_strt_dttm		")
			.where("                      , max(b.work_endd_dttm) as work_endd_dttm  , sum(b.prod_qntt) as qntt		")
			.where("                 from work_book b																")
			.where("                 group by b.wkod_numb,b.wkod_seqn												")
			.where("                ) w on a.invc_numb = w.wkod_numb and a.line_seqn = w.wkod_seqn					")
			.where(",(select @curRank:=0) r																			")
			.where("where  1=1																						")
			.where("and    ifnull(date_format((select max(b.work_endd_dttm) from work_book b						")
			.where("                                          where a.invc_numb = b.wkod_numb						")
			.where("                                          and a.line_seqn = b.wkod_seqn							")
			.where("                                          and b.prog_stat_dvcd = 3								")
			.where("        ),'%Y%m%d'),date_format(now(),'%Y%m%d')) < CURRENT_DATE()								")		//종료일시 다음날 부터
			.where("and    i.find_name like %:find_name%	"  , arg.getParamText("find_name"))
			.where("and    a.item_idcd      =:item_idcd"       , arg.getParamText("item_idcd"))			//품목ID
			.where("and    p.acpt_numb like %:search_name1%"   , arg.getParamText("search_name"), "1".equals(arg.getParamText("search_id")))		//주문번호
			.where("and    t.cstm_name like %:search_name2%"   , arg.getParamText("search_name"), "2".equals(arg.getParamText("search_id")))		//고객명
			.where("and    t.tele_numb like %:search_name3%"   , arg.getParamText("search_name"), "3".equals(arg.getParamText("search_id")))		//고객번호
			.where("and    a.user_memo like %:search_name4%"   , arg.getParamText("search_name"), "4".equals(arg.getParamText("search_id")))		//메모
			.where("and    a.lott_numb like %:lott_numb%"      , arg.getParamText("cstm_lott_numb"))	//lot번호
			.where("and    am.cstm_idcd      =:cstm_idcd"      , arg.getParamText("cstm_idcd"))			//고객
			.where("and    a.cvic_idcd      =:cvic_idcd"       , arg.getParamText("cvic_idcd"))			//설비
			.where("and    a.prog_stat_dvcd = 3													")		//진행상태구분
			.where("and    ai.deli_date >= :deli_date1"        , arg.getParamText("fr_dt"), "3".equals(arg.getParamText("date")))
			.where("and    ai.deli_date <= :deli_date2"        , arg.getParamText("to_dt"), "3".equals(arg.getParamText("date")))
			.where("and    ai.cstm_offr_date >= :invc_date1"   , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("date")))
			.where("and    ai.cstm_offr_date <= :invc_date2"   , arg.getParamText("to_dt"), "2".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) >= :crte_dttm1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) <= :crte_dttm2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("date")))
			.where("and    a.line_stat   < :line_stat " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by  TIMESTAMPDIFF(MICROSECOND, w.work_endd_dttm, NOW())									")
			.where(")a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getWrite(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String a = (String) arg.getParameter("invc_numb");
		String z = (String) arg.getParameter("line_seqn");
		a = a.replace("[", "");
		a = a.replace("]", "");
		a = a.replaceAll("\"", "");
		String[] b = a.split(",");
		z = z.replace("[", "");
		z = z.replace("]", "");
		String[] c = z.split(",");


		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  @curRank:=@curRank+1 as seqn														")
			.query("      , a.invc_numb        , a.amnd_degr          , a.line_seqn          , a.item_idcd		")
			.query("      , a.unit_idcd        , a.orig_invc_numb     , a.orig_seqn          , a.orig_invc_qntt	")
			.query("      , a.optn_dvcd        , a.optn_psbl_yorn     , a.optn_adtn          , a.pric_adpt		")
			.query("      , a.norm_sale_pric   , a.sale_stnd_pric     , a.invc_qntt          , a.invc_pric		")
			.query("      , a.vatx_incl_yorn   , a.vatx_rate          , a.sply_amnt          , a.vatx_amnt		")
			.query("      , a.invc_amnt        , a.krwn_amnt          , a.krwn_vatx          , a.krwn_ttsm_amnt	")
			.query("      , a.stnd_unit        , a.stnd_unit_qntt     , a.wrhs_idcd          , a.dlvy_cstm_idcd	")
			.query("      , a.deli_date        , a.deli_chge_dvcd     , a.deli_chge_resn     , a.pcod_numb		")
			.query("      , a.cstm_offr_date   , a.cstm_deli_date     , a.cstm_lott_numb     , a.dlvy_date		")
			.query("      , a.dlvy_hhmm        , a.remk_text          , a.ostt_dvcd          , a.ostt_qntt		")
			.query("      , a.sale_qntt        , a.dsct_qntt          , a.dlvy_memo          , a.uper_seqn		")
			.query("      , a.disp_seqn        , (ifnull(a.invc_qntt,0) - ifnull(a.ostt_qntt,0)) as qntt		")
			.query("      , a.user_memo        , a.sysm_memo          , a.prnt_idcd          , a.line_levl		")
			.query("      , a.line_ordr        , a.line_stat          , a.line_clos          , a.find_name		")
			.query("      , a.updt_user_name   , a.updt_ipad          , a.updt_dttm          , a.updt_idcd		")
			.query("      , a.updt_urif        , a.crte_user_name     , a.crte_ipad          , a.crte_dttm		")
			.query("      , a.crte_idcd        , a.crte_urif													")
			.query("      , b.invc_date        , b.cstm_idcd          , u.user_name as drtr_name				")
			.query("      , i.item_code        , i.item_name          , i.item_spec								")
			.query("      , u.user_name as drtr_name                  , b.cstm_drtr_name						")
		;
		data.param
			.where("from acpt_item a																			")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join user_mast u on b.drtr_idcd = u.user_idcd									")
			.where(",(select @curRank:=0) r 																	")
			.where("where  1=1																					")
			.where("and    a.invc_numb like :invc_numb" , b[0])
			.where("and    a.line_seqn like :line_seqn" , c[0])
		;
		for(int i = 1; i<b.length;i++){
			data.param
				.where("or  a.invc_numb like :invc_numb"+i,b[i])
				.where("and a.line_seqn like :line_seqn"+i,c[i])
				.where("and    a.pdsd_yorn =:pdsd_yorn"+i+"   " , "0" , "".equals(arg.getParamText("pdsd_yorn")))
			;
		}
		data.param
			.where("order by seqn																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getWriteBom(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String a = (String) arg.getParameter("invc_numb");
		String z = (String) arg.getParameter("line_seqn");
		a = a.replace("[", "");
		a = a.replace("]", "");
		a = a.replaceAll("\"", "");
		String[] b = a.split(",");
		z = z.replace("[", "");
		z = z.replace("]", "");
		String[] c = z.split(",");

		data.param
			.query("call work_order_bom (										")
			.query("   :invc_numb"  ,  b[0]				)	// 수주번호
			.query(" , :line_seqn " ,  c[0]				)	// 수주순번
			.query(" ) 															")
		;
		return data.selectForMap(sort);
	}


	public SqlResultMap setWriteBom(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map){

			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd");
			SimpleDateFormat time = new SimpleDateFormat("HHmm");

			String plan_sttm_date = "";
			String plan_sttm_date1 = row.getParamText("plan_sttm1");
			if(row.getParamText("plan_sttm1").indexOf(":") != -1){
				plan_sttm_date = row.getParamText("plan_sttm4");
			}else{
				plan_sttm_date = plan_sttm_date1.replaceAll("-","");
			}

			String plan_sttm_time = "";
			String plan_sttm_time1 = row.getParamText("plan_sttm2");
			if(row.getParamText("plan_sttm2").indexOf("-") != -1){
				plan_sttm_time = row.getParamText("plan_sttm3")+"00";
			}else{
				plan_sttm_time = plan_sttm_time1.replaceAll(":","")+"00";
			}

			String plan_edtm_date1 = row.getParamText("plan_edtm1");
			String plan_edtm_date = "";
			if(!row.getParamText("plan_edtm1").equals("")){
				if(!plan_edtm_date1.equals("")&&!plan_edtm_date1.equals(null)){
					plan_edtm_date = dt.format(new Date(plan_edtm_date1));
				}
			}else{
				plan_edtm_date = "";
			}

			String plan_edtm_time = "";
			String plan_edtm_time1 = row.getParamText("plan_edtm2");
			if(!row.getParamText("plan_edtm2").equals("")){
				if(row.getParamText("plan_edtm2").indexOf("+") != -1){
					plan_edtm_time = time.format(new Date(plan_edtm_time1))+"00";
				}else{
					plan_edtm_time = plan_edtm_time1.replaceAll(":","")+"00";
				}
			}else{
				plan_edtm_time = "";
			}

			data.param
				.table("pror_mast												")
				.where("where invc_numb	= :invc_numb							")

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))

				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))		//사업장ID
				.update("pdod_date"			, row.getParameter("pdod_date"		))		//생산지시일자
				.update("acpt_numb"			, row.getParameter("acpt_numb"		))		//수주번호
				.update("acpt_seqn"			, row.getParameter("acpt_seqn"		))		//수주순번
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처ID
				.update("prog_stat_dvcd"	, "0"								)		//진행상태

				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

			;data.attach(Action.modify)
			;data.execute()
			;data.clear();

			data.param
				.table("pror_item")
				.where("where invc_numb	= :invc_numb" )
				.where("and   line_seqn	= :line_seqn" )

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))		//사업장ID
				.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"		))		//공정흐름ID
				.update("wkfw_seqn"			, row.getParameter("wkfw_seqn"		))		//공정흐름순번
				.update("wkct_idcd"			, row.getParameter("wkct_idcd"		))		//공정ID
				.update("cvic_idcd"			, row.getParameter("cvic_idcd"		))		//설비ID
				.update("wkct_item_idcd"	, row.getParameter("item_idcd"		))		//공정품목ID
				.update("mold_idcd"			, row.getParameter("mold_idcd"		))		//금형ID
				.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"		))		//재질분류코드
				.update("dayn_dvcd"			, row.getParameter("dayn_dvcd"		))		//주야구분코드
				.update("prod_dept_idcd"	, row.getParameter("prod_dept_idcd"	))		//생산부서ID
				.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"	))		//원invoice번호
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처ID
				.update("item_idcd"			, row.getParameter("wkct_item_idcd"	))		//품목ID
				.update("bomt_degr"			, row.getParameter("bomt_degr"		))		//BOM차수
				.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
				.update("indn_qntt"			, row.getParameter("unit_qntt"		))		//계획수량
				.update("acpt_qntt"			, row.getParameter("acpt_qntt"		))		//지시수량
				.update("stok_used_qntt"	, row.getParameter("stok_used_qntt"	))		//재고사용수량
				.update("lott_numb"			, row.getParameter("lott_numb"		))		//LOT번호
				.update("plan_strt_dttm"	, plan_sttm_date+plan_sttm_time		)		//작업시작일시
				.update("plan_endd_dttm"	, plan_edtm_date+plan_edtm_time		)		//작업종료일시
				.update("work_dvcd"			, row.getParameter("work_dvcd"		))		//작업구분코드
				.update("insp_wkct_yorn"	, row.getParameter("insp_wkct_yorn"	))		//검사공정여주
				.update("last_wkct_yorn"	, row.getParameter("last_wkct_yorn"	))		//최종공정여부
				.update("cofm_yorn"			, row.getParameter("cofm_yorn"		))		//확정여부
				.update("remk_text"			, row.getParameter("remk_text"		))		//비고
				.update("prod_stat_dvcd"	, row.getParameter("prod_stat_dvcd"	))		//진행상태구분코드
				.update("pckg_cotr_bacd"	, row.getParameter("pckg_cotr_bacd"	))		//포장용기분류코드
				.update("prog_stat_dvcd"	, "0"								)		//진행상태

				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.modify);
			data.execute();

			data.param
				.table("acpt_item													")
				.where("where invc_numb		= :invc_numb")		//invoice번호
				.where("and   line_seqn		= :line_seqn")		//순번

				.unique("invc_numb"			, row.fixParameter("acpt_numb"			))		//invoice번호
				.unique("line_seqn"			, row.fixParameter("acpt_seqn"			))		//순번

				.update("pdsd_yorn"			, "1")		//지시여부
			;data.attach(Action.modify);
			data.execute();
		}
		data.execute();
		return null;
	}

	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select acpt_numb, acpt_seqn from pror_mast where invc_numb = :invc_numb", arg.fixParameter("invc_numb"));
		SqlResultMap acpt_numb = data.selectForMap();
		data.clear();

		data.param
			.table("pror_mast								")
			.where("where invc_numb = :invc_numb			")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("pror_item								")
			.where("where invc_numb = :invc_numb			")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;data.attach(Action.delete);
		data.execute();
		data.clear();

		for(SqlResultRow row:acpt_numb) {
			data.param
				.table("acpt_item								")
				.where("where invc_numb = :invc_numb			")
				.where("and   line_seqn = :line_seqn			")

				.unique("invc_numb"			, row.fixParameter("acpt_numb"))
				.unique("line_seqn"			, row.fixParameter("acpt_seqn"))

				.update("pdsd_yorn"			, "0"				)		//지시여부
			;data.attach(Action.modify);
			data.execute();
		}
		return null;
	}

	//lister2 저장
	public SqlResultMap setPlan(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			String plan_strt_dttm = row.getParamText("plan_sttm1")+row.getParamText("plan_sttm2");
			String plan_endd_dttm = row.getParamText("plan_edtm1")+row.getParamText("plan_edtm2");

			data.param
				.table("pror_item"							)
				.where("where invc_numb   = :invc_numb"		)
				.where("and   line_seqn   = :line_seqn"		)

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
				.update("mold_idcd"			, row.getParameter("mold_idcd"))
				.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"))
				.update("pckg_cotr_bacd"	, row.getParameter("pckg_cotr_bacd"))
				.update("lott_numb"			, row.getParameter("lott_numb"))
				.update("stok_used_qntt"	, row.getParameter("stok_used_qntt"))
				.update("indn_qntt"			, row.getParameter("indn_qntt"))
				.update("plan_strt_dttm"	, plan_strt_dttm+"00"			)
				.update("plan_endd_dttm"	, plan_endd_dttm+"00"			)
				.update("remk_text"			, row.getParameter("remk_text"))


				.update("line_stat"			, row.getParameter("line_stat"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.modify);
			data.execute();
			data.clear();
			data.param
				.query("update work_book a , pror_item b	")
				.query("set a.indn_qntt = b.indn_qntt		")
				.query("where a.wkod_numb = b.invc_numb		")
				.query("and a.wkod_numb = :wkod_numb	", row.fixParameter("invc_numb"))
			;data.attach(Action.direct);
		}
		data.execute();
		return null ;
	}
	public SqlResultMap setSearch3(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("pror_item"							)
				.where("where invc_numb   = :invc_numb"		)
				.where("and   line_seqn   = :line_seqn"		)

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("indn_qntt"			, row.getParameter("indn_qntt"))


				.update("line_stat"			, row.getParameter("line_stat"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.modify);
			data.execute();
			data.clear();
			data.param
				.query("update work_book a , pror_item b	")
				.query("set a.indn_qntt = b.indn_qntt		")
				.query("where a.wkod_numb = b.invc_numb		")
				.query("and a.wkod_numb = :wkod_numb	", row.fixParameter("invc_numb"))
			;data.attach(Action.direct);
		}
		data.execute();
		return null ;
	}
	//지시확정/취소
	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("pror_item								")
				.where("where invc_numb		= :invc_numb		")
				.where("and   line_seqn		= :line_seqn		")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))

				.update("line_stat"			, arg.getParameter("line_stat"))	//확정여부
			;
			data.attach(Action.update);
		data.execute();
		return null ;
	}

}