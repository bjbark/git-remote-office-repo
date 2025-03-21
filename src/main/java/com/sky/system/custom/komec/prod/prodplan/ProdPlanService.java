package com.sky.system.custom.komec.prod.prodplan;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;
@Service("komec.ProdPlanService")
public class ProdPlanService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.where("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.where("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.where("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate				")
			.where("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.where("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.where("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.where("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.where("		, a.crte_idcd       , a.crte_urif       , c.cstm_code       , c.cstm_name				")
			.where("		, sum(ifnull(ai.invc_qntt,0)) - sum(ifnull(p.indn_qntt,0)) as sub_qntt					")
			.where("from   acpt_mast a																				")
			.where("       left outer join acpt_item     ai  on a.invc_numb = ai.invc_numb							")
			.where("       left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd							")
			.where("       left outer join item_mast      i  on ai.item_idcd = i.item_idcd							")
			.where("       left outer join pror_mast      p  on p.acpt_numb = a.invc_numb and a.amnd_degr = p.acpt_amnd_degr and p.acpt_seqn = ai.line_seqn and p.line_stat < 2	")
			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    p.wkfw_idcd   = :wkfw_idcd		" , arg.getParamText("wkfw_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd"  ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		data.param
			.where("group by a.invc_numb 																				")
		;
		if(arg.getParamText("chk").equals("on")){
			data.param
				.where("having sub_qntt > 0")
			;
		}
		data.param
			.where("order by a.invc_numb ) a																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb      , a.line_seqn      , a.item_idcd      , a.invc_qntt 					")
			.query("       , a.stok_asgn_qntt , (ifnull(a.invc_qntt,0) - ifnull(a.stok_asgn_qntt,0)) as need_qntt	")
			.query("       , i.item_code      , i.item_name      , i.item_spec      , i.modl_name					")
			.query("       , sum(ifnull(p.indn_qntt,0)) as totl_indn_qntt           , a.amnd_degr					")
			.query("       , (ifnull(a.invc_qntt,0) - sum(ifnull(p.indn_qntt,0))) as pror_remn_qntt					")

			.query("       , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl					")
			.query("       , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name					")
			.query("       , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd					")
			.query("       , a.updt_urif      , a.crte_user_name , a.crte_ipad      , a.crte_dttm					")
			.query("       , a.crte_idcd      , a.crte_urif															")

			.query("       , p.strt_dttm      , p.endd_dttm		 , w.wkfw_name		, w.wkfw_idcd					")
		;
		data.param
			.where("from acpt_item a																				")
			.where("left outer join item_mast i  on a.item_idcd = i.item_idcd										")
			.where("left outer join pror_mast p  on a.invc_numb = p.acpt_numb and a.line_seqn = p.acpt_seqn and a.amnd_degr = p.acpt_amnd_degr and p.line_stat < 2")
			.where("left outer join wkfw_clss w  on w.wkfw_idcd = p.wkfw_idcd										")
			.where("where a.invc_numb = :invc_numb",arg.fixParameter("invc_numb"))
			.where("group by a.invc_numb,a.line_seqn																")
			.where("order by a.line_seqn 																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																					")
		;
		data.param
			.query("select * 																									")
		;
		data.param
			.where("from (")
			.where("select   a.invc_numb       , a.wkod_dvcd       , a.lott_numb       , a.bzpl_idcd       , a.pdod_date		")
			.where("       , a.acpt_numb       , a.acpt_amnd_degr  , a.acpt_seqn       , a.cstm_idcd       , a.pdsd_numb		")
			.where("       , a.pdsd_date       , a.pref_rank       , a.item_idcd       , a.wkfw_idcd       , a.bomt_degr		")
			.where("       , a.unit_idcd       , a.strt_dttm       , a.endd_dttm       , a.indn_qntt       , a.indn_qntt_1fst	")
			.where("       , a.work_date       , a.stnd_unit       , a.stnd_unit_qntt  , a.prod_bzpl_idcd  , a.prog_stat_dvcd	")
			.where("       , a.remk_text       , a.last_insp_yorn  , a.last_insp_date  , w.wkfw_name							")
			.where("       , i.item_name       , i.modl_name       , i.item_spec       , c.cstm_name							")

			.where("       , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl							")
			.where("       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name							")
			.where("       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd							")
			.where("       , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm							")
			.where("       , a.crte_idcd       , a.crte_urif	   , b.drtr_idcd	   , u.user_name as drtr_name				")
			.where("	   , a.indn_qntt as orig_indn_qntt																		")
			.where("from pror_mast a																							")
			.where("left outer join pror_item b on a.invc_numb = b.invc_numb													")
			.where("left outer join wkfw_clss w on w.wkfw_idcd = a.wkfw_idcd													")
			.where("left outer join item_mast i on b.item_idcd = i.item_idcd													")
			.where("left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd													")
			.where("left outer join user_mast u on b.drtr_idcd = u.user_idcd													")
			.where("where 1=1																									")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.pdod_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.pdod_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.wkfw_idcd   = :wkfw_idcd		" , arg.getParamText("wkfw_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd"  ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																						")
			.where(") a																											")

		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSearch4(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

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
			.query("       , a.crte_idcd       , a.crte_urif	   , a.drtr_idcd	   , u.user_name as drtr_name				")

		;
		data.param
			.where("from pror_item a																							")
			.where("left outer join wkct_mast w on w.wkct_idcd = a.wkct_idcd													")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd													")
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

	public SqlResultMap setPror(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String invc_numb = "";
		String item_idcd = "";

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			invc_numb = (String) row.fixParameter("pror_numb");
			item_idcd = (String) row.fixParameter("item_idcd");

			data.param
				.table("pror_mast")

				.where("where invc_numb      = :invc_numb")

				.unique("invc_numb"			, row.fixParameter("pror_numb"))

				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))
				.update("lott_numb"			, row.getParameter("lott_numb"))
				.update("pdsd_date"			, row.getParameter("pdod_date"))
				.update("pdod_date"			, row.getParameter("pdod_date"))
				.update("acpt_numb"			, row.getParameter("invc_numb"))
				.update("acpt_amnd_degr"	, row.getParameter("amnd_degr"))
				.update("acpt_seqn"			, row.getParameter("line_seqn"))
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
				.update("pdsd_numb"			, row.getParameter("invc_numb"))
				.update("item_idcd"			, row.getParameter("item_idcd"))
				.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"))
				.update("cvic_idcd"			, row.getParameter("cvic_idcd")) //코멕 db만 적용.
				.update("wrhs_idcd"			, row.getParameter("wrhs_idcd")) //코멕 db만 적용.
				.update("strt_dttm"			, row.getParameter("strt_dttm"))
				.update("endd_dttm"			, row.getParameter("endd_dttm"))
				.update("indn_qntt"			, row.getParameter("indn_qntt"))
				.update("remk_text"			, row.getParameter("remk_text"))
				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"))

				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
			// select해서 처리할지
			data.param
				.query("select *													")

				.where("from wkfw_rout												")
				.where("where wkfw_idcd = :wkfw_idcd",row.fixParameter("wkfw_idcd"))
				.where("order by line_seqn											")
			;
			SqlResultMap map = data.selectForMap();
			data.clear();
			int i = 0;
			for(SqlResultRow rec : map){
				data.param
					.table("pror_item")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb", row.fixParameter("pror_numb"))
					.unique("line_seqn", ++i)// rec의 line_seqn으로 할 경우 중간삭제시 틀어질 수 있음.

					.update("lott_numb"		, row.getParameter("lott_numb"))
					.update("wkfw_idcd"		, row.getParameter("wkfw_idcd"))
					.update("wkfw_seqn"		, rec.getParameter("line_seqn"))
					.update("wkct_idcd"		, rec.getParameter("wkct_idcd"))
					.update("last_wkct_yorn", rec.getParameter("last_wkct_yorn"))
					.update("cvic_idcd"		, row.getParameter("cvic_idcd")) //코멕만적용.
					.update("wkct_item_idcd", row.getParameter("item_idcd"))
					.update("plan_strt_dttm", row.getParameter("strt_dttm"))
					.update("plan_endd_dttm", row.getParameter("endd_dttm"))
					.update("cstm_idcd"		, row.getParameter("cstm_idcd"))
					.update("item_idcd"		, row.getParameter("item_idcd"))
					.update("bomt_degr"		, row.getParameter("revs_numb"))
					.update("indn_qntt"		, row.getParameter("indn_qntt"))
					.update("bzpl_idcd"		, row.getParameter("bzpl_idcd"))
					.update("prog_stat_dvcd", row.getParameter("prog_stat_dvcd"))
					.update("drtr_idcd"		, row.getParameter("pror_drtr_idcd"))

					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

			}

			data.param
				.table("prod_plan")

				.where("where invc_numb = :invc_numb")

				.unique("invc_numb", row.fixParameter("pror_numb"))

				.update("bzpl_idcd"		, row.getParameter("bzpl_idcd"))
				.update("item_idcd"		, row.getParameter("item_idcd"))
				.update("cstm_idcd"		, row.getParameter("cstm_idcd"))
				.update("plan_qntt"		, row.getParameter("indn_qntt"))
				.update("plan_sttm"		, row.getParameter("strt_dttm"))
				.update("plan_edtm"		, row.getParameter("endd_dttm"))

				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

			data.param
				.table("prod_plan_acpt")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"	, row.fixParameter("pror_numb"))
				.unique("line_seqn"	, row.fixParameter("line_seqn"))// rec의 line_seqn으로 할 경우 중간삭제시 틀어질 수 있음.

				.update("acpt_numb"	, row.getParameter("invc_numb"))
				.update("plan_qntt"	, row.getParameter("indn_qntt"))
				.update("plan_sttm"	, row.getParameter("strt_dttm"))
				.update("plan_edtm"	, row.getParameter("endd_dttm"))
				.update("acpt_seqn"	, row.getParameter("line_seqn"))


				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

			data.clear();
			data.param
				.query("call pror_bom_insert (			")
				.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
				.query(" , :item_idcd "  , item_idcd	)  // 품목번호
				.query(" ) 								")
			;
			data.attach(Action.direct);
			data.execute();
		}

		return null;
	}

	public SqlResultMap modifyPror(HttpRequestArgument arg) throws Exception{
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row : arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("pror_item")

				.where("where 	invc_numb = :invc_numb")
				.where("and 	line_seqn = :line_seqn")

				.unique("invc_numb"		, row.getParameter("pror_numb"))
				.unique("line_seqn"		, row.getParameter("line_seqn"))

				.update("plan_strt_dttm", row.getParameter("strt_dttm"))
				.update("plan_endd_dttm", row.getParameter("endd_dttm"))
				.update("lott_numb"		, row.getParameter("lott_numb"))
				.update("drtr_idcd"		, row.getParameter("drtr_idcd"))
				.update("indn_qntt"		, row.getParameter("indn_qntt"))

				.update("updt_idcd"		, row.getParameter("updt_idcd"))
				.update("updt_ipad"		, arg.remoteAddress )
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}
		return null;
	}

	public SqlResultMap setProrDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if(rowaction == Action.delete){
				data.param
					.table("pror_mast")

					.where("where invc_numb      = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("pror_item")

					.where("where invc_numb      = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("prod_plan")

					.where("where invc_numb      = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("prod_plan_acpt")

					.where("where invc_numb      = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				data.param
					.table("pror_mast")

					.where("where invc_numb      = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("pdod_date", row.getParameter("pdod_date"))
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			}
		}
		return null;
	}

	//최종차수 비교
	public SqlResultMap getProrLotCheck(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(a.lott_numb) as cnt			")
			.query("from  pror_mast a							")
			.query("where a.lott_numb = :lott_numb", arg.getParameter("lott_numb"))
		;
		return data.selectForMap();
	}
}
