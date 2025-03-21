package com.sky.system.sale.order.slorlist2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class SlorList2Service extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
		;
		/* 삼정은 납기일 기준으로 요청*/
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("with acpt as (																			")
				.where("    select  a.cstm_idcd, a.invc_date, b.deli_date										")
				.where("          , case when b.deli_date >= :invc_date1" , arg.getParamText("invc1_date"))
				.where("                 and  b.deli_date <= :invc_date2" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as invc_qntt								")
				.where("          , case when b.deli_date >= :invc_date3", arg.getParamText("invc1_date"))
				.where("                 and  b.deli_date <= :invc_date4" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as invc_amnt")
				.where("          , case when b.deli_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date5,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and  b.deli_date <= :invc_date6" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as month_qntt								")
				.where("          , case when b.deli_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date7,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and  b.deli_date <= :invc_date8" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as month_amnt								")
				.where("    from  acpt_mast a, acpt_item b														")
				.where("    where a.invc_numb = b.invc_numb														")
				.where("    and a.acpt_dvcd = '1000'															")
				.where("    and a.acpt_stat_dvcd != '0010'														")
			;
		}else{ /* 수주일자 구분 */
			data.param
				.where("with acpt as (																			")
				.where("    select  a.cstm_idcd, a.invc_date													")
				.where("          , case when a.invc_date >= :invc_date1" , arg.getParamText("invc1_date"))
				.where("                 and a.invc_date<= :invc_date2" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as invc_qntt								")
				.where("          , case when a.invc_date >= :invc_date3", arg.getParamText("invc1_date"))
				.where("                 and a.invc_date<= :invc_date4" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as invc_amnt")
				.where("          , case when a.invc_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date5,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and a.invc_date <= :invc_date6" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as month_qntt								")
				.where("          , case when a.invc_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date7,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and a.invc_date <= :invc_date8" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as month_amnt								")
				.where("    from  acpt_mast a, acpt_item b														")
				.where("    where a.invc_numb = b.invc_numb														")
			;
		}
		if( arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("    and ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'						")
			;
		}

		data.param
			.where("    and a.find_name like %:find_name%	" , arg.getParamText("find_name"))
			.where("    and a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd"))
			.where("    and a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("    and b.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd"))
			.where("    and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("    and a.line_clos  <> 1																")
			.where(")																						")
		;
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("select a.deli_date ,concat(substr(_utf8'일월화수목금토',DAYOFWEEK(a.deli_date),1),'요일') as deli_week	")
				.where("     , a.invc_date ,concat(substr(_utf8'일월화수목금토',DAYOFWEEK(a.invc_date),1),'요일') as week		")
				.where("     , (select cstm_name from cstm_mast r where a.cstm_idcd = r.cstm_idcd) as cstm_name	")
				.where("     , sum(invc_qntt)  as day_qntt       , sum(invc_amnt)  as day_amnt					")
				.where("     , sum(month_qntt) as month_qntt     , sum(month_amnt) as month_amnt				")
				.where("from acpt a																				")
				.where("group by deli_date																		")
				.where("having ifnull(day_qntt, 0) != 0															")
				.where("order by deli_date desc																	")
				.where(") a																						")
			;
		}else{
			data.param
				.where("select a.invc_date ,concat(substr(_utf8'일월화수목금토',DAYOFWEEK(a.invc_date),1),'요일') as week	")
				.where("     , (select cstm_name from cstm_mast r where a.cstm_idcd = r.cstm_idcd) as cstm_name	")
				.where("     , sum(invc_qntt)  as day_qntt       , sum(invc_amnt)  as day_amnt					")
				.where("     , sum(month_qntt) as month_qntt     , sum(month_amnt) as month_amnt				")
				.where("from acpt a																				")
				.where("group by invc_date																		")
				.where("having ifnull(day_qntt, 0) != 0															")
				.where("order by invc_date desc																	")
				.where(") a																						")
			;
		}

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
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("with acpt as (																			")
			.where("    select  a.cstm_idcd, a.invc_date	,i.unit_wigt	,p.drwg_numb	,b.deli_date	, c.tele_numb	")
		;
		/* 삼정은 납기일 기준으로 요청*/
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("          , case when b.deli_date >= :invc_date1" , arg.getParamText("invc1_date"))
				.where("                 and b.deli_date<= :invc_date2" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as invc_qntt								")
				.where("          , case when b.deli_date >= :invc_date3", arg.getParamText("invc1_date"))
				.where("                 and b.deli_date<= :invc_date4" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as invc_amnt")
				.where("          , case when b.deli_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date5,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and b.deli_date <= :invc_date6" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as month_qntt								")
				.where("          , case when b.deli_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date7,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and b.deli_date <= :invc_date8" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as month_amnt								")
			;
		}else{
			data.param
				.where("          , case when a.invc_date >= :invc_date1" , arg.getParamText("invc1_date"))
				.where("                 and a.invc_date<= :invc_date2" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as invc_qntt								")
				.where("          , case when a.invc_date >= :invc_date3", arg.getParamText("invc1_date"))
				.where("                 and a.invc_date<= :invc_date4" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as invc_amnt")
				.where("          , case when a.invc_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date5,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and a.invc_date <= :invc_date6" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as month_qntt								")
				.where("          , case when a.invc_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date7,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and a.invc_date <= :invc_date8" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as month_amnt								")
			;
		}
		data.param
			.where("    from  acpt_mast a																	")
			.where("          left outer join acpt_item      b on a.invc_numb = b.invc_numb					")
			.where("          left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd					")
			.where("          left outer join item_mast      i on b.item_idcd = i.item_idcd					")
			.where("          left outer join acpt_prod_spec p on b.invc_numb = p.invc_numb and b.amnd_degr = p.amnd_degr and b.line_seqn = p.line_seqn	")
			.where("    where a.invc_numb = b.invc_numb														")
		;
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("    and a.acpt_dvcd = '1000'															")
				.where("    and a.acpt_stat_dvcd != '0010'														")
			;
		}

		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")) {
			data.param
				.where("    and ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'				")
			;
		}
		data.param
			.where("    and a.find_name like %:find_name%	" , arg.getParamText("find_name"))
			.where("    and a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd"))
			.where("    and a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("    and b.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd"))
			.where("    and a.lcls_idcd   = :lcls_idcd		" , arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("    and a.mcls_idcd   = :mcls_idcd		" , arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("    and a.scls_idcd   = :scls_idcd		" , arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("    and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("    and a.line_clos  <> 1																")
			.where(" )																						")
			.where("select cstm_idcd																		")
			.where("     , (select cstm_name from cstm_mast r where a.cstm_idcd = r.cstm_idcd) as cstm_name	")
			.where("     , sum(invc_qntt)   as invc_qntt     , sum(invc_amnt)   as invc_amnt				")
			.where("     , sum(month_qntt)  as month_qntt    , sum(month_amnt) as month_amnt				")
			.where("     , unit_wigt      , drwg_numb        , tele_numb									")
			.where("from acpt a																				")
			.where("group by cstm_idcd																		")
			.where("having ifnull(invc_qntt, 0) != 0														")
//			.where("and ifnull(invc_amnt, 0) != 0															")
			.where("order by cstm_name																		")
			.where(") a																						")
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
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("with acpt as (																			")
			.where("   select  b.item_idcd, b.deli_date														")
		;
			/* 삼정은 납기일 기준으로 요청*/
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("          , case when b.deli_date >= :invc_date1" , arg.getParamText("invc1_date"))
				.where("                 and b.deli_date<= :invc_date2" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as invc_qntt								")
				.where("          , case when b.deli_date >= :invc_date3", arg.getParamText("invc1_date"))
				.where("                 and b.deli_date<= :invc_date4" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as invc_amnt")
				.where("          , case when b.deli_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date5,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and b.deli_date <= :invc_date6" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as month_qntt								")
				.where("          , case when b.deli_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date7,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and b.deli_date <= :invc_date8" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as month_amnt								")
			;
		}else{
			data.param
				.where("          , case when a.invc_date >= :invc_date1" , arg.getParamText("invc1_date"))
				.where("                 and a.invc_date<= :invc_date2" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as invc_qntt								")
				.where("          , case when a.invc_date >= :invc_date3", arg.getParamText("invc1_date"))
				.where("                 and a.invc_date<= :invc_date4" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as invc_amnt")
				.where("          , case when a.invc_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date5,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and a.invc_date <= :invc_date6" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_qntt else 0 end as month_qntt								")
				.where("          , case when a.invc_date >= DATE_FORMAT(LAST_DAY(DATE_FORMAT(:invc_date7,'%Y-%m-%d %T') - interval 1 month)+ interval 1 day,'%Y%m%d')", arg.getParamText("invc2_date"))
				.where("                 and a.invc_date <= :invc_date8" , arg.getParamText("invc2_date"))
				.where("                 then b.invc_amnt else 0 end as month_amnt								")
			;
		}
		data.param
			.where("   from  acpt_mast a, acpt_item b														")
			.where("         left outer join acpt_prod_spec p on b.invc_numb = p.invc_numb and b.amnd_degr = p.amnd_degr and b.line_seqn = p.line_seqn")
			.where("   where a.invc_numb = b.invc_numb														")
		;
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("    and a.acpt_dvcd = '1000'															")
				.where("    and a.acpt_stat_dvcd != '0010'														")
			;
		}
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")) {
			data.param
				.where("   and ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'						")
			;
		}

		data.param
			.where("   and a.find_name	like %:find_name%	" , arg.getParamText("find_name" ))
			.where("   and a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("   and a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("   and b.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("   and i.lcls_idcd   = :lcls_idcd		" , arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("   and i.mcls_idcd   = :mcls_idcd		" , arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("   and i.scls_idcd   = :scls_idcd		" , arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("   and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("   and p.item_bacd   = :item_clss_bacd		"	, arg.getParameter("item_clss_bacd"))
			.where("   and a.line_clos   <> 1																")
			.where(" )																						")
			.where("select a.item_idcd																		")
			.where("     , i.item_name , i.item_spec , i.item_code											")
			.where("     , sum(invc_qntt)   as invc_qntt   , sum(invc_amnt)   as invc_amnt					")
			.where("     , sum(month_qntt) as month_qntt   , sum(month_amnt) as month_amnt					")
			.where("from acpt a																				")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd								")
			.where("group by a.item_idcd																	")
			.where("having ifnull(invc_qntt, 0) != 0														")
//			.where("and ifnull(invc_amnt, 0) != 0															")
			.where("order by i.item_name																	")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
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
			.query("        , i.item_spec      , i.modl_name      , u.unit_name												")
			.query("        , a.crte_urif      , b.invc_date      , c.cstm_name      , i.item_code      , i.item_name		")
//			.query("        , ifnull(a.invc_qntt,0)- ifnull(a.dsct_qntt,0) - ifnull(a.ostt_qntt,0) as qntt					")
			.query("        , (select base_name from base_mast bs where d.item_clss_bacd = bs.base_code and bs.prnt_idcd = '8001'	) as item_clss_bacd_name")
			.query("        , (select base_name from base_mast bs where bs.base_code = p.item_bacd    and bs.prnt_idcd = '8002') as item_bacd_name")
		;
		data.param
			.where("from    acpt_item a 																					")
			.where("        left outer join acpt_mast b on a.invc_numb = b.invc_numb										")
			.where("        left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd										")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("        left outer join unit_mast u on i.unit_idcd = u.unit_code										")
			.where("        left outer join item_desc d on a.item_idcd = d.item_idcd and d.line_seqn = 1					")
			.where("        left outer join acpt_prod_spec p on a.invc_numb = p.invc_numb and a.amnd_degr = p.amnd_degr and a.line_seqn = p.line_seqn			")
			.where("where   1=1																								")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("    and ifnull(json_value(b.json_data, '$.prod_trst_dvcd'),'') != '2000'										")
			;
		}
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("    and a.acpt_stat_dvcd != '0010'																	")
			;
		}

		data.param
			.where("and     b.invc_date	=:invc_date			" , arg.getParamText("invc_date"))		// 날짜별 용 date
			.where("and     b.invc_date	>=:invc1_date		" , arg.getParamText("invc1_date"))
			.where("and     b.invc_date	<=:invc2_date		" , arg.getParamText("invc2_date"))
			.where("and     b.find_name like :find_name		" , arg.getParamText("find_name"))
			.where("and     b.cstm_idcd	=:cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where("and     a.item_idcd	=:item_idcd			" , arg.getParamText("item_idcd"))
			.where("and     d.item_clss_bacd   = :item_clss_bacd		"	, arg.getParameter("item_clss_bacd"))
			.where("and     b.line_clos	<>	1")
			.where("and     b.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.invc_date	desc																				")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch5(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");


		String hq = arg.hq;

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param
			.query("select s.deli_date, s.cstm_idcd, s.cstm_code, s.item_idcd, s.cstm_name, s.item_code, s.item_name, s.item_spec							")
			.query("     , s.invc_qntt, s.invc_pric, s.sply_amnt, s.vatx_amnt, s.invc_amnt, s.invc_numb														");

		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("     , case when s.deli_date is null or s.cstm_idcd is null or s.item_idcd is null then '' else s.ostt_work_cont_1 end ostt_work_cont_1	")
				.query("     , case when s.deli_date is null or s.cstm_idcd is null or s.item_idcd is null then '' else s.ostt_work_cont_2 end ostt_work_cont_2	")
				.query("     , s.dlvy_addr                , s.user_memo      , s.dely_cstm_name      , s.tele_numb      , s.line_seqn							")
			;
		}

		data.param
			.where(" from (																																	")
			.where("       select b.deli_date, a.cstm_idcd, c.cstm_code, c.cstm_name, b.item_idcd  , d.item_code , d.item_name , d.item_spec				")
			.where("            , b.invc_qntt, b.invc_pric, b.sply_amnt, b.vatx_amnt, b.invc_amnt  , b.invc_numb , b.line_seqn								");

		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("        , (select ostt_work_cont from ostt_work_mast where cstm_idcd = a.cstm_idcd and item_idcd = '-') as ostt_work_cont_1			")
				.where("        , (select ostt_work_cont from ostt_work_mast where cstm_idcd = a.cstm_idcd and item_idcd = b.item_idcd) as ostt_work_cont_2	")
				.where("        , concat(e.dlvy_addr_1fst, ' ', ifnull(e.dlvy_addr_2snd, '')) as dlvy_addr													")
				.where("        , b.user_memo                 , e.dely_cstm_name																			")
				.where("        , CASE																														")
				.where("              WHEN e.dlvy_tele_numb IS NOT NULL AND e.dlvy_tele_numb != '' THEN e.dlvy_tele_numb									")
				.where("              ELSE IFNULL(e.dlvy_hdph_numb, '')																						")
				.where("        END as tele_numb																											")
			;
		}

		data.param
			.where("         from acpt_mast a																												")
			.where("              left outer join acpt_item b on b.invc_numb = a.invc_numb																	")
			.where("              left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd																	")
			.where("              left outer join item_mast d on d.item_idcd = b.item_idcd																	")
			.where("              left outer join cstm_deli e on e.cstm_idcd = a.cstm_idcd and e.dlvy_cstm_idcd = a.dlvy_cstm_idcd							")
			.where("        where 1 = 1																														");
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("          and ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'		")
			;
		}
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("    and a.acpt_stat_dvcd != '0010'													")
			;
		}
		data.param
			.where("          and a.find_name like :find_name	" , arg.getParamText("find_name"))
			.where("          and b.deli_date >= :invc1_date	" , arg.getParamText("invc1_date"))
			.where("          and b.deli_date <= :invc2_date	" , arg.getParamText("invc2_date"))
			.where("          and a.cstm_idcd =  :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("          and a.drtr_idcd =  :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("          and b.item_idcd =  :item_idcd		" , arg.getParamText("item_idcd"))
			.where("          and a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("          and a.line_clos	<>	1")
			.where("          and ifnull(json_value(a.json_data,'$.prod_trst_dvcd'),'')	<>	2000")
			.where("     ) s																																")
			.where("     order by s.deli_date asc , s.invc_numb desc																						")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch6(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String hq = arg.hq;

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param
			.query("select s.deli_date, s.cstm_idcd, s.cstm_code, s.item_idcd, s.cstm_name, s.item_code, s.item_name, s.item_spec							")
			.query("     , s.invc_qntt, s.invc_pric, s.sply_amnt, s.vatx_amnt, s.invc_amnt, s.invc_numb, s.invc_date										")
			.query("     , case when s.deli_date is null or s.cstm_idcd is null or s.item_idcd is null then '' else s.ostt_work_cont_1 end ostt_work_cont_1	")
			.query("     , case when s.deli_date is null or s.cstm_idcd is null or s.item_idcd is null then '' else s.ostt_work_cont_2 end ostt_work_cont_2	")
			.query("     , s.dlvy_addr, s.user_memo, s.dely_cstm_name, s.tele_numb , s.line_seqn															")
		;
		data.param
			.where(" from (																																	")
			.where("       select b.deli_date, a.cstm_idcd, c.cstm_code, c.cstm_name, b.item_idcd  , d.item_code , d.item_name , d.item_spec				")
			.where("            , b.invc_qntt, b.invc_pric, b.sply_amnt, b.vatx_amnt, b.invc_amnt  , a.invc_numb , a.invc_date , b.line_seqn				")
			.where("            , (select ostt_work_cont from ostt_work_mast where cstm_idcd = a.cstm_idcd and item_idcd = '-') as ostt_work_cont_1			")
			.where("            , (select ostt_work_cont from ostt_work_mast where cstm_idcd = a.cstm_idcd and item_idcd = b.item_idcd) as ostt_work_cont_2	")
			.where("            , concat(e.dlvy_addr_1fst, ' ', e.dlvy_addr_2snd) as dlvy_addr																")
			.where("            , b.user_memo                 , e.dely_cstm_name																			")
			.where("            , CASE																														")
			.where("                  WHEN e.dlvy_tele_numb IS NOT NULL AND e.dlvy_tele_numb != '' THEN e.dlvy_tele_numb									")
			.where("                  ELSE IFNULL(e.dlvy_hdph_numb, '')																						")
			.where("              END as tele_numb																											")
		;
		data.param
			.where("         from acpt_mast a																												")
			.where("              left outer join acpt_item b on b.invc_numb = a.invc_numb																	")
			.where("              left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd																	")
			.where("              left outer join item_mast d on d.item_idcd = b.item_idcd																	")
			.where("              left outer join cstm_deli e on e.cstm_idcd = a.cstm_idcd and e.dlvy_cstm_idcd = a.dlvy_cstm_idcd							")
			.where("        where 1 = 1																														")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")) {
			data.param
				.where("         and ifnull(json_value(a.json_data, '$.prod_trst_dvcd'),'') != '2000'						")
			;
		}
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("    and a.acpt_stat_dvcd != '0010'																	")
			;
		}
		data.param
			.where("          and a.find_name like :find_name	" , arg.getParamText("find_name"))
			.where("          and b.deli_date >= :invc1_date	" , arg.getParamText("invc1_date"))
			.where("          and b.deli_date <= :invc2_date	" , arg.getParamText("invc2_date"))
			.where("          and a.cstm_idcd =  :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("          and a.drtr_idcd =  :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("          and b.item_idcd =  :item_idcd		" , arg.getParamText("item_idcd"))
			.where("          and a.acpt_dvcd =  :acpt_dvcd		" , arg.getParamText("acpt_dvcd"))
			.where("          and a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("          and a.line_clos	<>	1")
			.where("     ) s																																")
			.where("     order by s.invc_date desc, s.invc_numb desc																						")
		;
		return data.selectForMap();
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
			.query("        , i.item_spec      , i.modl_name      , u.unit_name      , d.item_wigt      , p.drwg_numb		")
			.query("        , a.crte_urif      , b.invc_date      , c.cstm_name      , i.item_code      , i.item_name		")
			.query("        , ifnull(a.invc_qntt,0)- ifnull(a.dsct_qntt,0) - ifnull(a.ostt_qntt,0) as qntt					")
			.query("        , (select base_name from base_mast bs where d.item_clss_bacd = bs.base_code and bs.prnt_idcd = '8001'	) as item_clss_bacd_name")
			.query("        , (select base_name from base_mast bs where bs.base_code = p.item_bacd    and bs.prnt_idcd = '8002') as item_bacd_name")
			.query("     , REPLACE(json_extract(a.json_data, '$.cstm_prcs_numb'),'\"','') as 	cstm_prcs_numb				")
			.query("     , REPLACE(json_extract(a.json_data, '$.cstm_mold_code'),'\"','') as 	cstm_mold_code				")
			.query("        , b.pcod_numb																					")
			.query("        , CASE																							")
			.query("              WHEN e.dlvy_tele_numb IS NOT NULL AND e.dlvy_tele_numb != '' THEN e.dlvy_tele_numb		")
			.query("              ELSE IFNULL(e.dlvy_hdph_numb, '')															")
			.query("        END as tele_numb																				")
		;
		data.param
			.where("from    acpt_item a 																					")
			.where("        left outer join acpt_mast b on a.invc_numb = b.invc_numb										")
			.where("        left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd										")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("        left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
			.where("        left outer join item_desc d on a.item_idcd = d.item_idcd and d.line_seqn = 1					")
			.where("        left outer join cstm_deli e on e.cstm_idcd = b.cstm_idcd and e.dlvy_cstm_idcd = b.dlvy_cstm_idcd")
			.where("        left outer join acpt_prod_spec p on a.invc_numb = p.invc_numb and a.amnd_degr = p.amnd_degr and a.line_seqn = p.line_seqn			")
			.where("where   1 = 1																							")
		;
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")) {
			data.param
				.where("and ifnull(json_value(b.json_data, '$.prod_trst_dvcd'),'') != '2000'											")
			;
		}
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("and     a.deli_date	=:deli_date			" , arg.getParamText("deli_date"))		// 날짜별 용 date
				.where("and     a.deli_date	>=:invc1_date		" , arg.getParamText("invc1_date"))
				.where("and     a.deli_date	<=:invc2_date		" , arg.getParamText("invc2_date"))
				.where("and     b.acpt_dvcd = '1000'											")
				.where("and     b.acpt_stat_dvcd != '0010'										")
			;
		}else{
			data.param
				.where("and     b.invc_date	=:invc_date			" , arg.getParamText("invc_date"))		// 날짜별 용 date
				.where("and     b.invc_date	>=:invc1_date		" , arg.getParamText("invc1_date"))
				.where("and     b.invc_date	<=:invc2_date		" , arg.getParamText("invc2_date"))
			;
		}
		data.param
			.where("and     b.find_name like :find_name		" , arg.getParamText("find_name"))
			.where("and     b.cstm_idcd	=:cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where("and     b.drtr_idcd	=:drtr_idcd			" , arg.getParamText("drtr_idcd"))
			.where("and     a.item_idcd	=:item_idcd			" , arg.getParamText("item_idcd"))
			.where("and     b.line_clos	<>	1")
			.where("and     b.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		if (((String) arg.getParameter("stor_id")).toUpperCase().equals("N1000SJUNG1000")) {
			data.param
				.where("order by deli_date desc		")
			;
		}else{
			data.param
				.where("order by invc_date desc		")
			;
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
