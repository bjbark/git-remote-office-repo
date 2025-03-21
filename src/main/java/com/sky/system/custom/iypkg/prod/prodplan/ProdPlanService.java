package com.sky.system.custom.iypkg.prod.prodplan;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service("iypkg.ProdPlanService")
public class ProdPlanService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;

		data.param
			.query("select  a.plan_sttm       , c.cstm_name       , p.prod_name       , b.item_leng							")
			.query("      , b.item_widh       , b.item_hght       , a.invc_numb       , a.cvic_idcd							")
			.query("      , ac.acpt_numb      , b.invc_date       , b.pcod_numb												")
			.query("      , group_concat(DISTINCT v.cvic_name) as cvic_name													")
			.query("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos							")
			.query("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif							")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd							")
			.query("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd							")
			;
		data.param
			.where("from    prod_plan a																						")
			.where("   left outer join    prod_plan_acpt ac on a.invc_numb = ac.invc_numb									")
			.where("   left outer join    boxx_acpt      b  on ac.acpt_numb = b.invc_numb									")
			.where("   left outer join    cstm_mast      c  on a.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join    product_mast   p  on a.item_idcd = p.prod_idcd									")
			.where("   left outer join    pror_item     pr  on a.invc_numb = pr.orig_invc_numb								")
			.where("   left outer join    cvic_mast      v  on pr.cvic_idcd = v.cvic_idcd									")
			.where("   left outer join    prod_plan_wkct x  on a.invc_numb = x.invc_numb									")
			.where("where   1=1																								")
			.where("and     x.invc_numb is not null																			")
			.where("and     b.apvl_yorn = '1'																				")
			.where("and    ac.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     a.prod_idcd   = :prod_idcd       " , arg.getParamText("prod_idcd" ))
			.where("and     a.plan_sttm  >= :plan_sttm1      " , arg.getParamText("plan_sttm1"))
			.where("and     a.plan_sttm  <= :plan_sttm2      " , arg.getParamText("plan_sttm2"))
			.where("and     a.line_stat   = :line_stat       " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb 																					")
			.where("order by a.plan_sttm desc , invc_numb																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//룩업
	public SqlResultMap getMaster2(HttpRequestArgument arg , int page, int rows , String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.invc_numb       , a.plan_qntt       , a.item_idcd       , a.plan_sttm						")
			.query("      , w.wkct_name       , u.unit_name       , w.wkct_stnm       , bp.plan_qntt as need_qntt		")
			.query("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos						")
			.query("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif						")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.query("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd						")
			.query("      , CONVERT(json_value(a.json_data,'$.wkun_dvcd' ), CHAR(100)) as wkun_dvcd						")
			.query("      , ac.acpt_numb      , ba.invc_date      , ba.pcod_numb										")
		;
		data.param
			.where("from    prod_plan_wkct a																					")
			.where("        left outer join prod_plan_acpt  ac  on a.invc_numb = ac.invc_numb and a.prnt_idcd = ac.line_seqn	")
			.where("        left outer join boxx_acpt_bop   bp  on ac.acpt_numb = bp.invc_numb and a.wkct_idcd	= bp.wkct_idcd	")
			.where("        left outer join boxx_acpt      ba  on bp.invc_numb = ba.invc_numb									")
			.where("        left outer join wkct_mast   w  on a.wkct_idcd = w.wkct_idcd											")
			.where("        left outer join unit_mast   u  on (json_value(a.json_data , '$**.qntt_unit_idcd')) = u.unit_idcd	")
			.where("where   1=1																									")
			.where("and     a.invc_numb   = :invc_numb  " , arg.getParamText("invc_numb" ))
			.where("and     c.cstm_idcd   = :cstm_idcd  " , arg.getParamText("cstm_idcd" ))
			.where("and     a.fabc_idcd   = :fabc_idcd  " , arg.getParamText("fabc_idcd" ))
			.where("and     a.line_stat   = :line_stat  " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("and     a.plan_qntt <> 0																			")
			.where("order by a.invc_numb asc																			")
			;
		return data.selectForMap(page, rows, (page == 1));
	}


	public SqlResultMap getMaster3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.deli_date       , c.cstm_name       , a.prod_name       , a.item_leng							")
			.query("      , a.item_widh       , a.item_hght       , a.acpt_qntt       , a.invc_numb							")
			.query("      , a.cstm_idcd       , a.prod_idcd       , a.pcod_numb       , a.invc_date							")
			.query("      , (select sum(b.plan_qntt) from prod_plan_acpt b where a.invc_numb = b.acpt_numb)  as plan_qntt	")
			.query("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos							")
			.query("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif							")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd							")
			.query("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd							")
			.query("      , p.cvic_idcd       , v.cvic_name																	")
		;
		data.param
			.where("from    boxx_acpt a																						")
			.where("   left outer join cstm_mast     c on a.cstm_idcd = c.cstm_idcd											")
			.where("   left outer join product_mast  p on a.prod_idcd = p.prod_idcd											")
			.where("   left outer join cvic_mast     v on p.cvic_idcd = v.cvic_idcd											")
			.where("   left outer join    ( select invc_numb from boxx_acpt_bop 											")
			.where("                        where wkct_idcd in (:wkct_idcd) " , arg.getParamText("wkct_idcd"))
			.where("                        group by invc_numb) x    on a.invc_numb = x.invc_numb							")
			.where("where   1=1																								")
			.where("and     a.apvl_yorn =1																					")
			.where("and     a.line_clos not in ('1')																		")
			.where("and     x.invc_numb is not null																			")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParameter("invc_numb" ))
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     a.prod_idcd   = :prod_idcd       " , arg.getParamText("prod_idcd" ))
			.where("and     a.invc_date  >= :invc_date1      " , arg.getParamText("acpt_sttm1" ))
			.where("and     a.invc_date  <= :invc_date2      " , arg.getParamText("acpt_sttm2" ))
			.where("and     a.deli_date  >= :deli_date1      " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date  <= :deli_date2      " , arg.getParamText("deli_date2" ))
			.where("and     a.acpt_dvcd <> '4000'																					")
			.where("and     a.prod_qntt > 0																							")
			.where("and    0< ifnull(a.prod_qntt,0)																					")
			.where("        - ifnull((select sum(r.plan_qntt) from prod_plan_wkct r													")
			.where("                  left outer join prod_plan_acpt f on r.invc_numb = f.invc_numb and r.prnt_idcd = f.line_seqn	")
			.where("                  where f.acpt_numb = a.invc_numb																")
			.where("                  group by f.acpt_numb,r.prnt_idcd																")
			.where("                  limit 1																						")
			.where("      ),0)																										")
			.where("and     a.line_stat   = :line_stat       " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb  desc																				")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap getMaster4(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select  a.invc_numb as acpt_numb              , a.line_seqn as acpt_seqn    , w.wkct_name				")
			.where("      , u.unit_name       , a.plan_qntt       , w.wkct_stnm       , a.wkun_dvcd							")
			.where("      , b.prod_idcd       , a.wkct_idcd       , a.stnd_pric       , a.qntt_unit_idcd					")
			.where("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos							")
			.where("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif							")
			.where("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd							")
			.where("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd							")
			.where("      , ifnull(a.plan_qntt,0)																			")
			.where("        - ifnull((select sum(r.plan_qntt) from prod_plan_wkct r											")
			.where("                  left outer join prod_plan_acpt f on r.invc_numb = f.invc_numb and r.prnt_idcd = f.line_seqn	")
			.where("                  where f.acpt_numb = a.invc_numb and r.wkct_idcd = a.wkct_idcd							")
			.where("                  group by f.acpt_numb,r.wkct_idcd														")
			.where("      ),0) as not_qntt																					")
			.where("from    boxx_acpt_bop a																					")
			.where("   left outer join boxx_acpt       b  on a.invc_numb = b.invc_numb										")
			.where("   left outer join product_mast    pm on b.prod_idcd = pm.prod_idcd										")
			.where("   left outer join wkct_mast       w  on a.wkct_idcd      = w.wkct_idcd									")
			.where("   left outer join unit_mast       u  on a.qntt_unit_idcd = u.unit_idcd									")
			.where("where   1=1																								")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     c.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     a.fabc_idcd   = :fabc_idcd       " , arg.getParamText("fabc_idcd" ))
			.where("and     a.line_stat   = :line_stat       " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("group by a.wkct_idcd																					")
			.where(") a																										")
			.where("order by acpt_seqn asc																					")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String[] a = arg.getParamText("invc_numb").split(",");
		data.param
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  if(ifnull(a.offr_yorn,0) = 1, if(a.istt_yorn = 1,'입고','발주'), '수주') as dvcd					")
			.where("      , if(ifnull(a.offr_yorn,0) = 1, if(a.istt_yorn = 1, 3, 2), 1) as dvcd_numb					")
			.where("      , a.invc_numb       , a.line_seqn       , a.fabc_idcd       , a.ppln_dvcd						")
			.where("      , a.fabc_name       , a.item_leng       , a.item_widh       , a.item_fxqt						")
			.where("      , a.fdat_spec       , a.cstm_idcd       , c.cstm_name       , a.need_qntt						")
			.where("      , if(ifnull(a.offr_yorn,0) = 1,if(length(ifnull(a.cstm_idcd,''))>0, a.istt_date, a.offr_date), b.invc_date) as invc_date")
			.where("from    boxx_acpt_bom a																				")
			.where("   right outer join (select acpt_numb,invc_numb from prod_plan_acpt group by acpt_numb,invc_numb) p on p.acpt_numb = a.invc_numb		")
			.where("   left outer join boxx_acpt      b on a.invc_numb = b.invc_numb									")
			.where("   left outer join fabc_mast      f on a.fabc_idcd = f.fabc_idcd									")
			.where("   left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																							")
		;
		if(a.length>0){
			data.param
				.where("and     p.invc_numb   in(")
			;
			for (int i = 0; i < a.length; i++) {
				if(i==0){
					data.param
						.where(":a"+i,a[i]);
					;
				}else{
					data.param
						.where(",:a"+i,a[i]);
					;
				}
				;
			}
			data.param
				.where(")")
			;
		}
		data.param
			.where("and     a.line_stat   = :line_stat       " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getDetail2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize																" )
		;
		data.param
			.where("select  MAX(CASE WHEN wkct_idcd = 'WT012' THEN plan_qntt END) AS plan_qntt_01 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT003' THEN plan_qntt END) AS plan_qntt_02 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT013' THEN plan_qntt END) AS plan_qntt_03 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT004' THEN plan_qntt END) AS plan_qntt_04 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT005' THEN plan_qntt END) AS plan_qntt_05 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT014' THEN plan_qntt END) AS plan_qntt_06 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT015' THEN plan_qntt END) AS plan_qntt_07 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT012' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_01 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT003' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_02 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT013' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_03 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT004' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_04 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT005' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_05 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT014' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_06 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT015' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_07 	")
			.where("from    boxx_acpt_bop a																	")
			.where("        left outer join boxx_acpt_bom b on a.invc_numb = b.invc_numb 					")
			.where("where   a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  if(ifnull(a.offr_yorn,0) = 1, if(a.istt_yorn = 1,'입고','발주'), '수주') as dvcd					")
			.where("      , if(ifnull(a.offr_yorn,0) = 1, if(a.istt_yorn = 1, 3, 2), 1) as dvcd_numb					")
			.where("      , a.invc_numb       , a.line_seqn       , a.fabc_idcd       , a.ppln_dvcd						")
			.where("      , a.fabc_name       , a.item_leng       , a.item_widh       , a.item_fxqt						")
			.where("      , a.fdat_spec       , a.cstm_idcd       , c.cstm_name       , a.need_qntt						")
			.where("      , if(ifnull(a.offr_yorn,0) = 1,if(length(ifnull(a.cstm_idcd,''))>0, a.istt_date, a.offr_date), b.invc_date) as invc_date")
			.where("from    boxx_acpt_bom a																				")
			.where("   left outer join boxx_acpt      b on a.invc_numb = b.invc_numb									")
			.where("   left outer join fabc_mast      f on a.fabc_idcd = f.fabc_idcd									")
			.where("   left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																							")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   = :line_stat       " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail4(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																				" )
		;
		data.param
			.where("select  MAX(CASE WHEN wkct_idcd = 'WT012' THEN plan_qntt END) AS plan_qntt_01 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT003' THEN plan_qntt END) AS plan_qntt_02 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT013' THEN plan_qntt END) AS plan_qntt_03 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT004' THEN plan_qntt END) AS plan_qntt_04 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT005' THEN plan_qntt END) AS plan_qntt_05 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT014' THEN plan_qntt END) AS plan_qntt_06 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT015' THEN plan_qntt END) AS plan_qntt_07 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT012' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_01 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT003' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_02 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT013' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_03 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT004' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_04 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT005' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_05 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT014' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_06 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = 'WT015' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_07 	")
			.where("from    boxx_acpt_bop a																			")
			.where("        left outer join boxx_acpt_bom b on a.invc_numb = b.invc_numb 							")
			.where("where   a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			;
			return data.selectForMap();
		}

	public SqlResultMap getWrite(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String a = (String) arg.getParameter("invc_numb");
		a = a.replace("[", "");
		a = a.replace("]", "");
		a = a.replaceAll("\"", "");
		String[] b = a.split(",");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  @curRank:=@curRank+1 as seqn																	")
			.query("      , a.plan_sttm       , c.cstm_name       , p.prod_name       , b.item_leng							")
			.query("      , b.item_widh       , b.item_hght       , a.invc_numb												")

		;
		data.param
			.where("from   prod_plan a																						")
			.where("   left outer join cstm_mast    c on a.cstm_idcd = c.cstm_idcd											")

			.where("   left outer join    ( select invc_numb,acpt_numb,line_seqn 											")
			.where("                        from prod_plan_acpt																")
			.where("                        group by invc_numb , acpt_numb													")
			.where("                      ) ac on a.invc_numb = ac.invc_numb												")
			.where("   left outer join boxx_acpt    b    on ac.acpt_numb = b.invc_numb										")
			.where("   left outer join product_mast p on a.item_idcd = p.prod_idcd											")
			.where("   left outer join cvic_mast    v on p.cvic_idcd = v.cvic_idcd											")
			.where(",(select @curRank:=0) r 																				")
			.where("where  1=1																								")
			.where("and    ( 1 																								")
			.where("        and     a.invc_numb = :invc_numb" , b[0])
			.where(")																										")
		;
		for(int i = 1; i<b.length;i++){
			data.param
				.where("or")
				.where("(   1									")
				.where(" and a.invc_numb = :invc_numb"+i,b[i])
				.where(")										")
			;
		}
		data.param
			.where("order by seqn																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getWrite2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String a = (String) arg.getParameter("invc_numb");
		a = a.replace("[", "");
		a = a.replace("]", "");
		a = a.replaceAll("\"", "");
		String[] b = a.split(",");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  @curRank:=@curRank+1 as seqn																	")
			.query("      , a.deli_date       , c.cstm_name       , a.prod_name       , a.item_leng							")
			.query("      , a.item_widh       , a.item_hght       , a.acpt_qntt       , a.invc_numb							")
			.query("      , a.prod_idcd       , a.cstm_idcd       , p.cvic_idcd       , v.cvic_name							")
			.query("      , (select sum(b.plan_qntt) from boxx_acpt_bop b where a.invc_numb = b.invc_numb)  as plan_qntt	")
			.query("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos							")
			.query("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif							")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd							")
			.query("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd							")
		;
		data.param
			.where("from   boxx_acpt a																						")
			.where("   left outer join cstm_mast    c on a.cstm_idcd = c.cstm_idcd											")
			.where("   left outer join product_mast p on a.prod_idcd = p.prod_idcd											")
			.where("   left outer join cvic_mast    v on p.cvic_idcd = v.cvic_idcd											")
			.where(",(select @curRank:=0) r 																				")
			.where("where  1=1																								")
			.where("and    ( 1 																								")
			.where("        and     a.invc_numb = :invc_numb" , b[0])
			.where(")																										")
		;
		for(int i = 1; i<b.length;i++){
			data.param
				.where("or")
				.where("(   1									")
				.where(" and a.invc_numb = :invc_numb"+i,b[i])
				.where(")										")
			;
		}
		data.param
			.where("order by seqn																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getWriteBop(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String a = (String) arg.getParameter("invc_numb");
		a = a.replace("[", "");
		a = a.replace("]", "");
		a = a.replaceAll("\"", "");
		String[] b = a.split(",");
		data.param // 집계문  입력
			.query("select a.wkct_idcd,w.wkct_name,a.cvic_idcd,c.cvic_name		")

			.where("from  pror_item a					")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd					")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd					")

			.where("where  1=1																	")
			.where("and    ( 1 																	")
			.where("        and     a.orig_invc_numb = :invc_numb" , b[0])
			.where(")																			")
		;
		for(int i = 1; i<b.length;i++){
			data.param
				.where("or")
				.where("(   1									")
				.where(" and a.orig_invc_numb = :invc_numb"+i,b[i])
				.where(")										")
			;
		}
		data.param
			.where("group by a.wkct_idcd														")
		;
		return data.selectForMap();
	}

	public SqlResultMap getWriteBop2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		SqlResultMap map	= arg.getParameter("records", SqlResultMap.class);
		ParamToJson parse	= new ParamToJson();
		String param		= parse.TranslateRowRec(map, "", "invc_numb");
		data.param // 집계문  입력
			.query("call prod_plan_list(")
			.query("    :param", param)
			.query(")")
		;
		return data.selectForMap();
	}

	public SqlResultMap getWkct_Insp_Seqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(Max(invc_seqn),0)+1 as invc_seqn											")
		;
		data.param
			.where("from prod_plan_wkct a																	")
			.where("where   1=1																			")
			.where("and     a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"					))

		;
		return data.selectForMap();
	}

	public SqlResultMap setWrite(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String param = parse.TranslateGantt(arg, map,"invc,rank","cvic_idcd,wkct_idcd");
//
		data.param // 집계문  입력
			.query("call work_prod_create4(	")
			.query("   :param "       , param)
			.query(")						")
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}

	public SqlResultMap setWrite3(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String param = parse.TranslateGantt(arg, map,"invc","invc_numb,plan_sttm,plan_qntt,cvic_idcd,line_seqn");


		data.param // 집계문  입력
			.query("call work_prod_create3(	")
			.query("   :param "       , param)
			.query(")						")
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		System.out.println(arg.getParamText("param"));
		data.param
			.query("call prod_plan_delete (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setWrite2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		ParamToJson parse	= new ParamToJson();
		String param		= parse.TranslateGantt(arg, map, "plan_sttm", "invc_numb");

		data.param // 집계문  입력
			.query("call work_prod_create2_all(")
			.query("   :param "       , param)
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap getTotal(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String[] a = arg.getParamText("invc_numb").split(",");
		data.param
			.query("select   a.wkct_idcd    , sum(plan_qntt) as plan_qntt       ")
			.query("       , sum(plan_qntt*pqty_mxm2)        as mxm2            ")
			.query("       , REPLACE(w.wkct_name,' ','')     as wkct_name       ")
		;
		data.param
			.where("from prod_plan_wkct a										")
			.where("left outer join product_mast b on a.item_idcd = b.prod_idcd	")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd	")
			.where("where   1=1													")
		;
		if(a.length>0){
			data.param
				.where("and     a.invc_numb   in(")
			;
			for (int i = 0; i < a.length; i++) {
				if(i==0){
					data.param
						.where(":a"+i,a[i]);
					;
				}else{
					data.param
						.where(",:a"+i,a[i]);
					;
				}
				;
			}
			data.param
				.where(")")
			;
		}
		data.param
			.where("group by wkct_idcd											")
		;
		return data.selectForMap();
	}
}
