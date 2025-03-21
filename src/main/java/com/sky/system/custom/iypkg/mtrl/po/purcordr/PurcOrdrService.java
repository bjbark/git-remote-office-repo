package com.sky.system.custom.iypkg.mtrl.po.purcordr;


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


@Service("iypkg.PurcOrdrService")
public class PurcOrdrService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from ( 																											")
			.where("with cte as ( 																									")
			.where("     select a.invc_numb       , a.line_seqn       , a.invc_date as crt_date       , a.invc_date					")
			.where("          , a.cstm_idcd       , c.cstm_name       , a.item_idcd as fabc_idcd      , ifnull(a.fabc_name,f.fabc_name) as	fabc_name")
			.where("          , f.fabc_code       , ba.ppln_dvcd      , ba.item_fxqt                  , a.subt_qntt					")
			.where("          , a.offr_qntt       , a.fdat_spec																		")
			.where("          , ( select sum(p.istt_qntt) as istt_qntt																")
			.where("              from purc_istt_item p																				")
			.where("              where p.orig_invc_numb =  a.invc_numb and p.orig_seqn =  a.line_seqn								")
			.where("              group by a.orig_invc_numb, a.orig_seqn															")
			.where("          ) as istt_qntt																						")
			.where("          , a.offr_qntt - ifnull(( select sum(p.istt_qntt) as istt_qntt											")
			.where("              from purc_istt_item p																				")
			.where("              where p.orig_invc_numb =  a.invc_numb and p.orig_seqn =  a.line_seqn								")
			.where("              group by a.orig_invc_numb, a.orig_seqn															")
			.where("          ),0) as unistt      , a.deli_date     , c2.cstm_name as acpt_cstm_name								")
			.where("          , ba.invc_numb as acpt_invc_numb        , ba.line_seqn as acpt_line_seqn, bx.prod_name     , a.cstm_code")
			.where("          , a.remk_text       , ifnull(ba.item_ttln,'0') as item_ttln ,ifnull(ba.item_widh,'0') as item_widh	")
			.where("     from																										")
			.where("     ( select a.invc_numb   , a.line_seqn   , a.item_idcd   , a.offr_qntt      , a.item_name as fabc_name		")
			.where("            , b.cstm_idcd   , b.invc_date   , json_value(b.json_data , '$**.offr_path_dvcd') as offr_path_dvcd	")
			.where("            , a.orig_invc_numb, a.orig_seqn , b.deli_date   , json_value(a.json_data , '$**.fdat_spec') as fdat_spec	")
			.where("            , c.cstm_code   , b.remk_text   , json_value(a.json_data , '$**.subt_qntt') as subt_qntt			")
			.where("       from purc_ordr_item a																					")
			.where("       left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb											")
			.where("       left outer join cstm_mast	  c on a.cstm_idcd = c.cstm_idcd											")
			.where("       where 1=1																								")
			.where("       and   json_value(b.json_data , '$**.offr_path_dvcd') = '1'												")
			.where("       and   b.invc_date >= :invc_date1			" , arg.getParamText("fr_invc_date"))
			.where("       and   b.invc_date <= :invc_date2			" , arg.getParamText("to_invc_date"))
			.where("       and   a.find_name like %:find_name		" , arg.getParamText("find_name"))
			.where("      ) a 																										")
			.where("      left outer join cstm_mast  c on a.cstm_idcd = c.cstm_idcd													")
			.where("      left outer join fabc_mast f on a.item_idcd = f.fabc_idcd													")
			.where("      left outer join boxx_acpt	bx on a.orig_invc_numb = bx.invc_numb											")
			.where("      left outer join product_mast p on bx.prod_idcd = p.prod_idcd												")
			.where("      left outer join boxx_acpt_bom	ba on a.orig_invc_numb = ba.invc_numb and a.orig_seqn = ba.line_seqn		")
			.where("      left outer join cstm_mast c2 on bx.cstm_idcd = c2.cstm_idcd												")
			.where("      where 1=1 																								")
			.where("      and   fabc_code  = :fabc_code1		" , arg.getParamText("fabc_code"))
			.where("      and   fabc_code  = :fabc_code2		" , arg.getParamText("fabc_code2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.crt_date 															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.fabc_idcd															")
			.where("       , a.fabc_name															")
			.where("       , a.fabc_code															")
			.where("       , a.ppln_dvcd															")
			.where("       , a.fdat_spec															")
			.where("       , a.item_fxqt															")
			.where("       , a.offr_qntt															")
			.where("       , a.istt_qntt															")
			.where("       , a.unistt																")
			.where("       , a.deli_date															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.acpt_invc_numb														")
			.where("       , a.acpt_line_seqn														")
			.where("       , a.prod_name															")
			.where("       , 1 as rnum																")
			.where("       , count(*) as cnt														")
			.where("       , a.invc_numb as crt_numb												")
			.where("       , a.cstm_code															")
			.where("       , a.remk_text															")
			.where("       , a.item_ttln															")
			.where("       , a.item_widh															")
			.where("       , a.subt_qntt															")
			.where(" from cte a																		")
			.where(" group by a.invc_date, a.invc_numb, a.line_seqn, a.fabc_idcd, a.cstm_idcd		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date as crt_date												")
					.where("       , a.invc_date															")
					.where("       , null as cstm_idcd														")
					.where("       , concat(a.cstm_name,'계') as cstm_name									")
					.where("       , a.fabc_idcd															")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fdat_spec														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , null as istt_qntt														")
					.where("       , null as unistt															")
					.where("       , null as deli_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
					.where("       , null as prod_name														")
					.where("       , 2 as rnum																")
					.where("       , count(*) as cnt														")
					.where("       , max(a.invc_numb) as crt_numb											")
					.where("       , null as cstm_code														")
					.where("       , null as remk_text														")
					.where("       , null as item_ttln														")
					.where("       , null as item_widh														")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where(" from cte a																		")
					.where(" group by a.invc_date, a.invc_numb												")
					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date as crt_date												")
					.where("       , a.invc_date															")
					.where("       , null as cstm_idcd														")
					.where("       , '일계' as cstm_name														")
					.where("       , null as fabc_idcd														")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fdat_spec														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , null as istt_qntt														")
					.where("       , null as unistt															")
					.where("       , null as deli_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
					.where("       , null as prod_name														")
					.where("       , 3 as rnum																")
					.where("       , count(*) as cnt														")
					.where("       , max(a.invc_numb) as crt_numb											")
					.where("       , null as cstm_code														")
					.where("       , null as remk_text														")
					.where("       , null as item_ttln														")
					.where("       , null as item_widh														")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where(" from cte a																		")
					.where(" group by a.invc_date															")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , concat(substr(a.invc_date, 1, 6), '00') as crt_date					")
					.where("       , substr(a.invc_date, 1, 6) as invc_date									")
					.where("       , null as cstm_idcd														")
					.where("       , '월계' as cstm_name														")
					.where("       , null as fabc_idcd														")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fdat_spec														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , null as istt_qntt														")
					.where("       , null as unistt															")
					.where("       , null as deli_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
					.where("       , null as prod_name														")
					.where("       , 4 as rnum																")
					.where("       , count(*) as cnt														")
					.where("       , max(a.invc_numb) as crt_numb											")
					.where("       , null as cstm_code														")
					.where("       , null as remk_text														")
					.where("       , null as item_ttln														")
					.where("       , null as item_widh														")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where(" from cte a																		")
					.where(" group by substr(a.invc_date, 1, 6)												")
				;
			}
			if(arg.getParamText("chk" ).contains("4")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , '11111111' as crt_date													")
					.where("       , '합계' as invc_date														")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , null as fabc_idcd														")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fdat_spec														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , null as istt_qntt														")
					.where("       , null as unistt															")
					.where("       , null as deli_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
					.where("       , null as prod_name														")
					.where("       , 5 as rnum																")
					.where("       , count(*) as cnt														")
					.where("       , max(a.invc_numb) as crt_numb											")
					.where("       , null as cstm_code														")
					.where("       , null as remk_text														")
					.where("       , null as item_ttln														")
					.where("       , null as item_widh														")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where(" from cte a																		")
					.where(" group by '11111111'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date desc , crt_numb, rnum												")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
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
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("with cte as ( 																						")
			.where("     select a.invc_numb       , a.line_seqn       , a.invc_date       , a.cstm_idcd					")
			.where("          , c.cstm_name       , p.prod_idcd       , a.prod_name										")
			.where("          , concat(p.prod_leng, '*', p.prod_widh, '*', p.prod_hght)    as prod_spec					")
			.where("          , a.acpt_qntt       , a.deli_date       , a.fabc_idcd       , a.fabc_name					")
			.where("          , f.fabc_code       , f.ppln_dvcd       , a.fdat_spec       , a.item_fxqt					")
			.where("          , a.need_qntt       , ifnull(a.offr_qntt,0) as offr_qntt    , a.pcod_numb					")
			.where("          , a.need_qntt - ifnull(a.offr_qntt,0) as unoffr             , a.invc_date as crt_date		")
			.where("     from																							")
			.where("     ( select a.invc_numb   , a.line_seqn   , a.fabc_idcd   , a.fdat_spec   , a.fabc_name			")
			.where("            , a.item_fxqt   , a.need_qntt   , b.cstm_idcd   , b.prod_idcd   , b.prod_name			")
			.where("            , b.acpt_qntt   , b.deli_date   , b.invc_date   , b.pcod_numb   , a.offr_qntt			")
			.where("       from boxx_acpt_bom a																			")
			.where("       left outer join boxx_acpt b on a.invc_numb = b.invc_numb										")
			.where("       where 1=1																					")
			.where("       and   b.line_clos = 0																		")
			.where("       and   b.line_stat  < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("       and   b.invc_date >= :invc_date1			" , arg.getParamText("fr_invc_date"))
			.where("       and   b.invc_date <= :invc_date2			" , arg.getParamText("to_invc_date"))
			.where("       and   a.find_name like %:find_name		" , arg.getParamText("find_name"))
			.where("     ) a 																							")
			.where("     left outer join product_mast p on a.prod_idcd = p.prod_idcd									")
			.where("     left outer join cstm_mast    c on a.cstm_idcd = c.cstm_idcd									")
			.where("     left outer join fabc_mast    f on a.fabc_idcd = f.fabc_idcd									")
			.where("     where 1=1																						")
			.where("     and   a.need_qntt - ifnull(a.offr_qntt,0) > 0													")
			.where("     and   f.fabc_code  = :fabc_code1		" , arg.getParamText("fabc_code"))
			.where("     and   f.fabc_code  = :fabc_code2		" , arg.getParamText("fabc_code2"))
			.where(")																									")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.prod_idcd															")
			.where("       , a.prod_name															")
			.where("       , a.prod_spec															")
			.where("       , a.acpt_qntt															")
			.where("       , a.deli_date															")
			.where("       , a.fabc_idcd															")
			.where("       , a.fabc_name															")
			.where("       , a.fabc_code															")
			.where("       , a.ppln_dvcd															")
			.where("       , a.fdat_spec															")
			.where("       , a.item_fxqt															")
			.where("       , a.need_qntt															")
			.where("       , a.offr_qntt															")
			.where("       , a.unoffr																")
			.where("       , a.pcod_numb															")
			.where("       , a.crt_date																")
			.where("       , 1 as rnum																")
			.where("       , null as cnt															")
			.where(" from cte a																		")
			.where(" where a.unoffr > 0																")
			.where(" ORDER BY crt_date desc, prod_idcd, rnum asc									")
			.where(") a																				")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select    a.invc_numb       , a.line_seqn       , a.invc_date       , a.cstm_idcd					")
			.where("		, c.cstm_name       , a.prod_idcd       , a.prod_name       , a.pcod_numb					")
			.where("		, a.acpt_qntt       , a.deli_date       , a.fabc_idcd       , a.fabc_name					")
			.where("		, f.fabc_code       , a.ppln_dvcd       , a.fdat_spec       , a.item_fxqt					")
			.where("		, a.need_qntt       , null as offr_qntt , a.invc_date as crt_date							")
			.where("		, a.need_qntt - ifnull(a.offr_qntt,0) as unoffr												")
			.where("		, a.mxm2_qntt       , a.mxm2_pric       , a.pqty_pric										")
			.where("		, null as offr_amnt , null as offr_vatx , null as ttsm_amnt									")
			.where("		, f.ppkd_dvcd       , a.item_spec       , c.cstm_code										")
			.where("		, a.item_scre_spec  , a.prod_code															")
			.where("		, a.item_ttln       , a.item_widh       , a.item_leng       , a.item_ttwd					")
			.where("		, a.acpt_numb																				")
			.where("     from																							")
			.where("     ( select a.invc_numb   , a.line_seqn   , a.fabc_idcd   , a.fdat_spec   , a.fabc_name			")
			.where("            , a.item_fxqt   , a.need_qntt   , b.cstm_idcd   , b.prod_idcd   , b.prod_name			")
			.where("            , b.acpt_qntt   , b.deli_date   , b.invc_date   , b.pcod_numb   , a.offr_qntt			")
			.where("            , a.ppln_dvcd   , concat(ifnull(a.item_ttln,'0'),'*',ifnull(a.item_widh,'0'))  as item_spec		")
			.where("            , concat (b.item_leng,'+', b.item_widh ,'+' ,b.item_hght) as item_scre_spec				")
			.where("            , a.mxm2_qntt   , a.mxm2_pric   , a.pqty_pric   , pm.prod_code							")
			.where("            , sum(ifnull(json_value(p.json_data,'$**.subt_qntt'),0)) as subt_qntt					")
			.where("            , a.item_ttln   , a.item_widh   , a.item_leng   , a.item_ttwd							")
			.where("            , b.invc_numb as acpt_numb																")
			.where("       from boxx_acpt_bom a																			")
			.where("       left outer join boxx_acpt b on a.invc_numb = b.invc_numb										")
			.where("       left outer join product_mast  pm on b.prod_idcd = pm.prod_idcd								")
			.where("       left outer join purc_ordr_item p on a.invc_numb =  p.orig_invc_numb							")
			.where("                                       and a.line_seqn =  p.orig_seqn								")
			.where("       where 1=1																					")
			.where("       and   b.line_clos = 0																		")
			.where("       and   b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("       and   b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("       and   b.prod_idcd   = :prod_idcd			" , arg.getParamText("prod_idcd" ))
			.where("       and   b.cstm_idcd   = :cstm_idcd			" , arg.getParamText("cstm_idcd" ))
			.where("       and   a.fabc_idcd   = :fabc_idcd			" , arg.getParamText("fabc_idcd" ))
			.where("       and   b.invc_numb like %:invc_numb%		" , arg.getParamText("invc_numb" ))
			.where("       and   a.find_name like %:find_name%		" , arg.getParamText("find_name"))
			.where("       and   b.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("       group by a.invc_numb,a.line_seqn																")
			.where("     ) a 																							")
			.where("     left outer join cstm_mast    c on a.cstm_idcd = c.cstm_idcd									")
			.where("     left outer join fabc_mast    f on a.fabc_idcd = f.fabc_idcd									")
			.where("where  1=1																							")
			.where("and    a.need_qntt - (ifnull(a.offr_qntt,0)+ifnull(a.subt_qntt,0)) > 0								")
			.where("order by a.invc_date desc, f.fabc_idcd limit 999999													")
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getCode(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select  concat(DATE_FORMAT(now(),'%y%m%d'), a.cstm_code) as code ")
		;
		data.param
			.where("from cstm_mast a											")
			.where("where a.cstm_idcd = :cstm_idcd",arg.getParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getCount(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select CONCAT(date_format(now(), '%y%m%d'),									")
			.query("		 '" + arg.getParameter("cstm_idcd") + "' 							")
			.query("		, LPAD(COUNT(*) + 1, 2, '0')) AS invc_numb							")
		;
		data.param
			.where("from purc_ordr_mast									")
			.where("where invc_numb like concat(date_format(now(),'%y%m%d'),cstm_idcd,'%')	")
		;
		return data.selectForMap();
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {

			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "purc_ordr_mast_json_fields");
			String json2 = p.TranslateRow(arg, row, "purc_ordr_item_json_fields");

			if(i == 0){
				//등록
				data.param
					.table ("purc_ordr_mast")
					.where ("where invc_numb = :invc_numb")
					.where ("and   amnd_degr = :amnd_degr")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))		//INVOICE번호
					.unique("amnd_degr"        , 1 )									//차수

					.update("bzpl_idcd"        , row.getParameter("bzpl_idcd"))			//사업장ID
					.update("offr_dvcd"        , 1200						)			//발주구분코드
					.update("invc_date"        , row.getParameter("offr_date"))			//발주일자
					.update("drtr_idcd"        , row.getParameter("updt_idcd"))			//담당자ID
					.update("cstm_idcd"        , row.getParameter("offr_cstm_idcd"))	//거래처ID
					.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
					.update("json_data"        , json						)			//jsondata

					.update("uper_seqn"			, row.getParameter("uper_seqn"))		//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"))		//하위순번
					.update("user_memo"			, row.getParameter("user_memo"))		//사용자메모
					.update("remk_text"			, row.getParameter("remk_text"))		//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"))		//시스템메모
					.update("updt_user_name"	, row.getParameter("updt_user_name"))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"))		//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"))		//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"))		//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"))		//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))		//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"))		//생성UI
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("purc_ordr_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   amnd_degr = :amnd_degr")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("amnd_degr"        , 1 )
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("item_idcd"        , row.getParameter("fabc_idcd"))			//품목ID
					.update("cstm_idcd"        , row.getParameter("offr_cstm_idcd"))	//거래처ID
					.update("offr_qntt"        , row.getParameter("offr_qntt"))			//발주수량
					.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
					.update("unit_idcd"        , row.getParameter("unit_idcd"))			//단위ID
					.update("orig_invc_numb"   , row.getParameter("invc_numb"))			//원INVOICE번호
					.update("vatx_incl_yorn"   , 1							)			//자료구분 = 부가세포함여부
					.update("orig_seqn"        , row.getParameter("line_seqn"))			//원순번
					.update("offr_pric"        , row.getParameter("pqty_pric"))			//개당단가
					.update("offr_amnt"        , row.getParameter("offr_amnt"))			//발주금액
					.update("offr_vatx"        , row.getParameter("offr_vatx"))			//발주부가세
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//합계금액
					.update("json_data"        , json2						)			//jsondata
					.update("find_name"        , row.getParameter("fabc_name")
												+ "	"
												+ row.getParameter("fabc_code"))		//찾기명
					.update("uper_seqn"			, row.getParameter("uper_seqn"))		//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"))		//하위순번
					.update("user_memo"			, row.getParameter("user_memo"))		//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"))		//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))		//상위ID
					.update("line_levl"			, row.getParameter("line_levl"))		//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"))		//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"))		//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"))		//마감여부
					.update("updt_user_name"	, row.getParameter("updt_user_name"))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"))		//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"))		//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"))		//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"))		//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))		//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"))		//생성UI
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				temp.param
					.query("select ifnull(offr_qntt,0) as offr_qntt	")
					.query("from  boxx_acpt_bom 					")
					.query("where invc_numb = :invc_numb		", row.fixParameter("invc_numb"))
					.query("and   line_seqn = :line_seqn		", row.fixParameter("line_seqn"))
				;
				SqlResultRow qntt = temp.selectForRow();
				temp.clear();

				Double t  = Double.parseDouble(qntt.getParamText("offr_qntt"));
				int t2 = Integer.parseInt((String)row.getParameter("offr_qntt"));
				int q = (int)(t+t2);

				data.param
					.table ("boxx_acpt_bom")
					.where ("where invc_numb = :invc_numb1")
					.where ("and   line_seqn = :line_seqn1")

					.unique("invc_numb1"        , row.fixParameter("invc_numb"))
					.unique("line_seqn1"        , row.fixParameter("line_seqn"))

					.update("offr_yorn"        , 1)	//발주여부
					.update("fdat_spec"        , row.getParameter("fdat_spec"))		//재단규격변경
					.update("offr_date"        , row.getParameter("offr_date"))		//발주일자
					.update("offr_numb"        , row.fixParameter("new_invc_numb"))	//발주번호
					.update("item_ttln"        , row.getParameter("item_ttln"))		//jsondata
					.update("item_widh"        , row.getParameter("item_widh"))		//jsondata
					.update("offr_qntt"        , q)									//발주수량
				;
				data.attach(Action.update);
				data.execute();
				data.clear();


				i =+ 1;

			}else{
				data.param
					.table ("purc_ordr_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   amnd_degr = :amnd_degr")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("amnd_degr"        , 1 )
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("item_idcd"        , row.getParameter("fabc_idcd"))			//품목ID
					.update("cstm_idcd"        , row.getParameter("offr_cstm_idcd"))	//거래처ID
					.update("offr_qntt"        , row.getParameter("offr_qntt"))			//발주수량
					.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
					.update("unit_idcd"        , row.getParameter("unit_idcd"))			//단위ID
					.update("orig_invc_numb"   , row.getParameter("invc_numb"))			//원INVOICE번호
					.update("vatx_incl_yorn"   , 1							)			//자료구분 = 부가세포함여부
					.update("orig_seqn"        , row.getParameter("line_seqn"))			//원순번
					.update("offr_pric"        , row.getParameter("pqty_pric"))			//개당단가
					.update("offr_amnt"        , row.getParameter("offr_amnt"))			//발주금액
					.update("offr_vatx"        , row.getParameter("offr_vatx"))			//발주부가세
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//합계금액
					.update("json_data"        , json2						)			//jsondata
					.update("find_name"        , row.getParameter("fabc_name")
												+ "	"
												+ row.getParameter("fabc_code"))		//찾기명
					.update("uper_seqn"			, row.getParameter("uper_seqn"))		//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"))		//하위순번
					.update("user_memo"			, row.getParameter("user_memo"))		//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"))		//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))		//상위ID
					.update("line_levl"			, row.getParameter("line_levl"))		//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"))		//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"))		//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"))		//마감여부
					.update("updt_user_name"	, row.getParameter("updt_user_name"))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"))		//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"))		//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"))		//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"))		//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))		//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"))		//생성UI
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				temp.param
					.query("select ifnull(offr_qntt,0) as offr_qntt	")
					.query("from  boxx_acpt_bom 					")
					.query("where invc_numb = :invc_numb		", row.fixParameter("invc_numb"))
					.query("and   line_seqn = :line_seqn		", row.fixParameter("line_seqn"))
				;
				SqlResultRow qntt = temp.selectForRow();
				temp.clear();

				Double t  = Double.parseDouble(qntt.getParamText("offr_qntt"));
				int t2 = Integer.parseInt((String)row.getParameter("offr_qntt"));
				int q = (int)(t+t2);

				data.param
					.table ("boxx_acpt_bom")
					.where ("where invc_numb = :invc_numb2")
					.where ("and   line_seqn = :line_seqn2")

					.unique("invc_numb2"        , row.fixParameter("invc_numb"))
					.unique("line_seqn2"        , row.fixParameter("line_seqn"))

					.update("offr_yorn"        , 1)	//발주여부
					.update("fdat_spec"        , row.getParameter("fdat_spec"))		//재단규격변경
					.update("offr_date"        , row.getParameter("offr_date"))		//발주일자
					.update("offr_numb"        , row.fixParameter("new_invc_numb"))	//발주번호
					.update("item_ttln"        , row.getParameter("item_ttln"))		//jsondata
					.update("item_widh"        , row.getParameter("item_widh"))		//jsondata
					.update("offr_qntt"        , q)									//발주수량
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
		}
		return null;
	}

	public SqlResultMap setRecord2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {


			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "purc_ordr_item_json_fields");


		data.param
			.table("boxx_acpt_bom")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, row.fixParameter("acpt_numb"))


			.update("item_ttln"		, row.getParameter("item_ttln"))		//jsondata
			.update("item_widh"		, row.getParameter("item_widh"))		//jsondata
			;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("purc_ordr_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, row.fixParameter("invc_numb"))


			.update("remk_text"		, row.getParameter("remk_text"))		//jsondata
			;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("purc_ordr_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, row.fixParameter("invc_numb"))
			.unique("line_seqn"		, row.fixParameter("line_seqn"))


			.update("json_data"       , json						)			//jsondata
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
		DataMessage temp2 = arg.newStorage("POS");


		data.param
			.table("purc_ordr_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		temp2.param
			.query("select a.invc_numb, a.line_seqn, b.invc_date, b.cstm_idcd, m.offr_qntt	")
			.query("from  purc_ordr_item a													")
			.query("   left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb		")
			.query("   left outer join boxx_acpt_bom  m on a.orig_invc_numb = m.invc_numb and a.orig_seqn = m.line_seqn	")
			.query("where a.orig_invc_numb = :orig_invc_numb		", arg.fixParameter("acpt_invc_numb"))
			.query("and   a.orig_seqn      = :orig_seqn				", arg.fixParameter("acpt_line_seqn"))
			.query("order by a.crte_dttm desc												")
			.query("limit 1																	")
		;
		SqlResultRow seqn = temp2.selectForRow();


		if(seqn == null){
			data.param
				.table("boxx_acpt_bom")
				.where("where invc_numb = :invc_numb ")
				.where("and   line_seqn = :line_seqn ")

				.unique("invc_numb"		, arg.fixParameter("acpt_invc_numb"))
				.unique("line_seqn"		, arg.fixParameter("acpt_line_seqn"))

				.update("offr_numb"		, "")
				.update("offr_date"		, "")
				.update("offr_yorn"		, 0)
				.update("offr_qntt"		, 0)
			;
		}else{
			Double t  = Double.parseDouble(seqn.getParamText("offr_qntt"));
			int t2 = Integer.parseInt((String)arg.getParamText("offr_qntt"));
			int q = (int)(t-t2);
			data.param
				.table("boxx_acpt_bom")
				.where("where invc_numb = :invc_numb ")
				.where("and   line_seqn = :line_seqn ")

				.unique("invc_numb"		, arg.fixParameter("acpt_invc_numb"))
				.unique("line_seqn"		, arg.fixParameter("acpt_line_seqn"))

				.update("offr_numb"		, seqn.getParameter("invc_numb"))
				.update("offr_date"		, seqn.getParameter("invc_date"))
				.update("cstm_idcd"		, seqn.getParameter("cstm_idcd"))
				.update("offr_qntt"		, q)
			;
		}
		data.attach(Action.update);
		data.execute();
		data.clear();

		//item에 없으면 mast에서도 삭제되게끔
		temp.param
			.query("select if((b.line_seqn),'1','0') as yorn , m.offr_qntt			")
			.query("from  purc_ordr_mast a											")
			.query("left outer join purc_ordr_item b on a.invc_numb = b.invc_numb	")
			.query("left outer join boxx_acpt_bom  m on b.orig_invc_numb = m.invc_numb and b.orig_seqn = m.line_seqn	")
			.query("where a.invc_numb = :invc_numb		", arg.fixParameter("invc_numb"))
		;
		SqlResultRow yorn = temp.selectForRow();

		if(yorn.getParamText("yorn").equals("0")){
			data.param
				.table("purc_ordr_mast")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}

		return null;
	}


	public SqlResultMap getInvc(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id");
		String table		= arg.getParamText("table_nm");
		String invc_numb	= arg.getParamText("invc_numb");

		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		data.param
			.query("call fn_seq_gen_v2 (			")
			.query("   :STOR      "  , STOR			)
			.query(" , :table     "  , table		)
			.query(" , :invc_numb "  , invc_numb	)
			.query(" )								")
		;
		return data.selectForMap();
	}

}
