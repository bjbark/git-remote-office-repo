package com.sky.system.custom.hantop.prod.order.prodorder2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.poi.ss.formula.functions.Replace;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("hantop.ProdOrder2Service")
public class ProdOrder2Service  extends DefaultServiceHandler {

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
			.where("select    a.invc_date          , a.invc_numb          , a.plan_date          , a.lott_numb			")
			.where("        , a.otmz_dttm          , ifnull(a.cofm_yorn, 0) as cofm_yorn         , ifnull(a.otmz_yorn, 0) as otmz_yorn")
			.where("        , a.wdbf_item_qntt     , a.wdbf_cutt_qntt     , a.wdbf_ndqt_ttsm     , a.wdbf_bsmt_leng		")
			.where("        , a.wdbf_bsmt_ndqt     , a.wdsf_item_qntt     , a.wdsf_cutt_qntt							")
			.where("        , round(a.wdbf_efcn, 2) as wdbf_efcn          , round(a.wdsf_efcn, 2) as wdsf_efcn			")
			.where("        , a.wdsf_ndqt_ttsm     , a.wdsf_bsmt_leng     , a.wdsf_bsmt_ndqt							")
			.where("        , a.user_memo          , a.sysm_memo          , a.prnt_idcd          , a.line_levl			")
			.where("        , a.line_ordr          , a.line_stat          , a.line_clos          , a.find_name			")
			.where("        , a.updt_user_name     , a.updt_ipad          , a.updt_dttm          , a.updt_idcd			")
			.where("        , a.updt_urif          , a.crte_user_name     , a.crte_ipad          , a.crte_dttm			")
			.where("        , a.crte_idcd          , a.crte_urif														")
			.where("from cut_plan_mast a																				")
			.where("where  1=1																							")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"  ))
			.where("and    a.plan_date  >= :plan_date1		" , arg.getParamText("plan_date1" ))
			.where("and    a.plan_date  <= :plan_date2		" , arg.getParamText("plan_date2" ))
			.where("and    a.line_stat  = :line_stat		" , arg.getParamText("line_stat"  ))
			.where("and    a.line_stat  < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		if(arg.getParamText("chk").equalsIgnoreCase("on")){
			data.param
				.where("and    a.cofm_yorn =  1")
			;
		}
		data.param
			.where("order by a.plan_date desc limit 1000000000 ) a														")
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
			.query("       , a.wndw_dirt_dvcd     , b.cont_schd_date     , b.scen_addr_1fst     , b.cstm_esti_numb		")
			.query("       , b.vald_date          , b.copr_stor_name     , b.cofm_dttm          , b.ordr_numb			")
			.query("       , b.scen_addr_2snd																			")
		;
		data.param
			.where("from   cut_plan_item x																				")
			.where("    left outer join westi_item a on x.acpt_numb = a.invc_numb and x.acpt_seqn = a.line_seqn			")
			.where("    left outer join westi_mast b on a.invc_numb = b.invc_numb										")
			.where("    left outer join wind_item_modl m on a.wndw_modl_idcd = m.wndw_modl_idcd							")
			.where("    left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code	")
			.where("    left outer join wind_type w on a.wdtp_idcd = w.wdtp_idcd										")
			.where("where  1=1																							")
			.where("and    x.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.where("and    x.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by x.line_seqn																				")
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String a = arg.getParamText("invc_numb");
		String [] invc = a.split(",");

		data.param
			.query("select   distinct a.acpt_numb, a.invc_numb					")
		;
		data.param
			.where("from   cut_plan_item a										")
			.where("where  1=1													")
		;
		if(!invc[0].equals("")){
			data.param
				.where("and a.invc_numb  in (									")
			;
			for(int i = 0; invc.length>i;i++){
				data.param
					.where(":a"+i, invc[i]);
				;
				if(i!=invc.length-1){
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
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		return data.selectForMap();
	}

	//detail 조회
	public SqlResultMap getDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
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
			.where("and    a.line_seqn	= :line_seqn			" , arg.getParamText("line_seqn"))
			.where("and    a.auto_yorn	= :auto_yorn			" , arg.getParamText("auto_yorn"))
			.where("and    a.cmpl_yorn	= :cmpl_yorn			" , arg.getParamText("cmpl_yorn"))
			.where("and    a.bfsf_dvcd	like %:rn_dvcd%			" , arg.getParamText("rn_dvcd"))
			.where("and    a.bfsf_dvcd	= :bfsf_dvcd			" , arg.getParamText("bfsf_dvcd"))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn, a.assi_seqn																								")
			.where(") a																																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setOptm(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String p = "";
		StringBuffer sb = new StringBuffer();
		String param = parse.TranslateGantt(arg, map,"run_mode","invc_numb,plan_date");
		sb.append(param);

		if(arg.getParamText("run_mode").equals("")){
			p = "\"run_mode\":\"\"";
			sb.insert(1, p);
		}

		data.param
			.query("call pfile_optimal_v4 (				")
			.query("   :param "  , sb					)
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");

		temp.param
			.query("select  acpt_numb, acpt_seqn		")
			.where("from    cut_plan_item				")
			.where("where   invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;

		SqlResultMap a = temp.selectForMap();
		temp.clear();

		for(SqlResultRow row : a){
			data.param
				.table("westi_item													")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"			, row.getParamText("acpt_numb"))
				.unique("line_seqn"			, row.getParamText("acpt_seqn"))

				.update("pdsd_yorn"			, 0										)
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}

		data.param
			.table("cut_plan_item")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("cut_plan_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();


		return null;
	}

	public SqlResultMap setCofm(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String p = "";
		StringBuffer sb = new StringBuffer();
		String param = parse.TranslateGantt(arg, map,"fix_yorn","invc_numb");
		sb.append(param);

		if(arg.getParamText("cofm_dttm") != ""){
			p = "\"cofm_dttm\":\""+arg.getParamText("cofm_dttm")+"\", ";
			sb.insert(1, p);
		}

		String fix = arg.getParamText("fix_yorn");

		for(SqlResultRow row : map){
			data.param
				.table("cut_plan_mast")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"	, row.getParamText("orig_invc"))
			;
			if(fix.equals("1")){
				data.param
					.update("cofm_yorn"	, 1)
				;
			}else{
				data.param
					.update("cofm_yorn"	, 0)
				;
			}
			data.attach(Action.update);
			data.execute();
		}

		data.param
			.query("call cut_plan_fix		 (			")
			.query("   :param "  , sb					)
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}


	public SqlResultMap getCutPlan2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*")
		;
		data.param
			.where("from (																								")
			.where("select   a.invc_numb          , a.amnd_degr          , a.line_seqn          , b.cstm_esti_numb		")
			.where("       , b.copr_stor_name     , b.vald_date          , b.cont_schd_date     , a.moss_itid			")
			.where("       , b.scen_addr_1fst     , b.scen_addr_2snd     , a.invc_qntt          , a.wdsf_rate_name		")
			.where("       , a.ispl_name          , a.wndw_modl_idcd     , m.modl_name          , a.wdbf_itid			")
			.where("       , a.wdsf_itid          , a.wdtp_idcd          , w.wdtp_name          , a.item_widh			")
			.where("       , a.item_hght          , a.item_widh_1fst     , a.item_hght_1fst     , a.inwp_itid			")
			.where("       , a.otwp_itid          , a.ings_tick          , a.otgs_tick          , a.ings_itid			")
			.where("       , a.wndw_dirt_dvcd																			")
		;
		data.param
			.where("from   westi_item a																					")
			.where("    left outer join westi_mast     b on a.invc_numb = b.invc_numb									")
			.where("    left outer join wind_item_modl m on a.wndw_modl_idcd = m.wndw_modl_idcd							")
			.where("    left outer join wind_type      w on a.wdtp_idcd = w.wdtp_idcd									")
			.where("where  1=1																							")
			.where("and   ifnull(a.ndqt_calc_yorn,0) = '1'																")
			.where("and   ifnull(a.pdsd_yorn,0) = '0'																	")
			.where("and   ifnull(a.pdsd_fxyn,0) = '0'																	")
			.where("and   a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb, a.line_seqn																	")
			.where(") a																									")
		;
		return data.selectForMap();
	}

	public SqlResultMap setPlan(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		int i = 0;

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("cut_plan_item					")
					.where("where invc_numb  = :invc_numb	")
					.where("and   acpt_numb  = :acpt_numb	")
					.where("and   acpt_seqn  = :acpt_seqn	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("acpt_numb"			, row.fixParameter("acpt_numb"		))
					.unique("acpt_seqn"			, row.fixParameter("acpt_seqn"		))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("westi_item													")
					.where("where invc_numb = :acpt_numb								")
					.where("and   line_seqn = :acpt_seqn								")

					.unique("acpt_numb"			, row.fixParameter("acpt_numb"			))
					.unique("acpt_seqn"			, row.fixParameter("acpt_seqn"			))

					.update("pdsd_yorn"			, 0										)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.query("select  count(*) as cnt ")
					.where("from    cut_plan_item")
					.where("where   invc_numb = :invc_numb",row.fixParameter("invc_numb"))
				;
				float chk = Float.parseFloat(data.selectForMap().get(0).getParamText("cnt"));
				data.clear();

				if(chk == 0){
					data.param
						.table("cut_plan_mast					")
						.where("where invc_numb  = :invc_numb	")

						.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}
			} else {
				if(i == 0){
					data.param
						.table("cut_plan_mast												")
						.where("where invc_date = :invc_date								")		//invoice날짜
						.where("and   invc_numb = :invc_numb								")		//invoice번호

						.unique("invc_date"			, row.fixParameter("invc_date"			))
						.unique("invc_numb"			, row.fixParameter("invc_numb"			))

						.update("plan_date"			, row.getParameter("plan_date"			))
						.update("lott_numb"			, row.getParameter("lott_numb"			))

						.update("updt_idcd"			, row.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("cut_plan_item					")
						.where("where invc_numb		= :invc_numb")		//invoice번호
						.where("and   line_seqn		= :line_seqn")		//순번

						.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
						.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번

						.update("acpt_numb"			, row.getParameter("acpt_numb"			))
						.update("acpt_amnd_degr"	, row.getParameter("acpt_amnd_degr"		))
						.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))
						.update("acpt_qntt"			, row.getParameter("acpt_qntt"			))
						.update("lott_numb"			, row.getParameter("lott_numb"			))
						.update("ispl_name"			, row.getParameter("ispl_name"			))
						.update("wdbf_itid"			, row.getParameter("wdbf_itid"			))
						.update("wdbf_cutt_qntt"	, row.getParameter("wdbf_cutt_qntt"		))
						.update("wdbf_ndqt_ttsm"	, row.getParameter("wdbf_ndqt_ttsm"		))
						.update("wdbf_bsmt_leng"	, row.getParameter("wdbf_bsmt_leng"		))
						.update("wdbf_bsmt_ndqt"	, row.getParameter("wdbf_bsmt_ndqt"		))
						.update("wdbf_efcn"			, row.getParameter("wdbf_efcn"			))
						.update("wdsf_itid"			, row.getParameter("wdsf_itid"			))
						.update("wdsf_cutt_qntt"	, row.getParameter("wdsf_cutt_qntt"		))
						.update("wdsf_ndqt_ttsm"	, row.getParameter("wdsf_ndqt_ttsm"		))
						.update("wdsf_bsmt_leng"	, row.getParameter("wdsf_bsmt_leng"		))
						.update("wdsf_bsmt_ndqt"	, row.getParameter("wdsf_bsmt_ndqt"		))
						.update("wdsf_efcn"			, row.getParameter("wdsf_efcn"			))
						.update("prod_trst_numb"	, row.getParameter("prod_trst_numb"		))
						.update("prod_trst_seqn"	, row.getParameter("prod_trst_seqn"		))

						.update("updt_idcd"			, row.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("westi_item													")
						.where("where invc_numb = :invc_numb								")
						.where("and   line_seqn = :line_seqn								")

						.unique("invc_numb"			, row.fixParameter("acpt_numb"			))
						.unique("line_seqn"			, row.fixParameter("acpt_seqn"			))

						.update("pdsd_yorn"			, 1										)
					;
					data.attach(Action.update);
					data.execute();
					data.clear();

					i++;

				}else{
					data.param
						.table("cut_plan_item					")
						.where("where invc_numb		= :invc_numb")		//invoice번호
						.where("and   line_seqn		= :line_seqn")		//순번

						.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
						.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번

						.update("acpt_numb"			, row.getParameter("acpt_numb"			))
						.update("acpt_amnd_degr"	, row.getParameter("acpt_amnd_degr"		))
						.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))
						.update("acpt_qntt"			, row.getParameter("acpt_qntt"			))
						.update("lott_numb"			, row.getParameter("lott_numb"			))
						.update("ispl_name"			, row.getParameter("ispl_name"			))
						.update("wdbf_itid"			, row.getParameter("wdbf_itid"			))
						.update("wdbf_cutt_qntt"	, row.getParameter("wdbf_cutt_qntt"		))
						.update("wdbf_ndqt_ttsm"	, row.getParameter("wdbf_ndqt_ttsm"		))
						.update("wdbf_bsmt_leng"	, row.getParameter("wdbf_bsmt_leng"		))
						.update("wdbf_bsmt_ndqt"	, row.getParameter("wdbf_bsmt_ndqt"		))
						.update("wdbf_efcn"			, row.getParameter("wdbf_efcn"			))
						.update("wdsf_itid"			, row.getParameter("wdsf_itid"			))
						.update("wdsf_cutt_qntt"	, row.getParameter("wdsf_cutt_qntt"		))
						.update("wdsf_ndqt_ttsm"	, row.getParameter("wdsf_ndqt_ttsm"		))
						.update("wdsf_bsmt_leng"	, row.getParameter("wdsf_bsmt_leng"		))
						.update("wdsf_bsmt_ndqt"	, row.getParameter("wdsf_bsmt_ndqt"		))
						.update("wdsf_efcn"			, row.getParameter("wdsf_efcn"			))
						.update("prod_trst_numb"	, row.getParameter("prod_trst_numb"		))
						.update("prod_trst_seqn"	, row.getParameter("prod_trst_seqn"		))

						.update("updt_idcd"			, row.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("westi_item													")
						.where("where invc_numb = :invc_numb								")
						.where("and   line_seqn = :line_seqn								")

						.unique("invc_numb"			, row.fixParameter("acpt_numb"			))
						.unique("line_seqn"			, row.fixParameter("acpt_seqn"			))

						.update("pdsd_yorn"			, 1										)
					;
					data.attach(Action.update);
					data.execute();
					data.clear();
				}

			}
		}
		return null ;
	}

}
