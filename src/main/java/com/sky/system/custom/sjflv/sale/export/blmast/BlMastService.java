package com.sky.system.custom.sjflv.sale.export.blmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

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


@Service("sjflv.export.BlMastService")
public class BlMastService extends DefaultServiceHandler{
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getMaster1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select																							")
			.query("		  a.invc_numb      , a.invc_date       , a.bzpl_idcd         , a.mngt_numb				")
			.query("		, a.expt_dvcd      , a.buyr_name       , a.mdtn_prsn         , a.pric_cond_dvcd			")
			.query("		, a.drtr_idcd      , a.trde_stot_dvcd  , a.stot_time_dvcd    , a.mney_unit				")
			.query("		, a.exrt           , a.nego_amnt       , a.krwn_nego_amnt    							")
			.query("																								")
		;
		data.param
			.where("from	 expt_bl_mast	a																		")
			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}


//조회2
		public SqlResultMap getDetail1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize  " )
			;
		data.param
		.query("select																								")
		.query("		  b.invc_numb      , b.line_seqn       , b.item_idcd         , b.item_hscd					")
		.query("		, b.unit_idcd      , b.exch_pric       , b.qntt              , b.krwn_amnt					")
		.query("		, b.krwn_pric      , b.exch_amnt       , b.orig_amnd_degr	 , i.item_idcd					")
		.query("		, i.item_code      , i.item_name       , i.item_spec		 , i.item_leng					")
		;
		data.param
			.where("from	 expt_bl_item	b																		")
			.where("left outer join item_mast i on b.item_idcd = i.item_idcd										")
		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

