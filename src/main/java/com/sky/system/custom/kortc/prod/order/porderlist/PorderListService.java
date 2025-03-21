package com.sky.system.custom.kortc.prod.order.porderlist;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service("kortc.PorderListService")
public class PorderListService extends DefaultServiceHandler {


	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select   a.invc_numb       , a.wkod_dvcd       , a.lott_numb       , a.bzpl_idcd       , a.pdod_date		")
			.query("       , a.acpt_numb       , a.acpt_amnd_degr  , a.acpt_seqn       , a.cstm_idcd       , a.pdsd_numb		")
			.query("       , a.pdsd_date       , a.pref_rank       , a.item_idcd       , a.wkfw_idcd       , a.bomt_degr		")
			.query("       , a.unit_idcd       , a.strt_dttm       , a.endd_dttm       , a.indn_qntt       , a.indn_qntt_1fst	")
			.query("       , a.work_date       , a.stnd_unit       , a.stnd_unit_qntt  , a.prod_bzpl_idcd  , a.prog_stat_dvcd	")
			.query("       , a.remk_text       , a.last_insp_yorn  , a.last_insp_date  , w.wkfw_name							")
			.query("       , i.item_name       , i.modl_name       , i.item_spec       , c.cstm_name							")

			.query("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl							")
			.query("       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name							")
			.query("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd							")
			.query("       , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm							")
			.query("       , a.crte_idcd       , a.crte_urif																	")
		;
		data.param
			.where("from pror_mast a																							")
			.where("left outer join pror_item b on a.invc_numb = b.invc_numb													")
			.where("left outer join wkfw_clss w on w.wkfw_idcd = a.wkfw_idcd													")
			.where("left outer join item_mast i on b.item_idcd = i.item_idcd													")
			.where("left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd													")
			.where("where 1=1																									")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.pdod_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.pdod_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    date_format(a.strt_dttm,'%Y%m%d')  >= :sttr_dttm		" , arg.getParamText("sttr_dttm" ))
			.where("and    date_format(a.strt_dttm,'%Y%m%d')  <= :sttr_dttm2	" , arg.getParamText("sttr_dttm2" ))
			.where("and    date_format(a.endd_dttm,'%Y%m%d')  >= :endd_dttm		" , arg.getParamText("endd_dttm" ))
			.where("and    date_format(a.endd_dttm,'%Y%m%d')  <= :endd_dttm2	" , arg.getParamText("endd_dttm2" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.wkfw_idcd   = :wkfw_idcd		" , arg.getParamText("wkfw_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd"  ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																						")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select   a.invc_numb       , a.line_seqn       , a.lott_numb       , a.bzpl_idcd       , a.wkfw_idcd		")
			.query("       , a.wkfw_seqn       , a.wkct_idcd       , a.cvic_idcd       , a.otod_yorn       , a.otod_cstm_idcd	")
			.query("       , a.wkct_item_idcd  , a.mold_idcd       , a.mtrl_bacd       , a.dayn_dvcd       , a.prod_dept_idcd	")
			.query("       , a.orig_invc_numb  , a.cstm_idcd       , a.item_idcd       , a.bomt_degr       , a.unit_idcd		")
			.query("       , a.acpt_qntt       , a.stok_used_qntt  , a.indn_qntt       , a.indn_qntt_1fst  , a.plan_strt_dttm	")
			.query("       , a.plan_endd_dttm  , a.pref_rank       , a.work_strt_dttm  , a.work_endd_dttm  , a.work_dvcd		")
			.query("       , a.insp_wkct_yorn  , a.last_wkct_yorn  , a.cofm_yorn       , a.remk_text       , a.prog_stat_dvcd	")
			.query("       , a.pckg_cotr_bacd  , a.uper_seqn       , a.disp_seqn       , w.wkct_name							")

			.query("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl							")
			.query("       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name							")
			.query("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd							")
			.query("       , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm							")
			.query("       , a.crte_idcd       , a.crte_urif																	")
		;
		data.param
			.where("from pror_item a																							")
			.where("left outer join wkct_mast w on w.wkct_idcd = a.wkct_idcd													")
			.where("where 1=1																									")
			.where("and   a.invc_numb      = :invc_numb ", arg.getParameter("invc_numb"))
			.where("and   a.line_stat      < 2																					")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

}
