package com.sky.system.custom.iypkg.stock.isos.sptslist1;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("iypkg.SptsList1Service")
public class SptsList1Service extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "find_name,invc_date,chk");

			data.param // 집계문  입력
				.query("call spts_list1 (	")
				.query(" :param	" , result)
				.query(" )	")
				;
			return data.selectForMap() ;
	}

}
