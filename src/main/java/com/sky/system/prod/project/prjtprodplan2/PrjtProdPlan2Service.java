package com.sky.system.prod.project.prjtprodplan2;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
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
public class PrjtProdPlan2Service extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	// search
	public SqlResultMap getSearch1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String pjod_idcd = arg.getParamText("pjod_idcd");

		data.param
			.query("call project_work_schd_v2 (										")
			.query("   :pjod_idcd"        ,  pjod_idcd								)
			.query("   , :work_ordr_dvcd"   ,  arg.getParamText("work_ordr_dvcd")		)
			.query("   , :ordr_degr"        ,   arg.getParamText("ordr_degr")			)
			.query(" ) 																")
		;
		return data.selectForMap();
	}
	// search

	public SqlResultMap getSearch3(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.*																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.pjod_idcd        , a.wkct_idcd        , a.idcd             , a.work_ordr_dvcd	")
			.where("    , a.invc_date        , a.name             , a.progress         , a.wker_idcd_1fst	")
			.where("    , a.wker_idcd_2snd   , a.wker_idcd_3trd   , a.item_idcd        , a.cvic_idcd		")
			.where("    , a.indn_qntt        , a.prod_qntt        , a.good_qntt								")
			.where("    , a.poor_qntt        , a.work_sttm        , a.work_edtm        , a.need_time		")
			.where("    , a.work_mnhr        , a.work_pcnt        , a.work_cond_1fst   , a.work_cond_2snd	")
			.where("    , a.work_cond_3trd   , a.work_cond_5fit   , a.work_cond_6six   , a.line_seqn		")
			.where("    , a.work_cond_7svn   , a.work_dvcd        , a.wkct_insp_yorn   , a.crte_idcd		")
			.where("    , a.last_wkct_yorn   , a.work_para        , a.mtrl_ivst_yorn   , a.work_endd_date	")
			.where("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.crte_urif		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , b.work_cont		")
			.where("    , u.user_name        , a.ordr_degr        , b.work_schd_dvcd						")
			.where("    , b.item_name        , a.prog_stat_dvcd   , u2.user_name as user_name2				")
			.where("    , u3.user_name as user_name3														")
			.where("from    pjod_work_book a																")
			.where("        left outer join user_mast u on a.wker_idcd_1fst = u.user_idcd					")
			.where("        left outer join user_mast u2 on a.wker_idcd_2snd = u2.user_idcd					")
			.where("        left outer join user_mast u3 on a.wker_idcd_3trd = u3.user_idcd					")
			.where("        left outer join pjod_work_plan b on	a.idcd = b.idcd								")
			.where("                                         and a.pjod_idcd      = b.pjod_idcd				")
			.where("                                         and a.work_ordr_dvcd = b.work_ordr_dvcd		")
			.where("                                         and a.ordr_degr      = b.ordr_degr				")
			.where("where   1=1																				")
			.where("and     a.pjod_idcd = :pjod_idcd ", arg.getParameter("pjod_idcd")						 )
			.where("and     a.work_ordr_dvcd = :work_ordr_dvcd ", arg.getParameter("work_ordr_dvcd")		 )
			.where("and     a.wkct_idcd = :wkct_idcd ", arg.getParameter("wkct_idcd")						 )
			.where("and     a.ordr_degr = :ordr_degr ", arg.getParameter("ordr_degr")						 )
			.where("and     a.idcd = :idcd ", arg.getParameter("idcd")										 )
			.where(") a																						")
		;

		return data.selectForMap();

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
	public SqlResultMap setDeleteBook(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("pjod_work_book")
				.where("where pjod_idcd    = :pjod_idcd" )
				.where("and wkct_idcd      = :wkct_idcd" )
				.where("and line_seqn      = :line_seqn" )
				.where("and ordr_degr      = :ordr_degr" )

				.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"))
				.unique("wkct_idcd"			, arg.fixParameter("wkct_idcd"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))
				.unique("ordr_degr"			, arg.fixParameter("ordr_degr"))
			;data.attach(Action.delete);

			if(arg.getParamText("prog_stat_dvcd").equals("3") || arg.getParamText("prog_stat_dvcd").equals("1")){

				data.param
					.table("pjod_work_plan")
					.where("where pjod_idcd    = :pjod_idcd")
					.where("and work_schd_dvcd = :work_schd_dvcd" )
					.where("and work_ordr_dvcd = :work_ordr_dvcd" )
					.where("and idcd           =:idcd")
					.where("and ordr_degr      = :ordr_degr" )

					.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"))
					.unique("work_schd_dvcd"	, 2000)
					.unique("work_ordr_dvcd"	, arg.fixParameter("work_ordr_dvcd"))
					.unique("idcd"				, arg.fixParameter("idcd"))
					.unique("ordr_degr"			, arg.fixParameter("ordr_degr"))

					.update("prog_stat_dvcd", "0")
				;data.attach(Action.update);
			}
			data.execute();
		return null;
	}
	public SqlResultMap setSearch1(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String otod_yorn = row.getParamText("otod_yorn");
			String chek = "0";
			if(otod_yorn == "true"){
				chek ="1";
			}
			data.param
				.table("pjod_work_schd")
				.where("where pjod_idcd    = :pjod_idcd" )
				.where("and work_schd_dvcd = :work_schd_dvcd" )
				.where("and ordr_degr      = :ordr_degr" )
				.where("and work_ordr_dvcd = :work_ordr_dvcd" )
				.where("and id             = :id" )

				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
				.unique("work_schd_dvcd"	, row.fixParameter("work_schd_dvcd"))
				.unique("ordr_degr"			, row.fixParameter("ordr_degr"))
				.unique("work_ordr_dvcd"	, row.fixParameter("work_ordr_dvcd"))
				.unique("id"				, row.fixParameter("gant_id"))

				.update("cvic_idcd"				, row.getParameter("cvic_idcd"))
				.update("otod_yorn"				, chek)
			;data.attach(rowaction);
			data.param
				.table("pjod_work_plan")
				.where("where pjod_idcd    = :pjod_idcd" )
				.where("and work_schd_dvcd = :work_schd_dvcd" )
				.where("and ordr_degr      = :ordr_degr" )
				.where("and work_ordr_dvcd = :work_ordr_dvcd" )
				.where("and idcd             = :idcd" )

				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
				.unique("work_schd_dvcd"	, row.fixParameter("work_schd_dvcd"))
				.unique("ordr_degr"			, row.fixParameter("ordr_degr"))
				.unique("work_ordr_dvcd"	, row.fixParameter("work_ordr_dvcd"))
				.unique("idcd"				, row.fixParameter("gant_id"))

				.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
				.update("otod_yorn"			, chek)

			;data.attach(Action.update);
		}
		data.execute();
		return null;
	}

	/**
	 TODO 작업지시 *
	 */
	public SqlResultMap setWork(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage post = arg.newStorage("POS");
		data.param
			.query("call project_work_order( :pjod_idcd"     , arg.getParameter("pjod_idcd"		))
			.query("                          , :work_ordr_dvcd",arg.getParamText("work_ordr_dvcd"	))
			.query("                          , :ordr_degr"     ,arg.getParamText("ordr_degr"		))
			.query("                          , :crte_idcd"     ,arg.getParamText("crte_idcd"		))
			.query(")"																				)
		;
		data.attach(Action.direct);
		data.execute();
		post.param
			.query("update pjod_work_plan a ,  (select   b.pjod_idcd  , b.work_ordr_dvcd						")
			.query("                                   , b.ordr_degr  , b.idcd									")
			.query("                                   , b.prog_stat_dvcd										")
			.query("                            from   pjod_work_book b											")
			.query("                            where updt_dttm = ( select max(updt_dttm)						")
			.query("                                                from pjod_work_book c 						")
			.query("                                                where b.pjod_idcd = c.pjod_idcd				")
			.query("                                                and b.idcd = c.idcd							")
			.query("                                                and b.work_ordr_dvcd = c.work_ordr_dvcd		")
			.query("                                               )											")
			.query("                            ) b																")
			.query("set a.prog_stat_dvcd = ifnull(b.prog_stat_dvcd,'0')											")
			.query("WHERE  a.pjod_idcd = b.pjod_idcd															")
			.query("and    a.idcd = b.idcd																		")
			.query("and    a.work_ordr_dvcd = b.work_ordr_dvcd													")
			.query("and    a.pjod_idcd      = :pjod_idcd"      , arg.getParameter("pjod_idcd"					))
			.query("and    a.work_ordr_dvcd = :work_ordr_dvcd" , arg.getParamText("work_ordr_dvcd"				))
			.query("and    a.ordr_degr      = :ordr_degr"      , arg.getParamText("ordr_degr"					))
		;
		post.attach(Action.direct);
		post.execute();
		return null;
	}
	//TODO 작업일지보고 작성
	public SqlResultMap setWork2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String sysm_memo = "workInsert";
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		if(arg.getParamText("chk").equals("1")){
			data.param
				.table("pjod_work_plan")
				.where("where pjod_idcd    = :pjod_idcd" )
				.where("and work_schd_dvcd = :work_schd_dvcd" )
				.where("and ordr_degr      = :ordr_degr" )
				.where("and work_ordr_dvcd = :work_ordr_dvcd" )
				.where("and idcd             = :idcd" )

				.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"))
				.unique("work_schd_dvcd"	, arg.fixParameter("work_schd_dvcd"))
				.unique("ordr_degr"			, arg.fixParameter("ordr_degr"))
				.unique("work_ordr_dvcd"	, arg.fixParameter("work_ordr_dvcd"))
				.unique("idcd"				, arg.fixParameter("gant_id"))
				.update("prog_stat_dvcd"	, arg.getParameter("prog_stat_dvcd"))
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.update("updt_ipad"			, arg.remoteAddress )
			;data.attach(Action.update);
			data.execute();
			data.clear();
			data.param
				.table("pjod_work_book")
				.where("where pjod_idcd    = :pjod_idcd" )
				.where("and wkct_idcd      = :wkct_idcd" )
				.where("and line_seqn      = :line_seqn" )

				.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"))
				.unique("wkct_idcd"			, arg.fixParameter("wkct_idcd"))
				.unique("line_seqn"			, arg.fixParameter("seqn"))

				.update("invc_date"			, arg.getParameter("invc_date"))
				.insert("work_ordr_dvcd"	, arg.getParameter("work_ordr_dvcd"))
				.insert("ordr_degr"			, arg.getParameter("ordr_degr"))
				.insert("name"				, arg.getParameter("item_name"))
				.update("wker_idcd_1fst"	, arg.getParameter("wker_idcd_1fst"))
				.update("wker_idcd_2snd"	, arg.getParameter("wker_idcd_2snd"))
				.update("wker_idcd_3trd"	, arg.getParameter("wker_idcd_3trd"))
				.insert("cvic_idcd"			, arg.getParameter("cvic_idcd"))
				.update("work_cont"			, arg.getParameter("work_cont"))
				.update("prod_qntt"			, arg.getParameter("prod_qntt"))
				.update("work_sttm"			, arg.getParameter("work_sttm"))
				.update("work_edtm"			, arg.getParameter("work_edtm"))
				.update("work_endd_date"	, arg.getParameter("work_endd_date"))
				.insert("item_idcd"			, arg.getParameter("item_idcd"))
				.update("item_name"			, arg.getParameter("name"))
				.insert("idcd"				, arg.getParameter("gant_id"))
				.update("sysm_memo"			, sysm_memo)
				.insert("prnt_idcd"			, arg.getParameter("prnt_idcd"))
				.update("prog_stat_dvcd"	, arg.getParameter("prog_stat_dvcd"))
				.insert("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.insert("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(rowaction);
			data.execute();
		}else{
			data.param
				.table("pjod_work_book")
				.where("where pjod_idcd    = :pjod_idcd" )
				.where("and wkct_idcd      = :wkct_idcd" )
				.where("and line_seqn      = :line_seqn" )

				.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"))
				.unique("wkct_idcd"			, arg.fixParameter("wkct_idcd"))
				.unique("line_seqn"			, arg.fixParameter("seqn"))

				.update("invc_date"			, arg.getParameter("invc_date"))
				.insert("work_ordr_dvcd"	, arg.getParameter("work_ordr_dvcd"))
				.insert("ordr_degr"			, arg.getParameter("ordr_degr"))
				.insert("name"				, arg.getParameter("item_name"))
				.update("wker_idcd_1fst"	, arg.getParameter("wker_idcd_1fst"))
				.update("wker_idcd_2snd"	, arg.getParameter("wker_idcd_2snd"))
				.update("wker_idcd_3trd"	, arg.getParameter("wker_idcd_3trd"))
				.insert("cvic_idcd"			, arg.getParameter("cvic_idcd"))
				.update("work_cont"			, arg.getParameter("work_cont"))
				.update("prod_qntt"			, arg.getParameter("prod_qntt"))
				.update("work_sttm"			, arg.getParameter("work_sttm"))
				.update("work_edtm"			, arg.getParameter("work_edtm"))
				.update("work_endd_date"	, arg.getParameter("work_endd_date"))
				.insert("item_idcd"			, arg.getParameter("item_idcd"))
				.update("item_name"			, arg.getParameter("name"))
				.insert("idcd"				, arg.getParameter("gant_id"))
				.update("sysm_memo"			, sysm_memo)
				.insert("prnt_idcd"			, arg.getParameter("prnt_idcd"))
				.update("prog_stat_dvcd"	, arg.getParameter("prog_stat_dvcd"))
				.insert("crte_ipad"			, arg.remoteAddress )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;data.attach(rowaction);
			data.execute();
		}

		return null;
	}
	//Max invc_date
	public SqlResultMap getMaxDate(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select      max(invc_date) as max											")
		;
		data.param //퀴리문
			.where("from        pjod_work_book  a												")
			.where("where       1=1																")
			.where("and         a.pjod_idcd = :pjod_idcd               " , arg.getParameter("pjod_idcd"))
			.where("and         a.ordr_degr = :ordr_degr               " , arg.getParameter("ordr_degr"))
			.where("and         a.work_ordr_dvcd = :work_ordr_dvcd     " , arg.getParameter("work_ordr_dvcd"))
			.where("and         a.idcd = :idcd                         " , arg.getParameter("idcd"))
		;
			return data.selectForMap();
	}
	public SqlResultMap getGrid(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select       a.pjod_idcd       , d.item_name       , b.cvic_name							")
			.query("           , DATE_FORMAT(str_to_date(a.invc_date, '%Y%m%d'),'%Y-%m-%d ')	as invc_date	")
			.query("           , DATE_FORMAT(FROM_UNIXTIME(p.start/1000,'%Y%m%d'),'%Y-%m-%d ')	as strt_date	")
			.query("           , DATE_FORMAT(FROM_UNIXTIME(p.end/1000,'%Y%m%d'),'%Y-%m-%d ')	as endd_date	")
		;
		data.param //퀴리문
			.where("from        pjod_work_plan a   																")
			.where("            left outer join pjod_work_schd p on a.pjod_idcd = p.pjod_idcd 					")
			.where("                                            and a.idcd = p.id								")
			.where("                                            and a.ordr_degr = p.ordr_degr 					")
			.where("            left outer join cvic_mast b on a.cvic_idcd = b.cvic_idcd						")
			.where("            left outer join user_mast c on a.rsps_idcd = c.user_idcd						")
			.where("            left outer join pjod_mast d on a.pjod_idcd = d.pjod_idcd						")
			.where("where       1=1																				")
			.where("and         a.pjod_idcd	= :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and         b.cvic_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and         a.work_schd_dvcd = :work_schd_dvcd  " , "2000"									 )
			.where("and         FROM_UNIXTIME(p.start/1000,'%Y%m%d')  between  DATE_ADD(now(),INTERVAL -5 DAY)	")
			.where("                                                      and DATE_ADD(now(),INTERVAL 25 DAY)	")
			.where("and         b.cvic_name is not null															")
//			.where("and         a.invc_date >= (select MIN(FROM_UNIXTIME(start/1000,'%Y%m%d'))		")
//			.where("                            from pjod_work_schd where pjod_idcd = :pjod_idcd2)", arg.getParameter("pjod_idcd"))
//			.where("and         a.invc_date <= (select max(FROM_UNIXTIME(start/1000,'%Y%m%d'))		")
//			.where("                            from pjod_work_schd where pjod_idcd = :pjod_idcd3)", arg.getParameter("pjod_idcd"))
			.where("order by    a.line_seqn"																	 )
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap setApprove(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			// master 등록/수정
		data.param
			.query("call auto_project_close('pjod_work_schd',:pjod_idcd", arg.getParameter("pjod_idcd"))
			.query("                        , :work_ordr_dvcd ",   arg.getParameter("work_ordr_dvcd"))
			.query("                        , :ordr_degr ",        arg.getParameter("ordr_degr"		))
			.query("                        , :prod_cofm_yorn ",   arg.getParameter("prod_cofm_yorn"))
			.query(")																				")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap getApprove(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_project_close_ref('pjod_work_schd',:pjod_idcd", arg.getParameter("pjod_idcd"))
			.query("                        , :work_ordr_dvcd ",   arg.getParameter("work_ordr_dvcd"))
			.query("                        , :ordr_degr ",        arg.getParameter("ordr_degr"		))
			.query(")																				")
		;

		return data.selectForMap();
	}
	public SqlResultMap project_schd_copy(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call project_schd_copy (										")
			.query("   :pjod_idcd"        ,  arg.getParamText("pjod_idcd")				)
			.query("   , :work_ordr_dvcd"   ,  arg.getParamText("work_ordr_dvcd")		)
			.query("   , :ordr_degr"        ,   arg.getParamText("ordr_degr")			)
			.query(" ) 																")
		;data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap getOrdr_degr(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select ifnull(max(a.ordr_degr),0) as ordr_degr											")
		;
		data.param
			.where("from pjod_work_schd a																	")
			.where("where   1=1																				")
			.where("and     a.pjod_idcd = :pjod_idcd ", arg.getParameter("pjod_idcd")						 )
			.where("and     a.work_ordr_dvcd = :work_ordr_dvcd ", arg.getParameter("work_ordr_dvcd")		 )
		;

		return data.selectForMap();

	}
	//TODO 이미지 저장
	public SqlResultMap setImage(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = arg.getParamText("chk1");
		String chk2 = arg.getParamText("chk2");
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
					.query("update pjod_work_schd																")
					.query("       set imge_1fst = ''															")
					.query("       where pjod_idcd = :pjod_idcd"			, arg.getParameter("pjod_idcd"		))
					.query("       and   work_schd_dvcd = :work_schd_dvcd"	, arg.getParameter("work_schd_dvcd"	))
					.query("       and   work_ordr_dvcd = :work_ordr_dvcd"	, arg.getParameter("work_ordr_dvcd"	))
					.query("       and   ordr_degr = :ordr_degr"			, arg.getParameter("ordr_degr"		))
					.query("       and   id = :id"							, arg.getParameter("id"				))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(chk1.equals("1")){
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();

				data.param
					.table("pjod_work_schd")
					.where("where pjod_idcd	= :pjod_idcd" )
					.where("and   work_schd_dvcd	= :work_schd_dvcd" )
					.where("and   work_ordr_dvcd	= :work_ordr_dvcd" )
					.where("and   ordr_degr			= :ordr_degr" )
					.where("and   id				= :id" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))
					.unique("work_schd_dvcd"		, arg.fixParameter("work_schd_dvcd"))
					.unique("work_ordr_dvcd"		, arg.fixParameter("work_ordr_dvcd"))
					.unique("ordr_degr"				, arg.fixParameter("ordr_degr"))
					.unique("id"					, arg.fixParameter("id"))

					.update("imge_1fst",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();

			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update pjod_work_schd																")
					.query("       set imge_2snd = ''															")
					.query("       where pjod_idcd = :pjod_idcd"			, arg.getParameter("pjod_idcd"		))
					.query("       and   work_schd_dvcd = :work_schd_dvcd"	, arg.getParameter("work_schd_dvcd"	))
					.query("       and   work_ordr_dvcd = :work_ordr_dvcd"	, arg.getParameter("work_ordr_dvcd"	))
					.query("       and   ordr_degr = :ordr_degr"			, arg.getParameter("ordr_degr"		))
					.query("       and   id = :id"							, arg.getParameter("id"				))
				;data.attach(Action.direct);
				data.execute();
				data.clear();

			}else if(chk2.equals("1")){
				byte[] buf2 = new byte[1024];
				while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
					 baos2.write(buf2,0,readCount2);
				}
				returnByte2 = baos2.toByteArray();

				data.param
					.table("pjod_work_schd")
					.where("where pjod_idcd	= :pjod_idcd" )
					.where("and   work_schd_dvcd	= :work_schd_dvcd" )
					.where("and   work_ordr_dvcd	= :work_ordr_dvcd" )
					.where("and   ordr_degr			= :ordr_degr" )
					.where("and   id				= :id" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))
					.unique("work_schd_dvcd"		, arg.fixParameter("work_schd_dvcd"))
					.unique("work_ordr_dvcd"		, arg.fixParameter("work_ordr_dvcd"))
					.unique("ordr_degr"				, arg.fixParameter("ordr_degr"))
					.unique("id"					, arg.fixParameter("id"))

					.update("imge_2snd",returnByte2)
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
	//TODO 이미지검색
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select     imge_1fst, imge_2snd				")
		;
		data.param //퀴리문
			.where("from        pjod_work_schd a   																")
			.where("where pjod_idcd    = :pjod_idcd     ", arg.getParameter("pjod_idcd"))
			.where("and work_schd_dvcd = :work_schd_dvcd", arg.getParameter("work_schd_dvcd"))
			.where("and work_ordr_dvcd = :work_ordr_dvcd", arg.getParameter("work_ordr_dvcd"))
			.where("and ordr_degr      = :ordr_degr     ", arg.getParameter("ordr_degr"))
			.where("and id             = :id            ", arg.getParameter("id"))
		;
		return data.selectForMap();

	}
	//TODO BOMPOPUP

	public SqlResultMap getBom(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.pjod_idcd       , a.line_seqn       , a.item_idcd      , a.ivst_wkct_idcd	")
			.query("		, a.unit_idcd       , a.supl_dvcd       , a.cstm_idcd      , a.ndqt_nmrt		")
			.query("		, a.ndqt_dnmn       , a.need_qntt       , a.used_schd_date , a.lwcs_yorn		")
			.query("		, a.incm_loss_rate  , a.otcm_loss_rate  , a.stok_plac      , a.stok_unit_idcd	")
			.query("		, a.item_name       , a.item_spec       , a.item_mtrl							")
			.query("		, a.remk_text       , a.last_yorn       , a.uper_seqn      , a.disp_seqn		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos      , a.find_name		")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
			.query("		, a.crte_idcd       , a.crte_urif       , a.imge_1fst							")
			.query("		, c.cstm_name																	")
			.query("        , (select base_name from base_mast r where a.item_mtrl  = r.base_code			")
			.query("                                             and   r.prnt_idcd = '3101')   as item_mtrl_name	")
		;
		data.param
			.where("from   pjod_bom a																		")
			.where("       left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd							")
			.where("where  1=1																				")
			.where("and    a.supl_dvcd   = :supl_dvcd"	, "1000")
			.where("and    a.pjod_idcd   = :pjod_idcd"	, arg.getParamText("pjod_idcd"))
			.where("and    a.find_name   like %:find_name%"	, arg.getParamText("find_name"))
			.query("and    b.item_idcd   = :item_idcd" 	, arg.getParameter("item_idcd"))
			.where("and    a.line_stat   = :line_stat1"	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("and    a.line_stat   < :line_stat       "	, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																	")
		;
		return data.selectForMap();
	}
	public SqlResultMap setBomImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("update pjod_work_schd a													")
			.query("     , ( select item_imge,item_idcd from item_mast 						")
			.query("         where item_idcd= :item_idcd ) b  ",arg.fixParameter("item_idcd"))
			.query("set a.imge_1fst= b.item_imge											")
			.query("    , a.item_idcd = b.item_idcd											")
			.query("    , a.work_item_idcd = b.item_idcd									")
			.query("where pjod_idcd = :pjod_idcd			  ", arg.fixParameter("pjod_idcd"))
			.query("and   ordr_degr = :ordr_degr			  ", arg.fixParameter("ordr_degr"))
			.query("and   id        = :id					  ", arg.fixParameter("id"))
		;data.attach(Action.direct);
		data.execute();
		return null;
	}

}
