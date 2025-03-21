package com.sky.system.project.rndword;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import java.util.Date;
import java.text.SimpleDateFormat;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Service
public class RndWordService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select  *																	")
		;

		data.param // 쿼리문  입력
			.where("from (																		")
			.where("select																		")
			.where("	  a.w_nm        , a.w_id       , a.w_id_2   , a.full_nm     , a.memo	")
			.where("	, a.usr_memo    , a.sys_memo   , a.prnt_id  , a.row_lvl     , a.row_ord	")
			.where("	, a.row_sts     , a.row_clos   , a.find_nm  , a.upt_usr_nm  , a.upt_ip	")
			.where("	, a.upt_dttm    , a.upt_id     , a.upt_ui   , a.crt_usr_nm  , a.crt_ip	")
			.where("	, a.crt_dttm    , a.crt_id     , a.crt_ui								")
			.where("from rnd_word a																")
			.where("where 1=1																	")
			.where("and   find_nm like %:find_nm% ",	arg.getParamText("fied_name" ) )
			.where(") a																			")
	    ;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows ) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
		    .query("select 	* 														")
		;
		data.param // 쿼리문  입력
			.where("from (															")
			.where("select															")
			.where("	  a.w_nm      , a.w_id   , a.w_id_2  , a.full_nm   , a.memo	")
			.where("from  rnd_word a												")
			.where("where 1=1														")
			.where("and   find_nm like %:find_nm%    ",        arg.getParamText("find_nm" ) )
			.where(") a																")
	    ;
	    return data.selectForMap();
	}



	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("rnd_word")
					.where("where w_nm = :w_nm ")
					//
					.unique("w_nm"   , row.fixParameter("w_nm"))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("rnd_word")
					.where("where w_nm = :w_nm ")
			        //

					.unique("w_nm"        		, row.getParameter("w_nm"        	))
					.update("w_id"       		, row.getParameter("w_id"       	))
					.update("w_id_2"       		, row.getParameter("w_id_2"       	))
					.update("full_nm" 			, row.getParameter("full_nm" 		))
					.update("memo"				, row.getParameter("memo"   		))
					.update("usr_memo"          , row.getParameter("usr_memo"           ))  /*  사용자메모  */
					.update("sys_memo"          , row.getParameter("sys_memo"           ))  /*  시스템메모  */
					.update("prnt_id"           , row.getParameter("prnt_id"            ))  /*  상위 ID  */
					.update("row_lvl"           , row.getParameter("row_lvl"            ))  /*  ROW레벨  */
					.update("row_ord"           , row.getParameter("row_ord"            ))  /*  ROW순서  */
					.update("row_sts"           , row.getParameter("row_sts"            ))  /*  ROW상태  */
					.update("row_clos"          , row.getParameter("row_clos"           ))  /*  마감여부  */
		        	.update("find_nm"      	    , row.getParamText("w_nm"       	).trim()
						                        + row.getParamText("w_id"           ).trim()
						                        + row.getParamText("w_id_2"     ).trim()
						                        + row.getParamText("full_nm"       ).trim() )
					.update("upt_usr_nm"        , row.getParameter("upt_usr_nm"          ))  /*  수정사용자명  */
					.update("upt_ip"            , row.getParameter("upt_ip"              ))  /*  수정IP  */
					.update("upt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("upt_id"            , row.getParameter("upt_id"              ))  /*  수정ID  */
					.update("upt_ui"            , row.getParameter("upt_ui"              ))  /*  수정UI  */
					.insert("crt_usr_nm"        , row.getParameter("crt_usr_nm"          ))  /*  생성사용자명  */
					.insert("crt_ip"            , row.getParameter("crt_ip"              ))  /*  생성IP  */
					.insert("crt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crt_id"            , row.getParameter("crt_id"              ))  /*  생성ID  */
					.insert("crt_ui"            , row.getParameter("crt_ui"              ))  /*  생성UI  */
			        .action = rowaction ;
				}
        	;data.attach();
		}
		data.execute();
		return null ;
	}


}
