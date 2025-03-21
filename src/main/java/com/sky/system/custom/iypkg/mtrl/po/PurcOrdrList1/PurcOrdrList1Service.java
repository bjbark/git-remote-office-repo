package com.sky.system.custom.iypkg.mtrl.po.PurcOrdrList1;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("iypkg.PurcOrdrList1Service")
public class PurcOrdrList1Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc1_date,invc2_date,chk,find_name");

			data.param // 집계문  입력
				.query("call purc_istt_list1 (	")
				.query(" :param	" , result)
				.query(" )	")
				;

		return data.selectForMap() ;
	}

}
