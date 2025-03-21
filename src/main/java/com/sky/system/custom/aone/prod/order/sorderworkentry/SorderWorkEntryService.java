package com.sky.system.custom.aone.prod.order.sorderworkentry;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;


@Service("aone.order.SorderWorkEntryService")
public class SorderWorkEntryService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequance;

	//마스터 조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize																	")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.query("from (																							")
			.query("	select  a.invc_numb       , a.amnd_degr       , a.acpt_dvcd       , a.invc_date				")
			.query("		,   a.cstm_idcd       , a.deli_date as deli_date2             , a.acpt_stat_dvcd		")
			.query("		,   a.memo            , a.prnt_idcd														")
			.query("		,   b.invc_qntt       , b.remk_text       , b.line_seqn									")
			.query("		,   json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd						")
			.query("		,   json_value(b.json_data,'$.pdod_date') as pdod_date									")
			.query("		,   json_value(b.json_data,'$.sral_numb') as sral_numb									")
			.query("		,   concat(date_format(json_value(b.json_data,'$.plan_strt_date' ), '%Y-%m-%d'), ' ~ ', date_format(json_value(b.json_data,'$.plan_endd_date'), '%Y-%m-%d')) as  plan_date ")
			.query("		,   c.cstm_name       , d.item_name       , d.item_spec									")
			.query("		,   f.work_strt_dttm  , f.work_endd_dttm  , f.need_time       , f.invc_numb as work_invc_numb	")
			.query("		,   g.user_name as prod_drtr_name														")
		;
		data.param
			.query("	from acpt_mast a																			")
			.query("		 left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr	")
			.query("		 left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd								")
			.query("		 left outer join item_mast d on b.item_idcd = d.item_idcd								")
			.query("		 left outer join work_book f on a.invc_numb = f.wkod_numb and a.amnd_degr = f.wkod_seqn	")
			.query("		 left outer join user_mast g on g.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')")
		;
		data.param
			.query("	where 1 = 1																					")
			.query("	and   ifnull(a.ordr_dvcd,0) != '4000'														")
			.query("	and   a.acpt_stat_dvcd IN ('2000', '3000', '6000')											")
			.query("	and   a.line_clos  = '0'																	")
			.query("	and   a.find_name   like %:find_name%     " , arg.getParamText("find_name" ))
			.query("	and   a.invc_date      >= :invc1_date     " , arg.getParamText("invc1_date"))
			.query("	and   a.invc_date      <= :invc2_date     " , arg.getParamText("invc2_date"))
			.query("	and   a.acpt_stat_dvcd  = :acpt_stat_dvcd " , arg.getParamText("acpt_stat_dvcd" ))
			.query("	and   a.acpt_dvcd       = :acpt_dvcd      " , arg.getParamText("acpt_dvcd" ))
			.query("	and   a.cstm_idcd       = :cstm_idcd      " , arg.getParamText("cstm_idcd" ))
			.query("	and   b.item_idcd       = :item_idcd      " , arg.getParamText("item_idcd" ))
			.query("	and   json_value(b.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd " , arg.getParamText("repa_stat_dvcd"))
			.query("	and   json_value(b.json_data,'$.prod_drtr_idcd')  = :prod_drtr_idcd " , arg.getParamText("prod_drtr_idcd"))
			.query("	and   json_value(b.json_data,'$.prod_drtr_idcd')  = :drtr_idcd      " , arg.getParamText("drtr_idcd"))
			.query("	and   json_value(b.json_data,'$.sral_numb')   like %:sral_numb%     " , arg.getParamText("sral_numb"))
			.query("	and   a.line_stat       < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("	order by a.invc_numb desc, a.amnd_degr desc limit 99999999									")
			.query(") a																								")
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
			.query("select a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date		")
			.query("	,  a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb		")
			.query("	,  a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date		")
			.query("	,  a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd								")
			.query("	,  a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn	")
			.query("	,  a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo				")
			.query("	,  a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd	")
			.query("	,  a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl		")
			.query("	,  a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name		")
			.query("	,  a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd		")
			.query("	,  a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm		")
			.query("	,  a.crte_idcd       , a.crte_urif													")
			.query("	,  c.cstm_code       , c.cstm_name       , d.user_name as drtr_name					")
			.query("	,  w.wrhs_code       , w.wrhs_name													")
			.query("	,  i.item_idcd																		")
		;
		data.param
			.query("from   acpt_mast a																		")
			.query("	   left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd						")
			.query("	   left outer join user_mast d  on a.drtr_idcd = d.user_idcd						")
			.query("	   left outer join wrhs_mast w  on a.ostt_wrhs_idcd = w.wrhs_idcd					")
			.query("	   left outer join acpt_item i on a.invc_numb = i.invc_numb							")
			.query("where  1=1																				")
			.query("and    a.ordr_dvcd != '4000'															")
			.query("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name" ))
			.query("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.query("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.query("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.query("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.query("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.query("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.query("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("group by a.invc_numb																	")
			.query("order by a.invc_numb																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
			.query("	,  a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      , a.optn_psbl_yorn	")
			.query("	,  a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_qntt		")
			.query("	,  a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt		")
			.query("	,  a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
			.query("	,  a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      , a.dlvy_date		")
			.query("	,  a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
			.query("	,  a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
			.query("	,  a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("	,  a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("	,  a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.query("	,  a.cstm_lott_numb , s.item_imge      , s.item_imge2											")
			.query("	,  b.item_code      , b.item_name      , b.item_spec      , u.unit_name							")
			.query("	,  a.deli_date as 'deli_date2'																	")
			.query("	,  json_value(a.json_data,'$.pdod_date') as pdod_date											")
			.query("	,  json_value(a.json_data,'$.plan_strt_dttm') as plan_strt_dttm2								")
			.query("	,  json_value(a.json_data,'$.plan_endd_dttm') as plan_endd_dttm2								")
			.query("	,  substr(json_value(a.json_data,'$.plan_strt_dttm'),1,8) as plan_strt_dttm						")
			.query("	,  substr(json_value(a.json_data,'$.plan_endd_dttm'),1,8) as plan_endd_dttm						")
			.query("	,  json_value(a.json_data,'$.plan_strt_date')as plan_strt_date									")
			.query("	,  json_value(a.json_data,'$.plan_endd_date')as plan_endd_date									")
			.query("	,  json_value(a.json_data,'$.work_cont') as work_cont											")
			.query("	,  json_value(a.json_data,'$.mtrl_spdt') as mtrl_spdt											")
			.query("	,  concat(json_value(a.json_data,'$.plan_strt_date'),' ', '~' ,' ', json_value(a.json_data,'$.plan_endd_date'), ' ' ) as plan_dttm	")
		;
		data.param
			.query("from   acpt_item a																					")
			.query("	   left outer join item_mast b on a.item_idcd = b.item_idcd										")
			.query("	   left outer join unit_mast u on b.unit_idcd = u.unit_idcd										")
			.query("	   left outer join item_adon i on a.item_idcd = i.item_idcd										")
			.query("	   left outer join item_desc d on d.item_idcd = b.item_idcd										")
			.query("	   left outer join work_book s on a.item_idcd = s.item_idcd										")
			.query("where  1=1																							")
			.query("and    a.invc_numb    =:invc_numb		" , 				arg.getParamText("invc_numb" ))
			.query("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("group by a.invc_numb , a.line_seqn																	")
			.query("order by a.line_seqn																				")
		;
		return data.selectForMap();
	}

	//실적보고 내용 조회
	public SqlResultMap getWorkBook(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.where("select a.invc_numb as acpt_numb      , a.amnd_degr as acpt_degr    , a.acpt_dvcd					")
			.where("	 , DATE_FORMAT(json_value(b.json_data,'$.plan_strt_date' ), '%Y-%m-%d') as  plan_strt_date		")
			.where("	 , DATE_FORMAT(json_value(b.json_data,'$.plan_endd_date' ), '%Y-%m-%d') as  plan_endd_date		")
			.where("	 , json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd									")
			.where("	 , c.item_imge   , c.item_imge2  , c.invc_date                 , c.need_time					")
			.where("	 , DATE_FORMAT(substr(c.work_strt_dttm,1,8), '%Y-%m-%d') as work_strt_date						")
			.where("	 , DATE_FORMAT(substr(c.work_endd_dttm,1,8), '%Y-%m-%d') as work_endd_date						")
			.where("	 , TIME_FORMAT(str_to_date(c.work_strt_dttm,'%Y%m%d%H%i'), '%H:%i') as work_strt_time			")
			.where("	 , TIME_FORMAT(str_to_date(c.work_endd_dttm,'%Y%m%d%H%i'), '%H:%i') as work_endd_time			")
			.where("	 , json_value(c.json_data,'$.prog_rate') as prog_rate											")
			.where("	 , c.user_memo   , c.wker_idcd																	")
			.where("	 , f.user_name as wker_name																		")
			.where("from   acpt_mast a																					")
			.where("	   left outer join acpt_item b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr		")
			.where("	   left outer join work_book c on c.wkod_numb = b.invc_numb and c.wkod_seqn = b.amnd_degr		")
			.where("	   left outer join user_mast f on c.wker_idcd = f.user_idcd										")
			.where("where  1 = 1																						")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.amnd_degr	=:amnd_degr		" , arg.getParamText("amnd_degr"))
		;
		return data.selectForMap();
	}
	//실적보고 작업내역 조회
		public SqlResultMap getWorkBookMans(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
			DataMessage data = arg.newStorage("POS");

			data.param
					.where("select b.line_seqn   , b.invc_numb  , b.drtr_idcd	, b.invc_date										")
					.where("	 , b.need_time	 , b.work_sttm	,f.user_name	, b.work_edtm										")
					.where("	 , f.user_name as wker_name																			")
					.where("from   work_book a																						")
					.where("	   left outer join work_book_mans b on a.invc_numb = b.invc_numb									")
					.where("	   left outer join acpt_item c on a.wkod_numb = c.invc_numb and a.wkod_seqn = c.amnd_degr			")
					.where("	   left outer join user_mast f on b.drtr_idcd = f.user_idcd											")
					.where("	   left outer join acpt_mast g on a.invc_numb = g.invc_numb											")
					.where("	 , (select @rownum := 0) tmp																		")
					.where("where  1=1																								")
					.where("and    b.line_seqn > 0																					")
					.where("and    a.invc_numb	=:work_invc_numb		" , arg.getParamText("work_invc_numb"))
					.where("group by b.line_seqn																					")
				;
			//}
			return data.selectForMap();
		}



	//실적보고 자재사용내역 조회
	public SqlResultMap getWorkBookMtrl(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		/*if(Double.parseDouble(arg.getParamText("esti_list")) == 2){
			data.param
				.where("select a.*, (a.qntt * a.pric) as amnt																	")
				.where("from (																									")
				.where("	select    a.invc_numb    , a.amnd_degr , a.cstm_idcd    , a.acpt_dvcd								")
				.where("			, b.acpt_stat_dvcd																			")
				.where("			, concat(date_format(json_value(b.json_data,'$.plan_strt_date' ), '%Y-%m-%d'), ' ~ ', date_format(json_value(b.json_data,'$.plan_endd_date'), '%Y-%m-%d')) as  plan_date ")
				.where("			, c.cstm_name																	 			")
				.where("			, e.item_name    , e.item_idcd , e.item_spec    , e.qntt									")
				.where("			, d2.item_code   , f.stok_qntt																")
				.where("			, e.pric	 																				")
				.where("			, '" + arg.getParamText("work_invc_numb") + "' as work_invc_numb							")
				.where("			, @rownum := @rownum + 1 as line_seqn														")
				.where("	from   acpt_mast a																					")
				.where("		left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr			")
				.where("		left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
				.where("		left outer join item_mast d on b.item_idcd = d.item_idcd										")
				.where("		left outer join esti_mtrl e on a.invc_numb = e.invc_numb and a.amnd_degr = e.amnd_degr 			")
				.where("		left outer join item_mast d2 on d2.item_idcd = e.item_idcd										")
				.where("		left outer join stok_mast f on f.item_idcd = e.item_idcd										")
				.where("		left outer join purc_istt_item pi on pi.item_idcd = e.item_idcd									")
				.where("		, (select @rownum := 0) tmp										")
				.where("	where  1=1																							")
				.where("	and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
				.where("	and    a.amnd_degr	=:amnd_degr		" , arg.getParamText("amnd_degr"))
				.where("	group by e.item_idcd																				")
				.where(") a																										")
			;
		}else{*/
			data.param
				.where("select b.line_seqn  , b.need_qntt as qntt   , a.invc_numb as work_invc_numb								")
				.where("	 , b.item_idcd  , a.invc_date   , e.stok_qntt	, g.drtr_idcd										")
				.where("	 , a.item_imge  , a.item_imge2  , a.user_memo   , a.wker_idcd										")
				.where("	 , json_value(b.json_data,'$.pric') as pric															")
				.where("	 , json_value(b.json_data,'$.amnt') as amnt															")
				.where("	 , json_value(c.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd										")
				.where("	 , json_value(b.json_data,'$.zone_idcd') as zone_idcd												")
				.where("	 , json_value(b.json_data,'$.wrhs_idcd') as wrhs_idcd												")
				.where("	 , d.item_code   , d.item_name   , d.item_spec	, f.user_name as wker_name							")
				.where("	 , h.zone_name   , i.wrhs_name																		")
				.where("from   work_book a																						")
				.where("	   left outer join work_book_mtrl b on a.invc_numb = b.invc_numb									")
				.where("	   left outer join acpt_item c on a.wkod_numb = c.invc_numb and a.wkod_seqn = c.amnd_degr			")
				.where("	   left outer join item_mast d on b.item_idcd = d.item_idcd											")
				.where("	   left outer join stok_mast e on b.item_idcd = e.item_idcd											")
				.where("	   left outer join purc_istt_item pi on b.item_idcd = pi.item_idcd									")
				.where("	   left outer join user_mast f on a.wker_idcd = f.user_idcd											")
				.where("	   left outer join acpt_mast g on a.invc_numb = g.invc_numb											")
				.where("	   left outer join wrhs_zone h on json_value(b.json_data,'$.zone_idcd') = h.zone_idcd				")
				.where("	   left outer join wrhs_mast i on json_value(b.json_data,'$.wrhs_idcd') = i.wrhs_idcd				")
				.where("	 , (select @rownum := 0) tmp																		")
				.where("where  1=1																								")
				.where("and    a.invc_numb	=:work_invc_numb		" , arg.getParamText("work_invc_numb"))
				.where("and    b.line_seqn > 0																					")
				.where("group by b.line_seqn																					")
			;
		//}
		return data.selectForMap();
	}

	//수리 이미지 불러오기
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select item_imge, item_imge2 		")
			.where("from  work_book						")
			.where("where 1=1							")
			.where("and  invc_numb = :work_invc_numb", arg.getParameter("work_invc_numb"))
		;
		return data.selectForMap();
	}

	//수리 작업내역 등록
		public SqlResultMap setPopupMans(HttpRequestArgument arg) throws Exception {

			DataMessage data = arg.newStorage("POS");

			for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
				Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

//				String invc_date = "";
//				if(row.getParamText("invc_date").length() == 8){
//					invc_date = row.getParamText("invc_date");
//				}else if(row.getParamText("invc_date").length()>8){
//					invc_date = new SimpleDateFormat("yyyyMMdd").format(new Date(row.getParamText("invc_date")));
//				};
//
//				String work_sttm = "";
//				if(row.getParamText("work_sttm").length() == 4){
//					work_sttm = row.getParamText("work_sttm");
//				}else if(row.getParamText("work_sttm").length()>4){
//					work_sttm = new SimpleDateFormat("HHmm").format(new Date(row.getParamText("work_sttm")));
//				};
//
//				String work_edtm = "";
//				if(row.getParamText("work_edtm").length() == 4){
//					work_edtm = row.getParamText("work_edtm");
//				}else if(row.getParamText("work_edtm").length()>4){
//					work_edtm = new SimpleDateFormat("HHmm").format(new Date(row.getParamText("work_edtm")));
//				};

				if (rowaction == Action.delete) {
					data.param
						.table("work_book_mans												")
						.where("where invc_numb		= :invc_numb							")
						.where("and line_seqn		= :line_seqn							")

						.unique("invc_numb"			, row.fixParameter("invc_numb"		))	//INVOICE번호
						.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();

				} else {
					data.param
						.table("work_book_mans												")
						.where("where invc_numb		= :invc_numb							")
						.where("and line_seqn		= :line_seqn							")

						.unique("invc_numb"			, row.fixParameter("invc_numb"		))	//INVOICE번호
						.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번

						.update("work_pcnt_dvcd"	, row.getParameter("work_pcnt_dvcd"		))	//작업인원구분코드
						.update("invc_date"			, row.getParameter("invc_date"			))	//INVOICE일자
						.update("work_sttm"			, row.getParameter("work_sttm"			))	//작업시작시간
						.update("work_edtm"			, row.getParameter("work_edtm"			))	//작업종료시간
						.update("need_time"			, row.getParameter("need_time"			))	//소요시간
						.update("work_pcnt"			, row.getParameter("work_pcnt"			))	//작업인원
						.update("work_mnhr"			, row.getParameter("work_mnhr"			))	//작업공수
						.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))	//담당자ID
						.update("remk_text"			, row.getParameter("remk_text"			))	//비고
						.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
						.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번

				 		.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
						.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
						.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
						.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
						.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
						.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
						.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
						.update("find_name"			, row.getParamText("item_idcd"			).trim())
						.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
						.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
						.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
						.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
						.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
						.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
						.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();
				}
				data.execute();
				data.clear();
			}
			return null ;
		}

	//수리  자재사용내역 등록
	public SqlResultMap setPopupMtrl(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("work_book_mtrl												")
					.where("where invc_numb		= :invc_numb							")
					.where("and line_seqn		= :line_seqn							")

					.unique("invc_numb"			, row.fixParameter("work_invc_numb"		))	//INVOICE번호
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

			} else {

				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row,"work_book_mtrl_json_fields");

				data.param
					.table("work_book_mtrl												")
					.where("where invc_numb		= :invc_numb							")
					.where("and line_seqn		= :line_seqn							")

					.unique("invc_numb"			, row.fixParameter("work_invc_numb"		))	//INVOICE번호
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번

					.update("item_idcd"			, row.getParameter("item_idcd"			))	//품목ID
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))	//단위ID
					.update("need_qntt"			, row.getParameter("qntt"				))	//소요수량
					.update("ivst_qntt"			, row.getParameter("ivst_qntt"			))	//투입수량
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))	//기준단위수량
					.update("lott_numb"			, row.getParameter("lott_numb"			))	//LOT번호
					.update("remk_text"			, row.getParameter("remk_text"			))	//비고
					.update("lott_mngt_yorn"	, row.getParameter("lott_mngt_yorn"		))	//LOT관리여부
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번
					.update("json_data"			, json_data								)

			 		.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"			, row.getParamText("item_idcd"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
			data.execute();
			data.clear();
		}
		return null ;
	}

	//수리작업보고 work_book 저장
	public SqlResultMap setPopupReport(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

//			//시작시간 종료시간 계산
//			String work_strt_dttm = arg.getParamText("work_strt_dttm");
//			String work_endd_dttm = arg.getParamText("work_endd_dttm");
//			String strt_date="";
//			String strt_time="";
//			String endd_date="";
//			String endd_time="";
////			if(arg.getParamText("work_strt_dttm").length() <20){
////				work_strt_dttm = arg.getParamText("work_strt_dttm");
////			}else if(arg.getParamText("work_strt_dttm").length()==50){	 //시간만 바꿧을때 20230502Tue Jan 01 2008 10:00:00 GMT+0900 (한국 표준시)
////				strt_date=work_strt_dttm.substring(0,8);
////				strt_time=new SimpleDateFormat("HHmm").format(new Date(work_strt_dttm.substring(8,50)));
////				work_strt_dttm=strt_date+strt_time;
////			}else if(arg.getParamText("work_strt_dttm").length()==46){ 	//날짜만 바꿨을때  Tue Jan 01 2008 10:00:00 GMT+0900 (한국 표준시)0900
////				strt_date=new SimpleDateFormat("yyyyMMdd").format(new Date(work_strt_dttm.substring(4,15)));
////				strt_time=work_strt_dttm.substring(42,46);
////				work_strt_dttm=strt_date+strt_time;
////			}else{
////				strt_date=new SimpleDateFormat("yyyyMMdd").format(new Date(work_strt_dttm.substring(4,15)));
////				strt_time=new SimpleDateFormat("HHmm").format(new Date(work_strt_dttm.substring(42,84)));
////				work_strt_dttm=strt_date+strt_time;
////			};
////			if(arg.getParamText("work_endd_dttm").length() <20){
////				work_endd_dttm = arg.getParamText("work_endd_dttm");
////			}else if(arg.getParamText("work_endd_dttm").length()==50){ 	//시간한개만 바꿨을때 20230502Tue Jan 01 2008 10:00:00 GMT+0900 (한국 표준시)
////				endd_date=work_endd_dttm.substring(0,8);
////				endd_time=new SimpleDateFormat("HHmm").format(new Date(work_endd_dttm.substring(8,50)));
////				work_endd_dttm=endd_date+endd_time;
////			}else if(arg.getParamText("work_endd_dttm").length()==46){ 	//날짜만 바꿨을때	Tue Jan 01 2008 10:00:00 GMT+0900 (한국 표준시)0900
////				endd_date=new SimpleDateFormat("yyyyMMdd").format(new Date(work_endd_dttm.substring(4,15)));
////				endd_time=work_endd_dttm.substring(42,46);
////				work_endd_dttm=endd_date+endd_time;
////			}else{
////				endd_date=new SimpleDateFormat("yyyyMMdd").format(new Date(work_endd_dttm.substring(4,15)));
////				endd_time=new SimpleDateFormat("HHmm").format(new Date(work_endd_dttm.substring(42,84)));
////				work_endd_dttm=endd_date+endd_time;
////			};
//
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				ParamToJson trans = new ParamToJson();
				String json_data = trans.Translate(arg, "work_book_json_fields");


				data.param
					.table("work_book													")
					.where("where invc_numb		= :invc_numb							")

					.unique("invc_numb"			, arg.fixParameter("work_invc_numb"			))	//INVOICE번호

					.update("invc_date"			, arg.getParameter("invc_date"			))	//INVOICE일자
					.update("bzpl_idcd"			, arg.getParameter("bzpl_idcd"			))	//사업장ID
					.update("prod_dept_idcd"	, arg.getParameter("prod_dept_idcd"		))	//생산부서ID
					.update("cstm_idcd"			, arg.getParameter("cstm_idcd"			))	//거래처ID
					.update("wkfw_idcd"			, arg.getParameter("wkfw_idcd"			))	//공정흐름ID
					.update("wkct_idcd"			, arg.getParameter("wkct_idcd"			))	//공정ID
					.update("cvic_idcd"			, arg.getParameter("cvic_idcd"			))	//설비ID
					.update("mold_idcd"			, arg.getParameter("mold_idcd"			))	//금형ID
					.update("item_idcd"			, arg.getParameter("item_idcd"			))	//품목ID
					.update("mtrl_bacd"			, arg.getParameter("mtrl_bacd"			))	//재질분류코드
					.update("cavity"			, arg.getParameter("cavity"				))	//cavity
					.update("pdsd_numb"			, arg.getParameter("pdsd_numb"			))	//생산계획번호
					.update("wkod_numb"			, arg.getParameter("acpt_numb"			))	//작업지시번호
					.update("wkod_seqn"			, arg.getParameter("acpt_degr"			))	//작업지시순번
					.update("dayn_dvcd"			, arg.getParameter("dayn_dvcd"			))	//주야구분코드
					.update("indn_qntt"			, arg.getParameter("indn_qntt"			))	//지시수량
					.update("prod_qntt"			, arg.getParameter("prod_qntt"			))	//생산수량
					.update("good_qntt"			, arg.getParameter("good_qntt"			))	//양품수량
					.update("poor_qntt"			, arg.getParameter("poor_qntt"			))	//불량수량
					.update("theo_qntt"			, arg.getParameter("theo_qntt"			))	//이론수량
					.update("succ_qntt"			, arg.getParameter("succ_qntt"			))	//인계수량
					.update("ostt_qntt"			, arg.getParameter("ostt_qntt"			))	//출고수량
					.update("stok_qntt"			, arg.getParameter("stok_qntt"			))	//재고수량
					.update("indn_qntt_1fst"	, arg.getParameter("indn_qntt_1fst"		))	//지시수량1
					.update("prod_qntt_1fst"	, arg.getParameter("prod_qntt_1fst"		))	//생산수량1
					.update("good_qntt_1fst"	, arg.getParameter("good_qntt_1fst"		))	//양품수량1
					.update("poor_qntt_1fst"	, arg.getParameter("poor_qntt_1fst"		))	//불량수량1
					.update("succ_qntt_1fst"	, arg.getParameter("succ_qntt_1fst"		))	//인계수량1
					.update("ostt_qntt_1fst"	, arg.getParameter("ostt_qntt_1fst"		))	//출고수량1
					.update("stok_qntt_1fst"	, arg.getParameter("stok_qntt_1fst"		))	//재고수량1
					.update("work_strt_dttm"	, arg.getParameter("work_strt_dttm"		))	//작업시작일시
					.update("work_endd_dttm"	, arg.getParameter("work_endd_dttm"		))	//작업종료일시
					.update("need_time"			, arg.getParameter("need_time"			))	//소요시간
					.update("work_mnhr"			, arg.getParameter("work_mnhr"			))	//작업공수
					.update("cycl_time"			, arg.getParameter("cycl_time"			))	//회전시간
					.update("wker_idcd"			, arg.getParameter("wker_idcd"			))	//작업자ID
					.update("work_pcnt"			, arg.getParameter("work_pcnt"			))	//작업인원
					.update("lott_numb"			, arg.getParameter("lott_numb"			))	//LOT번호
					.update("rewd_objt_qntt"	, arg.getParameter("rewd_objt_qntt"		))	//재생대상수량
					.update("work_cond_1fst"	, arg.getParameter("work_cond_1fst"		))	//작업조건1
					.update("work_cond_2snd"	, arg.getParameter("work_cond_2snd"		))	//작업조건2
					.update("work_cond_3trd"	, arg.getParameter("work_cond_3trd"		))	//작업조건3
					.update("work_cond_4frt"	, arg.getParameter("work_cond_4frt"		))	//작업조건4
					.update("work_cond_5fit"	, arg.getParameter("work_cond_5fit"		))	//작업조건5
					.update("work_cond_6six"	, arg.getParameter("work_cond_6six"		))	//작업조건6
					.update("work_cond_7svn"	, arg.getParameter("work_cond_7svn"		))	//작업조건7
					.update("stun_prod_qntt"	, arg.getParameter("stun_prod_qntt"		))	//기준단위생산수량
					.update("stun_good_qntt"	, arg.getParameter("stun_good_qntt"		))	//기준단위양품수량
					.update("stun_poor_qntt"	, arg.getParameter("stun_poor_qntt"		))	//기준단위불량수량
					.update("work_dvcd"			, arg.getParameter("work_dvcd"			))	//작업구분코드
					.update("wkct_insp_yorn"	, arg.getParameter("wkct_insp_yorn"		))	//공정검사여부
					.update("last_wkct_yorn"	, arg.getParameter("last_wkct_yorn"		))	//최종공정여부
					.update("work_para"			, arg.getParameter("work_para"			))	//작업조
					.update("mtrl_ivst_yorn"	, arg.getParameter("mtrl_ivst_yorn"		))	//자재투입여부
					.update("prog_stat_dvcd"	, arg.getParameter("prog_stat_dvcd"		))	//진행상태구분코드
					.update("dsct_resn_dvcd"	, arg.getParameter("dsct_resn_dvcd"		))	//중단사유구분코드
					.update("item_imge"			, arg.getParameter("item_imge"			))	//품목이미지
					.update("item_imge2"		, arg.getParameter("item_imge2"			))	//품목이미지2
					.update("json_data"			, json_data								)	//json data

//					.update("work_pcnt_dvcd"	, arg.getParameter("work_pcnt_dvcd"		))	//작업인원구분코드
//					.update("work_sttm"			, arg.getParameter("work_sttm"			))	//작업시작시간
//					.update("work_edtm"			, arg.getParameter("work_edtm"			))	//작업종료시간
//					.update("drtr_idcd"			, arg.getParameter("drtr_idcd"			))	//담당자ID
//					.update("remk_text"			, arg.getParameter("remk_text"			))	//비고
//					.update("uper_seqn"			, arg.getParameter("uper_seqn"			))	//상위순번
//					.update("disp_seqn"			, arg.getParameter("disp_seqn"			))	//표시순번

			 		.update("user_memo"			, arg.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"			, arg.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"			, arg.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"			, arg.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"			, arg.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"			, arg.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"			, arg.getParameter("line_clos"			))	//ROW마감
					.update("find_name"			, arg.getParamText("item_idcd"			).trim())
					.update("updt_user_name"	, arg.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, arg.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, arg.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, arg.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"	, arg.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"			, arg.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"			, arg.getParameter("crte_urif"			))	//생성UI
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast										")
					.where("where invc_numb		= :invc_numb				")
					.where("and   amnd_degr		= :amnd_degr				")

					.unique("invc_numb"			, arg.fixParameter("acpt_numb"))	//INVOICE번호
					.unique("amnd_degr"			, arg.fixParameter("acpt_degr"))	//차수

					.update("acpt_stat_dvcd"	, arg.getParameter("acpt_stat_dvcd"))	//제품상태

					.update("updt_user_name"	, arg.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, arg.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, arg.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, arg.getParameter("updt_urif"			))	//수정UI
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				json_data = trans.Translate(arg, "acpt_item_json_fields");

				data.param
					.table("acpt_item										")
					.where("where invc_numb		= :invc_numb				")
					.where("and   amnd_degr		= :amnd_degr				")

					.unique("invc_numb"			, arg.fixParameter("acpt_numb"))	//INVOICE번호
					.unique("amnd_degr"			, arg.fixParameter("acpt_degr"))	//차수

					.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.repa_stat_dvcd'), '" + json_data + "')")

					.update("updt_user_name"	, arg.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, arg.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, arg.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, arg.getParameter("updt_urif"			))	//수정UI
					;
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
			data.execute();
			data.clear();
		return null ;
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

	//최종차수 비교
	public SqlResultRow getOrderInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String wkod_numb = "";
		String wkod_seqn = "";

		if (arg.containsKey("wkod_numb")) {
			wkod_numb = (String)arg.getParameter("wkod_numb");
		} else if (arg.containsKey("records")) {
			wkod_numb = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("wkod_numb");
		}

		if (arg.containsKey("wkod_seqn")) {
			wkod_seqn = (String)arg.getParameter("wkod_seqn");
		} else if (arg.containsKey("records")) {
			wkod_seqn = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("wkod_seqn");
		}

		data.param
			.query("select line_clos, line_stat, acpt_stat_dvcd																											")
			.query("	 , (select max(amnd_degr) from acpt_mast where invc_numb = a.invc_numb) as max_amnd_degr 														")
			.query("	 , (select json_value(json_data,'$.repa_stat_dvcd') from acpt_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as repa_stat_dvcd ")
			.query("from  acpt_mast a							")
			.query("where a.invc_numb = :wkod_numb", wkod_numb)
			.query("and   a.amnd_degr = :wkod_seqn", wkod_seqn)
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
			System.out.println("***************file:"+file[i].getFileItem().getName());
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
					.query("update work_book					")
					.query("       set item_imge = ''			")

					.query("       where invc_numb = :work_invc_numb", arg.getParameter("work_invc_numb"))
				;data.attach();
				 data.execute();
				 data.clear();
			}else if(chk1.equals("1")){
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();

				data.param
					.table("work_book")
					.where("where invc_numb	= :invc_numb" )

					.unique("invc_numb"				, arg.getParameter("work_invc_numb"))

					.update("item_imge",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update  work_book					")
					.query("		set item_imge2 = ''			")
					.query("where   invc_numb = :work_invc_numb", arg.getParameter("work_invc_numb"))

				;data.attach();
				data.execute();
				data.clear();
			}else if(chk2.equals("1")){
				byte[] buf2 = new byte[1024];
				while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
					 baos2.write(buf2,0,readCount2);
				}
				returnByte2 = baos2.toByteArray();

				data.param
					.table("work_book")
					.where("where invc_numb	= :invc_numb" )

					.unique("invc_numb"				, arg.getParameter("work_invc_numb"))

					.update("item_imge2",returnByte2)
				;data.attach(Action.update);
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

	//처리이미지 불러오기
	public SqlResultMap getWorkBookInvcNumb(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select invc_numb												")
			.where("from  work_book													")
			.where("where 1=1														")
			.where("and   wkod_numb = :invc_numb",arg.getParameter("invc_numb"))
			.where("and   wkod_seqn = :amnd_degr",arg.getParameter("amnd_degr"))
		;
		return data.selectForMap();
	}

	//부품대기
	public SqlResultMap setWaitPats(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		ParamToJson trans = new ParamToJson();
		String json_data  = trans.Translate(arg, "acpt_item_json_fields");

		data.param
			.table("acpt_item										")
			.where("where invc_numb		= :invc_numb				")
			.where("and   amnd_degr		= :amnd_degr				")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))	//INVOICE번호
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"))	//차수
			.unique("line_seqn"			, arg.fixParameter("line_seqn"))	//

			.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.repa_stat_dvcd'), '" + json_data + "')")
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		data.param
			.table("acpt_mast										")
			.where("where invc_numb		= :invc_numb				")
			.where("and   amnd_degr		= :amnd_degr				")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))	//INVOICE번호
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"))	//차수

			.update("acpt_stat_dvcd"	, 2000)
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		return null;
	}

}