package com.sky.system.custom.iypkg.stock.close.mtrlstocklist2;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("iypkg.MtrlStockList2Service")
public class MtrlStockList2Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "find_name,fr_dt,to_dt,asmt_idcd,asmt_idcd2");


		data.param
			.query("call stock_list_type_asmt (			")
			.query(" :param	" , result					)
			.query(" )									")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "find_name,fr_dt,to_dt,asmt_idcd,asmt_idcd2,chk");


		data.param
			.query("call asmt_isos (					")
			.query(" :param	" , result					)
			.query(" )									")
		;
		return data.selectForMap();
	}

}
