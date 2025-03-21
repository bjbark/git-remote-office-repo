package com.sky.system.custom.sjflv.mtrl.imp.ordermast2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
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


@Service("sjflv.imp.OrderMast2Service")
public class OrderMast2Service  extends DefaultServiceHandler {
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
			.query("select *																								")
		;
		data.param
			.where("from (																												")
			.where("select   z.bzpl_name        , b.bzpl_idcd       , b.incm_dvcd        , b.cstm_idcd 									")
			.where("       , b.invc_date as ordr_date               , a.invc_numb as ordr_numb											")
			.where("       , a.item_idcd        , i.item_name       , t.cstm_name as buyr												")
			.where("       , cast(json_unquote(json_extract(a.json_data,'$.each_qntt') ) as decimal) as each_qntt        , b.vldt		")
			.where("       , cast(json_unquote(json_extract(a.json_data,'$.pckg_size') ) as decimal(10,5)) as pckg_size  , b.cofm_date	")
			.where("       , cast(json_unquote(json_extract(a.json_data,'$.pckg_size') ) as decimal) as pack_size    			    	")
			.where("       , cast(json_unquote(json_extract(a.json_data,'$.cmis_pric') ) as float)   as cmis_pric        , b.buyr_name	")
			.where("       , cast(json_unquote(json_extract(a.json_data,'$.cmis_amnt') ) as decimal) as cmis_amnt						")
			.where("       , cast(json_unquote(json_extract(a.json_data,'$.pfit_pric') ) as float) as pfit_pric						")
			.where("       , cast(json_unquote(json_extract(a.json_data,'$.pfit_amnt') ) as decimal) as pfit_amnt						")
			.where("       , cast(json_unquote(json_extract(b.json_data,'$.trns_exps') ) as char) as trns_exps							")
			.where("       , cast(json_unquote(json_extract(b.json_data,'$.insu_amnt') ) as char) as insu_amnt							")
			.where("       , a.qntt             , a.krwn_pric       , a.krwn_amnt        , b.ship_viaa_dvcd								")
			.where("       , b.etdd             , b.etaa            , c.invc_numb        , c.invc_date                   , b.ecdd		")
			.where("       , b.trde_trnt_dvcd   , a.exch_pric       , a.exch_amnt        , b.mdtn_prsn									")
			.where("       , b.drtr_idcd        , u.user_name as drtr_name               , b.pric_cond_dvcd								")
			.where("       , b.trde_stot_dvcd   , b.stot_time_dvcd  , b.stot_ddln        , b.mney_unit									")
			.where("       , b.exrt             , b.ship_port       , b.dsch_port        , b.offr_numb									")
			.where("       , b.arvl_port        , b.pckg_unit       , b.ogin_name        , a.line_seqn									")
			.where("       , b.paym_yorn        , b.paym_date       , b.paym_numb        , b.paym_memo									")
			.where("       , td.dlvy_drtr_name as mdtn_name         , a.amnd_degr        , b.cofm_yorn									")
			.where("       , cs.cstm_name as reqt_cstm_name         , b.paym_send_ddln	 , a.deli_date													")

