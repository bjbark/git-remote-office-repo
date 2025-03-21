package com.sky.system.custom.dehansol.item.salepricework;

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
import com.sky.listener.ParamToJson;

@Service("dehansol.SalePriceWorkService")
public class SalePriceWorkService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																	" )
		;
		data.param
			.query("select    a.item_idcd        , a.cstm_idcd   , a.item_make_dvcd  , a.item_type_dvcd			")
			.query("		, a.mesh_name        , a.diag_sqre   , a.item_spec       , a.plmk_size_horz			")
			.query("		, a.plmk_size_vrtl   , a.dict_yorn   , a.unit_idcd       , a.sale_pric				")
			.query("		, a.line_stat        , a.line_clos   , a.find_name       , a.updt_user_name			")
			.query("		, a.updt_ipad        , a.updt_dttm   , a.updt_idcd       , a.updt_urif				")
			.query("		, a.crte_user_name   , a.crte_ipad   , a.crte_dttm       , a.crte_idcd				")
			.query("		, a.crte_urif        , c.cstm_name   , u.unit_name       , a.mesh_ndqt				")
			.query("		, a.invc_date																		")
			;
		data.param //퀴리문
			.where("from	sale_pric a																			")
			.where("		left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd							")
			.where("		left outer join unit_mast u on a.unit_idcd = u.unit_idcd							")
			.where("where   1=1																					")
			.where("and	    a.find_name	like %:find_name%	" , arg.getParameter("find_name"))
			.where("and     a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and     a.item_make_dvcd =:item_make_dvcd"  , arg.getParamText("item_make_dvcd"))
			.where("and     a.item_type_dvcd =:item_type_dvcd"  , arg.getParamText("item_type_dvcd"))
			.where("and     a.invc_date	  >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("and     a.invc_date	  <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order   by	a.item_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("sale_pric")
					.where("where item_idcd  = :item_idcd")
					.where("and   cstm_idcd  = :cstm_idcd")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"		))
				;data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("item_mast")
					.where("where item_idcd      = :item_idcd	")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
				;data.attach(Action.delete);
				data.execute();

			} else {
				data.param
					.table("sale_pric")
					.where("where item_idcd	= :item_idcd" )
					.where("and   cstm_idcd  = :cstm_idcd")

					.unique("item_idcd"			, row.fixParameter("item_idcd"))
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"))

					.update("item_make_dvcd"	, row.getParameter("item_make_dvcd"))
					.update("item_type_dvcd"	, row.getParameter("item_type_dvcd"))
					.update("mesh_name"			, row.getParameter("mesh_name"))
					.update("diag_sqre"			, row.getParameter("diag_sqre"))
					.update("item_spec"			, row.getParameter("item_spec"))
					.update("plmk_size_horz"	, row.getParameter("plmk_size_horz"))
					.update("plmk_size_vrtl"	, row.getParameter("plmk_size_vrtl"))
					.update("dict_yorn"			, row.getParameter("dict_yorn"))
					.update("unit_idcd"			, row.getParameter("unit_idcd"))
					.update("sale_pric"			, row.getParameter("sale_pric"))
					.update("mesh_ndqt"			, row.getParameter("mesh_ndqt"))
					.update("invc_date"			, row.getParameter("invc_date"))
					.update("user_memo"			, row.getParameter("user_memo"))

					.update("find_name"			, row.getParameter("item_idcd")
												+ " "
												+ row.fixParameter("cstm_idcd")
												+ " "
												+ row.getParameter("mesh_name"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg,row, "item_json_fields");
				data.param
					.table ("item_mast")
					.where("where item_idcd = :item_idcd ")

					.unique("item_idcd"        , row.fixParameter("item_idcd"))
					.update("item_code"        , row.getParameter("item_idcd"))
					.update("json_data"        , json_data)

					.update("sysm_memo"        , row.getParameter("stat"))
					.update("updt_ipad"        , arg.remoteAddress )
					.insert("crte_ipad"        , arg.remoteAddress )
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
		}
		data.execute();
		return null ;
	}

}
