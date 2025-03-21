package com.sky.system.custom.aone.sale.order.sordermast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;


@Service("aone.SorderMastService")
public class SorderMastService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequance;



	/**
	 */
	//마스터 조회(Master)
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize																					")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from (																											")
			.where("	select a.invc_numb        , a.amnd_degr        , a.acpt_dvcd        , a.invc_date        , a.cstm_idcd		")
			.where("		 , b.item_idcd        , b.remk_text        , b.invc_qntt        , b.invc_amnt        , b.line_seqn		")
			.where("		 , b.deli_date as deli_date2               , a.acpt_stat_dvcd											")
			.where("		 , json_value(b.json_data,'$.sral_numb') as sral_numb													")
			.where("		 , json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd 										")
			.where("		 , json_value(b.json_data,'$.ostt_date') as ostt_date													")
			.where("		 , c.cstm_name																							")
			.where("		 , d.item_name        , d.item_code        , d.item_spec												")
			.where("		 , f.work_strt_dttm   , f.work_endd_dttm   , f.need_time												")
			.where("		 , json_value(f.json_data,'$.psep_exps_amnt') as psep_exps_amnt											")
			.where("		 , json_value(f.json_data,'$.pric_time') as pric_time													")
			.where("		 , json_value(f.json_data,'$.prts_repa_amnt') as prts_repa_amnt											")
			.where("		 , json_value(f.json_data,'$.etcc_repa_amnt') as etcc_repa_amnt											")
			.where("		 , json_value(f.json_data,'$.entp_pfit_amnt') as entp_pfit_amnt											")
			.where("		 , json_value(b.json_data,'$.istt_date') as istt_date													")
			.where("		 , json_value(b.json_data,'$.brin_yorn') as brin_yorn													")
			.where("		 , json_value(a.json_data,'$.bill_publ_yorn') as bill_publ_yorn											")
			.where("		 , json_value(a.json_data,'$.bill_date') as bill_date													")
			.where("		 , json_value(a.json_data,'$.bill_amnt') as bill_amnt													")
			.where("		 , g.user_name as prod_drtr_name																		")
			.where("		 , h.make_cost																							")
			.where("		 , a.user_memo      , a.sysm_memo																")
			.where("		 , a.prnt_idcd      , a.line_levl  , a.line_ordr  , a.line_stat									")
			.where("		 , a.line_clos      , a.find_name																")
			.where("		 , a.updt_user_name , a.updt_ipad  , a.updt_dttm  , a.updt_idcd  , a.updt_urif					")
			.where("		 , a.crte_user_name , a.crte_ipad  , a.crte_dttm  , a.crte_idcd  , a.crte_urif					")
			.where("		 , json_value(i.json_data,'$.zone_idcd') as zone_idcd													")
			.where("		 , json_value(i.json_data,'$.wrhs_idcd') as wrhs_idcd													")
		;
		data.param
			.where("	from acpt_mast a																							")
			.where("		 left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr					")
			.where("		 left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.where("		 left outer join item_mast d on b.item_idcd = d.item_idcd												")
			.where("		 left outer join work_book f on a.invc_numb = f.wkod_numb and a.amnd_degr = f.wkod_seqn					")
			.where("		 left outer join user_mast g on g.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')				")
			.where("		 left outer join esti_mast h on h.invc_numb = a.invc_numb and h.amnd_degr = a.amnd_degr 				")
			.where("		 left outer join work_book_mtrl i on f.invc_numb = i.invc_numb	 										")
			.where("	where 1 = 1																									")
			.where("	and   ifnull(a.ordr_dvcd,0) != '4000'																		")
			.where("	and   a.find_name like   %:find_name%     " , arg.getParamText("find_name"))
			.where("	and   a.invc_date      >= :invc1_date     " , arg.getParamText("invc1_date"))
			.where("	and   a.invc_date      <= :invc2_date     " , arg.getParamText("invc2_date"))
			.where("	and   a.acpt_stat_dvcd  = :acpt_stat_dvcd " , arg.getParamText("acpt_stat_dvcd"))
			.where("	and   a.acpt_dvcd       = :acpt_dvcd      " , arg.getParamText("acpt_dvcd"))
			.where("	and   a.cstm_idcd       = :cstm_idcd      " , arg.getParamText("cstm_idcd" ))
			.where("	and   a.drtr_idcd       = :drtr_idcd      " , arg.getParamText("drtr_idcd"))
			.where("	and   b.item_idcd       = :item_idcd      " , arg.getParamText("item_idcd"))
			.where("	and   d.item_spec   like %:item_spec%     " , arg.getParamText("item_spec"))
			.where("	and   g.user_name       = :prod_drtr_name " , arg.getParamText("prod_drtr_name"))
			.where("	and   json_value(b.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd", arg.getParamText("repa_stat_dvcd"))
			.where("	and   json_value(b.json_data,'$.sral_numb') like %:sral_numb%	"	, arg.getParamText("sral_numb"))
			.where("	and   a.line_stat       < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("	group by a.invc_numb											")
			.where("	order by a.invc_numb desc, a.amnd_degr desc limit 99999999		")
			.where(") a																	")
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
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.invc_numb        , a.amnd_degr        , a.acpt_dvcd        , a.invc_date        , a.cstm_idcd	")
			.query("	 , a.acpt_stat_dvcd 																				")
			.query("	 , b.item_idcd        , b.remk_text        , b.invc_qntt        , b.invc_amnt        , b.line_seqn	")
			.query("	 , b.deli_date as deli_date2																		")
			.query("	 , json_value(b.json_data,'$.ostt_date') as ostt_date												")
			.query("	 , json_value(b.json_data,'$.sral_numb') as sral_numb												")
			.query("	 , json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd										")
			.query("	 , c.cstm_name																						")
			.query("	 , d.item_name        , d.item_code        , d.item_spec											")
			.query("     , f.work_strt_dttm   , f.work_endd_dttm   , f.need_time											")
			.query("     , g.user_name as prod_drtr_name																	")
			.query("     , h.make_cost																						")
		;
		data.param
			.query("from acpt_mast a																						")
			.query("     left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr				")
			.query("     left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd											")
			.query("     left outer join item_mast d on b.item_idcd = d.item_idcd											")
			.query("     left outer join work_book f on a.invc_numb = f.wkod_numb and a.amnd_degr = f.wkod_seqn				")
			.query("     left outer join user_mast g on g.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')			")
			.query("     left outer join esti_mast h on h.invc_numb = a.invc_numb and h.amnd_degr = a.amnd_degr 			")
		;
		data.param
			.query("where 1 = 1																								")
			.query("and   ifnull(a.ordr_dvcd,0) != '4000'																	")
			.query("and   a.find_name like   %:find_name%     " , arg.getParamText("find_name"))
			.query("and   a.invc_date      >= :invc1_date     " , arg.getParamText("invc1_date"))
			.query("and   a.invc_date      <= :invc2_date     " , arg.getParamText("invc2_date"))
			.query("and   a.ordr_dvcd       = :ordr_dvcd      " , arg.getParamText("ordr_dvcd"))
			.query("and   a.acpt_stat_dvcd  = :acpt_stat_dvcd " , arg.getParamText("acpt_stat_dvcd"))
			.query("and   a.acpt_dvcd       = :acpt_dvcd      " , arg.getParamText("acpt_dvcd"))
			.query("and   a.cstm_idcd       = :cstm_idcd      " , arg.getParamText("cstm_idcd"))
			.query("and   b.item_idcd       = :item_idcd      " , arg.getParamText("item_idcd"))
			.query("and   a.drtr_idcd       = :drtr_idcd      " , arg.getParamText("drtr_idcd"))
			.query("and   a.amnd_degr  = (select max(amnd_degr)from acpt_mast where invc_numb = a.invc_numb)				")
			.query("and   json_value(b.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd	" , arg.getParamText("repa_stat_dvcd"))
			.query("and   json_value(b.json_data,'$.sral_numb')   like %:sral_numb%		" , arg.getParamText("sral_numb"))
			.query("and   a.line_stat       < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat")))
			.query("group by a.invc_numb																					")
			.query("order by a.invc_numb																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getAmendCode(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select concat(prnt_idcd,'_R',(max(amnd_degr))) as seq											")
			.query("	, a.remk_text																				")
		;
		data.param
			.query("from acpt_mast a																				")
		;
		data.param
			.query("where a.prnt_idcd = :prnt_idcd			", arg.fixParameter("prnt_idcd"))
			.query("and   a.line_stat < 2													")
		;
		return data.selectForMap();
	}
	/**
	 * master 등록/수정/삭제
	 */
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
				String prnt_idcd = row.getParamText("invc_numb");
				if (rowaction == Action.update) {
					SqlResultRow ordrInfo = getOrderInfo(arg);
					prnt_idcd = row.getParamText("prnt_idcd");
					if(ordrInfo.size()>0){
						if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(map.get(0).getParamText("amnd_degr"))) {
							throw new ServiceException("이미 출고된 경우 수정할 수 없습니다.");
						}
					}else{
						throw new ServiceException("데이터가 없습니다.");
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
					.update("prnt_idcd"			, prnt_idcd								 )  /*  상위 ID  */
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

					.insert("prnt_idcd"			, prnt_idcd						)
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
					.update("prnt_idcd"			, prnt_idcd								 )  /*  상위 ID  */
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

	/**
	 * 삭제
	 *
	 */
	//마스터 삭제
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultRow ordrInfo = getOrderInfo(arg);
		if(ordrInfo.size()>0){
			if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(arg.getParamText("amnd_degr")) ) {
				throw new ServiceException("최종 차수가 아닌 경우 삭제할 수 없습니다.");
			}
		}else{
			throw new ServiceException("데이터가 없습니다.");
		}

		//첨부파일 삭제
		data.param
			.table("apnd_file")

			.where("where invc_numb = :invc_numb")
			.where("and   line_seqn = :line_seqn")
			.where("and   uper_seqn = :uper_seqn")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))

			.update("uper_seqn"		, arg.getParameter("uper_seqn"))
		;
		data.attach(Action.delete)
		;
		//차수 삭제
		data.param
			.table("acpt_amnd")

			.where("where invc_numb = :invc_numb")
			.where("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
		;
		data.attach(Action.delete)
		;
		//마스터 아이템 삭제
		data.param
			.table("acpt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
		;
		data.attach(Action.delete)
		;
		//마스터 삭제
		data.param
			.table("acpt_mast")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
		;
		data.attach(Action.delete)
		;
		data.execute();
		return null;
	}

	//amend 생성
	public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
		SqlResultRow ordrInfo = getOrderInfo(arg);

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String amnd_degr	= arg.getParamText("amnd_degr");
		String amnd_date	= arg.getParamText("amnd_date") ;
		String deli_date	= arg.getParamText("deli_date") ;
		String drtr_idcd	= arg.getParamText("drtr_idcd") ;
		String amnd_resn	= arg.getParamText("amnd_resn") ;
		String logn_id		= arg.getParamText("logn_id") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String prnt_idcd	= arg.getParamText("prnt_idcd");
		int new_amnd_degr	= Integer.parseInt(arg.getParamText("amnd_degr")) + 1;

//		if(ordrInfo.size()>0){
//			if(!ordrInfo.getParamText("max_amnd_degr").equals("") && !ordrInfo.getParamText("max_amnd_degr").isEmpty()) {
//				new_amnd_degr = Integer.parseInt(ordrInfo.getParamText("max_amnd_degr")) ;
//			}
//		}else{
//			throw new ServiceException("데이터가 없습니다.");
//		}

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
			.query(" , :prnt_idcd "  	, prnt_idcd		)  //
			.query(" )                                 ")
		;
		data.attach(Action.direct);
		data.execute();
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
			.query("select    a.*																										")
			.query("		, concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name					")
			.query("from (																												")
			.query("		select    a.unit_idcd , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name		")
			.query("				, a.item_idcd , a.item_code , a.item_name , a.item_spec , 1 as piece_qty							")
			.query("				, 0 as cst_pri																						")
			.query("				, ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
			.query("				, 0  as sale_pri																					")
			.query("				, ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
			.query("				, ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
			.query("				, ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name					")
			.query("				, ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name					")
			.query("				, ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name					")
			.query("				, a.modl_name																						")
			.query("		from item_mast a																							")
			.query("		where   1=1																									")
			.query("		and    a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("		and    a.line_stat = 0																						")
			.query("		and    a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd"))  )
			.query("		and    a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd"))  )
			.query("		and    a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
			.query(") a						")
		;
		return data.selectForMap();
	}

	//최종차수 비교
	public SqlResultRow getOrderInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String invc_numb = "";
		String invc_numb2 = "";

		if (arg.containsKey("prnt_idcd")) {
			invc_numb = arg.getParamText("prnt_idcd");
		} else{
			if(arg.getParamText("invc_numb").isEmpty()){
				invc_numb2 =(String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("invc_numb");
			}else{
				invc_numb2 = arg.getParamText("invc_numb");
			}
			invc_numb = invc_numb2.split("_")[0];
		}

		data.param
			.query("select line_clos, line_stat, acpt_stat_dvcd							")
			.query("	 , amnd_degr as max_amnd_degr 									")
			.query("	 , json_value(json_data,'$.repa_stat_dvcd') as repa_stat_dvcd	")
			.query("from  acpt_mast a								")
			.query("where 1=1										")
			.query("and a.prnt_idcd = :invc_numb", invc_numb)
			.query("and   a.amnd_degr = ifnull((					")
			.query(" select max(amnd_degr) as amnd_degr				")
			.query(" from   acpt_mast								")
			.query(" where prnt_idcd = :prnt_idcd",invc_numb)
			.query("),0)											")
		;
		return data.selectForRow();
	}

	//이미지 업로드
	public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = (String)arg.getParameter("chk1");
		String chk2 = (String)arg.getParameter("chk2");
		byte[] returnByte =null;
		byte[] returnByte2 =null;
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos2 =  new ByteArrayOutputStream();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.

		ByteArrayInputStream thumnailInputStream = null;
		ByteArrayInputStream thumnailInputStream2 = null;
		// 이미지일 경우 섬네일 과정을 거친다.

		for (int i = 0; i < file.length; i++) {
//			System.out.println("***************file:"+file[i].getFileItem().getName());
		}

		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
			thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}
		if(file[1].getFileItem().getName()==null||file[1].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[1].getInputStream()).size(240, 180).toOutputStream(baos2);
			thumnailInputStream2 = new ByteArrayInputStream(baos2.toByteArray());
		}
		int readCount = 0;
		int readCount2 = 0;
		try{
			if(chk1.equals("0")){
				data.param
					.query("update acpt_item					")
					.query("       set item_imge = ''			")
					.query("       where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
					.query("         and amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
					.query("         and line_seqn = :line_seqn", arg.getParameter("line_seqn"))
				;
				data.attach();
				data.execute();
				data.clear();
			}else if(chk1.equals("1")){
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();

				data.param
					.table("acpt_item")
					.where("where invc_numb	= :invc_numb" )
					.where("  and amnd_degr	= :amnd_degr" )
					.where("  and line_seqn	= :line_seqn" )

					.unique("invc_numb"	, arg.getParameter("invc_numb"))
					.unique("amnd_degr"	, arg.getParameter("amnd_degr"))
					.unique("line_seqn"	, arg.getParameter("line_seqn"))

					.update("item_imge",returnByte)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update acpt_item					")
					.query("       set item_imge2 = ''			")
					.query("       where  invc_numb = :invc_numb", arg.getParameter("invc_numb"))
					.query("         and  amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
					.query("         and  line_seqn = :line_seqn", arg.getParameter("line_seqn"))
				;
				data.attach();
				data.execute();
				data.clear();
			}else if(chk2.equals("1")){
				byte[] buf2 = new byte[1024];
				while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
					 baos2.write(buf2,0,readCount2);
				}
				returnByte2 = baos2.toByteArray();

				data.param
					.table("acpt_item")
					.where("where invc_numb	= :invc_numb" )
					.where("and   amnd_degr	= :amnd_degr" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("invc_numb"	, arg.getParameter("invc_numb"))
					.unique("amnd_degr"	, arg.getParameter("amnd_degr"))
					.unique("line_seqn"	, arg.getParameter("line_seqn"))

					.update("item_imge2",returnByte2)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
		} catch(Exception ex) {
			throw ex;
		} finally {
			if(baos != null) baos.close();
			if(thumnailInputStream != null) thumnailInputStream.close();
			if(thumnailInputStream2 != null) thumnailInputStream2.close();
		}
		return map;
	}

	//이미지 불러오기
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.file_name												")
			.where("from  apnd_file a												")
			.where("where 1=1														")
			.where("and   a.invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			.where("and   a.line_seqn = :line_seqn", arg.getParameter("line_seqn"))
			.where("and   a.assi_seqn = :assi_seqn", arg.getParameter("assi_seqn"))
			.where("and   a.uper_seqn = :uper_seqn", arg.getParameter("uper_seqn"))
		;
		return data.selectForMap();
	}

	//수리비 산출
	public SqlResultMap setRepairCalc(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultRow ordrInfo = getOrderInfo(arg);

		if(ordrInfo != null && ordrInfo.size()>0){
			System.out.println("9999999999");
			System.out.println(arg.getParameter( "acpt_stat_dvcd" ));
			if ( Double.parseDouble( ordrInfo.getParamText( "acpt_stat_dvcd" )) > 3000) {
				throw new ServiceException("출고된 제품은 수리비 산출을 할 수 없습니다.");
			}
		}else{
			throw new ServiceException("데이터가 없습니다.");
		}

		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "work_book_json_fields");

		data.param
			.table ("work_book")
			.where ("where invc_numb = :invc_numb")
			.where ("and   wkod_seqn = :wkod_seqn")

			.unique("invc_numb"        , arg.fixParameter("work_invc_numb"))

			.update("wkod_numb"        , arg.getParameter("invc_numb"))
			.update("wkod_seqn"        , arg.getParameter("amnd_degr"))

			.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.psep_exps_amnt','$.pric_time','$.repa_exps_amnt','$.prts_repa_amnt','$.entp_pfit_amnt','$.etcc_repa_amnt','$.prod_drtr_idcd','$.prod_drtr_name'), '" + json_data + "')")
		;
		data.attach(Action.update);


		double invc_amnt = Double.parseDouble(arg.getParamText("repa_exps_amnt"));
		double sply_amnt = invc_amnt / 1.1;
		double vatx_amnt = invc_amnt - sply_amnt;

		data.param
			.table ("acpt_item")
			.where ("where invc_numb = :invc_numb")
			.where ("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"        , arg.getParameter("invc_numb"))
			.unique("amnd_degr"        , arg.getParameter("amnd_degr"))

			.update("sply_amnt"        , sply_amnt)
			.update("vatx_amnt"        , vatx_amnt)
			.update("invc_amnt"        , invc_amnt)
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}

	//수리비 산출 정보 가져오기
	public SqlResultMap getRepairCalc(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select	a.invc_numb as work_invc_numb   , w.need_time as need_time									")
			.query("	,	sum(cast(json_unquote(json_extract(b.json_data,'$.amnt') ) as decimal)) as prts_repa_amnt	")
			.query("	,	d.user_name as prod_drtr_name																")
			.query("	,	json_value(c.json_data,'$.prod_drtr_idcd') as prod_drtr_idcd								")
		;
		data.param
			.where("from	work_book a																					")
			.where("		left outer join work_book_mtrl b on b.invc_numb = a.invc_numb								")
			.where("		left outer join ( select   a.invc_numb,   sum(a.need_time) as need_time						")
			.where("						  from work_book_mans a														")
			.where("						  group by a.invc_numb														")
			.where("						) w on w.invc_numb = a.invc_numb											")
//			.where("		left outer join work_book_mans w on w.invc_numb = a.invc_numb								")
			.where("		left outer join acpt_item c on a.wkod_numb = c.invc_numb and a.wkod_seqn = c.amnd_degr		")
			.where("		left outer join user_mast d on d.user_idcd = json_value(c.json_data,'$.prod_drtr_idcd')		")
			.where("where	1=1																							")
			.where("and		a.wkod_numb 	= :invc_numb	" ,arg.getParamText("invc_numb"))
			.where("and		a.wkod_seqn		= :amnd_degr	" ,arg.getParamText("amnd_degr"))
			.where("and		a.line_stat  < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																				")
		;
		return data.selectForMap();
	}

	//입고등록
	public SqlResultMap setIsttStore(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row : map) {
			ParamToJson trans = new ParamToJson();

			/*// 반입여부 설정
			if(null!=row.getParameter("brin_yorn")){
				row.setParameter("brin_yorn", "1");
			}else{
				row.setParameter("brin_yorn", "0");
			}*/

			// 입고일자 설정
			row.setParameter("istt_date", row.getParameter("istt_date").toString().replaceAll("-", ""));
			String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

			data.param
				.table("acpt_mast											")
				.where("where invc_numb		= :invc_numb					")  /*  INVOICE번호  */
				.where("and   amnd_degr		= :amnd_degr					")	/*  AMEND순번  */

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"))

				.update("acpt_stat_dvcd"	, "1000"						)
				.update("acpt_dvcd"			,  row.getParameter("acpt_dvcd")						)
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("acpt_item											")
				.where("where invc_numb		= :invc_numb					")  /*  INVOICE번호  */
				.where("and   line_seqn		= :line_seqn					")  /*  INVOICE순번  */
				.where("and   amnd_degr		= :amnd_degr					")	/*  AMEND순번  */

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"))

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.istt_date', '$.brin_yorn'), '" + json_data + "')")
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			if(row.getParameter("modi_yorn").equals("y")){
				data.param
					.table("isos_book")
					.where("where 	invc_numb	= :invc_numb				")
					.where("and		line_seqn	= :line_seqn				")
					.where("and		(invc_dvcd = 1800 or invc_dvcd = 1900)	")

					.unique("invc_numb"		, row.fixParameter("invc_numb"))
					.unique("line_seqn"		, row.fixParameter("line_seqn"))

					.update("invc_date", row.getParameter("istt_date"))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}

			if(!row.getParameter("modi_yorn").equals("y")){
				data.param
					.query("call auto_isos_booking (						")
					.query("   :invc_numb  "  , row.fixParameter("invc_numb"))  // Invoice 번호
					.query(" , :line_seqn  "  , row.fixParameter("line_seqn"))  //
					.query(" , :source_dvcd"  , "수리입고"	 					)   // 구분코드
					.query(" )			")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}
		}
		return null;
	}

	//출고등록
	public SqlResultMap setRelease(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row : map) {
			ParamToJson trans = new ParamToJson();

			// 출고일자 설정
			row.setParameter("ostt_date", new SimpleDateFormat("yyyyMMdd").format(new Date()));
			String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

			data.param
				.table("acpt_mast"													 )
				.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
				.where("and   amnd_degr		= :amnd_degr							")	/*  AMEND순번  */

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))

				.update("acpt_stat_dvcd"	, "6000"								)
			;
			data.attach(Action.update);
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

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.ostt_date','$.ostt_qntt','$.ostt_drtr_idcd'), '" + json_data + "')")
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.query("call auto_isos_booking_ostt (		")
				.query("   :invc_numb  "  , row.fixParameter("invc_numb"			))  // Invoice 번호
				.query(" , :line_seqn  "  , row.fixParameter("line_seqn"			))  //
				.query(" , :wrhs_idcd  "  , row.fixParameter("wrhs_idcd"			))  // Invoice 번호
