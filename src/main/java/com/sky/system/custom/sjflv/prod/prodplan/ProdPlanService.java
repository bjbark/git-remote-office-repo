package com.sky.system.custom.sjflv.prod.prodplan;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

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
import com.sky.utils.file.UploadItem;

@Service("sjflv.ProdPlanService")
public class ProdPlanService extends DefaultServiceHandler {
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
			.query("SELECT total.*																										")
			.where("FROM (																												")
		;
		data.param
			.where("SELECT    a.*																										")
			.where("        , CASE																										")
			.where("            WHEN SUM(a.count) > 0																					")
			.where("            THEN 'N'																								")
			.where("            ELSE 'Y'																								")
			.where("          END AS need_stok_yorn																						")
			.where("  FROM (																											")
			.where("SELECT    am.invc_numb         , ai.line_seqn         , ai.deli_date         , im.item_code							")
			.where("        , im.item_name         , im.item_spec         , ai.invc_qntt         , lis.stok_qntt						")
			.where("        , ppa.total_plan_qntt  , im.item_idcd         , im.incm_loss_rate    , item.revs_numb						")
			.where("        , cm.cstm_idcd         , cm.cstm_name																		")
			.where("        , JSON_VALUE(am.json_data, '$.prod_trst_dvcd') AS prod_trst_dvcd     , item.revs_dvcd						")
			.where("        , JSON_VALUE(im.json_data, '$.pcmt') AS remk_text															")
			.where("        , (ai.invc_qntt - COALESCE(ai.stok_asgn_qntt, 0)) AS add_plan_qntt											") // 추가 생산량
			.where("        , ((ai.invc_qntt - COALESCE(ai.stok_asgn_qntt, 0)) - COALESCE(ppa.total_plan_qntt, 0)) AS plan_baln_qntt	") // 계획 잔량
			.where("        , COALESCE(ai.stok_asgn_qntt, 0) AS stok_asgn_qntt															")
			.where("        , CASE																										")
//			.where("            WHEN ((ai.invc_qntt / (100 - im.incm_loss_rate) * 100) * (item.mixx_rate / 100)) > item.item_stok_qntt	")
			.where("            WHEN ((((ai.invc_qntt - COALESCE(ai.stok_asgn_qntt, 0)) - COALESCE(ppa.total_plan_qntt, 0)) / (100 - im.incm_loss_rate) * 100) * (item.mixx_rate / 100)) > item.item_stok_qntt	")
			.where("            THEN 1																									")
			.where("            ELSE 0																									")
			.where("          END AS count																								")
			.where("  FROM acpt_mast am																									")
			.where("  LEFT OUTER JOIN acpt_item  ai  ON am.invc_numb = ai.invc_numb														")
			.where("                                AND am.amnd_degr = ai.amnd_degr														")
			.where("  LEFT OUTER JOIN (																									")
			.where("                      SELECT    acpt_numb   , acpt_seqn   , SUM(plan_qntt) AS total_plan_qntt						")
			.where("                        FROM    prod_plan_acpt																		")
			.where("                       WHERE    line_stat = '0'																		")
			.where("                       GROUP BY acpt_numb, acpt_seqn																")
			.where("                  ) ppa          ON ai.invc_numb = ppa.acpt_numb													")
			.where("                                AND ai.line_seqn = ppa.acpt_seqn													")
			.where("  LEFT OUTER JOIN (																									")
			.where("                      SELECT    item_idcd    , SUM(stok_qntt) as stok_qntt											")
			.where("                        FROM    lot_isos_sum																		")
			.where("                       GROUP BY item_idcd																			")
			.where("                  ) lis          ON ai.item_idcd = lis.item_idcd													")
			.where("  LEFT OUTER JOIN cstm_mast  cm  ON am.cstm_idcd = cm.cstm_idcd														")
			.where("  LEFT OUTER JOIN item_mast  im  ON ai.item_idcd = im.item_idcd														")
			.where("  LEFT OUTER JOIN (																									")
			.where("                      SELECT   im.acct_bacd   , im.item_code   , im.item_name   , im.item_spec   , bm.prnt_item_idcd")
			.where("                             , bm.mixx_rate   , br.revs_dvcd   , bs.base_name AS acct_name							")
			.where("                             , br.revs_numb																			")
			.where("                             , CASE																					")
			.where("                                 WHEN lis.stok_qntt IS NULL															")
			.where("                                 THEN 0 + IFNULL(poi.offr_qntt, 0)													")
			.where("                                 ELSE SUM(lis.stok_qntt) + IFNULL(poi.offr_qntt, 0)									")
			.where("                               END AS item_stok_qntt																")
			.where("                        FROM bom_mast bm																			")
			.where("                        LEFT OUTER JOIN item_mast im      ON im.item_idcd = bm.ivst_item_idcd						")
			.where("                        LEFT OUTER JOIN bom_revs  br      ON br.prnt_item_idcd = bm.prnt_item_idcd					")
			.where("                                                         AND br.revs_numb = bm.revs_numb							")
			.where("                                                         AND br.revs_dvcd = bm.revs_dvcd							")
			.where("                        LEFT OUTER JOIN lot_isos_sum lis  ON lis.item_idcd = bm.ivst_item_idcd						")
			.where("                        LEFT OUTER JOIN base_mast bs      ON bs.base_code = im.acct_bacd							")
			.where("                        LEFT OUTER JOIN (																			")
			.where("                                          SELECT poi.item_idcd   , SUM(poi.offr_qntt) AS offr_qntt					")
			.where("                                            FROM purc_ordr_item poi													")
			.where("                                            LEFT OUTER JOIN purc_ordr_mast pom  ON pom.invc_numb = poi.invc_numb	")
			.where("                                           WHERE 1=1																")
			.where("                                             AND pom.line_stat = '0'												")
			.where("                                             AND poi.line_stat = '0'												")
			.where("                                             AND json_value(pom.json_data,'$.apvl_yorn') = 1						")
			.where("                                             AND IFNULL(poi.offr_qntt,0)-IFNULL(poi.dlvy_qntt,0)>0					")
			.where("                                           GROUP BY poi.item_idcd													")
			.where("                                        ) poi ON poi.item_idcd = bm.ivst_item_idcd									")
			.where("                       WHERE 1=1																					")
			.where("                         AND br.line_stat = '0'																		")
			.where("                         AND bs.prnt_idcd = '1102'																	")
			.where("                         AND bs.line_stat = '0'																		")
			.where("                       GROUP BY bm.ivst_item_idcd, bm.prnt_item_idcd												")
			.where("                  ) item ON item.prnt_item_idcd = ai.item_idcd														")
			.where(" WHERE 1=1																											")
			.where("   AND    am.find_name  like %:find_name%	" , arg.getParamText("find_name"										))
			.where("   AND    am.invc_date  >= :invc_date1		" , arg.getParamText("invc_date1"										))
			.where("   AND    am.invc_date  <= :invc_date2		" , arg.getParamText("invc_date2"										))
			.where("   AND    ai.deli_date  >= :deli_date1		" , arg.getParamText("deli_date1"										))
			.where("   AND    ai.deli_date  <= :deli_date2		" , arg.getParamText("deli_date2"										))
			.where("   AND    am.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd"										))
			.where("   AND    am.line_clos   = :line_clos		" , arg.getParamText("line_clos"										))
			.where("   AND    am.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )						))
			.where("   AND    (item.revs_dvcd = '1' OR item.revs_dvcd IS NULL)															")
			.where("   AND   ( 1=:x										" , x															)
			.where("           OR am.acpt_dvcd  =:acpt_dvcd_1000		" , "1000", "on".equals(arg.getParamText("acpt_dvcd_1000")		))
			.where("           OR am.acpt_dvcd  =:acpt_dvcd_2000		" , "2000", "on".equals(arg.getParamText("acpt_dvcd_2000")		))
			.where("         )																											")
			.where("   AND   ( 1=:y										" , y															)
			.where("           OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_1000	" , "1000", "on".equals(arg.getParamText("prod_trst_dvcd_1000") ))
			.where("           OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_2000	" , "2000", "on".equals(arg.getParamText("prod_trst_dvcd_2000") ))
			.where("           OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_3000	" , "3000", "on".equals(arg.getParamText("prod_trst_dvcd_3000") ))
			.where("         )																											")
			.where(") a																													")
			.where(" WHERE 1=1																											")
			.where("   AND a.prod_trst_dvcd <> '3000'																					")
			.where("   AND a.plan_baln_qntt > 0																							")
			//.where("   AND (a.total_plan_qntt IS NULL OR a.total_plan_qntt = 0)															")
			.where(" GROUP BY a.invc_numb, a.line_seqn																					")
			.where(" ORDER BY a.invc_numb DESC																							")
		;
		data.param
			.where(") total																												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	// 원재료재고현황
	public SqlResultMap getItem1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("SELECT   im.acct_bacd   , im.item_code   , im.item_name   , im.item_idcd				")
			.query("       , bm.mixx_rate   , im.item_spec   , bs.base_name AS acct_name					")
			.query("       , im.unit_idcd   , bm.used_yorn   , bm.revs_numb									")
			.query("       , IFNULL(SUM(lis.stok_qntt), 0) + IFNULL(poi.offr_qntt, 0) AS stok_qntt			")
		;
		data.param
			.where("  FROM bom_mast bm																		")
			.where("  LEFT OUTER JOIN item_mast im      ON im.item_idcd = bm.ivst_item_idcd					")
//			.where("  LEFT OUTER JOIN bom_revs  br      ON br.prnt_item_idcd = bm.prnt_item_idcd			")
//			.where("                                   AND br.revs_numb = bm.revs_numb						")
//			.where("                                   AND br.revs_dvcd = bm.revs_dvcd						")
			/**
			 * [삼정향료 BOM 문제]
			 * 같은 리비전구분코드를 가지면서 ROW상태값이 모두 '0'인 경우가 있어,
			 * 임시로 해당 데이터가 있을경우 조회된 BOM 데이터의 리비전번호가 가장 작은 ROW를 가져오도록 수정
			 */
			.where("  LEFT OUTER JOIN (																				")
			.where("                    SELECT prnt_item_idcd, revs_dvcd, MIN(revs_numb) as revs_numb, line_stat	")
			.where("                      FROM bom_revs																")
			.where("                     WHERE revs_dvcd = '1'														")
			.where("                       AND line_stat = '0'														")
			.where("                     GROUP BY prnt_item_idcd													")
			.where("                  ) br  ON br.prnt_item_idcd = bm.prnt_item_idcd								")
			.where("                       AND br.revs_numb = bm.revs_numb											")
			.where("                       AND br.revs_dvcd = bm.revs_dvcd											")
			.where("  LEFT OUTER JOIN lot_isos_sum lis  ON lis.item_idcd = bm.ivst_item_idcd						")
			.where("  LEFT OUTER JOIN base_mast bs      ON bs.base_code = im.acct_bacd								")
			.where("                                   AND bs.prnt_idcd = '1102'									")
			.where("                                   AND bs.line_stat = 0											")
			.where("  LEFT OUTER JOIN (																				")
			.where("                    SELECT poi.item_idcd   , SUM(poi.offr_qntt) AS offr_qntt					")
			.where("                      FROM purc_ordr_item poi													")
			.where("                      LEFT OUTER JOIN purc_ordr_mast pom  ON pom.invc_numb = poi.invc_numb		")
			.where("                     WHERE 1=1																	")
			.where("                       AND pom.line_stat = '0'													")
			.where("                       AND poi.line_stat = '0'													")
			.where("                       AND json_value(pom.json_data,'$.apvl_yorn') = 1							")
			.where("                       AND IFNULL(poi.offr_qntt,0)-IFNULL(poi.dlvy_qntt,0)>0					")
			.where("                     GROUP BY poi.item_idcd														")
			.where("                  ) poi ON poi.item_idcd = bm.ivst_item_idcd									")
			.where(" WHERE 1=1																				")
			.where("   AND br.revs_dvcd = '1'																")
			.where("   AND br.line_stat = '0'																")
			.where("   AND bm.prnt_item_idcd = :item_idcd	", arg.getParameter("item_idcd"					))
			.where(" GROUP BY im.item_idcd																	")
			.where(" ORDER BY bm.line_seqn ASC																")
		;
		return data.selectForMap();
	}
	
	public SqlResultMap getItem2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("SELECT count(1) as maxsize  " )
		;
		data.param
			.query("SELECT   im.acct_bacd   , im.item_code   , im.item_name   , im.item_idcd				")
			.query("       , im.unit_idcd   , im.item_spec   , bs.base_name AS acct_name					")
			.query("       , bm.mixx_rate/100 AS mixx_rate   , SUM(lis.stok_qntt) AS stok_qntt				")
		;
		data.param
			.where("  FROM bom_mast bm																		")
			.where("  LEFT OUTER JOIN item_mast im      ON im.item_idcd = bm.ivst_item_idcd					")
			.where("  LEFT OUTER JOIN bom_revs  br      ON br.prnt_item_idcd = bm.prnt_item_idcd			")
			.where("                                   AND br.revs_numb = bm.revs_numb						")
			.where("                                   AND br.revs_dvcd = bm.revs_dvcd						")
			.where("  LEFT OUTER JOIN lot_isos_sum lis  ON lis.item_idcd = bm.ivst_item_idcd				")
			.where("  LEFT OUTER JOIN base_mast bs      ON bs.base_code = im.acct_bacd						")
			.where("                                   AND bs.prnt_idcd = '1102'							")
			.where("                                   AND bs.line_stat < 2									")
			.where(" WHERE 1=1																				")
			.where("   AND br.line_stat = '0'																")
			.where("   AND bm.prnt_item_idcd = :item_idcd	", arg.getParameter("item_idcd"					))
			.where("   AND br.revs_dvcd = '1'																")
			.where("   AND bs.base_code != '2002'															")
			.where(" GROUP BY im.item_idcd																	")
			.where(" ORDER BY bm.line_seqn ASC																")
		;
		return data.selectForMap();
	}
	
	public int getMtrlNeedMaxSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("SELECT MAX(line_seqn) AS line_seqn						")
		;
		data.param
			.where("  FROM mtrl_need mn																")
			.where(" WHERE 1=1																		")
			.where("   AND mn.invc_numb = :acpt_numb		", arg.getParameter("acpt_numb"			))
			.where("   AND mn.amnd_degr = '1'														")
			.where("   AND mn.acpt_seqn = :acpt_seqn		", arg.getParameter("acpt_seqn"			))
			.where(" GROUP BY mn.invc_numb, mn.amnd_degr, mn.acpt_seqn								")
		;
		SqlResultMap map = data.selectForMap();
		int seqn = 0;
		if (map.size() == 1) {
			seqn = Integer.parseInt(map.get(0).getParamText("line_seqn"));
		}
		
		return ++seqn;
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
			.query("SELECT total.*																										")
			.where("FROM (																												")
		;
		data.param
			.where("SELECT   ppl.*   , (ppl.invc_qntt - ppl.stok_asgn_qntt) AS add_plan_qntt											")
			.where("       , ((ppl.invc_qntt - ppl.stok_asgn_qntt) - ppl.plan_qntt) AS upid_qntt										")
