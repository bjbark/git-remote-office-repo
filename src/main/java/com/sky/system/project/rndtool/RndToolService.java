package com.sky.system.project.rndtool;

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
public class RndToolService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getModule(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query( "select *                                                                   ")
	    ;
	    data.param
		    .where("from ( 																	    ")
		    .where("select 																	    ")
		    .where("       modl_id      , modl_nm      		 				   					")
			.where("from   rnd_view															    ")
			.where("where  1 = 1															    ")
			.where("and    lower(modl_id) like %:modl_id% " , arg.getParamText("modl_id" ).toLowerCase() )
			.where("and    lower(modl_nm) like %:modl_nm% " , arg.getParamText("modl_nm" ).toLowerCase() )
			.where("group by modl_id, modl_nm                                                   ")

	        .where("union all																    ")
	        .where("select 																	    ")
	        .where("        '' as tabl_idcd , '전체' as  tabl_name   									")
	        .where(") z																			")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getView(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query( "select *                                                                   ")
	    ;
	    data.param
		    .where("from ( 																	    ")
		    .where("select 																	    ")
		    .where("       modl_id      , modl_nm      		 				   					")
		    .where("       ,view_id      , view_nm      		 				   				")
			.where("from   rnd_view															    ")
			.where("where  1 = 1															    ")
			.where("and    lower(modl_id) = :modl_id " , arg.getParamText("modl_id" ).toLowerCase() )
			.where("group by modl_id, modl_nm, view_id, view_nm                                 ")
	        .where(") z																			")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query( "select *                                                  ")
	    ;
	    data.param
		    .where("from ( 													   ")
            .where(" select row_no                                             ")
            .where("       ,modl_id                                            ")
            .where("       ,view_id                                            ")
            .where("       ,modl_nm                                            ")
            .where("       ,view_nm                                            ")
            .where("       ,data_index                                         ")
            .where("       ,view_text                                          ")
            .where("       ,xtype                                              ")
            .where("       ,lnth                                               ")
            .where("       ,align                                              ")
            .where("       ,sum_type                                           ")
            .where("       ,format_str                                         ")
            .where("       ,hidden                                             ")
            .where("       ,lookup_str                                         ")
            .where("       ,remarks                                            ")
            .where("       ,tabl_name                                             ")
            .where("       ,ord                                                ")
            .where("   from rnd_view                                           ")
            .where(" where 1=1                                                 ")
			.where("and    lower(modl_id) = :modl_id " , arg.getParamText("modl_id" ).toLowerCase() )
			.where("and    lower(view_id) = :view_id " , arg.getParamText("view_id" ).toLowerCase() )
	        .where(") z																			")
	        .where("order by ord, row_no                                       ")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
	        .query("select   fied_idcd    as data_index                                                                        ")
	        .query("	   , fied_name    as view_text                                                                         ")
	        .query("       , case when (select count(*) from code_mst                                                       ")
	        .query("                     where lower(code_cd) = lower(fied_idcd)) <> 0 then 'lookupcolumn'                     ")
	        .query("	     else                                                                                           ")
	        .query("	       case lower(data_type) when 'varchar'       then 'string'                                     ")
	        .query("	                           when 'varchar2'      then 'string'                                       ")
	        .query("	                           when 'nvarchar'      then 'string'                                       ")
	        .query("	                           when 'text'          then 'string'                                       ")
	        .query("	                           when 'char'          then 'string'                                       ")
	        .query("	                           when 'ntext'         then 'string'                                       ")
	        .query("	                           when 'bit'           then 'boolean'                                      ")
	        .query("	                           when 'datetime'      then ''                                             ")
	        .query("	                           when 'smalldatetime' then ''                                             ")
	        .query("	                           when 'binary_float'  then ''                                             ")
	        .query("	                           when 'clob'          then ''                                             ")
	        .query("	                           when 'image'         then ''                                             ")
	        .query("						       when 'float'         then 'numericcolumn'                                ")
	        .query("						       when 'number'        then 'numericcolumn'                                ")
	        .query("						       when 'numeric'       then 'numericcolumn'                                ")
	        .query("						       when 'int'           then 'numericcolumn'                                ")
	        .query("						       when 'integer'       then 'numericcolumn'                                ")
	        .query("						       when 'long'          then 'numericcolumn'                                ")
	        .query("						       when 'decimal'       then 'numericcolumn'                                ")
	        .query("						       when 'smallint'      then 'numericcolumn'                                ")
	        .query("                               else '' end                                                              ")
	        .query("		end as xtype                                                                                    ")
	        .query("	   , case lower(data_type) when 'datetime'      then 90                                             ")
	        .query("	                           when 'smalldatetime' then 90                                             ")
	        .query("	                           when 'clob'          then ''                                             ")
	        .query("	                           when 'image'         then 200                                            ")
	        .query("						       when 'float'         then 80                                             ")
	        .query("						       when 'number'        then 80                                             ")
	        .query("						       when 'int'           then 80                                             ")
	        .query("						       when 'integer'       then 80                                             ")
	        .query("						       when 'long'          then 80                                             ")
	        .query("						       when 'decimal'       then 80                                             ")
	        .query("						       when 'smallint'      then 80                                             ")
	        .query("						       else 80 end as lnth                                                      ")
	        .query("	   , case lower(data_type) when 'varchar'       then 'left'                                         ")
	        .query("	                           when 'varchar2'      then 'left'                                         ")
	        .query("	                           when 'nvarchar'      then 'left'                                         ")
	        .query("	                           when 'text'          then 'left'                                         ")
	        .query("	                           when 'char'          then 'left'                                         ")
	        .query("	                           when 'ntext'         then 'left'                                         ")
	        .query("	                           when 'bit'           then 'center'                                       ")
	        .query("	                           when 'datetime'      then 'center'                                       ")
	        .query("	                           when 'smalldatetime' then 'center'                                       ")
	        .query("	                           when 'binary_float'  then 'center'                                       ")
	        .query("	                           when 'clob'          then 'left'                                         ")
	        .query("	                           when 'image'         then 'centeer'                                      ")
	        .query("						       when 'float'         then 'right'                                        ")
	        .query("						       when 'number'        then 'right'                                        ")
	        .query("						       when 'numeric'       then 'right'                                        ")
	        .query("						       when 'int'           then 'center'                                       ")
	        .query("						       when 'integer'       then 'center'                                       ")
	        .query("						       when 'long'          then 'right'                                        ")
	        .query("						       when 'decimal'       then 'right'                                        ")
	        .query("						       when 'smallint'      then 'right'                                        ")
	        .query("                               else 'left' end as align                                                 ")
	        .query("	   , 'false' as hidden                                                                              ")
	        .query("       , case when (select count(*) from code_mst where lower(code_cd) = lower(fied_idcd)) <> 0 then ''    ")
	        .query("	     else                                                                                           ")
	        .query("	     case lower(data_type) when 'varchar'       then ''                                             ")
	        .query("	                           when 'varchar2'      then ''                                             ")
	        .query("	                           when 'nvarchar'      then ''                                             ")
	        .query("	                           when 'text'          then ''                                             ")
	        .query("	                           when 'char'          then ''                                             ")
	        .query("	                           when 'ntext'         then ''                                             ")
	        .query("	                           when 'bit'           then ''                                             ")
	        .query("	                           when 'datetime'      then ''                                             ")
	        .query("	                           when 'smalldatetime' then ''                                             ")
	        .query("	                           when 'binary_float'  then 'sum'                                          ")
	        .query("	                           when 'clob'          then ''                                             ")
	        .query("	                           when 'image'         then ''                                             ")
	        .query("						       when 'float'         then 'sum'                                          ")
	        .query("						       when 'number'        then 'sum'                                          ")
	        .query("						       when 'numeric'       then 'sum'                                          ")
	        .query("						       when 'int'           then 'sum'                                          ")
	        .query("						       when 'integer'       then 'sum'                                          ")
	        .query("						       when 'long'          then 'sum'                                          ")
	        .query("						       when 'decimal'       then 'sum'                                          ")
	        .query("						       when 'smallint'      then 'sum'                                          ")
	        .query("                               else '' end                                                              ")
	        .query("		end as sum_type                                                                                 ")
	        .query("       , case when (select count(*) from code_mst where lower(code_cd) = lower(fied_idcd)) <> 0 then ''    ")
	        .query("	     else                                                                                           ")
	        .query("	     case lower(data_type) when 'varchar'       then ''                                             ")
	        .query("	                           when 'varchar2'      then ''                                             ")
	        .query("	                           when 'nvarchar'      then ''                                             ")
	        .query("	                           when 'text'          then ''                                             ")
	        .query("	                           when 'char'          then ''                                             ")
	        .query("	                           when 'ntext'         then ''                                             ")
	        .query("	                           when 'bit'           then ''                                             ")
	        .query("	                           when 'datetime'      then ''                                             ")
	        .query("	                           when 'smalldatetime' then ''                                             ")
	        .query("	                           when 'binary_float'  then '#,##0'                                        ")
	        .query("	                           when 'clob'          then ''                                             ")
	        .query("	                           when 'image'         then ''                                             ")
	        .query("						       when 'float'         then '#,##0.00'                                     ")
	        .query("						       when 'number'        then '#,##0.00'                                     ")
	        .query("						       when 'numeric'       then '#,##0.00'                                     ")
	        .query("						       when 'int'           then '#,##0'                                        ")
	        .query("						       when 'integer'       then '#,##0'                                        ")
	        .query("						       when 'long'          then '#,##0.00'                                     ")
	        .query("						       when 'decimal'       then '#,##0.00'                                     ")
	        .query("						       when 'smallint'      then '#,##0'                                        ")
	        .query("                               else '' end                                                              ")
	        .query("		end as format_str                                                                               ")
	        .query("       , case when (select count(*) from code_mst                                                       ")
	        .query("                     where lower(code_cd) = lower(fied_idcd)) <> 0 then fied_idcd else  '' end as lookup_str  ")
	        .query("       , tabl_name as tabl_name                                                                           	")
	        .query("       , ROW_NUMBER() OVER( ORDER BY fied_idcd DESC) * 5 AS ord                                            ")
	        .query("from cert_table                                                                                          ")
			.query("where  1=1																								")
			.query("and    lower(tabl_name) like %:tabl_name% " , arg.getParamText("tabl_name" ).toLowerCase() )
			.query("and    lower(fied_idcd) like %:fied_idcd% " , arg.getParamText("fied_idcd" ).toLowerCase() )
			.query("and    fied_name like %:fied_name% " ,        arg.getParamText("fied_name" ) )
			.query("and    lower(prjt_dvsn) = :prjt_dvsn "      , arg.getParamText("prjt_dvsn" ).toLowerCase() )
	        .query("and    upper(fied_idcd) not in ('SYS_MEMO','PRNT_ID','ROW_LVL','ROW_ORD',                                  ")
	        .query("                             'FIND_NM','UPT_USR_NM','UPT_IP','UPT_DTTM','UPT_ID','UPT_UI',              ")
	        .query("                             'CRT_USR_NM','CRT_USR_NM','CRT_IP','CRT_DTTM','CRT_ID','CRT_UI')           ")
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
					.table("rnd_view")
					.where("where row_no = :row_no ")
					//
					.unique("row_no"   , row.fixParameter("row_no"))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("rnd_view						")
					.where("where modl_id    = :modl_id		")
					.where("and   view_id    = :view_id		")
					.where("and   data_index = :data_index	")
			        //
					.unique("modl_id"       , row.fixParameter("modl_id"    ))
					.unique("view_id"       , row.fixParameter("view_id"    ))
					.unique("data_index"    , row.fixParameter("data_index" ))
		            .update("modl_nm"       , row.getParameter("modl_nm"    ))
		            .update("view_nm"       , row.getParameter("view_nm"    ))
		            .update("view_text"     , row.getParameter("view_text"  ))
		            .update("xtype"         , row.getParameter("xtype"      ))
		            .update("lnth"          , row.getParameter("lnth"       ))
		            .update("align"         , row.getParameter("align"      ))
		            .update("sum_type"      , row.getParameter("sum_type"   ))
		            .update("format_str"    , row.getParameter("format_str" ))
		            .update("hidden"        , row.getParameter("hidden"     ))
		            .update("lookup_str"    , row.getParameter("lookup_str" ))
		            .update("remarks"       , row.getParameter("remarks"    ))
		            .update("tabl_name"        , row.getParameter("tabl_name"     ))
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
	public SqlResultMap setMake(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param
			.query("exec rnd_view_gen          					")
			.query("   :tabl_name   "  , arg.getParamText("tabl_name") )
			.query(" , :prjt_dvsn   "  , arg.getParamText("prjt_dvsn") )
			.query(" , :modl_id  "  , arg.getParamText("modl_id"))
			.query(" , :modl_nm  "  , arg.getParamText("modl_nm"))
			.query(" , :view_id  "  , arg.getParamText("view_id"))
			.query(" , :view_nm  "  , arg.getParamText("view_nm"))
			.query("                          					")
			.action = Action.direct;
	    	data.attach();
			data.execute();
		return null;
	}
	/**
	 *
	 */
	public SqlResultMap getScript(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
//			.query("exec rnd_view_ref          					")
//			.query("   :modl_id  "  , arg.getParamText("modl_id"))
//			.query(" , :view_id  "  , arg.getParamText("view_id"))
//			.query("                          					");
//
	        .query(" select *                                            ")
	        ;
		data.param
	        .where(" from (                ")
	        .where(" select top 1  '			{	dataIndex:	''' + lower(data_index) + ''''                                            ")
	        .where("        + space(  (select max(datalength(data_index))                                                                 ")
	        .where(" 				    from   rnd_view                                                                                   ")
	        .where(" 				   where  lower(modl_id) = lower(:modl_id1) "                    , arg.getParamText("modl_id"))
	        .where(" 				     and  lower(view_id) = lower(isnull(':view_id1','master')))" , arg.getParamText("view_id"))
	        .where(" 	            - datalength(data_index))+ ', width: ' + rtrim(convert(char(3),lnth))                                 ")
	        .where(" 	   + '	, align: ''' + align + ''''                                                                               ")
	        .where("        + space(10 - len(align))+ ', text: ''' + rtrim(convert(char(50),view_text)) + ''''                            ")
	        .where("        + case when isnull(xtype,'') <> '' then                                                                       ")
	        .where(" 	          space(  (select max(datalength(view_text))                                                              ")
	        .where(" 				       from   rnd_view                                                                                ")
	        .where(" 				       where  lower(modl_id) = lower(:modl_id2)"                    , arg.getParamText("modl_id"))
	        .where(" 				       and    lower(view_id) = lower(isnull(:view_id2,'master')) )" , arg.getParamText("view_id"))
	        .where(" 			   - datalength(view_text)) + ', xtype: ''' + rtrim(convert(char(50),xtype)) + ''''                       ")
	        .where("               else '' end                                                                                            ")
	        .where("        + case when isnull(sum_type,'') <> '' then                                                                    ")
	        .where(" 	            space(7 - len(align))+ ', summaryType: ''' + rtrim(convert(char(50),lower(sum_type))) + ''''          ")
	        .where("               else '' end                                                                                            ")
	        .where("        + case when isnull(lookup_str,'') <> '' then                                                                  ")
	        .where(" 	               ' , lookupValue: resource.lookup( ''' + rtrim(convert(char(50),lower(lookup_str))) + ''' )'        ")
	        .where("               else '' end                                                                                            ")
	        .where("        + case when isnull(format_str,'') <> '' then                                                                  ")
	        .where(" 	               ' , format:  ''' + rtrim(convert(char(50),lower(format_str))) + ''''                               ")
	        .where("               else '' end  as view_text                                                                              ")
	        .where("                                                                                                                      ")
	        .where(" from rnd_view                                                                                                        ")
	        .where(" where modl_id = lower(:modl_id3) "                         , arg.getParamText("modl_id"))
	        .where(" and   lower(view_id) = lower(isnull(:view_id3,'master')) " , arg.getParamText("view_id"))
	        .where(" union all                                                                                                            ")
	        .where(" select   '			},{	dataIndex:	''' + lower(data_index) + ''''                                                    ")
	        .where("        + space(  (select max(datalength(data_index))                                                                 ")
	        .where(" 				    from   rnd_view                                                                                   ")
	        .where(" 				   where  lower(modl_id) = lower(:modl_id4) "                    , arg.getParamText("modl_id"))
	        .where(" 				     and  lower(view_id) = lower(isnull(':view_id4','master')))" , arg.getParamText("view_id"))
	        .where(" 	            - datalength(data_index))+ ', width: ' + rtrim(convert(char(3),lnth))                                 ")
	        .where(" 	   + '	, align: ''' + align + ''''                                                                               ")
	        .where("        + space(10 - len(align))+ ', text: ''' + rtrim(convert(char(50),view_text)) + ''''                            ")
	        .where("        + case when isnull(xtype,'') <> '' then                                                                       ")
	        .where(" 	          space(  (select max(datalength(view_text))                                                              ")
	        .where(" 				       from   rnd_view                                                                                ")
	        .where(" 				       where  lower(modl_id) = lower(:modl_id5)"                    , arg.getParamText("modl_id"))
	        .where(" 				       and    lower(view_id) = lower(isnull(:view_id5,'master')) )" , arg.getParamText("view_id"))
	        .where(" 			  - datalength(view_text)) + ', xtype: ''' + rtrim(convert(char(50),xtype)) + ''''                        ")
	        .where("               else '' end                                                                                            ")
	        .where("        + case when isnull(sum_type,'') <> '' then                                                                    ")
	        .where(" 	            space(7 - len(align))+ ', summaryType: ''' + rtrim(convert(char(50),lower(sum_type))) + ''''          ")
	        .where("               else '' end                                                                                            ")
	        .where("        + case when isnull(lookup_str,'') <> '' then                                                                  ")
	        .where(" 	               ' , lookupValue: resource.lookup( ''' + rtrim(convert(char(50),lower(lookup_str))) + ''' )'        ")
	        .where("               else '' end                                                                                            ")
	        .where("        + case when isnull(format_str,'') <> '' then                                                                  ")
	        .where(" 	               ' , format:  ''' + rtrim(convert(char(50),lower(format_str))) + ''''                               ")
	        .where("               else '' end     as view_text                                                                           ")
	        .where("                                                                                                                      ")
	        .where(" from rnd_view                                                                                                        ")
	        .where(" where modl_id = lower(:modl_id6) "                         , arg.getParamText("modl_id"))
	        .where(" and   lower(view_id) = lower(isnull(:view_id6,'master')) " , arg.getParamText("view_id"))
	        .where(" and   row_no not in (select top 1 row_no from rnd_view where modl_id = lower(:modl_id7) ", arg.getParamText("modl_id"))
	        .where(" and   lower(view_id) = lower(isnull(:view_id7,'master'))                                ", arg.getParamText("view_id"))
	        .where(" )                                                                                                                    ")
	        .where(" union all                                                                                                            ")
	        .where(" select   '			} '  as view_text                                                                                 ")
	        .where(" ) z								                                                                                  ")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 *
	 */
	public SqlResultMap getPath(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
	        .query(" select *                                            ")
	        ;
		data.param
	        .where(" from (                                               ")
	        .where(" select path                                          ")
	        .where(" from   rnd_field                                     ")
	        .where(" group  by path                                       ")
	        .where(" order  by path                                       ")
	        .where(" ) z                                                  ")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 *
	 */
	public SqlResultMap getModl(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
	        .query(" select *                                            ")
	        ;
		data.param
	        .where(" from (                                               ")
	        .where(" select path, srvc, modl                              ")
	        .where(" from   rnd_field                                     ")
	        .where(" and    lower(path) = lower(:path) " , arg.getParamText("path"))
	        .where(" group  by path, srvc, modl                           ")
	        .where(" order  by path, srvc, modl                           ")
	        .where(" ) z                                                  ")
		;
		if (page == 0 && rows == 0){return data.selectForMap(sort);
		} else {         			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


}
