package com.sky.system.custom.dehansol.stock.isos.saleostt;


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
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("dehansol.SaleOsttService")
public class SaleOsttService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select    i.invc_numb       , i.amnd_degr       , i.bzpl_idcd         , i.invc_date					")
			.where("		, i.ordr_dvcd       , i.orig_invc_numb  , i.expt_dvcd         , i.pcod_numb					")
			.where("		, a.deli_date       , i.cstm_idcd       , i.mdtn_prsn         , i.cont_date					")
			.where("		, i.drtr_idcd       , i.dept_idcd       , i.crny_dvcd         , i.excg_rate					")
			.where("		, i.ostt_wrhs_idcd  , i.trut_dvcd       , i.dlvy_cond_dvcd    , i.crdt_exce_yorn			")
			.where("		, i.amnt_lack_yorn  , i.sale_stor_yorn  , i.remk_text         , i.memo						")
			.where("		, i.cofm_yorn       , i.cofm_dttm       , i.cofm_drtr_idcd    , i.acpt_stat_dvcd			")
			.where("		, i.user_memo       , i.sysm_memo       , i.prnt_idcd         , i.line_levl					")
			.where("		, i.line_ordr       , i.line_stat       , i.line_clos         , i.find_name					")
			.where("		, i.updt_user_name  , i.updt_ipad       , c.cstm_name										")
			.where("		, i.updt_idcd       , i.crte_dttm															")
			.where("		, i.updt_urif       , i.crte_user_name  , i.crte_ipad										")
			.where("		, i.crte_idcd       , i.crte_urif       , i.cstm_drtr_name									")
			.where("		, d.user_name as drtr_name																	")
			.where("		, w.wrhs_code       , w.wrhs_name															")
			.where("		, a.cstm_offr_date  , a.cstm_lott_numb  , a.item_idcd         , a.cstm_deli_date			")
			.where("		, t.item_name       , a.invc_qntt       , a.invc_pric         , a.sply_amnt					")
			.where("		, a.deli_chge_resn  , a.line_seqn       , t.item_spec         , t.item_code					")
			.where("		, (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli		")
			.where("		, (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli		")
			.where("		, IFNULL(invc_qntt,0)-IFNULL(ostt_qntt,0) as upid_qntt        , t.modl_name					")
			.where("		, s.fixt_type_dvcd  , s.puch_reqt_numb  , s.puch_reqt_date    , s.chit_elec_date			")
			.where("		, s.tool_numb       , s.film_numb       , s.film_kind_dvcd    , s.film_name					")
			.where("		, s.plmk_numb       , s.plmk_kind_code  , s.mesh_bacd         , s.mesh_type_dvcd			")
			.where("		, s.jigg_code       , s.jigg_grup_code  , s.bbtt_jigg_type    , s.cstm_prod_numb			")
			.where("		, s.cstm_modl_name  , s.revs_numb       , s.mtrl_name         , s.cstm_name as cstm_name2	")
			.where("		, s.pdgr            , s.strt_flor       , s.endd_flor         , s.xscl						")
			.where("		, s.yscl            , s.wkct_code       , s.wkct_name         , s.indv_qntt					")
			.where("		, s.hole_diam       , s.hpjg_proc_mthd  , s.prjg_proc_mthd    , s.yval_cetr					")
			.where("		, s.bbtt_pont       , s.jgup_qntt       , s.hole_qntt         , s.brcd						")
			.where("		, s.full_angl       , s.tens_from       , s.tens_util         , s.wkly_1fst					")
			.where("		, s.wkly_2snd       , s.spmr_hold_yorn  , s.spmr_acpt_dttm    , s.spmr_acpt_offe			")
			.where("		, b1.base_name as mesh_bacd_name        , s.film_acpt_yorn    , s.film_acpt_offe			")
			.where("		, s.plmk_kind_name  , s.updt_dttm       , s.levl_publ_yorn    , s.film_acpt_dttm			")
			.where("		, s.tool_revs       , s.fixt_code       , s.trst_name         , s.dict_dvsn_name			")
			.where("		, s.prcs_type       , s.sufc_dvcd       , s.istt_qntt         , s.base_unit					")
			.where("		, s.make_entr_name  , s.nwol_dvsn_name  , s.olmt_tick         , s.norm_yorn					")
			.where("		, s.otod_istt_cstm  , s.mcmp_istt_cstm  , s.mesh_name         , s.cstm_code					")
			.where("		, s.plmk_size       , s.wkct_ordr       , b2.base_name as plmk_kind_name2					")
			.where("		, REPLACE(json_extract(a.json_data, '$.rpst_item_idcd'),'\"','') as rpst_item_idcd			")
			.where("		, p. plmk_size_horz , p.plmk_size_vrtl  , p.dict_yorn										")
			.where("from   acpt_item a																					")
			.where("left   outer join acpt_mast         i  on a.invc_numb = i.invc_numb									")
			.where("left   outer join acpt_spec_dehan   s  on a.invc_numb = s.invc_numb									")
			.where("left   outer join cstm_mast         c  on i.cstm_idcd = c.cstm_idcd									")
			.where("left   outer join user_mast         d  on i.drtr_idcd = d.user_idcd									")
			.where("left   outer join wrhs_mast         w  on i.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join item_mast         t  on a.item_idcd = t.item_idcd									")
			.where("left   outer join base_mast        b1  on s.mesh_bacd = b1.base_code and b1.prnt_idcd = '3101'		")
			.where("left   outer join base_mast        b2  on s.plmk_kind_code = b2.base_code and b2.prnt_idcd = '3104'	")
			.where("left   outer join sale_pric         p  on a.item_idcd = p.item_idcd									")
			.where(",(select @curRank:=0) r																				")
			.where("where  1=1																							")
			.where("and    ifnull(i.ordr_dvcd,0) != '4000'																")
			.where("and    a.ostt_indn_numb   =  :ostt_indn_numb	" , arg.getParameter("barcode_pono"))
			.where("and    a.line_stat  like '%0%'					" , "0".equals(arg.getParamText("line_stat")))		//삭제여부 아니오
			.where("and    a.line_stat  like '%2%'					" , "2".equals(arg.getParamText("line_stat")))		//삭제여부 예
			.where("and    i.line_clos like '%1%'					" , "1".equals(arg.getParamText("line_clos")))		//마감
			.where("and    i.line_clos like '%0%'					" , "2".equals(arg.getParamText("line_clos")))		//정상
			.where("and    i.line_clos like '%%'					" , "3".equals(arg.getParamText("line_clos")))		//전체
			.where("order by i.invc_date desc , a.invc_numb asc														")
			.where(") a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/*
	 * 출고
	 */

	public SqlResultMap setRelease(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		System.out.println(arg.getParamText("param"));
		data.param
			.query("call acpt_to_ostt (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setReleaseCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		System.out.println(arg.getParamText("param"));
		data.param
			.query("call acpt_to_cancel (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


}
