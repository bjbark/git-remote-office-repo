package com.sky.system.eis.report.eisreport15;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class EisReport15Service extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getFltx_cont(HttpRequestArgument arg ) throws Exception {
		String hq    = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq+".POS");
		data.param
		.query("call calendar_veiw(				")
		.query("        :source_dvcd",arg.getParameter("source_dvcd"))
		.query("      , :dvcd",arg.getParameter("dvcd"))
		.query("      , :stdt",arg.getParameter("stdt"))
		.query("      , :eddt",arg.getParameter("eddt"))
		.query(")   ")

		;
		return data.selectForMap();
	}
	public SqlResultMap getDaily_rept(HttpRequestArgument arg ) throws Exception {
		String hq    = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq+".POS");
		data.param
			.query("select      drtr_idcd         , line_seqn	")
			.where("from        mnth_schd						")
			.where("where       mngt_idcd = :mngt_idcd ",arg.fixParameter("id"))
		;

		SqlResultMap a = data.selectForMap();

		data.clear();
		data.param
			.query("select																					")
			.query("           a.user_idcd,      a.dwup_date,      a.plan_rslt_dvcd, a.line_seqn			")
			.query("         , a.oprt_smry,      a.prjt_idcd,      a.prog_rate,      a.apvl_dvcd			")
			.query("         , a.apvl_date,      a.apvl_drtr_idcd, a.user_memo								")
			.query("         , a.sysm_memo,      a.prnt_idcd,      a.line_levl,      a.line_ordr			")
			.query("         , a.line_stat,      a.line_clos,      a.find_name,      a.updt_user_name		")
			.query("         , a.updt_ipad,      a.updt_dttm,      a.updt_idcd,      a.updt_urif			")
			.query("         , a.crte_user_name, a.crte_ipad,      a.crte_dttm,      a.crte_idcd			")
			.query("         , convert(oprt_cont using UTF8) as oprt_cont									")
			.query("         , convert(admn_opin using UTF8) as admn_opin									")
			.query("         , a.crte_urif																	")
			.query("         , b.user_name,      c.prjt_name												")
			.query("         , d.item_name as plan_rslt_name												")
			.where("from     daily_rept a																	")
			.where("left outer join user_mast b on b.user_idcd = a.user_idcd										")
			.where("left outer join prjt_mast c on c.prjt_idcd = a.prjt_idcd										")
			.where("left outer join sscd_view d on d.sscd_code = 'plan_rslt_dvcd' and item_code = a.plan_rslt_dvcd	")
			.where("left outer join wkrn_mast w on w.wkrn_idcd = b.wkrn_idcd								")
			.where("where    a.user_idcd = :drtr_idcd ",a.get(0).fixParameter("drtr_idcd"))
			.where("and      a.line_seqn = :line_seqn ",a.get(0).fixParameter("line_seqn"))
		;

		return data.selectForMap();
	}
}
