package com.sky.system.prod.order.workmonitering;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class WorkMoniteringService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		System.out.println("getMaster");
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call work_monitering()	")
		;
		return data.selectForMap();
	}
}
