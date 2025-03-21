package com.sky.system.basic.testmast;

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
public class TestMastService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																					")
			.query("		   a.dept_idcd		, a.dept_name		, a.dept_code		, a.dept_stnm		")
			.query("		 , a.dept_engl_name																")
			.query("		 , a.dept_engl_stnm	, a.strt_date		, a.endd_date		, a.dept_dvcd		")
			.query("		 , a.tele_numb		, a.faxi_numb		, a.bzpl_idcd		, a.exps_dvcd		")
			.query("		 , a.remk_text		, a.user_memo		, a.sysm_memo		, a.prnt_idcd		")
			.query("		 , a.line_levl		, a.line_ordr		, a.line_stat		, a.line_clos		")
			.query("		 , a.find_name		, a.updt_user_name	, a.updt_ipad		, a.updt_dttm		")
			.query("		 , a.updt_idcd		, a.updt_urif		, a.crte_user_name	, a.crte_ipad		")
			.query("		 , a.crte_dttm		, a.crte_idcd		, a.crte_urif							")
			.query("		,(select dept_name from dept_mast r where a.prnt_idcd = r.dept_idcd) as prnt_dept_name"	)
			.query("		,(select dept_code from dept_mast r where a.prnt_idcd = r.dept_idcd) as prnt_dept_code"	)
		;
		data.param //퀴리문
			.where("from	dept_mast a																		")
			.where("where	1=1																				")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.dept_name	like %:dept_name%"	, arg.getParameter("dept_name"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.dept_idcd")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																					")
			.query("		   a.dept_idcd		, a.dept_name		, a.dept_code       , a.dept_stnm		")
			.query("		 , a.dept_engl_name																")
			.query("		 , a.dept_engl_stnm	, a.strt_date		, a.endd_date		, a.dept_dvcd		")
			.query("		 , a.tele_numb		, a.faxi_numb		, a.bzpl_idcd		, a.exps_dvcd		")
			.query("		 , a.remk_text		, a.user_memo		, a.sysm_memo		, a.prnt_idcd		")
			.query("		 , a.line_levl		, a.line_ordr		, a.line_stat		, a.line_clos		")
			.query("		 , a.find_name		, a.updt_user_name	, a.updt_ipad		, a.updt_dttm		")
			.query("		 , a.updt_idcd		, a.updt_urif		, a.crte_user_name	, a.crte_ipad		")
			.query("		 , a.crte_dttm		, a.crte_idcd		, a.crte_urif							")
			.query("		,(select dept_name from dept_mast r where a.prnt_idcd = r.dept_idcd) as prnt_dept_name"	)
			.query("		,(select dept_code from dept_mast r where a.prnt_idcd = r.dept_idcd) as prnt_dept_code"	)
		;
		data.param //퀴리문
			.where("from	dept_mast a																				")
			.where("where	1=1																						")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.dept_name	like %:dept_name%"	, arg.getParameter("dept_name"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.dept_idcd")
		;
		return data.selectForMap(page, rows, (page == 1)); //
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
					.table("dept_mast")
					.where("where dept_idcd  = :dept_idcd")

					.unique("dept_idcd"			, row.fixParameter("dept_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);


			} else {
				data.param
					.table("dept_mast")
					.where("where dept_code	= :dept_code" )

					.unique("dept_code"			, row.fixParameter("dept_code"))


					.update("dept_idcd"			, row.getParameter("dept_idcd"))
					.update("dept_name"			, row.getParameter("dept_name"))
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("dept_name")
												+ "	"
												+ row.fixParameter("dept_idcd"))
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
