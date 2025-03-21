package com.sky.system.qc.inptype;

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
public class InspTypeService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																					")
			.query("          a.insp_type_idcd  ,a.insp_type_code   ,a.insp_type_name   ,a.insp_mthd_dvcd	")
			.query("         ,a.smor_rate       ,a.wkct_insp_yorn   ,a.rcpt_insp_yorn   ,a.last_insp_yorn	")
			.query("         ,a.shpm_insp_yorn  ,a.insp_cond        ,a.wkct_idcd							")
			.query("         ,a.user_memo       ,a.sysm_memo        ,a.prnt_idcd							")
			.query("         ,a.line_levl       ,a.line_ordr        ,a.line_stat            ,a.line_clos	")
			.query("         ,a.find_name       ,a.updt_user_name   ,a.updt_ipad            ,a.updt_dttm	")
			.query("         ,a.updt_idcd       ,a.updt_urif        ,a.crte_user_name       ,a.crte_ipad	")
			.query("         ,a.crte_dttm       ,a.crte_idcd        ,a.crte_urif							")
			.query("         ,w.wkct_code       ,w.wkct_name												")

			;
		data.param //퀴리문
			.where("from	insp_type_mast a																")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd								")
			.where("where	1=1																				")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.insp_type_name	like %:insp_type_name%"	, arg.getParameter("insp_type_name"))
			.where("and		substring(a.crte_dttm,1,8)	>= :fr_date " , arg.getParamText("fr_date" ))
			.where("and		substring(a.crte_dttm,1,8)	<= :re_date " , arg.getParamText("re_date" ))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.insp_type_code																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// filesearch
		public SqlResultMap getFileSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");
			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.orgn_dvcd       , a.invc_numb      , a.line_seqn        , a.assi_seqn			")
				.query("		, a.path_name       , a.file_name      , a.file_size        , a.upld_dttm			")
				.query("		, a.remk_text       , a.uper_seqn      , a.disp_seqn								")
			;
			data.param //퀴리문
				.where("from		apnd_file a																		")
				.where("where		1=1																				")
				.where("and			a.invc_numb = :insp_type_idcd        " , arg.getParameter("insp_type_idcd"				))
				.where("and			a.orgn_dvcd = :orgn_dvcd","insp_type_mast")												// 받아서 처리해야함
				.where("order by	a.line_seqn																		")
			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}

	/**
	 * 상품기초정보 조회
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																					")
			.query("		  a.insp_type_idcd	,a.insp_type_code	,a.insp_type_name	,a.insp_mthd_dvcd	")
			.query("		 ,a.smor_rate		,a.wkct_insp_yorn	,a.rcpt_insp_yorn	,a.last_insp_yorn	")
			.query("		 ,a.shpm_insp_yorn	,a.insp_cond												")
			.query("		 ,a.user_memo		,a.sysm_memo		,a.prnt_idcd							")
			.query("		 ,a.line_levl		,a.line_ordr		,a.line_stat		,a.line_clos		")
			.query("		 ,a.find_name		,a.updt_user_name	,a.updt_ipad		,a.updt_dttm		")
			.query("		 ,a.updt_idcd		,a.updt_urif		,a.crte_user_name	,a.crte_ipad		")
			.query("		 ,a.crte_dttm		,a.crte_idcd		,a.crte_urif							")
		;
		data.param //퀴리문
			.where("from	insp_type_mast a																")
			.where("where	1=1																				")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.insp_type_name	like %:insp_type_name%"	, arg.getParameter("insp_type_name"))
			.where("and		a.wkct_insp_yorn = :wkct_insp_yorn"         , arg.getParameter("wkct_insp_yorn"))
			.where("and		a.rcpt_insp_yorn = :rcpt_insp_yorn"         , arg.getParameter("rcpt_insp_yorn"))
			.where("and		a.last_insp_yorn = :last_insp_yorn"         , arg.getParameter("last_insp_yorn"))
			.where("and		a.shpm_insp_yorn = :shpm_insp_yorn"         , arg.getParameter("shpm_insp_yorn"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.insp_type_code																")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("insp_type_mast")
					.where("where insp_type_idcd  = :insp_type_idcd")

					.unique("insp_type_idcd"	, row.fixParameter("insp_type_idcd"		))
					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);


			} else {
				data.param
					.table("insp_type_mast")
					.where("where insp_type_idcd	= :insp_type_idcd" )

					.unique("insp_type_idcd"	, row.fixParameter("insp_type_idcd"))

					.update("insp_type_code"	, row.getParameter("insp_type_code"))
					.update("insp_type_name"	, row.getParameter("insp_type_name"))
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"))
					.update("smor_rate"			, row.getParameter("smor_rate"))
					.update("insp_mthd_dvcd"	, row.getParameter("insp_mthd_dvcd"))
					.update("wkct_insp_yorn"	, row.getParameter("wkct_insp_yorn"))
					.update("rcpt_insp_yorn"	, row.getParameter("rcpt_insp_yorn"))
					.update("last_insp_yorn"	, row.getParameter("last_insp_yorn"))
					.update("shpm_insp_yorn"	, row.getParameter("shpm_insp_yorn"))
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("insp_cond"			, row.getParameter("insp_cond"))
					.update("find_name"			, row.getParameter("insp_type_name")
												+ "	"
												+ row.fixParameter("insp_type_idcd"))
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
