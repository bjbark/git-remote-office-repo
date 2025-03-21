package com.sky.system.custom.symct.sale.prjtprocess;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;


@Service("symc.prjtprocessService")
public class PrjtProcessService extends DefaultServiceHandler {

	public SqlResultMap getMasterSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select     a.pjod_idcd       , a.amnd_degr         , a.pjod_code       , a.pjod_dvcd		")
			.query("         , a.expt_dvcd       , a.cstm_idcd         , a.prjt_idcd       , a.regi_date		")
			.query("         , a.item_idcd       , a.esti_amnt         , a.cofm_yorn       , a.cofm_date		")
			.query("         , a.cofm_amnt       , a.crny_dvcd         , a.frst_exam_date  , a.send_exam_date	")
			.query("         , a.deli_date       , a.ppsl_deli_date    , a.strt_date       , a.endd_date		")
			.query("         , a.drtr_idcd       , a.dlvy_date         , a.last_yorn       , a.apvl_date		")
			.query("         , a.apvl_drtr_idcd  , a.cstm_item_code    , a.mold_size       , a.cavity			")
			.query("         , a.mold_wigt       , a.used_mtrl_name    , a.prod_wigt       , a.used_tons		")
			.query("         , a.pjod_name       , a.item_imge													")
			.query("         , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("         , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.query("         , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("         , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("         , a.crte_idcd       , a.crte_urif													")
			.query("         , c.cstm_code       , c.cstm_name         , u.user_name as drtr_name				")
			.query("         , i.item_code       , i.item_spec         , i.item_name       , i.modl_name		")
			.query("         , p.prjt_code       , p.prjt_name													")
			.query("         , c.buss_name       , c.buss_numb         , c.buss_kind       , c.buss_type		")
			.query("         , c.corp_dvcd       , c.boss_name         , c.tele_numb       , c.faxi_numb		")
			.query("         , c.mail_addr       , c.hdph_numb													")
		;
		data.param
			.where("from pjod_mast a																			")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join prjt_mast p on a.prjt_idcd = p.prjt_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.regi_date >= :regi1_date     " , arg.getParamText("regi1_date" ))
			.where("and     a.regi_date <= :regi2_date     " , arg.getParamText("regi2_date" ))
			.where("and     a.prjt_idcd  = :prjt_idcd      " , arg.getParamText("prjt_idcd"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos"  ))
			.where("and     a.deli_date >= :deli1_date     " , arg.getParamText("deli1_date" ))
			.where("and     a.deli_date <= :deli2_date     " , arg.getParamText("deli2_date" ))
			.where("and     a.pjod_idcd  = :pjod_idcd      " , arg.getParamText("pjod_idcd"  ))
			.where("and     a.drtr_idcd  = :drtr_idcd      " , arg.getParamText("drtr_idcd"  ))
			.where("and     a.line_stat  < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd desc																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.dsig_schd_dvcd   , a.id                , a.seqn			")
			.query("        , a.name             , a.progress         , a.progressbyworklog , a.relevance		")
			.query("        , a.type             , a.typeld           , a.description       , a.code			")
			.query("        , a.level            , a.status           , a.depends           , a.start			")
			.query("        , a.end              , a.startismilestone , a.endismilestone						")
			.query("        , a.collapsed        , a.canwrite         , a.canadd            , a.candelete		")
			.query("        , a.canaddlssue      , a.haschild         , a.starttime         , a.endtime			")
			.query("        , a.wkct_idcd        , a.ivst_pcnt        , a.need_mnhr								")
			.query("        , a.chge_coef        , a.duration-1 as duration										")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd         , a.crte_urif 		")
			.query("        , a.line_stat        , a.line_clos        , a.find_name         , a.updt_user_name	")
			.query("        , a.updt_ipad        , a.updt_dttm        , a.updt_idcd         , a.updt_urif		")
			.query("        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm         , a.crte_idcd		")
			.query("        , c.user_name as rsps_name															")
		;
		data.param //퀴리문
			.where("from		pjod_dsig_schd a   																")
			.where("            left outer join pjod_dsig_assigs b on a.id = b.id and b.roleid = 'tmp_1'		")
			.where("            left outer join user_mast c        on b.resourceid = c.user_idcd 				")
			.where("            ,( select a.id, count(b.resourceid) as  ivst_pcnt 								")
			.where("                     from pjod_dsig_schd a 													")
			.where("                     left outer join pjod_dsig_assigs b on a.id = b.id 						")
			.where("                     group by a.id 															")
			.where("            ) f 																			")
			.where("where		1=1																				")
			.where("and			a.id = f.id																		")
			.where("and			a.pjod_idcd	= :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.dsig_schd_dvcd = :dsig_schd_dvcd  " , "1000"									 )
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.seqn"																			 )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
			;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.chge_resn        , a.cpst_dvcd		")
			.query("        , a.regi_date        , a.item_idcd       , a.esti_amnt        , a.esti_amnt		")
			.query("        , a.cofm_yorn        , a.cofm_date       , a.cofm_amnt        , a.crny_dvcd		")
			.query("        , a.chge_deli_date   , a.frst_exam_date  , a.send_exam_date   , a.apvl_date		")
			.query("        , a.apvl_drtr_idcd																")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif												")
			.query("        , c.buss_name        , c.buss_numb       , c.buss_kind        , c.buss_type		")
			.query("        , c.corp_dvcd        , c.boss_name       , c.tele_numb        , c.faxi_numb		")
			.query("        , c.mail_addr        , c.hdph_numb       , c.cstm_code        , c.cstm_name		")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , i.modl_name		")
			.query("        , u.user_name as apvl_drtr_name													")
		;
		data.param
			.where("from pjod_dsig_chge a																	")
			.where("left outer join pjod_mast p on a.pjod_idcd      = p.pjod_idcd							")
			.where("left outer join cstm_mast c on p.cstm_idcd      = c.cstm_idcd							")
			.where("left outer join item_mast i on a.item_idcd      = i.item_idcd							")
			.where("left outer join user_mast u on a.apvl_drtr_idcd = u.user_idcd							")
			.where("where   1=1																				")
			.where("and     a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd       , a.work_schd_dvcd  , a.id                , a.seqn				")
			.query("        , a.name            , a.progress        , a.progressbyworklog , a.relevance			")
			.query("        , a.type            , a.typeld          , a.description       , a.code				")
			.query("        , a.level           , a.status          , a.depends           , a.start				")
			.query("        , a.duration        , a.end             , a.startismilestone  , a.endismilestone	")
			.query("        , a.collapsed       , a.canwrite        , a.canadd            , a.candelete			")
			.query("        , a.canaddlssue     , a.haschild        , a.starttime         , a.endtime			")
			.query("        , a.wkct_idcd																		")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd           , a.line_levl		")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos           , a.find_name		")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm           , a.updt_idcd		")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad           , a.crte_dttm		")
			.query("        , a.crte_idcd       , a.crte_urif       											")
			.query("        , c.user_name as rsps_name                , f.ivst_pcnt								")
			.query("        , ifnull((a.duration*f.ivst_pcnt),0) as need_mnhr									")
		;
		data.param
			.where("from pjod_work_schd a																		")
			.where("            left outer join pjod_work_assigs b on a.pjod_idcd = b.pjod_idcd					")
			.where("                                              and a.id = b.id and b.roleid = 'tmp_1'		")
			.where("                                              and a.work_schd_dvcd = b.work_schd_dvcd		")
			.where("            left outer join user_mast c        on b.resourceid = c.user_idcd 				")
			.where("            left outer join ( select a.pjod_idcd , a.work_schd_dvcd, a.id					")
			.where("                                   , IFNULL(count(b.resourceid),0) as  ivst_pcnt			")
			.where("                              from pjod_work_schd a 										")
			.where("                              left outer join pjod_work_assigs b on a.id = b.id 								")
			.where("                                                                 and a.pjod_idcd = b.pjod_idcd					")
			.where("                                                                 and a.work_schd_dvcd = b.work_schd_dvcd		")
			.where("                              group by a.pjod_idcd, a.work_schd_dvcd,a.id										")
			.where("            ) f on a.pjod_idcd = f.pjod_idcd and 	a.id = f.id and a.work_schd_dvcd = f.work_schd_dvcd			")
			.where("where    1=1																					")
			.where("and      a.work_schd_dvcd = '1000'																")
			.where("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.cnsl_dttm        , a.drtr_idcd		")
			.query("        , a.cstm_dept_name   , a.cstm_drtr_name  , a.cnsl_cont        , a.cost_yorn		")
			.query("        , a.dsig_yorn        , a.puch_yorn       , a.otod_yorn        , a.prod_yorn		")
			.query("        , a.rply_reqt_yorn   , a.rply_mthd_dvcd  , a.rply_drtr_idcd   , a.rply_dttm		")
			.query("        , a.rply_cont        , a.remk_text       , a.uper_seqn        , a.disp_seqn		")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif												")
			.query("        , u.user_name as drtr_name														")
		;
		data.param
			.where("from pjod_cnsl a																		")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd								")
			.where("where    1=1																			")
			.where("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail5(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.amnd_degr         , a.amnd_resn    , a.pjod_code	")
			.query("        , a.pjod_dvcd        , a.expt_dvcd         , a.prjt_idcd    , a.regi_date	")
			.query("        , a.pjod_name        , a.item_idcd         , a.esti_amnt    , a.crny_dvcd	")
			.query("        , a.frst_exam_date   , a.send_exam_date    , a.deli_date    , a.strt_date	")
			.query("        , a.endd_date        , a.drtr_idcd         , a.dlvy_date    , a.last_yorn	")
			.query("        , a.apvl_date        , a.apvl_drtr_idcd    , a.amnd_date					")
			.query("        , a.user_memo        , a.sysm_memo         , a.prnt_idcd    , a.line_levl	")
			.query("        , a.line_ordr        , a.line_stat         , a.line_clos    , a.find_name	")
			.query("        , a.updt_user_name   , a.updt_ipad         , a.updt_dttm    , a.updt_idcd	")
			.query("        , a.updt_urif        , a.crte_user_name    , a.crte_ipad    , a.crte_dttm	")
			.query("        , a.crte_idcd        , a.crte_urif											")
			.query("        , b.cstm_idcd        , c.cstm_code         , c.cstm_name					")
			.query("        , i.item_code        , i.item_name         , i.item_spec    , i.modl_name	")
			.query("        , p.prjt_name        , u.user_name as apvl_drtr_name						")
			.query("        , c.buss_name        , c.buss_numb         , c.buss_kind    , c.buss_type	")
			.query("        , c.corp_dvcd        , c.boss_name         , c.tele_numb    , c.faxi_numb	")
			.query("        , c.mail_addr        , c.hdph_numb         , @curRank:=@curRank+1 as rank	")
		;
		data.param
			.where("from pjod_amnd a																	")
			.where("left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd							")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd							")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("left outer join prjt_mast p on a.prjt_idcd = p.prjt_idcd							")
			.where("left outer join user_mast u on a.apvl_drtr_idcd = u.user_idcd						")
			.where(",(select @curRank:=0) r																")
			.where("where   1=1																			")
			.where("and     a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by rank																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail6(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn        , a.regi_date   , a.wkct_idcd			")
			.query("        , a.cvic_idcd        , a.prod_qntt        , a.poor_qntt   , a.pass_qntt			")
			.query("        , a.loss_rate        , a.drtr_idcd        , a.sttm        , a.edtm				")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd   , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos   , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm   , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad   , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif												")
			.query("        , c.cvic_name        , w.wkct_name         , u.user_name as drtr_name			")
			.query("        , substring(a.sttm,1,8) as sttm1           , substring(a.sttm, 9,4) as sttm2	")
			.query("        , substring(a.edtm,1,8) as edtm1           , substring(a.edtm, 9,4) as edtm2	")
		;
		data.param
			.where("from pjod_test_prod a																	")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd								")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd								")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd								")
			.where("where  1=1																				")
			.where("and    a.pjod_idcd	=:pjod_idcd		" , arg.getParamText("pjod_idcd"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail7(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.poor_seqn  , a.prod_qntt	")
			.query("        , a.poor_bacd        , a.poor_cont       , a.trtm_date  , a.trtm_cont	")
			.query("        , a.poor_qntt        , a.drtr_idcd 										")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd  , a.line_levl	")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos  , a.find_name	")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm  , a.updt_idcd	")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad  , a.crte_dttm	")
			.query("        , a.crte_idcd        , a.crte_urif										")
			.query("        , u.user_name as drtr_name               , b.base_name as poor_name		")
		;
		data.param
			.where("from pjod_test_insp a															")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd						")
			.where("left outer join base_mast b on a.poor_bacd = b.base_idcd						")
			.where("where  1=1																		")
			.where("and    a.pjod_idcd	=:pjod_idcd		" , arg.getParamText("pjod_idcd"))
			.where("and    a.line_seqn	=:line_seqn		" , arg.getParamText("line_seqn"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail8(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.colt_dvcd   , a.colt_degr	")
			.query("        , a.plan_date        , a.plan_amnt       , a.colt_date   , a.colt_amnt	")
			.query("        , a.drtr_idcd															")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd   , a.line_levl	")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos   , a.find_name	")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm   , a.updt_idcd	")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad   , a.crte_dttm	")
			.query("        , a.crte_idcd        , a.crte_urif       , u.user_name as drtr_name		")
		;
		data.param
			.where("from    pjod_colt a																")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd						")
			.where("where   1=1																		")
			.where("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"))
			.where("and    a.line_seqn	=:line_seqn		" , arg.getParamText("line_seqn"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.colt_degr															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setColt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			String colt_date_test = row.getParamText("colt_date");
			String colt_date;

			//수금일자(colt_date)의 형식 확인
			if(colt_date_test.indexOf(":") != -1){
				SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd");
				String colt_date1 = row.getParamText("colt_date");
				colt_date = dt.format(new Date(colt_date1));
			}else{
				colt_date = row.getParamText("colt_date");
			}

			data.param
				.table("pjod_colt"													)
				.where("where pjod_idcd     = :pjod_idcd							")  /*  금형수주ID  */
				.where("and   line_seqn     = :line_seqn							")  /*  금형수주순번  */
				//
				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				//

				.update("colt_date"			, colt_date								)   /*  수금일자  */
				.update("colt_amnt"			, row.getParameter("colt_amnt"			))  /*  수금금액  */
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))  /*  담당자    */

				.insert("plan_amnt"			, row.getParameter("plan_amnt"			))  /*  예정금액    */
				.insert("plan_date"			, row.getParameter("plan_date"			))  /*  예정일자    */
				.insert("colt_dvcd"			, row.getParameter("colt_dvcd"			))  /*  결제구분    */
				.insert("colt_degr"			, row.getParameter("colt_degr"			))  /*  차수        */

				.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
				.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
				.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
				.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
				.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
				.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
			;data.attach(rowaction);

		}
		data.execute();
		return null ;
	}

