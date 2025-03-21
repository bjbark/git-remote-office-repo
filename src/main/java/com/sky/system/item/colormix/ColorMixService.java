package com.sky.system.item.colormix;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class ColorMixService extends DefaultServiceHandler{

	// search
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		if(arg.getParamText("kg").equals("on")){
			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select																							")
				.query("        a.prnt_item_idcd     , a.colr_bacd         , a.colr_name          , a.dwup_date			")
				.query("      , a.item_idcd          , a.item_name														")
				.query("      , if(unit_perc_wigt='' or unit_perc_wigt is null,0,1) as unit_perc_wigt  , a.wigt_unit	")
				.query("      , a.need_time          , a.chge_degr														")
				.query("      , i.item_code as prnt_item_code              , i.item_name as prnt_item_name				")
				.query("      , a.sysm_memo          , a.prnt_idcd         , a.user_memo          , a.line_ordr			")
				.query("      , a.line_stat          , a.line_clos         , a.find_name          , a.updt_user_name	")
				.query("      , a.updt_ipad          , a.updt_dttm         , a.updt_idcd          , a.updt_urif			")
				.query("      , a.crte_user_name     , a.crte_ipad         , a.crte_dttm          , a.crte_idcd			")
				.query("      , a.line_levl          , a.crte_urif														")
			;
			data.param //퀴리문
				.where("from mix_mast a																					")
				.where("left outer join item_mast i on a.prnt_item_idcd = i.item_idcd									")
				.where("where 1=1																						")
				.where("and i.find_name	like %:find_name%	" , arg.getParameter("find_name"))
				.where("and a.dwup_date  >= :dwup_date1		" , arg.getParamText("dwup_date1" ))
				.where("and a.dwup_date  <= :dwup_date2		" , arg.getParamText("dwup_date2" ))
				.where("and a.prnt_item_idcd =:prnt_item_idcd", arg.getParamText("prnt_item_idcd"))
				.where("and a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("order by a.prnt_item_idcd																		")
			;
		}else{
			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select																							")
				.query("        a.prnt_item_idcd     , a.colr_bacd         , a.colr_name          , a.dwup_date			")
				.query("      , a.item_idcd          , a.item_name         , a.unit_perc_wigt     , a.wigt_unit			")
				.query("      , a.need_time          , a.chge_degr														")
				.query("      , i.item_code as prnt_item_code              , i.item_name as prnt_item_name				")
				.query("      , a.sysm_memo          , a.prnt_idcd         , a.user_memo          , a.line_ordr			")
				.query("      , a.line_stat          , a.line_clos         , a.find_name          , a.updt_user_name	")
				.query("      , a.updt_ipad          , a.updt_dttm         , a.updt_idcd          , a.updt_urif			")
				.query("      , a.crte_user_name     , a.crte_ipad         , a.crte_dttm          , a.crte_idcd			")
				.query("      , a.line_levl          , a.crte_urif														")
			;
			data.param //퀴리문
				.where("from mix_mast a																					")
				.where("left outer join item_mast i on a.prnt_item_idcd = i.item_idcd									")
				.where("where 1=1																						")
				.where("and i.find_name	like %:find_name%	" , arg.getParameter("find_name"))
				.where("and a.dwup_date  >= :dwup_date1		" , arg.getParamText("dwup_date1" ))
				.where("and a.dwup_date  <= :dwup_date2		" , arg.getParamText("dwup_date2" ))
				.where("and a.prnt_item_idcd =:prnt_item_idcd", arg.getParamText("prnt_item_idcd"))
				.where("and a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("order by a.prnt_item_idcd																		")
			;
		}
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// 조회
	public SqlResultMap getItem(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("kg").equals("on")){
			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.prnt_item_idcd     , a.line_seqn         , a.item_idcd as detail_item_idcd					")
				.query("        , a.item_name as detail_item_name																")
				.query("        , if(a.wigt_unit='%', a.unit_perc_wigt , ifnull(a.unit_perc_wigt,0)/b.unit_perc_wigt ) as detail_unit_perc_wigt	")
				.query("        , a.wigt_unit as detail_wigt_unit            , a.chge_degr as detail_chge_degr					")
				.query("        , a.sysm_memo          , a.prnt_idcd         , a.user_memo          , a.line_ordr				")
				.query("        , a.line_stat          , a.line_clos         , a.find_name          , a.updt_user_name			")
				.query("        , a.updt_ipad          , a.updt_dttm         , a.updt_idcd          , a.updt_urif				")
				.query("        , a.crte_user_name     , a.crte_ipad         , a.crte_dttm          , a.crte_idcd				")
				.query("        , a.line_levl          , a.crte_urif															")
			;
			data.param //퀴리문
				.where("from mix_item a																							")
				.where("left outer join mix_mast b on a.prnt_item_idcd = b.prnt_item_idcd	and a.chge_degr = b.chge_degr		")
				.where("where 1=1																								")
				.where("and a.prnt_item_idcd = :prnt_item_idcd" , arg.getParameter("prnt_item_idcd"))
				.where("and a.chge_degr      = :chge_degr"      , arg.getParameter("chge_degr"))
				.where("and a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("order by a.line_seqn																					")
			;
		}else{
			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.prnt_item_idcd     , a.line_seqn         , a.item_idcd as detail_item_idcd					")
				.query("        , a.item_name as detail_item_name            , a.unit_perc_wigt as detail_unit_perc_wigt		")
				.query("        , a.wigt_unit as detail_wigt_unit            , a.chge_degr as detail_chge_degr					")
				.query("        , a.sysm_memo          , a.prnt_idcd         , a.user_memo          , a.line_ordr				")
				.query("        , a.line_stat          , a.line_clos         , a.find_name          , a.updt_user_name			")
				.query("        , a.updt_ipad          , a.updt_dttm         , a.updt_idcd          , a.updt_urif				")
				.query("        , a.crte_user_name     , a.crte_ipad         , a.crte_dttm          , a.crte_idcd				")
				.query("        , a.line_levl          , a.crte_urif															")
			;
			data.param //퀴리문
				.where("from mix_item a																							")
				.where("where 1=1																								")
				.where("and a.prnt_item_idcd = :prnt_item_idcd" , arg.getParameter("prnt_item_idcd"))
				.where("and a.chge_degr      = :chge_degr"      , arg.getParameter("chge_degr"))
				.where("and a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("order by a.line_seqn																					")
			;
		}
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// detail
	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("kg").equals("on")){
			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.prnt_item_idcd     , a.line_seqn         , a.item_idcd as detail_item_idcd					")
				.query("        , a.item_name as detail_item_name																")
				.query("        , if(a.wigt_unit='%', a.unit_perc_wigt , ifnull(a.unit_perc_wigt,0)/b.unit_perc_wigt ) as detail_unit_perc_wigt	")
				.query("        , a.wigt_unit as detail_wigt_unit            , a.chge_degr as detail_chge_degr					")
				.query("        , a.sysm_memo          , a.prnt_idcd         , a.user_memo          , a.line_ordr				")
				.query("        , a.line_stat          , a.line_clos         , a.find_name          , a.updt_user_name			")
				.query("        , a.updt_ipad          , a.updt_dttm         , a.updt_idcd          , a.updt_urif				")
				.query("        , a.crte_user_name     , a.crte_ipad         , a.crte_dttm          , a.crte_idcd				")
				.query("        , a.line_levl          , a.crte_urif															")
			;
			data.param //퀴리문
				.where("from mix_item a																							")
				.where("left outer join mix_mast b on a.prnt_item_idcd = b.prnt_item_idcd	and a.chge_degr = b.chge_degr		")
				.where("where 1=1																								")
				.where("and a.prnt_item_idcd = :prnt_item_idcd" , arg.getParameter("prnt_item_idcd"))
				.where("and a.chge_degr      = :chge_degr"      , arg.getParameter("chge_degr"))
				.where("and a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("order by a.line_seqn																					")
			;
		}else{
			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.prnt_item_idcd     , a.line_seqn         , a.item_idcd as detail_item_idcd					")
				.query("        , a.item_name as detail_item_name            , a.unit_perc_wigt as detail_unit_perc_wigt		")
				.query("        , a.wigt_unit as detail_wigt_unit            , a.chge_degr as detail_chge_degr					")
				.query("        , a.sysm_memo          , a.prnt_idcd         , a.user_memo          , a.line_ordr				")
				.query("        , a.line_stat          , a.line_clos         , a.find_name          , a.updt_user_name			")
				.query("        , a.updt_ipad          , a.updt_dttm         , a.updt_idcd          , a.updt_urif				")
				.query("        , a.crte_user_name     , a.crte_ipad         , a.crte_dttm          , a.crte_idcd				")
				.query("        , a.line_levl          , a.crte_urif															")
			;
			data.param //퀴리문
				.where("from mix_item a																							")
				.where("where 1=1																								")
				.where("and a.prnt_item_idcd = :prnt_item_idcd" , arg.getParameter("prnt_item_idcd"))
				.where("and a.chge_degr      = :chge_degr"      , arg.getParameter("chge_degr"))
				.where("and a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("order by a.line_seqn																					")
			;
		}
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as line_seqn																")
		;
		data.param
			.where("from mix_mast a   																			")
			.where("where 1=1																					")
			.where("and a.prnt_item_idcd = :prnt_item_idcd " , arg.getParameter("prnt_item_idcd"))
			.where("and a.line_stat = 0																			")
		;
		return data.selectForMap();
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				data.param
					.table("mix_mast")
					.where("where prnt_item_idcd = :prnt_item_idcd	")
					.where("and   chge_degr      = :chge_degr		")

					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"		))
					.unique("chge_degr"			, row.fixParameter("chge_degr"			))
				;data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("mix_item")
					.where("where prnt_item_idcd = :prnt_item_idcd	")
					.where("and   chge_degr      = :chge_degr		")

					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"		))
					.unique("chge_degr"			, row.fixParameter("chge_degr"			))
				;data.attach(Action.delete);
				data.execute();

			} else {
				data.param
					.table("mix_mast")
					.where("where prnt_item_idcd = :prnt_item_idcd	")
					.where("and   chge_degr      = :chge_degr		")

					.unique("prnt_item_idcd"		, row.fixParameter("prnt_item_idcd"	))
					.unique("chge_degr"				, row.fixParameter("chge_degr"		))

					.update("colr_bacd"				, row.getParameter("colr_bacd"		))
					.update("colr_name"				, row.getParameter("colr_name"		))
					.update("dwup_date"				, row.getParameter("dwup_date"		))
					.update("item_idcd"				, row.getParameter("item_idcd"		))
					.update("item_name"				, row.getParameter("item_name"		))
					.update("unit_perc_wigt"		, row.getParameter("unit_perc_wigt"	))
					.update("wigt_unit"				, row.getParameter("wigt_unit"		))
					.update("need_time"				, row.getParameter("need_time"		))
					.update("user_memo"				, row.getParameter("user_memo"		))

					.update("find_name"				, row.fixParameter("prnt_item_idcd"	)
													+ " "
													+ row.getParameter("item_name"		))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setItem(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mix_item"													)
					.where("where prnt_item_idcd = :prnt_item_idcd						")  /*  부모품목ID  */
					.where("and   line_seqn      = :line_seqn							")  /*  순번  */
					.where("and   chge_degr      = :chge_degr							")  /*  차수  */
					//
					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"				))
					.unique("chge_degr"			, row.fixParameter("chge_degr"				))

				;data.attach(Action.delete);

			} else {
				data.param
					.table("mix_item"														)
					.where("where prnt_item_idcd = :prnt_item_idcd							")  /*  부모품목ID  */
					.where("and   line_seqn      = :line_seqn								")  /*  순번  */
					.where("and   chge_degr      = :chge_degr								")  /*  순번  */
					//
					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"				))
					.unique("chge_degr"			, row.fixParameter("chge_degr"				))
					//
					.update("item_idcd"			, row.getParameter("detail_item_idcd"		))  /*  품목ID  */
					.update("item_name"			, row.getParameter("detail_item_name"		))  /*  품목명  */
					.update("unit_perc_wigt"	, row.getParameter("detail_unit_perc_wigt"	))  /*  단위당중량  */
					.update("wigt_unit"			, row.getParameter("detail_wigt_unit"		))  /*  중량단위 */
					.update("find_name"			, row.fixParamText("prnt_item_idcd"			).trim()
												+ " "
												+ row.getParamText("detail_item_name"		).trim())

					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
