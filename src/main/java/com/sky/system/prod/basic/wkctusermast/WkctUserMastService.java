package com.sky.system.prod.basic.wkctusermast;

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
public class WkctUserMastService extends DefaultServiceHandler{

	// search
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wkct_idcd         , a.wkct_name        , a.wkct_stnm        , a.bzpl_idcd			")
			.query("		, a.dept_idcd         , a.user_memo        , a.sysm_memo        , a.prnt_idcd			")
			.query("		, a.line_stat         , a.line_clos        , a.find_name        , a.updt_user_name		")
			.query("		, a.updt_ipad         , a.updt_dttm        , a.updt_idcd        , a.updt_urif			")
			.query("		, a.crte_user_name    , a.crte_ipad        , a.crte_dttm        , a.crte_idcd			")
			.query("		, a.crte_urif         , b.dept_name        , a.wkct_code								")

		;
		data.param //퀴리문
			.where("from		wkct_mast a																		")
			.where("			left outer join dept_mast b on a.dept_idcd = b.dept_idcd						")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.wkct_idcd = :wkct_idcd        " , arg.getParameter("wkct_idcd"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.wkct_code"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// detail
	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wkct_idcd             , a.line_seqn      , a.empy_dvcd        , a.empy_idcd			")
			.query("		, a.empy_name             , a.abty_dvcd      , a.wkkn_dvcd        , u.user_code			")
			.query("		, a.work_para_dvcd        , a.join_date      , a.user_memo        , a.sysm_memo			")
			.query("		, a.prnt_idcd             , a.line_levl      , a.line_ordr        , a.line_stat			")
			.query("		, a.line_clos             , a.find_name      , a.updt_user_name   , a.updt_ipad			")
			.query("		, a.updt_dttm             , a.updt_idcd      , a.updt_urif        , a.crte_user_name	")
			.query("		, a.crte_ipad             , a.crte_dttm      , a.crte_idcd        , a.crte_urif			")
			.query("		, a.crte_ipad             , a.crte_dttm      , a.crte_idcd        , a.crte_urif			")
			.query("		, d.dept_name             , w.wkrn_name													")
		;
		data.param //퀴리문
			.where("from		wkct_mans a																		")
			.where("left outer join user_mast u on a.empy_idcd = u.user_idcd									")
			.where("left outer join dept_mast d on u.dept_idcd = d.dept_idcd									")
			.where("left outer join wkrn_mast w on u.wkrn_idcd = w.wkrn_idcd									")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.wkct_idcd = :wkct_idcd        " , arg.getParameter("wkct_idcd"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
//			.where("order by	a.wkct_code"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

		// item1
	public SqlResultMap getItem1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wkct_idcd             , a.line_seqn      , a.empy_dvcd        , a.empy_idcd			")
			.query("		, a.empy_name             , a.abty_dvcd      , a.wkkn_dvcd								")
			.query("		, a.work_para_dvcd        , a.join_date      , a.user_memo        , a.sysm_memo			")
			.query("		, a.prnt_idcd             , a.line_levl      , a.line_ordr        , a.line_stat			")
			.query("		, a.line_clos             , a.find_name      , a.updt_user_name   , a.updt_ipad			")
			.query("		, a.updt_dttm             , a.updt_idcd      , a.updt_urif        , a.crte_user_name	")
			.query("		, a.crte_ipad             , a.crte_dttm      , a.crte_idcd        , a.crte_urif			")
			.query("		, d.dept_name             , u.user_code      , w.wkrn_name								")
		;
		data.param //퀴리문
			.where("from	wkct_mans a																			")
			.where("		left outer join wkct_mast b on a.wkct_idcd=b.wkct_idcd								")
			.where("		left outer join user_mast u on a.empy_idcd=u.user_idcd								")
			.where("		left outer join dept_mast d on u.dept_idcd=d.dept_idcd								")
			.where("		left outer join wkrn_mast w on u.wkrn_idcd=w.wkrn_idcd								")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.wkct_idcd = :wkct_idcd        " , arg.getParameter("wkct_idcd"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.line_seqn"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// item2
	public SqlResultMap getItem2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.user_idcd       , a.user_name          , b.wkct_idcd           , b.line_seqn	")
			.query("		, b.empy_idcd       , b.empy_dvcd          , b.empy_name           , a.user_code	")
			.query("		, b.abty_dvcd       , b.wkkn_dvcd          , b.work_para_dvcd      , b.join_date	")
			.query("		, a.user_memo       , a.sysm_memo          , a.prnt_idcd           , a.line_levl	")
			.query("		, a.line_ordr       , a.line_stat          , a.line_clos           , a.find_name	")
			.query("		, a.updt_user_name  , a.updt_ipad          , a.updt_dttm           , a.updt_idcd	")
			.query("		, a.updt_urif       , a.crte_user_name     , a.crte_ipad           , a.crte_dttm	")
			.query("		, a.crte_idcd       , a.crte_urif          , d.dept_name       						")

		;
		data.param //퀴리문
			.where("from		user_mast a																		")
			.where("			left outer join dept_mast d on a.dept_idcd = d.dept_idcd						")
			.where("			left outer join (select * from wkct_mans group by empy_idcd) b on a.user_idcd = b.empy_idcd	")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("and			a.user_idcd not in (select empy_idcd from wkct_mans where wkct_idcd = :wkct_idcd2)", arg.getParameter("wkct_idcd"))
			.where("order by	d.dept_idcd																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getItemSeqn(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    ifnull(max(line_seqn),0) as line_seqn							")

			;
		data.param //퀴리문
			.where("from		wkct_mans a													")
			.where("where		1=1															")
			.where("and			a.wkct_idcd	= :wkct_idcd	" , arg.getParameter("wkct_idcd"))
		;
		return data.selectForMap();
	}

	public SqlResultMap setItem1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wkct_mans")
					.where("where wkct_idcd	= :wkct_idcd")
					.where("and   line_seqn	= :line_seqn")

					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("wkct_mans")
					.where("where wkct_idcd	= :wkct_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("wkct_idcd"				, row.fixParameter("wkct_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("empy_idcd"				, row.getParameter("empy_idcd"))
					.update("empy_dvcd"				, row.getParameter("empy_dvcd"))
					.update("empy_name"				, row.getParameter("empy_name"))
					.update("abty_dvcd"				, row.getParameter("abty_dvcd"))
					.update("wkkn_dvcd"				, row.getParameter("wkkn_dvcd"))
					.update("work_para_dvcd"		, row.getParameter("work_para_dvcd"))
					.update("join_date"				, row.getParameter("join_date"))

					.update("find_name"				, row.getParameter("wkct_idcd")
													+ " "
													+ row.fixParameter("empy_name"))

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
