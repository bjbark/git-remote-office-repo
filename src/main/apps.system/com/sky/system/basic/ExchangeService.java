package com.sky.system.basic;


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
public class ExchangeService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		
		data.param // 쿼리문  입력  
			.query("select a.hq_id   , a.money_dt  ")
			.query("     , a.money_id   " )
			//.query("     , (select bas_cd from base_mst     where bas_id = a.money_id ) as money_cd " )
			//.query("     , (select bas_nm from base_mst     where bas_id = a.money_id ) as money_nm " )
			.query("     , b.bas_cd  as money_cd " )
			.query("     , b.bas_nm  as money_nm " )
			.query("     , a.krw_rate   , a.usd_rate   ")  
			.query("     , a.user_memo  , a.sys_memo  , a.row_sts,   a.upt_dttm,  a.crt_dttm  ")
		;

		
		data.param // 쿼리문  입력  
		//.where("from   exchange_rate a join base_mst b on a.money_id = b.bas_id")
		.where("from   exchange_rate a join base_mst b on a.money_id = b.bas_id")
			.where("where  1=1"  )
			.where("and    a.money_dt  >=:fr_dt            " , arg.getParameter("fr_dt" )  )
			.where("and    a.money_dt  <=:to_dt            " , arg.getParameter("to_dt" )  )
			.where("and    a.money_id  = :money_id         " , arg.getParameter("money_id" )  )
			.where("and    a.row_sts = :row_sts        " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) ) 
			.where("and    a.row_sts < :row_sts        " , "2" , "".equals(arg.getParamText("row_sts" )) )			
			.where("order by a.money_id, money_dt " )
		;
	
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력  
			.query("select a.hq_id   , a.money_dt  ")
			.query("     , a.money_id   , (select bas_nm from base_mst     where bas_cd = a.money_id ) as money_nm " )
			.query("     , a.krw_rate   , a.usd_rate   ")  
			.query("     , a.user_memo  , a.row_sts  ")
		;
		data.param // 쿼리문  입력  
			.where("from   exchange_rate a ")
			.where("where  1=1"  )
			.where("and    a.money_id  =  :money_id        " , arg.getParameter("money_id" )  )
			.where("and    a.row_sts = :row_sts        " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) ) 
			.where("and    a.row_sts < :row_sts        " , "2" , "".equals(arg.getParamText("row_sts" )) )			
			.where("order by a.money_id, money_dt " )
		;
		return data.selectForMap(page, rows , (page ==1) ); 
	}
	
	
	
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
	        	data.param
	        		.table("exchange_rate")
		        	.where("where money_id  = :money_id  " )
		        	.where("  and money_dt  = :money_dt  " )
	        		//
		        	.unique("money_id"          , "5160"+row.getParameter("money_cd"        ))
	        		.unique("money_dt"          , row.fixParameter("money_dt"        ))
	        		
	        		.update("row_sts"         , 2   )
	        		.update("upt_ui"   		, row.fixParameter("upt_ui"       ))
	        		.update("upt_id"   		, row.fixParameter("upt_ui"       ))
	        		.update("upt_ip"   		, arg.remoteAddress )
	        		.update("upt_dttm"      	, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
	        		.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
	        	;data.attach(Action.update);
			} else {
				
				data.param
		        	.table("exchange_rate")
		        	.where("where money_id  = :money_id  " )
		        	.where("  and money_dt  = :money_dt  " )
		        	//
		        	.unique("money_id"          , "5160"+row.getParameter("money_cd"        ))
		        	.unique("money_cd"          , row.getParameter("money_cd"        ))
		        	.unique("money_dt"          , row.getParameter("money_dt"        ))
		        	
		        	.update("hq_id"          , row.fixParameter("hq_id"        ))
		        	.update("krw_rate"   	    , row.getParameter("krw_rate"   	 ))
		        	.update("usd_rate"          , row.fixParameter("usd_rate"        ))
		        	
		        	.update("user_memo"         , row.getParameter("user_memo"       ))
		        	.update("row_sts"         , row.getParameter("row_sts"       ))
		        	
		        	.update("upt_ui"   		, row.fixParameter("upt_ui"       ))
		        	.update("upt_id"   		, row.fixParameter("upt_ui"       ))
		        	.update("upt_ip"   		, arg.remoteAddress )
		        	.update("upt_dttm"      	, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
		        	.insert("crt_ui"   		, row.fixParameter("crt_ui"       ))
		        	.insert("crt_id"   		, row.fixParameter("crt_id"       ))
		        	.insert("crt_ip"   		, arg.remoteAddress )
		        	.insert("crt_dttm"       	, new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
		        
		        ;data.attach(rowaction);
			}
			
		}
		data.execute();
		return null ; 
	}

	
	/**
	 * 엑셀등록
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public void setExcel(HttpRequestArgument arg, DataMessage data, String money_cd, String money_dt, String krw_rate, String usd_rate) throws Exception {
    	data.param
        	.table("exchange_rate")
        	.where("where money_dt      = :money_dt   " )
        	.where("  and money_id      = :money_id   " )
        	//
        	.unique("money_dt"          , money_dt )
        	.unique("money_id"          , "5160"+money_cd )
        	.unique("money_cd"          , money_cd )
        	
        	.update("hq_id"          , arg.fixParameter("hq_id"  ))
        	.update("krw_rate"          , Double.parseDouble(krw_rate) )  //숫자변환
        	.update("usd_rate"          , Double.parseDouble(usd_rate) )  //숫자변환
        	
        	.update("row_sts"         , 0   )
        	//.update("user_memo"         , row.getParameter("user_memo" ))
        	.update("sys_memo"         , "Excel" )
			
        	.update("upt_ip"   		, arg.remoteAddress )
			.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )

        	.insert("crt_ip"   		, arg.remoteAddress )
			.insert("crt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
			
        ;
    	data.attach(Action.modify);
		data.execute();
		
	}
}
