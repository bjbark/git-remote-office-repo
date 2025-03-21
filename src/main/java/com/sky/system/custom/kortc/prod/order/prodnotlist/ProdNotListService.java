package com.sky.system.custom.kortc.prod.order.prodnotlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service("kortc.ProdNotListService")
public class ProdNotListService extends DefaultServiceHandler {


		public SqlResultMap getLister(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
			DataMessage data = arg.newStorage("POS");
			data.param // 집계문  입력
				.total(" select  count(1) as maxsize  ")
			;
			data.param
				.query("select    a.수주일자                    , a.수주처명         , a.품명          , a.수주수량					")
				.query("        , a.생산량                  , a.불량수량               , a.납기요청일								")
				.query("        , a.수주수량             , a.납기일                   , a.납품수량									")
			;
			data.param
				.query("from 대아생산불량현황 a																				")
				.query("where  1=1																						")
				.query("and    a.수주일자  >= :invc1_date		" , arg.getParamText("invc1_date" ))
				.query("and    a.수주일자  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			;
			if (page == 0 && rows == 0){
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1), sort );
			}
		}

		public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
			DataMessage data = arg.newStorage("POS");
			data.param
				.query("select		CONCAT(ROUND((SUM(불량수량) / SUM(생산량)) * 100, 2),'%') as count					")
			;
			data.param
				.where("from 대아생산불량현황 a																			")
				.where("where  1=1																					")
				.where("and    a.수주일자  >= :invc3_date		" , arg.getParameter("invc1_date" ))
				.where("and    a.수주일자  <= :invc4_date		" , arg.getParameter("invc2_date" ))
			;
			return data.selectForMap();
		}

}
