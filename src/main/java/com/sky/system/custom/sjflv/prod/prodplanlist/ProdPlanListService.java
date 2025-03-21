package com.sky.system.custom.sjflv.prod.prodplanlist;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

@Service("sjflv.ProdPlanListService")
public class ProdPlanListService extends DefaultServiceHandler {
	
	@Autowired
	private HostPropertiesService property;
	
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		ArrayList<String> temp = new ArrayList<String>();
		temp.add(arg.getParamText("acpt_dvcd_1000"));
		temp.add(arg.getParamText("acpt_dvcd_2000"));
		
		String x = "1";
		for(int i = 0; i< temp.size(); i++){
			if(temp.get(i).equals("on")){
				x = "0";
				temp.removeAll(temp);
				break;
			}
		}
		
		String y = "1";
		temp.add(arg.getParamText("prod_trst_dvcd_1000"));
		temp.add(arg.getParamText("prod_trst_dvcd_2000"));
		temp.add(arg.getParamText("prod_trst_dvcd_3000"));
		for(int i = 0; i< temp.size(); i++){
			if(temp.get(i).equals("on")){
				y = "0";
				break;
			}
		}

		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize  ")
		;
		data.param
			.query("SELECT SUBSTRING(ppa.plan_sttm, 1, 8) AS plan_date    , im.item_code    , im.item_name						")
			.query("                                    , im.item_spec    , ppa.plan_qntt   , ai.deli_date						")
			.where("  FROM prod_plan_acpt ppa																					")
			.where("  LEFT OUTER JOIN prod_plan pp  ON ppa.invc_numb = pp.invc_numb												")
			.where("  LEFT OUTER JOIN acpt_item ai  ON ppa.acpt_numb = ai.invc_numb												")
			.where("                                AND ppa.acpt_seqn = ai.line_seqn											")
			.where("  LEFT OUTER JOIN acpt_mast am  ON ai.invc_numb = am.invc_numb												")
			.where("                                AND ai.amnd_degr = am.amnd_degr												")
			.where("  LEFT OUTER JOIN item_mast im  ON pp.item_idcd = im.item_idcd												")
			.where(" WHERE 1=1																									")
			.where("   AND am.invc_date  >= :invc_date1					" , arg.getParamText("invc_date1"						))
			.where("   AND am.invc_date  <= :invc_date2					" , arg.getParamText("invc_date2"						))
			.where("   AND ai.deli_date  >= :deli_date1					" , arg.getParamText("deli_date1"						))
			.where("   AND ai.deli_date  <= :deli_date2					" , arg.getParamText("deli_date2"						))
			.where("   AND SUBSTRING(pp.plan_sttm, 1, 8) >= :prod_date1	" , arg.getParamText("prod_date1"						))
			.where("   AND SUBSTRING(pp.plan_sttm, 1, 8) <= :prod_date2	" , arg.getParamText("prod_date2"						))
			.where("   AND am.cstm_idcd   = :cstm_idcd					" , arg.getParamText("cstm_idcd"						))
			.where("   AND am.line_clos   = :line_clos					" , arg.getParamText("line_clos"						))
			.where("   AND am.line_stat   < :line_stat					" , "2" , "".equals(arg.getParamText("line_stat" )		))
			.where("   AND ( 1=:x										" , x													)
			.where("         OR am.acpt_dvcd  =:acpt_dvcd_1000	" , "1000", "on".equals(arg.getParamText("acpt_dvcd_1000")		))
			.where("         OR am.acpt_dvcd  =:acpt_dvcd_2000	" , "2000", "on".equals(arg.getParamText("acpt_dvcd_2000")		))
			.where("       )																									")
			.where("   AND ( 1=:y										" , y													)
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_1000	" , "1000", "on".equals(arg.getParamText("prod_trst_dvcd_1000") ))
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_2000	" , "2000", "on".equals(arg.getParamText("prod_trst_dvcd_2000") ))
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_3000	" , "3000", "on".equals(arg.getParamText("prod_trst_dvcd_3000") ))
			.where("       )																									")
			.where("   AND pp.line_stat = '0'																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		ArrayList<String> temp = new ArrayList<String>();
		temp.add(arg.getParamText("acpt_dvcd_1000"));
		temp.add(arg.getParamText("acpt_dvcd_2000"));
		
		String x = "1";
		for(int i = 0; i< temp.size(); i++){
			if(temp.get(i).equals("on")){
				x = "0";
				temp.removeAll(temp);
				break;
			}
		}
		
		String y = "1";
		temp.add(arg.getParamText("prod_trst_dvcd_1000"));
		temp.add(arg.getParamText("prod_trst_dvcd_2000"));
		temp.add(arg.getParamText("prod_trst_dvcd_3000"));
		for(int i = 0; i< temp.size(); i++){
			if(temp.get(i).equals("on")){
				y = "0";
				break;
			}
		}

		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize  ")
		;
		data.param
			.query("SELECT im1.item_code   , im1.item_name   , im1.item_spec							")
			.query("     , ppa.acpt_numb   , ppa.acpt_seqn   , ppa.plan_qntt   , ai.deli_date			")
			.query("     , bs.base_name AS acct_name													")
			.query("     , im2.item_code AS prnt_item_code												")
			.query("     , im2.item_name AS prnt_item_name												")
			.query("     , im2.item_spec AS prnt_item_spec												")
			.query("     , SUBSTRING(ppa.plan_sttm, 1, 8) AS plan_date									")
			.query("     , (ppa.plan_qntt * (bm.mixx_rate/100)) AS need_qntt							")
			.where("  FROM prod_plan_acpt ppa															")
			.where("  LEFT OUTER JOIN prod_plan pp   ON ppa.invc_numb = pp.invc_numb					")
			.where("  LEFT OUTER JOIN bom_revs br    ON pp.item_idcd = br.prnt_item_idcd				")
			.where("                                AND br.revs_dvcd = '1'								")
			.where("                                AND br.line_stat = '0'								")
			.where("  LEFT OUTER JOIN bom_mast bm    ON br.prnt_item_idcd = bm.prnt_item_idcd			")
			.where("                                AND br.revs_numb = bm.revs_numb						")
			.where("  LEFT OUTER JOIN item_mast im1  ON bm.ivst_item_idcd = im1.item_idcd				")
			.where("  LEFT OUTER JOIN base_mast bs   ON im1.acct_bacd = bs.base_code					")
			.where("                                AND bs.prnt_idcd = '1102'							")
			.where("  LEFT OUTER JOIN acpt_item ai   ON ppa.acpt_numb = ai.invc_numb					")
			.where("                                AND ppa.acpt_seqn = ai.line_seqn					")
			.where("  LEFT OUTER JOIN acpt_mast am   ON ai.invc_numb = am.invc_numb						")
			.where("                                AND ai.amnd_degr = am.amnd_degr						")
			.where("  LEFT OUTER JOIN item_mast im2  ON ai.item_idcd = im2.item_idcd					")
			.where(" WHERE 1=1																								")
			.where("   AND am.invc_date  >= :invc_date1					" , arg.getParamText("invc_date1"					))
			.where("   AND am.invc_date  <= :invc_date2					" , arg.getParamText("invc_date2"					))
			.where("   AND ai.deli_date  >= :deli_date1					" , arg.getParamText("deli_date1"					))
			.where("   AND ai.deli_date  <= :deli_date2					" , arg.getParamText("deli_date2"					))
			.where("   AND SUBSTRING(pp.plan_sttm, 1, 8) >= :prod_date1	" , arg.getParamText("prod_date1"					))
			.where("   AND SUBSTRING(pp.plan_sttm, 1, 8) <= :prod_date2	" , arg.getParamText("prod_date2"					))
			.where("   AND am.cstm_idcd   = :cstm_idcd					" , arg.getParamText("cstm_idcd"					))
			.where("   AND am.line_clos   = :line_clos					" , arg.getParamText("line_clos"					))
			.where("   AND am.line_stat   = '0'																				")
			.where("   AND ( 1=:x										" , x												)
			.where("         OR am.acpt_dvcd  =:acpt_dvcd_1000	" , "1000", "on".equals(arg.getParamText("acpt_dvcd_1000")	))
			.where("         OR am.acpt_dvcd  =:acpt_dvcd_2000	" , "2000", "on".equals(arg.getParamText("acpt_dvcd_2000")	))
			.where("       )																								")
			.where("   AND ( 1=:y										" , y												)
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_1000	" , "1000", "on".equals(arg.getParamText("prod_trst_dvcd_1000") ))
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_2000	" , "2000", "on".equals(arg.getParamText("prod_trst_dvcd_2000") ))
			.where("         OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_3000	" , "3000", "on".equals(arg.getParamText("prod_trst_dvcd_3000") ))
			.where("       )																								")
			.where("   AND pp.line_stat = '0'																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	public SqlResultMap getEvents(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq + ".POS");

		data.param
			.query("SELECT    im.item_code       , im.item_name       , im.item_spec       , ppa.plan_qntt				")
			.query("        , ai.deli_date       , ppa.plan_sttm      , ppa.plan_edtm									")
			.where("  FROM    prod_plan pp																				")
			.where("  LEFT OUTER JOIN prod_plan_acpt ppa ON pp.invc_numb = ppa.invc_numb								")
			.where("  LEFT OUTER JOIN acpt_item ai       ON ppa.acpt_numb = ai.invc_numb								")
			.where("                                    AND ppa.acpt_seqn = ai.line_seqn								")
			.where("  LEFT OUTER JOIN item_mast im       ON pp.item_idcd = im.item_idcd									")
			.where(" WHERE    1=1																						")
			.where("   AND    ppa.plan_sttm >= :stdt				", arg.getParameter("stdt"							))
			.where("   AND    ppa.plan_edtm <= :eddt				", arg.getParameter("eddt"							))
			.where(" ORDER BY pp.cofm_date ASC")
		;
		
		return data.selectForMap();
	}
	
	public SqlResultMap getEvents2(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq + ".POS");

		data.param
			.query("SELECT cm.cstm_name    , cm.cstm_idcd    ,   count(1) AS plan_count			")
			.query("     , ppa.plan_sttm   , ppa.plan_edtm										")
			.where("  FROM prod_plan_acpt ppa													")
			.where("  LEFT OUTER JOIN acpt_mast am ON ppa.acpt_numb = am.invc_numb				")
			.where("  LEFT OUTER JOIN cstm_sbsc cs ON am.cstm_idcd = cs.cstm_idcd				")
			.where("  LEFT OUTER JOIN cstm_mast cm ON am.cstm_idcd = cm.cstm_idcd				")
			.where(" WHERE 1=1																	")
			.where("   AND cs.mngt_sbsc_valu = 'yes'											")
			.where("   AND ppa.plan_sttm >= :stdt				", arg.getParameter("stdt"		))
			.where("   AND ppa.plan_edtm <= :eddt				", arg.getParameter("eddt"		))
			.where(" GROUP BY am.cstm_idcd   , ppa.plan_sttm									")
		;
		
		return data.selectForMap();
	}
	
