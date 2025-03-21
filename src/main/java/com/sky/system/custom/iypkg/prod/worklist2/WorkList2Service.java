package com.sky.system.custom.iypkg.prod.worklist2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service("iypkg.WorkList2Serivce")
public class WorkList2Service extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort , int start ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateAll(arg);
		ParamToJson translate = new ParamToJson();
//
		result = translate.TranslateProcedure(arg, "fr_invc_date,to_invc_date,wkct_idcd,cstm_idcd,acpt_numb,chk,find_name");

		int maxsize = 0;
		if(start == 0){
			start = 1;
		}
		if(rows == 0){
			rows = 999999999;
		}

		data.param // 집계문  입력
			.query("call prod_work_list2 ( :param ", param)
//			.query("      , :start",start)
//			.query("      , :limit",rows)
			.query(")")
		;
		SqlResultMap a = data.selectForMap();
		if(a.size() > 0){
			maxsize = Integer.parseInt( a.get(0).getParamText("maxsize"));
				a.summary = new SqlResultRow("maxsize",maxsize);
		}
		return a;
	}
}
