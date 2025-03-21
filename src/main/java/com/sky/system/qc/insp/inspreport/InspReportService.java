package com.sky.system.qc.insp.inspreport;

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
import com.sky.listener.SeqListenerService;


@Service
public class InspReportService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	/**
	 * 수입검사 조회
	 */
	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String qry = arg.getParamText("query"); /* entry(검사성적을 입력하기 위해 조회)  or query(등록된 검사성적 조회)  */
		if (qry.length() == 0 ) {
			qry	= "entry";
		}


		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select																								")
			.where("        a.invc_numb      , a.invc_date      , a.bzpl_idcd     , a.istt_wrhs_idcd , a.coun_iout_dvcd	")
			.where("      , a.cstm_idcd      , a.drtr_idcd      , a.dept_idcd     , a.remk_text      , p.item_idcd		")
			.where("      , bz.bzpl_name																				")
			.where("      , w.wrhs_name     as istt_wrhs_name															")
			.where("      , c.cstm_name																					")
			.where("      , u.user_name     as drtr_name																")
			.where("      , d.dept_name																					")
			.where("      , a.istt_qntt      , a.istt_vatx      , a.istt_amnt     , a.ttsm_amnt							")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd     , a.line_levl      , a.line_ordr		")
			.where("      , a.line_stat      , a.line_clos      , a.find_name											")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm     , a.updt_idcd      , a.updt_urif		")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm     , a.crte_idcd      , a.crte_urif		")
			.where("      , p.insp_qntt      , p.pass_qntt      , p.poor_qntt     , p.judt_dvcd      , p.orig_invc_numb	")
			.where("      , p.insp_date      , p.orig_seqn																")
			.where("      , i.item_code      , i.item_name      , i.item_spec											")
			.where("      , ic.insp_sbsc_name																			")
			.where("from    purc_insp insp																				")
			.where("left outer join purc_istt_mast a on	insp.orig_invc_numb = a.invc_numb								")
			.where("left outer join bzpl_mast bz on a.bzpl_idcd      = bz.bzpl_idcd										")
			.where("left outer join wrhs_mast w  on a.istt_wrhs_idcd = w.wrhs_idcd										")
			.where("left outer join user_mast u  on a.drtr_idcd      = u.user_idcd										")
			.where("left outer join cstm_mast c  on a.cstm_idcd      = c.cstm_idcd										")
			.where("left outer join dept_mast d  on a.dept_idcd      = d.dept_idcd										")
			.where("left outer join purc_istt_item p  on insp.orig_invc_numb = p.invc_numb and p.line_seqn = insp.orig_seqn		")
			.where("left outer join item_mast i  on p.item_idcd = i.item_idcd											")
			.where("left outer join insp_cond ic on insp.insp_type_idcd = ic.insp_type_idcd and insp.line_seqn = ic.line_seqn	")
			.where("where  1=1																							")
			.where("and    a.drtr_idcd  = :insp_drtr_idcd		" , arg.getParamText("insp_drtr_idcd" ))
			.where("and    a.invc_date between :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("                   and     :to_dt			" , arg.getParamText("to_dt" ))
			.where("and    a.drtr_idcd       = :drtr_idcd		" , arg.getParamText("drtr_idcd " ))
			.where("and    a.find_name   like %:find_name%		" , arg.getParamText("find_name") )
			.where("and    a.line_stat       = :line_stat1		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("and    p.istt_insp_yorn  = :insp_gbn        " , "1" , "query".equals(arg.getParamText("query")) )
			.where("and    p.istt_insp_yorn  = :insp_gbn        " , "0" , "entry".equals(arg.getParamText("query")) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 공정검사 조회
	 */
	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select	*																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.wkct_insp_dvcd   , a.invc_numb        , a.line_seqn								")
			.where("    , f.cstm_idcd        , a.wkct_idcd        , a.wkct_item_idcd						")
			.where("    , a.acpt_numb        , a.acpt_seqn        , a.pdsd_numb        , a.wkod_numb		")
			.where("    , a.lott_numb        , a.sral_strt_numb   , a.dlvy_idcd        , a.dlvy_seqn		")
			.where("    , a.cnfm_dept_idcd   , a.cnfm_drtr_idcd   , a.insp_mthd_dvcd   , a.indn_qntt		")
			.where("    , a.prod_qntt        , a.insp_qntt        , a.good_qntt								")
			.where("    , a.poor_qntt        , a.pass_qntt        , a.poor_caus_bacd   , a.poor_type_bacd	")
			.where("    , (select base_name from base_mast r where a.poor_type_bacd = r.base_code			")
			.where("                                         and   r.prnt_idcd = '6000') as poor_type_name	")
			.where("    , (select base_name from base_mast r where a.poor_caus_bacd = r.base_code			")
			.where("                                         and   r.prnt_idcd = '6001') as poor_caus_name	")
			.where("    , a.insp_scre_numb   , a.smpl_numb        , a.istt_yorn        , a.disp_seqn		")
			.where("    , b.wkct_code        , b.wkct_name        , a.uper_seqn        , a.insp_cvic_idcd	")
			.where("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd	       , a.crte_urif		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.where("    , c.user_name        , a.judt_dvcd        , a.smli_dvcd        , a.insp_date		")
			.where("    , a.insp_strt_time   , a.insp_endd_time   , d.cvic_name        						")
			.where("    , f.pdod_date        , h.cstm_name        , g.item_name								")
			.where("    , g.item_spec        , (a.indn_qntt - a.prod_qntt) as prod_balan					")
			.where("    , @curRank := @curRank + 1 AS rank													")
			.where("    , a.msmt_valu_1fst   , a.msmt_valu_2snd												")
		;
		if("N1000KOMEC".equals(arg.hq.toUpperCase())){
			data.param
			.where("    , ic.insp_sbsc_name  , ic.remk_text        , f.lott_numb as lott_numb2				")
			;
		}
		data.param
			.where("from wkct_insp a																		")
			.where("        left outer join wkct_mast b on a.wkct_idcd = b.wkct_idcd						")
			.where("        left outer join user_mast c on a.cnfm_drtr_idcd = c.user_idcd					")
			.where("        left outer join cvic_mast d on a.insp_cvic_idcd = d.cvic_idcd					")
//			.where("        left outer join work_book e on a.invc_numb = e.invc_numb						")
			.where("        left outer join pror_mast f on a.wkod_numb = f.invc_numb						")
			.where("        left outer join item_mast g on f.item_idcd = g.item_idcd						")
			.where("        left outer join cstm_mast h on f.cstm_idcd = h.cstm_idcd						")
		;
		if("N1000KOMEC".equals(arg.hq.toUpperCase())){
			data.param
				.where("    left outer join work_book_cast wc on a.wkct_idcd = wc.wkct_idcd and a.wkod_numb= wc.invc_numb and a.line_seqn = wc.line_seqn	")
				.where("    left outer join insp_cond      ic on ic.insp_type_idcd = wc.insp_type_idcd and ic.line_seqn = wc.line_seqn						")
			;
		}
		data.param
			.where("        ,(SELECT @curRank := 0) r														")
			.where("where   1=1																				")
			.where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"						))
			.where("and    a.insp_date between :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("                   and     :to_dt			" , arg.getParamText("to_dt" ))
			.where("and     a.line_stat   < :line_stat      " , "2"											 )
			.where("order by a.line_seqn)a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 출하검사 조회
	 */
	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select	*																			")
		;
		data.param
			.where("from (																				")
			.where("select  a.invc_numb      , a.bzpl_idcd       , a.invc_date      , a.spts_numb		")
			.where("      , a.spts_seqn      , i.item_name       , i.item_spec							")
			.where("      , a.spts_date      , a.spts_dept_idcd  , a.spts_drtr_idcd , a.item_idcd		")
			.where("      , a.unit_idcd      , a.spts_qntt       , a.deli_date      , a.wrhs_idcd		")
			.where("      , a.cstm_idcd      , a.insp_drtr_idcd  , a.pass_qntt      , a.poor_qntt		")
			.where("      , a.remk_text      , c.cstm_name       , b.wrhs_name      , a.judt_dvcd		")
			.where("      , a.insp_qntt      , u.user_name as insp_drtr_name							")
			.where("      , ic.insp_sbsc_name															")
			;
		data.param
			.where("from    ostt_insp a 																")
			.where("        left outer join user_mast u  on a.spts_drtr_idcd = u.user_idcd				")
			.where("        left outer join item_mast i  on a.item_idcd = i.item_idcd					")
			.where("        left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd					")
			.where("        left outer join wrhs_mast b  on a.wrhs_idcd = b.wrhs_idcd					")
			.where("        left outer join insp_cond ic on a.insp_type_idcd = ic.insp_type_idcd and a.line_seqn = ic.line_seqn	")
			.where("where   1=1																			")
			.where("and     a.invc_numb	=:invc_numb					" , arg.getParamText("invc_numb"))
			.where("and     a.invc_date between :fr_dt				" , arg.getParamText("fr_dt" ))
			.where("                    and     :to_dt				" , arg.getParamText("to_dt" ))
			.where("and     a.insp_drtr_idcd	= :insp_drtr_idcd	" , arg.getParamText("insp_drtr_idcd"))
			.where(")a																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getList3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  a.invc_numb,     a.line_seqn,     a.bzpl_idcd,     a.invc_date		")
			.query("      , a.insp_dvcd,     a.cstm_idcd,     a.dlvy_idcd,     a.dlvy_seqn		")
			.query("      , a.pdsd_numb,     a.wkod_numb,     a.acpt_numb,     a.acpt_seqn		")
			.query("      , a.item_idcd,     a.unit_idcd,     a.wkct_idcd,     a.prod_qntt		")
			.query("      , a.pass_qntt,     a.insp_qntt,     a.judt_dvcd,     a.pass_yorn		")
			.query("      , a.stnd_unit,     a.lott_numb,     a.work_dvcd,     a.smpl_numb		")
			.query("      , c.cstm_name,     i.item_name,     i.item_spec,     u.unit_name		")
			.query("      , wc.wkct_name,    d.dept_name,     us.user_name,    a.disp_seqn		")
			.query("      , a.istt_yorn,     a.istt_date,     a.remk_text,     a.uper_seqn		")
			.query("      , a.memo																")
			.query("      , a.cnfm_drtr_idcd,     a.acpt_amnd_degr,     a.wkct_item_idcd		")
			.query("      , a.work_indn_qntt,     a.insp_mthd_dvcd,     a.smor_pass_qntt		")
			.query("      , a.smor_poor_qntt,     a.sral_strt_numb,     a.insp_scre_numb		")
			.query("      , a.prod_istt_qntt,     a.cnfm_dept_idcd								")
		;
		data.param
			.query("from    last_insp a 																")
			.query("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd					")
			.query("        left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.query("        left outer join unit_mast u on i.unit_idcd = u.unit_idcd					")
			.query("        left outer join wkct_mast wc on a.wkct_idcd = wc.wkct_idcd					")
			.query("        left outer join dept_mast d on a.cnfm_dept_idcd = d.dept_idcd				")
			.query("        left outer join user_mast us on a.cnfm_drtr_idcd = us.user_idcd				")
			.where("where   1=1																			")
			.where("and     a.invc_date between :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("                    and     :to_dt			" , arg.getParamText("to_dt" ))
			.where("and     a.cnfm_drtr_idcd	= :cnfm_drtr_idcd	" , arg.getParamText("cnfm_drtr_idcd"))
		;
		return data.selectForMap();
	}
}
