package com.sky.system.qc.iteminspstd;

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
public class ItemInspStdService extends DefaultServiceHandler{

	// search
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.insp_type_idcd  , a.insp_type_code , a.insp_type_name , a.insp_mthd_dvcd	")
			.query("		, a.smor_rate       , a.wkct_insp_yorn , a.rcpt_insp_yorn , a.last_insp_yorn	")
			.query("		, a.shpm_insp_yorn  , a.insp_cond												")
			.query("		, a.user_memo       , a.sysm_memo      , a.updt_idcd      , a.updt_urif			")
			.query("		, a.prnt_idcd       , a.line_levl      , a.line_ordr      , a.line_stat			")
			.query("		, a.line_clos       , a.find_name      , a.updt_user_name						")
			.query("		, a.updt_ipad       , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.query("		, a.crte_user_name  , a.crte_ipad      , a.crte_dttm      , a.crte_idcd			")
			.query("		, a.crte_urif												")

		;
		data.param //퀴리문
			.where("from		insp_type_mast a															")
			.where("where		1=1																			")
			.where("and			a.find_name	like %:find_name%	"   , arg.getParameter("find_name"			))
			.where("and			substring(a.crte_dttm,1,8)	>= :fr_date " , arg.getParamText("fr_date" ))
			.where("and			substring(a.crte_dttm,1,8)	<= :re_date " , arg.getParamText("re_date" ))
			.where("and			a.item_idcd = :item_idcd " , arg.getParameter("item_idcd"))
			.where("and			a.line_stat = :line_stat " , arg.getParameter("line_stat"))
			.where("and			a.line_stat	< :line_stat		"   , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.insp_type_idcd"																)
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
			.query("select    a.item_idcd  , a.insp_type_idcd  , a.item_code      , a.item_name			")
			.query("		, a.item_spec																")
			.query("		, a.user_memo  , a.sysm_memo												")
			.query("		, a.prnt_idcd  , a.line_levl       , a.line_ordr      , a.line_stat			")
			.query("		, a.line_clos  , a.find_name       , a.updt_user_name , a.updt_ipad			")
			.query("		, a.updt_dttm  , a.updt_idcd       , a.updt_urif      , a.crte_user_name	")
			.query("		, a.crte_ipad  , a.crte_dttm       , a.crte_idcd      , a.crte_urif			")
		;
		data.param //퀴리문
			.where("from		item_mast a																		")
			.where("			left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd			")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.insp_type_idcd = :insp_type_idcd " , arg.getParameter("insp_type_idcd"		))
			.where("and			a.item_idcd = :item_idcd " , arg.getParameter("item_idcd"						))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.item_idcd"																	)
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
			.query("select    a.item_idcd  , a.insp_type_idcd  , a.item_code      , a.item_name			")
			.query("		, a.item_spec  , b.insp_type_idcd											")
			.query("		, a.user_memo  , a.sysm_memo												")
			.query("		, a.prnt_idcd  , a.line_levl       , a.line_ordr      , a.line_stat			")
			.query("		, a.line_clos  , a.find_name       , a.updt_user_name , a.updt_ipad			")
			.query("		, a.updt_dttm  , a.updt_idcd       , a.updt_urif      , a.crte_user_name	")
			.query("		, a.crte_ipad  , a.crte_dttm       , a.crte_idcd      , a.crte_urif			")
		;
		data.param //퀴리문
			.where("from		item_mast a																		")
			.where("			left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd			")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			b.insp_type_idcd = :insp_type_idcd " , arg.getParameter("insp_type_idcd"		))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.item_idcd"																	)
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
			.query("select    a.item_idcd  , a.insp_type_idcd  , a.item_code      , a.item_name			")
			.query("		, a.item_spec																")
			.query("		, a.user_memo  , a.sysm_memo												")
			.query("		, a.prnt_idcd  , a.line_levl       , a.line_ordr      , a.line_stat			")
			.query("		, a.line_clos  , a.find_name       , a.updt_user_name , a.updt_ipad			")
			.query("		, a.updt_dttm  , a.updt_idcd       , a.updt_urif      , a.crte_user_name	")
			.query("		, a.crte_ipad  , a.crte_dttm       , a.crte_idcd      , a.crte_urif			")
		;
		data.param //퀴리문
			.where("from		item_mast a																		")
			.where("where		1=1																				")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("and			ifnull(a.insp_type_idcd,'')=''")
			.where("order by	a.item_idcd"																	)
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
					.table("item_mast")
					.where("where item_idcd	= :item_idcd")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
					.update("insp_type_idcd"			,""									)
					;data.attach(Action.update);

			} else {
				data.param
					.table("item_mast")
					.where("where item_idcd	= :item_idcd" )

					.unique("item_idcd"				, row.fixParameter("item_idcd"))

					.update("insp_type_idcd"		, row.getParameter("insp_type_idcd"))

					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
			}
		}
		data.execute();
		return null ;
	}
}
