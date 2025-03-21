package com.sky.system.sale.project.prjtmast;

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
public class PrjtMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");


		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.prjt_idcd        , a.prjt_code   , a.prjt_name       , a.cstm_idcd				")
			.query("		, a.cstm_name        , a.regi_date   , a.item_idcd       , a.item_name				")
			.query("		, a.item_spec        , a.modl_name   , a.strt_date       , a.endd_date				")
			.query("		, a.user_memo        , a.sysm_memo   , a.prnt_idcd       , a.drtr_idcd				")
			.query("		, a.line_stat        , a.line_clos   , a.find_name       , a.updt_user_name			")
			.query("		, a.updt_ipad        , a.updt_dttm   , a.updt_idcd       , a.updt_urif				")
			.query("		, a.crte_user_name   , a.crte_ipad   , a.crte_dttm       , a.crte_idcd				")
			.query("		, a.crte_urif        , b.buss_name   , b.buss_numb       , b.buss_kind				")
			.query("		, b.buss_type        , b.boss_name   , b.tele_numb       , b.faxi_numb				")
			.query("		, b.mail_addr        , b.hdph_numb   , c.user_name as drtr_name						")
			.query("		, c.user_idcd																		")
		;
		data.param //퀴리문
			.where("from	prjt_mast a																			")
			.where("		left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd							")
			.where("		left outer join user_mast c on a.drtr_idcd = c.user_idcd							")
			.where("where   1=1																					")
			.where("and     a.item_idcd  = :item_idcd", arg.getParameter("item_idcd"							))
			.where("and     a.cstm_idcd  = :cstm_idcd", arg.getParameter("cstm_idcd"							))
			.where("and     a.drtr_idcd  = :user_idcd", arg.getParameter("user_idcd"							))
			.where("and	    a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.regi_date  between :fr_dt      " , arg.getParamText("fr_dt") )
			.where("                     and     :to_dt      " , arg.getParamText("to_dt") )
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.prjt_idcd        , a.prjt_code   , a.prjt_name       , a.cstm_idcd				")
			.query("		, a.cstm_name        , a.regi_date   , a.item_idcd       , a.item_name				")
			.query("		, a.item_spec        , a.modl_name   , a.strt_date       , a.endd_date				")
			.query("		, a.user_memo        , a.sysm_memo   , a.prnt_idcd       , a.drtr_idcd				")
			.query("		, a.line_stat        , a.line_clos   , a.find_name       , a.updt_user_name			")
			.query("		, a.updt_ipad        , a.updt_dttm   , a.updt_idcd       , a.updt_urif				")
			.query("		, a.crte_user_name   , a.crte_ipad   , a.crte_dttm       , a.crte_idcd				")
			.query("		, a.crte_urif        , b.buss_name   , b.buss_numb       , b.buss_kind				")
			.query("		, b.buss_type        , b.boss_name   , b.tele_numb       , b.faxi_numb				")
			.query("		, b.mail_addr        , b.hdph_numb   , c.user_name       , c.user_idcd				")
		;
		data.param //퀴리문
			.where("from	prjt_mast a																			")
			.where("		left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd							")
			.where("		left outer join user_mast c on a.drtr_idcd = c.user_idcd							")
			.where("where   1=1																					")
			.where("and     a.item_idcd  = :item_idcd", arg.getParameter("item_idcd"							))
			.where("and     a.cstm_idcd  = :cstm_idcd", arg.getParameter("cstm_idcd"							))
			.where("and     a.drtr_idcd  = :user_idcd", arg.getParameter("user_idcd"							))
			.where("and	    a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.regi_date  between :fr_dt      " , arg.getParamText("fr_dt") )
			.where("                     and     :to_dt      " , arg.getParamText("to_dt") )
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("prjt_mast")
					.where("where prjt_idcd  = :prjt_idcd")

					.unique("prjt_idcd"			, row.fixParameter("prjt_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("prjt_mast")
					.where("where prjt_idcd	= :prjt_idcd" )

					.unique("prjt_idcd"			, row.fixParameter("prjt_idcd"))

					.update("prjt_code"			, row.getParameter("prjt_code"))
					.update("prjt_name"			, row.getParameter("prjt_name"))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
					.update("cstm_name"			, row.getParameter("cstm_name"))
					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("item_name"			, row.getParameter("item_name"))
					.update("item_spec"			, row.getParameter("item_spec"))
					.update("modl_name"			, row.getParameter("modl_name"))
					.update("regi_date"			, row.getParameter("regi_date"))
					.update("strt_date"			, row.getParameter("strt_date"))
					.update("endd_date"			, row.getParameter("endd_date"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))

					.update("find_name"			, row.getParameter("prjt_name")
												+ " "
												+ row.fixParameter("prjt_idcd"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}