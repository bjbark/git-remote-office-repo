package com.sky.system.project.distrinfo;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

//import com.sky.core.encryption.Encryptor;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;


@Service
public class DistrInfoService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String index = arg.getParamText("search_id").trim();
		String value = arg.getParamText("find_nm").trim();

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize								")
		;
		data.param
			.query("select a.retail_chnl_id  , a.retail_chnl_nm					")
			.query("     , a.usr_memo        , a.row_sts						")
			//.query("     ,(select count(agent_id) from agent b where b.retail_chnl_id = a.retail_chnl_id ) as agent_count " )
		;
		data.param
			.where("from   distr a "     )
			.where("where  a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("where  a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )
		    .where("and    a.distr_nm like %:distr_nm% " , value , index.equals("1" ))
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}

	/**
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
//		String index = arg.getParamText("search_id").trim();
//		String value = arg.getParamText("find_nm").trim();
//
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select count(1) as maxsize												")
		;
		data.param
			.query("select a.agent_id as retail_chnl_id  , a.mngt_chnl_nm as retail_chnl_nm	")
			.query("     , a.usr_memo , a.row_sts											")
			//.query("     ,(select count(agent_id) from agent b where b.retail_chnl_id = a.retail_chnl_id ) as agent_count " )
		;
		data.param
			.where("from   agent a															")
			.where("where  a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("where  a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )
		    .where("and    a.mngt_chnl_nm like %:retail_chnl_nm% " , arg.getParameter("retail_chnl_nm"))
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}


	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		for(SqlResultRow row:arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				row.setParameter("row_sts" , 2   );
				rowaction = Action.update;
			}
			data.param
				.table("distr")
				.where("where retail_chnl_id  = :retail_chnl_id  " )
		        //
		        .unique("retail_chnl_id"  , row.fixParameter("retail_chnl_id"       ))
		        .update("retail_chnl_nm"  , row.getParameter("retail_chnl_nm"       ))
		        .update("usr_memo"        , row.getParameter("usr_memo"      ))
		        .update("row_sts"         , row.getParameter("row_sts"      ))
		        //
		        .update("upt_id"          , row.getParameter("upt_id"      ))
		        .update("upt_ui"          , row.getParameter("upt_ui"      ))
		        .update("upt_ip"          , arg.remoteAddress  )
		        .update("upt_dttm"        , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )

		        .insert("crt_id"          , row.getParameter("upt_id"      ))
		        .insert("crt_ui"          , row.getParameter("upt_ui"      ))
		        .insert("crt_ip"          , arg.remoteAddress  )
		        .insert("crt_dttm"        , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
        	;data.attach(rowaction);
		}
		data.execute();
		return null ;
	}
}

