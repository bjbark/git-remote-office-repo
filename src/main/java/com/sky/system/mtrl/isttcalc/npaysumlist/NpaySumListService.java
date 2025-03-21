package com.sky.system.mtrl.isttcalc.npaysumlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service("sjflv.NpaySumListService")
public class NpaySumListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String cstm_idcd = arg.getParamText("cstm_idcd") ;
		if (cstm_idcd.isEmpty()) {
			cstm_idcd = "@" ;
		}
		String find_name = arg.getParamText("find_name") ;
		if (find_name.isEmpty()) {
			find_name = "@" ;
		}

		data.param
			.query("call puch_npay_amnt (				")
			.query("  :invc_date1	" , arg.getParameter("invc_date1"))
			.query(" ,:invc_date2	" , arg.getParameter("invc_date2"))
			.query(" ,:cstm_idcd	" , cstm_idcd)
			.query(" ,:find_name	" , find_name)
			.query(" ) 									")
		;
		return data.selectForMap();
	}
}