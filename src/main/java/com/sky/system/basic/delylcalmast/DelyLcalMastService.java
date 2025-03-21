package com.sky.system.basic.delylcalmast;

import java.util.Date;
import java.text.SimpleDateFormat;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class DelyLcalMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.lcal_idcd           , a.lcal_name       , a.trnt_cost_1fst   , a.trnt_cost_2snd	")
			.query("		, a.trnt_cost_3trd      , a.hdli_amnt       , a.lcal_code							")
			.query("		, a.user_memo           , a.sysm_memo       , a.prnt_idcd        , a.line_levl		")
			.query("		, a.line_ordr           , a.line_stat       , a.line_clos        , a.find_name		")
			.query("		, a.updt_user_name      , a.updt_ipad       , a.updt_dttm        , a.updt_idcd		")
			.query("		, a.updt_urif           , a.crte_user_name  , a.crte_ipad        , a.crte_dttm		")
			.query("		, a.crte_idcd           , a.crte_urif												")
		;
		data.param //퀴리문
			.where("from	dely_lcal a																			")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.lcal_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.lcal_idcd           , a.lcal_name       , a.trnt_cost_1fst   , a.trnt_cost_2snd	")
			.query("		, a.trnt_cost_3trd      , a.hdli_amnt       , a.lcal_code							")
			.query("		, a.user_memo           , a.sysm_memo       , a.prnt_idcd        , a.line_levl		")
			.query("		, a.line_ordr           , a.line_stat       , a.line_clos        , a.find_name		")
			.query("		, a.updt_user_name      , a.updt_ipad       , a.updt_dttm        , a.updt_idcd		")
			.query("		, a.updt_urif           , a.crte_user_name  , a.crte_ipad        , a.crte_dttm		")
			.query("		, a.crte_idcd           , a.crte_urif												")
		;
		data.param //퀴리문
			.where("from	dely_lcal a																			")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.lcal_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("dely_lcal")
					.where("where lcal_idcd  = :lcal_idcd")

					.unique("lcal_idcd"			, row.fixParameter("lcal_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("dely_lcal")
					.where("where lcal_idcd	= :lcal_idcd" )

					.unique("lcal_idcd"				, row.fixParameter("lcal_idcd"))

					.update("lcal_code"				, row.getParameter("lcal_code"			))	//지역코드
					.update("lcal_name"				, row.getParameter("lcal_name"			))	//지역명
					.update("trnt_cost_1fst"		, row.getParameter("trnt_cost_1fst"		))	//운송비1
					.update("trnt_cost_2snd"		, row.getParameter("trnt_cost_2snd"		))	//운송비2
					.update("trnt_cost_3trd"		, row.getParameter("trnt_cost_3trd"		))	//운송비3
					.update("hdli_amnt"				, row.getParameter("hdli_amnt"			))	//택배금액

					.update("user_memo"				, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"				, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"				, row.getParameter("prnt_idcd"			))	//부모ID

					.update("find_name"				, row.getParameter("lcal_name")			//지역명
													+ " "
													+ row.fixParameter("lcal_code"))		//지역코드

					.insert("line_levl"				, row.getParameter("line_levl"))
					.insert("line_ordr"				, row.getParameter("line_ordr"))
					.insert("line_stat"				, row.getParameter("line_stat"))
					.insert("line_clos"				, row.getParameter("line_clos"))
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


