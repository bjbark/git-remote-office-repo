package com.sky.system.custom.iypkg.eis.eisreport15;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service("iypkg.EisReport15Service")
public class EisReport15Service extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from(																								")
			.where("select    w.wkct_idcd      , w.wkct_name      , a.prod_qntt      , a.invc_numb						")
			.where("        , a.acpt_numb      , w.wkct_stnm      , a.pqty_pric											")
			.where("        , a.amnt														")
			.where("from wkct_mast w																					")
			.where("left outer join (																					")
			.where("     select    a.wkct_idcd      , sum(a.prod_qntt) as prod_qntt      , a.invc_numb					")
			.where("             , b.invc_numb as acpt_numb      , b.pqty_pric											")
			.where("             , sum(a.prod_qntt * b.pqty_pric) as amnt 													")
			.where("     from work_book a																				")
			.where("     left outer join pror_item p on a.wkod_numb = p.invc_numb and a.wkod_seqn = p.line_seqn			")
			.where("     left outer join pror_mast m on p.invc_numb = m.invc_numb										")
			.where("     left outer join boxx_acpt b on a.pdsd_numb = b.invc_numb										")
			.where("     left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd										")
			.where("     where 1=1																						")
			.where("     and substr(a.invc_date,1,4) = :year	" , arg.getParamText("year"))
			.where("     group by a.wkct_idcd																			")
			.where("     order by a.wkct_idcd																			")
			.where(") a on w.wkct_idcd = a.wkct_idcd																	")
			.where("where 1=1																							")
			.where("and a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where(") a 																								")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with recursive cte as (																				")
			.query("  select 1 as rnum																					")
			.query("  union all																							")
			.query("  select rnum + 1 from cte																			")
			.query("  where rnum < 12																					")
			.query(")																									")
		;
		data.param
			.query("select     lpad(rnum,2,'0') as rnum      , w.prod_qntt												")
			.query("          , w.pqty_pric	   , w.amnt																	")
			.query("from cte a																							")
			.query("left outer join (																					")
			.query("     select    a.wkct_idcd      , sum(a.prod_qntt) as prod_qntt      , a.invc_numb					")
			.query("             , b.pqty_pric      , b.invc_numb as acpt_numb											")
			.query("             , substr(a.invc_date,1,6) as invc_date													")
			.query("             , sum(a.prod_qntt * b.pqty_pric) as amnt													")
			.query("     from work_book a																				")
			.query("     left outer join pror_item p on a.wkod_numb = p.invc_numb and a.wkod_seqn = p.line_seqn			")
			.query("     left outer join pror_mast m on p.invc_numb = m.invc_numb										")
			.query("     left outer join boxx_acpt b on a.pdsd_numb = b.invc_numb										")
			.query("     left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd										")
			.query("     where 1=1																						")
			.query("     and substr(a.invc_date,1,4) = :year		" , arg.getParamText("year"))
			.query("     and a.wkct_idcd             = :wkct_idcd	" , arg.getParamText("wkct_idcd"))
			.query("     group by substr(a.invc_date,1,6)																")
			.query(") w on lpad(a.rnum,2,'0') = substr(w.invc_date,5,2)													")
			.query("order by rnum																						")
		;

		return data.selectForMap() ;

	}
}
