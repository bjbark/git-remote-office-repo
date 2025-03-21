package com.sky.system.custom.hantop.cam;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class CamService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/* 가공정보 가져오기 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows ) throws Exception {
		String hq = arg.getParamText("hqof_idcd");
		DataMessage data = new DataMessage(hq+".POS");

		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select a.*																						")
		;
		data.param //퀴리문
			.where("from (																							")
			.where("select  a.brnd_bacd           , a.item_idcd           , a.item_code        , a.cstm_item_code	")
			.where("      , a.item_name           , a.proc_item_name												")
			.where("      , a.item_widh           , a.item_hght														")
			.where("      , a.item_dpth           , a.open_widh           , a.dbwd_yorn        , a.cmbf_yorn		")
			.where("      , a.brcd_hght           , a.brcd_plac           , a.assa_yorn								")
			.where("      , a.hdho_type_dvcd      , a.hdho_1pcs_hght      , a.hdho_2pcs_hght						")
			.where("      , a.hdho_hght_grip_1fst , a.hdho_hght_grip_2snd											")
			.where("      , a.hdho_qntt           , a.hdho_itvl           , a.hdho_pass_yorn						")
			.where("      , a.lkho_incl_yorn																		")
			.where("      , a.lkho_1pcs_widh      , a.lkho_1pcs_leng      , a.lkho_2pcs_widh   , a.lkho_2pcs_leng	")
			.where("      , a.lkho_plac_cpsn      , a.lkho_grip_leng_1fst											")
			.where("      , a.rnpc_widh_1fst      , a.rnpc_widh_2snd												")
			.where("      , a.omhd_widh           , a.omhd_leng           , a.omhd_hght								")
			.where("      , a.rlho_incl_yorn      , a.rolr_name           , a.midl_rolr_name   , a.rlho_strt_plac	")
			.where("      , a.rlho_1pcs_widh      , a.rlho_1pcs_leng												")
			.where("      , a.rlho_2pcs_widh      , a.rlho_2pcs_leng												")
			.where("      , a.rlho_3pcs_widh      , a.rlho_3pcs_leng												")
			.where("      , a.midl_rolr_leng																		")
			.where("      , a.rein_spps_cncs_yorn , a.rein_plac_1fst      , a.rein_plac_2snd						")
			.where("      , a.rein_plac_3trd      , a.wthl_yorn           , a.rail_zero_yorn						")
			.where("      , a.rail_1fst_yorn      , a.rail_2snd_yorn      , a.rail_midl_yorn						")
			.where("      , a.rail_3trd_yorn      , a.rail_4frt_yorn												")
			.where("      , a.scrn_wthl_yorn																		")
			.where("      , a.akho_widh_1fst      , a.akho_widh_2snd      , a.bsmt_leng								")
			.where("from    wind_pfil_cam a																			")
			.where("where   1=1																						")
			.where("and     a.brnd_bacd  = :brnd_bacd	"		, arg.getParameter("brnd_bacd"						))
			.where("and     a.item_idcd  = :item_idcd	"		, arg.getParameter("item_idcd"						))
			.where("and     a.find_name  like %:find_name%	"	, arg.getParameter("find_name"						))
			.where("and     a.line_stat	< :line_stat			", "2" , "".equals(arg.getParamText("line_stat"	)))
			.where(") a																								")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/* 가공정보 가져오기 */
	public SqlResultMap getBrand(HttpRequestArgument arg , int page, int rows ) throws Exception {
		String hq = arg.getParamText("hqof_idcd");
		DataMessage data = new DataMessage(hq+".POS");

		data.param // 집계문
			.total("select count(1) as maxsize															")
		;
		data.param
			.query("select a.*																			")
		;
		data.param //퀴리문
			.where("from (																				")
			.where("select  a.base_idcd      , a.hqof_idcd  , a.base_code  , a.base_name				")
			.where("      , a.base_engl_name , a.code_leng												")
			.where("      , a.user_memo      , a.sysm_memo												")
			.where("      , a.prnt_idcd      , a.line_levl  , a.line_ordr  , a.line_stat				")
			.where("      , a.line_clos      , a.find_name												")
			.where("      , a.updt_user_name , a.updt_ipad  , a.updt_dttm  , a.updt_idcd  , a.updt_urif	")
			.where("      , a.crte_user_name , a.crte_ipad  , a.crte_dttm  , a.crte_idcd  , a.crte_urif	")
			.where("from    base_mast a																	")
			.where("where   1=1																			")
			.where("and     a.prnt_idcd  = '4000'														")
			.where("and     a.find_name  like %:find_name%	"	, arg.getParameter("find_name"			))
			.where("and     a.line_stat	< :line_stat		", "2" , "".equals(arg.getParamText("line_stat"	)))
			.where(") a																					")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}
	/* 작업오더 가져오기 */
	public SqlResultMap getOrderSearch(HttpRequestArgument arg ) throws Exception {
		String hq = arg.getParamText("hqof_idcd");
		DataMessage data = new DataMessage(hq+".POS");
		String brcd = arg.getParamText("brcd");
		data.param // 집계문
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select a.*																							")
		;
		data.param //퀴리문
			.where("from (																								")
			.where("select  a.invc_numb           , a.line_seqn           , a.assi_seqn            , a.auto_yorn           , a.plan_strt_dttm		")
			.where("      , a.plan_endd_dttm      , a.acpt_numb           , a.acpt_amnd_degr       , a.acpt_seqn           , a.cvic_idcd			")
			.where("      , a.ispl_name           , a.brnd_bacd           , a.item_idcd            , a.item_name           , a.item_spec			")
			.where("      , a.dbwd_yorn           , a.cmbf_yorn           , a.asmb_plac_dvcd       , a.bfsf_dvcd           , a.tblr					")
			.where("      , a.ivst_item_idcd      , a.mtrl_grcd           , a.stnd_abar_leng       , a.ivst_ordr           , a.cutt_ordr			")
			.where("      , a.cutt_leng           , a.sync_cutt_qntt      , a.ctbr_aset_qntt       , a.pnbr_yorn           , a.item_widh			")
			.where("      , a.item_hght           , a.item_leng           , a.ydge_used_yorn       , a.wdbf_cncs_type      , a.film_dctn_proc		")
			.where("      , a.hndl_incl_yorn      , a.hndl_hght           , a.hdho_type_dvcd       , a.hdho_1pcs_hght      , a.hdho_2pcs_hght		")
			.where("      , a.hdho_hght_grip_1fst , a.hdho_hght_grip_2snd , a.hdho_qntt            , a.hdho_itvl           , a.hdho_pass_yorn		")
			.where("      , a.lkho_incl_yorn      , a.lkho                , a.lkho_1pcs_widh       , a.lkho_1pcs_leng      , a.lkho_2pcs_widh		")
			.where("      , a.lkho_2pcs_leng      , a.lkho_plac_cpsn      , a.lkho_grip_leng_1fst  , a.rnpc_incl_yorn      , a.rnpc_plac			")
			.where("      , a.rnpc_widh_1fst      , a.rnpc_widh_2snd      , a.omhd_hole_incl_yorn  , a.omhd_plac           , a.omhd_widh			")
			.where("      , a.omhd_leng           , a.omhd_hght           , a.rolr_incl_yorn       , a.rolr_name           , a.rlho_cutt_angl		")
			.where("      , a.rlho_incl_yorn      , a.midl_rolr_name      , a.rlho_strt_plac       , a.rlho_1pcs_widh      , a.rlho_1pcs_leng		")
			.where("      , a.rlho_2pcs_widh      , a.rlho_2pcs_leng      , a.rlho_3pcs_widh       , a.rlho_3pcs_leng      , a.midl_rolr_leng		")
			.where("      , a.rlho_strt_1pcs      , a.rlho_strt_2pcs      , a.rlho_strt_3pcs														")
			.where("      , a.rail_open_itvl      , a.rail_zero_yorn      , a.rail_1fst_yorn       , a.rail_2snd_yorn      , a.rail_midl_yorn		")
			.where("      , a.rail_3trd_yorn      , a.rail_4frt_yorn      , a.midl_rolr_incl_yorn  , a.flps_mkng_incl_yorn , a.flps_plac			")
			.where("      , a.flps_plac_2snd      , a.rein_incl_yorn      , a.rein_leng            , a.rein_tick           , a.rein_topp_cncs_yorn	")
			.where("      , a.rein_plac_1fst      , a.rein_plac_2snd      , a.rein_plac_3trd       , a.hair_incl_yorn      , a.mult_hole_yorn		")
			.where("      , a.item_dpth																												")
			.where("      , a.open_widh           , a.scrn_wthl_yorn      , a.mult_stop_stag       , a.tagg_asmt           , a.scrw_qntt			")
			.where("      , a.scrw_widh_1fst      , a.scrw_widh_2snd      , a.scrw_widh_3trd       , a.scrw_plac           , a.ssbr_yorn			")
			.where("      , a.rs_yorn             , a.fpfp_mkng_qntt      , a.fpfp_plac_3trd       , a.fpfp_plac_4frt      , a.akho_open_yorn_1fst	")
			.where("      , a.akho_open_yorn_2snd , a.akho_widh_1fst      , a.akho_widh_2snd       , a.scen_name           , a.wryp_yorn			")
			.where("      , a.innr_wryp_itid      , a.innr_wryp_itnm      , a.otsd_wryp_itid       , a.otsd_wryp_itnm      , a.orig_invc_numb		")
			.where("      , a.orig_invc_seqn      , a.brcd_hght           , a.brcd_plac            , a.assa_yorn           , a.brcd					")
			.where("      , a.wker_idcd           , a.strt_dttm           , a.endd_dttm            , a.cmpl_yorn           , a.prts_numb			")
			.where("      , if (a.hndl_incl_yorn='1',(select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.inhd_left_itid limit 1),null) as inhd_left_itid	")
			.where("      , if (a.hndl_incl_yorn='1',(select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.inhd_righ_itid limit 1),null) as inhd_righ_itid	")
			.where("      , if (a.hndl_incl_yorn='1',(select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.othd_left_itid limit 1),null) as othd_left_itid	")
			.where("      , if (a.hndl_incl_yorn='1',(select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.othd_righ_itid limit 1),null) as othd_righ_itid	")
			.where("      , a.ctbr_numb        , a.hndl_itid        , a.stop_incl_yorn																")
			.where("      , a.rail0_wtho_1     , a.rail0_wtho_2     , a.rail0_wtho_3    , a.rail0_wtho_4    , a.rail0_wtho_5 , a.rail0_wtho_6		")
			.where("      , a.rail1_wtho_1     , a.rail1_wtho_2     , a.rail1_wtho_3    , a.rail1_wtho_4    , a.rail1_wtho_5 , a.rail1_wtho_6		")
			.where("      , a.rail2_wtho_1     , a.rail2_wtho_2     , a.rail2_wtho_3    , a.rail2_wtho_4    , a.rail2_wtho_5 , a.rail2_wtho_6		")
			.where("      , a.rail3_wtho_1     , a.rail3_wtho_2     , a.rail3_wtho_3    , a.rail3_wtho_4    , a.rail3_wtho_5 , a.rail3_wtho_6		")
			.where("      , a.rail4_wtho_1     , a.rail4_wtho_2     , a.rail4_wtho_3    , a.rail4_wtho_4    , a.rail4_wtho_5 , a.rail4_wtho_6		")
			.where("      , a.rail5_wtho_1     , a.rail5_wtho_2     , a.rail5_wtho_3    , a.rail5_wtho_4    , a.rail5_wtho_5 , a.rail5_wtho_6		")
			.where("      , if (a.tblr in ('T','B')	, cutt_leng																						")
			.where("                                , (select cutt_leng from wpror_item_cut r														")
			.where("                                   where  r.brcd = concat(substring(a.brcd,1,11),'T') limit 1 )) as comp_widh					")
			.where("      , if (a.tblr in ('L','R')	, cutt_leng																						")
			.where("                                , (select cutt_leng from wpror_item_cut r														")
			.where("                                   where  r.brcd = concat(substring(a.brcd,1,11),'L') limit 1 )) as comp_hght					")
			.where("     , a.user_memo            , a.sysm_memo          , a.prnt_idcd            , a.line_levl            , a.line_ordr			")
			.where("     , a.line_stat            , a.line_clos          , a.find_name            , a.lott_numb										")
			.where("     , concat(a.lott_numb , '-' , a.acpt_seqn , ' ' , 'W', cast(a.cutt_leng as int), ' '										")
			.where("             , if (ifnull(e.wdsf_rate_1fst,0)=0,'',substring(e.wdsf_rate_name,1,2)) , ' '										")
			.where("             , if (ifnull(e.wdsf_rate_1fst,0)=0,'',e.wndw_dirt_dvcd)) as prnt_titl												")
			.where("     , a.updt_user_name       , a.updt_ipad          , a.updt_dttm            , a.updt_idcd            , a.updt_urif			")
			.where("     , a.crte_user_name       , a.crte_ipad          , a.crte_dttm            , a.crte_idcd            , a.crte_urif			")
			.where("     , m.deli_date																												")
			.where("from   wpror_item_cut a																											")
			.where("       left join westi_item e on a.acpt_numb = e.invc_numb and a.acpt_seqn = e.line_seqn										")
			.where("       left join westi_mast m on a.acpt_numb = m.invc_numb																		")
			.where("where  1=1																														")
		;
		if(brcd.equals("")){
			data.param
				.where("and    substring(a.plan_strt_dttm,1,8) = :work_date "	, arg.getParameter("work_date"			))
				.where("and    a.find_name  like %:find_name%"	, arg.getParameter("find_name"							))
				.where("and    a.line_stat	< :line_stat	"	, "2" , "".equals(arg.getParamText("line_stat"			)))
				.where("and    ivst_ordr is not null																							")
				.where("and    ifnull(a.cmpl_yorn,'0')	= '0'																					")
				.where("and    ifnull(a.auto_yorn,'0')	= '1'																					")
				.where("and    ifnull(a.cofm_yorn,'0')	= '1'																					")
			;
		}else{
			data.param
				.where("and    a.brcd  = :brcd"					, arg.getParameter("brcd"														))
			;
		}
		data.param
			.where("order by a.ivst_item_idcd , a.ivst_ordr , a.cutt_ordr																		")
			.where(") a																															")
		;
		return data.selectForMap();
	}
	/* 작업오더 가져오기 */
	public SqlResultMap getOrderReSearch(HttpRequestArgument arg ) throws Exception {
		String hq = arg.getParamText("hqof_idcd");
		DataMessage data = new DataMessage(hq+".POS");
		String brcd = arg.getParamText("brcd");
		data.param // 집계문
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select a.*																							")
		;
		data.param //퀴리문
			.where("from (																								")
			.where("select  a.invc_numb           , a.line_seqn           , a.assi_seqn            , a.auto_yorn           , a.plan_strt_dttm		")
			.where("      , a.plan_endd_dttm      , a.acpt_numb           , a.acpt_amnd_degr       , a.acpt_seqn           , a.cvic_idcd			")
			.where("      , a.ispl_name           , a.brnd_bacd           , a.item_idcd            , a.item_name           , a.item_spec			")
			.where("      , a.dbwd_yorn           , a.cmbf_yorn           , a.asmb_plac_dvcd       , a.bfsf_dvcd           , a.tblr					")
			.where("      , a.ivst_item_idcd      , a.mtrl_grcd           , a.stnd_abar_leng       , a.ivst_ordr           , a.cutt_ordr			")
			.where("      , a.cutt_leng           , a.sync_cutt_qntt      , a.ctbr_aset_qntt       , a.pnbr_yorn           , a.item_widh			")
			.where("      , a.item_hght           , a.item_leng           , a.ydge_used_yorn       , a.wdbf_cncs_type      , a.film_dctn_proc		")
			.where("      , a.hndl_incl_yorn      , a.hndl_hght           , a.hdho_type_dvcd       , a.hdho_1pcs_hght      , a.hdho_2pcs_hght		")
			.where("      , a.hdho_hght_grip_1fst , a.hdho_hght_grip_2snd , a.hdho_qntt            , a.hdho_itvl           , a.hdho_pass_yorn		")
			.where("      , a.lkho_incl_yorn      , a.lkho                , a.lkho_1pcs_widh       , a.lkho_1pcs_leng      , a.lkho_2pcs_widh		")
			.where("      , a.lkho_2pcs_leng      , a.lkho_plac_cpsn      , a.lkho_grip_leng_1fst  , a.rnpc_incl_yorn      , a.rnpc_plac			")
			.where("      , a.rnpc_widh_1fst      , a.rnpc_widh_2snd      , a.omhd_hole_incl_yorn  , a.omhd_plac           , a.omhd_widh			")
			.where("      , a.omhd_leng           , a.omhd_hght           , a.rolr_incl_yorn       , a.rolr_name           , a.rlho_cutt_angl		")
			.where("      , a.rlho_incl_yorn      , a.midl_rolr_name      , a.rlho_strt_plac       , a.rlho_1pcs_widh      , a.rlho_1pcs_leng		")
			.where("      , a.rlho_2pcs_widh      , a.rlho_2pcs_leng      , a.rlho_3pcs_widh       , a.rlho_3pcs_leng      , a.midl_rolr_leng		")
			.where("      , a.rlho_strt_1pcs      , a.rlho_strt_2pcs      , a.rlho_strt_3pcs														")
			.where("      , a.rail_open_itvl      , a.rail_zero_yorn      , a.rail_1fst_yorn       , a.rail_2snd_yorn      , a.rail_midl_yorn		")
			.where("      , a.rail_3trd_yorn      , a.rail_4frt_yorn      , a.midl_rolr_incl_yorn  , a.flps_mkng_incl_yorn , a.flps_plac			")
			.where("      , a.flps_plac_2snd      , a.rein_incl_yorn      , a.rein_leng            , a.rein_tick           , a.rein_topp_cncs_yorn	")
			.where("      , a.rein_plac_1fst      , a.rein_plac_2snd      , a.rein_plac_3trd       , a.hair_incl_yorn      , a.mult_hole_yorn		")
			.where("      , a.open_widh           , a.scrn_wthl_yorn      , a.mult_stop_stag       , a.tagg_asmt           , a.scrw_qntt			")
			.where("      , a.scrw_widh_1fst      , a.scrw_widh_2snd      , a.scrw_widh_3trd       , a.scrw_plac           , a.ssbr_yorn			")
			.where("      , a.rs_yorn             , a.fpfp_mkng_qntt      , a.fpfp_plac_3trd       , a.fpfp_plac_4frt      , a.akho_open_yorn_1fst	")
			.where("      , a.akho_open_yorn_2snd , a.akho_widh_1fst      , a.akho_widh_2snd       , a.scen_name           , a.wryp_yorn			")
			.where("      , a.innr_wryp_itid      , a.innr_wryp_itnm      , a.otsd_wryp_itid       , a.otsd_wryp_itnm      , a.orig_invc_numb		")
			.where("      , a.orig_invc_seqn      , a.brcd_hght           , a.brcd_plac            , a.assa_yorn           , a.brcd					")
			.where("      , a.wker_idcd           , a.strt_dttm           , a.endd_dttm            , a.cmpl_yorn           , a.prts_numb			")
			.where("      , if (a.hndl_incl_yorn='1',(select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.inhd_left_itid limit 1),null) as inhd_left_itid	")
			.where("      , if (a.hndl_incl_yorn='1',(select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.inhd_righ_itid limit 1),null) as inhd_righ_itid	")
			.where("      , if (a.hndl_incl_yorn='1',(select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.othd_left_itid limit 1),null) as othd_left_itid	")
			.where("      , if (a.hndl_incl_yorn='1',(select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.othd_righ_itid limit 1),null) as othd_righ_itid	")
			.where("      , a.ctbr_numb        , a.hndl_itid        , a.stop_incl_yorn																")
			.where("      , a.rail0_wtho_1     , a.rail0_wtho_2     , a.rail0_wtho_3    , a.rail0_wtho_4    , a.rail0_wtho_5 , a.rail0_wtho_6		")
			.where("      , a.rail1_wtho_1     , a.rail1_wtho_2     , a.rail1_wtho_3    , a.rail1_wtho_4    , a.rail1_wtho_5 , a.rail1_wtho_6		")
			.where("      , a.rail2_wtho_1     , a.rail2_wtho_2     , a.rail2_wtho_3    , a.rail2_wtho_4    , a.rail2_wtho_5 , a.rail2_wtho_6		")
			.where("      , a.rail3_wtho_1     , a.rail3_wtho_2     , a.rail3_wtho_3    , a.rail3_wtho_4    , a.rail3_wtho_5 , a.rail3_wtho_6		")
			.where("      , a.rail4_wtho_1     , a.rail4_wtho_2     , a.rail4_wtho_3    , a.rail4_wtho_4    , a.rail4_wtho_5 , a.rail4_wtho_6		")
			.where("      , a.rail5_wtho_1     , a.rail5_wtho_2     , a.rail5_wtho_3    , a.rail5_wtho_4    , a.rail5_wtho_5 , a.rail5_wtho_6		")
			.where("      , if (a.tblr in ('T','B')	, cutt_leng																						")
			.where("                                , (select cutt_leng from wpror_item_cut r														")
			.where("                                   where  r.brcd = concat(substring(a.brcd,1,11),'T') limit 1 )) as comp_widh					")
			.where("      , if (a.tblr in ('L','R')	, cutt_leng																						")
			.where("                                , (select cutt_leng from wpror_item_cut r														")
			.where("                                   where  r.brcd = concat(substring(a.brcd,1,11),'L') limit 1 )) as comp_hght					")
			.where("     , a.user_memo            , a.sysm_memo          , a.prnt_idcd            , a.line_levl            , a.line_ordr			")
			.where("     , a.line_stat            , a.line_clos          , a.find_name            , a.lott_numb										")
			.where("     , concat(a.lott_numb , '-' , a.acpt_seqn , ' ' , 'W', cast(a.cutt_leng as int), ' '										")
			.where("             , if (ifnull(e.wdsf_rate_1fst,0)=0,'',substring(e.wdsf_rate_name,1,2)) , ' '										")
			.where("             , if (ifnull(e.wdsf_rate_1fst,0)=0,'',e.wndw_dirt_dvcd)) as prnt_titl												")
			.where("     , a.updt_user_name       , a.updt_ipad          , a.updt_dttm            , a.updt_idcd            , a.updt_urif			")
			.where("     , a.crte_user_name       , a.crte_ipad          , a.crte_dttm            , a.crte_idcd            , a.crte_urif			")
			.where("from   wpror_item_cut a																											")
			.where("       left join westi_item e on a.acpt_numb = e.invc_numb and a.acpt_seqn = e.line_seqn										")
			.where("where  1=1																														")
		;
		if(brcd.equals("")){
			data.param
//				.where("and    substring(a.plan_strt_dttm,1,8) = :work_date "	, arg.getParameter("work_date"			))
				.where("and    a.find_name  like %:find_name%"	, arg.getParameter("find_name"							))
				.where("and    a.line_stat	< :line_stat	"	, "2" , "".equals(arg.getParamText("line_stat"			)))
				.where("and    ivst_ordr is not null																								")
				.where("and    ifnull(a.auto_yorn,'0')	= '1'																						")
			;
		}else{
			data.param
				.where("and    concat(a.invc_numb, a.bfsf_dvcd,substring(a.ivst_ordr,1,3))  = (select concat(r.invc_numb, r.bfsf_dvcd,substring(r.ivst_ordr,1,3)) 	")
				.where("                                                                       from   wpror_item_cut r								")
				.where("                                                                       where  r.brcd = :brcd	", arg.getParameter("brcd"	))
				.where("                                                                       limit 1								")
				.where("                                                                       )													")
			;
		}
		data.param
			.where("order by a.ivst_item_idcd , a.ivst_ordr , a.cutt_ordr																		")
			.where(") a																															")
		;
		return data.selectForMap();
	}
	/* 견적서 master 가져오기 */
	public SqlResultMap getEstimastSearch(HttpRequestArgument arg , int page, int rows ) throws Exception {
		String hq = arg.getParamText("hqof_idcd");
		DataMessage data = new DataMessage(hq+".POS");
		String brcd = arg.getParamText("brcd");
		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select a.*																						")
		;
		data.param //퀴리문
			.where("from (																									")
			.where("select  m.invc_numb             , m.esti_date          , m.vald_date									")
			.where("      , m.bzpl_idcd             , m.cstm_esti_numb     , m.ordr_numb            , m.copr_stor_name		")
			.where("      , m.drtr_idcd             , m.drtr_name          , m.cstm_idcd            , m.cstm_name			")
			.where("      , m.unfc_scen_idcd        , m.scen_idcd          , m.scen_name           							")
			.where("      , m.scen_addr_1fst        , m.scen_addr_2snd     , m.scen_tele_numb       , m.scen_faxi_nmbr		")
			.where("      , m.scen_drtr_idcd        , m.scen_drtr_name     , m.scen_drtr_tele_numb   						")
			.where("      , m.mngt_numb             , m.prod_trst_dvcd     , m.file_name            , m.deli_date			")
			.where("      , m.dlvy_schd_date        , m.cont_schd_date     , m.trst_cont            , m.trst_degr			")
			.where("      , m.rein_viss_itvl        , m.ancr_atch_itvl     , m.glss_itid            , m.rein_incl_yorn		")
			.where("      , m.bycv_incl_yorn        , m.wdbf_yorn          , m.wdsf_yorn            , m.wdms_yorn			")
			.where("      , m.esti_cond             , m.atmr_drtr_name     , m.cnfm_drtr_idcd       , m.cofm_dttm			")
			.where("      , m.sale_cnfm_drtr_idcd   , m.sale_cnfm_dttm     , m.cstr_cnfm_drtr_idcd  , m.cstr_cnfm_dttm		")
			.where("      , m.spec_cnfm_drtr_idcd   , m.spec_cnfm_dttm     , m.prod_cnfm_drtr_idcd  , m.prod_cnfm_dttm		")
			.where("      , m.glss_cnfm_drtr_idcd   , m.glss_cnfm_dttm     , m.prod_drtr_idcd       , m.prod_schd_date		")
			.where("      , m.glss_cstm_idcd   																				")
			.where("from    westi_mast m																					")
			.where("where   invc_numb = :invc_numb"    ,arg.fixParameter("invc_numb"))
			.where("and     esti_date between :fr_date",arg.getParameter("fr_date"))
			.where("                  and     :to_date",arg.getParameter("to_date"))
			.where(") a																										")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}
	/* 견적서 item 가져오기 */
	public SqlResultMap getEstiitemSearch(HttpRequestArgument arg , int page, int rows ) throws Exception {
		String hq = arg.getParamText("hqof_idcd");
		DataMessage data = new DataMessage(hq+".POS");
		String brcd = arg.getParamText("brcd");
		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select a.*																						")
		;
		data.param //퀴리문
			.where("from (																									")
			.where("select  m.invc_numb             , m.esti_date         , m.vald_date           							")
			.where("      , m.bzpl_idcd             , m.cstm_esti_numb    , m.ordr_numb            , m.copr_stor_name		")
			.where("      , m.drtr_idcd             , m.drtr_name         , m.cstm_idcd            , m.cstm_name			")
			.where("      , m.unfc_scen_idcd        , m.scen_idcd         , m.scen_name           							")
			.where("      , m.scen_addr_1fst        , m.scen_addr_2snd    , m.scen_tele_numb       , m.scen_faxi_nmbr		")
			.where("      , m.scen_drtr_idcd        , m.scen_drtr_name    , m.scen_drtr_tele_numb							")
			.where("      , m.mngt_numb             , m.prod_trst_dvcd    , m.file_name            , m.deli_date			")
			.where("      , m.dlvy_schd_date        , m.cont_schd_date    , m.trst_cont            , m.trst_degr			")
			.where("      , m.rein_viss_itvl        , m.ancr_atch_itvl    , m.rein_incl_yorn								")
			.where("      , m.wdbf_yorn         , m.wdsf_yorn            , m.wdms_yorn										")
			.where("      , m.esti_cond             , m.atmr_drtr_name    , m.cnfm_drtr_idcd       , m.cofm_dttm			")
			.where("      , m.sale_cnfm_drtr_idcd   , m.sale_cnfm_dttm    , m.cstr_cnfm_drtr_idcd  , m.cstr_cnfm_dttm		")
			.where("      , m.spec_cnfm_drtr_idcd   , m.spec_cnfm_dttm    , m.prod_cnfm_drtr_idcd  , m.prod_cnfm_dttm		")
			.where("      , m.glss_cnfm_drtr_idcd   , m.glss_cnfm_dttm    , m.prod_drtr_idcd       , m.prod_schd_date		")
			.where("      , m.glss_cstm_idcd 																				")
			.where("      , i.line_seqn             , i.ispl_name         , i.brnd_bacd            , i.wndw_modl_idcd		")
			.where("      , i.wdgr_idcd             , i.item_name         , i.pdgr_bacd            , i.dbwd_yorn			")
			.where("      , i.bfsf_dvcd             , i.wdtp_idcd         , i.wndw_dirt_dvcd       , i.wdsf_rate_1fst		")
			.where("      , i.wdsf_rate_2snd        , i.wdsf_rate_3trd    , i.wdsf_rate_4frt       , i.wdsf_rate_name		")
			.where("      , i.wdsf_widh_1fst        , i.wdsf_widh_2snd    , i.wdsf_widh_3trd       , i.wdsf_widh_4frt		")
			.where("      , i.invc_qntt             , i.totl_pnyg         , i.wdbf_itid            , i.wdsf_itid			")
			.where("      , i.wdmc_itid             , i.wdmf_itid         , i.wdgb_itid            , i.wdbf_rein_itid		")
			.where("      , i.wdsf_rein_itid        , i.wdmf_rein_itid    , i.glss_itid            , i.vent_plac_dvcd		")
			.where("      , i.item_widh             , i.item_widh_1fst    , i.item_hght            , i.item_hght_1fst		")
			.where("      , i.wryp_shio_twis        , i.inwp_itid         , i.otwp_itid            , i.ings_itid			")
			.where("      , i.ings_tick             , i.otgs_itid         , i.otgs_tick            , i.ings_fixd_itid		")
			.where("      , i.otgs_fixd_itid        , i.bycv_incl_yorn    , i.inhd_left_itid       , i.inhd_righ_itid		")
			.where("      , i.othd_left_itid        , i.othd_righ_itid    , i.hndl_hght            , i.clee_innr			")
			.where("      , i.clee_otsd             , i.moss_incl_yorn    , i.moss_itid            , i.mult_hole_yorn		")
			.where("      , i.efcn_grad_dvcd 																				")
			.where("from    westi_item i 																					")
			.where("        left join westi_mast m on i.invc_numb  = m.invc_numb and i.amnd_degr = m.amnd_degr				")
			.where("where   i.invc_numb = :invc_numb"    ,arg.fixParameter("invc_numb"))
			.where("and     i.line_seqn = :line_seqn"    ,arg.fixParameter("line_seqn"))
			.where("and     esti_date between :fr_date",arg.getParameter("fr_date"))
			.where("                  and     :to_date",arg.getParameter("to_date"))
			.where(") a																										")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}
	public SqlResultMap setJobFinish(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		String cvic_idcd = arg.getParamText("cvic_idcd");
		String cmpl_yorn = arg.getParamText("cmpl_yorn");
		String brcd = arg.getParamText("brcd");
		data.param
			.table("wpror_item_cut")
			.where("where invc_numb = :invc_numb")
			.where("and   ivst_ordr = :ivst_ordr")
		;
		if(!brcd.equals("")){
			data.param
				.where("and   brcd = :brcd")

				.unique("brcd", arg.getParameter("brcd"))
			;
		}
		;
		data.param
			.unique("invc_numb", arg.fixParameter("invc_numb"))
			.unique("ivst_ordr", arg.getParameter("ivst_ordr"))


			.update("brcd"     , arg.getParameter("brcd"))
			.update("cvic_idcd", arg.getParameter("cvic_idcd"))
			.update("strt_dttm", arg.getParameter("strt_dttm"))
			.update("endd_dttm", arg.getParameter("endd_dttm"))
		;
		if(cmpl_yorn.equals("0")){
			data.param
				.update("plan_strt_dttm"	, arg.getParameter("strt_dttm"))
				.update("plan_endd_dttm"	, arg.getParameter("endd_dttm"))
				.update("strt_dttm", "")
				.update("endd_dttm", "")
			;
		}
		if(cvic_idcd.equals("01")){
			data.param
				.update("cmpl_yorn", arg.getParameter("cmpl_yorn"))
			;
		}else if(cvic_idcd.equals("02")){
			data.param
				.update("weld_cmpl_yorn", arg.getParameter("cmpl_yorn"))
			;
		}
		data.attach(Action.update);
		data.execute();
		return null;
	}
}



