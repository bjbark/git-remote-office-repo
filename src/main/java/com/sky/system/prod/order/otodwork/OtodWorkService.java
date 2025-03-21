package com.sky.system.prod.order.otodwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service
public class OtodWorkService extends DefaultServiceHandler {

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
			.where("		, a.crte_idcd       , a.crte_urif       , a.stot_dvcd											")
			.where("		, c.cstm_name       , c.cstm_code       , d.user_name         , a.mtrl_ostt_date				")
			.where("		, (select sum(offr_qntt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_qntt	")
			.where("		, (select sum(offr_amnt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_amnt	")
			.where("		, (select sum(offr_vatx) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_vatx	")
			.where("		, (select sum(ttsm_amnt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as ttsm_amnt	")
			.where("		, (select min(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.where("		, (select max(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.where("from    purc_ordr_mast a																				")
			.where("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd									")
			.where("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd									")
			.where("where   1=1																								")
			.where("and     a.offr_dvcd = 3000																				")
			.where("and     c.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("and     p.orig_invc_numb =  :pdod_numb" , arg.getParamText("pdod_numb"  ))
			.where("and     a.drtr_idcd   = :drtr_idcd    " , arg.getParamText("drtr_idcd" ) , !"".equals(arg.getParamText("drtr_idcd")))
			.where("and     a.cstm_idcd   = :cstm_idcd    " , arg.getParamText("cstm_idcd" ) , !"".equals(arg.getParamText("cstm_idcd")))
			.where("and     a.line_clos   = :line_clos    " , arg.getParamText("line_clos" ) , !"3".equals(arg.getParamText("line_clos" )))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     (select r.item_idcd from purc_ordr_item r where a.invc_numb = r.invc_numb and r.item_idcd = :item_idcd)" , arg.getParamText("item_idcd" ))
			.where("and     (select min(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) >= :deli1_date" , arg.getParamText("deli1_date" ))
			.where("and     (select max(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) <= :deli2_date" , arg.getParamText("deli2_date" ))
			.where("order by a.invc_numb																					")
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
		if(!arg.getParamText("mes_type").toUpperCase().equals("FRAME")){
			data.param
				.query("select    a.invc_numb       , a.amnd_degr       , a.line_seqn      , a.item_idcd		")
				.query("		, a.unit_idcd       , a.cstm_idcd       , a.make_cmpy_name , a.offr_qntt		")
				.query("		, a.offr_pric       , a.vatx_incl_yorn  , a.vatx_rate      , a.offr_amnt		")
				.query("		, a.offr_vatx       , a.ttsm_amnt       , a.deli_reqt_date , a.deli_date 		")
				.query("		, a.pric_dvcd       , a.fund_dvcd       , a.dlvy_date      , a.dlvy_time		")
				.query("		, a.send_deli_date  , a.dlvy_wrhs_idcd  , a.krwn_pric      , a.krwn_amnt		")
				.query("		, a.krwn_vatx       , a.krwn_amnt_totl  , a.insd_remk_text , a.otsd_remk_text	")
				.query("		, a.stnd_unit       , a.orig_invc_numb  , a.orig_amnd_degr , a.orig_amnd_degr	")
				.query("		, a.orig_seqn       , ifnull(a.dlvy_qntt,0) as dlvy_qntt						")
				.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
				.query("		, a.line_ordr       , a.line_stat       , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
				.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
				.query("		, a.crte_idcd       , a.crte_urif												")
				.query("		, i.item_code       , i.item_name       , a.item_spec      , i.unit_idcd		")
				.query("		, u.unit_name       , m2.invc_date as mtrl_istt_date							")
			;
			data.param
				.where("from   purc_ordr_item a																	")
				.where("       left outer join purc_istt_item m  on a.invc_numb = m.orig_invc_numb and a.line_seqn = m.orig_seqn	")
				.where("       left outer join purc_istt_mast m2 on m.invc_numb = m.invc_numb									")
				.where("       left outer join item_mast i       on a.item_idcd = i.item_idcd					")
				.where("       left outer join unit_mast u       on i.unit_idcd = u.unit_code					")
				.where("where  1=1																				")
				.query("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
				.where("and    a.invc_numb	      = :invc_numb  "	, arg.getParamText("invc_numb"))
				.where("and    a.line_stat        = :line_stat1 "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
				.where("and    a.line_stat   < :line_stat       "	, "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_numb																	")
			;
		}else{
			data.param
				.query("select    a.invc_numb       , a.amnd_degr       , a.line_seqn      , a.item_idcd		")
				.query("		, a.unit_idcd       , a.cstm_idcd       , a.make_cmpy_name , a.offr_qntt		")
				.query("		, a.offr_pric       , a.vatx_incl_yorn  , a.vatx_rate      , a.offr_amnt		")
				.query("		, a.offr_vatx       , a.ttsm_amnt       , a.deli_reqt_date , a.deli_date 		")
				.query("		, a.pric_dvcd       , a.fund_dvcd       , a.dlvy_date      , a.dlvy_time		")
				.query("		, a.send_deli_date  , a.dlvy_wrhs_idcd  , a.krwn_pric      , a.krwn_amnt		")
				.query("		, a.krwn_vatx       , a.krwn_amnt_totl  , a.insd_remk_text , a.otsd_remk_text	")
				.query("		, a.stnd_unit       , a.orig_invc_numb  , a.orig_amnd_degr , a.orig_amnd_degr	")
				.query("		, a.orig_seqn       , ifnull(a.dlvy_qntt,0) as dlvy_qntt						")
				.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
				.query("		, a.line_ordr       , a.line_stat       , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
				.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
				.query("		, a.crte_idcd       , a.crte_urif												")
				.query("		, i.item_code       , i.item_name       , a.item_spec      , i.unit_idcd		")
				.query("		, u.unit_name       , w.wkct_name       , p.wkct_idcd							")
				.query("		, m2.invc_date as mtrl_istt_date        , i2.item_name as orig_item_name		")
				.query("		, b2.dlvy_cstm_name , m.istt_qntt												")
			;
			data.param
				.where("from   purc_ordr_item a																	")
				.where("       left outer join (select invc_numb,orig_invc_numb,orig_seqn, sum(istt_qntt) as istt_qntt ")
				.where("                        from purc_istt_item	")
				.where("                        group by orig_invc_numb,orig_seqn								")
				.where("                       ) m  on a.invc_numb = m.orig_invc_numb and a.line_seqn = m.orig_seqn	")
				.where("       left outer join purc_istt_mast m2 on m.invc_numb = m2.invc_numb					")
				.where("       left outer join pror_item p on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn")
				.where("       left outer join wkct_mast w on p.wkct_idcd = w.wkct_idcd							")
				.where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
				.where("       left outer join unit_mast u on i.unit_idcd = u.unit_code							")
				.where("       left outer join pror_mast pm on p.invc_numb  = pm.invc_numb						")
				.where("       left outer join acpt_item b on pm.acpt_numb = b.invc_numb						")
				.where("       left outer join acpt_mast b2 on b.invc_numb = b2.invc_numb						")
				.where("       left outer join item_mast i2 on b.item_idcd = i2.item_idcd						")
				.where("where  1=1																				")
				.where("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
				.where("and    a.invc_numb	      = :invc_numb  "	, arg.getParamText("invc_numb"))
				.where("and    a.line_stat        = :line_stat1 "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
				.where("and    a.line_stat   < :line_stat       "	, "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_numb																	")
			;
		}
		return data.selectForMap();
	}


	//외주작업지시 발주등록 서치
	public SqlResultMap getInvoice2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		if(!arg.getParamText("mes_type").toUpperCase().equals("FRAME")){
			data.param
				.query("select  a.invc_numb as orig_invc_numb          , a.line_seqn as orig_seqn, a.work_strt_dttm		")
				.query("      , a.user_memo        , a.sysm_memo       , a.prnt_idcd             , a.line_levl			")
				.query("      , a.line_ordr        , a.line_stat       , a.line_clos             , a.find_name			")
				.query("      , a.updt_user_name   , a.updt_ipad       , a.updt_dttm             , a.updt_idcd			")
				.query("      , i.item_idcd        , i.item_name       , i.item_spec             , u.unit_name			")
				.query("      , a.updt_urif        , a.crte_user_name  , a.crte_ipad             , a.crte_dttm			")
				.query("      , a.crte_idcd        , a.crte_urif       , a.indn_qntt as need_qntt, i.item_code			")
				.query("      , b.cstm_idcd        , c.cstm_name       , a.otod_yorn        , a.unit_idcd				")
				.query("      ,( select abs(a.indn_qntt-ifnull(sum(p.offr_qntt),0))										")
				.query("         from purc_ordr_item p 																	")
				.query("         where a.invc_numb = p.orig_invc_numb and a.line_seqn = p.orig_seqn						")
				.query("      ) as offr_baln_qntt																		")
				.query("from    pror_item a																				")
				.query("       left outer join pror_mast b on a.invc_numb       = b.invc_numb							")
				.query("       left outer join cstm_mast c on b.cstm_idcd       = c.cstm_idcd							")
				.query("       left outer join item_mast i on a.item_idcd       = i.item_idcd							")
				.query("       left outer join unit_mast u on i.unit_idcd       = u.unit_idcd							")
				.query("where   1=1																						")
				.query("and   b.cstm_idcd        =  :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
				.query("and   a.otod_yorn        =  :otod_yorn		" , "1" )
				.query("and   c.otod_cstm_yorn    = :otod_cstm_yorn	" , "1" )
				.query("and   a.prog_stat_dvcd   =  :prog_stat_dvcd	" , "0" )
				.query("and   a.line_stat        <  :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			;
		}else{
			data.param
				.query("select  b2.invc_numb as orig_invc_numb         , a.line_seqn as orig_seqn, a.work_strt_dttm		")
				.query("      , m.acpt_numb        , m.acpt_seqn       , i.item_name             , i.item_code			")
				.query("      , a.user_memo        , a.sysm_memo       , a.prnt_idcd             , a.line_levl			")
				.query("      , a.line_ordr        , a.line_stat       , a.line_clos             , a.find_name			")
				.query("      , a.updt_user_name   , a.updt_ipad       , a.updt_dttm             , a.updt_idcd			")
				.query("      , i.item_idcd        , t.cstm_idcd       , i.item_spec             , a.wkct_idcd			")
				.query("      , a.updt_urif        , a.crte_user_name  , a.crte_ipad             , a.crte_dttm			")
				.query("      , a.crte_idcd        , a.crte_urif       , a.indn_qntt as need_qntt						")
				.query("      , t.cstm_name        , a.otod_yorn       , a.unit_idcd									")
				.query("      , w.wkct_name as wkct_name               , i2.item_name  as orig_item_name				")
				.query("from    pror_item a																				")
				.query("       left outer join wkct_mast w on a.wkct_idcd  = w.wkct_idcd								")
				.query("       left outer join pror_mast m on a.invc_numb  = m.invc_numb								")
				.query("       left outer join acpt_item b2 on m.acpt_numb = b2.invc_numb 								")
				.query("       left outer join cstm_mast t on a.otod_cstm_idcd = t.cstm_idcd							")
				.query("       left outer join item_mast i on a.item_idcd  = i.item_idcd								")
				.query("       left outer join item_mast i2 on b2.item_idcd  = i2.item_idcd								")
				.query("       left outer join work_book wb on wb.wkod_numb = a.invc_numb								")
				.query("                                  and wb.wkod_seqn  = (a.line_seqn - 1)							")
				.query("                                  and wb.prog_stat_dvcd    = 3									")
				.query("where   1=1																						")
				.query("and   t.cstm_idcd        = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
				.query("and   a.otod_yorn        = :otod_yorn		" , "1" )
				.query("and   t.otod_cstm_yorn   = :otod_cstm_yorn	" , "1" )
//				.query("and   b2.pdsd_yorn       = :pdsd_yorn		" , "1" )
				.query("and   (a.indn_qntt - (select ifnull(sum(b.offr_qntt),0) from purc_ordr_mast r ")
				.query("       left outer join purc_ordr_item b on r.invc_numb = b.invc_numb ")
				.query("       where r.offr_dvcd = '3000'")
				.query("       and   b.orig_invc_numb = a.invc_numb")
				.query("       and   b.orig_seqn = a.line_seqn")
				.query("       and   r.line_stat < 2")
				.query("      )) > 0")
				.query("and   a.line_stat        <  :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			;
			if(arg.getParamText("hq_id").toUpperCase().equals("N1000HJSYS")){
				data.param
					.query("and   wb.invc_numb is not null																	")
				;
			}
		}
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			if(!arg.getParamText("mes_type").toUpperCase().equals("FRAME")){
				data.param
					.query("select  a.invc_numb as orig_invc_numb          , a.line_seqn as orig_seqn, a.work_strt_dttm		")
					.query("      , a.user_memo        , a.sysm_memo       , a.prnt_idcd             , a.line_levl			")
					.query("      , a.line_ordr        , a.line_stat       , a.line_clos             , a.find_name			")
					.query("      , a.updt_user_name   , a.updt_ipad       , a.updt_dttm             , a.updt_idcd			")
					.query("      , i.item_idcd        , i.item_name       , i.item_spec             , u.unit_name			")
					.query("      , a.updt_urif        , a.crte_user_name  , a.crte_ipad             , a.crte_dttm			")
					.query("      , a.crte_idcd        , a.crte_urif       , a.indn_qntt as need_qntt, i.item_code			")
					.query("      , b.cstm_idcd        , c.cstm_name       , a.otod_yorn        , a.unit_idcd				")
					.query("      ,( select abs(a.indn_qntt-ifnull(sum(p.offr_qntt),0))										")
					.query("         from purc_ordr_item p 																	")
					.query("         where a.invc_numb = p.orig_invc_numb and a.line_seqn = p.orig_seqn						")
					.query("      ) as offr_baln_qntt																		")
					.query("from    pror_item a																				")
					.query("       left outer join pror_mast b on a.invc_numb      = b.invc_numb							")
					.query("       left outer join cstm_mast c on b.cstm_idcd      = c.cstm_idcd							")
					.query("       left outer join item_mast i on a.item_idcd      = i.item_idcd							")
					.query("       left outer join unit_mast u on i.unit_idcd      = u.unit_idcd							")
					.query("where   1=1																						")
					.query("and   b.cstm_idcd        =  :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
					.query("and   a.otod_yorn        =  :otod_yorn		" , "1" )
					.query("and   a.prog_stat_dvcd   =  :prog_stat_dvcd	" , "0" )
					.query("and   c.otod_cstm_yorn    = :otod_cstm_yorn	" , "1" )
					.query("and   a.line_stat        <  :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
				;
			}else{
				data.param
					.query("select  b2.invc_numb       , a.line_seqn as orig_seqn        , a.work_strt_dttm					")
					.query("      , m.acpt_numb        , m.acpt_seqn       , i.item_name , w.wkct_name as wkct_name			")
					.query("      , a.user_memo        , a.sysm_memo       , a.prnt_idcd             , a.line_levl			")
					.query("      , a.line_ordr        , a.line_stat       , a.line_clos             , a.find_name			")
					.query("      , a.updt_user_name   , a.updt_ipad       , a.updt_dttm             , a.updt_idcd			")
					.query("      , i.item_idcd        , t.cstm_idcd       , i.item_spec									")
					.query("      , a.updt_urif        , a.crte_user_name  , a.crte_ipad             , a.crte_dttm			")
					.query("      , a.crte_idcd        , a.crte_urif       , a.indn_qntt as need_qntt  , i.item_code		")
					.query("      , t.cstm_name        , a.otod_yorn       , a.unit_idcd									")
					.query("      , (a.indn_qntt-r.offr_qntt) as offr_baln_qntt , i2.item_name as orig_item_name			")
					.query("      , b.deli_date        , b.dlvy_cstm_name  , a.invc_numb as orig_invc_numb					")
					.query("from    pror_item a																				")
					.query("       left outer join wkct_mast w on a.wkct_idcd  = w.wkct_idcd								")
					.query("       left outer join pror_mast m on a.invc_numb  = m.invc_numb								")
					.query("       left outer join acpt_item b2 on m.acpt_numb = b2.invc_numb 								")
					.query("       left outer join acpt_mast b on b2.invc_numb = b.invc_numb								")
					.query("       left outer join cstm_mast t on a.otod_cstm_idcd = t.cstm_idcd							")
					.query("       left outer join item_mast i on a.item_idcd  = i.item_idcd								")
					.query("       left outer join item_mast i2 on b2.item_idcd  = i2.item_idcd								")
					.query("       left outer join work_book wb on wb.wkod_numb = a.invc_numb								")
					.query("                                  and wb.wkod_seqn  = (a.line_seqn - 1)							")
					.query("                                  and wb.prog_stat_dvcd    = 3									")
					.query("       left outer join ( select ifnull(sum(b.offr_qntt),0) as offr_qntt, b.orig_invc_numb,b.orig_seqn		")
					.query("                         from purc_ordr_mast r 													")
					.query("                         left outer join purc_ordr_item b on r.invc_numb = b.invc_numb 			")
					.query("                         where r.offr_dvcd = '3000'												")
					.query("                         and   r.line_stat < 2													")
					.query("                         group by orig_invc_numb,orig_seqn										")
					.query("                       ) r on r.orig_invc_numb = a.invc_numb and r.orig_seqn = a.line_seqn		")
					.query("where   1=1																						")

					.query("and   t.cstm_idcd        = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
					.query("and   a.otod_yorn        = :otod_yorn		" , "1" )
					.query("and   t.otod_cstm_yorn   = :otod_cstm_yorn	" , "1" )
//					.query("and   b2.pdsd_yorn       = :pdsd_yorn		" , "1" )
					.query("and   (a.indn_qntt - ifnull(r.offr_qntt,0)) > 0		")
					.query("and   a.line_stat        <  :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
				;
				if(arg.getParamText("hq_id").toUpperCase().equals("N1000HJSYS")){
					data.param
						.query("and   wb.invc_numb is not null																	")
					;
				}
			}
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}


	//외주 작업지시 발주등록 저장 (Invoice master)
	public SqlResultMap setInvoice2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				//master 등록/수정
				data.param
					.table("purc_ordr_mast"											)
					.where("where invc_numb = :invc_numb							")	//invoice번호

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))

					.update("offr_dvcd"			, "3000")								//발주구분코드
					.update("amnd_degr"			, row.getParameter("acpt_amnd_degr"	))	//차수
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
					.update("invc_date"			, row.getParameter("invc_date"		))	//invoice일자 (발주일자)
					.update("deli_date"			, row.getParameter("max_deli"		))	//납기일자
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
					.update("remk_text"			, row.getParameter("remk_text"		))	//비고
					.update("user_memo"			, row.getParameter("user_memo"		))	//사용자메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"		))	//상위 ID
					.update("line_ordr"			, row.getParameter("line_ordr"		))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"		))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"		))	//마감여부
					.update("find_name"			, row.getParamText("cstm_name"		).trim()
												+ " "
												+ row.getParamText("cstm_idcd"		).trim())
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(Action.insert);
//				if(rowaction == Action.update){
//					data.param
//						.query("update purc_ordr_item a , purc_ordr_mast b 							")
//						.query("set a.prnt_idcd = b.prnt_idcd										")
//						.query("where a.invc_numb = b.invc_numb										")
//						.query("and   a.invc_numb = :invc_numb", row.fixParameter("new_invc_numb"	))
//					;
//					data.attach(Action.direct);
//				}
				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
		}
		data.execute();

	return null;
	}


	//invoice detail 등록/수정/삭제
	@SuppressWarnings("deprecation")
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		String deli_date="";

		for(SqlResultRow row:map) {
			int offr_baln_qntt = Integer.parseInt(row.getParamText("offr_baln_qntt"));
			int offr_qntt = Integer.parseInt(row.getParamText("offr_qntt"));


			deli_date = row.getParamText("deli_date");
			if(deli_date.matches("^[0-9]+$")){
			}else{
				deli_date = df.format(new Date(row.getParamText("deli_date")));
			}
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("purc_ordr_item"												)
					.where("where invc_numb		= :invc_numb							")		//invoic순번
					.where("and   amnd_degr		= :acpt_amnd_degr						")		//amd차수
					.where("and   line_seqn		= :line_seqn							")		//invoic순번

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))
					.unique("amnd_degr"			, row.fixParameter("acpt_amnd_degr"		))
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))

				;data.attach(rowaction);

			} else {
				data.param
					.table("purc_ordr_item"											)
					.where("where invc_numb = :invc_numb							")		//invoice번호
					.where("and   line_seqn = :line_seqn							")		//invoice순번

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"	))

					.update("amnd_degr"			, row.getParameter("acpt_amnd_degr"	))		//차수
					.update("item_idcd"			, row.getParameter("item_idcd"		))		//품목ID
					.update("item_spec"			, row.getParameter("item_spec"		))		//품목규격
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처 ID
					.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
					.update("offr_qntt"			, row.getParameter("offr_qntt"		))		//발주수량
					.update("offr_pric"			, row.getParameter("offr_pric"		))		//발주단가
					.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
					.update("offr_amnt"			, row.getParameter("offr_amnt"		))		//발주금액
					.update("offr_vatx"			, row.getParameter("offr_vatx"		))		//발주부가세
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//합계금액
					.update("deli_date"			, deli_date							)		//납기일자
					.update("invc_date"			, row.getParameter("invc_date"		))		//발주일자
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"	))		//원 invoice numb
					.update("orig_seqn"			, row.getParameter("orig_seqn"		))		//원 seqn
					.update("prnt_idcd"			, mst.getParameter("remk_text"		))
					.update("user_memo"			, row.getParameter("user_memo"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(Action.insert);
			}
			data.execute();
			data.clear();

			if(offr_baln_qntt-offr_qntt == 0){
				data.param
					.table("pror_item")
					.where("where invc_numb = :orig_invc_numb1							")		//invoice번호
					.where("and   line_seqn = :orig_seqn1								")		//invoice순번

					.unique("orig_invc_numb1"		, row.fixParameter("orig_invc_numb"	))
					.unique("orig_seqn1"			, row.fixParameter("orig_seqn"		))
					.update("prog_stat_dvcd"		, "1"								)
				;
				data.attach(Action.update);
			}
		}
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
		data.param
		.query("call auto_item_rcpt (			")
		.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
		.query(" , :auto_insp "  , "Y"			)  // 자동 합격처리 여부
		.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		if(arg.getParamText("mes_type").toUpperCase().equals("FRAME")){
			data.param
				.query("call auto_item_rcpt_book (		")
				.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
				.query(" , :wker_idcd "  , arg.fixParameter("wker_idcd"))  //
				.query(" ) 								")
			;
			data.attach(Action.direct);
			data.execute();
		}
		return null;
	}
	public SqlResultMap setIstt_part(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_item_rcpt_part (			")
			.query("   :invc_numb, "  , arg.fixParamText("invc_numb")	)  // Invoice 번호
			.query("   :line_seqn, "  , arg.fixParameter("line_seqn")	)  // Invoice 번호
			.query("   :auto_insp, "  , "Y"			)  // 자동 합격처리 여부
			.query("   :qntt       "  , arg.fixParameter("qntt")		)  // 자동 합격처리 여부
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		if(arg.getParamText("chk").equals("0")){
			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb							")		//invoice번호

				.unique("invc_numb"			, arg.fixParameter("new_invc_numb"	))

				.update("wkod_numb"			, arg.getParameter("orig_invc_numb"	))
				.update("wkod_seqn"			, arg.getParameter("orig_seqn"		))
				.update("invc_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
				.update("item_idcd"			, arg.getParameter("item_idcd"		))
				.update("indn_qntt"			, arg.getParameter("offr_qntt"		))
				.update("wkct_idcd"			, arg.getParameter("wkct_idcd"		))
				.update("work_strt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("good_qntt"			, arg.getParameter("qntt"		))
				.update("prog_stat_dvcd"	, "2")
				.update("wker_idcd"			, arg.getParameter("wker_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
		}else{
			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb							")		//invoice번호

				.unique("invc_numb"			, arg.fixParameter("new_invc_numb"	))

				.update("wkod_numb"			, arg.getParameter("orig_invc_numb"	))
				.update("wkod_seqn"			, arg.getParameter("orig_seqn"		))
				.update("invc_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
				.update("item_idcd"			, arg.getParameter("item_idcd"		))
				.update("indn_qntt"			, arg.getParameter("offr_qntt"		))
				.update("wkct_idcd"			, arg.getParameter("wkct_idcd"		))
				.update("work_strt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("good_qntt"			, arg.getParameter("qntt"		))
				.update("prog_stat_dvcd"	, "3")
				.update("wker_idcd"			, arg.getParameter("wker_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
		}
		return null;
	}
	public SqlResultMap setOstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("purc_ordr_mast")
			.where("where invc_numb = :invc_numb							")		//invoice번호

			.unique("invc_numb"			, arg.fixParameter("invc_numb"	))

			.update("mtrl_ostt_date"	, arg.getParameter("mtrl_ostt_date"	))

			.update("updt_idcd"			, arg.getParameter("updt_idcd"		))
			.update("updt_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("purc_ordr_mast"												)
			.where("where invc_numb		= :invc_numb							")		//invoic순번

			.unique("invc_numb"			, arg.fixParameter("invc_numb"		))

			.update("line_stat"			, "2")

			.update("updt_idcd"			, arg.getParameter("updt_idcd"		))
			.update("updt_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("purc_ordr_item"												)
			.where("where invc_numb		= :invc_numb							")		//invoic순번

			.unique("invc_numb"			, arg.fixParameter("invc_numb"		))

			.update("line_stat"			, "2")

			.update("updt_idcd"			, arg.getParameter("updt_idcd"		))
			.update("updt_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		return null;
	}


}

