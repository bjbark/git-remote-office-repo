package com.sky.system.custom.hantop.mtrl.po.purcordr;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

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


@Service("hntop.PurcOrdrService")
public class PurcOrdrService  extends DefaultServiceHandler {
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
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date						")
			.where("		, a.drtr_idcd       , a.dept_idcd       , a.coun_iout_dvcd    , a.cstm_idcd						")
			.where("		, a.divi_cont       , a.crny_dvcd       , a.excg_rate         , a.remk_text						")
			.where("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl						")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm						")
			.where("		, a.crte_idcd       , a.crte_urif       , a.stot_dvcd         , a.deli_date						")
			.where("		, c.cstm_name       , c.cstm_code       , d.user_name											")
			.where("		, (select sum(offr_qntt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_qntt	")
			.where("		, (select sum(offr_amnt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_amnt	")
			.where("		, (select sum(offr_vatx) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_vatx	")
			.where("		, (select sum(ttsm_amnt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as ttsm_amnt	")
			.where("		, b.bzpl_name as mngt_bzpl_name         , a.purc_stat_dvcd as purc_stat_dvcd			")
			.where("		, json_value( a.json_data , '$**.mngt_bzpl_idcd') as mngt_bzpl_idcd								")
			.where("		, json_value( a.json_data , '$**.wrhs_idcd') as wrhs_idcd       , w.wrhs_name					")
			.where("		, (select r.base_name from base_mast r where a.brnd_bacd = r.base_code and r.prnt_idcd = '4000') as brnd_name")
		;
		data.param
			.where("from    purc_ordr_mast a																				")
			.where("        left outer join cstm_mast  c  on a.cstm_idcd = c.cstm_idcd										")
			.where("        left outer join user_mast  d  on a.drtr_idcd = d.user_idcd										")
			.where("        left outer join bzpl_mast  b on json_value( a.json_data , '$**.mngt_bzpl_idcd') = b.bzpl_idcd	")
			.where("        left outer join wrhs_mast  w on json_value( a.json_data , '$**.wrhs_idcd') = w.wrhs_idcd		")
			.where("where   1=1																								")
			.where("and     a.offr_dvcd = 1100																				")
			.where("and     c.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("and     a.deli_date  >= :deli1_date   " , arg.getParamText("deli1_date" ))
			.where("and     a.deli_date  <= :deli2_date   " , arg.getParamText("deli2_date" ))
			.where("and     a.drtr_idcd   = :drtr_idcd    " , arg.getParamText("drtr_idcd" ) , !"".equals(arg.getParamText("drtr_idcd")))
			.where("and     a.cstm_idcd   = :cstm_idcd    " , arg.getParamText("cstm_idcd" ) , !"".equals(arg.getParamText("cstm_idcd")))
			.where("and     a.line_clos   = :line_clos    " , arg.getParamText("line_clos" ) , !"".equals(arg.getParamText("line_clos")))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.invc_numb  in (select r.invc_numb from purc_ordr_item r where r.item_idcd = :item_idcd)" , arg.getParamText("item_idcd" ))
//			.where("and     (select min(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) >= :deli1_date" , arg.getParamText("deli1_date" ))
//			.where("and     (select min(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) <= :deli2_date" , arg.getParamText("deli2_date" ))
			.where("order by a.line_clos ,a.invc_date desc limit 999999999													")
			.where(") a																										")
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
			.query("select    a.invc_numb       , a.amnd_degr       , a.line_seqn      , a.item_idcd		")
			.query("		, a.unit_idcd       , a.cstm_idcd       , a.make_cmpy_name , a.offr_qntt		")
			.query("		, a.offr_pric       , a.vatx_incl_yorn  , a.vatx_rate      , a.offr_amnt		")
			.query("		, a.offr_vatx       , a.ttsm_amnt       , a.deli_reqt_date , a.deli_date as deli_date2		")
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
			.query("		, i.item_code       , i.item_name       , a.item_spec      , i.unit_idcd		")
			.query("		, u.unit_name																	")
		;
		data.param
			.where("from   purc_ordr_item a																	")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("       left outer join unit_mast u on i.unit_idcd = u.unit_idcd							")
			.where("where  1=1																				")
			.query("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
			.where("and    a.invc_numb	      = :invc_numb  "	, arg.getParamText("invc_numb"))
			.where("and    a.line_stat        = :line_stat1 "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("and    a.line_stat   < :line_stat       "	, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																	")
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
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl					")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name					")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd					")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm					")
			.query("		, a.crte_idcd       , a.crte_urif       , a.stot_dvcd         , a.deli_date					")
			.query("		, c.cstm_name       , c.cstm_code       , d.user_name, a.deli_date							")
			.query("		, bz.bzpl_name as mngt_bzpl_name															")
			.query("		, json_value( a.json_data , '$**.wrhs_idcd') as wrhs_idcd       , w.wrhs_name				")
			.query("		, (select r.base_name from base_mast r where a.brnd_bacd = r.base_code and r.prnt_idcd = '4000') as brnd_name")
			.query("from    purc_ordr_mast a																			")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
			.query("        left outer join bzpl_mast      bz on json_value( a.json_data , '$**.mngt_bzpl_idcd') = bz.bzpl_idcd	")
			.query("        left outer join wrhs_mast      w  on json_value( a.json_data , '$**.wrhs_idcd') = w.wrhs_idcd")
			.query("where   1=1																							")
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
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
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
			.where("and     a.invc_date   >= :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("and     a.invc_date   <= :to_dt			" , arg.getParamText("to_dt" ))
			.where("and     a.find_name   like %:find_name%	" , arg.getParamText("find_name") )
			.where("and     a.line_stat       = :line_stat1	" , arg.getParamText("line_stat1" ) , !"".equals(arg.getParamText("line_stat1" )) )
			.where("and     a.line_stat       < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat1" )) )
			.where("order by a.invc_date, a.cstm_idcd																	")
		;
		return data.selectForMap(page, rows, (page == 1)); //
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

	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String purc_stat_dvcd  = arg.getParamText("purc_stat_dvcd");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		if(purc_stat_dvcd.equals("0010")){	//승인해제
			//JSON 불러와서 로그인 아이디 일치하는지 확인
			data.param
				.query("select json_value( json_data , '$**.lgin_idcd') as lgin_idcd		")
				.query("from purc_ordr_mast													")
				.query("where invc_numb = :invc_numb1 ", invc_numb							)
			;

			SqlResultRow temp = data.selectForRow();
			String idcd = temp.getParamText("lgin_idcd");

			if(idcd.equalsIgnoreCase(arg.getParamText("lgin_idcd"))){
				System.out.println("같음");
			}else{
				SqlResultMap map = data.selectForMap();
				return map;
			}

			data.clear();
		}else if(purc_stat_dvcd.equals("0011")){	//승인완료
			//JSON
			ParamToJson p = new ParamToJson();
			String json = p.TranslateProcedure(arg, "mngt_bzpl_idcd,lgin_idcd,wrhs_idcd");
			data.param
				.table("purc_ordr_mast"											)
				.where("where invc_numb = :invc_numb							")

				.unique("invc_numb"			, invc_numb)

				.update("json_data"			, json								)
			;
			data.attach(Action.modify);
			data.execute();
		}

		data.param
			.query("call purc_acpt_ok (						")
			.query("   :STOR			" , hq				)  // 본사코드
			.query(" , :invc_numb		" , invc_numb	 	)  // Invoice 번호
			.query(" , :purc_stat_dvcd	" , purc_stat_dvcd	)  // 결재여부
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();

		return null;

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
					if(!amndRow.getParamText("amnd_degr").equals("")){
						amd = amndRow.getParamText("amnd_degr");
					}
				}

