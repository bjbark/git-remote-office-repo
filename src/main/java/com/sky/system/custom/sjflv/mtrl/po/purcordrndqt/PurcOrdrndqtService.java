package com.sky.system.custom.sjflv.mtrl.po.purcordrndqt;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service
public class PurcOrdrndqtService extends DefaultServiceHandler{

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";

		ParamToJson trans = new ParamToJson();
		result = trans.TranslateAll(arg);

		data.param
			.query("call prodordr_ndqt (				")
			.query("   :param       "   , result		)
			.query(" ) 								")
		;
		return data.selectForMap() ;
	}
}
