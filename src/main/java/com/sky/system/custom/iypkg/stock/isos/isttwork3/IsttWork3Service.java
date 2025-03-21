package com.sky.system.custom.iypkg.stock.isos.isttwork3;


import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("iypkg.IsttWork3Service")
public class IsttWork3Service extends DefaultServiceHandler {
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
			.where("     select a.invc_numb       , a.line_seqn       , b.invc_date       , b.cstm_idcd								")
			.where("          , c.cstm_name       , a.item_idcd as prod_idcd       , a.istt_qntt									")
			.where("          , a.istt_amnt       , a.istt_vatx       , a.ttsm_amnt       , ba.scre_spec							")
			.where("          , ba.prod_name      , c2.cstm_name as acpt_cstm_name        , b.invc_date as crt_date					")
			.where("          , p.orig_invc_numb as acpt_invc_numb    , p.orig_seqn as acpt_line_seqn								")
			.where("          , json_value(a.json_data, '$**.item_fxqt') as item_fxqt												")
			.where("          , json_value(a.json_data, '$**.subt_qntt') as subt_qntt												")
			.where("          , a.istt_pric as pqty_pric																			")
			.where("     from	purc_istt_mast b																					")
			.where("     left outer join purc_istt_item	 a on a.invc_numb = b.invc_numb												")
			.where("     left outer join cstm_mast       c on b.cstm_idcd = c.cstm_idcd												")
			.where("     left outer join purc_ordr_item  p on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn			")
			.where("     left outer join purc_ordr_mast pm on p.invc_numb = pm.invc_numb and json_value(pm.json_data, '$**.offr_path_dvcd')=3 		")
			.where("     left outer join boxx_acpt ba  on p.orig_invc_numb = ba.invc_numb													")
			.where("      left outer join cstm_mast     c2  on ba.cstm_idcd = c2.cstm_idcd											")
			.where("      where 1=1																									")
			.where("      and   b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("      and   ba.pcod_numb = :pcod_numb			" , arg.getParamText("pcod_numb"))
			.where("      and   ba.prod_idcd = :prod_idcd			" , arg.getParamText("prod_idcd"))
			.where("      and   ba.acpt_dvcd = '4000'												")
			.where("      and   b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("      and   c2.cstm_idcd = :cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where("      and   c.cstm_idcd  = :cstm_idcd			" , arg.getParamText("cstm_idcd2"))
			.where("      and   find_name like %:find_name			" , arg.getParamText("find_name"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.prod_idcd															")
			.where("       , a.prod_name															")
			.where("       , a.item_fxqt															")
			.where("       , a.istt_qntt															")
			.where("       , a.subt_qntt															")
			.where("       , a.pqty_pric															")
			.where("       , a.istt_amnt															")
			.where("       , a.istt_vatx															")
			.where("       , a.ttsm_amnt															")
			.where("       , a.scre_spec															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.crt_date																")
			.where("       , a.acpt_invc_numb														")
			.where("       , a.acpt_line_seqn														")
			.where("       , 1 as rnum																")
			.where("       , count(*) as cnt														")
			.where(" from cte a																		")
			.where(" group by a.invc_date, a.invc_numb,a.prod_idcd, a.line_seqn, a.cstm_idcd		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date															")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , a.prod_idcd															")
					.where("       , concat(a.prod_name,' ',' 계') as prod_name								")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as pqty_pric														")
					.where("       , null as istt_amnt														")
					.where("       , null as istt_vatx														")
					.where("       , null as ttsm_amnt														")
					.where("       , null as scre_spec														")
					.where("       , null as acpt_cstm_name													")
					.where("       , a.invc_date as crt_date												")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
					.where("       , 2 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.invc_date, a.prod_idcd												")
					.where(" having cnt >= 1																")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date															")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , max(a.prod_idcd) as prod_idcd											")
					.where("       , '일계' as prod_name														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as pqty_pric														")
					.where("       , null as istt_amnt														")
					.where("       , null as istt_vatx														")
					.where("       , null as ttsm_amnt														")
					.where("       , null as scre_spec														")
					.where("       , null as acpt_cstm_name													")
					.where("       , a.invc_date as crt_date												")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
					.where("       , 3 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.invc_date															")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , substr(a.invc_date,1,6) as invc_date 									")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , max(a.prod_idcd) as prod_idcd											")
					.where("       , '월계' as prod_name														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as pqty_pric														")
					.where("       , null as istt_amnt														")
					.where("       , null as istt_vatx														")
					.where("       , null as ttsm_amnt														")
					.where("       , null as scre_spec														")
					.where("       , null as acpt_cstm_name													")
					.where("       , concat(substr(a.invc_date, 1, 6), '99') as crt_date					")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
					.where("       , 4 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by substr(a.invc_date, 1, 6)												")
				;
			}
			if(arg.getParamText("chk" ).contains("4")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , '합계' as invc_date														")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , max(a.prod_idcd) as prod_idcd											")
					.where("       , null as prod_name														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as pqty_pric														")
					.where("       , null as istt_amnt														")
					.where("       , null as istt_vatx														")
					.where("       , null as ttsm_amnt														")
					.where("       , null as scre_spec														")
					.where("       , null as acpt_cstm_name													")
					.where("       , '99999999' as crt_date													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
					.where("       , 5 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, prod_idcd, rnum														")
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
			.query("select *																										")
		;
		data.param
			.where("from ( 																											")
			.where("with cte as ( 																									")
			.where("     select b.invc_date       , a.invc_numb       , a.line_seqn       , b.cstm_idcd								")
			.where("          , c.cstm_name       , a.item_idcd as fabc_idcd              , bm.fabc_name							")
			.where("          , f.fabc_code       , f.ppln_dvcd       , bm.fdat_spec      , bm.item_fxqt							")
			.where("          , ba.scre_spec      , a.offr_qntt       , ifnull(pi.istt_qntt,0) as istt_qntt							")
			.where("          , (a.offr_qntt - ifnull(pi.istt_qntt,0)) as unistt          , b.deli_date								")
			.where("          , c2.cstm_name as acpt_cstm_name        , ba.invc_numb as acpt_invc_numb								")
			.where("          , ba.prod_name      , b.invc_date as crt_date               , null as rnum							")
			.where("     from																										")
			.where("     ( select invc_numb   , line_seqn   , item_idcd   , offr_qntt , orig_invc_numb   , orig_seqn				")
			.where("       from purc_ordr_item																						")
			.where("       where 1=1																								")
			.where("       and   find_name like %:find_name		" , arg.getParamText("find_name"))
			.where("      ) a 																										")
			.where("      left outer join ( select invc_numb   , invc_date   , cstm_idcd   , deli_date								")
			.where("                        from purc_ordr_mast																		")
			.where("                        where 1=1																				")
			.where("                        and   json_value(json_data, '$**.offr_path_dvcd') = 1									")
			.where("                       ) b on a.invc_numb = b.invc_numb															")
			.where("      left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd													")
			.where("      left outer join fabc_mast f on a.item_idcd = f.fabc_idcd													")
			.where("      left outer join ( select invc_numb   , prod_name   , cstm_idcd   , scre_spec								")
			.where("                        from boxx_acpt																			")
			.where("                        where 1=1																				")
			.where("                        and   pcod_numb = :pcod_numb			" , arg.getParamText("pcod_numb"))
			.where("                        and   prod_idcd = :prod_idcd			" , arg.getParamText("prod_idcd"))
			.where("                      ) ba  on a.orig_invc_numb = ba.invc_numb													")
			.where("      left outer join boxx_acpt_bom bm  on a.orig_invc_numb = bm.invc_numb and a.orig_seqn = bm.line_seqn		")
			.where("      left outer join cstm_mast     c2  on ba.cstm_idcd = c2.cstm_idcd											")
			.where("      left outer join (  select invc_numb   , line_seqn   , sum(ifnull(istt_qntt,0)) as istt_qntt				")
			.where("                              , orig_invc_numb            , orig_seqn 											")
			.where("                        from purc_istt_item																		")
			.where("                        group by orig_invc_numb, orig_seqn														")
			.where("                      ) pi on a.invc_numb  = pi.orig_invc_numb and a.line_seqn = pi.orig_seqn					")
			.where("      where 1=1																									")
			.where("      and   b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("      and   b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("      and   c.cstm_idcd = :cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where("      and   c2.cstm_idcd  = :cstm_idcd			" , arg.getParamText("cstm_idcd2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_date															")
			.where("       , a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.fabc_idcd															")
			.where("       , a.fabc_name															")
			.where("       , a.fabc_code															")
			.where("       , a.ppln_dvcd															")
			.where("       , a.fdat_spec															")
			.where("       , a.item_fxqt															")
			.where("       , a.scre_spec															")
			.where("       , a.offr_qntt															")
			.where("       , a.istt_qntt															")
			.where("       , a.unistt																")
			.where("       , a.deli_date															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.acpt_invc_numb														")
			.where("       , a.prod_name															")
			.where("       , a.crt_date																")
			.where("       , 1 as rnum																")
			.where("       , count(*) as cnt														")
			.where(" from cte a																		")
			.where(" group by a.invc_date, a.invc_numb, a.line_seqn, a.fabc_idcd, a.cstm_idcd		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  a.invc_date															")
					.where("       , null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , a.fabc_idcd															")
					.where("       , concat(a.fabc_name,' ',' 계') as fabc_name								")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fdat_spec														")
					.where("       , null as item_fxqt														")
					.where("       , null as scre_spec														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.unistt) as unistt												")
					.where("       , null as deli_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as prod_name														")
					.where("       , a.invc_date as crt_date												")
					.where("       , 2 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.invc_date, a.fabc_idcd												")
					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  a.invc_date															")
					.where("       , null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , max(a.fabc_idcd) as fabc_idcd											")
					.where("       , '일계' as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fdat_spec														")
					.where("       , null as item_fxqt														")
					.where("       , null as scre_spec														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.unistt) as unistt												")
					.where("       , null as deli_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as prod_name														")
					.where("       , a.invc_date as crt_date												")
					.where("       , 3 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.invc_date															")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  substr(a.invc_date,1,6) as invc_date									")
					.where("       , null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , max(a.fabc_idcd) as fabc_idcd											")
					.where("       , '월계' as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fdat_spec														")
					.where("       , null as item_fxqt														")
					.where("       , null as scre_spec														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.unistt) as unistt												")
					.where("       , null as deli_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as prod_name														")
					.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date						")
					.where("       , 4 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by substr(a.invc_date, 1, 6)												")
				;
			}
			if(arg.getParamText("chk" ).contains("4")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  '합계' as invc_date														")
					.where("       , null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , max(a.fabc_idcd) as fabc_idcd											")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fdat_spec														")
					.where("       , null as item_fxqt														")
					.where("       , null as scre_spec														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.unistt) as unistt												")
					.where("       , null as deli_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as prod_name														")
					.where("       , '99999999' as crt_date													")
					.where("       , 5 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, fabc_idcd, rnum														")
			.where(") a																						")
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
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    b.invc_date       , a.invc_numb       , a.line_seqn       , a.item_idcd as fabc_idcd			")
			.where("		, a.offr_qntt																					")
			.where("		, ifnull(pi.istt_qntt,0) as istt_qntt   , (a.offr_qntt - ifnull(pi.istt_qntt,0)) as unistt		")
			.where("		, a.offr_pric as pqty_pric              , a.orig_seqn as acpt_seqn								")
			.where("		, a.orig_seqn as boxx_bom_seqn          , bt.vatx_dvcd as vatx_incl_yorn						")
			.where("		, a.orig_invc_numb as acpt_numb         , c.cstm_name as acpt_cstm_name							")
			.where("		, null as istt_amnt , null as ttsm_amnt															")
			.where("		, null as istt_vatx , null as istt_qntt2, null as subt_qntt										")
			.where("		, bt.prod_idcd      , p.prod_name       , b.cstm_idcd       , c2.cstm_name						")
			.where("		, p.prod_leng       , p.prod_widh       , p.prod_hght											")
			.where("		, a.line_clos       , a.find_name       , a.user_memo       , a.sysm_memo						")
			.where("		, a.line_ordr       , a.line_stat       , a.crte_idcd       , a.crte_urif						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm						")
			.where("from   purc_ordr_item a																					")
			.where("   left outer join purc_ordr_mast b  on a.invc_numb = b.invc_numb										")
			.where("   left outer join boxx_acpt      bt on a.orig_invc_numb = bt.invc_numb 								")
			.where("   left outer join product_mast   p  on bt.prod_idcd = p.prod_idcd		 								")
			.where("   left outer join cstm_mast      c  on bt.cstm_idcd = c.cstm_idcd										")
			.where("   left outer join cstm_mast      c2 on a.cstm_idcd = c2.cstm_idcd										")
			.where("   left outer join																						")
			.where("      ( select invc_numb, line_seqn, sum(ifnull(istt_qntt,0)) as istt_qntt, orig_invc_numb, orig_seqn	")
			.where("        from purc_istt_item group by orig_invc_numb, orig_seqn											")
			.where("      ) pi on a.invc_numb = pi.orig_invc_numb and a.line_seqn = pi.orig_seqn							")
			.where("where  1=1																								")
			.where("and    bt.acpt_dvcd = '4000'																			")
			.where("and    json_value(b.json_data , '$**.offr_path_dvcd') = 3												")
			.where("and    a.offr_qntt - ifnull(pi.istt_qntt,0) > 0															")
			.where("and    b.invc_date  >= :invc1_date		" , arg.getParamText("invc_date1"))
			.where("and    b.invc_date  <= :invc2_date		" , arg.getParamText("invc_date2"))
			.where("and    c.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    c2.cstm_idcd  = :cstm_idcd2		" , arg.getParamText("cstm_idcd2" ))
			.where("and    bt.invc_numb  = :invc_numb		" , arg.getParamText("invc_numb" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.invc_date desc, a.invc_numb desc limit 99999													")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		data.param
			.query("select case when optn_logc_valu in ('예','1','YES','Yes','yes','Y','y') then 1 else 0 end as optn_logc_valu ")
			.query("from optn_mast																								")
			.query("where optn_idcd = 'purc_insp_yorn'																			")
		;
		String valu = data.selectForMap().toString();
		String restr = valu.replaceAll("[^0-9]","");
		String istt_yorn = restr;

		if(restr.equals("0")){
			istt_yorn = "1";
		}else{
			istt_yorn = "0";
		};

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {
			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "purc_istt_item_json_fields");

			//boxx_acpt_bom에 같은 수주가 발주된건이 존재하는지 여부를 찾고. 그 istt_qntt에 현재 입고량을 더하여 업데이트
			temp.param
				.query("select ifnull(max(a.istt_qntt),0) as istt_qntt					")
				.query("from  boxx_acpt_bom a											")
				.query("where a.invc_numb = :invc_numb		", row.fixParameter("acpt_numb"))
				.query("and   a.line_seqn = :boxx_bom_seqn	", row.fixParameter("boxx_bom_seqn"))
			;
			SqlResultRow istt = temp.selectForRow();
			temp.clear();

			Double qntt = Double.parseDouble(istt.getParamText("istt_qntt"));		//현재 입고되어있는 수량
			int qntt2 = Integer.parseInt((String)row.getParameter("istt_qntt2"));	//입고할 수량
			int istt_qntt = (int) (qntt+qntt2);

			if(i == 0){
				//등록
				data.param
					.table ("purc_istt_mast")
					.where ("where invc_numb = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))		//INVOICE번호

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))			//사업장ID
					.update("invc_date"			, row.getParameter("istt_date"))			//입고일자
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))			//담당자ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))			//거래처ID

					.update("istt_dvcd"			, 1100						)			//입고구분코드 1100 : 구매입고

					.update("user_memo"			, row.getParameter("user_memo"))
					.update("sysm_memo"			, row.getParameter("sysm_memo"))
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.insert("line_stat"			, row.getParameter("line_stat"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("purc_istt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("acct_bacd"        , 3000						)			//계정구분코드
					.update("item_idcd"        , row.getParameter("fabc_idcd"))			//품목ID
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("istt_qntt"        , row.getParameter("istt_qntt2"))		//입고수량
					.update("istt_pric"        , row.getParameter("pqty_pric"))			//입고단가
					.update("istt_amnt"        , row.getParameter("istt_amnt"))			//입고금액
					.update("istt_vatx"        , row.getParameter("istt_vatx"))			//입고부가세
					.update("istt_yorn"        , 1							)
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//입고합계
					.update("vatx_incl_yorn"   , row.getParameter("vatx_incl_yorn"))	//자료구분(부가세포함여부)
					.update("orig_invc_numb"   , row.getParameter("invc_numb"))			//원INVOICE번호
					.update("orig_seqn"        , row.getParameter("line_seqn"))			//원순번
					.update("json_data"        , json						)			//jsondata
					.update("istt_insp_yorn"	, row.getParameter("istt_insp_yorn"	))		//입고검사여부
					;
				if(restr.equals("0")){ // 수입검사를 안하는 경우
					data.param
						.update("insp_date"			, row.getParameter("invc_date"		))		//검사일자
					;
				}else{
					data.param
						.update("insp_date"			, row.getParameter("insp_date"		))		//검사일자
					;
				}
				data.param
					.update("insp_drtr_idcd"	, row.getParameter("insp_drtr_idcd"	))		//검사담당자ID
					.update("insp_mthd_dvcd"	, row.getParameter("insp_mthd_dvcd"	))		//검사방법구분코드
					.update("insp_qntt"			, row.getParameter("insp_qntt"		))		//검사수량
					.update("msmt_valu"			, row.getParameter("msmt_valu"		))		//측정값
				;
				if(restr.equals("0")){ // 수입검사를 안하는 경우
					data.param
						.update("pass_qntt"			, row.getParameter("istt_qntt"		))		//합격수량
					;
				}else{
					data.param
						.update("pass_qntt"			, row.getParameter("pass_qntt"		))		//합격수량
					;
				}
				data.param
					.update("find_name"        , row.getParameter("fabc_code")
												+ "	"
												+ row.getParameter("fabc_name"))
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


				i++;

			}else{
				data.param
					.table ("purc_istt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("acct_bacd"        , 3000						)			//계정구분코드
					.update("item_idcd"        , row.getParameter("fabc_idcd"))			//품목ID
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("istt_qntt"        , row.getParameter("istt_qntt2"))		//입고수량
					.update("istt_pric"        , row.getParameter("pqty_pric"))			//입고단가
					.update("istt_amnt"        , row.getParameter("istt_amnt"))			//입고금액
					.update("istt_vatx"        , row.getParameter("istt_vatx"))			//입고부가세
					.update("istt_yorn"        , 1							)
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//입고합계
					.update("vatx_incl_yorn"   , row.getParameter("vatx_incl_yorn"))	//자료구분(부가세포함여부)
					.update("orig_invc_numb"   , row.getParameter("invc_numb"))			//원INVOICE번호
					.update("orig_seqn"        , row.getParameter("line_seqn"))			//원순번
					.update("json_data"        , json						)			//jsondata
					.update("istt_insp_yorn"	, row.getParameter("istt_insp_yorn"	))		//입고검사여부
					;
				if(restr.equals("0")){ // 수입검사를 안하는 경우
					data.param
						.update("insp_date"			, row.getParameter("invc_date"		))		//검사일자
					;
				}else{
					data.param
						.update("insp_date"			, row.getParameter("insp_date"		))		//검사일자
					;
				}
				data.param
					.update("insp_drtr_idcd"	, row.getParameter("insp_drtr_idcd"	))		//검사담당자ID
					.update("insp_mthd_dvcd"	, row.getParameter("insp_mthd_dvcd"	))		//검사방법구분코드
					.update("insp_qntt"			, row.getParameter("insp_qntt"		))		//검사수량
					.update("msmt_valu"			, row.getParameter("msmt_valu"		))		//측정값
				;
				if(restr.equals("0")){ // 수입검사를 안하는 경우
					data.param
						.update("pass_qntt"			, row.getParameter("istt_qntt"		))		//합격수량
					;
				}else{
					data.param
						.update("pass_qntt"			, row.getParameter("pass_qntt"		))		//합격수량
					;
				}
				data.param
					.update("find_name"        , row.getParameter("fabc_code")
												+ "	"
												+ row.getParameter("fabc_name"))
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
			if(restr.equals("0")){
				data.param
					.query("call boxx_isos_booking (		")
					.query("   :invc_numb "  , row.fixParameter("new_invc_numb"))  // Invoice 번호
					.query(" , :line_seqn "  , 0			 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , "구매입고"	 )  // 작업구분
					.query(" , :item_dvcd "  , "상품"		 )  // 품목구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
//				sequence.setBook(arg, row.getParamText("new_invc_numb"), 0 , "구매입고");
			}
		}
		return null;
	}

	public SqlResultMap setRecord2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);


		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {
			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "purc_istt_item_json_fields");
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

		data.param
			.table ("purc_istt_item")
			.where ("where invc_numb = :invc_numb")
			.where ("and   line_seqn = :line_seqn")

			.unique("invc_numb"        , row.fixParameter("invc_numb"))
			.unique("line_seqn"        , row.fixParameter("line_seqn"))

			.update("istt_pric"        , row.getParameter("istt_pric"))
			.update("istt_qntt"        , row.getParameter("istt_qntt"))
			.update("json_data"        , json						)			//jsondata
			;
		data.attach(Action.update);
		data.execute();
		data.clear();
		}
//		for (SqlResultRow row:map) {
//			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
//			data.param
//			.table("product_mast")
//			.where("where prod_idcd = :prod_idcd ")
//
//			.update("prod_leng"        , row.getParameter("prod_leng"))
//			.update("prod_widh"        , row.getParameter("prod_widh"))
//			.update("prod_hght"        , row.getParameter("prod_hght"))
//
//			;
//		data.attach(Action.update);
//		data.execute();
//		data.clear();
//		}
		return null;

	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();
		String params = trans.TranslateRowRec(map,"","invc_numb,line_seqn");
		data.param
			.query("call istt_delete(:params)",params);
		;
		data.attach(Action.direct);
		data.execute();
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
