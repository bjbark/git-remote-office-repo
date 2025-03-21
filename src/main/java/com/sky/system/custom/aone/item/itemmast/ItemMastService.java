package com.sky.system.custom.aone.item.itemmast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.exception.ServiceException;
import net.sky.data.DataMap;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.utils.file.UploadItem;

@Service("aone.ItemMastService")
public class ItemMastService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String find_name = "";
		if(!arg.getParamText("find_name").equals("")){
			String[] find = arg.getParamText("find_name").split(" ");
			if(find.length>0){
				for (int i = 0; i < find.length; i++) {
					if(i ==0){
						find_name += "(?=(.*("+find[i]+")){1,})";
					}else{
						find_name += ".*"+find[i];
					}
				}
			}
		}
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
			.where("     , a.item_leng        , a.item_widh         , a.item_tick          						")
			.where("     , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name	")
			.where("     , case when c3.clss_name is not null then c3.clss_desc									")
			.where("            else case when c2.clss_name is not null then c2.clss_desc						")
			.where("                      else c1.clss_name														")
			.where("                 end																		")
			.where("       end  as clss_desc  																	")
			.where("     , a.item_stnm        , a.item_egnm         , a.item_egnm_stnm    , a.vatx_dvcd			")
			.where("     , a.vatx_incl_yorn   , a.optn_item_yorn    , a.sets_item_yorn    , a.roll_mngt_yorn	")
			.where("     , a.lott_mngt_yorn   , a.sral_mngt_yorn    , a.insp_objt_yorn    , a.insp_type_idcd	")
			.where("     , a.insp_mthd_dvcd   , a.smpl_stnd_dvcd    , a.insp_levl_dvcd    , a.shpm_insp_yorn	")
			.where("     , a.rcpt_insp_yorn   , a.istt_wrhs_idcd    , a.ostt_wrhs_idcd    , a.rtil_ddln_dvcd	")
			.where("     , a.rtil_ddln_dcnt   , a.stun_exng_volm    , a.sral_idnf_code    , a.ndqt_calc_dvcd	")
			.where("     , a.otod_loss_rate   , a.ostt_mthd_dvcd    , a.incm_loss_rate    , a.stok_sale_yorn	")
			.where("     , a.auto_istt_yorn   , a.mtrl_bacd         , a.sale_psbl_yorn    , a.rpst_item_idcd	")
			.where("     , json_value(a.json_data , '$.zone_idcd') as zone_idcd									")
			.where("     , (select item_name  from item_mast i where a.rpst_item_idcd  = i.item_idcd)			")
			.where("     as rpst_item_name																		")
			.where("     , (select base_name from base_mast r1  where  r1.base_code	= a.acct_bacd   and r1.prnt_idcd = '1102' and line_stat = 0 limit 1) acct_bacd_name														")
			.where("     , (select base_name from base_mast r2  where  r2.base_code = a.mtrl_bacd   and r2.prnt_idcd = '3101' and line_stat = 0 limit 1) mtrl_bacd_name														")
			.where("     , (select base_name from base_mast r3  where  r3.base_code	= b.ogin_bacd   and r3.prnt_idcd = '1202' and line_stat = 0 limit 1) ogin_bacd_name														")
			.where("     , b.puch_itvl_qntt   , b.avrg_supl_dcnt    , b.optm_offr_volm    , b.make_cmpy_name	")
			.where("     , b.minm_puch_qntt   , b.coun_iout_dvcd    , c.wkfw_idcd as wkfw_idcd2					")
			.where("     , c.colr_bacd        , c.wkfw_idcd         , c.prod_type_dvcd    , w.wkfw_name as wkfw_name2	")
			.where("     , c.optn_dvcd        , c.optm_prod_volm    , c.last_insp_yorn    , c.dplt_name			")
			.where("     , c.cstm_dplt_name   , c.expt_boxx_sort    , c.expt_boxx_wtfl    , c.dplt_sort			")
			.where("     , c.dplt_wtfl        , c.dplt_bulk         , c.cstm_pper_boxx    , c.cstm_dplt			")
			.where("     , c.midl_boxx        , c.larg_boxx         , c.tray									")
			.where("     , e1.sale_drtr_idcd   , f1.wrhs_name as istt_wrhs_name, f1.wrhs_name as istt_wrhs_name1")
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
			.where("     , s.puch_pric		  , a.safe_stok														")
			.where("     , s.shpm_pric_1fst , s.shpm_pric_2snd , s.shpm_pric_3trd , s.shpm_pric_4frt			")
			.where("     , s.shpm_pric_5fit , s.cnsr_pric      , pk.base_name as pkge_name						")
			.where("     , m.mold_name        , m.mold_idcd         , b.cstm_idcd as base_vend_idcd				")
			.where("     , (select base_name from base_mast bs where c.colr_bacd = bs.base_code	 and bs.prnt_idcd = '3104') as colr_bacd_name")
			.where("     , (select base_name from base_mast m where a.brnd_bacd = m.base_code and m.prnt_idcd  = '4000') as brnd_name")
			.where("     , ic.cstm_idcd as 'cont_cstm_idcd' , ic.cont_date, ic.deli_dcnt , ic.trnt_mthd_dvcd	")
			.where("     , ic.drtr_idcd as 'cont_drtr_idcd', ic.ftmr_insp_yorn, ic.mdmr_insp_yorn, ic.ltmr_insp_yorn")
			.where("     , ic.cont_pric , e2.cstm_name as 'cont_cstm_name' , g4.user_name as 'cont_drtr_name'	")
			.where("     , cs.cstm_name    , a.mker_name           , a.supl_dvcd								")
			.where("     , json_value(a.json_data , '$**.dvrs_item_idcd') as dvrs_item_idcd, im.item_name as dvrs_item_name")
			.where("     , json_value(a.json_data , '$.prts_type_name') as prts_type_name						")
			.where("     , substring(a.item_code, 1, length(a.item_code) - 4) as item_code_prefix , substring(a.item_code, -4) as  item_code_subfix")
			.where("     , z.zone_name																			")
			.where("from   (  select a.item_idcd from item_mast a												")
			.where("          where  1=1																		")
			.where("          and    a.acct_bacd not in ('3001')												")
			.where("          and    a.find_name REGEXP :find_name	"	, find_name)
			.where("          and    a.item_idcd   = :item_idcd		"	, arg.getParameter("item_idcd"))
			.where("          and    a.item_code   = :item_code		"	, arg.getParameter("item_code"))
			.where("          and    a.item_spec   = :item_spec		"	, arg.getParameter("item_spec"))
			.where("          and    a.line_stat   = :line_stat1	"	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("          and    a.lcls_idcd   = :lcls_idcd		"	, arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("          and    a.mcls_idcd   = :mcls_idcd		"	, arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("          and    a.scls_idcd   = :scls_idcd		"	, arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("          and    a.acct_bacd   = :acct_code		"	, arg.getParamText("acct_code" ) , !"".equals(arg.getParamText("acct_code" )))
			.where("          and    a.acct_bacd in ('3000')					" , "제품".equals(arg.getParameter("acct_bacd")) )
			.where("          and    a.acct_bacd in ('4000')					" , "상품".equals(arg.getParameter("acct_bacd")) )
			.where("          and    a.acct_bacd in ('1001', '1002','1003')		" , "자재".equals(arg.getParameter("acct_bacd")) )
			.where("          and    a.acct_bacd in ('2001', '2002','3000')		" , "재공품".equals(arg.getParameter("acct_bacd")) )
			.where("          and    a.acct_bacd in ('2001', '2002','3000')		" , "생산품".equals(arg.getParameter("acct_bacd")) )
			.where("          and    a.acct_bacd in ('5000', '6000')			" , "기타".equals(arg.getParameter("acct_bacd")) )
			.where("          and    a.line_stat   < :line_stat      " , "3" , "".equals(arg.getParamText("line_stat" ))		)
		;
			if (!arg.getParamText("add").equals("")) {
				data.param
					.where("and a.item_path_dvcd in (1,2)")
				;
			}else{
				data.param
					.where("and a.item_path_dvcd in (1)")
				;
			}
		data.param
			.where("       ) cbin																				")
			.where("       inner join item_mast           a  on cbin.item_idcd = a.item_idcd					")
			.where("       left outer join item_purc      b  on a.item_idcd = b.item_idcd and last_yorn = '1'	")
			.where("       left outer join item_adon      c  on a.item_idcd = c.item_idcd						")
			.where("       left outer join item_cont      ic on a.item_idcd = ic.item_idcd and ic.line_seqn = 1	")
			.where("       left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd						")
			.where("       left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd						")
			.where("       left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd						")
			.where("       left outer join cstm_mast      e1 on b.cstm_idcd = e1.cstm_idcd						")
			.where("       left outer join cstm_mast      e2 on ic.cstm_idcd = e2.cstm_idcd						")
			.where("       left outer join wrhs_mast      f1 on a.istt_wrhs_idcd = f1.wrhs_idcd					")
			.where("       left outer join wrhs_mast      f2 on a.ostt_wrhs_idcd = f2.wrhs_idcd					")
			.where("       left outer join user_mast      g2 on e1.sale_drtr_idcd = g2.user_idcd				")
			.where("       left outer join user_mast      g3 on b.drtr_idcd = g3.user_idcd						")
			.where("       left outer join user_mast      g4 on ic.drtr_idcd = g4.user_idcd						")
			.where("       left outer join wkfw_clss      w  on c.wkfw_idcd = w.wkfw_idcd						")
			.where("       left outer join unit_mast      u  on a.unit_idcd = u.unit_idcd						")
			.where("       left outer join insp_type_mast i  on a.insp_type_idcd = i.insp_type_idcd				")
			.where("       left outer join mold_mast      m  on c.mold_idcd = m.mold_idcd						")
			.where("       left outer join item_sale_pric s  on a.item_idcd = s.item_idcd						")
			.where("       left outer join cstm_mast      cs on json_value(a.json_data , '$**.cstm_idcd') = cs.cstm_idcd	")
			.where("       left outer join item_mast      im on json_value(a.json_data , '$**.dvrs_item_idcd') = im.item_idcd	")
			.where("       left outer join wrhs_zone      z  on json_value(a.json_data , '$**.zone_idcd') = z.zone_idcd	and a.istt_wrhs_idcd = z.wrhs_idcd ")
			.where("       left outer join ( select if( a.base_name <>''										")
			.where("                                  , CONCAT(a.base_name,' : ',format(b.pckg_qntt,0))			")
			.where("                                  , '') as base_name					 					")
			.where("                                  , b.item_idcd				 								")
			.where("                         from base_mast a													")
			.where("                         left outer join item_pkge b on a.base_code = b.pckg_bacd 			")
			.where("                         where a.prnt_idcd = '8004'											")
			.where("                         and   b.base_yorn = '1'											")
			.where("                       ) pk on a.item_idcd = pk.item_idcd									")
			.where("       where  h.item_clss_bacd   = :item_clss_bacd		"	, arg.getParameter("item_clss_bacd"))
			.where("order by a.item_code desc )a																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getItem_Memo(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select *																						")
		;
		data.param
		.where("from (																							")
		.where("select      a.item_idcd      , a.line_seqn       , a.memo_dvcd      , a.memo_date				")
		.where("          , a.drtr_idcd      , CONVERT(a.item_memo USING utf8) as item_memo						")
		.where("          , u.user_name  as drtr_name															")

		.where("from   item_memo a																				")
		.where("       left outer join user_mast  u  on a.drtr_idcd = u.user_idcd 								")
		.where("where  1=1																						")
		.where("and    a.item_idcd   = :item_idcd		"	, arg.getParameter("item_idcd"))
		.where("order by a.line_seqn																			")
		.where(")a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getItem_Mngt(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String item_idcd = arg.getParamText("item_idcd" );
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.mngt_sbsc_idcd      , a.mngt_sbsc_name												")
		;
		if(!item_idcd.equals("")){
			data.param
				.query("      , b.mngt_sbsc_valu  , b.item_idcd														")
			;
		}
		data.param
			.where("from   mngt_sbsc_mast a																			")
		;
		if(!item_idcd.equals("")){
			data.param
				.where("       left    join (select * from item_sbsc   												")	//item_idcd가 없는 추가의 경우 전부 검색되게 처리해야함
				.where("       where item_idcd = :item_idcd   						", arg.fixParameter("item_idcd" ))
				.where("         ) b on  a.mngt_sbsc_idcd = b.mngt_sbsc_idcd   										")
			;
		}
		data.param
			.where("where  1=1																						")
			.where("and   a.mngt_sbsc_dvcd = '1000'																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getItem_Pkge(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.base_code as pckg_bacd , b.pckg_qntt  , b.base_yorn				")
		;
		data.param
			.where("from    base_mast a 														")
			.where("left outer join ( select * 	 												")
			.where("                  from item_pkge 											")
			.where("                  where item_idcd = :item_idcd ", arg.fixParameter("item_idcd"))
			.where("                ) b on a.base_code = b.pckg_bacd 							")
			.where("where   1=1																	")
			.where("and   a.prnt_idcd = '8004'													")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getPckg_Bacd(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select  a.base_code      , a.base_name													")
		;
		data.param
			.where("from    base_mast a																		")
			.where("where   prnt_idcd = '8004'																")
		;
		return data.selectForMap();
	}
	public SqlResultMap getItemDesc(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from (																											")
			.where("select h.unit_idcd as unit_idcd2           , h.unit_name as unit_name2											")
			.where("     , h.bolt_unit_dvcd , h.bolt_dvcd      , h.mtty_dvcd														")
			.where("     , h.leng_unit																								")
			.where("     , ifnull(h.leng_valu      , substring_index(a.item_spec,'/',1)) as leng_valu								")
			.where("     , h.leng_unit_2snd																							")
			.where("     , ifnull(h.leng_valu_2snd , substring_index(substring_index(a.item_spec,'-',1),'/',-1)) as leng_valu_2snd	")
			.where("     , h.widh_unit																								")
			.where("     , ifnull(h.widh_valu      , substring_index(substring_index(a.item_spec,'-',2),'-',-1))  as widh_valu		")
			.where("     , h.tick_unit																								")
			.where("     , ifnull(h.tick_valu      , substring_index(substring_index(a.item_spec,'-',3),'-',-1))  as tick_valu		")
			.where("     , h.widh_edge      , h.dim_valu       , h.spgr_unit														")
			.where("     , h.spgr_valu      , h.item_wigt      , h.drwg_numb      , h.inch_name_code								")
			.where("     , h.inch_mtct      , h.inch_otsd_dimt , h.jiss_name      , h.jiss_pich										")
			.where("     , h.fixd_leng      , h.lead_angl      , h.lead_angl_stte , h.lead_angl_mint								")
			.where("     , h.tper_dpth      , h.tper_leng      , h.tper_angl      , h.tper_angl_stte								")
			.where("     , h.tper_angl_mint , h.half_pich      , h.sinn_valu      , h.h_valu										")
			.where("     , h.a_valu         , h.b_valu         , h.ra_valu        , h.rb_valu										")
			.where("     , h.h2_valu        , h.bolt_dpth      , h.mntn_dpth														")
			.where("     , h.mtrl_dimt      , h.otsd_dimt      , h.a_valu_scpe    , h.b_valu_scpe									")
			.where("     , h.mntn_dpth_scpe , h.plat_optn      , h.tolr_valu      , h.item_clss_bacd								")
			.where("     , h.item_bacd      , h.make_bacd      , h.srfc_proc_yorn , h.iput_qntt										")
			.where("     , h.hght_valu_1fst , h.wdth_valu_11   , h.wdth_valu_12   , h.wdth_valu_13									")
			.where("     , h.wdth_valu_2snd , h.wdth_valu_3trd																		")
			.where("from   item_mast a																								")
			.where("       left outer join item_desc      h  on a.item_idcd = h.item_idcd and h.line_seqn = 1						")
			.where("where  1=1																										")
			.where("and    a.find_name	like %:find_name%	"	, arg.getParamText("find_name"))
			.where("and    a.item_idcd   = :item_idcd		"	, arg.getParameter("item_idcd"))
			.where("and    a.item_code   = :item_code		"	, arg.getParameter("item_code"))
			.where("order by a.item_code																							")
			.where(")a																												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getIsos(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call book_list ( :param",arg.fixParameter("param"))
			.query(")")
		;
		return data.selectForMap();
	}
	public SqlResultMap getRett(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data 	= arg.newStorage("POS");
		String item_idcd	= arg.getParamText("item_idcd") ;
		String fr_date		= arg.getParamText("fr_date") ;
		String to_date		= arg.getParamText("to_date") ;

		data.param
			.query("call goods_rett (			")
			.query("   :item_idcd"	, item_idcd	)
			.query(" , :fr_date	" 	,fr_date )
			.query(" , :to_date	" 	,to_date )
			.query(" , ''	")
			.query(" ) 		")
		;
		SqlResultMap info = data.selectForMap();
		return info;
	}
	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String find_name = "";
		String work_stat = "";

		if(arg.getParameter("work_stat")!= null){
			work_stat = (String) arg.getParameter("work_stat");
		}

		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
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
			.where("       end  as clss_desc																	")
			.where("     , (select base_name from base_mast r where a.acct_bacd  = r.base_code					")
			.where("                                          and   r.line_stat = 0								")
			.where("                                          and   r.prnt_idcd = '1102' limit 1)   as acct_bacd_name	")
			.where("     , a.item_stnm        , a.item_egnm         , a.item_egnm_stnm    , a.vatx_dvcd			")
			.where("     , a.vatx_incl_yorn   , a.optn_item_yorn    , a.sets_item_yorn    , a.roll_mngt_yorn	")
			.where("     , a.lott_mngt_yorn   , a.sral_mngt_yorn    , a.insp_objt_yorn    , a.insp_type_idcd	")
			.where("     , a.insp_mthd_dvcd   , a.smpl_stnd_dvcd    , a.insp_levl_dvcd    , a.shpm_insp_yorn	")
			.where("     , a.rcpt_insp_yorn   , a.ostt_wrhs_idcd    , a.rtil_ddln_dvcd							")
			.where("     , a.rtil_ddln_dcnt   , a.stun_exng_volm    , a.sral_idnf_code    , a.ndqt_calc_dvcd	")
			.where("     , a.otod_loss_rate   , a.ostt_mthd_dvcd    , a.incm_loss_rate    , a.stok_sale_yorn	")
			.where("     , a.auto_istt_yorn   , a.mtrl_bacd														")
			.where("     , json_value(a.json_data , '$.zone_idcd') as zone_idcd									")
			.where("     , (select base_name  from base_mast r where a.mtrl_bacd  = r.base_code					")
			.where("                                           and   r.line_stat = 0							")
			.where("                                           and   r.prnt_idcd = '3101' limit 1) as mtrl_bacd_name	")
			.where("     , (select refn_valu_1fst  from base_mast r where a.mtrl_bacd  = r.base_code			")
			.where("                                           and   r.line_stat = 0							")
			.where("                                           and   r.prnt_idcd = '3101' limit 1) as refn_valu_1fst	")
			.where("     , b.puch_itvl_qntt   , b.avrg_supl_dcnt    , b.optm_offr_volm    , b.make_cmpy_name	")
			.where("     , b.minm_puch_qntt   , b.coun_iout_dvcd												")
			.where("     , c.colr_bacd        , c.wkfw_idcd         , c.prod_type_dvcd							")
			.where("     , c.optn_dvcd        , c.optm_prod_volm    , c.last_insp_yorn    , c.dplt_name			")
			.where("     , c.cstm_dplt_name   , c.expt_boxx_sort    , c.expt_boxx_wtfl    , c.dplt_sort			")
			.where("     , c.dplt_wtfl        , c.dplt_bulk         , c.cstm_pper_boxx    , c.cstm_dplt			")
			.where("     , c.midl_boxx        , c.larg_boxx         , c.tray									")
			.where("     , (select base_name  from base_mast r where c.colr_bacd  = r.base_code					")
			.where("                                           and   r.prnt_idcd = '3104') as colr_bacd_name	")
			.where("     , a.user_memo        , a.sysm_memo         , a.prnt_idcd         , a.line_levl			")
			.where("     , a.line_ordr        , a.line_stat         , a.line_clos         , a.find_name			")
			.where("     , a.updt_user_name   , a.updt_ipad         , a.updt_dttm         , a.updt_idcd			")
			.where("     , a.updt_urif        , a.spgr_valu         , a.item_leng         , a.item_widh			")
			.where("     , a.crte_user_name   , a.crte_ipad         , a.crte_dttm         , a.crte_idcd			")
			.where("     , a.crte_urif        , u.unit_name         , p.puch_pric         , a.unit_wigt			")
			.where("     , a.item_tick        , cs.cstm_name        , s.stok_qntt								")
			.where("     , (select base_name from base_mast bs where bs.base_code = h.item_clss_bacd and bs.prnt_idcd = '8001'	) as item_clss_bacd_name ")
			.where("     , (select max(pi.istt_pric) from purc_istt_mast pm										")
			.where("									left outer join purc_istt_item pi on pi.invc_numb = pm.invc_numb")
			.where("									left outer join wrhs_zone wz on pi.zone_idcd = wz.zone_idcd")
			.where("									where 1=1												")
			.where("									  and pm.line_stat < '2'								")
			.where("									  and pi.item_idcd = a.item_idcd						")
			.where("											order by pm.invc_date limit 30) as max_pric		")
			.where("     , wz.zone_name        , wm.wrhs_name as istt_wrhs_name									")
			.where("     , s.wrhs_idcd as istt_wrhs_idcd														")
		;
		data.param
			.where("from   item_mast a																							")
			.where("       left outer join ( select * from item_purc where last_yorn = '1')  b  on a.item_idcd = b.item_idcd	")
			.where("       left outer join item_adon      c  on a.item_idcd = c.item_idcd										")
			.where("       left outer join ( select item_idcd, GROUP_CONCAT(cstm_name) as cstm , group_concat(cstm_idcd) as cstm_idcd	")
			.where("                         from   item_cont																	")
			.where("                         where  1 = 1 																		")
			.where("                           and  cstm_idcd = :cstm_idcd2 " , arg.getParameter("cstm_idcd")	)
			.where("                         group  by item_idcd												")
			.where("                         ) d  on a.item_idcd = d.item_idcd									")
			.where("       left outer join item_desc      h  on a.item_idcd = h.item_idcd						")
			.where("       left outer join item_purc      p  on a.item_idcd = p.item_idcd						")
			.where("       left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd						")
			.where("       left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd						")
			.where("       left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd						")
			.where("       left outer join unit_mast      u  on a.unit_idcd = u.unit_idcd						")
			.where("       left outer join cstm_mast      cs on json_value(a.json_data , '$**.cstm_idcd') = cs.cstm_idcd	")
			.where("       left outer join stok_mast      s  on a.item_idcd = s.item_idcd						")
			.where("       left outer join wrhs_zone      wz on json_value(a.json_data , '$.zone_idcd') = wz.zone_idcd		")
			.where("       left outer join wrhs_mast      wm on a.istt_wrhs_idcd = wm.wrhs_idcd					")
			.where("where  1=1								 													")
			.where("and    a.acct_bacd not in ('3001')															")
//			.where("and    a.item_idcd = :item_idcd						" , arg.getParameter("item_idcd"))
			.where("and    a.item_code = :item_code						" , arg.getParameter("item_code"))
			.where("and    a.acct_bacd = :acct_bacd						" , arg.getParameter("acct"))
			.where("and    a.brnd_bacd = :brnd_bacd						" , arg.getParameter("brnd_bacd"))
			.where("and    s.wrhs_idcd = :wrhs_idcd						" , arg.getParameter("wrhs_idcd"))
			.where("and    a.rpst_item_idcd = :rpst_item_idcd			" , arg.getParameter("rpst_item_idcd"))
		;
		data.param
			.where("and    a.find_name like %:find_name%				" , arg.getParameter("find_name"))
			.where("and    a.acct_bacd  =  '3000'						" , "수리품".equals(arg.getParameter("acct_bacd")) )    // aone 품목코드
			.where("and    a.acct_bacd  =  '1001'						" , "부품".equals(arg.getParameter("acct_bacd")) )    // aone 품목코드
			.where("and    a.acct_bacd  =  '4000'						" , "제품".equals(arg.getParameter("acct_bacd")) )    // aone 품목코드
			.where("and    a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("and    a.item_path_dvcd = :item_path_dvcd			" , arg.getParameter("item_path_dvcd"))
			.where("and    a.item_idcd in ( select item_idcd from item_sbsc where mngt_sbsc_valu = :mngt_sbsc_valu " , arg.getParameter("mngt_sbsc_valu"))
			.where("                        and mngt_sbsc_idcd = :mngt_sbsc_idcd )" , arg.getParameter("mngt_sbsc_idcd"))
		;
		if(work_stat.equals("1")){
			data.param
				.where("and    s.stok_qntt > 0	")
			;
		}
		data.param
			.where("order by a.item_code ) a																	")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getLookup3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
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
			.where("                                          and   r.prnt_idcd = '1102')   as acct_bacd_name	")
			.where("     , a.item_stnm        , a.item_egnm         , a.item_egnm_stnm    , a.vatx_dvcd			")
			.where("     , a.vatx_incl_yorn   , a.optn_item_yorn    , a.sets_item_yorn    , a.roll_mngt_yorn	")
			.where("     , a.lott_mngt_yorn   , a.sral_mngt_yorn    , a.insp_objt_yorn    , a.insp_type_idcd	")
			.where("     , a.insp_mthd_dvcd   , a.smpl_stnd_dvcd    , a.insp_levl_dvcd    , a.shpm_insp_yorn	")
			.where("     , a.rcpt_insp_yorn   , a.istt_wrhs_idcd    , a.ostt_wrhs_idcd    , a.rtil_ddln_dvcd	")
			.where("     , a.rtil_ddln_dcnt   , a.stun_exng_volm    , a.sral_idnf_code    , a.ndqt_calc_dvcd	")
			.where("     , a.otod_loss_rate   , a.ostt_mthd_dvcd    , a.incm_loss_rate							")
			.where("     , a.auto_istt_yorn   , a.mtrl_bacd														")
			.where("     , (select base_name  from base_mast r where a.mtrl_bacd  = r.base_code					")
			.where("                                           and   r.prnt_idcd = '3101') as mtrl_bacd_name	")
			.where("     , b.puch_itvl_qntt   , b.avrg_supl_dcnt    , b.optm_offr_volm    , b.make_cmpy_name	")
			.where("     , b.minm_puch_qntt   , b.coun_iout_dvcd												")
			.where("     , c.colr_bacd        , c.wkfw_idcd         , c.prod_type_dvcd							")
			.where("     , c.optn_dvcd        , c.optm_prod_volm    , c.last_insp_yorn    , c.dplt_name			")
			.where("     , c.cstm_dplt_name   , c.expt_boxx_sort    , c.expt_boxx_wtfl    , c.dplt_sort			")
			.where("     , c.dplt_wtfl        , c.dplt_bulk         , c.cstm_pper_boxx    , c.cstm_dplt			")
			.where("     , c.midl_boxx        , c.larg_boxx         , c.tray									")
			.where("     , (select base_name  from base_mast r where c.colr_bacd  = r.base_code					")
			.where("                                           and   r.prnt_idcd = '3104') as colr_bacd_name	")
			.where("     , a.user_memo        , a.sysm_memo         , a.prnt_idcd          , a.line_levl		")
			.where("     , a.line_ordr        , a.line_stat         , a.line_clos          , a.find_name		")
			.where("     , a.updt_user_name   , a.updt_ipad         , a.updt_dttm          , a.updt_idcd		")
			.where("     , a.updt_urif																			")
			.where("     , a.crte_user_name   , a.crte_ipad         , a.crte_dttm         , a.crte_idcd			")
			.where("     , a.crte_urif        , u.unit_name														")
			.where("from   item_mast a																			")
			.where("       left outer join (select * from item_purc where last_yorn = '1')  b  on a.item_idcd = b.item_idcd	")
			.where("       left outer join item_adon      c  on a.item_idcd = c.item_idcd						")
			.where("       left outer join item_cont      d  on a.item_idcd = d.item_idcd						")
			.where("       left outer join item_desc      h  on a.item_idcd = h.item_idcd						")
			.where("       left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd						")
			.where("       left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd						")
			.where("       left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd						")
			.where("       left outer join unit_mast      u  on a.unit_idcd = u.unit_idcd						")
			.where("where  1=1																					")
			.where("and    a.find_name	like %:find_name%				" , arg.getParamText("find_name"))
			.where("and    d.cstm_idcd	=  :cstm_idcd					" , arg.getParameter("cstm_idcd"))
			.where("and    a.item_code	=  :item_code					" , arg.getParameter("item_code"))
			.where("and    a.line_stat  =  :line_stat1					" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("and    a.acct_bacd in ('3000')						" , "제품".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.acct_bacd in ('4000')						" , "상품".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.acct_bacd in ('1001')						" , "원재료".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.acct_bacd in ('1002')						" , "부재료".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.acct_bacd in ('1001', '1002','1003','1004')" , "자재".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.acct_bacd in ('2001', '2002','3000')		" , "재공품".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.acct_bacd in ('2001', '2002','3000')		" , "생산품".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.acct_bacd in ('5000', '6000')				" , "기타".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.acct_bacd in ('2002')						" , "반제품".equals(arg.getParameter("acct_bacd")) )
			.where("and    a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order by a.item_code ) a																	")		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getLookupspec(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select a.item_idcd        , a.item_code         , a.item_brcd_1fst    , a.item_brcd_2snd	")
			.where("     , a.item_brcd_3trd   , a.item_name         , a.item_spec         , a.modl_name			")
		;
		data.param
			.where("from   item_mast a																			")
			.where("where  1=1																					")
			.where("and     a.item_spec   like :item_spec%		" , arg.getParamText("find_name"))
		;
		data.param
			.where("order by a.item_code ) a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getAcpt(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from(")
			.where("select    a.invc_numb as acpt_numb		, b.invc_date as acpt_date	, a.invc_amnt				")
			.where("		, a.invc_qntt					, a.invc_pric				, s.ostt_qntt as dlvy_qntt	")
			.where("		, b.acpt_stat_dvcd				, c.cstm_name											")
			.where("from   acpt_item a																				")
			.where("left   outer join acpt_mast      b on a.invc_numb = b.invc_numb									")
			.where("left   outer join spts_item      s on a.invc_numb = s.acpt_numb									")
			.where("left   outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd									")
			.where("where  1=1																						")
			.where("and    a.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a")
		;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1), sort );
			}
		}

	public SqlResultMap getProd(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from(																							")
			.where("select	p2.pdod_date 			, a.invc_date as prod_date	, a.wkod_numb						")
			.where("		, w.wkct_name			, a.prod_qntt			, a.good_qntt		, a.poor_qntt		")
			.where("from   work_book a																				")
			.where("left outer join pror_item p1 on a.wkod_numb   = p1.invc_numb and a.wkod_seqn = p1.line_seqn		")
			.where("left outer join pror_mast p2 on p1.invc_numb  = p2.invc_numb									")
			.where("left outer join wkct_mast w  on a.wkct_idcd   = w.wkct_idcd										")
			.where("where  1=1																						")
			.where("and    a.item_idcd  = :item_idcd		" , arg.getParamText("item_idcd"))
			.where("and    p2.line_clos = :line_clos		" , "0")
			.where("and    p1.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb ) a")
		;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1), sort );
			}
		}

	public SqlResultMap getOsttRett(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.query("call ostt_rett (			")
		.query("   :item_idcd		"  , arg.getParamText("item_idcd"))
		.query(" ) 								")
		;
		SqlResultMap info = data.selectForMap();

		data.attach(Action.direct);
		data.execute();
		return info;
	}

	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select item_imge, item_imge2		")
			.where("from  item_mast						")
			.where("where 1=1							")
			.where("and   item_idcd = :item_idcd",arg.getParameter("item_idcd"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getItemCodeCheck(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(*) as chk													")
			.where("from  item_mast															")
			.where("where item_code = :item_code", arg.fixParameter("item_code"))
			.where("and   line_stat < 2														")

		;
		return data.selectForMap();
	}

	public SqlResultMap getItemCodeCheck(HttpRequestArgument arg, String itemCode) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(*) as chk													")
			.where("from  item_mast															")
			.where("where item_code = :item_code", itemCode)
			.where("and   line_stat < 2														")

		;
		return data.selectForMap();
	}

	public SqlResultMap getItemAcpt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			data.param
//			.query("select   m.cstm_idcd      , d.item_idcd        , s.mtrl_bacd        , s.item_clss_bacd		")
			.query("select   m.cstm_idcd      , d.item_idcd        , s.mtrl_bacd        , i.item_clss_bacd		")
			.query("     , s.item_bacd        , s.make_bacd        , s.srfc_proc_yorn   , s.emgc_yorn			")
			.query("     , s.drwg_numb        , s.prod_lott_numb   , d.invc_pric								")
//			.query("     , (select base_name from base_mast r where s.item_clss_bacd  = r.base_code				")
//			.query("                                     and   r.prnt_idcd = '8001')   as item_clss_bacd_name	")
			.query("     , (select base_name from base_mast r where i.item_clss_bacd  = r.base_code				")
			.query("                                     and   r.prnt_idcd = '8001')   as item_clss_bacd_name	")
			.query("     , (select base_name from base_mast r where s.item_bacd  = r.base_code					")
			.query("                                     and   r.prnt_idcd = '8002')   as item_bacd_name		")
			.query("     , (select base_name from base_mast r where s.make_bacd  = r.base_code					")
			.query("                                     and   r.prnt_idcd = '8003')   as make_bacd_name		")
			.query("     , (select base_name from base_mast r where s.mtrl_bacd  = r.base_code					")
			.query("                                     and   r.prnt_idcd = '3101')   as mtrl_bacd_name		")
			.query("from   acpt_item d																			")
			.query("       left join acpt_mast m on d.invc_numb = m.invc_numb and d.amnd_degr = m.amnd_degr		")
			.query("       left join acpt_prod_spec s on d.invc_numb = s.invc_numb and d.amnd_degr = s.amnd_degr and d.line_seqn = s.line_seqn		")
			.query("       left outer join item_desc i on d.item_idcd = i.item_idcd								")
			.query("where  1=1																					")
			.query("and     d.item_idcd = :item_idcd" , row.getParamText("item_idcd"))
			.query("and     m.cstm_idcd = :cstm_idcd" , row.getParamText("cstm_idcd"))
			.query("order by m.invc_date desc, m.invc_numb														")
			.query("limit 1																						")
			;
		}
		System.out.println(data.selectForMap());
		return data.selectForMap();
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
			.query("select a.item_idcd        , a.item_code         , a.item_brcd_1fst    , a.item_brcd_2snd	")
			.query("     , a.item_brcd_3trd   , a.item_name         , a.item_spec         , a.modl_name			")
			.query("     , a.unit_idcd        , a.lott_idnf_code    , a.stok_mngt_yorn							")
			.query("     , a.lcls_idcd        , a.mcls_idcd         , a.scls_idcd         , a.acct_bacd			")
			.query("     , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name	")
			.query("     , case when c3.clss_name is not null then c3.clss_desc									")
			.query("            else case when c2.clss_name is not null then c2.clss_desc						")
			.query("                      else c1.clss_name														")
			.query("                 end																		")
			.query("       end  as clss_desc  																	")
			.query("     , (select base_name from base_mast r where a.acct_bacd  = r.base_code					")
			.query("                                          and   r.prnt_idcd = '1102')   as acct_bacd_name	")
			.query("     , a.item_stnm        , a.item_egnm         , a.item_egnm_stnm    , a.vatx_dvcd			")
			.query("     , a.vatx_incl_yorn   , a.optn_item_yorn    , a.sets_item_yorn    , a.roll_mngt_yorn	")
			.query("     , a.lott_mngt_yorn   , a.sral_mngt_yorn    , a.insp_objt_yorn    , a.insp_type_idcd	")
			.query("     , a.insp_mthd_dvcd   , a.smpl_stnd_dvcd    , a.insp_levl_dvcd    , a.shpm_insp_yorn	")
			.query("     , a.rcpt_insp_yorn   , a.istt_wrhs_idcd    , a.ostt_wrhs_idcd    , a.rtil_ddln_dvcd	")
			.query("     , a.rtil_ddln_dcnt   , a.stun_exng_volm    , a.sral_idnf_code    , a.ndqt_calc_dvcd	")
			.query("     , a.otod_loss_rate   , a.ostt_mthd_dvcd    , a.incm_loss_rate							")
			.query("     , a.auto_istt_yorn   , a.item_imge         , a.item_imge2         , a.mtrl_bacd		")
			.query("     , (select base_name  from base_mast r where a.mtrl_bacd  = r.base_code					")
			.query("                                           and   r.prnt_idcd = '3101') as mtrl_bacd_name	")
			.query("     , b.puch_itvl_qntt   , b.avrg_supl_dcnt    , b.optm_offr_volm    , b.make_cmpy_name	")
			.query("     , b.minm_puch_qntt   , b.coun_iout_dvcd    , b.puch_pric								")
			.query("     , c.colr_bacd        , c.wkfw_idcd         , c.prod_type_dvcd							")
			.query("     , c.optn_dvcd        , c.optm_prod_volm    , c.last_insp_yorn    , c.dplt_name			")
			.query("     , c.cstm_dplt_name   , c.expt_boxx_sort    , c.expt_boxx_wtfl    , c.dplt_sort			")
			.query("     , c.dplt_wtfl        , c.dplt_bulk         , c.cstm_pper_boxx    , c.cstm_dplt			")
			.query("     , c.midl_boxx        , c.larg_boxx         , c.tray									")
			.query("     , (select base_name  from base_mast r where c.colr_bacd  = r.base_code					")
			.query("                                           and   r.prnt_idcd = '3104') as colr_bacd_name	")
			.query("     , d.cont_date        , d.deli_dcnt         , d.trnt_mthd_dvcd    , d.drtr_idcd			")
			.query("     , d.ftmr_insp_yorn   , d.mdmr_insp_yorn    , d.ltmr_insp_yorn							")
			.query("     , d.cont_pric        , e1.sale_drtr_idcd   , f1.wrhs_name as istt_wrhs_name			")
			.query("     , f2.wrhs_name as ostt_wrhs_name           , u.unit_name								")
			.query("     , e1.cstm_name as base_vend_name           , b.cstm_idcd as base_vend_idcd				")
			.query("     , e3.cstm_name as cont_cstm_name           , g1.user_name as cont_drtr_name			")
			.query("     , g2.user_name as sale_user_name           , w.wkfw_name         , i.insp_type_name	")
			.query("     , g3.user_name as drtr_name															")
			.query("     , a.user_memo        , a.sysm_memo         , a.prnt_idcd          , a.line_levl		")
			.query("     , a.line_ordr        , a.line_stat         , a.line_clos          , a.find_name		")
			.query("     , a.updt_user_name   , a.updt_ipad         , a.updt_dttm          , a.updt_idcd		")
			.query("     , a.updt_urif																			")
			.query("     , a.crte_user_name   , a.crte_ipad         , a.crte_dttm         , a.crte_idcd			")
			.query("     , a.crte_urif																			")
			.query("     , h.unit_idcd as unit_idcd2  , h.unit_name as unit_name2								")
			.query("     , h.bolt_unit_dvcd , h.bolt_dvcd      , h.mtty_dvcd									")
			.query("     , h.leng_unit																								")
			.query("     , ifnull(h.leng_valu      , substring_index(a.item_spec,'/',1)) as leng_valu								")
			.query("     , h.leng_unit_2snd																							")
			.query("     , ifnull(h.leng_valu_2snd , substring_index(substring_index(a.item_spec,'-',1),'/',-1)) as leng_valu_2snd	")
			.query("     , h.widh_unit																								")
			.query("     , ifnull(h.widh_valu      , substring_index(substring_index(a.item_spec,'-',2),'-',-1))  as widh_valu		")
			.query("     , h.tick_unit																								")
			.query("     , ifnull(h.tick_valu      , substring_index(substring_index(a.item_spec,'-',3),'-',-1))  as tick_valu		")
			.query("     , h.widh_edge      , h.dim_valu       , h.spgr_unit									")
			.query("     , h.spgr_valu      , h.item_wigt      , h.drwg_numb      , h.inch_name_code			")
			.query("     , h.inch_mtct      , h.inch_otsd_dimt , h.jiss_name      , h.jiss_pich					")
			.query("     , h.fixd_leng      , h.lead_angl      , h.lead_angl_stte , h.lead_angl_mint			")
			.query("     , h.tper_dpth      , h.tper_leng      , h.tper_angl      , h.tper_angl_stte			")
			.query("     , h.tper_angl_mint , h.half_pich      , h.sinn_valu      , h.h_valu					")
			.query("     , h.a_valu         , h.b_valu         , h.ra_valu        , h.rb_valu					")
			.query("     , h.h2_valu        , h.bolt_dpth      , h.mntn_dpth									")
			.query("     , h.mtrl_dimt      , h.otsd_dimt      , h.a_valu_scpe    , h.b_valu_scpe				")
			.query("     , h.mntn_dpth_scpe , h.plat_optn      , h.tolr_valu      , h.item_clss_bacd			")
			.query("     , h.item_bacd      , h.make_bacd      , h.srfc_proc_yorn , h.iput_qntt					")
			.query("     , h.hght_valu_1fst , h.wdth_valu_11   , h.wdth_valu_12   , h.wdth_valu_13				")
			.query("     , h.wdth_valu_2snd , h.wdth_valu_3trd													")
			.query("     , m.mold_name																			")
			.query("from   item_mast a																			")
			.query("       left outer join item_purc      b  on a.item_idcd = b.item_idcd						")
			.query("       left outer join item_adon      c  on a.item_idcd = c.item_idcd						")
			.query("       left outer join item_cont      d  on a.item_idcd = d.item_idcd						")
			.query("       left outer join item_desc      h  on a.item_idcd = h.item_idcd						")
			.query("       left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd						")
			.query("       left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd						")
			.query("       left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd						")
			.query("       left outer join cstm_mast      e1 on b.cstm_idcd = e1.cstm_idcd						")
			.query("       left outer join cstm_mast      e3 on d.cstm_idcd = e3.cstm_idcd						")
			.query("       left outer join wrhs_mast      f1 on a.istt_wrhs_idcd = f1.wrhs_idcd					")
			.query("       left outer join wrhs_mast      f2 on a.ostt_wrhs_idcd = f2.wrhs_idcd					")
			.query("       left outer join user_mast      g1 on d.drtr_idcd = g1.user_idcd						")
			.query("       left outer join user_mast      g2 on e1.sale_drtr_idcd = g2.user_idcd				")
			.query("       left outer join user_mast      g3 on b.drtr_idcd = g3.user_idcd						")
			.query("       left outer join wkfw_clss      w  on c.wkfw_idcd = w.wkfw_idcd						")
			.query("       left outer join unit_mast      u  on a.unit_idcd = u.unit_idcd						")
			.query("       left outer join insp_type_mast i  on a.insp_type_idcd = i.insp_type_idcd				")
			.query("       left outer join mold_mast      m  on c.mold_idcd = m.mold_idcd						")
			.query("where  1=1																					")
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("and     a.line_stat = 0																		")
			.query("group by a.item_idcd																		")
		;
		return data.selectForMap();
	}
	// filesearch
	public SqlResultMap getFileSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

//			DataMessage data = new DataMessage("NETHOSTING");
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.orgn_dvcd       , a.invc_numb      , a.line_seqn        , a.assi_seqn			")
			.query("		, a.path_name       , a.file_name      , a.file_size        , a.upld_dttm			")
			.query("		, a.remk_text       , a.uper_seqn      , a.disp_seqn								")
		;
		data.param //퀴리문
			.where("from		apnd_file a																		")
			.where("where		1=1																				")
			.where("and			a.invc_numb = :item_idcd        " , arg.getParameter("item_idcd"				))
			.where("and			a.orgn_dvcd = :orgn_dvcd", "item_mast")												// 받아서 처리해야함
			.where("order by	a.line_seqn																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String item_spec = "";
		String out = arg.getParamText("records");
		String hq = "";

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			if(row.getParamText("hqof_idcd").length() > 0){
				hq = row.getParamText("hqof_idcd");
			}
			item_spec = row.getParamText("item_spec");
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
					data.param
						.table("item_mast												")
						.where("where item_idcd  = :item_idcd							")

						.unique("item_idcd"			, row.fixParameter("item_idcd"		))
						.update("line_stat"			, 2									)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

					data.param
						.table("item_adon												")
						.where("where item_idcd  = :item_idcd							")

						.unique("item_idcd"			, row.fixParameter("item_idcd"		))
						.update("line_stat"			, 2									)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

					data.param
						.table("item_purc												")
						.where("where item_idcd  = :item_idcd							")

						.unique("item_idcd"			, row.fixParameter("item_idcd"		))
						.update("line_stat"			, 2									)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

					data.param
						.table("item_desc												")
						.where("where item_idcd  = :item_idcd							")
						.where("and   line_seqn  = :line_seqn							")

						.unique("item_idcd"			, row.fixParameter("item_idcd"		))
						.unique("line_seqn"			, 1									)
						.update("line_stat"			, 2									)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);
					data.param
						.table("item_cont												")
						.where("where item_idcd  = :item_idcd							")
						.where("and   line_seqn  = :line_seqn							")

						.unique("item_idcd"			, row.fixParameter("item_idcd"		))
						.unique("line_seqn"			, 1									)
						.update("line_stat"			, 2									)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

					data.param
						.table("item_pkge												")
						.where("where item_idcd  = :item_idcd							")

						.unique("item_idcd"			, row.fixParameter("item_idcd"		))

						.update("line_stat"			, 2									)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

					if(!row.getParamText("zone_idcd").equals("")){
						data.param
							.table("wrhs_zone													")
							.where("where wrhs_idcd  = :wrhs_idcd							")
							.where("and   zone_idcd  = :zone_idcd							")

							.unique("zone_idcd"			, row.fixParameter("zone_idcd"		))
							.unique("wrhs_idcd"			, row.fixParameter("istt_wrhs_idcd"	))

							.update("line_clos"			, 0									)
							.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
						;
						data.attach(Action.update);
					}
					data.execute();
			} else {
				// 품목코드 신규 등록 시 중복체크를 한다.
				String item_code = row.getParamText("item_code_prefix") + "" + row.getParamText("item_code_subfix");
				if (rowaction == Action.insert) {
					SqlResultMap info = this.getItemCodeCheck(arg, item_code);

					if (0 != Integer.parseInt(info.get(0).getParamText("chk"))) {
						throw new ServiceException("동일한 품목 코드가 존재합니다. 품목코드 일련번호가 " +  String.format("%04d", Integer.parseInt(row.getParamText("item_code_subfix")) + 1) + "(으)로 재지정됩니다. ");
					}
				}

				ParamToJson p = new ParamToJson();
				String json = p.TranslateRow(arg, row, "item_mast_json_fields");
				String wrhs_idcd = "";
				String item_tick = "";
				String item_widh = "";
				String item_leng = "";
				item_tick = row.getParamText("item_tick");
				item_widh = row.getParamText("item_widh");
				item_leng = row.getParamText("item_leng");
				if(row.getParamText("acct_bacd").equals("3000")){
					wrhs_idcd = row.getParamText("istt_wrhs_idcd1");
				}else{
					wrhs_idcd = row.getParamText("istt_wrhs_idcd");
				}

				data.clear();
				data.param
					.table("item_mast												")
					.where("where item_idcd  = :item_idcd							")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
				//	.update("item_code"			, row.getParamText("item_code_prefix") + "" + row.getParamText("item_code_subfix"));
					.update("item_code"			, item_code)
					.update("item_brcd_1fst"	, row.getParameter("item_brcd_1fst"	))
					.update("item_brcd_2snd"	, row.getParameter("item_brcd_2snd"	))
					.update("item_brcd_3trd"	, row.getParameter("item_brcd_3trd"	))
					.update("item_name"			, row.getParameter("item_name"		))
					.update("item_spec"			, row.getParameter("item_spec"		))
					.update("item_leng"			, row.getParameter("item_leng"		))
					.update("item_widh"			, row.getParameter("item_widh"		))
					.update("item_tick"			, row.getParameter("item_tick"		))
					.update("modl_name"			, row.getParameter("modl_name"		))
					.update("brnd_bacd"			, row.getParameter("brnd_bacd"		))
					.update("lcls_idcd"			, row.getParameter("lcls_idcd"		))
					.update("mcls_idcd"			, row.getParameter("mcls_idcd"		))
					.update("scls_idcd"			, row.getParameter("scls_idcd"		))
					.update("acct_bacd"			, row.getParameter("acct_bacd"		))
					.update("item_stnm"			, row.getParameter("item_stnm"		))
					.update("item_egnm"			, row.getParameter("item_egnm"		))
					.update("item_engn_stnm"	, row.getParameter("item_engn_stnm"	))
					.update("vatx_dvcd"			, row.getParameter("vatx_dvcd"		))
					.update("safe_stok"			, row.getParameter("safe_stok"		))
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))
					.update("optn_item_yorn"	, row.getParameter("optn_item_yorn"	))
					.update("sets_item_yorn"	, row.getParameter("sets_item_yorn"	))
					.update("stok_mngt_yorn"	, row.getParameter("stok_mngt_yorn"	))
					.update("roll_mngt_yorn"	, row.getParameter("roll_mngt_yorn"	))
					.update("lott_mngt_yorn"	, row.getParameter("lott_mngt_yorn"	))
					.update("sral_mngt_yorn"	, row.getParameter("sral_mngt_yorn"	))
					.update("insp_objt_yorn"	, row.getParameter("insp_objt_yorn"	))
					.update("insp_type_idcd"	, row.getParameter("insp_type_idcd"	))
					.update("insp_mthd_dvcd"	, row.getParameter("insp_mthd_dvcd"	))
					.update("smpl_stmd_dvcd"	, row.getParameter("smpl_stmd_dvcd"	))
					.update("insp_levl_dvcd"	, row.getParameter("insp_levl_dvcd"	))
					.update("shpm_insp_yorn"	, row.getParameter("shpm_insp_yorn"	))
					.update("rcpt_insp_yorn"	, row.getParameter("rcpt_insp_yorn"	))
					.update("istt_wrhs_idcd"	, row.getParamText("istt_wrhs_idcd"	))
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"	))
					.update("rtil_ddln_dcnt"	, row.getParameter("rtil_ddln_dcnt"	))
					.update("rtil_ddln_dvcd"	, row.getParameter("rtil_ddln_dvcd"	))
					.update("stun_exng_volm"	, row.getParameter("stun_exng_volm"	))
					.update("sral_idnf_code"	, row.getParameter("sral_idnf_code"	))
					.update("ndqt_calc_dvcd"	, row.getParameter("ndqt_calc_dvcd"	))
					.update("otod_loss_rate"	, row.getParameter("otod_loss_rate"	))
					.update("ostt_mthd_dvcd"	, row.getParameter("ostt_mthd_dvcd"	))
					.update("incm_loss_rate"	, row.getParameter("incm_loss_rate"	))
					.update("auto_istt_yorn"	, row.getParameter("auto_istt_yorn"	))
					.update("line_stat"			, row.getParameter("line_stat"		))
					.update("lott_idnf_code"	, row.getParameter("lott_idnf_code"	))
					.update("unit_idcd"			, row.getParameter("unit_idcd"		))
					.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"		))
					.update("sale_psbl_yorn"	, row.getParameter("sale_psbl_yorn"	))
					.update("stok_sale_yorn"	, row.getParameter("stok_sale_yorn"	))
					.update("rpst_item_idcd"	, row.getParameter("rpst_item_idcd"	))
					.update("mker_name"			, row.getParameter("mker_name"))
					.update("supl_dvcd"			, row.getParameter("supl_dvcd"))
					.update("json_data"			, json)
				;
				data.param
					.update("find_name"			, row.getParameter("item_code"		)
												+ "	"
												+ row.getParameter("item_name"		)
												+ "	"
												+ row.getParameter("item_spec"		)
												+ "	"
												+ row.getParameter("cont_cstm_name"	))
				;
				data.param
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
				data.execute();
				data.clear();

				data.param
					.table("item_purc												")
					.where("where item_idcd  = :item_idcd							")

					.unique("item_idcd"			, row.fixParameter("item_idcd"	))

					.update("cstm_idcd"			, row.getParameter("base_vend_idcd"	))
					.update("ogin_bacd"			, row.getParameter("ogin_bacd"		))
					.update("minm_puch_qntt"	, row.getParameter("minm_puch_qntt"	))
					.update("puch_itvl_qntt"	, row.getParameter("puch_itvl_qntt"	))
					.update("avrg_supl_dcnt"	, row.getParameter("avrg_supl_dcnt"	))
					.update("optm_offr_volm"	, row.getParameter("optm_offr_volm"	))
					.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))
					.update("make_cmpy_name"	, row.getParameter("make_cmpy_name"	))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))

					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("item_adon												")
					.where("where item_idcd  = :item_idcd							")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))

					.update("cotn_optn_base"	, row.getParameter("cotn_optn_base"	))
					.update("cotn_optn_topp"	, row.getParameter("cotn_optn_topp"	))
					.update("colr_bacd"			, row.getParameter("colr_bacd"		))
					.update("wkfw_idcd"			, row.getParameter("wkfw_idcd2"		))
					.update("prod_type_dvcd"	, row.getParameter("prod_type_dvcd"	))
					.update("optn_dvcd"			, row.getParameter("optn_dvcd"		))
					.update("optm_prod_volm"	, row.getParameter("optm_prod_volm"	))
					.update("last_insp_yorn"	, row.getParameter("last_insp_yorn"	))
					.update("dplt_name"			, row.getParameter("dplt_name"		))
					.update("cstm_dplt_name"	, row.getParameter("cstm_dplt_name"	))
					.update("expt_boxx_sort"	, row.getParameter("expt_boxx_sort"	))
					.update("expt_boxx_wtfl"	, row.getParameter("expt_boxx_wtfl"	))
					.update("dplt_sort"			, row.getParameter("dplt_sort"		))
					.update("dplt_wtfl"			, row.getParameter("dplt_wtfl"		))
					.update("dplt_bulk"			, row.getParameter("dplt_bulk"		))
					.update("cstm_pper_boxx"	, row.getParameter("cstm_pper_boxx"	))
					.update("cstm_dplt"			, row.getParameter("cstm_dplt"		))
					.update("midl_boxx"			, row.getParameter("midl_boxx"		))
					.update("larg_boxx"			, row.getParameter("larg_boxx"		))
					.update("tray"				, row.getParameter("tray"			))
					.update("ejac_item_idcd"	, row.getParameter("ejac_item_idcd"	))
					.update("mold_idcd"			, row.getParameter("mold_idcd"		))
					.update("runr_wigt"			, row.getParameter("runr_wigt"		))
					.update("prod_wigt"			, row.getParameter("prod_wigt"		))
					.update("cycl_time"			, row.getParameter("cycl_time"		))
					.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"		))

					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("item_cont												")
					.where("where item_idcd  = :item_idcd							")
					.where("and   line_seqn  = :line_seqn							")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
					.unique("line_seqn"			, 1									)

					.update("cstm_idcd"			, row.getParameter("cont_cstm_idcd"	))
					.update("cont_date"			, row.getParameter("cont_date"		))
					.update("deli_dcnt"			, row.getParameter("deli_dcnt"		))
					.update("trnt_mthd_dvcd"	, row.getParameter("trnt_mthd_dvcd"	))
					.update("drtr_idcd"			, row.getParameter("cont_drtr_idcd"	))
					.update("ftmr_insp_yorn"	, row.getParameter("ftmr_insp_yorn"	))
					.update("mdmr_insp_yorn"	, row.getParameter("mdmr_insp_yorn"	))
					.update("ltmr_insp_yorn"	, row.getParameter("ltmr_insp_yorn"	))
					.update("cont_pric"			, row.getParameter("cont_pric"	))

					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("item_sale_pric											")
					.where("where item_idcd  = :item_idcd							")

					.unique("item_idcd"			, row.fixParameter("item_idcd"	))

					.update("shpm_pric_1fst"	, row.getParameter("shpm_pric_1fst"	))
					.update("shpm_pric_2snd"	, row.getParameter("shpm_pric_2snd"	))
					.update("shpm_pric_3trd"	, row.getParameter("shpm_pric_3trd"	))
					.update("shpm_pric_4frt"	, row.getParameter("shpm_pric_4frt"	))
					.update("shpm_pric_5fit"	, row.getParameter("shpm_pric_5fit"	))
					.update("cnsr_pric"			, row.getParameter("cnsr_pric"		))
					.update("puch_pric"			, row.getParameter("puch_pric"		))
					.update("remk_text"			, row.getParameter("remk_text"		))

					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("wrhs_zone													")
						.where("where wrhs_idcd  = :wrhs_idcd							")
						.where("and   zone_idcd  = :zone_idcd							")

						.unique("zone_idcd"			, row.fixParameter("zone_idcd"		))
						.unique("wrhs_idcd"			, row.fixParameter("istt_wrhs_idcd"	))

						.update("line_clos"			, 1									)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
		}
		return null ;
	}

	public SqlResultMap setSimple(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("item_mast												")
			.where("where item_idcd  = :item_idcd							")

			.unique("item_idcd"			, arg.fixParameter("item_idcd"		))
			.update("item_code"			, arg.getParameter("item_code"		))
			.update("item_name"			, arg.getParameter("item_name"		))
			.update("item_spec"			, arg.getParameter("item_spec"		))
			.update("acct_bacd"			, arg.getParameter("acct_bacd"		))
			.update("item_stnm"			, arg.getParameter("item_name"		))
			.update("vatx_dvcd"			, "1")
			.update("vatx_incl_yorn"	, "1")
			.update("optn_item_yorn"	, "0")
			.update("sets_item_yorn"	, "0")
			.update("stok_mngt_yorn"	, "1")
			.update("roll_mngt_yorn"	, "0")
			.update("lott_mngt_yorn"	, "1")
			.update("sral_mngt_yorn"	, "0")
			.update("insp_objt_yorn"	, "1")
			.update("istt_wrhs_idcd"	, "1")
			.update("ostt_wrhs_idcd"	, "1")
			.update("unit_idcd"			, "SET")
			.update("mtrl_bacd"			, "")
			.update("find_name"			, arg.getParameter("item_name"		)
										+ "	"
										+ arg.fixParameter("item_code"		))
			.insert("line_levl"			, "1")
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
		data.attach(Action.insert);
		data.execute();
		data.clear();

		data.param
			.query("call item_bolt_calc (			")
			.query("   :item_idcd		"  , arg.getParameter("item_idcd"	))
			.query(" , :item_spec		"  , arg.getParameter("item_spec"	))
			.query(" , :bolt_name		"  , arg.getParameter("bolt_name"	))
			.query(" , :unit_name		"  , "set")
			.query(" , :bolt_pich		"  , arg.getParameter("bolt_pich"	))
//			.query(" , :mntn_dpth		"  , arg.getParameter("mntn_dpth"	))
//			.query(" , :mtrl_dimt		"  , arg.getParameter("mtrl_dimt"	))
			.query(" , :bolt_clss		"  , "6")
			.query(" , :runn_dvcd		"  , "real")
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setAdd(HttpRequestArgument arg) throws Exception { // TODO
		DataMessage data = arg.newStorage("POS");
		String acct_bacd = "";
		String hq = "";
		float item_tick = 0;
		float item_leng = 0;
		float item_widh = 0;

		switch(arg.getParamText("acct_bacd").length() >0 ? arg.getParamText("acct_bacd"): ""){
		case "제품"	: {acct_bacd = "3000";  break;}
		case "상품"	: {acct_bacd = "4000";  break;}
		case "자재"	: {acct_bacd = "1001";  break;}
		case "원재료"	: {acct_bacd = "1001";  break;}

		case "반제품"	: {acct_bacd = "2002";  break;}

		}
		if(arg.getParamText("hqof_idcd").length() > 0){
			hq = arg.getParamText("hqof_idcd");
		}

		item_tick = Float.parseFloat(arg.getParamText("item_tick"));
		item_leng = Float.parseFloat(arg.getParamText("item_leng"));
		item_widh = Float.parseFloat(arg.getParamText("item_widh"));

		if(!acct_bacd.equals("1001")){
			item_tick = Float.parseFloat(arg.getParamText("item_tick"));
			item_leng = Float.parseFloat(arg.getParamText("item_leng2"));
			item_widh = Float.parseFloat(arg.getParamText("item_widh2"));
		}

		data.param
			.table("item_mast												")
			.where("where item_idcd  = :item_idcd							")

			.unique("item_idcd"			, arg.fixParameter("item_idcd"		))

			.update("item_code"			, arg.getParameter("item_code"		))
			.update("item_name"			, arg.getParameter("item_name"		))
			.update("item_leng"			, item_leng)
			.update("item_widh"			, item_widh)
			.update("item_tick"			, item_tick)
			.update("unit_idcd"			, arg.getParameter("unit_idcd"		))
			.update("item_spec"			, arg.getParameter("item_spec"		))
			.update("mtrl_bacd"			, arg.getParameter("mtrl_bacd"		))
			.update("spgr_valu"			, arg.getParameter("spgr_valu2"		))
			.update("unit_wigt"			, arg.getParameter("unit_wigt"		))
			.update("acct_bacd"			, acct_bacd)


			.update("item_stnm"			, arg.getParameter("item_name"		))
			.update("lcls_idcd"			, arg.getParameter("lcls_idcd"		))
			.update("mcls_idcd"			, arg.getParameter("mcls_idcd"		))
			.update("scls_idcd"			, arg.getParameter("scls_idcd"		))
			.update("find_name"			, arg.getParameter("item_name"		)
										+ " "+ arg.getParameter("item_code"		)
										+ " "+ arg.getParameter("item_spec")
										+ " "+ arg.getParameter("mtrl_bacd_name"))
			.insert("line_levl"			, "0")
			.insert("line_stat"			, "0")
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.insert("crte_idcd"			, arg.getParameter("crte_idcd") )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.insert);
		data.execute();
		data.clear();
		if(!arg.getParamText("mngt_sbsc_valu").equals("") && !arg.getParamText("mngt_sbsc_idcd").equals("")){
			data.param
				.table("item_sbsc												")
				.where("where item_idcd       = :item_idcd						")
				.where("and   mngt_sbsc_idcd  = :mngt_sbsc_idcd					")

				.unique("item_idcd"			, arg.fixParameter("item_idcd"		))
				.unique("mngt_sbsc_idcd"	, arg.fixParameter("mngt_sbsc_idcd"	))

				.update("mngt_sbsc_valu"	, arg.fixParameter("mngt_sbsc_valu"	))
				.update("find_name"			, arg.getParameter("item_name"		)
											+ " "
											+ arg.fixParameter("item_code"		)
											+ " "
											+ arg.fixParameter("mngt_sbsc_idcd"	)
											+ " "
											+ arg.fixParameter("mngt_sbsc_valu"	))
				.insert("line_stat"			, "0")
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.insert("crte_idcd"			, arg.getParameter("crte_idcd") )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}
		return null;
	}

	public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = (String)arg.getParameter("chk1");
		String chk2 = (String)arg.getParameter("chk2");
		byte[] returnByte =null;
		byte[] returnByte2 =null;
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos2 =  new ByteArrayOutputStream();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.

		ByteArrayInputStream thumnailInputStream = null;
		ByteArrayInputStream thumnailInputStream2 = null;
		// 이미지일 경우 섬네일 과정을 거친다.
		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
			thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}
		if(file[1].getFileItem().getName()==null||file[1].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[1].getInputStream()).size(240, 180).toOutputStream(baos2);
			thumnailInputStream2 = new ByteArrayInputStream(baos2.toByteArray());
		}
		int readCount = 0;
		int readCount2 = 0;
		try{
			if(chk1.equals("0")){
				data.param
					.query("update item_mast					")
					.query("       set item_imge = ''			")
					.query("       where item_idcd = :item_idcd", arg.getParameter("item_idcd"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk1.equals("1")){
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();

				data.param
					.table("item_mast")
					.where("where item_idcd	= :item_idcd" )

					.unique("item_idcd"				, arg.fixParameter("item_idcd"))

					.update("item_imge",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update item_mast					")
					.query("       set item_imge2 = ''			")
					.query("       where item_idcd = :item_idcd", arg.getParameter("item_idcd"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk2.equals("1")){
				byte[] buf2 = new byte[1024];
				while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
					 baos2.write(buf2,0,readCount2);
				}
				returnByte2 = baos2.toByteArray();

				data.param
					.table("item_mast")
					.where("where item_idcd	= :item_idcd" )

					.unique("item_idcd"				, arg.fixParameter("item_idcd"))

					.update("item_imge2",returnByte2)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
		} catch(Exception ex) {
			throw ex;
		} finally {
			if(baos != null) baos.close();
			if(thumnailInputStream != null) thumnailInputStream.close();
			if(thumnailInputStream2 != null) thumnailInputStream2.close();
		}

		return map;
	}

	//TODO MEMO

	public SqlResultMap setItem_Memo(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			data.param
				.table("item_memo")

				.where("where item_idcd = :item_idcd")
				.where("and   line_seqn = :line_seqn")

				.unique("item_idcd", row.fixParameter("item_idcd"))
				.unique("line_seqn", row.fixParameter("line_seqn"))

				.update("memo_dvcd", row.getParameter("memo_dvcd"))
				.update("memo_date", row.getParameter("memo_date"))
				.update("drtr_idcd", row.getParameter("drtr_idcd"))
				.update("item_memo", row.getParameter("item_memo"))
				.update("user_memo", row.getParameter("user_memo"))
				.update("sysm_memo", row.getParameter("sysm_memo"))

				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(rowaction);
		}
		data.execute();
		return null;
	}

	public SqlResultMap setItem_Mngt(HttpRequestArgument arg) throws Exception {
		int chk = 0;
		String item_idcd = "";
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			if(chk == 0){
				item_idcd = row.getParamText("item_idcd");
				chk++;
			}
			data.param
			.table("item_sbsc")

			.where("where item_idcd      = :item_idcd")
			.where("and   mngt_sbsc_idcd = :mngt_sbsc_idcd")

			.unique("item_idcd"			, item_idcd)
			.unique("mngt_sbsc_idcd"	, row.fixParameter("mngt_sbsc_idcd"))

			.update("mngt_sbsc_valu"	, row.getParameter("mngt_sbsc_valu"))
			.update("user_memo"			, row.getParameter("user_memo"))
			.update("sysm_memo"			, row.getParameter("sysm_memo"))

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
	public SqlResultMap setItem_Pkge(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("item_pkge")

				.where("where item_idcd      = :item_idcd")
				.where("and   pckg_bacd      = :pckg_bacd")

				.unique("item_idcd"			, row.fixParameter("item_idcd"))
				.unique("pckg_bacd"			, row.fixParameter("pckg_bacd"))

				.update("pckg_qntt"			, row.getParameter("pckg_qntt"))
				.update("base_yorn"			, row.getParameter("base_yorn"))
				.update("user_memo"			, row.getParameter("user_memo"))
				.update("sysm_memo"			, row.getParameter("sysm_memo"))

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
	//신규시 코드 값 가져오기 비교
	public SqlResultRow getMaxCodeInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select ifnull(lpad((max(substring(a.item_code, -4)) + 1), 4, '0'), '0001') as seqn	")
			.query("from  item_mast a							")
			.query("where a.item_code like :item_code%	" , arg.getParamText("item_code"))
		;
		return data.selectForRow();
	}


}
