package com.sky.system.qc.insptypeitem;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class InspTypeItemService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
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
			.where("         a.insp_type_idcd  , a.insp_type_code   , a.insp_type_name   , a.insp_mthd_dvcd	")
			.where("       , a.smor_rate       , a.wkct_insp_yorn   , a.rcpt_insp_yorn   , a.last_insp_yorn	")
			.where("       , a.shpm_insp_yorn  , a.insp_cond												")
			.where("       , a.user_memo       , a.sysm_memo        , a.prnt_idcd							")
			.where("       , a.line_levl       , a.line_ordr        , a.line_stat        , a.line_clos		")
			.where("       , a.find_name       , a.updt_user_name   , a.updt_ipad        , a.updt_dttm		")
			.where("       , a.updt_idcd       , a.updt_urif        , a.crte_user_name   , a.crte_ipad		")
			.where("       , a.crte_dttm       , a.crte_idcd        , a.crte_urif							")
			.where("from	insp_type_mast a																")
			.where("where	1=1																				")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.insp_type_name	like %:insp_type_name%"	, arg.getParameter("insp_type_name"))
			.where("and		substring(a.crte_dttm,1,8)	>= :fr_date " , arg.getParamText("fr_date" ))
			.where("and		substring(a.crte_dttm,1,8)	<= :re_date " , arg.getParamText("re_date" ))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.insp_type_idcd																")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
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
			.query("        , a.crte_idcd        , a.crte_urif        , b.wkct_idcd								")
			.query("        , b.insp_type_name   , b.insp_type_code   , d.cvic_idcd        , d.cvic_name		")
		;
		data.param
			.where("from   insp_cond a																			")
			.where("       left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd				")
			.where("       left outer join cvic_mast      d on a.insp_cvic_idcd = d.cvic_idcd 					")
			.where("where  1=1																					")
			.where("and     a.insp_type_idcd = :insp_type_idcd" , arg.getParameter("insp_type_idcd"))
			.where("order by a.insp_type_idcd ,a.line_seqn														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {
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
			.query("        , a.crte_idcd        , a.crte_urif        , b.wkct_idcd								")
			.query("        , b.insp_type_name   , b.insp_type_code   , d.cvic_idcd        , d.cvic_name		")
		;
		data.param
			.where("from   insp_cond a																			")
			.where("       left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd				")
			.where("       left outer join cvic_mast      d on a.insp_cvic_idcd = d.cvic_idcd 					")
			.where("where  1=1																					")
			.where("and     a.insp_type_idcd = :insp_type_idcd" , arg.getParameter("insp_type_idcd"))
			.where("order by a.insp_type_idcd ,a.line_seqn														")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select																						")
			.query("          a.insp_type_idcd  , a.insp_type_code   , a.insp_type_name   , a.insp_mthd_dvcd	")
			.query("        , a.smor_rate       , a.wkct_insp_yorn   , a.rcpt_insp_yorn   , a.last_insp_yorn	")
			.query("        , a.shpm_insp_yorn  , a.insp_cond													")
			.query("        , a.user_memo       , a.sysm_memo        , a.prnt_idcd								")
			.query("        , a.line_levl       , a.line_ordr        , a.line_stat        , a.line_clos			")
			.query("        , a.find_name       , a.updt_user_name   , a.updt_ipad        , a.updt_dttm			")
			.query("        , a.updt_idcd       , a.updt_urif        , a.crte_user_name   , a.crte_ipad			")
			.query("        , a.crte_dttm       , a.crte_idcd        , a.crte_urif								")
			;
		data.param
			.where("from    insp_type_mast a																	")
			.where("        left outer join insp_type_mast b  on a.insp_type_idcd = b.insp_type_idcd			")
			.where("where   1=1																					")
			.where("and     a.insp_type_idcd    =:insp_type_idcd  "		, arg.getParamText("insp_type_idcd"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.insp_type_idcd   , a.line_seqn        , a.insp_sbsc_name   , a.insp_cond		")
				.query("        , a.insp_levl_uppt   , a.insp_levl_midl   , a.insp_levl_lprt						")
				.query("        , a.rslt_iput_dvcd   , a.goal_levl													")
				.query("        , a.ctq_sbsc_yorn    , a.msmt_mthd_dvcd   , a.insp_levl        , a.lott_judt_stnd	")
				.query("        , a.insp_mthd_dvcd   , a.uppr_valu        , a.lwlt_valu								")
				.query("        , a.remk_text        , a.uper_seqn        , a.disp_seqn        , a.user_memo		")
				.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
				.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
				.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
				.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
				.query("        , a.crte_idcd        , a.crte_urif													")
				.query("        , b.insp_type_name   , b.insp_type_code   , d.cvic_idcd        , d.cvic_name		")
			;
			data.param
				.where("from   insp_cond a																		")
				.where("       left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd			")
				.where("       left outer join cvic_mast d on a.insp_cvic_idcd = d.cvic_idcd 					")
				.where("where  1=1																				")
				.where("and     a.insp_type_idcd = :insp_type_idcd"	, arg.getParameter("insp_type_idcd"))
				.where("and     a.insp_cond      = :insp_cond"		, arg.getParameter("insp_cond"))
				.where("and     b.insp_type_name = :insp_type_name"	, arg.getParamText("insp_type_name"))
				.where("and     d.cvic_idcd      = :cvic_idcd"		, arg.getParamText("cvic_idcd"))
				.where("order by a.insp_type_idcd																")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
		}
	data.execute();
	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("insp_cond"													)
					.where("where insp_type_idcd	= :insp_type_idcd					")		//검사유형 ID
					.where("and   line_seqn			= :line_seqn						")	//순번
					//
					.unique("insp_type_idcd"	, row.fixParameter("insp_type_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번
					//
				;data.attach(rowaction);

			} else {
				data.param
					.table("insp_cond"													)
					.where("where insp_type_idcd = :insp_type_idcd						")	//검사유형 ID
					.where("and   line_seqn	     = :line_seqn							")	//순번

					.unique("insp_type_idcd"	, row.fixParameter("insp_type_idcd"		))	//검사유형 ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번

					.update("insp_sbsc_name"	, row.getParameter("insp_sbsc_name"		))	//검사항목명
					.update("insp_mthd_dvcd"	, row.getParameter("insp_mthd_dvcd"		))	//검사방법구분코드
					.update("ctq_sbsc_yorn"		, row.getParameter("ctq_sbsc_yorn"		))	//CTQ항목여부
					.update("msmt_mthd_dvcd"	, row.getParameter("msmt_mthd_dvcd"		))	//측정방법구분코드
					.update("insp_levl"			, row.getParameter("insp_levl"			))	//검사수준
					.update("lott_judt_stnd"	, row.getParameter("lott_judt_stnd"		))	//lot합격수준
					.update("insp_levl_uppt"	, row.getParameter("insp_levl_uppt"		))	//검사수준상
					.update("insp_levl_midl"	, row.getParameter("insp_levl_midl"		))	//검사수준중
					.update("insp_levl_lprt"	, row.getParameter("insp_levl_lprt"		))	//검사수준하
					.update("insp_cond"			, row.getParameter("insp_cond"			))	//검사조건
					.update("rslt_iput_dvcd"	, row.getParameter("rslt_iput_dvcd"		))	//결과입력구분코드
					.update("goal_levl"			, row.getParameter("goal_levl"			))	//목표수준
					.update("insp_cvic_idcd"	, row.getParameter("insp_cvic_idcd"		))	//설비코드
					.update("base_code"			, row.getParameter("base_code"			))	//항목코드
					.update("uppr_valu"			, row.getParameter("uppr_valu"			))	//상한값
					.update("lwlt_valu"			, row.getParameter("lwlt_valu"			))	//하한값
					.update("remk_text"			, row.getParameter("remk_text"			))	//비고
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
 					.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번

					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
			}
		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		temp.param
			.query("select insp_type_idcd, line_stat, line_clos				")
			.query("from   insp_type_mast									")
		 	.query("where  insp_type_idcd = :insp_type_idcd", arg.fixParameter("insp_type_idcd"))
		;
		data.param
			.table("insp_type_mast")
			.where("where insp_type_idcd = :insp_type_idcd ")
			//
			.unique("insp_type_idcd"		, arg.fixParameter("insp_type_idcd"))
			.update("line_stat"		, 2)
			.update("updt_ipad"				, arg.remoteAddress)
			.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

}
