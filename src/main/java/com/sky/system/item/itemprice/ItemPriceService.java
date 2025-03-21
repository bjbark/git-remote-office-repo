package com.sky.system.item.itemprice;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class ItemPriceService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select *																					")
		;
		data.param
		.where("from (																						")
		.where("select a.item_idcd        , a.item_code         , a.item_brcd_1fst    , a.item_brcd_2snd	")
		.where("     , a.item_brcd_3trd   , a.item_name         , a.item_spec         , a.modl_name			")
		.where("     , a.unit_idcd        , a.lott_idnf_code    , a.stok_mngt_yorn							")
		.where("     , a.lcls_idcd        , a.mcls_idcd         , a.scls_idcd         , a.acct_bacd			")
		.where("     , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name	")
		.where("     , case when c3.clss_name is not null then c3.clss_desc									")
		.where("            else case when c2.clss_name is not null then c2.clss_desc						")
		.where("                      else c1.clss_name														")
		.where("                 end																		")
		.where("       end  as clss_desc  																	")
		.where("     , (select base_name from base_mast r where a.acct_bacd  = r.base_code					")
		.where("                                           and   r.line_stat = 0							")
		.where("                                          and   r.prnt_idcd = '1102' limit 1)   as acct_bacd_name	")
		.where("     , a.item_stnm        , a.item_egnm         , a.item_egnm_stnm    , a.vatx_dvcd			")
		.where("     , a.vatx_incl_yorn   , a.optn_item_yorn    , a.sets_item_yorn    , a.roll_mngt_yorn	")
		.where("     , a.lott_mngt_yorn   , a.sral_mngt_yorn    , a.insp_objt_yorn    , a.insp_type_idcd	")
		.where("     , a.insp_mthd_dvcd   , a.smpl_stnd_dvcd    , a.insp_levl_dvcd    , a.shpm_insp_yorn	")
		.where("     , a.rcpt_insp_yorn   , a.istt_wrhs_idcd    , a.ostt_wrhs_idcd    , a.rtil_ddln_dvcd	")
		.where("     , a.rtil_ddln_dcnt   , a.stun_exng_volm    , a.sral_idnf_code    , a.ndqt_calc_dvcd	")
		.where("     , a.otod_loss_rate   , a.ostt_mthd_dvcd    , a.incm_loss_rate							")
		.where("     , a.auto_istt_yorn   , a.mtrl_bacd         , a.sale_psbl_yorn							")
		.where("     , (select base_name  from base_mast r where a.mtrl_bacd  = r.base_code					")
		.where("                                           and   r.line_stat = 0							")
		.where("                                           and   r.prnt_idcd = '3101' limit 1) as mtrl_bacd_name	")
		.where("     , (select base_name  from base_mast r where b.ogin_bacd  = r.base_code					")
		.where("                                           and   r.line_stat = 0							")
		.where("                                           and   r.prnt_idcd = '1202' limit 1) as ogin_bacd_name	")
		.where("     , b.puch_itvl_qntt   , b.avrg_supl_dcnt    , b.optm_offr_volm    , b.make_cmpy_name	")
		.where("     , b.minm_puch_qntt   , b.coun_iout_dvcd    											")
		.where("     , c.colr_bacd        , c.wkfw_idcd         , c.prod_type_dvcd							")
		.where("     , c.optn_dvcd        , c.optm_prod_volm    , c.last_insp_yorn    , c.dplt_name			")
		.where("     , c.cstm_dplt_name   , c.expt_boxx_sort    , c.expt_boxx_wtfl    , c.dplt_sort			")
		.where("     , c.dplt_wtfl        , c.dplt_bulk         , c.cstm_pper_boxx    , c.cstm_dplt			")
		.where("     , c.midl_boxx        , c.larg_boxx         , c.tray									")
		.where("     , e1.sale_drtr_idcd   , f1.wrhs_name as istt_wrhs_name									")
		.where("     , f2.wrhs_name as ostt_wrhs_name           , u.unit_name								")
		.where("     , e1.cstm_name as base_vend_name														")
		.where("     , g2.user_name as sale_user_name           , w.wkfw_name         , i.insp_type_name	")
		.where("     , g3.user_name as drtr_name															")
		.where("     , a.user_memo        , a.sysm_memo         , a.prnt_idcd          , a.line_levl		")
		.where("     , a.line_ordr        , a.line_stat         , a.line_clos          , a.find_name		")
		.where("     , a.updt_user_name   , a.updt_ipad         , a.updt_dttm          , a.updt_idcd		")
		.where("     , a.updt_urif																			")
		.where("     , a.crte_user_name   , a.crte_ipad         , a.crte_dttm         , a.crte_idcd			")
		.where("     , a.crte_urif																			")
		.where("     , h.unit_idcd as unit_idcd2           , h.unit_name as unit_name2						")
		.where("     , h.bolt_unit_dvcd , h.bolt_dvcd      , h.mtty_dvcd									")
		.where("     , h.leng_unit																								")
		.where("     , ifnull(h.leng_valu      , substring_index(a.item_spec,'/',1)) as leng_valu								")
		.where("     , h.leng_unit_2snd																							")
		.where("     , ifnull(h.leng_valu_2snd , substring_index(substring_index(a.item_spec,'-',1),'/',-1)) as leng_valu_2snd	")
		.where("     , h.widh_unit																								")
		.where("     , ifnull(h.widh_valu      , substring_index(substring_index(a.item_spec,'-',2),'-',-1))  as widh_valu		")
		.where("     , h.tick_unit																								")
		.where("     , ifnull(h.tick_valu      , substring_index(substring_index(a.item_spec,'-',3),'-',-1))  as tick_valu		")
		.where("     , h.widh_edge      , h.dim_valu       , h.spgr_unit									")
		.where("     , h.spgr_valu      , h.item_wigt      , h.drwg_numb      , h.inch_name_code			")
		.where("     , h.inch_mtct      , h.inch_otsd_dimt , h.jiss_name      , h.jiss_pich					")
		.where("     , h.fixd_leng      , h.lead_angl      , h.lead_angl_stte , h.lead_angl_mint			")
		.where("     , h.tper_dpth      , h.tper_leng      , h.tper_angl      , h.tper_angl_stte			")
		.where("     , h.tper_angl_mint , h.half_pich      , h.sinn_valu      , h.h_valu					")
		.where("     , h.a_valu         , h.b_valu         , h.ra_valu        , h.rb_valu					")
		.where("     , h.h2_valu        , h.bolt_dpth      , h.mntn_dpth									")
		.where("     , h.mtrl_dimt      , h.otsd_dimt      , h.a_valu_scpe    , h.b_valu_scpe				")
		.where("     , h.mntn_dpth_scpe , h.plat_optn      , h.tolr_valu      , h.item_clss_bacd			")
		.where("     , h.item_bacd      , h.make_bacd      , h.srfc_proc_yorn , h.iput_qntt					")
		.where("     , h.hght_valu_1fst , h.wdth_valu_11   , h.wdth_valu_12   , h.wdth_valu_13				")
		.where("     , h.wdth_valu_2snd , h.wdth_valu_3trd													")
		.where("     , s.shpm_pric_1fst , s.shpm_pric_2snd , s.shpm_pric_3trd , s.shpm_pric_4frt			")
		.where("     , s.shpm_pric_5fit , s.cnsr_pric														")

		.where("     , m.mold_name        , m.mold_idcd         , b.cstm_idcd as base_vend_idcd				")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '01') as item_pkge_01		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '02') as item_pkge_02		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '03') as item_pkge_03		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '04') as item_pkge_04		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '05') as item_pkge_05		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '06') as item_pkge_06		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '07') as item_pkge_07		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '08') as item_pkge_08		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '09') as item_pkge_09		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '10') as item_pkge_10		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '11') as item_pkge_11		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '12') as item_pkge_12		")
		.where("      ,(select pckg_qntt  from item_pkge r where a.item_idcd = r.item_idcd					")
		.where("                                           and   r.pckg_bacd = '13') as item_pkge_13		")
		.where("      , bs.base_name as colr_bacd_name														")
		.where("      , (select cont_pric from item_cont ic where ic.item_idcd = a.item_idcd order by ic.line_seqn desc limit 1 ) as puch_pric	")
		.where("from   item_mast a																			")
		.where("       left outer join item_purc      b  on a.item_idcd = b.item_idcd						")
		.where("       left outer join item_adon      c  on a.item_idcd = c.item_idcd						")
		.where("       left outer join item_desc      h  on a.item_idcd = h.item_idcd and h.line_seqn = 1	")
		.where("       left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd						")
		.where("       left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd						")
		.where("       left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd						")
		.where("       left outer join cstm_mast      e1 on b.cstm_idcd = e1.cstm_idcd						")
		.where("       left outer join wrhs_mast      f1 on a.istt_wrhs_idcd = f1.wrhs_idcd					")
		.where("       left outer join wrhs_mast      f2 on a.ostt_wrhs_idcd = f2.wrhs_idcd					")
		.where("       left outer join user_mast      g2 on e1.sale_drtr_idcd = g2.user_idcd				")
		.where("       left outer join user_mast      g3 on b.drtr_idcd = g3.user_idcd						")
		.where("       left outer join wkfw_clss      w  on c.wkfw_idcd = w.wkfw_idcd						")
		.where("       left outer join unit_mast      u  on a.unit_idcd = u.unit_code						")
		.where("       left outer join insp_type_mast i  on a.insp_type_idcd = i.insp_type_idcd				")
		.where("       left outer join mold_mast      m  on c.mold_idcd = m.mold_idcd						")
		.where("       left outer join item_sale_pric s  on a.item_idcd = s.item_idcd						")
		.where("       left outer join ( select * from base_mast where prnt_idcd = '3104') bs				")
		.where("                       on c.colr_bacd = bs.base_code										")
		.where("where  1=1																					")
		.where("and    a.find_name	like %:find_name%	"	, arg.getParamText("find_name"))
		.where("and    a.item_idcd   = :item_idcd		"	, arg.getParameter("item_idcd"))
		.where("and    a.item_code   = :item_code		"	, arg.getParameter("item_code"))
		.where("and    a.line_stat   = :line_stat1		"	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
		.where("and    a.lcls_idcd   = :lcls_idcd		"	, arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
		.where("and    a.mcls_idcd   = :mcls_idcd		"	, arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
		.where("and    a.scls_idcd   = :scls_idcd		"	, arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
		.where("and    a.acct_bacd   = :acct_code		"	, arg.getParamText("acct_code" ) , !"".equals(arg.getParamText("acct_code" )))
		.where("and    a.acct_bacd in ('3000')						" , "제품".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('4000')						" , "상품".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('1001', '1002','1003')		" , "자재".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('2001', '2002','3000')		" , "재공품".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('2001', '2002','3000')		" , "생산품".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('5000', '6000')				" , "기타".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))		)
		.where("order by a.item_code																			")
		.where(")a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		System.out.println(arg.getParameter("stor_id"));

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.query("WITH cstm_drtr_cte AS (																	")
				.query("     SELECT d.cstm_idcd																	")
				.query("          , d.drtr_name AS cstm_drtr_name												")
				.query("          , d.drtr_tele_numb AS cstm_drtr_tele_numb										")
				.query("          , d.drtr_hdph_numb AS cstm_drtr_hdph_numb										")
				.query("          , ROW_NUMBER() OVER (PARTITION BY d.cstm_idcd ORDER BY d.line_seqn DESC) AS rnk")
				.query("     FROM cstm_drtr d																	")
				.query(")																						")
			;
		}
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select a.item_idcd        , a.line_seqn         , a.cstm_idcd         , a.cont_date			")
			.where("     , a.drtr_idcd        , a.cont_pric         , a.trnt_mthd_dvcd    , a.deli_dcnt			")
			.where("     , a.ftmr_insp_yorn   , a.mdmr_insp_yorn    , a.ltmr_insp_yorn    , a.trmn_date			")
			.where("     , a.last_yorn        , a.uper_seqn         , a.disp_seqn         , c.cstm_name			")
			.where("     , u.user_name as drtr_name                 , i.item_code         , i.item_name			")
			.where("     , a.pric_dvcd        , i.acct_bacd	        , a.user_memo								")
		;
		if(((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where(" , d.cstm_drtr_name   , d.cstm_drtr_tele_numb   , d.cstm_drtr_hdph_numb					")
			;
		}
		data.param
			.where("from  item_cont a																			")
			.where("left outer join   cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join   user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join   item_mast i on a.item_idcd = i.item_idcd									")
		;
		if(((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("left outer join cstm_drtr_cte d ON a.cstm_idcd = d.cstm_idcd AND d.rnk = 1				")
			;
		}
		data.param
			.where("where  1=1																					")
			.where("and    a.item_idcd = :item_idcd     ", arg.fixParameter("item_idcd"))
			.where("and    a.line_stat   < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" ))		 )
			.where("order by a.line_seqn																		")
			.where(")a																							")
		;
		return data.selectForMap( );
	}
	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage data2 = arg.newStorage("POS");

		int new_line_seqn = 0;

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String acct_bacd = row.getParamText("acct_bacd");

			if(rowaction == Action.delete){
				data.param
					.table("item_cont												")
					.where("where item_idcd  = :item_idcd							")
					.where("and   line_seqn  = :line_seqn							")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			}else{
				SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd");
				String   trmn = row.getParamText("trmn_date");
				String   cont = row.getParamText("cont_date");
				String   cont_date = "";
				String   trmn_date = "";
				if(trmn.length()>8){
					trmn_date = dt.format(new Date(row.getParamText("trmn_date")));
				}else{
					trmn_date = row.getParamText("trmn_date");
				}
				if(cont.length()>8){
					cont_date = dt.format(new Date(row.getParamText("cont_date")));
				}else{
					cont_date = row.getParamText("cont_date");
				}

				data.param
					.query("select MAX(line_seqn)										")

					.where("from item_cont												")
					.where("where item_idcd = :item_idcd",row.fixParameter("item_idcd"  ))
					.where("order by line_seqn											")
				;
				SqlResultMap map = data.selectForMap();
				data.clear();

				int line_seqn = 0;
				if(map.get(0).getParameter("max(line_seqn)")!=null && row.getParameter("_set").equals("insert")){
					line_seqn = Integer.parseInt(map.get(0).getParameter("max(line_seqn)").toString());
					line_seqn++;
				}else{
					line_seqn = Integer.parseInt(row.getParamText("line_seqn").toString());
				}
				data.param
					.table("item_cont												")
					.where("where item_idcd  = :item_idcd							")
					.where("and   line_seqn  = :line_seqn							")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
					.unique("line_seqn"			, line_seqn						)

					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))
					.update("cstm_name"			, row.getParameter("cstm_name"		))
					.update("cont_date"			, cont_date)
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))
					.update("cont_pric"			, row.getParameter("cont_pric"		))
					.update("pric_dvcd"			, row.getParameter("pric_dvcd"		))
					.update("trnt_mthd_dvcd"	, row.getParameter("trnt_mthd_dvcd"	))
					.update("deli_dcnt"			, row.getParameter("deli_dcnt"		))
					.update("ftmr_insp_yorn"	, row.getParameter("ftmr_insp_yorn"	))
					.update("mdmr_insp_yorn"	, row.getParameter("mdmr_insp_yorn"	))
					.update("ltmr_insp_yorn"	, row.getParameter("ltmr_insp_yorn"	))
					.update("last_yorn"			, row.getParameter("last_yorn"		))
					.update("trmn_date"			, trmn_date)
					.update("user_memo"			, row.getParameter("user_memo"		))
					.update("uper_seqn"			, row.getParameter("uper_seqn"		))
					.update("disp_seqn"			, row.getParameter("disp_seqn"		))

					.update("find_name"			, row.getParameter("item_name"		)
												+ "	"
												+ row.getParameter("item_code"		))
					.insert("line_levl"			, "1")
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			}

			// 2022.09.05 - 이강훈 - 삼정이면서 상품인 경우 거래처별 최종단가가 적용되지 않도록 처리
			// 2022.09.07 - 이강훈 - 삼정이면서 제품인 경우 거래처별 최종단가가 적용되지 않도록 추가
			boolean isSetLast = true;
			if (row.getParamText("hq_id").toUpperCase().equals("N1000SJUNG")
			&& (row.getParamText("acct_bacd").equals("3000") || row.getParamText("acct_bacd").equals("4000"))) {
				isSetLast = false;
			}

			if (isSetLast) {
				/* 2022.03.04 - 이강훈 - 거래처별 최종단가가 체크되도록 변경 - START */
				data.param // 집계문  입력
					.query("update item_cont									")
					.query("set last_yorn = '0'									")
					.query("where item_idcd = :item_idcd" , row.getParamText("item_idcd"))
					.query("and   pric_dvcd = :pric_dvcd" , row.getParamText("pric_dvcd"))
					.query("and   cstm_idcd = :cstm_idcd" , row.getParamText("cstm_idcd"))
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();

				data.param
					.query("update item_cont									")
					.query("set last_yorn = '1'									")
					.query("where item_idcd = :item_idcd" , row.getParamText("item_idcd"))
					.query("and   cstm_idcd = :cstm_idcd" , row.getParamText("cstm_idcd"))
					.query("and   pric_dvcd = :pric_dvcd" , row.getParamText("pric_dvcd"))
					.query("order by item_idcd, cstm_idcd, cont_date desc, crte_dttm desc limit 1		")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
				/* 2022.03.04 - 이강훈 - 거래처별 최종단가가 체크되도록 변경 - END */
			}
		}
		return null;
	}
}
