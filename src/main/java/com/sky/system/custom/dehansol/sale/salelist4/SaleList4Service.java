package com.sky.system.custom.dehansol.sale.salelist4;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class SaleList4Service extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String cstm_idcd = "";
		String item_idcd = "";

		if(arg.getParamText("cstm_idcd").length() > 0){
			cstm_idcd = arg.getParamText("cstm_idcd");
		}else {
			cstm_idcd = "null";
		}
		if(arg.getParamText("item_idcd").length() > 0){
			item_idcd = arg.getParamText("item_idcd");
		}else {
			item_idcd = "null";
		}

		data.param // 집계문  입력
		.query("call ostt_dali (	")

		.query("   :invc1_date		" , arg.getParamText("invc1_date"))
		.query(" , :invc2_date		" , arg.getParamText("invc2_date"))
		.query(" , :cstm_idcd		" , cstm_idcd )
		.query(" , :item_idcd		" , item_idcd )
		.query(" )	")
		;
		SqlResultMap info = data.selectForMap();
		data.attach(Action.direct);
		data.execute();

		return info;
	}
}
