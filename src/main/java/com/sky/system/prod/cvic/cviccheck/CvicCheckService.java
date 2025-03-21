package com.sky.system.prod.cvic.cviccheck;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class CvicCheckService extends DefaultServiceHandler{

	// search
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

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
			.query("        , a.cvic_usge         , a.puch_amnt        , a.make_natn_bacd    , f.chek_type_name	")
			.query("        , a.cvic_type         , a.make_cmpy_name   , a.prod_abty         , a.chek_type_idcd	")
			.query("        , a.cvic_imge_1fst    , a.cvic_imge_2snd   , a.cstm_idcd         , a.cstm_burd_rate	")
			.query("        , a.norm_ivst_date    , a.succ_date        , a.succ_cstm_idcd    , a.chek_ccle_dvcd	")
			.query("        , a.rnmt_dvcd         , a.sral_numb        , a.labo_rate_idcd    , e.labo_rate_name	")
			.query("        , b.dept_name         , c.wkct_name        , d.cstm_name							")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , (select m.clss_name from clss_mast m where m.clss_idcd							")
			.query("			= ifnull(a.scls_idcd, ifnull(a.mcls_idcd, a.lcls_idcd))) as clss_name			")
		;
		data.param
			.query("from    cvic_mast a																			")
			.query("left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd								")
			.query("left outer join wkct_mast c on a.wkct_idcd = c.wkct_idcd									")
			.query("left outer join cstm_mast d on a.puch_cstm_idcd = d. cstm_idcd								")
			.query("left outer join labo_rate e on a.labo_rate_idcd = e. labo_rate_idcd							")
			.query("left outer join cvic_chck_type f on f.chek_type_idcd = a.chek_type_idcd						")
			.query("left outer join cvic_chck cc on a.cvic_idcd = cc.cvic_idcd						")
			.query("left outer join clss_mast m on a.lcls_idcd = m.clss_idcd						")
			.query("left outer join clss_mast n on a.mcls_idcd = n.clss_idcd						")
			.query("left outer join clss_mast l on a.scls_idcd = l.clss_idcd						")
			.query("where	1=1																					")
			.query("and		a.find_name	like %:find_name%  "	, arg.getParamText("find_name"))
			.query("and		cc.chek_date  >= :chek1_date"		, arg.getParamText("chek1_date" ))
			.query("and		cc.chek_date  <= :chek2_date" 		, arg.getParamText("chek2_date" ))
			.query("and     a.cvic_kind_dvcd =:cvic_kind_dvcd"  , arg.getParamText("cvic_kind_dvcd"))
			.query("and     a.cvic_stat_dvcd =:cvic_stat_dvcd"  , arg.getParamText("cvic_stat_dvcd"))
			.query("and     a.mngt_dept_idcd =:mngt_dept_idcd"  , arg.getParamText("mngt_dept_idcd"))
			.query("and     a.puch_cstm_idcd =:puch_cstm_idcd"  , arg.getParamText("puch_cstm_idcd"))
			.query("and     m.clss_idcd =:lcls_idcd"            , arg.getParamText("lcls_idcd"))
			.query("and     n.clss_idcd =:mcls_idcd"            , arg.getParamText("mcls_idcd"))
			.query("and     l.clss_idcd =:scls_idcd"            , arg.getParamText("scls_idcd"))
			.query("and     a.wkct_idcd =:wkct_idcd"            , arg.getParamText("wkct_idcd"))
			.query("and		a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("group by a.cvic_idcd																			")
			.query("order by a.cvic_code ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select distinct   a.cvic_idcd          , a.cvic_code         , a.cvic_name          , a.cvic_spec		")
			.query("				, a.modl_name          , a.cvic_stat_dvcd    , a.cvic_kind_dvcd     , a.wkct_idcd		")
			.query("				, a.istl_loct          , a.move_drtr_name    , a.mngt_drtr_idcd     , a.mngt_dept_idcd	")
			.query("				, a.aset_idcd          , a.aset_name         , a.puch_cstm_idcd     , a.puch_cstm_name	")
			.query("				, a.vend_tele_numb     , a.afsv_tele_numb    , a.mchn_numb          , a.puch_date		")
			.query("				, a.cvic_usge          , a.puch_amnt         , a.cvic_type          , a.make_natn_bacd	")
			.query("				, a.make_cmpy_name     , a.prod_abty         , a.cvic_imge_1fst     , a.cvic_imge_2snd	")
			.query("				, a.cstm_idcd          , a.cstm_burd_rate    , a.norm_ivst_date     , a.succ_date		")
			.query("				, a.succ_cstm_idcd     , a.chek_ccle_dvcd    , a.rnmt_dvcd          , b.dept_name		")
			.query("				, c.wkct_name																			")
			.query("				, a.sysm_memo          , a.prnt_idcd         , a.user_memo          , a.line_ordr		")
			.query("				, a.line_stat          , a.line_clos         , a.find_name          , a.updt_user_name	")
			.query("				, a.updt_ipad          , a.updt_dttm         , a.updt_idcd          , a.updt_urif		")
			.query("				, a.crte_user_name     , a.crte_ipad         , a.crte_dttm          , a.crte_idcd		")
			.query("				, a.line_levl          , a.crte_urif													")
		;
		data.param //퀴리문
			.where("from			cvic_mast a																		")
			.where("				left outer join dept_mast b on a.mngt_drtr_idcd = b.dept_code					")
			.where("				left outer join wkct_mast c on a.wkct_idcd = c. wkct_code						")
			.where("				left outer join cvic_chck d on a.cvic_idcd = d.cvic_idcd						")
			.where("where			1=1																				")
			.where("and				a.find_name	like %:find_name%	" , arg.getParameter("find_name"))
			.where("and				d.chek_date  >= :chek1_date		" , arg.getParamText("chek1_date" ))
			.where("and				d.chek_date  <= :chek2_date		" , arg.getParamText("chek2_date" ))
			.where("and				a.cvic_kind_dvcd =:cvic_kind_dvcd", arg.getParamText("cvic_kind_dvcd"))
			.where("and				a.cvic_stat_dvcd =:cvic_stat_dvcd", arg.getParamText("cvic_stat_dvcd"))
			.where("and				a.mngt_dept_idcd =:mngt_dept_idcd", arg.getParamText("mngt_dept_idcd"))
			.where("and				a.puch_cstm_idcd =:puch_cstm_idcd", arg.getParamText("puch_cstm_idcd"))
			.where("and				a.wkct_idcd =:wkct_idcd"          , arg.getParamText("wkct_idcd"))
			.where("and				a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by		a.cvic_code"																	)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	// detail
	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.cvic_idcd         , a.line_seqn        , a.chek_dvcd         , a.chek_name		")
			.query("		, a.chek_date         , a.nxrm_chek_date   , a.chek_resn         , a.work_dvcd		")
			.query("		, a.work_dvcd         , a.remk_text        , b.dmge_regn							")
			.query("		, b.repa_entr_name    , b.repa_need_time   , b.repa_sbsc_name    , b.repa_cont		")
			.query("		, b.need_amnt         , c.cvic_name													")
			.query("		, a.sysm_memo         , a.prnt_idcd         , a.user_memo       , a.line_ordr		")
			.query("		, a.line_stat         , a.line_clos         , a.find_name       , a.updt_user_name	")
			.query("		, a.updt_ipad         , a.updt_dttm         , a.updt_idcd       , a.updt_urif		")
			.query("		, a.crte_user_name    , a.crte_ipad         , a.crte_dttm       , a.crte_idcd		")
			.query("		, a.line_levl         , a.crte_urif												")
		;
		data.param //퀴리문
			.where("from		cvic_chck a																		")
			.where("			left outer join cvic_dmge b on a.cvic_idcd = b.cvic_idcd and a.line_seqn = b.line_seqn	")
			.where("			left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd						")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.cvic_idcd = :cvic_idcd        " , arg.getParameter("cvic_idcd"				))
//			.where("and			a.line_seqn = :line_seqn        " , arg.getParameter("line_seqn"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.line_seqn"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as line_seqn																")
		;
		data.param
			.where("from		cvic_chck a   																	")
			.where("where		1=1																				")
			.where("and			a.cvic_idcd = :cvic_idcd		" , arg.getParameter("cvic_idcd"				))
			.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("cvic_chck")
					.where("where cvic_idcd	= :cvic_idcd")
					.where("and   line_seqn	= :line_seqn")

					.unique("cvic_idcd"			, row.fixParameter("cvic_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					;data.attach(Action.delete);
				;
				data.param
					.table("cvic_dmge")
					.where("where cvic_idcd	= :cvic_idcd")
					.where("and   line_seqn	= :line_seqn")

					.unique("cvic_idcd"			, row.fixParameter("cvic_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					;data.attach(Action.delete);
				;
			} else {
				data.param
					.table("cvic_chck")
					.where("where cvic_idcd	= :cvic_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("cvic_idcd"				, row.fixParameter("cvic_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("chek_dvcd"				, row.getParameter("chek_dvcd"))
					.update("chek_name"				, row.getParameter("chek_name"))
					.update("chek_resn"				, row.getParameter("chek_resn"))
					.update("chek_date"				, row.getParameter("chek_date"))
					.update("nxrm_chek_date"		, row.getParameter("nxrm_chek_date"))

					.update("find_name"				, row.getParameter("cvic_idcd")
													+ " "
													+ row.fixParameter("chek_name"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				data.clear();
				data.param
					.table("cvic_dmge")
					.where("where cvic_idcd	= :cvic_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("cvic_idcd"				, row.fixParameter("cvic_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("repa_date"				, row.getParameter("repa_date"))
					.update("repa_entr_name"		, row.getParameter("repa_entr_name"))
					.update("repa_need_time"		, row.getParameter("repa_need_time"))
					.update("repa_resn_dvcd"		, row.getParameter("repa_resn_dvcd"))
					.update("repa_sbsc_name"		, row.getParameter("repa_sbsc_name"))
					.update("repa_cont"				, row.getParameter("repa_cont"))
					.update("need_amnt"				, row.getParameter("need_amnt"))
					.update("dmge_regn"				, row.getParameter("dmge_regn"))

					.update("find_name"				, row.getParameter("cvic_idcd"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
		}
		data.execute();
		return null ;
	}
}
