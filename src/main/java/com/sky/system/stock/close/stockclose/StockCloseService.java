package com.sky.system.stock.close.stockclose;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class StockCloseService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		String invc_date	= arg.getParamText("invc_date") ;
		String acct_dvcd	= arg.getParamText("acct_dvcd") ;
		String wrhs_idcd2	= arg.getParamText("wrhs_idcd") ;
		String wrhs_idcd	= null ;
		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		//창고가 없을땐 창고코드가 @로 프로시저가 돌아감
		if(wrhs_idcd2.equals("")){
			wrhs_idcd = "@";
		}else{
			wrhs_idcd = wrhs_idcd2;
		}

		if(acct_dvcd.equals("")){
			acct_dvcd = "all";
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.query("call stock_list_type_1 (										")
			.query("   concat(substring(:invc1_date,1,6),'01')"      , invc_date	)	// 일자
			.query(" , date_format(last_day(:invc2_date),'%Y%m%d')"  , invc_date	)	// 일자
			.query(" , :wrhs_idcd "                                  , wrhs_idcd	)	// 창고코드
			.query(" , 'off' "                                                      )
			.query(" , :acct_dvcd "  , acct_dvcd	)	// 자재구분
			.query(" , :stor      "  , stor			)
			.query(" ) 																")
		;
		return data.selectForMap(sort);
	}

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd");
		String stor			= arg.getParamText("stor_id");
		String yyyymm		= arg.getParamText("clos_yymm");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		System.out.println(yyyymm);
		if(stor.equalsIgnoreCase("N1000iypkg1000")){
			data.param
				.query("call stock_close_iypkg (			")
				.query("   substring(:yyyymm,1,6) " , yyyymm )		// 마감년월
				.query(" ) 									")
			;
			data.attach(Action.direct);
			data.execute();

		}else if(stor.equalsIgnoreCase("N1000A-ONE1000")){
			data.param
			.query("call stock_close_v2 (			")
			.query("   substring(:yyyymm,1,6) " , yyyymm )		// 마감년월
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		}else{
			data.param
				.query("call stock_close (					")
				.query("   substring(:yyyymm,1,6) " , yyyymm )		// 마감년월
				.query(" ) 									")
			;
			data.attach(Action.direct);
			data.execute();

		}

		return null;
	}
}
