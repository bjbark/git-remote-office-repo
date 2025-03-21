package com.sky.system.custom.kortc.prod.workentry;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
@Service("kortc.WorkEntryService")
public class WorkEntryService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.invc_numb        , a.line_seqn       , a.bzpl_idcd        , a.wkfw_idcd			")
			.where("        , a.wkct_idcd        , a.cvic_idcd       , a.wkct_item_idcd   , a.orig_invc_numb	")
			.where("        , a.cstm_idcd        , a.item_idcd       , a.bomt_degr        , a.unit_idcd			")
			.where("        , a.indn_qntt        , a.work_strt_dttm  , a.work_endd_dttm   , a.work_dvcd			")
			.where("        , a.insp_wkct_yorn   , a.last_wkct_yorn  , a.cofm_yorn        , a.remk_text			")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif       , a.pckg_cotr_bacd   , a.lott_numb			")
			.where("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
			.where("        , b.acpt_numb        , b.pdsd_numb       , a.prog_stat_dvcd   , i.modl_name			")
			.where("        , a.pref_rank        , b.pdsd_date       , b.strt_dttm        , b.endd_dttm			")
			.where("        , cv.cvic_name																		")
			.where("from    pror_item a																			")
			.where("left outer join pror_mast b  on a.invc_numb  = b.invc_numb									")
			.where("left outer join cstm_mast c  on b.cstm_idcd  = c.cstm_idcd									")
			.where("left outer join cvic_mast cv on cv.cvic_idcd = a.cvic_idcd									")
			.where("left outer join item_mast i  on a.wkct_item_idcd = i.item_idcd								")
			.where("left outer join wkct_mast w  on w.wkct_idcd  = a.wkct_idcd									")
			.where("where   1=1																					")
			.where("and     a.prog_stat_dvcd in('0','2')														")
//			.where("and     STR_TO_DATE( :work_date,'%Y%m%d') >= DATE_FORMAT(a.work_strt_dttm,'%Y%m%d')", arg.getParamText("work_date"))
			.where("and     ifnull(date_format(a.plan_strt_dttm,'%Y%m%d'),DATE_FORMAT(now(),'%Y%m%d')) <= :plan_strt_dttm"   , arg.getParameter("work_date"			))
			.where("and     a.wkct_idcd = :wkct_idcd"             , arg.getParameter("wkct_idcd"			))
			.where("and     a.cvic_idcd = :cvic_idcd"             , arg.getParameter("cvic_idcd"			))
			.where("and     b.line_stat < 2																	")
			.where("order by b.pdsd_date , a.pref_rank, a.invc_numb,a.line_seqn ) a								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
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
			.where("and    a.cvic_idcd = :cvic_idcd"             , arg.getParameter("cvic_idcd"			))
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
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("    select b.*																							")
			.where("         ,a.remk_text     ,a.pror_rank      ,a.base_name as mtrl_name									")
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
			.where("    ( select a.*, @RANK := @RANK+1 as pror_rank															")
			.where("      from ( select a.invc_numb, a.line_seqn, min(b.work_strt_dttm)  as work_strt_dttm 					")
			.where("                  , p.acpt_numb, s.base_name, a.remk_text												")
			.where("             from pror_item a																			")
			.where("             left outer join pror_mast p on a.invc_numb = p.invc_numb									")
			.where("             left outer join ( select base_name,base_code from base_mast  where prnt_idcd = '3101') s	")
			.where("                             on a.mtrl_bacd = s.base_code												")
			.where("             left outer join ( select   min(work_strt_dttm)  as work_strt_dttm 							")
			.where("                                      , wkod_numb 														")
			.where("                                      , wkod_seqn														")
			.where("                                from	work_book														")
			.where("                                group by wkod_numb,wkod_seqn											")
			.where("                             ) b on a.invc_numb = b.wkod_numb and a.line_seqn = b.wkod_seqn				")
			.where("             where  1=1																					")
			.where("             and    a.wkct_idcd = :wkct_idcd"             , arg.getParameter("wkct_idcd"				))
			.where("            and    ( date_format(a.work_strt_dttm,'%Y%m%d') = DATE_FORMAT(now(),'%Y%m%d')				")
			.where("                     or date_format(a.work_endd_dttm,'%Y%m%d')= DATE_FORMAT(now(),'%Y%m%d'))			")
			.where("             and    a.line_stat	< :line_stat1"		, "2" , "".equals(arg.getParamText("line_stat" )	))
			.where("             group by a.invc_numb																		")
			.where("             order by a.work_strt_dttm*1																")
			.where("      ) a ,(select @RANK := 0) r																		")
			.where("      order by work_strt_dttm*1																			")
			.where("    ) a																									")
			.where("    right outer join 																					")
			.where("    ( select a.invc_numb      , a.invc_date       , a.bzpl_idcd       , a.prod_dept_idcd				")
			.where("           , a.wkfw_idcd      , a.wkct_idcd       , a.cvic_idcd       , a.mold_idcd						")
			.where("           , a.item_idcd      , a.mtrl_bacd       , a.pdsd_numb       , a.wkod_numb						")
			.where("           , a.wkod_seqn      , a.dayn_dvcd       , a.indn_qntt       , a.prod_qntt						")
			.where("           , a.good_qntt      , a.poor_qntt       , a.theo_qntt       , a.work_strt_dttm				")
			.where("           , a.work_endd_dttm , a.need_time       , a.work_mnhr       , a.wker_idcd						")
			.where("           , a.work_pcnt      , a.lott_numb       , a.rewd_objt_qntt  , a.work_cond_1fst				")
			.where("           , a.work_cond_2snd , a.work_cond_3trd  , a.cycl_time       , a.cavity as work_cavity			")
			.where("           , a.stun_prod_qntt , a.stun_good_qntt  , a.stun_poor_qntt  , a.work_dvcd						")
			.where("           , a.wkct_insp_yorn , a.last_wkct_yorn  , a.work_para       , a.mtrl_ivst_yorn				")
			.where("           , u.user_name as wker_name             , i.item_name       , a.prog_stat_dvcd				")
			.where("           , c.cvic_code      , c.cvic_name       , i.item_code       , i.item_imge						")
			.where("           , m.cavity         , m.totl_shot       , m.mold_code	      , pm.acpt_numb					")
			.where("           , substring(a.work_strt_dttm,9,6) as work_sttm												")
			.where("           , substring(a.work_endd_dttm,9,6) as work_edtm												")
			.where("           , DATE_FORMAT( a.work_strt_dttm,'%m-%d %H:%i') as work_strt									")
			.where("           , DATE_FORMAT( a.work_endd_dttm,'%m-%d %H:%i') as work_endd									")
			.where("      from work_book a																					")
			.where("      left outer join user_mast u on a.wker_idcd = u.user_idcd											")
			.where("      left outer join item_mast i on a.item_idcd = i.item_idcd											")
			.where("      left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd											")
			.where("      left outer join mold_mast m on a.mold_idcd = m.mold_idcd											")
			.where("      left outer join pror_item p on a.wkod_numb = p.invc_numb and a.wkod_seqn = p.line_seqn			")
			.where("      left outer join pror_mast pm on p.invc_numb = pm.invc_numb										")
			.where("      where  1=1																						")
			.where("      and    a.wkct_idcd = :wkct_idcd2"             , arg.getParameter("wkct_idcd"						))
			.where("      and    a.prog_stat_dvcd in ('2','3','4')															")
			.where("      and    ( date_format(a.work_strt_dttm,'%Y%m%d') = DATE_FORMAT(now(),'%Y%m%d')						")
			.where("               or date_format(a.work_endd_dttm,'%Y%m%d')= DATE_FORMAT(now(),'%Y%m%d'))					")
			.where("      and    a.line_stat	< :line_stat2"		, "2" , "".equals(arg.getParamText("line_stat" )		))
			.where("      order by wkod_numb,wkod_seqn,a.work_strt_dttm*1 limit 100000										")
			.where("    ) b on a.invc_numb = b.wkod_numb and a.line_seqn = b.wkod_seqn										")
			.where("    , (select @str:='',@curRank:=0) s																	")
			.where("    order by pror_rank,b.work_strt_dttm								limit 100000						")
			.where(") a																										")
			.where("order by pror_rank desc,seqn desc 																		")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSearchDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("prog_stat_dvcd").equals("0")){
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize  ")
			;
			data.param
				.query("select     a.invc_numb        , a.line_seqn        , c.cstm_idcd       , c.cstm_name		")
				.query("         , b.acpt_numb        , a.item_idcd        , i.item_name       , i.item_code		")
				.query("         , i.mold_name        , i.item_spec        , a.indn_qntt							")
				.query("         , min(w.work_strt_dttm) as work_strt_dttm , max(w.work_endd_dttm) as work_endd_dttm")
				.query("         , a.prog_stat_dvcd   , a.plan_strt_dttm											")
				.query("         , a.user_memo        , a.sysm_memo        , a.prnt_idcd       , a.line_levl		")
				.query("         , a.line_ordr        , a.line_stat        , a.line_clos       , a.find_name		")
				.query("         , a.updt_user_name   , a.updt_ipad        , a.updt_dttm       , a.updt_idcd		")
				.query("         , a.updt_urif        , a.crte_user_name   , a.crte_ipad       , a.crte_dttm		")
				.query("         , a.crte_idcd        , a.crte_urif													")

			;
			data.param
				.where("from pror_item a")
				.where("left outer join pror_mast b on a.invc_numb = b.invc_numb									")
				.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
				.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
				.where("left outer join work_book w on a.invc_numb = w.wkod_numb and a.line_seqn = w.wkod_seqn		")
				.where("where   1=1																					")
				.where("and     a.wkct_idcd  = :wkct_idcd      " , arg.getParameter("wkct_idcd"))
				.where("and     b.invc_date >= :invc_date      " , arg.getParamText("invc_date"))
				.where("and     b.invc_date <= :invc_date2     " , arg.getParamText("invc_date2"))
				.where("and     a.cvic_idcd  = :cvic_idcd      " , arg.getParamText("cvic_idcd"))
				.where("and		a.line_stat < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat")))
				.where("group by a.invc_numb and a.line_seqn														")
				.where("order by b.invc_date																		")
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
				.where("and		a.prog_stat_dvcd = :prog_stat_dvcd", arg.getParameter("prog_stat_dvcd"			))
				.where("and		a.prog_stat_dvcd = :stat_dvcd"          , arg.getParameter("prog_stat_dvcd"			))
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
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String set = arg.getParamText("_set");
		String dvcd = "1";
		String invc_numb = "";

		if(set.equals("stop")){
			dvcd = "4";
		}else if(set.equals("end")){
			dvcd = "3";
		}else if(set.equals("restart")){
			dvcd = "0";
		}else if(set.equals("cancel")){
			dvcd = "1";
		}else if(set.equals("delete")){
			dvcd = "0";
		}else if(set.equals("updt")){
			dvcd = arg.getParamText("prog_stat_dvcd");
		}else if(set.equals("shiftWork")){
			dvcd = "2";
		}


		for (SqlResultRow row : map) {
			String work_endd_dttm = row.getParamText("invc_date") + row.getParamText("work_edtm")+"00";
			invc_numb = row.getParamText("invc_numb");
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
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
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
					.update("cvic_idcd"				, row.getParameter("cvic_idcd"		))
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
					.update("prod_qntt_1fst"		, row.getParameter("prod_qntt_1fst"		))
					.update("dayn_dvcd"				, row.getParameter("dayn_dvcd"		))
					.update("prog_stat_dvcd"		, dvcd								)


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

				ArrayList<String> wker_idcd = new ArrayList<String>() ;
				if(!row.getParamText("wker_idcd").equals("")){
					wker_idcd.add(row.getParamText("wker_idcd"));
				}
				if(!row.getParamText("wker_idcd2").equals("")){
					wker_idcd.add(row.getParamText("wker_idcd2"));
				}
				if(!row.getParamText("wker_idcd3").equals("")){
					wker_idcd.add(row.getParamText("wker_idcd3"));
				}
				int i = 1;
				for (String wker : wker_idcd) {
					data.clear();
					data.param
						.table("work_book_mans")
						.where("where invc_numb = :invc_numb								")
						.where("and   line_seqn = :line_seqn								")

						.unique("invc_numb"				, invc_numb							)
						.unique("line_seqn"				, i++								)

						.update("invc_date"				, row.getParameter("invc_date"		))
						.update("work_pcnt_dvcd"		, row.getParameter("work_pcnt_dvcd"	))
						.update("work_sttm"				, row.getParamText("work_sttm"		))
						.update("drtr_idcd"				, wker)

						.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
						.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
						.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
						.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
					;
					data.attach(Action.insert);
					data.execute();
				}

			}else{
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
				data.param
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("prog_stat_dvcd"	, dvcd							)
				;
				if(set.equals("stop")||set.equals("end")){
					data.param
						.update("work_endd_dttm"	, work_endd_dttm)
					;
				}
				data.param
					.update("invc_date"			, row.getParameter("invc_date"))
					.update("need_time"			, row.getParameter("need_time"))
					.update("prod_qntt"			, row.getParameter("prod_qntt"))
					.update("prod_qntt_1fst"	, row.getParameter("prod_qntt_1fst"))
					.update("dsct_resn_dvcd"	, row.getParameter("dsct_resn_dvcd"))	//중단사유
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"))

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


				if(set.equals("stop")||set.equals("end")){
					data.param
						.table("work_book_mans")
						.where("where invc_numb = :invc_numb								")

						.unique("invc_numb"				, invc_numb							)

						.update("invc_date"				, row.getParameter("invc_date"		))
						.update("work_edtm"				, row.getParameter("work_edtm"))

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
				}
			}

			if(set.equals("stop")||set.equals("end")){
				data.param
					.query("call auto_work_isos(")
					.query("  :invc_numb",row.fixParameter("invc_numb"))
					.query(")")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
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
			.query("and		a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.wkct_code ) a																	")
		;
		return data.selectForMap();
	}
	public SqlResultMap getAssy_seqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select ifnull(max(line_seqn),0)+1 as seqn													")
		;
		data.param
			.query("from    work_book_assy																		")
			.query("where	1=1																					")
			.query("and		invc_numb   = :invc_numb     "    ,arg.fixParamText("invc_numb" 					))
			.query("and		line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		return data.selectForMap();
	}
	public SqlResultMap getCast(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select a.cond_dvcd																			")
			.query("    , case when a.line_seqn = 1 then (select item_name 										")
			.query("                                     from   sscd_view r										")
			.query("                             where  r.sscd_code = 'cond_dvcd'								")
			.query("                              and    r.item_code = a.cond_dvcd								")
			.query("                             )																")
			.query("         else null end as cond_dvcd_name													")
			.query("   , a.line_seqn        , concat(a.cond_name,' ', a.cond_name_engl) as cond_name			")
			.query("   , a.stup_veri        , a.unit_name       , b.frst_msmt      , b.send_msmt				")
			.query("   , b.thrd_msmt																			")
		;
		data.param
			.where("from cast_cond a																			")
			.where("left outer join ( select * from work_book_cast												")
			.where("                  where 1=1																	")
			.where("                  and   invc_date = :invc_date		", arg.fixParameter("invc_date"))
			.where("                  and   wkct_idcd = :wkct_idcd		", arg.fixParameter("wkct_idcd"))
			.where("                  and   cvic_idcd = :cvic_idcd		", arg.fixParameter("cvic_idcd"))
			.where("                ) b on    a.cond_dvcd = b.cond_dvcd and a.line_seqn = b.line_seqn			")
			.where("order by a.cond_dvcd , a.line_seqn ) a														")
		;
		return data.selectForMap();
	}
	public SqlResultMap getLotIsosSum(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.*																					")
		;
		data.param
			.where("from lot_isos_sum a																			")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("where 1=1																					")
			.where("and   a.stok_qntt > 0 																		")
//			.where("and   i.acct_bacd = '1001'																	")
			.where("and   a.lott_numb like %:lott_numb%",arg.getParameter("bar_code"))
			.where("and   a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		return data.selectForMap();
	}


	//
	public SqlResultMap getPause(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select     a.invc_numb     , STR_TO_DATE( a.invc_date ,'%Y%m%d') as invc_date			")
			.query("         , a.dayn_dvcd     , STR_TO_DATE( a.work_strt_dttm,'%Y%m%d%H%i%s') as work_sttm	")
		;
		data.param
			.where("from   work_book a																	")
			.where("    , (select max(invc_numb) as invc_numb , max(work_endd_dttm) as work_endd_dttm	")
			.where("       from   work_book																")
			.where("       where  prog_stat_dvcd = 4													")
			.where("       and    wkod_numb      = :wkod_numb ", arg.getParameter("wkod_numb"))
			.where("       ) b																			")
			.where("where  1=1																			")
			.where("and    a.invc_numb = b.invc_numb													")
			.where("and    a.cvic_idcd = :cvic_idcd  ",arg.getParameter("cvic_idcd"))
			.where("and    a.work_endd_dttm = b.work_endd_dttm											")
		;
		return data.selectForMap();
	}


	public SqlResultMap setCast(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row : map) {
			data.param
				.table("work_book_cast")
				.where("where invc_date = :invc_date								")
				.where("and   wkct_idcd = :wkct_idcd								")
				.where("and   cvic_idcd = :cvic_idcd								")
				.where("and   cond_dvcd = :cond_dvcd								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_date"				, row.fixParameter("invc_date"		))
				.unique("wkct_idcd"				, row.fixParameter("wkct_idcd"		))
				.unique("cvic_idcd"				, row.fixParameter("cvic_idcd"		))
				.unique("cond_dvcd"				, row.fixParameter("cond_dvcd"		))
				.unique("line_seqn"				, row.fixParameter("line_seqn"		))

				.update("cond_name"				, row.getParameter("cond_name"		))
				.update("stup_veri"				, row.getParameter("stup_veri"		))
				.update("unit_name"				, row.getParameter("unit_name"		))
				.update("frst_msmt"				, row.getParameter("frst_msmt"		))
				.update("send_msmt"				, row.getParameter("send_msmt"		))
				.update("thrd_msmt"				, row.getParameter("thrd_msmt"		))

				.insert("line_levl"				, row.getParameter("line_levl"		))
				.update("updt_idcd"				, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
				.update("updt_ipad"				, arg.remoteAddress )
				.insert("crte_ipad"				, arg.remoteAddress )
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
		}
		data.execute();
		return null;
	}
	public SqlResultMap setTap(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row : map) {
			data.param
				.table("work_book_assy")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")
				.where("and   assi_seqn = :assi_seqn								")


				.unique("invc_numb"				, row.fixParameter("invc_numb"		))
				.unique("line_seqn"				, row.fixParameter("line_seqn"		))
				.unique("assi_seqn"				, row.fixParameter("assi_seqn"		))

				.update("invc_date"				, row.getParameter("invc_date"		))
				.update("msmt_time"				, row.getParameter("msmt_time"		))
				.update("wkct_idcd"				, row.getParameter("wkct_idcd"		))
				.update("cvic_idcd"				, row.getParameter("cvic_idcd"		))
				.update("frst_msmt"				, row.getParameter("frst_msmt"		))

				.insert("line_levl"				, row.getParameter("line_levl"		))
				.update("updt_idcd"				, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
				.update("updt_ipad"				, arg.remoteAddress )
				.insert("crte_ipad"				, arg.remoteAddress )
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
			}
			data.execute();
		return null;
	}
	public SqlResultMap setBookMtrl(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		int seqn = 0;
		for (SqlResultRow row : map) {
			if(seqn == 0){
				data.param
					.table("mtrl_ostt_mast")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"				, row.fixParameter("ostt_invc_numb"))

					.update("invc_date"				, row.getParameter("invc_date"		))
					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"		))
					.update("ostt_dvcd"				, "2100")
					.update("orig_invc_numb"		, row.getParameter("wkod_numb"		))
					.update("orig_seqn"				, row.getParameter("wkod_seqn"		))
					.update("cstm_idcd"				, row.getParameter("wkct_idcd"		))
					.update("drtr_idcd"				, row.getParameter("drtr_idcd"		))

					.update("updt_idcd"				, row.getParameter("drtr_idcd"		))
					.insert("crte_idcd"				, row.getParameter("drtr_idcd"		))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
			}
			data.param
				.table("work_book_mtrl")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"				, row.fixParameter("invc_numb"		))
				.unique("line_seqn"				, row.fixParameter("line_seqn"		))

				.update("item_idcd"				, row.getParameter("item_idcd"		))
				.update("lott_numb"				, row.getParameter("lott_numb"		))

				.update("updt_idcd"				, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
				.update("updt_ipad"				, arg.remoteAddress )
				.insert("crte_ipad"				, arg.remoteAddress )
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.param
				.table("mtrl_ostt_item")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"				, row.fixParameter("ostt_invc_numb"))
				.unique("line_seqn"				, seqn+1)

				.update("wkod_numb"				, row.getParameter("wkod_numb"		))
				.update("item_idcd"				, row.getParameter("item_idcd"		))
				.update("lott_numb"				, row.getParameter("lott_numb"		))
				.update("ostt_wrhs_idcd"		, "02")
//				.update("ostt_wrhs_idcd"		, row.getParameter("wkct_idcd"		))

				.update("updt_idcd"				, row.getParameter("drtr_idcd"		))
				.insert("crte_idcd"				, row.getParameter("drtr_idcd"		))
				.update("updt_ipad"				, arg.remoteAddress )
				.insert("crte_ipad"				, arg.remoteAddress )
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
			sequence.setBook(arg, row.getParamText("ostt_invc_numb"), seqn , "생산출고");
			seqn++;
		}
		return null;
	}

	public SqlResultMap getPoorSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select *																	")
		;
		data.param
			.query("from (																		")
			.query("select   ifnull(max(a.line_seqn),0) as line_seqn							")
		;
		data.param
			.query("from work_book_qc a															")
			.query("where 1=1																	")
			.query("and   a.invc_numb =:invc_numb"  , arg.getParamText("invc_numb"))
			.query("and a.line_stat   < '2'														")
			.query(") a																			")
		;
		return data.selectForMap();
	}
	public SqlResultMap getChekRpst(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select b.cnt														")
		;
		data.param
			.where("from item_mast a													")
			.where("left outer join ( select count(*) as cnt,rpst_item_idcd				")
			.where("                  from item_mast  									")
			.where("                  group by rpst_item_idcd							")
			.where("                  having count(*) >= 3	 							")
			.where("                ) b on a.item_idcd = b.rpst_item_idcd				")
			.where("where a.item_idcd = a.rpst_item_idcd								")
			.where("and a.item_idcd = :item_idcd"  , arg.getParamText("item_idcd"))
		;
		return data.selectForMap();
	}
	public SqlResultMap getCvicSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.cvic_idcd         , a.cvic_code        , a.cvic_name         , a.cvic_spec		")
			.query("        , a.modl_name         , a.cvic_stat_dvcd   , a.cvic_kind_dvcd    , a.wkct_idcd		")
			.query("        , a.istl_loct         , a.move_drtr_name   , a.mngt_drtr_idcd    , a.mngt_dept_idcd	")
			.query("        , a.aset_idcd         , a.aset_name        , a.puch_cstm_idcd    , a.puch_cstm_name	")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.mchn_numb         , a.puch_date		")
			.query("        , a.cvic_usge         , a.puch_amnt        , a.make_natn_bacd						")
			.query("        , a.cvic_type         , a.make_cmpy_name   , a.prod_abty							")
			.query("        , a.cvic_imge_1fst    , a.cvic_imge_2snd   , a.cstm_idcd         , a.cstm_burd_rate	")
			.query("        , a.norm_ivst_date    , a.succ_date        , a.succ_cstm_idcd    , a.chek_ccle_dvcd	")
			.query("        , a.rnmt_dvcd         , a.sral_numb        , a.labo_rate_idcd    , e.labo_rate_name	")
			.query("        , b.dept_name         , c.wkct_name        , d.cstm_name							")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif         , a.crte_user_name   , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd         , a.make_natn_bacd as make_natn_name							")
		;
		data.param
			.query("from    cvic_mast a																			")
			.query("left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd								")
			.query("left outer join wkct_mast c on a.wkct_idcd = c.wkct_idcd									")
			.query("left outer join cstm_mast d on a.puch_cstm_idcd = d. cstm_idcd								")
			.query("left outer join labo_rate e on a.labo_rate_idcd = e. labo_rate_idcd							")
			.query("where	1=1																					")
			.query("and		a.wkct_idcd = :wkct_idcd", arg.getParameter("wkct_idcd"))
			.query("and		a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.cvic_code ) a																	")
			.query("order by a.cvic_code																		")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMtrlSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select max(ifnull(a.line_seqn,0)) as seqn									")
		;
		data.param
			.query("from    work_book_mtrl a													")
			.query("where   invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
			.query("and     line_stat < 2														")
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
			.query("select   ifnull(max(a.line_seqn),0) as line_seqn						 					")
		;
		data.param
			.query("from work_book_loss a																		")
			.query("where 1=1																					")
			.query("and   a.invc_numb =:invc_numb"  , arg.getParamText("invc_numb"))
			.query("and a.line_stat   < '2'																		")
			.query(") a																							")
		;
		return data.selectForMap();
	}

	public SqlResultMap setFail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

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
	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("pror_mast")
			.where("where invc_numb = :invc_numb								")

			.unique("invc_numb"			, arg.fixParameter("wkod_numb"))

			.update("prog_stat_dvcd"	, "0")
		;
		data.attach(Action.update);

		data.param
			.table("pror_item")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"			, arg.fixParameter("wkod_numb"))
			.unique("line_seqn"			, arg.fixParameter("wkod_seqn"))

			.update("prog_stat_dvcd"	, "0")
		;
		data.attach(Action.update);

		data.param
			.table("work_book")
			.where("where invc_numb = :invc_numb								")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))

		;
		data.attach(Action.delete);
		data.param
			.table("work_book_mans")
			.where("where invc_numb = :invc_numb								")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))

		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}
}