				ParamToJson p = new ParamToJson();
//				String json = p.TranslateRow(arg, row, "mngt_bzpl_idcd,lgin_idcd,wrhs_idcd");
				String json = p.TranslateRowSelect(row, "mngt_bzpl_idcd,wrhs_idcd");
				System.out.println(json);

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
					.update("brnd_bacd"			, row.getParameter("brnd_bacd"		))	//브랜드분류코드
					.insert("amnd_degr"			, amd								)	//amd차수
					.update("json_data"			, json								)	//json
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
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map,String amd) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		System.out.println(map+"<<<<<<<<");
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
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
				.update("purc_stat_dvcd"	, "0010")								//발주구분코드
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


	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		temp.param
			.query("select line_stat, line_clos				")
			.query("from   purc_ordr_mast					")
		 	.query("where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("purc_ordr_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();

		data.param
			.table("purc_ordr_item")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
	data.execute();
		return null;
	}

	public SqlResultMap setDel_yn2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

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

	public SqlResultMap setIstt2(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		String invc_date	= arg.getParamText("invc_date") ;
		String wrhs_idcd	= arg.getParamText("wrhs_idcd") ;

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
			data.param
			.query("call auto_item_rcpt_hntop (			")
			.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :invc_date "  , invc_date	)  // 입고일자
			.query(" , :wrhs_idcd "  , wrhs_idcd	)  // 창고명
			.query(" , :auto_insp "  , "N"			)  // 자동 합격처리 여부
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
			.query("select a.*																								")
			.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
			.query("from (																									")
			.query("select																									")
			.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
			.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
			.query("     ,  0  as cst_pri																					")
			.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
			.query("     ,  0  as sale_pri																					")
			.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
			.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
			.query("     ,  a.modl_name																						")
			.query("from    item_mast a																						")
			.query("where   1=1																								")
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("and     a.line_stat = 0																					")
			.query("and     a.acct_bacd in ('3000')                       " , "제품".equals(arg.getParameter("acct_bacd")) )
			.query("and     a.acct_bacd in ('1001', '1002','1003','1004') " , "자재".equals(arg.getParameter("acct_bacd")) )
			.query("and     a.acct_bacd in ('2001', '2002')               " , "재공품".equals(arg.getParameter("acct_bacd")))
			.query("and     a.acct_bacd in ('5000', '6000')               " , "기타".equals(arg.getParameter("acct_bacd")) )
			.query(") a																										")
		;

		return data.selectForMap();
	}


	/**
	 * 출력
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.addr_1 		as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  b.addr_2   		as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_kind    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1 		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_kind   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, -a.qty 			as qty 												") /* 수량 */
			.query("	, -a.sply_amt+a.txfree_amt as sply_amt		 							") /* 공급가 */
			.query("	, -a.tax_amt  		as tax_amt 											") /* 세액 */
			.query("	, -a.inv_amt 		as inv_amt 											") /* 계 */
			.query("	, a.usr_memo 		as usr_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url       as stamp_url										") /* 직인 이미지 URL */
			.query("	, d.emp_nm         	as inv_user_nm 										") /* 작업자명 */

			.query(" from modi_info a															")
			.query("	  join stor b on a.stor_id = b.stor_id									")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id					")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query(" 		a.seq_dsp   	as seq_dsp 										") /* 항번 */
				.query("	,   b.itm_shrt_cd   as itm_shrt_cd 									") /* 단축코드 */
				.query("	,   a.item_code   		as item_code 								") /* 코드 */
				.query("	,   b.brcd_1   		as brcd 										") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 					") /* 품목, 규격 */
				.query("	,   (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('(' + a.piece_qty + ')') as piece_qty   						") /* 포장량 */
				.query("	,   -a.qty 			as qty 											") /* 수량 */
				.query("	,   a.pri 		    as pri 											") /* 단가 */
				.query("	,   -a.sply_amt+a.txfree_amt as sply_amt 							") /* 금액 */
				.query("	,   -a.tax_amt 		as tax_amt 										") /* 세액 */
				.query("	,   -a.inv_amt 		as inv_amt 										") /* 합계 */
				.query("  from  modi_item a 													")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 			")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"    ))
				.query("   and  a.row_sts = 0													")
				.query("order by line_seqn		 												")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

}
