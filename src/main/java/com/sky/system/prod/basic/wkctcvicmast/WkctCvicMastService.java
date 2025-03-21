package com.sky.system.prod.basic.wkctcvicmast;

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
public class WkctCvicMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.wkct_idcd        , a.wkct_code   , a.wkct_name   , a.wkct_stnm     , a.bzpl_idcd	")
			.query("		,a.dept_idcd        , a.user_memo   , a.sysm_memo   , a.prnt_idcd					")
			.query("		,a.line_stat        , a.line_clos   , a.find_name   , a.updt_user_name				")
			.query("		,a.updt_ipad        , a.updt_dttm   , a.updt_idcd   , a.updt_urif					")
			.query("		,a.crte_user_name   , a.crte_ipad   , a.crte_dttm   , a.crte_idcd					")
			.query("		,a.crte_urif        , b.dept_name													")
		;
		data.param //퀴리문
			.where("from		wkct_mast a																		")
			.where("			left outer join dept_mast b on a.dept_idcd = b.dept_idcd						")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.wkct_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wkct_idcd        , a.line_seqn         , a.cvic_idcd       , b.cvic_name		")
			.query("		, a.abty_calc_yorn   , a.cvic_stat_dvcd    , a.user_memo       , a.sysm_memo		")
			.query("		, a.prnt_idcd        , a.line_stat         , a.line_clos       , a.find_name		")
			.query("		, a.updt_user_name   , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("		, a.updt_urif        , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("		, a.crte_idcd        , a.crte_urif         , b.cvic_spec							")
			.query("		, b.cvic_stat_dvcd   , b.puch_date         , b.puch_cstm_name  , b.vend_tele_numb	")
			.query("		, b.afsv_tele_numb   , b.mchn_numb         , b.make_cmpy_name  , b.cvic_code		")
		;
		data.param //퀴리문
			.where("from		wkct_cvic a																		")
			.where("			left outer join cvic_mast b on a.cvic_idcd = b.cvic_idcd						")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.wkct_idcd = :wkct_idcd        " , arg.getParameter("wkct_idcd"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	b.cvic_code"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getItem1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select     a.wkct_idcd      , a.line_seqn        , a.cvic_idcd   , b.cvic_name		")
			.query("         , a.abty_calc_yorn , a.cvic_stat_dvcd   , b.cvic_spec   , b.cvic_stat_dvcd	")
			.query("         , b.puch_date      , a.user_memo        , a.sysm_memo   , a.prnt_idcd		")
			.query("         , a.line_stat      , a.line_clos        , a.find_name   , a.updt_user_name	")
			.query("         , a.updt_ipad      , a.updt_dttm        , a.updt_idcd   , a.updt_urif		")
			.query("         , a.crte_user_name , a.crte_ipad        , a.crte_dttm   , a.crte_idcd		")
			.query("         , a.crte_urif      , b.cvic_code											")
		;
		data.param //퀴리문
			.where("from		wkct_cvic a																")
			.where("			left outer join cvic_mast b on a.cvic_idcd = b.cvic_idcd				")
			.where("where		1=1																		")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"		))
			.where("and			a.wkct_idcd = :wkct_idcd        " , arg.getParameter("wkct_idcd"		))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	b.cvic_code																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getItem2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select	   a.cvic_idcd        , a.cvic_name        , a.cvic_spec        , a.modl_name		")
			.query("         , a.cvic_stat_dvcd   , a.cvic_kind_dvcd   , a.wkct_idcd        , a.istl_loct		")
			.query("         , a.move_drtr_name   , a.mngt_drtr_idcd   , a.mngt_dept_idcd   , a.aset_idcd		")
			.query("         , a.aset_name        , a.puch_cstm_idcd   , a.vend_tele_numb   , a.afsv_tele_numb	")
			.query("         , a.mchn_numb        , a.puch_date        , a.cvic_usge        , a.puch_amnt		")
			.query("         , a.cvic_type        , a.make_natn_bacd   , a.make_cmpy_name   , a.prod_abty		")
			.query("         , a.cvic_imge_1fst   , a.cvic_imge_2snd   , a.cstm_idcd        , a.cstm_burd_rate	")
			.query("         , a.norm_ivst_date   , a.succ_date        , a.succ_cstm_idcd   , a.chek_ccle_dvcd	")
			.query("         , a.rnmt_dvcd        , a.user_memo        , a.sysm_memo        , a.prnt_idcd		")
			.query("         , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.query("         , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.query("         , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.query("         , a.crte_urif        , a.cvic_code													")
		;
		data.param //퀴리문
			.where("from        cvic_mast a																		")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("and			a.cvic_idcd not in (select cvic_idcd from wkct_cvic where wkct_idcd = :wkct_idcd)	",arg.getParameter("wkct_idcd"))
			.where("order by	a.cvic_code"																		)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap setItem1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wkct_cvic")
					.where("where wkct_idcd		= :wkct_idcd")
					.where("and   line_seqn		= :line_seqn")

					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					;data.attach(Action.delete);

			} else {
				data.param
					.table("wkct_cvic")
					.where("where wkct_idcd		= :wkct_idcd" )
					.where("and   line_seqn		= :line_seqn")

					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
					.update("cvic_name"			, row.getParameter("cvic_name"))
					.update("cvic_stat_dvcd"	, row.getParameter("cvic_stat_dvcd"))
					.update("abty_calc_yorn"	, row.getParameter("abty_calc_yorn"))

					.update("find_name"			, row.getParameter("wkct_idcd")
												+ " "
												+ row.fixParameter("cvic_idcd")
												+ " "
												+ row.fixParameter("cvic_name")
												)
					.update("line_stat"			, row.getParameter("line_stat"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
