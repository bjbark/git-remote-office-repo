package com.sky.system.sale.order.slorlist1;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class SlorList1Service extends DefaultServiceHandler {

	public SqlResultMap getSearch0(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    i.invc_numb       , i.amnd_degr       , i.bzpl_idcd         , i.invc_date				")
			.where("		, i.ordr_dvcd       , i.orig_invc_numb  , i.expt_dvcd         , i.pcod_numb				")
			.where("		, a.deli_date       , i.cstm_idcd       , i.mdtn_prsn         , i.cont_date				")
			.where("		, i.drtr_idcd       , i.dept_idcd       , i.crny_dvcd         , i.excg_rate				")
			.where("		, i.ostt_wrhs_idcd  , i.trut_dvcd       , i.dlvy_cond_dvcd    , i.crdt_exce_yorn		")
			.where("		, i.amnt_lack_yorn  , i.sale_stor_yorn  , i.remk_text         , i.memo					")
			.where("		, i.cofm_yorn       , i.cofm_dttm       , i.cofm_drtr_idcd    , i.acpt_stat_dvcd		")
			.where("		, i.user_memo       , i.sysm_memo       , i.prnt_idcd         , i.line_levl				")
			.where("		, i.line_ordr       , i.line_stat       , i.line_clos         , i.find_name				")
			.where("		, i.updt_user_name  , i.updt_ipad       , SUBSTRING(a.updt_dttm,1,8)  as updt_dttm		")
			.where("		, i.updt_idcd       , SUBSTRING(a.crte_dttm,1,8) as crte_dttm							")
			.where("		, i.updt_urif       , i.crte_user_name  , i.crte_ipad									")
			.where("		, i.crte_idcd       , i.crte_urif       , i.cstm_drtr_name								")
			.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.where("		, w.wrhs_code       , w.wrhs_name														")
			.where("		, a.cstm_offr_date  , a.cstm_lott_numb  , a.item_idcd         , a.cstm_deli_date		")
			.where("		, t.item_name       , a.invc_qntt       , a.invc_pric         , a.sply_amnt				")
			.where("		, a.deli_chge_resn  , a.line_seqn       , t.item_spec       , t.item_code				")
			.where("		, (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.where("		, (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.where("		, a.ostt_qntt																			")
			.where("		, IFNULL(a.invc_qntt,0)-IFNULL(a.ostt_qntt,0) as upid_qntt								")
			.where("		, (select count(*) from acpt_item r where r.invc_numb = a.invc_numb) as item_count		")
			.where("		, @curRank:=@curRank+1 as rank          , u.user_name as crte_name						")
			.where("from   acpt_item a																				")
			.where("left   outer join acpt_mast      i  on a.invc_numb = i.invc_numb								")
			.where("left   outer join cstm_mast      c  on i.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join user_mast      d  on i.drtr_idcd = d.user_idcd								")
			.where("left   outer join wrhs_mast      w  on i.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join item_mast      t  on a.item_idcd = t.item_idcd								")
			.where("left   outer join user_mast      u  on u.user_idcd = a.crte_idcd								")
			.where(",(select @curRank:=0) r																			")
			.where("where  1 = 1																					")
			.where("and    ifnull(i.ordr_dvcd,0) != '4000'															")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and    ifnull(json_value(i.json_data, '$.prod_trst_dvcd'),'') != '2000'						")
			;
		}
		
		data.param
			.where("and    i.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.cstm_lott_numb like %:cstm_lott_numb%	" , arg.getParamText("cstm_lott_numb"))
			.where("and    i.invc_date  >= :cstm_offr_date1			" , arg.getParamText("invc1_date"))
			.where("and    i.invc_date  <= :cstm_offr_date2			" , arg.getParamText("invc2_date"))
			.where("and    i.cstm_idcd  = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    i.drtr_idcd  = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("and    i.acpt_stat_dvcd not in ('0010', '0600')														")
			.where("and    a.item_idcd  = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("and    i.line_clos  <> 1																		") // 마감된건 제외
			.where("and    i.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))		//발주상태
			.where("and    i.line_stat  < :line_stat				" , "2", "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb desc																		")
			.where(") a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	// 집계분석현황 > 날짜별
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("with acpt as(																			")
			.query("    select  a.invc_date    , b.invc_qntt    , b.invc_amnt								")
			.query("          , weekofyear(a.invc_date) as invc_week										")
			.query("    from acpt_mast a, acpt_item b														")
			.query("    where a.invc_numb = b.invc_numb														")
			.query("    and a.acpt_stat_dvcd not in ('0010', '0600')										")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("    and ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'						")
			;
		}
		
		data.param
//			.query("    and substring(a.invc_date,1,6) >= substring(:invc1_date,1,6)", arg.getParamText("invc1_date"))
			.query("    and a.invc_date >= :invc1_date				" , arg.getParamText("invc1_date"))
			.query("    and a.invc_date <= :invc2_date				" , arg.getParamText("invc2_date"))
			.query("    and a.find_name like %:find_name%			" , arg.getParamText("find_name"))
			.query("    and a.drtr_idcd  = :drtr_idcd				" , arg.getParamText("drtr_idcd"))
			.query("    and a.cstm_idcd  = :cstm_idcd				" , arg.getParamText("cstm_idcd"))
			.query("    and b.item_idcd  = :item_idcd				" , arg.getParamText("item_idcd"))
			.query("    and b.cstm_lott_numb like %:cstm_lott_numb%	" , arg.getParamText("cstm_lott_numb" ))
			.query("    and a.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))		//발주상태
			.query("    and a.line_stat  < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat")))
			.query("    and a.line_clos  <> 1																")
			.query(" )																						")
			.query("select   invc_date																		")
			.query("       , sum(day_qntt)   as day_qntt,   sum(day_amnt)   as day_amnt						")
			.query("       , sum(week_qntt)  as week_qntt,  sum(week_amnt)  as week_amnt					")
			.query("       , sum(month_qntt) as month_qntt, sum(month_amnt) as month_amnt					")
			.query("       , concat(substr(_utf8'일월화수목금토',DAYOFWEEK(a.invc_date),1),'요일') as week			")
			.query("from (																					")
			.query("       select invc_date																	")
			.query("            , sum(invc_qntt) as day_qntt, sum(invc_amnt) as day_amnt					")
			.query("            , 0 as week_qntt , 0 as week_amnt											")
			.query("            , 0 as month_qntt , 0 as month_amnt											")
			.query("       from acpt a																		")
			.query("       group by invc_date																")
			.query("       union all																		")
			.query("       select invc_date																	")
			.query("            , 0 as day_qntt , 0 as day_amnt												")
			.query("            , (select sum(invc_qntt) from acpt r where a.invc_week = r.invc_week and r.invc_date <=a.invc_date) as week_qntt	")
			.query("            , (select sum(invc_amnt) from acpt r where a.invc_week = r.invc_week and r.invc_date <=a.invc_date) as week_amnt	")
			.query("            , 0 as month_qntt , 0 as month_amnt											")
			.query("       from acpt a																		")
			.query("       group by invc_date																")
			.query("       union all																		")
			.query("       select invc_date																	")
			.query("            , 0 as day_qntt,  0 as day_amnt												")
			.query("            , 0 as week_qntt, 0 as week_amnt											")
			.query("            , avg(month_qntt) as month_qntt, avg(month_amnt) as month_amnt				")
			.query("       from(																			")
			.query("             select invc_date															")
			.query("                  , sum(invc_qntt) over (order by invc_date asc) as month_qntt			")
			.query("                  , sum(invc_amnt) over (order by invc_date asc) as month_amnt			")
			.query("             from acpt																	")
			.query("             order by invc_date asc														")
			.query("       )a																				")
			.query("       group by invc_date																")
			.query(" ) a																					")
			.query("where a.invc_date >= :invc_date1", arg.getParamText("invc1_date"))
			.query("and   a.invc_date <= :invc_date2", arg.getParamText("invc2_date"))
			.query("group by invc_date																		")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("with sumM as (")
			.query("    select a.cstm_idcd																			")
			.query("         , ifnull(sum(b.invc_qntt),0) as invc_qntt												")
			.query("         , ifnull(sum(b.invc_amnt),0) as invc_amnt												")
			.query("    from acpt_mast a, acpt_item b																")
			.query("    where a.invc_numb = b.invc_numb																")
			.query("    and   a.invc_date >= DATE_FORMAT(LAST_DAY(now()-interval 1 month) + interval 1 day,'%Y%m%d')")
			.query("    and   a.invc_date <= DATE_FORMAT(LAST_DAY(now()),'%Y%m%d')									")
			.query("    and   a.acpt_stat_dvcd not in ('0010', '0600')												")
		;
		if( arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("    and   ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'								")
			;
		}
		
		data.param
			.query("    and a.line_stat   < :line_stat1		" , "2" , "".equals(arg.getParamText("line_stat")))
			
			.query("    GROUP BY cstm_idcd																			")
			.query(" ),																								")
			.query("acpt as (																						")
			.query("    select a.cstm_idcd																			")
			.query("         , ifnull(sum(b.invc_qntt),0) as invc_qntt												")
			.query("         , ifnull(sum(b.invc_amnt),0) as invc_amnt												")
			.query("    from acpt_mast a, acpt_item b																")
			.query("    where a.invc_numb = b.invc_numb																")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("    and   ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'								")
			;
		}
		
		data.param
			.query("    and   a.invc_date >= :invc_date1				" , arg.getParamText("invc1_date"))
			.query("    and   a.invc_date <= :invc_date2				" , arg.getParamText("invc2_date"))
			.query("    and   a.find_name like %:find_name%				" , arg.getParamText("find_name"))
			.query("    and   a.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd"))
			.query("    and   a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd"))
			.query("    and   a.acpt_stat_dvcd not in ('0010', '0600')												")
			.query("    and   b.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd"))
			.query("    and   b.cstm_lott_numb like %:cstm_lott_numb%	" , arg.getParamText("cstm_lott_numb" ))
			.query("    and   a.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))		//발주상태
			.query("    and   a.line_stat   < :line_stat2				" , "2" , "".equals(arg.getParamText("line_stat")))
			.query("    and   a.line_clos  <> 1																		")
			.query("    GROUP BY cstm_idcd																			")
			.query(" )																								")
			.query("select a.cstm_idcd																				")
			.query("     , (select r.cstm_name from cstm_mast r where a.cstm_idcd = r.cstm_idcd) as cstm_name		")
			.query("     , a.invc_qntt as invc_qntt     , a.invc_amnt as invc_amnt									")
			.query("     , b.invc_qntt as month_qntt    , b.invc_amnt as month_amnt									")
			.query("from acpt a left outer join sumM b on a.cstm_idcd = b.cstm_idcd									")
			.query("order by cstm_name																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("with sumM as (")
			.query("    select b.item_idcd																			")
			.query("         , ifnull(sum(b.invc_qntt),0) as invc_qntt												")
			.query("         , ifnull(sum(b.invc_amnt),0) as invc_amnt												")
			.query("    from acpt_mast a, acpt_item b																")
			.query("    where a.invc_numb = b.invc_numb																")
			.query("    and   a.invc_date >= DATE_FORMAT(LAST_DAY(now()-interval 1 month) + interval 1 day,'%Y%m%d')")
			.query("    and   a.invc_date <= DATE_FORMAT(LAST_DAY(now()),'%Y%m%d')									")
			.query("    and   a.acpt_stat_dvcd not in ('0010', '0600')												")
		;
		if( arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("    and   ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'								")
			;
		}
		
		data.param
			.query("    and   a.line_stat   < :line_stat1		" , "2" , "".equals(arg.getParamText("line_stat")))
			.query("    and   a.line_clos <> 1																		")
			.query("    GROUP BY item_idcd																			")
		;
		if(arg.getParamText("stor_id").equals("N1000hjsys1000")){
			data.param
				.query("    having invc_qntt > 0 																	")
			;
		}else if(arg.getParamText("stor_id").equals("N1000hntop1000")){
			data.param
				.query("    having invc_qntt > 0 																	")
			;
		}else if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("    having invc_qntt > 0																	")
			;
		}else{
			data.param
				.query("    having invc_qntt > 0 and invc_amnt > 0													")
			;
		}
		data.param
			.query(" ),																								")
			.query("acpt as (																						")
			.query("    select b.item_idcd, a.acpt_stat_dvcd														")
			.query("         , ifnull(sum(b.invc_qntt),0) as invc_qntt												")
			.query("         , ifnull(sum(b.invc_amnt),0) as invc_amnt												")
			.query("    from acpt_mast a, acpt_item b																")
			.query("    where a.invc_numb = b.invc_numb																")
			.query("    and   a.acpt_stat_dvcd not in ('0010', '0600')												")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("    and   ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'								")
			;
		}
		
		data.param
			.query("    and   a.invc_date >= :invc_date1			 " , arg.getParamText("invc1_date"))
			.query("    and   a.invc_date <= :invc_date2			 " , arg.getParamText("invc2_date"))
			.query("    and   a.find_name like %:find_name%			 " , arg.getParamText("find_name"))
			.query("    and   a.drtr_idcd   = :drtr_idcd			 " , arg.getParamText("drtr_idcd"))
			.query("    and   a.cstm_idcd   = :cstm_idcd			 " , arg.getParamText("cstm_idcd"))
			.query("    and   b.item_idcd   = :item_idcd			 " , arg.getParamText("item_idcd"))
			.query("    and   b.cstm_lott_numb like %:cstm_lott_numb%" , arg.getParamText("cstm_lott_numb" ))
			.query("    and   a.acpt_stat_dvcd = :acpt_stat_dvcd	 " , arg.getParamText("acpt_stat_dvcd"))
			.query("    and   a.line_stat   < :line_stat2			 " , "2" , "".equals(arg.getParamText("line_stat")))
			.query("    and   a.line_clos  <> 1																")
			.query("    GROUP BY item_idcd																			")
		;
		if(arg.getParamText("stor_id").equals("N1000hjsys1000")){
			data.param
				.query("    having invc_qntt > 0 																	")
			;
		}else if(arg.getParamText("stor_id").equals("N1000hntop1000")){
			data.param
				.query("    having invc_qntt > 0 																	")
			;
		}else if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("    having invc_qntt > 0																	")
			;
		}else{
			data.param
				.query("    having invc_qntt > 0 and invc_amnt > 0													")
			;
		}
		data.param
		.query(" )																									")
		.query("select a.item_idcd , a.acpt_stat_dvcd																")
		.query("     , i.item_name , i.item_spec   , i.item_code													")
		.query("     , a.invc_qntt as invc_qntt    , a.invc_amnt as invc_amnt										")
		.query("     , b.invc_qntt as month_qntt   , b.invc_amnt as month_amnt										")
		.query("from acpt a																							")
		.query("left outer join sumM b on a.item_idcd = b.item_idcd													")
		.query("left outer join item_mast i on a.item_idcd = i.item_idcd											")
		.query("order by i.item_name																				")
	;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
			.query("        , a.ostt_qntt      , a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd		")
			.query("        , a.optn_psbl_yorn , a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric	")
			.query("        , a.invc_qntt      , a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt		")
			.query("        , a.vatx_amnt      , a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt	")
			.query("        , a.stnd_unit      , a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date		")
			.query("        , a.dlvy_date      , a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt		")
			.query("        , a.dlvy_memo      , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo		")
			.query("        , a.prnt_idcd      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos		")
			.query("        , a.find_name      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd		")
			.query("        , a.updt_urif      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd		")
			.query("        , i.item_spec      , i.modl_name      , u.unit_name      , a.cstm_lott_numb						")
			.query("        , a.crte_urif      , b.invc_date      , c.cstm_name      , i.item_code      , i.item_name		")
			.query("        , IFNULL(a.invc_qntt,0)- IFNULL(a.dsct_qntt,0) - IFNULL(a.ostt_qntt,0) as qntt					")
		;
		data.param
			.where("from    acpt_item a 																					")
			.where("        left outer join acpt_mast b on a.invc_numb = b.invc_numb										")
			.where("        left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd										")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("        left outer join unit_mast u on i.unit_idcd = u.unit_code										")
			.where("where   1=1																								")
			.where("and     b.acpt_stat_dvcd not in ('0010', '0600')														")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and     ifnull(json_value(b.json_data, '$.prod_trst_dvcd'),'') != '2000'										")
			;
		}
		
		data.param
			.where("and     b.invc_date	=:invc_date					" , arg.getParamText("invc_date"))
			.where("and     b.invc_date	>= :invc_date1				" , arg.getParamText("invc_date1"))
			.where("and     b.invc_date	<= :invc_date2				" , arg.getParamText("invc_date2"))
			.where("and     b.drtr_idcd	=:drtr_idcd					" , arg.getParamText("drtr_idcd"))
			.where("and     b.cstm_idcd	=:cstm_idcd					" , arg.getParamText("cstm_idcd"))
			.where("and     a.item_idcd	=:item_idcd					" , arg.getParamText("item_idcd"))
			.where("and     b.cstm_lott_numb like %:cstm_lott_numb%	" , arg.getParamText("cstm_lott_numb" ))
			.where("and     a.acpt_stat_dvcd = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd"))
			.where("and     b.find_name like %:find_name%			" , arg.getParamText("find_name"))
			.where("and     b.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
