package com.sky.system.custom.iypkg.stock.isos.isttlist1;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class IsttList1Service  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	/**
	 * 원단입고 조회
	 */
	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
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
			.where("          , c.cstm_name       , a.item_idcd as fabc_idcd              , bm.fabc_name							")
			.where("          , f.fabc_code       , f.ppln_dvcd       , bm.fdat_spec      , a.istt_qntt								")
			.where("          , a.istt_amnt       , a.istt_vatx       , a.ttsm_amnt       , ba.scre_spec							")
			.where("          , ba.prod_name      , c2.cstm_name as acpt_cstm_name        , b.invc_date as crt_date					")
			.where("          , p.orig_invc_numb as acpt_invc_numb    , p.orig_seqn as acpt_line_seqn								")
			.where("          , json_value(a.json_data, '$**.subt_qntt') as subt_qntt												")
			.where("          , json_value(a.json_data, '$**.item_fxqt') as item_fxqt												")
			.where("          , json_value(p.json_data, '$**.mxm2_pric') as mxm2_pric												")
			.where("          , json_value(p.json_data, '$**.pqty_pric') as pqty_pric												")
			.where("     from purc_istt_mast b 																						")
			.where("     left outer join purc_istt_item a on a.invc_numb = b.invc_numb												")
			.where("     left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd												")
			.where("     left outer join fabc_mast      f on a.item_idcd = f.fabc_idcd												")
			.where("     left outer join purc_ordr_item p on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn			")
			.where("     left outer join purc_ordr_mast pm  on p.invc_numb = pm.invc_numb											")
			.where("     left outer join ( select invc_numb   , pcod_numb   , prod_idcd												")
			.where("                             , scre_spec   , prod_name   , cstm_idcd											")
			.where("                        from boxx_acpt																			")
			.where("                        where 1=1																				")
			.where("                        and   pcod_numb = :pcod_numb			" , arg.getParamText("pcod_numb"))
			.where("                        and   prod_idcd = :prod_idcd			" , arg.getParamText("prod_idcd"))
			.where("                      ) ba  on p.orig_invc_numb = ba.invc_numb													")
			.where("     left outer join boxx_acpt_bom bm  on p.orig_invc_numb = bm.invc_numb and p.orig_seqn = bm.line_seqn		")
			.where("     left outer join cstm_mast     c2  on ba.cstm_idcd = c2.cstm_idcd											")
			.where("     where 1=1																									")
			.where("     and   json_value(pm.json_data, '$**.offr_path_dvcd') = '1'													")
			.where("     and   b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("     and   b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("     and   a.find_name like %:find_name			" , arg.getParamText("find_name"))
			.where("     and   c2.cstm_idcd = :cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where("     and   c.cstm_idcd  = :cstm_idcd			" , arg.getParamText("cstm_idcd2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.fabc_idcd															")
			.where("       , a.fabc_name															")
			.where("       , a.fabc_code															")
			.where("       , a.ppln_dvcd															")
			.where("       , a.item_fxqt															")
			.where("       , a.fdat_spec															")
			.where("       , a.istt_qntt															")
			.where("       , a.subt_qntt															")
			.where("       , a.mxm2_pric															")
			.where("       , a.pqty_pric															")
			.where("       , a.istt_amnt															")
			.where("       , a.istt_vatx															")
			.where("       , a.ttsm_amnt															")
			.where("       , a.scre_spec															")
			.where("       , a.prod_name															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.crt_date																")
			.where("       , a.acpt_invc_numb														")
			.where("       , a.acpt_line_seqn														")
			.where("       , 1 as rnum																")
			.where("       , count(*) as cnt														")
			.where(" from cte a																		")
			.where(" group by a.invc_date, a.invc_numb, a.line_seqn, a.fabc_idcd, a.cstm_idcd		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date															")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , a.fabc_idcd															")
					.where("       , '소계' as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as item_fxqt														")
					.where("       , null as fdat_spec														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as mxm2_pric														")
					.where("       , null as pqty_pric														")
					.where("       , null as istt_amnt														")
					.where("       , null as istt_vatx														")
					.where("       , null as ttsm_amnt														")
					.where("       , null as scre_spec														")
					.where("       , null as prod_name														")
					.where("       , null as acpt_cstm_name													")
					.where("       , a.invc_date as crt_date												")
					.where("       , null as acpt_invc_numb													")
					.where("       , null as acpt_line_seqn													")
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
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date															")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , max(a.fabc_idcd) as fabc_idcd											")
					.where("       , '일계' as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as item_fxqt														")
					.where("       , null as fdat_spec														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as mxm2_pric														")
					.where("       , null as pqty_pric														")
					.where("       , null as istt_amnt														")
					.where("       , null as istt_vatx														")
					.where("       , null as ttsm_amnt														")
					.where("       , null as scre_spec														")
					.where("       , null as prod_name														")
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
					.where("       , max(a.fabc_idcd) as fabc_idcd											")
					.where("       , '월계' as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as item_fxqt														")
					.where("       , null as fdat_spec														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as mxm2_pric														")
					.where("       , null as pqty_pric														")
					.where("       , null as istt_amnt														")
					.where("       , null as istt_vatx														")
					.where("       , null as ttsm_amnt														")
					.where("       , null as scre_spec														")
					.where("       , null as prod_name														")
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
					.where("       , max(a.fabc_idcd) as fabc_idcd											")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as item_fxqt														")
					.where("       , null as fdat_spec														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as mxm2_pric														")
					.where("       , null as pqty_pric														")
					.where("       , null as istt_amnt														")
					.where("       , null as istt_vatx														")
					.where("       , null as ttsm_amnt														")
					.where("       , null as scre_spec														")
					.where("       , null as prod_name														")
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
			.where(" ORDER BY crt_date, fabc_idcd, rnum														")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 원단입고대기 조회
	 */
	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
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
			.where("      left outer join ( select fabc_idcd   , fabc_name   , fabc_code   , ppln_dvcd								")
			.where("                        from fabc_mast																			")
			.where("                      ) f on a.item_idcd = f.fabc_idcd															")
			.where("      left outer join ( select invc_numb   , prod_name   , cstm_idcd   , scre_spec								")
			.where("                        from boxx_acpt																			")
			.where("                        where 1=1																				")
			.where("                        and   pcod_numb = :pcod_numb			" , arg.getParamText("pcod_numb"))
			.where("                        and   prod_idcd = :prod_idcd			" , arg.getParamText("prod_idcd"))
			.where("                      ) ba  on a.orig_invc_numb = ba.invc_numb													")
			.where("      left outer join boxx_acpt_bom bm  on a.orig_invc_numb = bm.invc_numb and a.orig_seqn = bm.line_seqn		")
			.where("      left outer join cstm_mast c2  on ba.cstm_idcd = c2.cstm_idcd												")
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
			.where("       , '소계' as fabc_name														")
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

	/**
	 * 부자재입고 조회
	 */

	public SqlResultMap getList3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc_date1,invc_date2,fr_dt,to_dt,cstm_idcd,cstm_idcd2,chk,item_idcd,pcod_numb,type,find_name");

		data.param // 집계문  입력
			.query("call IsttList_asmt (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;
	}

	/**
	 * 부자재입고대기 조회
	 */
	public SqlResultMap getList4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

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
			.where("     select  b.invc_date       , a.invc_numb       , a.line_seqn       , b.cstm_idcd							")
			.where("           , c.cstm_name       , a.item_idcd as asmt_idcd              , f.asmt_name							")
			.where("           , f.asmt_code       , f.asmt_dvcd       , bm.fdat_spec      , bm.item_fxqt							")
			.where("           , ba.scre_spec      , a.offr_qntt       , ifnull(pi.istt_qntt,0) as istt_qntt						")
			.where("           , (a.offr_qntt - ifnull(pi.istt_qntt,0)) as unistt          , b.deli_date							")
			.where("           , c2.cstm_name as acpt_cstm_name        , ba.invc_numb as acpt_invc_numb								")
			.where("           , ba.prod_name      , b.invc_date as crt_date               , null as rnum							")
			.where("           , a.offr_pric       , a.vatx_incl_yorn  , u.unit_name												")
			.where("     from																										")
			.where("      ( select invc_numb   , line_seqn       , item_idcd   , offr_qntt , orig_invc_numb   , orig_seqn			")
			.where("             , offr_pric   , vatx_incl_yorn	 , unit_idcd														")
			.where("        from purc_ordr_item																						")
			.where("        where 1=1																								")
			.where("       ) a 																										")
			.where("      left outer join ( select invc_numb   , invc_date   , cstm_idcd   , deli_date								")
			.where("                       from purc_ordr_mast																		")
			.where("                       where 1=1																				")
			.where("                       and   json_value(json_data, '$**.offr_path_dvcd') =2										")
			.where("                      ) b on a.invc_numb = b.invc_numb															")
			.where("      left outer join ( select cstm_idcd   , cstm_name 															")
			.where("                        from cstm_mast																			")
			.where("                      ) c on b.cstm_idcd = c.cstm_idcd															")
			.where("      left outer join ( select asmt_idcd   , asmt_name   , asmt_code   , asmt_dvcd								")
			.where("                        from asmt_mast																			")
			.where("                      ) f on a.item_idcd = f.asmt_idcd															")
			.where("      left outer join ( select invc_numb   , prod_name   , cstm_idcd   , scre_spec								")
			.where("                        from boxx_acpt																			")
			.where("                        where 1=1																				")
			.where("                      ) ba  on a.orig_invc_numb = ba.invc_numb													")
			.where("      left outer join ( select invc_numb   , line_seqn   , fdat_spec   , item_fxqt								")
			.where("                        from boxx_acpt_bom																		")
			.where("                      ) bm  on a.orig_invc_numb = bm.invc_numb and a.orig_seqn = bm.line_seqn					")
			.where("      left outer join ( select cstm_idcd,cstm_name from cstm_mast ) c2  on ba.cstm_idcd = c2.cstm_idcd			")
			.where("      left outer join ( select unit_name,unit_idcd from unit_mast ) u   on a.unit_idcd = u.unit_idcd			")
			.where("      left outer join ( select invc_numb   , line_seqn   , sum(ifnull(istt_qntt,0)) as istt_qntt				")
			.where("                              , orig_invc_numb            , orig_seqn 											")
			.where("                         from purc_istt_item																	")
			.where("                         group by orig_invc_numb, orig_seqn														")
			.where("                      ) pi on a.invc_numb  = pi.orig_invc_numb and a.line_seqn = pi.orig_seqn					")
			.where("      where 1=1																									")
			.where("      and   a.item_idcd is not null																				")
			.where("      and   b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("      and   b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_date															")
			.where("       , a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.asmt_idcd															")
			.where("       , a.asmt_name															")
			.where("       , a.asmt_code															")
			.where("       , a.asmt_dvcd															")
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
			.where("       , a.offr_pric															")
			.where("       , a.vatx_incl_yorn														")
			.where("       , a.unit_name															")
			.where("       , a.crt_date																")
			.where("       , 1 as rnum																")
			.where("       , count(*) as cnt														")
			.where(" from cte a																		")
			.where(" group by a.invc_date, a.invc_numb, a.line_seqn, a.asmt_idcd, a.cstm_idcd		")
		;
	if(arg.getParamText("chk" ).contains("1")){			//소계
		data.param
			.where(" union all																		")
			.where(" select  a.invc_date															")
			.where("       , null as invc_numb														")
			.where("       , null as line_seqn														")
			.where("       , null as cstm_idcd														")
			.where("       , null as cstm_name														")
			.where("       , a.asmt_idcd															")
			.where("       , '소계' as asmt_name														")
			.where("       , null as asmt_code														")
			.where("       , null as asmt_dvcd														")
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
			.where("       , null as offr_pric														")
			.where("       , null as vatx_incl_yorn													")
			.where("       , null as unit_name														")
			.where("       , a.invc_date as crt_date												")
			.where("       , 2 as rnum																")
			.where("       , count(*) as cnt														")
			.where(" from cte a																		")
			.where(" group by a.invc_date, a.asmt_idcd												")
			.where(" having cnt > 1																	")
		;
	}
	if(arg.getParamText("chk" ).contains("2")){			//일계
		data.param
			.where(" union all																		")
			.where(" select   a.invc_date															")
			.where("        , null as invc_numb														")
			.where("        , null as line_seqn														")
			.where("        , null as cstm_idcd														")
			.where("        , null as cstm_name														")
			.where("        , max(a.asmt_idcd) as asmt_idcd											")
			.where("        , '일계' as asmt_name														")
			.where("        , a.invc_date as asmt_code												")
			.where("        , null as asmt_dvcd														")
			.where("        , null as fdat_spec														")
			.where("        , null as item_fxqt														")
			.where("        , null as scre_spec														")
			.where("        , sum(a.offr_qntt) as offr_qntt											")
			.where("        , sum(a.istt_qntt) as istt_qntt											")
			.where("        , sum(a.unistt) as unistt												")
			.where("        , null as deli_date														")
			.where("        , null as acpt_cstm_name												")
			.where("        , null as acpt_invc_numb												")
			.where("        , null as prod_name														")
			.where("        , null as offr_pric														")
			.where("        , null as vatx_incl_yorn												")
			.where("        , null as unit_name														")
			.where("        , a.invc_date as crt_date												")
			.where("        , 3 as rnum																")
			.where("        , count(*) as cnt														")
			.where(" from cte a																		")
			.where(" group by a.invc_date															")
		;
	}
	if(arg.getParamText("chk" ).contains("3")){														//월계
		data.param
			.where(" union all																		")
			.where(" select  substr(a.invc_date,1,6) as invc_date									")
			.where("         , null as invc_numb													")
			.where("         , null as line_seqn													")
			.where("         , null as cstm_idcd													")
			.where("         , null as cstm_name													")
			.where("         , max(a.asmt_idcd) as asmt_idcd										")
			.where("         , '월계' as asmt_name													")
			.where("         , substr(a.invc_date,1,6) as asmt_code									")
			.where("         , null as asmt_dvcd													")
			.where("         , null as fdat_spec													")
			.where("         , null as item_fxqt													")
			.where("         , null as scre_spec													")
			.where("         , sum(a.offr_qntt) as offr_qntt										")
			.where("         , sum(a.istt_qntt) as istt_qntt										")
			.where("         , sum(a.unistt) as unistt												")
			.where("         , null as deli_date													")
			.where("         , null as acpt_cstm_name												")
			.where("         , null as acpt_invc_numb												")
			.where("         , null as prod_name													")
			.where("         , null as offr_pric													")
			.where("         , null as vatx_incl_yorn												")
			.where("         , null as unit_name													")
			.where("         , concat(substr(a.invc_date,1,6),'99') as crt_date						")
			.where("         , 4 as rnum															")
			.where("         , count(*) as cnt														")
			.where(" from cte a																		")
			.where(" group by substr(a.invc_date, 1, 6)												")
		;
	}
	if(arg.getParamText("chk" ).contains("4")){			//합계
		data.param
			.where(" union all																		")
			.where(" select  null as invc_date														")
			.where("       , null as invc_numb														")
			.where("       , null as line_seqn														")
			.where("       , null as cstm_idcd														")
			.where("       , null as cstm_name														")
			.where("       , max(a.asmt_idcd) as asmt_idcd											")
			.where("       , null as asmt_name														")
			.where("       , '합계' as asmt_code														")
			.where("       , null as asmt_dvcd														")
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
			.where("       , null as offr_pric														")
			.where("       , null as vatx_incl_yorn													")
			.where("       , null as unit_name														")
			.where("       , '99999999' as crt_date													")
			.where("       , 5 as rnum																")
			.where("       , count(*) as cnt														")
			.where(" from cte a																		")
			.where(" group by '99999999'															")
		;
	}
	data.param
		.where(" ORDER BY crt_date, asmt_idcd, rnum													")
		.where(") a																					")
	;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	/**
	 * 상품입고 조회
	 */

	public SqlResultMap getList5(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc_date1,invc_date2,fr_dt,to_dt,cstm_idcd,cstm_idcd2,chk,item_idcd,pcod_numb,type,find_name");

		data.param // 집계문  입력
			.query("call IsttList_product (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;
	}

	/**
	 * 상품입고대기 조회
	 */
	public SqlResultMap getList6(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "invc_date1,invc_date2,istt_date1,istt_date2,cstm_idcd,cstm_idcd2,chk,item_idcd,pcod_numb,type,find_name");

		data.param // 집계문  입력
			.query("call IsttList_product (	")
			.query(" :param	" , result)
			.query(" )	")
		;

		return data.selectForMap() ;
	}
}
