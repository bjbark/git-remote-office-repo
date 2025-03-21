package com.sky.system.custom.sjflv.sale.export.offermast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.export.OfferMastService")
public class OfferMastService  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select    a.invc_numb         , a.amnd_degr       , a.expt_dvcd       , a.mngt_numb							")
		.query("        , a.offr_dvcd         , a.drtr_idcd       , a.bzpl_idcd       , a.mdtn_prsn							")
		.query("        , a.invc_date         , a.buyr_name       , a.stot_ddln       , a.mney_unit							")
		.query("        , a.exrt              , s.drtr_name       , a.ostt_schd_date  , b.item_idcd  						")
		.query("        , a.ship_viaa_dvcd    , a.pric_cond_dvcd  , a.trde_stot_dvcd  , a.stot_time_dvcd					")
		.query("        , k.item_name    																					")
		;
		data.param
			.where("from expt_offr_mast a																		")
			.where("left outer join expt_offr_item b  on a.invc_numb = b.invc_numb								")
			.where("left outer join bzpl_mast 	   c  on a.bzpl_idcd = c.bzpl_idcd								")
			.where("left outer join cstm_drtr	   s  on a.drtr_idcd = s.drtr_name								")
			.where("left outer join item_mast	   k  on b.item_idcd = k.item_idcd								")

			.where("where  1=1 																					")
			.where("and    b.bzpl_idcd = :bzpl_idcd"       , arg.getParamText("bzpl_idcd"))
			.where("and    a.invc_numb like :invc_numb%"   , arg.getParamText("invc_numb"))
			.where("and    a.invc_date >= :invc_date1"     , arg.getParamText("invc_date1"))
			.where("and    a.invc_date <= :invc_date2"     , arg.getParamText("invc_date2"))
			.where("and    a.invc_numb = :invc_numb"       , arg.getParamText("invc_numb"))
			.where("and    a.buyr_name = :buyr_name"       , arg.getParamText("buyr_name"))
			.where("and    a.expt_dvcd = :expt_dvcd"       , arg.getParamText("expt_dvcd"))
			.where("and    a.mngt_numb = :mngt_numb"       , arg.getParamText("mngt_numb"))
			.where("and    a.mdtn_prsn = :mdtn_prsn"       , arg.getParamText("mdtn_prsn"))
			.where("and    a.stot_ddln = :stot_ddln"       , arg.getParamText("stot_ddln"))
//			.where("and    a.ex = :mngt_numb"              , arg.getParamText("mngt_numb"))
			.where("and    a.trde_stot_dvcd = :trde_stot_dvcd"    , arg.getParamText("trde_stot_dvcd" ))
			.where("and    a.pric_cond_dvcd = :pric_cond_dvcd"    , arg.getParamText("pric_cond_dvcd" ))
			.where("and    a.stot_time_dvcd = :stot_time_dvcd"    , arg.getParamText("stot_time_dvcd" ))
			.where("and    a.drtr_idcd = :drtr_idcd"       , arg.getParamText("drtr_idcd" ))
			.where("and    b.item_idcd = :item_idcd"       , arg.getParamText("item_idcd" ))
