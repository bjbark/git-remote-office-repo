package com.sky.system.design.dsigwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class DsigWorkService extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	// search
	public SqlResultMap getSearch1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
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
			.query("        , a.chge_coef        , a.duration													")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd         , a.crte_urif 		")
			.query("        , a.line_stat        , a.line_clos        , a.find_name         , a.updt_user_name	")
			.query("        , a.updt_ipad        , a.updt_dttm        , a.updt_idcd         , a.updt_urif		")
			.query("        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm         , a.crte_idcd		")
			.query("        , c.user_name as rsps_name                , f.ivst_pcnt								")
			.query("        , ifnull((a.duration*f.ivst_pcnt),0) as need_mnhr									")
		;
		data.param //퀴리문
			.where("from		pjod_dsig_schd a   																")
			.where("            left outer join pjod_dsig_assigs b on a.pjod_idcd = b.pjod_idcd					")
			.where("                                              and a.id = b.id and b.roleid = 'tmp_1'		")
			.where("                                              and a.dsig_schd_dvcd = b.dsig_schd_dvcd		")
			.where("            left outer join user_mast c        on b.resourceid = c.user_idcd 				")
			.where("            left outer join ( select a.pjod_idcd , a.dsig_schd_dvcd, a.id					")
			.where("                                                 , IFNULL(count(b.resourceid),0) as  ivst_pcnt					")
			.where("                              from pjod_dsig_schd a 															")
			.where("                              left outer join pjod_dsig_assigs b on a.id = b.id 								")
			.where("                                                                 and a.pjod_idcd = b.pjod_idcd					")
			.where("                                                                 and a.dsig_schd_dvcd = b.dsig_schd_dvcd		")
			.where("                              group by a.pjod_idcd, a.dsig_schd_dvcd,a.id										")
			.where("            ) f on a.pjod_idcd = f.pjod_idcd and 	a.id = f.id and a.dsig_schd_dvcd = f.dsig_schd_dvcd			")
			.where("where		1=1																				")
			.where("and			a.pjod_idcd	= :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.dsig_schd_dvcd = :dsig_schd_dvcd  " , "2000"									 )
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.seqn"																			 )
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// search

	public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
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
			.query("        , c.user_name as rsps_name                , f.ivst_pcnt								")
		;
		data.param //퀴리문
			.where("from		pjod_dsig_schd a   																")
			.where("            left outer join pjod_dsig_assigs b on a.id = b.id and b.roleid = 'tmp_1'		")
			.where("            left outer join user_mast c        on b.resourceid = c.user_idcd 				")
			.where("            left outer join ( select a.pjod_idcd , a.dsig_schd_dvcd, a.id					")
			.where("                                                 , IFNULL(count(b.resourceid),0) as  ivst_pcnt					")
			.where("                              from pjod_dsig_schd a 															")
			.where("                              left outer join pjod_dsig_assigs b on a.id = b.id 								")
			.where("                                                                 and a.pjod_idcd = b.pjod_idcd					")
			.where("                                                                 and a.dsig_schd_dvcd = b.dsig_schd_dvcd		")
			.where("                              group by a.pjod_idcd, a.dsig_schd_dvcd,a.id										")
			.where("            ) f on a.pjod_idcd = f.pjod_idcd and 	a.id = f.id and a.dsig_schd_dvcd = f.dsig_schd_dvcd			")
			.where("where		1=1																				")
			.where("and			a.pjod_idcd	= :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.dsig_schd_dvcd = :dsig_schd_dvcd  " , "1000"									 )
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.seqn"																			 )
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// mastersearch2
		public SqlResultMap getMasterSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.pjod_idcd        , a.invc_date        , a.wker_idcd         , a.line_seqn		")
				.query("        , a.idcd             , a.name             , a.progress          , a.item_idcd		")
				.query("        , a.work_cont        , a.work_sttm        , a.work_edtm         , a.plan_rate		")
				.query("        , a.achi_rate        , a.need_time        , a.work_pcnt         , a.work_mnhr		")
				.query("        , a.work_cond_1fst   , a.work_cond_2snd   , a.work_cond_3trd    , a.work_cond_5fit	")
				.query("        , a.work_cond_6six   , a.work_cond_7svn   , a.remk_text         , u.user_name		")
				.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd         , a.crte_urif 		")
				.query("        , a.line_stat        , a.line_clos        , a.find_name         , a.updt_user_name	")
				.query("        , a.updt_ipad        , a.updt_dttm        , a.updt_idcd         , a.updt_urif		")
				.query("        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm         , a.crte_idcd		")
			;
			data.param //퀴리문
				.where("from		pjod_dsig_book a   																")
				.where("            left outer join user_mast u on a.wker_idcd = u.user_idcd						")
				.where("where		1=1																				")
				.where("and			a.invc_date >= :invc_date1		" , arg.getParameter("invc_date1"				))
				.where("and			a.invc_date <= :invc_date2		" , arg.getParameter("invc_date2"				))
				.where("and			a.pjod_idcd = :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
				.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
				.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("order by	a.pjod_idcd, a.line_seqn"														)
			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}

	public SqlResultMap getReport(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as line_seqn																")
		;
		data.param
			.where("from		pjod_dsig_book a   																")
			.where("where		1=1																				")
			.where("and			a.pjod_idcd = :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
		;
		return data.selectForMap();
	}

	public SqlResultMap setReport(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			data.param
			.table("pjod_dsig_book					")
			.where("where pjod_idcd = :pjod_idcd	")
			.where("and   invc_date = :invc_date	")
			.where("and   wker_idcd = :wker_idcd	")
			.where("and   line_seqn = :line_seqn	")

			.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
			.unique("invc_date"			, row.fixParameter("invc_date"))
			.unique("wker_idcd"			, row.fixParameter("wker_idcd"))
			.unique("line_seqn"			, row.fixParameter("line_seqn"))
			.unique("idcd"				, row.fixParameter("id"))

			.update("work_cont"			, row.getParameter("work_cont"))
			.update("work_sttm"			, row.getParameter("work_sttm"))
			.update("work_edtm"			, row.getParameter("work_edtm"))
			.update("plan_rate"			, row.getParameter("plan_rate"))
			.update("achi_rate"			, row.getParameter("achi_rate"))
			.update("need_time"			, row.getParameter("need_time"))
			.update("work_pcnt"			, row.getParameter("work_pcnt"))
			.update("work_mnhr"			, row.getParameter("need_time"))
			.update("work_cond_1fst"	, row.getParameter("work_cond_1fst"))
			.update("work_cond_2snd"	, row.getParameter("work_cond_2snd"))

			.insert("line_levl"			, row.getParameter("line_levl"))
			.update("updt_idcd"			, row.getParameter("updt_idcd"))
			.insert("crte_idcd"			, row.getParameter("crte_idcd"))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
			.table("pjod_dsig_schd									")
			.where("where pjod_idcd       = :pjod_idcd				")
			.where("and   dsig_schd_dvcd  = :dsig_schd_dvcd			")
			.where("and   id              = :id						")
			.where("and   seqn            = :seqn					")

			.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))	//프로젝트수주id
			.unique("dsig_schd_dvcd"	, "2000"						)	//프로젝트수주id
			.unique("id"				, row.fixParameter("id"			))	//id
			.unique("seqn"				, row.fixParameter("seqn"		))	//순번

			.update("progress"			, row.getParameter("achi_rate"	))	//달성률


			.insert("line_levl"			, row.getParameter("line_levl"	))
			.update("updt_idcd"			, row.getParameter("updt_idcd"	))
			.insert("crte_idcd"			, row.getParameter("crte_idcd"	))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.update);
			data.execute();
			data.clear();
			data.param
			.query("update pjod_dsig_book a 									")
			.query("left outer join user_mast u on a.wker_idcd = u.lgin_idcd	")
			.query("set a.wker_idcd = u.user_idcd								")
			.query("where u.user_name is not null								")
			;data.attach(Action.direct);
		}
		data.execute();
		return null ;
	}
	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
				data.param
					.table("pjod_dsig_book					")
					.where("where pjod_idcd = :pjod_idcd	")
					.where("and   invc_date = :invc_date	")
					.where("and   line_seqn = :line_seqn	")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
					.unique("invc_date"			, row.fixParameter("invc_date"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("line_stat"			, 2)

				;data.attach(Action.update);
			}
		data.execute();
		return null ;
	}

	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.pjod_dvcd        , a.expt_dvcd        , a.cstm_idcd       , a.cstm_name			")
			.query("		, a.prjt_idcd        , a.regi_date        , a.pjod_name       , a.item_idcd			")
			.query("		, a.item_name        , a.item_spec        , a.modl_name       , a.esti_amnt			")
			.query("		, a.cofm_yorn        , a.cofm_date        , a.cofm_amnt       , a.crny_dvcd			")
			.query("		, a.frst_exam_date   , a.send_exam_date   , a.deli_date       , a.ppsl_deli_date	")
			.query("		, a.strt_date        , a.endd_date        , a.drtr_idcd       , a.dlvy_date			")
			.query("		, a.last_yorn        , a.apvl_date        , a.apvl_drtr_idcd  , a.cstm_item_code	")
			.query("		, a.mold_size        , a.cavity           , a.mold_wigt       , a.used_mtrl_name	")
			.query("		, a.prod_wigt        , a.used_tons        , a.pjod_idcd       , a.amnd_degr			")
			.query("		, a.pjod_code        , c.user_name as drtr_name               , a.item_imge			")
			.query("		, a.user_memo        , a.sysm_memo        , a.prnt_idcd       , a.drtr_idcd			")
			.query("		, a.line_stat        , a.line_clos        , a.find_name       , a.updt_user_name	")
			.query("		, a.updt_ipad        , a.updt_dttm        , a.updt_idcd       , a.updt_urif			")
			.query("		, a.crte_user_name   , a.crte_ipad        , a.crte_dttm       , a.crte_idcd			")
			.query("		, a.crte_urif        , b.buss_name        , b.buss_numb       , b.buss_kind			")
			.query("		, b.buss_type        , b.boss_name        , b.tele_numb       , b.faxi_numb			")
			.query("		, b.mail_addr        , b.hdph_numb        , c.user_name       , c.user_idcd			")
			.query("		, i.item_code																		")
		;
		data.param //퀴리문
			.where("from	pjod_mast a																			")
			.where("		left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("		left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd							")
			.where("		left outer join user_mast c on a.drtr_idcd = c.user_idcd							")
			.where("where   1=1																					")
			.where("and     a.item_idcd  = :item_idcd", arg.getParameter("item_idcd"							))
			.where("and     a.pjod_idcd  = :pjod_idcd", arg.getParameter("pjod_idcd"							))
			.where("and     a.cstm_idcd  = :cstm_idcd", arg.getParameter("cstm_idcd"							))
			.where("and     a.drtr_idcd  = :user_idcd", arg.getParameter("user_idcd"							))
			.where("and	    a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.regi_date  between :fr_dt      " , arg.getParamText("fr_dt") )
			.where("                     and     :to_dt      " , arg.getParamText("to_dt") )
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
	public SqlResultMap getCstm(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    a.cstm_idcd          ,a.cstm_code          ,a.cstm_dvcd          ,a.rtil_stru_dvcd	")
			.query("         ,a.cstm_name          ,a.cstm_stnm_1fst     ,a.cstm_stnm_2snd     ,a.engl_name			")
			.query("         ,a.engl_stnm          ,a.engl_stnm_1fst     ,a.engl_stnm_2snd     ,a.mngt_bzpl_idcd	")
			.query("         ,a.home_page_addr     ,a.cstm_dsgn_trnt     ,a.corp_dvcd          ,a.buss_name			")
			.query("         ,a.buss_numb          ,a.buss_type          ,a.buss_kind          ,a.corp_numb			")
			.query("         ,a.boss_name          ,a.tele_numb          ,a.tele_numb_2snd     ,a.faxi_numb			")
			.query("         ,a.hdph_numb          ,a.spec_buss_numb     ,a.mail_addr								")
			.query("         ,a.ccrd_puch_yorn     ,a.etbl_rpub_yorn     ,a.sale_cstm_yorn     ,a.expt_cstm_yorn	")
			.query("         ,a.incm_cstm_yorn     ,a.otod_cstm_yorn     ,a.etcc_cstm_yorn     ,a.rpst_cstm_idcd	")
			.query("         ,a.blto_idcd_1fst     ,a.blto_idcd_2snd     ,a.scrt_sett_dvcd     ,a.scrt_sett_amnt	")
			.query("         ,a.scrt_offr_aman     ,a.scrt_mltl          ,a.crdt_bacd          ,a.crdt_lmit_amnt	")
			.query("         ,a.cnio_dvcd          ,a.sale_drtr_idcd     ,a.sale_dept_idcd     ,a.insp_kind_dvcd	")
			.query("         ,a.user_memo          ,a.sysm_memo          ,a.prnt_idcd          ,a.line_levl			")
			.query("         ,a.line_ordr          ,a.line_stat          ,a.line_clos          ,a.find_name			")
			.query("         ,a.updt_user_name     ,a.updt_ipad          ,a.updt_dttm          ,a.updt_idcd			")
			.query("         ,a.updt_urif          ,a.crte_user_name     ,a.crte_ipad          ,a.crte_dttm			")
			.query("         ,a.crte_idcd          ,a.crte_urif          ,a.puch_cstm_yorn     ,b.post_code			")
			.query("         ,b.addr_1fst          ,b.addr_2snd														")
		;
		data.param //퀴리문
			.where("from        cstm_mast  a													")
			.where("            left outer join cstm_addr b on a.cstm_idcd = b.cstm_idcd		")
			.where("where       1=1																")
			.where("and         a.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getPrint(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_project_plan_copy(:invc_numb"    , arg.getParameter("invc_numb"))
			.query("                          , :plan_dvcd	)" , arg.getParameter("plan_dvcd"))
		;
		data.execute();
		return null;
	}
}