//				.query(" , :zone_idcd  "  , row.fixParameter("zone_idcd"			))  //
				.query(" , :source_dvcd"  , "수리출고"	 )  // 구분코드
				.query(" ) 								")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null;
	}

	//출고 취소
	public SqlResultMap setReleaseCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row : map) {
//			String invc_numb = "";
//			if (arg.containsKey("prnt_idcd")) {
//				invc_numb = row.getParamText("prnt_idcd");
//			} else{
//				invc_numb = row.getParamText("invc_numb");
//			}
//			data.param
//				.query("select line_clos, line_stat, acpt_stat_dvcd																											")
//				.query("	 , (select max(amnd_degr) from acpt_mast where invc_numb = a.invc_numb) as max_amnd_degr 														")
//				.query("	 , (select json_value(json_data,'$.repa_stat_dvcd') from acpt_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as repa_stat_dvcd ")
//				.query("from  acpt_mast a							")
//				.where("where 1=1									")
//				.where("and	  a.prnt_idcd = :invc_numb", invc_numb)
//				.where("and   a.amnd_degr = :amnd_degr", row.fixParameter("amnd_degr"))
//			;
//			SqlResultRow ordrInfo = data.selectForRow();
//
//			SqlResultRow ordrInfo = getOrderInfo(arg);
//			data.clear();
//
//			if(ordrInfo.size()>0){
//				if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(row.getParamText("amnd_degr"))) {
//					throw new ServiceException("최종 차수가 아닌 수리품은 출고취소를 할 수 없습니다.");
//				}
//			}else{
//				throw new ServiceException("데이터가 없습니다.");
//			}


			// 출고일자 취소
	//		arg.setParameter("ostt_date", "");
			ParamToJson trans = new ParamToJson();
			String json_data = trans.TranslateRowAll(arg, row, "acpt_item_json_fields");

			data.param
				.table("acpt_mast"											 )
				.where("where invc_numb		= :invc_numb					")  /*  INVOICE번호  */
				.where("and   amnd_degr		= :amnd_degr					")	/*  AMEND순번  */

				.unique("invc_numb"			, row.fixParameter("invc_numb")	 )
				.unique("amnd_degr"			, row.fixParameter("amnd_degr")	 )

				.update("acpt_stat_dvcd"	, "3000"						 )
			;
			data.attach(Action.update);

			data.param
				.table("acpt_item"											 )
				.where("where invc_numb		= :invc_numb					")  /*  INVOICE번호  */
				.where("and   line_seqn		= :line_seqn					")  /*  INVOICE순번  */
				.where("and   amnd_degr		= :amnd_degr					")	/*  AMEND순번  */

				.unique("invc_numb"			, row.fixParameter("invc_numb")	 )
				.unique("line_seqn"			, row.fixParameter("line_seqn")	 )
				.unique("amnd_degr"			, row.fixParameter("amnd_degr")	 )

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.ostt_date','$.ostt_qntt','$.ostt_drtr_idcd'), '" + json_data + "')")
			;
			data.attach(Action.update);

			data.param
				.query("delete	a																")
				.query("from	isos_book a														")
				.query("		left outer join work_book_mtrl c on c.invc_numb = a.invc_numb	")
				.query("		left outer join work_book      b on b.invc_numb = c.invc_numb	")
				.query("where	b.wkod_numb = :invc_numb " , row.getParamText("invc_numb"))
				.query("and		b.wkod_seqn = :amnd_degr " , row.getParamText("amnd_degr"))
			;
			data.attach(Action.direct);

			data.param
				.table("isos_book ")
				.where("where invc_numb = :invc_numb ")
				.where("and   invc_dvcd = invc_dvcd  ")

				.unique("invc_numb"		, row.fixParameter("invc_numb"))
				.unique("invc_dvcd"		, "2800")
				.unique("line_seqn"		, row.fixParameter("line_seqn"))
				.unique("assi_seqn"		, "0")
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}
		return null;
	}
	/**
	 * 삭제
	 *
	 */
	//마스터 삭제
	public SqlResultMap setLineClos(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		//첨부파일 삭제
		data.param
			.table("acpt_mast")

			.where("where invc_numb = :invc_numb")
			.where("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))

			.update("line_clos"		, arg.getParameter("line_clos"))
		;
		data.attach(Action.update)
		;
		data.execute();

		return null;
	}
}