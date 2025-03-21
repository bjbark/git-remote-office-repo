package com.sky.system.custom.hjsys.sale.order.slorlist1;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service("hjsys.Slorlist1Service")
public class SlorList1Service extends DefaultServiceHandler {
	public SqlResultMap getMaster(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc1_date,invc2_date,cstm_idcd,item_idcd,find_name,line_clos");

		data.param
			.query("call order_monthly_hj (		")
			.query("     :param		", result	)
			.query(" )							")
		;
		return data.selectForMap(sort);
	}
	public SqlResultMap getDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id") ;
			data.param
				.query("call order_monthly_item_hj(		")
				.query(":invc_numb",arg.fixParameter("invc_numb"))
				.query(" ) 								")
		;
		return data.selectForMap(sort);
	}
	public SqlResultMap getDetail2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id") ;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String line_seqn	= arg.getParamText("line_seqn") ;
		data.param
		.query("call order_monthly_item2_hj (	")
		.query("    :invc_numb "  , invc_numb	)  // Invoice 번호
		.query("   ,:line_seqn "  , line_seqn	)  // Invoice 번호
		.query(" ) 								")
		;
		return data.selectForMap(sort);
	}

}
