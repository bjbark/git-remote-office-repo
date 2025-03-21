package com.sky.system.workshop.sale.order.ordermanage;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service("workshop.OrderManageService")
public class OrderManageService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.invc_date       , a.regi_path_dvcd  , a.mmbr_idcd				")
			.where("        , a.cstm_idcd       , a.tele_numb       , a.mail_addr       , a.corp_idcd				")
			.where("        , a.buss_numb       , a.addr_1fst       , a.addr_2snd       , a.rcvd_dvcd				")
			.where("        , a.invc_name       , a.deli_date       , a.vatx_incl_yorn  , a.dsnt_amnt				")
			.where("        , a.acpt_stat_dvcd  , a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd			")
			.where("        , a.hdco_idcd       , a.hdco_name       , a.dvex_burd_dvcd  , a.dlvy_mthd_dvcd			")
			.where("        , a.dlvy_zpcd       , a.dlvy_addr_1fst  , a.dlvy_addr_2snd  , a.dlvy_tele_numb			")
			.where("        , a.rctr_name       , a.dlvy_memo       , a.dinv_numb       , a.dlvy_stat_dvcd			")
			.where("        , a.dlvy_date       , a.dlvy_reqt_memo  , a.camt_colt_dttm  , a.camt_iamt_amnt			")
			.where("        , a.npay_baln_amnt  , a.colt_dttm       , a.colt_drtr_idcd  , a.stot_mthd_dvcd			")
			.where("        , a.colt_acct_numb  , a.colt_amnt       , a.refn_atcl_1fst  , a.refn_atcl_2snd			")
			.where("        , a.cstm_name       , a.dlvy_exps       , u.mmbr_name									")
			.where("        , concat(i.ttle,if(count(i.ttle) > 1 , concat('외 ',count(i.ttle)-1,'건'),'')) as ttle	")
			.where("        , ( a.colt_amnt - a.refn_atcl_1fst - a.dsnt_amnt ) as colt_amnt2						")


			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif       , i.item_lcls_idcd  , c.covr_spec				")
			.where("        , i.item_mcls_idcd  , i.item_scls_idcd  , i.prnt_mthd_dvcd	, i.page_qntt				")
			.where("        , i.volm_qntt       , i.bkbd_kind_idcd  , i.bkbd_dirt_dvcd	, i.bkbd_bind				")
			.where("        , i.dirt_dvcd       , i.attc_file_yorn  , i.esti_pric       , i.esti_amnt				")
			.where("        , i.prnt_colr_bacd  , i.shet_size_idcd  , i.etcc_proc_amnt  , t.shet_size_dvcd			")
			.where("        , i.sply_amnt       , i.vatx_amnt       , i.ttsm_amnt									")
			.where("        , c.covr_dsgn_dvcd  , t.shet_name       , sb.base_name									")
			.where("        , case when c3.clss_name is not null then c3.clss_desc									")
			.where("               else case when c2.clss_name is not null then c2.clss_desc						")
			.where("                         else c1.clss_name														")
			.where("                    end																			")
			.where("          end  as clss_desc 																	")

		;
		data.param
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_ordr_item  i on a.invc_numb = i.invc_numb									")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_shet       t on i.shet_size_idcd = t.shet_idcd								")
			.where("left outer join base_mast      sb on i.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join prnt_ordr_covr  c on a.invc_numb = c.invc_numb									")
			.where("left outer join item_clss      c1 on i.item_lcls_idcd = c1.clss_idcd							")
			.where("left outer join item_clss      c2 on i.item_mcls_idcd = c2.clss_idcd							")
			.where("left outer join item_clss      c3 on i.item_scls_idcd = c3.clss_idcd							")

			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%							" , arg.getParamText("find_name"))
			.where("and    a.invc_date >= :invc_date1								" , arg.getParameter("invc_date1"))
			.where("and    a.invc_date <= :invc_date2								" , arg.getParameter("invc_date2"))
			.where("and    a.deli_date >= :deli_date1								" , arg.getParameter("deli_date1"))
			.where("and    a.deli_date <= :deli_date2								" , arg.getParameter("deli_date2"))
			.where("and    a.mmbr_idcd = :mmbr_idcd									" , arg.getParameter("mmbr_idcd"))
			.where("and    i.item_lcls_idcd = :lcls_idcd							" , arg.getParameter("lcls_idcd"))
			.where("and    i.item_mcls_idcd = :mcls_idcd							" , arg.getParameter("mcls_idcd"))
			.where("and    i.item_scls_idcd = :scls_idcd							" , arg.getParameter("scls_idcd"))
			.where("and    a.invc_numb = :invc_numb									" , arg.getParameter("invc_numb"))
			.where("and    a.cofm_yorn = '1'																		")
			.where("group by a.invc_numb																			")
			.where("order by a.invc_date desc ,a.deli_date																")
			.where(") a																								")
			;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getCnsl(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.invc_date       , a.regi_path_dvcd  , a.mmbr_idcd				")
			.where("        , a.cstm_idcd       , a.tele_numb       , a.mail_addr       , a.corp_idcd				")
			.where("        , a.buss_numb       , a.addr_1fst       , a.addr_2snd       , a.rcvd_dvcd				")
			.where("        , a.invc_name       , a.deli_date       , a.vatx_incl_yorn  , a.dsnt_amnt				")
			.where("        , a.acpt_stat_dvcd  , a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd			")
			.where("        , a.hdco_idcd       , a.hdco_name       , a.dvex_burd_dvcd  , a.dlvy_mthd_dvcd			")
			.where("        , a.dlvy_zpcd       , a.dlvy_addr_1fst  , a.dlvy_addr_2snd  , a.dlvy_tele_numb			")
			.where("        , a.rctr_name       , a.dlvy_memo       , a.dinv_numb       , a.dlvy_stat_dvcd			")
			.where("        , a.dlvy_date       , a.dlvy_reqt_memo  , a.camt_colt_dttm  , a.camt_iamt_amnt			")
			.where("        , a.npay_baln_amnt  , a.colt_dttm       , a.colt_drtr_idcd  , a.stot_mthd_dvcd			")
			.where("        , a.colt_acct_numb  , a.colt_amnt       , a.refn_atcl_1fst  , a.refn_atcl_2snd			")
			.where("        , a.cstm_name       , a.dlvy_exps       , u.mmbr_name									")
			//item
			.where("        , b.line_seqn       , b.item_lcls_idcd  , b.item_mcls_idcd  , b.item_scls_idcd			")
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_idcd				")
			.where("        , b.shet_size_dvcd  , b.horz_leng       , b.vrtl_leng       , b.page_qntt				")
			.where("        , b.colr_page_qntt  , b.volm_qntt       , b.bkbd_kind_dvcd  , b.bkbd_dirt_dvcd			")
			.where("        , b.bkbd_bind       , b.dirt_dvcd       , b.esti_pric									")
			.where("        , b.cvst_bacd       , b.covr_amnt       , b.indx_amnt									")
			.where("        , b.cofm_pric       , b.sply_amnt       , b.vatx_amnt       , b.ttsm_amnt				")
			.where("        , b.esti_amnt       , b.prod_cmpl_dttm  , b.prod_qntt       , b.colr_page_numb			")
			.where("        , b.cvst_qntt       , sb.base_name as prnt_colr_name									")
			.where("        , b.work_memo as work_memo_item         , sb2.base_name as cvst_bacd_name				")
			.where("        , case when c3.clss_name is not null then c3.clss_desc									")
			.where("               else case when c2.clss_name is not null then c2.clss_desc						")
			.where("                         else c1.clss_name														")
			.where("                    end																			")
			.where("          end  as clss_desc , t.shet_name														")
			// covr
			.where("        , c.covr_dsgn_dvcd  , c.covr_spec       , c.prnt_colr_bacd as prnt_colr_bacd_covr		")
			.where("        , sc.base_name as covr_colr_name        , c.shet_idcd as shet_idcd_corv  				")
			.where("        , t2.shet_name as shet_corv_name        , c.dsgn_yorn       , c.dsgn_code 				")
			.where("        , c.covr_wing_dvcd  , c.esti_pric as esti_pric_covr  									")
			.where("        , c.esti_amnt as esti_amnt_covr         , c.cofm_pric as cofm_pric_covr					")
			.where("        , c.sply_amnt as sply_amnt_covr         , c.vatx_amnt as vatx_amnt_covr					")
			.where("        , c.ttsm_amnt as ttsm_amnt_covr         , c.work_memo as work_memo_covr					")
			.where("        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg									")
			//indx
			.where("        , d.indx_used_yorn  , d.shet_idcd as shet_idcd_indx         , d.volm_indx_qntt			")
			.where("        , t3.shet_name as shet_indx_name        , d.prnt_colr_bacd as prnt_colr_bacd_indx		")
			.where("        , sd.base_name as indx_colr_name        , d.prnt_yorn       , d.indx_yorn				")
			.where("        , d.esti_pric as esti_pric_indx         , d.esti_amnt as esti_amnt_indx					")
			.where("        , d.cofm_pric as cofm_pric_indx         , d.sply_amnt as sply_amnt_indx					")
			.where("        , d.vatx_amnt as vatx_amnt_indx         , d.ttsm_amnt as ttsm_amnt_indx					")
			.where("        , d.work_memo as work_memo_indx         , d.page_prnt_side  							")
			//proc
			.where("        , e.nocl_cotn_yorn  , e.vosh_cotn_yorn  , e.embo_yorn       , e.ngls_yorn				")
			.where("        , e.ygls_yorn       , e.bkst_yorn       , e.hole_qntt       , e.rdio_bkbd_yorn			")
			.where("        , e.mtrl_wire_yorn  , e.limp_wire_yorn  , e.bind_yorn       , e.scvr_rdio_yorn			")
			.where("        , e.scvr_open_yorn  , e.dduk_yorn       , e.flat_yorn       , e.hfbk_yorn				")
			.where("        , e.etcc_proc_amnt  , e.pric_idcd       , e.work_memo as work_memo_proc 														")


			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif														")

		;
		data.param
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
			.where("left outer join prnt_shet       t on b.shet_idcd = t.shet_idcd									")
			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
			.where("left outer join item_clss      c1 on b.item_lcls_idcd = c1.clss_idcd							")
			.where("left outer join item_clss      c2 on b.item_mcls_idcd = c2.clss_idcd							")
			.where("left outer join item_clss      c3 on b.item_scls_idcd = c3.clss_idcd							")
			.where("left outer join prnt_ordr_covr  c on a.invc_numb = c.invc_numb									")
			.where("left outer join base_mast      sc on c.prnt_colr_bacd = sc.base_idcd and sc.prnt_idcd = '3104'	")
			.where("left outer join prnt_shet      t2 on c.shet_idcd = t2.shet_idcd									")
			.where("left outer join prnt_ordr_indx  d on a.invc_numb = d.invc_numb									")
			.where("left outer join prnt_shet      t3 on d.shet_idcd = t3.shet_idcd									")
			.where("left outer join base_mast      sd on d.prnt_colr_bacd = sd.base_idcd and sd.prnt_idcd = '3104'	")
			.where("left outer join prnt_ordr_proc  e on a.invc_numb = e.invc_numb									")

			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%							" , arg.getParamText("find_name"))
			.where("and    a.cofm_yorn <> '1'																		")
			.where("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.invc_date       , a.regi_path_dvcd  , a.mmbr_idcd				")
			.where("        , a.cstm_idcd       , a.tele_numb       , a.mail_addr       , a.corp_idcd				")
			.where("        , a.buss_numb       , a.addr_1fst       , a.addr_2snd       , a.rcvd_dvcd				")
			.where("        , a.invc_name       , a.deli_date       , a.vatx_incl_yorn  , a.dsnt_amnt				")
			.where("        , a.acpt_stat_dvcd  , a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd			")
			.where("        , a.hdco_idcd       , a.hdco_name       , a.dvex_burd_dvcd  , a.dlvy_mthd_dvcd			")
			.where("        , a.dlvy_zpcd       , a.dlvy_addr_1fst  , a.dlvy_addr_2snd  , a.dlvy_tele_numb			")
			.where("        , a.rctr_name       , a.dlvy_memo       , a.dinv_numb       , a.dlvy_stat_dvcd			")
			.where("        , a.dlvy_date       , a.dlvy_reqt_memo  , a.camt_colt_dttm  , a.camt_iamt_amnt			")
			.where("        , a.npay_baln_amnt  , a.colt_dttm       , a.colt_drtr_idcd  , a.stot_mthd_dvcd			")
			.where("        , a.colt_acct_numb  , a.colt_amnt       , a.refn_atcl_1fst  , a.refn_atcl_2snd			")
			.where("        , a.cstm_name       , a.dlvy_exps       , u.mmbr_name									")
			//item
			.where("        , b.line_seqn       , b.item_lcls_idcd  , b.item_mcls_idcd  , b.item_scls_idcd			")
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_idcd				")
			.where("        , b.shet_size_dvcd  , b.horz_leng       , b.vrtl_leng       , b.page_qntt				")
			.where("        , b.colr_page_qntt  , b.volm_qntt       , b.bkbd_kind_idcd  , b.bkbd_dirt_dvcd			")
			.where("        , b.bkbd_bind       , b.dirt_dvcd       , b.esti_pric									")
			.where("        , b.cvst_bacd       , b.covr_amnt       , b.indx_amnt									")
			.where("        , b.cofm_pric       , b.sply_amnt       , b.vatx_amnt       , b.ttsm_amnt				")
			.where("        , b.esti_amnt       , b.prod_cmpl_dttm  , b.prod_qntt       , b.colr_page_numb			")
			.where("        , b.cvst_qntt       , sb.base_name as prnt_colr_name									")
			.where("        , b.work_memo as work_memo_item         , sb2.base_name as cvst_bacd_name				")
			.where("        , case when c3.clss_name is not null then c3.clss_desc									")
			.where("               else case when c2.clss_name is not null then c2.clss_desc						")
			.where("                         else c1.clss_name														")
			.where("                    end																			")
			.where("          end  as clss_desc , t.shet_name														")
			// covr
			.where("        , c.covr_dsgn_dvcd  , c.covr_spec       , c.prnt_colr_bacd as prnt_colr_bacd_covr		")
			.where("        , sc.base_name as covr_colr_name        , c.shet_idcd as shet_idcd_corv  				")
			.where("        , t2.shet_name as shet_corv_name        , c.dsgn_yorn       , c.dsgn_code 				")
			.where("        , c.covr_wing_dvcd  , c.esti_pric as esti_pric_covr  									")
			.where("        , c.esti_amnt as esti_amnt_covr         , c.cofm_pric as cofm_pric_covr					")
			.where("        , c.sply_amnt as sply_amnt_covr         , c.vatx_amnt as vatx_amnt_covr					")
			.where("        , c.ttsm_amnt as ttsm_amnt_covr         , c.work_memo as work_memo_covr					")
			.where("        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg									")
			//indx
			.where("        , d.indx_used_yorn  , d.shet_idcd as shet_idcd_indx         , d.volm_indx_qntt			")
			.where("        , t3.shet_name as shet_indx_name        , d.prnt_colr_bacd as prnt_colr_bacd_indx		")
			.where("        , sd.base_name as prnt_colr_name_indx   , d.prnt_yorn       , d.indx_yorn				")
			.where("        , d.esti_pric as esti_pric_indx         , d.esti_amnt as esti_amnt_indx					")
			.where("        , d.cofm_pric as cofm_pric_indx         , d.sply_amnt as sply_amnt_indx					")
			.where("        , d.vatx_amnt as vatx_amnt_indx         , d.ttsm_amnt as ttsm_amnt_indx					")
			.where("        , d.work_memo as work_memo_indx         , d.page_prnt_side  							")
			//proc
			.where("        , e.etcc_proc_amnt                      , e.work_memo									")
			.where("        , (  ifnull(b.esti_amnt,0)																")
			.where("           + ifnull(c.esti_amnt,0)																")
			.where("           + ifnull(d.esti_amnt,0)																")
			.where("           + ifnull(e.etcc_proc_amnt,0)															")
			.where("        ) as total																				")


			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif														")

		;
		data.param
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
			.where("left outer join prnt_shet       t on b.shet_idcd = t.shet_idcd									")
			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
			.where("left outer join item_clss      c1 on b.item_lcls_idcd = c1.clss_idcd							")
			.where("left outer join item_clss      c2 on b.item_mcls_idcd = c2.clss_idcd							")
			.where("left outer join item_clss      c3 on b.item_scls_idcd = c3.clss_idcd							")
			.where("left outer join prnt_ordr_covr  c on a.invc_numb = c.invc_numb and b.line_seqn = c.line_seqn	")
			.where("left outer join base_mast      sc on c.prnt_colr_bacd = sc.base_idcd and sc.prnt_idcd = '3104'	")
			.where("left outer join prnt_shet      t2 on c.shet_idcd = t2.shet_idcd									")
			.where("left outer join prnt_ordr_indx  d on a.invc_numb = d.invc_numb and b.line_seqn = d.line_seqn	")
			.where("left outer join prnt_shet      t3 on d.shet_idcd = t3.shet_idcd									")
			.where("left outer join base_mast      sd on d.prnt_colr_bacd = sd.base_idcd and sd.prnt_idcd = '3104'	")
			.where("left outer join prnt_ordr_proc  e on a.invc_numb = e.invc_numb and b.line_seqn = e.line_seqn	")

			.where("where  1=1																						")
			.where("and    a.invc_numb = :invc_numb									" , arg.getParameter("invc_numb"))
			.where("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.invc_date       , a.regi_path_dvcd  , a.mmbr_idcd				")
			.where("        , a.cstm_idcd       , a.tele_numb       , a.mail_addr       , a.corp_idcd				")
			.where("        , a.buss_numb       , a.addr_1fst       , a.addr_2snd       , a.rcvd_dvcd				")
			.where("        , a.invc_name       , a.deli_date       , a.vatx_incl_yorn  , a.dsnt_amnt				")
			.where("        , a.acpt_stat_dvcd  , a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd			")
			.where("        , a.hdco_idcd       , a.hdco_name       , a.dvex_burd_dvcd  , a.dlvy_mthd_dvcd			")
			.where("        , a.dlvy_zpcd       , a.dlvy_addr_1fst  , a.dlvy_addr_2snd  , a.dlvy_tele_numb			")
			.where("        , a.rctr_name       , a.dlvy_memo       , a.dinv_numb       , a.dlvy_stat_dvcd			")
			.where("        , a.dlvy_date       , a.dlvy_reqt_memo  , a.camt_colt_dttm  , a.camt_iamt_amnt			")
			.where("        , a.npay_baln_amnt  , a.colt_dttm       , a.colt_drtr_idcd  , a.stot_mthd_dvcd			")
			.where("        , a.colt_acct_numb  , a.colt_amnt       , a.refn_atcl_1fst  , a.refn_atcl_2snd			")
			.where("        , a.cstm_name       , a.dlvy_exps       , u.mmbr_name									")
			//item
			.where("        , b.line_seqn       , b.item_lcls_idcd  , b.item_mcls_idcd  , b.item_scls_idcd			")
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_idcd				")
			.where("        , b.shet_size_dvcd  , b.horz_leng       , b.vrtl_leng       , b.page_qntt				")
			.where("        , b.colr_page_qntt  , b.volm_qntt       , b.bkbd_kind_idcd  , b.bkbd_dirt_dvcd			")
			.where("        , b.bkbd_bind       , b.dirt_dvcd       , b.esti_pric									")
			.where("        , b.cvst_bacd       , b.covr_amnt       , b.indx_amnt									")
			.where("        , b.cofm_pric       , b.sply_amnt       , b.vatx_amnt       , b.ttsm_amnt				")
			.where("        , b.esti_amnt       , b.prod_cmpl_dttm  , b.prod_qntt       , b.colr_page_numb			")
			.where("        , b.cvst_qntt       , sb.base_name as prnt_colr_name									")
			.where("        , b.work_memo as work_memo_item         , sb2.base_name as cvst_bacd_name				")
			.where("        , case when c3.clss_name is not null then c3.clss_desc									")
			.where("               else case when c2.clss_name is not null then c2.clss_desc						")
			.where("                         else c1.clss_name														")
			.where("                    end																			")
			.where("          end  as clss_desc , t.shet_name														")
			// covr
			.where("        , c.covr_dsgn_dvcd  , c.covr_spec       , c.prnt_colr_bacd as prnt_colr_bacd_covr		")
			.where("        , sc.base_name as covr_colr_name        , c.shet_idcd as shet_idcd_corv  				")
			.where("        , t2.shet_name as shet_corv_name        , c.dsgn_yorn       , c.dsgn_code 				")
			.where("        , c.covr_wing_dvcd  , c.esti_pric as esti_pric_covr  									")
			.where("        , c.esti_amnt as esti_amnt_covr         , c.cofm_pric as cofm_pric_covr					")
			.where("        , c.sply_amnt as sply_amnt_covr         , c.vatx_amnt as vatx_amnt_covr					")
			.where("        , c.ttsm_amnt as ttsm_amnt_covr         , c.work_memo as work_memo_covr					")
			.where("        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg									")
			//indx
			.where("        , d.indx_used_yorn  , d.shet_idcd as shet_idcd_indx         , d.volm_indx_qntt			")
			.where("        , t3.shet_name as shet_indx_name        , d.prnt_colr_bacd as prnt_colr_bacd_indx		")
			.where("        , sd.base_name as indx_colr_name        , d.prnt_yorn       , d.indx_yorn				")
			.where("        , d.esti_pric as esti_pric_indx         , d.esti_amnt as esti_amnt_indx					")
			.where("        , d.cofm_pric as cofm_pric_indx         , d.sply_amnt as sply_amnt_indx					")
			.where("        , d.vatx_amnt as vatx_amnt_indx         , d.ttsm_amnt as ttsm_amnt_indx					")
			.where("        , d.work_memo as work_memo_indx         , d.page_prnt_side  							")
			//proc
			.where("        , e.nocl_cotn_yorn  , e.vosh_cotn_yorn  , e.embo_yorn       , e.ngls_yorn				")
			.where("        , e.ygls_yorn       , e.bkst_yorn       , e.hole_qntt       , e.rdio_bkbd_yorn			")
			.where("        , e.mtrl_wire_yorn  , e.limp_wire_yorn  , e.bind_yorn       , e.scvr_rdio_yorn			")
			.where("        , e.scvr_open_yorn  , e.dduk_yorn       , e.flat_yorn       , e.hfbk_yorn				")
			.where("        , e.etcc_proc_amnt  , e.pric_idcd       , e.work_memo as work_memo_proc 														")


			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif														")

		;
		data.param
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
			.where("left outer join prnt_shet       t on b.shet_idcd = t.shet_idcd									")
			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
			.where("left outer join item_clss      c1 on b.item_lcls_idcd = c1.clss_idcd							")
			.where("left outer join item_clss      c2 on b.item_mcls_idcd = c2.clss_idcd							")
			.where("left outer join item_clss      c3 on b.item_scls_idcd = c3.clss_idcd							")
			.where("left outer join prnt_ordr_covr  c on a.invc_numb = c.invc_numb									")
			.where("left outer join base_mast      sc on c.prnt_colr_bacd = sc.base_idcd and sc.prnt_idcd = '3104'	")
			.where("left outer join prnt_shet      t2 on c.shet_idcd = t2.shet_idcd									")
			.where("left outer join prnt_ordr_indx  d on a.invc_numb = d.invc_numb									")
			.where("left outer join prnt_shet      t3 on d.shet_idcd = t3.shet_idcd									")
			.where("left outer join base_mast      sd on d.prnt_colr_bacd = sd.base_idcd and sd.prnt_idcd = '3104'	")
			.where("left outer join prnt_ordr_proc  e on a.invc_numb = e.invc_numb									")

			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%							" , arg.getParamText("find_name"))
			.where("and    a.cofm_yorn <> '1'																		")
			.where("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("esti_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setAcpt(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		String deli_date	= arg.getParamText("deli_date").replace("-", "") ;
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_insert (			")
			.query("   :STOR "       , stor			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setPlan(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		int i = 0;
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if(i==0){
				data.param
					.table("prnt_ordr_mast"													)
					.where("where invc_numb		= :invc_numb							")	/*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					//
					.update("acpt_stat_dvcd"	, "0020")
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
			//item
			data.param
				.table("prnt_ordr_item")
				.where("where   invc_numb  = :invc_numb  " )
				.where("and     line_seqn  = :line_seqn  " )
				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("item_lcls_idcd"	, row.getParameter("item_lcls_idcd"))
				.update("item_mcls_idcd"	, row.getParameter("item_mcls_idcd"))
				.update("item_scls_idcd"	, row.getParameter("item_scls_idcd"))
				.update("ttle"				, row.getParameter("ttle"))
				.update("prnt_colr_bacd"	, row.getParameter("prnt_colr_bacd"))
				.update("prnt_mthd_dvcd"	, row.getParameter("prnt_mthd_dvcd"))
				.update("shet_idcd"			, row.getParameter("shet_idcd"))
				.update("shet_size_dvcd"	, row.getParameter("shet_size_dvcd"))
				.update("horz_leng"			, row.getParameter("horz_leng"))
				.update("vrtl_leng"			, row.getParameter("vrtl_leng"))
				.update("page_qntt"			, row.getParameter("page_qntt"))
				.update("colr_page_qntt"	, row.getParameter("colr_page_qntt"))
				.update("volm_qntt"			, row.getParameter("volm_qntt"))
				.update("bkbd_kind_dvcd"	, row.getParameter("bkbd_kind_dvcd"))
				.update("bkbd_dirt_dvcd"	, row.getParameter("bkbd_dirt_dvcd"))
				.update("bkbd_bind"			, row.getParameter("bkbd_bind"))
				.update("dirt_dvcd"			, row.getParameter("dirt_dvcd"))
				.update("attc_file_yorn"	, row.getParameter("attc_file_yorn"))
				.update("esti_pric"			, row.getParameter("esti_pric"))
				.update("esti_amnt"			, row.getParameter("esti_amnt"))
				.update("covr_amnt"			, row.getParameter("covr_amnt"))
				.update("indx_amnt"			, row.getParameter("indx_amnt"))
				.update("etcc_proc_amnt"	, row.getParameter("etcc_proc_amnt"))
				.update("cofm_pric"			, row.getParameter("cofm_pric"))
				.update("sply_amnt"			, row.getParameter("sply_amnt"))
				.update("vatx_amnt"			, row.getParameter("vatx_amnt"))
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))
				.update("work_memo"			, row.getParameter("work_memo"))
				.update("prod_cmpl_dttm"	, row.getParameter("prod_cmpl_dttm"))
				.update("prod_qntt"			, row.getParameter("prod_qntt"))
				.update("colr_page_numb"	, row.getParameter("colr_page_numb"))
				.update("cvst_bacd"			, row.getParameter("cvst_bacd"))
				.update("cvst_qntt"			, row.getParameter("cvst_qntt"))


				.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("line_stat"			, row.getParameter("line_stat"))
				.update("user_memo"			, row.getParameter("user_memo"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(rowaction);

			data.param
				.table("prnt_prod_plan"													)
				.where("where invc_numb		= :invc_numb							")	/*  INVOICE번호  */
				.where("and   line_seqn		= :line_seqn							")	/*  순번  */
				.where("and   assi_seqn		= :assi_seqn							")
				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				.unique("assi_seqn"			, row.fixParameter("assi_seqn"			))
				//
				.update("otod_yorn"			, row.getParameter("otod_yorn"			))
				.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))
				.update("stwk_schd_date"	, row.getParameter("stwk_schd_date"		))
				.update("endd_schd_date"	, row.getParameter("endd_schd_date"		))
				.update("need_time"			, row.getParameter("need_time"			))
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))
				.update("cvic_idcd"			, row.getParameter("cvic_idcd"			))
				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"		))
				.update("pdod_date"			, row.getParameter("pdod_date"			))
				.update("strt_dttm"			, row.getParameter("strt_dttm"			))
				.update("endd_dttm"			, row.getParameter("endd_dttm"			))
				.update("prod_qntt"			, row.getParameter("prod_qntt"			))
				.update("poor_qntt"			, row.getParameter("poor_qntt"			))
				.update("good_qntt"			, row.getParameter("good_qntt"			))
				.update("poor_type_bacd"	, row.getParameter("poor_type_bacd"		))
				.update("poor_caus_bacd"	, row.getParameter("poor_caus_bacd"		))

				.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("line_stat"			, row.getParameter("line_stat"))
				.update("user_memo"			, row.getParameter("user_memo"))
				.update("find_name"			, row.getParamText("invc_numb"         ).trim())
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

			;
			data.attach(Action.modify);
		}
		data.execute();
		data.clear();

		return null;
	}
	public SqlResultMap setOstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

			data.param
			.query("call auto_manage_ostt(")
			.query("   :invc_numb", arg.fixParameter("invc_numb"))
			.query(" , :ostt_date", arg.fixParameter("ostt_date"))
			.query(" , :user_idcd", arg.fixParameter("user_idcd"))
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		data.param
			.table("prnt_ordr_mast"													)
			.where("where invc_numb		= :invc_numb							")	/*  INVOICE번호  */
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			//
			.update("dinv_numb"			, arg.getParameter("dinv_numb"))
			.update("dlvy_stat_dvcd"	, arg.getParameter("dlvy_stat_dvcd"))
			.update("colt_dttm"			, arg.getParameter("colt_dttm"))
			.update("stot_mthd_dvcd"	, arg.getParameter("stot_mthd_dvcd"))
			.update("colt_acct_numb"	, arg.getParameter("colt_acct_numb"))
			.update("colt_amnt"			, arg.getParameter("colt_amnt"))
			.update("camt_iamt_amnt"	, arg.getParameter("camt_iamt_amnt"))
			.update("npay_baln_amnt"	, arg.getParameter("npay_baln_amnt"))
			.update("hdco_idcd"			, arg.getParameter("hdco_idcd"))
			.update("hdco_name"			, arg.getParameter("hdco_name"))
			.update("dvex_burd_dvcd"	, arg.getParameter("dvex_burd_dvcd"))
			.update("dlvy_mthd_dvcd"	, arg.getParameter("dlvy_mthd_dvcd"))
			.update("dlvy_zpcd"			, arg.getParameter("dlvy_zpcd"))
			.update("dlvy_addr_1fst"	, arg.getParameter("dlvy_addr_1fst"))
			.update("dlvy_addr_2snd"	, arg.getParameter("dlvy_addr_2snd"))
			.update("refn_atcl_1fst"	, arg.getParameter("refn_atcl_1fst"))
			.update("dlvy_tele_numb"	, arg.getParameter("dlvy_tele_numb"))
			.update("rctr_name"			, arg.getParameter("rctr_name"))
			.update("acpt_stat_dvcd"	, "0600")
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setRelease(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String hdco_idcd	= arg.getParamText("hdco_idcd");
		String dinv_numb	= arg.getParamText("dinv_numb");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call workshop_release (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :hdco_idcd "  , hdco_idcd	)  // 택배사번호
			.query(" , :dinv_numb "  , dinv_numb	)  // 송장번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	public SqlResultMap setCofm(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("prnt_ordr_mast")

				.where("where invc_numb = :invc_numb")

				.unique("invc_numb", row.fixParameter("invc_numb"))

				.update("cofm_yorn", "1")
				.update("cofm_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

			;
			data.attach(Action.update)
			;
			data.execute();
			data.clear();
		}

		return null;
	}
}
