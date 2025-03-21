package com.sky.system.workshop.sale.order.ordermast;

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
import com.sky.listener.ParamToJson;


@Service("workshop.OrderMastService")
public class OrderMastService  extends DefaultServiceHandler {

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
			//item
			.where("        , b.line_seqn       , b.item_lcls_idcd  , b.item_mcls_idcd  , b.item_scls_idcd			")
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_size_idcd			")
			.where("        , b.horz_leng       , b.vrtl_leng       , b.page_qntt									")
			.where("        , b.colr_page_qntt  , b.volm_qntt       , b.bkbd_kind_idcd  , b.bkbd_dirt_dvcd			")
			.where("        , b.bkbd_bind       , b.dirt_dvcd       , b.esti_pric									")
			.where("        , b.cvst_bacd       , b.covr_amnt       , b.indx_amnt									")
			.where("        , b.cofm_pric       , b.sply_amnt       , b.vatx_amnt       , b.ttsm_amnt				")
			.where("        , b.esti_amnt       , b.prod_cmpl_dttm  , b.prod_qntt       , b.colr_page_numb			")
			.where("        , b.cvst_qntt       , sb.base_name as prnt_colr_name									")
			.where("        , b.work_memo 	    , sb2.base_name as cvst_bacd_name									")
			.where("        , t.shet_name       , t.shet_name as shet_name2	            , cl.clss_name				")
			.where("        , bk.clss_name as bkbd_kind_name        , co.shet_name as shet_name_covr				")
			.where("        , co.shet_idcd as shet_idcd_covr		, c.proc_shet_idcd  , c.assi_seqn				")
			.where("        , fd.shet_name as fdat_size_name        , wo.shet_name as work_size_name				")
			.where("        , p.shet_wght as covr_shet_wght         , pr.shet_name as shet_name_coti				")
			.where("        , c.dsgn_code       , c.esti_amnt as esti_amnt_covr         , c.fcvr_strg				")
			.where("        , c.scvr_strg       , c.bcvr_strg       , c.covr_wing_dvcd  , c.covr_dsgn_dvcd			")
			.where("        , t.lcls_idcd       , t.mcls_idcd       , sh.clss_idcd as scls_idcd						")
			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif														")
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
			.where("left outer join prnt_ordr_covr  c on a.invc_numb = c.invc_numb									")
			.where("left outer join prnt_shet_pric  p on p.shet_idcd = c.shet_idcd	and p.line_seqn = c.assi_seqn	")
			.where("left outer join prnt_shet       t on b.shet_size_idcd = t.shet_idcd								")
			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
			.where("left outer join item_clss      cl on b.item_lcls_idcd = cl.clss_idcd							")
			.where("left outer join item_clss      bk on b.bkbd_kind_idcd = bk.clss_idcd							")
			.where("left outer join item_clss      sh on t.shet_name = sh.clss_name and	sh.prnt_idcd  = '000054' 	")
			.where("left outer join prnt_shet      fd on b.fdat_size_idcd = fd.shet_idcd							")
			.where("left outer join prnt_shet      wo on b.work_size_idcd = wo.shet_idcd							")
			.where("left outer join prnt_shet      co on c.shet_idcd = co.shet_idcd									")
			.where("left outer join prnt_shet      pr on c.proc_shet_idcd = pr.shet_idcd							")
			.where("where  1=1																						")
			.where("and    a.cofm_yorn = '1'																		")
			.where("and    a.find_name	like %:find_name%" , arg.getParameter("find_name"))
			.where("and    a.invc_date >= :invc_date1" , arg.getParameter("invc_date1"))
			.where("and    a.invc_date <= :invc_date2" , arg.getParameter("invc_date2"))
			.where("and    b.item_lcls_idcd = :lcls_idcd" , arg.getParameter("lcls_idcd"))
			.where("and    b.item_mcls_idcd = :mcls_idcd" , arg.getParameter("mcls_idcd"))
			.where("and    b.item_scls_idcd = :scls_idcd" , arg.getParameter("scls_idcd"))
			.where("and    a.mmbr_idcd = :mmbr_idcd" , arg.getParameter("mmbr_idcd"))
			.where("and    a.cstm_idcd = :cstm_idcd" , arg.getParameter("cstm_idcd"))
			.where("and    a.cofm_yorn = :cofm_yorn" , arg.getParameter("cofm_yorn"))
			.where("and    a.line_stat = :line_stat" , arg.getParameter("line_stat"))
			.where("and    a.regi_path_dvcd = :regi_path_dvcd" , arg.getParameter("regi_path_dvcd"))
			.where("group by a.invc_numb																			")
			.where("order by a.invc_numb desc) a																								")
//			.where("order by a.invc_numb desc																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getTree(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
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
			//item
			.where("        , b.line_seqn       , b.item_lcls_idcd  , b.item_mcls_idcd  , b.item_scls_idcd			")
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_size_idcd			")
			.where("        , b.horz_leng       , b.vrtl_leng       , b.page_qntt									")
			.where("        , b.colr_page_qntt  , b.volm_qntt       , b.bkbd_kind_idcd  , b.bkbd_dirt_dvcd			")
			.where("        , b.bkbd_bind       , b.dirt_dvcd       , b.esti_pric									")
			.where("        , b.cvst_bacd       , b.covr_amnt       , b.indx_amnt									")
			.where("        , b.cofm_pric       , b.sply_amnt       , b.vatx_amnt       , b.ttsm_amnt				")
			.where("        , b.esti_amnt       , b.prod_cmpl_dttm  , b.prod_qntt       , b.colr_page_numb			")
			.where("        , b.cvst_qntt       , sb.base_name as prnt_colr_name									")
			.where("        , b.work_memo 	    , sb2.base_name as cvst_bacd_name       , cl.clss_name				")
			.where("        , c.covr_dsgn_dvcd  , c.covr_spec       , c.prnt_colr_bacd_covr							")
			.where("        , c.shet_idcd as shet_idcd_corv         , c.dsgn_yorn       , c.dsgn_code				")
			.where("        , c.covr_wing_dvcd  , c.esti_pric_covr  , c.sply_amnt_covr  , c.vatx_amnt_covr			")
			.where("        , c.esti_amnt_covr  , c.cofm_pric_covr  , c.ttsm_amnt_covr  , c.work_memo_covr			")
			.where("        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg									")
			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif														")
			.where("        , t.shet_name       , t.shet_name as shet_name2											")
			.where("        , bk.clss_name as bkbd_kind_name	    , co.shet_name as shet_name_covr				")
			.where("        , (select count(*) from prnt_ordr_covr where invc_numb = a.invc_numb and line_seqn = b.line_seqn) as cover_count	")
			.where("        , (select count(*) from prnt_ordr_shet where invc_numb = a.invc_numb and line_seqn = b.line_seqn) as shet_count		")
			.where("        , (select count(*) from prnt_ordr_indx where invc_numb = a.invc_numb and line_seqn = b.line_seqn) as indx_count		")
			.where("        , (select count(*) from prnt_ordr_proc where invc_numb = a.invc_numb and line_seqn = b.line_seqn) as proc_count		")
		;
		data.param
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
			.where("left outer join (select   c.covr_dsgn_dvcd   , c.covr_spec  , c.prnt_colr_bacd as prnt_colr_bacd_covr	")
			.where("                        , c.shet_idcd        , c.dsgn_yorn  , c.dsgn_code 						")
			.where("                       	, c.covr_wing_dvcd  , c.esti_pric as esti_pric_covr						")
			.where("                        , c.esti_amnt as esti_amnt_covr         , c.cofm_pric as cofm_pric_covr	")
			.where("                        , c.sply_amnt as sply_amnt_covr         , c.vatx_amnt as vatx_amnt_covr	")
			.where("                        , c.ttsm_amnt as ttsm_amnt_covr         , c.work_memo as work_memo_covr	")
			.where("                        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg					")
			.where("                        , c.invc_numb       , c.line_seqn       , c.assi_seqn , c.proc_shet_idcd")
			.where("                 from prnt_ordr_covr c															")
			.where("                 group by c.invc_numb															")
			.where("                ) c on  c.invc_numb = a.invc_numb and b.line_seqn = c.line_seqn					")
			.where("left outer join prnt_shet       t on b.shet_size_idcd = t.shet_idcd								")
			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
			.where("left outer join item_clss      cl on b.item_lcls_idcd = cl.clss_idcd							")
			.where("left outer join item_clss      bk on b.bkbd_kind_idcd = bk.clss_idcd							")
			.where("left outer join item_clss      sh on t.shet_name = sh.clss_name and	sh.prnt_idcd  = '000054' 	")
			.where("left outer join prnt_shet      fd on b.fdat_size_idcd = fd.shet_idcd							")
			.where("left outer join prnt_shet      wo on b.work_size_idcd = wo.shet_idcd							")
			.where("left outer join prnt_shet      co on c.shet_idcd = co.shet_idcd									")
			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%" , arg.getParameter("find_name"))
			.where("and    b.invc_numb = :invc_numb" , arg.getParameter("invc_numb"))
			.where(") a																								")
			.where("order by a.line_seqn																			")
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
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_size_idcd				")
			.where("        , b.horz_leng       , b.vrtl_leng       , b.page_qntt				")
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
			.where("left outer join prnt_shet       t on b.shet_size_idcd = t.shet_idcd									")
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

