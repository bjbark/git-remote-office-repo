package com.sky.system.stock.lottwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class LottWorkService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																						")
			.query("       a.lott_numb      , a.wrhs_idcd    , a.item_idcd    , a.istt_date    , a.ostt_date	")
			.query("     , a.istt_qntt      , a.ostt_qntt    , a.chge_qntt    , a.stok_qntt    , a.tagg_dvcd	")
			.query("     , a.user_memo      , a.sysm_memo    , a.prnt_idcd    , a.line_levl    , a.line_ordr	")
			.query("     , a.line_stat      , a.line_clos    , a.find_name										")
			.query("     , a.updt_user_name , a.updt_ipad    , a.updt_dttm    , a.updt_idcd    , a.updt_urif	")
			.query("     , a.crte_user_name , a.crte_ipad    , a.crte_dttm    , a.crte_idcd    , a.crte_urif	")
			.query("     , i.item_name      , i.item_spec    , i.modl_name										")
			.query("     , w.wrhs_name																			")
		;
		data.param //퀴리문
			.where("from	lot_isos_sum a																		")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("        left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd							")
			.where("where	1=1																					")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.lott_numb	like %:lott_numb%"	, arg.getParameter("lott_numb"))
			.where("and		a.stok_type_dvcd = :stok_type_dvcd", arg.getParameter("stok_type_dvcd"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.dept_idcd")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.*																					")
		;
		data.param //퀴리문
			.where("from (																							")
			.where("  select																						")
			.where("         a.lott_numb      , a.wrhs_idcd    , a.item_idcd    , a.istt_date    , a.ostt_date		")
			.where("       , a.istt_qntt      , a.ostt_qntt    , a.chge_qntt    , a.tagg_dvcd						")
			.where("       , a.sysm_memo      , a.prnt_idcd     , a.line_levl   , a.line_ordr						")
			.where("       , a.line_stat      , a.line_clos    , a.find_name    , ifnull(a.stok_qntt,0) as stok_qntt")
			.where("       , a.updt_user_name , a.updt_ipad    , a.updt_dttm    , a.updt_idcd    , a.updt_urif		")
			.where("       , a.crte_user_name , a.crte_ipad    , a.crte_dttm    , a.crte_idcd    , a.crte_urif		")
			.where("       , i.item_code      , i.item_name    , i.item_spec    , i.modl_name	 , i.acct_bacd		")
			.where("       , w.wrhs_name																			")
			.where("       , (select r.base_name from base_mast r where r.prnt_idcd = '1102' and r.base_code = i.acct_bacd ) as acct_name		")
			.where("       ,  ( select user_memo from lot_isos_book where  a.lott_numb = lott_numb and stok_type_dvcd = 1 and isos_dvcd = 1200 limit 1) user_memo	")
			.where("       , (select pric from isos_book r1  where  r1.lott_numb	= a.lott_numb					")
			.where("          and r1.invc_dvcd between 1000 and 1500 limit 1 ) pric									")
			.where("       , (select case when b.isos_dvcd = '1100' then (select make_date from purc_istt_item where invc_numb = b.invc_numb and line_seqn = b.invc_seqn)	")
			.where("                      when b.isos_dvcd = '1200' then b.invc_date																						")
			.where("                      when b.isos_dvcd = '1300' then (select DATE_FORMAT(json_value(json_data, '$.make_date'), '%Y%m%d') from etit_item where invc_numb = b.invc_numb and line_seqn = b.invc_seqn) 		")
			.where("                      else null																														")
			.where("                 end 																																	")
			.where("            from lot_isos_book b where b.lott_numb = a.lott_numb and b.stok_type_dvcd = a.stok_type_dvcd order by line_seqn limit 1) as make_date 	")
			.where("  from	lot_isos_sum a																			")
			.where("          left outer join item_mast i on a.item_idcd = i.item_idcd								")
			.where("          left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd								")
			.where("          left outer join sale_ostt_item b on a.lott_numb = b.lott_numb							")
			.where("  where	1=1																						")
		;
		if(!arg.getParameter("stor_grp").equals("N1000komec1000")){
			data.param
				.where("  and     stok_qntt >  0																		")
			;
		}
		data.param
			.where("  and		a.find_name	like %:find_name% "	, arg.getParameter("find_name"))
			.where("  and		a.item_idcd	= :item_idcd      "	, arg.getParameter("item_idcd"))
			.where("  and		a.stok_type_dvcd = :stok_type_dvcd",  arg.getParameter("stok_type_dvcd"))
			.where("  and		a.line_stat	= :line_stat1     "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("  and		a.line_stat	< :line_stat      "	, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.lott_numb																			")
			.where(") a																								")
			.where("order by a.make_date																			")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	public SqlResultMap getLookupTest(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.*																					")
		;
		data.param //퀴리문
			.where("from (																							")
			.where("  select																						")
			.where("         a.lott_numb      , a.wrhs_idcd    , a.item_idcd    , a.istt_date    , a.ostt_date		")
			.where("       , a.istt_qntt      , a.ostt_qntt    , a.chge_qntt    , a.tagg_dvcd						")
			.where("       , a.sysm_memo      , a.prnt_idcd     , a.line_levl   , a.line_ordr						")
			.where("       , a.line_stat      , a.line_clos    , a.find_name    , ifnull(a.stok_qntt,0) as stok_qntt")
			.where("       , a.updt_user_name , a.updt_ipad    , a.updt_dttm    , a.updt_idcd    , a.updt_urif		")
			.where("       , a.crte_user_name , a.crte_ipad    , a.crte_dttm    , a.crte_idcd    , a.crte_urif		")
			.where("       , i.item_code      , i.item_name    , i.item_spec    , i.modl_name	 , i.acct_bacd		")
			.where("       , w.wrhs_name																			")
			.where("       , (select r.base_name from base_mast r where r.prnt_idcd = '1102' and r.base_code = i.acct_bacd ) as acct_name		")
			.where("       ,  ( select user_memo from lot_isos_book_test where  a.lott_numb = lott_numb and stok_type_dvcd = 1 and isos_dvcd = 1200 limit 1) user_memo	")
			.where("       , (select pric from isos_book_test r1  where  r1.lott_numb	= a.lott_numb					")
			.where("          and r1.invc_dvcd between 1000 and 1500 limit 1 ) pric									")
			.where("       , (select case when b.isos_dvcd = '1100' then (select make_date from purc_istt_item where invc_numb = b.invc_numb and line_seqn = b.invc_seqn)	")
			.where("                      when b.isos_dvcd = '1200' then b.invc_date																						")
			.where("                      when b.isos_dvcd = '1300' then (select DATE_FORMAT(json_value(json_data, '$.make_date'), '%Y%m%d') from etit_item where invc_numb = b.invc_numb and line_seqn = b.invc_seqn) 		")
			.where("                      else null																														")
			.where("                 end 																																	")
			.where("            from lot_isos_book_test b where b.lott_numb = a.lott_numb and b.stok_type_dvcd = a.stok_type_dvcd order by line_seqn limit 1) as make_date 	")
			.where("  from	lot_isos_sum_test a																			")
			.where("          left outer join item_mast i on a.item_idcd = i.item_idcd								")
			.where("          left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd								")
			.where("          left outer join sale_ostt_item b on a.lott_numb = b.lott_numb							")
			.where("  where	1=1																						")
		;
		if(!arg.getParameter("stor_grp").equals("N1000komec1000")){
			data.param
				.where("  and     stok_qntt >  0																		")
			;
		}
		data.param
			.where("  and		a.find_name	like %:find_name% "	, arg.getParameter("find_name"))
			.where("  and		a.item_idcd	= :item_idcd      "	, arg.getParameter("item_idcd"))
			.where("  and		a.stok_type_dvcd = :stok_type_dvcd",  arg.getParameter("stok_type_dvcd"))
			.where("  and		a.line_stat	= :line_stat1     "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("  and		a.line_stat	< :line_stat      "	, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.lott_numb																			")
			.where(") a																								")
			.where("order by a.make_date																			")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	/**
	 */
	public SqlResultMap getLookupV2(HttpRequestArgument arg , int page, int rows) throws Exception {
		String find_name1 = arg.getParamText("find_name" );

		DataMessage data = arg.newStorage("POS");

		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.*																					")
		;
		data.param //퀴리문
			.where("from (																							")
			.where("  select																						")
			.where("         a.lott_numb      , a.wrhs_idcd    , a.item_idcd    , a.istt_date    , a.ostt_date		")
			.where("       , a.istt_qntt      , a.ostt_qntt    , a.chge_qntt    , a.tagg_dvcd	 , e.qntt			")
			.where("       , a.user_memo      , a.sysm_memo    , a.prnt_idcd    , a.line_levl    , a.line_ordr		")
			.where("       , a.line_stat      , a.line_clos    , a.find_name    , ifnull(a.stok_qntt,0) as stok_qntt")
			.where("       , a.updt_user_name , a.updt_ipad    , a.updt_dttm    , a.updt_idcd    , a.updt_urif		")
			.where("       , a.crte_user_name , a.crte_ipad    , a.crte_dttm    , a.crte_idcd    , a.crte_urif		")
			.where("       , i.item_code      , i.item_name    , i.item_spec    , i.modl_name	 , e.line_seqn		")
			.where("       , w.wrhs_name	  , e.stok_type_dvcd , a.bzpl_idcd	, i.acct_bacd						")
			.where("       , (select pric from isos_book r1  where  r1.lott_numb	= a.lott_numb					")
			.where("          and r1.invc_dvcd between 1000 and 1500 limit 1 ) pric									")
			.where("       , (select case when b.isos_dvcd = '1100' then (select make_date from purc_istt_item where invc_numb = b.invc_numb and line_seqn = b.invc_seqn)	")
			.where("                      when b.isos_dvcd = '1200' then b.invc_date																						")
			.where("                      when b.isos_dvcd = '1300' then (select DATE_FORMAT(json_value(json_data, '$.make_date'), '%Y%m%d') from etit_item where invc_numb = b.invc_numb and line_seqn = b.invc_seqn) 		")
			.where("                      else null																														")
			.where("                 end 																																	")
			.where("            from lot_isos_book b where b.lott_numb = a.lott_numb and b.stok_type_dvcd = a.stok_type_dvcd order by line_seqn limit 1) as make_date 	")
			.where("  from	lot_isos_sum a																			")
			.where("          left outer join item_mast i on a.item_idcd = i.item_idcd								")
			.where("          left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd								")
			.where("          left outer join sale_ostt_item b on a.lott_numb = b.lott_numb							")
			.where("          left outer join lot_isos_book e on a.lott_numb = e.lott_numb							")
			.where("  where	1=1																						")
			.where("  and       stok_qntt >  0																		")
			.where("  and       e.lott_numb IS NULL														")
			.where("  and		(a.lott_numb	like %:find_name% "	, arg.getParamText("find_name" ))
			.where("  or		i.item_code	like %:find_name1% )", find_name1)
			.where("  and		a.item_idcd	= :item_idcd      "	, arg.getParameter("item_idcd"))
			.where("  and		a.stok_type_dvcd = :stok_type_dvcd",  arg.getParameter("stok_type_dvcd"))
			.where("  and		a.line_stat	= :line_stat1     "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("  and		a.line_stat	< :line_stat      "	, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.lott_numb																			")
			.where(") a																								")
			.where("order by a.make_date																			")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("dept_mast")
					.where("where dept_idcd  = :dept_idcd")

					.unique("dept_idcd"			, row.fixParameter("dept_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);


			} else {
				data.param
					.table("dept_mast")
					.where("where dept_code	= :dept_code" )

					.unique("dept_code"			, row.fixParameter("dept_code"))


					.update("dept_idcd"			, row.getParameter("dept_idcd"))
					.update("dept_name"			, row.getParameter("dept_name"))
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("dept_name")
												+ "	"
												+ row.fixParameter("dept_idcd"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
