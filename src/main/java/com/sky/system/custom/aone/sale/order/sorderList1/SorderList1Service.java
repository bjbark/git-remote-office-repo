package com.sky.system.custom.aone.sale.order.sorderList1;
import com.sky.barobill.BaroBillService; // static key

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baroservice.api.taxinvoice.Tests;
import com.baroservice.ws.TaxInvoiceStateEX;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("aone.sale.SorderList1Service")
public class SorderList1Service  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence;

	//날짜별 전체조회
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																									")
		;
		data.param
			.where("from (																										")
			.where("      select a.acpt_stat_dvcd , a.invc_date      , a.invc_numb      , a.amnd_degr      , a.acpt_dvcd		")
			.where("           , a.line_stat      , a.cstm_idcd		 , a.prnt_idcd												")
			.where("           , b.item_idcd      , b.deli_date as deli_date2           , b.invc_qntt      , b.invc_amnt		")
			.where("           , json_value(b.json_data,'$.sral_numb') as sral_numb     , b.remk_text							")
			.where("           , json_value(b.json_data,'$.ostt_date') as ostt_date     										")
			.where("           , json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd									")
			.where("           , c.cstm_name																					")
			.where("           , d.item_code      , d.item_name		, d.item_spec												")
			.where("           , u.user_name as prod_drtr_name      , f.invc_numb as work_invc_numb								")
			.where("           , f.wkod_numb      , f.wkod_seqn     , f.work_strt_dttm  , f.work_endd_dttm  , f.need_time		")
			.where("           , json_value(f.json_data,'$.psep_exps_amnt') as psep_exps_amnt									")
			.where("           , json_value(f.json_data,'$.pric_time') as pric_time												")
			.where("           , json_value(f.json_data,'$.prts_repa_amnt') as prts_repa_amnt									")
			.where("           , json_value(f.json_data,'$.etcc_repa_amnt') as etcc_repa_amnt									")
			.where("           , json_value(f.json_data,'$.entp_pfit_amnt') as entp_pfit_amnt									")
			.where("           , json_value(a.json_data,'$.bill_publ_yorn') as bill_publ_yorn									")
			.where("           , json_value(a.json_data,'$.bill_date') as bill_date												")
			.where("           , json_value(a.json_data,'$.bill_amnt') as bill_amnt												")
			.where("           , json_value(a.json_data,'$.tkot_date') as tkot_date												")
			.where("           , json_value(a.json_data,'$.tkot_text') as tkot_text												")
		;
		data.param
			.where("      from acpt_mast a																						")
			.where("           left outer join acpt_item b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr			")
			.where("           left outer join user_mast u on u.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')			")
			.where("           left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd											")
			.where("           left outer join item_mast d on d.item_idcd = b.item_idcd											")
			.where("           left outer join work_book f on a.invc_numb = f.wkod_numb and a.amnd_degr = f.wkod_seqn			")
			.where("      where 1 = 1																							")
			.where("      and   a.acpt_stat_dvcd = '6000'											")
			.where("      and   a.find_name  like %:find_name%     " , arg.getParamText("find_name"))
			.where("      and   a.invc_date     >= :invc1_date     " , arg.getParamText("invc1_date"))
			.where("      and   a.invc_date     <= :invc2_date     " , arg.getParamText("invc2_date"))
			.where("      and   a.acpt_stat_dvcd = :acpt_stat_dvcd " , arg.getParamText("acpt_stat_dvcd"))
			.where("      and   a.acpt_dvcd      = :acpt_dvcd      " , arg.getParamText("acpt_dvcd"))
			.where("      and   a.cstm_idcd      = :cstm_idcd      " , arg.getParamText("cstm_idcd"))
			.where("      and   a.drtr_idcd      = :drtr_idcd      " , arg.getParamText("drtr_idcd"))
			.where("      and   d.item_idcd      = :item_idcd      " , arg.getParamText("item_idcd"))
			.where("      and   d.item_spec  like %:item_spec%     " , arg.getParamText("item_spec"))
			.where("      and   u.user_name      = :prod_drtr_name " , arg.getParamText("prod_drtr_name"))
			.where("      and   json_value(b.json_data,'$.sral_numb')  like %:sral_numb%	 " , arg.getParamText("sral_numb")	 )
			.where("      and   json_value(b.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd" , arg.getParamText("repa_stat_dvcd"))
			.where("      and   a.line_stat      < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))			 )
			.where("      order by invc_date desc, invc_numb desc, amnd_degr desc, line_seqn desc limit 999999999				")
			.where(") a			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	@SuppressWarnings("deprecation")
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		String hq = "";

		for (SqlResultRow row:map) {
			if(row.getParamText("hqof_idcd").length() > 0){
				hq = row.getParamText("hqof_idcd");
			}
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			deli_date2 = row.getParamText("deli_date2");
			if(deli_date2.matches("^[0-9]+$")){
			}else{
				if(!row.getParamText("deli_date2").isEmpty()){
					deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
				}
			}
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				if (rowaction == Action.update) {
					SqlResultRow ordrInfo = getOrderInfo(arg);

					if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(map.get(0).getParamText("amnd_degr"))) {
						throw new ServiceException("이미 출고된 경우 수정할 수 없습니다.");
					}
				}
				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

				// 마스터 등록/수정
				data.param
					.table("acpt_mast"													 )
					.where("where invc_numb = :invc_numb								")  /*  aone_code  */
					.where("and   amnd_degr = :amnd_degr								" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))  /*  aone_code */
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))  /*  차수  */

					.update("bzct_dvcd"			, row.getParameter("bzct_dvcd"			))  /*  사업부문구분코드  */
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  invoice일자  */
					.update("ordr_dvcd"			, row.getParameter("ordr_dvcd"			))  /*  오더구분코드  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))  /*  원invoice번호  */
					.update("pcod_numb"			, row.getParameter("pcod_numb"			))  /*  pono */
					.update("deli_date"			, deli_date2							)  /*  납기일자 */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))  /*  거래처ID */
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))  /*  납품처ID */
					.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"			))  /*  중개인  */
					.update("cont_date"			, row.getParameter("cont_date"			))  /*  계약일자  */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))  /*  담당자ID  */
					.update("dept_idcd"			, row.getParameter("dept_idcd"			))  /*  부서ID  */
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"			))  /*  통화구분코드  */
					.update("excg_rate"			, row.getParameter("excg_rate"			))  /*  환율  */
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"		))  /*  출고창고  */
					.update("acpt_dvcd"			, row.getParameter("acpt_dvcd"			))  /*  수주구분코드  */
					.update("trut_dvcd"			, row.getParameter("trut_dvcd"			))  /*  위탁구분코드  */
					.update("dlvy_cond_dvcd"	, row.getParameter("dlvy_cond_dvcd"		))  /*  인도조건구분코드  */
					.update("crdt_exce_yorn"	, row.getParameter("crdt_exce_yorn"		))  /*  여신초과여부  */
					.update("amnt_lack_yorn"	, row.getParameter("amnt_lack_yorn"		))  /*  금액미달여부  */
					.update("sale_stor_yorn"	, row.getParameter("sale_stor_yorn"		))  /*  판매보관여부  */
					.update("remk_text"			, row.getParameter("remk_text"			))  /*  비고  */
					.update("memo"				, row.getParameter("memo"				))  /*  메모  */
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))  /*  확정여부  */
					.update("cofm_dttm"			, row.getParameter("cofm_dttm"			))  /*  확정일시  */
					.update("cofm_drtr_idcd"	, row.getParameter("cofm_drtr_idcd"		))  /*  확정담당자ID  */
					.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd"		))  /*  수주상태구분코드  */
					.update("expt_dvcd"			, row.getParameter("expt_dvcd"			))  /*  수출구분코드  */
					.update("acpt_case_name"	, row.getParameter("acpt_case_name"		))  /*  주문명  */
				;
				data.param
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ " "
												+ row.getParamText("acpt_case_name"		).trim()
												+ " "
												+ row.getParamText("cstm_name"			).trim())
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
				data.attach(rowaction);
				data.execute();
				data.clear();

				data.param
					.table("acpt_amnd")
					.where("where invc_numb = :invc_numb" )
					.where("and   amnd_degr = :amnd_degr" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("amnd_degr"			, 1)

					.update("amnd_date"			, row.getParameter("invc_date"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				data.param
					.table("acpt_item"													 )
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					.where("and   amnd_degr		= :amnd_degr							")	/*  AMEND순번  */

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))

					.update("uper_seqn"			, row.getParameter("uper_seqn"			))
					.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd"		))  /*  수리상태구분코드  */
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("cstm_lott_numb"	, row.getParameter("cstm_lott_numb"		))
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))
					.update("orig_seqn"			, row.getParameter("orig_seqn"			))
					.update("orig_invc_qntt"	, row.getParameter("orig_invc_qntt"		))
					.update("ortn_dvcd"			, row.getParameter("ortn_dvcd"			))
					.update("optn_psbl_yorn"	, row.getParameter("optn_psbl_yorn"		))
					.update("optn_adtn"			, row.getParameter("optn_adtn"			))
					.update("pric_adpt"			, row.getParameter("pric_adpt"			))
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))
					.update("invc_qntt"			, row.getParameter("invc_qntt"			))
					.update("invc_pric"			, row.getParameter("invc_pric"			))
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
					.update("invc_amnt"			, row.getParameter("invc_amnt"			))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"			))
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"			))
					.update("krwn_ttsm_amnt"	, row.getParameter("krwn_ttsm_amnt"		))
					.update("stnd_unit"			, row.getParameter("stnd_unit"			))
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))
					.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"			))
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))
					.update("deli_date"			, deli_date2							)
					.update("dlvy_date"			, row.getParameter("dlvy_date"			))
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
					.update("dsct_qntt"			, row.getParameter("dsct_qntt"			))
					.update("dlvy_memo"			, row.getParameter("dlvy_memo"			))
					.update("json_data"			, json_data)

					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("item_code"			).trim()
												+ " "
												+ row.getParamText("item_name"			).trim()
												+ " "
												+ row.getParamText("item_spec"			).trim())
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
				data.attach(rowaction);
				data.execute();
				data.clear();
			}
		}
		data.execute();
		return null;
	}

	//이미지 불러오기
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.item_imge                , a.item_imge2					")
			.query("	 , b.item_imge as item_imge3  , b.item_imge2 as item_imge4		")
			.query("from  acpt_item a													")
			.query("	  left outer join work_book b on a.invc_numb = b.wkod_numb and a.amnd_degr = b.wkod_seqn	")
			.query("where 1=1							")
			.query("and   a.invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			.query("and   a.amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
			.query("and   a.line_seqn = :line_seqn", arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}

	//최종차수 비교
	public SqlResultRow getOrderInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String invc_numb = "";
		String amnd_degr = "";

		if (arg.containsKey("invc_numb")) {
			invc_numb = (String)arg.getParameter("invc_numb");
		} else if (arg.containsKey("records")) {
			invc_numb = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("invc_numb");
		}

		if (arg.containsKey("amnd_degr")) {
			amnd_degr = (String)arg.getParameter("amnd_degr");
		} else if (arg.containsKey("records")) {
			amnd_degr = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("amnd_degr");
		}

		data.param
			.query("select line_clos, line_stat, acpt_stat_dvcd																											")
			.query("	 , (select max(amnd_degr) from acpt_mast where invc_numb = a.invc_numb) as max_amnd_degr 														")
			.query("	 , (select json_value(json_data,'$.repa_stat_dvcd') from acpt_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as repa_stat_dvcd ")
			.query("from  acpt_mast a							")
			.query("where a.invc_numb = :invc_numb", invc_numb)
			.query("and   a.amnd_degr = :amnd_degr", amnd_degr)
		;
		return data.selectForRow();
	}

	//거래처별 전체조회
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select  count(1) as maxsize  ")
		;
		data.param
			.query("select																								")
			.query("      if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.invc_numb,null)      as invc_numb			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.amnd_degr,null)      as amnd_degr			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.line_seqn,null)      as line_seqn			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.invc_date,null)      as invc_date			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.acpt_dvcd,null)      as acpt_dvcd			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.cstm_idcd,null)      as cstm_idcd			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.acpt_stat_dvcd,null) as acpt_stat_dvcd		")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.deli_date,null)      as deli_date2			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.remk_text,null)      as remk_text			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.item_code,null)      as item_code			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.item_name,null)      as item_name			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.item_spec,null)      as item_spec			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.repa_stat_dvcd,null) as repa_stat_dvcd		")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.sral_numb,null)      as sral_numb			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.ostt_date,null)      as ostt_date			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.bill_publ_yorn,null) as bill_publ_yorn		")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.bill_date,null)      as bill_date			")