			.where("       , b.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
			.where("       , a.line_ordr        , a.line_stat       , b.line_clos        , a.find_name	")
			.where("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
			.where("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
			.where("       , a.crte_idcd        , a.crte_urif											")
		;
		data.param
			.where("from ( select invc_numb,max(amnd_degr) as amnd_degr						")
			.where("       from impt_ordr_mast  											")
			.where("       where  1=1 														")
			.where("       and    bzpl_idcd = :bzpl_idcd"     , arg.getParamText("bzpl_idcd"))
			.where("       and    invc_numb like :invc_numb% ", arg.getParamText("invc_numb"))
			.where("       and    invc_date >= :invc_date1"   , arg.getParamText("invc_date1"))
			.where("       and    invc_date <= :invc_date2"   , arg.getParamText("invc_date2"))
			.where("       and    incm_dvcd = :incm_dvcd"     , arg.getParamText("incm_dvcd" ))
			.where("       and    drtr_idcd = :drtr_idcd"     , arg.getParamText("drtr_idcd" ))
			.where("       and    cstm_idcd = :cstm_idcd"     , arg.getParamText("cstm_idcd" ))
			.where("       and    mdtn_prsn = :mdtn_prsn"     , arg.getParamText("mdtn_prsn" ))
			.where("       and    line_clos = :line_clos"     , arg.getParamText("line_clos" ))
			.where("       and    line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("       and    find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("       group by invc_numb")
			.where(") cbin ")
			.where("left outer join impt_ordr_item a on cbin.invc_numb = a.invc_numb and cbin.amnd_degr = a.amnd_degr	")
			.where("left outer join impt_ordr_mast b on a.invc_numb = b.invc_numb and  a.amnd_degr = b.amnd_degr		")
			.where("left outer join impt_invc_item d on a.invc_numb = d.orig_invc_numb		")
			.where("left outer join impt_invc_mast c on d.invc_numb = c.invc_numb			")
			.where("left outer join bzpl_mast      z on b.bzpl_idcd = z.bzpl_idcd			")
			.where("left outer join item_mast      i on i.item_idcd = a.item_idcd			")
			.where("left outer join user_mast      u on b.drtr_idcd = u.user_idcd			")
			.where("left outer join cstm_mast      t on b.cstm_idcd = t.cstm_idcd			")
			.where("left outer join cstm_mast      cs on b.reqt_cstm_idcd = cs.cstm_idcd	")
			.where("left outer join cstm_deli      td on b.mdtn_prsn = td.dlvy_cstm_idcd	")
			.where("where a.invc_numb is not null											")
			.where("order by b.invc_numb desc												")
			.where(") a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  a.invc_numb       , a.amnd_degr       , a.invc_date        , a.bzpl_idcd		")
			.query("      , a.cstm_idcd       , a.offr_numb       , a.incm_dvcd        , a.mngt_numb		")
			.query("      , a.ship_viaa_dvcd  , a.buyr_name       , a.mdtn_prsn        , a.drtr_idcd		")
			.query("      , a.pric_cond_dvcd  , a.trde_stot_dvcd  , a.stot_time_dvcd   , a.stot_ddln		")
			.query("      , a.mney_unit       , a.exrt            , a.ship_port        , a.etdd				")
			.query("      , a.dsch_port       , a.etaa            , a.arvl_port        , a.pckg_unit		")
			.query("      , a.ogin_name       , a.vldt            , a.trde_trnt_dvcd   , a.orig_invc_numb	")
			.query("      , a.orig_amnd_degr  , a.dsct_yorn       , a.paym_yorn        , a.paym_date		")
			.query("      , a.paym_numb       , a.paym_memo       , a.bl_yorn          , a.bl_numb			")
			.query("      , a.bl_date         , a.entr_yorn       , a.entr_numb        , a.entr_date		")
			.query("      , a.cofm_date       , c.cstm_name as buyr	                   , z.bzpl_name		")
			.query("      , td.dely_cstm_name as mdtn_name        , a.cofm_yorn        , a.ship_memo		")
			.query("       , cs.cstm_name as reqt_cstm_name       , u.user_name as drtr_name				")
			.query("       , cast(json_unquote(json_extract(a.json_data,'$.trns_exps') ) as char) as trns_exps	")
			.query("       , cast(json_unquote(json_extract(a.json_data,'$.insu_amnt') ) as char) as insu_amnt	")
			.query("       , a.reqt_cstm_idcd																")

			.query("      , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl		")
			.query("      , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name		")
			.query("      , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd		")
			.query("      , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm		")
			.query("      , a.crte_idcd        , a.crte_urif												")
		;
		data.param
			.where("from impt_ordr_mast a ")
			.where("left outer join bzpl_mast      z on a.bzpl_idcd = z.bzpl_idcd				")
			.where("left outer join cstm_mast      c on c.cstm_idcd = a.cstm_idcd				")
			.where("left outer join cstm_mast      cs on a.reqt_cstm_idcd = cs.cstm_idcd		")
			.where("left outer join cstm_deli      td on a.mdtn_prsn = td.dlvy_cstm_idcd		")
			.where("left outer join user_mast      u  on a.drtr_idcd = u.user_idcd				")
			.where("where 1 = 1																	")
			.where("and   a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
			.where("and   a.amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr"))
			.where("and   a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select   a.invc_numb        , a.amnd_degr         , a.line_seqn						")
				.query("       , a.item_idcd        , i.item_name         , a.item_hscd						")
				.query("       , a.unit_idcd        , a.exch_pric         , a.exch_amnt						")
				.query("       , cast(json_unquote(json_extract(a.json_data,'$.each_qntt') ) as decimal) as each_qntt        , b.vldt		")
				.query("       , cast(json_unquote(json_extract(a.json_data,'$.pckg_size') ) as decimal) as pckg_size        , b.cofm_date	")
				.query("       , cast(json_unquote(json_extract(a.json_data,'$.pckg_size') ) as decimal) as pack_qntt				     	")
				.query("       , a.qntt             , a.krwn_pric       , a.krwn_amnt						")
				.query("       , i.item_code        , u.unit_name       , i.item_spec						")


				.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
				.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
				.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
				.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
				.query("       , a.crte_idcd        , a.crte_urif		, a.deli_date						")
			;
			data.param
				.where("from impt_ordr_item a ")
				.where("left outer join impt_ordr_mast b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr		")
				.where("left outer join impt_invc_item d on a.invc_numb = d.orig_invc_numb and a.amnd_degr = d.orig_amnd_degr and a.line_seqn = d.orig_seqn")
				.where("left outer join impt_invc_mast c on d.invc_numb = c.invc_numb		")
				.where("left outer join bzpl_mast      z on b.bzpl_idcd = z.bzpl_idcd		")
				.where("left outer join item_mast      i on i.item_idcd = a.item_idcd		")
				.where("left outer join unit_mast      u on a.unit_idcd = u.unit_idcd		")
				.where("where 1 = 1															")
				.where("and   a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
				.where("and   a.amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getSply(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.invc_numb        , a.amnd_degr         , a.line_seqn						")
			.query("       , a.item_idcd        , i.item_name         , a.item_hscd						")
			.query("       , a.unit_idcd        , a.exch_pric         , a.exch_amnt						")
			.query("       , cast(json_unquote(json_extract(a.json_data,'$.each_qntt') ) as decimal) as each_qntt         , b.vldt		")
			.query("       , cast(json_unquote(json_extract(a.json_data,'$.pckg_size') ) as decimal) as pckg_size         , b.cofm_date	")
			.query("       , cast(json_unquote(json_extract(a.json_data,'$.cmis_pric') ) as float )  as cmis_pric						")
			.query("       , cast(json_unquote(json_extract(a.json_data,'$.cmis_amnt') ) as decimal) as cmis_amnt						")
			.query("       , cast(json_unquote(json_extract(a.json_data,'$.pfit_pric') ) as float ) as pfit_pric						")
			.query("       , cast(json_unquote(json_extract(a.json_data,'$.pfit_amnt') ) as decimal) as pfit_amnt						")
			.query("       , a.qntt             , a.krwn_pric       , a.krwn_amnt						")
			.query("       , i.item_code        , u.unit_name       , i.item_spec						")
			.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
			.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
			.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
			.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
			.query("       , a.crte_idcd        , a.crte_urif											")
		;
		data.param
			.where("from impt_ordr_item a ")
			.where("left outer join impt_ordr_mast b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr		")
			.where("left outer join impt_invc_item d on a.invc_numb = d.orig_invc_numb and a.amnd_degr = d.orig_amnd_degr and a.line_seqn = d.orig_seqn")
			.where("left outer join impt_invc_mast c on d.invc_numb = c.invc_numb		")
			.where("left outer join bzpl_mast      z on b.bzpl_idcd = z.bzpl_idcd		")
			.where("left outer join item_mast      i on i.item_idcd = a.item_idcd		")
			.where("left outer join unit_mast      u on a.unit_idcd = u.unit_idcd		")
			.where("where 1 = 1															")
			.where("and   a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
			.where("and   a.amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr"))

		;
		return data.selectForMap(sort) ;
	}


	//invoice master 등록/수정/삭제
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);


		for (SqlResultRow row:map) {
			//확정된 수입 Oder는 수정할 수 업도록 조치
			//String cofm_yorn = (String)row.getParameter("cofm_yorn");
			//if ("1".equals(cofm_yorn)) {
			//	throw new ServiceException("확정된 Order는 저장할 수 없습니다." );
			//}

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("impt_ordr_mast")
					.where("where invc_numb = :invc_numb")
					.where("and   amnd_degr = :amnd_degr")

					.unique("invc_numb", row.fixParameter("invc_numb"))
					.unique("amnd_degr", row.fixParameter("amnd_degr"))

					.update("line_stat", 2)

					.update("updt_ipad", row.getParameter("updt_ipad"))
					.update("updt_dttm", row.getParameter("updt_dttm"))
					.update("updt_idcd", row.getParameter("updt_idcd"))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			} else {
				ParamToJson trans = new ParamToJson();
				String json;

				json = trans.TranslateRow(arg,row, "impt_ordr_mast_json_fields");
				// master 등록/수정
				data.param
					.table("impt_ordr_mast"												)
					.where("where invc_numb = :invc_numb								")
					.where("and   amnd_degr = :amnd_degr								")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					//
					.update("invc_date"			, row.getParameter("invc_date"			))
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))
					.update("offr_numb"			, row.getParameter("offr_numb"			))
					.update("incm_dvcd"			, row.getParameter("incm_dvcd"			))
					.update("mngt_numb"			, row.getParameter("mngt_numb"			))
					.update("ship_viaa_dvcd"	, row.getParameter("ship_viaa_dvcd"		))
					.update("buyr_name"			, row.getParameter("buyr_name"			))
					.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"			))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))
					.update("pric_cond_dvcd"	, row.getParameter("pric_cond_dvcd"		))
					.update("trde_stot_dvcd"	, row.getParameter("trde_stot_dvcd"		))
					.update("stot_time_dvcd"	, row.getParameter("stot_time_dvcd"		))
					.update("stot_ddln"			, row.getParameter("stot_ddln"			))
					.update("mney_unit"			, row.getParameter("mney_unit"			))
					.update("exrt"				, row.getParameter("exrt"				))
					.update("ship_port"			, row.getParameter("ship_port"			))
					.update("etdd"				, row.getParameter("etdd"				))
					.update("dsch_port"			, row.getParameter("dsch_port"			))
					.update("etaa"				, row.getParameter("etaa"				))
					.update("arvl_port"			, row.getParameter("arvl_port"			))
					.update("pckg_unit"			, row.getParameter("pckg_unit"			))
					.update("ogin_name"			, row.getParameter("ogin_name"			))
					.update("vldt"				, row.getParameter("vldt"				))
					.update("trde_trnt_dvcd"	, row.getParameter("trde_trnt_dvcd"		))
					.update("dsct_yorn"			, row.getParameter("dsct_yorn"			))
					.update("paym_yorn"			, row.getParameter("paym_yorn"			))
					.update("paym_date"			, row.getParameter("paym_date"			))
					.update("paym_numb"			, row.getParameter("paym_numb"			))
					.update("paym_memo"			, row.getParameter("paym_memo"			))
					.update("bl_yorn"			, row.getParameter("bl_yorn"			))
					.update("bl_numb"			, row.getParameter("bl_numb"			))
					.update("bl_date"			, row.getParameter("bl_date"			))
					.update("entr_yorn"			, row.getParameter("entr_yorn"			))
					.update("entr_numb"			, row.getParameter("entr_numb"			))
					.update("entr_date"			, row.getParameter("entr_date"			))
					.update("cofm_date"			, row.getParameter("cofm_date"			))
					.update("reqt_cstm_idcd"	, row.getParameter("reqt_cstm_idcd"		))
					.update("ship_memo"			, row.getParameter("ship_memo"			))
					.update("json_data"			, json)

					.update("user_memo"			, row.getParameter("user_memo"			))
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))
					.update("line_levl"			, row.getParameter("line_levl"			))
					.update("line_ordr"			, row.getParameter("line_ordr"			))
					.update("line_stat"			, row.getParameter("line_stat"			))
					.update("line_clos"			, row.getParameter("line_clos"			))
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ row.getParamText("invc_numb"			).trim()
												+ row.getParamText("item_name"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.update("updt_urif"			, row.getParameter("updt_urif"			))
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.insert("crte_urif"			, row.getParameter("crte_urif"			))
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				String invc_numb2 = row.getParamText("offr_numb");

				data.param
					.table("purc_ordr_mast"											)
					.where("where invc_numb = :invc_numb							")	//invoice번호

					.unique("invc_numb"			, invc_numb2						)

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
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
					.table("impt_ordr_item"													)
					.where("where invc_numb		= :invc_numb							")
					.where("and   amnd_degr		= :amnd_degr							")
					.where("and   line_seqn		= :line_seqn							")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			} else {
				ParamToJson trans = new ParamToJson();
				String json;

				json = trans.TranslateRow(arg,row, "impt_ordr_item_json_fields");
				// detail 등록/수정
				data.param
					.table("impt_ordr_item"										)
					.where("where invc_numb		= :invc_numb					")
					.where("and   amnd_degr		= :amnd_degr					")
					.where("and   line_seqn		= :line_seqn					")
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					//
					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("item_hscd"			, row.getParameter("item_hscd"))
					.update("mker_name"			, row.getParameter("mker_name"))
					.update("unit_idcd"			, row.getParameter("unit_idcd"))
					.update("qntt"				, row.getParameter("qntt"	))
					.update("exch_pric"			, row.getParameter("exch_pric"))
					.update("exch_amnt"			, row.getParameter("exch_amnt"))
					.update("krwn_pric"			, row.getParameter("krwn_pric"))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"))
					.update("deli_date"			, row.getParameter("deli_date"))
					.update("ship_schd_date"	, row.getParameter("ship_schd_date"))
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"))
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"))
					.update("dlvy_date"			, row.getParameter("dlvy_date"))
					.update("dlvy_time"			, row.getParameter("dlvy_time"))
					.update("orig_seqn"			, row.getParameter("orig_seqn"))
					.update("trnt_exps"			, row.getParameter("trnt_exps"))
					.update("extr_exps"			, row.getParameter("extr_exps"))
					.update("sett_amnt"			, row.getParameter("sett_amnt"))
					.update("sett_pric"			, row.getParameter("sett_pric"))
					.update("json_data"			, json)

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


				// 구매발주관리 수정
				String invc_numb2 = mst.getParamText("offr_numb");

				String packQntt = (String)row.getParameter("pckg_size");
				String eachQntt = (String)row.getParameter("each_qntt");

				String json2 = "{\"each_qntt\":\"" + eachQntt + "\" , \"pack_qntt\":\"" + packQntt + "\"}";

				data.param
					.table("purc_ordr_item"											)
					.where("where invc_numb = :invc_numb							")		//invoice번호
					.where("and   line_seqn = :line_seqn							")

					.unique("invc_numb"			, invc_numb2						)
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("amnd_degr"			, row.getParameter("amnd_degr"		))
					.update("item_idcd"			, row.getParameter("item_idcd"		))
					.update("item_spec"			, row.getParameter("item_spec"		))
					.update("unit_idcd"			, row.getParameter("unit_idcd"		))
					.update("offr_qntt"			, row.getParameter("qntt"		))
//					.update("vatx_rate"			, row.getParameter("vatx_rate"		))
					.update("offr_pric"			, row.getParameter("exch_pric"		))
					.update("offr_amnt"			, row.getParameter("exch_amnt"		))
//					.update("offr_vatx"			, row.getParameter("offr_vatx"		))
					.update("ttsm_amnt"			, row.getParameter("exch_amnt"		))
//					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))
					.update("deli_date"			, row.getParameter("deli_date"		))
					.update("json_data"			, json2)
//					.update("prnt_idcd"			, mst.getParameter("remk_text"		))
					.update("user_memo"			, row.getParameter("user_memo"		))

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.update("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
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
			//
			.unique("orig_invc_numb"	, arg.fixParameter("orig_invc_numb"	))

			.update("invc_numb"			, arg.fixParameter("invc_numb"	))
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
	public SqlResultMap setPayment(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("impt_ordr_mast"													)
			.where("where invc_numb = :invc_numb								")
			.where("and   amnd_degr = :amnd_degr								")
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"	))

			.update("paym_yorn"			, "1","on".equals(arg.getParamText("paym_yorn")))
			.update("paym_date"			, arg.getParameter("paym_date"	))
			.update("paym_numb"			, arg.getParameter("paym_numb"	))
			.update("paym_memo"			, arg.getParameter("paym_memo"	))
			.update("paym_send_ddln"	, arg.getParameter("paym_send_ddln"	))


			.update("user_memo"			, arg.getParameter("user_memo"			))
			.update("sysm_memo"			, arg.getParameter("sysm_memo"			))
			.update("prnt_idcd"			, arg.getParameter("prnt_idcd"			))
			.update("line_levl"			, arg.getParameter("line_levl"			))
			.update("line_ordr"			, arg.getParameter("line_ordr"			))
			.update("line_stat"			, arg.getParameter("line_stat"			))
			.update("line_clos"			, arg.getParameter("line_clos"			))

			.update("updt_user_name"	, arg.getParameter("updt_user_name"		))
			.update("updt_ipad"			, arg.getParameter("updt_ipad"			))
			.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
			.update("updt_urif"			, arg.getParameter("updt_urif"			))
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		return null;
	}
	public SqlResultMap setConfirm(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			data.param
				.table("impt_ordr_mast"													)
				.where("where invc_numb = :invc_numb								")
				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"	))

				.update("cofm_date"			, arg.getParameter("cofm_date"	))
				.update("cofm_yorn"			, "1")


				.update("updt_user_name"	, arg.getParameter("updt_user_name"		))
				.update("updt_ipad"			, arg.getParameter("updt_ipad"			))
				.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
				.update("updt_urif"			, arg.getParameter("updt_urif"			))
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.query("call auto_purc_ordr_update(")
				.query("    :invc_numb",row.fixParameter("invc_numb"))
				.query("  , :crte_idcd",arg.fixParameter("updt_idcd"))
				.query(")")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}

		return null;
	}

	public SqlResultMap setConfirmCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
//		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String invc_numb = (String)arg.fixParameter("invc_numb");
		String invc_numb2 = invc_numb.substring(Math.max(0, invc_numb.length() - 12));
		String invc_numb3 = invc_numb.substring(Math.max(0, invc_numb.length() - 12));

		data.param
			.table("impt_ordr_mast"													)
			.where("where invc_numb = :invc_numb								")
			//
			.unique("invc_numb"			, invc_numb)

			.update("cofm_date"			, "")
			.update("cofm_yorn"			, "0")

			.update("updt_user_name"	, arg.getParameter("updt_user_name"		))
			.update("updt_ipad"			, arg.getParameter("updt_ipad"			))
			.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
			.update("updt_urif"			, arg.getParameter("updt_urif"			))
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("purc_ordr_mast"													)
			.where("where invc_numb = :invc_numb								")
			.where("and   amnd_degr = :amnd_degr								")
			//
			.unique("invc_numb"			, invc_numb2)
			.unique("amnd_degr"			, "0")
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("purc_ordr_item"													)
			.where("where invc_numb = :invc_numb								")
			.where("and   orig_amnd_degr = :amnd_degr							")

			//
			.unique("invc_numb"			, invc_numb3)
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setDate(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);


		for (SqlResultRow row:map) {
			data.param
				.table("impt_ordr_mast"													)
				.where("where invc_numb = :invc_numb								")
				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"	))

				.update("etdd"				, arg.getParameter("etdd"	))
				.update("etaa"				, arg.getParameter("etaa"	))
				.update("ecdd"				, arg.getParameter("ecdd"	))


				.update("updt_user_name"	, arg.getParameter("updt_user_name"		))
				.update("updt_ipad"			, arg.getParameter("updt_ipad"			))
				.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
				.update("updt_urif"			, arg.getParameter("updt_urif"			))
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}

		return null;
	}

