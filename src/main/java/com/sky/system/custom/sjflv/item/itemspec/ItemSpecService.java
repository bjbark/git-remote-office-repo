package com.sky.system.custom.sjflv.item.itemspec;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service("sjflv.ItemSpecService")
public class ItemSpecService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																	" )
		;
		data.param
			.query("select																						")
			.query("		  a.item_idcd		, a.item_spec		, a.item_code		, a.item_name			")
			.query("		, c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name")
			.query("		, (select base_name from base_mast r where a.acct_bacd  = r.base_code				")
			.query("											 and   r.prnt_idcd = '1102') as acct_bacd_name	")
			.query("		, i.appr			, i.test_ordr		, i.dnst									")
			.query("		, i.rfct_indx		, i.asen			, i.hmtl			, i.lead				")
			.query("		, i.alin_mtrl		, i.ingd			, i.slvt_carr		, i.shlf_life			")
			.query("		, i.strg_cond		, i.melt_pont		, i.flsh_pont		, i.ph					")
			.query("		, i.ecil			, i.vtrl_cont		, i.brix			, i.guis				")
			.query("		, i.ecil_yorn		, i.brix_yorn		, ph_yorn			, i.ingd_yorn			")
			.query("		, i.etcc_cont		, i.remk_text													")
			.query("		, (select group_concat(user_memo order by refn_code) from item_refn where refn_dvcd = '5' and find_in_set(refn_code, i.etcc_cont)) as etcc_memo ")
			.query("		, a.user_memo		, a.sysm_memo		, a.prnt_idcd								")
			.query("		, a.line_levl		, a.line_ordr		, a.line_stat		, a.line_clos			")
			.query("		, a.find_name		, a.updt_user_name	, a.updt_ipad		, a.updt_dttm			")
			.query("		, a.updt_idcd		, a.updt_urif		, a.crte_user_name	, a.crte_ipad			")
			.query("		, a.crte_dttm		, a.crte_idcd		, a.crte_urif								")
		;
		data.param //퀴리문
			.where("from	item_mast a																			")
			.where("		left outer join item_clss    c1 on a.lcls_idcd = c1.clss_idcd						")
			.where("		left outer join item_clss    c2 on a.mcls_idcd = c2.clss_idcd						")
			.where("		left outer join item_clss    c3 on a.scls_idcd = c3.clss_idcd						")
			.where("		left outer join item_spec     i on a.item_idcd = i.item_idcd						")
			.where("where	1 = 1																				")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.line_stat	< :line_stat	 "	, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and		a.acct_bacd  = :acct_code	 "	, arg.getParameter("acct_code"))
			.where("and		a.item_idcd  = :item_idcd	 "	, arg.getParameter("item_idcd"))
			.where("order   by a.item_idcd																		")
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
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String brix_yorn;
		String ingd_yorn;
		String ph_yorn;
		String ecil_yorn;

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if(row.getParamText("brix_yorn").equals("on")){
				brix_yorn = "1";
			}else{
				brix_yorn = "0";
			}

			if(row.getParamText("ingd_yorn").equals("on")){
				ingd_yorn = "1";
			}else{
				ingd_yorn = "0";
			}

			if(row.getParamText("ph_yorn").equals("on")){
				ph_yorn = "1";
			}else{
				ph_yorn = "0";
			}

			if(row.getParamText("ecil_yorn").equals("on")){
				ecil_yorn = "1";
			}else{
				ecil_yorn = "0";
			}

			if (rowaction == Action.delete) {
				data.param
					.table("item_spec")
					.where("where item_idcd  = :item_idcd")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("item_spec")
					.where("where item_idcd	= :item_idcd" )

					.unique("item_idcd"			, row.fixParameter("item_idcd"))

					.update("appr"				, row.getParameter("appr"))
					.update("test_ordr"			, row.getParameter("test_ordr"))
					.update("dnst"				, row.getParameter("dnst"))
					.update("rfct_indx"			, row.getParameter("rfct_indx"))
					.update("asen"				, row.getParameter("asen"))
					.update("hmtl"				, row.getParameter("hmtl"))
					.update("lead"				, row.getParameter("lead"))
					.update("alin_mtrl"			, row.getParameter("alin_mtrl"))
					.update("ingd"				, row.getParameter("ingd"))
					.update("ingd_yorn"			, ingd_yorn)
					.update("slvt_carr"			, row.getParameter("slvt_carr"))
					.update("shlf_life"			, row.getParameter("shlf_life"))
					.update("strg_cond"			, row.getParameter("strg_cond"))
					.update("melt_pont"			, row.getParameter("melt_pont"))
					.update("flsh_pont"			, row.getParameter("flsh_pont"))
					.update("ph"				, row.getParameter("ph"))
					.update("ph_yorn"			, ph_yorn)
					.update("ecil"				, row.getParameter("ecil"))
					.update("ecil_yorn"			, ecil_yorn)
					.update("vtrl_cont"			, row.getParameter("vtrl_cont"))
					.update("brix"				, row.getParameter("brix"))
					.update("brix_yorn"			, brix_yorn)
					.update("guis"				, row.getParameter("guis"))
					.update("etcc_cont"			, row.getParameter("etcc_cont"))
					.update("remk_text"			, row.getParameter("remk_text"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("item_code")
												+ "	"
												+ row.fixParameter("item_name")
												+ "	")
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
			}
		}
		data.execute();
		return null ;
	}

}
