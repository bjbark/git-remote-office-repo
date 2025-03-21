package com.sky.system.custom.iypkg.prod.worklist4;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("iypkg.WorkList4Service")
public class WorkList4Service extends DefaultServiceHandler {
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
			.where("     select  a.invc_numb       , a.line_seqn       , bp.wkct_idcd       , w.wkct_name							")
			.where("           , c.cstm_name       , ba.acpt_date      , p.prod_name        , c2.acpt_cstm_name						")
			.where("           , p.prod_spec       , a.offr_qntt       , i.istt_qntt        , bp.wkun_dvcd							")
			.where("           , (a.offr_qntt - i.istt_qntt) as unistt , a.invc_date												")
			.where("     from																										")
			.where("     ( select a.invc_numb   , a.line_seqn   , b.invc_date      , b.offr_dvcd									")
			.where("            , b.cstm_idcd   , a.offr_qntt   , a.orig_invc_numb , a.orig_seqn									")
			.where("       from purc_ordr_item a																					")
			.where("       left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb											")
			.where("       where b.offr_dvcd = '3000'																				")
			.where("       and   a.find_name  like %:find_name		" , arg.getParamText("find_name"))
			.where("       and   a.orig_invc_numb  = :invc_numb		" , arg.getParamText("invc_numb"))
			.where("       and   b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("       and   b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("       and   b.cstm_idcd  = :cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where("      ) a 																										")
			.where("      left outer join ( select invc_numb   , line_seqn   , wkun_dvcd   , wkct_idcd								")
			.where("                        from boxx_acpt_bop																		")
			.where("                        where 1=1																				")
			.where("                        and  wkct_idcd  = :wkct_idcd			" , arg.getParamText("wkct_idcd"))
			.where("                      ) bp on a.orig_invc_numb = bp.invc_numb and a.orig_seqn = bp.line_seqn					")
			.where("      left outer join ( select wkct_idcd   , wkct_name															")
			.where("                        from wkct_mast																			")
			.where("                      ) w  on w.wkct_idcd = bp.wkct_idcd														")
			.where("      left outer join ( select cstm_idcd   , cstm_name															")
			.where("                        from cstm_mast																			")
			.where("                      ) c  on a.cstm_idcd = c.cstm_idcd															")
			.where("      left outer join ( select invc_numb   , invc_date as acpt_date   , cstm_idcd   , prod_idcd					")
			.where("                        from boxx_acpt																			")
			.where("                      ) ba on bp.invc_numb = ba.invc_numb														")
			.where("      left outer join ( select cstm_idcd   , cstm_name as acpt_cstm_name										")
			.where("                        from cstm_mast																			")
			.where("                      ) c2  on ba.cstm_idcd = c2.cstm_idcd														")
			.where("      left outer join ( select concat(prod_leng,'*', prod_widh,'*', prod_hght) as prod_spec						")
			.where("                             , prod_idcd   , prod_name															")
			.where("                        from product_mast																		")
			.where("                      ) p  on ba.prod_idcd = p.prod_idcd														")
			.where("      left outer join ( select ifnull(istt_qntt,0) as istt_qntt   , orig_invc_numb   , orig_seqn				")
			.where("                        from purc_istt_item																		")
			.where("                      ) i  on i.orig_invc_numb = a.invc_numb and i.orig_seqn = a.line_seqn						")
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.invc_date															")
			.where("       , a.wkct_idcd															")
			.where("       , a.wkct_name															")
			.where("       , a.cstm_name															")
			.where("       , a.acpt_date															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.prod_name															")
			.where("       , a.prod_spec															")
			.where("       , a.offr_qntt															")
			.where("       , a.istt_qntt															")
			.where("       , a.wkun_dvcd															")
			.where("       , a.unistt																")
			.where("       , a.wkct_idcd as crt_wkct												")
			.where("       , a.invc_date as crt_date												")
			.where("       , 0 as rnum																")
			.where("       , null as cnt															")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as invc_date														")
					.where("       , a.wkct_idcd															")
					.where("       , concat(a.wkct_name,'계') as wkct_name									")
					.where("       , null as cstm_name														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.unistt) as unistt												")
					.where("       , a.wkct_idcd as crt_wkct												")
					.where("       , a.invc_date as crt_date												")
					.where("       , 1 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.invc_date, a.wkct_idcd												")
					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date															")
					.where("       , null as wkct_idcd														")
					.where("       , '일계' as wkct_name														")
					.where("       , null as cstm_name														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.unistt) as unistt												")
					.where("       , max(a.wkct_idcd) as crt_wkct											")
					.where("       , a.invc_date as crt_date												")
					.where("       , 2 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
					.where(" group by a.invc_date															")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , null as wkct_idcd														")
					.where("       , '월계' as wkct_name														")
					.where("       , null as cstm_name														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.unistt) as unistt												")
					.where("       , max(a.wkct_idcd) as crt_wkct											")
					.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date						")
					.where("       , 3 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
					.where(" group by substr(a.invc_date,1,6)												")
				;
			}
			if(arg.getParamText("chk" ).contains("4")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , '합계' as invc_date														")
					.where("       , null as wkct_idcd														")
					.where("       , null as wkct_name														")
					.where("       , null as cstm_name														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.unistt) as unistt												")
					.where("       , max(a.wkct_idcd) as crt_wkct											")
					.where("       , '99999999' as crt_date													")
					.where("       , 4 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, crt_wkct, rnum														")
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
			.where("     select  a.invc_numb       , a.line_seqn       , b.invc_date        , c.cstm_name							")
			.where("           , ba.acpt_date      , c2.acpt_cstm_name , a.item_idcd        , p.prod_name							")
			.where("           , p.prod_spec       , a.istt_qntt       , a.istt_pric        , a.istt_amnt							")
			.where("           , u.unit_name       , ba.acpt_numb      , bp.wkct_idcd       , w.wkct_name							")
			.where("           , bp.wkun_dvcd																						")
			.where("     from																										")
			.where("     ( select invc_numb   , line_seqn   , item_idcd   , istt_qntt												")
			.where("            , istt_pric   , istt_amnt   , orig_invc_numb   , orig_seqn											")
			.where("       from purc_istt_item a																					")
			.where("       where 1=1																								")
			.where("       and   a.find_name   like %:find_name								" , arg.getParamText("find_name"))
			.where("       and   json_value(json_data , '$**.acpt_numb')  = :invc_numb		" , arg.getParamText("invc_numb"))
			.where("      ) istt 																									")
			.where("      left outer join purc_istt_item a on a.invc_numb = istt.invc_numb and a.line_seqn = istt.line_seqn			")
			.where("      left outer join ( select invc_date   , cstm_idcd   , invc_numb											")
			.where("                        from purc_istt_mast																		")
			.where("                        where 1=1																				")
			.where("                      ) b on a.invc_numb = b.invc_numb															")
			.where("      left outer join ( select invc_numb   , line_seqn   , orig_invc_numb   , orig_seqn							")
			.where("                        from purc_ordr_item																		")
			.where("                      ) po  on a.orig_invc_numb = po.invc_numb and a.orig_seqn = po.line_seqn					")
			.where("      left outer join ( select invc_numb   , offr_dvcd															")
			.where("                        from purc_ordr_mast																		")
			.where("                      ) pm  on po.invc_numb = pm.invc_numb														")
			.where("      left outer join ( select invc_numb   , line_seqn   , wkct_idcd   , wkun_dvcd   , qntt_unit_idcd			")
			.where("                        from boxx_acpt_bop																		")
			.where("                        where 1=1																				")
			.where("                        and  wkct_idcd  = :wkct_idcd			" , arg.getParamText("wkct_idcd"))
			.where("                      ) bp  on po.orig_invc_numb = bp.invc_numb and po.orig_seqn = bp.line_seqn					")
			.where("      left outer join ( select invc_numb as acpt_numb   , invc_date as acpt_date   , prod_idcd   , cstm_idcd	")
			.where("                        from boxx_acpt																			")
			.where("                      ) ba  on ba.acpt_numb = bp.invc_numb														")
			.where("      left outer join ( select wkct_idcd   , wkct_name															")
			.where("                        from wkct_mast																			")
			.where("                      ) w  on bp.wkct_idcd = w.wkct_idcd														")
			.where("      left outer join ( select cstm_idcd   , cstm_name															")
			.where("                        from cstm_mast																			")
			.where("                      ) c  on b.cstm_idcd = c.cstm_idcd															")
			.where("      left outer join ( select cstm_idcd   , cstm_name as acpt_cstm_name										")
			.where("                        from cstm_mast																			")
			.where("                      ) c2  on ba.cstm_idcd = c2.cstm_idcd														")
			.where("      left outer join ( select concat(prod_leng,'*', prod_widh,'*', prod_hght) as prod_spec						")
			.where("                             , prod_idcd   , prod_name															")
			.where("                        from product_mast																		")
			.where("                      ) p  on ba.prod_idcd = p.prod_idcd														")
			.where("      left outer join ( select unit_idcd   , unit_name															")
			.where("                        from unit_mast																			")
			.where("                      ) u  on bp.qntt_unit_idcd = u.unit_idcd													")
			.where("      where pm.offr_dvcd = '3000'																				")
			.where("      and  b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("      and  b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("      and  b.cstm_idcd  = :cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.invc_date															")
			.where("       , a.wkun_dvcd															")
			.where("       , a.wkct_name															")
			.where("       , a.cstm_name															")
			.where("       , a.acpt_date															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.prod_name															")
			.where("       , a.prod_spec															")
			.where("       , a.istt_amnt															")
			.where("       , a.istt_pric															")
			.where("       , a.istt_qntt															")
			.where("       , a.unit_name															")
			.where("       , a.acpt_numb															")
			.where("       , a.invc_date as crt_date												")
			.where("       , a.wkct_idcd as crt_wkct												")
			.where("       , 0 as rnum																")
			.where("       , null as cnt															")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as invc_date														")
					.where("       , null as wkun_dvcd														")
					.where("       , '소계' as wkct_name														")
					.where("       , null as cstm_name														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as acpt_numb														")
					.where("       , a.invc_date as crt_date												")
					.where("       , a.wkct_idcd as crt_wkct												")
					.where("       , 1 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.wkct_idcd															")
					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date															")
					.where("       , null as wkun_dvcd														")
					.where("       , '일계' as wkct_name														")
					.where("       , null as cstm_name														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as acpt_numb														")
					.where("       , a.invc_date as crt_date												")
					.where("       , max(a.wkct_idcd) as crt_wkct											")
					.where("       , 2 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
					.where(" group by a.invc_date															")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , null as wkun_dvcd														")
					.where("       , '월계' as wkct_name														")
					.where("       , null as cstm_name														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as acpt_numb														")
					.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date						")
					.where("       , max(a.wkct_idcd) as crt_wkct											")
					.where("       , 3 as rnum																")
					.where("       , null as cnt															")
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
					.where("       , null as wkun_dvcd														")
					.where("       , null as wkct_name														")
					.where("       , null as cstm_name														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as acpt_numb														")
					.where("       , '99999999' as crt_date													")
					.where("       , max(a.wkct_idcd) as crt_wkct											")
					.where("       , 4 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, crt_wkct, rnum														")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
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
			.query("select *																										")
		;
		data.param
			.where("from ( 																											")
			.where("with cte as ( 																									")
			.where("     select  a.invc_numb       , a.line_seqn       , a.item_idcd        , p.prod_name							")
			.where("           , p.prod_spec       , ba.pcod_numb      , ba.acpt_qntt       , a.offr_qntt							")
			.where("           , ba.acpt_numb      , c.acpt_cstm_name  , a.invc_date        , ba.invc_date as acpt_date				")
			.where("           , a.cstm_idcd       , c2.cstm_name      , (ba.acpt_qntt - a.offr_qntt) as unoffr						")

			.where("     from																										")
			.where("     ( select  a.invc_numb   , a.line_seqn   , a.item_idcd   , a.orig_invc_numb									")
			.where("             , a.orig_seqn   , a.offr_qntt   , b.cstm_idcd   , b.invc_date										")
			.where("       from purc_ordr_item a																					")
			.where("       left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb											")
			.where("       where json_value(b.json_data , '$**.offr_path_dvcd') = 3													")
			.where("       and   a.find_name  like %:find_name		" , arg.getParamText("find_name"))
			.where("       and   a.orig_invc_numb  = :invc_numb		" , arg.getParamText("invc_numb"))
			.where("       and   b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("       and   b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("       and   b.cstm_idcd  = :cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where("      ) a 																										")
			.where("      left outer join ( select invc_numb as acpt_numb   , cstm_idcd   , pcod_numb								")
			.where("                             , invc_date   , acpt_qntt  , prod_idcd												")
			.where("                        from boxx_acpt																			")
			.where("                      ) ba  on a.orig_invc_numb = ba.acpt_numb													")
			.where("      left outer join ( select cstm_idcd   , cstm_name as acpt_cstm_name										")
			.where("                        from cstm_mast																			")
			.where("                      ) c  on ba.cstm_idcd = c.cstm_idcd														")
			.where("      left outer join ( select cstm_idcd   , cstm_name															")
			.where("                        from cstm_mast																			")
			.where("                      ) c2  on a.cstm_idcd = c2.cstm_idcd														")
			.where("      left outer join ( select concat(prod_leng,'*', prod_widh,'*', prod_hght) as prod_spec						")
			.where("                             , prod_idcd   , prod_name															")
			.where("                        from product_mast																		")
			.where("                      ) p  on a.item_idcd = p.prod_idcd															")
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_name															")
			.where("       , a.prod_name															")
			.where("       , a.prod_spec															")
			.where("       , a.pcod_numb															")
			.where("       , a.acpt_qntt															")
			.where("       , a.offr_qntt															")
			.where("       , a.unoffr																")
			.where("       , a.acpt_numb															")
			.where("       , a.acpt_date															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.cstm_idcd as crt_cstm												")
			.where("       , a.invc_date as crt_date												")
			.where("       , 0 as rnum																")
			.where("       , null as cnt															")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as invc_date														")
					.where("       , '소계' as cstm_name														")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as pcod_numb														")
					.where("       , sum(a.acpt_qntt) as acpt_qntt											")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.unoffr) as unoffr												")
					.where("       , null as acpt_numb														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , a.cstm_idcd as crt_cstm												")
					.where("       , a.invc_date as crt_date												")
					.where("       , 1 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by crt_cstm																")
					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.invc_date															")
					.where("       , '일계' as cstm_name														")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as pcod_numb														")
					.where("       , sum(a.acpt_qntt) as acpt_qntt											")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.unoffr) as unoffr												")
					.where("       , null as acpt_numb														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , a.cstm_idcd as crt_cstm												")
					.where("       , a.invc_date as crt_date												")
					.where("       , 2 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
					.where(" group by crt_date																")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , '월계' as cstm_name														")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as pcod_numb														")
					.where("       , sum(a.acpt_qntt) as acpt_qntt											")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.unoffr) as unoffr												")
					.where("       , null as acpt_numb														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , max(a.cstm_idcd) as crt_cstm											")
					.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date						")
					.where("       , 3 as rnum																")
					.where("       , null as cnt															")
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
					.where("       , null as cstm_name														")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as pcod_numb														")
					.where("       , sum(a.acpt_qntt) as acpt_qntt											")
					.where("       , sum(a.offr_qntt) as offr_qntt											")
					.where("       , sum(a.unoffr) as unoffr												")
					.where("       , null as acpt_numb														")
					.where("       , null as acpt_date														")
					.where("       , null as acpt_cstm_name													")
					.where("       , max(a.cstm_idcd) as crt_cstm											")
					.where("       , '99999999' as crt_date													")
					.where("       , 4 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, crt_cstm, rnum														")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
