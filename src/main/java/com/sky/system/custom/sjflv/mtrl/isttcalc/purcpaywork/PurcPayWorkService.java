package com.sky.system.custom.sjflv.mtrl.isttcalc.purcpaywork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service("sjflv.PurcPayworkService")
public class PurcPayWorkService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.iomy_dvcd       , a.invc_numb       , a.invc_date       , a.cstm_idcd		")
			.query("       , a.dept_idcd       , a.drtr_idcd       , a.iomy_date       , a.stot_dvcd		")
			.query("       , a.stot_bass       , a.publ_date       , a.expr_date       , a.paym_bank_name	")
			.query("       , a.apvl_yorn       , a.apvl_drtr_idcd  , a.apvl_date       , a.plan_date		")
			.query("       , a.plan_amnt       , a.remk_text												")
			.query("       , sum(b.sply_amnt) as sply_amnt         , sum(b.vatx_amnt) as vatx_amnt			")
			.query("       , sum(b.ttsm_amnt) as ttsm_amnt         , p.dept_name							")
			.query("       , c.cstm_code       , c.cstm_name       , u.user_name as drtr_name				")

			.query("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl		")
			.query("       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name		")
			.query("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd		")
			.query("       , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm		")
			.query("       , a.crte_idcd       , a.crte_urif												")
		;
		data.param
			.where("from crdt_colt_mast a 																	")
			.where("left outer join crdt_colt_item b on a.invc_numb = b.invc_numb and a.iomy_dvcd = b.iomy_dvcd	")
			.where("left outer join cstm_mast      c on c.cstm_idcd = a.cstm_idcd							")
			.where("left outer join user_mast      u on u.user_idcd = a.drtr_idcd							")
			.where("left outer join dept_mast      p on p.dept_idcd = a.dept_idcd							")
			.where("where a.iomy_dvcd = 2																	")
			.where("and   a.cstm_idcd = :cstm_idcd"      , arg.getParamText("cstm_idcd"))
			.where("and   a.invc_date >= :invc_date1"    , arg.getParamText("invc_date1"))
			.where("and   a.invc_date <= :invc_date2"    , arg.getParamText("invc_date2"))
			.where("and   a.line_stat < 2																	")
			.where("group by a.invc_numb																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String [] line_seqn = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("txbl_line_seqn"))) {
				line_seqn = ((String)arg.getParameter("txbl_line_seqn")).split(",");
		}


		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.iomy_dvcd       , a.invc_numb       , a.line_seqn       , a.item_idcd		")
			.query("       , a.item_name       , a.item_spec       , a.orig_invc_numb  , a.orig_invc_seqn	")
			.query("       , a.txbl_numb       , a.txbl_seqn       , a.iomy_amnt       , a.qntt				")
			.query("       , a.pric            , a.sply_amnt       , a.vatx_amnt       , a.ttsm_amnt		")
			.query("       , i.item_code       , u.unit_name												")

			.query("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl		")
			.query("       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name		")
			.query("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd		")
			.query("       , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm		")
			.query("       , a.crte_idcd       , a.crte_urif												")

		;
		data.param
			.where("from crdt_colt_item a																	")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd								")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd								")
			.where("where a.iomy_dvcd = 2																	")
			.where("and   a.invc_numb = :invc_numb"      , arg.getParamText("invc_numb"))

		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with txbl as (																							")
			.query("   select a.invc_numb    , a.line_seqn    , i.item_code    , i.item_name    , i.item_spec				")
			.query("        , a.istt_amnt as sply_amnt        , a.istt_vatx as vatx_amnt									")
			.query("        , a.ttsm_amnt    , b.cstm_idcd    , a.item_idcd    , b.invc_date    , c.cstm_name				")
			.query("        , a.istt_qntt as qntt             , b.invc_date as istt_date        , u.unit_name				")
			.query("        , a.stnd_unit    , c.buss_numb    , c.cstm_code    , c.tele_numb    , c.mail_addr				")
			.query("        , s.user_name as drtr_name        , d.dept_name													")
			.query("     from purc_istt_item a																				")
			.query("        left outer join purc_istt_mast b on a.invc_numb = b.invc_numb									")
			.query("        left outer join item_mast      i on i.item_idcd = a.item_idcd									")
			.query("        left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd									")
			.query("        left outer join unit_mast      u on u.unit_idcd = a.stnd_unit									")
			.query("        left outer join user_mast      s on b.drtr_idcd = s.user_idcd									")
			.query("        left outer join dept_mast      d on d.dept_idcd = b.dept_idcd									")
			.query("    where 1 = 1																							")
			.query("      and b.istt_dvcd = '1100'																			")
			.query("      and b.line_stat < 2																				")
			.query("      and b.cstm_idcd   = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.query("      and b.invc_date  >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.query("      and b.invc_date  <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.query("     group by a.invc_numb																				")
			.query("), colt  as (																							")
			.query("   select a.invc_numb  , a.line_seqn, sum(b.iomy_amnt) as iomy_amnt , b.item_idcd    , c.cstm_idcd		")
			.query("        , c.invc_date  , b.orig_invc_numb   , b.orig_invc_seqn      , b.qntt         , b.pric			")
			.query("        , b.txbl_numb  , b.txbl_seqn																	")
			.query("     from txbl a																						")
			.query("        left outer join crdt_colt_item b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn		")
			.query("        left outer join crdt_colt_mast c on b.invc_numb = c.invc_numb									")
			.query("   where 1 = 1																							")
			.query("     and c.iomy_dvcd = '2'																				")
			.query("     and c.line_stat < 2																				")
			.query("   group by a.invc_numb, a.line_seqn																	")
			.query(")																										")
			.query("   select  a.invc_numb   , a.item_code   , a.item_name   , a.item_spec							")
			.query("         , a.sply_amnt   , a.vatx_amnt   , a.ttsm_amnt   , a.item_idcd    , a.cstm_name					")
			.query("         , a.cstm_idcd   , a.qntt        , a.istt_date   , a.unit_name    , a.stnd_unit					")
			.query("         , a.buss_numb   , a.cstm_code   , a.tele_numb   , a.mail_addr    , a.cstm_code					")
			.query("         , a.drtr_name   , a.dept_name																	")
			.query("     from txbl a 																						")
			.query("          left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn				")
			.query("   where 1 = 1																							")
			.query("      and ifnull(a.ttsm_amnt,0) > ifnull(b.iomy_amnt, 0)												")
			.query("   order by a.istt_date desc  , a.invc_numb desc   , a.line_seqn					")
		;

		return data.selectForMap();
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with txbl as (																							")
			.query("   select a.invc_numb    , a.line_seqn    , i.item_code    , i.item_name    , i.item_spec				")
			.query("        , a.istt_amnt as sply_amnt        , a.istt_vatx as vatx_amnt        , a.istt_pric				")
			.query("        , a.ttsm_amnt    , b.cstm_idcd    , a.item_idcd    , b.invc_date    , c.cstm_name				")
			.query("        , a.istt_qntt as qntt             , b.invc_date as istt_date        , u.unit_name				")
			.query("        , a.stnd_unit    , c.buss_numb    , c.cstm_code    , c.tele_numb    , c.mail_addr				")
			.query("        , s.user_name as drtr_name        , d.dept_name													")
			.query("     from purc_istt_item a																				")
			.query("        left outer join purc_istt_mast b on a.invc_numb = b.invc_numb									")
			.query("        left outer join item_mast      i on i.item_idcd = a.item_idcd									")
			.query("        left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd									")
			.query("        left outer join unit_mast      u on u.unit_idcd = a.stnd_unit									")
			.query("        left outer join user_mast      s on b.drtr_idcd = s.user_idcd									")
			.query("        left outer join dept_mast      d on d.dept_idcd = b.dept_idcd									")
			.query("    where 1 = 1																							")
			.query("      and b.istt_dvcd = '1100'																			")
			.query("      and b.line_stat < 2																				")
			.query("      and a.invc_numb   = :invc_numb        " , arg.getParamText("invc_numb"  ))
			.query("), colt  as (																							")
			.query("   select a.invc_numb  , a.line_seqn, sum(b.iomy_amnt) as iomy_amnt , b.item_idcd    , c.cstm_idcd		")
			.query("        , c.invc_date  , b.orig_invc_numb   , b.orig_invc_seqn      , b.qntt         , b.pric			")
			.query("        , b.txbl_numb  , b.txbl_seqn																	")
			.query("     from txbl a																						")
			.query("        left outer join crdt_colt_item b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn		")
			.query("        left outer join crdt_colt_mast c on b.invc_numb = c.invc_numb									")
			.query("   where 1 = 1																							")
			.query("     and c.iomy_dvcd = '2'																				")
			.query("     and c.line_stat < 2																				")
			.query("   group by a.invc_numb, a.line_seqn																	")
			.query(")																										")
			.query("   select  a.invc_numb   , a.item_code   , a.item_name   , a.item_spec    , a.istt_pric					")
			.query("         , a.sply_amnt   , a.vatx_amnt   , a.ttsm_amnt   , a.item_idcd    , a.cstm_name					")
			.query("         , a.cstm_idcd   , a.qntt        , a.istt_date   , a.unit_name    , a.stnd_unit					")
			.query("         , a.buss_numb   , a.cstm_code   , a.tele_numb   , a.mail_addr    , a.cstm_code					")
			.query("         , a.drtr_name   , a.dept_name   , a.line_seqn													")
			.query("         , (ifnull(a.ttsm_amnt,0) - ifnull(b.iomy_amnt,0)) as unpaid									")
			.query("     from txbl a 																						")
			.query("          left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn				")
			.query("   where 1 = 1																							")
			.query("      and ifnull(a.ttsm_amnt,0) > ifnull(b.iomy_amnt, 0)												")
			.query("   order by a.istt_date desc  , a.invc_numb desc   , a.line_seqn					")
		;

		return data.selectForMap();
	}
	public SqlResultMap getInvoice(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  ifnull(sum(t.ttsm_amnt),0) as sply_amnt	, ifnull(sum(a.ttsm_amnt),0) as istt_amnt		")

			.where("from purc_istt_item a																			")
			.where("left outer join crdt_colt_item t on t.txbl_numb = a.invc_numb and t.txbl_seqn = a.line_seqn		")
			.where("left outer join purc_istt_mast b on a.invc_numb = b.invc_numb									")
			.where("where b.cstm_idcd =  :cstm_idcd  ", arg.getParamText("cstm_idcd" ))
			.where("and   b.invc_date >= :invc_date1 ", arg.getParamText("invc_date1" ))
			.where("and   b.invc_date <= :invc_date2 ", arg.getParamText("invc_date2" ))
			.where("and   b.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb,a.line_seqn																")
			.where("having istt_amnt > sply_amnt																	")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {

			data.clear();

			data.param
				.query("with puch as (																							")
				.query("   select a.invc_numb    , a.line_seqn    , i.item_code    , i.item_name    , i.item_spec				")
				.query("        , a.istt_amnt as sply_amnt        , a.istt_vatx as vatx_amnt									")
				.query("        , a.ttsm_amnt    , b.cstm_idcd    , a.item_idcd    , b.invc_date    , c.cstm_name				")
				.query("        , a.istt_qntt as qntt             , u.unit_name    , a.stnd_unit								")
				.query("        , case when json_value(a.json_data, '$.trns_date') is null then b.invc_date else json_value(a.json_data, '$.trns_date') end as istt_date")
				.query("        , 'puch' as istt_type																			")
				.query("     from purc_istt_item a																				")
				.query("        left outer join purc_istt_mast b on a.invc_numb = b.invc_numb									")
				.query("        left outer join item_mast      i on i.item_idcd = a.item_idcd									")
				.query("        left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd									")
				.query("        left outer join unit_mast      u on u.unit_idcd = a.stnd_unit									")
				.query("    where 1 = 1																							")
				.query("      and b.istt_dvcd = '1100'																			")
				.query("      and b.line_stat < 2																				")
				.query("      and b.cstm_idcd   = :cstm_idcd" , arg.getParamText("cstm_idcd"  ))
				.query("      and ((json_value(a.json_data, '$.trns_date') is null    											")
				.query("      and b.invc_date  >= :invc_date1" , arg.getParamText("invc_date1" ))
				.query("      and b.invc_date  <= :invc_date2)" , arg.getParamText("invc_date2" ))
				.query("      or  (json_value(a.json_data, '$.trns_date') is not null   										")
				.query("      and json_value(a.json_data, '$.trns_date') >= :invc_date3"     , arg.getParamText("invc_date1"))
				.query("      and json_value(a.json_data, '$.trns_date') <= :invc_date4))"   , arg.getParamText("invc_date2"))
				.query("  union all																								")
				.query("  select  a.invc_numb   , a.line_seqn    , i.item_code    , i.item_name    , i.item_spec				")
				.query("        , a.sply_amnt   , a.vatx_amnt 																	")
				.query("        , a.ttsm_amnt   , b.cstm_idcd    , a.item_idcd    , b.invc_date    , c.cstm_name				")
				.query("        , a.rett_qntt   , u.unit_name    , a.unit_idcd as stnd_unit										")
				.query("        , b.invc_date as istt_date 																		")
				.query("        , 'rett' as istt_type																			")
				.query("    from purc_rett_item a																				")
				.query("        left outer join purc_rett_mast b on a.invc_numb = b.invc_numb									")
				.query("        left outer join item_mast      i on i.item_idcd = a.item_idcd									")
				.query("        left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd									")
				.query("        left outer join unit_mast      u on u.unit_idcd = a.unit_idcd									")
				.query("   where 1 = 1																							")
				.query("     and b.cstm_idcd   = :cstm_idcd2        " , arg.getParamText("cstm_idcd"  ))
				.query("     and b.invc_date  >= :invc_date5       " , arg.getParamText("invc_date1" ))
				.query("     and b.invc_date  <= :invc_date6       " , arg.getParamText("invc_date2" ))
				.query("), colt  as (																							")
				.query("   select a.invc_numb  , a.line_seqn, sum(b.iomy_amnt) as iomy_amnt , b.item_idcd    , c.cstm_idcd		")
				.query("        , c.invc_date  , b.orig_invc_numb   , b.orig_invc_seqn      , b.qntt         , b.pric			")
				.query("        , b.txbl_numb  , b.txbl_seqn																	")
				.query("     from puch a																						")
				.query("        left outer join crdt_colt_item b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn		")
				.query("        left outer join crdt_colt_mast c on b.invc_numb = c.invc_numb									")
				.query("   where 1 = 1																							")
				.query("     and c.iomy_dvcd = '2'																				")
				.query("     and c.line_stat < 2																				")
				.query("   group by a.invc_numb, a.line_seqn																	")
				.query(")																										")
				.query("select a.*																								")
				.query(" from (																									")
				.query("   select  a.invc_numb   , a.line_seqn   , a.item_code   , a.item_name    , a.item_spec					")
				.query("         , case when istt_type = 'rett' then a.sply_amnt * -1 else a.sply_amnt end as sply_amnt			")
				.query("         , case when istt_type = 'rett' then a.vatx_amnt * -1 else a.vatx_amnt end as vatx_amnt			")
				.query("         , case when istt_type = 'rett' then a.ttsm_amnt * -1 else a.ttsm_amnt end as ttsm_amnt			")
				.query("         , case when istt_type = 'rett' then (a.ttsm_amnt +  ifnull(b.iomy_amnt, 0)) * -1 else a.ttsm_amnt - ifnull(b.iomy_amnt, 0) end as unpaid	")
				.query("         , a.item_idcd   , a.cstm_name																	")
				.query("         , a.cstm_idcd   , a.qntt        , a.istt_date   , a.unit_name    , a.stnd_unit	, a.istt_type	")
				.query("     from puch a 																						")
				.query("          left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn				")
				.query("   where 1 = 1																							")
				.query(" ) a																									")
				.query("   where 1 = 1 																							")
				.query("   and a.unpaid != 0 																					")
				.query("   order by a.istt_date desc  , a.invc_numb desc   , a.line_seqn										")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with txbl as (																							")
			.query("   select a.invc_numb    , a.line_seqn    , i.item_code    , i.item_name    , i.item_spec				")
			.query("        , a.istt_amnt as sply_amnt        , a.istt_vatx as vatx_amnt									")
			.query("        , a.ttsm_amnt    , b.cstm_idcd    , a.item_idcd    , b.invc_date    , c.cstm_name				")
			.query("        , a.istt_qntt as qntt             , b.invc_date as istt_date									")
			.query("     from purc_istt_item a																				")
			.query("        left outer join purc_istt_mast b on a.invc_numb = b.invc_numb									")
			.query("        left outer join item_mast      i on i.item_idcd = a.item_idcd									")
			.query("        left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd									")
			.query("    where 1 = 1																							")
			.query("      and b.istt_dvcd = '1100'																			")
			.query("      and b.line_stat < 2																				")
			.query("      and b.cstm_idcd   = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.query("      and b.invc_date  >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.query("      and b.invc_date  <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.query("), colt  as (																							")
			.query("   select a.invc_numb  , a.line_seqn, sum(b.iomy_amnt) as iomy_amnt , b.item_idcd    , c.cstm_idcd		")
			.query("        , c.invc_date  , b.orig_invc_numb   , b.orig_invc_seqn      , b.qntt         , b.pric			")
			.query("        , b.txbl_numb  , b.txbl_seqn																	")
			.query("     from txbl a																						")
			.query("        left outer join crdt_colt_item b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn		")
			.query("        left outer join crdt_colt_mast c on b.invc_numb = c.invc_numb									")
			.query("   where 1 = 1																							")
			.query("     and c.iomy_dvcd = '2'																				")
			.query("     and c.line_stat < 2																				")
			.query("   group by a.invc_numb, a.line_seqn																	")
			.query(")																										")
			.query("   select  a.invc_numb   , a.line_seqn   , a.item_code   , a.item_name    , a.item_spec					")
			.query("         , a.sply_amnt   , a.vatx_amnt   , a.ttsm_amnt   , a.item_idcd    , a.cstm_name					")
			.query("         , a.cstm_idcd   , a.qntt        , a.istt_date													")
			.query("         , (ifnull(a.ttsm_amnt,0) - ifnull(b.iomy_amnt,0)) as unpaid									")
			.query("     from txbl a 																						")
			.query("          left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn				")
			.query("   where 1 = 1																							")
			.query("      and ifnull(a.ttsm_amnt,0) > ifnull(b.iomy_amnt, 0)												")
			.query("   order by a.istt_date desc  , a.invc_numb desc   , a.line_seqn					")
		;

		return data.selectForMap();

	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map) {
			if(row.getParameter("product", SqlResultMap.class) != null) {
				setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
			}
		}
		return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map ) throws Exception {

		int i = 1;
		String invc = "";

		for(SqlResultRow row:map) {
			if(row.getParamText("chk").equals("1")){
				String remk_text = row.getParamText("item_name");

				data.param
					.table ("crdt_colt_mast")
					.where ("where iomy_dvcd = :iomy_dvcd")
					.where ("and   invc_numb = :invc_numb")

					.unique("iomy_dvcd"			, 2)									//입출금구분코드
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))	//INVOICE번호

					.update("invc_date"			, mst.getParameter("invc_date"))		//발행일자
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))		//세금계산서 일련번호
					.update("dept_idcd"			, mst.getParameter("dept_idcd"))		//부서ID
					.update("drtr_idcd"			, mst.getParameter("drtr_idcd"))		//담당자ID
					.update("iomy_date"			, mst.getParameter("invc_date"))		//입출금일자, 2022.05.30 - 이강훈 - 발행일자를 입급일자 등록
					.update("stot_dvcd"			, mst.getParameter("stot_dvcd"))		//결제구분코드
					.update("stot_bass"			, mst.getParameter("stot_bass"))		//결제근거
					.update("publ_date"			, mst.getParameter("publ_date"))		//발행일자
					.update("expr_date"			, mst.getParameter("expr_date"))		//만기일자
					.update("paym_bank_name"	, mst.getParameter("paym_bank_name"))	//지급은행명
					.update("apvl_yorn"			, mst.getParameter("apvl_yorn"))		//승인여부
					.update("apvl_drtr_idcd"	, mst.getParameter("apvl_drtr_idcd"))	//승인담당자ID
					.update("apvl_date"			, mst.getParameter("apvl_date"))		//승인일자
					.update("plan_date"			, mst.getParameter("plan_date"))		//계획일자
					.update("plan_amnt"			, mst.getParameter("total_amnt"))		//계획일자
					.update("remk_text"			, remk_text)							//비고
					.update("find_name"			, row.getParameter("new_invc_numb")
												+ "	"
												+ mst.getParameter("invc_date"))
					.update("user_memo"			, mst.getParameter("user_memo"))
					.update("sysm_memo"			, mst.getParameter("sysm_memo"))
					.insert("line_levl"			, mst.getParameter("line_levl"			))
					.insert("line_stat"			, mst.getParameter("line_stat"			))
					.update("updt_ipad"			, mst.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, mst.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, mst.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, mst.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, mst.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, mst.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, mst.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
			}
			if(invc.equals(row.fixParamText("new_invc_numb"))){
				i++;
			}else{
				invc = row.fixParamText("new_invc_numb");
				i = 1;
			}
			double sply_amnt = Double.parseDouble(row.getParamText("sply_amnt"));
			double vatx_amnt = Double.parseDouble(row.getParamText("vatx_amnt"));
			double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));
			double iomy_amnt = Double.parseDouble(row.getParamText("iomy_amnt"));
			if(vatx_amnt <= 0){
				sply_amnt = iomy_amnt;
				ttsm_amnt = iomy_amnt;
			}else{
				if(ttsm_amnt != iomy_amnt) {
					sply_amnt = ((double)Math.round(iomy_amnt / 1.1) * 10.0) / 10.0;
					vatx_amnt = iomy_amnt - sply_amnt;
					ttsm_amnt = sply_amnt + vatx_amnt;
				}
			}
			data.param
				.table ("crdt_colt_item")
				.where ("where iomy_dvcd = :iomy_dvcd")
				.where ("and   invc_numb = :invc_numb")
				.where ("and   line_seqn = :line_seqn")

				.unique("iomy_dvcd"			, 2)									//입출금구분코드
				.unique("invc_numb"			, row.fixParameter("new_invc_numb"))
				.unique("line_seqn"			, i)

				.update("item_idcd"			, row.getParameter("item_idcd"))		//품목ID
				.update("item_name"			, row.getParameter("item_name"))		//품목명
				.update("item_spec"			, row.getParameter("item_spec"))		//품목규격
				.update("orig_invc_numb"	, row.getParameter("invc_numb"))	//원invoice번호
				.update("orig_invc_seqn"	, row.getParameter("line_seqn"))	//원invoice순번
				.update("txbl_numb"			, row.getParameter("invc_numb"))		//세금계산서번호
				.update("txbl_seqn"			, row.getParameter("line_seqn"))		//세금계산서순번
				.update("iomy_amnt"			, row.getParameter("iomy_amnt"))		//입출금금액
				.update("qntt"				, row.getParameter("qntt"))				//수량
				.update("pric"				, row.getParameter("pric"))				//단가
				.update("sply_amnt"			, sply_amnt)							//공급가액
				.update("vatx_amnt"			, vatx_amnt)							//부가세액
				.update("ttsm_amnt"			, ttsm_amnt)							//합계금액
				.update("find_name"			, row.getParameter("invc_date")
											+ "	"
											+ row.getParameter("item_name"))
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
	}
	public SqlResultMap setDeleteMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			data.param
				.table ("crdt_colt_mast")
				.where ("where invc_numb = :invc_numb")

				.unique("invc_numb"			, row.fixParameter("invc_numb"))	//INVOICE번호
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
			data.param
				.table ("crdt_colt_item")
				.where ("where invc_numb = :invc_numb")

				.unique("invc_numb"			, row.fixParameter("invc_numb"))	//INVOICE번호
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}

		return null;
	}
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("crdt_colt_mast")
			.where("where invc_numb = :invc_numb ")
//			.where("and   invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
//			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

			data.param
			.table("crdt_colt_item")
//			.where("where iomy_dvcd = :iomy_dvcd ")
			.where("and   invc_numb = :invc_numb ")

//			.unique("iomy_dvcd"		, arg.fixParameter("iomy_dvcd"))
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();


		return null;
	}
}
