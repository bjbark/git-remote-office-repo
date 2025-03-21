package com.sky.system.custom.iypkg.prod.workbookv2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
@Service("iypkg.WorkBookV2service")

public class WorkBookV2Service extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.invc_numb        , a.line_seqn       , a.bzpl_idcd        , a.wkfw_idcd			")
			.where("        , a.wkct_idcd        , a.cvic_idcd       , a.wkct_item_idcd   , a.mold_idcd			")
			.where("        , a.mtrl_bacd        , a.prod_dept_idcd  , a.orig_invc_numb   , a.prog_stat_dvcd	")
			.where("        , a.cstm_idcd        , a.item_idcd       , a.bomt_degr        , a.unit_idcd			")
			.where("        , a.indn_qntt        , a.work_strt_dttm  , a.work_endd_dttm   , a.work_dvcd			")
			.where("        , a.insp_wkct_yorn   , a.last_wkct_yorn  , a.cofm_yorn        , a.remk_text			")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif       , a.pckg_cotr_bacd   , a.lott_numb			")
			.where("        , c.cstm_name        , i.prod_code       , i.prod_name        , i.prod_spec			")
			.where("        , b.acpt_numb        , b.pdsd_numb       , m.mold_code								")
			.where("        , concat(substring(a.work_strt_dttm,5,2),'-',substring(a.work_strt_dttm,7,2),' '	")
			.where("        , substring(a.work_strt_dttm,9,2),':',substring(a.work_strt_dttm,11,2)) as work_strt")
			.where("        , concat(substring(a.work_endd_dttm,5,2),'-',substring(a.work_endd_dttm,7,2),' '	")
			.where("        , substring(a.work_endd_dttm,9,2),':',substring(a.work_endd_dttm,11,2)) as work_endd")
			.where("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code				")
			.where("                                             and   r.prnt_idcd = '3101')   as mtrl_name		")
			.where("        , (select base_name from base_mast r where a.pckg_cotr_bacd  = r.base_code			")
			.where("                                             and   r.prnt_idcd = '8004')   as pckg_cotr_name")
			.where("        , @curRank:=@curRank+1 as seqn														")
			.where("        , ac.item_leng as prod_leng        , ac.item_widh as prod_widh 						")
			.where("        , ac.item_hght as prod_hght        , i.prod_idcd									")
			.where("        , bx.bxty_name       , json_value(a.json_data , '$**.pkg_qntt') as pkg_qntt			")
			.where("        , concat(bm.item_ttln,'*',bm.item_ttwd) as bom_spec									")
			.where("        , f.fabc_idcd        , json_value(ac.json_data , '$**.stat_dvcd') as stat_dvcd		")
			.where("        , a.pref_rank        , cv.cvic_name      , i.scre_spec_frml							")
			.where("        , bm.fabc_name       , f.ppln_dvcd       , i.pcod_numb								")

			.where("from    pror_item a																			")
			.where("left outer join pror_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join product_mast i  on a.item_idcd = i.prod_idcd								")
			.where("left outer join boxtype_mast bx on bx.bxty_idcd = i.bxty_idcd								")
			.where("left outer join boxx_acpt_bom bm on bm.invc_numb = b.acpt_numb								")
			.where("left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join fabc_mast f on bm.fabc_idcd = f.fabc_idcd									")
			.where("left outer join boxx_acpt ac on b.acpt_numb = ac.invc_numb									")
			.where("left outer join cvic_mast cv on a.cvic_idcd = cv.cvic_idcd									")
			.where(",(select @curRank:=0) r																		")
			.where("where   1=1																					")
