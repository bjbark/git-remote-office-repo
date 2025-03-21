package com.sky.system.custom.iypkg.sale.sale.dailysalelist;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service("iypkg.DailySaleListService")
public class DailySaleListService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	/**
	 * 일자별 매출현황
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";

		ParamToJson trans = new ParamToJson();
		result = trans.TranslateAll(arg);

		data.param
			.query("call sale_daily_list (			")
			.query("   :param				",result)
			.query(")								")
		;
		return data.selectForMap() ;

	}

	/**
	 * 거래처별 매출현황
	 */
	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc_date1,invc_date2,cstm_idcd,chk,ck1,ck2,ck3,prod_idcd,type,find_name");

		data.param // 집계문  입력
			.query("call sale_list_cstm (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;
	}

	/**
	 * 담당자별 매출현황
	 */

	public SqlResultMap getList3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc_date1,invc_date2,drtr_idcd,chk,ck1,ck2,ck3,prod_idcd,type,find_name");

		data.param // 집계문  입력
			.query("call sale_list_drtr  (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;
	}

	/**
	 * 품목별 매출현황
	 */
	public SqlResultMap getList4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc_date1,invc_date2,cstm_idcd,chk,ck1,ck2,ck3,prod_idcd,type,find_name");

		data.param // 집계문  입력
			.query("call sale_list_item (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;
	}

	// 원단매입일보 조회
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort, int start) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select * 																						")
		;
		data.param
			.where("from (																							")
			.where("with temp_daily_list as (																		")
			.where("    select   a.invc_numb																		")
			.where("           , s.line_seqn																		")
			.where("           , a.cstm_idcd																		")
			.where("           , c.cstm_name																		")
			.where("           , s.acpt_numb																		")
			.where("           , p.prod_name																		")
			.where("           , p.prod_leng																		")
			.where("           , p.prod_widh																		")
			.where("           , p.prod_hght																		")
			.where("           , concat(p.prod_leng,'*', p.prod_widh, '*', p.prod_hght) as prod_spec				")
			.where("           , concat(b.bxty_leng,'*', b.bxty_widh, '*', b.bxty_hght) as bxty_spec				")
			.where("           , a.invc_date as ostt_date															")
			.where("           , a.invc_date as crt_date															")
			.where("           , a.invc_date																		")
			.where("           , s.ostt_qntt																		")
			.where("           , si.istt_amnt																		")
			.where("           , s.sale_pric																		")
			.where("           , s.item_idcd																		")
			.where("           , p.prod_code																		")
			.where("           , a.ostt_dvcd																		")
			.where("           , ai.pcod_numb																		")
			.where("           , s.sale_amnt																		")
			.where("           , s.vatx_amnt																		")
			.where("           , s.ttsm_amnt																		")
			.where("           , s.user_memo																		")
			.where("from sale_ostt_item s																			")
			.where("left outer join sale_ostt_mast a on a.invc_numb = s.invc_numb									")
			.where("left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join product_mast   p on s.item_idcd = p.prod_idcd									")
			.where("left outer join boxtype_mast   b on b.bxty_idcd = b.bxty_idcd									")
			.where("left outer join ( select sum(a.istt_amnt) as istt_amnt, c.invc_numb								")
			.where("                  from purc_istt_item a															")
			.where("                  left outer join purc_istt_mast a2 on a.invc_numb = a2.invc_numb				")
			.where("                  left outer join purc_ordr_item b  on a.orig_invc_numb = b.invc_numb and a.orig_seqn = b.line_seqn      	")
			.where("                  left outer join purc_ordr_mast b2 on b.invc_numb = b2.invc_numb				")
			.where("                  left outer join boxx_acpt      c  on b.orig_invc_numb = c.invc_numb			")
			.where("                  where c.line_stat  < 2														")
			.where("                  and   a2.line_stat < 2														")
			.where("                  and   b2.line_stat < 2														")
			.where("                  group by c.invc_numb) si on s.acpt_numb = si.invc_numb						")
			.where("left outer join boxx_acpt     ai on s.acpt_numb = ai.invc_numb									")
			.where("where 1=1																						")
			.where("and    s.find_name like %:find_name%     " , arg.getParamText("find_name"))
			.where("and    a.invc_date >= :invc_date1        " , arg.getParameter("invc_date1"))
			.where("and    a.invc_date <= :invc_date2        " , arg.getParameter("invc_date2"))
			.where("and    a.cstm_idcd  = :cstm_idcd         " , arg.getParameter("cstm_idcd"))
			.where(")																								")
			.where("select  a.invc_numb																				")
			.where("      , a.line_seqn																				")
			.where("      , a.cstm_idcd																				")
			.where("      , a.cstm_name																				")
			.where("      , a.acpt_numb																				")
			.where("      , a.prod_name																				")
			.where("      , a.prod_leng																				")
			.where("      , a.prod_widh																				")
			.where("      , a.prod_hght																				")
			.where("      , a.prod_spec																				")
			.where("      , a.bxty_spec																				")
			.where("      , a.ostt_date																				")
			.where("      , a.ostt_date as crt_date																	")
			.where("      , a.ostt_qntt																				")
			.where("      , a.sale_pric																				")
			.where("      , a.item_idcd																				")
			.where("      , a.prod_code																				")
			.where("      , a.ostt_dvcd																				")
			.where("      , a.pcod_numb																				")
			.where("      , a.sale_amnt																				")
			.where("      , a.vatx_amnt																				")
			.where("      , a.ttsm_amnt																				")
			.where("      , a.user_memo																				")
			.where("      , 1 as rnum																				")
			.where("      , count(*) as cnt																			")
			.where("      , a.invc_date as crt_date2																")
			.where("from temp_daily_list a																			")
		;
		if(arg.getParamText("chk").contains("0")){
			data.param
				.where("union all																					")
				.where("select  null as invc_numb																	")
				.where("      , null as line_seqn																	")
				.where("      , a.cstm_idcd as cstm_idcd															")
				.where("      , '소계' as cstm_name																	")
				.where("      , null as acpt_numb																	")
				.where("      , a.cstm_name as cstm_name															")
				.where("      , null as prod_leng																	")
				.where("      , null as prod_widh																	")
				.where("      , null as prod_hght																	")
				.where("      , null as prod_spec																	")
				.where("      , null as bxty_spec																	")
				.where("      , a.ostt_date as ostt_date															")
				.where("      , a.ostt_date as crt_date																")
				.where("      , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt												")
				.where("      , null as sale_pric																	")
				.where("      , null as item_idcd																	")
				.where("      , null as prod_code																	")
				.where("      , a.ostt_dvcd																			")
				.where("      , null as pcod_numb																	")
				.where("      , sum(ifnull(a.sale_amnt,0)) as sale_amnt												")
				.where("      , sum(ifnull(a.vatx_amnt,0)) as vatx_amnt												")
				.where("      , sum(ifnull(a.ttsm_amnt,0)) as ttsm_amnt												")
				.where("      , null as user_memo																	")
				.where("      , 2 as rnum																			")
				.where("      , count(*) as cnt																		")
				.where("      , max(ifnull(a.invc_numb,0)) as crt_date2												")
				.where("from temp_daily_list a																		")
				.where("where 1=1																					")
				.where("group by a.ostt_date, a.cstm_idcd															")
				.where("having cnt > 1																				")
			;
		}
		if(arg.getParamText("chk").contains("1")){
			data.param
				.where("union all																					")
				.where("select  null as invc_numb																	")
				.where("      , null as line_seqn																	")
				.where("      , 'xxxxxx' as cstm_idcd																")
				.where("      , '일계' as cstm_name																	")
				.where("      , null as acpt_numb																	")
				.where("      , a.cstm_name as cstm_name															")
				.where("      , null as prod_leng																	")
				.where("      , null as prod_widh																	")
				.where("      , null as prod_hght																	")
				.where("      , null as prod_spec																	")
				.where("      , null as bxty_spec																	")
				.where("      , a.ostt_date as ostt_date															")
				.where("      , a.ostt_date as crt_date																")
				.where("      , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt												")
				.where("      , null as sale_pric																	")
				.where("      , null as item_idcd																	")
				.where("      , null as prod_code																	")
				.where("      , a.ostt_dvcd																			")
				.where("      , null as pcod_numb																	")
				.where("      , sum(ifnull(a.sale_amnt,0)) as sale_amnt												")
				.where("      , sum(ifnull(a.vatx_amnt,0)) as vatx_amnt												")
				.where("      , sum(ifnull(a.ttsm_amnt,0)) as ttsm_amnt												")
				.where("      , null as user_memo																	")
				.where("      , 3 as rnum																			")
				.where("      , count(*) as cnt																		")
				.where("      , max(ifnull(a.invc_numb,0)) as crt_date2												")
				.where("from temp_daily_list a																		")
				.where("where 1=1																					")
				.where("group by a.ostt_dvcd, a.ostt_date															")
			;
		}
		if(arg.getParamText("chk").contains("2")){
			data.param
				.where("union all																					")
				.where("select  null as invc_numb																	")
				.where("      , null as line_seqn																	")
				.where("      , null as cstm_idcd																	")
				.where("      , '월계' as cstm_name																	")
				.where("      , null as acpt_numb																	")
				.where("      , a.cstm_name as cstm_name															")
				.where("      , null as prod_leng																	")
				.where("      , null as prod_widh																	")
				.where("      , null as prod_hght																	")
				.where("      , null as prod_spec																	")
				.where("      , null as bxty_spec																	")
				.where("      , substr(a.ostt_date,1,6) as ostt_date												")
				.where("      , concat(substr(a.ostt_date,1,6),'99') as crt_date									")
				.where("      , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt												")
				.where("      , null as sale_pric																	")
				.where("      , null as item_idcd																	")
				.where("      , null as prod_code																	")
				.where("      , a.ostt_dvcd																			")
				.where("      , null as pcod_numb																	")
				.where("      , sum(ifnull(a.sale_amnt,0)) as sale_amnt												")
				.where("      , sum(ifnull(a.vatx_amnt,0)) as vatx_amnt												")
				.where("      , sum(ifnull(a.ttsm_amnt,0)) as ttsm_amnt												")
				.where("      , null as user_memo																	")
				.where("      , 4 as rnum																			")
				.where("      , count(*) as cnt																		")
				.where("      , max(ifnull(a.invc_numb,0)+99) as crt_date2											")
				.where("from temp_daily_list a																		")
				.where("where 1=1																					")
				.where("group by a.ostt_dvcd, concat(substr(a.ostt_date,1,6), '99')									")
			;
		}
		if(arg.getParamText("chk").contains("3")){
			data.param
				.where("union all																					")
				.where("select  null as invc_numb																	")
				.where("      , null as line_seqn																	")
				.where("      , null as cstm_idcd																	")
				.where("      , '합계' as cstm_name																	")
				.where("      , null as acpt_numb																	")
				.where("      , null as cstm_name																	")
				.where("      , null as prod_leng																	")
				.where("      , null as prod_widh																	")
				.where("      , null as prod_hght																	")
				.where("      , null as prod_spec																	")
				.where("      , null as bxty_spec																	")
				.where("      , null as ostt_date																	")
				.where("      , '9999999999'  as crt_date															")
				.where("      , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt												")
				.where("      , null as sale_pric																	")
				.where("      , null as item_idcd																	")
				.where("      , null as prod_code																	")
				.where("      , null as ostt_dvcd																	")
				.where("      , null as pcod_numb																	")
				.where("      , sum(ifnull(a.sale_amnt,0)) as sale_amnt												")
				.where("      , sum(ifnull(a.vatx_amnt,0)) as vatx_amnt												")
				.where("      , sum(ifnull(a.ttsm_amnt,0)) as ttsm_amnt												")
				.where("      , null as user_memo																	")
				.where("      , 5 as rnum																			")
				.where("      , count(*) as cnt																		")
				.where("      , max(ifnull(a.invc_numb,0)+99) as crt_date2											")
				.where("from temp_daily_list a																		")
				.where("where 1=1																					")
				.where("group by  '9999999999'																		")
			;
		}

		data.param
			.where("order by crt_date2, cstm_idcd, rnum limit 9999999												")
			.where(") a																								")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}
}
