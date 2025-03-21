package com.sky.system.prod.cvic.cvicchecktypeitem;

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
public class CvicCheckTypeItemService  extends DefaultServiceHandler {
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
			.query("select *																						")
		;
		data.param
			.query("from (																							")
			.query("select     a.chek_type_idcd  , a.chek_type_code  , a.chek_type_name      , a.chek_mthd_dvcd		")
			.query("         , a.chek_cond																			")
			.query("         , a.user_memo       , a.sysm_memo       , a.prnt_idcd									")
			.query("         , a.line_levl       , a.line_ordr       , a.line_stat           , a.line_clos			")
			.query("         , a.find_name       , a.updt_user_name  , a.updt_ipad           , a.updt_dttm			")
			.query("         , a.updt_idcd       , a.updt_urif       , a.crte_user_name      , a.crte_ipad			")
			.query("         , a.crte_dttm       , a.crte_idcd       , a.crte_urif									")
		;
		data.param //퀴리문
			.query("from cvic_chck_type a																			")
			.query("where   1=1																						")
			.query("and     a.find_name like %:find_name%"	, arg.getParameter("find_name"))
			.query("and     a.line_stat = :line_stat"		, arg.getParamText("line_stat"))
			.query("and     a.line_stat < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.chek_type_code ) a																		")
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
			.query("select    a.chek_type_idcd   , a.line_seqn        , a.chek_sbsc_name   , a.chek_mthd_dvcd	")
			.query("        , a.chek_cond        , a.rslt_iput_dvcd   , a.msmt_mthd_dvcd   , a.goal_levl		")
			.query("        , a.uppr_valu        , a.lwlt_valu        , a.remk_text        , a.uper_seqn		")
			.query("        , a.disp_seqn																		")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , c.chek_type_code   , c.chek_type_name   , a.chek_mthd_dvcd						")
		;
		data.param
			.where("from cvic_chck_type_item a																	")
			.where("left outer join cvic_chck_type c on a.chek_type_idcd = c.chek_type_idcd						")
			.where("where  1=1																					")
			.where("and    a.chek_type_idcd = :chek_type_idcd" , arg.getParameter("chek_type_idcd"))
			.where("order by a.line_seqn																		")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select     a.chek_type_idcd  , a.chek_type_code  , a.chek_type_name      , a.chek_mthd_dvcd		")
			.query("         , a.chek_cond																			")
			.query("         , a.user_memo       , a.sysm_memo       , a.prnt_idcd									")
			.query("         , a.line_levl       , a.line_ordr       , a.line_stat           , a.line_clos			")
			.query("         , a.find_name       , a.updt_user_name  , a.updt_ipad           , a.updt_dttm			")
			.query("         , a.updt_idcd       , a.updt_urif       , a.crte_user_name      , a.crte_ipad			")
			.query("         , a.crte_dttm       , a.crte_idcd       , a.crte_urif									")
		;
		data.param
			.where("from cvic_chck_type a																			")
			.where("where   1=1																						")
			.where("and     a.chek_type_idcd    =:chek_type_idcd  "		, arg.getParamText("chek_type_idcd"))
			.where("and     a.line_stat < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.chek_type_code																		")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.chek_type_idcd   , a.line_seqn        , a.chek_sbsc_name   , a.chek_mthd_dvcd	")
				.query("        , a.chek_cond        , a.rslt_iput_dvcd   , a.msmt_mthd_dvcd   , a.goal_levl		")
				.query("        , a.uppr_valu        , a.lwlt_valu        , a.remk_text        , a.uper_seqn		")
				.query("        , a.disp_seqn																		")
				.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
				.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
				.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
				.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
				.query("        , a.crte_idcd        , a.crte_urif													")
				.query("        , c.chek_type_code   , c.chek_type_name   , a.chek_mthd_dvcd						")
			;
			data.param
				.where("from cvic_chck_type_item a																	")
				.where("left outer join cvic_chck_type c on a.chek_type_idcd = c.chek_type_idcd						")
				.where("where  1=1																					")
				.where("and    a.chek_type_idcd = :chek_type_idcd" , arg.getParameter("chek_type_idcd"))
				.where("order by a.line_seqn																		")
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
				data.param
					.table("cvic_chck_type"												)
					.where("where chek_type_idcd = :chek_type_idcd						")

					.unique("chek_type_idcd"	, row.fixParameter("chek_type_idcd"		))

					.update("chek_type_code"	, row.getParameter("chek_type_code"			))
					.update("chek_type_name"	, row.getParameter("chek_type_name"			))
					.update("chek_mthd_dvcd"	, row.getParameter("chek_mthd_dvcd"			))
					.update("chek_cond"			, row.getParameter("chek_cond"			))

					.update("updt_user_name"	, row.getParameter("updt_user_name"		))
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.update("updt_urif"			, row.getParameter("updt_urif"			))
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.insert("crte_urif"			, row.getParameter("crte_urif"			))
					.action = rowaction;
				data.attach();

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
					.table("cvic_chck_type_item"										)
					.where("where chek_type_idcd = :chek_type_idcd						")		//점검유형 ID
					.where("and   line_seqn      = :line_seqn							")		//순번

					.unique("chek_type_idcd"	, row.fixParameter("chek_type_idcd"		))		//점검유형 ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번
				;data.attach(rowaction);
			} else {
				data.param
					.table("cvic_chck_type_item"													)
					.where("where chek_type_idcd = :chek_type_idcd						")	//점검유형 ID
					.where("and   line_seqn      = :line_seqn							")	//순번

					.unique("chek_type_idcd"	, row.fixParameter("chek_type_idcd"		))	//점검유형 ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번

					.update("chek_sbsc_name"	, row.getParameter("chek_sbsc_name"		))	//점검항목명
					.update("chek_mthd_dvcd"	, row.getParameter("chek_mthd_dvcd"		))	//점검방법
					.update("chek_cond"			, row.getParameter("chek_cond"			))	//점검조건
					.update("rslt_iput_dvcd"	, row.getParameter("rslt_iput_dvcd"		))	//결과입력
					.update("msmt_mthd_dvcd"	, row.getParameter("msmt_mthd_dvcd"		))	//측정방법
					.update("goal_levl"			, row.getParameter("goal_levl"			))	//목표수준
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

		data.param
			.table("cvic_chck_type")
			.where("where chek_type_idcd = :chek_type_idcd ")

			.unique("chek_type_idcd"		, arg.fixParameter("chek_type_idcd"))
			.update("line_stat"				, 2					)
			.update("updt_ipad"				, arg.remoteAddress)
			.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);

		data.execute();
		return null;
	}

}
