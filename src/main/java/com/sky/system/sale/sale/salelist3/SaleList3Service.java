package com.sky.system.sale.sale.salelist3;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class SaleList3Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																													")
		;
		data.param
			.where("from ( 																														")
			.where("with cte as ( 																												")
			.where("     select a.invc_numb     , a.line_seqn       , b.invc_date     , json_value(a.json_data, '$**.acpt_numb') as acpt_numb	")
			.where("          , a.item_idcd     , bm.fabc_name      , f.fabc_code     , f.ppln_dvcd       , b.cstm_idcd							")
			.where("          , c.cstm_name     , a.istt_qntt       , bm.fdat_spec    , c2.cstm_name as acpt_cstm_name , ba.prod_idcd			")
			.where("          , ba.prod_name    , a.istt_amnt       , bm.mxm2_qntt    , pi.pqty_pric      , pi.mxm2_pric						")
			.where("          , (bm.mxm2_qntt * pi.mxm2_pric) as m2 , ba.prod_spec    , ifnull(s.ostt_qntt,0) as ostt_qntt						")
			.where("          , ifnull(s.sale_amnt,0) as sale_amnt  , round(a.istt_amnt / ifnull(s.sale_amnt,0) * 100) as persent				")
			.where("     from																													")
			.where("     ( select a.invc_numb   , a.line_seqn   , json_value(a.json_data, '$**.acpt_numb') as acpt_numb							")
			.where("            , a.item_idcd   , a.istt_qntt   , a.orig_invc_numb   , a.orig_seqn												")
			.where("       from purc_istt_item a																								")
			.where("       where 1=1																											")
			.where("       and   a.acct_bacd = '1001'																							")
			.where("       and   a.find_name like %:find_name		" , arg.getParamText("find_name"))
			.where("      ) item																												")
			.where("      left outer join purc_istt_item  a on a.invc_numb = item.invc_numb and a.line_seqn = item.line_seqn					")
			.where("      left outer join ( select invc_numb   , invc_date   , cstm_idcd														")
			.where("                        from purc_istt_mast																					")
			.where("                        where 1=1																							")
			.where("                        and   cstm_idcd >= :cstm_idcd1			" , arg.getParamText("cstm_idcd"))
			.where("                        and   cstm_idcd <= :cstm_idcd2			" , arg.getParamText("cstm_idcd2"))
			.where("                        and   invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("                        and   invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("                      ) b on a.invc_numb = b.invc_numb																		")
			.where("      left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd																")
			.where("      left outer join fabc_mast f on a.item_idcd = f.fabc_idcd																")
			.where("      left outer join ( select invc_numb   , line_seqn   , orig_invc_numb													")
			.where("                             , json_value(json_data , '$**.pqty_pric') as pqty_pric											")
			.where("                             , json_value(json_data , '$**.mxm2_pric') as mxm2_pric											")
			.where("                        from purc_ordr_item																					")
			.where("                      ) pi on a.orig_invc_numb = pi.invc_numb and a.orig_seqn = pi.line_seqn								")
			.where("      left outer join ( select  invc_numb   , json_value(json_data, '$**.offr_path_dvcd') as offr_path_dvcd					")
			.where("                        from purc_ordr_mast																					")
			.where("                      ) pm on pi.invc_numb = pm.invc_numb																	")
			.where("      left outer join ( select invc_numb   , concat(item_leng,'*',item_widh,'*',item_hght) as prod_spec						")
			.where("                             , prod_idcd   , prod_name   , cstm_idcd														")
			.where("                        from boxx_acpt																						")
			.where("                      ) ba on pi.orig_invc_numb = ba.invc_numb																")
			.where("      left outer join boxx_acpt_bom bm on ba.invc_numb = bm.invc_numb														")
			.where("      left outer join cstm_mast     c2 on ba.cstm_idcd = c2.cstm_idcd														")
			.where("      left outer join ( select sum(a.ostt_qntt) as ostt_qntt   , sum(a.sale_amnt) as sale_amnt   , a.acpt_numb				")
			.where("                        from sale_ostt_item a																				")
			.where("                        left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb										")
			.where("                        where 1=1			 																				")
			.where("                        and   b.invc_date >= :invc_date3			" , arg.getParamText("invc_date1"))
			.where("                        and   b.invc_date <= :invc_date4			" , arg.getParamText("invc_date2"))
			.where("                        group by acpt_numb																					")
			.where("                      ) s on ba.invc_numb = s.acpt_numb																		")
			.where(")																															")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
//			.where("       , a.invc_date 															")
			.where("       , a.acpt_numb															")
			.where("       , a.item_idcd															")
			.where("       , a.fabc_name															")
			.where("       , a.fabc_code															")
			.where("       , a.ppln_dvcd															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.istt_qntt															")
			.where("       , a.fdat_spec															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.prod_idcd															")
			.where("       , a.prod_name															")
			.where("       , a.istt_amnt															")
			.where("       , a.mxm2_qntt															")
			.where("       , a.pqty_pric															")
			.where("       , a.mxm2_pric															")
			.where("       , a.m2																	")
			.where("       , a.prod_spec															")
			.where("       , a.ostt_qntt															")
			.where("       , a.sale_amnt															")
			.where("       , a.persent																")
			.where("       , 1 as rnum																")
			.where("       , null as cnt															")
//			.where("       , max(a.invc_numb) as crt_numb											")
			.where(" from cte a																		")
			.where(" group by a.invc_date, a.invc_numb, a.prod_idcd									")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as acpt_numb														")
					.where("       , a.item_idcd															")
					.where("       , concat(a.fabc_name,' 계') as fabc_name									")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as fdat_spec														")
					.where("       , null as acpt_cstm_name													")
					.where("       , a.prod_idcd															")
					.where("       , null as prod_name														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as mxm2_qntt														")
					.where("       , null as pqty_pric														")
					.where("       , null as mxm2_pric														")
					.where("       , sum(a.m2) as m2														")
					.where("       , null as prod_spec														")
					.where("       , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt								")
					.where("       , sum(ifnull(a.sale_amnt,0)) as sale_amnt								")
					.where("       , round(sum(a.istt_amnt) / sum(ifnull(a.sale_amnt,0)) * 100) as persent	")
					.where("       , 2 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.item_idcd															")
//					.where(" having cnt > 1																	")
				;
			}

			if(arg.getParamText("chk" ).contains("2")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , null as acpt_numb														")
					.where("       , max(a.item_idcd) as item_idcd											")
					.where("       , '합계' as fabc_name														")
					.where("       , null as fabc_code														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as cstm_idcd														")
					.where("       , null as cstm_name														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as fdat_spec														")
					.where("       , null as acpt_cstm_name													")
					.where("       , a.prod_idcd															")
					.where("       , null as prod_name														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as mxm2_qntt														")
					.where("       , null as pqty_pric														")
					.where("       , null as mxm2_pric														")
					.where("       , sum(a.m2) as m2														")
					.where("       , null as prod_spec														")
					.where("       , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt								")
					.where("       , sum(ifnull(a.sale_amnt,0)) as sale_amnt								")
					.where("       , round(sum(a.istt_amnt) / sum(ifnull(a.sale_amnt,0)) * 100) as persent	")
					.where("       , 3 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY item_idcd, rnum																")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
