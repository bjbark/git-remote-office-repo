package com.sky.system.sale.sale.salelist2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class SaleList2Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson translate = new ParamToJson();
		String result = "";
		String optn = "";
		String result_fin = "";
		if(arg.getParamText("optn_1").equals("on") || arg.getParamText("optn_2").equals("on")
				|| arg.getParamText("optn_3").equals("on")){
			if(arg.getParamText("optn_1").equals("on")){
				optn = "1";
			}
			if(arg.getParamText("optn_2").equals("on")){
				optn = "2";
			}
			if(arg.getParamText("optn_3").equals("on")){
				optn = "3";
			}
		}
		result = translate.TranslateProcedure(arg, "invc1_date,invc2_date,cstm_code,cstm_code2,chk,find_name");
		if(!optn.equals("")){
			result_fin = StringUtils.removeEnd(result, "}")+",\"optn\":\""+optn+"\"}";
		}

			data.param // 집계문  입력
				.query("call sale_sale_salelist2 (	")
				.query(" :param	" , result_fin)
				.query(" )	")
				;

		return data.selectForMap() ;
	}

}
