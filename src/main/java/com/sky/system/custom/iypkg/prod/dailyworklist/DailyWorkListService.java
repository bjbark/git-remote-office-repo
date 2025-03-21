package com.sky.system.custom.iypkg.prod.dailyworklist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service("iypkg.DailyWorkListSerivce")
public class DailyWorkListService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "fr_dt,to_dt,wkct_idcd,wkct_idcd2,chk,find_name");

		data.param // 집계문  입력
			.query("call daily_worklist (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;
	}
}
