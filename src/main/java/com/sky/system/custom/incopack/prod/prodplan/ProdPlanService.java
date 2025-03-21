package com.sky.system.custom.incopack.prod.prodplan;

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


@Service("inkopack.ProdPlanService")
public class ProdPlanService  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String add = "";
		if(arg.getParamText("add").equals("on")){
			add = "1";
		}else{
			add = "0";
		}
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
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
			.where("      , (SELECT GROUP_CONCAT(cnsl_cont SEPARATOR ',</br>')  								")
			.where("         from acpt_cnsl c where c.invc_numb = a.invc_numb) as user_memo						")
			.where("      ,  a.sysm_memo       , a.prnt_idcd          , a.line_levl								")
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
			.where("      ,ifnull((a.invc_qntt-temp.indn_qntt),0) as sum_indn_etc								")
			.where("      ,ifnull(temp.prod_qntt,0) as sum_prod_qntt											")
			.where("      ,ifnull((temp.indn_qntt-temp.prod_qntt),0) as sum_prod_etc							")
		;
		data.param
			.where("from  acpt_item a																			")
			.where("left  outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left  outer join cstm_mast t on b.cstm_idcd = t.cstm_idcd									")
			.where("left  outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left  outer join item_adon d on a.item_idcd = d.item_idcd									")
			.where("left  outer join mold_mast m on d.mold_idcd = m.mold_idcd									")
			.where("left outer join (select sum(w.prod_qntt) as prod_qntt ,sum(a.indn_qntt) as indn_qntt 		")
			.where("                 ,b.acpt_numb , b.acpt_seqn													")
			.where("                 from pror_item a															")
			.where("                 left outer join work_book w on w.wkod_numb = a.invc_numb					")
			.where("                 left outer join pror_mast b on a.invc_numb = b.invc_numb 					")
			.where("                 group by acpt_numb,acpt_seqn												")
			.where("                 ) temp on  a.invc_numb = temp.acpt_numb	and a.line_seqn = temp.acpt_seqn")
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
			.where("and    a.invc_numb like %:invc_numb%"           , arg.getParameter("invc_numb"))		//수주번호
			.where("and    b.cstm_idcd      =:cstm_idcd"            , arg.getParamText("cstm_idcd"))		//고객
			.where("and    a.line_stat   < :line_stat " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    a.pdsd_yorn = :add       ", add														)
			.where("and    b.line_clos != 1																		")
			.where("and    b.acpt_stat_dvcd = '0011'															")
			.where("and    b.ordr_dvcd <> '4000'																")
			.where("and    i.stok_sale_yorn = '0'																")
			.where("order by a.deli_date desc limit 999999) a													")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
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
			.where("      , a.wkfw_seqn       , a.wkct_item_idcd  , a.mold_idcd       , w.wkfw_name					")
			.where("      , a.mtrl_bacd       , a.dayn_dvcd       , a.prod_dept_idcd  , ai.invc_numb as orig_invc_numb			")
			.where("      , a.cstm_idcd       , a.item_idcd       , a.bomt_degr       , a.unit_idcd					")
			.where("      , a.indn_qntt       , a.work_strt_dttm  , a.work_endd_dttm  , a.work_dvcd					")
			.where("      , a.insp_wkct_yorn  , a.last_wkct_yorn  , a.cofm_yorn       , a.remk_text					")
			.where("      , a.prog_stat_dvcd  , a.pckg_cotr_bacd  , a.stok_used_qntt  , a.lott_numb					")
			.where("      , a.line_stat       , a.plan_strt_dttm  , a.wkct_idcd										")
			.where("      , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code						")
			.where("                                           and   r.prnt_idcd = '3101')   as mtrl_name			")
			.where("      , (select base_name from base_mast r where a.pckg_cotr_bacd  = r.base_code				")
			.where("                                           and   r.prnt_idcd = '8004')   as pckg_cotr_name		")
			.where("      , p.pdod_date       , p.acpt_numb       , ai.line_seqn as acpt_seqn        , a.line_clos	")
			.where("      , i.item_code       , i.item_name       , i.item_spec        , p.pdsd_numb				")
			.where("      , t.cstm_code       , t.cstm_name       , m.mold_code        , m.mold_name				")
			.where("      , a.cvic_idcd       , c.cvic_code       , c.cvic_name										")
			.where("      , ap2.invc_qntt     , ap2.deli_date     , ai.deli_chge_resn  , am.remk_text as acpt_remk_text	")
			.where("      , (select ifnull(sum(r.prod_qntt),0) from work_book r where a.invc_numb = r.wkod_numb		")
			.where("                                                and a.line_seqn = r.wkod_seqn) as prod_qntt		")
			.where("      , ifnull(a.indn_qntt,0) -  (select ifnull(sum(r.prod_qntt),0) from work_book r			")
			.where("                                                where a.invc_numb = r.wkod_numb					")
			.where("                                                and a.line_seqn = r.wkod_seqn) as qntt			")
			.where("      , SUBSTRING(a.work_strt_dttm,1,8) as plan_sttm1											")
			.where("      , SUBSTRING(a.work_strt_dttm,9,4) as plan_sttm2											")
			.where("      , SUBSTRING(a.work_endd_dttm,1,8) as plan_edtm1											")
			.where("      , SUBSTRING(a.work_endd_dttm,9,4) as plan_edtm2											")
			.where("      , (select b.work_strt_dttm from work_book b												")
			.where("                                 where a.invc_numb = b.wkod_numb								")
			.where("                                 and a.line_seqn = b.wkod_seqn									")
			.where("                                 order by b.invc_date limit 1									")
			.where("        ) as prod_strt_dttm																		")
			.where("      , @curRank:=@curRank+1 as rank															")
			.where("      , b2.sum_indn_qntt  , ifnull(ai.cstm_offr_date,'') as cstm_offr_date						")
			.where("      , a.pref_rank																				")
			.where("      , k.wkct_name																				")
			.where("      , a.user_memo																				")
		;
		data.param
			.where("from pror_item a																				")
			.where("left outer join pror_mast      p on a.invc_numb  = p.invc_numb									")
			.where("left outer join item_mast      i on a.item_idcd  = i.item_idcd									")
			.where("left outer join cstm_mast      t on a.cstm_idcd  = t.cstm_idcd									")
			.where("left outer join mold_mast      m on a.mold_idcd  = m.mold_idcd									")
			.where("left outer join cvic_mast      c on a.cvic_idcd  = c.cvic_idcd									")
			.where("left outer join prod_plan pl on a.invc_numb = pl.prod_trst_numb									")
			.where("left outer join prod_plan_acpt ap on pl.invc_numb = ap.invc_numb								")
			.where("left outer join acpt_item     ai on ap.acpt_numb  = ai.invc_numb and ap.acpt_seqn = ai.line_seqn")
			.where("left outer join acpt_mast     am on ai.invc_numb = am.invc_numb									")
			.where("left outer join wkfw_clss      w on a.wkfw_idcd  = w.wkfw_idcd									")
			.where("left outer join wkct_mast      k on a.wkct_idcd  = k.wkct_idcd									")
			.where("left outer join (select sum(ifnull(a.indn_qntt,0)) as sum_indn_qntt,b.acpt_numb					")
			.where("                 from pror_mast b																")
			.where("                 left outer join pror_item a  on a.invc_numb = b.invc_numb						")
			.where("                 where a.line_stat < 2															")
			.where("                 group by acpt_numb) b2 on p.acpt_numb = b2.acpt_numb							")
			.where("left outer join (select a.invc_numb, max(a.deli_date) as deli_date, sum(a.invc_qntt) as invc_qntt	")
			.where("                 from( select a.invc_numb,ap.acpt_numb,ap.acpt_seqn, ai.invc_qntt, ai.deli_date	")
			.where("                       from pror_item a															")
			.where("                       left outer join prod_plan pl on a.invc_numb = pl.prod_trst_numb			")
			.where("                       left outer join prod_plan_acpt ap on pl.invc_numb = ap.invc_numb			")
			.where("                       left outer join acpt_item     ai on ap.acpt_numb  = ai.invc_numb and ap.acpt_seqn = ai.line_seqn	")
			.where("                       group by ap.acpt_numb, ap.acpt_seqn) a									")
			.where("                 group by a.invc_numb) ap2 on a.invc_numb = ap2.invc_numb						")
			.where(",(select @curRank:=0) r																			")
			.where("where  1=1																						")
			.where("and    ap2.deli_date >= :deli_date1" , arg.getParamText("fr_dt"), "3".equals(arg.getParamText("date")))
			.where("and    ap2.deli_date <= :deli_date2" , arg.getParamText("to_dt"), "3".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) >= :crte_dttm1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) <= :crte_dttm2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("date")))
			.where("and    i.find_name like %:find_name%	"  , arg.getParamText("find_name"))
			.where("and    a.item_idcd      =:item_idcd"       , arg.getParamText("item_idcd"))			//품목ID
			.where("and    ai.invc_numb like %:invc_numb%"     , arg.getParameter("invc_numb"))			//주문번호
			.where("and    a.lott_numb like %:lott_numb%"      , arg.getParamText("cstm_lott_numb"))	//lot번호
			.where("and    a.cstm_idcd      =:cstm_idcd"       , arg.getParamText("cstm_idcd"))			//고객
			.where("and    a.wkct_idcd      =:wkct_idcd"       , arg.getParamText("wkct_idcd"))			//공정
			.where("and    a.cvic_idcd      =:cvic_idcd"       , arg.getParamText("cvic_idcd"))			//설비
			.where("and    a.prog_stat_dvcd =:prog_stat_dvcd"  , arg.getParamText("prog_stat_dvcd"))	//진행상태구분
			.where("and    a.line_clos like '%1%'"   , "1".equals(arg.getParamText("line_clos")))		//마감
			.where("and    a.line_clos like '%0%'"   , "2".equals(arg.getParamText("line_clos")))		//정상
			.where("and    a.line_stat   < :line_stat " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    date_add(ifnull(date_format((select max(b.work_endd_dttm) from work_book b								")
			.where("                                          where a.invc_numb = b.wkod_numb										")
			.where("                                          and a.line_seqn = b.wkod_seqn											")
			.where("                                          and b.prog_stat_dvcd = 3												")
			.where("        ),'%Y%m%d'),date_format(now(),'%Y%m%d')), interval 1 day) >= CURRENT_DATE()								")
			.where("group by a.invc_numb, a.line_seqn")
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
			.where("and    a.pdsd_yorn =:pdsd_yorn       " , "0" , "".equals(arg.getParamText("pdsd_yorn")))
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

		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = arg.newStorage("POS");
		data.param
			.query("call work_order_create_v3 (		")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;


	}

	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
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

//		for(SqlResultRow row:pdsd_numb) {
			data.param
				.table("acpt_item								")
				.where("where invc_numb = :invc_numb			")
				.where("and   line_seqn = :line_seqn			")

				.unique("invc_numb"			, arg.fixParameter("orig_invc_numb"))
				.unique("line_seqn"			, arg.fixParameter("acpt_seqn"))

				.update("pdsd_yorn"			, "0"				)		//지시여부
			;data.attach(Action.modify);
			data.execute();
//		}
		return null;
	}

	//lister2 저장
	public SqlResultMap setPlan(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			String work_strt_dttm = row.getParamText("plan_sttm1")+row.getParamText("plan_sttm2");
			String work_endd_dttm = row.getParamText("plan_edtm1")+row.getParamText("plan_edtm2");

			data.param
				.table("pror_item"							)
				.where("where invc_numb   = :invc_numb"		)
				.where("and   line_seqn   = :line_seqn"		)

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("pref_rank"			, row.getParameter("pref_rank"))
				.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
				.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"))
				.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"))
				.update("pckg_cotr_bacd"	, row.getParameter("pckg_cotr_bacd"))
				.update("lott_numb"			, row.getParameter("lott_numb"))
				.update("stok_used_qntt"	, row.getParameter("stok_used_qntt"))
				.update("indn_qntt"			, row.getParameter("indn_qntt"))
				.update("work_strt_dttm"	, work_strt_dttm+"00"			)
				.update("work_endd_dttm"	, work_endd_dttm+"00"			)
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