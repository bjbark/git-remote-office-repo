package com.sky.system.custom.iypkg.sale.order.slorlist1;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service("iypkg.SlorList1Service")
public class SlorList1Service extends DefaultServiceHandler{

	@Autowired
	private SeqListenerService sequance;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort,int start) throws Exception {
		DataMessage data = arg.newStorage("POS");

		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateProcedure (arg,"fr_invc_date,to_invc_date,cstm_idcd,item_idcd,find_name,chk");

		if(rows == 0){
			rows = 999999999;
		}
		data.param
			.query("call sale_order_slorlist1( :param ",param)
			.query("     , :start",start)
			.query("     , :limit",rows)
			.query(")")
		;
		return data.selectForMap();

	}
}
