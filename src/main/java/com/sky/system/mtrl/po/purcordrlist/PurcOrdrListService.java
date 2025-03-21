package com.sky.system.mtrl.po.purcordrlist;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.StringTokenizer;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class PurcOrdrListService extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String chek = arg.getParamText("chek");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  																					")
		;
		data.param
			.query("select a.*																										")
		;
		data.param
			.where("from (																											")
			.where("   with purc as ( 																								")
			.where("      select a.invc_numb, a.invc_date, a.cstm_idcd, a.drtr_idcd, a.supl_dvcd, a.line_clos						")
			.where("           , b.line_seqn, b.item_idcd, b.offr_qntt, b.deli_date, b.user_memo									")
			.where("        from purc_ordr_mast a																					")
			.where("             left outer join purc_ordr_item b on b.invc_numb = a.invc_numb										")
			.where("       where 1 = 1																								")
			.where("         and a.find_name	like %:find_name% " 	, arg.getParamText("find_name"))
			.where("         and a.invc_date >= :invc1_date	"			, arg.getParamText("invc1_date"))
			.where("         and a.invc_date <= :invc2_date	"			, arg.getParamText("invc2_date"))
			.where("         and b.deli_date >= :deli1_date	"			, arg.getParamText("deli1_date"))
			.where("         and b.deli_date <= :deli2_date	"			, arg.getParamText("deli2_date"))
			.where("         and a.invc_numb  = :invc_numb	"			, arg.getParameter("invc_numb" ))
			.where("         and a.cstm_idcd  = :cstm_idcd	"			, arg.getParamText("cstm_idcd" ))
			.where("         and a.drtr_idcd  = :drtr_idcd	"			, arg.getParamText("drtr_idcd" ))
			.where("         and a.supl_dvcd  = :supl_dvcd	"			, arg.getParamText("supl_dvcd" ))
			.where("         and b.item_idcd  = :item_idcd	"			, arg.getParamText("item_idcd" ))
			.where("         and a.line_stat   < :line_stat	"	, "2"	, "".equals(arg.getParamText("line_stat" )))
			.where("   ), istt as ( 																								")
			.where("      select a.invc_numb, a.line_seqn, sum(b.istt_qntt) as istt_qntt											")
			.where("        from purc a																								")
			.where("             left outer join purc_istt_item b on b.orig_invc_numb = a.invc_numb and b.orig_seqn = a.line_seqn	")
			.where("             left outer join purc_istt_mast c on c.invc_numb = b.invc_numb										")
			.where("       where 1 = 1 																								")
			.where("         and c.line_stat < 2																					")
			.where("       group by a.invc_numb, a.line_seqn																		")
			.where("   )																											")
			.where("   select a.line_clos, a.invc_date, a.invc_numb, a.line_seqn, a.supl_dvcd, a.deli_date, a.offr_qntt, a.user_memo")
			.where("        , ifnull(b.istt_qntt, 0) as istt_qntt																	")
			.where("        , a.offr_qntt - ifnull(b.istt_qntt, 0) as qntt 															")
			.where("        , c.cstm_code, c.cstm_name 																				")
			.where("        , d.item_code, d.item_name, d.item_spec																	")
			.where("        , e.user_name as purc_drtr_name																			")
			.where("     from purc a																								")
			.where("          left outer join istt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn						")
			.where("          left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd												")
			.where("          left outer join item_mast d on d.item_idcd = a.item_idcd												")
			.where("          left outer join user_mast e on e.user_idcd = a.drtr_idcd												")
			.where("    where 1 = 1																									")
		;
		if (chek.equals("false")){
			data.param
				.where("      and a.offr_qntt - ifnull(b.istt_qntt, 0) > 0															")
			;
		}
		data.param
		    .where("    order by a.invc_date desc, a.invc_numb desc, a.line_seqn limit 999999999									")
			.where(") a																												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
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
			.query("select    a.invc_numb       , a.invc_date       , a.cstm_idcd         , a.drtr_idcd		")
			.query("		, b.item_idcd       , b.offr_qntt       , b.deli_date         , c.istt_qntt		")
			.query("		, d.item_code       , d.item_name       , d.item_spec         , a.remk_text		")
			.query("		, e.cstm_name       , u.user_name												")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl		")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name		")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd		")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm		")
			.query("		, a.crte_idcd       , a.crte_urif												")
			.query("		,(IFNULL(b.offr_qntt,0)-IFNULL(c.istt_qntt,0)) as qntt							")
		;
		data.param
			.where("from    purc_ordr_mast a																")
			.where("		left outer join purc_ordr_item b on a.invc_numb = b.invc_numb					")
			.where("		left outer join purc_istt_item c on a.invc_numb = c.orig_invc_numb				")
			.where("		left outer join item_mast d on b.item_idcd = d.item_idcd						")
			.where("		left outer join cstm_mast e on a.cstm_idcd = e.cstm_idcd						")
			.where("		left outer join user_mast u on a.drtr_idcd = u.user_idcd						")
			.where("where   1=1																				")
			.where("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
			.where("and     b.deli_date = :deli_date" , arg.getParameter("deli_date							"))
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.invc_date between :invc1_date " , arg.getParamText("invc1_date" ))
			.where("                        and :invc2_date " , arg.getParamText("invc2_date" ))
			.where("and     a.drtr_idcd   = :drtr_idcd   " , arg.getParamText("drtr_idcd" ) , !"".equals(arg.getParamText("drtr_idcd")))
			.where("and     a.cstm_idcd   = :cstm_idcd   " , arg.getParamText("cstm_idcd" ) , !"".equals(arg.getParamText("cstm_idcd")))
			.where("and     b.item_idcd   = :item_idcd   " , arg.getParamText("item_idcd" ) , !"".equals(arg.getParamText("item_idcd")))
			.where("and     a.line_clos   = :line_clos   " , arg.getParamText("line_clos" ) , !"".equals(arg.getParamText("line_clos")))
			.where("and     b.deli_date between :deli1_date " , arg.getParamText("deli1_date" ))
			.where("                        and :deli2_date " , arg.getParamText("deli2_date" ))
			.where("and     a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_clos ,e.cstm_name ,b.deli_date desc											")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String chek = arg.getParamText("chek");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  																					")
		;
		data.param
			.query("select a.*																										")
		;
		data.param
			.where("from (																											")
			.where("   with purc as ( 																								")
			.where("      select a.invc_numb, a.invc_date, a.cstm_idcd, a.drtr_idcd, a.supl_dvcd, a.line_clos						")
			.where("           , b.line_seqn, b.item_idcd, b.offr_qntt, b.deli_date, b.user_memo									")
			.where("        from purc_ordr_mast a																					")
			.where("             left outer join purc_ordr_item b on b.invc_numb = a.invc_numb										")
			.where("       where 1 = 1																								")
			.where("         and a.find_name	like %:find_name% " 	, arg.getParamText("find_name"))
			.where("         and a.invc_date >= :invc1_date	"			, arg.getParamText("invc1_date"))
			.where("         and a.invc_date <= :invc2_date	"			, arg.getParamText("invc2_date"))
			.where("         and b.deli_date >= :deli1_date	"			, arg.getParamText("deli1_date"))
			.where("         and b.deli_date <= :deli2_date	"			, arg.getParamText("deli2_date"))
			.where("         and a.invc_numb  = :invc_numb	"			, arg.getParameter("invc_numb" ))
			.where("         and a.cstm_idcd  = :cstm_idcd	"			, arg.getParamText("cstm_idcd" ))
			.where("         and a.drtr_idcd  = :drtr_idcd	"			, arg.getParamText("drtr_idcd" ))
			.where("         and a.supl_dvcd  = :supl_dvcd	"			, arg.getParamText("supl_dvcd" ))
			.where("         and a.item_idcd  = :item_idcd	"			, arg.getParamText("item_idcd" ))
			.where("         and a.line_stat   < :line_stat	"	, "2"	, "".equals(arg.getParamText("line_stat" )))
			.where("   ), istt as ( 																								")
			.where("      select a.invc_numb, a.line_seqn, sum(b.istt_qntt) as istt_qntt											")
			.where("        from purc a																								")
			.where("             left outer join purc_istt_item b on b.orig_invc_numb = a.invc_numb and b.orig_seqn = a.line_seqn	")
			.where("             left outer join purc_istt_mast c on c.invc_numb = b.invc_numb										")
			.where("       where 1 = 1 																								")
			.where("         and c.line_stat < 2																					")
			.where("       group by a.invc_numb, a.line_seqn																		")
			.where("   )																											")
			.where("   select a.line_clos, a.invc_date, a.invc_numb, a.line_seqn, a.supl_dvcd, a.deli_date, a.offr_qntt, a.user_memo")
			.where("        , ifnull(b.istt_qntt, 0) as istt_qntt																	")
			.where("        , a.offr_qntt - ifnull(b.istt_qntt, 0) as qntt 															")
			.where("        , c.cstm_code, c.cstm_name 																				")
			.where("        , d.item_code, d.item_name, d.item_spec																	")
			.where("        , e.user_name as purc_drtr_name																			")
			.where("     from purc a																								")
			.where("          left outer join istt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn						")
			.where("          left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd												")
			.where("          left outer join item_mast d on d.item_idcd = a.item_idcd												")
			.where("          left outer join user_mast e on e.user_idcd = a.drtr_idcd												")
			.where("    where 1 = 1																									")
		;
		if (chek.equals("false")){
			data.param
				.where("      and a.offr_qntt - ifnull(b.istt_qntt, 0) > 0															")
			;
		}

		data.param
		    .where("    order by a.deli_date desc, a.invc_numb desc, a.line_seqn limit 999999999									")
			.where(") a																												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.invc_date       , a.cstm_idcd         , a.drtr_idcd		")
			.query("		, b.item_idcd       , b.offr_qntt       , b.deli_date         , c.istt_qntt		")
			.query("		, d.item_code       , d.item_name       , d.item_spec         , a.remk_text		")
			.query("		, e.cstm_name       , u.user_name												")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl		")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name		")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd		")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm		")
			.query("		, a.crte_idcd       , a.crte_urif												")
			.query("		,(IFNULL(b.offr_qntt,0)-IFNULL(c.istt_qntt,0)) as qntt							")
		;
		data.param
			.where("from    purc_ordr_mast a																")
			.where("		left outer join purc_ordr_item b on a.invc_numb = b.invc_numb					")
			.where("		left outer join purc_istt_item c on a.invc_numb = c.orig_invc_numb				")
			.where("		left outer join item_mast d on b.item_idcd = d.item_idcd						")
			.where("		left outer join cstm_mast e on a.cstm_idcd = e.cstm_idcd						")
			.where("		left outer join user_mast u on a.drtr_idcd = u.user_idcd						")
			.where("where   1=1																				")
			.where("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
			.where("and     b.deli_date = :deli_date" , arg.getParameter("deli_date							"))
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.invc_date between :invc1_date " , arg.getParamText("invc1_date" ))
			.where("                        and :invc2_date " , arg.getParamText("invc2_date" ))
			.where("and     a.drtr_idcd   = :drtr_idcd   " , arg.getParamText("drtr_idcd" ) , !"".equals(arg.getParamText("drtr_idcd")))
			.where("and     a.cstm_idcd   = :cstm_idcd   " , arg.getParamText("cstm_idcd" ) , !"".equals(arg.getParamText("cstm_idcd")))
			.where("and     b.item_idcd   = :item_idcd   " , arg.getParamText("item_idcd" ) , !"".equals(arg.getParamText("item_idcd")))
			.where("and     a.line_clos   = :line_clos   " , arg.getParamText("line_clos" ) , !"".equals(arg.getParamText("line_clos")))
			.where("and     b.deli_date between :deli1_date " , arg.getParamText("deli1_date" ))
			.where("                        and :deli2_date " , arg.getParamText("deli2_date" ))
			.where("and     a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_clos ,u.user_name,b.deli_date desc											")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
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
			.query("select    a.invc_numb       , a.invc_date       , a.cstm_idcd         , a.drtr_idcd		")
			.query("		, b.item_idcd       , b.offr_qntt       , b.deli_date         , c.istt_qntt		")
			.query("		, d.item_code       , d.item_name       , d.item_spec         , a.remk_text		")
			.query("		, e.cstm_name       , u.user_name												")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl		")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name		")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd		")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm		")
			.query("		, a.crte_idcd       , a.crte_urif												")
			.query("		,(IFNULL(b.offr_qntt,0)-IFNULL(c.istt_qntt,0)) as qntt							")
		;
		data.param
			.where("from    purc_ordr_mast a																")
			.where("		left outer join purc_ordr_item b on a.invc_numb = b.invc_numb					")
			.where("		left outer join purc_istt_item c on a.invc_numb = c.orig_invc_numb				")
			.where("		left outer join item_mast d on b.item_idcd = d.item_idcd						")
			.where("		left outer join cstm_mast e on a.cstm_idcd = e.cstm_idcd						")
			.where("		left outer join user_mast u on a.drtr_idcd = u.user_idcd						")
			.where("where   1=1																				")
			.where("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
			.where("and     b.deli_date = :deli_date" , arg.getParameter("deli_date							"))
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.invc_date between :invc1_date " , arg.getParamText("invc1_date" ))
			.where("                        and :invc2_date " , arg.getParamText("invc2_date" ))
			.where("and     a.drtr_idcd   = :drtr_idcd   " , arg.getParamText("drtr_idcd" ) , !"".equals(arg.getParamText("drtr_idcd")))
			.where("and     a.cstm_idcd   = :cstm_idcd   " , arg.getParamText("cstm_idcd" ) , !"".equals(arg.getParamText("cstm_idcd")))
			.where("and     b.item_idcd   = :item_idcd   " , arg.getParamText("item_idcd" ) , !"".equals(arg.getParamText("item_idcd")))
			.where("and     a.line_clos   = :line_clos   " , arg.getParamText("line_clos" ) , !"".equals(arg.getParamText("line_clos")))
			.where("and     b.deli_date between :deli1_date " , arg.getParamText("deli1_date" ))
			.where("                        and :deli2_date " , arg.getParamText("deli2_date" ))
			.where("and     a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_clos ,b.deli_date desc													")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
}
