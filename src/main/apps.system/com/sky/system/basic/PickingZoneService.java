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
public class PickingZoneService extends DefaultServiceHandler{

	/**
	 * 
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

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
			.where("order by  a.bas_cd    " )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSeq(HttpRequestArgument arg , int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력  
			.query(" select trim(to_char((max(bas_cd)+1), '000')) as bas_cd	")
			.query("    ,   prnt_id ")
			.query(" from   base_mst ")
			.query(" where  hq_id   = :hq_id " , arg.fixParameter("hq_id" ))
			.query(" and    prnt_id  = :prnt_id " , arg.fixParameter("prnt_id" ))
//			.query(" and    bas_cd    = :bas_cd   " , arg.getParameter("bas_cd"   ))
			.query(" and    row_sts < 2 ")
			.query(" group by prnt_id ")
		;
	    return data.selectForMap(page, rows, (page == 1)); //
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
				if ("000".equals(row.getParamText("bas_cd") )) {
					throw new ServiceException( "삭제 하실수 없는 코드 입니다.", -99 );
				} else {	
					data.param
						.table("base_mst")
						.where("where bas_id  = :bas_id  " )
						//
						.unique("bas_id"            , row.fixParameter("bas_id"         ))
						.update("row_sts"          , 2  )
						.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
						.action = Action.delete ; 
					;data.attach();
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
//						.insert("base_gb"            , row.getParameter("base_gb"         ))
//						.insert("edit_yn"            , row.getParameter("edit_yn"         ))
						.update("row_sts"          , row.getParameter("row_sts"       ))
						.update("user_memo"          , row.getParameter("user_memo"       ))
						.update("upt_id"          , row.getParameter("upt_id"       ))
						//	.update("upt_ip"          , arg.getnew SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
						.update("upt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
						.insert("crt_id"          , row.getParameter("crt_id"       ))
						//.insert("crt_ip"          , arg.getnew SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
						.insert("crt_dttm"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
						.action = rowaction ; //Action.update ; 
					;data.attach();
			}
		}
		data.execute();
		return null ; 
	}

	
	/**
	 * 상품기초정보 조회
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDialog(HttpRequestArgument arg , int page, int rows) throws Exception {

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
	    return data.selectForMap(page, rows, (page == 1)); //
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	/**
//	 * 단위 품목 정보  
//	 * @param http
//	 * @return
//	 * @throws Exception
//	 */
//	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {
//
//		DataMessage data = arg.newStorage();  
//		data.param // 쿼리문  입력  
//			.query("select  a.hq_id   ,  a.stor_grp     , a.stor_id ")
//			.query("   ,    b.owner_id                                  ")
//			.query("   ,    b.share_yn   ,  a.share_gp     , c.prdt_sp  ")
//			.query("   ,    c.prdt_sts   ,  a.sale_sts     , b.item_code  , b.item_idcd ")
//			.query("   ,    b.unit_idcd    , (select unit_name from item_unit where unit_idcd = b.unit_idcd ) as unit_name ")
//			.query("   ,    b.unt_qty   ,  b.mst_itm_id      , c.mst_itm_cd     , c.prdt_nm   ")
//			.query("   ,    a.user_memo  ,  a.row_sts    , b.unit_seq ")
//			.query("from    itm_stor      a                           ")
//			.query("        join itm_mst  b on b.item_idcd = a.item_idcd  ")
//			.query("        join itm_grp  c on c.mst_itm_id = a.mst_itm_id  ")
//			.query("where   a.stor_id   = :stor_id  " , arg.fixParameter("stor_id"  ))
//			.query("and     a.mst_itm_id    = :mst_itm_id   " , arg.fixParameter("mst_itm_id"   ))
//			.query("and     a.row_sts < 2" )
//			.query("order by b.unit_seq" )
//		;
//		return data.selectForMap(); 
//	}
			
	
	
	
}
