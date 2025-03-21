package com.sky.system.custom.iypkg.sale.order.sptsmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("iypkg.SptsMastService")
public class SptsMastService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.line_seqn       , b.cstm_idcd         , c.cstm_name						")
			.query("		, a.invc_date       , a.item_idcd       , b.prod_name         , b.acpt_qntt						")
			.query("		, b.item_leng       , b.item_widh       , b.item_hght         , a.trst_qntt						")
			.query("		, b.pcod_numb       , a.acpt_numb       , a.dlvy_cstm_idcd										")
			.query("		, json_value(c.json_data,'$.lcal_idcd' ) as lcal_idcd         , b.invc_date as acpt_date		")
//			.query("		, (select lcal_name from dely_lcal l where (json_value(c.json_data,'$.lcal_idcd')) = l.lcal_idcd) as lcal_name	")
			.query("		, ifnull(b.pqty_mxm2,0)*ifnull(b.mxm2_pric,0) as m2           , b.deli_date						")
			.query("		, c3.cars_alis as cars_name             , a.user_memo											")
			.query("		, json_value(a.json_data , '$**.lcal_name')        as lcal_name									")
			.query("		, json_value(a.json_data , '$**.dlvy_cstm_name')   as dlvy_cstm_name							")
			.where("from   ostt_plan a																						")
			.where("    left outer join (select invc_numb from boxx_acpt													")
			.where("                           where  1=1																	")
			.where("                           and    deli_date  >= :deli_date3		" , arg.getParamText("deli_date1"))
			.where("                           and    deli_date  <= :deli_date4		" , arg.getParamText("deli_date2"))
			.where("         ) boxx on a.acpt_numb = boxx.invc_numb															")
			.where("    left outer join boxx_acpt b on a.acpt_numb = b.invc_numb											")
			.where("    left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd											")
