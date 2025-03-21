package com.sky.system.prod.order.prodorder;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class ProdOrderService extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.bzpl_idcd       , a.pdod_date        , a.acpt_numb			")
			.query("        , a.acpt_seqn        , a.cstm_idcd       , a.pdsd_numb        , a.item_idcd			")
			.query("        , a.pdsd_date       , a.wkfw_idcd        , a.bomt_degr								")
			.query("        , a.unit_idcd        , a.indn_qntt       , a.work_date								")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.prod_bzpl_idcd   , a.prog_stat_dvcd	")
			.query("        , a.remk_text																		")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , b.work_strt_dttm   , b.work_endd_dttm  , b.insp_wkct_yorn							")
			.query("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
			.query("        , (select sum(prod_qntt) from work_book w where a.invc_numb = w.wkod_numb) as prod_qntt	")
		;
		data.param
			.where("from pror_mast a																			")
			.where("left outer join pror_item p on a.invc_numb = p.invc_numb									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on p.item_idcd = i.item_idcd									")
			.where("    , (select invc_numb , min(work_strt_dttm) as work_strt_dttm								")
			.where("            , max(work_endd_dttm) as work_endd_dttm											")
			.where("            , max(insp_wkct_yorn) as insp_wkct_yorn											")
			.where("       from pror_item																		")
			.where("       group by invc_numb																	")
			.where("      ) b																					")
			.where("where   1=1																					")
			.where("and     a.invc_numb = b.invc_numb															")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"))
			.where("and     a.pdod_date >= :pdod_date1     " , arg.getParamText("pdod_date1" ))
			.where("and     a.pdod_date <= :pdod_date2     " , arg.getParamText("pdod_date2" ))
			.where("and     substring(b.work_strt_dttm,1,8) >= :work_strt_dttm1   " , arg.getParamText("work_strt_dttm1" ))
			.where("and     substring(b.work_strt_dttm,1,8) <= :work_strt_dttm2   " , arg.getParamText("work_strt_dttm2" ))
			.where("and     substring(b.work_endd_dttm,1,8) >= :work_endd_dttm1   " , arg.getParamText("work_endd_dttm1" ))
			.where("and     substring(b.work_endd_dttm,1,8) <= :work_endd_dttm2   " , arg.getParamText("work_endd_dttm2" ))
			.where("and     a.line_stat   = :line_stat     " , arg.getParamText("line_stat"  ))
			.where("and     a.item_idcd   = :item_idcd     " , arg.getParamText("item_idcd"  ))
			.where("and     a.cstm_idcd   = :cstm_idcd     " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
/*
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.bzpl_idcd        , a.item_idcd      , a.cstm_idcd				")
			.query("        , a.cvic_idcd        , a.bomt_degr        , a.optn_yorn      , a.optn_sbsc				")
			.query("        , a.optn_sbsc_valu   , a.plan_sttm        , a.plan_edtm      , a.plan_qntt				")
			.query("        , a.mngt_dept_idcd   , a.trst_dept_idcd   , a.trst_drtr_idcd , a.prod_trst_dvcd			")
			.query("        , a.prod_trst_numb   , a.trst_qntt        , a.stok_used_qntt , a.cmpl_reqt_date			")
			.query("        , a.curr_stok_qntt   , a.cofm_drtr_idcd   , a.cofm_date      , a.last_wker_idcd			")
			.query("        , a.last_work_date   , a.remk_text														")
			.query("        , a.prod_qntt																			")
			.query("        , a.user_memo        , a.sysm_memo        , a.line_stat									")
			.query("        , 0 as qntt																				")
			.query("        , ifnull(a.plan_qntt,0)-ifnull(a.prod_qntt,0) as stok_qntt								")
			.query("        , 0 as indn_qntt     , a.invc_numb as orig_invc_numb									")
			.query("        , a.cvic_name        , a.item_code        , a.item_name       , a.item_spec				")
			.query("        , a.unit_idcd        , a.unit_name														")
			.query("        , a.mold_idcd        , a.mtrl_bacd        , a.mold_code       , a.mtrl_name				")
			.query("        , a.pckg_cotr_name   , a.pckg_cotr_bacd   , a.acpt_seqn       , a.acpt_numb				")
			.query("        , a.lott_numb																			")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb        , a.bzpl_idcd        , a.item_idcd      , a.cstm_idcd				")
			.where("        , a.cvic_idcd        , a.bomt_degr        , a.optn_yorn      , a.optn_sbsc				")
			.where("        , a.optn_sbsc_valu   , a.plan_sttm        , a.plan_edtm      , a.plan_qntt				")
			.where("        , a.mngt_dept_idcd   , a.trst_dept_idcd   , a.trst_drtr_idcd , a.prod_trst_dvcd			")
			.where("        , a.prod_trst_numb   , a.trst_qntt        , a.stok_used_qntt , a.cmpl_reqt_date			")
			.where("        , a.curr_stok_qntt   , a.cofm_drtr_idcd   , a.cofm_date      , a.last_wker_idcd			")
			.where("        , a.last_work_date   , a.remk_text        , a.user_memo      , a.sysm_memo				")
			.where("        , a.line_stat																			")
			.where("        , (select sum(indn_qntt) from pror_item r where a.invc_numb = r.orig_invc_numb) as prod_qntt")
			.where("        , ifnull(a.plan_qntt,0) as stok_qntt													")
			.where("        , c.cvic_name        , u.unit_name														")
			.where("        , i.item_code        , i.item_name        , i.item_spec       , i.unit_idcd				")
			.where("        , a.mold_idcd        , a.mtrl_bacd        , m.mold_code       , a.pckg_cotr_bacd		")
			.where("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code					")
			.where("                                             and   r.prnt_idcd = '3101')   as mtrl_name			")
			.where("        , (select base_name from base_mast r where a.pckg_cotr_bacd  = r.base_code				")
			.where("                                             and   r.prnt_idcd = '8004')   as pckg_cotr_name	")
			.where("        , p.acpt_seqn        , p.acpt_numb        , p.lott_numb									")
			.where("from prod_plan a																				")
			.where("left outer join cvic_mast      c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast      u on i.unit_idcd = u.unit_idcd									")
			.where("left outer join item_adon      d on a.item_idcd = d.item_idcd									")
			.where("left outer join mold_mast      m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join prod_plan_acpt p on a.invc_numb = p.invc_numb									")
			.where("where 1=1																						")
			.where("and   a.item_idcd = :item_idcd" , arg.getParameter("item_idcd"))
			.where("and   substring(a.plan_sttm,1,8)   >= :plan1_sttm" , arg.getParamText("plan1_sttm" ))
			.where("and   substring(a.plan_sttm,1,8)   <= :plan2_sttm" , arg.getParamText("plan2_sttm" ))
			.where("and   a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																								")
			.where("where ifnull(a.plan_qntt,0) > ifnull(a.prod_qntt,0)												")  // 지시 잔량이 있는 자료만 Select 한다.
			.where("order by a.item_code																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	*/
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String item_idcd	= arg.getParamText("item_idcd") ;
		String fr_dt		= arg.getParamText("plan1_sttm") ;
		String to_dt		= arg.getParamText("plan2_sttm") ;
		if (item_idcd.length() == 0) {
			item_idcd = "not defined" ;
		}
		if (fr_dt.length() == 0) {
			fr_dt = "not defined" ;
		}
		if (to_dt.length() == 0) {
			to_dt = "not defined" ;
		}

		data.param
			.query("call acpt_list_work_order (	")
			.query("   :item_idcd " , item_idcd	)
			.query(" , :fr_dt     " , fr_dt		)
			.query(" , :to_dt     " , to_dt		)
			.query(" ) 							")
		;
	return data.selectForMap(sort);

	}
	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb        , a.bzpl_idcd       , a.pdod_date        , a.acpt_numb			")
			.query("        , a.acpt_seqn        , a.cstm_idcd       , a.pdsd_numb        , a.item_idcd			")
			.query("        , a.pdsd_numb        , a.pdsd_date       , a.wkfw_idcd        , a.bomt_degr			")
			.query("        , a.unit_idcd        , a.indn_qntt       , a.work_date        , a.work_date			")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.prod_bzpl_idcd   , a.prog_stat_dvcd	")
			.query("        , a.remk_text																		")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , b.work_strt_dttm   , b.work_endd_dttm  , b.insp_wkct_yorn   , c.cstm_code			")
			.query("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
			.query("        , w.wkfw_name																		")
		;
		data.param
			.where("from pror_mast a																			")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join wkfw_clss w on a.wkfw_idcd = w.wkfw_idcd									")
			.where("    , (select invc_numb , min(work_strt_dttm) as work_strt_dttm								")
			.where("            , max(work_endd_dttm) as work_endd_dttm											")
			.where("            , max(insp_wkct_yorn) as insp_wkct_yorn											")
			.where("       from pror_item																		")
			.where("       group by invc_numb																	")
			.where("      ) b																					")
			.where("where   1=1																					")
			.where("and     a.invc_numb = b.invc_numb															")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"))
			.where("and     substring(b.work_strt_dttm,1,8) >= :work_strt_dttm1   " , arg.getParamText("work_strt_dttm1" ))
			.where("and     substring(b.work_strt_dttm,1,8) <= :work_strt_dttm2   " , arg.getParamText("work_strt_dttm2" ))
			.where("and     a.item_idcd   = :item_idcd     " , arg.getParamText("item_idcd"  ))
			.where("and     a.line_stat   < :line_stat     " , "2")
			.where("order by a.invc_numb																	")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			double qntt = Double.parseDouble(row.getParamText("qntt"));
			/*qntt = 지시대기수량(stok_qntt) - 지시수량(indn_qntt)*/
				data.param
					.table("pror_mast													")
					.where("where invc_numb = :invc_numb								")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))		//사업장ID
					.update("pdod_date"			, row.getParameter("pdod_date"			))		//생산지시일자
					.update("acpt_numb"			, row.getParameter("acpt_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))		//수주순번
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))		//거래처ID
					.update("pdsd_numb"			, row.getParameter("invc_numb"			))		//생산계획번호
					.update("pdsd_date"			, row.getParameter("pdsd_date"			))		//생산계획일자
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("pckg_cotr_bacd"	, row.getParameter("pckg_cotr_bacd"		))		//포장용기
					.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))		//공정흐름ID
					.update("bomt_degr"			, row.getParameter("bomt_degr"			))		//BOM차수
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
					.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
					.update("work_date"			, row.getParameter("work_date"			))		//작업일자
					.update("stnd_unit"			, row.getParameter("stnd_unit"			))		//기준단위
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("prod_bzpl_idcd"	, row.getParameter("prod_bzpl_idcd"		))		//생산사업장ID
					.update("prog_stat_dvcd"	, "0"									)		//진행구분코드
					.update("remk_text"			, row.getParameter("remk_text"			))		//비고
					.update("user_memo"			, row.getParameter("user_memo"			))		//비고

					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("pror_item						")
					.where("where invc_numb		= :invc_numb")		//invoice번호
					.where("and   line_seqn		= :line_seqn")		//순번

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, 1										)		//순번

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))		//사업장ID
					.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))		//공정흐름ID
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))		//공정ID
					.update("wkct_item_idcd"	, row.getParameter("wkct_item_idcd"		))		//공정품목ID
					.update("prod_dept_idcd"	, row.getParameter("prod_dept_idcd"		))		//생산부서ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))		//거래처ID
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("mold_idcd"			, row.getParameter("mold_idcd"			))		//금형ID
					.update("bomt_degr"			, row.getParameter("bomt_degr"			))		//BOM차수
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
					.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
					.update("work_strt_dttm"	, row.getParameter("plan_sttm"			))		//작업시작일시
					.update("work_endd_dttm"	, row.getParameter("plan_edtm"			))		//작업종료일시
					.update("work_dvcd"			, row.getParameter("work_dvcd"			))		//작업구분코드
					.update("insp_wkct_yorn"	, row.getParameter("insp_wkct_yorn"		))		//검사공정여부
					.update("last_wkct_yorn"	, row.getParameter("last_wkct_yorn"		))		//최종공정여부
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))		//확정여부
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"			))		//설비ID
					.update("remk_text"			, row.getParameter("remk_text"			))		//비고
					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"			))		//재질
					.update("prog_stat_dvcd"	, "0"									)		//진행구분코드

					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;data.attach(Action.insert);
				data.execute();
				data.clear();

			if(qntt == 0) {
				data.param
					.table("prod_plan						")
					.where("where invc_numb		= :invc_numb")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"))		//invoice번호

					.update("line_stat"			, "2"							)		//상태
					.update("trst_qntt"			, new SqlParamText("trst_qntt + :new_trst_qntt " )).assign("new_trst_qntt" , row.getParameter("new_trst_qntt"	))		//의뢰수량


				;data.attach(Action.modify);
				data.execute();

			}else{
				data.param
					.table("prod_plan						")
					.where("where invc_numb		= :invc_numb")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"	))		//invoice번호

					.update("trst_qntt"			, new SqlParamText("trst_qntt + :new_trst_qntt " )).assign("new_trst_qntt" , row.getParameter("new_trst_qntt"	))		//의뢰수량
				;data.attach(Action.modify);
				data.execute();
			}
		}
		data.execute();
		return null ;
	}
}
