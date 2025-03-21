package com.sky.system.project.codeinfo;

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
public class CodeInfoService {

	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param
			.query("select a.site_id     , a.code_id     , a.code_cd    , a.code_nm			")
			.query("     , a.code_gb     , a.deflt_val   , a.lookup_val , a.itm_val			")
			.query("     , a.usr_memo    , a.row_sts     , a.lang_gbcd						")
			.query("from   code_mst a														")
			.query("where  a.site_id    = :site_id       " , arg.fixParameter("site_id"))
			.query("and    a.lang_gbcd  = :lang_gbcd     " , arg.getParameter("lang_gbcd" ))
			.query("and    a.find_nm    like %:find_nm%  " , arg.getParameter("find_nm" ))
			.where("and    a.row_sts    = :row_sts       " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts    < :row_sts       " , "2" , "".equals(arg.getParamText("row_sts" )) )
		;
	    return data.selectForMap();
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				row.setParameter("row_sts" , 2   );
				rowaction = Action.update;
			}
			data.param
				.table("code_mst")
				.where("where code_id  = :code_id  " )
		        //
				.unique("code_id"            , row.fixParameter("code_id"        ))
				.update("site_id"            , row.fixParameter("site_id"        ))

				.update("code_cd"            , row.fixParameter("code_cd"        ))
		        .update("lang_gbcd"          , row.getParameter("lang_gbcd"      ))
		        .update("code_nm"            , row.getParameter("code_nm"        ))
		        .update("code_gb"            , row.getParameter("code_gb"        ))

		        .update("deflt_val"          , row.getParameter("deflt_val"      ))
		        .update("lookup_val"         , row.getParameter("lookup_val"     ))
		        .update("itm_val"            , row.getParameter("itm_val"        ))

		        .update("find_nm"          	 , row.getParamText("code_cd"        ).trim()
		        		 					 + row.getParamText("code_nm"        ).trim()
		        		 					 + row.getParamText("itm_val"        ).trim())
		        .update("usr_memo"           , row.getParameter("usr_memo"       ))
		        .update("row_sts"            , row.getParameter("row_sts"        ))
		        .update("upt_dttm"			 , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		        .insert("crt_dttm"			 , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		        .action = rowaction ;
        	;data.attach();
		}
		data.execute();
		return null ;
	}
}


