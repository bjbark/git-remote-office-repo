package com.sky.system.prod.order.prodorderlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class ProdOrderListService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.bzpl_idcd       , a.pdod_date        , a.acpt_numb			")
			.query("        , a.acpt_seqn        , a.cstm_idcd       , a.item_idcd								")
			.query("        , a.pdsd_numb        , a.pdsd_date       , a.wkfw_idcd        , a.bomt_degr			")
			.query("        , a.unit_idcd        , a.indn_qntt       , a.work_date								")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.prod_bzpl_idcd   , a.prog_stat_dvcd	")
			.query("        , a.remk_text																		")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , a.strt_dttm as work_strt_dttm   , a.endd_dttm as work_endd_dttm					")
			.query("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
			.query("        , sum(ifnull(w.prod_qntt,0)) as prod_qntt  , p.drwg_numb							")
			.query("        , (select base_name from base_mast r where r.base_code = p.item_bacd      and r.prnt_idcd = '8002') as item_bacd_name		")
			.query("        , (select base_name from base_mast r where r.base_code = p.make_bacd      and r.prnt_idcd = '8003') as make_bacd_name		")
			.query("        , (select base_name from base_mast r where r.base_code = p.mtrl_bacd      and r.prnt_idcd = '3101') as mtrl_bacd_name		")
			.query("        , d.item_wigt																		")
		;
		data.param
			.where("from pror_mast a																			")
			.where("left outer join pror_item b  on a.invc_numb = b.invc_numb	and b.last_wkct_yorn = '1'		")
			.where("left outer join work_book w  on a.invc_numb = w.wkod_numb and b.line_seqn = w.wkod_seqn		")
			.where("left outer join acpt_item mi on a.acpt_numb = mi.invc_numb and a.acpt_seqn = mi.line_seqn 	")
			.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.where("left outer join acpt_prod_spec p on a.acpt_numb= p.invc_numb and mi.line_seqn = p.line_seqn	")
			.where("left outer join item_desc d      on a.item_idcd= d.item_idcd								")

			.where("where 1=1 																					")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"))
			.where("and     a.pdod_date >= :pdod_date1     " , arg.getParamText("pdod_date1" ))
			.where("and     a.pdod_date <= :pdod_date2     " , arg.getParamText("pdod_date2" ))
			.where("and     substring(b.work_strt_dttm,1,8) >= :work_strt_dttm1   " , arg.getParamText("work_strt_dttm1" ))
			.where("and     substring(b.work_strt_dttm,1,8) <= :work_strt_dttm2   " , arg.getParamText("work_strt_dttm2" ))
			.where("and     substring(b.work_endd_dttm,1,8) >= :work_endd_dttm1   " , arg.getParamText("work_endd_dttm1" ))
			.where("and     substring(b.work_endd_dttm,1,8) <= :work_endd_dttm2   " , arg.getParamText("work_endd_dttm2" ))
			.where("and     a.line_stat   = :line_stat     " , arg.getParamText("line_stat"  ))
			.where("and     a.cstm_idcd   = :cstm_idcd     " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("group by a.invc_numb																		")
			.where("order by a.pdod_date desc																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getReport_Kind(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call report_kind_2 (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		return data.selectForMap();
	}
}
