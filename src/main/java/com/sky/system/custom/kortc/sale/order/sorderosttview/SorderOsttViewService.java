package com.sky.system.custom.kortc.sale.order.sorderosttview;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service
public class SorderOsttViewService extends DefaultServiceHandler {

	public SqlResultMap getMaster1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select   c.cstm_name                                 , count(a.invc_numb) as ostt_qntt		")
			.query("       , sum(a.invc_qntt*a.invc_pric) as invc_amnt   , u.user_name as drtr_name				")

		;
		data.param
			.where("from  acpt_item	a																			")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr		")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u on b.drtr_idcd = u.user_idcd									")
			.where("where 1=1																					")
			.where("and   b.invc_date >= :invc1_date ", arg.getParameter("invc1_date"))
			.where("and   b.invc_date <= :invc2_date ", arg.getParameter("invc2_date"))
			.where("and   b.drtr_idcd = :drtr_idcd ", arg.getParameter("dvly_date"))
			.where("and   b.cstm_idcd = :cstm_idcd ", arg.getParameter("cstm_idcd"))
			.where("and   c.find_name like %:find_name% ", arg.getParameter("find_name"))
			.where("and   b.line_clos = :line_clos ", arg.getParameter("line_clos"))
			.where("group by b.cstm_idcd																		")




			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}


//조회2
	public SqlResultMap getMaster2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String date = "2022";
		if(!"".equals(arg.getParamText("invc1_date"))){
			date = arg.getParamText("invc1_date");
		}
		data.param
			.query("with recursive cte as (																		")
			.query("   select 1 as a																			")
			.query("   union all																				")
			.query("   select a+1 as a																			")
			.query("   from cte																					")
			.query("   where a<12																				")
			.query(")																							")
			.query("select if( b.dlvy_date is null																")
			.query("          , concat(substr(:date,1,4),lpad(cte.a,2,'0'))	",date)
			.query("          , b.dlvy_date) as dlvy_date														")
			.query("       , invc_amnt, ostt_qntt																")
		;
		data.param
			.query("from cte																					")
			.query("left outer join																				")
			.query("( select substr(a.dlvy_date,1,6) as dlvy_date,sum(a.invc_pric*a.ostt_qntt) as invc_amnt, count(a.invc_numb) as ostt_qntt	")
			.query("  from acpt_item a																			")
			.query("  left outer join acpt_mast b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr	")
			.query("  left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
			.query("  left outer join user_mast u on b.drtr_idcd = u.user_idcd									")
			.query("  where substr(a.dlvy_date,1,4) = substr(:dlvy_year,1,4)	",arg.getParameter("invc1_date"))
			.query("  and   b.drtr_idcd = :drtr_idcd ", arg.getParameter("dvly_date"))
			.query("  and   b.cstm_idcd = :cstm_idcd ", arg.getParameter("cstm_idcd"))
			.query("  and   b.line_clos = :line_clos ", arg.getParameter("line_clos"))
			.query("  group by substr(a.dlvy_date,1,6)	")
			.query(") b on lpad(cte.a,2,'0') = substr(b.dlvy_date,5,2)	")
			.query("order by cte.a						")
		;

			return data.selectForMap();
	}

//조회3
		public SqlResultMap getMaster3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize 																		")
			;
			data.param
				.query("select   user_name as drtr_name      , count(a.invc_numb) as ostt_qntt							")
				.query("       , sum(a.invc_qntt * a.invc_amnt) as invc_amnt											")

			;
			data.param
				.where("from  acpt_item	a																				")
				.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr		")
				.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
				.where("left outer join user_mast u on b.drtr_idcd = u.user_idcd									")
				.where("where b.drtr_idcd is not null																")
				.where("and   b.invc_date >= :invc1_date ", arg.getParameter("invc1_date"))
				.where("and   b.invc_date <= :invc2_date ", arg.getParameter("invc2_date"))
				.where("and   b.drtr_idcd = :drtr_idcd ", arg.getParameter("dvly_date"))
				.where("and   b.cstm_idcd = :cstm_idcd ", arg.getParameter("cstm_idcd"))
				.where("and   u.find_name like %:find_name% ", arg.getParameter("find_name"))
				.where("and   b.line_clos = :line_clos ", arg.getParameter("line_clos"))
				.where("group by b.drtr_idcd																		")
			;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