//			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.bill_amnt,null)      as bill_amnt			")
			.query("    , a.bill_amnt																					")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.tkot_date,null)      as tkot_date			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.tkot_text,null)      as tkot_text			")
			.query("    , if(a.cstm_name <> '소계' and a.cstm_name <> '합계',a.prod_drtr_name,null) as prod_drtr_name		")
			.query("    , a.invc_qntt																					")
			.query("    , a.invc_amnt																					")
			.query("    , a.cstm_name																					")
		;
		data.param
			.where("from (																											")
			.where("     SELECT																										")
			.where("          a.invc_numb,																							")
			.where("          a.amnd_degr,																							")
			.where("          a.line_seqn,																							")
			.where("          b.invc_date,																							")
			.where("          b.acpt_dvcd,																							")
			.where("          b.cstm_idcd,																							")
			.where("          b.acpt_stat_dvcd,																						")
			.where("          a.deli_date,																							")
			.where("          sum(a.invc_qntt) as invc_qntt,																		")
			.where("          sum(a.invc_amnt) as invc_amnt,																		")
			.where("          a.remk_text,																							")
			.where("          d.item_code,																							")
			.where("          d.item_name,																							")
			.where("          d.item_spec,																							")
			.where("          json_value( a.json_data, '$.repa_stat_dvcd' ) AS repa_stat_dvcd,										")
			.where("          json_value( a.json_data, '$.sral_numb' ) AS sral_numb,												")
			.where("          json_value( a.json_data, '$.ostt_date' ) AS ostt_date,												")
			.where("          json_value( b.json_data, '$.bill_publ_yorn' ) AS bill_publ_yorn,										")
			.where("          json_value( b.json_data, '$.bill_date' ) AS bill_date,												")
			.where("          sum(json_value( b.json_data, '$.bill_amnt' )) AS bill_amnt,											")
			.where("          json_value( b.json_data, '$.tkot_date' ) AS tkot_date,												")
			.where("          json_value( b.json_data, '$.tkot_text' ) AS tkot_text,												")
			.where("          u.user_name AS prod_drtr_name,																		")
			.where("          case when c.cstm_name is not null																		")
			.where("               then case when b.cstm_idcd is not null															")
			.where("                    then case when a.invc_numb is not null														")
			.where("                         then c.cstm_name																		")
			.where("                         else '중복'																				")
			.where("                         end																					")
			.where("                    else '소계'																					")
			.where("                    end																							")
			.where("               else '합계'																						")
			.where("               end cstm_name																					")

			.where("       FROM acpt_item a																							")
			.where("       INNER JOIN acpt_mast b ON a.invc_numb = b.invc_numb AND a.amnd_degr = b.amnd_degr						")
			.where("       LEFT OUTER JOIN user_mast u ON u.user_idcd = json_value (a.json_data, '$.prod_drtr_idcd' )				")
			.where("       LEFT OUTER JOIN cstm_mast c ON c.cstm_idcd = b.cstm_idcd													")
			.where("       LEFT OUTER JOIN item_mast d ON d.item_idcd = a.item_idcd													")
			.where("       where 1 = 1																								")
			.where("       and b.find_name  like %:find_name%     " , arg.getParamText("find_name"))
			.where("       and b.invc_date     >= :invc1_date     " , arg.getParamText("invc1_date"))
			.where("       and b.invc_date     <= :invc2_date     " , arg.getParamText("invc2_date"))
			.where("       and b.cstm_idcd      = :cstm_idcd      " , arg.getParamText("cstm_idcd"))
			.where("       and d.item_idcd      = :item_idcd      " , arg.getParamText("item_idcd"))
			.where("       and b.acpt_dvcd      = :acpt_dvcd      " , arg.getParamText("acpt_dvcd"))
			.where("       and b.acpt_stat_dvcd = :acpt_stat_dvcd " , arg.getParamText("acpt_stat_dvcd"))
			.where("       and d.item_spec      = :item_spec      " , arg.getParamText("item_spec"))
			.where("       and u.user_name      = :user_name      " , arg.getParamText("user_name"))
			.where("       and json_value(a.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd" , arg.getParamText("repa_stat_dvcd"))
			.where("       and json_value(a.json_data,'$.sral_numb')  like %:sral_numb%	 " , arg.getParamText("sral_numb"))
			.where("       and b.line_stat   < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by c.cstm_name,b.cstm_idcd,a.invc_numb  with rollup														")
			.where(") a																												")
			.where("where a.cstm_name <> '중복'																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//품목군 조회(왼쪽)
	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("  from (																						")
			.where("        select  d.item_idcd, d.item_code, d.item_name, d.item_spec								")
		;
		data.param
			.where("          from acpt_mast a																		")
			.where("               left outer join acpt_item b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr			")
			.where("               left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd							")
			.where("               left outer join item_mast d on d.item_idcd = b.item_idcd							")
			.where("               left outer join user_mast u on u.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')			")
			.where("         where 1 = 1																			")
			.where("         and   a.find_name	like %:find_name%		" , arg.getParamText("find_name"))
			.where("         and   a.invc_date     >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("         and   a.invc_date     <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("         and   a.cstm_idcd      = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("         and   d.item_idcd      = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("         and   a.drtr_idcd      = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("         and   a.acpt_stat_dvcd = :acpt_stat_dvcd	" , arg.getParamText("acpt_stat_dvcd"))
			.where("         and   a.acpt_dvcd      = :acpt_dvcd		" , arg.getParamText("acpt_dvcd"))
			.where("         and   d.item_spec      = :item_spec		" , arg.getParamText("item_spec"))
			.where("         and   json_value(b.json_data,'$.sral_numb')  like %:sral_numb%     " , arg.getParamText("sral_numb")		)
			.where("         and   json_value(b.json_data,'$.repa_stat_dvcd') = :repa_stat_dvcd%" , arg.getParamText("repa_stat_dvcd")	)
			.where("         and   a.line_stat      < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("         group by d.item_idcd) a																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//품목군 조회(오른쪽)
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																									")
		;
		data.param
			.where("from (																										")
			.where("      select a.acpt_stat_dvcd , a.invc_date      , a.invc_numb      , a.amnd_degr      , a.acpt_dvcd		")
			.where("           , a.line_stat      , a.cstm_idcd																	")
			.where("           , b.item_idcd      , b.deli_date as deli_date2           , b.invc_qntt      , b.invc_amnt		")
			.where("           , json_value(b.json_data,'$.sral_numb') as sral_numb     , b.remk_text							")
			.where("           , json_value(b.json_data,'$.ostt_date') as ostt_date     										")
			.where("           , json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd									")
			.where("           , json_value(a.json_data,'$.bill_publ_yorn') as bill_publ_yorn									")
			.where("           , json_value(a.json_data,'$.bill_date') as bill_date												")
			.where("           , json_value(a.json_data,'$.bill_amnt') as bill_amnt												")
			.where("           , json_value(a.json_data,'$.tkot_date') as tkot_date												")
			.where("           , json_value(a.json_data,'$.tkot_text') as tkot_text												")

			.where("           , c.cstm_name																					")
			.where("           , d.item_code      ,d.item_name		 ,d.item_spec												")
			.where("           , u.user_name as prod_drtr_name																	")

		;
		data.param
			.where("      from acpt_mast a																						")
			.where("           left outer join acpt_item b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr			")
			.where("           left outer join user_mast u on u.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')			")
			.where("           left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd											")
			.where("           left outer join item_mast d on d.item_idcd = b.item_idcd											")
			.where("      where 1 = 1																							")
			.where("      and   a.find_name  like %:find_name%     " , arg.getParamText("find_name"))
			.where("      and   a.invc_date     >= :invc1_date     " , arg.getParamText("invc1_date" ))
			.where("      and   a.invc_date     <= :invc2_date     " , arg.getParamText("invc2_date" ))
			.where("      and   a.cstm_idcd      = :cstm_idcd      " , arg.getParamText("cstm_idcd" ))
			.where("      and   d.item_idcd      = :item_idcd      " , arg.getParamText("item_idcd" ))
			.where("      and   a.drtr_idcd      = :drtr_idcd      " , arg.getParamText("drtr_idcd" ))
			.where("      and   a.ordr_dvcd      = :ordr_dvcd      " , arg.getParamText("ordr_dvcd"))
			.where("      and   a.acpt_stat_dvcd = :acpt_stat_dvcd " , arg.getParamText("acpt_stat_dvcd"))
			.where("      and   a.acpt_dvcd      = :acpt_dvcd      " , arg.getParamText("acpt_dvcd"))
			.where("      and   d.item_spec      = :item_spec      " , arg.getParamText("item_spec"))
			.where("      and   u.user_name      = :user_name      " , arg.getParamText("user_name"))
			.where("      and   json_value(b.json_data,'$.sral_numb')  like %:sral_numb%	 " , arg.getParamText("sral_numb")		)
			.where("      and   json_value(b.json_data,'$.repa_stat_dvcd') = :repa_stat_dvcd%" , arg.getParamText("repa_stat_dvcd")	)
			.where("      and   a.line_stat      < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))			)
			.where("      order by invc_date desc, invc_numb desc, amnd_degr desc, line_seqn desc limit 999999999				")
			.where(") a			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//엔지니어별 조회
	public SqlResultMap getSearch4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  																										")
			.query("  if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.invc_numb, null) as invc_numb						")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.amnd_degr, null) as amnd_degr				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.invc_date, null) as invc_date				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.acpt_dvcd, null) as acpt_dvcd				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.acpt_stat_dvcd, null) as acpt_stat_dvcd 	")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.repa_stat_dvcd, null) as repa_stat_dvcd 	")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.cstm_code, null) as cstm_code				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.cstm_name, null) as cstm_name				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.item_code, null) as item_code				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.item_name, null) as item_name				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.item_spec, null) as item_spec				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.deli_date2, null) as deli_date2			")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.sral_numb, null) as sral_numb				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.remk_text, null) as remk_text				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.ostt_date, null) as ostt_date				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.prod_drtr_idcd, null) as  prod_drtr_idcd 	")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.bill_publ_yorn, null) as  bill_publ_yorn 	")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.bill_date, null) as bill_date				")
