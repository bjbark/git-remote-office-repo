package com.sky.system.prod.order.prodorderv2;

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
import com.sky.listener.ParamToJson;


@Service
public class ProdOrderV2Service extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.invc_numb        , a.bzpl_idcd       , a.pdod_date        , a.acpt_numb			")
			.query("        , a.acpt_seqn        , a.cstm_idcd       , a.pdsd_numb        , a.item_idcd			")
			.query("        , a.pdsd_date        , a.wkfw_idcd       , a.bomt_degr        , a.remk_text			")
			.query("        , a.unit_idcd        , a.indn_qntt       , a.work_date        , a.pref_rank			")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.prod_bzpl_idcd   , a.prog_stat_dvcd	")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif       , a.strt_dttm								")
			.query("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
			// 2021.12.15 - 이강훈 - 수주수량 추가
			.query("        , ifnull(ai.invc_qntt, 0) as acpt_qntt												")
		;
		data.param
			.where("from pror_mast a																			")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join acpt_item ai on a.acpt_numb = ai.invc_numb and a.acpt_seqn = ai.line_seqn	")
			.where("where   1=1																					")
			.where("and     a.invc_numb = :invc_numb       " , arg.getParamText("invc_numb") )
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"))
			.where("and     a.pdod_date >= :pdod_date1     " , arg.getParamText("pdod_date1" ))
			.where("and     a.pdod_date <= :pdod_date2     " , arg.getParamText("pdod_date2" ))
			.where("and     a.strt_dttm >= :work_strt_dttm1   " , arg.getParamText("work_strt_dttm1" ))
			.where("and     a.strt_dttm <= :work_strt_dttm2   " , arg.getParamText("work_strt_dttm2" ))
			.where("and     a.line_stat   = :line_stat     " , arg.getParamText("line_stat"  ))
			.where("and     a.item_idcd   = :item_idcd     " , arg.getParamText("item_idcd"  ))
			.where("and     a.cstm_idcd   = :cstm_idcd     " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pdod_date desc , a.invc_numb desc								")
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
			.query("select    a.invc_numb        , a.bzpl_idcd        , a.item_idcd      , a.cstm_idcd				")
			.query("        , a.cvic_idcd        , a.bomt_degr        , a.optn_yorn      , a.optn_sbsc				")
			.query("        , a.optn_sbsc_valu   , a.plan_sttm        , a.plan_edtm      , a.plan_qntt				")
			.query("        , a.mngt_dept_idcd   , a.trst_dept_idcd   , a.trst_drtr_idcd , a.prod_trst_dvcd			")
			.query("        , a.prod_trst_numb   , a.trst_qntt        , a.stok_used_qntt , a.cmpl_reqt_date			")
			.query("        , a.curr_stok_qntt   , a.cofm_drtr_idcd   , a.cofm_date      , a.last_wker_idcd			")
			.query("        , a.last_work_date   , a.remk_text        , a.prod_qntt									")
			.query("        , a.user_memo        , a.sysm_memo        , a.line_stat									")
			.query("        , 0 as qntt																				")
			.query("        , ifnull(a.plan_qntt,0)-ifnull(a.prod_qntt,0) as stok_qntt								")
			.query("        , 0 as indn_qntt     , a.invc_numb as orig_invc_numb									")
			.query("        , a.cvic_name        , a.item_code        , a.item_name       , a.item_spec				")
			.query("        , a.unit_idcd        , a.unit_name														")
			.query("        , a.mold_idcd        , a.mtrl_bacd        , a.mold_code       , a.mtrl_name				")
			.query("        , a.prod_line_name																		")
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
			.where("        , a.line_stat        , w.wkfw_name as prod_line_name									")
			.where("        , (select sum(indn_qntt) from pror_item r where a.invc_numb = r.orig_invc_numb) as prod_qntt")
			.where("        , ifnull(a.plan_qntt,0) as stok_qntt													")
			.where("        , c.cvic_name        , u.unit_name														")
			.where("        , i.item_code        , i.item_name        , i.item_spec       , i.unit_idcd				")
			.where("        , d.mold_idcd        , d.mtrl_bacd        , m.mold_code       , b.base_name as mtrl_name")
			.where("from prod_plan a																				")
			.where("left outer join cvic_mast      c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast      u on i.unit_idcd = u.unit_idcd									")
			.where("left outer join item_adon      d on a.item_idcd = d.item_idcd									")
			.where("left outer join mold_mast      m on d.mold_idcd = m.mold_idcd									")
			.where("left outer join base_mast      b on d.mtrl_bacd = b.base_idcd									")
			.where("left outer join wkfw_clss      w on a.prod_line_idcd = w.wkfw_idcd								")
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
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.line_seqn        , a.lott_numb      , a.bzpl_idcd			")
			.query("        , a.wkfw_idcd        , a.wkfw_seqn        , a.wkct_idcd      , a.cvic_idcd			")
			.query("        , a.wkct_item_idcd   , a.mold_idcd        , a.mtrl_bacd      , a.dayn_dvcd			")
			.query("        , a.prod_dept_idcd   , a.orig_invc_numb   , a.cstm_idcd      , a.item_idcd			")
			.query("        , a.bomt_degr        , a.unit_idcd        , a.stok_used_qntt						")
			.query("        , a.indn_qntt        , a.plan_strt_dttm   , a.plan_endd_dttm , a.work_strt_dttm		")
			.query("        , a.work_endd_dttm   , a.work_dvcd        , a.insp_wkct_yorn , a.last_wkct_yorn		")
			.query("        , a.cofm_yorn        , a.remk_text        , a.prog_stat_dvcd , a.pckg_cotr_bacd		")
			.query("        , a.uper_seqn        , a.disp_seqn        , a.pref_rank								")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , i.item_name        , i.item_spec        , i.item_code								")
			.query("        , c.cstm_name        , b.bzpl_name        , w.wkct_name        , m.mold_name		")
			.query("        , it.item_name as wkct_item_name          , d.dept_name as prod_dept_name			")
			.query("        , u.unit_name        , bs.base_name as mtrl_bacd_name          , t.invc_qntt as acpt_qntt	")
			.query("        , SUBSTRING(a.plan_strt_dttm , 1,8) as plan_strt_date								")
			.query("        , SUBSTRING(a.plan_strt_dttm , 9)   as plan_strt_time								")
			.query("        , SUBSTRING(a.plan_endd_dttm , 1,8) as plan_endd_date								")
			.query("        , SUBSTRING(a.plan_endd_dttm , 9)   as plan_endd_time								")
			.query("        , case when a.otod_yorn  = '1' then (												")
			.query("          select  cstm_name from cstm_mast a 												")
			.query("          where   a.otod_cstm_yorn  = '1'		 											")
			.query("          and     a.cstm_idcd       = a.cvic_idcd											")
			.query("          and     a.line_stat       = '0')	 												")
			.query("          else v.cvic_name end as cvic_name	 												")
			.query("        , a.otod_yorn						 												")
			// 2021.12.15 - 이강훈 - 생산수량 추가
			.query("        , ifnull(wb.prod_qntt, 0) as prod_qntt						 						")
		;
		data.param
			.where("from pror_item a																				")
			.where("left outer join pror_mast  p  on a.invc_numb = p.invc_numb										")
			.where("left outer join acpt_item  t  on p.acpt_numb = t.invc_numb and p.acpt_seqn = t.line_seqn		")
			.where("left outer join cvic_mast  v  on a.cvic_idcd = v.cvic_idcd										")
			.where("left outer join item_mast  i  on a.item_idcd = i.item_idcd										")
			.where("left outer join cstm_mast  c  on a.cstm_idcd = c.cstm_idcd										")
			.where("left outer join bzpl_mast  b  on a.bzpl_idcd = b.bzpl_idcd										")
			.where("left outer join wkct_mast  w  on a.wkct_idcd = w.wkct_idcd										")
			.where("left outer join item_mast  it on a.wkct_item_idcd = it.item_idcd								")
			.where("left outer join mold_mast  m  on a.mold_idcd = m.mold_idcd										")
			.where("left outer join dept_mast  d  on a.prod_dept_idcd = d.dept_idcd									")
			.where("left outer join unit_mast  u  on a.unit_idcd = u.unit_idcd										")
			.where("left outer join (select * from base_mast where prnt_idcd = '3101') bs on a.mtrl_bacd = bs.base_code	")
			// 2021.12.15 - 이강훈 - 생산수량 추가
			.where("left outer join work_book wb  on a.invc_numb = wb.wkod_numb and a.line_seqn = wb.wkod_seqn		")
			.where("where 1=1																						")
			.where("and   a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"))
			.where("and   a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 지시서파일 찾기
	 */
	public SqlResultMap getInsp(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select  a.cstm_idcd,  a.rprt_dvcd,  a.rprt_file_name	")
		.where("from  cstm_rprt a										")
		.where("where 1=1												")
		.where("and   a.cstm_idcd = :cstm_idcd",arg.getParameter("cstm_idcd"))
		.where("and   a.rprt_dvcd = :rprt_dvcd",arg.getParameter("rprt_dvcd"))
		.where("and   a.a.rprt_file_name = :rprt_file_name",arg.getParameter("rprt_file_name"))

		;
		return data.selectForMap();
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
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.prod_bzpl_idcd   , a.prog_dvcd			")
			.query("        , a.remk_text																		")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , b.work_strt_dttm   , b.work_endd_dttm  , b.insp_wkct_yorn							")
			.query("        , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
		;
		data.param
			.where("from pror_mast a																			")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("        , (select invc_numb 																")
			.where("                , min(work_strt_dttm)   as work_strt_dttm									")
			.where("                , max(work_endd_dttm)   as work_endd_dttm									")
			.where("                , max(insp_wkct_yorn)   as insp_wkct_yorn									")
			.where("           from   pror_item																	")
			.where("           group by invc_numb																")
			.where("           ) b																				")
			.where("where   1=1																					")
			.where("and     a.invc_numb  =  b.invc_numb															")
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
			.update("pdsd_numb"			, row.getParameter("pdsd_numb"			))		//생산계획번호
			.update("pdsd_date"			, row.getParameter("pdsd_date"			))		//생산계획일자
			.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
			.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))		//공정흐름ID
			.update("bomt_degr"			, row.getParameter("bomt_degr"			))		//BOM차수
			.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
			.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
			.update("work_date"			, row.getParameter("work_date"			))		//작업일자
			.update("stnd_unit"			, row.getParameter("stnd_unit"			))		//기준단위
			.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
			.update("prod_bzpl_idcd"	, row.getParameter("prod_bzpl_idcd"		))		//생산사업장ID
			.update("prog_dvcd"			, row.getParameter("prog_dvcd"			))		//진행구분코드
			.update("remk_text"			, row.getParameter("remk_text"			))		//비고

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
			.update("bomt_degr"			, row.getParameter("bomt_degr"			))		//BOM차수
			.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
			.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
			.update("plan_strt_dttm"	, row.getParameter("plan_sttm"			))		//
			.update("plan_endd_dttm"	, row.getParameter("plan_edtm"			))		//
			.update("work_dvcd"			, row.getParameter("work_dvcd"			))		//작업구분코드
			.update("insp_wkct_yorn"	, row.getParameter("insp_wkct_yorn"		))		//검사공정여부
			.update("last_wkct_yorn"	, row.getParameter("last_wkct_yorn"		))		//최종공정여부
			.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))		//확정여부
			.update("remk_text"			, row.getParameter("remk_text"			))		//비고
			.update("pref_rank"			, row.getParameter("pref_rank"			))		//우선순위

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
	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			String plan_strt_dttm = row.getParamText("plan_strt_date")+row.getParamText("plan_strt_time").replaceAll(":","");

			data.param
				.table("pror_item													")
				.where("where invc_numb = :invc_numb								")		//invoice번호
				.where("and   line_seqn = :line_seqn								")		//invoice번호

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))

				.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))		//사업장ID
				.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))		//공정흐름ID
				.update("wkfw_seqn"			, row.getParameter("wkfw_seqn"			))		//공정흐름순번
				.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))		//공정ID
				.update("cvic_idcd"			, row.getParameter("cvic_idcd"			))		//설비ID
				.update("wkct_item_idcd"	, row.getParameter("wkct_item_idcd"		))		//공정품목ID
				.update("mold_idcd"			, row.getParameter("mold_idcd"			))		//금형ID
				.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"			))		//재질분류코드
				.update("dayn_dvcd"			, row.getParameter("dayn_dvcd"			))		//주야구분코드
				.update("prod_dept_idcd"	, row.getParameter("prod_dept_idcd"		))		//생산부서ID
				.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))		//원INVOICE번호
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))		//거래처ID
				.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
				.update("bomt_degr"			, row.getParameter("bomt_degr"			))		//BOM차수
				.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
				.update("acpt_qntt"			, row.getParameter("acpt_qntt"			))		//수주수량
				.update("stok_used_qntt"	, row.getParameter("stok_used_qntt"		))		//재고사용수량
				.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
				.update("plan_strt_dttm"	, plan_strt_dttm						)		//계획시작일시
				.update("plan_endd_dttm"	, row.getParameter("plan_endd_dttm"		))		//계획종료일시
