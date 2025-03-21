package com.sky.system.project.cdeptinfo;


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
public class CDeptInfoService extends DefaultServiceHandler {


	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		//String find_nm = arg.getParamText("find_nm" );

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select a.hq_id      , a.stor_grp					")
			.query("     , a.dept_id    , a.dept_cd   , a.dept_nm		") //, a.org_cd  ,  b.corp_nm  , a.corp_id
			.query("     , a.usr_memo   , a.row_sts   , a.row_ord		")
		;
		data.param
			.where("from   dept_mst a									")
			.where("where  a.stor_grp  = :stor_grp     " , arg.fixParameter("stor_grp" ))
			.where("and    a.dept_nm   like %:dept_nm% " , arg.getParameter("dept_nm"  ))
			.where("and    a.stor_id   = :stor_id      " , arg.getParameter("stor_id"  ))
			.where("and    a.row_sts   = :row_sts      " ,  arg.getParamText("row_sts" ) )
			.where("order by a.dept_cd, a.dept_nm						") //a.row_sts, a.org_cd , a.row_sts,
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
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize ")
		;
		data.param // 쿼리문  입력
			.query("select a.dept_id   ,   a.dept_cd    ,  a.dept_nm  , a.row_sts " )
		;
		data.param
			.where("from   dept_mst a")
			.where("where  a.stor_grp  =  :stor_grp  " , arg.fixParameter("stor_grp" ) )
			.where("and    a.row_sts   = :row_sts    " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("and    a.row_sts  <= :row_sts    " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("and    a.dept_nm like %:dept_nm% ", arg.getParameter("dept_nm" ) )
			.where("order by a.dept_cd       	") // a.row_sts, a.corp_id, a.dept_cd,
		;
		return data.selectForMap(page, rows, (page == 1) );
	}

	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
	        	data.param
        			.table("dept_mst")
        			.where("where dept_id  = :dept_id   " )
        			//
        			.unique("dept_id"           , row.fixParameter("dept_id"         ))
        			.update("row_sts"           , 2                                   )
        			.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        	;data.attach(Action.update);
			}else{
				data.param
		        	.table("dept_mst")
		        	.where("where dept_id  = :dept_id   " )
		        	//
		        	.unique("hq_id"         , row.fixParameter("hq_id"        ))
		        	.unique("stor_grp"      , row.fixParameter("stor_grp"        ))
		        	.unique("dept_id"       , row.fixParameter("dept_id"         ))
		        	.unique("dept_cd"       , row.fixParameter("dept_cd"         ))
		        	.update("dept_nm"       , row.getParameter("dept_nm"         ))

		        	.update("row_ord" 	  	, row.getParameter("row_ord"       ))
		        	.update("row_sts"       , row.getParameter("row_sts"       ))
			        .update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}


	/**
	 * 인사서버 연동
	 */
	public SqlResultMap setLinked(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("dept_mst")
	        	.where("where dept_id  = :dept_id   " )
	        	//
		        .update("corp_id"        	, row.fixParameter("corp_id"        ))
		        .unique("hq_id"          	, row.fixParameter("hq_id"        ))
		        .unique("stor_grp"          , row.fixParameter("stor_grp"        ))
	        	.update("stor_id"          	, row.fixParameter("stor_id"        ))
		        .unique("dept_id"           , row.fixParameter("dept_id"         ))
		        .update("dept_cd"           , row.getParameter("dept_cd"         ))
		        .update("dept_nm"           , row.getParameter("dept_nm"         ))
	        	.update("upt_id"   			, row.getParameter("upt_id"       ))
	        	.update("upt_ip"   			, arg.remoteAddress                   )
	        	.insert("crt_id"   			, row.getParameter("crt_id"       ))
	        	.insert("crt_ip"   			, arg.remoteAddress                   )
		        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
        	;data.attach(Action.modify);
		}
		data.execute();
		return null ;
	}
}