	public SqlResultMap getProcLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select    a.shet_idcd   , a.shet_wght  ,  b.base_name as colr_name , a.stnd_pric	")
			.where("        , a.puch_pric   , a.esti_pric												")
			.where("from	prnt_shet_pric a															")
			.where("left outer join base_mast       b on b.base_idcd =  a.colr_bacd						")
			.where("where   1=1																			")
			.where("and   a.shet_idcd      = :shet_idcd			", arg.getParameter("shet_idcd"))
			.where("and   a.line_stat      = :line_stat			", arg.getParameter("line_stat"))
			.where("order  by a.shet_idcd																")
			.where(") a																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getClssLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select   a.clss_idcd  , a.clss_code     , a.clss_name  , clss_code_numb				")
			.where(" from	item_clss a																	")
			.where(" where   1=1																		")
			.where("and   a.line_levl      = :line_levl			", arg.getParameter("line_levl"))
			.where("and   a.line_stat      = :line_stat			", arg.getParameter("line_stat"))
			.where("and   a.clss_idcd not in ( '000050','000051')										")
			.where("order  by a.clss_code																")
			.where(") a																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSheetLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select    a.shet_idcd       , a.shet_name       , a.horz_leng        , a.vrtl_leng	")
			.where("       ,  a.lcls_idcd       , a.mcls_idcd       , sh.clss_idcd as scls_idcd			")
			.where("       ,  p.esti_pric																")
			.where(" from	prnt_shet a																	")
			.where(" left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd					")
			.where(" left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd					")
			.where(" left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd					")
			.where(" left outer join base_mast       b on b.base_idcd =  a.colr_bacd					")
			.where(" left outer join item_clss      sh on a.shet_name = sh.clss_name and	sh.prnt_idcd  = '000054' 	")
			.where(" left outer join prnt_shet_pric  p on a.shet_idcd =  p.shet_idcd					")
			.where(" where   1=1																		")
			.where("and   a.lcls_idcd      = :lcls_idcd			", arg.getParameter("lcls_idcd"))
			.where("and   a.mcls_idcd      = :mcls_idcd			", arg.getParameter("mcls_idcd"))
			.where("and   a.scls_idcd      = :scls_idcd			", arg.getParameter("scls_idcd"))
			.where("order   by	a.shet_idcd																")
			.where(") a																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getEsti_Pric_Lookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb           , a.ttle            , a.esti_pric          , b.shet_name			")
			.query("       , m.cstm_name           , m.invc_date													")
			.query("       , v1.clss_name as lcls_name   , v2.clss_name as mcls_name  , v3.clss_name as scls_name	")
		;
		data.param
			.where("from prnt_ordr_item a															")
			.where("left outer join prnt_ordr_mast  m on a.invc_numb = m.invc_numb					")
			.where("left outer join prnt_shet       b on a.shet_size_idcd = b.shet_idcd				")
			.where("left outer join item_clss_view v1 on a.item_lcls_idcd = v1.clss_idcd			")
			.where("left outer join item_clss_view v2 on a.item_mcls_idcd = v2.clss_idcd			")
			.where("left outer join item_clss_view v3 on a.item_scls_idcd = v3.clss_idcd			")
			.where("where 1=1																		")
			.where("and   a.item_lcls_idcd = :item_lcls_idcd	", arg.getParameter("item_lcls_idcd"))
			.where("and   a.item_mcls_idcd = :item_mcls_idcd	", arg.getParameter("item_mcls_idcd"))
			.where("and   a.item_scls_idcd = :item_scls_idcd	", arg.getParameter("item_scls_idcd"))
			.where("and   a.shet_size_idcd = :shet_size_idcd	", arg.getParameter("shet_size_idcd"))
			.where("and   m.cstm_idcd      = :cstm_idcd			", arg.getParameter("cstm_idcd"))
			.where("and   m.line_stat < 2															")
			.where("order by m.invc_date desc														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getCnsl(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb         , a.line_seqn         , a.cnsl_dttm       , a.drtr_idcd			")
			.where("        , a.cnsl_dvcd         , a.cnsl_cont         , a.ansr_rqst_yorn  , a.ansr_rqst_date		")
			.where("        , a.attc_file_name    , a.proc_date         , a.user_memo       , a.sysm_memo			")
			.where("        , a.crte_dttm         , a.crte_idcd         , a.updt_dttm       , a.updt_idcd			")
		;
		data.param
			.where("from prnt_proc_cnsl a																			")
			.where("left outer join prnt_ordr_mast b on a.invc_numb = b.invc_numb									")

