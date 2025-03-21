package com.sky.system.custom.komec.prod.workbook;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;
@Service("komec.WorkBookService")
public class WorkBookService extends DefaultServiceHandler {
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
            .where("select   a.invc_numb      , a.bzpl_idcd    , a.pdod_date     , a.acpt_numb					")
            .where("       , a.acpt_amnd_degr , a.acpt_seqn    , a.cstm_idcd     , a.pdsd_numb					")
            .where("       , a.pdsd_date      , a.pref_rank    , a.item_idcd     , a.strt_dttm					")
            .where("       , a.endd_dttm      , a.indn_qntt    , a.prog_stat_dvcd, a.work_date					")
            .where("       , c.cstm_name      , i.item_name    , i.item_spec     , i.item_code					")
            .where("       , ( select w.wkct_name																")
            .where("           from   work_book wb																")
            .where("           left outer join wkct_mast w on wb.wkct_idcd = w.wkct_idcd						")
            .where("           where wb.wkod_numb = a.invc_numb													")
            .where("           order by wb.invc_numb															")
            .where("           limit 1																			")
            .where("       ) as work_wkct_name																	")
            .where("from pror_mast a																			")
            .where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd")
            .where("left outer join item_mast i on i.item_idcd = a.item_idcd")
            .where("where   1=1																					")
            .where("and     a.prog_stat_dvcd not in('3')														")
//			.where("and     STR_TO_DATE( :work_date,'%Y%m%d') >= DATE_FORMAT(a.work_strt_dttm,'%Y%m%d')", arg.getParamText("work_date"))
            .where("and     ifnull(substr(a.pdsd_date,1,8),DATE_FORMAT(now(),'%Y%m%d')) <= :pdsd_date"   , arg.getParameter("work_date"			))
            .where("and     a.wkct_idcd = :wkct_idcd"             , arg.getParameter("wkct_idcd"			))
            .where("and     a.cvic_idcd = :cvic_idcd"             , arg.getParameter("cvic_idcd"			))
            .where("and     a.line_stat < 2																		")
            .where("order by a.pdsd_date , a.pref_rank ) a														")
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
            .query("select *																		")
        ;
        data.param
            .where("from (																			")
            .where("select   a.invc_numb      , a.line_seqn        , a.wkct_idcd					")
            .where("       , w.wkct_name      , a.wkfw_seqn        , a.prog_stat_dvcd 				")
            .where("       , a.indn_qntt      , a.lott_numb        , a.item_idcd					")
            .where("       , a.bomt_degr															")
            .where("       , max(b.invc_numb) as work_numb											")
            .where("       , min(b.work_strt_dttm) as work_strt_dttm								")
            .where("       , max(ifnull(b.work_endd_dttm,'')) as work_endd_dttm						")
            .where("       , w.user_memo      , i.item_name        , i.item_code					")
            .where("       , m.wrhs_idcd      , m.cvic_idcd	       , a.last_wkct_yorn				")
            .where("       , u.user_name as wkrn_name												")
            .where("       , cast(replace(json_extract(r.json_data, '$.temp_valu'),'\"','') as char) as temp_valu	")
            .where("       , cast(replace(json_extract(r.json_data, '$.rpm_valu'),'\"','') as char) as rpm_valu		")
            .where("       , cast(replace(json_extract(r.json_data, '$.temp_appr'),'\"','') as char) as temp_appr	")
            .where("       , cast(replace(json_extract(r.json_data, '$.rpm_appr'),'\"','') as char) as rpm_appr		")
            .where("from pror_item a																")
            .where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd						")
            .where("left outer join work_book b on a.invc_numb = b.wkod_numb and a.line_seqn = b.wkod_seqn")
            .where("left outer join item_mast i on i.item_idcd = a.item_idcd						")
            .where("left outer join pror_mast m on a.invc_numb = m.invc_numb						")
            .where("left outer join wkfw_rout r on r.wkfw_idcd = a.wkfw_idcd and r.line_seqn = a.wkfw_seqn	")
            .where("left outer join user_mast u on u.user_idcd = b.wker_idcd						")
            .where("where  1=1																		")
            .where("and    a.invc_numb = :invc_numb"             , arg.getParameter("invc_numb"	))
            .where("and    a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
            .where("group by a.invc_numb,a.line_seqn												")
            .where("order by a.line_seqn ) a														")
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
            .where("     , a.work_cond_2snd , a.work_cond_3trd  , a.prod_qntt_1fst							")
            .where("     , a.stun_prod_qntt , a.stun_good_qntt  , a.stun_poor_qntt  , a.work_dvcd			")
            .where("     , a.wkct_insp_yorn , a.last_wkct_yorn  , a.work_para       , a.mtrl_ivst_yorn		")
            .where("     , u.user_name as wker_name             , i.item_name       , a.prog_stat_dvcd		")
            .where("     , p2.acpt_numb     , c.cvic_code       , c.cvic_name								")
            .where("     , substring(a.work_strt_dttm,9,6) as work_sttm										")
            .where("     , substring(a.work_endd_dttm,9,6) as work_edtm										")
            .where("     , l.acum_qntt as acum_qntt_l           , r.acum_qntt as acum_qntt_r				")
            .where("     , @curRank:=@curRank+1 as seqn														")
            .where("from   work_book a																		")
            .where("       left outer join user_mast u on a.wker_idcd = u.user_idcd							")
            .where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
            .where("       left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd							")
            .where("       left outer join pror_item p1 on a.wkod_numb  = p1.invc_numb and a.wkod_seqn = p1.line_seqn	")
            .where("       left outer join pror_mast p2 on p1.invc_numb = p2.invc_numb						")
            .where("       left outer join ( select r.wkod_numb, r.wkod_seqn, sum(r.prod_qntt) as acum_qntt	")
            .where("                         from work_book r												")
            .where("                         group by r.wkod_numb, r.wkod_seqn								")
            .where("       ) l on a.wkod_numb = l.wkod_numb and    a.wkod_seqn = l.wkod_seqn				")
            .where("       left outer join ( select r.wkod_numb, r.wkod_seqn, sum(r.prod_qntt_1fst) as acum_qntt	")
            .where("                         from work_book r												")
            .where("                         group by r.wkod_numb, r.wkod_seqn								")
            .where("       ) r on a.wkod_numb = r.wkod_numb and    a.wkod_seqn = r.wkod_seqn				")
            .where("     ,(select @curRank:=0) s															")
            .where("where  1=1																				")
            .where("and    a.prog_stat_dvcd in ('2','3')													")
            .where("and    a.cvic_idcd = :cvic_idcd"       , arg.getParameter("cvic_idcd"))
            .where("and    a.wkct_idcd = :wkct_idcd"		, arg.getParameter("wkct_idcd"))
            .where("and    (a.wkod_numb,a.wkod_seqn) not in 												")
            .where("                  (select wkod_numb,wkod_seqn from  work_book 							")
            .where("                                    where prog_stat_dvcd = 3 							")
            .where("                                    and CURRENT_DATE() > date_add(STR_TO_DATE(work_endd_dttm,'%Y%m%d') ,interval +1 day)")
            .where("                  )																	 	")
            .where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
            .where("order by a.wkod_numb,a.wkod_seqn,a.invc_numb ) a										")
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
                .where("        , v.cvic_code        , v.cvic_name       , i.modl_name								")
                .where("from    pror_item a																			")
                .where("left outer join pror_mast b on a.invc_numb = b.invc_numb									")
                .where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
                .where("left outer join item_mast i on a.wkct_item_idcd = i.item_idcd								")
                .where("left outer join cvic_mast v on a.cvic_idcd = v.cvic_idcd									")
                .where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd							")
                .where("where   1=1																					")
                .where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"							))
                .where("and     SUBSTRING(a.work_strt_dttm,1,8) >= :work_date      " , arg.getParamText("work_date"))
                .where("and     SUBSTRING(a.work_endd_dttm,1,8) <= :work_date2     " , arg.getParamText("work_date2"))
                .where("and     a.prog_stat_dvcd = :prog_stat_dvcd	", arg.getParamText("prog_stat_dvcd"))
                .where("and		a.line_stat < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat")))
                .where("order   by a.invc_numb ) a																	")
                .where("where   a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd"))
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
            dvcd="2";
        }else if(set.equals("end")){
            dvcd="3";
        }else if(set.equals("restart")){
            dvcd="0";
        }else if(set.equals("cancel")){
            dvcd="1";
        }else if(set.equals("delete")){
            dvcd="0";
        }

        for (SqlResultRow row : map) {
            String[] wker_idcd = row.getParamText("wker_idcd").split(",");

            invc_numb = row.getParamText("work_numb");
            if(set.equals("insert")){
                data.param
                    .table("pror_mast")
                    .where("where invc_numb = :invc_numb								")

                    .unique("invc_numb"			, row.fixParameter("invc_numb"))

                    .update("prog_stat_dvcd"	, dvcd)
                    .update("cvic_idcd"			, row.getParameter("cvic_idcd"))
                ;
                data.attach(Action.update);
                data.execute();
                data.clear();

                data.param
                    .table("pror_item")
                    .where("where invc_numb = :invc_numb								")
                    .where("and   line_seqn = :line_seqn								")

                    .unique("invc_numb"			, row.fixParameter("invc_numb"))
                    .unique("line_seqn"			, row.fixParameter("line_seqn"))

                    .update("prog_stat_dvcd"	, dvcd)
                    .update("cvic_idcd"			, row.getParameter("cvic_idcd"))
                    .update("work_strt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
                ;
                data.attach(Action.update);
                data.execute();
                data.clear();

                data.param
                    .table("work_book")
                    .where("where invc_numb = :invc_numb								")

                    .unique("invc_numb"				, row.fixParameter("work_numb"		))


                    .update("wkct_idcd"				, row.getParameter("wkct_idcd"		))

                    .update("invc_date"				, row.getParameter("invc_date"		))
                    .update("indn_qntt"				, row.getParameter("indn_qntt"		))
                    .update("item_idcd"				, row.getParameter("item_idcd"		))
                    .update("cvic_idcd"				, row.getParameter("cvic_idcd"		))
//                    .update("wker_idcd"				, row.getParameter("wker_idcd"		))
                    .update("pdsd_numb"				, row.getParameter("pdsd_numb"		))
                    .update("wkod_numb"				, row.getParameter("invc_numb"		))
                    .update("wkod_seqn"				, row.getParameter("line_seqn"		))
                    .update("work_strt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
                    .update("lott_numb"				, row.getParameter("lott_numb"		))
                    .update("prod_qntt"				, row.getParameter("prod_qntt"		))
                    .update("prod_qntt_1fst"		, row.getParameter("prod_qntt_1fst"		))
                    .update("dayn_dvcd"				, row.getParameter("dayn_dvcd"		))
                    .update("prog_stat_dvcd"		, dvcd								)
                    .update("wker_idcd"				, row.getParameter("wker_idcd"))


                    .update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
                    .update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
                    .update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
                    .update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
                    .update("find_name"			, row.getParamText("pjod_idcd"			).trim()
                                                + " "
                                                + row.getParamText("invc_date"			).trim()
                                                + " "
                                                + row.getParamText("lott_numb"			).trim())
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

                int idx = 1;
                for (String wk : wker_idcd) {
	                data.param
	                    .table("work_book_mans")
	                    .where("where invc_numb = :invc_numb								")
	                    .where("and   line_seqn = :line_seqn								")

	                    .unique("invc_numb"				, invc_numb							)
	                    .unique("line_seqn"				, idx++								)

	                    .update("drtr_idcd"				, wk)
	                    .update("invc_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
	                    .update("work_sttm"				, new SimpleDateFormat("HHmmss").format(new Date()))

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
                }
            }else{
            	if(set.equals("stop")){
	                data.param
	                    .table("pror_mast")
	                    .where("where invc_numb = :invc_numb								")

	                    .unique("invc_numb"			, row.fixParameter("invc_numb"))

	                    .update("prog_stat_dvcd"	, dvcd)
	                ;
	                data.attach(Action.update);
	                data.execute();
	                data.clear();
            	}

                data.param
                    .table("pror_item")
                    .where("where invc_numb = :invc_numb								")
                    .where("and   line_seqn = :line_seqn								")

                    .unique("invc_numb"			, row.fixParameter("invc_numb"))
                    .unique("line_seqn"			, row.fixParameter("line_seqn"))

                    .update("prog_stat_dvcd"	, dvcd)
//                    .update("cvic_idcd"			, row.getParameter("cvic_idcd"))
                ;
                data.attach(Action.update);
                data.execute();
                data.clear();

                data.param
                    .table("work_book")
                    .where("where invc_numb = :invc_numb								")

                    .unique("invc_numb"			, row.fixParameter("work_numb"))

                    .update("prog_stat_dvcd"	, dvcd							)
                ;
                if(set.equals("stop")||set.equals("end")){
                    data.param
                        .update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
                    ;
                }
                data.param
                    .update("invc_date"			, row.getParameter("invc_date"))
                    .update("need_time"			, row.getParameter("need_time"))
                    .update("prod_qntt"			, row.getParameter("prod_qntt"))
                    .update("prod_qntt_1fst"	, row.getParameter("prod_qntt_1fst"))
                    .update("dsct_resn_dvcd"	, row.getParameter("dsct_resn_dvcd"))	//중단사유
//                    .update("cvic_idcd"			, row.getParameter("cvic_idcd"))

                    .update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
                    .update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
                    .update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
                    .update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
                    .update("find_name"			, row.getParamText("pjod_idcd"			).trim()
                                                + " "
                                                + row.getParamText("invc_date"			).trim()
                                                + " "
                                                + row.getParamText("lott_numb"			).trim())
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

	                .unique("invc_numb"			, row.fixParameter("work_numb"))
	                .unique("line_seqn"			, "1")

	                .update("work_edtm"			, new SimpleDateFormat("HHmmss").format(new Date())) /* 수정일시 */

	                .update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
	                .update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
	                .update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
	                .update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */

	                .update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
	            ;
	            data.attach(Action.update);
	            data.execute();
	            data.clear();
            }

            if(set.equals("end") && row.getParamText("last").equals("1")){
            	data.param
	                .table("pror_mast")
	                .where("where invc_numb = :invc_numb								")

	                .unique("invc_numb"			, row.fixParameter("invc_numb"))

	                .update("prog_stat_dvcd"	, dvcd)
	                .update("prod_qntt"	, row.getParameter("prod_qntt"))

	            ;
	            data.attach(Action.update);
	            data.execute();
	            data.clear();

	            data.param
	                .table("work_book")
	                .where("where invc_numb = :invc_numb								")

	                .unique("invc_numb"			, row.fixParameter("work_numb"))

                    .update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
	                .update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
	                .update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
	                .update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
	                .update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
	                .update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
	            ;
	            data.attach(Action.update);
	            data.execute();
	            data.clear();

	            data.param
	                .table("work_book_mans")
	                .where("where invc_numb = :invc_numb								")
	                .where("and   line_seqn = :line_seqn								")

	                .unique("invc_numb"			, row.fixParameter("work_numb"))
	                .unique("line_seqn"			, "1")

	                .update("work_edtm"			, new SimpleDateFormat("HHmmss").format(new Date())) /* 수정일시 */

	                .update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
	                .update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
	                .update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
	                .update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
	                .update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
	            ;
	            data.attach(Action.update);
	            data.execute();
	            data.clear();

                data.param
                    .query("call auto_work_isos(")
                    .query("  :invc_numb",row.fixParameter("work_numb"))
                    .query(")")
                ;
                data.attach(Action.direct);
                data.execute();
                data.clear();

            }else if(set.equals("end")  && !row.getParamText("last").equals("1")){
            	data.param
	                .table("pror_mast")
	                .where("where invc_numb = :invc_numb					")

	                .unique("invc_numb"			, row.fixParameter("invc_numb"))

	                .update("prog_stat_dvcd"	, 1)
	            ;
	            data.attach(Action.update);
	            data.execute();
	            data.clear();

                data.param
                    .table("pror_item")
                    .where("where invc_numb = :invc_numb								")
                    .where("and   line_seqn = :line_seqn								")

                    .unique("invc_numb"			, row.fixParameter("invc_numb"))
                    .unique("line_seqn"			, row.fixParameter("line_seqn"))

                    .update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
                ;
                data.attach(Action.update);
                data.execute();
                data.clear();
            }
        }

        return null;
    }

    public SqlResultMap getWkctSearch(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");
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

    public SqlResultMap getInptSearch(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");
        data.param
            .query("select *																					")
        ;
        data.param
            .query("from (																					    ")
            .query("  select     b.invc_numb    , b.line_seqn   , b.crte_urif	, b.stok_type_dvcd  			")
            .query("           , b.isos_dvcd	, b.invc_seqn	, b.wrhs_idcd	, b.qntt               	     	")
            .query("           , b.stok_symb	, b.uper_seqn	, b.disp_seqn	, b.line_clos      	  		 	")
            .query("           , b.find_name	, b.updt_dttm	, b.updt_idcd	, b.updt_user_name              ")
            .query("           , b.updt_ipad	, b.updt_urif   , b.lott_numb				           		    ")
            .query("           , i.item_code	, i.item_name   , i.acct_bacd				           		    ")
        ;
        data.param
            .query(" from lot_isos_book b																		 ")
            .query(" left outer join lot_isos_sum  e on b.lott_numb = e.lott_numb								 ")
            .query(" left outer join item_mast i on i.item_idcd   = b.item_idcd									 ")
            .query(" where	1=1																					 ")
            .query(" and b.invc_numb = :invc_numb",arg.getParamText("invc_numb"))
            .query(" ) a																						 ")
        ;
        return data.selectForMap();
    }
    public SqlResultMap getAssy_seqn(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");
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
//		data.param
//			.query("select a.insp_type_idcd     , a.line_seqn        , a.insp_sbsc_name    , a.insp_mthd_dvcd	")
//			.query("     , a.insp_levl_uppt     , a.insp_levl_midl	 , a.insp_levl_lprt    , a.insp_cond		")
//			.query("     , a.rslt_iput_dvcd     , a.msmt_mthd_dvcd   , a.insp_levl         , a.lott_judt_stnd	")
//			.query("     , a.goal_levl          , a.uppr_valu        , a.lwlt_valu         , a.remk_text		")
//			.query("     , b.frst_msmt          , b.frst_msmt_2hr    , b.send_msmt         , b.send_msmt_2hr	")
//			.query("     , b.thrd_msmt          , b.thrd_msmt_2hr    , w.invc_numb as insp_numb					")
//		;
//		data.param
//			.where("from item_mast i																			")
//			.where("left outer join insp_cond a on i.insp_type_idcd = a.insp_type_idcd							")
//			.where("left outer join work_book_cast b on a.insp_type_idcd = b.insp_type_idcd						")
//			.where("and a.line_seqn = b.line_seqn 																")
////			.where("and b.invc_date = :invc_date				", arg.fixParameter("invc_date"))
//			.where("and b.invc_numb = :invc_numb				", arg.fixParameter("invc_numb"))
//			.where("left outer join wkct_insp w on w.wkod_numb = b.invc_numb and w.insp_sbsc_seqn = b.line_seqn	")
//			.where("where 1=1																					")
//			.where("and   i.item_idcd = :item_idcd				", arg.fixParameter("item_idcd"))
//			.where("and   b.invc_date = (select max(invc_date) from work_book_cast r where r.invc_numb = b.invc_numb and r.line_seqn = b.line_seqn)")
//			.where("order by a.line_seqn asc																	")
//		;

        String invc_numb =  (String) arg.fixParameter("invc_numb");

        data.param
			.query("select a.insp_type_idcd     , a.line_seqn        , a.insp_sbsc_name    , a.insp_mthd_dvcd	")
			.query("     , a.insp_levl_uppt     , a.insp_levl_midl	 , a.insp_levl_lprt    , a.insp_cond		")
			.query("     , a.rslt_iput_dvcd     , a.msmt_mthd_dvcd   , a.insp_levl         , a.lott_judt_stnd	")
			.query("     , a.goal_levl          , a.uppr_valu        , a.lwlt_valu         , a.remk_text		")
			.query("     , b.frst_msmt			, b.frst_msmt_2hr	 , b.send_msmt		   , b.send_msmt_2hr	")
			.query("     , b.thrd_msmt			, b.thrd_msmt_2hr	 , w.invc_numb as insp_numb					")
		;
		data.param
			.where("from insp_cond a																			")
			.where("LEFT OUTER JOIN item_mast i ON a.insp_type_idcd = i.insp_type_idcd							")
			.where("LEFT JOIN (																					")
			.where("	SELECT	insp_type_idcd	, line_seqn	, invc_numb	, frst_msmt	, frst_msmt_2hr				")
			.where("		  , send_msmt	, send_msmt_2hr	, thrd_msmt	, thrd_msmt_2hr							")
			.where("	FROM work_book_cast r																	")
			.where("	WHERE 1=1																				")
			.where("	and invc_numb =	 :invc_numb1								 ", 				invc_numb)
			.where("	AND (invc_date, line_seqn) IN (															")
			.where("		SELECT MAX(invc_date), line_seqn													")
			.where("		FROM work_book_cast																	")
			.where("		WHERE invc_numb = :invc_numb2						 	", 					invc_numb)
			.where("		GROUP BY line_seqn																	")
			.where("	)																						")
			.where(") b 	ON a.insp_type_idcd = b.insp_type_idcd AND a.line_seqn = b.line_seqn				")
			.where("left outer join wkct_insp w on w.wkod_numb = b.invc_numb and w.insp_sbsc_seqn = b.line_seqn ")
			.where("WHERE 1=1																					")
			.where("and   i.item_idcd = :item_idcd								 ", arg.fixParameter("item_idcd"))
			.where("GROUP BY a.line_seqn																		")
			.where("order by a.line_seqn asc																	")
		;

		return data.selectForMap();
    }

	public SqlResultMap getBom(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select a.invc_numb          , a.line_seqn        , a.ivst_item_idcd    , a.item_name		")
			.query("     , a.item_spec          , a.mixx_rate        , a.ofap_mixx_rate    , i.item_code		")
			.query("     , d.base_name as acct_name																")
		;
		data.param
			.where("from pror_bom_mast a																		")
			.where("left outer join item_mast i on a.ivst_item_idcd = i.item_idcd								")
			.where("left outer join base_mast d on i.acct_bacd = d.base_code and d.prnt_idcd = '1102'			")
			.where("where 1=1																					")
			.where("and   a.invc_numb = :invc_numb				", arg.fixParameter("invc_numb"))
			.where("order by a.line_seqn ) a																	")
		;
		return data.selectForMap();
	}
    public SqlResultMap getWorkMtrl(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.invc_numb          , a.line_seqn        , a.lott_numb       , a.ivst_qntt		")
			.query("        , a.item_idcd          , a.unit_idcd        , i.item_name       , i.item_code		")
			.query("        , u.unit_name          , a.crte_dttm        , s.stok_qntt       , s.istt_date		")
			.query("        , s.bzpl_idcd          , s.wrhs_idcd        , b.wkod_numb       , b.wkod_seqn		")
		;
		data.param
			.where("from work_book_mtrl a																		")
			.where("left outer join work_book b on a.invc_numb = b.invc_numb									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast u on u.unit_idcd = a.unit_idcd									")
			.where("left outer join lot_isos_sum s on s.lott_numb = a.lott_numb									")
			.where("where 1 = 1																					")
			.where("and   b.wkod_numb = :invc_numb	", arg.fixParameter("invc_numb"))
//			.where("and   b.wkod_seqn = :line_seqn	", arg.fixParameter("line_seqn"))
			.where("order by a.invc_numb , a.line_seqn ) a														")
		;
	    return data.selectForMap();
    }
    public SqlResultMap getBarcodeMtrl(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");
        data.param
            .query("select a.*   , i.item_code   , i.item_name   , i.unit_idcd									")
        ;
        data.param
            .where("from lot_isos_sum a																			")
            .where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
            .where("where 1=1																					")
            .where("and   a.stok_qntt > 0 																		")
//			.where("and   i.acct_bacd = '1001'																	")
            .where("and   a.lott_numb = :lott_numb", arg.fixParameter("lott_numb"))
            .where("and   i.item_idcd in ( select ivst_item_idcd												")
            .where("                       from pror_bom_mast													")
            .where("                       where invc_numb = :invc_numb",arg.fixParameter("invc_numb"))
            .where(")																							")
            .where("and   a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
        ;
        return data.selectForMap();
    }

	public SqlResultMap getLottCheck(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.lott_numb, a.stok_qntt, a.istt_date				")
		;
		data.param
			.where("from lot_isos_sum a											")
			.where("where 1=1													")
			.where("and   item_idcd = (	SELECT item_idcd 						")
			.where("                    from lot_isos_sum 						")
			.where("                    where lott_numb = :lott_numb " , arg.fixParameter("lott_numb"))
			.where("                  ) ")
			.where("and   a.stok_qntt > 0										")
			.where("and   a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.istt_date limit 1;													")
		;
		return data.selectForMap();
	}

    public SqlResultMap setCast(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");
        SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

        for (SqlResultRow row : map) {
        	String insp_numb = row.getParamText("insp_numb");

        	String judt_dvcd = "";
        	double uppr_valu =  row.getParamText("uppr_valu")!=""? Double.parseDouble(row.getParamText("uppr_valu")):0;
        	double lwlt_valu =  row.getParamText("lwlt_valu")!=""? Double.parseDouble(row.getParamText("lwlt_valu")):0;

        	boolean chk = false;
        	//TODO 나중에 함수로 만들어서 서야하는데 지금은 일단 진행.
        	if(!row.getParamText("frst_msmt").equals("")){
        		double frst_msmt = Double.parseDouble(row.getParamText("frst_msmt"));
        		if(uppr_valu < frst_msmt || lwlt_valu > frst_msmt){
        			chk = true;
        		}
        	}
        	if(!row.getParamText("frst_msmt_2hr").equals("")){
        		double frst_msmt_2hr = Double.parseDouble(row.getParamText("frst_msmt_2hr"));
        		if(uppr_valu < frst_msmt_2hr || lwlt_valu > frst_msmt_2hr){
        			chk = true;
        		}
        	}
        	if(!row.getParamText("send_msmt").equals("")){
        		double send_msmt = Double.parseDouble(row.getParamText("send_msmt"));
        		if(uppr_valu < send_msmt || lwlt_valu > send_msmt){
        			chk = true;
        		}
        	}
        	if(!row.getParamText("send_msmt_2hr").equals("")){
        		double send_msmt_2hr = Double.parseDouble(row.getParamText("send_msmt_2hr"));
        		if(uppr_valu < send_msmt_2hr || lwlt_valu > send_msmt_2hr){
        			chk = true;
        		}
        	}
        	if(!row.getParamText("thrd_msmt").equals("")){
        		double thrd_msmt = Double.parseDouble(row.getParamText("thrd_msmt"));
        		if(uppr_valu < thrd_msmt || lwlt_valu > thrd_msmt){
        			chk = true;
        		}
        	}
        	if(!row.getParamText("thrd_msmt_2hr").equals("")){
        		double thrd_msmt_2hr = Double.parseDouble(row.getParamText("thrd_msmt_2hr"));
        		if(uppr_valu < thrd_msmt_2hr || lwlt_valu > thrd_msmt_2hr){
        			chk = true;
        		}
        	}

        	if(row.getParamText("insp_numb").equals("")){
        		data.param
        			.query("call fn_seq_gen_v2(		")
        			.query("	  :stor		", row.fixParameter("stor_id"))
        			.query("	, :table    ", "wkct_insp"			)
        			.query("	, :invc_numb", "not defind"			)
        			.query(")										")
        		;
        		SqlResultRow temp = data.selectForRow();
        		if(!temp.getParamText("seq").equals("")){
        			insp_numb = temp.getParamText("seq");
        		}
        		data.clear();
        	}
            data.param
                .table("work_book_cast")
                .where("where invc_date = :invc_date								")
                .where("and   insp_type_idcd = :insp_type_idcd						")
                .where("and   invc_numb = :invc_numb								")
                .where("and   line_seqn = :line_seqn								")

                .unique("invc_date"				, row.fixParameter("invc_date"		))
                .unique("insp_type_idcd"		, row.fixParameter("insp_type_idcd"	))
                .unique("invc_numb"				, row.fixParameter("invc_numb"		))
                .unique("line_seqn"				, row.fixParameter("line_seqn"		))

                .update("frst_msmt"				, row.getParameter("frst_msmt"		))
                .update("frst_msmt_2hr"			, row.getParameter("frst_msmt_2hr"	))
                .update("send_msmt"				, row.getParameter("send_msmt"		))
                .update("send_msmt_2hr"			, row.getParameter("send_msmt_2hr"	))
                .update("thrd_msmt"				, row.getParameter("thrd_msmt"		))
                .update("thrd_msmt_2hr"			, row.getParameter("thrd_msmt_2hr"	))

                .update("wkct_idcd"				, row.getParameter("wkct_idcd"		))
                .update("cond_dvcd"				, row.getParameter("cond_dvcd"		))
                .update("cond_name"				, row.getParameter("cond_name"		))
                .update("stup_veri"				, row.getParameter("stup_veri"		))
                .update("unit_name"				, row.getParameter("unit_name"		))

                .insert("line_levl"				, row.getParameter("line_levl"		))
                .update("updt_idcd"				, row.getParameter("updt_idcd"		))
                .insert("crte_idcd"				, row.getParameter("crte_idcd"		))
                .update("updt_ipad"				, arg.remoteAddress )
                .insert("crte_ipad"				, arg.remoteAddress )
                .update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
                .insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
            ;
            data.attach(Action.modify);

            data.param
	            .table("wkct_insp")
	            .where("where wkct_insp_dvcd = :wkct_insp_dvcd						")
	            .where("and   invc_numb = :invc_numb								")
	            .where("and   line_seqn = :line_seqn								")
	            .where("and   insp_sbsc_seqn = :insp_sbsc_seqn						")

	            .unique("wkct_insp_dvcd"		, "1000"							)
	            .unique("invc_numb"				, insp_numb							)
	            .unique("line_seqn"				, row.fixParameter("line_seqn"		))
	            .unique("insp_sbsc_seqn"		, row.fixParameter("line_seqn"		))

	            .update("insp_date"				, row.getParameter("invc_date"		))
	            .update("wkct_idcd"				, row.getParameter("wkct_idcd"		))
	            .update("wkod_numb"				, row.getParameter("invc_numb"		))
	            .insert("indn_qntt"				, "1"								)
	            .insert("prod_qntt"				, "1"								)
                .update("msmt_valu_1fst"		, row.getParameter("frst_msmt"		))
	            .update("msmt_valu_2snd"		, row.getParameter("frst_msmt_2hr"	))
	            .update("msmt_valu_3trd"		, row.getParameter("send_msmt"		))
	            .update("msmt_valu_4frt"		, row.getParameter("send_msmt_2hr"	))
	            .update("msmt_valu_5fit"		, row.getParameter("thrd_msmt"		))
	            .update("msmt_valu_6six"		, row.getParameter("thrd_msmt_2hr"	))

	            .update("msmt_time_1fst"		, row.getParamText("frst_msmt_chk"		).equals("Y")?new SimpleDateFormat("HHmmss").format(new Date()):null)
	            .update("msmt_time_2snd"		, row.getParamText("frst_msmt_2hr_chk"	).equals("Y")?new SimpleDateFormat("HHmmss").format(new Date()):null)
	            .update("msmt_time_3trd"		, row.getParamText("send_msmt_chk"		).equals("Y")?new SimpleDateFormat("HHmmss").format(new Date()):null)
	            .update("msmt_time_4frt"		, row.getParamText("send_msmt_2hr_chk"	).equals("Y")?new SimpleDateFormat("HHmmss").format(new Date()):null)
	            .update("msmt_time_5fit"		, row.getParamText("thrd_msmt_chk"		).equals("Y")?new SimpleDateFormat("HHmmss").format(new Date()):null)
	            .update("msmt_time_6six"		, row.getParamText("thrd_msmt_2hr_chk"	).equals("Y")?new SimpleDateFormat("HHmmss").format(new Date()):null)


	            .insert("line_levl"				, row.getParameter("line_levl"		))
	            .update("updt_idcd"				, row.getParameter("updt_idcd"		))
	            .insert("crte_idcd"				, row.getParameter("crte_idcd"		))
	            .update("updt_ipad"				, arg.remoteAddress )
	            .insert("crte_ipad"				, arg.remoteAddress )
	            .update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	            .insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        ;
            if(chk){
            	data.param
            		.update("judt_dvcd","2")
            		.update("poor_qntt","1")
            		.update("pass_qntt","0")
            	;
            }else{
            	data.param
	        		.update("judt_dvcd","1")
	        		.update("poor_qntt","0")
            		.update("pass_qntt","1")
	        	;
            }
	        data.attach(Action.modify);
	        data.execute();
	        data.clear();
        }
        return null;
    }

	public SqlResultMap setBom(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row : map) {
			data.param
				.table("pror_bom_mast")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("line_seqn"	))

				.update("mixx_rate"			, row.getParameter("mixx_rate"		))

				.insert("line_levl"			, row.getParameter("line_levl"		))
				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
		}
		data.execute();
		return null;
	}

    public SqlResultMap setIsos(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");
        for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
            Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

                data.param
                    .table("lot_isos_book")
                    .where("where lott_numb	= :lott_numb")
                    .where("and   line_seqn	= :line_seqn")

                    .unique("lott_numb"			, row.fixParameter("lott_numb"		))
                    .unique("line_seqn"			, row.fixParameter("line_seqn"		))
                    ;
                data.attach(Action.delete);
                data.execute();
                data.clear();
                ;

                data.param
                    .query("select MAX(line_seqn)										")

                    .where("from lot_isos_book											")
                    .where("where invc_numb = :invc_numb",row.fixParameter("invc_numb"  ))
                    .where("order by line_seqn											")
                    ;
                SqlResultMap map = data.selectForMap();
                data.execute();
                data.clear();

                int line_seqn = 1;
                if(map.get(0).getParameter("max(line_seqn)")!=null && row.getParameter("_set").equals("insert")){
                       line_seqn = Integer.parseInt(map.get(0).getParameter("max(line_seqn)").toString());
                       line_seqn++;
                    }else{
                       line_seqn = Integer.parseInt(row.getParamText("line_seqn").toString());
                    }

                data.param
                    .table("lot_isos_book")
                    .where("where lott_numb	= :lott_numb" )
                    .where("and   line_seqn	= :line_seqn" )

                    .unique("lott_numb"				, row.fixParameter("lott_numb"))
                    .unique("line_seqn"				, line_seqn	)

                    .update("bzpl_idcd"				, row.getParameter("bzpl_idcd"))
                    .update("isos_dvcd"				, 2100)
                    .update("invc_date"				, row.getParameter("invc_date"))
                    .update("invc_numb"				, row.getParameter("invc_numb"))
                    .update("invc_seqn"				, row.getParameter("invc_seqn"))
                    .update("wrhs_idcd"				, row.getParameter("wrhs_idcd"))
                    .update("item_idcd"				, row.getParameter("item_idcd"))
                    .update("qntt"					, row.getParameter("qntt"))
                    .update("stok_symb"				, row.getParameter("stok_symb"))
                    .update("uper_seqn"				, row.getParameter("uper_seqn"))
                    .update("disp_seqn"				, row.getParameter("disp_seqn"))
                    .update("user_memo"				, row.getParameter("user_memo"))
                    .update("sysm_memo"				, row.getParameter("sysm_memo"))
                    .update("prnt_idcd"				, row.getParameter("prnt_idcd"))
                    .update("line_levl"				, row.getParameter("line_levl"))
                    .update("line_ordr"				, row.getParameter("line_ordr"))
                    .update("line_stat"				, row.getParameter("line_stat"))
                    .update("line_clos"				, row.getParameter("line_clos"))
	                .update("find_name"				, row.getParameter("item_code")
													+ "	"
													+ row.fixParameter("item_name")
													+ "	")
                    .update("updt_user_name"		, row.getParameter("updt_user_name"))
                    .update("updt_ipad"				, row.getParameter("updt_ipad"))
                    .update("updt_idcd"				, row.getParameter("updt_idcd"))
                    .update("updt_urif"				, row.getParameter("updt_urif"))
                    .update("crte_user_name"		, row.getParameter("crte_user_name"))
                    .update("crte_ipad"				, row.getParameter("crte_ipad"))
                    .update("crte_idcd"				, row.getParameter("crte_idcd"))
                    .update("crte_urif"				, row.getParameter("crte_urif"))
                    .update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
                    .insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
                    ;
                data.attach(Action.insert);
                data.execute();
                data.clear();
                ;

                data.param
                    .table("isos_book")
                    .where("where invc_numb	= :invc_numb")
                    .where("and   line_seqn	= :line_seqn")

                    .unique("invc_numb"			, row.fixParameter("invc_numb"		))
                    .unique("line_seqn"			, line_seqn)
                    ;
                data.attach(Action.delete);
                data.execute();
                data.clear();
                ;

                data.param
                    .table("isos_book")
                    .where("where invc_numb	= :invc_numb" )
                    .where("and   line_seqn	= :line_seqn" )

                    .unique("bzpl_idcd"				, row.fixParameter("bzpl_idcd"))
                    .unique("invc_numb"				, row.fixParameter("invc_numb"))
                    .unique("line_seqn"				, line_seqn)
                    .unique("assi_seqn"				, 0)
                    .unique("invc_dvcd"				, 2100)

                    .update("invc_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
                    .update("acct_bacd"				, row.getParameter("acct_bacd"))
                    .update("wrhs_idcd"				, row.getParameter("wrhs_idcd"))

                    .update("item_idcd"				, row.getParameter("item_idcd"))
                    .update("item_code"				, row.getParameter("item_code"))
                    .update("unit_idcd"				, row.getParameter("unit_idcd"))
                    .update("qntt"					, row.getParameter("qntt"))
 //                 .update("stok_qntt"				 , row.getParameter("stok_qntt"))
 //                 .update("prnt_idcd"				, row.getParameter("invc_numb"))
                    .update("orig_seqn"				, row.getParameter("line_seqn"))
                    .update("cstm_idcd"				, row.getParameter("cstm_idcd"))
                    .update("drtr_idcd"				, row.getParameter("drtr_idcd"))
                    .update("lott_numb"				, row.getParameter("lott_numb"))


                    .update("uper_seqn"				, row.getParameter("uper_seqn"))
                    .update("disp_seqn"				, row.getParameter("disp_seqn"))
                    .update("user_memo"				, row.getParameter("user_memo"))
                    .update("sysm_memo"				, row.getParameter("sysm_memo"))
                    .update("prnt_idcd"				, row.getParameter("prnt_idcd"))
                    .update("line_levl"				, row.getParameter("line_levl"))
                    .update("line_ordr"				, row.getParameter("line_ordr"))
                    .update("line_stat"				, row.getParameter("line_stat"))
                    .update("line_clos"				, row.getParameter("line_clos"))
                    .update("find_name"				, row.getParameter("item_code")
													+ "	"
													+ row.fixParameter("item_name")
													+ "	")
                    .update("updt_user_name"		, row.getParameter("updt_user_name"))
                    .update("updt_ipad"				, row.getParameter("updt_ipad"))
                    .update("updt_idcd"				, row.getParameter("updt_idcd"))
                    .update("updt_urif"				, row.getParameter("updt_urif"))
                    .update("crte_user_name"		, row.getParameter("crte_user_name"))
                    .update("crte_ipad"				, row.getParameter("crte_ipad"))
                    .update("crte_idcd"				, row.getParameter("crte_idcd"))
                    .update("crte_urif"				, row.getParameter("crte_urif"))
                    .update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
                    .insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
                ;
                data.attach(Action.insert);
                data.execute();
                data.clear();
        }
        return null;
    }

    public SqlResultMap delIsos(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");
        for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
            Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

                data.param
                    .table("lot_isos_book")
                    .where("where lott_numb	= :lott_numb")
                    .where("and   line_seqn	= :line_seqn")

                    .unique("lott_numb"			, row.fixParameter("lott_numb"		))
                    .unique("line_seqn"			, row.fixParameter("line_seqn"		))
                    ;
                data.attach(Action.delete);
                data.execute();
                data.clear();
                ;

                data.param
                    .table("isos_book")
                    .where("where lott_numb	= :lott_numb")
                    .where("and   line_seqn	= :line_seqn")

                    .unique("lott_numb"			, row.fixParameter("lott_numb"		))
                    .unique("line_seqn"			, row.fixParameter("line_seqn"		))
                    ;
                data.attach(Action.delete);
                data.execute();
                data.clear();
                ;
        }
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
        int seqn = 1;


        String new_invc_numb = "";

        for (SqlResultRow row : map) {
        	Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

        	if(rowaction==Action.delete){
        		data.param
	    			.table("work_book_mtrl")
	    			.where("where invc_numb = :invc_numb")
	    			.where("and   line_seqn = :line_seqn")

	    			.unique("invc_numb",  row.fixParameter("invc_numb"	))
	    			.unique("line_seqn",  row.fixParameter("line_seqn"	))
	    		;
	    		data.attach(Action.delete);
        		data.param
        			.table("mtrl_ostt_item")
        			.where("where invc_numb = :invc_numb")
        			.where("and   line_seqn = :line_seqn")

        			.unique("invc_numb",  "WB"+row.fixParameter("invc_numb"	))
        			.unique("line_seqn",  row.fixParameter("line_seqn"		))
        		;
        		data.attach(Action.delete);

        		data.param
	        		.table("isos_book")
	        		.where("where invc_numb = :invc_numb	")
	        		.where("and   line_seqn = :line_seqn	")

	        		.unique("invc_numb", "WB"+row.fixParameter("invc_numb"))
	        		.unique("line_seqn", row.fixParameter("line_seqn"))
	        	;
	        	data.attach(Action.delete);
	        	data.param
	        		.table("lot_isos_book")
	        		.where("where invc_numb = :invc_numb	")
	        		.where("and   invc_seqn = :invc_seqn	")

	        		.unique("invc_numb", "WB"+row.fixParameter("invc_numb"))
	        		.unique("invc_seqn", row.fixParameter("line_seqn"))
	        	;
	        	data.attach(Action.delete);
	        	data.execute();
	        	data.clear();
        	}else{
//	            if(row.fixParamText("line_seqn").equals("1")){
                data.param
                    .table("mtrl_ostt_mast")
                    .where("where invc_numb = :invc_numb								")

                    .unique("invc_numb"				, "WB"+row.fixParameter("invc_numb"	))

                    .update("invc_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
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
                data.attach(Action.modify);
                data.execute();
                data.clear();
//	            }

	            data.param
	                .table("work_book_mtrl")
	                .where("where invc_numb = :invc_numb								")
	                .where("and   line_seqn = :line_seqn								")

	                .unique("invc_numb"				, row.fixParameter("invc_numb"		))
	                .unique("line_seqn"				, row.fixParameter("line_seqn"		))

	                .update("item_idcd"				, row.getParameter("item_idcd"		))
	                .update("lott_numb"				, row.getParameter("lott_numb"		))
	                .update("ivst_qntt"				, row.getParameter("ivst_qntt"		))
	                .update("unit_idcd"				, row.getParameter("unit_idcd"		))

	                .update("updt_idcd"				, row.getParameter("updt_idcd"		))
	                .insert("crte_idcd"				, row.getParameter("crte_idcd"		))
	                .update("updt_ipad"				, arg.remoteAddress )
	                .insert("crte_ipad"				, arg.remoteAddress )
	                .update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	                .insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	            ;
	            data.attach(Action.modify);
                data.execute();
	            data.clear();

	            data.param
	                .table("mtrl_ostt_item")
	                .where("where invc_numb = :invc_numb								")
	                .where("and   line_seqn = :line_seqn								")

	                .unique("invc_numb"				, "WB"+row.fixParameter("invc_numb"))
	                .unique("line_seqn"				, row.fixParameter("line_seqn"))

	                .update("wkod_numb"				, row.getParameter("wkod_numb"		))
	                .update("item_idcd"				, row.getParameter("item_idcd"		))
	                .update("lott_numb"				, row.getParameter("lott_numb"		))
	                .update("ostt_qntt"				, row.getParameter("ivst_qntt"		))
	                .update("ostt_wrhs_idcd"		, "02")
	//				.update("ostt_wrhs_idcd"		, row.getParameter("wkct_idcd"		))

	                .update("updt_idcd"				, row.getParameter("drtr_idcd"		))
	                .insert("crte_idcd"				, row.getParameter("drtr_idcd"		))
	                .update("updt_ipad"				, arg.remoteAddress )
	                .insert("crte_ipad"				, arg.remoteAddress )
	                .update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	                .insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	            ;
	            data.attach(Action.modify);
	            data.execute();
	            data.clear();

	            if(rowaction==Action.update){
	            	data.param
	            		.table("isos_book")
	            		.where("where invc_numb = :invc_numb	")
	            		.where("and   line_seqn = :line_seqn	")

	            		.unique("invc_numb", "WB"+row.fixParameter("invc_numb"))
	            		.unique("line_seqn", row.fixParameter("line_seqn"))
	            	;
	            	data.attach(Action.delete);
	                data.execute();
		            data.clear();

	            	data.param
		            	.table("lot_isos_book")
		            	.where("where invc_numb = :invc_numb	")
		            	.where("and   invc_seqn = :invc_seqn	")

		            	.unique("invc_numb", "WB"+row.fixParameter("invc_numb"))
		            	.unique("invc_seqn", row.fixParameter("line_seqn"))
		            	;
	            	data.attach(Action.delete);
	            	data.execute();
		            data.clear();
	            }
	            sequence.setBook(arg, "WB"+row.fixParameter("invc_numb"),row.getParamCast("line_seqn", Integer.class).intValue(), "생산출고");
        	}
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
            .update("work_dsct_yorn"		, arg.getParameter("work_dsct_yorn"	))

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
    public SqlResultMap getCvicState(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");

        String dvcd = arg.fixParamText("dvcd");

        data.param
        	.query("select * from (																									")
        	.query("	select a.device, a.cmd ,(a.param2 * (1/pow(10,param1))) as param from WT_DATA_IN a							")
        	.query("	left outer join WT_DEVICES d on a.device = d.DEVICE															")
        	.query("	where substr(d.descr,1,1) = :dvcd1		",dvcd)
        	.query("	and   d.name = 'wt02-02'																					")
        	.query("	and   date_format(a.TIMEPOINT,'%Y%m%d') = date_format(now(),'%Y%m%d')										")
        	.query("	order by timepoint desc																						")
        	.query("	limit 1																										")
        	.query(") a																												")
        	.query("union all																										")
        	.query("select * from (																									")
        	.query("	select a.device, a.cmd ,(if(a.param2=65535,0,a.param2) * (1/pow(10,param1))) as param from WT_DATA_IN a		")
        	.query("	left outer join WT_DEVICES d on a.device = d.DEVICE															")
        	.query("	where substr(d.descr,1,1) = :dvcd2		",dvcd)
        	.query("	and   d.name = 'wt02-03'																					")
        	.query("	and   date_format(a.TIMEPOINT,'%Y%m%d') = date_format(now(),'%Y%m%d')										")
        	.query("	order by timepoint desc																						")
        	.query("	limit 1																										")
        	.query(") a																												")
        	.query("union all																										")
        	.query("select * from (																									")
        	.query("	select a.device, a.cmd ,(a.param2 * (1/pow(10,param1))) as param from WT_DATA_IN a							")
        	.query("	left outer join WT_DEVICES d on a.device = d.DEVICE															")
        	.query("	where substr(d.descr,1,1) = :dvcd3		",dvcd)
        	.query("	and   d.name = 'wt03-02'																					")
        	.query("	order by timepoint desc																						")
        	.query("	limit 1																										")
        	.query(") a																												")
        	.query("union all																										")
        	.query("select * from (																									")
        	.query("	select a.device, a.cmd ,(if(a.param2=65535,0,a.param2) * (1/pow(10,param1))) as param from WT_DATA_IN a		")
        	.query("	left outer join WT_DEVICES d on a.device = d.DEVICE															")
        	.query("	where substr(d.descr,1,1) = :dvcd4		",dvcd)
        	.query("	and   d.name = 'wt03-03'																					")
        	.query("	order by timepoint desc																						")
        	.query("	limit 1																										")
        	.query(") a																												")
        ;
        return data.selectForMap();
    }
    public SqlResultMap getWeight(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");

        String dvcd = arg.fixParamText("dvcd");

        data.param
        	.query("select * from (																									")
        	.query("	select a.device, a.cmd ,CAST(param1 as decimal(14,3)) as param from WT_DATA_IN a							")
        	.query("	left outer join WT_DEVICES d on a.device = d.DEVICE															")
        	.query("	where substr(d.descr,1,1) = :dvcd1		",dvcd)
        	.query("	and   d.name = 'wt02-01'																					")
        	.query("	and   date_format(a.TIMEPOINT,'%Y%m%d') = date_format(now(),'%Y%m%d')										")
        	.query("	order by timepoint desc																						")
        	.query("	limit 1																										")
        	.query(") a																												")
        	.query("union all																										")
        	.query("select * from (																									")
        	.query("	select a.device, a.cmd ,CAST(param1 as decimal(14,3)) as param from WT_DATA_IN a							")
        	.query("	left outer join WT_DEVICES d on a.device = d.DEVICE															")
        	.query("	where substr(d.descr,1,1) = :dvcd2		",dvcd)
        	.query("	and   d.name = 'wt03-01'																					")
        	.query("	and   date_format(a.TIMEPOINT,'%Y%m%d') = date_format(now(),'%Y%m%d')										")
        	.query("	order by timepoint desc																						")
        	.query("	limit 1																										")
        	.query(") a																												")
        ;
        return data.selectForMap();
    }

    public SqlResultMap getLastEnd(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");

        data.param
        	.query("select  invc_numb , invc_date , DATE_FORMAT(COALESCE(work_endd_dttm, NOW()), '%Y%m%d%H%i%s') as work_endd_dttm , work_strt_dttm , prod_qntt	")
        	.query("      , wkod_numb , wkod_seqn , lott_numb									")
        	.query("from work_book																")
        	.query("where wkod_numb = :wkod_numb ",arg.fixParameter("wkod_numb"))
        	.query("and   wkod_seqn = :wkod_seqn ",arg.fixParameter("wkod_seqn"))
//        	.query("and   prog_stat_dvcd  = '3'													")
        	.query("order by wkod_numb asc														")

        ;
        return data.selectForMap();
    }
    public SqlResultMap setLastWorkBook(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");

        data.param
	        .table("work_book")
	        .where("where invc_numb = :invc_numb								")

	        .unique("invc_numb"				, arg.fixParameter("new_invc_numb"	))

	        .insert("wkct_idcd"				, arg.getParameter("wkct_idcd"		))
	        .insert("invc_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
	        .insert("indn_qntt"				, arg.getParameter("indn_qntt"		))
	        .insert("stok_qntt"				, arg.getParameter("stok_qntt"		))
	        .insert("item_idcd"				, arg.getParameter("item_idcd"		))
	        .insert("cvic_idcd"				, arg.getParameter("cvic_idcd"		))
	        .insert("wkfw_idcd"				, arg.getParameter("wkfw_idcd"		))
	        .insert("cstm_idcd"				, arg.getParameter("cstm_idcd"		))
	//        .update("wker_idcd"				, arg.getParameter("wker_idcd"		))
	        .insert("pdsd_numb"				, arg.getParameter("invc_numb"		))
	        .insert("wkod_numb"				, arg.getParameter("invc_numb"		))
	        .insert("wkod_seqn"				, arg.getParameter("line_seqn"		))
	        .insert("work_strt_dttm"		, arg.getParameter("work_strt_dttm"))
	        .update("work_endd_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
	        .insert("lott_numb"				, arg.getParameter("lott_numb"		))
	        .insert("prod_qntt"				, arg.getParameter("prod_qntt"		))
	        .insert("prog_stat_dvcd"		, "3"								)


	        .update("line_levl"			, arg.getParameter("line_levl")) /* arg레벨 */
	        .update("line_ordr"			, arg.getParameter("line_ordr")) /* arg순서 */
	        .update("line_stat"			, arg.getParameter("line_stat")) /* arg상태 */
	        .update("line_clos"			, arg.getParameter("line_clos")) /* 마감여부 */
	        .update("find_name"			, arg.getParamText("pjod_idcd").trim() + arg.getParamText("invc_date").trim())
	        .update("updt_user_name"	, arg.getParameter("updt_user_name")) /* 수정사용자명 */
	        .update("updt_ipad"			, arg.getParameter("updt_ipad")) /* 수정IP */
	        .update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
	        .update("updt_urif"			, arg.getParameter("updt_urif")) /* 수정UI */
	        .insert("crte_user_name"	, arg.getParameter("crte_user_name")) /* 생성사용자명 */
	        .insert("crte_ipad"			, arg.getParameter("crte_ipad")) /* 생성IP */
	        .update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
	        .insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
	        .insert("crte_idcd"			, arg.getParameter("crte_idcd")) /* 생성ID */
	        .insert("crte_urif"			, arg.getParameter("crte_urif")) /* 생성UI */
	    ;
	    data.attach(Action.modify);
	    data.execute();
	    data.clear();
	    data.param
	        .query("call auto_work_isos(")
	        .query("  :invc_numb",arg.fixParameter("new_invc_numb"))
	        .query(")")
	    ;
	    data.attach(Action.direct);
	    data.execute();
	    data.clear();
        return null;
    }
    public SqlResultMap setLastDeleteBook(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");

        data.param
            .table("lot_isos_book")
            .where("where lott_numb	= :lott_numb")
            .where("and   line_seqn	= :line_seqn")

            .unique("lott_numb"			, arg.fixParameter("lott_numb"		))
            .unique("line_seqn"			, arg.fixParameter("wkod_seqn"		))
        ;
        data.attach(Action.delete)
        ;
        data.param
            .table("isos_book")
            .where("where invc_numb	= :invc_numb")
            .where("and   line_seqn	= :line_seqn")

            .unique("invc_numb"			, arg.fixParameter("wkod_numb"		))
            .unique("line_seqn"			, arg.fixParameter("wkod_seqn"		))
        ;
        data.attach(Action.delete)
        ;
        data.param
	        .table("work_book")
	        .where("where invc_numb	= :invc_numb")

	        .unique("invc_numb"			, arg.fixParameter("invc_numb"		))
        ;
	    data.attach(Action.delete)
	    ;
        data.execute();
        data.clear();
        return null;
    }
    public SqlResultMap setLastEnd(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");

        data.param
	        .table("work_book")
	        .where("where invc_numb	= :invc_numb")

	        .unique("invc_numb"			, arg.fixParameter("work_numb"))

	        .update("prog_stat_dvcd"	,"3")
	        .update("prod_qntt"			, arg.fixParameter("qntt"		))
	        .update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

	        .update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
	        .update("updt_user_name"	, arg.getParameter("updt_user_name")) /* 수정사용자명 */
	        .update("updt_ipad"			, arg.getParameter("updt_ipad")) /* 수정IP */
	        .update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
	        .update("updt_urif"			, arg.getParameter("updt_urif")) /* 수정UI */
	    ;
	    data.attach(Action.update)
	    ;
	    data.param
        	.table("work_book_mans")
	        .where("where invc_numb = :invc_numb								")
	        .where("and   line_seqn = :line_seqn								")

	        .unique("invc_numb"			, arg.fixParameter("work_numb"))
	        .unique("line_seqn"			, "1")

	        .update("work_edtm"			, new SimpleDateFormat("HHmmss").format(new Date())) /* 수정일시 */

	        .update("updt_user_name"	, arg.getParameter("updt_user_name")) /* 수정사용자명 */
	        .update("updt_ipad"			, arg.getParameter("updt_ipad")) /* 수정IP */
	        .update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
	        .update("updt_urif"			, arg.getParameter("updt_urif")) /* 수정UI */
	        .update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
		    ;
	    data.attach(Action.update)
	    ;
        data.param
	        .table("pror_mast")
	        .where("where invc_numb	= :invc_numb")

	        .unique("invc_numb"			, arg.fixParameter("invc_numb"		))

	        .update("prog_stat_dvcd"	,"3")
	        .update("prod_qntt"			, arg.fixParameter("qntt"		))
        ;
	    data.attach(Action.update)
	    ;
	    data.param
	        .table("pror_item")
	        .where("where invc_numb	= :invc_numb")
	        .where("and   line_seqn	= :line_seqn")

	        .unique("invc_numb"			, arg.fixParameter("invc_numb"		))
	        .unique("line_seqn"			, arg.fixParameter("line_seqn"		))

	        .update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
	        .update("prog_stat_dvcd"	,"3")
	    ;
	    data.attach(Action.update)
	    ;
        data.execute();
        data.clear();

        data.param
	        .query("call auto_work_isos(")
	        .query("  :invc_numb",arg.fixParameter("work_numb"	))
	        .query(")")
	    ;
	    data.attach(Action.direct);
	    data.execute();
	    data.clear();

        return null;
    }
    public SqlResultMap setDiv(HttpRequestArgument arg) throws Exception {
        DataMessage data = arg.newStorage("POS");

        data.param
        	.query("call mtrl_div(									")
        	.query("    :invc_numb ", arg.fixParameter("invc_numb"))
        	.query("  , :lott_numb ", arg.fixParameter("lott_numb"))
        	.query("  , :divs_qntt ", arg.fixParameter("divs_qntt"))
        	.query("  , :divs_lott ", arg.fixParameter("divs_lott"))
        	.query(")												")
        ;
        data.attach(Action.direct);
        data.execute()
        ;
        return null;
    }

	public SqlResultMap getBomCheck(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

//		data.param
//			.query("select									")
//			.query("       count(c.ivst_item_idcd) as total	")
//			.query("     , count(m.item_idcd) as cnt		")
//			.query("     , b.invc_numb as work_numb			")
//			.query("     , m.invc_numb as work_mtrl_numb	")
//			.query("     , c.ivst_item_idcd					")
//		;
//		data.param
//			.where("from pror_item a																					")
//			.where("left outer join bom_mast       c on a.item_idcd = c.prnt_item_idcd and a.bomt_degr = c.revs_numb	")
//			.where("left outer join work_book      b on a.invc_numb = b.wkod_numb and a.line_seqn = b.wkod_seqn			")
//			.where("left outer join work_book_mtrl m on m.invc_numb = b.invc_numb and c.ivst_item_idcd = m.item_idcd	")
//			.where("where 1=1														")
//			.where("and   a.invc_numb = :invc_numb ", arg.getParameter("invc_numb"))
//			.where("and   a.line_seqn = :line_seqn ", arg.getParameter("line_seqn"))
//			.where("group by a.invc_numb,a.line_seqn								")
//		;

		data.param
			.query("select									")
			.query("       count(a.item_idcd) as cnt		")
		;
		data.param
			.where("from work_book_mtrl a																					")
			.where("left outer join work_book b on a.invc_numb = b.invc_numb		")
			.where("where 1=1														")
			.where("and   b.wkod_numb = :invc_numb ", 	arg.getParameter("invc_numb"))
			.where("order by a.invc_numb , a.line_seqn								")
		;
		return data.selectForMap();
	}
}
