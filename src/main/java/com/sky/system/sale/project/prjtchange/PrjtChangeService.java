package com.sky.system.sale.project.prjtchange;

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


@Service
public class PrjtChangeService extends DefaultServiceHandler {

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.amnd_degr         , a.pjod_code       , a.pjod_dvcd		")
			.query("         , a.expt_dvcd       , a.cstm_idcd         , a.prjt_idcd       , a.regi_date		")
			.query("         , a.item_idcd       , a.esti_amnt         , a.cofm_yorn       , a.cofm_date		")
			.query("         , a.cofm_amnt       , a.crny_dvcd         , a.frst_exam_date  , a.send_exam_date	")
			.query("         , a.deli_date       , a.ppsl_deli_date    , a.strt_date       , a.endd_date		")
			.query("         , a.drtr_idcd       , a.dlvy_date         , a.last_yorn       , a.apvl_date		")
			.query("         , a.apvl_drtr_idcd  , a.cstm_item_code    , a.mold_size       , a.cavity			")
			.query("         , a.mold_wigt       , a.used_mtrl_name    , a.prod_wigt       , a.used_tons		")
			.query("         , a.pjod_name       , a.shkg_text         , a.cstm_item_code						")
			.query("         , a.item_name       , a.modl_name													")
			.query("         , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("         , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.query("         , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("         , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("         , a.crte_idcd       , a.crte_urif													")
			.query("         , c.cstm_code       , c.cstm_name         , u.user_name as drtr_name				")
			.query("         , i.item_code       , i.item_spec													")
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
			.where("and     a.find_name like %:find_name%            " , arg.getParamText("find_name"           ))
			.where("and     a.regi_date >= :regi_date1               " , arg.getParamText("regi_date1"          ))
			.where("and     a.regi_date <= :regi_date2               " , arg.getParamText("regi_date2"          ))
			.where("and     a.cofm_date >= :cofm_date1               " , arg.getParamText("cofm_date1"          ))
			.where("and     a.cofm_date <= :cofm_date2               " , arg.getParamText("cofm_date2"          ))
			.where("and     a.prjt_idcd  = :prjt_idcd                " , arg.getParamText("prjt_idcd"           ))
			.where("and     a.cstm_idcd  = :cstm_idcd                " , arg.getParamText("cstm_idcd"           ))
			.where("and     a.line_clos  = :line_clos                " , arg.getParamText("line_clos"           ))
			.where("and     a.deli_date >= :deli_date1               " , arg.getParamText("deli_date1"          ))
			.where("and     a.deli_date <= :deli_date2               " , arg.getParamText("deli_date2"          ))
			.where("and     a.pjod_idcd  = :pjod_idcd                " , arg.getParamText("pjod_idcd"           ))
			.where("and     a.drtr_idcd  = :drtr_idcd                " , arg.getParamText("drtr_idcd"           ))
			.where("and     a.expt_dvcd  = :expt_dvcd                " , arg.getParamText("expt_dvcd"           ))
			.where("and     a.cstm_item_code like %:cstm_item_code%  " , arg.getParamText("cstm_item_code"      ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat"     )))
			.where("order by  a.pjod_idcd desc, a.regi_date desc												")
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
			.query("select    a.pjod_idcd           , a.amnd_degr         , a.amnd_resn         , a.pjod_code		")
			.query("        , a.pjod_dvcd           , a.expt_dvcd         , a.prjt_idcd         , a.regi_date		")
			.query("        , a.pjod_name           , a.item_idcd         , a.esti_amnt         , a.crny_dvcd		")
			.query("        , a.frst_exam_date      , a.send_exam_date    , a.deli_date         , a.strt_date		")
			.query("        , a.endd_date           , a.drtr_idcd         , a.dlvy_date         , a.last_yorn		")
			.query("        , a.apvl_date           , a.apvl_drtr_idcd												")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
			.query("        , b.cstm_idcd           , c.cstm_code         , c.cstm_name								")
			.query("        , i.item_code           , i.item_name         , i.item_spec         , i.modl_name		")
			.query("        , p.prjt_name           , u.user_name as apvl_drtr_name									")
			.query("         , c.buss_name          , c.buss_numb         , c.buss_kind         , c.buss_type		")
			.query("         , c.corp_dvcd          , c.boss_name         , c.tele_numb         , c.faxi_numb		")
			.query("         , c.mail_addr          , c.hdph_numb         , @curRank:=@curRank+1 as rank			")
		;
		data.param
			.where("from pjod_amnd a																				")
			.where("left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd										")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join prjt_mast p on a.prjt_idcd = p.prjt_idcd										")
			.where("left outer join user_mast u on a.apvl_drtr_idcd = u.user_idcd									")
			.where(",(select @curRank:=0) r																			")
			.where("where   1=1																						")
			.where("and     a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by rank																					")
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
			.query("select    a.pjod_idcd        , a.dsig_schd_dvcd   , a.id                   , a.seqn				")
			.query("        , a.name             , a.progress         , a.progressbyworklog    , a.relevance		")
			.query("        , a.type             , a.typeld           , a.description          , a.code				")
			.query("        , a.level            , a.status           , a.depends              , a.start			")
			.query("        , a.duration         , a.end              , a.startismilestone     , a.endismilestone	")
			.query("        , a.collapsed        , a.canwrite         , a.canadd               , a.candelete		")
			.query("        , a.canaddlssue      , a.haschild         , a.starttime            , a.endtime			")
			.query("        , a.wkct_idcd        , a.rsps_name        , a.ivst_pcnt            , a.need_mnhr		")
			.query("        , a.chge_coef																			")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd            , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos            , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm            , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad            , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif														")
		;
		data.param
			.where("from pjod_dsig_schd a																			")
			.where("where   1=1																						")
			.where("and     dsig_schd_dvcd = '1000'																	")
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
			.query("select    a. pjod_idcd       , a.work_schd_dvcd    , a.id                  , a.seqn					")
			.query("        , a.name             , a.progress          , a.progressbyworklog   , a.relevance			")
			.query("        , a.type             , a.typeld            , a.description         , a.code					")
			.query("        , a.level            , a.status            , a.depends             , a.start				")
			.query("        , a.duration         , a.end               , a.startismilestone    , a.endismilestone		")
			.query("        , a.collapsed        , a.canwrite          , a.canadd              , a.candelete			")
			.query("        , a.canaddlssue      , a.haschild          , a.starttime           , a.endtime				")
			.query("        , a.wkct_idcd																				")
			.query("        , a.user_memo        , a.sysm_memo         , a.prnt_idcd           , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat         , a.line_clos           , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad         , a.updt_dttm           , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name    , a.crte_ipad           , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif															")
			.query("        , w.wkct_code        , w.wkct_name         , u.user_name as rsps_name						")
			.query("        ,(select count(pjod_idcd) from pjod_work_assigs												")
			.query("                                  where a.pjod_idcd = pjod_idcd and work_schd_dvcd = '1000'			")
			.query("                                  and a.id = id) as ivst_pcnt										")
			.query("        ,a.duration * (select count(pjod_idcd) from pjod_work_assigs								")
			.query("                       where a.pjod_idcd = pjod_idcd and work_schd_dvcd = '1000'					")
			.query("                       and a.id = id) as need_mnhr													")
		;
		data.param
			.where("from pjod_work_schd a																				")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd											")
			.where("left outer join pjod_work_assigs p on a.pjod_idcd = p.pjod_idcd and p.work_schd_dvcd = '1000'		")
			.where("                                      and a.id = p.id and p.roleid = 'tmp_1'						")
			.where("left outer join user_mast u on p.resourceid = u.user_idcd											")
			.where("where   1=1																							")
			.where("and     a.work_schd_dvcd = '1000'																	")
			.where("and     a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																				")
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
			.query("select    a.pjod_idcd        , a.line_seqn       , a.cnsl_dttm        , a.drtr_idcd			")
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
			.where("from pjod_cnsl a																			")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where   1=1																					")
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

	public SqlResultMap getDetail5(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
			;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.chge_resn        , a.cpst_dvcd			")
			.query("        , a.regi_date        , a.item_idcd       , a.esti_amnt        , a.esti_amnt			")
			.query("        , a.cofm_yorn        , a.cofm_date       , a.cofm_amnt        , a.crny_dvcd			")
			.query("        , a.chge_deli_date   , a.frst_exam_date  , a.send_exam_date   , a.apvl_date			")
			.query("        , a.apvl_drtr_idcd   , a.item_imge       , a.stat_date								")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , c.buss_name        , c.buss_numb       , c.buss_kind        , c.buss_type			")
			.query("        , c.corp_dvcd        , c.boss_name       , c.tele_numb        , c.faxi_numb			")
			.query("        , c.mail_addr        , c.hdph_numb       , c.cstm_code        , c.cstm_name			")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , i.modl_name			")
			.query("        , u.user_name as apvl_drtr_name														")
		;
		data.param
			.where("from pjod_dsig_chge a																		")
			.where("left outer join pjod_mast p on a.pjod_idcd      = p.pjod_idcd								")
			.where("left outer join cstm_mast c on p.cstm_idcd      = c.cstm_idcd								")
			.where("left outer join item_mast i on a.item_idcd      = i.item_idcd								")
			.where("left outer join user_mast u on a.apvl_drtr_idcd = u.user_idcd								")
			.where("where   1=1																					")
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

	public SqlResultMap getInvoice(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.chge_resn        , a.cpst_dvcd			")
			.query("        , a.regi_date        , a.item_idcd       , a.esti_amnt        , a.esti_amnt			")
			.query("        , a.cofm_yorn        , a.cofm_date       , a.cofm_amnt        , a.crny_dvcd			")
			.query("        , a.chge_deli_date   , a.frst_exam_date  , a.send_exam_date   , a.apvl_date			")
			.query("        , a.apvl_drtr_idcd   , a.item_imge       , a.stat_date								")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , c.buss_name        , c.buss_numb       , c.buss_kind        , c.buss_type			")
			.query("        , c.corp_dvcd        , c.boss_name       , c.tele_numb        , c.faxi_numb			")
			.query("        , c.mail_addr        , c.hdph_numb       , c.cstm_code        , c.cstm_name			")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , i.modl_name			")
			.query("        , u.user_name as apvl_drtr_name														")
			.query("from pjod_dsig_chge a																		")
			.query("left outer join pjod_mast p on a.pjod_idcd      = p.pjod_idcd								")
			.query("left outer join cstm_mast c on p.cstm_idcd      = c.cstm_idcd								")
			.query("left outer join item_mast i on a.item_idcd      = i.item_idcd								")
			.query("left outer join user_mast u on a.apvl_drtr_idcd = u.user_idcd								")
			.query("where   1=1																					")
			.query("and     a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.query("and     a.line_seqn   = :line_seqn    " , arg.getParamText("line_seqn"  ))
			.query("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.pjod_idcd																		")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			System.out.println("info");
			data.clear();
			data.param
				.query("select    a.pjod_idcd        , a.line_seqn       , a.colt_dvcd        , a.colt_degr			")
				.query("        , a.plan_date        , a.plan_amnt       , a.colt_date        , a.colt_amnt			")
				.query("        , a.drtr_idcd																		")
				.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
				.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
				.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
				.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
				.query("        , a.crte_idcd        , a.crte_urif													")
				.query("from pjod_colt a																			")
				.query("where   1=1																					")
				.query("and     a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"))
				.query("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
				.query("order by a.pjod_idcd																		")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as line_seqn																")
		;
		data.param
			.where("from		pjod_dsig_chge a   																")
			.where("where		1=1																				")
			.where("and			a.pjod_idcd = :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				data.param
				.table("pjod_dsig_chge")
				.where("where pjod_idcd  = :pjod_idcd")
				.where("and   line_seqn  = :line_seqn")

				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"		))
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))
			;data.attach(Action.delete);

			} else {
				data.param
				.table("pjod_dsig_chge")
				.where("where pjod_idcd  = :pjod_idcd")
				.where("and   line_seqn  = :line_seqn")

				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("chge_resn"			, row.getParameter("chge_resn"))
				.update("cpst_dvcd"			, row.getParameter("cpst_dvcd"))
				.update("regi_date"			, row.getParameter("regi_date"))
				.update("item_idcd"			, row.getParameter("item_idcd"))
				.update("item_name"			, row.getParameter("item_name"))
				.update("item_spec"			, row.getParameter("item_spec"))
				.update("modl_name"			, row.getParameter("modl_name"))
				.update("esti_amnt"			, row.getParameter("esti_amnt"))
				.update("cofm_yorn"			, "0"							)
				.update("cofm_date"			, row.getParameter("cofm_date"))
				.update("cofm_amnt"			, row.getParameter("cofm_amnt"))
				.update("crny_dvcd"			, row.getParameter("crny_dvcd"))
				.update("chge_deli_date"	, row.getParameter("chge_deli_date"))
				.update("frst_exam_date"	, row.getParameter("frst_exam_date"))
				.update("send_exam_date"	, row.getParameter("send_exam_date"))
				.update("apvl_date"			, row.getParameter("apvl_date"))
				.update("apvl_drtr_idcd"	, row.getParameter("apvl_drtr_idcd"))
				.update("stat_date"			, row.getParameter("stat_date"))

				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.action = rowaction;
				data.attach();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
		}
	data.execute();
	return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if(rowaction == Action.delete){
				data.param
					.table("pjod_colt")
					.where("where pjod_idcd = :pjod_idcd")
					.where("and   line_seqn = :line_seqn")

					.unique("pjod_idcd"				, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))
				;data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				data.param
				.table("pjod_colt")
					.where("where pjod_idcd = :pjod_idcd")
					.where("and   line_seqn = :line_seqn")

					.unique("pjod_idcd"				, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))
				;data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("pjod_colt")
					.where("where pjod_idcd	= :pjod_idcd" )
					.where("where line_seqn	= :line_seqn" )

					.unique("pjod_idcd"				, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("colt_dvcd"				, row.getParameter("colt_dvcd"))
					.update("colt_degr"				, row.getParameter("colt_degr"))
					.update("plan_date"				, row.getParameter("plan_date"))
					.update("plan_amnt"				, row.getParameter("plan_amnt"))
					.update("colt_date"				, row.getParameter("colt_date"))
					.update("colt_amnt"				, row.getParameter("colt_amnt"))
					.update("drtr_idcd"				, row.getParameter("drtr_idcd"))
					.update("user_memo"				, row.getParameter("user_memo"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.insert);
			}
		}
	}
	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");

		byte[] returnByte =null;
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.


		ByteArrayInputStream thumnailInputStream = null;
		// 이미지일 경우 섬네일 과정을 거친다.
		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
	        Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
	        thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}
		int readCount = 0;
		try{
			if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
				data.param
				.table("pjod_dsig_chge")
				.where("where pjod_idcd	= :pjod_idcd" )
				.where("and   line_seqn	= :line_seqn" )

				.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))
				.unique("line_seqn"				, arg.fixParameter("line_seqn"))

				.update("item_imge", '0')
			;data.attach(Action.modify);
			}else{
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();
				data.param
					.table("pjod_dsig_chge")
					.where("where pjod_idcd	= :pjod_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, arg.fixParameter("line_seqn"))

					.update("item_imge",returnByte)
				;data.attach(Action.modify);
			// logic 처리 ( DB등 )
			}

	   	} catch(Exception ex) {
			throw ex;
		} finally {
			if(baos != null) baos.close();
			if(thumnailInputStream!=null) thumnailInputStream.close();
		}
		data.execute();
		return map;
	}

	public SqlResultMap getWork(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select max(line_seqn) as max														")
		;
		data.param
			.where("from		pjod_work_plan a   												")
			.where("where		1=1																")
			.where("and			a.pjod_idcd = :pjod_idcd		" , arg.getParameter("pjod_idcd"))
		;
		return data.selectForMap();
	}

	/**
	작업지시저장 *
	 */
		public SqlResultMap setWork(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");
			for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			String sttm = (String) row.getParameter("sttm1")+row.getParameter("sttm2");
			String edtm = (String) row.getParameter("edtm1")+row.getParameter("edtm2");

			data.param
				.table("pjod_work_plan"                       )
				.where("where pjod_idcd		= :pjod_idcd     ")  /*  INVOICE번호  */
				.where("and work_schd_dvcd	= :work_schd_dvcd")  /*  작업일정구분코드 */
				.where("and idcd			= :idcd          ")  /*  id  */
				.where("and line_seqn		= :line_seqn     ")  /*  순번  */
				//
				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))
				.unique("work_schd_dvcd"	, "4000")
				.unique("idcd"				, "0")
				//
				.update("invc_date"			, row.getParameter("invc_date"))  /*  지시일자  */
				.update("sttm"				, sttm)							  /*  시작시간  */
				.update("edtm"				, edtm)							  /*  종료시간		*/
				.update("indn_qntt"			, "1")							  /*  지시수량		*/
				.update("work_ordr_dvcd"	, "1200")						  /*  작업오더구분	*/
				.update("ivst_pcnt"			, "1")							  /*  투입인원 		*/
				.update("prog_stat_dvcd"	, "0")							  /*  진행상태구분코드	*/
				.update("otod_yorn"			, row.getParameter("otod_yorn"))  /*  외주여부		*/
				.update("cvic_idcd"			, row.getParameter("cvic_idcd"))  /*  설비ID		*/
				.update("item_name"			, row.getParameter("item_name"))  /*  품목명		*/
				.update("item_spec"			, row.getParameter("item_spec"))  /*  품목규격		*/
				.update("modl_name"			, row.getParameter("modl_name"))  /*  모델명		*/
				.update("wkct_idcd"			, row.getParameter("wkct_idcd"))  /*  공정ID		*/
				.update("rsps_idcd"			, row.getParameter("rsps_idcd"))  /*  작업자		*/
				.update("work_cont"			, row.getParameter("work_cont"))  /*  작업내용		*/
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
				.table("pjod_dsig_chge"						)
				.where("where pjod_idcd = :pjod_idcd"		)		//invoice번호
				.where("and   line_seqn = :line_seqn"		)		//순번

				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))
				.unique("line_seqn"			, row.fixParameter("line_seqn"	))

				.update("sysm_memo"			, "1")
			;data.attach(Action.update);
			data.execute();
			data.clear();
		}
		data.execute();
		return null ;
	}

	//설계변경내역 승인/승인취소
	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("pjod_dsig_chge							")
				.where("where pjod_idcd		= :pjod_idcd		")
				.where("and   line_seqn		= :line_seqn		")

				.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))

				.update("cofm_yorn"			, arg.getParameter("cofm_yorn"))	//승인여부
			;
			data.attach(Action.update);
	data.execute();
	return null ;
	}
}
