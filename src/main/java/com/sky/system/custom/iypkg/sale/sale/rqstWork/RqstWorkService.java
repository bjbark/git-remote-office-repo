package com.sky.system.custom.iypkg.sale.sale.rqstWork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class RqstWorkService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize													")
		;
		data.param
			.query("select  a.*																		")
		;
		data.param
			.where("from (																			")
			.where("with cte as (																	")
			.where("    select a.invc_numb															")
			.where("          , s.line_seqn															")
			.where("  		    , a.cstm_idcd														")
			.where("          , c.cstm_name															")
			.where("          , s.acpt_numb															")
			.where("          , p.prod_name															")
			.where("          , p.prod_leng															")
			.where("          , p.prod_widh															")
			.where("          , p.prod_hght															")
			.where("          , a.invc_date as sale_date											")
			.where("          , a.invc_date as crt_date												")
			.where("          , s.sale_qntt															")
			.where("          , si.ostt_qntt														")
			.where("          , s.sale_pric															")
			.where("          , s.item_idcd															")
			.where("          , p.prod_code															")
			.where("          , a.ostt_dvcd															")
			.where("          , ai.pcod_numb														")
			.where("          , s.sale_amnt															")
			.where("          , s.vatx_amnt															")
			.where("          , s.ttsm_amnt															")
			.where("          , s.user_memo															")
			.where("          , s.porm_qntt															")
			.where("     from sale_item s															")
			.where("     left outer join sale_mast      a on a.invc_numb = s.invc_numb				")
			.where("     left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd				")
			.where("     left outer join product_mast   p on s.item_idcd = p.prod_idcd				")
			.where("     left outer join (select a.invc_numb , a.line_seqn							")
			.where("                           , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt			")
			.where("                           , sum(ifnull(a.sale_amnt,0)) as sale_amn				")
			.where("                           , sum(ifnull(a.vatx_amnt,0)) as vatx_amn				")
			.where("                           , sum(ifnull(a.ttsm_amnt,0)) as ttsm_amn				")
			.where("                      from sale_ostt_item a										")
			.where("                      left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb")
			.where("                      where b.line_stat < 2										")
			.where("                      group by a.invc_numb , a.line_seqn ) si on s.orig_invc_numb = si.invc_numb")
			.where("                                                             and s.orig_seqn      = si.line_seqn")
			.where("     left outer join boxx_acpt     ai on s.acpt_numb = ai.invc_numb				")
			.where("     where   1=1																")
			.where("     and   a.invc_date >= :fr_invc_date", arg.getParameter("invc1_date"))
			.where("     and   a.invc_date <= :to_invc_date", arg.getParameter("invc2_date"))
			.where("     and   c.cstm_idcd = :cstm_idcd   ", arg.getParameter("cstm_idcd"))
//			.where("     and   c.cstm_code <= :cstm_code2  ", arg.getParameter("cstm_code2"))
			.where("     and   p.prod_code = :item_code   ", arg.getParameter("item_code"))
