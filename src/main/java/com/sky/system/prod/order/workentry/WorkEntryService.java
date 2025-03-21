package com.sky.system.prod.order.workentry;

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
public class WorkEntryService extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize  ")
			;
			data.param
				.query("select    a.invc_numb       , a.wkod_dvcd       , a.lott_numb       , a.bzpl_idcd			")
				.query("        , a.pdod_date       , a.acpt_numb       , a.acpt_amnd_degr  , a.prog_stat_dvcd		")
				.query("        , a.acpt_seqn       , a.cstm_idcd       , a.pdsd_numb       , a.pdsd_date			")
				.query("        , a.pref_rank       , a.item_idcd       , a.wkfw_idcd       , a.bomt_degr			")
				.query("        , a.unit_idcd       , a.indn_qntt													")
				.query("        , LEFT(a.strt_dttm, 8) as strt_dttm     , LEFT(a.endd_dttm, 8) as endd_dttm			")
				.query("        , a.indn_qntt_1fst	, a.work_date       , a.stnd_unit       , a.stnd_unit_qntt		")
				.query("        , a.prod_bzpl_idcd  , a.prog_stat_dvcd  , a.remk_text								")
				.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
				.query("        , a.line_ordr       , a.line_stat       , a.line_clos        , a.find_name			")
				.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
				.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
				.query("        , a.crte_idcd       , a.crte_urif													")
				.query("        , JSON_VALUE(a.json_data, '$.pckg_unit' ) as pckg_unit								")
				.query("        , JSON_VALUE(a.json_data, '$.labl_qntt' ) as labl_qntt								")
				.query("        , JSON_VALUE(a.json_data, '$.wker_idcd' ) as wker_idcd								")
				.query("        , JSON_VALUE(a.json_data, '$.usge_attc_yorn' ) as usge_attc_yorn					")
				.query("        , b.work_strt_dttm  , b.work_endd_dttm  , b.insp_wkct_yorn   , p.stok_used_qntt		")
				.query("        , p.plan_strt_dttm  , p.plan_endd_dttm  , p.cvic_idcd								")
				.query("        , c.cstm_name       , i.item_code       , i.item_name        , i.item_spec			")
				.query("        , (select sum(prod_qntt) from work_book w where a.invc_numb = w.wkod_numb) as prod_qntt	")
				.query("        , CASE																				")
				.query("              WHEN z.duplicate_count > 1 THEN 1												")
				.query("              ELSE 0 																		")
				.query("          END AS yorn 																		")
				.query("        , u.user_name as wker_name															")
				.query("        , v.cvic_name as cvic_name															")
				.query("        , w.invc_numb as work_invc															")
				.query("        , am.deli_date																		")
				.query("        , u2.user_name as wigh_wker_name													")
			;
			data.param
				.where("from pror_mast a																			")
				.where("left outer join pror_item p on a.invc_numb = p.invc_numb									")
				.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
				.where("left outer join item_mast i on p.item_idcd = i.item_idcd									")
				.where("left outer join user_mast u on JSON_VALUE(a.json_data, '$.wker_idcd' )= u.user_idcd			")
				.where("left outer join cvic_mast v on p.cvic_idcd = v.cvic_idcd									")
				.where("left outer join work_book w on a.invc_numb = w.wkod_numb									")
				.where("left outer join user_mast u2 on JSON_VALUE(w.json_data, '$.wigh_wker_idcd' )= u2.user_idcd	")
				.where("left outer join acpt_item am on am.invc_numb = a.acpt_numb									")
				.where("left outer join (																			")
				.where("             SELECT acpt_numb, COUNT(*) AS duplicate_count								 	")
				.where("             FROM prod_plan_acpt															")
				.where("             group by acpt_numb																")
				.where("      ) z ON a.acpt_numb = z.acpt_numb														")
				.where("    , (select invc_numb , min(work_strt_dttm) as work_strt_dttm								")
				.where("            , max(work_endd_dttm) as work_endd_dttm											")
				.where("            , max(insp_wkct_yorn) as insp_wkct_yorn											")
				.where("       from pror_item																		")
				.where("       group by invc_numb																	")
				.where("      ) b																					")
				.where("where   1=1																					")
				.where("and     a.invc_numb = b.invc_numb															")
				.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"))
				.where("and     a.pdod_date >= :pdod_date1     " , arg.getParamText("fr_dt" ))
				.where("and     a.pdod_date <= :pdod_date2     " , arg.getParamText("to_dt" ))
				.where("and     substring(b.work_strt_dttm,1,8) >= :work_strt_dttm1   " , arg.getParamText("work_strt_dttm1" ))
				.where("and     substring(b.work_strt_dttm,1,8) <= :work_strt_dttm2   " , arg.getParamText("work_strt_dttm2" ))
				.where("and     substring(b.work_endd_dttm,1,8) >= :work_endd_dttm1   " , arg.getParamText("work_endd_dttm1" ))
				.where("and     substring(b.work_endd_dttm,1,8) <= :work_endd_dttm2   " , arg.getParamText("work_endd_dttm2" ))
				.where("and     a.line_stat   = :line_stat     " , arg.getParamText("line_stat"  ))
				.where("and     a.item_idcd   = :item_idcd     " , arg.getParamText("item_idcd"  ))
				.where("and     a.cstm_idcd   = :cstm_idcd     " , arg.getParamText("cstm_idcd"  ))
				.where("and     a.invc_numb like %:invc_numb%  " , arg.getParamText("invc_numb"  ))
				.where("and     a.lott_numb like %:lott_numb%  " , arg.getParamText("lott_numb"  ))
				.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("group by a.invc_numb																	")
				.where("order by a.invc_numb desc																")
			;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1), sort );
			}
		}else{
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize  ")
			;
			data.param
				.query("select *																								")
			;
			data.param
				.query("from (																					")
				.query("select																					")
				.query("      a.invc_numb        , a.invc_date        , a.bzpl_idcd        , a.pdsd_numb		")
				.query("    , a.wkod_numb        , a.wkod_seqn        , a.indn_qntt        , a.prod_qntt		")
				.query("    , a.good_qntt        , a.poor_qntt        , a.work_strt_dttm   , a.work_endd_dttm	")
				.query("    , a.need_time        , a.work_mnhr        , a.wker_idcd        , a.work_pcnt		")
				.query("    , a.lott_numb        , a.rewd_objt_qntt   , a.work_cond_1fst   , a.work_cond_2snd	")
				.query("    , a.work_cond_3trd   , a.work_cond_5fit   , a.work_cond_6six						")
				.query("    , a.stun_prod_qntt   , a.stun_good_qntt   , a.stun_poor_qntt   , a.work_dvcd		")
				.query("    , a.wkct_insp_yorn   , a.last_wkct_yorn   , a.work_para        , a.mtrl_ivst_yorn	")
				.query("    , a.prod_dept_idcd   , b.pdod_date        , b.bomt_degr        , b.pdsd_date		")
				.query("    , c.cstm_name        , d.item_name        , d.item_spec        , e.deli_date		")
				.query("    , f.wkfw_name        , a.user_memo        , a.sysm_memo        , a.prnt_idcd		")
				.query("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
				.query("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
				.query("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
				.query("    , a.crte_urif        , d.modl_name        , b.work_date        , d.item_code		")
				.query("    , b.prog_stat_dvcd   , a.mold_idcd        , m.mold_code								")
				.query("    , m1.base_name as mtrl_name															")
			;
			data.param
				.query("from    work_book a																		")
				.query("        left outer join pror_mast b on a.wkod_numb  = b.invc_numb						")
				.query("        left outer join pror_item b2 on a.wkod_numb = b2.invc_numb and a.wkod_seqn = b2.line_seqn	")
				.query("        left outer join cstm_mast c on b.cstm_idcd  = c.cstm_idcd						")
				.query("        left outer join item_mast d on a.item_idcd  = d.item_idcd						")
				.query("        left outer join acpt_mast e on a.invc_numb  = e.invc_numb						")
				.query("        left outer join wkfw_clss f on b.wkfw_idcd  = f.wkfw_idcd						")
				.query("        left outer join mold_mast m on a.mold_idcd  = m.mold_idcd						")
				.query("        left outer join base_mast m1 on m.mtrl_bacd = m1.base_idcd						")
				.query("where   1=1																				")
				.query("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"						))
				.query("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"					))
				.query("and     b.pdod_date >= :fr_dt " , arg.getParamText("fr_dt" 								))
				.query("and     b.pdod_date <= :to_dt " , arg.getParamText("to_dt" 								))
				.query("and     e.deli_date >= :fr_dt2" , arg.getParamText("fr_dt2" 							))
				.query("and     e.deli_date <= :to_dt2" , arg.getParamText("to_dt2" 							))
				.query("and     d.item_idcd   = :item_idcd   " , arg.getParamText("item_idcd" 					))
				.query("and     a.lott_numb like %:lott_numb% " , arg.getParamText("lott_numb"					))
				.query("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
				.query("order by a.invc_numb ) a																	")
			;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1), sort );
			}
		}
	}

	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select																					")
			.query("      a.invc_numb        , a.line_seqn        , a.item_idcd        , a.unit_idcd		")
			.query("    , a.need_qntt        , a.ivst_qntt        , a.stnd_unit_qntt   , a.lott_numb		")
			.query("    , a.remk_text        , a.lott_mngt_yorn   , b.item_name        , b.item_spec		")
			.query("    , b.item_code        , @curRank := @curRank + 1 AS rank							")


			.query("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd								")
			.query("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.query("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.query("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.query("    , a.crte_urif																		")
		;
		data.param
			.where("from work_book_mtrl a																	")
			.where("        left outer join item_mast b on a.item_idcd = b.item_idcd						")
			.where("        ,(SELECT @curRank := 0) r														")
			.where("where   1=1																				")
			.where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"						))
			.where("and     a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select																					")
			.query("      a.wkct_insp_dvcd   , a.invc_numb        , a.line_seqn        , a.insp_date		")
			.query("    , a.cstm_idcd        , a.item_idcd        , a.wkct_idcd        , a.wkct_item_idcd	")
			.query("    , a.acpt_numb        , a.acpt_seqn        , a.pdsd_numb        , a.wkod_numb		")
			.query("    , a.lott_numb        , a.sral_strt_numb   , a.dlvy_idcd        , a.dlvy_seqn		")
			.query("    , a.cnfm_dept_idcd   , a.cnfm_drtr_idcd   , a.insp_mthd_dvcd   , a.indn_qntt		")
			.query("    , a.prod_qntt        , a.insp_qntt        , a.good_qntt								")
			.query("    , a.poor_qntt        , a.pass_qntt        , a.poor_caus_bacd   , a.poor_type_bacd	")
			.query("    , (select base_name from base_mast r where a.poor_type_bacd = r.base_code			")
			.query("                                         and   r.prnt_idcd = '6000') as poor_type_name	")
			.query("    , (select base_name from base_mast r where a.poor_caus_bacd = r.base_code			")
			.query("                                         and   r.prnt_idcd = '6001') as poor_caus_name	")
			.query("    , a.insp_scre_numb   , a.smpl_numb        , a.istt_yorn        , a.disp_seqn		")
			.query("    , b.wkct_code        , b.wkct_name        , a.uper_seqn        , a.insp_cvic_idcd	")
			.query("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd	       , a.crte_urif		")
			.query("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.query("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.query("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.query("    , c.user_name        , a.judt_dvcd        , a.smli_dvcd        , a.insp_date		")
			.query("    , a.insp_strt_time   , a.insp_endd_time   , d.cvic_name								")
			.query("    ,@curRank := @curRank + 1 AS rank													")
			.query("    , a.msmt_valu_1fst   , a.msmt_valu_2snd   , a.msmt_valu_3trd   , a.msmt_valu_4frt	")
			.query("    , a.msmt_valu_5fit   , a.msmt_valu_6six   , a.msmt_valu_7svn   , a.msmt_valu_8egh	")
			.query("    , a.msmt_valu_9nin   , a.msmt_valu_10												")
		;
		data.param
			.where("from wkct_insp a																		")
			.where("        left outer join wkct_mast b on a.wkct_idcd = b.wkct_idcd						")
			.where("        left outer join user_mast c on a.cnfm_drtr_idcd = c.user_idcd					")
			.where("        left outer join cvic_mast d on a.insp_cvic_idcd = d.cvic_idcd					")
			.where("        ,(SELECT @curRank := 0) r														")
			.where("where   1=1																				")
			.where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"						))
			.where("and     a.line_stat   < :line_stat      " , "2"											 )
			.where("order by a.line_seqn																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getList3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select																					")
			.query("      a.invc_numb        , a.line_seqn        , a.invc_date        , a.loss_resn_dvcd	")
			.query("    , a.loss_time        , a.loss_pcnt        , a.loss_mnhr        , a.work_dsct_yorn	")
			.query("    , a.remk_text        , a.uper_seqn        , a.disp_seqn        , b.wkct_idcd		")
			.query("    , a.sttm             , a.edtm             ,@curRank := @curRank + 1 AS rank			")
			.query("    , c.wkct_code        , c.wkct_name        , d.work_sttm        , d.work_edtm		")
			.query("    , d.work_pcnt        , d.need_time        , d.drtr_idcd        , e.user_name		")
			.query("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.crte_urif		")
			.query("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.query("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.query("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
		;
		data.param
			.where("from    work_book_loss a 																")
			.where("        left outer join pror_item b      on a.invc_numb = b.invc_numb 					")
			.where("                                         and a.line_seqn = b.line_seqn 					")
			.where("        left outer join wkct_mast c      on b.wkct_idcd = c.wkct_idcd					")
			.where("        left outer join work_book_mans d on a.invc_numb = d.invc_numb					")
			.where("                                         and a.line_seqn = d.line_seqn					")
			.where("        left outer join user_mast e on d.drtr_idcd = e.user_idcd						")
			.where("        ,(SELECT @curRank := 0) r														")
			.where("where   1=1																				")
			.where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"						))
			.where("and     a.line_stat   < :line_stat      " , "2											")
			.where("order by a.line_seqn																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getList4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select																					")
			.query("      a.invc_numb        , a.line_seqn        , a.cvic_idcd        , a.wker_idcd		")
			.query("    , a.prep_time        , a.strt_dttm        , a.mold_yorn        , a.mold_idcd		")
			.query("    , a.mold_htct        , a.cavity           , a.updt_shot        , a.goal_time		")
			.query("    , a.qult_halt_time   , a.cvic_halt_time   , a.mtrl_halt_time   , a.etcc_halt_time	")
			.query("    , a.remk_text        , a.pcmt             , a.cvic_stat_dvcd   , a.uper_seqn		")
			.query("    , a.disp_seqn        , b.cvic_name        , b.cvic_code        , c.mold_name 		")
			.query("    , c.mold_code        ,@curRank := @curRank + 1 AS rank         , a.endd_dttm		")
		;
		data.param
			.where("from    work_book_cvic a																")
			.where("        left outer join cvic_mast b on a.cvic_idcd = b.cvic_idcd						")
			.where("        left outer join mold_mast c on a.mold_idcd = c.mold_idcd						")
			.where("        ,(SELECT @curRank := 0) r														")
			.where("where   1=1																				")
			.where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"						))
			.where("order by a.line_seqn																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getlookup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select																					")
			.query("      a.lott_numb        , a.line_seqn        , a.bzpl_idcd        , a.isos_dvcd		")
			.query("    , a.invc_date        , a.invc_numb        , a.invc_seqn        , a.wrhs_idcd		")
			.query("    , a.item_idcd        , (IfNULL(a.qntt,0)*IfNULL(a.isos_dvcd,0)) as qntt 			")
			.query("    , a.disp_seqn        , a.stok_symb       , a.uper_seqn        , b.item_name			")
		;
		data.param
			.where("from    lot_isos_book a																	")
			.where("        left outer join item_mast b on a.item_idcd = b.item_idcd						")
			.where("where   1=1																				")
			.where("and     a.item_idcd = :item_idcd" , arg.getParameter("item_idcd"						))
			.where("and     (IfNULL(a.qntt,0)*IfNULL(a.isos_dvcd,0)) > 0									")
			.where("order by a.lott_numb,a.line_seqn														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row : map) {
			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, row.fixParameter("invc_numb"))

				.update("lott_numb"			, row.getParameter("lott_numb"))
				.update("work_sttm"			, row.getParameter("work_sttm"))
				.update("work_edtm"			, row.getParameter("work_edtm"))
				.update("work_pcnt"			, row.getParameter("work_pcnt"))
				.update("prod_qntt"			, row.getParameter("prod_qntt"))
				.update("good_qntt"			, row.getParameter("good_qntt"))
				.update("poor_qntt"			, row.getParameter("poor_qntt"))
				.update("invc_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
				.update("need_time"			, row.getParameter("need_time"))
				.update("work_mnhr"			, row.getParameter("work_mnhr"))
				.update("wker_idcd"			, row.getParameter("wker_idcd"))


				.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
				.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
				.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
				.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
				.update("find_name"			, row.getParamText("invc_date").trim() + row.getParamText("ostt_wrhs_idcd").trim() + row.getParamText("cstm_idcd").trim() + row.getParamText("remk_text").trim())
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
				.table("pror_mast")
				.where("where invc_numb = :invc_numb1								")

				.unique("invc_numb1"			, row.fixParameter("invc_numb"))


				.update("work_date"			, row.getParameter("work_date"))

			;
			data.attach(Action.update);
			data.execute();
			data.clear();

		}
		data.execute();
		return null;
	}
	public SqlResultMap setlist1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("work_book_mtrl")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);
			} else {
				data.param
					.table("work_book_mtrl")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("item_idcd"			, row.getParameter("item_idcd"		))
					.update("ivst_qntt"			, row.getParameter("ivst_qntt"		))
					.update("lott_numb"			, row.getParameter("lott_numb"		))

				;data.attach(rowaction);
			}
		}

		data.execute();
		return null ;
	}

	public SqlResultMap setlist2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wkct_insp")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("wkct_insp")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("insp_dvcd"				, row.getParameter("insp_dvcd"))
					.update("insp_date"				, row.getParameter("insp_date"))
					.update("insp_strt_time"		, row.getParameter("insp_strt_time"))
					.update("insp_endd_time"		, row.getParameter("insp_endd_time"))
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"))
					.update("item_idcd"				, row.getParameter("item_idcd"))
					.update("wkct_idcd"				, row.getParameter("wkct_idcd"))
					.update("wkct_item_idcd"		, row.getParameter("wkct_item_idcd"))
					.update("acpt_numb"				, row.getParameter("acpt_numb"))
					.update("acpt_seqn"				, row.getParameter("acpt_seqn"))
					.update("pdsd_numb"				, row.getParameter("pdsd_numb"))
					.update("wkod_numb"				, row.getParameter("wkod_numb"))
					.update("lott_numb"				, row.getParameter("lott_numb"))
					.update("sral_strt_numb"		, row.getParameter("sral_strt_numb"))
					.update("dlvy_idcd"				, row.getParameter("dlvy_idcd"))
					.update("dlvy_seqn"				, row.getParameter("dlvy_seqn"))
					.update("cnfm_dept_idcd"		, row.getParameter("cnfm_dept_idcd"))
					.update("cnfm_drtr_idcd"		, row.getParameter("cnfm_drtr_idcd"))
					.update("insp_type_idcd"		, row.getParameter("insp_type_idcd"))
					.update("insp_sbsc_seqn"		, row.getParameter("insp_sbsc_seqn"))
					.update("smli_dvcd"				, row.getParameter("smli_dvcd"))
					.update("insp_cvic_idcd"		, row.getParameter("insp_cvic_idcd"))
					.update("insp_cond"				, row.getParameter("insp_cond"))
					.update("insp_mthd_dvcd"		, row.getParameter("insp_mthd_dvcd"))
					.update("indn_qntt"				, row.getParameter("indn_qntt"))
					.update("prod_qntt"				, row.getParameter("prod_qntt"))
					.update("msmt_valu"				, row.getParameter("msmt_valu"))
					.update("insp_qntt"				, row.getParameter("insp_qntt"))
					.update("good_qntt"				, row.getParameter("good_qntt"))
					.update("poor_qntt"				, row.getParameter("poor_qntt"))
					.update("pass_qntt"				, row.getParameter("pass_qntt"))
					.update("poor_caus_bacd"		, row.getParameter("poor_caus_bacd"))
					.update("poor_type_bacd"		, row.getParameter("poor_type_bacd"))
					.update("judt_dvcd"				, row.getParameter("judt_dvcd"))
					.update("insp_scre_numb"		, row.getParameter("insp_scre_numb"))
					.update("smpl_numb"				, row.getParameter("smpl_numb"))
					.update("istt_yorn"				, row.getParameter("istt_yorn"))

					.update("uper_seqn"				, row.getParameter("uper_seqn"))
					.update("disp_seqn"				, row.getParameter("disp_seqn"))


					.update("find_name"				, row.getParameter("mold_code")
							+ " "
							+ row.getParameter("mold_name"))

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
	public SqlResultMap setlist3(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("work_book_loss")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);
				data.execute();
				data.clear();
					data.param
					.table("pror_item")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);
				data.execute();
				data.clear();
				data.param
					.table("work_book_mans")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);
				data.execute();
			} else {
				data.param
					.table("work_book_loss")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("invc_date"			, row.getParameter("invc_date"))
					.update("loss_resn_dvcd"	, row.getParameter("loss_resn_dvcd"))
					.update("sttm"				, row.getParameter("sttm"))
					.update("edtm"				, row.getParameter("edtm"))
					.update("loss_time"			, row.getParameter("loss_time"))
					.update("loss_pcnt"			, row.getParameter("loss_pcnt"))
					.update("loss_mnhr"			, row.getParameter("loss_mnhr"))
					.update("work_dsct_yorn"	, row.getParameter("work_dsct_yorn"))
					.update("remk_text"			, row.getParameter("remk_text"))


					.update("find_name"				, row.getParameter("mold_code")
													+ " "
													+ row.getParameter("mold_name"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
				data.execute();
				data.clear();
				data.param
					.table("work_book_mans")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
				;data.attach(rowaction);
				data.execute();
				data.clear();
				data.param
					.table("pror_item")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("wkct_idcd"			, row.getParameter("wkct_idcd"))

				;data.attach(rowaction);
				data.execute();
			}
		}

		return null ;
	}
	public SqlResultMap setlist4(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("work_book_cvic")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("work_book_cvic")
					.where("where invc_numb  = :invc_numb")
					.where("and line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("cvic_idcd"				, row.getParameter("cvic_idcd"))
					.update("prep_time"				, row.getParameter("prep_time"))
					.update("work_time"				, row.getParameter("work_time"))
					.update("cvic_stat_dvcd"		, row.getParameter("cvic_stat_dvcd"))
					.update("mold_yorn"				, row.getParameter("mold_yorn"))
					.update("mold_idcd"				, row.getParameter("mold_idcd"))
					.update("mold_htct"				, row.getParameter("mold_htct"))
					.update("updt_shot"				, row.getParameter("updt_shot"))
					.update("cavity"				, row.getParameter("cavity"))
					.update("qult_halt_time"		, row.getParameter("qult_halt_time"))
					.update("cvic_halt_time"		, row.getParameter("cvic_halt_time"))
					.update("mtrl_halt_time"		, row.getParameter("mtrl_halt_time"))
					.update("etcc_halt_time"		, row.getParameter("etcc_halt_time"))
					.update("remk_text"				, row.getParameter("remk_text"))

					.update("find_name"				, row.getParameter("mold_code")
													+ " "
													+ row.getParameter("mold_name"))

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
	public SqlResultMap getProd(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.query("call prod_sum( :invc_numb		",arg.getParameter("invc_numb"))
			.query(", :work_date)					",arg.getParameter("work_date"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getDaily(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb       , a.invc_date       , a.cvic_idcd   , a.mold_idcd				")
			.query("		, a.item_idcd       , a.dayn_dvcd       , a.poor_qntt   , a.wkct_idcd				")
			.query("		, a.theo_qntt       , b.invc_qntt       , b.invc_pric								")
			.query("		, date_format(ifnull(a.work_strt_dttm,0), '%Y-%m-%d %H:%i') as work_strt_dttm		")
			.query("		, date_format(ifnull(a.work_endd_dttm,0), '%Y-%m-%d %H:%i') as work_endd_dttm		")
			.query("		, a.ostt_qntt       , a.stok_qntt       , a.succ_qntt   , p.indn_qntt				")
			.query("		, a.prod_qntt       , b.invc_amnt													")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       , i.item_name   , i.item_spec				")
			.query("		, i.item_code       , c.cvic_name       , m.cavity      , m.cycl_time				")
			.query("		, w.wkct_name       , bz.bzpl_name	    , dp.dept_name	, a.lott_numb				")
			.query("		, cs.cstm_name      , wf.wkfw_name      , m.mold_name								")
			.query("		, a.prog_stat_dvcd  , a.work_para       , a.last_wkct_yorn, a.wkct_insp_yorn		")
			.query("		, a.work_dvcd       , a.stun_prod_qntt  , a.stun_good_qntt, a.stun_poor_qntt		")
			.query("		, a.wker_idcd       , us.user_name as wker_name										")
			.query("		, a.rewd_objt_qntt  , a.mtrl_ivst_yorn  , a.wkod_numb   , a.wkod_seqn				")
			.query("		, a.work_cond_1fst  , a.work_cond_2snd  , a.work_cond_3trd							")
			.query("		, a.work_cond_5fit  , a.work_cond_6six  , a.work_cond_7svn							")
			.query("		, case ifnull(a.theo_qntt,0) when 0 then null else ifnull(a.good_qntt,0) / ifnull(a.theo_qntt,0) * 100 end as good_prgs	")
			.query("		, (case 																			")
			.query("		   when time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%k시간') = 0		")
			.query("		   then  (case when time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%i') <= 0 then '0분'")
			.query("		               else time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%i분') end)	")
			.query("		   else TIME_FORMAT(timediff(a.work_endd_dttm,a.work_strt_dttm), '%k시간 %i분')		")
			.query("		   end ) as need_time																")
			.query("		, ( ifnull(a.prod_qntt,0)- ifnull(z.poor_qntt,0))as good_qntt						")
		;
		data.param //퀴리문
			.where("from work_book a																			")
			.where("left outer join bzpl_mast bz on a.bzpl_idcd = bz.bzpl_idcd									")
			.where("left outer join pror_mast p on a.wkod_numb = p.invc_numb									")
			.where("left outer join acpt_item b on p.acpt_numb = b.invc_numb and p.acpt_seqn = b.line_seqn		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join dept_mast dp on a.prod_dept_idcd = dp.dept_idcd								")
			.where("left outer join cstm_mast cs on a.cstm_idcd = cs.cstm_idcd									")
			.where("left outer join wkfw_clss wf on a.wkfw_idcd = wf.wkfw_idcd									")
			.where("left outer join user_mast us on a.wker_idcd = us.user_idcd									")
			.where("left outer join (select invc_numb, sum(poor_qntt) as poor_qntt								")
			.where("                 from work_book_qc															")
			.where("                 group by invc_numb )as  z on z.invc_numb = a.invc_numb						")
			.where("where 1=1																					")
			.where("and     a.prog_stat_dvcd > '1'																")
			.where("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.dayn_dvcd   = :dayn_dvcd    " , arg.getParamText("dayn_dvcd" ) , !"".equals(arg.getParamText("dayn_dvcd")))
			.where("and     a.item_idcd  = :item_idcd"      , arg.getParameter("item_idcd"))
			.where("and     a.cvic_idcd  = :cvic_idcd"      , arg.getParameter("cvic_idcd"))
			.where("and     a.wkct_idcd  = :wkct_idcd"      , arg.getParameter("wkct_idcd"))
			.where("and     a.lott_numb	like %:lott_numb% " , arg.getParamText("lott_numb"))
			.where("and     a.line_stat  > :line_stat"      , arg.getParameter("line_stat"))
			.where("order by a.invc_date desc, a.invc_numb desc")
			;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getIvstMtrl(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("SELECT count(1) as maxsize  " )
		;
		data.param
			.query("SELECT   a.lott_numb   , a.ostt_qntt   , i.item_name	   , i.item_code				")
			.query("       , bm.mixx_rate  , a.line_seqn													")
		;
		data.param
			.where("  FROM mtrl_ostt_item a																	")
			.where("  LEFT OUTER JOIN item_mast i  ON a.item_idcd = i.item_idcd								")
			.where("  LEFT OUTER JOIN bom_mast bm  ON a.item_idcd = bm.ivst_item_idcd						")
			.where(" WHERE 1=1																				")
			.where("   AND a.line_stat = '0'																")
			.where("   AND a.wkod_numb       = :invc_numb	", arg.getParameter("invc_numb"					))
			.where("   AND bm.prnt_item_idcd = :item_idcd	", arg.getParameter("item_idcd"					))
			.where(" group by a.lott_numb																	")
			.where(" order by a.line_seqn																	")
		;
		return data.selectForMap();
	}
}
