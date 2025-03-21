package com.sky.system.basic.cust;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service
public class CstmCreditService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	//거래처 신용등급 조회
	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		String sale_drtr_idcd	= arg.getParamText("sale_drtr_idcd") ;
		String trns_stop_yorn	= arg.getParamText("trns_stop_yorn") ;
		String npay_term	= arg.getParamText("npay_term") ;
		String npay_amnt	= arg.getParamText("npay_amnt") ;
		String find_name	= arg.getParamText("find_name") ;
		String hq    = arg.getParamText("hq_id") ;

		DataMessage data;

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		LocalDate now = LocalDate.now();
		String invc_date = now.format(formatter);

		if(sale_drtr_idcd.equals("")){
			sale_drtr_idcd = "@";
		}
		if(trns_stop_yorn.equals("")){
			trns_stop_yorn = "@";
		}
		if(npay_term.equals("")){
			npay_term = "@";
		}
		if(npay_amnt.equals("")){
			npay_amnt = "@";
		}
		if(find_name.equals("")){
			find_name = "@";
		}
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.param
			.query("call cstm_credit_list (		")
			.query("   concat(substring(:invc_date,1,6),'01')" , invc_date	)	// 일자
			.query(" , :invc_date2 "      , invc_date	)	// 일자
			.query(" , :sale_drtr_idcd "  , sale_drtr_idcd	)	// 창고코드
			.query(" , :trns_stop_yorn "  , trns_stop_yorn  )
			.query(" , :npay_term "       , npay_term		)	// 자재구분
			.query(" , :npay_amnt "       , npay_amnt		)
			.query(" , :find_name      "  , find_name		)
			.query(" ) 								")
		;

		return data.selectForMap();
	}

	//거래처 신용등급 초기화
	public SqlResultMap setTrnsStopInit(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		ParamToJson trans = new ParamToJson();
		String json = trans.Translate(arg, "cstm_mast_json_fields");

		data.param
			.query("update cstm_mast a")
			.query("   set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(a.json_data,'{}'),'$.trns_stop_yorn'),:json)",json)	//json merge  remove로 중복제거 후 merge
			.query(" where a.sale_cstm_yorn = '1'")
			.query("   and a.line_stat = '0'")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		return null ;
	}

	//거래처 거래정지
	public SqlResultMap setTrnsStopAction(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String [] ary_cstm_idcd = arg.getParamText("cstm_idcd").split(",");
		ParamToJson trans = new ParamToJson();
		String json = trans.Translate(arg, "cstm_mast_json_fields");

		for(String cstm_idcd : ary_cstm_idcd) {
			data.param
				.query("update cstm_mast a")
				.query("   set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(a.json_data,'{}'),'$.trns_stop_yorn'),:json)",json)	//json merge  remove로 중복제거 후 merge
				.query(" where a.cstm_idcd = '" + cstm_idcd + "'	")
			;
			data.attach(Action.direct);
		}

		data.execute();

		return null ;
	}
}
