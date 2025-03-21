package com.sky.system.custom.iypkg.stock.close.mtrlstocklist;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("iypkg.MtrlStockListService")
public class MtrlStockListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");

		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "find_name,fr_dt,to_dt,fabc_idcd,fabc_idcd2");

		if(arg.getParamText("dvcd1").equals("1")){
			data.param
				.query("call stock_list_type_fabc1 (		")
				.query(" :param	" , result					)
				.query(" )									")
			;
		}
		else if(arg.getParamText("dvcd2").equals("1")){
			data.param
			.query("call stock_list_type_fabc2 (		")
			.query(" :param	" , result					)
			.query(" )									")
		;
		}
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");

		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "find_name,fr_dt,to_dt,fabc_idcd,fabc_idcd2");

		data.param
			.query("call stock_list_type_fabc3 (		")
			.query(" :param	" , result					)
			.query(" )									")
		;

		return data.selectForMap();
	}

}
