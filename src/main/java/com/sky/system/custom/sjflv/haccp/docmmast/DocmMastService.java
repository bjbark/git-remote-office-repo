package com.sky.system.custom.sjflv.haccp.docmmast;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.service.HostPropertiesService;

@Service("sjflv.DocmMastService")
public class DocmMastService {

	@Autowired
	private HostPropertiesService property;
	
	public SqlResultMap getDocmMast(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize  ")
		;
		data.param
			.query("SELECT    hdm.*												")
			.where("  FROM haccp_docm_mast hdm									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	public SqlResultMap getApvlMast(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize  ")
		;
		data.param
			.query("SELECT ham.mngt_numb           , ham.line_seqn										")
			.query("     , ham.apvl_name_1fst      , ham.apvl_name_2snd      , ham.apvl_name_3trd		")
			.query("     , ham.apvl_drtr_idcd_1fst , ham.apvl_drtr_idcd_2snd , ham.apvl_drtr_idcd_3trd	")
			.query("     , um1.user_name AS apvl_drtr_name_1fst											")
			.query("     , um2.user_name AS apvl_drtr_name_2snd											")
			.query("     , um3.user_name AS apvl_drtr_name_3trd											")
			.where("  FROM haccp_apvl_mast ham															")
			.where("  LEFT OUTER JOIN user_mast um1 ON ham.apvl_drtr_idcd_1fst = um1.user_idcd			")
			.where("  LEFT OUTER JOIN user_mast um2 ON ham.apvl_drtr_idcd_2snd = um2.user_idcd			")
			.where("  LEFT OUTER JOIN user_mast um3 ON ham.apvl_drtr_idcd_3trd = um3.user_idcd			")
			.where(" WHERE 1=1																			")
			.where("   AND ham.mngt_numb = :mngt_numb	", arg.getParameter("mngt_numb"					))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("SELECT hdm.mngt_numb      , hdm.docm_name      , hdm.docm_numb      , hdm.dwup_ccle_dvcd	")
			.query("     , hdm.docm_bacd_1fst , hdm.docm_bacd_2snd , hdm.docm_bacd_3trd , hdm.line_stat			")
			.query("  FROM haccp_docm_mast hdm																	")
			.query(" WHERE 1=1																					")
			.query("   AND hdm.mngt_numb = :mngt_numb	", arg.fixParameter("mngt_numb"							))
		;
		SqlResultMap info = data.selectForMap();
		data.clear();
		if (info.size() == 1) {
			data.param
				.query("SELECT ham.mngt_numb           , ham.line_seqn           , ham.apvl_name_1fst		")
				.query("     , ham.apvl_name_2snd      , ham.apvl_name_3trd      , ham.apvl_drtr_idcd_1fst	")
				.query("     , ham.apvl_drtr_idcd_2snd , ham.apvl_drtr_idcd_3trd							")
				.query("     , um1.user_name AS apvl_drtr_name_1fst											")
				.query("     , um2.user_name AS apvl_drtr_name_2snd											")
				.query("     , um3.user_name AS apvl_drtr_name_3trd											")
				.query("  FROM haccp_apvl_mast ham															")
				.query("  LEFT OUTER JOIN user_mast um1 ON ham.apvl_drtr_idcd_1fst = um1.user_idcd			")
				.query("  LEFT OUTER JOIN user_mast um2 ON ham.apvl_drtr_idcd_2snd = um2.user_idcd			")
				.query("  LEFT OUTER JOIN user_mast um3 ON ham.apvl_drtr_idcd_3trd = um3.user_idcd			")
				.query(" WHERE 1=1																			")
				.query("   AND ham.mngt_numb = :mngt_numb	", arg.fixParameter("mngt_numb"					))
			;
			info.get(0).put("product", data.selectForMap());
		}
		data.clear();
		return info;
	}
	
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			
			if (rowaction == Action.delete) {
			} else {
				data.param
					.table("haccp_docm_mast"					 )
					.where("WHERE mngt_numb = :mngt_numb		")
					//
					.unique("mngt_numb"			, row.fixParameter("mngt_numb"           ))  /*  관리번호  */
					//
					.update("docm_name"			, row.getParameter("docm_name"           ))  /*  문서명  */
					.update("docm_numb"			, row.getParameter("docm_numb"           ))  /*  문서번호  */
					.update("dwup_ccle_dvcd"	, row.getParameter("dwup_ccle_dvcd"      ))  /*  작성주기구분코드  */
					.update("docm_bacd_1fst"	, row.getParameter("docm_bacd_1fst"      ))  /*  문서분류코드1  */
					.update("docm_bacd_2snd"	, row.getParameter("docm_bacd_2snd"      ))  /*  문서분류코드2  */
					.update("html_docm"			, row.getParameter("docm_bacd_2snd"      ))  /*  문서분류코드3  */
					.update("find_name"			, row.getParamText("docm_name"            ).trim()
												+ " "
												+ row.getParamText("docm_numb"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("upt_id"				))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crt_id"				))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(rowaction);

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
			data.execute();
			data.clear();
		}
	return null;
	}
	
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				data.param
					.table("haccp_apvl_mast"								 )
					.where("WHERE mngt_numb		= :mngt_numb				")  /*  관리번호  */
					.where("  AND line_seqn		= :line_seqn				")  /*  순번  */
					//
					.unique("mngt_numb"				, row.fixParameter("mngt_numb"			))
					.unique("line_seqn"				, row.fixParameter("line_seqn"			))
					//
					.update("apvl_name_1fst"		, row.getParameter("apvl_name_1fst"		))  /*  결재명#1  */
					.update("apvl_name_2snd"		, row.getParameter("apvl_name_2snd"		))  /*  결재명#2  */
					.update("apvl_name_3trd"		, row.getParameter("apvl_name_3trd"		))  /*  결재명#3  */
					.update("apvl_drtr_idcd_1fst"	, row.getParameter("apvl_drtr_idcd_1fst"))  /*  결재담당자ID#1  */
					.update("apvl_drtr_idcd_2snd"	, row.getParameter("apvl_drtr_idcd_2snd"))  /*  결재담당자ID#2  */
					.update("apvl_drtr_idcd_3trd"	, row.getParameter("apvl_drtr_idcd_3trd"))  /*  결재담당자ID#3  */
					
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("upt_id"				))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crt_id"				))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
	}
	
	public SqlResultMap setHtmlTemplate(HttpRequestArgument arg, byte[] file) throws Exception {
		DataMessage data = arg.newStorage("POS");
		System.out.println("arg : " + arg.toString());
		
		data.param
			.table("haccp_docm_mast"					 )
			.where("WHERE mngt_numb = :mngt_numb		")
			//
			.unique("mngt_numb"			, arg.fixParameter("mngt_numb"))  /*  관리번호  */
			
			.update("html_docm"			, file	)
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
		
		return null ;
	}
	
	public SqlResultMap getHtmlTemplate(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq + ".POS");
		
		data.param
			.query("SELECT *														")
			.where("  FROM haccp_docm_mast											")
			.where(" WHERE mngt_numb = :mngt_numb	", arg.getParameter("mngt_numb"	))
		;
		
		return data.selectForMap();
	}
	
	public SqlResultMap getJsonData(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq + ".POS");
		
		data.param
			.query("SELECT *							")
			.where("  FROM haccp_book					")
			.where(" WHERE 1=1							")
			.where("   AND mngt_numb = :mngt_numb	", arg.getParameter("mngt_numb"))
			.where("   AND invc_date = :invc_date	", arg.getParameter("invc_date"))
			.where("   AND line_seqn = :line_seqn	", arg.getParameter("line_seqn"))
		;
		
		return data.selectForMap();
	}
}
