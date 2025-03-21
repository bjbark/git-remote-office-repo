package com.sky.system.sale.sale.salelist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.SaleListService")
public class SaleListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    c.cstm_code        , c.cstm_name      , i.item_code        , i.item_name			")
			.where("        , i.item_spec        , a.sale_pric      , a.sale_qntt        , a.sale_amnt			")
			.where("        , a.vatx_amnt        , a.ttsm_amnt													")
			.where("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif													")
			.where("from sale_item a																			")
			.where("left outer join sale_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
			.where("left outer join acpt_mast d on d.invc_numb = a.acpt_numb									")
			.where("where   1=1																					")
			.where("and     b.bzpl_idcd  = :bzpl_idcd"         , arg.getParamText("bzpl_idcd"))		//사업장
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and ((json_value(a.json_data, '$.trns_date') is null ")
				.where("and b.invc_date >= :invc_date1" , arg.getParamText("invc_date1"))
				.where("and b.invc_date <= :invc_date2)" , arg.getParamText("invc_date2"))
				.where("or  (json_value(a.json_data, '$.trns_date') is not null ")
				.where("and json_value(a.json_data, '$.trns_date') >= :invc_date3" , arg.getParamText("invc_date1"))
				.where("and json_value(a.json_data, '$.trns_date') <= :invc_date4))" , arg.getParamText("invc_date2"))
			;
		}else{
			data.param
				.where(" and b.invc_date >= :invc_date11", arg.getParamText("invc_date1"))
				.where(" and b.invc_date <= :invc_date12", arg.getParamText("invc_date2"))
			;
		}
		data.param
			.where("and     b.cstm_idcd  = :cstm_idcd"         , arg.getParamText("cstm_idcd"))		//거래처
			.where("and     d.drtr_idcd  = :drtr_idcd        " , arg.getParamText("drtr_idcd"))		//담당자
			.where("and     b.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.invc_numb asc limit 99999999														")
			.where(") a																							")
		;


		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

//		data.param // 집계문  입력
//			.total(" select  count(1) as maxsize  ")
//		;

		data.param
			.query("with temp as (																			")
			.query("	select a.invc_numb , b.item_idcd , a.invc_date , b.sale_qntt , b.ttsm_amnt			")
			.query("	from sale_mast a																	")
			.query("	left outer join sale_item b on a.invc_numb = b.invc_numb							")
			.query("	left outer join acpt_mast c on c.invc_numb = b.acpt_numb							")
			.query("	where 1 = 1																			")
			.query("    and   a.bzpl_idcd  = :bzpl_idcd  " , arg.getParamText("bzpl_idcd"))		//사업장
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("and ((json_value(b.json_data, '$.trns_date') is null ")
				.query("and a.invc_date >= :invc_date1" , arg.getParamText("invc_date1"))
				.query("and a.invc_date <= :invc_date2)" , arg.getParamText("invc_date2"))
				.query("or  (json_value(b.json_data, '$.trns_date') is not null ")
				.query("and json_value(b.json_data, '$.trns_date') >= :invc_date3" , arg.getParamText("invc_date1"))
				.query("and json_value(b.json_data, '$.trns_date') <= :invc_date4))" , arg.getParamText("invc_date2"))
			;
		}else{
			data.param
				.query(" and a.invc_date >= :invc_date11", arg.getParamText("invc_date1"))
				.query(" and a.invc_date <= :invc_date12", arg.getParamText("invc_date2"))
			;
		}
		data.param
			.query("	and   a.cstm_idcd  = :cstm_idcd  " , arg.getParamText("cstm_idcd"))		//거래처
			.query("	and   c.drtr_idcd  = :drtr_idcd  " , arg.getParamText("drtr_idcd"))		//영업담당
			.query("    and   b.line_stat  < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.query(")																						")
			.query("select t.*																				")
			.query("	, if(t.row_num =1 , '수량' , '금액' ) as dvcd											")
			.query("	, if(t.row_num =1 , i.item_code , null ) as item_code								")
			.query("	, if(t.row_num =1 , i.item_name , null ) as item_name								")
			.query("	, if(t.row_num =1 , i.item_spec , null ) as item_spec								")
			.query("from (																					")
			.query("	select   a.item_idcd																")
			.query("		, sum(if(MONTH(a.invc_date) = 1, a.sale_qntt, 0)) AS 1_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 2, a.sale_qntt, 0)) AS 2_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 3, a.sale_qntt, 0)) AS 3_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 4, a.sale_qntt, 0)) AS 4_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 5, a.sale_qntt, 0)) AS 5_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 6, a.sale_qntt, 0)) AS 6_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 7, a.sale_qntt, 0)) AS 7_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 8, a.sale_qntt, 0)) AS 8_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 9, a.sale_qntt, 0)) AS 9_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 10, a.sale_qntt, 0)) AS 10_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 11, a.sale_qntt, 0)) AS 11_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 12, a.sale_qntt, 0)) AS 12_month					")
			.query("		, sum(if(QUARTER(a.invc_date) = 1, a.sale_qntt, 0)) AS 1_sum					")
			.query("		, sum(if(QUARTER(a.invc_date) = 2, a.sale_qntt, 0)) AS 2_sum					")
			.query("		, sum(if(QUARTER(a.invc_date) = 3, a.sale_qntt, 0)) AS 3_sum					")
			.query("		, sum(if(QUARTER(a.invc_date) = 4, a.sale_qntt, 0)) AS 4_sum					")
			.query("		, sum(if(QUARTER(a.invc_date) = 1 or 2 or 3 or 4, a.sale_qntt, 0)) AS ttsm_sum	")
			.query("		, 1 as row_num 																	")
			.query("	from temp a																			")
			.query("	where 1 = 1																			")
			.query("	group by item_idcd 																	")
		;
		data.param
			.query("	union all																			")
			.query("	select   a.item_idcd																")
			.query("		, sum(if(MONTH(a.invc_date) = 1, a.ttsm_amnt, 0)) AS 1_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 2, a.ttsm_amnt, 0)) AS 2_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 3, a.ttsm_amnt, 0)) AS 3_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 4, a.ttsm_amnt, 0)) AS 4_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 5, a.ttsm_amnt, 0)) AS 5_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 6, a.ttsm_amnt, 0)) AS 6_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 7, a.ttsm_amnt, 0)) AS 7_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 8, a.ttsm_amnt, 0)) AS 8_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 9, a.ttsm_amnt, 0)) AS 9_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 10, a.ttsm_amnt, 0)) AS 10_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 11, a.ttsm_amnt, 0)) AS 11_month					")
			.query("		, sum(if(MONTH(a.invc_date) = 12, a.ttsm_amnt, 0)) AS 12_month					")
			.query(" 		, sum(if(QUARTER(a.invc_date) = 1, a.ttsm_amnt, 0)) AS 1_sum					")
			.query(" 		, sum(if(QUARTER(a.invc_date) = 2, a.ttsm_amnt, 0)) AS 2_sum					")
			.query(" 		, sum(if(QUARTER(a.invc_date) = 3, a.ttsm_amnt, 0)) AS 3_sum					")
			.query(" 		, sum(if(QUARTER(a.invc_date) = 4, a.ttsm_amnt, 0)) AS 4_sum					")
			.query(" 		, sum(if(QUARTER(a.invc_date) = 1 or 2 or 3 or 4, a.ttsm_amnt, 0)) AS ttsm_sum	")
			.query("		, 2 as row_num																	")
			.query("	from temp	a																		")
			.query("	where 1 = 1																			")
			.query("	group by item_idcd 																	")
			.query(") t																						")
			.query("left outer join item_mast i on t.item_idcd = i.item_idcd								")
			.query("order by t.item_idcd , t.row_num														")
		;

		return data.selectForMap();
	}

	public SqlResultMap getList3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select x.*																				")
		;
		data.param
			.where("from (																					")
			.where("with sale as (																			")
			.where("   select b.cstm_idcd, a.ttsm_amnt														")
			.where("     from sale_item a																	")
			.where("          left outer join sale_mast b on b.invc_numb = a.invc_numb						")
			.where("          left outer join acpt_mast c on c.invc_numb = a.acpt_numb						")
			.where("    where 1 = 1																			")
			.where("      and b.bzpl_idcd  = :bzpl_idcd        " , arg.getParamText("bzpl_idcd"))		//사업장
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and ((json_value(a.json_data, '$.trns_date') is null ")
				.where("and b.invc_date >= :invc_date1" , arg.getParamText("invc_date1"))
				.where("and b.invc_date <= :invc_date2)" , arg.getParamText("invc_date2"))
				.where("or  (json_value(a.json_data, '$.trns_date') is not null ")
				.where("and json_value(a.json_data, '$.trns_date') >= :invc_date3" , arg.getParamText("invc_date1"))
				.where("and json_value(a.json_data, '$.trns_date') <= :invc_date4))" , arg.getParamText("invc_date2"))
			;
		}else{
			data.param
				.where(" and b.invc_date >= :invc_date11", arg.getParamText("invc_date1"))
				.where(" and b.invc_date <= :invc_date12", arg.getParamText("invc_date2"))
			;
		}
		data.param
			.where("      and b.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"))		//거래처
			.where("      and c.drtr_idcd  = :drtr_idcd        " , arg.getParamText("drtr_idcd"))		//영업담당
			.where("      and b.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(")select b.cstm_code, b.cstm_name, b.ttsm_amnt, b.ranking								")
			.where("      , concat(round( (b.ttsm_amnt / a.ttsm_amnt )*100,2),'%') AS rate					")
			.where("   from (select sum(ttsm_amnt) ttsm_amnt												")
			.where("           from sale) a																	")
			.where("      , (select a.cstm_idcd, b.cstm_code, b.cstm_name, sum(a.ttsm_amnt) as ttsm_amnt	")
			.where("              , rank() over (order by sum(a.ttsm_amnt) desc) as ranking					")
			.where("           from sale a																	")
			.where("                left outer join cstm_mast b on b.cstm_idcd = a.cstm_idcd				")
			.where("          group by a.cstm_idcd															")
			.where("         having sum(a.ttsm_amnt) != 0) b												")
			.where(") x																						")
			.where("order by x.ranking asc																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getList4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select x.*																				")
		;
		data.param
			.where("from (																					")
			.where("with sale as (																			")
			.where("   select a.item_idcd, a.sale_qntt, a.ttsm_amnt											")
			.where("     from sale_item a																	")
			.where("          left outer join sale_mast b on b.invc_numb = a.invc_numb						")
			.where("          left outer join acpt_mast c on c.invc_numb = a.acpt_numb						")
			.where("    where 1 = 1																			")
			.where("      and b.bzpl_idcd  = :bzpl_idcd        " , arg.getParamText("bzpl_idcd"))		//사업장
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and ((json_value(a.json_data, '$.trns_date') is null ")
				.where("and b.invc_date >= :invc_date1" , arg.getParamText("invc_date1"))
				.where("and b.invc_date <= :invc_date2)" , arg.getParamText("invc_date2"))
				.where("or  (json_value(a.json_data, '$.trns_date') is not null ")
				.where("and json_value(a.json_data, '$.trns_date') >= :invc_date3" , arg.getParamText("invc_date1"))
				.where("and json_value(a.json_data, '$.trns_date') <= :invc_date4))" , arg.getParamText("invc_date2"))
			;
		}else{
			data.param
				.where(" and b.invc_date >= :invc_date11", arg.getParamText("invc_date1"))
				.where(" and b.invc_date <= :invc_date12", arg.getParamText("invc_date2"))
			;
		}
		data.param
			.where("      and b.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"))		//거래처
			.where("      and c.drtr_idcd  = :drtr_idcd        " , arg.getParamText("drtr_idcd"))		//영업담당
			.where("      and b.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(")select b.item_code, b.item_name, b.item_spec, b.sale_qntt, b.ttsm_amnt, b.ranking		")
			.where("      , concat(round( (b.ttsm_amnt / a.ttsm_amnt )*100,2),'%') AS rate					")
			.where("   from (select sum(ttsm_amnt) ttsm_amnt												")
			.where("           from sale) a																	")
			.where("      , (select a.item_idcd, b.item_code, b.item_name, b.item_spec						")
			.where("              , sum(a.sale_qntt) as sale_qntt, sum(a.ttsm_amnt) as ttsm_amnt			")
			.where("              , rank() over (order by sum(ttsm_amnt) desc) as ranking					")
			.where("           from sale a																	")
			.where("                left outer join item_mast b on b.item_idcd = a.item_idcd				")
			.where("          group by a.item_idcd															")
			.where("         having sum(a.sale_qntt) != 0 and sum(a.ttsm_amnt) != 0) b						")
			.where(") x																						")
			.where("order by x.ranking asc																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getList5(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select x.*																					")
		;
		data.param
			.where("from (																					")
			.where("with sale as (																			")
			.where("   select c.drtr_idcd, a.sale_qntt, a.ttsm_amnt											")
			.where("     from sale_item a																	")
			.where("          left outer join sale_mast b on b.invc_numb = a.invc_numb						")
			.where("          left outer join acpt_mast c on c.invc_numb = a.acpt_numb						")
			.where("    where 1 = 1																			")
			.where("      and b.bzpl_idcd  = :bzpl_idcd        " , arg.getParamText("bzpl_idcd"))		//사업장
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and ((json_value(a.json_data, '$.trns_date') is null ")
				.where("and b.invc_date >= :invc_date1" , arg.getParamText("invc_date1"))
				.where("and b.invc_date <= :invc_date2)" , arg.getParamText("invc_date2"))
				.where("or  (json_value(a.json_data, '$.trns_date') is not null ")
				.where("and json_value(a.json_data, '$.trns_date') >= :invc_date3" , arg.getParamText("invc_date1"))
				.where("and json_value(a.json_data, '$.trns_date') <= :invc_date4))" , arg.getParamText("invc_date2"))
			;
		}else{
			data.param
				.where(" and b.invc_date >= :invc_date11", arg.getParamText("invc_date1"))
				.where(" and b.invc_date <= :invc_date12", arg.getParamText("invc_date2"))
			;
		}
		data.param
			.where("      and b.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"))		//거래처
			.where("      and c.drtr_idcd  = :drtr_idcd        " , arg.getParamText("drtr_idcd"))		//영업담당
			.where("      and b.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(")select b.dept_name, b.user_code, b.user_name, b.sale_qntt, b.ttsm_amnt, b.ranking		")
			.where("      , concat(round( (b.ttsm_amnt / a.ttsm_amnt )*100,2),'%') AS rate					")
			.where("   from (select sum(ttsm_amnt) ttsm_amnt												")
			.where("           from sale) a																	")
			.where("      , (select a.drtr_idcd, c.dept_name, b.user_code, b.user_name						")
			.where("              , sum(a.sale_qntt) as sale_qntt, sum(a.ttsm_amnt) as ttsm_amnt			")
			.where("              , rank() over (order by sum(ttsm_amnt) desc) as ranking					")
			.where("           from sale a																	")
			.where("                left outer join user_mast b on b.user_idcd = a.drtr_idcd				")
			.where("                left outer join dept_mast c on c.dept_idcd = b.dept_idcd				")
			.where("          group by a.drtr_idcd															")
			.where("         having sum(a.sale_qntt) != 0 and sum(a.ttsm_amnt) != 0) b						")
			.where(") x																						")
			.where("order by x.ranking asc																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