	public SqlResultMap setSply(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = new SqlResultMap();

		if(!arg.getParamText("records").equals("")){					// invoice형태의 popup이라 2번 호출하며 없을 경우를 위해 체크.
			map = arg.getParameter("records", SqlResultMap.class);
		}
		ParamToJson trans = new ParamToJson();

			for (SqlResultRow row:map) {
				String json;
				json = trans.TranslateRow(arg,row, "impt_ordr_item_json_fields");

				data.param
					.table("impt_ordr_item")
					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("json_data"			, json)

				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
				;
			}
		return null;
	}

	public SqlResultMap setDeleteMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if(rowaction == Action.delete){
				data.param
					.table("impt_ordr_mast"													)
					.where("where invc_numb = :invc_numb								")
					.where("and   amnd_degr = :amnd_degr								")
					//
					.unique("invc_numb"			, row.fixParameter("ordr_numb"	))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"	))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
				data.param
					.table("impt_ordr_item"													)
					.where("where invc_numb = :invc_numb								")
					.where("and   amnd_degr = :amnd_degr								")

					//
					.unique("invc_numb"			, row.fixParameter("ordr_numb"	))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"	))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}
		}

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
	public SqlResultMap getPaymMemo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select case when count(*) = 0 then 													")
			.query("            concat('Bank name : ', '\n', 											")
			.query("                   'Bank address : ')		 										")
			.query("            else concat('Bank name : ', a.bank_name, '\n', 							")
			.query("                       'Bank address : ', a.addr_name, '\n', 						")
			.query("                       replace(a.user_memo, '|', \"\n\"), '\n') 					")
			.query("       end as paym_memo 															")
		;
		data.param
		    .where(" from cstm_bank a ")
		    .where("where 1 = 1 ")
		    .where("  and a.cstm_idcd = :cstm_idcd ", arg.getParamText("cstm_idcd"))
		    .where("  and a.rpst_acct_yorn = '1' ")
		;
		return data.selectForMap();
	}
}