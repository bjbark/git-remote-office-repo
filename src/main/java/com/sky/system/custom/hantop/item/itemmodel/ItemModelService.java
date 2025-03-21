package com.sky.system.custom.hantop.item.itemmodel;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class ItemModelService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/* 브랜드 검색 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize														")
		;
		data.param
			.query("select a.brnd_bacd       , a.wdgr_idcd           , a.wndw_modl_idcd       , a.wndw_modl_code       , a.pdgr_bacd			")
			.query("     , a.modl_name       , a.wndw_spec           , a.wdbf_itid            , a.wdsf_itid            , a.wdbf_widh			")
			.query("     , a.wdsf_widh       , a.wdbf_rail_hght      , a.wdbf_hght            , a.wdsf_hght            , a.side_clmm			")
			.query("     , a.wdmc_tick       , a.glss_fixh_hght      , a.topp_clmm            , a.bttm_clmm            , a.wdmf_side_clmm		")
			.query("     , a.wdmf_topp_clmm  , a.wdmf_bttm_clmm      , a.ssbr_hght            , a.moss_rail_hght       , a.wdmf_hght			")
			.query("     , a.calc_frml       , a.wdbf_auto_cutt_yorn , a.wdbf_auto_weld_yorn  , a.wdsf_auto_cutt_yorn  , a.wdsf_auto_weld_yorn 	")
			.query("     , a.user_memo       , a.sysm_memo           , a.prnt_idcd            , a.line_levl            , a.line_ordr			")
			.query("     , a.line_stat       , a.line_clos           , a.find_name            , a.updt_user_name       , a.updt_ipad			")
			.query("     , a.updt_dttm       , a.updt_idcd           , a.updt_urif            , a.crte_user_name       , a.crte_ipad			")
			.query("     , a.crte_dttm       , a.crte_idcd           , a.crte_urif            , a.wdsf_rein_itid								")
			.query("     , a.wdmc_itid       , a.wdmf_itid           , a.wdgb_itid            , a.wdbf_rein_itid       , a.wdmf_rein_itid		")
			.query("     , i1.item_name as wdbf_item_name            , i2.item_name as wdsf_item_name                  , g.wdgr_name			")
			.query("     , b.base_name  as brnd_name                 , i3.item_name as wdmc_item_name											")
			.query("     , i4.item_name as wdmf_item_name            , i5.item_name as wdgb_item_name											")
			.query("     , i6.item_name as wdbf_rein_name            , i7.item_name as wdsf_rein_name											")
			.query("     , c.base_name as pdgr_name	                 , a.athd_csvl            , a.mnhd_csvl										")
		;
		data.param //퀴리문
			.where("from     wind_item_modl a													")
			.where("         left outer join item_mast i1 on a.wdbf_itid = i1.item_idcd			")
			.where("         left outer join item_mast i2 on a.wdsf_itid = i2.item_idcd			")
			.where("         left outer join item_mast i3 on a.wdmc_itid = i3.item_idcd			")
			.where("         left outer join item_mast i4 on a.wdmf_itid = i4.item_idcd			")
			.where("         left outer join item_mast i5 on a.wdgb_itid = i5.item_idcd			")
			.where("         left outer join item_mast i6 on a.wdbf_rein_itid = i6.item_idcd	")
			.where("         left outer join item_mast i7 on a.wdsf_rein_itid = i7.item_idcd	")
			.where("         left outer join wind_grop  g on a.wdgr_idcd      = g.wdgr_idcd		")
			.where("         left outer join ( select * 										")
			.where("                           from base_mast 									")
			.where("                           where prnt_idcd ='4000'							")
			.where("                           and   line_stat < 2								")
			.where("                         ) b on a.brnd_bacd = b.base_code					")
			.where("         left outer join ( select * 										")
			.where("                           from base_mast 									")
			.where("                           where prnt_idcd ='3101'							")
			.where("                           and   line_stat < 2								")
			.where("                         ) c on a.pdgr_bacd = c.base_code					")
			.where("where    1=1																")
			.where("and      a.brnd_bacd = :brnd_bacd", arg.getParameter("brnd_bacd"))
			.where("and      a.wdgr_idcd = :wdgr_idcd", arg.getParameter("wdgr_idcd"))
			.where("and      a.wndw_itid = :wndw_itid", arg.getParameter("wndw_itid"))
			.where("and      a.wndw_modl_idcd = :wndw_modl_idcd", arg.getParameter("wndw_modl_idcd"))
			.where("and      a.wndw_modl_code = :wndw_modl_code", arg.getParameter("wndw_modl_code"))
			.where("and      a.find_name  like %:find_name%	", arg.getParameter("find_name"))
			.where("and      a.line_stat	< :line_stat		", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.wndw_modl_code											")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/* 룩업 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
		.total("select count(1) as maxsize														")
		;
		data.param
		.query("select a.brnd_bacd       , a.wdgr_idcd           , a.wndw_modl_idcd       , a.wndw_modl_code       , a.pdgr_bacd			")
		.query("     , a.modl_name       , a.wndw_spec           , a.wdbf_itid            , a.wdsf_itid            , a.wdbf_widh			")
		.query("     , a.wdsf_widh       , a.wdbf_rail_hght      , a.wdbf_hght            , a.wdsf_hght            , a.side_clmm			")
		.query("     , a.wdmc_tick       , a.glss_fixh_hght      , a.topp_clmm            , a.bttm_clmm            , a.wdmf_side_clmm		")
		.query("     , a.wdmf_topp_clmm  , a.wdmf_bttm_clmm      , a.ssbr_hght            , a.moss_rail_hght       , a.wdmf_hght			")
		.query("     , a.calc_frml       , a.wdbf_auto_cutt_yorn , a.wdbf_auto_weld_yorn  , a.wdsf_auto_cutt_yorn  , a.wdsf_auto_weld_yorn 	")
		.query("     , a.user_memo       , a.sysm_memo           , a.prnt_idcd            , a.line_levl            , a.line_ordr			")
		.query("     , a.line_stat       , a.line_clos           , a.find_name            , a.updt_user_name       , a.updt_ipad			")
		.query("     , a.updt_dttm       , a.updt_idcd           , a.updt_urif            , a.crte_user_name       , a.crte_ipad			")
		.query("     , a.crte_dttm       , a.crte_idcd           , a.crte_urif            , a.wdsf_rein_itid								")
		.query("     , a.wdmc_itid       , a.wdmf_itid           , a.wdgb_itid            , a.wdbf_rein_itid								")
		.query("     , i1.item_name as wdbf_item_name            , i2.item_name as wdsf_item_name                  , g.wdgr_name			")
		.query("     , b.base_name  as brnd_name                 , i3.item_name as wdmc_item_name											")
		.query("     , i4.item_name as wdmf_item_name            , i5.item_name as wdgb_item_name											")
		.query("     , i6.item_name as wdbf_rein_name            , i7.item_name as wdsf_rein_name											")
		.query("     , c.base_name as pdgr_name																								")
		;
		data.param //퀴리문
		.where("from     wind_item_modl a													")
		.where("         left outer join item_mast i1 on a.wdbf_itid = i1.item_idcd			")
		.where("         left outer join item_mast i2 on a.wdsf_itid = i2.item_idcd			")
		.where("         left outer join item_mast i3 on a.wdmc_itid = i3.item_idcd			")
		.where("         left outer join item_mast i4 on a.wdmf_itid = i4.item_idcd			")
		.where("         left outer join item_mast i5 on a.wdgb_itid = i5.item_idcd			")
		.where("         left outer join item_mast i6 on a.wdbf_rein_itid = i6.item_idcd	")
		.where("         left outer join item_mast i7 on a.wdsf_rein_itid = i7.item_idcd	")
		.where("         left outer join wind_grop  g on a.wdgr_idcd      = g.wdgr_idcd		")
		.where("         left outer join ( select * 										")
		.where("                           from base_mast 									")
		.where("                           where prnt_idcd ='4000'							")
		.where("                           and   line_stat < 2								")
		.where("                         ) b on a.brnd_bacd = b.base_code					")
		.where("         left outer join ( select * 										")
		.where("                           from base_mast 									")
		.where("                           where prnt_idcd ='3101'							")
		.where("                           and   line_stat < 2								")
		.where("                         ) c on a.pdgr_bacd = c.base_code					")
		.where("where    1=1																")
		.where("and      a.brnd_bacd = :brnd_bacd", arg.getParameter("brnd_bacd"))
		.where("and      a.wdgr_idcd = :wdgr_idcd", arg.getParameter("wdgr_idcd"))
		.where("and      a.wndw_itid = :wndw_itid", arg.getParameter("wndw_itid"))
		.where("and      a.wndw_modl_idcd = :wndw_modl_idcd", arg.getParameter("wndw_modl_idcd"))
		.where("and      a.wndw_modl_code = :wndw_modl_code", arg.getParameter("wndw_modl_code"))
		.where("and      a.find_name  like %:find_name%	", arg.getParameter("find_name"))
		.where("and      a.line_stat	< :line_stat		", "2")
		.where("order by a.wndw_modl_code											")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	/* 브랜드 검색 */
	public SqlResultMap getBrand(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize											 					")
		;
		data.param
			.query("select a.base_name as brnd_name , a.base_code as brnd_bacd, a.base_idcd	as brnd_idcd	")
		;
		data.param //퀴리문
			.where("from 		base_mast a																	")
			.where("where		1=1																			")
			.where("and			prnt_idcd = '4000'															")
			.where("and			a.line_stat	< :line_stat						", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.base_code																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/* 창호그룹조회 */
	public SqlResultMap getWdgr(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize														")
		;
		data.param
			.query("select a.wdgr_idcd, a.wdgr_code, a.wdgr_name									")
		;
		data.param //퀴리문
			.where("from 		wind_grop a															")
			.where("where		1=1																	")
			.where("and			a.line_stat	< :line_stat			", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by wdgr_code																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	/*  */
	public SqlResultMap getWind_Item(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select     a.wndw_itid     , a.wdgr_idcd     , a.wndw_item_code     , a.wndw_item_name	")
		;
		data.param //퀴리문
			.where("from 		wind_item a																		")
			.where("where		1=1																				")
			.where("and			a.wdgr_idcd	= :wdgr_idcd			",arg.getParamText("wdgr_idcd"))
			.where("and			a.line_stat	< :line_stat			", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by wndw_item_code																			")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	/* 창호그룹조회 */
	public SqlResultMap getModl_Code_Chek(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(wndw_modl_idcd) as cnt															")
		;
		data.param //퀴리문
			.where("from 		wind_item_modl a																")
			.where("where		a.wndw_modl_code	= :wndw_modl_code			",arg.getParamText("wndw_modl_code"))
		;
		return data.selectForMap();
	}

	public SqlResultMap setItem(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");

		data.param
			.query("call wind_item_append()	")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wind_item_modl												")
					.where("where brnd_bacd			= :brnd_bacd							")
					.where("and   wdgr_idcd			= :wdgr_idcd							")
					.where("and   wndw_modl_idcd	= :wndw_modl_idcd							")

					.unique("brnd_bacd"			, row.fixParameter("brnd_bacd"			))	//브랜드분류코드
					.unique("wdgr_idcd"			, row.fixParameter("wdgr_idcd"			))	//창호그룹ID
					.unique("wndw_modl_idcd"	, row.fixParameter("wndw_modl_idcd"		))	//창호모델ID


					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					;data.attach(Action.update)
				;
			}else{
				data.param
					.table("wind_item_modl												")
					.where("where brnd_bacd			= :brnd_bacd							")
					.where("and   wdgr_idcd			= :wdgr_idcd							")
					.where("and   wndw_modl_idcd	= :wndw_modl_idcd							")

					.unique("brnd_bacd"				, row.fixParameter("brnd_bacd"			))	//브랜드분류코드
					.unique("wdgr_idcd"				, row.fixParameter("wdgr_idcd"			))	//창호그룹ID
					.unique("wndw_modl_idcd"		, row.fixParameter("wndw_modl_idcd"		))	//창호모델ID
					//
					.update("wndw_modl_code"		, row.getParameter("wndw_modl_code"			))	//창호모델코드
					.update("modl_name"				, row.getParameter("modl_name"				))	//모델명
					.update("pdgr_bacd"				, row.getParameter("pdgr_bacd"				))	//제품군분류코드
					.update("wndw_spec"				, row.getParameter("wndw_spec"				))	//창호규격
					.update("wdbf_itid"				, row.getParameter("wdbf_itid"				))	//BF품목ID
					.update("wdsf_itid"				, row.getParameter("wdsf_itid"				))	//SF품목ID
					.update("wdmc_itid"				, row.getParameter("wdmc_itid"				))	//MC품목ID
					.update("wdmf_itid"				, row.getParameter("wdmf_itid"				))	//MF품목ID
					.update("wdgb_itid"				, row.getParameter("wdgb_itid"				))	//GB품목ID
					.update("wdbf_rein_itid"		, row.getParameter("wdbf_rein_itid"			))	//BF보강재ID
					.update("wdsf_rein_itid"		, row.getParameter("wdsf_rein_itid"			))	//SF보강재ID
					.update("wdbf_widh"				, row.getParameter("wdbf_widh"				))	//BF폭
					.update("wdsf_widh"				, row.getParameter("wdsf_widh"				))	//SF폭
					.update("wdbf_rail_hght"		, row.getParameter("wdbf_rail_hght"			))	//BF레일높이
					.update("wdbf_hght"				, row.getParameter("wdbf_hght"				))	//BF높이
					.update("wdsf_hght"				, row.getParameter("wdsf_hght"				))	//SF높이
					.update("side_clmm"				, row.getParameter("side_clmm"				))	//걸림치수
					.update("wdmc_tick"				, row.getParameter("wdmc_tick"				))	//MC두께
					.update("glss_fixh_hght"		, row.getParameter("glss_fixh_hght"			))	//유리고정턱높이
					.update("topp_clmm"				, row.getParameter("topp_clmm"				))	//상부걸림치수
					.update("bttm_clmm"				, row.getParameter("bttm_clmm"				))	//하부걸림치수
					.update("wdmf_side_clmm"		, row.getParameter("wdmf_side_clmm"			))	//MF측부걸림치수
					.update("wdmf_topp_clmm"		, row.getParameter("wdmf_topp_clmm"			))	//MF상부걸림치수
					.update("wdmf_bttm_clmm"		, row.getParameter("wdmf_bttm_clmm"			))	//MF하부걸림치수
					.update("ssbr_hght"				, row.getParameter("ssbr_hght"				))	//SS바높이
					.update("moss_rail_hght"		, row.getParameter("moss_rail_hght"			))	//방충망레일높이
					.update("wdmf_hght"				, row.getParameter("wdmf_hght"				))	//MF높이
					.update("calc_frml"				, row.getParameter("calc_frml"				))	//계산공식
					.update("wdbf_auto_cutt_yorn"	, row.getParameter("wdbf_auto_cutt_yorn"	))	//BF자동절단여부
					.update("wdbf_auto_weld_yorn"	, row.getParameter("wdbf_auto_weld_yorn"	))	//BF자동용접여부
					.update("wdsf_auto_cutt_yorn"	, row.getParameter("wdsf_auto_cutt_yorn"	))	//SF자동절단여부
					.update("wdsf_auto_weld_yorn"	, row.getParameter("wdsf_auto_weld_yorn"	))	//SF자동용접여부
					.update("athd_csvl"				, row.getParameter("athd_csvl"				))	//자동핸들보정값
					.update("mnhd_csvl"				, row.getParameter("mnhd_csvl"				))	//수동핸들보정값

					.update("user_memo"				, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"				, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"				, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"				, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"				, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"				, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"				, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"				, row.getParamText("wndw_modl_code"		).trim()
													+ " "
													+ row.getParamText("modl_name"			).trim())	//찾기명
					.update("updt_user_name"		, row.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"				, row.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"				, row.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"				, row.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"		, row.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"				, row.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"				, row.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"				, row.getParameter("crte_urif"			))	//생성UI
					;
				data.attach(rowaction);
			}
			data.execute();
			data.clear();
		}
		return null ;
	}
}



