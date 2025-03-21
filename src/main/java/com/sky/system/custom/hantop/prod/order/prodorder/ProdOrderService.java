package com.sky.system.custom.hantop.prod.order.prodorder;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("hantop.ProdOrderService")
public class ProdOrderService  extends DefaultServiceHandler {

	//master조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select    a.invc_numb          , a.amnd_degr          , a.esti_date          , a.vald_date			")
			.where("        , a.cstm_esti_numb     , a.ordr_numb          , a.copr_stor_name     , a.drtr_name			")
			.where("        , a.drtr_idcd          , a.scen_addr_1fst     , a.scen_addr_2snd     , a.cont_schd_date		")
			.where("        , a.bsmt_loss_rate     , a.asmt_loss_rate     , a.weld_loss_rate     , a.rein_viss_itvl		")
			.where("        , a.ancr_atch_itvl     , a.atmr_drtr_name     , a.esti_dvcd          , a.remk_text			")
			.where("        , a.user_memo          , a.sysm_memo          , a.prnt_idcd          , a.line_levl			")
			.where("        , a.line_ordr          , a.line_stat          , a.line_clos          , a.find_name			")
			.where("        , a.updt_user_name     , a.updt_ipad          , a.updt_dttm          , a.updt_idcd			")
			.where("        , a.updt_urif          , a.crte_user_name     , a.crte_ipad          , a.crte_dttm			")
			.where("        , a.crte_idcd          , a.crte_urif          , a.cofm_dttm									")
			.where("        , if(b.cnt>0,1,0) as pror_yorn																")
			.where("        ,  CASE WHEN  ( ifnull(c.cnt,0)-ifnull(d.cnt,0)) = ifnull(c.cnt,0) THEN 					")
			.where("                        '1' -- 대기																	")
			.where("                WHEN ( ifnull(c.cnt,0)-ifnull(d.cnt,0)) = 0 THEN									")
			.where("                        '3' -- 완료																	")
			.where("                ELSE																				")
			.where("                        '2' -- 진행중																")
			.where("           END as cmpl_dvcd																			")
		;
		data.param
			.where("from westi_mast a																					")
			.where("left outer join ( select count(acpt_numb) as cnt ,invc_numb 										")
			.where("                  from wpror_item_cut 																")
			.where("                  where cofm_yorn = 1 																")
			.where("                  group by invc_numb																")
			.where("                ) b on b.invc_numb = a.invc_numb													")
			.where("left outer join ( select count(line_seqn) as cnt ,invc_numb 										")
			.where("                  from wpror_item_cut 																")
			.where("                  where bfsf_dvcd in('sf','bf')														")
			.where("                  group by invc_numb																")
			.where("                ) c on c.invc_numb = a.invc_numb													")
			.where("left outer join ( select count(line_seqn) as cnt ,invc_numb 										")
			.where("                  from wpror_item_cut 																")
			.where("                  where bfsf_dvcd in('sf','bf')														")
			.where("                  and   cofm_yorn = 1																")
			.where("                  and   cmpl_yorn = 1																")
			.where("                  group by invc_numb																")
			.where("                ) d on d.invc_numb = a.invc_numb													")
			.where("where  1=1																							")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"  ))
			.where("and    a.scen_name	like %:scen_name%	" , arg.getParamText("scen_name"  ))
			.where("and    a.esti_date  >= :esti_date1		" , arg.getParamText("esti_date1" ))
			.where("and    a.esti_date  <= :esti_date2		" , arg.getParamText("esti_date2" ))
			.where("and    a.cont_schd_date	>= :schd_date1	" , arg.getParamText("schd_date1" ))
			.where("and    a.cont_schd_date	<= :schd_date2	" , arg.getParamText("schd_date2" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd"  ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd"  ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos"  ))
			.where("and    a.cofm_yorn   = 1													")
			.where("and    a.line_stat   = :line_stat		" , arg.getParamText("line_stat"  ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb desc limit 1000000000 ) a													")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//detail 조회
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.invc_numb          , a.amnd_degr          , a.line_seqn          , a.ispl_name			")
			.query("       , a.wndw_modl_idcd     , m.modl_name          , a.wdbf_itid          , a.wdsf_itid			")
			.query("       , a.wdtp_idcd          , a.invc_qntt          , a.item_widh          , a.item_widh_1fst		")
			.query("       , a.ings_itid          , a.ings_tick          , a.otgs_itid          , a.otgs_tick			")
			.query("       , a.ings_fixd_itid     , a.otgs_fixd_itid     , a.moss_incl_yorn     , a.moss_itid			")
			.query("       , a.mult_hole_yorn     , a.efcn_grad_dvcd     , a.remk_text          , w.wdtp_name			")
			.query("       , a.inwp_itid          , a.otwp_itid          , a.inhd_left_itid     , a.inhd_righ_itid		")
			.query("       , a.othd_left_itid     , a.othd_righ_itid     , a.clee_innr          , a.clee_otsd			")
			.query("       , a.wdsf_rate_name     , a.hndl_hght          , a.item_hght          , a.item_hght_1fst		")
			.query("       , a.user_memo          , a.sysm_memo          , a.prnt_idcd          , a.line_levl			")
			.query("       , a.line_ordr          , a.line_stat          , a.line_clos          , a.find_name			")
			.query("       , a.updt_user_name     , a.updt_ipad          , a.updt_dttm          , a.updt_idcd			")
			.query("       , a.updt_urif          , a.crte_user_name     , a.crte_ipad          , a.crte_dttm			")
			.query("       , a.crte_idcd          , a.crte_urif          , b.base_name as brnd_name						")
			.query("       , a.wndw_dirt_dvcd    																		")
		;
		data.param
			.where("from   westi_item a																					")
			.where("    left outer join wind_item_modl m on a.wndw_modl_idcd = m.wndw_modl_idcd							")
			.where("left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code		")
			.where("    left outer join wind_type w on a.wdtp_idcd = w.wdtp_idcd										")
			.where("where  1=1																							")
			.where("and    a.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																				")
		;
		return data.selectForMap();
	}
	//master조회
	public SqlResultMap getCofm(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String chk = arg.getParamText("chk");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select    a.invc_numb          , a.amnd_degr          , a.esti_date          , a.vald_date			")
			.where("        , a.cstm_esti_numb     , a.ordr_numb          , a.copr_stor_name     , a.drtr_name			")
			.where("        , a.drtr_idcd          , a.scen_addr_1fst     , a.scen_addr_2snd     , a.cont_schd_date		")
			.where("        , a.bsmt_loss_rate     , a.asmt_loss_rate     , a.weld_loss_rate     , a.rein_viss_itvl		")
			.where("        , a.ancr_atch_itvl     , a.atmr_drtr_name     , a.esti_dvcd          , a.remk_text			")
			.where("        , a.user_memo          , a.sysm_memo          , a.prnt_idcd          , a.line_levl			")
			.where("        , a.line_ordr          , a.line_stat          , a.line_clos          , a.find_name			")
			.where("        , a.updt_user_name     , a.updt_ipad          , a.updt_dttm          , a.updt_idcd			")
			.where("        , a.updt_urif          , a.crte_user_name     , a.crte_ipad          , a.crte_dttm			")
			.where("        , a.crte_idcd          , a.crte_urif														")
			.where("        , if(b.cnt>0,1,0) as pror_yorn																")
		;
		data.param
			.where("from westi_mast a															")
			.where("left outer join ( select count(acpt_numb) as cnt ,invc_numb 				")
			.where("                  from wpror_item_cut 										")
			.where("                  where cofm_yorn = 1 										")
			.where("                  group by invc_numb										")
			.where("                ) b on b.invc_numb = a.invc_numb							")
			.where("where  1=1																	")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"  ))
			.where("and    a.scen_name	like %:scen_name%	" , arg.getParamText("scen_name"  ))
			.where("and    a.esti_date  >= :esti_date1		" , arg.getParamText("esti_date1" ))
			.where("and    a.esti_date  <= :esti_date2		" , arg.getParamText("esti_date2" ))
			.where("and    a.cont_schd_date	>= :schd_date1	" , arg.getParamText("schd_date1" ))
			.where("and    a.cont_schd_date	<= :schd_date2	" , arg.getParamText("schd_date2" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd"  ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd"  ))
			.where("and    a.cofm_yorn   = 1													")
			.where("and    a.invc_numb in (select invc_numb from wpror_item_cut r where a.invc_numb = r.acpt_numb)		")
		;
		if(chk.equals("")){
			data.param
				.where("and   0 = (select count(c.acpt_numb) from wpror_item_cut c where c.invc_numb = a.invc_numb and cofm_yorn = 1)	")
			;
		}
		data.param
			.where("and    a.line_clos   = 0													")
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb desc , a.esti_date desc limit 1000000000 ) a					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	//detail 조회
	public SqlResultMap getDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String b = arg.getParamText("cmpl_yorn");
		String[] arr2 = b.replace("[", "").replace("]","").replaceAll("\"", "").split(",");

		String dvcd = arg.getParamText("bfsf_dvcd");
		String[] arr3 = dvcd.replace("[", "").replace("]","").replaceAll("\"", "").split(",");

		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*")
		;
		data.param
			.where("from (																															")
			.where("select   a.invc_numb            , a.line_seqn            , a.assi_seqn           , a.auto_yorn           , a.plan_strt_dttm		")
			.where("       , a.plan_endd_dttm       , a.acpt_numb            , a.acpt_amnd_degr      , a.acpt_seqn           , a.cvic_idcd			")
			.where("       , a.ispl_name            , a.brnd_bacd            , a.item_idcd           , a.item_name           , a.item_spec			")
			.where("       , a.dbwd_yorn            , a.cmbf_yorn            , a.asmb_plac_dvcd      , a.bfsf_dvcd           , a.tblr				")
			.where("       , a.ivst_item_idcd       , a.mtrl_grcd            , a.stnd_abar_leng      , a.ivst_ordr           , a.cutt_ordr			")
			.where("       , a.cutt_leng            , a.sync_cutt_qntt       , a.ctbr_aset_qntt      , a.pnbr_yorn           , a.item_widh			")
			.where("       , a.item_hght            , a.item_leng            , a.ydge_used_yorn      , a.wdbf_cncs_type      , a.film_dctn_proc		")
			.where("       , a.hndl_incl_yorn       , a.hndl_hght            , a.clee_incl_yorn      , a.clee_hght           , a.hdho_type_dvcd		")
			.where("       , a.hdho_1pcs_hght       , a.hdho_2pcs_hght       , a.hdho_hght_grip_1fst , a.hdho_hght_grip_2snd , a.hdho_qntt			")
			.where("       , a.hdho_itvl            , a.hdho_pass_yorn       , a.lkho_incl_yorn      , a.lkho                , a.lkho_1pcs_widh		")
			.where("       , a.lkho_1pcs_leng       , a.lkho_2pcs_widh       , a.lkho_2pcs_leng      , a.lkho_plac_cpsn      , a.lkho_grip_leng_1fst")
			.where("       , a.rnpc_incl_yorn       , a.rnpc_plac            , a.rnpc_widh_1fst      , a.rnpc_widh_2snd      , a.omhd_hole_incl_yorn")
			.where("       , a.omhd_plac            , a.omhd_widh            , a.omhd_leng           , a.omhd_hght           , a.cutt_hght			")
			.where("       , a.rolr_incl_yorn       , a.rolr_name            , a.rlho_cutt_angl      , a.rlho_incl_yorn      , a.rlho_strt_1pcs		")
			.where("       , a.rlho_strt_plac       , a.rlho_1pcs_widh       , a.rlho_1pcs_leng      , a.rlho_strt_2pcs      , a.midl_rolr_name		")
			.where("       , a.rlho_2pcs_widh       , a.rlho_2pcs_leng       , a.rlho_strt_3pcs      , a.rlho_3pcs_widh      , a.rlho_3pcs_leng		")
			.where("       , a.midl_rolr_strt       , a.midl_rolr_leng       , a.rail_open_itvl      , a.rail_zero_yorn      , a.rail_1fst_yorn		")
			.where("       , a.rail_2snd_yorn       , a.rail_midl_yorn       , a.rail_3trd_yorn      , a.rail_4frt_yorn      , a.midl_rolr_incl_yorn")
			.where("       , a.flps_mkng_incl_yorn  , a.flps_plac            , a.flps_plac_2snd      , a.rein_incl_yorn      , a.rein_leng			")
			.where("       , a.rein_tick            , a.rein_topp_cncs_yorn  , a.rein_plac_1fst      , a.rein_plac_2snd      , a.rein_plac_3trd		")
			.where("       , a.hair_incl_yorn       , a.mult_hole_yorn       , a.open_widh           , a.scrn_wthl_yorn      , a.mult_stop_stag		")
			.where("       , a.tagg_asmt            , a.scrw_qntt            , a.scrw_widh_1fst      , a.scrw_widh_2snd      , a.scrw_widh_3trd		")
			.where("       , a.scrw_plac            , a.ssbr_yorn            , a.rs_yorn             , a.fpfp_mkng_qntt      , a.fpfp_plac_3trd		")
			.where("       , a.fpfp_plac_4frt       , a.akho_open_yorn_1fst  , a.akho_open_yorn_2snd , a.akho_widh_1fst      , a.akho_widh_2snd		")
			.where("       , a.scen_name            , a.wryp_yorn            , a.innr_wryp_itid      , a.innr_wryp_itnm      , a.otsd_wryp_itid		")
			.where("       , a.otsd_wryp_itnm       , a.orig_invc_numb       , a.orig_invc_seqn      , a.brcd_hght           , a.brcd_plac			")
			.where("       , a.assa_yorn            , a.brcd                 , a.prts_numb           , a.main_vent_yorn      , a.ctbr_numb			")
			.where("       , a.cmpl_yorn            , a.cofm_yorn            , a.stop_incl_yorn      , a.hndl_itid									")
			.where("       , a.wtho_plac_1fst       , a.wtho_plac_2snd       , a.wtho_plac_3trd      , a.wtho_plac_4frt      , a.wtho_plac_5fit		")
			.where("       , b.base_name as brnd_name                        , e.invc_qntt															")
			.where("       , (select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.inhd_left_itid limit 1) as inhd_left_itid	")
			.where("       , (select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.inhd_righ_itid limit 1) as inhd_righ_itid	")
			.where("       , (select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.othd_left_itid limit 1) as othd_left_itid	")
			.where("       , (select refn_code_3trd from etc_ref_code r where r.sbsc_code = '핸들' and r.sbsc_valu = e.othd_righ_itid limit 1) as othd_righ_itid	")
			.where("       , e.clee_innr            , e.clee_otsd																					")
			.where("       , a.user_memo            , a.sysm_memo            , a.prnt_idcd            , a.line_levl									")
			.where("       , a.line_ordr            , a.line_stat            , a.line_clos            , a.find_name									")
			.where("       , a.updt_user_name       , a.updt_ipad            , a.updt_dttm            , a.updt_idcd									")
			.where("       , a.updt_urif            , a.crte_user_name       , a.crte_ipad            , a.crte_dttm									")
			.where("       , a.crte_idcd            , a.crte_urif																					")
			.where("       , a.rail0_wtho_1   , a.rail0_wtho_2   , a.rail0_wtho_3   , a.rail0_wtho_4  , a.rail0_wtho_5  , a.rail0_wtho_6			")
			.where("       , a.rail1_wtho_1   , a.rail1_wtho_2   , a.rail1_wtho_3   , a.rail1_wtho_4  , a.rail1_wtho_5  , a.rail1_wtho_6			")
			.where("       , a.rail2_wtho_1   , a.rail2_wtho_2   , a.rail2_wtho_3   , a.rail2_wtho_4  , a.rail2_wtho_5  , a.rail2_wtho_6			")
			.where("       , a.rail3_wtho_1   , a.rail3_wtho_2   , a.rail3_wtho_3   , a.rail3_wtho_4  , a.rail3_wtho_5  , a.rail3_wtho_6			")
			.where("       , a.rail4_wtho_1   , a.rail4_wtho_2   , a.rail4_wtho_3   , a.rail4_wtho_4  , a.rail4_wtho_5  , a.rail4_wtho_6			")
			.where("       , a.rail5_wtho_1   , a.rail5_wtho_2   , a.rail5_wtho_3   , a.rail5_wtho_4  , a.rail5_wtho_5  , a.rail5_wtho_6			")
			.where("from       wpror_item_cut a																										")
			.where("left outer join westi_item e on a.acpt_numb = e.invc_numb and a.acpt_seqn = e.line_seqn											")
			.where("left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code									")
			.where("where  1=1																														")
			.where("and    a.invc_numb	= :invc_numb			" , arg.getParamText("invc_numb"))
			.where("and    a.auto_yorn	= :auto_yorn			" , arg.getParamText("auto_yorn"))
//			.where("and    a.bfsf_dvcd	= :bfsf_dvcd			" , arg.getParamText("bfsf_dvcd"))
			.where("and    a.bfsf_dvcd	like %:rn_dvcd%			" , arg.getParamText("rn_dvcd"))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    a.cofm_yorn	= :cofm_yorn		" , arg.getParamText("cofm_yorn"))
		;
		if(!arg.getParamText("add").equals("true")){
			data.param
				.where("and    a.line_seqn	=:line_seqn			" , arg.getParamText("line_seqn"))
			;
		}
		if(!arr2[0].equals("")){
			data.param
				.where("and		a.cmpl_yorn in(														")
			;
			for(int i = 0; arr2.length>i;i++){
				data.param
					.where(":b"+i, arr2[i]);
				;
				if(i!=arr2.length-1){
					data.param
						.where(",");
					;
				}
			}
			data.param
				.where(")")
			;
		}

		if(!arr3[0].equals("")){
			data.param
				.where("and		a.bfsf_dvcd in(														")
			;
			for(int i = 0; arr3.length>i;i++){
				data.param
					.where(":c"+i, arr3[i]);
				;
				if(i!=arr3.length-1){
					data.param
						.where(",");
					;
				}
			}
			data.param
				.where(")")
			;
		}

		data.param
			.where("order by a.line_seqn,a.assi_seqn																				")
			.where(") a																												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getCofmDetail2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																									")
			.where("select  a.lott_numb          , a.item_idcd          , a.bfsf_dvcd          , a.ivst_ordr				")
			.where("      , sum(a.cutt_leng) as cutt_leng               , ifnull(a.stnd_abar_leng,6100) as stnd_abar_leng 	")
			.where("      , TRUNCATE(((sum(a.cutt_leng) / if(a.bfsf_dvcd  = 'BF' , 1 , 1))/ ifnull(a.stnd_abar_leng,6100) * 100),1)  as rate	")
			.where("      , GROUP_CONCAT(cast(cutt_leng as decimal)) as cutt_union											")
			.where("      , auto_yorn            , r.bsmt_leng																")
			.where("from   wpror_item_cut a																					")
			.where("left outer join (select r.bsmt_leng,r.item_idcd from wind_pfil_cam r ) r on r.item_idcd = a.item_idcd	")
			.where("where  1 = 1																							")
			.where("and    a.acpt_numb  = :acpt_numb",arg.fixParameter("invc_numb"))
		;
		if(arg.getParamText("chk").equals("")){
			data.param
				.where("and    a.cofm_yorn	= '0'																				")
			;
		}
		data.param
			.where("and    a.bfsf_dvcd in ('BF','SF')																		")
			.where("group by a.lott_numb, a.ivst_ordr , a.item_idcd , a.bfsf_dvcd  											")
			.where("order by a.lott_numb, a.ivst_ordr , a.item_idcd , a.bfsf_dvcd  											")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getCofmDetail3_2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																									")
			.where("select  a.lott_numb          , a.item_idcd          , a.bfsf_dvcd										")
			.where("      , a.cutt_leng as cutt_leng                    , ifnull(r.bsmt_leng,6100)  as bar_leng				")
			.where("      , a.assi_seqn																						")
			.where("from   wpror_item_cut a																					")
			.where("left outer join (select r.bsmt_leng,r.item_idcd from wind_pfil_cam r ) r on r.item_idcd = a.item_idcd	")
			.where("where  1 = 1																							")
			.where("and    a.acpt_numb  = :acpt_numb",arg.fixParameter("invc_numb"))
			.where("and    a.cofm_yorn	= '0'																				")
			.where("and    a.bfsf_dvcd in ('BF','SF')																		")
			.where("and    a.ivst_ordr is null																				")
			.where("and    a.cutt_leng > 0																					")
			.where("order by a.cutt_leng, a.lott_numb , a.item_idcd , a.bfsf_dvcd											")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getMaxIvst_ordr(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select (ifnull(max(substring(ivst_ordr,1,3)),0) + 1) as max									")
		;
		data.param
			.where("from   wpror_item_cut 																		")
			.where("where  invc_numb = :invc_numb ", arg.fixParamText("invc_numb"))
		;
		return data.selectForMap();
	}
	public SqlResultMap setDetail2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map) {
			data.param
				.table("wpror_item_cut")
				.where("where invc_numb = :invc_numb ")
				.where("and   line_seqn = :line_seqn ")
				.where("and   assi_seqn = :assi_seqn ")

				.unique("invc_numb"				, row.fixParameter("invc_numb"))
				.unique("line_seqn"				, row.fixParameter("line_seqn"))
				.unique("assi_seqn"				, row.fixParameter("assi_seqn"))

				.update("auto_yorn"				, row.getParameter("auto_yorn"				))  /*  자동여부  */
				.update("plan_strt_dttm"		, row.getParameter("plan_strt_dttm"			))  /*  계획시작일시  */
				.update("plan_endd_dttm"		, row.getParameter("plan_endd_dttm"			))  /*  계획종료일시  */
				.update("acpt_numb"				, row.getParameter("acpt_numb"				))  /*  수주번호  */
				.update("acpt_amnd_degr"		, row.getParameter("acpt_amnd_degr"			))  /*  수주AMD차수  */
				.update("acpt_seqn"				, row.getParameter("acpt_seqn"				))  /*  수주순번  */
				.update("cvic_idcd"				, row.getParameter("cvic_idcd"				))  /*  설비ID  */
				.update("ispl_name"				, row.getParameter("ispl_name"				))  /*  설치위치명  */
				.update("brnd_bacd"				, row.getParameter("brnd_bacd"				))  /*  브랜드분류코드  */
				.update("item_idcd"				, row.getParameter("item_idcd"				))  /*  품목ID  */
				.update("item_name"				, row.getParameter("item_name"				))  /*  품목명  */
				.update("item_spec"				, row.getParameter("item_spec"				))  /*  품목규격  */
				.update("dbwd_yorn"				, row.getParameter("dbwd_yorn"				))  /*  이중창여부  */
				.update("dbwd_numb"				, row.getParameter("dbwd_numb"				))  /*  이중창번호  */
				.update("cmbf_yorn"				, row.getParameter("cmbf_yorn"				))  /*  공틀여부  */
				.update("asmb_plac_dvcd"		, row.getParameter("asmb_plac_dvcd"			))  /*  조립위치구분코드  */
				.update("bfsf_dvcd"				, row.getParameter("bfsf_dvcd"				))  /*  틀짝망구분코드  */
				.update("tblr"					, row.getParameter("tblr"					))  /*  TBLR  */
				.update("ivst_item_idcd"		, row.getParameter("ivst_item_idcd"			))  /*  투입품목ID  */
				.update("mtrl_grcd"				, row.getParameter("mtrl_grcd"				))  /*  자재그룹코드  */
				.update("stnd_abar_leng"		, row.getParameter("stnd_abar_leng"			))  /*  표준바길이  */
				.update("ivst_ordr"				, row.getParameter("ivst_ordr"				))  /*  투입순서  */
				.update("cutt_ordr"				, row.getParameter("cutt_ordr"				))  /*  절단순서  */
				.update("cutt_leng"				, row.getParameter("cutt_leng"				))  /*  절단길이  */
				.update("cutt_hght"				, row.getParameter("cutt_hght"				))  /*  절단높이  */
				.update("sync_cutt_qntt"		, row.getParameter("sync_cutt_qntt"			))  /*  동시절단수  */
				.update("ctbr_aset_qntt"		, row.getParameter("ctbr_aset_qntt"			))  /*  절단바SET수  */
				.update("pnbr_yorn"				, row.getParameter("pnbr_yorn"				))  /*  판넬바유무  */
				.update("item_widh"				, row.getParameter("item_widh"				))  /*  품목폭  */
				.update("item_hght"				, row.getParameter("item_hght"				))  /*  품목높이  */
				.update("item_leng"				, row.getParameter("item_leng"				))  /*  품목길이  */
				.update("ydge_used_yorn"		, row.getParameter("ydge_used_yorn"			))  /*  자투리사용여부  */
				.update("wdbf_cncs_type"		, row.getParameter("wdbf_cncs_type"			))  /*  BF체결타입  */
				.update("film_dctn_proc"		, row.getParameter("film_dctn_proc"			))  /*  필름사전가공  */
				.update("hndl_incl_yorn"		, row.getParameter("hndl_incl_yorn"			))  /*  핸들포함여부  */
				.update("hndl_hght"				, row.getParameter("hndl_hght"				))  /*  핸들높이  */
				.update("clee_incl_yorn"		, row.getParameter("clee_incl_yorn"			))  /*  크리센트포함여부  */
				.update("clee_hght"				, row.getParameter("clee_hght"				))  /*  크리센트높이  */
				.update("hdho_type_dvcd"		, row.getParameter("hdho_type_dvcd"			))  /*  핸드홀타입구분코드  */
				.update("hdho_1pcs_hght"		, row.getParameter("hdho_1pcs_hght"			))  /*  핸드홀1P높이  */
				.update("hdho_2pcs_hght"		, row.getParameter("hdho_2pcs_hght"			))  /*  핸드홀2P높이  */
				.update("hdho_hght_grip_1fst"	, row.getParameter("hdho_hght_grip_1fst"	))  /*  핸드홀높이그립1  */
				.update("hdho_hght_grip_2snd"	, row.getParameter("hdho_hght_grip_2snd"	))  /*  핸드홀높이그립2  */
				.update("hdho_qntt"				, row.getParameter("hdho_qntt"				))  /*  핸드홀수  */
				.update("hdho_itvl"				, row.getParameter("hdho_itvl"				))  /*  핸드홀간격  */
				.update("hdho_pass_yorn"		, row.getParameter("hdho_pass_yorn"			))  /*  핸드홀관통여부  */
				.update("lkho_incl_yorn"		, row.getParameter("lkho_incl_yorn"			))  /*  락킹홀포함여부  */
				.update("lkho"					, row.getParameter("lkho"					))  /*  락킹홀  */
				.update("lkho_1pcs_widh"		, row.getParameter("lkho_1pcs_widh"			))  /*  락킹홀1P폭  */
				.update("lkho_1pcs_leng"		, row.getParameter("lkho_1pcs_leng"			))  /*  락킹홀1P길이  */
				.update("lkho_2pcs_widh"		, row.getParameter("lkho_2pcs_widh"			))  /*  락킹홀2P폭  */
				.update("lkho_2pcs_leng"		, row.getParameter("lkho_2pcs_leng"			))  /*  락킹홀2P길이  */
				.update("lkho_plac_cpsn"		, row.getParameter("lkho_plac_cpsn"			))  /*  락킹홀위치보정  */
				.update("lkho_grip_leng_1fst"	, row.getParameter("lkho_grip_leng_1fst"	))  /*  락킹홀그립길이1  */
				.update("rnpc_incl_yorn"		, row.getParameter("rnpc_incl_yorn"			))  /*  고리펀칭포함여부  */
				.update("rnpc_plac"				, row.getParameter("rnpc_plac"				))  /*  고리펀칭위치  */
				.update("rnpc_widh_1fst"		, row.getParameter("rnpc_widh_1fst"			))  /*  고리펀칭폭1  */
				.update("rnpc_widh_2snd"		, row.getParameter("rnpc_widh_2snd"			))  /*  고리펀칭폭2  */
				.update("omhd_hole_incl_yorn"	, row.getParameter("omhd_hole_incl_yorn"	))  /*  오목핸들홀포함여부  */
				.update("omhd_plac"				, row.getParameter("omhd_plac"				))  /*  오목핸들위치  */
				.update("omhd_widh"				, row.getParameter("omhd_widh"				))  /*  오목핸들폭  */
				.update("omhd_leng"				, row.getParameter("omhd_leng"				))  /*  오목핸들길이  */
				.update("omhd_hght"				, row.getParameter("omhd_hght"				))  /*  오목핸들높이  */
				.update("rolr_incl_yorn"		, row.getParameter("rolr_incl_yorn"			))  /*  롤러포함여부  */
				.update("rolr_name"				, row.getParameter("rolr_name"				))  /*  롤러명  */
				.update("rlho_cutt_angl"		, row.getParameter("rlho_cutt_angl"			))  /*  롤러홀절단각도  */
				.update("rlho_incl_yorn"		, row.getParameter("rlho_incl_yorn"			))  /*  롤러홀포함여부  */
				.update("rlho_strt_1pcs"		, row.getParameter("rlho_strt_1pcs"			))  /*  롤러홀시작1P  */
				.update("midl_rolr_name"		, row.getParameter("midl_rolr_name"			))  /*  중간롤러명  */
				.update("rlho_strt_plac"		, row.getParameter("rlho_strt_plac"			))  /*  롤러홀시작위치  */
				.update("rlho_1pcs_widh"		, row.getParameter("rlho_1pcs_widh"			))  /*  롤러홀1P폭  */
				.update("rlho_1pcs_leng"		, row.getParameter("rlho_1pcs_leng"			))  /*  롤러홀1P길이  */
				.update("rlho_strt_2pcs"		, row.getParameter("rlho_strt_2pcs"			))  /*  롤러홀시작2P  */
				.update("rlho_2pcs_widh"		, row.getParameter("rlho_2pcs_widh"			))  /*  롤러홀2P폭  */
				.update("rlho_2pcs_leng"		, row.getParameter("rlho_2pcs_leng"			))  /*  롤러홀2P길이  */
				.update("rlho_strt_3pcs"		, row.getParameter("rlho_strt_3pcs"			))  /*  롤러홀시작3P  */
				.update("rlho_3pcs_widh"		, row.getParameter("rlho_3pcs_widh"			))  /*  롤러홀3P폭  */
				.update("rlho_3pcs_leng"		, row.getParameter("rlho_3pcs_leng"			))  /*  롤러홀3P길이  */
				.update("midl_rolr_strt"		, row.getParameter("midl_rolr_strt"			))  /*  중간롤러시작  */
				.update("midl_rolr_leng"		, row.getParameter("midl_rolr_leng"			))  /*  중간롤러길이  */
				.update("rail_open_itvl"		, row.getParameter("rail_open_itvl"			))  /*  레일개공간격  */
				.update("rail_zero_yorn"		, row.getParameter("rail_zero_yorn"			))  /*  레일0여부  */
				.update("rail_1fst_yorn"		, row.getParameter("rail_1fst_yorn"			))  /*  레일1여부  */
				.update("rail_2snd_yorn"		, row.getParameter("rail_2snd_yorn"			))  /*  레일2여부  */
				.update("rail_midl_yorn"		, row.getParameter("rail_midl_yorn"			))  /*  레일중간여부  */
				.update("rail_3trd_yorn"		, row.getParameter("rail_3trd_yorn"			))  /*  레일3여부  */
				.update("rail_4frt_yorn"		, row.getParameter("rail_4frt_yorn"			))  /*  레일4여부  */
				.update("midl_rolr_incl_yorn"	, row.getParameter("midl_rolr_incl_yorn"	))  /*  중간롤러포함여부  */
				.update("flps_mkng_incl_yorn"	, row.getParameter("flps_mkng_incl_yorn"	))  /*  필링피스마킹포함여부  */
				.update("flps_plac"				, row.getParameter("flps_plac"				))  /*  필링피스위치  */
				.update("flps_plac_2snd"		, row.getParameter("flps_plac_2snd"			))  /*  필링피스위치2  */
				.update("rein_incl_yorn"		, row.getParameter("rein_incl_yorn"			))  /*  보강재포함여부  */
				.update("rein_leng"				, row.getParameter("rein_leng"				))  /*  보강재길이  */
				.update("rein_tick"				, row.getParameter("rein_tick"				))  /*  보강재두께  */
				.update("rein_topp_cncs_yorn"	, row.getParameter("rein_topp_cncs_yorn"	))  /*  보강재상부체결여부  */
				.update("rein_plac_1fst"		, row.getParameter("rein_plac_1fst"			))  /*  보강재위치1  */
				.update("rein_plac_2snd"		, row.getParameter("rein_plac_2snd"			))  /*  보강재위치2  */
				.update("rein_plac_3trd"		, row.getParameter("rein_plac_3trd"			))  /*  보강재위치3  */
				.update("hair_incl_yorn"		, row.getParameter("hair_incl_yorn"			))  /*  모헤어포함여부  */
				.update("mult_hole_yorn"		, row.getParameter("mult_hole_yorn"			))  /*  배수홀여부  */
				.update("open_widh"				, row.getParameter("open_widh"				))  /*  개공폭  */
				.update("scrn_wthl_yorn"		, row.getParameter("scrn_wthl_yorn"			))  /*  스크린물개공여부  */
				.update("mult_stop_stag"		, row.getParameter("mult_stop_stag"			))  /*  배수Stopper단계  */
				.update("tagg_asmt"				, row.getParameter("tagg_asmt"				))  /*  태그부자재  */
				.update("scrw_qntt"				, row.getParameter("scrw_qntt"				))  /*  스크류수  */
				.update("scrw_widh_1fst"		, row.getParameter("scrw_widh_1fst"			))  /*  스크류폭1  */
				.update("scrw_widh_2snd"		, row.getParameter("scrw_widh_2snd"			))  /*  스크류폭2  */
				.update("scrw_widh_3trd"		, row.getParameter("scrw_widh_3trd"			))  /*  스크류폭3  */
				.update("scrw_plac"				, row.getParameter("scrw_plac"				))  /*  스크류위치  */
				.update("ssbr_yorn"				, row.getParameter("ssbr_yorn"				))  /*  SS바유무  */
				.update("rs_yorn"				, row.getParameter("rs_yorn"				))  /*  RS유무  */
				.update("fpfp_mkng_qntt"		, row.getParameter("fpfp_mkng_qntt"			))  /*  FP마킹수  */
				.update("fpfp_plac_3trd"		, row.getParameter("fpfp_plac_3trd"			))  /*  FP위치3  */
				.update("fpfp_plac_4frt"		, row.getParameter("fpfp_plac_4frt"			))  /*  FP위치4  */
				.update("akho_open_yorn_1fst"	, row.getParameter("akho_open_yorn_1fst"	))  /*  앙카홀개공유무1  */
				.update("akho_open_yorn_2snd"	, row.getParameter("akho_open_yorn_2snd"	))  /*  앙카홀개공유무2  */
				.update("akho_widh_1fst"		, row.getParameter("akho_widh_1fst"			))  /*  앙카홀폭1  */
				.update("akho_widh_2snd"		, row.getParameter("akho_widh_2snd"			))  /*  앙카홀폭2  */
				.update("scen_name"				, row.getParameter("scen_name"				))  /*  현장명  */
				.update("wryp_yorn"				, row.getParameter("wryp_yorn"				))  /*  레핑여부  */
				.update("innr_wryp_itid"		, row.getParameter("innr_wryp_itid"			))  /*  내측레핑품목ID  */
				.update("innr_wryp_itnm"		, row.getParameter("innr_wryp_itnm"			))  /*  내측레핑품목명  */
				.update("otsd_wryp_itid"		, row.getParameter("otsd_wryp_itid"			))  /*  외측레핑품목ID  */
				.update("otsd_wryp_itnm"		, row.getParameter("otsd_wryp_itnm"			))  /*  외측레핑품목명  */
				.update("orig_invc_numb"		, row.getParameter("orig_invc_numb"			))  /*  원INVOICE번호  */
				.update("orig_invc_seqn"		, row.getParameter("orig_invc_seqn"			))  /*  원INVOICE순번  */
				.update("brcd_hght"				, row.getParameter("brcd_hght"				))  /*  바코드높이  */
				.update("brcd_plac"				, row.getParameter("brcd_plac"				))  /*  바코드위치  */
				.update("assa_yorn"				, row.getParameter("assa_yorn"				))  /*  아사여부  */
				.update("brcd"					, row.getParameter("brcd"					))  /*  바코드  */
				.update("prts_numb"				, row.getParameter("prts_numb"				))  /*  부품번호  */
				.update("main_vent_yorn"		, row.getParameter("main_vent_yorn"			))  /*  주벤트여부  */
				.update("ctbr_numb"				, row.getParameter("ctbr_numb"				))  /*  절단바번호  */
				.update("rail0_wtho_1"			, row.getParameter("rail0_wtho_1"			))  /*  0레일배수홀위치1  */
				.update("rail0_wtho_2"			, row.getParameter("rail0_wtho_2"			))  /*  0레일배수홀위치2  */
				.update("rail0_wtho_3"			, row.getParameter("rail0_wtho_3"			))  /*  0레일배수홀위치3  */
				.update("rail0_wtho_4"			, row.getParameter("rail0_wtho_4"			))  /*  0레일배수홀위치4  */
				.update("rail0_wtho_5"			, row.getParameter("rail0_wtho_5"			))  /*  0레일배수홀위치5  */
				.update("rail0_wtho_6"			, row.getParameter("rail0_wtho_6"			))  /*  0레일배수홀위치6  */
				.update("rail1_wtho_1"			, row.getParameter("rail1_wtho_1"			))  /*  1레일배수홀위치1  */
				.update("rail1_wtho_2"			, row.getParameter("rail1_wtho_2"			))  /*  1레일배수홀위치2  */
				.update("rail1_wtho_3"			, row.getParameter("rail1_wtho_3"			))  /*  1레일배수홀위치3  */
				.update("rail1_wtho_4"			, row.getParameter("rail1_wtho_4"			))  /*  1레일배수홀위치4  */
				.update("rail1_wtho_5"			, row.getParameter("rail1_wtho_5"			))  /*  1레일배수홀위치5  */
				.update("rail2_wtho_1"			, row.getParameter("rail2_wtho_1"			))  /*  2레일배수홀위치1  */
				.update("rail2_wtho_2"			, row.getParameter("rail2_wtho_2"			))  /*  2레일배수홀위치2  */
				.update("rail2_wtho_3"			, row.getParameter("rail2_wtho_3"			))  /*  2레일배수홀위치3  */
				.update("rail2_wtho_4"			, row.getParameter("rail2_wtho_4"			))  /*  2레일배수홀위치4  */
				.update("rail2_wtho_5"			, row.getParameter("rail2_wtho_5"			))  /*  2레일배수홀위치5  */
				.update("rail3_wtho_1"			, row.getParameter("rail3_wtho_1"			))  /*  3레일배수홀위치1  */
				.update("rail3_wtho_2"			, row.getParameter("rail3_wtho_2"			))  /*  3레일배수홀위치2  */
				.update("rail3_wtho_3"			, row.getParameter("rail3_wtho_3"			))  /*  3레일배수홀위치3  */
				.update("rail3_wtho_4"			, row.getParameter("rail3_wtho_4"			))  /*  3레일배수홀위치4  */
				.update("rail3_wtho_5"			, row.getParameter("rail3_wtho_5"			))  /*  3레일배수홀위치5  */
				.update("rail4_wtho_1"			, row.getParameter("rail4_wtho_1"			))  /*  4레일배수홀위치1  */
				.update("rail4_wtho_2"			, row.getParameter("rail4_wtho_2"			))  /*  4레일배수홀위치2  */
				.update("rail4_wtho_3"			, row.getParameter("rail4_wtho_3"			))  /*  4레일배수홀위치3  */
				.update("rail4_wtho_4"			, row.getParameter("rail4_wtho_4"			))  /*  4레일배수홀위치4  */
				.update("rail4_wtho_5"			, row.getParameter("rail4_wtho_5"			))  /*  4레일배수홀위치5  */
				.update("rail5_wtho_1"			, row.getParameter("rail5_wtho_1"			))  /*  5레일배수홀위치1  */
				.update("rail5_wtho_2"			, row.getParameter("rail5_wtho_2"			))  /*  5레일배수홀위치2  */
				.update("rail5_wtho_3"			, row.getParameter("rail5_wtho_3"			))  /*  5레일배수홀위치3  */
				.update("rail5_wtho_4"			, row.getParameter("rail5_wtho_4"			))  /*  5레일배수홀위치4  */
				.update("rail5_wtho_5"			, row.getParameter("rail5_wtho_5"			))  /*  5레일배수홀위치5  */
				.update("rail5_wtho_6"			, row.getParameter("rail5_wtho_6"			))  /*  5레일배수홀위치6  */
				.update("cofm_yorn"				, row.getParameter("cofm_yorn"				))  /*  확정여부  */
				.update("wtho_plac_1fst"		, row.getParameter("wtho_plac_1fst"			))  /*  배수홀위치1  */
				.update("wtho_plac_2snd"		, row.getParameter("wtho_plac_2snd"			))  /*  배수홀위치2  */
				.update("wtho_plac_3trd"		, row.getParameter("wtho_plac_3trd"			))  /*  배수홀위치3  */
				.update("wtho_plac_4frt"		, row.getParameter("wtho_plac_4frt"			))  /*  배수홀위치4  */
				.update("wtho_plac_5fit"		, row.getParameter("wtho_plac_5fit"			))  /*  배수홀위치5  */







				.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
				.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
				.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
				.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
				.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
				.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
				.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
				.update("find_name"			, row.getParamText("invc_numb"			).trim()
											+ row.getParamText("item_idcd"			).trim()
											+ row.getParamText("remk_text"			).trim())
				.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
				.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
				.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
				.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
				.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
				.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
			;
			data.attach(Action.update);
		}
		data.execute();
		return null;
	}
	public SqlResultMap setCofmDetail3(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String ivst_ordr = "";
		int seqn  =  1;
		for(SqlResultRow row:map) {
			if(row.fixParameter("_set").equals("update")){
				ivst_ordr = row.fixParamText("ivst_ordr");
				if(ivst_ordr.length()==1){
					ivst_ordr = "00"+ivst_ordr;
				}else if (ivst_ordr.length()==2){
					ivst_ordr = "0"+ivst_ordr;
				}

				data.param
					.table("wpror_item_cut")
					.where("where invc_numb = :invc_numb")
					.where("and   assi_seqn = :assi_seqn")
					.where("and   lott_numb = :lott_numb")
					.where("and   item_idcd = :item_idcd")

					.unique("invc_numb",row.fixParameter("invc_numb"))
					.unique("assi_seqn",row.fixParameter("assi_seqn"))
					.unique("lott_numb",row.fixParameter("lott_numb"))
					.unique("item_idcd",row.fixParameter("item_idcd"))

					.update("stnd_abar_leng",row.fixParameter("stnd_abar_leng"))
					.update("ydge_used_yorn",row.fixParameter("ydge_used_yorn"))
					.update("auto_yorn",row.fixParameter("auto_yorn"))
					.update("ivst_ordr", row.fixParameter("ivst_ordr")+"-"+row.fixParamText("chk"))
					.update("cutt_ordr", seqn++)
				;
				data.attach(Action.update);
				data.execute();
			}
		}
		return null;
	}
	public SqlResultMap setCofmCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String param = parse.TranslateGantt(arg, map,"fix_yorn,cofm_dttm","invc_numb");
		data.param
		.query("call cut_plan_fix (	")
		.query("   :param "  , param			)
		.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setOptm(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String param = parse.TranslateGantt(arg, map,"item_idcd,bar_leng,ivst_ordr","invc_numb");
		data.param
			.query("call pfile_optimal_v3 (	")
			.query("   :param "  , param			)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setManual(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String[] ivst_ordr;

		for(SqlResultRow row:map) {
			ivst_ordr = row.fixParamText("ivst_ordr").split("-");

			data.param
				.query("update wpror_item_cut set ivst_ordr = null ")
				.query("where lott_numb = :lott_numb",row.fixParameter("lott_numb"))
				.query("and   item_idcd = :item_idcd", row.fixParameter("item_idcd"))
				.query("and   ivst_ordr like :ivst_ordr%", ivst_ordr[0])
			;
			data.attach(Action.direct);
			data.execute();
		}

		return null;
	}
	public SqlResultMap setRework(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String param = parse.TranslateGantt(arg, map,"fix_yorn","invc_numb");
		data.param
			.query("call wind_item_cut_rework_v1(						")
			.query("     :param ", param								)
			.query(")												")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


	public SqlResultMap setCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc_numb,line_seqn");

		for(SqlResultRow row:map) {
		data.param
			.table("westi_memo")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")
			.where("and   amnd_degr = :amnd_degr ")
			.where("and   assi_seqn = :assi_seqn ")

			.unique("invc_numb"			, row.fixParameter("invc_numb"			))
			.unique("line_seqn"			, row.fixParameter("line_seqn"			))
			.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
			.unique("assi_seqn"			, 1										)

			.update("ispl_name"			, row.getParameter("ispl_name"			))  /*  설치위치명  */
			.update("chge_resn_dvcd"	, row.getParameter("chge_resn_dvcd"		))  /*  변경사유구분코드  */
			.update("chge_resn"			, row.getParameter("chge_resn"			))  /*  변경사유  */
			.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))  /*  담당자ID  */
			.update("rcpt_date"			, row.getParameter("rcpt_date"			))  /*  담당자ID  */
			.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"		))  /*  고객담당자명  */


			.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
			.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
			.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
			.update("line_levl"			, 0										)  /*  ROW레벨  */
			.update("line_ordr"			, 0										)  /*  ROW순서  */
			.update("line_stat"			, 0										)  /*  ROW상태  */
			.update("line_clos"			, 0										)  /*  마감여부  */
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
		;
		data.attach(Action.modify);
		}
		data.execute();


		data.param // 집계문  입력
			.query(" call wind_item_cancel (		")
			.query("  :param	" , result)
			.query(" )								")
		;

		return null;
	}
}
