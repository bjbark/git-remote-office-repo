package com.sky.system.basic.csscdmast;

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
public class CsscdMastService {

	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {

//		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data;
		String hq = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.param
			.query("select a.sscd_idcd     , a.sscd_code   , a.sscd_name						")
			.query("     , a.sscd_dvcd     , a.dflt_valu   , a.lkup_valu , a.sbsc_valu			")
			.query("     , a.user_memo     , a.line_stat   , a.lang_dvcd						")
			.query("from   sscd_mast a															")
		;
		data.param
			.where("where  1=1																	")
			.where("and    a.lang_dvcd    = :lang_dvcd       " , arg.getParameter("lang_dvcd" ))
			.where("and    a.find_name    like %:find_name%  " , arg.getParameter("find_name" ))
			.where("and    a.line_stat    = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat    < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
	    return data.selectForMap();
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
//		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data;
		String hq = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }


		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				row.setParameter("line_stat" , 2   );
				rowaction = Action.update;
			}
			data.param
				.table("sscd_mast")
				.where("where sscd_idcd  = :sscd_idcd  " )
				//
				.unique("sscd_idcd"			, row.fixParameter("sscd_idcd"        ))

				.update("sscd_code"			, row.fixParameter("sscd_code"        ))
				.update("lang_dvcd"			, row.getParameter("lang_dvcd"        ))
				.update("sscd_name"			, row.getParameter("sscd_name"        ))
				.update("sscd_dvcd"			, row.getParameter("sscd_dvcd"        ))

				.update("dflt_valu"			, row.getParameter("dflt_valu"        ))
				.update("lkup_valu"			, row.getParameter("lkup_valu"        ))
				.update("sbsc_valu"			, row.getParameter("sbsc_valu"        ))

				.update("find_name"			, row.getParamText("sscd_code"         ).trim()
						 					+ row.getParamText("sscd_name"         ).trim()
						 					+ row.getParamText("sbsc_valu"         ).trim())
				.update("user_memo"			, row.getParameter("user_memo"        ))
				.update("line_stat"			, row.getParameter("line_stat"        ))
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.action = rowaction ;
        	;data.attach();
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		String hq = arg.getParamText("hq_id") ;
		DataMessage to_data = new DataMessage(hq+".POS");
		data.param
			.query("select a.sscd_idcd     , a.sscd_code     , a.sscd_name						")
			.query("     , a.sscd_dvcd     , a.dflt_valu     , a.lkup_valu , a.sbsc_valu		")
			.query("     , a.user_memo     , a.line_stat     , a.lang_dvcd						")
			.query("from   sscd_mast a															")
		;
		data.param
			.where("where  1=1																	")
			.where("and    a.find_name    like %:find_name%  " , arg.getParameter("find_name" ))
			.where("and    a.line_stat    = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat    < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
		;

		for(SqlResultRow row:data.selectForMap()){
			if ("0".equals(row.getParamText("line_stat"))) {
				to_data.param
				.table("sscd_mast")
				.where("where sscd_idcd  = :sscd_idcd  " )
				//
				.unique("sscd_idcd"			, row.fixParameter("sscd_idcd"        ))

				.update("sscd_code"			, row.fixParameter("sscd_code"        ))
				.update("lang_dvcd"			, row.getParameter("lang_dvcd"        ))
				.update("sscd_name"			, row.getParameter("sscd_name"        ))
				.update("sscd_dvcd"			, row.getParameter("sscd_dvcd"        ))

				.update("dflt_valu"			, row.getParameter("dflt_valu"        ))
				.update("lkup_valu"			, row.getParameter("lkup_valu"        ))
				.update("sbsc_valu"			, row.getParameter("sbsc_valu"        ))

				.update("find_name"			, row.getParamText("sscd_code"         ).trim()
						 					+ row.getParamText("sscd_name"         ).trim()
						 					+ row.getParamText("sbsc_valu"         ).trim())
				.update("user_memo"			, row.getParameter("user_memo"        ))
				.update("line_stat"			, row.getParameter("line_stat"        ))
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				to_data.attach(Action.modify);
			} else {
				to_data.param
					.table("sscd_mast")
					.where("where sscd_idcd  = :sscd_idcd  " )
					//
					.unique("sscd_idcd"		, row.fixParameter("sscd_idcd"        ))
				;to_data.attach(Action.delete);
			}
		}
		to_data.execute();
		return null;
	}

}


