package com.sky.system.custom.kitec.prod.prodplanv2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service("kitec.ProdPlanV2Service")
public class ProdPlanV2Service  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String add = "";
		if(arg.getParamText("add").equals("on")){
			add = "1";
		}else{
			add = "0";
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select  a.invc_numb        , a.amnd_degr          , a.line_seqn          , a.item_idcd		")
			.where("      , a.unit_idcd        , a.orig_invc_numb     , a.orig_seqn          , a.orig_invc_qntt	")
			.where("      , a.optn_dvcd        , a.optn_psbl_yorn     , a.optn_adtn          , a.pric_adpt		")
			.where("      , a.norm_sale_pric   , a.sale_stnd_pric     , a.invc_qntt          , a.invc_pric		")
			.where("      , a.vatx_incl_yorn   , a.vatx_rate          , a.sply_amnt          , a.vatx_amnt		")
			.where("      , a.invc_amnt        , a.krwn_amnt          , a.krwn_vatx          , a.krwn_ttsm_amnt	")
			.where("      , a.stnd_unit        , a.stnd_unit_qntt     , a.wrhs_idcd          , a.dlvy_cstm_idcd	")
			.where("      , a.deli_date        , a.deli_chge_dvcd     , a.deli_chge_resn     , a.pcod_numb		")
			.where("      , a.cstm_offr_date   , a.cstm_deli_date     , a.cstm_lott_numb     , a.dlvy_date		")
			.where("      , a.dlvy_hhmm        , a.remk_text          , a.ostt_dvcd          , a.ostt_qntt		")
			.where("      , a.sale_qntt        , a.dsct_qntt          , a.dlvy_memo          , a.uper_seqn		")
			.where("      , a.disp_seqn        , (ifnull(a.invc_qntt,0) - ifnull(a.ostt_qntt,0)) as qntt		")
			.where("      , a.user_memo        , a.sysm_memo          , a.prnt_idcd          , a.line_levl		")
			.where("      , a.line_ordr        , a.line_stat          , a.line_clos          , a.find_name		")
			.where("      , a.updt_user_name   , a.updt_ipad          , a.updt_dttm          , a.updt_idcd		")
			.where("      , a.updt_urif        , a.crte_user_name     , a.crte_ipad          , a.crte_dttm		")
			.where("      , b.invc_date        , b.dept_idcd          , b.cstm_idcd          , t.tele_numb		")
			.where("      , i.item_code        , i.item_name          , i.item_spec          , t.cstm_name		")
			.where("      , m.mold_name        , b.cstm_drtr_name     , i.rpst_item_idcd						")
			.where("      , i.lcls_idcd as item_lcls_idcd             , d.mold_idcd        , d.mtrl_bacd		")
			.where("      , i.scls_idcd as item_scls_idcd             , i.mcls_idcd as item_mcls_idcd			")
			.where("      , a.crte_idcd        , a.crte_urif													")
		;
		data.param
			.where("from  acpt_item a																			")
			.where("left  outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left  outer join cstm_mast t on b.cstm_idcd = t.cstm_idcd									")
			.where("left  outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left  outer join item_adon d on a.item_idcd = d.item_idcd									")
			.where("left  outer join mold_mast m on d.mold_idcd = m.mold_idcd									")
			.where("where  1=1																					")
			.where("and    b.acpt_stat_dvcd = '0011'															")
			.where("and    i.find_name like %:find_name%	"	, arg.getParamText("find_name"))
			.where("and    ifnull(a.deli_date , b.deli_date) >= :deli_date1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("date")))
			.where("and    ifnull(a.deli_date , b.deli_date) <= :deli_date2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("date")))
			.where("and    ifnull(b.invc_date , b.deli_date) >= :invc_date1" , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("date")))
			.where("and    ifnull(b.invc_date , b.deli_date) <= :invc_date2" , arg.getParamText("to_dt"), "2".equals(arg.getParamText("date")))
			.where("and    a.cstm_lott_numb like %:cstm_lott_numb%" , arg.getParamText("cstm_lott_numb"))	//lot번호
			.where("and    a.item_idcd      =:item_idcd"            , arg.getParamText("item_idcd"))		//품목ID
			.where("and    b.ordr_dvcd      =:ordr_dvcd"            , arg.getParamText("ordr_dvcd"))		//주문상태
			.where("and    a.invc_numb like %:search_name1%"        , arg.getParamText("search_name"), "1".equals(arg.getParamText("search_id")))		//주문번호
			.where("and    t.cstm_name like %:search_name2%"        , arg.getParamText("search_name"), "2".equals(arg.getParamText("search_id")))		//고객명
			.where("and    t.tele_numb like %:search_name3%"        , arg.getParamText("search_name"), "3".equals(arg.getParamText("search_id")))		//고객번호
			.where("and    a.user_memo like %:search_name4%"        , arg.getParamText("search_name"), "4".equals(arg.getParamText("search_id")))		//메모
			.where("and    b.cstm_idcd      =:cstm_idcd"            , arg.getParamText("cstm_idcd"))		//고객
			.where("and    a.line_stat   < :line_stat " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    a.pdsd_yorn = :add         ", add													)
			.where("order by b.invc_date desc , a.invc_numb, a.line_seqn limit 99999999 ) a						")
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
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select  a.invc_numb          , a.bzpl_idcd        , a.item_idcd          , a.cstm_idcd			")
			.where("      , a.cvic_idcd          , a.bomt_degr        , a.optn_yorn          , a.optn_sbsc			")
			.where("      , a.optn_sbsc_valu     , a.plan_sttm        , a.plan_qntt          , a.plan_edtm			")
			.where("      , a.mngt_dept_idcd     , a.trst_dept_idcd   , a.trst_drtr_idcd     , a.prod_trst_dvcd		")
			.where("      , a.trst_qntt          , a.stok_used_qntt   , a.cmpl_reqt_date     , a.cofm_date			")
			.where("      , a.last_wker_idcd     , a.last_work_date   , a.remk_text          , a.prod_trst_numb		")
			.where("      , a.user_memo          , a.sysm_memo        , a.prnt_idcd          , a.line_levl			")
			.where("      , a.line_ordr          , a.line_stat        , a.line_clos          , a.find_name			")
			.where("      , a.updt_user_name     , a.updt_ipad        , a.updt_dttm          , a.updt_idcd			")
			.where("      , a.updt_urif          , a.crte_user_name   , a.crte_ipad          , a.crte_dttm			")
			.where("      , a.crte_idcd          , a.crte_urif        , a.prod_line_idcd     , a.plan_qntt_1fst		")
			.where("      , i.item_code          , i.item_spec        , i.item_name									")
			.where("      , u.user_name as trst_drtr_name             , t.cstm_name									")
			.where("      , m.mold_code																				")
			.where("      , w.wkfw_name as prod_line_name															")
			.where("      , b.lott_numb																				")
		;
		data.param
			.where("from prod_plan a																				")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join user_mast u on a.trst_drtr_idcd = u.user_idcd									")
			.where("left outer join cstm_mast t on a.cstm_idcd = t.cstm_idcd										")
			.where("left outer join mold_mast m on a.mold_idcd = m.mold_idcd										")
			.where("left outer join wkfw_clss w on a.prod_line_idcd = w.wkfw_idcd									")
			.where("left outer join (select a.invc_numb, b.lott_numb												")
			.where("                 from prod_plan a																")
			.where("                 left outer join pror_item b on b.invc_numb = a.prod_trst_numb					")
			.where("                 group by  b.invc_numb  ) b on a.invc_numb = b.invc_numb						")
			.where("where  1=1																						")
			.where("and    a.cvic_idcd is null																		")
			.where("and    i.find_name like %:find_name%	"  , arg.getParamText("find_name"))
			.where("and    a.item_idcd      =:item_idcd"       , arg.getParamText("item_idcd"))			//품목ID
			.where("and    a.invc_numb like %:search_name1%"   , arg.getParamText("search_name"), "1".equals(arg.getParamText("search_id")))		//주문번호
			.where("and    t.cstm_name like %:search_name2%"   , arg.getParamText("search_name"), "2".equals(arg.getParamText("search_id")))		//고객명
			.where("and    t.tele_numb like %:search_name3%"   , arg.getParamText("search_name"), "3".equals(arg.getParamText("search_id")))		//고객번호
			.where("and    a.user_memo like %:search_name4%"   , arg.getParamText("search_name"), "4".equals(arg.getParamText("search_id")))		//메모
			.where("and    a.cstm_idcd      =:cstm_idcd"       , arg.getParamText("cstm_idcd"))			//고객
			.where("and    b.lott_numb      =:lott_numb"       , arg.getParamText("cstm_lott_numb"))	//lott_numb
			.where("order by a.invc_numb desc limit 99999999 ) a													")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getWrite(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String a = (String) arg.getParameter("invc_numb");
		String z = (String) arg.getParameter("line_seqn");
		a = a.replace("[", "");
		a = a.replace("]", "");
		a = a.replaceAll("\"", "");
		String[] b = a.split(",");
		z = z.replace("[", "");
		z = z.replace("]", "");
		String[] c = z.split(",");
		//TODO

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select  @curRank:=@curRank+1 as seqn														")
			.where("      , a.invc_numb        , a.amnd_degr          , a.line_seqn          , a.item_idcd		")
			.where("      , a.unit_idcd        , a.orig_invc_numb     , a.orig_seqn          , a.orig_invc_qntt	")
			.where("      , a.optn_dvcd        , a.optn_psbl_yorn     , a.optn_adtn          , a.pric_adpt		")
			.where("      , a.norm_sale_pric   , a.sale_stnd_pric     , a.invc_qntt          , a.invc_pric		")
			.where("      , a.vatx_incl_yorn   , a.vatx_rate          , a.sply_amnt          , a.vatx_amnt		")
			.where("      , a.invc_amnt        , a.krwn_amnt          , a.krwn_vatx          , a.krwn_ttsm_amnt	")
			.where("      , a.stnd_unit        , a.stnd_unit_qntt     , a.wrhs_idcd          , a.dlvy_cstm_idcd	")
			.where("      , a.deli_date        , a.deli_chge_dvcd     , a.deli_chge_resn     , a.pcod_numb		")
			.where("      , a.cstm_offr_date   , a.cstm_deli_date     , a.cstm_lott_numb     , a.dlvy_date		")
			.where("      , a.dlvy_hhmm        , a.remk_text          , a.ostt_dvcd          , a.ostt_qntt		")
			.where("      , a.sale_qntt        , a.dsct_qntt          , a.dlvy_memo          , a.uper_seqn		")
			.where("      , a.disp_seqn        , (ifnull(a.invc_qntt,0) - ifnull(a.ostt_qntt,0)) as qntt		")
			.where("      , a.user_memo        , a.sysm_memo          , a.prnt_idcd          , a.line_levl		")
			.where("      , a.line_ordr        , a.line_stat          , a.line_clos          , a.find_name		")
			.where("      , a.updt_user_name   , a.updt_ipad          , a.updt_dttm          , a.updt_idcd		")
			.where("      , a.updt_urif        , a.crte_user_name     , a.crte_ipad          , a.crte_dttm		")
			.where("      , a.crte_idcd        , a.crte_urif													")
			.where("      , b.invc_date        , b.cstm_idcd          , u.user_name as drtr_name				")
			.where("      , i.item_code        , i.item_name          , i.item_spec								")
			.where("      , b.cstm_drtr_name																	")
		;
		data.param
			.where("from acpt_item a																			")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join user_mast u on b.drtr_idcd = u.user_idcd									")
			.where(",(select @curRank:=0) r 																	")
			.where("where  1=1																					")
			.where("and    ( 1 																					")
			.where("        and     a.invc_numb = :invc_numb" , b[0])
			.where("        and     a.line_seqn = :line_seqn" , c[0])
			.where(")																							")
		;
		for(int i = 1; i<b.length;i++){
			data.param
				.where("or")
				.where("(   1									")
				.where(" and a.invc_numb like :invc_numb"+i,b[i])
				.where(" and a.line_seqn like :line_seqn"+i,c[i])
				.where(")										")
			;
		}
		data.param
			.where("order by seqn																				")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getEntry(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("       w.invc_numb        , w.item_idcd        , m.wkct_name        , p.lott_numb		")
			.where("     , w.invc_date        , w.prod_qntt        , null as ostt_qntt						")
			.where("     , ifnull(w.prod_qntt,0) - ifnull(w.ostt_qntt,0) as stok_qntt						")
			.where("     , w.ostt_qntt as used_qntt															")
			.where("     , w.prod_qntt_1fst   , null as ostt_qntt_1fst										")
			.where("     , ifnull(w.prod_qntt_1fst,0) - ifnull(w.ostt_qntt_1fst,0) as stok_qntt_1fst		")
			.where("     , w.ostt_qntt_1fst as used_qntt_1fst												")
			.where("from work_book w																		")
			.where("       left outer join wkct_mast       m on w.wkct_idcd = m.wkct_idcd					")
			.where("       left outer join pror_item       p on w.wkod_numb = p.invc_numb and w.wkod_seqn = p.line_seqn")
			.where("       left outer join pror_mast      pm on p.invc_numb = pm.invc_numb					")
			.where("       left outer join item_mast       i on w.item_idcd = i.item_idcd					")
			.where("where  1=1																				")
			.where("and    (ifnull(w.prod_qntt,0) - ifnull(w.ostt_qntt,0) > 0 or ifnull(w.prod_qntt_1fst,0) - ifnull(w.ostt_qntt_1fst,0) > 0)")
			.where("and    w.wkct_idcd      = :wkct_idcd"		, "WT003")
			.where("and   pm.wkod_dvcd      = :wkod_dvcd"		, "3")
			.where("and    i.rpst_item_idcd = :rpst_item_idcd"	, arg.getParameter("item_idcd"))
			.where("and    w.line_stat  < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by w.invc_numb ) a																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setWrite(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map){
			data.param
				.table("prod_plan")
				.where("where invc_numb	= :invc_numb" )

				.unique("invc_numb"			, row.fixParameter("invc_numb"))

				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))		//사업장ID
				.update("item_idcd"			, row.getParameter("item_idcd"))		//품목 ID
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"))		//거래처 ID
				.update("prod_line_idcd"	, row.getParameter("prod_line_idcd"))	//생산라인 ID
				.update("bomt_degr"			, row.getParameter("bomt_degr"))		//BOM차수
				.update("optn_yorn"			, row.getParameter("optn_yorn"))		//사양여부
				.update("optn_sbsc"			, row.getParameter("optn_sbsc"))		//사양항목
				.update("optn_sbsc_valu"	, row.getParameter("optn_sbsc_valu"))	//사양항목값
				.update("plan_sttm"			, row.getParameter("plan_sttm"))		//계획시작시간
				.update("plan_qntt"			, row.getParameter("plan_qntt"))		//계획수량
				.update("plan_edtm"			, row.getParameter("plan_edtm"))		//계획종료시간
				.update("mngt_dept_idcd"	, row.getParameter("mngt_dept_idcd"))	//관리부서
				.update("trst_dept_idcd"	, row.getParameter("trst_dept_idcd"))	//의뢰부서
				.update("trst_drtr_idcd"	, row.getParameter("trst_drtr_idcd"))	//의뢰담당자
				.update("prod_trst_dvcd"	, row.getParameter("prod_trst_dvcd"))	//생산의뢰구분코드
				.update("prod_trst_numb"	, row.getParameter("prod_trst_numb"))	//생산의뢰번호
				.update("trst_qntt"			, row.getParameter("trst_qntt"))		//의뢰수량
				.update("stok_used_qntt"	, row.getParameter("stok_used_qntt"))	//재고사용수량
				.update("cmpl_reqt_date"	, row.getParameter("cmpl_reqt_date"))	//완료요청일자
				.update("curr_stok_qntt"	, row.getParameter("curr_stok_qntt"))	//현재재고수량
				.update("cofm_drtr_idcd"	, row.getParameter("cofm_drtr_idcd"))	//확정담당자
				.update("cofm_date"			, row.getParameter("cofm_date"))		//최종일자
				.update("last_wker_idcd"	, row.getParameter("last_wker_idcd"))	//최종작업자
				.update("last_work_date"	, row.getParameter("last_work_date"))	//최종작업일자
				.update("remk_text"			, row.getParameter("remk_text"))		//비고
				.update("user_memo"			, row.getParameter("user_memo"))		//사용자메모


				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.modify);
			if(row.getParameter("product", SqlResultMap.class) != null) {
				setProdPlan(arg, data, row, row.getParameter("product", SqlResultMap.class));
			}
		}
		data.execute();
		return null;
	}

	public void setProdPlan(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {

		double stok_used_qntt = Double.parseDouble(mst.getParamText("stok_used_qntt")) ;
		double b                  = 0;													//잔량

		for(SqlResultRow row:map) {
			double a = Double.parseDouble(row.getParamText("qntt")) ; // 미납수량
			if(a <= stok_used_qntt) {
				stok_used_qntt = stok_used_qntt - a;
				b = a;
			}else{
				b = stok_used_qntt;
				stok_used_qntt =0;
			}

			data.param
				.table("prod_plan_acpt					")
				.where("where invc_numb		= :invc_numb")		//invoice번호
				.where("and   line_seqn		= :line_seqn")		//순번

				.unique("invc_numb"			, mst.fixParameter("invc_numb"			))		//invoice번호
				.unique("line_seqn"			, row.fixParameter("seqn"				))		//순번

				.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
				.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
				.update("lott_numb"			, mst.getParameter("lott_numb"			))		//lot번호
				.update("upid_qntt"			, row.getParameter("qntt"				))		//미납수량
				.update("stok_used_qntt"	, b										)		//재고사용수량
				.update("plan_sttm"			, mst.getParameter("plan_sttm"			))		//계획시작시간
				.update("plan_edtm"			, mst.getParameter("plan_edtm"			))		//계획종료시간
				.update("user_memo"			, row.getParameter("user_memo"			))		//사용자메모

				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;data.attach(Action.modify);
			data.execute();

			data.param
				.table("acpt_item													")
				.where("where invc_numb		= :invc_numb")		//invoice번호
				.where("and   line_seqn		= :line_seqn")		//순번

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번

				.update("pdsd_yorn"			, 1)		//지시여부
			;data.attach(Action.modify);
			data.execute();
		}
	}

	public SqlResultMap work_order_create_v3(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call kitec_work_order_create_v3( :param"     , arg.fixParameter("param"	))
			.query(")"																	)
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	// lot번호 자동생성 ex)오늘날짜(210104-1)
	public SqlResultMap GetMax(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select concat(substr(a.lott_numb,1,6),'-',max(substring_index(a.lott_numb,'-',-1))+1) as 'max' ")
		;
		data.param
			.where("from pror_item a																		")
			.where("where 1=1																				")
			.where("and substr(a.lott_numb,1,6) = curdate()										")
		;

		return data.selectForMap();
	}

}