//			.where("       , prm.indn_qntt																								")
			.where("       , CASE																										")
			.where("           WHEN SUM(ppl.count) > 0																					")
			.where("           THEN 'N'																									")
			.where("           ELSE 'Y'																									")
			.where("         END AS need_stok_yorn																						")
			.where("  FROM (																											")
			.where("         SELECT ppa.invc_numb    , ai.deli_date    , ai.stok_asgn_qntt   , ai.invc_qntt   , lis.stok_qntt			")
			.where("              , im.item_code     , im.item_name    , im.item_spec        , ppa.plan_qntt  , ppa.plan_baln_qntt		")
			.where("              , pp.indn_qntt     , ppa.line_seqn   , cm.cstm_name													")
			.where("              , ai.invc_numb AS acpt_invc_numb     , ai.line_seqn AS acpt_line_seqn									")
			.where("              , json_value(am.json_data, '$.prod_trst_dvcd') AS prod_trst_dvcd										")
			.where("              , SUBSTRING(pp.plan_sttm, 1, 8) AS plan_date															")
			.where("              , CASE																								")
			.where("                  WHEN (ppa.indn_qntt * ist.mixx_rate/100) > ist.item_stok_qntt										")
			.where("                  THEN 1																							")
			.where("                  ELSE 0																							")
			.where("                END AS count																						")
			.where("           FROM prod_plan_acpt ppa																					")
			.where("           LEFT OUTER JOIN prod_plan pp  ON pp.invc_numb = ppa.invc_numb											")
			.where("           LEFT OUTER JOIN acpt_item ai  ON ppa.acpt_numb = ai.invc_numb											")
			.where("                                        AND ppa.acpt_seqn = ai.line_seqn											")
			.where("           LEFT OUTER JOIN acpt_mast am  ON ai.invc_numb = am.invc_numb												")
			.where("                                        AND ai.amnd_degr = am.amnd_degr												")
			.where("           LEFT OUTER JOIN cstm_mast cm  ON am.cstm_idcd = cm.cstm_idcd												")
			.where("           LEFT OUTER JOIN item_mast im  ON ai.item_idcd = im.item_idcd												")
			.where("           LEFT OUTER JOIN (																						")
			.where("                             SELECT item_idcd, SUM(stok_qntt) AS stok_qntt											")
			.where("                               FROM lot_isos_sum lis																")
			.where("                              GROUP BY item_idcd																	")
			.where("                           ) lis         ON im.item_idcd = lis.item_idcd											")
			.where("           LEFT OUTER JOIN (																						")
			.where("                             SELECT im.acct_bacd   , im.item_code   , im.item_name   , im.item_spec					")
			.where("                                  , bm.mixx_rate   , br.revs_dvcd   , bs.base_name AS acct_name  , bm.prnt_item_idcd")
			.where("                                  , CASE																			")
			.where("                                      WHEN lis.stok_qntt IS NULL													")
			.where("                                      THEN 0																		")
			.where("                                      ELSE SUM(lis.stok_qntt)														")
			.where("                                    END AS item_stok_qntt															")
			.where("                               FROM bom_mast bm																		")
			.where("                               LEFT OUTER JOIN item_mast im      ON im.item_idcd = bm.ivst_item_idcd				")
			.where("                               LEFT OUTER JOIN bom_revs  br      ON br.prnt_item_idcd = bm.prnt_item_idcd			")
			.where("                                                                AND br.revs_numb = bm.revs_numb						")
			.where("                                                                AND br.revs_dvcd = bm.revs_dvcd						")
			.where("                               LEFT OUTER JOIN lot_isos_sum lis  ON lis.item_idcd = bm.ivst_item_idcd				")
			.where("                               LEFT OUTER JOIN base_mast bs      ON bs.base_code = im.acct_bacd						")
			.where("                              WHERE 1=1																				")
			.where("                                AND br.line_stat = '0'																")
			.where("                                AND br.revs_dvcd = '1'																")
			.where("                                AND bs.prnt_idcd = '1102'																")
			.where("                                AND bs.line_stat = '0'																")
			.where("                              GROUP BY bm.ivst_item_idcd, bm.prnt_item_idcd											")
			.where("                           ) ist ON ist.prnt_item_idcd = pp.item_idcd												")
			.where("          WHERE 1=1																									")
			.where("            AND am.find_name  like %:find_name%		" , arg.getParamText("find_name"								))
			.where("            AND am.invc_date  >= :invc_date1		" , arg.getParamText("invc_date1"								))
			.where("            AND am.invc_date  <= :invc_date2		" , arg.getParamText("invc_date2"								))
			.where("            AND ai.deli_date  >= :deli_date1		" , arg.getParamText("deli_date1"								))
			.where("            AND ai.deli_date  <= :deli_date2		" , arg.getParamText("deli_date2"								))
			.where("            AND SUBSTRING(pp.plan_sttm, 1, 8) >= :prod_date1	" , arg.getParamText("prod_date1"					))
			.where("            AND SUBSTRING(pp.plan_sttm, 1, 8) <= :prod_date2	" , arg.getParamText("prod_date2"					))
			.where("            AND am.cstm_idcd   = :cstm_idcd			" , arg.getParamText("cstm_idcd"								))
			.where("            AND am.line_clos   = :line_clos			" , arg.getParamText("line_clos"								))
			.where("            AND am.line_stat   < :line_stat			" , "2" , "".equals(arg.getParamText("line_stat" )				))
			.where("            AND ( 1=:x										" , x													)
			.where("                  OR am.acpt_dvcd  =:acpt_dvcd_1000	" , "1000", "on".equals(arg.getParamText("acpt_dvcd_1000")		))
			.where("                  OR am.acpt_dvcd  =:acpt_dvcd_2000	" , "2000", "on".equals(arg.getParamText("acpt_dvcd_2000")		))
			.where("                )																									")
			.where("            AND ( 1=:y										" , y													)
			.where("                  OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_1000	" , "1000", "on".equals(arg.getParamText("prod_trst_dvcd_1000") ))
			.where("                  OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_2000	" , "2000", "on".equals(arg.getParamText("prod_trst_dvcd_2000") ))
			.where("                  OR json_value(am.json_data, '$.prod_trst_dvcd') =:prod_trst_dvcd_3000	" , "3000", "on".equals(arg.getParamText("prod_trst_dvcd_3000") ))
			.where("                )																									")
			.where("            AND pp.line_stat = '0'																					")
			.where("       ) ppl																										")
