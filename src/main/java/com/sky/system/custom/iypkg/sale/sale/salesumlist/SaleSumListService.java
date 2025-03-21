package com.sky.system.custom.iypkg.sale.sale.salesumlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class SaleSumListService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String dvcd = arg.getParamText("dvcd");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;

		if(dvcd.equals("1")){			//명세서기준
			data.param
				.where("from ( 																											")
				.where("with cte as ( 																									")
				.where("     select a.item_idcd       , p.prod_name       , p.prod_code       , c.cstm_idcd								")
				.where("          , a.sale_pric       , a.sale_amnt       , p.prod_spec       , p.m2									")
				.where("          , c.cstm_name       , c.cstm_code       , a.ostt_qntt													")
				.where("     from ( select invc_numb																					")
				.where("            from sale_ostt_mast																					")
				.where("            where 1=1																							")
				.where("            and  invc_date  >= :invc1_date				" , arg.getParamText("invc_date1"))
				.where("            and  invc_date  <= :invc2_date				" , arg.getParamText("invc_date2"))
				.where("     ) ostt																										")
				.where("     left outer join sale_ostt_mast b on b.invc_numb = ostt.invc_numb											")
				.where("     left outer join sale_ostt_item a on b.invc_numb = a.invc_numb												")
//				.where("     left outer join ( select invc_numb   , line_seqn   , item_idcd   , sale_pric   , sale_amnt					")
//				.where("                            , ostt_qntt   , find_name															")
//				.where("                       from sale_ostt_item																		")
//				.where("                       where 1=1																				")
//				.where("                      ) a on b.invc_numb = a.invc_numb															")
				.where("     left outer join ( select prod_idcd   , prod_name   , prod_code   , (pqty_mxm2 * mxm2_pric) as m2			")
				.where("                            , concat(prod_leng,'*',prod_widh,'*',prod_hght) as prod_spec						")
				.where("                       from product_mast																		")
				.where("                       where 1=1																				")
				.where("     and    p.prod_code  >= :prod_code				" , arg.getParamText("prod_code"))
				.where("     and    p.prod_code  <= :prod_code2				" , arg.getParamText("prod_code2"))
				.where("                     )	p on a.item_idcd = p.prod_idcd															")
				.where("     left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd													")
				.where("     where 1=1																									")
				.where("     and  a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
				.where("     and  a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
				.where(")																												")
			;

			data.param
				.where(" select  a.item_idcd															")
				.where("       , a.prod_name															")
				.where("       , a.prod_code															")
				.where("       , a.cstm_idcd															")
				.where("       , a.cstm_code															")
				.where("       , a.cstm_name															")
				.where("       , a.ostt_qntt															")
				.where("       , a.sale_pric															")
				.where("       , a.sale_amnt															")
				.where("       , a.m2																	")
				.where("       , a.prod_spec															")
				.where("       , 1 as rnum																")
				.where("       , null as cnt															")
				.where(" from cte a																		")
				.where(" group by a.item_idcd, a.cstm_idcd, a.sale_pric									")
			;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  a.item_idcd															")
					.where("       , null as prod_name														")
					.where("       , null as prod_code														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_code														")
					.where("       , concat(a.cstm_name,' 계') as cstm_name									")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , null as sale_pric														")
					.where("       , sum(a.sale_amnt) as sale_amnt											")
					.where("       , null as m2																")
					.where("       , null as prod_spec														")
					.where("       , 2 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.cstm_idcd															")
//					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  '99999999' as item_idcd												")
					.where("       , null as prod_name														")
					.where("       , null as prod_code														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_code														")
					.where("       , '합계' as cstm_name														")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , null as sale_pric														")
					.where("       , sum(a.sale_amnt) as sale_amnt											")
					.where("       , null as m2																")
					.where("       , null as prod_spec														")
					.where("       , 3 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by '9999999'																")
				;
			}
			data.param
				.where(" order BY item_idcd, cstm_idcd, rnum limit 9999999									")
				.where(") a																					")
			;
		}
		else if(dvcd.equals("2")){			//청구서기준
			data.param
				.where("from ( 																											")
				.where("with cte as ( 																									")
				.where("     select a.item_idcd       , p.prod_name       , p.prod_code       , c.cstm_idcd								")
				.where("          , a.sale_pric       , a.sale_amnt       , p.prod_spec       , p.m2									")
				.where("          , c.cstm_name       , c.cstm_code       , a.ostt_qntt													")
				.where("     from ( select invc_numb																					")
				.where("            from sale_ostt_mast																					")
				.where("            where 1=1																							")
				.where("            and  invc_date  >= :invc1_date				" , arg.getParamText("invc_date1"))
				.where("            and  invc_date  <= :invc2_date				" , arg.getParamText("invc_date2"))
				.where("     ) ostt																										")
				.where("     left outer join sale_ostt_mast b on b.invc_numb = ostt.invc_numb											")
				.where("     left outer join sale_ostt_item a on b.invc_numb = a.invc_numb												")
	//			.where("     left outer join ( select invc_numb   , line_seqn   , item_idcd   , sale_pric   , sale_amnt					")
	//			.where("                            , ostt_qntt   , find_name															")
	//			.where("                       from sale_ostt_item																		")
	//			.where("                       where 1=1																				")
	//			.where("                      ) a on b.invc_numb = a.invc_numb															")
				.where("     left outer join ( select prod_idcd   , prod_name   , prod_code   , (pqty_mxm2 * mxm2_pric) as m2			")
				.where("                            , concat(prod_leng,'*',prod_widh,'*',prod_hght) as prod_spec						")
				.where("                       from product_mast																		")
				.where("                       where 1=1																				")
				.where("     and    p.prod_code  >= :prod_code				" , arg.getParamText("prod_code"))
				.where("     and    p.prod_code  <= :prod_code2				" , arg.getParamText("prod_code2"))
				.where("                     )	p on a.item_idcd = p.prod_idcd															")
				.where("     left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd													")
				.where("     where 1=1																									")
				.where("     and  a.rqod_invc_numb is not null																			")
				.where("     and  a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
				.where("     and  a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
				.where(")																												")

				.where(" select  a.item_idcd															")
				.where("       , a.prod_name															")
				.where("       , a.prod_code															")
				.where("       , a.cstm_idcd															")
				.where("       , a.cstm_code															")
				.where("       , a.cstm_name															")
				.where("       , a.ostt_qntt															")
				.where("       , a.sale_pric															")
				.where("       , a.sale_amnt															")
				.where("       , a.m2																	")
				.where("       , a.prod_spec															")
				.where("       , 1 as rnum																")
				.where("       , null as cnt															")
				.where(" from cte a																		")
				.where(" group by a.item_idcd, a.cstm_idcd, a.sale_pric									")
			;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  a.item_idcd															")
					.where("       , null as prod_name														")
					.where("       , null as prod_code														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_code														")
					.where("       , concat(a.cstm_name,' 계') as cstm_name									")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , null as sale_pric														")
					.where("       , sum(a.sale_amnt) as sale_amnt											")
					.where("       , null as m2																")
					.where("       , null as prod_spec														")
					.where("       , 2 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.cstm_idcd															")
//					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//합계
				data.param
					.where(" union all																		")
					.where(" select '99999999' as item_idcd													")
					.where("       , null as prod_name														")
					.where("       , null as prod_code														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_code														")
					.where("       , '합계' as cstm_name														")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , null as sale_pric														")
					.where("       , sum(a.sale_amnt) as sale_amnt											")
					.where("       , null as m2																")
					.where("       , null as prod_spec														")
					.where("       , 3 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
			data.param
				.where(" order by item_idcd, cstm_idcd, rnum limit 9999999									")
				.where(") a																					")
			;
		}else if(dvcd.equals("3")){			//계산서기준
			data.param
				.where("from ( 																											")
				.where("with cte as ( 																									")
				.where("     select a.item_idcd       , p.prod_name       , p.prod_code       , c.cstm_idcd								")
				.where("          , a.sale_pric       , a.sale_amnt       , p.prod_spec       , p.m2									")
				.where("          , c.cstm_name       , c.cstm_code       , a.ostt_qntt													")
				.where("     from ( select invc_numb																					")
				.where("            from sale_ostt_mast																					")
				.where("            where 1=1																							")
				.where("            and  invc_date  >= :invc1_date				" , arg.getParamText("invc_date1"))
				.where("            and  invc_date  <= :invc2_date				" , arg.getParamText("invc_date2"))
				.where("     ) ostt																										")
				.where("     left outer join sale_ostt_mast b on b.invc_numb = ostt.invc_numb											")
				.where("     left outer join sale_ostt_item a on b.invc_numb = a.invc_numb												")
	//			.where("     left outer join ( select invc_numb   , line_seqn   , item_idcd   , sale_pric   , sale_amnt					")
	//			.where("                            , ostt_qntt   , find_name															")
	//			.where("                       from sale_ostt_item																		")
	//			.where("                       where 1=1																				")
	//			.where("                      ) a on b.invc_numb = a.invc_numb															")
				.where("     left outer join ( select prod_idcd   , prod_name   , prod_code   , (pqty_mxm2 * mxm2_pric) as m2			")
				.where("                            , concat(prod_leng,'*',prod_widh,'*',prod_hght) as prod_spec						")
				.where("                       from product_mast																		")
				.where("                       where 1=1																				")
				.where("     and    p.prod_code  >= :prod_code				" , arg.getParamText("prod_code"))
				.where("     and    p.prod_code  <= :prod_code2				" , arg.getParamText("prod_code2"))
				.where("                     )	p on a.item_idcd = p.prod_idcd															")
				.where("     left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd													")
				.where("     where 1=1																									")
				.where("     and  a.sale_invc_numb is not null																			")
				.where("     and  a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
				.where("     and  a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
				.where(")																												")
			;

			data.param
				.where(" select  a.item_idcd															")
				.where("       , a.prod_name															")
				.where("       , a.prod_code															")
				.where("       , a.cstm_idcd															")
				.where("       , a.cstm_code															")
				.where("       , a.cstm_name															")
				.where("       , a.ostt_qntt															")
				.where("       , a.sale_pric															")
				.where("       , a.sale_amnt															")
				.where("       , a.m2																	")
				.where("       , a.prod_spec															")
				.where("       , 1 as rnum																")
				.where("       , null as cnt															")
				.where(" from cte a																		")
				.where(" group by a.item_idcd, a.cstm_idcd, a.sale_pric									")
			;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  a.item_idcd															")
					.where("       , null as prod_name														")
					.where("       , null as prod_code														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_code														")
					.where("       , concat(a.cstm_name,' 계') as cstm_name									")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , null as sale_pric														")
					.where("       , sum(a.sale_amnt) as sale_amnt											")
					.where("       , null as m2																")
					.where("       , null as prod_spec														")
					.where("       , 2 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.cstm_idcd															")
//					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  '99999999' as item_idcd												")
					.where("       , null as prod_name														")
					.where("       , null as prod_code														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_code														")
					.where("       , '합계' as cstm_name														")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , null as sale_pric														")
					.where("       , sum(a.sale_amnt) as sale_amnt											")
					.where("       , null as m2																")
					.where("       , null as prod_spec														")
					.where("       , 3 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
			data.param
				.where(" ORDER BY item_idcd, cstm_idcd, rnum												")
				.where(") a																					")
			;
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}



}
