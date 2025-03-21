package com.sky.system.item;
 
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
public class ItemPackZoneService extends DefaultServiceHandler{

	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		
		DataMessage data = arg.newStorage();
		data.param // 쿼리문  입력
			.total(" select  count(1) as maxsize  ")
		;		
		
		data.param // 쿼리문  입력  
			.query("select a.hq_id    ,  a.stor_grp   , a.stor_id ")
			.query("   ,   a.zone_id     ,  a.zone_cd    , a.zone_nm    , a.zone_gb  ")
			.query("   ,   a.user_memo   ,  a.row_sts  ")
		;
		data.param // 쿼리문  입력  
			.where("from   itm_zone a")
			.where("where  a.stor_id  = :stor_id   " , arg.fixParameter("stor_id"  ))
			.where("and    a.zone_nm like %:zone_nm% " , arg.getParameter("zone_nm" ) )
			.where("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) ) 
			.where("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )			
//			.where("order by a.zone_id asc")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	
	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage();  
		data.param // 쿼리문  입력
			.total(" select  count(1) as maxsize  ")
		;		
		data.param // 쿼리문  입력  
			.query("select a.zone_id     ,  a.zone_cd   , a.zone_nm    , a.zone_gb   ")
		;
		data.param // 쿼리문  입력  
			.where("from   itm_zone a")
			.where("where  a.stor_id  = :stor_id   " , arg.fixParameter("stor_id"  ))
			.where("and    a.zone_nm like %:zone_nm% " , arg.getParameter("zone_nm" ) )
			.where("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) ) 
			.where("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )			
			.where("order by a.zone_id asc")
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
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("itm_zone")
					.where("where zone_id  = :zone_id  " )
					//
					.unique("zone_id"            , row.fixParameter("zone_id"         ))
					.update("row_sts"          , 2  )
					.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
				;data.attach(Action.delete);
			} else {
				data.param
					.table("itm_zone")
					.where("where zone_id = :zone_id " )
					//
					.unique("hq_id"           , row.fixParameter("hq_id"       ))
					.insert("stor_grp"           , row.fixParameter("stor_grp"       ))
					.insert("stor_id"           , row.fixParameter("stor_id"       ))
					.unique("zone_id"            , row.fixParameter("zone_id"        ))
					.update("zone_cd"            , row.fixParameter("zone_cd"        ))
					.update("zone_nm"            , row.getParameter("zone_nm"        ))
					.update("zone_gb"            , row.getParameter("zone_gb"        ))
					.update("user_memo"          , row.getParameter("user_memo"      ))
					.update("row_sts"          , row.getParameter("row_sts"      ))
					.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
				;data.attach(rowaction );
			}
			
		}
		data.execute();
		return null ; 
	}	
}