			.where("where  1=1																						")
			.where("and   a.invc_numb           = :invc_numb				", arg.getParameter("invc_numb"))
			.where("and   a.line_seqn           = :line_seqn				", arg.getParameter("line_seqn"))
			.where("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getIndx(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.line_seqn       , a.indx_used_yorn    , a.shet_idcd				")
			.where("        , a.volm_indx_qntt as page_prnt_side     , a.esti_pric  as indx_esti_pric				")
			.where("        , a.esti_amnt as indx_esti_amnt         , a.work_memo 									")
			.where("        , i.shet_name       ,  a.prnt_colr_bacd as prnt_colr_bacd_shet							")
			.where("        , pr.dprt_blwt_pric , pr.sprt_blwt_pric , pr.dprt_colr_pric , pr.sprt_colr_pric			")
			.where("        , a.assi_seqn as indx_assi_seqn															")
			.where("        , case a.prnt_colr_bacd																	")
			.where("              when '1' then																		")
			.where("                '흑백단면'																		")
			.where("              when '2' then																		")
			.where("                '흑백양면'																		")
			.where("              when '3' then																		")
			.where("                '컬러단면'																		")
			.where("              when '4' then																		")
			.where("                '컬러양면'																		")
			.where("              else 0																			")
			.where("            end as prnt_colr_bacd_indx																						")
			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif       , pr.shet_wght	as indx_shet_wght				")
		;
		data.param
			.where("from prnt_ordr_indx a																			")
//			.where("left outer join prnt_ordr_item s  on a.invc_numb = s.invc_numb									")
			.where("left outer join prnt_shet      i  on i.shet_idcd = a.shet_idcd									")
			.where("left outer join prnt_shet_pric pr on a.shet_idcd = pr.shet_idcd	and a.shet_seqn = pr.line_seqn	")
			.where("where  1=1																						")
			.where("and   a.invc_numb      = :invc_numb			", arg.getParameter("invc_numb"))
			.where("and   a.line_seqn      = :line_seqn			", arg.getParameter("line_seqn"))
			.where("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getShet(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.invc_date       , a.regi_path_dvcd  , a.mmbr_idcd				")
			.where("        , b.line_seqn       , b.item_lcls_idcd  , b.item_mcls_idcd  , b.item_scls_idcd			")
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_size_idcd			")
			.where("        , b.horz_leng       , b.vrtl_leng       , b.page_qntt									")
			.where("        , b.colr_page_qntt  , b.volm_qntt       , b.bkbd_kind_idcd  , b.bkbd_dirt_dvcd			")
			.where("        , b.bkbd_bind       , b.dirt_dvcd       , b.esti_pric									")
			.where("        , b.cvst_bacd       , b.covr_amnt       , b.indx_amnt									")
			.where("        , b.cofm_pric       , b.sply_amnt       , b.vatx_amnt       , b.ttsm_amnt				")
			.where("        , b.cvst_qntt       , sb.base_name as prnt_colr_name									")
			.where("        , b.work_memo 	    , sb2.base_name as cvst_bacd_name       , cl.clss_name				")
			.where("        , c.covr_dsgn_dvcd  , c.covr_spec       , c.prnt_colr_bacd_covr							")
			.where("        , c.shet_idcd as shet_idcd_corv         , c.dsgn_yorn       , c.dsgn_code				")
			.where("        , c.covr_wing_dvcd  , c.esti_pric_covr  , c.sply_amnt_covr  , c.vatx_amnt_covr			")
			.where("        , c.esti_amnt_covr  , c.cofm_pric_covr  , c.ttsm_amnt_covr  , c.work_memo_covr			")
			.where("        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg									")
			.where("        , t.shet_name       , t.shet_name as shet_name2											")
			.where("        , bk.clss_name as bkbd_kind_name	    , co.shet_name as shet_name_covr				")
		;
		data.param
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
			.where("left outer join (select   c.covr_dsgn_dvcd   , c.covr_spec  , c.prnt_colr_bacd as prnt_colr_bacd_covr	")
			.where("                        , c.shet_idcd        , c.dsgn_yorn  , c.dsgn_code 						")
			.where("                       	, c.covr_wing_dvcd  , c.esti_pric as esti_pric_covr						")
			.where("                        , c.esti_amnt as esti_amnt_covr         , c.cofm_pric as cofm_pric_covr	")
			.where("                        , c.sply_amnt as sply_amnt_covr         , c.vatx_amnt as vatx_amnt_covr	")
			.where("                        , c.ttsm_amnt as ttsm_amnt_covr         , c.work_memo as work_memo_covr	")
			.where("                        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg					")
			.where("                        , c.invc_numb       , c.line_seqn       , c.assi_seqn , c.proc_shet_idcd")
			.where("                 from prnt_ordr_covr c															")
			.where("                 group by c.invc_numb															")
			.where("                ) c on  c.invc_numb = a.invc_numb and b.line_seqn = c.line_seqn					")
			.where("left outer join prnt_shet       t on b.shet_size_idcd = t.shet_idcd		")
			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
			.where("left outer join item_clss      cl on b.item_lcls_idcd = cl.clss_idcd							")
			.where("left outer join item_clss      bk on b.bkbd_kind_idcd = bk.clss_idcd							")
			.where("left outer join item_clss      sh on t.shet_name = sh.clss_name and	sh.prnt_idcd  = '000054' 	")
			.where("left outer join prnt_shet      fd on b.fdat_size_idcd = fd.shet_idcd							")
			.where("left outer join prnt_shet      wo on b.work_size_idcd = wo.shet_idcd							")
			.where("left outer join prnt_shet      co on c.shet_idcd = co.shet_idcd									")
			.where("left outer join prnt_shet      pr on c.proc_shet_idcd = pr.shet_idcd							")
			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%" , arg.getParameter("find_name"))
			.where("and    b.invc_numb = :invc_numb" , arg.getParameter("invc_numb"))
			.where("and    b.line_seqn = :line_seqn" , arg.getParameter("line_seqn"))
			.where(") a																								")
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getShet2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.line_seqn     , a.assi_seqn    , a.fabc_idcd , a.fabc_seqn		")
			//item
			.where("        , a.qntt as page_qntt , a.esti_pric  as shet_esti_pric									")
			.where("        , a.esti_amnt as shet_esti_amnt         , a.work_memo  , p.scls_idcd					")
			.where("        , p.shet_name as prnt_shet_name         ,  a.prnt_colr_bacd as prnt_colr_bacd_shet		")
			.where("        , pr.dprt_blwt_pric , pr.sprt_blwt_pric , pr.dprt_colr_pric , pr.sprt_colr_pric			")
			.where("        , case a.prnt_colr_bacd																	")
			.where("              when '1' then																		")
			.where("                '흑백단면'																		")
			.where("              when '2' then																		")
			.where("                '흑백양면'																		")
			.where("              when '3' then																		")
			.where("                '컬러단면'																		")
			.where("              when '4' then																		")
			.where("                '컬러양면'																		")
			.where("              else 0																			")
			.where("            end																					")
			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif       , pr.shet_wght									")
		;
		data.param
			.where("from prnt_ordr_shet a																			")
			.where("left outer join prnt_shet       p on a.fabc_idcd = p.shet_idcd									")
			.where("left outer join prnt_shet_pric  pr on p.shet_idcd = pr.shet_idcd and a.fabc_seqn = pr.line_seqn ")
//			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
//			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
//			.where("left outer join (select   c.covr_dsgn_dvcd   , c.covr_spec  , c.prnt_colr_bacd as prnt_colr_bacd_covr	")
//			.where("                        , c.shet_idcd        , c.dsgn_yorn  , c.dsgn_code 						")
//			.where("                       	, c.covr_wing_dvcd  , c.esti_pric as esti_pric_covr						")
//			.where("                        , c.esti_amnt as esti_amnt_covr         , c.cofm_pric as cofm_pric_covr	")
//			.where("                        , c.sply_amnt as sply_amnt_covr         , c.vatx_amnt as vatx_amnt_covr	")
//			.where("                        , c.ttsm_amnt as ttsm_amnt_covr         , c.work_memo as work_memo_covr	")
//			.where("                        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg					")
//			.where("                        , c.invc_numb       , c.line_seqn       , c.assi_seqn , c.proc_shet_idcd")
//			.where("                 from prnt_ordr_covr c															")
//			.where("                 group by c.invc_numb															")
//			.where("                ) c on  c.invc_numb = a.invc_numb and b.line_seqn = c.line_seqn					")
//			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
//			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
//			.where("left outer join item_clss      cl on b.item_lcls_idcd = cl.clss_idcd							")
//			.where("left outer join item_clss      bk on b.bkbd_kind_idcd = bk.clss_idcd							")
//			.where("left outer join item_clss      sh on t.shet_name = sh.clss_name and	sh.prnt_idcd  = '000054' 	")
//			.where("left outer join prnt_shet      fd on b.fdat_size_idcd = fd.shet_idcd							")
//			.where("left outer join prnt_shet      wo on b.work_size_idcd = wo.shet_idcd							")
//			.where("left outer join prnt_shet      co on c.shet_idcd = co.shet_idcd									")
	//		.where("left outer join prnt_shet      pr on c.proc_shet_idcd = pr.shet_idcd							")
			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%" , arg.getParameter("find_name"))
			.where("and    a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"))
			.where("and    a.line_seqn = :line_seqn" , arg.getParameter("line_seqn"))
			.where(") a																								")
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getCovr(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select   a.covr_dsgn_dvcd   , a.covr_spec  , c.prnt_colr_bacd as prnt_colr_bacd_covr		")
			.where("       , a.shet_idcd        , a.dsgn_yorn  , c.dsgn_code 									")
			.where("       , a.covr_wing_dvcd   , a.esti_pric as esti_pric_covr									")
			.where("       , a.esti_amnt as esti_amnt_covr     , c.cofm_pric as cofm_pric_covr					")
			.where("       , a.sply_amnt as sply_amnt_covr     , c.vatx_amnt as vatx_amnt_covr					")
			.where("       , a.ttsm_amnt as ttsm_amnt_covr     , c.work_memo as work_memo_covr					")
			.where("       , a.fcvr_strg        , a.scvr_strg  , c.bcvr_strg									")
			.where("       , a.invc_numb        , a.line_seqn  , c.assi_seqn , c.proc_shet_idcd")

		;
		data.param
			.where("from prnt_ordr_covr a																		")
			.where("left outer join prnt_ordr_mast b  on a.invc_numb = b.invc_numb								")
			.where("left outer join prnt_ordr_item s  on a.invc_numb = s.invc_numb								")
			.where("left outer join prnt_shet      p  on a.fabc_idcd = p.shet_idcd								")

			.where("where  1=1																					")
			.where("and   a.invc_numb      = :invc_numb			", arg.getParameter("invc_numb"))
			.where("and   a.line_seqn      = :line_seqn			", arg.getParameter("line_seqn"))
			.where("order by a.invc_numb ) a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getProc(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.line_seqn       , a.etcc_proc_amnt								")
			.where("        , a.work_memo       , a.prod_cmpl_dttm  , a.shet_idcd as proc_shet_idcd					")
			.where("        , a.user_memo       , a.sysm_memo       , p.shet_name as proc_shet_name					")
			.where("        , a.crte_dttm       , a.crte_idcd       , a.updt_dttm    , a.updt_idcd					")
			.where("        , b.deli_date       , m.mmbr_name       , b.dlvy_exps    , b.dvex_burd_dvcd				")
			.where("        , b.tele_numb       , b.mail_addr       , c.cstm_name									")
			.where("        , b.invc_name       , b.dlvy_mthd_dvcd  , b.addr_1fst 									")
			.where("        , b.addr_2snd       , b.rctr_name       , b.dlvy_tele_numb								")
			.where("        , b.dlvy_memo																			")

		;
		data.param
			.where("from prnt_ordr_proc a																			")
			.where("left outer join prnt_ordr_mast b  on a.invc_numb = b.invc_numb 									")
			.where("left outer join prnt_mmbr_mast  m on b.mmbr_idcd = m.mmbr_idcd 									")
			.where("left outer join cstm_mast       c on b.cstm_idcd = c.cstm_idcd									")
			.where("left outer join prnt_shet p on a.shet_idcd = p.shet_idcd 										")

			.where("where  1=1																						")
			.where("and   a.invc_numb      = :invc_numb			", arg.getParameter("invc_numb"))
			.where("and   a.line_seqn      = :line_seqn			", arg.getParameter("line_seqn"))
			.where("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//수주확정 , 취소
	public SqlResultMap setCofm(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("prnt_ordr_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("cofm_yorn"		, arg.getParamText("cofm_yorn"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_idcd"		, arg.getParamText("login_id"))
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setCofmcancel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("prnt_ordr_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("cofm_yorn"		, arg.getParamText("cofm_yorn"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_idcd"		, arg.getParamText("login_id"))
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();

		return null;
	}

	public SqlResultMap setPrnt_cnsl(HttpRequestArgument arg) throws Exception {
		String cnsl_dttm="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			cnsl_dttm = row.getParamText("cnsl_dttm");
			if(cnsl_dttm.matches("^[0-9]+$")){
			}else{
				if(!row.getParamText("cnsl_dttm").isEmpty()){
					cnsl_dttm = df.format(new Date(row.getParamText("cnsl_dttm")));
				}
			}
			data.param
				.table("prnt_proc_cnsl")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb", row.fixParameter("invc_numb"))
				.unique("line_seqn", row.fixParameter("line_seqn"))

				.update("cnsl_dttm", cnsl_dttm)
				.update("drtr_idcd", row.getParameter("drtr_idcd"))
				.update("cnsl_dvcd", row.getParameter("cnsl_dvcd"))
				.update("cnsl_cont", row.getParameter("cnsl_cont"))
				.update("proc_date", row.getParameter("proc_date"))
				.update("ansr_rqst_yorn", row.getParameter("ansr_rqst_yorn"))
				.update("ansr_rqst_date", row.getParameter("ansr_rqst_date"))
				.update("attc_file_name", row.getParameter("attc_file_name"))

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

	public SqlResultMap setCovr(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.param
			.table("prnt_ordr_covr"													)
			.where("where invc_numb		= :invc_numb							")	/*  INVOICE번호  */
			.where("and   line_seqn		= :line_seqn							")	/*  순번  */
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
			//
			.update("covr_dsgn_dvcd"	, arg.getParameter("covr_dsgn_dvcd"		))	/*   */
			.update("covr_spec"			, arg.getParameter("covr_spec"			))	/*   */
			.update("prnt_colr_bacd"	, arg.getParameter("prnt_colr_bacd"		))	/*   */
			.update("shet_idcd"			, arg.getParameter("shet_idcd"			))	/*   */
			.update("dsgn_yorn"			, arg.getParameter("dsgn_yorn"			))	/*   */
			.update("dsgn_code"			, arg.getParameter("dsgn_code"			))	/*    */
			.update("attc_file_yorn"	, arg.getParameter("attc_file_yorn"		))	/*    */
			.update("esti_pric"			, arg.getParameter("esti_amnt_covr"			))	/*    */
			.update("esti_amnt"			, arg.getParameter("esti_amnt"			))	/*    */
			.update("cofm_pric"			, arg.getParameter("cofm_pric"			))	/*   */
			.update("sply_amnt"			, arg.getParameter("sply_amnt"			))	/*   */
			.update("vatx_amnt"			, arg.getParameter("vatx_amnt"			))	/*   */
			.update("ttsm_amnt"			, arg.getParameter("ttsm_amnt"			))	/*   */
			.update("work_memo"			, arg.getParameter("work_memo"			))	/*   */
			.update("prod_cmpl_dttm"	, arg.getParameter("prod_cmpl_dttm"		))	/*   */
			.update("fcvr_strg"			, arg.getParameter("fcvr_strg"			))	/*   */
			.update("scvr_strg"			, arg.getParameter("scvr_strg"			))	/*   */
			.update("bcvr_strg"			, arg.getParameter("bcvr_strg"			))	/*   */
			.update("covr_wing_dvcd"	, arg.getParameter("covr_wing_dvcd"		))	/*   */
			.update("proc_shet_idcd"	, arg.getParameter("proc_shet_idcd"		))	/*   */
			.update("assi_seqn"			, arg.getParameter("assi_seqn"			))	/*   */
			;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		return null;
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

	public SqlResultMap MastersetDelete(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("prnt_ordr_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

		;data.attach(Action.delete);
		data.execute();
		return null;
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("prnt_ordr_item")
			.where("where invc_numb = :invc_numb ")
			.where("and line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))

		;data.attach(Action.delete);
		data.execute();
		return null;
	}

	public SqlResultMap getMaxid(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    ifnull(MAX(line_seqn)+1,0) as seqn						")
			;
		data.param //퀴리문
			.where("from		prnt_ordr_item a												")
			.where("where 1=1 and a.invc_numb = :invc_numb",arg.getParameter("invc_numb"))
		;
			return data.selectForMap();
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
	public SqlResultMap setRecords(HttpRequestArgument arg) throws Exception {
		int i = 0;
		DataMessage data = arg.newStorage("POS");
		String invc_numb = "";
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				data.param
					.table("prnt_ordr_mast")

					.where("where invc_numb = :invc_numb")

					.unique("invc_numb", row.fixParameter("invc_numb"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("prnt_ordr_item")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb", row.fixParameter("invc_numb"))
					.unique("line_seqn", row.fixParameter("line_seqn"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("prnt_ordr_covr")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb", row.fixParameter("invc_numb"))
					.unique("line_seqn", row.fixParameter("line_seqn"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("prnt_ordr_indx")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb", row.fixParameter("invc_numb"))
					.unique("line_seqn", row.fixParameter("line_seqn"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("prnt_ordr_proc")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb", row.fixParameter("invc_numb"))
					.unique("line_seqn", row.fixParameter("line_seqn"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
				.table("prnt_ordr_shet")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb", row.fixParameter("invc_numb"))
				.unique("line_seqn", row.fixParameter("line_seqn"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.query("select count(*) as cnt ")
				;
				data.param
					.where("from prnt_ordr_item")
					.where("where invc_numb = :invc_numb",row.fixParameter("invc_numb"))
				;
				SqlResultMap map = data.selectForMap();
				data.clear();
				if(map.get(0).getParamText("cnt")=="0"){
					data.param
						.table("prnt_ordr_mast")
						.where("where   invc_numb  = :invc_numb  " )
						//
						.unique("invc_numb"			, row.fixParameter("invc_numb"))
						.update("line_stat"			, 2)
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.update);
					data.execute();
					data.clear();
				}
			} else {
				// master
				if(i==0){
					data.param
						.table("prnt_ordr_mast")
						.where("where   invc_numb  = :invc_numb  " )
						//
						.unique("invc_numb"			, row.fixParameter("invc_numb"))

						.update("invc_date"			, row.getParameter("invc_date"))
						.update("regi_path_dvcd"	, row.getParameter("regi_path_dvcd"))
						.update("mmbr_idcd"			, row.getParameter("mmbr_idcd"))
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
						.update("cstm_name"			, row.getParameter("cstm_name"))
						.update("tele_numb"			, row.getParameter("tele_numb"))
						.update("mail_addr"			, row.getParameter("mail_addr"))
						.update("corp_idcd"			, row.getParameter("corp_idcd"))
						.update("buss_numb"			, row.getParameter("buss_numb"))
						.update("addr_1fst"			, row.getParameter("addr_1fst"))
						.update("addr_2snd"			, row.getParameter("addr_2snd"))
						.update("rcvd_dvcd"			, row.getParameter("rcvd_dvcd"))
						.update("invc_name"			, row.getParameter("invc_name"))
						.update("deli_date"			, row.getParameter("deli_date"))
						.update("esti_amnt"			, row.getParameter("esti_amnt"))
						.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))
						.update("dsnt_amnt"			, row.getParameter("dsnt_amnt"))
	//					.update("sply_amnt"			, row.getParameter("sply_amnt"))
	//					.update("vatx_amnt"			, row.getParameter("vatx_amnt"))
	//					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))
	//					.update("covr_amnt"			, row.getParameter("covr_amnt"))
	//					.update("indx_amnt"			, row.getParameter("indx_amnt"))
	//					.update("etcc_proc_amnt"	, row.getParameter("etcc_proc_amnt"))
						.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd"))
						.update("cofm_yorn"			, row.getParameter("cofm_yorn"))
						.update("cofm_dttm"			,  new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.update("cofm_drtr_idcd"	, row.getParameter("cofm_drtr_idcd"))
						.update("hdco_idcd"			, row.getParameter("hdco_idcd"))
						.update("hdco_name"			, row.getParameter("hdco_name"))
						.update("dlvy_exps"			, row.getParameter("dlvy_exps"))
						.update("dvex_burd_dvcd"	, row.getParameter("dvex_burd_dvcd"))
						.update("dlvy_mthd_dvcd"	, row.getParameter("dlvy_mthd_dvcd"))
						.update("dlvy_zpcd"			, row.getParameter("dlvy_zpcd"))
						.update("dlvy_addr_1fst"	, row.getParameter("dlvy_addr_1fst"))
						.update("dlvy_addr_2snd"	, row.getParameter("dlvy_addr_2snd"))
						.update("dlvy_tele_numb"	, row.getParameter("dlvy_tele_numb"))
						.update("rctr_name"			, row.getParameter("rctr_name"))
						.update("dinv_numb"			, row.getParameter("dinv_numb"))
						.update("dlvy_stat_dvcd"	, row.getParameter("dlvy_stat_dvcd"))
						.update("dlvy_date"			, row.getParameter("dlvy_date"))
						.update("dlvy_reqt_memo"	, row.getParameter("dlvy_reqt_memo"))
						.update("dlvy_memo"			, row.getParameter("dlvy_memo"))
						.update("camt_colt_dttm"	, row.getParameter("camt_colt_dttm"))
						.update("camt_iamt_amnt"	, row.getParameter("camt_iamt_amnt"))
						.update("npay_baln_amnt"	, row.getParameter("npay_baln_amnt"))
						.update("colt_dttm"			, row.getParameter("colt_dttm"))
						.update("colt_drtr_idcd"	, row.getParameter("colt_drtr_idcd"))
						.update("stot_mthd_dvcd"	, row.getParameter("stot_mthd_dvcd"))
						.update("colt_acct_numb"	, row.getParameter("colt_acct_numb"))
						.update("colt_amnt"			, row.getParameter("colt_amnt"))
						.update("refn_atcl_1fst"	, row.getParameter("refn_atcl_1fst"))
						.update("refn_atcl_2snd"	, row.getParameter("refn_atcl_2snd"))

						.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
						.insert("line_levl"			, row.getParameter("line_levl"))
						.update("line_stat"			, row.getParameter("line_stat"))
						.update("user_memo"			, row.getParameter("user_memo"))
						.update("find_name"			, row.getParamText("ttle"         ).trim()
													+ " "
													+ row.getParamText("cstm_name"         ).trim()
													+ " "
													+ row.getParamText("invc_numb"         ).trim())
						.update("updt_idcd"			, row.getParameter("updt_idcd"))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.modify);
					invc_numb = row.fixParamText("invc_numb");
					i++;
				}
				int sply = 0;
				int esti_amnt = 0,covr_amnt = 0,indx_amnt = 0,etcc_proc_amnt=0;
				if(!row.getParamText("esti_amnt").equals("")){
					esti_amnt = Integer.parseInt(row.getParamText("esti_amnt"));
				}
				if(!row.getParamText("covr_amnt").equals("")){
					covr_amnt = Integer.parseInt(row.getParamText("covr_amnt"));
				}
				if(!row.getParamText("indx_amnt").equals("")){
					covr_amnt = Integer.parseInt(row.getParamText("indx_amnt"));
				}
				if(!row.getParamText("etcc_proc_amnt").equals("")){
					covr_amnt = Integer.parseInt(row.getParamText("etcc_proc_amnt"));
				}
				sply = esti_amnt+covr_amnt+indx_amnt+etcc_proc_amnt;
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
					.update("shet_size_idcd"	, row.getParameter("shet_size_idcd"))
					.update("fdat_size_idcd"	, row.getParameter("fdat_size_idcd"))
					.update("work_size_idcd"	, row.getParameter("work_size_idcd"))
//					.update("shet_size_dvcd"	, row.getParameter("shet_size_dvcd"))
					.update("horz_leng"			, row.getParameter("horz_leng"))
					.update("vrtl_leng"			, row.getParameter("vrtl_leng"))
					.update("page_qntt"			, row.getParameter("page_qntt"))
					.update("colr_page_qntt"	, row.getParameter("colr_page_qntt"))
					.update("volm_qntt"			, row.getParameter("volm_qntt"))
					.update("bkbd_kind_idcd"	, row.getParameter("bkbd_kind_idcd"))
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
					.update("sply_amnt"			, sply)
					.update("vatx_amnt"			, sply * 0.1)
					.update("ttsm_amnt"			, sply+(sply*0.1))
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
				;data.attach(Action.modify);

				//corv
				data.param
					.table("prnt_ordr_covr")
					.where("where   invc_numb  = :invc_numb  " )
					.where("and     line_seqn  = :line_seqn  " )
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, 1)

					.update("shet_idcd"			, row.getParameter("shet_idcd_covr"))
					.update("covr_dsgn_dvcd"	, row.getParameter("covr_dsgn_dvcd"))
					.update("covr_spec"			, row.getParameter("covr_spec"))
					.update("prnt_colr_bacd"	, row.getParameter("prnt_colr_bacd_covr"))
					.update("dsgn_yorn"			, row.getParameter("dsgn_yorn"))
					.update("dsgn_code"			, row.getParameter("dsgn_code"))
					.update("esti_pric"			, row.getParameter("esti_pric_covr"))
					.update("esti_amnt"			, row.getParameter("esti_amnt_covr"))
					.update("cofm_pric"			, row.getParameter("cofm_pric_covr"))
					.update("sply_amnt"			, row.getParameter("sply_amnt_covr"))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt_covr"))
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt_covr"))
					.update("work_memo"			, row.getParameter("work_memo_corv"))
					.update("fcvr_strg"			, row.getParameter("fcvr_strg"))
					.update("scvr_strg"			, row.getParameter("scvr_strg"))
					.update("bcvr_strg"			, row.getParameter("bcvr_strg"))
					.update("covr_wing_dvcd"	, row.getParameter("covr_wing_dvcd"))
					.update("proc_shet_idcd"	, row.getParameter("proc_shet_idcd"))
					.update("assi_seqn"			, row.getParameter("assi_seqn"))



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
				;data.attach(Action.modify);


				//indx
//				data.param
//					.table("prnt_ordr_indx")
//					.where("where   invc_numb  = :invc_numb  " )
//					.where("and     line_seqn  = :line_seqn  " )
//					//
//					.unique("invc_numb"			, row.fixParameter("invc_numb"))
//					.unique("line_seqn"			, row.fixParameter("line_seqn"))
//
//					.update("indx_used_yorn"	, row.getParameter("indx_used_yorn"))
//					.update("shet_idcd"			, row.getParameter("shet_idcd_indx"))
//					.update("volm_indx_qntt"	, row.getParameter("volm_indx_qntt"))
//					.update("prnt_colr_bacd"	, row.getParameter("prnt_colr_bacd"))
//					.update("prnt_yorn"			, row.getParameter("prnt_yorn"))
//					.update("indx_yorn"			, row.getParameter("indx_yorn"))
//					.update("esti_pric"			, row.getParameter("esti_pric"))
//					.update("esti_amnt"			, row.getParameter("esti_amnt"))
//					.update("cofm_pric"			, row.getParameter("cofm_pric"))
//					.update("sply_amnt"			, row.getParameter("sply_amnt"))
//					.update("vatx_amnt"			, row.getParameter("vatx_amnt"))
//					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))
//					.update("work_memo"			, row.getParameter("work_memo_indx"))
//					.update("page_prnt_side"	, row.getParameter("page_prnt_side"))
//
//
//
//					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
//					.insert("line_levl"			, row.getParameter("line_levl"))
//					.update("line_stat"			, row.getParameter("line_stat"))
//					.update("user_memo"			, row.getParameter("user_memo"))
//					.update("updt_idcd"			, row.getParameter("updt_idcd"))
//					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
//					.update("updt_ipad"			, arg.remoteAddress )
//					.insert("crte_ipad"			, arg.remoteAddress )
//					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;data.attach(Action.insert);


				//proc
//				data.param
//					.table("prnt_ordr_proc")
//					.where("where   invc_numb  = :invc_numb  " )
//					.where("and     line_seqn  = :line_seqn  " )
//					//
//					.unique("invc_numb"			, row.fixParameter("invc_numb"))
//					.unique("line_seqn"			, row.fixParameter("line_seqn"))
//
//					.update("shet_idcd"			, row.getParameter("shet_idcd"))
//					.update("prod_cmpl_dttm"	, row.getParameter("prod_cmpl_dttm"))
//					.update("etcc_proc_amnt"	, row.getParameter("etcc_proc_amnt"))
//					.update("work_memo"			, row.getParameter("work_memo_proc"))
//
//					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
//					.insert("line_levl"			, row.getParameter("line_levl"))
//					.update("line_stat"			, row.getParameter("line_stat"))
//					.update("user_memo"			, row.getParameter("user_memo"))
//					.update("updt_idcd"			, row.getParameter("updt_idcd"))
//					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
//					.update("updt_ipad"			, arg.remoteAddress )
//					.insert("crte_ipad"			, arg.remoteAddress )
//					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;data.attach(Action.insert);

				//shet
//				data.param
//					.table("prnt_ordr_shet")
//					.where("where   invc_numb  = :invc_numb  " )
//					.where("and     line_seqn  = :line_seqn  " )
//					//
//					.unique("invc_numb"			, row.fixParameter("invc_numb"))
//					.unique("line_seqn"			, row.fixParameter("line_seqn"))
//
//					.update("fabc_idcd"			, row.getParameter("fabc_idcd"))
//					.update("qntt"				, row.getParameter("qntt"))
//					.update("esti_pric"			, row.getParameter("esti_pric"))
//					.update("esti_amnt"			, row.getParameter("esti_amnt"))
//					.update("work_memo"			, row.getParameter("work_memo_proc"))
//
//					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
//					.insert("line_levl"			, row.getParameter("line_levl"))
//					.update("line_stat"			, row.getParameter("line_stat"))
//					.update("user_memo"			, row.getParameter("user_memo"))
//					.update("updt_idcd"			, row.getParameter("updt_idcd"))
//					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
//					.update("updt_ipad"			, arg.remoteAddress )
//					.insert("crte_ipad"			, arg.remoteAddress )
//					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;data.attach(Action.modify);
//				data.execute();
//				data.clear();
			}
		}
		data.param
			.query("update prnt_ordr_mast a																							")
			.query("left outer join																									")
			.query("( select invc_numb, sum(sply_amnt) as sply_amnt , sum(vatx_amnt) as vatx_amnt  , sum(ttsm_amnt) as ttsm_amnt	")
			.query("  from prnt_ordr_item																							")
			.query("  where invc_numb = :invc			",invc_numb)
			.query(") b on a.invc_numb = b.invc_numb	")
			.query("set a.sply_amnt = b.sply_amnt		")
			.query("and a.vatx_amnt = b.vatx_amnt		")
			.query("and a.ttsm_amnt = b.ttsm_amnt		")
			.query("where a.invc_numb = :invc_numb", invc_numb)
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null ;
	}

	public SqlResultMap setRecords2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String check = arg.getParamText("check");


		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		if (rowaction == Action.delete) {

//			SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
//			ParamToJson trans = new ParamToJson();
//			String param = trans.TranslateRowRec(map,"", "invc_numb,line_seqn,item_idcd");
//
//			data.param
//				.query("call bom_delete_copy1 (					")
//				.query("   :param		" , param)
//				.query(" ) 									")
//			;
//			data.attach(Action.direct);
//			data.execute();
//			data.clear();
		} else {
			data.param
				.table("prnt_ordr_item						")
				.where("where invc_numb  = :invc_numb	")
				.where("and   line_seqn  = :line_seqn	")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"		))

				.update("item_lcls_idcd"	, arg.getParameter("lcls_idcd"	))		//
				.update("item_mcls_idcd"	, arg.getParameter("mcls_idcd"	))		//
				.update("item_scls_idcd"	, arg.getParameter("scls_idcd"	))		//
				.update("ttle"				, arg.getParameter("ttle"))		//
				.update("prnt_colr_bacd"	, arg.getParameter("prnt_colr_bacd"	))		//
				.update("prnt_mthd_dvcd"	, arg.getParameter("prnt_mthd_dvcd"	))		//
				.update("shet_size_idcd"	, arg.getParameter("shet_size_idcd"	))		//
				.update("fdat_size_idcd"	, arg.getParameter("fdat_size_idcd"	))		//
				.update("work_size_idcd"	, arg.getParameter("work_size_idcd"	))		//
				.update("horz_leng"			, arg.getParameter("horz_leng"		))		//
				.update("vrtl_leng"			, arg.getParameter("vrtl_leng"		))		//
				.update("page_qntt"			, arg.getParameter("page_qntt"		))		//
				.update("colr_page_qntt"	, arg.getParameter("colr_page_qntt"	))		//
				.update("volm_qntt"			, arg.getParameter("volm_qntt"		))		//
				.update("bkbd_kind_idcd"	, arg.getParameter("bkbd_kind_idcd"	))		//
				.update("bkbd_dirt_dvcd"	, arg.getParameter("bkbd_dirt_dvcd"	))		//
				.update("bkbd_bind"			, arg.getParameter("bkbd_bind"		))		//
				.update("dirt_dvcd"			, arg.getParameter("dirt_dvcd"		))		//
				.update("esti_pric"			, arg.getParameter("esti_pric"		))		//
				.update("esti_amnt"			, arg.getParameter("esti_amnt"		))		//
				.update("covr_amnt"			, arg.getParameter("covr_amnt"		))		//
				.update("indx_amnt"			, arg.getParameter("indx_amnt"		))		//
				.update("etcc_proc_amnt"	, arg.getParameter("etcc_proc_amnt"	))		//
				.update("cofm_pric"			, arg.getParameter("cofm_pric"		))		//
				.update("sply_amnt"			, arg.getParameter("sply_amnt"		))		//
				.update("vatx_amnt"			, arg.getParameter("vatx_amnt"		))		//
				.update("ttsm_amnt"			, arg.getParameter("ttsm_amnt"		))		//
				.update("work_memo"			, arg.getParameter("work_memo"		))		//
				.update("ttsm_amnt"			, arg.getParameter("ttsm_amnt"		))		//
				.update("user_memo"			, arg.getParameter("user_memo"		))		//사용자메모
				.insert("prnt_idcd"			, arg.getParameter("prnt_idcd"		))
				.insert("line_levl"			, arg.getParameter("line_levl"		))
				.insert("line_ordr"			, arg.getParameter("line_ordr"		))
				.insert("uper_seqn"			, arg.getParameter("uper_seqn"		))

				.update("updt_idcd"			, arg.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
			data.attach(rowaction);
			data.execute();
			data.clear();
//			if(check.equals('Y')){
//				data.param
////				.table("mtrl_need						")
////				.where("where invc_numb  = :invc_numb	")
////				.where("and   prnt_idcd  = :prnt_idcd")
////
////				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
////				.unique("prnt_idcd"			, arg.fixParameter("prev_item"		))
////
////				.update("prnt_idcd"			, arg.getParameter("item_idcd"		))
////				;
////				data.attach(rowaction);
////				data.execute();
////				data.clear();
//			}
		}
		return null ;
	}

	public SqlResultMap getTreeSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select ifnull(max(line_seqn),0) as seq,ifnull(max(line_ordr),0) as ordr_seq	")
		;
		data.param //퀴리문
		.where("from prnt_ordr_item											")
		.where("where 1=1													")
		.where("and   invc_numb = :invc_numb" , arg.getParameter("invc_numb"))
		;
		return data.selectForMap();
	}

	public SqlResultMap setItem(HttpRequestArgument arg) throws Exception {
		int i = 0;
		DataMessage data = arg.newStorage("POS");
		String invc_numb = "";
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("prnt_ordr_item")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb", row.fixParameter("invc_numb"))
					.unique("line_seqn", row.fixParameter("line_seqn"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			} else {
				int sply = 0;
				int esti_amnt = 0,covr_amnt = 0,indx_amnt = 0,etcc_proc_amnt=0;
//				int esti_pric
//				if(!row.getParamText("esti_amnt").equals("")){
//					esti_pric = 0;
//				}
				if(!row.getParamText("esti_amnt").equals("")){
					esti_amnt = Integer.parseInt(row.getParamText("esti_amnt"));
				}
				if(!row.getParamText("covr_amnt").equals("")){
					covr_amnt = Integer.parseInt(row.getParamText("covr_amnt"));
				}
				if(!row.getParamText("indx_amnt").equals("")){
					covr_amnt = Integer.parseInt(row.getParamText("indx_amnt"));
				}
				if(!row.getParamText("etcc_proc_amnt").equals("")){
					covr_amnt = Integer.parseInt(row.getParamText("etcc_proc_amnt"));
				}
				sply = esti_amnt+covr_amnt+indx_amnt+etcc_proc_amnt;
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
					.update("shet_size_idcd"	, row.getParameter("shet_size_idcd"))
					.update("fdat_size_idcd"	, row.getParameter("fdat_size_idcd"))
					.update("work_size_idcd"	, row.getParameter("work_size_idcd"))
//					.update("shet_size_dvcd"	, row.getParameter("shet_size_dvcd"))
					.update("horz_leng"			, row.getParameter("horz_leng"))
					.update("vrtl_leng"			, row.getParameter("vrtl_leng"))
					.update("page_qntt"			, row.getParameter("page_qntt"))
					.update("colr_page_qntt"	, row.getParameter("colr_page_qntt"))
					.update("volm_qntt"			, row.getParameter("volm_qntt"))
					.update("bkbd_kind_idcd"	, row.getParameter("bkbd_kind_idcd"))
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
					.update("sply_amnt"			, sply)
					.update("vatx_amnt"			, sply * 0.1)
					.update("ttsm_amnt"			, sply+(sply*0.1))
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
				;data.attach(Action.modify);
			}
		}

		return null ;
	}

	public SqlResultMap setPrnt_shet(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			data.param
				.table("prnt_ordr_shet")
				.where("where   invc_numb  = :invc_numb  " )
				.where("and     line_seqn  = :line_seqn  " )

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("assi_seqn"			, row.getParameter("assi_seqn"))
				.update("fabc_idcd"			, row.getParameter("fabc_idcd"))
				.update("fabc_seqn"			, row.getParameter("fabc_seqn"))
				.update("prnt_colr_bacd"	, row.getParameter("prnt_colr_bacd_shet"))
				.update("qntt"				, row.getParameter("page_qntt"))
				.update("esti_pric"			, row.getParameter("shet_esti_pric"))
				.update("esti_amnt"			, row.getParameter("shet_esti_amnt"))
				.update("work_memo"			, row.getParameter("work_memo_proc"))

				.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("line_stat"			, row.getParameter("line_stat"))
				.update("user_memo"			, row.getParameter("user_memo"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
				data.execute();
				data.clear();
		}
		return null;
	}

	public SqlResultMap setPrnt_indx(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			data.param
				.table("prnt_ordr_indx")
				.where("where   invc_numb  = :invc_numb  " )
				.where("and     line_seqn  = :line_seqn  " )

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("assi_seqn"			, row.getParameter("indx_assi_seqn"))
				.update("indx_used_yorn"	, row.getParameter("indx_used_yorn"))
				.update("shet_idcd"			, row.getParameter("shet_idcd"))
				.update("shet_seqn"			, row.getParameter("shet_seqn"))
				.update("volm_indx_qntt"	, row.getParameter("volm_indx_qntt"))
				.update("prnt_colr_bacd"	, row.getParameter("prnt_colr_bacd_indx"))
				.update("indx_yorn"			, row.getParameter("indx_yorn"))
				.update("esti_pric"			, row.getParameter("indx_esti_pric"))
				.update("esti_amnt"			, row.getParameter("indx_esti_amnt"))
				.update("work_memo"			, row.getParameter("work_memo_indx"))
				.update("page_prnt_side"	, row.getParameter("page_prnt_side"))

				.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("line_stat"			, row.getParameter("line_stat"))
				.update("user_memo"			, row.getParameter("user_memo"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			data.attach(rowaction);
			data.execute();
			data.clear();
		}
		return null;
	}

	public SqlResultMap setPrnt_proc(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			data.param
				.table("prnt_ordr_proc")
				.where("where   invc_numb  = :invc_numb  " )
				.where("and     line_seqn  = :line_seqn  " )
				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("assi_seqn"			, row.getParameter("assi_seqn"))
				.update("shet_idcd"			, row.getParameter("proc_shet_idcd"))
				.update("etcc_proc_amnt"	, row.getParameter("etcc_proc_amnt"))
				.update("work_memo"			, row.getParameter("work_memo"))
				.update("qntt"				, row.getParameter("qntt"))

				.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("line_stat"			, row.getParameter("line_stat"))
				.update("user_memo"			, row.getParameter("user_memo"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
		}
		data.execute();
		return null;
	}

	public SqlResultMap setProc(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			data.param
				.table("prnt_ordr_proc")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb", row.fixParameter("invc_numb"))
				.unique("line_seqn", row.fixParameter("line_seqn"))

				.update("assi_seqn", 		 row.getParameter("assi_seqn"))
				.update("shet_idcd", 		 row.getParameter("proc_shet_idcd"))
				.update("etcc_proc_amnt",	 row.getParameter("etcc_proc_amnt"))
				.update("user_memo",		 row.getParameter("user_memo"))
				.update("sysm_memo",		 row.getParameter("sysm_memo"))

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
}
