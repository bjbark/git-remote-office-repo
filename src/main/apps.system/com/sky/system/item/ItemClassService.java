package com.sky.system.item;
 


import net.sky.http.dispatch.control.DefaultServiceHandler;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class ItemClassService extends DefaultServiceHandler{

	
	//private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/**
	 * 상품분류정보
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
			.query("   ,   a.user_memo   , a.row_sts  ")
			.query("from   item_class a")
			.query("where  a.hq_id  = :hq_id  " , arg.fixParameter("hq_id"  ) )
			.query("and    a.stor_grp  = :stor_grp  " , arg.getParameter("stor_grp"  ) )
			.query("and    a.prnt_id = :prnt_id " , arg.fixParameter("prnt_id" ) )
			.query("and    a.row_lvl = :row_lvl " , arg.fixParameter("row_lvl" ) )
			
			.query("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) ) 
			.query("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )			
			//.query("and    a.row_sts < 2" )
			.query("order by    a.class_cd  " )
		;
	    return data.selectForMap();
	}
	
	/**
	 * 상품분류현황
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearchExcel(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");  
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력  
			.query("select x.class_id , x.class_cd,  x.class_nm , x.lv as class_lv , x.clss_desct , x.row_sts ")
			;
		data.param
			.where("from (														")
			.where("		select level as lv ,								")
	//		.where("			a.class_id, a.class_nm , SUBSTR( SYS_CONNECT_BY_PATH(class_nm , ' > ' ),4) AS CLASS_DS	")
			.where("			a.class_id, a.class_nm , a.row_sts			")
			.where("		   , substr( sys_connect_by_path(a.class_nm , ' > ' ),4) as clss_desct	")
			//.where("		   , substr( sys_connect_by_path(a.class_cd , ' > ' ),4) as class_cd	")
			.where("		   , replace ( sys_connect_by_path(a.class_cd , ' ' ) , ' ', '') as class_cd ")
			.where("		from item_class a									")
			.where("        where  a.hq_id  = :hq_id  " , arg.fixParameter("hq_id"  ) )
			.where("        and    a.stor_grp  = :stor_grp  " , arg.getParameter("stor_grp"  ) )
			.where("        and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) ) 
			.where("        and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )			
			.where("		start with a.prnt_id = '0'						")
			.where("		connect by prior a.class_id = a.prnt_id			")
			.where(") x															")
		;
//	    return data.selectForMap();
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
		
	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage();  
		data.param // 쿼리문  입력  
			.query("select a.hq_id    ,  a.class_id    ,  a.class_cd    , a.class_nm  , a.clss_desct   ")
			.query("   ,   a.row_lvl   ,  a.prnt_id   ,  a.prdt_key    , a.code_len					")
			.query("from   item_class a")
			.query("where  a.hq_id  = :hq_id   " , arg.fixParameter("hq_id"  ))
			.query("and    a.prnt_id = :prnt_id  " , arg.fixParameter("prnt_id" ))
			.query("and    a.class_id  = :class_id   " , arg.getParameter("class_id"  ))
			.query("and    a.row_sts  = :row_sts " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우 
			.query("and    a.row_sts <= :row_sts " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우 
			.query("order by a.class_cd " )
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
		DataMessage data = arg.newStorage();  
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			//  삭제 인경우 
			if (rowaction.equals(Action.delete)){
	        	data.param
        			.query( " update item_class set row_sts = 2  " )
        			.query( " where class_id in (  " )
        			.query(	"       select  a.class_id from  item_class a  " )
        			.query( "       start   with a.class_id = :class_id      " , row.fixParameter("class_id" ))
        			.query( "       connect by prior a.class_id = a.prnt_id  " )
        			.query( " ) " )
	        	;data.attach(Action.direct);
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
	        		.insert("row_lvl"          , row.getParameter("row_lvl"     ))
	        		.update("user_memo"          , row.getParameter("user_memo"     ))
	        		.update("row_sts"          , row.getParameter("row_sts"     ))
	        		.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
	        		.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
	        	;data.attach(rowaction);
	        	
	        	//   품목 분류명을 업데이트 한다.
	        	data.param
	        		.query( " merge into item_class t   " )
	        		.query( " using ( select x.class_id " )
	        		.query( "              , case when x.parent_ds is null then x.clss_desct else x.parent_ds || ' > ' || x.clss_desct end as clss_desct  " )
	        		.query( "         from ( select  a.class_id, SUBSTR( SYS_CONNECT_BY_PATH(class_nm , ' > ' ),4) AS CLASS_DS   " )
	        		.query( "                     ,( select clss_desct from item_class where class_id = :prnt_id ) as parent_ds  " ) //     a.class_id, SUBSTR( SYS_CONNECT_BY_PATH(CLASS_NM , ' > ' ),4) AS CLASS_DS   " )
	        		.query( "                from    item_class a                   " )
					.query( "                start   with a.class_id = :class_id      " , row.fixParameter("class_id" ))
					.query( "                connect by prior a.class_id = a.prnt_id  " )
					.query( "         ) x                                           " )
					.query( " ) s on ( t.class_id = s.class_id )                    " )
					.query( " when matched then                                     " )
					.query( "      update set t.clss_desct  = s.clss_desct              " )
					.query( "               , t.upt_dttm = to_char(sysdate,'yyyymmddhh24miss') " )
					.assign("prnt_id" , row.fixParameter("prnt_id" ) )
	        	;data.attach(Action.direct);
			}

//			data.param
//			.table("sync_mst")
//			.where("where sync_id = :sync_id and ddn_id = :ddn_id " )							
//			.where("  and idx_1 = :idx_1 and idx_2 = :idx_2 and idx_3 = :idx_3  " )							
//			//
//			.unique("sync_id"           , ShopInfoTasker.WEB_SYNC_SHOP_INFO)
//			.unique("ddn_id"           , arg.fixParameter("web_ddns"    ))
//			.unique("idx_1"           , row.fixParameter("shop_id"     ))
//			.unique("idx_2"           , row.fixParameter("shop_id"     ))
//			.unique("idx_3"           , row.fixParameter("shop_id"     ))
//			.update("del_yn"           , rowaction.equals(Action.delete) ? "1" : "0" ) 
//			.update("upt_dttm"         , new SqlParamText("to_char(sysdate,'yyyymmddhh24miss')") )
//			.insert("crt_dttm"         , new SqlParamText("to_char(sysdate,'yyyymmddhh24miss')") )
//			
//		;data.attach(Action.modify).async(ShopInfoTasker.class, ShopInfoTasker.WEB_SYNC_SHOP_INFO );
			
			
			
		}
		data.execute();
		return null ; 
	}
}
