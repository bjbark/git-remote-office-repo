package com.sky.system.prod.basic.wkctmast;

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
public class WkctMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wkct_idcd        , a.wkct_code   , a.wkct_name       , a.wkct_stnm				")
			.query("		, a.dept_idcd        , a.user_memo   , a.sysm_memo       , a.prnt_idcd				")
			.query("		, a.line_stat        , a.line_clos   , a.find_name       , a.updt_user_name			")
			.query("		, a.updt_ipad        , a.updt_dttm   , a.updt_idcd       , a.updt_urif				")
			.query("		, a.crte_user_name   , a.crte_ipad   , a.crte_dttm       , a.crte_idcd				")
			.query("		, a.crte_urif        , b.dept_name   , a.labo_rate_idcd  , c.labo_rate_name			")
			.query("		, a.cstm_idcd        , a.otod_yorn   , d.cstm_name       , a.rslt_rept_yorn			")
			.query("		, a.stok_mngt_yorn   , a.wkct_dvcd													")
			;
		data.param //퀴리문
			.where("from	wkct_mast a																			")
			.where("		left outer join dept_mast b on a.dept_idcd = b.dept_idcd							")
			.where("		left outer join labo_rate c on a.labo_rate_idcd = c.labo_rate_idcd					")
			.where("		left outer join cstm_mast d on a.cstm_idcd = d.cstm_idcd							")
			.where("where   1=1																					")
			.where("and	    a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		;
		if(arg.getParamText("stor_id").equalsIgnoreCase("N1000hjsys1000")||arg.getParamText("stor_id").equalsIgnoreCase("N1000liebe1000")){
			data.param
				.where("order   by	a.wkct_code"																	)
			;
		}else{
			data.param
				.where("order   by	a.wkct_idcd"																	)
			;
		}
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wkct_idcd        , a.wkct_code   , a.wkct_name       , a.wkct_stnm				")
			.query("		, a.dept_idcd        , a.user_memo   , a.sysm_memo       , a.prnt_idcd				")
			.query("		, a.line_stat        , a.line_clos   , a.find_name       , a.updt_user_name			")
			.query("		, a.updt_ipad        , a.updt_dttm   , a.updt_idcd       , a.updt_urif				")
			.query("		, a.crte_user_name   , a.crte_ipad   , a.crte_dttm       , a.crte_idcd				")
			.query("		, a.crte_urif        , b.dept_name   , a.labo_rate_idcd  , a.rslt_rept_yorn			")
		;
		data.param //퀴리문
			.where("from	wkct_mast a																			")
			.where("		left outer join dept_mast b on a.dept_idcd = b.dept_idcd							")
			.where("		left outer join labo_rate c on a.labo_rate_idcd = c.labo_rate_idcd					")
			.where("where	1=1																					")
			.where("and		a.find_name	like %:find_name%		" , arg.getParameter("find_name"				))
			.where("and		a.wkct_idcd = :wkct_idcd			" , arg.getParameter("wkct_idcd"				))
			.where("and		a.rslt_rept_yorn = :rslt_rept_yorn	" , arg.getParameter("rslt_rept_yorn"			))
			.where("and		a.stok_mngt_yorn = :stok_mngt_yorn	" , arg.getParameter("atok_mngt_yorn"			))
			.where("and		a.line_stat < '2'																	")
			.where("order by a.wkct_idcd"																		)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	//룩업
	/*
	 *  검사 공정일 경우 일부 특수한 공정을 추가해 조회할 수 있어 별도의 공정코드(수입검사, 최종검사, 외주 검사 등) LOOK UP 기능을 둔다.
	 *
	 *
	 */
	public SqlResultMap getInspLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   *																					")
		;
		data.param //퀴리문
			.where("from (																						")
			.where("select    a.wkct_idcd    , a.wkct_code   , a.wkct_name       , a.wkct_stnm					")
			.where("		, a.dept_idcd    , b.dept_name														")
			.where("from	wkct_mast a																			")
			.where("		left outer join dept_mast b on a.dept_idcd = b.dept_idcd							")
			.where("where	1=1																					")
			.where("and		a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and		a.wkct_idcd = :wkct_idcd		" , arg.getParameter("wkct_idcd"					))
			.where("and		a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("union all																					")
			.where("select    'z001'     as wkct_idcd															")
			.where("        , 'z001'     as wkct_code															")
			.where("        , '수입검사'   as wkct_name																")
			.where("        , '수입검사'   as wkct_stnm																")
			.where("		, null       as dept_idcd															")
			.where("		, null       as dept_name															")
			.where("from	dual																				")
			.where(") a order by a.wkct_idcd																	")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
	public SqlResultMap getLineOrdr(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
				.query("select  ifnull(max(line_ordr),0)+1 as line_ordr		")
			;
		data.param //퀴리문
				.where("from wkct_mast							")
				.where("where line_stat < 2						")
		;
		return data.selectForMap(); //
	}



	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wkct_mast")
					.where("where wkct_idcd  = :wkct_idcd")

					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("wkct_mast")
					.where("where wkct_idcd	= :wkct_idcd" )

					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"))

					.update("wkct_code"			, row.getParameter("wkct_code"))
					.update("wkct_name"			, row.getParameter("wkct_name"))
					.update("wkct_stnm"			, row.getParameter("wkct_stnm"))
					.update("wkct_dvcd"			, row.getParameter("wkct_dvcd"))
					.update("dept_idcd"			, row.getParameter("dept_idcd"))
					.update("labo_rate_idcd"	, row.getParameter("labo_rate_idcd"))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
					.update("otod_yorn"			, row.getParameter("otod_yorn"))
					.update("rslt_rept_yorn"	, row.getParameter("rslt_rept_yorn"))
					.update("stok_mngt_yorn"	, row.getParameter("stok_mngt_yorn"))
					.update("user_memo"			, row.getParameter("user_memo"))

					.update("find_name"			, row.getParameter("wkct_name")
												+ " "
												+ row.fixParameter("wkct_idcd")
												+ " "
												+ row.fixParameter("wkct_code"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.insert("line_ordr"			, row.getParameter("line_ordr"))
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