	//수주내역 마감/해지/보류
	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("pjod_mast								")
				.where("where pjod_idcd		= :pjod_idcd		")

				.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"))

				.update("line_clos"			, arg.getParameter("line_clos"))	//승인여부
			;
			data.attach(Action.update);
	data.execute();
	return null ;
	}

	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
//		DataMessage data = new DataMessage("NETHOSTING");  //ctrl DB접속할때 쓰임
		DataMessage data = arg.newStorage("POS");

		byte[] returnByte =null;
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.
		String regExp = "^([\\S]+(\\.(?i)(jpg||png||gif||bmp))$)";

		String imageYn;
		// 파일이 이미지일 경우

			if(file[0].getFileItem().getName().matches(regExp)){
				imageYn = "Y";
			}else{
				imageYn = "N";
			}
			System.out.println(imageYn);
			ByteArrayInputStream thumnailInputStream = null;
			// 이미지일 경우 섬네일 과정을 거친다.
			if("Y".equals(imageYn)) {
				// 섬네일에 강제 사이즈 지정 후 스트림 과정

				Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
				thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
			}
			int readCount = 0;
			try{
				// 업로드 진행
				// 이미지일 경우
				if("Y".equals(imageYn)){
					byte[] buf = new byte[1024];
					while ((readCount = thumnailInputStream.read(buf))>0) {
						 baos.write(buf,0,readCount);
					}
					returnByte = baos.toByteArray();
					data.param
						.table("pjod_mast")
						.where("where pjod_idcd	= :pjod_idcd" )

						.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))

						.update("item_imge",returnByte)
					;data.attach(Action.modify);
				} else {

				}

				// logic 처리 ( DB등 )

			} catch(Exception ex) {
				throw ex;
			} finally {
				if(baos != null) baos.close();
				if(thumnailInputStream!=null) thumnailInputStream.close();
			}
		data.execute();
		return map;
	}
}
