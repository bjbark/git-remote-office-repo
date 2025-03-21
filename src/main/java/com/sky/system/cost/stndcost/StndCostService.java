package com.sky.system.cost.stndcost;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;


//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service
public class StndCostService extends DefaultServiceHandler {

//	final Logger logger = LoggerFactory.getLogger(this.getClass());
	private SeqListenerService sequance;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize " )
		;
		data.param
			.query("select *																								")
		;
		data.param // 쿼리문  입력
			.where("from (																								")
			.where("select 																								")
			.where("         a.stnd_date       , a.mold_idcd   , a.mtrl_bacd   , a.grad_dvcd            , a.used_tons	")
			.where("       , a.runr_wigt       , a.prod_wigt   , a.cycl_time   , a.daly_mtrl_usag_qntt  , a.need_mnhr	")
			.where("       , a.mtrl_wdrw_rate  , a.mtrl_cost   , a.labo_cost   , a.udir_labo_nonn       , a.cost_ttsm	")
			.where("       , a.sale_pric       , a.cost_rate															")
			.where("       , a.user_memo       , a.sysm_memo   , a.prnt_idcd   , a.find_name							")
			.where("       , a.line_levl       , a.line_ordr   , a.line_stat   , a.line_clos							")
			.where("       , m.mold_name       , m1.base_code as mtrl_bacd_name											")
			.where("from	stnd_cost  a																				")
			.where("		left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("		left outer join base_mast m1 on a.mtrl_bacd = m1.base_name									")
			.where("where	1=1																							")
			.where("and		m1.prnt_idcd = '3101' 																		")
			.where("and		a.mold_idcd	= :mold_idcd"		, arg.getParameter("mold_idcd"))
			.where("and		a.mtrl_bacd	= :mtrl_bacd"		, arg.getParameter("mtrl_bacd"))
			.where("and		a.stnd_date  >= :stnd1_date"	, arg.getParamText("stnd1_date" ))
			.where("and		a.stnd_date  <= :stnd2_date"	, arg.getParamText("stnd2_date" ))
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat") , !"".equals(arg.getParamText("line_stat" )))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.stnd_date ) a																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	//표준원가 저장
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("stnd_cost")
					.where("where stnd_date		= :stnd_date")	/*기준일자	*/
					.where("and   mold_idcd		= :mold_idcd")	/*금형id	*/
					.where("and   mtrl_bacd		= :mtrl_bacd")	/*재질분류코드  */

					.unique("stnd_date"			, row.fixParameter("stnd_date"		))
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"		))
					.unique("mtrl_bacd"			, row.fixParameter("mtrl_bacd"		))

					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);
			} else {
				data.param
					.table("stnd_cost")
					.where("where stnd_date		= :stnd_date")
					.where("and  mold_idcd		= :mold_idcd")
					.where("and  mtrl_bacd		= :mtrl_bacd")

					.unique("stnd_date"				, row.fixParameter("stnd_date"))
					.unique("mold_idcd"				, row.fixParameter("mold_idcd"))
					.unique("mtrl_bacd"				, row.fixParameter("mtrl_bacd"))

					.update("grad_dvcd"				, row.getParameter("grad_dvcd"))
					.update("used_tons"				, row.getParameter("used_tons"))
					.update("runr_wigt"				, row.getParameter("runr_wigt"))
					.update("prod_wigt"				, row.getParameter("prod_wigt"))
					.update("cycl_time"				, row.getParameter("cycl_time"))
					.update("daly_mtrl_usag_qntt"	, row.getParameter("daly_mtrl_usag_qntt"))
					.update("need_mnhr"				, row.getParameter("need_mnhr"))
					.update("mtrl_wdrw_rate"		, row.getParameter("mtrl_wdrw_rate"))
					.update("mtrl_cost"				, row.getParameter("mtrl_cost"))
					.update("labo_cost"				, row.getParameter("labo_cost"))
					.update("udir_labo_nonn"		, row.getParameter("udir_labo_nonn"))
					.update("cost_ttsm"				, row.getParameter("cost_ttsm"))
					.update("sale_pric"				, row.getParameter("sale_pric"))
					.update("cost_rate"				, row.getParameter("cost_rate"))
					.update("user_memo"				, row.getParameter("user_memo"))
					.update("find_name"				, row.getParameter("mtrl_bacd")
													+ "  "
													+ row.getParameter("mold_idcd"))
					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	/**
	 * 엑셀등록
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public void setExcel(HttpRequestArgument arg, DataMessage data, SqlResultRow item
			) throws Exception {
		data.clear();
		DataMessage read = arg.newStorage("POS");
		SqlResultRow temp ; // = read.selectForRow();
		DataMessage data1 = arg.newStorage("POS");

//		String runr_wigt		= arg.getParamText("runr_wig")       ;
//		String prod_wigt		= arg.getParamText("prod_wig")       ;
//		String need_mnhr		= arg.getParamText("need_mnh")       ;
//		String mtrl_cost		= arg.getParamText("mtrl_cost")      ;
//		String labo_cost		= arg.getParamText("labo_cost")       ;
//		String udir_labo_nonn	= arg.getParamText("udir_labo_nonn") ;
//		String cost_ttsm		= arg.getParamText("cost_ttsm")      ;
//		String mold_idcd		= arg.getParamText("mold_idcd")      ;
//
//		if(runr_wigt==""		||	runr_wigt==null		) {runr_wigt = "0";}
//		if(prod_wigt==""		||	prod_wigt==null		) {prod_wigt = "0";}
//		if(need_mnhr==""		||	need_mnhr==null		) {need_mnhr = "0";}
//		if(mtrl_cost==""		||	mtrl_cost==null		) {mtrl_cost = "0";}
//		if(labo_cost==""		||	labo_cost==null		) {labo_cost = "0";}
//		if(udir_labo_nonn==""	||	udir_labo_nonn==null) {udir_labo_nonn = "0"; }
//		if(cost_ttsm==""		||	cost_ttsm==null		) {cost_ttsm = "0";}

		data1.clear();
		data1.param
			.query("select stnd_date from stnd_cost where stnd_date = :stnd_date", item.fixParameter("stnd_date"))
			.query("and mold_idcd = :mold_idcd", item.fixParameter("mold_idcd"))
			.query("and mtrl_bacd = :mtrl_bacd", item.fixParameter("mtrl_bacd"))
		;
		SqlResultMap stnd_date = data1.selectForMap();
		data.clear();
		if(stnd_date.isEmpty()){
			data.param
				.table ("stnd_cost")
				.where ("where stnd_date = :stnd_date")
				.where ("and   mold_idcd = :mold_idcd")
				.where ("and   mtrl_bacd = :mtrl_bacd")

				.unique("stnd_date"        , item.fixParameter("stnd_date"))
				.unique("mold_idcd"        , item.fixParameter("mold_idcd"))
				.unique("mtrl_bacd"        , item.fixParameter("mtrl_bacd"))

				.insert("used_tons"        , item.getParameter("used_tons"))
				.insert("runr_wigt"        , item.getParameter("runr_wigt"))
				.insert("prod_wigt"        , item.getParameter("prod_wigt"))
				.insert("need_mnhr"        , item.getParameter("need_mnhr"))
				.insert("mtrl_cost"        , item.getParameter("mtrl_cost"))
				.insert("mtrl_wdrw_rate"   , item.getParameter("mtrl_wdrw_rate"))
				.insert("labo_cost"        , item.getParameter("labo_cost"))
				.insert("udir_labo_nonn"   , item.getParameter("udir_labo_nonn"))
				.insert("cost_ttsm"        , item.getParameter("cost_ttsm"))
				.insert("user_memo"        , item.getParameter("user_memo"))
				.insert("line_stat"        , 0	)

				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.update("updt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			}
			data.execute();
	}
}
