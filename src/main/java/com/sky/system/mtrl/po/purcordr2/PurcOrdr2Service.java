package com.sky.system.mtrl.po.purcordr2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.PurcOrdr2Service")
public class PurcOrdr2Service  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																																		")
		;
		data.param
			.where("from (																																	")
			.where("with trst as (")
			.where(" select d.invc_numb, d.amnd_degr 																										")
			.where("   from purc_trst_mast a 																												")
			.where("        left outer join purc_trst_item b on b.invc_numb = a.invc_numb																	")
			.where("        left outer join purc_ordr_item c on c.invc_numb = b.offr_numb and c.amnd_degr = b.offr_amnd_degr and c.line_seqn = b.offr_seqn 	")
			.where("        left outer join purc_ordr_mast d on d.invc_numb = c.invc_numb and d.amnd_degr = c.amnd_degr										")
			.where("  where 1 = 1																															")
			.where("    and d.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("    and d.bzpl_idcd  = :bzpl_idcd		" , arg.getParamText("bzpl_idcd" ))  // 사업장
			.where("    and d.drtr_idcd  = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))	 // 담당자
			.where("    and d.invc_date >= :invc1_date		" , arg.getParamText("invc1_date" )) // 발주기간
			.where("    and d.invc_date <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("    and d.deli_date >= :deli1_date		" , arg.getParamText("deli1_date" )) // 납기기간
			.where("    and d.deli_date <= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("    and d.line_clos  = :line_clos		" , arg.getParamText("line_clos"  )) // 마감상태
			.where("    and d.supl_dvcd  = :supl_dvcd		" , arg.getParamText("supl_dvcd"  )) // 조달구분
			.where("    and d.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where(")																																		")
			.where("select a.line_clos, a.invc_numb, a.amnd_degr, b.cstm_code, b.cstm_name, a.invc_date, a.deli_date, c.user_name							")
			.where("     , a.stot_dvcd, a.remk_text, a.supl_dvcd, a.crny_dvcd																				")
			.where("     , (select sum(offr_qntt) from purc_ordr_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as offr_qntt				")
			.where("     , (select sum(offr_amnt) from purc_ordr_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as offr_amnt				")
			.where("     , (select sum(offr_vatx) from purc_ordr_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as offr_vatx				")
			.where("     , (select sum(ttsm_amnt) from purc_ordr_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as ttsm_amnt				")
			.where("     , (select max(invc_numb) from purc_trst_item where offr_numb = a.invc_numb and offr_amnd_degr = a.amnd_degr) as trst_numb			")
			.where("     , cast(replace(json_extract(a.json_data, '$.apvl_yorn'),'\"','') as char) as apvl_yorn												")
		;
		// 삼정의 경우 비고에 입고원료명 표시한다.
		if (arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("		, (select group_concat(c.item_name separator ' / ')																			")
				.where("		   from   purc_ordr_item  b																									")
				.where("		          left outer join item_mast c on b.item_idcd = c.item_idcd															")
				.where("		   where  b.invc_numb = a.invc_numb																							")
				.where("		   and    b.line_stat < '2') as user_memo																					")
			;
		} else {
			data.param
				.where("     , a.user_memo																													")
			;
		}
		data.param
			.where("  from purc_ordr_mast a																													")
			.where("       left outer join cstm_mast b on b.cstm_idcd = a.cstm_idcd																			")
			.where("       left outer join user_mast c on c.user_idcd = a.drtr_idcd																			")
			.where(" where 1 = 1																															")
			.where("   and exists (select '1' from trst where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr)											")
			.where(")a																																		")
			.where("order by a.invc_numb desc, a.invc_date desc																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.line_seqn, b.item_code, b.item_name , b.item_spec											")
			.query("	 , a.unit_idcd, u.unit_code, u.unit_name , a.user_memo											")
			.query("	 , a.offr_qntt, a.offr_pric, a.offr_amnt , a.offr_vatx, a.ttsm_amnt, a.deli_date as deli_date2	")
		;
		data.param
			.where("  from purc_ordr_item a																				")
			.where("       left outer join item_mast b on b.item_idcd = a.item_idcd										")
			.where("       left outer join unit_mast u on u.unit_idcd = a.unit_idcd										")
			.where(" where 1 = 1																						")
			.where("   and a.invc_numb	= :invc_numb	" , arg.getParamText("invc_numb"))
			.where("   and a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(" order by a.line_seqn																				")
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.*																				")
		;
		data.param
			.where("from (select a.acct_bacd       , a.item_idcd       , a.item_spec       , a.item_name	")
			.where("           , a.item_code       , if(p.offr_qntt, p.offr_qntt, a.qntt )  as need_qntt	")
			.where("           , if(p.deli_date, p.deli_date, null )  as deli_date2							")
			.where("from (select  a.acct_bacd      , a.item_idcd       , i.item_spec       , i.item_name	")
			.where("           , i.item_code       , sum(ifnull(a.need_qntt,0)) as qntt						")
			.where("      from   mtrl_need a																")
			.where("      left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("      where  1=1																		")
			.where("      and    a.line_stat < 2															")
			.where("      group by a.item_idcd																")
			.where("      order by i.item_name																")
			.where(") a																						")
			.where("left outer join ( select item_idcd, offr_qntt, deli_date								")
			.where("                  from purc_ordr_item													")
			.where("                  where invc_numb = :invc_numb			", arg.getParamText("invc_numb"))
			.where("                  and line_stat < 2														")
			.where("                ) p on a.item_idcd = p.item_idcd										")
			.where("where 1=1 																				")
			.where(") a																						")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																					")
		;
		data.param
			.where("from (																							")
			.where("with trst as (																					")
			.where("  select distinct a.invc_numb																	")
			.where("    from purc_trst_mast a																		")
			.where("         left outer join purc_trst_item b on b.invc_numb = a.invc_numb							")
			.where("   where 1 = 1																					")
			.where("     and a.bzpl_idcd = :bzpl_idcd		" , arg.getParamText("bzpl_idcd" ))
			.where("     and a.drtr_idcd = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("     and a.invc_date  >= :invc_date1	" , arg.getParamText("invc_date1"))
			.where("     and a.invc_date  <= :invc_date2	" , arg.getParamText("invc_date2"))
			.where("     and b.item_idcd = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("     and b.usge_dvcd = :usge_dvcd		" , arg.getParamText("usge_dvcd" ))
			.where("     and a.line_stat < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("     and b.offr_proc_dvcd = '0'																	")
			.where(")																								")
			.where("select b.invc_numb       , b.invc_date	, b.bzpl_idcd       , b.drtr_idcd						")
			.where("     , b.dept_idcd       , b.puch_reqt_dvcd  , b.remk_text       , d.user_name as drtr_name		")
			.where("     , b.user_memo       , b.sysm_memo       , b.prnt_idcd       , b.line_levl					")
			.where("     , b.line_ordr       , b.line_stat       , b.line_clos       , b.find_name					")
			.where("     , b.updt_user_name  , b.updt_ipad       , b.updt_dttm       , b.updt_idcd					")
			.where("     , b.updt_urif       , b.crte_user_name  , b.crte_ipad       , b.crte_dttm					")
			.where("     , b.crte_idcd       , b.crte_urif       , bz.bzpl_name      , c.dept_name					")
			.where("  from trst a																					")
			.where("       left outer join purc_trst_mast b  on b.invc_numb  = a.invc_numb							")
			.where("       left outer join bzpl_mast      bz on bz.bzpl_idcd = b.bzpl_idcd							")
			.where("       left outer join dept_mast      c  on c.dept_idcd  = b.dept_idcd							")
			.where("       left outer join user_mast      d  on d.user_idcd  = b.drtr_idcd							")
			.where(")a																								")
			.where("order by a.invc_date desc, a.invc_numb desc														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb      , a.line_seqn      , a.item_idcd      , a.unit_idcd      , reqt_qntt			")
			.query("		, a.deli_reqt_date , a.supl_dcnt      , a.coun_iout_dvcd , a.stnd_unit      , a.wrhs_idcd		")
			.query("		, a.cstm_idcd      , a.offr_schd_date , a.pdsd_numb      , a.uper_seqn      , a.disp_seqn		")
			.query("		, i.item_code      , u.unit_name																")
			.query("		, ifnull(a.item_name , i.item_name) as item_name  , ifnull(a.item_spec , i.item_spec) as item_spec")
//			.query("		, a.reqt_qntt as offr_qntt																		")
			.query("		, a.reqt_pric as offr_pric																		")
			.query("		, a.reqt_amnt as offr_amnt																		")
			.query("		, a.usge_dvcd      , a.offr_proc_dvcd  															")
			.query("		, a.user_memo      , a.sysm_memo      , a.prnt_idcd				 								")
			.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
		;
		data.param
			.where("from   purc_trst_item a																					")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd											")
			.where("       left outer join unit_mast u on a.unit_idcd = u.unit_code											")
			.where("where  1=1																								")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    a.offr_proc_dvcd  = '0'																			")
			.where("order by a.line_seqn																					")
		;
		return data.selectForMap();
	}


	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date					")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.coun_iout_dvcd    , a.cstm_idcd					")
			.query("		, a.divi_cont       , a.offr_qntt       , a.crny_dvcd         , a.excg_rate					")
			.query("		, a.offr_amnt       , a.offr_vatx       , a.ttsm_amnt         , a.remk_text					")
			.query("		, a.supl_dvcd																				")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl					")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name					")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd					")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm					")
			.query("		, a.crte_idcd       , a.crte_urif       , a.stot_dvcd         , a.deli_date					")
			.query("		, c.cstm_name       , c.cstm_code       , d.user_name, a.deli_date							")
			.query("		, cast(replace(json_extract(a.json_data, '$.trde_trnt_dvcd'),'\"','') as char) as trde_trnt_dvcd	")
			.query("		, cast(replace(json_extract(a.json_data, '$.apvl_yorn'),'\"','') as char) as apvl_yorn		")
			.query("from    purc_ordr_mast a																			")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd					")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd					")
			.query("where   1=1																				")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb       , a.amnd_degr       , a.line_seqn      , a.item_idcd		")
				.query("		, a.unit_idcd       , a.cstm_idcd       , a.make_cmpy_name , a.offr_qntt		")
				.query("		, a.offr_pric       , a.vatx_incl_yorn  , a.vatx_rate      , a.offr_amnt		")
				.query("		, a.offr_vatx       , a.ttsm_amnt       , a.deli_reqt_date , a.deli_date as deli_date2	")
				.query("		, a.pric_dvcd       , a.fund_dvcd       , a.dlvy_date      , a.dlvy_time		")
				.query("		, a.send_deli_date  , a.dlvy_wrhs_idcd  , a.krwn_pric      , a.krwn_amnt		")
				.query("		, a.krwn_vatx       , a.krwn_amnt_totl  , a.insd_remk_text , a.otsd_remk_text	")
				.query("		, a.stnd_unit       , a.orig_invc_numb  , a.orig_amnd_degr , a.orig_amnd_degr	")
				.query("		, a.orig_seqn																	")
				.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
				.query("		, a.line_ordr       , a.line_stat       , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
				.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
				.query("		, a.crte_idcd       , a.crte_urif												")
				.query("		, i.item_code       , i.item_name       , i.item_spec      , i.unit_idcd		")
				.query("		, u.unit_name																	")
				.query("from    purc_ordr_item a																")
				.query("        left outer join item_mast i on a.item_idcd = i.item_idcd						")
				.query("        left outer join unit_mast u on i.unit_idcd = u.unit_code						")
				.query("where   1=1																				")
				.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getInvoice2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date					")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.coun_iout_dvcd    , a.cstm_idcd					")
			.query("		, a.divi_cont       , a.offr_qntt       , a.crny_dvcd         , a.excg_rate					")
			.query("		, a.offr_amnt       , a.offr_vatx       , a.ttsm_amnt         , a.remk_text					")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl					")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name					")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd					")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm					")
			.query("		, a.crte_idcd       , a.crte_urif       , a.stot_dvcd         , a.deli_date					")
			.query("		, c.cstm_name       , c.cstm_code       , d.user_name, a.deli_date							")
	//			.query("		, (select min(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) as min_deli	")
	//			.query("		, (select max(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.query("from    purc_ordr_mast a																")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd					")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd					")
			.query("where   1=1																				")
			.query("and     a.invc_numb =:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and     a.line_stat = :line_stat1	" , arg.getParamText("line_stat1" ) , !"".equals(arg.getParamText("line_stat1" )) )
			.where("and     a.line_stat < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat1" )) )
		;
		SqlResultMap info = data.selectForMap();
		data.clear();

		if (info.size() >=1) {
		}else{
			data.param
				.query("select    count(ifnull(a.invc_numb,0)) as invc_numb									")
				.query("from purc_ordr_mast a																")
			;
			info =  data.selectForMap();
			data.clear();
		}

		data.param
			.query("select *																				")
		;

		if(arg.getParamText("invc_numb").equals("")){
			data.param
				.where("from (select  a.acct_bacd       , a.item_idcd       , i.item_spec       , i.item_name	")
				.where("            , i.item_code       , sum(ifnull(a.need_qntt,0)) as need_qntt				")
				.where("from   mtrl_need a																		")
				.where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
				.where("where  1=1																				")

				.where("and    a.line_stat        = :line_stat1 "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
				.where("and    a.line_stat   < :line_stat       "	, "2" , "".equals(arg.getParamText("line_stat" )))
				.where("group by a.item_idcd																	")
				.where("order by i.item_name																	")
				.where(") a																						")
			;
		}else{
			data.param
				.where("from (select a.acct_bacd       , a.item_idcd       , a.item_spec       , a.item_name	")
				.where("           , a.item_code       , if(p.offr_qntt, p.offr_qntt, a.qntt )  as need_qntt	")
				.where("           , if(p.deli_date, p.deli_date, null )  as deli_date2							")
				.where("from (select  a.acct_bacd      , a.item_idcd       , i.item_spec       , i.item_name	")
				.where("           , i.item_code       , sum(ifnull(a.need_qntt,0)) as qntt						")
				.where("      from   mtrl_need a																")
				.where("      left outer join item_mast i on a.item_idcd = i.item_idcd							")
				.where("      where  1=1																		")
				.where("      and    a.line_stat   < 2															")
				.where("      group by a.item_idcd																")
				.where("      order by i.item_name																")
				.where(") a																						")
				.where("left outer join ( select item_idcd, offr_qntt, deli_date								")
				.where("                  from purc_ordr_item													")
				.where("                  where invc_numb = :invc_numb			", arg.getParamText("invc_numb"))
				.where("                  and line_stat < 2														")
				.where("                ) p on a.item_idcd = p.item_idcd										")
				.where("where 1=1 																				")
				.where(") a																						")
			;
		}
		info.get(0).put("product", data.selectForMap());
		return info;
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows ,  String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select *																					")
	;
	data.param
		.where("from (																						")
		.where("select a.item_idcd        , a.item_code         , a.item_brcd_1fst    , a.item_brcd_2snd	")
		.where("     , a.item_brcd_3trd   , a.item_name         , a.item_spec         , a.modl_name			")
		.where("     , a.unit_idcd        , a.lott_idnf_code    , a.stok_mngt_yorn							")
		.where("     , a.lcls_idcd        , a.mcls_idcd         , a.scls_idcd         , a.acct_bacd			")
		.where("     , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name	")
		.where("     , case when c3.clss_name is not null then c3.clss_desc									")
		.where("            else case when c2.clss_name is not null then c2.clss_desc						")
		.where("                      else c1.clss_name														")
		.where("                 end																		")
		.where("       end  as clss_desc  																	")
		.where("     , (select base_name from base_mast r where a.acct_bacd  = r.base_code					")
		.where("                                          and   r.prnt_idcd = '1102')   as acct_bacd_name	")
		.where("     , a.item_stnm        , a.item_egnm         , a.item_egnm_stnm    , a.vatx_dvcd			")
		.where("     , a.vatx_incl_yorn   , a.optn_item_yorn    , a.sets_item_yorn    , a.roll_mngt_yorn	")
		.where("     , a.lott_mngt_yorn   , a.sral_mngt_yorn    , a.insp_objt_yorn    , a.insp_type_idcd	")
		.where("     , a.insp_mthd_dvcd   , a.smpl_stnd_dvcd    , a.insp_levl_dvcd    , a.shpm_insp_yorn	")
		.where("     , a.rcpt_insp_yorn   , a.istt_wrhs_idcd    , a.ostt_wrhs_idcd    , a.rtil_ddln_dvcd	")
		.where("     , a.rtil_ddln_dcnt   , a.stun_exng_volm    , a.sral_idnf_code    , a.ndqt_calc_dvcd	")
		.where("     , a.otod_loss_rate   , a.ostt_mthd_dvcd    , a.incm_loss_rate							")
		.where("     , a.auto_istt_yorn   , a.mtrl_bacd														")
		.where("     , (select base_name  from base_mast r where a.mtrl_bacd  = r.base_code					")
		.where("                                           and   r.prnt_idcd = '3101') as mtrl_bacd_name	")
		.where("     , b.puch_itvl_qntt   , b.avrg_supl_dcnt    , b.optm_offr_volm    , b.make_cmpy_name	")
		.where("     , b.minm_puch_qntt   , b.coun_iout_dvcd												")
		.where("     , c.colr_bacd        , c.wkfw_idcd         , c.prod_type_dvcd							")
		.where("     , c.optn_dvcd        , c.optm_prod_volm    , c.last_insp_yorn    , c.dplt_name			")
		.where("     , c.cstm_dplt_name   , c.expt_boxx_sort    , c.expt_boxx_wtfl    , c.dplt_sort			")
		.where("     , c.dplt_wtfl        , c.dplt_bulk         , c.cstm_pper_boxx    , c.cstm_dplt			")
		.where("     , c.midl_boxx        , c.larg_boxx         , c.tray									")
		.where("     , (select base_name  from base_mast r where c.colr_bacd  = r.base_code					")
		.where("                                           and   r.prnt_idcd = '3104') as colr_bacd_name	")
		.where("     , a.user_memo        , a.sysm_memo         , a.prnt_idcd          , a.line_levl		")
		.where("     , a.line_ordr        , a.line_stat         , a.line_clos          , a.find_name		")
		.where("     , a.updt_user_name   , a.updt_ipad         , a.updt_dttm          , a.updt_idcd		")
		.where("     , a.updt_urif																			")
		.where("     , a.crte_user_name   , a.crte_ipad         , a.crte_dttm         , a.crte_idcd			")
		.where("     , a.crte_urif        , u.unit_name														")
		.where("from   item_mast a																			")
		.where("       left outer join (select * from item_purc where last_yorn = '1')  b  on a.item_idcd = b.item_idcd	")
		.where("       left outer join item_adon      c  on a.item_idcd = c.item_idcd						")
		.where("       left outer join item_cont      d  on a.item_idcd = d.item_idcd						")
		.where("       left outer join item_desc      h  on a.item_idcd = h.item_idcd						")
		.where("       left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd						")
		.where("       left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd						")
		.where("       left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd						")
		.where("       left outer join unit_mast      u  on a.unit_idcd = u.unit_idcd						")
		.where("where  1=1																					")
		.where("and    a.find_name	like %:find_name%				" , arg.getParamText("find_name"))
		.where("and    d.cstm_idcd	=  :cstm_idcd					" , arg.getParameter("cstm_idcd"))
		.where("and    a.item_code	=  :item_code					" , arg.getParameter("item_code"))
		.where("and    a.line_stat  =  :line_stat1					" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
		.where("and    a.acct_bacd in ('3000')						" , "제품".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('4000')						" , "상품".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('1001')						" , "원재료".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('1002')						" , "부재료".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('1001', '1002','1003','1004')" , "자재".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('2001', '2002','3000')		" , "재공품".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('2001', '2002','3000')		" , "생산품".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('5000', '6000')				" , "기타".equals(arg.getParameter("acct_bacd")) )
		.where("and    a.acct_bacd in ('2002')						" , "반제품".equals(arg.getParameter("acct_bacd")) )
		;
		if(arg.getParamText("hqof_idcd").toUpperCase().equals("N1000A-ONE")){
			data.param
				.where("and    a.acct_bacd   in ('1001')  " , "발주".equals(arg.getParamText("acct_bacd" )))
			;
		}
		if(arg.getParamText("hqof_idcd").toUpperCase().equals("N1000SJFLV") || arg.getParamText("hqof_idcd").toUpperCase().equals("N1000SJUNG")){
			data.param
				.where("and    a.acct_bacd   in ('1001', '4000')  " , "발주".equals(arg.getParamText("acct_bacd" )))
			;
		}
		data.param
		.where("and    a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))	)
		.where("order by a.item_code ) a																	")		;
	if (page == 0 && rows == 0){
		return data.selectForMap(sort);
	} else {
		return data.selectForMap(page, rows, (page==1), sort );
	}
}

	//룩업2
	public SqlResultMap getLookup2(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb      , a.invc_date												")
			.query("        , a.cstm_idcd      , c.cstm_name      , c.cstm_code      , c.boss_name			")
			.query("        , d.line_seqn      , a.stot_dvcd      , i.modl_name								")
			.query("        , d.item_idcd      , i.item_code      , i.item_name      , i.item_spec			")
			.query("        , d.unit_idcd      , d.make_cmpy_name , d.offr_qntt								")
			.query("        , d.offr_pric      , d.vatx_incl_yorn  , d.vatx_rate      , d.offr_amnt			")
			.query("        , d.offr_vatx      , d.ttsm_amnt       , d.deli_reqt_date , d.deli_date			")
			.query("        , d.pric_dvcd      , d.fund_dvcd       , d.dlvy_date      , d.dlvy_time			")
			.query("        , d.send_deli_date , d.dlvy_wrhs_idcd  , d.krwn_pric      , d.krwn_amnt			")
			.query("        , d.krwn_vatx      , d.krwn_amnt_totl  , d.insd_remk_text , d.otsd_remk_text	")
			.query("        , d.stnd_unit      , d.orig_invc_numb  , d.orig_amnd_degr						")
			.query("        , d.orig_seqn      , i.istt_wrhs_idcd  , w.wrhs_name as 'istt_wrhs_name'		")
			.query("        , d.dlvy_qntt      , d.amnd_degr												")
			.query("        , d.offr_qntt - ifnull(d.dlvy_qntt,0) as not_dlvy_qntt							")
			.query("        , d.user_memo      , d.sysm_memo       , d.prnt_idcd      , d.line_levl			")
			.query("        , d.line_ordr      , d.line_stat       , d.line_clos      , d.find_name			")
			.query("        , d.updt_user_name , d.updt_ipad       , d.updt_dttm      , d.updt_idcd			")
			.query("        , d.updt_urif      , d.crte_user_name  , d.crte_ipad      , d.crte_dttm			")
			.query("        , d.crte_idcd      , d.crte_urif												")
			.query("        , u.unit_name																	")
		;
		data.param //퀴리문
			.where("from    purc_ordr_mast a																")
			.where("        left outer join purc_ordr_item d on a.invc_numb = d.invc_numb					")
			.where("        left outer join item_mast i on d.item_idcd = i.item_idcd						")
			.where("        left outer join wrhs_mast w on w.wrhs_idcd = i.istt_wrhs_idcd					")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd						")
			.where("        left outer join unit_mast u on d.unit_idcd = u.unit_idcd						")
			.where("where   d.offr_qntt > ifnull(dlvy_qntt,0)												")
			.where("and     a.line_clos = '0'																")
			.where("and     a.invc_numb   =  :invc_numb		" , arg.getParamText("invc_numb") )
			.where("and     i.item_idcd   =  :item_idcd		" , arg.getParamText("item_idcd") )
			.where("and     a.cstm_idcd   =  :cstm_idcd		" , arg.getParamText("cstm_idcd") )
			.where("and     c.sysm_memo   in ('1','3')		" , "on".equals(arg.getParamText("ingot" )) )
			.where("and     a.invc_date   >= :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("and     a.invc_date   <= :to_dt			" , arg.getParamText("to_dt" ))
			.where("and     a.find_name   like %:find_name%	" , arg.getParamText("find_name") )
			.where("and     a.line_stat       = :line_stat1	" , arg.getParamText("line_stat1" ) , !"".equals(arg.getParamText("line_stat1" )) )
			.where("and     a.line_stat       < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat1" )) )
			.where("order by a.invc_date, a.cstm_idcd																	")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	/*
	 * 마감 / 해지 건을 수정.
	 */

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
//			sequence.setClose(arg, arg.getParamText("hqof_idcd"), "purc_ordr_mast" , row.getParamText("invc_numb"),  row.getParamText("line_clos"));
			sequence.setClose(arg);
		}
		return null;
	}

	public SqlResultMap getImpt(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(*) as cnt																	")
		;
		data.param
			.where("from impt_ordr_mast ")
			.where("where offr_numb = :invc_numb",arg.fixParameter("invc_numb"))
		;
		return data.selectForMap();
	}
	public SqlResultMap setImpt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_impt_insert(						")
			.query("   :invc_numb",arg.fixParameter("invc_numb"))
			.query(" , :crte_idcd",arg.fixParameter("crte_idcd"))
			.query(")											")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap chkcancel(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		//20220419 - 이강훈 - 삭제 시 검중을 한다.
		SqlResultMap ordrInfo = this.getOrdrInfo(arg);
		String line_stat = (String)ordrInfo.get(0).get("line_stat");
		String apvl_yorn = (String)ordrInfo.get(0).get("apvl_yorn");
		double line_clos = Double.parseDouble((String)ordrInfo.get(0).get("line_clos"));
		double dlvy_qntt = Double.parseDouble(String.valueOf(ordrInfo.get(0).get("dlvy_qntt")));

		if ("2".equals(line_stat)) {
			throw new ServiceException("삭제된  발주 건입니다. 승인해지 할 수 없습니다." );
		}
		if (1 ==  line_clos) {
			throw new ServiceException("마감된  발주 건입니다. 승인해지 할 수 없습니다." );
		}
//		if ("SJFLV".equals(arg.getParamText("mes_system_type").toUpperCase())){
//			if ("0".equals(apvl_yorn)) {
//				throw new ServiceException("이미 입고된  발주입니다. 승인해지할수없습니다." );
//			}
//		}
		if (0 != dlvy_qntt) {
			throw new ServiceException("입고된  발주 건입니다. 승인해지 할 수 없습니다." );
		}

		return null;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String amd = "0";
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
//				if (rowaction == Action.update) {
//					SqlResultMap ordrInfo = this.getOrdrInfo(arg);
//					if (!ordrInfo.isEmpty()) {
//						String line_stat = (String)ordrInfo.get(0).get("line_stat");
//						String apvl_yorn = (String)ordrInfo.get(0).get("apvl_yorn");
//						double line_clos = Double.parseDouble((String)ordrInfo.get(0).get("line_clos"));
//						double dlvy_qntt = Double.parseDouble(String.valueOf(ordrInfo.get(0).get("dlvy_qntt")));
//
//						if ("2".equals(line_stat)) {
//							throw new ServiceException("삭제된  발주 건입니다. 저장 할 수 없습니다." );
//						}
//						if (1 ==  line_clos) {
//							throw new ServiceException("마감된  발주 건입니다. 저장 할 수 없습니다." );
//						}
//						if ("SJFLV".equals(row.getParamText("mes_system_type").toUpperCase())){
//							if ("1".equals(apvl_yorn)) {
//								throw new ServiceException("승인된  발주 건입니다. 저장 할 수 없습니다." );
//							}
//						}
//						if (0 != dlvy_qntt) {
//							throw new ServiceException("입고된  발주 건입니다. 저장 할 수 없습니다." );
//						}
//					}
//				}

				// 사업장
				data.param
					.query("select optn_char_valu											")
					.query("from optn_mast													")
					.query("where optn_idcd = 'dflt_bzpl_idcd'								")
				;
				String bzpl_idcd = data.selectForMap().toString().replaceAll("[^0-9]","");
				data.clear();
				String remk_text = row.getParamText("remk_text");
				SqlResultRow amndRow = null;
				if(!remk_text.equals("")){
					data.param
						.query("select  max(amnd_degr) as amnd_degr							")
						.where("from    pjod_amnd											")
						.where("where   pjod_idcd = :pjod_idcd",row.fixParameter("remk_text"))
					;
					amndRow = data.selectForRow();
					data.clear();
				}
				if(amndRow != null){
//					if(!amndRow.getParamText("amnd_degr").equals("")){
//						amd = amndRow.getParamText("amnd_degr");
//					}
				}

				ParamToJson trans = new ParamToJson();

				String json = trans.TranslateRow(arg, row, "purc_ordr_mast_json_fields");

				//master 등록/수정
				data.param
					.table("purc_ordr_mast"											)
					.where("where invc_numb = :invc_numb							")	//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))

					.update("offr_dvcd"			, "1100")								//발주구분코드
					.update("bzpl_idcd"			, bzpl_idcd							)	//사업장ID
					.update("invc_date"			, row.getParameter("invc_date"		))	//invoice일자 (발주일자)
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
					.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))	//내외자구분코드
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처 ID
					.update("divi_cont"			, row.getParameter("divi_cont"		))	//분할횟수
					.update("offr_qntt"			, row.getParameter("offr_qntt"		))	//합계수량
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"		))	//통화구분코드
					.update("excg_rate"			, row.getParameter("excg_rate"		))	//환율
					.update("offr_amnt"			, row.getParameter("offr_amnt"		))	//공급가액계
					.update("offr_vatx"			, row.getParameter("offr_vatx"		))	//부가세계
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))	//합계금액
					.update("supl_dvcd"			, row.getParameter("supl_dvcd"		))	//조달구분
					.update("stot_dvcd"			, row.getParameter("stot_dvcd"		))	//결제구분
					.insert("amnd_degr"			, amd								)	//amd차수
					.update("remk_text"			, row.getParameter("remk_text"		))	//비고
					.update("json_data"			, json)									//json
					.update("user_memo"			, row.getParameter("user_memo"		))	//사용자메모
					.update("prnt_idcd"			, row.getParameter("remk_text"		))	//상위 ID
					.update("line_ordr"			, row.getParameter("line_ordr"		))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"		))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"		))	//마감여부
					.update("find_name"			, row.getParamText("invc_numb"		).trim()
												+ " "
												+ row.getParamText("cstm_name"		).trim())
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
				if(rowaction == Action.update){
					data.param
						.query("update purc_ordr_item a , purc_ordr_mast b 							")
						.query("set a.prnt_idcd = b.prnt_idcd										")
						.query("where a.invc_numb = b.invc_numb										")
						.query("and   a.invc_numb = :invc_numb", row.fixParameter("invc_numb"		))
					;
					data.attach(Action.direct);
				}
				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class),amd);
				}
			}
		}
	data.execute();

	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	@SuppressWarnings("deprecation")
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map ,String amd) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			deli_date2 = row.getParamText("deli_date2");

			if(deli_date2.matches("^[0-9]+$")){
			}else if(deli_date2.isEmpty() != true){
				deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
			}

