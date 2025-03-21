package com.sky.system.custom.hantop.sale.estientry2;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.Set;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("hntop.EstiEntry2Service")
public class EstiEntry2Service  extends DefaultServiceHandler {

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
			.where("        , a.crte_idcd          , a.crte_urif          , f.acpt_numb          , a.cstm_name			")
			.where("        , if(b.cnt>0,1,0) as pror_yorn                , a.brnd_bacd									")
			.where("        , ( select base_name from base_mast m where a.brnd_bacd = m.base_code and m.prnt_idcd  = '4000' ) as base_name		")
			.where("        ,  CASE WHEN  ( ifnull(c.cnt,0)-ifnull(d.cnt,0)) = ifnull(c.cnt,0) THEN 					")
			.where("                        '1'																			")
			.where("                WHEN ( ifnull(c.cnt,0)-ifnull(d.cnt,0)) = 0 THEN									")
			.where("                        '3'																			")
			.where("                ELSE																				")
			.where("                        '2'																			")
			.where("           END as cmpl_dvcd																			")
			.where("        , a.cofm_yorn          , substring(a.acpt_cofm_dttm,1,8) as acpt_cofm_dttm					")
			.where("        , a.work_indn_yorn																			")
		;
		data.param
			.where("from westi_mast a																					")
			.where("left outer join wpror_item_cut f on a.invc_numb = f.invc_numb										")
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
			.where("                  and   cmpl_yorn = 1																")
			.where("                  group by invc_numb																")
			.where("                ) d on d.invc_numb = a.invc_numb													")
			.where("left outer join base_mast m on a.brnd_bacd = m.base_code											")
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
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb 																				")
			.where("order by a.invc_numb desc																			")
			.where(") a																									")
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
			.query("       , a.crte_idcd          , a.crte_urif          , a.brnd_bacd          , b.base_name			")
			.query("       , ifnull(a.wdbf_auto_cutt_yorn,'1') as wdbf_auto_cutt_yorn									")
			.query("       , ifnull(a.wdbf_auto_weld_yorn,'1') as wdbf_auto_weld_yorn									")
			.query("       , ifnull(a.wdsf_auto_cutt_yorn,'1') as wdsf_auto_cutt_yorn									")
			.query("       , ifnull(a.wdsf_auto_weld_yorn,'1') as wdsf_auto_weld_yorn									")
			.query("       , a.glss_amnt_incl_yorn, a.vent_plac_dvcd     , a.rpst_wryp_name     , a.wryp_shio_twis		")
			.query("       , a.bycv_incl_yorn     , a.wdbf_incl_yorn     , a.wdsf_incl_yorn     , a.bfrn_incl_yorn		")
			.query("       , a.invc_pric          , a.invc_amnt          , a.wndw_dirt_dvcd     , g.wdgr_name			")
			.query("from   westi_item a																					")
			.query("    left outer join wind_item_modl m on a.brnd_bacd = m.brnd_bacd and a.wndw_modl_idcd = m.wndw_modl_idcd	")
			.query("    left outer join wind_type w on a.wdtp_idcd = w.wdtp_idcd										")
			.query("    left outer join wind_grop g on m.wdgr_idcd = g.wdgr_idcd										")
			.query("    left outer join base_mast b on a.brnd_bacd = b.base_code										")
			.query("where  1=1																							")
			.query("and    b.prnt_idcd  = '4000'																		")
			.query("and    a.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.query("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.line_seqn																				")
		;
		return data.selectForMap();
	}

