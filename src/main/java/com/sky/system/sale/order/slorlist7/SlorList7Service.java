package com.sky.system.sale.order.slorlist7;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class SlorList7Service extends DefaultServiceHandler {



	/* 대아 KPI 감리로 임시 쿼리 생성 */

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.수주일자                    , a.수주처명         , a.품명          , a.수주수량					")
			.query("        , a.단가                  , a.공급가액               , a.납기요청일								")
			.query("        , a.pono             , a.납기일                   , a.지연일									")
		;
		data.param
			.query("from 대아수주납기 a																				")
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
			.query("select																						")
			.query("         (select CONCAT(																	")
			.query("                 ROUND((SUM(CASE WHEN 지연일 < 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2),	")
			.query("         '%')																				")
			.query("         from 대아수주납기																		")
		;
		data.param
			.where("         where    수주일자  >= :invc1_date		" , arg.getParameter("invc1_date" ))
			.where("         and    수주일자  <= :invc2_date		" , arg.getParameter("invc2_date" ))
		;
		data.param
			.where("         ) AS count																			")
		;
		data.param
			.where("from 대아수주납기 a																			")
			.where("where  1=1																					")
			.where("and    a.수주일자  >= :invc3_date		" , arg.getParameter("invc1_date" ))
			.where("and    a.수주일자  <= :invc4_date		" , arg.getParameter("invc2_date" ))
		;
		return data.selectForMap();
	}
}
