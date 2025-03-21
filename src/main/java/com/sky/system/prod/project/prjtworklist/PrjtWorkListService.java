package com.sky.system.prod.project.prjtworklist;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class PrjtWorkListService extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;


	public SqlResultMap getSearch1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																				")
		;
		data.param
			.query("from (																					")
			.query("select    a.pjod_idcd     , a.wkct_idcd      , a.invc_date      , a.line_seqn			")
			.query("        , a.idcd          , a.work_ordr_dvcd , a.ordr_degr      , a.name				")
			.query("        , a.progress      , a.wker_idcd_1fst , a.wker_idcd_2snd , a.wker_idcd_3trd		")
			.query("        , a.item_idcd     , a.cvic_idcd      , a.work_cont      , a.indn_qntt			")
			.query("        , a.prod_qntt     , a.good_qntt      , a.poor_qntt      , a.work_sttm			")
			.query("        , a.work_edtm     , a.need_time      , a.work_mnhr      , a.work_pcnt			")
			.query("        , a.work_cond_1fst, a.work_cond_2snd , a.work_cond_5fit , a.work_cond_6six		")
			.query("        , a.work_cond_7svn, a.work_dvcd      , a.wkct_insp_yorn , a.last_wkct_yorn		")
			.query("        , a.work_para     , a.mtrl_ivst_yorn , a.prog_stat_dvcd							")
			.query("        , w.wkct_code     , w.wkct_name      , c.cvic_code      , c.cvic_name			")
			.query("        , u1.user_name as wker_1fst_name     , u2.user_name as wker_2snd_name			")
			.query("        , u3.user_name as wker_3trd_name												")
			.query("        , a.user_memo      , a.sysm_memo     , a.prnt_idcd      , a.crte_urif 			")
			.query("        , a.line_stat      , a.line_clos     , a.find_name      , a.updt_user_name		")
			.query("        , a.updt_ipad      , a.updt_dttm     , a.updt_idcd      , a.updt_urif			")
			.query("        , a.crte_user_name , a.crte_ipad     , a.crte_dttm      , a.crte_idcd			")
		;
		data.param //퀴리문
			.query("from pjod_work_book a																	")
			.query("left outer join wkct_mast      w  on a.wkct_idcd      = w.wkct_idcd						")
			.query("left outer join cvic_mast      c  on a.cvic_idcd      = c.cvic_idcd						")
			.query("left outer join user_mast      u1 on a.wker_idcd_1fst = u1.user_idcd					")
			.query("left outer join user_mast      u2 on a.wker_idcd_2snd = u2.user_idcd					")
			.query("left outer join user_mast      u3 on a.wker_idcd_3trd = u3.user_idcd					")
			.query("where    1=1																			")
			.query("and      a.find_name like %:find_name% " , arg.getParameter("find_name"))
			.query("and      a.pjod_idcd = :pjod_idcd      " , arg.getParameter("pjod_idcd"))
			.query("and      a.line_stat	< :line_stat      " , "2" , "".equals(arg.getParamText("line_stat")))
			.query("order by a.pjod_idcd ) a																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.line_seqn      , a.item_idcd		")
			.query("		, a.unit_idcd       , a.cstm_idcd       , a.make_cmpy_name , a.offr_qntt		")
			.query("		, a.offr_pric       , a.vatx_incl_yorn  , a.vatx_rate      , a.offr_amnt		")
			.query("		, a.offr_vatx       , a.ttsm_amnt       , a.deli_reqt_date , a.deli_date		")
			.query("		, a.pric_dvcd       , a.fund_dvcd       , a.dlvy_date      , a.dlvy_time		")
			.query("		, a.send_deli_date  , a.dlvy_wrhs_idcd  , a.krwn_pric      , a.krwn_amnt		")
			.query("		, a.krwn_vatx       , a.krwn_amnt_totl  , a.insd_remk_text , a.otsd_remk_text	")
			.query("		, a.stnd_unit       , a.orig_invc_numb  , a.orig_amnd_degr , a.orig_amnd_degr	")
			.query("		, a.orig_seqn																	")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos      , a.find_name		")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
			.query("		, a.crte_idcd       , a.crte_urif												")
			.query("		, i.item_code       , i.item_name       , i.item_spec      , i.unit_idcd		")
			.query("		, u.unit_name																	")
		;
		data.param
			.where("from   purc_ordr_item a																	")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("       left outer join unit_mast u on i.unit_idcd = u.unit_code							")
			.where("where  1=1																				")
			.where("and    a.prnt_idcd = :pjod_idcd      " , arg.getParameter("pjod_idcd"))
			.where("and    a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.line_seqn																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getCstm(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.query("select    a.cstm_idcd          ,a.cstm_code          ,a.cstm_dvcd          ,a.rtil_stru_dvcd	")
		.query("         ,a.cstm_name          ,a.cstm_stnm_1fst     ,a.cstm_stnm_2snd     ,a.engl_name			")
		.query("         ,a.engl_stnm          ,a.engl_stnm_1fst     ,a.engl_stnm_2snd     ,a.mngt_bzpl_idcd	")
		.query("         ,a.home_page_addr     ,a.cstm_dsgn_trnt     ,a.corp_dvcd          ,a.buss_name			")
		.query("         ,a.buss_numb          ,a.buss_type          ,a.buss_kind          ,a.corp_numb			")
		.query("         ,a.boss_name          ,a.tele_numb          ,a.tele_numb_2snd     ,a.faxi_numb			")
		.query("         ,a.hdph_numb          ,a.spec_buss_numb     ,a.mail_addr								")
		.query("         ,a.ccrd_puch_yorn     ,a.etbl_rpub_yorn     ,a.sale_cstm_yorn     ,a.expt_cstm_yorn	")
		.query("         ,a.incm_cstm_yorn     ,a.otod_cstm_yorn     ,a.etcc_cstm_yorn     ,a.rpst_cstm_idcd	")
		.query("         ,a.blto_idcd_1fst     ,a.blto_idcd_2snd     ,a.scrt_sett_dvcd     ,a.scrt_sett_amnt	")
		.query("         ,a.scrt_offr_aman     ,a.scrt_mltl          ,a.crdt_bacd          ,a.crdt_lmit_amnt	")
		.query("         ,a.cnio_dvcd          ,a.sale_drtr_idcd     ,a.sale_dept_idcd     ,a.insp_kind_dvcd	")
		.query("         ,a.user_memo          ,a.sysm_memo          ,a.prnt_idcd          ,a.line_levl			")
		.query("         ,a.line_ordr          ,a.line_stat          ,a.line_clos          ,a.find_name			")
		.query("         ,a.updt_user_name     ,a.updt_ipad          ,a.updt_dttm          ,a.updt_idcd			")
		.query("         ,a.updt_urif          ,a.crte_user_name     ,a.crte_ipad          ,a.crte_dttm			")
		.query("         ,a.crte_idcd          ,a.crte_urif          ,a.puch_cstm_yorn     ,b.post_code			")
		.query("         ,b.addr_1fst          ,b.addr_2snd														")
		;
		data.param //퀴리문
			.where("from        cstm_mast  a													")
			.where("            left outer join cstm_addr b on a.cstm_idcd = b.cstm_idcd		")
			.where("where       1=1																")
			.where("and         a.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}
}