//			if(deli_date2.matches("^[0-9]+$")){
//			}else{
//				deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
//			}
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("purc_ordr_item"											)
					.where("where invc_numb		= :invc_numb						")		//invoic순번
					.where("and   amnd_degr		= :amnd_degr						")		//amd차수
					.where("and   line_seqn		= :line_seqn						")		//invoic순번

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("amnd_degr"			, amd)
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

				;data.attach(rowaction);

				//22020419 - 이강훈 - 삼정은  발주요청으로 생성된 발주서 항목 삭제 시 발주요청서 정보를 초기화 한다.
				if (row.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
					data.param
						.query("update purc_trst_item a		")
						.query("   set a.offr_proc_dvcd = '0'")
						.query("     , a.offr_numb = ''		")
						.query("     , a.offr_amnd_degr = 0	")
						.query("     , a.offr_seqn = 0		")
						.query("     , updt_ipad   = :updt_ipad "	, arg.remoteAddress)
						.query("     , updt_dttm   = :updt_dttm "	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
						.query(" where a.offr_numb = :invc_numb"	, row.fixParameter("invc_numb"))
						.query("   and a.offr_seqn = :line_seqn"	, row.fixParameter("line_seqn"))
					;
					data.attach(Action.direct);
				}
			} else {
				data.param
					.table("purc_ordr_item"											)
					.where("where invc_numb = :invc_numb							")		//invoice번호
					.where("and   line_seqn = :line_seqn							")		//invoice순번

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("amnd_degr"			, row.getParameter("amnd_degr"		))		//차수
					.update("item_idcd"			, row.getParameter("item_idcd"		))		//invoice일자
					.update("item_spec"			, row.getParameter("item_spec"		))		//invoice일자
					.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
					.update("offr_qntt"			, row.getParameter("offr_qntt"		))		//발주수량
					.update("offr_pric"			, row.getParameter("offr_pric"		))		//발주단가
					.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
					.update("offr_amnt"			, row.getParameter("offr_amnt"		))		//발주금액
					.update("offr_vatx"			, row.getParameter("offr_vatx"		))		//발주부가세
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//발주금액계
					.update("deli_date"			, deli_date2						)		//납기일자
					.update("prnt_idcd"			, mst.getParameter("remk_text"		))
					.update("user_memo"			, row.getParameter("user_memo"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
			}
		}
	}

	public SqlResultMap setInvoice2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String chk = arg.getParamText("chk");
		Action rowaction = null;

		for (SqlResultRow row:map) {
			if(chk.equals("insert")){
				rowaction = Action.insert;
			}else{
				rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			}

			String amd = "0";
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// 사업장
				data.param
				.query("select optn_char_valu											")
				.query("from optn_mast													")
				.query("where optn_idcd = 'dflt_bzpl_idcd'								")
				;
				String bzpl_idcd = data.selectForMap().toString().replaceAll("[^0-9]","");
				System.out.println(bzpl_idcd);
				data.clear();
				String remk_text = row.getParamText("remk_text");
				SqlResultRow amndRow = null;
				if(!remk_text.equals("")){
					data.param
					.query("select  max(amnd_degr) as amnd_degr							")
					.where("from    pjod_amnd											")
					.where("where   pjod_idcd = :pjod_idcd",row.fixParameter("remk_text"))
					;
					amndRow = data.selectForRow();
					data.clear();
				}
				if(amndRow != null){
					if(!amndRow.getParamText("amnd_degr").equals("")){
						amd = amndRow.getParamText("amnd_degr");
					}
				}

				//master 등록/수정
				data.param
				.table("purc_ordr_mast"											)
				.where("where invc_numb = :invc_numb							")	//invoice번호

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))

				.update("offr_dvcd"			, "1100")								//발주구분코드
				.update("bzpl_idcd"			, bzpl_idcd							)	//사업장ID
				.update("invc_date"			, row.getParameter("invc_date"		))	//invoice일자 (발주일자)
				.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
				.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
				.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))	//내외자구분코드
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처 ID
				.update("divi_cont"			, row.getParameter("divi_cont"		))	//분할횟수
				.update("offr_qntt"			, row.getParameter("offr_qntt"		))	//합계수량
				.update("crny_dvcd"			, row.getParameter("crny_dvcd"		))	//통화구분코드
				.update("excg_rate"			, row.getParameter("excg_rate"		))	//환율
				.update("offr_amnt"			, row.getParameter("offr_amnt"		))	//공급가액계
				.update("offr_vatx"			, row.getParameter("offr_vatx"		))	//부가세계
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))	//합계금액
				.update("supl_dvcd"			, row.getParameter("supl_dvcd"		))	//조달구분
				.update("stot_dvcd"			, row.getParameter("stot_dvcd"		))	//결제구분
				.insert("amnd_degr"			, amd								)	//amd차수
				.update("remk_text"			, row.getParameter("remk_text"		))	//비고
				.update("user_memo"			, row.getParameter("user_memo"		))	//사용자메모
				.update("prnt_idcd"			, row.getParameter("remk_text"		))	//상위 ID
				.update("line_ordr"			, row.getParameter("line_ordr"		))	//ROW순서
				.update("line_stat"			, row.getParameter("line_stat"		))	//ROW상태
				.update("line_clos"			, row.getParameter("line_clos"		))	//마감여부
				.update("find_name"			, row.getParamText("invc_numb"		).trim()
						+ " "
						+ row.getParamText("cstm_name"		).trim())
						.insert("line_levl"			, row.getParameter("line_levl"		))
						.update("updt_idcd"			, row.getParameter("updt_idcd"		))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
				if(rowaction == Action.update){
					data.param
					.query("update purc_ordr_item a , purc_ordr_mast b 							")
					.query("set a.prnt_idcd = b.prnt_idcd										")
					.query("where a.invc_numb = b.invc_numb										")
					.query("and   a.invc_numb = :invc_numb", row.fixParameter("invc_numb"		))
					;
					data.attach(Action.direct);
				}
				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail2(arg, data, row, row.getParameter("product", SqlResultMap.class),amd,rowaction);
				}
			}
		}
		data.execute();

		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	@SuppressWarnings("deprecation")
	public void setInvoiceDetail2(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map,String amd, Action rowaction) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		for (SqlResultRow row:map) {
			deli_date2 = row.getParamText("deli_date2");
			if(deli_date2.matches("^[0-9]+$")){
			}else{
				deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
			}
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
				.table("purc_ordr_item"											)
				.where("where invc_numb		= :invc_numb						")		//invoic순번
				.where("and   amnd_degr		= :amnd_degr						")		//amd차수
				.where("and   line_seqn		= :line_seqn						")		//invoic순번

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				.unique("amnd_degr"			, amd)
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))

				;data.attach(rowaction);

			} else {
				data.param
				.table("purc_ordr_item"											)
				.where("where invc_numb = :invc_numb							")		//invoice번호
				.where("and   line_seqn = :line_seqn							")		//invoice순번

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))

				.update("amnd_degr"			, row.getParameter("amnd_degr"		))		//차수
				.update("item_idcd"			, row.getParameter("item_idcd"		))		//invoice일자
				.update("item_spec"			, row.getParameter("item_spec"		))		//invoice일자
				.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
				.update("offr_qntt"			, row.getParameter("need_qntt"		))		//발주수량
				.update("offr_pric"			, row.getParameter("offr_pric"		))		//발주단가
				.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
				.update("offr_amnt"			, row.getParameter("offr_amnt"		))		//발주금액
				.update("offr_vatx"			, row.getParameter("offr_vatx"		))		//발주부가세
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//발주금액계
				.update("deli_date"			, deli_date2						)		//납기일자
				.update("prnt_idcd"			, mst.getParameter("remk_text"		))
				.update("user_memo"			, row.getParameter("user_memo"		))
				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(Action.modify);
			}
		}
	}

	public SqlResultMap getItemCode(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*)	as count							")
		;
		data.param
			.where("from item_mast												")
			.where("where item_code = :item_code",arg.fixParameter("item_code"))
		;
		return data.selectForMap();
	}



	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		SqlResultMap ordrInfo = this.getOrdrInfo(arg);
		String line_stat = (String)ordrInfo.get(0).get("line_stat");
		String apvl_yorn = String.valueOf(ordrInfo.get(0).get("apvl_yorn"));
		double line_clos = Double.parseDouble((String)ordrInfo.get(0).get("line_clos"));
		double dlvy_qntt = Double.parseDouble(String.valueOf(ordrInfo.get(0).get("dlvy_qntt")));

		if ("2".equals(line_stat)) {
			throw new ServiceException("삭제된  발주 건입니다. 삭제 할 수 없습니다." );
		}
		if (1 ==  line_clos) {
			throw new ServiceException("마감된  발주 건입니다. 삭제 할 수 없습니다." );
		}
		if ("SJFLV".equals(arg.getParamText("mes_system_type").toUpperCase())){
			if ("1".equals(apvl_yorn)) {
				throw new ServiceException("승인된  발주 건입니다. 삭제 할 수 없습니다." );
			}
		}
		if (0 != dlvy_qntt) {
			throw new ServiceException("입고된  발주 건입니다. 삭제 할 수 없습니다." );
		}

		data.param
			.table("purc_ordr_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);

		data.param
			.table("purc_ordr_item")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);

		data.param
			.query("update purc_trst_item a			")
			.query("   set a.offr_proc_dvcd = '0'	")
			.query("     , a.offr_numb = ''			")
			.query("     , a.offr_amnd_degr = 0		")
			.query("     , a.offr_seqn = 0			")
			.query("     , updt_ipad   = :updt_ipad "	, arg.remoteAddress)
			.query("     , updt_dttm   = :updt_dttm "	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			.query(" where a.offr_numb = :invc_numb "   , arg.fixParameter("invc_numb")	 )
		;
		data.attach(Action.direct);

		if ("SJFLV".equals(arg.getParamText("mes_system_type").toUpperCase())){
			data.param
				.query("call auto_impt_delete(						")
				.query("   :invc_numb",arg.fixParameter("invc_numb"))
				.query(")											")
			;
			data.attach(Action.direct);
		}
		data.execute();

		return null;
	}

	public SqlResultMap setDel_yn2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		SqlResultMap ordrInfo = this.getOrdrInfo(arg);
		String line_stat = (String)ordrInfo.get(0).get("line_stat");
		String apvl_yorn = (String)ordrInfo.get(0).get("apvl_yorn");
		double line_clos = Double.parseDouble((String)ordrInfo.get(0).get("line_clos"));
		double dlvy_qntt = Double.parseDouble(String.valueOf(ordrInfo.get(0).get("dlvy_qntt")));

		if ("2".equals(line_stat)) {
			throw new ServiceException("삭제된  발주 건입니다. 삭제 할 수 없습니다." );
		}
		if (1 ==  line_clos) {
			throw new ServiceException("마감된  발주 건입니다. 삭제 할 수 없습니다." );
		}
		if ("SJFLV".equals(arg.getParamText("mes_system_type").toUpperCase())){
			if ("1".equals(apvl_yorn)) {
				throw new ServiceException("승인된  발주 건입니다. 삭제 할 수 없습니다." );
			}
		}
		if (0 != dlvy_qntt) {
			throw new ServiceException("입고된  발주 건입니다. 삭제 할 수 없습니다." );
		}

		data.param
			.table("purc_ordr_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수
		String supl_dvcd = "";

		for (SqlResultRow row:map) {

			if(i == 0){
				//등록
				supl_dvcd = (String)row.getParameter("supl_dvcd");

				ParamToJson trans = new ParamToJson();

				String json = trans.TranslateRow(arg, row, "purc_ordr_mast_json_fields");

				data.param
					.table("purc_ordr_mast"											)
					.where("where invc_numb = :invc_numb							")	//invoice번호
					.where("and   amnd_degr		= :amnd_degr						")

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))
					.unique("amnd_degr"			, 1)

					.update("offr_dvcd"			, "1100")								//발주구분코드
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
					.update("invc_date"			, row.getParameter("invc_date"		))	//invoice일자 (발주일자)
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
					.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))	//내외자구분코드
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처 ID
					.update("divi_cont"			, row.getParameter("divi_cont"		))	//분할횟수
					.update("offr_qntt"			, row.getParameter("offr_qntt"		))	//합계수량
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"		))	//통화구분코드
					.update("excg_rate"			, row.getParameter("excg_rate"		))	//환율
					.update("offr_amnt"			, row.getParameter("offr_amnt"		))	//공급가액계
					.update("offr_vatx"			, row.getParameter("offr_vatx"		))	//부가세계
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))	//합계금액
					.update("supl_dvcd"			, supl_dvcd							 )	//조달구분
					.update("stot_dvcd"			, row.getParameter("stot_dvcd"		))	//결제구분
					.update("remk_text"			, row.getParameter("remk_text"		))	//비고
					.update("json_data"			, json								)	//Json
					.update("user_memo"			, row.getParameter("user_memo"		))	//사용자메모
					.update("prnt_idcd"			, row.getParameter("remk_text"		))	//상위 ID
					.update("line_ordr"			, row.getParameter("line_ordr"		))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"		))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"		))	//마감여부
					.update("find_name"			, row.getParameter("cstm_name")
												+ "	"
												+ row.getParameter("cstm_code"))
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

