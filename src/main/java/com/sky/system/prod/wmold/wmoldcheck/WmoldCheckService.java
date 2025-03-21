package com.sky.system.prod.wmold.wmoldcheck;

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
public class WmoldCheckService extends DefaultServiceHandler{

	// search
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.mold_code         , a.mold_name        , a.mold_spec        , a.puch_date			")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.puch_cstm_name   , a.mold_idcd			")
			.query("        , a.egrv_numb         , a.make_date        , a.dsse_resn        , a.rcpt_cmpy_name		")
			.query("        , a.mngt_dept_idcd    , a.stor_plac														")
			.query("        , a.dsse_date         , a.owne_riht        , a.norm_yorn        , a.puch_cstm_idcd		")
			.query("        , a.puch_amnt         , a.make_natn_idcd   , a.make_cmpy_name   , a.remk_text			")
			.query("        , a.cavity            , a.mold_edtn_numb   , a.dsig_shot        , a.init_shot			")
			.query("        , a.work_shot         , a.totl_shot        , a.updt_expc_shot   , a.updt_expc_date		")
			.query("        , a.ejac_mchn         , a.runr_wigt        , a.prod_wigt        , a.cycl_time			")
			.query("        , a.mtrl_bacd         , a.mtrl_bacd_2snd   , a.mold_grad_bacd   , a.mold_grad_bacd_2snd		")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd        , a.crte_urif 			")
			.query("        , a.line_stat         , a.line_clos        , a.find_name        , a.updt_user_name		")
			.query("        , a.updt_ipad         , a.updt_dttm        , a.updt_idcd        , a.updt_urif			")
			.query("        , a.crte_user_name    , a.crte_ipad        , a.crte_dttm        , a.crte_idcd			")
			.query("        , a.used_tons         , a.cvic_usge        , a.item_idcd		, b.item_name			")
			.query("        , a.mchn_numb         , a.insp_type_idcd												")
			.query("        , d.dept_name         , a.mold_stat_dvcd   , c.cstm_name								")
			.query("        , (select base_name from base_mast r where a.make_natn_idcd  = r.base_code				")
			.query("                                          and   r.prnt_idcd = '1202')   as make_natn_name		")
			.query("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code					")
			.query("                                          and   r.prnt_idcd = '3101')   as mtrl_name			")
			.query("        , (select base_name from base_mast r where a.mtrl_bacd_2snd  = r.base_code				")
			.query("                                          and   r.prnt_idcd = '3101')   as mtrl_2snd_name		")
			.query("        , (select base_name from base_mast r where a.mold_grad_bacd  = r.base_code				")
			.query("                                          and   r.prnt_idcd = '3105')   as mold_grad_name		")
			.query("        , (select base_name from base_mast r where a.mold_grad_bacd_2snd  = r.base_code			")
			.query("                                          and   r.prnt_idcd = '3105')   as mold_grad_2snd_name	")
		;
		data.param //퀴리문
			.where("from      mold_mast a																			")
			.where("left outer join item_mast b on a.item_idcd = b.item_idcd										")
			.where("left outer join dept_mast d on a.mngt_dept_idcd = d.dept_idcd									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("where     1=1																					")
			.where("and       a.find_name	like %:find_name% " , arg.getParameter("find_name"						))
			.where("and       a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd"						))
			.where("and       a.mngt_dept_idcd = :mngt_dept_idcd        " , arg.getParameter("mngt_dept_idcd"		))
			.where("and       a.mold_idcd in(select mold_idcd from mold_repa where repa_date >= :chek1_date " , arg.getParamText("chek1_date" 	))
			.where("and       repa_date	<= :chek2_date group by mold_idcd)",arg.getParamText("chek2_date" 			))
			.where("and       a.puch_date >= :puch_date1   " , arg.getParamText("from_date" ))
			.where("and       a.puch_date <= :puch_date2   " , arg.getParamText("to_date" ))
			.where("and       a.line_stat	< :line_stat      " , "2" , "".equals(arg.getParamText("line_stat"		)))
			.where("order by  a.mold_idcd																			")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// Detail1search
	public SqlResultMap getDetailSearch1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.mold_idcd     , a.line_seqn      , a.repa_date        , a.repa_cont			")
			.query("		, a.repa_resn     , a.repa_entr_name , a.repa_need_time   , a.need_amnt			")
			.query("		, a.init_shot     , a.updt_expc_shot , a.uper_seqn        , a.disp_seqn			")
			.query("		, b.totl_shot     , a.user_memo      , a.sysm_memo        , b.mold_stat_dvcd	")
			.query("		, a.prnt_idcd     , a.line_levl      , a.line_ordr        , a.line_stat			")
			.query("		, a.line_clos     , a.find_name      , a.updt_user_name   , a.updt_ipad			")
			.query("		, a.updt_dttm     , a.updt_idcd      , a.updt_urif        , a.crte_user_name	")
			.query("		, a.crte_ipad     , a.crte_dttm      , a.crte_idcd        , a.crte_urif			")
		;
		data.param //퀴리문
			.where("from		mold_repa a left outer join mold_mast b on a.mold_idcd = b.mold_idcd		")
			.where("where		1=1																			")
			.where("and			a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd")			 )
			.where("order by	a.line_seqn																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// Detail2search
	public SqlResultMap getDetailSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.mold_idcd      , a.line_seqn      , a.chek_date     , a.chek_time		")
			.query("        , a.dept_idcd      , a.drtr_idcd      , a.base_clen     , a.lbct_appl		")
			.query("        , a.airr_clen      , a.core_clen      , a.core_rust     , a.remk_text		")
			.query("        , a.uper_seqn      , a.disp_seqn											")
			.query("        , a.user_memo      , a.sysm_memo      , a.prnt_idcd     , a.line_levl		")
			.query("        , a.line_ordr      , a.line_stat      , a.line_clos     , a.find_name		")
			.query("        , a.updt_ipad      , a.updt_dttm      , a.updt_idcd     , a.updt_urif		")
			.query("        , a.crte_ipad      , a.crte_dttm      , a.crte_idcd     , a.crte_urif		")
			.query("        , d.dept_name      , u.user_name as drtr_name								")
		;
		data.param //퀴리문
			.where("from  mold_chck a																	")
			.where("left  outer join dept_mast d on a.dept_idcd = d.dept_idcd							")
			.where("left  outer join user_mast u on a.drtr_idcd = u.user_idcd							")
			.where("where 1=1																			")
			.where("and   a.mold_idcd = :mold_idcd" , arg.getParameter("mold_idcd"))
			.where("order by a.line_seqn																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSeqn1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as line_seqn																")
		;
		data.param
			.where("from		mold_repa a   																	")
			.where("where		1=1																				")
			.where("and			a.mold_idcd = :mold_idcd		" , arg.getParameter("mold_idcd"				))
			.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSeqn2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as line_seqn																")
		;
		data.param
			.where("from		mold_chck a   																	")
			.where("where		1=1																				")
			.where("and			a.mold_idcd = :mold_idcd		" , arg.getParameter("mold_idcd"				))
			.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}


	public SqlResultMap setDetail1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mold_repa")
					.where("where mold_idcd	= :mold_idcd")
					.where("and   line_seqn	= :line_seqn")

					.unique("mold_idcd"			, row.fixParameter("mold_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("mold_repa")
					.where("where mold_idcd	= :mold_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("mold_idcd"				, row.fixParameter("mold_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("repa_date"				, row.getParameter("repa_date"))
					.update("repa_cont"				, row.getParameter("repa_cont"))
					.update("repa_resn"				, row.getParameter("repa_resn"))
					.update("repa_entr_name"		, row.getParameter("repa_entr_name"))
					.update("repa_need_time"		, row.getParameter("repa_need_time"))
					.update("need_amnt"				, row.getParameter("need_amnt"))
					.update("init_shot"				, row.getParameter("init_shot"))
					.update("updt_expc_shot"		, row.getParameter("updt_expc_shot"))
					.update("updt_expc_date"		, row.getParameter("updt_expc_date"))
					.update("uper_seqn"				, row.getParameter("uper_seqn"))
					.update("disp_seqn"				, row.getParameter("disp_seqn"))
					.update("user_memo"				, row.getParameter("user_memo"))

					.update("find_name"				, row.getParameter("mold_idcd")
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
				data.execute();


				data.clear();
				data.param
				.table("mold_mast")
				.where("where mold_idcd	= :mold_idcd" )

				.unique("mold_idcd"				, row.fixParameter("mold_idcd"))

				.update("totl_shot"				, row.getParameter("totl_shot"))
				.update("mold_stat_dvcd"		, row.getParameter("mold_stat_dvcd"))

			;data.attach(Action.modify);
			data.execute();
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setDetail2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mold_chck")
					.where("where mold_idcd = :mold_idcd")
					.where("and   line_seqn = :line_seqn")

					.unique("mold_idcd"			, row.fixParameter("mold_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("mold_chck")
					.where("where mold_idcd = :mold_idcd" )
					.where("and   line_seqn = :line_seqn" )

					.unique("mold_idcd"				, row.fixParameter("mold_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("chek_date"				, row.getParameter("chek_date"))
					.update("chek_time"				, row.getParameter("chek_time"))
					.update("dept_idcd"				, row.getParameter("dept_idcd"))
					.update("drtr_idcd"				, row.getParameter("drtr_idcd"))
					.update("base_clen"				, row.getParameter("base_clen"))
					.update("lbct_appl"				, row.getParameter("lbct_appl"))
					.update("airr_clen"				, row.getParameter("airr_clen"))
					.update("core_clen"				, row.getParameter("core_clen"))
					.update("core_rust"				, row.getParameter("core_rust"))
					.update("remk_text"				, row.getParameter("remk_text"))
					.update("uper_seqn"				, row.getParameter("uper_seqn"))
					.update("disp_seqn"				, row.getParameter("disp_seqn"))

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