	//detail 조회
	public SqlResultMap getDetail2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.where("with item_cut as (																				")
			.where("select case a.bfsf_dvcd when 'BFRN' then 'BF보강재'												")
			.where("                        when 'SFRN' then 'SF보강재'												")
			.where("                        when 'MFRN' then 'MF보강재'												")
			.where("                        else  a.bfsf_dvcd end as bfsf_dvcd										")
			.where("     , a.item_idcd																				")
			.where("     , concat(a.bfsf_dvcd,substring(ivst_ordr,1,3)) as  ivst_ordr								")
			.where("     , (select bsmt_leng from wind_pfil_cam r where r.brnd_bacd = a.brnd_bacd and r.item_idcd = a.item_idcd) as bsmt_leng")
			.where("     , count(*)       as cont																	")
			.where("     , sum(cutt_leng) as cutt_leng																")
			.where("     , case a.bfsf_dvcd when 'BF'   then 1														")
			.where("                        when 'SF'   then 2														")
			.where("                        when 'MF'   then 3														")
			.where("                        when 'GB'   then 4														")
			.where("                        when 'MC'   then 5														")
			.where("                        when 'BFRN' then 6														")
			.where("                        when 'SFRN' then 7														")
			.where("                        when 'MFRN' then 8														")
			.where("                        else  9 end as ordr														")
			.where("      , group_concat(cast(cutt_leng as decimal)) as cutt_union									")
			.where("from   wpror_item_cut a																			")
			.where("where  a.acpt_numb	=:acpt_numb			" , arg.getParamText("acpt_numb"))
			.where("and    a.acpt_seqn	=:acpt_seqn			" , arg.getParamText("acpt_seqn"))
			.where("and    bfsf_dvcd not in ('GLSS')																")
			.where("and    ifnull(a.item_idcd,'') <> ''																")
			.where("and    ifnull(a.item_idcd,'') <> '해당없음'															")
			.where("group by a.bfsf_dvcd , a.item_idcd , substring(a.ivst_ordr,1,3)									")
			.where(")																								")
			.where("select if(@v=a.bfsf_dvcd , '',a.bfsf_dvcd) as bfsf_dvcd											")
			.where("     , a.item_idcd																				")
			.where("     , a.bsmt_leng																				")
			.where("     , a.cont																					")
			.where("     , a.cutt_leng																				")
			.where("     , a.cutt_union																				")
			.where("     , a.ordr																					")
			.where("     , @v := a.bfsf_dvcd																		")
			.where("from (																							")
			.where("select a.bfsf_dvcd													")
			.where("     , a.item_idcd																				")
			.where("     , a.bsmt_leng																				")
			.where("     , count(*)       as cont																	")
			.where("     , sum(cutt_leng) as cutt_leng																")
			.where("     , a.ordr																					")
			.where("     , group_concat(cutt_union) as cutt_union													")
			.where("from   item_cut a																				")
		;
		data.param
			.where("group by a.bfsf_dvcd , a.item_idcd , a.bsmt_leng ,a.ordr										")
			.where(") a , (select @v:='') as sub																	")
			.where("order by ordr , item_idcd																		")
		;
	return data.selectForMap();
}

	//Invoice 조회
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb          , a.amnd_degr          , a.esti_date          , a.vald_date			")
			.query("        , a.cstm_esti_numb     , a.ordr_numb          , a.copr_stor_name     , a.drtr_name			")
			.query("        , a.drtr_idcd          , a.scen_addr_1fst     , a.scen_addr_2snd     , a.cont_schd_date		")
			.query("        , a.bsmt_loss_rate     , a.asmt_loss_rate     , a.weld_loss_rate     , a.rein_viss_itvl		")
			.query("        , a.ancr_atch_itvl     , a.atmr_drtr_name     , a.esti_dvcd          , a.remk_text			")
			.query("        , a.user_memo          , a.sysm_memo          , a.prnt_idcd          , a.line_levl			")
			.query("        , a.line_ordr          , a.line_stat          , a.line_clos          , a.find_name			")
			.query("        , a.updt_user_name     , a.updt_ipad          , a.updt_dttm          , a.updt_idcd			")
			.query("        , a.updt_urif          , a.crte_user_name     , a.crte_ipad          , a.crte_dttm			")
			.query("        , a.crte_idcd          , a.crte_urif														")
			.query("        , ifnull(a.esti_trff,0) as esti_trff          , ifnull(a.esti_amnt,0) as esti_amnt			")
			.query("        , ifnull(a.vatx_amnt,0) as vatx_amnt          , ifnull(a.ttsm_amnt,0) as ttsm_amnt			")
			.query("        , a.brnd_bacd as brnd_bacd2                   , b.base_name as base_name2					")
			.query("from westi_mast a																					")
			.query("    left outer join base_mast b on a.brnd_bacd = b.base_code										")
			.query("where  1=1																							")
