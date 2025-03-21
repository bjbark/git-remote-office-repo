package com.sky.system.project.domain;

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
public class DomainService extends DefaultServiceHandler{
	/**
	 *
	 */
	public SqlResultMap getTable(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query( "select *																	")
		;
		data.param
			.where("from ( 																		")
			.where("select 																		")
			.where("       a.prjt_dvsn    , a.tabl_idcd      , a.tabl_name     , a.oldd_idcd	")
			.where("from   cert_table_list a													")
			.where("where  1 = 1																")
			.where("and    lower(find_name)  like %:find_name%  " , arg.getParamText("find_name" ).toLowerCase() )
			.where("and    lower(tabl_idcd)  like %:tabl_name%  " , arg.getParamText("tabl_name" ).toLowerCase() )
			.where("and    lower(tabl_name)  like %:tabl_idcd%  " , arg.getParamText("tabl_idcd" ).toLowerCase() )
			.where("and    lower(oldd_idcd)  like %:oldd_idcd%  " , arg.getParamText("oldd_tabl" ).toLowerCase() )
			.where("and    lower(prjt_dvsn) = :prjt_dvsn        " , arg.getParamText("prjt_dvsn" ).toLowerCase() )
		//	.where("union all																   ")
		//	.where("select 																	   ")
		//	.where("        null as id  , '' as tabl_idcd , '전체' as  tabl_name   , null as old_id , null as prjt_dvsn	")
			.where(") z																			")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 *
	 */
	public SqlResultMap getTableLookup(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select 																		")
			.query("       a.prjt_dvsn    , a.tabl_idcd      , a.tabl_name     , a.oldd_idcd	")
			.query("from   cert_table_list a													")
			.query("where  1 = 1																")
			.query("and    lower(find_name)  like %:find_name%  " , arg.getParamText("find_name" ).toLowerCase() )
			.query("and    lower(tabl_idcd)  like %:tabl_idcd%  " , arg.getParamText("tabl_idcd" ).toLowerCase() )
			.query("and    lower(tabl_name)  like %:tabl_name%  " , arg.getParamText("tabl_name" ).toLowerCase() )
			.query("and    lower(oldd_idcd)  like %:oldd_idcd%  " , arg.getParamText("oldd_tabl" ).toLowerCase() )
			.query("and    lower(prjt_dvsn)  = :prjt_dvsn		" , arg.getParamText("prjt_dvsn" ).toLowerCase() )
		;
	    return data.selectForMap();
	}
	/**
	 *
	 */
	public SqlResultMap getSearchTable(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select *																				")
		;
		data.param // 쿼리문  입력
			.where("from ( 																					")
			.where("select 																					")
			.where("       a.prjt_dvsn   , a.tabl_idcd   , a.tabl_name   , a.fied_idcd   , a.fied_seqn		")
			.where("     , a.key_dvcd    , a.null_dvcd   , a.dflt_valu   , a.oldd_idcd						")
			.where("     , b.fiel_name   , b.data_type   , b.data_leng   , b.fied_desc						")
			.where("     , b.prnt_idcd																		")
			.where("     , remk  as prnt_txt																")

// 동원 프로젝트를 위해 잠시 막아둔 원본 소스
//			.where("     , case ref_table when 'base_mst'													")
//			.where("                      then (select group_concat(concat(bas_cd,':',bas_nm,' '))			")
//			.where("                            from   asp_db.base_mst										")
//			.where("                            where  prnt_id = b.prnt_gbcd								")
//			.where("                            group  by prnt_id )											")
//			.where("                      else  case when b.prnt_gbcd is null 								")
//			.where("                                 then null												")
//			.where("                                 else (select max(itm_val)								")
//			.where("                                       from   code_mst  								")
//			.where("                                       where  code_cd = b.prnt_gbcd )					")
//			.where("                                 end 													")
//			.where("                      end as prnt_txt													")




			.where("from   cert_table a																		")
			.where("       left outer join cert_field b	on a.fied_idcd = b.engl_fied_name and a.prjt_dvsn = b.prjt_idcd	")
			.where("where  1 = 1																			")
			.where("and    tabl_name           =     :tabl_name    " , arg.getParamText("tabl_name" ))
			.where("and    lower(a.prjt_dvsn)  =     :prjt_dvsn    " , arg.getParamText("prjt_dvsn" ).toLowerCase() )
			.where("and    lower(a.fied_idcd)  like %:fied_idcd%   " , arg.getParamText("fied_idcd" ).toLowerCase() )
			.where("and    lower(a.fied_name)  like %:fied_name%   " , arg.getParamText("fied_name" ) )
			.where("and    lower(a.oldd_idcd)  like %:oldd_idcd%   " , arg.getParamText("oldd_idcd" ).toLowerCase() )
//			.where("and    (lower(a.find_nm) like %:find_nm1%  " , arg.getParamText("find_nm" ).toLowerCase() )
//			.where("       or    lower(b.find_nm) like %:find_nm2% )  " , arg.getParamText("find_nm" ).toLowerCase() )
			.where("and    upper(a.fied_idcd) not in ('USER_MEMO','SYSM_MEMO','PRNT_IDCD'					")
			.where("     , 'LINE_LEVL'      , 'LINE_ORDR' , 'LINE_STAT' , 'LINE_CLOS' , 'FIND_NAME'			")
			.where("     , 'UPDT_USER_NAME' , 'UPDT_IPAD' , 'UPDT_DTTM' , 'UPDT_IDCD' , 'UPDT_URIF'			")
			.where("     , 'CRTE_USER_NAME' , 'CRTE_IPAD' , 'CRTE_DTTM' , 'CRTE_IDCD' , 'CRTE_URIF')		")
			.where("order by a.fld_seq																		")
			.where(") a																						")
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
	public SqlResultMap getRelation(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select *																						")
		;
		data.param // 쿼리문  입력
			.where("from (                                                                                          ")
			.where("select                                                                                          ")
			.where("        a.relt_idcd         , a.relt_name         , a.mast_tabl      , a.dtil_tabl       , a.desct		")
			.where("      , m.tabl_name      as mast_tabl_nm    , d.tabl_name  as dtl_tabl_nm						")
			.where("      , a.relt_type_gbcd  , a.relt_degr_gbcd														")
			.where("      , a.usr_memo       , a.sys_memo       , a.prnt_id											")
			.where("      , a.row_lvl        , a.row_ord        , a.row_sts        , a.row_clos       , a.find_nm	")
			.where("      , a.upt_usr_nm     , a.upt_ip         , a.upt_dttm       , a.upt_id         , a.upt_ui	")
			.where("      , a.crt_usr_nm     , a.crt_ip         , a.crt_dttm       , a.crt_id         , a.crt_ui	")
			.where("from    cret_table_relation a																		")
			.where("        left outer join cert_table_list m on a.mast_tabl = m.tabl_idcd								")
			.where("        left outer join cert_table_list d on a.dtil_tabl  = d.tabl_idcd								")
			.where("where   1=1																						")
			.where("and      a.mast_tabl = :mast_tabl  " , arg.getParamText  ("mast_tabl") )
			.where("and      a.find_nm like %:find_nm% " , arg.getParamText  ("find_nm") )
			.where("and     a.row_sts   = :row_sts     " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts   < :row_sts     " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a																								")
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
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select  *																					")
		;

		data.param // 쿼리문  입력
			.where("from (																						")
			.where("select																						")
			.where("       a.line_no        , a.field_id     , a.fied_name    , a.field_nm_englh , a.field_nm_chi")
			.where("     , a.field_nm_jpns  , a.field_nm_etc , a.data_type   , a.data_len       , a.w_nm_1		")
			.where("     , a.w_id_1         , a.w_nm_2       , a.w_id_2      , a.w_nm_3         , a.w_id_3		")
			.where("     , a.w_nm_4         , a.w_id_4       , a.w_nm_5      , a.w_id_5         , a.w_nm_6		")
			.where("     , a.w_id_6         , a.old_id       , a.dscrt       , a.ref_table      , a.inter_val	")
			.where("     , a.prnt_gbcd																			")
			.where("     , a.usr_memo       , a.sys_memo     , a.prnt_id     , a.row_lvl        , a.row_ord		")
			.where("     , a.row_sts        , a.row_clos     , a.find_nm     , a.upt_usr_nm     , a.upt_ip		")
			.where("     , a.upt_dttm       , a.upt_id       , a.upt_ui      , a.crt_usr_nm     , a.crt_ip		")
			.where("     , a.crt_dttm       , a.crt_id       , a.crt_ui											")
			.where("from  rnd_domain a																			")
			.where("where 1=1																					")
			.where("and   find_nm like %:find_nm%  ",	arg.getParamText("find_nm" ) )
			.where(") a																							")
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

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select  *																						")
		;

		data.param // 쿼리문  입력
			.where("from (																							")
			.where("select																							")
			.where("       a.prjt_idcd     , a.fied_name      , a.fied_name_alis , a.engl_fied_name					")
			.where("     , a.word_1        , a.word_2         , a.word_3         , a.word_4         , a.word_5		")
			.where("     , a.dmin_name     , a.data_type      , a.data_leng      , a.fied_desc      , remk			")
			.where("     , a.engl_name_1   , a.engl_name_2    , a.engl_name_3    , a.engl_name_4    , a.engl_name_5	")
			.where("from   cert_field a																				")
			.where("where  1=1																						")
			.where("and    find_name like %:find_name%  ",	arg.getParamText("find_name" ) )
			.where(") a																								")
	    ;
	    return data.selectForMap();
	}

	public SqlResultMap getSearchWord(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize														")
		;
		data.param // 쿼리문  입력
			.query("select  *																			")
		;

		data.param // 쿼리문  입력
			.where("from (																				")
			.where("select																				")
			.where("       a.line_no     , a.w_nm        , a.w_id        , a.w_id_2         , a.full_nm	")
			.where("     , a.usr_memo    , a.sys_memo    , a.prnt_id     , a.row_lvl        , a.row_ord	")
			.where("     , a.row_sts     , a.row_clos    , a.find_nm     , a.upt_usr_nm     , a.upt_ip	")
			.where("     , a.upt_dttm    , a.upt_id      , a.upt_ui      , a.crt_usr_nm     , a.crt_ip	")
			.where("     , a.crt_dttm    , a.crt_id      , a.crt_ui										")
			.where("from   rnd_word a																	")
			.where("where  1=1																			")
			.where("and    find_nm like %:find_nm%    ", arg.getParamText("find_nm" ) )
			.where(") a																					")
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
	public SqlResultMap getLookupWord(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select  *																")
		;

		data.param // 쿼리문  입력
			.where("from (																	")
			.where("select																	")
			.where("	  a.line_no    , a.w_nm      , a.w_id      , a.w_id_2   , a.full_nm	")
			.where("from  rnd_word a														")
			.where("where 1=1																")
			.where("and   find_nm like %:find_nm% ",	arg.getParamText("fied_name" ) )
			.where(") a																		")
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
					.table("rnd_domain")
					.where("where field_id = :field_id ")
					//
					.unique("field_id"   , row.fixParameter("field_id"))
					.action	= Action.delete;

			} else {
				if (!row.getParamText("_field_id").equals(row.getParamText("field_id"))&&row.getParamText("_field_id").length()>1) {
					data.param
						.table("rnd_domain")
						.where("where field_id = :field_id ")
						//
						.unique("field_id"   , row.getParamText("_field_id"))
						.action = Action.delete;
					data.attach();
				}
				data.param
					.table("rnd_domain")
					.where("where field_id = :field_id ")
			        //
					.unique("field_id"       	, row.getParameter("field_id"       	))
					.update("fied_name"       	, row.getParameter("fied_name"       	))
					.update("field_nm_englh" 	, row.getParameter("field_nm_englh" 	))
					.update("field_nm_chi"		, row.getParameter("field_nm_chi"   	))
					.update("field_nm_jpns"  	, row.getParameter("field_nm_jpns"  	))
					.update("field_nm_etc"   	, row.getParameter("field_nm_etc"   	))
					.update("data_type"      	, row.getParameter("data_type"      	))
					.update("data_len"       	, row.getParameter("data_len"       	))
					.update("w_nm_1"         	, row.getParameter("w_nm_1"         	))
					.update("w_id_1"         	, row.getParameter("w_id_1"         	))
					.update("w_nm_2"         	, row.getParameter("w_nm_2"         	))
					.update("w_id_2"         	, row.getParameter("w_id_2"         	))
					.update("w_nm_3"         	, row.getParameter("w_nm_3"         	))
					.update("w_id_3"         	, row.getParameter("w_id_3"         	))
					.update("w_nm_4"         	, row.getParameter("w_nm_4"         	))
					.update("w_id_4"         	, row.getParameter("w_id_4"         	))
					.update("w_nm_5"         	, row.getParameter("w_nm_5"         	))
					.update("w_id_5"         	, row.getParameter("w_id_5"         	))
					.update("w_nm_6"         	, row.getParameter("w_nm_6"         	))
					.update("w_id_6"         	, row.getParameter("w_id_6"         	))
					.update("old_id"         	, row.getParameter("old_id"         	))
					.update("dscrt"          	, row.getParameter("dscrt"          	))
					.update("ref_table"      	, row.getParameter("ref_table"      	))
					.update("prnt_gbcd"      	, row.getParameter("prnt_gbcd"      	))
					.update("inter_val"      	, row.getParameter("inter_val"      	))
					.update("usr_memo"          , row.getParameter("usr_memo"           ))  /*  사용자메모  */
					.update("sys_memo"          , row.getParameter("sys_memo"           ))  /*  시스템메모  */
					.update("prnt_id"           , row.getParameter("prnt_id"            ))  /*  상위 ID  */
					.update("row_lvl"           , row.getParameter("row_lvl"            ))  /*  ROW레벨  */
					.update("row_ord"           , row.getParameter("row_ord"            ))  /*  ROW순서  */
					.update("row_sts"           , row.getParameter("row_sts"            ))  /*  ROW상태  */
					.update("row_clos"          , row.getParameter("row_clos"           ))  /*  마감여부  */
					.update("find_nm"      	    , row.getParamText("field_id"       	).trim()
												+ row.getParamText("fied_name"           ).trim()
												+ row.getParamText("field_nm_englh"     ).trim()
												+ row.getParamText("field_nm_chi"       ).trim()
												+ row.getParamText("w_nm_1"        	    ).trim()
												+ row.getParamText("w_nm_2"        	    ).trim()
												+ row.getParamText("w_nm_3"        	    ).trim()
												+ row.getParamText("w_nm_4"        	    ).trim()
												+ row.getParamText("w_nm_5"        	    ).trim()
												+ row.getParamText("w_nm_6"        	    ).trim() )
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
			        .action = Action.modify ;
				}
        	;data.attach();
		}
		data.execute();
		return null ;
	}


	/**
	 *
	 */
	public SqlResultMap setRecordWord(HttpRequestArgument arg) throws Exception {
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
					.action = Action.delete;

			} else {
				data.param
					.table("rnd_word")
					.where("where w_nm = :w_nm ")
			        //
					.unique("w_nm"       	    , row.getParameter("w_nm"       		))
					.update("w_id"       	    , row.getParameter("w_id"       		))
					.update("w_id_2" 	        , row.getParameter("w_id_2" 			))
					.update("full_nm"		    , row.getParameter("full_nm"        	))
					.update("user_memo"         , row.getParameter("usr_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"         , row.getParameter("sys_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"         , row.getParameter("prnt_id"            ))  /*  상위 ID  */
					.update("line_levl"         , row.getParameter("row_lvl"            ))  /*  ROW레벨  */
					.update("line_ordr"         , row.getParameter("row_ord"            ))  /*  ROW순서  */
					.update("line_stat"         , row.getParameter("row_sts"            ))  /*  ROW상태  */
					.update("line_clos"         , row.getParameter("row_clos"           ))  /*  마감여부  */
					.update("find_name"         , row.getParamText("w_nm"       	    ).trim()
						                        + row.getParamText("w_id"               ).trim()
						                        + row.getParamText("w_id_2"             ).trim()
						                        + row.getParamText("full_nm"            ).trim())
					.update("upt_usr_nm"        , row.getParameter("upt_usr_nm"         ))  /*  수정사용자명  */
					.update("upt_ip"            , row.getParameter("upt_ip"             ))  /*  수정IP  */
					.update("upt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("upt_id"            , row.getParameter("upt_id"             ))  /*  수정ID  */
					.update("upt_ui"            , row.getParameter("upt_ui"             ))  /*  수정UI  */
					.insert("crt_usr_nm"        , row.getParameter("crt_usr_nm"         ))  /*  생성사용자명  */
					.insert("crt_ip"            , row.getParameter("crt_ip"             ))  /*  생성IP  */
					.insert("crt_dttm"          , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crt_id"            , row.getParameter("crt_id"             ))  /*  생성ID  */
					.insert("crt_ui"            , row.getParameter("crt_ui"             ))  /*  생성UI  */
			        .action = rowaction ;
				}
        	;data.attach();
		}
		data.execute();
		return null ;
	}
	/**
	 *
	 */
	public SqlResultMap setTable(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("cert_table				")
					.where("where tabl_idcd  = :tabl_idcd ")
					.where("and   prjt_dvsn  = :prjt_dvsn ")
					.where("and   tabl_name  = :tabl_name ")
					.where("and   fied_idcd  = :fied_idcd ")
					//
					.unique("tabl_idcd"            , row.fixParameter("tabl_idcd"))
					.unique("prjt_dvsn"            , row.fixParameter("prjt_dvsn"))
					.unique("tabl_name"            , row.fixParameter("tabl_name"))
					.unique("fied_idcd"            , row.fixParameter("fied_idcd"))
					.action = Action.delete;

			} else {
				if (!row.getParamText("_fld_id").equals(row.getParamText("fied_idcd"))&&row.getParamText("_fld_id").length()>1) {
					data.param
						.table("cert_table")
						.where("where tabl_idcd  = :tabl_idcd ")
						.where("and   prjt_dvsn  = :prjt_dvsn ")
						.where("and   tabl_name  = :tabl_name ")
						.where("and   fied_idcd  = :fied_idcd ")
						//
						.unique("tabl_idcd"            , row.fixParameter("tabl_idcd"))
						.unique("prjt_dvsn"            , row.fixParameter("prjt_dvsn"))
						.unique("tabl_name"            , row.fixParameter("tabl_name"))
						.update("fied_idcd"            , row.fixParameter("_fld_id"))
						.action = Action.delete;
					data.attach();
				}

				data.param
					.table("cert_table")
					.where("where tabl_idcd  = :tabl_idcd ")
					.where("and   prjt_dvsn  = :prjt_dvsn ")
					.where("and   tabl_name  = :tabl_name ")
					.where("and   fied_idcd  = :fied_idcd ")
					//
					.unique("tabl_idcd"         , row.fixParameter("tabl_idcd"))
					.unique("prjt_dvsn"         , row.fixParameter("prjt_dvsn"))
					.unique("tabl_name"         , row.fixParameter("tabl_name"))
					.update("fied_idcd"         , row.fixParameter("fied_idcd"))

					.update("fld_seq"           , row.getParameter("fld_seq"       ))
					.update("fied_name"         , row.getParameter("fied_name"     ))
					.update("data_type"         , row.getParameter("data_type"     ))
					.update("data_leng"         , row.getParameter("data_leng"     ))
					.update("key_dvcd"          , row.getParameter("key_dvcd"      ))
					.update("null_dvcd"         , row.getParameter("null_dvcd"     ))
					.update("dflt_valu"         , row.getParameter("dflt_valu"     ))
					.update("oldd_idcd"         , row.getParameter("oldd_idcd"     ))
					.update("find_name"         , row.getParamText("tabl_idcd"     ).trim()
											    + row.getParamText("prjt_dvsn"     ).trim()
												+ row.getParamText("tabl_name"     ).trim()
												+ row.getParamText("fied_name"     ).trim() )
//					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = Action.modify ;
				}
       	;data.attach();
		}
		data.execute();
		return null ;
	}
	/**
	 *
	 */
//	public SqlResultMap setRelation(HttpRequestArgument arg) throws Exception {
//		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
//		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
//		for(SqlResultRow row:map){
//			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
//			if (rowaction == Action.delete) {
//				data.param
//					.table("cret_table_relation"                                                 )
//					.where("where relt_idcd          = :relt_idcd                                ")  /*  관계ID  */
//				    //
//					.unique("relt_idcd"              , row.fixParameter("relt_idcd"              ))
//				    //
//					.action = Action.delete;
//			} else {
//				data.param
//					.table("cret_table_relation"                                                 )
//					.where("where relt_idcd          = :relt_idcd                                ")  /*  관계ID  */
//				    //
//					.unique("relt_idcd"              , row.fixParameter("relt_idcd"              ))
//				    //
//					.update("relt_name"              , row.getParameter("relt_name"              ))  /*  관계명  */
//					.update("mast_tabl"           , row.getParameter("mast_tabl"           ))  /*  마스터 테이블  */
//					.update("dtil_tabl"            , row.getParameter("dtil_tabl"            ))  /*  디테일 테이블  */
//					.update("desct"               , row.getParameter("desct"               ))  /*  설명  */
//					.update("relt_degr_gbcd"       , row.getParameter("relt_degr_gbcd"       ))  /*  관계차수구분코드  */
//					.update("relt_type_gbcd"       , row.getParameter("relt_type_gbcd"       ))  /*  관계타입구분코드  */
//					.update("usr_memo"            , row.getParameter("usr_memo"            ))  /*  사용자메모  */
//					.update("sys_memo"            , row.getParameter("sys_memo"            ))  /*  시스템메모  */
//					.update("prnt_id"             , row.getParameter("prnt_id"             ))  /*  상위 ID  */
//					.update("row_lvl"             , row.getParameter("row_lvl"             ))  /*  ROW레벨  */
//					.update("row_ord"             , row.getParameter("row_ord"             ))  /*  ROW순서  */
//					.update("row_sts"             , row.getParameter("row_sts"             ))  /*  ROW상태  */
//					.update("row_clos"            , row.getParameter("row_clos"            ))  /*  마감여부  */
//					.update("find_nm"      	      , row.getParamText("relt_name"       	   ).trim()
//											   	  + row.getParamText("mast_tabl"           ).trim()
//												  + row.getParamText("dtil_tabl"            ).trim()
//							)
//					.update("upt_usr_nm"          , row.getParameter("upt_usr_nm"          ))  /*  수정사용자명  */
//					.update("upt_ip"              , row.getParameter("upt_ip"              ))  /*  수정IP  */
//					.update("upt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
//					.update("upt_id"              , row.getParameter("upt_id"              ))  /*  수정ID  */
//					.update("upt_ui"              , row.getParameter("upt_ui"              ))  /*  수정UI  */
//					.insert("crt_usr_nm"          , row.getParameter("crt_usr_nm"          ))  /*  생성사용자명  */
//					.insert("crt_ip"              , row.getParameter("crt_ip"              ))  /*  생성IP  */
//					.insert("crt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
//					.insert("crt_id"              , row.getParameter("crt_id"              ))  /*  생성ID  */
//					.insert("crt_ui"              , row.getParameter("crt_ui"              ))  /*  생성UI  */
//					.action = rowaction ;
//				}
//      	;data.attach();
//		}
//		data.execute();
//		return null ;
//	}
	public SqlResultMap setRelation(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
			data.param
				.table("cret_table_relation"                                                 )
				.where("where relt_idcd          = :relt_idcd                                ")  /*  관계ID  */
			    //
				.unique("relt_idcd"              , arg.fixParameter("relt_idcd"            ))
			    //
				.update("relt_name"              , arg.getParameter("relt_name"            ))  /*  관계명  */
				.update("mast_tabl"              , arg.getParameter("mast_tabl"            ))  /*  마스터 테이블  */
				.update("dtil_tabl"              , arg.getParameter("dtil_tabl"            ))  /*  디테일 테이블  */
				.update("relt_desc"              , arg.getParameter("relt_desc"            ))  /*  설명  */
				.update("relt_degr_gbcd"         , arg.getParameter("relt_degr_gbcd"       ))  /*  관계차수구분코드  */
				.update("relt_type_gbcd"         , arg.getParameter("relt_type_gbcd"       ))  /*  관계타입구분코드  */
				.update("user_memo"              , arg.getParameter("user_memo"            ))  /*  사용자메모  */
				.update("sysm_memo"              , arg.getParameter("sysm_memo"            ))  /*  시스템메모  */
				.update("prnt_idcd"              , arg.getParameter("prnt_idcd"            ))  /*  상위 ID  */
				.update("line_levl"              , arg.getParameter("line_levl"            ))  /*  ROW레벨  */
				.update("line_ordr"              , arg.getParameter("line_ordr"            ))  /*  ROW순서  */
				.update("line_stat"              , arg.getParameter("line_stat"            ))  /*  ROW상태  */
				.update("line_clos"              , arg.getParameter("line_clos"            ))  /*  마감여부  */
				.update("find_name"      	     , arg.getParamText("relt_name"       	   ).trim()
										   	     + arg.getParamText("mast_tabl"            ).trim()
											     + arg.getParamText("dtil_tabl"            ).trim()
						)
				.update("updt_user_name"         , arg.getParameter("updt_user_name"       ))  /*  수정사용자명  */
				.update("updt_ipad"              , arg.getParameter("updt_ipad"            ))  /*  수정IP  */
				.update("updt_dttm"              , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("updt_idcd"              , arg.getParameter("updt_idcd"            ))  /*  수정ID  */
				.update("updt_urif"              , arg.getParameter("updt_urif"            ))  /*  수정UI  */
				.insert("crte_user_name"         , arg.getParameter("crte_user_name"       ))  /*  생성사용자명  */
				.insert("crte_ipad"              , arg.getParameter("crte_ipad"            ))  /*  생성IP  */
				.insert("crte_dttm"              , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"              , arg.getParameter("crte_idcd"            ))  /*  생성ID  */
				.insert("crte_urif"              , arg.getParameter("crte_urif"            ))  /*  생성UI  */
				.action = Action.modify ;
      	data.attach();
		data.execute();
		return null ;
	}
	public SqlResultMap deleteRelation(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param
			.query("delete from cret_table_relation									")
			.where("where relt_idcd          = :relt_idcd ", arg.fixParameter("relt_idcd"))  /*  관계ID  */
			.action = Action.direct ;
      	data.attach();
		data.execute();
		return null ;
	}

	/**
	 *
	 */
	public SqlResultMap setTableList(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("cert_table_list				")
					.where("where tabl_idcd  = :tabl_idcd ")
					.where("and   prjt_dvsn  = :prjt_dvsn ")
					.where("and   tabl_name  = :tabl_name ")
					//
					.unique("tabl_idcd"            , row.fixParameter("tabl_idcd"))
					.unique("prjt_dvsn"            , row.fixParameter("prjt_dvsn"))
					.unique("tabl_name"            , row.fixParameter("tabl_name"))
					.action = Action.delete;
			} else {
				data.param
					.table("cert_table_list")
					.where("where tabl_idcd  = :tabl_idcd ")
					.where("and   prjt_dvsn  = :prjt_dvsn ")
					.where("and   tabl_name  = :tabl_name ")
					//
					.unique("tabl_idcd"             , row.fixParameter("tabl_idcd"))
					.unique("prjt_dvsn"             , row.fixParameter("prjt_dvsn"))
					.unique("tabl_name"             , row.fixParameter("tabl_name"))
					.update("find_name"             , row.getParamText("tabl_idcd"     ).trim()
													+ row.getParamText("prjt_dvsn"     ).trim()
													+ row.getParamText("tabl_name"     ).trim())
					.update("oldd_idcd"             , row.getParameter("oldd_idcd"     ))
					.update("oldd_name"             , row.getParameter("oldd_name"     ))
//			        .action = rowaction ;
				.action = Action.modify ;
				}
      	;data.attach();
		}
		data.execute();
		return null ;
	}



}