//			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.bill_amnt, null) as bill_amnt				")
			.query("       , a.bill_amnt																						")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.tkot_date, null) as tkot_date				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.tkot_text, null) as tkot_text				")
			.query("       , if(a.prod_drtr_name <>'소계' and a.prod_drtr_name <>'합계',a.user_name, null) as  user_name				")
			.query("       , a.invc_qntt																							")
			.query("       , a.invc_amnt																							")
			.query("       , a.prod_drtr_name																						")
		;
		data.param
			.where("from (")
			.where("  select 																							")
			.where("         a.invc_numb																				")
			.where("       , a.amnd_degr																				")
			.where("       , a.invc_date																				")
			.where("       , a.acpt_dvcd																				")
			.where("       , a.acpt_stat_dvcd																			")
			.where("       , json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd								")
			.where("       , c.cstm_code																				")
			.where("       , c.cstm_name																				")
			.where("       , d.item_code																				")
			.where("       , d.item_name																				")
			.where("       , d.item_spec																				")
			.where("       , b.deli_date as deli_date2																	")
			.where("       , sum(b.invc_qntt) as invc_qntt																")
			.where("       , sum(b.invc_amnt) as invc_amnt																")
			.where("       , json_value(b.json_data,'$.sral_numb') as sral_numb											")
			.where("       , b.remk_text																				")
			.where("       , json_value(b.json_data,'$.ostt_date') as ostt_date											")
			.where("       , json_value(b.json_data,'$.prod_drtr_idcd') as prod_drtr_idcd								")
			.where("       , json_value(a.json_data,'$.bill_publ_yorn') as bill_publ_yorn								")
			.where("       , json_value(a.json_data,'$.bill_date') as bill_date											")
			.where("       , sum(json_value(a.json_data,'$.bill_amnt')) as bill_amnt									")
			.where("       , json_value(a.json_data,'$.tkot_date') as tkot_date											")
			.where("       , json_value(a.json_data,'$.tkot_text') as tkot_text											")
			.where("       , u.user_name																				")
			.where("       , case when a.amnd_degr is null then															")
			.where("              case when a.invc_numb is null then													")
			.where("                   case when u.user_name is null then												")
			.where("                        '합계'																		")
			.where("                   else '소계'																		")
			.where("               	   end																				")
			.where("              else '중복'																			")
			.where("              end																					")
			.where("         else u.user_name																			")
			.where("       end as prod_drtr_name																		")
			.where("  from acpt_mast a																					")
			.where("  left outer join acpt_item b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr			")
			.where("  left outer join user_mast u on u.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')			")
			.where("  left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd											")
			.where("  left outer join item_mast d on d.item_idcd = b.item_idcd											")
			.where("  where 1 = 1																						")
			.where("  and json_value(b.json_data,'$.prod_drtr_idcd') != ''												")
			.where("  and a.find_name  like %:find_name%     " , arg.getParamText("find_name"))
			.where("  and a.invc_date     >= :invc1_date     " , arg.getParamText("invc1_date"))
			.where("  and a.invc_date     <= :invc2_date     " , arg.getParamText("invc2_date"))
			.where("  and a.cstm_idcd      = :cstm_idcd      " , arg.getParamText("cstm_idcd"))
			.where("  and d.item_idcd      = :item_idcd      " , arg.getParamText("item_idcd"))
			.where("  and a.acpt_dvcd      = :acpt_dvcd      " , arg.getParamText("acpt_dvcd"))
			.where("  and a.acpt_stat_dvcd = :acpt_stat_dvcd " , arg.getParamText("acpt_stat_dvcd"))
			.where("  and d.item_spec      = :item_spec      " , arg.getParamText("item_spec"))
			.where("  and u.user_name      = :user_name      " , arg.getParamText("user_name"))
			.where("  and json_value(b.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd" , arg.getParamText("repa_stat_dvcd"))
			.where("  and json_value(b.json_data,'$.sral_numb')  like %:sral_numb%	 " , arg.getParamText("sral_numb"))
			.where("  and a.line_stat   < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("  group by u.user_name,a.invc_numb,a.amnd_degr with rollup											")
			.where(") a ")
			.where("where a.prod_drtr_name <> '중복'																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	//amend 생성
	public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
		SqlResultRow ordrInfo = getOrderInfo(arg);

		if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(arg.getParamText("amnd_degr"))) {
			throw new ServiceException("재수리가  등록된 제품입니다.");
		}

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String amnd_degr	= arg.getParamText("amnd_degr");
		String new_amnd_degr= arg.getParamText("new_amnd_degr");
		String amnd_date	= arg.getParamText("amnd_date") ;
		String deli_date	= arg.getParamText("deli_date") ;
		String drtr_idcd	= arg.getParamText("drtr_idcd") ;
		String amnd_resn	= arg.getParamText("amnd_resn") ;
		String logn_id		= arg.getParamText("logn_id") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.param
			.query("call auto_acpt_amend (             ")
			.query("   :invc_numb "  	, invc_numb		)  // Invoice 번호
			.query(" , :amnd_degr "  	, amnd_degr		)  //
			.query(" , :amnd_date "  	, amnd_date		)  // 변경일자
			.query(" , :amnd_resn "  	, amnd_resn		)  //
			.query(" , :deli_date "  	, deli_date		)  //
			.query(" , :drtr_idcd "  	, drtr_idcd		)  //
			.query(" , :new_amnd_degr"  , new_amnd_degr	)  //
			.query(" , :logn_id "  		, logn_id		)  //
			.query(" )                                 ")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	//반출내용 저장
	public SqlResultMap setMemo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg,"acpt_mast_json_fields");

		for (SqlResultRow row : arg.getParameter("records", SqlResultMap.class)) {
			System.out.println("*************** invc_numb : "+row.fixParameter("invc_numb"));
			System.out.println("*************** amnd_degr : "+row.fixParameter("amnd_degr"));
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , row.fixParameter("invc_numb"))
				.unique("amnd_degr"        , row.fixParameter("amnd_degr"))

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.tkot_text','$.tkot_date'),'"+json_data+"')")
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}

		return null;
	}

	//청구내용 저장
	public SqlResultMap setTax(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultRow ordrInfo = getOrderInfo(arg);

		if(arg.getParamText("bill_publ_yorn").equals("")){
			arg.setParameter("bill_publ_yorn", "0");
		}else{
			arg.setParameter("bill_publ_yorn", "1");
		}
		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "acpt_mast_json_fields");

		for (SqlResultRow row : arg.getParameter("records", SqlResultMap.class)) {
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , row.fixParameter("invc_numb"))
				.unique("amnd_degr"        , row.fixParameter("amnd_degr"))

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.bill_publ_yorn','$.bill_date','$.bill_amnt'),'"+json_data+"')")

			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}
		return null;
	}
	//출고 취소
	public SqlResultMap setReleaseCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultRow ordrInfo = getOrderInfo(arg);

		if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(arg.getParamText("amnd_degr"))) {
			throw new ServiceException("이미 최종 차수가 아닌 수리품은 출고취소를 할 수 없습니다.");
		}

		// 출고일자 취소