//			.where("    left outer join cstm_mast c2 on a.dlvy_cstm_idcd = c2.cstm_idcd										")
			.where("    left outer join car_mast  c3 on json_value(a.json_data,'$**.cars_idcd') = c3.cars_idcd				")
			.where("where  1=1																								")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.invc_date  >= :invc_date1				" , arg.getParamText("invc_date1"))
			.where("and    a.invc_date  <= :invc_date2				" , arg.getParamText("invc_date2"))
			.where("and    b.deli_date  >= :deli_date1				" , arg.getParamText("deli_date1"))
			.where("and    b.deli_date  <= :deli_date2				" , arg.getParamText("deli_date2"))
			.where("and    a.line_stat   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select    a.invc_numb       , a.invc_date       , a.cstm_idcd       , c.cstm_name					")
			.where("		, a.prod_idcd       , p.prod_name       , a.item_leng       , a.item_widh					")
			.where("		, a.item_hght       , a.acpt_qntt       , a.pcod_numb       , p.prod_code					")
			.where("		, (a.acpt_qntt - ifnull(s.trst_qntt,0)) as unostt											")
			.where("		, ifnull(s.trst_qntt,0) as ostt_qntt														")
			.where("		, a.deli_date       , a.assi_cstm_idcd  , c2.cstm_name as assi_cstm_name					")
			.where("		, json_value(c.json_data,'$.lcal_idcd' ) as lcal_idcd										")
			.where("		, (select lcal_name from dely_lcal l where (json_value(c.json_data,'$.lcal_idcd')) = l.lcal_idcd) as lcal_name	")
			.where("		, c.cstm_name as dlvy_cstm_name																")
			.where("from   boxx_acpt a																					")
			.where("    left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("    left outer join cstm_mast c2 on a.assi_cstm_idcd = c2.cstm_idcd									")
			.where("    left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.where("    left outer join product_mast p on a.prod_idcd = p.prod_idcd										")
			.where("    left outer join (select sum(ifnull(a.trst_qntt,0)) as trst_qntt, a.acpt_numb					")
			.where("                     from ostt_plan a 																")
			.where("                     group by a.acpt_numb															")
			.where("                    ) s on a.invc_numb = s.acpt_numb												")
			.where("where  1=1																							")
			.where("and    (a.acpt_qntt - ifnull(s.trst_qntt,0)) > 0													")
			.where("and    a.invc_numb  like %:invc_numb%			" , arg.getParamText("acpt_numb"))
			.where("and    a.invc_date  >= :invc_date1				" , arg.getParamText("acpt_date1"))
			.where("and    a.invc_date  <= :invc_date2				" , arg.getParamText("acpt_date2"))
			.where("and    a.deli_date  >= :deli_date1				" , arg.getParamText("deli_date1"))
			.where("and    a.deli_date  <= :deli_date2				" , arg.getParamText("deli_date2"))
			.where("and    a.prod_idcd   = :item_idcd				" , arg.getParamText("item_idcd"))
			.where("and    a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd"))
			.where("and    a.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd"))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos"))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc, a.invc_numb desc limit 99999												")
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson p = new ParamToJson();
		int i = 0;

		for (SqlResultRow row:map) {
			String json = p.TranslateRow(arg, row, "ostt_plan_json_fields");
			if(i == 0){
			data.param
				.table("ostt_plan"													)
				.where("where invc_numb		= :invc_numb							")
				.where("and   line_seqn		= :line_seqn							")
				//
				.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))
				//
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))
				.update("invc_date"			, row.getParameter("plan_date"			))
				.update("acpt_numb"			, row.getParameter("invc_numb"			))
				.update("item_idcd"			, row.getParameter("prod_idcd"			))
				.update("trst_qntt"			, row.getParameter("plan_qntt"			))
				.update("dlvy_cstm_idcd"	, row.getParameter("assi_cstm_idcd"		))
				.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
				.update("pcod_numb"			, row.getParameter("pcod_numb"			))
				.update("deli_date"			, row.getParameter("deli_date"			))
				.update("json_data"			, json)
				.update("user_memo"			, row.getParameter("user_memo"			))
				.update("find_name"			, row.getParameter("invc_numb"			)
											+ "	"
											+ row.getParameter("cstm_name"			)
											+ "	"
											+ row.getParameter("prod_code"			)
											+ "	"
											+ row.getParameter("prod_name"			))
				.insert("line_levl"			, row.getParameter("line_levl"			))
				.insert("line_stat"			, row.getParameter("line_stat"			))
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
			i++;

			}else{
				data.param
				.table("ostt_plan"													)
				.where("where invc_numb		= :invc_numb							")
				.where("and   line_seqn		= :line_seqn							")
				//
				.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))
				//
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))
				.update("invc_date"			, row.getParameter("plan_date"			))
				.update("acpt_numb"			, row.getParameter("invc_numb"			))
				.update("item_idcd"			, row.getParameter("prod_idcd"			))
				.update("trst_qntt"			, row.getParameter("plan_qntt"			))
				.update("dlvy_cstm_idcd"	, row.getParameter("assi_cstm_idcd"		))
				.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
				.update("pcod_numb"			, row.getParameter("pcod_numb"			))
				.update("deli_date"			, row.getParameter("deli_date"			))
				.update("cars_idcd"			, row.getParameter("cars_idcd"			))
				.update("json_data"			, json)
				.update("user_memo"			, row.getParameter("user_memo"			))
				.update("find_name"			, row.getParameter("invc_numb"			)
											+ "	"
											+ row.getParameter("cstm_name"			)
											+ "	"
											+ row.getParameter("prod_code"			)
											+ "	"
											+ row.getParameter("prod_name"			))
				.insert("line_levl"			, row.getParameter("line_levl"			))
				.insert("line_stat"			, row.getParameter("line_stat"			))
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
			}
		}
		return null ;
	}

	public SqlResultMap setUpdt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("ostt_plan"					)
			.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
			.where("and   line_seqn		= :line_seqn")  /*  INVOICE번호  */
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"))
			//
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	/*  라벨발행유무  */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("ostt_plan")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

	public SqlResultMap setBoxx_Plan_Insert(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		data.param
			.query("call boxx_plan_insert (						")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}



}
