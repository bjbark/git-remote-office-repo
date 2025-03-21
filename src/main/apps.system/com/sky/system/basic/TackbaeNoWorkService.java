package com.sky.system.basic;

import net.sky.core.connection.HostProperty;
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
public class TackbaeNoWorkService extends DefaultServiceHandler {

	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows) throws Exception {

		DataMessage data = arg.newStorage();  	
		data.param
			.total("select count(1) as maxsize 													")
			;
		data.param // 쿼리문  입력  
	    	.query("select  a.hq_id    , a.stor_grp  , a.stor_id   						    ") 
	    	.query("   ,    a.hdli_id  , b.bas_nm  as taekbae_nm   						 	") 
	    	.query("   ,    a.tid         , a.dbssid    , a.sid       , a.bid     , a.dbhost 	")  
	    	.query("   ,    a.dbport      , a.dbuser    , a.dbpswd    , a.prefix			 	")  
	    	.query("   ,    a.suffix      , a.min_no    , a.max_no    , a.cur_no			 	")  
	    	.query("   ,    a.row_sts   , a.user_memo  									 	") 
	    	;
		data.param
	    	.where("from    stor_taekbae   a 											        ")
	    	.where("        join    base_mst b on b.bas_id  = a.hdli_id				    ")   
			.where("where   a.stor_id  = :stor_id            "  , arg.fixParameter("stor_id" ))
			.where("and     a.row_sts < 2 "   )		
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}
	
	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getTaekbae(HttpRequestArgument arg, int page, int rows) throws Exception {

//		String search_id = arg.fixParamText("search_id" );
//		String find_name = arg.getParamText("find_name" );

		DataMessage data = arg.newStorage();  
		data.param
			.total("select count(1) as maxsize 													")
			;
		data.param // 쿼리문  입력  				
		    .query("select  a.bas_id , a.bas_cd, a.bas_nm 									" ) 	
		    ;
		data.param
		    .where("from    base_mst	 a													  	" )
		    .where("where   a.prnt_id  = :prnt_id  " , arg.fixParameter("prnt_id"    		 ))
		    .where("and     a.bas_id   != '5101000' 											" ) /* 자체배송 제외 */
		    .where("and     a.bas_id  not in  (                         						" )
		    .where("		     select a.hdli_id   						 					" )	
		    .where("			 from   stor_taekbae a  						  				" )	
		    .where("			 where  a.stor_id = :stor_id  "  , arg.fixParameter("stor_id" ))			    
		    .where("             )      " )
		    .where("and    a.row_sts = 0             " ) 	
		    .where("and    a.bas_nm  like %:bas_nm%  " , arg.getParameter("bas_nm"   ))
		 ;
		 return data.selectForMap(); 
	}
	
	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage();  
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		
		for(SqlResultRow row:map) {
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			
			data.param
				.table("stor_taekbae")
				.where("where stor_id   = :stor_id    " )
				.where("and   hdli_id = :hdli_id  " )
				//
				.unique("hq_id"           , row.fixParameter("hq_id"       ))
				.unique("stor_grp"           , row.fixParameter("stor_grp"       ))
				.unique("stor_id"           , row.fixParameter("stor_id"       ))
				.unique("hdli_id"         , row.fixParameter("hdli_id"     ))
				
				.update("tid"                , row.getParameter("tid"            ))
				.update("sid"                , row.getParameter("sid"            ))
				.update("bid"                , row.getParameter("bid"       	 )) 
				.update("dbssid"             , row.getParameter("dbssid"         ))
				.update("dbhost"             , row.getParameter("dbhost"         )) 
				.update("dbport"             , row.getParameter("dbport"         ))
				.update("dbuser"             , row.getParameter("dbuser"         ))
				.update("dbpswd"             , row.getParameter("dbpswd"         ))
				.update("prefix"             , row.getParameter("prefix"         ))
				.update("suffix"             , row.getParameter("suffix"         ))									
				.update("min_no"             , row.getParameter("min_no"         ))
				.update("max_no"             , row.getParameter("max_no"         ))
				//.update("cur_no"             , row.getParameter("cur_no"       	 )) 
				.update("user_memo"          , row.getParameter("user_memo"       )) 
				
				.update("upt_id"   		, row.getParameter("upt_id"   ))
				.update("upt_ip"   	    , new SqlParamText("'" + arg.remoteAddress + "'"))			
				.update("upt_dttm"   		, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
				.insert("crt_id"   		, row.getParameter("crt_id"   ))
				.insert("crt_ip"   	    , new SqlParamText("'" + arg.remoteAddress + "'"))
				.insert("crt_dttm"   		, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
				
				.action = rowaction ; 
				;
			data.attach();
		}
		data.execute();
		return null ; 
	}
	
	public String getTaekbaeTest(HttpRequestArgument arg) throws Exception {
		
		HostProperty property  = new HostProperty(arg.getParamText("stor_id") + arg.getParamText("hdli_id"));
		property.setProvider( "oracle" );
		property.setHostName( arg.getParamText("dbhost"));
		property.setHostPort( Integer.parseInt(arg.getParamText("dbport")));
		property.setUserName( arg.getParamText("dbuser"));
		property.setPassword( arg.getParamText("dbpswd"));
		property.setDatabase( arg.getParamText("dbssid"));
		property.setPoolTime( 5 );
		property.setMaxcount( 1 );
		
		DataMessage data = new DataMessage(property);
		
		data.param.query(" SELECT 1 FROM DUAL ");
	
		SqlResultRow row = data.selectForRow();
		if (row != null) {
			System.out.println("succes");
			return "succes";
		} else {
			System.out.println("fail");
			return "fail";
		}
	}

	public SqlResultMap setCurnoReset(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		data.param
			.query(" update stor_taekbae			")
			.query(" set cur_no = null				")
			.query(" where hdli_id = :hdli_id	", arg.fixParameter("hdli_id" ))
			.action = Action.direct;
		data.attach();
		data.execute();
		return null;
	}
}
