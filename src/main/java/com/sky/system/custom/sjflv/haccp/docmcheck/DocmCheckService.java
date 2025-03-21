package com.sky.system.custom.sjflv.haccp.docmcheck;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

import net.sky.http.dispatch.service.HostPropertiesService;

@Service("sjflv.DocmCheckService")
public class DocmCheckService {

	@Autowired
	private HostPropertiesService property;
	
	public SqlResultMap getDocmMast(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize  ")
		;
		data.param
			.query("SELECT hdm.mngt_numb            , hdm.docm_name              , hdm.docm_numb			")
			.query("     , hdm.dwup_ccle_dvcd       , hdm.line_stat											")
			.query("     , ham.apvl_name_1fst       , ham.apvl_name_2snd         , ham.apvl_name_3trd		")
			.query("     , ham.apvl_drtr_idcd_1fst  , ham.apvl_drtr_idcd_2snd    , ham.apvl_drtr_idcd_3trd	")
			.query("     , um1.user_name AS apvl_drtr_name_1fst												")
			.query("     , um2.user_name AS apvl_drtr_name_2snd												")
			.query("     , um3.user_name AS apvl_drtr_name_3trd												")
			.where("  FROM haccp_docm_mast hdm																")
			.where("  LEFT OUTER JOIN haccp_apvl_mast ham  ON hdm.mngt_numb = ham.mngt_numb					")
			.where("  LEFT OUTER JOIN user_mast um1        ON ham.apvl_drtr_idcd_1fst = um1.user_idcd		")
			.where("  LEFT OUTER JOIN user_mast um2        ON ham.apvl_drtr_idcd_2snd = um2.user_idcd		")
			.where("  LEFT OUTER JOIN user_mast um3        ON ham.apvl_drtr_idcd_3trd = um3.user_idcd		")
			.where(" WHERE 1=1																				")
			.where("   AND ham.apvl_drtr_idcd_1fst = :apvl_drtr_idcd_1fst	", arg.getParameter("apvl_drtr_idcd_1fst"	))
			.where("   AND hdm.line_stat = :line_stat						", arg.getParameter("line_stat"				))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	public SqlResultMap getBook(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize  ")
		;
		data.param
			.query("SELECT hb.mngt_numb      , hb.invc_date      , line_seqn      , json_data")
			.where("  FROM haccp_book hb									")
			.where(" WHERE 1=1												")
			.where("   AND hb.mngt_numb = :mngt_numb	", arg.getParameter("mngt_numb"	))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	public SqlResultMap setBook(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		
		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			data.param
				.table("haccp_book													")
				.where("WHERE mngt_numb = :mngt_numb								")
				.where("  AND invc_date = :invc_date								")
				.where("  AND line_seqn = :line_seqn								")
	
				.unique("mngt_numb"			, row.fixParameter("mngt_numb"			))
				.unique("invc_date"			, row.fixParameter("invc_date"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
	
				.update("json_data"			, row.getParameter("json_data"		))
	
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
			.query("SELECT json_data					")
			.where("  FROM haccp_book					")
			.where(" WHERE 1=1							")
			.where("   AND mngt_numb = :mngt_numb	", arg.getParameter("mngt_numb"))
			.where("   AND invc_date = :invc_date	", arg.getParameter("invc_date"))
			.where("   AND line_seqn = :line_seqn	", arg.getParameter("line_seqn"))
		;
		
		return data.selectForMap();
	}
}
