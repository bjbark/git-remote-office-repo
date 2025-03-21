package com.sky.system.custom.sjflv.eis.sjdashboard;

import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;

import net.sf.json.JSONObject;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service("sjflv.SjDashBoardService")
public class SjDashBoardService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		/*
		  post로 호출시 /test/testusermast/set/test2.do 참고
		  FRX.KRWJPY 일본(엔)
		  FRX.KRWUSD 미국(달러)
		  FRX.KRWCNY 중국(위안)
		  FRX.KRWEUR 유럽(유로)
		*/

		String authKey = "O7QTDlHSJfZKOUHmG1So11gOtjXPSGCR";
		String searchDate = new SimpleDateFormat("yyyyMMdd").format(new Date());
		String dataType = "AP01";

		String FRX = "FRX.KRWUSD";
		if(!arg.getParamText("FRX").equals("")){
			FRX = arg.getParamText("FRX");
		}
//		String doc = Jsoup.connect("https://quotation-api-cdn.dunamu.com/v1/forex/recent?")
//				.data("codes",FRX)
//				.timeout(500)
//				.userAgent("Mozilla")
//				.ignoreContentType(true)
//				.execute().body(
//		);
		String doc = Jsoup.connect("https://www.koreaexim.go.kr/site/program/financial/exchangeJSON")
				.data("codes",FRX)
				.data("authkey", authKey)
				.data("searchdate", searchDate)
				.data("data", "AP01")
				.data("cur_unit", "USD")
				.timeout(5000)
				.userAgent("Mozilla")
				.ignoreContentType(true)
				.execute().body(
		);

		SqlResultMap map = new SqlResultMap();
		SqlResultRow row = new SqlResultRow();

		System.out.println(doc.replaceAll("[\\[\\[\\]]", ""));

		JsonParser parse = new JsonParser();
		Object obj = parse.parse(doc.replaceAll("[\\[\\[\\]]", ""));
		JsonObject json = (JsonObject)obj;
		row.setParameter("basePrice",json.get("deal_bas_r"));

		map.add(row);
		return map;
	}

	public SqlResultMap getOrder(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.*																												")
		;
		data.param
			.where("from(																													")
			.where("    select																												")
			.where("    	'건수' as dvcd																									")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(now(),'%Y%m%d'), 1, 0)),0) as 'today'									")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 1 day),'%Y%m%d'), 1, 0)),0) as '1day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 2 day),'%Y%m%d'), 1, 0)),0) as '2day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 3 day),'%Y%m%d'), 1, 0)),0) as '3day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 4 day),'%Y%m%d'), 1, 0)),0) as '4day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 5 day),'%Y%m%d'), 1, 0)),0) as '5day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date between DATE_FORMAT(date_sub(now(), interval 1 week),'%Y%m%d') and DATE_FORMAT(now(),'%Y%m%d'), 1, 0)),0) as 'weak_ago'")
			.where("    from acpt_mast a																									")
			.where("    where a.line_stat < 2																								")
			.where("    and   a.invc_date between DATE_FORMAT(date_sub(now(), interval 1 week),'%Y%m%d') and DATE_FORMAT(now(),'%Y%m%d')	")
			.where("    and   json_value(a.json_data, '$**.prod_trst_dvcd') <> '2000' 														")
			.where("    union all																											")
			.where("    select																												")
			.where("    	'수량' as dvcd																									")
			.where("     , ifnull(sum(if(b.invc_date = DATE_FORMAT(now(),'%Y%m%d'), a.invc_qntt, 0)),0) as 'today'")
			.where("     , ifnull(sum(if(b.invc_date = DATE_FORMAT(date_sub(now(), interval 1 day),'%Y%m%d'), a.invc_qntt, 0)),0) as '1day_ago'")
			.where("     , ifnull(sum(if(b.invc_date = DATE_FORMAT(date_sub(now(), interval 2 day),'%Y%m%d'), a.invc_qntt, 0)),0) as '2day_ago'")
			.where("     , ifnull(sum(if(b.invc_date = DATE_FORMAT(date_sub(now(), interval 3 day),'%Y%m%d'), a.invc_qntt, 0)),0) as '3day_ago'")
			.where("     , ifnull(sum(if(b.invc_date = DATE_FORMAT(date_sub(now(), interval 4 day),'%Y%m%d'), a.invc_qntt, 0)),0) as '4day_ago'")
			.where("     , ifnull(sum(if(b.invc_date = DATE_FORMAT(date_sub(now(), interval 5 day),'%Y%m%d'), a.invc_qntt, 0)),0) as '5day_ago'")
			.where("     , ifnull(sum(if(b.invc_date between DATE_FORMAT(date_sub(now(), interval 1 week),'%Y%m%d') and DATE_FORMAT(now(),'%Y%m%d'),  a.invc_qntt, 0)),0) as 'weak_ago'")
			.where("    from acpt_item a																									")
			.where("    left outer join acpt_mast b on a.invc_numb = b.invc_numb															")
			.where("    where b.line_stat < 2																								")
			.where("    and   b.invc_date between DATE_FORMAT(date_sub(now(), interval 1 week),'%Y%m%d') and DATE_FORMAT(now(),'%Y%m%d')	")
			.where("    and   json_value(b.json_data, '$**.prod_trst_dvcd') <> '2000' 														")
			.where("    union all																											")
			.where("    select																												")
			.where("    	'생산' as dvcd																									")
			.where("     , ifnull(sum(if(m.invc_date = DATE_FORMAT(now(),'%Y%m%d'), 1, 0)),0) as 'today'									")
			.where("     , ifnull(sum(if(m.invc_date = DATE_FORMAT(date_sub(now(), interval 1 day),'%Y%m%d'), 1, 0)),0) as '1day_ago'		")
			.where("     , ifnull(sum(if(m.invc_date = DATE_FORMAT(date_sub(now(), interval 2 day),'%Y%m%d'), 1, 0)),0) as '2day_ago'		")
			.where("     , ifnull(sum(if(m.invc_date = DATE_FORMAT(date_sub(now(), interval 3 day),'%Y%m%d'), 1, 0)),0) as '3day_ago'		")
			.where("     , ifnull(sum(if(m.invc_date = DATE_FORMAT(date_sub(now(), interval 4 day),'%Y%m%d'), 1, 0)),0) as '4day_ago'		")
			.where("     , ifnull(sum(if(m.invc_date = DATE_FORMAT(date_sub(now(), interval 5 day),'%Y%m%d'), 1, 0)),0) as '5day_ago'		")
			.where("     , ifnull(sum(if(m.invc_date between DATE_FORMAT(date_sub(now(), interval 1 week),'%Y%m%d') and DATE_FORMAT(now(),'%Y%m%d'), 1, 0)),0) as 'weak_ago'")
			.where("    from acpt_item a																									")
			.where("    left outer join acpt_mast m on a.invc_numb = m.invc_numb															")
			.where("    left outer join tbi_job_order_prod_list b  on a.invc_numb = b.order_no and a.item_idcd = b.prod_cd					")
			.where("    where m.line_stat < 2																								")
			.where("    and   m.invc_date between DATE_FORMAT(date_sub(now(), interval 1 week),'%Y%m%d') and DATE_FORMAT(now(),'%Y%m%d')	")
			.where("    and   b.order_no is not null																						")
			.where("    union all																											")
			.where("    select																												")
			.where("    	'출고' as dvcd																									")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(now(),'%Y%m%d'), 1, 0)),0) as 'today'									")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 1 day),'%Y%m%d'), 1, 0)),0) as '1day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 2 day),'%Y%m%d'), 1, 0)),0) as '2day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 3 day),'%Y%m%d'), 1, 0)),0) as '3day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 4 day),'%Y%m%d'), 1, 0)),0) as '4day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date = DATE_FORMAT(date_sub(now(), interval 5 day),'%Y%m%d'), 1, 0)),0) as '5day_ago'		")
			.where("     , ifnull(sum(if(a.invc_date between DATE_FORMAT(date_sub(now(), interval 1 week),'%Y%m%d') and DATE_FORMAT(now(),'%Y%m%d'), 1, 0)),0) as 'weak_ago'")
			.where("    from acpt_mast a																									")
			.where("    where a.line_stat < 2																								")
			.where("    and   a.invc_date between DATE_FORMAT(date_sub(now(), interval 1 week),'%Y%m%d') and DATE_FORMAT(now(),'%Y%m%d') 	")
			.where("    and   a.acpt_stat_dvcd = '0600'")
			.where(") a")
		;
		return data.selectForMap();
	}
	public SqlResultMap getOrder_New(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select     if(substr(a.crte_dttm,1,8) = DATE_FORMAT(now(),'%Y%m%d'),'신규','변경') as dvcd			")
			.query("		 , c.cstm_name        , i.item_name       , i.item_spec									")
			.query("		 , a.invc_qntt        , a.deli_date       , u.user_name									")
			.query("		 , e.dely_cstm_name   , b.invc_date														")
		;
		data.param
			.where("from acpt_item a 																				")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb										")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join user_mast u on b.drtr_idcd = u.user_idcd										")
			.where("left outer join cstm_deli e on b.cstm_idcd = e.cstm_idcd and b.dlvy_cstm_idcd = e.dlvy_cstm_idcd")
			.where("where b.invc_date = DATE_FORMAT(now(),'%Y%m%d')													")
			.where("and   b.line_stat < 2																			")
			.where("and   b.acpt_stat_dvcd <> '0600'																")
			.where("and   json_value(b.json_data, '$**.prod_trst_dvcd') <> '2000' 									")
		;
		return data.selectForMap();
	}
	public SqlResultMap getOrder_Deli(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select     c.cstm_name        , i.item_name       , i.item_spec									")
			.query("		 , a.invc_qntt        , a.deli_date       , u.user_name									")
			.query("		 , ifnull(sum(s.ostt_qntt),0) as ostt_qntt												")
		;
		data.param
			.where("from acpt_item a 																				")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb										")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join user_mast u on b.drtr_idcd = u.user_idcd										")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn		")
			.where("where a.deli_date < DATE_FORMAT(now(),'%Y%m%d')													")
			.where("and   b.line_stat < 2																			")
			.where("and   b.acpt_stat_dvcd <> '0600'																")
			.where("group by a.invc_numb,a.line_seqn																")
			.where("having (a.invc_qntt - ostt_qntt > 0)															")
		;
		return data.selectForMap();
	}

	// 제품 안전재고 가져오기
	public SqlResultMap getProd(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select *																						")
		.query("  from (																						")
		.query("    select a.item_code, a.item_name, a.item_spec, a.safe_stok, sum(b.stok_qntt) as stok_qntt	")
		.query("         , u.unit_name																			")
		.query("      from item_mast a																			")
		.query("           left outer join lot_isos_sum b on a.item_idcd = b.item_idcd							")
		.query("           left outer join unit_mast u on u.unit_idcd = a.unit_idcd								")
		.query("     where substr(a.acct_bacd, 1, 1) != '1'														")
		.query("       and a.acct_bacd != '2003'																")
		.query("       and a.stok_mngt_yorn = '1' 																")
		.query("       and a.safe_stok > 0																		")
		.query("       and b.stok_qntt > 0 																		")
		.query("     group by a.item_idcd																		")
		.query("   ) s																							")
		.query(" where  s.safe_stok > s.stok_qntt																")
		.query(" order by s.item_code																			")
	;
		;
		return data.selectForMap();
	}

	// 제품 유통기한 임박 - 품목에 유통기한이 설정된 품목을 대상으로 한다. 구매,기타입고 시 유통기한이 없으면 품목의 유통기한을 사용한다.
	public SqlResultMap getProd2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("with item as (																										")
			.query("      select a.lott_numb, a.istt_date, a.stok_qntt, a.item_idcd														")
			.query("           , b.item_code, b.item_name, b.item_spec, b.rtil_ddln_dcnt												")
			.query("      from   lot_isos_sum a 																						")
			.query("             left outer join item_mast b on b.item_idcd = a.item_idcd												")
			.query("      where  substr(b.acct_bacd, 1, 1) <> '1'																		")
			.query("      and    b.acct_bacd != '2003' 																					")
			.query("      and    a.stok_qntt > 0 																						")
			.query("      and    b.rtil_ddln_dcnt > 0																					")
			.query(" ), istt as (  																										")
			.query("      select a.item_idcd, a.lott_numb, date_add(b.invc_date, interval a.rtil_ddln_dcnt month) as rtil_ddln_date, b.qntt as istt_qntt	") //생산입고
			.query("      from   item a																									")
			.query("             left outer join isos_book b on b.item_idcd = a.item_idcd and b.lott_numb = a.lott_numb					")
			.query("      where  b.invc_dvcd = '1200'																					")
			.query("      and    b.line_stat = '0'																						")
			.query("      and    a.istt_date = b.invc_date 																				")
			.query("      and    a.item_idcd = b.item_idcd																				")
			.query("      and    a.lott_numb = b.lott_numb																				")
			.query("      union all																										")
			.query("      select a.item_idcd, a.lott_numb																				") //구매입고
			.query("           , case when json_value(b.json_data, '$**.rtil_ddln_date') is null then									")
			.query("                            date_add(b.make_date, interval a.rtil_ddln_dcnt month)									")
			.query("                       else json_value(b.json_data, '$**.rtil_ddln_date')  											")
			.query("             end rtil_ddln_date																						")
			.query("           , b.istt_qntt																							")
			.query("      from   item a																									")
			.query("             left outer join purc_istt_item b on b.item_idcd = a.item_idcd and b.lott_numb = a.lott_numb			")
			.query("             left outer join purc_istt_mast c on c.invc_numb = b.invc_numb											")
			.query("      where  a.istt_date = c.invc_date																				")
			.query("      and    a.item_idcd = b.item_idcd																				")
			.query("      and    a.lott_numb = b.lott_numb																				")
			.query("      and    c.line_stat = '0'																						")
			.query("      union all																										")
			.query("      select a.item_idcd, a.lott_numb																				") //기타입고
			.query("           , case when json_value(b.json_data, '$**.rtil_ddln_date') is null then									")
			.query("                            date_add(json_value(b.json_data, '$**.make_date'), interval a.rtil_ddln_dcnt month)		")
			.query("                       else json_value(b.json_data, '$**.rtil_ddln_date')  											")
			.query("             end rtil_ddln_date																						")
			.query("           , b.istt_qntt																							")
			.query("      from   item a																									")
			.query("             left outer join etit_item b on b.item_idcd = a.item_idcd and b.lott_numb = a.lott_numb					")
			.query("             left outer join etit_mast c on c.invc_numb = b.invc_numb												")
			.query("      where  a.istt_date = c.invc_date																				")
			.query("      and    a.item_idcd = b.item_idcd																				")
			.query("      and    a.lott_numb = b.lott_numb																				")
			.query("      and    c.line_stat = '0'																						")
			.query(")																													")
			.query("select a.item_code, a.item_name, a.item_spec, a.lott_numb, a.istt_date, a.stok_qntt 								")
			.query("     , b.rtil_ddln_date, b.istt_qntt																				")
			.query("from   item a																										")
			.query("       left outer join istt b on b.item_idcd = a.item_idcd and b.lott_numb = a.lott_numb							")
			.query("where  b.rtil_ddln_date is not null																					")
			.query("and    datediff(b.rtil_ddln_date, now()) <= :rtil_ddln_date	" , arg.getParamText("rtil_ddln_date" ))
		;
		return data.selectForMap();
	}

	// 원재료 안전재고 가져오기
	public SqlResultMap getMtrl1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																						")
			.query("  from (																						")
			.query("    select a.item_code, a.item_name, a.item_spec, a.safe_stok, sum(b.stok_qntt) as stok_qntt	")
			.query("         , u.unit_name																			")
			.query("      from item_mast a																			")
			.query("           left outer join lot_isos_sum b on a.item_idcd = b.item_idcd							")
			.query("           left outer join unit_mast u on u.unit_idcd = a.unit_idcd								")
			.query("     where substr(a.acct_bacd, 1, 1) = '1'														")
			.query("       and a.stok_mngt_yorn = '1' 																")
			.query("       and a.safe_stok > 0																		")
			.query("       and b.stok_qntt > 0 																		")
			.query("     group by a.item_idcd																		")
			.query("   ) s																							")
			.query(" where  s.safe_stok > s.stok_qntt																")
			.query(" order by s.item_code																			")
		;
		return data.selectForMap();
	}

	// 원재료 유통기한 임박 - 입고접수 시 유통기한이 없는 건은 제외함.
	public SqlResultMap getMtrl2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("with item as (																										")
			.query("     select a.lott_numb, a.istt_date, a.stok_qntt, a.item_idcd														")
			.query("          , b.item_code, b.item_name, b.item_spec																	")
			.query("     from   lot_isos_sum a 																							")
			.query("            left outer join item_mast b on b.item_idcd = a.item_idcd												")
			.query("     where  substr(b.acct_bacd, 1, 1) = '1'																			")
			.query("     and    a.stok_qntt > 0 																						")
			.query("), istt as (  																										")
			.query("     select a.item_idcd, a.lott_numb																				") // 구매입고
			.query("          , json_value(b.json_data, '$**.rtil_ddln_date') as rtil_ddln_date											")
			.query("          , b.istt_qntt																								")
			.query("     from   item a																									")
			.query("            left outer join purc_istt_item b on b.item_idcd = a.item_idcd and b.lott_numb = a.lott_numb				")
			.query("            left outer join purc_istt_mast c on c.invc_numb = b.invc_numb											")
			.query("     where  a.lott_numb = b.lott_numb																				")
			.query("     and    a.item_idcd = b.item_idcd																				")
			.query("     and    a.istt_date = c.invc_date																				")
			.query("     and    c.line_stat = '0'																						")
			.query("     union all																										")
			.query("     select a.item_idcd, a.lott_numb																				") // 기타입고
			.query("          , json_value(b.json_data, '$**.rtil_ddln_date') as rtil_ddln_date											")
			.query("          , b.istt_qntt																								")
			.query("     from   item a																									")
			.query("            left outer join etit_item b on b.item_idcd = a.item_idcd and b.lott_numb = a.lott_numb					")
			.query("            left outer join etit_mast c on c.invc_numb = b.invc_numb												")
			.query("     where  a.lott_numb = b.lott_numb																				")
			.query("     and    a.item_idcd = b.item_idcd																				")
			.query("     and    a.istt_date = c.invc_date																				")
			.query("     and    c.line_stat = '0'																						")
			.query(")																													")
			.query("select a.item_code, a.item_name, a.item_spec, a.lott_numb, a.istt_date, a.stok_qntt 								")
			.query("     , b.rtil_ddln_date, b.istt_qntt																				")
			.query("from   item a																										")
			.query("       left outer join istt b on b.item_idcd = a.item_idcd and b.lott_numb = a.lott_numb							")
			.query("where  b.rtil_ddln_date is not null																					")
			.query("and    datediff(b.rtil_ddln_date, now()) <= :rtil_ddln_date	" , arg.getParamText("rtil_ddln_date" ))
		;
		return data.selectForMap();
	}

	public SqlResultMap getMtrl3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select     a.invc_numb        , a.amnd_degr        , a.line_seqn        , a.item_idcd						")
			.query("         , i.item_code        , i.item_name        , i.item_spec        , u.unit_name						")
			.query("         , i.istt_wrhs_idcd   , null as zone_idcd  , c.cstm_code        , a.offr_qntt						")
			.query("         , b.cstm_idcd        , b.drtr_idcd        , c.cstm_name        , i.rcpt_insp_yorn					")
			.query("         , b.supl_dvcd        , a.deli_date        , ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0) as qntt	")
		;
		data.param
			.where("from purc_ordr_item a 																						")
			.where("left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb												")
			.where("left outer join cstm_mast c on b.cstm_idcd      = c.cstm_idcd												")
			.where("left outer join item_mast i on a.item_idcd      = i.item_idcd												")
			.where("left outer join unit_mast u on i.unit_idcd      = u.unit_idcd												")
			.where("where 1=1																									")
			.where("and   json_value(b.json_data,'$.apvl_yorn') = 1																")
			.where("and   ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0)>0															")
			.where("and   b.line_stat   < 2																						")
			.where("order by a.invc_numb,a.line_seqn																			")
		;
		return data.selectForMap();
	}

	public SqlResultMap getMtrl4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*")
			.where("from (																					")
			.where("     select																				")
			.where("            a.invc_numb																	")
			.where("          , a.cstm_idcd      , '구매' as dvcd    , a.remk_text							")
			.where("          , b.istt_qntt      , b.lott_numb     , b.make_date							")
			.where("          , c.cstm_code      , c.cstm_name												")
			.where("          , (select base_name from base_mast r where json_value(b.json_data,'$.make_natn') = r.base_code and r.prnt_idcd = '3300') as make_natn		")
			.where("          , i.item_idcd      , i.item_code      , i.item_name      , i.item_spec		")
			.where("          , un.unit_name																")
			.where("          , json_value(b.json_data,'$.rtil_ddln_date') as rtil_ddln_date				")
			.where("     from purc_istt_item b																")
			.where("     left outer join purc_istt_mast a on a.invc_numb      = b.invc_numb					")
			.where("     left outer join cstm_mast c      on b.cstm_idcd      = c.cstm_idcd					")
			.where("     left outer join item_mast i      on b.item_idcd      = i.item_idcd					")
			.where("     left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd				")
			.where("     where   1=1																		")
			.where("     and     a.invc_date   = :invc_date      " , arg.getParamText("invc_date" ))
			.where("     and     b.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
//			.where("     order by a.invc_date desc,a.cstm_idcd,a.invc_numb limit 9999999999999				")
			.where("     union all																			")
			.where("     select																				")
			.where("            a.invc_numb																	")
			.where("          , a.cstm_idcd      , '기타' as dvcd												")
			.where("          , (select group_concat(im.item_name separator ' / ')							")
			.where("               from etit_item ei left outer join item_mast im on ei.item_idcd = im.item_idcd	")
			.where("               where ei.invc_numb = a.invc_numb) as remk_text							")
			.where("          , b.istt_qntt      , b.lott_numb												")
			.where("          , date_format(json_value(b.json_data, '$.make_date'), '%Y%m%d') as make_date	")
			.where("          , c.cstm_code      , c.cstm_name												")
			.where("          , cast(replace(json_extract(b.json_data, '$.make_natn'),'','') as char) as make_natn	")
			.where("          , i.item_idcd      , i.item_code      , i.item_name      , i.item_spec		")
			.where("          , u.unit_name																	")
			.where("          , date_format(json_value(b.json_data, '$.rtil_ddln_date'), '%Y%m%d') as rtil_ddln_date")
			.where("     from etit_mast a																	")
			.where("     left outer join etit_item b    on a.invc_numb      = b.invc_numb					")
			.where("     left outer join cstm_mast c    on a.cstm_idcd      = c.cstm_idcd					")
			.where("     left outer join item_mast i    on b.item_idcd      = i.item_idcd					")
			.where("     left outer join unit_mast u    on b.unit_idcd      = u.unit_idcd					")
			.where("     where   1=1																		")
			.where("     and     a.invc_date   = :invc_date1     " , arg.getParamText("invc_date" ))
			.where("     and     b.line_stat   < :line_stat2     " , "2" , "".equals(arg.getParamText("line_stat" )))
//			.where("     order by a.invc_date desc,a.cstm_idcd,a.invc_numb limit 9999999999999				")
			.where(") a																						")
			.where(" order by a.cstm_idcd , a.invc_numb														")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}
}
