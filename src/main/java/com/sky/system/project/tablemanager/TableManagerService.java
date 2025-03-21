package com.sky.system.project.tablemanager;

import net.sky.http.dispatch.control.DefaultServiceHandler;


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
public class TableManagerService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getTable(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query( "select *																			")
		;
		data.param
			.where("from ( 																				")
			.where("select 																				")
			.where("       prjt_dvsn ,  lower(tabl_idcd) as tabl_idcd  , tabl_name      , oldd_idcd		")
			.where("from   cert_table_list																")
			.where("where  1 = 1																		")
			.where("and    lower(tabl_idcd) like %:tabl_name%	" , arg.getParamText("tabl_name" ).toLowerCase() )
			.where("and    lower(tabl_name) like %:tabl_idcd%	" , arg.getParamText("tabl_idcd" ).toLowerCase() )
			.where("and    lower(oldd_idcd) like %:oldd_idcd%	" , arg.getParamText("oldd_idcd" ).toLowerCase() )
			.where("and    lower(prjt_dvsn) = :prjt_dvsn		" , arg.getParamText("prjt_dvsn" ).toLowerCase() )
			.where("and    find_name like %:find_name% 			" , arg.getParamText("find_name" ) )
			.where("union all																			")
			.where("select 																				")
			.where("       null as prjt_dvsn, '' as tabl_idcd , '전체' as  tabl_name , null as oldd_idcd	")
			.where(") z																					")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 *
	 */
	public SqlResultMap getTableLookup(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select 																			")
			.query("        prjt_dvsn          , tabl_idcd      , tabl_name      , oldd_idcd		")
			.query("from   cert_table_list															")
			.query("where  1 = 1																	")
			.query("and    lower(find_name)  like %:find_name%	" , arg.getParamText("find_name" ).toLowerCase() )
			.query("and    lower(tabl_idcd)  like %:tabl_name%	" , arg.getParamText("tabl_name" ).toLowerCase() )
			.query("and    lower(tabl_name)  like %:tabl_idcd%	" , arg.getParamText("tabl_idcd" ).toLowerCase() )
			.query("and    lower(oldd_idcd)  like %:oldd_idcd%	" , arg.getParamText("oldd_idcd" ).toLowerCase() )
			.query("and    lower(prjt_dvsn)  = :prjt_dvsn		" , arg.getParamText("prjt_dvsn" ).toLowerCase() )
		;
		return data.selectForMap();
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
			.query("select 																					")
			.query("       a.fied_seqn  , a.tabl_idcd   , l.tabl_name										")
			.query("     , lower(a.engl_fied_name) as engl_fied_name    , a.fied_name						")
			.query("     , a.data_type  , a.data_leng   , a.key_dvcd    , a.null_dvcd      , a.dflt_valu	")
			.query("     , a.word_1     , a.engl_word_1 , a.word_2      , a.engl_word_2						")
			.query("     , a.word_3     , a.engl_word_3 , a.word_4      , a.engl_word_4						")
			.query("     , a.word_5     , a.engl_word_5 , a.word_6      , a.engl_word_6						")
			.query("     , a.oldd_idcd  , a.oldd_name   , a.prjt_dvsn										")
			.query("     , case when a.engl_fied_name like '%dvcd%'											")
			.query("            then (select sbsc_valu from sscd_mast where sscd_code = engl_fied_name)		")
			.query("            else  case when a.engl_fied_name like  '%bacd%'								")
			.query("                       then a.remk														")
			.query("                       else null 														")
			.query("                  end																	")
			.query("       end  as code_desc																")
			.query("     , case when a.key_dvcd = 'K' then concat(fied_name,'') else fied_name end as disp_fied_name	")
		;
		data.param // 쿼리문  입력
			.where("from   cert_table a																		")
			.where("       left outer join cert_table_list l on a.tabl_idcd = l.tabl_idcd 					")
			.where("where  1 = 1																			")
			.where("and    a.tabl_name        = :tabl_name		" , arg.getParamText("tabl_name" ))
			.where("and    lower(a.prjt_dvsn) = :prjt_dvsn		" , arg.getParamText("prjt_dvsn" ).toLowerCase() )
			.where("and    lower(a.engl_fied_name) like %:engl_fied_name%	" , arg.getParamText("engl_fied_name" ).toLowerCase() )
			.where("and    a.fied_name        like %:fied_name%	" , arg.getParamText("fied_name" ) )
			.where("and    lower(a.oldd_idcd) like %:oldd_idcd%	" , arg.getParamText("oldd_idcd" ).toLowerCase() )
			.where("and    upper(a.engl_fied_name) not in ('USER_MEMO','SYSM_MEMO','PRNT_IDCD'				")
			.where("     , 'LINE_LEVL'      , 'LINE_ORDR' , 'LINE_STAT' , 'LINE_CLOS' , 'FIND_NAME'			")
			.where("     , 'UPDT_USER_NAME' , 'UPDT_IPAD' , 'UPDT_DTTM' , 'UPDT_IDCD' , 'UPDT_URIF'			")
			.where("     , 'CRTE_USER_NAME' , 'CRTE_IPAD' , 'CRTE_DTTM' , 'CRTE_IDCD' , 'CRTE_URIF')		")
			.where(" order by fied_seqn																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchDomain(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select * 																				")
		;
		data.param
			.where(" from (																					")
			.where("  select prjt_dvsn      , fied_name   , fied_name_alis									")
			.where("       , lower(engl_fied_name) as engl_fied_name   , dmin_name  , data_type , data_leng	")
			.where("       , word_1         , engl_word_1 , word_2     , engl_word_2						")
			.where("       , word_3         , engl_word_3 , word_4     , engl_word_4						")
			.where("       , word_5         , engl_word_5 													")
			.where("       , fied_desc																		")
			.where("       , case when engl_fied_name like '%dvcd%'											")
			.where("              then (select sbsc_valu from sscd_mast where sscd_code = engl_fied_name)	")
			.where("              else  case when engl_fied_name like  '%bacd%'								")
			.where("                         then a.remk													")
			.where("                         else null 														")
			.where("                    end																	")
			.where("          end  as code_desc																")
			.where("from   cert_field																		")
			.where("where  1 = 1																			")
			.where("and    lower(fied_idcd) like %:fied_idcd%	" , arg.getParamText("fied_idcd" ).toLowerCase() )
			.where("and    fied_name        like %:fied_name%	" , arg.getParamText("fied_name" ) )
			.where("and    find_name like %:find_name% 			" , arg.getParamText("find_name" ) )
			.where("and    lower(prjt_dvsn) = :prjt_dvsn		" , arg.getParamText("prjt_dvsn" ).toLowerCase() )
			.where(") z																						")
			.where("order by engl_fied_name																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearchDomainUse(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select * 															")
		;
		data.param
			.where(" from (																")
			.where("select a.tabl_idcd , a.tabl_name									")
			.where("from   cert_table_list a											")
			.where("where  1 = 1														")
			.where("and    tabl_idcd in (select tabl_name								")
			.where("                     from   cert_table r							")
			.where("                     where  1=1										")
			.where("                     and    fied_idcd = :fied_idcd" , arg.getParamText("engl_fied_name" ).toLowerCase() )
			.where("                     and    prjt_dvsn = :prjt_dvsn" , arg.getParamText("prjt_dvsn" ) )
			.where("                     ) 												")
			.where(") z																	")
			.where("order by tabl_idcd													")
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
	public SqlResultMap getWord(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select 																	")
			.query("       prjt_dvcd , word_name , shrt_word_1 , shrt_word_2 , full_word	")
			.query("from   cert_word														")
			.query("where  1 = 1															")
			.query("and    lower(word_name) like %:word_name% " , arg.getParamText("word_name" ).toLowerCase() )
			.query("and    shrt_word_1 like %:shrt_word_1% 		" , arg.getParamText("shrt_word_1" ) )
		;
	    return data.selectForMap();
	}
	/**
	 *
	 */
	public SqlResultMap getWordLookup(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select 																	")
			.query("       prjt_dvcd , word_name , shrt_word_1 , shrt_word_2 , full_word	")
			.query("from   cert_word														")
			.query("where  1 = 1															")
			.query("and    lower(word_name) like %:word_name%	" , arg.getParamText("word_name" ).toLowerCase() )
			.query("and    shrt_word_1 like %:shrt_word_1% 		" , arg.getParamText("shrt_word_1" ) )
		;
	    return data.selectForMap();
	}
	/**
	 *
	 */
	public SqlResultMap getDomainLookup(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select 															")
			.query("       fied_idcd  , fied_name   , engl_fied_name				")
			.query("     , data_type  , data_leng									")
			.query("     , word_1     , engl_word_1 , word_2     , engl_word_2		")
			.query("     , word_3     , engl_word_3 , word_4     , engl_word_4		")
			.query("     , word_5     , engl_word_5 , word_6     , engl_word_6		")
			.query("     , oldd_idcd  , oldd_name									")
			.query("from   cert_field												")
			.query("where  1 = 1													")
			.query("and    lower(fied_idcd) like %:fied_idcd%	" , arg.getParamText("fied_idcd" ).toLowerCase() )
			.query("and    fied_name like %:fied_name% 			" , arg.getParamText("fied_name" ) )
		;
	    return data.selectForMap();
	}

	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("cert_table")
					.where("where tabl_idcd = :tabl_idcd ")
					//
					.unique("tabl_idcd"   , row.fixParameter("tabl_idcd"))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("cert_table")
					.where("where tabl_idcd = :tabl_idcd ")
					//
					.unique("tabl_idcd"   			, row.fixParameter("tabl_idcd"     ))
					.update("tabl_name"             , row.getParameter("tabl_name"     ))
					.update("engl_fied_name"        , row.getParameter("engl_fied_name"))
					.update("fied_name"             , row.getParameter("fied_name"     ))
					.update("data_type"             , row.getParameter("data_type"     ))
					.update("data_leng"             , row.getParameter("data_leng"     ))
					.update("key_dvcd"              , row.getParameter("key_dvcd"      ))
					.update("null_dvcd"             , row.getParameter("null_dvcd"     ))
					.update("dflt_valu"             , row.getParameter("dflt_valu"     ))
					.update("word_1"                , row.getParameter("word_1"        ))
					.update("engl_word_1"           , row.getParameter("engl_word_1"   ))
					.update("word_2"                , row.getParameter("word_2"        ))
					.update("engl_word_2"           , row.getParameter("engl_word_2"   ))
					.update("word_3"                , row.getParameter("word_3"        ))
					.update("engl_word_3"           , row.getParameter("engl_word_3"   ))
					.update("word_4"                , row.getParameter("word_4"        ))
					.update("engl_word_4"           , row.getParameter("engl_word_4"   ))
					.update("word_5"                , row.getParameter("word_5"        ))
					.update("engl_word_5"           , row.getParameter("engl_word_5"   ))
					.update("word_6"                , row.getParameter("word_6"        ))
					.update("engl_word_6"           , row.getParameter("engl_word_6"   ))
					.update("oldd_idcd"             , row.getParameter("oldd_idcd"     ))
					.update("oldd_name"             , row.getParameter("oldd_name"     ))
					.update("prjt_dvsn"             , row.getParameter("prjt_dvsn"     ))
//					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
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
	public SqlResultMap setDomain(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("cert_table")
					.where("where tabl_idcd = :tabl_idcd ")
					//
					.unique("tabl_idcd"   , row.fixParameter("tabl_idcd"))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("cert_table")
					.where("where tabl_idcd = :tabl_idcd ")
					//
					.unique("tabl_idcd"   			, row.fixParameter("tabl_idcd"     ))
					.update("tabl_name"             , row.getParameter("tabl_name"     ))
					.update("engl_fied_name"        , row.getParameter("engl_fied_name"))
					.update("fied_name"             , row.getParameter("fied_name"     ))
					.update("data_type"             , row.getParameter("data_type"     ))
					.update("data_leng"             , row.getParameter("data_leng"     ))
					.update("key_dvcd"              , row.getParameter("key_dvcd"      ))
					.update("null_dvcd"             , row.getParameter("null_dvcd"     ))
					.update("dflt_valu"             , row.getParameter("dflt_valu"     ))
					.update("word_1"                , row.getParameter("word_1"        ))
					.update("engl_word_1"           , row.getParameter("engl_word_1"   ))
					.update("word_2"                , row.getParameter("word_2"        ))
					.update("engl_word_2"           , row.getParameter("engl_word_2"   ))
					.update("word_3"                , row.getParameter("word_3"        ))
					.update("engl_word_3"           , row.getParameter("engl_word_3"   ))
					.update("word_4"                , row.getParameter("word_4"        ))
					.update("engl_word_4"           , row.getParameter("engl_word_4"   ))
					.update("word_5"                , row.getParameter("word_5"        ))
					.update("engl_word_5"           , row.getParameter("engl_word_5"   ))
					.update("word_6"                , row.getParameter("word_6"        ))
					.update("engl_word_6"           , row.getParameter("engl_word_6"   ))
					.update("oldd_idcd"             , row.getParameter("oldd_idcd"     ))
					.update("oldd_name"             , row.getParameter("oldd_name"     ))
					.update("prjt_dvsn"             , row.getParameter("prjt_dvsn"     ))
//					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction ;
				}
			;data.attach();
		}
		data.execute();
		return null ;
	}
}
