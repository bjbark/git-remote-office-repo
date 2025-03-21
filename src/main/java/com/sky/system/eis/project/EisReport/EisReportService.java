package com.sky.system.eis.project.EisReport;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class EisReportService extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	// search
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call project_eis_query_1_v2('0')										")
		;
		return data.selectForMap();
	}
	// search
	public SqlResultMap getSearch2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call project_eis_query_1_v2( :work_ordr_dvcd  ", arg.getParameter("work_ordr_dvcd"		))
			.query(")																				")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSearch3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

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
			.where("    , a.invc_date        , a.sttm             , a.edtm             , a.wkct_idcd		")
			.where("    , a.work_item_idcd   , a.item_name        , a.item_spec        , a.modl_name		")
			.where("    , a.indn_qntt        , a.work_cont        , a.otod_yorn        , a.cvic_idcd		")
			.where("    , a.rsps_idcd        , a.ivst_pcnt        , a.need_dcnt        , a.ivst_mnhr		")
			.where("    , a.prog_stat_dvcd   , a.perf_rate        , a.befr_wkct_idcd   , a.aftr_wkct_idcd	")
			.where("    , a.remk_text        , a.uper_seqn        , a.work_ordr_dvcd						")
			.where("    , a.disp_seqn        , a.user_memo        , a.sysm_memo        , a.prnt_idcd		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.where("    , a.crte_urif        , b.item_name as mold_name ,b.deli_date   , c.cvic_name		")
			.where("from    pjod_work_plan a																")
			.where("        left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd						")
			.where("        left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd						")
			.where("where   1=1																				")
			.where("and     a.otod_yorn = :otod_yorn" , "0"													 )
			.where("and     a.ordr_degr = (select MAX(p.ordr_degr) from pjod_work_schd p					")
			.where("                       where p.pjod_idcd = a.pjod_idcd									")
			.where("                       and   p.work_item_idcd = a.work_item_idcd						")
			.where("                       and   p.work_schd_dvcd = '2000'									")
			.where("                       and   p.work_ordr_dvcd = a.work_ordr_dvcd						")
			.where("                      )																	")
			.where("and     a.work_item_idcd not in (select  p.prnt_idcd 									")
			.where("                          from pjod_work_plan p											")
			.where("                          where a.pjod_idcd = p.pjod_idcd								")
			.where("                          and   a.work_ordr_dvcd = p.work_ordr_dvcd						")
			.where("                          and   a.ordr_degr = p.ordr_degr								")
			.where("                         )"											 					 )
			.where("and     b.line_clos != 1																")
			.where("and     a.prog_stat_dvcd in(0,2)														")
			.where("and    a.edtm >= DATE_FORMAT(CURRENT_DATE(),'%Y%m%d')									")
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd")						 )
			.where("order by a.pjod_idcd ) a																")

		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch4(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

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
			.where("    , a.indn_qntt        , a.prod_qntt        , a.good_qntt        , c.item_name as it_name")
			.where("    , a.poor_qntt        , a.work_sttm        , a.work_edtm        , a.need_time		")
			.where("    , a.work_mnhr        , a.work_pcnt        , a.work_cond_1fst   , a.work_cond_2snd	")
			.where("    , a.work_cond_3trd   , a.work_cond_5fit   , a.work_cond_6six   , a.line_seqn as line_seqn2	")
			.where("    , a.work_cond_7svn   , a.work_dvcd        , a.wkct_insp_yorn   , a.crte_idcd		")
			.where("    , a.last_wkct_yorn   , a.work_para        , a.mtrl_ivst_yorn   , d.cvic_name		")
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
			.where("        left outer join cvic_mast d on a.cvic_idcd = d.cvic_idcd						")
			.where("where   1=1																				")
			.where("and     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd")						 )
			.where("and     b.otod_yorn = :otod_yorn" , "0"													 )
			.where("and     a.idcd = b.idcd																	")
			.where("and     b.prog_stat_dvcd = 1															")
			.where("and     a.prog_stat_dvcd = 1															")
			.where("and     a.item_idcd = b.work_item_idcd													")
			.where("and   (a.line_seqn) in (select max(a.line_seqn) from pjod_work_book a 					")
			.where("                               where a.pjod_idcd = b.pjod_idcd							")
			.where("                               and a.prog_stat_dvcd = 1									")
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
	public SqlResultMap getGanttChart(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
		.query("call project_eis_query_4( :pjod_idcd"     , arg.getParameter("pjod_idcd"))
		.query("                        , :work_ordr_dvcd", arg.getParameter("work_ordr_dvcd"))
		.query("                        , :inq_dvcd", arg.getParameter("inq_dvcd"))
		.query(")										")
		;
		return data.selectForMap();
	}
	public SqlResultMap getDetail6(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
		.query("call project_eis_query_5()	")
		;
		return data.selectForMap();
	}
	public SqlResultMap getDetail7(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
			.query("call project_eis_query_6()	")
		;
		return data.selectForMap();
	}
	public SqlResultMap getTest(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
			.query("select		JSON_OBJECT('name',concat(space((a.line_levl-1)*2),a.`name`)				")
			.query("						,'values',JSON_ARRAY(											")
			.query("											JSON_OBJECT(								")
			.query("														'from',a.stdt					")
			.query("														,'to',a.eddt					")
			.query("														,'desc',a.`name`				")
			.query("														,'customClass',a.css_type		")
			.query("											)											")
			.query("						)																")
			.query("			)	 as json																")
			.query("from (	 																				")
			.query("     select a.pjod_idcd, id, seqn, 1 as sn , a.name										")
			.query("          , FROM_UNIXTIME(a.`start`/1000,'%Y-%m-%d')  as stdt							")
			.query("          , FROM_UNIXTIME(a.`end`  /1000,'%Y-%m-%d')  as eddt							")
			.query("          , 'ganttGreen' as css_type													")
			.query("		  , line_levl																	")
			.query("     from  pjod_work_schd a																")
			.query("     where pjod_idcd = :pjod_idcd",arg.getParameter("pjod_idcd")						 )
			.query("     union all																			")
			.query("     select x.pjod_idcd , x.id,  x.seqn, 2 as sn ,'' as name							")
			.query("          , min(x.invc_date) as stdt													")
			.query("     	  , max(x.invc_date) as eddt													")
			.query("          , 'ganttRed' as css_type														")
			.query("	      , (select min(r.line_levl)													")
			.query("	         from   pjod_work_schd r													")
			.query("	         where  r.pjod_idcd = x.pjod_idcd											")
			.query("		     and    r.id = x.id															")
			.query("	        )  as line_levl																")
			.query("     from (	 																			")
			.query("           select a.pjod_idcd, idcd as id												")
			.query("                , (select seqn from pjod_work_schd r where a.pjod_idcd =r.pjod_idcd and r.work_schd_dvcd = '2000' and r.id = a.idcd) as seqn")
			.query("                , invc_date  as invc_date")
			.query("           from  pjod_work_book a")
			.query("           where pjod_idcd = :pjod_idcd2",arg.getParameter("pjod_idcd")								 )
			.query("           union all ")
			.query("           select a.pjod_idcd, id as id")
			.query("                , seqn")
			.query("                , null    as invc_date")
			.query("           from  pjod_work_schd a")
			.query("           where pjod_idcd = :pjod_idcd3",arg.getParameter("pjod_idcd")								 )
			.query("           and   (pjod_idcd, id) not in (select r.pjod_idcd, r.idcd")
			.query("                                         from   pjod_work_book r")
			.query("           						   	  where  r.pjod_idcd = a.pjod_idcd")
			.query("           							)")
			.query("      ) x")
			.query("      group by x.pjod_idcd , x.id,  x.seqn")
			.query(") a")
			.query("order by a.pjod_idcd  , a.seqn , a.id, a.sn")
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
	public SqlResultMap getGanttGrid(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");

		data.param
			.query("select   CONCAT(DATE_FORMAT(a.invc_date  ,'%Y-%m-%d'),' ',TIME_FORMAT(a.work_sttm,'%H:%i'))  as invc_date			")
			.query("        ,CONCAT(DATE_FORMAT(a.work_endd_date  ,'%Y-%m-%d'),' ',TIME_FORMAT(a.work_edtm	,'%H:%i')) as work_endd_date")
			.query("        ,u1.user_name as wker_name1      ,u2.user_name as wker_name2      ,u3.user_name as wker_name3				")
			.query("        ,c.cvic_name																								")
		;
		data.param //퀴리문
			.where("from        pjod_work_book a 													")
			.where("            left outer join user_mast u1 on a.wker_idcd_1fst = u1.user_idcd		")
			.where("            left outer join user_mast u2 on a.wker_idcd_2snd = u2.user_idcd		")
			.where("            left outer join user_mast u3 on a.wker_idcd_3trd = u3.user_idcd		")
			.where("            left outer join cvic_mast c  on a.cvic_idcd      = c.cvic_idcd		")
			.where("where       1=1																	")
			.where("and         pjod_idcd = :pjod_idcd"   ,arg.getParameter("pjod_idcd"				))
			.where("and         work_ordr_dvcd = :work_ordr_dvcd"   ,arg.getParameter("work_ordr_dvcd"	))
			.where("and         ordr_degr = :ordr_degr"   ,arg.getParameter("ordr_degr"				))
			.where("and         idcd      = :idcd"        ,arg.getParameter("idcd"					))
			.where("order by invc_date,line_seqn")
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
