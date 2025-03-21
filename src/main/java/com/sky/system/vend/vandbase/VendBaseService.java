package com.sky.system.vend.vandbase;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class VendBaseService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
		    .total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.hq_id     , a.stor_grp												")
			.query("     , a.bas_id    , a.bas_cd    , a.bas_nm ,a.bas_nm_englh					")
			.query("     , a.prnt_id   , a.row_lvl   , a.row_sts  , a.user_memo					")
		;
		data.param //퀴리문
			.where("from   base_mst a															")
			.where("where  a.prnt_id   = :prnt_id     " , arg.fixParameter("prnt_id"))
			.where("and    a.stor_grp  = :stor_grp    " , arg.fixParameter("stor_grp"))
			.where("and    a.bas_nm    like %:bas_nm% " , arg.getParameter("bas_nm"))

			.where("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )

			.where("order by a.bas_cd															")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 상품기초정보 조회
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.hq_id      , a.stor_grp											")
			.query("     , a.bas_id     , a.bas_cd    , a.bas_nm   , a.bas_nm_englh				")
			.query("     , a.prnt_id    , a.row_lvl   , a.row_sts  , a.user_memo					")
			.query("     , a.prdt_key   , a.code_len											")
		;
		data.param
			.where("from   base_mst a															")
			.where("where  a.prnt_id   = :prnt_id     " , arg.fixParameter("prnt_id" ))
			.where("and    a.stor_grp  = :stor_grp    " , arg.fixParameter("stor_grp"  ))
			.where("and    a.bas_nm    like %:bas_nm% " , arg.getParameter("bas_nm"   ))
			.where("and    a.row_sts   = :row_sts     " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("and    a.row_sts  <= :row_sts     " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("order by a.bas_cd															")
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
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("base_mst")
					.where("where bas_id  = :bas_id  " )
					//
					.unique("bas_id"            , row.fixParameter("bas_id"         ))
					.update("row_sts"           , 2  )
					.update("upt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
			} else {
				data.param
					.table("base_mst")
					.where("where bas_id  = :bas_id  " )
					//
					.unique("hq_id"             , row.fixParameter("hq_id"        ))
					.unique("stor_grp"          , row.fixParameter("stor_grp"        ))
					.unique("bas_id"            , row.fixParameter("bas_id"         ))
					.update("bas_cd"            , row.getParameter("bas_cd"         ))
					.update("bas_nm"            , row.getParameter("bas_nm"         ))
					.update("bas_nm_englh"      , row.getParameter("bas_nm_englh"         ))
					.insert("prnt_id"           , row.getParameter("prnt_id"       ))
					.insert("row_lvl"           , row.getParameter("row_lvl"       ))
					.update("row_sts"           , row.getParameter("row_sts"       ))
					.update("user_memo"          , row.getParameter("user_memo"       ))

					.update("upt_id"            , row.getParameter("upt_id"      ))
					.insert("crt_id"            , row.getParameter("crt_id"      ))
					.update("upt_ip"            , arg.remoteAddress )
					.insert("crt_ip"            , arg.remoteAddress )
			        .update("upt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}



}



