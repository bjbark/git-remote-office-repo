package com.sky.system.cost.costlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class CostListService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb       , a.invc_date       , a.cvic_idcd   , a.mold_idcd								")
			.query("		, a.item_idcd       , a.dayn_dvcd       , a.good_qntt   , a.poor_qntt								")
			.query("		, a.need_time       , a.theo_qntt       , b.invc_qntt   , b.invc_pric								")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl								")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name								")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd								")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm								")
			.query("		, a.crte_idcd       , a.crte_urif       , i.item_name   , i.item_spec								")
			.query("		, i.item_code       , c.cvic_name       , m.cavity      , m.cycl_time								")
			.query("		, invc_amnt																							")
			.query("		, case ifnull(a.theo_qntt,0) when 0 then null else ifnull(a.good_qntt,0)							")
			.query("		                                                  / ifnull(a.theo_qntt,0) * 100 end  as good_prgs	")
			.query("		, ifnull(s.cost_ttsm,0) as unit_pric																")
			.query("		, ifnull(s.cost_ttsm,0) * ifnull(a.theo_qntt,0) as ttsm_amnt										")
			.query("		, case ifnull(ifnull(s.cost_ttsm,0) * ifnull(s.cost_ttsm,0)* ifnull(a.theo_qntt,0),0) when 0 then null	")
			.query("		   else ifnull(s.mtrl_cost,0)/ifnull(s.cost_ttsm,0) * ifnull(s.cost_ttsm,0)							")
			.query("		        * ifnull(a.theo_qntt,0) end as mtrl_amnt													")
			.query("		, case ifnull(ifnull(s.cost_ttsm,0) * ifnull(s.cost_ttsm,0)* ifnull(a.theo_qntt,0),0) when 0 then null	")
			.query("		   else ifnull(s.labo_cost,0)/ifnull(s.cost_ttsm,0) * ifnull(s.cost_ttsm,0)							")
			.query("		        * ifnull(a.theo_qntt,0) end as labo_amnt													")
			.query("		, case ifnull(ifnull(s.cost_ttsm,0) * ifnull(s.cost_ttsm,0)* ifnull(a.theo_qntt,0),0) when 0 then null")
			.query("		  else ifnull(s.udir_labo_nonn,0)/ifnull(s.cost_ttsm,0) * ifnull(s.cost_ttsm,0)						")
			.query("		       * ifnull(a.theo_qntt,0) end as adex_amnt														")
			.query("		, ifnull(s.cost_ttsm,0) * ifnull(a.theo_qntt,0)*0.1 as prof_amnt									")
			.query("		, (ifnull(s.cost_ttsm,0) * ifnull(a.theo_qntt,0))													")
			.query("		  +(ifnull(s.cost_ttsm,0) * ifnull(a.theo_qntt,0))*0.1  as finl_cost								")
			.query("		, case ifnull(a.theo_qntt,0) when 0 then null														")
			.query("		   else (ifnull(s.cost_ttsm,0) * ifnull(a.theo_qntt,0) + ifnull(s.cost_ttsm,0)						")
			.query("		        * ifnull(a.theo_qntt,0)*0.1)/ifnull(a.theo_qntt,0) end as finl_unit_cost					")
			.query("		, (ifnull(s.cost_ttsm,0) * ifnull(a.theo_qntt,0) + ifnull(s.cost_ttsm,0)							")
			.query("		  * ifnull(a.theo_qntt,0)*0.1)/ifnull(a.theo_qntt,0)/ifnull(b.invc_pric,0) as cost_sale				")
		;
		data.param //퀴리문
			.where("from work_book a																							")
			.where("left outer join pror_mast p on a.wkod_numb = p.invc_numb													")
			.where("left outer join acpt_item b on p.acpt_numb = b.invc_numb													")
			.where("                           and p.acpt_seqn = b.line_seqn													")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd													")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd													")
			.where("left outer join mold_mast m on a.mold_idcd = m.mold_idcd													")
			.where("left outer join stnd_cost s on a.mold_idcd = s.mold_idcd													")
			.where("                           and s.stnd_date = (select max(stnd_date)											")
			.where("                                              from   stnd_cost r											")
			.where("                                              where  r.stnd_date < a.invc_date)								")
			.where("where 1=1																									")
			.where("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date"))
			.where("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date"))
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.dayn_dvcd   = :dayn_dvcd    " , arg.getParamText("dayn_dvcd"))
			.where("and     a.item_idcd  = :item_idcd"      , arg.getParameter("item_idcd"))
			.where("and     a.cvic_idcd  = :cvic_idcd"      , arg.getParameter("cvic_idcd"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
