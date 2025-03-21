package com.sky.system.custom.sjflv.prod.prodorder;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;
import com.sky.listener.ParamToJson;


@Service("sjflv.ProdOrderService")
public class ProdOrderService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
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
			.query("        , a.prod_qntt        , SUBSTRING(a.plan_sttm, 1, 8) AS pdsd_date						")
			.query("        , a.user_memo        , a.sysm_memo        , a.line_stat									")
			.query("        , 0 as qntt																				")
			.query("        , ifnull(a.plan_qntt,0)-ifnull(a.prod_qntt,0) as stok_qntt								")
			.query("        , a.indn_qntt        , a.invc_numb as orig_invc_numb									")
			.query("        , a.cvic_name        , a.item_code        , a.item_name       , a.item_spec				")
			.query("        , a.unit_idcd        , a.unit_name														")
			.query("        , a.mold_idcd        , a.mtrl_bacd        , a.mold_code       , a.mtrl_name				")
			.query("        , a.pckg_cotr_name   , a.pckg_cotr_bacd   , a.acpt_seqn       , a.acpt_numb				")
			.query("        , a.lott_numb        , a.stok_used        , a.deli_date	      , a.acpt_qntt				")
			.query("        , a.pckg_unit        , a.labl_qntt        , a.make_mthd	      , a.stok_asgn_qntt		")
			.query("        , a.plan_baln_qntt   , a.pdod_date														")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb        , a.bzpl_idcd        , a.item_idcd      , a.cstm_idcd				")
			.where("        , a.cvic_idcd        , a.bomt_degr        , a.optn_yorn      , a.optn_sbsc				")
			.where("        , a.optn_sbsc_valu   , a.plan_sttm        , a.plan_edtm      , a.plan_qntt				")
			.where("        , a.mngt_dept_idcd   , a.trst_dept_idcd   , a.trst_drtr_idcd							")
			.where("        , a.prod_trst_numb   , a.trst_qntt        , a.stok_used_qntt , a.cmpl_reqt_date			")
			.where("        , a.curr_stok_qntt   , a.cofm_drtr_idcd   , a.cofm_date      , a.last_wker_idcd			")
			.where("        , a.last_work_date   , a.remk_text        , a.user_memo      , a.sysm_memo				")
			.where("        , a.line_stat        , SUBSTRING(a.plan_sttm, 1, 8) as pdod_date						")
			.where("        , (select sum(indn_qntt) from pror_item r where a.invc_numb = r.orig_invc_numb) as prod_qntt")
			.where("        , ifnull(a.plan_qntt,0) as stok_qntt													")
			.where("        , c.cvic_name        , u.unit_name        , ai.stok_asgn_qntt							")
			.where("        , i.item_code        , i.item_name        , i.item_spec       , i.unit_idcd				")
			.where("        , a.mold_idcd        , a.mtrl_bacd        , m.mold_code       , a.pckg_cotr_bacd		")
			.where("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code					")
			.where("                                             and   r.prnt_idcd = '3101')   as mtrl_name			")
			.where("        , (select base_name from base_mast r where a.pckg_cotr_bacd  = r.base_code				")
			.where("                                             and   r.prnt_idcd = '8004')   as pckg_cotr_name	")
			.where("        , p.acpt_seqn        , p.acpt_numb        , p.lott_numb       , a.indn_qntt				")
			.where("        , (Select																				")
			.where("                 CASE																			")
			.where("                 WHEN (SELECT SUM(z.stok_qntt) FROM lot_isos_sum z WHERE z.item_idcd = a.item_idcd) >= 1 	")
			.where("                 THEN 'Y'																		")
			.where("                 ELSE 'N'																		")
			.where("                 END AS stok_used ) as stok_used												")
			.where("        , ai.deli_date       , sum(ai.invc_qntt) as acpt_qntt									")
			.where("        , json_value(am.json_data, '$.prod_trst_dvcd') as prod_trst_dvcd						")
			.where("        , json_value(a.json_data, '$.pckg_unit') as pckg_unit									")
			.where("        , json_value(a.json_data, '$.labl_qntt') as labl_qntt									")
			.where("        , ibs.make_mthd        , sum(p.plan_baln_qntt) as plan_baln_qntt						")
			.where("from prod_plan a																				")
			.where("left outer join cvic_mast      c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast      u on i.unit_idcd = u.unit_idcd									")
			.where("left outer join item_adon      d on a.item_idcd = d.item_idcd									")
			.where("left outer join mold_mast      m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join prod_plan_acpt p on a.invc_numb = p.invc_numb									")
			.where("left outer join acpt_mast     am on p.acpt_numb = am.invc_numb									")
			.where("left outer join acpt_item     ai on p.acpt_numb = ai.invc_numb and p.acpt_seqn = ai.line_seqn	")
			.where("left outer join item_base_spec ibs on i.item_idcd = ibs.item_idcd								")
			.where("left outer join pror_mast     pm on a.invc_numb = pm.pdsd_numb									")
			.where("where 1=1																						")
			.where("and   pm.pdsd_numb IS NULL or pm.pdsd_numb = ''													")
			.where("and   pdod_date >= :pdod_date1	   " , arg.getParamText("pdod_date1" ))
			.where("and   pdod_date <= :pdod_date2	   " , arg.getParamText("pdod_date2" ))
			.where("and   a.cstm_idcd  = :cstm_idcd     " , arg.getParamText("cstm_idcd"  ))
			.where("and   a.deli_date >= :deli1_date    " , arg.getParamText("deli1_date" ))
			.where("and   a.deli_date <= :deli2_date    " , arg.getParamText("deli2_date" ))
			.where("and   am.invc_date >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and   am.invc_date <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("and   JSON_VALUE(am.json_data, '$.prod_trst_dvcd' ) = :prod_trst_dvcd   " , arg.getParamText("prod_trst_dvcd" ))
			.where("and   am.acpt_dvcd  = :acpt_dvcd    " , arg.getParamText("acpt_dvcd" ))
//			.where("and   a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																			")
			.where(") a																								")
			.where("where ifnull(a.plan_qntt,0) > ifnull(a.prod_qntt,0)												")  // 지시 잔량이 있는 자료만 Select 한다.
			.where("and   a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.wkod_dvcd       , a.lott_numb       , a.bzpl_idcd			")
			.query("        , a.pdod_date       , a.acpt_numb       , a.acpt_amnd_degr  , a.prog_stat_dvcd		")
			.query("        , a.acpt_seqn       , a.cstm_idcd       , a.pdsd_numb       , a.pdsd_date			")
			.query("        , a.pref_rank       , a.item_idcd       , a.wkfw_idcd       , a.bomt_degr			")
			.query("        , a.unit_idcd       , a.strt_dttm       , a.endd_dttm       , a.indn_qntt			")
			.query("        , a.indn_qntt_1fst	, a.work_date       , a.stnd_unit       , a.stnd_unit_qntt		")
			.query("        , a.prod_bzpl_idcd  , a.prog_stat_dvcd  , a.remk_text								")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd       , a.crte_urif													")
			.query("        , JSON_VALUE(a.json_data, '$.pckg_unit' ) as pckg_unit								")
			.query("        , JSON_VALUE(a.json_data, '$.labl_qntt' ) as labl_qntt								")
			.query("        , b.work_strt_dttm  , b.work_endd_dttm  , b.insp_wkct_yorn   , p.stok_used_qntt		")
			.query("        , p.plan_strt_dttm  , p.plan_endd_dttm												")
			.query("        , c.cstm_name       , i.item_code       , i.item_name        , i.item_spec			")
			.query("        , (select sum(prod_qntt) from work_book w where a.invc_numb = w.wkod_numb) as prod_qntt	")
			.query("        , CASE																				")
			.query("              WHEN z.duplicate_count > 1 THEN 1												")
			.query("              ELSE 0 																		")
			.query("          END AS yorn 																		")
			.query("        , d.cvic_name																		")
			.query("        , u.user_name as drtr_name															")
			.query("        , w.invc_numb as work_invc															")
		;
		data.param
			.where("from pror_mast a																			")
			.where("left outer join pror_item p  on a.invc_numb = p.invc_numb									")
			.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cvic_mast d  on p.cvic_idcd = d.cvic_idcd									")
			.where("left outer join item_mast i  on p.item_idcd = i.item_idcd									")
			.where("left outer join user_mast u  on JSON_VALUE(a.json_data, '$.wker_idcd' ) = u.user_idcd		")
			.where("left outer join work_book w  on a.invc_numb = w.wkod_numb									")
			.where("left outer join acpt_mast am on am.invc_numb = a.acpt_numb									")
			.where("left outer join acpt_item ai on ai.invc_numb = am.invc_numb									")

			.where("left outer join (																			")
			.where("             SELECT acpt_numb, COUNT(*) AS duplicate_count								 	")
			.where("             FROM prod_plan_acpt															")
			.where("             group by acpt_numb																")
			.where("      ) z ON a.acpt_numb = z.acpt_numb														")
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
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     am.deli_date >= :deli1_date    " , arg.getParamText("deli1_date" ))
			.where("and     am.deli_date <= :deli2_date    " , arg.getParamText("deli2_date" ))
			.where("and     am.invc_date >= :invc1_date    " , arg.getParamText("invc1_date" ))
			.where("and     am.invc_date <= :invc2_date    " , arg.getParamText("invc2_date" ))
			.where("and     JSON_VALUE(am.json_data, '$.prod_trst_dvcd' ) = :prod_trst_dvcd   " , arg.getParamText("prod_trst_dvcd" ))
			.where("and     am.acpt_dvcd  = :acpt_dvcd     " , arg.getParamText("acpt_dvcd" ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
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

			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "pror_mast_json_fields");

			ParamToJson trans2 = new ParamToJson();
			String json_data2 = trans2.Translate(arg, "work_book_json_fields");

			data.param
				.table("pror_mast													")
				.where("where invc_numb = :invc_numb								")		//invoice번호

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))

				.update("wkod_dvcd"			, row.getParameter("wkod_dvcd"			))		//작업지시구분코드
				.update("lott_numb"			, row.getParameter("lott_numb"			))		//Lot No.
				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))		//사업장ID
				.update("pdod_date"			, row.getParameter("pdod_date"			))		//생산지시일자
				.update("acpt_numb"			, row.getParameter("acpt_numb"			))		//수주번호
				.update("acpt_numb_degr"	, row.getParameter("acpt_numb_degr"		))		//수주 AMD 차수
				.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))		//수주순번

				.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))		//거래처ID
				.update("pdsd_numb"			, row.getParameter("pdsd_numb"			))		//생산계획번호
				.update("pdsd_date"			, row.getParameter("pdsd_date"			))		//생산계획일자
				.update("pref_rank"			, row.getParameter("pref_rank"			))		//우선순위

				.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
				.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))		//공정흐름ID
				.update("bomt_degr"			, row.getParameter("bomt_degr"			))		//BOM차수
				.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
				.update("strt_dttm"			, row.getParameter("work_strt_dttm"		))		//계획시작일시
				.update("endd_dttm"			, row.getParameter("work_endd_dttm"		))		//계획종료일시
				.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
				.update("indn_qntt_1fst"	, row.getParameter("indn_qntt_1fst"		))		//지시수량1
				.update("work_date"			, row.getParameter("work_date"			))		//작업일자
				.update("stnd_unit"			, row.getParameter("stnd_unit"			))		//기준단위
				.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
				.update("prod_bzpl_idcd"	, row.getParameter("prod_bzpl_idcd"		))		//생산사업장ID
				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"		))		//진행구분코드
				.update("remk_text"			, row.getParameter("remk_text"			))		//비고
				.update("last_insp_yorn"	, row.getParameter("last_insp_yorn"		))		//최종검사여부
				.update("last_insp_date"	, row.getParameter("last_insp_date"		))		//최종검사일자
				.update("pckg_cotr_bacd"	, row.getParameter("pckg_cotr_bacd"		))		//포장용기

				.update("json_data"			, json)

				.update("user_memo"			, row.getParameter("user_memo"			))		//비고
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
				.table("pror_item						")
				.where("where invc_numb		= :invc_numb")		//invoice번호
				.where("and   line_seqn		= :line_seqn")		//순번

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
				.unique("line_seqn"			, 1										)		//순번

				.update("lott_numb"			, row.getParameter("lott_numb"			))		//Lot No.
				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))		//사업장ID
				.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))		//공정흐름ID
				.update("wkfw_seqn"			, row.getParameter("wkfw_seqn"			))		//공정흐름seqn
				.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))		//공정ID
				.update("cvic_idcd"			, row.getParameter("cvic_idcd"			))		//설비ID
				.update("otod_yorn"			, row.getParameter("otod_yorn"			))		//외주여부
				.update("otod_cstm_idcd"	, row.getParameter("otod_cstm_idcd"		))		//외주거래처ID
				.update("wkct_item_idcd"	, row.getParameter("wkct_item_idcd"		))		//공정품목ID
				.update("mold_idcd"			, row.getParameter("mold_idcd"			))		//금형ID
				.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"			))		//재질코드
				.update("dayn_dvcd"			, row.getParameter("dayn_dvcd"			))		//주야구분코드
				.update("prod_dept_idcd"	, row.getParameter("prod_dept_idcd"		))		//생산부서ID
				.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))		//거래처ID
				.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
				.update("bomt_degr"			, row.getParameter("bomt_degr"			))		//BOM차수
				.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
				.update("acpt_qntt"			, row.getParameter("acpt_qntt"			))		//수주수량
				.update("stok_used_qntt"	, row.getParameter("stok_used_qntt"		))		//재고사용수량
				.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
				.update("indn_qntt_1fst"	, row.getParameter("indn_qntt_1fst"		))		//지시수량1
				.update("plan_strt_dttm"	, row.getParameter("plan_strt_dttm"		))		//계획시작일시
				.update("plan_endd_dttm"	, row.getParameter("plan_endd_dttm"		))		//계획종료일시
				.update("pref_rank"			, row.getParameter("pref_rank"			))		//우선순위
				.update("work_strt_dttm"	, row.getParameter("work_strt_dttm"		))		//작업시작일시
				.update("work_endd_dttm"	, row.getParameter("work_endd_dttm"		))		//작업종료일시
				.update("work_dvcd"			, row.getParameter("work_dvcd"			))		//작업구분코드
				.update("insp_wkct_yorn"	, row.getParameter("insp_wkct_yorn"		))		//검사공정여부
				.update("last_wkct_yorn"	, row.getParameter("last_wkct_yorn"		))		//최종공정여부
				.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))		//확정여부
				.update("remk_text"			, row.getParameter("remk_text"			))		//비고
				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"		))		//진행구분코드
				.update("pckg_cotr_bacd"	, row.getParameter("pckg_cotr_bacd"		))		//포장용기분류코드
				.update("user_memo"			, row.getParameter("user_memo"			))		//비고
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"				, row.fixParameter("new_invc_numb"	))

				.update("invc_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
				.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"		))

				.update("prod_dept_idcd"		, row.getParameter("prod_dept_idcd"	))
				.update("cstm_idcd"				, row.getParameter("cstm_idcd"		))
				.update("wkfw_idcd"				, row.getParameter("wkfw_idcd"		))
				.update("wkct_idcd"				, row.getParameter("wkct_idcd"		))
				.update("cvic_idcd"				, row.getParameter("cvic_idcd"		))
				.update("mold_idcd"				, row.getParameter("mold_idcd"		))
				.update("item_idcd"				, row.getParameter("item_idcd"		))
				.update("mtrl_bacd"				, arg.getParameter("mtrl_bacd"		))
				.update("cavity"				, row.getParameter("cavity"			))
				.update("pdsd_numb"				, row.getParameter("pdsd_numb"		))
				.update("wkod_numb"				, row.getParameter("wkod_numb"		))
				.update("wkod_seqn"				, row.getParameter("wkod_seqn"		))
				.update("dayn_dvcd"				, row.getParameter("dayn_dvcd"		))
				.update("indn_qntt"				, row.getParameter("indn_qntt"		))
				.update("prod_qntt"				, row.getParameter("prod_qntt"		))
				.update("good_qntt"				, row.getParameter("good_qntt"		))
				.update("poor_qntt"				, row.getParameter("poor_qntt"		))
				.update("theo_qntt"				, row.getParameter("theo_qntt"		))
				.update("succ_qntt"				, row.getParameter("succ_qntt"		))
				.update("ostt_qntt"				, row.getParameter("ostt_qntt"		))
				.update("stok_qntt"				, row.getParameter("stok_qntt"		))
				.update("indn_qntt_1fst"		, row.getParameter("indn_qntt_1fst"	))
				.update("prod_qntt_1fst"		, row.getParameter("prod_qntt_1fst"	))
				.update("good_qntt_1fst"		, row.getParameter("good_qntt_1fst"	))
				.update("poor_qntt_1fst"		, row.getParameter("poor_qntt_1fst"	))
				.update("succ_qntt_1fst"		, row.getParameter("succ_qntt_1fst"	))
				.update("ostt_qntt_1fst"		, row.getParameter("ostt_qntt_1fst"	))
				.update("stok_qntt_1fst"		, row.getParameter("stok_qntt_1fst"	))
				.update("work_strt_dttm"		, row.getParameter("work_strt_dttm"	))
				.update("work_endd_dttm"		, row.getParameter("work_endd_dttm"	))
				.update("need_time"				, row.getParameter("need_time"		))
				.update("work_mnhr"				, row.getParameter("work_mnhr"		))
				.update("cycl_time"				, row.getParameter("cycl_time"		))
				.update("wker_idcd"				, row.getParameter("wker_idcd"		))
				.update("work_pcnt"				, row.getParameter("work_pcnt"		))
				.update("lott_numb"				, row.getParameter("lott_numb"		))
				.update("rewd_objt_qntt"		, row.getParameter("rewd_objt_qntt"	))
				.update("work_cond_1fst"		, row.getParameter("work_cond_1fst"	))
				.update("work_cond_2snd"		, row.getParameter("work_cond_2snd"	))
				.update("work_cond_3trd"		, row.getParameter("work_cond_3trd"	))
				.update("work_cond_4frt"		, row.getParameter("work_cond_4frt"	))
				.update("work_cond_5fit"		, row.getParameter("work_cond_5fit"	))
				.update("work_cond_6six"		, row.getParameter("work_cond_6six"	))
				.update("work_cond_7svn"		, row.getParameter("work_cond_7svn"	))
				.update("stun_prod_qntt"		, row.getParameter("stun_prod_qntt"	))
				.update("stun_good_qntt"		, row.getParameter("stun_good_qntt"	))
				.update("stun_poor_qntt"		, row.getParameter("stun_poor_qntt"	))
				.update("work_dvcd"				, row.getParameter("work_dvcd"	))
				.update("wkct_insp_yorn"		, row.getParameter("wkct_insp_yorn"	))
				.update("last_wkct_yorn"		, row.getParameter("last_wkct_yorn"	))
				.update("work_para"				, row.getParameter("work_para"		))
				.update("mtrl_ivst_yorn"		, row.getParameter("mtrl_ivst_yorn"	))
				.update("prog_stat_dvcd"		, row.getParameter("prog_stat_dvcd"	))
				.update("dsct_resn_dvcd"		, row.getParameter("dsct_resn_dvcd"	))
				.update("json_data"				, json_data2)

				.update("user_memo"				, row.getParameter("user_memo")) /* ROW레벨 */
				.update("sysm_memo"				, row.getParameter("sysm_memo")) /* ROW순서 */
				.update("prnt_idcd"				, row.getParameter("prnt_idcd")) /* ROW상태 */
				.update("line_levl"				, row.getParameter("line_levl")) /* ROW레벨 */
				.update("line_ordr"				, row.getParameter("line_ordr")) /* ROW순서 */
				.update("line_stat"				, row.getParameter("line_stat")) /* ROW상태 */
				.update("line_clos"				, row.getParameter("line_clos")) /* 마감여부 */
				.update("find_name"				, row.getParamText("invc_numb"	).trim()
												+ " "
												+ row.getParamText("work_date"	).trim()
												+ " "
												+ row.getParamText("lott_numb"	).trim())
				.update("updt_user_name"		, row.getParameter("updt_user_name")) /* 수정사용자명 */
				.update("updt_ipad"				, row.getParameter("updt_ipad")) /* 수정IP */
				.update("updt_idcd"				, row.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_urif"				, row.getParameter("updt_urif")) /* 수정UI */
				.insert("crte_user_name"		, row.getParameter("crte_user_name")) /* 생성사용자명 */
				.insert("crte_ipad"				, row.getParameter("crte_ipad")) /* 생성IP */
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
				.insert("crte_idcd"				, row.getParameter("crte_idcd")) /* 생성ID */
				.insert("crte_urif"				, row.getParameter("crte_urif")) /* 생성UI */
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			setBookMtrl(arg);

		}
		data.execute();
		return null ;
	}

	//원재료 출고
	public SqlResultMap setBookMtrl(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records2", SqlResultMap.class);

		for (SqlResultRow row : map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if(rowaction==Action.delete){
//				data.param
//					.table("work_book_mtrl")
//					.where("where invc_numb = :invc_numb")
//					.where("and   line_seqn = :line_seqn")
//
//					.unique("invc_numb",  row.fixParameter("work_numb"))
//					.unique("line_seqn",  row.fixParameter("work_seqn"))
//				;
//				data.attach(Action.delete);
//
//				data.param
//					.table("mtrl_ostt_item")
//					.where("where invc_numb = :invc_numb")
//					.where("and   line_seqn = :line_seqn")
//
//					.unique("invc_numb",  row.fixParameter("work_numb"))
//					.unique("line_seqn",  row.fixParameter("work_seqn"))
//				;
//				data.attach(Action.delete);
//
//				data.param
//					.table("work_book")
//					.where("where invc_numb = :invc_numb")
//
//					.unique("invc_numb",  row.fixParameter("work_numb"))
//				;
//				data.attach(Action.delete);
//
//				data.param
//					.table("isos_book")
//					.where("where invc_numb = :invc_numb")
//					.where("and   line_seqn = :line_seqn")
//
//					.unique("invc_numb",  row.fixParameter("work_numb"))
//					.unique("line_seqn",  row.fixParameter("work_seqn"))
//				;
//				data.attach(Action.delete);
//
//				data.param
//					.table("lot_isos_book")
//					.where("where invc_numb = :invc_numb")
//					.where("and   line_seqn = :line_seqn")
//
//					.unique("invc_numb",  row.fixParameter("work_numb"))
//					.unique("line_seqn",  row.fixParameter("work_seqn"))
//				;
//				data.attach(Action.delete);
//				data.execute();
//				data.clear();
			}else{
				data.param
					.table("mtrl_ostt_mast")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"				, row.fixParameter("new_invc_numb"		))

					.update("invc_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"		))
					.update("ostt_dvcd"				, "2100")
					.update("orig_invc_numb"		, row.getParameter("invc_numb"		))
					.update("orig_seqn"				, row.getParameter("line_seqn"		))
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"		))
					.update("drtr_idcd"				, row.getParameter("wker_idcd"		))
					.update("prnt_idcd"				, row.getParameter("orig_invc_numb"	))

					.update("updt_idcd"				, row.getParameter("wker_idcd"		))
					.insert("crte_idcd"				, row.getParameter("wker_idcd"		))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("work_book_mtrl")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"				, row.fixParameter("new_invc_numb"		))
					.unique("line_seqn"				, row.fixParameter("line_seqn"		))

					.update("item_idcd"				, row.getParameter("item_idcd"		))
					.update("lott_numb"				, row.getParameter("lott_numb"		))
					.update("ivst_qntt"				, row.getParameter("ivst_qntt"		))
					.update("unit_idcd"				, row.getParameter("unit_idcd"		))
					.update("prnt_idcd"				, row.getParameter("orig_invc_numb"	))

					.update("updt_idcd"				, row.getParameter("wker_idcd"		))
					.insert("crte_idcd"				, row.getParameter("wker_idcd"		))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("mtrl_ostt_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"				, row.fixParameter("new_invc_numb"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("wkod_numb"				, row.getParameter("orig_invc_numb"	))
					.update("item_idcd"				, row.getParameter("item_idcd"		))
					.update("lott_numb"				, row.getParameter("lott_numb"		))
					.update("ostt_qntt"				, row.getParameter("ivst_qntt"		))
					.update("ostt_wrhs_idcd"		, "02")
					.update("oem_yorn"				, row.getParameter("oem_yorn"		))

					.update("updt_idcd"				, row.getParameter("wker_idcd"		))
					.insert("crte_idcd"				, row.getParameter("wker_idcd"		))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
			sequence.setBook(arg, (String)row.fixParameter("new_invc_numb"),row.getParamCast("line_seqn", Integer.class).intValue(), "생산출고");
		}
		return null;
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("pror_mast											")
			.where("WHERE invc_numb = :invc_numb						")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"	))

			.update("line_stat"			, arg.getParameter("line_stat"	))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("pror_item											")
			.where("WHERE invc_numb = :invc_numb						")
			.where("and   line_seqn	= :line_seqn						")		//invoice번호

			.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"	))

			.update("line_stat"			, arg.getParameter("line_stat"	))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("mtrl_ostt_mast")
			.where("where invc_numb = :invc_numb	")

			.unique("invc_numb", arg.fixParameter("work_invc"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("mtrl_ostt_item")
			.where("where invc_numb = :invc_numb	")

			.unique("invc_numb", arg.fixParameter("work_invc"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("work_book")
			.where("where invc_numb = :invc_numb	")

			.unique("invc_numb", arg.fixParameter("work_invc"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("work_book_mtrl")
			.where("where invc_numb = :invc_numb	")

			.unique("invc_numb", arg.fixParameter("work_invc"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("isos_book")
			.where("where invc_numb = :invc_numb	")

			.unique("invc_numb", arg.fixParameter("work_invc"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("lot_isos_book")
			.where("where invc_numb = :invc_numb	")

			.unique("invc_numb", arg.fixParameter("work_invc"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		return null;
	}
}