//				.update("work_strt_dttm"	, row.getParameter("work_strt_dttm"		))		//작업시작일시
//				.update("work_endd_dttm"	, row.getParameter("work_endd_dttm"		))		//작업종료일시
				.update("work_dvcd"			, row.getParameter("dayn_dvcd"			))		//작업구분코드   주야구분코드와 동일하게 저장한다.
				.update("insp_wkct_yorn"	, row.getParameter("insp_wkct_yorn"		))		//검사공정여부
				.update("last_wkct_yorn"	, row.getParameter("last_wkct_yorn"		))		//최종공정여부
				.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))		//확정여부
				.update("remk_text"			, row.getParameter("remk_text"			))		//비고
				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"		))		//진행상태구분코드
				.update("pckg_cotr_bacd"	, row.getParameter("pckg_cotr_bacd"		))		//포장용기분류코드
				.update("uper_seqn"			, row.getParameter("uper_seqn"			))		//상위순번
				.update("disp_seqn"			, row.getParameter("disp_seqn"			))		//표시순번
				.update("pref_rank"			, row.getParameter("pref_rank"			))		//우선순위


				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;data.attach(Action.update);
		}
		data.execute();
		return null ;
	}
	public SqlResultMap setProdIstt(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String param = "";
		ParamToJson trans = new ParamToJson();
		param = trans.TranslateAll(arg);

		data.param
			.query("call auto_prod_istt(		")
			.query(" :param	", param			 )
			.query(")							")
		;
		data.attach(Action.direct);
		data.execute();
		return null ;
	}

	public SqlResultMap setQntt(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.table("pror_mast													")
			.where("where invc_numb = :invc_numb								")		//invoice번호

			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))

			.update("indn_qntt"			, arg.getParameter("indn_qntt"			))
		;
		data.attach(Action.update);
		data.execute();

		data.param
			.table("pror_item													")
			.where("where invc_numb = :invc_numb								")		//invoice번호

			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))

			.update("indn_qntt"			, arg.getParameter("indn_qntt"			))
		;
		data.attach(Action.update);
		data.execute();

		return null ;
	}
}