//			.query("and    b.prnt_idcd  = '4000'																		")
			.query("and    a.invc_numb	= :invc_numb		"	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
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
				.query("       , a.crte_idcd          , a.crte_urif          , a.brnd_bacd          , b.base_name			")
				.query("       , a.wdbf_auto_cutt_yorn, a.wdbf_auto_weld_yorn, a.wdsf_auto_cutt_yorn, a.wdsf_auto_weld_yorn	")
				.query("       , a.glss_amnt_incl_yorn, a.vent_plac_dvcd     , a.rpst_wryp_name     , a.wryp_shio_twis		")
				.query("       , a.bycv_incl_yorn     , a.wdbf_incl_yorn     , a.wdsf_incl_yorn     , a.bfrn_incl_yorn		")
				.query("       , a.wndw_dirt_dvcd     , a.esti_trff          , a.invc_amnt          , g.wdgr_name			")
				.query("from   westi_item a																					")
				.query("    left outer join wind_item_modl m on a.wndw_modl_idcd = m.wndw_modl_idcd							")
				.query("    left outer join wind_type w on a.wdtp_idcd = w.wdtp_idcd										")
				.query("    left outer join wind_grop g on m.wdgr_idcd = g.wdgr_idcd										")
				.query("    left outer join base_mast b on a.brnd_bacd = b.base_code										")
				.query("where  1=1																							")
				.query("and    b.prnt_idcd  = '4000'																		")
				.query("and    a.invc_numb	=:invc_numb2			" , arg.getParamText("invc_numb"))
				.query("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
				.query("order by a.line_seqn																				")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}


	//invoice master 등록/수정/삭제
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);


		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				// master 등록/수정
				data.param
					.table("westi_mast"													)
					.where("where invc_numb = :invc_numb								")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					//
					.update("amnd_degr"			, row.getParameter("amnd_degr"			))
					.update("esti_dvcd"			, row.getParameter("esti_dvcd"			))
					.update("esti_date"			, row.getParameter("esti_date"			))
					.update("brnd_bacd"			, row.getParameter("brnd_bacd2"			))
					.update("vald_date"			, row.getParameter("vald_date"			))
					.update("cstm_esti_numb"	, row.getParameter("cstm_esti_numb"		))
					.update("copr_stor_name"	, row.getParameter("copr_stor_name"		))
					.update("ordr_numb"			, row.getParameter("ordr_numb"			))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))
					.update("drtr_name"			, row.getParameter("drtr_name"			))
					.update("scen_addr_1fst"	, row.getParameter("scen_addr_1fst"		))
					.update("scen_addr_2snd"	, row.getParameter("scen_addr_2snd"		))
					.update("cont_schd_date"	, row.getParameter("cont_schd_date"		))
					.update("bsmt_loss_rate"	, row.getParameter("bsmt_loss_rate"		))
					.update("asmt_loss_rate"	, row.getParameter("asmt_loss_rate"		))
					.update("ancr_atch_itvl"	, row.getParameter("ancr_atch_itvl"		))
					.update("rein_viss_itvl"	, row.getParameter("rein_viss_itvl"		))
					.update("weld_loss_rate"	, row.getParameter("weld_loss_rate"		))
					.update("atmr_drtr_name"	, row.getParameter("atmr_drtr_name"		))
					.update("esti_trff"			, row.getParameter("esti_trff"			))
					.update("esti_amnt"			, row.getParameter("esti_amnt"			))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))
					.update("remk_text"			, row.getParameter("remk_text"			))

					.update("user_memo"			, row.getParameter("user_memo"			))
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))
					.update("line_levl"			, row.getParameter("line_levl"			))
					.update("line_ordr"			, row.getParameter("line_ordr"			))
					.update("line_stat"			, row.getParameter("line_stat"			))
					.update("line_clos"			, row.getParameter("line_clos"			))
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ row.getParamText("ostt_wrhs_idcd"		).trim()
												+ row.getParamText("cstm_idcd"			).trim()
												+ row.getParamText("remk_text"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.update("updt_urif"			, row.getParameter("updt_urif"			))
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.insert("crte_urif"			, row.getParameter("crte_urif"			))
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
		}
	data.execute();
	return null;
	}
	public SqlResultMap setUpDown(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call westi_item_updown(							")
			.query("     :invc_numb, ", arg.getParameter("invc_numb"))
			.query("     :line_seqn, ", arg.getParameter("line_seqn"))
			.query("     :dvcd      ", arg.getParameter("dvcd"))
			.query(")												")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	//invoice detail 등록/수정/삭제
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("westi_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
				data.param
					.table("wind_mtrl_need"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;
				data.attach(rowaction);
			} else {
				//대표품목 찾기
				DataMessage temp = arg.newStorage("POS");
				temp.param
					.query("select a.rpst_item_idcd												")
					.query("from  wind_item_mast a												")
					.query("where a.item_idcd = :item_idcd		", row.getParamText("wndw_modl_idcd"))
				;
				SqlResultRow item = temp.selectForRow();

				// detail 등록/수정
				data.param
					.table("westi_item"													)
					.where("where invc_numb		= :invc_numb							")
					.where("and   amnd_degr		= :amnd_degr							")
					.where("and   line_seqn		= :line_seqn							")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("mcmp_modl_idcd"	, item.getParamText("rpst_item_idcd"	))

					.update("brnd_bacd"			, row.getParameter("brnd_bacd"			))
					.update("esti_trff"			, row.getParameter("esti_trff"			))
					.update("ispl_name"			, row.getParameter("ispl_name"			))
					.update("wndw_modl_idcd"	, row.getParameter("wndw_modl_idcd"		))
					.update("wdsf_rate_name"	, row.getParameter("wdsf_rate_name"		))
					.update("wdgr_idcd"			, row.getParameter("wdgr_idcd"			))
					.update("wdtp_idcd"			, row.getParameter("wdtp_idcd"			))
					.update("invc_qntt"			, row.getParameter("invc_qntt"			))
					.update("wdbf_itid"			, row.getParameter("wdbf_itid"			))
					.update("wdsf_itid"			, row.getParameter("wdsf_itid"			))
					.update("item_widh"			, row.getParameter("item_widh"			))
					.update("item_hght"			, row.getParameter("item_hght"			))
					.update("item_widh_1fst"	, row.getParameter("item_widh_1fst"		))
					.update("item_hght_1fst"	, row.getParameter("item_hght_1fst"		))
					.update("inwp_itid"			, row.getParameter("inwp_itid"			))
					.update("otwp_itid"			, row.getParameter("otwp_itid"			))
					.update("ings_itid"			, row.getParameter("ings_itid"			))
					.update("ings_tick"			, row.getParameter("ings_tick"			))
					.update("otgs_itid"			, row.getParameter("otgs_itid"			))
					.update("otgs_tick"			, row.getParameter("otgs_tick"			))
					.update("ings_fixd_itid"	, row.getParameter("ings_fixd_itid"		))
					.update("otgs_fixd_itid"	, row.getParameter("otgs_fixd_itid"		))
					.update("inhd_left_itid"	, row.getParameter("inhd_left_itid"		))
					.update("inhd_righ_itid"	, row.getParameter("inhd_righ_itid"		))
					.update("othd_left_itid"	, row.getParameter("othd_left_itid"		))
					.update("othd_righ_itid"	, row.getParameter("othd_righ_itid"		))
					.update("moss_incl_yorn"	, row.getParameter("moss_incl_yorn"		))
					.update("mult_hole_yorn"	, row.getParameter("mult_hole_yorn"		))
					.update("moss_itid"			, row.getParameter("moss_itid"			))
					.update("hndl_hght"			, row.getParameter("hndl_hght"			))
					.update("clee_innr"			, row.getParameter("clee_innr"			))
					.update("clee_otsd"			, row.getParameter("clee_otsd"			))
					.update("efcn_grad_dvcd"	, row.getParameter("efcn_grad_dvcd"		))
					.update("vent_plac_dvcd"	, row.getParameter("vent_plac_dvcd"		))
					.update("rpst_wryp_name"	, row.getParameter("rpst_wryp_name"		))
					.update("wryp_shio_twis"	, row.getParameter("wryp_shio_twis"		))
					.update("bycv_incl_yorn"	, row.getParameter("bycv_incl_yorn"		))
					.update("wdbf_incl_yorn"	, row.getParameter("wdbf_incl_yorn"		))
					.update("wdsf_incl_yorn"	, row.getParameter("wdsf_incl_yorn"		))
					.update("bfrn_incl_yorn"	, row.getParameter("bfrn_incl_yorn"		))
					.update("remk_text"			, row.getParameter("remk_text"			))

					.update("glss_amnt_incl_yorn", row.getParameter("glss_amnt_incl_yorn"	))
					.update("wdbf_auto_cutt_yorn", row.getParameter("wdbf_auto_cutt_yorn"	))
					.update("wdbf_auto_weld_yorn", row.getParameter("wdbf_auto_weld_yorn"	))
					.update("wdsf_auto_cutt_yorn", row.getParameter("wdsf_auto_cutt_yorn"	))
					.update("wdsf_auto_weld_yorn", row.getParameter("wdsf_auto_weld_yorn"	))

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
				data.attach(rowaction);
				data.execute();
				data.clear();

			}
		}
	}






	//option 조회
	public SqlResultRow getOption(HttpRequestArgument arg ) throws Exception { // @ReleaseToken  String loginGb
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq+".POS");
			data.param
				.query("call system_option_wind (							")
				.query("    :hqof_idcd " , arg.getParamText("hq_id"))
				.query(")													")
			;
		return data.selectForRow();
	}

	//삭제
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("westi_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}


	//견적복사
	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb		= arg.getParamText("invc_numb") ;
		String hq				= arg.getParamText("hqof_idcd") ;
		String stor				= arg.getParamText("stor_id");
		String dlvy_schd_date	= arg.getParamText("dlvy_schd_date");
		String amnd_degr		= arg.getParamText("amnd_degr");

		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}
		if (amnd_degr.length() == 0) {
			amnd_degr = "null" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.query("call auto_westi_copy (				")
			.query("   :stor      "			, stor				) // stor
			.query(" , :invc_numb "			, invc_numb			) // 주문번호
			.query(" , :amnd_degr "			, amnd_degr			) // amend
			.query(" , :dlvy_schd_date "	, dlvy_schd_date	) // 납기일자
			.query(" , :job_dvcd "			, "copy"			) // 복사여부
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


	//마감, 해지
	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String line_clos	= arg.getParamText("line_clos");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_westi_close (			")
			.query("   :STOR       "  , hq			 )  // 본사코드
			.query(" , :invc_numb  "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_close "  , line_clos 	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	//수주확정 , 취소
	public SqlResultMap setCofm(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb		= arg.getParamText("invc_numb") ;
		String acpt_cofm_dttm	= "";
		String hq				= arg.getParamText("hqof_idcd") ;
		String stor				= arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		if(arg.getParamText("cofm_yorn").equals("1")){
			acpt_cofm_dttm = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		}

		data.param
			.table("westi_mast")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))

			.update("cofm_yorn"		, arg.getParamText("cofm_yorn"))
			.update("acpt_cofm_dttm", acpt_cofm_dttm)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_idcd"		, arg.getParamText("login_id"))
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();

		String result = "";
		ParamToJson parse = new ParamToJson();
		result = parse.TranslateAll(arg);

		data.param
		.query("call westi_to_acpt (		")
		.query("   :param "  ,     result)  // Invoice 번호
		.query(" ) 							")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap setCofmcancel(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb		= arg.getParamText("invc_numb") ;
		String acpt_cofm_dttm	= "";
		String hq				= arg.getParamText("hqof_idcd") ;
		String stor				= arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		if(arg.getParamText("cofm_yorn").equals("1")){
			acpt_cofm_dttm = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		}

		data.param
			.table("westi_mast")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))

			.update("cofm_yorn"		, arg.getParamText("cofm_yorn"))
			.update("acpt_cofm_dttm", acpt_cofm_dttm)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_idcd"		, arg.getParamText("login_id"))
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();

		return null;
	}
	/**
	 * 엑셀등록
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */

	public void setExcel(HttpRequestArgument arg, SqlResultRow item , int line_seqn , String invc_numb) throws Exception {
		DataMessage data = arg.newStorage("POS");
			Set set = item.keySet();
			Iterator itr = set.iterator();
			ArrayList<String> key = new ArrayList<String>();

			while (itr.hasNext()) {
				key.add((String)itr.next());
			}
			data.param
				.table ("excel_upload")
				.where ("where invc_numb = :invc_numb")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"        , invc_numb)
				.unique("line_seqn"        , line_seqn)
			;
			for (int i = 0; i < key.size(); i++) {
				data.param
					.update(key.get(i)       , item.getParameter(key.get(i)))
				;
			}
			data.param
				.update("line_stat"        , 0	)
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

		}

	public SqlResultMap setUploadEsti(HttpRequestArgument arg , String invc_numb) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");
		data.param
			.query("call excel_upload_esti (		")
			.query("   :param "  ,        "{"+"\"invc_numb"+"\""+":"+"\""+invc_numb+"\""+"}")  // Invoice 번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setUploadAmount(HttpRequestArgument arg , String invc_numb) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");
		data.param
			.query("call excel_upload_esti_amount (		")
			.query("   :param "  ,        "{"+"\"invc_numb"+"\""+":"+"\""+invc_numb+"\""+"}")  // Invoice 번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setMain(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		String param = parse.TranslateAll(arg);

		data.param
			.query("call wind_item_cut_main_v1 (	")
			.query("   :param "  , param			)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id") ;
		String invc_numb	= arg.getParamText("invc_numb") ;
		data.param
		.query("call fn_seq_gen_v2 (			")
		.query("   :STOR "   , STOR				)
		.query(" , :table "  , "excel_upload"	)
		.query(" , :invc_numb "  , invc_numb	)
		.query(" ) 								")
		;
		return data.selectForMap();
	}


	public SqlResultMap setAuto(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("westi_item"													)
			.where("where invc_numb		= :invc_numb							")
			.where("and   amnd_degr		= :amnd_degr							")
			.where("and   line_seqn		= :line_seqn							")
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"			))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
			//
			.update("wdbf_auto_cutt_yorn", arg.getParameter("wdbf_auto_cutt_yorn"	))
			.update("wdbf_auto_weld_yorn", arg.getParameter("wdbf_auto_weld_yorn"	))
			.update("wdsf_auto_cutt_yorn", arg.getParameter("wdsf_auto_cutt_yorn"	))
			.update("wdsf_auto_weld_yorn", arg.getParameter("wdsf_auto_weld_yorn"	))

			.update("updt_user_name"	, arg.getParameter("updt_user_name"		))  /*  수정사용자명  */
			.update("updt_ipad"			, arg.getParameter("updt_ipad"			))  /*  수정IP  */
			.update("updt_idcd"			, arg.getParameter("updt_idcd"			))  /*  수정ID  */
			.update("updt_urif"			, arg.getParameter("updt_urif"			))  /*  수정UI  */
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap setCal(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();
		result = translate.TranslateProcedure(arg, "invc_numb");

		data.param
			.query("call wind_mtrl_calc (			")
			.query("   :param "  , result			)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap getBrnd2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_numb       , a.line_seqn       , a.brnd_bacd       , a.wndw_itid      , a.assi_seqn						")
			.query("     , a.wndw_modl_idcd  , a.wndw_name       , a.wdtp_idcd       , a.bfsf_dvcd      , a.acct_bacd						")
			.query("     , a.ivst_item_idcd  , a.ivst_item_name  , a.ivst_item_spec  , a.esnt_dvcd      , a.item_widh						")
			.query("     , a.item_hght       , a.item_tick       , a.calc_frml       , a.need_qntt      , a.puch_cstm_idcd					")
			.query("     , a.puch_pric       , a.esti_pric       , a.loss_rate       , a.loss_qntt      , a.char_itid						")
			.query("     , a.auto_calc_yorn  , a.endd_yorn       , a.sett_yorn       , a.user_memo											")
			.query("     , ( select base_name from base_mast m where a.brnd_bacd = m.base_code and m.prnt_idcd  = '4000' ) as base_name		")
			.query("     , i.modl_name as wndw_name              , t.wdtp_name																					")
			.query("from  wind_mtrl_brnd a																									")
			.query("left outer join wind_item_modl i on a.wndw_modl_idcd = i.wndw_modl_idcd													")
			.query("left outer join wind_type      t on a.wdtp_idcd = t.wdtp_idcd															")
			.query("where 1=1																												")
			.query("and   a.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.query("group by a.brnd_bacd																									")
		;
	return data.selectForMap();
	}

	public SqlResultMap getBrnd(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.brnd_bacd																										")
			.query("     , sum(ifnull(a.need_qntt,0)*ifnull(a.esti_pric,0)) as brnd_amnt													")
			.query("     , ( select base_name from base_mast m where a.brnd_bacd = m.base_code and m.prnt_idcd  = '4000' ) as base_name		")
			.query("from  wind_mtrl_brnd a																									")
			.query("where 1=1																												")
			.query("and   a.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.query("group by a.brnd_bacd																									")
		;
	return data.selectForMap();
	}

	public SqlResultMap getMtrl(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String all = arg.getParamText("all");
		String bf = arg.getParamText("bf");
		String sf = arg.getParamText("sf");
		String mf = arg.getParamText("mf");


		ArrayList<String> str = new ArrayList<String>();

		if(arg.getParamText("all").equals("true")){
			str.add("BF, SF, MF");
		}
		if(arg.getParamText("bf").equals("true")){
			str.add("BF");
		}
		if(arg.getParamText("sf").equals("true")){
			str.add("SF");
		}
		if(arg.getParamText("mf").equals("true")){
			str.add("MF");
		}
		System.out.println(str.size());

		data.param
			.query("select  a.invc_numb       , a.line_seqn         , a.brnd_bacd        , a.wndw_itid								")
			.query("		,    CASE																								")
			.query("                WHEN bfsf_dvcd = 'SF'																			")
			.query("                THEN '짝'																						")
			.query("                WHEN bfsf_dvcd = 'BF'																			")
			.query("                THEN '틀'																						")
			.query("                WHEN bfsf_dvcd = 'MF'																			")
			.query("                THEN '망'																						")
			.query("             END AS dvcd 																						")
			.query("     , a.ivst_item_idcd  , a.ivst_item_name    , a.ivst_item_spec   , a.esnt_dvcd								")
			.query("     , a.calc_frml       , a.need_qntt																			")
			.query("     , ( select base_name from base_mast m where a.brnd_bacd = m.base_code and m.prnt_idcd  = '4000' ) as base_name		")
			.query("from  wind_mtrl_need a																							")
			.query("where 1=1																										")
			.query("and   a.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.query("and   a.line_seqn	=:line_seqn			" , arg.getParamText("line_seqn"))
			.query("and   a.brnd_bacd	=:brnd_bacd			" , arg.getParamText("brnd_bacd"))
		;
		if(!arg.getParamText("all").equals("true")&&str.size()>0){
			data.param
				.where("and a.bfsf_dvcd  in (									")
			;
			for(int i = 0; str.size()>i;i++){
				data.param
					.where(":dvcd"+i, str.get(i));
				;
				if(i!=str.size()-1){
					data.param
						.where(",");
					;
				}
			}
			data.param
				.where(")")
			;
		}

		return data.selectForMap();
	}

	public SqlResultMap getDetail3(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.sbsc_bacd										")
			.query("     , a.sbsc_name      , a.esti_qntt      , a.esti_pric      , a.esti_amnt										")
			.query("     , a.vatx_amnt      , a.ttsm_amnt																			")
			.query("from  westi_sbsc a																								")
			.query("where 1=1																										")
			.query("and   a.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.query("group by a.line_seqn																							")
	;
	return data.selectForMap();
	}

	public SqlResultMap setWbsc(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		int i = 0;

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("westi_sbsc					")
					.where("where invc_numb  = :invc_numb	")
					.where("and   line_seqn  = :line_seqn	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				if(i == 0){
					data.param
						.table("westi_sbsc					")
						.where("where invc_numb		= :invc_numb")		//invoice번호
						.where("and   amnd_degr		= :amnd_degr")		//차수
						.where("and   line_seqn		= :line_seqn")		//순번

						.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
						.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))		//차수
						.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번

						.update("sbsc_bacd"			, row.getParameter("sbsc_bacd"			))
						.update("sbsc_name"			, row.getParameter("sbsc_name"			))
						.update("esti_qntt"			, row.getParameter("esti_qntt"			))
						.update("esti_pric"			, row.getParameter("esti_pric"			))
						.update("esti_amnt"			, row.getParameter("esti_pric"			))
						.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
						.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))

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

					i++;

				}else{
					data.param
						.table("westi_sbsc					")
						.where("where invc_numb		= :invc_numb")		//invoice번호
						.where("and   amnd_degr		= :amnd_degr")		//차수
						.where("and   line_seqn		= :line_seqn")		//순번

						.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
						.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))		//차수
						.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번

						.update("sbsc_bacd"			, row.getParameter("sbsc_bacd"			))
						.update("sbsc_name"			, row.getParameter("sbsc_name"			))
						.update("esti_qntt"			, row.getParameter("esti_qntt"			))
						.update("esti_pric"			, row.getParameter("esti_pric"			))
						.update("esti_amnt"			, row.getParameter("esti_pric"			))
						.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
						.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))

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
				}
			}
		}
		return null ;
	}


	public SqlResultMap getMtrl2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.wndw_itid										")
			.query("     , a.assi_seqn      , a.brnd_bacd      , a.wndw_modl_idcd , b.modl_name										")
			.query("     , a.wdtp_idcd      , a.acct_bacd      , a.bfsf_dvcd      , a.ivst_item_idcd								")
			.query("     , a.ivst_item_name , a.ivst_item_spec , a.esnt_dvcd      , a.esnt_dvcd										")
			.query("     , a.item_widh      , a.item_hght      , a.item_tick      , a.calc_frml										")
			.query("     , a.need_qntt      , a.puch_cstm_idcd , a.puch_pric      , a.esti_pric										")
			.query("     , a.loss_rate      , a.loss_qntt      , t.wdtp_name														")
			.query("     , ( select base_name from base_mast m where a.brnd_bacd = m.base_code and m.prnt_idcd  = '4000' ) as base_name	")
			.query("from  wind_mtrl_need a																							")
			.query("left outer join wind_item_modl b on a.wndw_modl_idcd = b.wndw_modl_idcd											")
			.query("left outer join wind_type t on a.wdtp_idcd = t.wdtp_idcd														")
			.query("where 1=1																										")
			.query("and   a.brnd_bacd	=:brnd_bacd			" , arg.getParamText("brnd_bacd"))
			.query("and   a.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.query("and   a.line_seqn	=:line_seqn			" , arg.getParamText("line_seqn"))
		;
		return data.selectForMap();
	}

	public SqlResultMap setItemCal(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();
		result = translate.TranslateAll(arg);

		System.out.println(result);
		data.param
			.query("call wind_mtrl_calc_v2 (		")
			.query("   :param "  , result			)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap setCalAll(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();
		result = translate.TranslateProcedure(arg, "invc_numb");

		data.param
			.query("call wind_mtrl_calc_invoice (	")
			.query("   :param "  , result			)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap setEsti(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();
		result = translate.TranslateProcedure(arg, "invc_numb");

		System.out.println(result);
		data.param
			.query("call wind_mtrl_calc_brand (		")
			.query("   :param "  , result			)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}

}
