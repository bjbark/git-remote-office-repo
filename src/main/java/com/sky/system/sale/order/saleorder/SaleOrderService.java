package com.sky.system.sale.order.saleorder;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class SaleOrderService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		if(arg.getParamText("stor_id").toUpperCase().equals("N1000HNTOP1000")){
			data.param
				.query("select a.*																						")
			;
			data.param
				.where("from (																							")
				.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
				.where("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
				.where("		, i.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
				.where("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd									")
				.where("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
				.where("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
				.where("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
				.where("		, i.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
				.where("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
				.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
				.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
				.where("		, a.crte_idcd       , a.crte_urif       , a.cstm_drtr_name    , i.line_seqn				")
				.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
				.where("		, w.wrhs_code       , w.wrhs_name       , i.pdsd_yorn         , z.sale_amnt				")
				.where("		, i.item_idcd       , z.ostt_qntt       , i.invc_amnt									")
				.where("		, i.invc_qntt       , i.invc_pric       , bs.base_name as mtrl_name    , ims.spec_horz	")
				.where("		, ims.spec_vrtl     , ims.spec_tick     , ims.bath_qntt       , ims.colr_ccnt			")
				.where("		, ims.liqu_type     , ims.fabc_widh     , ims.proc_bacd       , ims.nutc_valu			")
				.where("		, ims.hole_yorn     , ims.stnd_yorn     , ims.uppr_open_yorn  , ims.lwrp_open_yorn		")
				.where("		, ims.left_open_yorn, ims.righ_open_yorn, ims.zipr_yorn       , ims.roll_perc_poch		")
				.where("		, ims.ygls_tick     , ims.ngls_tick     , ims.poch_wdth       , ims.poch_hght			")
				.where("		, im.item_name      , im.item_spec      , im.item_code									")
				.where("		, ims.poch_tick     , ims.item_tick     , ims.real_item_tick  							")
				.where("		, ( ifnull(i.invc_qntt,0)-ifnull(z.ostt_qntt,0)) as upid_baln_qntt						")
				.where("		, cnt.cnt as cnt    , r.min_deli        , r.max_deli									")
				.where("		, ifnull(null, date_format(z.invc_date, '%Y-%m-%d')) as ostt_date						")
				.where("		, we.wndw_area      , we.wdbf_cost      , we.wdsf_cost        , we.wdmf_cost			")
				.where("		, we.totl_cost      , we.tmmk_pric      , we.wdsf_glss_cost								")
			;
			data.param
				.where("from   acpt_item i																				")
				.where("left   outer join acpt_mast    a  on a.invc_numb = i.invc_numb									")
				.where("left   outer join westi_item   we on i.invc_numb = we.invc_numb and i.line_seqn = we.line_seqn	")
				.where("left outer join (select sum(ifnull(s.ostt_qntt,0)) as ostt_qntt									")
				.where("                      , sum(ifnull(s.sale_amnt ,0)) as sale_amnt								")
				.where("                      , s.acpt_numb     , s.acpt_seqn    , sm.invc_date							")
				.where("                      from sale_ostt_item s														")
				.where("                      where 1=1 																")
				.where("                      and   invc_date  >= :invc1_date2		" , arg.getParamText("invc1_date" ))
				.where("                      left outer join sale_ostt_mast sm on s.invc_numb = sm.invc_numb			")
				.where("                      GROUP BY acpt_numb ,acpt_seqn												")
				.where("                ) as z on i.invc_numb = z.acpt_numb and i.line_seqn = acpt_seqn					")
				.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
				.where("left   outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
				.where("left   outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
				.where("left   outer join item_mast      im on i.item_idcd = im.item_idcd								")
				.where("left   outer join item_make_spec ims on im.item_idcd = ims.item_idcd							")
				.where("left   outer join (select * from base_mast where prnt_idcd= '3101') bs on bs.base_code = im.mtrl_bacd	")
				.where("left outer join ( select invc_numb, line_seqn,min(deli_date) as min_deli , max(deli_date) as max_deli ")
				.where("                  from acpt_item 																")
				.where("                  group by invc_numb,line_seqn													")
				.where("                ) r on r.invc_numb = i.invc_numb and r.line_seqn = i.line_seqn					")
				.where("left outer join ( select count(invc_numb) as cnt,acpt_numb 										")
				.where("                  from pror_mast p 																")
				.where("                  group by acpt_numb															")
				.where("                ) cnt on cnt.acpt_numb = a.invc_numb											")
				.where("where  1=1																						")
				.where("and    ifnull(a.ordr_dvcd,0) != '4000'															")
				.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
				.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
				.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
				.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
				.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
				.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
				.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
				.where("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
				.where("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
				.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_date desc,i.invc_numb  ,i.line_seqn limit 99999999								")
				.where(")a")
			;
		}else{
			data.param
				.query("select a.*																						")
			;
			data.param
				.where("from (																							")
				.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
				.where("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
				.where("		, i.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
				.where("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd									")
				.where("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
				.where("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
				.where("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
				.where("		, i.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
				.where("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
				.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
				.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
				.where("		, a.crte_idcd       , a.crte_urif       , a.cstm_drtr_name    , i.line_seqn				")
				.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
				.where("		, w.wrhs_code       , w.wrhs_name       , i.pdsd_yorn         , z.sale_amnt				")
				.where("		, i.item_idcd       , z.ostt_qntt       , i.invc_amnt									")
				.where("		, i.invc_qntt       , i.invc_pric       , bs.base_name as mtrl_name    , ims.spec_horz	")
				.where("		, ims.spec_vrtl     , ims.spec_tick     , ims.bath_qntt       , ims.colr_ccnt			")
				.where("		, ims.liqu_type     , ims.fabc_widh     , ims.proc_bacd       , ims.nutc_valu			")
				.where("		, ims.hole_yorn     , ims.stnd_yorn     , ims.uppr_open_yorn  , ims.lwrp_open_yorn		")
				.where("		, ims.left_open_yorn, ims.righ_open_yorn, ims.zipr_yorn       , ims.roll_perc_poch		")
				.where("		, ims.ygls_tick     , ims.ngls_tick     , ims.poch_wdth       , ims.poch_hght			")
				.where("		, im.item_name      , im.item_spec      , im.item_code									")
				.where("		, ims.poch_tick     , ims.item_tick     , ims.real_item_tick  							")
				.where("		, json_value(im.json_data,'$.wkfw_idcd')  as wkfw_idcd													 							")
				.where("		, ( ifnull(i.invc_qntt,0)-ifnull(z.ostt_qntt,0)) as upid_baln_qntt						")
				.where("		, cnt.cnt as cnt    																	")
				.where("		, ifnull(null, date_format(z.invc_date, '%Y-%m-%d')) as ostt_date						")
				.where("        , concat(cd.dlvy_addr_1fst, ifnull(dlvy_addr_2snd, '')) as dlvy_addr					")
				.where("        , cd.dely_cstm_name , a.acpt_dvcd       , imc.clss_name as mcls_name					")
			;
		if(arg.getParamText("stor_id").toUpperCase().equals("N1000SJFLV1000")) {
			data.param
				.where("        , cast(replace(json_extract(i.json_data, '$.pack_qntt'),'\"','') as char) as pack_qntt	")
			;
		}
			data.param
				.where("from   acpt_item i																				")
				.where("left   outer join acpt_mast      a  on a.invc_numb = i.invc_numb								")
				.where("left outer join (select sum(ifnull(s.ostt_qntt,0)) as ostt_qntt									")
				.where("                      , sum(ifnull(s.sale_amnt ,0)) as sale_amnt								")
				.where("                      , s.acpt_numb     , s.acpt_seqn    , sm.invc_date							")
				.where("                      from sale_ostt_item s														")
				.where("                      left outer join sale_ostt_mast sm on s.invc_numb = sm.invc_numb			")
				.where("                      where  1=1 																")
				.where("                      and    invc_date  >= :invc1_date2		" , arg.getParamText("invc1_date" ))
				.where("                      and    sm.line_stat != 2 													")
				.where("                      GROUP BY acpt_numb ,acpt_seqn												")
				.where("                ) as z on i.invc_numb = z.acpt_numb and i.line_seqn = acpt_seqn					")
				.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
				.where("left   outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
				.where("left   outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
				.where("left   outer join item_mast      im on i.item_idcd = im.item_idcd								")
				.where("left   outer join item_make_spec ims on im.item_idcd = ims.item_idcd							")
				.where("left   outer join item_clss      imc on im.mcls_idcd = imc.clss_idcd							")
				.where("left   outer join (select * from base_mast where prnt_idcd= '3101') bs on bs.base_code = im.mtrl_bacd	")
				.where("left   outer join ( select count(invc_numb) as cnt,acpt_numb 									")
				.where("                  from pror_mast p 																")
				.where("                  group by 	acpt_numb														")
				.where("                ) cnt on cnt.acpt_numb = a.invc_numb											")
				.where("left   outer join cstm_deli      cd on a.cstm_idcd = cd.cstm_idcd and a.dlvy_cstm_idcd = cd.dlvy_cstm_idcd ")
				.where("where  1=1																						")
				.where("and    ifnull(a.ordr_dvcd,0) != '4000'															")
				.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
				.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
				.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
				.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
				.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
				.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
				.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
				.where("and    a.expt_dvcd   = :expt_dvcd		" , arg.getParamText("expt_dvcd" ))
				.where("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
				.where("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
				.where("and    a.acpt_dvcd	 = :acpt_dvcd		" , arg.getParamText("acpt_dvcd" ))
				.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_date desc,i.invc_numb desc, i.line_seqn limit 99999999								")
				.where(")a")
			;
		}
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         				")
			.query("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.query("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif														")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("		, w.wrhs_code       , w.wrhs_name														")
			.query("		, i.item_idcd")


		;
		data.param
			.where("from   acpt_mast a																				")
			.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
			.where("left   outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join acpt_item      i on a.invc_numb = i.invc_numb									")
			.where("where  1=1																						")
			.where("and    a.ordr_dvcd != '4000'																	")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
			.query("		, a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      , a.optn_psbl_yorn	")
			.query("		, a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_qntt		")
			.query("		, a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt		")
			.query("		, a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
			.query("		, a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      , a.dlvy_date		")
			.query("		, a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
			.query("		, a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
			.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.query("		, a.cstm_lott_numb , a.deli_date as deli_date2													")
			.query("		, b.item_code      , b.item_name      , b.item_spec      , u.unit_name      , i.mold_idcd		")
		;
		data.param
			.where("from   acpt_item a																						")
			.where("       left outer join item_mast b on a.item_idcd = b.item_idcd											")
			.where("       left outer join unit_mast u on b.unit_idcd = u.unit_code											")
			.where("       left outer join item_adon i on a.item_idcd = i.item_idcd											")
			.where("where  1=1																								")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																	")
		;
		return data.selectForMap();
	}


	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.line_seqn       , a.cnsl_dttm        , a.drtr_idcd			")
			.query("        , a.cstm_dept_name   , a.cstm_drtr_name  , a.cnsl_cont        , a.cost_yorn			")
			.query("        , a.dsig_yorn        , a.puch_yorn       , a.otod_yorn        , a.prod_yorn			")
			.query("        , a.rply_reqt_yorn   , a.rply_mthd_dvcd  , a.rply_drtr_idcd   , a.rply_dttm			")
			.query("        , a.rply_cont        , a.remk_text       , a.uper_seqn        , a.disp_seqn			")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , u.user_name as drtr_name															")
		;
		data.param
			.where("from acpt_cnsl a																			")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where    1=1																				")
			.where("and      a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																		")
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
		.query("select count(*) as line_seqn																")
		;
		data.param
		.where("from		acpt_cnsl a   																	")
		.where("where		1=1																				")
		.where("and			a.invc_numb = :invc_numb		" , arg.getParameter("invc_numb"				))
		.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}


	public SqlResultMap setConsulting(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("acpt_cnsl")
					.where("where invc_numb = :invc_numb" )
					.where("and   line_seqn = :line_seqn" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("cnsl_dttm"			, row.getParameter("cnsl_dttm"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("cstm_dept_name"	, row.getParameter("cstm_dept_name"))
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"))
					.update("cnsl_cont"			, row.getParameter("cnsl_cont"))
					.update("cost_yorn"			, row.getParameter("cost_yorn"))
					.update("dsig_yorn"			, row.getParameter("dsig_yorn"))
					.update("puch_yorn"			, row.getParameter("puch_yorn"))
					.update("otod_yorn"			, row.getParameter("otod_yorn"))
					.update("prod_yorn"			, row.getParameter("prod_yorn"))
					.update("rply_reqt_yorn"	, row.getParameter("rply_reqt_yorn"))
					.update("rply_mthd_dvcd"	, row.getParameter("rply_mthd_dvcd"))
					.update("rply_drtr_idcd"	, row.getParameter("rply_drtr_idcd"))
					.update("rply_dttm"			, row.getParameter("rply_dttm"))
					.update("rply_cont"			, row.getParameter("rply_cont"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		data.execute();
		return null ;
	}

	public SqlResultMap setResult(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("acpt_cnsl")
					.where("where invc_numb = :invc_numb" )
					.where("and   line_seqn = :line_seqn" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("cnsl_dttm"			, row.getParameter("cnsl_dttm"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("cstm_dept_name"	, row.getParameter("cstm_dept_name"))
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"))
					.update("cnsl_cont"			, row.getParameter("cnsl_cont"))
					.update("cost_yorn"			, row.getParameter("cost_yorn"))
					.update("dsig_yorn"			, row.getParameter("dsig_yorn"))
					.update("puch_yorn"			, row.getParameter("puch_yorn"))
					.update("otod_yorn"			, row.getParameter("otod_yorn"))
					.update("prod_yorn"			, row.getParameter("prod_yorn"))
					.update("rply_reqt_yorn"	, row.getParameter("rply_reqt_yorn"))
					.update("rply_mthd_dvcd"	, row.getParameter("rply_mthd_dvcd"))
					.update("rply_drtr_idcd"	, row.getParameter("rply_drtr_idcd"))
					.update("rply_dttm"			, row.getParameter("rply_dttm"))
					.update("rply_cont"			, row.getParameter("rply_cont"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		data.execute();
		return null ;
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
//			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate				")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.acpt_dvcd				")
			.query("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.query("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       												")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name    , b.post_code		")
			.query("		, b.dlvy_exps       , b.dlvy_addr_1fst as addr_1fst    , b.dlvy_addr_2snd as addr_2snd	")
			.query("		, b.tele_numb_1fst  , b.tele_numb_2snd  , b.rctr_name         , b.dlvy_atcl 			")
			.query("		, if(a.acpt_dvcd = '1000', c2.dlvy_addr_1fst, c2.dely_cstm_name) as cstm_name2			")
			.query("		, a.dlvy_cstm_idcd																		")
			.query("from    acpt_mast a																				")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd							")
			.query("        left outer join cstm_deli      c2 on a.dlvy_cstm_idcd = c2.dlvy_cstm_idcd				")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd							")
			.query("        left outer join acpt_dlvy      b  on a.invc_numb = b.invc_numb							")
			.query("where   1=1																						")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
				.query("		, a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      , a.optn_psbl_yorn	")
				.query("		, a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_qntt		")
				.query("		, a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt		")
				.query("		, a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
				.query("		, a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      , a.dlvy_date		")
				.query("		, a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
				.query("		, a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
				.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.query("		, a.cstm_lott_numb , b.item_code      , b.item_name      , b.item_spec      , u.unit_name		")
				.query("		, a.deli_date as deli_date2																		")
			;
			if(arg.getParamText("stor_id").toUpperCase().equals("N1000SJFLV1000")) {
			data.param
				.query("        , cast(replace(json_extract(a.json_data, '$.pack_qntt'),'\"','') as char) as pack_qntt			")
			;
			}
				data.param
				.where("from   acpt_item a																						")
				.where("       left outer join item_mast b on a.item_idcd = b.item_idcd											")
				.where("       left outer join unit_mast u on b.unit_idcd = u.unit_code											")
				.where("where   1=1																								")
				.where("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	/*
	 * 마감 / 해지 건을 수정.
	 */

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
			.query("call auto_acpt_close (			")
			.query("   :STOR       "  , hq			 )  // 본사코드
			.query(" , :invc_numb  "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_close "  , line_clos 	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String hq = "";


		for (SqlResultRow row:map) {
			if(row.getParamText("hqof_idcd").length() > 0){
				hq = row.getParamText("hqof_idcd");
			}
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// master 등록/수정
				data.param
					.table("acpt_mast"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					//
					.update("amnd_degr"			, row.getParameter("amnd_degr"			))  /*  amd차수  */
					.update("bzct_dvcd"			, row.getParameter("bzct_dvcd"			))  /*  사업부문구분코드  */
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  invoice일자  */
					.update("ordr_dvcd"			, row.getParameter("ordr_dvcd"			))  /*  오더구분코드  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))  /*  원invoice번호  */
//					.update("expt_dvcd"			, row.getParameter("expt_dvcd"			))  /*  수출구분코드  */
					.update("pcod_numb"			, row.getParameter("pcod_numb"			))  /*  pono */
					.update("deli_date"			, row.getParameter("deli_date"			))  /*  납기일자 */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))  /*  거래처ID */
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))  /*  납품처ID */
					.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"			))  /*  중개인  */
					.update("cont_date"			, row.getParameter("cont_date"			))  /*  계약일자  */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))  /*  담당자ID  */
					.update("dept_idcd"			, row.getParameter("dept_idcd"			))  /*  부서ID  */
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"			))  /*  통화구분코드  */
					.update("excg_rate"			, row.getParameter("excg_rate"			))  /*  환율  */
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"		))  /*  출고창고  */
					.update("acpt_dvcd"			, row.getParameter("acpt_dvcd"			))  /*  수주구분코드  */
					.update("trut_dvcd"			, row.getParameter("trut_dvcd"			))  /*  위탁구분코드  */
					.update("dlvy_cond_dvcd"	, row.getParameter("dlvy_cond_dvcd"		))  /*  인도조건구분코드  */
					.update("crdt_exce_yorn"	, row.getParameter("crdt_exce_yorn"		))  /*  여신초과여부  */
					.update("amnt_lack_yorn"	, row.getParameter("amnt_lack_yorn"		))  /*  금액미달여부  */
					.update("sale_stor_yorn"	, row.getParameter("sale_stor_yorn"		))  /*  판매보관여부  */
					.update("remk_text"			, row.getParameter("remk_text"			))  /*  비고  */
					.update("memo"				, row.getParameter("memo"				))  /*  메모  */
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))  /*  확정여부  */
					.update("cofm_dttm"			, row.getParameter("cofm_dttm"			))  /*  확정일시  */
					.update("cofm_drtr_idcd"	, row.getParameter("cofm_drtr_idcd"		))  /*  확정담당자ID  */
					.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd"		))  /*  수주상태구분코드  */
					;
				if(row.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
					data.param
						.update("expt_dvcd"			, 0)  /*  수출구분코드  */
					;
				}else{
					data.param
						.update("expt_dvcd"			, row.getParameter("expt_dvcd"		))  /*  수출구분코드  */
					;
				}
				data.param
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ " "
												+ row.getParamText("cstm_idcd"			).trim()
												+ " "
												+ row.getParamText("cstm_name"			).trim())
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

				System.out.println(hq+"#################");

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				if (rowaction == Action.modify) {

				}
			}
		}
	data.execute();
	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	@SuppressWarnings("deprecation")
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			deli_date2 = row.getParamText("deli_date2");
			if(deli_date2.matches("^[0-9]+$")){
			}else{
				deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
			}
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("acpt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;
				data.attach(rowaction);

			} else {
				// detail 등록/수정

				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

				data.param
					.table("acpt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("amnd_degr"			, row.getParameter("amnd_degr"			))
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("cstm_lott_numb"	, row.getParameter("cstm_lott_numb"		))
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))
					.update("orig_seqn"			, row.getParameter("orig_seqn"			))
					.update("orig_invc_qntt"	, row.getParameter("orig_invc_qntt"		))
					.update("ortn_dvcd"			, row.getParameter("ortn_dvcd"			))
					.update("optn_psbl_yorn"	, row.getParameter("optn_psbl_yorn"		))
					.update("optn_adtn"			, row.getParameter("optn_adtn"			))
					.update("pric_adpt"			, row.getParameter("pric_adpt"			))
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))
					.update("invc_qntt"			, row.getParameter("invc_qntt"			))
					.update("invc_pric"			, row.getParameter("invc_pric"			))
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
					.update("invc_amnt"			, row.getParameter("invc_amnt"			))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"			))
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"			))
					.update("krwn_ttsm_amnt"	, row.getParameter("krwn_ttsm_amnt"		))
					.update("stnd_unit"			, row.getParameter("stnd_unit"			))
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))
					.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"			))
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))
					.update("deli_date"			, deli_date2							)
					.update("dlvy_date"			, row.getParameter("dlvy_date"			))
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
					.update("dsct_qntt"			, row.getParameter("dsct_qntt"			))
					.update("dlvy_memo"			, row.getParameter("dlvy_memo"			))
					.update("json_data"			, json_data)

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

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		temp.param
			.query("select line_stat, line_clos				")
			.query("from  acpt_mast							")
		 	.query("where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("acpt_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
//			.update("updt_idcd"		, arg.getParameter("updt_user_name"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("acpt_item")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
	//		.update("updt_idcd"		, arg.getParameter("updt_user_name"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setStps(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);


		int i = 0;

		for (SqlResultRow row:map) {
			if(i == 0){
				data.param
					.table("sale_ostt_mast											")
					.where("where invc_numb		= :invc_numb						")

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"	))	//invoice번호

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
					.update("invc_date"			, row.getParameter("invc_date"		))	//출고일자 //오늘날짜
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("sale_ostt_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))		//정상판매단가
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))		//판매기준단가
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"			))		//출고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
					.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("orig_seqn"			, row.getParameter("line_seqn"			))		//원INVOICE항번
					.update("ostt_dvcd"			, "3200"								)		//출고구분코드
					.update("insp_dvcd"			, "1000"								)		//검사구분코드

					.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast												")
					.where("where invc_numb		= :invc_numb						")		//invoice번호

					.unique("invc_numb"				, row.fixParameter("invc_numb"	))		//invoice번호

					.update("acpt_stat_dvcd"		, "0600"						)		//수주상태
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				i =+ 1;

			}else{
				data.param
					.table("sale_ostt_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"			))		//출고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
					.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("orig_seqn"			, row.getParameter("line_seqn"			))		//원INVOICE항번
					.update("ostt_dvcd"			, "3200"								)		//출고구분코드
					.update("insp_dvcd"			, "1000"								)		//검사구분코드

					.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast												")
					.where("where invc_numb		= :invc_numb						")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))		//invoice번호

					.update("acpt_stat_dvcd"		, "0600"						)		//수주상태
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
				data.param
					.query("call auto_acpt_stat_dvcd (		")
					.query("  :invc_numb "  , row.getParameter("invc_numb"	)) // Invoice 번호
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}

		return null;
	}

	//출고지시
//	public SqlResultMap setStps(HttpRequestArgument arg) throws Exception {
//		String invc_numb	= arg.getParamText("invc_numb") ;
//		String line_seqn	= arg.getParamText("line_seqn") ;
//		System.out.println("line_seqn:"+ line_seqn);
//		DataMessage data;
//		String hq    = arg.getParamText("hqof_idcd") ;
//		String stor  = arg.getParamText("stor_id");
//		if (hq.length() == 0  && stor.length() >= 10 ) {
//			hq = stor.substring(0,10) ;
//		}
//		if (invc_numb.length() == 0) {
//			invc_numb = "not defined" ;
//		}
//
//		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = arg.newStorage("POS");      }
//			data.param
//			.query("call auto_spts_insert2 (			")
//			.query("   :STOR "       , stor			)  // 본사코드
//			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
//			.query(" , :line_seqn "  , line_seqn	)  // Invoice 번호
//			.query(" ) 								")
//		;
//		data.attach(Action.direct);
//		data.execute();
//		return null;
//	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String deli_date	= arg.getParamText("deli_date");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_copy (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	//work_book 생성
		public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {

			DataMessage data = arg.newStorage("POS");

			String result = "";
			ParamToJson parse = new ParamToJson();
			result = parse.TranslateAll(arg);

			data.param
				.query("call  (			")
				.query("   :param       "  		)
				.query(" ) 								")
			;
			data.attach(Action.direct);
			data.execute();
			return null;

		}

	//작업지시
		public SqlResultMap setPror(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");
				SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
				for (SqlResultRow row : map){
					String invc_date= "";
					invc_date = row.getParamText("invc_date");
					if(row.getParamText("invc_date").length() == 8){
						invc_date = row.getParamText("invc_date");
					}else if(row.getParamText("invc_date").length()>8){
						invc_date = invc_date.substring(0,4)+invc_date.substring(5,7)+invc_date.substring(8,10);
					};

					if(row.getParamText("stor_id").toUpperCase().equals("N1000DHTEC1000")){
						data.param
							.query("call auto_pror_insert_DHTEC(")
							.query("   :invc_numb " , row.getParamText("invc_numb"))
							.query(" , :line_seqn " , row.getParamText("line_seqn"))
							.query(" , :amnd_degr " , row.getParamText("amnd_degr")) //견적차수
							.query(" , :item_idcd " , row.getParamText("cstm_idcd")) //품목ID
							.query(" , :plan_sttm " , row.getParamText("plan_sttm")) //시작시간
							.query(" , :plas_qntt " , row.getParamText("acpt_qntt")) //수주수량
							.query(" , :plan_edtm " , row.getParamText("plan_edtm")) //종료시간
							.query(" , :pref_rank " , "1"						) //우선순위
							.query(" , :invc_date " , invc_date	)
							.query(" , :remk_text " , row.getParamText("remk_text"))
							.query(" , :wkfw_idcd " , "0001")
							.query(" , :crte_idcd " , row.getParamText("crte_idcd"))
							.query(") 											  ")
						;
						data.attach(Action.direct);
						data.execute();
					}else{
						data.param
							.query("call auto_pror_insert(")
							.query("   :invc_numb " , row.getParamText("invc_numb"))
							.query(" , :line_seqn " , row.getParamText("line_seqn"))
							.query(" , :amnd_degr " , row.getParamText("amnd_degr")) //견적차수
							.query(" , :item_idcd " , row.getParamText("cstm_idcd")) //품목ID
							.query(" , :plan_sttm " , row.getParamText("plan_sttm")) //시작시간
							.query(" , :plas_qntt " , row.getParamText("acpt_qntt")) //수주수량
							.query(" , :plan_edtm " , row.getParamText("plan_edtm")) //종료시간
							.query(" , :pref_rank " , row.getParamText("pref_rank")) //우선순위
							.query(" , :invc_date " , invc_date	)
							.query(" , :remk_text " , row.getParamText("remk_text"))
							.query(" , :wkfw_idcd " , row.getParamText("wkfw_idcd"))
							.query(" , :crte_idcd " , row.getParamText("crte_idcd"))
							.query(") 											  ")
						;
						data.attach(Action.direct);
						data.execute();
					}
				}
			return null;
		}

	//작업지시 수정
		public SqlResultMap prorUpdate(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");

			for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
				String invc_date= "";
				invc_date = row.getParamText("invc_date");
					if(row.getParamText("invc_date").length() == 8){
						invc_date = row.getParamText("invc_date");
					}else if(row.getParamText("invc_date").length()>8){
						invc_date = invc_date.substring(0,4)+invc_date.substring(5,7)+invc_date.substring(8,10);
					};
						data.param
						.query(" select  a.invc_numb ,c.invc_numb as pror_invc_numb						 ")
						.query(" from prod_plan a														 ")
						.query(" left outer join prod_plan_acpt b  on a.invc_numb = b.invc_numb			 ")
						.query(" left outer join pror_mast c       on b.acpt_numb = c.acpt_numb			 ")
						.query(" where  1=1																 ")
						.query(" and    b.acpt_numb  = :acpt_numb		" , row.getParamText("invc_numb" ))
						.query(" and    b.line_seqn  = :line_seqn		" , row.getParamText("line_seqn" ))
						.query(" and    c.acpt_seqn  = b.line_seqn										 ")
						;
					SqlResultMap map = data.selectForMap();
					data.clear();
					for(SqlResultRow  rec : map){
						System.out.println(rec);
						data.param
						.table ("prod_plan")
						.where("where invc_numb 	= :invc_numb2				  ")

						.unique("invc_numb2"		, rec.fixParameter("invc_numb"))

						.update("updt_idcd"			, row.getParameter("crte_idcd"))
						.update("remk_text"			, row.getParameter("remk_text"))
						.update("plan_sttm"			, row.getParameter("plan_sttm"))
						.update("plan_edtm"			, row.getParameter("plan_edtm"))
						.update("updt_ipad"         , arg.remoteAddress)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();
					}
					for(SqlResultRow  rec : map){
						data.param
						.table ("prod_plan_acpt")
						.where("where invc_numb 	= :invc_numb2				  ")

						.unique("invc_numb2"		, rec.fixParameter("invc_numb"))
						.unique("line_seqn2"		, row.fixParameter("line_seqn"))

						.update("updt_idcd"			, row.getParameter("crte_idcd"))
						.update("plan_sttm"			, row.getParameter("plan_sttm"))
						.update("plan_edtm"			, row.getParameter("plan_edtm"))
						.update("updt_ipad"         , arg.remoteAddress)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();
					}
					for(SqlResultRow  rec : map){
						data.param
						.table ("pror_mast")
						.where("where invc_numb 	= :invc_numb3					   ")

						.unique("invc_numb3"		, rec.fixParameter("pror_invc_numb"))
						.unique("acpt_seqn"			, row.fixParameter("line_seqn"))

						.update("updt_idcd"			, row.getParameter("crte_idcd"))
						.update("strt_dttm"			, row.getParameter("plan_sttm"))
						.update("endd_dttm"			, row.getParameter("plan_edtm"))
						.update("remk_text"			, row.getParameter("remk_text"))
						.update("updt_ipad"         , arg.remoteAddress)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();
					}
					for(SqlResultRow  rec : map){
						data.param
						.table ("pror_item")
						.where("where invc_numb 	= :invc_numb3					   ")

						.unique("invc_numb3"		, rec.fixParameter("pror_invc_numb"))
						.unique("acpt_seqn"			, row.fixParameter("line_seqn"))

						.update("updt_idcd"			, row.getParameter("crte_idcd"))
						.update("plan_strt_dttm"	, row.getParameter("plan_sttm"))
						.update("work_strt_dttm"	, row.getParameter("plan_sttm"))
						.update("plan_endd_dttm"	, row.getParameter("plan_edtm"))
						.update("remk_text"			, row.getParameter("remk_text"))
						.update("updt_ipad"         , arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();
					}
			}
			return null;
		 }

		public SqlResultMap duplicatecheck(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");

			data.param
			.query("select a.*																						")
			;
			data.param
				.where("from (																							")
				.where("select    a.acpt_numb    , 	count(a.invc_numb) as prod, 	count(b.invc_numb) as pror			")
			;
			data.param
				.where("from   prod_plan_acpt a																				")
				.where("left   outer join pror_mast b on a.invc_numb = b.pdsd_numb										")
				.where("where    a.acpt_numb   = :invc_numb		" , arg.getParamText("invc_numb" ))
				.where("and    	 a.acpt_seqn   = :line_seqn		" , arg.getParamText("line_seqn" ))
				.where(")a")
		;
			return data.selectForMap();
		}





	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String acpt_stat_dvcd  = arg.getParamText("acpt_stat_dvcd");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_ok (						")
			.query("   :STOR			" , hq				)  // 본사코드
			.query(" , :invc_numb		" , invc_numb	 	)  // Invoice 번호
			.query(" , :acpt_stat_dvcd	" , acpt_stat_dvcd	)  // 결재여부
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}


	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
		.query("select a.*																								")
		.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
		.query("from (																									")
		.query("select																									")
		.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
		.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
		.query("     ,  0  as cst_pri																					")
		.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
		.query("     ,  0  as sale_pri																					")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
		.query("     ,  a.modl_name																						")
		.query("from    item_mast a																						")
		.query("where   1=1																								")
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
		.query("and     a.line_stat = 0																					")
		.query("and     a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query(") a																										")
		;

		return data.selectForMap();
	}

	/**
	 * 광일테크 엑셀업로드
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */

	public void setExcel(HttpRequestArgument arg, SqlResultRow item , String cstm ) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.query("call fn_seq_gen_v2 (							")
				.query("     :STOR                " ,  arg.fixParameter("stor_id"))
				.query("   , :table               " ,  arg.fixParameter("table_nm"))
				.query("   , :invc_numb           " ,  "not defind"		)
				.query(" ) 												")
			;
			String a = data.selectForRow().getParamText("seq");
			data.clear();
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , a)		//INVOICE번호
				.unique("amnd_degr"        , 1	)									//AMD차수

				.update("bzpl_idcd"        , item.getParameter("bzpl_idcd"))		//사업장ID
				.update("invc_date"        , item.getParameter("invc_date"))		//INVOICE 일자
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자
				.update("cstm_idcd"        , item.getParameter("cstm_idcd"))		//거래처ID
				.update("dlvy_cstm_idcd"   , cstm)									//납품거래처ID
				.update("dlvy_cstm_idcd"   , item.getParameter("dlvy_cstm_name"))	//납품거래처명
				.update("remk_text"        , item.getParameter("remk_text"))		//비고
				.update("memo"             , item.getParameter("memo"))				//메모
				.update("acpt_stat_dvcd"   , "0011")								//수주상태구분코드
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("cstm_idcd")
											 +" "
											 +item.getParameter("invc_date"))

				.update("sysm_memo"        , item.getParameter("stat"))
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			//단가(invc_pric) = 금액(sply_amnt) / 수량(invc_qntt)
			double invc_pric = 0 ;  //단가
			double invc_qntt = 0 ;  //수량
			double sply_amnt = 0 ;  //공급가액
			double vatx_amnt = 0 ;  //부가세액
			double invc_amnt = 0 ;  //합계금액
			invc_qntt  = Double.parseDouble(item.getParamText("invc_qntt")) ;
			if(!item.getParamText("invc_pric").equals("")){
				invc_pric  = Double.parseDouble(item.getParamText("invc_pric")) ;
			}else{
				data.param
					.query("select  cont_pric 									")
				;
				data.param //퀴리문
					.where("from item_cont										")
					.where("where   item_idcd	=:item_idcd",item.fixParameter("item_idcd"))
					.where("and     cstm_idcd	=:cstm_idcd",cstm)
				;
				if(data.selectForMap().size()!=0) {
					invc_pric = Double.parseDouble(data.selectForMap().get(0).getParamText("cont_pric"));
				}
				data.clear();
			}

			sply_amnt  = invc_pric * invc_qntt;
			vatx_amnt  = sply_amnt * 0.1;
			invc_amnt  = sply_amnt + vatx_amnt;

			data.param
				.table ("acpt_item")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"        , a)
				.unique("amnd_degr"        , 1	)
				.unique("line_seqn"        , 1	)

				.update("item_idcd"        , item.getParameter("item_idcd"))		//품목ID
				.update("sply_amnt"        , sply_amnt)								//공급가액
				.update("pcod_numb"        , item.getParameter("pcod_numb"))		//고객발주번호
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자
				.update("deli_chge_resn"   , item.getParameter("deli_chge_resn"))	//납기변경사유
				.update("ostt_qntt"        , item.getParameter("ostt_qntt"))		//출고수량
				.update("vatx_amnt"        , vatx_amnt)								//부가세금액
				.update("invc_qntt"        , item.getParameter("invc_qntt"))		//수량
				.update("invc_pric"        , item.getParameter("invc_pric"))		//단가
				.update("invc_amnt"        , invc_amnt)								//합계금액
				.update("cstm_offr_date"   , item.getParameter("cstm_offr_date"))	//고객발주일자
				.update("cstm_deli_date"   , item.getParameter("cstm_deli_date"))	//고객납기일자
				.update("cstm_lott_numb"   , item.getParameter("cstm_lott_numb"))	//고객 LOT 번호
				.update("dlvy_cstm_idcd"   , cstm)									//납품거래처ID
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("remk_text"        , item.getParameter("remk_text"))
				.update("line_stat"        , 0	)
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("pdsd_yorn"        , "0")

				.update("sysm_memo"        , item.getParameter("stat"))
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
	}

	// 납품처 거래처id 엑셀업로드
	public String getCstmIdcd(HttpRequestArgument arg, String dlvy_cstm_idcd) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id") ;
		String table		= arg.getParamText("table_nm") ;

		data.param
			.query("select  cstm_idcd 									")
		;
		data.param //퀴리문
			.where("from cstm_mast										")
			.where("where     1=1										")
			.where("and     cstm_name	=:cstm_idcd",		dlvy_cstm_idcd)
		;
		String idcd = "";
		if(data.selectForMap().size()!=0) {
			idcd = data.selectForMap().get(0).getParamText("cstm_idcd");
		}
		return idcd;
	}

	//배송지 추가 등록
	public SqlResultMap setDeliveryAddress(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("cstm_deli"													)
				.where("where dlvy_cstm_idcd		= :dlvy_cstm_idcd				")  /*   납품처ID  */
				.unique("dlvy_cstm_idcd"	, arg.fixParameter("dlvy_cstm_idcd"		 ))

				.update("line_seqn"			, arg.fixParameter("line_seqn"      	 ))  /*  순번  */
				.update("cstm_idcd"			, arg.fixParameter("cstm_idcd"    		 ))  /*  거래처ID  */
				.update("dely_cstm_name"	, arg.getParameter("dely_cstm_name"      ))  /*  납품처명  */
				.update("dlvy_drtr_name"	, arg.getParameter("dlvy_drtr_name"      ))  /*  납품담당자명  */
				.update("dlvy_addr_1fst"	, arg.getParameter("dlvy_addr_1fst"      ))  /*  배송주소1  */
				.update("find_name"        , arg.getParameter("cstm_idcd")
											 +" "
											 +arg.getParameter("dely_cstm_name"))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		return null ;
	}

}