//			.where("     and   p.prod_code <= :item_code2  ", arg.getParameter("item_code2"))
			.where("     and   s.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
			.where("     )																			")
			.where("     select a.invc_numb															")
			.where("          , a.line_seqn															")
			.where("          , a.cstm_idcd															")
			.where("          , a.cstm_name															")
			.where("          , a.acpt_numb															")
			.where("          , a.prod_name															")
			.where("          , a.prod_leng															")
			.where("          , a.prod_widh															")
			.where("          , a.prod_hght															")
			.where("          , a.sale_date as sale_date											")
			.where("          , a.sale_date as crt_date												")
			.where("          , a.ostt_qntt															")
			.where("          , a.sale_qntt															")
			.where("          , a.sale_pric															")
			.where("          , a.item_idcd															")
			.where("          , a.prod_code															")
			.where("          , a.ostt_dvcd															")
			.where("          , a.pcod_numb															")
			.where("          , a.sale_amnt															")
			.where("          , a.vatx_amnt															")
			.where("          , a.ttsm_amnt															")
			.where("          , a.user_memo															")
			.where("          , 1 as rnum															")
			.where("          , a.porm_qntt															")
			.where("         from cte a																")
			.where("         where 1=1																")
		;
		if(arg.getParamText("check" ).contains("1")){
			data.param
				.where("     union all																	")
				.where("     select null as invc_numb													")
				.where("          , null as line_seqn													")
				.where("          , null as cstm_idcd													")
				.where("          , null as cstm_name													")
				.where("          , null as acpt_numb													")
				.where("          , '일계' as prod_name													")
				.where("          , null as prod_leng													")
				.where("          , null as prod_widh													")
				.where("          , null as prod_hght													")
				.where("          , a.sale_date as sale_date											")
				.where("          , a.sale_date as crt_date												")
				.where("          , null as ostt_qntt													")
				.where("          , sum(a.sale_qntt) as sale_qntt										")
				.where("          , null as sale_pric													")
				.where("          , null as item_idcd													")
				.where("          , null as prod_code													")
				.where("          , a.ostt_dvcd															")
				.where("          , null as pcod_numb													")
				.where("          , sum(a.sale_amnt) as sale_amnt										")
				.where("          , sum(a.vatx_amnt) as vatx_amnt										")
				.where("          , sum(a.ttsm_amnt) as ttsm_amnt										")
				.where("          , null as user_memo													")
				.where("          , 2 as rnum															")
				.where("          , sum(a.porm_qntt) as prom_qntt										")
				.where("     from cte a																	")
				.where("     where 1=1																	")
				.where("     group by a.ostt_dvcd, a.sale_date											")
			;
		}
		if(arg.getParamText("check" ).contains("2")){
			data.param
				.where("     union all																	")
				.where("     select null as invc_numb													")
				.where("          , null as line_seqn													")
				.where("          , null as cstm_idcd													")
				.where("          , null as cstm_name													")
				.where("          , null as acpt_numb													")
				.where("          , '월계' as prod_name													")
				.where("          , null as prod_leng													")
				.where("          , null as prod_widh													")
				.where("          , null as prod_hght													")
				.where("          , substr(a.sale_date,1,6) as sale_date								")
				.where("          , concat(substr(a.sale_date,1,6),'99') as crt_date					")
				.where("          , null as ostt_qntt													")
				.where("          , sum(a.sale_qntt) as sale_qntt										")
				.where("          , null as sale_pric													")
				.where("          , null as item_idcd													")
				.where("          , null as prod_code													")
				.where("          , a.ostt_dvcd															")
				.where("          , null as pcod_numb													")
				.where("          , sum(a.sale_amnt) as sale_amnt										")
				.where("          , sum(a.vatx_amnt) as vatx_amnt										")
				.where("          , sum(a.ttsm_amnt) as ttsm_amnt										")
				.where("          , null as user_memo													")
				.where("          , 3 as rnum															")
				.where("          , sum(a.porm_qntt) as prom_qntt										")
				.where("     from cte a																	")
				.where("     where 1=1																	")
				.where("     group by a.ostt_dvcd, concat(substr(a.sale_date,1,6), '99')				")
			;
		}
		if(arg.getParamText("check" ).contains("3")){
			data.param
				.where("     union all																	")
				.where("     select null as invc_numb													")
				.where("          , null as line_seqn													")
				.where("          , null as cstm_idcd													")
				.where("          , null as cstm_name													")
				.where("          , null as acpt_numb													")
				.where("          , '합계' as prod_name													")
				.where("          , null as prod_leng													")
				.where("          , null as prod_widh													")
				.where("          , null as prod_hght													")
				.where("          , null as sale_date													")
				.where("          , '9999999999' as crt_date											")
				.where("          , null as ostt_qntt													")
				.where("          , sum(a.sale_qntt) as sale_qntt										")
				.where("          , null as sale_pric													")
				.where("          , null as item_idcd													")
				.where("          , null as prod_code													")
				.where("          , a.ostt_dvcd															")
				.where("          , null as pcod_numb													")
				.where("          , sum(a.sale_amnt) as sale_amnt										")
				.where("          , sum(a.vatx_amnt) as vatx_amnt										")
				.where("          , sum(a.ttsm_amnt) as ttsm_amnt										")
				.where("          , null as user_memo													")
				.where("          , 4 as rnum															")
				.where("          , sum(a.porm_qntt) as prom_qntt										")
				.where("     from cte a																	")
				.where("     where 1=1																	")
				.where("     group by  '9999999999'														")
			;
		}
		data.param
			.where("order by  crt_date , rnum   limit 9999999										")
			.where(") a																				")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize													")
		;
		data.param
			.query("select  a.*																		")
		;
		data.param
			.where("from (																			")
			.where("with cte as (																	")
			.where("     select a.invc_numb															")
			.where("          , s.line_seqn															")
			.where("          , a.cstm_idcd															")
			.where("          , c.cstm_name															")
			.where("          , s.acpt_numb															")
			.where("          , p.prod_name															")
			.where("          , p.prod_leng															")
			.where("          , p.prod_widh															")
			.where("          , p.prod_hght															")
			.where("          , a.invc_date as ostt_date											")
			.where("          , a.invc_date as crt_date												")
			.where("          , s.ostt_qntt															")
			.where("          , si.sale_qntt														")
			.where("          , s.sale_pric															")
			.where("          , s.item_idcd															")
			.where("          , p.prod_code															")
			.where("          , a.ostt_dvcd															")
			.where("          , (ifnull(s.ostt_qntt,0)-ifnull(si.sale_qntt,0)) as unpaid			")
			.where("          , ai.pcod_numb														")
			.where("          , (ifnull(s.sale_amnt,0)-ifnull(si.sale_amnt,0)) as sale_amnt			")
			.where("          , (ifnull(s.vatx_amnt,0)-ifnull(si.vatx_amnt,0)) as vatx_amnt			")
			.where("          , (ifnull(s.ttsm_amnt,0)-ifnull(si.ttsm_amnt,0)) as ttsm_amnt			")
			.where("          , s.user_memo															")
			.where("     from sale_ostt_item s														")
			.where("     left outer join sale_ostt_mast a on a.invc_numb = s.invc_numb				")
			.where("     left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd				")
			.where("     left outer join product_mast   p on s.item_idcd = p.prod_idcd				")
			.where("     left outer join (select a.orig_invc_numb , orig_seqn						")
			.where("                           , sum(ifnull(a.sale_qntt,0)) as sale_qntt			")
			.where("                           , sum(ifnull(a.sale_amnt,0)) as sale_amnt			")
			.where("                           , sum(ifnull(a.vatx_amnt,0)) as vatx_amnt			")
			.where("                           , sum(ifnull(a.ttsm_amnt,0)) as ttsm_amnt			")
			.where("                      from sale_item a											")
			.where("                      left outer join sale_mast b on a.invc_numb = b.invc_numb	")
			.where("                      where b.line_stat < 2										")
			.where("                      group by a.orig_invc_numb , orig_seqn ) si on s.invc_numb = si.orig_invc_numb	")
			.where("                                                                and s.line_seqn = si.orig_seqn		")
			.where("     left outer join boxx_acpt     ai on s.acpt_numb = ai.invc_numb				")
			.where("     where   1=1																")
			.where("     and     (ifnull(s.ostt_qntt,0)-ifnull(si.sale_qntt,0)) > 0					")
			.where("     and   a.invc_date >= :fr_invc_date", arg.getParameter("invc1_date"))
			.where("     and   a.invc_date <= :to_invc_date", arg.getParameter("invc2_date"))
			.where("     and   c.cstm_code >= :cstm_code   ", arg.getParameter("cstm_code"))
			.where("     and   c.cstm_code <= :cstm_code2  ", arg.getParameter("cstm_code2"))
			.where("     and   p.prod_code >= :item_code   ", arg.getParameter("item_code"))
			.where("     and   p.prod_code <= :item_code2  ", arg.getParameter("item_code2"))
			.where("     and   s.find_name  like concat('%', :find_name, '%')", arg.getParameter("find_name"))
			.where("     )																			")
			.where("     select a.invc_numb															")
			.where("          , a.line_seqn															")
			.where("          , a.cstm_idcd															")
			.where("          , a.cstm_name															")
			.where("          , a.acpt_numb															")
			.where("          , a.prod_name															")
			.where("          , a.prod_leng															")
			.where("          , a.prod_widh															")
			.where("          , a.prod_hght															")
			.where("          , a.ostt_date as ostt_date											")
			.where("          , a.ostt_date as crt_date												")
			.where("          , a.ostt_qntt															")
			.where("          , a.sale_qntt															")
			.where("          , a.sale_pric															")
			.where("          , a.item_idcd															")
			.where("          , a.prod_code															")
			.where("          , a.ostt_dvcd															")
			.where("          , a.unpaid															")
			.where("          , a.pcod_numb															")
			.where("          , a.sale_amnt															")
			.where("          , a.vatx_amnt															")
			.where("          , a.ttsm_amnt															")
			.where("          , a.user_memo															")
			.where("          , 1 as rnum															")
			.where("     from cte a")
		;
		if(arg.getParamText("check" ).contains("1")){
			data.param
				.where("     union all																	")
				.where("     select null as invc_numb													")
				.where("          , null as line_seqn													")
				.where("          , null as cstm_idcd													")
				.where("          , null as cstm_name													")
				.where("          , null as acpt_numb													")
				.where("          , '일계' as prod_name													")
				.where("          , null as prod_leng													")
				.where("          , null as prod_widh													")
				.where("          , null as prod_hght													")
				.where("          , a.ostt_date as ostt_date											")
				.where("          , a.ostt_date as crt_date												")
				.where("          , null as ostt_qntt													")
				.where("          , sum(a.sale_qntt) as sale_qntt										")
				.where("          , null as sale_pric													")
				.where("          , null as item_idcd													")
				.where("          , null as prod_code													")
				.where("          , a.ostt_dvcd															")
				.where("          , sum(ifnull(a.unpaid,0)) as unpaid									")
				.where("          , null as pcod_numb													")
				.where("          , sum(a.sale_amnt) as sale_amnt										")
				.where("          , sum(a.vatx_amnt) as vatx_amnt										")
				.where("          , sum(a.ttsm_amnt) as ttsm_amnt										")
				.where("          , null as user_memo													")
				.where("          , 2 as rnum															")
				.where("     from cte a																	")
				.where("     where 1=1																	")
				.where("     group by a.ostt_dvcd, a.ostt_date											")
			;
		}
		if(arg.getParamText("check" ).contains("2")){
			data.param
				.where("     union all																	")
				.where("     select null as invc_numb													")
				.where("          , null as line_seqn													")
				.where("          , null as cstm_idcd													")
				.where("          , null as cstm_name													")
				.where("          , null as acpt_numb													")
				.where("          , '월계' as prod_name													")
				.where("          , null as prod_leng													")
				.where("          , null as prod_widh													")
				.where("          , null as prod_hght													")
				.where("          , substr(a.ostt_date,1,6) as ostt_date								")
				.where("          , concat(substr(a.ostt_date,1,6),'99') as crt_date					")
				.where("          , null as ostt_qntt													")
				.where("          , sum(a.sale_qntt) as sale_qntt										")
				.where("          , null as sale_pric													")
				.where("          , null as item_idcd													")
				.where("          , null as prod_code													")
				.where("          , a.ostt_dvcd															")
				.where("          , sum(a.unpaid) as unpaid												")
				.where("          , null as pcod_numb													")
				.where("          , sum(a.sale_amnt) as sale_amnt										")
				.where("          , sum(a.vatx_amnt) as vatx_amnt										")
				.where("          , sum(a.ttsm_amnt) as ttsm_amnt										")
				.where("          , null as user_memo													")
				.where("          , 3 as rnum															")
				.where("     from cte a																	")
				.where("     where 1=1																	")
				.where("     group by a.ostt_dvcd, concat(substr(a.ostt_date,1,6), '99')				")
			;
		}
		if(arg.getParamText("check" ).contains("3")){
			data.param
				.where("     union all																	")
				.where("     select null as invc_numb													")
				.where("          , null as line_seqn													")
				.where("          , null as cstm_idcd													")
				.where("          , null as cstm_name													")
				.where("          , null as acpt_numb													")
				.where("          , '합계' as prod_name													")
				.where("          , null as prod_leng													")
				.where("          , null as prod_widh													")
				.where("          , null as prod_hght													")
				.where("          , null as ostt_date													")
				.where("          , '9999999999' as crt_date											")
				.where("          , null as ostt_qntt													")
				.where("          , sum(a.sale_qntt) as sale_qntt										")
				.where("          , null as sale_pric													")
				.where("          , null as item_idcd													")
				.where("          , null as prod_code													")
				.where("          , a.ostt_dvcd															")
				.where("          , sum(a.unpaid) as unpaid												")
				.where("          , null as pcod_numb													")
				.where("          , sum(a.sale_amnt) as sale_amnt										")
				.where("          , sum(a.vatx_amnt) as vatx_amnt										")
				.where("          , sum(a.ttsm_amnt) as ttsm_amnt										")
				.where("          , null as user_memo													")
				.where("          , 4 as rnum															")
				.where("     from cte a																	")
				.where("     where 1=1																	")
				.where("     group by  '9999999999'														")
			;
		}
		data.param
			.where("     order by  crt_date , rnum limit 9999999									")
			.where(") a																				")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.invc_numb        , s.line_seqn       , a.cstm_idcd        , c.cstm_name			")
			.where("        , s.acpt_numb        , p.prod_name       , p.prod_leng        , p.prod_widh			")
			.where("        , p.prod_hght        , a.invc_date as ostt_date               , s.ostt_qntt			")
			.where("        , s.sale_pric        , s.item_idcd       , p.prod_code        , p.prod_spec			")
			.where("        , a.ostt_dvcd        , p.prod_name as item_name										")
			.where("        , (ifnull(s.ostt_qntt,0)-ifnull(si.sale_qntt,0)) as unpaid    , ai.pcod_numb		")
			.where("        , a.prnt_idcd        , a.line_levl       , a.crte_idcd        , a.crte_urif			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("from sale_ostt_item s																		")
			.where("left outer join sale_ostt_mast a on a.invc_numb = s.invc_numb								")
			.where("left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd								")
			.where("left outer join product_mast   p on s.item_idcd = p.prod_idcd								")
			.where("left outer join (select a.orig_invc_numb , orig_seqn, sum(ifnull(sale_qntt,0)) as sale_qntt	")
			.where("                      , a.invc_numb      , a.line_seqn										")
			.where("                 from sale_item a															")
			.where("                 left outer join sale_mast b on a.invc_numb = b.invc_numb					")
			.where("                 where b.line_stat < 2														")
			.where("                 group by a.orig_invc_numb , orig_seqn ) si on s.invc_numb = si.orig_invc_numb")
			.where("                                                           and s.line_seqn = si.orig_seqn	")
			.where("left outer join boxx_acpt     ai on s.acpt_numb = ai.invc_numb								")
			.where("where   1=1																					")
			.where("and     (ifnull(s.ostt_qntt,0)-ifnull(si.sale_qntt,0)) > 0									")
//			.where("and     (si.invc_numb, si.line_seqn ) not in (select orig_invc_numb, orig_invc_seqn from txbl_item)")
			.where("and     a.cstm_idcd   = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.invc_date  >= :ostt_date1       " , arg.getParamText("ostt_date1" ))
			.where("and     a.invc_date  <= :ostt_date2       " , arg.getParamText("ostt_date2" ))
			.where("and     a.line_stat   = :line_stat1       " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.invc_date 																		")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String rqod_rcvd_dvcd = "";
		String orig_invc_numb = "";
		String orig_seqn = "";
		String bzpl_idcd = "";

		data.param // 기본 사업장 조회
			.query("select optn_char_valu										")
			.query("from   optn_mast											")
			.query("where optn_idcd ='dflt_bzpl_idcd'							")
		;
		SqlResultMap info3 = data.selectForMap();

		for (SqlResultRow row2:info3) {
			bzpl_idcd = row2.getParamText("fin_ostt");
		}
		data.clear();

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {
			rqod_rcvd_dvcd = row.getParamText("rqod_rcvd_dvcd");
			orig_invc_numb = row.getParamText("orig_invc_numb");
			orig_seqn = row.getParamText("orig_seqn");
			if(i == 0){
				//등록
				data.param
					.table ("sale_mast")
					.where ("where invc_numb = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))		//INVOICE번호

					.update("invc_date"			, row.getParameter("invc_date"		))		//INVOICE일자
					.update("rqod_rcvd_dvcd"	, row.getParameter("rqod_rcvd_dvcd"	))		//청구영수구분코드
					.update("bzpl_idcd"			, bzpl_idcd							)		//사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처ID
					.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"		))		//출고구분코드
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))		//담당자ID
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))		//부가세포함여부
					.update("sale_amnt"			, row.getParameter("sale_amnt"		))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"		))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//합계금액
					.update("user_memo"			, row.getParameter("user_memo"		))		//사용자메모

					.update("sysm_memo"			, row.getParameter("sysm_memo"))
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.insert("line_stat"			, row.getParameter("line_stat"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("sale_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("acpt_numb"			, row.getParameter("acpt_numb"		))		//수주번호
					.update("acpt_seqn"			, row.getParameter("acpt_seqn"		))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"		))		//품목ID
					.update("sale_pric"			, row.getParameter("sale_pric"		))		//판매단가
					.update("sale_qntt"			, row.getParameter("sale_qntt"		))		//판매수량
					.update("porm_rate"			, row.getParameter("porm_rate"		))		//가감율
					.update("porm_qntt"			, row.getParameter("porm_qntt"		))		//가감수량
					.update("real_sale_qntt"	, row.getParameter("real_sale_qntt"	))		//실청구수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))		//부가세포함여부
					.update("sale_amnt"			, row.getParameter("sale_amnt"		))		//청구금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"		))		//부가세액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//합계금액
					.update("orig_invc_numb"	, row.getParameter("invc_numb"		))		//원 번호
					.update("orig_seqn"			, row.getParameter("line_seqn"		))		//원 순번
					.update("pcod_numb"			, row.getParameter("pcod_numb"		))		//poco

					.update("find_name"			, row.getParameter("prod_code")
												+ " "
												+ row.getParameter("prod_name"))

					.update("user_memo"			, row.getParameter("user_memo"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("txbl_mast")
					.where ("where invc_numb = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("new_txbl_numb"))		//INVOICE번호

					.update("puch_sale_dvcd"	, 2)										//매입매출구분코드 	1: 매입, 2: 매출
					.update("publ_date"			, row.getParameter("invc_date"))			//발행일자
					.update("txbl_seqn"			, row.getParameter("new_txbl_seqn"))		//세금계산서 일련번호
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))			//담당자ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))			//거래처ID
					.update("rqod_rcvd_dvcd"	, row.getParameter("rqod_rcvd_dvcd"))		//청구영수구분코드
					.update("sply_amnt"			, row.getParameter("istt_amnt"))			//공급가액
					.update("vatx_amnt"			, row.getParameter("istt_vatx"))			//부가세액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))			//합계금액
					.update("remk_text"			, row.getParameter("remk_text"))			//비고
					.update("txbl_path_dvcd"	, "21")										//세금계산서 경로구분코드

					.insert("line_levl"			, row.getParameter("line_levl"			))
					.insert("line_stat"			, row.getParameter("line_stat"			))
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("txbl_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("new_txbl_numb"))
					.unique("line_seqn"			, row.fixParameter("new_txbl_seqn"))

					.update("invc_date"			, row.getParameter("invc_date"))			//invoice일자 = 청구일자
					.update("item_idcd"			, row.getParameter("item_idcd"))			//품목ID
					.update("item_name"			, row.getParameter("item_name"))			//품목명
					.update("item_spec"			, row.getParameter("prod_spec"))			//품목규격
					.update("qntt"				, row.getParameter("sale_qntt"))			//수량
					.update("pric"				, row.getParameter("sale_pric"))			//단가
					.update("sply_amnt"			, row.getParameter("sale_amnt"))			//공급가액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"))			//부가세액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))			//합계금액
					.update("orig_invc_numb"	, row.getParameter("new_invc_numb"))		//원invoice번호
					.update("orig_invc_seqn"	, row.getParameter("new_line_seqn"))		//원invoice순번
					.update("find_name"			, row.getParameter("invc_date")
												+ "	"
												+ row.getParameter("item_name"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				if(rqod_rcvd_dvcd.equals("2")){
					// 수금대장
					data.param
						.table ("colt_mast")
						.where ("where invc_numb = :invc_numb")

						.unique("invc_numb"			, row.fixParameter("new_colt_numb"	))		//INVOICE번호

						.update("stot_bass"			, row.getParameter("new_invc_numb"	))		//결제근거
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처 ID

						.update("sysm_memo"			, row.getParameter("sysm_memo"		))
						.insert("line_levl"			, row.getParameter("line_levl"		))
						.insert("line_stat"			, row.getParameter("line_stat"		))
						.update("updt_idcd"			, row.getParameter("updt_idcd"		))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.insert);
					data.execute();
					data.clear();

					data.param
						.table ("colt_item")
						.where ("where invc_numb = :invc_numb")
						.where ("and   line_seqn = :line_seqn")

						.unique("invc_numb"			, row.fixParameter("new_colt_numb"))
						.unique("line_seqn"			, row.fixParameter("new_colt_seqn"))

						.update("acpt_numb"			, row.getParameter("acpt_numb"		))		//수주번호
						.update("acpt_seqn"			, row.getParameter("acpt_seqn"		))		//수주순번
						.update("assi_seqn"			, "1")										//보조순번
						.update("sale_numb"			, row.getParameter("new_invc_numb"	))		//청구번호
						.update("sale_seqn"			, row.getParameter("new_line_seqn"	))		//청구순번
						.update("colt_degr"			, "1")										//수금차수
						.update("colt_amnt"			, row.getParameter("ttsm_amnt"		))		//수금액

						.update("find_name"			, row.getParameter("prod_code")
													+ " "
													+ row.getParameter("prod_name"))

						.update("user_memo"			, row.getParameter("user_memo"))
						.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
						.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
						.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
						.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
						.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
						.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
						.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
					;
					data.attach(Action.insert);
					data.execute();
					data.clear();
				}
				i =+ 1;

			}else{
				data.param
					.table ("sale_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("acpt_numb"			, row.getParameter("acpt_numb"		))		//수주번호
					.update("acpt_seqn"			, row.getParameter("acpt_seqn"		))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"		))		//품목ID
					.update("sale_pric"			, row.getParameter("sale_pric"		))		//판매단가
					.update("sale_qntt"			, row.getParameter("sale_qntt"		))		//판매수량
					.update("porm_rate"			, row.getParameter("porm_rate"		))		//가감율
					.update("porm_qntt"			, row.getParameter("porm_qntt"		))		//가감수량
					.update("real_sale_qntt"	, row.getParameter("real_sale_qntt"	))		//실청구수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))		//부가세포함여부
					.update("sale_amnt"			, row.getParameter("sale_amnt"		))		//청구금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"		))		//부가세액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//합계금액
					.update("orig_invc_numb"	, row.getParameter("invc_numb"		))		//원 번호
					.update("orig_seqn"			, row.getParameter("line_seqn"		))		//원 순번
					.update("pcod_numb"			, row.getParameter("pcod_numb"		))		//poco

					.update("find_name"			, row.getParameter("prod_code")
												+ " "
												+ row.getParameter("prod_name"))

					.update("user_memo"			, row.getParameter("user_memo"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("txbl_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("new_txbl_numb"))
					.unique("line_seqn"			, row.fixParameter("new_txbl_seqn"))

					.update("invc_date"			, row.getParameter("invc_date"))			//invoice일자 = 청구일자
					.update("item_idcd"			, row.getParameter("item_idcd"))			//품목ID
					.update("item_name"			, row.getParameter("item_name"))			//품목명
					.update("item_spec"			, row.getParameter("prod_spec"))			//품목규격
					.update("qntt"				, row.getParameter("sale_qntt"))			//수량
					.update("pric"				, row.getParameter("sale_pric"))			//단가
					.update("sply_amnt"			, row.getParameter("sale_amnt"))			//공급가액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"))			//부가세액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))			//합계금액
					.update("orig_invc_numb"	, row.getParameter("new_invc_numb"))		//원invoice번호
					.update("orig_invc_seqn"	, row.getParameter("new_line_seqn"))		//원invoice순번
					.update("find_name"			, row.getParameter("invc_date")
												+ " "
												+ row.getParameter("item_name"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				if(rqod_rcvd_dvcd.equals("2")){
					// 수금대장
					data.param
					.table ("colt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("new_colt_numb"))
					.unique("line_seqn"			, row.fixParameter("new_colt_seqn"))

					.update("acpt_numb"			, row.getParameter("acpt_numb"		))		//수주번호
					.update("acpt_seqn"			, row.getParameter("acpt_seqn"		))		//수주순번
					.update("assi_seqn"			, "1")										//보조순번
					.update("sale_numb"			, row.getParameter("new_invc_numb"	))		//청구번호
					.update("sale_seqn"			, row.getParameter("new_line_seqn"	))		//청구순번
					.update("colt_degr"			, "1")										//수금차수
					.update("colt_amnt"			, row.getParameter("ttsm_amnt"		))		//수금액

					.update("find_name"			, row.getParameter("prod_code")
												+ " "
												+ row.getParameter("prod_name"))

					.update("user_memo"			, row.getParameter("user_memo"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
				}
			}

			data.param
				.table ("sale_ostt_item")
				.where ("where invc_numb = :invc_numb")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("rqod_invc_numb"	, row.getParameter("new_invc_numb"	))		//청구번호
				.update("rqod_date"			, row.getParameter("invc_date"		))		//청구일자
				.update("rqod_qntt"			, row.getParameter("sale_qntt"		))		//청구수량
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}


		return null;
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");

		data.param
			.table("purc_istt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		//item에 없으면 mast에서도 삭제되게끔
		temp.param
			.query("select if((b.line_seqn),'1','0') as yorn						")
			.query("from  purc_istt_mast a											")
			.query("left outer join purc_istt_item b on a.invc_numb = b.invc_numb	")
			.query("where a.invc_numb = :invc_numb		", arg.fixParameter("invc_numb"))
		;
		SqlResultRow yorn = temp.selectForRow();

		if(yorn.getParamText("yorn").equals("0")){
			data.param
				.table("purc_istt_mast")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}

		return null;
	}
}
