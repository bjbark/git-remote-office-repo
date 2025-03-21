package com.sky.system.sale.project.prjtlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class PrjtListService extends DefaultServiceHandler {

	public SqlResultMap getMaster(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
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
			.query("         , a.pjod_name       , a.item_imge         , a.item_imge2							")
			.query("         , a.shkg_text       , a.mold_mtrl         , a.work_rsps_idcd						")
			.query("         , a.dsig_rsps_idcd  , a.modl_rsps_idcd    , a.rela_pjod_idcd						")
			.query("         , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("         , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.query("         , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("         , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("         , a.crte_idcd       , a.crte_urif													")
			.query("         , c.cstm_code       , c.cstm_name         , u1.user_name as drtr_name				")
			.query("         , u2.user_name as work_rsps_name          , u3.user_name as dsig_rsps_name			")
			.query("         , u4.user_name as modl_rsps_name													")
			.query("         , i.item_code       , i.item_spec         , a.item_name       , a.modl_name		")
			.query("         , p.prjt_code       , p.prjt_name													")
			.query("         , c.buss_name       , c.buss_numb         , c.buss_kind       , c.buss_type		")
			.query("         , c.corp_dvcd       , c.boss_name         , c.tele_numb       , c.faxi_numb		")
			.query("         , c.mail_addr       , c.hdph_numb													")
		;
		data.param
			.where("from pjod_mast a																			")
			.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u1 on a.drtr_idcd = u1.user_idcd									")
			.where("left outer join user_mast u2 on a.work_rsps_idcd = u2.user_idcd								")
			.where("left outer join user_mast u3 on a.dsig_rsps_idcd = u3.user_idcd								")
			.where("left outer join user_mast u4 on a.modl_rsps_idcd = u4.user_idcd								")
			.where("left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.where("left outer join prjt_mast p  on a.prjt_idcd = p.prjt_idcd									")
			.where("where   1=1																					")
			.where("and     a.cofm_yorn = '1'																	")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.regi_date >= :regi_date1     " , arg.getParamText("regi_date1" ))
			.where("and     a.regi_date <= :regi_date2     " , arg.getParamText("regi_date2" ))
			.where("and     a.prjt_idcd  = :prjt_idcd      " , arg.getParamText("prjt_idcd"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos"  ))
			.where("and     a.deli_date >= :deli_date1     " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2     " , arg.getParamText("deli_date2" ))
			.where("and     a.pjod_idcd  = :pjod_idcd      " , arg.getParamText("pjod_idcd"  ))
			.where("and     a.drtr_idcd  = :drtr_idcd      " , arg.getParamText("drtr_idcd"  ))
			.where("and     a.expt_dvcd  = :expt_dvcd      " , arg.getParamText("expt_dvcd"  ))
			.where("and     a.line_stat  < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by   a.regi_date desc	, a.pjod_idcd desc												")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
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
			.query("        , a.apvl_date           , a.apvl_drtr_idcd    , a.amnd_date								")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
			.query("        , b.cstm_idcd           , c.cstm_code         , c.cstm_name								")
			.query("        , i.item_code           , i.item_name         , i.item_spec         , i.modl_name		")
			.query("        , p.prjt_name           , u.user_name as apvl_drtr_name									")
			.query("        , c.buss_name           , c.buss_numb         , c.buss_kind         , c.buss_type		")
			.query("        , c.corp_dvcd           , c.boss_name         , c.tele_numb         , c.faxi_numb		")
			.query("        , c.mail_addr           , c.hdph_numb         , @curRank:=@curRank+1 as rank			")
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
			.where("where    1=1																					")
			.where("and      dsig_schd_dvcd = '1000'																")
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
			.where("where    1=1																						")
			.where("and      a.work_schd_dvcd = '1000'																	")
			.where("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
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
			.where("where    1=1																				")
			.where("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
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
			.query("select     a.pjod_idcd       , a.amnd_degr         , a.pjod_code       , a.pjod_dvcd		")
			.query("         , a.expt_dvcd       , a.cstm_idcd         , a.prjt_idcd       , a.regi_date		")
			.query("         , a.item_idcd       , a.esti_amnt         , a.cofm_yorn       , a.cofm_date		")
			.query("         , a.cofm_amnt       , a.crny_dvcd         , a.frst_exam_date  , a.send_exam_date	")
			.query("         , a.deli_date       , a.ppsl_deli_date    , a.strt_date       , a.endd_date		")
			.query("         , a.drtr_idcd       , a.dlvy_date         , a.last_yorn       , a.apvl_date		")
			.query("         , a.apvl_drtr_idcd  , a.cstm_item_code    , a.mold_size       , a.cavity			")
			.query("         , a.mold_wigt       , a.used_mtrl_name    , a.prod_wigt       , a.used_tons		")
			.query("         , a.pjod_name       , a.item_imge         , a.item_imge2      , a.cstm_item_code	")
			.query("         , a.shkg_text       , a.mold_mtrl         , a.work_rsps_idcd						")
			.query("         , a.dsig_rsps_idcd  , a.modl_rsps_idcd    , a.rela_pjod_idcd						")
			.query("         , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("         , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.query("         , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("         , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("         , a.crte_idcd       , a.crte_urif													")
			.query("         , c.cstm_code       , c.cstm_name         , u1.user_name as drtr_name				")
			.query("         , u2.user_name as work_rsps_name          , u3.user_name as dsig_rsps_name			")
			.query("         , u4.user_name as modl_rsps_name													")
			.query("         , i.item_code       , i.item_spec         , a.item_name       , a.modl_name		")
			.query("         , p.prjt_code       , p.prjt_name													")
			.query("         , c.buss_name       , c.buss_numb         , c.buss_kind       , c.buss_type		")
			.query("         , c.corp_dvcd       , c.boss_name         , c.tele_numb       , c.faxi_numb		")
			.query("         , c.mail_addr       , c.hdph_numb													")
			.query("from pjod_mast a																			")
			.query("left outer join cstm_mast c  on a.cstm_idcd       = c.cstm_idcd								")
			.query("left outer join user_mast u1 on a.drtr_idcd       = u1.user_idcd							")
			.query("left outer join user_mast u2 on a.work_rsps_idcd  = u2.user_idcd							")
			.query("left outer join user_mast u3 on a.dsig_rsps_idcd  = u3.user_idcd							")
			.query("left outer join user_mast u4 on a.modl_rsps_idcd  = u4.user_idcd							")
			.query("left outer join item_mast i  on a.item_idcd       = i.item_idcd								")
			.query("left outer join prjt_mast p  on a.prjt_idcd       = p.prjt_idcd								")
			.query("where    1=1																				")
			.query("and      a.pjod_idcd = :pjod_idcd        " , arg.getParameter("pjod_idcd"					))
			.query("and      a.line_stat < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.pjod_idcd																		")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
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
				.query("where    1=1																				")
				.query("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"))
				.query("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
				.query("order by a.pjod_idcd																		")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

}
