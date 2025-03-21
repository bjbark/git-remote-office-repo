package com.sky.system.custom.kortc.sale.order.sorderplan;

import java.text.SimpleDateFormat;
import java.util.Date;

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
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("kortc.SorderPlanService")
public class SorderPlanService  extends DefaultServiceHandler {
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
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb      , a.amnd_degr       													")
			.where("		, a.user_memo      , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.where("		, a.line_ordr      , a.line_stat       , a.line_clos         , a.find_name				")
			.where("		, a.updt_user_name , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.where("		, a.updt_urif      , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.where("		, a.crte_idcd      , a.crte_urif														")
			.where("		, c.cstm_code      , c.cstm_name       , d.user_name as drtr_name						")
			.where("		, i.item_code      , i.item_name       , i.item_spec         , a.line_seqn				")
			.where("		, a.invc_qntt      , a.invc_amnt       , a.vatx_amnt         , a.invc_pric				")
			.where("		, a.deli_date      , a.sply_amnt       , ac.acpt_case_name  							")
			.where("		, ac.bzpl_idcd     , ac.invc_date      , ac.cstm_drtr_name   , a.item_idcd				")
			.where("		, if(m.invc_numb , 1 , 0) as need_yorn													")
			.where("from	acpt_item a																				")
			.where("left outer join ( select  ac.acpt_case_name  , ac.amnd_degr        , ac.bzpl_idcd 				")
			.where("                        , ac.invc_date       , ac.cstm_drtr_name   , ac.invc_numb				")
			.where("                        , ac.cstm_idcd       , ac.drtr_idcd        , ac.ordr_dvcd				")
			.where("                  from acpt_mast ac																")
			.where("                  group by ac.invc_numb															")
			.where("                ) ac on a.invc_numb = ac.invc_numb												")
			.where("left outer join ( select  m.invc_numb  , m.amnd_degr    , m.acpt_seqn							")
			.where("                        , m.line_seqn															")
			.where("                  from mtrl_need m																")
			.where("                  group by m.invc_numb															")
			.where("                ) m on ac.invc_numb = m.invc_numb	and ac.amnd_degr = m.amnd_degr and a.line_seqn = m.acpt_seqn												")
			.where("left outer join cstm_mast c on ac.cstm_idcd = c.cstm_idcd										")
			.where("left outer join user_mast d on ac.drtr_idcd = d.user_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("where  1=1																						")
			.where("and		ifnull(ac.ordr_dvcd,0) != '4000'														")
			.where("and		a.amnd_degr = (select max(amnd_degr) from acpt_item where invc_numb = a.invc_numb ) 	")
			.where("and		a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and		ac.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and		ac.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and		ac.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and		a.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and		ac.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and		a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and		a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by ac.invc_date desc																		")
			.where(") a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
			.query("     , a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      , a.optn_psbl_yorn	")
			.query("     , a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_qntt		")
			.query("     , a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt		")
			.query("     , a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
			.query("     , a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      , a.dlvy_date		")
			.query("     , a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
			.query("     , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
			.query("     , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("     , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("     , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.query("     , a.cstm_lott_numb , a.item_imge      , a.item_imge2						   													")
			.query("     , b.item_code      , b.item_name      , b.item_spec      , u.unit_name							")
			.query("     , a.deli_date as 'deli_date2'																	")

		;
		data.param
			.where("from   acpt_item a																					")
			.where("       left outer join item_mast b on a.item_idcd = b.item_idcd										")
			.where("       left outer join unit_mast u on b.unit_idcd = u.unit_idcd										")
			.where("       left outer join item_adon i on a.item_idcd = i.item_idcd										")
			.where("       left outer join item_desc d on d.item_idcd = b.item_idcd										")
			.where("where  1=1																							")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb , a.line_seqn																	")
		;
		return data.selectForMap();
	}


	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.amnd_degr       , a.amnd_resn        , a.amnd_date			")
			.query("        , a.acpt_dvcd        , a.expt_dvcd       , a.regi_date        , a.amnd_befr_data	")
			.query("        , a.drtr_idcd        , a.last_yorn       , a.apvl_date        , a.apvl_drtr_idcd	")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , u.user_name as drtr_name															")
		;
		data.param
			.where("from acpt_amnd a																			")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where    1=1																				")
			.where("and      a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb , a.amnd_degr desc														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select i.item_code   , i.item_name      , i.item_spec      , u.unit_name							")
			.query("     , a.pqty_ndqt as prnt_qntt         , a.stok_qntt      , if(p.invc_numb , 1 , 0) as purc_yorn	")
			.query("     , p.invc_date      , p.deli_date   , p.acpt_numb      , p.invc_numb 							")
			.query("     , a.user_memo      , a.sysm_memo   , a.prnt_idcd												")
			.query("     , a.line_levl      , a.line_ordr   , a.line_stat      , a.line_clos      , a.find_name			")
			.query("     , a.updt_user_name , a.updt_ipad   , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.query("     , a.crte_user_name , a.crte_ipad   , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")

		;
		data.param
			.where("from   mtrl_need a																					")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("       left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
			.where("       left outer join (select  a.acpt_numb , a.acpt_amnd_degr , a.acpt_seqn						")
			.where("                              , m.invc_date , m.deli_date      , m.invc_numb						")
			.where("                              , i.item_idcd															")
			.where("                        from purc_trst_item  a														")
			.where("                        left outer join purc_ordr_item i on i.invc_numb = a.offr_numb and a.offr_seqn = i.line_seqn	")
			.where("                        left outer join purc_ordr_mast m on i.invc_numb = m.invc_numb 				")
			.where("                        where a.line_stat < 2														")
			.where("       	                ) p on a.invc_numb = p.acpt_numb and a.acpt_seqn = p.acpt_seqn and a.item_idcd = p.item_idcd	")
			.where("where  1=1																							")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.amnd_degr	=:amnd_degr		" , arg.getParamText("amnd_degr"))
			.where("and    a.acpt_seqn	=:acpt_seqn		" , arg.getParamText("line_seqn"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																				")
		;
		return data.selectForMap();
	}


	public SqlResultMap getDetail4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb      , a.amnd_degr														")
			.where("		, c.cstm_code      , c.cstm_name       , d.user_name as drtr_name						")
			.where("		, i.item_code      , i.item_name       , i.item_spec         , a.line_seqn				")
			.where("		, a.invc_qntt      , a.invc_amnt       , a.vatx_amnt         , a.invc_pric				")
			.where("		, a.deli_date      , a.sply_amnt       , ac.acpt_case_name  							")
			.where("		, ac.bzpl_idcd     , ac.invc_date      , ac.cstm_drtr_name   , a.item_idcd				")
			.where("		, s.istt_date      , s.stok_qntt       , s.lott_numb									")
			.where("from	lot_isos_sum s																			")
			.where("left outer join acpt_item a on a.item_idcd = s.item_idcd										")
			.where("left outer join ( select  ac.acpt_case_name  , ac.amnd_degr        , ac.bzpl_idcd 				")
			.where("                        , ac.invc_date       , ac.cstm_drtr_name   , ac.invc_numb				")
			.where("                        , ac.cstm_idcd       , ac.drtr_idcd        , ac.ordr_dvcd				")
			.where("                  from acpt_mast ac																")
			.where("                  group by ac.invc_numb															")
			.where("                ) ac on a.invc_numb = ac.invc_numb												")
			.where("left outer join cstm_mast c on ac.cstm_idcd = c.cstm_idcd										")
			.where("left outer join user_mast d on ac.drtr_idcd = d.user_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("where  1=1																						")
			.where("and		ac.ordr_dvcd = '4000'																	")
			.where("and		s.stok_qntt > 0																			")
			.where("and		s.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and		a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb desc																		")
			.where(") a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select item_imge, item_imge2		")
			.where("from  acpt_item						")
			.where("where 1=1							")
			.where("      and  invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			.where("      and  amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
			.where("      and  line_seqn = :line_seqn", arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.query("select count(*) as line_seqn																")
		;
		data.param
		.where("from		acpt_cnsl a   																	")
		.where("where		1=1																				")
		.where("and			a.invc_numb = :invc_numb		" , arg.getParameter("invc_numb"				))
		.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
//			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate				")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.acpt_dvcd				")
			.query("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.query("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       												")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name    , b.post_code		")
			.query("		, b.dlvy_exps       , b.dlvy_addr_1fst as addr_1fst    , b.dlvy_addr_2snd as addr_2snd	")
			.query("		, b.tele_numb_1fst  , b.tele_numb_2snd  , b.rctr_name         , b.dlvy_atcl 			")
			.query("		, if(a.acpt_dvcd = '1000', c2.dlvy_addr_1fst, c2.dely_cstm_name) as cstm_name2			")
			.query("		, a.dlvy_cstm_idcd																		")
			.query("from    acpt_mast a																				")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd							")
			.query("        left outer join cstm_deli      c2 on a.dlvy_cstm_idcd = c2.dlvy_cstm_idcd				")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd							")
			.query("        left outer join acpt_dlvy      b  on a.invc_numb = b.invc_numb							")
			.query("where   1=1																						")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
				.query("		, a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      , a.optn_psbl_yorn	")
				.query("		, a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_qntt		")
				.query("		, a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt		")
				.query("		, a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
				.query("		, a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      , a.dlvy_date		")
				.query("		, a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
				.query("		, a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
				.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.query("		, a.cstm_lott_numb , b.item_code      , b.item_name      , b.item_spec      , u.unit_name		")
				.query("		, a.deli_date as deli_date2																		")
			;
			if(arg.getParamText("stor_id").toUpperCase().equals("N1000SJFLV1000")) {
			data.param
				.query("        , cast(replace(json_extract(a.json_data, '$.pack_qntt'),'\"','') as char) as pack_qntt			")
			;
			}
				data.param
				.where("from   acpt_item a																						")
				.where("       left outer join item_mast b on a.item_idcd = b.item_idcd											")
				.where("       left outer join unit_mast u on b.unit_idcd = u.unit_code											")
				.where("where   1=1																								")
				.where("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
				.where("and     a.amnd_degr	=:amnd_degr  "	, arg.getParamText("amnd_degr"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setBom(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call bom_work_kortc2 (								")
			.query("   :param       "  , arg.fixParameter("records")	)
			.query(" ) 													")
		;

		return data.selectForMap();
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String hq = "";


		for (SqlResultRow row:map) {
			if(row.getParamText("hqof_idcd").length() > 0){
				hq = row.getParamText("hqof_idcd");
			}
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// master 등록/수정
				data.param
					.table("acpt_mast"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					//
					.update("amnd_degr"			, row.getParameter("amnd_degr"			))  /*  amd차수  */
					.update("bzct_dvcd"			, row.getParameter("bzct_dvcd"			))  /*  사업부문구분코드  */
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  invoice일자  */
					.update("ordr_dvcd"			, row.getParameter("ordr_dvcd"			))  /*  오더구분코드  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))  /*  원invoice번호  */
//					.update("expt_dvcd"			, row.getParameter("expt_dvcd"			))  /*  수출구분코드  */
					.update("pcod_numb"			, row.getParameter("pcod_numb"			))  /*  pono */
					.update("deli_date"			, row.getParameter("deli_date"			))  /*  납기일자 */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))  /*  거래처ID */
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))  /*  납품처ID */
					.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"			))  /*  중개인  */
					.update("cont_date"			, row.getParameter("cont_date"			))  /*  계약일자  */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))  /*  담당자ID  */
					.update("dept_idcd"			, row.getParameter("dept_idcd"			))  /*  부서ID  */
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"			))  /*  통화구분코드  */
					.update("excg_rate"			, row.getParameter("excg_rate"			))  /*  환율  */
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"		))  /*  출고창고  */
					.update("acpt_dvcd"			, row.getParameter("acpt_dvcd"			))  /*  수주구분코드  */
					.update("trut_dvcd"			, row.getParameter("trut_dvcd"			))  /*  위탁구분코드  */
					.update("dlvy_cond_dvcd"	, row.getParameter("dlvy_cond_dvcd"		))  /*  인도조건구분코드  */
					.update("crdt_exce_yorn"	, row.getParameter("crdt_exce_yorn"		))  /*  여신초과여부  */
					.update("amnt_lack_yorn"	, row.getParameter("amnt_lack_yorn"		))  /*  금액미달여부  */
					.update("sale_stor_yorn"	, row.getParameter("sale_stor_yorn"		))  /*  판매보관여부  */
					.update("remk_text"			, row.getParameter("remk_text"			))  /*  비고  */
					.update("memo"				, row.getParameter("memo"				))  /*  메모  */
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))  /*  확정여부  */
					.update("cofm_dttm"			, row.getParameter("cofm_dttm"			))  /*  확정일시  */
					.update("cofm_drtr_idcd"	, row.getParameter("cofm_drtr_idcd"		))  /*  확정담당자ID  */
					.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd"		))  /*  수주상태구분코드  */
					;
				if(row.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
					data.param
						.update("expt_dvcd"			, 0)  /*  수출구분코드  */
					;
				}else{
					data.param
						.update("expt_dvcd"			, row.getParameter("expt_dvcd"		))  /*  수출구분코드  */
					;
				}
				data.param
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ " "
												+ row.getParamText("cstm_idcd"			).trim()
												+ " "
												+ row.getParamText("cstm_name"			).trim())
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
				data.attach(rowaction);
				data.execute();
				data.clear();

				System.out.println(hq+"#################");

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				if (rowaction == Action.modify) {

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
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
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
					.table("acpt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;
				data.attach(rowaction);

			} else {
				// detail 등록/수정

				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

				data.param
					.table("acpt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("amnd_degr"			, row.getParameter("amnd_degr"			))
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("cstm_lott_numb"	, row.getParameter("cstm_lott_numb"		))
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))
					.update("orig_seqn"			, row.getParameter("orig_seqn"			))
					.update("orig_invc_qntt"	, row.getParameter("orig_invc_qntt"		))
					.update("ortn_dvcd"			, row.getParameter("ortn_dvcd"			))
					.update("optn_psbl_yorn"	, row.getParameter("optn_psbl_yorn"		))
					.update("optn_adtn"			, row.getParameter("optn_adtn"			))
					.update("pric_adpt"			, row.getParameter("pric_adpt"			))
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))
					.update("invc_qntt"			, row.getParameter("invc_qntt"			))
					.update("invc_pric"			, row.getParameter("invc_pric"			))
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
					.update("invc_amnt"			, row.getParameter("invc_amnt"			))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"			))
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"			))
					.update("krwn_ttsm_amnt"	, row.getParameter("krwn_ttsm_amnt"		))
					.update("stnd_unit"			, row.getParameter("stnd_unit"			))
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))
					.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"			))
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))
					.update("deli_date"			, deli_date2							)
					.update("dlvy_date"			, row.getParameter("dlvy_date"			))
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
					.update("dsct_qntt"			, row.getParameter("dsct_qntt"			))
					.update("dlvy_memo"			, row.getParameter("dlvy_memo"			))
					.update("json_data"			, json_data)

					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ row.getParamText("item_idcd"			).trim()
												+ row.getParamText("remk_text"			).trim())
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
				data.attach(rowaction);
				data.execute();
				data.clear();
			}

		}
	}

	public SqlResultMap setDetail4(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("acpt_cnsl												")
					.where("where invc_numb		= :invc_numb							")
					.where("and line_seqn		= :line_seqn							")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))	//품목ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번
					//
					.update("cnsl_dttm"			, row.getParameter("cnsl_dttm"			))	//표준바
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))	//담당자ID
					.update("cstm_dept_name"	, row.getParameter("cstm_dept_name"		))	//고객부서명
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"		))	//거래처담당자명
					.update("cnsl_cont"			, row.getParameter("cnsl_cont"			))	//상담내용
					.update("cost_yorn"			, row.getParameter("cost_yorn"			))	//원가여부
					.update("dsig_yorn"			, row.getParameter("dsig_yorn"			))	//설계여부
					.update("puch_yorn"			, row.getParameter("puch_yorn"			))	//구매여부
					.update("otod_yorn"			, row.getParameter("otod_yorn"			))	//외주여부
					.update("prod_yorn"			, row.getParameter("prod_yorn"			))	//생산여부
					.update("rply_reqt_yorn"	, row.getParameter("rply_reqt_yorn"		))	//회신요청여부
					.update("rply_mthd_dvcd"	, row.getParameter("rply_mthd_dvcd"		))	//회신방법구분코드
					.update("rply_drtr_idcd"	, row.getParameter("rply_drtr_idcd"		))	//회산담당자ID
					.update("rply_dttm"			, row.getParameter("rply_dttm"			))	//회신일시
					.update("rply_cont"			, row.getParameter("rply_cont"			))	//회신내용

			 		.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"			, row.getParamText("item_idcd"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
					;
				data.attach(rowaction);
			}
			data.execute();
		return null ;
	}

	public SqlResultMap setPlan(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "acpt_item_json_fields");

		data.param
			.table ("acpt_item")
			.where ("where invc_numb = :invc_numb")
			.where ("and   line_seqn = :line_seqn")
			.where ("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"        , arg.getParameter("invc_numb"))
			.unique("line_seqn"        , arg.getParameter("line_seqn"))
			.unique("amnd_degr"        , arg.getParameter("amnd_degr"))

			.update("json_data"        , json_data)
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}
	public SqlResultMap setPopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson trans = new ParamToJson();
		String json_data = trans.TranslateProcedure(arg, "stwk_schd_date,endd_schd_date,mtrl_spdt");
		int total = 0;
		data.param
			.table ("acpt_item")
			.where ("where invc_numb = :invc_numb")
			.where ("and   line_seqn = :line_seqn")
			.where ("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"        , arg.getParameter("invc_numb"))
			.unique("line_seqn"        , arg.getParameter("line_seqn"))
			.unique("amnd_degr"        , arg.getParameter("amnd_degr"))

			.update("json_data"        , json_data)
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			total += Integer.parseInt(row.getParamText("need_qntt"));
		}
		int qntt = Integer.parseInt(arg.fixParamText("invc_qntt")) - total;
		data.param
			.query("call auto_pror_create(")
			.query("     :invc_numb ",arg.fixParameter("invc_numb"))
			.query("   , :amnd_degr ",arg.fixParameter("amnd_degr"))
			.query("   , :line_seqn ",arg.fixParameter("line_seqn"))
			.query("   , :item_idcd ",arg.fixParameter("item_idcd"))
			.query("   , :strt_dttm ",arg.fixParameter("stwk_schd_date"))
			.query("   , :endd_dttm ",arg.fixParameter("endd_schd_date"))
			.query("   , :crte_idcd ",arg.fixParameter("crte_idcd"))
			.query("   , :total ",qntt)
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();

		return null;
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
			.query("from  acpt_mast							")
		 	.query("where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("acpt_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("acpt_item")
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
}