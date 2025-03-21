package com.sky.system.prod.project.prjtworkentry;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class PrjtworkEntryService extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.pjod_idcd        , a.work_schd_dvcd   , a.idcd             , a.line_seqn		")
			.where("    , a.invc_date        , substr(a.sttm,9,6) as sttm , substr(a.edtm,9,6) as edtm , a.wkct_idcd		")
			.where("    , a.work_item_idcd   , a.item_name        , a.item_spec        , a.modl_name		")
			.where("    , a.indn_qntt        , a.work_cont        , a.otod_yorn        , a.cvic_idcd		")
			.where("    , a.rsps_idcd        , a.ivst_pcnt        , a.need_dcnt        , a.ivst_mnhr		")
			.where("    , a.prog_stat_dvcd   , a.perf_rate        , a.befr_wkct_idcd   , a.aftr_wkct_idcd	")
			.where("    , a.remk_text        , a.uper_seqn        , a.work_ordr_dvcd   , a.ordr_degr		")
			.where("    , a.disp_seqn        , a.user_memo        , a.sysm_memo        , a.prnt_idcd		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.where("    , a.crte_urif        , b.item_name as mold_name										")
			.where("from    pjod_work_plan a																")
			.where("        left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd						")
			.where("        left outer join pjod_work_schd s on a.pjod_idcd = s.pjod_idcd					")
			.where("                                        and a.idcd      = s.id							")
			.where("                                        and a.ordr_degr = s.ordr_degr					")
			.where("where   1=1																				")
			.where("and     a.otod_yorn = :otod_yorn" , "0"													 )
			.where("and     STR_TO_DATE( :work_date,'%Y%m%d') BETWEEN DATE_FORMAT(a.sttm,'%Y%m%d') and DATE_FORMAT(a.edtm,'%Y%m%d')", arg.getParamText("work_date"))
			.where("and     a.wkct_idcd = :wkct_idcd"             , arg.getParameter("wkct_idcd"			))
			.where("and     a.prog_stat_dvcd in('0','2')													")
			.where("and     a.work_item_idcd not in (select  p.prnt_idcd 									")
			.where("        from pjod_work_plan p															")
			.where("        where a.pjod_idcd = p.pjod_idcd 												")
			.where("        and   a.work_ordr_dvcd = p.work_ordr_dvcd 										")
			.where("        and   a.ordr_degr = p.ordr_degr													")
			.where("        )																				")
			.where("and     a.ordr_degr = (select max(p.ordr_degr) 											")
			.where("                       from pjod_work_plan p 											")
			.where("                       where p.pjod_idcd = a.pjod_idcd 									")
			.where("                       and a.work_ordr_dvcd = p.work_ordr_dvcd)							")
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and		b.line_clos	not in(1)															")
			.where("and		s.work_item_idcd = :work_item_idcd"		, arg.getParamText("work_item_idcd" 	))
			.where("order by a.pjod_idcd ) a																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.pjod_idcd        , a.wkct_idcd        , a.idcd             , b.line_seqn		")
			.where("    , a.invc_date        , a.name             , a.progress         , a.wker_idcd_1fst	")
			.where("    , a.wker_idcd_2snd   , a.wker_idcd_3trd   , a.item_idcd        , a.cvic_idcd		")
			.where("    , a.indn_qntt        , a.prod_qntt        , a.good_qntt								")
			.where("    , a.poor_qntt        , a.work_sttm        , a.work_edtm        , a.need_time		")
			.where("    , a.work_mnhr        , a.work_pcnt        , a.work_cond_1fst   , a.work_cond_2snd	")
			.where("    , a.work_cond_3trd   , a.work_cond_5fit   , a.work_cond_6six   , a.line_seqn as line_seqn2		")
			.where("    , a.work_cond_7svn   , a.work_dvcd        , a.wkct_insp_yorn   , a.crte_idcd		")
			.where("    , a.last_wkct_yorn   , a.work_para        , a.mtrl_ivst_yorn   						")
			.where("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.crte_urif		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , b.work_cont		")
			.where("    , u.user_name        , c.item_name as mold_name                , b.ordr_degr		")
			.where("    , b.item_name        , b.prog_stat_dvcd   , b.work_ordr_dvcd   , a.work_endd_date	")
			.where("from    pjod_work_book a																")
			.where("        left outer join user_mast u on a.wker_idcd_1fst = u.user_idcd					")
			.where("        left outer join pjod_mast c on a.pjod_idcd = c.pjod_idcd						")
			.where("        left outer join pjod_work_plan b on a.pjod_idcd = b.pjod_idcd					")
			.where("where   1=1																				")
			.where("and		a.wkct_idcd	= :wkct_idcd"		, arg.getParameter("wkct_idcd") 				 )
			.where("and		b.otod_yorn = 0																	")
			.where("and		a.idcd = b.idcd																	")
			.where("and		STR_TO_DATE( :work_date,'%Y%m%d') BETWEEN DATE_FORMAT(b.sttm,'%Y%m%d') and DATE_FORMAT(b.edtm,'%Y%m%d')", arg.getParamText("work_date"))
			.where("and		b.prog_stat_dvcd = 1															")
			.where("and		a.item_idcd = b.work_item_idcd													")
			.where("and		a.prog_stat_dvcd = 1																	")
			.where("and   (a.line_seqn) in (select max(a.line_seqn) from pjod_work_book a 					")
			.where("                               where a.pjod_idcd = b.pjod_idcd							")
			.where("                               and a.prog_stat_dvcd = 1										")
			.where("                               and a.item_idcd = b.work_item_idcd group by a.idcd)		")
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd ) a																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.pjod_idcd        , a.wkct_idcd        , a.idcd             , b.line_seqn		")
			.where("    , a.invc_date        , a.name             , a.progress         , a.wker_idcd_1fst	")
			.where("    , a.wker_idcd_2snd   , a.wker_idcd_3trd   , a.item_idcd        , a.cvic_idcd		")
			.where("    , b.work_cont        , a.indn_qntt        , a.prod_qntt        , a.good_qntt		")
			.where("    , a.poor_qntt        , a.work_sttm        , a.work_edtm        , a.need_time		")
			.where("    , a.work_mnhr        , a.work_pcnt        , a.work_cond_1fst   , a.work_cond_2snd	")
			.where("    , a.work_cond_3trd   , a.work_cond_5fit   , a.work_cond_6six						")
			.where("    , a.work_cond_7svn   , a.work_dvcd        , a.wkct_insp_yorn						")
			.where("    , a.last_wkct_yorn   , a.work_para        , a.mtrl_ivst_yorn   , a.work_endd_date	")
			.where("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , b.ordr_degr		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.where("    , a.crte_urif        , u.user_name        , c.item_name as mold_name				")
			.where("    , b.item_name        , b.prog_stat_dvcd   , b.work_ordr_dvcd   , a.line_seqn as line_seqn2")
			.where("from    pjod_work_book a																")
			.where("        left outer join user_mast u on a.wker_idcd_1fst = u.user_idcd					")
			.where("        left outer join pjod_mast c on a.pjod_idcd = c.pjod_idcd						")
			.where("        left outer join pjod_work_plan b on a.pjod_idcd = b.pjod_idcd					")
			.where("where   1=1																				")
			.where("and		a.wkct_idcd	= :wkct_idcd"		, arg.getParameter("wkct_idcd") 				 )
			.where("and		a.idcd = b.idcd																	")
			.where("and		b.sttm        BETWEEN (SELECT CURDATE() - INTERVAL DAYOFWEEK(CURDATE())+5 DAY)	")
			.where("                      AND (SELECT NOW())												")
			.where("and		b.otod_yorn = 0																	")
			.where("and		b.prog_stat_dvcd = 3															")
			.where("and		a.item_idcd = b.work_item_idcd													")
			.where("and		a.prog_stat_dvcd = 3															")
			.where("and   ( a.line_seqn ) in ( select max(a.line_seqn) 										")
			.where("                           from pjod_work_book a 										")
			.where("                           where a.pjod_idcd    = b.pjod_idcd							")
			.where("                           and a.prog_stat_dvcd = 3										")
			.where("                           and a.item_idcd      = b.work_item_idcd 						")
			.where("                           group by a.idcd												")
			.where("                         )																")
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date,a.work_sttm, a.pjod_idcd, a.wkct_idcd ) a							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("prog_stat_dvcd").equals("0")){
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize  ")
			;
			data.param
				.query("select *																				")
			;
			data.param
				.where("from (																					")
				.where("select																					")
				.where("      a.pjod_idcd        , a.work_schd_dvcd   , a.idcd             , a.line_seqn		")
				.where("    , a.invc_date        , substr(a.sttm,9,6) as work_sttm , substr(a.edtm,9,6) as work_edtm , a.wkct_idcd		")
				.where("    , a.work_item_idcd   , a.item_name        , a.item_spec        , a.modl_name		")
				.where("    , a.indn_qntt        , a.work_cont        , a.otod_yorn        , a.cvic_idcd		")
				.where("    , a.rsps_idcd        , a.ivst_pcnt        , a.need_dcnt        , a.ivst_mnhr		")
				.where("    , a.prog_stat_dvcd   , a.perf_rate        , a.befr_wkct_idcd   , a.aftr_wkct_idcd	")
				.where("    , a.remk_text        , a.uper_seqn        , a.work_ordr_dvcd   , a.ordr_degr		")
				.where("    , a.disp_seqn        , a.user_memo        , a.sysm_memo        , a.prnt_idcd		")
				.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
				.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
				.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
				.where("    , a.crte_urif        , b.item_name as mold_name										")
				.where("from    pjod_work_plan a																")
				.where("        left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd						")
				.where("where   1=1																				")
				.where("and     a.otod_yorn = :otod_yorn" , "0"													 )
				.where("and  a.ordr_degr = (select max(x.ordr_degr) from pjod_work_plan x where x.pjod_idcd=a.pjod_idcd)" )
				.where("and     a.pjod_idcd = :pjod_idcd" , arg.getParameter("pjod_idcd"						))
				.where("and		(DATE_FORMAT(a.sttm,'%Y%m%d') BETWEEN STR_TO_DATE( :work_date,'%Y%m%d') ", arg.getParamText("work_date"))
				.where("                                     and STR_TO_DATE( :work_date2,'%Y%m%d')", arg.getParamText("work_date2"))
				.where("or		DATE_FORMAT(a.edtm,'%Y%m%d') BETWEEN STR_TO_DATE( :work_date3,'%Y%m%d') ", arg.getParamText("work_date"))
				.where("                                     and STR_TO_DATE( :work_date4,'%Y%m%d'))", arg.getParamText("work_date2"))
			;
			if(arg.getParamText("prog_stat_dvcd").equals("0")){
				data.param
					.where("and     a.prog_stat_dvcd in (0,2)	")
				;
			}else{
				data.param
					.where("and     a.prog_stat_dvcd = :prog_stat_dvcd	", arg.getParamText("prog_stat_dvcd"))
				;
			}
			data.param
				.where("and		s.work_item_idcd = :work_item_idcd"		, arg.getParamText("work_item_idcd" 	))
				.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.pjod_idcd ) a																")
				.where("where     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd")						 )
			;
		}else{
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize  ")
			;
			data.param
				.query("select *																				")
			;
			data.param
				.where("from (																					")
				.where("select																					")
				.where("      a.pjod_idcd        , a.wkct_idcd        , a.idcd             , b.line_seqn		")
				.where("    , a.invc_date        , a.name             , a.progress         , a.wker_idcd_1fst	")
				.where("    , a.wker_idcd_2snd   , a.wker_idcd_3trd   , a.item_idcd as work_item_idcd			")
				.where("    , b.work_cont        , a.indn_qntt        , a.prod_qntt        , a.good_qntt		")
				.where("    , a.poor_qntt        , a.work_sttm        , a.work_edtm        , a.need_time		")
				.where("    , a.work_mnhr        , a.work_pcnt        , a.work_cond_1fst   , a.work_cond_2snd	")
				.where("    , a.work_cond_3trd   , a.work_cond_5fit   , a.work_cond_6six   , a.cvic_idcd		")
				.where("    , a.work_cond_7svn   , a.work_dvcd        , a.wkct_insp_yorn						")
				.where("    , a.last_wkct_yorn   , a.work_para        , a.mtrl_ivst_yorn   						")
				.where("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , b.ordr_degr		")
				.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
				.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
				.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
				.where("    , a.crte_urif        , u.user_name        , c.item_name as mold_name				")
				.where("    , b.item_name        , b.prog_stat_dvcd   , b.work_ordr_dvcd   , a.line_seqn as line_seqn2")
				.where("from    pjod_work_book a																")
				.where("        left outer join user_mast u on a.wker_idcd_1fst = u.user_idcd					")
				.where("        left outer join pjod_mast c on a.pjod_idcd = c.pjod_idcd						")
				.where("        left outer join pjod_work_plan b on a.pjod_idcd = b.pjod_idcd					")
				.where("where   1=1																				")
				.where("and		a.wkct_idcd	= :wkct_idcd"		      , arg.getParameter("wkct_idcd") 			 )
				.where("and     a.pjod_idcd = :pjod_idcd" , arg.getParameter("pjod_idcd"						))
				.where("and		a.idcd = b.idcd																	")
				.where("and		(DATE_FORMAT(b.sttm,'%Y%m%d') BETWEEN STR_TO_DATE( :work_date,'%Y%m%d') ", arg.getParamText("work_date"))
				.where("                                     and STR_TO_DATE( :work_date2,'%Y%m%d')", arg.getParamText("work_date2"))
				.where("or		DATE_FORMAT(b.edtm,'%Y%m%d') BETWEEN STR_TO_DATE( :work_date3,'%Y%m%d') ", arg.getParamText("work_date"))
				.where("                                     and STR_TO_DATE( :work_date4,'%Y%m%d'))", arg.getParamText("work_date2"))
				.where("and		b.otod_yorn = 0																	")
				.where("and		b.prog_stat_dvcd = :prog_stat_dvcd", arg.getParameter("prog_stat_dvcd"			))
				.where("and		a.item_idcd = b.work_item_idcd													")
				.where("and		a.prog_stat_dvcd = :stat_dvcd"          , arg.getParameter("prog_stat_dvcd"			))
				.where("and   (a.line_seqn) in (select max(a.line_seqn) from pjod_work_book a 					")
				.where("                               where a.pjod_idcd = b.pjod_idcd							")
				.where("							   and a.prog_stat_dvcd = :stat_dvcd2", arg.getParameter("prog_stat_dvcd"))
				.where("                               and a.item_idcd = b.work_item_idcd group by a.idcd)		")
				.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.pjod_idcd ) a																")
			;
		}
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select max(line_seqn) as seq															")
		;
		data.param
			.where("from pjod_work_book																		")
			.where("where pjod_idcd = :pjod_idcd", arg.getParameter("pjod_idcd								"))
		;
		return data.selectForMap();
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String set = arg.getParamText("_set");
		String endd = "";
		String dvcd = "1";
		if(set.equals("stop")){
			dvcd="2";
		}else if(set.equals("end")){
			dvcd="3";
		}else if(set.equals("restart")){
			dvcd="0";
		}else if(set.equals("cancel")){
			dvcd="1";
		}

		for (SqlResultRow row : map) {
			System.out.println(row.getParameter("item_idcd"));
			endd = row.getParamText("work_endd_date");
			if(dvcd == "0"||dvcd == "1"){
				endd = "";
			}
			if(set.equals("insert")){
				System.out.println(dvcd);
				data.param
					.table("pjod_work_plan")
					.where("where pjod_idcd = :pjod_idcd								")
					.where("and   line_seqn = :line_seqn								")
					.where("and   work_ordr_dvcd = :work_ordr_dvcd						")
					.where("and   ordr_degr = :ordr_degr								")
					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					.unique("work_ordr_dvcd"	, row.fixParameter("work_ordr_dvcd"))
					.unique("ordr_degr"			, row.fixParameter("ordr_degr"))
					.update("rsps_idcd"			, row.getParameter("wker_idcd_1fst"))
					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("pjod_work_book")
					.where("where pjod_idcd = :pjod_idcd								")
					.where("and   wkct_idcd = :wkct_idcd								")
					.where("and   invc_date = :invc_date								")
					.where("and   line_seqn = :line_seqn								")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"))
					.unique("invc_date"			, row.fixParameter("invc_date"))
					.unique("line_seqn"			, row.fixParameter("line_seqn2"))


					.update("work_ordr_dvcd"	, row.getParameter("work_ordr_dvcd"))
					.update("idcd"				, row.getParameter("idcd"))
					.update("name"				, row.getParameter("name"))
					.update("progress"			, row.getParameter("progress"))
					.update("wker_idcd_1fst"	, row.getParameter("wker_idcd_1fst"))
					.update("wker_idcd_2snd"	, row.getParameter("wker_idcd_2snd"))
					.update("wker_idcd_3trd"	, row.getParameter("wker_idcd_3trd"))
					.update("wker_idcd_4frt"	, row.getParameter("wker_idcd_4frt"))
					.update("wker_idcd_5fit"	, row.getParameter("wker_idcd_5fit"))
					.update("wker_idcd_6six"	, row.getParameter("wker_idcd_6six"))
					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
					.update("work_cont"			, row.getParameter("work_cont"))
					.update("indn_qntt"			, row.getParameter("indn_qntt"))
					.update("prod_qntt"			, row.getParameter("prod_qntt"))
					.update("good_qntt"			, row.getParameter("good_qntt"))
					.update("poor_qntt"			, row.getParameter("poor_qntt"))
					.update("work_sttm"			, row.getParameter("work_sttm"))
					.update("work_edtm"			, row.getParameter("work_edtm"))
					.update("need_time"			, row.getParameter("need_time"))
					.update("work_mnhr"			, row.getParameter("work_mnhr"))
					.update("work_pcnt"			, row.getParameter("work_pcnt"))
					.update("work_cond_1fst"	, row.getParameter("work_cond_1fst"))
					.update("work_cond_2snd"	, row.getParameter("work_cond_2snd"))
					.update("work_cond_3trd"	, row.getParameter("work_cond_3trd"))
					.update("work_cond_5fit"	, row.getParameter("work_cond_5fit"))
					.update("work_cond_6six"	, row.getParameter("work_cond_6six"))
					.update("work_cond_7svn"	, row.getParameter("work_cond_7svn"))
					.update("work_dvcd"			, row.getParameter("work_dvcd"))
					.update("wkct_insp_yorn"	, row.getParameter("wkct_insp_yorn"))
					.update("last_wkct_yorn"	, row.getParameter("last_wkct_yorn"))
					.update("work_para"			, row.getParameter("work_para"))
					.update("mtrl_ivst_yorn"	, row.getParameter("mtrl_ivst_yorn"))
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("prog_stat_dvcd"	, dvcd)


					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.insert);
			}else{
				data.param
					.table("pjod_work_plan")

					.where("where pjod_idcd = :pjod_idcd								")
					.where("and   line_seqn = :line_seqn								")
					.where("and   work_ordr_dvcd = :work_ordr_dvcd						")
					.where("and   ordr_degr = :ordr_degr								")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					.unique("work_ordr_dvcd"	, row.fixParameter("work_ordr_dvcd"))
					.unique("ordr_degr"			, row.fixParameter("ordr_degr"))
					.unique("idcd"				, row.fixParameter("idcd"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
				data.param
					.table("pjod_work_book")
					.where("where pjod_idcd = :pjod_idcd								")
					.where("and   wkct_idcd = :wkct_idcd								")
					.where("and   idcd = :idcd								")
					.where("and   line_seqn = :line_seqn								")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn2"))
					.unique("idcd"				, row.fixParameter("idcd"))

					.update("prog_stat_dvcd"	, dvcd)
					.update("work_edtm"			, row.getParameter("work_edtm"))
					.update("need_time"			, row.getParameter("need_time"))
					.update("work_endd_date"	, endd)

					.update("invc_date"			, row.getParameter("invc_date"))
					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.update);
			}
		}

		data.execute();
		return null;
	}

}
