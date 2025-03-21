package com.sky.system.basic.hdcomast;

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
public class HdcoMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.hdco_idcd           , a.hdco_dvcd       , a.hdco_name        , a.brch_name		")
			.query("		, a.tele_numb           , a.hdph_numb       , a.boss_name        , a.post_code		")
			.query("		, a.addr_1fst           , a.addr_2snd												")
			.query("		, a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
			.query("		, a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("		, a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("		, a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.query("		, a.crte_urif																		")
		;
		data.param //퀴리문
			.where("from	hdco_mast a																			")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.hdco_idcd"																	)
		;
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
			.query("select    a.hdco_idcd           , a.hdco_dvcd       , a.hdco_name        , a.brch_name		")
			.query("		, a.tele_numb           , a.hdph_numb       , a.boss_name        , a.post_code		")
			.query("		, a.addr_1fst           , a.addr_2snd												")
			.query("		, a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
			.query("		, a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("		, a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("		, a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.query("		, a.crte_urif																		")
		;
		data.param //퀴리문
			.where("from	hdco_mast a																			")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.hdco_idcd"																	)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("hdco_mast")
					.where("where hdco_idcd      = :hdco_idcd		")
					.where("and   hdco_dvcd      = :hdco_dvcd		")
					.where("and   hdco_name      = :hdco_name		")

					.unique("hdco_idcd"			, row.fixParameter("hdco_idcd"		))
					.unique("hdco_dvcd"			, row.fixParameter("hdco_dvcd"		))
					.unique("hdco_name"			, row.fixParameter("hdco_name"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("hdco_mast")
					.where("where hdco_idcd	= :hdco_idcd" )
					.where("and hdco_dvcd	= :hdco_dvcd" )

					.unique("hdco_idcd"				, row.fixParameter("hdco_idcd"))
					.unique("hdco_dvcd"				, row.fixParameter("hdco_dvcd"))

					.update("hdco_name"				, row.getParameter("hdco_name"))
					.update("brch_name"				, row.getParameter("brch_name"))
					.update("tele_numb"				, row.getParameter("tele_numb"))
					.update("hdph_numb"				, row.getParameter("hdph_numb"))
					.update("boss_name"				, row.getParameter("boss_name"))
					.update("post_code"				, row.getParameter("post_code"))
					.update("addr_1fst"				, row.getParameter("addr_1fst"))
					.update("addr_2snd"				, row.getParameter("addr_2snd"))
					.update("find_name"				, row.getParameter("hdco_idcd")
													+ " "
													+ row.getParameter("hdco_name"))

					.update("user_memo"				, row.getParameter("user_memo"))
					.insert("line_stat"				, row.getParameter("line_stat"))
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
