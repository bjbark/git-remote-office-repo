package com.sky.system.custom.sjflv.item.itemspeclist;

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


@Service("sjflv.ItemSpecListService")
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
			.query("		   a.item_idcd		, a.item_spec		, a.item_code		, a.item_name			")
			.query("		 , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name")
			.query("		 , (select base_name from base_mast r where a.acct_bacd  = r.base_code			")
			.query("											 and   r.prnt_idcd = '1102') as acct_bacd_name	")
			.query("		 , i.appr			, i.test_ordr		, i.dnst									")
			.query("		 , i.rfct_indx		, i.asen			, i.hmtl			, i.lead				")
			.query("		 , i.alin_mtrl		, i.ingd			, i.slvt_carr		, i.shlf_life			")
			.query("		 , i.strg_cond		, i.melt_pont		, i.flsh_pont		, i.ph					")
			.query("		 , i.ecil			, i.vtrl_cont		, i.brix			, i.guis				")
			.query("		 , i.ecil_yorn		, i.brix_yorn		, ph_yorn			, i.ingd_yorn			")
			.query("		 , i.etcc_cont		, i.remk_text													")
			.query("		 , (select group_concat(user_memo order by refn_code) from item_refn where refn_dvcd = '5' and find_in_set(refn_code, i.etcc_cont)) as etcc_memo ")
			.query("		 , a.user_memo		, a.sysm_memo		, a.prnt_idcd								")
			.query("		 , a.line_levl		, a.line_ordr		, a.line_stat		, a.line_clos			")
			.query("		 , a.find_name		, a.updt_user_name	, a.updt_ipad		, a.updt_dttm			")
			.query("		 , a.updt_idcd		, a.updt_urif		, a.crte_user_name	, a.crte_ipad			")
			.query("		 , a.crte_dttm		, a.crte_idcd		, a.crte_urif								")
		;
		data.param //퀴리문
			.where("from	item_mast a																			")
			.where("		left outer join item_clss    c1 on a.lcls_idcd = c1.clss_idcd						")
			.where("		left outer join item_clss    c2 on a.mcls_idcd = c2.clss_idcd						")
			.where("		left outer join item_clss    c3 on a.scls_idcd = c3.clss_idcd						")
			.where("		left outer join item_spec     i on a.item_idcd = i.item_idcd						")
			.where("where	1=1																					")
			.where("and		a.find_name	like %:find_name%" , arg.getParameter("find_name"))
			.where("and		a.line_stat	< :line_stat	 " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("and		a.acct_bacd  = :acct_code	 " , arg.getParameter("acct_code"))
			.where("and		a.item_idcd  = :item_idcd	 " , arg.getParameter("item_idcd"))
			.where("order by a.item_idcd																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
