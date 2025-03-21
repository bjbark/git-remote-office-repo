package com.sky.system.project.projinfo;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class ProjInfoService extends DefaultServiceHandler{
	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select a.pjt_id    , a.pjt_cd     , a.pjt_nm    , a.pjt_gb			")
			.query("     , a.pjt_url   , a.row_sts    , a.row_ord   , a.user_memo		")
			.query("from   pjt_mst a													")
			.query("where  a.row_sts < 2												")
			.query("order by a.row_ord													")
			//.query("and    a.site_id <> 'control' " )
		;
	    return data.selectForMap();
	}

	/**
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select a.pjt_id , a.pjt_cd , a.pjt_nm  , a.pjt_gb					")
			.query("from   pjt_mst a													")
			.query("where  a.row_sts < 2												")
			.query("and    a.pjt_gb <> '0000'											")

			.where("and    a.pjt_nm like %:pjt_nm% " , arg.getParameter("find_nm" ) )
			.where("and    a.row_sts    = :row_sts " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("and    a.row_sts   <= :row_sts " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
		;
	    return data.selectForMap();
	}

	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				row.setParameter("row_sts" , 2   );
				rowaction = Action.update;
			}
			data.param
				.table("pjt_mst")
				.where("where pjt_id  = :pjt_id  " )
		        //
		        .unique("pjt_id"            , row.fixParameter("pjt_id"         ))
		        .update("pjt_cd"            , row.fixParameter("pjt_cd"         ))
		        .update("pjt_nm"            , row.getParameter("pjt_nm"         ))
		        .insert("pjt_gb"            , row.getParameter("pjt_gb"         ))

		        .update("pjt_url"           , row.getParameter("pjt_url"         ))
		        .update("user_memo"         , row.getParameter("user_memo"       ))
		        .update("row_sts"           , row.getParameter("row_sts"       ))
		        .update("row_ord"           , row.getParameter("row_ord"       ))

				.update("upt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("crt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
        	;data.attach(Action.modify);

			data.param
				.table("prdt_info")
				.where("where prdt_id  = :prdt_id  " )
				//
				.unique("pjt_id"             , row.fixParameter("pjt_id"        ))
				.unique("prdt_id"            , row.fixParameter("pjt_id"        ))
				.insert("prdt_cd"            , row.fixParameter("pjt_id"        ))
				.insert("prdt_nm"            , row.getParameter("pjt_nm"        ))
				.insert("row_sts"            , row.getParameter("row_sts"       ))
				.update("upt_dttm"           , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("crt_dttm"           , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			;data.attach(Action.modify);



//        	0000014821


			//if (rowaction == Action.insert){
			data.param
				.table("pjt_menu")
				.where("where menu_id  = :menu_id  " )
				//
				.unique("pjt_id"             , row.fixParameter("pjt_id"         ))
				.unique("menu_id"             , row.fixParameter("pjt_id"        ))
				.update("menu_nm"             , row.getParameter("pjt_nm"        ))
				.insert("prnt_id"             , "0" )
				.insert("modl_yn"             , "1" )
				.insert("row_lvl"             , "1" )
				.insert("row_ord"             , "0" )
				.update("row_sts"             , row.getParameter("row_sts"       ))
				.update("upt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("crt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			;data.attach(Action.modify);

		}

		data.execute();
		return null ;
	}
}

