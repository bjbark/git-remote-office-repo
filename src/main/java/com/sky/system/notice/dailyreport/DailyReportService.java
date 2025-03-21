package com.sky.system.notice.dailyreport;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class DailyReportService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
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
		;
		data.param //퀴리문
			.where("from	daily_rept a																			")
			.where("left outer join user_mast b on b.user_idcd = a.user_idcd										")
			.where("left outer join prjt_mast c on c.prjt_idcd = a.prjt_idcd										")
			.where("left outer join sscd_view d on d.sscd_code = 'plan_rslt_dvcd' and item_code = a.plan_rslt_dvcd	")
			.where("left outer join wkrn_mast w on w.wkrn_idcd = b.wkrn_idcd										")
			.where("where	1=1																						")
			.where("and		b.user_idcd	= :user_idcd"		 , arg.getParameter("user_idcd"))
			.where("and     a.dwup_date  >= :fr_dt   "		 , arg.getParamText("fr_dt" ))
			.where("and     a.dwup_date  <= :to_dt   "		 , arg.getParamText("to_dt" ))
			.where("and		a.apvl_dvcd	= :apvl_dvcd"		 , arg.getParameter("apvl_dvcd"))
			.where("and		a.prjt_idcd	= :prjt_idcd"		 , arg.getParameter("prjt_idcd"))
			.where("and		a.find_name	like %:find_name%"	 , arg.getParameter("find_name"))
			.where("and		a.line_stat	= :line_stat1"		 , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		 , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by w.wkrn_code, b.user_code, a.dwup_date desc , a.plan_rslt_dvcd , c.prjt_code")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 *
	 */
	public SqlResultMap setMaxid(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param //집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    ifnull((max(line_seqn)+1),0) as max						")
		;
		data.param //퀴리문
			.where("from daily_rept a													")
			.where("where 1=1															")
			.where("and a.line_seqn = :line_seqn",arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}

	/**
	 *
	 */
	public SqlResultMap setInsp(HttpRequestArgument arg) throws Exception{
		DataMessage data;
		String hq    = arg.getParamText("hq_id");
		if (hq.length() > 0 ){ data = new DataMessage(hq+".POS"); }
		else                 { data = arg.newStorage("POS");      }

		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		if(rowaction == Action.delete){
			data.param
				.table("daily_rept")
				.where("where line_seqn= :line_seqn")
				.where("and   user_idcd= :user_idcd")
				.where("and   dwup_date= :dwup_date")
				.where("and   plan_rslt_dvcd= :plan_rslt_dvcd")

				.unique("line_seqn"			, arg.fixParameter("line_seqn"))
				.unique("user_idcd"			, arg.fixParameter("user_idcd"))
				.unique("dwup_date"			, arg.fixParameter("dwup_date"))
				.unique("plan_rslt_dvcd"	, arg.fixParameter("plan_rslt_dvcd"))

				.update("line_stat"			, 2									)
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
		}else{
			data.param
				.table("daily_rept"                                             )
				.where("where line_seqn= :line_seqn")
				.where("and   user_idcd= :user_idcd")

				.unique("line_seqn"			, arg.fixParameter("line_seqn"))
				.unique("user_idcd"			, arg.fixParameter("user_idcd"))

				.update("dwup_date"			, arg.getParameter("dwup_date"))
				.update("plan_rslt_dvcd"	, arg.getParameter("plan_rslt_dvcd"))
				.update("oprt_smry"			, arg.getParameter("oprt_smry"))
				.update("prjt_idcd"			, arg.getParameter("prjt_idcd"))
				.update("prog_rate"			, arg.getParameter("prog_rate"))
				.update("oprt_cont"			, arg.getParameter("oprt_cont"))
				.update("apvl_dvcd"			, arg.getParameter("apvl_dvcd"))
				.update("find_name"			, arg.getParameter("user_name")
											+" "
											+ arg.getParameter("oprt_smry"))

				.insert("crte_idcd"			, arg.getParameter("user_idcd"))
				.update("updt_idcd"			, arg.getParameter("user_idcd"))
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(rowaction);
		}
		data.execute();
		return null;
	}

	/**
	 *
	 */
	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq    = arg.getParamText("hq_id");
		String apvlDate = " ", adminOp  = " ";

		if(!arg.getParamText("apvl_date").equals("")){
			apvlDate = arg.getParamText("apvl_date");
			adminOp  = arg.getParamText("admn_opin");
		}

		if (hq.length() > 0 ){ data = new DataMessage(hq+".POS"); }
		else                 { data = arg.newStorage("POS");      }

		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("daily_rept"                                             )
			.where("where line_seqn= :line_seqn")
			.where("and   user_idcd= :user_idcd")
			.where("and   dwup_date= :dwup_date")
			.where("and   plan_rslt_dvcd= :plan_rslt_dvcd")

			.unique("line_seqn"			, arg.fixParameter("line_seqn"))
			.unique("user_idcd"			, arg.fixParameter("user_idcd"))
			.unique("dwup_date"			, arg.fixParameter("dwup_date"))
			.unique("plan_rslt_dvcd"	, arg.fixParameter("plan_rslt_dvcd"))

			.update("apvl_date"			, apvlDate)
			.update("admn_opin"			, adminOp)
			.update("apvl_dvcd"			, arg.getParameter("apvl_dvcd"))
			.update("apvl_drtr_idcd"	, arg.getParameter("apvl_drtr_idcd"))
		;
		data.attach(rowaction);
		data.execute();
		data.clear();

		data.param
			.query("call month_schdule(")
			.query("	  :param"		,arg.toString())
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
}
