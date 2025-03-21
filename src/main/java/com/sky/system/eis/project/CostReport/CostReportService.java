package com.sky.system.eis.project.CostReport;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class CostReportService extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	// search
	public SqlResultMap getSearch1(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    a.pjod_idcd      , a.wkct_idcd      , a.invc_date       , a.line_seqn									")
			.query("        , a.idcd           , a.name           , a.progress        , a.wker_idcd_1fst							")
			.query("        , a.wker_idcd_2snd , a.wker_idcd_3trd , a.item_idcd       , a.cvic_idcd									")
			.query("        , a.work_cont      , a.indn_qntt      , a.prod_qntt       , a.good_qntt									")
			.query("        , a.poor_qntt      , a.work_sttm      , a.work_edtm       									")
			.query("        , a.work_mnhr      , a.work_pcnt      , a.work_cond_1fst  , a.work_cond_2snd							")
			.query("        , a.work_cond_3trd , a.work_cond_5fit , a.work_cond_6six  , a.work_cond_7svn							")
			.query("        , a.work_dvcd      , a.wkct_insp_yorn , a.last_wkct_yorn  , a.work_para									")
			.query("        , a.mtrl_ivst_yorn 																						")
			.query("        , ceil(TIMESTAMPDIFF(minute,STR_TO_DATE(work_sttm,'%H%i%s'),STR_TO_DATE(work_edtm,'%H%i%s'))/30) * 30 / 60 as need_time	")
			.query("        , i1.item_code     , i1.item_name     , i2.item_name as prnt_item_name									")
			.query("        , w.wkct_name      , c.cvic_name      , concat(w1.wkrn_name,' ',u1.user_name) as wker_1fst_name			")
			.query("        , concat(w2.wkrn_name,' ',u2.user_name) as wker_2snd_name												")
			.query("        , concat(w3.wkrn_name,' ',u3.user_name) as wker_3trd_name												")
		;
		data.param
			.where("from pjod_work_book a																							")
			.where("left outer join item_mast i1 on a.item_idcd      = i1.item_idcd													")
			.where("left outer join item_mast i2 on a.prnt_idcd      = i2.item_idcd													")
			.where("left outer join wkct_mast w on a.wkct_idcd       = w.wkct_idcd													")
			.where("left outer join cvic_mast c on a.cvic_idcd       = c.cvic_idcd													")
			.where("left outer join user_mast u1 on a.wker_idcd_1fst = u1.user_idcd													")
			.where("left outer join user_mast u2 on a.wker_idcd_2snd = u2.user_idcd													")
			.where("left outer join user_mast u3 on a.wker_idcd_3trd = u3.user_idcd													")
			.where("left outer join wkrn_mast w1 on u1.wkrn_idcd     = w1.wkrn_idcd													")
			.where("left outer join wkrn_mast w2 on u2.wkrn_idcd     = w2.wkrn_idcd													")
			.where("left outer join wkrn_mast w3 on u3.wkrn_idcd     = w3.wkrn_idcd													")
			.where("where		1=1																				")
			.where("and			a.pjod_idcd	= :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.line_seqn																		")
		;
		return data.selectForMap();
	}

	// mastersearch2
		public SqlResultMap getSearch2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    a.invc_numb      , a.invc_date       , a.bzpl_idcd    , a.istt_wrhs_idcd		")
			.query("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
			.query("        , a.istt_qntt      , a.vatx_incl_yorn  , a.vatx_rate    , a.istt_amnt			")
			.query("        , a.istt_vatx      , a.ttsm_amnt       , a.krwn_pric    , a.krwn_amnt			")
			.query("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text 							")
			.query("        , b.make_cmpy_name , b.make_date       , b.rtil_ddln 							")
			.query("        , c.cstm_code      , c.cstm_name       , w.wrhs_name    as istt_wrhs_name		")
			.query("        , u.user_name      as drtr_name													")
			.query("        , b.line_seqn      , b.item_idcd       , b.istt_pric    , b.orig_invc_numb		")
			.query("        , b.istt_qntt      , b.istt_amnt       , b.istt_vatx    , b.ttsm_amnt			")
			.query("        , b.user_memo      , b.sysm_memo       , b.prnt_idcd    , b.line_levl			")
			.query("        , b.line_ordr      , b.line_stat       , b.line_clos    , b.find_name			")
			.query("        , i.item_code      , i.item_name       , i.item_spec    , un.unit_name			")
			.query("        , o.invc_date as offr_date             , oi.deli_date							")
		;
		data.param
			.where("from purc_istt_mast a																	")
			.where("left outer join purc_istt_item b on a.invc_numb      = b.invc_numb						")
			.where("left outer join purc_ordr_mast o on b.orig_invc_numb = o.invc_numb						")
			.where("left outer join purc_ordr_item oi on b.orig_invc_numb = oi.invc_numb and b.orig_seqn = oi.line_seqn	")
			.where("left outer join cstm_mast c      on a.cstm_idcd      = c.cstm_idcd						")
			.where("left outer join wrhs_mast w      on a.istt_wrhs_idcd = w.wrhs_idcd						")
			.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
			.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
			.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")

			.where("where    1=1																			")
			.where("and      a.prnt_idcd = :pjod_idcd      " , arg.getParamText("pjod_idcd"))
			.where("and      a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and      o.line_stat   < :line_stat2     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg) throws Exception {
		String pjod_idcd	= arg.getParamText("pjod_idcd") ;
		DataMessage data;

		data = arg.newStorage("POS");

		data.param
			.query("call project_work_sum_1 (					")
			.query("   :pjod_idcd" 					, pjod_idcd	)
			.query(" ) 											")
		;
		return data.selectForMap();
	}

	public SqlResultMap getCost(HttpRequestArgument arg, String sort) throws Exception {
		String pjod_idcd	= arg.getParamText("pjod_idcd") ;
		DataMessage data;

		data = arg.newStorage("POS");

		data.param
		.query("call project_coost_sum_1 (					")
		.query("   :pjod_idcd" 					, pjod_idcd	)
		.query(" ) 											")
		;
		return data.selectForMap();
	}
	public SqlResultMap setSavePercent(HttpRequestArgument arg) throws Exception {
		DataMessage data;

		data = arg.newStorage("POS");

		data.param
			.table("pjod_mast")
			.where("where pjod_idcd =  :pjod_idcd")

			.unique("pjod_idcd",arg.getParameter("pjod_idcd"))

			.update("gfee_rate",arg.getParameter("gfee_rate"))
			.update("pfit_rate",arg.getParameter("pfit_rate"))
		;
		data.attach(Action.update);
		data.execute();

		return null;
	}
}