//			.where("and    b.mdtn_prsn = :mdtn_prsn"       , arg.getParamText("mdtn_prsn" ))
			.where("and    a.line_clos = :line_clos"       , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("order by invc_date desc																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getCost(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   :invc as invc_numb							", arg.fixParamText("invc_numb"))
			.query("       , v.line_seqn     , a.exps_grcd      										")
			.query("       , a.occr_date     , a.cstm_idcd     , a.mney_unit      , a.exrt				")
			.query("       , a.vatx_yorn     , a.exch_amnt     , a.exch_vatx      , a.krwn_amnt			")
			.query("       , a.krwn_vatx     , a.remk_text     , a.orig_amnd_degr						")
			.query("       , a.orig_seqn     , a.paym_date     , a.paym_cstm_name						")
			.query("       , (a.krwn_amnt + a.krwn_vatx) as total										")
			.query("       ,  v.item_code as trde_exps_dvcd 											")
			.query("       ,  :orig_invc_numb as orig_invc_numb			", arg.fixParamText("invc_numb"))

			.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
			.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
			.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
			.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
			.query("       , a.crte_idcd        , a.crte_urif											")
		;
		data.param
			.where("from ( select *,@rank:=@rank+1 as line_seqn from sscd_view									")
			.where("      , ( select @rank := 0) r where sscd_code = 'trde_exps_dvcd') v						")
			.where("left outer join																				")
			.where("     ( select a.invc_numb        , a.line_seqn       , a.exps_grcd      , a.trde_exps_dvcd	")
			.where("            , a.occr_date        , a.cstm_idcd       , a.mney_unit      , a.exrt			")
			.where("            , a.vatx_yorn        , a.exch_amnt       , a.exch_vatx      , a.krwn_amnt		")
			.where("            , a.krwn_vatx        , a.remk_text       , a.orig_invc_numb , a.orig_amnd_degr	")
			.where("            , a.orig_seqn        , a.paym_date       , b.paym_cstm_name						")
			.where("            , (a.krwn_amnt + a.krwn_vatx) as total											")
			.where("            , a.user_memo        , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
			.where("            , a.line_ordr        , a.line_stat       , a.line_clos      , a.find_name		")
			.where("            , a.updt_user_name   , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
			.where("            , a.updt_urif        , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
			.where("            , a.crte_idcd        , a.crte_urif												")
			.where("       from expt_exps_item a																")
			.where("       left outer join expt_exps_mast b on a.invc_numb = b.invc_numb						")
			.where("       where  1=1 																			")
			.where("       and    a.orig_invc_numb = :invc_numb"    , arg.fixParamText("invc_numb"))
			.where("       and    a.orig_amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr" ))
			.where("       and    a.orig_seqn      = :line_seqn"    , arg.getParamText("line_seqn" ))
			.where(") a on v.item_code = a.trde_exps_dvcd														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getPayment(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb        , a.line_seqn       , b.invc_date  as paym_date        			")
			.query("       , b.mney_unit        , a.exch_amnt       , a.orig_invc_numb   , a.orig_amnd_degr		")
			.query("       , a.orig_seqn        , b.exrt														")

			.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
			.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
			.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
			.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
			.query("       , a.crte_idcd        , a.crte_urif											")
		;
		data.param
			.where("from expt_paym_item a																")
			.where("left outer join expt_paym_mast b on a.invc_numb = b.invc_numb						")
			.where("where  1=1 																			")
			.where("and    a.orig_invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
			.where("and    a.orig_amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr" ))
			.where("and    a.orig_seqn      = :line_seqn"    , arg.getParamText("line_seqn" ))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getPacking(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.invc_numb        , a.line_seqn       , a.item_idcd        , i.item_code				")
			.query("       , i.item_spec        , i.item_name														")
			.query("       , ifnull(cast(json_unquote(json_extract(a.json_data,'$.pckg_size')) as char),			")
			.query("         ( select cast(json_unquote(json_extract(a.json_data,'$.pckg_size')) as char)			")
			.query("           from expt_offr_item r 																")
			.query("           where a.item_idcd = r.item_idcd														")
			.query("           order by crte_dttm desc limit 1														")
			.query("         )																						")
			.query("       ) as pckg_size																			")

			.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
			.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
			.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
			.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
			.query("       , a.crte_idcd        , a.crte_urif											")
		;
		data.param
			.where("from expt_ordr_item a																")
			.where("left outer join item_mast i on i.item_idcd = a.item_idcd							")
			.where("where  1=1 																			")
			.where("and    a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
		;

		return data.selectForMap(sort) ;

	}
	public SqlResultMap getNego(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   c.invc_numb        , a.line_seqn       , a.item_idcd        , i.item_code				")
			.query("       , i.item_spec        , i.item_name       , a.qntt										")
			.query("       , cast(json_unquote(json_extract(b.json_data,'$.cmis_pric')) as decimal ) as cmis_pric	")
			.query("       , cast(json_unquote(json_extract(b.json_data,'$.cmis_amnt')) as decimal ) as cmis_amnt	")
			.query("       , cast(json_unquote(json_extract(b.json_data,'$.pfit_pric')) as decimal ) as pfit_pric	")
			.query("       , cast(json_unquote(json_extract(b.json_data,'$.pfit_amnt')) as decimal ) as pfit_amnt	")
			.query("       , c.mney_unit        , c.exrt															")
			.query("       , a.invc_numb as ordr_numb               , a.amnd_degr        , a.line_seqn				")

			.query("       , b.user_memo        , b.sysm_memo       , b.prnt_idcd        , b.line_levl	")
			.query("       , b.line_ordr        , b.line_stat       , b.line_clos        , b.find_name	")
			.query("       , b.updt_user_name   , b.updt_ipad       , b.updt_dttm        , b.updt_idcd	")
			.query("       , b.updt_urif        , b.crte_user_name  , b.crte_ipad        , b.crte_dttm	")
			.query("       , b.crte_idcd        , b.crte_urif											")
		;
		data.param
			.where("from expt_ordr_item a																")
			.where("left outer join expt_nego_item b on a.invc_numb = b.orig_invc_numb and a.line_seqn = b.orig_seqn")
			.where("left outer join expt_nego_mast c on b.invc_numb = c.invc_numb						")
			.where("left outer join item_mast i on i.item_idcd = a.item_idcd							")
			.where("where  1=1 																			")
			.where("and    a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
		;

		return data.selectForMap(sort) ;

	}
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select    a.invc_numb         , a.amnd_degr       , a.expt_dvcd       , a.mngt_numb							")
		.query("        , a.offr_dvcd         , a.drtr_idcd       , a.bzpl_idcd       , a.mdtn_prsn							")
		.query("        , a.invc_date         , a.buyr_name       , a.stot_ddln       , a.mney_unit							")
		.query("        , a.exrt              , s.drtr_name       , a.ostt_schd_date  , b.item_idcd  						")
		.query("        , a.ship_viaa_dvcd    , a.pric_cond_dvcd  , a.trde_stot_dvcd  , a.stot_time_dvcd					")
		.query("        , k.item_name         , k.item_name       , k.item_spec       										")
		;
		data.param
		.where("from expt_offr_mast a																		")
		.where("left outer join expt_offr_item b  on a.invc_numb = b.invc_numb								")
		.where("left outer join bzpl_mast 	   c  on a.bzpl_idcd = c.bzpl_idcd								")
		.where("left outer join cstm_drtr	   s  on a.drtr_idcd = s.drtr_name								")
		.where("left outer join item_mast	   k  on b.item_idcd = k.item_idcd								")

			.where("where 1 = 1															")
			.where("and   a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
			.where("and   a.amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr"))
			.where("and   a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select   a.invc_numb        , a.amnd_degr       , a.line_seqn        , a.item_idcd	")
				.query("       , a.unit_idcd        , a.qntt            , a.exch_pric        , a.crte_urif	")
				.query("       , a.exch_amnt        , a.krwn_pric       , a.krwn_amnt        , a.deli_date	")
				.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
				.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
				.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
				.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
				.query("       , a.crte_idcd        , i.item_code       , i.item_name        , i.item_spec	")
				.query("       , i.unit_idcd        														")
			;
			data.param
				.where("from expt_offr_item a 													")
				.where("left outer join item_mast i on a.item_idcd = i.item_idcd				")
				.where("left outer join unit_mast u on u.unit_idcd = a.unit_idcd				")
				.where("left outer join expt_offr_mast d on a.invc_numb = d.invc_numb			")
				.where("where 1 = 1																")
				.where("and   a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
				.where("and   a.amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr"))
				.where("and   a.amnd_degr = :line_seqn"    , arg.getParamText("line_seqn"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getAcpt(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb        , a.acpt_stat_dvcd										")
		;
		data.param
			.where("from acpt_mast a																	")
			.where("where  1=1 																			")
			.where("and    a.orig_invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	//invoice master 등록/수정/삭제
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

//		ParamToJson trans = new ParamToJson();
//		String json;

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("expt_offr_mast")
					.where("where invc_numb = :invc_numb")
					.where("where amnd_degr = :amnd_degr")

					.unique("invc_numb", row.fixParameter("invc_numb"))
					.unique("amnd_degr", row.fixParameter("amnd_degr"))

					.update("line_stat", 2)

					.update("updt_ipad", row.getParameter("updt_ipad"))
					.update("updt_dttm", row.getParameter("updt_dttm"))
					.update("updt_idcd", row.getParameter("updt_idcd"))
				;
				data.attach(Action.update);
				data.execute();
			} else {
				// master 등록/수정
//				json = trans.TranslateRow(arg,row, "expt_ordr_mast_json_fields");

				data.param
				.table("expt_offr_mast"												)
				.where("where invc_numb = :invc_numb								")
				.where("and   amnd_degr = :amnd_degr								")

				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))

				//
				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))  /*  사업장ID  */
				.update("buyr_name"			, row.getParameter("buyr_name"))  /*  바이어명  */
				.update("exrt"				, row.getParameter("exrt"	))    /*  환율  */
				.update("qntt"				, row.getParameter("qntt"	))    /*  수량  */
				.update("etaa"				, row.getParameter("etaa"))       /*  ETA  */
				.update("vldt"				, row.getParameter("vldt"))       /*  Validity  */
				.update("exch_pric"			, row.getParameter("exch_pric"))  /*  외환단가  */
				.update("exch_amnt"			, row.getParameter("exch_amnt"))  /*  외환금액  */
				.update("krwn_pric"			, row.getParameter("krwn_pric"))  /*  원화단가  */
				.update("krwn_amnt"			, row.getParameter("krwn_amnt"))  /*  원화금액  */
				.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"))  /*  중개인  */
//				.update("deli_date"			, row.getParameter("deli_date"))  /*  납기일자  */
				.update("ship_viaa_dvcd"	, row.getParameter("ship_viaa_dvcd"))  /*  가격조건구분코드  */
				.update("pric_cond_dvcd"	, row.getParameter("pric_cond_dvcd"))  /*  가격조건구분코드  */
				.update("trde_stot_dvcd"	, row.getParameter("trde_stot_dvcd"))  /*  무역결제구분코드  */
				.update("stot_time_dvcd"	, row.getParameter("stot_time_dvcd"))  /*  결제시기구분코드  */
				.update("stot_ddln"			, row.getParameter("stot_ddln"))       /*  결제기한  */
				.update("mney_unit"			, row.getParameter("mney_unit"))       /*  화폐단위  */
				.update("ship_port"			, row.getParameter("ship_port"))       /*  선적항구  */
				.update("ostt_schd_date"	, row.getParameter("ostt_schd_date"))  /*  출고예정일자  */
				.update("arvl_port"			, row.getParameter("arvl_port"))       /*  도착항구  */
				.update("pckg_unit"			, row.getParameter("pckg_unit"))       /*  포장단위  */
				.update("dsch_port"			, row.getParameter("dsch_port"))       /*  DischargingPort  */
//				.update("remk_text"			, row.getParameter("remk_text"))

//				.update("json_data"			, json)

				.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
				.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
				.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
				.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
				.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
				.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
				.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
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


				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
		}
		data.execute();
		return null;
	}

	//invoice detail 등록/수정/삭제
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {


		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("expt_offr_item"												)
					.where("where invc_numb		= :invc_numb							")
					.where("and   amnd_degr		= :amnd_degr							")
					.where("and   line_seqn		= :line_seqn							")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			} else {
				data.param
					.table("expt_offr_item"												)
					.where("where invc_numb		= :invc_numb							")
					.where("and   amnd_degr		= :amnd_degr							")
					.where("and   line_seqn		= :line_seqn							")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					//
					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("unit_idcd"			, row.getParameter("unit_idcd"))
					.update("qntt"				, row.getParameter("qntt"))
					.update("exch_pric"			, row.getParameter("exch_pric"))
					.update("exch_amnt"			, row.getParameter("exch_amnt"))
					.update("krwn_pric"			, row.getParameter("krwn_pric"))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"))
					.update("deli_date"			, row.getParameter("deli_date"))
//					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"))
//					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"))
//					.update("dlvy_date"			, row.getParameter("dlvy_date"))
//					.update("dlvy_time"			, row.getParameter("dlvy_time"))
//					.update("json_data"			, row.getParameter("json_data"))
//					.update("orig_seqn"			, row.getParameter("orig_seqn"))
//					.update("remk_text"			, row.getParameter("remk_text"))

//					.update("json_data"			, json)

					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, mst.getParamText("invc_numb"			).trim()
												+ ' '
												+ mst.getParamText("expt_lcal_name"		).trim()
												+ ' '
												+ mst.getParamText("cstm_name"			).trim())
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
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
		}
	}

	public SqlResultMap setInvoicePopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("impt_invc_mast"													)
			.where("where prnt_idcd = :prnt_idcd								")
			//
			.unique("prnt_idcd"			, arg.fixParameter("orig_invc_numb"	))

			.update("invc_numb"			, arg.fixParameter("invc_numb"	))
			//
			.update("invc_date"			, arg.getParameter("invc_date"	))
			.update("bzpl_idcd"			, arg.getParameter("bzpl_idcd"	))
			.update("cstm_idcd"			, arg.getParameter("cstm_idcd"	))
			.update("incm_dvcd"			, arg.getParameter("incm_dvcd"	))
			.update("bank_name"			, arg.getParameter("bank_name"	))
			.update("mngt_numb"			, arg.getParameter("mngt_numb"	))


			.update("updt_user_name"	, arg.getParameter("updt_user_name"		))
			.update("updt_ipad"			, arg.getParameter("updt_ipad"			))
			.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
			.update("updt_urif"			, arg.getParameter("updt_urif"			))
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		data.param
			.table("impt_invc_item"													)
			.where("where orig_invc_numb = :orig_invc_numb						")
			.where("and   orig_amnd_degr = :orig_amnd_degr						")
			.where("and   orig_seqn = :orig_seqn								")
			//
			.unique("orig_invc_numb"	, arg.fixParameter("orig_invc_numb"	))
			.unique("orig_amnd_degr"	, arg.fixParameter("orig_amnd_degr"	))
			.unique("orig_seqn"			, arg.fixParameter("orig_seqn"	))

			.update("invc_numb"			, arg.fixParameter("invc_numb"			))
			.update("line_seqn"			, 1)
			//
			.update("item_idcd"			, arg.getParameter("item_idcd"	))
			.update("item_hscd"			, arg.getParameter("item_hscd"	))
			.update("unit_idcd"			, arg.getParameter("unit_idcd"	))
			.update("lott_numb"			, arg.getParameter("lott_numb"	))
			.update("sral_numb"			, arg.getParameter("sral_numb"	))
			.update("qntt"				, arg.getParameter("qntt"	))
			.update("exch_pric"			, arg.getParameter("exch_pric"	))
			.update("exch_amnt"			, arg.getParameter("exch_amnt"	))
			.update("krwn_pric"			, arg.getParameter("krwn_pric"	))
			.update("krwn_amnt"			, arg.getParameter("krwn_amnt"	))
			.update("deli_date"			, arg.getParameter("deli_date"	))
			.update("istt_wrhs_idcd"	, arg.getParameter("istt_wrhs_idcd"	))
			.update("dlvy_cstm_idcd"	, arg.getParameter("dlvy_cstm_idcd"	))


			.update("updt_user_name"	, arg.getParameter("updt_user_name"		))
			.update("updt_ipad"			, arg.getParameter("updt_ipad"			))
			.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
			.update("updt_urif"			, arg.getParameter("updt_urif"			))
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.modify);
		data.execute();

		return null;
	}

	public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call auto_impt_ordr_amnd(")
			.query("      :invc_numb"			, arg.fixParameter("invc_numb"	))
			.query("    , :amnd_degr"			, arg.fixParameter("amnd_degr"	))
			.query("    , :crte_idcd"			, arg.fixParameter("crte_idcd"	))
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		return null;
	}
	public SqlResultMap setInvc(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if(rowaction == Action.delete){
				data.param
					.table("expt_ordr_mast"												)
					.where("where invc_numb = :invc_numb								")

					//
					.unique("invc_numb"			, row.fixParameter("ordr_numb"	))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("expt_ordr_item"												)
					.where("where invc_numb = :invc_numb								")

					//
					.unique("invc_numb"			, row.fixParameter("ordr_numb"	))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				data.param
					.query("delete a,b 						")
					.query("from expt_invc_item a			")
					.query("left outer join expt_invc_mast b on a.invc_numb = b.invc_numb")
					.query("where a.orig_invc_numb = :orig_invc_numb", row.getParameter("ordr_numb"))
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();

				data.param
					.table("expt_ordr_mast"													)
					.where("where invc_numb = :invc_numb								")
					//
					.unique("invc_numb"			, row.fixParameter("ordr_numb"	))

					.update("ogin_name", row.getParameter("ogin_name"))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("expt_invc_mast"													)
					.where("where invc_numb = :invc_numb								")
					//
					.unique("invc_numb"			, row.fixParameter("ordr_numb"	))

					.update("invc_date",	  row.getParameter("invc_date"))
					.update("cstm_pcod_numb", row.getParameter("cstm_pcod_numb"))
					.update("paym_cond_name", row.getParameter("paym_cond_name"))
					.update("ntfc_text"		, row.getParameter("ntfc_text"))
					.update("remk_text"		, row.getParameter("remk_text"))
					.update("ship_name"		, row.getParameter("ship_name"))
					.update("csge_name"		, row.getParameter("csge_name"))

					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ row.getParamText("invc_date"			).trim()
												+ row.getParamText("item_name"			).trim())
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
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("expt_invc_item"													)
					.where("where invc_numb = :invc_numb								")
					//
					.unique("invc_numb"			, row.fixParameter("ordr_numb"	))

					.insert("line_seqn", 1) // 삼정에서는 1:1이라 사용 x
					.update("orig_invc_numb", row.getParameter("ordr_numb"))


					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ row.getParamText("invc_date"			).trim()
												+ row.getParamText("item_name"			).trim())
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
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
		}
		return null;
	}
	public SqlResultMap setCost(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		int i = 0;
		String paym_date = "";

		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if(rowaction == Action.delete){
				data.param
					.table("expt_exps_item"												)
					.where("where invc_numb = :invc_numb								")

					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"	))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.query("delete a from expt_exps_mast a left outer join expt_exps_item b on a.invc_numb = b.invc_numb where b.invc_numb is null")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}else{
				if(i == 0){
					data.param
						.table("expt_exps_mast"												)
						.where("where invc_numb = :invc_numb								")
						//
						.unique("invc_numb"			, row.fixParameter("invc_numb"	))

						.update("paym_cstm_name"	, row.getParameter("paym_cstm_name"))
						.update("invc_date"			, row.getParameter("paym_date"))


						.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
						.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
						.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
						.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
						.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
						.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
						.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
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
					data.attach(Action.modify);
					data.execute();
					data.clear();
					i++;
				}
				data.param
					.table("expt_exps_item"													)
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"	))
					.unique("line_seqn"			, row.fixParameter("line_seqn"	))

					.update("trde_exps_dvcd"	, row.getParameter("trde_exps_dvcd"))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"))
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"))
					.update("paym_date"			, row.getParameter("paym_date"))
					.update("remk_text"			, row.getParameter("remk_text"))
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"))
					.update("orig_amnd_degr"	, row.getParameter("orig_amnd_degr"))
					.update("orig_seqn"			, row.getParameter("orig_seqn"))


					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
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
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
		}

		return null;
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("expt_offr_mast")
					.where("where invc_numb  = :invc_numb")

					.unique("ordr_idcd"			, row.fixParameter("ordr_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("expt_offr_mast")
					.where("where invc_numb	= :invc_numb" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))
					.update("mngt_numb"			, row.getParameter("mngt_numb"))
					.update("offr_dvcd"			, row.getParameter("offr_dvcd"))
					.update("ordr_dvcd"			, row.getParameter("ordr_dvcd"))
					.update("dept_idcd"			, row.getParameter("dept_idcd"))
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"))
					.update("ship_viaa_dvcd"	, row.getParameter("ship_viaa_dvcd"))
					.update("crdt_exce_yorn"	, row.getParameter("crdt_exce_yorn"))
					.update("amnt_lack_yorn"	, row.getParameter("amnt_lack_yorn"))
					.update("mdtn_prsn"	, row.getParameter("mdtn_prsn"))
					.update("user_memo"			, row.getParameter("user_memo"))

					.update("find_name"			, row.getParameter("buyr_name")
												+ " "
												+ row.fixParameter("bzpl_idcd")
												+ " "
												+ row.fixParameter("drtr_idcd"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.insert("line_ordr"			, row.getParameter("line_ordr"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("expt_offr_mast")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		return null;
	}


	public SqlResultMap setPayment(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		int i = 0;
		String paym_date = "";

		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if(rowaction == Action.delete){
				data.param
					.table("expt_paym_mast"												)
					.where("where invc_numb = :invc_numb								")

					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"	))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
				data.param
					.table("expt_paym_item"												)
					.where("where invc_numb = :invc_numb								")

					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"	))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				if(!row.getParamText("paym_date").equals("")){
					if(row.getParamText("paym_date").length()>9){
						paym_date = format.format(new Date(row.getParamText("paym_date")));
					}else{
						paym_date = row.getParamText("paym_date");
					}
				}else{
					paym_date = "";
				}
				data.param
					.table("expt_paym_mast"												)
					.where("where invc_numb = :invc_numb								")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"	))

					.update("exrt"				, row.getParameter("exrt"))
					.update("mney_unit"			, row.getParameter("mney_unit"))
					.update("invc_date"			, paym_date)


					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
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
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("expt_paym_item"													)
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"	))
					.unique("line_seqn"			, row.fixParameter("line_seqn"	))

					.update("exch_amnt"			, row.getParameter("exch_amnt"))
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"))
					.update("orig_amnd_degr"	, row.getParameter("orig_amnd_degr"))
					.update("orig_seqn"			, row.getParameter("orig_seqn"))


					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
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
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
		}

		return null;
	}
	public SqlResultMap setSked(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("expt_ordr_mast")
			.where("where invc_numb = :invc_numb")

			.unique("invc_numb", arg.fixParameter("ordr_numb"))

			.update("ostt_schd_date", arg.getParameter("ostt_schd_date"))
			.update("etdd", arg.getParameter("etdd"))
			.update("etaa", arg.getParameter("etaa"))
		;
		data.attach(Action.update);
		data.execute();

		return null;
	}
	public SqlResultMap setPacking(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = new SqlResultMap();

		if(!arg.getParamText("records").equals("")){					// invoice형태의 popup이라 2번 호출하며 없을 경우를 위해 체크.
			map = arg.getParameter("records", SqlResultMap.class);
		}
		ParamToJson trans = new ParamToJson();
		if(!arg.getParamText("ordr_numb").equals("")){
			/*
			data.param
				.table("expt_ordr_mast")
				.where("where invc_numb = :invc_numb")

				.unique("invc_numb", arg.getParameter("ordr_numb"))

				.update("pckg_unit", arg.getParameter("pckg_unit"))
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
			*/

			String json;
			json = trans.Translate(arg, "expt_ordr_mast_json_fields");

			data.param
				.query("update expt_ordr_mast a")

				.query("set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(a.json_data,'{}'),'$.pckg_totl_wigt'),:json)",json)	//json merge  remove로 중복제거 후 merge
				.query("  , a.pckg_unit = '" + arg.getParamText("pckg_unit") + "'")

				.query("where invc_numb = :invc_numb",arg.getParameter("ordr_numb"))
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}

		int i = 0;

		if(map.size()>0){				// 없으면 detail은 수정x
			for (SqlResultRow row:map) {
				String json;
				json = trans.TranslateRow(arg,row, "expt_ordr_item_json_fields");

				data.param
					.query("update expt_ordr_item a")

					.query("set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(a.json_data,'{}'),'$.pckg_size'),:json)",json)	//json merge  remove로 중복제거 후 merge

					.query("where invc_numb = :invc_numb",row.fixParameter("invc_numb"))
					.query("and   line_seqn = :line_seqn",row.fixParameter("line_seqn"))
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}
		}
		return null;
	}
	public SqlResultMap setNego(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = new SqlResultMap();

		if(!arg.getParamText("records").equals("")){					// invoice형태의 popup이라 2번 호출하며 없을 경우를 위해 체크.
			map = arg.getParameter("records", SqlResultMap.class);
		}
		ParamToJson trans = new ParamToJson();
		if(!arg.getParamText("invc_numb").equals("")){
			data.param
				.table("expt_nego_mast")
				.where("where invc_numb = :invc_numb")

				.unique("invc_numb"	, arg.getParameter("invc_numb"))

				.update("mney_unit"	, arg.getParameter("mney_unit"))
				.update("exrt"		, arg.getParameter("exrt"))
				.insert("invc_date"	, new SimpleDateFormat("yyyyMMdd").format(new Date()) )  /*  생성일시  */

				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */

			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}

		if(map.size()>0){				// 없으면 detail은 수정x
			for (SqlResultRow row:map) {
				String json;
				json = trans.TranslateRow(arg,row, "expt_nego_item_json_fields");

				data.param
					.table("expt_nego_item")
					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("orig_invc_numb"	, row.getParameter("ordr_numb"))
					.update("orig_seqn"			, row.getParameter("line_seqn"))
					.update("orig_amnd_degr"	, row.getParameter("amnd_degr"))
					.update("json_data"			, json)


					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
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
				data.attach(Action.modify);
				data.execute();
				data.clear();
				;
			}
		}
		return null;
	}

	public SqlResultMap setOrder(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
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
			.query("call auto_order_copy (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	public SqlResultMap getOrder(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(cofm_yorn, 0) as cofm_yorn					")
		;
		data.param
			.where("from  expt_ordr_mast a 										")
			.where("where 1 = 1													")
			.where("and   a.invc_numb = :invc_numb",arg.fixParameter("invc_numb"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select   a.invc_numb        , a.amnd_degr       , a.line_seqn        , a.item_idcd	")
		.query("       , a.unit_idcd        , a.qntt            , a.exch_pric        , a.crte_urif	")
		.query("       , a.exch_amnt        , a.krwn_pric       , a.krwn_amnt        , a.deli_date	")
		.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
		.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
		.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
		.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
		.query("       , a.crte_idcd        , i.item_code       , i.item_name        , i.item_spec	")
		.query("       , i.unit_idcd        														")
	;
	data.param
		.where("from expt_offr_item a 													")
		.where("left outer join item_mast i on a.item_idcd = i.item_idcd				")
		.where("left outer join unit_mast u on u.unit_idcd = a.unit_idcd				")
		.where("left outer join expt_offr_mast d on a.invc_numb = d.invc_numb			")
		.where("where 1 = 1																")
		.where("and   a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
		.where("and   a.amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr"))
		.where("and   a.amnd_degr = :line_seqn"    , arg.getParamText("line_seqn"))
	;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

}
