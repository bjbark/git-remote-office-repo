package com.sky.system.custom.kortc.sale.order.sordermast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;


@Service
public class SorderMastService  extends DefaultServiceHandler {
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
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.where("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.where("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.where("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate				")
			.where("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.where("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.where("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.where("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.where("		, a.crte_idcd       , a.crte_urif       , a.cstm_drtr_name    , e.uper_seqn				")
			.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.where("		, (select count(*) from acpt_item r where r.invc_numb = a.invc_numb and a.amnd_degr = r.amnd_degr) as item_cnt	")
			.where("		, (select sum(r.sply_amnt + r.vatx_amnt) from acpt_item r where r.invc_numb = a.invc_numb and a.amnd_degr = r.amnd_degr ) as sum_ttsm_amnt	")
			.where("		, a.acpt_case_name																		")
			.where("from	acpt_mast a																				")
			.where("left	outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("left	outer join user_mast d on a.drtr_idcd = d.user_idcd										")
			.where("left	outer join wrhs_mast w on a.ostt_wrhs_idcd = w.wrhs_idcd								")
			.where("left	outer join acpt_item i on a.invc_numb = i.invc_numb										")
			.where("left	outer join acpt_cnsl e on e.invc_numb = i.invc_numb										")
			.where("left	outer join item_mast b on b.item_idcd = i.item_idcd										")
			.where("where  1=1																						")
			.where("and		ifnull(a.ordr_dvcd,0) != '4000'															")
			.where("and		a.amnd_degr = (select max(amnd_degr) from acpt_mast where invc_numb = a.invc_numb ) 	")
			.where("and		a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and		a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and		a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and		a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and		b.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and		a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and		a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and		a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																			")
			.where("order by a.invc_numb desc																		")
			.where(") a																								")
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
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         				")
			.query("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.query("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif														")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("		, w.wrhs_code       , w.wrhs_name														")
			.query("		, i.item_idcd")


		;
		data.param
			.where("from   acpt_mast a																				")
			.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
			.where("left   outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join acpt_item      i on a.invc_numb = i.invc_numb									")
			.where("where  1=1																						")
			.where("and    a.ordr_dvcd != '4000'																	")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																			")
			.where("order by a.invc_numb																			")
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
			.query("     , a.cstm_lott_numb , a.item_imge      , a.item_imge2											")
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
			.where("and    a.amnd_degr	=:amnd_degr		" , arg.getParamText("amnd_degr"))
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

	public SqlResultMap getDetail4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb           , a.line_seqn         , a.cnsl_dttm         , a.drtr_idcd		")
			.query("        , a.cstm_dept_name      , a.cstm_drtr_name    , a.cnsl_cont         , a.cost_yorn		")
			.query("        , a.dsig_yorn           , a.puch_yorn         , a.otod_yorn         , a.prod_yorn		")
			.query("        , a.rply_reqt_yorn      , a.rply_mthd_dvcd     , a.rply_drtr_idcd	, a.rply_dttm		")
			.query("        , a.rply_cont           , u.user_name as drtr_name  , a.uper_seqn						")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
		;
		data.param
			.where("from acpt_cnsl a																				")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.where("where   1=1																						")
			.where("and     a.invc_numb  = :invc_numb	" , arg.getParameter("invc_numb"))
			.where("and     a.line_stat  < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.uper_seqn  = :amnd_degr	" , arg.getParameter("uper_seqn"))
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
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


	public SqlResultMap setConsulting(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("acpt_cnsl")
					.where("where invc_numb = :invc_numb" )
					.where("and   line_seqn = :line_seqn" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("cnsl_dttm"			, row.getParameter("cnsl_dttm"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("cstm_dept_name"	, row.getParameter("cstm_dept_name"))
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"))
					.update("cnsl_cont"			, row.getParameter("cnsl_cont"))
					.update("cost_yorn"			, row.getParameter("cost_yorn"))
					.update("dsig_yorn"			, row.getParameter("dsig_yorn"))
					.update("puch_yorn"			, row.getParameter("puch_yorn"))
					.update("otod_yorn"			, row.getParameter("otod_yorn"))
					.update("prod_yorn"			, row.getParameter("prod_yorn"))
					.update("rply_reqt_yorn"	, row.getParameter("rply_reqt_yorn"))
					.update("rply_mthd_dvcd"	, row.getParameter("rply_mthd_dvcd"))
					.update("rply_drtr_idcd"	, row.getParameter("rply_drtr_idcd"))
					.update("rply_dttm"			, row.getParameter("rply_dttm"))
					.update("rply_cont"			, row.getParameter("rply_cont"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		data.execute();
		return null ;
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
			.query("		, a.dlvy_cstm_idcd  , a.acpt_case_name													")
			.query("from    acpt_mast a																				")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd							")
			.query("        left outer join cstm_deli      c2 on a.dlvy_cstm_idcd = c2.dlvy_cstm_idcd				")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd							")
			.query("        left outer join acpt_dlvy      b  on a.invc_numb = b.invc_numb							")
			.query("where   1=1																						")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			.query("and     a.amnd_degr	=:amnd_degr  "	, arg.getParamText("amnd_degr"))

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
				data.param
				.where("from   acpt_item a																						")
				.where("       left outer join item_mast b on a.item_idcd = b.item_idcd											")
				.where("       left outer join unit_mast u on b.unit_idcd = u.unit_code											")
				.where("where   1=1																								")
				.where("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
				.where("and     a.amnd_degr	=:amnd_degr  "	, arg.getParamText("amnd_degr"))
				.where("and     a.line_stat	< 2																					")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	/*
	 * 마감 / 해지 건을 수정.
	 */

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String line_clos	= arg.getParamText("line_clos");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_close (			")
			.query("   :STOR       "  , hq			 )  // 본사코드
			.query(" , :invc_numb  "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_close "  , line_clos 	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
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
				if (rowaction == Action.update) {
					SqlResultRow ordrInfo = getOrderInfo(arg);
					if ( Double.parseDouble( ordrInfo.getParamText( "line_clos" )) == 1) {
						throw new ServiceException("마감되어 수정할 수 없습니다.");
					}

					if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(map.get(0).getParamText("amnd_degr"))) {
						throw new ServiceException("최종 차수가 아닌 경우 수정할 수 없습니다.");
					}
				}

				// master 등록/수정
				data.param
					.table("acpt_mast"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr" )
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))  /*  amd차수  */
					//
					.update("bzct_dvcd"			, row.getParameter("bzct_dvcd"			))  /*  사업부문구분코드  */
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  invoice일자  */
					.update("ordr_dvcd"			, row.getParameter("ordr_dvcd"			))  /*  오더구분코드  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))  /*  원invoice번호  */
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
					.update("expt_dvcd"			, row.getParameter("expt_dvcd"			))  /*  수출구분코드  */
					.update("acpt_case_name"	, row.getParameter("acpt_case_name"		))  /*  주문명  */
				;
				data.param
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ " "
												+ row.getParamText("acpt_case_name"		).trim()
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

				data.param
					.table("acpt_amnd")
					.where("where invc_numb = :invc_numb" )
					.where("and   amnd_degr = :amnd_degr" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("amnd_degr"			, 1)

					.update("amnd_date"			, row.getParameter("invc_date"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
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
				if(!row.getParamText("deli_date2").isEmpty()){
				deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
				}
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
					.where("and   amnd_degr		= :amnd_degr							")	/*  AMEND순번  */

					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					//
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
					.update("find_name"			, row.getParamText("item_code"			).trim()
							                    + " "
												+ row.getParamText("item_name"			).trim()
												+ " "
												+ row.getParamText("item_spec"			).trim())
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
					.table("acpt_cnsl													")
					.where("where invc_numb		= :invc_numb							")
					.where("and   line_seqn 	= :line_seqn							")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))	//품목ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					.update("uper_seqn"			, row.getParameter("uper_seqn"))

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
				data.execute();
				data.clear();

//				data.param
//					.query("update ( select a.invc_numb,a.line_seqn,@rank:=@rank+1 as rank									")
//					.query("         from acpt_cnsl a, (select @rank := 0 ) r												")
//					.query("         where a.invc_numb = :invc_numb",row.fixParameter("invc_numb"))
//					.query("       ) a																						")
//					.query("       left outer join acpt_cnsl b on a.invc_numb = b.invc_numb and a.line_seqn = b.line_seqn	")
//					.query("set b.line_seqn = a.rank																		")
//					;
//				data.attach(Action.direct);
			}

	data.execute();
	return null;
	}


	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultRow ordrInfo = getOrderInfo(arg);

		if ( Double.parseDouble( ordrInfo.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("마감되어 삭제할 수 없습니다.");
		}
		if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(arg.getParamText("amnd_degr")) ) {
			throw new ServiceException("최종 차수가 아닌 경우 삭제할 수 없습니다.");
		}
		data.param
			.table("apnd_file")
	     //
			.where("where invc_numb = :invc_numb")
			.where("and   line_seqn = :line_seqn")
			.where("and   uper_seqn = :uper_seqn")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
			.update("uper_seqn"		, arg.getParameter("uper_seqn"))

		;data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("acpt_cnsl")
			.where("where invc_numb = :invc_numb ")
			.where("and   uper_seqn = :uper_seqn ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("uper_seqn"		, arg.getParameter("amnd_degr"))

		;data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("acpt_amnd")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))

		;data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("acpt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))

		;data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("acpt_mast")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))

		;data.attach(Action.delete);
		data.execute();
		return null;
	}




	public SqlResultMap setStps(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);


		int i = 0;

		for (SqlResultRow row:map) {
			if(i == 0){
				data.param
					.table("sale_ostt_mast											")
					.where("where invc_numb		= :invc_numb						")

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"	))	//invoice번호

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
					.update("invc_date"			, row.getParameter("invc_date"		))	//출고일자 //오늘날짜
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)

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

				data.param
					.table("sale_ostt_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))		//정상판매단가
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))		//판매기준단가
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"			))		//출고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
					.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("orig_seqn"			, row.getParameter("line_seqn"			))		//원INVOICE항번
					.update("ostt_dvcd"			, "3200"								)		//출고구분코드
					.update("insp_dvcd"			, "1000"								)		//검사구분코드

					.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast												")
					.where("where invc_numb		= :invc_numb						")		//invoice번호

					.unique("invc_numb"				, row.fixParameter("invc_numb"	))		//invoice번호

					.update("acpt_stat_dvcd"		, "0600"						)		//수주상태
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				i =+ 1;

			}else{
				data.param
					.table("sale_ostt_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"			))		//출고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
					.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("orig_seqn"			, row.getParameter("line_seqn"			))		//원INVOICE항번
					.update("ostt_dvcd"			, "3200"								)		//출고구분코드
					.update("insp_dvcd"			, "1000"								)		//검사구분코드

					.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast												")
					.where("where invc_numb		= :invc_numb						")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))		//invoice번호

					.update("acpt_stat_dvcd"		, "0600"						)		//수주상태
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
				data.param
					.query("call auto_acpt_stat_dvcd (		")
					.query("  :invc_numb "  , row.getParameter("invc_numb"	)) // Invoice 번호
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}

		return null;
	}

	//출고지시
//	public SqlResultMap setStps(HttpRequestArgument arg) throws Exception {
//		String invc_numb	= arg.getParamText("invc_numb") ;
//		String line_seqn	= arg.getParamText("line_seqn") ;
//		System.out.println("line_seqn:"+ line_seqn);
//		DataMessage data;
//		String hq    = arg.getParamText("hqof_idcd") ;
//		String stor  = arg.getParamText("stor_id");
//		if (hq.length() == 0  && stor.length() >= 10 ) {
//			hq = stor.substring(0,10) ;
//		}
//		if (invc_numb.length() == 0) {
//			invc_numb = "not defined" ;
//		}
//
//		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = arg.newStorage("POS");      }
//			data.param
//			.query("call auto_spts_insert2 (			")
//			.query("   :STOR "       , stor			)  // 본사코드
//			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
//			.query(" , :line_seqn "  , line_seqn	)  // Invoice 번호
//			.query(" ) 								")
//		;
//		data.attach(Action.direct);
//		data.execute();
//		return null;
//	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd");
		String stor			= arg.getParamText("stor_id");
		String invc_numb	= arg.getParamText("invc_numb");
		String amnd_degr	= arg.getParamText("amnd_degr");
		String deli_date	= arg.getParamText("deli_date");
		String logn_id		= arg.getParamText("logn_id") ;

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_copy (			")
			.query("   :STOR "       , hq			 )  // 본사코드
			.query(" , :invc_numb "  , invc_numb	 )  // Invoice 번호
			.query(" , :amnd_degr "  , amnd_degr	 )  // Invoice 번호
			.query(" , :deli_date "  , deli_date	 )  // 납기일자
			.query(" , :logn_id " 	 , logn_id		)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	//amend 생성
		public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
			SqlResultRow ordrInfo = getOrderInfo(arg);
			if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(arg.getParamText("amnd_degr"))) {
				throw new ServiceException("최종 차수가 아닙니다.");
			}

			DataMessage data;
			String invc_numb	= arg.getParamText("invc_numb") ;
			String amnd_degr	= arg.getParamText("amnd_degr") ;
			String amnd_date	= arg.getParamText("amnd_date") ;
			String drtr_idcd	= arg.getParamText("drtr_idcd") ;
			String amnd_resn	= arg.getParamText("amnd_resn") ;
			String hq			= arg.getParamText("hqof_idcd") ;
			String stor			= arg.getParamText("stor_id");
			String new_amnd_degr= arg.getParamText("new_amnd_degr") ;
			String login_id		= arg.getParamText("login_id") ;

			if (hq.length()		== 0  && stor.length() >= 10 ) {
				hq = stor.substring(0,10) ;
			}
			if (invc_numb.length() == 0) {
				invc_numb = "not defined" ;
			}

			if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
			else                  { data = arg.newStorage("POS");      }
				data.param
				.query("call acpt_amnd (			")
				.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
				.query(" , :amnd_degr "  , amnd_degr	)  //
				.query(" , :amnd_date "  , amnd_date	)  //
				.query(" , :drtr_idcd "  , drtr_idcd	)  //
				.query(" , :amnd_resn "  , amnd_resn	)  //
				.query(" , :new_amnd_degr " , new_amnd_degr	)  //
				.query(" , :login_id " , login_id	)  //
				.query(" ) 							")
			;
			data.attach(Action.direct);
			data.execute();
			return null;
		}


	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String acpt_stat_dvcd  = arg.getParamText("acpt_stat_dvcd");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_ok (						")
			.query("   :STOR			" , hq				)  // 본사코드
			.query(" , :invc_numb		" , invc_numb	 	)  // Invoice 번호
			.query(" , :acpt_stat_dvcd	" , acpt_stat_dvcd	)  // 결재여부
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	/**
	 * 코르텍 엑셀업로드
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */

	public void setExcel(HttpRequestArgument arg, SqlResultRow item , String item_idcd) throws Exception {


		DataMessage data = arg.newStorage("POS");
			data.param
				.query("call fn_seq_gen_v2 (							")
				.query("     :STOR                " ,  arg.fixParameter("stor_id"))
				.query("   , :table               " ,  arg.fixParameter("table_nm"))
				.query("   , :invc_numb           " ,  "not defind"		)
				.query(" ) 												")
			;
			String a = data.selectForRow().getParamText("seq");
			data.clear();
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , a)		//INVOICE번호
				.unique("amnd_degr"        , 1	)	//AMD차수

				.update("bzpl_idcd"        , item.getParameter("bzpl_idcd"))		//사업장ID
				.update("invc_date"        , new SimpleDateFormat("yyyyMMdd").format(new Date(item.getParamText("invc_date"))))		//INVOICE 일자
				.update("deli_date"        , new SimpleDateFormat("yyyyMMdd").format(new Date(item.getParamText("deli_date2"))))		//납기일자
				.update("cstm_idcd"        , "462")		//거래처ID
				.update("dlvy_cstm_idcd"   , item.getParameter("dlvy_cstm_idcd"))	//납품거래처ID
				.update("dlvy_cstm_idcd"   , item.getParameter("dlvy_cstm_name"))	//납품거래처명
				.update("remk_text"        , item.getParameter("remk_text"))		//비고
				.update("memo"             , item.getParameter("memo"))				//메모
				.update("acpt_stat_dvcd"   , "0011")								//수주상태구분코드
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("cstm_idcd")
											 +" "
											 +new SimpleDateFormat("yyyyMMdd").format(new Date(item.getParamText("invc_date"))))

				.update("sysm_memo"        , item.getParameter("stat"))
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			//단가(invc_pric) = 금액(sply_amnt) / 수량(invc_qntt)
			double invc_pric = 0 ;  //단가
			double invc_qntt = 0 ;  //수량
			double sply_amnt = 0 ;  //공급가액
			double vatx_amnt = 0 ;  //부가세액
			double invc_amnt = 0 ;  //합계금액
			invc_qntt  = Double.parseDouble(item.getParamText("invc_qntt")) ;
			if(!item.getParamText("invc_pric").equals("")){
				invc_pric  = Double.parseDouble(item.getParamText("invc_pric")) ;
			}else{
				data.param
					.query("select  cont_pric 									")
				;
				data.param //쿼리문
					.where("from item_cont										")
					.where("where   item_idcd	=:item_idcd",item.fixParameter("item_idcd"))
					.where("and     cstm_idcd	=:cstm_idcd",item.fixParameter("cstm_idcd"))
				;
				if(data.selectForMap().size()!=0) {
					invc_pric = Double.parseDouble(data.selectForMap().get(0).getParamText("cont_pric"));
				}
				data.clear();
			}

			sply_amnt  = invc_pric * invc_qntt;
			vatx_amnt  = sply_amnt * 0.1;
			invc_amnt  = sply_amnt + vatx_amnt;

			data.param
				.table ("acpt_item")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"        , a)
				.unique("amnd_degr"        , 1	)
				.unique("line_seqn"        , 1	)

				.update("item_idcd"        , item_idcd)								//품목ID
				.update("sply_amnt"        , sply_amnt)								//공급가액
				.update("pcod_numb"        , item.getParameter("pcod_numb"))		//고객발주번호
				.update("deli_date"        , new SimpleDateFormat("yyyyMMdd").format(new Date(item.getParamText("deli_date2"))))		//납기일자
				.update("deli_chge_resn"   , item.getParameter("deli_chge_resn"))	//납기변경사유
				.update("ostt_qntt"        , item.getParameter("ostt_qntt"))		//출고수량
				.update("vatx_amnt"        , vatx_amnt)								//부가세금액
				.update("invc_qntt"        , item.getParameter("invc_qntt"))		//수량
				.update("invc_pric"        , item.getParameter("invc_pric"))		//단가
				.update("invc_amnt"        , invc_amnt)								//합계금액
				.update("cstm_offr_date"   , item.getParameter("cstm_offr_date"))	//고객발주일자
				.update("cstm_deli_date"   , item.getParameter("cstm_deli_date"))	//고객납기일자
				.update("cstm_lott_numb"   , item.getParameter("cstm_lott_numb"))						//고객 LOT 번호
				.update("dlvy_cstm_idcd"   , item.getParameter("dlvy_cstm_idcd"))	//납품거래처ID
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("remk_text"        , item.getParameter("remk_text"))
				.update("line_stat"        , 0	)
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("pdsd_yorn"        , "0")

				.update("sysm_memo"        , item.getParameter("stat"))
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
			.table("acpt_amnd")
			.where("where invc_numb = :invc_numb" )
			.where("and   amnd_degr = :amnd_degr" )

			.unique("invc_numb"			, a)
			.unique("amnd_degr"			, 1)

			.update("amnd_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date(item.getParamText("invc_date"))))
			.update("drtr_idcd"			, item.getParameter("drtr_idcd"))

			.insert("line_levl"			, item.getParameter("line_levl"))
			.update("updt_idcd"			, item.getParameter("updt_idcd"))
			.insert("crte_idcd"			, item.getParameter("crte_idcd"))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.insert);
		data.execute();
		data.clear();
	}

	//품번 엑셀업로드
	public String getItemIdcd(HttpRequestArgument arg, String item_idcd) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id") ;
		String table		= arg.getParamText("table_nm") ;

		data.param
			.query("select  item_idcd 									")
		;
		data.param //쿼리문
			.where("from acpt_item										")
			.where("where     1=1										")
			.where("and     item_code	=:item_idcd",		item_idcd)
		;
		String idcd = "";
		if(data.selectForMap().size()!=0) {
			idcd = data.selectForMap().get(0).getParamText("item_idcd");
		}
		return idcd;
	}

