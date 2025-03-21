package com.sky.system.custom.iypkg.sale.order.slorlist3;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class SlorList3Service extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																							")

		;
		data.param
			.where("from ( select   a.invc_date     , b.cstm_name     , a.invc_numb										")
			.where("              , a.prod_name     , a.item_leng     , a.item_widh										")
			.where("              , a.item_hght     , a.acpt_qntt     , a.pqty_pric										")
			.where("              , a.sply_amnt     , a.vatx_amnt     , a.pcod_numb										")
			.where("              , a.deli_date     , c.user_name														")
			.where("              ,  TRUNCATE(((ifnull(sum(x.istt_amnt),0)/ifnull(a.sply_amnt,0))*100),2) as vatx		")
			.where("       from boxx_acpt a																				")
			.where("       left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd										")
			.where("       left outer join user_mast c on a.drtr_idcd = c.user_idcd										")
			.where("       left outer join purc_ordr_item o on a.invc_numb = o.orig_invc_numb							")
			.where("       left outer join purc_istt_item x on x.orig_invc_numb = o.invc_numb and x.orig_seqn = o.line_seqn	")
			.where("       where  1=1																						")
			.where("       and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("       and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc1_date"))
			.where("       and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc2_date"))
			.where("       and    b.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("       and    b.cstm_name   = :cstm_name				" , arg.getParamText("cstm_name" ))
			.where("       and    a.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("       and    a.prod_name   = :prod_name				" , arg.getParamText("prod_name" ))
			.where("       and    c.user_idcd   = :user_idcd				" , arg.getParamText("user_idcd" ))
			.where("       and    c.user_name   = :user_name				" , arg.getParamText("user_name" ))
			.where("       and    a.invc_numb   = :invc_numb				" , arg.getParamText("invc_numb" ))
			.where("       and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("       and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("       group by a.invc_numb																			")
			.where("       order by a.invc_date desc, a.invc_numb desc													")
			.where(") a																									")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}



	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																						")
		;
		data.param
			.where("from ( 																							")
			.where("   select a.invc_date     , b.cstm_name     , a.invc_numb										")
			.where("        , a.prod_name     , a.item_leng     , a.item_widh										")
			.where("        , a.item_hght     , a.acpt_qntt     , a.pqty_pric										")
			.where("        , a.sply_amnt     , a.vatx_amnt     , a.pcod_numb										")
			.where("        , a.deli_date     , c.user_name															")
			.where("        ,  TRUNCATE(((ifnull(sum(x.istt_amnt),0)/ifnull(a.sply_amnt,0))*100),2) as vatx			")
			.where("   from boxx_acpt a																				")
			.where("   left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd										")
			.where("   left outer join user_mast c on a.drtr_idcd = c.user_idcd										")
			.where("   left outer join purc_ordr_item o on a.invc_numb = o.orig_invc_numb							")
			.where("   left outer join purc_istt_item x on x.orig_invc_numb = o.invc_numb and x.orig_seqn = o.line_seqn	")
			.where("   where  1=1																					")
			.where("   and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("   and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc1_date"))
			.where("   and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc2_date"))
			.where("   and    b.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("   and    b.cstm_name   = :cstm_name				" , arg.getParamText("cstm_name" ))
			.where("   and    a.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("   and    a.prod_name   = :prod_name				" , arg.getParamText("prod_name" ))
			.where("   and    c.user_idcd   = :user_idcd				" , arg.getParamText("user_idcd" ))
			.where("   and    c.user_name   = :user_name				" , arg.getParamText("user_name" ))
			.where("   and    a.invc_numb   like %:invc_numb%			" , arg.getParamText("invc_numb" ))
			.where("   and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("   and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("   group by a.invc_numb																			")
			.where("   order by a.invc_date asc, a.invc_numb asc													")
			.where(") a																								")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	/* 일자별 */
	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
			.query("select x.*																									")
		;
		data.param
			.where("from (																										")
			.where("with cte as (																								")
			.where("select a.invc_date     , a.cstm_idcd     , b.cstm_name     , a.invc_numb									")
			.where("	 , a.prod_name     , a.item_leng     , a.item_widh     , a.prod_idcd									")
			.where("	 , a.item_hght     , a.acpt_qntt     , a.pqty_pric														")
			.where("	 , a.sply_amnt     , a.vatx_amnt     , a.pcod_numb														")
			.where("	 , a.deli_date     , c.user_name     , a.drtr_idcd														")
			.where("     ,  TRUNCATE(((ifnull(sum(x.istt_amnt),0)/ifnull(a.sply_amnt,0))*100),2) as vatx						")
			.where("from boxx_acpt a																							")
			.where("left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd													")
			.where("left outer join user_mast c on a.drtr_idcd = c.user_idcd													")
			.where("left outer join purc_ordr_item o on a.invc_numb = o.orig_invc_numb											")
			.where("left outer join purc_istt_item x on x.orig_invc_numb = o.invc_numb and x.orig_seqn = o.line_seqn			")
			.where("where  1=1																			")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc1_date"))
			.where("and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc2_date"))
			.where("and    b.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    b.cstm_name   = :cstm_name				" , arg.getParamText("cstm_name" ))
			.where("and    a.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("and    a.prod_name   = :prod_name				" , arg.getParamText("prod_name" ))
			.where("and    c.user_idcd   = :user_idcd				" , arg.getParamText("user_idcd" ))
			.where("and    c.user_name   = :user_name				" , arg.getParamText("user_name" ))
			.where("and    a.invc_numb   like %:invc_numb%			" , arg.getParamText("invc_numb" ))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("group by a.invc_numb							")
			.where(")												")
		;
		data.param
			.where(" select a.invc_date")
			.where("      , a.prod_idcd")
			.where("      , a.cstm_idcd")
			.where("      , a.cstm_name")
			.where("      , a.invc_numb")
			.where("      , a.prod_name")
			.where("      , a.item_leng")
			.where("      , a.item_widh")
			.where("      , a.item_hght")
			.where("      , a.acpt_qntt")
			.where("      , a.pqty_pric")
			.where("      , a.sply_amnt")
			.where("      , a.vatx_amnt")
			.where("      , a.pcod_numb")
			.where("      , a.user_name")
			.where("      , a.drtr_idcd")
			.where("      , a.vatx")
			.where("      , a.invc_date as crt_date")
			.where("      , 1 as rnum")
			.where("   from cte a")
		;
		if(arg.getParamText("chk" ).contains("0")) {			//월계
			data.param
				.where(" union all")
				.where(" select concat(a.invc_date, ' ','소계') as invc_date")
				.where("      , null as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , a.invc_date as crt_date")
				.where("      , 2 as rnum")
				.where("   from cte a")
				.where("   group by a.invc_date")
			;
		}
		if(arg.getParamText("chk" ).contains("1")) {			//일계
			data.param
				.where(" union all")
				.where(" select concat(a.invc_date, ' ','일계') as invc_date")
				.where("      , null as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , a.invc_date as crt_date")
				.where("      , 3 as rnum")
				.where("   from cte a")
				.where("   group by a.invc_date")
			;
		}
		if(arg.getParamText("chk" ).contains("2")) {			//월계
			data.param
				.where(" union all")
				.where(" select concat(substr(a.invc_date,1,6), ' ', '월계') as invc_date")
				.where("      , null as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , concat(substr(a.invc_date,1,6),'99') as crt_date")
				.where("      , 4 as rnum")
				.where("   from cte a")
				.where("   group by concat(substr(a.invc_date,1,6), '99')")
			;
		}
		if(arg.getParamText("chk" ).contains("3")) {			//합계
			data.param
				.where(" union all")
				.where(" select '합계' as invc_date")
				.where("      , null as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , '99999999' as crt_date")
				.where("      , 5 as rnum")
				.where("   from cte a")
				.where("  group by '99999999'")
			;
		}
		data.param
			.where("     ) x ")
			.where(" order by x.crt_date , x.rnum , x.invc_numb ")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	/* 거래처별 */
	public SqlResultMap getSearch4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
			.query("select x.*																									")
		;
		data.param
			.where("from (																										")
			.where("with cte as (																								")
			.where("select a.invc_date     , a.cstm_idcd     , b.cstm_name     , a.invc_numb									")
			.where("	 , a.prod_name     , a.item_leng     , a.item_widh														")
			.where("	 , a.item_hght     , a.acpt_qntt     , a.pqty_pric														")
			.where("	 , a.sply_amnt     , a.vatx_amnt     , a.pcod_numb														")
			.where("	 , a.deli_date     , c.user_name     , a.drtr_idcd														")
			.where("     ,  TRUNCATE(((ifnull(sum(x.istt_amnt),0)/ifnull(a.sply_amnt,0))*100),2) as vatx						")
			.where("from boxx_acpt a																							")
			.where("left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd													")
			.where("left outer join user_mast c on a.drtr_idcd = c.user_idcd													")
			.where("left outer join purc_ordr_item o on a.invc_numb = o.orig_invc_numb											")
			.where("left outer join purc_istt_item x on x.orig_invc_numb = o.invc_numb and x.orig_seqn = o.line_seqn			")
			.where("where  1=1																			")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc1_date"))
			.where("and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc2_date"))
			.where("and    b.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    b.cstm_name   = :cstm_name				" , arg.getParamText("cstm_name" ))
			.where("and    a.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("and    a.prod_name   = :prod_name				" , arg.getParamText("prod_name" ))
			.where("and    c.user_idcd   = :user_idcd				" , arg.getParamText("user_idcd" ))
			.where("and    c.user_name   = :user_name				" , arg.getParamText("user_name" ))
			.where("and    a.invc_numb   like %:invc_numb%			" , arg.getParamText("invc_numb" ))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("group by a.invc_numb							")
			.where(")												")
		;
		data.param
			.where(" select a.invc_date")
			.where("      , a.cstm_idcd")
			.where("      , a.cstm_name")
			.where("      , a.invc_numb")
			.where("      , a.prod_name")
			.where("      , a.item_leng")
			.where("      , a.item_widh")
			.where("      , a.item_hght")
			.where("      , a.acpt_qntt")
			.where("      , a.pqty_pric")
			.where("      , a.sply_amnt")
			.where("      , a.vatx_amnt")
			.where("      , a.pcod_numb")
			.where("      , a.user_name")
			.where("      , a.drtr_idcd")
			.where("      , a.vatx")
			.where("      , a.invc_date as crt_date")
			.where("      , 1 as rnum")
			.where("   from cte a")
		;
		if(arg.getParamText("chk" ).contains("0")) {			//소계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , max(a.cstm_idcd) as cstm_idcd")
				.where("      , concat(a.cstm_name, ' ','소계') as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , '99999998' as crt_date")
				.where("      , 4 as rnum")
				.where("   from cte a")
				.where("   group by a.cstm_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("1")) {			//일계
			data.param
				.where(" union all")
				.where(" select a.invc_date")
				.where("      , max(a.cstm_idcd) as cstm_idcd")
				.where("      , concat(a.cstm_name, ' ','일계') as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , a.invc_date as crt_date")
				.where("      , 2 as rnum")
				.where("   from cte a")
				.where("   group by a.invc_date, a.cstm_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("2")) {			//월계
			data.param
				.where(" union all")
				.where(" select substr(a.invc_date,1,6) as invc_date")
				.where("      , max(a.cstm_idcd) as cstm_idcd")
				.where("      , concat(a.cstm_name, ' ','월계') as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , concat(substr(a.invc_date,1,6),'99') as crt_date")
				.where("      , 3 as rnum")
				.where("   from cte a")
				.where("   group by concat(substr(a.invc_date,1,6), '98'), a.cstm_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("3")) {			//합계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , max(a.cstm_idcd) as cstm_idcd")
				.where("      , '합계' as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , '99999999' as crt_date")
				.where("      , 5 as rnum")
				.where("   from cte a")
				.where("  group by '99999999'")
			;
		}
		data.param
			.where("     ) x ")
			.where(" order by x.cstm_idcd, x.crt_date , x.rnum , x.invc_numb ")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

//	/* 담당자별 */
//	public SqlResultMap getSearch5(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
//		DataMessage data = arg.newStorage("POS");
//
//		data.param
//		.total(" select  count(1) as maxsize  ")
//		;
//		data.param
//			.query("select  a.*																							")
//
//		;
//		data.param
//			.where("from ( select   a.invc_date     , b.cstm_name     , a.invc_numb										")
//			.where("              , a.prod_name     , a.item_leng     , a.item_widh										")
//			.where("              , a.item_hght     , a.acpt_qntt     , a.pqty_pric										")
//			.where("              , a.sply_amnt     , a.vatx_amnt     , a.pcod_numb										")
//			.where("              , a.deli_date     , c.user_name     , a.drtr_idcd										")
//			.where("              ,  TRUNCATE(((ifnull(sum(x.istt_amnt),0)/ifnull(a.sply_amnt,0))*100),2) as vatx		")
//			.where("       from boxx_acpt a																				")
//			.where("       left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd										")
//			.where("       left outer join user_mast c on a.drtr_idcd = c.user_idcd										")
//			.where("       left outer join purc_ordr_item o on a.invc_numb = o.orig_invc_numb							")
//			.where("       left outer join purc_istt_item x on x.orig_invc_numb = o.invc_numb and x.orig_seqn = o.line_seqn	")
//			.where("       where  1=1																						")
//			.where("       and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
//			.where("       and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc1_date"))
//			.where("       and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc2_date"))
//			.where("       and    b.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
//			.where("       and    b.cstm_name   = :cstm_name				" , arg.getParamText("cstm_name" ))
//			.where("       and    a.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd" ))
//			.where("       and    a.prod_name   = :prod_name				" , arg.getParamText("prod_name" ))
//			.where("       and    c.user_idcd   = :user_idcd				" , arg.getParamText("user_idcd" ))
//			.where("       and    c.user_name   = :user_name				" , arg.getParamText("user_name" ))
//			.where("       and    a.invc_numb   = :invc_numb				" , arg.getParamText("invc_numb" ))
//			.where("       and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
//			.where("       and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
//			.where("       group by a.invc_numb																	")
//			.where("       order by a.drtr_idcd, a.invc_date, a.invc_numb desc											")
//			.where(") a																									")
//		;
//
//		if (page == 0 && rows == 0){
//			return data.selectForMap(sort) ;
//		} else {
//			return data.selectForMap(page, rows, (page==1), sort );
//		}
//	}

	/* 담당자별 */
	public SqlResultMap getSearch5(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
			.query("select x.*																									")
		;
		data.param
			.where("from (																										")
			.where("with cte as (																								")
			.where("select a.invc_date     , a.cstm_idcd     , b.cstm_name     , a.invc_numb									")
			.where("	 , a.prod_name     , a.item_leng     , a.item_widh     , a.prod_idcd									")
			.where("	 , a.item_hght     , a.acpt_qntt     , a.pqty_pric														")
			.where("	 , a.sply_amnt     , a.vatx_amnt     , a.pcod_numb														")
			.where("	 , a.deli_date     , c.user_name     , a.drtr_idcd														")
			.where("     ,  TRUNCATE(((ifnull(sum(x.istt_amnt),0)/ifnull(a.sply_amnt,0))*100),2) as vatx						")
			.where("from boxx_acpt a																							")
			.where("left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd													")
			.where("left outer join user_mast c on a.drtr_idcd = c.user_idcd													")
			.where("left outer join purc_ordr_item o on a.invc_numb = o.orig_invc_numb											")
			.where("left outer join purc_istt_item x on x.orig_invc_numb = o.invc_numb and x.orig_seqn = o.line_seqn			")
			.where("where  1=1																			")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc1_date"))
			.where("and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc2_date"))
			.where("and    b.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    b.cstm_name   = :cstm_name				" , arg.getParamText("cstm_name" ))
			.where("and    a.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("and    a.prod_name   = :prod_name				" , arg.getParamText("prod_name" ))
			.where("and    c.user_idcd   = :user_idcd				" , arg.getParamText("user_idcd" ))
			.where("and    c.user_name   = :user_name				" , arg.getParamText("user_name" ))
			.where("and    a.invc_numb   like %:invc_numb%			" , arg.getParamText("invc_numb" ))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("group by a.invc_numb							")
			.where(")												")
		;
		data.param
			.where(" select a.invc_date")
			.where("      , a.prod_idcd")
			.where("      , a.cstm_idcd")
			.where("      , a.cstm_name")
			.where("      , a.invc_numb")
			.where("      , a.prod_name")
			.where("      , a.item_leng")
			.where("      , a.item_widh")
			.where("      , a.item_hght")
			.where("      , a.acpt_qntt")
			.where("      , a.pqty_pric")
			.where("      , a.sply_amnt")
			.where("      , a.vatx_amnt")
			.where("      , a.pcod_numb")
			.where("      , a.user_name")
			.where("      , a.drtr_idcd")
			.where("      , a.vatx")
			.where("      , a.invc_date as crt_date")
			.where("      , 1 as rnum")
			.where("   from cte a")
		;
		if(arg.getParamText("chk" ).contains("0")) {			//소계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , null as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , concat(a.user_name, ' ','소계') as user_name")
				.where("      , max(a.drtr_idcd) as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , '99999998' as crt_date")
				.where("      , 4 as rnum")
				.where("   from cte a")
				.where("   group by a.drtr_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("1")) {			//일계
			data.param
				.where(" union all")
				.where(" select a.invc_date ")
				.where("      , null as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , concat(a.user_name, ' ','일계') as user_name")
				.where("      , max(a.drtr_idcd) as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , a.invc_date as crt_date")
				.where("      , 2 as rnum")
				.where("   from cte a")
				.where("   group by a.invc_date, a.drtr_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("2")) {			//월계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , null as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , concat(a.user_name, ' ','월계') as user_name")
				.where("      , max(a.drtr_idcd) as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , concat(substr(a.invc_date,1,6),'99') as crt_date")
				.where("      , 3 as rnum")
				.where("   from cte a")
				.where("   group by concat(substr(a.invc_date,1,6), '99'), a.drtr_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("3")) {			//합계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , null as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , null as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , '합계' as user_name")
				.where("      , max(a.drtr_idcd) as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , '99999999' as crt_date")
				.where("      , 5 as rnum")
				.where("   from cte a")
				.where("  group by '99999999'")
			;
		}
		data.param
			.where("     ) x ")
			.where(" order by x.drtr_idcd, x.crt_date , x.rnum , x.invc_numb ")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/* 품목별 */
	public SqlResultMap getSearch6(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize	")
		;
		data.param
			.query("select x.*																									")
		;
		data.param
			.where("from (																										")
			.where("with cte as (																								")
			.where("select a.invc_date     , a.cstm_idcd     , b.cstm_name     , a.invc_numb									")
			.where("	 , a.prod_name     , a.item_leng     , a.item_widh     , a.prod_idcd									")
			.where("	 , a.item_hght     , a.acpt_qntt     , a.pqty_pric														")
			.where("	 , a.sply_amnt     , a.vatx_amnt     , a.pcod_numb														")
			.where("	 , a.deli_date     , c.user_name     , a.drtr_idcd														")
			.where("     ,  TRUNCATE(((ifnull(sum(x.istt_amnt),0)/ifnull(a.sply_amnt,0))*100),2) as vatx						")
			.where("from boxx_acpt a																							")
			.where("left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd													")
			.where("left outer join user_mast c on a.drtr_idcd = c.user_idcd													")
			.where("left outer join purc_ordr_item o on a.invc_numb = o.orig_invc_numb											")
			.where("left outer join purc_istt_item x on x.orig_invc_numb = o.invc_numb and x.orig_seqn = o.line_seqn			")
			.where("where  1=1																			")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc1_date"))
			.where("and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc2_date"))
			.where("and    b.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    b.cstm_name   = :cstm_name				" , arg.getParamText("cstm_name" ))
			.where("and    a.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("and    a.prod_name   = :prod_name				" , arg.getParamText("prod_name" ))
			.where("and    c.user_idcd   = :user_idcd				" , arg.getParamText("user_idcd" ))
			.where("and    c.user_name   = :user_name				" , arg.getParamText("user_name" ))
			.where("and    a.invc_numb   like %:invc_numb%			" , arg.getParamText("invc_numb" ))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("group by a.invc_numb							")
			.where(")												")
		;
		data.param
			.where(" select a.invc_date")
			.where("      , a.prod_idcd")
			.where("      , a.cstm_idcd")
			.where("      , a.cstm_name")
			.where("      , a.invc_numb")
			.where("      , a.prod_name")
			.where("      , a.item_leng")
			.where("      , a.item_widh")
			.where("      , a.item_hght")
			.where("      , a.acpt_qntt")
			.where("      , a.pqty_pric")
			.where("      , a.sply_amnt")
			.where("      , a.vatx_amnt")
			.where("      , a.pcod_numb")
			.where("      , a.user_name")
			.where("      , a.drtr_idcd")
			.where("      , a.vatx")
			.where("      , a.invc_date as crt_date")
			.where("      , 1 as rnum")
			.where("   from cte a")
		;
		if(arg.getParamText("chk" ).contains("0")) {			//소계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , max(a.prod_idcd) as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , concat(a.prod_name, ' ','소계') as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , '99999998' as crt_date")
				.where("      , 4 as rnum")
				.where("   from cte a")
				.where("   group by a.prod_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("1")) {			//일계
			data.param
				.where(" union all")
				.where(" select a.invc_date")
				.where("      , max(a.prod_idcd) as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , concat(a.prod_name, ' ','일계') as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , a.invc_date as crt_date")
				.where("      , 2 as rnum")
				.where("   from cte a")
				.where("   group by a.invc_date, a.prod_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("2")) {			//월계
			data.param
				.where(" union all")
				.where(" select substr(a.invc_date,1,6) as invc_date")
				.where("      , max(a.prod_idcd) as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , concat(a.prod_name, ' ','월계') as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , concat(substr(a.invc_date,1,6),'99') as crt_date")
				.where("      , 3 as rnum")
				.where("   from cte a")
				.where("   group by concat(substr(a.invc_date,1,6), '99'), a.prod_idcd")
			;
		}
		if(arg.getParamText("chk" ).contains("3")) {			//합계
			data.param
				.where(" union all")
				.where(" select null as invc_date")
				.where("      , max(a.prod_idcd) as prod_idcd")
				.where("      , null as cstm_idcd")
				.where("      , null as cstm_name")
				.where("      , null as invc_numb")
				.where("      , '합계' as prod_name")
				.where("      , null as item_leng")
				.where("      , null as item_widh")
				.where("      , null as item_hght")
				.where("      , sum(a.acpt_qntt) as acpt_qntt")
				.where("      , '' as pqty_pric")
				.where("      , sum(a.sply_amnt) as sply_amnt")
				.where("      , sum(a.vatx_amnt) as vatx_amnt")
				.where("      , null as pcod_numb")
				.where("      , null as user_name")
				.where("      , null as drtr_idcd")
				.where("      , sum(a.vatx) as vatx")
				.where("      , '99999999' as crt_date")
				.where("      , 5 as rnum")
				.where("   from cte a")
				.where("  group by '99999999'")
			;
		}
		data.param
			.where("     ) x ")
			.where(" order by x.prod_idcd, x.crt_date , x.rnum , x.invc_numb ")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