//			.where("  LEFT OUTER JOIN pror_mast prm ON ppl.invc_numb = prm.pdsd_numb													")
			.where(" GROUP BY ppl.invc_numb, ppl.acpt_invc_numb, ppl.acpt_line_seqn														")
		;
		data.param
			.where(") total																												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setProdPlan1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();
		SqlResultMap bom = this.getItem2(arg);
		int mtrlNeedSeqn = this.getMtrlNeedMaxSeqn(arg);
		
		
		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.insert) {
				System.out.println("plan_date = " + row.getParameter("plan_date"));
				String json_data = trans.TranslateRow(arg, row, "prod_plan_json_fields");
				data.param
					.table("prod_plan													")
					.where("WHERE invc_numb = :invc_numb								")
	
					.unique("invc_numb"			, row.fixParameter("plan_invc_numb"		))
	
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))
					.update("deli_date"			, row.getParameter("deli_date"			))
					.update("plan_sttm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"090000")
					.update("plan_edtm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"180000")
					.update("plan_qntt"			, row.getParameter("plan_qntt"			))	
					.update("indn_qntt"			, row.getParameter("indn_qntt"			))	
					.update("bomt_degr"			, row.getParameter("revs_numb"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("json_data"			, json_data								)
	
					.update("updt_idcd"			, row.getParameter("upt_id"				))
					.insert("crte_idcd"			, row.getParameter("crt_id"				))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				
				data.param
					.table("prod_plan_acpt												")
					.where("WHERE invc_numb = :invc_numb								")
					.where("  AND line_seqn = :line_seqn								")
		
					.unique("invc_numb"			, row.fixParameter("plan_invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("plan_line_seqn"		))
		
					.update("acpt_numb"			, row.getParameter("invc_numb"			))
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))
					.update("plan_sttm"			, row.getParameter("plan_date")!="" ? row.getParameter("plan_date")+"090000" : null)
					.update("plan_edtm"			, row.getParameter("plan_date")!="" ? row.getParameter("plan_date")+"180000" : null)
					.update("plan_qntt"			, row.getParameter("plan_qntt"			))
					.update("indn_qntt"			, row.getParameter("indn_qntt"			))
					.update("plan_baln_qntt"	, row.getParameter("plan_baln_qntt"		))
		
					.update("updt_idcd"			, row.getParameter("upt_id"				))
					.insert("crte_idcd"			, row.getParameter("crt_id"				))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				
				for (SqlResultRow item : bom) {
					float needQntt = Float.parseFloat(row.getParamText("indn_qntt")) * Float.parseFloat(item.getParamText("mixx_rate"));
					data.param
						.table("mtrl_need													")
						.where("WHERE invc_numb = :invc_numb								")
						.where("  AND amnd_degr = :amnd_degr								")
						.where("  AND acpt_seqn = :acpt_seqn								")
						.where("  AND line_seqn = :line_seqn								")
			
						.unique("invc_numb"			, row.fixParameter("invc_numb"			))
						.unique("amnd_degr"			, 1										)
						.unique("acpt_seqn"			, row.fixParameter("line_seqn"			))
						.unique("line_seqn"			, mtrlNeedSeqn							)
						
						.update("item_idcd"			, item.getParameter("item_idcd"			))
						.update("need_qntt"			, needQntt								)
						.update("acct_bacd"			, item.getParameter("acct_bacd"			))
						.update("stok_qntt"			, item.getParameter("stok_qntt"			))
						.update("prnt_idcd"			, row.getParameter("plan_invc_numb"		))
			
						.update("updt_idcd"			, row.getParameter("upt_id"				))
						.insert("crte_idcd"			, row.getParameter("crt_id"				))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(rowaction);
					mtrlNeedSeqn++;
				}
			} else if (rowaction == Action.delete) {
				rowaction = Action.update;
				data.param
					.table("prod_plan											")
					.where("WHERE invc_numb = :invc_numb						")
	
					.unique("invc_numb"			, row.fixParameter("invc_numb"	))
					
					.update("line_stat"			, "2")
				;
				data.attach(rowaction);
				
				data.param
					.table("prod_plan_acpt										")
					.where("WHERE invc_numb = :invc_numb						")
		
					.unique("invc_numb"			, row.fixParameter("invc_numb"	))
					
					.update("line_stat"			, "2")
				;
				data.attach(rowaction);
				
				data.param
					.table("mtrl_need											")
					.where("WHERE prnt_idcd = :prnt_idcd						")
		
					.unique("prnt_idcd"			, row.fixParameter("invc_numb"	))
					
					.update("line_stat"			, "2")
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		data.clear();
		return null ;
	}
	
	public SqlResultMap setProdPlan2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();
		SqlResultMap bom = this.getItem2(arg);
		
		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (row.getParameter("isMaster") != null) {
				String json_data = trans.TranslateRow(arg, row, "prod_plan_json_fields");
				data.param
					.table("prod_plan													")
					.where("WHERE invc_numb = :invc_numb								")
	
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
	
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))
					.update("deli_date"			, row.getParameter("deli_date"			))
					.update("plan_sttm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"090000")
					.update("plan_edtm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"180000")
					.update("plan_qntt"			, row.getParameter("plan_qntt"			))
					.update("indn_qntt"			, row.getParameter("indn_qntt"			))
					.update("bomt_degr"			, row.getParameter("revs_numb"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("json_data"			, json_data								)
	
					.update("updt_idcd"			, row.getParameter("upt_id"				))
					.insert("crte_idcd"			, row.getParameter("crt_id"				))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
			} else {
				data.param
					.table("prod_plan_acpt												")
					.where("WHERE invc_numb = :invc_numb								")
					.where("  AND line_seqn = :line_seqn								")
		
					.unique("invc_numb"			, row.fixParameter("plan_invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("plan_line_seqn"		))
		
					.update("acpt_numb"			, row.getParameter("invc_numb"			))
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))
					.update("plan_sttm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"090000")
					.update("plan_edtm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"180000")
					.update("plan_qntt"			, row.getParameter("plan_qntt"			))
					.update("indn_qntt"			, row.getParameter("indn_qntt"			))
					.update("plan_baln_qntt"	, row.getParameter("plan_baln_qntt"		))
		
					.update("updt_idcd"			, row.getParameter("upt_id"				))
					.insert("crte_idcd"			, row.getParameter("crt_id"				))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				
				arg.setParameter("acpt_numb", row.getParameter("invc_numb"));
				arg.setParameter("acpt_seqn", row.getParameter("line_seqn"));
				int mtrlNeedSeqn = this.getMtrlNeedMaxSeqn(arg);
				
				for (SqlResultRow item : bom) {
					float needQntt = Float.parseFloat(row.getParamText("indn_qntt")) * Float.parseFloat(item.getParamText("mixx_rate"));
					data.param
						.table("mtrl_need													")
						.where("WHERE invc_numb = :invc_numb								")
						.where("  AND amnd_degr = :amnd_degr								")
						.where("  AND acpt_seqn = :acpt_seqn								")
						.where("  AND line_seqn = :line_seqn								")
			
						.unique("invc_numb"			, row.fixParameter("invc_numb"			))
						.unique("amnd_degr"			, 1										)
						.unique("acpt_seqn"			, row.fixParameter("line_seqn"			))
						.unique("line_seqn"			, mtrlNeedSeqn							)
						
						.update("item_idcd"			, item.getParameter("item_idcd"			))
						.update("need_qntt"			, needQntt								)
						.update("acct_bacd"			, item.getParameter("acct_bacd"			))
						.update("stok_qntt"			, item.getParameter("stok_qntt"			))
						.update("prnt_idcd"			, row.getParameter("plan_invc_numb"		))
			
						.update("updt_idcd"			, row.getParameter("upt_id"				))
						.insert("crte_idcd"			, row.getParameter("crt_id"				))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(rowaction);
					mtrlNeedSeqn++;
				}
			}
		}
		data.execute();
		data.clear();
		return null ;
	}
	
	public SqlResultMap setStokAsgn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		
		for (SqlResultRow row:map) {
			data.param
				.table("acpt_item													")
				.where("WHERE invc_numb = :invc_numb								")
				.where("  AND line_seqn = :line_seqn								")
	
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
	
				.update("stok_asgn_qntt"	, row.getParameter("stok_asgn_qntt"		))
	
				.update("updt_idcd"			, row.getParameter("upt_id"				))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
		}
		data.execute();
		data.clear();
		return null ;
	}
	
	public SqlResultMap setPlanDate(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		
		for (SqlResultRow row:map) {
			data.param
				.table("prod_plan													")
				.where("WHERE invc_numb = :invc_numb								")
	
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
	
				.update("plan_sttm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"090000")
				.update("plan_edtm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"180000")
	
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
			
			data.param
				.table("prod_plan_acpt												")
				.where("WHERE invc_numb = :invc_numb								")
				.where("  AND line_seqn = :line_seqn								")
	
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
	
				.update("plan_sttm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"090000")
				.update("plan_edtm"			, row.getParameter("plan_date").equals("") ? null : row.getParameter("plan_date")+"180000")
	
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
		}
		data.execute();
		data.clear();
		return null ;
	}
	
	public SqlResultMap setAddProd(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();
		
		for (SqlResultRow row:map) {
			String json_data = trans.TranslateRow(arg, row, "acpt_mast_json_fields");
			data.param
				.table("acpt_mast													")
				.where("WHERE invc_numb = :invc_numb								")
				.where("  AND amnd_degr = :amnd_degr								")
	
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
	
				.update("invc_date"			, row.getParameter("invc_date"			))
				.update("acpt_dvcd"			, row.getParameter("acpt_dvcd"			))
				.update("json_data"			, json_data)
	
				.update("updt_idcd"			, row.getParameter("upt_id"				))
				.insert("crte_idcd"			, row.getParameter("crt_id"				))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			
			data.param
				.table("acpt_item													")
				.where("WHERE invc_numb = :invc_numb								")
				.where("  AND amnd_degr = :amnd_degr								")
				.where("  AND line_seqn = :line_seqn								")
	
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
	
				.update("item_idcd"			, row.getParameter("item_idcd"			))
				.update("unit_idcd"			, row.getParameter("unit_idcd"			))
				.update("invc_qntt"			, row.getParameter("invc_qntt"			))
				.update("deli_date"			, row.getParameter("deli_date"			))
	
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
	
	public SqlResultMap getProdPlanNdqt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";

		ParamToJson trans = new ParamToJson();
		result = trans.TranslateAll(arg);

		data.param
			.query("call prodplan_ndqt (			")
			.query("   :param       "   , result	)
			.query("                   ) 			")
		;
		return data.selectForMap() ;
	}
	
	public SqlResultMap getPrntItem(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.query("SELECT bm.prnt_item_idcd    , bm.mixx_rate								")
			.where("  FROM bom_mast bm														")
			.where("  LEFT OUTER JOIN bom_revs br  ON bm.prnt_item_idcd = br.prnt_item_idcd	")
			.where("                              AND bm.revs_numb = br.revs_numb			")
			.where("                              AND bm.revs_dvcd = br.revs_dvcd			")
			.where(" WHERE 1=1																")
			.where("   AND br.line_stat = '0'												")
			.where("   AND bm.ivst_item_idcd = :ivst_item_idcd	", arg.getParameter("ivst_item_idcd"))
		;
		
		return data.selectForMap();
	}
	
	public SqlResultMap setHtmlTemplate(HttpRequestArgument arg, byte[] file) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.table("template								")
			.where("WHERE template_id = :template_id		")
	
			.unique("template_id"			, 2		)
	
			.update("template_code"			, file	)
		;
		data.attach(Action.insert);
		data.execute();
		data.clear();
		
		return null ;
	}
	
	public SqlResultMap getHtmlTemplate(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq + ".POS");
		
		data.param
			.query("SELECT *		")
			.where("  FROM template	")
			.where(" WHERE template_id = 2	")
		;
		
		return data.selectForMap();
	}
	
	public SqlResultMap getJsonData(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq + ".POS");
		
		data.param
			.query("SELECT *							")
			.where("  FROM template_history				")
			.where(" WHERE 1=1							")
			.where("   AND history_id = :history_id		", 2)
			.where("   AND template_id = :template_id	", 2)
		;
		
		return data.selectForMap();
	}
}
