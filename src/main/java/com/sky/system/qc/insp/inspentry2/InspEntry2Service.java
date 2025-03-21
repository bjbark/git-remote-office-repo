package com.sky.system.qc.insp.inspentry2;

import java.security.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class InspEntry2Service extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select 																					")
			.where("      a.invc_numb        , b.bzpl_idcd       , b.pdod_date        , b.acpt_numb			")
			.where("    , b.acpt_seqn        , b.cstm_idcd       , b.pdsd_numb        , b.item_idcd			")
			.where("    , b.pdsd_date        , b.wkfw_idcd       , b.bomt_degr								")
			.where("    , b.unit_idcd        , b.indn_qntt       , b.work_date								")
			.where("    , b.stnd_unit        , b.stnd_unit_qntt  , b.prod_bzpl_idcd   , b.prog_stat_dvcd	")
			.where("    , b.remk_text        , k.wkct_name													")
			.where("    , b.user_memo        , b.sysm_memo       , b.prnt_idcd        , b.line_levl			")
			.where("    , b.line_ordr        , b.line_stat       , b.line_clos        , b.find_name			")
			.where("    , b.updt_user_name   , b.updt_ipad       , b.updt_dttm        , b.updt_idcd			")
			.where("    , b.updt_urif        , b.crte_user_name  , b.crte_ipad        , b.crte_dttm			")
			.where("    , b.crte_idcd        , b.crte_urif													")
			.where("    , a.work_strt_dttm   , a.work_endd_dttm  , a.insp_wkct_yorn   , i.insp_type_idcd	")
			.where("    , c.cstm_name        , i.item_code       , i.item_name        , i.item_spec			")
			.where("    , w.prod_qntt as prod_qntt               , t.insp_type_name							")
		;
		data.param
			.where("from pror_item a																		")
			.where("left outer join pror_mast b on a.invc_numb = b.invc_numb								")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd								")
			.where("left outer join item_mast i on b.item_idcd = i.item_idcd								")
			.where("left outer join wkct_mast k on a.wkct_idcd = k.wkct_idcd								")
			.where("left outer join insp_type_mast t on i.insp_type_idcd = t.insp_type_idcd					")
			.where("left outer join work_book w on b.invc_numb = w.wkod_numb	and b.prog_stat_dvcd = w.prog_stat_dvcd	")
			.where("where   1=1																				")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name" ))
			.where("and     b.pdod_date >= :pdod_date1     " , arg.getParamText("pdod_date1" ))
			.where("and     b.pdod_date <= :pdod_date2     " , arg.getParamText("pdod_date2" ))
			.where("and     substring(a.work_strt_dttm,1,8) >= :work_strt_dttm1   " , arg.getParamText("work_strt_dttm1" ))
			.where("and     substring(a.work_strt_dttm,1,8) <= :work_strt_dttm2   " , arg.getParamText("work_strt_dttm2" ))
			.where("and     substring(a.work_endd_dttm,1,8) >= :work_endd_dttm1   " , arg.getParamText("work_endd_dttm1" ))
			.where("and     substring(a.work_endd_dttm,1,8) <= :work_endd_dttm2   " , arg.getParamText("work_endd_dttm2" ))
			.where("and     a.line_stat   = :line_stat     " , arg.getParamText("line_stat"  ))
			.where("and     a.item_idcd   = :item_idcd     " , arg.getParamText("item_idcd"  ))
			.where("and     a.cstm_idcd   = :cstm_idcd     " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("and     a.line_seqn = (select Max(p.line_seqn) from pror_item p where a.invc_numb = p.invc_numb)")
			.where("order by a.invc_numb																	")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getInsp_cond(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.insp_type_idcd   , a.line_seqn        , a.insp_sbsc_name   , a.insp_cond		")
			.query("        , a.insp_levl_uppt   , a.insp_levl_midl   , a.insp_levl_lprt						")
			.query("        , a.rslt_iput_dvcd   , a.goal_levl        , a.insp_cvic_idcd						")
			.query("        , a.ctq_sbsc_yorn    , a.msmt_mthd_dvcd   , a.insp_levl        , a.lott_judt_stnd	")
			.query("        , a.insp_mthd_dvcd   , a.uppr_valu        , a.lwlt_valu								")
			.query("        , a.remk_text        , a.uper_seqn        , a.disp_seqn        , a.user_memo		")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif        , b.wkct_idcd        , w.wkct_name		")
			.query("        , b.insp_type_name   , b.insp_type_code   , d.cvic_idcd        , d.cvic_name		")


		;
		data.param
			.where("from insp_cond a																		")
			.where("       left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd			")
			.where("       left outer join cvic_mast      d on a.insp_cvic_idcd = d.cvic_idcd 				")
			.where("       left outer join wkct_mast      w on b.wkct_idcd = w.wkct_idcd 				")
			.where("where   1=1																				")
			.where("and     a.insp_type_idcd = :insp_type_idcd" ,	arg.getParameter("insp_type_idcd"		))
			.where("and     a.line_seqn = :line_seqn" ,				arg.getParameter("line_seqn"			))
			.where("and     a.line_stat   < :line_stat      " , "2"											 )
			.where("order by a.line_seqn																	")
		;
		return data.selectForMap();
	}
	public SqlResultMap getWkct_Insp_Seqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(Max(line_seqn),0)+1 as seqn											")
		;
		data.param
			.where("from wkct_insp a																	")
			.where("where   1=1																			")
			.where("and     a.wkod_numb = :wkod_numb" , arg.getParameter("wkod_numb"					))
			.where("and     a.wkct_insp_dvcd = :wkct_insp_dvcd" , arg.fixParameter("wkct_insp_dvcd"		))

		;
		return data.selectForMap();
	}
	public SqlResultMap getWkct_invc_numb(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select invc_numb																	")
		;
		data.param
		.where("from wkct_insp a																	")
		.where("where   1=1																			")
		.where("and     a.wkod_numb = :wkod_numb" , arg.getParameter("wkod_numb"					))

		;
		return data.selectForMap();
	}

	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select	a.*																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.wkct_insp_dvcd   , a.invc_numb        , a.line_seqn        , a.insp_date		")
			.where("    , a.cstm_idcd        , a.item_idcd        , a.wkct_idcd        , a.wkct_item_idcd	")
			.where("    , a.acpt_numb        , a.acpt_seqn        , a.pdsd_numb        , a.wkod_numb		")
			.where("    , a.lott_numb        , a.sral_strt_numb   , a.dlvy_idcd        , a.dlvy_seqn		")
			.where("    , a.cnfm_dept_idcd   , a.cnfm_drtr_idcd   , a.insp_mthd_dvcd   , a.indn_qntt		")
			.where("    , a.prod_qntt        , a.insp_qntt        , a.good_qntt        , a.insp_cond		")
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
			.where("    , c.user_name        , a.judt_dvcd        , a.smli_dvcd        , a.insp_sbsc_seqn	")
			.where("    , a.insp_strt_time   , a.insp_endd_time   , a.insp_type_idcd   , d.cvic_name		")
			.where("    , a.msmt_valu_1fst   , a.msmt_valu_2snd   , a.msmt_valu_3trd   , a.msmt_valu_4frt	")
			.where("    , a.msmt_valu_5fit   , a.msmt_valu_6six   , a.msmt_valu_7svn   , a.msmt_valu_8egh	")
			.where("    , a.msmt_valu_9nin   , a.msmt_valu_10     , f.base_name        , g.insp_sbsc_name	")
			.where("from wkct_insp a																		")
			.where("        left outer join wkct_mast b on a.wkct_idcd = b.wkct_idcd						")
			.where("        left outer join user_mast c on a.cnfm_drtr_idcd = c.user_idcd					")
			.where("        left outer join cvic_mast d on a.insp_cvic_idcd = d.cvic_idcd					")
			.where("        left outer join item_insp_stnd e on a.item_idcd = e.item_idcd					")
			.where("        left outer join base_mast f on e.insp_sbsc_dvcd = f.base_code					")
			.where("                                   and f.prnt_idcd=4100									")
			.where("        left outer join insp_cond g on a.insp_type_idcd = g.insp_type_idcd				")
			.where("                                   and a.insp_sbsc_seqn = g.line_seqn 					")
			.where("where   1=1																				")
			.where("and     a.wkod_numb = :invc_numb" , arg.getParameter("invc_numb"						))
			.where("and     a.line_stat   < :line_stat      " , "2"											 )
			.where(" order by insp_date desc,insp_strt_time desc, line_seqn desc , insp_sbsc_seqn asc	 	")
			.where(" LIMIT 18446744073709551615) a 															")  //mysql에서는 서브쿼리 order by가 안먹히는 경우가 있음 그럴 경우 해결방법으로 limit를 주면됨

		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("wkct_insp")
			.where("where invc_numb      = :invc_numb			")
			.where("and line_seqn        = :line_seqn			")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"		))
		;data.attach(Action.delete);
		data.execute();

		return null;
	}
	public SqlResultMap setlist1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wkct_insp")
					.where("where invc_numb      = :invc_numb			")
					.where("and line_seqn        = :line_seqn			")
					.where("and wkct_insp_dvcd   = :wkct_insp_dvcd		")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					.unique("wkct_insp_dvcd"	, row.fixParameter("wkct_insp_dvcd"	))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("wkct_insp")
					.where("where invc_numb       = :invc_numb		")
					.where("and line_seqn         = :line_seqn		")
					.where("and insp_sbsc_seqn    = :insp_sbsc_seqn	")

					.unique("invc_numb"				, row.fixParameter("invc_numb"		))
					.unique("line_seqn"				, row.fixParameter("line_seqn"		))
					.unique("insp_sbsc_seqn"		, row.fixParameter("line_seqn"	))

					.update("wkct_insp_dvcd"		, row.getParameter("wkct_insp_dvcd"	))
					.update("insp_date"				, row.getParameter("insp_date"		))
					.update("indn_qntt"				, row.getParameter("indn_qntt"		))
					.update("insp_strt_time"		, row.getParameter("insp_strt_time"	))
					.update("insp_endd_time"		, row.getParameter("insp_endd_time"	))
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"		))
					.update("item_idcd"				, row.getParameter("item_idcd"		))
					.update("wkct_idcd"				, row.getParameter("wkct_idcd"		))
					.update("wkct_item_idcd"		, row.getParameter("wkct_item_idcd"	))
					.update("acpt_numb"				, row.getParameter("acpt_numb"		))
					.update("acpt_seqn"				, row.getParameter("acpt_seqn"		))
					.update("pdsd_numb"				, row.getParameter("pdsd_numb"		))
					.update("wkod_numb"				, row.getParameter("wkod_numb"		))
					.update("lott_numb"				, row.getParameter("lott_numb"		))
					.update("sral_strt_numb"		, row.getParameter("sral_strt_numb"	))
					.update("dlvy_idcd"				, row.getParameter("dlvy_idcd"		))
					.update("dlvy_seqn"				, row.getParameter("dlvy_seqn"		))
					.update("cnfm_dept_idcd"		, row.getParameter("cnfm_dept_idcd"	))
					.update("cnfm_drtr_idcd"		, row.getParameter("cnfm_drtr_idcd"	))
					.update("insp_type_idcd"		, row.getParameter("insp_type_idcd"	))
					.update("insp_sbsc_seqn"		, row.getParameter("insp_sbsc_seqn"	))
					.update("smli_dvcd"				, row.getParameter("smli_dvcd"		))
					.update("insp_cvic_idcd"		, row.getParameter("insp_cvic_idcd"	))
					.update("insp_cond"				, row.getParameter("insp_cond"		))
					.update("insp_mthd_dvcd"		, row.getParameter("insp_mthd_dvcd"	))
					.update("prod_qntt"				, row.getParameter("prod_qntt"		))
					.update("msmt_valu_1fst"		, row.getParameter("msmt_valu_1fst"	))
					.update("msmt_valu_2snd"		, row.getParameter("msmt_valu_2snd"	))
					.update("msmt_valu_3trd"		, row.getParameter("msmt_valu_3trd"	))
					.update("msmt_valu_4frt"		, row.getParameter("msmt_valu_4frt"	))
					.update("msmt_valu_5fit"		, row.getParameter("msmt_valu_5fit"	))
					.update("msmt_valu_6six"		, row.getParameter("msmt_valu_6six"	))
					.update("msmt_valu_7svn"		, row.getParameter("msmt_valu_7svn"	))
					.update("msmt_valu_8egh"		, row.getParameter("msmt_valu_8egh"	))
					.update("msmt_valu_9nin"		, row.getParameter("msmt_valu_9nin"	))
					.update("msmt_valu_10"			, row.getParameter("msmt_valu_10"	))
					.update("insp_qntt"				, row.getParameter("insp_qntt"		))
					.update("good_qntt"				, row.getParameter("good_qntt"		))
					.update("poor_qntt"				, row.getParameter("poor_qntt"		))
					.update("pass_qntt"				, row.getParameter("pass_qntt"		))
					.update("poor_caus_bacd"		, row.getParameter("poor_caus_bacd"	))
					.update("poor_type_bacd"		, row.getParameter("poor_type_bacd"	))
					.update("judt_dvcd"				, row.getParameter("judt_dvcd"		))
					.update("insp_scre_numb"		, row.getParameter("insp_scre_numb"	))
					.update("smpl_numb"				, row.getParameter("smpl_numb"		))
					.update("istt_yorn"				, row.getParameter("istt_yorn"		))
