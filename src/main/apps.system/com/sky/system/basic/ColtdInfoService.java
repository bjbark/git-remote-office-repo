package com.sky.system.basic;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class ColtdInfoService extends DefaultServiceHandler{

	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows ) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.total("select count(1) as maxsize " )
			;
		
		data.param // 쿼리문  입력  
			.query("select a.corp_id    , a.corp_nm ")
			;
		data.param
			.where("from   coltd a ")
			.where("where  1 = 1   ")
			.where("and    a.row_sts  = :row_sts ", arg.getParamText("row_sts"), ( "0".equals(arg.getParamText("row_sts"))))
			.where("and    a.row_sts <= :row_sts ", arg.getParamText("row_sts"), (!"0".equals(arg.getParamText("row_sts"))))
			.where("and    a.corp_nm like %:corp_nm% ", arg.getParameter("corp_nm" ) )

		;
		return data.selectForMap(page, rows, (page == 1)); 
	}
	
}
