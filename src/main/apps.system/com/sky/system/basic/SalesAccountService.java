package com.sky.system.basic;
 
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class SalesAccountService extends DefaultServiceHandler{

	/**
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String  sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력  
			.query("select a.hq_id     , a.stor_grp                                   ")
			.query("     , a.bas_id      , a.bas_cd     , a.bas_nm ,a.bas_nm_englh         ")
			.query("     , a.prnt_id    , a.row_lvl   , a.row_sts  , a.user_memo   ")
		;
		data.param
			.where("from   base_mst a                                                   ")
			.where("where  a.prnt_id   = :prnt_id  "  , arg.fixParameter("prnt_id" ))
			.where("and    a.stor_grp    = :stor_grp   "  , arg.getParameter("stor_grp"  ))
			.where("and    a.bas_nm  like %:bas_nm%  "  , arg.getParameter("bas_nm"   ))
			.where("and    a.row_sts < 2 " )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	

	
	/**
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				if (!"000".equals(row.getParamText("bas_cd") )) {
					data.param
						.table("base_mst")
						.where("where bas_id  = :bas_id  " )
						//
						.unique("bas_id"            , row.fixParameter("bas_id"         ))
						.update("row_sts"          , 2  )
						.update("upt_ip"   		 , arg.remoteAddress )
						.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					;data.attach(Action.update);
				} else {
					throw new ServiceException( "삭제 하실수 없는 코드 입니다.", -99 );
				}
			} else {
				data.param
					.table("base_mst")
					.where("where bas_id  = :bas_id  " )
					//
					.unique("hq_id"           , row.fixParameter("hq_id"        ))
					.unique("stor_grp"           , row.fixParameter("stor_grp"        ))
					.unique("bas_id"            , row.fixParameter("bas_id"         ))
					.unique("bas_cd"            , row.fixParameter("bas_cd"         ))
					.update("bas_nm"            , row.getParameter("bas_nm"         ))
					.update("bas_nm_englh"            , row.getParameter("bas_nm_englh"         ))
					.insert("prnt_id"          , row.getParameter("prnt_id"       ))
					.insert("row_lvl"          , row.getParameter("row_lvl"       ))
					.update("row_sts"          , row.getParameter("row_sts"       ))
					.update("user_memo"          , row.getParameter("user_memo"       ))
		        	.update("upt_ip"   		 , arg.remoteAddress )
					.update("upt_id"          , row.getParameter("upt_id"       ))
					.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
		        	.insert("crt_ip"       	 , arg.remoteAddress )
					.insert("crt_nm"          , row.getParameter("crt_nm"       ))
					.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ; 
	}

	/** 
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public String getSequence(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력  
			.query(" select trim(to_char((max(bas_cd)+1), '000')) as bas_cd	")
			.query(" from   base_mst a ")
			.query(" where  a.prnt_id  = :prnt_id " , "5105" )
		;
	    return data.selectForStr(); //
	}
	
}


