package com.sky.system.custom.sjflv.prod.prodplanmtrl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("sjflv.ProdPlanMtrlService")
public class ProdPlanMtrlService {
	
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		ArrayList<String> temp = new ArrayList<String>();
		temp.add(arg.getParamText("prod_trst_dvcd_1000"));
		temp.add(arg.getParamText("prod_trst_dvcd_2000"));
		temp.add(arg.getParamText("prod_trst_dvcd_3000"));
		
		String x = "1";
		for(int i = 0; i< temp.size(); i++){
			if(temp.get(i).equals("on")){
				x = "0";
				temp.removeAll(temp);
				break;
			}
		}

		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize  ")
		;
		data.param
			.query("SELECT   im1.acct_bacd   , im1.item_code   , im1.item_name   , im1.item_idcd			")
			.query("       , im1.unit_idcd   , im1.item_spec   , ptm.invc_date								")
			.query("       , ai.invc_numb AS acpt_numb														")
			.query("       , ai.amnd_degr AS acpt_amnd_degr													")
			.query("       , ai.line_seqn AS acpt_seqn														")
			.query("       , im2.item_code AS prnt_item_code												")
			.query("       , im2.item_name AS prnt_item_name												")
			.query("       , im2.item_spec AS prnt_item_spec												")
			.query("       , mn.need_qntt - mn.stok_qntt AS purc_qntt										")
			.where("  FROM mtrl_need mn																		")
			.where("  LEFT OUTER JOIN item_mast im1       ON mn.item_idcd = im1.item_idcd					")
			.where("  LEFT OUTER JOIN acpt_mast am        ON mn.invc_numb = am.invc_numb					")
			.where("                                     AND mn.amnd_degr = am.amnd_degr					")
			.where("  LEFT OUTER JOIN acpt_item ai        ON mn.invc_numb = ai.invc_numb					")
			.where("                                     AND mn.amnd_degr = ai.amnd_degr					")
			.where("                                     AND mn.acpt_seqn = ai.line_seqn					")
			.where("  LEFT OUTER JOIN item_mast im2       ON ai.item_idcd = im2.item_idcd					")
			.where("  LEFT OUTER JOIN prod_plan pp        ON mn.prnt_idcd = pp.invc_numb					")
			.where("  LEFT OUTER JOIN purc_trst_item pti  ON mn.invc_numb = pti.acpt_numb					")
			.where("                                     AND mn.amnd_degr = pti.acpt_amnd_degr				")
			.where("                                     AND mn.acpt_seqn = pti.acpt_seqn					")
			.where("                                     AND mn.item_idcd = pti.item_idcd					")
			.where("  LEFT OUTER JOIN purc_trst_mast ptm  ON pti.invc_numb = ptm.invc_numb					")
			.where(" WHERE 1=1																				")
			.where("   AND mn.line_stat = '0'																")
			.where("   AND pp.line_stat = '0'																")
			.where("   AND am.invc_date  >= :invc_date1					" , arg.getParamText("invc_date1"	))
			.where("   AND am.invc_date  <= :invc_date2					" , arg.getParamText("invc_date2"	))
			.where("   AND ai.deli_date  >= :deli_date1					" , arg.getParamText("deli_date1"	))
			.where("   AND ai.deli_date  <= :deli_date2					" , arg.getParamText("deli_date2"	))
			.where("   AND SUBSTRING(pp.plan_sttm, 1, 8) >= :prod_date1	" , arg.getParamText("prod_date1"	))
			.where("   AND SUBSTRING(pp.plan_sttm, 1, 8) <= :prod_date2	" , arg.getParamText("prod_date2"	))
			.where("   AND am.cstm_idcd = :cstm_idcd					" , arg.getParamText("cstm_idcd"	))
			.where("   AND am.line_clos = :line_clos					" , arg.getParamText("line_clos"	))
			.where("   AND am.line_stat = '0'																")
			.where("   AND ( 1=:x										" , x								)
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_1000	" , "1000", "on".equals(arg.getParamText("prod_trst_dvcd_1000") ))
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_2000	" , "2000", "on".equals(arg.getParamText("prod_trst_dvcd_2000") ))
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_3000	" , "3000", "on".equals(arg.getParamText("prod_trst_dvcd_3000") ))
			.where("       )																				")
			.where("   AND im1.acct_bacd != '2002'															")
			.where("   AND mn.need_qntt > mn.stok_qntt														")
			
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	public SqlResultMap setPurcTrst(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ArrayList<String> items = new ArrayList<String>();
		
		for (SqlResultRow row:map) {
			data.param
				.table("purc_trst_mast												")
				.where("WHERE invc_numb = :invc_numb								")
	
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
	
				.update("invc_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))
				.update("dept_idcd"			, row.getParameter("dept_idcd"			))
	
				.update("updt_idcd"			, row.getParameter("upt_id"				))
				.insert("crte_idcd"			, row.getParameter("crt_id"				))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			
			data.param
				.table("purc_trst_item												")
				.where("WHERE invc_numb = :invc_numb								")
				.where("  AND line_seqn = :line_seqn								")
	
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
	
				.update("item_idcd"			, row.getParameter("item_idcd"			))
				.update("item_name"			, row.getParameter("item_name"			))
				.update("item_spec"			, row.getParameter("item_spec"			))
				.update("unit_idcd"			, row.getParameter("unit_idcd"			))
				.update("reqt_qntt"			, row.getParameter("reqt_qntt"			))
				.update("reqt_pric"			, row.getParameter("reqt_pric"			))
				.update("reqt_amnt"			, row.getParameter("reqt_amnt"			))
				.update("deli_reqt_date"	, row.getParameter("deli_reqt_date"		))
				.update("acpt_numb"			, row.getParameter("acpt_numb"		))
				.update("acpt_amnd_degr"	, Integer.parseInt(row.getParamText("acpt_amnd_degr")))
				.update("acpt_seqn"			, row.getParamText("acpt_seqn"		))
	
				.update("updt_idcd"			, row.getParameter("upt_id"				))
				.insert("crte_idcd"			, row.getParameter("crt_id"				))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}
		return null ;
	}
}
