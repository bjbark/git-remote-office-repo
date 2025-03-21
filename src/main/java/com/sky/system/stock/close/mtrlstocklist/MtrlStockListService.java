package com.sky.system.stock.close.mtrlstocklist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class MtrlStockListService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		String invc1_date	= arg.getParamText("invc1_date") ;
		String invc2_date	= arg.getParamText("invc2_date") ;
		String wrhs_idcd1	= arg.getParamText("wrhs_idcd") ;
		String list_all		= arg.getParamText("list_all") ;
		String find_name	= arg.getParamText("find_name") ;
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
		if(wrhs_idcd1.equals("")){
			wrhs_idcd = "@";
		}else{
			wrhs_idcd = wrhs_idcd1;
		}
		if(list_all.equals("")){
			list_all = "off";
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		String acct_dvcd = arg.getParamText("acct_dvcd");
		if(acct_dvcd.equals("")){
			acct_dvcd = "@";
		}

		String stok_type_dvcd = arg.getParamText("stok_type_dvcd");
		if(stok_type_dvcd.equals("")){
			stok_type_dvcd = "off";
		}

		if(find_name.equals("")){
			find_name = "@";
		}

		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("call stock_list_type_1_sjflv (		")
				.query("   :invc1_date     " , invc1_date		)	// 일자
				.query(" , :invc2_date     " , invc2_date		)	// 일자
				.query(" , :wrhs_idcd      "  , wrhs_idcd		)	// 창고코드
				.query(" , :list_all       "  , list_all		)
				.query(" , :acct_dvcd      "  , acct_dvcd		)	// 자재구분
				.query(" , :stor           "  , stor			)
				.query(" , :stok_type_dvcd "  , stok_type_dvcd	)	// 입고유형
				.query(" , :item_idcd      "  , "@"				)
				.query(" , :find_name      "  , find_name		)
				.query(" ) 										")
			;
		}else{
			data.param
				.query("call stock_list_type_1 (		")
				.query("   :invc1_date " , invc1_date	)	// 일자
				.query(" , :invc2_date " , invc2_date	)	// 일자
				.query(" , :wrhs_idcd "  , wrhs_idcd	)	// 창고코드
				.query(" , :list_all "   , list_all		)
				.query(" , :acct_dvcd "  , acct_dvcd	)	// 자재구분
				.query(" , :stor      "  , stor			)
				.query(" ) 								")
			;
		}
		return data.selectForMap();
	}

	public SqlResultMap getSearchWrhs(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.zone_idcd   , a.wrhs_idcd   , zone_name   , zone_rack   , zone_colm   , zone_flor	")
		;
		data.param
			.where("from wrhs_zone a																			")
			.where("where    1=1																				")
			.where("and      a.wrhs_idcd   = :wrhs_idcd      " , arg.getParamText("wrhs_idcd"))
			.where("and      a.find_name   like %:find_name% " , arg.getParamText("find_name"))
			.where("and      a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.wrhs_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearchWrhsStock(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		String invc1_date	= arg.getParamText("invc1_date") ;
		String invc2_date	= arg.getParamText("invc2_date") ;
		String wrhs_idcd1	= arg.getParamText("wrhs_idcd") ;
		String list_all		= arg.getParamText("list_all") ;
		String find_name	= arg.getParamText("find_name") ;
		String wrhs_idcd	= arg.getParamText("wrhs_idcd") ;
		String zone_idcd	= arg.getParamText("zone_idcd") ;
		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}
		if(wrhs_idcd1.equals("")){
			wrhs_idcd = "@";
		}else{
			wrhs_idcd = wrhs_idcd1;
		}
		if(list_all.equals("")){
			list_all = "off";
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		String acct_dvcd = arg.getParamText("acct_dvcd");
		if(acct_dvcd.equals("")){
			acct_dvcd = "@";
		}

		String stok_type_dvcd = arg.getParamText("stok_type_dvcd");
		if(stok_type_dvcd.equals("")){
			stok_type_dvcd = "off";
		}

		if(find_name.equals("")){
			find_name = "@";
		}

		data.param
			.query("call stock_list_type_zone (		")
			.query("   :invc1_date " , invc1_date	)	// 일자
			.query(" , :invc2_date " , invc2_date	)	// 일자
			.query(" , :wrhs_idcd "  , wrhs_idcd	)	// 창고코드
			.query(" , :zone_idcd "  , zone_idcd	)	// 창고코드
			.query(" , :list_all "   , list_all		)
			.query(" , :acct_dvcd "  , acct_dvcd	)	// 자재구분
			.query(" , :stor      "  , stor			)
			.query(" ) 								")
		;
		return data.selectForMap();
	}
}
