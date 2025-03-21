package com.sky.system.stock.close.isoslist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service
public class IsosListService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {

		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateAll(arg);

		DataMessage data = arg.newStorage("POS");

		if(arg.getParamText("stor_id").toUpperCase().equals("N1000A-ONE1000")){
			data.param
				.query("call book_list( :param",param)
				.query(")")
			;
		}else{
			data.param
				.query("call book_list( :param",param)
				.query(")")
			;
		}
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg ) throws Exception {

		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateAll(arg);

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call book_list_test( :param",param)
			.query(")")
		;
		return data.selectForMap();
	}
}
