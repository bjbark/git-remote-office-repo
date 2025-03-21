package com.sky.system.user.wkrnmast;


import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class WkrnMastService extends DefaultServiceHandler {

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param
			.query("select *															")
		;
		data.param // 쿼리문  입력
			.where("from (															")
			.where("select a.hqof_idcd												")
			.where("     , a.wkrn_idcd , a.wkrn_code   ,  a.wkrn_name				")
			.where("     , a.user_memo , a.line_stat								")
		;
		data.param
			.where("from   wkrn_mast a												")
			.where("where  1=1														")
			.where("and    a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("and    a.find_name like %:find_name% " , arg.getParameter("find_name"))
			.where("order by wkrn_idcd	) a											")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select a.hqof_idcd												")
			.query("     , a.wkrn_idcd , a.wkrn_code   ,  a.wkrn_name				")
			.query("     , a.user_memo , a.line_stat								")
		;
		data.param
			.where("from   wkrn_mast a")
			.where("where  1=1														")
			.where("and    a.line_stat  =  :line_stat1   " , "0"  ,( "0".equals(arg.getParamText("line_stat")) )) // 정상 거래처만 조회 요청한 경우
			.where("and    a.line_stat  <= :line_stat2   " , "1"  ,(!"0".equals(arg.getParamText("line_stat")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("and    a.find_name like %:find_name% " , arg.getParameter("find_name"))
			.where("order by wkrn_code												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wkrn_mast")
					.where("where wkrn_idcd  = :wkrn_idcd   " )
					//
					.unique("wkrn_idcd"		, row.fixParameter("wkrn_idcd"))
					.update("line_stat"		, 2)
					.update("updt_urif"		, row.fixParameter("updt_urif"))
					.update("updt_idcd"		, row.fixParameter("updt_idcd"))
					.update("updt_ipad"		, arg.remoteAddress)
					.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
			} else {
				data.param
					.table("wkrn_mast")
					.where("where wkrn_idcd  = :wkrn_idcd   " )
					//
					.unique("hqof_idcd"		, row.fixParameter("hqof_idcd"))
					.unique("wkrn_idcd"		, row.fixParameter("wkrn_idcd"))
					//
					.update("wkrn_name"		, row.getParameter("wkrn_name"))
					.update("wkrn_code"		, row.getParameter("wkrn_code"))
					.update("user_memo"		, row.getParameter("user_memo"))
					.update("line_stat"		, row.getParameter("line_stat"))
					.update("find_name"		, row.getParamText("wkrn_code" ).trim()
											+ row.getParamText("wkrn_name" ).trim())
					.update("updt_urif"		, row.fixParameter("updt_urif"))
					.update("updt_idcd"		, row.fixParameter("updt_idcd"))
					.update("updt_ipad"		, arg.remoteAddress )
					.insert("crte_urif"		, row.fixParameter("crte_urif"))
					.insert("crte_idcd"		, row.fixParameter("crte_idcd"))
					.insert("crte_ipad"		, arg.remoteAddress )
					.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}



}
