package com.sky.system.prod.order.workbookv3;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service
public class WorkBookV3Service extends DefaultServiceHandler {

	/**.
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.invc_numb        , a.line_seqn       , a.bzpl_idcd        , a.wkfw_idcd			")
			.where("        , a.wkct_idcd        , a.cvic_idcd       , a.wkct_item_idcd   , a.mold_idcd			")
			.where("        , a.mtrl_bacd        , a.prod_dept_idcd  , a.orig_invc_numb   , a.prog_stat_dvcd	")
			.where("        , a.cstm_idcd        , a.item_idcd       , a.bomt_degr        , a.unit_idcd			")
			.where("        , a.indn_qntt        , a.work_strt_dttm  , a.work_endd_dttm   , a.work_dvcd			")
			.where("        , a.insp_wkct_yorn   , a.last_wkct_yorn  , a.cofm_yorn        , a.remk_text			")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif       , a.pckg_cotr_bacd   , a.lott_numb			")
			.where("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
			.where("        , b.acpt_numb        , b.pdsd_numb       , m.mold_code								")
			.where("        , concat(substring(a.plan_strt_dttm,5,2),'-',substring(a.plan_strt_dttm,7,2),' '	")
			.where("        , substring(a.work_strt_dttm,9,2),':',substring(a.work_strt_dttm,11,2)) as work_strt")
			.where("        , concat(substring(a.work_endd_dttm,5,2),'-',substring(a.work_endd_dttm,7,2),' '	")
			.where("        , substring(a.work_endd_dttm,9,2),':',substring(a.work_endd_dttm,11,2)) as work_endd")
			.where("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code				")
			.where("                                             and   r.prnt_idcd = '3101')   as mtrl_name		")
			.where("        , (select base_name from base_mast r where a.pckg_cotr_bacd  = r.base_code			")
			.where("                                             and   r.prnt_idcd = '8004')   as pckg_cotr_name")
			.where("        , @curRank:=@curRank+1 as seqn														")
			.where("        , w.invc_numb as work_numb               , w.strt_dttm								")
			.where("        , u.user_name as wker_name               , w.prod_qntt								")
			.where("from    pror_item a																			")
			.where("left outer join pror_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on a.wkct_item_idcd = i.item_idcd								")
			.where("left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join ( select   max(invc_numb) as invc_numb      , wkod_numb						")
			.where("                         , max(work_strt_dttm) as strt_dttm , wkod_seqn						")
			.where("                         , wker_idcd      , sum(prod_qntt) as prod_qntt 					")
			.where("                  from  work_book b group by wkod_numb,wkod_seqn							")
			.where("                ) w on a.invc_numb= w.wkod_numb and a.line_seqn = w.wkod_seqn				")
			.where("left outer join user_mast u on w.wker_idcd = u.user_idcd									")
			.where(",(select @curRank:=0) r																		")
			.where("where   1=1																					")
			.where("and     a.prog_stat_dvcd not in ('3')														")
			.where("and     STR_TO_DATE( :work_date,'%Y%m%d') >= DATE_FORMAT(a.plan_strt_dttm,'%Y%m%d')", arg.getParamText("work_date"))
			.where("and     a.wkct_idcd = :wkct_idcd"             , arg.getParameter("wkct_idcd"			))
			.where("order by a.plan_strt_dttm asc ) a															")
		;
		return data.selectForMap(sort);
	}
	public SqlResultMap getSearchDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("       a.invc_numb      , a.invc_date       , a.bzpl_idcd       , a.prod_dept_idcd		")
			.where("     , a.wkfw_idcd      , a.wkct_idcd       , a.cvic_idcd       , a.mold_idcd			")
			.where("     , a.item_idcd      , a.mtrl_bacd       , a.pdsd_numb       , a.wkod_numb			")
			.where("     , a.wkod_seqn      , a.dayn_dvcd       , a.indn_qntt       , a.prod_qntt			")
			.where("     , a.good_qntt      , a.poor_qntt       , a.theo_qntt       , a.work_strt_dttm		")
			.where("     , a.work_endd_dttm , a.need_time       , a.work_mnhr       , a.wker_idcd			")
			.where("     , a.work_pcnt      , a.lott_numb       , a.rewd_objt_qntt  , a.work_cond_1fst		")
			.where("     , a.work_cond_2snd , a.work_cond_3trd												")
			.where("     , a.stun_prod_qntt , a.stun_good_qntt  , a.stun_poor_qntt  , a.work_dvcd			")
			.where("     , a.wkct_insp_yorn , a.last_wkct_yorn  , a.work_para       , a.mtrl_ivst_yorn		")
			.where("     , u.user_name as wker_name             , i.item_name       , a.prog_stat_dvcd		")
			.where("     , c.cvic_code      , c.cvic_name       , m.mold_code       , m.mold_name			")
			.where("     , p2.acpt_numb     , w.wrhs_name as istt_wrhs_name									")
			.where("     , i.item_code      , i.item_imge       , m.cavity          , m.totl_shot			")
			.where("     , (select sum(poor_qntt) from work_book_qc r where a.invc_numb  = r.invc_numb) as qc_poor_qntt	")
			.where("     , substring(a.work_strt_dttm,9,6) as work_sttm										")
			.where("     , substring(a.work_endd_dttm,9,6) as work_edtm										")
			.where("     , (select base_name from base_mast r where p1.mtrl_bacd  = r.base_code				")
			.where("                                          and   r.prnt_idcd = '3101')   as mtrl_name	")
			.where("     , r.acum_qntt      , p1.remk_text													")
			.where("from   work_book a																		")
			.where("       left outer join user_mast u on a.wker_idcd   = u.user_idcd						")
			.where("       left outer join item_mast i on a.item_idcd   = i.item_idcd						")
			.where("       left outer join cvic_mast c on a.cvic_idcd   = c.cvic_idcd						")
			.where("       left outer join mold_mast m on a.mold_idcd   = m.mold_idcd						")
			.where("       left outer join pror_item p1 on a.wkod_numb  = p1.invc_numb and a.wkod_seqn = p1.line_seqn	")
			.where("       left outer join pror_mast p2 on p1.invc_numb = p2.invc_numb						")
			.where("       left outer join wrhs_mast w  on i.istt_wrhs_idcd = w.wrhs_idcd					")
			.where("     , (select r.wkod_numb, r.wkod_seqn, sum(r.prod_qntt) as acum_qntt from work_book r	")
			.where("                 group by r.wkod_numb, r.wkod_seqn) r									")
			.where("where  1=1																				")
			.where("and    a.wkod_numb = r.wkod_numb														")
			.where("and    a.wkod_seqn = r.wkod_seqn														")
			.where("and    a.wkct_idcd = :wkct_idcd"             , arg.getParameter("wkct_idcd"	))
			.where("and    a.prog_stat_dvcd = '1'															")
			.where("and    a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb ) a																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
	;
	data.param
		.query("select *																								")
	;
	data.param
		.where("from (																									")
		.where("    select b.*																							")
		.where("         , a.acpt_numb     ,a.remk_text     ,a.pror_rank      ,a.base_name as mtrl_name					")
		.where("         , (ifnull(b.prod_qntt,0) +																		")
		.where("           ifnull((select sum(r.prod_qntt) 																")
		.where("                   from work_book r																		")
		.where("                   where b.work_strt_dttm > r.work_strt_dttm											")
		.where("                   and    b.wkod_numb = r.wkod_numb														")
		.where("                   group by r.wkod_numb),0)																")
		.where("           ) as acum_qntt																				")
		.where("         , (case @str when b.wkod_numb then @curRank:= @curRank+1 else @curRank := 1 END) as seqn		")
		.where("         , (@str := b.wkod_numb) str																	")
		.where("    from																								")
		.where("    ( select a.invc_numb, a.line_seqn, min(b.work_strt_dttm)  as work_strt_dttm 						")
		.where("           , @RANK := @RANK+1 as pror_rank, p.acpt_numb, s.base_name, a.remk_text						")
		.where("      from pror_item a																					")
		.where("      left outer join work_book b on a.invc_numb = b.wkod_numb and a.line_seqn = b.wkod_seqn			")
		.where("      left outer join pror_mast p on a.invc_numb = p.invc_numb											")
		.where("      left outer join ( select base_name,base_code from base_mast  where prnt_idcd = '3101') s			")
		.where("                      on a.mtrl_bacd = s.base_code														")
		.where("      ,(select @RANK := 0) r																			")
		.where("      where  1=1																						")
		.where("      and    b.invc_date= :invc_date_r"             , arg.getParameter("invc_date"						))
		.where("      and    b.wkct_idcd= :wkct_idcd_r"             , arg.getParameter("wkct_idcd"						))
		.where("      and    b.invc_date= :work_date"             , arg.getParameter("work_date"						))
		.where("      and    a.invc_numb not in 																		")
		.where("                      ( select wkod_numb from work_book 												")
		.where("                        where prog_stat_dvcd = 3 														")
		.where("                        and CURRENT_DATE() >= date_add(STR_TO_DATE(work_endd_dttm,'%Y%m%d') ,interval +1 day)")
		.where("                      )																	 				")
		.where("      and    a.prog_stat_dvcd in (2,3)																	")
		.where("      and    a.line_stat	< :line_stat1"		, "2" , "".equals(arg.getParamText("line_stat" )		))

		.where("      group by wkod_numb,wkod_seqn																		")
		.where("      order by work_strt_dttm																			")
		.where("    ) a																									")
		.where("    left outer join 																					")
		.where("    ( select a.invc_numb      , a.invc_date       , a.bzpl_idcd       , a.prod_dept_idcd				")
		.where("           , a.wkfw_idcd      , a.wkct_idcd       , a.cvic_idcd       , a.mold_idcd						")
		.where("           , a.item_idcd      , a.mtrl_bacd       , a.pdsd_numb       , a.wkod_numb						")
		.where("           , a.wkod_seqn      , a.dayn_dvcd       , a.indn_qntt       , a.prod_qntt						")
		.where("           , a.good_qntt      , a.poor_qntt       , a.theo_qntt       , a.work_strt_dttm				")
		.where("           , a.work_endd_dttm , a.need_time       , a.work_mnhr       , a.wker_idcd						")
		.where("           , a.work_pcnt      , a.lott_numb       , a.rewd_objt_qntt  , a.work_cond_1fst				")
		.where("           , a.work_cond_2snd , a.work_cond_3trd  , a.cycl_time											")
		.where("           , a.stun_prod_qntt , a.stun_good_qntt  , a.stun_poor_qntt  , a.work_dvcd						")
		.where("           , a.wkct_insp_yorn , a.last_wkct_yorn  , a.work_para       , a.mtrl_ivst_yorn				")
		.where("           , u.user_name as wker_name             , i.item_name       , a.prog_stat_dvcd				")
		.where("           , c.cvic_code      , c.cvic_name       , i.item_code       , i.item_imge						")
		.where("           , m.cavity         , m.totl_shot       , m.mold_code											")
		.where("           , substring(a.work_strt_dttm,9,6) as work_sttm												")
		.where("           , substring(a.work_endd_dttm,9,6) as work_edtm												")
		.where("           , concat(substring(a.work_strt_dttm,5,2),'-',substring(a.work_strt_dttm,7,2),' '				")
		.where("           , substring(a.work_strt_dttm,9,2),':',substring(a.work_strt_dttm,11,2)) as work_strt			")
		.where("           , concat(substring(a.work_endd_dttm,5,2),'-',substring(a.work_endd_dttm,7,2),' '				")
		.where("           , substring(a.work_endd_dttm,9,2),':',substring(a.work_endd_dttm,11,2)) as work_endd			")
		.where("      from work_book a																					")
		.where("      left outer join user_mast u on a.wker_idcd = u.user_idcd											")
		.where("      left outer join item_mast i on a.item_idcd = i.item_idcd											")
		.where("      left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd											")
		.where("      left outer join mold_mast m on a.mold_idcd = m.mold_idcd											")
		.where("      where  1=1																						")
		.where("      and    a.invc_date= :invc_date"             , arg.getParameter("invc_date"						))
		.where("      and    a.wkct_idcd= :wkct_idcd"             , arg.getParameter("wkct_idcd"						))
		.where("      and    a.invc_numb not in 																		")
		.where("                      ( select wkod_numb from  work_book 												")
		.where("                        where prog_stat_dvcd = 3 														")
		.where("                        and CURRENT_DATE() >= date_add(STR_TO_DATE(work_endd_dttm,'%Y%m%d') ,interval +1 day)")
		.where("                      )																					")
		.where("      and    a.prog_stat_dvcd in (2,3)																	")
		.where("      and    a.line_stat	< :line_stat2"		, "2" , "".equals(arg.getParamText("line_stat" )		))
		.where("    ) b on a.invc_numb = b.wkod_numb and a.line_seqn = b.wkod_seqn										")
		.where("    left outer join ( select r.wkod_numb, r.wkod_seqn, sum(r.prod_qntt) as acum_qntt					")
		.where("                             from work_book r															")
		.where("                             group by r.wkod_numb, r.wkod_seqn											")
		.where("           ) r on a.invc_numb = r.wkod_numb and    a.line_seqn = r.wkod_seqn							")
		.where("    , (select @str:='',@curRank:=0) s																	")
		.where(") a																										")
		.where("order by  wkod_numb,wkod_seqn	 																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("prog_stat_dvcd").equals("0")){
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize  ")
			;
			data.param
				.query("select *																					")
			;
			data.param
				.where("from (																						")
				.where("select    a.bzpl_idcd        , a.wkfw_idcd													")
				.where("        , a.wkct_idcd        , a.cvic_idcd       , a.wkct_item_idcd   , a.mold_idcd			")
				.where("        , a.mtrl_bacd        , a.prod_dept_idcd  , a.orig_invc_numb   , a.prog_stat_dvcd	")
				.where("        , a.cstm_idcd        , a.item_idcd       , a.bomt_degr        , a.unit_idcd			")
				.where("        , a.indn_qntt        , a.work_strt_dttm  , a.work_endd_dttm   , a.work_dvcd			")
				.where("        , a.insp_wkct_yorn   , a.last_wkct_yorn  , a.cofm_yorn        , a.remk_text			")
				.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
				.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
				.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
				.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
				.where("        , a.crte_idcd        , a.crte_urif													")
				.where("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
				.where("        , b.acpt_numb        , b.pdsd_numb       , w.wkct_name								")
				.where("        , SUBSTRING(a.work_strt_dttm,9,6) as work_sttm										")
				.where("        , SUBSTRING(a.work_endd_dttm,9,6) as work_edtm										")
				.where("        , a.invc_numb as wkod_numb               , a.line_seqn as wkod_seqn					")
				.where("        , v.cvic_code        , v.cvic_name       , a.lott_numb								")
				.where("from    pror_item a																			")
				.where("left outer join pror_mast b on a.invc_numb = b.invc_numb									")
				.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
				.where("left outer join item_mast i on a.wkct_item_idcd = i.item_idcd								")
				.where("left outer join cvic_mast v on a.cvic_idcd = v.cvic_idcd									")
				.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
				.where("where   1=1																					")
				.where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"							))
				.where("and     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd"							))
				.where("and     SUBSTRING(a.work_strt_dttm,1,8) >= :work_date      " , arg.getParamText("work_date"))
				.where("and     SUBSTRING(a.work_endd_dttm,1,8) <= :work_date2     " , arg.getParamText("work_date2"))
				.where("and     a.prog_stat_dvcd = :prog_stat_dvcd	", arg.getParamText("prog_stat_dvcd"))
				.where("and		a.line_stat < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat")))
				.where("order   by a.invc_numb ) a																	")
			;
		}else{
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize  ")
			;
			data.param
				.query("select *																				")
			;
			data.param
				.where("from (																					")
				.where("select																					")
				.where("       a.invc_numb      , a.invc_date       , a.bzpl_idcd       , a.prod_dept_idcd		")
				.where("     , a.wkfw_idcd      , a.wkct_idcd       , a.cvic_idcd       , a.mold_idcd			")
				.where("     , a.item_idcd      , a.mtrl_bacd       , a.pdsd_numb       , a.wkod_numb			")
				.where("     , a.wkod_seqn      , a.dayn_dvcd       , a.indn_qntt       , a.prod_qntt			")
				.where("     , a.good_qntt      , a.poor_qntt       , a.theo_qntt       , a.work_strt_dttm		")
				.where("     , a.work_endd_dttm , a.need_time       , a.work_mnhr       , a.wker_idcd			")
				.where("     , a.work_pcnt      , a.lott_numb       , a.rewd_objt_qntt  , a.work_cond_1fst		")
				.where("     , a.work_cond_2snd , a.work_cond_3trd												")
				.where("     , a.stun_prod_qntt , a.stun_good_qntt  , a.stun_poor_qntt  , a.work_dvcd			")
				.where("     , a.wkct_insp_yorn , a.last_wkct_yorn  , a.work_para       , a.mtrl_ivst_yorn		")
				.where("     , u.user_name as wker_name             , i.item_name       , a.prog_stat_dvcd		")
				.where("     , p2.acpt_numb     , w.wkct_name													")
				.where("     , substring(a.work_strt_dttm,9,6) as work_sttm										")
				.where("     , substring(a.work_endd_dttm,9,6) as work_edtm										")
				.where("from   work_book a																		")
				.where("       left outer join user_mast u on a.wker_idcd = u.user_idcd							")
				.where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
				.where("       left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd							")
				.where("       left outer join pror_item p1 on a.wkod_numb  = p1.invc_numb and a.wkod_seqn = p1.line_seqn	")
				.where("       left outer join pror_mast p2 on p1.invc_numb = p2.invc_numb						")
				.where("where   1=1																				")
				.where("and     a.wkod_numb = :invc_numb" , arg.getParameter("invc_numb"						))
				.where("and     a.invc_date >= :work_date      " , arg.getParamText("work_date"  ))
				.where("and     a.invc_date <= :work_date2     " , arg.getParamText("work_date2" ))
				.where("and     a.lott_numb like %:lott_numb%  ", arg.getParamText("lott_numb"))
				.where("and     a.wkod_numb like %:wkod_numb%  ", arg.getParameter("wkod_numb"))
				.where("and		a.prog_stat_dvcd = :stat_dvcd  ", arg.getParameter("prog_stat_dvcd"))
				.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_numb ) a																")
				.where("where     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd"))
			;
		}
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchBarcode(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("dvcd").equals("0")){
			data.param
				.query("select *																					")
			;
			data.param
				.where("from (																						")
				.where("select    a.bzpl_idcd        , a.wkfw_idcd													")
				.where("        , a.wkct_idcd        , a.cvic_idcd       , a.wkct_item_idcd   , a.mold_idcd			")
				.where("        , a.mtrl_bacd        , a.prod_dept_idcd  , a.orig_invc_numb   , a.prog_stat_dvcd	")
				.where("        , a.cstm_idcd        , a.item_idcd       , a.bomt_degr        , a.unit_idcd			")
				.where("        , a.indn_qntt        , a.work_strt_dttm  , a.work_endd_dttm   , a.work_dvcd			")
				.where("        , a.insp_wkct_yorn   , a.last_wkct_yorn  , a.cofm_yorn        , a.remk_text			")
				.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
				.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
				.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
				.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
				.where("        , a.crte_idcd        , a.crte_urif													")
				.where("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
				.where("        , b.acpt_numb        , b.pdsd_numb       , w.wkct_name								")
				.where("        , SUBSTRING(a.work_strt_dttm,9,6) as work_sttm										")
				.where("        , SUBSTRING(a.work_endd_dttm,9,6) as work_edtm										")
				.where("        , a.invc_numb as wkod_numb               , a.line_seqn as wkod_seqn					")
				.where("        , v.cvic_code        , v.cvic_name       , a.lott_numb								")
				.where("        , w.prod_qntt																		")
				.where("from    pror_item a																			")
				.where("left outer join pror_mast b on a.invc_numb = b.invc_numb									")
				.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
				.where("left outer join item_mast i on a.wkct_item_idcd = i.item_idcd								")
				.where("left outer join cvic_mast v on a.cvic_idcd = v.cvic_idcd									")
				.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
				.where("left outer join ( select   max(invc_numb) as invc_numb      , wkod_numb						")
				.where("                         , max(work_strt_dttm) as strt_dttm , wkod_seqn						")
				.where("                         , wker_idcd      , sum(prod_qntt) as prod_qntt 					")
				.where("                  from  work_book b group by wkod_numb,wkod_seqn							")
				.where("                ) w on a.invc_numb= w.wkod_numb and a.line_seqn = w.wkod_seqn				")
				.where("where   1=1																					")
				.where("and     a.invc_numb = :bar_code" , arg.getParameter("bar_code"								))
				.where("and     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd"							))
				.where("and		a.line_stat < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat")))
				.where("order   by a.invc_numb ) a																	")
			;
		}else{
			data.param
				.query("select *																				")
			;
			data.param
				.where("from (																					")
				.where("select																					")
				.where("       a.invc_numb      , a.invc_date       , a.bzpl_idcd       , a.prod_dept_idcd		")
				.where("     , a.wkfw_idcd      , a.wkct_idcd       , a.cvic_idcd       , a.mold_idcd			")
				.where("     , a.item_idcd      , a.mtrl_bacd       , a.pdsd_numb       , a.wkod_numb			")
				.where("     , a.wkod_seqn      , a.dayn_dvcd       , a.indn_qntt       , a.prod_qntt			")
				.where("     , a.good_qntt      , a.poor_qntt       , a.theo_qntt       , a.work_strt_dttm		")
				.where("     , a.work_endd_dttm , a.need_time       , a.work_mnhr       , a.wker_idcd			")
				.where("     , a.work_pcnt      , a.lott_numb       , a.rewd_objt_qntt  , a.work_cond_1fst		")
				.where("     , a.work_cond_2snd , a.work_cond_3trd												")
				.where("     , a.stun_prod_qntt , a.stun_good_qntt  , a.stun_poor_qntt  , a.work_dvcd			")
				.where("     , a.wkct_insp_yorn , a.last_wkct_yorn  , a.work_para       , a.mtrl_ivst_yorn		")
				.where("     , u.user_name as wker_name             , i.item_name       , a.prog_stat_dvcd		")
				.where("     , p2.acpt_numb     , w.wkct_name													")
				.where("     , substring(a.work_strt_dttm,9,6) as work_sttm										")
				.where("     , substring(a.work_endd_dttm,9,6) as work_edtm										")
				.where("from   work_book a																		")
				.where("       left outer join user_mast u on a.wker_idcd = u.user_idcd							")
				.where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
				.where("       left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd							")
				.where("       left outer join pror_item p1 on a.wkod_numb  = p1.invc_numb and a.wkod_seqn = p1.line_seqn	")
				.where("       left outer join pror_mast p2 on p1.invc_numb = p2.invc_numb						")
				.where("where   1=1																				")
				.where("and     a.wkod_numb = :wkod_numb" , arg.getParameter("wkod_numb"						))
				.where("and     a.wkod_seqn = :wkod_seqn" , arg.getParameter("wkod_seqn"						))
				.where("and     a.prog_stat_dvcd = :prog_stat_dvcd", arg.getParameter("dvcd"					))
				.where("and     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd"))
				.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_numb ) a																")
			;
		}

		return data.selectForMap();
	}
	//불량조회
	public SqlResultMap getPoor(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																		")
		;
		data.param
			.where("from (																			")
			.where("select																			")
			.where("        a.invc_numb   , a.line_seqn    , a.invc_date       , a.poor_bacd		")
			.where("      , a.sttm        , a.edtm         , a.wker_idcd       , a.occr_qntt		")
			.where("      , a.good_qntt   , a.poor_qntt    , a.poor_proc_dvcd						")
			.where("      , (select base_name from base_mast r where a.poor_bacd  = r.base_code		")
			.where("                                             and   r.prnt_idcd = '6000')   as poor_name")
			.where("from   work_book_qc a															")
			.where("where  1=1																		")
			.where("and    a.invc_numb = :invc_numb"		, arg.getParameter("invc_numb"))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn ) a														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//유실조회
	public SqlResultMap getFail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																		")
		;
		data.param
			.where("from (																			")
			.where("select																			")
			.where("        a.invc_numb      , a.line_seqn      , a.invc_date    , a.loss_pcnt 		")
			.where("      , a.loss_resn_dvcd , a.sttm           , a.edtm         , a.loss_time		")
			.where("      , (select base_name from base_mast r where a.loss_resn_dvcd  = r.base_code		")
			.where("                                             and   r.prnt_idcd = '6100')   as loss_name	")
			.where("from   work_book_loss a															")
			.where("where  1=1																		")
			.where("and    a.invc_numb = :invc_numb"		, arg.getParameter("invc_numb"))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn ) a														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select max(line_seqn) as seq															")
		;
		data.param
			.where("from work_book																			")
			.where("where invc_numb = :invc_numb", arg.getParameter("invc_numb								"))
		;
		return data.selectForMap();
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String set = arg.getParamText("_set");
		String dvcd = "1";
		String work_edtm = "";
		if(set.equals("stop")){
			dvcd="2";
		}else if(set.equals("end")){
			dvcd="3";
		}else if(set.equals("restart")){
			dvcd="0";
		}else if(set.equals("cancel")){
			dvcd="1";
		}


		for (SqlResultRow row : map) {
			if(row.getParamText("work_edtm").length() < 6 && row.getParamText("work_edtm").length() > 1) {
				work_edtm = row.getParamText("work_edtm")+"00";
			}else{
				work_edtm = row.getParamText("work_edtm");
			}
			if(set.equals("insert")){
				data.param
					.table("pror_mast")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("pror_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))
					.unique("line_seqn"			, row.fixParameter("wkod_seqn"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"				, row.fixParameter("invc_numb"		))


					.update("wkct_idcd"				, row.getParameter("wkct_idcd"		))

					.update("invc_date"				, row.getParameter("invc_date"		))
					.update("indn_qntt"				, row.getParameter("indn_qntt"		))
					.update("item_idcd"				, row.getParameter("item_idcd"		))
					.update("wker_idcd"				, row.getParameter("wker_idcd"		))
					.update("pdsd_numb"				, row.getParameter("pdsd_numb"		))
					.update("wkod_numb"				, row.getParameter("wkod_numb"		))
					.update("wkod_seqn"				, row.getParameter("wkod_seqn"		))
					.update("work_strt_dttm"		, row.getParamText("invc_date") + row.getParamText("work_sttm"))
					.update("work_endd_dttm"		, row.getParameter("work_endd_dttm"	))
					.update("mold_idcd"				, row.getParameter("mold_idcd"		))
					.update("mtrl_bacd"				, row.getParameter("mtrl_bacd"		))
					.update("lott_numb"				, row.getParameter("lott_numb"		))
					.update("prod_qntt"				, row.getParameter("prod_qntt"		))
					.update("dayn_dvcd"				, row.getParameter("dayn_dvcd"		))
					.update("prog_stat_dvcd"		, dvcd								)
					.update("last_wkct_yorn"		, row.getParameter("last_wkct_yorn"))	//최종공정


					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("work_book_mans")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"				, row.fixParameter("invc_numb"		))
					.unique("line_seqn"				, 1)

					.update("work_sttm"				, row.getParamText("work_sttm"		))
					.update("drtr_idcd"				, row.getParameter("wker_idcd"		))

					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
			}else{
				if(set.equals("stop") ||set.equals("end")){
					data.param
						.table("work_book_mans")
						.where("where invc_numb = :invc_numb")
						.where("and   line_seqn = :line_seqn")

						.unique("invc_numb"		, row.fixParameter("invc_numb"		))
						.unique("line_seqn"		, 1)

						.update("work_edtm", work_edtm)
						.update("updt_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

					;
					data.attach(Action.update);
					data.execute();
					data.clear();
				}
				if(set.equals("cancel")){
					data.param
						.query("update work_book_mans 			")
						.query("set    work_edtm = null			")
						.query("  , updt_dttm = :updt_dttm"		 , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
						.query("where invc_numb = :invc_numb	", row.getParameter("invc_numb"))
						.query("and line_seqn   = :line_seqn	", 1)
					;
					data.attach(Action.direct);
					data.execute();
					data.clear();
				}
				int q = 0;
				if(set.equals("end")){
					//공정검사 입력
					ParamToJson p = new ParamToJson();
					String param = p.TranslateRowRec(map, "", "wkod_numb,wkod_seqn,item_idcd,work_edtm,pitch,lead_angl,h_valu,a_valu,b_valu,tick_valu,widh_valu,long_valu");
					data.param
						.query("call work_book_insp( :param ", param)
						.query(")")
					;
					data.attach(Action.direct);
					data.execute();
					data.clear();

//					temp.param
//						.query("select sum(prod_qntt) as sum_prod								")
//						.query("from work_book													")
//						.query("where wkod_numb = :wkod_numb	", row.getParameter("wkod_numb"))
//						.query("and wkod_seqn   = :wkod_seqn	", row.getParameter("wkod_seqn"))
//						.query("group by wkod_numb, wkod_seqn									")
//					;
//					SqlResultRow qntt = temp.selectForRow();
//					temp.clear();
//
//					Double sum_prod  = Double.parseDouble(qntt.getParamText("sum_prod"));
//					Double prod_qntt = Double.parseDouble(row.getParamText("prod_qntt"));
//					Double indn_qntt = Double.parseDouble(row.getParamText("indn_qntt"));
//					q = (int)(sum_prod+prod_qntt);
//
//					if(q < indn_qntt){
//						dvcd = "1";
//					}

					data.param
						.table("work_book")
						.where("where invc_numb = :invc_numb								")

						.unique("invc_numb"				, row.fixParameter("invc_numb"		))
						.update("wker_idcd"				, row.getParameter("wker_idcd"		))

						.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
						.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
						.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
						.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
						.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
						.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
						.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
						.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
						.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
						.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
						.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
						.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
						.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

				}


				data.param
					.table("pror_mast")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("pror_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))
					.unique("line_seqn"			, row.fixParameter("wkod_seqn"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("prog_stat_dvcd"	, dvcd							)
					.update("work_endd_dttm"	, row.getParamText("invc_date") + work_edtm)
					.update("invc_date"			, row.getParameter("invc_date"))
					.update("need_time"			, row.getParameter("need_time"))
					.update("indn_qntt"			, row.getParameter("indn_qntt"))
					.update("prod_qntt"			, row.getParameter("prod_qntt"))
					.update("dsct_resn_dvcd"	, row.getParameter("dsct_resn_dvcd"))	//중단사유

					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("work_book_mans")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"				, row.fixParameter("invc_numb"		))
					.unique("line_seqn"				, 1)

					.update("drtr_idcd"				, row.getParameter("wker_idcd"		))

					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
				if(set.equals("end")){
					data.param
						.query("call prod_istt_booking( ")
						.query(" :invc_numb", row.fixParameter("invc_numb"))
						.query(")")
					;
					data.attach(Action.direct);
					data.execute();
					data.clear();
				}
			}
		}
		return null;
	}

	public SqlResultMap getWkctSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.wkct_idcd         , a.wkct_code        , a.wkct_name         , a.wkct_stnm		")
			.query("        , a.bzpl_idcd         , a.dept_idcd        , a.labo_rate_idcd    , a.otod_yorn		")
			.query("        , a.cstm_idcd         , a.rslt_rept_yorn											")
			.query("        , e.labo_rate_name    , b.dept_name        , d.cstm_name							")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif         , a.crte_user_name   , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd																		")
		;
		data.param
			.query("from    wkct_mast a																			")
			.query("left outer join dept_mast b on a.dept_idcd = b.dept_idcd									")
			.query("left outer join cstm_mast d on a.cstm_idcd = d. cstm_idcd								")
			.query("left outer join labo_rate e on a.labo_rate_idcd = e. labo_rate_idcd							")
			.query("where	1=1																					")
			.query("and		a.line_stat       < :line_stat      "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("and		a.rslt_rept_yorn  = :rslt_rept_yorn "    , arg.getParamText("rslt_rept_yorn" ))
			.query("order by a.wkct_code ) a																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap getPoorSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select   count(*) as line_seqn						 										")
		;
		data.param
			.query("from work_book_qc a																			")
			.query("where 1=1																					")
			.query("and   a.invc_numb =:invc_numb"  , arg.getParamText("invc_numb"))
			.query("and a.line_stat   < '2'																		")
			.query(") a																							")
		;
		return data.selectForMap();
	}

	public SqlResultMap setPoor(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_qc")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))

			.update("invc_date"				, arg.getParameter("invc_date"		))
			.update("poor_bacd"				, arg.getParameter("poor_bacd"		))
			.update("sttm"					, arg.getParameter("sttm"			))
			.update("edtm"					, arg.getParameter("edtm"			))
			.update("wker_idcd"				, arg.getParameter("wker_idcd"		))
			.update("occr_qntt"				, arg.getParameter("occr_qntt"		))
			.update("poor_qntt"				, arg.getParameter("poor_qntt"		))
			.update("poor_proc_dvcd"		, arg.getParameter("poor_proc_dvcd"	))
			.update("remk_text"				, arg.getParameter("remk_text"		))

			.update("line_levl"				, arg.getParameter("line_levl")) /* ROW레벨 */
			.update("line_ordr"				, arg.getParameter("line_ordr")) /* ROW순서 */
			.update("line_stat"				, arg.getParameter("line_stat")) /* ROW상태 */
			.update("line_clos"				, arg.getParameter("line_clos")) /* 마감여부 */
			.update("updt_user_name"		, arg.getParameter("updt_user_name")) /* 수정사용자명 */
			.update("updt_ipad"				, arg.getParameter("updt_ipad")) /* 수정IP */
			.update("updt_idcd"				, arg.getParameter("updt_idcd")) /* 수정ID */
			.update("updt_urif"				, arg.getParameter("updt_urif")) /* 수정UI */
			.insert("crte_user_name"		, arg.getParameter("crte_user_name")) /* 생성사용자명 */
			.insert("crte_ipad"				, arg.getParameter("crte_ipad")) /* 생성IP */
			.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
			.insert("crte_idcd"				, arg.getParameter("crte_idcd")) /* 생성ID */
			.insert("crte_urif"				, arg.getParameter("crte_urif")) /* 생성UI */
		;
		data.attach(Action.insert);
		data.execute();
		return null;
	}

	//불량내역삭제
	public SqlResultMap setPoorDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_qc")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

	public SqlResultMap getFailSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select   count(*) as line_seqn						 										")
		;
		data.param
			.query("from work_book_loss a																			")
			.query("where 1=1																					")
			.query("and   a.invc_numb =:invc_numb"  , arg.getParamText("invc_numb"))
			.query("and a.line_stat   < '2'																		")
			.query(") a																							")
		;
		return data.selectForMap();
	}

	public SqlResultMap setFail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		Action rowaction = SqlParameter.Action.setValue(arg.getParamText("_set"));
		data.param
			.table("work_book_loss")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))

			.update("invc_date"				, arg.getParameter("invc_date"		))
			.update("loss_resn_dvcd"		, arg.getParameter("loss_resn_dvcd"	))
			.update("sttm"					, arg.getParameter("sttm"			))
			.update("edtm"					, arg.getParameter("edtm"			))
			.update("loss_time"				, arg.getParameter("loss_time"		))
			.update("loss_pcnt"				, arg.getParameter("loss_pcnt"		))
			.update("loss_mnhr"				, arg.getParameter("loss_mnhr"		))
			.update("runn_dsct_yorn"		, arg.getParameter("runn_dsct_yorn"	))

			.update("line_levl"				, arg.getParameter("line_levl")) /* ROW레벨 */
			.update("line_ordr"				, arg.getParameter("line_ordr")) /* ROW순서 */
			.update("line_stat"				, arg.getParameter("line_stat")) /* ROW상태 */
			.update("line_clos"				, arg.getParameter("line_clos")) /* 마감여부 */
			.update("updt_user_name"		, arg.getParameter("updt_user_name")) /* 수정사용자명 */
			.update("updt_ipad"				, arg.getParameter("updt_ipad")) /* 수정IP */
			.update("updt_idcd"				, arg.getParameter("updt_idcd")) /* 수정ID */
			.update("updt_urif"				, arg.getParameter("updt_urif")) /* 수정UI */
			.insert("crte_user_name"		, arg.getParameter("crte_user_name")) /* 생성사용자명 */
			.insert("crte_ipad"				, arg.getParameter("crte_ipad")) /* 생성IP */
			.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
			.insert("crte_idcd"				, arg.getParameter("crte_idcd")) /* 생성ID */
			.insert("crte_urif"				, arg.getParameter("crte_urif")) /* 생성UI */
		;
		data.attach(rowaction);
		data.execute();
		return null;
	}

	//유실내역삭제
	public SqlResultMap setFailDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_loss")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

	//검사항목 기준치 조회
	public SqlResultMap getDesc(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
//			.query("select   rpad(round(truncate(a.half_pich,4),3),5,0) as half_pich1							")
			.query("select   (case a.bolt_unit_dvcd when 'JIS' then a.jiss_pich									")
			.query("                                when 'Inch' then a.inch_mtct								")
			.query("                                end) as pitch1												")
			.query("       , a.lead_angl as lead_angl1        , a.h_valu as h_valu1								")
			.query("       , a.a_valu as a_valu1              , a.b_valu as b_valu1								")
			.query("       , a.tick_valu as tick_valu1        , a.widh_valu as widh_valu1						")
			.query("       , (case ac.make_bacd  when '0003' then '61~63'										")
			.query("                             when '0004' then '63~65'										")
			.query("                             when '0005' then '63~65'										")
			.query("                             end ) as make_name 											")
		;
		data.param
			.query("from item_desc a																			")
			.query("left outer join ( select  a.invc_numb , t.item_idcd	, s.make_bacd							")
			.query("                  from  pror_item a 														")
			.query("                  left outer join pror_mast  p  on a.invc_numb = p.invc_numb				")
			.query("                  left outer join acpt_item  t  on p.acpt_numb = t.invc_numb and p.acpt_seqn = t.line_seqn	")
			.query("                  left outer join acpt_prod_spec s on t.invc_numb = s.invc_numb and t.amnd_degr = s.amnd_degr and t.line_seqn = s.line_seqn	")
			.query("                ) ac on ac.item_idcd = a.item_idcd											")
			.query("where 1=1																					")
			.query("and   a.item_idcd =:item_idcd"  , arg.getParamText("item_idcd"))
			.query("and   ac.invc_numb =:invc_numb"  , arg.getParamText("invc_numb2"))
			.query("group by a.item_idcd																		")
			.query(") a																							")
		;
		return data.selectForMap();
	}
}