//조회3
		public SqlResultMap getWorkerLister(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize 																	")
			;
			data.param
			.query("select																							")
			.query("		  c.bzpl_idcd      , c.invc_numb            , c.amnd_degr         , c.expt_dvcd			")
			.query("		, c.mngt_numb      , c.ship_viaa_dvcd       , c.buyr_name         , c.mdtn_prsn			")
			.query("		, c.drtr_idcd      , c.pric_cond_dvcd       , c.trde_stot_dvcd    , c.stot_time_dvcd	")
			.query("		, c.stot_ddln      , c.mney_unit            , c.exrt			  , c.cstm_pcod_numb 	")
			.query("		, c.invc_numb																			")


			;
			data.param
			.where("from	 expt_ordr_mast		c																	")


		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
		//조회4
		public SqlResultMap getWorkerDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize  " )
			;
		data.param
		.query("select																								")
		.query("		  d.invc_numb		, d.item_hscd		, d.item_idcd 			, d.unit_idcd				")
		.query("		, d.qntt			, d.exch_pric		, d.exch_amnt			, d.krwn_pric				")
		.query("		, d.krwn_amnt  		, d.user_memo 		, d.dlvy_date 			,d.amnd_degr				")
		.query("		, d.dlvy_cstm_idcd  , d.find_name		, d.line_seqn			, c.amnd_degr				")
		.query("		, d.line_stat		, d.line_clos 		, d.find_name 			, c.invc_numb				")


		;
		data.param
			.where("	from expt_ordr_item d																		")
			.where("left outer join expt_ordr_mast c on d.invc_numb = c.invc_numb									")
			.where("where     d.invc_numb	=:invc_numb		" , arg.fixParamText("invc_numb"))
			.where("and     d.line_stat      < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by  d.line_seqn desc															")



		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

		public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");
			data.param
				.query("select  a.invc_numb        , a.amnd_degr       , a.invc_date         , a.bzpl_idcd				")
				.query("      , a.cstm_idcd        , a.expt_dvcd       , a.mngt_numb         , a.cstm_pcod_numb			")
				.query("      , a.ship_viaa_dvcd   , a.buyr_name       , a.mdtn_prsn         , a.drtr_idcd				")
				.query("      , a.pric_cond_dvcd   , a.trde_stot_dvcd  , a.stot_time_dvcd    , a.stot_ddln				")
				.query("      , a.mney_unit        , a.exrt            , a.ship_port         , a.etdd					")
				.query("      , a.dsch_port        , a.etaa            , a.arvl_port         , a.ostt_schd_date			")
				.query("      , a.pckg_unit        , a.ogin_name       , a.vldt              , a.orig_invc_numb			")
				.query("      , a.orig_amnd_degr   , a.dsct_yorn       , z.bzpl_name         , u.user_name as drtr_name	")
				.query("      , cast(json_unquote(json_extract(a.json_data,'$.expt_lcal_name'))as char)as expt_lcal_name")
				.query("      , c.cstm_name        , a.trde_trnt_dvcd												   	")

				.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl				")
				.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name				")
				.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
				.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
				.query("       , a.crte_idcd        , a.crte_urif														")
			;
			data.param
				.where("from expt_ordr_mast a ")
				.where("left outer join bzpl_mast      z on a.bzpl_idcd = z.bzpl_idcd									")
				.where("left outer join user_mast      u on u.user_idcd = a.drtr_idcd									")
				.where("left outer join cstm_mast      c on c.cstm_idcd = a.cstm_idcd									")

				.where("where 1 = 1																						")
				.where("and   a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
				.where("and   a.amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr"))
				.where("and   a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			;
			SqlResultMap info = data.selectForMap();

			if (info.size() >=1) {
				data.clear();
				data.param
					.query("select   a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd					")
					.query("       , a.item_hscd      , a.unit_idcd      , a.qntt           , a.exch_pric					")
					.query("       , a.exch_amnt      , a.krwn_pric      , a.krwn_amnt      , a.deli_date					")
					.query("       , a.ostt_wrhs_idcd , a.dlvy_cstm_idcd , a.dlvy_date      , a.dlvy_time					")
					.query("       , a.orig_seqn      , i.item_name      , u.unit_name      , i.item_spec					")
					.query("       , cast(json_unquote(json_extract(a.json_data,'$.hala_yorn') ) as decimal) as hala_yorn	")
					.query("       , cast(json_unquote(json_extract(a.json_data,'$.pckg_size') ) as char) as pckg_size		")
					.query("       , i.item_code      , a.remk_text															")

					.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl				")
					.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name				")
					.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
					.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
					.query("       , a.crte_idcd        , a.crte_urif														")
				;
				data.param
					.where("from expt_ordr_item a 																			")
					.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
					.where("left outer join unit_mast u on u.unit_idcd = a.unit_idcd										")
					.where("where 1 = 1																						")
					.where("and   a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
					.where("and   a.amnd_degr = :amnd_degr"    , arg.getParamText("amnd_degr"))
				;
				info.get(0).put("product", data.selectForMap());
				return info;
			}
			return info;
		}



		public SqlResultMap setInvoice(HttpRequestArgument arg, DataMessage data2, SqlResultRow row2, SqlResultMap sqlResultMap) throws Exception {
			DataMessage data = arg.newStorage("POS");
			SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

			ParamToJson trans = new ParamToJson();
			String json;

			for (SqlResultRow row:map) {
				Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				if (rowaction == Action.delete) {
					data.param
						.table("expt_ordr_mast")
						.where("where invc_numb = :invc_numb")

						.unique("invc_numb", row.fixParameter("invc_numb"))

						.update("line_stat", 2)

						.update("updt_ipad", row.getParameter("updt_ipad"))
						.update("updt_dttm", row.getParameter("updt_dttm"))
						.update("updt_idcd", row.getParameter("updt_idcd"))
					;
					data.attach(Action.update);
					data.execute();
				} else {
					// master 등록/수정
					json = trans.TranslateRow(arg,row, "expt_ordr_mast_json_fields");

					data.param
						.table("expt_ordr_mast"												 )
						.where("where invc_numb = :invc_numb								")
						//
						.unique("invc_numb"			, row.fixParameter("invc_numb"			))
						//
						.update("amnd_degr"			, row.fixParameter("amnd_degr"))
						.update("invc_date"			, row.fixParameter("invc_date"))
						.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
						.update("expt_dvcd"			, row.getParameter("expt_dvcd"))
						.update("mngt_numb"			, row.getParameter("mngt_numb"))
						.update("cstm_pcod_numb"	, row.getParameter("cstm_pcod_numb"))
						.update("ship_viaa_dvcd"	, row.getParameter("ship_viaa_dvcd"))
						//.update("buyr_name"			, row.getParameter("buyr_name"))
						.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"))
						.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
						.update("pric_cond_dvcd"	, row.getParameter("pric_cond_dvcd"))
						.update("trde_stot_dvcd"	, row.getParameter("trde_stot_dvcd"))
						.update("trde_trnt_dvcd"	, row.getParameter("trde_trnt_dvcd"))
						.update("stot_time_dvcd"	, row.getParameter("stot_time_dvcd"))
						.update("stot_ddln"			, row.getParameter("stot_ddln"))
						.update("mney_unit"			, row.getParameter("mney_unit"))
						.update("exrt"				, row.getParameter("exrt"))
						.update("ship_port"			, row.getParameter("ship_port"))
						.update("etdd"				, row.getParameter("etdd"))
						.update("dsch_port"			, row.getParameter("dsch_port"))
						.update("etaa"				, row.getParameter("etaa"))
						.update("arvl_port"			, row.getParameter("arvl_port"))
						.update("ostt_schd_date"	, row.getParameter("ostt_schd_date"))
						.update("pckg_unit"			, row.getParameter("pckg_unit"))
						.update("ogin_name"			, row.getParameter("ogin_name"))
						.update("vldt"				, row.getParameter("vldt"))
						.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"))
						.update("orig_amnd_degr"	, row.getParameter("orig_amnd_degr"))
						.update("dsct_yorn"			, row.getParameter("dsct_yorn"))
						.update("json_data"			, json)


						.update("user_memo"			, row.getParameter("user_memo"			))
						.update("sysm_memo"			, row.getParameter("sysm_memo"			))
						.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))
						.update("line_levl"			, row.getParameter("line_levl"			))
						.update("line_ordr"			, row.getParameter("line_ordr"			))
						.update("line_stat"			, row.getParameter("line_stat"			))
						.update("line_clos"			, row.getParameter("line_clos"			))
						.update("find_name"			, row.getParamText("invc_numb"			).trim()
													+ ' '
													+ row.getParamText("expt_lcal_name"		).trim()
													+ ' '
													+ row.getParamText("cstm_name"			).trim())
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


					if(row.getParameter("product", SqlResultMap.class) != null) {
						setInvoice(arg, data, row, row.getParameter("product", SqlResultMap.class));
					}
				}
			}
			data.execute();
			return null;
		}


		public Object setInvoiceDetail(HttpRequestArgument argument) {
			// TODO Auto-generated method stub
			return null;
		}

}
