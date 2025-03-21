package com.sky.system.custom.sjflv.stock.etcisttwork;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.EtcIsttWorkService")
public class EtcIsttWorkService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize																				")
		;
		data.param // 조회
			.query("select a.*																								")
		;
		// 23.10.20 - 목록 비고에 입출고 품목 리스트 표시
		data.param // 조회
			.where("from (																									")
			.where("select																									")
			.where("        a.invc_numb      , a.invc_date      , a.bzpl_idcd      , a.istt_wrhs_idcd , a.reqt_dept_idcd	")
			.where("      , a.reqt_drtr_idcd , a.proc_dept_idcd , a.proc_drtr_idcd											")
			.where("      , a.used_dept_idcd , a.istt_dvcd      , a.cstm_dvcd      , a.cstm_idcd							")
			.where("      , a.cstm_name      , a.stok_type_dvcd																")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd												")
			.where("      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name			")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
			.where("      , w1.wrhs_name as istt_wrhs_name																	")
			.where("      , d1.dept_name as rept_dept_name																	")
			.where("      , u1.user_name as reqt_drtr_name																	")
			.where("      , d2.dept_name as proc_dept_name																	")
			.where("      , u2.user_name as proc_drtr_name																	")
			.where("      , d3.dept_name as used_dept_name																	")
			.where("        , (select group_concat(im.item_name separator ' / ')											")
			.where("             from etit_item ei 																			")
			.where("                  left outer join item_mast im on ei.item_idcd = im.item_idcd							")
			.where("            where ei.invc_numb = a.invc_numb) as remk_text												")			
			.where("from    etit_mast a																						")
			.where("        left outer join wrhs_mast w1  on a.istt_wrhs_idcd = w1.wrhs_idcd								")
			.where("        left outer join dept_mast d1  on a.reqt_dept_idcd = d1.dept_idcd								")
			.where("        left outer join dept_mast d2  on a.proc_dept_idcd = d2.dept_idcd								")
			.where("        left outer join dept_mast d3  on a.used_dept_idcd = d3.dept_idcd								")
			.where("        left outer join user_mast u1  on a.reqt_drtr_idcd = u1.user_idcd								")
			.where("        left outer join user_mast u2  on a.proc_drtr_idcd = u2.user_idcd								")
			.where("where   1=1																								")
			.where("and     a.invc_date  between :fr_dt          " , arg.getParamText("fr_dt") )
			.where("                     and     :to_dt          " , arg.getParamText("to_dt") )
			.where("and     a.proc_drtr_idcd = :proc_drtr_idcd   " , arg.getParamText("proc_drtr_idcd"))	//작업담당
