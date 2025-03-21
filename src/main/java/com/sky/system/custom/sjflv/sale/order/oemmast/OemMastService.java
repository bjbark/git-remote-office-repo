package com.sky.system.custom.sjflv.sale.order.oemmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.OemMastService")
public class OemMastService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param
			.query("select a.*																									")
		;
		data.param
			.where("from (																										")
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date							")
			.where("		, a.ordr_dvcd       , a.acpt_dvcd       , a.cstm_idcd         , a.crny_dvcd							")
			.where("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn					")
			.where("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo								")
			.where("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd					")
			.where("		, a.sysm_memo       , a.prnt_idcd       , a.line_levl												")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos												")
			.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name									")
			.where("		, i.line_seqn       , i.item_idcd       , i.invc_qntt         , i.deli_date							")
			.where("		, im.unit_idcd      , im.item_name      , im.item_spec        , im.item_code						")
			.where("		, im.acct_bacd																						")
			.where("		, io.is_qntt        , io.is_date		, os.os_qntt          ,	os.os_date 							")
			.where("		, ifnull(nullif(json_value(i.json_data, '$.revs_numb'), ''), 0) as revs_numb						")
			.where("		, imc.clss_name as mcls_name																		")
			.where("		, json_value(i.json_data, '$.rcpt_cmpy_idcd') as rcpt_cmpy_idcd										")
			.where("		, c2.cstm_name as rcpt_cmpy_name																	")
			.where("		, ifnull(json_value(i.json_data, '$.bsmt_pric'), 0) as bsmt_pric									")
			.where("		, ifnull(json_value(i.json_data, '$.make_cost'), 0) as make_cost									")
			.where("		, cast(ifnull(json_value(i.json_data, '$.bsmt_pric'), 0) as signed)									")
			.where("		+ cast(ifnull(json_value(i.json_data, '$.make_cost'), 0) as signed) as prod_cost					")
		;
		data.param
			.where("from   acpt_item i																							")
			.where("       left outer join acpt_mast a   on a.invc_numb = i.invc_numb											")
			.where("       left outer join cstm_mast c   on a.cstm_idcd = c.cstm_idcd											")
			.where("       left outer join user_mast d   on a.drtr_idcd = d.user_idcd											")
			.where("       left outer join item_mast im  on i.item_idcd = im.item_idcd											")
			.where("       left outer join item_clss imc on im.mcls_idcd = imc.clss_idcd										")
			.where("       left outer join ( select sum(qntt) as is_qntt, min(invc_date) as is_date, orig_invc_numb, orig_seqn	")
			.where("						 from   isos_book																	")
			.where("						 where  invc_dvcd = '1800'															")
			.where("						 and    line_stat < 2																")
			.where("						 group  by orig_invc_numb, orig_seqn ) io on io.orig_invc_numb = a.invc_numb and io.orig_seqn = i.line_seqn ")
			.where("       left outer join ( select sum(qntt) as os_qntt, min(invc_date) as os_date, orig_invc_numb, orig_seqn	")
			.where("						 from   isos_book																	")
			.where("						 where  invc_dvcd = '2800'															")
			.where("						 and    line_stat < 2																")
			.where("						 group  by orig_invc_numb, orig_seqn ) os on os.orig_invc_numb = a.invc_numb and os.orig_seqn = i.line_seqn ")
			.where("       left outer join cstm_mast c2  on json_value(i.json_data, '$.rcpt_cmpy_idcd') = c2.cstm_idcd			")
			.where("where  1 = 1																								")
			.where("and    ifnull(a.ordr_dvcd,0) != '4000'																		")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.where("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("and	   a.acpt_dvcd   = '2000'											")
			.where("and	   a.acpt_stat_dvcd  = '0011'										")
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc,i.invc_numb desc, i.line_seqn limit 99999999							")
			.where(")a")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		String hq = arg.hq;
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.prnt_item_idcd       , a.revs_numb       , a.befr_splr_name      , a.splr_name	")
			.query("       , a.usag_qntt_memo       , a.ecod_purp       , a.drtr_idcd           , a.test_date	")
			.query("       , a.adpt_date            , a.remk_text       , u.user_name as drtr_name				")
			.query("       , a.revs_dvcd            , i.item_code       , i.item_name           , i.item_spec	")
			.query("       , a.user_memo            , a.sysm_memo       , a.prnt_idcd           , a.line_levl	")
			.query("       , a.line_ordr            , a.line_stat       , a.line_clos           , a.find_name	")
			.query("       , a.updt_user_name       , a.updt_ipad       , a.updt_dttm           , a.updt_idcd	")
			.query("       , a.updt_urif            , a.crte_user_name  , a.crte_ipad           , a.crte_dttm	")
			.query("       , a.crte_idcd            , a.crte_urif       , i.item_idcd			, a.line_stat	")
		;
		data.param
			.where("from  bom_revs a 															")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd					")
			.where("left outer join item_mast i on a.prnt_item_idcd = i.item_idcd					")
			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.fixParameter("item_idcd"))
			.where("and   a.revs_dvcd = :revs_dvcd	", arg.getParameter("revs_dvcd"))
			.where("and   a.revs_numb = :revs_numb	", arg.getParameter("revs_numb"), !"0".equals(arg.getParameter("revs_numb")))
			.where("and	  a.line_stat = :line_stat  ", "0" 			 				,  "0".equals(arg.getParameter("revs_numb")))
		;
		if(hq.toUpperCase().equals("N1000SJFLV")) {
			if("1".equals(arg.getParameter("revs_dvcd"))) {
				data.param
				.where("order by a.befr_splr_name, a.splr_name											");
			} else {
				data.param
					.where("order by a.befr_splr_name, a.splr_name										");
			}
		} else {
			data.param
				.where("order by a.revs_numb															");
		}
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.prnt_item_idcd  , a.revs_numb      , a.line_seqn      , a.ivst_item_idcd			")
			.query("       , a.item_name       , a.item_spec      , a.used_yorn									")
			.query("       , cast(a.mixx_rate as char) as mixx_rate												")
			.query("       , cast(a.ofap_mixx_rate as char) as ofap_mixx_rate									")
			.query("       , a.adpt_date       , i.item_code      , a.revs_dvcd									")
			.query("       , b.kfda            , b.fema           , b.seqc           , b.wdgb					")
			.query("       , b.caca            , b.algy_yorn      , a.ivst_item_idcd as item_idcd				")
			.query("       , b.hala_numb       , b.natr_name      , b.incm_cost									")
			.query("       , d.base_name as acct_name	, d.base_code as acct_bacd	  , io.os_qntt				")
			.query("		, '자재창고' as wrhs_name  , '02'	as wrhs_idcd										")
			.query("       , a.user_memo       , a.sysm_memo      , a.prnt_idcd									")
			.query("       , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos				")
			.query("       , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm				")
			.query("       , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad				")
			.query("       , a.crte_dttm       , a.crte_idcd      , a.crte_urif      ,  m.invc_numb				")
			.query("       , io.invc_date																		")
		;
		data.param
			.where("from  bom_mast a 																			")
			.where("left outer join item_mast i 		on a.ivst_item_idcd = i.item_idcd						")
			.where("left outer join item_mtrl_spec b 	on i.item_idcd = b.item_idcd							")
			.where("left outer join base_mast      d 	on i.acct_bacd = d.base_code and d.prnt_idcd = '1102' 	")
			.where("left outer join ( select sum(qntt) as os_qntt, orig_invc_numb, item_idcd , orig_seqn		")
			.where("                       , invc_date															")
			.where("                    from isos_book															")
			.where("                   where invc_dvcd = '2800'													")
			.where("					 and orig_invc_numb = :orig_invc_numb", arg.getParameter("orig_invc_numb"))
			.where("					 and orig_seqn 		= :orig_seqn"	  , arg.getParameter("revs_numb"))
			.where("                   group by item_idcd) as io on io.item_idcd = a.ivst_item_idcd	")
			.where("left outer join acpt_mast      m on m.invc_numb = a.prnt_item_idcd							")

			.where("where 1 = 1																		")
			.where("and   a.prnt_item_idcd 	= :prnt_item_idcd	", arg.getParameter("prnt_item_idcd"))
			.where("and   a.revs_numb      	= :revs_numb		", arg.getParameter("revs_numb"		))
			.where("and   a.revs_dvcd      	= :revs_dvcd		", arg.getParameter("revs_dvcd"		))
			.where("and   a.prnt_idcd      	= :prnt_idcd		", arg.getParameter("prnt_idcd"		))
			.where("and   i.acct_bacd 	   	= '2001'												")
			.where("order by a.line_seqn															")
		;
		return data.selectForMap();
	}


	public SqlResultMap getPrice(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		if ("Y".equals(arg.getParameter("rcpt_cmpy_new"))) {
			data.param
				.where("with cont as ( ")
				.where("    select * ")
				.where("    from   item_cont a ")
				.where("    where  1 = 1 ")
				.where("    and    a.cstm_idcd = :cstm_idcd		", arg.getParameter("rcpt_cmpy_idcd"))
				.where("    and    a.pric_dvcd = '3000' ")
				.where("    and    a.last_yorn   = '1' ")
				.where("), acpt as ( ")
				.where("    select a.item_idcd , a.invc_numb, a.amnd_degr, a.line_seqn, a.invc_qntt ")
				.where("    from   acpt_item a ")
				.where("    where  1 = 1 ")
				.where("    and    a.invc_numb = :invc_numb 	", arg.getParameter("invc_numb"))
				.where("    and    a.line_seqn = 1 ")
				.where(") ")
				.where("select t.* ")
				.where("     , (t.istt_qntt * istt_pric) as istt_amnt ")
				.where("     , @rownum := @rownum + 1 as assi_seqn ")
				.where("     , :cstm_idcd2 as rcpt_cmpy_idcd ", arg.getParameter("rcpt_cmpy_idcd"))
				.where("     , 'Y' as rcpt_cmpy_new ")
				.where("from   ( ")
				.where("        select b.acct_bacd, b.item_idcd, b.item_code, b.item_name, b.item_spec ")
				.where("             , a.mixx_rate ")
				.where("             , d.invc_qntt ")
				.where("             , round(d.invc_qntt * (a.mixx_rate /100), 6) as istt_qntt ")
				.where("             , ifnull(c.cont_pric, 0) as istt_pric ")
				.where("             , d.invc_numb, d.amnd_degr, d.line_seqn ")
				.where("        from   bom_mast a ")
				.where("               left outer join item_mast b on b.item_idcd = a.ivst_item_idcd ")
				.where("               left outer join cont c on c.item_idcd = a.ivst_item_idcd ")
				.where("               left outer join acpt d on d.item_idcd = a.prnt_item_idcd ")
				.where("        where  1 = 1 ")
				.where("        and    a.prnt_item_idcd = :item_idcd ", arg.getParameter("prnt_item_idcd"))
				.where("        and    a.revs_numb = :revs_numb ", arg.getParameter("revs_numb"))
				.where("        and    a.revs_dvcd = '1' ")
				.where("        and    b.acct_bacd != '2001' ")
				.where("       ) t ")
				.where("	 , (SELECT @rownum:=0) TMP ")
			;
		} else {
			data.param
				.where("select  d.acct_bacd, c.item_idcd, d.item_code, d.item_name, d.item_spec ")
				.where("      , b.invc_qntt ")
				.where("      , json_value(c.json_data,'$.mixx_rate') as mixx_rate ")
				.where("	  , json_value(c.json_data,'$.istt_qntt') as istt_qntt ")
				.where("	  , json_value(c.json_data,'$.istt_pric') as istt_pric ")
				.where("	  , json_value(c.json_data,'$.istt_amnt') as istt_amnt ")
				.where("	  , a.invc_numb, a.amnd_degr, b.line_seqn, c.assi_seqn ")
				.where("	  , json_value(b.json_data,'$.rcpt_cmpy_idcd') as rcpt_cmpy_idcd ")
				.where("	  , 'N' as rcpt_cmpy_new	")
				.where("from  acpt_mast a ")
				.where("      left outer join acpt_item b on b.invc_numb = a.invc_numb ")
				.where("      left outer join acpt_mtrl c on c.invc_numb = b.invc_numb and c.line_seqn = b.line_seqn ")
				.where("      left outer join item_mast d on d.item_idcd = c.item_idcd ")
				.where("where 1 = 1 ")
				.where("and   a.invc_numb = :invc_numb 	", arg.getParameter("invc_numb"))
				.where("and   b.line_seqn = :line_seqn 	", arg.getParameter("line_seqn"))
			;
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_date     , a.qntt      , a.invc_numb      ,  a.lott_numb	")
			.query("     , a.bzpl_idcd     , a.assi_seqn , a.stok_type_dvcd					")
			.query("     , a.orig_invc_numb, a.orig_seqn									")
			.query("     , b.item_code     , b.item_name , b.item_spec, a.invc_dvcd			")
			.query("     , c.wrhs_name  													")
			.query("     , a.line_seqn														")
			.query("     , i.line_seqn as lot_line_seqn										")
		;
		data.param
			.where("  from isos_book a 												")
			.where("       left outer join item_mast b on b.item_idcd = a.item_idcd ")
			.where("       left outer join wrhs_mast c on c.wrhs_idcd = a.wrhs_idcd ")
			.where("       left outer join lot_isos_book i on i.lott_numb = a.lott_numb and i.invc_numb = a.invc_numb and i.invc_seqn = a.line_seqn ")
			.where(" where 1 = 1 													")
			.where("   and a.orig_invc_numb = :invc_numb	", arg.getParameter("invc_numb"))
			.where("   and a.orig_seqn = :line_seqn			", arg.getParameter("line_seqn"))
			.where("   and a.invc_dvcd = '2800' 									")
			.where("   and a.stok_type_dvcd = '1' 									")
			.where("   and a.line_stat < 2 											")
			.where(" order by a.invc_date, a.invc_numb								")
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_date     , a.qntt      , a.invc_numb      ,  a.lott_numb	")
			.query("     , a.bzpl_idcd     , a.assi_seqn , a.stok_type_dvcd					")
			.query("     , a.orig_invc_numb, a.orig_seqn									")
			.query("     , b.item_code     , b.item_name , b.item_name, a.invc_dvcd			")
			.query("     , c.wrhs_name  													")
			.query("     , a.line_seqn														")
			.query("     , i.line_seqn as lot_line_seqn										")
		;
		data.param
			.where("  from isos_book a 												")
			.where("       left outer join item_mast b on b.item_idcd = a.item_idcd ")
			.where("       left outer join wrhs_mast c on c.wrhs_idcd = a.wrhs_idcd ")
			.where("       left outer join lot_isos_book i on i.lott_numb = a.lott_numb and i.invc_numb = a.invc_numb and i.invc_seqn = a.line_seqn ")
			.where(" where 1 = 1 													")
			.where("   and a.orig_invc_numb = :invc_numb	", arg.getParameter("invc_numb"))
			.where("   and a.orig_seqn = :line_seqn			", arg.getParameter("line_seqn"))
			.where("   and a.orig_seqn = 1 											")
			.where("   and a.invc_dvcd = '1800' 									")
			.where("   and a.stok_type_dvcd = '1' 									")
			.where("   and a.line_stat < 2 											")
			.where(" order by a.invc_date, a.invc_numb								")
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.where("select '원료비' as item_gubun															")
			.where("      , b.item_code																	")
			.where("      , b.item_name																	")
			.where("      , b.item_spec																	")
			.where("      , json_value(a.json_data,'$.mixx_rate') as mixx_rate							")
			.where("      , json_value(a.json_data,'$.istt_qntt') as istt_qntt							")
			.where("      , json_value(a.json_data,'$.istt_pric') as istt_pric							")
			.where("      , json_value(a.json_data,'$.istt_amnt') as istt_amnt							")
			.where("      , a.assi_seqn																	")
			.where("from  acpt_mtrl a																	")
			.where("      left outer join item_mast b on b.item_idcd = a.item_idcd						")
			.where("where 1 = 1																			")
			.where("and   a.invc_numb  = :invc_numb       "  , arg.getParamText("invc_numb"  ))
			.where("and   a.line_seqn  = :line_seqn       "  , arg.getParameter("line_seqn"  ))

			.where("union all																			")
			.where("select '임가공비' as item_gubun															")
			.where("      , null as item_code															")
			.where("      , null as item_name															")
			.where("      , null as item_spec															")
			.where("      , null as mixx_rate															")
			.where("      , null as istt_qntt															")
			.where("      , null as istt_pric															")
			.where("      , json_value(a.json_data,'$.make_cost') as istt_amnt							")
			.where("      , 99999 as assi_seqn															")
			.where("from  acpt_item a																	")
			.where("where 1 = 1																			")
			.where("and   a.invc_numb  = :invc_numb1      "  , arg.getParamText("invc_numb"  ))
			.where("and   a.line_seqn  = :line_seqn1      "  , arg.getParameter("line_seqn"  ))
			.where("order by assi_seqn																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap getLottNumb(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*)	as count							")
		;
		data.param
			.where("from lot_isos_book											")
			.where("where lott_numb = :lott_numb",arg.getParameter("lott_numb"))
		;
		return data.selectForMap();
	}

	// OEM 제품 입고
	public SqlResultMap setIstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		// 2023.09.04 - 이강훈 - OEM 제품입고 내역 삭제 삭제 시 마감여부 확인
		data.param
			.query("select	a.line_clos ")
		;
		data.param
			.where("from 	acpt_mast a")
			.where("        left outer join acpt_item b on b.invc_numb = a.invc_numb ")
			.where("where 	1 = 1")
			.where("and		a.invc_numb = :invc_numb "	, arg.fixParameter("invc_numb"))
			.where("and		b.line_seqn = :line_seqn "	, arg.fixParameter("line_seqn"))
		;
		SqlResultMap result = data.selectForMap();
		data.clear();

		int line_clos 	   = Integer.parseInt(result.get(0).getParameter("line_clos").toString());
		if (line_clos == 1) {
			throw new ServiceException("마감된 자료입니다. 확인 후 작업 바랍니다.");
		}

		data.param
			.table("isos_book												")
			.where("where invc_numb  = :invc_numb							")

			.unique("bzpl_idcd"			, arg.getParameter("bzpl_idcd"		))
			.unique("invc_dvcd"			, arg.getParameter("invc_dvcd"		))
			.unique("invc_numb"			, arg.fixParameter("new_invc_numb"	))
			.unique("line_seqn"			, 1									)
			.unique("stok_type_dvcd"	, arg.getParameter("stok_type_dvcd"	))

			.update("invc_date"			, arg.getParameter("invc_date"		))
			.update("wrhs_idcd"			, arg.getParameter("istt_wrhs_idcd"	))
			.update("item_idcd"			, arg.getParameter("item_idcd"		))
			.update("item_code"			, arg.getParameter("item_code"		))
			.update("unit_idcd"			, arg.getParameter("unit_idcd"		))
			.update("acct_bacd"			, arg.getParameter("acct_bacd"		))
			.update("drtr_idcd"			, arg.getParameter("drtr_idcd"		))
			.update("cstm_idcd"			, arg.getParameter("cstm_idcd"		))
			.update("qntt"				, arg.getParameter("istt_qntt"		))
			.update("lott_numb"			, arg.getParameter("lott_numb"		))
			.update("orig_invc_numb"	, arg.getParameter("invc_numb"		))
			.update("orig_seqn"			, arg.getParameter("line_seqn"		))
			.update("find_name"			, arg.getParameter("item_code"		)
										+ " "
										+ arg.getParameter("item_name"		)
										+ " "
										+ arg.getParameter("item_spec"		)
										+ " "
										+ arg.getParameter("lott_numb"		)
										+ " "
										+ arg.getParameter("invc_date"		))
			.insert("crte_ipad"			, arg.remoteAddress 				)
			.insert("crte_idcd"			, arg.login							)
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.insert);
		data.execute();
		data.clear();

		data.param
			.query("select	max(line_seqn) as maxseqn")
		;
		data.param
			.where("from 	lot_isos_book")
			.where("where 	1 = 1")
			.where("and		lott_numb = :lott_numb"	, arg.getParameter("lott_numb"))
			.where("and     stok_type_dvcd = 1 ")
		;
		result = data.selectForMap();
		data.clear();
		int lott_seqn = 1;
		if(result.get(0).getParamText("maxseqn")!=""){
			lott_seqn = Integer.parseInt(result.get(0).getParameter("maxseqn").toString());
			lott_seqn++;
		}

		data.param
			.table("lot_isos_book											")
			.where("where 	lott_numb    	= :lott_numb					")
			.where("and   	line_seqn		= :line_seqn					")
			.where("and		stok_type_dvcd	= :stok_type_dvcd				")

			.unique("lott_numb"			, arg.fixParameter("lott_numb"		))
			.unique("line_seqn"			, lott_seqn							)
			.unique("stok_type_dvcd"	, arg.fixParameter("stok_type_dvcd"	))

			.update("bzpl_idcd"			, arg.fixParameter("bzpl_idcd"		))
			.update("isos_dvcd"			, arg.getParameter("invc_dvcd"		))
			.update("item_idcd"			, arg.getParameter("item_idcd"		))
			.update("invc_numb"			, arg.getParameter("new_invc_numb"	))
			.update("invc_seqn"			, 1									)
			.update("invc_date"			, arg.getParameter("invc_date"		))
			.update("wrhs_idcd"			, arg.getParameter("istt_wrhs_idcd"	))
			.update("qntt"				, arg.getParameter("istt_qntt"		))
			.update("find_name"			, arg.getParameter("item_code"		)
										+ " "
										+ arg.getParameter("item_name"		)
										+ " "
										+ arg.getParameter("lott_numb"		)
										+ " "
										+ arg.getParameter("invc_date"		))
			.insert("crte_ipad"			, arg.remoteAddress 				)
			.insert("crte_idcd"			, arg.login 						)
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.insert);
		data.execute();
		data.clear();

		return null;
	}

	// OEM 출고
	public SqlResultMap setOstt(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		// 2023.08.11 - 이강훈 - OEM 원료출고 시 제품배합비 버전이 일치하는지 검증한다.
		data.param
			.query("select	a.line_clos ")
			.query("     ,	ifnull(nullif(json_value(b.json_data, '$.revs_numb'), ''), 0) as work_revs_numb ")
		;
		data.param
			.where("from 	acpt_mast a")
			.where("        left outer join acpt_item b on b.invc_numb = a.invc_numb ")
			.where("where 	1 = 1")
			.where("and		a.invc_numb = :orig_invc_numb "	, map.get(0).getParameter("orig_invc_numb"))
			.where("and		b.line_seqn = :orig_seqn "		, map.get(0).getParameter("orig_seqn"))
		;
		SqlResultMap result = data.selectForMap();
		data.clear();

		int line_clos 	   = Integer.parseInt(result.get(0).getParameter("line_clos").toString());
		int work_revs_numb = Integer.parseInt(result.get(0).getParameter("work_revs_numb").toString());
		int revs_numb 	   = Integer.parseInt(map.get(0).getParameter("revs_numb").toString());

		if (line_clos == 1) {
			throw new ServiceException("마감된 자료입니다. 확인 후 작업 바랍니다.");
		}
		if (work_revs_numb != 0 && work_revs_numb != revs_numb) {
			throw new ServiceException("출고된 리비전이 다릅니다. 확인 후 작업 바랍니다.");
		}

		// OEM 출고 처리
		for (SqlResultRow row : map) {
			data.param
				.table("isos_book												")
				.where("where invc_numb  = :invc_numb							")

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))

				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))
				.update("invc_dvcd"			, row.getParameter("invc_dvcd"		))
				.update("line_seqn"			, 1									 )
				.update("stok_type_dvcd"	, row.getParameter("stok_type_dvcd"	))
				.update("invc_date"			, row.getParameter("invc_date"		))
				.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"		))
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))
				.update("acct_bacd"			, row.getParameter("acct_bacd"		))
				.update("item_idcd"			, row.getParameter("item_idcd"		))
				.update("item_code"			, row.getParameter("item_code"		))
				.update("unit_idcd"			, row.getParameter("unit_idcd"		))
				.update("qntt"				, row.getParameter("ostt_qntt"		))
				.update("stok_qntt"			, row.getParameter("ostt_qntt"		))
				.update("lott_numb"			, row.getParameter("lott_numb"		))
				.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"	))
				.update("orig_seqn"			, row.getParameter("orig_seqn"		))
				.update("find_name"			, row.getParameter("item_code"		)
											+ " "
											+ row.getParameter("item_name"		)
											+ " "
											+ row.getParameter("item_spec"		)
											+ " "
											+ row.getParameter("lott_numb"		)
											+ " "
											+ new SimpleDateFormat("yyyyMMdd").format(new Date()))
				.insert("crte_ipad"			, arg.remoteAddress )
				.insert("crte_idcd"			, arg.login )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
				.query("select	max(line_seqn) as maxseqn ")
			;
			data.param
				.where("from 	lot_isos_book ")
				.where("where 	1 = 1 ")
				.where("and		lott_numb = :lott_numb "	, row.getParameter("lott_numb"))
				.where("and     stok_type_dvcd = 1 ")
			;
			result = data.selectForMap();
			data.clear();
			int lott_seqn = 1;
			if(result.get(0).getParamText("maxseqn")!=""){
				lott_seqn = Integer.parseInt(result.get(0).getParameter("maxseqn").toString());
				lott_seqn++;
			}

			data.param
				.table("lot_isos_book											")
				.where("where 	lott_numb    	= :lott_numb					")
				.where("and   	line_seqn		= :line_seqn					")
				.where("and		stok_type_dvcd	= :stok_type_dvcd				")

				.unique("lott_numb"			, row.fixParameter("lott_numb"		))
				.unique("line_seqn"			, lott_seqn							)
				.unique("stok_type_dvcd"	, row.fixParameter("stok_type_dvcd"	))

				.update("bzpl_idcd"			, row.fixParameter("bzpl_idcd"		))
				.update("isos_dvcd"			, row.getParameter("invc_dvcd"		))
				.update("invc_numb"			, row.getParameter("invc_numb"		))
				.update("invc_seqn"			, 1									)
				.update("invc_date"			, row.getParameter("invc_date"		))
				.update("item_idcd"			, row.getParameter("item_idcd"		))
				.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"		))
				.update("qntt"				, row.getParameter("ostt_qntt"		))
				.update("find_name"			, row.getParameter("item_code"		)
											+ " "
											+ row.getParameter("item_name"		)
											+ " "
											+ row.getParameter("lott_numb"		)
											+ " "
											+ new SimpleDateFormat("yyyyMMdd").format(new Date()))
				.insert("crte_ipad"			, arg.remoteAddress 				)
				.insert("crte_idcd"			, arg.login 						)
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}

		System.out.println("==> work_revs_numb : " + work_revs_numb);

		// 최초 출고인 경우 주문서에 배합리비전 정보를 저장한다.
		if (work_revs_numb == 0) {
			data.param
				.query("update acpt_item a")
		     	.query("set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(a.json_data,'{}'),'$.revs_numb'),:json)", "{\"revs_numb\":\"" + revs_numb + "\"}")
				.query(" where 1 = 1 ")
				.query("   and a.invc_numb = :orig_invc_numb "	, map.get(0).getParameter("orig_invc_numb"))
				.query("   and a.line_seqn = :orig_seqn "		, map.get(0).getParameter("orig_seqn"))
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}

		return null;
	}

	// OEM 제품단가 등록
	public SqlResultMap setPrice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		// 2023.09.04 - 이강훈 - OEM 제품입고 내역 삭제 삭제 시 마감여부 확인
		data.param
			.where("select	a.line_clos ")
			.where("from 	acpt_mast a")
			.where("        left outer join acpt_item b on b.invc_numb = a.invc_numb ")
			.where("where 	1 = 1")
			.where("and		a.invc_numb = :invc_numb "	, map.get(0).fixParameter("invc_numb"))
			.where("and		b.line_seqn = :line_seqn "	, map.get(0).fixParameter("line_seqn"))
		;
		SqlResultMap result = data.selectForMap();
		data.clear();

		int line_clos 	   = Integer.parseInt(result.get(0).getParameter("line_clos").toString());
		if (line_clos == 1) {
			throw new ServiceException("마감된 자료입니다. 확인 후 작업 바랍니다.");
		}

		ParamToJson p = new ParamToJson();
		String json_data = p.TranslateRow(arg, map.get(0), "acpt_item_json_fields");

		data.param
			.table ("acpt_item")
			.where ("where invc_numb = :invc_numb")
			.where ("and   amnd_degr = :amnd_degr")
			.where ("and   line_seqn = :line_seqn")

			.unique("invc_numb"        , map.get(0).fixParameter("invc_numb"))		//INVOICE번호
			.unique("amnd_degr"        , map.get(0).fixParameter("amnd_degr"))
			.unique("line_seqn"        , map.get(0).fixParameter("line_seqn"))

			.modify("json_data"        , "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.rcpt_cmpy_idcd','$.bsmt_pric','$.make_cost'), '" + json_data + "')")
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		if ("Y".equals(map.get(0).fixParameter("rcpt_cmpy_new"))) {
			data.param
				.table ("acpt_mtrl")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"        , map.get(0).fixParameter("invc_numb"))
				.unique("amnd_degr"        , map.get(0).fixParameter("amnd_degr"))
				.unique("line_seqn"        , map.get(0).fixParameter("line_seqn"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}

		for (SqlResultRow row : map){
			json_data = p.TranslateRow(arg, row, "acpt_mtrl_json_fields");

			data.param
				.table ("acpt_mtrl")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")
				.where ("and   line_seqn = :line_seqn")
				.where ("and   assi_seqn = :assi_seqn")

				.unique("invc_numb"        , row.fixParameter("invc_numb"))
				.unique("amnd_degr"        , row.fixParameter("amnd_degr"))
				.unique("line_seqn"        , row.fixParameter("line_seqn"))
				.unique("assi_seqn"        , row.fixParameter("assi_seqn"))
			;
			if (!"Y".equals(row.getParameter("rcpt_cmpy_new"))) {
				data.param
				    .modify("json_data"        , "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.mixx_rate','$.istt_qntt','$.istt_pric','$.istt_amnt'), '" + json_data + "')")
				;
			} else {
				data.param
				    .update("json_data"			, json_data)
				;
			}

			data.param
			    .update("item_idcd"        , row.getParameter("item_idcd"))
				.update("updt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.update("updt_idcd"        , arg.login)
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.insert("crte_idcd"        , arg.login)
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}

		return null;
	}

	// OEM 제품입고 내역 삭제
	public SqlResultMap deleteIstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		// 2023.09.04 - 이강훈 - OEM 제품입고 내역 삭제 삭제 시 마감여부 확인
		data.param
			.query("select	a.line_clos ")
		;
		data.param
			.where("from 	acpt_mast a")
			.where("        left outer join acpt_item b on b.invc_numb = a.invc_numb ")
			.where("where 	1 = 1")
			.where("and		a.invc_numb = :orig_invc_numb "	, arg.fixParameter("orig_invc_numb"))
			.where("and		b.line_seqn = :orig_seqn "		, arg.fixParameter("orig_seqn"))
		;
		SqlResultMap result = data.selectForMap();
		data.clear();

		int line_clos 	   = Integer.parseInt(result.get(0).getParameter("line_clos").toString());
		if (line_clos == 1) {
			throw new ServiceException("마감된 자료입니다. 확인 후 작업 바랍니다.");
		}

		// 수불 삭제
		data.param
			.table("isos_book")
			.where("where bzpl_idcd = :bzpl_idcd ")
			.where("and   invc_dvcd = :invc_dvcd ")
			.where("and   invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")
			.where("and   assi_seqn = :assi_seqn ")
			.where("and   stok_type_dvcd = :stok_type_dvcd ")
			//
			.unique("bzpl_idcd"		, arg.fixParameter("bzpl_idcd"))
			.unique("invc_dvcd"		, arg.fixParameter("invc_dvcd"))
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
			.unique("assi_seqn"		, arg.fixParameter("assi_seqn"))
			.unique("stok_type_dvcd", arg.fixParameter("stok_type_dvcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		// Lot수불 삭제
		data.param
			.table("lot_isos_book")
			.where("where lott_numb = :lott_numb ")
			.where("and   line_seqn = :line_seqn ")
			.where("and   stok_type_dvcd = :stok_type_dvcd ")
			//
			.unique("lott_numb"		, arg.fixParameter("lott_numb"))
			.unique("line_seqn"		, arg.fixParameter("lot_line_seqn"))
			.unique("stok_type_dvcd", arg.fixParameter("stok_type_dvcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		/* 주문서 - 원료단가, 임가공비 초기화 - 향우 적용 얘정
		ParamToJson trans = new ParamToJson();
		String json = trans.Translate(arg, "acpt_item_json_fields");

		data.param
			.query("update acpt_item a")
			.query("set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(a.json_data,'$.bsmt_pric','$.make_cost'),:json)",json)	//json merge  remove로 중복제거 후 merge
			.query("where invc_numb = :invc_numb",arg.getParameter("orig_invc_numb"))
			.query("and   line_seqn = :line_seqn",arg.getParameter("orig_seqn"))
			.query("and   not exists (select * from isos_book b where b.orig_invc_numb = a.invc_numb and b.orig_seqn = a.line_seqn and stok_type_dvcd  = '1' and invc_dvcd = '3100') ")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		*/
		return null;
	}

	// OEM 제공품 출고 내역 삭제
	public SqlResultMap deleteOstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		// 2023.09.04 - 이강훈 - OEM 제공품 출고 내역 삭제 시 마감여부 확인
		data.param
			.query("select	a.line_clos ")
		;
		data.param
			.where("from 	acpt_mast a")
			.where("        left outer join acpt_item b on b.invc_numb = a.invc_numb ")
			.where("where 	1 = 1")
			.where("and		a.invc_numb = :orig_invc_numb "	, arg.fixParameter("orig_invc_numb"))
			.where("and		b.line_seqn = :orig_seqn "		, arg.fixParameter("orig_seqn"))
		;
		SqlResultMap result = data.selectForMap();
		data.clear();

		int line_clos 	   = Integer.parseInt(result.get(0).getParameter("line_clos").toString());
		if (line_clos == 1) {
			throw new ServiceException("마감된 자료입니다. 확인 후 작업 바랍니다.");
		}

		// 수불 삭제
		data.param
			.table("isos_book")
			.where("where bzpl_idcd = :bzpl_idcd ")
			.where("and   invc_dvcd = :invc_dvcd ")
			.where("and   invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")
			.where("and   assi_seqn = :assi_seqn ")
			.where("and   stok_type_dvcd = :stok_type_dvcd ")
			//
			.unique("bzpl_idcd"		, arg.fixParameter("bzpl_idcd"))
			.unique("invc_dvcd"		, arg.fixParameter("invc_dvcd"))
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
			.unique("assi_seqn"		, arg.fixParameter("assi_seqn"))
			.unique("stok_type_dvcd", arg.fixParameter("stok_type_dvcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		// Lot수불 삭제
		data.param
			.table("lot_isos_book")
			.where("where lott_numb = :lott_numb ")
			.where("and   line_seqn = :line_seqn ")
			.where("and   stok_type_dvcd = :stok_type_dvcd ")
			//
			.unique("lott_numb"		, arg.fixParameter("lott_numb"))
			.unique("line_seqn"		, arg.fixParameter("lot_line_seqn"))
			.unique("stok_type_dvcd", arg.fixParameter("stok_type_dvcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		// 주문서 - OEM 출고버존 초기화
		data.param
			.query("update acpt_item a")
			.query("set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(a.json_data,'{}'),'$.revs_numb'),:json)", "{\"revs_numb\":\"\"}")

			.query("where invc_numb = :invc_numb",arg.getParameter("orig_invc_numb"))
			.query("and   line_seqn = :line_seqn",arg.getParameter("orig_seqn"))
			.query("and   not exists (select * ")
			.query("                    from isos_book b ")
			.query("                   where b.orig_invc_numb = a.invc_numb ")
			.query("                     and b.orig_seqn = a.line_seqn ")
			.query("                     and b.stok_type_dvcd = '1' ")
			.query("                     and b.invc_dvcd = '3200') ")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap getMakeCost(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select case when d.clss_code = '11' then b.invc_qntt * 3000 						")
			.query("            when d.clss_code = '12' then b.invc_qntt * 15000 						")
			.query("            when d.clss_code = '13' or d.clss_code = '14' then b.invc_qntt * 3000 	")
			.query("            else 0 																")
			.query("       end make_cost 																")
		;
		data.param
			.where("from  acpt_mast a 																	")
			.where("      left outer join acpt_item b on b.invc_numb = a.invc_numb 						")
			.where("      left outer join item_mast c on c.item_idcd = b.item_idcd						")
			.where("      left outer join item_clss d on d.clss_idcd = c.mcls_idcd						")
			.where("where 1 = 1 																		")
			.where("and   a.invc_numb = :invc_numb ",	arg.getParameter("invc_numb"))
			.where("and   b.line_seqn = :line_seqn ",	arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}
}