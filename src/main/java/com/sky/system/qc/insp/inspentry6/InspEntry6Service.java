package com.sky.system.qc.insp.inspentry6;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class InspEntry6Service  extends DefaultServiceHandler {



	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select																							")
			.query("      a.invc_numb      , a.line_seqn      , a.invc_date      , a.insp_dvcd      , a.cstm_idcd	")
			.query("    , a.dlvy_idcd      , a.dlvy_seqn      , a.cnfm_dept_idcd , a.cnfm_drtr_idcd , a.item_idcd	")
			.query("    , a.dlvy_qntt      , a.dlvy_wrhs_idcd , a.lott_numb      , a.insp_drtr_idcd , a.insp_mthd_dvcd	")
			.query("    , a.msmt_valu      , a.insp_qntt      , a.poor_qntt      , a.pass_yorn      , a.pass_qntt	")
			.query("    , a.poor_type_bacd , a.poor_caus_bacd , a.judt_dvcd      , a.trtm_date      , a.trtm_drtr_idcd	")
			.query("    , a.rett_qntt      , a.dsse_qntt      , a.updt_qntt      , a.rewk_indn_numb , a.rewk_qntt	")
			.query("    , a.scex_qntt      , a.istt_yorn      , a.orig_invc_numb , a.orig_amnd_degr , a.orig_seqn	")

			.query("    , a.uper_seqn      , a.disp_seqn      , i.item_code      , i.item_name      , i.item_spec	")
			.query("    , u.user_name as   insp_drtr_name     , u2.user_name as trtm_drtr_name      , c.cstm_name	")
			.query("    , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr	")
			.query("    , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name					")
			.query("    , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif						")
			.query("    , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd						")
			.query("    , d.wrhs_name as dlvy_wrhs_name																")
		;
		data.param
			.where("from    purc_insp a																				")
			.where("        left outer join item_mast i  on i.item_idcd      = a.item_idcd							")
			.where("        left outer join user_mast u  on u.user_idcd = a.insp_drtr_idcd							")
			.where("        left outer join user_mast u2  on u2.user_idcd = a.trtm_drtr_idcd						")
			.where("        left outer join wrhs_mast d  on d.wrhs_idcd = a.dlvy_wrhs_idcd							")
			.where("        left outer join cstm_mast c  on c.cstm_idcd      = a.cstm_idcd							")

			.where("where   1=1																						")
			.where("and    a.find_name   like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.invc_date     >= :invc1_date			" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date     <= :invc2_date			" , arg.getParamText("invc2_date" ))
			.where("and    a.insp_drtr_idcd = :insp_drtr_idcd		" , arg.getParamText("insp_drtr_idcd" ))
			.where("and    a.lott_numb      = :cstm_lott_numb		" , arg.getParamText("cstm_lott_numb" ))
			.where("and    a.judt_dvcd      = :judt_dvcd			" , "2", "".equals(arg.getParamText("judt_dvcd" )))
			.where("and    i.item_name   like %:item_name% 			" , arg.getParamText("item_name") )
			.where("and    a.line_stat      < :line_stat			" , "2", "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc 																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}



	public SqlResultMap getLister1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select	*																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.wkct_insp_dvcd    , a.invc_numb        , a.line_seqn				")
			.where("    , a.insp_sbsc_seqn, a.scex_qntt 													")
			.where("    , f.cstm_idcd        , a.wkct_idcd        , a.wkct_item_idcd						")
			.where("    , a.acpt_numb        , a.acpt_seqn        , a.pdsd_numb        , a.wkod_numb		")
			.where("    , a.lott_numb        , a.sral_strt_numb   , a.dlvy_idcd        , a.dlvy_seqn		")
			.where("    , a.cnfm_dept_idcd   , a.cnfm_drtr_idcd   , a.insp_mthd_dvcd   , a.indn_qntt		")
			.where("    , a.prod_qntt        , a.insp_qntt        , a.good_qntt								")
			.where("    , a.rewk_indn_numb   , a.dsse_qntt 		  , a.rewk_qntt		,a.rett_qntt			")
			.where("    , a.poor_qntt        , a.pass_qntt        , a.poor_caus_bacd   , a.poor_type_bacd	")
			.where("    , (select base_name from base_mast r where a.poor_type_bacd = r.base_code			")
			.where("                                         and   r.prnt_idcd = '6000') as poor_type_name	")
			.where("    , (select base_name from base_mast r where a.poor_caus_bacd = r.base_code			")
			.where("                                         and   r.prnt_idcd = '6001') as poor_caus_name	")
			.where("    , a.insp_scre_numb   , a.smpl_numb        , a.istt_yorn        , a.disp_seqn		")
			.where("    , b.wkct_code        , b.wkct_name        , a.uper_seqn        , a.insp_cvic_idcd	")
			.where("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd	       , a.crte_urif		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.where("    , c.user_name        , a.judt_dvcd        , a.smli_dvcd        , a.insp_date		")
			.where("    , a.insp_strt_time   , a.insp_endd_time   , d.cvic_name        , a.trtm_drtr_idcd	")
			.where("    , f.pdod_date        , h.cstm_name        , g.item_name        , a.trtm_date		")
			.where("    , g.item_spec        , (a.indn_qntt - a.prod_qntt) as prod_balan					")
			.where("    ,@curRank := @curRank + 1 AS rank													")

		;
		data.param
			.where("from wkct_insp a																		")
			.where("        left outer join wkct_mast b on a.wkct_idcd = b.wkct_idcd						")
			.where("        left outer join user_mast c on a.cnfm_drtr_idcd = c.user_idcd					")
			.where("        left outer join cvic_mast d on a.insp_cvic_idcd = d.cvic_idcd					")
	//		.where("        left outer join work_book e on a.invc_numb = e.invc_numb						")
			.where("        left outer join pror_mast f on a.wkod_numb = f.invc_numb						")
			.where("        left outer join item_mast g on f.item_idcd = g.item_idcd						")
			.where("        left outer join cstm_mast h on f.cstm_idcd = h.cstm_idcd						")
			.where("        ,(SELECT @curRank := 0) r														")
			.where("where   1=1																				")
			.where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"						))
			.where("and    a.insp_date between :invc1_date			" , arg.getParamText("invc1_date" ))
			.where("                   and     :invc2_date			" , arg.getParamText("invc2_date" ))
			.where("and     a.line_stat   < :line_stat      " , "2"											 )
			.where("order by a.line_seqn)a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	//최종검사
	public SqlResultMap getLister2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.invc_numb,     a.line_seqn,     a.bzpl_idcd,     a.invc_date		")
			.query("      , a.insp_dvcd,     a.cstm_idcd,     a.dlvy_idcd,     a.dlvy_seqn		")
			.query("      , a.pdsd_numb,     a.wkod_numb,     a.acpt_numb,     a.acpt_seqn		")
			.query("      , a.item_idcd,     a.unit_idcd,     a.wkct_idcd,     a.prod_qntt		")
			.query("      , a.pass_qntt,     a.insp_qntt,     a.judt_dvcd,     a.pass_yorn		")
			.query("      , a.rewk_indn_numb,a.dsse_qntt,     a.rewk_qntt,     a.rett_qntt		")
			.query("      , a.stnd_unit,     a.lott_numb,     a.work_dvcd,     a.smpl_numb		")
			.query("      , c.cstm_name,     i.item_name,     i.item_spec,     u.unit_name		")
			.query("      , wc.wkct_name,    d.dept_name,     us.user_name,    a.disp_seqn		")
			.query("      , a.istt_yorn,     a.istt_date,     a.remk_text,     a.uper_seqn		")
			.query("      , a.poor_qntt,     a.trtm_date,     a.trtm_drtr_idcd,a.scex_qntt		")
			.query("      , a.memo,          a.updt_qntt,     a.user_memo,     a.sysm_memo		")
			.query("      , a.cnfm_drtr_idcd,     a.acpt_amnd_degr,     a.wkct_item_idcd		")
			.query("      , a.work_indn_qntt,     a.insp_mthd_dvcd,     a.smor_pass_qntt		")
			.query("      , a.smor_poor_qntt,     a.sral_strt_numb,     a.insp_scre_numb		")
			.query("      , a.prod_istt_qntt,     a.cnfm_dept_idcd								")
			.query("      , a.line_levl,     a.line_ordr,     a.line_stat,	   a.line_clos		")
			.query("      , a.find_name,     a.updt_user_name,     a.updt_ipad,	   a.updt_dttm	")
			.query("      , a.updt_idcd,     a.updt_urif										")
			.query("      , a.crte_ipad,     a.crte_dttm,     a.crte_idcd,	   a.crte_urif		")
		;
		data.param
			.where("from    last_insp a 																")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd					")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.where("        left outer join unit_mast u on i.unit_idcd = u.unit_idcd					")
			.where("        left outer join wkct_mast wc on a.wkct_idcd = wc.wkct_idcd					")
			.where("        left outer join dept_mast d on a.cnfm_dept_idcd = d.dept_idcd				")
			.where("        left outer join user_mast us on a.cnfm_drtr_idcd = us.user_idcd				")

			.where("where   1=1																			")
			.where("and    a.invc_date >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and     a.cnfm_drtr_idcd	= :insp_drtr_idcd	" , arg.getParamText("insp_drtr_idcd"))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	//출고검사
	public SqlResultMap getLister3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.invc_numb      , a.bzpl_idcd       , a.invc_date      , a.spts_numb		")
			.query("      , a.spts_seqn      , i.item_name       , i.item_spec							")
			.query("      , a.spts_date      , a.spts_dept_idcd  , a.spts_drtr_idcd , a.item_idcd		")
			.query("      , a.unit_idcd      , a.spts_qntt       , a.deli_date      , a.wrhs_idcd		")
			.query("      , a.cstm_idcd      , a.insp_drtr_idcd  , a.pass_qntt      , a.poor_qntt		")
			.query("      , a.remk_text      , c.cstm_name       , b.wrhs_name		,a.scex_qntt		")
			.query("      , a.insp_qntt      , u.user_name as insp_drtr_name		, a.line_seqn		")
			.query("      , a.rewk_indn_numb , a.dsse_qntt       ,     a.rewk_qntt  , a.rett_qntt		")

			;
		data.param
			.where("from    ostt_insp a 																")
			.where("        left outer join user_mast u on a.spts_drtr_idcd = u.user_idcd				")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd					")
			.where("        left outer join wrhs_mast b on a.wrhs_idcd = b.wrhs_idcd					")

			.where("where   1=1																			")
			.where("and    a.find_name   like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.invc_date >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.insp_drtr_idcd   = :insp_drtr_idcd			" , arg.getParamText("insp_drtr_idcd" ))
			.where("and    a.lott_numb    = :cstm_lott_numb			" , arg.getParamText("cstm_lott_numb" ))
			.where("and    i.item_name   like %:item_name% 			" , arg.getParamText("item_name") )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	//업체반품
	public SqlResultMap setReturn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;

		for (SqlResultRow row:map) {
			if(i == 0){
			data.param
				.table("purc_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, row.fixParameter("invc_numb"	))
				.unique("line_seqn"			, row.fixParameter("line_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)
			;
			data.attach(Action.update);
			data.execute();

			data.param
				.table("purc_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("rett_qntt"			, row.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, row.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))

			;
			data.attach(Action.update);
			data.execute();
			data.clear();
			}
		}
		return null;

	}

	public SqlResultMap setDsse(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);


		int i = 0;

		for (SqlResultRow row:map) {
			if(i == 0){
			data.param
				.table("purc_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, row.fixParameter("invc_numb"	))
				.unique("line_seqn"			, row.fixParameter("line_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)
			;
			data.attach(Action.update);
			data.execute();

			data.param
				.table("purc_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, row.fixParameter("invc_numb"	))
				.unique("line_seqn"			, row.fixParameter("line_seqn"	))

				.update("dsse_qntt"			, row.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, row.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			}
		}
		return null;
	}


	//공정 업체반품
		public SqlResultMap setReturn1(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");


				data.param
					.table("wkct_insp")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")
					.where("and   wkct_insp_dvcd = :wkct_insp_dvcd")
					.where("and   insp_sbsc_seqn = :insp_sbsc_seqn")

					.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
					.unique("line_seqn"			, arg.fixParameter("line_seqn"	))
					.unique("wkct_insp_dvcd"	, arg.fixParameter("wkct_insp_dvcd"	))
					.unique("insp_sbsc_seqn"	, arg.fixParameter("insp_sbsc_seqn"	))

					.update("dsse_qntt"			,	0)
					.update("rett_qntt"			,	0)
					.update("rewk_qntt"			,	0)
					.update("scex_qntt"			,	0)
				;
				data.attach(Action.update);
				data.execute();

				data.param
					.table("wkct_insp")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")
					.where("and   wkct_insp_dvcd = :wkct_insp_dvcd")
					.where("and   insp_sbsc_seqn = :insp_sbsc_seqn")
					.unique("wkct_insp_dvcd"	, arg.fixParameter("wkct_insp_dvcd"	))
					.unique("insp_sbsc_seqn"	, arg.fixParameter("insp_sbsc_seqn"	))

					.unique("invc_numb"			, arg.fixParameter("invc_numb"))
					.unique("line_seqn"			, arg.fixParameter("line_seqn"))

					.update("rett_qntt"			, arg.fixParameter("poor_qntt"))
					.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
					.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			return null;

		}

		//최종 업체반품
		public SqlResultMap setReturn2(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");


			data.param
				.table("last_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)
			;
			data.attach(Action.update);
			data.execute();

			data.param
				.table("last_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))

				.update("rett_qntt"			, arg.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		return null;

		}

		//출고 업체반품
		public SqlResultMap setReturn3(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");


			data.param
				.table("ostt_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)
			;
			data.attach(Action.update);
			data.execute();

			data.param
				.table("ostt_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))

				.update("rett_qntt"			, arg.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		return null;
		}
	//각종검사 재작업 지시
	public SqlResultMap setRepror(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String invc_numb =arg.getParamText("invc_numb");
		String line_seqn =arg.getParamText("line_seqn");
		String trtm_drtr_idcd =arg.getParamText("trtm_drtr_idcd");
		Object source_dvcd =arg.getParamText("_source_dvcd");

		if(source_dvcd.equals("공정재작업")){
			String wkct_insp_dvcd = arg.getParamText("wkct_insp_dvcd");
			String insp_sbsc_seqn = arg.getParamText("insp_sbsc_seqn");
			data.param
				.query("call auto_repror_insert(						")
				.query("  :invc_numb",		invc_numb)
				.query(",  :line_seqn",		line_seqn)
				.query(",  :wkct_insp_dvcd",wkct_insp_dvcd)
				.query(",  :insp_sbsc_seqn",insp_sbsc_seqn)
				.query(",  :trtm_drtr_idcd",trtm_drtr_idcd)
				.query(",  :source_dvcd",	source_dvcd)
				.query(")")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
		}else{
			String wkct_insp_dvcd = "0";
			String insp_sbsc_seqn = "0";
			data.param
				.query("call auto_repror_insert(						")
				.query("  :invc_numb",		invc_numb)
				.query(",  :line_seqn",		line_seqn)
				.query(",  :wkct_insp_dvcd",wkct_insp_dvcd)
				.query(",  :insp_sbsc_seqn",insp_sbsc_seqn)
				.query(",  :trtm_drtr_idcd",trtm_drtr_idcd)
				.query(",  :source_dvcd",	source_dvcd)
				.query(")")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}
		return null;
	}




	//공정검사 폐기
	public SqlResultMap setDrop1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("wkct_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")
				.where("and   wkct_insp_dvcd = :wkct_insp_dvcd")
				.where("and   insp_sbsc_seqn = :insp_sbsc_seqn")

				.unique("invc_numb"					, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"					, arg.fixParameter("line_seqn"	))
				.unique("wkct_insp_dvcd"			, arg.fixParameter("insp_dvcd"	))
				.unique("insp_sbsc_seqn"			, arg.fixParameter("insp_sbsc_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)

			;
			data.attach(Action.update);
			data.execute();
				data.param
				.table("wkct_insp")


				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")
				.where("and   wkct_insp_dvcd = :wkct_insp_dvcd")
				.where("and   insp_sbsc_seqn = :insp_sbsc_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"	))
				.unique("wkct_insp_dvcd"	, arg.fixParameter("insp_dvcd"	))
				.unique("insp_sbsc_seqn"	, arg.fixParameter("insp_sbsc_seqn"	))

				.update("dsse_qntt"			, arg.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

		return null;
	}



	//최종검사 폐기
	public SqlResultMap setDrop2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("last_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"					, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"					, arg.fixParameter("line_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)

			;
			data.attach(Action.update);
			data.execute();

			data.param
				.table("last_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"	))

				.update("dsse_qntt"			, arg.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

		return null;
	}

	//출고검사 폐기
	public SqlResultMap setDrop3(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
				.table("ostt_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"					, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"					, arg.fixParameter("line_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)

			;
			data.attach(Action.update);
			data.execute();


			data.param
				.table("ostt_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"	))

				.update("dsse_qntt"			, arg.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

		return null;
	}



	//공정검사 특채
	public SqlResultMap setSpecial1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("wkct_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")
				.where("and   wkct_insp_dvcd = :wkct_insp_dvcd")
				.where("and   insp_sbsc_seqn = :insp_sbsc_seqn")

				.unique("invc_numb"					, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"					, arg.fixParameter("line_seqn"	))
				.unique("wkct_insp_dvcd"			, arg.fixParameter("insp_dvcd"	))
				.unique("insp_sbsc_seqn"			, arg.fixParameter("insp_sbsc_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)

			;
			data.attach(Action.update);
			data.execute();
				data.param
				.table("wkct_insp")


				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")
				.where("and   wkct_insp_dvcd = :wkct_insp_dvcd")
				.where("and   insp_sbsc_seqn = :insp_sbsc_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"	))
				.unique("wkct_insp_dvcd"	, arg.fixParameter("insp_dvcd"	))
				.unique("insp_sbsc_seqn"	, arg.fixParameter("insp_sbsc_seqn"	))

				.update("scex_qntt"			, arg.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

		return null;
	}



	//최종검사 특채
	public SqlResultMap setSpecial2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("last_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"					, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"					, arg.fixParameter("line_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)

			;
			data.attach(Action.update);
			data.execute();

			data.param
				.table("last_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"	))

				.update("scex_qntt"			, arg.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

		return null;
	}

	//출고검사 특채
	public SqlResultMap setSpecial3(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
				.table("ostt_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"					, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"					, arg.fixParameter("line_seqn"	))

				.update("dsse_qntt"			,	0)
				.update("rett_qntt"			,	0)
				.update("rewk_qntt"			,	0)
				.update("scex_qntt"			,	0)
			;
			data.attach(Action.update);
			data.execute();


			data.param
				.table("ostt_insp")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"	))

				.update("scex_qntt"			, arg.fixParameter("poor_qntt"))
				.update("trtm_drtr_idcd"	, arg.fixParameter("trtm_drtr_idcd"))
				.update("trtm_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

		return null;
	}

}