//				arg.setParameter("ostt_date", "");
		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "acpt_item_json_fields");

		data.param
			.table("acpt_mast"											 )
			.where("where invc_numb		= :invc_numb					")  /*  INVOICE번호  */
			.where("and   amnd_degr		= :amnd_degr					")	/*  AMEND순번  */

			.unique("invc_numb"			, arg.fixParameter("invc_numb")	 )
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr")	 )

			.update("acpt_stat_dvcd"	, "3000"						 )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("acpt_item"											 )
			.where("where invc_numb		= :invc_numb					")  /*  INVOICE번호  */
			.where("and   line_seqn		= :line_seqn					")  /*  INVOICE순번  */
			.where("and   amnd_degr		= :amnd_degr					")	/*  AMEND순번  */

			.unique("invc_numb"			, arg.fixParameter("invc_numb")	 )
			.unique("line_seqn"			, arg.fixParameter("line_seqn")	 )
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr")	 )

			.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.ostt_date','$.ostt_qntt','$.ostt_drtr_idcd'), '" + json_data + "')")
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.query("delete	a																")
			.query("from	isos_book a														")
			.query("		left outer join work_book_mtrl c on c.invc_numb = a.invc_numb	")
			.query("		left outer join work_book      b on b.invc_numb = c.invc_numb	")
			.query("where	b.wkod_numb = :invc_numb " , arg.getParamText("invc_numb"))
			.query("and		b.wkod_seqn = :amnd_degr " , arg.getParamText("amnd_degr"))
		;
		data.attach(Action.direct);
		data.execute();

		data.param
			.table("isos_book ")
			.where("where invc_numb = :invc_numb ")
			.where("and   invc_dvcd = invc_dvcd  ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("invc_dvcd"		, "2800")
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
			.unique("assi_seqn"		, "0")
		;
		data.attach(Action.delete);

		data.execute();
		return null;
	}
	//실적보고 자재사용내역 조회
		public SqlResultMap getWorkBookMtrl(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
			DataMessage data = arg.newStorage("POS");

			data.param
				.where("select b.line_seqn  , b.need_qntt as qntt   , a.invc_numb as work_invc_numb								")
				.where("	 , b.item_idcd  , a.invc_date   , e.stok_qntt	, g.drtr_idcd										")
				.where("	 , a.item_imge  , a.item_imge2  , a.user_memo   , a.wker_idcd										")
				.where("	 , json_value(b.json_data,'$.pric') as pric															")
				.where("	 , json_value(b.json_data,'$.amnt') as amnt															")
				.where("	 , json_value(c.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd										")
				.where("	 , d.item_code   , d.item_name   , d.item_spec	, f.user_name as wker_name							")
				.where("from   work_book a																						")
				.where("	   left outer join work_book_mtrl b on a.invc_numb = b.invc_numb									")
				.where("	   left outer join acpt_item c on a.wkod_numb = c.invc_numb and a.wkod_seqn = c.amnd_degr			")
				.where("	   left outer join item_mast d on b.item_idcd = d.item_idcd											")
				.where("	   left outer join stok_mast e on b.item_idcd = e.item_idcd											")
				.where("	   left outer join purc_istt_item pi on b.item_idcd = pi.item_idcd									")
				.where("	   left outer join user_mast f on a.wker_idcd = f.user_idcd											")
				.where("	   left outer join acpt_mast g on a.invc_numb = g.invc_numb											")
				.where("where  1=1																								")
				.where("and    a.invc_numb	=:work_invc_numb		" , arg.getParamText("work_invc_numb"))
				.where("and    b.line_seqn > 0																					")
				.where("group by b.line_seqn																					")
			;
			return data.selectForMap();
		}
}
