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
public class ItemClassHalinService extends DefaultServiceHandler{

	/**
	 * 전시분류정보
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {
		
		DataMessage data = arg.newStorage("POS"); 
		
		data.param // 쿼리문  입력  
			.query("select a.hq_id    , a.stor_grp ")
			.query("   ,   a.class_id    , a.class_cd    , a.class_nm ")
			.query("   ,   a.row_lvl   , a.prnt_id  ")
			.query("   ,   a.dsnt_rt_1 , a.dsnt_rt_2, dsnt_rt_3, dsnt_rt_4, dsnt_rt_5 ")
			.query("   ,   a.user_memo   , a.row_sts  ")
			.query("from   item_class a")
			.query("where  a.hq_id  = :hq_id  " , arg.fixParameter("hq_id"  ) )
			.query("and    a.stor_grp  = :stor_grp  " , arg.getParameter("stor_grp"  ) )
			.query("and    a.prnt_id = :prnt_id " , arg.fixParameter("prnt_id" ) )
			.query("and    a.row_lvl = :row_lvl " , arg.fixParameter("row_lvl" ) )
			
//			.query("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) ) 
//			.query("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )
			
			.query("and    a.row_sts = 0 " )
			.query("order by    a.class_cd  " )
		;
	    return data.selectForMap();
	}
	

	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			//  삭제 인경우 
			if (rowaction.equals(Action.delete)){
				
			} else {
				// 등록/수정 인 경우 
	        	data.param
	        		.table("item_class")
	        		.where("where class_id  = :class_id  " )
	        		//
	        		.unique("hq_id"           , row.fixParameter("hq_id"      ))
	        		.insert("stor_grp"           , row.fixParameter("stor_grp"      ))
	        		.unique("class_id"           , row.fixParameter("class_id"      ))
	        		.update("class_cd"           , row.fixParameter("class_cd"      ))
	        		//
	        		.update("class_nm"           , row.getParameter("class_nm"      ))
	        		.update("clss_desct"           , row.getParameter("class_nm"      ))
	        		.insert("prnt_id"          , row.fixParameter("prnt_id"     ))
	        		
	        		.update("dsnt_rt_1"        , row.getParameter("dsnt_rt_1"   ))
	        		.update("dsnt_rt_2"        , row.getParameter("dsnt_rt_2"   ))
	        		.update("dsnt_rt_3"        , row.getParameter("dsnt_rt_3"   ))
	        		.update("dsnt_rt_4"        , row.getParameter("dsnt_rt_4"   ))
	        		.update("dsnt_rt_5"        , row.getParameter("dsnt_rt_5"   ))
	        		
	        		.insert("row_lvl"          , row.getParameter("row_lvl"     ))
	        		.update("user_memo"          , row.getParameter("user_memo"     ))
	        		.update("row_sts"          , row.getParameter("row_sts"     ))
	        		.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
	        		.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
	        	;data.attach(rowaction);
			}

			
		}
		data.execute();
		return null ; 
	}
}