//			.where("and     a.reqt_drtr_idcd = :reqt_drtr_idcd   " , arg.getParamText("reqt_drtr_idcd"))	//작업담당
			.where("and     a.ostt_dvcd   = :ostt_dvcd           " , arg.getParamText("ostt_dvcd"))
			.where("and     a.stok_type_dvcd   = :stok_type_dvcd " , arg.getParamText("stok_type_dvcd"))
			.where("and     a.istt_dvcd   = :istt_dvcd           " , arg.getParamText("istt_dvcd"))
			.where("and     a.bzpl_idcd   = :bzpl_idcd           " , arg.getParamText("bzpl_idcd"))
			.where("and     a.istt_wrhs_idcd   = :istt_wrhs_idcd " , arg.getParamText("istt_wrhs_idcd"))
			.where("and     a.line_clos   = :line_clos           " , arg.getParamText("line_clos"))
			.where("and     a.find_name   like %:find_name%      " , arg.getParamText("find_name"))
			.where("and     a.line_stat   = :line_stat1          " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat           " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																										")
			.where("order by a.invc_date desc , a.invc_numb desc															")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("SELECT COUNT(1) AS MAXSIZE																	")
		;
		data.param // 조회
			.query("SELECT ei.invc_numb      , ei.line_seqn      , ei.istt_qntt      , ei.unit_idcd				")
			.query("     , ei.lott_numb      , em.cstm_idcd      , em.cstm_dvcd      , em.istt_dvcd				")
			.query("     , cm.cstm_name	     , em.invc_date														")
			.query("     , im.item_idcd      , im.item_code      , im.item_name      , im.item_spec				")
			.query("     , em.proc_drtr_idcd , em.proc_dept_idcd												")
			.query("     , um.user_name AS proc_drtr_name														")
			.query("     , DATE_FORMAT(JSON_VALUE(ei.json_data,'$.make_date'), '%Y%m%d')  AS make_date			")
			.query("     , DATE_FORMAT(JSON_VALUE(ei.json_data,'$.rtil_ddln_date'), '%Y%m%d') AS rtil_ddln_date	")
			.where("  FROM etit_item ei																			")
			.where("  LEFT OUTER JOIN etit_mast em  ON ei.invc_numb = em.invc_numb								")
			.where("  LEFT OUTER JOIN item_mast im  ON ei.item_idcd = im.item_idcd								")
			.where("  LEFT OUTER JOIN cstm_mast cm  ON em.cstm_idcd = cm.cstm_idcd								")
			.where("  LEFT OUTER JOIN user_mast um  ON em.proc_drtr_idcd  = um.user_idcd						")
			.where(" WHERE 1=1																					")
			.where("   AND ei.item_idcd = :item_idcd	", arg.getParameter("item_idcd"							))
			.where("   AND em.invc_date >= :invc_date1	", arg.getParamText("invc_date1"						))
			.where("   AND em.invc_date <= :invc_date2	", arg.getParamText("invc_date2"						))
			.where(" ORDER BY em.invc_date DESC																	")
		;

		return data.selectForMap();
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select																						")
			.where("        a.invc_numb  , a.line_seqn      , a.item_idcd      , a.unit_idcd					")
			.where("      , a.istt_qntt  , a.stnd_pric      , a.vatx_incl_yorn , a.vatx_rate    , a.amnt		")
			.where("      , a.vatx_amnt  , a.ttsm_amnt      , a.istt_resn_dvcd 									")
			.where("      , a.stnd_unit  , a.stnd_unit_qntt , a.remk_text										")
			.where("      , a.lott_numb  , a.orig_invc_numb , a.orig_seqn										")
			.where("      , a.user_memo  , a.sysm_memo															")
			.where("      , a.prnt_idcd  , a.line_levl      , a.line_ordr      , a.line_stat    , a.line_clos	")
			.where("      , a.find_name  , a.updt_user_name , a.updt_ipad      , a.updt_dttm    , a.updt_idcd	")
			.where("      , a.updt_urif  , a.crte_user_name , a.crte_ipad      , a.crte_dttm    , a.crte_idcd	")
			.where("      , a.crte_urif  , a.uper_seqn      , a.disp_seqn										")
			.where("      , i.item_code  , i.item_name  as item_name											")
			.where("      , i.item_spec  as item_spec	    , i.acct_bacd										")
			.where("      , u.unit_name																			")
			.where("      , date_format(json_value(a.json_data, '$.make_date'), '%Y%m%d') as make_date			")
			.where("      , date_format(json_value(a.json_data, '$.rtil_ddln_date'), '%Y%m%d') as rtil_ddln_date	")
			.where("      , cast(replace(json_extract(a.json_data, '$.make_natn'),'\"','') as char) as make_natn ")
			.where("      , cast(replace(json_extract(a.json_data, '$.make_cmpy_name'),'\"','') as char) as make_cmpy_name ")
			.where("      , cast(replace(json_extract(a.json_data, '$.cstm_lott_numb'),'\"','') as char) as cstm_lott_numb ")
			.where("      , cast(replace(json_extract(a.json_data, '$.pack_qntt'),'\"','') as char) as pack_qntt")
			.where("from    etit_item a																			")
			.where("        left outer join item_mast i   on a.item_idcd      = i.item_idcd						")
			.where("        left outer join unit_mast u   on a.unit_idcd      = u.unit_idcd						")
			.where("where   1=1																					")
			.where("and     a.invc_numb = :invc_numb         " , arg.fixParameter("invc_numb") )
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by disp_seqn																			")
			.where(") a																							")
		;

		return data.selectForMap(sort);
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select																									")
			.query("        a.invc_numb      , a.invc_date      , a.bzpl_idcd      , a.istt_wrhs_idcd , a.reqt_dept_idcd	")
			.query("      , a.reqt_drtr_idcd , a.proc_dept_idcd , a.proc_drtr_idcd											")
			.query("      , a.used_dept_idcd , a.remk_text      , a.istt_dvcd      , a.cstm_dvcd      , a.cstm_idcd			")
			.query("      , a.cstm_name      , a.stok_type_dvcd																")
			.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd												")
			.query("      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name			")
			.query("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.query("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
			.query("      , w1.wrhs_name as istt_wrhs_name																	")
			.query("      , d1.dept_name as rept_dept_name																	")
			.query("      , u1.user_name as reqt_drtr_name																	")
			.query("      , d2.dept_name as proc_dept_name																	")
			.query("      , u2.user_name as proc_drtr_name																	")
			.query("      , d3.dept_name as used_dept_name																	")
			.query("from    etit_mast a																						")
			.query("        left outer join wrhs_mast w1  on a.istt_wrhs_idcd = w1.wrhs_idcd								")
			.query("        left outer join dept_mast d1  on a.reqt_dept_idcd = d1.dept_idcd								")
			.query("        left outer join dept_mast d2  on a.proc_dept_idcd = d2.dept_idcd								")
			.query("        left outer join dept_mast d3  on a.used_dept_idcd = d3.dept_idcd								")
			.query("        left outer join user_mast u1  on a.reqt_drtr_idcd = u1.user_idcd								")
			.query("        left outer join user_mast u2  on a.proc_drtr_idcd = u2.user_idcd								")
			.query("where   1=1																								")
			.query("and     a.invc_numb  = :invc_numb  ", arg.fixParameter("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select																						")
				.query("        a.invc_numb  , a.line_seqn      , a.item_idcd      , a.unit_idcd					")
				.query("      , a.istt_qntt  , a.stnd_pric      , a.vatx_incl_yorn , a.vatx_rate    , a.amnt		")
				.query("      , a.vatx_amnt  , a.ttsm_amnt      , a.istt_resn_dvcd									")
				.query("      , a.stnd_unit  , a.stnd_unit_qntt , a.remk_text      									")
				.query("      , a.lott_numb  , a.orig_invc_numb , a.orig_seqn										")
				.query("      , a.user_memo  , a.sysm_memo															")
				.query("      , a.prnt_idcd  , a.line_levl      , a.line_ordr      , a.line_stat    , a.line_clos	")
				.query("      , a.find_name  , a.updt_user_name , a.updt_ipad      , a.updt_dttm    , a.updt_idcd	")
				.query("      , a.updt_urif  , a.crte_user_name , a.crte_ipad      , a.crte_dttm    , a.crte_idcd	")
				.query("      , a.crte_urif  , a.uper_seqn      , a.disp_seqn										")
				.query("      , i.item_code  , i.item_name  as item_name											")
				.query("      , i.item_spec  as item_spec															")
				.query("      , a.lott_numb  as orig_lott_numb														")
				.query("      , u.unit_name																			")
				.query("      , cast(replace(json_extract(a.json_data, '$.make_natn'),'\"','') as char) as make_natn ")
				.query("      , cast(replace(json_extract(a.json_data, '$.make_cmpy_name'),'\"','') as char) as make_cmpy_name ")
				.query("      , date_format(json_value(a.json_data, '$.make_date'), '%Y%m%d') as make_date			")
				.query("      , date_format(json_value(a.json_data, '$.rtil_ddln_date'), '%Y%m%d') as rtil_ddln_date ")
				.query("      , cast(replace(json_extract(a.json_data, '$.cstm_lott_numb'),'\"','') as char) as cstm_lott_numb ")
				.query("      , cast(replace(json_extract(a.json_data, '$.pack_qntt'),'\"','') as char) as pack_qntt")
//				.query("      , json_value(a.json_data,'$.pack_qntt') as pack_qntt									")
				.query("from    etit_item a																			")
				.query("        left outer join item_mast i   on a.item_idcd      = i.item_idcd						")
				.query("        left outer join unit_mast u   on a.unit_idcd      = u.unit_idcd						")
				.query("where   1=1																					")
				.query("and     a.invc_numb = :invc_numb         " , arg.fixParameter("invc_numb") )
				.query("order by a.invc_numb, a.disp_seqn															")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}

		return info;
	}

	//입고내역 마감/해지
	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("etit_mast								")
				.where("where invc_numb		= :invc_numb		")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"))

				.update("line_clos"			, arg.getParameter("line_clos"))	//마감여부
			;
			data.attach(Action.update);
			data.execute();
		return null ;
	}

	//Lot No 중복 체크
	public void checkLottNoDup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		
		for (SqlResultRow row:map) {
			String lott_numb = row.getParamText("lott_numb");
		}

		SqlResultMap lott_info = arg.getParameter("records", SqlResultMap.class).get(0).getParameter("product", SqlResultMap.class);
		if (lott_info != null) {
			String lott_numbs = "";

			//삭제 항목은 제외한다. 변경 항목은 배치번호를 체크한다.
			for(SqlResultRow row:lott_info) {
				Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				if (rowaction != Action.delete) {
					String lott_numb = (String)row.getParamText("lott_numb");
					String orig_lott_numb =  (String)row.getParamText("orig_lott_numb");

					if (!lott_numb.equals(orig_lott_numb)) {
						lott_numbs += lott_numb + ",";
					}
				}
			}

			if (!lott_numbs.equals("")) {
				String [] ary_lott_numb = lott_numbs.split(",");

				data.param
					.query("select GROUP_CONCAT(distinct trim(lott_numb)) as lott_numb ")
					.query("     , count(distinct(lott_numb)) as lott_count ")
					.query("  from lot_isos_book ")
					.query(" where 1 = 1 ")
					.where("   and lott_numb in (:ary_lott_numb) ", ary_lott_numb)
				;
				int lott_count = Integer.parseInt(data.selectForMap().get(0).get("lott_count").toString());
				if (lott_count > 0) {
					String lott_numb  = (data.selectForMap().get(0).get("lott_numb").toString()).replaceAll(",", "<br>");
					throw new ServiceException(lott_count + "건의  Batch No가 중복되었습니다.<p><p>" + lott_numb);
				}
			}
		}
	}
	
	//Lot No 중복 체크
	public SqlResultRow getLottNumbDupCheck(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String lott_numb = "";
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			lott_numb += row.getParamText("lott_numb") + ",";
		}

		data.param
			.query("select GROUP_CONCAT(distinct trim(lott_numb)) as lott_numb ")
			.query("     , count(distinct(lott_numb)) as lott_count ")
			.query("  from lot_isos_book ")
			.query(" where 1 = 1 ")
			.where("   and lott_numb in (:lott_numb) ", lott_numb.split(","))
		;

		return data.selectForRow();
	}
	
	/**
	 * 입고등록
	 */
	public SqlResultMap setEtcIstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		// Lot No 중복 체크
		SqlResultRow lottDupCheck = getLottNumbDupCheck(arg);
		int lottDupCont = Integer.parseInt(lottDupCheck.getParamText("lott_count"));
		String msg = "건의 Batch No가 중복되었습니다.<p><p>";

		if (lottDupCont > 0) {
			throw new ServiceException("T " + lottDupCont +  msg + lottDupCheck.getParamText("lott_numb"));
		}
		
		ParamToJson trans = new ParamToJson();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String make_date="";
		String rtil_ddln_date="";
		List<String> invcList = new ArrayList<String>();

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			
			make_date = row.getParamText("make_date");
			rtil_ddln_date = row.getParamText("rtil_ddln_date");
			if (make_date.matches("^[0-9]+$")) {
			}else{
				if(!make_date.isEmpty()) {
					make_date = dateFormat.format(new Date(row.getParamText("make_date")));
				}
			}
			row.setParameter("make_date", make_date);
			if (rtil_ddln_date.matches("^[0-9]+$")) {
			}else{
				if(!rtil_ddln_date.isEmpty()) {
					rtil_ddln_date = dateFormat.format(new Date(row.getParamText("rtil_ddln_date")));
				}
			}
			row.setParameter("rtil_ddln_date", rtil_ddln_date);
			String json = trans.TranslateRow(arg, row, "etit_item_json_fields");
			
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			}
			if(row.getParamText("new_line_seqn").equals("1")) {
				// master 등록/수정
				data.param
					.table("etit_mast"													)
					.where("where invc_numb       = :invc_numb						")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))
					//
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  INVOICE일자  */
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))  /*  사업장ID  */
					.update("istt_wrhs_idcd"	, row.getParameter("istt_wrhs_idcd"		))  /*  입고창고ID  */
					.update("reqt_dept_idcd"	, row.getParameter("reqt_dept_idcd"		))  /*  요청부서ID  */
					.update("reqt_drtr_idcd"	, row.getParameter("reqt_drtr_idcd"		))  /*  요청담당자ID  */
					.update("cstm_dvcd"			, row.getParameter("cstm_dvcd"			))  /*  출고처 구분코드 */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))  /*  출고처 코드 */
					.update("cstm_name"			, row.getParameter("cstm_name"			))  /*  출고처 코드 */
					.update("istt_dvcd"			, row.getParameter("istt_dvcd"			))  /*  입고구분코드  */
					.update("proc_dept_idcd"	, row.getParameter("proc_dept_idcd"		))  /*  처리부서ID  */
					.update("proc_drtr_idcd"	, row.getParameter("proc_drtr_idcd"		))  /*  처리담당자ID  */
					.update("used_dept_idcd"	, row.getParameter("used_dept_idcd"		))  /*  사용부서id  */
					.update("remk_text"			, row.getParameter("remk_text"			))  /*  비고  */
					.update("stok_type_dvcd"	, row.getParameter("stok_type_dvcd"		))  /*  재고유형구분코드  */
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ " "
												+ row.getParamText("istt_wrhs_idcd"		).trim()
												+ " "
												+ row.getParamText("cstm_idcd"			).trim()
												+ " "
												+ row.getParamText("remk_text"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				
				data.param
					.table("etit_item"													)
					.where("where invc_numb		= :invc_numb						")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn						")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))
					//
					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  원INVOICE순번  */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  원INVOICE순번  */
					.update("item_idcd"			, row.getParameter("item_idcd"           ))  /*  품목ID  */
					.update("unit_idcd"			, row.getParameter("unit_idcd"           ))  /*  단위ID  */
					.update("istt_qntt"			, row.getParameter("istt_qntt"           ))  /*  출고수량  */
					.update("istt_resn_dvcd"	, row.getParameter("istt_resn_dvcd"      ))  /*  기타출고구분코드  */
					.update("stnd_pric"			, row.getParameter("stnd_pric"           ))  /*  기준단가  */
					.update("amnt"				, row.getParameter("amnt"                ))  /*  기준단가  */
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"           ))  /*  기준단가  */
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"           ))  /*  기준단가  */
					.update("stnd_unit"			, row.getParameter("stnd_unit"           ))  /*  기준단위  */
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"      ))  /*  기준단위수량  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("lott_numb"			, row.getParameter("lott_numb"           ))  /*  LOT번호  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"      ))  /*  원INVOICE번호  */
					.update("orig_seqn"			, row.getParameter("orig_seqn"           ))  /*  원INVOICE순번  */
					.update("json_data"			, json)  									 /*  JSON_DATA  */

					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("new_invc_numb"        ).trim()
												+ " "
												+ row.getParamText("item_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;
				data.attach(Action.insert);
			} else {
				data.param
					.table("etit_item"													)
					.where("where invc_numb		= :invc_numb						")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn						")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))
					//
					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  원INVOICE순번  */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  원INVOICE순번  */
					.update("item_idcd"			, row.getParameter("item_idcd"           ))  /*  품목ID  */
					.update("unit_idcd"			, row.getParameter("unit_idcd"           ))  /*  단위ID  */
					.update("istt_qntt"			, row.getParameter("istt_qntt"           ))  /*  출고수량  */
					.update("istt_resn_dvcd"	, row.getParameter("istt_resn_dvcd"      ))  /*  기타출고구분코드  */
					.update("stnd_pric"			, row.getParameter("stnd_pric"           ))  /*  기준단가  */
					.update("amnt"				, row.getParameter("amnt"                ))  /*  기준단가  */
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"           ))  /*  기준단가  */
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"           ))  /*  기준단가  */
					.update("stnd_unit"			, row.getParameter("stnd_unit"           ))  /*  기준단위  */
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"      ))  /*  기준단위수량  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("lott_numb"			, row.getParameter("lott_numb"           ))  /*  LOT번호  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"      ))  /*  원INVOICE번호  */
					.update("orig_seqn"			, row.getParameter("orig_seqn"           ))  /*  원INVOICE순번  */
					.update("json_data"			, json)  									 /*  JSON_DATA  */

					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("new_invc_numb"        ).trim()
												+ " "
												+ row.getParamText("item_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;
				data.attach(Action.insert);
			}
			
			data.param
				.table("etit_trst_item"											)
				.where("WHERE invc_numb		= :invc_numb						")
				.where("  AND line_seqn		= :line_seqn						")
				
				.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				
				.update("line_stat", "2")
			;
			data.attach(Action.update);
			
			invcList.add(row.getParamText("new_invc_numb"));
		}
		data.execute();
		data.clear();
		
		invcList = invcList.stream().distinct().collect(Collectors.toList());
		for (String invc : invcList) {
			sequence.setBook(arg, invc, 0 , "기타입고");
		}
		return null;
	}
	
	public SqlResultMap setEtcIstt2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		
		ParamToJson trans = new ParamToJson();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String make_date="";
		String rtil_ddln_date="";
		List<String> invcList = new ArrayList<String>();

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			
			make_date = row.getParamText("make_date");
			rtil_ddln_date = row.getParamText("rtil_ddln_date");
			if (make_date.matches("^[0-9]+$")) {
			}else{
				if(!make_date.isEmpty()) {
					make_date = dateFormat.format(new Date(row.getParamText("make_date")));
				}
			}
			row.setParameter("make_date", make_date);
			if (rtil_ddln_date.matches("^[0-9]+$")) {
			}else{
				if(!rtil_ddln_date.isEmpty()) {
					rtil_ddln_date = dateFormat.format(new Date(row.getParamText("rtil_ddln_date")));
				}
			}
			row.setParameter("rtil_ddln_date", rtil_ddln_date);
			String json = trans.TranslateRow(arg, row, "etit_item_json_fields");
			
			// etit_item 수정
			data.param
				.table("etit_item"												 )
				.where("where invc_numb		= :invc_numb						")  /*  INVOICE번호  */
				.where("and   line_seqn		= :line_seqn						")  /*  INVOICE순번  */
				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				//
				.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
				.update("json_data"			, json)  									 /*  JSON_DATA  */
	
				.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
				.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
				.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
				.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
				.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
				.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
				.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
			;
			data.attach(rowaction);
		}
		data.execute();
		data.clear();
		
		return null;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		// Lot No 중복 체크
		checkLottNoDup(arg);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// master 등록/수정
				data.param
					.table("etit_mast"                                                    )
					.where("where invc_numb       = :invc_numb                           ")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					//
					.update("invc_date"			, row.getParameter("invc_date"           ))  /*  INVOICE일자  */
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"           ))  /*  출고사업부문ID  */
					.update("istt_wrhs_idcd"	, row.getParameter("istt_wrhs_idcd"      ))  /*  출고창고ID  */
					.update("reqt_dept_idcd"	, row.getParameter("reqt_dept_idcd"      ))  /*  요청부서ID  */
					.update("reqt_drtr_idcd"	, row.getParameter("reqt_drtr_idcd"      ))  /*  요청담당자ID  */
					.update("cstm_dvcd"			, row.getParameter("cstm_dvcd"           ))  /*  출고처 구분코드 */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"           ))  /*  출고처 코드 */
					.update("cstm_name"			, row.getParameter("cstm_name"           ))  /*  출고처 코드 */
					.update("istt_dvcd"			, row.getParameter("istt_dvcd"           ))  /*  납품거래처ID  */
					.update("proc_dept_idcd"	, row.getParameter("proc_dept_idcd"      ))  /*  처리부서ID  */
					.update("proc_drtr_idcd"	, row.getParameter("proc_drtr_idcd"      ))  /*  처리담당자ID  */
					.update("used_dept_idcd"	, row.getParameter("used_dept_idcd"      ))  /*  사용부서id  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("stok_type_dvcd"	, row.getParameter("stok_type_dvcd"      ))  /*  재고유형구분코드  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"            ).trim()
												+ " "
												+ row.getParamText("istt_wrhs_idcd"       ).trim()
												+ " "
												+ row.getParamText("cstm_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
					.action = rowaction;
				data.attach();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				data.execute();
				/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
				sequence.setBook(arg, row.getParamText("invc_numb"), 0 , "기타입고");
			}
		}
	return null;
	}
	
	public SqlResultMap setInvoice2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		// Lot No 중복 체크
		checkLottNoDup(arg);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// master 등록/수정
				data.param
					.table("etit_trst_mast"                                                    )
					.where("where invc_numb       = :invc_numb                           ")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					//
					.update("invc_date"			, row.getParameter("invc_date"           ))  /*  INVOICE일자  */
					.update("istt_wrhs_idcd"	, row.getParameter("istt_wrhs_idcd"      ))  /*  입고창고ID  */
					.update("reqt_dept_idcd"	, row.getParameter("proc_dept_idcd"      ))  /*  요청부서ID  */
					.update("reqt_drtr_idcd"	, row.getParameter("proc_drtr_idcd"      ))  /*  요청담당자ID  */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"           ))  /*  거래처ID */
					.update("cstm_dvcd"			, row.getParameter("cstm_dvcd"           ))  /*  거래처구분코드 */
					.update("istt_dvcd"			, row.getParameter("istt_dvcd"           ))  /*  입고구분코드  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"            ).trim()
												+ " "
												+ row.getParamText("istt_wrhs_idcd"       ).trim()
												+ " "
												+ row.getParamText("cstm_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
					.action = rowaction;
				data.attach();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail2(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
		}
		data.execute();
		return null;
	}
	
	public void setInvoiceDetail2(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("etit_trst_item"												)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
				;
				data.attach(rowaction);
			} else {
				// detail 등록/수정
				data.param
					.table("etit_trst_item"												)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  원INVOICE순번  */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  원INVOICE순번  */
					.update("item_idcd"			, row.getParameter("item_idcd"           ))  /*  품목ID  */
					.update("unit_idcd"			, row.getParameter("unit_idcd"           ))  /*  단위ID  */
					.update("reqt_qntt"			, row.getParameter("istt_qntt"           ))  /*  입고요청수량  */
					.update("istt_resn_dvcd"	, row.getParameter("istt_resn_dvcd"      ))  /*  입고사유구분코드  */
					.update("stnd_unit"			, row.getParameter("stnd_unit"           ))  /*  기준단위  */
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"      ))  /*  기준단위수량  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("lott_numb"			, row.getParameter("lott_numb"           ))  /*  LOT번호  */

					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"            ).trim()
												+ " "
												+ row.getParamText("item_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String make_date="";
		String rtil_ddln_date="";


		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			make_date = row.getParamText("make_date");
			rtil_ddln_date = row.getParamText("rtil_ddln_date");

			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("etit_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
				;data.attach(rowaction);
			} else {
				if (row.getParamText("mes_system_type").toUpperCase().equals("SJFLV")) {
					System.out.println("make_date => " + make_date);
					if (make_date.matches("^[0-9]+$")) {
					}else{
						if(!make_date.isEmpty()) {
							make_date = dateFormat.format(new Date(row.getParamText("make_date")));
						}
					}
					row.setParameter("make_date", make_date);
					if (rtil_ddln_date.matches("^[0-9]+$")) {
					}else{
						if(!rtil_ddln_date.isEmpty()) {
							rtil_ddln_date = dateFormat.format(new Date(row.getParamText("rtil_ddln_date")));
						}
					}
					row.setParameter("rtil_ddln_date", rtil_ddln_date);
				}

				ParamToJson trans = new ParamToJson();
				String json = trans.TranslateRow(arg, row, "etit_item_json_fields");

				// detail 등록/수정
				data.param
					.table("etit_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  원INVOICE순번  */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  원INVOICE순번  */
					.update("item_idcd"			, row.getParameter("item_idcd"           ))  /*  품목ID  */
					.update("unit_idcd"			, row.getParameter("unit_idcd"           ))  /*  단위ID  */
					.update("istt_qntt"			, row.getParameter("istt_qntt"           ))  /*  출고수량  */
					.update("istt_resn_dvcd"	, row.getParameter("istt_resn_dvcd"      ))  /*  기타출고구분코드  */
					.update("stnd_pric"			, row.getParameter("stnd_pric"           ))  /*  기준단가  */
					.update("amnt"				, row.getParameter("amnt"                ))  /*  기준단가  */
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"           ))  /*  기준단가  */
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"           ))  /*  기준단가  */
					.update("stnd_unit"			, row.getParameter("stnd_unit"           ))  /*  기준단위  */
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"      ))  /*  기준단위수량  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("lott_numb"			, row.getParameter("lott_numb"           ))  /*  LOT번호  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"      ))  /*  원INVOICE번호  */
					.update("orig_seqn"			, row.getParameter("orig_seqn"           ))  /*  원INVOICE순번  */
					.update("json_data"			, json)  									 /*  JSON_DATA  */

					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"            ).trim()
												+ " "
												+ row.getParamText("item_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;data.attach(rowaction);
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
			.query("select line_stat, line_clos				")
			.query("from   etit_mast						")
		 	.query("where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("etit_item")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;data.attach(Action.delete);

		data.param
			.table("etit_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;data.attach(Action.delete);
		data.execute();
		/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
		sequence.setBook(arg, arg.getParamText("invc_numb"), 0 , "기타입고");
		return null;
	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
		.query("select a.*																								")
		.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
		.query("from (																									")
		.query("select																									")
		.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
		.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
		.query("     ,  0  as cst_pri																					")
		.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
		.query("     ,  0  as sale_pri																					")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
		.query("     ,  a.modl_name																						")
		.query("from    item_mast a																						")
		.query("where   1=1																								")
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
		.query("and     a.line_stat = 0																					")
		.query("and     a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query(") a																										")
		;

		return data.selectForMap();
	}


	/**
	 * 출력
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.addr_1 		as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  b.addr_2   		as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_kind    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1 		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_kind   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, -a.qty 			as qty 												") /* 수량 */
			.query("	, -a.sply_amt+a.txfree_amt as sply_amt		 							") /* 공급가 */
			.query("	, -a.tax_amt  		as tax_amt 											") /* 세액 */
			.query("	, -a.inv_amt 		as inv_amt 											") /* 계 */
			.query("	, a.usr_memo 		as usr_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url       as stamp_url										") /* 직인 이미지 URL */
			.query("	, d.emp_nm         	as inv_user_nm 										") /* 작업자명 */

			.query(" from modi_info a															")
			.query("	  join stor b on a.stor_id = b.stor_id									")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id					")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query(" 		a.seq_dsp   	as seq_dsp 										") /* 항번 */
				.query("	,   b.itm_shrt_cd   as itm_shrt_cd 									") /* 단축코드 */
				.query("	,   a.item_code   		as item_code 								") /* 코드 */
				.query("	,   b.brcd_1   		as brcd 										") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 					") /* 품목 / 규격 */
				.query("	,   (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('(' + a.piece_qty + ')') as piece_qty   						") /* 포장량 */
				.query("	,   -a.qty 			as qty 											") /* 수량 */
				.query("	,   a.pri 		    as pri 											") /* 단가 */
				.query("	,   -a.sply_amt+a.txfree_amt as sply_amt 							") /* 금액 */
				.query("	,   -a.tax_amt 		as tax_amt 										") /* 세액 */
				.query("	,   -a.inv_amt 		as inv_amt 										") /* 합계 */
				.query("  from  modi_item a 													")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 			")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"    ))
				.query("   and  a.row_sts = 0                   								")
				.query("order by line_seqn		 												")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}
}