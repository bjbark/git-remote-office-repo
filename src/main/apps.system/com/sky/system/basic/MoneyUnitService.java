package com.sky.system.basic;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class MoneyUnitService extends DefaultServiceHandler{

	/**
	 * 화폐 단위 관리
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계문
		    .total("select count(1) as maxsize  " )
		;    
		data.param // 쿼리문  입력  
			.query("select a.hq_id     , a.stor_grp                                   ")
			.query("     , a.bas_id      , a.bas_cd     , a.bas_nm ,a.bas_nm_englh         ")
			.query("     , a.prnt_id    , a.row_lvl   , a.row_sts  , a.user_memo   ")
		;
		data.param //퀴리문
			.where("from   base_mst a                                                   ")
			.where("where  a.prnt_id   = :prnt_id  "  , arg.fixParameter("prnt_id" ))
			.where("and    a.stor_grp    = :stor_grp   "  , arg.getParameter("stor_grp"  ))
			.where("and    a.bas_nm  like %:bas_nm%  "  , arg.getParameter("bas_nm"   ))
//			.where("and    a.row_sts < 2 " )
			.where("and    a.row_sts  = :row_sts " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우 
			.where("and    a.row_sts <= :row_sts " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우 
			.where("order by a.bas_cd  " )			
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 화폐 단위 관리 팝업
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {

		DataMessage data = arg.newStorage("POS");
		
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
			;
		
		data.param // 쿼리문  입력  
			.query("select a.hq_id     , a.stor_grp                                   ")
			.query("     , a.bas_id      , a.bas_cd     , a.bas_nm ,a.bas_nm_englh         ")
			.query("     , a.prnt_id    , a.row_lvl   , a.row_sts  , a.user_memo   ")
			.query("     , a.prdt_key     , a.code_len							         ")
		;
		
		data.param
			.where("from   base_mst a                                                   ")
			.where("where  a.prnt_id   = :prnt_id  "  , arg.fixParameter("prnt_id" ))
			.where("and    a.stor_grp    = :stor_grp   "  , arg.getParameter("stor_grp"  ))
			.where("and    a.bas_nm  like %:bas_nm%  "  , arg.getParameter("bas_nm"   ))
			.where("and    a.row_sts  = :row_sts " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우 
			.where("and    a.row_sts <= :row_sts " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우 
			.where("order by a.bas_cd                                                   ")
		;
	    return data.selectForMap(page, rows, (page == 1)); //
	}
	
}
