package com.sky.system.qc.insp.inspentry51;

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
public class InspEntry51Service  extends DefaultServiceHandler {
//	@Autowired
//	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getLister1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select     a.pjod_idcd       , a.amnd_degr         , a.pjod_code       , a.pjod_dvcd		")
			.where("         , a.expt_dvcd       , a.cstm_idcd         , a.prjt_idcd       , a.regi_date		")
			.where("         , a.item_idcd       , a.esti_amnt         , a.cofm_yorn       , a.cofm_date		")
			.where("         , a.cofm_amnt       , a.crny_dvcd         , a.frst_exam_date  , a.send_exam_date	")
			.where("         , a.deli_date       , a.ppsl_deli_date    , a.strt_date       , a.endd_date		")
			.where("         , a.drtr_idcd       , a.dlvy_date         , a.last_yorn       , a.apvl_date		")
			.where("         , a.apvl_drtr_idcd  , a.cstm_item_code    , a.mold_size       , a.cavity			")
			.where("         , a.mold_wigt       , a.used_mtrl_name    , a.prod_wigt       , a.used_tons		")
			.where("         , a.pjod_name       , a.item_imge         , a.item_imge2							")
			.where("         , a.shkg_text       , a.mold_mtrl         , a.work_rsps_idcd						")
			.where("         , a.dsig_rsps_idcd  , a.modl_rsps_idcd    , a.rela_pjod_idcd						")
			.where("         , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.where("         , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.where("         , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.where("         , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.where("         , a.crte_idcd       , a.crte_urif													")
			.where("         , c.cstm_code       , c.cstm_name         , u1.user_name as drtr_name				")
			.where("         , u2.user_name as work_rsps_name          , u3.user_name as dsig_rsps_name			")
			.where("         , u4.user_name as modl_rsps_name													")
			.where("         , i.item_code       , i.item_spec         , a.item_name       , a.modl_name		")
			.where("         , p.prjt_code       , p.prjt_name													")
			.where("         , c.buss_name       , c.buss_numb         , c.buss_kind       , c.buss_type		")
			.where("         , c.corp_dvcd       , c.boss_name         , c.tele_numb       , c.faxi_numb		")
			.where("         , c.mail_addr       , c.hdph_numb													")
//		;
//		data.param
			.where("from pjod_mast a																			")
			.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u1 on a.drtr_idcd = u1.user_idcd									")
			.where("left outer join user_mast u2 on a.work_rsps_idcd = u2.user_idcd								")
			.where("left outer join user_mast u3 on a.dsig_rsps_idcd = u3.user_idcd								")
			.where("left outer join user_mast u4 on a.modl_rsps_idcd = u4.user_idcd								")
			.where("left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.where("left outer join prjt_mast p  on a.prjt_idcd = p.prjt_idcd									")
			.where("left outer join ostt_insp o  on a.pjod_idcd = o.acpt_numb									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.regi_date >= :regi_date1     " , arg.getParamText("regi_date1" ))
			.where("and     a.regi_date <= :regi_date2     " , arg.getParamText("regi_date2" ))
			.where("and     a.prjt_idcd  = :prjt_idcd      " , arg.getParamText("prjt_idcd"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos"  ))
			.where("and     a.deli_date >= :deli_date1     " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2     " , arg.getParamText("deli_date2" ))
			.where("and     a.pjod_idcd  = :pjod_idcd      " , arg.getParamText("pjod_idcd"  ))
			.where("and     a.drtr_idcd  = :drtr_idcd      " , arg.getParamText("drtr_idcd"  ))
			.where("and     a.expt_dvcd  = :expt_dvcd      " , arg.getParamText("expt_dvcd"  ))
			.where("and     a.line_stat  < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by  a.pjod_idcd desc, a.regi_date desc												")
			.where(")a																							")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb        , a.insp_sbsc_seqn   , a.insp_sbsc_name   , a.msmt_valu_1fst	")
			.query("        , o.acpt_numb        , p.pjod_idcd        , a.line_seqn								")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif													")
	;
	data.param
			.where("from   ostt_insp_dtil a																		")
			.where("left outer join ostt_insp o  on a.invc_numb = o.invc_numb									")
			.where("left outer join pjod_mast p  on o.acpt_numb = p.pjod_idcd									")
			.where("where  1=1																					")
			.where("and     p.pjod_idcd = :pjod_idcd" , arg.getParameter("pjod_idcd"))
			.where("order by a.insp_sbsc_seqn 																	")
		;
		return data.selectForMap();
	}


	/**
	 *Lister2 조회
	 *
	 */
	public SqlResultMap getLister2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  a.invc_numb      , a.bzpl_idcd       , a.invc_date      , a.spts_numb		")
			.query("      , a.spts_seqn      , i.item_name       , i.item_spec							")
			.query("      , a.spts_date      , a.spts_dept_idcd  , a.spts_drtr_idcd , a.item_idcd		")
			.query("      , a.unit_idcd      , a.spts_qntt       , a.deli_date      , a.wrhs_idcd		")
			.query("      , a.cstm_idcd      , a.insp_drtr_idcd  , a.pass_qntt      , a.poor_qntt		")
			.query("      , a.remk_text      , a.wrhs_idcd       , c.cstm_name      , b.wrhs_name		")
			.query("      , a.insp_qntt																	")
		;
		data.param
			.query("from    ostt_insp a 																")
			.query("        left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.query("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd					")
			.query("        left outer join wrhs_mast b on a.wrhs_idcd = b.wrhs_idcd					")
			.where("where   1=1																			")
			.where("and     a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"				))
		;
		return data.selectForMap();
	}

	/**
	 * popup 조회
	 *
	 */
	public SqlResultMap getPopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.insp_type_idcd   , a.line_seqn        , a.insp_sbsc_name   , a.insp_cond		")
			.query("        , a.insp_levl_uppt   , a.insp_levl_midl   , a.insp_levl_lprt						")
			.query("        , a.rslt_iput_dvcd   , a.goal_levl													")
			.query("        , a.ctq_sbsc_yorn    , a.msmt_mthd_dvcd   , a.insp_levl        , a.lott_judt_stnd	")
			.query("        , a.insp_mthd_dvcd   , a.uppr_valu        , a.lwlt_valu								")
			.query("        , a.remk_text        , a.uper_seqn        , a.disp_seqn        , a.user_memo		")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , b.insp_type_name   , b.insp_type_code   , d.cvic_idcd        , d.cvic_name		")
		;
		data.param
			.where("from   insp_cond a																			")
			.where("       left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd				")
			.where("       left outer join cvic_mast      d on a.insp_cvic_idcd = d.cvic_idcd 					")
			.where("where  1=1																					")
			.where("and     b.insp_type_code = 800																")
			.where("and     a.insp_type_idcd = :insp_type_idcd" , arg.getParameter("insp_type_idcd"))
			.where("order by a.insp_type_idcd , a.line_seqn														")
		;
		return data.selectForMap();
	}

	public SqlResultMap setPopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
//			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			System.out.println(arg.getParameter("invc_numb"));

				data.param
					.table("ostt_insp")
					.where("where invc_numb  = :invc_numb")
					.where("and   line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, 1)

					.update("acpt_numb"			, row.getParameter("acpt_numb"))

					.update("find_name"			, row.getParameter("invc_numb")
												+ " "
												+ row.getParameter("line_seqn"))

					.update("line_stat"			, row.getParameter("line_stat"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();
				data.param
					.table("ostt_insp_dtil")
					.where("where invc_numb  = :invc_numb")
					.where("and   line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("insp_sbsc_seqn"	, row.getParameter("line_seqn"))
					.update("insp_sbsc_name"	, row.getParameter("insp_sbsc_name"))
					.update("msmt_valu_1fst"	, row.getParameter("msmt_valu_1fst"))

					.update("find_name"			, row.getParameter("invc_numb")
												+ " "
												+ row.getParameter("line_seqn"))

					.update("line_stat"			, row.getParameter("line_stat"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.modify);
		}
		data.execute();
		return null ;
	}


	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("ostt_insp_dtil")
					.where("where invc_numb  = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					;data.attach(Action.delete);

			} else {
				data.param
					.table("ostt_insp_dtil")
					.where("where invc_numb	= :invc_numb" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("msmt_valu_1fst"	, row.getParameter("msmt_valu_1fst"))
					.update("find_name"			, row.getParameter("invc_numb")
												+ " "
												+ row.fixParameter("line_seqn"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
