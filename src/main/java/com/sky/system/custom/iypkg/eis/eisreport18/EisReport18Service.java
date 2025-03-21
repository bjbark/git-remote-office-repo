package com.sky.system.custom.iypkg.eis.eisreport18;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service("iypkg.EisReport18Service")
public class EisReport18Service extends DefaultServiceHandler {
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
			.where("     select a.invc_numb       , b.invc_date       , a.item_idcd       , p.prod_name								")
			.where("          , bt.bxty_name      , concat(bt.bxty_leng,'*',bt.bxty_widh,'*',bt.bxty_hght) as bxty_spec				")
			.where("          , b.cstm_idcd       , c.cstm_name       , a.ostt_qntt       , a.sale_pric								")
			.where("          , a.sale_amnt       , istt.cstm_name as istt_cstm_name      , istt.fabc_name							")
			.where("          , istt.ppln_dvcd    , istt.fabc_spec    , istt.istt_qntt    , istt.istt_pric							")
			.where("          , istt.istt_amnt																						")
			.where("     from																										")
			.where("     ( select invc_numb																							")
			.where("       from sale_ostt_mast																						")
			.where("       where 1=1																								")
			.where("       and  invc_date >= :invc_date1			" , arg.getParamText("invc1_date"))
			.where("       and  invc_date <= :invc_date2			" , arg.getParamText("invc2_date"))
			.where("      ) ostt																									")
			.where("      left outer join sale_ostt_mast b  on b.invc_numb = ostt.invc_numb											")
			.where("      left outer join sale_ostt_item a  on b.invc_numb = a.invc_numb											")
			.where("      left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd											")
			.where("      left outer join product_mast   p  on a.item_idcd = p.prod_idcd											")
			.where("      left outer join boxtype_mast   bt on p.bxty_idcd = bt.bxty_idcd											")
			.where("      left outer join ( select sum(a.istt_qntt) as istt_qntt     , c.cstm_name   , f.fabc_name   , f.ppln_dvcd	")
			.where("                             , f.fdat_spec as fabc_spec          , i.orig_invc_numb              , i.orig_seqn	")
			.where("                             , ifnull(a.istt_pric, i.offr_pric) as istt_pric									")
			.where("                             , ifnull(a.istt_amnt, i.offr_amnt) as istt_amnt									")
			.where("                        from purc_istt_item a																	")
			.where("                        left outer join purc_istt_mast  b on a.invc_numb = b.invc_numb							")
			.where("                        left outer join cstm_mast       c on b.cstm_idcd = c.cstm_idcd							")
			.where("                        right outer join boxx_acpt_bom  f on json_value(a.json_data , '$**.acpt_numb') = f.invc_numb			")
			.where("                                                         and json_value(a.json_data , '$**.line_seqn') = f.line_seqn			")
			.where("                        left outer join purc_ordr_item  i on a.orig_invc_numb = i.invc_numb and a.orig_seqn = i.line_seqn		")
			.where("                        left outer join purc_ordr_mast  p on i.invc_numb = p.invc_numb							")
			.where("                        where json_value(p.json_data , '$**.offr_path_dvcd') = 1								")
			.where("                        group by i.orig_invc_numb																")
			.where("                      ) istt on a.acpt_numb = istt.orig_invc_numb												")
			.where("      where 1=1																									")
			.where("      and  a.find_name like %:find_name		" , arg.getParamText("find_name"))
			.where("      and  a.item_idcd is not null																				")
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.invc_date															")
			.where("       , a.item_idcd															")
			.where("       , a.prod_name															")
			.where("       , a.bxty_name															")
			.where("       , a.bxty_spec															")
			.where("       , a.cstm_name															")
			.where("       , a.ostt_qntt															")
			.where("       , a.sale_pric															")
			.where("       , a.sale_amnt															")
			.where("       , a.istt_cstm_name														")
			.where("       , a.fabc_name															")
			.where("       , a.ppln_dvcd															")
			.where("       , a.fabc_spec															")
			.where("       , a.istt_qntt															")
			.where("       , a.istt_pric															")
			.where("       , a.istt_amnt															")
			.where("       , 0 as rnum																")
			.where("       , null as cnt															")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , a.invc_date															")
					.where("       , a.item_idcd															")
					.where("       , '소계' as prod_name														")
					.where("       , null as bxty_name														")
					.where("       , null as bxty_spec														")
					.where("       , a.prod_name as cstm_name												")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , a.sale_pric															")
					.where("       , sum(a.sale_amnt) as sale_amnt											")
					.where("       , null as istt_cstm_name													")
					.where("       , null as fabc_name														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fabc_spec														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , 1 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.item_idcd															")
					.where(" having cnt >= 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , a.invc_date															")
					.where("       , 'xxxxxxxxxxx' as item_idcd												")
					.where("       , '합계' as prod_name														")
					.where("       , null as bxty_name														")
					.where("       , null as bxty_spec														")
					.where("       , null as cstm_name														")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , a.sale_pric															")
					.where("       , sum(a.sale_amnt) as sale_amnt											")
					.where("       , null as istt_cstm_name													")
					.where("       , null as fabc_name														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fabc_spec														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , 2 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
					.where(" group by '9999999'																")
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
