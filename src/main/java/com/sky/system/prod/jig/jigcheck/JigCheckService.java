package com.sky.system.prod.jig.jigcheck;

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
public class JigCheckService extends DefaultServiceHandler{

	// search
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		System.out.println("row : "+rows);
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.jigg_idcd         , a.jigg_code        , a.jigg_name      , a.jigg_spec			")
			.query("        , a.jigg_stat_dvcd  , a.jigg_kind_dvcd   , a.wkct_idcd      , a.mngt_drtr_idcd		")
			.query("        , a.mngt_dept_idcd  , a.aset_idcd        , a.aset_name      , a.puch_cstm_idcd		")
			.query("        , a.puch_cstm_name  , a.vend_tele_numb   , a.afsv_tele_numb , a.sral_numb_strt		")
			.query("        , a.sral_numb_endd  , a.jigg_qntt        , a.puch_date      , a.norm_ivst_date		")
			.query("        , a.jigg_usge       , a.puch_amnt        , a.dsse_date      , a.dsse_resn			")
			.query("        , a.imge_1fst       , a.imge_2snd        , a.chek_ccle_dvcd , a.cvic_type_dvcd		")
			.query("        , a.cvic_abty       , b.dept_name								")
			.query("        , a.user_memo       , a.sysm_memo        , a.prnt_idcd      , a.crte_urif 			")
			.query("        , a.line_stat       , a.line_clos        , a.find_name      , a.updt_user_name		")
			.query("        , a.updt_ipad       , a.updt_dttm        , a.updt_idcd      , a.updt_urif			")
			.query("        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm      , a.crte_idcd			")

