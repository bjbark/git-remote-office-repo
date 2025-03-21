package com.sky.system.prod.cvic.cvicchecktype;

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
public class CvicCheckTypeService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select     a.chek_type_idcd  , a.chek_type_code  , a.chek_type_name      , a.chek_mthd_dvcd		")
			.query("         , a.chek_cond																			")
			.query("         , a.user_memo       , a.sysm_memo       , a.prnt_idcd									")
			.query("         , a.line_levl       , a.line_ordr       , a.line_stat           , a.line_clos			")
			.query("         , a.find_name       , a.updt_user_name  , a.updt_ipad           , a.updt_dttm			")
			.query("         , a.updt_idcd       , a.updt_urif       , a.crte_user_name      , a.crte_ipad			")
			.query("         , a.crte_dttm       , a.crte_idcd       , a.crte_urif									")

			;
		data.param //퀴리문
			.where("from cvic_chck_type a																			")
			.where("where   1=1																						")
			.where("and     a.find_name like %:find_name%"	, arg.getParameter("find_name"))
			.where("and     a.line_stat = :line_stat"		, arg.getParamText("line_stat"))
			.where("and     a.line_stat < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.chek_type_code																		")
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
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select     a.chek_type_idcd  , a.chek_type_code  , a.chek_type_name      , a.chek_mthd_dvcd		")
			.query("         , a.chek_cond																			")
			.query("         , a.user_memo       , a.sysm_memo       , a.prnt_idcd									")
			.query("         , a.line_levl       , a.line_ordr       , a.line_stat           , a.line_clos			")
			.query("         , a.find_name       , a.updt_user_name  , a.updt_ipad           , a.updt_dttm			")
			.query("         , a.updt_idcd       , a.updt_urif       , a.crte_user_name      , a.crte_ipad			")
			.query("         , a.crte_dttm       , a.crte_idcd       , a.crte_urif									")

			;
		data.param //퀴리문
			.where("from cvic_chck_type a																			")
			.where("where   1=1																						")
			.where("and     a.find_name like %:find_name%"	, arg.getParameter("find_name"))
			.where("and     a.line_stat = :line_stat"		, arg.getParamText("line_stat"))
			.where("and     a.line_stat < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.chek_type_code																		")
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
					.table("cvic_chck_type")
					.where("where chek_type_idcd = :chek_type_idcd")

					.unique("chek_type_idcd"	, row.fixParameter("chek_type_idcd"))

					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.update);
			} else {
				data.param
					.table("cvic_chck_type")
					.where("where chek_type_idcd	= :chek_type_idcd" )

					.unique("chek_type_idcd"	, row.fixParameter("chek_type_idcd"))

					.update("chek_type_code"	, row.getParameter("chek_type_code"))
					.update("chek_type_name"	, row.getParameter("chek_type_name"))
					.update("chek_mthd_dvcd"	, row.getParameter("chek_mthd_dvcd"))
					.update("chek_cond"			, row.getParameter("chek_cond"))

					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("chek_type_code")
												+ "	"
												+ row.fixParameter("chek_type_name"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("insp_cond"			, row.getParameter("insp_cond"))
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