//			.where("and     a.line_stat = 1																		")
			.where("and     a.prog_stat_dvcd not in ('3')														")
			.where("and     (( substr(a.plan_strt_dttm,1,8)														")
			.where("          between STR_TO_DATE(:invc_date1,'%Y%m%d') " , arg.fixParameter("invc_date1"))
			.where("          and STR_TO_DATE( :invc_date2,'%Y%m%d')    " , arg.fixParameter("invc_date2"))
			.where("        ) or																				")
			.where("        ( substr(a.plan_endd_dttm,1,8)														")
			.where("          between STR_TO_DATE(:invc_date3,'%Y%m%d') " , arg.fixParameter("invc_date1"))
			.where("          and STR_TO_DATE( :invc_date4,'%Y%m%d')    " , arg.fixParameter("invc_date2"))
			.where("        ))																					")
			.where("and     a.wkct_idcd = :wkct_idcd"             , arg.getParameter("wkct_idcd"			))
			.where("and     a.cvic_idcd = :cvic_idcd"             , arg.getParameter("cvic_idcd"			))
			.where("order by a.work_strt_dttm asc ) a															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//불량조회
	public SqlResultMap getPause(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
		.query("select     a.invc_numb     , STR_TO_DATE( a.invc_date ,'%Y%m%d') as invc_date			")
		.query("         , a.dayn_dvcd     , STR_TO_DATE( a.work_strt_dttm,'%Y%m%d%H%i%s') as work_sttm	")
		;
		data.param
		.where("from   work_book a																	")
		.where("    , (select max(invc_numb) as invc_numb , max(work_endd_dttm) as work_endd_dttm	")
		.where("       from   work_book																")
		.where("       where  prog_stat_dvcd = 2													")
		.where("       and    wkod_numb      = :wkod_numb ", arg.getParameter("wkod_numb"))
		.where("       ) b																			")
		.where("where  1=1																			")
		.where("and    a.invc_numb = b.invc_numb													")
		.where("and    a.wkct_idcd = :wkct_idcd  ",arg.getParameter("wkct_idcd"))
		.where("and    a.work_endd_dttm = b.work_endd_dttm											")

		;
		return data.selectForMap();
	}
	//불량조회
	public SqlResultMap getPoor(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																		")
		;
		data.param
			.where("from (																			")
			.where("select																			")
			.where("        a.invc_numb   , a.line_seqn    , a.invc_date       , a.poor_bacd		")
			.where("      , a.sttm        , a.edtm         , a.wker_idcd       , a.occr_qntt		")
			.where("      , a.good_qntt   , a.poor_qntt    , a.poor_proc_dvcd						")
			.where("      , (select base_name from base_mast r where a.poor_bacd  = r.base_code		")
			.where("                                             and   r.prnt_idcd = '6000')   as poor_name")
			.where("from   work_book_qc a															")
			.where("where  1=1																		")
			.where("and    a.invc_numb = :invc_numb"		, arg.getParameter("invc_numb"))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn ) a														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//유실조회
	public SqlResultMap getFail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																		")
		;
		data.param
			.where("from (																			")
			.where("select																			")
			.where("        a.invc_numb      , a.line_seqn      , a.invc_date    , a.loss_pcnt 		")
			.where("      , a.loss_resn_dvcd , a.sttm           , a.edtm         , a.loss_time		")
			.where("      , (select base_name from base_mast r where a.loss_resn_dvcd  = r.base_code		")
			.where("                                             and   r.prnt_idcd = '6100')   as loss_name	")
			.where("from   work_book_loss a															")
			.where("where  1=1																		")
			.where("and    a.invc_numb = :invc_numb"		, arg.getParameter("invc_numb"))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn ) a														")
		;
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
			.where("from work_book																			")
			.where("where invc_numb = :invc_numb", arg.getParameter("invc_numb								"))
		;
		return data.selectForMap();
	}
	public SqlResultMap getPlc_Cnt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select sum(PARAM1) as cnt 																	")
		;
		data.param
			.where("from work_book a																			")
			.where("left outer join wt_conv c on a.cvic_idcd = c.cvic_idcd										")
			.where("left outer join  WT_DATA_IN b on a.work_strt_dttm <= DATE_FORMAT(b.TIMEPOINT,'%Y%m%d%H%i00')")
			.where("                 and if(a.work_endd_dttm='',DATE_FORMAT(now(),'%Y%m%d%H%i00'),a.work_endd_dttm)	")
			.where("                        >= DATE_FORMAT(b.TIMEPOINT,'%Y%m%d%H%i00')							")
			.where("                 and c.device = b.device													")
			.where("where a.wkod_numb = :invc_numb", arg.fixParameter("invc_numb"))
			.where("and   a.wkod_seqn = :line_seqn", arg.fixParameter("line_seqn"))
			.where("and   a.cvic_idcd <> ''																		")
		;
		return data.selectForMap();
	}
	public SqlResultMap getBook_Cnt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(*) as cnt	 																	")
		;
		data.param
			.where("from work_book a																			")
			.where("where a.cvic_idcd = :cvic_idcd", arg.fixParameter("cvic_idcd"))
			.where("and   prog_stat_dvcd =  1")
		;
		return data.selectForMap();
	}
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String set = arg.getParamText("_set");
		String dvcd = "1";
		ParamToJson trans = new ParamToJson();

		if(set.equals("stop")){
			dvcd="2";
		}else if(set.equals("end")){
			dvcd="3";
		}else if(set.equals("restart")){
			dvcd="0";
		}else if(set.equals("cancel")){
			dvcd="1";
		}else if(set.equals("delete")){
			dvcd="0";
		}else if(set.equals("updt")){
			dvcd=arg.getParamText("prog_stat_dvcd");
		}
		for (SqlResultRow row : map) {
			if(set.equals("insert")){
				String json = trans.TranslateRowData(map, "pkg_qntt");

				data.param
					.table("pror_mast")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("pror_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))
					.unique("line_seqn"			, row.fixParameter("wkod_seqn"))

					.update("prog_stat_dvcd"	, dvcd)
					.update("json_data"			, json)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb								")
					.where("and   wkct_idcd = :wkct_idcd								")

					.unique("invc_numb"				, row.fixParameter("invc_numb"		))
					.unique("wkct_idcd"				, row.fixParameter("wkct_idcd"		))

					.insert("invc_date"				, row.getParameter("invc_date"		))
					.insert("indn_qntt"				, row.getParameter("indn_qntt"		))
					.insert("item_idcd"				, row.getParameter("prod_idcd"		))
					.update("wker_idcd"				, row.getParameter("wker_idcd"		))
					.update("pdsd_numb"				, row.getParameter("pdsd_numb"		))
					.insert("wkod_numb"				, row.getParameter("wkod_numb"		))
					.insert("wkod_seqn"				, row.getParameter("wkod_seqn"		))
					.insert("work_strt_dttm"		, row.getParamText("invc_date") + row.getParamText("work_sttm"))
					.update("work_endd_dttm"		, "")
					.update("need_time"				, "")
					.insert("cvic_idcd"				, row.getParameter("crte_idcd"		)) // user_mast 각 호기별 idcd를 설비 code와 일치하게 처리함. 차후 수정필요.
					.insert("mold_idcd"				, row.getParameter("mold_idcd"		))
					.insert("mtrl_bacd"				, row.getParameter("mtrl_bacd"		))
					.update("lott_numb"				, row.getParameter("lott_numb"		))
					.update("prod_qntt"				, row.getParameter("prod_qntt"		))
					.insert("dayn_dvcd"				, row.getParameter("dayn_dvcd"		))
					.update("prog_stat_dvcd"		, dvcd								)


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
				data.attach(Action.modify);
			}else if(set.equals("delete")) {
				data.param
					.table("pror_mast")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("pror_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))
					.unique("line_seqn"			, row.fixParameter("wkod_seqn"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

				;
				data.attach(Action.delete);
			}else{
				data.param
					.table("pror_mast")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("pror_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))
					.unique("line_seqn"			, row.fixParameter("wkod_seqn"))

					.update("prog_stat_dvcd"	, dvcd)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("prog_stat_dvcd"	, dvcd							)
					.update("work_endd_dttm"	, row.getParamText("work_endd_date") + row.getParamText("work_edtm"))
					.update("invc_date"			, row.getParameter("invc_date"))
					.update("need_time"			, row.getParameter("need_time"))
					.update("prod_qntt"			, row.getParameter("prod_qntt"))
//					.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
					.update("dsct_resn_dvcd"	, row.getParameter("dsct_resn_dvcd"))	//중단사유

					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, arg.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.query("call boxx_istt_prod(")
					.query("  :invc_numb",row.fixParameter("invc_numb"))
					.query(")")
				;
				data.attach(Action.direct);
			}
			data.execute();
		}
		return null;
	}

	public SqlResultMap getCvicSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.cvic_idcd         , a.cvic_code        , a.cvic_name         , a.cvic_spec		")
			.query("        , a.modl_name         , a.cvic_stat_dvcd   , a.cvic_kind_dvcd    , a.wkct_idcd		")
			.query("        , a.istl_loct         , a.move_drtr_name   , a.mngt_drtr_idcd    , a.mngt_dept_idcd	")
			.query("        , a.aset_idcd         , a.aset_name        , a.puch_cstm_idcd    , a.puch_cstm_name	")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.mchn_numb         , a.puch_date		")
			.query("        , a.cvic_usge         , a.puch_amnt        , a.make_natn_bacd						")
			.query("        , a.cvic_type         , a.make_cmpy_name   , a.prod_abty							")
			.query("        , a.cvic_imge_1fst    , a.cvic_imge_2snd   , a.cstm_idcd         , a.cstm_burd_rate	")
			.query("        , a.norm_ivst_date    , a.succ_date        , a.succ_cstm_idcd    , a.chek_ccle_dvcd	")
			.query("        , a.rnmt_dvcd         , a.sral_numb        , a.labo_rate_idcd    , e.labo_rate_name	")
			.query("        , b.dept_name         , c.wkct_name        , d.cstm_name							")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif         , a.crte_user_name   , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd         , a.make_natn_bacd as make_natn_name							")
		;
		data.param
			.query("from    cvic_mast a																			")
			.query("left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd								")
			.query("left outer join wkct_mast c on a.wkct_idcd = c.wkct_idcd									")
			.query("left outer join cstm_mast d on a.puch_cstm_idcd = d. cstm_idcd								")
			.query("left outer join labo_rate e on a.labo_rate_idcd = e. labo_rate_idcd							")
			.query("where	1=1																					")
			.query("and		a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.cvic_code ) a																	")
			.query("order by a.cvic_code																		")
		;
		return data.selectForMap();
	}

	public SqlResultMap getPoorSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select   count(*) as line_seqn						 										")
		;
		data.param
			.query("from work_book_qc a																			")
			.query("where 1=1																					")
			.query("and   a.invc_numb =:invc_numb"  , arg.getParamText("invc_numb"))
			.query("and a.line_stat   < '2'																		")
			.query(") a																							")
		;
		return data.selectForMap();
	}

	public SqlResultMap setPoor(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_qc")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))

			.update("invc_date"				, arg.getParameter("invc_date"		))
			.update("poor_bacd"				, arg.getParameter("poor_bacd"		))
			.update("sttm"					, arg.getParameter("sttm"			))
			.update("edtm"					, arg.getParameter("edtm"			))
			.update("wker_idcd"				, arg.getParameter("wker_idcd"		))
			.update("occr_qntt"				, arg.getParameter("occr_qntt"		))
			.update("poor_qntt"				, arg.getParameter("poor_qntt"		))
			.update("poor_proc_dvcd"		, arg.getParameter("poor_proc_dvcd"	))
			.update("remk_text"				, arg.getParameter("remk_text"		))

			.update("line_levl"				, arg.getParameter("line_levl")) /* ROW레벨 */
			.update("line_ordr"				, arg.getParameter("line_ordr")) /* ROW순서 */
			.update("line_stat"				, arg.getParameter("line_stat")) /* ROW상태 */
			.update("line_clos"				, arg.getParameter("line_clos")) /* 마감여부 */
			.update("updt_user_name"		, arg.getParameter("updt_user_name")) /* 수정사용자명 */
			.update("updt_ipad"				, arg.getParameter("updt_ipad")) /* 수정IP */
			.update("updt_idcd"				, arg.getParameter("updt_idcd")) /* 수정ID */
			.update("updt_urif"				, arg.getParameter("updt_urif")) /* 수정UI */
			.insert("crte_user_name"		, arg.getParameter("crte_user_name")) /* 생성사용자명 */
			.insert("crte_ipad"				, arg.getParameter("crte_ipad")) /* 생성IP */
			.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
			.insert("crte_idcd"				, arg.getParameter("crte_idcd")) /* 생성ID */
			.insert("crte_urif"				, arg.getParameter("crte_urif")) /* 생성UI */
		;
		data.attach(Action.insert);
		data.execute();
		return null;
	}

	//불량내역삭제
	public SqlResultMap setPoorDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_qc")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

	public SqlResultMap getFailSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select   count(*) as line_seqn						 										")
		;
		data.param
			.query("from work_book_loss a																			")
			.query("where 1=1																					")
			.query("and   a.invc_numb =:invc_numb"  , arg.getParamText("invc_numb"))
			.query("and a.line_stat   < '2'																		")
			.query(") a																							")
		;
		return data.selectForMap();
	}

	public SqlResultMap setFail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_loss")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))

			.update("invc_date"				, arg.getParameter("invc_date"		))
			.update("loss_resn_dvcd"		, arg.getParameter("loss_resn_dvcd"	))
			.update("sttm"					, arg.getParameter("sttm"			))
			.update("edtm"					, arg.getParameter("edtm"			))
			.update("loss_time"				, arg.getParameter("loss_time"		))
			.update("loss_pcnt"				, arg.getParameter("loss_pcnt"		))
			.update("loss_mnhr"				, arg.getParameter("loss_mnhr"		))
			.update("work_dsct_yorn"		, arg.getParameter("work_dsct_yorn"	))

			.update("line_levl"				, arg.getParameter("line_levl")) /* ROW레벨 */
			.update("line_ordr"				, arg.getParameter("line_ordr")) /* ROW순서 */
			.update("line_stat"				, arg.getParameter("line_stat")) /* ROW상태 */
			.update("line_clos"				, arg.getParameter("line_clos")) /* 마감여부 */
			.update("updt_user_name"		, arg.getParameter("updt_user_name")) /* 수정사용자명 */
			.update("updt_ipad"				, arg.getParameter("updt_ipad")) /* 수정IP */
			.update("updt_idcd"				, arg.getParameter("updt_idcd")) /* 수정ID */
			.update("updt_urif"				, arg.getParameter("updt_urif")) /* 수정UI */
			.insert("crte_user_name"		, arg.getParameter("crte_user_name")) /* 생성사용자명 */
			.insert("crte_ipad"				, arg.getParameter("crte_ipad")) /* 생성IP */
			.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
			.insert("crte_idcd"				, arg.getParameter("crte_idcd")) /* 생성ID */
			.insert("crte_urif"				, arg.getParameter("crte_urif")) /* 생성UI */
		;
		data.attach(Action.modify);
		data.execute();
		return null;
	}

	//유실내역삭제
	public SqlResultMap setFailDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_loss")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

	public SqlResultMap getWorkBook(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select invc_numb, ifnull(prog_stat_dvcd,0) as prog_stat_dvcd, work_strt_dttm, invc_date		")
			.query("     , ifnull(json_value(json_data , '$**.pause_dvcd'),0) as pause_dvcd						")
			.query("from work_book																				")
			.query("where wkod_numb = :wkod_numb", arg.getParameter("invc_numb"))
			.query("and   wkod_seqn = :wkod_seqn", arg.getParameter("line_seqn"))
			.query("order by invc_date desc, work_strt_dttm desc												")
			.query("limit 1																						")
		;
		return data.selectForMap();
	}

	public SqlResultMap getFabc(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.query("call fabc_spec_select(	")
			.query("   :fabc_idcd "       , arg.getParamText("fabc_idcd"))
			.query(")						")
		;

		return data.selectForMap();
	}

	public SqlResultMap getPauseSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(max(line_seqn),0) as line_seqn		")
			.query("from work_book_loss									")
			.query("where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			.query("and loss_resn_dvcd = '91'							")
			.query("and edtm is null									")
		;
		return data.selectForMap();
	}

	//일시정지
	public SqlResultMap setPause(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");

		ParamToJson p = new ParamToJson();
		String json = p.Translate(arg, "work_book_json_fields");
		String dvcd = arg.getParamText("pause_dvcd");
		int line_seqn = Integer.parseInt(arg.getParamText("line_seqn"));

		if(line_seqn == 0){
			temp.param
				.query("select ifnull(max(line_seqn),0)+ 1 as line_seqn		")
				.query("from work_book_loss									")
				.query("where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			;
			SqlResultRow seqn = temp.selectForRow();
			temp.clear();

			line_seqn = Integer.parseInt(seqn.getParamText("line_seqn"));
		}

		if(dvcd.equals("1")){
			System.out.println("insert");
			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"				, arg.fixParameter("invc_numb"))

				.update("json_data"				, json)
			;
			data.attach(Action.update);
			data.execute();

			data.param
				.table("work_book_loss")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
				.unique("line_seqn"				, line_seqn)

				.update("sttm"					, arg.getParameter("time"			))
				.update("loss_resn_dvcd"		, arg.getParameter("loss_resn_dvcd"	))

				.update("line_levl"				, arg.getParameter("line_levl")) /* ROW레벨 */
				.update("line_ordr"				, arg.getParameter("line_ordr")) /* ROW순서 */
				.update("line_stat"				, arg.getParameter("line_stat")) /* ROW상태 */
				.update("line_clos"				, arg.getParameter("line_clos")) /* 마감여부 */
				.update("updt_user_name"		, arg.getParameter("updt_user_name")) /* 수정사용자명 */
				.update("updt_ipad"				, arg.getParameter("updt_ipad")) /* 수정IP */
				.update("updt_idcd"				, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_urif"				, arg.getParameter("updt_urif")) /* 수정UI */
				.insert("crte_user_name"		, arg.getParameter("crte_user_name")) /* 생성사용자명 */
				.insert("crte_ipad"				, arg.getParameter("crte_ipad")) /* 생성IP */
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
				.insert("crte_idcd"				, arg.getParameter("crte_idcd")) /* 생성ID */
				.insert("crte_urif"				, arg.getParameter("crte_urif")) /* 생성UI */
			;
			data.attach(Action.insert);
			data.execute();
		}else{
			System.out.println("update");
			data.param
				.table("work_book_loss")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
				.unique("line_seqn"				, line_seqn	)

				.update("edtm"					, arg.getParameter("time"			))

				.update("line_levl"				, arg.getParameter("line_levl")) /* ROW레벨 */
				.update("line_ordr"				, arg.getParameter("line_ordr")) /* ROW순서 */
				.update("line_stat"				, arg.getParameter("line_stat")) /* ROW상태 */
				.update("line_clos"				, arg.getParameter("line_clos")) /* 마감여부 */
				.update("updt_user_name"		, arg.getParameter("updt_user_name")) /* 수정사용자명 */
				.update("updt_ipad"				, arg.getParameter("updt_ipad")) /* 수정IP */
				.update("updt_idcd"				, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_urif"				, arg.getParameter("updt_urif")) /* 수정UI */
				.insert("crte_user_name"		, arg.getParameter("crte_user_name")) /* 생성사용자명 */
				.insert("crte_ipad"				, arg.getParameter("crte_ipad")) /* 생성IP */
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
				.insert("crte_idcd"				, arg.getParameter("crte_idcd")) /* 생성ID */
				.insert("crte_urif"				, arg.getParameter("crte_urif")) /* 생성UI */
			;
			data.attach(Action.update);
			data.execute();

			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"				, arg.fixParameter("invc_numb"		))

				.update("json_data"				, json)
			;
			data.attach(Action.update);
			data.execute();
		}
		return null;

	}
	public SqlResultMap getCnt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_numb    , a.line_seqn    , a.wkct_idcd    , a.cvic_idcd	")
			.query("from pror_item a														")
			.query("where 1=1																")
			.query("and cvic_idcd = :cvic_idcd", arg.getParameter("cvic_idcd"))
			.query("and prog_stat_dvcd = '1'												")
		;
		return data.selectForMap();
	}
}
