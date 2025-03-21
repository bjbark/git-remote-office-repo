package com.sky.system.custom.dehansol.prod.workbook;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service("dehansol.WorkBookService")
public class WorkBookService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

//		System.out.println("getMaster");
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb       , a.invc_date       , a.cvic_idcd   , a.mold_idcd				")
			.query("		, a.item_idcd       , a.dayn_dvcd       , a.good_qntt   , a.poor_qntt				")
			.query("		, a.need_time       , a.theo_qntt       , b.invc_qntt   , b.invc_pric				")
			.query("		, a.ostt_qntt       , a.stok_qntt       , a.succ_qntt								")
			.query("		, a.prod_qntt       , b.invc_amnt													")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       , i.item_name   , i.item_spec				")
			.query("		, i.item_code       , c.cvic_name       , m.cavity      , m.cycl_time				")
			.query("		, w.wkct_name																		")
			.query("		, case ifnull(a.theo_qntt,0) when 0 then null else ifnull(a.good_qntt,0) / ifnull(a.theo_qntt,0) * 100 end as good_prgs					")
		;
		data.param //퀴리문
			.where("from work_book a																			")
			.where("left outer join pror_mast p on a.wkod_numb = p.invc_numb									")
			.where("left outer join acpt_item b on p.acpt_numb = b.invc_numb and p.acpt_seqn = b.line_seqn		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("where 1=1																					")
			.where("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.dayn_dvcd   = :dayn_dvcd    " , arg.getParamText("dayn_dvcd" ) , !"".equals(arg.getParamText("dayn_dvcd")))
			.where("and     a.item_idcd  = :item_idcd"      , arg.getParameter("item_idcd"))
			.where("and     a.cvic_idcd  = :cvic_idcd"      , arg.getParameter("cvic_idcd"))
			.where("and     a.wkct_idcd  = :wkct_idcd"      , arg.getParameter("wkct_idcd"))
			.where("order by a.invc_date desc")
			;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
