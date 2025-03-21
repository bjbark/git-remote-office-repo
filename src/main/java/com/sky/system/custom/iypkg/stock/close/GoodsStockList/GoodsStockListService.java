package com.sky.system.custom.iypkg.stock.close.GoodsStockList;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("iypkg.GoodsStockListService")
public class GoodsStockListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "find_name,fr_dt,to_dt,prod_idcd,prod_idcd2");


		data.param
			.query("call stock_list_type_product (			")
			.query(" :param	" , result					)
			.query(" )									")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "find_name,fr_dt,to_dt,prod_idcd,prod_idcd2,chk");


		data.param
			.query("call product_isos (					")
			.query(" :param	" , result					)
			.query(" )									")
		;
		return data.selectForMap();
	}

}
