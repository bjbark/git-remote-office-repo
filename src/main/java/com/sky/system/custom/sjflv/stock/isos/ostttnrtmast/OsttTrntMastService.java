package com.sky.system.custom.sjflv.stock.isos.ostttnrtmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;
import com.sky.utils.StringUtil;


@Service("sjflvOsttTrntMastService")
public class OsttTrntMastService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																			 									")
		;
		data.param
			.where("from (																				 									")
			.where("select    a.invc_numb   	, a.dlvy_dinv_numb	, sm.invc_date	, sm.deli_date			, u.user_name as drtr_name		")
			.where("        , sm.cstm_idcd  	, c.cstm_name																				")
			.where("        , cast(json_value(sm.json_data, '$.dlvy_cstm_idcd') as char) as dlvy_cstm_idcd									")
			.where("        , cd.dely_cstm_name as dlvy_cstm_name																			")
			.where("        , cast(json_value(a.json_data,  '$.ostt_yorn') as char) as ostt_yorn											")
			.where("        , a.dlvy_mthd_dvcd	, a.hdco_idcd   	, h.hdco_name	, dlvy_exps				, a.dlvy_taxn_yorn				")
			.where("        , a.dlvy_memo																									")
			.where("        , (select group_concat(im.item_name separator ' / ') 															")
			.where("             from sale_ostt_item si 																					")
			.where("                  left outer join item_mast im on im.item_idcd = si.item_idcd											")
			.where("                  left outer join acpt_mast am on am.invc_numb = si.acpt_numb											")
			.where("            where si.invc_numb = sm.invc_numb																			")
			.where("              and cast(json_value(am.json_data, '$.prod_trst_dvcd') as char) > '2000' ) as ostt_item_list				")
			.where("        , a.dlvy_dinv_numb as ostt_numb																					")
			.where("from    hdli_dlvy_mast a																								")
			.where("        left outer join sale_ostt_mast sm on sm.invc_numb = a.dlvy_dinv_numb 											")
			.where("        left outer join sale_ostt_item si on si.invc_numb = sm.invc_numb 												")
			.where("        left outer join cstm_mast c on c.cstm_idcd = sm.cstm_idcd 														")
			.where("        left outer join cstm_deli cd on cd.dlvy_cstm_idcd = cast(json_value(sm.json_data, '$.dlvy_cstm_idcd') as char)	")
			.where("        left outer join user_mast u on u.user_idcd = sm.drtr_idcd 														")
			.where("        left outer join item_mast i on i.item_idcd = si.item_idcd														")
			.where("        left outer join hdco_mast h on h.hdco_idcd = a.hdco_idcd		 												")
			.where("where   1 = 1																											")
			.where("and     a.invc_regi_yorn = 1 																							")
			.where("and     cast(json_value(a.json_data, '$.ostt_yorn') as char) = '1' 														")
			.where("and     sm.invc_date >= :invc_date11		" , arg.getParamText("invc_date1"	 ))
			.where("and     sm.invc_date <= :invc_date12		" , arg.getParamText("invc_date2"	 ))
			.where("and     sm.deli_date >= :deli_date11		" , arg.getParamText("deli_date1"	 ))
			.where("and     sm.deli_date <= :deli_date12		" , arg.getParamText("deli_date2"	 ))
			.where("and     sm.cstm_idcd  = :cstm_idcd1			" , arg.getParamText("cstm_idcd"	 ))
			.where("and     si.item_idcd  = :item_idcd1			" , arg.getParamText("item_idcd"	 ))
			.where("and     si.lott_numb like %:lott_numb1%	 	" , arg.getParamText("lott_numb"	 ))
			.where("and     a.dlvy_mthd_dvcd = :dlvy_mthd_dvcd1 " , arg.getParamText("dlvy_mthd_dvcd"))
			.where("and     a.hdco_idcd	= :hdco_idcd			" , arg.getParamText("hdco_idcd"  	 ))
			.where("and     a.dlvy_memo  like %:dlvy_memo%		" , arg.getParamText("dlvy_memo"	 ))
			.where("and     a.find_name like %:find_name1%		" , arg.getParamText("find_name"	 ))
			.where("and     a.line_stat  < :line_stat1			" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("union																														")
			.where("select    a.invc_numb		, a.invc_numb as dlvy_diny_numb	, a.invc_date	, null as deli_date	, u.user_name as drtr_name	")
			.where("        , cast(json_value(a.json_data, '$.cstm_idcd') as char) as cstm_idcd 												")
			.where("        , c.cstm_name																										")
			.where("        , cast(json_value(a.json_data, '$.dlvy_cstm_idcd') as char) as dely_cstm_idcd 										")
			.where("        , cd.dely_cstm_name																									")
			.where("        , cast(json_value(a.json_data, '$.ostt_yorn') as char) as ostt_yorn													")
			.where("        , a.dlvy_mthd_dvcd	, a.hdco_idcd					, h.hdco_name	, dlvy_exps			, a.dlvy_taxn_yorn			")
			.where("        , a.dlvy_memo 																										")
			.where("        , null as ostt_item_list																							")
			.where("        , null as ostt_numb																							")
			.where("from    hdli_dlvy_mast a																									")
			.where("        left outer join cstm_mast c on c.cstm_idcd = cast(json_value(a.json_data, '$.cstm_idcd') as char)					")
			.where("        left outer join cstm_deli cd on cd.dlvy_cstm_idcd = cast(json_value(a.json_data, '$.dlvy_cstm_idcd') as char) 		")
			.where("        left outer join user_mast u on u.user_idcd = a.crte_idcd 															")
			.where("        left outer join hdco_mast h on h.hdco_idcd = a.hdco_idcd															")
			.where("where   1 = 1																												")
			.where("and     a.invc_regi_yorn = 1 																								")
			.where("and     cast(json_value(a.json_data, '$.ostt_yorn') as char) = '0' 															")
			.where("and     a.invc_date >= :invc_date21		 	" , arg.getParamText("invc_date1" 	 ))
			.where("and     a.invc_date <= :invc_date22			" , arg.getParamText("invc_date2"	 ))
			.where("and     cast(json_value(a.json_data, '$.cstm_idcd') as char) = :cstm_idcd2" , arg.getParamText("cstm_idcd"))
			.where("and     a.dlvy_mthd_dvcd = :dlvy_mthd_dvcd2	" , arg.getParamText("dlvy_mthd_dvcd"))
			.where("and     a.hdco_idcd = :hdco_idcd2 			" , arg.getParamText("hdco_idcd"	 ))
			.where("and     a.dlvy_memo  like %:dlvy_memo2%		" , arg.getParamText("dlvy_memo"  	 ))
			.where("and     a.find_name like %:find_name2%		" , arg.getParamText("find_name"  	 ))
			.where("and     a.line_stat  < :line_stat2			" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("group   by invc_numb																										")
			.where("order   by invc_date desc, ostt_yorn, dlvy_dinv_numb desc																	")
			.where(") a																															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																			 		")
		;
		data.param
			.where("from (																				 		")
			.where("select    a.invc_numb     , a.invc_date       , a.deli_date      , a.remk_text      		")
			.where("        , c.cstm_idcd     , c2.dlvy_cstm_idcd												")
			.where("        , c.cstm_name     , c2.dely_cstm_name as dlvy_cstm_name  , u.user_name as drtr_name	")
			.where("        , group_concat(i.item_name separator ' / ') as ostt_item_list						")
			.where("from sale_ostt_mast a																		")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cstm_deli c2 on replace(json_extract(a.json_data, '$.dlvy_cstm_idcd'),'\"','') = c2.dlvy_cstm_idcd	")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.invc_numb								")
			.where("left outer join acpt_mast am on am.invc_numb = s.acpt_numb									")
			.where("left outer join item_mast i on s.item_idcd = i.item_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     s.item_idcd  = :item_idcd        "  , arg.getParamText("item_idcd"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     s.acpt_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     a.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("and     cast(json_value(am.json_data, '$.prod_trst_dvcd') as char) > '2000'					")
			.where("group by a.invc_numb																		")
			.where("order by a.invc_numb desc																	")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb         , a.line_seqn      , a.acpt_numb        , a.item_idcd			")
			.query("        , a.sale_unit        , a.norm_sale_pric , a.sale_stnd_pric   , a.sale_pric			")
			.query("        , a.ostt_qntt        , a.vatx_incl_yorn , a.vatx_rate        , a.sale_amnt			")
			.query("        , a.vatx_amnt        , a.ttsm_amnt      , a.deli_date        , a.dlvy_date			")
			.query("        , a.dlvy_hhmm        , a.stnd_unit      , a.stnd_unit_qntt   , a.wrhs_idcd			")
			.query("        , a.dlvy_cstm_idcd   , a.dsct_yorn      , a.ostt_dvcd        , a.insp_dvcd			")
			.query("        , a.insp_date        , a.pcod_numb      , a.sale_date        , a.sale_invc_numb		")
			.query("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif      , a.lott_numb        , i.item_code			")
			.query("        , i.item_name        , i.item_spec      , i.modl_name        , w.wrhs_name			")
			.query("        , a.orig_invc_numb   , a.orig_seqn      , a.acpt_seqn								")
		;
		data.param
			.where("from sale_ostt_item a																		")
			.where("left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.where("left outer join wrhs_mast w  on a.wrhs_idcd = w.wrhs_idcd									")
			.where("left outer join acpt_mast am on am.invc_numb = a.acpt_numb									")
			.where("where   1=1																					")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     cast(json_value(am.json_data, '$.prod_trst_dvcd') as char) > '2000'					")
			.where("order by a.line_seqn																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// 송장엑셀업로드 자료 삭제
	public void delExcelUpload(HttpRequestArgument arg, String invc_date) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("hdli_dlvy_mast							")
			.where("where invc_date		= :invc_date		")   //invoice번호
			.where("and   invc_regi_yorn= :invc_regi_yorn	")   //배송사용여부

			.unique("invc_date"			, invc_date		 	 )   //invoice번호
			.unique("invc_regi_yorn"	, "0"		 	 	 )   //invoice등록여부
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		return;
	}

	// 송장엑셀업로드 자료 등록
	public void setExcelUpload(HttpRequestArgument arg, SqlResultRow item ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String dlvy_dinv_numb	= item.getParamText("dlvy_dinv_numb");
		String dlvy_qntt		= item.getParamText("dlvy_qntt").replaceAll(",", "");
		String dlvy_exps		= item.getParamText("dlvy_exps").replaceAll(",", "");

		if (!StringUtils.isEmpty(dlvy_dinv_numb)) {
			data.param
				.table("hdli_dlvy_mast												")
				.where("where invc_numb		= :invc_numb							")	//invoice번호

				.unique("invc_numb"			, item.fixParameter("invc_numb"			))	//invoice번호

				.insert("invc_date"			, item.getParameter("invc_date"			))	//invoice일자
				.insert("dlvy_dinv_numb"	, dlvy_dinv_numb						 )	//배송송장번호
				.insert("dlvy_rcpt_hmlf"	, item.getParameter("dlvy_rcpt_hmlf"	))	//배송수신인명
				.insert("dlvy_tele_numb"	, item.getParameter("dlvy_tele_numb"	))	//배송전화번호
				.insert("dlvy_hdph_numb"	, item.getParameter("dlvy_hdph_numb"	))	//배송휴대폰번호
				.insert("dlvy_addr_1fst"	, item.getParameter("dlvy_addr_1fst"	))	//배송주소1
				.insert("dlvy_addr_2snd"	, item.getParameter("dlvy_addr_2snd"	))	//배송주소1
				.insert("dlvy_qntt"			, dlvy_qntt								 )	//배송수량
				.insert("dlvy_exps"			, dlvy_exps								 )	//배송비용
				.insert("dlvy_brch_name"	, item.getParameter("dlvy_brch_name"	))	//배송지점
				.insert("hdli_dinv_qntt"	, item.getParameter("hdli_dinv_qntt"	))	//택배송장수량
				.insert("dlvy_memo"			, item.getParameter("dlvy_memo"			))	//비고
				.insert("invc_regi_yorn"	, "0"									 )	//배송사용여부

				.insert("updt_idcd"			, arg.getParamText("lgin_idcd"))
				.insert("crte_idcd"			, arg.getParamText("lgin_idcd"))
				.insert("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.insert("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}

		return;
	}

	// 택배비용등록
	public SqlResultMap setTrntCost(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String json_data = "{\"ostt_yorn\":\"" 			+ arg.getParameter("ostt_yorn") 			+ "\","
						 + "\"cstm_idcd\":\"" 			+ arg.getParameter("cstm_idcd") 			+ "\","
						 + "\"dlvy_cstm_idcd\":\"" 		+ arg.getParameter("dlvy_cstm_idcd") 		+ "\""
						 + "}";

		if (StringUtil.isEmpty(arg.getParamText("invc_numb"))) {
			data.param
				.query("call fn_seq_gen_v2 (				")
				.query("   :STOR "   	, arg.store			)  // 본사코드
				.query(" , :table "  	, "hdli_dlvy_mast"	)  // 테이블명
				.query(" , :invc_numb " , "not defined"		)  // Invoice 번호
				.query(" ) 									")
			;
			String invc_numb = (String)data.selectForMap().get(0).get("seq");
			data.clear();

			data.param
				.table("hdli_dlvy_mast"						 )
				.where("where invc_numb		= :invc_numb	")  /*  INVOICE번호  */

				.unique("invc_numb"			, invc_numb)

				.insert("invc_date"			, arg.getParameter("invc_date"))
				.insert("dlvy_dinv_numb"	, arg.getParameter("dlvy_dinv_numb"))
				.insert("dlvy_mthd_dvcd"	, arg.getParameter("dlvy_mthd_dvcd"))
				.insert("hdco_idcd"			, arg.getParameter("hdco_idcd"))
				.insert("dlvy_exps"			, arg.getParameter("dlvy_exps"))
				.insert("dlvy_taxn_yorn"	, arg.getParameter("dlvy_taxn_yorn"))
				.insert("dlvy_memo"			, arg.getParameter("dlvy_memo"))
				.insert("invc_regi_yorn"	, "1")
				.insert("json_data"			, json_data)
				.insert("crte_idcd"			, arg.login)
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
		} else {
			data.param
				.table("hdli_dlvy_mast"						 )
				.where("where invc_numb		= :invc_numb	")  /*  INVOICE번호  */

				.unique("invc_numb"			, arg.fixParameter("invc_numb"))

				.update("invc_date"			, arg.getParameter("invc_date"))
				.update("dlvy_dinv_numb"	, arg.getParameter("dlvy_dinv_numb"))
				.update("dlvy_mthd_dvcd"	, arg.getParameter("dlvy_mthd_dvcd"))
				.update("hdco_idcd"			, arg.getParameter("hdco_idcd"))
				.update("dlvy_exps"			, arg.getParameter("dlvy_exps"))
				.update("dlvy_taxn_yorn"	, arg.getParameter("dlvy_taxn_yorn"))
				.update("dlvy_memo"			, arg.getParameter("dlvy_memo"))
				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.ostt_yorn','$.cstm_idcd','$.dlvy_cstm_idcd'), '" + json_data + "')")
				.update("updt_idcd"			, arg.login)
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.update);
		}

		data.execute();

		return null ;
	}

	// 택배비용등록
	public SqlResultMap delTrntCost(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("hdli_dlvy_mast"						 )
			.where("where invc_numb		= :invc_numb	")  /*  INVOICE번호  */

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))

			.update("line_stat"			, "2")
			.update("updt_idcd"			, arg.login)
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.update);
		data.execute();

		return null;
	}
}