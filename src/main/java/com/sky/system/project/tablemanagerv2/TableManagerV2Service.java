package com.sky.system.project.tablemanagerv2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.listener.SeqListenerService;

@Service
public class TableManagerV2Service extends DefaultServiceHandler{

	@Autowired
	SeqListenerService sequence ;

	/**
	 *
	 */
	public SqlResultMap getTable(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
//		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query( "select *																						")
		;
		data.param
			.where("from ( 																							")
			.where("select table_schema , table_name , table_rows , data_length										")
			.where("     , date_format(create_time , '%Y-%m-%d %H:%i:%S') as create_time							")
			.where("     , date_format(update_time , '%Y-%m-%d %H:%i:%S') as update_time							")
			.where("     , table_comment																			")
			.where("FROM   information_schema.TABLES																")
			.where("where  TABLE_SCHEMA = :table_schema			" , arg.getParamText("table_schema" ).toLowerCase() )
			.where("and    table_comment     like %:tabl_name%	" , arg.getParamText("tabl_name" ).toLowerCase() )
			.where("and    lower(table_name) like %:tabl_idcd%	" , arg.getParamText("tabl_idcd" ).toLowerCase() )
			.where("and    concat(table_name, ' ', table_comment) like %:find_name%	" , arg.getParamText("find_name" ) )
			.where("union all																						")
			.where("select null as table_schema , ''   as table_name  , null as table_rows , null as data_length	")
			.where("     , null as create_time  , null as update_time , '전체'  as table_comment						")
			.where(") z																								")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 *
	 */
	public SqlResultMap getTableLookup(HttpRequestArgument arg) throws Exception {

//		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select table_schema , table_name , table_rows , data_length										")
			.query("     , create_time , update_time , table_comment												")
			.query("FROM information_schema.TABLES																	")
			.query("where  TABLE_SCHEMA = :table_schema			" , arg.getParamText("table_schema" ).toLowerCase() )
			.query("and    table_comment     like %:tabl_name%	" , arg.getParamText("tabl_name" ).toLowerCase() )
			.query("and    lower(table_name) like %:tabl_idcd%	" , arg.getParamText("tabl_idcd" ).toLowerCase() )
			.query("and    concat(table_name, ' ', table_comment) like %:find_name%	" , arg.getParamText("find_name" ) )
		;
		return data.selectForMap();
	}
	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
//		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select 																								")
			.query("      a.ordinal_position   as fied_seqn																")
			.query("    , a.table_name         as tabl_idcd																")
			.query("    , (select  table_comment																		")
			.query("        FROM    information_schema.TABLES r															")
			.query("        where  TABLE_SCHEMA = :table_schema1	" , arg.getParamText("table_schema" ).toLowerCase() )
			.query("        and     r.table_name = a.table_name															")
			.query("        )                   as tabl_name															")
			.query("    , lower(a.column_name) as engl_fied_name														")
			.query("    , a.column_comment     as fied_name																")
			.query("    , a.column_type        as data_type																")
			.query("    , null                 as data_leng																")
			.query("    , a.column_key         as key_dvcd																")
			.query("    , case when a.is_nullable = 'YES' then '' else   a.is_nullable end      as null_dvcd			")
			.query("    , case when a.column_default = 'NULL' then '' else a.column_default end as dflt_valu			")
			.query("    , null as word_1     , null as engl_word_1 , null as word_2      , null as engl_word_2			")
			.query("    , null as word_3     , null as engl_word_3 , null as word_4      , null as engl_word_4			")
			.query("    , null as word_5     , null as engl_word_5 , null as word_6      , null as engl_word_6			")
			.query("    , null as oldd_idcd  , null as oldd_name   , null as prjt_dvsn									")
			.query("    , case when a.column_name like '%dvcd%'															")
			.query("            then (select sbsc_valu from sscd_mast c where c.sscd_code = a.column_name and c.site_idcd = 'common')")
			.query("            else  case when a.column_name like  '%bacd%'											")
			.query("--                       then a.remk																")
			.query("                    then ''																			")
			.query("                    else ''																			")
			.query("                end																					")
			.query("      end  as code_desc																				")
			.query("--  , case when a.key_dvcd = 'K' then concat(fied_name,'') else fied_name end as disp_fied_name		")
			.query("    , column_comment  as disp_fied_name																")
			.query("    , r.locl_remk  as locl_remk																		")
			.query("    , r.comm_remk  as comm_remk																		")
		;
		data.param
			.where("from  information_schema.COLUMNS a																	")
			.where("      left outer join control_db.cert_table r on lower(a.column_name) = r.engl_fied_name and lower(a.TABLE_NAME) = r.tabl_name " )
			.where("where  1 = 1																						")
			.where("and    TABLE_SCHEMA = :table_schema2		" , arg.getParamText("table_schema" ).toLowerCase() )
			.where("and    upper(TABLE_NAME)   =  	:table_name	" , arg.getParamText("table_name" ))
			.where("and    upper(a.column_name) not in ('USER_MEMO','SYSM_MEMO','PRNT_IDCD'								")
			.where("    , 'LINE_LEVL'      , 'LINE_ORDR' , 'LINE_STAT' , 'LINE_CLOS' , 'FIND_NAME'						")
			.where("    , 'UPDT_USER_NAME' , 'UPDT_IPAD' , 'UPDT_DTTM' , 'UPDT_IDCD' , 'UPDT_URIF'						")
			.where("    , 'CRTE_USER_NAME' , 'CRTE_IPAD' , 'CRTE_DTTM' , 'CRTE_IDCD' , 'CRTE_URIF')						")
			.where("order by ordinal_position																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchDomain(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

//		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data = arg.newStorage("POS");
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
					.action = rowaction ;
				}
			;data.attach();
		}
		data.execute();
		return null ;
	}
	public SqlResultMap getTableCount(HttpRequestArgument arg) throws Exception {

		DataMessage sql = new DataMessage(SqlRepository.NETHOSTING);
		String table_schema = "";
		sql.param
			.query("select d.host_path												")
			.query("from   head_office a											")
			.query("left   outer join host_ddn d on a.pos_ddns = d.ddn_id			")
			.query("where  a.hq_id = :hq_id " ,  arg.getParamText("hqof_idcd" ))
		;
		SqlResultMap map1 = sql.selectForMap();
		if (map1.size() > 0) {
			for(SqlResultRow row:map1){
				table_schema = row.getParamText("host_path");
			}
		};

		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");
		data.param // 쿼리문  입력
			.query("select 																				")
			.query("       table_schema , table_name , ifnull(table_rows,0) as table_rows , data_length	")
			.query("from   information_schema.TABLES													")
			.query("where  1 = 1																		")
			.query("and    TABLE_SCHEMA = :table_schema " , table_schema								 )
			.query("and    table_name   = :table_name " , arg.getParamText("table_name" ))
		;
		return data.selectForMap();
	}

	public DataMessage setCreate(HttpRequestArgument arg) throws Exception {
		DataMessage sql = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");
		String table_schema = "";
		sql.param
			.query("select d.host_path												")
			.query("from   head_office a											")
			.query("left   outer join host_ddn d on a.pos_ddns = d.ddn_id			")
			.query("where  a.hq_id = :hq_id " ,  arg.getParamText("hqof_idcd" ))
		;
		SqlResultMap map1 = sql.selectForMap();
		if (map1.size() > 0) {
			for(SqlResultRow row:map1){
				table_schema = row.getParamText("host_path");
			}
		};
		data.param
			.query("call TABLE_DATA_BACKUP (										")
			.query("   :table_schema " , table_schema								 )
			.query(" , :table_name     " , arg.getParamText("table_name" ).toLowerCase() )
			.query(")																")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		sql.clear();
		sql.param
			.query("call GEN_TABLE (						")
			.query("   :table_name     " , arg.getParamText("table_name" ).toLowerCase() )
			.query(")										")
			;
		SqlResultMap map = sql.selectForMap();
		if (map.size() > 0) {
			for(SqlResultRow row:map){
				data.param.query(row.getParamText("drop_text"));
				data.attach(Action.direct);
				data.execute();
				data.clear();
				data.param.query(row.getParamText("ddl_text"));
				data.attach(Action.direct);
				data.execute();
				data.clear();
				data.param.query(row.getParamText("key_text"));
				data.attach(Action.direct);
				data.execute();
				data.clear();
				}
		}

		return null;
	}
}
