package com.sky.system.custom.sjflv.mtrl.isttcalc.dailypurclist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjung.DailyPurcListService")
public class DailyPurcListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
	    .query("select x.*																									")
	    ;
		data.param
			.where("from (																										")
			.where("with cte as (																								")
			.where("   select a.invc_numb, a.invc_date, a.cstm_idcd, c.cstm_name												")
			.where("        , b.line_seqn, b.item_idcd, d.item_code, d.item_name, d.item_spec									")
			.where("        , b.istt_qntt as qntt, b.istt_pric as pric															")
			.where("        , b.istt_amnt as sply_amnt, b.istt_vatx as vatx_amnt, b.ttsm_amnt									")
			.where("        , i.user_memo																						")
			.where("     from purc_istt_mast a																					")
			.where("          left outer join purc_istt_item b on b.invc_numb = a.invc_numb										")
			.where("          left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd											")
			.where("          left outer join item_mast d on d.item_idcd = b.item_idcd 											")
			.where("          left outer join  purc_ordr_item i on b.orig_invc_numb = i.invc_numb and b.orig_seqn = i.line_seqn	")
			.where("          left outer join wrhs_mast e on e.wrhs_idcd = a.istt_wrhs_idcd 									")
			.where("    where 1 = 1																								")
			.where("      and a.invc_date >= :invc_date1"    		, arg.getParamText("invc_date1"))
			.where("      and a.invc_date <= :invc_date2"    		, arg.getParamText("invc_date2"))
			.where("      and a.cstm_idcd  = :cstm_idcd1"   		, arg.getParamText("cstm_idcd1"))
			.where("      and d.acct_bacd  = :acct_bacd"     		, arg.getParamText("acct_bacd"))
			.where("      and a.find_name like %:find_name%	"		, arg.getParameter("find_name"))
			.where("      and a.istt_wrhs_idcd  = :istt_wrhs_idcd1" , arg.getParamText("istt_wrhs_idcd1"))
			.where("      and b.item_idcd  = :item_idcd1"			, arg.getParamText("item_idcd1"))
			.where("      and d.item_name  = :item_name1" 			, arg.getParamText("item_name1"))
			.where("      and a.line_stat  < 2																					")
			.where(")																											")
		;
		data.param
			.where(" select a.invc_date")
			.where("      , a.cstm_idcd")
			.where("      , a.cstm_name")
			.where("      , a.item_code")
			.where("      , a.item_name")
			.where("      , a.item_spec")
			.where("      , a.qntt")
			.where("      , a.pric")
			.where("      , a.sply_amnt")
			.where("      , a.vatx_amnt")
			.where("      , a.ttsm_amnt")
			.where("      , a.invc_date as crt_date")
			.where("      , 1 as rnum")
			.where("      , a.user_memo")
			.where("   from cte a")
		;
		if(arg.getParamText("chk" ).contains("1")) {			//소계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , a.cstm_idcd")
				.where("      , concat(a.cstm_name, ' 소계') as cstm_name")
				.where("      , null as item_code")
				.where("      , null as item_name")
				.where("      , null as item_spec")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , a.invc_date as crt_date")
				.where("      , 2 as rnum")
				.where("      , null as user_memo")
				.where("   from cte a")
				.where("  group by a.invc_date, a.cstm_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("2")) {			//일계
			data.param
				.where(" union all")
				.where(" select a.invc_date")
				.where("      , max(a.cstm_idcd) as cstm_idcd")
				.where("      , '일계' as cstm_name")
				.where("      , null as item_code")
				.where("      , null as item_name")
				.where("      , null as item_spec")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , a.invc_date as crt_date")
				.where("      , 3 as rnum")
				.where("      , null as user_memo")
				.where("   from cte a")
				.where("  group by a.invc_date")
			;
		}
		if(arg.getParamText("chk" ).contains("3")) {			//월계
			data.param
				.where(" union all")
				.where(" select substr(a.invc_date,1,6) as invc_date")
				.where("      , max(a.cstm_idcd) as cstm_idcd")
				.where("      , '월계' as cstm_name")
				.where("      , null as item_code")
				.where("      , null as item_name")
				.where("      , null as item_spec")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , concat(substr(a.invc_date,1,6),'99') as crt_date")
				.where("      , 4 as rnum")
				.where("      , null as user_memo")
				.where("   from cte a")
				.where("  group by concat(substr(a.invc_date,1,6), '99')")
			;
		}
		if(arg.getParamText("chk" ).contains("4")) {			//합계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , max(a.cstm_idcd) as cstm_idcd")
				.where("      , '합계' as cstm_name")
				.where("      , null as item_code")
				.where("      , null as item_name")
				.where("      , null as item_spec")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , '99999999' as crt_date")
				.where("      , 5 as rnum")
				.where("      , null as user_memo")
				.where("   from cte a")
				.where("  group by '99999999'")
			;
		}
		data.param
			.where("     ) x ")
			.where(" order by x.crt_date, x.cstm_idcd, x.rnum ")
		;

		return  data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
	    .query("select x.*																									")
	    ;
		data.param
			.where("from (																										")
			.where("with cte as (																								")
			.where("   select a.invc_numb, a.invc_date, a.cstm_idcd, c.cstm_name												")
			.where("        , b.line_seqn, b.item_idcd, d.item_code, d.item_name, d.item_spec									")
			.where("        , b.istt_qntt as qntt, b.istt_pric as pric															")
			.where("        , b.istt_amnt as sply_amnt, b.istt_vatx as vatx_amnt, b.ttsm_amnt									")
			.where("        , a.istt_wrhs_idcd	,e.wrhs_name																	")
			.where("     from purc_istt_mast a																					")
			.where("          left outer join purc_istt_item b on b.invc_numb = a.invc_numb										")
			.where("          left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd											")
			.where("          left outer join item_mast d on d.item_idcd = b.item_idcd 											")
			.where("          left outer join wrhs_mast e on e.wrhs_idcd = a.istt_wrhs_idcd 									")
			.where("    where 1 = 1																								")
			.where("      and a.invc_date >= :invc_date1"    , arg.getParamText("invc_date1"))
			.where("      and a.invc_date <= :invc_date2"    , arg.getParamText("invc_date2"))
			.where("      and a.cstm_idcd  = :cstm_idcd1"    , arg.getParamText("cstm_idcd1"))
			.where("      and d.acct_bacd  = :acct_bacd"     , arg.getParamText("acct_bacd"))
			.where("      and a.find_name like %:find_name%	", arg.getParameter("find_name"))
			.where("      and a.istt_wrhs_idcd  = :istt_wrhs_idcd1" , arg.getParamText("istt_wrhs_idcd1"))
			.where("      and b.item_idcd  = :item_idcd1"			, arg.getParamText("item_idcd1"))
			.where("      and d.item_name  = :item_name1" 			, arg.getParamText("item_name1"))
			.where("      and a.line_stat  < 2																					")
			.where(")																											")
		;
		data.param
			.where(" select a.invc_date")
			.where("      , a.item_idcd")
			.where("      , a.item_code")
			.where("      , a.item_name")
			.where("      , a.item_spec")
			.where("      , a.cstm_name")
			.where("      , a.qntt")
			.where("      , a.pric")
			.where("      , a.sply_amnt")
			.where("      , a.vatx_amnt")
			.where("      , a.ttsm_amnt")
			.where("      , a.invc_date as crt_date")
			.where("      , 1 as rnum")
			.where("   from cte a")
		;
//		if(arg.getParamText("chk" ).contains("1")) {			//소계
//			data.param
//				.where(" union all")
//				.where(" select null as invc_date")
//				.where("      , a.item_idcd")
//				.where("      , null as item_code")
//				.where("      , '소계' as item_name")
//				.where("      , null as item_spec")
//				.where("      , null as cstm_name")
//				.where("      , sum(a.qntt) as qntt")
//				.where("      , null as pric")
//				.where("      , sum(a.sply_amnt) as sply_amnt")
//				.where("      , sum(a.vatx_amnt) as vatx_amnt")
//				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
//				.where("      , max(a.invc_date) as crt_date")
//				.where("      , 4 as rnum")
//				.where("   from cte a")
//				.where("  group by a.item_idcd")
//			;
//		}
		if(arg.getParamText("chk" ).contains("2")) {			//일계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , a.item_idcd")
				.where("      , null as item_code")
				.where("      , concat(a.item_name,' ','일계',' ' ,'-',' ',DATE_FORMAT(a.invc_date, '%Y-%m-%d')) as cstm_name")
				.where("      , null as item_spec")
				.where("      , null as cstm_name")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , max(a.invc_date) as crt_date")
				.where("      , 2 as rnum")
				.where("   from cte a")
				.where("  group by a.item_idcd , a.invc_date")
			;
		}
		if(arg.getParamText("chk" ).contains("3")) {			//월계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , a.item_idcd")
				.where("      , null as item_code")
				.where("      , '월계' as cstm_name")
				.where("      , null as item_spec")
				.where("      , null as cstm_name")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , max(a.invc_date) as crt_date")
				.where("      , 3 as rnum")
				.where("   from cte a")
				.where("  group by a.item_idcd, concat(substr(a.invc_date,1,6), '99')")
			;
		}
		if(arg.getParamText("chk" ).contains("4")) {			//합계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , max(a.item_idcd) as item_idcd")
				.where("      , null as item_code")
				.where("      , '합계' as item_name")
				.where("      , null as item_spec")
				.where("      , null as cstm_name")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , '99999999' as crt_date")
				.where("      , 5 as rnum")
				.where("   from cte a")
				.where("  group by '99999999'")
			;
		}
		data.param
			.where("     ) x ")
			.where(" order by x.item_idcd, x.crt_date, x.rnum ")
		;

		return  data.selectForMap();
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
	    .query("select x.*																									")
	    ;
		data.param
			.where("from (																										")
			.where("with cte as (																								")
			.where("   select a.invc_numb, a.invc_date, a.cstm_idcd, c.cstm_code, c.cstm_name									")
			.where("        , b.line_seqn, b.item_idcd, d.item_code, d.item_name, d.item_spec									")
			.where("        , b.istt_qntt as qntt, b.istt_pric as pric															")
			.where("        , b.istt_amnt as sply_amnt, b.istt_vatx as vatx_amnt, b.ttsm_amnt									")
			.where("        , a.istt_wrhs_idcd	,e.wrhs_name																	")
			.where("     from purc_istt_mast a																					")
			.where("          left outer join purc_istt_item b on b.invc_numb = a.invc_numb										")
			.where("          left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd											")
			.where("          left outer join item_mast d on d.item_idcd = b.item_idcd 											")
			.where("          left outer join wrhs_mast e on e.wrhs_idcd = a.istt_wrhs_idcd 									")
			.where("    where 1 = 1																								")
			.where("      and a.invc_date >= :invc_date1"    , arg.getParamText("invc_date1"))
			.where("      and a.invc_date <= :invc_date2"    , arg.getParamText("invc_date2"))
			.where("      and a.cstm_idcd  = :cstm_idcd1"    , arg.getParamText("cstm_idcd1"))
			.where("      and d.acct_bacd  = :acct_bacd"     , arg.getParamText("acct_bacd"))
			.where("      and a.find_name like %:find_name%	", arg.getParameter("find_name"))
			.where("      and a.istt_wrhs_idcd  = :istt_wrhs_idcd1" , arg.getParamText("istt_wrhs_idcd1"))
			.where("      and b.item_idcd  = :item_idcd1"			, arg.getParamText("item_idcd1"))
			.where("      and d.item_name  = :item_name1" 			, arg.getParamText("item_name1"))
			.where("      and a.line_stat  < 2																					")
			.where(")																											")
		;
		data.param
			.where(" select a.invc_date")
			.where("      , a.item_code")
			.where("      , a.item_name")
			.where("      , a.item_spec")
			.where("      , a.cstm_idcd")
			.where("      , a.cstm_code")
			.where("      , a.cstm_name")
			.where("      , a.qntt")
			.where("      , a.pric")
			.where("      , a.sply_amnt")
			.where("      , a.vatx_amnt")
			.where("      , a.ttsm_amnt")
			.where("      , a.invc_date as crt_date")
			.where("      , 1 as rnum")
			.where("   from cte a")
		;
//		if(arg.getParamText("chk" ).contains("1")) {			//소계
//			data.param
//				.where(" union all")
//				.where(" select null as invc_date")
//				.where("      , null as item_code")
//				.where("      , null as item_name")
//				.where("      , null as item_spec")
//				.where("      , a.cstm_idcd")
//				.where("      , null as cstm_code")
//				.where("      , '소계' as cstm_name")
//				.where("      , sum(a.qntt) as qntt")
//				.where("      , null as pric")
//				.where("      , sum(a.sply_amnt) as sply_amnt")
//				.where("      , sum(a.vatx_amnt) as vatx_amnt")
//				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
//				.where("      , max(a.invc_date) as crt_date")
//				.where("      , 4 as rnum")
//				.where("   from cte a")
//				.where("  group by a.cstm_idcd")
//			;
//		}
		if(arg.getParamText("chk" ).contains("2")) {			//일계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , null as item_code")
				.where("      , null as item_name")
				.where("      , null as item_spec")
				.where("      , a.cstm_idcd")
				.where("      , null as cstm_code")
				.where("      , concat(a.cstm_name,' ','일계',' ' ,'-',' ',DATE_FORMAT(a.invc_date, '%Y-%m-%d')) as cstm_name")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , max(a.invc_date) as crt_date")
				.where("      , 2 as rnum")
				.where("   from cte a")
				.where("  group by a.cstm_idcd , a.invc_date")
			;
		}
		if(arg.getParamText("chk" ).contains("3")) {			//월계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , null as item_code")
				.where("      , null as item_name")
				.where("      , null as item_spec")
				.where("      , a.cstm_idcd")
				.where("      , null as cstm_code")
				.where("      , '월계' as cstm_name")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , max(a.invc_date) as crt_date")
				.where("      , 3 as rnum")
				.where("   from cte a")
				.where("  group by a.cstm_idcd , concat(substr(a.invc_date,1,6), '99')	")
			;
		}
		if(arg.getParamText("chk" ).contains("4")) {			//합계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , null as item_code")
				.where("      , null as item_name")
				.where("      , null as item_spec")
				.where("      , max(a.cstm_idcd) as cstm_idcd")
				.where("      , null as cstm_code")
				.where("      , '합계' as cstm_name")
				.where("      , sum(a.qntt) as qntt")
				.where("      , null as pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , sum(a.ttsm_amnt) as ttsm_amnt")
				.where("      , '99999999' as crt_date")
				.where("      , 5 as rnum")
				.where("   from cte a")
				.where("  group by '99999999'")
			;
		}
		data.param
			.where("     ) x ")
			.where(" order by x.cstm_idcd, x.crt_date, x.rnum ")
		;

		return  data.selectForMap();
	}
}