//					.update("insp_sbsc_dvcd"		, row.getParameter("insp_sbsc_dvcd"	))

					.update("uper_seqn"				, row.getParameter("uper_seqn"		))
					.update("disp_seqn"				, row.getParameter("disp_seqn"		))


					.update("find_name"				, row.getParameter("mold_code"		)
													+ " "
													+ row.getParameter("mold_name"		))

					.update("line_stat"				, row.getParameter("line_stat"		))
					.insert("line_levl"				, row.getParameter("line_levl"		))
					.update("updt_idcd"				, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}

		data.execute();
		return null ;
	}
	public SqlResultMap setListerPopup(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			data.param
				.table("wkct_insp")
				.where("where invc_numb       = :invc_numb			")
				.where("and line_seqn         = :line_seqn			")
				.where("and insp_sbsc_seqn    = :insp_sbsc_seqn		")

				.unique("invc_numb"				, row.fixParameter("invc_numb"		))
				.unique("line_seqn"				, row.fixParameter("seqn"			))
				.unique("insp_sbsc_seqn"		, row.fixParameter("line_seqn"		))

				.update("wkct_insp_dvcd"		, row.getParameter("wkct_insp_dvcd"))
				.update("msmt_valu_1fst"		, row.getParameter("msmt_valu_1fst"	))
				.update("msmt_valu_2snd"		, row.getParameter("msmt_valu_2snd"	))
				.update("msmt_valu_3trd"		, row.getParameter("msmt_valu_3trd"	))
				.update("msmt_valu_4frt"		, row.getParameter("msmt_valu_4frt"	))
				.update("msmt_valu_5fit"		, row.getParameter("msmt_valu_5fit"	))
				.update("judt_dvcd"				, row.getParameter("judt_dvcd"	))
				.update("insp_date"				, row.getParamText("insp_date"))
				.update("insp_cond"				, row.getParamText("insp_cond"))
				.update("wkod_numb"				, row.getParameter("wkod_numb"))
				.update("insp_qntt"				, row.getParameter("indn_qntt"	))
				.update("good_qntt"				, row.getParameter("good_qntt"	))
				.update("poor_qntt"				, row.getParameter("poor_qntt"	))
				.update("item_idcd"				, row.getParameter("item_idcd"	))
				.update("insp_strt_time"		, row.getParamText("insp_strt_time")+"00")
				.update("wkct_idcd"				, row.getParameter("wkct_idcd"	))
				.update("insp_cvic_idcd"		, row.getParameter("insp_cvic_idcd"	))
				.update("insp_type_idcd"		, row.getParameter("insp_type_idcd"	))
				.update("insp_mthd_dvcd"		, row.getParameter("insp_mthd_dvcd"	))

				.update("uper_seqn"				, row.getParameter("uper_seqn"		))
				.update("disp_seqn"				, row.getParameter("disp_seqn"		))
				.update("line_stat"				, row.getParameter("line_stat"		))
				.insert("line_levl"				, row.getParameter("line_levl"		))
				.update("updt_idcd"				, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
				.update("updt_ipad"				, arg.remoteAddress )
				.insert("crte_ipad"				, arg.remoteAddress )
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.insert);

		}

		data.execute();
		return null ;
	}
}
