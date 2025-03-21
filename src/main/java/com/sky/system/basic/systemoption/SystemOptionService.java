package com.sky.system.basic.systemoption;

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
public class SystemOptionService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																					")
			.query("           a.prjt_idcd      , a.optn_idcd       , a.hqof_idcd       , a.optn_name		")
			.query("         , a.clss_1fst      , a.clss_2snd       , a.clss_3trd       , a.optn_desc		")
			.query("         , a.optn_logc_valu , a.optn_yorn_valu  , a.optn_nmbr_valu  , a.optn_char_valu	")
			.query("         , a.optn_scpe_from , a.optn_scpe_util  , a.optn_etcc       , a.code_idcd		")
			.query("         , a.sysm_optn_dvcd																")
			.query("         , a.user_memo      , a.sysm_memo       , a.prnt_idcd							")
			.query("         , a.line_levl      , a.line_ordr       , a.line_stat       , a.line_clos		")
			.query("         , a.find_name      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm		")
			.query("         , a.updt_idcd      , a.updt_urif       , a.crte_user_name  , a.crte_ipad		")
			.query("         , a.crte_dttm      , a.crte_idcd       , a.crte_urif							")
		;
		data.param //퀴리문
			.where("from    optn_mast a																		")
			.where("where	1=1																				")
			.where("and     a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and     a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.prjt_idcd")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("optn_mast")
					.where("where prjt_idcd  = :prjt_idcd")
					.where("and optn_idcd  = :optn_idcd")
					.where("and hqof_idcd  = :hqof_idcd")

					.unique("prjt_idcd"			, row.fixParameter("prjt_idcd"		))
					.unique("optn_idcd"			, row.fixParameter("optn_idcd"		))
					.unique("hqof_idcd"			, row.fixParameter("hqof_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("optn_mast")
					.where("where prjt_idcd	= :prjt_idcd" )
					.where("and optn_idcd	= :optn_idcd" )
					.where("and hqof_idcd	= :hqof_idcd" )

					.unique("prjt_idcd"			, row.fixParameter("prjt_idcd"))
					.unique("optn_idcd"			, row.fixParameter("optn_idcd"))
					.unique("hqof_idcd"			, row.fixParameter("hqof_idcd"))

					.update("optn_name"			, row.getParameter("optn_name"))
					.update("clss_1fst"			, row.getParameter("clss_1fst"))
					.update("clss_2snd"			, row.getParameter("clss_2snd"))
					.update("clss_3trd"			, row.getParameter("clss_3trd"))
					.update("optn_desc"			, row.getParameter("optn_desc"))
					.update("sysm_optn_dvcd"	, row.getParameter("sysm_optn_dvcd"))
					.update("optn_logc_valu"	, row.getParameter("optn_logc_valu"))
					.update("optn_yorn_valu"	, row.getParameter("optn_yorn_valu"))
					.update("optn_nmbr_valu"	, row.getParameter("optn_nmbr_valu"))
					.update("optn_char_valu"	, row.getParameter("optn_char_valu"))
					.update("optn_scpe_from"	, row.getParameter("optn_scpe_from"))
					.update("optn_scpe_util"	, row.getParameter("optn_scpe_util"))
					.update("optn_etcc"			, row.getParameter("optn_etcc"))
					.update("code_idcd"			, row.getParameter("code_idcd"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("optn_idcd")
												+ "	"
												+ row.fixParameter("optn_name"))
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

	public SqlResultMap setReset(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.query("call system_option_init (			")
			.query("   :STOR   "  , hq	)  // Invoice 번호
			.query(" ) 								")

		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
}
