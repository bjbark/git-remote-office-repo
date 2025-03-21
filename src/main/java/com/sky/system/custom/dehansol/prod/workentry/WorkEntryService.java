package com.sky.system.custom.dehansol.prod.workentry;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
@Service("dehansol.WorkEntryService")
public class WorkEntryService extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.invc_numb        , a.invc_date       , a.bzpl_idcd        , a.prod_dept_idcd	")
			.where("        , a.cstm_idcd        , a.wkfw_idcd       , a.wkct_idcd        , a.cvic_idcd			")
			.where("        , a.mold_idcd        , a.item_idcd       , a.mtrl_bacd        , a.pdsd_numb			")
			.where("        , a.wkod_numb        , a.wkod_seqn       , a.dayn_dvcd        , a.indn_qntt			")
			.where("        , a.prod_qntt        , a.good_qntt       , a.poor_qntt        , a.theo_qntt			")
			.where("        , a.succ_qntt        , a.ostt_qntt       , a.stok_qntt        , a.work_strt_dttm	")
			.where("        , a.work_endd_dttm   , a.need_time       , a.work_mnhr        , a.wker_idcd			")
			.where("        , a.work_pcnt        , a.lott_numb       , a.rewd_objt_qntt   , a.work_cond_1fst	")
			.where("        , a.work_cond_2snd   , a.work_cond_3trd  , a.work_cond_4frt   , a.work_cond_5fit	")
			.where("        , a.work_cond_6six   , a.stun_prod_qntt  , a.stun_good_qntt   , a.stun_poor_qntt	")
			.where("        , a.work_dvcd        , a.wkct_insp_yorn  , a.last_wkct_yorn   , a.work_para			")
			.where("        , a.mtrl_ivst_yorn   , a.prog_stat_dvcd  , a.dsct_resn_dvcd   						")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif													")
			.where("        , w.wkct_name        , i.item_name       , i.item_spec        , i.item_code			")
			.where("        , c.cstm_name        , u.user_name as wker_name               , v.cvic_name			")
			.where("        , substring(work_strt_dttm,1,8) as work_strt_date									")
			.where("        , substring(work_strt_dttm,9,4) as work_strt_time									")
			.where("        , substring(work_endd_dttm,1,8) as work_endd_date									")
			.where("        , substring(work_endd_dttm,9,4) as work_endd_time									")
			.where("        , date_format((timediff(work_endd_dttm , work_strt_dttm)),'%H:%i') as wk_time		")
			.where("from   work_book a																			")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join user_mast u on a.wker_idcd = u.user_idcd									")
			.where("left outer join cvic_mast v on a.cvic_idcd = v.cvic_idcd									")
			.where("where  1=1																					")
			.where("and    STR_TO_DATE( :work_date,'%Y%m%d') = DATE_FORMAT(a.work_strt_dttm,'%Y%m%d')			", arg.getParamText("work_date"))
			.where("and    STR_TO_DATE( :work_date2,'%Y%m%d') <= DATE_FORMAT(a.work_strt_dttm,'%Y%m%d')			", arg.getParamText("work_date2"))
			.where("and    STR_TO_DATE( :work_date3,'%Y%m%d') >= DATE_FORMAT(a.work_endd_dttm,'%Y%m%d')			", arg.getParamText("work_date3"))
			.where("and    a.wkct_idcd = :wkct_idcd"             , arg.getParameter("wkct_idcd"))
			.where("order by a.work_strt_dttm asc limit 30000 ) a												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}



	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select max(line_seqn) as seq															")
		;
		data.param
			.where("from  work_book																			")
			.where("where invc_numb = :invc_numb", arg.getParameter("invc_numb								"))
		;
		return data.selectForMap();
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String set = arg.getParamText("_set");


		for (SqlResultRow row : map) {
			if(set.equals("delete")){
				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"				, row.fixParameter("invc_numb"		))
				;
				data.attach(Action.delete)
				;
			}else{
				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb								")

					.unique("invc_numb"				, row.fixParameter("invc_numb"		))

					.update("wkct_idcd"				, row.getParameter("wkct_idcd"		))

					.update("invc_date"				, row.getParameter("invc_date"		))
					.update("prod_qntt"				, row.getParameter("prod_qntt"		))
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"		))
					.update("item_idcd"				, row.getParameter("item_idcd"		))
					.update("wker_idcd"				, row.getParameter("wker_idcd"		))
					.update("dayn_dvcd"				, row.getParameter("dayn_dvcd"		))
					.update("work_strt_dttm"		, row.getParamText("invc_date"		) + row.getParamText("work_strt_time"))
					.update("work_endd_dttm"		, row.getParamText("work_endd_date"	) + row.getParamText("work_endd_time"))
					.update("succ_qntt"				, row.getParameter("succ_qntt"		))
					.update("ostt_qntt"				, row.getParameter("ostt_qntt"		))
					.update("stok_qntt"				, row.getParameter("stok_qntt"		))
					.update("poor_qntt"				, row.getParameter("poor_qntt"		))


					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("invc_numb").trim() +row.getParameter("item_idcd")+ row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.modify);
			}
		}
		data.execute();
		return null;
	}

	public SqlResultMap getWkctSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.wkct_idcd         , a.wkct_code        , a.wkct_name         , a.wkct_stnm		")
			.query("        , a.bzpl_idcd         , a.dept_idcd        , a.labo_rate_idcd    , a.otod_yorn		")
			.query("        , a.cstm_idcd         , a.rslt_rept_yorn											")
			.query("        , e.labo_rate_name    , b.dept_name        , d.cstm_name							")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif         , a.crte_user_name   , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd																		")
		;
		data.param
			.query("from    wkct_mast a																			")
			.query("left outer join dept_mast b on a.dept_idcd = b.dept_idcd									")
			.query("left outer join cstm_mast d on a.cstm_idcd = d. cstm_idcd									")
			.query("left outer join labo_rate e on a.labo_rate_idcd = e. labo_rate_idcd							")
			.query("where   1=1																					")
			.query("and     a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("and     a.stok_mngt_yorn = :stok_mngt_yorn				",arg.getParamText("stok_mngt_yorn" ))

			.query("order by a.wkct_code ) a																	")
		;
		return data.selectForMap();
	}
}