//				double offr_amnt = Double.parseDouble(row.getParamText("offr_amnt"));
//				double offr_vatx = Double.parseDouble(row.getParamText("offr_vatx"));
//				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));
//				double offr_pric = Double.parseDouble(row.getParamText("offr_pric"));
//
//				if(ttsm_amnt != offr_pric) {
//					offr_amnt = ((double)Math.round(offr_pric / 1.1) * 10.0) / 10.0;
//					offr_vatx = offr_pric - offr_amnt;
//					ttsm_amnt = offr_amnt + offr_vatx;
//				}

				double offr_amnt = Double.parseDouble(row.getParamText("offr_amnt"));
				double offr_vatx = Double.parseDouble(row.getParamText("offr_vatx"));
				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));

				if ("6000".equals(supl_dvcd)) {
					offr_vatx = 0;
					ttsm_amnt = offr_amnt;
				}

				data.param
					.table("purc_ordr_item"											)
					.where("where invc_numb		= :invc_numb						")		//invoic순번
					.where("and   amnd_degr		= :amnd_degr						")		//amd차수
					.where("and   line_seqn		= :line_seqn						")		//invoic순번

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))
					.unique("amnd_degr"			, 1)
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"	))

					.update("item_idcd"			, row.getParameter("item_idcd"		))		//invoice일자
					.update("item_spec"			, row.getParameter("item_spec"		))		//invoice일자
					.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
					.update("offr_qntt"			, row.getParameter("offr_qntt"		))		//발주수량
					.update("offr_pric"			, row.getParameter("offr_pric"		))		//발주단가
					.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
					.update("offr_amnt"			, row.getParameter("offr_amnt"		))		//발주금액
					.update("offr_vatx"			, offr_vatx							 )		//발주부가세
					.update("ttsm_amnt"			, ttsm_amnt)								//발주금액계
					.update("deli_date"			, row.getParameter("deli_date"		))		//납기일자
					.update("prnt_idcd"			, row.getParameter("remk_text"		))
					.update("user_memo"			, row.getParameter("user_memo"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				i=+1;

			}else{

//				double offr_amnt = Double.parseDouble(row.getParamText("offr_amnt"));
//				double offr_vatx = Double.parseDouble(row.getParamText("offr_vatx"));
//				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));
//				double offr_pric = Double.parseDouble(row.getParamText("offr_pric"));
//
//				if(ttsm_amnt != offr_pric) {
//					offr_amnt = ((double)Math.round(offr_pric / 1.1) * 10.0) / 10.0;
//					offr_vatx = offr_pric - offr_amnt;
//					ttsm_amnt = offr_amnt + offr_vatx;
//				}

				double offr_amnt = Double.parseDouble(row.getParamText("offr_amnt"));
				double offr_vatx = Double.parseDouble(row.getParamText("offr_vatx"));
				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));

				if ("6000".equals(supl_dvcd)) {
					offr_vatx = 0;
					ttsm_amnt = offr_amnt;
				}

				data.param
					.table("purc_ordr_item"											)
					.where("where invc_numb		= :invc_numb						")		//invoic순번
					.where("and   amnd_degr		= :amnd_degr						")		//amd차수
					.where("and   line_seqn		= :line_seqn						")		//invoic순번

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))
					.unique("amnd_degr"			, 1)
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"	))

					.update("item_idcd"			, row.getParameter("item_idcd"		))		//invoice일자
					.update("item_spec"			, row.getParameter("item_spec"		))		//invoice일자
					.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
					.update("offr_qntt"			, row.getParameter("offr_qntt"		))		//발주수량
					.update("offr_pric"			, row.getParameter("offr_pric"		))		//발주단가
					.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
					.update("offr_amnt"			, row.getParameter("offr_amnt"		))		//발주금액
					.update("offr_vatx"			, offr_vatx							 )		//발주부가세
					.update("ttsm_amnt"			, ttsm_amnt							 )		//발주금액계
					.update("deli_date"			, row.getParameter("deli_date"		))		//납기일자
					.update("prnt_idcd"			, row.getParameter("remk_text"		))
					.update("user_memo"			, row.getParameter("user_memo"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
			}

			data.param
				.table("purc_ordr_mast")
				.where("where invc_numb = :invc_numb ")
				.where("and   amnd_degr = :amnd_degr ")

				.unique("invc_numb"		, row.fixParameter("invc_numb"))
				.unique("amnd_degr"		, 1)

				.update("updt_ipad"		, arg.remoteAddress)
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("purc_trst_item")
				.where("where invc_numb = :invc_numb ")
				.where("and   line_seqn = :line_seqn ")
				//
				.unique("invc_numb"		, row.fixParameter("invc_numb"))
				.unique("line_seqn"		, row.fixParameter("line_seqn"))


				.update("offr_proc_dvcd", "1")
				.update("reqt_qntt"		, row.getParameter("offr_qntt"))
				.update("reqt_pric"		, row.getParameter("offr_pric"))
				.update("reqt_amnt"		, row.getParameter("ttsm_amnt"))
				.update("offr_numb"		, row.fixParameter("new_invc_numb"	))
				.update("offr_amnd_degr", 1)
				.update("offr_seqn"		, row.fixParameter("new_line_seqn"	))
				.update("updt_ipad"		, arg.remoteAddress)
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
			}


		return null;
	}

	public SqlResultMap setIstt(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		//20220429 - 이강훈 - 입고접수 시 검중을 한다.
		SqlResultMap ordrInfo = this.getOrdrInfo(arg);
		String line_stat = (String)ordrInfo.get(0).get("line_stat");
		double line_clos = Double.parseDouble((String)ordrInfo.get(0).get("line_clos"));

		if ("2".equals(line_stat)) {
			throw new ServiceException("삭제된  발주 건입니다. 입고접수 할 수 없습니다." );
		}
		if (1 ==  line_clos) {
			throw new ServiceException("마감된  발주 건입니다. 입고접수 할 수 없습니다." );
		}

		data.param
			.query("call auto_item_rcpt (			")
			.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :auto_insp "  , "N"			)  // 자동 합격처리 여부
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setItem(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

//		data.param
//			.query("call fn_seq_gen_v2 (							")
//			.query("     :STOR                " ,  arg.fixParameter("stor_id"))
//			.query("   , :table               " ,  arg.fixParameter("table_nm"))
//			.query("   , :invc_numb           " ,  "not defind"		)
//			.query(" ) 												")
//		;
//		String item_idcd = data.selectForRow().getParamText("seq");
//		data.clear();

		data.param
			.table ("item_mast")
			.where ("where item_idcd = :item_idcd")

			.unique("item_idcd"        , arg.fixParameter("item_idcd"))

			.update("item_code"        , arg.getParameter("item_code"))
			.update("acct_bacd"        , arg.getParameter("acct_bacd"))
			.update("item_name"        , arg.getParameter("item_name"))		//품목명
			.update("item_spec"        , arg.getParameter("item_spec"))		//품목규굑
			.update("line_stat"        , 0	)
			.update("line_clos"        , arg.getParameter("line_clos"))
			.update("find_name"        , arg.getParameter("item_idcd")
										+ " "
										+ arg.getParameter("item_name")
										+ "	"
										+ arg.getParameter("item_spec")
										+ "	"
										)
			.update("sysm_memo"        , "요청자재발주 품목추가")
			.update("updt_ipad"        , arg.remoteAddress )
			.insert("crte_ipad"        , arg.remoteAddress )
			.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.insert);
		data.execute();
		return null;
	}

	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String [] ary_invc_numb = arg.getParamText("invc_numb").split(",");

		//JSON
		ParamToJson p = new ParamToJson();
		String json = p.Translate(arg, "purc_ordr_mast_json_fields");
		for(String invc_numb : ary_invc_numb) {
			data.param
				.query("update purc_ordr_mast a")
				.query("   set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(a.json_data,'{}'),'$.apvl_yorn'),:json)",json)	//json merge  remove로 중복제거 후 merge
				.query(" where a.invc_numb = '" + invc_numb + "'	")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null;
	}

	/**
	 * 발주요청 건 정보를 가져온다.
	 *
	 */
	public SqlResultMap getOrdrInfo(HttpRequestArgument arg) throws Exception {

		String invc_numb = "";
		if (arg.containsKey("invc_numb")) {
			invc_numb = (String)arg.getParameter("invc_numb");
		} else if (arg.containsKey("records")) {
			invc_numb = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("invc_numb");
		}

		if (StringUtils.isEmpty(invc_numb)) {
			throw new ServiceException("발주번호를 확인할 수 없습니다." );
		}

		String line_seqn = "";
		if (arg.containsKey("line_seqn")) {
			line_seqn = (String)arg.getParameter("line_seqn");
		} else if (arg.containsKey("records")) {
			line_seqn = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("line_seqn");
		}

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.line_stat, a.line_clos																														")
			.query("     , cast(replace(json_extract(a.json_data, '$.apvl_yorn'),'\"','') as char) as apvl_yorn "														 )
			.query("     , (select ifnull(sum(b.dlvy_qntt), 0) from purc_ordr_item b where b.line_stat < 2 ")
			.query("           and b.invc_numb = :invc_numb2 ", invc_numb)
			.query("           and b.line_seqn = :line_seqn  ", line_seqn)
			.query("        ) as dlvy_qntt ")
			.query("  from purc_ordr_mast a																																")
			.query(" where 1 = 1 																																		")
			.query("   and a.invc_numb = :invc_numb3	" , invc_numb)
		;

		return data.selectForMap();
	}
}