	//코르텍 엑셀업로드시  LOT번호 중복체크
	public String getLottNumb(HttpRequestArgument arg, String cstm_lott_numb) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id") ;
		String table		= arg.getParamText("table_nm") ;

		data.param
			.query("select count(*)  as seq 						")
		;
		data.param //쿼리문
			.where("from acpt_item											")
			.where("where     1=1											")
			.where("and    cstm_lott_numb	=:cstm_lott_numb ",		cstm_lott_numb)
		;

		String a = "";
//		if(data.selectForMap().isEmpty()){
//			data.clear();
//			data.param
//			.query("call fn_seq_gen_v2 (							")
//			.query("     :STOR                " ,  STOR				)
//			.query("   , :table               " ,  table			)
//			.query("   , :invc_numb           " ,  "not defined"	)
//			.query(" ) 												")
//		;
//		}else{
			a = data.selectForMap().get(0).getParamText("seq");
//		}
		System.out.println(a);
		return a;
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
		.query("and     a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query(") a																										")
		;

		return data.selectForMap();
	}

	public SqlResultRow getOrderInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String invc_numb = "";
		String amnd_degr = "";

		if (arg.containsKey("invc_numb")) {
			invc_numb = (String)arg.getParameter("invc_numb");
		} else if (arg.containsKey("records")) {
			invc_numb = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("invc_numb");
		}

		if (arg.containsKey("amnd_degr")) {
			amnd_degr = (String)arg.getParameter("amnd_degr");
		} else if (arg.containsKey("records")) {
			amnd_degr = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("amnd_degr");
		}

		if (StringUtils.isEmpty(invc_numb) || StringUtils.isEmpty(amnd_degr)) {
			throw new ServiceException("수리정보를  확인할 수 없습니다." );
		}

		data.param
			.query("select line_clos")
			.query("     , (select max(amnd_degr) from acpt_mast where invc_numb = a.invc_numb) as max_amnd_degr ")
			.query("from  acpt_mast a							")
		 	.query("where a.invc_numb = :invc_numb", invc_numb)
		 	.query("and   a.amnd_degr = :amnd_degr", amnd_degr)
		;
		return data.selectForRow();
	}

	//이미지
		public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
			SqlResultMap map = new SqlResultMap();
			DataMessage data = arg.newStorage("POS");
			String chk1 = (String)arg.getParameter("chk1");
			String chk2 = (String)arg.getParameter("chk2");
			byte[] returnByte =null;
			byte[] returnByte2 =null;
			ByteArrayOutputStream baos =  new ByteArrayOutputStream();
			ByteArrayOutputStream baos2 =  new ByteArrayOutputStream();
			CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.

			ByteArrayInputStream thumnailInputStream = null;
			ByteArrayInputStream thumnailInputStream2 = null;
			// 이미지일 경우 섬네일 과정을 거친다.

			for (int i = 0; i < file.length; i++) {
				System.out.println("***************file:"+file[i].getFileItem().getName());
			}

			if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
			}else{
				Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
				thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
			}
			if(file[1].getFileItem().getName()==null||file[1].getFileItem().getName()==""){
			}else{
				Thumbnails.of(file[1].getInputStream()).size(240, 180).toOutputStream(baos2);
				thumnailInputStream2 = new ByteArrayInputStream(baos2.toByteArray());
			}
			int readCount = 0;
			int readCount2 = 0;
			try{
				if(chk1.equals("0")){
					data.param
						.query("update acpt_item					")
						.query("       set item_imge = null			")
						.query("       where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
						.query("         and amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
						.query("         and line_seqn = :line_seqn", arg.getParameter("line_seqn"))
					;data.attach(Action.direct);
					data.execute();
					data.clear();
				}else if(chk1.equals("1")){
					byte[] buf = new byte[1024];
					while ((readCount = thumnailInputStream.read(buf))>0) {
						 baos.write(buf,0,readCount);
					}
					returnByte = baos.toByteArray();

					data.param
						.table("acpt_item")
						.where("where invc_numb	= :invc_numb" )
						.where("  and amnd_degr	= :amnd_degr" )
						.where("  and line_seqn	= :line_seqn" )

						.unique("invc_numb"				, arg.getParameter("invc_numb"))
						.unique("amnd_degr"				, arg.getParameter("amnd_degr"))
						.unique("line_seqn"				, arg.getParameter("line_seqn"))

						.update("item_imge",returnByte)
					;data.attach(Action.update);
					data.execute();
					data.clear();
				// logic 처리 ( DB등 )
				}
				if(chk2.equals("0")){
					data.param
						.query("update acpt_item					")
						.query("       set item_imge2 = null		")
						.query("       where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
						.query("         and amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
						.query("         and line_seqn = :line_seqn", arg.getParameter("line_seqn"))
					;data.attach(Action.direct);
					data.execute();
					data.clear();
				}else if(chk2.equals("1")){
					byte[] buf2 = new byte[1024];
					System.out.println(buf2);
					while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
						 baos2.write(buf2,0,readCount2);
					}
					returnByte2 = baos2.toByteArray();

					data.param
						.table("acpt_item")
						.where("where invc_numb	= :invc_numb" )
						.where("  and amnd_degr	= :amnd_degr" )
						.where("  and line_seqn	= :line_seqn" )

						.unique("invc_numb"				, arg.getParameter("invc_numb"))
						.unique("amnd_degr"				, arg.getParameter("amnd_degr"))
						.unique("line_seqn"				, arg.getParameter("line_seqn"))

						.update("item_imge2",returnByte2)
					;data.attach(Action.update);
					data.execute();
					data.clear();
				// logic 처리 ( DB등 )
				}
			} catch(Exception ex) {
				throw ex;
			} finally {
				if(baos != null) baos.close();
				if(thumnailInputStream != null) thumnailInputStream.close();
				if(thumnailInputStream2 != null) thumnailInputStream2.close();
			}

			return map;
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

	}