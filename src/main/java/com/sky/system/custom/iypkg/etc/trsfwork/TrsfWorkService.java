package com.sky.system.custom.iypkg.etc.trsfwork;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class TrsfWorkService  extends DefaultServiceHandler {

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
			.where("     select a.invc_numb       , a.invc_date       , a.cars_idcd       , c.cars_numb								")
			.where("          , s.ostt_qntt       , b.qntt            , b.totl_mxm2       , t.cstm_name as ostt_cstm				")
			.where("          , a.trnt_exps       , a.crrr_name       , s.ttsm_amnt													")
			.where("          , concat(lpad(a.need_time div 60,2,0),':',lpad(a.need_time % 60,2,0)) as need_time					")
			.where("     from trsf_mast a																							")
			.where("     left outer join trsf_item      b on a.invc_numb = b.invc_numb												")
			.where("     left outer join car_mast       c on a.cars_idcd = c.cars_idcd												")
			.where("     left outer join sale_ostt_item s on b.ostt_numb = s.invc_numb and b.ostt_seqn = s.line_seqn				")
			.where("     left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb												")
			.where("     left outer join cstm_mast      t on m.cstm_idcd = t.cstm_idcd												")
			.where("     where 1=1																									")
			.where("     and   a.find_name like %:find_name		" , arg.getParamText("find_name"))
			.where("     and   a.invc_date >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("     and   a.invc_date <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("     and   a.cars_idcd >= :cars_idcd1		" , arg.getParamText("cars_idcd1"))
			.where("     and   a.cars_idcd <= :cars_idcd2		" , arg.getParamText("cars_idcd2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.invc_date															")
			.where("       , a.cars_idcd															")
			.where("       , a.cars_numb															")
			.where("       , a.ostt_qntt															")
			.where("       , a.qntt																	")
			.where("       , a.totl_mxm2															")
			.where("       , a.ostt_cstm															")
			.where("       , a.trnt_exps															")
			.where("       , a.crrr_name															")
			.where("       , a.need_time															")
			.where("       , a.ttsm_amnt															")
			.where("       , a.invc_date as crt_date												")
			.where("       , 1 as rnum																")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , a.invc_date															")
					.where("       , a.cars_idcd															")
					.where("       , '일계' as cars_numb														")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , sum(a.qntt) as qntt													")
					.where("       , sum(a.totl_mxm2) as totl_mxm2											")
					.where("       , null as ostt_cstm														")
					.where("       , sum(a.trnt_exps) as trnt_exps											")
					.where("       , null as crrr_name														")
					.where("       , null as need_time														")
					.where("       , sum(a.ttsm_amnt) as ttsm_amnt											")
					.where("       , a.invc_date as crt_date												")
					.where("       , 2 as rnum																")
					.where(" from cte a																		")
					.where(" group by a.invc_date															")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , a.cars_idcd															")
					.where("       , '월계' as cars_numb														")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , sum(a.qntt) as qntt													")
					.where("       , sum(a.totl_mxm2) as totl_mxm2											")
					.where("       , null as ostt_cstm														")
					.where("       , sum(a.trnt_exps) as trnt_exps											")
					.where("       , null as crrr_name														")
					.where("       , null as need_time														")
					.where("       , sum(a.ttsm_amnt) as ttsm_amnt											")
					.where("       , concat(substr(a.invc_date,1,6), '99') as crt_date						")
					.where("       , 3 as rnum																")
					.where(" from cte a																		")
					.where(" group by substr(a.invc_date,1,6)												")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//합계
				data.param
				.where(" union all																		")
				.where(" select  null as invc_numb														")
				.where("       , null as invc_date														")
				.where("       , a.cars_idcd															")
				.where("       , '합계' as cars_numb														")
				.where("       , sum(a.ostt_qntt) as ostt_qntt											")
				.where("       , sum(a.qntt) as qntt													")
				.where("       , sum(a.totl_mxm2) as totl_mxm2											")
				.where("       , null as ostt_cstm														")
				.where("       , sum(a.trnt_exps) as trnt_exps											")
				.where("       , null as crrr_name														")
				.where("       , null as need_time														")
				.where("       , sum(a.ttsm_amnt) as ttsm_amnt											")
				.where("       , '99999999' as crt_date													")
				.where("       , 4 as rnum																")
				.where(" from cte a																		")
				.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, cars_idcd, rnum													")
			.where(") a																					")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
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
			.where("     select a.invc_numb       , a.invc_date       , a.cars_idcd       , c.cars_numb								")
			.where("          , s.ostt_qntt       , b.qntt            , b.totl_mxm2       , t.cstm_name as ostt_cstm				")
			.where("          , a.trnt_exps       , a.crrr_name       , s.ttsm_amnt       , m.cstm_idcd								")
			.where("          , concat(lpad(a.need_time div 60,2,0),':',lpad(a.need_time % 60,2,0)) as need_time					")
			.where("     from trsf_mast a																							")
			.where("     left outer join trsf_item      b on a.invc_numb = b.invc_numb												")
			.where("     left outer join car_mast       c on a.cars_idcd = c.cars_idcd												")
			.where("     left outer join sale_ostt_item s on b.ostt_numb = s.invc_numb and b.ostt_seqn = s.line_seqn				")
			.where("     left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb												")
			.where("     left outer join cstm_mast      t on m.cstm_idcd = t.cstm_idcd												")
			.where("     where 1=1																									")
			.where("     and   a.find_name like %:find_name		" , arg.getParamText("find_name"))
			.where("     and   a.invc_date >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("     and   a.invc_date <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("     and   a.cars_idcd >= :cars_idcd1		" , arg.getParamText("cars_idcd1"))
			.where("     and   a.cars_idcd <= :cars_idcd2		" , arg.getParamText("cars_idcd2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.invc_date															")
			.where("       , a.cars_idcd															")
			.where("       , a.cars_numb															")
			.where("       , a.ostt_qntt															")
			.where("       , a.qntt																	")
			.where("       , a.totl_mxm2															")
			.where("       , a.cstm_idcd															")
			.where("       , a.ostt_cstm															")
			.where("       , a.trnt_exps															")
			.where("       , a.crrr_name															")
			.where("       , a.need_time															")
			.where("       , a.ttsm_amnt															")
			.where("       , a.invc_date as crt_date												")
			.where("       , 1 as rnum																")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , a.invc_date															")
					.where("       , a.cars_idcd															")
					.where("       , null as cars_numb														")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , sum(a.qntt) as qntt													")
					.where("       , sum(a.totl_mxm2) as totl_mxm2											")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '일계' as ostt_cstm														")
					.where("       , sum(a.trnt_exps) as trnt_exps											")
					.where("       , null as crrr_name														")
					.where("       , null as need_time														")
					.where("       , sum(a.ttsm_amnt) as ttsm_amnt											")
					.where("       , a.invc_date as crt_date												")
					.where("       , 2 as rnum																")
					.where(" from cte a																		")
					.where(" group by a.invc_date															")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , a.cars_idcd															")
					.where("       , null as cars_numb														")
					.where("       , sum(a.ostt_qntt) as ostt_qntt											")
					.where("       , sum(a.qntt) as qntt													")
					.where("       , sum(a.totl_mxm2) as totl_mxm2											")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '월계' as ostt_cstm														")
					.where("       , sum(a.trnt_exps) as trnt_exps											")
					.where("       , null as crrr_name														")
					.where("       , null as need_time														")
					.where("       , sum(a.ttsm_amnt) as ttsm_amnt											")
					.where("       , concat(substr(a.invc_date,1,6), '99') as crt_date						")
					.where("       , 3 as rnum																")
					.where(" from cte a																		")
					.where(" group by substr(a.invc_date,1,6)												")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//합계
				data.param
				.where(" union all																		")
				.where(" select  null as invc_numb														")
				.where("       , null as invc_date														")
				.where("       , a.cars_idcd															")
				.where("       , null as cars_numb														")
				.where("       , sum(a.ostt_qntt) as ostt_qntt											")
				.where("       , sum(a.qntt) as qntt													")
				.where("       , sum(a.totl_mxm2) as totl_mxm2											")
				.where("       , max(a.cstm_idcd) as cstm_idcd											")
				.where("       , '합계' as ostt_cstm														")
				.where("       , sum(a.trnt_exps) as trnt_exps											")
				.where("       , null as crrr_name														")
				.where("       , null as need_time														")
				.where("       , sum(a.ttsm_amnt) as ttsm_amnt											")
				.where("       , '99999999' as crt_date													")
				.where("       , 4 as rnum																")
				.where(" from cte a																		")
				.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, cstm_idcd, rnum													")
			.where(") a																					")
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
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select   a.invc_numb        , a.invc_date         , a.cstm_idcd       , c.cstm_name				")
			.where("       , json_value(a.json_data , '$**.cars_idcd') as cars_idcd       , m.cars_numb				")
			.where("       , json_value(a.json_data , '$**.trnt_exps') as trnt_exps       , m.cars_alis				")
			.where("       , json_value(a.json_data , '$**.nwek_name') as nwek_name									")
			.where("       , c.cstm_code            , sum(b.ostt_qntt) as sum_qntt									")
			.where("from   sale_ostt_mast a																			")
			.where("    left outer join sale_ostt_item b  on a.invc_numb = b.invc_numb								")
			.where("    left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("    left outer join car_mast       m  on m.cars_idcd = json_value(a.json_data , '$**.cars_idcd')")
			.where("where  1=1																						")
			.where("and    a.invc_numb not in ( select ostt_numb from trsf_item )									")
			.where("and    a.find_name   like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd"))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																			")
			.where("order by a.invc_date desc																			")
			.where(") a																								")
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
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select   a.item_idcd        , p.prod_name        , (p.pqty_mxm2*p.mxm2_pric) as m2				")
			.where("       , concat(p.prod_leng,'*',p.prod_widh,'*',p.prod_hght) as prod_spec						")
			.where("       , a.invc_numb        , a.line_seqn        , p.prod_code        , a.ostt_qntt				")
			.where("       , a.acpt_numb        , b.cstm_idcd        , c.cstm_code        , c.cstm_name				")
			.where("       , b.invc_date as ostt_date																")
			.where("from   sale_ostt_item a																			")
			.where("    left outer join sale_ostt_mast b  on a.invc_numb = b.invc_numb								")
			.where("    left outer join product_mast   p  on a.item_idcd = p.prod_idcd								")
			.where("    left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd								")
			.where("where  1=1																						")
			.where("and    a.invc_numb   = :invc_numb				" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String records		= arg.getParamText("records");

		data.param
			.query("call trsf_insert (				")
			.query("   :param     "  , records		)
			.query(" )								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


}