	public SqlResultMap getEventDetails(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		//String hq = arg.getParamText("hq_id");
		//DataMessage data = new DataMessage(hq + ".POS");
		DataMessage data = arg.newStorage("POS");
		
		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize  ")
		;
		data.param
			.query("SELECT ppa.invc_numb   , ppa.line_seqn   , ppa.acpt_numb   , ppa.plan_qntt	")
			.query("     , im.item_name    , im.item_code    , im.item_spec    , ai.deli_date	")
			.where("  FROM prod_plan_acpt ppa													")
			.where("  LEFT OUTER JOIN prod_plan pp  ON ppa.invc_numb = pp.invc_numb				")
			.where("  LEFT OUTER JOIN acpt_mast am  ON ppa.acpt_numb = am.invc_numb				")
			.where("  LEFT OUTER JOIN item_mast im  ON pp.item_idcd = im.item_idcd				")
			.where("  LEFT OUTER JOIN acpt_item ai  ON ppa.acpt_numb = ai.invc_numb				")
			.where("                               AND ppa.acpt_seqn = ai.line_seqn				")
			.where(" WHERE 1=1																	")
			.where("   AND am.cstm_idcd = :cstm_idcd		", arg.getParameter("cstm_idcd"		))
			.where("   AND ppa.plan_sttm = :plan_sttm		", arg.getParameter("plan_sttm"		))
		;
		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