		;
		data.param //퀴리문
			.where("from      jigg_mast a   																		")
			.where("		left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd							")
			.where("where     1=1																					")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and			a.jigg_idcd = :jigg_idcd		" , arg.getParameter("jigg_idcd"					))
			.where("and			b.dept_name = :dept_name		" , arg.getParameter("dept_name"					))
			.where("and			a.jigg_idcd in(select jigg_idcd from jigg_chck where repa_date >= :chek1_date " , arg.getParamText("chek1_date" 	))
			.where("and			repa_date	<= :chek2_date group by mold_idcd)",arg.getParamText("chek2_date" 		))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat"	)))
			.where("order by	a.jigg_idcd"																		)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// Detailsearch
	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.jigg_idcd       , a.line_seqn      , a.chek_dvcd      , a.chek_name			")
			.query("		, a.chek_date       , a.nxrm_chek_date , a.chek_resn      , a.repa_date			")
			.query("		, a.repa_entr_name  , a.repa_need_time , a.repa_resn_dvcd , a.repa_sbsc_name	")
			.query("		, a.repa_cont       , a.need_amnt      , a.dmge_regn      , a.remk_text			")
			.query("		, a.trtm_dvcd       , a.uper_seqn      , a.disp_seqn							")
			.query("        , a.user_memo       , a.sysm_memo      , a.prnt_idcd      , a.crte_urif 		")
			.query("        , a.line_stat       , a.line_clos      , a.find_name      , a.updt_user_name	")
			.query("        , a.updt_ipad       , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.query("        , a.crte_user_name  , a.crte_ipad      , a.crte_dttm      , a.crte_idcd			")
		;
		data.param //퀴리문
			.where("from		jigg_chck a left outer join jigg_mast b on a.jigg_idcd = b.jigg_idcd				")
			.where("where		1=1																					")
			.where("and			a.jigg_idcd = :jigg_idcd        " , arg.getParameter("jigg_idcd")					 )
			.where("order by	a.line_seqn																			")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("jigg_chck")
					.where("where jigg_idcd	= :jigg_idcd")
					.where("and   line_seqn	= :line_seqn")

					.unique("jigg_idcd"			, row.fixParameter("jigg_idcd"		))
					.update("line_stat"			, 2									)
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("jigg_chck")
					.where("where jigg_idcd	= :jigg_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("jigg_idcd"				, row.fixParameter("jigg_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("chek_dvcd"				, row.getParameter("chek_dvcd"))
					.update("chek_name"				, row.getParameter("chek_name"))
					.update("chek_date"				, row.getParameter("chek_date"))
					.update("nxrm_chek_date"		, row.getParameter("nxrm_chek_date"))
					.update("chek_resn"				, row.getParameter("chek_resn"))
					.update("repa_date"				, row.getParameter("repa_date"))
					.update("repa_entr_name"		, row.getParameter("repa_entr_name"))
					.update("repa_need_time"		, row.getParameter("repa_need_time"))
					.update("repa_resn_dvcd"		, row.getParameter("repa_resn_dvcd"))
					.update("repa_sbsc_name"		, row.getParameter("repa_sbsc_name"))
					.update("need_amnt"				, row.getParameter("need_amnt"))
					.update("repa_cont"				, row.getParameter("repa_cont"))
					.update("dmge_regn"				, row.getParameter("dmge_regn"))
					.update("remk_text"				, row.getParameter("remk_text"))
					.update("trtm_dvcd"				, row.getParameter("trtm_dvcd"))
					.update("uper_seqn"				, row.getParameter("uper_seqn"))
					.update("disp_seqn"				, row.getParameter("disp_seqn"))

					.update("find_name"				, row.getParameter("jigg_idcd")
													+ " "
													+ row.fixParameter("repa_date"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("jigg_mast")
					.where("where jigg_idcd  = :jigg_idcd")

					.unique("jigg_idcd"			, row.fixParameter("jigg_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("jigg_mast")
					.where("where jigg_idcd	= :jigg_idcd" )

					.unique("jigg_idcd"				, row.fixParameter("jigg_idcd"))

					.update("jigg_code"				, row.getParameter("jigg_code"))
					.update("jigg_name"				, row.getParameter("jigg_name"))
					.update("jigg_spec"				, row.getParameter("jigg_spec"))
					.update("jigg_stat_dvcd"		, row.getParameter("jigg_stat_dvcd"))
					.update("jigg_kind_dvcd"		, row.getParameter("jigg_kind_dvcd"))
					.update("wkct_idcd"				, row.getParameter("wkct_idcd"))
					.update("mngt_drtr_idcd"		, row.getParameter("mngt_drtr_idcd"))
					.update("mngt_dept_name"		, row.getParameter("mngt_dept_name"))
					.update("aset_idcd"				, row.getParameter("aset_idcd"))
					.update("aset_name"				, row.getParameter("aset_name"))
					.update("puch_cstm_idcd"		, row.getParameter("puch_cstm_idcd"))
					.update("puch_cstm_name"		, row.getParameter("puch_cstm_name"))
					.update("vend_tele_numb"		, row.getParameter("vend_tele_numb"))
					.update("afsy_tele_numb"		, row.getParameter("afsy_tele_numb"))
					.update("sral_numb_strt"		, row.getParameter("sral_numb_strt"))
					.update("sral_numb_endd"		, row.getParameter("sral_numb_endd"))
					.update("jigg_qntt"				, row.getParameter("jigg_qntt"))
					.update("puch_date"				, row.getParameter("puch_date"))
					.update("norm_ivst_date"		, row.getParameter("norm_ivst_date"))
					.update("jigg_usge"				, row.getParameter("jigg_usge"))
					.update("puch_amnt"				, row.getParameter("puch_amnt"))
					.update("dsse_date"				, row.getParameter("dsse_date"))
					.update("dsse_resn"				, row.getParameter("dsse_resn"))
					.update("imge_1fst"				, row.getParameter("imge_1fst"))
					.update("imge_2snd"				, row.getParameter("imge_2snd"))
					.update("chek_ccle_dvcd"		, row.getParameter("chek_ccle_dvcd"))
					.update("cvic_tpye_dvcd"		, row.getParameter("cvic_tpye_dvcd"))
					.update("cvic_abty"				, row.getParameter("cvic_abty"))
					.update("labo_rate_idcd"		, row.getParameter("labo_rate_idcd"))


					.update("find_name"				, row.getParameter("jigg_code")
													+ " "
													+ row.fixParameter("jigg_name"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
