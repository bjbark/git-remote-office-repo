package com.sky.system.user.laborate;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class LaboRateService extends DefaultServiceHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select *																						")
			.query("from ( 																							")
			.query("select																							")
			.query("         a.labo_rate_idcd  , a.wkrn_idcd														")
			.query("       , a.labo_rate_dvcd  , a.labo_rate_1fst  , a.labo_rate_2snd , a.labo_rate_3trd			")
			.query("       , a.labo_rate_4frt  , a.labo_rate_5fit  , a.labo_rate_name								")
			.query("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.find_name					")
			.query("       , a.line_levl       , a.line_ordr       , a.line_stat      , a.line_clos					")
			.query("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd   , a.updt_urif	")
			.query("       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm      , a.crte_idcd   , a.crte_urif	")
			.query("       , case labo_rate_dvcd when  '1' then w.wkrn_name											")
			.query("                             when  '2' then k.wkct_name											")
			.query("                             when  '3' then c.cvic_name											")
			.query("                             when  '4' then d.dept_name											")
			.query("                             else null end  as wkrn_name										")
			;
		data.param //퀴리문
			.query("from	labo_rate  a																			")
			.query("		left outer join wkrn_mast w on a.wkrn_idcd = w.wkrn_idcd								")
			.query("		left outer join wkct_mast k on a.wkrn_idcd = k.wkct_idcd								")
			.query("		left outer join cvic_mast c on a.wkrn_idcd = c.cvic_idcd								")
			.query("		left outer join dept_mast d on a.wkrn_idcd = d.dept_idcd								")
			.query("where	1=1																						")
			.query("and		a.labo_rate_dvcd	= :labo_rate_dvcd"		, arg.getParameter("labo_rate_dvcd"))
			.query("and		a.wkrn_idcd	= :wkrn_idcd"		, arg.getParameter("wkrn_idcd"))
			.query("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.query("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat") , !"".equals(arg.getParamText("line_stat" )))
			.query("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.labo_rate_idcd ) a																		")
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}

	//팝업
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS"	);
		data.param
			.total("select count(1) as maxsize																		")
		;
		data.param // 쿼리문  입력
			.query("select																							")
			.query("         a.labo_rate_idcd  , a.wkrn_idcd       , w.wkrn_name      , a.labo_rate_name			")
			.query("       , a.labo_rate_dvcd  , a.labo_rate_1fst  , a.labo_rate_2snd  , a.labo_rate_3trd			")
			.query("       , a.labo_rate_4frt  , a.labo_rate_5fit													")
			.query("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd									")
			.query("       , a.line_levl       , a.line_ordr       , a.line_stat      , a.line_clos					")
			.query("       , a.find_name																			")
			.query("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd   , a.updt_urif	")
			.query("       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm      , a.crte_idcd   , a.crte_urif	")
		;
		data.param //퀴리문
			.where("from	labo_rate  a																			")
			.where("		left outer join wkrn_mast as w on  a.wkrn_idcd = w.wkrn_idcd							")
			.where("where	1=1																						")
			.where("and		a.wkrn_idcd	= :wkrn_idcd"		, arg.getParameter("wkrn_idcd"))
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
//			.where("and		a.line_stat	= :line_stat"		, arg.getParamText("line_stat") , !"".equals(arg.getParamText("line_stat" )))
//			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.labo_rate_idcd																			")
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1)  );
	}
	//팝업
	public SqlResultMap getCodeLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS"	);
		data.param
			.total("select count(1) as maxsize					")
		;
		data.param // 쿼리문  입력
			.query("select	*									")
		;
		data.param //퀴리문
			.where("from (										")
			.where("select   wkrn_idcd as wkrn_idcd 			")
			.where("	   , wkrn_code as wkrn_code				")
			.where("       , wkrn_name as wkrn_name				")
			.where("	   , '1'       as wkrn_dvcd				")
			.where("from     wkrn_mast 							")
			.where("where    line_stat < 2						")
			.where("union all									")
			.where("select   wkct_idcd as wkrn_idcd 			")
			.where("	   , wkct_code as wkrn_code				")
			.where("       , wkct_name as wkrn_name				")
			.where("	   , '2'       as wkrn_dvcd				")
			.where("from   wkct_mast 							")
			.where("where  line_stat < 2						")
			.where("union all									")
			.where("select   cvic_idcd as wkrn_idcd 			")
			.where("	   , cvic_code as wkrn_code				")
			.where("       , cvic_name as wkrn_name				")
			.where("	   , '3'       as wkrn_dvcd				")
			.where("from   cvic_mast 							")
			.where("where  line_stat < 2						")
			.where("union all									")
			.where("select   dept_idcd as wkrn_idcd 			")
			.where("	   , dept_code as wkrn_code				")
			.where("       , dept_name as wkrn_name				")
			.where("	   , '4'       as wkrn_dvcd				")
			.where("from   dept_mast 							")
			.where("where  line_stat < 2						")
			.where(") a											")
			.where("where	1=1									")
			.where("and		a.wkrn_dvcd	= :wkrn_dvcd"		, arg.getParameter("wkrn_dvcd"))
			.where("order by a.wkrn_idcd						")
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1)  );
	}

	//사용자 정보수정
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("labo_rate")
					.where("where labo_rate_idcd	= :labo_rate_idcd")

					.unique("labo_rate_idcd"		, row.fixParameter("labo_rate_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);
			} else {
				data.param
					.table("labo_rate")
					.where("where labo_rate_idcd	= :labo_rate_idcd")

					.unique("labo_rate_idcd"		, row.fixParameter("labo_rate_idcd"))

					.update("labo_rate_dvcd"		, row.getParameter("labo_rate_dvcd"))
					.update("wkrn_idcd"				, row.getParameter("wkrn_idcd"))
					.update("labo_rate_name"		, row.getParameter("labo_rate_name"))
					.update("labo_rate_1fst"		, row.getParameter("labo_rate_1fst"))
					.update("labo_rate_2snd"		, row.getParameter("labo_rate_2snd"))
					.update("labo_rate_3trd"		, row.getParameter("labo_rate_3trd"))
					.update("labo_rate_4frt"		, row.getParameter("labo_rate_4frt"))
					.update("labo_rate_5fit"		, row.getParameter("labo_rate_5fit"))
					.update("user_memo"				, row.getParameter("user_memo"))
					.update("find_name"				, row.getParameter("labo_rate_name")
													+ "  "
													+ row.getParameter("labo_rate_idcd"))
					.update("line_stat"				, row.getParameter("line_stat"		))
					.insert("line_levl"				, row.getParameter("line_levl"		))
					.update("updt_idcd"				, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
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
